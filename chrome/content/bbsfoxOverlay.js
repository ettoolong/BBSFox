var ETT_BBSFOX_Overlay =
{
  bbspopupshowing : function(event) {

    var cmdhandler = gBrowser.contentDocument.getElementById("cmdHandler");
    var menuitem = null;
    if(cmdhandler && cmdhandler.getAttribute('bbsfox'))
    {
      var isOnPicWindow = (cmdhandler.getAttribute('mouseOnPicWindow')=='1');
      if(isOnPicWindow)
      {
        /*
        var targetNode = gBrowser.contentDocument.getElementById("popupNodePic");
        //d o c u m e n t . p o p u p N o d e = targetNode; //reset popupNode at here?
        targetNode.removeAttribute('id');
        */
        var sel = document.commandDispatcher.focusedWindow.getSelection();
        if(sel.rangeCount > 0) sel.removeAllRanges();

        menuitem = document.getElementById("bbsfox_menuEx-context-viewimage");
        menuitem.hidden = false;
        menuitem = document.getElementById("bbsfox_menuEx-context-copyimage-contents");
        menuitem.hidden = false;
        menuitem = document.getElementById("bbsfox_menuEx-context-copyimage");
        menuitem.hidden = false;
        menuitem = document.getElementById("bbsfox_menuEx-context-sep-copyimage");
        menuitem.hidden = false;
        menuitem = document.getElementById("bbsfox_menuEx-context-saveimage");
        menuitem.hidden = false;
        menuitem = document.getElementById("bbsfox_menuEx-context-sendimage");
        menuitem.hidden = false;
        menuitem = document.getElementById("bbsfox_menuEx-context-setDesktopBackground");
        menuitem.hidden = false;
        menuitem = document.getElementById("bbsfox_menuEx-context-viewimageinfo");
        menuitem.hidden = false;

        menuitem = document.getElementById("bbsfox_menuEx-search");
        menuitem.hidden = true;
        menuitem = document.getElementById("bbsfox_menuEx-copylink");
        menuitem.hidden = true;
        menuitem = document.getElementById("bbsfox_menuEx-savepage");
        menuitem.hidden = true;
        menuitem = document.getElementById("bbsfox_menuEx-copy");
        menuitem.hidden = true;
        menuitem = document.getElementById("bbsfox_menuEx-ansiCopy");
        menuitem.hidden = true;
        menuitem = document.getElementById("bbsfox_menuEx-paste");
        menuitem.hidden = true;
        menuitem = document.getElementById("bbsfox_menuEx-selAll");
        menuitem.hidden = true;
        menuitem = document.getElementById("bbsfox_menuEx-screenKeyboard");
        menuitem.hidden = true;
        menuitem = document.getElementById("bbsfox_menuEx-embeddedPlayer");
        menuitem.hidden = true;
        menuitem = document.getElementById("bbsfox_menuEx-previewPicture");
        menuitem.hidden = true;
        menuitem = document.getElementById("bbsfox_menuEx-openAllLink");
        menuitem.hidden = true;
        menuitem = document.getElementById("bbsfox_menuEx-addTrack");
        menuitem.hidden = true;
        menuitem = document.getElementById("bbsfox_menuEx-delTrack");
        menuitem.hidden = true;
        menuitem = document.getElementById("bbsfox_menuEx-clearTrack");
        menuitem.hidden = true;
        menuitem = document.getElementById("bbsfox_menuEx-delayPaste");
        menuitem.hidden = true;
        menuitem = document.getElementById("bbsfox_menuEx-copyHtml");
        menuitem.hidden = true;
        menuitem = document.getElementById("bbsfox_menuEx-downloadPost");
        menuitem.hidden = true;
        menuitem = document.getElementById("bbsfox_menuEx-FileIo");
        menuitem.hidden = true;
        menuitem = document.getElementById("bbsfox_menuEx-mouseBrowsing");
        menuitem.hidden = true;
        menuitem = document.getElementById("bbsfox_menuEx-BgDisplay");
        menuitem.hidden = true;
        menuitem = document.getElementById("bbsfox_menuEx-replyrobot");
        menuitem.hidden = true;
        menuitem = document.getElementById("bbsfox_menuEx-pushThread");
        menuitem.hidden = true;
        menuitem = document.getElementById("bbsfox_menuEx-easyRead");
        menuitem.hidden = true;
        menuitem = document.getElementById("bbsfox_menuEx-changeColorTable");
        menuitem.hidden = true;
      }
      else
      {
        var menuitem2 = null;
        var isTextSelected = !(gBrowser.contentWindow.getSelection().isCollapsed);
        if(isTextSelected)
        {
          menuitem = document.getElementById("bbsfox_menuEx-copy");
          menuitem.hidden = false;
        }
        else
        {
          menuitem = document.getElementById("bbsfox_menuEx-copy");
          menuitem.hidden = true;
        }
        menuitem = document.getElementById("bbsfox_menuEx-paste");
        menuitem.hidden = false;
        menuitem = document.getElementById("bbsfox_menuEx-selAll");
        menuitem.hidden = false;

        var isPicLink = false;
        var curentUrl = null;
        var onLink = false;
        var elem = document.popupNode;
        while (elem)
        {
          if (elem.nodeType == Node.ELEMENT_NODE) {
            // Link?
            if (!onLink && ((elem instanceof HTMLAnchorElement && elem.href) || (elem instanceof HTMLAreaElement && elem.href) || elem instanceof HTMLLinkElement || elem.getAttributeNS("http://www.w3.org/1999/xlink", "type") == "simple"))
            {
              // Target is a link or a descendant of a link.
              onLink = true;
              var realLink = elem;
              var parent = elem;
              while ((parent = parent.parentNode) && (parent.nodeType == Node.ELEMENT_NODE))
              {
                try {
                  if ((parent instanceof HTMLAnchorElement && parent.href) || (parent instanceof HTMLAreaElement && parent.href) || parent instanceof HTMLLinkElement || parent.getAttributeNS("http://www.w3.org/1999/xlink", "type") == "simple")
                    realLink = parent;
                } catch (ex) { }
              }
              curentUrl = realLink.href;//_this.getLinkURL();
            }
          }
          elem = elem.parentNode;
        }
        if(curentUrl)
          isPicLink = !(curentUrl.search(/\.(bmp|gif|jpe?g|png)$/i) == -1);
        var useMenuEmbeddedWindow = (cmdhandler.getAttribute('EmbeddedPlayerMenu')=='1');
        var useCopyHtml =  (cmdhandler.getAttribute('CopyHtmlMenu')=='1');
        var useDelayPasteMenu = (cmdhandler.getAttribute('DelayPasteMenu')=='1');
        var useMouseBrowseMenu = (cmdhandler.getAttribute('MouseBrowseMenu')=='1');
        var useBgDisplayMenu = (cmdhandler.getAttribute('SwitchBgDisplayMenu')=='1');
        var enableBackground = (cmdhandler.getAttribute('EnableBackground')=='1');
        var useKeyWordTrack = (cmdhandler.getAttribute('useKeyWordTrack')=='1') && (cmdhandler.getAttribute('KeyWordTrackMenu')=='1');
        var useSavePage = (cmdhandler.getAttribute('SavePageMenu')=='1');
        var useAnsiCopy = (cmdhandler.getAttribute('AnsiCopyMenu')=='1');
        var useSubMenuForSearchEngine = (cmdhandler.getAttribute('UseSubMenuForSearchEngine') =='1');
        var allLinks = gBrowser.contentDocument.getElementsByTagName('a');
        var haveLink = (allLinks.length>0);
        var keywords = gBrowser.contentDocument.getElementById("TrackKeyWordList");

        menuitem = document.getElementById("bbsfox_menuEx-copylink");
        if(curentUrl)
          menuitem.hidden = false;
        else
          menuitem.hidden = true;

        menuitem = document.getElementById("bbsfox_menuEx-previewPicture");
        menuitem2 = document.getElementById("bbsfox_menu-previewPicture");
        menuitem.hidden = !(cmdhandler.getAttribute("PreviewPictureMenu")=='1' && isPicLink);
        menuitem2.setAttribute('PURL', curentUrl);

        menuitem = document.getElementById("bbsfox_menuEx-embeddedPlayer");
        menuitem2 = document.getElementById("bbsfox_menu-embeddedPlayer");

        if(useMenuEmbeddedWindow && curentUrl)
        {
          if(curentUrl!='')
          {
            if( this.vtRegex.test(curentUrl) )
            {
              menuitem2.setAttribute('VT', 'Y');
              menuitem2.setAttribute('VURL', curentUrl);
              menuitem.hidden = false;
            }
            else if( this.vtRegex2.test(curentUrl) )
            {
              menuitem2.setAttribute('VT', 'U');
              menuitem2.setAttribute('VURL', curentUrl);
              menuitem.hidden = false;
            }
            else if( this.vtRegex3.test(curentUrl) )
            {
              menuitem2.setAttribute('VT', 'R');
              menuitem2.setAttribute('VURL', curentUrl);
              menuitem.hidden = false;
            }
            /*
            else if( this.vtRegex4.test(curentUrl) )
            {
              menuitem2.setAttribute('VT', 'O');
              menuitem2.setAttribute('VURL', curentUrl);
              menuitem.hidden = false;
            }
            */
            else
              menuitem.hidden = true;
          }
          else
            menuitem.hidden = true;//!gContextMenu.onLink;
        }
        else
          menuitem.hidden = true;

        menuitem = document.getElementById("bbsfox_menuEx-screenKeyboard");
        menuitem.hidden = (isTextSelected || !(cmdhandler.getAttribute("ScreenKeyboardMenu")=='1' && cmdhandler.getAttribute("ScreenKeyboardOpened")=='0'));

        menuitem = document.getElementById("bbsfox_menuEx-openAllLink");
        menuitem.hidden = (isTextSelected || !(cmdhandler.getAttribute("OpenAllLinkMenu")=='1' && haveLink));
        //////////////////
        if(isTextSelected)
        {
          var selstr = gBrowser.contentWindow.getSelection().toString();
          if(useKeyWordTrack)
          {
            var strArray = selstr.split('\r\n');
            if(strArray.length>1 || strArray.length<1) //select text include \r\n
            {
              menuitem = document.getElementById("bbsfox_menuEx-addTrack");
              menuitem.hidden = true;
              menuitem = document.getElementById("bbsfox_menuEx-delTrack");
              menuitem.hidden = true;
            }
            else
            {
              selstr = this.trim_right(strArray[0]);
              var findflag = false;
              for (var i = 0; i < keywords.childNodes.length; i++) {
                if (keywords.childNodes[i].nodeValue == selstr){
                  findflag = true;
                  break;
                }
              }
              if(findflag) // select text already in track list
              {
                menuitem = document.getElementById("bbsfox_menuEx-addTrack");
                menuitem.hidden = true;
                menuitem = document.getElementById("bbsfox_menuEx-delTrack");
                menuitem.hidden = false;
              }
              else
              {
                menuitem = document.getElementById("bbsfox_menuEx-addTrack");
                menuitem.hidden = false;
                menuitem = document.getElementById("bbsfox_menuEx-delTrack");
                menuitem.hidden = true;
              }
            }
          }
          else
          {
            menuitem = document.getElementById("bbsfox_menuEx-addTrack");
            menuitem.hidden = true;
            menuitem = document.getElementById("bbsfox_menuEx-delTrack");
            menuitem.hidden = true;
          }

          var engineName = "";
          var ss = Components.classes["@mozilla.org/browser/search-service;1"].getService(Components.interfaces.nsIBrowserSearchService);
          if (isElementVisible(BrowserSearch.searchBar))
            engineName = ss.currentEngine.name;
          else
            engineName = ss.defaultEngine.name;

          // format "Search <engine> for <selection>" string to show in menu
          menuitem = document.getElementById("bbsfox_menuEx-search");
          menuitem2 = document.getElementById("bbsfox_menuEx-searchEx");
          var selstrForSearch = this.trim_both(selstr);
          menuitem2.setAttribute("searchtext", selstrForSearch);
          if(selstrForSearch.length>0)
          {
            if (selstrForSearch.length > 15)
              selstrForSearch = selstrForSearch.substr(0,15) + this.ellipsis;

            var menuLabel = '';
            var accessKey = '';
            try{
              menuLabel = gNavigatorBundle.getFormattedString("contextMenuSearchText",[engineName,selstrForSearch]);
            }
            catch(ex){
              menuLabel ='';
            }
            if(menuLabel=='')
            {
              try{
                menuLabel = gNavigatorBundle.getFormattedString("contextMenuSearch",[engineName,selstrForSearch]);
              }
              catch(ex){
                menuLabel ='';
              }
            }
            try{
              accessKey = gNavigatorBundle.getString("contextMenuSearchText.accesskey");
            }
            catch(ex){
              accessKey ='';
            }
            if(accessKey=='')
            {
              try{
                accessKey = gNavigatorBundle.getString("contextMenuSearch.accesskey");
              }
              catch(ex){
                accessKey ='';
              }
            }
            menuitem.label = menuLabel;
            menuitem.accessKey = accessKey;

            this.rebuildSearchSubMenu();
            var strBundle = document.getElementById("bbsfoxoverlay-string-bundle");
            menuitem2.label = strBundle.getFormattedString("SearchText",[selstrForSearch]);

            menuitem.hidden = useSubMenuForSearchEngine;
            menuitem2.hidden = !useSubMenuForSearchEngine;
          }
          else
          {
            menuitem.hidden = true;
            menuitem2.hidden = true;
          }
        }
        else
        {
          menuitem = document.getElementById("bbsfox_menuEx-addTrack");
          menuitem.hidden = true;
          menuitem = document.getElementById("bbsfox_menuEx-delTrack");
          menuitem.hidden = true;
          menuitem = document.getElementById("bbsfox_menuEx-search");
          menuitem.hidden = true;
          menuitem = document.getElementById("bbsfox_menuEx-searchEx");
          menuitem.hidden = true;
        }
        menuitem = document.getElementById("bbsfox_menuEx-clearTrack");
        menuitem.hidden = !(useKeyWordTrack && keywords.childNodes.length);

        menuitem = document.getElementById("bbsfox_menuEx-paste");
        menuitem.hidden = false;
        menuitem = document.getElementById("bbsfox_menuEx-delayPaste");//check clipboard first ?
        menuitem.hidden = !useDelayPasteMenu;

        menuitem = document.getElementById("bbsfox_menuEx-copyHtml");
        menuitem.hidden = !useCopyHtml;

        menuitem = document.getElementById("bbsfox_menuEx-ansiCopy");
        menuitem.hidden = (!isTextSelected || !useAnsiCopy);

        menuitem = document.getElementById("bbsfox_menuEx-mouseBrowsing");
        menuitem.hidden = (isTextSelected || !useMouseBrowseMenu);

        menuitem = document.getElementById("bbsfox_menuEx-BgDisplay");
        menuitem.hidden = (isTextSelected || !(useBgDisplayMenu && enableBackground));

        menuitem = document.getElementById("bbsfox_menuEx-savepage");
        menuitem.hidden = (isTextSelected || !useSavePage);
        //////////////////
        menuitem = document.getElementById("bbsfox_menuEx-easyRead");
        menuitem.hidden = (isTextSelected || !(cmdhandler.getAttribute("EasyReadingMenu")=='1'));

        menuitem = document.getElementById("bbsfox_menuEx-pushThread");
        menuitem.hidden = (isTextSelected || !(cmdhandler.getAttribute("PushThreadMenu")=='1'));

        menuitem = document.getElementById("bbsfox_menuEx-openThreadUrl");
        menuitem.hidden = (isTextSelected || !(cmdhandler.getAttribute("OpenThreadUrlMenu")=='1'));

        menuitem = document.getElementById("bbsfox_menuEx-changeColorTable");
        menuitem.hidden = (isTextSelected || !(cmdhandler.getAttribute("ChangeColorTableMenu")=='1'));

        menuitem = document.getElementById("bbsfox_menuEx-downloadPost");
        menuitem.hidden = (isTextSelected || !(cmdhandler.getAttribute("DownloadPostMenu")=='1'));

        menuitem = document.getElementById("bbsfox_menuEx-FileIo");
        menuitem.hidden = (isTextSelected || !(cmdhandler.getAttribute("FileIoMenu")=='1'));

        //
        menuitem = document.getElementById("bbsfox_menuEx-context-viewimage");
        menuitem.hidden = true;
        menuitem = document.getElementById("bbsfox_menuEx-context-copyimage-contents");
        menuitem.hidden = true;
        menuitem = document.getElementById("bbsfox_menuEx-context-copyimage");
        menuitem.hidden = true;
        menuitem = document.getElementById("bbsfox_menuEx-context-sep-copyimage");
        menuitem.hidden = true;
        menuitem = document.getElementById("bbsfox_menuEx-context-saveimage");
        menuitem.hidden = true;
        menuitem = document.getElementById("bbsfox_menuEx-context-sendimage");
        menuitem.hidden = true;
        menuitem = document.getElementById("bbsfox_menuEx-context-setDesktopBackground");
        menuitem.hidden = true;
        menuitem = document.getElementById("bbsfox_menuEx-context-viewimageinfo");
        menuitem.hidden = true;
        //
        menuitem = document.getElementById("bbsfox_menuEx-replyrobot");
        menuitem.hidden = !(this.ReplyRobotActive);
      }
    }
    else
    {
      //alert('cmdhandler = null?');
    }
    return true;
  },

  bbspopuphidden: function(event) {
    var linkedBrowser = gBrowser.mCurrentTab.linkedBrowser;
    if(linkedBrowser)
      linkedBrowser.setAttribute('context', 'contentAreaContextMenu');
  },

  //youtube url :
  //http://youtu.be/XXXXXXXXXX
  //http://www.youtube.com/watch?v=XXXXXXXXXX
  //http://m.youtube.com/watch?v=XXXXXXXXXX
  vtRegex: /((https?:\/\/www\.youtube\.com\/watch\?.*(v=[A-Za-z0-9._%-]*))|(https?:\/\/youtu\.be\/([A-Za-z0-9._%-]*))|(https?:\/\/m\.youtube\.com\/watch\?.*(v=[A-Za-z0-9._%-]*)))/i,
  //vtRegex: /(http:\/\/youtu\.be\/([A-Za-z0-9._%-]*))/i,
  vtRegex2: /(http:\/\/www\.ustream\.tv\/(channel|channel-popup)\/([A-Za-z0-9._%-]*))/i,
  vtRegex3: /(http:\/\/www\.ustream\.tv\/recorded\/([0-9]{5,10}))/i,
  urlCheck : /(^(telnet|ssh):\/\/)/i,
  Name : 'BBSFox overlay',
  BBSFoxVersion : "2.0.0",
  FXVersion: 3.6,
  ReplyRobotActive: false,
  ellipsis : "\u2026",
  consoleService: Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService),
  ioService : Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService),
  //application: Components.classes["@mozilla.org/fuel/application;1"].getService(Components.interfaces.fuelIApplication),
  /*
  addEventListener: function(obj, type, listener) {
    if (typeof(obj) == "string") obj = document.getElementById(obj);
    if (obj) obj.addEventListener(type, listener, false);
  },

  removeEventListener: function(obj, type, listener) {
    if (typeof(obj) == "string") obj = document.getElementById(obj);
    if (obj) obj.removeEventListener(type, listener, false);
  },

  addEventListenerByTagName: function(tag, type, listener) {
    var objs = document.getElementsByTagName(tag);
    for (var i = 0; i < objs.length; i++) {
      objs[i].addEventListener(type, listener, false);
    }
  },

  removeEventListenerByTagName: function(tag, type, listener) {
    var objs = document.getElementsByTagName(tag);
    for (var i = 0; i < objs.length; i++) {
      objs[i].removeEventListener(type, listener, false);
    }
  },
  */

  //TODO: Fix the return value
  getBBSPageElmtByDoc: function(doc) {
      var urlstr = doc.location.href.toString();
      if(this.urlCheck.test(urlstr))
      {
        if ( doc.getElementById('main')
          && doc.getElementById('cursor')
          && doc.getElementById('hideobj'))
        {
          return true;
        }
      }
      return false;
  },

  //TODO: Fix the return value
  getBBSPageElmtByTab: function(aTab) {
    var aBrowser = (aTab ? aTab.linkedBrowser : gBrowser);
    if (aBrowser && aBrowser.currentURI)
    {
      var urlstr = aBrowser.currentURI.spec;
      if(this.urlCheck.test(urlstr))
      {
        if ( aBrowser.contentDocument
          && aBrowser.contentDocument.getElementById('main')
          && aBrowser.contentDocument.getElementById('cursor')
          && aBrowser.contentDocument.getElementById('hideobj'))
        {
          return true;
        }
      }
    }
    return false;
  },

  isOnBBSPage: function() {
    return this.getBBSPageElmtByTab();
  },

  hideHtmlMenuItem: function(hideBML,hideSL,hideBMP,hideSP,hideVI,hideI,useSP) {
      var menuitem = null;

      menuitem = document.getElementById("context-savepage");
      if(menuitem) menuitem.hidden = (menuitem.hidden || !useSP);
      menuitem = document.getElementById("context-viewimage");
      if(menuitem) menuitem.hidden = true;
      menuitem = document.getElementById("context-viewbgimage");
      if(menuitem) menuitem.hidden = true;
      menuitem = document.getElementById("context-sep-viewbgimage");
      if(menuitem) menuitem.hidden = true;
      menuitem = document.getElementById("context-back");
      if(menuitem) menuitem.hidden = true;
      menuitem = document.getElementById("context-forward");
      if(menuitem) menuitem.hidden = true;
      menuitem = document.getElementById("context-reload");
      if(menuitem) menuitem.hidden = true;
      menuitem = document.getElementById("context-stop");
      if(menuitem) menuitem.hidden = true;

      menuitem = document.getElementById("context-sep-stop");
      if(menuitem) menuitem.hidden = true;

      menuitem = document.getElementById("context-viewpartialsource-selection");
      if(menuitem) menuitem.hidden = true;
      menuitem = document.getElementById("context-viewpartialsource-mathml");
      if(menuitem) menuitem.hidden = true;
      menuitem = document.getElementById("context-viewsource");
      if(menuitem) menuitem.hidden = true;

      //hide some item in option
      if(hideBML){
        menuitem = document.getElementById("context-bookmarklink");
        if(menuitem) menuitem.hidden = true;
      }
      if(hideSL){
        menuitem = document.getElementById("context-sendlink");
        if(menuitem) menuitem.hidden = true;
      }
      if(hideBMP){
        menuitem = document.getElementById("context-bookmarkpage");
        if(menuitem) menuitem.hidden = true;
      }
      if(hideSP){
        menuitem = document.getElementById("context-sendpage");
        if(menuitem) menuitem.hidden = true;
      }
      if(hideVI){
        menuitem = document.getElementById("context-sep-viewsource");
        if(menuitem) menuitem.hidden = true;
        menuitem = document.getElementById("context-viewinfo");
        if(menuitem) menuitem.hidden = true;
      }
      if(hideI){
        menuitem = document.getElementById("inspect-separator");
        if(menuitem) menuitem.hidden = true;
        menuitem = document.getElementById("context-inspect");
        if(menuitem) menuitem.hidden = true;
      }
      //menuitem = document.getElementById("tongwen-context-menu"); //for new tong wen tang add-on
      //if(menuitem)
      //  menuitem.hidden = true;
  },

  showHtmlMenuItem: function() {
      menuitem = document.getElementById("context-back");
      if(menuitem) menuitem.hidden = false;
      menuitem = document.getElementById("context-forward");
      if(menuitem) menuitem.hidden = false;
  },

  bbsfoxViewMenuShowing: function(e) {
    var menuitem = null;
    if(this.isOnBBSPage()) {
      menuitem = document.getElementById("viewFullZoomMenu");
      if(menuitem)
        menuitem.hidden = true;
      menuitem = document.getElementById("charsetMenu");
      if(menuitem)
        menuitem.hidden = true;
      menuitem = document.getElementById("menu_pageSource");
      if(menuitem)
        menuitem.hidden = true;
    } else {
      menuitem = document.getElementById("viewFullZoomMenu");
      if(menuitem)
        menuitem.hidden = false;
      menuitem = document.getElementById("charsetMenu");
      if(menuitem)
        menuitem.hidden = false;
      menuitem = document.getElementById("menu_pageSource");
      if(menuitem)
        menuitem.hidden = false;
    }
  },

  bbsfoxPuiMenuShowing: function(event) {
    var menuitem = null;
    if(this.isOnBBSPage()) {
      //menuitem = document.getElementById("zoom-controls"); //hide button
      //if(menuitem)
      //  menuitem.hidden = true;
      menuitem = document.getElementById("zoom-out-button");
      if(menuitem) menuitem.disabled = true;
      menuitem = document.getElementById("zoom-reset-button");
      if(menuitem) menuitem.disabled = false; //allow reset
      menuitem = document.getElementById("zoom-in-button");
      if(menuitem) menuitem.disabled = true;
      menuitem = document.getElementById("cut-button");
      if(menuitem) menuitem.disabled = true;
    } else {
      //menuitem = document.getElementById("zoom-controls");
      //if(menuitem)
      //  menuitem.hidden = false;
      menuitem = document.getElementById("zoom-out-button");
      if(menuitem)
        menuitem.disabled = false;
      menuitem = document.getElementById("zoom-reset-button");
      if(menuitem)
        menuitem.disabled = false;
      menuitem = document.getElementById("zoom-in-button");
      if(menuitem)
        menuitem.disabled = false;
    }
  },

  bbsfoxAppMenuShowing: function(e) {
    //if (e.originalTarget == document.getElementById("appmenu-popup"))
    //{
    var menuitem = null;
    if(this.isOnBBSPage()) {
      menuitem = document.getElementById("appmenu_developer_charsetMenu");
      if(menuitem)
        menuitem.hidden = true;
      menuitem = document.getElementById("appmenu_charsetMenu");
      if(menuitem)
        menuitem.hidden = true;
    } else {
      menuitem = document.getElementById("appmenu_developer_charsetMenu");
      if(menuitem)
        menuitem.hidden = false;
      menuitem = document.getElementById("appmenu_charsetMenu");
      if(menuitem)
        menuitem.hidden = false;
    }
    //}
    //else
    //{
    //}
  },

  bbsfoxContextMenuShowing: function(e) {
    var isNowBBSPage = this.isOnBBSPage();

    var hideBookMarkLink = false;
    var hideSendLink = false;
    var hideBookMarkPage = false;
    var hideSendPage = false;
    var hideViewInfo = false;
    var hideInspect = false;
    var useSavePage = false;
    var useAnsiCopy = false;
    var isOnPicWindow = false;
    var useCopyHtml = false;
    var useDelayPasteMenu = false;
    var useKeyWordTrack = false;
    var useMouseBrowseMenu = false;
    var useBgDisplayMenu = false;
    var enableBackground = false;
    var cmdhandler;
    if(isNowBBSPage)
    {
      cmdhandler = this.getCmdHandler();
      isOnPicWindow = (cmdhandler.getAttribute('mouseOnPicWindow')=='1');
      hideBookMarkLink = (cmdhandler.getAttribute('hideBookMarkLink')=='1');
      hideSendLink = (cmdhandler.getAttribute('hideSendLink')=='1');
      hideBookMarkPage = (cmdhandler.getAttribute('hideBookMarkPage')=='1');
      hideSendPage = (cmdhandler.getAttribute('hideSendPage')=='1');
      hideViewInfo = (cmdhandler.getAttribute('hideViewInfo')=='1');
      hideInspect = (cmdhandler.getAttribute('hideInspect')=='1');
      useSavePage =  (cmdhandler.getAttribute('SavePageMenu')=='1');
      useAnsiCopy =  (cmdhandler.getAttribute('AnsiCopyMenu')=='1');
      useCopyHtml =  (cmdhandler.getAttribute('CopyHtmlMenu')=='1');
      useDelayPasteMenu = (cmdhandler.getAttribute('DelayPasteMenu')=='1');
      useMouseBrowseMenu = (cmdhandler.getAttribute('MouseBrowseMenu')=='1');
      useBgDisplayMenu = (cmdhandler.getAttribute('SwitchBgDisplayMenu')=='1');
      enableBackground = (cmdhandler.getAttribute('EnableBackground')=='1');
      useKeyWordTrack = (cmdhandler.getAttribute('useKeyWordTrack')=='1') && (cmdhandler.getAttribute('KeyWordTrackMenu')=='1');
    }

    if (e.originalTarget == document.getElementById("contentAreaContextMenu"))
    {
    }
    else
    {
      if(isNowBBSPage)
      {
        this.hideHtmlMenuItem(hideBookMarkLink, hideSendLink, hideBookMarkPage, hideSendPage, hideViewInfo, hideInspect, useSavePage);
      }
      return;
    }
    if (!gContextMenu) return;
    var menuitem = null;
    var dwhelperContextMenu = false;
    //var tongwentangContextMenu = false;
    try {
          var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("dwhelper.");
          if(prefs)
            dwhelperContextMenu = prefs.getBoolPref('context-menu');
    } catch(ex) {}

    if(isNowBBSPage)
    {
      cmdhandler = this.getCmdHandler();
      var keywords = gBrowser.contentDocument.getElementById("TrackKeyWordList");
      this.hideHtmlMenuItem(hideBookMarkLink, hideSendLink, hideBookMarkPage, hideSendPage, hideViewInfo, hideInspect, useSavePage);

      menuitem = document.getElementById("ietab-viewpage");//for coral ie-tab / ie-tab plus add-on
      if(menuitem)
        menuitem.hidden = true;
      menuitem = document.getElementById("ietab-viewpage-sep");//for coral ie-tab / ie-tab plus  add-on
      if(menuitem)
        menuitem.hidden = true;

      menuitem = document.getElementById("ietab2-viewpage");//for ie-tab2 add-on
      if(menuitem)
        menuitem.hidden = true;
      menuitem = document.getElementById("ietab2-viewpage-extapp");//for ie-tab2 add-on
      if(menuitem)
        menuitem.hidden = true;
      menuitem = document.getElementById("ietab2-viewpage-sep");//for ie-tab2 add-on
      if(menuitem)
        menuitem.hidden = true;

      menuitem = document.getElementById("dwhelper-ctxmenu");//for DownloadHelper add-on
      if(menuitem)
        menuitem.hidden = true;
      menuitem = document.getElementById("dwhelper-snmenu");//for DownloadHelper add-on
      if(menuitem)
        menuitem.hidden = true;

      //menuitem = document.getElementById("tongwen-context-menu"); //for new tong wen tang add-on
      //if(menuitem)
      //  menuitem.hidden = true;

      if(!isOnPicWindow)
      {
        //bbsfox menu - start
        menuitem = document.getElementById("bbsfox_menu-embeddedPlayer");
        var allLinks = gBrowser.contentDocument.getElementsByTagName('a');
        var useMenuEmbeddedWindow = false;
        var haveLink = (allLinks.length>0);
        var isPicLink = false;
        if(cmdhandler)
        {
          var curentUrl = this.getContextLinkURL();
          if(curentUrl)
            isPicLink = !(curentUrl.search(/\.(bmp|gif|jpe?g|png)$/i) == -1);
          useMenuEmbeddedWindow = (cmdhandler.getAttribute('EmbeddedPlayerMenu')=='1');
        }
        var isTextSelected = !(gBrowser.contentWindow.getSelection().isCollapsed);
        if(useMenuEmbeddedWindow)
        {
          var urltemp = this.getContextLinkURL();
          if(urltemp)
          {
            if( this.vtRegex.test(urltemp) )
            {
              menuitem.setAttribute('VT', 'Y');
              menuitem.setAttribute('VURL', urltemp);
              menuitem.hidden = false;
            }
            else if( this.vtRegex2.test(urltemp) )
            {
              menuitem.setAttribute('VT', 'U');
              menuitem.setAttribute('VURL', urltemp);
              menuitem.hidden = false;
            }
            else if( this.vtRegex3.test(urltemp) )
            {
              menuitem.setAttribute('VT', 'R');
              menuitem.setAttribute('VURL', urltemp);
              menuitem.hidden = false;
            }
            /*
            else if( this.vtRegex4.test(urltemp) )
            {
              menuitem.setAttribute('VT', 'O');
              menuitem.setAttribute('VURL', urltemp);
              menuitem.hidden = false;
            }
            */
            else
              menuitem.hidden = true;
          }
          else
            menuitem.hidden = true;//!gContextMenu.onLink;
            //menuitem.setAttribute('VT', 'U');
            //menuitem.hidden = false;
        }
        else
          menuitem.hidden = true;

        if(!isTextSelected) // not select anything
        {
          menuitem = document.getElementById("bbsfox_menu-addTrack");
          menuitem.hidden = true;
          menuitem = document.getElementById("bbsfox_menu-delTrack");
          menuitem.hidden = true;
        }
        else // have select something
        {
          if(useKeyWordTrack)
          {
            var selstr = gBrowser.contentWindow.getSelection().toString();
            var strArray = selstr.split('\r\n');
            if(strArray.length>1 || strArray.length<1) //select text include \r\n
            {
              menuitem = document.getElementById("bbsfox_menu-addTrack");
              menuitem.hidden = true;
              menuitem = document.getElementById("bbsfox_menu-delTrack");
              menuitem.hidden = true;
            }
            else
            {
              selstr = this.trim_right(strArray[0]);
              var findflag = false;

              for (var i = 0; i < keywords.childNodes.length; i++) {
                if (keywords.childNodes[i].nodeValue == selstr){
                  findflag = true;
                  break;
                }
              }
              if(findflag) // select text already in track list
              {
                menuitem = document.getElementById("bbsfox_menu-addTrack");
                menuitem.hidden = true;
                menuitem = document.getElementById("bbsfox_menu-delTrack");
                menuitem.hidden = false;
              }
              else
              {
                menuitem = document.getElementById("bbsfox_menu-addTrack");
                menuitem.hidden = false;
                menuitem = document.getElementById("bbsfox_menu-delTrack");
                menuitem.hidden = true;
              }
            }
          }//if(useKeyWordTrack)
          else
          {
            menuitem = document.getElementById("bbsfox_menu-addTrack");
            menuitem.hidden = true;
            menuitem = document.getElementById("bbsfox_menu-delTrack");
            menuitem.hidden = true;
          }
        }
        menuitem = document.getElementById("bbsfox_menu-ansiCopy");
        menuitem.hidden = (!isTextSelected || !useAnsiCopy);

        menuitem = document.getElementById("bbsfox_menu-clearTrack");
        menuitem.hidden = !(useKeyWordTrack && keywords.childNodes.length);

        menuitem = document.getElementById("context-paste");
        menuitem.hidden = false;
        var pasteCmd = !(menuitem.disabled);
        menuitem = document.getElementById("bbsfox_menu-delayPaste");//check clipboard first ?
        menuitem.hidden = !(useDelayPasteMenu && pasteCmd);

        menuitem = document.getElementById("bbsfox_menu-copyHtml");
        menuitem.hidden = !useCopyHtml;

        menuitem = document.getElementById("bbsfox_menu-screenKeyboard");
        menuitem.hidden = (isTextSelected || !(cmdhandler.getAttribute("ScreenKeyboardMenu")=='1' && cmdhandler.getAttribute("ScreenKeyboardOpened")=='0'));

        menuitem = document.getElementById("bbsfox_menu-openAllLink");
        menuitem.hidden = (isTextSelected || !(cmdhandler.getAttribute("OpenAllLinkMenu")=='1' && haveLink));

        menuitem = document.getElementById("bbsfox_menu-previewPicture");
        menuitem.hidden = !(cmdhandler.getAttribute("PreviewPictureMenu")=='1' && isPicLink);
        menuitem.setAttribute('PURL', this.getContextLinkURL());

        menuitem = document.getElementById("bbsfox_menu-easyRead");
        menuitem.hidden = (isTextSelected || !(cmdhandler.getAttribute("EasyReadingMenu")=='1'));

        menuitem = document.getElementById("bbsfox_menu-pushThread");
        menuitem.hidden = (isTextSelected || !(cmdhandler.getAttribute("PushThreadMenu")=='1'));

        menuitem = document.getElementById("bbsfox_menu-openThreadUrl");
        menuitem.hidden = (isTextSelected || !(cmdhandler.getAttribute("OpenThreadUrlMenu")=='1'));

        menuitem = document.getElementById("bbsfox_menu-changeColorTable");
        menuitem.hidden = (isTextSelected || !(cmdhandler.getAttribute("ChangeColorTableMenu")=='1'));

        menuitem = document.getElementById("bbsfox_menu-downloadPost");
        menuitem.hidden = (isTextSelected || !(cmdhandler.getAttribute("DownloadPostMenu")=='1'));

        menuitem = document.getElementById("bbsfox_menu-FileIo");
        menuitem.hidden = (isTextSelected || !(cmdhandler.getAttribute("FileIoMenu")=='1'));

        menuitem = document.getElementById("bbsfox_menu-mouseBrowsing");
        menuitem.hidden = (isTextSelected || !useMouseBrowseMenu);

        menuitem = document.getElementById("bbsfox_menu-BgDisplay");
        menuitem.hidden = (isTextSelected || !(useBgDisplayMenu && enableBackground));
        //bbsfox menu - end
      }
      else
      {
        menuitem = document.getElementById("context-viewimage");
        menuitem.hidden = false;
        this.hidebbsfoxMenuItem();
      }
    }
    else
    {
      if(dwhelperContextMenu)
      {
        menuitem = document.getElementById("dwhelper-ctxmenu");//for DownloadHelper add-on
        if(menuitem)
          menuitem.hidden = false;
        menuitem = document.getElementById("dwhelper-snmenu");//for DownloadHelper add-on
        if(menuitem)
          menuitem.hidden = false;
      }
	    this.showHtmlMenuItem();
      this.hidebbsfoxMenuItem();
    }
  },

  bbsfoxContextMenuHidden: function(event) {
    if(this.isOnBBSPage()) {
      if(event.target == document.getElementById("contentAreaContextMenu")) {
        if(this.getHandlerParem('resetFocus')=='1') {
          var inputArea = gBrowser.contentDocument.getElementById('t');
          inputArea.blur();
          inputArea.focus();
        }
      }
    }
  },

  viewimage: function(event) {
    if (gBrowser && gBrowser.currentURI){
      var scheme = gBrowser.currentURI.scheme;
      if(scheme=='telnet' || scheme=='ssh')
      {
        //The event may be a mouse event (click, double-click, middle-click) or keypress event (enter).
        //some problem to work with tabkit...
        var e = event;
        var evt = e.view.document.createEvent("MouseEvents");//redirect event !
        evt.initMouseEvent(event.type, e.bubbles, e.cancelable, e.view, e.detail,
          e.screenX, e.screenY, e.clientX, e.clientY,
          true, e.altKey, e.shiftKey, e.metaKey, e.button, e.relatedTarget);

        if(gContextMenu)
          gContextMenu.viewMedia(evt);
        else
        {
          var contextMenu = new nsContextMenu(e.view.document, gBrowser);
          contextMenu.viewMedia(evt);
          contextMenu = null;
        }
        return;
      }
    }
    gContextMenu.viewMedia(event);
  },

  openLinkInCurrent: function() {
    if (gBrowser && gBrowser.currentURI){
      var scheme = gBrowser.currentURI.scheme;
      if(scheme=='telnet' || scheme=='ssh')
      {
        gContextMenu.openLinkInTab();
        return;
      }
    }
    gContextMenu.openLinkInCurrent();
  },

  savePageAs: function() {
    if (gBrowser && gBrowser.currentURI){
      var scheme = gBrowser.currentURI.scheme;
      if(scheme=='telnet' || scheme=='ssh')
      {
        this.savePage();
        return;
      }
    }
    gContextMenu.savePageAs();
  },

  hidebbsfoxMenuItem: function() {
      //bbsfox menu - start
      var menuitem = null;
      menuitem = document.getElementById("bbsfox_menu-ansiCopy");
      menuitem.hidden = true;
      menuitem = document.getElementById("bbsfox_menu-addTrack");
      menuitem.hidden = true;
      menuitem = document.getElementById("bbsfox_menu-delTrack");
      menuitem.hidden = true;
      menuitem = document.getElementById("bbsfox_menu-clearTrack");
      menuitem.hidden = true;
      menuitem = document.getElementById("bbsfox_menu-delayPaste");
      menuitem.hidden = true;
      menuitem = document.getElementById("bbsfox_menu-copyHtml");
      menuitem.hidden = true;
      menuitem = document.getElementById("bbsfox_menu-screenKeyboard");
      menuitem.hidden = true;
      menuitem = document.getElementById("bbsfox_menu-embeddedPlayer");
      menuitem.hidden = true;
      menuitem = document.getElementById("bbsfox_menu-previewPicture");
      menuitem.hidden = true;
      menuitem = document.getElementById("bbsfox_menu-openAllLink");
      menuitem.hidden = true;
      menuitem = document.getElementById("bbsfox_menu-easyRead");
      menuitem.hidden = true;
      menuitem = document.getElementById("bbsfox_menu-downloadPost");
      menuitem.hidden = true;
      menuitem = document.getElementById("bbsfox_menu-FileIo");
      menuitem.hidden = true;
      menuitem = document.getElementById("bbsfox_menu-mouseBrowsing");
      menuitem.hidden = true;
      menuitem = document.getElementById("bbsfox_menu-BgDisplay");
      menuitem.hidden = true;
      menuitem = document.getElementById("bbsfox_menu-pushThread");
      menuitem.hidden = true;
      menuitem = document.getElementById("bbsfox_menu-openThreadUrl");
      menuitem.hidden = true;
      menuitem = document.getElementById("bbsfox_menu-changeColorTable");
      menuitem.hidden = true;
      //bbsfox menu - end
  },

  init: function() {
    var appInfo = Components.classes["@mozilla.org/xre/app-info;1"].getService(Components.interfaces.nsIXULAppInfo);
    this.FXVersion = parseFloat(appInfo.version);
    var eventMap = new Map();
    this.eventMap = eventMap;
    //add event to map - start
    eventMap.set('caContextMenu-ps', this.bbsfoxContextMenuShowing.bind(this));
    eventMap.set('caContextMenu-ph', this.bbsfoxContextMenuHidden.bind(this));
    eventMap.set('appmenu-popup-ps', this.bbsfoxAppMenuShowing.bind(this));
    eventMap.set('panelUI-popup-ps', this.bbsfoxPuiMenuShowing.bind(this));
    eventMap.set('view-menu-ps', this.bbsfoxViewMenuShowing.bind(this));
    eventMap.set('tabAttrModified', this.tabAttrModified.bind(this));
    eventMap.set('TabSelect', this.tabSelect.bind(this));
    //add event to map - end

    //add event listener - start
    document.getElementById('contentAreaContextMenu').addEventListener('popupshowing', eventMap.get('caContextMenu-ps'), false);
    document.getElementById('contentAreaContextMenu').addEventListener('popuphidden', eventMap.get('caContextMenu-ph'), false);
    var appmenu = document.getElementById('appmenu-popup');
    if(appmenu) appmenu.addEventListener('popupshowing', eventMap.get('appmenu-popup-ps'), false);
    var puimenu = document.getElementById('PanelUI-popup');
    if(puimenu) puimenu.addEventListener('popupshowing', eventMap.get('panelUI-popup-ps'), false);
    var viewmenu = document.getElementById('view-menu');
    if(viewmenu) viewmenu.addEventListener('popupshowing', eventMap.get('view-menu-ps'), false);
    gBrowser.tabContainer.addEventListener('TabAttrModified', eventMap.get('tabAttrModified'), true);
    gBrowser.tabContainer.addEventListener('TabSelect', eventMap.get('tabSelect'), false);
    //add event listener - end

    //add pref observer - start
    var prefService = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
    this.prefBranch = prefService.getBranch("extensions.bbsfox3.");
    this.prefBranch.QueryInterface(Components.interfaces.nsIPrefBranch2);
    this.prefBranch.addObserver("SshState", this, false);
    //add pref observer - start

    this.EventHandler.init(this);

    try {
      this.ellipsis = gPrefService.getComplexValue("intl.ellipsis", Components.interfaces.nsIPrefLocalizedString).data;
    } catch (e) { }
    var timer = Components.classes["@mozilla.org/timer;1"].createInstance(Components.interfaces.nsITimer);
    timer.initWithCallback({ notify: function(timer) { ETT_BBSFOX_Overlay.checkVerion.bind(ETT_BBSFOX_Overlay)(); } }, 10, Components.interfaces.nsITimer.TYPE_ONE_SHOT);
  },

  release: function() {
    this.EventHandler.release();

    //remove pref observer - start
    this.prefBranch.removeObserver("SshState", this);
    //remove pref observer - end

    //remove event listener - start
    var eventMap = this.eventMap;
    gBrowser.tabContainer.removeEventListener('TabSelect', eventMap.get('tabSelect'), false);
    gBrowser.tabContainer.removeEventListener('TabAttrModified', eventMap.get('tabAttrModified'), true);
    var viewmenu = document.getElementById('view-menu');
    if(viewmenu) viewmenu.removeEventListener('popupshowing', eventMap.get('view-menu-ps'), false);
    var puimenu = document.getElementById('PanelUI-popup');
    if(puimenu) puimenu.removeEventListener('popupshowing', eventMap.get('panelUI-popup-ps'), false);
    var appmenu = document.getElementById('appmenu-popup');
    if(appmenu) appmenu.removeEventListener('popupshowing', eventMap.get('appmenu-popup-ps'), false);
    document.getElementById('contentAreaContextMenu').removeEventListener('popuphidden', eventMap.get('caContextMenu-ph'), false);
    document.getElementById('contentAreaContextMenu').removeEventListener('popupshowing', eventMap.get('caContextMenu-ps'), false);
    //remove event listener - end
  },

  observe: function (aSubject, aTopic, aData){
    try {
      switch (aTopic)
      {
        case 'nsPref:changed':
          aSubject.QueryInterface(Components.interfaces.nsIPrefBranch);
          switch (aData)
          {
            case 'SshState':
              if(aSubject.getIntPref('SshState')!=0)
              {
                var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.bbsfox3.");
                var list = prefs.getComplexValue('conflictAddons', Components.interfaces.nsISupportsString).data;
                var strBundle = Components.classes["@mozilla.org/intl/stringbundle;1"].getService(Components.interfaces.nsIStringBundleService).createBundle("chrome://bbsfox/locale/bbsfox.properties");
                var msg = strBundle.GetStringFromName('conflictAddons');
                alert(msg + '\n\n' + list);
              }
              break;
            default:
              break;
          }
          break;
        default:
          break;
      }
    } catch (ex) {
    }
  },

  tabSelect : function (event) {
    var browser = gBrowser.getBrowserForTab(event.target);
    //browser.contentDocument.defaultView.bbsfox  // <--- access bbs page's bbsfox boject
    try {
      if (browser && (browser.currentURI.scheme == 'telnet' || browser.currentURI.scheme == 'ssh')) {
        var doc = browser.contentDocument;
        if(doc && doc.defaultView.bbsfox) {
          var cmdhandler = doc.defaultView.bbsfox.CmdHandler;// doc.getElementById('cmdHandler');
          this.setBBSCmd('setInputAreaFocus', cmdhandler, doc);
        }
      }
    } catch(e) {}
  },

  tabAttrModified : function (event) {
    var browser = gBrowser.getBrowserForTab(event.target);
    try {
      if (browser && (browser.currentURI.scheme == 'telnet' || browser.currentURI.scheme == 'ssh'))
      {
        var doc = browser.contentDocument;
        if(doc && doc.defaultView.bbsfox)
        {
          var cmdhandler = doc.defaultView.bbsfox.CmdHandler;// doc.getElementById('cmdHandler');
          if(cmdhandler)
          {
            var oldicon = event.target.getAttribute("image");
            var icon = cmdhandler.getAttribute('UpdateIcon');
            if(oldicon != icon)
            {
              event.stopPropagation();
              event.preventDefault();
              event.target.setAttribute("image", icon);
              //this.dempDebugMessage('icon = ' + icon);
            }
          }
        }
        return;
      }
    } catch(e) {}
  },

  getCmdHandler: function() {
    var doc = gBrowser.contentDocument;
    if (doc) {
      return doc.getElementById('cmdHandler');
    }
    return null;
  },

  setHandlerParem: function(key, cmd) {
    var cmdhandler = this.getCmdHandler();
    if (cmdhandler)
      cmdhandler.setAttribute(key, cmd);
  },

  getHandlerParem: function(key) {
    var cmdhandler = this.getCmdHandler();
    if (cmdhandler)
      return cmdhandler.getAttribute(key);
    return '';
  },

  setBBSCmd: function(cmd, cmdhandler, doc) {
    if(!doc)
      doc = gBrowser.contentDocument;
    if(!cmdhandler)
      cmdhandler = this.getCmdHandler();

    if (cmdhandler && "createEvent" in doc) {
      cmdhandler.setAttribute('bbsfoxCommand', cmd);
      var evt = doc.createEvent("Events");
      evt.initEvent("OverlayCommand", false, false);
      cmdhandler.dispatchEvent(evt);
    }
  },

  getPrefs: function() {
    var prefs = Components.classes["@mozilla.org/preferences-service;1"]
               .getService(Components.interfaces.nsIPrefService)
               .getBranch("extensions.bbsfox2.");
    return prefs;
  },

  trim_left: function(str) {
    return str.replace(/^\s+/,'');
  },

  trim_right: function(str) {
    return str.replace(/\s+$/,'');
  },

  trim_both: function(str) {
    return str.replace(/^\s+|\s+$/g,'');
  },

  openURL: function(aURL) {
    try{
      var win = Components.classes["@mozilla.org/appshell/window-mediator;1"]
               .getService(Components.interfaces.nsIWindowMediator)
               .getMostRecentWindow("navigator:browser");
      if(win)
        win.gBrowser.loadOneTab(aURL, null, null, null, false, false);
      else
        window.open(aURL);
    }
    catch(ex){
    }
  },

  rebuildSearchSubMenu: function () {
    var kXULNS = "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";
    var searchService = Components.classes["@mozilla.org/browser/search-service;1"].getService(Components.interfaces.nsIBrowserSearchService);
    var engines = searchService.getVisibleEngines({ });

    var popup = document.getElementById("bbsfox_menuEx-searchEx-popup");

    while (popup.firstChild) {
      popup.removeChild(popup.firstChild);
    }
    for (var i = engines.length - 1; i >= 0; --i) {
      var menuitem = document.createElementNS(kXULNS, "menuitem");
      menuitem.setAttribute("label", engines[i].name);
      //menuitem.setAttribute("id", engines[i].name);
      menuitem.setAttribute("class", "menuitem-iconic contextsearch-menuitem");

      if (engines[i].iconURI) {
        menuitem.setAttribute("src", engines[i].iconURI.spec);
      }

      popup.insertBefore(menuitem, popup.firstChild);
      menuitem.engine = engines[i];
      //menuitem.addEventListener('command', function(event){ETT_BBSFOX_Overlay.loadSearch(event.target.engine, document.getElementById("bbsfox_menuEx-searchEx").getAttribute("searchtext"), true);});
      menuitem.addEventListener('command', this.loadSearch.bind(this), false);
    }
  },

  loadSearch: function(event) {
    var engine = event.target.engine;
    var searchText = document.getElementById("bbsfox_menuEx-searchEx").getAttribute("searchtext");
    var useNewTab = true;
    var submission = engine.getSubmission(searchText); // HTML response
    if (!submission)
      return;
    openLinkIn(submission.uri.spec, useNewTab ? "tab" : "current", { postData: submission.postData, relatedToCurrent: true });
  },

  setVersion: function(addon) {
    var prefs = this.getPrefs();
    var lastVersion = prefs.getComplexValue("Version", Components.interfaces.nsISupportsString).data;
    this.BBSFoxVersion = addon.version;
    var showVersionHistory = prefs.getBoolPref("ShowVersionHistory");
    //ETT_BBSFOX_Overlay.dempDebugMessage('BBSFoxVersion='+ETT_BBSFOX_Overlay.BBSFoxVersion);
    if(this.BBSFoxVersion != lastVersion) {
      var sString = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
      sString.data = this.BBSFoxVersion;
      prefs.setComplexValue("Version", Components.interfaces.nsISupportsString, sString);
      if(showVersionHistory)
        this.openURL('chrome://bbsfox/locale/history.htm');
      this.cleanupOldPref();
    }
  },

  checkReplyRobotActive: function(addon) {
    if(addon)
      this.ReplyRobotActive = addon.isActive;
  },

  checkVerion: function() {
    /* another way to check Ext version(use FUEL) :
    //https://developer.mozilla.org/en/FUEL
    if(ETT_BBSFOX_Overlay.application.extensions){
        var myExt = ETT_BBSFOX_Overlay.application.extensions.get('{86095750-AD15-46d8-BF32-C0789F7E6A32}');
        ETT_BBSFOX_Overlay.application.console.log(myExt.version);
    }else if(ETT_BBSFOX_Overlay.application.getExtensions){
        ETT_BBSFOX_Overlay.application.getExtensions(function (extensions){
            var myExt = extensions.get('{86095750-AD15-46d8-BF32-C0789F7E6A32}');
            ETT_BBSFOX_Overlay.application.console.log(myExt.version);
        });
    }
    */

    var prefs = this.getPrefs();
    var lastVersion = prefs.getComplexValue("Version", Components.interfaces.nsISupportsString).data;
    
    if(lastVersion=="1.0.0")//first install, show help file
      this.openURL('chrome://bbsfox/locale/help.htm');
    if(this.FXVersion >= 4.0) { //for firefox 4
      try {
        // Firefox 4 and later; Mozilla 2 and later
        Components.utils.import("resource://gre/modules/AddonManager.jsm");
        AddonManager.getAddonByID("{86095750-AD15-46d8-BF32-C0789F7E6A32}", this.setVersion.bind(this));
      }
      catch(ex){}

      try {
        // Firefox 4 and later; Mozilla 2 and later
        AddonManager.getAddonByID("ReplyRobot@ettoolong", this.checkReplyRobotActive.bind(this));
      }
      catch(ex){}
    }
  },

  cleanupOldPref: function() {
    //we remove preferences that only use in old version BBSFox (BBSFox 1.0.0 ~ BBSFox 1.0.80).
    var globalPrefs = [];
    var sitePrefs   = ['UseMouseSwitchPage','UseMouseUpDown','UseMouseReadThread','MiddleButtonSendEnter','LoadUrlInBackGround','Login','Passwd','NotifyWhenBackbround','SaveAfterDownload','bbsbox.fontFitWindowWidth'];
    var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
    try{prefs.getBranch('extensions.bbsfox.').deleteBranch('');}catch(ex){}

    for(var i in globalPrefs){
      try{prefs.deleteBranch('extensions.bbsfox2.'+globalPrefs[i]);}catch(ex){}
    }

    var siteIDs = prefs.getBranch('extensions.bbsfox2.hostlist_').getChildList("", { });
    for(var j=0; j<siteIDs.length; ++j) {
      for(var k in sitePrefs){
        try{prefs.deleteBranch('extensions.bbsfox2.host_default.'+sitePrefs[k]);}catch(ex){}
        try{prefs.deleteBranch('extensions.bbsfox2.host_'+siteIDs[j]+'.'+sitePrefs[k]);}catch(ex){}
      }
    }
  },

  dempDebugMessage: function(msg) {
    /* another way to do this (use FUEL).
    this.application.console.log("BBSFox: " + msg);
    this.application.console.open(); //auto open error console
    */
    this.consoleService.logStringMessage("BBSFox: " + msg);
  },

  dempErrorMessage: function(msg) {
    /*another way to do this.
    Components.utils.reportError("BBSFox: " + msg); //
    */

    this.dempLogToConsole("BBSFox: " + msg, null, null, null, Components.interfaces.nsIScriptError.errorFlag, '');
  },

  dempLogToConsole: function(aMessage, aSourceName, aSourceLine, aLineNumber, aColumnNumber, aFlags, aCategory)
  {
    //https://developer.mozilla.org/en/nsIConsoleService
    /*
    aFlags:
      nsIScriptError.errorFlag = 0
      nsIScriptError.warningFlag = 1
      nsIScriptError.exceptionFlag = 2
      nsIScriptError.strictFlag = 4
    */
    var scriptError = Components.classes["@mozilla.org/scripterror;1"].createInstance(Components.interfaces.nsIScriptError);
    scriptError.init(aMessage, aSourceName, aSourceLine, aLineNumber, aColumnNumber, aFlags, aCategory);
    this.consoleService.logMessage(scriptError);
  },

  addTrack: function() {
    this.setBBSCmd('doAddTrack');
  },

  delTrack: function() {
    this.setBBSCmd('doDelTrack');
  },

  clearTrack: function() {
    this.setBBSCmd('doClearTrack');
  },

  copyText: function() {
    this.setBBSCmd('doCopy');
  },

  copyAnsi: function() {
    this.setBBSCmd('doCopyAnsi');
  },

  pasteText: function() {
    this.setBBSCmd('doPaste');
  },

  delayPasteText: function() {
    this.setBBSCmd('doDelayPasteText');
  },

  selectAllText: function() {
    this.setHandlerParem('resetFocus', '0');
    this.setBBSCmd('doSelectAll');
  },

  getContextLinkURL: function() {
    if(gContextMenu)
    {
      if(gContextMenu.link)
        return gContextMenu.link.toString();
      else
        return null;
    }
    else
      return null;
  },

  embeddedPlayer: function() {
    var menuitem = document.getElementById("bbsfox_menu-embeddedPlayer");
    var url = document.getElementById("bbsfox_menu-embeddedPlayer").getAttribute('VURL');
    if(menuitem.getAttribute('VT')=='Y')
    {
      this.setHandlerParem('YoutubeURL', url);
      this.setBBSCmd('openYoutubeWindow');
    }
    else if(menuitem.getAttribute('VT')=='U')
    {
      this.setHandlerParem('UstreamURL', url);
      this.setBBSCmd('openUstreamWindow');
    }
    else if(menuitem.getAttribute('VT')=='R')
    {
      this.setHandlerParem('UrecordURL', url);
      this.setBBSCmd('openUrecordWindow');
    }
  },

  previewPicture: function() {
    var url = document.getElementById("bbsfox_menu-previewPicture").getAttribute('PURL');
    this.setHandlerParem('PictureURL', url);
    this.setBBSCmd('previewPicture');
  },

  openAllLink: function() {
    this.setBBSCmd('doOpenAllLink');
  },

  downloadPost: function(mode) {
    this.setHandlerParem('DownloadColor', mode);
    this.setBBSCmd('doDownloadPost');
  },

  loadFile: function() {
    this.setBBSCmd('doLoadFile');
  },

  screenKeyboard: function() {
    this.setBBSCmd('openSymbolInput');
  },

  savePage: function() {
    this.setBBSCmd('doSavePage');
  },

  savePageEx: function() {
    if(this.isOnBBSPage())
      this.setBBSCmd('doSavePage');
    else
      saveDocument(window.content.document);
  },

  copyHtml: function() {
    this.setBBSCmd('doCopyHtml');
  },

  switchMouseBrowse: function(cmdhandler) {
    this.setBBSCmd('switchMouseBrowsing', cmdhandler);
  },

  switchBgDisplay: function() {
    this.setBBSCmd('switchBgDisplay');
  },

  easyReading: function() {
    this.setBBSCmd('easyReading');
  },

  pushThread: function() {
    this.setBBSCmd('pushThread');
  },

  openThreadUrl: function() {
    this.setBBSCmd('openThreadUrl');
  },

  changeColorTable: function() {
    this.setBBSCmd('changeColorTable');
  },

  replyRobot: function() {
    try{
      if(window.EttReplyRobot)
        window.EttReplyRobot.insertText();
    }catch(ex){};
  },

  setAlert: function(str) {
    this.setHandlerParem('AlertMessage', str);
    this.setBBSCmd('setAlert');
  },

  EventHandler: {
    MouseRBtnDown: false,
    MouseLBtnDown: false,
    owner: null,
    oldEnlarge: null,
    oldReduce: null,
    os: Components.classes["@mozilla.org/xre/app-info;1"].getService(Components.interfaces.nsIXULRuntime).OS,

    enlarge: function() {
      if (gBrowser && gBrowser.currentURI){
        var scheme = gBrowser.currentURI.scheme;
        if(scheme=='telnet' || scheme=='ssh')
        {
          var cmdhandler = gBrowser.contentDocument.getElementById("cmdHandler");
          if(cmdhandler)
            return;
        }
      }
      try{
        FullZoom.oldEnlarge();
      }
      catch(ex)
      {
      }
    },

    reduce: function() {
      if (gBrowser && gBrowser.currentURI){
        var scheme = gBrowser.currentURI.scheme;
        if(scheme=='telnet' || scheme=='ssh')
        {
          var cmdhandler = gBrowser.contentDocument.getElementById("cmdHandler");
          if(cmdhandler)
            return;
        }
      }
      try{
        FullZoom.oldReduce();
      }catch(ex)
      {}
    },

    loadpptPic: function(doc) {
      var allLinks=doc.getElementsByTagName("a");
      var PPTRegEx = /^(http:\/\/ppt\.cc\/).{4,6}$/i;
      var ImgurRegEx = /^(https?:\/\/imgur\.com\/)(\w{5,8})(\?tags)?/i;
      for(var i=0;i<allLinks.length;i++)
      {
        var url = allLinks[i].getAttribute("href");
        if(!allLinks[i].getAttribute("emload"))
        {
          if(PPTRegEx.test(url))
          {
            this.pptPicLoader.show(url, allLinks[i], this.insertPicLine);
          }
          if(ImgurRegEx.test(url))
          {
            this.imgurPicLoader.show(url, allLinks[i], this.insertPicLine);
          }
        }
      }
    },

    insertPicLine: function(anode, imageurl) {
      try{
        anode.setAttribute("emload", "1");
        var parentDiv = anode.parentNode;
        var doc = anode.ownerDocument;
        while(parentDiv.className!="BBSLine")
          parentDiv=parentDiv.parentNode;

        var node = parentDiv.nextSibling;
        var div;
        if(node.className!="AddLine")
        {
          div = doc.createElement("div");
          div.setAttribute("class","AddLine");
          parentDiv.parentNode.insertBefore(div, parentDiv.nextSibling);
        }
        else
        {
         div = node;
        }
        var br = doc.createElement("BR");
        div.appendChild(br);
        var img = doc.createElement("img");
        div.appendChild(img);
        img.setAttribute("src", imageurl);
        img.setAttribute("class", "scale");
        img.addEventListener("click", switchSize, false);
      }catch(ex)
      {}
    },

    mouse_down: function(event) {
      if(event.button==2)
        this.MouseRBtnDown = true;
      else if(event.button==0)
        this.MouseLBtnDown = true;
    },

    mouse_up: function(event) {
      if(event.button==2)
        this.MouseRBtnDown = false;
      else if(event.button==0)
        this.MouseLBtnDown = false;

      if (gBrowser && gBrowser.currentURI) {
        var scheme = gBrowser.currentURI.scheme;
        if(scheme!='telnet' && scheme!='ssh')
          return;

        var cmdhandler = event.target.ownerDocument.getElementById("cmdHandler");
        if(!cmdhandler || !cmdhandler.getAttribute('bbsfox'))
          return;
        var prefs = event.target.ownerDocument.defaultView.bbsfox.prefs;

        try {
          if(gBrowser.selectedBrowser.markupDocumentViewer.textZoom != 1 || gBrowser.selectedBrowser.markupDocumentViewer.fullZoom != 1)
            FullZoom.reset(); //always set BBS view in 100% Zoom size
        } catch(ex) {}

        var mouseWheelFunc2 = (prefs.mouseWheelFunc2!=0);
        if(mouseWheelFunc2) {
          if(event.button==2) {
            if(this.os == 'WINNT') {
            } else {//if Linux... show popup menu...
              var doDOMMouseScroll = cmdhandler.getAttribute('doDOMMouseScroll');
              if(doDOMMouseScroll=='0') {
                var e = event;
                var evt = e.originalTarget.ownerDocument.createEvent("MouseEvents");//fire event !
                evt.initMouseEvent("contextmenu", true, true, e.originalTarget.ownerDocument.defaultView, 0,
                                    e.screenX, e.screenY, e.clientX, e.clientY,
                                    false, false, false, false, 2, null);
                e.originalTarget.dispatchEvent(evt);
              }
            }
          }
        }
      }
    },

    mouse_menu: function(event) {
      if (gBrowser && gBrowser.currentURI) {
        var scheme = gBrowser.currentURI.scheme;
        if(scheme!='telnet' && scheme!='ssh')
          return;

        var cmdhandler = event.target.ownerDocument.getElementById("cmdHandler");
        if(!cmdhandler || !cmdhandler.getAttribute('bbsfox'))
          return;
        var prefs = event.target.ownerDocument.defaultView.bbsfox.prefs;
        var linkedBrowser;
        var mouseWheelFunc2 = (prefs.mouseWheelFunc2!=0);
        if(mouseWheelFunc2) {
          var doDOMMouseScroll = (cmdhandler.getAttribute('doDOMMouseScroll')=='1');
          if(doDOMMouseScroll) {
            event.stopPropagation();
            event.preventDefault();
            cmdhandler.setAttribute('doDOMMouseScroll','0');
          } else {
            if(this.os == 'WINNT') {
            } else if(this.MouseRBtnDown) {//if Linux... delay popup menu...
              event.stopPropagation();
              event.preventDefault();
              return;
            }
            linkedBrowser = gBrowser.mCurrentTab.linkedBrowser;
            if(linkedBrowser) {
              if(prefs.useHttpContextMenu)
                linkedBrowser.setAttribute('context', 'contentAreaContextMenu');
              else
                linkedBrowser.setAttribute('context', 'contentAreaContextMenuEx');
            }
          }
        } else {
          linkedBrowser = gBrowser.mCurrentTab.linkedBrowser;
          if(linkedBrowser) {
            if(prefs.useHttpContextMenu)
              linkedBrowser.setAttribute('context', 'contentAreaContextMenu');
            else
              linkedBrowser.setAttribute('context', 'contentAreaContextMenuEx');
          }
        }
      }
    },

    mouse_scroll: function(event) {
      if (gBrowser && gBrowser.currentURI){
        var scheme = gBrowser.currentURI.scheme;
        if(scheme!='telnet' && scheme!='ssh')
          return;

        var cmdhandler = event.target.ownerDocument.getElementById("cmdHandler");
        if(!cmdhandler || !cmdhandler.getAttribute('bbsfox'))
          return;
        var prefs = event.target.ownerDocument.defaultView.bbsfox.prefs;

        var mouseWheelFunc1 = prefs.mouseWheelFunc1;// cmdhandler.getAttribute('MouseWheelFunc1');//useMouseUpDown
        var mouseWheelFunc2 = prefs.mouseWheelFunc2;// cmdhandler.getAttribute('MouseWheelFunc2');//useMouseSwitchPage
        var mouseWheelFunc3 = prefs.mouseWheelFunc3;// cmdhandler.getAttribute('MouseWheelFunc3');//useMouseReadThread

        var useMouseWheelFunc1 = (mouseWheelFunc1!=0);
        var useMouseWheelFunc2 = (mouseWheelFunc2!=0);
        var useMouseWheelFunc3 = (mouseWheelFunc3!=0);
        if(useMouseWheelFunc1 || useMouseWheelFunc2 || useMouseWheelFunc3) {
          var owner = this.owner;
          //var curApp = this.view.cursorAppMode;
          if(event.detail < 0) { //scroll up
            if(this.MouseRBtnDown) { //press mouse right button and scroll up
              if(useMouseWheelFunc2) {
                if(mouseWheelFunc2==1)
                  owner.setBBSCmd('doArrowUp', cmdhandler);
                else if(mouseWheelFunc2==2)
                  owner.setBBSCmd('doPageUp', cmdhandler);
                else if(mouseWheelFunc2==3)
                  owner.setBBSCmd('prevousThread', cmdhandler);
                else if(mouseWheelFunc2==4)
                  owner.setBBSCmd('doHome', cmdhandler);
                event.stopPropagation();
                event.preventDefault();
              }
            } else if(this.MouseLBtnDown) { //press mouse left button and scroll up
              if(useMouseWheelFunc3) {
                if(mouseWheelFunc3==1)
                  owner.setBBSCmd('doArrowUp', cmdhandler);
                else if(mouseWheelFunc3==2)
                  owner.setBBSCmd('doPageUp', cmdhandler);
                else if(mouseWheelFunc3==3)
                  owner.setBBSCmd('prevousThread', cmdhandler);
                else if(mouseWheelFunc3==4)
                  owner.setBBSCmd('doHome', cmdhandler);
                owner.setBBSCmd('cancelHoldMouse', cmdhandler);
                event.stopPropagation();
                event.preventDefault();
              }
            } else if(useMouseWheelFunc1) { //no button, only scroll up
              if(mouseWheelFunc1==1)
                owner.setBBSCmd('doArrowUp', cmdhandler);
              else if(mouseWheelFunc1==2)
                owner.setBBSCmd('doPageUp', cmdhandler);
              else if(mouseWheelFunc1==3)
                owner.setBBSCmd('prevousThread', cmdhandler);
              else if(mouseWheelFunc1==4)
                owner.setBBSCmd('doHome', cmdhandler);
              event.stopPropagation();
              event.preventDefault();
            }
          } else { //scroll down
            if(this.MouseRBtnDown) { //press mouse right button and scroll down
              if(useMouseWheelFunc2) {
                if(mouseWheelFunc2==1)
                  owner.setBBSCmd('doArrowDown', cmdhandler);
                else if(mouseWheelFunc2==2)
                  owner.setBBSCmd('doPageDown', cmdhandler);
                else if(mouseWheelFunc2==3)
                  owner.setBBSCmd('nextThread', cmdhandler);
                else if(mouseWheelFunc2==4)
                  owner.setBBSCmd('doEnd', cmdhandler);
                event.stopPropagation();
                event.preventDefault();
              }
            } else if(this.MouseLBtnDown) { //press mouse left button and scroll down
              if(useMouseWheelFunc3) {
                if(mouseWheelFunc3==1)
                  owner.setBBSCmd('doArrowDown', cmdhandler);
                else if(mouseWheelFunc3==2)
                  owner.setBBSCmd('doPageDown', cmdhandler);
                else if(mouseWheelFunc3==3)
                  owner.setBBSCmd('nextThread', cmdhandler);
                else if(mouseWheelFunc3==4)
                  owner.setBBSCmd('doEnd', cmdhandler);
                owner.setBBSCmd('cancelHoldMouse', cmdhandler);
                event.stopPropagation();
                event.preventDefault();
              }
            } else if(useMouseWheelFunc1) { //no button, only scroll down
              if(mouseWheelFunc1==1)
                owner.setBBSCmd('doArrowDown', cmdhandler);
              else if(mouseWheelFunc1==2)
                owner.setBBSCmd('doPageDown', cmdhandler);
              else if(mouseWheelFunc1==3)
                owner.setBBSCmd('nextThread', cmdhandler);
              else if(mouseWheelFunc1==4)
                owner.setBBSCmd('doEnd', cmdhandler);
              event.stopPropagation();
              event.preventDefault();
            }
          }
          if(this.MouseRBtnDown && useMouseWheelFunc2) //prevent context menu popup
            cmdhandler.setAttribute('doDOMMouseScroll','1');
          if(this.MouseLBtnDown && useMouseWheelFunc3) {
            if(cmdhandler.getAttribute('useMouseBrowsing')=='1') {
              cmdhandler.setAttribute('SkipMouseClick','1');
            }
          }
        }
      }
    },

    key_press: function(event) {
      var cmdhandler;
      var owner;
      if(event.target && event.target.id && event.target.id=='t' && event.target.getAttribute('BBSFoxInput') ) {
        cmdhandler = event.target.ownerDocument.getElementById("cmdHandler");
        if(!cmdhandler)
          return;
        owner = this.owner;
        if (!event.ctrlKey && !event.altKey && !event.shiftKey) {
          switch(event.keyCode) {
            case 33: //Page Up
              event.stopPropagation();
              event.preventDefault();
              owner.setBBSCmd('doPageUp', cmdhandler);
              break;
            case 34: //Page Down
              event.stopPropagation();
              event.preventDefault();
              owner.setBBSCmd('doPageDown', cmdhandler);
              break;
            case 38: //Arrow Up
              event.stopPropagation();
              event.preventDefault();
              owner.setBBSCmd('doArrowUp', cmdhandler);
              break;
            case 40: //Arrow Down
              event.stopPropagation();
              event.preventDefault();
              owner.setBBSCmd('doArrowDown', cmdhandler);
              break;
            default:
              break;
          }
        } else if (this.doMouseBrowsingSwitch(cmdhandler, event)) {
          owner.switchMouseBrowse(cmdhandler);
          event.stopPropagation();
          event.preventDefault();
        }
      } else {
        cmdhandler = event.target.ownerDocument.getElementById("cmdHandler");
        if(!cmdhandler)
          return;
        owner = this.owner;
        if (this.doMouseBrowsingSwitch(cmdhandler, event)) {
          owner.switchMouseBrowse(cmdhandler);
          event.stopPropagation();
          event.preventDefault();
        }
      }
    },

    text_input: function(event) {
      if(event.target && event.target.id && event.target.id=='t' && event.target.value && event.target.getAttribute('BBSFoxInput') ) {
        if(event.target.getAttribute('bshow')!='1') {
          event.stopPropagation();
          event.preventDefault();
          if(event.target.value)
            event.target.ownerDocument.defaultView.bbsfox.view.onTextInput(event.target.value);
          //this.onTextInput(event.target.ownerDocument, event.target);
          event.target.value='';
        }
      }
    },

    // onTextInput: function(doc, node) {
    //   if (node && "createEvent" in doc) {
    //     node.setAttribute('BBSInputText', node.value);
    //     var evt = doc.createEvent("Events");
    //     evt.initEvent("TextInputEvent", false, false);
    //     node.dispatchEvent(evt);
    //   }
    // },

    doc_load: function(event) {
      var win = null;
      if (event.originalTarget instanceof HTMLDocument) {
        win = event.originalTarget.defaultView;
        if (event.originalTarget.nodeName == '#document') {
          var owner = this.owner;
          var uri = owner.ioService.newURI(event.originalTarget.URL, null, null);
          if(uri.scheme == 'file') {
            try{
              var em = event.originalTarget.getElementById("bbsfox_em");
              if(em)
                this.loadpptPic(event.originalTarget);
            }catch(ex) {}
          }
        }
      }
    },

    init: function(owner) {
      this.owner = owner;

      this.pptPicLoader = new BBSPPTPicLoader(null);
      this.imgurPicLoader = new BBSImgurPicLoader(null);

      var eventMap = this.owner.eventMap;
      eventMap.set('DOMMouseScroll', this.mouse_scroll.bind(this));
      eventMap.set('contextmenu', this.mouse_menu.bind(this));
      eventMap.set('mousedown', this.mouse_down.bind(this));
      eventMap.set('mouseup', this.mouse_up.bind(this));
      eventMap.set('keypress', this.key_press.bind(this));
      eventMap.set('input', this.text_input.bind(this));
      eventMap.set('load', this.doc_load.bind(this));

      gBrowser.addEventListener('DOMMouseScroll', eventMap.get('DOMMouseScroll'), true);
      gBrowser.addEventListener("contextmenu", eventMap.get('contextmenu'), true);
      gBrowser.addEventListener("mousedown", eventMap.get('mousedown'), true);
      gBrowser.addEventListener('mouseup', eventMap.get('mouseup'), true);
      gBrowser.addEventListener("keypress", eventMap.get('keypress'), true);
      gBrowser.addEventListener("input", eventMap.get('input'), true);
      gBrowser.addEventListener("load", eventMap.get('load'), true);
      try
      {
        if(!FullZoom.oldEnlarge && !FullZoom.oldReduce)
        {
          FullZoom.oldEnlarge = FullZoom.enlarge;
          FullZoom.oldReduce = FullZoom.reduce;
          FullZoom.enlarge = _this.enlarge;
          FullZoom.reduce = _this.reduce;
        }
      }
      catch(ex)
      {
      }
    },

    release: function() {
      var eventMap = this.owner.eventMap;

      gBrowser.removeEventListener("DOMMouseScroll", eventMap.get('DOMMouseScroll'), true);
      gBrowser.removeEventListener("contextmenu", eventMap.get('contextmenu'), true);
      gBrowser.removeEventListener("mousedown", eventMap.get('mousedown'), true);
      gBrowser.removeEventListener('mouseup', eventMap.get('mouseup'), true);
      gBrowser.removeEventListener('keypress', eventMap.get('keypress'), true);
      gBrowser.removeEventListener('input', eventMap.get('input'), true);
      gBrowser.removeEventListener('load', eventMap.get('load'), true);
    },

    doMouseBrowsingSwitch: function(cmdhandler, event) {
      if(cmdhandler && cmdhandler.getAttribute('bbsfox')){
        var prefs = cmdhandler.ownerDocument.defaultView.bbsfox.prefs;
        if (event.ctrlKey && !event.altKey && !event.shiftKey && event.charCode && prefs.hokeyForMouseBrowsing && (event.charCode==109 || event.charCode==77))
          return true;
        else
          return false;
      } else {
        return false;
      }
    }

  }
};

//////////////////////////////////////////////////////////////////////////
window.addEventListener("load",   ETT_BBSFOX_Overlay.init.bind(ETT_BBSFOX_Overlay), false);
window.addEventListener("unload", ETT_BBSFOX_Overlay.release.bind(ETT_BBSFOX_Overlay), false);