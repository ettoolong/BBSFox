function ssh2Observer() {
  inherit(this, new baseObserver());
}

ssh2Observer.prototype = {
  onDirNotFound : function(buffer) { alert('NOT_IMPLEMENTED'); },

  onSftpCache : function(buffer, new_key, cacheCallback) {
    var key;

    if (new_key) {
      key = new_key;
    } else {
      var key = buffer.replace(/\r\n/g, "\n").split("\n");
      var index = 4;

      for (var x = 0; x < key.length; ++x) {
        if (key[x].indexOf('is:') != -1) {
          index = x + 1;
          break;
        }
      }

      key = key[index];
    }
    var promptService = Components.classes["@mozilla.org/embedcomp/prompt-service;1"].getService(Components.interfaces.nsIPromptService);
    var flags    = promptService.BUTTON_TITLE_YES    * promptService.BUTTON_POS_0 +
                   promptService.BUTTON_TITLE_NO     * promptService.BUTTON_POS_2 +
                   promptService.BUTTON_TITLE_CANCEL * promptService.BUTTON_POS_1;
    var response = promptService.confirmEx(window, bbsfox.getLMBundle().GetStringFromName("sftpCacheTitle"),
                                                    bbsfox.getLMBundle().formatStringFromName("sftpCache", [key], 1), flags,
                                                    null, null, null, null, {});
    cacheCallback(response == 0 ? 'y' : (response == 2 ? 'n' : ''));
  }
}
