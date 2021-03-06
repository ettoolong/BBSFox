// Browser utilities, including preferences API access, site-depedent setting through Places API

//const Cc = Components.classes;
//const Ci = Components.interfaces;

// From https://developer.mozilla.org/en/Code_snippets/Preferences
function BBSFoxPrefListener(branchName, func) {
  var prefService = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
  var branch = prefService.getBranch(branchName);
  branch.QueryInterface(Components.interfaces.nsIPrefBranch);
  this.register = function() {
    branch.addObserver("", this, false);
    branch.getChildList("", { })
          .forEach(function (name) { func(branch, name); });
  };
  this.unregister = function unregister() {
    if (branch)
      branch.removeObserver("", this);
  };
  this.observe = function(subject, topic, data) {
    if (topic == "nsPref:changed")
      func(branch, data);
  };
}

function BBSFoxBrowserUtils() {
  // XXX: UNUSED AND UNTESTED
  this.__defineGetter__('_prefBranch', function() {
    delete this['_prefBranch'];
    return this['_prefBranch'] = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefService)
                                                                          .getBranch('extensions.bbsfox2.');
  });
  this.__defineGetter__('_bookmarkService', function() {
    delete this['_bookmarkService'];
    return this['_bookmarkService'] = Components.classes['@mozilla.org/browser/nav-bookmarks-service;1'].getService(Components.interfaces.nsINavBookmarksService);
  });
  this.__defineGetter__('_ioService', function() {
    delete this['_ioService'];
    return this['_ioService'] = Components.classes['@mozilla.org/network/io-service;1'].getService(Components.interfaces.nsIIOService);
  });
  //this.bookmarkID = null;
  this.isDefaultPref = true;
  this.siteAuthInfo = '';
  this.siteAddr = null;
}

BBSFoxBrowserUtils.prototype = {

  findSiteTitle: function(url, port) {
    var url2 = url+":"+port;
    var siteIDs = this.getSubBranch('hostlist_').getChildList("", { });
    var CiStr = Components.interfaces.nsISupportsString;
    //var availableIDs = new Array();
    for(var i=0; i<siteIDs.length; ++i) {
    	var urlToken = siteIDs[i].split(":");
    	if(urlToken.length == 2) {
        if(urlToken[0] == url && urlToken[1] == port)//have site setting, return site name
        {
          this.siteAddr = siteIDs[i];
          this.siteAuthInfo = url2;
          this.isDefaultPref = false;
          return this.getSubBranch('host_' + siteIDs[i]+'.').getComplexValue('sitename', CiStr).data;
        }
      }
    }
    for(var i=0; i<siteIDs.length; ++i) {
    	var urlToken = siteIDs[i].split(":");
    	if(urlToken.length == 1) {
        if(urlToken[0] == url)//have site setting, return site name
        {
          this.siteAddr = siteIDs[i];
          this.siteAuthInfo = url + ':' + '23';
          this.isDefaultPref = false;
          return this.getSubBranch('host_' + siteIDs[i]+'.').getComplexValue('sitename', CiStr).data;
        }
    	}
    }
    this.siteAddr = 'default';
    this.isDefaultPref = true;
    return url; //can't find site setting, return host name.
  },

  prefListener: function(func) {
    var listener = new BBSFoxPrefListener(this._prefBranch.root + 'host_' + this.siteAddr + '.', func);
    listener.register();
    return listener;
  },

  getSubBranch: function(subBranch) {
    return Components.classes["@mozilla.org/preferences-service;1"]
             .getService(Components.interfaces.nsIPrefService)
             .getBranch(this._prefBranch.root + subBranch);
  },

  getSiteAddrList: function() {
    return this.getSubBranch('hostlist_').getChildList("", { });
  },

  addSite: function(siteName, siteAddr) {
      try {
        this._prefBranch.getBoolPref('hostlist_' + siteAddr);
        // site pref has been created if it throws no exception
      } catch (e) {
        // mark for creatng new site pref
        this._prefBranch.setBoolPref('hostlist_' + siteAddr, false);
      }
      var nsIString = Components.classes["@mozilla.org/supports-string;1"]
                              .createInstance(Components.interfaces.nsISupportsString);
      nsIString.data = siteName;
      this._prefBranch.setComplexValue('host_' + siteAddr + '.sitename', Components.interfaces.nsISupportsString, nsIString);
  },

  saveSite: function(siteName, siteAddr) {
      this._prefBranch.setBoolPref('hostlist_' + siteAddr, true);
      var nsIString = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
      nsIString.data = siteName;
      this._prefBranch.setComplexValue('host_' + siteAddr + '.sitename', Components.interfaces.nsISupportsString, nsIString);
  },

  deleteSitePref: function(url) {
    this.getSubBranch('hostlist_' + url).deleteBranch("");
    this.getSubBranch('host_' + url + '.').deleteBranch("");
    //if image data in pref, delete it!
    var dstfile = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsIFile);
    dstfile.append("_bg."+url);
    try{
      if(dstfile.exists())
        dstfile.remove(true);
    }
    catch(e){
    }
  }
};
