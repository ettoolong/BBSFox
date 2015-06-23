function BBSOverlayCmdListener(listener) {
  this.bbscore = listener;
  this.CmdHandler = listener.CmdHandler;

  var cmd_Listener ={
      view: this,
      handleEvent: function(e) {
          this.view.CommandHandle(e);
      }
  };
  this.CmdHandler.addEventListener("OverlayCommand", cmd_Listener, false);
}

BBSOverlayCmdListener.prototype={
  CommandHandle: function(event){
    var elm = event.target;
    var cmd = elm.getAttribute("bbsfoxCommand");
    var bbscore = this.bbscore;
    if (elm){
      if(elm.id == 'cmdHandler') {
        switch (cmd) {
          case "doArrowUp":
            if(bbscore.cancelDownloadAndPaste())
              return;
            bbscore.conn.send('\x1b[A');
            break;
          case "doArrowDown":
            if(bbscore.cancelDownloadAndPaste())
              return;
            bbscore.conn.send('\x1b[B');
            break;
          case "doPageUp":
            if(bbscore.cancelDownloadAndPaste())
              return;
            bbscore.conn.send('\x1b[5~');
            break;
          case "doPageDown":
            if(bbscore.cancelDownloadAndPaste())
              return;
            bbscore.conn.send('\x1b[6~');
            break;
          case "doHome":
            if(bbscore.cancelDownloadAndPaste())
              return;
            bbscore.conn.send('\x1b[1~');
            break;
          case "doEnd":
            if(bbscore.cancelDownloadAndPaste())
              return;
            bbscore.conn.send('\x1b[4~');
            break;
          case "cancelHoldMouse":
            bbscore.cancelMouseDownTimer();
            break;
          case "prevousThread":
            if(bbscore.cancelDownloadAndPaste())
              return;
            bbscore.buf.SetPageState();
            if(bbscore.buf.PageState==2 || bbscore.buf.PageState==3 || bbscore.buf.PageState==4)
            {
              bbscore.cancelMouseDownTimer();
              bbscore.conn.send('[');
            }
            break;
          case "nextThread":
            if(bbscore.cancelDownloadAndPaste())
              return;
            bbscore.buf.SetPageState();
            if(bbscore.buf.PageState==2 || bbscore.buf.PageState==3 || bbscore.buf.PageState==4)
            {
              bbscore.cancelMouseDownTimer();
              bbscore.conn.send(']');
            }
            break;
          case "setInputAreaFocus":
            bbscore.setInputAreaFocus();
            break;
          case "doAddTrack":
            bbscore.doAddTrack();
            break;
          case "doDelTrack":
            bbscore.doDelTrack();
            break;
          case "doClearTrack":
            bbscore.doClearTrack();
            break;
          case "openSymbolInput":
            if(bbscore.symbolinput)
            {
              bbscore.symbolinput.setCore(bbscore);
              bbscore.symbolinput.displayWindow();
            }
            break;
          case "doSavePage":
            bbscore.doSavePage();
            break;
          case "doCopyHtml":
            bbscore.doCopyHtml();
            break;
          case "doSelectAll":
            bbscore.doSelectAll();
            break;
          case "doCopy":
            bbscore.doCopySelect();
            break;
          case "doCopyAnsi":
            bbscore.doAnsiCopySelect();
            break;
          case "doPaste":
            bbscore.doPaste();
            break;
          case "doDelayPasteText":
            bbscore.doDelayPasteText();
            break;
          case "doOpenAllLink":
            bbscore.doOpenAllLink();
            break;
          case "switchMouseBrowsing":
            bbscore.switchMouseBrowsing();
            break;
          case "switchBgDisplay":
            bbscore.switchBgDisplay();
            break;
          case "checkFireGestureKey":
            if(bbscore.cancelDownloadAndPaste())
              return;
            bbscore.gesture.checkFireGestureKey();
            break;
          case "openYoutubeWindow":
            var param = elm.getAttribute("YoutubeURL");
            elm.removeAttribute("YoutubeURL");
            if(bbscore.playerMgr)
              bbscore.playerMgr.openYoutubeWindow(param);
            break;
          case "openUstreamWindow":
            var param = elm.getAttribute("UstreamURL");
            elm.removeAttribute("UstreamURL");
            if(bbscore.playerMgr)
              bbscore.playerMgr.openUstreamWindow(param);
            break;
          case "openUrecordWindow":
            var param = elm.getAttribute("UrecordURL");
            elm.removeAttribute("UrecordURL");
            if(bbscore.playerMgr)
              bbscore.playerMgr.openUrecordWindow(param);
            break;
          case "previewPicture":
            var param = elm.getAttribute("PictureURL");
            elm.removeAttribute("PictureURL");
            if(bbscore.picViewerMgr)
              bbscore.picViewerMgr.openPicture(param);
            break;
          case "doDownloadPost":
            var param = elm.getAttribute("DownloadColor");
            elm.removeAttribute("DownloadColor");
            if(param=='0')//text
              bbscore.ansiColor.file.savePage(0);
            else if(param=='1')//color
              bbscore.ansiColor.file.savePage(1);
            else// if(param=='2')//html
              bbscore.ansiColor.file.savePage(2);
            break;
          case "doLoadFile":
            bbscore.ansiColor.file.openFile();
            break;
          case "checkPrefExist":
            bbscore.doSiteSettingCheck(250);
            break;
          case "easyReading":
            bbscore.ansiColor.file.openTab();
            break;
          case "pushThread":
            bbscore.doPushThread();
            break;
          case "openThreadUrl":
            bbscore.OpenThreadUrl();
            break;
          case "changeColorTable":
            bbscore.ChangeColorTable();
            break;
          case "setAlert":
            var param = elm.getAttribute("AlertMessage");
            elm.removeAttribute("AlertMessage");
            //bbscore.view.showAlertMessageEx(false, true, false, param);
            //alert(param);
            break;
          default:
            //e v a l("bbsfox."+cmd+"();"); //unsafe javascript? how to fix it?
            break;
        }
      }
      elm.removeAttribute("bbsfoxCommand");
    }
  }
};
