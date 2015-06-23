// SSH Connection porting from firessh 0.93.1

const Cc = Components.classes;
const Ci = Components.interfaces;

function cli(conn) {
    this.conn = conn;
    this.prefs = conn.prefs;
}

cli.prototype={
    ConvertFromUnicode: function(message) {
        var charset = this.prefs.charset.toLowerCase();
        switch (charset) {
        case 'utf-8':
            return this.conn.utf8Output(message);
        case 'big5': // when converting unicode to big5, use UAO.
            if(!this.conn.uaoConvLoaded) {
                Components.utils.import("resource://bbsfox/uao.js");
                this.conn.uaoConvLoaded = true;
            }
            return uaoConv.u2b(message);
        default:
            this.conn.oconv.charset=charset;
            return this.conn.oconv.ConvertFromUnicode(message);
        }
    },

    update: function(message, isHistory) {
        if(!this.conn) {
            return;
        }

        if(!this.conn.isConnected && !isHistory) {
            this.conn.isConnected = true;
            var buf = this.conn.listener.buf;
            buf.scroll(false, buf.curY);
            buf.curY = 0;
        }

        this.conn.listener.onData(this.conn, message);
    },

    addHistory: function(message) {

        var str = message.html.replace(/&quot;/g, "\"").replace(/&gt;/g, ">").replace(/&lt;/g, "<");
        str = this.ConvertFromUnicode(str);
        if(this.conn.isConnected) {
            /*
            //if(!this.conn.listener.prefs.ScrollBar)
            //    return;
            str = '\x1b[m' + str.replace(/\n/g, "\n\x1b[m");
            var str_arr = str.split('\n');
            var history = this.conn.listener.buf.history;
            history = history.concat(str_arr);
            // collapse the previous history view
            this.conn.listener.buf.historyScroll();
            */
        } else {
            str = str.replace(/\n/g, "\r\n");
            this.update('\x1b[m' + str, true);
        }
    },

    onConnect: function() {
      this.conn.onStartRequest();
    },

    onDisconnect: function() {
      this.conn.onStopRequest();
    },

    updateHistoryView: function(force) {},
};

function ConnectCore(listener) {
    this.host = null;
    this.port = BBSFOX_DEFAULT_PORT;

    this.connectCount = 0;
    this.listener = listener;
    this.prefs = listener.prefs;

    /*
    this.transport = null;
    this.inputStream = null;
    this.outputStream = null;
    this.state=STATE_DATA;
    this.iac_sb='';
    this.b52k3uao=window.uaotable;
    */
    //this.initial=true;

    this.blockSend = false;

    this.utf8Buffer=[];

    //this.utf8Buffer='';

    gPlatform = getPlatform();
    gCli = new cli(this);
}

ConnectCore.prototype={
    // encoding converter
    oconv: Cc["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Ci.nsIScriptableUnicodeConverter),

    connect: function(host, port) {
        //alert('connect');
        if(host)
        {
          this.host = host;
          this.port = port;
        }

        this.isConnected = false;

        this.inputStream = true;

        //ssh - start
        gCli.cols = this.listener.buf.cols;
        gCli.rows = this.listener.buf.rows;

        setProtocol("ssh2"); //baseProtocol.js
        var acc = [];
        if(this.prefs.sshLoginType==0)
        {
          acc = this.listener.loadLoginData('chrome://bbsfox3','ssh://'); //load login data
          var ioService  = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
          var uri = ioService.newURI(document.URL, null, null);

          var user = uri.username;
          var pwd = uri.password;
          if(user != '')
          {
            acc[0] = user;
            acc[1] = pwd;
          }
          // if connect to ptt and ssh password =='', just set password to any string, because the server not check it!
          if(this.listener.isPTT() && acc[1]=='')
            acc[1] = 'a';
        }
        else
        {
          acc[0] = 'anonymous';
          acc[1] = 'firessh@example.com';
        }
        if (!gConnection.isConnected) {
          gConnection.host       = document.location.hostname;
          gConnection.port       = document.location.port ? document.location.port : 22;
          gConnection.login      = acc[0];//site.login;    //user name
          gConnection.password   = acc[1];//site.password; //password
          gConnection.security   = "";//site.security;
          gConnection.privatekey = "";//site.privatekey;
          gConnection.tunnels    = "";//site.tunnels;
          gConnection.keepAliveMode = false;
          gConnection.reconnectMode = false;
          gConnection.proxyHost = this.prefs.sshProxyHost;
          gConnection.proxyPort = this.prefs.sshProxyPort;
          gConnection.proxyType = this.prefs.sshProxyType;
          gConnection.reconnectAttempts   = 0;
          gConnection.reconnectInterval   = 10;
          gConnection.useCompression      = true;
        }
        sshconnect(true); //sshController.js
        //ssh - end

        this.connectTime = Date.now();
        this.connectCount++;
        // Check AutoLogin Stage
        this.listener.robot.initialAutoLogin();
    },

    close: function() {

      if(!this.inputStream)
        return;
      delete this.inputStream;

      //ssh - start
      /*
      try {
        if (gAccountDialog && !gAccountDialog.closed) {
          gAccountDialog.close();
        }
      } catch (ex) { }
      */
      if (gConnection && gConnection.isConnected) {
        gConnection.disconnect();
      }
      //ssh - end

      if(this.listener.abnormalClose)
        return;

      //do re-connect - start
      if(this.prefs.reconnectType == 0)
      {
        //disable
      }
      else
      {
        var ReconnectCount = this.prefs.reconnectCount;
        if(ReconnectCount && this.connectCount >= ReconnectCount) {
          this.connectFailed = true;
          return;
        }

        if(this.prefs.reconnectType == 1)
        {
          this.listener.onReconnect();
        }
        else
        {
          var time = Date.now();
          var reconnectTime = this.prefs.reconnectTime;
          if(reconnectTime <= 0)
            reconnectTime = 1;
          if ( time - this.connectTime < reconnectTime * 1000 ) {
            this.listener.onReconnect();
          }
        }
      }
      //do re-connect - end
      gCli.conn = null;
    },

    // data listener

    onStartRequest: function(){
      if(this.listener)
        this.listener.onConnect(this);
    },

    onStopRequest: function(){
      if(this._inputStream && this.inputStream && this.outputStream)
        this.close();
      if(this.listener.abnormalClose == false)
        this.listener.onClose(this);
    },

    backgroundSend: function(s){
      this.delaySendStr = s;
        if(!this.inputStream) return;
        if(this.listener)
        {
          this.listener.resetUnusedTime();
          if(!s.length) return;
          //this.outputStream.write(s, s.length);
          //this.outputStream.flush();
          gConnection.output(str);
        }
    },

    send: function(str) {
        if(!this.inputStream || this.blockSend) return;
        if(this.listener)
        {
          this.listener.resetUnusedTime();
          if(!str.length) return;
          //this.outputStream.write(str, str.length);
          //this.outputStream.flush();
          gConnection.output(str);
        }
    },

    convSend: function(unicode_str, charset, extbuf) {
        if(charset.toLowerCase() == 'utf-8') {
            return this.send(this.utf8Output(unicode_str));
        }
        // supports UAO
        var s;
        // when converting unicode to big5, use UAO.
        if(charset.toLowerCase() == 'big5') {
      this.listener.buf.loaduao();
            s = uaoConv.u2b(unicode_str);
        }
        else
        {
            this.oconv.charset=charset;
            s = this.oconv.ConvertFromUnicode(unicode_str);
        }
        if(extbuf) return s;
        if(s)
        {
          s = ansiHalfColorConv(s);
          this.send(s);
        }
    },

    sendNaws: function() {
        var cols = this.prefs.bbsCol; //this.listener.buf ? this.listener.buf.cols : 80;
        var rows = this.prefs.bbsRow; //this.listener.buf ? this.listener.buf.rows : 24;
        gConnection.shell.resize_pty(cols, rows);
        //var naws = String.fromCharCode((cols-(cols%256))/256, cols%256, (rows-(rows%256))/256, rows%256).replace(/(\xff)/g,'\xff\xff');
        //var rep = IAC + SB + NAWS + naws + IAC + SE;
        //this.send( rep );
    },

    utf8Output: function(str) {
      return unescape(encodeURIComponent(str));
    /*
        this.oconv.charset = 'UTF-8';
        var result = this.oconv.convertToByteArray(str, {});
        var input = '';
        for(var i=0; i<result.length; ++i)
            input += String.fromCharCode(result[i]);
        return input;
    */
    }
};