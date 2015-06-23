function bbsfoxPrefHandler(listener) {
    this.listener=listener;
    this.blacklistedUserIds=[];
    this.enableBlacklist=false;
    this.useMouseBrowsing = false;
    this.useMouseBrowsingEx = false;
    this.highlightCursor = false;
    this.mouseBrowsingHlTime = 0;
    this.highlightBG = 2;
    this.bbsCol=80;
    this.bbsRow=24;
    this.handPointerCursor = false;
    //this.useMouseBrowseSendEnter = false;
    this.middleButtonFunction = 0;
    this.dropToPaste = false;
    this.termType='VT100';
    this.screenType=0;
    this.bbsWidth=960;
    this.bbsHeight=576;
    this.bbsFontSize=14;
    //this.reconnectType=0;
    //this.reconnectTime=20;
    //this.reconnectDelay=2;
    //this.reconnectCount=200;
    this.loadURLInBG=false;
    this.lineWrap=0;
    this.disableLinefeed=false;
    this.verticalAlignCenter=false;
    this.horizontalAlignCenter=true;
    this.EscChar='\x15'; // Ctrl-U
    this.clearCopiedSel=true;
    this.charset='big5';
    this.dbcsDetect=true;
    this.useHyperLink=false;
    this.aidAction=0;
    this.antiIdleStr='';
    this.antiIdleTime=0;
    this.hotkeyCtrlW=1;
    this.hotkeyCtrlB=1;
    this.hotkeyCtrlL=1;
    this.hotkeyCtrlT=1;
    this.hokeyForCopy=true;
    this.HokeyForAnsiCopy=true;
    this.hokeyForPaste=true;
    this.hokey2ForPaste=true;
    this.hokeyForSelectAll=true;
    this.hokeyForEasyReading=false;
    this.hokeyForDownloadPost=false;
    this.hotkeyDownloadType=2;
    this.hokeyOpenThreadUrl=false;
    this.testPttThread=false;
    this.downloadLineDelay=600;
    this.downloadFullPost=false;
    this.saveAfterDownload=true;
    this.easyReadingWithImg=false;
    this.easyReadingWithVideo=false;
    this.epWhenDropLink=true;
    this.notifyWhenBackground=true;
    this.notifyBySound=true;
    this.notifyByMessage=true;
    this.notifyBlockByTime=true;
    this.notifyShowContent=false;
    this.clickAlertAction=1;
    this.sshLoginType=0;
    this.sshProxyType='';
    this.sshProxyPort=22;
    this.sshProxyHost='';
    this.telnetProxyType='';
    this.telnetProxyPort=23;
    this.telnetProxyHost='';
    this.alertReplyString='';
    this.hideInputBuffer=false;
    this.inputBufferSizeType=0;
    this.defineInputBufferSize=12;
    this.viewBufferTimer = 30;
    this.useKeyWordTrack=false;
    this.keyWordTrackCaseSensitive=true;
    this.deleteSpaceWhenCopy=true;
    this.preventNewTongWenAutoConv=true;
    this.pushThreadLineLength=70;
    this.enablePicturePreview=false;
    this.ctrlPicturePreview=false;
    this.picturePreviewInfo=false;
    this.picturePreviewClose=false;
    this.picturePreviewHeight=150;
    this.loginPrompt=['','',''];
    this.loginStr=['','','',''];
    this.hokeyForBgDisplay=false;
    this.keepFontAspectRatio=false;
    this.hokeyChangeColorTable=false;
    this.fixUnicodeDisplay=false;
    this.mouseWheelFunc1=0;
    this.mouseWheelFunc2=0;
    this.mouseWheelFunc3=0;
    this.hokeyForMouseBrowsing=false;
    this.bbsColor=['#000000','#800000','#008000','#808000',
                   '#000080','#800080','#008080','#c0c0c0',
                   '#808080','#ff0000','#00ff00','#ffff00',
                   '#0000ff','#ff00ff','#00ffff','#ffffff'];
}

bbsfoxPrefHandler.prototype={

    onPrefChange: function(bbsCore, branch, name) {
      var _this = bbsCore.prefs;
      try {
        var CiStr = Components.interfaces.nsISupportsString;
        switch (name) {
        case "MouseWheelFunc1":
          _this.mouseWheelFunc1 = branch.getIntPref(name);
          break;
        case "MouseWheelFunc2":
          _this.mouseWheelFunc2 = branch.getIntPref(name);
          break;
        case "MouseWheelFunc3":
          _this.mouseWheelFunc3 = branch.getIntPref(name);
          break;
        case "UseMouseBrowsing":
          if(branch.getBoolPref(name))
          {
            bbsCore.CmdHandler.setAttribute('useMouseBrowsing', '1');
            _this.useMouseBrowsing=true;
          }
          else
          {
            bbsCore.CmdHandler.setAttribute('useMouseBrowsing', '0');
            _this.useMouseBrowsing=false;
          }
          if(!_this.useMouseBrowsing) {
            bbsCore.buf.BBSWin.style.cursor = 'auto';
            bbsCore.buf.clearHighlight();
            bbsCore.buf.mouseCursor=0;
            bbsCore.buf.nowHighlight=-1;
            bbsCore.buf.tempMouseCol=0;
            bbsCore.buf.tempMouseRow=0;
          }
          bbsCore.buf.SetPageState();
          bbsCore.buf.resetMousePos();
          bbsCore.view.update(true);
          bbsCore.view.updateCursorPos();
          break;
        case "MouseBrowsingHighlight":
          _this.highlightCursor=branch.getBoolPref(name);
          bbsCore.view.update(true);
          bbsCore.view.updateCursorPos();
          break;
        case "MouseBrowsingHlTime":
          _this.mouseBrowsingHlTime=branch.getIntPref(name);
          break;
        case "HighlightBG":
          _this.highlightBG=branch.getIntPref(name);
          if(_this.highlightBG>15 || _this.highlightBG<0)
            _this.highlightBG = 2;
          break;
        case "MouseBrowsingHandPointer":
          _this.handPointerCursor=branch.getBoolPref(name);
          break;
        case "UseMouseBrowsingEx":
          _this.useMouseBrowsingEx=branch.getBoolPref(name);
          break;
        case "MouseBrowseSendEnter":
          _this.useMouseBrowseSendEnter=branch.getBoolPref(name);
          break;
        case "MiddleButtonFunction":
          _this.middleButtonFunction=branch.getIntPref(name);
          break;
        case "DropToPaste":
          _this.dropToPaste=branch.getBoolPref(name);
          break;
        case "TermType":
          _this.termType=branch.getComplexValue(name, CiStr).data;
          break;
        case "bbsbox.col":
          _this.bbsCol=branch.getIntPref(name);
          //bbsCore.buf.cols = _this.bbsCol;
          bbsCore.buf.setCol(_this.bbsCol);
          break;
        case "bbsbox.row":
          _this.bbsRow=branch.getIntPref(name);
          //bbsCore.buf.rows = _this.bbsRow;
          bbsCore.buf.setRow(_this.bbsRow);
          break;
        case "ScreenType":
        case "KeepFontAspectRatio":
        case "FixUnicodeDisplay":
          _this.screenType = branch.getIntPref('ScreenType');
          if(_this.screenType==0)
          {
            _this.bbsWidth = 0;
            _this.bbsHeight = 0;
            _this.keepFontAspectRatio = branch.getBoolPref('KeepFontAspectRatio');
          }
          else if(_this.screenType==1)
          {
            _this.bbsWidth = branch.getIntPref('bbsbox.width');
            _this.bbsHeight = branch.getIntPref('bbsbox.height');
            _this.keepFontAspectRatio = true;
          }
          else// if(_this.screenType==2)
          {
            _this.bbsWidth = 0;
            _this.bbsHeight = 0;
            _this.bbsFontSize = branch.getIntPref('FontSize');
            _this.keepFontAspectRatio = true;
          }
          bbsCore.view.fontResize();
          bbsCore.view.updateCursorPos();
          if(_this.keepFontAspectRatio)
            _this.fixUnicodeDisplay=branch.getBoolPref("FixUnicodeDisplay");
          else
            _this.fixUnicodeDisplay=false;
          bbsCore.fixUnicode(_this.fixUnicodeDisplay);
          break;
        case "FontSize":
          if(_this.screenType==0)
          {
            _this.bbsWidth = 0;
            _this.bbsHeight = 0;
          }
          else if(_this.screenType==1)
          {
            _this.bbsWidth = branch.getIntPref('bbsbox.width');
            _this.bbsHeight = branch.getIntPref('bbsbox.height');
          }
          else// if(_this.screenType==2)
          {
            _this.bbsWidth = 0;
            _this.bbsHeight = 0;
            _this.bbsFontSize = branch.getIntPref('FontSize');
            bbsCore.view.fontResize();
            bbsCore.view.updateCursorPos();
          }
          break;
        case "bbsbox.width":
        case "bbsbox.height":
          if(_this.screenType==0)
          {
            _this.bbsWidth = 0;
            _this.bbsHeight = 0;
          }
          else if(_this.screenType==1)
          {
            _this.bbsWidth = branch.getIntPref('bbsbox.width');
            _this.bbsHeight = branch.getIntPref('bbsbox.height');
            bbsCore.view.fontResize();
            bbsCore.view.updateCursorPos();
          }
          else// if(_this.screenType==2)
          {
            _this.bbsWidth = 0;
            _this.bbsHeight = 0;
            _this.bbsFontSize = branch.getIntPref('FontSize');
          }
          break;
        case "ReconnectType":
          _this.reconnectType=branch.getIntPref(name);
          break;
        case "ReconnectTime":
          _this.reconnectTime=branch.getIntPref(name);
          break;
        case "ReconnectDelay":
          _this.reconnectDelay=branch.getIntPref(name);
          break;
        case "ReconnectCount":
          _this.reconnectCount=branch.getIntPref(name);
          break;
        case "LoadUrlInBG":
          _this.loadURLInBG=branch.getBoolPref(name);
          var allLinks = document.getElementsByTagName('a');
          for (var i = 0; i < allLinks.length; i++)
          {
            if(!allLinks[i].getAttribute('aidc')) {
              if(_this.loadURLInBG) {//this is only for developer testing
                allLinks[i].addEventListener('click', bbsCore.view.anchorClickHandler, true);
              } else {
                allLinks[i].removeEventListener('click', bbsCore.view.anchorClickHandler, true);
              }
            }
          }
          break;
        case "LineWrap":
          _this.lineWrap=branch.getIntPref(name);
          break;
        case "LineFeed":
          _this.disableLinefeed=!branch.getBoolPref(name);
          break;
        case "HAlignCenter":
        case "VAlignCenter":
          _this.horizontalAlignCenter=branch.getBoolPref('HAlignCenter');
          _this.verticalAlignCenter=branch.getBoolPref('VAlignCenter');
          if(_this.horizontalAlignCenter && _this.verticalAlignCenter)
          {
            bbsCore.view.BBSWin.setAttribute('align', 'center');
            bbsCore.view.mainDisplay.style.transformOrigin='center center';
          }
          else if(_this.horizontalAlignCenter && !_this.verticalAlignCenter)
          {
            bbsCore.view.BBSWin.setAttribute('align', 'center');
            bbsCore.view.mainDisplay.style.transformOrigin='center top';
          }
          else if(!_this.horizontalAlignCenter && _this.verticalAlignCenter)
          {
            bbsCore.view.BBSWin.setAttribute('align', 'left');
            bbsCore.view.mainDisplay.style.transformOrigin='left center';
          }
          else
          {
            bbsCore.view.BBSWin.setAttribute('align', 'left');
            bbsCore.view.mainDisplay.style.transformOrigin='left top';
          }
          bbsCore.view.cursorDiv.style.transformOrigin = bbsCore.view.mainDisplay.style.transformOrigin;
          bbsCore.view.fontResize();
          break;
        case "FontFace.string":
          _this.fontFace=branch.getComplexValue(name, CiStr).data;
          if(!_this.fontFace)
            _this.fontFace='monospace';
          bbsCore.view.mainDisplay.style.fontFamily = _this.fontFace;
          bbsCore.view.cursorDiv.style.fontFamily = _this.fontFace;
          //bbsCore.view.wordtest.style.fontFamily = _this.fontFace;
          break;
        case "Escape.string":
          _this.EscChar = UnEscapeStr(branch.getComplexValue(name, CiStr).data);
          break;
        case "EnterType":
          var ek = branch.getIntPref(name);
          if(ek==1)
            _this.EnterChar = UnEscapeStr('^M^J');
          else if(ek==2)
            _this.EnterChar = UnEscapeStr('^J');
          else
            _this.EnterChar = UnEscapeStr('^M');
          break;
        case "ClearCopiedSel":
          _this.clearCopiedSel=branch.getBoolPref(name);
          break;
        case "Charset":
          var charset=branch.getComplexValue(name, CiStr).data;
          if(charset=='locale') {
            charset = 'big5';
          }
          if(charset=='UTF-8' && bbsCore.isPTT() ) {
            bbsCore.buf.forceFullWidth = true;
          } else {
            bbsCore.buf.forceFullWidth = false;
          }
          _this.charset = charset;
          bbsCore.view.update(true);
          break;
        case "BBSColor01":
          _this.bbsColor[0] = branch.getComplexValue(name, CiStr).data;
          bbsCore.view.setColorDefine(0);
          break;
        case "BBSColor02":
          _this.bbsColor[1] = branch.getComplexValue(name, CiStr).data;
          bbsCore.view.setColorDefine(1);
          break;
        case "BBSColor03":
          _this.bbsColor[2] = branch.getComplexValue(name, CiStr).data;
          bbsCore.view.setColorDefine(2);
          break;
        case "BBSColor04":
          _this.bbsColor[3] = branch.getComplexValue(name, CiStr).data;
          bbsCore.view.setColorDefine(3);
          break;
        case "BBSColor05":
          _this.bbsColor[4] = branch.getComplexValue(name, CiStr).data;
          bbsCore.view.setColorDefine(4);
          break;
        case "BBSColor06":
          _this.bbsColor[5] = branch.getComplexValue(name, CiStr).data;
          bbsCore.view.setColorDefine(5);
          break;
        case "BBSColor07":
          _this.bbsColor[6] = branch.getComplexValue(name, CiStr).data;
          bbsCore.view.setColorDefine(6);
          break;
        case "BBSColor08":
          _this.bbsColor[7] = branch.getComplexValue(name, CiStr).data;
          bbsCore.view.setColorDefine(7);
          break;
        case "BBSColor09":
          _this.bbsColor[8] = branch.getComplexValue(name, CiStr).data;
          bbsCore.view.setColorDefine(8);
          break;
        case "BBSColor10":
          _this.bbsColor[9] = branch.getComplexValue(name, CiStr).data;
          bbsCore.view.setColorDefine(9);
          break;
        case "BBSColor11":
          _this.bbsColor[10] = branch.getComplexValue(name, CiStr).data;
          bbsCore.view.setColorDefine(10);
          break;
        case "BBSColor12":
          _this.bbsColor[11] = branch.getComplexValue(name, CiStr).data;
          bbsCore.view.setColorDefine(11);
          break;
        case "BBSColor13":
          _this.bbsColor[12] = branch.getComplexValue(name, CiStr).data;
          bbsCore.view.setColorDefine(12);
          break;
        case "BBSColor14":
          _this.bbsColor[13] = branch.getComplexValue(name, CiStr).data;
          bbsCore.view.setColorDefine(13);
          break;
        case "BBSColor15":
          _this.bbsColor[14] = branch.getComplexValue(name, CiStr).data;
          bbsCore.view.setColorDefine(14);
          break;
        case "BBSColor16":
          _this.bbsColor[15] = branch.getComplexValue(name, CiStr).data;
          bbsCore.view.setColorDefine(15);
          break;
        case "AutoDbcsDetection":
          _this.dbcsDetect=branch.getBoolPref(name);
          break;
        case "ask":
          if(branch.getBoolPref(name))
            bbsCore.RegExitAlert();
          else
            bbsCore.UnregExitAlert();
          break;
        case "DetectLink":
          _this.useHyperLink=branch.getBoolPref(name);
          bbsCore.view.update(true);
          break;
        case "AidAction":
          if( bbsCore.isPTT() )
            _this.aidAction=branch.getIntPref(name);
          else
            _this.aidAction=0;
          if(_this.aidAction==0)
            bbsCore.buf.boardName='';
          //bbsCore.view.update(true);
          break;
        case "AntiIdle.string":
          _this.antiIdleStr = UnEscapeStr(branch.getComplexValue(name, CiStr).data);
          break;
        case "AntiIdle.seconds":
          _this.antiIdleTime = branch.getIntPref(name) * 1000;
          break;
        case "HotkeyCtrlW":
          _this.hotkeyCtrlW = branch.getIntPref(name);
          break;
        case "HotkeyCtrlB":
          _this.hotkeyCtrlB = branch.getIntPref(name);
          break;
        case "HotkeyCtrlL":
          _this.hotkeyCtrlL = branch.getIntPref(name);
          break;
        case "HotkeyCtrlT":
          _this.hotkeyCtrlT = branch.getIntPref(name);
          break;
        case "HokeyForCopy":
          _this.hokeyForCopy = branch.getBoolPref(name);
          break;
        case "HokeyForAnsiCopy":
          _this.hokeyForAnsiCopy = branch.getBoolPref(name);
          break;
        case "HokeyForPaste":
          _this.hokeyForPaste = branch.getBoolPref(name);
          break;
        case "Hokey2ForPaste":
          _this.hokey2ForPaste = branch.getBoolPref(name);
          break;
        case "HokeyForSelectAll":
          _this.hokeyForSelectAll = branch.getBoolPref(name);
          break;
        case "HokeyForMouseBrowsing":
          _this.hokeyForMouseBrowsing = branch.getBoolPref(name);
          break;
        case "HokeyForEasyReading":
          _this.hokeyForEasyReading = branch.getBoolPref(name);
          break;
        case "HokeyForDownloadPost":
          _this.hokeyForDownloadPost = branch.getBoolPref(name);
          break;
        case "HotkeyDownloadType":
          _this.hotkeyDownloadType = branch.getIntPref(name);
          break;
        case "HokeyOpenThreadUrl":
          _this.hokeyOpenThreadUrl = branch.getBoolPref(name);
          break;
        case "SavePageMenu":
          if(branch.getBoolPref(name))
            bbsCore.CmdHandler.setAttribute('SavePageMenu', '1');
          else
            bbsCore.CmdHandler.setAttribute('SavePageMenu', '0');
          break;
        case "AnsiCopyMenu":
          if(branch.getBoolPref(name))
            bbsCore.CmdHandler.setAttribute('AnsiCopyMenu', '1');
          else
            bbsCore.CmdHandler.setAttribute('AnsiCopyMenu', '0');
          break;
        case "EmbeddedPlayerMenu":
          if(branch.getBoolPref(name))
            bbsCore.CmdHandler.setAttribute('EmbeddedPlayerMenu', '1');
          else
            bbsCore.CmdHandler.setAttribute('EmbeddedPlayerMenu', '0');
          break;
        case "PreviewPictureMenu":
          if(branch.getBoolPref(name))
            bbsCore.CmdHandler.setAttribute('PreviewPictureMenu', '1');
          else
            bbsCore.CmdHandler.setAttribute('PreviewPictureMenu', '0');
          break;
        case "ScreenKeyboardMenu":
          if(branch.getBoolPref(name))
            bbsCore.CmdHandler.setAttribute('ScreenKeyboardMenu', '1');
          else
            bbsCore.CmdHandler.setAttribute('ScreenKeyboardMenu', '0');
          break;
        case "OpenAllLinkMenu":
          if(branch.getBoolPref(name))
            bbsCore.CmdHandler.setAttribute('OpenAllLinkMenu', '1');
          else
            bbsCore.CmdHandler.setAttribute('OpenAllLinkMenu', '0');
          break;
        case "MouseBrowseMenu":
          if(branch.getBoolPref(name))
            bbsCore.CmdHandler.setAttribute('MouseBrowseMenu', '1');
          else
            bbsCore.CmdHandler.setAttribute('MouseBrowseMenu', '0');
          break;
        case "CopyHtmlMenu":
          if(branch.getBoolPref(name))
            bbsCore.CmdHandler.setAttribute('CopyHtmlMenu', '1');
          else
            bbsCore.CmdHandler.setAttribute('CopyHtmlMenu', '0');
          break;
        case "KeyWordTrackMenu":
          if(branch.getBoolPref(name))
            bbsCore.CmdHandler.setAttribute('KeyWordTrackMenu', '1');
          else
            bbsCore.CmdHandler.setAttribute('KeyWordTrackMenu', '0');
          break;
        case "DelayPasteMenu":
          if(branch.getBoolPref(name))
            bbsCore.CmdHandler.setAttribute('DelayPasteMenu', '1');
          else
            bbsCore.CmdHandler.setAttribute('DelayPasteMenu', '0');
          break;
        case "DownloadPostMenu":
          if(branch.getBoolPref(name))
            bbsCore.CmdHandler.setAttribute('DownloadPostMenu', '1');
          else
            bbsCore.CmdHandler.setAttribute('DownloadPostMenu', '0');
          break;
        case "EasyReadingMenu":
          if(branch.getBoolPref(name))
            bbsCore.CmdHandler.setAttribute('EasyReadingMenu', '1');
          else
            bbsCore.CmdHandler.setAttribute('EasyReadingMenu', '0');
          break;
        case "PushThreadMenu":
          if(branch.getBoolPref(name) && bbsCore.isPTT() )
            bbsCore.CmdHandler.setAttribute('PushThreadMenu', '1');
          else
            bbsCore.CmdHandler.setAttribute('PushThreadMenu', '0');
          break;
        case "OpenThreadUrlMenu":
          if(branch.getBoolPref(name) && bbsCore.isPTT() )
            _this.testPttThread = true;
          else
            _this.testPttThread = false;
          break;
        case "ChangeColorTableMenu":
          if(branch.getBoolPref(name))
            bbsCore.CmdHandler.setAttribute('ChangeColorTableMenu', '1');
          else
            bbsCore.CmdHandler.setAttribute('ChangeColorTableMenu', '0');
          break;
        case "UseSubMenuForSearchEngine":
          if(branch.getBoolPref(name))
            bbsCore.CmdHandler.setAttribute('UseSubMenuForSearchEngine', '1');
          else
            bbsCore.CmdHandler.setAttribute('UseSubMenuForSearchEngine', '0');
          break;
        case "FileIoMenu":
          if(branch.getBoolPref(name))
            bbsCore.CmdHandler.setAttribute('FileIoMenu', '1');
          else
            bbsCore.CmdHandler.setAttribute('FileIoMenu', '0');
          break;
        case "DownloadLineDelay":
          _this.downloadLineDelay=branch.getIntPref(name);
          break;
        case "DownloadFullPost":
          _this.downloadFullPost=branch.getBoolPref(name);
          break;
        case "SaveAfterDownload":
          _this.saveAfterDownload=branch.getBoolPref(name);
          break;
        case "EasyReadingWithImg":
          _this.easyReadingWithImg=branch.getBoolPref(name);
          break;
        case "EasyReadingWithVideo":
          _this.easyReadingWithVideo=branch.getBoolPref(name);
          break;
        case "ScreenKeyboardAlpha":
          if(bbsCore.symbolinput)
            bbsCore.symbolinput.setWindowAlpha(branch.getIntPref(name));
          break;
        case "EmbeddedPlayerSize":
          if(bbsCore.playerMgr)
            bbsCore.playerMgr.setDefaultWindowSize(branch.getIntPref(name));
          break;
        case "EPAutoPlay":
          if(bbsCore.playerMgr)
            bbsCore.playerMgr.epAutoPlay = branch.getBoolPref(name);
          break;
        case "EPLoop":
          if(bbsCore.playerMgr)
            bbsCore.playerMgr.epLoop = branch.getBoolPref(name);
          break;
        case "EPHtml5":
          if(bbsCore.playerMgr)
            bbsCore.playerMgr.epHtml5 = branch.getBoolPref(name);
          break;
        case "EPAutoUseHQ":
          if(bbsCore.playerMgr)
            bbsCore.playerMgr.epAutoUseHQ = branch.getBoolPref(name);
          break;
        case "EPCopyUrlButton":
          if(bbsCore.playerMgr)
          {
            bbsCore.playerMgr.epCopyUrlButton = branch.getBoolPref(name);
            bbsCore.playerMgr.setAllEmbededPlayerUrlBtn(bbsCore.playerMgr.epCopyUrlButton);
          }
          break;
        case "EPWhenDropLink":
          _this.epWhenDropLink = branch.getBoolPref(name);
          break;
        case "UseHttpContextMenu":
          _this.useHttpContextMenu = branch.getBoolPref(name);
          break;
        case "NotifyWhenBackground":
          _this.notifyWhenBackground=branch.getBoolPref(name);
          break;
        case "NotifyBySound":
          _this.notifyBySound=branch.getBoolPref(name);
          break;
        case "NotifyByMessage":
          _this.notifyByMessage=branch.getBoolPref(name);
          break;
        case "NotifyBlockByTime":
          _this.notifyBlockByTime=branch.getBoolPref(name);
          break;
        case "NotifyShowContent":
          _this.notifyShowContent=branch.getBoolPref(name);
          break;
        case "ClickAlertAction":
          _this.clickAlertAction=branch.getIntPref(name);
          break;
        case "TelnetProxyType":
          {
            var pt = branch.getIntPref(name);
            if(pt==0)
              _this.telnetProxyType = "";
            else if(pt==1)
              _this.telnetProxyType = "http";
            else if(pt==2)
              _this.telnetProxyType = "socks4";
            else if(pt==3)
              _this.telnetProxyType = "socks";
            else if(pt==4)
              _this.telnetProxyType = "direct";
            else if(pt==5)
              _this.telnetProxyType = "https";
          }
          break;
        case "TelnetProxyPort":
          _this.telnetProxyPort=branch.getIntPref(name);
          break;
        case "TelnetProxyHost":
          _this.telnetProxyHost=branch.getComplexValue(name, CiStr).data;
          break;
        case "SshProxyType":
          {
            var pt = branch.getIntPref(name);
            if(pt==0)
              _this.sshProxyType = "";
            else if(pt==1)
              _this.sshProxyType = "http";
            else if(pt==2)
              _this.sshProxyType = "socks4";
            else if(pt==3)
              _this.sshProxyType = "socks";
            else if(pt==4)
              _this.sshProxyType = "direct";
            else if(pt==5)
              _this.sshProxyType = "https";
          }
          break;
        case "SshProxyPort":
          _this.sshProxyPort=branch.getIntPref(name);
          break;
        case "SshProxyHost":
          _this.sshProxyHost=branch.getComplexValue(name, CiStr).data;
          break;
        case "SshLoginType":
          _this.sshLoginType=branch.getIntPref(name);
          break;
        case "AlertReplyString":
          _this.alertReplyString=UnEscapeStr(branch.getComplexValue(name, CiStr).data);
          break;
        case "HideBookMarkLinkMenu":
          if(branch.getBoolPref(name))
            bbsCore.CmdHandler.setAttribute('hideBookMarkLink', '1');
          else
            bbsCore.CmdHandler.setAttribute('hideBookMarkLink', '0');
          break;
        case "HideSendLinkMenu":
          if(branch.getBoolPref(name))
            bbsCore.CmdHandler.setAttribute('hideSendLink', '1');
          else
            bbsCore.CmdHandler.setAttribute('hideSendLink', '0');
          break;
        case "HideBookMarkPageMenu":
          if(branch.getBoolPref(name))
            bbsCore.CmdHandler.setAttribute('hideBookMarkPage', '1');
          else
            bbsCore.CmdHandler.setAttribute('hideBookMarkPage', '0');
          break;
        case "HideSendPageMenu":
          if(branch.getBoolPref(name))
            bbsCore.CmdHandler.setAttribute('hideSendPage', '1');
          else
            bbsCore.CmdHandler.setAttribute('hideSendPage', '0');
          break;
        case "HideViewInfoMenu":
          if(branch.getBoolPref(name))
            bbsCore.CmdHandler.setAttribute('hideViewInfo', '1');
          else
            bbsCore.CmdHandler.setAttribute('hideViewInfo', '0');
          break;
        case "HideInspectMenu":
          if(branch.getBoolPref(name))
            bbsCore.CmdHandler.setAttribute('hideInspect', '1');
          else
            bbsCore.CmdHandler.setAttribute('hideInspect', '0');
          break;
        case "HideInputBuffer":
          _this.hideInputBuffer = branch.getBoolPref(name);
          if(!_this.hideInputBuffer)
          {
            bbsCore.DocInputArea.style.border = 'none';
            bbsCore.DocInputArea.style.width =  '200px';
            bbsCore.DocInputArea.style.height = '24px';
            bbsCore.DocInputArea.style.top = '0px';
            bbsCore.DocInputArea.style.left = '-10000px';
          }
          break;
        case "InputBufferSizeType":
          _this.inputBufferSizeType = branch.getIntPref(name);
          break;
        case "DefineInputBufferSize":
          _this.defineInputBufferSize = branch.getIntPref(name);
          break;
        case "DisplayDelay":
          _this.viewBufferTimer = branch.getIntPref(name);
          break;
        case "UseKeyWordTrack":
          _this.useKeyWordTrack = branch.getBoolPref(name);
          if(_this.useKeyWordTrack)
            bbsCore.CmdHandler.setAttribute('useKeyWordTrack', '1');
          else
            bbsCore.CmdHandler.setAttribute('useKeyWordTrack', '0');
          bbsCore.view.update(true);
          bbsCore.view.updateCursorPos();
          break;
        case "KeyWordTrackCaseSensitive":
          _this.keyWordTrackCaseSensitive = branch.getBoolPref(name);
          bbsCore.view.update(true);
          bbsCore.view.updateCursorPos();
          break;
        case "DeleteSpaceWhenCopy":
          _this.deleteSpaceWhenCopy=branch.getBoolPref(name);
          break;
        case "PreventNewTongWenAutoConv":
          _this.preventNewTongWenAutoConv=branch.getBoolPref(name);
          break;
        case "PushThreadLineLength":
          _this.pushThreadLineLength = branch.getIntPref(name);
          break;
        case "EnablePicturePreview":
          _this.enablePicturePreview = branch.getBoolPref(name);
          break;
        case "CtrlPicturePreview":
          _this.ctrlPicturePreview = branch.getBoolPref(name);
          break;
        case "PicturePreviewInfo":
          _this.picturePreviewInfo = branch.getBoolPref(name);
          break;
        case "PicturePreviewClose":
          _this.picturePreviewClose = branch.getBoolPref(name);
          break;
        case "PicturePreviewHeight":
          _this.picturePreviewHeight = branch.getIntPref(name);
          bbsCore.CmdHandler.setAttribute('LastPicAddr', '0');
          break;
        case "PreLoginPrompt":
          _this.loginPrompt[0] = branch.getComplexValue(name, CiStr).data;
          break;
        case "LoginPrompt":
          _this.loginPrompt[1] = branch.getComplexValue(name, CiStr).data;
          break;
        case "PasswdPrompt":
          _this.loginPrompt[2] = branch.getComplexValue(name, CiStr).data;
          break;
        case "PreLogin":
          _this.loginStr[0] = UnEscapeStr(branch.getComplexValue(name, CiStr).data);
          break;
        case "PostLogin":
          _this.loginStr[3] = UnEscapeStr(branch.getComplexValue(name, CiStr).data);
          break;
        case "DisplayBorder":
        case "BorderColor":
          var borderColor = branch.getIntPref('BorderColor');
          if(branch.getBoolPref('DisplayBorder'))
            bbsCore.view.mainDisplay.style.border = '1px solid '+ bbsCore.view.termColors[borderColor];
          else
            bbsCore.view.mainDisplay.style.border = '0px';
          bbsCore.view.updateCursorPos();
          break;
        case "BackgroundBrightness":
          var brightness = branch.getIntPref(name);
          bbsCore.bbsbg.SetBrightness(brightness);
          break;
        case "BackgroundType":
        case "BackgroundImageMD5":
          var bt = branch.getIntPref('BackgroundType');
          var str = branch.getComplexValue('BackgroundImageMD5', CiStr).data;
          bbsCore.bbsbg.ResetBackground(bt, str);
          break;
        case "HokeyForBgDisplay":
          _this.hokeyForBgDisplay = branch.getBoolPref(name);
          break;
        case "HokeyChangeColorTable":
          _this.hokeyChangeColorTable = branch.getBoolPref(name);
          break;
        case "SwitchBgDisplayMenu":
          if(branch.getBoolPref(name))
            bbsCore.CmdHandler.setAttribute("SwitchBgDisplayMenu", '1');
          else
            bbsCore.CmdHandler.setAttribute("SwitchBgDisplayMenu", '0');
          break;
        case "BlacklistedUserIds":
          var blu = branch.getComplexValue(name, CiStr).data;
          blu = blu.replace(/\r\n/g, '\r');
          blu = blu.replace(/\n/g, '\r');
          blu = blu.replace(/\r/g, ',');
          bluArr = blu.split(',');
          _this.blacklistedUserIds = [];
          for(var i=0;i<bluArr.length;++i){
            if(bluArr[i]!='')
              _this.blacklistedUserIds.push(bluArr[i]);
          }
          break;
        case "EnableBlacklist":
          _this.enableBlacklist = branch.getBoolPref(name);
          break;
        }
      } catch(e) {
        // eats all errors
        return;
      }
    }
};
