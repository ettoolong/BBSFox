function BBSBackground(listener) {
  this.bbscore = listener;
  this.prefs = listener.prefs;
  this.BackgroundMD5='';
  this.DisplayBackground = false;
  this.BBSBg = document.getElementById('BBSBackgroundImage');
}

BBSBackground.prototype={

  ResetBackground: function(backgroundType, md5) {
    if(backgroundType!=0 && md5!='')
    {
      try
      {
        var dir = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties);
        var file = dir.get("ProfD", Components.interfaces.nsIFile);
        if(this.bbscore.isDefaultPref)
          file.append("_bg.default");
        else
        {
          var url = this.bbscore.siteAuthInfo;
          url = url.replace(/:/g, '~');

          file.append("_bg."+url);
        }
        if(file.exists() && md5!=this.BackgroundMD5)
        {
          var ios = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
          var filetmp = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("TmpD", Components.interfaces.nsIFile);
          filetmp.append(md5);
          filetmp.createUnique(Components.interfaces.nsIFile.NORMAL_FILE_TYPE, 0666);
          var ostream = Components.classes["@mozilla.org/network/file-output-stream;1"].createInstance(Components.interfaces.nsIFileOutputStream);
          ostream.init(filetmp, -1, -1, 0);
          var istream = Components.classes["@mozilla.org/network/file-input-stream;1"].createInstance(Components.interfaces.nsIFileInputStream);
          istream.init(file, 0x01, 0444, 0);
          var bstream = Components.classes["@mozilla.org/binaryinputstream;1"].createInstance(Components.interfaces.nsIBinaryInputStream);
          bstream.setInputStream(istream);
          var bytes = bstream.readBytes(bstream.available());
          ostream.write(bytes, bytes.length);
          ostream.flush();
          ostream.close();
          this.BackgroundMD5=md5;
          var newImageURI = ios.newFileURI(filetmp);
          this.BBSBg.style.backgroundImage='url('+newImageURI.spec+')';
          this.bbscore.tempFiles.push(filetmp);
        }
        if(file.exists())
        {
          if(backgroundType==4)
          {
            this.BBSBg.style.backgroundSize='100% 100%';
            this.BBSBg.style.backgroundPosition='left top';
            this.BBSBg.style.backgroundRepeat='no-repeat';
          }
          else if(backgroundType==3)
          {
            this.BBSBg.style.backgroundSize='cover';
            this.BBSBg.style.backgroundPosition='left top';
            this.BBSBg.style.backgroundRepeat='no-repeat';
          }
          else if(backgroundType==2)
          {
            this.BBSBg.style.backgroundSize='auto auto';
            this.BBSBg.style.backgroundPosition='center center';
            this.BBSBg.style.backgroundRepeat='no-repeat';
          }
          else if(backgroundType==1)
          {
            this.BBSBg.style.backgroundSize='auto auto';
            this.BBSBg.style.backgroundPosition='center center';
            this.BBSBg.style.backgroundRepeat='repeat';
          }
        }
        else
        {
          backgroundType=0;
        }
      }
      catch(ex)
      {
        backgroundType=0;
      }
      //try to load picture, if load fail, set backgroundType = 0;
    }
    if(backgroundType==0)
    {
      this.BBSBg.style.display='none';
      this.bbscore.CmdHandler.setAttribute("EnableBackground", '0');
      this.DisplayBackground=true; //?
      this.BackgroundMD5='';
    }
    else
    {
      this.BBSBg.style.display='block';
      this.bbscore.CmdHandler.setAttribute("EnableBackground", '1');
      this.DisplayBackground=true;
    }
  },

  SwitchBgDisplay: function() {
    if(this.DisplayBackground)
    {
      this.DisplayBackground = false;
      this.BBSBg.style.display='none';
    }
    else
    {
      this.DisplayBackground = true;
      this.BBSBg.style.display='block';
    }
  },

  SetBrightness: function(brightness) {
    if(brightness == 100)// no alpha
      this.BBSBg.style.opacity = '1';
    else
      this.BBSBg.style.opacity = '0.' + (brightness);
  },

  SetSize: function(w, h) {
    this.BBSBg.style.height = h;
    this.BBSBg.style.width = w;
  }

};
