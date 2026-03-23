(function (_0x44462a, _0x5a40ec) {
  var _0x316862 = _0x44462a();
  while (!![]) {
    try {
      var _0x154cd5 = parseInt(_0x1c97(0x250)) / 0x1 * (parseInt(_0x1c97(0x115)) / 0x2) + -parseInt(_0x1c97(0x209)) / 0x3 * (parseInt(_0x1c97(0x24c)) / 0x4) + -parseInt(_0x1c97(0x23f)) / 0x5 + -parseInt(_0x1c97(0x241)) / 0x6 + -parseInt(_0x1c97(0x1d0)) / 0x7 * (-parseInt(_0x1c97(0x23b)) / 0x8) + -parseInt(_0x1c97(0x286)) / 0x9 + parseInt(_0x1c97(0x113)) / 0xa;
      if (_0x154cd5 === _0x5a40ec) {
        break;
      } else {
        _0x316862.push(_0x316862.shift());
      }
    } catch (_0x5be868) {
      _0x316862.push(_0x316862.shift());
    }
  }
})(_0x550e, 0xe3c05);
function checkContentHeight(_0x34d2e7) {
  var _0x48eede = $(window)[_0x1c97(0x2aa)]();
  var _0x29825b = _0x48eede / 0x2 - _0x34d2e7[_0x1c97(0x2aa)]() / 0x2;
  return _0x29825b;
}
function checkContentWidth(_0x429614) {
  var _0x384520 = $(window).width();
  var _0x2a0da9 = _0x384520 / 0x2 - _0x429614[_0x1c97(0x187)]() / 0x2;
  return _0x2a0da9;
}
function shuffle(_0x7d9011) {
  var _0x2f2adb = _0x7d9011[_0x1c97(0x1e8)];
  var _0x58bd5d;
  var _0x249b02;
  while (0x0 !== _0x2f2adb) {
    _0x249b02 = Math[_0x1c97(0x1eb)](Math[_0x1c97(0x282)]() * _0x2f2adb);
    _0x2f2adb -= 0x1;
    _0x58bd5d = _0x7d9011[_0x2f2adb];
    _0x7d9011[_0x2f2adb] = _0x7d9011[_0x249b02];
    _0x7d9011[_0x249b02] = _0x58bd5d;
  }
  return _0x7d9011;
}
function randomBoolean() {
  return Math[_0x1c97(0x282)]() < 0.5;
}
function getDistance(_0x19a5f5, _0x4245f1, _0x327256, _0x4aee5b) {
  var _0x328ec8 = Math[_0x1c97(0x1f4)](Math.pow(_0x19a5f5 - _0x327256, 0x2) + Math[_0x1c97(0x11b)](_0x4245f1 - _0x4aee5b, 0x2));
  return _0x328ec8;
}
function sortOnObject(_0x5d8adc, _0x46b9ba, _0x28191b) {
  if (_0x28191b) {
    _0x5d8adc.sort(function (_0x3bf665, _0x230c3c) {
      var _0x4bfb48 = _0x3bf665[_0x46b9ba];
      var _0x495a5e = _0x230c3c[_0x46b9ba];
      if (_0x4bfb48 == _0x495a5e) {
        return 0x0;
      }
      return _0x4bfb48 < _0x495a5e ? 0x1 : -0x1;
    });
  } else {
    _0x5d8adc[_0x1c97(0x1a2)](function (_0x39a6a1, _0x3bd9e1) {
      var _0x47a3e9 = _0x39a6a1[_0x46b9ba];
      var _0x5b75ac = _0x3bd9e1[_0x46b9ba];
      if (_0x47a3e9 == _0x5b75ac) {
        return 0x0;
      }
      return _0x47a3e9 > _0x5b75ac ? 0x1 : -0x1;
    });
  }
  return _0x5d8adc;
}
function randomIntFromInterval(_0x12f966, _0x5cbd9c) {
  return Math.floor(Math[_0x1c97(0x282)]() * (_0x5cbd9c - _0x12f966 + 0x1) + _0x12f966);
}
function addCommas(_0x4ff91d) {
  _0x4ff91d += '';
  x = _0x4ff91d[_0x1c97(0x1a8)]('.');
  x1 = x[0x0];
  x2 = x[_0x1c97(0x1e8)] > 0x1 ? '.' + x[0x1] : '';
  var _0x1ef6f9 = /(\d+)(\d{3})/;
  while (_0x1ef6f9[_0x1c97(0x163)](x1)) {
    x1 = x1.replace(_0x1ef6f9, '$1' + ',' + '$2');
  }
  return x1 + x2;
}
function swapArray(_0x2e62da, _0x3d0fac, _0x206eb5) {
  var _0x574004 = _0x2e62da[_0x3d0fac];
  _0x2e62da[_0x3d0fac] = _0x2e62da[_0x206eb5];
  _0x2e62da[_0x206eb5] = _0x574004;
}
function getCenterPosition(_0x58396c, _0x246c09, _0x521086, _0x2b4d6f) {
  var _0x41dae9 = {
    'x': 0x0,
    'y': 0x0
  };
  _0x41dae9.x = (_0x58396c + _0x521086) / 0x2;
  _0x41dae9.y = (_0x246c09 + _0x2b4d6f) / 0x2;
  return _0x41dae9;
}
const enableDesktopAudio = !![];
const enableMobileAudio = !![];
const muteSoundOn = ![];
const muteMusicOn = ![];
var audioOn;
var soundMute = ![];
var musicMute = ![];
$[_0x1c97(0x169)] = {};
var soundID = 0x0;
var soundPushArr = [];
var soundLoopPushArr = [];
var musicPushArr = [];
function playSound(_0x13709d, _0x2c6eff) {
  if (audioOn) {
    var _0x5e5dba = soundID;
    soundPushArr[_0x1c97(0x266)](_0x5e5dba);
    soundID++;
    var _0x5393b8 = _0x2c6eff == undefined ? 0x1 : _0x2c6eff;
    $[_0x1c97(0x169)][_0x5e5dba] = createjs[_0x1c97(0x26f)][_0x1c97(0x29a)](_0x13709d);
    $.sound[_0x5e5dba][_0x1c97(0x110)] = _0x5393b8;
    setSoundVolume(_0x5e5dba);
    $[_0x1c97(0x169)][_0x5e5dba][_0x1c97(0x1e6)]();
    $.sound[_0x5e5dba][_0x1c97(0x1b9)](_0x1c97(0x22f), function () {
      var _0x1c0035 = soundPushArr[_0x1c97(0x231)](_0x5e5dba);
      if (_0x1c0035 != -0x1) {
        soundPushArr[_0x1c97(0x1c6)](_0x1c0035, 0x1);
      }
    });
  }
}
function playSoundLoop(_0x1c68a0) {
  if (audioOn) {
    if ($.sound[_0x1c68a0] == null) {
      soundLoopPushArr[_0x1c97(0x266)](_0x1c68a0);
      $[_0x1c97(0x169)][_0x1c68a0] = createjs[_0x1c97(0x26f)].play(_0x1c68a0);
      $[_0x1c97(0x169)][_0x1c68a0][_0x1c97(0x110)] = 0x1;
      setSoundLoopVolume(_0x1c68a0);
      $[_0x1c97(0x169)][_0x1c68a0][_0x1c97(0x1e6)]();
      $[_0x1c97(0x169)][_0x1c68a0].addEventListener(_0x1c97(0x22f), function () {
        $[_0x1c97(0x169)][_0x1c68a0][_0x1c97(0x29a)]();
      });
    }
  }
}
function toggleSoundLoop(_0x1e68d4, _0xe3dd5f) {
  if (audioOn) {
    if ($[_0x1c97(0x169)][_0x1e68d4] != null) {
      if (_0xe3dd5f) {
        $[_0x1c97(0x169)][_0x1e68d4][_0x1c97(0x29a)]();
      } else {
        $[_0x1c97(0x169)][_0x1e68d4][_0x1c97(0x212)] = !![];
      }
    }
  }
}
function stopSoundLoop(_0x83c1d) {
  if (audioOn) {
    if ($[_0x1c97(0x169)][_0x83c1d] != null) {
      $[_0x1c97(0x169)][_0x83c1d][_0x1c97(0x14c)]();
      $[_0x1c97(0x169)][_0x83c1d] = null;
      var _0x2f0e8b = soundLoopPushArr[_0x1c97(0x231)](_0x83c1d);
      if (_0x2f0e8b != -0x1) {
        soundLoopPushArr[_0x1c97(0x1c6)](_0x2f0e8b, 0x1);
      }
    }
  }
}
function _0x550e() {
  var _0x1637aa = ['https://www.facebook.com/sharer/sharer.php?u=', 'gameCanvas', 'hide', "#roomWrapper .roomContent", 'result', '[PLAYER]', 'startDate', 'resultDesc', 'ajax', 'test', '#fff', 'linkedin', 'globalToLocal', 'assets/item_status.png', 'currentTarget', 'sound', 'buttonLinkedin', 'size', 'soundKey', 'isLandscape', 'assets/sounds/sound_enter.ogg', 'share', 'log', 'buttonTelegram', 'replace', 'drawing', 'playerScore', 'pressup', 'https://t.me/share/url?url=', 'msFullscreenElement', 'oldTimer', 'blankColor', 'fromCharCode', 'https://api.whatsapp.com/send?text=', 'gamePlayerBg', 'buttonConfirm', 'center', 'soundEnter', 'itemStatus', 'answers', 'buttonFacebook', 'gamePlayerBgH', 'remove', 'getElementById', '&text=', 'width', 'TITANIC', 'Ticker', 'each', 'itemCorrect', 'mozRequestFullScreen', 'out', 'DOG', 'updatedrawingline', 'assets/sounds/sound_key.ogg', 'online', 'assets/button_save.png', 'soundStart', 'buttonShare', 'assets/sounds/sound_click.ogg', 'framerate', 'scoreData', 'key', '#roomlists', 'Stage', "YOUR SCORE:", '&thumb=', 'append', '#91181D', 'blank', 'loadManifest', 'lastRoom', 'sort', 'blur', 'WOLF', "[PLAYER] is drawing...", '#008C00', 'function', 'split', 'multiplayer/js/socket-app.js', 'drawRoundRectComplex', 'gameIconContainer', '#canvasHolder', 'cache', 'scaleY', 'removeEventListener', '#000', 'autoClear', 'itemPop', 'itemPopP', "px bodo_amatregular", 'assets/social/button_twitter.png', 'buttonContinue', '#namelists', "#roomWrapper .fontNameError", 'addEventListener', 'resize', 'WebAudioPlugin', "#roomWrapper .nameContent", 'getContext', 'logoP', 'keyWidth', 'enterName', 'pressmove', 'keySpace', 'Shape', 'assets/background.png', 'document', 'splice', 'addClass', 'player', 'name', 'prepend', 'alphabetic', 'playerCorrect', 'assets/button_share.png', 'msExitFullscreen', 'file', '28hHbMfz', 'regY', 'left', 'soundButton', 'href', 'assets/logo.png', 'assets/item_arrow.png', 'buttonWhatsapp', 'drawRect', 'toUpperCase', 'beginStroke', 'textBaseline', 'startDraw', "There was an error while trying to resume the SoundJS Web Audio context...", 'onkeydown', 'itemBlank', 'start', 'scrollTop', 'assets/sounds/sound_timer.ogg', 'scale', 'MONKEY', 'soundCountdown', 'removeAllEventListeners', 'SHARK', 'length', 'buttonReddit', 'seq', 'floor', '.resizeFont', 'assets/item_pop_p.png', 'style', '%20', 'logo', 'ELVIS', 'error', 'itemRemove', 'sqrt', 'keyDisabledColor', 'alpha', 'keyCode', 'puzzleNum', "HELLO WORLD", 'assets/sounds/sound_timer_end.ogg', '#rotateHolder', 'assets/sounds/sound_start.ogg', 'editor', 'timer', 'fadeOut', 'orientationchange', 'getTime', 'Text', "<script type=\"text/javascript\" src=\"", 'resume', 'itemArrow', "Time's Up", 'buttonExit', 'progress', '4586913VnvslU', 'abs', 'clear', 'telegram', "Start drawing...", 'answerNum', '#roomWrapper', 'min', 'UNICORN', 'paused', 'innerHeight', 'keyHeight', 'red', 'canvas', 'APE', 'rows', 'type', 'assets/sounds/sound_complete.ogg', 'naturalWidth', 'BALL', 'focus', 'update', 'Container', 'userAgent', 'boardMaskW', 'buttonFullscreen', 'round', 'reddit', '.mobileRotate', 'room', 'nowDate', 'strokeNum', 'options', 'totalplayers', 'buttonSoundOff', 'assets/button_confirm.png', 'itemGameStatus', 'https://twitter.com/intent/tweet?text=', 'complete', 'buttonSettings', 'indexOf', 'assets/social/button_reddit.png', 'shareText', "error ", 'assets/button_fullscreen.png', 'msRequestFullscreen', 'turn', "25px bodo_amatregular", 'index', 'onkeyup', '1633304cZeYrI', 'twitter', 'graphics', 'addChild', '763835DQpdVX', '&url=', '2368998QLNJJQ', 'roundComplete', 'removeClass', 'customScore', 'css', 'elapsedTime', "20px bodo_amatregular", 'tick', 'mozFullScreenElement', 'multiplayer/js/socket.js', 'buttonCancel', '4BBdyWk', 'webkitExitFullscreen', 'enableMouseOver', 'mask', '1XlgIns', 'assets/item_player.png', 'requestFullscreen', "<div id=\"focus\" style=\"position:absolute; width:100%; height:100%; z-index:1000;\"></div", 'CAT', "START DRAWING", 'context', 'undefined', 'soundComplete', 'webkitRequestFullscreen', 'assets/item_player_h.png', 'config', 'Graphics', 'assets/sounds/sound_result.ogg', 'pointer', 'facebook', 'keyColor', 'mouseY', 'itemPlayer', 'mobile', 'LoadQueue', 'shareTitle', 'push', '#notificationHolder', 'assets/item_board.png', '#mainLoader', 'SEASICK', 'score', 'removeAllChildren', '#F4B331', 'mousedown', 'Sound', 'itemKey', 'itemKeyDisabled', 'backgroundP', 'fullscreenElement', '#notSupportHolder', 'gameArrow', 'mouseMoveOutside', 'Bitmap', 'val', 'CORRECT!', 'down', 'keyboardLayout', 'getResult', "\"></script>", 'textAlign', 'cursor', 'soundCountdownEnd', '/socket.io/socket.io.js', 'random', 'fadeIn', 'keyType', 'itemBoard', '7659000tAixEv', 'item', 'ICECREAM', 'gtag', 'mp3', 'STARWARS', 'button', 'players', 'assets/button_settings.png', 'JACKET', '[NUMBER]', '[NUMBER]sec', 'oriY', 'assets/button_cancel.png', 'head', "60px bodo_amatregular", '200', 'volume', 'soundResult', 'naturalHeight', 'play', 'move', "#roomWrapper .innerContent", 'buttonStart', 'assets/button_sound_off.png', 'lastIndexOf', 'which', 'tweenScore', 'gameIndex', 'updateplayeranswer', '#focus', 'state', 'playerTurn', 'click', 'forPortrait', 'beginFill', 'height', '[SCORE]', 'hitArea', 'DANCE', 'gameScore', 'easeOut', 'spaceX', 'parent', '#mainHolder', '#848484', 'blanks', 'assets/social/button_whatsapp.png', "[PLAYER] GOT IT RIGHT!", 'exitMessage', 'updatecomplete', 'release', 'text', 'defaultVol', 'scaleX', 'letterNum', '26332850cXPqCu', 'resultTitle', '821006pptCnz', 'navigator', 'background', 'keyboard', 'alternateExtensions', 'attr', 'pow', 'color', 'gamePlayer', 'gameAnswers', 'https://www.reddit.com/submit?url=', 'gamePlayerContainer', 'playerTurnIsDrawing', 'share.jpg', 'image', 'font', 'rejoinRoom', 'buttonSoundOn', 'tablet', 'innerWidth', 'enable', 'countdown', '#roomLogs', 'protocol', 'itemPlayerH', '#enterName', 'startdrawingline', 'source-over', 'top', "Are you sure you want\nto quit game?", 'sketchAnswer', 'buttonSave', 'location', 'bgH', 'lineData', 'SPACE', "[SCORE]pts is mine new highscore on Guess the Sketch! Try it now!", "Share your score:", 'exitFullscreen', 'multiplayer/css/socket.css', 'whatsapp', 'host', 'boardMaskH', 'suspended', 'playerIsDrawing', 'show', 'assets/item_correct.png', 'assets/button_exit.png', 'assets/item_game_status.png', 'substring', 'assets/social/button_telegram.png', 'html', 'custom', 'mouseX', '[NUMBER]PTS', 'stop', 'correct', 'mozCancelFullScreen', 'correctColor', 'lineHeight', 'visible', 'setStrokeStyle', 'timeUp', 'main', 'documentElement', 'strokeColor', 'letters', 'open', "[PLAYER] TURN"];
  _0x550e = function () {
    return _0x1637aa;
  };
  return _0x550e();
}
function playMusicLoop(_0x41775e) {
  if (audioOn) {
    if ($[_0x1c97(0x169)][_0x41775e] == null) {
      musicPushArr[_0x1c97(0x266)](_0x41775e);
      $[_0x1c97(0x169)][_0x41775e] = createjs[_0x1c97(0x26f)][_0x1c97(0x29a)](_0x41775e);
      $[_0x1c97(0x169)][_0x41775e].defaultVol = 0x1;
      setMusicVolume(_0x41775e);
      $.sound[_0x41775e][_0x1c97(0x1e6)]();
      $[_0x1c97(0x169)][_0x41775e][_0x1c97(0x1b9)]('complete', function () {
        $[_0x1c97(0x169)][_0x41775e].play();
      });
    }
  }
}
function toggleMusicLoop(_0x15cc13, _0x3c2d39) {
  if (audioOn) {
    if ($.sound[_0x15cc13] != null) {
      if (_0x3c2d39) {
        $.sound[_0x15cc13].play();
      } else {
        $[_0x1c97(0x169)][_0x15cc13][_0x1c97(0x212)] = !![];
      }
    }
  }
}
function stopMusicLoop(_0x468811) {
  if (audioOn) {
    if ($.sound[_0x468811] != null) {
      $[_0x1c97(0x169)][_0x468811][_0x1c97(0x14c)]();
      $[_0x1c97(0x169)][_0x468811] = null;
      var _0x23d889 = musicPushArr[_0x1c97(0x231)](_0x468811);
      if (_0x23d889 != -0x1) {
        musicPushArr[_0x1c97(0x1c6)](_0x23d889, 0x1);
      }
    }
  }
}
function stopSound() {
  createjs[_0x1c97(0x26f)][_0x1c97(0x14c)]();
}
function toggleSoundInMute(_0x177c7a) {
  if (audioOn) {
    soundMute = _0x177c7a;
    for (var _0x41cea2 = 0x0; _0x41cea2 < soundPushArr.length; _0x41cea2++) {
      setSoundVolume(soundPushArr[_0x41cea2]);
    }
    for (var _0x41cea2 = 0x0; _0x41cea2 < soundLoopPushArr[_0x1c97(0x1e8)]; _0x41cea2++) {
      setSoundLoopVolume(soundLoopPushArr[_0x41cea2]);
    }
  }
}
function toggleMusicInMute(_0x3d3bab) {
  if (audioOn) {
    musicMute = _0x3d3bab;
    for (var _0x38ec60 = 0x0; _0x38ec60 < musicPushArr[_0x1c97(0x1e8)]; _0x38ec60++) {
      setMusicVolume(musicPushArr[_0x38ec60]);
    }
  }
}
function setSoundVolume(_0x57e030, _0x49090a) {
  if (audioOn) {
    var _0xf59301 = soundPushArr[_0x1c97(0x231)](_0x57e030);
    if (_0xf59301 != -0x1) {
      var _0x2b19c9 = _0x49090a == undefined ? $[_0x1c97(0x169)][soundPushArr[_0xf59301]][_0x1c97(0x110)] : _0x49090a;
      var _0x1c0e0c = soundMute == ![] ? _0x2b19c9 : 0x0;
      $[_0x1c97(0x169)][soundPushArr[_0xf59301]][_0x1c97(0x297)] = _0x1c0e0c;
      $[_0x1c97(0x169)][soundPushArr[_0xf59301]].defaultVol = _0x2b19c9;
    }
  }
}
function setSoundLoopVolume(_0x2c8fae, _0x106737) {
  if (audioOn) {
    var _0x47e673 = soundLoopPushArr[_0x1c97(0x231)](_0x2c8fae);
    if (_0x47e673 != -0x1) {
      var _0x26edd9 = _0x106737 == undefined ? $[_0x1c97(0x169)][soundLoopPushArr[_0x47e673]][_0x1c97(0x110)] : _0x106737;
      var _0x5401af = soundMute == ![] ? _0x26edd9 : 0x0;
      $[_0x1c97(0x169)][soundLoopPushArr[_0x47e673]].volume = _0x5401af;
      $[_0x1c97(0x169)][soundLoopPushArr[_0x47e673]].defaultVol = _0x26edd9;
    }
  }
}
function setMusicVolume(_0x20424b, _0x4d62bd) {
  if (audioOn) {
    var _0x31021b = musicPushArr[_0x1c97(0x231)](_0x20424b);
    if (_0x31021b != -0x1) {
      var _0x4b05a5 = _0x4d62bd == undefined ? $[_0x1c97(0x169)][musicPushArr[_0x31021b]].defaultVol : _0x4d62bd;
      var _0x4bc94f = musicMute == ![] ? _0x4b05a5 : 0x0;
      $[_0x1c97(0x169)][musicPushArr[_0x31021b]][_0x1c97(0x297)] = _0x4bc94f;
      $[_0x1c97(0x169)][musicPushArr[_0x31021b]][_0x1c97(0x110)] = _0x4b05a5;
    }
  }
}
var stage;
var canvasW = 0x0;
var canvasH = 0x0;
function initGameCanvas(_0x13ea4a, _0x205d18) {
  const _0x10e0a7 = document[_0x1c97(0x185)]('gameCanvas');
  _0x10e0a7[_0x1c97(0x187)] = _0x13ea4a;
  _0x10e0a7[_0x1c97(0x2aa)] = _0x205d18;
  canvasW = _0x13ea4a;
  canvasH = _0x205d18;
  stage = new createjs[_0x1c97(0x19a)](_0x1c97(0x15b), {
    'antialias': !![]
  });
  createjs.Touch[_0x1c97(0x129)](stage);
  stage[_0x1c97(0x24e)](0x14);
  stage[_0x1c97(0x276)] = !![];
  createjs[_0x1c97(0x189)][_0x1c97(0x196)] = 0x3c;
  createjs.Ticker[_0x1c97(0x1b9)]('tick', tick);
}
var safeZoneGuide = ![];
var canvasContainer;
var mainContainer;
var gameContainer;
var resultContainer;
var exitContainer;
var optionsContainer;
var shareContainer;
var shareSaveContainer;
var socialContainer;
var guideline;
var bg;
var bgP;
var logo;
var logoP;
var itemExit;
var itemExitP;
var popTitleTxt;
var popDescTxt;
var buttonConfirm;
var buttonCancel;
var itemResult;
var itemResultP;
var buttonContinue;
var resultTitleTxt;
var resultDescTxt;
var buttonShare;
var buttonSave;
var resultTitleOutlineTxt;
var resultDescOutlineTxt;
var resultShareTxt;
var resultShareOutlineTxt;
var popTitleOutlineTxt;
var popDescOutlineTxt;
var buttonSettings;
var buttonFullscreen;
var buttonSoundOn;
var buttonSoundOff;
var buttonMusicOn;
var buttonMusicOff;
var buttonExit;
$[_0x1c97(0x16f)] = {};
var instructionContainer;
var moveContainer;
var buttonOk;
var result;
var shadowResult;
var buttonReplay;
$[_0x1c97(0x28d)] = {};
function buildGameCanvas() {
  canvasContainer = new createjs.Container();
  mainContainer = new createjs.Container();
  gameContainer = new createjs.Container();
  exitContainer = new createjs[_0x1c97(0x21f)]();
  resultContainer = new createjs[_0x1c97(0x21f)]();
  shareContainer = new createjs[_0x1c97(0x21f)]();
  shareSaveContainer = new createjs[_0x1c97(0x21f)]();
  socialContainer = new createjs.Container();
  boardContainer = new createjs[_0x1c97(0x21f)]();
  blankContainer = new createjs.Container();
  keyContainer = new createjs[_0x1c97(0x21f)]();
  drawContainer = new createjs[_0x1c97(0x21f)]();
  statusContainer = new createjs[_0x1c97(0x21f)]();
  gameStatusContainer = new createjs[_0x1c97(0x21f)]();
  bg = new createjs.Bitmap(loader[_0x1c97(0x27c)](_0x1c97(0x117)));
  bgP = new createjs[_0x1c97(0x277)](loader[_0x1c97(0x27c)](_0x1c97(0x272)));
  logo = new createjs[_0x1c97(0x277)](loader.getResult(_0x1c97(0x1f0)));
  logoP = new createjs[_0x1c97(0x277)](loader.getResult(_0x1c97(0x1be)));
  buttonStart = new createjs[_0x1c97(0x277)](loader[_0x1c97(0x27c)]('buttonStart'));
  centerReg(buttonStart);
  itemBoard = new createjs[_0x1c97(0x277)](loader[_0x1c97(0x27c)]('itemBoard'));
  centerReg(itemBoard);
  itemStatus = new createjs[_0x1c97(0x277)](loader[_0x1c97(0x27c)](_0x1c97(0x180)));
  centerReg(itemStatus);
  itemGameStatus = new createjs[_0x1c97(0x277)](loader[_0x1c97(0x27c)](_0x1c97(0x22d)));
  centerReg(itemGameStatus);
  itemStatus.y = -0xb4;
  boardDrawing = new createjs[_0x1c97(0x1c3)]();
  gameData[_0x1c97(0x221)] = 0x1c7;
  gameData.boardMaskH = 0x15e;
  boardDrawingMask = new createjs[_0x1c97(0x1c3)]();
  boardDrawingMask[_0x1c97(0x23d)][_0x1c97(0x2a9)](_0x1c97(0x215))[_0x1c97(0x1aa)](-(gameData[_0x1c97(0x221)] / 0x2), -(gameData[_0x1c97(0x13f)] / 0x2), gameData[_0x1c97(0x221)], gameData.boardMaskH, 0xa, 0xa, 0xa, 0xa);
  drawContainer[_0x1c97(0x24f)] = boardDrawingMask;
  statusTxt = new createjs[_0x1c97(0x202)]();
  statusTxt[_0x1c97(0x124)] = _0x1c97(0x238);
  statusTxt[_0x1c97(0x11c)] = _0x1c97(0x164);
  statusTxt[_0x1c97(0x27e)] = _0x1c97(0x17e);
  statusTxt[_0x1c97(0x1db)] = _0x1c97(0x1cb);
  statusTxt[_0x1c97(0x10f)] = _0x1c97(0x1f9);
  statusTxt.y += 0xa;
  gameStatusContainer[_0x1c97(0x23e)](itemGameStatus, statusTxt);
  gameStatusContainer.y = 0x78;
  timerTxt = new createjs[_0x1c97(0x202)]();
  timerTxt[_0x1c97(0x124)] = "25px bodo_amatregular";
  timerTxt[_0x1c97(0x11c)] = _0x1c97(0x164);
  timerTxt[_0x1c97(0x27e)] = _0x1c97(0x17e);
  timerTxt.textBaseline = _0x1c97(0x1cb);
  timerTxt[_0x1c97(0x10f)] = '00:00';
  timerRedTxt = new createjs[_0x1c97(0x202)]();
  timerRedTxt[_0x1c97(0x124)] = _0x1c97(0x238);
  timerRedTxt[_0x1c97(0x11c)] = _0x1c97(0x26d);
  timerRedTxt[_0x1c97(0x27e)] = 'center';
  timerRedTxt.textBaseline = 'alphabetic';
  timerTxt.x = timerRedTxt.x = 0xa0;
  timerTxt.y = timerRedTxt.y = -0xac;
  drawStatusTxt = new createjs[_0x1c97(0x202)]();
  drawStatusTxt[_0x1c97(0x124)] = _0x1c97(0x238);
  drawStatusTxt[_0x1c97(0x11c)] = _0x1c97(0x164);
  drawStatusTxt.textAlign = _0x1c97(0x17e);
  drawStatusTxt[_0x1c97(0x1db)] = _0x1c97(0x1cb);
  drawStatusTxt.text = "HELLO WORLD";
  drawStatusTxt.x = -0x37;
  drawStatusTxt.y = -0xac;
  statusContainer[_0x1c97(0x23e)](timerTxt, timerRedTxt, drawStatusTxt);
  for (var _0xfbdcf3 = 0x0; _0xfbdcf3 < 0x4; _0xfbdcf3++) {
    $[_0x1c97(0x28d)]['gamePlayerContainer' + _0xfbdcf3] = new createjs[_0x1c97(0x21f)]();
    $[_0x1c97(0x28d)][_0x1c97(0x17c) + _0xfbdcf3] = new createjs[_0x1c97(0x277)](loader[_0x1c97(0x27c)](_0x1c97(0x262)));
    centerReg($[_0x1c97(0x28d)][_0x1c97(0x17c) + _0xfbdcf3]);
    $[_0x1c97(0x28d)][_0x1c97(0x183) + _0xfbdcf3] = new createjs.Bitmap(loader[_0x1c97(0x27c)](_0x1c97(0x12d)));
    centerReg($[_0x1c97(0x28d)]['gamePlayerBgH' + _0xfbdcf3]);
    $[_0x1c97(0x28d)]['gameArrow' + _0xfbdcf3] = new createjs[_0x1c97(0x277)](loader.getResult(_0x1c97(0x205)));
    centerReg($[_0x1c97(0x28d)][_0x1c97(0x275) + _0xfbdcf3]);
    $.players['gameArrow' + _0xfbdcf3].x = -0x5f;
    $[_0x1c97(0x28d)][_0x1c97(0x11d) + _0xfbdcf3] = new createjs.Text();
    $[_0x1c97(0x28d)][_0x1c97(0x11d) + _0xfbdcf3][_0x1c97(0x124)] = _0x1c97(0x247);
    $[_0x1c97(0x28d)][_0x1c97(0x11d) + _0xfbdcf3][_0x1c97(0x27e)] = _0x1c97(0x17e);
    $.players[_0x1c97(0x11d) + _0xfbdcf3][_0x1c97(0x1db)] = _0x1c97(0x1cb);
    $[_0x1c97(0x28d)]['gamePlayer' + _0xfbdcf3].y = -0x5;
    $[_0x1c97(0x28d)][_0x1c97(0x2ae) + _0xfbdcf3] = new createjs[_0x1c97(0x202)]();
    $[_0x1c97(0x28d)]['gameScore' + _0xfbdcf3][_0x1c97(0x124)] = "25px bodo_amatregular";
    $[_0x1c97(0x28d)][_0x1c97(0x2ae) + _0xfbdcf3].textAlign = _0x1c97(0x17e);
    $[_0x1c97(0x28d)][_0x1c97(0x2ae) + _0xfbdcf3].textBaseline = _0x1c97(0x1cb);
    $[_0x1c97(0x28d)][_0x1c97(0x2ae) + _0xfbdcf3].y = 0x14;
    $.players[_0x1c97(0x11e) + _0xfbdcf3] = new createjs[_0x1c97(0x21f)]();
    $.players[_0x1c97(0x11e) + _0xfbdcf3][_0x1c97(0x111)] = $[_0x1c97(0x28d)]['gameAnswers' + _0xfbdcf3][_0x1c97(0x1ae)] = 0.5;
    $.players[_0x1c97(0x11e) + _0xfbdcf3].y = 0x41;
    $[_0x1c97(0x28d)][_0x1c97(0x120) + _0xfbdcf3][_0x1c97(0x23e)]($[_0x1c97(0x28d)][_0x1c97(0x17c) + _0xfbdcf3], $[_0x1c97(0x28d)][_0x1c97(0x183) + _0xfbdcf3], $.players['gameArrow' + _0xfbdcf3], $.players[_0x1c97(0x11d) + _0xfbdcf3], $[_0x1c97(0x28d)][_0x1c97(0x2ae) + _0xfbdcf3], $[_0x1c97(0x28d)]['gameAnswers' + _0xfbdcf3]);
    gameContainer[_0x1c97(0x23e)]($[_0x1c97(0x28d)][_0x1c97(0x120) + _0xfbdcf3]);
  }
  itemResult = new createjs[_0x1c97(0x277)](loader[_0x1c97(0x27c)]('itemPop'));
  itemResultP = new createjs[_0x1c97(0x277)](loader[_0x1c97(0x27c)](_0x1c97(0x1b3)));
  buttonContinue = new createjs[_0x1c97(0x277)](loader[_0x1c97(0x27c)](_0x1c97(0x1b6)));
  centerReg(buttonContinue);
  resultShareTxt = new createjs[_0x1c97(0x202)]();
  resultShareTxt[_0x1c97(0x124)] = _0x1c97(0x238);
  resultShareTxt[_0x1c97(0x11c)] = _0x1c97(0x19e);
  resultShareTxt[_0x1c97(0x27e)] = _0x1c97(0x17e);
  resultShareTxt[_0x1c97(0x1db)] = _0x1c97(0x1cb);
  resultShareTxt[_0x1c97(0x10f)] = textStrings[_0x1c97(0x16f)];
  resultTitleTxt = new createjs.Text();
  resultTitleTxt[_0x1c97(0x124)] = _0x1c97(0x295);
  resultTitleTxt.color = _0x1c97(0x19e);
  resultTitleTxt.textAlign = _0x1c97(0x17e);
  resultTitleTxt[_0x1c97(0x1db)] = _0x1c97(0x1cb);
  resultTitleTxt[_0x1c97(0x10f)] = textStrings[_0x1c97(0x114)];
  resultDescTxt = new createjs[_0x1c97(0x202)]();
  resultDescTxt.font = "70px bodo_amatregular";
  resultDescTxt.lineHeight = 0x23;
  resultDescTxt.color = '#91181D';
  resultDescTxt[_0x1c97(0x27e)] = _0x1c97(0x17e);
  resultDescTxt[_0x1c97(0x1db)] = 'alphabetic';
  resultDescTxt[_0x1c97(0x10f)] = '';
  socialContainer[_0x1c97(0x151)] = ![];
  socialContainer[_0x1c97(0x1e3)] = 0x1;
  shareContainer.addChild(resultShareTxt, socialContainer);
  if (shareSettings[_0x1c97(0x129)]) {
    buttonShare = new createjs[_0x1c97(0x277)](loader[_0x1c97(0x27c)](_0x1c97(0x194)));
    centerReg(buttonShare);
    var _0x5ed2e3 = {
      'x': 0x0,
      'y': 0x2d,
      'spaceX': 0x41
    };
    _0x5ed2e3.x = -((shareSettings[_0x1c97(0x229)][_0x1c97(0x1e8)] - 0x1) * 0x41 / 0x2);
    for (let _0x47d2ec = 0x0; _0x47d2ec < shareSettings[_0x1c97(0x229)][_0x1c97(0x1e8)]; _0x47d2ec++) {
      var _0x561743 = shareSettings[_0x1c97(0x229)][_0x47d2ec];
      var _0x306b74 = String(_0x561743[0x0])[_0x1c97(0x1d9)]() + String(_0x561743).slice(0x1);
      $[_0x1c97(0x16f)]['button' + _0x47d2ec] = new createjs.Bitmap(loader.getResult('button' + _0x306b74));
      $[_0x1c97(0x16f)][_0x1c97(0x28c) + _0x47d2ec].shareOption = _0x561743;
      centerReg($[_0x1c97(0x16f)][_0x1c97(0x28c) + _0x47d2ec]);
      $.share[_0x1c97(0x28c) + _0x47d2ec].x = 0x0;
      $[_0x1c97(0x16f)][_0x1c97(0x28c) + _0x47d2ec].y = 0x2d;
      socialContainer[_0x1c97(0x23e)]($[_0x1c97(0x16f)][_0x1c97(0x28c) + _0x47d2ec]);
      _0x5ed2e3.x += _0x5ed2e3[_0x1c97(0x2b0)];
    }
    buttonShare.y = buttonShare[_0x1c97(0x123)].naturalHeight / 0x2 + 0xa;
    shareContainer.addChild(buttonShare);
  }
  if (typeof toggleScoreboardSave == _0x1c97(0x1a7)) {
    buttonSave = new createjs.Bitmap(loader[_0x1c97(0x27c)](_0x1c97(0x134)));
    centerReg(buttonSave);
    buttonSave.y = buttonSave[_0x1c97(0x123)].naturalHeight / 0x2 + 0xa;
    shareSaveContainer[_0x1c97(0x23e)](buttonSave);
  }
  buttonFullscreen = new createjs[_0x1c97(0x277)](loader.getResult('buttonFullscreen'));
  centerReg(buttonFullscreen);
  buttonSoundOn = new createjs[_0x1c97(0x277)](loader[_0x1c97(0x27c)](_0x1c97(0x126)));
  centerReg(buttonSoundOn);
  buttonSoundOff = new createjs.Bitmap(loader[_0x1c97(0x27c)](_0x1c97(0x22b)));
  centerReg(buttonSoundOff);
  buttonSoundOn[_0x1c97(0x151)] = ![];
  buttonExit = new createjs[_0x1c97(0x277)](loader[_0x1c97(0x27c)](_0x1c97(0x207)));
  centerReg(buttonExit);
  buttonSettings = new createjs[_0x1c97(0x277)](loader[_0x1c97(0x27c)](_0x1c97(0x230)));
  centerReg(buttonSettings);
  createHitarea(buttonFullscreen);
  createHitarea(buttonSoundOn);
  createHitarea(buttonSoundOff);
  createHitarea(buttonExit);
  createHitarea(buttonSettings);
  optionsContainer = new createjs[_0x1c97(0x21f)]();
  optionsContainer[_0x1c97(0x23e)](buttonFullscreen, buttonSoundOn, buttonSoundOff, buttonExit);
  optionsContainer[_0x1c97(0x151)] = ![];
  itemExit = new createjs.Bitmap(loader.getResult(_0x1c97(0x1b2)));
  itemExitP = new createjs[_0x1c97(0x277)](loader[_0x1c97(0x27c)](_0x1c97(0x1b3)));
  buttonConfirm = new createjs[_0x1c97(0x277)](loader[_0x1c97(0x27c)](_0x1c97(0x17d)));
  centerReg(buttonConfirm);
  buttonCancel = new createjs.Bitmap(loader.getResult(_0x1c97(0x24b)));
  centerReg(buttonCancel);
  popTitleTxt = new createjs[_0x1c97(0x202)]();
  popTitleTxt[_0x1c97(0x124)] = _0x1c97(0x295);
  popTitleTxt[_0x1c97(0x11c)] = _0x1c97(0x19e);
  popTitleTxt.textAlign = _0x1c97(0x17e);
  popTitleTxt[_0x1c97(0x1db)] = _0x1c97(0x1cb);
  popTitleTxt[_0x1c97(0x10f)] = "EXIT GAME";
  popDescTxt = new createjs[_0x1c97(0x202)]();
  popDescTxt[_0x1c97(0x124)] = "45px bodo_amatregular";
  popDescTxt[_0x1c97(0x150)] = 0x32;
  popDescTxt[_0x1c97(0x11c)] = _0x1c97(0x19e);
  popDescTxt[_0x1c97(0x27e)] = _0x1c97(0x17e);
  popDescTxt.textBaseline = _0x1c97(0x1cb);
  popDescTxt[_0x1c97(0x10f)] = textStrings[_0x1c97(0x2b7)];
  exitContainer.addChild(itemExit, itemExitP, popTitleTxt, popDescTxt, buttonConfirm, buttonCancel);
  exitContainer.visible = ![];
  roomContainer = new createjs[_0x1c97(0x21f)]();
  nameContainer = new createjs[_0x1c97(0x21f)]();
  gameLogsTxt = new createjs[_0x1c97(0x202)]();
  gameLogsTxt[_0x1c97(0x124)] = _0x1c97(0x238);
  gameLogsTxt[_0x1c97(0x11c)] = '#fff';
  gameLogsTxt[_0x1c97(0x27e)] = _0x1c97(0x17e);
  gameLogsTxt.textBaseline = 'alphabetic';
  gameLogsTxt.text = '';
  guideline = new createjs[_0x1c97(0x1c3)]();
  mainContainer[_0x1c97(0x23e)](logo, logoP, buttonStart);
  drawContainer.addChild(boardDrawing);
  boardContainer[_0x1c97(0x23e)](itemBoard, itemStatus, drawContainer, statusContainer, gameStatusContainer, blankContainer, keyContainer);
  gameContainer[_0x1c97(0x23e)](boardContainer);
  resultContainer[_0x1c97(0x23e)](itemResult, itemResultP, buttonContinue, resultTitleTxt, resultDescTxt, shareContainer, shareSaveContainer);
  canvasContainer[_0x1c97(0x23e)](bg, bgP, mainContainer, nameContainer, roomContainer, gameContainer, gameLogsTxt, resultContainer, exitContainer, optionsContainer, buttonSettings, guideline);
  stage[_0x1c97(0x23e)](canvasContainer);
  changeViewport(viewport[_0x1c97(0x16d)]);
  resizeGameFunc();
}
function changeViewport(_0x224701) {
  if (_0x224701) {
    stageW = landscapeSize.w;
    stageH = landscapeSize.h;
    contentW = landscapeSize.cW;
    contentH = landscapeSize.cH;
  } else {
    stageW = 0x300;
    stageH = 0x400;
    contentW = 0x240;
    contentH = 0x384;
  }
  canvasW = stageW;
  canvasH = stageH;
  changeCanvasViewport();
}
function changeCanvasViewport() {
  if (canvasContainer != undefined) {
    stage[_0x1c97(0x111)] = stage[_0x1c97(0x1ae)] = dpr;
    if (safeZoneGuide) {
      guideline[_0x1c97(0x23d)][_0x1c97(0x20b)]()[_0x1c97(0x152)](0x2)[_0x1c97(0x1da)](_0x1c97(0x215))[_0x1c97(0x1d8)]((stageW - contentW) / 0x2, (stageH - contentH) / 0x2, contentW, contentH);
    }
    if (viewport[_0x1c97(0x16d)]) {
      bg[_0x1c97(0x151)] = !![];
      bgP[_0x1c97(0x151)] = ![];
      logo[_0x1c97(0x151)] = !![];
      logoP[_0x1c97(0x151)] = ![];
      buttonStart.x = canvasW / 0x2;
      buttonStart.y = canvasH / 0x64 * 0x4b;
      itemResult[_0x1c97(0x151)] = !![];
      itemResultP[_0x1c97(0x151)] = ![];
      buttonContinue.x = canvasW / 0x2;
      buttonContinue.y = canvasH / 0x64 * 0x44;
      shareContainer.x = shareSaveContainer.x = canvasW / 0x2;
      shareContainer.y = shareSaveContainer.y = canvasH / 0x64 * 0x31;
      resultTitleTxt.x = canvasW / 0x2;
      resultTitleTxt.y = canvasH / 0x64 * 0x23;
      resultDescTxt.x = canvasW / 0x2;
      resultDescTxt.y = canvasH / 0x64 * 0x2c;
      itemExit[_0x1c97(0x151)] = !![];
      itemExitP[_0x1c97(0x151)] = ![];
      buttonConfirm.x = canvasW / 0x2 - 0x8c;
      buttonConfirm.y = canvasH / 0x64 * 0x44;
      buttonCancel.x = canvasW / 0x2 + 0x8c;
      buttonCancel.y = canvasH / 0x64 * 0x44;
      popTitleTxt.x = canvasW / 0x2;
      popTitleTxt.y = canvasH / 0x64 * 0x23;
      popDescTxt.x = canvasW / 0x2;
      popDescTxt.y = canvasH / 0x64 * 0x2d;
      $(_0x1c97(0x20f))[_0x1c97(0x243)]('forPortrait');
      $(_0x1c97(0x267)).removeClass('forPortrait');
      $(_0x1c97(0x199)).attr(_0x1c97(0x16b), 0xa);
      $(_0x1c97(0x1b7)).attr(_0x1c97(0x16b), 0xa);
      $(_0x1c97(0x12b))[_0x1c97(0x11a)](_0x1c97(0x218), 0xa);
    } else {
      bg[_0x1c97(0x151)] = ![];
      bgP[_0x1c97(0x151)] = !![];
      logo.visible = ![];
      logoP[_0x1c97(0x151)] = !![];
      buttonStart.x = canvasW / 0x2;
      buttonStart.y = canvasH / 0x64 * 0x4b;
      itemResult[_0x1c97(0x151)] = ![];
      itemResultP[_0x1c97(0x151)] = !![];
      buttonContinue.x = canvasW / 0x2;
      buttonContinue.y = canvasH / 0x64 * 0x40;
      shareContainer.x = shareSaveContainer.x = canvasW / 0x2;
      shareContainer.y = shareSaveContainer.y = canvasH / 0x64 * 0x31;
      resultTitleTxt.x = canvasW / 0x2;
      resultTitleTxt.y = canvasH / 0x64 * 0x26;
      resultDescTxt.x = canvasW / 0x2;
      resultDescTxt.y = canvasH / 0x64 * 0x2e;
      itemExit[_0x1c97(0x151)] = ![];
      itemExitP[_0x1c97(0x151)] = !![];
      buttonConfirm.x = canvasW / 0x2 - 0x82;
      buttonConfirm.y = canvasH / 0x64 * 0x40;
      buttonCancel.x = canvasW / 0x2 + 0x82;
      buttonCancel.y = canvasH / 0x64 * 0x40;
      popTitleTxt.x = canvasW / 0x2;
      popTitleTxt.y = canvasH / 0x64 * 0x26;
      popDescTxt.x = canvasW / 0x2;
      popDescTxt.y = canvasH / 0x64 * 0x30;
      $('#roomWrapper')[_0x1c97(0x1c7)]('forPortrait');
      $(_0x1c97(0x267))[_0x1c97(0x1c7)](_0x1c97(0x2a8));
      $('#roomlists')[_0x1c97(0x11a)](_0x1c97(0x16b), 0x8);
      $('#namelists').attr('size', 0x8);
      $(_0x1c97(0x12b))[_0x1c97(0x11a)](_0x1c97(0x218), 0x6);
    }
  }
}
function resizeCanvas() {
  if (canvasContainer != undefined) {
    buttonSettings.x = canvasW - 0x0 - 0x32;
    buttonSettings.y = 0x0 + 0x2d;
    if (curPage != 'game') {
      buttonExit[_0x1c97(0x151)] = ![];
      buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
      buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y + 0x3c;
      buttonSoundOn.x = buttonSoundOff.x;
      buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y + 0x3c;
      buttonFullscreen.x = buttonSettings.x;
      buttonFullscreen.y = buttonSettings.y + 0x3c * 0x2;
    } else {
      buttonExit[_0x1c97(0x151)] = !![];
      buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
      buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y + 0x3c;
      buttonSoundOn.x = buttonSoundOff.x;
      buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y + 0x3c;
      buttonFullscreen.x = buttonSettings.x;
      buttonFullscreen.y = buttonSettings.y + 0x3c * 0x2;
      buttonExit.x = buttonSettings.x;
      buttonExit.y = buttonSettings.y + 0x3c * 0x3;
    }
    resizeSocketLog();
    resizeGameLayout();
  }
}
function removeGameCanvas() {
  stage[_0x1c97(0x1b1)] = !![];
  stage[_0x1c97(0x26c)]();
  stage[_0x1c97(0x21e)]();
  createjs[_0x1c97(0x189)][_0x1c97(0x1af)](_0x1c97(0x248), tick);
  createjs.Ticker[_0x1c97(0x1af)](_0x1c97(0x248), stage);
}
function tick(_0x2a4a76) {
  updateGame();
  stage.update(_0x2a4a76);
}
function centerReg(_0x5353e2) {
  _0x5353e2.regX = _0x5353e2[_0x1c97(0x123)][_0x1c97(0x21b)] / 0x2;
  _0x5353e2[_0x1c97(0x1d1)] = _0x5353e2[_0x1c97(0x123)][_0x1c97(0x299)] / 0x2;
}
function createHitarea(_0xb24aed) {
  _0xb24aed[_0x1c97(0x2ac)] = new createjs[_0x1c97(0x1c3)](new createjs[_0x1c97(0x25c)]().beginFill('#000')[_0x1c97(0x1d8)](0x0, 0x0, _0xb24aed[_0x1c97(0x123)][_0x1c97(0x21b)], _0xb24aed[_0x1c97(0x123)][_0x1c97(0x299)]));
}
const sketchAnswers = ['BOAT', 'VENON', _0x1c97(0x28b), _0x1c97(0x188), _0x1c97(0x217), _0x1c97(0x28f), _0x1c97(0x1e7), _0x1c97(0x1f1), _0x1c97(0x1a4), _0x1c97(0x18e), _0x1c97(0x26a), _0x1c97(0x288), _0x1c97(0x21c), _0x1c97(0x2ad), _0x1c97(0x254), _0x1c97(0x1e4), 'ROCKET', _0x1c97(0x211), _0x1c97(0x138), 'CARROT'];
const gameSettings = {
  'totalRound': 0x1,
  'randomAnswer': !![],
  'keyboard': ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
  'keyWidth': 0x3c,
  'keyHeight': 0x3c,
  'keySpace': 0x5,
  'blankColor': _0x1c97(0x19e),
  'correctColor': _0x1c97(0x1b0),
  'keyColor': _0x1c97(0x19e),
  'keyDisabledColor': _0x1c97(0x2b3),
  'keyFontSize': 0x23,
  'keyboardLayout': [['', '', '', '', '', '', _0x1c97(0x184)], ['', '', '', '', '', '', '']],
  'strokeNum': 0x5,
  'strokeColor': _0x1c97(0x1b0),
  'score': 0x1f4,
  'timer': 0xea60
};
const textStrings = {
  'startDraw': _0x1c97(0x255),
  'playerTurn': _0x1c97(0x159),
  'playerTurnIsDrawing': _0x1c97(0x20d),
  'playerIsDrawing': _0x1c97(0x1a5),
  'playerScore': _0x1c97(0x14b),
  'timer': _0x1c97(0x291),
  'timeUp': _0x1c97(0x206),
  'correct': _0x1c97(0x279),
  'playerCorrect': _0x1c97(0x2b6),
  'roundComplete': "ROUND COMPLETE!",
  'exitTitle': "EXIT GAME",
  'exitMessage': _0x1c97(0x132),
  'share': _0x1c97(0x13a),
  'resultTitle': _0x1c97(0x19b),
  'resultDesc': '[NUMBER]PTS'
};
const shareSettings = {
  'enable': !![],
  'options': [_0x1c97(0x25f), 'twitter', 'whatsapp', _0x1c97(0x20c), _0x1c97(0x224), _0x1c97(0x165)],
  'shareTitle': "Highscore onGuess the Sketch is [SCORE]pts",
  'shareText': _0x1c97(0x139),
  'customScore': !![],
  'gtag': !![]
};
$[_0x1c97(0x1fd)] = {
  'enable': ![]
};
const playerData = {
  'score': 0x0
};
const gameData = {
  'paused': !![],
  'seq': [],
  'seqNum': 0x0,
  'round': 0x0,
  'answerNum': 0x0,
  'drawing': ![],
  'lineData': {
    'x': 0x0,
    'y': 0x0
  },
  'complete': ![]
};
const timeData = {
  'enable': ![],
  'startDate': null,
  'nowDate': null,
  'timer': 0x0,
  'oldTimer': 0x0
};
const tweenData = {
  'score': 0x0,
  'tweenScore': 0x0
};
function buildGameButton() {
  $(window)[_0x1c97(0x21d)](function () {
    if (!buttonSoundOn[_0x1c97(0x151)]) {
      toggleSoundInMute(![]);
    }
    if (typeof buttonMusicOn != _0x1c97(0x257)) {
      if (!buttonMusicOn[_0x1c97(0x151)]) {
        toggleMusicInMute(![]);
      }
    }
  });
  $(window)[_0x1c97(0x1a3)](function () {
    if (!buttonSoundOn[_0x1c97(0x151)]) {
      toggleSoundInMute(!![]);
    }
    if (typeof buttonMusicOn != _0x1c97(0x257)) {
      if (!buttonMusicOn[_0x1c97(0x151)]) {
        toggleMusicInMute(!![]);
      }
    }
  });
  if (isDesktop) {
    var _0x5e2e89 = window[_0x1c97(0x135)] != window[_0x1c97(0x2b1)][_0x1c97(0x135)] ? !![] : ![];
    if (_0x5e2e89) {
      this[_0x1c97(0x1c5)][_0x1c97(0x1de)] = keydown;
      this[_0x1c97(0x1c5)][_0x1c97(0x23a)] = keyup;
      $(window)[_0x1c97(0x1a3)](function () {
        appendFocusFrame();
      });
      appendFocusFrame();
    } else {
      this[_0x1c97(0x1c5)][_0x1c97(0x1de)] = keydown;
      this[_0x1c97(0x1c5)][_0x1c97(0x23a)] = keyup;
    }
  }
  if (audioOn) {
    if (muteSoundOn) {
      toggleSoundMute(!![]);
    }
    if (muteMusicOn) {
      toggleMusicMute(!![]);
    }
  }
  buttonStart[_0x1c97(0x27f)] = _0x1c97(0x25e);
  buttonStart[_0x1c97(0x1b9)]('click', function (_0x3f32c1) {
    playSound(_0x1c97(0x1d3));
    if (typeof initSocket == _0x1c97(0x1a7) && multiplayerSettings[_0x1c97(0x129)]) {
      checkQuickGameMode();
    }
  });
  itemExit[_0x1c97(0x1b9)](_0x1c97(0x2a7), function (_0x59be6c) {});
  buttonContinue.cursor = _0x1c97(0x25e);
  buttonContinue.addEventListener(_0x1c97(0x2a7), function (_0x2b82eb) {
    playSound(_0x1c97(0x1d3));
    if (typeof initSocket == _0x1c97(0x1a7) && multiplayerSettings[_0x1c97(0x129)] && socketData[_0x1c97(0x191)] && multiplayerSettings[_0x1c97(0x125)]) {
      goPage(_0x1c97(0x226));
      $(_0x1c97(0x199))[_0x1c97(0x278)](socketData[_0x1c97(0x1a1)]);
      joinSocketRoom();
    } else {
      goPage(_0x1c97(0x154));
    }
  });
  if (shareSettings[_0x1c97(0x129)]) {
    buttonShare[_0x1c97(0x27f)] = _0x1c97(0x25e);
    buttonShare[_0x1c97(0x1b9)](_0x1c97(0x2a7), function (_0x482517) {
      playSound(_0x1c97(0x1d3));
      toggleSocialShare(!![]);
    });
    for (let _0xfb2a64 = 0x0; _0xfb2a64 < shareSettings[_0x1c97(0x229)].length; _0xfb2a64++) {
      $[_0x1c97(0x16f)][_0x1c97(0x28c) + _0xfb2a64][_0x1c97(0x27f)] = 'pointer';
      $[_0x1c97(0x16f)][_0x1c97(0x28c) + _0xfb2a64][_0x1c97(0x1b9)](_0x1c97(0x2a7), function (_0xdf17ac) {
        shareLinks(_0xdf17ac.target.shareOption, gameData[_0x1c97(0x1f8)] + 0x1);
      });
    }
  }
  buttonSoundOff[_0x1c97(0x27f)] = _0x1c97(0x25e);
  buttonSoundOff[_0x1c97(0x1b9)](_0x1c97(0x2a7), function (_0x24498e) {
    toggleSoundMute(!![]);
  });
  buttonSoundOn[_0x1c97(0x27f)] = 'pointer';
  buttonSoundOn[_0x1c97(0x1b9)]('click', function (_0x22fc0f) {
    toggleSoundMute(![]);
  });
  if (typeof buttonMusicOff != 'undefined') {
    buttonMusicOff[_0x1c97(0x27f)] = _0x1c97(0x25e);
    buttonMusicOff[_0x1c97(0x1b9)](_0x1c97(0x2a7), function (_0x7d4bd6) {
      toggleMusicMute(!![]);
    });
  }
  if (typeof buttonMusicOn != 'undefined') {
    buttonMusicOn[_0x1c97(0x27f)] = 'pointer';
    buttonMusicOn.addEventListener(_0x1c97(0x2a7), function (_0xacfca1) {
      toggleMusicMute(![]);
    });
  }
  buttonFullscreen[_0x1c97(0x27f)] = _0x1c97(0x25e);
  buttonFullscreen[_0x1c97(0x1b9)](_0x1c97(0x2a7), function (_0x582b30) {
    toggleFullScreen();
  });
  buttonExit[_0x1c97(0x27f)] = _0x1c97(0x25e);
  buttonExit[_0x1c97(0x1b9)](_0x1c97(0x2a7), function (_0x52c69b) {
    togglePop(!![]);
    toggleOptions();
  });
  buttonSettings[_0x1c97(0x27f)] = _0x1c97(0x25e);
  buttonSettings[_0x1c97(0x1b9)](_0x1c97(0x2a7), function (_0x45eacb) {
    toggleOptions();
  });
  buttonConfirm[_0x1c97(0x27f)] = _0x1c97(0x25e);
  buttonConfirm[_0x1c97(0x1b9)](_0x1c97(0x2a7), function (_0x64e0e6) {
    playSound(_0x1c97(0x1d3));
    togglePop(![]);
    stopSound();
    stopGame();
    goPage(_0x1c97(0x154));
    if (typeof initSocket == _0x1c97(0x1a7) && multiplayerSettings[_0x1c97(0x129)] && socketData.online) {
      exitSocketRoom();
    }
  });
  buttonCancel[_0x1c97(0x27f)] = _0x1c97(0x25e);
  buttonCancel[_0x1c97(0x1b9)](_0x1c97(0x2a7), function (_0x19c5a4) {
    playSound(_0x1c97(0x1d3));
    togglePop(![]);
  });
  for (var _0xba151f = 0x0; _0xba151f < sketchAnswers[_0x1c97(0x1e8)]; _0xba151f++) {
    gameData[_0x1c97(0x1ea)][_0x1c97(0x266)](_0xba151f);
  }
}
function toggleMainButton(_0x5e019c) {
  if (typeof initSocket == _0x1c97(0x1a7) && multiplayerSettings[_0x1c97(0x129)]) {
    gameLogsTxt[_0x1c97(0x151)] = !![];
    gameLogsTxt[_0x1c97(0x10f)] = '';
  }
  buttonStart[_0x1c97(0x151)] = ![];
  if (_0x5e019c == 'start') {
    buttonStart[_0x1c97(0x151)] = !![];
  }
}
function checkQuickGameMode() {
  socketData[_0x1c97(0x191)] = !![];
  if (!multiplayerSettings[_0x1c97(0x1c0)]) {
    buttonStart[_0x1c97(0x151)] = ![];
    addSocketRandomUser();
  } else {
    goPage(_0x1c97(0x1c9));
  }
}
function resizeSocketLog() {
  if (curPage == _0x1c97(0x154)) {
    if (viewport[_0x1c97(0x16d)]) {
      gameLogsTxt.x = canvasW / 0x2;
      gameLogsTxt.y = canvasH / 0x64 * 0x4b;
    } else {
      gameLogsTxt.x = canvasW / 0x2;
      gameLogsTxt.y = canvasH / 0x64 * 0x4b;
    }
  } else if (curPage == _0x1c97(0x149)) {
    if (viewport[_0x1c97(0x16d)]) {
      gameLogsTxt.x = canvasW / 0x2;
      gameLogsTxt.y = canvasH / 0x64 * 0x43;
    } else {
      gameLogsTxt.x = canvasW / 0x2;
      gameLogsTxt.y = canvasH / 0x64 * 0x41;
    }
  }
}
function appendFocusFrame() {
  $(_0x1c97(0x2b2))[_0x1c97(0x1ca)](_0x1c97(0x253));
  $(_0x1c97(0x2a4))[_0x1c97(0x2a7)](function () {
    $('#focus')[_0x1c97(0x184)]();
  });
}
function keydown(_0x4915bd) {
  var _0x4eebd3 = String[_0x1c97(0x17a)](_0x4915bd[_0x1c97(0x2a0)]);
  if (_0x4915bd[_0x1c97(0x1f7)] == 0x8) {
    removeKeyboard();
  } else {
    matchKeyboard(_0x4eebd3[_0x1c97(0x1d9)]());
  }
}
function keyup(_0x296be0) {}
function toggleSocialShare(_0x4a665d) {
  if (!shareSettings[_0x1c97(0x129)]) {
    return;
  }
  buttonShare[_0x1c97(0x151)] = _0x4a665d == !![] ? ![] : !![];
  shareSaveContainer[_0x1c97(0x151)] = _0x4a665d == !![] ? ![] : !![];
  socialContainer[_0x1c97(0x151)] = _0x4a665d;
  if (_0x4a665d) {
    if (typeof buttonSave !== _0x1c97(0x257)) {
      TweenMax.to(buttonShare, 0x3, {
        'overwrite': !![],
        'onComplete': toggleSocialShare,
        'onCompleteParams': [![]]
      });
    }
  }
}
function positionShareButtons() {
  if (!shareSettings.enable) {
    return;
  }
  if (typeof buttonShare !== _0x1c97(0x257)) {
    if (typeof buttonSave !== _0x1c97(0x257)) {
      if (buttonSave[_0x1c97(0x151)]) {
        buttonShare.x = -(buttonShare[_0x1c97(0x123)][_0x1c97(0x21b)] / 0x2 + 0x5);
        buttonSave.x = buttonShare[_0x1c97(0x123)].naturalWidth / 0x2 + 0x5;
      } else {
        buttonShare.x = 0x0;
      }
    }
  }
}
function togglePop(_0x877756) {
  exitContainer[_0x1c97(0x151)] = _0x877756;
  if (typeof initSocket == 'function' && multiplayerSettings.enable && socketData[_0x1c97(0x191)]) {
    if (curPage == _0x1c97(0x1c9) || curPage == _0x1c97(0x226)) {
      if (_0x877756) {
        $('#roomWrapper')[_0x1c97(0x15c)]();
      } else {
        $('#roomWrapper')[_0x1c97(0x142)]();
      }
    }
  }
}
var curPage = '';
function goPage(_0x5c7487) {
  curPage = _0x5c7487;
  $('#roomWrapper')[_0x1c97(0x15c)]();
  $(_0x1c97(0x29c))[_0x1c97(0x15c)]();
  gameLogsTxt[_0x1c97(0x151)] = ![];
  mainContainer[_0x1c97(0x151)] = ![];
  nameContainer.visible = ![];
  roomContainer[_0x1c97(0x151)] = ![];
  gameContainer[_0x1c97(0x151)] = ![];
  resultContainer[_0x1c97(0x151)] = ![];
  togglePop(![]);
  toggleOptions(![]);
  var _0x2e780c = null;
  switch (_0x5c7487) {
    case _0x1c97(0x154):
      _0x2e780c = mainContainer;
      toggleMainButton(_0x1c97(0x1e0));
      break;
    case _0x1c97(0x1c9):
      _0x2e780c = nameContainer;
      $(_0x1c97(0x20f))[_0x1c97(0x142)]();
      $(_0x1c97(0x1bc)).show();
      $(_0x1c97(0x1b8))[_0x1c97(0x148)]('');
      $(_0x1c97(0x12e))[_0x1c97(0x142)]();
      break;
    case 'room':
      _0x2e780c = roomContainer;
      $('#roomWrapper')[_0x1c97(0x142)]();
      $(_0x1c97(0x15d))[_0x1c97(0x142)]();
      switchSocketRoomContent('lists');
      break;
    case 'game':
      _0x2e780c = gameContainer;
      startGame();
      break;
    case _0x1c97(0x15e):
      _0x2e780c = resultContainer;
      stopGame();
      togglePop(![]);
      playSound(_0x1c97(0x298));
      if (typeof initSocket == _0x1c97(0x1a7) && multiplayerSettings[_0x1c97(0x129)] && socketData[_0x1c97(0x191)]) {
        playerData[_0x1c97(0x26b)] = $[_0x1c97(0x28d)][_0x1c97(0x120) + socketData[_0x1c97(0x2a2)]].score;
        tweenData[_0x1c97(0x26b)] = 0x0;
        TweenMax.to(tweenData, 0.5, {
          'tweenScore': playerData[_0x1c97(0x26b)],
          'overwrite': !![],
          'onUpdate': function () {
            resultDescTxt.text = textStrings[_0x1c97(0x161)][_0x1c97(0x172)](_0x1c97(0x290), addCommas(Math.floor(tweenData[_0x1c97(0x2a1)])));
          }
        });
        if (socketData[_0x1c97(0x13e)]) {
          postSocketCloseRoom();
        } else {
          exitSocketRoom();
        }
        saveGame(0x0);
      }
      break;
  }
  if (_0x2e780c != null) {
    _0x2e780c[_0x1c97(0x151)] = !![];
    _0x2e780c[_0x1c97(0x1f6)] = 0x0;
    TweenMax.to(_0x2e780c, 0.5, {
      'alpha': 0x1,
      'overwrite': !![]
    });
  }
  resizeCanvas();
}
function startGame() {
  gameData[_0x1c97(0x212)] = ![];
  gameData[_0x1c97(0x20e)] = 0x0;
  gameData.seqNum = 0x0;
  gameData[_0x1c97(0x223)] = 0x0;
  for (var _0x409bff = 0x0; _0x409bff < 0x4; _0x409bff++) {
    $[_0x1c97(0x28d)][_0x1c97(0x120) + _0x409bff].score = 0x0;
  }
  loadSketchAnswer();
}
function stopGame() {
  gameData.paused = !![];
  TweenMax.killAll(![], !![], ![]);
}
function saveGame(_0x38ec82) {
  if (typeof toggleScoreboardSave == _0x1c97(0x1a7)) {
    $.scoreData[_0x1c97(0x26b)] = _0x38ec82;
    if (typeof type != _0x1c97(0x257)) {
      $[_0x1c97(0x197)][_0x1c97(0x219)] = type;
    }
    toggleScoreboardSave(!![]);
  }
}
function buildPlayers() {
  for (var _0x8981e8 = 0x0; _0x8981e8 < 0x4; _0x8981e8++) {
    $[_0x1c97(0x28d)][_0x1c97(0x1ab) + _0x8981e8][_0x1c97(0x26c)]();
  }
}
function resizeGameLayout() {
  for (var _0x21195c = 0x0; _0x21195c < 0x4; _0x21195c++) {
    $[_0x1c97(0x28d)][_0x1c97(0x120) + _0x21195c][_0x1c97(0x151)] = ![];
    if (_0x21195c < gameData[_0x1c97(0x22a)]) {
      $[_0x1c97(0x28d)]['gamePlayerContainer' + _0x21195c][_0x1c97(0x151)] = !![];
    }
  }
  if (viewport.isLandscape) {
    boardContainer.x = canvasW / 0x2;
    boardContainer.y = canvasH / 0x64 * 0x27;
    blankContainer.y = canvasH / 0x64 * 0x19;
    keyContainer.y = canvasH / 0x64 * 0x2b;
    $[_0x1c97(0x28d)][_0x1c97(0x120) + 0x0].x = canvasW / 0x2 - 0x17c;
    $.players['gamePlayerContainer' + 0x1].x = canvasW / 0x2 + 0x17c;
    $.players[_0x1c97(0x120) + 0x2].x = canvasW / 0x2 - 0x17c;
    $[_0x1c97(0x28d)][_0x1c97(0x120) + 0x3].x = canvasW / 0x2 + 0x17c;
    if (gameData.totalplayers <= 0x2) {
      $[_0x1c97(0x28d)][_0x1c97(0x120) + 0x0].y = canvasH / 0x2 - 0x46;
      $[_0x1c97(0x28d)][_0x1c97(0x120) + 0x1].y = canvasH / 0x2 - 0x46;
    } else {
      $[_0x1c97(0x28d)][_0x1c97(0x120) + 0x0].y = canvasH / 0x2 - 0x46;
      $[_0x1c97(0x28d)][_0x1c97(0x120) + 0x1].y = canvasH / 0x2 - 0x46;
      $.players[_0x1c97(0x120) + 0x2].y = canvasH / 0x2 + 0x46;
      $.players[_0x1c97(0x120) + 0x3].y = canvasH / 0x2 + 0x46;
    }
  } else {
    boardContainer.x = canvasW / 0x2;
    boardContainer.y = canvasH / 0x64 * 0x1e;
    blankContainer.y = canvasH / 0x64 * 0x12;
    keyContainer.y = canvasH / 0x64 * 0x3b;
    if (gameData.totalplayers <= 0x2) {
      keyContainer.y = canvasH / 0x64 * 0x2d;
    }
    $[_0x1c97(0x28d)][_0x1c97(0x120) + 0x0].x = canvasW / 0x2 - 0x78;
    $[_0x1c97(0x28d)][_0x1c97(0x120) + 0x1].x = canvasW / 0x2 + 0x78;
    $.players[_0x1c97(0x120) + 0x2].x = canvasW / 0x2 - 0x78;
    $[_0x1c97(0x28d)][_0x1c97(0x120) + 0x3].x = canvasW / 0x2 + 0x78;
    $.players[_0x1c97(0x120) + 0x0].y = canvasH / 0x64 * 0x39;
    $[_0x1c97(0x28d)][_0x1c97(0x120) + 0x1].y = canvasH / 0x64 * 0x39;
    $[_0x1c97(0x28d)][_0x1c97(0x120) + 0x2].y = canvasH / 0x64 * 0x46;
    $.players[_0x1c97(0x120) + 0x3].y = canvasH / 0x64 * 0x46;
  }
}
function loadSketchAnswer() {
  blankContainer[_0x1c97(0x26c)]();
  keyContainer[_0x1c97(0x26c)]();
  boardDrawing.graphics[_0x1c97(0x20b)]();
  drawContainer[_0x1c97(0x1ad)](-(gameData[_0x1c97(0x221)] / 0x2), -(gameData[_0x1c97(0x13f)] / 0x2), gameData[_0x1c97(0x221)], gameData[_0x1c97(0x13f)]);
  gameStatusContainer[_0x1c97(0x1f6)] = 0x0;
  playSound(_0x1c97(0x193));
  gameData[_0x1c97(0x22f)] = ![];
  gameData[_0x1c97(0x20e)] = gameData[_0x1c97(0x1ea)][0x0];
  gameData[_0x1c97(0x133)] = sketchAnswers[0x0][_0x1c97(0x1d9)]();
  gameData[_0x1c97(0x2b4)] = [];
  gameData[_0x1c97(0x118)] = [];
  gameData[_0x1c97(0x157)] = [];
  gameData.answers = [];
  console[_0x1c97(0x170)](gameData[_0x1c97(0x133)]);
  for (var _0x1f26ab = 0x0; _0x1f26ab < gameData[_0x1c97(0x133)][_0x1c97(0x1e8)]; _0x1f26ab++) {
    var _0x1bbc8a = insertTextType(_0x1c97(0x19f), gameData.sketchAnswer.substring(_0x1f26ab, _0x1f26ab + 0x1));
    _0x1bbc8a[_0x1c97(0x239)] = _0x1f26ab;
    blankContainer.addChild(_0x1bbc8a);
    gameData.blanks[_0x1c97(0x266)](_0x1bbc8a);
    gameData[_0x1c97(0x157)].push(gameData[_0x1c97(0x133)].substring(_0x1f26ab, _0x1f26ab + 0x1));
  }
  shuffle(gameSettings[_0x1c97(0x118)]);
  gameData.letterNum = 0x0;
  for (var _0x1f26ab = 0x0; _0x1f26ab < gameSettings[_0x1c97(0x27b)][_0x1c97(0x1e8)]; _0x1f26ab++) {
    for (var _0xc2668c = 0x0; _0xc2668c < gameSettings.keyboardLayout[_0x1f26ab].length; _0xc2668c++) {
      if (gameSettings[_0x1c97(0x27b)][_0x1f26ab][_0xc2668c] != _0x1c97(0x184)) {
        gameData[_0x1c97(0x157)].push(gameSettings.keyboard[gameData[_0x1c97(0x112)]]);
        gameData.letterNum++;
      }
    }
  }
  gameData.letters[_0x1c97(0x1e8)] = gameData[_0x1c97(0x112)];
  shuffle(gameData[_0x1c97(0x157)]);
  var _0x6e0ba1 = 0x0;
  var _0x5daf27 = 0x0;
  for (var _0x1f26ab = 0x0; _0x1f26ab < gameSettings.keyboardLayout[_0x1c97(0x1e8)]; _0x1f26ab++) {
    for (var _0xc2668c = 0x0; _0xc2668c < gameSettings[_0x1c97(0x27b)][_0x1f26ab][_0x1c97(0x1e8)]; _0xc2668c++) {
      var _0x1bbc8a;
      if (gameSettings[_0x1c97(0x27b)][_0x1f26ab][_0xc2668c] == 'remove') {
        _0x1bbc8a = insertTextType(_0x1c97(0x198), gameSettings[_0x1c97(0x27b)][_0x1f26ab][_0xc2668c]);
      } else {
        _0x1bbc8a = insertTextType(_0x1c97(0x198), gameData[_0x1c97(0x157)][_0x6e0ba1]);
        _0x6e0ba1++;
      }
      _0x1bbc8a[_0x1c97(0x239)] = _0x5daf27;
      _0x5daf27++;
      keyContainer.addChild(_0x1bbc8a);
      gameData[_0x1c97(0x118)][_0x1c97(0x266)](_0x1bbc8a);
    }
  }
  timeData[_0x1c97(0x178)] = -0x1;
  timeData[_0x1c97(0x12a)] = gameSettings[_0x1c97(0x1fe)];
  timerTxt[_0x1c97(0x10f)] = timerRedTxt.text = millisecondsToTimeGame(timeData[_0x1c97(0x12a)]);
  timerRedTxt[_0x1c97(0x1f6)] = 0x0;
  positionLayout();
  resetPlayers();
}
function displayPlayerTurn() {
  $[_0x1c97(0x28d)][_0x1c97(0x275) + socketData[_0x1c97(0x2a2)]][_0x1c97(0x151)] = !![];
  focusPlayer(gameData[_0x1c97(0x1c8)]);
  if (socketData[_0x1c97(0x237)]) {
    disabledKeyboard();
    keyContainer[_0x1c97(0x151)] = ![];
    drawStatusTxt[_0x1c97(0x10f)] = textStrings[_0x1c97(0x121)];
    showGameStatus(_0x1c97(0x1dc));
    TweenMax.to(gameData, 0x3, {
      'overwrite': !![],
      'onComplete': function () {
        setupStageEvents();
        toggleGameTimer(!![]);
      }
    });
  } else {
    keyContainer[_0x1c97(0x151)] = !![];
    drawStatusTxt[_0x1c97(0x10f)] = textStrings[_0x1c97(0x141)][_0x1c97(0x172)](_0x1c97(0x15f), $[_0x1c97(0x28d)][_0x1c97(0x11d) + gameData.player][_0x1c97(0x10f)]);
    showGameStatus('playerTurn', gameData[_0x1c97(0x1c8)]);
  }
}
function resetPlayers() {
  for (var _0x3dde8d = 0x0; _0x3dde8d < 0x4; _0x3dde8d++) {
    $[_0x1c97(0x28d)]['gamePlayerContainer' + _0x3dde8d][_0x1c97(0x181)] = [];
    $[_0x1c97(0x28d)][_0x1c97(0x120) + _0x3dde8d][_0x1c97(0x111)] = $.players[_0x1c97(0x120) + _0x3dde8d][_0x1c97(0x1ae)] = 0x1;
    $[_0x1c97(0x28d)][_0x1c97(0x183) + _0x3dde8d][_0x1c97(0x151)] = ![];
    $.players[_0x1c97(0x275) + _0x3dde8d][_0x1c97(0x151)] = ![];
    $[_0x1c97(0x28d)][_0x1c97(0x11d) + _0x3dde8d][_0x1c97(0x11c)] = _0x1c97(0x19e);
    $.players[_0x1c97(0x2ae) + _0x3dde8d][_0x1c97(0x11c)] = _0x1c97(0x1a6);
    $[_0x1c97(0x28d)][_0x1c97(0x2ae) + _0x3dde8d][_0x1c97(0x1f6)] = 0x1;
    $.players[_0x1c97(0x11e) + _0x3dde8d].removeAllChildren();
    $.players['gameScore' + _0x3dde8d][_0x1c97(0x10f)] = textStrings[_0x1c97(0x174)][_0x1c97(0x172)](_0x1c97(0x290), addCommas($[_0x1c97(0x28d)][_0x1c97(0x120) + _0x3dde8d][_0x1c97(0x26b)]));
  }
}
function focusPlayer(_0x828010) {
  $[_0x1c97(0x28d)][_0x1c97(0x183) + _0x828010].visible = !![];
  $.players[_0x1c97(0x11d) + _0x828010][_0x1c97(0x11c)] = _0x1c97(0x164);
  $[_0x1c97(0x28d)][_0x1c97(0x2ae) + _0x828010][_0x1c97(0x11c)] = '#fff';
  $.players[_0x1c97(0x120) + _0x828010][_0x1c97(0x111)] = $[_0x1c97(0x28d)][_0x1c97(0x120) + _0x828010].scaleY = 0.5;
  TweenMax.to($[_0x1c97(0x28d)][_0x1c97(0x120) + _0x828010], 0x1, {
    'scaleX': 0x1,
    'scaleY': 0x1,
    'ease': Elastic[_0x1c97(0x2af)],
    'overwrite': !![]
  });
}
function disabledKeyboard() {
  for (var _0x41137b = 0x0; _0x41137b < gameData[_0x1c97(0x2b4)][_0x1c97(0x1e8)]; _0x41137b++) {
    gameData[_0x1c97(0x2b4)][_0x41137b][_0x1c97(0x10f)][_0x1c97(0x10f)] = gameData.sketchAnswer.substring(_0x41137b, _0x41137b + 0x1);
    gameData[_0x1c97(0x2b4)][_0x41137b].bgH.visible = !![];
    gameData.blanks[_0x41137b][_0x1c97(0x10f)][_0x1c97(0x11c)] = gameSettings[_0x1c97(0x14f)];
  }
  for (var _0x41137b = 0x0; _0x41137b < gameData.keyboard.length; _0x41137b++) {
    var _0xe17613 = gameData[_0x1c97(0x118)][_0x41137b];
    _0xe17613[_0x1c97(0x136)].visible = !![];
  }
}
function fillPlayerAnswer(_0xf68428, _0x50fde6, _0xf5249a) {
  $[_0x1c97(0x28d)][_0x1c97(0x11e) + _0xf68428][_0x1c97(0x26c)]();
  var _0x1f5b5d = [];
  for (var _0x339e37 = 0x0; _0x339e37 < _0x50fde6[_0x1c97(0x1e8)]; _0x339e37++) {
    var _0x3e0380 = insertTextType(_0x1c97(0x19f), _0x50fde6[_0x1c97(0x146)](_0x339e37, _0x339e37 + 0x1));
    _0x3e0380[_0x1c97(0x10f)].text = _0x50fde6[_0x1c97(0x146)](_0x339e37, _0x339e37 + 0x1);
    if (_0xf5249a) {
      _0x3e0380[_0x1c97(0x136)][_0x1c97(0x151)] = !![];
      _0x3e0380[_0x1c97(0x10f)][_0x1c97(0x11c)] = gameSettings[_0x1c97(0x14f)];
    }
    _0x1f5b5d[_0x1c97(0x266)](_0x3e0380);
    $[_0x1c97(0x28d)][_0x1c97(0x11e) + _0xf68428].addChild(_0x3e0380);
  }
  var _0x4362c7 = {
    'x': 0x0,
    'y': 0x0,
    'w': 0x0,
    'h': 0x0
  };
  _0x4362c7.w = gameSettings[_0x1c97(0x1bf)] * (_0x1f5b5d[_0x1c97(0x1e8)] - 0x1);
  _0x4362c7.w += gameSettings[_0x1c97(0x1c2)] * (_0x1f5b5d[_0x1c97(0x1e8)] - 0x1);
  _0x4362c7.x = -(0x0 / 0x2);
  for (var _0x339e37 = 0x0; _0x339e37 < _0x1f5b5d[_0x1c97(0x1e8)]; _0x339e37++) {
    var _0x3f0a04 = _0x1f5b5d[_0x339e37];
    _0x3f0a04.x = 0x0;
    _0x3f0a04.y = 0x0;
    _0x4362c7.x += gameSettings[_0x1c97(0x1bf)] + gameSettings[_0x1c97(0x1c2)];
  }
}
function addPlayerScore(_0x3c0501, _0x36a86b) {
  $[_0x1c97(0x28d)][_0x1c97(0x2ae) + _0x3c0501].text = '+' + textStrings[_0x1c97(0x174)][_0x1c97(0x172)](_0x1c97(0x290), addCommas(Math[_0x1c97(0x1eb)](_0x36a86b)));
  $[_0x1c97(0x28d)][_0x1c97(0x120) + _0x3c0501][_0x1c97(0x26b)] += _0x36a86b;
  $[_0x1c97(0x28d)][_0x1c97(0x120) + _0x3c0501][_0x1c97(0x111)] = $[_0x1c97(0x28d)][_0x1c97(0x120) + _0x3c0501][_0x1c97(0x1ae)] = 0.5;
  TweenMax.to($[_0x1c97(0x28d)]['gamePlayerContainer' + _0x3c0501], 0x1, {
    'scaleX': 0x1,
    'scaleY': 0x1,
    'ease': Elastic[_0x1c97(0x2af)],
    'overwrite': !![]
  });
  var _0x604426 = $[_0x1c97(0x28d)]['gamePlayerContainer' + _0x3c0501].score;
  TweenMax.to($[_0x1c97(0x28d)]['gameScore' + _0x3c0501], 0.5, {
    'alpha': 0x0,
    'overwrite': !![],
    'onComplete': function () {
      TweenMax.to($[_0x1c97(0x28d)]['gameScore' + _0x3c0501], 0.5, {
        'alpha': 0x1,
        'overwrite': !![],
        'onComplete': function () {
          var _0x390c51 = {
            'score': 0x0
          };
          TweenMax.to(_0x390c51, 0x1, {
            'score': _0x604426,
            'overwrite': !![],
            'onUpdate': function () {
              $[_0x1c97(0x28d)][_0x1c97(0x2ae) + _0x3c0501][_0x1c97(0x10f)] = textStrings.playerScore[_0x1c97(0x172)](_0x1c97(0x290), addCommas(Math[_0x1c97(0x1eb)](_0x390c51[_0x1c97(0x26b)])));
            }
          });
        }
      });
    }
  });
}
function insertTextType(_0x3e1df5, _0x40ecc4) {
  var _0x4b6e2d = new createjs.Container();
  var _0x2a180e;
  var _0x3f2886;
  var _0x38f731 = gameSettings[_0x1c97(0x179)];
  if (_0x3e1df5 == _0x1c97(0x19f)) {
    _0x2a180e = new createjs[_0x1c97(0x277)](loader[_0x1c97(0x27c)](_0x1c97(0x1df)));
    centerReg(_0x2a180e);
    _0x3f2886 = new createjs.Bitmap(loader[_0x1c97(0x27c)](_0x1c97(0x18b)));
    centerReg(_0x3f2886);
    _0x40ecc4 = '';
  } else {
    _0x2a180e = new createjs.Bitmap(loader.getResult(_0x1c97(0x270)));
    centerReg(_0x2a180e);
    _0x3f2886 = new createjs.Bitmap(loader[_0x1c97(0x27c)]('itemKeyDisabled'));
    centerReg(_0x3f2886);
    _0x4b6e2d[_0x1c97(0x27f)] = 'pointer';
    _0x4b6e2d[_0x1c97(0x1b9)](_0x1c97(0x2a7), function (_0x587475) {
      if (gameData[_0x1c97(0x22f)]) {
        return;
      }
      if (_0x4b6e2d[_0x1c97(0x136)].visible == ![]) {
        if (_0x587475[_0x1c97(0x168)][_0x1c97(0x284)] == 'remove') {
          removeAnswer();
        } else {
          insertAnswer(_0x587475.currentTarget[_0x1c97(0x239)]);
        }
      }
    });
  }
  if (_0x40ecc4 == 'remove') {
    _0x4b6e2d[_0x1c97(0x284)] = _0x1c97(0x184);
    _0x2a180e = new createjs[_0x1c97(0x277)](loader[_0x1c97(0x27c)]('itemRemove'));
    centerReg(_0x2a180e);
    _0x3f2886 = new createjs.Bitmap(loader[_0x1c97(0x27c)](_0x1c97(0x1f3)));
    centerReg(_0x3f2886);
    _0x40ecc4 = '';
  }
  _0x3f2886[_0x1c97(0x151)] = ![];
  var _0x4a6af5 = new createjs[_0x1c97(0x202)]();
  _0x4a6af5[_0x1c97(0x124)] = 0x23 + _0x1c97(0x1b4);
  _0x4a6af5[_0x1c97(0x11c)] = _0x38f731;
  _0x4a6af5[_0x1c97(0x27e)] = _0x1c97(0x17e);
  _0x4a6af5[_0x1c97(0x1db)] = _0x1c97(0x1cb);
  _0x4a6af5[_0x1c97(0x10f)] = _0x40ecc4;
  _0x4a6af5.y += 0xd;
  _0x4b6e2d.bg = _0x2a180e;
  _0x4b6e2d[_0x1c97(0x136)] = _0x3f2886;
  _0x4b6e2d[_0x1c97(0x10f)] = _0x4a6af5;
  _0x4b6e2d.addChild(_0x2a180e, _0x3f2886, _0x4a6af5);
  return _0x4b6e2d;
}
function matchKeyboard(_0x47e3c2) {
  if (gameData[_0x1c97(0x212)]) {
    return;
  }
  if (gameData.complete) {
    return;
  }
  var _0x1f938a = gameSettings[_0x1c97(0x118)][_0x1c97(0x231)](_0x47e3c2);
  if (_0x1f938a != -0x1) {
    for (var _0x269f7d = 0x0; _0x269f7d < gameData[_0x1c97(0x118)][_0x1c97(0x1e8)]; _0x269f7d++) {
      var _0x4d0e83 = gameData[_0x1c97(0x118)][_0x269f7d];
      if (_0x4d0e83[_0x1c97(0x136)].visible == ![] && _0x4d0e83[_0x1c97(0x10f)].text == _0x47e3c2[_0x1c97(0x1d9)]()) {
        _0x269f7d = gameData[_0x1c97(0x118)].length;
        insertAnswer(_0x4d0e83[_0x1c97(0x239)]);
      }
    }
  }
}
function removeKeyboard() {
  if (gameData[_0x1c97(0x212)]) {
    return;
  }
  if (gameData[_0x1c97(0x22f)]) {
    return;
  }
  removeAnswer();
}
function positionLayout() {
  var _0x1cb63f = {
    'x': 0x0,
    'y': 0x0,
    'w': 0x0,
    'h': 0x0
  };
  _0x1cb63f.w = gameSettings[_0x1c97(0x1bf)] * (gameData[_0x1c97(0x2b4)].length - 0x1);
  _0x1cb63f.w += 0x5 * (gameData.blanks.length - 0x1);
  _0x1cb63f.x = -(_0x1cb63f.w / 0x2);
  for (var _0x433fb3 = 0x0; _0x433fb3 < gameData[_0x1c97(0x2b4)][_0x1c97(0x1e8)]; _0x433fb3++) {
    var _0x5c7179 = gameData[_0x1c97(0x2b4)][_0x433fb3];
    _0x5c7179.x = _0x1cb63f.x;
    _0x5c7179.y = _0x1cb63f.y;
    _0x1cb63f.x += gameSettings[_0x1c97(0x1bf)] + gameSettings[_0x1c97(0x1c2)];
  }
  var _0x1cb63f = {
    'x': 0x0,
    'y': 0x0,
    'w': 0x0,
    'h': 0x0
  };
  _0x1cb63f.h = gameSettings[_0x1c97(0x214)] * gameSettings[_0x1c97(0x27b)].length;
  _0x1cb63f.h = _0x1cb63f.h + gameSettings[_0x1c97(0x1c2)] * (gameSettings[_0x1c97(0x27b)][_0x1c97(0x1e8)] - 0x1);
  _0x1cb63f.y = -(_0x1cb63f.h / 0x2);
  var _0x28af30 = 0x0;
  for (var _0x433fb3 = 0x0; _0x433fb3 < gameSettings[_0x1c97(0x27b)].length; _0x433fb3++) {
    _0x1cb63f.w = gameSettings[_0x1c97(0x1bf)] * (gameSettings[_0x1c97(0x27b)][_0x433fb3].length - 0x1);
    _0x1cb63f.w += gameSettings[_0x1c97(0x1c2)] * (gameSettings[_0x1c97(0x27b)][_0x433fb3].length - 0x1);
    _0x1cb63f.x = -(_0x1cb63f.w / 0x2);
    for (var _0x38afa6 = 0x0; _0x38afa6 < gameSettings[_0x1c97(0x27b)][_0x433fb3][_0x1c97(0x1e8)]; _0x38afa6++) {
      var _0x32e4b1 = gameData[_0x1c97(0x118)][_0x28af30];
      _0x32e4b1.x = _0x1cb63f.x;
      _0x32e4b1.y = _0x1cb63f.y;
      _0x1cb63f.x += 0x3c + gameSettings[_0x1c97(0x1c2)];
      _0x28af30++;
    }
    _0x1cb63f.y += gameSettings[_0x1c97(0x214)] + gameSettings[_0x1c97(0x1c2)];
  }
}
function insertAnswer(_0x37ffba) {
  if (gameData[_0x1c97(0x181)][_0x1c97(0x1e8)] < gameData.blanks[_0x1c97(0x1e8)]) {
    playSound(_0x1c97(0x17f));
    gameData.keyboard[_0x37ffba][_0x1c97(0x151)] = ![];
    gameData[_0x1c97(0x118)][_0x37ffba].bgH.visible = !![];
    gameData[_0x1c97(0x118)][_0x37ffba].text[_0x1c97(0x11c)] = gameSettings[_0x1c97(0x1f5)];
    gameData[_0x1c97(0x181)][_0x1c97(0x266)](_0x37ffba);
  }
  fillAnswers();
}
function removeAnswer() {
  if (gameData[_0x1c97(0x181)].length > 0x0) {
    playSound(_0x1c97(0x16c));
    var _0x5bf61e = gameData[_0x1c97(0x181)][_0x1c97(0x1e8)] - 0x1;
    gameData.keyboard[gameData.answers[_0x5bf61e]][_0x1c97(0x151)] = !![];
    gameData[_0x1c97(0x118)][gameData[_0x1c97(0x181)][_0x5bf61e]].bgH.visible = ![];
    gameData[_0x1c97(0x118)][gameData[_0x1c97(0x181)][_0x5bf61e]].text[_0x1c97(0x11c)] = gameSettings[_0x1c97(0x260)];
    gameData.answers[_0x1c97(0x1c6)](gameData[_0x1c97(0x181)][_0x1c97(0x1e8)] - 0x1, 0x1);
  }
  fillAnswers();
}
function fillAnswers() {
  var _0x4c3050 = '';
  for (var _0x4667f3 = 0x0; _0x4667f3 < gameData[_0x1c97(0x2b4)][_0x1c97(0x1e8)]; _0x4667f3++) {
    gameData[_0x1c97(0x2b4)][_0x4667f3].text[_0x1c97(0x10f)] = '';
    if (_0x4667f3 < gameData[_0x1c97(0x181)][_0x1c97(0x1e8)]) {
      var _0x38ca17 = gameData[_0x1c97(0x181)][_0x4667f3];
      gameData[_0x1c97(0x2b4)][_0x4667f3].text[_0x1c97(0x10f)] = gameData[_0x1c97(0x118)][_0x38ca17][_0x1c97(0x10f)][_0x1c97(0x10f)];
      _0x4c3050 += gameData.keyboard[_0x38ca17][_0x1c97(0x10f)][_0x1c97(0x10f)];
    }
  }
  if (typeof initSocket == _0x1c97(0x1a7) && multiplayerSettings[_0x1c97(0x129)] && socketData.online) {
    postSocketUpdate(_0x1c97(0x2a3), {
      'index': socketData[_0x1c97(0x2a2)],
      'answers': _0x4c3050
    });
  }
}
function animateBounce(_0x22ad1b, _0x4c9a72) {
  TweenMax.to(_0x22ad1b, 0.2, {
    'delay': _0x4c9a72,
    'y': _0x22ad1b[_0x1c97(0x292)] - 0x14,
    'overwrite': !![],
    'onComplete': function () {
      TweenMax.to(_0x22ad1b, 0x1, {
        'y': _0x22ad1b.oriY,
        'overwrite': !![],
        'ease': Elastic[_0x1c97(0x2af)][_0x1c97(0x25b)](0x1, 0.3)
      });
    }
  });
}
function setupStageEvents() {
  stage[_0x1c97(0x1b9)](_0x1c97(0x26e), function (_0x47f9a5) {
    toggleStageEvent(_0x47f9a5, _0x1c97(0x27a));
  });
  stage.addEventListener(_0x1c97(0x1c1), function (_0x589ecc) {
    toggleStageEvent(_0x589ecc, 'move');
  });
  stage.addEventListener('pressup', function (_0x296d34) {
    toggleStageEvent(_0x296d34, 'release');
  });
}
function removeStageEvents() {
  stage[_0x1c97(0x1e6)]('mousedown');
  stage[_0x1c97(0x1e6)]('pressmove');
  stage[_0x1c97(0x1e6)](_0x1c97(0x175));
}
function toggleStageEvent(_0x3be52e, _0x33367a) {
  if (gameData[_0x1c97(0x22f)]) {
    return;
  }
  switch (_0x33367a) {
    case _0x1c97(0x27a):
      var _0x23854b = drawContainer[_0x1c97(0x166)](stage[_0x1c97(0x14a)], stage.mouseY);
      startDrawingLine(_0x23854b.x, _0x23854b.y);
      gameData[_0x1c97(0x173)] = !![];
      if (typeof initSocket == 'function' && multiplayerSettings[_0x1c97(0x129)] && socketData[_0x1c97(0x191)] && socketData[_0x1c97(0x237)]) {
        postSocketUpdate(_0x1c97(0x12f), {
          'x': _0x23854b.x,
          'y': _0x23854b.y
        }, !![]);
      }
      break;
    case _0x1c97(0x29b):
      if (gameData.drawing) {
        var _0x4b9297 = drawContainer[_0x1c97(0x166)](stage[_0x1c97(0x14a)], stage[_0x1c97(0x261)]);
        updateDrawingLine(_0x4b9297.x, _0x4b9297.y);
        if (typeof initSocket == _0x1c97(0x1a7) && multiplayerSettings[_0x1c97(0x129)] && socketData.online && socketData[_0x1c97(0x237)]) {
          postSocketUpdate(_0x1c97(0x18f), {
            'x': _0x4b9297.x,
            'y': _0x4b9297.y
          }, !![]);
        }
      }
      break;
    case _0x1c97(0x2b9):
      gameData[_0x1c97(0x173)] = ![];
      break;
    case _0x1c97(0x18d):
      break;
  }
}
function startDrawingLine(_0xa2b8d3, _0x49d88f) {
  gameData[_0x1c97(0x137)].x = _0xa2b8d3;
  gameData[_0x1c97(0x137)].y = _0x49d88f;
}
function updateDrawingLine(_0x5e1f42, _0x1058ef) {
  boardDrawing[_0x1c97(0x23d)].ss(gameSettings[_0x1c97(0x228)], _0x1c97(0x223)).s(gameSettings[_0x1c97(0x156)]);
  boardDrawing.graphics.mt(gameData.lineData.x, gameData[_0x1c97(0x137)].y);
  boardDrawing[_0x1c97(0x23d)].lt(_0x5e1f42, _0x1058ef);
  gameData.lineData.x = _0x5e1f42;
  gameData[_0x1c97(0x137)].y = _0x1058ef;
  drawContainer.updateCache(_0x1c97(0x130));
  boardDrawing[_0x1c97(0x23d)][_0x1c97(0x20b)]();
}
function animateTimer() {
  timerRedTxt[_0x1c97(0x1f6)] = 0x0;
  TweenMax.to(timerRedTxt, 0.5, {
    'alpha': 0x1,
    'overwrite': !![]
  });
}
function showGameStatus(_0x1c9b56, _0x13df41) {
  if (_0x1c9b56 == _0x1c97(0x1dc)) {
    statusTxt[_0x1c97(0x10f)] = textStrings[_0x1c97(0x1dc)];
  } else {
    if (_0x1c9b56 == 'playerTurn') {
      statusTxt[_0x1c97(0x10f)] = textStrings[_0x1c97(0x2a6)].replace('[PLAYER]', $[_0x1c97(0x28d)][_0x1c97(0x11d) + _0x13df41][_0x1c97(0x10f)]);
    } else {
      if (_0x1c9b56 == 'timer') {
        statusTxt[_0x1c97(0x10f)] = textStrings[_0x1c97(0x153)];
      } else {
        if (_0x1c9b56 == _0x1c97(0x14d)) {
          statusTxt[_0x1c97(0x10f)] = textStrings[_0x1c97(0x14d)];
        } else {
          if (_0x1c9b56 == _0x1c97(0x1cc)) {
            statusTxt[_0x1c97(0x10f)] = textStrings[_0x1c97(0x1cc)][_0x1c97(0x172)](_0x1c97(0x15f), $[_0x1c97(0x28d)][_0x1c97(0x11d) + _0x13df41].text);
          } else if (_0x1c9b56 == _0x1c97(0x22f)) {
            statusTxt.text = textStrings[_0x1c97(0x242)];
          }
        }
      }
    }
  }
  gameStatusContainer[_0x1c97(0x1f6)] = 0x0;
  TweenMax.to(gameStatusContainer, 0.5, {
    'alpha': 0x1,
    'overwrite': !![],
    'onComplete': function () {
      TweenMax.to(gameStatusContainer, 0.5, {
        'delay': 0x2,
        'alpha': 0x0,
        'overwrite': !![]
      });
    }
  });
}
function toggleGameTimer(_0x30bf06) {
  if (_0x30bf06) {
    timeData[_0x1c97(0x160)] = new Date();
  } else {}
  timeData[_0x1c97(0x129)] = _0x30bf06;
}
function updateGame() {
  if (!gameData[_0x1c97(0x212)]) {
    if (timeData.enable) {
      timeData[_0x1c97(0x227)] = new Date();
      timeData[_0x1c97(0x246)] = Math[_0x1c97(0x1eb)](timeData[_0x1c97(0x227)][_0x1c97(0x201)]() - timeData[_0x1c97(0x160)].getTime());
      timeData[_0x1c97(0x1fe)] = Math.floor(timeData[_0x1c97(0x12a)] - timeData[_0x1c97(0x246)]);
      updateTimer();
      if (typeof initSocket == _0x1c97(0x1a7) && multiplayerSettings[_0x1c97(0x129)] && socketData[_0x1c97(0x191)]) {
        postSocketUpdate('updatetimer', timeData[_0x1c97(0x1fe)], !![]);
      }
    }
  }
}
function updateTimer() {
  if (0x0 == -0x1) {
    timeData[_0x1c97(0x178)] = timeData[_0x1c97(0x1fe)];
  }
  if (timeData[_0x1c97(0x1fe)] <= 0x0) {
    showGameStatus(_0x1c97(0x1fe));
    if (typeof initSocket == 'function' && multiplayerSettings[_0x1c97(0x129)] && socketData[_0x1c97(0x191)] && socketData[_0x1c97(0x237)]) {
      endRound();
      postSocketUpdate(_0x1c97(0x2b8), {
        'answers': '',
        'complete': ![]
      });
    }
  } else {
    if (timeData[_0x1c97(0x178)] - timeData[_0x1c97(0x1fe)] > 0x3e8) {
      if (timeData[_0x1c97(0x1fe)] < 0x3e8) {
        animateTimer();
        playSound(_0x1c97(0x280));
      } else if (timeData[_0x1c97(0x1fe)] < 0x1770) {
        animateTimer();
        playSound('soundCountdown');
      }
      timeData[_0x1c97(0x178)] = timeData[_0x1c97(0x1fe)];
    }
    timerTxt[_0x1c97(0x10f)] = timerRedTxt[_0x1c97(0x10f)] = millisecondsToTimeGame(0x0);
  }
}
function endRound() {
  gameData[_0x1c97(0x22f)] = !![];
  removeStageEvents();
  toggleGameTimer(![]);
}
function roundComplete(_0x3dffcf, _0x265dc6) {
  playSound(_0x1c97(0x258));
  var _0x584adc = Math[_0x1c97(0x1eb)](timeData[_0x1c97(0x1fe)] / timeData[_0x1c97(0x12a)] * 0x1f4);
  addPlayerScore(_0x3dffcf, _0x584adc);
  addPlayerScore(_0x265dc6, _0x584adc / 0x2);
}
function endGame() {
  gameData.paused = !![];
  showGameStatus('complete');
  TweenMax.to(gameContainer, 0x4, {
    'overwrite': !![],
    'onComplete': function () {
      goPage(_0x1c97(0x15e));
    }
  });
}
function millisecondsToTimeGame(_0x23f794) {
  var _0x58e5c5 = Math[_0x1c97(0x1eb)](_0x23f794 / 0x3e8 % 0x3c);
  var _0x433a37 = Math.floor(_0x23f794 / (0x3c * 0x3e8) % 0x3c);
  if (_0x58e5c5 < 0xa) {
    _0x58e5c5 = '0' + _0x58e5c5;
  }
  if (_0x433a37 < 0xa) {
    _0x433a37 = '0' + _0x433a37;
  }
  return textStrings.timer[_0x1c97(0x172)](_0x1c97(0x290), _0x58e5c5);
}
function toggleOptions(_0x6bf28e) {
  if (optionsContainer[_0x1c97(0x151)]) {
    optionsContainer[_0x1c97(0x151)] = ![];
  } else {
    optionsContainer[_0x1c97(0x151)] = !![];
  }
  if (_0x6bf28e != undefined) {
    optionsContainer[_0x1c97(0x151)] = _0x6bf28e;
  }
}
function toggleSoundMute(_0x159d97) {
  buttonSoundOff[_0x1c97(0x151)] = ![];
  buttonSoundOn[_0x1c97(0x151)] = ![];
  toggleSoundInMute(_0x159d97);
  if (_0x159d97) {
    buttonSoundOn[_0x1c97(0x151)] = !![];
  } else {
    buttonSoundOff.visible = !![];
  }
}
function toggleMusicMute(_0x2b8611) {
  buttonMusicOff.visible = ![];
  buttonMusicOn[_0x1c97(0x151)] = ![];
  toggleMusicInMute(_0x2b8611);
  if (_0x2b8611) {
    buttonMusicOn[_0x1c97(0x151)] = !![];
  } else {
    buttonMusicOff.visible = !![];
  }
}
function _0x1c97(_0x5e9ec9, _0x5989c3) {
  var _0x550e44 = _0x550e();
  _0x1c97 = function (_0x1c9745, _0x3cfb58) {
    _0x1c9745 = _0x1c9745 - 0x10f;
    var _0x3eca87 = _0x550e44[_0x1c9745];
    return _0x3eca87;
  };
  return _0x1c97(_0x5e9ec9, _0x5989c3);
}
function toggleFullScreen() {
  if (!document[_0x1c97(0x273)] && !document[_0x1c97(0x249)] && !document.webkitFullscreenElement && !document[_0x1c97(0x177)]) {
    if (document[_0x1c97(0x155)][_0x1c97(0x252)]) {
      document.documentElement[_0x1c97(0x252)]();
    } else {
      if (document[_0x1c97(0x155)][_0x1c97(0x236)]) {
        document.documentElement[_0x1c97(0x236)]();
      } else {
        if (document[_0x1c97(0x155)][_0x1c97(0x18c)]) {
          document[_0x1c97(0x155)][_0x1c97(0x18c)]();
        } else if (document[_0x1c97(0x155)][_0x1c97(0x259)]) {
          document[_0x1c97(0x155)][_0x1c97(0x259)](Element.ALLOW_KEYBOARD_INPUT);
        }
      }
    }
  } else {
    if (document[_0x1c97(0x13b)]) {
      document[_0x1c97(0x13b)]();
    } else {
      if (document[_0x1c97(0x1ce)]) {
        document[_0x1c97(0x1ce)]();
      } else {
        if (document[_0x1c97(0x14e)]) {
          document[_0x1c97(0x14e)]();
        } else if (document[_0x1c97(0x24d)]) {
          document[_0x1c97(0x24d)]();
        }
      }
    }
  }
}
function shareLinks(_0x80a7db, _0x40ee56) {
  if (shareSettings[_0x1c97(0x289)]) {
    gtag('event', _0x1c97(0x2a7), {
      'event_category': _0x1c97(0x16f),
      'event_label': _0x80a7db
    });
  }
  var _0x37aa5e = location[_0x1c97(0x1d4)];
  _0x37aa5e = encodeURIComponent(_0x37aa5e[_0x1c97(0x146)](0x0, _0x37aa5e[_0x1c97(0x29f)]('/') + 0x1));
  var _0x9ab218 = shareSettings[_0x1c97(0x265)][_0x1c97(0x172)](_0x1c97(0x2ab), _0x40ee56);
  var _0x476379 = shareSettings[_0x1c97(0x233)][_0x1c97(0x172)](_0x1c97(0x2ab), _0x40ee56);
  var _0x288428 = '';
  if (_0x80a7db == _0x1c97(0x25f)) {
    if (shareSettings[_0x1c97(0x244)]) {
      _0x288428 = _0x1c97(0x15a) + encodeURIComponent(_0x37aa5e + 'share.php?title=' + _0x9ab218 + _0x1c97(0x240) + _0x37aa5e + _0x1c97(0x19c) + _0x37aa5e + _0x1c97(0x122));
    } else {
      _0x288428 = _0x1c97(0x15a) + _0x37aa5e;
    }
  } else {
    if (_0x80a7db == _0x1c97(0x23c)) {
      _0x288428 = _0x1c97(0x22e) + _0x476379 + _0x1c97(0x240) + _0x37aa5e;
    } else {
      if (_0x80a7db == _0x1c97(0x13d)) {
        _0x288428 = _0x1c97(0x17b) + _0x476379 + _0x1c97(0x1ef) + _0x37aa5e;
      } else {
        if (_0x80a7db == _0x1c97(0x20c)) {
          _0x288428 = _0x1c97(0x176) + _0x37aa5e + _0x1c97(0x186) + _0x476379;
        } else {
          if (_0x80a7db == _0x1c97(0x224)) {
            _0x288428 = _0x1c97(0x11f) + _0x37aa5e + '&title=' + _0x476379;
          } else if (_0x80a7db == 'linkedin') {
            _0x288428 = 'https://www.linkedin.com/sharing/share-offsite/?url=' + _0x37aa5e;
          }
        }
      }
    }
  }
  window[_0x1c97(0x158)](_0x288428);
}
var stageW = 0x500;
var stageH = 0x300;
var contentW = 0x400;
var contentH = 0x240;
const viewport = {
  'isLandscape': !![]
};
const landscapeSize = {
  'w': stageW,
  'h': stageH,
  'cW': contentW,
  'cH': contentH
};
const portraitSize = {
  'w': 0x300,
  'h': 0x400,
  'cW': 0x240,
  'cH': 0x384
};
function initMain() {
  if (isDesktop) {
    $(_0x1c97(0x1ac)).show();
  }
  initGameCanvas(stageW, stageH);
  buildGameCanvas();
  buildGameButton();
  if (typeof buildScoreBoardCanvas == _0x1c97(0x1a7)) {
    buildScoreBoardCanvas();
  }
  goPage(_0x1c97(0x154));
  if (typeof initSocket == _0x1c97(0x1a7) && multiplayerSettings[_0x1c97(0x129)]) {
    initSocket('guessthesketch');
  }
  checkMobileOrientation();
  resizeCanvas();
}
var windowW = windowH = 0x0;
var scalePercent = 0x0;
const dpr = window.devicePixelRatio || 0x1;
const offset = {
  'x': 0x0,
  'y': 0x0,
  'left': 0x0,
  'top': 0x0
};
function resizeGameFunc() {
  setTimeout(function () {
    $('.mobileRotate')[_0x1c97(0x245)](_0x1c97(0x1d2), checkContentWidth($(_0x1c97(0x225))));
    $(_0x1c97(0x225))[_0x1c97(0x245)](_0x1c97(0x131), checkContentHeight($('.mobileRotate')));
    windowW = window[_0x1c97(0x128)];
    windowH = window[_0x1c97(0x213)];
    scalePercent = Math[_0x1c97(0x210)](windowW / contentW, windowH / contentH);
    scalePercent = scalePercent > 0x1 ? 0x1 : scalePercent;
    if (windowW > stageW && windowH > stageH) {
      if (windowW > stageW) {
        scalePercent = windowW / stageW;
        if (stageH * scalePercent > windowH) {
          scalePercent = windowH / stageH;
        }
      }
    }
    const _0x28d787 = stageW * scalePercent;
    const _0x918990 = stageH * scalePercent;
    offset[_0x1c97(0x1d2)] = 0x0;
    offset.top = 0x0;
    if (_0x28d787 > windowW) {
      offset.left = -(_0x28d787 - windowW);
    } else {
      offset[_0x1c97(0x1d2)] = windowW - _0x28d787;
    }
    if (_0x918990 > windowH) {
      offset.top = -(_0x918990 - windowH);
    } else {
      offset[_0x1c97(0x131)] = windowH - _0x918990;
    }
    offset.x = 0x0;
    offset.y = 0x0;
    if (offset[_0x1c97(0x1d2)] < 0x0) {
      offset.x = Math[_0x1c97(0x20a)](offset[_0x1c97(0x1d2)] / scalePercent / 0x2);
    }
    if (offset[_0x1c97(0x131)] < 0x0) {
      offset.y = Math[_0x1c97(0x20a)](offset[_0x1c97(0x131)] / scalePercent / 0x2);
    }
    const _0x31a48a = document[_0x1c97(0x185)]('gameCanvas');
    _0x31a48a[_0x1c97(0x1ee)][_0x1c97(0x187)] = _0x28d787 + 'px';
    _0x31a48a[_0x1c97(0x1ee)][_0x1c97(0x2aa)] = _0x918990 + 'px';
    _0x31a48a[_0x1c97(0x1ee)][_0x1c97(0x1d2)] = offset[_0x1c97(0x1d2)] / 0x2 + 'px';
    _0x31a48a[_0x1c97(0x1ee)].top = offset[_0x1c97(0x131)] / 0x2 + 'px';
    _0x31a48a[_0x1c97(0x187)] = stageW * dpr;
    _0x31a48a.height = stageH * dpr;
    if (typeof initSocket == _0x1c97(0x1a7) && multiplayerSettings[_0x1c97(0x129)]) {
      $(_0x1c97(0x1ec))[_0x1c97(0x18a)](function (_0x5681ef, _0x26d384) {
        $(this)[_0x1c97(0x245)]('font-size', Math[_0x1c97(0x223)](Number($(this).attr('data-fontsize')) * scalePercent));
      });
      $(_0x1c97(0x20f)).css('width', _0x28d787);
      $(_0x1c97(0x20f))[_0x1c97(0x245)](_0x1c97(0x2aa), _0x918990);
      $('#roomWrapper')[_0x1c97(0x245)](_0x1c97(0x1d2), offset[_0x1c97(0x1d2)] / 0x2);
      $(_0x1c97(0x20f)).css(_0x1c97(0x131), offset[_0x1c97(0x131)] / 0x2);
      $(_0x1c97(0x267))[_0x1c97(0x245)]('width', _0x28d787);
      $(_0x1c97(0x267))[_0x1c97(0x245)](_0x1c97(0x2aa), _0x918990);
      $(_0x1c97(0x267))[_0x1c97(0x245)](_0x1c97(0x1d2), 0x0 / 0x2);
      $(_0x1c97(0x267)).css(_0x1c97(0x131), offset[_0x1c97(0x131)] / 0x2);
    }
    $(window)[_0x1c97(0x1e1)](0x0);
    resizeCanvas();
    if (typeof resizeScore == _0x1c97(0x1a7)) {
      resizeScore();
    }
  }, 0x64);
}
var resizeTimer;
function checkMobileEvent() {
  if (!isDesktop) {
    $(window).off(_0x1c97(0x200)).on('orientationchange', function (_0x3efe7b) {
      $('#canvasHolder')[_0x1c97(0x15c)]();
      $(_0x1c97(0x1fb))[_0x1c97(0x15c)]();
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkMobileOrientation, 0x3e8);
    });
    checkMobileOrientation();
  }
}
function checkMobileOrientation() {
  var _0x5dd5a4 = ![];
  if (window.innerWidth > window[_0x1c97(0x213)]) {
    _0x5dd5a4 = !![];
  }
  if ($[_0x1c97(0x1fd)].enable) {
    viewport.isLandscape = edit[_0x1c97(0x16d)];
  } else {
    viewport.isLandscape = _0x5dd5a4;
  }
  changeViewport(viewport[_0x1c97(0x16d)]);
  resizeGameFunc();
  $('#canvasHolder')[_0x1c97(0x142)]();
}
function toggleRotate(_0x21c5d6) {
  if (_0x21c5d6) {
    $('#rotateHolder')[_0x1c97(0x283)]();
  } else {
    $(_0x1c97(0x1fb))[_0x1c97(0x1ff)]();
  }
  resizeGameFunc();
}
function initPreload() {
  toggleLoader(!![]);
  checkMobileEvent();
  $(window)[_0x1c97(0x1ba)](function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(checkMobileOrientation, 0x3e8);
  });
  resizeGameFunc();
  loader = new createjs[_0x1c97(0x264)](![]);
  manifest = [{
    'src': _0x1c97(0x1c4),
    'id': _0x1c97(0x117)
  }, {
    'src': 'assets/background_p.png',
    'id': 'backgroundP'
  }, {
    'src': _0x1c97(0x1d5),
    'id': _0x1c97(0x1f0)
  }, {
    'src': 'assets/logo_p.png',
    'id': _0x1c97(0x1be)
  }, {
    'src': 'assets/button_start.png',
    'id': _0x1c97(0x29d)
  }, {
    'src': _0x1c97(0x268),
    'id': _0x1c97(0x285)
  }, {
    'src': _0x1c97(0x167),
    'id': _0x1c97(0x180)
  }, {
    'src': _0x1c97(0x251),
    'id': _0x1c97(0x262)
  }, {
    'src': _0x1c97(0x25a),
    'id': _0x1c97(0x12d)
  }, {
    'src': _0x1c97(0x1d6),
    'id': _0x1c97(0x205)
  }, {
    'src': 'assets/item_blank.png',
    'id': _0x1c97(0x1df)
  }, {
    'src': _0x1c97(0x143),
    'id': _0x1c97(0x18b)
  }, {
    'src': 'assets/item_key.png',
    'id': _0x1c97(0x270)
  }, {
    'src': 'assets/item_key_disabled.png',
    'id': _0x1c97(0x271)
  }, {
    'src': 'assets/item_remove.png',
    'id': 'itemRemove'
  }, {
    'src': _0x1c97(0x145),
    'id': 'itemGameStatus'
  }, {
    'src': _0x1c97(0x1cd),
    'id': _0x1c97(0x194)
  }, {
    'src': _0x1c97(0x192),
    'id': _0x1c97(0x134)
  }, {
    'src': 'assets/social/button_facebook.png',
    'id': _0x1c97(0x182)
  }, {
    'src': _0x1c97(0x1b5),
    'id': 'buttonTwitter'
  }, {
    'src': _0x1c97(0x2b5),
    'id': _0x1c97(0x1d7)
  }, {
    'src': _0x1c97(0x147),
    'id': _0x1c97(0x171)
  }, {
    'src': _0x1c97(0x232),
    'id': _0x1c97(0x1e9)
  }, {
    'src': 'assets/social/button_linkedin.png',
    'id': _0x1c97(0x16a)
  }, {
    'src': 'assets/button_continue.png',
    'id': 'buttonContinue'
  }, {
    'src': 'assets/item_pop.png',
    'id': _0x1c97(0x1b2)
  }, {
    'src': _0x1c97(0x1ed),
    'id': _0x1c97(0x1b3)
  }, {
    'src': _0x1c97(0x22c),
    'id': _0x1c97(0x17d)
  }, {
    'src': _0x1c97(0x293),
    'id': 'buttonCancel'
  }, {
    'src': _0x1c97(0x235),
    'id': _0x1c97(0x222)
  }, {
    'src': 'assets/button_sound_on.png',
    'id': _0x1c97(0x126)
  }, {
    'src': _0x1c97(0x29e),
    'id': _0x1c97(0x22b)
  }, {
    'src': _0x1c97(0x144),
    'id': _0x1c97(0x207)
  }, {
    'src': _0x1c97(0x28e),
    'id': _0x1c97(0x230)
  }];
  if (typeof addScoreboardAssets == 'function') {
    addScoreboardAssets();
  }
  audioOn = !![];
  if (!isDesktop) {
    if (!enableMobileAudio) {
      audioOn = ![];
    }
  } else if (!enableDesktopAudio) {
    audioOn = ![];
  }
  if (audioOn) {
    manifest[_0x1c97(0x266)]({
      'src': _0x1c97(0x195),
      'id': _0x1c97(0x1d3)
    });
    manifest[_0x1c97(0x266)]({
      'src': _0x1c97(0x21a),
      'id': _0x1c97(0x258)
    });
    manifest.push({
      'src': _0x1c97(0x25d),
      'id': _0x1c97(0x298)
    });
    manifest[_0x1c97(0x266)]({
      'src': _0x1c97(0x1e2),
      'id': _0x1c97(0x1e5)
    });
    manifest[_0x1c97(0x266)]({
      'src': _0x1c97(0x1fa),
      'id': _0x1c97(0x280)
    });
    manifest[_0x1c97(0x266)]({
      'src': _0x1c97(0x190),
      'id': _0x1c97(0x16c)
    });
    manifest[_0x1c97(0x266)]({
      'src': _0x1c97(0x16e),
      'id': _0x1c97(0x17f)
    });
    manifest[_0x1c97(0x266)]({
      'src': _0x1c97(0x1fc),
      'id': _0x1c97(0x193)
    });
    createjs[_0x1c97(0x26f)][_0x1c97(0x119)] = [_0x1c97(0x28a)];
    loader.installPlugin(createjs[_0x1c97(0x26f)]);
  }
  loader[_0x1c97(0x1b9)](_0x1c97(0x22f), handleComplete);
  loader[_0x1c97(0x1b9)]('fileload', fileComplete);
  loader[_0x1c97(0x1b9)](_0x1c97(0x1f2), handleFileError);
  loader.on(_0x1c97(0x208), handleProgress, this);
  loader[_0x1c97(0x1a0)](manifest);
}
function fileComplete(_0x5c48a1) {}
function handleFileError(_0x4a2278) {
  console[_0x1c97(0x170)](_0x1c97(0x234), _0x4a2278);
}
function handleProgress() {
  $("#mainLoader span").html(Math[_0x1c97(0x223)](loader[_0x1c97(0x208)] / 0x1 * 0x64) + '%');
}
function handleComplete() {
  toggleLoader(![]);
  initMain();
}
;
function toggleLoader(_0x3f1e88) {
  if (_0x3f1e88) {
    $(_0x1c97(0x269))[_0x1c97(0x142)]();
  } else {
    $(_0x1c97(0x269)).hide();
  }
}
var stageWidth;
var stageHeight = 0x0;
var isLoaded = ![];
$(function () {
  var _0x4422a4 = function () {
    try {
      if (createjs[_0x1c97(0x1bb)][_0x1c97(0x256)][_0x1c97(0x2a5)] === _0x1c97(0x140)) {
        createjs[_0x1c97(0x1bb)][_0x1c97(0x256)][_0x1c97(0x204)]();
        window.removeEventListener(_0x1c97(0x2a7), _0x4422a4);
      }
    } catch (_0x28daf8) {
      console[_0x1c97(0x1f2)](_0x1c97(0x1dd));
      console.error(_0x28daf8);
    }
  };
  window[_0x1c97(0x1b9)](_0x1c97(0x2a7), _0x4422a4);
  if (window.location[_0x1c97(0x12c)].substr(0x0, 0x4) === _0x1c97(0x1cf)) {
    alert("To install the game just upload folder 'game' to your server. The game won't run locally with some browser like Chrome due to some security mode.");
  }
  $(window)[_0x1c97(0x1ba)](function () {
    resizeLoaderFunc();
  });
  resizeLoaderFunc();
  checkBrowser();
});
function resizeLoaderFunc() {
  stageWidth = $(window)[_0x1c97(0x187)]();
  stageHeight = $(window)[_0x1c97(0x2aa)]();
  $(_0x1c97(0x269))[_0x1c97(0x245)](_0x1c97(0x1d2), checkContentWidth($(_0x1c97(0x269))));
  $(_0x1c97(0x269))[_0x1c97(0x245)](_0x1c97(0x131), checkContentHeight($(_0x1c97(0x269))));
  $(_0x1c97(0x274))[_0x1c97(0x245)]('left', checkContentWidth($('#mainLoader')));
  $(_0x1c97(0x274))[_0x1c97(0x245)](_0x1c97(0x131), checkContentHeight($('#mainLoader')));
}
var browserSupport = ![];
var isMobile;
var isTablet;
var isDesktop;
function checkBrowser() {
  if (typeof MobileDetect === _0x1c97(0x1a7)) {
    var _0x2426cc = new MobileDetect(window[_0x1c97(0x116)][_0x1c97(0x220)]);
    isMobile = _0x2426cc[_0x1c97(0x263)]();
    isTablet = _0x2426cc[_0x1c97(0x127)]();
    if (isMobile == null && isTablet == null) {
      isDesktop = !![];
    }
  }
  var _0x1e4fe = document.createElement(_0x1c97(0x216));
  if (_0x1e4fe.getContext) {
    browserSupport = !![];
  }
  if (browserSupport) {
    if (!isLoaded) {
      isLoaded = !![];
      detectAddScript(!![]);
    }
  } else {
    $('#notSupportHolder')[_0x1c97(0x142)]();
  }
}
function detectAddScript(_0x1c5e99) {
  if (_0x1c5e99) {
    if (checkAddScript(_0x1c97(0x13c), _0x1c97(0x24a), _0x1c97(0x1a9), _0x1c97(0x281))) {
      doneAddScript();
    } else {
      doneAddScript();
    }
  } else {
    doneAddScript();
  }
}
function checkAddScript(_0x55f2aa, _0x117ea1, _0xfc0256, _0x140738) {
  var _0xee5e76 = checkFileExist(_0x55f2aa);
  var _0x5c4e95 = checkFileExist(_0x117ea1);
  var _0x474132 = checkFileExist(_0x140738);
  return _0xee5e76 & _0x5c4e95 & _0x474132 ? ($(_0x1c97(0x294))[_0x1c97(0x19d)]("<link rel=\"stylesheet\" type=\"text/css\" href=\"" + _0x55f2aa + "\">"), $(_0x1c97(0x294))[_0x1c97(0x19d)](_0x1c97(0x203) + _0x140738 + _0x1c97(0x27d)), $(_0x1c97(0x294)).append(_0x1c97(0x203) + _0x117ea1 + _0x1c97(0x27d)), $(_0x1c97(0x294))[_0x1c97(0x19d)](_0x1c97(0x203) + _0xfc0256 + _0x1c97(0x27d)), !![]) : ![];
}
function doneAddScript() {
  initPreload();
}
function checkFileExist(_0x387ac0) {
  var _0x429382 = jQuery[_0x1c97(0x162)]({
    'url': _0x387ac0,
    'type': 'HEAD',
    'async': ![]
  }).status;
  return _0x429382 != _0x1c97(0x296) ? ![] : !![];
}