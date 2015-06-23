function baseObserver() { }

baseObserver.prototype = {
  connNo              : 1,

  // optional functions to override
  onWelcomed          : function() { },

  onConnectionRefused : function() {  },

  onConnected : function() {  },

  onLoginAccepted : function(newHost) {},

  onLoginDenied : function() {
    //sshconnect(false, true); //connect denied, pop-up password dialog?
    gCli.onDisconnect();
  },

  onDisconnected : function() {
  },

  onReconnecting : function() {  },

  onError : function(msg, skipAlert) {
    error(msg, false, false, skipAlert);
  },

  onDebug : function(msg, level) {
    debug(msg, level, false);
  },

  onAppendLog : function(msg, css, type) {
    appendLog(msg + "\n", css, type, false);
  },

  onStdin : function(msg, css, type) {
    stdin(msg);
  }

};
