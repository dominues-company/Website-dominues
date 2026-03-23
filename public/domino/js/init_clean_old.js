// Deobfuscation failed
var _0x219ef7 = _0x243b;
(function (topic, b) {
    var getter = _0x243b;
    var out = topic();
    for (; !![]; ) {
        try {
            var a =
                (parseInt(getter(601)) / 1) * (-parseInt(getter(560)) / 2) +
                parseInt(getter(757)) / 3 +
                (parseInt(getter(665)) / 4) * (parseInt(getter(714)) / 5) +
                -parseInt(getter(592)) / 6 +
                (-parseInt(getter(611)) / 7) * (-parseInt(getter(680)) / 8) +
                (-parseInt(getter(657)) / 9) * (-parseInt(getter(608)) / 10) +
                -parseInt(getter(432)) / 11;
            if (a === b) {
                break;
            } else {
                out["push"](out["shift"]());
            }
        } catch (_0x279e83) {
            out["push"](out["shift"]());
        }
    }
})(_0x363b, 118796),
    (function () {
        var getFirstIn = _0x243b;
        var func;
        var K = function () {};
        var methods = [
            getFirstIn(576),
            getFirstIn(568),
            getFirstIn(379),
            getFirstIn(586),
            getFirstIn(482),
            getFirstIn(335),
            "error",
            getFirstIn(739),
            "group",
            getFirstIn(388),
            getFirstIn(540),
            "info",
            getFirstIn(696),
            "markTimeline",
            "profile",
            getFirstIn(336),
            "table",
            getFirstIn(445),
            getFirstIn(620),
            getFirstIn(819),
            getFirstIn(702),
            getFirstIn(352),
        ];
        var method = methods[getFirstIn(373)];
        var data = (window["console"] = window[getFirstIn(746)] || {});
        for (; method--; ) {
            func = methods[method];
            if (!data[func]) {
                data[func] = K;
            }
        }
    })();
function checkContentHeight(dataAndEvents) {
    var throttledUpdate = _0x243b;
    var _0x45fd79 = $(window)["height"]();
    var checkContentHeight = _0x45fd79 / 2 - dataAndEvents[throttledUpdate(516)]() / 2;
    return checkContentHeight;
}
function checkContentWidth(dataAndEvents) {
    var throttledUpdate = _0x243b;
    var _0x5954ce = $(window)["width"]();
    var checkContentWidth = _0x5954ce / 2 - dataAndEvents[throttledUpdate(344)]() / 2;
    return checkContentWidth;
}
function getDeviceVer() {
    var throttledUpdate = _0x243b;
    var classNames = navigator[throttledUpdate(369)];
    var iOS;
    if (classNames[throttledUpdate(466)](/(iPad|iPhone|iPod touch)/)) {
        userOS = throttledUpdate(619);
        iOS = classNames["indexOf"]("OS ");
    } else {
        if (classNames[throttledUpdate(466)](/Android/)) {
            userOS = throttledUpdate(496);
            iOS = classNames["indexOf"]("Android ");
        } else {
            userOS = "unknown";
        }
    }
    if (userOS === "iOS" && iOS > -1) {
        userOSver = classNames["substr"](iOS + 3, 3)[throttledUpdate(553)]("_", ".");
    } else {
        if (userOS === throttledUpdate(496) && iOS > -1) {
            userOSver = classNames[throttledUpdate(719)](iOS + 8, 3);
        } else {
            userOSver = throttledUpdate(549);
        }
    }
    return Number(userOSver);
}
function shuffle(array) {
    var isValue = _0x243b;
    var first = array[isValue(373)];
    var temp;
    var second;
    for (; 0 !== first; ) {
        second = Math[isValue(765)](Math[isValue(707)]() * first);
        first -= 1;
        temp = array[first];
        array[first] = array[second];
        array[second] = temp;
    }
    return array;
}
function randomBoolean() {
    var throttledUpdate = _0x243b;
    return Math[throttledUpdate(707)]() < 0.5;
}
function getDistance(to, a, from, b) {
    var throttledUpdate = _0x243b;
    var distance = Math[throttledUpdate(607)](Math[throttledUpdate(457)](to - from, 2) + Math[throttledUpdate(457)](a - b, 2));
    return distance;
}
function sortOnObject(regex, i, recurring) {
    var throttledUpdate = _0x243b;
    return (
        recurring
            ? regex[throttledUpdate(478)](function (c, safe) {
                  var left = c[i];
                  var right = safe[i];
                  if (left == right) {
                      return 0;
                  }
                  return left < right ? 1 : -1;
              })
            : regex[throttledUpdate(478)](function (jq, vals) {
                  var x = jq[i];
                  var y = vals[i];
                  if (x == y) {
                      return 0;
                  }
                  return x > y ? 1 : -1;
              }),
        regex
    );
}
function randomIntFromInterval(outstandingDataSize, opt_attributes) {
    var throttledUpdate = _0x243b;
    return Math[throttledUpdate(765)](Math[throttledUpdate(707)]() * (opt_attributes - outstandingDataSize + 1) + outstandingDataSize);
}
function addCommas(nStr) {
    var throttledUpdate = _0x243b;
    nStr += "";
    x = nStr[throttledUpdate(469)](".");
    x1 = x[0];
    x2 = x[throttledUpdate(373)] > 1 ? "." + x[1] : "";
    var NUMBER_FORMAT_REGEX = /(\d+)(\d{3})/;
    for (; NUMBER_FORMAT_REGEX[throttledUpdate(467)](x1); ) {
        x1 = x1[throttledUpdate(553)](NUMBER_FORMAT_REGEX, "$1" + "," + "$2");
    }
    return x1 + x2;
}
function swapArray(arr, i, j) {
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}
function getCenterPosition(far, leadingSlashes, near, tail) {
    var midpoint = {
        x: 0,
        y: 0,
    };
    return (midpoint["x"] = (far + near) / 2), (midpoint["y"] = (leadingSlashes + tail) / 2), midpoint;
}
function setRotation(min, angle, max, degrees) {
    var transformPoint = _0x243b;
    var z2 = 180 / Math["PI"];
    var wz = -Math[transformPoint(639)](max - min, degrees - angle) * z2;
    return wz - 90;
}
function isEven(x) {
    if (x % 2 == 0) {
        return !![];
    } else {
        return ![];
    }
}
function getAnglePosition(_, a, x, outstandingDataSize) {
    var throttledUpdate = _0x243b;
    var obj = {
        x: 0,
        y: 0,
    };
    return (obj["x"] = _ + x * Math[throttledUpdate(612)]((outstandingDataSize * Math["PI"]) / 180)), (obj["y"] = a + x * Math[throttledUpdate(480)]((outstandingDataSize * Math["PI"]) / 180)), obj;
}
var enableDesktopSound = !![];
var enableMobileSound = !![];
var soundOn;
var soundMute = ![];
var musicMute = ![];
$[_0x219ef7(551)] = {};
var soundID = 0;
var soundPushArr = [];
var soundLoopPushArr = [];
var musicPushArr = [];
function playSound(origin, value) {
    var noteOn = _0x219ef7;
    if (soundOn) {
        var owner = soundID;
        soundPushArr[noteOn(574)](owner);
        soundID++;
        var computed = value == undefined ? 1 : value;
        $[noteOn(551)][owner] = createjs[noteOn(669)][noteOn(383)](origin);
        $[noteOn(551)][owner][noteOn(591)] = computed;
        setSoundVolume(owner);
        $["sound"][owner]["removeAllEventListeners"]();
        $[noteOn(551)][owner]["addEventListener"](noteOn(358), function () {
            var playSound = noteOn;
            var unlock = soundPushArr[playSound(347)](owner);
            if (unlock != -1) {
                soundPushArr[playSound(809)](unlock, 1);
            }
        });
    }
}
function playSoundLoop(k) {
    var throttledUpdate = _0x219ef7;
    if (soundOn) {
        if ($[throttledUpdate(551)][k] == null) {
            soundLoopPushArr["push"](k);
            $["sound"][k] = createjs["Sound"][throttledUpdate(383)](k);
            $[throttledUpdate(551)][k][throttledUpdate(591)] = 1;
            setSoundLoopVolume(k);
            $[throttledUpdate(551)][k][throttledUpdate(818)]();
            $[throttledUpdate(551)][k]["addEventListener"](throttledUpdate(358), function () {
                var tryIt = throttledUpdate;
                $[tryIt(551)][k]["play"]();
            });
        }
    }
}
function toggleSoundLoop(plugin, dataAndEvents) {
    var throttledUpdate = _0x219ef7;
    if (soundOn) {
        if ($[throttledUpdate(551)][plugin] != null) {
            if (dataAndEvents) {
                $["sound"][plugin][throttledUpdate(383)]();
            } else {
                $[throttledUpdate(551)][plugin][throttledUpdate(562)] = !![];
            }
        }
    }
}
function stopSoundLoop(key) {
    var throttledUpdate = _0x219ef7;
    if (soundOn) {
        if ($[throttledUpdate(551)][key] != null) {
            $[throttledUpdate(551)][key]["stop"]();
            $[throttledUpdate(551)][key] = null;
            var camelKey = soundLoopPushArr[throttledUpdate(347)](key);
            if (camelKey != -1) {
                soundLoopPushArr[throttledUpdate(809)](camelKey, 1);
            }
        }
    }
}
function playMusicLoop(method) {
    var throttledUpdate = _0x219ef7;
    if (soundOn) {
        if ($[throttledUpdate(551)][method] == null) {
            musicPushArr[throttledUpdate(574)](method);
            $[throttledUpdate(551)][method] = createjs[throttledUpdate(669)][throttledUpdate(383)](method);
            $[throttledUpdate(551)][method][throttledUpdate(591)] = 1;
            setMusicVolume(method);
            $[throttledUpdate(551)][method]["removeAllEventListeners"]();
            $[throttledUpdate(551)][method][throttledUpdate(664)](throttledUpdate(358), function () {
                var tryIt = throttledUpdate;
                $[tryIt(551)][method][tryIt(383)]();
            });
        }
    }
}
function toggleMusicLoop(plugin, dataAndEvents) {
    var throttledUpdate = _0x219ef7;
    if (soundOn) {
        if ($[throttledUpdate(551)][plugin] != null) {
            if (dataAndEvents) {
                $[throttledUpdate(551)][plugin][throttledUpdate(383)]();
            } else {
                $[throttledUpdate(551)][plugin][throttledUpdate(562)] = !![];
            }
        }
    }
}
function stopMusicLoop(key) {
    var throttledUpdate = _0x219ef7;
    if (soundOn) {
        if ($[throttledUpdate(551)][key] != null) {
            $[throttledUpdate(551)][key]["stop"]();
            $[throttledUpdate(551)][key] = null;
            var camelKey = musicPushArr[throttledUpdate(347)](key);
            if (camelKey != -1) {
                musicPushArr[throttledUpdate(809)](camelKey, 1);
            }
        }
    }
}
function stopSound() {
    var throttledUpdate = _0x219ef7;
    createjs[throttledUpdate(669)][throttledUpdate(817)]();
}
function toggleSoundInMute(recurring) {
    var throttledUpdate = _0x219ef7;
    if (soundOn) {
        soundMute = recurring;
        var i = 0;
        for (; i < soundPushArr["length"]; i++) {
            setSoundVolume(soundPushArr[i]);
        }
        i = 0;
        for (; i < soundLoopPushArr[throttledUpdate(373)]; i++) {
            setSoundLoopVolume(soundLoopPushArr[i]);
        }
        setAudioVolume();
    }
}
function toggleMusicInMute(recurring) {
    var throttledUpdate = _0x219ef7;
    if (soundOn) {
        musicMute = recurring;
        var unlock = 0;
        for (; unlock < musicPushArr[throttledUpdate(373)]; unlock++) {
            setMusicVolume(musicPushArr[unlock]);
        }
    }
}
function setSoundVolume(owner, v) {
    var throttledUpdate = _0x219ef7;
    if (soundOn) {
        var unlock = soundPushArr[throttledUpdate(347)](owner);
        if (unlock != -1) {
            var val = v == undefined ? $["sound"][soundPushArr[unlock]]["defaultVol"] : v;
            var iterator = soundMute == ![] ? val : 0;
            $["sound"][soundPushArr[unlock]][throttledUpdate(826)] = iterator;
            $[throttledUpdate(551)][soundPushArr[unlock]][throttledUpdate(591)] = val;
        }
    }
}
function setSoundLoopVolume(data, v) {
    var throttledUpdate = _0x219ef7;
    if (soundOn) {
        var newState = soundLoopPushArr[throttledUpdate(347)](data);
        if (newState != -1) {
            var val = v == undefined ? $[throttledUpdate(551)][soundLoopPushArr[newState]][throttledUpdate(591)] : v;
            var iterator = soundMute == ![] ? val : 0;
            $[throttledUpdate(551)][soundLoopPushArr[newState]][throttledUpdate(826)] = iterator;
            $["sound"][soundLoopPushArr[newState]][throttledUpdate(591)] = val;
        }
    }
}
function setMusicVolume(path, v) {
    var throttledUpdate = _0x219ef7;
    if (soundOn) {
        var resolved = musicPushArr[throttledUpdate(347)](path);
        if (resolved != -1) {
            var val = v == undefined ? $[throttledUpdate(551)][musicPushArr[resolved]]["defaultVol"] : v;
            var iterator = musicMute == ![] ? val : 0;
            $["sound"][musicPushArr[resolved]][throttledUpdate(826)] = iterator;
            $[throttledUpdate(551)][musicPushArr[resolved]]["defaultVol"] = val;
        }
    }
}
var audioFile = null;
function playAudio(priority, loop) {
    var noteOn = _0x219ef7;
    if (soundOn) {
        if (audioFile == null) {
            audioFile = createjs[noteOn(669)]["play"](priority);
            setAudioVolume();
            audioFile[noteOn(818)]();
            audioFile[noteOn(664)](noteOn(358), function (dataAndEvents) {
                var throttledUpdate = noteOn;
                audioFile = null;
                if (typeof loop == throttledUpdate(427)) {
                    loop();
                }
            });
        }
    }
}
function stopAudio() {
    var onMidiEvent = _0x219ef7;
    if (soundOn) {
        if (audioFile != null) {
            audioFile[onMidiEvent(817)]();
            audioFile = null;
        }
    }
}
function setAudioVolume() {
    var throttledUpdate = _0x219ef7;
    if (soundOn) {
        if (audioFile != null) {
            var _0x2f63d9 = soundMute == ![] ? 1 : 0;
            audioFile[throttledUpdate(826)] = _0x2f63d9;
        }
    }
}
var stage;
var canvasW = 0;
var canvasH = 0;
function initGameCanvas(offsetPosition, dataAndEvents) {
    var throttledUpdate = _0x219ef7;
    var myAt = document[throttledUpdate(690)](throttledUpdate(703));
    myAt[throttledUpdate(344)] = offsetPosition;
    myAt[throttledUpdate(516)] = dataAndEvents;
    canvasW = offsetPosition;
    canvasH = dataAndEvents;
    stage = new createjs[throttledUpdate(732)]("gameCanvas");
    createjs[throttledUpdate(530)][throttledUpdate(750)](stage);
    stage["enableMouseOver"](20);
    stage[throttledUpdate(738)] = !![];
    createjs[throttledUpdate(662)]["framerate"] = 60;
    createjs[throttledUpdate(662)][throttledUpdate(664)](throttledUpdate(618), tick);
}
var guide = ![];
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
($[_0x219ef7(380)] = {}), ($[_0x219ef7(579)] = {});
function buildGameCanvas() {
    var throttledUpdate = _0x219ef7;
    canvasContainer = new createjs[throttledUpdate(604)]();
    mainContainer = new createjs[throttledUpdate(604)]();
    buttonLocalContainer = new createjs[throttledUpdate(604)]();
    mainContainer = new createjs["Container"]();
    dominoOptionsContainer = new createjs[throttledUpdate(604)]();
    gameContainer = new createjs[throttledUpdate(604)]();
    statusContainer = new createjs[throttledUpdate(604)]();
    boardContainer = new createjs[throttledUpdate(604)]();
    boardTileContainer = new createjs[throttledUpdate(604)]();
    boardHighlightContainer = new createjs[throttledUpdate(604)]();
    boardPlayersContainer = new createjs["Container"]();
    boardDrawContainer = new createjs[throttledUpdate(604)]();
    boardScoreContainer = new createjs[throttledUpdate(604)]();
    boardScoreListContainer = new createjs[throttledUpdate(604)]();
    resultContainer = new createjs[throttledUpdate(604)]();
    confirmContainer = new createjs["Container"]();
    bg = new createjs[throttledUpdate(431)](loader[throttledUpdate(803)]("background"));
    bgP = new createjs["Bitmap"](loader[throttledUpdate(803)]("backgroundP"));
    logo = new createjs["Bitmap"](loader[throttledUpdate(803)]("logo"));
    logoP = new createjs[throttledUpdate(431)](loader[throttledUpdate(803)](throttledUpdate(454)));
    buttonPlay = new createjs[throttledUpdate(431)](loader[throttledUpdate(803)]("buttonPlay"));
    centerReg(buttonPlay);
    buttonLocal = new createjs[throttledUpdate(431)](loader[throttledUpdate(803)](throttledUpdate(508)));
    centerReg(buttonLocal);
    buttonOnline = new createjs[throttledUpdate(431)](loader[throttledUpdate(803)](throttledUpdate(640)));
    centerReg(buttonOnline);
    itemOptions = new createjs[throttledUpdate(431)](loader["getResult"]("itemPop"));
    itemOptionsP = new createjs[throttledUpdate(431)](loader["getResult"](throttledUpdate(595)));
    optionsTitleTxt = new createjs[throttledUpdate(472)]();
    optionsTitleTxt["font"] = throttledUpdate(371);
    optionsTitleTxt["color"] = throttledUpdate(349);
    optionsTitleTxt["textAlign"] = "center";
    optionsTitleTxt[throttledUpdate(731)] = throttledUpdate(396);
    optionsTitleTxt["text"] = textDisplay["optionsTitle"];
    itemPlayerNumbers = new createjs[throttledUpdate(431)](loader[throttledUpdate(803)]("itemNumber"));
    centerReg(itemPlayerNumbers);
    totalPlayersTxt = new createjs[throttledUpdate(472)]();
    totalPlayersTxt["font"] = throttledUpdate(796);
    totalPlayersTxt[throttledUpdate(615)] = "#27C610";
    totalPlayersTxt[throttledUpdate(781)] = "center";
    totalPlayersTxt[throttledUpdate(731)] = throttledUpdate(396);
    buttonPlayersL = new createjs[throttledUpdate(431)](loader["getResult"](throttledUpdate(687)));
    centerReg(buttonPlayersL);
    buttonPlayersR = new createjs[throttledUpdate(431)](loader[throttledUpdate(803)](throttledUpdate(517)));
    centerReg(buttonPlayersR);
    itemPoints = new createjs["Bitmap"](loader[throttledUpdate(803)](throttledUpdate(339)));
    centerReg(itemPoints);
    pointsTxt = new createjs["Text"]();
    pointsTxt["font"] = throttledUpdate(796);
    pointsTxt[throttledUpdate(615)] = throttledUpdate(561);
    pointsTxt[throttledUpdate(781)] = throttledUpdate(429);
    pointsTxt[throttledUpdate(731)] = "alphabetic";
    buttonPointsL = new createjs[throttledUpdate(431)](loader["getResult"](throttledUpdate(687)));
    centerReg(buttonPointsL);
    buttonPointsR = new createjs[throttledUpdate(431)](loader[throttledUpdate(803)](throttledUpdate(517)));
    centerReg(buttonPointsR);
    itemType = new createjs["Bitmap"](loader[throttledUpdate(803)](throttledUpdate(339)));
    centerReg(itemType);
    typeTxt = new createjs[throttledUpdate(472)]();
    typeTxt[throttledUpdate(404)] = throttledUpdate(796);
    typeTxt[throttledUpdate(615)] = "#27C610";
    typeTxt["textAlign"] = throttledUpdate(429);
    typeTxt[throttledUpdate(731)] = throttledUpdate(396);
    buttonTypeL = new createjs[throttledUpdate(431)](loader[throttledUpdate(803)]("buttonArrowLeft"));
    centerReg(buttonTypeL);
    buttonTypeR = new createjs[throttledUpdate(431)](loader["getResult"](throttledUpdate(517)));
    centerReg(buttonTypeR);
    themeContainer = new createjs["Container"]();
    buttonThemeL = new createjs[throttledUpdate(431)](loader["getResult"]("buttonArrowLeft"));
    centerReg(buttonThemeL);
    buttonThemeR = new createjs[throttledUpdate(431)](loader["getResult"](throttledUpdate(517)));
    centerReg(buttonThemeR);
    buttonNext = new createjs[throttledUpdate(431)](loader[throttledUpdate(803)]("buttonNext"));
    centerReg(buttonNext);
    buttonStart = new createjs[throttledUpdate(431)](loader[throttledUpdate(803)](throttledUpdate(552)));
    centerReg(buttonStart);
    itemStatus = new createjs[throttledUpdate(431)](loader[throttledUpdate(803)](throttledUpdate(691)));
    centerReg(itemStatus);
    statusTxt = new createjs[throttledUpdate(472)]();
    statusTxt[throttledUpdate(404)] = throttledUpdate(382);
    statusTxt[throttledUpdate(615)] = throttledUpdate(349);
    statusTxt[throttledUpdate(781)] = "center";
    statusTxt["textBaseline"] = throttledUpdate(396);
    statusTxt["y"] = 23;
    statusPlayerTxt = new createjs[throttledUpdate(472)]();
    statusPlayerTxt[throttledUpdate(404)] = throttledUpdate(654);
    statusPlayerTxt["color"] = throttledUpdate(349);
    statusPlayerTxt[throttledUpdate(781)] = "center";
    statusPlayerTxt[throttledUpdate(731)] = throttledUpdate(396);
    statusPlayerTxt["y"] = -15;
    statusContainer[throttledUpdate(501)](itemStatus, statusTxt, statusPlayerTxt);
    itemDrawBg = new createjs["Bitmap"](loader[throttledUpdate(803)](throttledUpdate(387)));
    centerReg(itemDrawBg);
    itemDrawBgP = new createjs[throttledUpdate(431)](loader[throttledUpdate(803)]("itemDrawBgP"));
    centerReg(itemDrawBgP);
    drawTitleTxt = new createjs[throttledUpdate(472)]();
    drawTitleTxt[throttledUpdate(404)] = throttledUpdate(566);
    drawTitleTxt["color"] = throttledUpdate(349);
    drawTitleTxt[throttledUpdate(781)] = "center";
    drawTitleTxt[throttledUpdate(731)] = throttledUpdate(396);
    boardDrawContainer["addChild"](itemDrawBg, itemDrawBgP, drawTitleTxt);
    itemScore = new createjs[throttledUpdate(431)](loader["getResult"](throttledUpdate(434)));
    centerReg(itemScore);
    itemScoreTopMask = new createjs["Shape"]();
    itemScoreTopMask[throttledUpdate(556)][throttledUpdate(408)](throttledUpdate(468))[throttledUpdate(438)](-200, -200, 400, 300);
    itemScoreTop = new createjs["Bitmap"](loader[throttledUpdate(803)](throttledUpdate(455)));
    centerReg(itemScoreTop);
    itemScoreTop[throttledUpdate(594)] = 0;
    itemScoreTop[throttledUpdate(475)] = itemScoreTopMask;
    roundStatusTxt = new createjs[throttledUpdate(472)]();
    roundStatusTxt[throttledUpdate(404)] = "25px bpreplaybold";
    roundStatusTxt[throttledUpdate(615)] = throttledUpdate(349);
    roundStatusTxt["textAlign"] = "center";
    roundStatusTxt[throttledUpdate(731)] = "alphabetic";
    roundStatusTxt["y"] = 97;
    boardScoreContainer[throttledUpdate(501)](itemScoreTop, itemScore, roundStatusTxt, boardScoreListContainer);
    itemResult = new createjs["Bitmap"](loader[throttledUpdate(803)](throttledUpdate(728)));
    itemResultP = new createjs[throttledUpdate(431)](loader[throttledUpdate(803)](throttledUpdate(595)));
    buttonContinue = new createjs[throttledUpdate(431)](loader[throttledUpdate(803)](throttledUpdate(355)));
    centerReg(buttonContinue);
    resultShareTxt = new createjs[throttledUpdate(472)]();
    resultShareTxt["font"] = "25px bpreplaybold";
    resultShareTxt[throttledUpdate(615)] = throttledUpdate(349);
    resultShareTxt["textAlign"] = throttledUpdate(429);
    resultShareTxt[throttledUpdate(731)] = throttledUpdate(396);
    resultShareTxt[throttledUpdate(393)] = textDisplay["share"];
    resultTitleTxt = new createjs["Text"]();
    resultTitleTxt[throttledUpdate(404)] = "60px bpreplaybold";
    resultTitleTxt[throttledUpdate(615)] = throttledUpdate(349);
    resultTitleTxt["textAlign"] = throttledUpdate(429);
    resultTitleTxt["textBaseline"] = throttledUpdate(396);
    resultTitleTxt["text"] = textDisplay[throttledUpdate(425)];
    resultDescTxt = new createjs[throttledUpdate(472)]();
    resultDescTxt[throttledUpdate(404)] = throttledUpdate(635);
    resultDescTxt["lineHeight"] = 35;
    resultDescTxt["color"] = "#FFFF00";
    resultDescTxt[throttledUpdate(781)] = throttledUpdate(429);
    resultDescTxt[throttledUpdate(731)] = "alphabetic";
    resultDescTxt[throttledUpdate(393)] = "";
    buttonFacebook = new createjs[throttledUpdate(431)](loader[throttledUpdate(803)](throttledUpdate(688)));
    buttonTwitter = new createjs[throttledUpdate(431)](loader[throttledUpdate(803)](throttledUpdate(794)));
    buttonWhatsapp = new createjs[throttledUpdate(431)](loader[throttledUpdate(803)](throttledUpdate(524)));
    centerReg(buttonFacebook);
    createHitarea(buttonFacebook);
    centerReg(buttonTwitter);
    createHitarea(buttonTwitter);
    centerReg(buttonWhatsapp);
    createHitarea(buttonWhatsapp);
    buttonFullscreen = new createjs[throttledUpdate(431)](loader["getResult"](throttledUpdate(418)));
    centerReg(buttonFullscreen);
    buttonSoundOn = new createjs[throttledUpdate(431)](loader[throttledUpdate(803)](throttledUpdate(461)));
    centerReg(buttonSoundOn);
    buttonSoundOff = new createjs[throttledUpdate(431)](loader[throttledUpdate(803)](throttledUpdate(685)));
    centerReg(buttonSoundOff);
    buttonSoundOn["visible"] = ![];
    buttonMusicOn = new createjs["Bitmap"](loader[throttledUpdate(803)]("buttonMusicOn"));
    centerReg(buttonMusicOn);
    buttonMusicOff = new createjs[throttledUpdate(431)](loader["getResult"](throttledUpdate(587)));
    centerReg(buttonMusicOff);
    buttonMusicOn[throttledUpdate(606)] = ![];
    buttonExit = new createjs["Bitmap"](loader[throttledUpdate(803)](throttledUpdate(767)));
    centerReg(buttonExit);
    buttonSettings = new createjs["Bitmap"](loader[throttledUpdate(803)]("buttonSettings"));
    centerReg(buttonSettings);
    createHitarea(buttonFullscreen);
    createHitarea(buttonSoundOn);
    createHitarea(buttonSoundOff);
    createHitarea(buttonExit);
    createHitarea(buttonSettings);
    optionsContainer = new createjs["Container"]();
    optionsContainer[throttledUpdate(501)](buttonFullscreen, buttonSoundOn, buttonSoundOff, buttonMusicOn, buttonMusicOff, buttonExit);
    optionsContainer[throttledUpdate(606)] = ![];
    itemExit = new createjs[throttledUpdate(431)](loader[throttledUpdate(803)]("itemPop"));
    itemExitP = new createjs[throttledUpdate(431)](loader[throttledUpdate(803)](throttledUpdate(595)));
    buttonConfirm = new createjs["Bitmap"](loader[throttledUpdate(803)](throttledUpdate(460)));
    centerReg(buttonConfirm);
    buttonCancel = new createjs[throttledUpdate(431)](loader[throttledUpdate(803)](throttledUpdate(350)));
    centerReg(buttonCancel);
    popTitleTxt = new createjs[throttledUpdate(472)]();
    popTitleTxt[throttledUpdate(404)] = "60px bpreplaybold";
    popTitleTxt[throttledUpdate(615)] = throttledUpdate(349);
    popTitleTxt["textAlign"] = "center";
    popTitleTxt["textBaseline"] = throttledUpdate(396);
    popTitleTxt[throttledUpdate(393)] = textDisplay[throttledUpdate(626)];
    popDescTxt = new createjs[throttledUpdate(472)]();
    popDescTxt["font"] = throttledUpdate(397);
    popDescTxt[throttledUpdate(783)] = 50;
    popDescTxt[throttledUpdate(615)] = throttledUpdate(349);
    popDescTxt[throttledUpdate(781)] = "center";
    popDescTxt["textBaseline"] = "alphabetic";
    popDescTxt[throttledUpdate(393)] = textDisplay["exitMessage"];
    confirmContainer[throttledUpdate(501)](itemExit, itemExitP, popTitleTxt, popDescTxt, buttonConfirm, buttonCancel);
    confirmContainer[throttledUpdate(606)] = ![];
    roomContainer = new createjs[throttledUpdate(604)]();
    nameContainer = new createjs[throttledUpdate(604)]();
    gameLogsTxt = new createjs[throttledUpdate(472)]();
    gameLogsTxt["font"] = "20px bpreplaybold";
    gameLogsTxt[throttledUpdate(615)] = throttledUpdate(349);
    gameLogsTxt[throttledUpdate(781)] = throttledUpdate(429);
    gameLogsTxt[throttledUpdate(731)] = throttledUpdate(396);
    gameLogsTxt["text"] = "";
    if (guide) {
        guideline = new createjs["Shape"]();
        guideline[throttledUpdate(556)]
            [throttledUpdate(375)](2)
            [throttledUpdate(419)](throttledUpdate(468))
            ["drawRect"]((stageW - contentW) / 2, (stageH - contentH) / 2, contentW, contentH);
    }
    buttonLocalContainer[throttledUpdate(501)](buttonLocal, buttonOnline);
    mainContainer[throttledUpdate(501)](logo, logoP, buttonPlay, buttonLocalContainer);
    dominoOptionsContainer[throttledUpdate(501)](
        itemOptions,
        itemOptionsP,
        optionsTitleTxt,
        itemPlayerNumbers,
        totalPlayersTxt,
        buttonPlayersL,
        buttonPlayersR,
        itemPoints,
        pointsTxt,
        buttonPointsL,
        buttonPointsR,
        itemType,
        typeTxt,
        buttonTypeL,
        buttonTypeR,
        themeContainer,
        buttonThemeL,
        buttonThemeR,
        buttonStart,
        buttonNext
    );
    boardContainer["addChild"](boardHighlightContainer, boardTileContainer);
    gameContainer[throttledUpdate(501)](boardContainer, boardPlayersContainer, statusContainer, boardScoreContainer);
    resultContainer["addChild"](itemResult, itemResultP, buttonContinue, resultTitleTxt, resultDescTxt);
    if (shareEnable) {
        resultContainer[throttledUpdate(501)](resultShareTxt, buttonFacebook, buttonTwitter, buttonWhatsapp);
    }
    canvasContainer[throttledUpdate(501)](bg, bgP, mainContainer, nameContainer, roomContainer, dominoOptionsContainer, gameContainer, gameLogsTxt, resultContainer, confirmContainer, optionsContainer, buttonSettings, guideline);
    stage[throttledUpdate(501)](canvasContainer);
    changeViewport(viewport["isLandscape"]);
    resizeGameFunc();
}
function _0x243b(opt_attributes, deepDataAndEvents) {
    var args = _0x363b();
    return (
        (_0x243b = function (opt_attributes, deepDataAndEvents) {
            opt_attributes = opt_attributes - 334;
            var pageY = args[opt_attributes];
            return pageY;
        }),
        _0x243b(opt_attributes, deepDataAndEvents)
    );
}
function changeViewport(dataAndEvents) {
    var throttledUpdate = _0x219ef7;
    if (dataAndEvents) {
        stageW = landscapeSize["w"];
        stageH = landscapeSize["h"];
        contentW = landscapeSize["cW"];
        contentH = landscapeSize["cH"];
    } else {
        stageW = portraitSize["w"];
        stageH = portraitSize["h"];
        contentW = portraitSize["cW"];
        contentH = portraitSize["cH"];
    }
    gameCanvas[throttledUpdate(344)] = stageW;
    gameCanvas["height"] = stageH;
    canvasW = stageW;
    canvasH = stageH;
    changeCanvasViewport();
}
function changeCanvasViewport() {
    var parentIfText = _0x219ef7;
    if (canvasContainer != undefined) {
        boardContainer["x"] = canvasW / 2;
        boardContainer["y"] = canvasH / 2;
        if (viewport[parentIfText(471)]) {
            bg[parentIfText(606)] = !![];
            bgP[parentIfText(606)] = ![];
            logo[parentIfText(606)] = !![];
            logoP[parentIfText(606)] = ![];
            buttonPlay["x"] = canvasW / 2;
            buttonPlay["y"] = (canvasH / 100) * 75;
            buttonLocal["x"] = canvasW / 2 - 140;
            buttonLocal["y"] = (canvasH / 100) * 75;
            buttonOnline["x"] = canvasW / 2 + 140;
            buttonOnline["y"] = (canvasH / 100) * 75;
            itemOptions[parentIfText(606)] = !![];
            itemOptionsP[parentIfText(606)] = ![];
            optionsTitleTxt["x"] = canvasW / 2;
            optionsTitleTxt["y"] = (canvasH / 100) * 37;
            itemType["x"] = canvasW / 2;
            itemType["y"] = (canvasH / 100) * 45;
            typeTxt["x"] = itemType["x"];
            typeTxt["y"] = itemType["y"] + 10;
            buttonTypeL["x"] = canvasW / 2 - 200;
            buttonTypeR["x"] = canvasW / 2 + 200;
            buttonTypeL["y"] = buttonTypeR["y"] = itemType["y"];
            itemPoints["x"] = canvasW / 2;
            itemPoints["y"] = (canvasH / 100) * 56;
            pointsTxt["x"] = itemPoints["x"];
            pointsTxt["y"] = itemPoints["y"] + 10;
            buttonPointsL["x"] = canvasW / 2 - 200;
            buttonPointsR["x"] = canvasW / 2 + 200;
            buttonPointsL["y"] = buttonPointsR["y"] = itemPoints["y"];
            buttonNext["x"] = canvasW / 2;
            buttonNext["y"] = (canvasH / 100) * 68;
            buttonStart["x"] = canvasW / 2;
            buttonStart["y"] = (canvasH / 100) * 68;
            itemResult["visible"] = !![];
            itemResultP[parentIfText(606)] = ![];
            buttonFacebook["x"] = (canvasW / 100) * 43;
            buttonFacebook["y"] = (canvasH / 100) * 58;
            buttonTwitter["x"] = canvasW / 2;
            buttonTwitter["y"] = (canvasH / 100) * 58;
            buttonWhatsapp["x"] = (canvasW / 100) * 57;
            buttonWhatsapp["y"] = (canvasH / 100) * 58;
            buttonContinue["x"] = canvasW / 2;
            buttonContinue["y"] = (canvasH / 100) * 68;
            resultShareTxt["x"] = canvasW / 2;
            resultShareTxt["y"] = (canvasH / 100) * 53;
            resultTitleTxt["x"] = canvasW / 2;
            resultTitleTxt["y"] = (canvasH / 100) * 37;
            resultDescTxt["x"] = canvasW / 2;
            resultDescTxt["y"] = (canvasH / 100) * 48;
            itemExit[parentIfText(606)] = !![];
            itemExitP[parentIfText(606)] = ![];
            buttonConfirm["x"] = canvasW / 2 - 140;
            buttonConfirm["y"] = (canvasH / 100) * 68;
            buttonCancel["x"] = canvasW / 2 + 140;
            buttonCancel["y"] = (canvasH / 100) * 68;
            popTitleTxt["x"] = canvasW / 2;
            popTitleTxt["y"] = (canvasH / 100) * 37;
            popDescTxt["x"] = canvasW / 2;
            popDescTxt["y"] = (canvasH / 100) * 45;
            $("#roomWrapper")[parentIfText(782)]("forPortrait");
            $(parentIfText(760))[parentIfText(782)](parentIfText(489));
            $("#roomlists")[parentIfText(775)](parentIfText(699), 10);
            $("#namelists")[parentIfText(775)]("size", 10);
            $(parentIfText(715))[parentIfText(775)]("rows", 10);
        } else {
            boardContainer["x"] = canvasW / 2;
            boardContainer["y"] = (canvasH / 100) * 50;
            bg[parentIfText(606)] = ![];
            bgP[parentIfText(606)] = !![];
            logo[parentIfText(606)] = ![];
            logoP[parentIfText(606)] = !![];
            buttonPlay["x"] = canvasW / 2;
            buttonPlay["y"] = (canvasH / 100) * 73;
            buttonLocal["x"] = canvasW / 2;
            buttonLocal["y"] = (canvasH / 100) * 73;
            buttonOnline["x"] = canvasW / 2;
            buttonOnline["y"] = (canvasH / 100) * 85;
            itemOptions[parentIfText(606)] = ![];
            itemOptionsP[parentIfText(606)] = !![];
            optionsTitleTxt["x"] = canvasW / 2;
            optionsTitleTxt["y"] = (canvasH / 100) * 40;
            itemType["x"] = canvasW / 2;
            itemType["y"] = (canvasH / 100) * 46;
            typeTxt["x"] = itemType["x"];
            typeTxt["y"] = itemType["y"] + 10;
            buttonTypeL["x"] = canvasW / 2 - 200;
            buttonTypeR["x"] = canvasW / 2 + 200;
            buttonTypeL["y"] = buttonTypeR["y"] = itemType["y"];
            itemPoints["x"] = canvasW / 2;
            itemPoints["y"] = (canvasH / 100) * 54;
            pointsTxt["x"] = itemPoints["x"];
            pointsTxt["y"] = itemPoints["y"] + 10;
            buttonPointsL["x"] = canvasW / 2 - 200;
            buttonPointsR["x"] = canvasW / 2 + 200;
            buttonPointsL["y"] = buttonPointsR["y"] = itemPoints["y"];
            buttonNext["x"] = canvasW / 2;
            buttonNext["y"] = (canvasH / 100) * 64;
            buttonStart["x"] = canvasW / 2;
            buttonStart["y"] = (canvasH / 100) * 64;
            itemResult[parentIfText(606)] = ![];
            itemResultP[parentIfText(606)] = !![];
            buttonFacebook["x"] = (canvasW / 100) * 39;
            buttonFacebook["y"] = (canvasH / 100) * 56;
            buttonTwitter["x"] = canvasW / 2;
            buttonTwitter["y"] = (canvasH / 100) * 56;
            buttonWhatsapp["x"] = (canvasW / 100) * 61;
            buttonWhatsapp["y"] = (canvasH / 100) * 56;
            buttonContinue["x"] = canvasW / 2;
            buttonContinue["y"] = (canvasH / 100) * 64;
            resultShareTxt["x"] = canvasW / 2;
            resultShareTxt["y"] = (canvasH / 100) * 52;
            resultTitleTxt["x"] = canvasW / 2;
            resultTitleTxt["y"] = (canvasH / 100) * 40;
            resultDescTxt["x"] = canvasW / 2;
            resultDescTxt["y"] = (canvasH / 100) * 48;
            itemExit[parentIfText(606)] = ![];
            itemExitP["visible"] = !![];
            buttonConfirm["x"] = canvasW / 2 - 130;
            buttonConfirm["y"] = (canvasH / 100) * 64;
            buttonCancel["x"] = canvasW / 2 + 130;
            buttonCancel["y"] = (canvasH / 100) * 64;
            popTitleTxt["x"] = canvasW / 2;
            popTitleTxt["y"] = (canvasH / 100) * 40;
            popDescTxt["x"] = canvasW / 2;
            popDescTxt["y"] = (canvasH / 100) * 48;
            $(parentIfText(734))["addClass"](parentIfText(489));
            $(parentIfText(760))[parentIfText(609)]("forPortrait");
            $(parentIfText(789))[parentIfText(775)](parentIfText(699), 8);
            $(parentIfText(362))[parentIfText(775)](parentIfText(699), 8);
            $(parentIfText(715))["attr"]("rows", 6);
        }
    }
}
function resizeCanvas() {
    var clearCanvas = _0x219ef7;
    if (canvasContainer != undefined) {
        buttonSettings["x"] = canvasW - offset["x"] - 50;
        buttonSettings["y"] = offset["y"] + 45;
        var y = 65;
        var nlong = 0;
        if (curPage != clearCanvas(558)) {
            buttonExit[clearCanvas(606)] = ![];
            buttonSoundOn["x"] = buttonSoundOff["x"] = buttonSettings["x"];
            buttonSoundOn["y"] = buttonSoundOff["y"] = buttonSettings["y"] + y;
            buttonSoundOn["x"] = buttonSoundOff["x"];
            buttonSoundOn["y"] = buttonSoundOff["y"] = buttonSettings["y"] + y;
            if (typeof buttonMusicOn != clearCanvas(391)) {
                buttonMusicOn["x"] = buttonMusicOff["x"] = buttonSettings["x"];
                buttonMusicOn["y"] = buttonMusicOff["y"] = buttonSettings["y"] + y * 2;
                buttonMusicOn["x"] = buttonMusicOff["x"];
                buttonMusicOn["y"] = buttonMusicOff["y"] = buttonSettings["y"] + y * 2;
                nlong = 2;
            } else {
                nlong = 1;
            }
            buttonFullscreen["x"] = buttonSettings["x"];
            buttonFullscreen["y"] = buttonSettings["y"] + y * (nlong + 1);
        } else {
            buttonExit["visible"] = !![];
            buttonSoundOn["x"] = buttonSoundOff["x"] = buttonSettings["x"];
            buttonSoundOn["y"] = buttonSoundOff["y"] = buttonSettings["y"] + y;
            buttonSoundOn["x"] = buttonSoundOff["x"];
            buttonSoundOn["y"] = buttonSoundOff["y"] = buttonSettings["y"] + y;
            if (typeof buttonMusicOn != clearCanvas(391)) {
                buttonMusicOn["x"] = buttonMusicOff["x"] = buttonSettings["x"];
                buttonMusicOn["y"] = buttonMusicOff["y"] = buttonSettings["y"] + y * 2;
                buttonMusicOn["x"] = buttonMusicOff["x"];
                buttonMusicOn["y"] = buttonMusicOff["y"] = buttonSettings["y"] + y * 2;
                nlong = 2;
            } else {
                nlong = 1;
            }
            buttonFullscreen["x"] = buttonSettings["x"];
            buttonFullscreen["y"] = buttonSettings["y"] + y * (nlong + 1);
            buttonExit["x"] = buttonSettings["x"];
            buttonExit["y"] = buttonSettings["y"] + y * (nlong + 2);
        }
        resizeGameLayout();
        resizeSocketLog();
    }
}
function removeGameCanvas() {
    var throttledUpdate = _0x219ef7;
    stage[throttledUpdate(801)] = !![];
    stage[throttledUpdate(488)]();
    stage[throttledUpdate(771)]();
    createjs[throttledUpdate(662)][throttledUpdate(720)](throttledUpdate(618), tick);
    createjs[throttledUpdate(662)][throttledUpdate(720)](throttledUpdate(618), stage);
}
function tick(data) {
    updateGame();
    stage["update"](data);
}
function centerReg(obj) {
    var throttledUpdate = _0x219ef7;
    obj[throttledUpdate(503)] = obj[throttledUpdate(357)]["naturalWidth"] / 2;
    obj[throttledUpdate(594)] = obj["image"][throttledUpdate(712)] / 2;
}
function createHitarea(answers) {
    var computePropValue = _0x219ef7;
    answers[computePropValue(575)] = new createjs[computePropValue(507)](
        new createjs[computePropValue(599)]()["beginFill"]("#000")[computePropValue(438)](0, 0, answers[computePropValue(357)]["naturalWidth"], answers[computePropValue(357)][computePropValue(712)])
    );
}
var themes_arr = [
    {
        bg: {
            front: "assets/theme_bg_01.png",
            back: _0x219ef7(672),
            pos: [
                {
                    x: -25,
                    y: 0,
                },
                {
                    x: 25,
                    y: 0,
                },
            ],
        },
        highlight: {
            image: _0x219ef7(642),
        },
        shadow: {
            image: _0x219ef7(623),
        },
        numbers: {
            image: "assets/theme_numbers_01.png",
            width: 45,
            height: 45,
        },
    },
    {
        bg: {
            front: _0x219ef7(593),
            back: _0x219ef7(500),
            pos: [
                {
                    x: -25,
                    y: 0,
                },
                {
                    x: 25,
                    y: 0,
                },
            ],
        },
        highlight: {
            image: "assets/theme_highlight_02.png",
        },
        shadow: {
            image: _0x219ef7(554),
        },
        numbers: {
            image: "assets/theme_numbers_02.png",
            width: 45,
            height: 45,
        },
    },
    {
        bg: {
            front: "assets/theme_bg_03.png",
            back: "assets/theme_cover_03.png",
            pos: [
                {
                    x: -25,
                    y: 0,
                },
                {
                    x: 25,
                    y: 0,
                },
            ],
        },
        highlight: {
            image: "assets/theme_highlight_03.png",
        },
        shadow: {
            image: "assets/theme_shadow_01.png",
        },
        numbers: {
            image: "assets/theme_numbers_03.png",
            width: 45,
            height: 45,
        },
    },
    {
        bg: {
            front: _0x219ef7(378),
            back: _0x219ef7(504),
            pos: [
                {
                    x: -25,
                    y: 0,
                },
                {
                    x: 25,
                    y: 0,
                },
            ],
        },
        highlight: {
            image: _0x219ef7(547),
        },
        shadow: {
            image: "assets/theme_shadow_01.png",
        },
        numbers: {
            image: "assets/theme_numbers_04.png",
            width: 45,
            height: 45,
        },
    },
    {
        bg: {
            front: _0x219ef7(522),
            back: _0x219ef7(772),
            pos: [
                {
                    x: -25,
                    y: 0,
                },
                {
                    x: 25,
                    y: 0,
                },
            ],
        },
        highlight: {
            image: "assets/theme_highlight_05.png",
        },
        shadow: {
            image: "assets/theme_shadow_01.png",
        },
        numbers: {
            image: _0x219ef7(624),
            width: 45,
            height: 45,
        },
    },
];
var tiles_arr = [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [0, 6],
    [1, 1],
    [1, 2],
    [1, 3],
    [1, 4],
    [1, 5],
    [1, 6],
    [2, 2],
    [2, 3],
    [2, 4],
    [2, 5],
    [2, 6],
    [3, 3],
    [3, 4],
    [3, 5],
    [3, 6],
    [4, 4],
    [4, 5],
    [4, 6],
    [5, 5],
    [5, 6],
    [6, 6],
];
var gameSettings = {
    tileSpace: 10,
    tilePlacedSpace: 2,
    tileShadowSpace: 5,
    tileMoveSpeed: 0.5,
    tileDealSpeed: 0.4,
    aiThinkSpeed: 1.5,
    aiDrawSpeed: 1,
    dragToMove: !![],
    autoMove: ![],
    points: [10, 150, 200],
    playerTotalTiles: [
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
};
var textDisplay = {
    optionsTitle: _0x219ef7(534),
    totalPlayers: "[NUMBER] JUGADORES",
    goalPoint: _0x219ef7(486),
    typeDraw: _0x219ef7(706),
    typeBlock: "BLOCK DOMINOES",
    playerName: _0x219ef7(518),
    playerScore: _0x219ef7(705),
    highestToStart: _0x219ef7(614),
    playerNoMove: _0x219ef7(737),
    playerCantMove: "NO TIENES MOVIMIENTOS",
    playerBlocked: _0x219ef7(502),
    userPickDomino: "ELIGE UNA FICHA DE LA PILA",
    playerPickDomino: _0x219ef7(403),
    playerDomino: _0x219ef7(433),
    playerRoundWin: _0x219ef7(815),
    playerRoundLose: "PERDISTE ESTA MANO",
    roundEnd: "MANO CULMINADA",
    goalPointTitle: _0x219ef7(414),
    playerScoreAdd: _0x219ef7(394),
    userWin: _0x219ef7(682),
    playerWin: _0x219ef7(793),
    exitTitle: _0x219ef7(629),
    exitMessage: _0x219ef7(541),
    share: _0x219ef7(485),
    resultTitle: _0x219ef7(780),
    resultDesc: "[NUMBER]PTS",
};
var shareEnable = !![];
var shareTitle = "La puntuación más alta en Play Dominoes es [SCORE]PTS";
var shareMessage = _0x219ef7(499);
$[_0x219ef7(492)] = {
    enable: ![],
};
var playerData = {
    score: 0,
    scores: [],
};
var gameData = {
    paused: !![],
    moving: ![],
    player: 0,
    players: 0,
    pointIndex: 0,
    themeIndex: 0,
    drawing: ![],
    ai: !![],
    complete: ![],
    names: [],
};
var tweenData = {
    score: 0,
    tweenScore: 0,
};
function buildGameButton() {
    var throttledUpdate = _0x219ef7;
    $(window)["focus"](function () {
        var throttledUpdate = _0x243b;
        if (!buttonSoundOn[throttledUpdate(606)]) {
            toggleSoundInMute(![]);
        }
        if (typeof buttonMusicOn != "undefined") {
            if (!buttonMusicOn[throttledUpdate(606)]) {
                toggleMusicInMute(![]);
            }
        }
    });
    $(window)[throttledUpdate(413)](function () {
        var tryIt = throttledUpdate;
        if (!buttonSoundOn["visible"]) {
            toggleSoundInMute(!![]);
        }
        if (typeof buttonMusicOn != tryIt(391)) {
            if (!buttonMusicOn[tryIt(606)]) {
                toggleMusicInMute(!![]);
            }
        }
    });
    buttonPlay[throttledUpdate(745)] = "pointer";
    buttonPlay[throttledUpdate(664)]("click", function (dataAndEvents) {
        var tryIt = throttledUpdate;
        playSound("soundButton");
        if (typeof initSocket == tryIt(427) && multiplayerSettings[tryIt(750)]) {
            if (multiplayerSettings[tryIt(395)]) {
                toggleMainButton(tryIt(667));
            } else {
                checkQuickGameMode();
            }
        } else {
            // goPage(tryIt(678));
            goPage("game");
        }
    });
    buttonLocal["cursor"] = throttledUpdate(435);
    buttonLocal[throttledUpdate(664)]("click", function (dataAndEvents) {
        var tryIt = throttledUpdate;
        playSound(tryIt(582));
        socketData[tryIt(634)] = ![];
        goPage(tryIt(678));
    });
    buttonOnline[throttledUpdate(745)] = throttledUpdate(435);
    buttonOnline[throttledUpdate(664)](throttledUpdate(376), function (dataAndEvents) {
        var tryIt = throttledUpdate;
        playSound(tryIt(582));
        checkQuickGameMode();
    });
    buttonPlayersL[throttledUpdate(745)] = "pointer";
    buttonPlayersL[throttledUpdate(664)](throttledUpdate(376), function (dataAndEvents) {
        var tryIt = throttledUpdate;
        playSound(tryIt(582));
        toggleTotalPlayers(![]);
    });
    buttonPlayersR[throttledUpdate(745)] = throttledUpdate(435);
    buttonPlayersR[throttledUpdate(664)]("click", function (dataAndEvents) {
        var tryIt = throttledUpdate;
        playSound(tryIt(582));
        toggleTotalPlayers(!![]);
    });
    buttonPointsL[throttledUpdate(745)] = throttledUpdate(435);
    buttonPointsL[throttledUpdate(664)]("click", function (dataAndEvents) {
        var tryIt = throttledUpdate;
        playSound(tryIt(582));
        togglePoints(![]);
    });
    buttonPointsR[throttledUpdate(745)] = "pointer";
    buttonPointsR[throttledUpdate(664)](throttledUpdate(376), function (dataAndEvents) {
        playSound("soundButton");
        togglePoints(!![]);
    });
    buttonTypeL[throttledUpdate(745)] = throttledUpdate(435);
    buttonTypeL[throttledUpdate(664)]("click", function (dataAndEvents) {
        playSound("soundButton");
        toggleGameType(![]);
    });
    buttonTypeR[throttledUpdate(745)] = throttledUpdate(435);
    buttonTypeR[throttledUpdate(664)](throttledUpdate(376), function (dataAndEvents) {
        var tryIt = throttledUpdate;
        playSound(tryIt(582));
        toggleGameType(!![]);
    });
    buttonThemeL[throttledUpdate(745)] = throttledUpdate(435);
    buttonThemeL[throttledUpdate(664)](throttledUpdate(376), function (dataAndEvents) {
        var tryIt = throttledUpdate;
        playSound(tryIt(582));
        toggleTheme(![]);
    });
    buttonThemeR[throttledUpdate(745)] = "pointer";
    buttonThemeR["addEventListener"]("click", function (dataAndEvents) {
        playSound("soundButton");
        toggleTheme(!![]);
    });
    buttonNext[throttledUpdate(745)] = throttledUpdate(435);
    buttonNext["addEventListener"](throttledUpdate(376), function (dataAndEvents) {
        var tryIt = throttledUpdate;
        playSound(tryIt(582));
        toggleDominoOptions(![]);
    });
    buttonStart["cursor"] = "pointer";
    buttonStart[throttledUpdate(664)](throttledUpdate(376), function (dataAndEvents) {
        var tryIt = throttledUpdate;
        playSound("soundButton");
        if (typeof initSocket == tryIt(427) && multiplayerSettings["enable"] && socketData["online"]) {
            postSocketUpdate(tryIt(762));
        } else {
            goPage(tryIt(558));
        }
    });
    itemExit["addEventListener"](throttledUpdate(376), function (dataAndEvents) {});
    buttonContinue[throttledUpdate(745)] = throttledUpdate(435);
    buttonContinue["addEventListener"](throttledUpdate(376), function (dataAndEvents) {
        var tryIt = throttledUpdate;
        playSound(tryIt(582));
        goPage("main");
    });
    buttonFacebook[throttledUpdate(745)] = throttledUpdate(435);
    buttonFacebook[throttledUpdate(664)](throttledUpdate(376), function (dataAndEvents) {
        var tryIt = throttledUpdate;
        share(tryIt(458));
    });
    buttonTwitter[throttledUpdate(745)] = throttledUpdate(435);
    buttonTwitter[throttledUpdate(664)](throttledUpdate(376), function (dataAndEvents) {
        var tryIt = throttledUpdate;
        share(tryIt(752));
    });
    buttonWhatsapp[throttledUpdate(745)] = throttledUpdate(435);
    buttonWhatsapp[throttledUpdate(664)](throttledUpdate(376), function (dataAndEvents) {
        share("whatsapp");
    });
    buttonSoundOff[throttledUpdate(745)] = throttledUpdate(435);
    buttonSoundOff[throttledUpdate(664)](throttledUpdate(376), function (dataAndEvents) {
        toggleSoundMute(!![]);
    });
    buttonSoundOn["cursor"] = throttledUpdate(435);
    buttonSoundOn[throttledUpdate(664)](throttledUpdate(376), function (dataAndEvents) {
        toggleSoundMute(![]);
    });
    if (typeof buttonMusicOff != throttledUpdate(391)) {
        buttonMusicOff[throttledUpdate(745)] = throttledUpdate(435);
        buttonMusicOff[throttledUpdate(664)](throttledUpdate(376), function (dataAndEvents) {
            toggleMusicMute(!![]);
        });
    }
    if (typeof buttonMusicOn != throttledUpdate(391)) {
        buttonMusicOn["cursor"] = throttledUpdate(435);
        buttonMusicOn[throttledUpdate(664)](throttledUpdate(376), function (dataAndEvents) {
            toggleMusicMute(![]);
        });
    }
    buttonFullscreen[throttledUpdate(745)] = "pointer";
    buttonFullscreen["addEventListener"](throttledUpdate(376), function (dataAndEvents) {
        toggleFullScreen();
    });
    buttonExit[throttledUpdate(745)] = throttledUpdate(435);
    buttonExit[throttledUpdate(664)]("click", function (dataAndEvents) {
        togglePop(!![]);
        toggleOption();
    });
    buttonSettings[throttledUpdate(745)] = throttledUpdate(435);
    buttonSettings[throttledUpdate(664)](throttledUpdate(376), function (dataAndEvents) {
        toggleOption();
    });
    buttonConfirm[throttledUpdate(745)] = throttledUpdate(435);
    buttonConfirm["addEventListener"](throttledUpdate(376), function (dataAndEvents) {
        var tryIt = throttledUpdate;
        playSound(tryIt(582));
        togglePop(![]);
        stopAudio();
        stopGame();
        goPage("main");
        if (typeof initSocket == "function") {
            if (multiplayerSettings[tryIt(750)]) {
                if (socketData[tryIt(634)]) {
                    exitSocketRoom();
                }
            }
        }
    });
    buttonCancel[throttledUpdate(745)] = throttledUpdate(435);
    buttonCancel[throttledUpdate(664)]("click", function (dataAndEvents) {
        var tryIt = throttledUpdate;
        playSound(tryIt(582));
        togglePop(![]);
    });
    itemDrawBg[throttledUpdate(664)](throttledUpdate(376), function (dataAndEvents) {});
    gameData[throttledUpdate(579)] = {
        draw: true,
        point: 20,
    };
    gameData[throttledUpdate(759)] = 4;
    gameData[throttledUpdate(644)] = 2;
    gameData[throttledUpdate(380)] = gameData["minPlayers"];
    gameData["players"] = 2;
    gameData[throttledUpdate(361)] = 0;
    gameData[throttledUpdate(409)] = 0;
    gameData[throttledUpdate(822)] = -1;
    gameData[throttledUpdate(779)] = !![];
    displayDominoOptions();
}
function toggleMainButton(dataAndEvents) {
    var throttledUpdate = _0x219ef7;
    if (typeof initSocket == throttledUpdate(427)) {
        if (multiplayerSettings[throttledUpdate(750)]) {
            gameLogsTxt[throttledUpdate(606)] = !![];
            gameLogsTxt[throttledUpdate(393)] = "";
        }
    }
    buttonPlay[throttledUpdate(606)] = ![];
    buttonLocalContainer["visible"] = ![];
    if (dataAndEvents == throttledUpdate(338)) {
        buttonPlay[throttledUpdate(606)] = !![];
    } else {
        if (dataAndEvents == throttledUpdate(667)) {
            buttonLocalContainer["visible"] = !![];
        }
    }
}
function checkQuickGameMode() {
    var throttledUpdate = _0x219ef7;
    socketData[throttledUpdate(634)] = !![];
    if (!multiplayerSettings["enterName"]) {
        buttonPlay["visible"] = ![];
        buttonLocalContainer[throttledUpdate(606)] = ![];
        addSocketRandomUser();
    } else {
        goPage(throttledUpdate(806));
    }
}
function toggleTotalPlayers(recurring) {
    var throttledUpdate = _0x219ef7;
    if (recurring) {
        gameData["players"]++;
        gameData["players"] = gameData[throttledUpdate(380)] > gameData[throttledUpdate(759)] ? gameData["maxPlayers"] : gameData[throttledUpdate(380)];
    } else {
        gameData[throttledUpdate(380)]--;
        gameData["players"] = gameData[throttledUpdate(380)] < gameData[throttledUpdate(644)] ? gameData[throttledUpdate(644)] : gameData[throttledUpdate(380)];
    }
    displayDominoOptions();
    if (typeof initSocket == "function") {
        if (multiplayerSettings[throttledUpdate(750)]) {
            if (socketData[throttledUpdate(634)]) {
                if (socketData[throttledUpdate(633)]) {
                    postSocketUpdate(
                        throttledUpdate(785),
                        {
                            pointIndex: gameData[throttledUpdate(361)],
                            draw: gameData[throttledUpdate(579)][throttledUpdate(537)],
                            themeIndex: gameData[throttledUpdate(409)],
                            options: gameData[throttledUpdate(779)],
                        },
                        !![]
                    );
                }
            }
        }
    }
}
function togglePoints(recurring) {
    var throttledUpdate = _0x219ef7;
    if (recurring) {
        gameData[throttledUpdate(361)]++;
        gameData[throttledUpdate(361)] = gameData[throttledUpdate(361)] > gameSettings[throttledUpdate(578)][throttledUpdate(373)] - 1 ? gameSettings[throttledUpdate(578)]["length"] - 1 : gameData[throttledUpdate(361)];
    } else {
        gameData[throttledUpdate(361)]--;
        gameData[throttledUpdate(361)] = gameData[throttledUpdate(361)] < 0 ? 0 : gameData[throttledUpdate(361)];
    }
    displayDominoOptions();
    if (typeof initSocket == throttledUpdate(427)) {
        if (multiplayerSettings["enable"]) {
            if (socketData[throttledUpdate(634)]) {
                if (socketData[throttledUpdate(633)]) {
                    postSocketUpdate(
                        throttledUpdate(785),
                        {
                            pointIndex: gameData[throttledUpdate(361)],
                            draw: gameData["domino"][throttledUpdate(537)],
                            themeIndex: gameData[throttledUpdate(409)],
                            options: gameData[throttledUpdate(779)],
                        },
                        !![]
                    );
                }
            }
        }
    }
}
function toggleGameType(recurring) {
    var throttledUpdate = _0x219ef7;
    gameData[throttledUpdate(579)][throttledUpdate(537)] = recurring;
    displayDominoOptions();
    if (typeof initSocket == throttledUpdate(427)) {
        if (multiplayerSettings[throttledUpdate(750)]) {
            if (socketData[throttledUpdate(634)]) {
                if (socketData[throttledUpdate(633)]) {
                    postSocketUpdate(
                        "updateoptions",
                        {
                            pointIndex: gameData["pointIndex"],
                            draw: gameData["domino"][throttledUpdate(537)],
                            themeIndex: gameData[throttledUpdate(409)],
                            options: gameData["optionsFirst"],
                        },
                        !![]
                    );
                }
            }
        }
    }
}
function toggleTheme(recurring) {
    var throttledUpdate = _0x219ef7;
    if (recurring) {
        gameData[throttledUpdate(409)]++;
        gameData["themeIndex"] = gameData["themeIndex"] > themes_arr[throttledUpdate(373)] - 1 ? themes_arr[throttledUpdate(373)] - 1 : gameData[throttledUpdate(409)];
    } else {
        gameData[throttledUpdate(409)]--;
        gameData[throttledUpdate(409)] = gameData[throttledUpdate(409)] < 0 ? 0 : gameData["themeIndex"];
    }
    displayDominoOptions();
    if (typeof initSocket == throttledUpdate(427)) {
        if (multiplayerSettings[throttledUpdate(750)]) {
            if (socketData[throttledUpdate(634)]) {
                if (socketData[throttledUpdate(633)]) {
                    postSocketUpdate(
                        throttledUpdate(785),
                        {
                            pointIndex: gameData["pointIndex"],
                            draw: gameData[throttledUpdate(579)]["draw"],
                            themeIndex: gameData[throttledUpdate(409)],
                            options: gameData[throttledUpdate(779)],
                        },
                        !![]
                    );
                }
            }
        }
    }
}
function displayDominoOptions() {
    var throttledUpdate = _0x219ef7;
    totalPlayersTxt["text"] = textDisplay[throttledUpdate(437)][throttledUpdate(553)](throttledUpdate(386), gameData[throttledUpdate(380)]);
    pointsTxt[throttledUpdate(393)] = textDisplay[throttledUpdate(689)]["replace"](throttledUpdate(386), gameSettings[throttledUpdate(578)][gameData["pointIndex"]]);
    typeTxt[throttledUpdate(393)] = gameData[throttledUpdate(579)][throttledUpdate(537)] == !![] ? textDisplay[throttledUpdate(474)] : textDisplay[throttledUpdate(735)];
    gameData[throttledUpdate(579)]["point"] = gameSettings[throttledUpdate(578)][gameData[throttledUpdate(361)]];
    if (gameData[throttledUpdate(822)] != gameData[throttledUpdate(409)]) {
        gameData["lastThemeIndex"] = gameData["themeIndex"];
        themeContainer[throttledUpdate(488)]();
        var r20 = new createjs["Container"]();
        var suiteView = new createjs[throttledUpdate(431)](loader["getResult"](throttledUpdate(367) + gameData["themeIndex"]));
        centerReg(suiteView);
        r20[throttledUpdate(501)](suiteView);
        var w = themes_arr[gameData[throttledUpdate(409)]][throttledUpdate(627)][throttledUpdate(344)];
        var dialogHeight = themes_arr[gameData[throttledUpdate(409)]]["numbers"][throttledUpdate(516)];
        var config = {
            regX: w / 2,
            regY: w / 2,
            count: 7,
            width: w,
            height: dialogHeight,
        };
        var animations = {
            animate: {
                frames: [0, 1, 2, 3, 4, 5, 6],
                speed: 1,
            },
        };
        var scope = new createjs[throttledUpdate(563)]({
            images: [loader[throttledUpdate(803)](throttledUpdate(828) + gameData["themeIndex"])["src"]],
            frames: config,
            animations: animations,
        });
        var info = new createjs[throttledUpdate(653)](scope, throttledUpdate(400));
        info["framerate"] = 20;
        var x = Math[throttledUpdate(765)](Math[throttledUpdate(707)]() * tiles_arr[throttledUpdate(373)]);
        var z = 0;
        for (; z < themes_arr[gameData[throttledUpdate(409)]]["bg"][throttledUpdate(506)][throttledUpdate(373)]; z++) {
            var nextState = info[throttledUpdate(345)](!![]);
            nextState["x"] = themes_arr[gameData["themeIndex"]]["bg"][throttledUpdate(506)][z]["x"];
            nextState["y"] = themes_arr[gameData[throttledUpdate(409)]]["bg"][throttledUpdate(506)][z]["y"];
            nextState[throttledUpdate(659)](tiles_arr[x][z]);
            r20[throttledUpdate(501)](nextState);
        }
        r20[throttledUpdate(521)] = r20[throttledUpdate(353)] = 1.2;
        themeContainer[throttledUpdate(501)](r20);
    }
}
function toggleDominoOptions(recurring) {
    var throttledUpdate = _0x219ef7;
    gameData[throttledUpdate(779)] = recurring;
    itemPlayerNumbers[throttledUpdate(606)] = ![];
    totalPlayersTxt[throttledUpdate(606)] = ![];
    buttonPlayersL[throttledUpdate(606)] = ![];
    buttonPlayersR[throttledUpdate(606)] = ![];
    itemPoints["visible"] = ![];
    pointsTxt[throttledUpdate(606)] = ![];
    buttonPointsL["visible"] = ![];
    buttonPointsR["visible"] = ![];
    itemType[throttledUpdate(606)] = ![];
    typeTxt[throttledUpdate(606)] = ![];
    buttonTypeL["visible"] = ![];
    buttonTypeR[throttledUpdate(606)] = ![];
    themeContainer[throttledUpdate(606)] = ![];
    buttonThemeL[throttledUpdate(606)] = ![];
    buttonThemeR["visible"] = ![];
    buttonNext["visible"] = ![];
    buttonStart[throttledUpdate(606)] = ![];
    if (recurring) {
        itemPoints["visible"] = !![];
        pointsTxt[throttledUpdate(606)] = !![];
        buttonPointsL[throttledUpdate(606)] = !![];
        buttonPointsR[throttledUpdate(606)] = !![];
        itemType[throttledUpdate(606)] = !![];
        typeTxt[throttledUpdate(606)] = !![];
        buttonTypeL["visible"] = !![];
        buttonTypeR[throttledUpdate(606)] = !![];
        buttonNext[throttledUpdate(606)] = !![];
        if (typeof initSocket == throttledUpdate(427)) {
            if (multiplayerSettings[throttledUpdate(750)]) {
                if (socketData[throttledUpdate(634)]) {
                    if (!socketData[throttledUpdate(633)]) {
                        buttonPointsL[throttledUpdate(606)] = ![];
                        buttonPointsR[throttledUpdate(606)] = ![];
                        buttonTypeL[throttledUpdate(606)] = ![];
                        buttonTypeR[throttledUpdate(606)] = ![];
                        buttonNext[throttledUpdate(606)] = ![];
                    }
                }
            }
        }
    } else {
        itemPlayerNumbers[throttledUpdate(606)] = !![];
        totalPlayersTxt[throttledUpdate(606)] = !![];
        buttonPlayersL[throttledUpdate(606)] = !![];
        buttonPlayersR[throttledUpdate(606)] = !![];
        themeContainer["visible"] = !![];
        buttonThemeL[throttledUpdate(606)] = !![];
        buttonThemeR["visible"] = !![];
        buttonStart[throttledUpdate(606)] = !![];
        if (typeof initSocket == throttledUpdate(427)) {
            if (multiplayerSettings[throttledUpdate(750)]) {
                if (socketData[throttledUpdate(634)]) {
                    itemPlayerNumbers["visible"] = ![];
                    totalPlayersTxt[throttledUpdate(606)] = ![];
                    buttonPlayersL[throttledUpdate(606)] = ![];
                    buttonPlayersR[throttledUpdate(606)] = ![];
                    if (!socketData["host"]) {
                        buttonPointsL[throttledUpdate(606)] = ![];
                        buttonPointsR[throttledUpdate(606)] = ![];
                        buttonThemeL["visible"] = ![];
                        buttonThemeR[throttledUpdate(606)] = ![];
                        buttonStart[throttledUpdate(606)] = ![];
                    }
                }
            }
        }
    }
    displayDominoOptions();
    if (typeof initSocket == throttledUpdate(427)) {
        if (multiplayerSettings["enable"]) {
            if (socketData[throttledUpdate(634)]) {
                if (socketData[throttledUpdate(633)]) {
                    postSocketUpdate(
                        "updateoptions",
                        {
                            pointIndex: gameData[throttledUpdate(361)],
                            draw: gameData[throttledUpdate(579)][throttledUpdate(537)],
                            themeIndex: gameData[throttledUpdate(409)],
                            options: gameData["optionsFirst"],
                        },
                        !![]
                    );
                }
            }
        }
    }
    resizeGameLayout();
}
function resizeSocketLog() {
    var throttledUpdate = _0x219ef7;
    if (curPage == throttledUpdate(449)) {
        if (viewport[throttledUpdate(471)]) {
            gameLogsTxt["x"] = canvasW / 2;
            gameLogsTxt["y"] = (canvasH / 100) * 75;
        } else {
            gameLogsTxt["x"] = canvasW / 2;
            gameLogsTxt["y"] = (canvasH / 100) * 75;
        }
    } else {
        if (curPage == "options") {
            if (viewport["isLandscape"]) {
                gameLogsTxt["x"] = canvasW / 2;
                gameLogsTxt["y"] = (canvasH / 100) * 67;
            } else {
                gameLogsTxt["x"] = canvasW / 2;
                gameLogsTxt["y"] = (canvasH / 100) * 65;
            }
        }
    }
}
function togglePop(recurring) {
    var throttledUpdate = _0x219ef7;
    confirmContainer[throttledUpdate(606)] = recurring;
}
var curPage = "";
function goPage(main) {
    var parentIfText = _0x219ef7;
    curPage = main;
    $(parentIfText(734))[parentIfText(490)]();
    $(parentIfText(430))[parentIfText(490)]();
    gameLogsTxt[parentIfText(606)] = ![];
    mainContainer["visible"] = ![];
    nameContainer[parentIfText(606)] = ![];
    roomContainer[parentIfText(606)] = ![];
    dominoOptionsContainer[parentIfText(606)] = ![];
    gameContainer["visible"] = ![];
    resultContainer[parentIfText(606)] = ![];
    var r20 = null;
    switch (main) {
        case "main":
            r20 = mainContainer;
            if (typeof initSocket == "function") {
                if (multiplayerSettings[parentIfText(750)]) {
                    socketData[parentIfText(634)] = ![];
                }
            }
            toggleMainButton(parentIfText(338));
            playMusicLoop("musicMain");
            break;
        case parentIfText(806):
            r20 = nameContainer;
            $(parentIfText(734))[parentIfText(673)]();
            $(parentIfText(630))["show"]();
            $(parentIfText(557))[parentIfText(628)]("");
            $("#enterName")[parentIfText(673)]();
            break;
        case parentIfText(550):
            r20 = roomContainer;
            $(parentIfText(734))["show"]();
            $("#roomWrapper .roomContent")[parentIfText(673)]();
            switchSocketRoomContent(parentIfText(351));
            break;
        case parentIfText(678):
            r20 = dominoOptionsContainer;
            toggleDominoOptions(!![]);
            break;
        case "game":
            r20 = gameContainer;
            playMusicLoop("musicGame");
            stopMusicLoop(parentIfText(631));
            startGame();
            break;
        case parentIfText(589):
            r20 = resultContainer;
            stopGame();
            togglePop(![]);
            playMusicLoop(parentIfText(631));
            stopMusicLoop(parentIfText(647));
            playSound(parentIfText(814));
            tweenData[parentIfText(453)] = 0;
            if (typeof initSocket == parentIfText(427) && multiplayerSettings[parentIfText(750)] && socketData["online"]) {
                playerData[parentIfText(583)] = playerData[parentIfText(716)][socketData[parentIfText(363)]];
                if (socketData[parentIfText(633)]) {
                    postSocketCloseRoom();
                }
            } else {
                playerData[parentIfText(583)] = playerData[parentIfText(716)][0];
            }
            tweenData["tweenScore"] = 0;
            TweenMax["to"](tweenData, 0.5, {
                tweenScore: playerData[parentIfText(583)],
                overwrite: !![],
                onUpdate: function () {
                    var asyncForEach = parentIfText;
                    resultDescTxt[asyncForEach(393)] = textDisplay["resultDesc"]["replace"]("[NUMBER]", addCommas(Math[asyncForEach(765)](tweenData[asyncForEach(453)])));
                },
            });
            saveGame(playerData[parentIfText(583)]);
            break;
    }
    if (r20 != null) {
        r20[parentIfText(606)] = !![];
        r20["alpha"] = 0;
        TweenMax["to"](r20, 0.5, {
            alpha: 1,
            overwrite: !![],
        });
    }
    resizeCanvas();
}
function startGame() {
    var requestAnimationFrame = _0x219ef7;
    gameData["paused"] = ![];
    playerData[requestAnimationFrame(716)] = [];
    var _0x4017d8 = 0;
    for (; _0x4017d8 < gameData[requestAnimationFrame(380)]; _0x4017d8++) {
        playerData[requestAnimationFrame(716)][requestAnimationFrame(574)](0);
    }
    startDomino();
}
function startDomino() {
    var throttledUpdate = _0x219ef7;
    statusContainer[throttledUpdate(773)] = 0;
    toggleRoundScore(![]);
    prepareDomino();
    if (typeof initSocket == "function" && multiplayerSettings[throttledUpdate(750)] && socketData[throttledUpdate(634)]) {
        gameData["ai"] = ![];
        postSocketUpdate("ready", socketData[throttledUpdate(363)]);
    } else {
        gameData["ai"] = !![];
        preparePlayers();
    }
}
function stopGame() {
    var throttledUpdate = _0x219ef7;
    gameData[throttledUpdate(562)] = !![];
    TweenMax[throttledUpdate(787)](![], !![], ![]);
}
function saveGame(inSender) {
    var S4 = _0x219ef7;
    if (typeof toggleScoreboardSave == S4(427)) {
        $[S4(694)][S4(583)] = inSender;
        if (typeof type != S4(391)) {
            $[S4(694)][S4(697)] = type;
        }
        toggleScoreboardSave(!![]);
    }
}
function prepareDomino() {
    var computePropValue = _0x219ef7;
    gameData["drawing"] = ![];
    gameData[computePropValue(420)] = {
        width: 0,
        height: 0,
    };
    gameData[computePropValue(723)] = [];
    gameData["tiles"] = [];
    gameData[computePropValue(537)] = [];
    gameData[computePropValue(805)] = [];
    gameData[computePropValue(641)] = {
        status: ![],
        animation: ![],
        count: 0,
        total: 0,
        delay: 0,
    };
    gameData["tileSelected"] = -1;
    gameData["tilesIndex"] = 0;
    gameData[computePropValue(754)] = ![];
    gameData[computePropValue(358)] = ![];
    if (typeof initSocket == computePropValue(427) && multiplayerSettings[computePropValue(750)] && socketData[computePropValue(634)]) {
        var time = socketData[computePropValue(363)];
        var name = 0;
        for (; name < gameData["players"]; name++) {
            gameData[computePropValue(805)][computePropValue(574)](time);
            time++;
            time = time > gameData["players"] - 1 ? 0 : time;
        }
    } else {
        name = 0;
        for (; name < gameData[computePropValue(380)]; name++) {
            gameData[computePropValue(805)]["push"](name);
        }
    }
    playSound(computePropValue(710));
    boardTileContainer["removeAllChildren"]();
    boardHighlightContainer[computePropValue(488)]();
    name = 0;
    for (; name < tiles_arr[computePropValue(373)]; name++) {
        $["domino"][name] = new createjs[computePropValue(604)]();
        $["domino"][name][computePropValue(717)] = new createjs[computePropValue(604)]();
        $[computePropValue(579)][name][computePropValue(717)][computePropValue(606)] = ![];
        var suiteView = new createjs[computePropValue(431)](loader[computePropValue(803)](computePropValue(498) + gameData[computePropValue(409)]));
        centerReg(suiteView);
        suiteView[computePropValue(606)] = ![];
        $["domino"][name][computePropValue(501)](suiteView);
        $[computePropValue(579)][name]["highlight"] = suiteView;
        var answers = new createjs[computePropValue(431)](loader["getResult"](computePropValue(367) + gameData[computePropValue(409)]));
        centerReg(answers);
        gameData[computePropValue(420)][computePropValue(344)] = answers[computePropValue(357)][computePropValue(406)];
        gameData[computePropValue(420)][computePropValue(516)] = answers["image"][computePropValue(712)];
        $["domino"][name][computePropValue(717)][computePropValue(501)](answers);
        var w = themes_arr[gameData[computePropValue(409)]][computePropValue(627)]["width"];
        var dialogHeight = themes_arr[gameData[computePropValue(409)]][computePropValue(627)][computePropValue(516)];
        var config = {
            regX: w / 2,
            regY: w / 2,
            count: 7,
            width: w,
            height: dialogHeight,
        };
        var animations = {
            animate: {
                frames: [0, 1, 2, 3, 4, 5, 6],
                speed: 1,
            },
        };
        var element = new createjs[computePropValue(563)]({
            images: [loader[computePropValue(803)]("themeNumbers" + gameData["themeIndex"])[computePropValue(632)]],
            frames: config,
            animations: animations,
        });
        var wrapper = new createjs[computePropValue(653)](element, computePropValue(400));
        wrapper[computePropValue(398)] = 20;
        var i = 0;
        for (; i < themes_arr[gameData["themeIndex"]]["bg"][computePropValue(506)]["length"]; i++) {
            var nextState = wrapper["clone"](!![]);
            nextState["x"] = themes_arr[gameData[computePropValue(409)]]["bg"]["pos"][i]["x"];
            nextState["y"] = themes_arr[gameData[computePropValue(409)]]["bg"][computePropValue(506)][i]["y"];
            nextState[computePropValue(659)](tiles_arr[name][i]);
            $[computePropValue(579)][name][computePropValue(717)][computePropValue(501)](nextState);
        }
        var reversed = new createjs[computePropValue(431)](loader[computePropValue(803)]("themeBgBack" + gameData[computePropValue(409)]));
        centerReg(reversed);
        $[computePropValue(579)][name][computePropValue(501)](reversed, $["domino"][name][computePropValue(717)]);
        var moveX = randomIntFromInterval(-250, 250);
        var moveY = randomIntFromInterval(-150, 150);
        var angle = randomIntFromInterval(0, 360);
        $["domino"][name][computePropValue(627)] = tiles_arr[name]["slice"]();
        $["domino"][name][computePropValue(683)] = ![];
        $["domino"][name][computePropValue(567)] = name;
        $["domino"][name][computePropValue(337)] = ![];
        $[computePropValue(579)][name][computePropValue(354)] = 0;
        $["domino"][name][computePropValue(823)] = 0;
        $["domino"][name][computePropValue(810)] = 0;
        TweenMax["to"]($["domino"][name], gameSettings["tileDealSpeed"], {
            x: moveX,
            y: moveY,
            rotation: angle,
            overwrite: !![],
        });
        if ($[computePropValue(579)][name]["numbers"][0] == $[computePropValue(579)][name][computePropValue(627)][1]) {
            $[computePropValue(579)][name][computePropValue(337)] = !![];
        }
        $[computePropValue(579)][name][computePropValue(745)] = computePropValue(435);
        $["domino"][name]["addEventListener"](computePropValue(376), function (visibleTiles) {
            var POS2TILE = computePropValue;
            var _0x5d1b7c = ![];
            if (typeof initSocket == "function" && multiplayerSettings[POS2TILE(750)] && socketData[POS2TILE(634)]) {
                if (gameData[POS2TILE(741)] == socketData[POS2TILE(363)]) {
                    _0x5d1b7c = !![];
                }
            } else {
                if (gameData[POS2TILE(741)] == 0) {
                    _0x5d1b7c = !![];
                }
            }
            if (_0x5d1b7c) {
                if (gameData[POS2TILE(528)]) {
                    if (typeof initSocket == "function" && multiplayerSettings[POS2TILE(750)] && socketData[POS2TILE(634)]) {
                        postSocketUpdate(POS2TILE(372), visibleTiles[POS2TILE(666)][POS2TILE(567)]);
                    } else {
                        getDrawPile(visibleTiles["currentTarget"][POS2TILE(567)]);
                    }
                } else {
                    if (!gameSettings[POS2TILE(636)]) {
                        selectPlayerTile(visibleTiles["currentTarget"][POS2TILE(567)]);
                    }
                }
            }
        });
        if (gameSettings[computePropValue(636)]) {
            $[computePropValue(579)][name]["addEventListener"](computePropValue(473), function (qualifier) {
                var throttledUpdate = computePropValue;
                toggleIconDragEvent(qualifier, throttledUpdate(495));
            });
            $[computePropValue(579)][name][computePropValue(664)](computePropValue(799), function (qualifier) {
                var throttledUpdate = computePropValue;
                toggleIconDragEvent(qualifier, throttledUpdate(676));
            });
            $[computePropValue(579)][name][computePropValue(664)](computePropValue(766), function (qualifier) {
                toggleIconDragEvent(qualifier, "drop");
            });
        }
        $["domino"][computePropValue(346) + name] = new createjs[computePropValue(431)](loader[computePropValue(803)](computePropValue(417) + gameData["themeIndex"]));
        centerReg($[computePropValue(579)][computePropValue(346) + name]);
        $[computePropValue(579)][name][computePropValue(346)] = $[computePropValue(579)][computePropValue(346) + name];
        boardTileContainer[computePropValue(501)]($["domino"][computePropValue(346) + name], $[computePropValue(579)][name]);
        gameData["tiles"]["push"]($[computePropValue(579)][name]);
    }
    shuffle(gameData[computePropValue(743)]);
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

    var decodeURIComponent = _0x219ef7;
    boardPlayersContainer[decodeURIComponent(488)]();
    var padLength = 0;
    var name = 0;
    for (; name < gameSettings[decodeURIComponent(366)][decodeURIComponent(373)]; name++) {
        if (gameData["players"] == gameSettings[decodeURIComponent(366)][name]["players"]) {
            padLength = gameSettings[decodeURIComponent(366)][name][decodeURIComponent(743)];
        }
    }
    name = 0;
    for (; name < gameData["players"]; name++) {
        $[decodeURIComponent(380)][name] = new createjs[decodeURIComponent(604)]();
        $[decodeURIComponent(380)][name][decodeURIComponent(743)] = [];
        $["players"][name][decodeURIComponent(583)] = 0;
        $[decodeURIComponent(380)][name][decodeURIComponent(359)] = name;
        var i = 0;
        for (; i < padLength; i++) {
            var r20 = gameData[decodeURIComponent(743)][gameData[decodeURIComponent(428)]][decodeURIComponent(567)];
            $[decodeURIComponent(380)][name][decodeURIComponent(743)][decodeURIComponent(574)](r20);
            gameData[decodeURIComponent(428)]++;
        }
        $[decodeURIComponent(380)][decodeURIComponent(811) + name] = new createjs[decodeURIComponent(604)]();
        var suiteView = new createjs["Bitmap"](loader[decodeURIComponent(803)](decodeURIComponent(722)));
        centerReg(suiteView);
        var acc = new createjs[decodeURIComponent(431)](loader[decodeURIComponent(803)]("itemPlayerStatsHighlight"));
        centerReg(acc);
        acc[decodeURIComponent(606)] = ![];
        var result = new createjs["Text"]();
        result[decodeURIComponent(404)] = decodeURIComponent(756);
        result["color"] = decodeURIComponent(349);
        result["textAlign"] = decodeURIComponent(429);
        result["textBaseline"] = decodeURIComponent(396);
        result[decodeURIComponent(393)] = (gameData.mode === "CPU" && name === 1) ? "LA BANCA" : gameData.names?.[name] || textDisplay[decodeURIComponent(708)].replace(decodeURIComponent(386), name + 1);
        result["y"] = 24;

        var params = new createjs["Text"]();
        params["font"] = decodeURIComponent(648);
        params[decodeURIComponent(615)] = decodeURIComponent(349);
        params["textAlign"] = decodeURIComponent(429);
        params[decodeURIComponent(731)] = decodeURIComponent(396);
        params["text"] = textDisplay[decodeURIComponent(637)][decodeURIComponent(553)](decodeURIComponent(386), playerData["scores"][name]);
        params["y"] = -7;
        $[decodeURIComponent(380)][decodeURIComponent(811) + name]["playerStats"] = suiteView;
        $[decodeURIComponent(380)][decodeURIComponent(811) + name]["newPlayerStatsHighlight"] = acc;
        $["players"][decodeURIComponent(811) + name]["playerName"] = result;
        $[decodeURIComponent(380)]["stats" + name]["playerScore"] = params;
        $["players"][decodeURIComponent(811) + name][decodeURIComponent(606)] = ![];
        $[decodeURIComponent(380)][decodeURIComponent(811) + name]["addChild"](suiteView, acc, result, params);
        boardPlayersContainer[decodeURIComponent(501)]($["players"][name], $["players"][decodeURIComponent(811) + name]);
    }
    name = gameData[decodeURIComponent(428)];
    for (; name < gameData[decodeURIComponent(743)][decodeURIComponent(373)]; name++) {
        r20 = gameData[decodeURIComponent(743)][name][decodeURIComponent(567)];
        gameData[decodeURIComponent(537)][decodeURIComponent(574)](r20);
    }
    gameData[decodeURIComponent(754)] = !![];
    resizeGameLayout();
    TweenMax["to"](boardContainer, 0.5, {
        overwrite: !![],
        onComplete: function () {
            var processKey = decodeURIComponent;
            gameData[processKey(641)]["status"] = !![];
            gameData[processKey(641)]["animation"] = !![];
            checkPlayerTilesAnimation();
        },
    });
}
function resizeGameLayout() {
    var findAncestorAttr = _0x219ef7;
    if (curPage == findAncestorAttr(678)) {
        if (viewport[findAncestorAttr(471)]) {
            itemPlayerNumbers["x"] = canvasW / 2;
            itemPlayerNumbers["y"] = (canvasH / 100) * 45;
            totalPlayersTxt["x"] = itemPlayerNumbers["x"];
            totalPlayersTxt["y"] = itemPlayerNumbers["y"] + 10;
            buttonPlayersL["x"] = canvasW / 2 - 200;
            buttonPlayersR["x"] = canvasW / 2 + 200;
            buttonPlayersL["y"] = buttonPlayersR["y"] = itemPlayerNumbers["y"];
            themeContainer["x"] = canvasW / 2;
            themeContainer["y"] = (canvasH / 100) * 56;
            buttonThemeL["x"] = canvasW / 2 - 200;
            buttonThemeR["x"] = canvasW / 2 + 200;
            buttonThemeL["y"] = buttonThemeR["y"] = themeContainer["y"];
            if (typeof initSocket == "function") {
                if (multiplayerSettings[findAncestorAttr(750)]) {
                    if (socketData[findAncestorAttr(634)]) {
                        if (itemPlayerNumbers[findAncestorAttr(606)] == ![]) {
                            themeContainer["x"] = canvasW / 2;
                            themeContainer["y"] = (canvasH / 100) * 50;
                            buttonThemeL["x"] = canvasW / 2 - 200;
                            buttonThemeR["x"] = canvasW / 2 + 200;
                            buttonThemeL["y"] = buttonThemeR["y"] = themeContainer["y"];
                        }
                    }
                }
            }
        } else {
            itemPlayerNumbers["x"] = canvasW / 2;
            itemPlayerNumbers["y"] = (canvasH / 100) * 46;
            totalPlayersTxt["x"] = itemPlayerNumbers["x"];
            totalPlayersTxt["y"] = itemPlayerNumbers["y"] + 10;
            buttonPlayersL["x"] = canvasW / 2 - 200;
            buttonPlayersR["x"] = canvasW / 2 + 200;
            buttonPlayersL["y"] = buttonPlayersR["y"] = itemPlayerNumbers["y"];
            themeContainer["x"] = canvasW / 2;
            themeContainer["y"] = (canvasH / 100) * 54;
            buttonThemeL["x"] = canvasW / 2 - 200;
            buttonThemeR["x"] = canvasW / 2 + 200;
            buttonThemeL["y"] = buttonThemeR["y"] = themeContainer["y"];
            if (typeof initSocket == "function") {
                if (multiplayerSettings[findAncestorAttr(750)]) {
                    if (socketData["online"]) {
                        if (itemPlayerNumbers[findAncestorAttr(606)] == ![]) {
                            themeContainer["x"] = canvasW / 2;
                            themeContainer["y"] = (canvasH / 100) * 50;
                            buttonThemeL["x"] = canvasW / 2 - 200;
                            buttonThemeR["x"] = canvasW / 2 + 200;
                            buttonThemeL["y"] = buttonThemeR["y"] = themeContainer["y"];
                        }
                    }
                }
            }
        }
    } else {
        if (curPage == findAncestorAttr(558)) {
            statusContainer["x"] = boardScoreContainer["x"] = canvasW / 2;
            statusContainer["y"] = boardScoreContainer["y"] = canvasH / 2;
            drawTitleTxt["y"] = -((canvasH / 100) * 18);
            drawTitleTxt[findAncestorAttr(404)] = "35px bpreplaybold";
            if (!viewport[findAncestorAttr(471)]) {
                drawTitleTxt[findAncestorAttr(404)] = findAncestorAttr(382);
                drawTitleTxt["y"] = -((canvasH / 100) * 19);
            }
            if (!gameData[findAncestorAttr(754)]) {
                return;
            }
            var data = [
                {
                    x: canvasW / 2,
                    y: (canvasH / 100) * 82,
                    horizontal: !![],
                    dir: findAncestorAttr(808),
                },
                {
                    x: canvasW / 2,
                    y: (canvasH / 100) * 18,
                    horizontal: !![],
                    dir: "top",
                },
                {
                    x: (canvasW / 100) * 14,
                    y: canvasH / 2,
                    horizontal: ![],
                    dir: findAncestorAttr(749),
                },
                {
                    x: (canvasW / 100) * 86,
                    y: canvasH / 2,
                    horizontal: ![],
                    dir: "right",
                },
            ];
            if (!viewport["isLandscape"]) {
                data = [
                    {
                        x: canvasW / 2,
                        y: (canvasH / 100) * 84,
                        horizontal: !![],
                        dir: findAncestorAttr(808),
                    },
                    {
                        x: canvasW / 2,
                        y: (canvasH / 100) * 16,
                        horizontal: !![],
                        dir: "top",
                    },
                    {
                        x: (canvasW / 100) * 17,
                        y: canvasH / 2,
                        horizontal: ![],
                        dir: "left",
                    },
                    {
                        x: (canvasW / 100) * 83,
                        y: canvasH / 2,
                        horizontal: ![],
                        dir: "right",
                    },
                ];
            }
            var no = [];
            if (gameData[findAncestorAttr(380)] == 2) {
                no = [0, 1];
            } else {
                no = [0, 2, 1, 3];
            }
            var j = 0;
            for (; j < gameData[findAncestorAttr(380)]; j++) {
                var k = gameData[findAncestorAttr(805)][j];
                $[findAncestorAttr(380)][k]["x"] = data[no[j]]["x"];
                $["players"][k]["y"] = data[no[j]]["y"];
                $[findAncestorAttr(380)][k][findAncestorAttr(482)] = data[no[j]]["dir"];
                $["players"][k][findAncestorAttr(655)] = data[no[j]]["horizontal"];
            }
            checkPlayerTilesAnimation();
        }
    }
}
function checkPlayerTilesAnimation() {
    var throttledUpdate = _0x219ef7;
    if (gameData[throttledUpdate(641)][throttledUpdate(572)]) {
        gameData[throttledUpdate(641)]["count"] = 0;
        gameData[throttledUpdate(641)][throttledUpdate(674)] = 0;
        gameData["deal"][throttledUpdate(755)] = 0;
    }
    var cacheKey = 0;
    for (; cacheKey < gameData[throttledUpdate(380)]; cacheKey++) {
        positionPlayerTiles(cacheKey, gameData[throttledUpdate(641)][throttledUpdate(539)]);
    }
    if (gameData[throttledUpdate(528)]) {
        toggleDrawPiles(!![]);
    }
}
function positionPlayerTiles(k, dataAndEvents) {
    var throttledUpdate = _0x219ef7;
    var _0x443cd9 = $[throttledUpdate(380)][k][throttledUpdate(655)];
    var urls = boardTileContainer[throttledUpdate(711)]($["players"][k]["x"], $[throttledUpdate(380)][k]["y"]);
    var o = {
        x: 0,
        y: 0,
        startX: 0,
        startY: 0,
        w: 0,
        h: 0,
        maxW: 500,
        maxH: 500,
        gap: 0,
        tileW: gameData[throttledUpdate(420)][throttledUpdate(344)],
        tileH: gameData[throttledUpdate(420)][throttledUpdate(516)],
        tileSpace: gameSettings[throttledUpdate(692)],
    };
    if (!viewport[throttledUpdate(471)]) {
        o[throttledUpdate(401)] = 300;
        o[throttledUpdate(446)] = 500;
    }
    if (_0x443cd9) {
        o["w"] = ($[throttledUpdate(380)][k]["tiles"][throttledUpdate(373)] - 1) * o[throttledUpdate(573)];
        o["w"] += ($[throttledUpdate(380)][k][throttledUpdate(743)]["length"] - 1) * o[throttledUpdate(692)];
        o[throttledUpdate(753)] = o[throttledUpdate(456)] / 2 + o["tileSpace"];
        if (o["w"] > o[throttledUpdate(401)]) {
            o["w"] = o[throttledUpdate(401)];
            o[throttledUpdate(753)] = o["maxW"] / ($[throttledUpdate(380)][k][throttledUpdate(743)][throttledUpdate(373)] - 1);
        }
        o["x"] = o[throttledUpdate(535)] = urls["x"] - o["w"] / 2;
        o["y"] = o[throttledUpdate(448)] = urls["y"];
    } else {
        o["h"] = ($[throttledUpdate(380)][k][throttledUpdate(743)][throttledUpdate(373)] - 1) * o[throttledUpdate(573)];
        o["h"] += ($["players"][k]["tiles"][throttledUpdate(373)] - 1) * o[throttledUpdate(692)];
        o["gap"] = o[throttledUpdate(456)] / 2 + o[throttledUpdate(692)];
        if (o["h"] > o[throttledUpdate(446)]) {
            o["h"] = o[throttledUpdate(446)];
            o[throttledUpdate(753)] = o[throttledUpdate(446)] / ($[throttledUpdate(380)][k]["tiles"][throttledUpdate(373)] - 1);
        }
        o["x"] = o[throttledUpdate(535)] = urls["x"];
        o["y"] = o[throttledUpdate(448)] = urls["y"] - o["h"] / 2;
    }
    var delay = 0;
    var unlock = 0;
    for (; unlock < $["players"][k][throttledUpdate(743)][throttledUpdate(373)]; unlock++) {
        var self = $[throttledUpdate(579)][$[throttledUpdate(380)][k][throttledUpdate(743)][unlock]];
        boardTileContainer[throttledUpdate(786)](self["shadow"], boardTileContainer[throttledUpdate(581)] - 1);
        boardTileContainer["setChildIndex"](self, boardTileContainer[throttledUpdate(581)] - 1);
        self[throttledUpdate(656)] = o["x"];
        self[throttledUpdate(569)] = o["y"];
        if (_0x443cd9) {
            var angle = 90;
            o["x"] += o[throttledUpdate(753)];
        } else {
            angle = 0;
            o["y"] += o[throttledUpdate(753)];
        }
        if (!self["dragging"] && dataAndEvents) {
            if (gameData[throttledUpdate(641)][throttledUpdate(572)]) {
                gameData[throttledUpdate(641)][throttledUpdate(674)]++;
                gameData["deal"]["delay"] += gameSettings[throttledUpdate(784)] / 2;
                delay = gameData[throttledUpdate(641)]["delay"];
            }
            self["visible"] = !![];
            var r20 = gameData[throttledUpdate(641)][throttledUpdate(572)] == !![] ? gameSettings[throttledUpdate(784)] : gameSettings[throttledUpdate(421)];
            TweenMax["to"](self, r20, {
                delay: delay,
                x: self[throttledUpdate(656)],
                y: self[throttledUpdate(569)],
                rotation: angle,
                scaleX: 1,
                scaleY: 1,
                overwrite: !![],
                onStart: function () {
                    var now = throttledUpdate;
                    var ttl = Math[now(765)](Math[now(707)]() * 3) + 1;
                    playSound(now(638) + ttl);
                },
                onComplete: dealAnimationComplete,
            });
        }
    }
    o["x"] -= o[throttledUpdate(753)] / 2;
    o["y"] -= o[throttledUpdate(753)] / 2;
    var x = 0;
    var y = 0;
    if ($[throttledUpdate(380)][k][throttledUpdate(743)][throttledUpdate(373)] > 0) {
        if (dataAndEvents) {
            x = o["x"] + $[throttledUpdate(380)]["stats" + k][throttledUpdate(646)]["image"][throttledUpdate(406)] / 2;
            y = o["y"] + $[throttledUpdate(380)][throttledUpdate(811) + k][throttledUpdate(646)][throttledUpdate(357)][throttledUpdate(712)] / 2;
        }
    }
    if ($[throttledUpdate(380)][k][throttledUpdate(482)] == throttledUpdate(808)) {
        $[throttledUpdate(380)][throttledUpdate(811) + k]["x"] = $[throttledUpdate(380)][k]["x"] + x;
        $[throttledUpdate(380)][throttledUpdate(811) + k]["y"] = $[throttledUpdate(380)][k]["y"];
    } else {
        if ($["players"][k][throttledUpdate(482)] == throttledUpdate(493)) {
            $[throttledUpdate(380)][throttledUpdate(811) + k]["x"] = $[throttledUpdate(380)][k]["x"] - x;
            $["players"][throttledUpdate(811) + k]["y"] = $[throttledUpdate(380)][k]["y"];
        } else {
            $["players"][throttledUpdate(811) + k]["x"] = $[throttledUpdate(380)][k]["x"];
            $["players"][throttledUpdate(811) + k]["y"] = $[throttledUpdate(380)][k]["y"] + y;
        }
    }
}
function dealAnimationComplete() {
    var throttledUpdate = _0x219ef7;
    if (gameData[throttledUpdate(641)][throttledUpdate(572)]) {
        gameData["deal"][throttledUpdate(379)]++;
        if (gameData[throttledUpdate(641)]["count"] == gameData[throttledUpdate(641)][throttledUpdate(674)]) {
            gameData[throttledUpdate(641)][throttledUpdate(572)] = ![];
            var widget = 0;
            for (; widget < gameData[throttledUpdate(380)]; widget++) {
                $[throttledUpdate(380)][throttledUpdate(811) + widget][throttledUpdate(606)] = !![];
                var _0x2f0cd4 = ![];
                if (typeof initSocket == throttledUpdate(427) && multiplayerSettings[throttledUpdate(750)] && socketData[throttledUpdate(634)]) {
                    if (widget == socketData["gameIndex"]) {
                        _0x2f0cd4 = !![];
                    }
                } else {
                    if (widget == 0) {
                        _0x2f0cd4 = !![];
                    }
                }
                if (_0x2f0cd4) {
                    var i = 0;
                    for (; i < $[throttledUpdate(380)][widget][throttledUpdate(743)]["length"]; i++) {
                        $[throttledUpdate(579)][$["players"][widget][throttledUpdate(743)][i]][throttledUpdate(717)][throttledUpdate(606)] = !![];
                    }
                }
            }
            playSound(throttledUpdate(821));
            widget = 0;
            for (; widget < gameData[throttledUpdate(537)][throttledUpdate(373)]; widget++) {
                hideTile($[throttledUpdate(579)][gameData[throttledUpdate(537)][widget]]);
            }
            displayPlayerTurn();
        }
    }
}
function hideTile(deepDataAndEvents) {
    var name = _0x219ef7;
    TweenMax["to"](deepDataAndEvents, gameSettings[name(784)], {
        x: 0,
        y: 0,
        rotation: 0,
        overwrite: !![],
        onComplete: function () {
            var info = name;
            deepDataAndEvents[info(606)] = ![];
        },
    });
}
function checkpositionPlacedTiles() {
    var key = _0x219ef7;
    gameData[key(475)] = {
        width: 700,
        height: 300,
        scale: 1,
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
        tileW: 0,
        tileH: 0,
    };
    if (!viewport[key(471)]) {
        gameData[key(475)][key(344)] = 250;
        gameData[key(475)]["height"] = 400;
    }
    var argsLength = 5;
    var argsIndex = 0;
    for (; argsIndex < argsLength; argsIndex++) {
        positionPlacedTiles(![]);
        gameData[key(475)]["tileW"] = gameData[key(475)][key(342)] - gameData["mask"][key(535)];
        gameData[key(475)]["tileH"] = gameData[key(475)][key(465)] - gameData[key(475)]["startY"];
        var a = 1;
        var b = 1;
        var result = 1;
        if (gameData[key(475)][key(456)] >= gameData[key(475)][key(344)]) {
            a = gameData["mask"]["width"] / gameData[key(475)][key(456)];
        }
        if (gameData[key(475)][key(573)] >= gameData[key(475)][key(516)]) {
            b = gameData[key(475)][key(516)] / gameData[key(475)][key(573)];
        }
        result = a < b ? a : b;
        result = result[key(804)](1);
        if (gameData[key(475)][key(533)] == result) {
            positionPlacedTiles(!![]);
            argsIndex = argsLength;
        } else {
            gameData["mask"]["scale"] = result;
        }
    }
}
function positionPlacedTiles(recurring) {
    var camelCase = _0x219ef7;
    var dataAndEvents = null;
    var deepDataAndEvents = null;
    var f = null;
    var x = null;
    var props = ["left", camelCase(493), camelCase(334), camelCase(493)];
    var p = 0;
    var prop = camelCase(749);
    var data = [camelCase(334), "bottom", camelCase(749), "bottom"];
    var k = 0;
    var d = "right";
    var stack = [gameData[camelCase(420)][camelCase(516)] * 5, gameData[camelCase(420)]["height"] / 4, gameData[camelCase(420)][camelCase(516)] * 10];
    var offset = 0;
    var url = 0;
    var fn = [gameData[camelCase(420)][camelCase(516)] * 5, gameData["tile"][camelCase(516)] / 4, gameData[camelCase(420)][camelCase(516)] * 10];
    var context = 0;
    var str = 0;
    if (!viewport[camelCase(471)]) {
        stack = [gameData[camelCase(420)][camelCase(516)], gameData[camelCase(420)][camelCase(516)], gameData["tile"][camelCase(516)] * 3];
        fn = [gameData[camelCase(420)][camelCase(516)], gameData[camelCase(420)]["height"], gameData["tile"][camelCase(516)] * 3];
    }
    var scale = gameData[camelCase(475)][camelCase(533)];
    var i = 0;
    for (; i < gameData[camelCase(723)]["length"]; i++) {
        var self = $[camelCase(579)][gameData[camelCase(723)][i][camelCase(567)]];
        self[camelCase(810)] = gameData[camelCase(723)][i][camelCase(580)];
        self["visible"] = !![];
        if (i == 0) {
            if (!recurring) {
                self["moveX"] = 0;
                self[camelCase(823)] = 0;
            } else {
                var urls = getCenterPosition(gameData[camelCase(475)]["startX"], gameData[camelCase(475)][camelCase(448)], gameData[camelCase(475)][camelCase(342)], gameData[camelCase(475)][camelCase(465)]);
                self[camelCase(354)] = -(urls["x"] * gameData[camelCase(475)][camelCase(533)]);
                self[camelCase(823)] = -(urls["y"] * gameData[camelCase(475)]["scale"]);
            }
            dataAndEvents = self;
            self[camelCase(730)] = "";
        } else {
            if (gameData[camelCase(723)][i][camelCase(482)] == camelCase(749)) {
                x = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
                var w = x[camelCase(337)] == !![] ? gameData[camelCase(420)]["height"] / 2 + gameSettings[camelCase(661)] : gameData[camelCase(420)][camelCase(344)] / 2 + gameSettings["tilePlacedSpace"];
                var h = 0;
                var id = self[camelCase(337)] == !![] ? gameData[camelCase(420)][camelCase(516)] / 2 + gameSettings[camelCase(661)] : gameData[camelCase(420)]["width"] / 2 + gameSettings["tilePlacedSpace"];
                var t = 0;
                if (props[p] == camelCase(749)) {
                    if (prop == "top") {
                        w = x[camelCase(337)] == !![] ? gameData["tile"][camelCase(344)] / 2 + gameSettings[camelCase(661)] : gameData[camelCase(420)][camelCase(516)] / 2 + gameSettings[camelCase(661)];
                        h = x["sameNumbers"] == !![] ? 0 : gameData[camelCase(420)][camelCase(516)] / 2 + gameSettings[camelCase(661)];
                        if (x[camelCase(337)]) {
                            w -= gameData[camelCase(420)][camelCase(344)] / 2 + gameSettings[camelCase(661)];
                            h = gameData[camelCase(420)]["height"] + gameSettings[camelCase(661)];
                        }
                    }
                    self["moveX"] = x[camelCase(354)] - (w + id) * scale;
                    self[camelCase(823)] = x[camelCase(823)] - h * scale;
                    url += w + id;
                } else {
                    if (props[p] == camelCase(493)) {
                        if (prop == "left") {
                            w = x[camelCase(337)] == !![] ? 0 : -(gameData[camelCase(420)][camelCase(516)] / 2);
                            h = x[camelCase(337)] == !![] ? gameData[camelCase(420)][camelCase(344)] / 2 + gameSettings[camelCase(661)] : gameData[camelCase(420)]["height"] / 2 + gameSettings[camelCase(661)];
                        } else {
                            if (prop == camelCase(334)) {
                                w = x[camelCase(337)] == !![] ? 0 : gameData["tile"][camelCase(516)] / 2;
                                h = x[camelCase(337)] == !![] ? gameData[camelCase(420)][camelCase(344)] / 2 + gameSettings[camelCase(661)] : gameData["tile"][camelCase(516)] / 2 + gameSettings["tilePlacedSpace"];
                            } else {
                                w = 0;
                                h = x[camelCase(337)] == !![] ? gameData["tile"][camelCase(516)] / 2 + gameSettings["tilePlacedSpace"] : gameData[camelCase(420)][camelCase(344)] / 2 + gameSettings["tilePlacedSpace"];
                            }
                        }
                        t = self[camelCase(337)] == !![] ? gameData[camelCase(420)][camelCase(516)] / 2 + gameSettings[camelCase(661)] : gameData[camelCase(420)][camelCase(344)] / 2 + gameSettings["tilePlacedSpace"];
                        self["moveX"] = x[camelCase(354)] + w * scale;
                        self[camelCase(823)] = x[camelCase(823)] - (h + t) * scale;
                        self[camelCase(810)] += 90;
                        url += w + id;
                    } else {
                        if (props[p] == camelCase(334)) {
                            if (prop == camelCase(493)) {
                                w = x["sameNumbers"] == !![] ? gameData[camelCase(420)][camelCase(344)] / 2 + gameSettings[camelCase(661)] : gameData[camelCase(420)][camelCase(516)] / 2 + gameSettings[camelCase(661)];
                                h = x[camelCase(337)] == !![] ? 0 : gameData["tile"]["height"] / 2;
                            }
                            self[camelCase(354)] = x[camelCase(354)] + (w + id) * scale;
                            self[camelCase(823)] = x[camelCase(823)] - h * scale;
                            self[camelCase(810)] += 180;
                            url += w + id;
                        }
                    }
                }
                prop = props[p];
                if (url >= stack[offset]) {
                    url = 0;
                    offset++;
                    offset = offset > stack[camelCase(373)] - 1 ? 1 : offset;
                    p++;
                    p = p > props[camelCase(373)] - 1 ? 0 : p;
                }
                deepDataAndEvents = self;
                self[camelCase(730)] = props[p];
            } else {
                if (gameData["placed"][i][camelCase(482)] == camelCase(334)) {
                    x = f == null ? dataAndEvents : f;
                    w = x["sameNumbers"] == !![] ? gameData[camelCase(420)][camelCase(516)] / 2 + gameSettings["tilePlacedSpace"] : gameData[camelCase(420)][camelCase(344)] / 2 + gameSettings["tilePlacedSpace"];
                    h = 0;
                    id = self[camelCase(337)] == !![] ? gameData[camelCase(420)][camelCase(516)] / 2 + gameSettings[camelCase(661)] : gameData["tile"]["width"] / 2 + gameSettings[camelCase(661)];
                    t = 0;
                    if (data[k] == camelCase(334)) {
                        if (d == "bottom") {
                            w = x["sameNumbers"] == !![] ? gameData["tile"][camelCase(344)] / 2 + gameSettings[camelCase(661)] : gameData[camelCase(420)][camelCase(516)] / 2 + gameSettings[camelCase(661)];
                            h = x[camelCase(337)] == !![] ? 0 : gameData[camelCase(420)]["height"] / 2 + gameSettings[camelCase(661)];
                            if (x[camelCase(337)]) {
                                w -= gameData[camelCase(420)][camelCase(344)] / 2 + gameSettings[camelCase(661)];
                                h = gameData["tile"]["height"] + gameSettings["tilePlacedSpace"];
                            }
                        }
                        self["moveX"] = x[camelCase(354)] + (w + id) * scale;
                        self[camelCase(823)] = x[camelCase(823)] + h * scale;
                        str += w + id;
                    } else {
                        if (data[k] == camelCase(808)) {
                            if (d == "right") {
                                w = x[camelCase(337)] == !![] ? 0 : -(gameData[camelCase(420)][camelCase(516)] / 2);
                                h = x[camelCase(337)] == !![] ? gameData[camelCase(420)]["width"] / 2 + gameSettings[camelCase(661)] : gameData[camelCase(420)][camelCase(516)] / 2 + gameSettings[camelCase(661)];
                            } else {
                                if (d == camelCase(749)) {
                                    w = x["sameNumbers"] == !![] ? 0 : gameData[camelCase(420)][camelCase(516)] / 2;
                                    h = x[camelCase(337)] == !![] ? gameData["tile"][camelCase(344)] / 2 + gameSettings["tilePlacedSpace"] : gameData["tile"][camelCase(516)] / 2 + gameSettings[camelCase(661)];
                                } else {
                                    w = 0;
                                    h = x[camelCase(337)] == !![] ? gameData[camelCase(420)][camelCase(516)] / 2 + gameSettings["tilePlacedSpace"] : gameData[camelCase(420)][camelCase(344)] / 2 + gameSettings[camelCase(661)];
                                }
                            }
                            t = self[camelCase(337)] == !![] ? gameData[camelCase(420)][camelCase(516)] / 2 + gameSettings[camelCase(661)] : gameData["tile"][camelCase(344)] / 2 + gameSettings[camelCase(661)];
                            self[camelCase(354)] = x[camelCase(354)] - w * scale;
                            self[camelCase(823)] = x[camelCase(823)] + (h + t) * scale;
                            self["rotationNum"] += 90;
                            str += w + id;
                        } else {
                            if (data[k] == camelCase(749)) {
                                if (d == camelCase(808)) {
                                    w = x[camelCase(337)] == !![] ? gameData["tile"][camelCase(344)] / 2 + gameSettings[camelCase(661)] : gameData[camelCase(420)][camelCase(516)] / 2 + gameSettings[camelCase(661)];
                                    h = x[camelCase(337)] == !![] ? 0 : gameData[camelCase(420)][camelCase(516)] / 2;
                                }
                                self["moveX"] = x[camelCase(354)] - (w + id) * scale;
                                self["moveY"] = x[camelCase(823)] + h * scale;
                                self[camelCase(810)] += 180;
                                str += w + id;
                            }
                        }
                    }
                    d = data[k];
                    if (str >= fn[context]) {
                        str = 0;
                        context++;
                        context = context > fn[camelCase(373)] - 1 ? 1 : context;
                        k++;
                        k = k > data[camelCase(373)] - 1 ? 0 : k;
                    }
                    f = self;
                    self[camelCase(730)] = data[k];
                }
            }
        }
        var value = self[camelCase(354)];
        var events = self["moveX"];
        var n = self[camelCase(823)];
        var v = self[camelCase(823)];
        gameData["mask"]["startX"] = value < gameData[camelCase(475)]["startX"] ? value : gameData[camelCase(475)][camelCase(535)];
        gameData["mask"]["endX"] = events > gameData[camelCase(475)][camelCase(342)] ? events : gameData[camelCase(475)][camelCase(342)];
        gameData[camelCase(475)][camelCase(448)] = n < gameData[camelCase(475)][camelCase(448)] ? n : gameData["mask"]["startY"];
        gameData["mask"]["endY"] = v > gameData["mask"][camelCase(465)] ? v : gameData[camelCase(475)][camelCase(465)];
        if (recurring) {
            TweenMax["to"](self, gameSettings[camelCase(421)], {
                x: self[camelCase(354)],
                y: self[camelCase(823)],
                rotation: self[camelCase(810)],
                scaleX: scale,
                scaleY: scale,
                overwrite: !![],
            });
        }
    }
}
function connectTiles(value, path, type) {
    var _createItem = _0x219ef7;
    var j = -1;
    var r20 = -1;
    var msg = type == _createItem(749) ? _createItem(334) : _createItem(749);
    if (type == _createItem(422)) {
        msg = type;
    }
    if (msg == _createItem(334)) {
        if (path["rotationNum"] == 0) {
            j = 0;
        } else {
            j = 1;
        }
    } else {
        if (msg == _createItem(749)) {
            if (path[_createItem(810)] == 0) {
                j = 1;
            } else {
                j = 0;
            }
        }
    }
    if (type == _createItem(422)) {
        if (value["sameNumbers"]) {
            value[_createItem(810)] = 90;
        } else {
            value["rotationNum"] = 0;
        }
    } else {
        if (type == "left") {
            if (path[_createItem(627)]["length"] == 1) {
                if (value["numbers"][1] == path["numbers"][0]) {
                    r20 = 1;
                    value["rotationNum"] = 0;
                } else {
                    if (value["numbers"][0] == path["numbers"][0]) {
                        r20 = 0;
                        value[_createItem(810)] = 180;
                    }
                }
            } else {
                if (value["numbers"][1] == path[_createItem(627)][j]) {
                    r20 = 1;
                    value[_createItem(810)] = 0;
                } else {
                    if (value["numbers"][0] == path[_createItem(627)][j]) {
                        r20 = 0;
                        value[_createItem(810)] = 180;
                    }
                }
            }
            if (value["sameNumbers"]) {
                value[_createItem(810)] = 90;
            }
            value[_createItem(627)]["splice"](r20, 1);
            path[_createItem(627)][_createItem(809)](j, 1);
        } else {
            if (type == "right") {
                if (path["numbers"][_createItem(373)] == 1) {
                    if (value[_createItem(627)][1] == path[_createItem(627)][0]) {
                        r20 = 1;
                        value["rotationNum"] = 180;
                    } else {
                        if (value[_createItem(627)][0] == path[_createItem(627)][0]) {
                            r20 = 0;
                            value[_createItem(810)] = 0;
                        }
                    }
                } else {
                    if (value["numbers"][1] == path[_createItem(627)][j]) {
                        r20 = 1;
                        value[_createItem(810)] = 180;
                    } else {
                        if (value["numbers"][0] == path[_createItem(627)][j]) {
                            r20 = 0;
                            value[_createItem(810)] = 0;
                        }
                    }
                }
                if (value[_createItem(337)]) {
                    value["rotationNum"] = 90;
                }
                value[_createItem(627)]["splice"](r20, 1);
                path[_createItem(627)][_createItem(809)](j, 1);
            }
        }
    }
}
function toggleDrawPiles(recurring) {
    var exposedName = _0x219ef7;
    if (recurring) {
        gameData["drawing"] = !![];
        boardTileContainer[exposedName(501)](boardDrawContainer);
        itemDrawBg[exposedName(606)] = !![];
        itemDrawBgP[exposedName(606)] = ![];
        var obj = {
            startX: 0,
            startY: 0,
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            maxColumn: 7,
            spaceX: 0,
            spaceY: 0,
        };
        var classes = gameData[exposedName(537)]["length"] / obj[exposedName(643)];
        classes = Number["isInteger"](classes) ? classes : Math[exposedName(765)](classes + 1);
        if (!viewport[exposedName(471)]) {
            obj[exposedName(643)] = 5;
            itemDrawBg["visible"] = ![];
            itemDrawBgP[exposedName(606)] = !![];
        }
        obj[exposedName(451)] = gameData["tile"][exposedName(516)] + gameSettings[exposedName(692)];
        obj[exposedName(597)] = gameData[exposedName(420)][exposedName(344)] + gameSettings[exposedName(692)];
        obj["width"] = (obj[exposedName(643)] - 1) * gameData[exposedName(420)][exposedName(516)];
        obj[exposedName(344)] += (obj[exposedName(643)] - 1) * gameSettings[exposedName(692)];
        obj[exposedName(516)] = (classes - 1) * gameData[exposedName(420)][exposedName(344)];
        obj[exposedName(516)] += (classes - 1) * gameSettings[exposedName(692)];
        obj[exposedName(535)] = -(obj[exposedName(344)] / 2);
        obj[exposedName(448)] = -(obj[exposedName(516)] / 2);
        obj["x"] = obj[exposedName(535)];
        obj["y"] = obj[exposedName(448)];
        var _0x1b615d = 0;
        var unlock = 0;
        for (; unlock < gameData[exposedName(537)][exposedName(373)]; unlock++) {
            var target = $["domino"][gameData[exposedName(537)][unlock]];
            boardTileContainer[exposedName(786)](target[exposedName(346)], boardTileContainer[exposedName(581)] - 1);
            boardTileContainer[exposedName(786)](target, boardTileContainer[exposedName(581)] - 1);
            killAnimateBlink(target[exposedName(464)]);
            if (typeof initSocket == exposedName(427) && multiplayerSettings[exposedName(750)] && socketData[exposedName(634)]) {
                if (gameData[exposedName(741)] == socketData[exposedName(363)]) {
                    animateBlink(target[exposedName(464)]);
                }
            } else {
                if (gameData["player"] == 0) {
                    animateBlink(target[exposedName(464)]);
                }
            }
            target[exposedName(580)] = 90;
            target["visible"] = !![];
            target["x"] = obj["x"];
            target["y"] = obj["y"];
            obj["x"] += obj[exposedName(451)];
            _0x1b615d++;
            if (_0x1b615d >= obj[exposedName(643)]) {
                _0x1b615d = 0;
                obj["x"] = obj[exposedName(535)];
                obj["y"] += obj["spaceY"];
            }
        }
    } else {
        gameData[exposedName(528)] = ![];
        boardTileContainer[exposedName(679)](boardDrawContainer);
        unlock = 0;
        for (; unlock < gameData[exposedName(537)][exposedName(373)]; unlock++) {
            target = $[exposedName(579)][gameData[exposedName(537)][unlock]];
            target["visible"] = ![];
        }
    }
}
function getDrawPile(key) {
    var computePropValue = _0x219ef7;
    var answers = $["domino"][key];
    killAnimateBlink(answers["highlight"]);
    if (typeof initSocket == computePropValue(427) && multiplayerSettings[computePropValue(750)] && socketData[computePropValue(634)]) {
        if ($[computePropValue(380)][gameData[computePropValue(741)]]["playerIndex"] == socketData[computePropValue(363)]) {
            answers[computePropValue(717)]["visible"] = !![];
        }
    } else {
        if ($[computePropValue(380)][gameData[computePropValue(741)]][computePropValue(359)] == 0) {
            answers[computePropValue(717)][computePropValue(606)] = !![];
        }
    }
    var camelKey = gameData[computePropValue(537)]["indexOf"](key);
    gameData[computePropValue(537)][computePropValue(809)](camelKey, 1);
    $[computePropValue(380)][gameData[computePropValue(741)]][computePropValue(743)][computePropValue(574)](key);
    positionPlayerTiles(gameData[computePropValue(741)], !![]);
    var result = checkPossibleMove(gameData[computePropValue(741)]);
    if (result["length"] != 0) {
        toggleDrawPiles(![]);
        displayPlayerTurn();
    } else {
        if (gameData[computePropValue(537)]["length"] == 0) {
            toggleDrawPiles(![]);
            showGameStatus("cantmove");
        } else {
            tryFirstMove();
        }
    }
}
function toggleIconDragEvent(event, action) {
    var getRandomInt = _0x219ef7;
    if (gameData[getRandomInt(528)]) {
        return;
    }
    if (!event[getRandomInt(666)][getRandomInt(464)]["visible"]) {
        return;
    }
    switch (action) {
        case getRandomInt(495):
            var urls = boardTileContainer[getRandomInt(340)](event["currentTarget"]["x"], event[getRandomInt(666)]["y"]);
            event["currentTarget"][getRandomInt(356)] = {
                x: urls["x"] - event[getRandomInt(389)],
                y: urls["y"] - event[getRandomInt(751)],
            };
            event[getRandomInt(666)]["dragging"] = !![];
            boardTileContainer[getRandomInt(786)](event[getRandomInt(666)][getRandomInt(346)], boardTileContainer[getRandomInt(581)] - 1);
            boardTileContainer[getRandomInt(786)](event["currentTarget"], boardTileContainer[getRandomInt(581)] - 1);
            highlightPlacelable(event[getRandomInt(666)][getRandomInt(627)]);
            break;
        case "move":
            if (event[getRandomInt(666)][getRandomInt(683)]) {
                var swXY = boardTileContainer[getRandomInt(711)](event[getRandomInt(389)], event["stageY"]);
                var hash = swXY["x"] + event[getRandomInt(666)][getRandomInt(356)]["x"];
                var h = swXY["y"] + event[getRandomInt(666)]["offset"]["y"];
                event[getRandomInt(666)]["x"] = hash;
                event[getRandomInt(666)]["y"] = h;
            }
            break;
        case getRandomInt(348):
            if (event[getRandomInt(666)][getRandomInt(683)]) {
                event[getRandomInt(666)][getRandomInt(683)] = ![];
                var _0x3ea058 = ![];
                var a = {
                    tileIndex: -1,
                    dir: "",
                };
                if (gameData[getRandomInt(723)][getRandomInt(373)] == 0 || gameData[getRandomInt(464)][getRandomInt(373)] == 1) {
                    if ($[getRandomInt(380)][gameData[getRandomInt(741)]][getRandomInt(482)] == "bottom") {
                        if (event[getRandomInt(666)]["y"] < event[getRandomInt(666)][getRandomInt(569)]) {
                            _0x3ea058 = !![];
                        }
                    } else {
                        if ($[getRandomInt(380)][gameData[getRandomInt(741)]][getRandomInt(482)] == "top") {
                            if (event["currentTarget"]["y"] > event["currentTarget"][getRandomInt(569)]) {
                                _0x3ea058 = !![];
                            }
                        } else {
                            if ($[getRandomInt(380)][gameData[getRandomInt(741)]]["dir"] == getRandomInt(749)) {
                                if (event["currentTarget"]["x"] > event[getRandomInt(666)][getRandomInt(656)]) {
                                    _0x3ea058 = !![];
                                }
                            } else {
                                if ($["players"][gameData[getRandomInt(741)]][getRandomInt(482)] == getRandomInt(334)) {
                                    if (event[getRandomInt(666)]["x"] < event[getRandomInt(666)]["oriX"]) {
                                        _0x3ea058 = !![];
                                    }
                                }
                            }
                        }
                    }
                    if (gameData[getRandomInt(464)][getRandomInt(373)] > 0) {
                        if (_0x3ea058) {
                            a = gameData["highlight"][0];
                        }
                    }
                } else {
                    var prop = 0;
                    for (; prop < gameData[getRandomInt(464)][getRandomInt(373)]; prop++) {
                        a = gameData[getRandomInt(464)][prop];
                        var end_distance = getDistance(event[getRandomInt(666)]["x"], event[getRandomInt(666)]["y"], a["x"], a["y"]);
                        if (end_distance <= gameData[getRandomInt(420)]["width"]) {
                            a = gameData[getRandomInt(464)][prop];
                            _0x3ea058 = !![];
                            prop = gameData[getRandomInt(464)][getRandomInt(373)];
                        }
                    }
                }
                if (_0x3ea058) {
                    playerMove(event[getRandomInt(666)]["tileIndex"], a[getRandomInt(567)], a[getRandomInt(482)]);
                } else {
                    positionPlayerTiles(gameData[getRandomInt(741)], !![]);
                }
                highlightPlacelable();
            }
            break;
    }
}
function selectPlayerTile(name) {
    var throttledUpdate = _0x219ef7;
    if (gameData[throttledUpdate(528)]) {
        return;
    }
    if (!$[throttledUpdate(579)][name][throttledUpdate(464)][throttledUpdate(606)]) {
        return;
    }
    var args = $[throttledUpdate(579)][name];
    var pageY = args[throttledUpdate(569)];
    if (gameData["placed"][throttledUpdate(373)] == 0) {
        playerMove($[throttledUpdate(579)][name][throttledUpdate(567)]);
    } else {
        playSound("soundDominoPick");
        if (gameData["tileSelected"] == name) {
            gameData[throttledUpdate(747)] = -1;
            highlightPlacelable();
        } else {
            if (gameData[throttledUpdate(747)] != name && gameData[throttledUpdate(747)] != -1) {
                var datapoint = $[throttledUpdate(579)][gameData[throttledUpdate(747)]];
                TweenMax["to"](datapoint, gameSettings["tileMoveSpeed"] / 2, {
                    y: datapoint["oriY"],
                    overwrite: !![],
                });
                highlightPlacelable();
            }
            gameData[throttledUpdate(747)] = name;
            boardTileContainer["setChildIndex"](args["shadow"], boardTileContainer["numChildren"] - 1);
            boardTileContainer["setChildIndex"](args, boardTileContainer[throttledUpdate(581)] - 1);
            highlightPlacelable(args[throttledUpdate(627)]);
            pageY -= gameData[throttledUpdate(420)]["height"];
        }
        TweenMax["to"](args, gameSettings[throttledUpdate(421)] / 2, {
            y: pageY,
            overwrite: !![],
        });
    }
}
function playerMove(protoProps, position, dir) {
    var throttledUpdate = _0x219ef7;
    if (typeof initSocket == throttledUpdate(427) && multiplayerSettings[throttledUpdate(750)] && socketData[throttledUpdate(634)]) {
        if (gameData[throttledUpdate(741)] == socketData[throttledUpdate(363)]) {
            postSocketUpdate(throttledUpdate(603), {
                tileIndex: protoProps,
                highlightTileIndex: position,
                dir: dir,
            });
        }
    } else {
        placeTitle(protoProps, position, dir);
    }
}
function placeTitle(attr, position, dir) {
    var repeat_string = _0x219ef7;
    var line = Math[repeat_string(765)](Math["random"]() * 3) + 1;
    playSound(repeat_string(638) + line);
    highlightTitles([]);
    var udataCur = $[repeat_string(579)][attr];
    boardTileContainer["setChildIndex"](udataCur["shadow"], boardTileContainer[repeat_string(581)] - 1);
    boardTileContainer[repeat_string(786)](udataCur, boardTileContainer[repeat_string(581)] - 1);
    udataCur[repeat_string(717)][repeat_string(606)] = !![];
    if (gameData["placed"][repeat_string(373)] == 0) {
        connectTiles(udataCur, "", repeat_string(422));
        gameData["placed"][repeat_string(574)]({
            tileIndex: attr,
            dir: "",
            rotation: udataCur[repeat_string(810)],
        });
    } else {
        connectTiles(udataCur, $[repeat_string(579)][position], dir);
        gameData[repeat_string(723)][repeat_string(574)]({
            tileIndex: attr,
            dir: dir,
            rotation: udataCur[repeat_string(810)],
        });
    }
    gameData[repeat_string(740)] = null;
    gameData[repeat_string(585)] = null;
    var type = 0;
    for (; type < 2; type++) {
        var unlock = gameData[repeat_string(723)]["length"] - 1;
        for (; unlock > 0; unlock--) {
            if (type == 0 && gameData[repeat_string(723)][unlock][repeat_string(482)] == repeat_string(749)) {
                gameData["leftTile"] = $["domino"][gameData[repeat_string(723)][unlock][repeat_string(567)]];
                unlock = -1;
            } else {
                if (type == 1) {
                    if (gameData[repeat_string(723)][unlock][repeat_string(482)] == "right") {
                        gameData[repeat_string(585)] = $["domino"][gameData[repeat_string(723)][unlock][repeat_string(567)]];
                        unlock = -1;
                    }
                }
            }
        }
        if (type == 0 && gameData[repeat_string(740)] == null) {
            gameData[repeat_string(740)] = $[repeat_string(579)][gameData[repeat_string(723)][0][repeat_string(567)]];
        } else {
            if (type == 1) {
                if (gameData["rightTile"] == null) {
                    gameData[repeat_string(585)] = $[repeat_string(579)][gameData[repeat_string(723)][0][repeat_string(567)]];
                }
            }
        }
    }
    type = 0;
    for (; type < $[repeat_string(380)][gameData[repeat_string(741)]]["tiles"][repeat_string(373)]; type++) {
        if ($[repeat_string(380)][gameData[repeat_string(741)]]["tiles"][type] == attr) {
            $["players"][gameData["player"]]["tiles"]["splice"](type, 1);
        }
    }
    gameData[repeat_string(827)] = 0;
    checkpositionPlacedTiles();
    positionPlayerTiles(gameData[repeat_string(741)], !![]);
    checkRoundEnd();
}
function checkRoundEnd() {
    var throttledUpdate = _0x219ef7;
    if ($["players"][gameData["player"]][throttledUpdate(743)][throttledUpdate(373)] == 0) {
        highlightPlayer(![]);
        showGameStatus(throttledUpdate(579));
    } else {
        nextPlayerTurn();
    }
}
function displayPlayerTurn() {
    var throttledUpdate = _0x219ef7;
    var recurring = checkPossibleMove(gameData[throttledUpdate(741)]);
    highlightTitles(recurring);
    highlightPlayer(!![]);
    gameData[throttledUpdate(747)] = -1;
    if (recurring[throttledUpdate(373)] > 0) {
        if (gameData["placed"][throttledUpdate(373)] == 0) {
            showGameStatus(throttledUpdate(514));
        }
        tryFirstMove(recurring);
    } else {
        if (gameData["domino"][throttledUpdate(537)]) {
            if (gameData[throttledUpdate(537)]["length"] > 0) {
                showGameStatus("nomove");
            } else {
                showGameStatus(throttledUpdate(726));
            }
        } else {
            showGameStatus(throttledUpdate(385));
        }
    }
}
function checkPossibleMove(plugin) {
    var computePropValue = _0x219ef7;
    var missing = [];
    if (gameData[computePropValue(723)][computePropValue(373)] == 0) {
        var r20 = [];
        var rreturn = [];
        var origName = 0;
        for (; origName < gameData[computePropValue(380)]; origName++) {
            var unlock = 0;
            for (; unlock < $[computePropValue(380)][origName]["tiles"][computePropValue(373)]; unlock++) {
                var dep = $[computePropValue(579)][$[computePropValue(380)][origName]["tiles"][unlock]];
                if (dep[computePropValue(337)]) {
                    var total = dep[computePropValue(627)][0];
                    r20[computePropValue(574)]({
                        total: total,
                        player: origName,
                        tile: dep,
                    });
                } else {
                    total = dep[computePropValue(627)][0] + dep[computePropValue(627)][1];
                    rreturn[computePropValue(574)]({
                        total: total,
                        player: origName,
                        tile: dep,
                    });
                }
            }
        }
        sortOnObject(r20, computePropValue(674), !![]);
        sortOnObject(rreturn, computePropValue(674), !![]);
        if (r20[computePropValue(373)] > 0) {
            gameData["player"] = r20[0][computePropValue(741)];
            missing[computePropValue(574)](r20[0]["tile"]);
        } else {
            gameData["player"] = rreturn[0]["player"];
            origName = 0;
            for (; origName < $[computePropValue(380)][gameData[computePropValue(741)]][computePropValue(743)][computePropValue(373)]; origName++) {
                missing[computePropValue(574)]($[computePropValue(579)][$[computePropValue(380)][gameData[computePropValue(741)]]["tiles"][origName]]);
            }
        }
    } else {
        if (gameData[computePropValue(723)][computePropValue(373)] == 1) {
            var parent = $[computePropValue(579)][gameData[computePropValue(723)][0]["tileIndex"]];
            origName = 0;
            for (; origName < $[computePropValue(380)][plugin][computePropValue(743)][computePropValue(373)]; origName++) {
                dep = $[computePropValue(579)][$[computePropValue(380)][plugin][computePropValue(743)][origName]];
                var i = 0;
                for (; i < parent[computePropValue(627)][computePropValue(373)]; i++) {
                    if (dep[computePropValue(627)][computePropValue(347)](parent[computePropValue(627)][i]) != -1) {
                        missing["push"](dep);
                    }
                }
            }
        } else {
            var pp = gameData[computePropValue(740)];
            var answers = gameData[computePropValue(585)];
            origName = 0;
            for (; origName < $[computePropValue(380)][plugin]["tiles"][computePropValue(373)]; origName++) {
                dep = $[computePropValue(579)][$[computePropValue(380)][plugin]["tiles"][origName]];
                i = 0;
                for (; i < pp[computePropValue(627)]["length"]; i++) {
                    if (dep[computePropValue(627)][computePropValue(347)](pp[computePropValue(627)][i]) != -1) {
                        missing[computePropValue(574)](dep);
                    }
                }
                i = 0;
                for (; i < answers[computePropValue(627)][computePropValue(373)]; i++) {
                    if (dep[computePropValue(627)]["indexOf"](answers[computePropValue(627)][i]) != -1) {
                        missing[computePropValue(574)](dep);
                    }
                }
            }
        }
    }
    return missing;
}
function highlightPlayer(recurring) {
    var throttledUpdate = _0x219ef7;
    var name = 0;
    for (; name < gameData[throttledUpdate(380)]; name++) {
        TweenMax[throttledUpdate(724)]($["players"][throttledUpdate(811) + name][throttledUpdate(721)]);
        $[throttledUpdate(380)][throttledUpdate(811) + name]["newPlayerStatsHighlight"][throttledUpdate(606)] = ![];
    }
    if (recurring) {
        aniamtePlayerFocus($["players"][throttledUpdate(811) + gameData[throttledUpdate(741)]]);
        animateBlink($[throttledUpdate(380)][throttledUpdate(811) + gameData[throttledUpdate(741)]][throttledUpdate(721)]);
    }
}
function aniamtePlayerFocus(deepDataAndEvents) {
    var name = _0x219ef7;
    TweenMax["to"](deepDataAndEvents, 0.2, {
        delay: 0.5,
        scaleX: 1.3,
        scaleY: 1.3,
        ease: Sine[name(605)],
        overwrite: !![],
        onComplete: function () {
            var info = name;
            TweenMax["to"](deepDataAndEvents, 0.2, {
                scaleX: 1,
                scaleY: 1,
                ease: Sine[info(763)],
                overwrite: !![],
            });
        },
    });
}
function animateBlink(fun, value) {
    var throttledUpdate = _0x219ef7;
    var computed = value == undefined ? 0.5 : value;
    fun[throttledUpdate(606)] = !![];
    fun["alpha"] = computed;
    TweenMax["to"](fun, 0.3, {
        alpha: 1,
        overwrite: !![],
        onComplete: function () {
            TweenMax["to"](fun, 0.3, {
                alpha: computed,
                overwrite: !![],
                onComplete: animateBlink,
                onCompleteParams: [fun, value],
            });
        },
    });
}
function killAnimateBlink(deepDataAndEvents) {
    var throttledUpdate = _0x219ef7;
    deepDataAndEvents[throttledUpdate(606)] = ![];
    TweenMax[throttledUpdate(724)](deepDataAndEvents);
}
function nextPlayerTurn() {
    var throttledUpdate = _0x219ef7;
    gameData[throttledUpdate(741)]++;
    gameData[throttledUpdate(741)] = gameData[throttledUpdate(741)] > gameData[throttledUpdate(380)] - 1 ? 0 : gameData[throttledUpdate(741)];
    var _0x23974f = ![];
    var path = 0;
    for (; path < gameData["players"]; path++) {
        var resolved = checkPossibleMove(path);
        if (resolved[throttledUpdate(373)] > 0) {
            _0x23974f = !![];
        }
    }
    var complete = !![];
    if (gameData[throttledUpdate(579)]["draw"]) {
        if (_0x23974f) {
            complete = ![];
        } else {
            if (gameData[throttledUpdate(537)]["length"] > 0) {
                complete = ![];
            }
        }
    } else {
        if (_0x23974f) {
            complete = ![];
        }
    }
    gameData["complete"] = complete;
    if (typeof initSocket == throttledUpdate(427) && multiplayerSettings[throttledUpdate(750)] && socketData["online"]) {
        postSocketUpdate(throttledUpdate(725), socketData[throttledUpdate(363)]);
    } else {
        checkGameEnd();
    }
}
function checkGameEnd() {
    var throttledUpdate = _0x219ef7;
    if (gameData["complete"]) {
        highlightPlayer(![]);
        showGameStatus(throttledUpdate(390));
        console.log(throttledUpdate(390));
    } else {
        displayPlayerTurn();
    }
}
function tryFirstMove(recurring) {
    var name = _0x219ef7;
    if (gameData["ai"] && $["players"][gameData[name(741)]]["playerIndex"] != 0) {
        highlightTitles([]);
        var r20 = gameData["drawing"] == !![] ? gameSettings[name(487)] : gameSettings[name(797)];
        TweenMax["to"](boardContainer, r20, {
            overwrite: !![],
            onComplete: function () {
                var info = name;
                if (gameData[info(528)]) {
                    var frontName = Math["floor"](Math[info(707)]() * gameData[info(537)][info(373)]);
                    getDrawPile($[info(579)][gameData[info(537)][frontName]][info(567)]);
                } else {
                    var rreturn = [];
                    var r20 = [];
                    var iCol = 0;
                    for (; iCol < recurring[info(373)]; iCol++) {
                        var tile = recurring[iCol];
                        if (tile[info(337)]) {
                            var total = tile[info(627)][0];
                            rreturn["push"]({
                                total: total,
                                tile: tile,
                            });
                        } else {
                            total = tile[info(627)][0] + tile[info(627)][1];
                            r20[info(574)]({
                                total: total,
                                tile: tile,
                            });
                        }
                    }
                    sortOnObject(rreturn, info(674), !![]);
                    sortOnObject(r20, "total", !![]);
                    if (rreturn[info(373)] > 0) {
                        frontName = Math[info(765)](Math["random"]() * rreturn[info(373)]);
                        tile = rreturn[frontName]["tile"];
                    } else {
                        frontName = Math[info(765)](Math[info(707)]() * r20[info(373)]);
                        tile = r20[frontName][info(420)];
                    }
                    highlightPlacelable(tile[info(627)]);
                    if (gameData[info(464)][info(373)] > 0) {
                        var unlock = Math["floor"](Math[info(707)]() * gameData[info(464)]["length"]);
                        placeTitle(tile[info(567)], gameData[info(464)][unlock][info(567)], gameData[info(464)][unlock][info(482)]);
                    } else {
                        placeTitle(tile["tileIndex"], "", "none");
                    }
                    highlightPlacelable();
                }
            },
        });
    } else {
        if (gameSettings[name(476)] && !gameData["drawing"]) {
            var _0xae335d = ![];
            if (typeof initSocket == name(427) && multiplayerSettings[name(750)] && socketData[name(634)]) {
                if ($["players"][gameData[name(741)]][name(359)] == socketData["gameIndex"]) {
                    _0xae335d = !![];
                }
            } else {
                if ($[name(380)][gameData["player"]]["playerIndex"] == 0) {
                    _0xae335d = !![];
                }
            }
            if (_0xae335d) {
                TweenMax["to"](boardContainer, 0.5, {
                    overwrite: !![],
                    onComplete: function () {
                        var info = name;
                        var answers = checkPossibleMove(gameData["player"]);
                        if (gameData[info(723)][info(373)] == 0) {
                            if (answers[info(373)] == 1) {
                                playerMove(answers[0][info(567)]);
                                highlightPlacelable();
                            }
                        } else {
                            highlightPlacelable(answers[0][info(627)]);
                            if (answers[info(373)] == 1) {
                                if (gameData[info(464)][info(373)] == 1) {
                                    playerMove(answers[0][info(567)], gameData[info(464)][0][info(567)], gameData[info(464)][0][info(482)]);
                                }
                            }
                            highlightPlacelable();
                        }
                    },
                });
            }
        }
    }
}
function highlightTitles(recurring) {
    var throttledUpdate = _0x219ef7;
    var origName = 0;
    for (; origName < gameData[throttledUpdate(743)][throttledUpdate(373)]; origName++) {
        killAnimateBlink($["domino"][origName][throttledUpdate(464)]);
    }
    if (typeof initSocket == "function" && multiplayerSettings[throttledUpdate(750)] && socketData[throttledUpdate(634)]) {
        if (gameData[throttledUpdate(741)] != socketData[throttledUpdate(363)]) {
            return;
        }
    }
    origName = 0;
    for (; origName < recurring["length"]; origName++) {
        animateBlink(recurring[origName][throttledUpdate(464)]);
    }
}
function highlightPlacelable(a) {
    var getRandomInt = _0x219ef7;
    a = a == undefined ? [] : a;
    gameData[getRandomInt(464)] = [];
    boardHighlightContainer[getRandomInt(488)]();
    if (gameData["placed"][getRandomInt(373)] != 0) {
        var item = gameData["leftTile"]["rotationNum"] == 0 ? gameData[getRandomInt(740)]["numbers"][0] : gameData["leftTile"][getRandomInt(627)][1];
        var b = gameData[getRandomInt(585)]["rotationNum"] == 0 ? gameData[getRandomInt(585)]["numbers"][1] : gameData[getRandomInt(740)][getRandomInt(627)][0];
        if (gameData[getRandomInt(740)][getRandomInt(627)][getRandomInt(373)] == 1) {
            item = gameData[getRandomInt(740)][getRandomInt(627)][0];
        }
        if (gameData[getRandomInt(585)][getRandomInt(627)][getRandomInt(373)] == 1) {
            b = gameData[getRandomInt(585)][getRandomInt(627)][0];
        }
        var _0x1fbb7d = 2;
        if (a[getRandomInt(373)] == 2) {
            if (a[0] == a[1]) {
                _0x1fbb7d = 1;
            }
        }
        var i = 0;
        for (; i < a[getRandomInt(373)]; i++) {
            if (a[i] == item) {
                if (_0x1fbb7d > 0) {
                    createHighlight(gameData[getRandomInt(740)], getRandomInt(749));
                    _0x1fbb7d--;
                }
            }
            if (a[i] == b) {
                if (_0x1fbb7d > 0) {
                    createHighlight(gameData[getRandomInt(585)], getRandomInt(334));
                    _0x1fbb7d--;
                }
            }
        }
    }
}
function createHighlight(tmp, val) {
    var parseInt = _0x219ef7;
    var self = new createjs[parseInt(431)](loader["getResult"](parseInt(410)));
    centerReg(self);
    createHitarea(self);
    self[parseInt(521)] = self[parseInt(353)] = gameData[parseInt(475)][parseInt(533)];
    var _0xfd632a = self[parseInt(357)][parseInt(406)];
    var newDist = gameData[parseInt(420)][parseInt(344)];
    var nextTranslation;
    newDist = gameData[parseInt(420)][parseInt(344)] / 2 + _0xfd632a / 2;
    if (tmp[parseInt(810)] == 90 || tmp[parseInt(810)] == 270) {
        newDist = gameData["tile"][parseInt(516)] / 2 + _0xfd632a / 2;
    }
    if (tmp[parseInt(730)] == "") {
        newDist = newDist * gameData[parseInt(475)][parseInt(533)];
        if (val == parseInt(749)) {
            nextTranslation = getAnglePosition(tmp["x"], tmp["y"], newDist, 180);
        } else {
            nextTranslation = getAnglePosition(tmp["x"], tmp["y"], newDist, 0);
        }
    } else {
        if (tmp[parseInt(730)] == parseInt(493) || tmp[parseInt(730)] == parseInt(808)) {
            newDist = gameData[parseInt(420)][parseInt(516)] / 2 + _0xfd632a / 2;
            if (tmp["rotationNum"] == 90 || tmp[parseInt(810)] == 270) {
                newDist = gameData["tile"][parseInt(344)] / 2 + _0xfd632a / 2;
            }
        }
        newDist = newDist * gameData["mask"][parseInt(533)];
        if (tmp[parseInt(730)] == parseInt(334)) {
            nextTranslation = getAnglePosition(tmp["x"], tmp["y"], newDist, 0);
        } else {
            if (tmp["nextDir"] == "left") {
                nextTranslation = getAnglePosition(tmp["x"], tmp["y"], newDist, 180);
            } else {
                if (tmp[parseInt(730)] == parseInt(493)) {
                    nextTranslation = getAnglePosition(tmp["x"], tmp["y"], newDist, 270);
                } else {
                    if (tmp["nextDir"] == parseInt(808)) {
                        nextTranslation = getAnglePosition(tmp["x"], tmp["y"], newDist, 90);
                    }
                }
            }
        }
    }
    self["x"] = nextTranslation["x"];
    self["y"] = nextTranslation["y"];
    self["tileIndex"] = tmp[parseInt(567)];
    self[parseInt(482)] = val;
    if (!gameSettings[parseInt(636)]) {
        self[parseInt(745)] = "pointer";
        self["addEventListener"](parseInt(376), function (answers) {
            var computePropValue = parseInt;
            playerMove($[computePropValue(579)][gameData[computePropValue(747)]][computePropValue(567)], answers[computePropValue(588)][computePropValue(567)], answers[computePropValue(588)]["dir"]);
            highlightPlacelable();
        });
    }
    animateBlink(self);
    boardHighlightContainer["addChild"](self);
    gameData["highlight"][parseInt(574)](self);
}
function updateGame() {
    var throttledUpdate = _0x219ef7;
    if (!gameData["paused"]) {
        var control = 0;
        for (; control < gameData["tiles"][throttledUpdate(373)]; control++) {
            var options = gameData[throttledUpdate(743)][control];
            options[throttledUpdate(346)]["x"] = options["x"] + gameSettings[throttledUpdate(532)];
            options["shadow"]["y"] = options["y"] + gameSettings[throttledUpdate(532)];
            options[throttledUpdate(346)]["scaleX"] = options["scaleX"];
            options[throttledUpdate(346)][throttledUpdate(353)] = options[throttledUpdate(353)];
            options[throttledUpdate(346)]["rotation"] = options[throttledUpdate(580)];
            options[throttledUpdate(346)][throttledUpdate(606)] = options["visible"];
        }
    }
}
function showGameStatus(dataAndEvents) {
    var getLocation = _0x219ef7;
    var delay = 0;
    var progressDelay = 1;
    var targetOrigin = "soundAlert";
    statusPlayerTxt["text"] = $[getLocation(380)]["stats" + gameData[getLocation(741)]][getLocation(708)][getLocation(393)];
    if (dataAndEvents == getLocation(514)) {
        statusTxt["text"] = textDisplay[getLocation(617)];
    } else {
        if (dataAndEvents == "nomove") {
            statusTxt[getLocation(393)] = textDisplay[getLocation(416)];
            if (typeof initSocket == getLocation(427) && multiplayerSettings[getLocation(750)] && socketData["online"]) {
                if ($[getLocation(380)][gameData[getLocation(741)]][getLocation(359)] == socketData[getLocation(363)]) {
                    drawTitleTxt[getLocation(393)] = textDisplay["userPickDomino"];
                } else {
                    drawTitleTxt[getLocation(393)] = textDisplay[getLocation(577)]["replace"]("[NAME]", $[getLocation(380)][getLocation(811) + gameData[getLocation(741)]][getLocation(708)][getLocation(393)]);
                }
            } else {
                if ($["players"][gameData[getLocation(741)]][getLocation(359)] == 0) {
                    drawTitleTxt[getLocation(393)] = textDisplay[getLocation(544)];
                } else {
                    drawTitleTxt[getLocation(393)] = textDisplay["playerPickDomino"]["replace"](getLocation(526), $[getLocation(380)][getLocation(811) + gameData[getLocation(741)]][getLocation(708)][getLocation(393)]);
                }
            }
            delay = 1;
            TweenMax["to"](boardContainer, 3, {
                overwrite: !![],
                onComplete: function () {
                    toggleDrawPiles(!![]);
                    tryFirstMove();
                },
            });
        } else {
            if (dataAndEvents == getLocation(726)) {
                delay = 1;
                statusTxt["text"] = textDisplay[getLocation(439)];
                TweenMax["to"](boardContainer, 3, {
                    overwrite: !![],
                    onComplete: function () {
                        nextPlayerTurn();
                    },
                });
            } else {
                if (dataAndEvents == getLocation(385)) {
                    delay = 1;
                    statusTxt[getLocation(393)] = textDisplay["playerBlocked"];
                    TweenMax["to"](boardContainer, 3, {
                        overwrite: !![],
                        onComplete: function () {
                            nextPlayerTurn();
                        },
                    });
                } else {
                    if (dataAndEvents == getLocation(579)) {
                        targetOrigin = getLocation(816);
                        delay = 1;
                        statusTxt[getLocation(393)] = textDisplay[getLocation(709)];
                        TweenMax["to"](boardContainer, 3, {
                            overwrite: !![],
                            onComplete: function () {
                                toggleRoundScore(!![], !![]);
                            },
                        });
                    } else {
                        if (dataAndEvents == getLocation(390)) {
                            targetOrigin = getLocation(651);
                            delay = 1;
                            statusTxt[getLocation(393)] = textDisplay[getLocation(416)];
                            statusPlayerTxt[getLocation(393)] = textDisplay["roundEnd"];
                            TweenMax["to"](boardContainer, 3, {
                                overwrite: !![],
                                onComplete: function () {
                                    toggleRoundScore(!![], ![]);
                                },
                            });
                        }
                    }
                }
            }
        }
    }
    statusContainer[getLocation(773)] = 0;
    TweenMax["to"](statusContainer, 0.5, {
        delay: delay,
        alpha: 1,
        overwrite: !![],
        onStart: function () {
            playSound(targetOrigin);
        },
        onComplete: function () {
            TweenMax["to"](statusContainer, 0.5, {
                delay: progressDelay,
                alpha: 0,
                overwrite: !![],
            });
        },
    });
}
function toggleRoundScore(recurring, v33) {
    var decodeURIComponent = _0x219ef7;
    boardScoreListContainer[decodeURIComponent(488)]();
    boardScoreContainer[decodeURIComponent(606)] = recurring;
    if (recurring) {
        playSound(decodeURIComponent(424));
        var quantity = 0;
        var r20 = [];
        var _0xfcfbf8 = ![];
        var name = 0;
        for (; name < gameData[decodeURIComponent(380)]; name++) {
            var total = 0;
            var i = 0;
            for (; i < $[decodeURIComponent(380)][name]["tiles"]["length"]; i++) {
                var result = $[decodeURIComponent(579)][$["players"][name][decodeURIComponent(743)][i]];
                result[decodeURIComponent(717)]["visible"] = !![];
                var v = result[decodeURIComponent(627)][0] + result["numbers"][1];
                total += v;
            }
            if (v33) {
                quantity += total;
            } else {
                r20[decodeURIComponent(574)]({
                    total: total,
                    player: name,
                });
            }
        }
        if (r20.length > 0 && typeof r20[0].player !== 'undefined') {
            const winnerIndex = r20[0].player;
            const winnerName = gameData.names?.[winnerIndex] || 'Desconocido';

            gameData["pointWinner"] = winnerIndex;
            gameData[decodeURIComponent(741)] = winnerIndex;

            if (typeof sendGameResultToParent === 'function') {
                sendGameResultToParent(winnerIndex, winnerName);  // 🛠️ PASAMOS EL NOMBRE
            }
        }
        if (!v33) {
            sortOnObject(r20, decodeURIComponent(674), ![]);
            quantity = 0;
            name = 1;
            for (; name < r20[decodeURIComponent(373)]; name++) {
                quantity += r20[name][decodeURIComponent(674)];
            }
        }
        if (typeof initSocket == "function" && multiplayerSettings[decodeURIComponent(750)] && socketData[decodeURIComponent(634)]) {
            if (v33 && $["players"][gameData["player"]][decodeURIComponent(359)] == socketData[decodeURIComponent(363)]) {
                roundStatusTxt[decodeURIComponent(393)] = textDisplay["playerRoundWin"];
            } else {
                roundStatusTxt[decodeURIComponent(393)] = textDisplay[decodeURIComponent(423)];
            }
        } else {
            if (v33 && $[decodeURIComponent(380)][gameData[decodeURIComponent(741)]][decodeURIComponent(359)] == 0) {
                roundStatusTxt[decodeURIComponent(393)] = textDisplay["playerRoundWin"];
            } else {
                roundStatusTxt["text"] = textDisplay[decodeURIComponent(423)];
            }
        }
        var data = {
            startY: 50,
            x: -150,
            y: 0,
            spaceY: 45,
            scoreX: 300,
            titleSpace: 50,
        };
        data["y"] = data[decodeURIComponent(448)] - (gameData[decodeURIComponent(380)] - 1) * data[decodeURIComponent(597)];
        data["y"] -= data[decodeURIComponent(704)];
        itemScoreTop["y"] = data["y"] - data[decodeURIComponent(597)];
        var params = new createjs[decodeURIComponent(472)]();
        params[decodeURIComponent(404)] = decodeURIComponent(382);
        params[decodeURIComponent(615)] = decodeURIComponent(349);
        params["textAlign"] = decodeURIComponent(429);
        params["textBaseline"] = decodeURIComponent(396);
        params["text"] = textDisplay["goalPointTitle"][decodeURIComponent(553)]("[NUMBER]", gameSettings["points"][gameData["pointIndex"]]);
        params["y"] = data["y"];
        var suiteView = new createjs[decodeURIComponent(431)](loader[decodeURIComponent(803)]("itemScoreDivide"));
        centerReg(suiteView);
        suiteView["y"] = data["y"] + 15;
        data["y"] += data["titleSpace"];
        boardScoreListContainer[decodeURIComponent(501)](params, suiteView);
        var currentGame = null;
        var src = 0;
        name = 0;
        for (; name < gameData[decodeURIComponent(380)]; name++) {
            var obj = new createjs["Text"]();
            obj[decodeURIComponent(404)] = decodeURIComponent(382);
            obj[decodeURIComponent(615)] = decodeURIComponent(349);
            obj[decodeURIComponent(781)] = decodeURIComponent(749);
            obj[decodeURIComponent(731)] = "alphabetic";
            obj[decodeURIComponent(393)] = $[decodeURIComponent(380)][decodeURIComponent(811) + name][decodeURIComponent(708)][decodeURIComponent(393)];
            var self = new createjs["Text"]();
            self["font"] = decodeURIComponent(382);
            self[decodeURIComponent(615)] = decodeURIComponent(349);
            self[decodeURIComponent(781)] = "right";
            self[decodeURIComponent(731)] = decodeURIComponent(396);
            self[decodeURIComponent(393)] = textDisplay[decodeURIComponent(637)]["replace"]("[NUMBER]", playerData[decodeURIComponent(716)][name]);
            if (name == gameData[decodeURIComponent(741)]) {
                tweenData[decodeURIComponent(453)] = playerData[decodeURIComponent(716)][name];
                currentGame = self;
                playerData[decodeURIComponent(716)][name] += quantity;
                obj[decodeURIComponent(393)] = obj[decodeURIComponent(393)] + textDisplay[decodeURIComponent(527)][decodeURIComponent(553)](decodeURIComponent(386), quantity);
                src = playerData[decodeURIComponent(716)][name];
                if (typeof initSocket == "function" && multiplayerSettings[decodeURIComponent(750)] && socketData["online"]) {
                    if ($["players"][gameData[decodeURIComponent(741)]][decodeURIComponent(359)] == socketData[decodeURIComponent(363)]) {
                        roundStatusTxt["text"] = textDisplay[decodeURIComponent(800)];
                    }
                } else {
                    if ($[decodeURIComponent(380)][gameData[decodeURIComponent(741)]][decodeURIComponent(359)] == 0) {
                        roundStatusTxt[decodeURIComponent(393)] = textDisplay[decodeURIComponent(800)];
                    }
                }
                if (playerData[decodeURIComponent(716)][name] >= gameData[decodeURIComponent(579)][decodeURIComponent(807)]) {
                    if ($[decodeURIComponent(380)][gameData[decodeURIComponent(741)]][decodeURIComponent(359)] == 0) {
                        roundStatusTxt[decodeURIComponent(393)] = textDisplay[decodeURIComponent(774)];
                    } else {
                        roundStatusTxt[decodeURIComponent(393)] = textDisplay[decodeURIComponent(622)][decodeURIComponent(553)](decodeURIComponent(526), $["players"][decodeURIComponent(811) + name][decodeURIComponent(708)]["text"]);
                    }
                    _0xfcfbf8 = !![];
                }
                obj[decodeURIComponent(615)] = self[decodeURIComponent(615)] = decodeURIComponent(677);
                animateBlink(obj, 0.6);
                animateBlink(self, 0.6);
            }
            var hash = new createjs["Bitmap"](loader["getResult"]("itemScoreDivide"));
            centerReg(hash);
            obj["x"] = data["x"];
            obj["y"] = data["y"];
            self["x"] = data["x"] + data[decodeURIComponent(452)];
            self["y"] = data["y"];
            hash["y"] = data["y"] + data[decodeURIComponent(597)] / 4;
            hash[decodeURIComponent(606)] = name == gameData[decodeURIComponent(380)] - 1 ? ![] : !![];
            data["y"] += data["spaceY"];
            boardScoreListContainer["addChild"](obj, self, hash);
            $[decodeURIComponent(380)][decodeURIComponent(811) + name][decodeURIComponent(637)][decodeURIComponent(393)] = textDisplay[decodeURIComponent(637)][decodeURIComponent(553)]("[NUMBER]", playerData[decodeURIComponent(716)][name]);
        }
        if (currentGame != null) {
            TweenMax["to"](tweenData, 0.5, {
                delay: 1,
                tweenScore: src,
                overwrite: !![],
                onUpdate: function () {
                    var asyncForEach = decodeURIComponent;
                    currentGame[asyncForEach(393)] = textDisplay["playerScore"][asyncForEach(553)]("[NUMBER]", Math[asyncForEach(824)](tweenData["tweenScore"]));
                },
            });
        }
        boardScoreContainer["alpha"] = 0;
        TweenMax["to"](boardScoreContainer, 0.5, {
            alpha: 1,
            overwrite: !![],
            onComplete: function () {
                TweenMax["to"](boardScoreContainer, 4, {
                    overwrite: !![],
                    onComplete: function () {
                        if (_0xfcfbf8) {
                            endGame();
                        } else {
                            TweenMax["to"](boardScoreContainer, 0.5, {
                                alpha: 0,
                                overwrite: !![],
                                onComplete: function () {
                                    var processKey = _0x243b;
                                    playSound(processKey(821));
                                    var name = 0;
                                    for (; name < gameData[processKey(743)][processKey(373)]; name++) {
                                        var existingNode = gameData[processKey(743)][name];
                                        existingNode[processKey(717)]["visible"] = ![];
                                        TweenMax["to"](existingNode, gameSettings["tileDealSpeed"], {
                                            x: 0,
                                            y: 0,
                                            rotation: 0,
                                            scaleX: 1,
                                            scaleY: 1,
                                            overwrite: !![],
                                        });
                                    }
                                    name = 0;
                                    for (; name < gameData[processKey(380)]; name++) {
                                        $[processKey(380)][processKey(811) + name][processKey(606)] = ![];
                                    }
                                    TweenMax["to"](boardScoreContainer, 0.5, {
                                        alpha: 0,
                                        overwrite: !![],
                                        onComplete: function () {
                                            var getLabel = processKey;
                                            if (typeof initSocket == getLabel(427) && multiplayerSettings["enable"] && socketData["online"]) {
                                                postSocketUpdate(getLabel(820), socketData[getLabel(363)]);
                                            } else {
                                                startDomino();
                                            }
                                        },
                                    });
                                },
                            });
                        }
                    },
                });
            },
        });
    }
}
function endGame() {
  gameData["paused"] = true;
  const winnerIndex = gameData["pointWinner"];
  const winnerName = gameData.names?.[winnerIndex] || 'Desconocido';
  const winnerUserId = gameData.userIds?.[winnerIndex];

  console.log(_0x219ef7(793));

  // ✅ Pasa el INDEX, no el ID ni el boolean
  if (typeof winnerIndex !== 'undefined') {
    sendGameResultToParent(winnerIndex);
  }

  TweenMax.to(gameContainer, 1, {
    overwrite: true,
    onComplete: function () {
      goPage("resultPage");
    },
  });
}

// ⬇️ ⬇️ AÑADE AQUÍ LA FUNCIÓN GLOBAL
function sendGameResultToParent(winnerIndex, winnerName) {
  try {
    const userIds = window.gameData.userIds || [];
    const currentUserId = window.gameData.userId;
    const mode = window.gameData.mode;

    let winnerUserId = null;

    if (mode === 'CPU') {
      winnerUserId = winnerIndex === 0 ? currentUserId : null;
    } else {
      winnerUserId = userIds[winnerIndex] || null;
    }

    const isWinner = winnerUserId === currentUserId;

    window.parent.postMessage({
      type: 'GAME_RESULT',
      data: {
        userId: winnerUserId,
        result: isWinner ? 'gano' : 'perdio',
        winnerName: winnerName || 'Desconocido'
      }
    }, '*');

    console.log("📤 Resultado enviado al parent:", {
      userId: winnerUserId,
      result: isWinner ? 'gano' : 'perdio',
      winnerName
    });

  } catch (error) {
    console.error("❌ Error al enviar resultado al parent:", error);
  }
}

function millisecondsToTimeGame(a) {
    var throttledUpdate = _0x219ef7;
    var r = a % 1e3;
    var value = Math[throttledUpdate(765)]((a / 1e3) % 60);
    var name = Math[throttledUpdate(765)]((a / (60 * 1e3)) % 60);
    return value < 10 && (value = "0" + value), name < 10 && (name = "0" + name), name + ":" + value;
}
function toggleOption() {
    var throttledUpdate = _0x219ef7;
    if (optionsContainer[throttledUpdate(606)]) {
        optionsContainer["visible"] = ![];
    } else {
        optionsContainer["visible"] = !![];
    }
}
function toggleSoundMute(recurring) {
    var throttledUpdate = _0x219ef7;
    buttonSoundOff[throttledUpdate(606)] = ![];
    buttonSoundOn["visible"] = ![];
    toggleSoundInMute(recurring);
    if (recurring) {
        buttonSoundOn["visible"] = !![];
    } else {
        buttonSoundOff[throttledUpdate(606)] = !![];
    }
}
function toggleMusicMute(recurring) {
    var throttledUpdate = _0x219ef7;
    buttonMusicOff[throttledUpdate(606)] = ![];
    buttonMusicOn[throttledUpdate(606)] = ![];
    toggleMusicInMute(recurring);
    if (recurring) {
        buttonMusicOn[throttledUpdate(606)] = !![];
    } else {
        buttonMusicOff[throttledUpdate(606)] = !![];
    }
}
function toggleFullScreen() {
    var cancelFullScreen = _0x219ef7;
    if (!document[cancelFullScreen(700)] && !document[cancelFullScreen(693)] && !document[cancelFullScreen(440)] && !document[cancelFullScreen(450)]) {
        if (document[cancelFullScreen(602)][cancelFullScreen(536)]) {
            document[cancelFullScreen(602)][cancelFullScreen(536)]();
        } else {
            if (document[cancelFullScreen(602)][cancelFullScreen(598)]) {
                document[cancelFullScreen(602)][cancelFullScreen(598)]();
            } else {
                if (document[cancelFullScreen(602)][cancelFullScreen(729)]) {
                    document[cancelFullScreen(602)][cancelFullScreen(729)]();
                } else {
                    if (document["documentElement"][cancelFullScreen(510)]) {
                        document[cancelFullScreen(602)][cancelFullScreen(510)](Element[cancelFullScreen(523)]);
                    }
                }
            }
        }
    } else {
        if (document[cancelFullScreen(742)]) {
            document[cancelFullScreen(742)]();
        } else {
            if (document[cancelFullScreen(675)]) {
                document[cancelFullScreen(675)]();
            } else {
                if (document[cancelFullScreen(483)]) {
                    document[cancelFullScreen(483)]();
                } else {
                    if (document[cancelFullScreen(462)]) {
                        document["webkitExitFullscreen"]();
                    }
                }
            }
        }
    }
}
function share(fail) {
    var strRepeat = _0x219ef7;
    gtag("event", strRepeat(376), {
        event_category: strRepeat(613),
        event_label: fail,
    });
    var str = location["href"];
    str = str[strRepeat(652)](0, str[strRepeat(546)]("/") + 1);
    var optsData = "";
    var s = "";
    optsData = shareTitle[strRepeat(553)](strRepeat(660), playerData[strRepeat(583)]);
    s = shareMessage[strRepeat(553)](strRepeat(660), playerData[strRepeat(583)]);
    var message = "";
    if (fail == strRepeat(752)) {
        message = strRepeat(531) + str + strRepeat(341) + s;
    } else {
        if (fail == strRepeat(458)) {
            message = strRepeat(463) + encodeURIComponent(str + strRepeat(802) + s + strRepeat(343) + optsData + strRepeat(645) + str + strRepeat(538) + str + strRepeat(426));
        } else {
            if (fail == strRepeat(559)) {
                message = strRepeat(584) + str;
            } else {
                if (fail == strRepeat(377)) {
                    message = "whatsapp://send?text=" + encodeURIComponent(s) + " - " + encodeURIComponent(str);
                }
            }
        }
    }
    window[strRepeat(798)](message);
}
var stageW = 1280;
var stageH = 768;
var contentW = 1024;
var contentH = 576;
var viewport = {
    isLandscape: !![],
};
var landscapeSize = {
    w: stageW,
    h: stageH,
    cW: contentW,
    cH: contentH,
};
var portraitSize = {
    w: 768,
    h: 1024,
    cW: 576,
    cH: 900,
};
function initMain() {
    var parentIfText = _0x219ef7;
    if (!$[parentIfText(444)]["mobile"] || !isTablet) {
        $(parentIfText(360))[parentIfText(673)]();
    }
    initGameCanvas(stageW, stageH);
    buildGameCanvas();
    buildGameButton();
    if (typeof buildScoreBoardCanvas == "function") {
        buildScoreBoardCanvas();
    }
    goPage(parentIfText(449));
    if (typeof initSocket == parentIfText(427)) {
        if (multiplayerSettings[parentIfText(750)]) {
            initSocket(parentIfText(520));
        }
    }
    checkMobileOrientation();
    resizeCanvas();
}
var windowW = (windowH = 0);
var scalePercent = 0;
var offset = {
    x: 0,
    y: 0,
    left: 0,
    top: 0,
};
function resizeGameFunc() {
    setTimeout(function () {
        var parentIfText = _0x243b;
        $(".mobileRotate")["css"]("left", checkContentWidth($(parentIfText(795))));
        $(parentIfText(795))["css"](parentIfText(493), checkContentHeight($(parentIfText(795))));
        windowW = window[parentIfText(744)];
        windowH = window["innerHeight"];
        scalePercent = windowW / contentW;
        if (contentH * scalePercent > windowH) {
            scalePercent = windowH / contentH;
        }
        scalePercent = scalePercent > 1 ? 1 : scalePercent;
        if (windowW > stageW) {
            if (windowH > stageH) {
                if (windowW > stageW) {
                    scalePercent = windowW / stageW;
                    if (stageH * scalePercent > windowH) {
                        scalePercent = windowH / stageH;
                    }
                }
            }
        }
        var restoreScript = stageW * scalePercent;
        var r20 = stageH * scalePercent;
        offset[parentIfText(749)] = 0;
        offset["top"] = 0;
        if (restoreScript > windowW) {
            offset[parentIfText(749)] = -(restoreScript - windowW);
        } else {
            offset[parentIfText(749)] = windowW - restoreScript;
        }
        if (r20 > windowH) {
            offset["top"] = -(r20 - windowH);
        } else {
            offset[parentIfText(493)] = windowH - r20;
        }
        offset["x"] = 0;
        offset["y"] = 0;
        if (offset["left"] < 0) {
            offset["x"] = Math[parentIfText(650)](offset[parentIfText(749)] / scalePercent / 2);
        }
        if (offset[parentIfText(493)] < 0) {
            offset["y"] = Math[parentIfText(650)](offset["top"] / scalePercent / 2);
        }
        $(parentIfText(484))[parentIfText(788)](parentIfText(344), restoreScript);
        $(parentIfText(484))["css"](parentIfText(516), r20);
        $(parentIfText(484))[parentIfText(788)]("left", offset[parentIfText(749)] / 2);
        $(parentIfText(484))[parentIfText(788)](parentIfText(493), offset["top"] / 2);
        if (typeof initSocket == "function") {
            if (multiplayerSettings[parentIfText(750)]) {
                $(parentIfText(505))[parentIfText(621)](function (dataAndEvents, deepDataAndEvents) {
                    var throttledUpdate = parentIfText;
                    $(this)[throttledUpdate(788)](throttledUpdate(370), Math["round"](Number($(this)[throttledUpdate(775)](throttledUpdate(684))) * scalePercent));
                });
                $("#roomWrapper")[parentIfText(788)](parentIfText(344), restoreScript);
                $("#roomWrapper")[parentIfText(788)](parentIfText(516), r20);
                $(parentIfText(734))[parentIfText(788)](parentIfText(749), offset[parentIfText(749)] / 2);
                $(parentIfText(734))[parentIfText(788)]("top", offset[parentIfText(493)] / 2);
                $("#notificationHolder")[parentIfText(788)]("width", restoreScript);
                $(parentIfText(760))[parentIfText(788)](parentIfText(516), r20);
                $(parentIfText(760))[parentIfText(788)](parentIfText(749), offset[parentIfText(749)] / 2);
                $("#notificationHolder")["css"](parentIfText(493), offset[parentIfText(493)] / 2);
            }
        }
        $(window)[parentIfText(543)](0);
        resizeCanvas();
        if (typeof resizeScore == parentIfText(427)) {
            resizeScore();
        }
    }, 100);
}
var resizeTimer;
function checkMobileEvent() {
    var throttledUpdate = _0x219ef7;
    if ($[throttledUpdate(444)][throttledUpdate(590)] || isTablet) {
        $(window)
            [throttledUpdate(477)](throttledUpdate(695))
            ["on"](throttledUpdate(695), function (dataAndEvents) {
                var parentIfText = throttledUpdate;
                $(parentIfText(360))["hide"]();
                $(parentIfText(402))[parentIfText(490)]();
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(checkMobileOrientation, 1e3);
            });
        checkMobileOrientation();
    }
}
function checkMobileOrientation() {
    var parentIfText = _0x219ef7;
    var isLandscape = ![];
    if (window[parentIfText(744)] > window[parentIfText(509)]) {
        isLandscape = !![];
    }
    if ($[parentIfText(492)][parentIfText(750)]) {
        viewport[parentIfText(471)] = !![];
    } else {
        viewport["isLandscape"] = isLandscape;
    }
    changeViewport(viewport["isLandscape"]);
    resizeGameFunc();
    $(parentIfText(360))[parentIfText(673)]();
}
function toggleRotate(dataAndEvents) {
    var parentIfText = _0x219ef7;
    if (dataAndEvents) {
        $(parentIfText(402))[parentIfText(668)]();
    } else {
        $(parentIfText(402))[parentIfText(570)]();
    }
    resizeGameFunc();
}
function initPreload() {
    var id = _0x219ef7;
    toggleLoader(!![]);
    checkMobileEvent();
    $(window)["resize"](function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(checkMobileOrientation, 1e3);
    });
    resizeGameFunc();
    loader = new createjs[id(512)](![]);
    manifest = [
        {
            src: id(436),
            id: id(776),
        },
        {
            src: id(733),
            id: id(411),
        },
        {
            src: id(374),
            id: id(748),
        },
        {
            src: id(364),
            id: id(454),
        },
        {
            src: id(407),
            id: id(825),
        },
        {
            src: id(515),
            id: id(552),
        },
        {
            src: id(670),
            id: id(792),
        },
        {
            src: id(663),
            id: id(640),
        },
        {
            src: "assets/button_local.png",
            id: "buttonLocal",
        },
        {
            src: id(600),
            id: id(687),
        },
        {
            src: "assets/button_arrow_right.png",
            id: id(517),
        },
        {
            src: id(525),
            id: id(736),
        },
        {
            src: id(442),
            id: id(542),
        },
        {
            src: id(545),
            id: id(339),
        },
        {
            src: id(596),
            id: id(722),
        },
        {
            src: id(791),
            id: "itemPlayerStatsHighlight",
        },
        {
            src: "assets/item_status.png",
            id: id(691),
        },
        {
            src: id(718),
            id: "itemDrawBg",
        },
        {
            src: "assets/item_draw_bg_p.png",
            id: "itemDrawBgP",
        },
        {
            src: id(447),
            id: "itemTileHighlight",
        },
        {
            src: id(392),
            id: id(434),
        },
        {
            src: "assets/item_score_top.png",
            id: id(455),
        },
        {
            src: id(365),
            id: id(778),
        },
        {
            src: id(761),
            id: id(688),
        },
        {
            src: id(384),
            id: id(794),
        },
        {
            src: id(681),
            id: id(524),
        },
        {
            src: "assets/button_continue.png",
            id: id(355),
        },
        {
            src: "assets/item_pop.png",
            id: id(728),
        },
        {
            src: "assets/item_pop_p.png",
            id: id(595),
        },
        {
            src: id(415),
            id: id(460),
        },
        {
            src: "assets/button_cancel.png",
            id: id(350),
        },
        {
            src: "assets/button_fullscreen.png",
            id: id(418),
        },
        {
            src: id(727),
            id: id(461),
        },
        {
            src: id(368),
            id: id(685),
        },
        {
            src: id(519),
            id: id(548),
        },
        {
            src: id(564),
            id: id(587),
        },
        {
            src: id(529),
            id: "buttonExit",
        },
        {
            src: id(812),
            id: id(443),
        },
    ];
    var i = 0;
    for (; i < themes_arr["length"]; i++) {
        manifest["push"]({
            src: themes_arr[i]["bg"][id(513)],
            id: id(367) + i,
        });
        manifest[id(574)]({
            src: themes_arr[i]["bg"]["back"],
            id: "themeBgBack" + i,
        });
        manifest["push"]({
            src: themes_arr[i][id(464)][id(357)],
            id: id(498) + i,
        });
        manifest[id(574)]({
            src: themes_arr[i][id(346)][id(357)],
            id: "themeShadow" + i,
        });
        manifest["push"]({
            src: themes_arr[i]["numbers"]["image"],
            id: id(828) + i,
        });
    }
    if (typeof addScoreboardAssets == id(427)) {
        addScoreboardAssets();
    }
    soundOn = !![];
    if ($[id(444)][id(590)] || isTablet) {
        if (!enableMobileSound) {
            soundOn = ![];
        }
    } else {
        if (!enableDesktopSound) {
            soundOn = ![];
        }
    }
    if (soundOn) {
        manifest[id(574)]({
            src: id(571),
            id: "soundButton",
        });
        manifest["push"]({
            src: id(769),
            id: "soundDominoPick",
        });
        manifest[id(574)]({
            src: "assets/sounds/sound_domino1.ogg",
            id: "soundDomino1",
        });
        manifest[id(574)]({
            src: "assets/sounds/sound_domino2.ogg",
            id: id(813),
        });
        manifest[id(574)]({
            src: "assets/sounds/sound_domino3.ogg",
            id: "soundDomino3",
        });
        manifest[id(574)]({
            src: "assets/sounds/sound_point.ogg",
            id: id(424),
        });
        manifest["push"]({
            src: id(511),
            id: id(651),
        });
        manifest[id(574)]({
            src: id(405),
            id: id(816),
        });
        manifest[id(574)]({
            src: id(497),
            id: "soundShuffleIn",
        });
        manifest["push"]({
            src: id(625),
            id: "soundShuffleOut",
        });
        manifest[id(574)]({
            src: "assets/sounds/sound_result.ogg",
            id: id(814),
        });
        manifest["push"]({
            src: id(491),
            id: id(764),
        });
        manifest["push"]({
            src: id(698),
            id: id(647),
        });
        manifest[id(574)]({
            src: id(479),
            id: "musicMain",
        });
        createjs[id(669)]["alternateExtensions"] = [id(790)];
        loader[id(616)](createjs[id(669)]);
    }
    loader[id(664)](id(358), handleComplete);
    loader[id(664)](id(768), fileComplete);
    loader[id(664)](id(686), handleFileError);
    loader["on"](id(770), handleProgress, this);
    loader[id(381)](manifest);
}
function fileComplete($cookies) {
    var throttledUpdate = _0x219ef7;
    var value = $cookies[throttledUpdate(470)];
}
function handleFileError(ext) {
    var prepArgs = _0x219ef7;
    console[prepArgs(696)](prepArgs(671), ext);
}
function handleProgress() {
    var parentIfText = _0x219ef7;
    $(parentIfText(399))[parentIfText(628)](Math[parentIfText(824)]((loader["progress"] / 1) * 100) + "%");
}
function handleComplete() {
    toggleLoader(![]);
    initMain();
}
function toggleLoader(recurring) {
    var parentIfText = _0x219ef7;
    if (recurring) {
        $(parentIfText(412))[parentIfText(673)]();
    } else {
        $("#mainLoader")[parentIfText(490)]();
    }
}
var stageWidth;
var stageHeight = 0;
var isLoaded = ![];
$(function () {
    var debugObj = _0x219ef7;
    var Context = function () {
        var proxy = _0x243b;
        try {
            if (createjs[proxy(701)][proxy(713)][proxy(758)] === proxy(494)) {
                createjs[proxy(701)]["context"][proxy(441)]();
                window[proxy(720)](proxy(376), Context);
            }
        } catch (message) {
            console[proxy(686)]("There was an error while trying to resume the SoundJS Web Audio context...");
            console["error"](message);
        }
    };
    window[debugObj(664)]("click", Context);
    if (window[debugObj(649)][debugObj(610)][debugObj(719)](0, 4) === debugObj(565)) {
        alert(debugObj(777));
    }
    $(window)[debugObj(459)](function () {
        resizeLoaderFunc();
    });
    resizeLoaderFunc();
    checkBrowser();
});
function resizeLoaderFunc() {
    var parentIfText = _0x219ef7;
    stageWidth = $(window)[parentIfText(344)]();
    stageHeight = $(window)["height"]();
    $(parentIfText(412))[parentIfText(788)]("left", checkContentWidth($("#mainLoader")));
    $(parentIfText(412))[parentIfText(788)]("top", checkContentHeight($(parentIfText(412))));
}
var browserSupport = ![];
var isTablet;
function checkBrowser() {
    var parentIfText = _0x219ef7;
    isTablet = /ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i["test"](navigator["userAgent"][parentIfText(555)]());
    deviceVer = getDeviceVer();
    var getContext = document[parentIfText(481)](parentIfText(484));
    if (getContext["getContext"]) {
        browserSupport = !![];
    }
    if (browserSupport) {
        if (!isLoaded) {
            isLoaded = !![];
            initPreload();
        }
    } else {
        $(parentIfText(658))[parentIfText(673)]();
    }
}
function _0x363b() {
    var columnIds = [
        "points",
        "domino",
        "rotation",
        "numChildren",
        "soundButton",
        "score",
        "https://plus.google.com/share?url=",
        "rightTile",
        "debug",
        "buttonMusicOff",
        "target",
        "result",
        "mobile",
        "defaultVol",
        "239544trEdsH",
        "assets/theme_bg_02.png",
        "regY",
        "itemPopP",
        "assets/item_player_stats.png",
        "spaceY",
        "msRequestFullscreen",
        "Graphics",
        "assets/button_arrow_left.png",
        "96455OSpqQi",
        "documentElement",
        "playermove",
        "Container",
        "easeIn",
        "visible",
        "sqrt",
        "277490ctkkpC",
        "addClass",
        "protocol",
        "1365NjHpVL",
        "cos",
        "share",
        "SALE LA COCHINA O LA FICHA MÁS ALTA",
        "color",
        "installPlugin",
        "highestToStart",
        "tick",
        "iOS",
        "timeEnd",
        "each",
        "playerWin",
        "assets/theme_shadow_01.png",
        "assets/theme_numbers_05.png",
        "assets/sounds/sound_shuffle_out.ogg",
        "exitTitle",
        "numbers",
        "html",
        "EXIT GAME",
        "#roomWrapper .nameContent",
        "musicMain",
        "src",
        "host",
        "online",
        "75px bpreplaybold",
        "dragToMove",
        "playerScore",
        "soundDomino",
        "atan2",
        "buttonOnline",
        "deal",
        "assets/theme_highlight_01.png",
        "maxColumn",
        "minPlayers",
        "&url=",
        "playerStats",
        "musicGame",
        "22px bpreplaybold",
        "location",
        "abs",
        "soundRound",
        "substring",
        "Sprite",
        "26px bpreplaybold",
        "horizontal",
        "oriX",
        "27KULVIA",
        "#notSupportHolder",
        "gotoAndStop",
        "[SCORE]",
        "tilePlacedSpace",
        "Ticker",
        "assets/button_online.png",
        "addEventListener",
        "8VTcjCN",
        "currentTarget",
        "local",
        "fadeIn",
        "Sound",
        "assets/button_next.png",
        "error ",
        "assets/theme_cover_01.png",
        "show",
        "total",
        "msExitFullscreen",
        "move",
        "#FFFF00",
        "options",
        "removeChild",
        "7048nNfWWb",
        "assets/button_whatsapp.png",
        "YOU WIN THE GAME",
        "dragging",
        "data-fontsize",
        "buttonSoundOff",
        "error",
        "buttonArrowLeft",
        "buttonFacebook",
        "goalPoint",
        "getElementById",
        "itemStatus",
        "tileSpace",
        "mozFullScreenElement",
        "scoreData",
        "orientationchange",
        "log",
        "type",
        "assets/sounds/music_game.ogg",
        "size",
        "fullscreenElement",
        "WebAudioPlugin",
        "trace",
        "gameCanvas",
        "titleSpace",
        "[NUMBER]PTS",
        "DRAW DOMINOES",
        "random",
        "playerName",
        "playerDomino",
        "soundShuffleIn",
        "globalToLocal",
        "naturalHeight",
        "context",
        "586990ObwxCM",
        "#roomLogs",
        "scores",
        "frontContainer",
        "assets/item_draw_bg.png",
        "substr",
        "removeEventListener",
        "newPlayerStatsHighlight",
        "itemPlayerStats",
        "placed",
        "killTweensOf",
        "movecomplete",
        "cantmove",
        "assets/button_sound_on.png",
        "itemPop",
        "mozRequestFullScreen",
        "nextDir",
        "textBaseline",
        "Stage",
        "assets/background_p.png",
        "#roomWrapper",
        "typeBlock",
        "buttonPlus",
        "NO HAY MOVIMIENTOS POSIBLES",
        "mouseMoveOutside",
        "exception",
        "leftTile",
        "player",
        "exitFullscreen",
        "tiles",
        "innerWidth",
        "cursor",
        "console",
        "tileSelected",
        "logo",
        "left",
        "enable",
        "stageY",
        "twitter",
        "gap",
        "prepared",
        "delay",
        "18px bpreplaybold",
        "310935BdfvRT",
        "state",
        "maxPlayers",
        "#notificationHolder",
        "assets/button_facebook.png",
        "start",
        "easeOut",
        "soundAlert",
        "floor",
        "pressup",
        "buttonExit",
        "fileload",
        "assets/sounds/sound_domino_pick.ogg",
        "progress",
        "update",
        "assets/theme_cover_05.png",
        "alpha",
        "userWin",
        "attr",
        "background",
        "To install the game just upload folder 'game' to your server. The game won't run locally with some browser like Chrome due to some security mode.",
        "itemScoreDivide",
        "optionsFirst",
        "GAME OVER",
        "textAlign",
        "removeClass",
        "lineHeight",
        "tileDealSpeed",
        "updateoptions",
        "setChildIndex",
        "killAll",
        "css",
        "#roomlists",
        "mp3",
        "assets/item_player_stats_highlight.png",
        "buttonNext",
        "[NAME] WIN THE GAME",
        "buttonTwitter",
        ".mobileRotate",
        "28px bpreplaybold",
        "aiThinkSpeed",
        "open",
        "pressmove",
        "playerRoundWin",
        "autoClear",
        "share.php?desc=",
        "getResult",
        "toFixed",
        "seq",
        "name",
        "point",
        "bottom",
        "splice",
        "rotationNum",
        "stats",
        "assets/button_settings.png",
        "soundDomino2",
        "soundResult",
        "YOU WIN THIS ROUND",
        "soundWinner",
        "stop",
        "removeAllEventListeners",
        "timeStamp",
        "resultcomplete",
        "soundShuffleOut",
        "lastThemeIndex",
        "moveY",
        "round",
        "buttonPlay",
        "volume",
        "nextCount",
        "themeNumbers",
        "right",
        "dirxml",
        "profileEnd",
        "sameNumbers",
        "default",
        "itemNumber",
        "localToGlobal",
        "&text=",
        "endX",
        "&title=",
        "width",
        "clone",
        "shadow",
        "indexOf",
        "drop",
        "#fff",
        "buttonCancel",
        "lists",
        "warn",
        "scaleY",
        "moveX",
        "buttonContinue",
        "offset",
        "image",
        "complete",
        "playerIndex",
        "#canvasHolder",
        "pointIndex",
        "#namelists",
        "gameIndex",
        "assets/logo_p.png",
        "assets/item_score_divide.png",
        "playerTotalTiles",
        "themeBgFront",
        "assets/button_sound_off.png",
        "userAgent",
        "font-size",
        "60px bpreplaybold",
        "drawpile",
        "length",
        "assets/logo.png",
        "setStrokeStyle",
        "click",
        "whatsapp",
        "assets/theme_bg_04.png",
        "count",
        "players",
        "loadManifest",
        "25px bpreplaybold",
        "play",
        "assets/button_twitter.png",
        "block",
        "[NUMBER]",
        "itemDrawBg",
        "groupCollapsed",
        "stageX",
        "roundend",
        "undefined",
        "assets/item_score.png",
        "text",
        " (+[NUMBER]PTS)",
        "localPlay",
        "alphabetic",
        "40px bpreplaybold",
        "framerate",
        "#mainLoader span",
        "animate",
        "maxW",
        "#rotateHolder",
        "[NAME] IS PICKING A DOMINO",
        "font",
        "assets/sounds/sound_winner.ogg",
        "naturalWidth",
        "assets/button_play.png",
        "beginFill",
        "themeIndex",
        "itemTileHighlight",
        "backgroundP",
        "#mainLoader",
        "blur",
        "GOAL POINT ([NUMBER]PTS)",
        "assets/button_confirm.png",
        "playerNoMove",
        "themeShadow",
        "buttonFullscreen",
        "beginStroke",
        "tile",
        "tileMoveSpeed",
        "none",
        "playerRoundLose",
        "soundPoint",
        "resultTitle",
        "share.jpg&width=590&height=300",
        "function",
        "tilesIndex",
        "center",
        "#roomWrapper .innerContent",
        "Bitmap",
        "3721388UKPubl",
        "DOMINO!",
        "itemScore",
        "pointer",
        "assets/background.png",
        "totalPlayers",
        "drawRect",
        "playerCantMove",
        "webkitFullscreenElement",
        "resume",
        "assets/button_minus.png",
        "buttonSettings",
        "browser",
        "time",
        "maxH",
        "assets/item_tile_highlight.png",
        "startY",
        "main",
        "msFullscreenElement",
        "spaceX",
        "scoreX",
        "tweenScore",
        "logoP",
        "itemScoreTop",
        "tileW",
        "pow",
        "facebook",
        "resize",
        "buttonConfirm",
        "buttonSoundOn",
        "webkitExitFullscreen",
        "https://www.facebook.com/sharer/sharer.php?u=",
        "highlight",
        "endY",
        "match",
        "test",
        "red",
        "split",
        "item",
        "isLandscape",
        "Text",
        "mousedown",
        "typeDraw",
        "mask",
        "autoMove",
        "off",
        "sort",
        "assets/sounds/music_main.ogg",
        "sin",
        "createElement",
        "dir",
        "mozCancelFullScreen",
        "canvas",
        "SHARE YOUR SCORE:",
        "GOAL [NUMBER]PTS",
        "aiDrawSpeed",
        "removeAllChildren",
        "forPortrait",
        "hide",
        "assets/sounds/sound_alert.ogg",
        "editor",
        "top",
        "suspended",
        "drag",
        "Android",
        "assets/sounds/sound_shuffle_in.ogg",
        "themeHighlight",
        "[SCORE]PTS is mine new highscore on Play Dominoes game! Try it now!",
        "assets/theme_cover_02.png",
        "addChild",
        "LOCKED",
        "regX",
        "assets/theme_cover_04.png",
        ".resizeFont",
        "pos",
        "Shape",
        "buttonLocal",
        "innerHeight",
        "webkitRequestFullscreen",
        "assets/sounds/sound_round.ogg",
        "LoadQueue",
        "front",
        "first",
        "assets/button_start.png",
        "height",
        "buttonArrowRight",
        "PLAYER [NUMBER]",
        "assets/button_music_on.png",
        "playdominoes",
        "scaleX",
        "assets/theme_bg_05.png",
        "ALLOW_KEYBOARD_INPUT",
        "buttonWhatsapp",
        "assets/button_plus.png",
        "[NAME]",
        "playerScoreAdd",
        "drawing",
        "assets/button_exit.png",
        "Touch",
        "https://twitter.com/intent/tweet?url=",
        "tileShadowSpace",
        "scale",
        "OPTIONS",
        "startX",
        "requestFullscreen",
        "draw",
        "&thumb=",
        "status",
        "groupEnd",
        "Are you sure you want\nto quit game?",
        "buttonMinus",
        "scrollTop",
        "userPickDomino",
        "assets/item_number.png",
        "lastIndexOf",
        "assets/theme_highlight_04.png",
        "buttonMusicOn",
        "unknown",
        "room",
        "sound",
        "buttonStart",
        "replace",
        "assets/theme_shadow_02.png",
        "toLowerCase",
        "graphics",
        "#roomWrapper .fontNameError",
        "game",
        "google",
        "2egpxxB",
        "#27C610",
        "paused",
        "SpriteSheet",
        "assets/button_music_off.png",
        "file",
        "35px bpreplaybold",
        "tileIndex",
        "clear",
        "oriY",
        "fadeOut",
        "assets/sounds/sound_click.ogg",
        "animation",
        "tileH",
        "push",
        "hitArea",
        "assert",
        "playerPickDomino",
    ];
    _0x363b = function () {
        return columnIds;
    };
    return _0x363b();
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

      console.log('[IFRAME] 🎯 GAME_INIT recibido:', window.gameData);

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
      // Aquí podrías hacer algo adicional si se requiere, o solo log para verificar envío correcto.
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

    default:
      console.warn('⚠️ Tipo de mensaje no manejado:', type);
      break;
  }
});
