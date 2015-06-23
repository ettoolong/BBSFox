function bbsfoxObserver() {}
bbsfoxObserver.prototype = {

  SshSupport: true,
  Factories: {},
  protocolHandlerUrl: null,
  SshStatus: false,
  importModules: false,

  dump: function dump(aMessage)
  {
    //var consoleService = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);
    //consoleService.logStringMessage("BBSFox: " + aMessage);
  },

  createFactory: function createFactory() {
      // Register/unregister a constructor as a component.
      let Factory = {
        QueryInterface: XPCOMUtils.generateQI([Components.interfaces.nsIFactory]),
        _targetConstructor: null,

        register: function register(targetConstructor) {
          this._targetConstructor = targetConstructor;
          var proto = targetConstructor.prototype;
          var registrar = Components.manager.QueryInterface(Components.interfaces.nsIComponentRegistrar);
          registrar.registerFactory(proto.classID, proto.classDescription, proto.contractID, this);
        },

        unregister: function unregister() {
          var proto = this._targetConstructor.prototype;
          var registrar = Components.manager.QueryInterface(Components.interfaces.nsIComponentRegistrar);
          registrar.unregisterFactory(proto.classID, this);
          this._targetConstructor = null;
        },

        // nsIFactory
        createInstance: function createInstance(aOuter, iid) {
          if (aOuter !== null)
            throw Cr.NS_ERROR_NO_AGGREGATION;
          return (new (this._targetConstructor)).QueryInterface(iid);
        },

        // nsIFactory
        lockFactory: function lockFactory(lock) {
          // No longer used as of gecko 1.7.
          throw Cr.NS_ERROR_NOT_IMPLEMENTED;
        }
      };
      return Factory;
    },

  onAppStartup: function onAppStartup()
  {
    //var observerService = Components.classes["@mozilla.org/observer-service;1"].getService(Components.interfaces.nsIObserverService);
    //observerService.addObserver(this, "app-startup", true);

    var prefService = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
    this.prefBranch = prefService.getBranch("extensions.bbsfox1.");
    this.prefBranch.QueryInterface(Components.interfaces.nsIPrefBranchInternal);
    this.prefBranch.addObserver("SshSupport", this, true);
    this.prefBranch.addObserver("RefererRule", this, true);
    this.onChangeSshSupport(this.prefBranch);
    this.onChangeRefererRule(this.prefBranch);
  },

  onChangeSshSupport: function onChangeEnabled(oPrefBranch)
  {
    this.SshSupport = oPrefBranch.getBoolPref('SshSupport');
    if(this.SshSupport)
    {
          this.dump("SshSupport ON");
          var _this = this;
          var sshConflictList = ['firessh@nightlight.ws','{78EE38D8-639C-11E0-A364-684DDFD72085}'];
          if(!this.importModules)
          {
            Components.utils.import("resource://gre/modules/AddonManager.jsm");
            this.importModules = true;
          }
          AddonManager.getAddonsByIDs(sshConflictList, function(addons) {
            var conflictFlag = false;
            var conflictAddons = [];
            _this.dump(addons.length);
            for(var i=0;i<addons.length;++i)
            {
              if(addons[i] && addons[i].isActive)
              {
                conflictFlag = true;
                conflictAddons.push(addons[i].name + ' ' + addons[i].version);
              }
            }
            if(conflictFlag)
            {
              _this.dump("find conflict");
              _this.SshStatus = false;
              var t2 = new Date();
              var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.bbsfox3.");
              var nsIString = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
              nsIString.data = conflictAddons.join('\n');
              prefs.setComplexValue("conflictAddons", Components.interfaces.nsISupportsString, nsIString);
              prefs.setIntPref("SshState", t2.getTime());
            }
            else
            {
              _this.dump("no any conflict");
              _this.SshStatus = true;
              var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.bbsfox3.");
              var nsIString = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
              nsIString.data = '';
              prefs.setComplexValue("conflictAddons", Components.interfaces.nsISupportsString, nsIString);
              prefs.setIntPref("SshState", 0);
              _this.protocolHandlerUrl = 'resource://bbsfox/install_ssh_protocol.js';
              Components.utils.import(_this.protocolHandlerUrl);
              _this.Factories['ssh'] = _this.createFactory();
              _this.Factories['ssh'].register(SshProtocol);
            }
          });

          //check add-on conflict at here, if install FireSSH or FireSSH-pcmanfx, show alert.
          //conflict SSH protocol
          //{78EE38D8-639C-11E0-A364-684DDFD72085} //FireSSH-pcmanfx
          //firessh@nightlight.ws                  //firessh

          //conflict Telnet protocol
          //firebbs.l-hedgehog@hector.zhao         //fireBBS
          //pcmanfx2@pcman.org                     //pcmanfx
          //{e7dfdd18-c8b6-11df-9fb6-1dd8ded72085} //pcmanfx-unofficial or pcmanfx-u881831
    }
    else
    {
      this.dump("SshSupport OFF");
      var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.bbsfox3.");
      var nsIString = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
      nsIString.data = '';
      prefs.setComplexValue("conflictAddons", Components.interfaces.nsISupportsString, nsIString);
      prefs.setIntPref("SshState", 0);
      if(this.SshStatus)
      {
        this.SshStatus = false;
        this.Factories['ssh'].unregister();
        // Unload the protocol handler
        Components.utils.unload(this.protocolHandlerUrl);
        this.protocolHandlerUrl = null;
      }
    }
  },

  onChangeRefererRule: function onChangeRefRule(oPrefBranch)
  {
    this.RefererRule = oPrefBranch.getBoolPref('RefererRule');
    var observerService = Components.classes["@mozilla.org/observer-service;1"].getService(Components.interfaces.nsIObserverService);
    if(this.RefererRule)
    {
      this.dump("RefererRule ON");
      observerService.addObserver(this, "http-on-modify-request", false);
    }
    else
    {
      this.dump("RefererRule OFF");
      observerService.removeObserver(this, "http-on-modify-request", false);
    }
  },

  overridehttpreferer: function (source)
  {
    var channel = source.QueryInterface(Components.interfaces.nsIHttpChannel);
    var targetURI = channel.URI;

    //ONLY override referrer string for target http://ppt.cc/
    //example: http://ppt.cc/gFtO@.jpg -> http://ppt.cc/gFtO

    var urlStr = decodeURI(targetURI.spec);
    if(urlStr.search(/^(http:\/\/ppt\.cc\/).{4,6}@\.(bmp|gif|jpe?g|png)$/i) != -1)
    {
      var ref = urlStr.split(/@/i);
      var override = false;
      if(!targetURI.hasRef)
        override = true;
      else if(targetURI.hasRef && targetURI.ref != ref[0])
        override = true;
      if(override)
      {
        channel.setRequestHeader('Referer', ref[0], false);
        this.dump("overridehttpreferer, ref[0] = " + ref[0]);
      }
    }
  },

  // Implement nsIObserver
  observe: function observe(aSubject, aTopic, aData)
  {
    try {
      switch (aTopic)
      {
        case 'nsPref:changed':
          aSubject.QueryInterface(Components.interfaces.nsIPrefBranch);
          switch (aData)
          {
            case 'SshSupport':
              this.onChangeSshSupport(aSubject);
              break;
            case 'RefererRule':
              this.onChangeRefererRule(aSubject);
              break;
            default:
              break;
          }
          break;

        case 'app-startup':
        case 'profile-after-change':
          this.onAppStartup();
          break;
        case 'http-on-modify-request':
          this.overridehttpreferer(aSubject);
          break;
        default:
          break;
      }
    } catch (ex) {
    }
  },

  // Implement nsISupports
  QueryInterface: function QueryInterface(iid)
  {
    if (!iid.equals(Components.interfaces.nsISupports) &&
      !iid.equals(Components.interfaces.nsIObserver) &&
      !iid.equals(Components.interfaces.nsISupportsWeakReference))
      throw Components.results.NS_ERROR_NO_INTERFACE;

    return this;
    },

  classDescription: "BBSFox observer",
  contractID: "@mozilla.org/bbsfox;1",
  classID: Components.ID("{4B85A989-79D6-4f96-887A-BA479D3B2890}"),
  _xpcom_categories: [{category: 'profile-after-change'}]
};

try {
  Components.utils["import"]("resource://gre/modules/XPCOMUtils.jsm");

  if (XPCOMUtils.generateNSGetFactory) {
    // moz-2.0+
    var NSGetFactory = XPCOMUtils.generateNSGetFactory([bbsfoxObserver]);
  }
  else {
    // moz-1.9
    if (!XPCOMUtils.defineLazyGetter) {
      // moz < 1.9.2; no profile-after-change category, needs service:true
      bbsfoxObserver.prototype._xpcom_categories = [{category: 'app-startup', service: true}];
    }
    function NSGetModule() { return XPCOMUtils.generateModule([bbsfoxObserver]); }
  }
}
catch (ex) {
}