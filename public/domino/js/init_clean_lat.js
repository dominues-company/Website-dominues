(function () {
  var _0x59796d;
  var _0x179f7f = function () {};
  var _0x239bf7 = ["assert", "clear", "count", "debug", "dir", "dirxml", 'error', "exception", 'group', "groupCollapsed", "groupEnd", 'info', "log", 'markTimeline', 'profile', "profileEnd", 'table', "time", "timeEnd", "timeStamp", "trace", "warn"];
  var _0xdb1573 = _0x239bf7.length;
  var _0x5cb496 = window.console = window.console || {};
  while (_0xdb1573--) {
    _0x59796d = _0x239bf7[_0xdb1573];
    if (!_0x5cb496[_0x59796d]) {
      _0x5cb496[_0x59796d] = _0x179f7f;
    }
  }
})();
function checkContentHeight(_0xdafa8) {
  var _0x45fd79 = $(window).height();
  var _0x3c00d9 = _0x45fd79 / 0x2 - _0xdafa8.height() / 0x2;
  return _0x3c00d9;
}
function checkContentWidth(_0x358e8d) {
  var _0x5954ce = $(window).width();
  var _0x550731 = _0x5954ce / 0x2 - _0x358e8d.width() / 0x2;
  return _0x550731;
}
function getDeviceVer() {
  var _0x5de61f = navigator.userAgent;
  var _0x399d49;
  if (_0x5de61f.match(/(iPad|iPhone|iPod touch)/)) {
    userOS = "iOS";
    _0x399d49 = _0x5de61f.indexOf("OS ");
  } else if (_0x5de61f.match(/Android/)) {
    userOS = "Android";
    _0x399d49 = _0x5de61f.indexOf("Android ");
  } else {
    userOS = 'unknown';
  }
  if (userOS === 'iOS' && _0x399d49 > -0x1) {
    userOSver = _0x5de61f.substr(_0x399d49 + 0x3, 0x3).replace('_', '.');
  } else if (userOS === "Android" && _0x399d49 > -0x1) {
    userOSver = _0x5de61f.substr(_0x399d49 + 0x8, 0x3);
  } else {
    userOSver = "unknown";
  }
  return Number(userOSver);
}
function createSeededRandom(_0x19168b) {
  if (!_0x19168b && _0x19168b !== 0x0) {
    return null;
  }
  var _0x23b302 = 0x0;
  var _0x10fb9e = String(_0x19168b);
  for (var _0x2bd6d3 = 0x0; _0x2bd6d3 < _0x10fb9e.length; _0x2bd6d3++) {
    _0x23b302 = (_0x23b302 << 0x5) - _0x23b302 + _0x10fb9e.charCodeAt(_0x2bd6d3);
    _0x23b302 |= 0x0;
  }
  return function () {
    _0x23b302 = _0x23b302 * 0x19660d + 0x3c6ef35f;
    _0x23b302 &= 0xffffffff;
    return (_0x23b302 >>> 0x0) / 0x100000000;
  };
}
function shuffle(_0x540122) {
  var _0x1539d0 = _0x540122.length;
  var _0x27c36e;
  var _0x290b08;
  var _0x33650f = Math.random;
  if (window.__dominoDeckSeed !== undefined) {
    if (!window.__dominoDeckRng || window.__dominoDeckRngSeed !== String(window.__dominoDeckSeed)) {
      window.__dominoDeckRng = createSeededRandom(String(window.__dominoDeckSeed));
      window.__dominoDeckRngSeed = String(window.__dominoDeckSeed);
    }
    if (typeof window.__dominoDeckRng === 'function') {
      _0x33650f = window.__dominoDeckRng;
    }
  }
  while (0x0 !== _0x1539d0) {
    _0x290b08 = Math.floor(_0x33650f() * _0x1539d0);
    _0x1539d0 -= 0x1;
    _0x27c36e = _0x540122[_0x1539d0];
    _0x540122[_0x1539d0] = _0x540122[_0x290b08];
    _0x540122[_0x290b08] = _0x27c36e;
  }
  return _0x540122;
}
function randomBoolean() {
  return Math.random() < 0.5;
}
function getDistance(_0x5f46b4, _0x20a182, _0x595713, _0x35795d) {
  var _0x580365 = Math.sqrt(Math.pow(_0x5f46b4 - _0x595713, 0x2) + Math.pow(_0x20a182 - _0x35795d, 0x2));
  return _0x580365;
}
function sortOnObject(_0x59d480, _0x5edaf4, _0x18d657) {
  if (_0x18d657) {
    _0x59d480.sort(function (_0x57c6ad, _0x2bbb9a) {
      var _0xef3af7 = _0x57c6ad[_0x5edaf4];
      var _0x45c054 = _0x2bbb9a[_0x5edaf4];
      if (_0xef3af7 == _0x45c054) {
        return 0x0;
      }
      return _0xef3af7 < _0x45c054 ? 0x1 : -0x1;
    });
  } else {
    _0x59d480.sort(function (_0x4cdb59, _0x305a0f) {
      var _0x2270a5 = _0x4cdb59[_0x5edaf4];
      var _0x44caa9 = _0x305a0f[_0x5edaf4];
      if (_0x2270a5 == _0x44caa9) {
        return 0x0;
      }
      return _0x2270a5 > _0x44caa9 ? 0x1 : -0x1;
    });
  }
  return _0x59d480;
}
function randomIntFromInterval(_0x16b848, _0x2ca471) {
  return Math.floor(Math.random() * (_0x2ca471 - _0x16b848 + 0x1) + _0x16b848);
}
function addCommas(_0x1dc1f0) {
  _0x1dc1f0 += '';
  x = _0x1dc1f0.split('.');
  x1 = x[0x0];
  x2 = x.length > 0x1 ? '.' + x[0x1] : '';
  var _0x49a3ba = /(\d+)(\d{3})/;
  while (_0x49a3ba.test(x1)) {
    x1 = x1.replace(_0x49a3ba, "$1,$2");
  }
  return x1 + x2;
}
function swapArray(_0x5c5dc5, _0x4d076c, _0x406311) {
  var _0x31f597 = _0x5c5dc5[_0x4d076c];
  _0x5c5dc5[_0x4d076c] = _0x5c5dc5[_0x406311];
  _0x5c5dc5[_0x406311] = _0x31f597;
}
function getCenterPosition(_0x52367c, _0x5d0963, _0x319b53, _0x4b992d) {
  var _0x267ad6 = {
    'x': 0x0,
    'y': 0x0
  };
  _0x267ad6.x = (_0x52367c + _0x319b53) / 0x2;
  _0x267ad6.y = (_0x5d0963 + _0x4b992d) / 0x2;
  return _0x267ad6;
}
function setRotation(_0x5c6abd, _0x596154, _0x1921db, _0x66714f) {
  var _0x376547 = 0xb4 / Math.PI;
  var _0x5ba1f5 = -Math.atan2(_0x1921db - _0x5c6abd, _0x66714f - _0x596154) * _0x376547;
  return _0x5ba1f5 - 0x5a;
}
function isEven(_0x3ba866) {
  if (_0x3ba866 % 0x2 == 0x0) {
    return true;
  } else {
    return false;
  }
}
function getAnglePosition(_0x36a4ac, _0x23f3ef, _0x20cdad, _0x3e351a) {
  var _0x1d68b9 = {
    'x': 0x0,
    'y': 0x0
  };
  _0x1d68b9.x = _0x36a4ac + _0x20cdad * Math.cos(_0x3e351a * Math.PI / 0xb4);
  _0x1d68b9.y = _0x23f3ef + _0x20cdad * Math.sin(_0x3e351a * Math.PI / 0xb4);
  return _0x1d68b9;
}
var soundOn;
var soundMute = false;
var musicMute = false;
$.sound = {};
var soundID = 0x0;
var soundPushArr = [];
var soundLoopPushArr = [];
var musicPushArr = [];
function playSound(_0x3192f6, _0x38b67c) {
  if (soundOn) {
    var _0x46f7a0 = soundID;
    soundPushArr.push(_0x46f7a0);
    soundID++;
    var _0x33fb2e = _0x38b67c == undefined ? 0x1 : _0x38b67c;
    $.sound[_0x46f7a0] = createjs.Sound.play(_0x3192f6);
    $.sound[_0x46f7a0].defaultVol = _0x33fb2e;
    setSoundVolume(_0x46f7a0);
    $.sound[_0x46f7a0].removeAllEventListeners();
    $.sound[_0x46f7a0].addEventListener("complete", function () {
      var _0x5b6e35 = soundPushArr.indexOf(_0x46f7a0);
      if (_0x5b6e35 != -0x1) {
        soundPushArr.splice(_0x5b6e35, 0x1);
      }
    });
  }
}
function playSoundLoop(_0x17bb41) {
  if (soundOn) {
    if ($.sound[_0x17bb41] == null) {
      soundLoopPushArr.push(_0x17bb41);
      $.sound[_0x17bb41] = createjs.Sound.play(_0x17bb41);
      $.sound[_0x17bb41].defaultVol = 0x1;
      setSoundLoopVolume(_0x17bb41);
      $.sound[_0x17bb41].removeAllEventListeners();
      $.sound[_0x17bb41].addEventListener("complete", function () {
        $.sound[_0x17bb41].play();
      });
    }
  }
}
function toggleSoundLoop(_0xf31a15, _0x146ff7) {
  if (soundOn) {
    if ($.sound[_0xf31a15] != null) {
      if (_0x146ff7) {
        $.sound[_0xf31a15].play();
      } else {
        $.sound[_0xf31a15].paused = true;
      }
    }
  }
}
function stopSoundLoop(_0x250ae8) {
  if (soundOn) {
    if ($.sound[_0x250ae8] != null) {
      $.sound[_0x250ae8].stop();
      $.sound[_0x250ae8] = null;
      var _0x2783ab = soundLoopPushArr.indexOf(_0x250ae8);
      if (_0x2783ab != -0x1) {
        soundLoopPushArr.splice(_0x2783ab, 0x1);
      }
    }
  }
}
function playMusicLoop(_0x5b25d5) {
  if (soundOn) {
    if ($.sound[_0x5b25d5] == null) {
      musicPushArr.push(_0x5b25d5);
      $.sound[_0x5b25d5] = createjs.Sound.play(_0x5b25d5);
      $.sound[_0x5b25d5].defaultVol = 0x1;
      setMusicVolume(_0x5b25d5);
      $.sound[_0x5b25d5].removeAllEventListeners();
      $.sound[_0x5b25d5].addEventListener("complete", function () {
        $.sound[_0x5b25d5].play();
      });
    }
  }
}
function toggleMusicLoop(_0x477bbe, _0x13359f) {
  if (soundOn) {
    if ($.sound[_0x477bbe] != null) {
      if (_0x13359f) {
        $.sound[_0x477bbe].play();
      } else {
        $.sound[_0x477bbe].paused = true;
      }
    }
  }
}
function stopMusicLoop(_0x22051d) {
  if (soundOn) {
    if ($.sound[_0x22051d] != null) {
      $.sound[_0x22051d].stop();
      $.sound[_0x22051d] = null;
      var _0x56f26f = musicPushArr.indexOf(_0x22051d);
      if (_0x56f26f != -0x1) {
        musicPushArr.splice(_0x56f26f, 0x1);
      }
    }
  }
}
function stopSound() {
  createjs.Sound.stop();
}
function toggleSoundInMute(_0x300642) {
  if (soundOn) {
    soundMute = _0x300642;
    for (var _0x268a92 = 0x0; _0x268a92 < soundPushArr.length; _0x268a92++) {
      setSoundVolume(soundPushArr[_0x268a92]);
    }
    for (var _0x268a92 = 0x0; _0x268a92 < soundLoopPushArr.length; _0x268a92++) {
      setSoundLoopVolume(soundLoopPushArr[_0x268a92]);
    }
    setAudioVolume();
  }
}
function toggleMusicInMute(_0x4b9cd1) {
  if (soundOn) {
    musicMute = _0x4b9cd1;
    for (var _0x6e4d4 = 0x0; _0x6e4d4 < musicPushArr.length; _0x6e4d4++) {
      setMusicVolume(musicPushArr[_0x6e4d4]);
    }
  }
}
function setSoundVolume(_0x430531, _0x583bd9) {
  if (soundOn) {
    var _0x1363aa = soundPushArr.indexOf(_0x430531);
    if (_0x1363aa != -0x1) {
      var _0x31cf89 = _0x583bd9 == undefined ? $.sound[soundPushArr[_0x1363aa]].defaultVol : _0x583bd9;
      var _0x4a91f6 = soundMute == false ? _0x31cf89 : 0x0;
      $.sound[soundPushArr[_0x1363aa]].volume = _0x4a91f6;
      $.sound[soundPushArr[_0x1363aa]].defaultVol = _0x31cf89;
    }
  }
}
function setSoundLoopVolume(_0x3da8cf, _0x5bd6d2) {
  if (soundOn) {
    var _0x2bb798 = soundLoopPushArr.indexOf(_0x3da8cf);
    if (_0x2bb798 != -0x1) {
      var _0x3313e6 = _0x5bd6d2 == undefined ? $.sound[soundLoopPushArr[_0x2bb798]].defaultVol : _0x5bd6d2;
      var _0xc167bb = soundMute == false ? _0x3313e6 : 0x0;
      $.sound[soundLoopPushArr[_0x2bb798]].volume = _0xc167bb;
      $.sound[soundLoopPushArr[_0x2bb798]].defaultVol = _0x3313e6;
    }
  }
}
function setMusicVolume(_0x238897, _0xb83ea3) {
  if (soundOn) {
    var _0x44327e = musicPushArr.indexOf(_0x238897);
    if (_0x44327e != -0x1) {
      var _0x41393c = _0xb83ea3 == undefined ? $.sound[musicPushArr[_0x44327e]].defaultVol : _0xb83ea3;
      var _0x5ceb0d = musicMute == false ? _0x41393c : 0x0;
      $.sound[musicPushArr[_0x44327e]].volume = _0x5ceb0d;
      $.sound[musicPushArr[_0x44327e]].defaultVol = _0x41393c;
    }
  }
}
var audioFile = null;
function playAudio(_0x27f9b4, _0xbfbf46) {
  if (soundOn) {
    if (audioFile == null) {
      audioFile = createjs.Sound.play(_0x27f9b4);
      setAudioVolume();
      audioFile.removeAllEventListeners();
      audioFile.addEventListener("complete", function (_0x4025b8) {
        audioFile = null;
        if (typeof _0xbfbf46 == "function") {
          _0xbfbf46();
        }
      });
    }
  }
}
function stopAudio() {
  if (soundOn) {
    if (audioFile != null) {
      audioFile.stop();
      audioFile = null;
    }
  }
}
function setAudioVolume() {
  if (soundOn) {
    if (audioFile != null) {
      var _0x2f63d9 = soundMute == false ? 0x1 : 0x0;
      audioFile.volume = _0x2f63d9;
    }
  }
}
var stage;
var canvasW = 0x0;
var canvasH = 0x0;
function initGameCanvas(_0x2d916a, _0x238444) {
  var _0x5ac4dc = document.getElementById("gameCanvas");
  _0x5ac4dc.width = _0x2d916a;
  _0x5ac4dc.height = _0x238444;
  canvasW = _0x2d916a;
  canvasH = _0x238444;
  stage = new createjs.Stage('gameCanvas');
  createjs.Touch.enable(stage);
  stage.enableMouseOver(0x14);
  stage.mouseMoveOutside = true;
  createjs.Ticker.framerate = 0x3c;
  createjs.Ticker.addEventListener("tick", tick);
}
var canvasContainer;
var mainContainer;
var gameContainer;
var instructionContainer;
var resultContainer;
var moveContainer;
var confirmContainer;
var guideline;
var bg;
var logo;
var buttonOk;
var result;
var shadowResult;
var buttonReplay;
var buttonFacebook;
var buttonTwitter;
var buttonWhatsapp;
var buttonFullscreen;
var buttonSoundOn;
var buttonSoundOff;
$.players = {};
$.domino = {};
function buildGameCanvas() {
  canvasContainer = new createjs.Container();
  mainContainer = new createjs.Container();
  buttonLocalContainer = new createjs.Container();
  mainContainer = new createjs.Container();
  dominoOptionsContainer = new createjs.Container();
  gameContainer = new createjs.Container();
  statusContainer = new createjs.Container();
  boardContainer = new createjs.Container();
  boardTileContainer = new createjs.Container();
  boardHighlightContainer = new createjs.Container();
  boardPlayersContainer = new createjs.Container();
  boardDrawContainer = new createjs.Container();
  boardScoreContainer = new createjs.Container();
  boardScoreListContainer = new createjs.Container();
  resultContainer = new createjs.Container();
  confirmContainer = new createjs.Container();
  bg = new createjs.Bitmap(loader.getResult('background'));
  bgP = new createjs.Bitmap(loader.getResult('backgroundP'));
  logo = new createjs.Bitmap(loader.getResult('logo'));
  logoP = new createjs.Bitmap(loader.getResult("logoP"));
  buttonPlay = new createjs.Bitmap(loader.getResult('buttonPlay'));
  centerReg(buttonPlay);
  buttonLocal = new createjs.Bitmap(loader.getResult("buttonLocal"));
  centerReg(buttonLocal);
  buttonOnline = new createjs.Bitmap(loader.getResult("buttonOnline"));
  centerReg(buttonOnline);
  itemOptions = new createjs.Bitmap(loader.getResult('itemPop'));
  itemOptionsP = new createjs.Bitmap(loader.getResult("itemPopP"));
  optionsTitleTxt = new createjs.Text();
  optionsTitleTxt.font = "60px bpreplaybold";
  optionsTitleTxt.color = "#fff";
  optionsTitleTxt.textAlign = 'center';
  optionsTitleTxt.textBaseline = "alphabetic";
  optionsTitleTxt.text = textDisplay.optionsTitle;
  itemPlayerNumbers = new createjs.Bitmap(loader.getResult('itemNumber'));
  centerReg(itemPlayerNumbers);
  totalPlayersTxt = new createjs.Text();
  totalPlayersTxt.font = "28px bpreplaybold";
  totalPlayersTxt.color = '#27C610';
  totalPlayersTxt.textAlign = 'center';
  totalPlayersTxt.textBaseline = "alphabetic";
  buttonPlayersL = new createjs.Bitmap(loader.getResult("buttonArrowLeft"));
  centerReg(buttonPlayersL);
  buttonPlayersR = new createjs.Bitmap(loader.getResult("buttonArrowRight"));
  centerReg(buttonPlayersR);
  itemPoints = new createjs.Bitmap(loader.getResult("itemNumber"));
  centerReg(itemPoints);
  pointsTxt = new createjs.Text();
  pointsTxt.font = "28px bpreplaybold";
  pointsTxt.color = "#27C610";
  pointsTxt.textAlign = "center";
  pointsTxt.textBaseline = 'alphabetic';
  buttonPointsL = new createjs.Bitmap(loader.getResult("buttonArrowLeft"));
  centerReg(buttonPointsL);
  buttonPointsR = new createjs.Bitmap(loader.getResult("buttonArrowRight"));
  centerReg(buttonPointsR);
  itemType = new createjs.Bitmap(loader.getResult("itemNumber"));
  centerReg(itemType);
  typeTxt = new createjs.Text();
  typeTxt.font = "28px bpreplaybold";
  typeTxt.color = '#27C610';
  typeTxt.textAlign = "center";
  typeTxt.textBaseline = "alphabetic";
  buttonTypeL = new createjs.Bitmap(loader.getResult('buttonArrowLeft'));
  centerReg(buttonTypeL);
  buttonTypeR = new createjs.Bitmap(loader.getResult("buttonArrowRight"));
  centerReg(buttonTypeR);
  themeContainer = new createjs.Container();
  buttonThemeL = new createjs.Bitmap(loader.getResult('buttonArrowLeft'));
  centerReg(buttonThemeL);
  buttonThemeR = new createjs.Bitmap(loader.getResult("buttonArrowRight"));
  centerReg(buttonThemeR);
  buttonNext = new createjs.Bitmap(loader.getResult('buttonNext'));
  centerReg(buttonNext);
  buttonStart = new createjs.Bitmap(loader.getResult("buttonStart"));
  centerReg(buttonStart);
  itemStatus = new createjs.Bitmap(loader.getResult("itemStatus"));
  centerReg(itemStatus);
  statusTxt = new createjs.Text();
  statusTxt.font = "25px bpreplaybold";
  statusTxt.color = "#fff";
  statusTxt.textAlign = 'center';
  statusTxt.textBaseline = "alphabetic";
  statusTxt.y = 0x17;
  statusPlayerTxt = new createjs.Text();
  statusPlayerTxt.font = "26px bpreplaybold";
  statusPlayerTxt.color = "#fff";
  statusPlayerTxt.textAlign = 'center';
  statusPlayerTxt.textBaseline = "alphabetic";
  statusPlayerTxt.y = -0xf;
  statusContainer.addChild(itemStatus, statusTxt, statusPlayerTxt);
  itemDrawBg = new createjs.Bitmap(loader.getResult("itemDrawBg"));
  centerReg(itemDrawBg);
  itemDrawBgP = new createjs.Bitmap(loader.getResult('itemDrawBgP'));
  centerReg(itemDrawBgP);
  drawTitleTxt = new createjs.Text();
  drawTitleTxt.font = "35px bpreplaybold";
  drawTitleTxt.color = "#fff";
  drawTitleTxt.textAlign = 'center';
  drawTitleTxt.textBaseline = "alphabetic";
  boardDrawContainer.addChild(itemDrawBg, itemDrawBgP, drawTitleTxt);
  itemScore = new createjs.Bitmap(loader.getResult("itemScore"));
  centerReg(itemScore);
  itemScoreTopMask = new createjs.Shape();
  itemScoreTopMask.graphics.beginFill("red").drawRect(-0xc8, -0xc8, 0x190, 0x12c);
  itemScoreTop = new createjs.Bitmap(loader.getResult("itemScoreTop"));
  centerReg(itemScoreTop);
  itemScoreTop.regY = 0x0;
  itemScoreTop.mask = itemScoreTopMask;
  roundStatusTxt = new createjs.Text();
  roundStatusTxt.font = "25px bpreplaybold";
  roundStatusTxt.color = "#fff";
  roundStatusTxt.textAlign = 'center';
  roundStatusTxt.textBaseline = 'alphabetic';
  roundStatusTxt.y = 0x61;
  boardScoreContainer.addChild(itemScoreTop, itemScore, roundStatusTxt, boardScoreListContainer);
  itemResult = new createjs.Bitmap(loader.getResult("itemPop"));
  itemResultP = new createjs.Bitmap(loader.getResult("itemPopP"));
  buttonContinue = new createjs.Bitmap(loader.getResult("buttonContinue"));
  centerReg(buttonContinue);
  resultShareTxt = new createjs.Text();
  resultShareTxt.font = "25px bpreplaybold";
  resultShareTxt.color = "#fff";
  resultShareTxt.textAlign = "center";
  resultShareTxt.textBaseline = "alphabetic";
  resultShareTxt.text = textDisplay.share;
  resultTitleTxt = new createjs.Text();
  resultTitleTxt.font = "60px bpreplaybold";
  resultTitleTxt.color = "#fff";
  resultTitleTxt.textAlign = "center";
  resultTitleTxt.textBaseline = "alphabetic";
  resultTitleTxt.text = textDisplay.resultTitle;
  resultDescTxt = new createjs.Text();
  resultDescTxt.font = "75px bpreplaybold";
  resultDescTxt.lineHeight = 0x23;
  resultDescTxt.color = '#FFFF00';
  resultDescTxt.textAlign = "center";
  resultDescTxt.textBaseline = 'alphabetic';
  resultDescTxt.text = '';
  buttonFacebook = new createjs.Bitmap(loader.getResult("buttonFacebook"));
  buttonTwitter = new createjs.Bitmap(loader.getResult("buttonTwitter"));
  buttonWhatsapp = new createjs.Bitmap(loader.getResult("buttonWhatsapp"));
  centerReg(buttonFacebook);
  createHitarea(buttonFacebook);
  centerReg(buttonTwitter);
  createHitarea(buttonTwitter);
  centerReg(buttonWhatsapp);
  createHitarea(buttonWhatsapp);
  buttonFullscreen = new createjs.Bitmap(loader.getResult("buttonFullscreen"));
  centerReg(buttonFullscreen);
  buttonSoundOn = new createjs.Bitmap(loader.getResult("buttonSoundOn"));
  centerReg(buttonSoundOn);
  buttonSoundOff = new createjs.Bitmap(loader.getResult("buttonSoundOff"));
  centerReg(buttonSoundOff);
  buttonSoundOn.visible = false;
  buttonMusicOn = new createjs.Bitmap(loader.getResult('buttonMusicOn'));
  centerReg(buttonMusicOn);
  buttonMusicOff = new createjs.Bitmap(loader.getResult("buttonMusicOff"));
  centerReg(buttonMusicOff);
  buttonMusicOn.visible = false;
  buttonExit = new createjs.Bitmap(loader.getResult("buttonExit"));
  centerReg(buttonExit);
  buttonSettings = new createjs.Bitmap(loader.getResult('buttonSettings'));
  centerReg(buttonSettings);
  createHitarea(buttonFullscreen);
  createHitarea(buttonSoundOn);
  createHitarea(buttonSoundOff);
  createHitarea(buttonExit);
  createHitarea(buttonSettings);
  optionsContainer = new createjs.Container();
  optionsContainer.addChild(buttonFullscreen, buttonSoundOn, buttonSoundOff, buttonMusicOn, buttonMusicOff, buttonExit);
  optionsContainer.visible = false;
  itemExit = new createjs.Bitmap(loader.getResult('itemPop'));
  itemExitP = new createjs.Bitmap(loader.getResult("itemPopP"));
  buttonConfirm = new createjs.Bitmap(loader.getResult("buttonConfirm"));
  centerReg(buttonConfirm);
  buttonCancel = new createjs.Bitmap(loader.getResult("buttonCancel"));
  centerReg(buttonCancel);
  popTitleTxt = new createjs.Text();
  popTitleTxt.font = "60px bpreplaybold";
  popTitleTxt.color = "#fff";
  popTitleTxt.textAlign = 'center';
  popTitleTxt.textBaseline = "alphabetic";
  popTitleTxt.text = textDisplay.exitTitle;
  popDescTxt = new createjs.Text();
  popDescTxt.font = "40px bpreplaybold";
  popDescTxt.lineHeight = 0x32;
  popDescTxt.color = "#fff";
  popDescTxt.textAlign = 'center';
  popDescTxt.textBaseline = 'alphabetic';
  popDescTxt.text = textDisplay.exitMessage;
  confirmContainer.addChild(itemExit, itemExitP, popTitleTxt, popDescTxt, buttonConfirm, buttonCancel);
  confirmContainer.visible = false;
  roomContainer = new createjs.Container();
  nameContainer = new createjs.Container();
  gameLogsTxt = new createjs.Text();
  gameLogsTxt.font = "20px bpreplaybold";
  gameLogsTxt.color = "#fff";
  gameLogsTxt.textAlign = "center";
  gameLogsTxt.textBaseline = "alphabetic";
  gameLogsTxt.text = '';
  buttonLocalContainer.addChild(buttonLocal, buttonOnline);
  mainContainer.addChild(logo, logoP, buttonPlay, buttonLocalContainer);
  dominoOptionsContainer.addChild(itemOptions, itemOptionsP, optionsTitleTxt, itemPlayerNumbers, totalPlayersTxt, buttonPlayersL, buttonPlayersR, itemPoints, pointsTxt, buttonPointsL, buttonPointsR, itemType, typeTxt, buttonTypeL, buttonTypeR, themeContainer, buttonThemeL, buttonThemeR, buttonStart, buttonNext);
  boardContainer.addChild(boardHighlightContainer, boardTileContainer);
  gameContainer.addChild(boardContainer, boardPlayersContainer, statusContainer, boardScoreContainer);
  resultContainer.addChild(itemResult, itemResultP, buttonContinue, resultTitleTxt, resultDescTxt);
  resultContainer.addChild(resultShareTxt, buttonFacebook, buttonTwitter, buttonWhatsapp);
  canvasContainer.addChild(bg, bgP, mainContainer, nameContainer, roomContainer, dominoOptionsContainer, gameContainer, gameLogsTxt, resultContainer, confirmContainer, optionsContainer, buttonSettings, guideline);
  stage.addChild(canvasContainer);
  changeViewport(viewport.isLandscape);
  resizeGameFunc();
}
function changeViewport(_0x393f1f) {
  if (_0x393f1f) {
    stageW = landscapeSize.w;
    stageH = landscapeSize.h;
    contentW = landscapeSize.cW;
    contentH = landscapeSize.cH;
  } else {
    stageW = portraitSize.w;
    stageH = portraitSize.h;
    contentW = portraitSize.cW;
    contentH = portraitSize.cH;
  }
  gameCanvas.width = stageW;
  gameCanvas.height = stageH;
  canvasW = stageW;
  canvasH = stageH;
  changeCanvasViewport();
}
function changeCanvasViewport() {
  if (canvasContainer != undefined) {
    boardContainer.x = canvasW / 0x2;
    boardContainer.y = canvasH / 0x2;
    if (viewport.isLandscape) {
      bg.visible = true;
      bgP.visible = false;
      logo.visible = true;
      logoP.visible = false;
      buttonPlay.x = canvasW / 0x2;
      buttonPlay.y = canvasH / 0x64 * 0x4b;
      buttonLocal.x = canvasW / 0x2 - 0x8c;
      buttonLocal.y = canvasH / 0x64 * 0x4b;
      buttonOnline.x = canvasW / 0x2 + 0x8c;
      buttonOnline.y = canvasH / 0x64 * 0x4b;
      itemOptions.visible = true;
      itemOptionsP.visible = false;
      optionsTitleTxt.x = canvasW / 0x2;
      optionsTitleTxt.y = canvasH / 0x64 * 0x25;
      itemType.x = canvasW / 0x2;
      itemType.y = canvasH / 0x64 * 0x2d;
      typeTxt.x = itemType.x;
      typeTxt.y = itemType.y + 0xa;
      buttonTypeL.x = canvasW / 0x2 - 0xc8;
      buttonTypeR.x = canvasW / 0x2 + 0xc8;
      buttonTypeL.y = buttonTypeR.y = itemType.y;
      itemPoints.x = canvasW / 0x2;
      itemPoints.y = canvasH / 0x64 * 0x38;
      pointsTxt.x = itemPoints.x;
      pointsTxt.y = itemPoints.y + 0xa;
      buttonPointsL.x = canvasW / 0x2 - 0xc8;
      buttonPointsR.x = canvasW / 0x2 + 0xc8;
      buttonPointsL.y = buttonPointsR.y = itemPoints.y;
      buttonNext.x = canvasW / 0x2;
      buttonNext.y = canvasH / 0x64 * 0x44;
      buttonStart.x = canvasW / 0x2;
      buttonStart.y = canvasH / 0x64 * 0x44;
      itemResult.visible = true;
      itemResultP.visible = false;
      buttonFacebook.x = canvasW / 0x64 * 0x2b;
      buttonFacebook.y = canvasH / 0x64 * 0x3a;
      buttonTwitter.x = canvasW / 0x2;
      buttonTwitter.y = canvasH / 0x64 * 0x3a;
      buttonWhatsapp.x = canvasW / 0x64 * 0x39;
      buttonWhatsapp.y = canvasH / 0x64 * 0x3a;
      buttonContinue.x = canvasW / 0x2;
      buttonContinue.y = canvasH / 0x64 * 0x44;
      resultShareTxt.x = canvasW / 0x2;
      resultShareTxt.y = canvasH / 0x64 * 0x35;
      resultTitleTxt.x = canvasW / 0x2;
      resultTitleTxt.y = canvasH / 0x64 * 0x25;
      resultDescTxt.x = canvasW / 0x2;
      resultDescTxt.y = canvasH / 0x64 * 0x30;
      itemExit.visible = true;
      itemExitP.visible = false;
      buttonConfirm.x = canvasW / 0x2 - 0x8c;
      buttonConfirm.y = canvasH / 0x64 * 0x44;
      buttonCancel.x = canvasW / 0x2 + 0x8c;
      buttonCancel.y = canvasH / 0x64 * 0x44;
      popTitleTxt.x = canvasW / 0x2;
      popTitleTxt.y = canvasH / 0x64 * 0x25;
      popDescTxt.x = canvasW / 0x2;
      popDescTxt.y = canvasH / 0x64 * 0x2d;
      $('#roomWrapper').removeClass('forPortrait');
      $("#notificationHolder").removeClass("forPortrait");
      $('#roomlists').attr("size", 0xa);
      $('#namelists').attr('size', 0xa);
      $("#roomLogs").attr('rows', 0xa);
    } else {
      boardContainer.x = canvasW / 0x2;
      boardContainer.y = canvasH / 0x64 * 0x32;
      bg.visible = false;
      bgP.visible = true;
      logo.visible = false;
      logoP.visible = true;
      buttonPlay.x = canvasW / 0x2;
      buttonPlay.y = canvasH / 0x64 * 0x49;
      buttonLocal.x = canvasW / 0x2;
      buttonLocal.y = canvasH / 0x64 * 0x49;
      buttonOnline.x = canvasW / 0x2;
      buttonOnline.y = canvasH / 0x64 * 0x55;
      itemOptions.visible = false;
      itemOptionsP.visible = true;
      optionsTitleTxt.x = canvasW / 0x2;
      optionsTitleTxt.y = canvasH / 0x64 * 0x28;
      itemType.x = canvasW / 0x2;
      itemType.y = canvasH / 0x64 * 0x2e;
      typeTxt.x = itemType.x;
      typeTxt.y = itemType.y + 0xa;
      buttonTypeL.x = canvasW / 0x2 - 0xc8;
      buttonTypeR.x = canvasW / 0x2 + 0xc8;
      buttonTypeL.y = buttonTypeR.y = itemType.y;
      itemPoints.x = canvasW / 0x2;
      itemPoints.y = canvasH / 0x64 * 0x36;
      pointsTxt.x = itemPoints.x;
      pointsTxt.y = itemPoints.y + 0xa;
      buttonPointsL.x = canvasW / 0x2 - 0xc8;
      buttonPointsR.x = canvasW / 0x2 + 0xc8;
      buttonPointsL.y = buttonPointsR.y = itemPoints.y;
      buttonNext.x = canvasW / 0x2;
      buttonNext.y = canvasH / 0x64 * 0x40;
      buttonStart.x = canvasW / 0x2;
      buttonStart.y = canvasH / 0x64 * 0x40;
      itemResult.visible = false;
      itemResultP.visible = true;
      buttonFacebook.x = canvasW / 0x64 * 0x27;
      buttonFacebook.y = canvasH / 0x64 * 0x38;
      buttonTwitter.x = canvasW / 0x2;
      buttonTwitter.y = canvasH / 0x64 * 0x38;
      buttonWhatsapp.x = canvasW / 0x64 * 0x3d;
      buttonWhatsapp.y = canvasH / 0x64 * 0x38;
      buttonContinue.x = canvasW / 0x2;
      buttonContinue.y = canvasH / 0x64 * 0x40;
      resultShareTxt.x = canvasW / 0x2;
      resultShareTxt.y = canvasH / 0x64 * 0x34;
      resultTitleTxt.x = canvasW / 0x2;
      resultTitleTxt.y = canvasH / 0x64 * 0x28;
      resultDescTxt.x = canvasW / 0x2;
      resultDescTxt.y = canvasH / 0x64 * 0x30;
      itemExit.visible = false;
      itemExitP.visible = true;
      buttonConfirm.x = canvasW / 0x2 - 0x82;
      buttonConfirm.y = canvasH / 0x64 * 0x40;
      buttonCancel.x = canvasW / 0x2 + 0x82;
      buttonCancel.y = canvasH / 0x64 * 0x40;
      popTitleTxt.x = canvasW / 0x2;
      popTitleTxt.y = canvasH / 0x64 * 0x28;
      popDescTxt.x = canvasW / 0x2;
      popDescTxt.y = canvasH / 0x64 * 0x30;
      $("#roomWrapper").addClass("forPortrait");
      $("#notificationHolder").addClass('forPortrait');
      $("#roomlists").attr("size", 0x8);
      $("#namelists").attr("size", 0x8);
      $("#roomLogs").attr('rows', 0x6);
    }
  }
}
function resizeCanvas() {
  if (canvasContainer != undefined) {
    buttonSettings.x = canvasW - offset.x - 0x32;
    buttonSettings.y = offset.y + 0x2d;
    var _0x4eb62c = 0x0;
    if (curPage != "game") {
      buttonExit.visible = false;
      buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
      buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y + 0x41;
      buttonSoundOn.x = buttonSoundOff.x;
      buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y + 0x41;
      if (typeof buttonMusicOn != "undefined") {
        buttonMusicOn.x = buttonMusicOff.x = buttonSettings.x;
        buttonMusicOn.y = buttonMusicOff.y = buttonSettings.y + 130;
        buttonMusicOn.x = buttonMusicOff.x;
        buttonMusicOn.y = buttonMusicOff.y = buttonSettings.y + 130;
        _0x4eb62c = 0x2;
      } else {
        _0x4eb62c = 0x1;
      }
      buttonFullscreen.x = buttonSettings.x;
      buttonFullscreen.y = buttonSettings.y + 0x41 * (_0x4eb62c + 0x1);
    } else {
      buttonExit.visible = true;
      buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
      buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y + 0x41;
      buttonSoundOn.x = buttonSoundOff.x;
      buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y + 0x41;
      if (typeof buttonMusicOn != "undefined") {
        buttonMusicOn.x = buttonMusicOff.x = buttonSettings.x;
        buttonMusicOn.y = buttonMusicOff.y = buttonSettings.y + 130;
        buttonMusicOn.x = buttonMusicOff.x;
        buttonMusicOn.y = buttonMusicOff.y = buttonSettings.y + 130;
        _0x4eb62c = 0x2;
      } else {
        _0x4eb62c = 0x1;
      }
      buttonFullscreen.x = buttonSettings.x;
      buttonFullscreen.y = buttonSettings.y + 0x41 * (_0x4eb62c + 0x1);
      buttonExit.x = buttonSettings.x;
      buttonExit.y = buttonSettings.y + 0x41 * (_0x4eb62c + 0x2);
    }
    resizeGameLayout();
    resizeSocketLog();
  }
}
function removeGameCanvas() {
  stage.autoClear = true;
  stage.removeAllChildren();
  stage.update();
  createjs.Ticker.removeEventListener("tick", tick);
  createjs.Ticker.removeEventListener("tick", stage);
}
function tick(_0x2fe228) {
  updateGame();
  stage.update(_0x2fe228);
}
function centerReg(_0x4eccfa) {
  _0x4eccfa.regX = _0x4eccfa.image.naturalWidth / 0x2;
  _0x4eccfa.regY = _0x4eccfa.image.naturalHeight / 0x2;
}
function createHitarea(_0x34dac1) {
  _0x34dac1.hitArea = new createjs.Shape(new createjs.Graphics().beginFill('#000').drawRect(0x0, 0x0, _0x34dac1.image.naturalWidth, _0x34dac1.image.naturalHeight));
}
var themes_arr = [{
  'bg': {
    'front': 'assets/theme_bg_01.png',
    'back': "assets/theme_cover_01.png",
    'pos': [{
      'x': -0x19,
      'y': 0x0
    }, {
      'x': 0x19,
      'y': 0x0
    }]
  },
  'highlight': {
    'image': "assets/theme_highlight_01.png"
  },
  'shadow': {
    'image': "assets/theme_shadow_01.png"
  },
  'numbers': {
    'image': 'assets/theme_numbers_01.png',
    'width': 0x2d,
    'height': 0x2d
  }
}, {
  'bg': {
    'front': "assets/theme_bg_02.png",
    'back': "assets/theme_cover_02.png",
    'pos': [{
      'x': -0x19,
      'y': 0x0
    }, {
      'x': 0x19,
      'y': 0x0
    }]
  },
  'highlight': {
    'image': 'assets/theme_highlight_02.png'
  },
  'shadow': {
    'image': "assets/theme_shadow_02.png"
  },
  'numbers': {
    'image': 'assets/theme_numbers_02.png',
    'width': 0x2d,
    'height': 0x2d
  }
}, {
  'bg': {
    'front': 'assets/theme_bg_03.png',
    'back': 'assets/theme_cover_03.png',
    'pos': [{
      'x': -0x19,
      'y': 0x0
    }, {
      'x': 0x19,
      'y': 0x0
    }]
  },
  'highlight': {
    'image': 'assets/theme_highlight_03.png'
  },
  'shadow': {
    'image': 'assets/theme_shadow_01.png'
  },
  'numbers': {
    'image': 'assets/theme_numbers_03.png',
    'width': 0x2d,
    'height': 0x2d
  }
}, {
  'bg': {
    'front': "assets/theme_bg_04.png",
    'back': "assets/theme_cover_04.png",
    'pos': [{
      'x': -0x19,
      'y': 0x0
    }, {
      'x': 0x19,
      'y': 0x0
    }]
  },
  'highlight': {
    'image': "assets/theme_highlight_04.png"
  },
  'shadow': {
    'image': 'assets/theme_shadow_01.png'
  },
  'numbers': {
    'image': 'assets/theme_numbers_04.png',
    'width': 0x2d,
    'height': 0x2d
  }
}, {
  'bg': {
    'front': "assets/theme_bg_05.png",
    'back': "assets/theme_cover_05.png",
    'pos': [{
      'x': -0x19,
      'y': 0x0
    }, {
      'x': 0x19,
      'y': 0x0
    }]
  },
  'highlight': {
    'image': 'assets/theme_highlight_05.png'
  },
  'shadow': {
    'image': 'assets/theme_shadow_01.png'
  },
  'numbers': {
    'image': "assets/theme_numbers_05.png",
    'width': 0x2d,
    'height': 0x2d
  }
}];
var tiles_arr = [[0x0, 0x0], [0x0, 0x1], [0x0, 0x2], [0x0, 0x3], [0x0, 0x4], [0x0, 0x5], [0x0, 0x6], [0x1, 0x1], [0x1, 0x2], [0x1, 0x3], [0x1, 0x4], [0x1, 0x5], [0x1, 0x6], [0x2, 0x2], [0x2, 0x3], [0x2, 0x4], [0x2, 0x5], [0x2, 0x6], [0x3, 0x3], [0x3, 0x4], [0x3, 0x5], [0x3, 0x6], [0x4, 0x4], [0x4, 0x5], [0x4, 0x6], [0x5, 0x5], [0x5, 0x6], [0x6, 0x6]];
var gameSettings = {
  'tileSpace': 0xa,
  'tilePlacedSpace': 0x2,
  'tileShadowSpace': 0x5,
  'tileMoveSpeed': 0.5,
  'tileDealSpeed': 0.4,
  'aiThinkSpeed': 1.5,
  'aiDrawSpeed': 0x1,
  'dragToMove': true,
  'autoMove': false,
  // 'points': [0x64, 0x96, 0xc8],
  'points': [10, 0x96, 0xc8],//puntos del juego
  'playerTotalTiles': [
        {
            players: 2,
            tiles: 7,
        },
        {
            players: 3,
            tiles: 5,
        },
        {
            players: 4,
            tiles: 5,
        },
    ],
  // 'playerTotalTiles': [{
  //   'players': 0x2,
  //   'tiles': 0x7
  // }, {
  //   'players': 0x3,
  //   'tiles': 0x5
  // }, {
  //   'players': 0x4,
  //   'tiles': 0x5
  // }]
};
var textDisplay = {
  'optionsTitle': "OPTIONS",
  'totalPlayers': "[NUMBER] PLAYERS",
  'goalPoint': "GOAL [NUMBER]PTS",
  'typeDraw': "DRAW DOMINOES",
  'typeBlock': "BLOCK DOMINOES",
  'playerName': "PLAYER [NUMBER]",
  'playerScore': "[NUMBER]PTS",
  'highestToStart': "HIGHEST TO START",
  'playerNoMove': "NO POSSIBLE MOVES",
  'playerCantMove': "CAN'T MOVE",
  'playerBlocked': "LOCKED",
  'userPickDomino': "PICK A DOMINO",
  'playerPickDomino': "[NAME] IS PICKING A DOMINO",
  'playerDomino': "DOMINO!",
  'playerRoundWin': "YOU WIN THIS ROUND",
  'playerRoundLose': "YOU LOSE THIS ROUND",
  'roundEnd': "ROUND END",
  'goalPointTitle': "GOAL POINT ([NUMBER]PTS)",
  'playerScoreAdd': " (+[NUMBER]PTS)",
  'userWin': "YOU WIN THE GAME",
  'playerWin': "[NAME] WIN THE GAME",
  'exitTitle': "EXIT GAME",
  'exitMessage': "Are you sure you want\nto quit game?",
  'share': "SHARE YOUR SCORE:",
  'resultTitle': "GAME OVER",
  'resultDesc': '[NUMBER]PTS'
};
$.editor = {
  'enable': false
};
var playerData = {
  'score': 0x0,
  'scores': []
};
var gameData = {
  'paused': true,
  'moving': false,
  'player': 0x0,
  'players': 2,        // 2 jugadores por defecto
  'pointIndex': 0x0,   // 10 puntos (índice 0)
  'themeIndex': 0x0,
  'drawing': false,
  'ai': true,
  'complete': false,
  'names': [],
  'domino': {          // Configuración por defecto del dominó
    'draw': true,      // Draw dominoes activado
    'point': 10        // 10 puntos
  }
};
var tweenData = {
  'score': 0x0,
  'tweenScore': 0x0
};
function buildGameButton() {
  $(window).focus(function () {
    if (!buttonSoundOn.visible) {
      toggleSoundInMute(false);
    }
    if (typeof buttonMusicOn != 'undefined') {
      if (!buttonMusicOn.visible) {
        toggleMusicInMute(false);
      }
    }
  });
  $(window).blur(function () {
    if (!buttonSoundOn.visible) {
      toggleSoundInMute(true);
    }
    if (typeof buttonMusicOn != "undefined") {
      if (!buttonMusicOn.visible) {
        toggleMusicInMute(true);
      }
    }
  });
  buttonPlay.cursor = 'pointer';
  buttonPlay.addEventListener('click', function (_0x451e38) {
    playSound('soundButton');
    if (typeof initSocket == "function" && multiplayerSettings.enable) {
      if (multiplayerSettings.localPlay) {
        toggleMainButton("local");
      } else {
        checkQuickGameMode();
      }
    } else {
    //   goPage("options");
      goPage("game");
    }
  });
  buttonLocal.cursor = "pointer";
  buttonLocal.addEventListener('click', function (_0x5687b2) {
    playSound("soundButton");
    socketData.online = false;
    goPage("options");
  });
  buttonOnline.cursor = "pointer";
  buttonOnline.addEventListener("click", function (_0x2a15b3) {
    playSound("soundButton");
    checkQuickGameMode();
  });
  buttonPlayersL.cursor = 'pointer';
  buttonPlayersL.addEventListener("click", function (_0x43ab2f) {
    playSound("soundButton");
    toggleTotalPlayers(false);
  });
  buttonPlayersR.cursor = "pointer";
  buttonPlayersR.addEventListener('click', function (_0x3131a1) {
    playSound("soundButton");
    toggleTotalPlayers(true);
  });
  buttonPointsL.cursor = "pointer";
  buttonPointsL.addEventListener('click', function (_0x5f2374) {
    playSound("soundButton");
    togglePoints(false);
  });
  buttonPointsR.cursor = 'pointer';
  buttonPointsR.addEventListener("click", function (_0x2ec7fc) {
    playSound('soundButton');
    togglePoints(true);
  });
  buttonTypeL.cursor = "pointer";
  buttonTypeL.addEventListener('click', function (_0xc58cd9) {
    playSound('soundButton');
    toggleGameType(false);
  });
  buttonTypeR.cursor = "pointer";
  buttonTypeR.addEventListener("click", function (_0x857f57) {
    playSound("soundButton");
    toggleGameType(true);
  });
  buttonThemeL.cursor = "pointer";
  buttonThemeL.addEventListener("click", function (_0x27a9b5) {
    playSound("soundButton");
    toggleTheme(false);
  });
  buttonThemeR.cursor = 'pointer';
  buttonThemeR.addEventListener('click', function (_0x4094cf) {
    playSound('soundButton');
    toggleTheme(true);
  });
  buttonNext.cursor = "pointer";
  buttonNext.addEventListener("click", function (_0x4ff15a) {
    playSound("soundButton");
    toggleDominoOptions(false);
  });
  buttonStart.cursor = 'pointer';
  buttonStart.addEventListener("click", function (_0x858f66) {
    playSound('soundButton');
    if (typeof initSocket == "function" && multiplayerSettings.enable && socketData.online) {
      postSocketUpdate("start");
    } else {
      goPage("game");
    }
  });
  itemExit.addEventListener("click", function (_0x3a5ca8) {});
  buttonContinue.cursor = "pointer";
  buttonContinue.addEventListener("click", function (_0x200119) {
    playSound("soundButton");
    goPage('main');
  });
  buttonFacebook.cursor = "pointer";
  buttonFacebook.addEventListener("click", function (_0xd69c50) {
    share("facebook");
  });
  buttonTwitter.cursor = "pointer";
  buttonTwitter.addEventListener("click", function (_0xc75152) {
    share("twitter");
  });
  buttonWhatsapp.cursor = "pointer";
  buttonWhatsapp.addEventListener("click", function (_0x1fd045) {
    share('whatsapp');
  });
  buttonSoundOff.cursor = "pointer";
  buttonSoundOff.addEventListener("click", function (_0x38f187) {
    toggleSoundMute(true);
  });
  buttonSoundOn.cursor = "pointer";
  buttonSoundOn.addEventListener("click", function (_0x4e13a1) {
    toggleSoundMute(false);
  });
  if (typeof buttonMusicOff != "undefined") {
    buttonMusicOff.cursor = "pointer";
    buttonMusicOff.addEventListener("click", function (_0x510caf) {
      toggleMusicMute(true);
    });
  }
  if (typeof buttonMusicOn != "undefined") {
    buttonMusicOn.cursor = "pointer";
    buttonMusicOn.addEventListener("click", function (_0x17bc1d) {
      toggleMusicMute(false);
    });
  }
  buttonFullscreen.cursor = 'pointer';
  buttonFullscreen.addEventListener("click", function (_0x2d349d) {
    toggleFullScreen();
  });
  buttonExit.cursor = "pointer";
  buttonExit.addEventListener('click', function (_0x344677) {
    togglePop(true);
    toggleOption();
  });
  buttonSettings.cursor = "pointer";
  buttonSettings.addEventListener("click", function (_0x36d781) {
    toggleOption();
  });
  buttonConfirm.cursor = "pointer";
  buttonConfirm.addEventListener("click", function (_0x116b54) {
    playSound("soundButton");
    togglePop(false);
    stopAudio();
    stopGame();
    goPage('main');
    if (typeof initSocket == 'function' && multiplayerSettings.enable && socketData.online) {
      exitSocketRoom();
    }
  });
  buttonCancel.cursor = "pointer";
  buttonCancel.addEventListener('click', function (_0x3dde07) {
    playSound("soundButton");
    togglePop(false);
  });
  itemDrawBg.addEventListener("click", function (_0x52590a) {});
  // Configuración ya establecida en gameData por defecto
  gameData.maxPlayers = 0x4;
  gameData.minPlayers = 0x2;
  // gameData.players ya está configurado en 2 por defecto
  // gameData.pointIndex ya está configurado en 0 (10 puntos) por defecto
  // gameData.domino ya está configurado por defecto
  gameData.themeIndex = 0x0;
  gameData.lastThemeIndex = -0x1;
  gameData.optionsFirst = true;
  displayDominoOptions();
}
function toggleMainButton(_0x4ad9b4) {
  if (typeof initSocket == "function" && multiplayerSettings.enable) {
    gameLogsTxt.visible = true;
    gameLogsTxt.text = '';
  }
  buttonPlay.visible = false;
  buttonLocalContainer.visible = false;
  if (_0x4ad9b4 == "default") {
    buttonPlay.visible = true;
  } else if (_0x4ad9b4 == "local") {
    buttonLocalContainer.visible = true;
  }
}
function checkQuickGameMode() {
  socketData.online = true;
  if (!multiplayerSettings.enterName) {
    buttonPlay.visible = false;
    buttonLocalContainer.visible = false;
    addSocketRandomUser();
  } else {
    goPage("name");
  }
}
function toggleTotalPlayers(_0xbfbe8) {
  if (_0xbfbe8) {
    gameData.players++;
    gameData.players = gameData.players > gameData.maxPlayers ? gameData.maxPlayers : gameData.players;
  } else {
    gameData.players--;
    gameData.players = gameData.players < gameData.minPlayers ? gameData.minPlayers : gameData.players;
  }
  displayDominoOptions();
  if (typeof initSocket == 'function' && multiplayerSettings.enable && socketData.online) {
    if (socketData.host) {
      postSocketUpdate("updateoptions", {
        'pointIndex': gameData.pointIndex,
        'draw': gameData.domino.draw,
        'themeIndex': gameData.themeIndex,
        'options': gameData.optionsFirst
      }, true);
    }
  }
}
function togglePoints(_0x1d2830) {
  if (_0x1d2830) {
    gameData.pointIndex++;
    gameData.pointIndex = gameData.pointIndex > gameSettings.points.length - 0x1 ? gameSettings.points.length - 0x1 : gameData.pointIndex;
  } else {
    gameData.pointIndex--;
    gameData.pointIndex = gameData.pointIndex < 0x0 ? 0x0 : gameData.pointIndex;
  }
  displayDominoOptions();
  if (typeof initSocket == "function" && multiplayerSettings.enable && socketData.online) {
    if (socketData.host) {
      postSocketUpdate("updateoptions", {
        'pointIndex': gameData.pointIndex,
        'draw': gameData.domino.draw,
        'themeIndex': gameData.themeIndex,
        'options': gameData.optionsFirst
      }, true);
    }
  }
}
function toggleGameType(_0x34e5af) {
  gameData.domino.draw = _0x34e5af;
  displayDominoOptions();
  if (typeof initSocket == "function" && multiplayerSettings.enable && socketData.online) {
    if (socketData.host) {
      postSocketUpdate('updateoptions', {
        'pointIndex': gameData.pointIndex,
        'draw': gameData.domino.draw,
        'themeIndex': gameData.themeIndex,
        'options': gameData.optionsFirst
      }, true);
    }
  }
}
function toggleTheme(_0x2d0d75) {
  if (_0x2d0d75) {
    gameData.themeIndex++;
    gameData.themeIndex = gameData.themeIndex > themes_arr.length - 0x1 ? themes_arr.length - 0x1 : gameData.themeIndex;
  } else {
    gameData.themeIndex--;
    gameData.themeIndex = gameData.themeIndex < 0x0 ? 0x0 : gameData.themeIndex;
  }
  displayDominoOptions();
  if (typeof initSocket == "function" && multiplayerSettings.enable && socketData.online) {
    if (socketData.host) {
      postSocketUpdate("updateoptions", {
        'pointIndex': gameData.pointIndex,
        'draw': gameData.domino.draw,
        'themeIndex': gameData.themeIndex,
        'options': gameData.optionsFirst
      }, true);
    }
  }
}
function displayDominoOptions() {
  totalPlayersTxt.text = textDisplay.totalPlayers.replace("[NUMBER]", gameData.players);
  pointsTxt.text = textDisplay.goalPoint.replace("[NUMBER]", gameSettings.points[gameData.pointIndex]);
  typeTxt.text = gameData.domino.draw == true ? textDisplay.typeDraw : textDisplay.typeBlock;
  gameData.domino.point = gameSettings.points[gameData.pointIndex];
  if (gameData.lastThemeIndex != gameData.themeIndex) {
    gameData.lastThemeIndex = gameData.themeIndex;
    themeContainer.removeAllChildren();
    var _0x47140d = new createjs.Container();
    var _0x1436c8 = new createjs.Bitmap(loader.getResult("themeBgFront" + gameData.themeIndex));
    centerReg(_0x1436c8);
    _0x47140d.addChild(_0x1436c8);
    var _0x17064a = themes_arr[gameData.themeIndex].numbers.width;
    var _0x51ab63 = themes_arr[gameData.themeIndex].numbers.height;
    var _0x41e343 = {
      'regX': _0x17064a / 0x2,
      'regY': _0x17064a / 0x2,
      'count': 0x7,
      'width': _0x17064a,
      'height': _0x51ab63
    };
    var _0x209484 = {
      'animate': {
        'frames': [0x0, 0x1, 0x2, 0x3, 0x4, 0x5, 0x6],
        'speed': 0x1
      }
    };
    var _0x47499f = new createjs.SpriteSheet({
      'images': [loader.getResult("themeNumbers" + gameData.themeIndex).src],
      'frames': _0x41e343,
      'animations': _0x209484
    });
    var _0x1f2810 = new createjs.Sprite(_0x47499f, "animate");
    _0x1f2810.framerate = 0x14;
    var _0x186125 = Math.floor(Math.random() * tiles_arr.length);
    for (var _0x128a3a = 0x0; _0x128a3a < themes_arr[gameData.themeIndex].bg.pos.length; _0x128a3a++) {
      var _0x1b044d = _0x1f2810.clone(true);
      _0x1b044d.x = themes_arr[gameData.themeIndex].bg.pos[_0x128a3a].x;
      _0x1b044d.y = themes_arr[gameData.themeIndex].bg.pos[_0x128a3a].y;
      _0x1b044d.gotoAndStop(tiles_arr[_0x186125][_0x128a3a]);
      _0x47140d.addChild(_0x1b044d);
    }
    _0x47140d.scaleX = _0x47140d.scaleY = 1.2;
    themeContainer.addChild(_0x47140d);
  }
}
function toggleDominoOptions(_0xdae301) {
  gameData.optionsFirst = _0xdae301;
  itemPlayerNumbers.visible = false;
  totalPlayersTxt.visible = false;
  buttonPlayersL.visible = false;
  buttonPlayersR.visible = false;
  itemPoints.visible = false;
  pointsTxt.visible = false;
  buttonPointsL.visible = false;
  buttonPointsR.visible = false;
  itemType.visible = false;
  typeTxt.visible = false;
  buttonTypeL.visible = false;
  buttonTypeR.visible = false;
  themeContainer.visible = false;
  buttonThemeL.visible = false;
  buttonThemeR.visible = false;
  buttonNext.visible = false;
  buttonStart.visible = false;
  if (_0xdae301) {
    itemPoints.visible = true;
    pointsTxt.visible = true;
    buttonPointsL.visible = true;
    buttonPointsR.visible = true;
    itemType.visible = true;
    typeTxt.visible = true;
    buttonTypeL.visible = true;
    buttonTypeR.visible = true;
    buttonNext.visible = true;
    if (typeof initSocket == "function" && multiplayerSettings.enable && socketData.online) {
      if (!socketData.host) {
        buttonPointsL.visible = false;
        buttonPointsR.visible = false;
        buttonTypeL.visible = false;
        buttonTypeR.visible = false;
        buttonNext.visible = false;
      }
    }
  } else {
    itemPlayerNumbers.visible = true;
    totalPlayersTxt.visible = true;
    buttonPlayersL.visible = true;
    buttonPlayersR.visible = true;
    themeContainer.visible = true;
    buttonThemeL.visible = true;
    buttonThemeR.visible = true;
    buttonStart.visible = true;
    if (typeof initSocket == "function" && multiplayerSettings.enable && socketData.online) {
      itemPlayerNumbers.visible = false;
      totalPlayersTxt.visible = false;
      buttonPlayersL.visible = false;
      buttonPlayersR.visible = false;
      if (!socketData.host) {
        buttonPointsL.visible = false;
        buttonPointsR.visible = false;
        buttonThemeL.visible = false;
        buttonThemeR.visible = false;
        buttonStart.visible = false;
      }
    }
  }
  displayDominoOptions();
  if (typeof initSocket == "function" && multiplayerSettings.enable && socketData.online) {
    if (socketData.host) {
      postSocketUpdate('updateoptions', {
        'pointIndex': gameData.pointIndex,
        'draw': gameData.domino.draw,
        'themeIndex': gameData.themeIndex,
        'options': gameData.optionsFirst
      }, true);
    }
  }
  resizeGameLayout();
}
function resizeSocketLog() {
  if (curPage == "main") {
    if (viewport.isLandscape) {
      gameLogsTxt.x = canvasW / 0x2;
      gameLogsTxt.y = canvasH / 0x64 * 0x4b;
    } else {
      gameLogsTxt.x = canvasW / 0x2;
      gameLogsTxt.y = canvasH / 0x64 * 0x4b;
    }
  } else if (curPage == 'options') {
    if (viewport.isLandscape) {
      gameLogsTxt.x = canvasW / 0x2;
      gameLogsTxt.y = canvasH / 0x64 * 0x43;
    } else {
      gameLogsTxt.x = canvasW / 0x2;
      gameLogsTxt.y = canvasH / 0x64 * 0x41;
    }
  }
}
function togglePop(_0x95a549) {
  confirmContainer.visible = _0x95a549;
}
var curPage = '';
function goPage(_0x19db01) {
  curPage = _0x19db01;
  $("#roomWrapper").hide();
  $("#roomWrapper .innerContent").hide();
  gameLogsTxt.visible = false;
  mainContainer.visible = false;
  nameContainer.visible = false;
  roomContainer.visible = false;
  dominoOptionsContainer.visible = false;
  gameContainer.visible = false;
  resultContainer.visible = false;
  var _0x5d2f87 = null;
  switch (_0x19db01) {
    case 'main':
      _0x5d2f87 = mainContainer;
      if (typeof initSocket == 'function' && multiplayerSettings.enable) {
        socketData.online = false;
      }
      toggleMainButton("default");
      playMusicLoop('musicMain');
      break;
    case "name":
      _0x5d2f87 = nameContainer;
      $("#roomWrapper").show();
      $("#roomWrapper .nameContent").show();
      $("#roomWrapper .fontNameError").html('');
      $('#enterName').show();
      break;
    case "room":
      _0x5d2f87 = roomContainer;
      $("#roomWrapper").show();
      $("#roomWrapper .roomContent").show();
      switchSocketRoomContent("lists");
      break;
    case "options":
      _0x5d2f87 = dominoOptionsContainer;
      toggleDominoOptions(true);
      break;
    case 'game':
      _0x5d2f87 = gameContainer;
      playMusicLoop('musicGame');
      stopMusicLoop("musicMain");
      startGame();
      break;
    case "result":
      _0x5d2f87 = resultContainer;
      stopGame();
      togglePop(false);
      playMusicLoop("musicMain");
      stopMusicLoop("musicGame");
      playSound("soundResult");
      tweenData.tweenScore = 0x0;
      if (typeof initSocket == "function" && multiplayerSettings.enable && socketData.online) {
        playerData.score = playerData.scores[socketData.gameIndex];
        if (socketData.host) {
          postSocketCloseRoom();
        }
      } else {
        playerData.score = playerData.scores[0x0];
      }
      tweenData.tweenScore = 0x0;
      TweenMax.to(tweenData, 0.5, {
        'tweenScore': playerData.score,
        'overwrite': true,
        'onUpdate': function () {
          resultDescTxt.text = textDisplay.resultDesc.replace('[NUMBER]', addCommas(Math.floor(tweenData.tweenScore)));
        }
      });
      saveGame(playerData.score);
      break;
  }
  if (_0x5d2f87 != null) {
    _0x5d2f87.visible = true;
    _0x5d2f87.alpha = 0x0;
    TweenMax.to(_0x5d2f87, 0.5, {
      'alpha': 0x1,
      'overwrite': true
    });
  }
  resizeCanvas();
}
function startGame() {
  gameData.paused = false;
  playerData.scores = [];
  for (var _0x4017d8 = 0x0; _0x4017d8 < gameData.players; _0x4017d8++) {
    playerData.scores.push(0x0);
  }
  startDomino();
}
function startDomino() {
  statusContainer.alpha = 0x0;
  toggleRoundScore(false);
  prepareDomino();
  if (typeof initSocket == 'function' && multiplayerSettings.enable && socketData.online) {
    gameData.ai = false;
    postSocketUpdate('ready', socketData.gameIndex);
  } else {
    gameData.ai = true;
    preparePlayers();
  }
}
function stopGame() {
  gameData.paused = true;
  TweenMax.killAll(false, true, false);
}
function saveGame(_0x37d3c5) {
  if (typeof toggleScoreboardSave == "function") {
    $.scoreData.score = _0x37d3c5;
    if (typeof type != "undefined") {
      $.scoreData.type = type;
    }
    toggleScoreboardSave(true);
  }
}
function prepareDomino() {
  gameData.drawing = false;
  gameData.tile = {
    'width': 0x0,
    'height': 0x0
  };
  gameData.placed = [];
  gameData.tiles = [];
  gameData.draw = [];
  gameData.seq = [];
  gameData.deal = {
    'status': false,
    'animation': false,
    'count': 0x0,
    'total': 0x0,
    'delay': 0x0
  };
  gameData.tileSelected = -0x1;
  gameData.tilesIndex = 0x0;
  gameData.prepared = false;
  gameData.complete = false;
  if (typeof initSocket == "function" && multiplayerSettings.enable && socketData.online) {
    var _0x90eabe = socketData.gameIndex;
    for (var _0x2427db = 0x0; _0x2427db < gameData.players; _0x2427db++) {
      gameData.seq.push(_0x90eabe);
      _0x90eabe++;
      _0x90eabe = _0x90eabe > gameData.players - 0x1 ? 0x0 : _0x90eabe;
    }
  } else {
    for (var _0x2427db = 0x0; _0x2427db < gameData.players; _0x2427db++) {
      gameData.seq.push(_0x2427db);
    }
  }
  playSound("soundShuffleIn");
  boardTileContainer.removeAllChildren();
  boardHighlightContainer.removeAllChildren();
  for (var _0x2427db = 0x0; _0x2427db < tiles_arr.length; _0x2427db++) {
    $.domino[_0x2427db] = new createjs.Container();
    $.domino[_0x2427db].frontContainer = new createjs.Container();
    $.domino[_0x2427db].frontContainer.visible = false;
    var _0x2a9468 = new createjs.Bitmap(loader.getResult("themeHighlight" + gameData.themeIndex));
    centerReg(_0x2a9468);
    _0x2a9468.visible = false;
    $.domino[_0x2427db].addChild(_0x2a9468);
    $.domino[_0x2427db].highlight = _0x2a9468;
    var _0x12a77f = new createjs.Bitmap(loader.getResult("themeBgFront" + gameData.themeIndex));
    centerReg(_0x12a77f);
    gameData.tile.width = _0x12a77f.image.naturalWidth;
    gameData.tile.height = _0x12a77f.image.naturalHeight;
    $.domino[_0x2427db].frontContainer.addChild(_0x12a77f);
    var _0x8737bc = themes_arr[gameData.themeIndex].numbers.width;
    var _0x45e191 = themes_arr[gameData.themeIndex].numbers.height;
    var _0x5647dc = {
      'regX': _0x8737bc / 0x2,
      'regY': _0x8737bc / 0x2,
      'count': 0x7,
      'width': _0x8737bc,
      'height': _0x45e191
    };
    var _0x2683ef = {
      'animate': {
        'frames': [0x0, 0x1, 0x2, 0x3, 0x4, 0x5, 0x6],
        'speed': 0x1
      }
    };
    var _0x20bbb2 = new createjs.SpriteSheet({
      'images': [loader.getResult('themeNumbers' + gameData.themeIndex).src],
      'frames': _0x5647dc,
      'animations': _0x2683ef
    });
    var _0x2407f5 = new createjs.Sprite(_0x20bbb2, "animate");
    _0x2407f5.framerate = 0x14;
    for (var _0x18bb99 = 0x0; _0x18bb99 < themes_arr[gameData.themeIndex].bg.pos.length; _0x18bb99++) {
      var _0x17a99e = _0x2407f5.clone(true);
      _0x17a99e.x = themes_arr[gameData.themeIndex].bg.pos[_0x18bb99].x;
      _0x17a99e.y = themes_arr[gameData.themeIndex].bg.pos[_0x18bb99].y;
      _0x17a99e.gotoAndStop(tiles_arr[_0x2427db][_0x18bb99]);
      $.domino[_0x2427db].frontContainer.addChild(_0x17a99e);
    }
    var _0x9b5cd7 = new createjs.Bitmap(loader.getResult('themeBgBack' + gameData.themeIndex));
    centerReg(_0x9b5cd7);
    $.domino[_0x2427db].addChild(_0x9b5cd7, $.domino[_0x2427db].frontContainer);
    var _0x27020b = Math.floor(Math.random() * 501 + -0xfa);
    var _0x41199d = Math.floor(Math.random() * 301 + -0x96);
    var _0x4a1b21 = Math.floor(Math.random() * 361 + 0x0);
    $.domino[_0x2427db].numbers = tiles_arr[_0x2427db].slice();
    $.domino[_0x2427db].dragging = false;
    $.domino[_0x2427db].tileIndex = _0x2427db;
    $.domino[_0x2427db].sameNumbers = false;
    $.domino[_0x2427db].moveX = 0x0;
    $.domino[_0x2427db].moveY = 0x0;
    $.domino[_0x2427db].rotationNum = 0x0;
    TweenMax.to($.domino[_0x2427db], gameSettings.tileDealSpeed, {
      'x': _0x27020b,
      'y': _0x41199d,
      'rotation': _0x4a1b21,
      'overwrite': true
    });
    if ($.domino[_0x2427db].numbers[0x0] == $.domino[_0x2427db].numbers[0x1]) {
      $.domino[_0x2427db].sameNumbers = true;
    }
    $.domino[_0x2427db].cursor = "pointer";
    $.domino[_0x2427db].addEventListener("click", function (_0x38d9dd) {
      var _0x5d1b7c = false;
      if (typeof initSocket == 'function' && multiplayerSettings.enable && socketData.online) {
        if (gameData.player == socketData.gameIndex) {
          _0x5d1b7c = true;
        }
      } else if (gameData.player == 0x0) {
        _0x5d1b7c = true;
      }
      if (_0x5d1b7c) {
        if (gameData.drawing) {
          if (typeof initSocket == 'function' && multiplayerSettings.enable && socketData.online) {
            postSocketUpdate("drawpile", _0x38d9dd.currentTarget.tileIndex);
          } else {
            getDrawPile(_0x38d9dd.currentTarget.tileIndex);
          }
        } else if (!gameSettings.dragToMove) {
          selectPlayerTile(_0x38d9dd.currentTarget.tileIndex);
        }
      }
    });
    if (gameSettings.dragToMove) {
      $.domino[_0x2427db].addEventListener("mousedown", function (_0x6d19c5) {
        toggleIconDragEvent(_0x6d19c5, "drag");
      });
      $.domino[_0x2427db].addEventListener("pressmove", function (_0x2522b6) {
        toggleIconDragEvent(_0x2522b6, "move");
      });
      $.domino[_0x2427db].addEventListener("pressup", function (_0x4df246) {
        toggleIconDragEvent(_0x4df246, 'drop');
      });
    }
    $.domino["shadow" + _0x2427db] = new createjs.Bitmap(loader.getResult("themeShadow" + gameData.themeIndex));
    centerReg($.domino["shadow" + _0x2427db]);
    $.domino[_0x2427db].shadow = $.domino["shadow" + _0x2427db];
    boardTileContainer.addChild($.domino["shadow" + _0x2427db], $.domino[_0x2427db]);
    gameData.tiles.push($.domino[_0x2427db]);
  }
  shuffle(gameData.tiles);
}
function preparePlayers() {

    // Lógica personalizada para modo CPU
    if (gameData.mode === "CPU") {
        if (!Array.isArray(gameData.names)) {
            gameData.names = [];
        }

        // Primer jugador (humano)
        gameData.names[0] = gameData.names[0] || "Jugador 1";

        // Segundo jugador fijo
        gameData.names[1] = "LA BANCA";
    }

    // Lógica general para completar nombres si faltan
    if (Array.isArray(gameData.names)) {
        for (let i = 0; i < gameData.names.length; i++) {
            gameData.names[i] = gameData.names[i] || `Jugador ${i + 1}`;
        }
    } else {
        gameData.names = [];
        for (let i = 0; i < gameData.players; i++) {
            gameData.names.push(`Jugador ${i + 1}`);
        }
    }

  boardPlayersContainer.removeAllChildren();
  var _0x332aa9 = 0x0;
  for (var _0x32993b = 0x0; _0x32993b < gameSettings.playerTotalTiles.length; _0x32993b++) {
    if (gameData.players == gameSettings.playerTotalTiles[_0x32993b].players) {
      _0x332aa9 = gameSettings.playerTotalTiles[_0x32993b].tiles;
    }
  }
  for (var _0x32993b = 0x0; _0x32993b < gameData.players; _0x32993b++) {
    $.players[_0x32993b] = new createjs.Container();
    $.players[_0x32993b].tiles = [];
    $.players[_0x32993b].score = 0x0;
    $.players[_0x32993b].playerIndex = _0x32993b;
    for (var _0x167a85 = 0x0; _0x167a85 < _0x332aa9; _0x167a85++) {
      var _0x8bc3ac = gameData.tiles[gameData.tilesIndex].tileIndex;
      $.players[_0x32993b].tiles.push(_0x8bc3ac);
      gameData.tilesIndex++;
    }
    $.players["stats" + _0x32993b] = new createjs.Container();
    var _0x30f9f1 = new createjs.Bitmap(loader.getResult("itemPlayerStats"));
    centerReg(_0x30f9f1);
    var _0x24f5a1 = new createjs.Bitmap(loader.getResult('itemPlayerStatsHighlight'));
    centerReg(_0x24f5a1);
    _0x24f5a1.visible = false;
    var _0x4ceeae = new createjs.Text();
    _0x4ceeae.font = "18px bpreplaybold";
    _0x4ceeae.color = "#fff";
    _0x4ceeae.textAlign = "center";
    _0x4ceeae.textBaseline = "alphabetic";
    // _0x4ceeae.text = textDisplay.playerName.replace("[NUMBER]", _0x32993b + 0x1);
    _0x4ceeae.text = gameData.names?.[_0x32993b] || `Jugador ${_0x32993b + 1}`;
    _0x4ceeae.y = 0x18;
    if (typeof initSocket == "function" && multiplayerSettings.enable && socketData.online) {
      _0x4ceeae.text = gameData.names[_0x32993b];
    }
    var _0x4df941 = new createjs.Text();
    _0x4df941.font = "22px bpreplaybold";
    _0x4df941.color = "#fff";
    _0x4df941.textAlign = "center";
    _0x4df941.textBaseline = "alphabetic";
    _0x4df941.text = textDisplay.playerScore.replace("[NUMBER]", playerData.scores[_0x32993b]);
    _0x4df941.y = -0x7;
    $.players["stats" + _0x32993b].playerStats = _0x30f9f1;
    $.players["stats" + _0x32993b].newPlayerStatsHighlight = _0x24f5a1;
    $.players["stats" + _0x32993b].playerName = _0x4ceeae;
    $.players['stats' + _0x32993b].playerScore = _0x4df941;
    $.players["stats" + _0x32993b].visible = false;
    $.players["stats" + _0x32993b].addChild(_0x30f9f1, _0x24f5a1, _0x4ceeae, _0x4df941);
    boardPlayersContainer.addChild($.players[_0x32993b], $.players["stats" + _0x32993b]);
  }
  for (var _0x32993b = gameData.tilesIndex; _0x32993b < gameData.tiles.length; _0x32993b++) {
    var _0x8bc3ac = gameData.tiles[_0x32993b].tileIndex;
    gameData.draw.push(_0x8bc3ac);
  }
  gameData.prepared = true;
  resizeGameLayout();
  TweenMax.to(boardContainer, 0.5, {
    'overwrite': true,
    'onComplete': function () {
      gameData.deal.status = true;
      gameData.deal.animation = true;
      checkPlayerTilesAnimation();
    }
  });
}
function resizeGameLayout() {
  if (curPage == "options") {
    if (viewport.isLandscape) {
      itemPlayerNumbers.x = canvasW / 0x2;
      itemPlayerNumbers.y = canvasH / 0x64 * 0x2d;
      totalPlayersTxt.x = itemPlayerNumbers.x;
      totalPlayersTxt.y = itemPlayerNumbers.y + 0xa;
      buttonPlayersL.x = canvasW / 0x2 - 0xc8;
      buttonPlayersR.x = canvasW / 0x2 + 0xc8;
      buttonPlayersL.y = buttonPlayersR.y = itemPlayerNumbers.y;
      themeContainer.x = canvasW / 0x2;
      themeContainer.y = canvasH / 0x64 * 0x38;
      buttonThemeL.x = canvasW / 0x2 - 0xc8;
      buttonThemeR.x = canvasW / 0x2 + 0xc8;
      buttonThemeL.y = buttonThemeR.y = themeContainer.y;
      if (typeof initSocket == 'function' && multiplayerSettings.enable && socketData.online) {
        if (itemPlayerNumbers.visible == false) {
          themeContainer.x = canvasW / 0x2;
          themeContainer.y = canvasH / 0x64 * 0x32;
          buttonThemeL.x = canvasW / 0x2 - 0xc8;
          buttonThemeR.x = canvasW / 0x2 + 0xc8;
          buttonThemeL.y = buttonThemeR.y = themeContainer.y;
        }
      }
    } else {
      itemPlayerNumbers.x = canvasW / 0x2;
      itemPlayerNumbers.y = canvasH / 0x64 * 0x2e;
      totalPlayersTxt.x = itemPlayerNumbers.x;
      totalPlayersTxt.y = itemPlayerNumbers.y + 0xa;
      buttonPlayersL.x = canvasW / 0x2 - 0xc8;
      buttonPlayersR.x = canvasW / 0x2 + 0xc8;
      buttonPlayersL.y = buttonPlayersR.y = itemPlayerNumbers.y;
      themeContainer.x = canvasW / 0x2;
      themeContainer.y = canvasH / 0x64 * 0x36;
      buttonThemeL.x = canvasW / 0x2 - 0xc8;
      buttonThemeR.x = canvasW / 0x2 + 0xc8;
      buttonThemeL.y = buttonThemeR.y = themeContainer.y;
      if (typeof initSocket == 'function' && multiplayerSettings.enable && socketData.online) {
        if (itemPlayerNumbers.visible == false) {
          themeContainer.x = canvasW / 0x2;
          themeContainer.y = canvasH / 0x64 * 0x32;
          buttonThemeL.x = canvasW / 0x2 - 0xc8;
          buttonThemeR.x = canvasW / 0x2 + 0xc8;
          buttonThemeL.y = buttonThemeR.y = themeContainer.y;
        }
      }
    }
  } else {
    if (curPage == "game") {
      statusContainer.x = boardScoreContainer.x = canvasW / 0x2;
      statusContainer.y = boardScoreContainer.y = canvasH / 0x2;
      drawTitleTxt.y = -(canvasH / 0x64 * 0x12);
      drawTitleTxt.font = "35px bpreplaybold";
      if (!viewport.isLandscape) {
        drawTitleTxt.font = "25px bpreplaybold";
        drawTitleTxt.y = -(canvasH / 0x64 * 0x13);
      }
      if (!gameData.prepared) {
        return;
      }
      var _0x1055ef = [{
        'x': canvasW / 0x2,
        'y': canvasH / 0x64 * 0x52,
        'horizontal': true,
        'dir': "bottom"
      }, {
        'x': canvasW / 0x2,
        'y': canvasH / 0x64 * 0x12,
        'horizontal': true,
        'dir': 'top'
      }, {
        'x': canvasW / 0x64 * 0xe,
        'y': canvasH / 0x2,
        'horizontal': false,
        'dir': "left"
      }, {
        'x': canvasW / 0x64 * 0x56,
        'y': canvasH / 0x2,
        'horizontal': false,
        'dir': 'right'
      }];
      if (!viewport.isLandscape) {
        _0x1055ef = [{
          'x': canvasW / 0x2,
          'y': canvasH / 0x64 * 0x54,
          'horizontal': true,
          'dir': "bottom"
        }, {
          'x': canvasW / 0x2,
          'y': canvasH / 0x64 * 0x10,
          'horizontal': true,
          'dir': 'top'
        }, {
          'x': canvasW / 0x64 * 0x11,
          'y': canvasH / 0x2,
          'horizontal': false,
          'dir': 'left'
        }, {
          'x': canvasW / 0x64 * 0x53,
          'y': canvasH / 0x2,
          'horizontal': false,
          'dir': 'right'
        }];
      }
      var _0x54bd31 = [];
      if (gameData.players == 0x2) {
        _0x54bd31 = [0x0, 0x1];
      } else {
        _0x54bd31 = [0x0, 0x2, 0x1, 0x3];
      }
      for (var _0x33c008 = 0x0; _0x33c008 < gameData.players; _0x33c008++) {
        var _0x14cde2 = gameData.seq[_0x33c008];
        $.players[_0x14cde2].x = _0x1055ef[_0x54bd31[_0x33c008]].x;
        $.players[_0x14cde2].y = _0x1055ef[_0x54bd31[_0x33c008]].y;
        $.players[_0x14cde2].dir = _0x1055ef[_0x54bd31[_0x33c008]].dir;
        $.players[_0x14cde2].horizontal = _0x1055ef[_0x54bd31[_0x33c008]].horizontal;
      }
      checkPlayerTilesAnimation();
    }
  }
}
function checkPlayerTilesAnimation() {
  if (gameData.deal.animation) {
    gameData.deal.count = 0x0;
    gameData.deal.total = 0x0;
    gameData.deal.delay = 0x0;
  }
  for (var _0x1d64f8 = 0x0; _0x1d64f8 < gameData.players; _0x1d64f8++) {
    positionPlayerTiles(_0x1d64f8, gameData.deal.status);
  }
  if (gameData.drawing) {
    toggleDrawPiles(true);
  }
}
function positionPlayerTiles(_0x5592a1, _0x343ea4) {
  var _0x443cd9 = $.players[_0x5592a1].horizontal;
  var _0x460831 = boardTileContainer.globalToLocal($.players[_0x5592a1].x, $.players[_0x5592a1].y);
  var _0x1945f2 = {
    'x': 0x0,
    'y': 0x0,
    'startX': 0x0,
    'startY': 0x0,
    'w': 0x0,
    'h': 0x0,
    'maxW': 0x1f4,
    'maxH': 0x1f4,
    'gap': 0x0,
    'tileW': gameData.tile.width,
    'tileH': gameData.tile.height,
    'tileSpace': gameSettings.tileSpace
  };
  if (!viewport.isLandscape) {
    _0x1945f2.maxW = 0x12c;
    _0x1945f2.maxH = 0x1f4;
  }
  if (_0x443cd9) {
    _0x1945f2.w = ($.players[_0x5592a1].tiles.length - 0x1) * _0x1945f2.tileH;
    _0x1945f2.w += ($.players[_0x5592a1].tiles.length - 0x1) * _0x1945f2.tileSpace;
    _0x1945f2.gap = _0x1945f2.tileW / 0x2 + _0x1945f2.tileSpace;
    if (_0x1945f2.w > _0x1945f2.maxW) {
      _0x1945f2.w = _0x1945f2.maxW;
      _0x1945f2.gap = _0x1945f2.maxW / ($.players[_0x5592a1].tiles.length - 0x1);
    }
    _0x1945f2.x = _0x1945f2.startX = _0x460831.x - _0x1945f2.w / 0x2;
    _0x1945f2.y = _0x1945f2.startY = _0x460831.y;
  } else {
    _0x1945f2.h = ($.players[_0x5592a1].tiles.length - 0x1) * _0x1945f2.tileH;
    _0x1945f2.h += ($.players[_0x5592a1].tiles.length - 0x1) * _0x1945f2.tileSpace;
    _0x1945f2.gap = _0x1945f2.tileW / 0x2 + _0x1945f2.tileSpace;
    if (_0x1945f2.h > _0x1945f2.maxH) {
      _0x1945f2.h = _0x1945f2.maxH;
      _0x1945f2.gap = _0x1945f2.maxH / ($.players[_0x5592a1].tiles.length - 0x1);
    }
    _0x1945f2.x = _0x1945f2.startX = _0x460831.x;
    _0x1945f2.y = _0x1945f2.startY = _0x460831.y - _0x1945f2.h / 0x2;
  }
  var _0x4f9d0e = 0x0;
  for (var _0x4a79db = 0x0; _0x4a79db < $.players[_0x5592a1].tiles.length; _0x4a79db++) {
    var _0x55bd2f = $.domino[$.players[_0x5592a1].tiles[_0x4a79db]];
    boardTileContainer.setChildIndex(_0x55bd2f.shadow, boardTileContainer.numChildren - 0x1);
    boardTileContainer.setChildIndex(_0x55bd2f, boardTileContainer.numChildren - 0x1);
    _0x55bd2f.oriX = _0x1945f2.x;
    _0x55bd2f.oriY = _0x1945f2.y;
    if (_0x443cd9) {
      var _0x2bd7f8 = 0x5a;
      _0x1945f2.x += _0x1945f2.gap;
    } else {
      var _0x2bd7f8 = 0x0;
      _0x1945f2.y += _0x1945f2.gap;
    }
    if (!_0x55bd2f.dragging && _0x343ea4) {
      if (gameData.deal.animation) {
        gameData.deal.total++;
        gameData.deal.delay += gameSettings.tileDealSpeed / 0x2;
        _0x4f9d0e = gameData.deal.delay;
      }
      _0x55bd2f.visible = true;
      var _0x51a873 = gameData.deal.animation == true ? gameSettings.tileDealSpeed : gameSettings.tileMoveSpeed;
      TweenMax.to(_0x55bd2f, _0x51a873, {
        'delay': _0x4f9d0e,
        'x': _0x55bd2f.oriX,
        'y': _0x55bd2f.oriY,
        'rotation': _0x2bd7f8,
        'scaleX': 0x1,
        'scaleY': 0x1,
        'overwrite': true,
        'onStart': function () {
          var _0x572eb3 = Math.floor(Math.random() * 0x3) + 0x1;
          playSound("soundDomino" + _0x572eb3);
        },
        'onComplete': dealAnimationComplete
      });
    }
  }
  _0x1945f2.x -= _0x1945f2.gap / 0x2;
  _0x1945f2.y -= _0x1945f2.gap / 0x2;
  var _0x329ea6 = 0x0;
  var _0x2baf43 = 0x0;
  if ($.players[_0x5592a1].tiles.length > 0x0 && _0x343ea4) {
    _0x329ea6 = _0x1945f2.x + $.players['stats' + _0x5592a1].playerStats.image.naturalWidth / 0x2;
    _0x2baf43 = _0x1945f2.y + $.players["stats" + _0x5592a1].playerStats.image.naturalHeight / 0x2;
  }
  if ($.players[_0x5592a1].dir == "bottom") {
    $.players["stats" + _0x5592a1].x = $.players[_0x5592a1].x + _0x329ea6;
    $.players["stats" + _0x5592a1].y = $.players[_0x5592a1].y;
  } else if ($.players[_0x5592a1].dir == "top") {
    $.players["stats" + _0x5592a1].x = $.players[_0x5592a1].x - _0x329ea6;
    $.players["stats" + _0x5592a1].y = $.players[_0x5592a1].y;
  } else {
    $.players["stats" + _0x5592a1].x = $.players[_0x5592a1].x;
    $.players["stats" + _0x5592a1].y = $.players[_0x5592a1].y + _0x2baf43;
  }
}
function dealAnimationComplete() {
  if (gameData.deal.animation) {
    gameData.deal.count++;
    if (gameData.deal.count == gameData.deal.total) {
      gameData.deal.animation = false;
      for (var _0x34379b = 0x0; _0x34379b < gameData.players; _0x34379b++) {
        $.players["stats" + _0x34379b].visible = true;
        var _0x2f0cd4 = false;
        if (typeof initSocket == "function" && multiplayerSettings.enable && socketData.online) {
          if (_0x34379b == socketData.gameIndex) {
            _0x2f0cd4 = true;
          }
        } else if (_0x34379b == 0x0) {
          _0x2f0cd4 = true;
        }
        if (_0x2f0cd4) {
          for (var _0x562326 = 0x0; _0x562326 < $.players[_0x34379b].tiles.length; _0x562326++) {
            $.domino[$.players[_0x34379b].tiles[_0x562326]].frontContainer.visible = true;
          }
        }
      }
      playSound("soundShuffleOut");
      for (var _0x34379b = 0x0; _0x34379b < gameData.draw.length; _0x34379b++) {
        hideTile($.domino[gameData.draw[_0x34379b]]);
      }
      displayPlayerTurn();
    }
  }
}
function hideTile(_0x378876) {
  TweenMax.to(_0x378876, gameSettings.tileDealSpeed, {
    'x': 0x0,
    'y': 0x0,
    'rotation': 0x0,
    'overwrite': true,
    'onComplete': function () {
      _0x378876.visible = false;
    }
  });
}
function checkpositionPlacedTiles() {
  gameData.mask = {
    'width': 0x2bc,
    'height': 0x12c,
    'scale': 0x1,
    'startX': 0x0,
    'startY': 0x0,
    'endX': 0x0,
    'endY': 0x0,
    'tileW': 0x0,
    'tileH': 0x0
  };
  if (!viewport.isLandscape) {
    gameData.mask.width = 0xfa;
    gameData.mask.height = 0x190;
  }
  for (var _0x3d9282 = 0x0; _0x3d9282 < 0x5; _0x3d9282++) {
    positionPlacedTiles(false);
    gameData.mask.tileW = gameData.mask.endX - gameData.mask.startX;
    gameData.mask.tileH = gameData.mask.endY - gameData.mask.startY;
    var _0xa35de0 = 0x1;
    var _0x398705 = 0x1;
    var _0x9a1d2b = 0x1;
    if (gameData.mask.tileW >= gameData.mask.width) {
      _0xa35de0 = gameData.mask.width / gameData.mask.tileW;
    }
    if (gameData.mask.tileH >= gameData.mask.height) {
      _0x398705 = gameData.mask.height / gameData.mask.tileH;
    }
    _0x9a1d2b = _0xa35de0 < _0x398705 ? _0xa35de0 : _0x398705;
    _0x9a1d2b = _0x9a1d2b.toFixed(0x1);
    if (gameData.mask.scale == _0x9a1d2b) {
      positionPlacedTiles(true);
      _0x3d9282 = 0x5;
    } else {
      gameData.mask.scale = _0x9a1d2b;
    }
  }
}
function positionPlacedTiles(_0x25106d) {
  var _0x434c7d = null;
  var _0x5d334c = null;
  var _0x5c4f01 = null;
  var _0x4b4c39 = null;
  var _0x482cbb = ['left', "top", "right", "top"];
  var _0x486d98 = 0x0;
  var _0x42870b = "left";
  var _0x2eb402 = ["right", 'bottom', "left", 'bottom'];
  var _0x391d1d = 0x0;
  var _0x34aaf0 = 'right';
  var _0x5a0ab3 = [gameData.tile.height * 0x5, gameData.tile.height / 0x4, gameData.tile.height * 0xa];
  var _0x27ac57 = 0x0;
  var _0x2b98a1 = 0x0;
  var _0x1da0d3 = [gameData.tile.height * 0x5, gameData.tile.height / 0x4, gameData.tile.height * 0xa];
  var _0x2ca1b9 = 0x0;
  var _0x5efa11 = 0x0;
  if (!viewport.isLandscape) {
    _0x5a0ab3 = [gameData.tile.height, gameData.tile.height, gameData.tile.height * 0x3];
    _0x1da0d3 = [gameData.tile.height, gameData.tile.height, gameData.tile.height * 0x3];
  }
  var _0x21b399 = gameData.mask.scale;
  for (var _0x11b441 = 0x0; _0x11b441 < gameData.placed.length; _0x11b441++) {
    var _0x575c37 = $.domino[gameData.placed[_0x11b441].tileIndex];
    _0x575c37.rotationNum = gameData.placed[_0x11b441].rotation;
    _0x575c37.visible = true;
    if (_0x11b441 == 0x0) {
      if (!_0x25106d) {
        _0x575c37.moveX = 0x0;
        _0x575c37.moveY = 0x0;
      } else {
        var _0x52e7ef = getCenterPosition(gameData.mask.startX, gameData.mask.startY, gameData.mask.endX, gameData.mask.endY);
        _0x575c37.moveX = -(_0x52e7ef.x * gameData.mask.scale);
        _0x575c37.moveY = -(_0x52e7ef.y * gameData.mask.scale);
      }
      ;
      _0x434c7d = _0x575c37;
      _0x575c37.nextDir = '';
    } else {
      if (gameData.placed[_0x11b441].dir == "left") {
        _0x4b4c39 = _0x5d334c == null ? _0x434c7d : _0x5d334c;
        var _0x561913 = _0x4b4c39.sameNumbers == true ? gameData.tile.height / 0x2 + gameSettings.tilePlacedSpace : gameData.tile.width / 0x2 + gameSettings.tilePlacedSpace;
        var _0x4f817e = 0x0;
        var _0x1ef1bf = _0x575c37.sameNumbers == true ? gameData.tile.height / 0x2 + gameSettings.tilePlacedSpace : gameData.tile.width / 0x2 + gameSettings.tilePlacedSpace;
        var _0x183c82 = 0x0;
        if (_0x482cbb[_0x486d98] == "left") {
          if (_0x42870b == 'top') {
            _0x561913 = _0x4b4c39.sameNumbers == true ? gameData.tile.width / 0x2 + gameSettings.tilePlacedSpace : gameData.tile.height / 0x2 + gameSettings.tilePlacedSpace;
            _0x4f817e = _0x4b4c39.sameNumbers == true ? 0x0 : gameData.tile.height / 0x2 + gameSettings.tilePlacedSpace;
            if (_0x4b4c39.sameNumbers) {
              _0x561913 -= gameData.tile.width / 0x2 + gameSettings.tilePlacedSpace;
              _0x4f817e = gameData.tile.height + gameSettings.tilePlacedSpace;
            }
          }
          _0x575c37.moveX = _0x4b4c39.moveX - (_0x561913 + _0x1ef1bf) * _0x21b399;
          _0x575c37.moveY = _0x4b4c39.moveY - _0x4f817e * _0x21b399;
          _0x2b98a1 += _0x561913 + _0x1ef1bf;
        } else {
          if (_0x482cbb[_0x486d98] == "top") {
            if (_0x42870b == 'left') {
              _0x561913 = _0x4b4c39.sameNumbers == true ? 0x0 : -(gameData.tile.height / 0x2);
              _0x4f817e = _0x4b4c39.sameNumbers == true ? gameData.tile.width / 0x2 + gameSettings.tilePlacedSpace : gameData.tile.height / 0x2 + gameSettings.tilePlacedSpace;
            } else if (_0x42870b == "right") {
              _0x561913 = _0x4b4c39.sameNumbers == true ? 0x0 : gameData.tile.height / 0x2;
              _0x4f817e = _0x4b4c39.sameNumbers == true ? gameData.tile.width / 0x2 + gameSettings.tilePlacedSpace : gameData.tile.height / 0x2 + gameSettings.tilePlacedSpace;
            } else {
              _0x561913 = 0x0;
              _0x4f817e = _0x4b4c39.sameNumbers == true ? gameData.tile.height / 0x2 + gameSettings.tilePlacedSpace : gameData.tile.width / 0x2 + gameSettings.tilePlacedSpace;
            }
            _0x183c82 = _0x575c37.sameNumbers == true ? gameData.tile.height / 0x2 + gameSettings.tilePlacedSpace : gameData.tile.width / 0x2 + gameSettings.tilePlacedSpace;
            _0x575c37.moveX = _0x4b4c39.moveX + _0x561913 * _0x21b399;
            _0x575c37.moveY = _0x4b4c39.moveY - (_0x4f817e + _0x183c82) * _0x21b399;
            _0x575c37.rotationNum += 0x5a;
            _0x2b98a1 += _0x561913 + _0x1ef1bf;
          } else if (_0x482cbb[_0x486d98] == "right") {
            if (_0x42870b == "top") {
              _0x561913 = _0x4b4c39.sameNumbers == true ? gameData.tile.width / 0x2 + gameSettings.tilePlacedSpace : gameData.tile.height / 0x2 + gameSettings.tilePlacedSpace;
              _0x4f817e = _0x4b4c39.sameNumbers == true ? 0x0 : gameData.tile.height / 0x2;
            }
            _0x575c37.moveX = _0x4b4c39.moveX + (_0x561913 + _0x1ef1bf) * _0x21b399;
            _0x575c37.moveY = _0x4b4c39.moveY - _0x4f817e * _0x21b399;
            _0x575c37.rotationNum += 0xb4;
            _0x2b98a1 += _0x561913 + _0x1ef1bf;
          }
        }
        _0x42870b = _0x482cbb[_0x486d98];
        if (_0x2b98a1 >= _0x5a0ab3[_0x27ac57]) {
          _0x2b98a1 = 0x0;
          _0x27ac57++;
          _0x27ac57 = _0x27ac57 > _0x5a0ab3.length - 0x1 ? 0x1 : _0x27ac57;
          _0x486d98++;
          _0x486d98 = _0x486d98 > _0x482cbb.length - 0x1 ? 0x0 : _0x486d98;
        }
        _0x5d334c = _0x575c37;
        _0x575c37.nextDir = _0x482cbb[_0x486d98];
      } else {
        if (gameData.placed[_0x11b441].dir == "right") {
          _0x4b4c39 = _0x5c4f01 == null ? _0x434c7d : _0x5c4f01;
          var _0x561913 = _0x4b4c39.sameNumbers == true ? gameData.tile.height / 0x2 + gameSettings.tilePlacedSpace : gameData.tile.width / 0x2 + gameSettings.tilePlacedSpace;
          var _0x4f817e = 0x0;
          var _0x1ef1bf = _0x575c37.sameNumbers == true ? gameData.tile.height / 0x2 + gameSettings.tilePlacedSpace : gameData.tile.width / 0x2 + gameSettings.tilePlacedSpace;
          var _0x183c82 = 0x0;
          if (_0x2eb402[_0x391d1d] == "right") {
            if (_0x34aaf0 == 'bottom') {
              _0x561913 = _0x4b4c39.sameNumbers == true ? gameData.tile.width / 0x2 + gameSettings.tilePlacedSpace : gameData.tile.height / 0x2 + gameSettings.tilePlacedSpace;
              _0x4f817e = _0x4b4c39.sameNumbers == true ? 0x0 : gameData.tile.height / 0x2 + gameSettings.tilePlacedSpace;
              if (_0x4b4c39.sameNumbers) {
                _0x561913 -= gameData.tile.width / 0x2 + gameSettings.tilePlacedSpace;
                _0x4f817e = gameData.tile.height + gameSettings.tilePlacedSpace;
              }
            }
            _0x575c37.moveX = _0x4b4c39.moveX + (_0x561913 + _0x1ef1bf) * _0x21b399;
            _0x575c37.moveY = _0x4b4c39.moveY + _0x4f817e * _0x21b399;
            _0x5efa11 += _0x561913 + _0x1ef1bf;
          } else {
            if (_0x2eb402[_0x391d1d] == "bottom") {
              if (_0x34aaf0 == 'right') {
                _0x561913 = _0x4b4c39.sameNumbers == true ? 0x0 : -(gameData.tile.height / 0x2);
                _0x4f817e = _0x4b4c39.sameNumbers == true ? gameData.tile.width / 0x2 + gameSettings.tilePlacedSpace : gameData.tile.height / 0x2 + gameSettings.tilePlacedSpace;
              } else if (_0x34aaf0 == "left") {
                _0x561913 = _0x4b4c39.sameNumbers == true ? 0x0 : gameData.tile.height / 0x2;
                _0x4f817e = _0x4b4c39.sameNumbers == true ? gameData.tile.width / 0x2 + gameSettings.tilePlacedSpace : gameData.tile.height / 0x2 + gameSettings.tilePlacedSpace;
              } else {
                _0x561913 = 0x0;
                _0x4f817e = _0x4b4c39.sameNumbers == true ? gameData.tile.height / 0x2 + gameSettings.tilePlacedSpace : gameData.tile.width / 0x2 + gameSettings.tilePlacedSpace;
              }
              _0x183c82 = _0x575c37.sameNumbers == true ? gameData.tile.height / 0x2 + gameSettings.tilePlacedSpace : gameData.tile.width / 0x2 + gameSettings.tilePlacedSpace;
              _0x575c37.moveX = _0x4b4c39.moveX - _0x561913 * _0x21b399;
              _0x575c37.moveY = _0x4b4c39.moveY + (_0x4f817e + _0x183c82) * _0x21b399;
              _0x575c37.rotationNum += 0x5a;
              _0x5efa11 += _0x561913 + _0x1ef1bf;
            } else if (_0x2eb402[_0x391d1d] == "left") {
              if (_0x34aaf0 == "bottom") {
                _0x561913 = _0x4b4c39.sameNumbers == true ? gameData.tile.width / 0x2 + gameSettings.tilePlacedSpace : gameData.tile.height / 0x2 + gameSettings.tilePlacedSpace;
                _0x4f817e = _0x4b4c39.sameNumbers == true ? 0x0 : gameData.tile.height / 0x2;
              }
              _0x575c37.moveX = _0x4b4c39.moveX - (_0x561913 + _0x1ef1bf) * _0x21b399;
              _0x575c37.moveY = _0x4b4c39.moveY + _0x4f817e * _0x21b399;
              _0x575c37.rotationNum += 0xb4;
              _0x5efa11 += _0x561913 + _0x1ef1bf;
            }
          }
          _0x34aaf0 = _0x2eb402[_0x391d1d];
          if (_0x5efa11 >= _0x1da0d3[_0x2ca1b9]) {
            _0x5efa11 = 0x0;
            _0x2ca1b9++;
            _0x2ca1b9 = _0x2ca1b9 > _0x1da0d3.length - 0x1 ? 0x1 : _0x2ca1b9;
            _0x391d1d++;
            _0x391d1d = _0x391d1d > _0x2eb402.length - 0x1 ? 0x0 : _0x391d1d;
          }
          _0x5c4f01 = _0x575c37;
          _0x575c37.nextDir = _0x2eb402[_0x391d1d];
        }
      }
    }
    var _0x4b4bdf = _0x575c37.moveX;
    var _0x4a29a2 = _0x575c37.moveX;
    var _0x54eac3 = _0x575c37.moveY;
    var _0x356f28 = _0x575c37.moveY;
    gameData.mask.startX = _0x4b4bdf < gameData.mask.startX ? _0x4b4bdf : gameData.mask.startX;
    gameData.mask.endX = _0x4a29a2 > gameData.mask.endX ? _0x4a29a2 : gameData.mask.endX;
    gameData.mask.startY = _0x54eac3 < gameData.mask.startY ? _0x54eac3 : gameData.mask.startY;
    gameData.mask.endY = _0x356f28 > gameData.mask.endY ? _0x356f28 : gameData.mask.endY;
    if (_0x25106d) {
      TweenMax.to(_0x575c37, gameSettings.tileMoveSpeed, {
        'x': _0x575c37.moveX,
        'y': _0x575c37.moveY,
        'rotation': _0x575c37.rotationNum,
        'scaleX': _0x21b399,
        'scaleY': _0x21b399,
        'overwrite': true
      });
    }
  }
}
function connectTiles(_0x586a4d, _0x46fa47, _0x1945dc) {
  var _0x3d7bfd = -0x1;
  var _0x1234fd = -0x1;
  var _0x41067a = _0x1945dc == "left" ? "right" : "left";
  if (_0x1945dc == "none") {
    _0x41067a = _0x1945dc;
  }
  if (_0x41067a == "right") {
    if (_0x46fa47.rotationNum == 0x0) {
      _0x3d7bfd = 0x0;
    } else {
      _0x3d7bfd = 0x1;
    }
  } else if (_0x41067a == "left") {
    if (_0x46fa47.rotationNum == 0x0) {
      _0x3d7bfd = 0x1;
    } else {
      _0x3d7bfd = 0x0;
    }
  }
  if (_0x1945dc == "none") {
    if (_0x586a4d.sameNumbers) {
      _0x586a4d.rotationNum = 0x5a;
    } else {
      _0x586a4d.rotationNum = 0x0;
    }
  } else {
    if (_0x1945dc == 'left') {
      if (_0x46fa47.numbers.length == 0x1) {
        if (_0x586a4d.numbers[0x1] == _0x46fa47.numbers[0x0]) {
          _0x1234fd = 0x1;
          _0x586a4d.rotationNum = 0x0;
        } else if (_0x586a4d.numbers[0x0] == _0x46fa47.numbers[0x0]) {
          _0x1234fd = 0x0;
          _0x586a4d.rotationNum = 0xb4;
        }
      } else {
        if (_0x586a4d.numbers[0x1] == _0x46fa47.numbers[_0x3d7bfd]) {
          _0x1234fd = 0x1;
          _0x586a4d.rotationNum = 0x0;
        } else if (_0x586a4d.numbers[0x0] == _0x46fa47.numbers[_0x3d7bfd]) {
          _0x1234fd = 0x0;
          _0x586a4d.rotationNum = 0xb4;
        }
      }
      if (_0x586a4d.sameNumbers) {
        _0x586a4d.rotationNum = 0x5a;
      }
      _0x586a4d.numbers.splice(_0x1234fd, 0x1);
      _0x46fa47.numbers.splice(_0x3d7bfd, 0x1);
    } else {
      if (_0x1945dc == 'right') {
        if (_0x46fa47.numbers.length == 0x1) {
          if (_0x586a4d.numbers[0x1] == _0x46fa47.numbers[0x0]) {
            _0x1234fd = 0x1;
            _0x586a4d.rotationNum = 0xb4;
          } else if (_0x586a4d.numbers[0x0] == _0x46fa47.numbers[0x0]) {
            _0x1234fd = 0x0;
            _0x586a4d.rotationNum = 0x0;
          }
        } else {
          if (_0x586a4d.numbers[0x1] == _0x46fa47.numbers[_0x3d7bfd]) {
            _0x1234fd = 0x1;
            _0x586a4d.rotationNum = 0xb4;
          } else if (_0x586a4d.numbers[0x0] == _0x46fa47.numbers[_0x3d7bfd]) {
            _0x1234fd = 0x0;
            _0x586a4d.rotationNum = 0x0;
          }
        }
        if (_0x586a4d.sameNumbers) {
          _0x586a4d.rotationNum = 0x5a;
        }
        _0x586a4d.numbers.splice(_0x1234fd, 0x1);
        _0x46fa47.numbers.splice(_0x3d7bfd, 0x1);
      }
    }
  }
}
function toggleDrawPiles(_0x456254) {
  if (_0x456254) {
    gameData.drawing = true;
    boardTileContainer.addChild(boardDrawContainer);
    itemDrawBg.visible = true;
    itemDrawBgP.visible = false;
    var _0x34f573 = {
      'startX': 0x0,
      'startY': 0x0,
      'x': 0x0,
      'y': 0x0,
      'width': 0x0,
      'height': 0x0,
      'maxColumn': 0x7,
      'spaceX': 0x0,
      'spaceY': 0x0
    };
    var _0x330219 = gameData.draw.length / _0x34f573.maxColumn;
    _0x330219 = Number.isInteger(_0x330219) ? _0x330219 : Math.floor(_0x330219 + 0x1);
    if (!viewport.isLandscape) {
      _0x34f573.maxColumn = 0x5;
      itemDrawBg.visible = false;
      itemDrawBgP.visible = true;
    }
    _0x34f573.spaceX = gameData.tile.height + gameSettings.tileSpace;
    _0x34f573.spaceY = gameData.tile.width + gameSettings.tileSpace;
    _0x34f573.width = (_0x34f573.maxColumn - 0x1) * gameData.tile.height;
    _0x34f573.width += (_0x34f573.maxColumn - 0x1) * gameSettings.tileSpace;
    _0x34f573.height = (_0x330219 - 0x1) * gameData.tile.width;
    _0x34f573.height += (_0x330219 - 0x1) * gameSettings.tileSpace;
    _0x34f573.startX = -(_0x34f573.width / 0x2);
    _0x34f573.startY = -(_0x34f573.height / 0x2);
    _0x34f573.x = _0x34f573.startX;
    _0x34f573.y = _0x34f573.startY;
    var _0x1b615d = 0x0;
    for (var _0x160644 = 0x0; _0x160644 < gameData.draw.length; _0x160644++) {
      var _0x381cb4 = $.domino[gameData.draw[_0x160644]];
      boardTileContainer.setChildIndex(_0x381cb4.shadow, boardTileContainer.numChildren - 0x1);
      boardTileContainer.setChildIndex(_0x381cb4, boardTileContainer.numChildren - 0x1);
      killAnimateBlink(_0x381cb4.highlight);
      if (typeof initSocket == "function" && multiplayerSettings.enable && socketData.online) {
        if (gameData.player == socketData.gameIndex) {
          animateBlink(_0x381cb4.highlight);
        }
      } else if (gameData.player == 0x0) {
        animateBlink(_0x381cb4.highlight);
      }
      _0x381cb4.rotation = 0x5a;
      _0x381cb4.visible = true;
      _0x381cb4.x = _0x34f573.x;
      _0x381cb4.y = _0x34f573.y;
      _0x34f573.x += _0x34f573.spaceX;
      _0x1b615d++;
      if (_0x1b615d >= _0x34f573.maxColumn) {
        _0x1b615d = 0x0;
        _0x34f573.x = _0x34f573.startX;
        _0x34f573.y += _0x34f573.spaceY;
      }
    }
  } else {
    gameData.drawing = false;
    boardTileContainer.removeChild(boardDrawContainer);
    for (var _0x160644 = 0x0; _0x160644 < gameData.draw.length; _0x160644++) {
      var _0x381cb4 = $.domino[gameData.draw[_0x160644]];
      _0x381cb4.visible = false;
    }
  }
}
function getDrawPile(_0xdc0ef5) {
  var _0x25858a = $.domino[_0xdc0ef5];
  killAnimateBlink(_0x25858a.highlight);
  if (typeof initSocket == "function" && multiplayerSettings.enable && socketData.online) {
    if ($.players[gameData.player].playerIndex == socketData.gameIndex) {
      _0x25858a.frontContainer.visible = true;
    }
  } else if ($.players[gameData.player].playerIndex == 0x0) {
    _0x25858a.frontContainer.visible = true;
  }
  var _0x11531f = gameData.draw.indexOf(_0xdc0ef5);
  gameData.draw.splice(_0x11531f, 0x1);
  $.players[gameData.player].tiles.push(_0xdc0ef5);
  positionPlayerTiles(gameData.player, true);
  var _0xaba980 = checkPossibleMove(gameData.player);
  if (_0xaba980.length != 0x0) {
    toggleDrawPiles(false);
    displayPlayerTurn();
  } else if (gameData.draw.length == 0x0) {
    toggleDrawPiles(false);
    showGameStatus('cantmove');
  } else {
    tryFirstMove();
  }
}
function toggleIconDragEvent(_0xa22d19, _0x397e37) {
  if (gameData.drawing) {
    return;
  }
  if (!_0xa22d19.currentTarget.highlight.visible) {
    return;
  }
  switch (_0x397e37) {
    case "drag":
      var _0x37829a = boardTileContainer.localToGlobal(_0xa22d19.currentTarget.x, _0xa22d19.currentTarget.y);
      _0xa22d19.currentTarget.offset = {
        'x': _0x37829a.x - _0xa22d19.stageX,
        'y': _0x37829a.y - _0xa22d19.stageY
      };
      _0xa22d19.currentTarget.dragging = true;
      boardTileContainer.setChildIndex(_0xa22d19.currentTarget.shadow, boardTileContainer.numChildren - 0x1);
      boardTileContainer.setChildIndex(_0xa22d19.currentTarget, boardTileContainer.numChildren - 0x1);
      highlightPlacelable(_0xa22d19.currentTarget.numbers);
      break;
    case 'move':
      if (_0xa22d19.currentTarget.dragging) {
        var _0x3e5385 = boardTileContainer.globalToLocal(_0xa22d19.stageX, _0xa22d19.stageY);
        var _0x149ae3 = _0x3e5385.x + _0xa22d19.currentTarget.offset.x;
        var _0x15e734 = _0x3e5385.y + _0xa22d19.currentTarget.offset.y;
        _0xa22d19.currentTarget.x = _0x149ae3;
        _0xa22d19.currentTarget.y = _0x15e734;
      }
      break;
    case "drop":
      if (_0xa22d19.currentTarget.dragging) {
        _0xa22d19.currentTarget.dragging = false;
        var _0x3ea058 = false;
        var _0x5ea51e = {
          'tileIndex': -0x1,
          'dir': ''
        };
        if (gameData.placed.length == 0x0 || gameData.highlight.length == 0x1) {
          if ($.players[gameData.player].dir == 'bottom') {
            if (_0xa22d19.currentTarget.y < _0xa22d19.currentTarget.oriY) {
              _0x3ea058 = true;
            }
          } else {
            if ($.players[gameData.player].dir == 'top') {
              if (_0xa22d19.currentTarget.y > _0xa22d19.currentTarget.oriY) {
                _0x3ea058 = true;
              }
            } else {
              if ($.players[gameData.player].dir == "left") {
                if (_0xa22d19.currentTarget.x > _0xa22d19.currentTarget.oriX) {
                  _0x3ea058 = true;
                }
              } else if ($.players[gameData.player].dir == "right") {
                if (_0xa22d19.currentTarget.x < _0xa22d19.currentTarget.oriX) {
                  _0x3ea058 = true;
                }
              }
            }
          }
          if (gameData.highlight.length > 0x0 && _0x3ea058) {
            _0x5ea51e = gameData.highlight[0x0];
          }
        } else {
          for (var _0x186c53 = 0x0; _0x186c53 < gameData.highlight.length; _0x186c53++) {
            var _0x5ea51e = gameData.highlight[_0x186c53];
            var _0x320a36 = getDistance(_0xa22d19.currentTarget.x, _0xa22d19.currentTarget.y, _0x5ea51e.x, _0x5ea51e.y);
            if (_0x320a36 <= gameData.tile.width) {
              _0x5ea51e = gameData.highlight[_0x186c53];
              _0x3ea058 = true;
              _0x186c53 = gameData.highlight.length;
            }
          }
        }
        if (_0x3ea058) {
          playerMove(_0xa22d19.currentTarget.tileIndex, _0x5ea51e.tileIndex, _0x5ea51e.dir);
        } else {
          positionPlayerTiles(gameData.player, true);
        }
        highlightPlacelable();
      }
      break;
  }
}
function selectPlayerTile(_0xb9adf9) {
  if (gameData.drawing) {
    return;
  }
  if (!$.domino[_0xb9adf9].highlight.visible) {
    return;
  }
  var _0x25f429 = $.domino[_0xb9adf9];
  var _0x48959e = _0x25f429.oriY;
  if (gameData.placed.length == 0x0) {
    playerMove($.domino[_0xb9adf9].tileIndex);
  } else {
    playSound('soundDominoPick');
    if (gameData.tileSelected == _0xb9adf9) {
      gameData.tileSelected = -0x1;
      highlightPlacelable();
    } else {
      if (gameData.tileSelected != _0xb9adf9 && gameData.tileSelected != -0x1) {
        var _0x38caf6 = $.domino[gameData.tileSelected];
        TweenMax.to(_0x38caf6, gameSettings.tileMoveSpeed / 0x2, {
          'y': _0x38caf6.oriY,
          'overwrite': true
        });
        highlightPlacelable();
      }
      gameData.tileSelected = _0xb9adf9;
      boardTileContainer.setChildIndex(_0x25f429.shadow, boardTileContainer.numChildren - 0x1);
      boardTileContainer.setChildIndex(_0x25f429, boardTileContainer.numChildren - 0x1);
      highlightPlacelable(_0x25f429.numbers);
      _0x48959e -= gameData.tile.height;
    }
    TweenMax.to(_0x25f429, gameSettings.tileMoveSpeed / 0x2, {
      'y': _0x48959e,
      'overwrite': true
    });
  }
}
function playerMove(_0x9ac312, _0x1b84c7, _0x4ac7d1) {
  if (typeof initSocket == "function" && multiplayerSettings.enable && socketData.online) {
    if (gameData.player == socketData.gameIndex) {
      postSocketUpdate("playermove", {
        'tileIndex': _0x9ac312,
        'highlightTileIndex': _0x1b84c7,
        'dir': _0x4ac7d1
      });
    }
  } else {
    placeTitle(_0x9ac312, _0x1b84c7, _0x4ac7d1);
  }
}
function placeTitle(_0x152018, _0x8e77ad, _0x431817) {
  var _0x385c18 = Math.floor(Math.random() * 0x3) + 0x1;
  playSound("soundDomino" + _0x385c18);
  highlightTitles([]);
  var _0x24c3bf = $.domino[_0x152018];
  boardTileContainer.setChildIndex(_0x24c3bf.shadow, boardTileContainer.numChildren - 0x1);
  boardTileContainer.setChildIndex(_0x24c3bf, boardTileContainer.numChildren - 0x1);
  _0x24c3bf.frontContainer.visible = true;
  if (gameData.placed.length == 0x0) {
    connectTiles(_0x24c3bf, '', "none");
    gameData.placed.push({
      'tileIndex': _0x152018,
      'dir': '',
      'rotation': _0x24c3bf.rotationNum
    });
  } else {
    connectTiles(_0x24c3bf, $.domino[_0x8e77ad], _0x431817);
    gameData.placed.push({
      'tileIndex': _0x152018,
      'dir': _0x431817,
      'rotation': _0x24c3bf.rotationNum
    });
  }
  gameData.leftTile = null;
  gameData.rightTile = null;
  for (var _0x4af10a = 0x0; _0x4af10a < 0x2; _0x4af10a++) {
    for (var _0x27ebc3 = gameData.placed.length - 0x1; _0x27ebc3 > 0x0; _0x27ebc3--) {
      if (_0x4af10a == 0x0 && gameData.placed[_0x27ebc3].dir == "left") {
        gameData.leftTile = $.domino[gameData.placed[_0x27ebc3].tileIndex];
        _0x27ebc3 = -0x1;
      } else if (_0x4af10a == 0x1 && gameData.placed[_0x27ebc3].dir == 'right') {
        gameData.rightTile = $.domino[gameData.placed[_0x27ebc3].tileIndex];
        _0x27ebc3 = -0x1;
      }
    }
    if (_0x4af10a == 0x0 && gameData.leftTile == null) {
      gameData.leftTile = $.domino[gameData.placed[0x0].tileIndex];
    } else if (_0x4af10a == 0x1 && gameData.rightTile == null) {
      gameData.rightTile = $.domino[gameData.placed[0x0].tileIndex];
    }
  }
  for (var _0x4af10a = 0x0; _0x4af10a < $.players[gameData.player].tiles.length; _0x4af10a++) {
    if ($.players[gameData.player].tiles[_0x4af10a] == _0x152018) {
      $.players[gameData.player].tiles.splice(_0x4af10a, 0x1);
    }
  }
  gameData.nextCount = 0x0;
  checkpositionPlacedTiles();
  positionPlayerTiles(gameData.player, true);
  checkRoundEnd();
}
function checkRoundEnd() {
  if ($.players[gameData.player].tiles.length == 0x0) {
    highlightPlayer(false);
    showGameStatus("domino");
  } else {
    nextPlayerTurn();
  }
}
function displayPlayerTurn() {
  var _0x1c3c9d = checkPossibleMove(gameData.player);
  highlightTitles(_0x1c3c9d);
  highlightPlayer(true);
  gameData.tileSelected = -0x1;
  if (_0x1c3c9d.length > 0x0) {
    if (gameData.placed.length == 0x0) {
      showGameStatus("first");
    }
    tryFirstMove(_0x1c3c9d);
  } else if (gameData.domino.draw) {
    if (gameData.draw.length > 0x0) {
      showGameStatus('nomove');
    } else {
      showGameStatus("cantmove");
    }
  } else {
    showGameStatus("block");
  }
}
function checkPossibleMove(_0x1b42c1) {
  var _0x1591ec = [];
  if (gameData.placed.length == 0x0) {
    var _0x303d0c = [];
    var _0x29597e = [];
    for (var _0x5f9f7e = 0x0; _0x5f9f7e < gameData.players; _0x5f9f7e++) {
      for (var _0x5c90ee = 0x0; _0x5c90ee < $.players[_0x5f9f7e].tiles.length; _0x5c90ee++) {
        var _0x506be1 = $.domino[$.players[_0x5f9f7e].tiles[_0x5c90ee]];
        if (_0x506be1.sameNumbers) {
          var _0x1d51ad = _0x506be1.numbers[0x0];
          _0x303d0c.push({
            'total': _0x1d51ad,
            'player': _0x5f9f7e,
            'tile': _0x506be1
          });
        } else {
          var _0x1d51ad = _0x506be1.numbers[0x0] + _0x506be1.numbers[0x1];
          _0x29597e.push({
            'total': _0x1d51ad,
            'player': _0x5f9f7e,
            'tile': _0x506be1
          });
        }
      }
    }
    sortOnObject(_0x303d0c, "total", true);
    sortOnObject(_0x29597e, "total", true);
    if (_0x303d0c.length > 0x0) {
      gameData.player = _0x303d0c[0x0].player;
      _0x1591ec.push(_0x303d0c[0x0].tile);
    } else {
      gameData.player = _0x29597e[0x0].player;
      for (var _0x5f9f7e = 0x0; _0x5f9f7e < $.players[gameData.player].tiles.length; _0x5f9f7e++) {
        _0x1591ec.push($.domino[$.players[gameData.player].tiles[_0x5f9f7e]]);
      }
    }
  } else {
    if (gameData.placed.length == 0x1) {
      var _0x52914b = $.domino[gameData.placed[0x0].tileIndex];
      for (var _0x5f9f7e = 0x0; _0x5f9f7e < $.players[_0x1b42c1].tiles.length; _0x5f9f7e++) {
        var _0x506be1 = $.domino[$.players[_0x1b42c1].tiles[_0x5f9f7e]];
        for (var _0x49dbf9 = 0x0; _0x49dbf9 < _0x52914b.numbers.length; _0x49dbf9++) {
          if (_0x506be1.numbers.indexOf(_0x52914b.numbers[_0x49dbf9]) != -0x1) {
            _0x1591ec.push(_0x506be1);
          }
        }
      }
    } else {
      var _0x5e5c0a = gameData.leftTile;
      var _0x34d231 = gameData.rightTile;
      for (var _0x5f9f7e = 0x0; _0x5f9f7e < $.players[_0x1b42c1].tiles.length; _0x5f9f7e++) {
        var _0x506be1 = $.domino[$.players[_0x1b42c1].tiles[_0x5f9f7e]];
        for (var _0x49dbf9 = 0x0; _0x49dbf9 < _0x5e5c0a.numbers.length; _0x49dbf9++) {
          if (_0x506be1.numbers.indexOf(_0x5e5c0a.numbers[_0x49dbf9]) != -0x1) {
            _0x1591ec.push(_0x506be1);
          }
        }
        for (var _0x49dbf9 = 0x0; _0x49dbf9 < _0x34d231.numbers.length; _0x49dbf9++) {
          if (_0x506be1.numbers.indexOf(_0x34d231.numbers[_0x49dbf9]) != -0x1) {
            _0x1591ec.push(_0x506be1);
          }
        }
      }
    }
  }
  return _0x1591ec;
}
function highlightPlayer(_0x3b034f) {
  for (var _0x598000 = 0x0; _0x598000 < gameData.players; _0x598000++) {
    TweenMax.killTweensOf($.players["stats" + _0x598000].newPlayerStatsHighlight);
    $.players["stats" + _0x598000].newPlayerStatsHighlight.visible = false;
  }
  if (_0x3b034f) {
    aniamtePlayerFocus($.players["stats" + gameData.player]);
    animateBlink($.players["stats" + gameData.player].newPlayerStatsHighlight);
  }
}
function aniamtePlayerFocus(_0x9d2f58) {
  TweenMax.to(_0x9d2f58, 0.2, {
    'delay': 0.5,
    'scaleX': 1.3,
    'scaleY': 1.3,
    'ease': Sine.easeIn,
    'overwrite': true,
    'onComplete': function () {
      TweenMax.to(_0x9d2f58, 0.2, {
        'scaleX': 0x1,
        'scaleY': 0x1,
        'ease': Sine.easeOut,
        'overwrite': true
      });
    }
  });
}
function animateBlink(_0x58053, _0x216a95) {
  var _0x3aa2f9 = _0x216a95 == undefined ? 0.5 : _0x216a95;
  _0x58053.visible = true;
  _0x58053.alpha = _0x3aa2f9;
  TweenMax.to(_0x58053, 0.3, {
    'alpha': 0x1,
    'overwrite': true,
    'onComplete': function () {
      TweenMax.to(_0x58053, 0.3, {
        'alpha': _0x3aa2f9,
        'overwrite': true,
        'onComplete': animateBlink,
        'onCompleteParams': [_0x58053, _0x216a95]
      });
    }
  });
}
function killAnimateBlink(_0x2610c6) {
  _0x2610c6.visible = false;
  TweenMax.killTweensOf(_0x2610c6);
}
function nextPlayerTurn() {
  gameData.player++;
  gameData.player = gameData.player > gameData.players - 0x1 ? 0x0 : gameData.player;
  var _0x23974f = false;
  for (var _0x28bfc5 = 0x0; _0x28bfc5 < gameData.players; _0x28bfc5++) {
    var _0x3d746f = checkPossibleMove(_0x28bfc5);
    if (_0x3d746f.length > 0x0) {
      _0x23974f = true;
    }
  }
  var _0xc2825d = true;
  if (gameData.domino.draw) {
    if (_0x23974f) {
      _0xc2825d = false;
    } else if (gameData.draw.length > 0x0) {
      _0xc2825d = false;
    }
  } else if (_0x23974f) {
    _0xc2825d = false;
  }
  gameData.complete = _0xc2825d;
  if (typeof initSocket == "function" && multiplayerSettings.enable && socketData.online) {
    postSocketUpdate("movecomplete", socketData.gameIndex);
  } else {
    checkGameEnd();
  }
}

function checkGameEnd() {
  if (gameData.complete) {
    highlightPlayer(false);
    showGameStatus("roundend");
  } else {
    displayPlayerTurn();
  }
}

function tryFirstMove(_0x66399c) {
  if (gameData.ai && $.players[gameData.player].playerIndex != 0x0) {
    highlightTitles([]);
    var _0x57744a = gameData.drawing == true ? gameSettings.aiDrawSpeed : gameSettings.aiThinkSpeed;
    TweenMax.to(boardContainer, _0x57744a, {
      'overwrite': true,
      'onComplete': function () {
        if (gameData.drawing) {
          var _0x21db2a = Math.floor(Math.random() * gameData.draw.length);
          getDrawPile($.domino[gameData.draw[_0x21db2a]].tileIndex);
        } else {
          var _0x5bcbd4 = [];
          var _0x3199ea = [];
          for (var _0x2b90da = 0x0; _0x2b90da < _0x66399c.length; _0x2b90da++) {
            var _0x54f86e = _0x66399c[_0x2b90da];
            if (_0x54f86e.sameNumbers) {
              var _0x6dd58b = _0x54f86e.numbers[0x0];
              _0x5bcbd4.push({
                'total': _0x6dd58b,
                'tile': _0x54f86e
              });
            } else {
              var _0x6dd58b = _0x54f86e.numbers[0x0] + _0x54f86e.numbers[0x1];
              _0x3199ea.push({
                'total': _0x6dd58b,
                'tile': _0x54f86e
              });
            }
          }
          sortOnObject(_0x5bcbd4, "total", true);
          sortOnObject(_0x3199ea, 'total', true);
          var _0x54f86e;
          if (_0x5bcbd4.length > 0x0) {
            var _0x21db2a = Math.floor(Math.random() * _0x5bcbd4.length);
            _0x54f86e = _0x5bcbd4[_0x21db2a].tile;
          } else {
            var _0x21db2a = Math.floor(Math.random() * _0x3199ea.length);
            _0x54f86e = _0x3199ea[_0x21db2a].tile;
          }
          highlightPlacelable(_0x54f86e.numbers);
          if (gameData.highlight.length > 0x0) {
            var _0xc55d96 = Math.floor(Math.random() * gameData.highlight.length);
            placeTitle(_0x54f86e.tileIndex, gameData.highlight[_0xc55d96].tileIndex, gameData.highlight[_0xc55d96].dir);
          } else {
            placeTitle(_0x54f86e.tileIndex, '', 'none');
          }
          highlightPlacelable();
        }
      }
    });
  } else {
    if (gameSettings.autoMove && !gameData.drawing) {
      var _0xae335d = false;
      if (typeof initSocket == "function" && multiplayerSettings.enable && socketData.online) {
        if ($.players[gameData.player].playerIndex == socketData.gameIndex) {
          _0xae335d = true;
        }
      } else if ($.players[gameData.player].playerIndex == 0x0) {
        _0xae335d = true;
      }
      if (_0xae335d) {
        TweenMax.to(boardContainer, 0.5, {
          'overwrite': true,
          'onComplete': function () {
            var _0x6ddcc0 = checkPossibleMove(gameData.player);
            if (gameData.placed.length == 0x0) {
              if (_0x6ddcc0.length == 0x1) {
                playerMove(_0x6ddcc0[0x0].tileIndex);
                highlightPlacelable();
              }
            } else {
              highlightPlacelable(_0x6ddcc0[0x0].numbers);
              if (_0x6ddcc0.length == 0x1 && gameData.highlight.length == 0x1) {
                playerMove(_0x6ddcc0[0x0].tileIndex, gameData.highlight[0x0].tileIndex, gameData.highlight[0x0].dir);
              }
              highlightPlacelable();
            }
          }
        });
      }
    }
  }
}
function highlightTitles(_0x1115ad) {
  for (var _0x359d2b = 0x0; _0x359d2b < gameData.tiles.length; _0x359d2b++) {
    killAnimateBlink($.domino[_0x359d2b].highlight);
  }
  if (typeof initSocket == 'function' && multiplayerSettings.enable && socketData.online) {
    if (gameData.player != socketData.gameIndex) {
      return;
    }
  }
  for (var _0x359d2b = 0x0; _0x359d2b < _0x1115ad.length; _0x359d2b++) {
    animateBlink(_0x1115ad[_0x359d2b].highlight);
  }
}
function highlightPlacelable(_0xf4cb4c) {
  var _0xf4cb4c = _0xf4cb4c == undefined ? [] : _0xf4cb4c;
  gameData.highlight = [];
  boardHighlightContainer.removeAllChildren();
  if (gameData.placed.length != 0x0) {
    var _0x3a7b88 = gameData.leftTile.rotationNum == 0x0 ? gameData.leftTile.numbers[0x0] : gameData.leftTile.numbers[0x1];
    var _0x3f76ce = gameData.rightTile.rotationNum == 0x0 ? gameData.rightTile.numbers[0x1] : gameData.leftTile.numbers[0x0];
    if (gameData.leftTile.numbers.length == 0x1) {
      _0x3a7b88 = gameData.leftTile.numbers[0x0];
    }
    if (gameData.rightTile.numbers.length == 0x1) {
      _0x3f76ce = gameData.rightTile.numbers[0x0];
    }
    var _0x1fbb7d = 0x2;
    if (_0xf4cb4c.length == 0x2) {
      if (_0xf4cb4c[0x0] == _0xf4cb4c[0x1]) {
        _0x1fbb7d = 0x1;
      }
    }
    for (var _0x180a04 = 0x0; _0x180a04 < _0xf4cb4c.length; _0x180a04++) {
      if (_0xf4cb4c[_0x180a04] == _0x3a7b88 && _0x1fbb7d > 0x0) {
        createHighlight(gameData.leftTile, "left");
        _0x1fbb7d--;
      }
      if (_0xf4cb4c[_0x180a04] == _0x3f76ce && _0x1fbb7d > 0x0) {
        createHighlight(gameData.rightTile, "right");
        _0x1fbb7d--;
      }
    }
  }
}
function createHighlight(_0xf53ef0, _0x3dfca2) {
  var _0x45013e = new createjs.Bitmap(loader.getResult("itemTileHighlight"));
  centerReg(_0x45013e);
  createHitarea(_0x45013e);
  _0x45013e.scaleX = _0x45013e.scaleY = gameData.mask.scale;
  var _0xfd632a = _0x45013e.image.naturalWidth;
  var _0x5b0c5b = gameData.tile.width;
  var _0x25d256;
  _0x5b0c5b = gameData.tile.width / 0x2 + _0xfd632a / 0x2;
  if (_0xf53ef0.rotationNum == 0x5a || _0xf53ef0.rotationNum == 0x10e) {
    _0x5b0c5b = gameData.tile.height / 0x2 + _0xfd632a / 0x2;
  }
  if (_0xf53ef0.nextDir == '') {
    _0x5b0c5b = _0x5b0c5b * gameData.mask.scale;
    if (_0x3dfca2 == "left") {
      _0x25d256 = getAnglePosition(_0xf53ef0.x, _0xf53ef0.y, _0x5b0c5b, 0xb4);
    } else {
      _0x25d256 = getAnglePosition(_0xf53ef0.x, _0xf53ef0.y, _0x5b0c5b, 0x0);
    }
  } else {
    if (_0xf53ef0.nextDir == "top" || _0xf53ef0.nextDir == "bottom") {
      _0x5b0c5b = gameData.tile.height / 0x2 + _0xfd632a / 0x2;
      if (_0xf53ef0.rotationNum == 0x5a || _0xf53ef0.rotationNum == 0x10e) {
        _0x5b0c5b = gameData.tile.width / 0x2 + _0xfd632a / 0x2;
      }
    }
    _0x5b0c5b = _0x5b0c5b * gameData.mask.scale;
    if (_0xf53ef0.nextDir == "right") {
      _0x25d256 = getAnglePosition(_0xf53ef0.x, _0xf53ef0.y, _0x5b0c5b, 0x0);
    } else {
      if (_0xf53ef0.nextDir == 'left') {
        _0x25d256 = getAnglePosition(_0xf53ef0.x, _0xf53ef0.y, _0x5b0c5b, 0xb4);
      } else {
        if (_0xf53ef0.nextDir == "top") {
          _0x25d256 = getAnglePosition(_0xf53ef0.x, _0xf53ef0.y, _0x5b0c5b, 0x10e);
        } else if (_0xf53ef0.nextDir == "bottom") {
          _0x25d256 = getAnglePosition(_0xf53ef0.x, _0xf53ef0.y, _0x5b0c5b, 0x5a);
        }
      }
    }
  }
  _0x45013e.x = _0x25d256.x;
  _0x45013e.y = _0x25d256.y;
  _0x45013e.tileIndex = _0xf53ef0.tileIndex;
  _0x45013e.dir = _0x3dfca2;
  if (!gameSettings.dragToMove) {
    _0x45013e.cursor = 'pointer';
    _0x45013e.addEventListener("click", function (_0x241ef2) {
      playerMove($.domino[gameData.tileSelected].tileIndex, _0x241ef2.target.tileIndex, _0x241ef2.target.dir);
      highlightPlacelable();
    });
  }
  animateBlink(_0x45013e);
  boardHighlightContainer.addChild(_0x45013e);
  gameData.highlight.push(_0x45013e);
}
function updateGame() {
  if (!gameData.paused) {
    for (var _0x18b661 = 0x0; _0x18b661 < gameData.tiles.length; _0x18b661++) {
      var _0x3c2922 = gameData.tiles[_0x18b661];
      _0x3c2922.shadow.x = _0x3c2922.x + gameSettings.tileShadowSpace;
      _0x3c2922.shadow.y = _0x3c2922.y + gameSettings.tileShadowSpace;
      _0x3c2922.shadow.scaleX = _0x3c2922.scaleX;
      _0x3c2922.shadow.scaleY = _0x3c2922.scaleY;
      _0x3c2922.shadow.rotation = _0x3c2922.rotation;
      _0x3c2922.shadow.visible = _0x3c2922.visible;
    }
  }
}
function showGameStatus(_0x4a3074) {
  var _0x5e2956 = 0x0;
  var _0x48e3db = 'soundAlert';
  statusPlayerTxt.text = $.players['stats' + gameData.player].playerName.text;
  if (_0x4a3074 == "first") {
    statusTxt.text = textDisplay.highestToStart;
  } else {
    if (_0x4a3074 == 'nomove') {
      statusTxt.text = textDisplay.playerNoMove;
      if (typeof initSocket == "function" && multiplayerSettings.enable && socketData.online) {
        if ($.players[gameData.player].playerIndex == socketData.gameIndex) {
          drawTitleTxt.text = textDisplay.userPickDomino;
        } else {
          drawTitleTxt.text = textDisplay.playerPickDomino.replace('[NAME]', $.players["stats" + gameData.player].playerName.text);
        }
      } else if ($.players[gameData.player].playerIndex == 0x0) {
        drawTitleTxt.text = textDisplay.userPickDomino;
      } else {
        drawTitleTxt.text = textDisplay.playerPickDomino.replace("[NAME]", $.players["stats" + gameData.player].playerName.text);
      }
      _0x5e2956 = 0x1;
      TweenMax.to(boardContainer, 0x3, {
        'overwrite': true,
        'onComplete': function () {
          toggleDrawPiles(true);
          tryFirstMove();
        }
      });
    } else {
      if (_0x4a3074 == "cantmove") {
        _0x5e2956 = 0x1;
        statusTxt.text = textDisplay.playerCantMove;
        TweenMax.to(boardContainer, 0x3, {
          'overwrite': true,
          'onComplete': function () {
            nextPlayerTurn();
          }
        });
      } else {
        if (_0x4a3074 == "block") {
          _0x5e2956 = 0x1;
          statusTxt.text = textDisplay.playerBlocked;
          TweenMax.to(boardContainer, 0x3, {
            'overwrite': true,
            'onComplete': function () {
              nextPlayerTurn();
            }
          });
        } else {
          if (_0x4a3074 == "domino") {
            _0x48e3db = "soundWinner";
            _0x5e2956 = 0x1;
            statusTxt.text = textDisplay.playerDomino;
            TweenMax.to(boardContainer, 0x3, {
              'overwrite': true,
              'onComplete': function () {
                toggleRoundScore(true, true);
              }
            });
          } else if (_0x4a3074 == "roundend") {
            _0x48e3db = "soundRound";
            _0x5e2956 = 0x1;
            statusTxt.text = textDisplay.playerNoMove;
            statusPlayerTxt.text = textDisplay.roundEnd;
            TweenMax.to(boardContainer, 0x3, {
              'overwrite': true,
              'onComplete': function () {
                toggleRoundScore(true, false);
              }
            });
          }
        }
      }
    }
  }
  statusContainer.alpha = 0x0;
  TweenMax.to(statusContainer, 0.5, {
    'delay': _0x5e2956,
    'alpha': 0x1,
    'overwrite': true,
    'onStart': function () {
      playSound(_0x48e3db);
    },
    'onComplete': function () {
      TweenMax.to(statusContainer, 0.5, {
        'delay': 0x1,
        'alpha': 0x0,
        'overwrite': true
      });
    }
  });
}
function toggleRoundScore(_0x4fe4bb, _0x110d18) {
  boardScoreListContainer.removeAllChildren();
  boardScoreContainer.visible = _0x4fe4bb;
  if (_0x4fe4bb) {
    playSound("soundPoint");
    var _0x1e60dd = 0x0;
    var _0x53bb17 = [];
    var _0xfcfbf8 = false;
    for (var _0x38c093 = 0x0; _0x38c093 < gameData.players; _0x38c093++) {
      var _0x147e77 = 0x0;
      for (var _0x354f46 = 0x0; _0x354f46 < $.players[_0x38c093].tiles.length; _0x354f46++) {
        var _0x3e533b = $.domino[$.players[_0x38c093].tiles[_0x354f46]];
        _0x3e533b.frontContainer.visible = true;
        var _0x56398 = _0x3e533b.numbers[0x0] + _0x3e533b.numbers[0x1];
        _0x147e77 += _0x56398;
      }
      if (_0x110d18) {
        _0x1e60dd += _0x147e77;
      } else {
        _0x53bb17.push({
          'total': _0x147e77,
          'player': _0x38c093
        });
      }
    }
    if (!_0x110d18) {
      sortOnObject(_0x53bb17, "total", false);
      gameData.player = _0x53bb17[0x0].player;
      _0x1e60dd = 0x0;
      for (var _0x38c093 = 0x1; _0x38c093 < _0x53bb17.length; _0x38c093++) {
        _0x1e60dd += _0x53bb17[_0x38c093].total;
      }
    }
    if (typeof initSocket == 'function' && multiplayerSettings.enable && socketData.online) {
      if (_0x110d18 && $.players[gameData.player].playerIndex == socketData.gameIndex) {
        roundStatusTxt.text = textDisplay.playerRoundWin;
      } else {
        roundStatusTxt.text = textDisplay.playerRoundLose;
      }
    } else if (_0x110d18 && $.players[gameData.player].playerIndex == 0x0) {
      roundStatusTxt.text = textDisplay.playerRoundWin;
    } else {
      roundStatusTxt.text = textDisplay.playerRoundLose;
    }
    var _0x548c6f = {
      'startY': 0x32,
      'x': -0x96,
      'y': 0x0,
      'spaceY': 0x2d,
      'scoreX': 0x12c,
      'titleSpace': 0x32
    };
    _0x548c6f.y = _0x548c6f.startY - (gameData.players - 0x1) * _0x548c6f.spaceY;
    _0x548c6f.y -= _0x548c6f.titleSpace;
    itemScoreTop.y = _0x548c6f.y - _0x548c6f.spaceY;
    var _0x24bee6 = new createjs.Text();
    _0x24bee6.font = "25px bpreplaybold";
    _0x24bee6.color = "#fff";
    _0x24bee6.textAlign = "center";
    _0x24bee6.textBaseline = "alphabetic";
    _0x24bee6.text = textDisplay.goalPointTitle.replace('[NUMBER]', gameSettings.points[gameData.pointIndex]);
    _0x24bee6.y = _0x548c6f.y;
    var _0x13fde7 = new createjs.Bitmap(loader.getResult('itemScoreDivide'));
    centerReg(_0x13fde7);
    _0x13fde7.y = _0x548c6f.y + 0xf;
    _0x548c6f.y += _0x548c6f.titleSpace;
    boardScoreListContainer.addChild(_0x24bee6, _0x13fde7);
    var _0x54533b = null;
    var _0x5b297f = 0x0;
    for (var _0x38c093 = 0x0; _0x38c093 < gameData.players; _0x38c093++) {
      var _0x55138e = new createjs.Text();
      _0x55138e.font = "25px bpreplaybold";
      _0x55138e.color = "#fff";
      _0x55138e.textAlign = "left";
      _0x55138e.textBaseline = 'alphabetic';
      _0x55138e.text = $.players["stats" + _0x38c093].playerName.text;
      var _0x3904b7 = new createjs.Text();
      _0x3904b7.font = "25px bpreplaybold";
      _0x3904b7.color = "#fff";
      _0x3904b7.textAlign = 'right';
      _0x3904b7.textBaseline = "alphabetic";
      _0x3904b7.text = textDisplay.playerScore.replace('[NUMBER]', playerData.scores[_0x38c093]);
      if (_0x38c093 == gameData.player) {
        tweenData.tweenScore = playerData.scores[_0x38c093];
        _0x54533b = _0x3904b7;
        playerData.scores[_0x38c093] += _0x1e60dd;
        _0x55138e.text = _0x55138e.text + textDisplay.playerScoreAdd.replace("[NUMBER]", _0x1e60dd);
        _0x5b297f = playerData.scores[_0x38c093];
        if (typeof initSocket == 'function' && multiplayerSettings.enable && socketData.online) {
          if ($.players[gameData.player].playerIndex == socketData.gameIndex) {
            roundStatusTxt.text = textDisplay.playerRoundWin;
          }
        } else if ($.players[gameData.player].playerIndex == 0x0) {
          roundStatusTxt.text = textDisplay.playerRoundWin;
        }
        if (playerData.scores[_0x38c093] >= gameData.domino.point) {
          if ($.players[gameData.player].playerIndex == 0x0) {
            roundStatusTxt.text = textDisplay.userWin;
          } else {
            roundStatusTxt.text = textDisplay.playerWin.replace("[NAME]", $.players["stats" + _0x38c093].playerName.text);
          }
          _0xfcfbf8 = true;
        }
        if (_0xfcfbf8) {
          console.log(gameData.player);
          const winnerIndex = gameData.player;
          const winnerName = $.players["stats" + winnerIndex].playerName.text;
          sendGameResultToParent(winnerIndex, winnerName);
        }
        _0x55138e.color = _0x3904b7.color = "#FFFF00";
        animateBlink(_0x55138e, 0.6);
        animateBlink(_0x3904b7, 0.6);
      }
      var _0x2d3e8d = new createjs.Bitmap(loader.getResult('itemScoreDivide'));
      centerReg(_0x2d3e8d);
      _0x55138e.x = _0x548c6f.x;
      _0x55138e.y = _0x548c6f.y;
      _0x3904b7.x = _0x548c6f.x + _0x548c6f.scoreX;
      _0x3904b7.y = _0x548c6f.y;
      _0x2d3e8d.y = _0x548c6f.y + _0x548c6f.spaceY / 0x4;
      _0x2d3e8d.visible = !(_0x38c093 == gameData.players - 0x1);
      _0x548c6f.y += _0x548c6f.spaceY;
      boardScoreListContainer.addChild(_0x55138e, _0x3904b7, _0x2d3e8d);
      $.players["stats" + _0x38c093].playerScore.text = textDisplay.playerScore.replace('[NUMBER]', playerData.scores[_0x38c093]);
    }
    if (_0x54533b != null) {
      TweenMax.to(tweenData, 0.5, {
        'delay': 0x1,
        'tweenScore': _0x5b297f,
        'overwrite': true,
        'onUpdate': function () {
          _0x54533b.text = textDisplay.playerScore.replace('[NUMBER]', Math.round(tweenData.tweenScore));
        }
      });
    }
    boardScoreContainer.alpha = 0x0;
    TweenMax.to(boardScoreContainer, 0.5, {
      'alpha': 0x1,
      'overwrite': true,
      'onComplete': function () {
        TweenMax.to(boardScoreContainer, 0x4, {
          'overwrite': true,
          'onComplete': function () {
            if (_0xfcfbf8) {
              endGame();
            } else {
              TweenMax.to(boardScoreContainer, 0.5, {
                'alpha': 0x0,
                'overwrite': true,
                'onComplete': function () {
                  playSound("soundShuffleOut");
                  for (var _0x411874 = 0x0; _0x411874 < gameData.tiles.length; _0x411874++) {
                    var _0x354ee0 = gameData.tiles[_0x411874];
                    _0x354ee0.frontContainer.visible = false;
                    TweenMax.to(_0x354ee0, gameSettings.tileDealSpeed, {
                      'x': 0x0,
                      'y': 0x0,
                      'rotation': 0x0,
                      'scaleX': 0x1,
                      'scaleY': 0x1,
                      'overwrite': true
                    });
                  }
                  for (var _0x411874 = 0x0; _0x411874 < gameData.players; _0x411874++) {
                    $.players["stats" + _0x411874].visible = false;
                  }
                  TweenMax.to(boardScoreContainer, 0.5, {
                    'alpha': 0x0,
                    'overwrite': true,
                    'onComplete': function () {
                      if (typeof initSocket == "function" && multiplayerSettings.enable && socketData.online) {
                        postSocketUpdate("resultcomplete", socketData.gameIndex);
                      } else {
                        startDomino();
                      }
                    }
                  });
                }
              });
            }
          }
        });
      }
    });
  }
}
function endGame() {
  gameData.paused = true;
  TweenMax.to(gameContainer, 0x1, {
    'overwrite': true,
    'onComplete': function () {
      goPage("result");
    }
  });
}

// ⬇️ ⬇️ AÑADE AQUÍ LA FUNCIÓN GLOBAL
function sendGameResultToParent(winnerIndex, winnerName) {
  try {
    const userIds = window.gameData.userIds || [];
    const currentUserId = window.gameData.userId;
    const winnerUserId = userIds[winnerIndex] || null;
    const isWinner = winnerUserId === currentUserId;
    

    const resultPayload = {
      userId: winnerUserId,
      mesaId: window.gameData.mesaId,
      apuesta: window.gameData.apuesta,
      result: isWinner ? 'gano' : 'perdio',
      winnerName: winnerName || 'Desconocido',
      timestamp: new Date().toISOString()
    };

    window.parent.postMessage({
      type: 'GAME_RESULT',
      data: resultPayload
    }, '*');

    console.log("📤 Resultado enviado al parent:", resultPayload);
  } catch (error) {
    console.error("❌ Error al enviar resultado al parent:", error);
  }
}

function millisecondsToTimeGame(_0x2e0684) {
  var _0x3b5ea6 = Math.floor(_0x2e0684 / 0x3e8 % 0x3c);
  var _0x43b744 = Math.floor(_0x2e0684 / 60000 % 0x3c);
  if (_0x3b5ea6 < 0xa) {
    _0x3b5ea6 = '0' + _0x3b5ea6;
  }
  if (_0x43b744 < 0xa) {
    _0x43b744 = '0' + _0x43b744;
  }
  return _0x43b744 + ':' + _0x3b5ea6;
}
function toggleOption() {
  if (optionsContainer.visible) {
    optionsContainer.visible = false;
  } else {
    optionsContainer.visible = true;
  }
}
function toggleSoundMute(_0x8c96d6) {
  buttonSoundOff.visible = false;
  buttonSoundOn.visible = false;
  toggleSoundInMute(_0x8c96d6);
  if (_0x8c96d6) {
    buttonSoundOn.visible = true;
  } else {
    buttonSoundOff.visible = true;
  }
}
function toggleMusicMute(_0x8b132c) {
  buttonMusicOff.visible = false;
  buttonMusicOn.visible = false;
  toggleMusicInMute(_0x8b132c);
  if (_0x8b132c) {
    buttonMusicOn.visible = true;
  } else {
    buttonMusicOff.visible = true;
  }
}
function toggleFullScreen() {
  if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      } else {
        if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
      }
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else {
      if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else {
        if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      }
    }
  }
}
function share(_0x3f47f9) {
  gtag('event', "click", {
    'event_category': "share",
    'event_label': _0x3f47f9
  });
  var _0x4a3bdc = location.href;
  _0x4a3bdc = _0x4a3bdc.substring(0x0, _0x4a3bdc.lastIndexOf('/') + 0x1);
  var _0x16fe66 = '';
  var _0x3f4ae5 = '';
  _0x16fe66 = "Highscore on Play Dominoes is [SCORE]PTS".replace("[SCORE]", playerData.score);
  _0x3f4ae5 = "[SCORE]PTS is mine new highscore on Play Dominoes game! Try it now!".replace("[SCORE]", playerData.score);
  var _0x932d5b = '';
  if (_0x3f47f9 == "twitter") {
    _0x932d5b = "https://twitter.com/intent/tweet?url=" + _0x4a3bdc + "&text=" + _0x3f4ae5;
  } else {
    if (_0x3f47f9 == "facebook") {
      _0x932d5b = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(_0x4a3bdc + "share.php?desc=" + _0x3f4ae5 + "&title=" + _0x16fe66 + "&url=" + _0x4a3bdc + "&thumb=" + _0x4a3bdc + "share.jpg&width=590&height=300");
    } else {
      if (_0x3f47f9 == "google") {
        _0x932d5b = "https://plus.google.com/share?url=" + _0x4a3bdc;
      } else if (_0x3f47f9 == "whatsapp") {
        _0x932d5b = 'whatsapp://send?text=' + encodeURIComponent(_0x3f4ae5) + " - " + encodeURIComponent(_0x4a3bdc);
      }
    }
  }
  window.open(_0x932d5b);
}
var stageW = 0x500;
var stageH = 0x300;
var contentW = 0x400;
var contentH = 0x240;
var viewport = {
  'isLandscape': true
};
var landscapeSize = {
  'w': stageW,
  'h': stageH,
  'cW': contentW,
  'cH': contentH
};
var portraitSize = {
  'w': 0x300,
  'h': 0x400,
  'cW': 0x240,
  'cH': 0x384
};
function initMain() {
  if (!$.browser.mobile || !isTablet) {
    $("#canvasHolder").show();
  }
  initGameCanvas(stageW, stageH);
  buildGameCanvas();
  buildGameButton();
  if (typeof buildScoreBoardCanvas == 'function') {
    buildScoreBoardCanvas();
  }
  goPage("main");
  if (typeof initSocket == "function" && multiplayerSettings.enable) {
    initSocket("playdominoes");
  }
  checkMobileOrientation();
  resizeCanvas();
}
var windowW = windowH = 0x0;
var scalePercent = 0x0;
var offset = {
  'x': 0x0,
  'y': 0x0,
  'left': 0x0,
  'top': 0x0
};
function resizeGameFunc() {
  setTimeout(function () {
    $('.mobileRotate').css('left', checkContentWidth($(".mobileRotate")));
    $(".mobileRotate").css("top", checkContentHeight($(".mobileRotate")));
    windowW = window.innerWidth;
    windowH = window.innerHeight;
    scalePercent = windowW / contentW;
    if (contentH * scalePercent > windowH) {
      scalePercent = windowH / contentH;
    }
    scalePercent = scalePercent > 0x1 ? 0x1 : scalePercent;
    if (windowW > stageW && windowH > stageH) {
      if (windowW > stageW) {
        scalePercent = windowW / stageW;
        if (stageH * scalePercent > windowH) {
          scalePercent = windowH / stageH;
        }
      }
    }
    var _0x13fe22 = stageW * scalePercent;
    var _0x317b17 = stageH * scalePercent;
    offset.left = 0x0;
    offset.top = 0x0;
    if (_0x13fe22 > windowW) {
      offset.left = -(_0x13fe22 - windowW);
    } else {
      offset.left = windowW - _0x13fe22;
    }
    if (_0x317b17 > windowH) {
      offset.top = -(_0x317b17 - windowH);
    } else {
      offset.top = windowH - _0x317b17;
    }
    offset.x = 0x0;
    offset.y = 0x0;
    if (offset.left < 0x0) {
      offset.x = Math.abs(offset.left / scalePercent / 0x2);
    }
    if (offset.top < 0x0) {
      offset.y = Math.abs(offset.top / scalePercent / 0x2);
    }
    $("canvas").css("width", _0x13fe22);
    $("canvas").css("height", _0x317b17);
    $("canvas").css('left', offset.left / 0x2);
    $("canvas").css("top", offset.top / 0x2);
    if (typeof initSocket == 'function' && multiplayerSettings.enable) {
      $(".resizeFont").each(function (_0x20d76a, _0x30efe5) {
        $(this).css("font-size", Math.round(Number($(this).attr("data-fontsize")) * scalePercent));
      });
      $('#roomWrapper').css("width", _0x13fe22);
      $('#roomWrapper').css("height", _0x317b17);
      $("#roomWrapper").css("left", offset.left / 0x2);
      $("#roomWrapper").css('top', offset.top / 0x2);
      $('#notificationHolder').css('width', _0x13fe22);
      $("#notificationHolder").css("height", _0x317b17);
      $("#notificationHolder").css("left", offset.left / 0x2);
      $('#notificationHolder').css("top", offset.top / 0x2);
    }
    $(window).scrollTop(0x0);
    resizeCanvas();
    if (typeof resizeScore == "function") {
      resizeScore();
    }
  }, 0x64);
}
var resizeTimer;
function checkMobileEvent() {
  if ($.browser.mobile || isTablet) {
    $(window).off("orientationchange").on("orientationchange", function (_0xa53c64) {
      $("#canvasHolder").hide();
      $("#rotateHolder").hide();
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkMobileOrientation, 0x3e8);
    });
    checkMobileOrientation();
  }
}
function checkMobileOrientation() {
  var _0x54654c = false;
  if (window.innerWidth > window.innerHeight) {
    _0x54654c = true;
  }
  if ($.editor.enable) {
    viewport.isLandscape = true;
  } else {
    viewport.isLandscape = _0x54654c;
  }
  changeViewport(viewport.isLandscape);
  resizeGameFunc();
  $("#canvasHolder").show();
}
function toggleRotate(_0x44df86) {
  if (_0x44df86) {
    $("#rotateHolder").fadeIn();
  } else {
    $("#rotateHolder").fadeOut();
  }
  resizeGameFunc();
}
function initPreload() {
  toggleLoader(true);
  checkMobileEvent();
  $(window).resize(function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(checkMobileOrientation, 0x3e8);
  });
  resizeGameFunc();
  loader = new createjs.LoadQueue(false);
  manifest = [{
    'src': "assets/background.png",
    'id': "background"
  }, {
    'src': "assets/background_p.png",
    'id': "backgroundP"
  }, {
    'src': "assets/logo.png",
    'id': "logo"
  }, {
    'src': "assets/logo_p.png",
    'id': "logoP"
  }, {
    'src': "assets/button_play.png",
    'id': "buttonPlay"
  }, {
    'src': "assets/button_start.png",
    'id': "buttonStart"
  }, {
    'src': "assets/button_next.png",
    'id': "buttonNext"
  }, {
    'src': "assets/button_online.png",
    'id': "buttonOnline"
  }, {
    'src': 'assets/button_local.png',
    'id': 'buttonLocal'
  }, {
    'src': "assets/button_arrow_left.png",
    'id': "buttonArrowLeft"
  }, {
    'src': 'assets/button_arrow_right.png',
    'id': "buttonArrowRight"
  }, {
    'src': "assets/button_plus.png",
    'id': "buttonPlus"
  }, {
    'src': "assets/button_minus.png",
    'id': "buttonMinus"
  }, {
    'src': "assets/item_number.png",
    'id': "itemNumber"
  }, {
    'src': "assets/item_player_stats.png",
    'id': "itemPlayerStats"
  }, {
    'src': "assets/item_player_stats_highlight.png",
    'id': 'itemPlayerStatsHighlight'
  }, {
    'src': 'assets/item_status.png',
    'id': "itemStatus"
  }, {
    'src': "assets/item_draw_bg.png",
    'id': 'itemDrawBg'
  }, {
    'src': 'assets/item_draw_bg_p.png',
    'id': 'itemDrawBgP'
  }, {
    'src': "assets/item_tile_highlight.png",
    'id': 'itemTileHighlight'
  }, {
    'src': "assets/item_score.png",
    'id': "itemScore"
  }, {
    'src': 'assets/item_score_top.png',
    'id': "itemScoreTop"
  }, {
    'src': "assets/item_score_divide.png",
    'id': "itemScoreDivide"
  }, {
    'src': "assets/button_facebook.png",
    'id': "buttonFacebook"
  }, {
    'src': "assets/button_twitter.png",
    'id': "buttonTwitter"
  }, {
    'src': "assets/button_whatsapp.png",
    'id': "buttonWhatsapp"
  }, {
    'src': 'assets/button_continue.png',
    'id': "buttonContinue"
  }, {
    'src': 'assets/item_pop.png',
    'id': "itemPop"
  }, {
    'src': 'assets/item_pop_p.png',
    'id': "itemPopP"
  }, {
    'src': "assets/button_confirm.png",
    'id': "buttonConfirm"
  }, {
    'src': 'assets/button_cancel.png',
    'id': "buttonCancel"
  }, {
    'src': 'assets/button_fullscreen.png',
    'id': "buttonFullscreen"
  }, {
    'src': "assets/button_sound_on.png",
    'id': "buttonSoundOn"
  }, {
    'src': "assets/button_sound_off.png",
    'id': "buttonSoundOff"
  }, {
    'src': "assets/button_music_on.png",
    'id': "buttonMusicOn"
  }, {
    'src': "assets/button_music_off.png",
    'id': "buttonMusicOff"
  }, {
    'src': "assets/button_exit.png",
    'id': 'buttonExit'
  }, {
    'src': "assets/button_settings.png",
    'id': "buttonSettings"
  }];
  for (var _0x108e35 = 0x0; _0x108e35 < themes_arr.length; _0x108e35++) {
    manifest.push({
      'src': themes_arr[_0x108e35].bg.front,
      'id': "themeBgFront" + _0x108e35
    });
    manifest.push({
      'src': themes_arr[_0x108e35].bg.back,
      'id': 'themeBgBack' + _0x108e35
    });
    manifest.push({
      'src': themes_arr[_0x108e35].highlight.image,
      'id': "themeHighlight" + _0x108e35
    });
    manifest.push({
      'src': themes_arr[_0x108e35].shadow.image,
      'id': 'themeShadow' + _0x108e35
    });
    manifest.push({
      'src': themes_arr[_0x108e35].numbers.image,
      'id': "themeNumbers" + _0x108e35
    });
  }
  if (typeof addScoreboardAssets == "function") {
    addScoreboardAssets();
  }
  soundOn = true;
  if ($.browser.mobile || isTablet) {}
  if (soundOn) {
    manifest.push({
      'src': "assets/sounds/sound_click.ogg",
      'id': 'soundButton'
    });
    manifest.push({
      'src': "assets/sounds/sound_domino_pick.ogg",
      'id': 'soundDominoPick'
    });
    manifest.push({
      'src': 'assets/sounds/sound_domino1.ogg',
      'id': 'soundDomino1'
    });
    manifest.push({
      'src': 'assets/sounds/sound_domino2.ogg',
      'id': "soundDomino2"
    });
    manifest.push({
      'src': 'assets/sounds/sound_domino3.ogg',
      'id': 'soundDomino3'
    });
    manifest.push({
      'src': 'assets/sounds/sound_point.ogg',
      'id': "soundPoint"
    });
    manifest.push({
      'src': "assets/sounds/sound_round.ogg",
      'id': "soundRound"
    });
    manifest.push({
      'src': "assets/sounds/sound_winner.ogg",
      'id': "soundWinner"
    });
    manifest.push({
      'src': "assets/sounds/sound_shuffle_in.ogg",
      'id': 'soundShuffleIn'
    });
    manifest.push({
      'src': "assets/sounds/sound_shuffle_out.ogg",
      'id': 'soundShuffleOut'
    });
    manifest.push({
      'src': 'assets/sounds/sound_result.ogg',
      'id': "soundResult"
    });
    manifest.push({
      'src': "assets/sounds/sound_alert.ogg",
      'id': "soundAlert"
    });
    manifest.push({
      'src': "assets/sounds/music_game.ogg",
      'id': "musicGame"
    });
    manifest.push({
      'src': "assets/sounds/music_main.ogg",
      'id': 'musicMain'
    });
    createjs.Sound.alternateExtensions = ["mp3"];
    loader.installPlugin(createjs.Sound);
  }
  loader.addEventListener("complete", handleComplete);
  loader.addEventListener("fileload", fileComplete);
  loader.addEventListener("error", handleFileError);
  loader.on("progress", handleProgress, this);
  loader.loadManifest(manifest);
}
function fileComplete(_0x1d31a4) {}
function handleFileError(_0xa07be1) {
  console.log("error ", _0xa07be1);
}
function handleProgress() {
  $("#mainLoader span").html(Math.round(loader.progress / 0x1 * 0x64) + '%');
}
function handleComplete() {
  toggleLoader(false);
  initMain();
}
;
function toggleLoader(_0x1b2aa2) {
  if (_0x1b2aa2) {
    $("#mainLoader").show();
  } else {
    $('#mainLoader').hide();
  }
}
var stageWidth;
var stageHeight = 0x0;
var isLoaded = false;
$(function () {
  var _0xb20973 = function () {
    try {
      if (createjs.WebAudioPlugin.context.state === "suspended") {
        createjs.WebAudioPlugin.context.resume();
        window.removeEventListener("click", _0xb20973);
      }
    } catch (_0x31316f) {
      console.error("There was an error while trying to resume the SoundJS Web Audio context...");
      console.error(_0x31316f);
    }
  };
  window.addEventListener('click', _0xb20973);
  if (window.location.protocol.substr(0x0, 0x4) === "file") {
    alert("To install the game just upload folder 'game' to your server. The game won't run locally with some browser like Chrome due to some security mode.");
  }
  $(window).resize(function () {
    resizeLoaderFunc();
  });
  resizeLoaderFunc();
  checkBrowser();
});
function resizeLoaderFunc() {
  stageWidth = $(window).width();
  stageHeight = $(window).height();
  $("#mainLoader").css('left', checkContentWidth($('#mainLoader')));
  $("#mainLoader").css('top', checkContentHeight($("#mainLoader")));
}
var browserSupport = false;
var isTablet;
function checkBrowser() {
  isTablet = /ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(navigator.userAgent.toLowerCase());
  deviceVer = getDeviceVer();
  var _0x4265ca = document.createElement("canvas");
  if (_0x4265ca.getContext) {
    browserSupport = true;
  }
  if (browserSupport) {
    if (!isLoaded) {
      isLoaded = true;
      initPreload();
    }
  } else {
    $("#notSupportHolder").show();
  }
}

window.addEventListener('message', function(event) {
  const { type, data } = event.data || {};

  if (!type || typeof data !== 'object') {
    console.warn('⚠️ Mensaje desconocido o mal formado recibido:', event.data);
    return;
  }

  switch (type) {
    case 'GAME_INIT': {
      // Inicializa el juego
      window.gameData = window.gameData || {};
      if (Array.isArray(data.names)) window.gameData.names = data.names;
      if (data.players !== undefined) window.gameData.players = data.players;
      if (data.pointIndex !== undefined) window.gameData.pointIndex = data.pointIndex;
      if (data.themeIndex !== undefined) window.gameData.themeIndex = data.themeIndex;
      if (data.draw !== undefined) window.gameData.domino = { draw: data.draw, point: 100 };
      if (data.mode) window.gameData.mode = data.mode;
      if (data.apuesta !== undefined) window.gameData.apuesta = data.apuesta;
      if (data.balance !== undefined) window.gameData.balance = data.balance;
      if (data.userId !== undefined) window.gameData.userId = data.userId;
      if (Array.isArray(data.userIds)) window.gameData.userIds = data.userIds;
      if (data.mesa) window.gameData.mesa = data.mesa;
      if (data.mesaId) window.gameData.mesaId = data.mesaId;

      console.log('[IFRAME] 🎯 GAME_INIT recibido:', window.gameData);

      // Activar multiplayer si aplica
      if (data.multiplayer && typeof initSocket === 'function' && data.socketData?.online) {
        multiplayerSettings.enable = true;
        setSocketData(data.socketData);
        initSocket(data.socketData);
        console.log('[MULTIPLAYER] 🟢 Socket iniciado automáticamente');
      }

      const waitForBuildGame = setInterval(() => {
        if (typeof buildGameButton === 'function') {
          clearInterval(waitForBuildGame);
          buildGameButton();
        }
      }, 50);
      break;
    }

    case 'GAME_RESULT': {
      console.log('[IFRAME] 🎯 GAME_RESULT recibido:', data);
      // Puedes hacer algo aquí si quieres enviar resultados al backend
      break;
    }

    case 'AUTO_START_GAME': {
      console.log('🚀 [IFRAME] AUTO_START_GAME recibido - Haciendo click en START automáticamente');
      // Esperar a que buttonStart esté disponible y visible
      setTimeout(() => {
        if (typeof buttonStart !== 'undefined' && buttonStart.visible) {
          console.log('✅ [IFRAME] buttonStart encontrado y visible - Ejecutando click');
          // Simular click en buttonStart
          if (buttonStart.dispatchEvent) {
            const clickEvent = new createjs.MouseEvent('click', true, false);
            buttonStart.dispatchEvent(clickEvent);
          } else {
            // Fallback: llamar directamente la función de click
            playSound('soundButton');
            if (typeof initSocket == "function" && multiplayerSettings.enable && socketData.online) {
              postSocketUpdate("start");
            } else {
              goPage("game");
            }
          }
        } else {
          console.warn('⚠️ [IFRAME] buttonStart no disponible o no visible');
        }
      }, 100);
      break;
    }

    case 'PLAYER_SURRENDER': {
      console.log('🏳️ [IFRAME] PLAYER_SURRENDER recibido - Jugador se rinde:', data);
      
      // Si es modo online, enviar señal al oponente vía socket
      if (typeof initSocket == "function" && multiplayerSettings.enable && socketData.online) {
        postSocketUpdate("surrender", {
          playerName: data.playerName,
          roomCode: data.roomCode
        });
        console.log('📤 [IFRAME] Señal de rendición enviada al oponente vía socket');
      }
      
      // Terminar el juego inmediatamente - el jugador pierde
      console.log('🏳️ [IFRAME] Finalizando juego por rendición...');
      
      // Enviar resultado al parent indicando derrota
      window.parent.postMessage({
        type: 'GAME_END',
        data: {
          playerName: data.playerName,
          opponentName: 'Oponente',
          playerScore: 0,
          opponentScore: 100,
          isWinner: false,
          winner: 'Oponente',
          surrendered: true,
          gameMode: window.gameData?.mode || 'online',
          roomCode: data.roomCode
        }
      }, '*');
      
      console.log('✅ [IFRAME] Resultado de rendición enviado al parent');
      break;
    }

    default:
      console.warn('⚠️ Tipo de mensaje no manejado:', type);
      break;
  }
});


// window.addEventListener('message', function(event) {
//   const { type, data } = event.data || {};

//   if (!type || typeof data !== 'object') {
//     console.warn('⚠️ Mensaje desconocido o mal formado recibido:', event.data);
//     return;
//   }

//   switch (type) {
//     case 'GAME_INIT': {
//       // Inicializa el juego
//       window.gameData = window.gameData || {};
//       if (Array.isArray(data.names)) window.gameData.names = data.names;
//       if (data.players !== undefined) window.gameData.players = data.players;
//       if (data.pointIndex !== undefined) window.gameData.pointIndex = data.pointIndex;
//       if (data.themeIndex !== undefined) window.gameData.themeIndex = data.themeIndex;
//       if (data.draw !== undefined) window.gameData.domino = { draw: data.draw, point: 100 };
//       if (data.mode) window.gameData.mode = data.mode;
//       if (data.apuesta !== undefined) window.gameData.apuesta = data.apuesta;
//       if (data.balance !== undefined) window.gameData.balance = data.balance;
//       if (data.userId !== undefined) window.gameData.userId = data.userId;
//       if (Array.isArray(data.userIds)) window.gameData.userIds = data.userIds;
//       if (data.mesa) window.gameData.mesa = data.mesa;
//       if (data.mesaId) window.gameData.mesaId = data.mesaId;

//       console.log('[IFRAME] 🎯 GAME_INIT recibido:', window.gameData);

//       const waitForBuildGame = setInterval(() => {
//         if (typeof buildGameButton === 'function') {
//           clearInterval(waitForBuildGame);
//           buildGameButton();
//         }
//       }, 50);
//       break;
//     }

//     case 'GAME_RESULT': {
//       console.log('[IFRAME] 🎯 GAME_RESULT recibido:', data);
//       // Aquí podrías hacer algo adicional si se requiere, o solo log para verificar envío correcto.
//       break;
//     }

//     default:
//       console.warn('⚠️ Tipo de mensaje no manejado:', type);
//       break;
//   }
// });