(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

function PriorityQ(comp) {
    if (!comp || comp.length !== 2) {
        throw 'a valid comparator function required';
    }
    this.comp = comp;
    this.items = [];
}

PriorityQ.prototype.push = function (item) {
    for (var i = 0; i < this.items.length; i++) {
        if (this.comp(item, this.items[i])) {
            this.items.splice(i, 0, item);
            return;
        }
    }
    this.items[i] = item;
};

PriorityQ.prototype.pop = function () {
    return this.items.shift();
};

PriorityQ.prototype.peek = function () {
    return this.items[0];
};

PriorityQ.prototype.size = function () {
    return this.items.length;
};

PriorityQ.prototype.clear = function () {
    this.items = [];
};

PriorityQ.prototype.isEmpty = function () {
    return this.items.length === 0;
};

module.exports.PriorityQ = PriorityQ;


},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Accumulator = exports.Accumulator = function () {
    function Accumulator(game, accumulatorKey) {
        _classCallCheck(this, Accumulator);

        this.count = 0;
        this.currTickRate = 0;
        this.game = game;
        this.accumulatorKey = accumulatorKey;
        this.resetAccumulatorTimer();
    }

    _createClass(Accumulator, [{
        key: "canConsumeUnit",
        value: function canConsumeUnit() {
            var consumeCount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

            return this.count >= consumeCount;
        }
    }, {
        key: "consumeUnit",
        value: function consumeUnit() {
            var consumeCount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

            if (this.canConsumeUnit(consumeCount)) {
                this.count = Math.max(0, this.count - consumeCount);
                this.activateAccumlatorTimer();
                this.updateUi();
            }
        }
    }, {
        key: "isAtMaxStorage",
        value: function isAtMaxStorage() {
            return this.count >= this.getMaxStorageSize();
        }
    }, {
        key: "resetAccumulatorTimer",
        value: function resetAccumulatorTimer() {
            clearTimeout(this.accumlatorTimer);
            this.accumlatorTimer = null;
        }
    }, {
        key: "activateAccumlatorTimer",
        value: function activateAccumlatorTimer() {
            var _this = this;

            if (this.accumlatorTimer || !this.isUnlocked() || this.isAtMaxStorage()) {
                return;
            }
            this.resetAccumulatorTimer();
            this.currTickRate = this.getAccumulationTimeInMs();
            this.accumlatorTimer = setInterval(function () {
                _this.count = Math.min(_this.count + 1, _this.getMaxStorageSize());
                _this.updateUi();
                if (_this.isAtMaxStorage()) {
                    _this.resetAccumulatorTimer();
                    return;
                }
                if (_this.currTickRate != _this.getAccumulationTimeInMs()) {
                    _this.resetAccumulatorTimer();
                    _this.activateAccumlatorTimer();
                }
            }, this.getAccumulationTimeInMs());
        }
    }]);

    return Accumulator;
}();

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DestructibleWallPhasingAccumulator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Accumulator2 = require("./Accumulator");

var _UiIdConstants = require("../constants/UiIdConstants");

var _UpgradeConstants = require("../constants/UpgradeConstants");

var _UserInterface = require("../managers/UserInterface");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DestructibleWallPhasingAccumulator = exports.DestructibleWallPhasingAccumulator = function (_Accumulator) {
    _inherits(DestructibleWallPhasingAccumulator, _Accumulator);

    function DestructibleWallPhasingAccumulator(game, accumulatorKey) {
        _classCallCheck(this, DestructibleWallPhasingAccumulator);

        return _possibleConstructorReturn(this, (DestructibleWallPhasingAccumulator.__proto__ || Object.getPrototypeOf(DestructibleWallPhasingAccumulator)).call(this, game, accumulatorKey));
    }

    _createClass(DestructibleWallPhasingAccumulator, [{
        key: "getAccumulationTimeInMs",
        value: function getAccumulationTimeInMs() {
            return this.game.upgrades.getUpgradeValue(_UpgradeConstants.UpgradeKey.DESTRUCTIBLE_WALL_PHASING_FREQUENCY_UPGRADE);
        }
    }, {
        key: "getMaxStorageSize",
        value: function getMaxStorageSize() {
            return this.game.upgrades.getUpgradeValue(_UpgradeConstants.UpgradeKey.DESTRUCTIBLE_WALL_PHASING_TOTAL_UPGRADE);
        }
    }, {
        key: "updateUi",
        value: function updateUi() {
            // Set icon for relevant accumulator
            this.game.ui.setImageIcon(_UiIdConstants.ICON_DESTRUCTIBLE_WALL_PHASING_IMG_UI_ID, _UiIdConstants.ICON_DESTRUCTIBLE_WALL_PHASING_IMG, "22px");
            var isUpgraded = this.game.upgrades.isUpgraded(_UpgradeConstants.UpgradeKey.DESTRUCTIBLE_WALL_PHASING_UPGRADE);
            this.game.ui.setUiIdVisible(_UiIdConstants.ICON_DESTRUCTIBLE_WALL_PHASING_PANEL_UI_ID, isUpgraded, "flex");
            var text = this.count.toString() + " / " + this.getMaxStorageSize();
            _UserInterface.UserInterface.setText(_UiIdConstants.ICON_DESTRUCTIBLE_WALL_PHASING_COUNT_UI_ID, text);
        }
    }, {
        key: "isUnlocked",
        value: function isUnlocked() {
            return this.game.upgrades.isUpgraded(_UpgradeConstants.UpgradeKey.DESTRUCTIBLE_WALL_PHASING_UPGRADE, true);
        }
    }]);

    return DestructibleWallPhasingAccumulator;
}(_Accumulator2.Accumulator);

},{"../constants/UiIdConstants":12,"../constants/UpgradeConstants":13,"../managers/UserInterface":46,"./Accumulator":2}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WallPhasingAccumulator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Accumulator2 = require("./Accumulator");

var _UiIdConstants = require("../constants/UiIdConstants");

var _UpgradeConstants = require("../constants/UpgradeConstants");

var _UserInterface = require("../managers/UserInterface");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WallPhasingAccumulator = exports.WallPhasingAccumulator = function (_Accumulator) {
    _inherits(WallPhasingAccumulator, _Accumulator);

    function WallPhasingAccumulator(game, accumulatorKey) {
        _classCallCheck(this, WallPhasingAccumulator);

        return _possibleConstructorReturn(this, (WallPhasingAccumulator.__proto__ || Object.getPrototypeOf(WallPhasingAccumulator)).call(this, game, accumulatorKey));
    }

    _createClass(WallPhasingAccumulator, [{
        key: "getAccumulationTimeInMs",
        value: function getAccumulationTimeInMs() {
            return this.game.upgrades.getUpgradeValue(_UpgradeConstants.UpgradeKey.PLAYER_WALL_PHASING_FREQUENCY_UPGRADE);
        }
    }, {
        key: "getMaxStorageSize",
        value: function getMaxStorageSize() {
            return this.game.upgrades.getUpgradeValue(_UpgradeConstants.UpgradeKey.PLAYER_WALL_PHASING_TOTAL_UPGRADE);
        }
    }, {
        key: "updateUi",
        value: function updateUi() {
            // Set icon for relevant accumulator
            this.game.ui.setImageIcon(_UiIdConstants.ICON_WALL_PHASING_IMG_UI_ID, _UiIdConstants.ICON_WALL_PHASING_IMG, "22px");
            var isUpgraded = this.game.upgrades.isUpgraded(_UpgradeConstants.UpgradeKey.PLAYER_WALL_PHASING_UPGRADE);
            this.game.ui.setUiIdVisible(_UiIdConstants.ICON_WALL_PHASING_PANEL_UI_ID, isUpgraded, "flex");
            var text = this.count.toString() + " / " + this.getMaxStorageSize();
            _UserInterface.UserInterface.setText(_UiIdConstants.ICON_WALL_PHASING_COUNT_UI_ID, text);
        }
    }, {
        key: "isUnlocked",
        value: function isUnlocked() {
            return this.game.upgrades.isUpgraded(_UpgradeConstants.UpgradeKey.PLAYER_WALL_PHASING_UPGRADE, true);
        }
    }]);

    return WallPhasingAccumulator;
}(_Accumulator2.Accumulator);

},{"../constants/UiIdConstants":12,"../constants/UpgradeConstants":13,"../managers/UserInterface":46,"./Accumulator":2}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var AccumulatorKey = exports.AccumulatorKey = undefined;
(function (AccumulatorKey) {
    AccumulatorKey["WALL_PHASING_KEY"] = "WALL_PHASING_KEY";
    AccumulatorKey["DESCTRUCTIBLE_WALL_PHASING_KEY"] = "DESCTRUCTIBLE_WALL_PHASING_KEY";
})(AccumulatorKey || (exports.AccumulatorKey = AccumulatorKey = {}));

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getBeforeAfterString = exports.getMazeConfigText = exports.getUnlockStringForMap = exports.getNextBiomeUnlockText = exports.BIOME_UPGRADE_UNLOCKS = exports.getBiomeColorPalette = exports.getBiomeUpgradeCost = exports.getFruitItemTierByBiomeKey = exports.getBiomeMazeConfig = exports.DESTRUCTIBLE_WALL_BIOME_UNLOCK = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _ColorConstants = require("./ColorConstants");

var _ItemConstants = require("./ItemConstants");

var _UpgradeConstants = require("./UpgradeConstants");

var _MazeUtils = require("../managers/MazeUtils");

var _UserInterface = require("../managers/UserInterface");

var DESTRUCTIBLE_WALL_BIOME_UNLOCK = exports.DESTRUCTIBLE_WALL_BIOME_UNLOCK = 10;
var getBaseBiomeMazeConfig = function getBaseBiomeMazeConfig(biomeKey) {
    if (biomeKey === 0) {
        return createBiomeConfig(biomeKey, _MazeUtils.MazeGridType.SQUARE, _MazeUtils.MazeAlgorithmType.BACK_TRACKER, 4);
    } else if (biomeKey === 1) {
        return createBiomeConfig(biomeKey, _MazeUtils.MazeGridType.SQUARE, _MazeUtils.MazeAlgorithmType.PRIMS, 5);
    } else if (biomeKey === 2) {
        return createBiomeConfig(biomeKey, _MazeUtils.MazeGridType.SQUARE, _MazeUtils.MazeAlgorithmType.BINARY_TREE, 5);
    } else if (biomeKey === 3) {
        return createBiomeConfig(biomeKey, _MazeUtils.MazeGridType.PLUS_SIGN, _MazeUtils.MazeAlgorithmType.BACK_TRACKER, 7);
    } else if (biomeKey === 4) {
        return createBiomeConfig(biomeKey, _MazeUtils.MazeGridType.PLUS_SIGN, _MazeUtils.MazeAlgorithmType.BACK_TRACKER, 8);
    } else if (biomeKey === 5) {
        return createBiomeConfig(biomeKey, _MazeUtils.MazeGridType.PLUS_SIGN, _MazeUtils.MazeAlgorithmType.PRIMS, 8);
    } else if (biomeKey === 6) {
        return createBiomeConfig(biomeKey, _MazeUtils.MazeGridType.DIAMOND, _MazeUtils.MazeAlgorithmType.BACK_TRACKER, 8);
    } else if (biomeKey === 7) {
        return createBiomeConfig(biomeKey, _MazeUtils.MazeGridType.DIAMOND, _MazeUtils.MazeAlgorithmType.PRIMS, 8);
    } else if (biomeKey === 8) {
        return createBiomeConfig(biomeKey, _MazeUtils.MazeGridType.HONEYCOMB, _MazeUtils.MazeAlgorithmType.BINARY_TREE, null, 0, 1);
    } else if (biomeKey === 9) {
        return createBiomeConfig(biomeKey, _MazeUtils.MazeGridType.HONEYCOMB, _MazeUtils.MazeAlgorithmType.PRIMS, null, 0, 1);
    } else if (biomeKey === 10) {
        return createBiomeConfig(biomeKey, _MazeUtils.MazeGridType.LETTER_H, _MazeUtils.MazeAlgorithmType.PRIMS, null, 1, 2);
    } else if (biomeKey === 11) {
        return createBiomeConfig(biomeKey, _MazeUtils.MazeGridType.LETTER_H, _MazeUtils.MazeAlgorithmType.BACK_TRACKER, null, 1, 2);
    } else if (biomeKey === 12) {
        return createBiomeConfig(biomeKey, _MazeUtils.MazeGridType.STAIRCASE, _MazeUtils.MazeAlgorithmType.BINARY_TREE, 13, 0, 2);
    } else if (biomeKey === 13) {
        return createBiomeConfig(biomeKey, _MazeUtils.MazeGridType.STAIRCASE, _MazeUtils.MazeAlgorithmType.BACK_TRACKER, 14, 0, 2);
    } else if (biomeKey === 14) {
        return createBiomeConfig(biomeKey, _MazeUtils.MazeGridType.STAIRCASE, _MazeUtils.MazeAlgorithmType.PRIMS, 15, 0, 3, 70);
    } else if (biomeKey === 15) {
        return createBiomeConfig(biomeKey, _MazeUtils.MazeGridType.PYRAMID, _MazeUtils.MazeAlgorithmType.BACK_TRACKER, 13, 0, 3);
    } else if (biomeKey === 16) {
        return createBiomeConfig(biomeKey, _MazeUtils.MazeGridType.PYRAMID, _MazeUtils.MazeAlgorithmType.PRIMS, 13, 0, 3, 70);
    } else if (biomeKey === 17) {
        return createBiomeConfig(biomeKey, _MazeUtils.MazeGridType.RECTANGLE, _MazeUtils.MazeAlgorithmType.BACK_TRACKER, 14, 0, 3, 60);
    } else if (biomeKey === 18) {
        return createBiomeConfig(biomeKey, _MazeUtils.MazeGridType.RECTANGLE, _MazeUtils.MazeAlgorithmType.BINARY_TREE, 14, 0, 3, 60);
    } else if (biomeKey === 19) {
        return createBiomeConfig(biomeKey, _MazeUtils.MazeGridType.RECTANGLE, _MazeUtils.MazeAlgorithmType.PRIMS, 15, 0, 4, 60);
    } else if (biomeKey === 20) {
        return createBiomeConfig(biomeKey, _MazeUtils.MazeGridType.ZIGZAG, _MazeUtils.MazeAlgorithmType.BACK_TRACKER, null, 2, 4);
    } else if (biomeKey === 21) {
        return createBiomeConfig(biomeKey, _MazeUtils.MazeGridType.ZIGZAG, _MazeUtils.MazeAlgorithmType.PRIMS, null, 2, 4);
    } else if (biomeKey === 22) {
        return createBiomeConfig(biomeKey, _MazeUtils.MazeGridType.CIRCLE, _MazeUtils.MazeAlgorithmType.PRIMS, 19, 0, 4, 65);
    } else if (biomeKey === 23) {
        return createBiomeConfig(biomeKey, _MazeUtils.MazeGridType.CIRCLE, _MazeUtils.MazeAlgorithmType.BACK_TRACKER, 19, 0, 5, 65);
    } else if (biomeKey === 24) {
        return createBiomeConfig(biomeKey, _MazeUtils.MazeGridType.CIRCLE, _MazeUtils.MazeAlgorithmType.PRIMS, 19, 0, 5, 65);
    } else if (biomeKey === 25) {
        return createBiomeConfig(biomeKey, _MazeUtils.MazeGridType.SQUARE, _MazeUtils.MazeAlgorithmType.BINARY_TREE, 17, 0, 5, 65);
    } else if (biomeKey === 26) {
        return createBiomeConfig(biomeKey, _MazeUtils.MazeGridType.SQUARE, _MazeUtils.MazeAlgorithmType.BACK_TRACKER, 17, 0, 5, 65);
    } else if (biomeKey === 27) {
        return createBiomeConfig(biomeKey, _MazeUtils.MazeGridType.SQUARE, _MazeUtils.MazeAlgorithmType.PRIMS, 18, 0, 5, 65);
    } else if (biomeKey === 28) {
        return createBiomeConfig(biomeKey, _MazeUtils.MazeGridType.DIAMOND, _MazeUtils.MazeAlgorithmType.BACK_TRACKER, 18, 0, 5, 65);
    } else if (biomeKey === 29) {
        return createBiomeConfig(biomeKey, _MazeUtils.MazeGridType.DIAMOND, _MazeUtils.MazeAlgorithmType.PRIMS, 18, 0, 5, 65);
    } else if (biomeKey === 30) {
        return createBiomeConfig(biomeKey, _MazeUtils.MazeGridType.PLUS_SIGN, _MazeUtils.MazeAlgorithmType.BACK_TRACKER, 18, 0, 6, 70);
    } else if (biomeKey === 31) {
        return createBiomeConfig(biomeKey, _MazeUtils.MazeGridType.PLUS_SIGN, _MazeUtils.MazeAlgorithmType.PRIMS, 18, 0, 6, 70);
    } else if (biomeKey === 32) {
        return createBiomeConfig(biomeKey, _MazeUtils.MazeGridType.PYRAMID, _MazeUtils.MazeAlgorithmType.BACK_TRACKER, 19, 0, 6, 70);
    } else if (biomeKey === 33) {
        return createBiomeConfig(biomeKey, _MazeUtils.MazeGridType.PYRAMID, _MazeUtils.MazeAlgorithmType.PRIMS, 19, 0, 6, 70);
    } else if (biomeKey === 34) {
        return createBiomeConfig(biomeKey, _MazeUtils.MazeGridType.STAIRCASE, _MazeUtils.MazeAlgorithmType.PRIMS, 26, 0, 6, 70);
    } else {
        return createBiomeConfig(biomeKey, _MazeUtils.MazeGridType.SQUARE, _MazeUtils.MazeAlgorithmType.PRIMS, 21, 0, 6, 70);
    }
};
var getBiomeMazeConfig = exports.getBiomeMazeConfig = function getBiomeMazeConfig(game, biomeKey) {
    var shouldIncludeExperiments = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    var mazeConfig = getBaseBiomeMazeConfig(biomeKey);
    if (shouldIncludeExperiments) {
        var mazeSize = game.experiment.getMazeGridSizeOverride() != null ? game.experiment.getMazeGridSizeOverride() : mazeConfig.mazeSizeX;
        var mazeTierSize = game.experiment.getMazeGridSizeOverride() != null ? game.experiment.getMazeGridSizeOverride() : mazeConfig.mazeTierSize;
        mazeConfig.mazeGridType = game.experiment.getMazeGridTypeOverride() || mazeConfig.mazeGridType;
        mazeConfig.mazeTierSize = mazeTierSize;
        mazeConfig.mazeSizeX = mazeSize;
        mazeConfig.mazeSizeY = mazeSize;
        mazeConfig.mazeAlgorithmType = game.experiment.getMazeGridAlgorithmOverride() || mazeConfig.mazeAlgorithmType;
    }
    return mazeConfig;
};
var createBiomeConfig = function createBiomeConfig(biomeKey, gridType, algorithm, mazeSize) {
    var mazeTierSize = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var keysRequired = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
    var minTilePercentageVisited = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;

    return {
        mazeGridType: gridType,
        mazeSizeX: mazeSize,
        mazeSizeY: mazeSize,
        mazeAlgorithmType: algorithm,
        mazeTierSize: mazeTierSize,
        mazeCompletionRequirements: {
            minMazeKeysFound: keysRequired,
            minTilePercentageVisited: minTilePercentageVisited / 100
        },
        mazeObstacles: {
            destructibleWallSpawnRate: getDestructibleWallSpawnRate(biomeKey),
            portalSpawnRate: getPortalSpawnRate(biomeKey)
        }
    };
};
var getPortalSpawnRate = function getPortalSpawnRate(biomeKey) {
    var unlockBiomeKey = _ItemConstants.BIOME_ITEM_UNLOCKS.get(_ItemConstants.MazeItemKey.PORTAL);
    if (biomeKey < unlockBiomeKey) return 0;
    var biomeMultiplier = Math.max(0, biomeKey - unlockBiomeKey);
    return _ItemConstants.PORTAL_ITEM_SPAWN_BASE_PROBABILITY + biomeMultiplier * _ItemConstants.PORTAL_ITEM_SPAWN_BASE_INCREASE_PROBABILITY_PER_BIOME;
};
// NOTE: this probability is based on the number of connections -- NOT number of tiles
var getDestructibleWallSpawnRate = function getDestructibleWallSpawnRate(biomeKey) {
    var unlockBiomeKey = _ItemConstants.BIOME_ITEM_UNLOCKS.get(_ItemConstants.MazeItemKey.DESTRUCTIBLE_WALL);
    if (biomeKey < unlockBiomeKey) return 0;
    var biomeMultiplier = Math.max(0, biomeKey - unlockBiomeKey);
    return _ItemConstants.DESTRUCTIBLE_WALL_BASE_SPAWN_RATE + biomeMultiplier * _ItemConstants.DESTRUCTIBLE_WALL_BASE_INCREASE_AMOUNT_PER_BIOME;
};
var getFruitItemTierByBiomeKey = exports.getFruitItemTierByBiomeKey = function getFruitItemTierByBiomeKey(biomeKey) {
    if (biomeKey >= 0 && biomeKey <= 8) {
        return 1;
    } else if (biomeKey >= 9 && biomeKey <= 13) {
        return 2;
    } else if (biomeKey >= 14 && biomeKey <= 18) {
        return 3;
    } else if (biomeKey >= 19 && biomeKey <= 23) {
        return 4;
    } else if (biomeKey >= 24) {
        return 5;
    }
    console.error("Invalid fruit item for biome tier: " + biomeKey);
};
var getBiomeUpgradeCost = exports.getBiomeUpgradeCost = function getBiomeUpgradeCost(biomeKey) {
    if (biomeKey < _UpgradeConstants.BIOME_UPGRADE_COST_ARR.length) {
        return _UpgradeConstants.BIOME_UPGRADE_COST_ARR[biomeKey];
    }
    var lastBiomeUpgradeCost = _UpgradeConstants.BIOME_UPGRADE_COST_ARR[_UpgradeConstants.BIOME_UPGRADE_COST_ARR.length - 1];
    return lastBiomeUpgradeCost * Math.pow(_UpgradeConstants.BIOME_UPGRADE_BASE_MULTPLIER, biomeKey + 1 - _UpgradeConstants.BIOME_UPGRADE_COST_ARR.length);
};
var getBiomeColorPalette = exports.getBiomeColorPalette = function getBiomeColorPalette(biomeKey) {
    if (biomeKey >= 0) {
        return _ColorConstants.BIOME_0_COLOR_PALETTE;
    }
    return _ColorConstants.BIOME_0_COLOR_PALETTE;
};
var BIOME_UPGRADE_UNLOCKS = exports.BIOME_UPGRADE_UNLOCKS = new Map([[_UpgradeConstants.UpgradeKey.BIOME, 0], [_UpgradeConstants.UpgradeKey.POINTS_PER_VISIT, 1], [_UpgradeConstants.UpgradeKey.AUTO_MOVE, 2], [_UpgradeConstants.UpgradeKey.BOT_MOVEMENT_SPEED, 2], [_UpgradeConstants.UpgradeKey.PRIORITIZE_UNVISITED, 3], [_UpgradeConstants.UpgradeKey.AVOID_REVISIT_LAST_POSITION, 3], [_UpgradeConstants.UpgradeKey.MAZE_COMPLETION_BONUS, 4], [_UpgradeConstants.UpgradeKey.PLAYER_MOVE_INDEPENDENTLY, 4], [_UpgradeConstants.UpgradeKey.AUTO_EXIT_MAZE, 5], [_UpgradeConstants.UpgradeKey.TELEPORT_BOT_BACK_TO_PLAYER, 5], [_UpgradeConstants.UpgradeKey.TELEPORT_PLAYER_BACK_TO_BOT, 5], [_UpgradeConstants.UpgradeKey.FRUIT_PICKUP_POINTS, 6], [_UpgradeConstants.UpgradeKey.CLICK_TO_MOVE_UPGRADE, 6], [_UpgradeConstants.UpgradeKey.BOT_REMEMBER_DEADEND_TILES, 6], [_UpgradeConstants.UpgradeKey.CLICK_TO_MOVE_TILE_DISTANCE_UPGRADE, 7], [_UpgradeConstants.UpgradeKey.SPEED_UP_DURATION, 7], [_UpgradeConstants.UpgradeKey.BOT_SPLIT_DIRECTION, 8], [_UpgradeConstants.UpgradeKey.PLAYER_WALL_PHASING_UPGRADE, 8], [_UpgradeConstants.UpgradeKey.CLICK_TO_MOVE_SPEED_MULTIPLIER_UPGRADE, 9], [_UpgradeConstants.UpgradeKey.FRUIT_SPAWN, 9], [_UpgradeConstants.UpgradeKey.PLAYER_WALL_PHASING_FREQUENCY_UPGRADE, 9], [_UpgradeConstants.UpgradeKey.SPEED_UP_SPAWN_RATE, 10], [_UpgradeConstants.UpgradeKey.BOT_REMEMBER_LAST_PATHWAY, 10], [_UpgradeConstants.UpgradeKey.PLAYER_WALL_PHASING_TOTAL_UPGRADE, 11], [_UpgradeConstants.UpgradeKey.TILE_MULTIPLIER_DURATION, 11], [_UpgradeConstants.UpgradeKey.POINTS_PER_REVISIT, 12], [_UpgradeConstants.UpgradeKey.SPEED_UP_MULTIPLIER_STRENGTH, 12], [_UpgradeConstants.UpgradeKey.TILE_MULTIPLIER_SPAWN_RATE, 13], [_UpgradeConstants.UpgradeKey.DEAD_END_ITEM_SPAWN_RATE, 13], [_UpgradeConstants.UpgradeKey.BOT_SPLIT_BOT_AUTO_MERGE, 14], [_UpgradeConstants.UpgradeKey.TOGGLE_PANEL_UPGRADE, 14], [_UpgradeConstants.UpgradeKey.TILE_MULTIPLIER_STRENGTH, 15], [_UpgradeConstants.UpgradeKey.BOT_SMART_MERGE, 15], [_UpgradeConstants.UpgradeKey.BOT_FRUSTRATION_UPGRADE, 16], [_UpgradeConstants.UpgradeKey.DESTRUCTIBLE_WALL_PHASING_UPGRADE, 16], [_UpgradeConstants.UpgradeKey.MAZE_ENTRANCE_SPAWN_CHANCE_UPGRADE, 17], [_UpgradeConstants.UpgradeKey.DESTRUCTIBLE_WALL_PHASING_UPGRADE, 18], [_UpgradeConstants.UpgradeKey.BRAIN_SPAWN, 18], [_UpgradeConstants.UpgradeKey.SPEED_UP_STACKING_UPGRADE, 19], [_UpgradeConstants.UpgradeKey.BOT_LUCKY_GUESS, 19], [_UpgradeConstants.UpgradeKey.TILE_MULTIPLIER_STACKING_UPGRADE, 20], [_UpgradeConstants.UpgradeKey.EXPERIMENTS_PANEL_UPGRADE, 25],
// INACTIVE UPGRADES
[_UpgradeConstants.UpgradeKey.BRAIN_TILE_DISTANCE, 99], [_UpgradeConstants.UpgradeKey.DESTRUCTIBLE_WALL_PHASING_TOTAL_UPGRADE, 99]]);
var getNextBiomeUnlockText = exports.getNextBiomeUnlockText = function getNextBiomeUnlockText(game) {
    var currBiomeKey = game.biomes.getCurrentBiomeKey();
    var nextBiomeKey = game.biomes.getNextBiomeKey();
    var nextUpgradeString = "";
    nextUpgradeString += getUnlockStringForMap(nextBiomeKey, BIOME_UPGRADE_UNLOCKS, "<br><br><b><u>New Upgrades:</b></u>");
    nextUpgradeString += getUnlockStringForMap(nextBiomeKey, _ItemConstants.BIOME_ITEM_UNLOCKS, "<br><br><b><u>New Items:</b></u>");
    if (getFruitItemTierByBiomeKey(currBiomeKey) !== getFruitItemTierByBiomeKey(nextBiomeKey)) {
        nextUpgradeString += "<br><br>New Fruit Type: " + (0, _ItemConstants.getFruitTextByTier)(getFruitItemTierByBiomeKey(nextBiomeKey));
    }
    nextUpgradeString += getMazeConfigText(game, currBiomeKey, nextBiomeKey);
    return nextUpgradeString;
};
var getUnlockStringForMap = exports.getUnlockStringForMap = function getUnlockStringForMap(nextBiomeKey, unlockMap, unlockHeaderString) {
    var nextUnlockString = "";
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = unlockMap.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _slicedToArray(_step.value, 2),
                upgradeKey = _step$value[0],
                biomeNumber = _step$value[1];

            if (biomeNumber === nextBiomeKey) {
                nextUnlockString += "<br>" + upgradeKey;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    if (nextUnlockString != "") {
        nextUnlockString = unlockHeaderString + nextUnlockString;
    }
    return nextUnlockString;
};
var getMazeConfigText = exports.getMazeConfigText = function getMazeConfigText(game, currBiomeKey, nextBiomeKey) {
    var nextBiomeString = "<br><br><u><b>Maze Changes:</b></u>";
    var currMazeConfig = getBiomeMazeConfig(game, currBiomeKey, false);
    var nextMazeConfig = getBiomeMazeConfig(game, nextBiomeKey, false);
    // Maze Details
    nextBiomeString += "<br>" + getBeforeAfterString("Maze Shape", currMazeConfig.mazeGridType, nextMazeConfig.mazeGridType);
    nextBiomeString += "<br>" + getBeforeAfterString("Maze Algorithm", currMazeConfig.mazeAlgorithmType, nextMazeConfig.mazeAlgorithmType);
    nextBiomeString += "<br>Maze Size: " + (currMazeConfig.mazeSizeX === nextMazeConfig.mazeSizeX ? "Same" : "Bigger!");
    // Maze Completion Requirements
    var currCompletionReqs = currMazeConfig.mazeCompletionRequirements;
    var nextCompletionReqs = nextMazeConfig.mazeCompletionRequirements;
    if (nextCompletionReqs.minMazeKeysFound || nextCompletionReqs.minMazeKeysFound) {
        var currKeysRequired = currCompletionReqs.minMazeKeysFound ? currCompletionReqs.minMazeKeysFound.toString() : "0";
        var nextKeysRequired = nextCompletionReqs.minMazeKeysFound ? nextCompletionReqs.minMazeKeysFound.toString() : "0";
        nextBiomeString += "<br>" + getBeforeAfterString("Keys Required", currKeysRequired, nextKeysRequired);
    }
    if (nextCompletionReqs.minTilePercentageVisited || nextCompletionReqs.minTilePercentageVisited) {
        var currTilePercent = currCompletionReqs.minTilePercentageVisited ? (currCompletionReqs.minTilePercentageVisited * 100).toString() : "0";
        var nextTilePercent = nextCompletionReqs.minTilePercentageVisited ? (nextCompletionReqs.minTilePercentageVisited * 100).toString() : "0";
        nextBiomeString += "<br>" + getBeforeAfterString("Tile Visit Requirement", currTilePercent + "%", nextTilePercent + "%");
    }
    // Maze Obstacles
    var currObstacles = currMazeConfig.mazeObstacles;
    var nextObstacles = nextMazeConfig.mazeObstacles;
    if (currObstacles.destructibleWallSpawnRate || nextObstacles.destructibleWallSpawnRate) {
        var currDestructibleWallPercent = currObstacles.destructibleWallSpawnRate ? _UserInterface.UserInterface.getDecimalPrettyPrintNumber(currObstacles.destructibleWallSpawnRate * 100, 1) : "0";
        var nextDestructibleWallPercent = nextObstacles.destructibleWallSpawnRate ? _UserInterface.UserInterface.getDecimalPrettyPrintNumber(nextObstacles.destructibleWallSpawnRate * 100, 1) : "0";
        nextBiomeString += "<br>" + getBeforeAfterString("Destructible Walls", currDestructibleWallPercent + "%", nextDestructibleWallPercent + "%");
    }
    if (currObstacles.portalSpawnRate || nextObstacles.portalSpawnRate) {
        var currPortalPercent = currObstacles.portalSpawnRate ? _UserInterface.UserInterface.getDecimalPrettyPrintNumber(currObstacles.portalSpawnRate * 100, 1) : "0";
        var nextPortalPercent = nextObstacles.portalSpawnRate ? _UserInterface.UserInterface.getDecimalPrettyPrintNumber(nextObstacles.portalSpawnRate * 100, 1) : "0";
        nextBiomeString += "<br>" + getBeforeAfterString("Portals", currPortalPercent + "%", nextPortalPercent + "%");
    }
    return nextBiomeString;
};
var getBeforeAfterString = exports.getBeforeAfterString = function getBeforeAfterString(type, before, after) {
    return before === after ? type + ": " + before : type + ": " + before + " \u2794 " + after;
};

},{"../managers/MazeUtils":36,"../managers/UserInterface":46,"./ColorConstants":7,"./ItemConstants":9,"./UpgradeConstants":13}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BIOME_0_COLOR_PALETTE = exports.BIOME_COLOR_SCHEME_2 = undefined;

var _BiomeColorPalette = require('../models/BiomeColorPalette');

var _BiomeColorPalette2 = _interopRequireDefault(_BiomeColorPalette);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BIOME_COLOR_SCHEME_2 = exports.BIOME_COLOR_SCHEME_2 = {
    PLAYER_COLOR: '#1EC438',
    RNG_BOT_COLOR: '#8FD6E1',
    MAZE_WALL_COLOR: '#1739c2',
    VISITED_TILE_COLOR: 'black',
    DEAD_END_COLOR: '#7B113A',
    UNLIMITED_SPLIT_BOT_PLAYER_COLOR: '#3E9BC7',
    GHOST_ITEM_PLAYER_COLOR: 'white'
};
// purple: #590995
var BIOME_COLOR_SCHEME_1 = {
    PLAYER_COLOR: '#03dac6',
    RNG_BOT_COLOR: '#ea80fc',
    VISITED_TILE_COLOR: '#3700b3',
    MAZE_WALL_COLOR: '#ea80fc',
    DEAD_END_COLOR: '#018786',
    UNLIMITED_SPLIT_BOT_PLAYER_COLOR: '#3E9BC7',
    GHOST_ITEM_PLAYER_COLOR: 'white'
};
var BIOME_0_COLOR_PALETTE = exports.BIOME_0_COLOR_PALETTE = new _BiomeColorPalette2.default(BIOME_COLOR_SCHEME_1.PLAYER_COLOR, BIOME_COLOR_SCHEME_1.RNG_BOT_COLOR,
//TODO: delete this fully.
"#191919", BIOME_COLOR_SCHEME_1.VISITED_TILE_COLOR, BIOME_COLOR_SCHEME_1.MAZE_WALL_COLOR, BIOME_COLOR_SCHEME_1.DEAD_END_COLOR, BIOME_COLOR_SCHEME_1.UNLIMITED_SPLIT_BOT_PLAYER_COLOR, BIOME_COLOR_SCHEME_1.GHOST_ITEM_PLAYER_COLOR);

},{"../models/BiomeColorPalette":60}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getMazeGridSizeSelectorList = exports.getExperimentMazeGridAlgorithmList = exports.getExperimentMazeGridTypesList = exports.getExperimentKeyUiId = exports.getToggleKeyPanelId = exports.ExperimentKey = exports.SELECTOR_BIOME_DEFAULT = undefined;

var _UiIdConstants = require('./UiIdConstants');

var _MazeUtils = require('../managers/MazeUtils');

var SELECTOR_BIOME_DEFAULT = exports.SELECTOR_BIOME_DEFAULT = "BIOME_DEFAULT";
var MIN_MAZE_GRID_SIZE = 5;
var MAX_MAZE_GRID_SIZE = 50;
var MIN_MAZE_GRID_TIER = 0;
var MAX_MAZE_GRID_TIER = 5;
var ExperimentKey = exports.ExperimentKey = undefined;
(function (ExperimentKey) {
    ExperimentKey["FREE_MODE"] = "FREE_MODE";
    ExperimentKey["MAZE_GRID_TYPE"] = "MAZE_TYPE";
    ExperimentKey["SELL_MODE"] = "SELL_MODE";
    ExperimentKey["SHOW_PURCHASED_UPGRADES"] = "SHOW_PURCHASED_UPGRADES";
    ExperimentKey["UNLOCK_ALL_UPGRADES"] = "UNLOCK_ALL_UPGRADES";
    ExperimentKey["UNLOCK_ALL_ITEMS"] = "UNLOCK_ALL_ITEMS";
})(ExperimentKey || (exports.ExperimentKey = ExperimentKey = {}));
var EXPERIMENT_KEY_TO_UI_ID_MAP = new Map([[ExperimentKey.FREE_MODE, _UiIdConstants.EXPERIMENT_FREE_MODE_CHECKBOX_UI_ID], [ExperimentKey.SELL_MODE, _UiIdConstants.EXPERIMENT_SELL_MODE_CHECKBOX_UI_ID], [ExperimentKey.UNLOCK_ALL_UPGRADES, _UiIdConstants.EXPERIMENT_UNLOCK_ALL_UPGRADES_CHECKBOX_UI_ID], [ExperimentKey.UNLOCK_ALL_ITEMS, _UiIdConstants.EXPERIMENT_UNLOCK_ALL_ITEMS_CHECKBOX_UI_ID], [ExperimentKey.SHOW_PURCHASED_UPGRADES, _UiIdConstants.EXPERIMENT_SHOW_PURCHASED_UPGRADES_CHECKBOX_UI_ID], [ExperimentKey.MAZE_GRID_TYPE, _UiIdConstants.EXPERIMENT_MAZE_GRID_TYPE_SELECTOR_UI_ID]]);
var getToggleKeyPanelId = exports.getToggleKeyPanelId = function getToggleKeyPanelId(experimentKey) {
    return EXPERIMENT_KEY_TO_UI_ID_MAP.get(experimentKey) + _UiIdConstants.EXPERIMENT_PANEL_SUFFIX;
};
var getExperimentKeyUiId = exports.getExperimentKeyUiId = function getExperimentKeyUiId(experimentKey) {
    return EXPERIMENT_KEY_TO_UI_ID_MAP.get(experimentKey);
};
var getExperimentMazeGridTypesList = exports.getExperimentMazeGridTypesList = function getExperimentMazeGridTypesList() {
    var mazeTypeList = [];
    for (var mazeGridType in _MazeUtils.MazeGridType) {
        mazeTypeList.push(mazeGridType);
    }
    mazeTypeList.sort();
    mazeTypeList.unshift(SELECTOR_BIOME_DEFAULT);
    return mazeTypeList;
};
var getExperimentMazeGridAlgorithmList = exports.getExperimentMazeGridAlgorithmList = function getExperimentMazeGridAlgorithmList() {
    var algorithmTypeList = [];
    for (var algorithmType in _MazeUtils.MazeAlgorithmType) {
        algorithmTypeList.push(algorithmType);
    }
    algorithmTypeList.sort();
    algorithmTypeList.unshift(SELECTOR_BIOME_DEFAULT);
    return algorithmTypeList;
};
var getMazeGridSizeSelectorList = exports.getMazeGridSizeSelectorList = function getMazeGridSizeSelectorList(mazeGridType) {
    var isTieredSize = _MazeUtils.MAZE_GRID_TIERED_TYPES.has(mazeGridType);
    var minSize = isTieredSize ? MIN_MAZE_GRID_TIER : MIN_MAZE_GRID_SIZE;
    var maxSize = isTieredSize ? MAX_MAZE_GRID_TIER : MAX_MAZE_GRID_SIZE;
    var selectorOptions = [SELECTOR_BIOME_DEFAULT];
    for (var i = minSize; i <= maxSize; i++) {
        selectorOptions.push(i.toString());
    }
    return selectorOptions;
};

},{"../managers/MazeUtils":36,"./UiIdConstants":12}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DESTRUCTIBLE_WALL_BASE_INCREASE_AMOUNT_PER_BIOME = exports.DESTRUCTIBLE_WALL_BASE_SPAWN_RATE = exports.SPEED_UP_MAZE_ITEM_BASE_STRENGTH_INCREASE = exports.SPEED_UP_MAZE_ITEM_BASE_STRENGTH = exports.SPEED_UP_MAZE_ITEM_BASE_DURATION_INCREASE = exports.SPEED_UP_MAZE_ITEM_BASE_DURATION = exports.SPEED_UP_MAZE_ITEM_SPAWN_BASE_INCREASE_AMOUNT = exports.SPEED_UP_MAZE_ITEM_SPAWN_BASE_PROBABILITY = exports.TILE_MULTIPLIER_MAZE_ITEM_BASE_STRENGTH_MULTIPLIER = exports.TILE_MULTIPLIER_MAZE_ITEM_BASE_STRENGTH = exports.TILE_MULTIPLIER_MAZE_ITEM_BASE_DURATION_INCREASE = exports.TILE_MULTIPLIER_MAZE_ITEM_BASE_DURATION = exports.TILE_MULTIPLIER_MAZE_ITEM_SPAWN_BASE_INCREASE_PROBABILITY = exports.TILE_MULTIPLIER_MAZE_ITEM_SPAWN_BASE_PROBABILITY = exports.KEY_ITEM_FIXED_SPAWN_RATE = exports.DEAD_END_ITEM_SPAWN_BASE_INCREASE_PROBABILITY = exports.DEAD_END_ITEM_SPAWN_BASE_PROBABILITY = exports.GHOST_ITEM_STARTING_TILE_DISTANCE = exports.GHOST_ITEM_SPAWN_PROBABILITY = exports.UNLIMITED_SPLITS_PROBABILITY = exports.PORTAL_ITEM_SPAWN_BASE_INCREASE_PROBABILITY_PER_BIOME = exports.PORTAL_ITEM_SPAWN_BASE_PROBABILITY = exports.BRAIN_STARTING_TILE_DISTANCE = exports.BRAIN_SPAWN_UPGRADE_FLAT_INCREASE_PROBABILITY = exports.BRAIN_SPAWN_BASE_PROBABILITY = exports.FRUIT_SPAWN_BASE_PROBABILITY = exports.FRUIT_SPAWN_UPGRADE_FLAT_INCREASE_PROBABILITY = exports.CHERRY_IMAGE_URL = exports.GRAPES_IMAGE_URL = exports.ORANGE_IMAGE_URL = exports.APPLE_IMAGE_URL = exports.BANANA_IMAGE_URL = exports.getFruitTextByTier = exports.getFruitBackgroundByTier = exports.getMazeItemBackgroundImageByMazeItemKey = exports.getMazeItemIconPanelTooltipUiId = exports.getMazeItemIconPanelUiId = exports.BIOME_ITEM_UNLOCKS = exports.MAZE_ITEM_KEY_TO_BACKGROUND_IMAGE = exports.MAZE_ITEM_KEY_TO_ICON_PANEL_UI_ID = exports.MAZE_ITEM_KEY_TOOLTIP_SUFFIX = exports.MAZE_ITEM_UNLIMITED_SPLIT_BACKGROUND_IMAGE_PATH = exports.MAZE_ITEM_SPEED_UP_IMAGE_PATH = exports.MAZE_ITEM_TILE_MULTIPLIER_IMAGE_PATH = exports.MAZE_ITEM_GHOST_BACKGROUND_IMAGE_PATH = exports.MAZE_ITEM_DESTRUCTIBLE_WALL_BACKGROUND_IMAGE_PATH = exports.MAZE_ITEM_DEAD_END_BACKGROUND_IMAGE_PATH = exports.MAZE_ITEM_PORTAL_BACKGROUND_IMAGE_PATH = exports.MAZE_ITEM_BRAIN_BACKGROUND_IMAGE_PATH = exports.MAZE_ITEM_KEY_BACKGROUND_IMAGE_PATH = exports.MazeItemKey = exports.MAZE_ITEM_ICON_SIZE_IN_PX = undefined;

var _UiIdConstants = require("./UiIdConstants");

var _BiomeConstants = require("./BiomeConstants");

var MAZE_ITEM_ICON_SIZE_IN_PX = exports.MAZE_ITEM_ICON_SIZE_IN_PX = "20px";
var MazeItemKey = exports.MazeItemKey = undefined;
(function (MazeItemKey) {
    MazeItemKey["PORTAL"] = "PORTAL";
    MazeItemKey["BRAIN"] = "BRAIN";
    MazeItemKey["DEAD_END"] = "DEAD_END";
    MazeItemKey["FRUIT"] = "FRUIT";
    MazeItemKey["GHOST"] = "GHOST";
    MazeItemKey["KEY"] = "KEY";
    MazeItemKey["SPEED_UP"] = "SPEED_UP";
    MazeItemKey["TILE_MULTIPLIER"] = "TILE_MULTIPLIER";
    MazeItemKey["UNLIMITED_SPLITS"] = "UNLIMITED_SPLITS";
    MazeItemKey["DESTRUCTIBLE_WALL"] = "DESTRUCTIBLE_WALL";
})(MazeItemKey || (exports.MazeItemKey = MazeItemKey = {}));
;
var MAZE_ITEM_KEY_BACKGROUND_IMAGE_PATH = exports.MAZE_ITEM_KEY_BACKGROUND_IMAGE_PATH = 'img/key.png';
var MAZE_ITEM_BRAIN_BACKGROUND_IMAGE_PATH = exports.MAZE_ITEM_BRAIN_BACKGROUND_IMAGE_PATH = 'img/brain.png';
var MAZE_ITEM_PORTAL_BACKGROUND_IMAGE_PATH = exports.MAZE_ITEM_PORTAL_BACKGROUND_IMAGE_PATH = 'img/portal.png';
var MAZE_ITEM_DEAD_END_BACKGROUND_IMAGE_PATH = exports.MAZE_ITEM_DEAD_END_BACKGROUND_IMAGE_PATH = 'img/deadEnd.png';
var MAZE_ITEM_DESTRUCTIBLE_WALL_BACKGROUND_IMAGE_PATH = exports.MAZE_ITEM_DESTRUCTIBLE_WALL_BACKGROUND_IMAGE_PATH = 'img/destructibleWall.png';
var MAZE_ITEM_GHOST_BACKGROUND_IMAGE_PATH = exports.MAZE_ITEM_GHOST_BACKGROUND_IMAGE_PATH = 'img/ghost.png';
var MAZE_ITEM_TILE_MULTIPLIER_IMAGE_PATH = exports.MAZE_ITEM_TILE_MULTIPLIER_IMAGE_PATH = 'img/multiplierItem.png';
var MAZE_ITEM_SPEED_UP_IMAGE_PATH = exports.MAZE_ITEM_SPEED_UP_IMAGE_PATH = 'img/speedUp.png';
var MAZE_ITEM_UNLIMITED_SPLIT_BACKGROUND_IMAGE_PATH = exports.MAZE_ITEM_UNLIMITED_SPLIT_BACKGROUND_IMAGE_PATH = 'img/unlimitedSplits.png';
var MAZE_ITEM_KEY_TOOLTIP_SUFFIX = exports.MAZE_ITEM_KEY_TOOLTIP_SUFFIX = "Tooltip";
var MAZE_ITEM_KEY_TO_ICON_PANEL_UI_ID = exports.MAZE_ITEM_KEY_TO_ICON_PANEL_UI_ID = new Map([[MazeItemKey.PORTAL, _UiIdConstants.ITEM_ICON_PORTAL_IMG_UI_ID], [MazeItemKey.BRAIN, _UiIdConstants.ITEM_ICON_BRAIN_IMG_UI_ID], [MazeItemKey.DEAD_END, _UiIdConstants.ITEM_ICON_DEAD_END_IMG_UI_ID], [MazeItemKey.DESTRUCTIBLE_WALL, _UiIdConstants.ITEM_ICON_DESTRUCTIBLE_WALL_IMG_UI_ID], [MazeItemKey.FRUIT, _UiIdConstants.ITEM_ICON_FRUIT_IMG_UI_ID], [MazeItemKey.GHOST, _UiIdConstants.ITEM_ICON_GHOST_IMG_UI_ID], [MazeItemKey.KEY, _UiIdConstants.ITEM_ICON_KEY_IMG_UI_ID], [MazeItemKey.SPEED_UP, _UiIdConstants.ITEM_ICON_SPEED_UP_IMG_UI_ID], [MazeItemKey.TILE_MULTIPLIER, _UiIdConstants.ITEM_ICON_TILE_MULTIPLIER_IMG_UI_ID], [MazeItemKey.UNLIMITED_SPLITS, _UiIdConstants.ITEM_ICON_UNLIMITED_SPLITS_IMG_UI_ID]]);
var MAZE_ITEM_KEY_TO_BACKGROUND_IMAGE = exports.MAZE_ITEM_KEY_TO_BACKGROUND_IMAGE = new Map([[MazeItemKey.PORTAL, MAZE_ITEM_PORTAL_BACKGROUND_IMAGE_PATH], [MazeItemKey.BRAIN, MAZE_ITEM_BRAIN_BACKGROUND_IMAGE_PATH], [MazeItemKey.DEAD_END, MAZE_ITEM_DEAD_END_BACKGROUND_IMAGE_PATH],
// Destructible walls have no icon
[MazeItemKey.DESTRUCTIBLE_WALL, MAZE_ITEM_DESTRUCTIBLE_WALL_BACKGROUND_IMAGE_PATH],
// This is dynamic based on the biome
[MazeItemKey.FRUIT, ""], [MazeItemKey.GHOST, MAZE_ITEM_GHOST_BACKGROUND_IMAGE_PATH], [MazeItemKey.KEY, MAZE_ITEM_KEY_BACKGROUND_IMAGE_PATH], [MazeItemKey.SPEED_UP, MAZE_ITEM_SPEED_UP_IMAGE_PATH], [MazeItemKey.TILE_MULTIPLIER, MAZE_ITEM_TILE_MULTIPLIER_IMAGE_PATH], [MazeItemKey.UNLIMITED_SPLITS, MAZE_ITEM_UNLIMITED_SPLIT_BACKGROUND_IMAGE_PATH]]);
var BIOME_ITEM_UNLOCKS = exports.BIOME_ITEM_UNLOCKS = new Map([[MazeItemKey.FRUIT, 1], [MazeItemKey.SPEED_UP, 6], [MazeItemKey.TILE_MULTIPLIER, 11], [MazeItemKey.DEAD_END, 13], [MazeItemKey.DESTRUCTIBLE_WALL, 14], [MazeItemKey.BRAIN, 15], [MazeItemKey.PORTAL, 17], [MazeItemKey.GHOST, 19], [MazeItemKey.UNLIMITED_SPLITS, 99]]);
var getMazeItemIconPanelUiId = exports.getMazeItemIconPanelUiId = function getMazeItemIconPanelUiId(mazeItemKey) {
    return MAZE_ITEM_KEY_TO_ICON_PANEL_UI_ID.get(mazeItemKey);
};
var getMazeItemIconPanelTooltipUiId = exports.getMazeItemIconPanelTooltipUiId = function getMazeItemIconPanelTooltipUiId(mazeItemKey) {
    return getMazeItemIconPanelUiId(mazeItemKey) + MAZE_ITEM_KEY_TOOLTIP_SUFFIX;
};
var getMazeItemBackgroundImageByMazeItemKey = exports.getMazeItemBackgroundImageByMazeItemKey = function getMazeItemBackgroundImageByMazeItemKey(mazeItemKey, game) {
    if (mazeItemKey === MazeItemKey.FRUIT) {
        var fruitTier = (0, _BiomeConstants.getFruitItemTierByBiomeKey)(game.biomes.getCurrentBiomeKey());
        return getFruitBackgroundByTier(fruitTier);
    }
    return MAZE_ITEM_KEY_TO_BACKGROUND_IMAGE.get(mazeItemKey);
};
var getFruitBackgroundByTier = exports.getFruitBackgroundByTier = function getFruitBackgroundByTier(tier) {
    if (tier === 1) {
        return BANANA_IMAGE_URL;
    } else if (tier === 2) {
        return APPLE_IMAGE_URL;
    } else if (tier === 3) {
        return ORANGE_IMAGE_URL;
    } else if (tier === 4) {
        return GRAPES_IMAGE_URL;
    } else {
        return CHERRY_IMAGE_URL;
    }
};
var getFruitTextByTier = exports.getFruitTextByTier = function getFruitTextByTier(tier) {
    if (tier === 1) {
        return "Banana";
    } else if (tier === 2) {
        return "Apple";
    } else if (tier === 3) {
        return "Orange";
    } else if (tier === 4) {
        return "Grapes";
    } else {
        return "Cherry";
    }
};
var BANANA_IMAGE_URL = exports.BANANA_IMAGE_URL = 'img/banana2.png';
var APPLE_IMAGE_URL = exports.APPLE_IMAGE_URL = 'img/apple.png';
var ORANGE_IMAGE_URL = exports.ORANGE_IMAGE_URL = 'img/orange.png';
var GRAPES_IMAGE_URL = exports.GRAPES_IMAGE_URL = 'img/grapes.png';
var CHERRY_IMAGE_URL = exports.CHERRY_IMAGE_URL = 'img/cherry.png';
var FRUIT_SPAWN_UPGRADE_FLAT_INCREASE_PROBABILITY = exports.FRUIT_SPAWN_UPGRADE_FLAT_INCREASE_PROBABILITY = 0.00025;
var FRUIT_SPAWN_BASE_PROBABILITY = exports.FRUIT_SPAWN_BASE_PROBABILITY = 0.005;
var BRAIN_SPAWN_BASE_PROBABILITY = exports.BRAIN_SPAWN_BASE_PROBABILITY = 0.001;
var BRAIN_SPAWN_UPGRADE_FLAT_INCREASE_PROBABILITY = exports.BRAIN_SPAWN_UPGRADE_FLAT_INCREASE_PROBABILITY = 0.00025;
var BRAIN_STARTING_TILE_DISTANCE = exports.BRAIN_STARTING_TILE_DISTANCE = 20;
var PORTAL_ITEM_SPAWN_BASE_PROBABILITY = exports.PORTAL_ITEM_SPAWN_BASE_PROBABILITY = 0.003;
var PORTAL_ITEM_SPAWN_BASE_INCREASE_PROBABILITY_PER_BIOME = exports.PORTAL_ITEM_SPAWN_BASE_INCREASE_PROBABILITY_PER_BIOME = 0.001;
var UNLIMITED_SPLITS_PROBABILITY = exports.UNLIMITED_SPLITS_PROBABILITY = 0.0015;
var GHOST_ITEM_SPAWN_PROBABILITY = exports.GHOST_ITEM_SPAWN_PROBABILITY = 0.0015;
var GHOST_ITEM_STARTING_TILE_DISTANCE = exports.GHOST_ITEM_STARTING_TILE_DISTANCE = 20;
var DEAD_END_ITEM_SPAWN_BASE_PROBABILITY = exports.DEAD_END_ITEM_SPAWN_BASE_PROBABILITY = 0.0007;
var DEAD_END_ITEM_SPAWN_BASE_INCREASE_PROBABILITY = exports.DEAD_END_ITEM_SPAWN_BASE_INCREASE_PROBABILITY = 0.0001;
var KEY_ITEM_FIXED_SPAWN_RATE = exports.KEY_ITEM_FIXED_SPAWN_RATE = 0;
// Tile multiplier
var TILE_MULTIPLIER_MAZE_ITEM_SPAWN_BASE_PROBABILITY = exports.TILE_MULTIPLIER_MAZE_ITEM_SPAWN_BASE_PROBABILITY = 0.002;
var TILE_MULTIPLIER_MAZE_ITEM_SPAWN_BASE_INCREASE_PROBABILITY = exports.TILE_MULTIPLIER_MAZE_ITEM_SPAWN_BASE_INCREASE_PROBABILITY = 0.0005;
var TILE_MULTIPLIER_MAZE_ITEM_BASE_DURATION = exports.TILE_MULTIPLIER_MAZE_ITEM_BASE_DURATION = 15000;
var TILE_MULTIPLIER_MAZE_ITEM_BASE_DURATION_INCREASE = exports.TILE_MULTIPLIER_MAZE_ITEM_BASE_DURATION_INCREASE = 1000;
var TILE_MULTIPLIER_MAZE_ITEM_BASE_STRENGTH = exports.TILE_MULTIPLIER_MAZE_ITEM_BASE_STRENGTH = 2.0;
var TILE_MULTIPLIER_MAZE_ITEM_BASE_STRENGTH_MULTIPLIER = exports.TILE_MULTIPLIER_MAZE_ITEM_BASE_STRENGTH_MULTIPLIER = 0.1;
// Speed up
var SPEED_UP_MAZE_ITEM_SPAWN_BASE_PROBABILITY = exports.SPEED_UP_MAZE_ITEM_SPAWN_BASE_PROBABILITY = 0.0015;
var SPEED_UP_MAZE_ITEM_SPAWN_BASE_INCREASE_AMOUNT = exports.SPEED_UP_MAZE_ITEM_SPAWN_BASE_INCREASE_AMOUNT = 0.0005;
var SPEED_UP_MAZE_ITEM_BASE_DURATION = exports.SPEED_UP_MAZE_ITEM_BASE_DURATION = 10000;
var SPEED_UP_MAZE_ITEM_BASE_DURATION_INCREASE = exports.SPEED_UP_MAZE_ITEM_BASE_DURATION_INCREASE = 1000;
var SPEED_UP_MAZE_ITEM_BASE_STRENGTH = exports.SPEED_UP_MAZE_ITEM_BASE_STRENGTH = 1.3;
var SPEED_UP_MAZE_ITEM_BASE_STRENGTH_INCREASE = exports.SPEED_UP_MAZE_ITEM_BASE_STRENGTH_INCREASE = 0.1;
// Destructible Walls
var DESTRUCTIBLE_WALL_BASE_SPAWN_RATE = exports.DESTRUCTIBLE_WALL_BASE_SPAWN_RATE = 0.005;
var DESTRUCTIBLE_WALL_BASE_INCREASE_AMOUNT_PER_BIOME = exports.DESTRUCTIBLE_WALL_BASE_INCREASE_AMOUNT_PER_BIOME = 0.0025;

},{"./BiomeConstants":6,"./UiIdConstants":12}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var PowerUpKey = exports.PowerUpKey = undefined;
(function (PowerUpKey) {
    PowerUpKey["TILE_MULTIPLIER"] = "TILE_MULTIPLIER";
    PowerUpKey["SPEED_UP"] = "SPEED_UP";
})(PowerUpKey || (exports.PowerUpKey = PowerUpKey = {}));
var POWER_UP_TO_UI_KEY_MAP = exports.POWER_UP_TO_UI_KEY_MAP = new Map([[PowerUpKey.TILE_MULTIPLIER, 'iconTileMultiplierTimer'], [PowerUpKey.SPEED_UP, 'iconSpeedUpTimer']]);

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getUpgradeKeyToToggleKeyMapping = exports.getToggleKeyUiId = exports.getExperimentKeyPanelId = exports.ToggleKey = undefined;

var _UpgradeConstants = require('./UpgradeConstants');

var _UiIdConstants = require('./UiIdConstants');

var ToggleKey = exports.ToggleKey = undefined;
(function (ToggleKey) {
    ToggleKey["AUTO_MOVE"] = "AUTO_MOVE";
    ToggleKey["BOT_SPLITTING"] = "BOT_SPLITTING";
    ToggleKey["BOT_MERGE"] = "BOT_MERGE";
    ToggleKey["BOT_SMART_MERGE"] = "BOT_SMART_MERGE";
    ToggleKey["BOT_MARK_DEADENDS"] = "BOT_MARK_DEADENDS";
    ToggleKey["BOT_FRUSTRATION"] = "BOT_FRUSTRATION";
    ToggleKey["BOT_DESTRUCTIBLE_WALL_PHASING"] = "BOT_DESTRUCTIBLE_WALL_PHASING";
    ToggleKey["EXTRA_MAZE_ENTRANCE"] = "EXTRA_MAZE_ENTRANCE";
    ToggleKey["PLAYER_WALL_PHASING"] = "MANUAL_WALL_PHASING";
})(ToggleKey || (exports.ToggleKey = ToggleKey = {}));
var UPGRADE_KEY_TO_TOGGLE_KEY_MAP = new Map([[_UpgradeConstants.UpgradeKey.AUTO_MOVE, ToggleKey.AUTO_MOVE], [_UpgradeConstants.UpgradeKey.BOT_FRUSTRATION_UPGRADE, ToggleKey.BOT_FRUSTRATION], [_UpgradeConstants.UpgradeKey.BOT_REMEMBER_DEADEND_TILES, ToggleKey.BOT_MARK_DEADENDS], [_UpgradeConstants.UpgradeKey.BOT_SMART_MERGE, ToggleKey.BOT_SMART_MERGE], [_UpgradeConstants.UpgradeKey.BOT_SPLIT_BOT_AUTO_MERGE, ToggleKey.BOT_MERGE], [_UpgradeConstants.UpgradeKey.BOT_SPLIT_DIRECTION, ToggleKey.BOT_SPLITTING], [_UpgradeConstants.UpgradeKey.DESTRUCTIBLE_WALL_PHASING_UPGRADE, ToggleKey.BOT_DESTRUCTIBLE_WALL_PHASING], [_UpgradeConstants.UpgradeKey.MAZE_ENTRANCE_SPAWN_CHANCE_UPGRADE, ToggleKey.EXTRA_MAZE_ENTRANCE], [_UpgradeConstants.UpgradeKey.PLAYER_WALL_PHASING_UPGRADE, ToggleKey.PLAYER_WALL_PHASING]]);
var TOGGLE_KEY_TO_UI_ID_MAP = new Map([[ToggleKey.AUTO_MOVE, _UiIdConstants.TOGGLE_AUTO_MOVE_UI_ID], [ToggleKey.BOT_MERGE, _UiIdConstants.TOGGLE_MERGING_UI_ID], [ToggleKey.BOT_SPLITTING, _UiIdConstants.TOGGLE_SPLITS_UI_ID], [ToggleKey.BOT_DESTRUCTIBLE_WALL_PHASING, _UiIdConstants.TOGGLE_DESTRUCTIBLE_WALL_PHASING_UI_ID], [ToggleKey.BOT_FRUSTRATION, _UiIdConstants.TOGGLE_BOT_FRUSTRATION_UI_ID], [ToggleKey.BOT_MARK_DEADENDS, _UiIdConstants.TOGGLE_MARK_DEADENDS_UI_ID], [ToggleKey.BOT_SMART_MERGE, _UiIdConstants.TOGGLE_BOT_SMART_MERGE_UI_ID], [ToggleKey.EXTRA_MAZE_ENTRANCE, _UiIdConstants.TOGGLE_EXTRA_MAZE_ENTRANCE_UI_ID], [ToggleKey.PLAYER_WALL_PHASING, _UiIdConstants.TOGGLE_PLAYER_WALL_PHASING_UI_ID]]);
var getExperimentKeyPanelId = exports.getExperimentKeyPanelId = function getExperimentKeyPanelId(toggleKey) {
    return TOGGLE_KEY_TO_UI_ID_MAP.get(toggleKey) + _UiIdConstants.TOGGLES_PANEL_SUFFIX;
};
var getToggleKeyUiId = exports.getToggleKeyUiId = function getToggleKeyUiId(toggleKey) {
    return TOGGLE_KEY_TO_UI_ID_MAP.get(toggleKey);
};
var getUpgradeKeyToToggleKeyMapping = exports.getUpgradeKeyToToggleKeyMapping = function getUpgradeKeyToToggleKeyMapping(upgradeKey) {
    return UPGRADE_KEY_TO_TOGGLE_KEY_MAP.get(upgradeKey);
};

},{"./UiIdConstants":12,"./UpgradeConstants":13}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var STATS_TRIPOMETER_CHECKBOX_ID = exports.STATS_TRIPOMETER_CHECKBOX_ID = "statsTripometerDisplayCheckbox";
// MODALS
var CHANGE_LOG_BUTTON_ID = exports.CHANGE_LOG_BUTTON_ID = "changeLogButton";
var CHANGE_LOG_MODAL_ID = exports.CHANGE_LOG_MODAL_ID = "changeLogModal";
var CHANGE_LOG_MODAL_TEXT_ID = exports.CHANGE_LOG_MODAL_TEXT_ID = "changeLogText";
var CHANGE_LOG_MODAL_VERSION_ID = exports.CHANGE_LOG_MODAL_VERSION_ID = "changeLogCurrentVersion";
var CONFIRM_NEW_GAME_MODAL_ID = exports.CONFIRM_NEW_GAME_MODAL_ID = "newGameConfirmationModal";
var CONFIRM_NEW_GAME_MODAL_BUTTON_YES = exports.CONFIRM_NEW_GAME_MODAL_BUTTON_YES = "confirmNewGameButton";
var CONFIRM_NEW_GAME_MODAL_BUTTON_NO = exports.CONFIRM_NEW_GAME_MODAL_BUTTON_NO = "cancelNewGameButton";
var SETTINGS_MODAL_ID = exports.SETTINGS_MODAL_ID = "settingsModal";
var STATS_MODAL_ID = exports.STATS_MODAL_ID = "statsModal";
var HELP_MODAL_ID = exports.HELP_MODAL_ID = "helpModal";
var IMPORT_SAVE_MODAL_ID = exports.IMPORT_SAVE_MODAL_ID = "importSaveModal";
var CONTROLS_MODAL_ID = exports.CONTROLS_MODAL_ID = "controlsModal";
var SAVE_GAME_BUTTON_ID = exports.SAVE_GAME_BUTTON_ID = "manualSaveGameButton";
var SAVE_TOAST_MODAL_ID = exports.SAVE_TOAST_MODAL_ID = "saveToastModal";
var SAVE_VERSION_WARNING_MODAL_ID = exports.SAVE_VERSION_WARNING_MODAL_ID = "saveVersionWarningModal";
// TOGGLES PANEL
var TOGGLES_PANEL_SUFFIX = exports.TOGGLES_PANEL_SUFFIX = "Panel";
var TOGGLES_ROOT_PANEL = exports.TOGGLES_ROOT_PANEL = "togglesPanel";
var TOGGLE_AUTO_MOVE_UI_ID = exports.TOGGLE_AUTO_MOVE_UI_ID = "toggleAutoMoveCheckbox";
var TOGGLE_MERGING_UI_ID = exports.TOGGLE_MERGING_UI_ID = "toggleMergingCheckbox";
var TOGGLE_SPLITS_UI_ID = exports.TOGGLE_SPLITS_UI_ID = "toggleSplitsCheckbox";
var TOGGLE_MARK_DEADENDS_UI_ID = exports.TOGGLE_MARK_DEADENDS_UI_ID = "toggleMarkDeadendsCheckbox";
var TOGGLE_EXTRA_MAZE_ENTRANCE_UI_ID = exports.TOGGLE_EXTRA_MAZE_ENTRANCE_UI_ID = "toggleExtraMazeEntranceCheckbox";
var TOGGLE_DESTRUCTIBLE_WALL_PHASING_UI_ID = exports.TOGGLE_DESTRUCTIBLE_WALL_PHASING_UI_ID = "toggleDestructibleWallPhasingCheckbox";
var TOGGLE_BOT_FRUSTRATION_UI_ID = exports.TOGGLE_BOT_FRUSTRATION_UI_ID = "toggleBotFrustrationCheckbox";
var TOGGLE_BOT_SMART_MERGE_UI_ID = exports.TOGGLE_BOT_SMART_MERGE_UI_ID = "toggleSmartMergeCheckbox";
var TOGGLE_PLAYER_WALL_PHASING_UI_ID = exports.TOGGLE_PLAYER_WALL_PHASING_UI_ID = "togglePlayerWallPhasingCheckbox";
// EXPERIMENTS PANEL
var EXPERIMENT_ROOT_PANEL = exports.EXPERIMENT_ROOT_PANEL = "experimentsPanel";
var EXPERIMENT_PANEL_SUFFIX = exports.EXPERIMENT_PANEL_SUFFIX = "Panel";
var EXPERIMENT_NEW_MAZE_BUTTON_UI_ID = exports.EXPERIMENT_NEW_MAZE_BUTTON_UI_ID = "experimentNewMaze";
var EXPERIMENT_FREE_MODE_CHECKBOX_UI_ID = exports.EXPERIMENT_FREE_MODE_CHECKBOX_UI_ID = "experimentFreeModeCheckbox";
var EXPERIMENT_SELL_MODE_CHECKBOX_UI_ID = exports.EXPERIMENT_SELL_MODE_CHECKBOX_UI_ID = "experimentSellModeCheckbox";
var EXPERIMENT_UNLOCK_ALL_UPGRADES_CHECKBOX_UI_ID = exports.EXPERIMENT_UNLOCK_ALL_UPGRADES_CHECKBOX_UI_ID = "experimentUnlockAllUpgradesCheckbox";
var EXPERIMENT_UNLOCK_ALL_ITEMS_CHECKBOX_UI_ID = exports.EXPERIMENT_UNLOCK_ALL_ITEMS_CHECKBOX_UI_ID = "experimentUnlockAllItemsCheckbox";
var EXPERIMENT_SHOW_PURCHASED_UPGRADES_CHECKBOX_UI_ID = exports.EXPERIMENT_SHOW_PURCHASED_UPGRADES_CHECKBOX_UI_ID = "experimentShowPurchasedUpgradesCheckbox";
var EXPERIMENT_MAZE_GRID_TYPE_SELECTOR_UI_ID = exports.EXPERIMENT_MAZE_GRID_TYPE_SELECTOR_UI_ID = "experimentMazeGridTypeSelector";
var EXPERIMENT_MAZE_GRID_SIZE_SELECTOR_UI_ID = exports.EXPERIMENT_MAZE_GRID_SIZE_SELECTOR_UI_ID = "experimentMazeGridSizeSelector";
var EXPERIMENT_MAZE_GRID_ALGORITHM_SELECTOR_UI_ID = exports.EXPERIMENT_MAZE_GRID_ALGORITHM_SELECTOR_UI_ID = "experimentMazeGridAlgorithmSelector";
var EXPERIMENT_TILE_COUNT_UI_ID = exports.EXPERIMENT_TILE_COUNT_UI_ID = "experimentTileCount";
// MAZE REQUIREMENTS PANEL
var MAZE_COMPLETION_REQUIREMENTS_PANEL_UI_ID = exports.MAZE_COMPLETION_REQUIREMENTS_PANEL_UI_ID = "mazeCompletionRequirementsPanel";
var MAZE_COMPLETION_REQUIREMENTS_TILES_VISITED_PANEL_UI_ID = exports.MAZE_COMPLETION_REQUIREMENTS_TILES_VISITED_PANEL_UI_ID = "mazeCompletionRequirementsTilesVisitedPanel";
var MAZE_COMPLETION_REQUIREMENTS_TILES_VISITED_COUNT_UI_ID = exports.MAZE_COMPLETION_REQUIREMENTS_TILES_VISITED_COUNT_UI_ID = "mazeCompletionRequirementsTilesVisitedCount";
var MAZE_COMPLETION_REQUIREMENTS_TILES_VISITED_CHECKMARK_UI_ID = exports.MAZE_COMPLETION_REQUIREMENTS_TILES_VISITED_CHECKMARK_UI_ID = "mazeCompletionRequirementsTilesVisitedCheckMark";
var MAZE_COMPLETION_REQUIREMENTS_TILES_VISITED_X_UI_ID = exports.MAZE_COMPLETION_REQUIREMENTS_TILES_VISITED_X_UI_ID = "mazeCompletionRequirementsTilesVisitedXMark";
var MAZE_COMPLETION_REQUIREMENTS_MAZE_KEYS_PANEL_UI_ID = exports.MAZE_COMPLETION_REQUIREMENTS_MAZE_KEYS_PANEL_UI_ID = "mazeCompletionRequirementsMazeKeysPanel";
var MAZE_COMPLETION_REQUIREMENTS_MAZE_KEYS_COUNT_UI_ID = exports.MAZE_COMPLETION_REQUIREMENTS_MAZE_KEYS_COUNT_UI_ID = "mazeCompletionRequirementsMazeKeysCount";
var MAZE_COMPLETION_REQUIREMENTS_MAZE_KEYS_CHECKMARK_UI_ID = exports.MAZE_COMPLETION_REQUIREMENTS_MAZE_KEYS_CHECKMARK_UI_ID = "mazeCompletionRequirementsMazeKeysCheckMark";
var MAZE_COMPLETION_REQUIREMENTS_MAZE_KEYS_X_UI_ID = exports.MAZE_COMPLETION_REQUIREMENTS_MAZE_KEYS_X_UI_ID = "mazeCompletionRequirementsMazeKeysXMark";
// ICONS PANEL
var ICON_WALL_PHASING_IMG = exports.ICON_WALL_PHASING_IMG = "img/wallPhasing.png";
var ICON_WALL_PHASING_PANEL_UI_ID = exports.ICON_WALL_PHASING_PANEL_UI_ID = "wallPhasingPanel";
var ICON_WALL_PHASING_IMG_UI_ID = exports.ICON_WALL_PHASING_IMG_UI_ID = "wallPhasingIcon";
var ICON_WALL_PHASING_IMG_TOOLTIP_UI_ID = exports.ICON_WALL_PHASING_IMG_TOOLTIP_UI_ID = "wallPhasingIconTooltip";
var ICON_WALL_PHASING_COUNT_UI_ID = exports.ICON_WALL_PHASING_COUNT_UI_ID = "wallPhasingCount";
var ICON_DESTRUCTIBLE_WALL_PHASING_PANEL_UI_ID = exports.ICON_DESTRUCTIBLE_WALL_PHASING_PANEL_UI_ID = "destructibleWallPhasingPanel";
var ICON_DESTRUCTIBLE_WALL_PHASING_IMG = exports.ICON_DESTRUCTIBLE_WALL_PHASING_IMG = "img/destructibleWallPhasing.png";
var ICON_DESTRUCTIBLE_WALL_PHASING_IMG_UI_ID = exports.ICON_DESTRUCTIBLE_WALL_PHASING_IMG_UI_ID = "destructibleWallPhasingIcon";
var ICON_DESTRUCTIBLE_WALL_PHASING_IMG_TOOLTIP_UI_ID = exports.ICON_DESTRUCTIBLE_WALL_PHASING_IMG_TOOLTIP_UI_ID = "destructibleWallPhasingIconTooltip";
var ICON_DESTRUCTIBLE_WALL_PHASING_COUNT_UI_ID = exports.ICON_DESTRUCTIBLE_WALL_PHASING_COUNT_UI_ID = "destructibleWallPhasingCount";
var ITEM_ICON_CLASS_NAME = exports.ITEM_ICON_CLASS_NAME = "iconImg";
var ITEM_ICON_PORTAL_IMG_UI_ID = exports.ITEM_ICON_PORTAL_IMG_UI_ID = "iconBlackHoleImg";
var ITEM_ICON_BRAIN_IMG_UI_ID = exports.ITEM_ICON_BRAIN_IMG_UI_ID = "iconBrainImg";
var ITEM_ICON_DEAD_END_IMG_UI_ID = exports.ITEM_ICON_DEAD_END_IMG_UI_ID = "iconDeadEndImg";
var ITEM_ICON_DESTRUCTIBLE_WALL_IMG_UI_ID = exports.ITEM_ICON_DESTRUCTIBLE_WALL_IMG_UI_ID = "iconDestructibleWallImg";
var ITEM_ICON_FRUIT_IMG_UI_ID = exports.ITEM_ICON_FRUIT_IMG_UI_ID = "iconFruitImg";
var ITEM_ICON_GHOST_IMG_UI_ID = exports.ITEM_ICON_GHOST_IMG_UI_ID = "iconGhostImg";
var ITEM_ICON_KEY_IMG_UI_ID = exports.ITEM_ICON_KEY_IMG_UI_ID = "iconKeyImg";
var ITEM_ICON_SPEED_UP_IMG_UI_ID = exports.ITEM_ICON_SPEED_UP_IMG_UI_ID = "iconSpeedUpImg";
var ITEM_ICON_TILE_MULTIPLIER_IMG_UI_ID = exports.ITEM_ICON_TILE_MULTIPLIER_IMG_UI_ID = "iconTileMultiplierImg";
var ITEM_ICON_UNLIMITED_SPLITS_IMG_UI_ID = exports.ITEM_ICON_UNLIMITED_SPLITS_IMG_UI_ID = "iconUnlimitedSplitsImg";
// HEADER
var POINTS_UI_ID = exports.POINTS_UI_ID = "points";
// UPGRADES
var UPGRADES_SECTION_PANEL_PREFIX = exports.UPGRADES_SECTION_PANEL_PREFIX = "upgradeSection";
// ARROW KEY BUTTONS
var ARROW_KEYS_ROOT_PANEL = exports.ARROW_KEYS_ROOT_PANEL = "arrowKeysPanel";
var ARROW_KEY_UP_BUTTON_UI_ID = exports.ARROW_KEY_UP_BUTTON_UI_ID = "arrowKeyUpButton";
var ARROW_KEY_LEFT_BUTTON_UI_ID = exports.ARROW_KEY_LEFT_BUTTON_UI_ID = "arrowKeyLeftButton";
var ARROW_KEY_DOWN_BUTTON_UI_ID = exports.ARROW_KEY_DOWN_BUTTON_UI_ID = "arrowKeyDownButton";
var ARROW_KEY_RIGHT_BUTTON_UI_ID = exports.ARROW_KEY_RIGHT_BUTTON_UI_ID = "arrowKeyRightButton";

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var UpgradeKey = exports.UpgradeKey = undefined;
(function (UpgradeKey) {
    // Bot
    UpgradeKey["AUTO_MOVE"] = "AUTO_MOVE";
    UpgradeKey["PRIORITIZE_UNVISITED"] = "PRIORITIZE_UNVISITED";
    UpgradeKey["AVOID_REVISIT_LAST_POSITION"] = "AVOID_REVISIT_LAST_POSITION";
    UpgradeKey["AUTO_EXIT_MAZE"] = "AUTO_EXIT_MAZE";
    UpgradeKey["BOT_SPLIT_DIRECTION"] = "BOT_SPLIT_DIRECTION";
    UpgradeKey["BOT_SPLIT_BOT_AUTO_MERGE"] = "BOT_SPLIT_BOT_AUTO_MERGE";
    UpgradeKey["BOT_SMART_MERGE"] = "BOT_SMART_MERGE";
    UpgradeKey["BOT_MOVEMENT_SPEED"] = "BOT_MOVEMENT_SPEED";
    UpgradeKey["BOT_REMEMBER_DEADEND_TILES"] = "BOT_REMEMBER_DEADEND_TILES";
    UpgradeKey["BOT_FRUSTRATION_UPGRADE"] = "BOT_FRUSTRATION_UPGRADE";
    UpgradeKey["BOT_LUCKY_GUESS"] = "BOT_LUCKY_GUESS";
    UpgradeKey["BOT_REMEMBER_LAST_PATHWAY"] = "BOT_REMEMBER_LAST_PATHWAY";
    // Maze
    UpgradeKey["POINTS_PER_VISIT"] = "POINTS_PER_VISIT";
    UpgradeKey["POINTS_PER_REVISIT"] = "POINTS_PER_REVISIT";
    UpgradeKey["MAZE_COMPLETION_BONUS"] = "MAZE_COMPLETION_BONUS";
    UpgradeKey["TOGGLE_PANEL_UPGRADE"] = "TOGGLE_PANEL_UPGRADE";
    UpgradeKey["MAZE_ENTRANCE_SPAWN_CHANCE_UPGRADE"] = "MAZE_ENTRANCE_SPAWN_CHANCE_UPGRADE";
    UpgradeKey["DESTRUCTIBLE_WALL_PHASING_UPGRADE"] = "DESTRUCTIBLE_WALL_PHASING_UPGRADE";
    UpgradeKey["DESTRUCTIBLE_WALL_PHASING_TOTAL_UPGRADE"] = "DESTRUCTIBLE_WALL_PHASING_TOTAL_UPGRADE";
    UpgradeKey["DESTRUCTIBLE_WALL_PHASING_FREQUENCY_UPGRADE"] = "DESTRUCTIBLE_WALL_PHASING_FREQUENCY_UPGRADE";
    UpgradeKey["EXPERIMENTS_PANEL_UPGRADE"] = "EXPERIMENTS_PANEL_UPGRADE";
    // Items
    UpgradeKey["FRUIT_SPAWN"] = "FRUIT_SPAWN";
    UpgradeKey["BRAIN_SPAWN"] = "BRAIN_SPAWN";
    UpgradeKey["BRAIN_TILE_DISTANCE"] = "BRAIN_TILE_DISTANCE";
    UpgradeKey["FRUIT_PICKUP_POINTS"] = "FRUIT_PICKUP_POINTS";
    UpgradeKey["DEAD_END_ITEM_SPAWN_RATE"] = "DEAD_END_ITEM_SPAWN_RATE";
    // Power Ups
    UpgradeKey["SPEED_UP_DURATION"] = "SPEED_UP_DURATION";
    UpgradeKey["SPEED_UP_MULTIPLIER_STRENGTH"] = "SPEED_UP_MULTIPLIER_STRENGTH";
    UpgradeKey["SPEED_UP_SPAWN_RATE"] = "SPEED_UP_SPAWN_RATE";
    UpgradeKey["SPEED_UP_STACKING_UPGRADE"] = "SPEED_UP_STACKING_UPGRADE";
    UpgradeKey["TILE_MULTIPLIER_DURATION"] = "TILE_MULTIPLIER_DURATION";
    UpgradeKey["TILE_MULTIPLIER_SPAWN_RATE"] = "TILE_MULTIPLIER_SPAWN_RATE";
    UpgradeKey["TILE_MULTIPLIER_STRENGTH"] = "TILE_MULTIPLIER_STRENGTH";
    UpgradeKey["TILE_MULTIPLIER_STACKING_UPGRADE"] = "TILE_MULTIPLIER_STACKING_UPGRADE";
    // Player Movement
    UpgradeKey["PLAYER_MOVE_INDEPENDENTLY"] = "PLAYER_MOVE_INDEPENDENTLY";
    UpgradeKey["TELEPORT_BOT_BACK_TO_PLAYER"] = "TELEPORT_BOT_BACK_TO_PLAYER";
    UpgradeKey["TELEPORT_PLAYER_BACK_TO_BOT"] = "TELEPORT_PLAYER_BACK_TO_BOT";
    UpgradeKey["PLAYER_WALL_PHASING_UPGRADE"] = "PLAYER_WALL_PHASING_UPGRADE";
    UpgradeKey["PLAYER_WALL_PHASING_FREQUENCY_UPGRADE"] = "PLAYER_WALL_PHASING_FREQUENCY_UPGRADE";
    UpgradeKey["PLAYER_WALL_PHASING_TOTAL_UPGRADE"] = "PLAYER_WALL_PHASING_TOTAL_UPGRADE";
    UpgradeKey["CLICK_TO_MOVE_UPGRADE"] = "CLICK_TO_MOVE_UPGRADE";
    UpgradeKey["CLICK_TO_MOVE_TILE_DISTANCE_UPGRADE"] = "CLICK_TO_MOVE_TILE_DISTANCE_UPGRADE";
    UpgradeKey["CLICK_TO_MOVE_SPEED_MULTIPLIER_UPGRADE"] = "CLICK_TO_MOVE_SPEED_MULTIPLIER_UPGRADE";
    // Biomes
    UpgradeKey["BIOME"] = "BIOME";
})(UpgradeKey || (exports.UpgradeKey = UpgradeKey = {}));
var UpgradeType = exports.UpgradeType = undefined;
(function (UpgradeType) {
    UpgradeType["BOT"] = "BOT";
    UpgradeType["ITEM"] = "ITEM";
    UpgradeType["MAZE"] = "MAZE";
    UpgradeType["MOVEMENT"] = "MOVEMENT";
    UpgradeType["OTHER"] = "OTHER";
})(UpgradeType || (exports.UpgradeType = UpgradeType = {}));
// Bot
var BOT_AUTO_MOVE_UPGRADE_COST = exports.BOT_AUTO_MOVE_UPGRADE_COST = 100;
var PRIORITIZE_UNVISITED_UPGRADE_COST = exports.PRIORITIZE_UNVISITED_UPGRADE_COST = 300;
var AVOID_REVISIT_LAST_POSITION_UPGRADE_COST = exports.AVOID_REVISIT_LAST_POSITION_UPGRADE_COST = 500;
var AUTO_EXIT_MAZE_UPGRADE_BASE_COST = exports.AUTO_EXIT_MAZE_UPGRADE_BASE_COST = 250;
var AUTO_EXIT_MAZE_UPGRADE_BASE_COST_MULTIPLIER = exports.AUTO_EXIT_MAZE_UPGRADE_BASE_COST_MULTIPLIER = 4;
var SPLIT_DIRECTION_UPGRADE_BASE_COST = exports.SPLIT_DIRECTION_UPGRADE_BASE_COST = 8000;
var SPLIT_DIRECTION_UPGRADE_BASE_MULTIPLIER = exports.SPLIT_DIRECTION_UPGRADE_BASE_MULTIPLIER = 3.25;
var SPLIT_BOT_AUTO_MERGE_UPGRADE_COST = exports.SPLIT_BOT_AUTO_MERGE_UPGRADE_COST = 50000;
var BOT_SMART_MERGE_UPGRADE_COST = exports.BOT_SMART_MERGE_UPGRADE_COST = 50000;
var BOT_MOVEMENT_UPGRADE_BASE_COST = exports.BOT_MOVEMENT_UPGRADE_BASE_COST = 10;
var BOT_MOVEMENT_UPGRADE_BASE_COST_MUTLIPLIER = exports.BOT_MOVEMENT_UPGRADE_BASE_COST_MUTLIPLIER = 1.1;
var BOT_REMEMBER_DEADEND_TILES_UPGRADE_BASE_COST = exports.BOT_REMEMBER_DEADEND_TILES_UPGRADE_BASE_COST = 5000;
var BOT_REMEMBER_DEADEND_TILES_UPGRADE_BASE_COST_MULTIPLIER = exports.BOT_REMEMBER_DEADEND_TILES_UPGRADE_BASE_COST_MULTIPLIER = 3;
// Bot: Frustration
var BOT_FRUSTRATION_TILE_COUNT_UPGRADE_BASE_COST = exports.BOT_FRUSTRATION_TILE_COUNT_UPGRADE_BASE_COST = 50000;
var BOT_FRUSTRATION_TILE_COUNT_UPGRADE_BASE_COST_MULTIPLIER = exports.BOT_FRUSTRATION_TILE_COUNT_UPGRADE_BASE_COST_MULTIPLIER = 1.25;
var BOT_FRUSTRATION_TILE_COUNT_UPGRADE_BASE_AMOUNT = exports.BOT_FRUSTRATION_TILE_COUNT_UPGRADE_BASE_AMOUNT = 20;
var BOT_FRUSTRATION_TILE_COUNT_UPGRADE_DECREASE_INCREMENT = exports.BOT_FRUSTRATION_TILE_COUNT_UPGRADE_DECREASE_INCREMENT = 1;
var BOT_FRUSTRATION_SPEED_MULTIPLIER = exports.BOT_FRUSTRATION_SPEED_MULTIPLIER = 0.75;
var BOT_LUCKY_GUESS_UPGRADE_BASE_COST = exports.BOT_LUCKY_GUESS_UPGRADE_BASE_COST = 25000;
var BOT_LUCKY_GUESS_UPGRADE_BASE_COST_MULTIPLIER = exports.BOT_LUCKY_GUESS_UPGRADE_BASE_COST_MULTIPLIER = 1.7;
var BOT_LUCKY_GUESS_UPGRADE_INCREASE_AMOUNT = exports.BOT_LUCKY_GUESS_UPGRADE_INCREASE_AMOUNT = 0.01;
var BOT_REMEMBER_LAST_PATHWAY_UPGRADE_BASE_COST = exports.BOT_REMEMBER_LAST_PATHWAY_UPGRADE_BASE_COST = 20000;
// Maze: Completion Bonus
var MAZE_COMPLETION_BONUS_BASE_MULTIPLIER = exports.MAZE_COMPLETION_BONUS_BASE_MULTIPLIER = 1.08;
var MAZE_COMPLETION_BONUS_UPGRADE_BASE_COST = exports.MAZE_COMPLETION_BONUS_UPGRADE_BASE_COST = 150;
var MAZE_COMPLETION_BONUS_UPGRADE_BASE_COST_MULTIPLIER = exports.MAZE_COMPLETION_BONUS_UPGRADE_BASE_COST_MULTIPLIER = 1.25;
var MAZE_COMPLETION_BONUS_REVISIT_MULTIPLIER = exports.MAZE_COMPLETION_BONUS_REVISIT_MULTIPLIER = 1.00;
var MAZE_COMPLETION_BONUS_PER_KEY_MULTIPLIER = exports.MAZE_COMPLETION_BONUS_PER_KEY_MULTIPLIER = 1.00;
// Maze: Points Per Visit
var POINTS_PER_VISIT_BASE_AMOUNT = exports.POINTS_PER_VISIT_BASE_AMOUNT = 1;
var POINTS_PER_VISIT_BASE_INCREASE_PER_BIOME = exports.POINTS_PER_VISIT_BASE_INCREASE_PER_BIOME = .25;
var POINTS_PER_VISIT_BASE_AMOUNT_MULTIPLIER = exports.POINTS_PER_VISIT_BASE_AMOUNT_MULTIPLIER = 1.05;
var POINTS_PER_VISIT_UPGRADE_BASE_COST = exports.POINTS_PER_VISIT_UPGRADE_BASE_COST = 10;
var POINTS_PER_VISIT_UPGRADE_BASE_COST_MULTIPLIER = exports.POINTS_PER_VISIT_UPGRADE_BASE_COST_MULTIPLIER = 1.3;
// Maze: Points Per Revisit
var POINTS_PER_REVISIT_UPGRADE_BASE_COST = exports.POINTS_PER_REVISIT_UPGRADE_BASE_COST = 7500;
var POINTS_PER_REVISIT_UPGRADE_BASE_COST_MULTIPLIER = exports.POINTS_PER_REVISIT_UPGRADE_BASE_COST_MULTIPLIER = 1.15;
var TILE_REVISIT_BASE_MULTIPLIER = exports.TILE_REVISIT_BASE_MULTIPLIER = 0;
var TILE_REVISIT_BASE_MULTIPLIER_INCREASE_PERCENT = exports.TILE_REVISIT_BASE_MULTIPLIER_INCREASE_PERCENT = 0.0075;
// Maze: Destructible Wall Upgrades
var DESTRUCTIBLE_WALL_PHASING_UPGRADE_BASE_COST = exports.DESTRUCTIBLE_WALL_PHASING_UPGRADE_BASE_COST = 150000;
var DESTRUCTIBLE_WALL_PHASING_UPGRADE_BASE_STORAGE = exports.DESTRUCTIBLE_WALL_PHASING_UPGRADE_BASE_STORAGE = 5;
var DESTRUCTIBLE_WALL_PHASING_TOTAL_UPGRADE_BASE_COST = exports.DESTRUCTIBLE_WALL_PHASING_TOTAL_UPGRADE_BASE_COST = 200000;
var DESTRUCTIBLE_WALL_PHASING_TOTAL_UPGRADE_BASE_COST_MULTIPLIER = exports.DESTRUCTIBLE_WALL_PHASING_TOTAL_UPGRADE_BASE_COST_MULTIPLIER = 1.5;
var DESTRUCTIBLE_WALL_PHASING_TOTAL_UPGRADE_INCREASE_AMOUNT = exports.DESTRUCTIBLE_WALL_PHASING_TOTAL_UPGRADE_INCREASE_AMOUNT = 2;
var DESTRUCTIBLE_WALL_PHASING_FREQUENCY_UPGRADE_BASE_COST = exports.DESTRUCTIBLE_WALL_PHASING_FREQUENCY_UPGRADE_BASE_COST = 200000;
var DESTRUCTIBLE_WALL_PHASING_FREQUENCY_UPGRADE_BASE_COST_MULTIPLIER = exports.DESTRUCTIBLE_WALL_PHASING_FREQUENCY_UPGRADE_BASE_COST_MULTIPLIER = 1.5;
var DESTRUCTIBLE_WALL_PHASING_FREQUENCY_BASE_RATE = exports.DESTRUCTIBLE_WALL_PHASING_FREQUENCY_BASE_RATE = 10000;
var DESTRUCTIBLE_WALL_PHASING_FREQUENCY_UPGRADE_DECREASE_AMOUNT = exports.DESTRUCTIBLE_WALL_PHASING_FREQUENCY_UPGRADE_DECREASE_AMOUNT = 1000;
// Maze: Toggle Panel
var TOGGLE_PANEL_UPGRADE_BASE_COST = exports.TOGGLE_PANEL_UPGRADE_BASE_COST = 25000;
// Maze: Maze Entrace
var MAZE_ENTRANCE_SPAWN_CHANCE_UPGRADE_BASE_COST = exports.MAZE_ENTRANCE_SPAWN_CHANCE_UPGRADE_BASE_COST = 25000;
var MAZE_ENTRANCE_SPAWN_CHANCE_UPGRADE_BASE_COST_MULTIPLIER = exports.MAZE_ENTRANCE_SPAWN_CHANCE_UPGRADE_BASE_COST_MULTIPLIER = 1.5;
var MAZE_ENTRANCE_SPAWN_CHANCE_UPGRADE_INCREASE_PERCENT = exports.MAZE_ENTRANCE_SPAWN_CHANCE_UPGRADE_INCREASE_PERCENT = 0.05;
// Items: Fruit
var FRUIT_SPAWN_UPGRADE_BASE_COST = exports.FRUIT_SPAWN_UPGRADE_BASE_COST = 10000;
var FRUIT_SPAWN_UPGRADE_BASE_COST_MULTIPLIER = exports.FRUIT_SPAWN_UPGRADE_BASE_COST_MULTIPLIER = 1.35;
var FRUIT_PICKUP_POINTS_UPGRADE_BASE_COST = exports.FRUIT_PICKUP_POINTS_UPGRADE_BASE_COST = 100;
var FRUIT_PICKUP_POINTS_UPGRADE_BASE_COST_MULTIPLIER = exports.FRUIT_PICKUP_POINTS_UPGRADE_BASE_COST_MULTIPLIER = 1.35;
// Items: Brain
var BRAIN_SPAWN_RATE_UPGRADE_BASE_COST = exports.BRAIN_SPAWN_RATE_UPGRADE_BASE_COST = 100000;
var BRAIN_SPAWN_RATE_UPGRADE_BASE_COST_MULTIPLIER = exports.BRAIN_SPAWN_RATE_UPGRADE_BASE_COST_MULTIPLIER = 1.5;
var BRAIN_TILE_DISTANCE_UPGRADE_BASE_COST = exports.BRAIN_TILE_DISTANCE_UPGRADE_BASE_COST = 10000;
var BRAIN_TILE_DISTANCE_UPGRADE_BASE_COST_MULTIPLIER = exports.BRAIN_TILE_DISTANCE_UPGRADE_BASE_COST_MULTIPLIER = 1.5;
var BRAIN_TILE_DISTANCE_UPGRADE_INCREASE_AMOUNT = exports.BRAIN_TILE_DISTANCE_UPGRADE_INCREASE_AMOUNT = 5;
// Items: Dead end
var DEAD_END_ITEM_SPAWN_RATE_UPGRADE_BASE_COST = exports.DEAD_END_ITEM_SPAWN_RATE_UPGRADE_BASE_COST = 50000;
var DEAD_END_ITEM_SPAWN_RATE_UPGRADE_BASE_COST_MULTIPLIER = exports.DEAD_END_ITEM_SPAWN_RATE_UPGRADE_BASE_COST_MULTIPLIER = 1.55;
// Items: Tile Multiplier
var TILE_MULTIPLIER_MAZE_ITEM_STRENGTH_BASE_COST = exports.TILE_MULTIPLIER_MAZE_ITEM_STRENGTH_BASE_COST = 40000;
var TILE_MULTIPLIER_MAZE_ITEM_STRENGTH_BASE_COST_MULTIPLIER = exports.TILE_MULTIPLIER_MAZE_ITEM_STRENGTH_BASE_COST_MULTIPLIER = 1.5;
var TILE_MULTIPLIER_MAZE_ITEM_SPAWN_RATE_BASE_COST = exports.TILE_MULTIPLIER_MAZE_ITEM_SPAWN_RATE_BASE_COST = 20000;
var TILE_MULTIPLIER_MAZE_ITEM_SPAWN_RATE_COST_MULTIPLIER = exports.TILE_MULTIPLIER_MAZE_ITEM_SPAWN_RATE_COST_MULTIPLIER = 1.5;
var TILE_MULTIPLIER_MAZE_ITEM_DURATION_BASE_COST = exports.TILE_MULTIPLIER_MAZE_ITEM_DURATION_BASE_COST = 20000;
var TILE_MULTIPLIER_MAZE_ITEM_DURATION_COST_MULTIPLIER = exports.TILE_MULTIPLIER_MAZE_ITEM_DURATION_COST_MULTIPLIER = 1.5;
var TILE_MULTIPLIER_STACKING_UPGRADE_BASE_COST = exports.TILE_MULTIPLIER_STACKING_UPGRADE_BASE_COST = 350000;
// Items: Speed Up
var SPEED_UP_MAZE_ITEM_DURATION_UPGRADE_BASE_COST = exports.SPEED_UP_MAZE_ITEM_DURATION_UPGRADE_BASE_COST = 4000;
var SPEED_UP_MAZE_ITEM_DURATION_UPGRADE_BASE_COST_MULTIPLIER = exports.SPEED_UP_MAZE_ITEM_DURATION_UPGRADE_BASE_COST_MULTIPLIER = 1.75;
var SPEED_UP_MULTIPLIER_STRENGTH_UPGRADE_BASE_COST = exports.SPEED_UP_MULTIPLIER_STRENGTH_UPGRADE_BASE_COST = 15000;
var SPEED_UP_MULTIPLIER_STRENGTH_UPGRADE_BASE_COST_MULTIPLIER = exports.SPEED_UP_MULTIPLIER_STRENGTH_UPGRADE_BASE_COST_MULTIPLIER = 1.5;
var SPEED_UP_SPAWN_RATE_UPGRADE_BASE_COST = exports.SPEED_UP_SPAWN_RATE_UPGRADE_BASE_COST = 15000;
var SPEED_UP_SPAWN_RATE_UPGRADE_BASE_COST_MULTIPLIER = exports.SPEED_UP_SPAWN_RATE_UPGRADE_BASE_COST_MULTIPLIER = 1.5;
var SPEED_UP_STACKING_UPGRADE_BASE_COST = exports.SPEED_UP_STACKING_UPGRADE_BASE_COST = 250000;
// Movement
var ALLOW_PLAYER_TO_MOVE_INDEPENDENTLY_UPGRADE_COST = exports.ALLOW_PLAYER_TO_MOVE_INDEPENDENTLY_UPGRADE_COST = 500;
var TELEPORT_PLAYER_BACK_TO_BOT_UPGRADE_COST = exports.TELEPORT_PLAYER_BACK_TO_BOT_UPGRADE_COST = 750;
var TELEPORT_BOT_BACK_TO_PLAYER_UPGRADE_COST = exports.TELEPORT_BOT_BACK_TO_PLAYER_UPGRADE_COST = 750;
var PLAYER_WALL_PHASING_UPGRADE_COST = exports.PLAYER_WALL_PHASING_UPGRADE_COST = 5000;
// Movement: Wall Phasing
var PLAYER_WALL_PHASING_UPGRADE_FREQUENCY_BASE_COST = exports.PLAYER_WALL_PHASING_UPGRADE_FREQUENCY_BASE_COST = 5000;
var PLAYER_WALL_PHASING_UPGRADE_FREQUENCY_COST_MULTIPLIER = exports.PLAYER_WALL_PHASING_UPGRADE_FREQUENCY_COST_MULTIPLIER = 1.5;
var PLAYER_WALL_PHASING_UPGRADE_FREQUENCY_BASE_TIME_MS = exports.PLAYER_WALL_PHASING_UPGRADE_FREQUENCY_BASE_TIME_MS = 5000;
var PLAYER_WALL_PHASING_UPGRADE_FREQUENCY_BASE_TIME_MS_MULTIPLIER = exports.PLAYER_WALL_PHASING_UPGRADE_FREQUENCY_BASE_TIME_MS_MULTIPLIER = 0.95;
var PLAYER_WALL_PHASING_UPGRADE_TOTAL_BASE_COST = exports.PLAYER_WALL_PHASING_UPGRADE_TOTAL_BASE_COST = 10000;
var PLAYER_WALL_PHASING_UPGRADE_TOTAL_COST_MULTPLIER = exports.PLAYER_WALL_PHASING_UPGRADE_TOTAL_COST_MULTPLIER = 1.5;
var PLAYER_WALL_PHASING_UPGRADE_TOTAL_BASE_STORAGE = exports.PLAYER_WALL_PHASING_UPGRADE_TOTAL_BASE_STORAGE = 4;
var PLAYER_WALL_PHASING_UPGRADE_TOTAL_BASE_STORAGE_INCREMENT = exports.PLAYER_WALL_PHASING_UPGRADE_TOTAL_BASE_STORAGE_INCREMENT = 2;
var CLICK_TO_MOVE_UPGRADE_BASE_COST = exports.CLICK_TO_MOVE_UPGRADE_BASE_COST = 5000;
var CLICK_TO_MOVE_TILE_DISTANCE_UPGRADE_BASE_COST = exports.CLICK_TO_MOVE_TILE_DISTANCE_UPGRADE_BASE_COST = 5000;
var CLICK_TO_MOVE_TILE_DISTANCE_UPGRADE_BASE_COST_INCREMENT = exports.CLICK_TO_MOVE_TILE_DISTANCE_UPGRADE_BASE_COST_INCREMENT = 5000;
var CLICK_TO_MOVE_TILE_DISTANCE_UPGRADE_BASE_TILE_DISTANCE = exports.CLICK_TO_MOVE_TILE_DISTANCE_UPGRADE_BASE_TILE_DISTANCE = 5;
var CLICK_TO_MOVE_TILE_DISTANCE_UPGRADE_BASE_TILE_DISTANCE_INCREMENT = exports.CLICK_TO_MOVE_TILE_DISTANCE_UPGRADE_BASE_TILE_DISTANCE_INCREMENT = 1;
var CLICK_TO_MOVE_SPEED_MULTIPLIER_UPGRADE_BASE_COST = exports.CLICK_TO_MOVE_SPEED_MULTIPLIER_UPGRADE_BASE_COST = 10000;
var CLICK_TO_MOVE_SPEED_MULTIPLIER_UPGRADE_BASE_COST_INCREMENT = exports.CLICK_TO_MOVE_SPEED_MULTIPLIER_UPGRADE_BASE_COST_INCREMENT = 5000;
var CLICK_TO_MOVE_SPEED_MULTIPLIER_UPGRADE_BASE_AMOUNT = exports.CLICK_TO_MOVE_SPEED_MULTIPLIER_UPGRADE_BASE_AMOUNT = 2.0;
var CLICK_TO_MOVE_SPEED_MULTIPLIER_UPGRADE_BASE_INCREMENT = exports.CLICK_TO_MOVE_SPEED_MULTIPLIER_UPGRADE_BASE_INCREMENT = 0.2;
var BIOME_UPGRADE_COST_ARR = exports.BIOME_UPGRADE_COST_ARR = [200, 400, 1000, 2000, 4000, 6000, 10000, 15000, 25000, 50000, 100000, 150000, 200000, 300000, 450000, 600000, 750000, 1250000, 2000000, 3000000, 4500000, 6000000, 8000000, 10000000, 15000000, 20000000];
var BIOME_UPGRADE_BASE_MULTPLIER = exports.BIOME_UPGRADE_BASE_MULTPLIER = 1.5;
var UPGRADE_TYPE_TO_HEADER_UI_KEY_MAP = exports.UPGRADE_TYPE_TO_HEADER_UI_KEY_MAP = new Map([[UpgradeType.BOT, "botUpgradeHeader"], [UpgradeType.ITEM, "itemUpgradeHeader"], [UpgradeType.MAZE, "mazeUpgradeHeader"], [UpgradeType.MOVEMENT, "movementUpgradeHeader"], [UpgradeType.OTHER, null]]);
var UPGRADE_TYPE_TO_PANEL_UI_KEY_MAP = exports.UPGRADE_TYPE_TO_PANEL_UI_KEY_MAP = new Map([[UpgradeType.BOT, "botUpgradePanel"], [UpgradeType.ITEM, "itemUpgradePanel"], [UpgradeType.MAZE, "mazeUpgradePanel"], [UpgradeType.MOVEMENT, "movementUpgradePanel"], [UpgradeType.OTHER, null]]);

},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var CHANGE_LOG_HTML = exports.CHANGE_LOG_HTML = "\nChanges [0.2.0]:\n- [Balancing] Full revamp of biomes/upgrades/items.\n- [Feature] Added unique maze grid and algorithms for up to biome 26 (new upgrades stop at 20)!\n- [Feature] Added experimental mode panel for end game experimentation (unlocked at biome 25).\n- [Feature] Added new maze items for speed up and tile multiplier along with many upgrades.\n- [Feature] Added maze item for marking all dead ends.\n- [Feature] Added manual wall phasing upgrade with two associated upgrades (frequency/total).\n- [Feature] Added click to move functionality with upgrades for speed and tile distance.\n- [Feature] Added a new upgrade for remembering untaken pathways at decision points.\n- [Feature] Added a new upgrade for bot frustration speed up.\n- [Feature] Added an upgrade toggles panel to enable/disable upgrades.\n- [Feature] Added destructible walls and portals with a spawn rate bound to the biome level.\n- [Feature] Added upgrades for bypassing destructible walls.\n\n- [Tweak/Feature] Revamped the brain item to have new a new purpose.\n- [Mazes] Added a new upgrade for multiple maze entrances.\n- [Mazes] Added maze completion requirements for % visited tiles and keys found.\n- [Mazes] Added Pyramid, Staircase, Honecomb, Letter H, and Circle maze shapes.\n- [Tweak] Bot auto merge upgrade now forces bots to auto splits if no new tiles are found.\n- [Tweak] Removed activatable power ups for speed/multiplier and replaced them with maze items.\n- [Tweak] Bots no longer merge with manual players.\n- [Tweak] Teleport player to bot no longer deletes the destination tile bot.\n- [Tweak] Players always spawn at the start of the maze even with auto-move (once upgraded).\n\n- [UI] Added tool tip text what you unlock in the next biome.\n- [UI] Display next level upgrade value as part of upgrade text.\n- [UI] Added a panel to display unlocked items with a tooltip describing them.\n- [UI] Added warning modal for running old version saves.\n- [UI] Upgrade sections are collapsible by clicking on their header.\n- [UI] Warning modal when opening an old save file.\n- [UI] This change log is available in game!\n\n- [Stats] Added a tripometer for stats.\n- [Stats] Added a whole bunch more stats.\n- [Stats] Added Google Analytics for page view count.\n\n- [Bug] Fixed issue where you could use teleport to bot without unlocking the ability.\n- [Bug] Fixed bug where players would be squares instead of circles when run over by bots.\n- [UI/Bug] Fixed bug where hover text wouldn't display when the button is disabled.\n- [UI/Bug] Fixed Firefox display bug where maze would render incorrectly.\n- [UI/Bug] Fixed bug where each maze size would change causing UI jitter.\n- [UI/Bug] Fixed bug where buttons were not disabling when they couldn't be afforded.\n- [UI/Bug] Fixed bug where speed up upgrades were not applying correctly.\n- [UI/Bug] Modal windows won't close in some scenarios from clicking.\n- [UI/Bug] Fixed bug where the upgrade button was clickable outside the button boundary.\n- [UI/Bug] Firefox layout bug where borders are mangled. \n- [UI/Bug] Mislabeled color for dead ends tooltip text.\n\n";

},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.displayAllColors = exports.clearDevResultTable = exports.setDevResultHeaderNames = exports.DEV_SPEED_RUN_POINT_LIMIT_NEXT_BIOME_COST_STRING = exports.DEV_SPEED_RUN_NO_LIMIT_STRING = exports.DEV_RESULT_TABLE_UI_ID = exports.DEV_SHOW_SINGLE_MAZE_DATA_CHECKBOX_UI_ID = exports.DEV_SPEED_RUN_AUTO_PURCHASE_CHECKBOX_UI_ID = exports.DEV_RESET_TO_BASE_BIOME_UPGRADES_BUTTON_UI_ID = exports.DEV_CSV_MAZE_GRID_TILE_COUNTS_BUTTON_UI_ID = exports.DEV_SHOW_MAZE_GRID_TILE_COUNTS_BUTTON_UI_ID = exports.DEV_SHOW_MAZE_CONFIGS_BUTTON_UI_ID = exports.DEV_SPEED_RUN_MAX_MAZE_COUNT_SELECTOR_UI_ID = exports.DEV_SPEED_RUN_POINTS_LIMIT_SELECTOR_UI_ID = exports.DEV_NUM_SPEED_RUN_ITERATIONS_SELECTOR_UI_ID = exports.DEV_SPEED_RUN_BUTTON_UI_ID = exports.DEV_SPEED_RUN_AVG_RESULTS = exports.DEV_CLEAR_POINTS_BUTTON_UI_ID = exports.DEV_CLEAR_RESULTS_TABLE_BUTTON_UI_ID = exports.DEV_UPGRADE_BUTTON_UI_ID = exports.DEV_UPGRADE_SELECTOR_UI_ID = exports.DEV_ROOT_PANEL_UI_ID = exports.IS_FREE_MODE_ENABLED = exports.DEBUG_ALL_BUTTONS_VISIBLE = exports.IS_DEV_MODE_DISABLE_UI = exports.IS_DEV_MODE_ENABLED = undefined;

var _Game = require("../managers/Game");

var _Game2 = _interopRequireDefault(_Game);

var _UpgradeConstants = require("../constants/UpgradeConstants");

var _UserInterface = require("../managers/UserInterface");

var _BiomeConstants = require("../constants/BiomeConstants");

var _MazeUtils = require("../managers/MazeUtils");

var _ExperimentConstants = require("../constants/ExperimentConstants");

var _speedRunUtils = require("../utils/speedRunUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IS_DEV_MODE_ENABLED = exports.IS_DEV_MODE_ENABLED = false;
var IS_DEV_MODE_DISABLE_UI = exports.IS_DEV_MODE_DISABLE_UI = false;
var DEBUG_ALL_BUTTONS_VISIBLE = exports.DEBUG_ALL_BUTTONS_VISIBLE = false;
var IS_FREE_MODE_ENABLED = exports.IS_FREE_MODE_ENABLED = false;
var DEV_ROOT_PANEL_UI_ID = exports.DEV_ROOT_PANEL_UI_ID = "devSplit";
var DEV_UPGRADE_SELECTOR_UI_ID = exports.DEV_UPGRADE_SELECTOR_UI_ID = "devUpgradeSelector";
var DEV_UPGRADE_BUTTON_UI_ID = exports.DEV_UPGRADE_BUTTON_UI_ID = "devShowUpgradeDataButton";
var DEV_CLEAR_RESULTS_TABLE_BUTTON_UI_ID = exports.DEV_CLEAR_RESULTS_TABLE_BUTTON_UI_ID = "devClearDevResultTableButton";
var DEV_CLEAR_POINTS_BUTTON_UI_ID = exports.DEV_CLEAR_POINTS_BUTTON_UI_ID = "devClearPointsButton";
var DEV_SPEED_RUN_AVG_RESULTS = exports.DEV_SPEED_RUN_AVG_RESULTS = "devSpeedRunAvgResult";
var DEV_SPEED_RUN_BUTTON_UI_ID = exports.DEV_SPEED_RUN_BUTTON_UI_ID = "devStartSpeedRunButton";
var DEV_NUM_SPEED_RUN_ITERATIONS_SELECTOR_UI_ID = exports.DEV_NUM_SPEED_RUN_ITERATIONS_SELECTOR_UI_ID = "devNumSpeedRunIterationsSelector";
var DEV_SPEED_RUN_POINTS_LIMIT_SELECTOR_UI_ID = exports.DEV_SPEED_RUN_POINTS_LIMIT_SELECTOR_UI_ID = "devSpeedRunPointsLimitSelector";
var DEV_SPEED_RUN_MAX_MAZE_COUNT_SELECTOR_UI_ID = exports.DEV_SPEED_RUN_MAX_MAZE_COUNT_SELECTOR_UI_ID = "devSpeedRunMaxMazesSelector";
var DEV_SHOW_MAZE_CONFIGS_BUTTON_UI_ID = exports.DEV_SHOW_MAZE_CONFIGS_BUTTON_UI_ID = "devShowMazeConfigsButton";
var DEV_SHOW_MAZE_GRID_TILE_COUNTS_BUTTON_UI_ID = exports.DEV_SHOW_MAZE_GRID_TILE_COUNTS_BUTTON_UI_ID = "devShowMazeGridTileCountsButton";
var DEV_CSV_MAZE_GRID_TILE_COUNTS_BUTTON_UI_ID = exports.DEV_CSV_MAZE_GRID_TILE_COUNTS_BUTTON_UI_ID = "devCSVMazeGridTileCountsButton";
var DEV_RESET_TO_BASE_BIOME_UPGRADES_BUTTON_UI_ID = exports.DEV_RESET_TO_BASE_BIOME_UPGRADES_BUTTON_UI_ID = "devResetToBaseBiomeUpgrades";
var DEV_SPEED_RUN_AUTO_PURCHASE_CHECKBOX_UI_ID = exports.DEV_SPEED_RUN_AUTO_PURCHASE_CHECKBOX_UI_ID = "devSpeedRunAutoPurchase";
var DEV_SHOW_SINGLE_MAZE_DATA_CHECKBOX_UI_ID = exports.DEV_SHOW_SINGLE_MAZE_DATA_CHECKBOX_UI_ID = "devShowSingleMazeData";
var DEV_RESULT_TABLE_UI_ID = exports.DEV_RESULT_TABLE_UI_ID = "devResultTable";
var DEV_SPEED_RUN_NO_LIMIT_STRING = exports.DEV_SPEED_RUN_NO_LIMIT_STRING = "NO_LIMIT";
var DEV_SPEED_RUN_POINT_LIMIT_NEXT_BIOME_COST_STRING = exports.DEV_SPEED_RUN_POINT_LIMIT_NEXT_BIOME_COST_STRING = "NEXT_BIOME_COST";
var DEV_SPEED_RUN_ITERATIONS_SELECTOR_OPTIONS = ["1", "5", "10", "15", "20", "50", "100", DEV_SPEED_RUN_NO_LIMIT_STRING];
var DEV_SPEED_RUN_POINT_LIMIT_OPTIONS = ["1000", "5000", "10000", "15000", "20000", "25000", "40000", DEV_SPEED_RUN_NO_LIMIT_STRING, DEV_SPEED_RUN_POINT_LIMIT_NEXT_BIOME_COST_STRING];
var MAX_UPGRADE_LEVEL = 20;
$(document).ready(function () {
    if (!IS_DEV_MODE_ENABLED) return;
    console.info("DEV MODE READY!");
    var dummyGame = new _Game2.default(true, true);
    initDevUi();
    $("#" + DEV_UPGRADE_BUTTON_UI_ID).click(function () {
        printUpgradeData(dummyGame);
    });
    $("#" + DEV_CLEAR_RESULTS_TABLE_BUTTON_UI_ID).click(function () {
        clearDevResultTable();
    });
    $("#" + DEV_SPEED_RUN_BUTTON_UI_ID).click(function () {
        if (_Game.globalGame.dev.isSpeedRunEnabled()) {
            (0, _speedRunUtils.setSpeedRunEnabled)(false);
        } else {
            (0, _speedRunUtils.enableSpeedRun)(_Game.globalGame);
        }
    });
    $("#" + DEV_CLEAR_POINTS_BUTTON_UI_ID).click(function () {
        _Game.globalGame.points.resetPoints();
    });
    $("#" + DEV_SHOW_MAZE_CONFIGS_BUTTON_UI_ID).click(function () {
        printBiomeMazeConfigs(dummyGame);
    });
    $("#" + DEV_SHOW_MAZE_GRID_TILE_COUNTS_BUTTON_UI_ID).click(function () {
        printMazeGridTileCounts(dummyGame);
    });
    $("#" + DEV_CSV_MAZE_GRID_TILE_COUNTS_BUTTON_UI_ID).click(function () {
        printMazeGridTileCountsAsCsv(dummyGame);
    });
    $("#" + DEV_RESET_TO_BASE_BIOME_UPGRADES_BUTTON_UI_ID).click(function () {
        (0, _speedRunUtils.resetToBaseBiomeUpgrades)(_Game.globalGame);
    });
    // Reset other speed run selector to only allowed value.
    $("#" + DEV_SPEED_RUN_POINTS_LIMIT_SELECTOR_UI_ID).change(function () {
        if ((0, _speedRunUtils.hasMazeLimit)()) {
            _UserInterface.UserInterface.setSelectorValue(DEV_SPEED_RUN_NO_LIMIT_STRING, DEV_SPEED_RUN_MAX_MAZE_COUNT_SELECTOR_UI_ID);
        }
    });
    // Reset other speed run selector to only allowed value.
    $("#" + DEV_SPEED_RUN_MAX_MAZE_COUNT_SELECTOR_UI_ID).change(function () {
        if ((0, _speedRunUtils.hasMazeLimit)()) {
            _UserInterface.UserInterface.setSelectorValue(DEV_SPEED_RUN_NO_LIMIT_STRING, DEV_SPEED_RUN_POINTS_LIMIT_SELECTOR_UI_ID);
            _UserInterface.UserInterface.setSelectorValue(DEV_SPEED_RUN_NO_LIMIT_STRING, DEV_NUM_SPEED_RUN_ITERATIONS_SELECTOR_UI_ID);
        }
    });
});
var initDevUi = function initDevUi() {
    // Init upgrade cost list
    var upgradeList = [];
    for (var upgrade in _UpgradeConstants.UpgradeKey) {
        upgradeList.push(upgrade);
    }
    upgradeList.sort();
    _UserInterface.UserInterface.setOptionsForSelector(upgradeList, DEV_UPGRADE_SELECTOR_UI_ID);
    _UserInterface.UserInterface.setOptionsForSelector(DEV_SPEED_RUN_ITERATIONS_SELECTOR_OPTIONS, DEV_NUM_SPEED_RUN_ITERATIONS_SELECTOR_UI_ID);
    _UserInterface.UserInterface.setSelectorValue("10", DEV_NUM_SPEED_RUN_ITERATIONS_SELECTOR_UI_ID);
    _UserInterface.UserInterface.setOptionsForSelector(DEV_SPEED_RUN_POINT_LIMIT_OPTIONS, DEV_SPEED_RUN_POINTS_LIMIT_SELECTOR_UI_ID);
    _UserInterface.UserInterface.setSelectorValue(DEV_SPEED_RUN_POINT_LIMIT_NEXT_BIOME_COST_STRING, DEV_SPEED_RUN_POINTS_LIMIT_SELECTOR_UI_ID);
    _UserInterface.UserInterface.setOptionsForSelector(DEV_SPEED_RUN_ITERATIONS_SELECTOR_OPTIONS, DEV_SPEED_RUN_MAX_MAZE_COUNT_SELECTOR_UI_ID);
    _UserInterface.UserInterface.setSelectorValue(DEV_SPEED_RUN_NO_LIMIT_STRING, DEV_SPEED_RUN_MAX_MAZE_COUNT_SELECTOR_UI_ID);
};
var setDevResultHeaderNames = exports.setDevResultHeaderNames = function setDevResultHeaderNames(rowNames) {
    $("#" + DEV_RESULT_TABLE_UI_ID + " thead").append("<tr>");
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = rowNames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var rowName = _step.value;

            $("#" + DEV_RESULT_TABLE_UI_ID + " thead").append("<th>" + rowName + "</th>");
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    $("#" + DEV_RESULT_TABLE_UI_ID + " tbody").append("</tr>");
};
var printUpgradeData = function printUpgradeData(game) {
    var upgradeKey = _UserInterface.UserInterface.getSelectorSelectedValue(DEV_UPGRADE_SELECTOR_UI_ID);
    if (!upgradeKey) console.error("No upgrade key selected.");
    clearDevResultTable();
    setDevResultHeaderNames(['Upgrade Level', 'Upgrade Cost', 'Upgrade Value']);
    var upgrade = game.upgrades.getUpgrade(upgradeKey);
    for (var i = 0; i < MAX_UPGRADE_LEVEL; i++) {
        if (upgrade.isMaxUpgradeLevel()) {
            return;
        }
        upgrade.upgradeLevel = i;
        $("#" + DEV_RESULT_TABLE_UI_ID + " tbody").append("<tr>");
        $("#" + DEV_RESULT_TABLE_UI_ID + " tbody").append("<td>" + i + "</td>");
        $("#" + DEV_RESULT_TABLE_UI_ID + " tbody").append("<td>" + _UserInterface.UserInterface.getPrettyPrintNumber(upgrade.getCost()) + "</td>");
        $("#" + DEV_RESULT_TABLE_UI_ID + " tbody").append("<td>" + _UserInterface.UserInterface.getPrettyPrintNumber(upgrade.getUpgradeValue()) + "</td>");
        $("#" + DEV_RESULT_TABLE_UI_ID + " tbody").append("</tr>");
    }
};
var printBiomeMazeConfigs = function printBiomeMazeConfigs(game) {
    clearDevResultTable();
    setDevResultHeaderNames(['#', 'Maze Type', 'Tile Count', 'Algorithm', 'Keys', '% Req']);
    var maxBiomeLevel = 36;
    for (var biomeNum = 0; biomeNum < maxBiomeLevel; biomeNum++) {
        var mazeConfig = (0, _BiomeConstants.getBiomeMazeConfig)(game, biomeNum, false);
        var hasReqs = mazeConfig.mazeCompletionRequirements != null;
        var keyCountReq = hasReqs ? mazeConfig.mazeCompletionRequirements.minMazeKeysFound || 0 : 0;
        var percentReq = hasReqs ? mazeConfig.mazeCompletionRequirements.minTilePercentageVisited || 0 : 0;
        game.upgrades.getUpgrade(_UpgradeConstants.UpgradeKey.BIOME).upgradeLevel = biomeNum;
        game.maze.newMaze();
        var htmlRow = "<tr>";
        htmlRow += "<td>" + biomeNum + "</td>";
        htmlRow += "<td>" + mazeConfig.mazeGridType + "</td>";
        htmlRow += "<td>" + game.maze.getGrid().getTileCount() + "</td>";
        htmlRow += "<td>" + mazeConfig.mazeAlgorithmType + "</td>";
        htmlRow += "<td>" + keyCountReq + "</td>";
        htmlRow += "<td>" + (percentReq * 100).toFixed(0) + "%</td>";
        $("#" + DEV_RESULT_TABLE_UI_ID + " tbody").append(htmlRow);
    }
};
var printMazeGridTileCounts = function printMazeGridTileCounts(game) {
    clearDevResultTable();
    setDevResultHeaderNames(['Size', 'Maze Grid', 'Tile Count']);
    var maxGridSize = 40;
    for (var mazeSize = 5; mazeSize <= maxGridSize; mazeSize++) {
        var mazeConfig = (0, _BiomeConstants.getBiomeMazeConfig)(_Game.globalGame, 0, true);
        mazeConfig.mazeSizeX = mazeSize;
        mazeConfig.mazeSizeY = mazeSize;
        mazeConfig.mazeTierSize = mazeSize;
        var maze = (0, _MazeUtils.generateMazeGridAndAlgorithm)(game, mazeConfig);
        var htmlRow = "<tr>";
        htmlRow += "<td>" + mazeSize + "</td>";
        htmlRow += "<td>" + mazeConfig.mazeGridType + "</td>";
        htmlRow += "<td>" + maze.grid.getTileCount() + "</td>";
        htmlRow += "</tr>";
        $("#" + DEV_RESULT_TABLE_UI_ID + " tbody").append(htmlRow);
    }
};
var printMazeGridTileCountsAsCsv = function printMazeGridTileCountsAsCsv(game) {
    var minGridSize = 5,
        maxGridSize = 40;
    var minTierSize = 0,
        maxTierSize = 10;
    var csvText = "";
    // I was too lazy to just sort the enum. idk.
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = (0, _ExperimentConstants.getExperimentMazeGridTypesList)()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var mazeGridType = _step2.value;

            if (mazeGridType === _ExperimentConstants.SELECTOR_BIOME_DEFAULT) continue;
            var isTieredSize = _MazeUtils.MAZE_GRID_TIERED_TYPES.has(mazeGridType);
            var minSize = isTieredSize ? minTierSize : minGridSize;
            var maxSize = isTieredSize ? maxTierSize : maxGridSize;
            for (var mazeSize = minSize; mazeSize <= maxSize; mazeSize++) {
                var mazeConfig = (0, _BiomeConstants.getBiomeMazeConfig)(_Game.globalGame, 0, true);
                mazeConfig.mazeSizeX = mazeSize;
                mazeConfig.mazeSizeY = mazeSize;
                mazeConfig.mazeTierSize = mazeSize;
                mazeConfig.mazeGridType = mazeGridType;
                var maze = (0, _MazeUtils.generateMazeGridAndAlgorithm)(game, mazeConfig);
                csvText += mazeConfig.mazeGridType + "," + mazeSize + "," + maze.grid.getTileCount() + "\n";
            }
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    console.info(csvText);
};
var clearDevResultTable = exports.clearDevResultTable = function clearDevResultTable() {
    $("#" + DEV_RESULT_TABLE_UI_ID + " tbody").empty();
    $("#" + DEV_RESULT_TABLE_UI_ID + " thead").empty();
    $("#" + DEV_SPEED_RUN_AVG_RESULTS).empty();
};
// Player Order: Manual, regular bot, ghosting (walk through walls), brain bot
// Tile order: Univisited tile, visited tile, dead end tile.
var displayAllColors = exports.displayAllColors = function displayAllColors(game) {
    var player1 = game.players.createNewPlayerObj({ x: 0, y: 0 }, game.maze.getMazeId(), true);
    var player2 = game.players.createNewPlayerObj({ x: 0, y: 1 }, game.maze.getMazeId(), false);
    var player3 = game.players.createNewPlayerObj({ x: 0, y: 2 }, game.maze.getMazeId(), false);
    player3.setIsUnlimitedSplitItemActive(true);
    game.maze.setTileBackgroundColor({ x: 0, y: 2 });
    var player4 = game.players.createNewPlayerObj({ x: 0, y: 3 }, game.maze.getMazeId(), false);
    player4.addGhostPathingDistance(10);
    game.maze.setTileBackgroundColor({ x: 0, y: 3 });
    var player5 = game.players.createNewPlayerObj({ x: 0, y: 4 }, game.maze.getMazeId(), false);
    player5.smartPathingTileDistanceRemaining = 10;
    game.maze.setTileBackgroundColor({ x: 0, y: 4 });
    game.maze.getGrid().setVisited({ x: 2, y: 2 });
    game.maze.getGrid().setVisited({ x: 2, y: 3 });
    game.maze.getGrid().setVisited({ x: 2, y: 4 });
    game.maze.getGrid().getCell({ x: 3, y: 2 }).setDeadEndCellValue(11);
    game.maze.getGrid().getCell({ x: 3, y: 3 }).setDeadEndCellValue(11);
    game.maze.getGrid().getCell({ x: 3, y: 4 }).setDeadEndCellValue(11);
    game.maze.setTileBackgroundColor({ x: 2, y: 2 });
    game.maze.setTileBackgroundColor({ x: 2, y: 3 });
    game.maze.setTileBackgroundColor({ x: 2, y: 4 });
    game.maze.setTileBackgroundColor({ x: 3, y: 2 });
    game.maze.setTileBackgroundColor({ x: 3, y: 3 });
    game.maze.setTileBackgroundColor({ x: 3, y: 4 });
};

},{"../constants/BiomeConstants":6,"../constants/ExperimentConstants":8,"../constants/UpgradeConstants":13,"../managers/Game":32,"../managers/MazeUtils":36,"../managers/UserInterface":46,"../utils/speedRunUtils":119}],16:[function(require,module,exports){
"use strict";

var _Game = require("./managers/Game");

var _UpgradeConstants = require("./constants/UpgradeConstants");

var _MazeUtils = require("./managers/MazeUtils");

var _PowerUpConstants = require("./constants/PowerUpConstants");

var _uiUtils = require("./utils/uiUtils");

var UP_KEY = 38;
var DOWN_KEY = 40;
var LEFT_KEY = 37;
var RIGHT_KEY = 39;
var W_KEY = 87;
var S_KEY = 83;
var A_KEY = 65;
var D_KEY = 68;
var E_KEY = 69;
var Q_KEY = 81;
var ONE_KEY = 49;
var TWO_KEY = 50;
var ESCAPE_KEY = 27;
$(document).ready(function () {
    var game = _Game.globalGame;
    //TODO: this should be in UI
    $(document).keydown(function (event) {
        // Up
        if (event.keyCode === UP_KEY || event.keyCode === W_KEY) {
            (0, _uiUtils.handlePlayerMoveEvent)(game, _MazeUtils.DIRECTION_UP);
            event.preventDefault();
        }
        // Down
        else if (event.keyCode === DOWN_KEY || event.keyCode === S_KEY) {
                (0, _uiUtils.handlePlayerMoveEvent)(game, _MazeUtils.DIRECTION_DOWN);
                event.preventDefault();
            }
            // Left
            else if (event.keyCode === LEFT_KEY || event.keyCode === A_KEY) {
                    (0, _uiUtils.handlePlayerMoveEvent)(game, _MazeUtils.DIRECTION_LEFT);
                    event.preventDefault();
                }
                // Right
                else if (event.keyCode === RIGHT_KEY || event.keyCode === D_KEY) {
                        (0, _uiUtils.handlePlayerMoveEvent)(game, _MazeUtils.DIRECTION_RIGHT);
                        event.preventDefault();
                    }
                    // E = Teleport Player to Bot
                    else if (event.keyCode === E_KEY) {
                            if (game.upgrades.isUpgraded(_UpgradeConstants.UpgradeKey.TELEPORT_PLAYER_BACK_TO_BOT)) {
                                game.rngBot.disableClickToMoveInterval();
                                game.maze.teleportPlayerBackToBot();
                            }
                            event.preventDefault();
                        }
                        // Q = Teleport Bot to Player
                        else if (event.keyCode === Q_KEY) {
                                if (game.upgrades.isUpgraded(_UpgradeConstants.UpgradeKey.TELEPORT_BOT_BACK_TO_PLAYER)) {
                                    game.rngBot.disableClickToMoveInterval();
                                    game.maze.teleportBotBackToPlayer();
                                }
                                event.preventDefault();
                            }
                            // 1 = Speed Up Powerup
                            else if (event.keyCode === ONE_KEY) {
                                    game.powerUps.activatePowerUp(_PowerUpConstants.PowerUpKey.SPEED_UP);
                                    event.preventDefault();
                                }
                                // 2 = Point multiplier Powerup
                                else if (event.keyCode === TWO_KEY) {
                                        game.powerUps.activatePowerUp(_PowerUpConstants.PowerUpKey.TILE_MULTIPLIER);
                                        event.preventDefault();
                                    } else if (event.keyCode === ESCAPE_KEY) {
                                        game.ui.closeAllModals();
                                    }
    });
});

},{"./constants/PowerUpConstants":10,"./constants/UpgradeConstants":13,"./managers/Game":32,"./managers/MazeUtils":36,"./utils/uiUtils":120}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MazeItem = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ItemConstants = require("../constants/ItemConstants");

var _MazeUtils = require("../managers/MazeUtils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MazeItem = exports.MazeItem = function () {
    function MazeItem(game, tile, mazeItemKey, pickUpStatsKey) {
        _classCallCheck(this, MazeItem);

        this.game = game;
        this.tile = tile;
        this.tileKey = (0, _MazeUtils.generateTileKey)(tile.x, tile.y);
        this.mazeItemKey = mazeItemKey;
        this.pickUpStatsKey = pickUpStatsKey;
    }

    _createClass(MazeItem, [{
        key: "getMazeItemKey",
        value: function getMazeItemKey() {
            return this.mazeItemKey;
        }
    }, {
        key: "isMazeItemType",
        value: function isMazeItemType(mazeItemKey) {
            return this.mazeItemKey === mazeItemKey;
        }
    }, {
        key: "getBackgroundImagePath",
        value: function getBackgroundImagePath() {
            return (0, _ItemConstants.getMazeItemBackgroundImageByMazeItemKey)(this.mazeItemKey, this.game);
        }
    }, {
        key: "drawItem",
        value: function drawItem() {
            this.game.ui.setImageIcon(this.tileKey, this.getBackgroundImagePath(), _ItemConstants.MAZE_ITEM_ICON_SIZE_IN_PX);
        }
    }, {
        key: "removeItem",
        value: function removeItem() {
            $("#" + this.tileKey).css("background-size", "");
            $("#" + this.tileKey).css("background-image", "");
        }
    }, {
        key: "triggerPickup",
        value: function triggerPickup(playerId) {
            this.removeItem();
            this.game.stats.addStatsToKey(1, this.pickUpStatsKey);
        }
    }], [{
        key: "getItemSpawnProbability",
        value: function getItemSpawnProbability(game) {
            return 0;
        }
    }]);

    return MazeItem;
}();

},{"../constants/ItemConstants":9,"../managers/MazeUtils":36}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PortalMazeItem = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _MazeUtils = require("../../managers/MazeUtils");

var _Stats = require("../../models/Stats");

var _MazeItem2 = require("../MazeItem");

var _UserInterface = require("../../managers/UserInterface");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PortalMazeItem = exports.PortalMazeItem = function (_MazeItem) {
    _inherits(PortalMazeItem, _MazeItem);

    function PortalMazeItem(game, tile, mazeItemKey) {
        _classCallCheck(this, PortalMazeItem);

        return _possibleConstructorReturn(this, (PortalMazeItem.__proto__ || Object.getPrototypeOf(PortalMazeItem)).call(this, game, tile, mazeItemKey, _Stats.StatsKey.TOTAL_PORTAL_ITEMS_PICKED_UP));
    }

    _createClass(PortalMazeItem, [{
        key: "triggerPickup",
        value: function triggerPickup(playerId) {
            _get(PortalMazeItem.prototype.__proto__ || Object.getPrototypeOf(PortalMazeItem.prototype), "triggerPickup", this).call(this, playerId);
            var newTile = (0, _MazeUtils.getRandomMazeTile)(this.game);
            this.game.maze.updatePlayerTile(playerId, newTile);
        }
    }], [{
        key: "getItemSpawnProbability",
        value: function getItemSpawnProbability(game) {
            var mazeObstacles = game.maze.getGrid().getMazeConfig().mazeObstacles;
            var spawnProb = mazeObstacles != null ? mazeObstacles.portalSpawnRate || 0 : 0;
            return spawnProb;
        }
    }, {
        key: "getTooltipText",
        value: function getTooltipText(game) {
            var spawnRate = PortalMazeItem.getItemSpawnProbability(game);
            return "The portal will teleport your bot to a random location in the maze." + ("<br><br>Spawn rate: " + _UserInterface.UserInterface.getDecimalPrettyPrintNumber(spawnRate * 100, 2) + "% per tile");
        }
    }]);

    return PortalMazeItem;
}(_MazeItem2.MazeItem);

},{"../../managers/MazeUtils":36,"../../managers/UserInterface":46,"../../models/Stats":68,"../MazeItem":17}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BrainMazeItem = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Stats = require("../../models/Stats");

var _UpgradeConstants = require("../../constants/UpgradeConstants");

var _ItemConstants = require("../../constants/ItemConstants");

var _MazeItem2 = require("../MazeItem");

var _UserInterface = require("../../managers/UserInterface");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BrainMazeItem = exports.BrainMazeItem = function (_MazeItem) {
    _inherits(BrainMazeItem, _MazeItem);

    function BrainMazeItem(game, tile, mazeItemKey) {
        _classCallCheck(this, BrainMazeItem);

        return _possibleConstructorReturn(this, (BrainMazeItem.__proto__ || Object.getPrototypeOf(BrainMazeItem)).call(this, game, tile, mazeItemKey, _Stats.StatsKey.TOTAL_BRAIN_ITEMS_PICKED_UP));
    }

    _createClass(BrainMazeItem, [{
        key: "triggerPickup",
        value: function triggerPickup(playerId) {
            // Don't pick up brains for manual movement or un-completed mazes
            // if (this.game.players.getPlayer(playerId).isManuallyControlled
            //   || !this.game.mazeRequirements.hasMetMazeCompletionRequirements()) {
            //   return
            // }
            _get(BrainMazeItem.prototype.__proto__ || Object.getPrototypeOf(BrainMazeItem.prototype), "triggerPickup", this).call(this, playerId);
            if (!this.game.players.playerMap.has(playerId)) return;
            // const tileDistance = BrainMazeItem.getBrainTileDistanceAmount(this.game);
            // this.game.players.getPlayer(playerId).smartPathingTileDistanceRemaining += tileDistance;
            this.game.maze.getGrid().setBrainItemActive();
        }
    }], [{
        key: "getBrainTileDistanceAmount",
        value: function getBrainTileDistanceAmount(game) {
            var useNextLevel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var upgradeLevel = game.upgrades.getUpgradeLevel(_UpgradeConstants.UpgradeKey.BRAIN_TILE_DISTANCE, false, useNextLevel);
            return _ItemConstants.BRAIN_STARTING_TILE_DISTANCE + upgradeLevel * _UpgradeConstants.BRAIN_TILE_DISTANCE_UPGRADE_INCREASE_AMOUNT;
        }
    }, {
        key: "getItemSpawnProbability",
        value: function getItemSpawnProbability(game) {
            var useNextLevel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var upgradeLevel = game.upgrades.getUpgradeLevel(_UpgradeConstants.UpgradeKey.BRAIN_SPAWN, false, useNextLevel);
            return _ItemConstants.BRAIN_SPAWN_BASE_PROBABILITY + _ItemConstants.BRAIN_SPAWN_UPGRADE_FLAT_INCREASE_PROBABILITY * upgradeLevel;
        }
    }, {
        key: "getTooltipText",
        value: function getTooltipText(game) {
            var spawnRate = BrainMazeItem.getItemSpawnProbability(game);
            var currTileDistance = BrainMazeItem.getBrainTileDistanceAmount(game);
            return "The brain maze item will provide your bots with a memory of the exit location. If they find the exit before completing all of the maze requirements " + "they will auto-complete the maze upon completion of the maze requirements." + ("<br><br>Spawn rate: " + _UserInterface.UserInterface.getDecimalPrettyPrintNumber(spawnRate * 100, 2) + "% per tile");
        }
    }]);

    return BrainMazeItem;
}(_MazeItem2.MazeItem);

},{"../../constants/ItemConstants":9,"../../constants/UpgradeConstants":13,"../../managers/UserInterface":46,"../../models/Stats":68,"../MazeItem":17}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DeadEndMazeItem = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Stats = require("../../models/Stats");

var _ItemConstants = require("../../constants/ItemConstants");

var _MazeItem2 = require("../MazeItem");

var _UpgradeConstants = require("../../constants/UpgradeConstants");

var _deadEndUtils = require("../../utils/deadEndUtils");

var _UserInterface = require("../../managers/UserInterface");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DeadEndMazeItem = exports.DeadEndMazeItem = function (_MazeItem) {
    _inherits(DeadEndMazeItem, _MazeItem);

    function DeadEndMazeItem(game, tile, mazeItemKey) {
        _classCallCheck(this, DeadEndMazeItem);

        return _possibleConstructorReturn(this, (DeadEndMazeItem.__proto__ || Object.getPrototypeOf(DeadEndMazeItem)).call(this, game, tile, mazeItemKey, _Stats.StatsKey.TOTAL_DEAD_END_ITEMS_PICKED_UP));
    }

    _createClass(DeadEndMazeItem, [{
        key: "triggerPickup",
        value: function triggerPickup(playerId) {
            _get(DeadEndMazeItem.prototype.__proto__ || Object.getPrototypeOf(DeadEndMazeItem.prototype), "triggerPickup", this).call(this, playerId);
            (0, _deadEndUtils.markAllDeadEndTiles)(this.game);
        }
    }], [{
        key: "getItemSpawnProbability",
        value: function getItemSpawnProbability(game) {
            var useNextLevel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (!game.upgrades.isUpgraded(_UpgradeConstants.UpgradeKey.BOT_REMEMBER_DEADEND_TILES)) {
                return 0;
            }
            var upgradeLevel = game.upgrades.getUpgradeLevel(_UpgradeConstants.UpgradeKey.DEAD_END_ITEM_SPAWN_RATE, false, useNextLevel);
            return _ItemConstants.DEAD_END_ITEM_SPAWN_BASE_PROBABILITY + upgradeLevel * _ItemConstants.DEAD_END_ITEM_SPAWN_BASE_INCREASE_PROBABILITY;
        }
    }, {
        key: "getTooltipText",
        value: function getTooltipText(game) {
            var spawnRate = DeadEndMazeItem.getItemSpawnProbability(game);
            var deadEndTileDistance = game.upgrades.getUpgradeValue(_UpgradeConstants.UpgradeKey.BOT_REMEMBER_DEADEND_TILES);
            return "The dead end maze item will mark all the dead ends in the entire maze up to your upgrade level (" + deadEndTileDistance + " tiles)." + " You will earn standard visit points for all tiles marked." + ("<br><br>Spawn Rate: " + _UserInterface.UserInterface.getDecimalPrettyPrintNumber(spawnRate * 100, 2) + "% per tile");
        }
    }]);

    return DeadEndMazeItem;
}(_MazeItem2.MazeItem);

},{"../../constants/ItemConstants":9,"../../constants/UpgradeConstants":13,"../../managers/UserInterface":46,"../../models/Stats":68,"../../utils/deadEndUtils":118,"../MazeItem":17}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FruitMazeItem = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _UpgradeConstants = require("../../constants/UpgradeConstants");

var _ItemConstants = require("../../constants/ItemConstants");

var _MazeItem2 = require("../MazeItem");

var _Stats = require("../../models/Stats");

var _BiomeConstants = require("../../constants/BiomeConstants");

var _UserInterface = require("../../managers/UserInterface");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FruitMazeItem = exports.FruitMazeItem = function (_MazeItem) {
    _inherits(FruitMazeItem, _MazeItem);

    function FruitMazeItem(game, tile, mazeItemKey) {
        _classCallCheck(this, FruitMazeItem);

        return _possibleConstructorReturn(this, (FruitMazeItem.__proto__ || Object.getPrototypeOf(FruitMazeItem)).call(this, game, tile, mazeItemKey, _Stats.StatsKey.TOTAL_FRUIT_ITEMS_PICKED_UP));
    }

    _createClass(FruitMazeItem, [{
        key: "triggerPickup",
        value: function triggerPickup(playerId) {
            _get(FruitMazeItem.prototype.__proto__ || Object.getPrototypeOf(FruitMazeItem.prototype), "triggerPickup", this).call(this, playerId);
            var points = FruitMazeItem.getFruitPickupPointsAmount(this.game);
            this.game.points.addPoints(points, playerId, [_Stats.StatsKey.TOTAL_POINTS_EARNED_FROM_FRUITS]);
        }
    }], [{
        key: "getFruitPickupPointsAmount",
        value: function getFruitPickupPointsAmount(game) {
            var useNextLevel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var pointsPerVisit = game.points.getPointsPerVisit();
            return FruitMazeItem.getFruitPickupEquivalentTileCount(game, useNextLevel) * pointsPerVisit;
        }
    }, {
        key: "getFruitPickupEquivalentTileCount",
        value: function getFruitPickupEquivalentTileCount(game) {
            var useNextLevel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            //TODO: this is a little bit of sorcery.  lets maybe lose some of these magical numbers.
            var upgradeLevelMultiplier = game.upgrades.getUpgradeLevel(_UpgradeConstants.UpgradeKey.FRUIT_PICKUP_POINTS, false, useNextLevel);
            var fruitTier = (0, _BiomeConstants.getFruitItemTierByBiomeKey)(game.biomes.getCurrentBiomeKey());
            return (fruitTier * 8 + 20) * Math.pow(1.05, upgradeLevelMultiplier);
        }
    }, {
        key: "getItemSpawnProbability",
        value: function getItemSpawnProbability(game) {
            var useNextLevel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var upgradeLevel = game.upgrades.getUpgradeLevel(_UpgradeConstants.UpgradeKey.FRUIT_SPAWN, false, useNextLevel);
            return _ItemConstants.FRUIT_SPAWN_BASE_PROBABILITY + _ItemConstants.FRUIT_SPAWN_UPGRADE_FLAT_INCREASE_PROBABILITY * upgradeLevel;
        }
    }, {
        key: "getTooltipText",
        value: function getTooltipText(game) {
            var spawnRate = FruitMazeItem.getItemSpawnProbability(game);
            var currPointsValue = FruitMazeItem.getFruitPickupPointsAmount(game);
            var tileEquiv = _UserInterface.UserInterface.getPrettyPrintNumber(FruitMazeItem.getFruitPickupEquivalentTileCount(game));
            return "The fruit item will give you points based on the fruit type, upgrade level AND points per tile visit." + ("<br><br>Current points: " + _UserInterface.UserInterface.getPrettyPrintNumber(currPointsValue) + "pts ") + ("<br>(equivalent to " + tileEquiv + " tiles)") + ("<br>Spawn Rate: " + _UserInterface.UserInterface.getDecimalPrettyPrintNumber(spawnRate * 100, 3) + "% per tile");
        }
    }]);

    return FruitMazeItem;
}(_MazeItem2.MazeItem);

},{"../../constants/BiomeConstants":6,"../../constants/ItemConstants":9,"../../constants/UpgradeConstants":13,"../../managers/UserInterface":46,"../../models/Stats":68,"../MazeItem":17}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GhostMazeItem = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _ItemConstants = require("../../constants/ItemConstants");

var _MazeItem2 = require("../MazeItem");

var _Stats = require("../../models/Stats");

var _UserInterface = require("../../managers/UserInterface");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GhostMazeItem = exports.GhostMazeItem = function (_MazeItem) {
    _inherits(GhostMazeItem, _MazeItem);

    function GhostMazeItem(game, tile, mazeItemKey) {
        _classCallCheck(this, GhostMazeItem);

        return _possibleConstructorReturn(this, (GhostMazeItem.__proto__ || Object.getPrototypeOf(GhostMazeItem)).call(this, game, tile, mazeItemKey, _Stats.StatsKey.TOTAL_GHOST_ITEMS_PICKED_UP));
    }

    _createClass(GhostMazeItem, [{
        key: "triggerPickup",
        value: function triggerPickup(playerId) {
            _get(GhostMazeItem.prototype.__proto__ || Object.getPrototypeOf(GhostMazeItem.prototype), "triggerPickup", this).call(this, playerId);
            var player = this.game.players.getPlayer(playerId);
            if (player) {
                player.addGhostPathingDistance(_ItemConstants.GHOST_ITEM_STARTING_TILE_DISTANCE);
            }
        }
    }], [{
        key: "getItemSpawnProbability",
        value: function getItemSpawnProbability() {
            return _ItemConstants.GHOST_ITEM_SPAWN_PROBABILITY;
        }
    }, {
        key: "getTooltipText",
        value: function getTooltipText() {
            var spawnRate = GhostMazeItem.getItemSpawnProbability();
            return "The ghost maze item allows the bot who picked it up to move through walls until the end of the maze." + ("<br><br>Spawn Rate: " + _UserInterface.UserInterface.getDecimalPrettyPrintNumber(spawnRate * 100, 2) + "% per tile");
        }
    }]);

    return GhostMazeItem;
}(_MazeItem2.MazeItem);

},{"../../constants/ItemConstants":9,"../../managers/UserInterface":46,"../../models/Stats":68,"../MazeItem":17}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.KeyMazeItem = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _MazeItem2 = require("../MazeItem");

var _Stats = require("../../models/Stats");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KeyMazeItem = exports.KeyMazeItem = function (_MazeItem) {
    _inherits(KeyMazeItem, _MazeItem);

    function KeyMazeItem(game, tile, mazeItemKey) {
        _classCallCheck(this, KeyMazeItem);

        return _possibleConstructorReturn(this, (KeyMazeItem.__proto__ || Object.getPrototypeOf(KeyMazeItem)).call(this, game, tile, mazeItemKey, _Stats.StatsKey.TOTAL_KEY_ITEMS_PICKED_UP));
    }

    _createClass(KeyMazeItem, [{
        key: "triggerPickup",
        value: function triggerPickup(playerId) {
            _get(KeyMazeItem.prototype.__proto__ || Object.getPrototypeOf(KeyMazeItem.prototype), "triggerPickup", this).call(this, playerId);
            this.game.maze.getGrid().addMazeKeyFound();
        }
        // Spawn rate is not fixed based on maze progression.

    }], [{
        key: "getItemSpawnProbability",
        value: function getItemSpawnProbability(game) {
            return 0;
        }
    }, {
        key: "getTooltipText",
        value: function getTooltipText() {
            return "The key item is used to unlock the maze exit. See the maze exit requirements panel for the total number needed.";
            // + ` Each key provides a ${MAZE_COMPLETION_BONUS_PER_KEY_MULTIPLIER}x multiplicative boost to maze completion bonus`;
        }
    }]);

    return KeyMazeItem;
}(_MazeItem2.MazeItem);

},{"../../models/Stats":68,"../MazeItem":17}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SpeedUpMazeItem = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _UpgradeConstants = require("../../constants/UpgradeConstants");

var _ItemConstants = require("../../constants/ItemConstants");

var _MazeItem2 = require("../MazeItem");

var _Stats = require("../../models/Stats");

var _PowerUpConstants = require("../../constants/PowerUpConstants");

var _UserInterface = require("../../managers/UserInterface");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SpeedUpMazeItem = exports.SpeedUpMazeItem = function (_MazeItem) {
    _inherits(SpeedUpMazeItem, _MazeItem);

    function SpeedUpMazeItem(game, tile, mazeItemKey) {
        _classCallCheck(this, SpeedUpMazeItem);

        return _possibleConstructorReturn(this, (SpeedUpMazeItem.__proto__ || Object.getPrototypeOf(SpeedUpMazeItem)).call(this, game, tile, mazeItemKey, _Stats.StatsKey.TOTAL_SPEED_UP_ITEMS_PICKED_UP));
    }

    _createClass(SpeedUpMazeItem, [{
        key: "triggerPickup",
        value: function triggerPickup(playerId) {
            _get(SpeedUpMazeItem.prototype.__proto__ || Object.getPrototypeOf(SpeedUpMazeItem.prototype), "triggerPickup", this).call(this, playerId);
            this.game.powerUps.activatePowerUp(_PowerUpConstants.PowerUpKey.SPEED_UP);
        }
    }], [{
        key: "getItemSpawnProbability",
        value: function getItemSpawnProbability(game) {
            var useNextLevel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var upgradeLevel = game.upgrades.getUpgradeLevel(_UpgradeConstants.UpgradeKey.SPEED_UP_SPAWN_RATE, false, useNextLevel);
            return _ItemConstants.SPEED_UP_MAZE_ITEM_SPAWN_BASE_PROBABILITY + _ItemConstants.SPEED_UP_MAZE_ITEM_SPAWN_BASE_INCREASE_AMOUNT * upgradeLevel;
        }
    }, {
        key: "getTooltipText",
        value: function getTooltipText(game) {
            var speedUpMultiplier = game.upgrades.getUpgradeValue(_UpgradeConstants.UpgradeKey.SPEED_UP_MULTIPLIER_STRENGTH);
            var speedUpDuration = game.upgrades.getUpgradeValue(_UpgradeConstants.UpgradeKey.SPEED_UP_DURATION);
            var spawnRate = SpeedUpMazeItem.getItemSpawnProbability(game);
            return "The speed up item will increase the speed of all your bots by " + speedUpMultiplier + "x." + ("<br><br>Spawn rate: " + _UserInterface.UserInterface.getDecimalPrettyPrintNumber(spawnRate * 100, 2) + "% per tile") + ("<br>Duration: " + _UserInterface.UserInterface.getPrettyPrintNumber(speedUpDuration / 1000) + "s");
        }
    }]);

    return SpeedUpMazeItem;
}(_MazeItem2.MazeItem);

},{"../../constants/ItemConstants":9,"../../constants/PowerUpConstants":10,"../../constants/UpgradeConstants":13,"../../managers/UserInterface":46,"../../models/Stats":68,"../MazeItem":17}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TileMultiplierMazeItem = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _UpgradeConstants = require("../../constants/UpgradeConstants");

var _ItemConstants = require("../../constants/ItemConstants");

var _MazeItem2 = require("../MazeItem");

var _Stats = require("../../models/Stats");

var _PowerUpConstants = require("../../constants/PowerUpConstants");

var _UserInterface = require("../../managers/UserInterface");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TileMultiplierMazeItem = exports.TileMultiplierMazeItem = function (_MazeItem) {
    _inherits(TileMultiplierMazeItem, _MazeItem);

    function TileMultiplierMazeItem(game, tile, mazeItemKey) {
        _classCallCheck(this, TileMultiplierMazeItem);

        return _possibleConstructorReturn(this, (TileMultiplierMazeItem.__proto__ || Object.getPrototypeOf(TileMultiplierMazeItem)).call(this, game, tile, mazeItemKey, _Stats.StatsKey.TOTAL_TILE_MULTIPLIER_ITEMS_PICKED_UP));
    }

    _createClass(TileMultiplierMazeItem, [{
        key: "triggerPickup",
        value: function triggerPickup(playerId) {
            _get(TileMultiplierMazeItem.prototype.__proto__ || Object.getPrototypeOf(TileMultiplierMazeItem.prototype), "triggerPickup", this).call(this, playerId);
            this.game.powerUps.activatePowerUp(_PowerUpConstants.PowerUpKey.TILE_MULTIPLIER);
        }
    }], [{
        key: "getItemSpawnProbability",
        value: function getItemSpawnProbability(game) {
            var useNextLevel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var upgradeLevel = game.upgrades.getUpgradeLevel(_UpgradeConstants.UpgradeKey.TILE_MULTIPLIER_SPAWN_RATE, false, useNextLevel);
            return _ItemConstants.TILE_MULTIPLIER_MAZE_ITEM_SPAWN_BASE_PROBABILITY + _ItemConstants.TILE_MULTIPLIER_MAZE_ITEM_SPAWN_BASE_INCREASE_PROBABILITY * upgradeLevel;
        }
    }, {
        key: "getTooltipText",
        value: function getTooltipText(game) {
            var multplierAmount = game.upgrades.getUpgradeValue(_UpgradeConstants.UpgradeKey.TILE_MULTIPLIER_STRENGTH);
            var tileMultiplierDuration = game.upgrades.getUpgradeValue(_UpgradeConstants.UpgradeKey.TILE_MULTIPLIER_DURATION);
            var spawnRate = TileMultiplierMazeItem.getItemSpawnProbability(game);
            return "The tile multiplier item will multiply the points earned from tile visits by " + multplierAmount + "x amount (upgradeable)." + ("<br><br>Spawn Rate: " + _UserInterface.UserInterface.getDecimalPrettyPrintNumber(spawnRate * 100, 2) + "% per tile.") + ("<br>Duration: " + _UserInterface.UserInterface.getPrettyPrintNumber(tileMultiplierDuration / 1000) + "s");
        }
    }]);

    return TileMultiplierMazeItem;
}(_MazeItem2.MazeItem);

},{"../../constants/ItemConstants":9,"../../constants/PowerUpConstants":10,"../../constants/UpgradeConstants":13,"../../managers/UserInterface":46,"../../models/Stats":68,"../MazeItem":17}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UnlimitedSplitsItem = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _ItemConstants = require("../../constants/ItemConstants");

var _MazeItem2 = require("../MazeItem");

var _Stats = require("../../models/Stats");

var _UserInterface = require("../../managers/UserInterface");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UnlimitedSplitsItem = exports.UnlimitedSplitsItem = function (_MazeItem) {
    _inherits(UnlimitedSplitsItem, _MazeItem);

    function UnlimitedSplitsItem(game, tile, mazeItemKey) {
        _classCallCheck(this, UnlimitedSplitsItem);

        return _possibleConstructorReturn(this, (UnlimitedSplitsItem.__proto__ || Object.getPrototypeOf(UnlimitedSplitsItem)).call(this, game, tile, mazeItemKey, _Stats.StatsKey.TOTAL_UNLIMITED_SPLITS_ITEMS_PICKED_UP));
    }

    _createClass(UnlimitedSplitsItem, [{
        key: "triggerPickup",
        value: function triggerPickup(playerId) {
            _get(UnlimitedSplitsItem.prototype.__proto__ || Object.getPrototypeOf(UnlimitedSplitsItem.prototype), "triggerPickup", this).call(this, playerId);
            var player = this.game.players.getPlayer(playerId);
            if (player) {
                player.setIsUnlimitedSplitItemActive(true);
            }
        }
    }], [{
        key: "getItemSpawnProbability",
        value: function getItemSpawnProbability() {
            return _ItemConstants.UNLIMITED_SPLITS_PROBABILITY;
        }
    }, {
        key: "getTooltipText",
        value: function getTooltipText(game) {
            var spawnRate = UnlimitedSplitsItem.getItemSpawnProbability();
            return "The unlimited splits item will allow your bot and all subsequent splits to continue splitting endlessly." + ("<br><br>Spawn Rate: " + _UserInterface.UserInterface.getDecimalPrettyPrintNumber(spawnRate * 100, 2) + "% per tile");
        }
    }]);

    return UnlimitedSplitsItem;
}(_MazeItem2.MazeItem);

},{"../../constants/ItemConstants":9,"../../managers/UserInterface":46,"../../models/Stats":68,"../MazeItem":17}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AccumulatorManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AccumulatorConstants = require("../constants/AccumulatorConstants");

var _WallPhasingAccumulator = require("../accumulators/WallPhasingAccumulator");

var _DestructibleWallPhasingAccumulator = require("../accumulators/DestructibleWallPhasingAccumulator");

var _UiIdConstants = require("../constants/UiIdConstants");

var _UserInterface = require("./UserInterface");

var _UpgradeConstants = require("../constants/UpgradeConstants");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AccumulatorManager = exports.AccumulatorManager = function () {
    function AccumulatorManager(game) {
        _classCallCheck(this, AccumulatorManager);

        this.game = game;
        this.accumulatorMap = new Map();
    }

    _createClass(AccumulatorManager, [{
        key: "initAccumulators",
        value: function initAccumulators() {
            for (var accumulatorKey in _AccumulatorConstants.AccumulatorKey) {
                this.createAccumulator(accumulatorKey);
            }
        }
    }, {
        key: "updateUiForAllAccumulators",
        value: function updateUiForAllAccumulators() {
            for (var accumulatorKey in _AccumulatorConstants.AccumulatorKey) {
                this.accumulatorMap.get(accumulatorKey).updateUi();
            }
        }
    }, {
        key: "createAccumulator",
        value: function createAccumulator(accumulatorKey) {
            if (accumulatorKey === _AccumulatorConstants.AccumulatorKey.WALL_PHASING_KEY) {
                this.accumulatorMap.set(accumulatorKey, new _WallPhasingAccumulator.WallPhasingAccumulator(this.game, _AccumulatorConstants.AccumulatorKey.WALL_PHASING_KEY));
            } else if (accumulatorKey === _AccumulatorConstants.AccumulatorKey.DESCTRUCTIBLE_WALL_PHASING_KEY) {
                this.accumulatorMap.set(accumulatorKey, new _DestructibleWallPhasingAccumulator.DestructibleWallPhasingAccumulator(this.game, _AccumulatorConstants.AccumulatorKey.WALL_PHASING_KEY));
            } else {
                console.error("Failed to create accumulator type.  No valid type: " + accumulatorKey + ".'");
                return;
            }
        }
    }, {
        key: "isAccumulatorUnlocked",
        value: function isAccumulatorUnlocked(accumulatorKey) {
            return this.accumulatorMap.get(accumulatorKey).isUnlocked();
        }
    }, {
        key: "updateAccumulatorKey",
        value: function updateAccumulatorKey(accumulatorKey) {
            if (this.isAccumulatorUnlocked(accumulatorKey)) {
                this.accumulatorMap.get(accumulatorKey).activateAccumlatorTimer();
            }
        }
    }, {
        key: "canConsumeUnit",
        value: function canConsumeUnit(accumulatorKey) {
            var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

            return this.isAccumulatorUnlocked(accumulatorKey) && this.accumulatorMap.get(accumulatorKey).canConsumeUnit(count);
        }
    }, {
        key: "consumeUnit",
        value: function consumeUnit(accumulatorKey) {
            var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

            if (this.canConsumeUnit(accumulatorKey, count)) {
                this.accumulatorMap.get(accumulatorKey).consumeUnit(count);
            }
        }
    }, {
        key: "initHoverEvent",
        value: function initHoverEvent() {
            var _this = this;

            // Wall phasing icon tooltip
            $("#" + _UiIdConstants.ICON_WALL_PHASING_IMG_UI_ID).hover(function () {
                var totalStorage = _this.game.upgrades.getUpgradeValue(_UpgradeConstants.UpgradeKey.PLAYER_WALL_PHASING_TOTAL_UPGRADE);
                var frequency = _this.game.upgrades.getUpgradeValue(_UpgradeConstants.UpgradeKey.PLAYER_WALL_PHASING_FREQUENCY_UPGRADE);
                // Start hover
                var tooltipText = "Wall phasing storage: This allows user to manually walk through walls." + ("<br><br>Max Storage: " + totalStorage) + ("<br>Accumulating frequency: " + _UserInterface.UserInterface.getDecimalPrettyPrintNumber(frequency / 1000, 1) + "s");
                _UserInterface.UserInterface.setHtml(_UiIdConstants.ICON_WALL_PHASING_IMG_TOOLTIP_UI_ID, tooltipText);
                _UserInterface.UserInterface.setIdVisible(_UiIdConstants.ICON_WALL_PHASING_IMG_TOOLTIP_UI_ID, true);
            }, function () {
                // End-hover
                _UserInterface.UserInterface.setIdVisible(_UiIdConstants.ICON_WALL_PHASING_IMG_TOOLTIP_UI_ID, false);
            });
            // Desctructible wall phasing icon tooltip
            $("#" + _UiIdConstants.ICON_DESTRUCTIBLE_WALL_PHASING_IMG_UI_ID).hover(function () {
                var totalStorage = _this.game.upgrades.getUpgradeValue(_UpgradeConstants.UpgradeKey.DESTRUCTIBLE_WALL_PHASING_TOTAL_UPGRADE);
                var frequency = _this.game.upgrades.getUpgradeValue(_UpgradeConstants.UpgradeKey.DESTRUCTIBLE_WALL_PHASING_FREQUENCY_UPGRADE);
                // Start hover
                var tooltipText = "Destructible wall phasing storage: This allows bots to pass through destructible walls without backtracking." + ("<br><br>Max Storage: " + totalStorage) + ("<br>Accumulating frequency: " + _UserInterface.UserInterface.getDecimalPrettyPrintNumber(frequency / 1000, 1) + "s");
                _UserInterface.UserInterface.setHtml(_UiIdConstants.ICON_DESTRUCTIBLE_WALL_PHASING_IMG_TOOLTIP_UI_ID, tooltipText);
                _UserInterface.UserInterface.setIdVisible(_UiIdConstants.ICON_DESTRUCTIBLE_WALL_PHASING_IMG_TOOLTIP_UI_ID, true);
            }, function () {
                // End-hover
                _UserInterface.UserInterface.setIdVisible(_UiIdConstants.ICON_DESTRUCTIBLE_WALL_PHASING_IMG_TOOLTIP_UI_ID, false);
            });
        }
    }]);

    return AccumulatorManager;
}();

},{"../accumulators/DestructibleWallPhasingAccumulator":3,"../accumulators/WallPhasingAccumulator":4,"../constants/AccumulatorConstants":5,"../constants/UiIdConstants":12,"../constants/UpgradeConstants":13,"./UserInterface":46}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BiomeManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BiomeConstants = require("../constants/BiomeConstants");

var _ItemConstants = require("../constants/ItemConstants");

var _UpgradeConstants = require("../constants/UpgradeConstants");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BiomeManager = exports.BiomeManager = function () {
    function BiomeManager(game) {
        _classCallCheck(this, BiomeManager);

        this.game = game;
    }

    _createClass(BiomeManager, [{
        key: "getCurrentBiomeKey",
        value: function getCurrentBiomeKey() {
            var biomeLevel = this.game.upgrades.getUpgradeLevel(_UpgradeConstants.UpgradeKey.BIOME, false);
            return biomeLevel;
        }
    }, {
        key: "getPreviousBiomeKey",
        value: function getPreviousBiomeKey() {
            var biomeLevel = this.game.upgrades.getUpgradeLevel(_UpgradeConstants.UpgradeKey.BIOME, false) - 1;
            return biomeLevel;
        }
    }, {
        key: "getNextBiomeKey",
        value: function getNextBiomeKey() {
            var nextBiomeLevel = this.game.upgrades.getUpgradeLevel(_UpgradeConstants.UpgradeKey.BIOME, false) + 1;
            return nextBiomeLevel;
        }
    }, {
        key: "isMazeItemUnlocked",
        value: function isMazeItemUnlocked(itemKey) {
            if (itemKey === _ItemConstants.MazeItemKey.KEY) {
                return this.game.mazeRequirements.hasMazeKeysFoundRequirement();
            }
            // Assume unlocked if unlisted.
            return _ItemConstants.BIOME_ITEM_UNLOCKS.has(itemKey) ? this.isBiomeKeyUnlocked(_ItemConstants.BIOME_ITEM_UNLOCKS.get(itemKey)) : true;
        }
    }, {
        key: "isUpgradeUnlocked",
        value: function isUpgradeUnlocked(upgradeKey) {
            // Assume unlocked if unlisted.
            return _BiomeConstants.BIOME_UPGRADE_UNLOCKS.has(upgradeKey) ? this.isBiomeKeyUnlocked(_BiomeConstants.BIOME_UPGRADE_UNLOCKS.get(upgradeKey)) : true;
        }
    }, {
        key: "isBiomeKeyUnlocked",
        value: function isBiomeKeyUnlocked(biomeKey) {
            var currentBiomeKey = this.getCurrentBiomeKey();
            return currentBiomeKey >= biomeKey;
        }
    }, {
        key: "getItemsUnlockBiomeKey",
        value: function getItemsUnlockBiomeKey(itemKey) {
            return _ItemConstants.BIOME_ITEM_UNLOCKS.has(itemKey) ? _ItemConstants.BIOME_ITEM_UNLOCKS.get(itemKey) : 0;
        }
        // Get the number of biomes that a particular item has been unlocked for.

    }, {
        key: "getItemUnlockBiomeDiffCount",
        value: function getItemUnlockBiomeDiffCount(itemKey) {
            return this.getCurrentBiomeKey() - this.getItemsUnlockBiomeKey(itemKey);
        }
    }, {
        key: "getUpgradeUnlockBiomeDiffCount",
        value: function getUpgradeUnlockBiomeDiffCount(upgradeKey) {
            return this.getCurrentBiomeKey() - _BiomeConstants.BIOME_UPGRADE_UNLOCKS.get(upgradeKey);
        }
    }, {
        key: "isUpgradeUnlockedInCurrentBiome",
        value: function isUpgradeUnlockedInCurrentBiome(upgradeKey) {
            return _BiomeConstants.BIOME_UPGRADE_UNLOCKS.get(upgradeKey) === this.getCurrentBiomeKey();
        }
    }]);

    return BiomeManager;
}();

},{"../constants/BiomeConstants":6,"../constants/ItemConstants":9,"../constants/UpgradeConstants":13}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ColorManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BiomeConstants = require("../constants/BiomeConstants");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ColorManager = exports.ColorManager = function () {
    function ColorManager(game) {
        _classCallCheck(this, ColorManager);

        this.game = game;
    }

    _createClass(ColorManager, [{
        key: "getBiomeColorPalette",
        value: function getBiomeColorPalette() {
            var currentBiome = this.game.biomes.getCurrentBiomeKey();
            return (0, _BiomeConstants.getBiomeColorPalette)(currentBiome);
        }
    }, {
        key: "getPlayerColor",
        value: function getPlayerColor() {
            return this.getBiomeColorPalette().playerColor;
        }
    }, {
        key: "getBotColor",
        value: function getBotColor() {
            return this.getBiomeColorPalette().botColor;
        }
    }, {
        key: "getTileColor",
        value: function getTileColor() {
            return this.getBiomeColorPalette().tileColor;
        }
    }, {
        key: "getVisitedTileColor",
        value: function getVisitedTileColor() {
            return this.getBiomeColorPalette().visitedTileColor;
        }
    }, {
        key: "getMazeWallColor",
        value: function getMazeWallColor() {
            return this.getBiomeColorPalette().mazeWallColor;
        }
    }, {
        key: "getDeadEndTileColor",
        value: function getDeadEndTileColor() {
            return this.getBiomeColorPalette().deadEndColor;
        }
    }, {
        key: "getUnlimitedSplitPlayerColor",
        value: function getUnlimitedSplitPlayerColor() {
            return this.getBiomeColorPalette().unlimitedSplitBotPlayerColor;
        }
    }, {
        key: "getGhostItemPlayerColor",
        value: function getGhostItemPlayerColor() {
            return this.getBiomeColorPalette().ghostItemPlayerColor;
        }
    }]);

    return ColorManager;
}();

},{"../constants/BiomeConstants":6}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DevManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _devUtils = require("../dev/devUtils");

var _speedRunUtils = require("../utils/speedRunUtils");

var _UserInterface = require("./UserInterface");

var _RNGBotManager = require("./RNGBotManager");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DevManager = exports.DevManager = function () {
    function DevManager(isDisableUi, isDevMode, game) {
        _classCallCheck(this, DevManager);

        this._isDisableUi = isDisableUi;
        this._isDevMode = isDevMode;
        this.game = game;
        _UserInterface.UserInterface.setIdVisible(_devUtils.DEV_ROOT_PANEL_UI_ID, this.isDevMode());
    }

    _createClass(DevManager, [{
        key: "isDevMode",
        value: function isDevMode() {
            return this._isDevMode;
        }
    }, {
        key: "isDisableUi",
        value: function isDisableUi() {
            return this._isDisableUi;
        }
    }, {
        key: "shouldSpeedRunAutoPurchase",
        value: function shouldSpeedRunAutoPurchase() {
            return _UserInterface.UserInterface.isCheckBoxChecked(_devUtils.DEV_SPEED_RUN_AUTO_PURCHASE_CHECKBOX_UI_ID);
        }
    }, {
        key: "isSpeedRunEnabled",
        value: function isSpeedRunEnabled() {
            return _speedRunUtils.IS_SPEED_RUN_ENABLED;
        }
        // This is the ratio of how much faster the speed run is than normal.  Multiply your normal timers by this ratio when in speed run mode.

    }, {
        key: "getSpeedRunSpeedRatio",
        value: function getSpeedRunSpeedRatio() {
            return 1 / (this.game.rngBot.getBotMoveInterval(false, true) / _RNGBotManager.DEV_MODE_MOVEMENT_SPEED);
        }
    }]);

    return DevManager;
}();

},{"../dev/devUtils":15,"../utils/speedRunUtils":119,"./RNGBotManager":41,"./UserInterface":46}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ExperimentManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ExperimentConstants = require("../constants/ExperimentConstants");

var _Serializable2 = require("../models/Serializable");

var _UserInterface = require("./UserInterface");

var _UiIdConstants = require("../constants/UiIdConstants");

var _BiomeConstants = require("../constants/BiomeConstants");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SERIALIZABLE_PROPERTIES = ['experimentMap'];
//TODO: we need an unlock for this.

var ExperimentManager = exports.ExperimentManager = function (_Serializable) {
    _inherits(ExperimentManager, _Serializable);

    function ExperimentManager(game) {
        _classCallCheck(this, ExperimentManager);

        var _this = _possibleConstructorReturn(this, (ExperimentManager.__proto__ || Object.getPrototypeOf(ExperimentManager)).call(this, SERIALIZABLE_PROPERTIES));

        _this.game = game;
        return _this;
    }

    _createClass(ExperimentManager, [{
        key: "initExperimentMaps",
        value: function initExperimentMaps() {
            this.experimentMap = new Map();
        }
    }, {
        key: "initExperiments",
        value: function initExperiments() {
            if (this.game.dev.isDisableUi()) return;
            this.initCheckBoxStates();
            this.initDropDownSelectorStates();
        }
    }, {
        key: "initCheckBoxStates",
        value: function initCheckBoxStates() {
            for (var experimentKey in _ExperimentConstants.ExperimentKey) {
                var uiId = (0, _ExperimentConstants.getExperimentKeyUiId)(experimentKey);
                var isChecked = this.experimentMap.get(experimentKey) || false;
                _UserInterface.UserInterface.setCheckBoxState(uiId, isChecked);
            }
        }
    }, {
        key: "initDropDownSelectorStates",
        value: function initDropDownSelectorStates() {
            _UserInterface.UserInterface.setOptionsForSelector((0, _ExperimentConstants.getExperimentMazeGridTypesList)(), _UiIdConstants.EXPERIMENT_MAZE_GRID_TYPE_SELECTOR_UI_ID);
            _UserInterface.UserInterface.setOptionsForSelector((0, _ExperimentConstants.getExperimentMazeGridAlgorithmList)(), _UiIdConstants.EXPERIMENT_MAZE_GRID_ALGORITHM_SELECTOR_UI_ID);
            this.updateMazeTierSizeSelector();
        }
    }, {
        key: "setMazeTileCountText",
        value: function setMazeTileCountText() {
            _UserInterface.UserInterface.setText(_UiIdConstants.EXPERIMENT_TILE_COUNT_UI_ID, this.game.maze.getGrid().getTileCount().toString());
        }
    }, {
        key: "updateMazeTierSizeSelector",
        value: function updateMazeTierSizeSelector() {
            var mazeGridType = (0, _BiomeConstants.getBiomeMazeConfig)(this.game, this.game.biomes.getCurrentBiomeKey(), true).mazeGridType;
            var mazeGridSizes = (0, _ExperimentConstants.getMazeGridSizeSelectorList)(mazeGridType);
            _UserInterface.UserInterface.setOptionsForSelector(mazeGridSizes, _UiIdConstants.EXPERIMENT_MAZE_GRID_SIZE_SELECTOR_UI_ID);
        }
    }, {
        key: "isExperimentEnabled",
        value: function isExperimentEnabled(experimentKey) {
            return this.isExperimentChecked(experimentKey);
        }
    }, {
        key: "isExperimentChecked",
        value: function isExperimentChecked(experimentKey) {
            var experimentCheckboxUiId = (0, _ExperimentConstants.getExperimentKeyUiId)(experimentKey);
            return experimentCheckboxUiId ? _UserInterface.UserInterface.isCheckBoxChecked(experimentCheckboxUiId) : false;
        }
    }, {
        key: "getMazeGridTypeOverride",
        value: function getMazeGridTypeOverride() {
            var selectedVal = _UserInterface.UserInterface.getSelectorSelectedValue(_UiIdConstants.EXPERIMENT_MAZE_GRID_TYPE_SELECTOR_UI_ID);
            return selectedVal == _ExperimentConstants.SELECTOR_BIOME_DEFAULT ? null : selectedVal;
        }
    }, {
        key: "getMazeGridSizeOverride",
        value: function getMazeGridSizeOverride() {
            var selectedVal = _UserInterface.UserInterface.getSelectorSelectedValue(_UiIdConstants.EXPERIMENT_MAZE_GRID_SIZE_SELECTOR_UI_ID);
            return selectedVal == _ExperimentConstants.SELECTOR_BIOME_DEFAULT ? null : parseInt(selectedVal);
        }
    }, {
        key: "getMazeGridAlgorithmOverride",
        value: function getMazeGridAlgorithmOverride() {
            var selectedVal = _UserInterface.UserInterface.getSelectorSelectedValue(_UiIdConstants.EXPERIMENT_MAZE_GRID_ALGORITHM_SELECTOR_UI_ID);
            return selectedVal == _ExperimentConstants.SELECTOR_BIOME_DEFAULT ? null : selectedVal;
        }
    }, {
        key: "getAllExperimentUiIds",
        value: function getAllExperimentUiIds() {
            var experimentUiIds = [];
            for (var experimentKey in _ExperimentConstants.ExperimentKey) {
                experimentUiIds.push((0, _ExperimentConstants.getExperimentKeyUiId)(experimentKey));
            }
            return experimentUiIds;
        }
    }, {
        key: "persistExperimentToggleState",
        value: function persistExperimentToggleState() {
            for (var experimentKey in _ExperimentConstants.ExperimentKey) {
                var isChecked = this.isExperimentChecked(experimentKey);
                this.experimentMap.set(experimentKey, isChecked);
            }
        }
    }]);

    return ExperimentManager;
}(_Serializable2.Serializable);

},{"../constants/BiomeConstants":6,"../constants/ExperimentConstants":8,"../constants/UiIdConstants":12,"../models/Serializable":67,"./UserInterface":46}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.globalGame = exports.CURRENT_GAME_VERSION = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _devUtils = require("../dev/devUtils");

var _AccumulatorManager = require("./AccumulatorManager");

var _MazeManager = require("./MazeManager");

var _PointsManager = require("./PointsManager");

var _RNGBotManager = require("./RNGBotManager");

var _UserInterface = require("./UserInterface");

var _UpgradeManager = require("./UpgradeManager");

var _Serializable2 = require("../models/Serializable");

var _DevManager = require("./DevManager");

var _ExperimentManager = require("./ExperimentManager");

var _SaveManager = require("./SaveManager");

var _PlayerManager = require("./PlayerManager");

var _MazeItemManager = require("./MazeItemManager");

var _MazeRequirementsManager = require("./MazeRequirementsManager");

var _StatsManager = require("./StatsManager");

var _BiomeManager = require("./BiomeManager");

var _ColorManager = require("./ColorManager");

var _OfflineManager = require("./OfflineManager");

var _ToggleManager = require("./ToggleManager");

var _PowerUpManager = require("./PowerUpManager");

var _Stats = require("../models/Stats");

var _upgradeUtils = require("../utils/upgradeUtils");

var _speedRunUtils = require("../utils/speedRunUtils");

var _versionUtils = require("../utils/versionUtils");

var _analyticsUtils = require("../utils/analyticsUtils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SERIALIZABLE_PROPERTIES = ['saveGameVersion', 'points', 'upgrades', 'stats', 'offline', 'experiment', 'toggles'];
var CURRENT_GAME_VERSION = exports.CURRENT_GAME_VERSION = "0.2.0";

var Game = function (_Serializable) {
    _inherits(Game, _Serializable);

    function Game() {
        var isDisableUi = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var isDevMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        _classCallCheck(this, Game);

        var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, SERIALIZABLE_PROPERTIES));

        _this.dev = new _DevManager.DevManager(isDisableUi, isDevMode, _this);
        _this.accumulators = new _AccumulatorManager.AccumulatorManager(_this);
        _this.biomes = new _BiomeManager.BiomeManager(_this);
        _this.colors = new _ColorManager.ColorManager(_this);
        _this.experiment = new _ExperimentManager.ExperimentManager(_this);
        _this.items = new _MazeItemManager.MazeItemManager(_this);
        _this.maze = new _MazeManager.MazeManager(_this);
        _this.mazeRequirements = new _MazeRequirementsManager.MazeRequirementsManager(_this);
        _this.offline = new _OfflineManager.OfflineManager(_this);
        _this.points = new _PointsManager.Points(_this);
        _this.players = new _PlayerManager.PlayerManager(_this);
        _this.powerUps = new _PowerUpManager.PowerUpManager(_this);
        _this.rngBot = new _RNGBotManager.RNGBotManager(_this);
        _this.save = new _SaveManager.SaveManager(_this);
        _this.stats = new _StatsManager.StatsManager(_this);
        _this.toggles = new _ToggleManager.ToggleManager(_this);
        _this.ui = new _UserInterface.UserInterface(_this);
        _this.upgrades = new _UpgradeManager.UpgradeManager(_this);
        _this.initManagerMaps();
        _this.updateAllUi();
        _this.ui.init();
        _this.accumulators.initHoverEvent();
        return _this;
    }

    _createClass(Game, [{
        key: "hardResetGame",
        value: function hardResetGame() {
            this.save.clearLocalStorage();
            this.resetGame();
            this.maze = new _MazeManager.MazeManager(this);
            this.points.resetPoints();
            this.initManagerMaps();
            this.toggles.initCheckBoxStates();
            this.experiment.initExperiments();
            this.startGame();
            this.save.enableSaveTimer();
            this.stats.startGamePlayedTicker();
        }
    }, {
        key: "reloadFromLocalStorage",
        value: function reloadFromLocalStorage() {
            this.save.loadGameSaveFromLocalStorage();
            console.info("Save game version: " + this.saveGameVersion);
            if ((0, _versionUtils.isNewMinorVersion)(this.saveGameVersion, CURRENT_GAME_VERSION)) {
                this.ui.showModalByType(_UserInterface.ModalType.SAVE_VERSION_WARNING_MODAL);
                this.initGameVersion();
                console.info("Current game version: " + this.saveGameVersion);
            }
            this.resetGame();
            // These rely on local storage states
            this.toggles.initCheckBoxStates();
            this.experiment.initExperiments();
            this.startGame();
            this.save.enableSaveTimer();
            this.stats.startGamePlayedTicker();
            this.upgrades.hideAllUpgradeNewTextForUnlockedUpgrades();
        }
    }, {
        key: "startGame",
        value: function startGame() {
            this.updateAllUi();
            this.players.resetAllPlayers();
            this.ui.deleteMaze();
            this.maze.newMaze();
            this.items.updateIconPanelDisplay();
            this.ui.printMazeV2();
            this.mazeRequirements.updateMazeCompletionUi();
            this.players.createDefaultPlayer();
            this.rngBot.enableGlobalRngBot();
        }
    }, {
        key: "completeMaze",
        value: function completeMaze() {
            var playerId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            this.rngBot.disableGlobalMovement();
            this.players.resetAllPlayers();
            this.points.addMazeCompletionBonus(playerId);
            this.stats.addStatsToKey(1, _Stats.StatsKey.TOTAL_MAZES_COMPLETED);
            this.stats.addAverageStatValue(this.maze.getGrid().getTileVisitedPercentage(), _Stats.StatsKey.TOTAL_MAZES_COMPLETED, _Stats.StatsKey.TOTAL_PERCENT_MAZE_VISITED_AVERAGE);
            this.stats.clearCurrentMazeStats();
            (0, _analyticsUtils.emitMazeCompletedEvent)(this);
            if (_speedRunUtils.IS_SPEED_RUN_ENABLED) {
                if (this.dev.shouldSpeedRunAutoPurchase()) {
                    (0, _upgradeUtils.autoPurchaseBiomeUpgrades)(this);
                }
                (0, _speedRunUtils.updateSpeedRunDataOnMazeCompletion)(this);
                return;
            }
            this.startGame();
        }
    }, {
        key: "resetGame",
        value: function resetGame() {
            this.rngBot.disableGlobalMovement();
            this.rngBot.disableReEnableBotMovementTimer();
            this.players.resetAllPlayers();
        }
    }, {
        key: "initManagerMaps",
        value: function initManagerMaps() {
            this.upgrades.initUpgrades();
            this.accumulators.initAccumulators();
            this.stats.initStatsMap();
            this.experiment.initExperimentMaps();
            this.toggles.initToggleMap();
        }
    }, {
        key: "updateAllUi",
        value: function updateAllUi() {
            if (this.dev.isDisableUi()) return;
            this.upgrades.updateAllUpgradeUi();
            this.accumulators.updateUiForAllAccumulators();
            this.powerUps.updateAllPowerUpsUi();
            this.ui.updateAllStatsKey();
        }
    }, {
        key: "initGameVersion",
        value: function initGameVersion() {
            this.saveGameVersion = CURRENT_GAME_VERSION;
        }
    }]);

    return Game;
}(_Serializable2.Serializable);

exports.default = Game;
var globalGame = exports.globalGame = undefined;
$(document).ready(function () {
    exports.globalGame = globalGame = new Game(_devUtils.IS_DEV_MODE_DISABLE_UI, _devUtils.IS_DEV_MODE_ENABLED);
    globalGame.reloadFromLocalStorage();
});

},{"../dev/devUtils":15,"../models/Serializable":67,"../models/Stats":68,"../utils/analyticsUtils":116,"../utils/speedRunUtils":119,"../utils/upgradeUtils":121,"../utils/versionUtils":122,"./AccumulatorManager":27,"./BiomeManager":28,"./ColorManager":29,"./DevManager":30,"./ExperimentManager":31,"./MazeItemManager":33,"./MazeManager":34,"./MazeRequirementsManager":35,"./OfflineManager":37,"./PlayerManager":38,"./PointsManager":39,"./PowerUpManager":40,"./RNGBotManager":41,"./SaveManager":42,"./StatsManager":43,"./ToggleManager":44,"./UpgradeManager":45,"./UserInterface":46}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MazeItemManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ItemConstants = require("../constants/ItemConstants");

var _UnlimitedSplitsItem = require("../items/definitions/UnlimitedSplitsItem");

var _BlackHoleMazeItem = require("../items/definitions/BlackHoleMazeItem");

var _BrainMazeItem = require("../items/definitions/BrainMazeItem");

var _DeadEndMazeItem = require("../items/definitions/DeadEndMazeItem");

var _FruitMazeItem = require("../items/definitions/FruitMazeItem");

var _GhostMazeItem = require("../items/definitions/GhostMazeItem");

var _KeyMazeItem = require("../items/definitions/KeyMazeItem");

var _SpeedUpMazeItem = require("../items/definitions/SpeedUpMazeItem");

var _TileMultiplierMazeItem = require("../items/definitions/TileMultiplierMazeItem");

var _ExperimentConstants = require("../constants/ExperimentConstants");

var _MazeUtils = require("./MazeUtils");

var _UserInterface = require("./UserInterface");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MazeItemManager = exports.MazeItemManager = function () {
    function MazeItemManager(game) {
        _classCallCheck(this, MazeItemManager);

        this.game = game;
        this.initIconPanelHoverEvents();
    }

    _createClass(MazeItemManager, [{
        key: "isMazeItemUnlocked",
        value: function isMazeItemUnlocked(mazeItemKey) {
            return this.game.biomes.isMazeItemUnlocked(mazeItemKey) || this.game.experiment.isExperimentEnabled(_ExperimentConstants.ExperimentKey.UNLOCK_ALL_ITEMS);
        }
    }, {
        key: "getAllUnlockedMazeItemKeys",
        value: function getAllUnlockedMazeItemKeys() {
            var unlockedMazeItemKeys = [];
            for (var mazeItemKey in _ItemConstants.MazeItemKey) {
                if (this.isMazeItemUnlocked(mazeItemKey)) {
                    unlockedMazeItemKeys.push(mazeItemKey);
                }
            }
            return unlockedMazeItemKeys;
        }
    }, {
        key: "getMazeItemSpawnProbability",
        value: function getMazeItemSpawnProbability(mazeItemKey) {
            if (mazeItemKey === _ItemConstants.MazeItemKey.FRUIT) {
                return _FruitMazeItem.FruitMazeItem.getItemSpawnProbability(this.game);
            } else if (mazeItemKey === _ItemConstants.MazeItemKey.BRAIN) {
                return _BrainMazeItem.BrainMazeItem.getItemSpawnProbability(this.game);
            } else if (mazeItemKey === _ItemConstants.MazeItemKey.PORTAL) {
                return _BlackHoleMazeItem.PortalMazeItem.getItemSpawnProbability(this.game);
            } else if (mazeItemKey === _ItemConstants.MazeItemKey.DESTRUCTIBLE_WALL) {
                // Spawns are handled independently during maze generation.
                return 0;
            } else if (mazeItemKey === _ItemConstants.MazeItemKey.UNLIMITED_SPLITS) {
                return _UnlimitedSplitsItem.UnlimitedSplitsItem.getItemSpawnProbability();
            } else if (mazeItemKey === _ItemConstants.MazeItemKey.GHOST) {
                return _GhostMazeItem.GhostMazeItem.getItemSpawnProbability();
            } else if (mazeItemKey === _ItemConstants.MazeItemKey.DEAD_END) {
                return _DeadEndMazeItem.DeadEndMazeItem.getItemSpawnProbability(this.game);
            } else if (mazeItemKey === _ItemConstants.MazeItemKey.KEY) {
                return _KeyMazeItem.KeyMazeItem.getItemSpawnProbability(this.game);
            } else if (mazeItemKey === _ItemConstants.MazeItemKey.SPEED_UP) {
                return _SpeedUpMazeItem.SpeedUpMazeItem.getItemSpawnProbability(this.game);
            } else if (mazeItemKey === _ItemConstants.MazeItemKey.TILE_MULTIPLIER) {
                return _TileMultiplierMazeItem.TileMultiplierMazeItem.getItemSpawnProbability(this.game);
            } else {
                console.error('Failed to create maze item of type.  No valid type: ' + mazeItemKey);
                return 0;
            }
        }
    }, {
        key: "getMazeItemTooltipText",
        value: function getMazeItemTooltipText(mazeItemKey) {
            if (mazeItemKey === _ItemConstants.MazeItemKey.FRUIT) {
                return _FruitMazeItem.FruitMazeItem.getTooltipText(this.game);
            } else if (mazeItemKey === _ItemConstants.MazeItemKey.BRAIN) {
                return _BrainMazeItem.BrainMazeItem.getTooltipText(this.game);
            } else if (mazeItemKey === _ItemConstants.MazeItemKey.PORTAL) {
                return _BlackHoleMazeItem.PortalMazeItem.getTooltipText(this.game);
            } else if (mazeItemKey === _ItemConstants.MazeItemKey.UNLIMITED_SPLITS) {
                return _UnlimitedSplitsItem.UnlimitedSplitsItem.getTooltipText(this.game);
            } else if (mazeItemKey === _ItemConstants.MazeItemKey.GHOST) {
                return _GhostMazeItem.GhostMazeItem.getTooltipText();
            } else if (mazeItemKey === _ItemConstants.MazeItemKey.DESTRUCTIBLE_WALL) {
                return this.getDestructibleWallTooltipText();
            } else if (mazeItemKey === _ItemConstants.MazeItemKey.DEAD_END) {
                return _DeadEndMazeItem.DeadEndMazeItem.getTooltipText(this.game);
            } else if (mazeItemKey === _ItemConstants.MazeItemKey.KEY) {
                return _KeyMazeItem.KeyMazeItem.getTooltipText();
            } else if (mazeItemKey === _ItemConstants.MazeItemKey.SPEED_UP) {
                return _SpeedUpMazeItem.SpeedUpMazeItem.getTooltipText(this.game);
            } else if (mazeItemKey === _ItemConstants.MazeItemKey.TILE_MULTIPLIER) {
                return _TileMultiplierMazeItem.TileMultiplierMazeItem.getTooltipText(this.game);
            } else {
                console.error('Failed to get tooltip text for item of type: ' + mazeItemKey);
                return "";
            }
        }
    }, {
        key: "getRandomlySpawnedMazeItemKey",
        value: function getRandomlySpawnedMazeItemKey() {
            var randomNumber = Math.random();
            var totalProb = 0;
            var unlockedMazeItemKeys = this.getAllUnlockedMazeItemKeys();
            // Spawn all items based on probability
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = unlockedMazeItemKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var mazeItemKey = _step.value;

                    totalProb += this.getMazeItemSpawnProbability(mazeItemKey);
                    if (randomNumber < totalProb) {
                        return mazeItemKey;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return null;
        }
    }, {
        key: "createMazeItem",
        value: function createMazeItem(tile, mazeItemKey) {
            var mazeItem = null;
            if (mazeItemKey === _ItemConstants.MazeItemKey.FRUIT) {
                mazeItem = new _FruitMazeItem.FruitMazeItem(this.game, tile, mazeItemKey);
            } else if (mazeItemKey === _ItemConstants.MazeItemKey.BRAIN) {
                mazeItem = new _BrainMazeItem.BrainMazeItem(this.game, tile, mazeItemKey);
            } else if (mazeItemKey === _ItemConstants.MazeItemKey.PORTAL) {
                mazeItem = new _BlackHoleMazeItem.PortalMazeItem(this.game, tile, mazeItemKey);
            } else if (mazeItemKey === _ItemConstants.MazeItemKey.UNLIMITED_SPLITS) {
                mazeItem = new _UnlimitedSplitsItem.UnlimitedSplitsItem(this.game, tile, mazeItemKey);
            } else if (mazeItemKey === _ItemConstants.MazeItemKey.GHOST) {
                mazeItem = new _GhostMazeItem.GhostMazeItem(this.game, tile, mazeItemKey);
            } else if (mazeItemKey === _ItemConstants.MazeItemKey.DEAD_END) {
                mazeItem = new _DeadEndMazeItem.DeadEndMazeItem(this.game, tile, mazeItemKey);
            } else if (mazeItemKey === _ItemConstants.MazeItemKey.KEY) {
                mazeItem = new _KeyMazeItem.KeyMazeItem(this.game, tile, mazeItemKey);
            } else if (mazeItemKey === _ItemConstants.MazeItemKey.SPEED_UP) {
                mazeItem = new _SpeedUpMazeItem.SpeedUpMazeItem(this.game, tile, mazeItemKey);
            } else if (mazeItemKey === _ItemConstants.MazeItemKey.TILE_MULTIPLIER) {
                mazeItem = new _TileMultiplierMazeItem.TileMultiplierMazeItem(this.game, tile, mazeItemKey);
            } else {
                console.error('Failed to create maze item of type.  No valid type: ' + mazeItemKey);
                return;
            }
            if (this.hasMazeItem(tile)) {
                console.error('Cannot create item. Tile is already occupied.');
                return;
            }
            // Apply item to grid cell
            var mazeCell = this.game.maze.getGrid().getCell(tile);
            if (mazeCell) {
                mazeCell.setMazeItem(mazeItem);
            }
        }
    }, {
        key: "getDestructibleWallTooltipText",
        value: function getDestructibleWallTooltipText() {
            var mazeConfig = this.game.maze.getGrid().getMazeConfig();
            var destructibleWallSpawnRate = mazeConfig.mazeObstacles != null ? mazeConfig.mazeObstacles.destructibleWallSpawnRate || 0 : 0;
            return "Destructible walls block pathways temporarily. Bots will destroy them on contact, but must path away from them before passing through." + ("<br><br>Spawn rate: " + _UserInterface.UserInterface.getDecimalPrettyPrintNumber(destructibleWallSpawnRate * 100, 1) + "% per tile connection");
        }
    }, {
        key: "getMazeItem",
        value: function getMazeItem(tile) {
            if (!this.hasMazeItem(tile)) return null;
            return this.game.maze.getGrid().getCell(tile).getMazeItem();
        }
    }, {
        key: "hasMazeItem",
        value: function hasMazeItem(tile) {
            var mazeCell = this.game.maze.getGrid().getCell(tile);
            return mazeCell != null && mazeCell.hasMazeItem();
        }
    }, {
        key: "drawItem",
        value: function drawItem(tile) {
            if (!this.hasMazeItem(tile)) return;
            this.getMazeItem(tile).drawItem();
        }
    }, {
        key: "pickupItem",
        value: function pickupItem(tile, playerId) {
            if (!tile || !this.hasMazeItem(tile)) return;
            var mazeCell = this.game.maze.getGrid().getCell(tile);
            if (mazeCell) {
                var mazeItem = mazeCell.getMazeItem();
                mazeItem.triggerPickup(playerId);
                mazeCell.deleteItem();
            }
        }
    }, {
        key: "generateMazeItems",
        value: function generateMazeItems() {
            var cellList = this.game.maze.getGrid().getAllCells();
            // Spawn maze keys first since they are critical spawns.
            this.spawnAllKeys();
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = cellList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var cell = _step2.value;

                    if (cell.hasMazeItem()) {
                        continue;
                    }
                    // Spawn items randomly
                    var mazeItemKey = this.getRandomlySpawnedMazeItemKey();
                    if (mazeItemKey) {
                        this.game.items.createMazeItem(cell.getTile(), mazeItemKey);
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }, {
        key: "spawnAllKeys",
        value: function spawnAllKeys() {
            var totalKeys = this.game.mazeRequirements.getTotalKeysRequired();
            var allCells = this.game.maze.getGrid().getAllCells();
            var selectedCells = (0, _MazeUtils.getRandomXValuesFromArray)(allCells, Math.min(totalKeys, allCells.length));
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = selectedCells[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var cell = _step3.value;

                    this.game.items.createMazeItem(cell.getTile(), _ItemConstants.MazeItemKey.KEY);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        }
        // This requires that the maze config is already setup (for key item visibility)

    }, {
        key: "updateIconPanelDisplay",
        value: function updateIconPanelDisplay() {
            var isAnyItemUnlocked = false;
            for (var mazeItemKey in _ItemConstants.MazeItemKey) {
                var iconUiId = (0, _ItemConstants.getMazeItemIconPanelUiId)(mazeItemKey);
                var isUnlocked = this.isMazeItemUnlocked(mazeItemKey);
                isAnyItemUnlocked = isAnyItemUnlocked || isUnlocked;
                _UserInterface.UserInterface.setIdVisible(iconUiId, isUnlocked);
                var backgroundImg = (0, _ItemConstants.getMazeItemBackgroundImageByMazeItemKey)(mazeItemKey, this.game);
                this.game.ui.setImageIcon(iconUiId, backgroundImg, _ItemConstants.MAZE_ITEM_ICON_SIZE_IN_PX);
            }
            _UserInterface.UserInterface.setIdVisible("iconImgText", isAnyItemUnlocked);
        }
    }, {
        key: "initIconPanelHoverEvents",
        value: function initIconPanelHoverEvents() {
            if (this.game.dev.isDisableUi()) return;
            for (var mazeItemKey in _ItemConstants.MazeItemKey) {
                this.initIconPanelHoverEvent(mazeItemKey);
            }
        }
    }, {
        key: "initIconPanelHoverEvent",
        value: function initIconPanelHoverEvent(mazeItemKey) {
            var _this = this;

            var iconUiId = (0, _ItemConstants.getMazeItemIconPanelUiId)(mazeItemKey);
            var iconTooltipUiId = (0, _ItemConstants.getMazeItemIconPanelTooltipUiId)(mazeItemKey);
            $("#" + iconUiId).hover(function () {
                // Start hover
                _UserInterface.UserInterface.setHtml(iconTooltipUiId, _this.getMazeItemTooltipText(mazeItemKey));
                _UserInterface.UserInterface.setIdVisible(iconTooltipUiId, true);
            }, function () {
                // End-hover
                _UserInterface.UserInterface.setIdVisible(iconTooltipUiId, false);
            });
        }
    }]);

    return MazeItemManager;
}();

},{"../constants/ExperimentConstants":8,"../constants/ItemConstants":9,"../items/definitions/BlackHoleMazeItem":18,"../items/definitions/BrainMazeItem":19,"../items/definitions/DeadEndMazeItem":20,"../items/definitions/FruitMazeItem":21,"../items/definitions/GhostMazeItem":22,"../items/definitions/KeyMazeItem":23,"../items/definitions/SpeedUpMazeItem":24,"../items/definitions/TileMultiplierMazeItem":25,"../items/definitions/UnlimitedSplitsItem":26,"./MazeUtils":36,"./UserInterface":46}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MazeManager = exports.DEFAULT_PLAYER_ID = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MazeUtils = require("./MazeUtils");

var _UpgradeConstants = require("../constants/UpgradeConstants");

var _Stats = require("../models/Stats");

var _BiomeConstants = require("../constants/BiomeConstants");

var _AccumulatorConstants = require("../constants/AccumulatorConstants");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_PLAYER_ID = exports.DEFAULT_PLAYER_ID = 0;
var MAX_SPLITS_POSSIBLE = 4;

var MazeManager = exports.MazeManager = function () {
    function MazeManager(game) {
        var isDevMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        _classCallCheck(this, MazeManager);

        this.game = game;
        this.isDevMode = isDevMode;
        this.maze = null;
        this.smartPathMaze = null;
        this.mazeId = 0;
    }

    _createClass(MazeManager, [{
        key: "getMaze",
        value: function getMaze() {
            return this.maze;
        }
    }, {
        key: "getGrid",
        value: function getGrid() {
            return this.getMaze() ? this.getMaze().grid : null;
        }
    }, {
        key: "getNextMazeConfig",
        value: function getNextMazeConfig() {
            var biomeKey = this.game.biomes.getCurrentBiomeKey();
            // Dev disable UI means we're testing things. Ignore experiments.
            return (0, _BiomeConstants.getBiomeMazeConfig)(this.game, biomeKey, !this.game.dev.isDisableUi());
        }
    }, {
        key: "getMazeId",
        value: function getMazeId() {
            return this.mazeId;
        }
    }, {
        key: "newMaze",
        value: function newMaze() {
            this.mazeId++;
            var mazeConfig = this.getNextMazeConfig();
            this.maze = (0, _MazeUtils.generateMazeGridAndAlgorithm)(this.game, mazeConfig);
            this.smartPathMaze = (0, _MazeUtils.generateMazeSmartPathingArr)(this.game, this.maze);
            this.game.items.generateMazeItems();
            this.game.experiment.setMazeTileCountText();
        }
    }, {
        key: "markVisited",
        value: function markVisited(tile, playerId) {
            var isTileVisited = this.getGrid().isVisited(tile);
            this.game.points.addVisitPoints(isTileVisited, playerId);
            this.game.stats.addStatsToKey(1, isTileVisited ? _Stats.StatsKey.TOTAL_TILES_REVISITED : _Stats.StatsKey.TOTAL_TILES_VISITED);
            this.getGrid().setVisited(tile);
        }
    }, {
        key: "getSmartPathingDistanceFromExit",
        value: function getSmartPathingDistanceFromExit(tile) {
            return this.smartPathMaze[tile.y][tile.x];
        }
    }, {
        key: "setTileBackgroundColor",
        value: function setTileBackgroundColor(tile) {
            var playerOnTile = this.game.players.isOccupiedByPlayer(tile);
            var tileColor = this.getTileBackgroundColor(tile);
            var new_tile_key = (0, _MazeUtils.generateTileKey)(tile.x, tile.y);
            var border_radius_value = playerOnTile != null ? "circle()" : "";
            // $(`#${new_tile_key}`).css("background-color", tileColor);
            // $(`#${new_tile_key}`).css("-moz-border-radius", border_radius_value);
            // $(`#${new_tile_key}`).css("border-radius", border_radius_value);
            // $(`#${new_tile_key}`).css("border-collapse", "initial");
            $("#" + new_tile_key).css("background-color", tileColor);
            $("#" + new_tile_key).css("shape-outside", border_radius_value);
            $("#" + new_tile_key).css("clip-path", border_radius_value);
            // $(`#${new_tile_key}`).css("border-collapse", "initial");
            //TODO: implement this when the maze styling fixes are done + isPrimaryBot works.
            // if (playerOnTile && playerOnTile.) {
            //   $(`#${new_tile_key}`).addClass("primary-bot-marker");
            // } else {
            //   $(`#${new_tile_key}`).removeClass("primary-bot-marker");
            // }
        }
    }, {
        key: "getTileBackgroundColor",
        value: function getTileBackgroundColor(tile) {
            // Check for a player in the tile
            var playerColor = this.game.players.getPlayerColorAtTile(tile);
            if (playerColor != null) {
                return playerColor;
            }
            if (this.maze.grid.getCell(tile).isMarkedAsDeadEnd()) {
                return this.game.colors.getDeadEndTileColor();
            }
            if (this.getGrid().isVisited(tile)) {
                return this.game.colors.getVisitedTileColor();
            }
            return this.game.colors.getTileColor();
        }
    }, {
        key: "spawnSplitBot",
        value: function spawnSplitBot(player, dirArr) {
            var currMazeId = this.game.maze.getMazeId();
            var currTile = this.game.players.getCurrTile(player.id);
            for (var i = 0; i < dirArr.length; i++) {
                // Player must move first to accommodate enforced movement.
                // Enforced movement will be first index of tile vectors
                if (i === 0) {
                    // Move the original bot
                    this.game.players.movePlayer(player.id, dirArr[i]);
                    continue;
                }
                // Spawn new split bot in the new tile
                var newTile = (0, _MazeUtils.getNewTilePositionByVector)(currTile, dirArr[i]);
                var newPlayer = this.game.players.createNewPlayerObj(newTile, currMazeId);
                if (newPlayer) {
                    this.game.stats.addStatsToKey(1, _Stats.StatsKey.TOTAL_NUMBER_OF_BOT_SPLITS);
                    newPlayer.setIsUnlimitedSplitItemActive(player.isUnlimitedSplitItemActive());
                }
            }
        }
    }, {
        key: "updatePlayerTileByTileVector",
        value: function updatePlayerTileByTileVector(playerId, dirVector) {
            var playerCurrTile = this.game.players.getCurrTile(playerId);
            var newTile = (0, _MazeUtils.getNewTilePositionByVector)(playerCurrTile, dirVector);
            this.updatePlayerTile(playerId, newTile);
        }
    }, {
        key: "updatePlayerTile",
        value: function updatePlayerTile(playerId, newTile) {
            var player = this.game.players.getPlayer(playerId);
            if (this.getGrid().isMazeExitTile(newTile)) {
                if (player.isSmartPathingActive()) {
                    this.game.stats.addStatsToKey(1, _Stats.StatsKey.TOTAL_BRAIN_ITEM_MAZE_SOLVES);
                }
                this.game.completeMaze(playerId);
                return;
            }
            // Reset bot frustration if unvisited tile is found
            if (!this.getGrid().isVisited(newTile)) {
                this.game.rngBot.setFoundUnvisitedTile();
            }
            // Clear destructible tiles after they move away from the tile
            this.clearDestructibleTilesFromTile(player.currTile);
            player.prevTile = { x: player.currTile.x, y: player.currTile.y };
            player.currTile = { x: newTile.x, y: newTile.y };
            this.markVisited(newTile, playerId);
            this.updateDeadEndTileValue(newTile);
            this.updatePlayerDeadEndPathing(playerId);
            // Mark the exit as found if the brain item is active
            if ((0, _MazeUtils.isTileEqual)(newTile, this.getGrid().getInternalExitTile(true))) {
                this.getGrid().setInternalExitVisited();
            }
            this.setTileBackgroundColor(player.prevTile);
            this.setTileBackgroundColor(newTile);
            // Pick up items if any are on the tile
            this.game.items.pickupItem(newTile, playerId);
            this.handlePlayerMerges(newTile);
        }
    }, {
        key: "handlePlayerMerges",
        value: function handlePlayerMerges(tile) {
            var _this = this;

            if (!this.game.upgrades.isUpgraded(_UpgradeConstants.UpgradeKey.BOT_SPLIT_BOT_AUTO_MERGE)) return;
            // Assume only two possible players on a single tile since they all move one at a time
            // Ignore manually controlled players
            var playersAtTileArr = this.game.players.getPlayerIdsAtTile(tile).map(function (playerId) {
                return _this.game.players.getPlayer(playerId);
            }).filter(function (player) {
                return !player.isManuallyControlled;
            });
            if (playersAtTileArr.length <= 1) return;
            if (playersAtTileArr.length > 2) {
                console.error("False assumption about max number of players per tile: " + playersAtTileArr.length);
                return;
            }
            var player1 = playersAtTileArr[0];
            var player2 = playersAtTileArr[1];
            var playerToMerge = this.pickPlayerToMerge(player1, player2);
            var playerToLive = playerToMerge === player1 ? player2 : player1;
            if (!playerToMerge) return;
            // Pass along any bot passives.
            playerToLive.mergePlayerPassives(playerToMerge);
            this.game.stats.addStatsToKey(1, _Stats.StatsKey.TOTAL_NUMBER_OF_BOT_MERGES);
            this.game.players.deletePlayer(playerToMerge.id);
        }
    }, {
        key: "pickPlayerToMerge",
        value: function pickPlayerToMerge(player1, player2) {
            if (!player1 || !player2) return null;
            // Manual controlled players don't merge
            if (player1.isManuallyControlled) return player2;
            if (player2.isManuallyControlled) return player1;
            if (this.game.upgrades.isUpgraded(_UpgradeConstants.UpgradeKey.BOT_SMART_MERGE)) {
                // If a player is coming from a dead end, don't merge them
                if (player1.isPathingFromDeadEnd()) {
                    return player2;
                } else if (player2.isPathingFromDeadEnd()) {
                    return player1;
                }
                if (player1.isPathingFromDeadEnd() || player2.isPathingFromDeadEnd()) {
                    this.game.stats.addStatsToKey(1, _Stats.StatsKey.TOTAL_SMART_MERGES);
                }
            }
            return player1;
        }
    }, {
        key: "clearDestructibleTilesFromTile",
        value: function clearDestructibleTilesFromTile(tile) {
            this.clearDestructibleTileByVector(tile, _MazeUtils.DIRECTION_UP, _MazeUtils.MazeDirectionIndex.UP);
            this.clearDestructibleTileByVector(tile, _MazeUtils.DIRECTION_DOWN, _MazeUtils.MazeDirectionIndex.DOWN);
            this.clearDestructibleTileByVector(tile, _MazeUtils.DIRECTION_LEFT, _MazeUtils.MazeDirectionIndex.LEFT);
            this.clearDestructibleTileByVector(tile, _MazeUtils.DIRECTION_RIGHT, _MazeUtils.MazeDirectionIndex.RIGHT);
        }
    }, {
        key: "clearDestructibleTileByVector",
        value: function clearDestructibleTileByVector(tile, direction, mazeDirectionIndex) {
            var neighborTile = (0, _MazeUtils.getNewTilePositionByVector)(tile, direction);
            if (!this.maze.grid.isValidTile(neighborTile)) return;
            // Neighbor has inverse direction and we must clear the wall from both tiles.
            var neighborDirectionIndex = (0, _MazeUtils.getInverseDirectionIndex)(mazeDirectionIndex);
            if (this.getGrid().getCellWallTypeByMazeDirectionIndex(tile, mazeDirectionIndex) === _MazeUtils.MazeWallTypes.DESTRUCTIBLE_WALL && this.getGrid().getCellWallTypeByMazeDirectionIndex(neighborTile, neighborDirectionIndex) === _MazeUtils.MazeWallTypes.DESTRUCTIBLE_WALL) {
                this.maze.getCell(tile).setWallTypeAtIndex(mazeDirectionIndex, _MazeUtils.MazeWallTypes.NO_WALL);
                this.maze.getCell(neighborTile).setWallTypeAtIndex(neighborDirectionIndex, _MazeUtils.MazeWallTypes.NO_WALL);
                // Update the UI with the new tile border css.
                this.game.ui.setTileCssV2(this.maze, tile);
                this.game.ui.setTileCssV2(this.maze, neighborTile);
                this.game.stats.addStatsToKey(1, _Stats.StatsKey.TOTAL_DESTRUCTIBLE_WALLS_DESTROYED);
            }
        }
    }, {
        key: "canMove",
        value: function canMove(tile, dirVector) {
            var isExcludeExit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            var isIgnoreDestructibleWalls = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
            var isIgnoreWalls = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
            var isIgnoreMazeRequirements = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

            var newTile = (0, _MazeUtils.getNewTilePositionByVector)(tile, dirVector);
            // Check if maze exit and is valid tile
            if (this.getGrid().isMazeExitTile(newTile, isIgnoreMazeRequirements) && !isExcludeExit) return true;
            if (!this.maze.grid.isValidTile(newTile)) return false;
            if (isIgnoreWalls) return true;
            // Check if it's the exist first without requirements. Special case to handle click to move.
            if (this.getGrid().isMazeExitTile(tile)) {
                // Validate it's allowed with requirements.
                return this.getGrid().isMovingFromExitInward(tile, dirVector, isIgnoreMazeRequirements);
            }
            var tileVal = this.getGrid().getCellWallTypeByTileVector(tile, dirVector);
            return tileVal === _MazeUtils.MazeWallTypes.NO_WALL || isIgnoreDestructibleWalls && tileVal === _MazeUtils.MazeWallTypes.DESTRUCTIBLE_WALL;
        }
    }, {
        key: "getPossibleSplitBotCount",
        value: function getPossibleSplitBotCount(validDirCount, player) {
            if (validDirCount <= 1) {
                return 0;
            }
            if (player && player.isUnlimitedSplitItemActive()) {
                return Math.min(validDirCount, MAX_SPLITS_POSSIBLE);
            }
            // Total bots active
            var shouldIgnoreManualPlayer = this.game.upgrades.isUpgraded(_UpgradeConstants.UpgradeKey.PLAYER_MOVE_INDEPENDENTLY);
            var rngBotCount = this.game.players.getPlayerCount(shouldIgnoreManualPlayer);
            var splitUpgradeCount = this.game.upgrades.getUpgradeLevel(_UpgradeConstants.UpgradeKey.BOT_SPLIT_DIRECTION);
            // One bot auto-allowed, and +1 extra bot allowed per upgrade
            var allowedSplits = Math.max(0, splitUpgradeCount + 1 - rngBotCount);
            return Math.min(validDirCount, allowedSplits);
        }
    }, {
        key: "teleportPlayerBackToBot",
        value: function teleportPlayerBackToBot() {
            var manualPlayer = this.game.players.getManuallyControlledPlayer();
            var primaryBot = this.game.players.getFirstAutoBot();
            if (!manualPlayer || !primaryBot) return;
            // Move player and delete the bot.
            this.updatePlayerTile(manualPlayer.id, primaryBot.currTile);
        }
    }, {
        key: "teleportBotBackToPlayer",
        value: function teleportBotBackToPlayer() {
            var manualPlayer = this.game.players.getManuallyControlledPlayer();
            var primaryBot = this.game.players.getFirstAutoBot();
            if (!manualPlayer || !primaryBot) return;
            // Move player and delete the bot.
            this.updatePlayerTile(primaryBot.id, manualPlayer.currTile);
            this.game.players.deletePlayer(primaryBot.id);
        }
    }, {
        key: "getValidDirectionsByPlayerId",
        value: function getValidDirectionsByPlayerId(playerId) {
            var player = this.game.players.getPlayer(playerId);
            var hasDestructibleWallPhases = this.game.accumulators.canConsumeUnit(_AccumulatorConstants.AccumulatorKey.DESCTRUCTIBLE_WALL_PHASING_KEY);
            return this.getValidDirectionsByTile(player.currTile, player.isGhostItemActive(), hasDestructibleWallPhases);
        }
    }, {
        key: "getValidDirectionsByTile",
        value: function getValidDirectionsByTile(tile) {
            var isIgnoreWalls = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var _this2 = this;

            var isIncludeDestructible = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            var isIgnoreMazeRequirements = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

            return _MazeUtils.DIRECTIONS_ARR.filter(function (dir) {
                return _this2.canMove(tile, dir, false, isIncludeDestructible, isIgnoreWalls, isIgnoreMazeRequirements);
            });
        }
        // Note: This does not include the maze exit cell.

    }, {
        key: "getValidMoveNeighborCells",
        value: function getValidMoveNeighborCells(tile) {
            var isIgnoreWalls = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var _this3 = this;

            var isIncludeDestructible = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            var isIgnoreMazeRequirements = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

            return this.getValidMoveNeighborTiles(tile, isIgnoreWalls, isIncludeDestructible, isIgnoreMazeRequirements).map(function (neighborTile) {
                return _this3.getGrid().getCell(neighborTile);
            });
        }
    }, {
        key: "getValidMoveNeighborTiles",
        value: function getValidMoveNeighborTiles(tile) {
            var isIgnoreWalls = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var isIncludeDestructible = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            var isIgnoreMazeRequirements = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

            return this.getValidDirectionsByTile(tile, isIgnoreWalls, isIncludeDestructible, isIgnoreMazeRequirements).map(function (dir) {
                return (0, _MazeUtils.getNewTilePositionByVector)(tile, dir);
            });
        }
    }, {
        key: "getDeadEndValue",
        value: function getDeadEndValue(tile, validDirsArr) {
            var _this4 = this;

            if (!this.game.upgrades.isUpgraded(_UpgradeConstants.UpgradeKey.BOT_REMEMBER_DEADEND_TILES, true)) return null;
            var upgradeCount = this.game.upgrades.getUpgradeLevel(_UpgradeConstants.UpgradeKey.BOT_REMEMBER_DEADEND_TILES);
            var deadEndCount = 0,
                deadEndMaxVal = 0;
            // Count dead ends from valid dirs
            validDirsArr.forEach(function (dir) {
                var newTile = (0, _MazeUtils.getNewTilePositionByVector)(tile, dir);
                var cell = _this4.getGrid().getCell(newTile);
                if (cell && cell.isMarkedAsDeadEnd()) {
                    deadEndCount++;
                    deadEndMaxVal = Math.max(cell.getDeadEndCellValue(), deadEndMaxVal);
                }
            });
            // All but one are deadends -- return the max value if within upgrade limit
            if (deadEndCount === validDirsArr.length - 1 && deadEndMaxVal < upgradeCount) {
                return deadEndMaxVal + 1;
            }
            return null;
        }
    }, {
        key: "updateDeadEndTileValue",
        value: function updateDeadEndTileValue(tile) {
            var upgradeCount = this.game.upgrades.getUpgradeLevel(_UpgradeConstants.UpgradeKey.BOT_REMEMBER_DEADEND_TILES);
            if (upgradeCount === 0) {
                return;
            }
            var validDirsArr = this.getValidDirectionsByTile(tile, false, true, true);
            if (validDirsArr.length === 1) {
                this.game.stats.addStatsToKey(1, _Stats.StatsKey.TOTAL_NUMBER_DEAD_ENDS_MARKED);
                var cell = this.getGrid().getCell(tile);
                if (cell) {
                    cell.setDeadEndCellValue(1);
                }
                return;
            }
            var deadEndDistance = this.getDeadEndValue(tile, validDirsArr);
            if (deadEndDistance != null) {
                this.game.stats.addStatsToKey(1, _Stats.StatsKey.TOTAL_NUMBER_DEAD_ENDS_MARKED);
                var _cell = this.getGrid().getCell(tile);
                if (_cell) {
                    _cell.setDeadEndCellValue(deadEndDistance);
                }
            }
        }
    }, {
        key: "filterPlayerExitMazeDirection",
        value: function filterPlayerExitMazeDirection(playerId, validDirs) {
            var _this5 = this;

            if (!this.game.players.playerExists(playerId)) return null;
            var currTile = this.game.players.getPlayer(playerId).currTile;
            var currDistance = this.getSmartPathingDistanceFromExit(currTile);
            // Find best direction
            var exitMazeDir = validDirs.find(function (dir) {
                var newTile = (0, _MazeUtils.getNewTilePositionByVector)(currTile, dir);
                // Exit tile or one step closer to exit. If distance 1, MUST be exit tile.
                return _this5.getGrid().isMazeExitTile(newTile) || currDistance !== 1 && _this5.maze.grid.isValidTile(newTile) && _this5.getSmartPathingDistanceFromExit(newTile) === currDistance - 1;
            });
            // This will happen for "luck" because the "expected" directions will not always include the exit pathway
            if (exitMazeDir == null) {
                return null;
            }
            return exitMazeDir;
        }
    }, {
        key: "filterAvoidRevisitLastPosition",
        value: function filterAvoidRevisitLastPosition(playerId, validDirs) {
            var _this6 = this;

            if (!this.game.players.playerExists(playerId)) return;
            // Find any tiles that are not the previous tile.
            var noRevisitDirsArr = validDirs.filter(function (dir) {
                var previousTile = _this6.game.players.getPreviousTile(playerId);
                var newTile = (0, _MazeUtils.getNewTilePositionByVector)(_this6.game.players.getCurrTile(playerId), dir);
                return !(0, _MazeUtils.isTileEqual)(newTile, previousTile);
            });
            return noRevisitDirsArr;
        }
        //NOTE: this has merge frustration handled in here.

    }, {
        key: "prioritizeUnvisitedDirection",
        value: function prioritizeUnvisitedDirection(playerId, validDirs) {
            var _this7 = this;

            var shouldCheckMergeFrustration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            var possibleNewSplits = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

            if (!this.game.players.playerExists(playerId)) return [];
            var unchosenDirs = [];
            // Find any unvisited tiles within reach.
            var unvisitedDirsArr = validDirs.filter(function (dir) {
                var newTile = (0, _MazeUtils.getNewTilePositionByVector)(_this7.game.players.getCurrTile(playerId), dir);
                var isVisited = _this7.getGrid().isVisited(newTile);
                if (isVisited) {
                    unchosenDirs.push(dir);
                }
                return !isVisited;
            });
            // Bots are frustrated, so add as many extra directions as necessary.
            if (shouldCheckMergeFrustration && this.game.rngBot.isBotMergeFrustrated()) {
                return unvisitedDirsArr.concat((0, _MazeUtils.getRandomXValuesFromArray)(unchosenDirs, possibleNewSplits));
            }
            return unvisitedDirsArr;
        }
    }, {
        key: "filterDeadEndTiles",
        value: function filterDeadEndTiles(playerId, validDirs) {
            var _this8 = this;

            if (!this.game.players.playerExists(playerId)) return [];
            var nonDeadEndTiles = validDirs.filter(function (dir) {
                var newTile = (0, _MazeUtils.getNewTilePositionByVector)(_this8.game.players.getCurrTile(playerId), dir);
                var cell = _this8.maze.grid.getCell(newTile);
                //TODO: this is pretty hacky. Exit cells are not actually part of the grid.
                return cell ? !cell.isMarkedAsDeadEnd() : true;
            });
            return nonDeadEndTiles;
        }
    }, {
        key: "getTotalPossiblePaths",
        value: function getTotalPossiblePaths(playerId) {
            if (!this.game.players.playerMap.has(playerId)) return 0;
            var tile = this.game.players.getPlayer(playerId).currTile;
            // Test if there are more than 1 valid directions (assuming pre-visited)
            var validDirs = this.getValidDirectionsByTile(tile, false, true);
            // Filter out dead ends
            if (this.game.upgrades.getUpgradeLevel(_UpgradeConstants.UpgradeKey.BOT_REMEMBER_DEADEND_TILES) >= 1) {
                var filteredDirs = this.game.maze.filterDeadEndTiles(playerId, validDirs);
                validDirs = filteredDirs;
            }
            return validDirs.length;
        }
        // Dead end pathing is for smart merging purposes.
        // Allows us to keep track if player is moving away from a dead end and prioritizes that player during merges.

    }, {
        key: "updatePlayerDeadEndPathing",
        value: function updatePlayerDeadEndPathing(playerId) {
            var player = this.game.players.getPlayer(playerId);
            if (!player) return;
            var totalPossiblePaths = this.getTotalPossiblePaths(playerId);
            // If only single path (excluding dead-end markings), must be dead end.
            if (totalPossiblePaths === 1) {
                player.setIsPathingFromDeadEnd(true);
            }
            // If more than forward/back direction, not a dead end anymore!
            if (totalPossiblePaths > 2) {
                player.setIsPathingFromDeadEnd(false);
            }
        }
    }]);

    return MazeManager;
}();

},{"../constants/AccumulatorConstants":5,"../constants/BiomeConstants":6,"../constants/UpgradeConstants":13,"../models/Stats":68,"./MazeUtils":36}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MazeRequirementsManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _UiIdConstants = require("../constants/UiIdConstants");

var _UserInterface = require("./UserInterface");

var _Stats = require("../models/Stats");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FINISH_LINE_ICON = "img/finishLine.png";
var LOCKED_FINISH_LINE_ICON = "img/lock.png";
var BRAIN_LOCKED_FINISH_LINE_ICON = "img/brainLock.png";

var MazeRequirementsManager = exports.MazeRequirementsManager = function () {
    function MazeRequirementsManager(game) {
        _classCallCheck(this, MazeRequirementsManager);

        this.game = game;
    }

    _createClass(MazeRequirementsManager, [{
        key: "getMazeConfig",
        value: function getMazeConfig() {
            return this.getMazeGrid().getMazeConfig();
        }
    }, {
        key: "getMazeGrid",
        value: function getMazeGrid() {
            return this.game.maze.getGrid();
        }
    }, {
        key: "getTotalKeysRequired",
        value: function getTotalKeysRequired() {
            return this.hasMazeKeysFoundRequirement() ? this.getMazeConfig().mazeCompletionRequirements.minMazeKeysFound : 0;
        }
    }, {
        key: "hasTilesVisitedPercentRequirement",
        value: function hasTilesVisitedPercentRequirement() {
            var completionReqs = this.getMazeConfig().mazeCompletionRequirements;
            return completionReqs && completionReqs.minTilePercentageVisited > 0;
        }
    }, {
        key: "getTotalVisitedTilePercentageRequired",
        value: function getTotalVisitedTilePercentageRequired() {
            return this.hasTilesVisitedPercentRequirement() ? this.getMazeConfig().mazeCompletionRequirements.minTilePercentageVisited : 0;
        }
    }, {
        key: "hasMazeKeysFoundRequirement",
        value: function hasMazeKeysFoundRequirement() {
            var completionReqs = this.getMazeConfig().mazeCompletionRequirements;
            return completionReqs && completionReqs.minMazeKeysFound > 0;
        }
    }, {
        key: "hasMetTilesVisitedPercentRequirement",
        value: function hasMetTilesVisitedPercentRequirement() {
            if (this.hasTilesVisitedPercentRequirement()) {
                return this.getMazeGrid().getTileVisitedPercentage() >= this.getTotalVisitedTilePercentageRequired();
            }
            return true;
        }
    }, {
        key: "hasMetMazeKeysFoundRequirement",
        value: function hasMetMazeKeysFoundRequirement() {
            if (this.hasMazeKeysFoundRequirement()) {
                return this.getMazeGrid().getNumMazeKeysFound() >= this.getTotalKeysRequired();
            }
            return true;
        }
    }, {
        key: "hasMetMazeCompletionRequirements",
        value: function hasMetMazeCompletionRequirements() {
            return this.hasMetTilesVisitedPercentRequirement() && this.hasMetMazeKeysFoundRequirement();
        }
    }, {
        key: "hasMazeCompletionRequirements",
        value: function hasMazeCompletionRequirements() {
            return this.hasMazeKeysFoundRequirement() || this.hasTilesVisitedPercentRequirement();
        }
    }, {
        key: "getFinishLineIcon",
        value: function getFinishLineIcon() {
            if (this.hasMetMazeCompletionRequirements()) {
                return FINISH_LINE_ICON;
            } else if (this.game.maze.getGrid().hasExitMarkedByBrainItem()) {
                return BRAIN_LOCKED_FINISH_LINE_ICON;
            } else {
                return LOCKED_FINISH_LINE_ICON;
            }
        }
    }, {
        key: "shouldAutoCompleteMaze",
        value: function shouldAutoCompleteMaze() {
            return this.game.maze.getGrid().hasExitMarkedByBrainItem() && this.hasMetMazeCompletionRequirements();
        }
    }, {
        key: "updateMazeCompletionUi",
        value: function updateMazeCompletionUi() {
            // General completion requirement panel
            var hasMazeRequirements = this.hasMazeCompletionRequirements();
            _UserInterface.UserInterface.setIdVisible(_UiIdConstants.MAZE_COMPLETION_REQUIREMENTS_PANEL_UI_ID, this.hasMazeCompletionRequirements());
            if (!hasMazeRequirements) return;
            // Visited tiles counter
            var hasVisitedRequirement = this.hasTilesVisitedPercentRequirement();
            var hasMetVisitedRequirement = this.hasMetTilesVisitedPercentRequirement();
            _UserInterface.UserInterface.setIdVisible(_UiIdConstants.MAZE_COMPLETION_REQUIREMENTS_TILES_VISITED_PANEL_UI_ID, hasVisitedRequirement, "flex");
            _UserInterface.UserInterface.setIdVisible(_UiIdConstants.MAZE_COMPLETION_REQUIREMENTS_TILES_VISITED_X_UI_ID, !hasMetVisitedRequirement, "flex");
            _UserInterface.UserInterface.setIdVisible(_UiIdConstants.MAZE_COMPLETION_REQUIREMENTS_TILES_VISITED_CHECKMARK_UI_ID, hasMetVisitedRequirement, "flex");
            if (hasVisitedRequirement) {
                var visitedPercent = _UserInterface.UserInterface.getPrettyPrintNumber(this.getMazeGrid().getTileVisitedPercentage() * 100);
                var tileVisitedCountText = visitedPercent + "% / " + this.getTotalVisitedTilePercentageRequired() * 100 + "%";
                _UserInterface.UserInterface.setText(_UiIdConstants.MAZE_COMPLETION_REQUIREMENTS_TILES_VISITED_COUNT_UI_ID, tileVisitedCountText);
            }
            // Maze keys found counter
            var hasMetKeyRequirement = this.hasMetMazeKeysFoundRequirement();
            var hasKeyRequirement = this.hasMazeKeysFoundRequirement();
            _UserInterface.UserInterface.setIdVisible(_UiIdConstants.MAZE_COMPLETION_REQUIREMENTS_MAZE_KEYS_PANEL_UI_ID, hasKeyRequirement, "flex");
            _UserInterface.UserInterface.setIdVisible(_UiIdConstants.MAZE_COMPLETION_REQUIREMENTS_MAZE_KEYS_CHECKMARK_UI_ID, hasMetKeyRequirement, "flex");
            _UserInterface.UserInterface.setIdVisible(_UiIdConstants.MAZE_COMPLETION_REQUIREMENTS_MAZE_KEYS_X_UI_ID, !hasMetKeyRequirement, "flex");
            if (hasKeyRequirement) {
                var mazeKeysFoundText = this.getMazeGrid().getNumMazeKeysFound() + " / " + this.getTotalKeysRequired();
                _UserInterface.UserInterface.setText(_UiIdConstants.MAZE_COMPLETION_REQUIREMENTS_MAZE_KEYS_COUNT_UI_ID, mazeKeysFoundText);
            }
            // Finish line icon
            if (this.hasMetMazeCompletionRequirements()) {
                this.game.ui.setFinishLineIcon();
            }
            if (this.shouldAutoCompleteMaze()) {
                this.game.stats.addStatsToKey(1, _Stats.StatsKey.TOTAL_BRAIN_ITEM_MAZE_SOLVES);
                this.game.completeMaze();
            }
        }
    }]);

    return MazeRequirementsManager;
}();

},{"../constants/UiIdConstants":12,"../models/Stats":68,"./UserInterface":46}],36:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getNumMazeEntrances = exports.getExitDirectionByGridLocation = exports.getGridCellByLocation = exports.generateMazeSmartPathingArr = exports.generateMazeArr = exports.getCellNeighborDirectionIndex = exports.getCellNeighborTileVector = exports.getTileFromTileKey = exports.generateTileKey = exports.isTileEqual = exports.getNewTilePositionByVector = exports.getRandomInteger = exports.getRandomXValuesFromArray = exports.getRandomMazeTile = exports.getInverseTileVector = exports.getInverseDirectionIndex = exports.getMazeDirectionIndexFromTileVector = exports.getTileVectorFromMazeDirectionIndex = exports.generateMazeGridAndAlgorithm = exports.DEFAULT_MAZE_SIZE = exports.STARTING_POSITION = exports.DIRECTIONS_ARR = exports.DIRECTION_NO_MOVE = exports.DIRECTION_RIGHT = exports.DIRECTION_LEFT = exports.DIRECTION_DOWN = exports.DIRECTION_UP = exports.GridLocation = exports.MazeWallTypes = exports.MazeDirectionIndex = exports.MazeSizeType = exports.MAZE_GRID_TIERED_TYPES = exports.MazeGridType = exports.MazeAlgorithmType = undefined;

var _UpgradeConstants = require("../constants/UpgradeConstants");

var _BackTrackerMaze = require("../maze/BackTrackerMaze");

var _BinaryTreeMaze = require("../maze/BinaryTreeMaze");

var _PrimsMaze = require("../maze/PrimsMaze");

var TILE_KEY_DELIMITER = "_";
var DEFAULT_NUM_MAZE_ENTRANCES = 1;
var MazeAlgorithmType = exports.MazeAlgorithmType = undefined;
(function (MazeAlgorithmType) {
    MazeAlgorithmType["BACK_TRACKER"] = "BACK_TRACKER";
    MazeAlgorithmType["BINARY_TREE"] = "BINARY_TREE";
    MazeAlgorithmType["PRIMS"] = "PRIMS";
})(MazeAlgorithmType || (exports.MazeAlgorithmType = MazeAlgorithmType = {}));
var MazeGridType = exports.MazeGridType = undefined;
(function (MazeGridType) {
    MazeGridType["SQUARE"] = "SQUARE";
    MazeGridType["RECTANGLE"] = "RECTANGLE";
    MazeGridType["PLUS_SIGN"] = "PLUS_SIGN";
    MazeGridType["DIAMOND"] = "DIAMOND";
    MazeGridType["STAIRCASE"] = "STAIRCASE";
    MazeGridType["PYRAMID"] = "PYRAMID";
    MazeGridType["CIRCLE"] = "CIRCLE";
    MazeGridType["LETTER_H"] = "LETTER_H";
    MazeGridType["HONEYCOMB"] = "HONEYCOMB";
    MazeGridType["ZIGZAG"] = "ZIGZAG";
})(MazeGridType || (exports.MazeGridType = MazeGridType = {}));
var MAZE_GRID_TIERED_TYPES = exports.MAZE_GRID_TIERED_TYPES = new Set([MazeGridType.HONEYCOMB, MazeGridType.LETTER_H, MazeGridType.ZIGZAG]);
var MazeSizeType = exports.MazeSizeType = undefined;
(function (MazeSizeType) {
    MazeSizeType["SQUARE_SIZE"] = "SQUARE_SIZE";
    MazeSizeType["TIER_SIZE"] = "TIER_SIZE";
})(MazeSizeType || (exports.MazeSizeType = MazeSizeType = {}));
var MazeDirectionIndex = exports.MazeDirectionIndex = undefined;
(function (MazeDirectionIndex) {
    MazeDirectionIndex[MazeDirectionIndex["UP"] = 0] = "UP";
    MazeDirectionIndex[MazeDirectionIndex["RIGHT"] = 1] = "RIGHT";
    MazeDirectionIndex[MazeDirectionIndex["DOWN"] = 2] = "DOWN";
    MazeDirectionIndex[MazeDirectionIndex["LEFT"] = 3] = "LEFT";
})(MazeDirectionIndex || (exports.MazeDirectionIndex = MazeDirectionIndex = {}));
var MazeWallTypes = exports.MazeWallTypes = undefined;
(function (MazeWallTypes) {
    MazeWallTypes[MazeWallTypes["WALL"] = 0] = "WALL";
    MazeWallTypes[MazeWallTypes["NO_WALL"] = 1] = "NO_WALL";
    MazeWallTypes[MazeWallTypes["DESTRUCTIBLE_WALL"] = 2] = "DESTRUCTIBLE_WALL";
    MazeWallTypes[MazeWallTypes["OUT_OF_BOUNDS_WALL"] = 3] = "OUT_OF_BOUNDS_WALL";
})(MazeWallTypes || (exports.MazeWallTypes = MazeWallTypes = {}));
var GridLocation = exports.GridLocation = undefined;
(function (GridLocation) {
    GridLocation["TOP_LEFT"] = "TOP_LEFT";
    GridLocation["TOP_MIDDLE"] = "TOP_MIDDLE";
    GridLocation["TOP_RIGHT"] = "TOP_RIGHT";
    GridLocation["BOTTOM_LEFT"] = "BOTTOM_LEFT";
    GridLocation["BOTTOM_MIDDLE"] = "BOTTOM_MIDDLE";
    GridLocation["BOTTOM_RIGHT"] = "BOTTOM_RIGHT";
    GridLocation["MIDDLE_LEFT"] = "MIDDLE_LEFT";
    GridLocation["MIDDLE_RIGHT"] = "MIDDLE_RIGHT";
    GridLocation["MIDDLE_MIDDLE"] = "MIDDLE_MIDDLE";
})(GridLocation || (exports.GridLocation = GridLocation = {}));
var DIRECTION_UP = exports.DIRECTION_UP = { x: 0, y: -1 };
var DIRECTION_DOWN = exports.DIRECTION_DOWN = { x: 0, y: 1 };
var DIRECTION_LEFT = exports.DIRECTION_LEFT = { x: -1, y: 0 };
var DIRECTION_RIGHT = exports.DIRECTION_RIGHT = { x: 1, y: 0 };
var DIRECTION_NO_MOVE = exports.DIRECTION_NO_MOVE = { x: 0, y: 0 };
var DIRECTIONS_ARR = exports.DIRECTIONS_ARR = [DIRECTION_UP, DIRECTION_DOWN, DIRECTION_LEFT, DIRECTION_RIGHT];
var STARTING_POSITION = exports.STARTING_POSITION = { x: 0, y: 0 };
var DEFAULT_MAZE_SIZE = exports.DEFAULT_MAZE_SIZE = 4;
var generateMazeGridAndAlgorithm = exports.generateMazeGridAndAlgorithm = function generateMazeGridAndAlgorithm(game, mazeConfig) {
    var mazeAlgorithmType = mazeConfig.mazeAlgorithmType;

    if (mazeAlgorithmType === MazeAlgorithmType.PRIMS) {
        return new _PrimsMaze.PrimsMaze(game, mazeConfig);
    } else if (mazeAlgorithmType === MazeAlgorithmType.BACK_TRACKER) {
        return new _BackTrackerMaze.BacktrackerMaze(game, mazeConfig);
    } else if (mazeAlgorithmType === MazeAlgorithmType.BINARY_TREE) {
        return new _BinaryTreeMaze.BinaryTreeMaze(game, mazeConfig);
    } else {
        throw "Invalid maze algorithm type: " + mazeAlgorithmType;
    }
};
var getTileVectorFromMazeDirectionIndex = exports.getTileVectorFromMazeDirectionIndex = function getTileVectorFromMazeDirectionIndex(mazeDirIndex) {
    if (mazeDirIndex === MazeDirectionIndex.UP) {
        return DIRECTION_UP;
    } else if (mazeDirIndex === MazeDirectionIndex.DOWN) {
        return DIRECTION_DOWN;
    } else if (mazeDirIndex === MazeDirectionIndex.LEFT) {
        return DIRECTION_LEFT;
    } else if (mazeDirIndex === MazeDirectionIndex.RIGHT) {
        return DIRECTION_RIGHT;
    }
    return null;
};
var getMazeDirectionIndexFromTileVector = exports.getMazeDirectionIndexFromTileVector = function getMazeDirectionIndexFromTileVector(tileVector) {
    if (isTileEqual(tileVector, DIRECTION_UP)) {
        return MazeDirectionIndex.UP;
    } else if (isTileEqual(tileVector, DIRECTION_DOWN)) {
        return MazeDirectionIndex.DOWN;
    } else if (isTileEqual(tileVector, DIRECTION_LEFT)) {
        return MazeDirectionIndex.LEFT;
    } else if (isTileEqual(tileVector, DIRECTION_RIGHT)) {
        return MazeDirectionIndex.RIGHT;
    } else if (isTileEqual(tileVector, DIRECTION_NO_MOVE)) {
        // Cannot convert a no-op into a maze direction index.
        return;
    }
    console.error("Invalid tile vector being converted to direction index: " + tileVector.x + "," + tileVector.y);
    return null;
};
var getInverseDirectionIndex = exports.getInverseDirectionIndex = function getInverseDirectionIndex(mazeDirIndex) {
    if (mazeDirIndex === MazeDirectionIndex.UP) {
        return MazeDirectionIndex.DOWN;
    } else if (mazeDirIndex === MazeDirectionIndex.DOWN) {
        return MazeDirectionIndex.UP;
    } else if (mazeDirIndex === MazeDirectionIndex.LEFT) {
        return MazeDirectionIndex.RIGHT;
    } else if (mazeDirIndex === MazeDirectionIndex.RIGHT) {
        return MazeDirectionIndex.LEFT;
    }
    return null;
};
var getInverseTileVector = exports.getInverseTileVector = function getInverseTileVector(tileVector) {
    return { x: -tileVector.x, y: -tileVector.y };
};
var getRandomMazeTile = exports.getRandomMazeTile = function getRandomMazeTile(game) {
    var cellList = game.maze.getGrid().getAllCells();
    var randomIndex = getRandomInteger(0, cellList.length - 1);
    return cellList[randomIndex].getTile();
};
var getRandomXValuesFromArray = exports.getRandomXValuesFromArray = function getRandomXValuesFromArray(arr, pickX) {
    // return _.sampleSize(arr, pickX);
    pickX = Math.min(arr.length, pickX);
    return arr.sort(function () {
        return Math.random() - Math.random();
    }).slice(0, pickX);
};
var getRandomInteger = exports.getRandomInteger = function getRandomInteger(min, max) {
    if (min === max) return max;
    return Math.floor(Math.random() * (max - min + 1) + min);
};
var getNewTilePositionByVector = exports.getNewTilePositionByVector = function getNewTilePositionByVector(tile, vector) {
    return { x: tile.x + vector.x, y: tile.y + vector.y };
};
var isTileEqual = exports.isTileEqual = function isTileEqual(tile1, tile2) {
    if (tile1 == null && tile2 == null) return true;
    if (tile1 == null || tile2 == null) return false;
    return tile1.x === tile2.x && tile1.y === tile2.y;
};
var generateTileKey = exports.generateTileKey = function generateTileKey(x, y) {
    return "" + x + TILE_KEY_DELIMITER + y;
};
var getTileFromTileKey = exports.getTileFromTileKey = function getTileFromTileKey(tileKey) {
    var keys = tileKey.split(TILE_KEY_DELIMITER);
    return { x: parseInt(keys[0]), y: parseInt(keys[1]) };
};
var getCellNeighborTileVector = exports.getCellNeighborTileVector = function getCellNeighborTileVector(startCell, endCell) {
    // Assumption: these are actually neighboring cells
    var cellDiff = { x: endCell.x - startCell.x, y: endCell.y - startCell.y };
    return cellDiff;
};
var getCellNeighborDirectionIndex = exports.getCellNeighborDirectionIndex = function getCellNeighborDirectionIndex(startCell, endCell) {
    var tileVector = getCellNeighborTileVector(startCell, endCell);
    return getMazeDirectionIndexFromTileVector(tileVector);
};
var generateMazeArr = exports.generateMazeArr = function generateMazeArr(x, y, defaultValue) {
    var mazeArr = new Array();
    for (var i = 0; i < y; i++) {
        mazeArr[i] = new Array();
        for (var j = 0; j < x; j++) {
            mazeArr[i][j] = defaultValue;
        }
    }
    return mazeArr;
};
// Generates a maze with a number in each position representing the distance from exit using optimal pathing.
var generateMazeSmartPathingArr = exports.generateMazeSmartPathingArr = function generateMazeSmartPathingArr(game, maze) {
    var smartPathArr = generateMazeArr(maze.grid.sizeX, maze.grid.sizeY, 0);
    //TODO: figure out how to handle exit tile better
    var lastTile = maze.grid.internalExitTile;
    // Mark first tile visited first -- canMove() cannot handle starting outside of the maze (ie. exit point).
    smartPathArr[lastTile.y][lastTile.x] = 1;
    var tileQueue = [lastTile];
    var stepCount = 2;
    // BFS iteration
    while (tileQueue.length > 0) {
        var loopSize = tileQueue.length;
        // One step in all directions for each tile
        for (var i = 0; i < loopSize; i++) {
            var tile = tileQueue.shift();
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = DIRECTIONS_ARR[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var dir = _step.value;

                    // Only test valid directions (ie. non-wall, etc.)
                    //TODO: this needs to handle destructible walls
                    if (game.maze.canMove(tile, dir, true, true)) {
                        var newTile = getNewTilePositionByVector(tile, dir);
                        // Don't revisit tiles
                        if (smartPathArr[newTile.y][newTile.x] === 0) {
                            smartPathArr[newTile.y][newTile.x] = stepCount;
                            tileQueue.push(newTile);
                        }
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
        stepCount++;
    }
    return smartPathArr;
};
var getGridCellByLocation = exports.getGridCellByLocation = function getGridCellByLocation(grid, gridLocation) {
    var maxX = grid.sizeX - 1,
        maxY = grid.sizeY - 1;
    var minX = 0,
        minY = 0;
    if (gridLocation == GridLocation.TOP_LEFT) {
        return grid.getCell({ x: minX, y: minY });
    } else if (gridLocation == GridLocation.TOP_RIGHT) {
        return grid.getCell({ x: maxX, y: minY });
    } else if (gridLocation == GridLocation.BOTTOM_LEFT) {
        return grid.getCell({ x: minX, y: maxY });
    } else if (gridLocation == GridLocation.BOTTOM_RIGHT) {
        return grid.getCell({ x: maxX, y: maxY });
    } else if (gridLocation == GridLocation.TOP_MIDDLE) {
        return grid.getCell({ x: getMiddle(maxX), y: minY });
    } else if (gridLocation == GridLocation.BOTTOM_MIDDLE) {
        return grid.getCell({ x: getMiddle(maxX), y: maxY });
    } else if (gridLocation == GridLocation.MIDDLE_LEFT) {
        return grid.getCell({ x: minX, y: getMiddle(maxY) });
    } else if (gridLocation == GridLocation.MIDDLE_RIGHT) {
        return grid.getCell({ x: maxX, y: getMiddle(maxY) });
    } else if (gridLocation == GridLocation.MIDDLE_MIDDLE) {
        return grid.getCell({ x: getMiddle(maxX), y: getMiddle(maxY) });
    }
    console.error('Invalid GridLocation: ', gridLocation);
    return null;
};
var getMiddle = function getMiddle(end) {
    return Math.floor(end / 2);
};
var getExitDirectionByGridLocation = exports.getExitDirectionByGridLocation = function getExitDirectionByGridLocation(gridLocation) {
    if (gridLocation == GridLocation.TOP_LEFT) {
        return DIRECTION_LEFT;
    } else if (gridLocation == GridLocation.TOP_RIGHT) {
        return DIRECTION_RIGHT;
    } else if (gridLocation == GridLocation.BOTTOM_LEFT) {
        return DIRECTION_LEFT;
    } else if (gridLocation == GridLocation.BOTTOM_RIGHT) {
        return DIRECTION_RIGHT;
    } else if (gridLocation == GridLocation.TOP_MIDDLE) {
        return DIRECTION_UP;
    } else if (gridLocation == GridLocation.BOTTOM_MIDDLE) {
        return DIRECTION_DOWN;
    } else if (gridLocation == GridLocation.MIDDLE_LEFT) {
        return DIRECTION_LEFT;
    } else if (gridLocation == GridLocation.MIDDLE_RIGHT) {
        return DIRECTION_RIGHT;
    } else if (gridLocation == GridLocation.MIDDLE_MIDDLE) {
        return null;
    }
    console.error('Invalid GridLocation exit: ', gridLocation);
    return null;
};
// Defaults to one maze entrance, but percent chance upgrade to get second.
var getNumMazeEntrances = exports.getNumMazeEntrances = function getNumMazeEntrances(game) {
    if (!game.upgrades.isUpgraded(_UpgradeConstants.UpgradeKey.MAZE_ENTRANCE_SPAWN_CHANCE_UPGRADE, true)) return DEFAULT_NUM_MAZE_ENTRANCES;
    var percentChance = game.upgrades.getUpgradeValue(_UpgradeConstants.UpgradeKey.MAZE_ENTRANCE_SPAWN_CHANCE_UPGRADE);
    return percentChance > Math.random() ? 2 : DEFAULT_NUM_MAZE_ENTRANCES;
};

},{"../constants/UpgradeConstants":13,"../maze/BackTrackerMaze":57,"../maze/BinaryTreeMaze":58,"../maze/PrimsMaze":59}],37:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OfflineManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Serializable2 = require("../models/Serializable");

var _Stats = require("../models/Stats");

var _UserInterface = require("./UserInterface");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SERIALIZABLE_PROPERTIES = ['saveTimeStamp', 'offlinePointsPerSecond'];
var MAX_OFFLINE_TIME_IN_MS = 0; // (60 * 60 * 1000);
var MIN_TIME_FOR_BANNER_MS = 99999999999;

var OfflineManager = exports.OfflineManager = function (_Serializable) {
    _inherits(OfflineManager, _Serializable);

    function OfflineManager(game) {
        _classCallCheck(this, OfflineManager);

        var _this = _possibleConstructorReturn(this, (OfflineManager.__proto__ || Object.getPrototypeOf(OfflineManager)).call(this, SERIALIZABLE_PROPERTIES));

        _this.game = game;
        return _this;
    }

    _createClass(OfflineManager, [{
        key: "processOfflinePoints",
        value: function processOfflinePoints() {
            var offlinePointsEarned = this.calculateOfflinePoints();
            // Ignore points history
            this.game.points.addPoints(offlinePointsEarned, null, null, true);
            if (this.shouldShowOfflineModal()) {
                this.game.ui.showModalByType(_UserInterface.ModalType.OFFLINE_SCORE_MODAL);
            }
        }
    }, {
        key: "shouldShowOfflineModal",
        value: function shouldShowOfflineModal() {
            var offlineTimeDiffInMs = this.getUTCTimeStampInMs() - this.saveTimeStamp;
            return offlineTimeDiffInMs > MIN_TIME_FOR_BANNER_MS;
        }
    }, {
        key: "calculateOfflinePoints",
        value: function calculateOfflinePoints() {
            var offlineTimeDiffInMs = this.getUTCTimeStampInMs() - this.saveTimeStamp;
            var allowedOfflineTimeInMs = Math.min(offlineTimeDiffInMs, MAX_OFFLINE_TIME_IN_MS);
            var offlinePointsEarned = this.offlinePointsPerSecond * (allowedOfflineTimeInMs / 1000);
            this.updateOfflineModal(offlineTimeDiffInMs, allowedOfflineTimeInMs, this.offlinePointsPerSecond, offlinePointsEarned);
            return offlinePointsEarned;
        }
    }, {
        key: "updateOfflineModal",
        value: function updateOfflineModal(totalDurationInMs, allowedOfflineTimeInMs, offlinePointsPerSec, offlinePointsEarned) {
            $("#offlineModalDuration").text(_UserInterface.UserInterface.getPrettyPrintNumber(totalDurationInMs / 1000));
            $("#offlineModalMaxOfflineTime").text(_UserInterface.UserInterface.getPrettyPrintNumber(allowedOfflineTimeInMs / 1000));
            $("#offlineModalPointsPerSecond").text(_UserInterface.UserInterface.getPrettyPrintNumber(offlinePointsPerSec));
            $("#offlineModalPointsEarned").text(_UserInterface.UserInterface.getPrettyPrintNumber(offlinePointsEarned));
        }
    }, {
        key: "getUTCTimeStampInMs",
        value: function getUTCTimeStampInMs() {
            return Math.floor(new Date().getTime());
        }
    }, {
        key: "serialize",
        value: function serialize() {
            // Always update timestamp before saving
            this.saveTimeStamp = this.getUTCTimeStampInMs();
            this.offlinePointsPerSecond = this.game.stats.getStat(_Stats.StatsKey.AVERAGE_POINTS_EARNED_PER_SECOND);
            return _get(OfflineManager.prototype.__proto__ || Object.getPrototypeOf(OfflineManager.prototype), "serialize", this).call(this);
        }
    }]);

    return OfflineManager;
}(_Serializable2.Serializable);

},{"../models/Serializable":67,"../models/Stats":68,"./UserInterface":46}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PlayerManager = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AccumulatorConstants = require("../constants/AccumulatorConstants");

var _UpgradeConstants = require("../constants/UpgradeConstants");

var _MazeUtils = require("./MazeUtils");

var _Player = require("../models/Player");

var _Player2 = _interopRequireDefault(_Player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PlayerManager = exports.PlayerManager = function () {
    function PlayerManager(game) {
        _classCallCheck(this, PlayerManager);

        this.game = game;
        this.playerMap = new Map();
    }

    _createClass(PlayerManager, [{
        key: "resetAllPlayers",
        value: function resetAllPlayers() {
            this.playerMap.clear();
        }
    }, {
        key: "createDefaultPlayer",
        value: function createDefaultPlayer() {
            // Assume the number of entrances is based on number of valid splits.
            var startTilesArr = this.game.maze.getGrid().internalStartTilesArr;
            if (this.game.upgrades.isUpgraded(_UpgradeConstants.UpgradeKey.PLAYER_MOVE_INDEPENDENTLY)) {
                this.createNewPlayerObj(startTilesArr[0], this.game.maze.getMazeId(), true);
            }
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = startTilesArr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var startTile = _step.value;

                    var isManual = !this.game.upgrades.isUpgraded(_UpgradeConstants.UpgradeKey.AUTO_MOVE, false);
                    this.createNewPlayerObj(startTile, this.game.maze.getMazeId(), isManual);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: "createNewPlayerObj",
        value: function createNewPlayerObj(startTile, expectedMazeId) {
            var isManuallyControlled = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            // Ensure spawning is done on the expected maze id
            if (expectedMazeId && expectedMazeId !== this.game.maze.getMazeId()) {
                return;
            }
            var newPlayer = new _Player2.default(this.game, this.getNewPlayerId(), startTile, startTile, isManuallyControlled);
            this.playerMap.set(newPlayer.id, newPlayer);
            this.game.maze.updatePlayerTile(newPlayer.id, startTile);
            return newPlayer;
        }
    }, {
        key: "getManuallyControlledPlayer",
        value: function getManuallyControlledPlayer() {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.playerMap[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _step2$value = _slicedToArray(_step2.value, 2),
                        id = _step2$value[0],
                        player = _step2$value[1];

                    if (player.isManuallyControlled) {
                        return player;
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return null;
        }
    }, {
        key: "getPlayerOrDefaultBotId",
        value: function getPlayerOrDefaultBotId() {
            var manualPlayer = this.getManuallyControlledPlayer();
            return manualPlayer != null ? manualPlayer.id : this.getFirstAutoBotId();
        }
    }, {
        key: "getIsPlayerManuallyControlling",
        value: function getIsPlayerManuallyControlling() {
            return this.getManuallyControlledPlayer() == null ? false : true;
        }
    }, {
        key: "getPlayerCount",
        value: function getPlayerCount() {
            var isExcludeManualControl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            // If manual controlling, don't count
            return this.playerMap.size - (isExcludeManualControl && this.getIsPlayerManuallyControlling() ? 1 : 0);
        }
    }, {
        key: "isAutoBotPresent",
        value: function isAutoBotPresent() {
            // Check if any non-manual controlled 
            return this.getFirstAutoBot() != null;
        }
    }, {
        key: "getFirstAutoBot",
        value: function getFirstAutoBot() {
            // Find first bot that is not manually controlled
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.playerMap[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var _step3$value = _slicedToArray(_step3.value, 2),
                        id = _step3$value[0],
                        player = _step3$value[1];

                    if (!player.isManuallyControlled) {
                        return player;
                    }
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            return null;
        }
    }, {
        key: "getFirstAutoBotId",
        value: function getFirstAutoBotId() {
            var bot = this.getFirstAutoBot();
            return bot ? bot.id : null;
        }
    }, {
        key: "movePlayer",
        value: function movePlayer(playerId, dirVector) {
            var isManual = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            var player = this.getPlayer(playerId);
            if (player == null) return;
            var canManuallyWallPhase = isManual && this.game.accumulators.canConsumeUnit(_AccumulatorConstants.AccumulatorKey.WALL_PHASING_KEY);
            var ignoreWalls = canManuallyWallPhase || player.isGhostItemActive();
            // Check for first time move -- Trigger a no-op move for the user.
            if (isManual && !player.isManuallyControlled) {
                dirVector = _MazeUtils.DIRECTION_NO_MOVE;
            }
            // If player can't move, ensure no destructible tiles are holding them
            else if (!this.game.maze.canMove(player.currTile, dirVector, false, false, ignoreWalls)) {
                    this.game.maze.clearDestructibleTilesFromTile(player.currTile);
                    this.game.accumulators.consumeUnit(_AccumulatorConstants.AccumulatorKey.DESCTRUCTIBLE_WALL_PHASING_KEY);
                    return;
                }
                // Check if consuming a wall phasing unit is necessary.
                else if (!player.isGhostItemActive() && this.game.maze.getGrid().getIsWall(player.currTile, dirVector)) {
                        this.game.accumulators.consumeUnit(_AccumulatorConstants.AccumulatorKey.WALL_PHASING_KEY);
                    }
            // Disable auto-move on current player
            player.isManuallyControlled = isManual;
            player.moveCount++;
            player.reduceSmartPathingDistance();
            // Reset timer for auto-moves
            if (isManual) {
                // Spawn new bot unless it exists already.
                if (this.game.upgrades.isUpgraded(_UpgradeConstants.UpgradeKey.PLAYER_MOVE_INDEPENDENTLY)) {
                    if (!this.isAutoBotPresent()) {
                        this.createNewPlayerObj(player.currTile, this.game.maze.getMazeId());
                        this.game.rngBot.enableReEnableBotMovementTimer();
                    } else {
                        // If independence upgraded, don't re-enable the timer to have a bot take over.
                        this.game.rngBot.disableReEnableBotMovementTimer();
                    }
                } else {
                    // Only set the movement timer if independent movement disabled.
                    this.game.rngBot.enableReEnableBotMovementTimer();
                }
            }
            // Must update tile vector before checking manual movement.
            this.game.maze.updatePlayerTileByTileVector(playerId, dirVector);
        }
    }, {
        key: "getPlayerIdList",
        value: function getPlayerIdList() {
            var playerIdArr = [];
            this.playerMap.forEach(function (player) {
                playerIdArr.push(player.id);
            });
            return playerIdArr;
        }
        // Assumption: there should only be max 2 players on the same tile at a time.

    }, {
        key: "getPlayerIdsAtTile",
        value: function getPlayerIdsAtTile(tile) {
            var playerIdList = [];
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = this.playerMap[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var _step4$value = _slicedToArray(_step4.value, 2),
                        id = _step4$value[0],
                        player = _step4$value[1];

                    if ((0, _MazeUtils.isTileEqual)(tile, player.currTile)) {
                        playerIdList.push(player.id);
                    }
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            return playerIdList;
        }
    }, {
        key: "getNewPlayerId",
        value: function getNewPlayerId() {
            for (var i = 0;; i++) {
                if (!this.playerMap.has(i)) return i;
            }
        }
    }, {
        key: "deletePlayer",
        value: function deletePlayer(playerId) {
            if (!this.playerMap.has(playerId)) return;
            var player = this.getPlayer(playerId);
            var currTile = player.currTile;
            this.playerMap.delete(playerId);
            this.game.maze.setTileBackgroundColor(currTile);
        }
    }, {
        key: "getPlayer",
        value: function getPlayer(playerId) {
            if (!this.playerMap.has(playerId)) return null;
            return this.playerMap.get(playerId);
        }
    }, {
        key: "getPlayerColorAtTile",
        value: function getPlayerColorAtTile(tile) {
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = this.playerMap.values()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var player = _step5.value;

                    if ((0, _MazeUtils.isTileEqual)(tile, player.currTile)) {
                        if (player.isManuallyControlled) {
                            return this.game.colors.getPlayerColor();
                        } else if (player.isUnlimitedSplitItemActive()) {
                            return this.game.colors.getUnlimitedSplitPlayerColor();
                        } else if (player.isGhostItemActive()) {
                            return this.game.colors.getGhostItemPlayerColor();
                        } else {
                            return this.game.colors.getBotColor();
                        }
                    }
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }

            return null;
        }
    }, {
        key: "isOccupiedByPlayer",
        value: function isOccupiedByPlayer(tile) {
            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
                for (var _iterator6 = this.playerMap[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var _step6$value = _slicedToArray(_step6.value, 2),
                        id = _step6$value[0],
                        player = _step6$value[1];

                    if ((0, _MazeUtils.isTileEqual)(tile, player.currTile)) {
                        return player;
                    }
                }
            } catch (err) {
                _didIteratorError6 = true;
                _iteratorError6 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
                        _iterator6.return();
                    }
                } finally {
                    if (_didIteratorError6) {
                        throw _iteratorError6;
                    }
                }
            }

            return null;
        }
    }, {
        key: "getPreviousTile",
        value: function getPreviousTile(playerId) {
            if (!this.playerMap.has(playerId)) return null;
            return this.getPlayer(playerId).prevTile;
        }
    }, {
        key: "getCurrTile",
        value: function getCurrTile(playerId) {
            if (!this.playerMap.has(playerId)) return null;
            return this.getPlayer(playerId).currTile;
        }
    }, {
        key: "playerExists",
        value: function playerExists(playerId) {
            return this.playerMap.has(playerId);
        }
    }, {
        key: "playerHasSmartPathing",
        value: function playerHasSmartPathing(playerId) {
            if (!this.playerMap.has(playerId)) return false;
            return this.game.players.getPlayer(playerId).isSmartPathingActive();
        }
    }, {
        key: "shouldPlayerAutoPath",
        value: function shouldPlayerAutoPath(playerId) {
            if (!this.game.mazeRequirements.hasMetMazeCompletionRequirements()) return;
            var currTile = this.getPlayer(playerId).currTile;
            var currDistanceFromExit = this.game.maze.getSmartPathingDistanceFromExit(currTile);
            // TODO: these should be separated from one another
            var autoExitMazeUpgradeLevel = this.game.upgrades.getUpgradeLevel(_UpgradeConstants.UpgradeKey.AUTO_EXIT_MAZE);
            var playerHasSmartPathing = this.playerHasSmartPathing(playerId);
            // Check if within X tiles of exit (1 per upgrade) and player has no smart pathing
            if (currDistanceFromExit > autoExitMazeUpgradeLevel && !playerHasSmartPathing) {
                return false;
            }
            return true;
        }
    }]);

    return PlayerManager;
}();

},{"../constants/AccumulatorConstants":5,"../constants/UpgradeConstants":13,"../models/Player":64,"./MazeUtils":36}],39:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Points = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _UpgradeConstants = require("../constants/UpgradeConstants");

var _Serializable2 = require("../models/Serializable");

var _Stats = require("../models/Stats");

var _PointsHistoryTracker = require("../models/PointsHistoryTracker");

var _PowerUpConstants = require("../constants/PowerUpConstants");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SERIALIZABLE_PROPERTIES = ['points'];
var BASE_POINT_MULTPLIER = 1;

var Points = exports.Points = function (_Serializable) {
    _inherits(Points, _Serializable);

    function Points(game) {
        _classCallCheck(this, Points);

        var _this = _possibleConstructorReturn(this, (Points.__proto__ || Object.getPrototypeOf(Points)).call(this, SERIALIZABLE_PROPERTIES));

        _this.game = game;
        _this.points = 0.0;
        _this.pointsHistoryTracker = new _PointsHistoryTracker.PointsHistoryTracker(_this.game, _Stats.StatsKey.AVERAGE_POINTS_EARNED_PER_SECOND);
        return _this;
    }

    _createClass(Points, [{
        key: "resetPoints",
        value: function resetPoints() {
            this.points = 0.0;
            this.pointsHistoryTracker.resetHistory();
            this.game.ui.setPointsText();
        }
    }, {
        key: "addPoints",
        value: function addPoints(pointsEarned) {
            var playerId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var statsKeyList = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
            var ignorePointsHistory = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

            this.points += pointsEarned;
            this.game.stats.addStatsToKeyList(pointsEarned, statsKeyList);
            this.game.stats.addStatsToKey(pointsEarned, _Stats.StatsKey.TOTAL_POINTS_EARNED);
            // These points do not apply to points history (average)
            if (!ignorePointsHistory) {
                this.game.points.pointsHistoryTracker.addNumber(pointsEarned);
            }
            this.game.upgrades.updateAllUpgradeUi();
            this.game.ui.setPointsText();
        }
    }, {
        key: "spendPoints",
        value: function spendPoints(amount) {
            this.points = Math.max(0, this.points - amount);
            this.game.stats.addStatsToKey(amount, _Stats.StatsKey.TOTAL_POINTS_SPENT);
            this.game.ui.setPointsText();
            this.game.upgrades.updateAllUpgradeUi();
        }
    }, {
        key: "getPointMultplier",
        value: function getPointMultplier() {
            var pointMultpliers = this.game.upgrades.getUpgradeValue(_UpgradeConstants.UpgradeKey.TILE_MULTIPLIER_STRENGTH);
            return this.game.powerUps.isPowerUpActive(_PowerUpConstants.PowerUpKey.TILE_MULTIPLIER) ? pointMultpliers : BASE_POINT_MULTPLIER;
        }
    }, {
        key: "getPointsPerVisit",
        value: function getPointsPerVisit() {
            var isVisitedAlready = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
            var useNextLevel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var pointsPerTile = this.game.upgrades.getUpgradeValue(_UpgradeConstants.UpgradeKey.POINTS_PER_VISIT, useNextLevel);
            if (isVisitedAlready) {
                pointsPerTile *= this.getPointsPerRevisitMultiplier();
            }
            return pointsPerTile;
        }
    }, {
        key: "getPointsPerRevisitMultiplier",
        value: function getPointsPerRevisitMultiplier() {
            return this.game.upgrades.getUpgradeValue(_UpgradeConstants.UpgradeKey.POINTS_PER_REVISIT);
        }
    }, {
        key: "addVisitPoints",
        value: function addVisitPoints(isVisitedAlready, playerId) {
            var tileCount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

            var points = this.getPointsPerVisit(isVisitedAlready) * tileCount;
            if (points === 0) return;
            var multipliedPoints = points * this.getPointMultplier();
            this.game.stats.addStatsToKey(multipliedPoints - points, _Stats.StatsKey.TOTAL_TILE_MULTIPLIER_ITEM_POINTS_EARNED);
            var stats = isVisitedAlready ? [_Stats.StatsKey.TOTAL_POINTS_EARNED_FROM_REVISITED_TILES] : [_Stats.StatsKey.TOTAL_POINTS_EARNED_FROM_VISITED_TILES];
            this.addPoints(multipliedPoints, playerId, stats);
        }
    }, {
        key: "addMazeCompletionBonus",
        value: function addMazeCompletionBonus(playerId) {
            var bonus = this.game.upgrades.getUpgradeValue(_UpgradeConstants.UpgradeKey.MAZE_COMPLETION_BONUS);
            this.addPoints(bonus, playerId, [_Stats.StatsKey.TOTAL_POINTS_EARNED_FROM_MAZE_COMPLETIONS]);
        }
    }]);

    return Points;
}(_Serializable2.Serializable);

},{"../constants/PowerUpConstants":10,"../constants/UpgradeConstants":13,"../models/PointsHistoryTracker":65,"../models/Serializable":67,"../models/Stats":68}],40:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PowerUpManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PowerUpConstants = require("../constants/PowerUpConstants");

var _PointsMultiplierPowerUp = require("../powerUps/PointsMultiplierPowerUp");

var _SpeedUpPowerUp = require("../powerUps/SpeedUpPowerUp");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PowerUpManager = exports.PowerUpManager = function () {
    function PowerUpManager(game) {
        _classCallCheck(this, PowerUpManager);

        this.game = game;
        this.powerUpMap = new Map();
        this.initPowerUpMap();
    }

    _createClass(PowerUpManager, [{
        key: "updateAllPowerUpsUi",
        value: function updateAllPowerUpsUi() {
            for (var powerUpKey in _PowerUpConstants.PowerUpKey) {
                this.powerUpMap.get(powerUpKey).updateUi();
            }
        }
    }, {
        key: "initPowerUpMap",
        value: function initPowerUpMap() {
            for (var powerUpKey in _PowerUpConstants.PowerUpKey) {
                this.createPowerUp(powerUpKey);
            }
        }
    }, {
        key: "createPowerUp",
        value: function createPowerUp(powerUpKey) {
            if (powerUpKey === _PowerUpConstants.PowerUpKey.TILE_MULTIPLIER) {
                this.powerUpMap.set(powerUpKey, new _PointsMultiplierPowerUp.PointsMultiplierPowerUp(this.game));
            } else if (powerUpKey === _PowerUpConstants.PowerUpKey.SPEED_UP) {
                this.powerUpMap.set(powerUpKey, new _SpeedUpPowerUp.SpeedUpPowerUp(this.game));
            } else {
                console.error('Failed to power up type.  No valid type: ' + powerUpKey);
                return;
            }
        }
    }, {
        key: "getPowerUp",
        value: function getPowerUp(powerUpKey) {
            return this.powerUpMap.get(powerUpKey);
        }
    }, {
        key: "activatePowerUp",
        value: function activatePowerUp(powerUpKey) {
            this.getPowerUp(powerUpKey).activatePowerUpTimer();
        }
    }, {
        key: "isPowerUpActive",
        value: function isPowerUpActive(powerUpKey) {
            return this.powerUpMap.get(powerUpKey).isPowerUpActive();
        }
    }]);

    return PowerUpManager;
}();

},{"../constants/PowerUpConstants":10,"../powerUps/PointsMultiplierPowerUp":69,"../powerUps/SpeedUpPowerUp":70}],41:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RNGBotManager = exports.BotSplitDirectionMode = exports.DEV_MODE_MOVEMENT_SPEED = exports.BOT_MERGE_FRUSTRATION_TILE_DISTANCE = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PowerUpConstants = require("../constants/PowerUpConstants");

var _UpgradeConstants = require("../constants/UpgradeConstants");

var _Stats = require("../models/Stats");

var _MazeUtils = require("./MazeUtils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BASE_MOVEMENT_SPEED = 1000;
var BASE_MOVEMENT_REDUCTION = 0.9825;
var AUTO_RE_ENABLE_RNG_BOT_TIMER = 3000;
var BOT_MERGE_FRUSTRATION_TILE_DISTANCE = exports.BOT_MERGE_FRUSTRATION_TILE_DISTANCE = 15;
var DEV_MODE_MOVEMENT_SPEED = exports.DEV_MODE_MOVEMENT_SPEED = 2;
//TODO: unimplemented usage
var BotSplitDirectionMode = exports.BotSplitDirectionMode = undefined;
(function (BotSplitDirectionMode) {
    BotSplitDirectionMode["UNVISITED_ONLY"] = "UNVISITED_ONLY";
    BotSplitDirectionMode["NO_NEW_TILES_FIVE_SECONDS"] = "NO_NEW_TILES_FIVE_SECONDS";
    BotSplitDirectionMode["NO_NEW_TILES_TEN_SECONDS"] = "NO_NEW_TILES_TEN_SECONDS";
    BotSplitDirectionMode["ALWAYS"] = "ALWAYS";
})(BotSplitDirectionMode || (exports.BotSplitDirectionMode = BotSplitDirectionMode = {}));

var RNGBotManager = exports.RNGBotManager = function () {
    function RNGBotManager(game) {
        _classCallCheck(this, RNGBotManager);

        this.botTileCountSinceLastUnvisitedTile = 0;
        this.game = game;
        this.rngBotGlobalInterval = null;
        this.rngBotReEnableMovementTimer = null;
        this.clickToMoveInterval = null;
        this.clickToMoveDirections = [];
    }

    _createClass(RNGBotManager, [{
        key: "enableGlobalRngBot",
        value: function enableGlobalRngBot() {
            var _this = this;

            var upgradeSpeed = this.game.upgrades.getUpgradeLevel(_UpgradeConstants.UpgradeKey.BOT_MOVEMENT_SPEED);
            var isSpeedPowerUpActive = this.game.powerUps.isPowerUpActive(_PowerUpConstants.PowerUpKey.SPEED_UP);
            var isBotsFrustrated = this.isBotFrustrated();
            clearInterval(this.rngBotGlobalInterval);
            this.rngBotGlobalInterval = setInterval(function () {
                if (!_this.game.upgrades.isUpgraded(_UpgradeConstants.UpgradeKey.AUTO_MOVE)) return;
                // Move each player.
                _this.game.players.getPlayerIdList().forEach(function (playerId) {
                    var player = _this.game.players.getPlayer(playerId);
                    if (player == null || player.isManuallyControlled) return;
                    _this.moveRandomly(playerId);
                });
                if (_this.game.dev.isSpeedRunEnabled()) {
                    var botNormalSpeedInMs = _this.game.rngBot.getBotMoveInterval(false, true);
                    _this.game.stats.addStatsToKey(botNormalSpeedInMs, _Stats.StatsKey.TOTAL_RNG_BOT_SPEED_RUN_TIME);
                }
                // Every iteration, increase the time since unvisited
                _this.botTileCountSinceLastUnvisitedTile++;
                // Reset the interval with the new time interval
                if (upgradeSpeed !== _this.game.upgrades.getUpgradeLevel(_UpgradeConstants.UpgradeKey.BOT_MOVEMENT_SPEED) || isSpeedPowerUpActive !== _this.game.powerUps.isPowerUpActive(_PowerUpConstants.PowerUpKey.SPEED_UP) || isBotsFrustrated !== _this.isBotFrustrated()) {
                    _this.disableGlobalRngBot();
                    _this.enableGlobalRngBot();
                }
            }, this.getBotMoveInterval());
        }
    }, {
        key: "getBotMoveInterval",
        value: function getBotMoveInterval() {
            var useNextLevel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
            var ignoreDevSpeedRun = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            // if (isDevMode) return DEV_MODE_MOVEMENT_SPEED;
            if (this.game.dev.isSpeedRunEnabled() && !ignoreDevSpeedRun) return DEV_MODE_MOVEMENT_SPEED;
            //FIXME: this should not be based on the upgrade level.
            var speedPowerUpMultiplier = this.game.powerUps.isPowerUpActive(_PowerUpConstants.PowerUpKey.SPEED_UP) ? 1 / this.game.upgrades.getUpgradeValue(_UpgradeConstants.UpgradeKey.SPEED_UP_MULTIPLIER_STRENGTH) : 1;
            var speedFrustrationMultiplier = this.isBotFrustrated() ? _UpgradeConstants.BOT_FRUSTRATION_SPEED_MULTIPLIER : 1;
            var upgradeLevel = this.game.upgrades.getUpgradeLevel(_UpgradeConstants.UpgradeKey.BOT_MOVEMENT_SPEED, false, useNextLevel);
            return BASE_MOVEMENT_SPEED * speedPowerUpMultiplier * speedFrustrationMultiplier * Math.pow(BASE_MOVEMENT_REDUCTION, upgradeLevel);
        }
    }, {
        key: "disableGlobalRngBot",
        value: function disableGlobalRngBot() {
            clearInterval(this.rngBotGlobalInterval);
            this.rngBotGlobalInterval = null;
            clearInterval(this.rngBotReEnableMovementTimer);
            this.rngBotReEnableMovementTimer = null;
        }
        // After a short delay, manually controlled bots will start moving again.

    }, {
        key: "enableReEnableBotMovementTimer",
        value: function enableReEnableBotMovementTimer() {
            var _this2 = this;

            this.disableReEnableBotMovementTimer();
            this.rngBotReEnableMovementTimer = setTimeout(function () {
                var player = _this2.game.players.getManuallyControlledPlayer();
                if (!player) return;
                player.isManuallyControlled = false;
                _this2.disableReEnableBotMovementTimer();
            }, AUTO_RE_ENABLE_RNG_BOT_TIMER);
        }
    }, {
        key: "disableReEnableBotMovementTimer",
        value: function disableReEnableBotMovementTimer() {
            clearTimeout(this.rngBotReEnableMovementTimer);
            this.rngBotReEnableMovementTimer = null;
        }
    }, {
        key: "disableGlobalMovement",
        value: function disableGlobalMovement() {
            clearInterval(this.rngBotGlobalInterval);
            this.rngBotGlobalInterval = null;
        }
    }, {
        key: "disableClickToMoveInterval",
        value: function disableClickToMoveInterval() {
            clearInterval(this.clickToMoveInterval);
            this.clickToMoveInterval = null;
            this.clickToMoveDirections = [];
        }
    }, {
        key: "enableClickToMoveInterval",
        value: function enableClickToMoveInterval(clickToMoveDirsArr) {
            var _this3 = this;

            this.disableClickToMoveInterval();
            this.clickToMoveDirections = clickToMoveDirsArr;
            this.clickToMoveInterval = setInterval(function () {
                var player = _this3.game.players.getManuallyControlledPlayer();
                if (!player || _this3.clickToMoveDirections.length === 0 || _this3.clickToMoveInterval == null) {
                    _this3.disableClickToMoveInterval();
                    return;
                }
                _this3.game.players.movePlayer(player.id, _this3.clickToMoveDirections.shift(), true);
            }, this.game.upgrades.getUpgradeValue(_UpgradeConstants.UpgradeKey.CLICK_TO_MOVE_SPEED_MULTIPLIER_UPGRADE));
        }
    }, {
        key: "moveRandomly",
        value: function moveRandomly(playerId) {
            if (!this.game.players.playerExists(playerId)) return;
            var dirArr = this.chooseRandomDirectionsArr(playerId);
            var player = this.game.players.getPlayer(playerId);
            if (dirArr.length === 0) {
                // If player can't move, ensure no destructible tiles are holding them
                if (player != null) this.game.maze.clearDestructibleTilesFromTile(player.currTile);
                return;
            }
            if (dirArr.length === 1) {
                this.game.players.movePlayer(playerId, dirArr[0]);
            } else {
                this.game.maze.spawnSplitBot(player, dirArr);
            }
        }
    }, {
        key: "chooseRandomDirectionsArr",
        value: function chooseRandomDirectionsArr(playerId) {
            // All possible directions
            var validDirs = this.game.maze.getValidDirectionsByPlayerId(playerId);
            var player = this.game.players.getPlayer(playerId);
            if (validDirs.length === 0 || !player) {
                return [];
            }
            // Filter all directions based on upgrades applied (excluding enforced dirs)
            var filteredValidDirs = this.getFilteredDirectionList(validDirs, playerId);
            // Determine how many splits should be allowed
            var possibleNewSplits = this.game.maze.getPossibleSplitBotCount(validDirs.length, player);
            // Check for Auto-Exit, Smart pathing, and lucky guess
            var enforcedDirection = this.getEnforcedDirection(validDirs, filteredValidDirs, playerId);
            if (enforcedDirection) {
                // Filter out enforced direction from "extra" directions
                filteredValidDirs = filteredValidDirs.filter(function (dir) {
                    return !(0, _MazeUtils.isTileEqual)(enforcedDirection, dir);
                });
                player.clearMostRecentDecisionPoint();
                //(*) Enforced dirctions MUST BE first in the list. Current player takes first move.
                // Add extra directions for splitting purposes -- allow splitting despite knowing correct direction
                // Prioritize the enforced direction, but allow other unvisited (filtered) directions
                return possibleNewSplits > 0 && filteredValidDirs.length > 0 ? [enforcedDirection].concat((0, _MazeUtils.getRandomXValuesFromArray)(filteredValidDirs, possibleNewSplits)) : [enforcedDirection];
            }
            // Determine if there is an unvisited tile -- only allow splitting if so. It's also used for last pathway assessment.
            var unvisitedTileDirections = this.game.maze.prioritizeUnvisitedDirection(playerId, filteredValidDirs, true, possibleNewSplits);
            var hasUnvisitedTile = unvisitedTileDirections.length > 0;
            if (filteredValidDirs.length === 0) {
                return [];
            }
            // Must have at least two possible directions and one split available.
            else if (hasUnvisitedTile && possibleNewSplits > 0 && filteredValidDirs.length >= 2) {
                    var numDirectionsToPick = Math.min(possibleNewSplits + 1, filteredValidDirs.length);
                    player.clearMostRecentDecisionPoint();
                    return (0, _MazeUtils.getRandomXValuesFromArray)(filteredValidDirs, numDirectionsToPick);
                }
                // Avoid the most recent pathway taken.
                else if (this.game.upgrades.isUpgraded(_UpgradeConstants.UpgradeKey.BOT_REMEMBER_LAST_PATHWAY)) {
                        var noRevisitOrDeadendDirs = this.getFilteredDirectionList(validDirs, playerId, true);
                        // Only if there is a decision to remember
                        if (noRevisitOrDeadendDirs.length > 1) {
                            if (!player.isAtMostRecentDecisionPointTile()) {
                                player.clearMostRecentDecisionPoint();
                            }
                            // If unvisited option, then prioritze it.
                            return [player.getAndUpdateDecisionPointTileNextDecision(noRevisitOrDeadendDirs, unvisitedTileDirections)];
                        }
                    }
            // Randomly pick one.
            return [filteredValidDirs[(0, _MazeUtils.getRandomInteger)(0, filteredValidDirs.length - 1)]];
        }
    }, {
        key: "getEnforcedDirection",
        value: function getEnforcedDirection(validDirs, upgradeFilteredDirs, playerId) {
            var enforcedDirection = null;
            // Check for Auto-Exit and Smart pathing
            if (this.game.players.shouldPlayerAutoPath(playerId)) {
                enforcedDirection = this.game.maze.filterPlayerExitMazeDirection(playerId, validDirs);
            }
            // Check for lucky guess moves.  Skip if enforced direction already applied.
            if (!enforcedDirection && this.isMovementLucky(validDirs.length)) {
                // Use FILTERED set of directions such that you don't backtrack randomly based on "luck"
                enforcedDirection = this.game.maze.filterPlayerExitMazeDirection(playerId, upgradeFilteredDirs);
            }
            return enforcedDirection;
        }
        // Filter out directions based on bot upgrades

    }, {
        key: "getFilteredDirectionList",
        value: function getFilteredDirectionList(validDirs, playerId) {
            var excludeUnvisitedCheck = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            if (!validDirs) {
                return null;
            }
            // Remove all dead end tiles from possible directions.
            if (this.game.upgrades.getUpgradeLevel(_UpgradeConstants.UpgradeKey.BOT_REMEMBER_DEADEND_TILES) >= 1) {
                var filteredDirs = this.game.maze.filterDeadEndTiles(playerId, validDirs);
                if (filteredDirs.length > 0) {
                    validDirs = filteredDirs;
                }
            }
            // Prioritize any adjacent unvisited tiles if any.
            if (!excludeUnvisitedCheck && this.game.upgrades.isUpgraded(_UpgradeConstants.UpgradeKey.PRIORITIZE_UNVISITED)) {
                var unvisitedDirsArr = this.game.maze.prioritizeUnvisitedDirection(playerId, validDirs);
                if (unvisitedDirsArr.length > 0) {
                    return unvisitedDirsArr;
                }
            }
            // Avoid revisiting the last position if possible.
            if (this.game.upgrades.isUpgraded(_UpgradeConstants.UpgradeKey.AVOID_REVISIT_LAST_POSITION)) {
                var noRevisitDirs = this.game.maze.filterAvoidRevisitLastPosition(playerId, validDirs);
                if (noRevisitDirs.length > 0) {
                    return noRevisitDirs;
                }
            }
            // No fancy moves, just choose random ones.
            return validDirs;
        }
    }, {
        key: "isMovementLucky",
        value: function isMovementLucky(dirCount) {
            if (!this.game.upgrades.isUpgraded(_UpgradeConstants.UpgradeKey.BOT_LUCKY_GUESS)) {
                return false;
            }
            var luckOdds = this.game.upgrades.getUpgradeValue(_UpgradeConstants.UpgradeKey.BOT_LUCKY_GUESS);
            // Example (2 dir): 50% + 3% = 53% likely to guess correct
            // Example (3 dir): 33% + 3% = 36% likely to guess correct
            var randomNum = Math.random();
            var baseOdds = 1.0 / dirCount;
            var correctChoiceOdds = baseOdds + luckOdds;
            // If you would not have made the correct choice otherwise
            if (baseOdds < randomNum && randomNum < correctChoiceOdds) {
                this.game.stats.addStatsToKey(1, _Stats.StatsKey.TOTAL_LUCKY_GUESSES);
            }
            return correctChoiceOdds > randomNum;
        }
    }, {
        key: "isBotFrustrated",
        value: function isBotFrustrated() {
            if (!this.game.upgrades.isUpgraded(_UpgradeConstants.UpgradeKey.BOT_FRUSTRATION_UPGRADE, true)) {
                return false;
            }
            var frustrationTileCountMinimum = this.game.upgrades.getUpgradeValue(_UpgradeConstants.UpgradeKey.BOT_FRUSTRATION_UPGRADE);
            return this.botTileCountSinceLastUnvisitedTile > frustrationTileCountMinimum;
        }
    }, {
        key: "isBotMergeFrustrated",
        value: function isBotMergeFrustrated() {
            return this.botTileCountSinceLastUnvisitedTile >= BOT_MERGE_FRUSTRATION_TILE_DISTANCE;
        }
    }, {
        key: "setFoundUnvisitedTile",
        value: function setFoundUnvisitedTile() {
            this.botTileCountSinceLastUnvisitedTile = 0;
        }
    }]);

    return RNGBotManager;
}();

},{"../constants/PowerUpConstants":10,"../constants/UpgradeConstants":13,"../models/Stats":68,"./MazeUtils":36}],42:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SAVE_GAME_INTERVAL = 20000;
var SAVE_GAME_LOCAL_STORE_KEY = 'a-mazing-idle';
var SAVE_TOAST_VISIBILITY_DURATION = 3000;

var SaveManager = exports.SaveManager = function () {
    function SaveManager(game) {
        var _this = this;

        _classCallCheck(this, SaveManager);

        this.createSaveJsonObject = function () {
            var gamePropList = _this.game.getSerializablePropertyList();
            var gameJson = {};
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = gamePropList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var gameProp = _step.value;

                    if (_typeof(_this.game[gameProp]) === 'object') {
                        gameJson[gameProp] = _this.game[gameProp].serialize();
                    } else {
                        gameJson[gameProp] = _this.game[gameProp];
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return JSON.stringify(gameJson);
        };
        this.importSaveJsonObject = function (jsonObj) {
            for (var gameProp in jsonObj) {
                if (_typeof(jsonObj[gameProp]) === 'object') {
                    _this.game[gameProp].deserialize(jsonObj[gameProp]);
                } else {
                    _this.game[gameProp] = jsonObj[gameProp];
                }
            }
        };
        this.game = game;
        this.saveInterval = null;
    }

    _createClass(SaveManager, [{
        key: 'enableSaveTimer',
        value: function enableSaveTimer() {
            var _this2 = this;

            if (this.game.dev.isDisableUi()) return;
            this.disableSaveTimer();
            this.saveInterval = setInterval(function () {
                _this2.saveGameToLocalStorage();
            }, SAVE_GAME_INTERVAL);
        }
    }, {
        key: 'disableSaveTimer',
        value: function disableSaveTimer() {
            clearInterval(this.saveInterval);
            this.saveInterval = null;
        }
    }, {
        key: 'saveGameToLocalStorage',
        value: function saveGameToLocalStorage() {
            this.game.ui.showSaveModalForDuration(SAVE_TOAST_VISIBILITY_DURATION);
            var saveJson = this.createSaveJsonObject();
            this.persistSaveToLocalStorage(saveJson);
        }
    }, {
        key: 'loadGameSaveFromLocalStorage',
        value: function loadGameSaveFromLocalStorage() {
            var gameObj = this.getSaveJsonFromLocalStorage();
            if (!gameObj) {
                // Set the default game version.
                this.game.initGameVersion();
                return;
            }
            this.importSaveJsonObject(gameObj);
            this.game.offline.processOfflinePoints();
        }
    }, {
        key: 'importGameSaveFromString',
        value: function importGameSaveFromString(saveJsonString) {
            // Disable save timer to prevent overrides
            this.game.save.disableSaveTimer();
            // Attempt to parse and save new string
            if (this.tryParseSaveJson(saveJsonString) == null) {
                this.game.save.enableSaveTimer();
                return false;
            }
            this.persistSaveToLocalStorage(saveJsonString);
            this.game.reloadFromLocalStorage();
            return true;
        }
    }, {
        key: 'persistSaveToLocalStorage',
        value: function persistSaveToLocalStorage(jsonString) {
            localStorage.setItem(SAVE_GAME_LOCAL_STORE_KEY, jsonString);
        }
    }, {
        key: 'getSaveJsonFromLocalStorage',
        value: function getSaveJsonFromLocalStorage() {
            var json = localStorage.getItem(SAVE_GAME_LOCAL_STORE_KEY);
            if (json === null || json === "") {
                return null;
            }
            return this.tryParseSaveJson(json);
        }
    }, {
        key: 'tryParseSaveJson',
        value: function tryParseSaveJson(json) {
            try {
                return JSON.parse(json);
            } catch (e) {
                console.error('Failed to parse local game save.  Error: ' + e.message + '.  \n\nLocal Save Json: ' + json);
                return null;
            }
        }
    }, {
        key: 'clearLocalStorage',
        value: function clearLocalStorage() {
            localStorage.clear();
        }
    }, {
        key: 'copySaveToClipboard',
        value: function copySaveToClipboard() {
            var saveJson = this.getSaveJsonFromLocalStorage();
            if (!saveJson) return;
            var el = document.createElement('textarea');
            el.value = JSON.stringify(saveJson);
            el.setAttribute('readonly', '');
            el.style.position = 'absolute';
            el.style.left = '-9999px';
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
        }
    }]);

    return SaveManager;
}();

},{}],43:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StatsManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Serializable2 = require("../models/Serializable");

var _Stats = require("../models/Stats");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_STAT_VALUE = 0;
var SERIALIZABLE_PROPERTIES = ['statsMap', 'saveTimeStamp'];
var ONE_SECOND_IN_MS = 1000;

var StatsManager = exports.StatsManager = function (_Serializable) {
    _inherits(StatsManager, _Serializable);

    function StatsManager(game) {
        _classCallCheck(this, StatsManager);

        var _this = _possibleConstructorReturn(this, (StatsManager.__proto__ || Object.getPrototypeOf(StatsManager)).call(this, SERIALIZABLE_PROPERTIES));

        _this.statsMap = new Map();
        _this.tripometerMap = new Map();
        _this.game = game;
        return _this;
    }

    _createClass(StatsManager, [{
        key: "initStatsMap",
        value: function initStatsMap() {
            for (var statsKey in _Stats.StatsKey) {
                this.statsMap.set(statsKey, DEFAULT_STAT_VALUE);
            }
            this.initTripometerMazeStats();
            this.game.ui.updateAllStatsKey();
        }
    }, {
        key: "clearCurrentMazeStats",
        value: function clearCurrentMazeStats() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = _Stats.CURRENT_MAZE_STATS[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var currMazeStat = _step.value;

                    this.statsMap.set(currMazeStat, DEFAULT_STAT_VALUE);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: "clearStatValue",
        value: function clearStatValue(statsKey) {
            this.tripometerMap.set(statsKey, DEFAULT_STAT_VALUE);
            this.statsMap.set(statsKey, DEFAULT_STAT_VALUE);
        }
    }, {
        key: "addAverageStatValue",
        value: function addAverageStatValue(value, totalStatsKey, averageStatKey) {
            // Trip/Regular stats need to calculate based on pre-existing values (totals).  Update each independently.
            this.handleAverageStatValue(value, totalStatsKey, averageStatKey, false);
            this.handleAverageStatValue(value, totalStatsKey, averageStatKey, true);
            this.game.ui.updateStatsKey(averageStatKey);
        }
    }, {
        key: "handleAverageStatValue",
        value: function handleAverageStatValue(value, totalStatsKey, averageStatKey) {
            var isTripStat = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

            var currAverageValue = this.getStat(averageStatKey, isTripStat);
            var newValue = value;
            if (currAverageValue !== 0) {
                var totalCount = this.getStat(totalStatsKey, isTripStat);
                var statDiff = (value - currAverageValue) / (totalCount + 1);
                newValue = value + statDiff;
            }
            if (isTripStat) {
                this.tripometerMap.set(averageStatKey, newValue);
            } else {
                this.statsMap.set(averageStatKey, newValue);
            }
        }
    }, {
        key: "initTripometerMazeStats",
        value: function initTripometerMazeStats() {
            for (var statsKey in _Stats.StatsKey) {
                this.tripometerMap.set(statsKey, DEFAULT_STAT_VALUE);
            }
            this.game.ui.updateAllStatsKey();
        }
    }, {
        key: "getStat",
        value: function getStat(statsKey) {
            var useTripStat = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (!this.hasMazeStat(statsKey)) return 0;
            return useTripStat ? this.tripometerMap.get(statsKey) : this.statsMap.get(statsKey);
        }
    }, {
        key: "hasMazeStat",
        value: function hasMazeStat(statsKey) {
            return this.statsMap.has(statsKey);
        }
    }, {
        key: "addStatsToKey",
        value: function addStatsToKey(value, statsKey) {
            var oldValue = this.getStat(statsKey);
            this.statsMap.set(statsKey, value + oldValue);
            var oldTripValue = this.getStat(statsKey, true);
            this.tripometerMap.set(statsKey, value + oldTripValue);
            this.game.ui.updateStatsKey(statsKey);
        }
    }, {
        key: "setStatsToKey",
        value: function setStatsToKey(value, statsKey) {
            this.statsMap.set(statsKey, value);
            this.tripometerMap.set(statsKey, value);
            this.game.ui.updateStatsKey(statsKey);
        }
    }, {
        key: "addStatsToKeyList",
        value: function addStatsToKeyList(amount, statsKeyList) {
            if (!statsKeyList) return;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = statsKeyList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var statsKey = _step2.value;

                    this.addStatsToKey(amount, statsKey);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }, {
        key: "startGamePlayedTicker",
        value: function startGamePlayedTicker() {
            var _this2 = this;

            clearInterval(this.timePlayedTimer);
            this.timePlayedTimer = setInterval(function () {
                _this2.addStatsToKey(1, _Stats.StatsKey.TOTAL_TIME_PLAYED_IN_SECONDS);
                _this2.addStatsToKey(1, _Stats.StatsKey.TOTAL_TIME_PLAYED_IN_CURRENT_BIOME_IN_SECONDS);
            }, ONE_SECOND_IN_MS);
        }
    }, {
        key: "deserialize",
        value: function deserialize(jsonObj) {
            _get(StatsManager.prototype.__proto__ || Object.getPrototypeOf(StatsManager.prototype), "deserialize", this).call(this, jsonObj);
            // Reset average points earned at each reload
            this.statsMap.set(_Stats.StatsKey.AVERAGE_POINTS_EARNED_PER_SECOND, 0);
        }
    }]);

    return StatsManager;
}(_Serializable2.Serializable);

},{"../models/Serializable":67,"../models/Stats":68}],44:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ToggleManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ToggleConstants = require("../constants/ToggleConstants");

var _UpgradeConstants = require("../constants/UpgradeConstants");

var _UiIdConstants = require("../constants/UiIdConstants");

var _Serializable2 = require("../models/Serializable");

var _UserInterface = require("./UserInterface");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SERIALIZABLE_PROPERTIES = ['toggleMap'];

var ToggleManager = exports.ToggleManager = function (_Serializable) {
    _inherits(ToggleManager, _Serializable);

    function ToggleManager(game) {
        _classCallCheck(this, ToggleManager);

        var _this = _possibleConstructorReturn(this, (ToggleManager.__proto__ || Object.getPrototypeOf(ToggleManager)).call(this, SERIALIZABLE_PROPERTIES));

        _this.game = game;
        return _this;
    }

    _createClass(ToggleManager, [{
        key: "initToggleMap",
        value: function initToggleMap() {
            this.toggleMap = new Map();
        }
    }, {
        key: "initCheckBoxStates",
        value: function initCheckBoxStates() {
            for (var toggleKey in _ToggleConstants.ToggleKey) {
                var uiId = (0, _ToggleConstants.getToggleKeyUiId)(toggleKey);
                var isChecked = this.toggleMap.get(toggleKey);
                _UserInterface.UserInterface.setCheckBoxState(uiId, isChecked == null ? true : isChecked);
            }
        }
    }, {
        key: "isUpgradeKeyToggledOn",
        value: function isUpgradeKeyToggledOn(upgradeKey) {
            if (!this.game.upgrades.isUpgraded(_UpgradeConstants.UpgradeKey.TOGGLE_PANEL_UPGRADE, false) || !this.doesUpgradeKeyHaveToggle(upgradeKey)) {
                // If no toggle for the upgrade, it is always on!
                return true;
            }
            var toggleKey = (0, _ToggleConstants.getUpgradeKeyToToggleKeyMapping)(upgradeKey);
            return this.isToggleChecked(toggleKey);
        }
    }, {
        key: "updateTogglePanelVisibility",
        value: function updateTogglePanelVisibility() {
            var setVisible = this.game.upgrades.isUpgraded(_UpgradeConstants.UpgradeKey.TOGGLE_PANEL_UPGRADE);
            this.game.ui.setUiIdVisible(_UiIdConstants.TOGGLES_ROOT_PANEL, setVisible);
        }
    }, {
        key: "isTogglePanelUnlocked",
        value: function isTogglePanelUnlocked() {
            return this.game.upgrades.isUpgraded(_UpgradeConstants.UpgradeKey.TOGGLE_PANEL_UPGRADE);
        }
    }, {
        key: "updateTogglePanelCheckBoxVisibility",
        value: function updateTogglePanelCheckBoxVisibility(upgradeKey) {
            if (!this.doesUpgradeKeyHaveToggle(upgradeKey)) {
                return;
            }
            var toggleKey = (0, _ToggleConstants.getUpgradeKeyToToggleKeyMapping)(upgradeKey);
            this.setTogglePanelVisible(toggleKey, this.shouldUpgradeToggleBeVisible(upgradeKey));
        }
    }, {
        key: "getAllToggleUiIds",
        value: function getAllToggleUiIds() {
            var toggleUiIds = [];
            for (var toggleKey in _ToggleConstants.ToggleKey) {
                toggleUiIds.push((0, _ToggleConstants.getToggleKeyUiId)(toggleKey));
            }
            return toggleUiIds;
        }
    }, {
        key: "persistToggleToggleState",
        value: function persistToggleToggleState() {
            for (var toggleKey in _ToggleConstants.ToggleKey) {
                var isChecked = this.isToggleChecked(toggleKey);
                this.toggleMap.set(toggleKey, isChecked);
            }
        }
    }, {
        key: "setTogglePanelVisible",
        value: function setTogglePanelVisible(toggleKey) {
            var setVisible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            var uiId = this.getToggleKeyPanelId(toggleKey);
            this.game.ui.setUiIdVisible(uiId, setVisible);
        }
    }, {
        key: "shouldUpgradeToggleBeVisible",
        value: function shouldUpgradeToggleBeVisible(upgradeKey) {
            return this.game.upgrades.isUpgraded(upgradeKey, false) && this.game.upgrades.isUnlocked(upgradeKey);
        }
    }, {
        key: "doesUpgradeKeyHaveToggle",
        value: function doesUpgradeKeyHaveToggle(upgradeKey) {
            return (0, _ToggleConstants.getUpgradeKeyToToggleKeyMapping)(upgradeKey) != null;
        }
    }, {
        key: "getToggleKeyPanelId",
        value: function getToggleKeyPanelId(toggleKey) {
            return (0, _ToggleConstants.getToggleKeyUiId)(toggleKey) + _UiIdConstants.TOGGLES_PANEL_SUFFIX;
        }
    }, {
        key: "isToggleChecked",
        value: function isToggleChecked(toggleKey) {
            var toggleCheckboxUiId = (0, _ToggleConstants.getToggleKeyUiId)(toggleKey);
            return _UserInterface.UserInterface.isCheckBoxChecked(toggleCheckboxUiId);
        }
    }]);

    return ToggleManager;
}(_Serializable2.Serializable);

},{"../constants/ToggleConstants":11,"../constants/UiIdConstants":12,"../constants/UpgradeConstants":13,"../models/Serializable":67,"./UserInterface":46}],45:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UpgradeManager = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _AvoidRevisitLastPositionUpgrade = require("../upgrades/definitions/bots/AvoidRevisitLastPositionUpgrade");

var _PrioritizeUnvisitedUpgrade = require("../upgrades/definitions/bots/PrioritizeUnvisitedUpgrade");

var _AutoExitMazeUpgrade = require("../upgrades/definitions/bots/AutoExitMazeUpgrade");

var _FruitPickupPointsMultiplierUpgrade = require("../upgrades/definitions/items/FruitPickupPointsMultiplierUpgrade");

var _FruitSpawnRateUpgrade = require("../upgrades/definitions/items/FruitSpawnRateUpgrade");

var _BrainSpawnRateUpgrade = require("../upgrades/definitions/items/BrainSpawnRateUpgrade");

var _BrainTileDistanceUpgrade = require("../upgrades/definitions/items/BrainTileDistanceUpgrade");

var _DeadEndItemSpawnRateUpgrade = require("../upgrades/definitions/items/DeadEndItemSpawnRateUpgrade");

var _BotRememberDeadEndTilesUpgrade = require("../upgrades/definitions/bots/BotRememberDeadEndTilesUpgrade");

var _BotMovementSpeedUpgrade = require("../upgrades/definitions/bots/BotMovementSpeedUpgrade");

var _BotFrustrationUpgrade = require("../upgrades/definitions/bots/BotFrustrationUpgrade");

var _MazeCompletionBonusUpgrade = require("../upgrades/definitions/maze/MazeCompletionBonusUpgrade");

var _PointsPerVisitUpgrade = require("../upgrades/definitions/maze/PointsPerVisitUpgrade");

var _PointsPerRevisitUpgrade = require("../upgrades/definitions/maze/PointsPerRevisitUpgrade");

var _MazeEntranceSpawnChanceUpgrade = require("../upgrades/definitions/maze/MazeEntranceSpawnChanceUpgrade");

var _TogglePanelUpgrade = require("../upgrades/definitions/maze/TogglePanelUpgrade");

var _BiomeUpgrade = require("../upgrades/definitions/maze/BiomeUpgrade");

var _ExperimentsPanelUpgrade = require("../upgrades/definitions/maze/ExperimentsPanelUpgrade");

var _DestructibleWallPhasingUpgrade = require("../upgrades/definitions/bots/DestructibleWallPhasingUpgrade");

var _DestructibleWallPhasingTotalUpgrade = require("../upgrades/definitions/bots/DestructibleWallPhasingTotalUpgrade");

var _DestructibleWallPhasingFrequencyUpgrade = require("../upgrades/definitions/bots/DestructibleWallPhasingFrequencyUpgrade");

var _BotSplitDirectionUpgrade = require("../upgrades/definitions/bots/BotSplitDirectionUpgrade");

var _BotSplitAutoMergeUpgrade = require("../upgrades/definitions/bots/BotSplitAutoMergeUpgrade");

var _BotSmartMergeUpgrade = require("../upgrades/definitions/bots/BotSmartMergeUpgrade");

var _BotLuckUpgrade = require("../upgrades/definitions/bots/BotLuckUpgrade");

var _BotRememberLastPathwayUpgrade = require("../upgrades/definitions/bots/BotRememberLastPathwayUpgrade");

var _BotAutoMoveUpgrade = require("../upgrades/definitions/bots/BotAutoMoveUpgrade");

var _TileMultiplierDurationUpgrade = require("../upgrades/definitions/items/TileMultiplierDurationUpgrade");

var _TileMultiplierSpawnRateUpgrade = require("../upgrades/definitions/items/TileMultiplierSpawnRateUpgrade");

var _TileMultiplierStrengthUpgrade = require("../upgrades/definitions/items/TileMultiplierStrengthUpgrade");

var _TileMultiplierStackingUpgrade = require("../upgrades/definitions/items/TileMultiplierStackingUpgrade");

var _SpeedUpSpawnRateUpgrade = require("../upgrades/definitions/items/SpeedUpSpawnRateUpgrade");

var _SpeedUpMultiplierStrengthUpgrade = require("../upgrades/definitions/items/SpeedUpMultiplierStrengthUpgrade");

var _SpeedUpDurationUpgrade = require("../upgrades/definitions/items/SpeedUpDurationUpgrade");

var _SpeedUpStackingUpgrade = require("../upgrades/definitions/items/SpeedUpStackingUpgrade");

var _PlayerWallPhasingUpgrade = require("../upgrades/definitions/movement/PlayerWallPhasingUpgrade");

var _PlayerWallPhasingFrequencyUpgrade = require("../upgrades/definitions/movement/PlayerWallPhasingFrequencyUpgrade");

var _PlayerWallPhasingTotalUpgrade = require("../upgrades/definitions/movement/PlayerWallPhasingTotalUpgrade");

var _PlayerMoveIndependentlyUpgrade = require("../upgrades/definitions/movement/PlayerMoveIndependentlyUpgrade");

var _TeleportPlayerBacktoBotUpgrade = require("../upgrades/definitions/movement/TeleportPlayerBacktoBotUpgrade");

var _TeleportBotBackToPlayerUpgrade = require("../upgrades/definitions/movement/TeleportBotBackToPlayerUpgrade");

var _ClickToMoveUpgrade = require("../upgrades/definitions/movement/ClickToMoveUpgrade");

var _ClickToMoveSpeedMultiplierUpgrade = require("../upgrades/definitions/movement/ClickToMoveSpeedMultiplierUpgrade");

var _ClickToMoveTileDistanceUpgrade = require("../upgrades/definitions/movement/ClickToMoveTileDistanceUpgrade");

var _UpgradeConstants = require("../constants/UpgradeConstants");

var _Serializable2 = require("../models/Serializable");

var _UserInterface = require("./UserInterface");

var _devUtils = require("../dev/devUtils");

var _UiIdConstants = require("../constants/UiIdConstants");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UPGRADE_MAP_PROPERTY_KEY = 'upgradeMap';
var SERIALIZABLE_PROPERTIES = [UPGRADE_MAP_PROPERTY_KEY];

var UpgradeManager = exports.UpgradeManager = function (_Serializable) {
    _inherits(UpgradeManager, _Serializable);

    function UpgradeManager(game) {
        _classCallCheck(this, UpgradeManager);

        var _this = _possibleConstructorReturn(this, (UpgradeManager.__proto__ || Object.getPrototypeOf(UpgradeManager)).call(this, SERIALIZABLE_PROPERTIES));

        _this.game = game;
        _this.initHeaderCollapseClickEvents();
        return _this;
    }

    _createClass(UpgradeManager, [{
        key: "initUpgrades",
        value: function initUpgrades() {
            this.upgradeMap = new Map();
            // Maze / Points
            this.createUpgrade(new _ExperimentsPanelUpgrade.ExperimentsPanelUpgrade(this.game, _UpgradeConstants.UpgradeKey.EXPERIMENTS_PANEL_UPGRADE));
            this.createUpgrade(new _PointsPerVisitUpgrade.PointsPerVisitUpgrade(this.game, _UpgradeConstants.UpgradeKey.POINTS_PER_VISIT));
            this.createUpgrade(new _MazeCompletionBonusUpgrade.MazeCompletionBonusUpgrade(this.game, _UpgradeConstants.UpgradeKey.MAZE_COMPLETION_BONUS));
            this.createUpgrade(new _PointsPerRevisitUpgrade.PointsPerRevisitUpgrade(this.game, _UpgradeConstants.UpgradeKey.POINTS_PER_REVISIT));
            this.createUpgrade(new _TogglePanelUpgrade.TogglePanelUpgrade(this.game, _UpgradeConstants.UpgradeKey.TOGGLE_PANEL_UPGRADE));
            this.createUpgrade(new _MazeEntranceSpawnChanceUpgrade.MazeEntranceSpawnChanceUpgrade(this.game, _UpgradeConstants.UpgradeKey.MAZE_ENTRANCE_SPAWN_CHANCE_UPGRADE));
            this.createUpgrade(new _DestructibleWallPhasingUpgrade.DestructibleWallPhasingUpgrade(this.game, _UpgradeConstants.UpgradeKey.DESTRUCTIBLE_WALL_PHASING_UPGRADE));
            this.createUpgrade(new _DestructibleWallPhasingTotalUpgrade.DestructibleWallPhasingTotalUpgrade(this.game, _UpgradeConstants.UpgradeKey.DESTRUCTIBLE_WALL_PHASING_TOTAL_UPGRADE));
            this.createUpgrade(new _DestructibleWallPhasingFrequencyUpgrade.DestructibleWallPhasingFrequencyUpgrade(this.game, _UpgradeConstants.UpgradeKey.DESTRUCTIBLE_WALL_PHASING_FREQUENCY_UPGRADE));
            // Bot
            this.createUpgrade(new _BotAutoMoveUpgrade.BotAutoMoveUpgrade(this.game, _UpgradeConstants.UpgradeKey.AUTO_MOVE));
            this.createUpgrade(new _AutoExitMazeUpgrade.AutoExitMazeUpgrade(this.game, _UpgradeConstants.UpgradeKey.AUTO_EXIT_MAZE));
            this.createUpgrade(new _AvoidRevisitLastPositionUpgrade.AvoidRevisitLastPositionUpgrade(this.game, _UpgradeConstants.UpgradeKey.AVOID_REVISIT_LAST_POSITION));
            this.createUpgrade(new _BotMovementSpeedUpgrade.BotMovementSpeedUpgrade(this.game, _UpgradeConstants.UpgradeKey.BOT_MOVEMENT_SPEED));
            this.createUpgrade(new _BotSplitAutoMergeUpgrade.BotSplitAutoMergeUpgrade(this.game, _UpgradeConstants.UpgradeKey.BOT_SPLIT_BOT_AUTO_MERGE));
            this.createUpgrade(new _BotSmartMergeUpgrade.BotSmartMergeUpgrade(this.game, _UpgradeConstants.UpgradeKey.BOT_SMART_MERGE));
            this.createUpgrade(new _BotSplitDirectionUpgrade.BotSplitDirectionUpgrade(this.game, _UpgradeConstants.UpgradeKey.BOT_SPLIT_DIRECTION));
            this.createUpgrade(new _BotRememberDeadEndTilesUpgrade.BotRememberDeadEndTilesUpgrade(this.game, _UpgradeConstants.UpgradeKey.BOT_REMEMBER_DEADEND_TILES));
            this.createUpgrade(new _BrainTileDistanceUpgrade.BrainTileDistanceUpgrade(this.game, _UpgradeConstants.UpgradeKey.BRAIN_TILE_DISTANCE));
            this.createUpgrade(new _PrioritizeUnvisitedUpgrade.PrioritizeUnvisitedUpgrade(this.game, _UpgradeConstants.UpgradeKey.PRIORITIZE_UNVISITED));
            this.createUpgrade(new _BotFrustrationUpgrade.BotFrustrationUpgrade(this.game, _UpgradeConstants.UpgradeKey.BOT_FRUSTRATION_UPGRADE));
            this.createUpgrade(new _BotLuckUpgrade.BotLuckyGuessUpgrade(this.game, _UpgradeConstants.UpgradeKey.BOT_LUCKY_GUESS));
            this.createUpgrade(new _BotRememberLastPathwayUpgrade.BotRememberLastPathwayUpgrade(this.game, _UpgradeConstants.UpgradeKey.BOT_REMEMBER_LAST_PATHWAY));
            // Item
            this.createUpgrade(new _FruitPickupPointsMultiplierUpgrade.FruitPickupPointsMultiplierUpgrade(this.game, _UpgradeConstants.UpgradeKey.FRUIT_PICKUP_POINTS));
            this.createUpgrade(new _FruitSpawnRateUpgrade.FruitSpawnRateUpgrade(this.game, _UpgradeConstants.UpgradeKey.FRUIT_SPAWN));
            this.createUpgrade(new _BrainSpawnRateUpgrade.BrainSpawnRateUpgrade(this.game, _UpgradeConstants.UpgradeKey.BRAIN_SPAWN));
            this.createUpgrade(new _DeadEndItemSpawnRateUpgrade.DeadEndItemSpawnRateUpgrade(this.game, _UpgradeConstants.UpgradeKey.DEAD_END_ITEM_SPAWN_RATE));
            // Item - Power Up
            this.createUpgrade(new _SpeedUpDurationUpgrade.SpeedUpDurationUpgrade(this.game, _UpgradeConstants.UpgradeKey.SPEED_UP_DURATION));
            this.createUpgrade(new _SpeedUpSpawnRateUpgrade.SpeedUpSpawnRateUpgrade(this.game, _UpgradeConstants.UpgradeKey.SPEED_UP_SPAWN_RATE));
            this.createUpgrade(new _SpeedUpMultiplierStrengthUpgrade.SpeedUpMultiplierStrengthUpgrade(this.game, _UpgradeConstants.UpgradeKey.SPEED_UP_MULTIPLIER_STRENGTH));
            this.createUpgrade(new _SpeedUpStackingUpgrade.SpeedUpStackingUpgrade(this.game, _UpgradeConstants.UpgradeKey.SPEED_UP_STACKING_UPGRADE));
            this.createUpgrade(new _TileMultiplierDurationUpgrade.TileMultiplierDurationUpgrade(this.game, _UpgradeConstants.UpgradeKey.TILE_MULTIPLIER_DURATION));
            this.createUpgrade(new _TileMultiplierSpawnRateUpgrade.TileMultiplierSpawnRateUpgrade(this.game, _UpgradeConstants.UpgradeKey.TILE_MULTIPLIER_SPAWN_RATE));
            this.createUpgrade(new _TileMultiplierStrengthUpgrade.TileMultiplierStrengthUpgrade(this.game, _UpgradeConstants.UpgradeKey.TILE_MULTIPLIER_STRENGTH));
            this.createUpgrade(new _TileMultiplierStackingUpgrade.TileMultiplierStackingUpgrade(this.game, _UpgradeConstants.UpgradeKey.TILE_MULTIPLIER_STACKING_UPGRADE));
            // Movement
            this.createUpgrade(new _PlayerMoveIndependentlyUpgrade.PlayerMoveIndependentlyUpgrade(this.game, _UpgradeConstants.UpgradeKey.PLAYER_MOVE_INDEPENDENTLY));
            this.createUpgrade(new _TeleportPlayerBacktoBotUpgrade.TeleportPlayerBacktoBotUpgrade(this.game, _UpgradeConstants.UpgradeKey.TELEPORT_PLAYER_BACK_TO_BOT));
            this.createUpgrade(new _TeleportBotBackToPlayerUpgrade.TeleportBotBackToPlayerUpgrade(this.game, _UpgradeConstants.UpgradeKey.TELEPORT_BOT_BACK_TO_PLAYER));
            this.createUpgrade(new _PlayerWallPhasingUpgrade.PlayerWallPhasingUpgrade(this.game, _UpgradeConstants.UpgradeKey.PLAYER_WALL_PHASING_UPGRADE));
            this.createUpgrade(new _PlayerWallPhasingFrequencyUpgrade.PlayerWallPhasingFrequencyUpgrade(this.game, _UpgradeConstants.UpgradeKey.PLAYER_WALL_PHASING_FREQUENCY_UPGRADE));
            this.createUpgrade(new _PlayerWallPhasingTotalUpgrade.PlayerWallPhasingTotalUpgrade(this.game, _UpgradeConstants.UpgradeKey.PLAYER_WALL_PHASING_TOTAL_UPGRADE));
            this.createUpgrade(new _ClickToMoveUpgrade.ClickToMoveUpgrade(this.game, _UpgradeConstants.UpgradeKey.CLICK_TO_MOVE_UPGRADE));
            this.createUpgrade(new _ClickToMoveSpeedMultiplierUpgrade.ClickToMoveSpeedMultiplierUpgrade(this.game, _UpgradeConstants.UpgradeKey.CLICK_TO_MOVE_SPEED_MULTIPLIER_UPGRADE));
            this.createUpgrade(new _ClickToMoveTileDistanceUpgrade.ClickToMoveTileDistanceUpgrade(this.game, _UpgradeConstants.UpgradeKey.CLICK_TO_MOVE_TILE_DISTANCE_UPGRADE));
            // Biomes
            this.createUpgrade(new _BiomeUpgrade.BiomeUpgrade(this.game, _UpgradeConstants.UpgradeKey.BIOME));
        }
    }, {
        key: "getUpgradeValue",
        value: function getUpgradeValue(upgradeKey) {
            var useNextLevel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            return this.getUpgrade(upgradeKey).getUpgradeValue(useNextLevel);
        }
    }, {
        key: "updateAllUpgradeUi",
        value: function updateAllUpgradeUi() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.upgradeMap[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _step$value = _slicedToArray(_step.value, 2),
                        upgradeKey = _step$value[0],
                        upgrade = _step$value[1];

                    upgrade.updateUiProperties();
                    upgrade.updateUiDisabled();
                    upgrade.updateVisibility();
                    this.game.toggles.updateTogglePanelCheckBoxVisibility(upgradeKey);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            this.updateUpgradeSectionVisibility();
        }
    }, {
        key: "hideAllUpgradeNewTextForUnlockedUpgrades",
        value: function hideAllUpgradeNewTextForUnlockedUpgrades() {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.upgradeMap[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _step2$value = _slicedToArray(_step2.value, 2),
                        upgradeKey = _step2$value[0],
                        upgrade = _step2$value[1];

                    if (upgrade.isUnlocked()) {
                        upgrade.setVisibilityOfNewText(false);
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }, {
        key: "createUpgrade",
        value: function createUpgrade(upgrade) {
            this.upgradeMap.set(upgrade.upgradeKey, upgrade);
        }
    }, {
        key: "getUpgrade",
        value: function getUpgrade(upgradeKey) {
            if (!this.hasUpgrade(upgradeKey)) {
                console.error("Unexpected upgrade key requested: " + upgradeKey);
                return null;
            }
            return this.upgradeMap.get(upgradeKey);
        }
    }, {
        key: "hasUpgrade",
        value: function hasUpgrade(upgradeKey) {
            return this.upgradeMap.has(upgradeKey);
        }
    }, {
        key: "getUpgradeLevel",
        value: function getUpgradeLevel(upgradeKey) {
            var checkUpgradeToggleState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
            var useNextLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            if (!this.hasUpgrade(upgradeKey)) return 0;
            if (checkUpgradeToggleState && !this.game.toggles.isUpgradeKeyToggledOn(upgradeKey)) {
                return 0;
            }
            return this.getUpgrade(upgradeKey).upgradeLevel + (useNextLevel ? 1 : 0);
        }
    }, {
        key: "isUpgraded",
        value: function isUpgraded(upgradeKey) {
            var checkUpgradeToggleState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            if (!this.hasUpgrade(upgradeKey)) return false;
            var isUpgraded = this.getUpgrade(upgradeKey).getIsUpgraded();
            if (checkUpgradeToggleState) {
                return isUpgraded && this.game.toggles.isUpgradeKeyToggledOn(upgradeKey);
            }
            return isUpgraded;
        }
    }, {
        key: "serializeProperty",
        value: function serializeProperty(property) {
            // Upgrade map will export the upgrade level of each key
            if (property === UPGRADE_MAP_PROPERTY_KEY) {
                var obj = {};
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = this.upgradeMap[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var _step3$value = _slicedToArray(_step3.value, 2),
                            k = _step3$value[0],
                            v = _step3$value[1];

                        obj[k] = v.upgradeLevel;
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }

                return obj;
            } else {
                return _get(UpgradeManager.prototype.__proto__ || Object.getPrototypeOf(UpgradeManager.prototype), "serializeProperty", this).call(this, property);
            }
        }
    }, {
        key: "deserializeProperty",
        value: function deserializeProperty(property, value) {
            // Upgrade map will restore the upgrade level of each key
            if (property === UPGRADE_MAP_PROPERTY_KEY) {
                for (var upgradeKey in value) {
                    if (this.upgradeMap.has(upgradeKey)) {
                        this.upgradeMap.get(upgradeKey).upgradeLevel = parseInt(value[upgradeKey]);
                    } else {
                        console.error("Failed to deserialize upgrade key: ", upgradeKey);
                    }
                }
            } else {
                return _get(UpgradeManager.prototype.__proto__ || Object.getPrototypeOf(UpgradeManager.prototype), "deserializeProperty", this).call(this, property, value);
            }
        }
    }, {
        key: "isUnlocked",
        value: function isUnlocked(upgradeKey) {
            if (!this.hasUpgrade(upgradeKey)) return false;
            return this.upgradeMap.get(upgradeKey).isUnlocked();
        }
    }, {
        key: "isUpgradeAvailableForUpgradeType",
        value: function isUpgradeAvailableForUpgradeType(upgradeType) {
            for (var upgradeKey in _UpgradeConstants.UpgradeKey) {
                var upgrade = this.getUpgrade(upgradeKey);
                if (upgrade && upgrade.upgradeType === upgradeType && !upgrade.isMaxUpgradeLevel() && upgrade.isUnlocked()) {
                    return true;
                }
            }
            return false;
        }
    }, {
        key: "updateUpgradeSectionVisibility",
        value: function updateUpgradeSectionVisibility() {
            for (var upgradeType in _UpgradeConstants.UpgradeType) {
                var isUpgradeAvailable = this.isUpgradeAvailableForUpgradeType(upgradeType);
                var uiKey = _UpgradeConstants.UPGRADE_TYPE_TO_HEADER_UI_KEY_MAP.get(upgradeType);
                if (uiKey) {
                    _UserInterface.UserInterface.setIdVisible(uiKey, isUpgradeAvailable || _devUtils.DEBUG_ALL_BUTTONS_VISIBLE);
                }
            }
        }
    }, {
        key: "getAllUnlockedUpgrades",
        value: function getAllUnlockedUpgrades() {
            var upgradeKeyList = [];
            for (var upgradeType in _UpgradeConstants.UpgradeKey) {
                if (this.isUnlocked(upgradeType)) {
                    upgradeKeyList.push(upgradeType);
                }
            }
            return upgradeKeyList;
        }
    }, {
        key: "isUnlockAllUpgradesEnabled",
        value: function isUnlockAllUpgradesEnabled() {
            return _UserInterface.UserInterface.isCheckBoxChecked(_UiIdConstants.EXPERIMENT_UNLOCK_ALL_UPGRADES_CHECKBOX_UI_ID);
        }
    }, {
        key: "isShowPurchasedUpgradesEnabled",
        value: function isShowPurchasedUpgradesEnabled() {
            return _UserInterface.UserInterface.isCheckBoxChecked(_UiIdConstants.EXPERIMENT_SHOW_PURCHASED_UPGRADES_CHECKBOX_UI_ID);
        }
    }, {
        key: "initHeaderCollapseClickEvents",
        value: function initHeaderCollapseClickEvents() {
            var _loop = function _loop(upgradeType) {
                var panelUiId = _UpgradeConstants.UPGRADE_TYPE_TO_PANEL_UI_KEY_MAP.get(upgradeType);
                var headerUiId = _UpgradeConstants.UPGRADE_TYPE_TO_HEADER_UI_KEY_MAP.get(upgradeType);
                if (panelUiId && headerUiId) {
                    var isVisible = true;
                    $("#" + headerUiId).click(function () {
                        _UserInterface.UserInterface.setIdVisible(panelUiId, isVisible);
                        isVisible = !isVisible;
                    });
                }
            };

            for (var upgradeType in _UpgradeConstants.UpgradeType) {
                _loop(upgradeType);
            }
        }
    }]);

    return UpgradeManager;
}(_Serializable2.Serializable);

exports.default = UpgradeManager;

},{"../constants/UiIdConstants":12,"../constants/UpgradeConstants":13,"../dev/devUtils":15,"../models/Serializable":67,"../upgrades/definitions/bots/AutoExitMazeUpgrade":72,"../upgrades/definitions/bots/AvoidRevisitLastPositionUpgrade":73,"../upgrades/definitions/bots/BotAutoMoveUpgrade":74,"../upgrades/definitions/bots/BotFrustrationUpgrade":75,"../upgrades/definitions/bots/BotLuckUpgrade":76,"../upgrades/definitions/bots/BotMovementSpeedUpgrade":77,"../upgrades/definitions/bots/BotRememberDeadEndTilesUpgrade":78,"../upgrades/definitions/bots/BotRememberLastPathwayUpgrade":79,"../upgrades/definitions/bots/BotSmartMergeUpgrade":80,"../upgrades/definitions/bots/BotSplitAutoMergeUpgrade":81,"../upgrades/definitions/bots/BotSplitDirectionUpgrade":82,"../upgrades/definitions/bots/DestructibleWallPhasingFrequencyUpgrade":83,"../upgrades/definitions/bots/DestructibleWallPhasingTotalUpgrade":84,"../upgrades/definitions/bots/DestructibleWallPhasingUpgrade":85,"../upgrades/definitions/bots/PrioritizeUnvisitedUpgrade":86,"../upgrades/definitions/items/BrainSpawnRateUpgrade":87,"../upgrades/definitions/items/BrainTileDistanceUpgrade":88,"../upgrades/definitions/items/DeadEndItemSpawnRateUpgrade":89,"../upgrades/definitions/items/FruitPickupPointsMultiplierUpgrade":90,"../upgrades/definitions/items/FruitSpawnRateUpgrade":91,"../upgrades/definitions/items/SpeedUpDurationUpgrade":92,"../upgrades/definitions/items/SpeedUpMultiplierStrengthUpgrade":93,"../upgrades/definitions/items/SpeedUpSpawnRateUpgrade":94,"../upgrades/definitions/items/SpeedUpStackingUpgrade":95,"../upgrades/definitions/items/TileMultiplierDurationUpgrade":96,"../upgrades/definitions/items/TileMultiplierSpawnRateUpgrade":97,"../upgrades/definitions/items/TileMultiplierStackingUpgrade":98,"../upgrades/definitions/items/TileMultiplierStrengthUpgrade":99,"../upgrades/definitions/maze/BiomeUpgrade":100,"../upgrades/definitions/maze/ExperimentsPanelUpgrade":101,"../upgrades/definitions/maze/MazeCompletionBonusUpgrade":102,"../upgrades/definitions/maze/MazeEntranceSpawnChanceUpgrade":103,"../upgrades/definitions/maze/PointsPerRevisitUpgrade":104,"../upgrades/definitions/maze/PointsPerVisitUpgrade":105,"../upgrades/definitions/maze/TogglePanelUpgrade":106,"../upgrades/definitions/movement/ClickToMoveSpeedMultiplierUpgrade":107,"../upgrades/definitions/movement/ClickToMoveTileDistanceUpgrade":108,"../upgrades/definitions/movement/ClickToMoveUpgrade":109,"../upgrades/definitions/movement/PlayerMoveIndependentlyUpgrade":110,"../upgrades/definitions/movement/PlayerWallPhasingFrequencyUpgrade":111,"../upgrades/definitions/movement/PlayerWallPhasingTotalUpgrade":112,"../upgrades/definitions/movement/PlayerWallPhasingUpgrade":113,"../upgrades/definitions/movement/TeleportBotBackToPlayerUpgrade":114,"../upgrades/definitions/movement/TeleportPlayerBacktoBotUpgrade":115,"./UserInterface":46}],46:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserInterface = exports.ModalType = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Game = require("./Game");

var _MazeUtils = require("./MazeUtils");

var _Stats = require("../models/Stats");

var _UiIdConstants = require("../constants/UiIdConstants");

var _clickToMoveUtils = require("../utils/clickToMoveUtils");

var _ItemConstants = require("../constants/ItemConstants");

var _changeLog = require("../dev/changeLog");

var _uiUtils = require("../utils/uiUtils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MAZE_BORDER_WIDTH = "2.5px";
var TILE_CLASS_NAME = "mazeCell";
var ModalType = exports.ModalType = undefined;
(function (ModalType) {
    ModalType["CHANGE_LOG_MODAL"] = "CHANGE_LOG_MODAL";
    ModalType["CONTROLS_MODAL"] = "CONTROLS_MODAL";
    ModalType["HELP_MODAL"] = "HELP_MODAL";
    ModalType["IMPORT_SAVE_MODAL"] = "IMPORT_SAVE_MODAL";
    ModalType["NEW_GAME_CONFIRM_MODAL"] = "NEW_GAME_CONFIRM_MODAL";
    ModalType["OFFLINE_SCORE_MODAL"] = "OFFLINE_SCORE_MODAL";
    ModalType["SAVE_VERSION_WARNING_MODAL"] = "SAVE_VERSION_WARNING_MODAL";
    ModalType["SETTINGS_MODAL"] = "SETTINGS_MODAL";
    ModalType["STATS_MODAL"] = "STATS_MODAL";
})(ModalType || (exports.ModalType = ModalType = {}));

var UserInterface = exports.UserInterface = function () {
    function UserInterface(game) {
        _classCallCheck(this, UserInterface);

        this.game = game;
        this.activeModalType = null;
    }

    _createClass(UserInterface, [{
        key: "init",
        value: function init() {
            if (this.game.dev.isDisableUi()) return;
            this.initText();
            this.initEvents();
            this.initArrowKeyClickEvents();
        }
    }, {
        key: "initText",
        value: function initText() {
            this.setPointsText();
            this.setChangeLogText();
        }
    }, {
        key: "initArrowKeyClickEvents",
        value: function initArrowKeyClickEvents() {
            var _this = this;

            UserInterface.setIdVisible(_UiIdConstants.ARROW_KEYS_ROOT_PANEL, this.isMobile());
            if (this.isMobile()) {
                $("#" + _UiIdConstants.ARROW_KEY_UP_BUTTON_UI_ID).click(function (e) {
                    return (0, _uiUtils.handlePlayerMoveEvent)(_this.game, _MazeUtils.DIRECTION_UP);
                });
                $("#" + _UiIdConstants.ARROW_KEY_LEFT_BUTTON_UI_ID).click(function (e) {
                    return (0, _uiUtils.handlePlayerMoveEvent)(_this.game, _MazeUtils.DIRECTION_LEFT);
                });
                $("#" + _UiIdConstants.ARROW_KEY_DOWN_BUTTON_UI_ID).click(function (e) {
                    return (0, _uiUtils.handlePlayerMoveEvent)(_this.game, _MazeUtils.DIRECTION_DOWN);
                });
                $("#" + _UiIdConstants.ARROW_KEY_RIGHT_BUTTON_UI_ID).click(function (e) {
                    return (0, _uiUtils.handlePlayerMoveEvent)(_this.game, _MazeUtils.DIRECTION_RIGHT);
                });
            }
        }
    }, {
        key: "setChangeLogText",
        value: function setChangeLogText() {
            UserInterface.setText(_UiIdConstants.CHANGE_LOG_MODAL_VERSION_ID, "v" + _Game.CURRENT_GAME_VERSION);
            UserInterface.setHtml(_UiIdConstants.CHANGE_LOG_MODAL_TEXT_ID, _changeLog.CHANGE_LOG_HTML);
        }
    }, {
        key: "initEvents",
        value: function initEvents() {
            var _this2 = this;

            // Global click event
            $(document).click(function (e) {
                // Close active modal if clicking outside (ie. click target is not descendant of parent id)
                if (_this2.activeModalType) {
                    if ($("#" + _this2.getModalIdByType(_this2.activeModalType)).find(e.target).length === 0) {
                        _this2.setModalVisibilityByType(_this2.activeModalType, false);
                        _this2.activeModalType = null;
                    }
                } else if (e.target.className === TILE_CLASS_NAME) {
                    (0, _clickToMoveUtils.triggerPlayerClickToMoveHandler)(_this2.game, e.target.id);
                }
            });
            //TODO: migrate these to a constants file.
            $("#" + _UiIdConstants.CHANGE_LOG_BUTTON_ID).click(function (e) {
                return _this2.showModalByType(ModalType.CHANGE_LOG_MODAL, true, e);
            });
            $("#" + _UiIdConstants.SAVE_GAME_BUTTON_ID).click(function () {
                return _this2.game.save.saveGameToLocalStorage();
            });
            $("#deleteSaveGame").click(function () {
                return _this2.game.save.clearLocalStorage();
            });
            $("#newGame").click(function (e) {
                return _this2.showModalByType(ModalType.NEW_GAME_CONFIRM_MODAL, true, e);
            });
            $("#helpButton").click(function (e) {
                return _this2.showModalByType(ModalType.HELP_MODAL, true, e);
            });
            $("#importSaveOpenModalButton").click(function (e) {
                $("#importSaveErrorLabel").text("");
                _this2.showModalByType(ModalType.IMPORT_SAVE_MODAL, true, e);
            });
            $("#openControlsModalButton").click(function (e) {
                return _this2.showModalByType(ModalType.CONTROLS_MODAL, true, e);
            });
            $("#settingsButton").click(function (e) {
                return _this2.showModalByType(ModalType.SETTINGS_MODAL, true, e);
            });
            $("#copySaveJson").click(function () {
                return _this2.game.save.copySaveToClipboard();
            });
            $("#importSaveModalButton").click(function () {
                var saveJson = $("#importSaveTextArea").val();
                var importSuccess = _this2.game.save.importGameSaveFromString(saveJson);
                if (importSuccess) {
                    _this2.showModalByType(ModalType.IMPORT_SAVE_MODAL, false);
                }
                $("#importSaveErrorLabel").text(importSuccess ? "" : "Failed to import save json.");
            });
            $("#" + _UiIdConstants.CONFIRM_NEW_GAME_MODAL_BUTTON_YES).click(function () {
                _this2.closeAllModals();
                _this2.game.hardResetGame();
            });
            $("#" + _UiIdConstants.CONFIRM_NEW_GAME_MODAL_BUTTON_NO).click(function () {
                return _this2.closeAllModals();
            });
            // Stats Events
            $("#clearAllStats").click(function () {
                return _this2.game.stats.initStatsMap();
            });
            $("#statsButton").click(function (e) {
                return _this2.showModalByType(ModalType.STATS_MODAL, true, e);
            });
            $("#statsTripometerDisplayCheckbox").click(function (e) {
                return _this2.updateAllStatsKey();
            });
            $("#resetTripometerStatsButton").click(function () {
                _this2.game.stats.initTripometerMazeStats();
                _this2.updateAllStatsKey();
            });
            // Experiment checkbox events
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.game.experiment.getAllExperimentUiIds()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var uiId = _step.value;

                    $("#" + uiId).click(function () {
                        _this2.game.upgrades.updateAllUpgradeUi();
                        _this2.game.experiment.persistExperimentToggleState();
                    });
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            $("#" + _UiIdConstants.EXPERIMENT_NEW_MAZE_BUTTON_UI_ID).click(function () {
                _this2.game.startGame();
            });
            $("#" + _UiIdConstants.EXPERIMENT_MAZE_GRID_TYPE_SELECTOR_UI_ID).change(function () {
                _this2.game.experiment.updateMazeTierSizeSelector();
            });
            // Toggle checkbox events
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.game.toggles.getAllToggleUiIds()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _uiId = _step2.value;

                    $("#" + _uiId).click(function () {
                        return _this2.game.toggles.persistToggleToggleState();
                    });
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }, {
        key: "setPointsText",
        value: function setPointsText() {
            UserInterface.setText(_UiIdConstants.POINTS_UI_ID, "Points: " + UserInterface.getPrettyPrintNumber(this.game.points.points));
        }
    }, {
        key: "printMazeV2",
        value: function printMazeV2() {
            if (this.game.dev.isDisableUi()) return;
            var maze = this.game.maze.getMaze();
            // Extends one before/beyond grid to handle an exit cell.
            for (var y = -1; y < maze.grid.sizeY + 1; y++) {
                var htmlString = "";
                for (var x = -1; x < maze.grid.sizeX + 1; x++) {
                    var tileKey = (0, _MazeUtils.generateTileKey)(x, y);
                    // Place cell element
                    htmlString += "<td id=\"" + tileKey + "\" class=" + TILE_CLASS_NAME + ">&nbsp;</td>";
                }
                $("#maze > tbody").append("<tr>" + htmlString + "</tr>");
            }
            for (var _y = -1; _y < maze.grid.sizeY + 1; _y++) {
                for (var _x = -1; _x < maze.grid.sizeX + 1; _x++) {
                    // Draw edges
                    this.setTileCssV2(maze, { x: _x, y: _y });
                    // Draw item if present
                    this.game.items.drawItem({ x: _x, y: _y });
                }
            }
            this.setFinishLineIcon();
        }
    }, {
        key: "setTileCssV2",
        value: function setTileCssV2(maze, tile) {
            if (this.game.dev.isDisableUi()) return;
            var cssSelector = (0, _MazeUtils.generateTileKey)(tile.x, tile.y);
            this.setMazeBorderCss(cssSelector, "top", maze.getCellWallType(tile, _MazeUtils.MazeDirectionIndex.UP));
            this.setMazeBorderCss(cssSelector, "right", maze.getCellWallType(tile, _MazeUtils.MazeDirectionIndex.RIGHT));
            this.setMazeBorderCss(cssSelector, "bottom", maze.getCellWallType(tile, _MazeUtils.MazeDirectionIndex.DOWN));
            this.setMazeBorderCss(cssSelector, "left", maze.getCellWallType(tile, _MazeUtils.MazeDirectionIndex.LEFT));
        }
        // cssBorderPropertyDirection: top/right/bottom/left

    }, {
        key: "setMazeBorderCss",
        value: function setMazeBorderCss(cssSelector, cssBorderPropertyDirection, val) {
            var borderColor = this.game.colors.getMazeWallColor();
            if (val === _MazeUtils.MazeWallTypes.WALL) {
                $("#" + cssSelector).css("border-" + cssBorderPropertyDirection, MAZE_BORDER_WIDTH + " solid " + borderColor);
            } else if (val === _MazeUtils.MazeWallTypes.DESTRUCTIBLE_WALL) {
                $("#" + cssSelector).css("border-" + cssBorderPropertyDirection, "1.5px dotted " + borderColor);
            } else if (val === _MazeUtils.MazeWallTypes.OUT_OF_BOUNDS_WALL || val == null) {
                $("#" + cssSelector).css("border-" + cssBorderPropertyDirection, "");
            } else {
                $("#" + cssSelector).css("border-" + cssBorderPropertyDirection + "-width", "" + MAZE_BORDER_WIDTH);
                $("#" + cssSelector).css("border-" + cssBorderPropertyDirection + "-style", "hidden");
                $("#" + cssSelector).css("border-" + cssBorderPropertyDirection + "-color", "");
            }
        }
    }, {
        key: "deleteMaze",
        value: function deleteMaze() {
            if (this.game.dev.isDisableUi()) return;
            $("#maze td").remove();
            $("#maze tr").remove();
        }
    }, {
        key: "updateStatsKey",
        value: function updateStatsKey(statsKey) {
            if (!_Stats.STATS_TO_UI_ID_MAP.has(statsKey)) {
                console.debug("No stats key UI registered for: ", statsKey);
                return;
            }
            var statsValue = this.game.stats.getStat(statsKey, UserInterface.isCheckBoxChecked(_UiIdConstants.STATS_TRIPOMETER_CHECKBOX_ID));
            var statsUiId = _Stats.STATS_TO_UI_ID_MAP.get(statsKey);
            if (!$("#" + statsUiId)) {
                console.info("No UI component registerd to stats key: ", statsUiId);
                return;
            }
            $("#" + statsUiId).text(" " + this.getPrettyPrintFormattedStat(statsValue, statsKey));
        }
    }, {
        key: "getPrettyPrintFormattedStat",
        value: function getPrettyPrintFormattedStat(statsValue, statsKey) {
            if (_Stats.STATS_TIME_PRETTY_PRINT_FORMAT.has(statsKey)) {
                return UserInterface.getPrettyPrintTime(statsValue);
            }
            if (_Stats.STATS_PERCENTAGE_PRINT_FORMAT.has(statsKey)) {
                return UserInterface.getPrettyPrintNumber(statsValue * 100) + "%";
            }
            return UserInterface.getPrettyPrintNumber(statsValue);
        }
    }, {
        key: "updateAllStatsKey",
        value: function updateAllStatsKey() {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = _Stats.STATS_TO_UI_ID_MAP.keys()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var statsKey = _step3.value;

                    this.updateStatsKey(statsKey);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        }
        //TODO: all UI static functions should just be in a UIUtil class

    }, {
        key: "setFinishLineIcon",
        value: function setFinishLineIcon() {
            if (this.game.dev.isDisableUi()) return;
            var exitTile = this.game.maze.getGrid().getExternalExitTile(true);
            var tileKey = (0, _MazeUtils.generateTileKey)(exitTile.x, exitTile.y);
            var mazeExitIcon = this.game.mazeRequirements.getFinishLineIcon();
            $("#" + tileKey).css("background-image", "url(\"" + mazeExitIcon + "\")");
            $("#" + tileKey).css("background-repeat", "no-repeat");
            $("#" + tileKey).css("background-position", "center");
            $("#" + tileKey).css("background-size", _ItemConstants.MAZE_ITEM_ICON_SIZE_IN_PX);
            $("#" + tileKey).css("border", MAZE_BORDER_WIDTH + " solid " + this.game.colors.getMazeWallColor());
        }
    }, {
        key: "showModalByType",
        value: function showModalByType(newModalType) {
            var shouldCloseOtherModals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
            var clickEvent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

            // Prevent clicks from propagating to the global modal closing click event
            if (clickEvent) clickEvent.stopPropagation();
            for (var modalType in ModalType) {
                if (shouldCloseOtherModals && modalType !== newModalType) {
                    this.setModalVisibilityByType(modalType, false);
                } else {
                    this.setModalVisibilityByType(newModalType, true);
                    this.activeModalType = newModalType;
                }
            }
        }
    }, {
        key: "setModalVisibilityByType",
        value: function setModalVisibilityByType(modalType, setVisible) {
            UserInterface.setIdVisible(this.getModalIdByType(modalType), setVisible);
        }
    }, {
        key: "getModalIdByType",
        value: function getModalIdByType(modalType) {
            if (modalType === ModalType.SETTINGS_MODAL) {
                return _UiIdConstants.SETTINGS_MODAL_ID;
            } else if (modalType === ModalType.OFFLINE_SCORE_MODAL) {
                // return "offlineModal";
            } else if (modalType === ModalType.STATS_MODAL) {
                return _UiIdConstants.STATS_MODAL_ID;
            } else if (modalType === ModalType.HELP_MODAL) {
                return _UiIdConstants.HELP_MODAL_ID;
            } else if (modalType === ModalType.IMPORT_SAVE_MODAL) {
                return _UiIdConstants.IMPORT_SAVE_MODAL_ID;
            } else if (modalType === ModalType.CONTROLS_MODAL) {
                return _UiIdConstants.CONTROLS_MODAL_ID;
            } else if (modalType === ModalType.SAVE_VERSION_WARNING_MODAL) {
                return _UiIdConstants.SAVE_VERSION_WARNING_MODAL_ID;
            } else if (modalType === ModalType.NEW_GAME_CONFIRM_MODAL) {
                return _UiIdConstants.CONFIRM_NEW_GAME_MODAL_ID;
            } else if (modalType === ModalType.CHANGE_LOG_MODAL) {
                return _UiIdConstants.CHANGE_LOG_MODAL_ID;
            } else {
                console.error("Invalid modal to show: " + modalType);
            }
        }
    }, {
        key: "closeAllModals",
        value: function closeAllModals() {
            for (var modalType in ModalType) {
                this.setModalVisibilityByType(modalType, false);
            }
            this.activeModalType = null;
        }
    }, {
        key: "showSaveModalForDuration",
        value: function showSaveModalForDuration(visibilityDuration) {
            UserInterface.setIdVisible(_UiIdConstants.SAVE_TOAST_MODAL_ID, true);
            setTimeout(function () {
                UserInterface.setIdVisible(_UiIdConstants.SAVE_TOAST_MODAL_ID, false);
            }, visibilityDuration);
        }
    }, {
        key: "setUiIdVisible",
        value: function setUiIdVisible(uiId) {
            var setVisible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
            var displayType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "block";

            $("#" + uiId).css("display", setVisible ? displayType : "none");
        }
    }, {
        key: "setImageIcon",
        value: function setImageIcon(uiId, imgPath, pxSize) {
            $("#" + uiId).css("background-image", "url(\"" + imgPath + "\")");
            $("#" + uiId).css("background-repeat", "no-repeat");
            $("#" + uiId).css("background-position", "center");
            $("#" + uiId).css("background-size", pxSize);
        }
    }, {
        key: "isMobile",
        value: function isMobile() {
            var isMobile = false;
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
                isMobile = true;
                console.info("Displaying button movement keys.");
            }
            console.info("IsMobile: " + isMobile + ".  User Agent: " + navigator.userAgent);
            return isMobile;
        }
    }], [{
        key: "getPrettyPrintNumber",
        value: function getPrettyPrintNumber(num) {
            if (!num) return "0";
            return numberformat.formatShort(num);
        }
    }, {
        key: "getPrettyPrintTime",
        value: function getPrettyPrintTime(numMillis) {
            return new Date(numMillis * 1000).toISOString().substr(14, 5);
        }
    }, {
        key: "getDecimalPrettyPrintNumber",
        value: function getDecimalPrettyPrintNumber(num) {
            var decimalLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            return parseFloat(num.toFixed(decimalLength)).toLocaleString(undefined, { minimumFractionDigits: decimalLength });
        }
    }, {
        key: "setIdVisible",
        value: function setIdVisible(uid) {
            var setVisible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
            var displayType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "block";

            $("#" + uid).css("display", setVisible ? displayType : "none");
        }
    }, {
        key: "setText",
        value: function setText(uiId, text) {
            $("#" + uiId).text(text);
        }
    }, {
        key: "setHtml",
        value: function setHtml(uiId, text) {
            $("#" + uiId).html(text);
        }
    }, {
        key: "setOptionsForSelector",
        value: function setOptionsForSelector(textList, uiId) {
            UserInterface.clearSelector(uiId);
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = textList[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var text = _step4.value;

                    $('<option/>').val(text).text(text).appendTo("#" + uiId);
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }
        }
    }, {
        key: "clearSelector",
        value: function clearSelector(uiId) {
            $("#" + uiId).empty();
        }
    }, {
        key: "setSelectorValue",
        value: function setSelectorValue(value, uiId) {
            $("#" + uiId).val(value);
        }
    }, {
        key: "getSelectorSelectedValue",
        value: function getSelectorSelectedValue(uiId) {
            return $("#" + uiId).val();
        }
    }, {
        key: "isCheckBoxChecked",
        value: function isCheckBoxChecked(uiId) {
            return $("#" + uiId).is(':checked');
        }
    }, {
        key: "setCheckBoxState",
        value: function setCheckBoxState(uiId) {
            var isChecked = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            $("#" + uiId).prop('checked', isChecked);
        }
    }]);

    return UserInterface;
}();

},{"../constants/ItemConstants":9,"../constants/UiIdConstants":12,"../dev/changeLog":14,"../models/Stats":68,"../utils/clickToMoveUtils":117,"../utils/uiUtils":120,"./Game":32,"./MazeUtils":36}],47:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CircleMazeGrid = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _MazeUtils = require("../managers/MazeUtils");

var _MazeGrid2 = require("../models/MazeGrid");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Number of tiles: (1+L)*L/2
// Nearest square size: ROUND(L/SQRT(2))
// Edge width: E
// Num stair tiles: E-1
//     X X X 
//   X X X X X 
// X X X X X X X
// X X X X X X X
// X X X X X X X
//   X X X X X 
//     X X X 
var MIN_SIZE = 4;
var MAZE_GROWTH_MULTIPLE = 3;

var CircleMazeGrid = exports.CircleMazeGrid = function (_MazeGrid) {
    _inherits(CircleMazeGrid, _MazeGrid);

    function CircleMazeGrid(game, mazeConfig) {
        _classCallCheck(this, CircleMazeGrid);

        if (mazeConfig.mazeAlgorithmType === _MazeUtils.MazeAlgorithmType.BINARY_TREE) {
            mazeConfig.mazeAlgorithmType = _MazeUtils.MazeAlgorithmType.BACK_TRACKER;
            console.error("Circle maze grid does not support binary tree algorithm.");
        }
        var mazeSize = CircleMazeGrid.getFittedMazeSize(Math.max(mazeConfig.mazeSizeX, MIN_SIZE));
        mazeConfig.mazeSizeX = mazeSize;
        mazeConfig.mazeSizeY = mazeSize;
        return _possibleConstructorReturn(this, (CircleMazeGrid.__proto__ || Object.getPrototypeOf(CircleMazeGrid)).call(this, game, mazeConfig));
    }
    // Only allows multiples of three starting with 4 (4/7/10/13...)


    _createClass(CircleMazeGrid, [{
        key: "getCircleEdgeSize",

        // E = EdgeSize, M = MazeSize
        // M = E + 2(E-1)
        // E = (M+2) / 3
        value: function getCircleEdgeSize() {
            return (this.sizeX + 2) / 3;
        }
        // Always one less stairs than edge size

    }, {
        key: "getNumStairs",
        value: function getNumStairs() {
            return this.getCircleEdgeSize() - 1;
        }
    }, {
        key: "generateMazeGrid",
        value: function generateMazeGrid() {
            // Generate a normal grid and then mark cells dead
            _get(CircleMazeGrid.prototype.__proto__ || Object.getPrototypeOf(CircleMazeGrid.prototype), "generateMazeGrid", this).call(this);
            this.markDeadCells();
        }
    }, {
        key: "markDeadCells",
        value: function markDeadCells() {
            var numStairTiles = this.getNumStairs();
            var cornerOffset = this.getCircleEdgeSize() + numStairTiles - 1;
            // Top left corner
            for (var y = 0; y < numStairTiles; y++) {
                for (var x = 0; x < numStairTiles - y; x++) {
                    this.setDeadCell({ x: x, y: y });
                }
            }
            // Bottom left edge
            for (var _y = cornerOffset; _y < this.sizeY; _y++) {
                for (var _x = 0; _x < _y - cornerOffset; _x++) {
                    this.setDeadCell({ x: _x, y: _y });
                }
            }
            // Top right corner
            for (var _y2 = 0; _y2 < cornerOffset; _y2++) {
                for (var _x2 = _y2 + cornerOffset + 1; _x2 < this.sizeX; _x2++) {
                    this.setDeadCell({ x: _x2, y: _y2 });
                }
            }
            // // Bottom right edge
            for (var _y3 = cornerOffset; _y3 < this.sizeY; _y3++) {
                for (var _x3 = this.sizeX + cornerOffset - _y3; _x3 < this.sizeX; _x3++) {
                    this.setDeadCell({ x: _x3, y: _y3 });
                }
            }
        }
    }, {
        key: "getValidStartLocations",
        value: function getValidStartLocations() {
            return [_MazeUtils.GridLocation.TOP_MIDDLE, _MazeUtils.GridLocation.BOTTOM_MIDDLE, _MazeUtils.GridLocation.MIDDLE_LEFT, _MazeUtils.GridLocation.MIDDLE_RIGHT];
        }
    }, {
        key: "getValidExitLocations",
        value: function getValidExitLocations() {
            return [_MazeUtils.GridLocation.TOP_MIDDLE, _MazeUtils.GridLocation.BOTTOM_MIDDLE, _MazeUtils.GridLocation.MIDDLE_LEFT, _MazeUtils.GridLocation.MIDDLE_RIGHT];
        }
    }, {
        key: "getDefaultStartingLocation",
        value: function getDefaultStartingLocation() {
            return _MazeUtils.GridLocation.MIDDLE_LEFT;
        }
    }, {
        key: "getDefaultExitLocation",
        value: function getDefaultExitLocation() {
            return _MazeUtils.GridLocation.MIDDLE_RIGHT;
        }
    }], [{
        key: "getFittedMazeSize",
        value: function getFittedMazeSize(size) {
            var multipleOfThree = MAZE_GROWTH_MULTIPLE * Math.floor((size - MIN_SIZE) / MAZE_GROWTH_MULTIPLE);
            return multipleOfThree + MIN_SIZE;
        }
    }]);

    return CircleMazeGrid;
}(_MazeGrid2.MazeGrid);

},{"../managers/MazeUtils":36,"../models/MazeGrid":63}],48:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DiamondMazeGrid = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _MazeUtils = require("../managers/MazeUtils");

var _MazeGrid2 = require("../models/MazeGrid");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Odd based diamond (single edge piece on each side)
//     X
//   X X X
// X X X X X
//   X X X
//     X <-- edge middle piece
//TODO: should pull this into the class and remove pre-constructor requirements.
// Estimated length based on corresponding areas from input X
// Always use odd number since even doesn't make area calculation any closer
var getDiamondOddLength = function getDiamondOddLength(sizeX) {
    // Calculate an area that closely resembles (X * X) dimensions
    var closestArea = Math.sqrt(2 * sizeX * sizeX - 1);
    var flooredLength = Math.floor(closestArea);
    // Only odd lengths are allowed.
    if (isOdd(flooredLength)) {
        return flooredLength;
    }
    // If not odd, ceil will provide odd number. 
    else {
            return Math.ceil(closestArea);
        }
};
var isOdd = function isOdd(num) {
    return num % 2 === 1;
};

var DiamondMazeGrid = exports.DiamondMazeGrid = function (_MazeGrid) {
    _inherits(DiamondMazeGrid, _MazeGrid);

    function DiamondMazeGrid(game, mazeConfig) {
        _classCallCheck(this, DiamondMazeGrid);

        var diamondOddLength = getDiamondOddLength(mazeConfig.mazeSizeX);
        mazeConfig.mazeSizeX = diamondOddLength;
        mazeConfig.mazeSizeY = diamondOddLength;
        return _possibleConstructorReturn(this, (DiamondMazeGrid.__proto__ || Object.getPrototypeOf(DiamondMazeGrid)).call(this, game, mazeConfig));
    }

    _createClass(DiamondMazeGrid, [{
        key: "generateMazeGrid",
        value: function generateMazeGrid() {
            // Generate a normal grid and then mark cells dead
            _get(DiamondMazeGrid.prototype.__proto__ || Object.getPrototypeOf(DiamondMazeGrid.prototype), "generateMazeGrid", this).call(this);
            this.markDeadCells();
        }
        // Number of tiles from wall until edge middle piece

    }, {
        key: "getSingleSideDistance",
        value: function getSingleSideDistance() {
            return (this.sizeX - 1) / 2;
        }
    }, {
        key: "markDeadCells",
        value: function markDeadCells() {
            var edgeDistance = this.getSingleSideDistance();
            // Top left edge
            for (var y = 0; y < edgeDistance; y++) {
                for (var x = 0; x < edgeDistance - y; x++) {
                    this.setDeadCell({ x: x, y: y });
                }
            }
            // Bottom left edge
            for (var _y = edgeDistance + 1; _y < this.sizeY; _y++) {
                for (var _x = 0; _x < _y - edgeDistance; _x++) {
                    this.setDeadCell({ x: _x, y: _y });
                }
            }
            // Top right edge
            for (var _y2 = 0; _y2 < edgeDistance; _y2++) {
                for (var _x2 = _y2 + edgeDistance + 1; _x2 < this.sizeX; _x2++) {
                    this.setDeadCell({ x: _x2, y: _y2 });
                }
            }
            // Bottom right edge
            for (var _y3 = edgeDistance + 1; _y3 < this.sizeY; _y3++) {
                for (var _x3 = this.sizeX - _y3 + edgeDistance; _x3 < this.sizeX; _x3++) {
                    this.setDeadCell({ x: _x3, y: _y3 });
                }
            }
        }
    }, {
        key: "getValidStartLocations",
        value: function getValidStartLocations() {
            return [_MazeUtils.GridLocation.MIDDLE_LEFT, _MazeUtils.GridLocation.MIDDLE_RIGHT, _MazeUtils.GridLocation.TOP_MIDDLE, _MazeUtils.GridLocation.BOTTOM_MIDDLE];
        }
    }, {
        key: "getValidExitLocations",
        value: function getValidExitLocations() {
            return [_MazeUtils.GridLocation.MIDDLE_RIGHT, _MazeUtils.GridLocation.MIDDLE_LEFT, _MazeUtils.GridLocation.TOP_MIDDLE, _MazeUtils.GridLocation.BOTTOM_MIDDLE];
        }
    }, {
        key: "getDefaultStartingLocation",
        value: function getDefaultStartingLocation() {
            return _MazeUtils.GridLocation.MIDDLE_LEFT;
        }
    }, {
        key: "getDefaultExitLocation",
        value: function getDefaultExitLocation() {
            return _MazeUtils.GridLocation.MIDDLE_RIGHT;
        }
    }]);

    return DiamondMazeGrid;
}(_MazeGrid2.MazeGrid);

},{"../managers/MazeUtils":36,"../models/MazeGrid":63}],49:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HoneycombMazeGrid = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _MazeUtils = require("../managers/MazeUtils");

var _MazeGrid2 = require("../models/MazeGrid");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// x x X X X X X X X X
// x x X X X X X X X X
// x X     X X     X X
// x X     X X     X X
// x x X X X X X X X X
// x x X X X X X X X X
// x X     X X     X X
// x X     X X     X X
// x x X X X X X X X X
// x x X X X X X X X X
var BASE_SECTION_WIDTH = 2;
var BASE_SECTION_HEIGHT = 2;
var NUM_HORIZONTAL_SECTIONS = 5;
var NUM_VERTICAL_SECTIONS = 5;

var HoneycombMazeGrid = exports.HoneycombMazeGrid = function (_MazeGrid) {
    _inherits(HoneycombMazeGrid, _MazeGrid);

    function HoneycombMazeGrid(game, mazeConfig) {
        _classCallCheck(this, HoneycombMazeGrid);

        // Two horiz. arms + middle section
        mazeConfig.mazeSizeX = HoneycombMazeGrid.getSectionWidth(mazeConfig.mazeTierSize) * NUM_HORIZONTAL_SECTIONS;
        // Two vert. arms + middle section
        // Middle section increases by two in each tier
        mazeConfig.mazeSizeY = HoneycombMazeGrid.getSectionHeight(mazeConfig.mazeTierSize) * NUM_VERTICAL_SECTIONS;
        return _possibleConstructorReturn(this, (HoneycombMazeGrid.__proto__ || Object.getPrototypeOf(HoneycombMazeGrid)).call(this, game, mazeConfig));
    }

    _createClass(HoneycombMazeGrid, [{
        key: "generateMazeGrid",
        value: function generateMazeGrid() {
            // Generate a normal grid and then mark cells dead
            _get(HoneycombMazeGrid.prototype.__proto__ || Object.getPrototypeOf(HoneycombMazeGrid.prototype), "generateMazeGrid", this).call(this);
            this.markDeadCells();
        }
    }, {
        key: "markDeadCells",
        value: function markDeadCells() {
            var horizSectWidth = HoneycombMazeGrid.getSectionWidth(this.getMazeTierSize());
            var vertSectHeight = HoneycombMazeGrid.getSectionHeight(this.getMazeTierSize());
            // Top left
            this.setCellRangeDead(horizSectWidth, horizSectWidth * 2, vertSectHeight, vertSectHeight * 2);
            // Top right
            this.setCellRangeDead(horizSectWidth * 3, horizSectWidth * 4, vertSectHeight, vertSectHeight * 2);
            // Bottom left
            this.setCellRangeDead(horizSectWidth, horizSectWidth * 2, vertSectHeight * 3, vertSectHeight * 4);
            // Bottom right
            this.setCellRangeDead(horizSectWidth * 3, horizSectWidth * 4, vertSectHeight * 3, vertSectHeight * 4);
        }
    }, {
        key: "getValidStartLocations",
        value: function getValidStartLocations() {
            return [_MazeUtils.GridLocation.TOP_LEFT, _MazeUtils.GridLocation.TOP_RIGHT, _MazeUtils.GridLocation.BOTTOM_LEFT, _MazeUtils.GridLocation.BOTTOM_RIGHT];
        }
    }, {
        key: "getValidExitLocations",
        value: function getValidExitLocations() {
            return [_MazeUtils.GridLocation.TOP_LEFT, _MazeUtils.GridLocation.TOP_RIGHT, _MazeUtils.GridLocation.BOTTOM_LEFT, _MazeUtils.GridLocation.BOTTOM_RIGHT];
        }
    }, {
        key: "getDefaultStartingLocation",
        value: function getDefaultStartingLocation() {
            return _MazeUtils.GridLocation.TOP_LEFT;
        }
    }, {
        key: "getDefaultExitLocation",
        value: function getDefaultExitLocation() {
            return _MazeUtils.GridLocation.BOTTOM_RIGHT;
        }
    }], [{
        key: "getSectionWidth",
        value: function getSectionWidth(mazeTierSize) {
            return mazeTierSize + BASE_SECTION_WIDTH;
        }
    }, {
        key: "getSectionHeight",
        value: function getSectionHeight(mazeTierSize) {
            return mazeTierSize + BASE_SECTION_HEIGHT;
        }
    }]);

    return HoneycombMazeGrid;
}(_MazeGrid2.MazeGrid);

},{"../managers/MazeUtils":36,"../models/MazeGrid":63}],50:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LetterHMazeGrid = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _MazeUtils = require("../managers/MazeUtils");

var _MazeGrid2 = require("../models/MazeGrid");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// x x     X X
// x X     X X
// X X     X X
// X X     X X
// X X X X X X 
// X X X X X X 
// X X     X X 
// X X     X X
// X X     X X
// X X     X X
var MAZE_GROWTH_MULTIPLE = 3;
var BASE_LINE_HORIZONTAL_WIDTH = 2;
var HORIZONTAL_LINE_COUNT = 3;
var BASE_VERTICAL_LETTER_ARM_HEIGHT = 4;
var BASE_VERTICAL_MIDDLE_HEIGHT = 2;
var VERTICAL_MIDDLE_GROWTH_FACTOR = 2;
var VERTICAL_ARM_COUNT = 2;

var LetterHMazeGrid = exports.LetterHMazeGrid = function (_MazeGrid) {
    _inherits(LetterHMazeGrid, _MazeGrid);

    function LetterHMazeGrid(game, mazeConfig) {
        _classCallCheck(this, LetterHMazeGrid);

        var mazeTierSize = mazeConfig.mazeTierSize;
        // Two horiz. arms + middle section

        var mazeSizeX = LetterHMazeGrid.getHorizontalArmLength(mazeTierSize) * HORIZONTAL_LINE_COUNT;
        // Two vert. arms + middle section
        // Middle section increases by two in each tier
        var mazeSizeY = LetterHMazeGrid.getVerticalArmHeight(mazeTierSize) * VERTICAL_ARM_COUNT + LetterHMazeGrid.getVerticalMiddleHeight(mazeTierSize);
        mazeConfig.mazeSizeX = mazeSizeX;
        mazeConfig.mazeSizeY = mazeSizeY;
        return _possibleConstructorReturn(this, (LetterHMazeGrid.__proto__ || Object.getPrototypeOf(LetterHMazeGrid)).call(this, game, mazeConfig));
    }

    _createClass(LetterHMazeGrid, [{
        key: "generateMazeGrid",
        value: function generateMazeGrid() {
            // Generate a normal grid and then mark cells dead
            _get(LetterHMazeGrid.prototype.__proto__ || Object.getPrototypeOf(LetterHMazeGrid.prototype), "generateMazeGrid", this).call(this);
            this.markDeadCells();
        }
    }, {
        key: "markDeadCells",
        value: function markDeadCells() {
            var horizontalArmLength = LetterHMazeGrid.getHorizontalArmLength(this.getMazeTierSize());
            var verticalArmHeight = LetterHMazeGrid.getVerticalArmHeight(this.getMazeTierSize());
            var verticalMiddleHeight = LetterHMazeGrid.getVerticalMiddleHeight(this.getMazeTierSize());
            this.setCellRangeDead(horizontalArmLength, horizontalArmLength * 2, 0, verticalArmHeight);
            this.setCellRangeDead(horizontalArmLength, horizontalArmLength * 2, verticalArmHeight + verticalMiddleHeight, this.sizeY);
        }
    }, {
        key: "getValidStartLocations",
        value: function getValidStartLocations() {
            return [_MazeUtils.GridLocation.TOP_LEFT, _MazeUtils.GridLocation.TOP_RIGHT, _MazeUtils.GridLocation.BOTTOM_LEFT, _MazeUtils.GridLocation.BOTTOM_RIGHT];
        }
    }, {
        key: "getValidExitLocations",
        value: function getValidExitLocations() {
            return [_MazeUtils.GridLocation.TOP_LEFT, _MazeUtils.GridLocation.TOP_RIGHT, _MazeUtils.GridLocation.BOTTOM_LEFT, _MazeUtils.GridLocation.BOTTOM_RIGHT];
        }
    }, {
        key: "getDefaultStartingLocation",
        value: function getDefaultStartingLocation() {
            return _MazeUtils.GridLocation.TOP_LEFT;
        }
    }, {
        key: "getDefaultExitLocation",
        value: function getDefaultExitLocation() {
            return _MazeUtils.GridLocation.BOTTOM_RIGHT;
        }
    }], [{
        key: "getHorizontalArmLength",
        value: function getHorizontalArmLength(mazeTierSize) {
            return mazeTierSize + BASE_LINE_HORIZONTAL_WIDTH;
        }
    }, {
        key: "getVerticalArmHeight",
        value: function getVerticalArmHeight(mazeTierSize) {
            return mazeTierSize + BASE_VERTICAL_LETTER_ARM_HEIGHT;
        }
    }, {
        key: "getVerticalMiddleHeight",
        value: function getVerticalMiddleHeight(mazeTierSize) {
            return BASE_VERTICAL_MIDDLE_HEIGHT + mazeTierSize * VERTICAL_MIDDLE_GROWTH_FACTOR;
        }
    }]);

    return LetterHMazeGrid;
}(_MazeGrid2.MazeGrid);

},{"../managers/MazeUtils":36,"../models/MazeGrid":63}],51:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PlusSignMazeGrid = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _MazeUtils = require("../managers/MazeUtils");

var _MazeGrid2 = require("../models/MazeGrid");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlusSignMazeGrid = exports.PlusSignMazeGrid = function (_MazeGrid) {
    _inherits(PlusSignMazeGrid, _MazeGrid);

    function PlusSignMazeGrid(game, mazeConfig) {
        _classCallCheck(this, PlusSignMazeGrid);

        mazeConfig.mazeSizeX += Math.ceil(mazeConfig.mazeSizeX / 3);
        mazeConfig.mazeSizeY += Math.ceil(mazeConfig.mazeSizeY / 3);
        return _possibleConstructorReturn(this, (PlusSignMazeGrid.__proto__ || Object.getPrototypeOf(PlusSignMazeGrid)).call(this, game, mazeConfig));
    }

    _createClass(PlusSignMazeGrid, [{
        key: "generateMazeGrid",
        value: function generateMazeGrid() {
            // Generate a normal grid and then mark cells dead
            _get(PlusSignMazeGrid.prototype.__proto__ || Object.getPrototypeOf(PlusSignMazeGrid.prototype), "generateMazeGrid", this).call(this);
            var xRange = this.getXRange();
            var yRange = this.getYRange();
            // Top left
            this.setCellRangeDead(0, xRange, 0, yRange);
            // Bottom Left
            this.setCellRangeDead(0, xRange, this.sizeY - yRange, this.sizeY);
            // Top Right
            this.setCellRangeDead(this.sizeX - xRange, this.sizeX, 0, yRange);
            // Bottom Right
            this.setCellRangeDead(this.sizeX - xRange, this.sizeX, this.sizeY - yRange, this.sizeY);
        }
    }, {
        key: "getXRange",
        value: function getXRange() {
            return Math.ceil(this.sizeX / 3);
        }
    }, {
        key: "getYRange",
        value: function getYRange() {
            return Math.ceil(this.sizeY / 3);
        }
    }, {
        key: "getValidStartLocations",
        value: function getValidStartLocations() {
            return [_MazeUtils.GridLocation.MIDDLE_LEFT, _MazeUtils.GridLocation.TOP_MIDDLE, _MazeUtils.GridLocation.BOTTOM_MIDDLE, _MazeUtils.GridLocation.MIDDLE_RIGHT];
        }
    }, {
        key: "getValidExitLocations",
        value: function getValidExitLocations() {
            return [_MazeUtils.GridLocation.MIDDLE_RIGHT, _MazeUtils.GridLocation.TOP_MIDDLE, _MazeUtils.GridLocation.BOTTOM_MIDDLE, _MazeUtils.GridLocation.MIDDLE_LEFT];
        }
    }, {
        key: "getDefaultStartingLocation",
        value: function getDefaultStartingLocation() {
            return _MazeUtils.GridLocation.MIDDLE_LEFT;
        }
    }, {
        key: "getDefaultExitLocation",
        value: function getDefaultExitLocation() {
            return _MazeUtils.GridLocation.MIDDLE_RIGHT;
        }
    }]);

    return PlusSignMazeGrid;
}(_MazeGrid2.MazeGrid);

},{"../managers/MazeUtils":36,"../models/MazeGrid":63}],52:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PyramidMazeGrid = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _MazeUtils = require("../managers/MazeUtils");

var _MazeGrid2 = require("../models/MazeGrid");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**************
Tile count: X^2
X: X
Y: 2X - 1

X
X X
X X X
X X X X
X X X
X X
X
**************/
var PyramidMazeGrid = exports.PyramidMazeGrid = function (_MazeGrid) {
    _inherits(PyramidMazeGrid, _MazeGrid);

    function PyramidMazeGrid(game, mazeConfig) {
        _classCallCheck(this, PyramidMazeGrid);

        mazeConfig.mazeSizeY = mazeConfig.mazeSizeX * 2 - 1;
        return _possibleConstructorReturn(this, (PyramidMazeGrid.__proto__ || Object.getPrototypeOf(PyramidMazeGrid)).call(this, game, mazeConfig));
    }

    _createClass(PyramidMazeGrid, [{
        key: "generateMazeGrid",
        value: function generateMazeGrid() {
            // Generate a normal grid and then mark cells dead
            _get(PyramidMazeGrid.prototype.__proto__ || Object.getPrototypeOf(PyramidMazeGrid.prototype), "generateMazeGrid", this).call(this);
            this.markDeadCells();
        }
    }, {
        key: "markDeadCells",
        value: function markDeadCells() {
            var yMiddlePoint = Math.floor(this.sizeY / 2);
            // Top half of the pyramid
            // Include the middle horizontal (peak of pyramid)
            for (var y = 0; y <= yMiddlePoint; y++) {
                for (var x = y + 1; x < this.sizeX; x++) {
                    this.setDeadCell({ x: x, y: y });
                }
            }
            // Bottom half of the pyramid
            // Start on next row after previous loop
            for (var _y = yMiddlePoint + 1; _y < this.sizeY; _y++) {
                for (var _x = this.sizeX - (_y - yMiddlePoint); _x < this.sizeX; _x++) {
                    this.setDeadCell({ x: _x, y: _y });
                }
            }
        }
    }, {
        key: "getValidStartLocations",
        value: function getValidStartLocations() {
            return [_MazeUtils.GridLocation.BOTTOM_LEFT, _MazeUtils.GridLocation.TOP_LEFT, _MazeUtils.GridLocation.MIDDLE_RIGHT];
        }
    }, {
        key: "getValidExitLocations",
        value: function getValidExitLocations() {
            return [_MazeUtils.GridLocation.BOTTOM_LEFT, _MazeUtils.GridLocation.TOP_LEFT, _MazeUtils.GridLocation.MIDDLE_RIGHT];
        }
    }, {
        key: "getDefaultStartingLocation",
        value: function getDefaultStartingLocation() {
            return _MazeUtils.GridLocation.TOP_LEFT;
        }
    }, {
        key: "getDefaultExitLocation",
        value: function getDefaultExitLocation() {
            return _MazeUtils.GridLocation.BOTTOM_LEFT;
        }
    }]);

    return PyramidMazeGrid;
}(_MazeGrid2.MazeGrid);

},{"../managers/MazeUtils":36,"../models/MazeGrid":63}],53:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RectangleMazeGrid = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MazeUtils = require("../managers/MazeUtils");

var _MazeGrid2 = require("../models/MazeGrid");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LENGTH_TO_WIDTH_RATIO = 1.5;

var RectangleMazeGrid = exports.RectangleMazeGrid = function (_MazeGrid) {
    _inherits(RectangleMazeGrid, _MazeGrid);

    function RectangleMazeGrid(game, mazeConfig) {
        _classCallCheck(this, RectangleMazeGrid);

        // Use really crazy math.  And it works.  Don't question it.
        var shortSide = Math.ceil(mazeConfig.mazeSizeX / LENGTH_TO_WIDTH_RATIO);
        var longSide = Math.floor(Math.pow(mazeConfig.mazeSizeX, 2) / shortSide);
        mazeConfig.mazeSizeX = shortSide;
        mazeConfig.mazeSizeY = longSide;
        return _possibleConstructorReturn(this, (RectangleMazeGrid.__proto__ || Object.getPrototypeOf(RectangleMazeGrid)).call(this, game, mazeConfig));
    }

    _createClass(RectangleMazeGrid, [{
        key: "getValidStartLocations",
        value: function getValidStartLocations() {
            return [_MazeUtils.GridLocation.BOTTOM_LEFT, _MazeUtils.GridLocation.BOTTOM_RIGHT, _MazeUtils.GridLocation.TOP_LEFT, _MazeUtils.GridLocation.TOP_RIGHT];
        }
    }, {
        key: "getValidExitLocations",
        value: function getValidExitLocations() {
            return [_MazeUtils.GridLocation.BOTTOM_RIGHT, _MazeUtils.GridLocation.BOTTOM_LEFT, _MazeUtils.GridLocation.TOP_LEFT, _MazeUtils.GridLocation.TOP_RIGHT];
        }
    }, {
        key: "getDefaultStartingLocation",
        value: function getDefaultStartingLocation() {
            return _MazeUtils.GridLocation.TOP_LEFT;
        }
    }, {
        key: "getDefaultExitLocation",
        value: function getDefaultExitLocation() {
            return _MazeUtils.GridLocation.BOTTOM_RIGHT;
        }
    }]);

    return RectangleMazeGrid;
}(_MazeGrid2.MazeGrid);

},{"../managers/MazeUtils":36,"../models/MazeGrid":63}],54:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SquareMazeGrid = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MazeUtils = require("../managers/MazeUtils");

var _MazeGrid2 = require("../models/MazeGrid");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SquareMazeGrid = exports.SquareMazeGrid = function (_MazeGrid) {
    _inherits(SquareMazeGrid, _MazeGrid);

    function SquareMazeGrid(game, mazeConfig) {
        _classCallCheck(this, SquareMazeGrid);

        return _possibleConstructorReturn(this, (SquareMazeGrid.__proto__ || Object.getPrototypeOf(SquareMazeGrid)).call(this, game, mazeConfig));
    }

    _createClass(SquareMazeGrid, [{
        key: "getValidStartLocations",
        value: function getValidStartLocations() {
            return [_MazeUtils.GridLocation.TOP_LEFT, _MazeUtils.GridLocation.BOTTOM_LEFT, _MazeUtils.GridLocation.BOTTOM_RIGHT, _MazeUtils.GridLocation.TOP_RIGHT];
        }
    }, {
        key: "getValidExitLocations",
        value: function getValidExitLocations() {
            return [_MazeUtils.GridLocation.BOTTOM_RIGHT, _MazeUtils.GridLocation.BOTTOM_LEFT, _MazeUtils.GridLocation.TOP_LEFT, _MazeUtils.GridLocation.TOP_RIGHT];
        }
    }, {
        key: "getDefaultStartingLocation",
        value: function getDefaultStartingLocation() {
            return _MazeUtils.GridLocation.TOP_LEFT;
        }
    }, {
        key: "getDefaultExitLocation",
        value: function getDefaultExitLocation() {
            return _MazeUtils.GridLocation.BOTTOM_RIGHT;
        }
    }]);

    return SquareMazeGrid;
}(_MazeGrid2.MazeGrid);

},{"../managers/MazeUtils":36,"../models/MazeGrid":63}],55:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StaircaseMazeGrid = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _MazeUtils = require("../managers/MazeUtils");

var _MazeGrid2 = require("../models/MazeGrid");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// DEPRECATED:
// Number of tiles: (1+L)*L/2
// Nearest square size: ROUND(L/SQRT(2))
// 3x3 -> 9 - 3 = 6
// 4x4 -> 16 - 6 = 10
// 5x5 -> 25 - 10 = 15
// 6x6 -> 36 - 15 = 21
// X 0 0 0 0 0
// X X 0 0 0 0
// X X X 0 0 0
// X X X X 0 0
// X X X X X 0
// X X X X X X
var SQRT_OF_2 = Math.sqrt(2);

var StaircaseMazeGrid = exports.StaircaseMazeGrid = function (_MazeGrid) {
    _inherits(StaircaseMazeGrid, _MazeGrid);

    function StaircaseMazeGrid(game, mazeConfig) {
        _classCallCheck(this, StaircaseMazeGrid);

        mazeConfig.mazeSizeX += 1;
        mazeConfig.mazeSizeY += 1;
        return _possibleConstructorReturn(this, (StaircaseMazeGrid.__proto__ || Object.getPrototypeOf(StaircaseMazeGrid)).call(this, game, mazeConfig));
    }

    _createClass(StaircaseMazeGrid, [{
        key: "generateMazeGrid",
        value: function generateMazeGrid() {
            // Generate a normal grid and then mark cells dead
            _get(StaircaseMazeGrid.prototype.__proto__ || Object.getPrototypeOf(StaircaseMazeGrid.prototype), "generateMazeGrid", this).call(this);
            this.markDeadCells();
        }
    }, {
        key: "markDeadCells",
        value: function markDeadCells() {
            // Top left edge
            for (var y = 0; y < this.sizeY; y++) {
                // Leave first column
                for (var x = y + 1; x < this.sizeX; x++) {
                    this.setDeadCell({ x: x, y: y });
                }
            }
        }
    }, {
        key: "getValidStartLocations",
        value: function getValidStartLocations() {
            return [_MazeUtils.GridLocation.BOTTOM_LEFT, _MazeUtils.GridLocation.BOTTOM_RIGHT, _MazeUtils.GridLocation.TOP_LEFT];
        }
    }, {
        key: "getValidExitLocations",
        value: function getValidExitLocations() {
            return [_MazeUtils.GridLocation.BOTTOM_RIGHT, _MazeUtils.GridLocation.BOTTOM_LEFT, _MazeUtils.GridLocation.TOP_LEFT];
        }
    }, {
        key: "getDefaultStartingLocation",
        value: function getDefaultStartingLocation() {
            return _MazeUtils.GridLocation.TOP_LEFT;
        }
    }, {
        key: "getDefaultExitLocation",
        value: function getDefaultExitLocation() {
            return _MazeUtils.GridLocation.BOTTOM_RIGHT;
        }
    }]);

    return StaircaseMazeGrid;
}(_MazeGrid2.MazeGrid);

},{"../managers/MazeUtils":36,"../models/MazeGrid":63}],56:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ZigZagMazeGrid = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _MazeUtils = require("../managers/MazeUtils");

var _MazeGrid2 = require("../models/MazeGrid");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Height/width is static. Each tier grows the number of zig zags.
// X X X X X X X X X X
// X X X X X X X X X X
//                 X X
//                 X X
// X X X X X X X X X X
// X X X X X X X X X X
// X X
// X X
// X X X X X X X X X X
// X X X X X X X X X X
var GAP_HORIZONTAL_LENGTH = 6;
var BASE_ZIG_ZAG_WIDTH = 3;
var BASE_ZIG_ZAG_HEIGHT = 3;
var BASE_ZIG_ZAG_COUNT = 3;

var ZigZagMazeGrid = exports.ZigZagMazeGrid = function (_MazeGrid) {
    _inherits(ZigZagMazeGrid, _MazeGrid);

    function ZigZagMazeGrid(game, mazeConfig) {
        _classCallCheck(this, ZigZagMazeGrid);

        // Two horiz. arms + middle section
        mazeConfig.mazeSizeX = ZigZagMazeGrid.getTotalMazeLength(mazeConfig.mazeTierSize);
        // Two vert. arms + middle section
        // Middle section increases by two in each tier
        mazeConfig.mazeSizeY = ZigZagMazeGrid.getTotalMazeHeight(mazeConfig.mazeTierSize);
        return _possibleConstructorReturn(this, (ZigZagMazeGrid.__proto__ || Object.getPrototypeOf(ZigZagMazeGrid)).call(this, game, mazeConfig));
    }

    _createClass(ZigZagMazeGrid, [{
        key: "generateMazeGrid",
        value: function generateMazeGrid() {
            // Generate a normal grid and then mark cells dead
            _get(ZigZagMazeGrid.prototype.__proto__ || Object.getPrototypeOf(ZigZagMazeGrid.prototype), "generateMazeGrid", this).call(this);
            this.markDeadCells();
        }
    }, {
        key: "markDeadCells",
        value: function markDeadCells() {
            var isLeft = true;
            var zigZagWidth = ZigZagMazeGrid.getSingleZigZagWidth(this.getMazeTierSize());
            var zigZagHeight = ZigZagMazeGrid.getSingleZigZagHeight(this.getMazeTierSize());
            var totalGapSections = ZigZagMazeGrid.getTotalGapSections(this.getMazeTierSize());
            for (var zigZagNum = 0; zigZagNum < totalGapSections; zigZagNum++) {
                var startX = isLeft ? 0 : zigZagHeight;
                var endX = isLeft ? this.sizeX - zigZagWidth : this.sizeX;
                var startY = zigZagHeight + 2 * ZigZagMazeGrid.getSingleZigZagHeight(this.getMazeTierSize()) * zigZagNum;
                var endY = startY + zigZagHeight;
                this.setCellRangeDead(startX, endX, startY, endY);
                isLeft = !isLeft;
            }
        }
    }, {
        key: "getZigZagEndGridLocation",
        value: function getZigZagEndGridLocation() {
            return this.isEven(ZigZagMazeGrid.getTotalGapSections(this.getMazeTierSize())) ? _MazeUtils.GridLocation.BOTTOM_RIGHT : _MazeUtils.GridLocation.BOTTOM_LEFT;
        }
    }, {
        key: "getValidStartLocations",
        value: function getValidStartLocations() {
            return [_MazeUtils.GridLocation.TOP_LEFT, _MazeUtils.GridLocation.TOP_RIGHT];
        }
    }, {
        key: "getValidExitLocations",
        value: function getValidExitLocations() {
            return [_MazeUtils.GridLocation.TOP_LEFT, this.getZigZagEndGridLocation()];
        }
    }, {
        key: "getDefaultStartingLocation",
        value: function getDefaultStartingLocation() {
            return _MazeUtils.GridLocation.TOP_LEFT;
        }
    }, {
        key: "getDefaultExitLocation",
        value: function getDefaultExitLocation() {
            return this.getZigZagEndGridLocation();
        }
    }, {
        key: "isEven",
        value: function isEven(num) {
            return num % 2 === 0;
        }
    }], [{
        key: "getTotalMazeLength",
        value: function getTotalMazeLength(mazeTierSize) {
            return ZigZagMazeGrid.getSingleZigZagWidth(mazeTierSize) * 2 + GAP_HORIZONTAL_LENGTH;
        }
    }, {
        key: "getTotalMazeHeight",
        value: function getTotalMazeHeight(mazeTierSize) {
            return ZigZagMazeGrid.getSingleZigZagHeight(mazeTierSize) * ZigZagMazeGrid.getTotalZigZagSections(mazeTierSize);
        }
    }, {
        key: "getSingleZigZagHeight",
        value: function getSingleZigZagHeight(mazeTierSize) {
            return BASE_ZIG_ZAG_HEIGHT;
        }
    }, {
        key: "getSingleZigZagWidth",
        value: function getSingleZigZagWidth(mazeTierSize) {
            return BASE_ZIG_ZAG_WIDTH;
        }
        // Includes the connecting parts of the zags

    }, {
        key: "getTotalZigZagSections",
        value: function getTotalZigZagSections(mazeTierSize) {
            return (BASE_ZIG_ZAG_COUNT + mazeTierSize) * 2 - 1;
        }
    }, {
        key: "getTotalGapSections",
        value: function getTotalGapSections(mazeTierSize) {
            return BASE_ZIG_ZAG_COUNT - 1 + mazeTierSize;
        }
    }]);

    return ZigZagMazeGrid;
}(_MazeGrid2.MazeGrid);

},{"../managers/MazeUtils":36,"../models/MazeGrid":63}],57:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BacktrackerMaze = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Maze2 = require("../models/Maze");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BacktrackerMaze = exports.BacktrackerMaze = function (_Maze) {
    _inherits(BacktrackerMaze, _Maze);

    function BacktrackerMaze(game, mazeConfig) {
        _classCallCheck(this, BacktrackerMaze);

        var _this = _possibleConstructorReturn(this, (BacktrackerMaze.__proto__ || Object.getPrototypeOf(BacktrackerMaze)).call(this, game, mazeConfig));

        _this.currentTile = null;
        _this.stack = [];
        _this.isDone = false;
        _this.generateMaze();
        return _this;
    }

    _createClass(BacktrackerMaze, [{
        key: "generateMaze",
        value: function generateMaze() {
            this.currentTile = this.getCell(this.grid.internalStartTilesArr[0]);
            this.backtrackDFS();
            _get(BacktrackerMaze.prototype.__proto__ || Object.getPrototypeOf(BacktrackerMaze.prototype), "generateMaze", this).call(this);
        }
    }, {
        key: "backtrackDFS",
        value: function backtrackDFS() {
            while (!this.isDone) {
                if (!this.currentTile.isVisited) {
                    this.currentTile.setVisited();
                    this.stack.push(this.currentTile);
                }
                // Add neighbors
                var unvisitedNeighborList = [];
                var neighbors = this.getNeighbors(this.currentTile);
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = neighbors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var neigh = _step.value;

                        if (!neigh.isVisited) {
                            unvisitedNeighborList.push(neigh);
                        }
                    }
                    // Pick a random unvisited neighbour
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                if (unvisitedNeighborList.length > 0) {
                    var randomIndex = Math.floor(Math.random() * unvisitedNeighborList.length);
                    var nextTile = unvisitedNeighborList[randomIndex];
                    // Remove Walls
                    this.removeWallBetweenCells(this.currentTile, nextTile);
                    // Assign new current tile
                    this.currentTile = nextTile;
                }
                // Allow edge pieces with only single connections to connect with already-visited tiles
                else if (neighbors.length === 1) {
                        var _nextTile = neighbors[0];
                        // Remove Walls
                        this.removeWallBetweenCells(this.currentTile, _nextTile);
                        // Assign new current tile
                        this.currentTile = _nextTile;
                    }
                    // If all neighbours visited, pick a random unvisited cell
                    else if (this.stack.length > 0) {
                            this.currentTile = this.stack.pop();
                        } else {
                            this.isDone = true;
                        }
            }
            // Backtracker does not guarantee "odd" shaped grids (ie. diamond)
            // will actually visit every single tile.  Clean up any unvisited cells after.
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.grid.getAllCells()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var cell = _step2.value;

                    if (!cell.isVisited) {
                        var _neighbors = this.getNeighbors(cell);
                        if (_neighbors && _neighbors.length > 0) {
                            this.removeWallBetweenCells(cell, _neighbors[0]);
                        } else {
                            console.error("Impossible to reach cell for backtracker.  Unable to cleanup.");
                        }
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }]);

    return BacktrackerMaze;
}(_Maze2.Maze);

},{"../models/Maze":61}],58:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BinaryTreeMaze = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _MazeUtils = require("../managers/MazeUtils");

var _Maze2 = require("../models/Maze");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//TODO: why can i not import the regular one.
var DIRECTION_UP = { x: 0, y: -1 };
var DIRECTION_LEFT = { x: -1, y: 0 };
var VALID_DIR_ARR = [DIRECTION_LEFT, DIRECTION_UP];

var BinaryTreeMaze = exports.BinaryTreeMaze = function (_Maze) {
    _inherits(BinaryTreeMaze, _Maze);

    function BinaryTreeMaze(game, mazeConfig) {
        _classCallCheck(this, BinaryTreeMaze);

        var mazeGridType = mazeConfig.mazeGridType;

        if (mazeGridType === _MazeUtils.MazeGridType.PLUS_SIGN || mazeGridType === _MazeUtils.MazeGridType.DIAMOND) {
            console.error("Invalid grid type " + mazeGridType + " for binary tree maze.");
            mazeConfig.mazeGridType = _MazeUtils.MazeGridType.SQUARE;
        }

        var _this = _possibleConstructorReturn(this, (BinaryTreeMaze.__proto__ || Object.getPrototypeOf(BinaryTreeMaze)).call(this, game, mazeConfig));

        _this.generateMaze();
        return _this;
    }

    _createClass(BinaryTreeMaze, [{
        key: "generateMaze",
        value: function generateMaze() {
            for (var y = 0; y < this.grid.sizeY; y++) {
                for (var x = 0; x < this.grid.sizeX; x++) {
                    if (!this.grid.isValidTile({ x: x, y: y })) continue;
                    var validDirs = this.getValidDirs(x, y);
                    if (validDirs.length === 0) {
                        continue;
                    }
                    // Choose random direction and determine it's inverse
                    var randomIndex = (0, _MazeUtils.getRandomInteger)(0, validDirs.length - 1);
                    var randomTileVector = validDirs[randomIndex];
                    var inverseTileVector = (0, _MazeUtils.getInverseTileVector)(randomTileVector);
                    // Get current tile and neighbour tile
                    var currentTile = { x: x, y: y };
                    var newTile = (0, _MazeUtils.getNewTilePositionByVector)(currentTile, randomTileVector);
                    // Convert to maze grid cell
                    var currentCell = this.getCell(currentTile);
                    var newCell = this.getCell(newTile);
                    // Remove wall connecting neighbors
                    // this.removeWallByTileVector(currentCell, randomTileVector);
                    // this.removeWallByTileVector(newCell, inverseTileVector);
                    this.removeWallBetweenCells(currentCell, newCell);
                }
            }
            _get(BinaryTreeMaze.prototype.__proto__ || Object.getPrototypeOf(BinaryTreeMaze.prototype), "generateMaze", this).call(this);
        }
    }, {
        key: "getValidDirs",
        value: function getValidDirs(x, y) {
            // Biased LEFT and UP. Defend against edge case movements.
            var validDirs = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = VALID_DIR_ARR[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var dir = _step.value;

                    var testTile = (0, _MazeUtils.getNewTilePositionByVector)(dir, { x: x, y: y });
                    if (this.grid.isValidTile(testTile)) {
                        validDirs.push(dir);
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return validDirs;
        }
    }]);

    return BinaryTreeMaze;
}(_Maze2.Maze);

},{"../managers/MazeUtils":36,"../models/Maze":61}],59:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PrimsMaze = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MazeUtils = require("../managers/MazeUtils");

var _Maze2 = require("../models/Maze");

var _priorityjs = require("priorityjs");

var _priorityjs2 = _interopRequireDefault(_priorityjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PrimsMaze = exports.PrimsMaze = function (_Maze) {
    _inherits(PrimsMaze, _Maze);

    function PrimsMaze(game, mazeConfig) {
        _classCallCheck(this, PrimsMaze);

        var _this = _possibleConstructorReturn(this, (PrimsMaze.__proto__ || Object.getPrototypeOf(PrimsMaze)).call(this, game, mazeConfig));

        _this.visitedCellSet = new Set();
        _this.nextToVisitSet = new Set();
        // Consider making this random.
        _this.startingX = _this.grid.internalStartTilesArr[0].x;
        _this.startingY = _this.grid.internalStartTilesArr[0].y;
        _this.queue = new _priorityjs2.default.PriorityQ(function (dirCellPair1, dirCellPair2) {
            var cell1Dir = _this.mapPriorityVal(dirCellPair1);
            var cell2Dir = _this.mapPriorityVal(dirCellPair2);
            return cell1Dir <= cell2Dir;
        });
        _this.generateMaze();
        return _this;
    }

    _createClass(PrimsMaze, [{
        key: "mapPriorityVal",
        value: function mapPriorityVal(dirCellPair) {
            return Math.random();
            // const dir = dirCellPair[0];
            // const val = Math.random();
            // if (dir === MazeDirectionIndex.UP) return val*.1;
            // if (dir === MazeDirectionIndex.DOWN) return val*5;
            // if (dir === MazeDirectionIndex.RIGHT) return val*5;
            // if (dir === MazeDirectionIndex.LEFT) return val*.1;
            // return 0; 
        }
    }, {
        key: "getDistanceFromStart",
        value: function getDistanceFromStart(cell) {
            return Math.sqrt(Math.pow(cell.x - this.startingX, 2) + Math.pow(cell.y - this.startingY, 2));
        }
    }, {
        key: "generateMaze",
        value: function generateMaze() {
            var startCell = this.getCell({ x: this.startingX, y: this.startingY });
            this.setCellVisited(startCell);
            this.addUnvisitedNeighborsToNext(startCell);
            this.prims();
        }
    }, {
        key: "getNextCellToVisit",
        value: function getNextCellToVisit() {
            var nextCell = this.queue.pop()[1];
            // Remove from to-visit list
            var nextTileKey = nextCell.getTileKey();
            this.nextToVisitSet.delete(nextTileKey);
            return this.getCellByTileKey(nextTileKey);
        }
    }, {
        key: "prims",
        value: function prims() {
            while (this.queue.size() > 0) {
                // Choose a random unvisited cell
                var currentCell = this.getNextCellToVisit();
                if (this.isCellVisited(currentCell)) {
                    return;
                }
                this.setCellVisited(currentCell);
                this.addUnvisitedNeighborsToNext(currentCell);
                // Get all visited neighbors
                var visitedNeighbors = this.getVisitedNeighbors(currentCell);
                if (visitedNeighbors.length === 0) {
                    console.error("Prim has failed me");
                    return;
                }
                // Pick a random visited neighbor
                var neighborCell = visitedNeighbors[(0, _MazeUtils.getRandomInteger)(0, visitedNeighbors.length - 1)];
                // Remove wall between current and neighbor cell
                this.removeWallBetweenCells(currentCell, neighborCell);
            }
        }
    }, {
        key: "addUnvisitedNeighborsToNext",
        value: function addUnvisitedNeighborsToNext(cell) {
            var neighbors = this.getNeighbors(cell);
            // Add all unvisited neighbors to the to-visit list
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = neighbors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var neighbor = _step.value;

                    // Avoid duplicate adding neighbors (visited + already in queue)
                    if (!this.isCellVisited(neighbor) && !this.nextToVisitSet.has(neighbor.getTileKey())) {
                        var dirIndex = (0, _MazeUtils.getCellNeighborDirectionIndex)(cell, neighbor);
                        this.nextToVisitSet.add(neighbor.getTileKey());
                        this.queue.push([dirIndex, neighbor]);
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: "getVisitedNeighbors",
        value: function getVisitedNeighbors(cell) {
            var _this2 = this;

            var visitedNeighbors = this.getNeighbors(cell).filter(function (neighbor) {
                return _this2.isCellVisited(neighbor);
            });
            return visitedNeighbors;
        }
        //TODO: visited cell set needs MazeGrid integration

    }, {
        key: "setCellVisited",
        value: function setCellVisited(cell) {
            this.visitedCellSet.add(cell.getTileKey());
        }
    }, {
        key: "isCellVisited",
        value: function isCellVisited(cell) {
            return this.visitedCellSet.has(cell.getTileKey());
        }
    }]);

    return PrimsMaze;
}(_Maze2.Maze);

},{"../managers/MazeUtils":36,"../models/Maze":61,"priorityjs":1}],60:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BiomeColorPalette = function BiomeColorPalette(playerColor, botColor, emptyColor, visitedTileColor, mazeWallColor, deadEndColor, unlimitedSplitBotPlayerColor, ghostItemPlayerColor) {
    _classCallCheck(this, BiomeColorPalette);

    this.playerColor = playerColor;
    this.botColor = botColor;
    this.tileColor = emptyColor;
    this.visitedTileColor = visitedTileColor;
    this.mazeWallColor = mazeWallColor;
    this.deadEndColor = deadEndColor;
    this.unlimitedSplitBotPlayerColor = unlimitedSplitBotPlayerColor;
    this.ghostItemPlayerColor = ghostItemPlayerColor;
};

exports.default = BiomeColorPalette;

},{}],61:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Maze = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MazeUtils = require("../managers/MazeUtils");

var _PlusSignMazeGrid = require("../mazeGrid/PlusSignMazeGrid");

var _CircleMazeGrid = require("../mazeGrid/CircleMazeGrid");

var _RectangleMazeGrid = require("../mazeGrid/RectangleMazeGrid");

var _DiamondMazeGrid = require("../mazeGrid/DiamondMazeGrid");

var _HoneycombMazeGrid = require("../mazeGrid/HoneycombMazeGrid");

var _LetterHMazeGrid = require("../mazeGrid/LetterHMazeGrid");

var _SquareMazeGrid = require("../mazeGrid/SquareMazeGrid");

var _PyramidMazeGrid = require("../mazeGrid/PyramidMazeGrid");

var _StaircaseMazeGrid = require("../mazeGrid/StaircaseMazeGrid");

var _ZigZagMazeGrid = require("../mazeGrid/ZigZagMazeGrid");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Maze = exports.Maze = function () {
    function Maze(game, mazeConfig) {
        _classCallCheck(this, Maze);

        this.game = game;
        this.mazeConfig = mazeConfig;
        this.generateGrid(mazeConfig);
    }

    _createClass(Maze, [{
        key: "generateMaze",
        value: function generateMaze() {
            // Reset visited array
            this.grid.resetVisitedTiles();
        }
    }, {
        key: "generateGrid",
        value: function generateGrid(mazeConfig) {
            var mazeGridType = mazeConfig.mazeGridType;

            if (mazeGridType === _MazeUtils.MazeGridType.SQUARE) {
                this.grid = new _SquareMazeGrid.SquareMazeGrid(this.game, mazeConfig);
            } else if (mazeGridType === _MazeUtils.MazeGridType.PLUS_SIGN) {
                this.grid = new _PlusSignMazeGrid.PlusSignMazeGrid(this.game, mazeConfig);
            } else if (mazeGridType === _MazeUtils.MazeGridType.RECTANGLE) {
                this.grid = new _RectangleMazeGrid.RectangleMazeGrid(this.game, mazeConfig);
            } else if (mazeGridType === _MazeUtils.MazeGridType.DIAMOND) {
                this.grid = new _DiamondMazeGrid.DiamondMazeGrid(this.game, mazeConfig);
            } else if (mazeGridType === _MazeUtils.MazeGridType.STAIRCASE) {
                this.grid = new _StaircaseMazeGrid.StaircaseMazeGrid(this.game, mazeConfig);
            } else if (mazeGridType === _MazeUtils.MazeGridType.PYRAMID) {
                this.grid = new _PyramidMazeGrid.PyramidMazeGrid(this.game, mazeConfig);
            } else if (mazeGridType === _MazeUtils.MazeGridType.CIRCLE) {
                this.grid = new _CircleMazeGrid.CircleMazeGrid(this.game, mazeConfig);
            } else if (mazeGridType === _MazeUtils.MazeGridType.LETTER_H) {
                this.grid = new _LetterHMazeGrid.LetterHMazeGrid(this.game, mazeConfig);
            } else if (mazeGridType === _MazeUtils.MazeGridType.HONEYCOMB) {
                this.grid = new _HoneycombMazeGrid.HoneycombMazeGrid(this.game, mazeConfig);
            } else if (mazeGridType === _MazeUtils.MazeGridType.ZIGZAG) {
                this.grid = new _ZigZagMazeGrid.ZigZagMazeGrid(this.game, mazeConfig);
            } else {
                throw "Invalid grid type: " + mazeGridType;
            }
        }
    }, {
        key: "getCell",
        value: function getCell(tile) {
            return this.grid.getCell(tile);
        }
    }, {
        key: "getCellByTileKey",
        value: function getCellByTileKey(tileKey) {
            return this.getCell((0, _MazeUtils.getTileFromTileKey)(tileKey));
        }
    }, {
        key: "getCellWallType",
        value: function getCellWallType(tile, wallDirectionIndex) {
            var cell = this.grid.getCell(tile, true);
            return cell ? cell.walls[wallDirectionIndex] : null;
        }
    }, {
        key: "getNeighbors",
        value: function getNeighbors(cell) {
            var neighborsArr = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = _MazeUtils.DIRECTIONS_ARR[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var dir = _step.value;

                    var neighbor = this.grid.getCell({ x: cell.x + dir.x, y: cell.y + dir.y });
                    if (neighbor) {
                        neighborsArr.push(neighbor);
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return neighborsArr;
        }
    }, {
        key: "removeWallByDirIndex",
        value: function removeWallByDirIndex(mazeCell, directionIndex) {
            var wallType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _MazeUtils.MazeWallTypes.NO_WALL;

            mazeCell.setWallTypeAtIndex(directionIndex, wallType);
        }
    }, {
        key: "removeWallBetweenCells",
        value: function removeWallBetweenCells(mazeCell, neighborCell) {
            // Calculate vector between tiles and convert it to a wall direction index
            var tileVector = (0, _MazeUtils.getCellNeighborTileVector)(mazeCell, neighborCell);
            var directionIndex = (0, _MazeUtils.getMazeDirectionIndexFromTileVector)(tileVector);
            var neighorDirectionIndex = (0, _MazeUtils.getInverseDirectionIndex)(directionIndex);
            // Determine randomly if this wall is going to be destructible
            var wallType = this.shouldSpawnDestructibleWall() ? _MazeUtils.MazeWallTypes.DESTRUCTIBLE_WALL : _MazeUtils.MazeWallTypes.NO_WALL;
            this.removeWallByDirIndex(mazeCell, directionIndex, wallType);
            this.removeWallByDirIndex(neighborCell, neighorDirectionIndex, wallType);
        }
    }, {
        key: "shouldSpawnDestructibleWall",
        value: function shouldSpawnDestructibleWall() {
            var prob = this.grid.getMazeConfig().mazeObstacles != null ? this.grid.getMazeConfig().mazeObstacles.destructibleWallSpawnRate || 0 : 0;
            var randomNumber = Math.random();
            return prob > randomNumber;
        }
    }]);

    return Maze;
}();

},{"../managers/MazeUtils":36,"../mazeGrid/CircleMazeGrid":47,"../mazeGrid/DiamondMazeGrid":48,"../mazeGrid/HoneycombMazeGrid":49,"../mazeGrid/LetterHMazeGrid":50,"../mazeGrid/PlusSignMazeGrid":51,"../mazeGrid/PyramidMazeGrid":52,"../mazeGrid/RectangleMazeGrid":53,"../mazeGrid/SquareMazeGrid":54,"../mazeGrid/StaircaseMazeGrid":55,"../mazeGrid/ZigZagMazeGrid":56}],62:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MazeCell = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ItemConstants = require('../constants/ItemConstants');

var _MazeUtils = require('../managers/MazeUtils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MazeCell = exports.MazeCell = function () {
    function MazeCell(x, y) {
        var isDeadCell = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        _classCallCheck(this, MazeCell);

        this.x = x;
        this.y = y;
        this.walls = [_MazeUtils.MazeWallTypes.WALL, _MazeUtils.MazeWallTypes.WALL, _MazeUtils.MazeWallTypes.WALL, _MazeUtils.MazeWallTypes.WALL];
        this.isVisited = false;
        this._isCellDead = false;
        this.mazeItem = null;
        this.deadEndCellValue = 0;
        this.setDeadCell(isDeadCell);
    }

    _createClass(MazeCell, [{
        key: 'setWallTypeAtIndex',
        value: function setWallTypeAtIndex(wallDirectionIndex, wallType) {
            this.walls[wallDirectionIndex] = wallType;
        }
    }, {
        key: 'isMarkedAsDeadEnd',
        value: function isMarkedAsDeadEnd() {
            return !!this.deadEndCellValue;
        }
    }, {
        key: 'getDeadEndCellValue',
        value: function getDeadEndCellValue() {
            return this.deadEndCellValue;
        }
    }, {
        key: 'setDeadEndCellValue',
        value: function setDeadEndCellValue(deadEndCellValue) {
            this.deadEndCellValue = deadEndCellValue;
        }
    }, {
        key: 'getTile',
        value: function getTile() {
            return { x: this.x, y: this.y };
        }
    }, {
        key: 'getTileKey',
        value: function getTileKey() {
            return (0, _MazeUtils.generateTileKey)(this.x, this.y);
        }
        // CAUTION: this should only be used for maze algorithm setup, not regular markings. 
        // Go through MazeGrid such that we can track the counters.

    }, {
        key: 'setVisited',
        value: function setVisited() {
            var isVisited = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            this.isVisited = isVisited;
        }
    }, {
        key: 'isCellDead',
        value: function isCellDead() {
            return this._isCellDead;
        }
    }, {
        key: 'setDeadCell',
        value: function setDeadCell() {
            var isDead = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            this._isCellDead = isDead;
            if (this._isCellDead) {
                this.walls = [_MazeUtils.MazeWallTypes.OUT_OF_BOUNDS_WALL, _MazeUtils.MazeWallTypes.OUT_OF_BOUNDS_WALL, _MazeUtils.MazeWallTypes.OUT_OF_BOUNDS_WALL, _MazeUtils.MazeWallTypes.OUT_OF_BOUNDS_WALL];
            }
        }
    }, {
        key: 'hasMazeKeyItem',
        value: function hasMazeKeyItem() {
            return this.hasMazeItem() && this.mazeItem.isMazeItemType(_ItemConstants.MazeItemKey.KEY);
        }
    }, {
        key: 'getMazeItem',
        value: function getMazeItem() {
            return this.mazeItem;
        }
    }, {
        key: 'setMazeItem',
        value: function setMazeItem(mazeItem) {
            this.mazeItem = mazeItem;
        }
    }, {
        key: 'hasMazeItem',
        value: function hasMazeItem() {
            return this.mazeItem != null;
        }
    }, {
        key: 'deleteItem',
        value: function deleteItem() {
            if (!this.hasMazeItem()) {
                return;
            }
            this.mazeItem = null;
        }
    }, {
        key: 'getPathCount',
        value: function getPathCount() {
            return this.walls.filter(function (wall) {
                return wall === _MazeUtils.MazeWallTypes.NO_WALL;
            }).length;
        }
    }]);

    return MazeCell;
}();

},{"../constants/ItemConstants":9,"../managers/MazeUtils":36}],63:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MazeGrid = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MazeUtils = require("../managers/MazeUtils");

var _MazeCell = require("./MazeCell");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MazeGrid = exports.MazeGrid = function () {
    function MazeGrid(game, mazeConfig) {
        _classCallCheck(this, MazeGrid);

        this.game = game;
        this.mazeConfig = mazeConfig;
        this.sizeX = mazeConfig.mazeSizeX;
        this.sizeY = mazeConfig.mazeSizeY;
        this.tileCount = 0;
        this.visitedTileCount = 0;
        this.internalStartTilesArr = [];
        this.mazeKeysFound = 0;
        this.isBrainItemActive = false;
        this.isExitMarkedByBrainItem = false;
        this.generateMazeGrid();
        this.setStartAndEndTile();
    }

    _createClass(MazeGrid, [{
        key: "generateMazeGrid",
        value: function generateMazeGrid() {
            // Default fill the whole grid with regular cells
            this.grid = [];
            for (var y = 0; y < this.sizeY; y++) {
                this.grid[y] = new Array();
                for (var x = 0; x < this.sizeX; x++) {
                    this.grid[y][x] = new _MazeCell.MazeCell(x, y);
                    this.tileCount++;
                }
            }
        }
    }, {
        key: "getMazeConfig",
        value: function getMazeConfig() {
            return this.mazeConfig;
        }
    }, {
        key: "getExternalExitTile",
        value: function getExternalExitTile() {
            var isIgnoreRequirements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            return isIgnoreRequirements || this.game.mazeRequirements.hasMetMazeCompletionRequirements() ? this.externalExitTile : null;
        }
    }, {
        key: "getInternalExitTile",
        value: function getInternalExitTile() {
            var isIgnoreRequirements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            return isIgnoreRequirements || this.game.mazeRequirements.hasMetMazeCompletionRequirements() ? this.internalExitTile : null;
        }
    }, {
        key: "getMazeTierSize",
        value: function getMazeTierSize() {
            return this.mazeConfig.mazeTierSize;
        }
    }, {
        key: "setStartAndEndTile",
        value: function setStartAndEndTile() {
            var totalEntrances = (0, _MazeUtils.getNumMazeEntrances)(this.game);
            var startGridLocationArr = this.chooseMazeStartGridLocation(totalEntrances);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = startGridLocationArr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var startGridLocation = _step.value;

                    var startGridCell = (0, _MazeUtils.getGridCellByLocation)(this, startGridLocation);
                    if (!startGridCell || startGridCell.isCellDead()) {
                        console.error("Invalid grid cell starting point: " + startGridLocation + ", " + startGridCell);
                    }
                    this.internalStartTilesArr.push(startGridCell);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            var exitGridLocation = this.chooseMazeEndGridLocation(startGridLocationArr);
            var exitGridCell = (0, _MazeUtils.getGridCellByLocation)(this, exitGridLocation);
            if (!exitGridCell || exitGridCell.isCellDead()) {
                console.error("Invalid grid cell ending point: " + exitGridLocation + ", " + exitGridCell);
            }
            this.internalExitTile = exitGridCell.getTile();
            this.exitDirectionVector = (0, _MazeUtils.getExitDirectionByGridLocation)(exitGridLocation);
            this.externalExitTile = (0, _MazeUtils.getNewTilePositionByVector)(this.internalExitTile, this.exitDirectionVector);
            this.getCell(this.internalExitTile).setWallTypeAtIndex((0, _MazeUtils.getMazeDirectionIndexFromTileVector)(this.exitDirectionVector), _MazeUtils.MazeWallTypes.NO_WALL);
        }
    }, {
        key: "resetVisitedTiles",
        value: function resetVisitedTiles() {
            for (var y = 0; y < this.sizeY; y++) {
                for (var x = 0; x < this.sizeX; x++) {
                    this.getCell({ x: x, y: y }, true).setVisited(false);
                }
            }
            this.visitedTileCount = 0;
        }
    }, {
        key: "setDeadCell",
        value: function setDeadCell(tile) {
            var cell = this.getCell(tile, true);
            if (cell.isCellDead()) {
                return;
            }
            this.tileCount--;
            cell.setDeadCell();
        }
        // Non-inclusive ending

    }, {
        key: "setCellRangeDead",
        value: function setCellRangeDead(xStart, xEnd, yStart, yEnd) {
            for (var x = xStart; x < xEnd; x++) {
                for (var y = yStart; y < yEnd; y++) {
                    this.setDeadCell({ x: x, y: y });
                }
            }
        }
    }, {
        key: "isValidTile",
        value: function isValidTile(tile) {
            var includeDeadCells = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            //TODO: this should actually check the physical cell and include exit cell
            return tile.x >= 0 && tile.x < this.sizeX && tile.y >= 0 && tile.y < this.sizeY && (includeDeadCells || !this.grid[tile.y][tile.x].isCellDead());
        }
    }, {
        key: "getCell",
        value: function getCell(tile) {
            var includeDeadCells = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (!this.isValidTile(tile, includeDeadCells)) {
                return null;
            }
            return this.grid[tile.y][tile.x];
        }
    }, {
        key: "isVisited",
        value: function isVisited(tile) {
            // Exit tile is not visited.
            if ((0, _MazeUtils.isTileEqual)(tile, this.getExternalExitTile())) return false;
            var cell = this.getCell(tile);
            if (cell) {
                return cell.isVisited;
            }
        }
    }, {
        key: "setVisited",
        value: function setVisited(tile) {
            if (!this.isValidTile(tile)) return;
            var cell = this.getCell(tile);
            if (!cell.isVisited) {
                cell.setVisited();
                this.visitedTileCount++;
                this.game.mazeRequirements.updateMazeCompletionUi();
            }
        }
    }, {
        key: "getCellByTileKey",
        value: function getCellByTileKey(tileKey) {
            return this.getCell((0, _MazeUtils.getTileFromTileKey)(tileKey));
        }
    }, {
        key: "getCellWallTypeByMazeDirectionIndex",
        value: function getCellWallTypeByMazeDirectionIndex(tile, wallDirectionIndex) {
            return this.getCell(tile).walls[wallDirectionIndex];
        }
    }, {
        key: "getCellWallTypeByTileVector",
        value: function getCellWallTypeByTileVector(tile, tileVector) {
            var wallDirectionIndex = (0, _MazeUtils.getMazeDirectionIndexFromTileVector)(tileVector);
            return this.getCell(tile).walls[wallDirectionIndex];
        }
    }, {
        key: "getIsWall",
        value: function getIsWall(tile, tileVector) {
            return this.getCellWallTypeByTileVector(tile, tileVector) == _MazeUtils.MazeWallTypes.WALL;
        }
    }, {
        key: "getTileCount",
        value: function getTileCount() {
            return this.tileCount;
        }
    }, {
        key: "isMazeExitTile",
        value: function isMazeExitTile(tile) {
            var isIgnoreMazeRequirements = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            return (0, _MazeUtils.isTileEqual)(tile, this.getExternalExitTile(isIgnoreMazeRequirements));
        }
    }, {
        key: "isMovingFromExitInward",
        value: function isMovingFromExitInward(tile, tileVector) {
            var isIgnoreMazeRequirements = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            return this.isMazeExitTile(tile, isIgnoreMazeRequirements) && (0, _MazeUtils.isTileEqual)((0, _MazeUtils.getNewTilePositionByVector)(tile, tileVector), this.internalExitTile);
        }
    }, {
        key: "getAllCells",
        value: function getAllCells() {
            var cellList = [];
            for (var y = 0; y < this.sizeY; y++) {
                for (var x = 0; x < this.sizeX; x++) {
                    var cell = this.getCell({ x: x, y: y });
                    if (cell && !cell.isCellDead()) {
                        cellList.push(cell);
                    }
                }
            }
            return cellList;
        }
    }, {
        key: "getNumVisitedTiles",
        value: function getNumVisitedTiles() {
            return this.visitedTileCount;
        }
    }, {
        key: "getTileVisitedPercentage",
        value: function getTileVisitedPercentage() {
            return this.visitedTileCount / this.tileCount;
        }
    }, {
        key: "getNumMazeKeysFound",
        value: function getNumMazeKeysFound() {
            return this.mazeKeysFound;
        }
    }, {
        key: "hasBrainItemActive",
        value: function hasBrainItemActive() {
            return this.isBrainItemActive;
        }
    }, {
        key: "setBrainItemActive",
        value: function setBrainItemActive() {
            var isBrainItemActive = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            this.isBrainItemActive = isBrainItemActive;
        }
    }, {
        key: "hasExitMarkedByBrainItem",
        value: function hasExitMarkedByBrainItem() {
            return this.isExitMarkedByBrainItem;
        }
    }, {
        key: "setInternalExitVisited",
        value: function setInternalExitVisited() {
            if (this.hasBrainItemActive()) {
                this.isExitMarkedByBrainItem = true;
                this.game.ui.setFinishLineIcon();
            }
        }
    }, {
        key: "addMazeKeyFound",
        value: function addMazeKeyFound() {
            var numKeysFound = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

            this.mazeKeysFound += numKeysFound;
            this.game.mazeRequirements.updateMazeCompletionUi();
        }
    }, {
        key: "chooseMazeStartGridLocation",
        value: function chooseMazeStartGridLocation() {
            var totalEntrances = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

            if (totalEntrances === 1) {
                return [this.getDefaultStartingLocation()];
            } else {
                // Remove default start/end locations
                var validStartLocationsSet = new Set(this.getValidStartLocations());
                validStartLocationsSet.delete(this.getDefaultStartingLocation());
                validStartLocationsSet.delete(this.getDefaultExitLocation());
                var selectedStartLocations = (0, _MazeUtils.getRandomXValuesFromArray)(Array.from(validStartLocationsSet), totalEntrances - 1);
                selectedStartLocations.push(this.getDefaultStartingLocation());
                return selectedStartLocations;
            }
        }
    }, {
        key: "chooseMazeEndGridLocation",
        value: function chooseMazeEndGridLocation(startGridLocationArr) {
            // Validate we're not using the same location for start/end
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = startGridLocationArr[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var startGridLocation = _step2.value;

                    if (this.getDefaultExitLocation() == startGridLocation) {
                        console.error("Start and end grid location are equivalent: " + startGridLocation);
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return this.getDefaultExitLocation();
        }
        // NOTE: it is assumed that there are more than 3 possible entrance/exits. (ie. 2 entrance + 1 exit)

    }, {
        key: "getValidStartLocations",
        value: function getValidStartLocations() {
            throw "No start location defined for grid type: " + this.mazeConfig.mazeGridType + ".";
        }
    }, {
        key: "getValidExitLocations",
        value: function getValidExitLocations() {
            throw "No exit location defined for grid type: " + this.mazeConfig.mazeGridType;
        }
    }, {
        key: "getDefaultStartingLocation",
        value: function getDefaultStartingLocation() {
            throw "No default starat location defined for grid type: " + this.mazeConfig.mazeGridType;
        }
    }, {
        key: "getDefaultExitLocation",
        value: function getDefaultExitLocation() {
            throw "No default exit location defined for grid type: " + this.mazeConfig.mazeGridType;
        }
    }]);

    return MazeGrid;
}();

},{"../managers/MazeUtils":36,"./MazeCell":62}],64:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PowerUpConstants = require("../constants/PowerUpConstants");

var _MazeUtils = require("../managers/MazeUtils");

var _Stats = require("./Stats");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
    function Player(game, id) {
        var currTile = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var prevTile = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
        var isManuallyControlled = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

        _classCallCheck(this, Player);

        this.game = game;
        this.id = id;
        this.currTile = currTile;
        this.prevTile = prevTile;
        this.isManuallyControlled = isManuallyControlled;
        this.moveCount = 0;
        this.smartPathingTileDistanceRemaining = 0;
        this._ghostItemTileDistanceRemaining = 0;
        this._isUnlimitedSplitItemActive = false;
        this._isPathingFromDeadEnd = false;
        this._decisionPointTile = null;
        this._decisionPointNextTileVectors = null;
    }

    _createClass(Player, [{
        key: "isSmartPathingActive",
        value: function isSmartPathingActive() {
            return this.smartPathingTileDistanceRemaining > 0;
        }
    }, {
        key: "reduceSmartPathingDistance",
        value: function reduceSmartPathingDistance() {
            var distance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

            this.smartPathingTileDistanceRemaining = Math.max(0, this.smartPathingTileDistanceRemaining - distance);
        }
    }, {
        key: "isMultiplierPowerUpActive",
        value: function isMultiplierPowerUpActive() {
            return this.game.powerUps.isPowerUpActive(_PowerUpConstants.PowerUpKey.TILE_MULTIPLIER);
        }
    }, {
        key: "isUnlimitedSplitItemActive",
        value: function isUnlimitedSplitItemActive() {
            return this._isUnlimitedSplitItemActive;
        }
    }, {
        key: "setIsUnlimitedSplitItemActive",
        value: function setIsUnlimitedSplitItemActive(setActive) {
            this._isUnlimitedSplitItemActive = setActive;
        }
    }, {
        key: "isGhostItemActive",
        value: function isGhostItemActive() {
            return this._ghostItemTileDistanceRemaining > 0;
        }
    }, {
        key: "addGhostPathingDistance",
        value: function addGhostPathingDistance(distance) {
            this._ghostItemTileDistanceRemaining = Math.max(0, this._ghostItemTileDistanceRemaining + distance);
        }
    }, {
        key: "isPathingFromDeadEnd",
        value: function isPathingFromDeadEnd() {
            return this._isPathingFromDeadEnd;
        }
    }, {
        key: "setIsPathingFromDeadEnd",
        value: function setIsPathingFromDeadEnd(isPathingFromDeadEnd) {
            this._isPathingFromDeadEnd = isPathingFromDeadEnd;
        }
    }, {
        key: "mergePlayerPassives",
        value: function mergePlayerPassives(mergedPlayer) {
            if (mergedPlayer.isSmartPathingActive()) {
                this.smartPathingTileDistanceRemaining += mergedPlayer.smartPathingTileDistanceRemaining;
            }
            if (mergedPlayer.isGhostItemActive()) {
                this._ghostItemTileDistanceRemaining += mergedPlayer._ghostItemTileDistanceRemaining;
            }
            if (mergedPlayer.isUnlimitedSplitItemActive()) {
                this.setIsUnlimitedSplitItemActive(mergedPlayer.isUnlimitedSplitItemActive());
            }
        }
        // Only is a decision point if there is a valid remaining decision to be made

    }, {
        key: "isAtMostRecentDecisionPointTile",
        value: function isAtMostRecentDecisionPointTile() {
            return this._decisionPointTile != null && (0, _MazeUtils.isTileEqual)(this.currTile, this._decisionPointTile);
        }
    }, {
        key: "clearMostRecentDecisionPoint",
        value: function clearMostRecentDecisionPoint() {
            this._decisionPointTile = null;
            this._decisionPointNextTileVectors = null;
        }
        // NOTE: this assumes there are no 3-way decision locations.  This will mess things up, for uh, reasons.
        //TODO: it's probably not too difficult (LOL) to make this support multi-tile memory.

    }, {
        key: "getAndUpdateDecisionPointTileNextDecision",
        value: function getAndUpdateDecisionPointTileNextDecision(validDirs, unvisitedTiles) {
            // If no existing options, add all of them.
            if (!this._decisionPointNextTileVectors || this._decisionPointNextTileVectors.size === 0) {
                this._decisionPointNextTileVectors = new Set(validDirs);
            }
            var nextDirs = Array.from(this._decisionPointNextTileVectors);
            // Prioritize unvisited tiles if there are any.
            var selectedDir = unvisitedTiles.length > 0 ? unvisitedTiles[(0, _MazeUtils.getRandomInteger)(0, unvisitedTiles.length - 1)] : nextDirs[(0, _MazeUtils.getRandomInteger)(0, nextDirs.length - 1)];
            if (unvisitedTiles.length === 0) {
                this.game.stats.addStatsToKey(1, _Stats.StatsKey.TOTAL_REMEMBER_LAST_PATHWAYS);
            }
            // Add all new possible directions
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = validDirs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var newDir = _step.value;

                    this._decisionPointNextTileVectors.add(newDir);
                }
                // Delete the chosen direction and reset if no options left.
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            this._decisionPointNextTileVectors.delete(selectedDir);
            // Update the decision point tile
            if (this._decisionPointNextTileVectors.size === 0) {
                this.clearMostRecentDecisionPoint();
            } else {
                this._decisionPointTile = this.currTile;
            }
            return selectedDir;
        }
    }]);

    return Player;
}();

exports.default = Player;

},{"../constants/PowerUpConstants":10,"../managers/MazeUtils":36,"./Stats":68}],65:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SLIDING_WINDOW_LENGTH = 40;

var PointsHistoryTracker = exports.PointsHistoryTracker = function () {
    function PointsHistoryTracker(game, statsKey) {
        _classCallCheck(this, PointsHistoryTracker);

        this.currIndex = 0;
        this.game = game;
        this.statsKey = statsKey;
        this.resetHistory();
    }

    _createClass(PointsHistoryTracker, [{
        key: "resetHistory",
        value: function resetHistory() {
            this.slidingWindow = new Array(SLIDING_WINDOW_LENGTH).fill(0);
            this.currentTotal = 0;
            this.currentDataPoints = 0;
            this.currIndex = 0;
            clearInterval(this.timer);
            this.startTimer();
        }
    }, {
        key: "startTimer",
        value: function startTimer() {
            var _this = this;

            if (this.game.dev.isDisableUi()) return;
            this.timer = setInterval(function () {
                // Add total from previous second.
                var prevIndex = _this.currIndex;
                var nextIndex = _this.getNextIndex();
                // Add most recently completed bucket
                _this.currentTotal += _this.slidingWindow[prevIndex];
                // Subtract the new bucket indexes total and zero it out
                _this.currentTotal -= _this.slidingWindow[nextIndex];
                _this.slidingWindow[nextIndex] = 0;
                // Update index after the fact.
                _this.currIndex = nextIndex;
                // Update average
                _this.updateStatsAverage();
                // Keep track of current points -- always short 1 data point from max
                _this.currentDataPoints = _this.currentDataPoints + 1 < _this.slidingWindow.length ? _this.currentDataPoints + 1 : _this.slidingWindow.length - 1;
            }, 1000);
        }
    }, {
        key: "getNextIndex",
        value: function getNextIndex() {
            return ++this.currIndex === this.slidingWindow.length ? 0 : this.currIndex;
        }
    }, {
        key: "updateStatsAverage",
        value: function updateStatsAverage() {
            var average = this.getAverage();
            this.game.stats.setStatsToKey(average, this.statsKey);
        }
    }, {
        key: "getAverage",
        value: function getAverage() {
            if (this.currentDataPoints <= 0) return 0;
            return Math.max(0, this.currentTotal / this.currentDataPoints);
        }
    }, {
        key: "addNumber",
        value: function addNumber(value) {
            if (!this.timer) {
                this.startTimer();
            }
            this.slidingWindow[this.currIndex] += value;
        }
    }]);

    return PointsHistoryTracker;
}();

},{}],66:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PowerUp = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PowerUpConstants = require("../constants/PowerUpConstants");

var _UserInterface = require("../managers/UserInterface");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MAX_ACCUMULATOR_VALUE = 1000000;
var UI_UPDATE_INTERVAL_IN_MS = 100;

var PowerUp = exports.PowerUp = function () {
    function PowerUp(game, powerUpKey, activateStatsKey, durationStatsKey) {
        _classCallCheck(this, PowerUp);

        this.game = game;
        this.powerUpKey = powerUpKey;
        this.activateStatsKey = activateStatsKey;
        this.durationStatsKey = durationStatsKey;
        this.currentActivateDuration = 0;
        this.resetAllTimers();
    }

    _createClass(PowerUp, [{
        key: "getUiStatusString",
        value: function getUiStatusString() {
            return this._isPowerUpActive ? "(" + this.formatDisplayString(this.getActivateTimeLeft()) + ")" : "";
        }
    }, {
        key: "isPowerUpActive",
        value: function isPowerUpActive() {
            return this._isPowerUpActive;
        }
    }, {
        key: "formatDisplayString",
        value: function formatDisplayString(duration) {
            return (duration / 1000).toFixed(1);
        }
    }, {
        key: "getActivateTimeLeft",
        value: function getActivateTimeLeft() {
            return Math.max(0, this.currentActivateDuration - this.activateDurationCounterMs);
        }
    }, {
        key: "resetAllTimers",
        value: function resetAllTimers() {
            var updateUiAfter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            this.resetActivateTimer();
            this.resetUiTimer(updateUiAfter);
        }
    }, {
        key: "resetUiTimer",
        value: function resetUiTimer() {
            var updateUiAfter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            clearInterval(this.uiUpdateTimer);
            this.uiUpdateTimer = null;
            if (updateUiAfter) {
                this.updateUi();
            }
        }
    }, {
        key: "resetActivateTimer",
        value: function resetActivateTimer() {
            clearTimeout(this.activateTimer);
            this.activateTimer = null;
            this.activateDurationCounterMs = 0;
            this._isPowerUpActive = false;
        }
    }, {
        key: "activatePowerUpTimer",
        value: function activatePowerUpTimer() {
            var _this = this;

            var newActivateDuration = this.getActivateDuration();
            // Add the remaining time onto the default amount for additive stacking.
            if (this.isAdditiveStackingEnabled() && this.isPowerUpActive()) {
                newActivateDuration += this.getActivateTimeLeft();
            }
            newActivateDuration = Math.min(newActivateDuration, MAX_ACCUMULATOR_VALUE);
            if (this.game.dev.isSpeedRunEnabled()) {
                newActivateDuration *= this.game.dev.getSpeedRunSpeedRatio();
            }
            this.resetAllTimers();
            this._isPowerUpActive = true;
            this.currentActivateDuration = newActivateDuration;
            this.activateUiTimer();
            this.activateTimer = setTimeout(function () {
                _this._isPowerUpActive = false;
                _this.resetUiTimer(true);
            }, newActivateDuration);
        }
    }, {
        key: "activateUiTimer",
        value: function activateUiTimer() {
            var _this2 = this;

            if (this.uiUpdateTimer) {
                return;
            }
            this.game.stats.addStatsToKey(1, this.activateStatsKey);
            this.updateUi();
            var uiUpdateInterval = this.game.dev.isSpeedRunEnabled() ? UI_UPDATE_INTERVAL_IN_MS * this.game.dev.getSpeedRunSpeedRatio() : UI_UPDATE_INTERVAL_IN_MS;
            this.uiUpdateTimer = setInterval(function () {
                if (_this2._isPowerUpActive) {
                    _this2.activateDurationCounterMs += UI_UPDATE_INTERVAL_IN_MS;
                    _this2.game.stats.addStatsToKey(UI_UPDATE_INTERVAL_IN_MS / 1000, _this2.durationStatsKey);
                }
                _this2.updateUi();
            }, uiUpdateInterval);
        }
    }, {
        key: "getUiId",
        value: function getUiId() {
            return _PowerUpConstants.POWER_UP_TO_UI_KEY_MAP.get(this.powerUpKey);
        }
    }, {
        key: "updateUi",
        value: function updateUi() {
            _UserInterface.UserInterface.setText(this.getUiId(), this.getUiStatusString());
            _UserInterface.UserInterface.setIdVisible(this.getUiId(), this.isPowerUpActive());
        }
    }]);

    return PowerUp;
}();

},{"../constants/PowerUpConstants":10,"../managers/UserInterface":46}],67:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MAP_TYPE_PREFIX = "~~";

var Serializable = exports.Serializable = function () {
    function Serializable() {
        var basicPropertyList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        _classCallCheck(this, Serializable);

        this.serializablePropertyList = [];
        this.serializablePropertyList = basicPropertyList;
    }

    _createClass(Serializable, [{
        key: 'stringifyMap',
        value: function stringifyMap(value) {
            return JSON.stringify([].concat(_toConsumableArray(value.entries())));
        }
    }, {
        key: 'destringifyMap',
        value: function destringifyMap(value) {
            // Trim prefix
            var str = value.substr(MAP_TYPE_PREFIX.length);
            return JSON.parse(str).reduce(function (m, _ref) {
                var _ref2 = _slicedToArray(_ref, 2),
                    key = _ref2[0],
                    val = _ref2[1];

                return m.set(key, val);
            }, new Map());
        }
    }, {
        key: 'serializeProperty',
        value: function serializeProperty(property) {
            if (_typeof(this[property]) === 'object') {
                return MAP_TYPE_PREFIX + this.stringifyMap(this[property]);
            }
            return this[property];
        }
    }, {
        key: 'deserializeProperty',
        value: function deserializeProperty(property, value) {
            if (value && typeof value === 'string' && value.startsWith(MAP_TYPE_PREFIX)) {
                this[property] = this.destringifyMap(value);
            } else {
                this[property] = value;
            }
        }
    }, {
        key: 'getSerializablePropertyList',
        value: function getSerializablePropertyList() {
            return this.serializablePropertyList;
        }
    }, {
        key: 'serialize',
        value: function serialize() {
            var gamePropList = this.getSerializablePropertyList();
            var jsonObj = {};
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = gamePropList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var prop = _step.value;

                    jsonObj[prop] = this.serializeProperty(prop);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return jsonObj;
        }
    }, {
        key: 'deserialize',
        value: function deserialize(jsonObj) {
            for (var prop in jsonObj) {
                this.deserializeProperty(prop, jsonObj[prop]);
            }
        }
    }]);

    return Serializable;
}();

},{}],68:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var StatsKey = exports.StatsKey = undefined;
(function (StatsKey) {
    // Points Stats
    StatsKey["TOTAL_POINTS_EARNED"] = "TOTAL_POINTS_EARNED";
    StatsKey["TOTAL_POINTS_SPENT"] = "TOTAL_POINTS_SPENT";
    StatsKey["TOTAL_POINTS_EARNED_FROM_VISITED_TILES"] = "TOTAL_POINTS_EARNED_FROM_VISITED_TILES";
    StatsKey["TOTAL_POINTS_EARNED_FROM_REVISITED_TILES"] = "TOTAL_POINTS_EARNED_FROM_REVISITED_TILES";
    StatsKey["TOTAL_POINTS_EARNED_FROM_MAZE_COMPLETIONS"] = "TOTAL_POINTS_EARNED_FROM_MAZE_COMPLETIONS";
    StatsKey["TOTAL_POINTS_EARNED_FROM_FRUITS"] = "TOTAL_POINTS_EARNED_FROM_FRUITS";
    StatsKey["TOTAL_POINTS_EARNED_FROM_TILE_MULTIPLIER"] = "TOTAL_POINTS_EARNED_FROM_TILE_MULTIPLIER";
    // Maze stats
    StatsKey["TOTAL_TILES_VISITED"] = "TOTAL_TILES_VISITED";
    StatsKey["TOTAL_TILES_REVISITED"] = "TOTAL_TILES_REVISITED";
    StatsKey["TOTAL_MAZES_COMPLETED"] = "TOTAL_MAZES_COMPLETED";
    StatsKey["TOTAL_TIME_PLAYED_IN_SECONDS"] = "TOTAL_TIME_PLAYED_IN_SECONDS";
    StatsKey["TOTAL_TIME_PLAYED_IN_CURRENT_BIOME_IN_SECONDS"] = "TOTAL_TIME_PLAYED_IN_CURRENT_BIOME_IN_SECONDS";
    StatsKey["TOTAL_PERCENT_MAZE_VISITED_AVERAGE"] = "TOTAL_PERCENT_MAZE_VISITED_AVERAGE";
    // Item Stats
    StatsKey["TOTAL_PORTAL_ITEMS_PICKED_UP"] = "TOTAL_PORTAL_ITEMS_PICKED_UP";
    StatsKey["TOTAL_BRAIN_ITEMS_PICKED_UP"] = "TOTAL_BRAIN_ITEMS_PICKED_UP";
    StatsKey["TOTAL_BRAIN_ITEM_MAZE_SOLVES"] = "TOTAL_BRAIN_ITEM_MAZE_SOLVES";
    StatsKey["TOTAL_DEAD_END_ITEMS_PICKED_UP"] = "TOTAL_DEAD_END_ITEMS_PICKED_UP";
    StatsKey["TOTAL_DEAD_ENDS_MARKED_BY_ITEM_PICK_UP"] = "TOTAL_DEAD_ENDS_MARKED_BY_ITEM_PICK_UP";
    StatsKey["TOTAL_FRUIT_ITEMS_PICKED_UP"] = "TOTAL_FRUIT_ITEMS_PICKED_UP";
    StatsKey["TOTAL_GHOST_ITEMS_PICKED_UP"] = "TOTAL_GHOST_ITEMS_PICKED_UP";
    StatsKey["TOTAL_KEY_ITEMS_PICKED_UP"] = "TOTAL_KEY_ITEMS_PICKED_UP";
    StatsKey["TOTAL_SPEED_UP_ITEMS_PICKED_UP"] = "TOTAL_SPEED_UP_ITEMS_PICKED_UP";
    StatsKey["TOTAL_SPEED_UP_ITEM_DURATION"] = "TOTAL_SPEED_UP_ITEM_DURATION";
    StatsKey["TOTAL_TILE_MULTIPLIER_ITEMS_PICKED_UP"] = "TOTAL_TILE_MULTIPLIER_ITEMS_PICKED_UP";
    StatsKey["TOTAL_TILE_MULTIPLIER_ITEM_POINTS_EARNED"] = "TOTAL_TILE_MULTIPLIER_ITEM_POINTS_EARNED";
    StatsKey["TOTAL_TILE_MULTIPLIER_ITEM_DURATION"] = "TOTAL_TILE_MULTIPLIER_ITEM_DURATION";
    StatsKey["TOTAL_UNLIMITED_SPLITS_ITEMS_PICKED_UP"] = "TOTAL_UNLIMITED_SPLITS_ITEMS_PICKED_UP";
    StatsKey["TOTAL_DESTRUCTIBLE_WALLS_DESTROYED"] = "TOTAL_DESTRUCTIBLE_WALLS_DESTROYED";
    // Bot Stats
    StatsKey["TOTAL_NUMBER_OF_BOT_SPLITS"] = "TOTAL_NUMBER_OF_BOT_SPLITS";
    StatsKey["TOTAL_NUMBER_OF_BOT_MERGES"] = "TOTAL_NUMBER_OF_BOT_MERGES";
    StatsKey["TOTAL_NUMBER_DEAD_ENDS_MARKED"] = "TOTAL_NUMBER_DEAD_ENDS_MARKED";
    StatsKey["TOTAL_LUCKY_GUESSES"] = "TOTAL_LUCKY_GUESSES";
    StatsKey["TOTAL_REMEMBER_LAST_PATHWAYS"] = "TOTAL_REMEMBER_LAST_PATHWAYS";
    StatsKey["TOTAL_SMART_MERGES"] = "TOTAL_SMART_MERGES";
    // Dev Stats
    StatsKey["TOTAL_RNG_BOT_SPEED_RUN_TIME"] = "TOTAL_RNG_BOT_SPEED_RUN_TIME";
    // Current Maze Stats
    StatsKey["CURRENT_MAZE_POINTS_EARNED"] = "CURRENT_MAZE_POINTS_EARNED";
    StatsKey["CURRENT_MAZE_UNIQUE_TILES_VISITED"] = "CURRENT_MAZE_UNIQUE_TILES_VISITED";
    StatsKey["CURRENT_MAZE_TILES_REVISITED"] = "CURRENT_MAZE_TOTAL_TILES_REVISITED";
    StatsKey["AVERAGE_POINTS_EARNED_PER_SECOND"] = "AVERAGE_POINTS_EARNED_PER_SECOND";
    //TODO: eventually do these probably, maybe, but probably not.
    // TOTAL_MANUAL_TILES_VISITED = "TOTAL_MANUAL_TILES_VISITED",
    // DEAD_ENDS_AVOIDED
})(StatsKey || (exports.StatsKey = StatsKey = {}));
var STATS_TO_UI_ID_MAP = exports.STATS_TO_UI_ID_MAP = new Map([
// Points Stats
[StatsKey.TOTAL_POINTS_EARNED, 'statsTotalPointsEarned'], [StatsKey.TOTAL_POINTS_SPENT, 'statsTotalPointsSpent'], [StatsKey.TOTAL_POINTS_EARNED_FROM_VISITED_TILES, 'statsTotalPointsEarnedFromVisitedTiles'], [StatsKey.TOTAL_POINTS_EARNED_FROM_REVISITED_TILES, 'statsTotalPointsEarnedFromRevisitedTiles'], [StatsKey.TOTAL_POINTS_EARNED_FROM_MAZE_COMPLETIONS, 'statsTotalPointsEarnedFromMazeCompletions'], [StatsKey.TOTAL_POINTS_EARNED_FROM_FRUITS, 'statsTotalPointsEarnedFromFruits'],
// Current Stats
// [StatsKey.CURRENT_MAZE_POINTS_EARNED, 'statsCurrentMazePointsEarned'],
// [StatsKey.CURRENT_MAZE_UNIQUE_TILES_VISITED, 'statsCurrentMazeUniqueTilesVisited'],
// [StatsKey.CURRENT_MAZE_TILES_REVISITED, 'statsCurrentMazePointsEarned'],
// Bot Stats
[StatsKey.TOTAL_NUMBER_OF_BOT_SPLITS, 'statsTotalNumberOfBotSplits'], [StatsKey.TOTAL_NUMBER_OF_BOT_MERGES, 'statsTotalNumberOfBotMerges'], [StatsKey.TOTAL_NUMBER_DEAD_ENDS_MARKED, 'statsTotalDeadEndsMarked'], [StatsKey.TOTAL_LUCKY_GUESSES, 'statsTotalLuckyGuesses'], [StatsKey.TOTAL_REMEMBER_LAST_PATHWAYS, 'statsTotalRememberLastPathways'], [StatsKey.TOTAL_SMART_MERGES, 'statsTotalSmartMerges'],
// Maze Stats
[StatsKey.TOTAL_TILES_VISITED, 'statsTotalTilesVisited'], [StatsKey.TOTAL_TILES_REVISITED, 'statsTotalTilesRevisited'], [StatsKey.TOTAL_MAZES_COMPLETED, 'statsTotalMazesCompleted'], [StatsKey.TOTAL_TIME_PLAYED_IN_SECONDS, 'statsTotalTimePlayed'], [StatsKey.TOTAL_TIME_PLAYED_IN_CURRENT_BIOME_IN_SECONDS, 'statsTotalTimePlayedInCurrentBiome'], [StatsKey.TOTAL_PERCENT_MAZE_VISITED_AVERAGE, 'statsTotalPercentMazeVisitedAverage'], [StatsKey.TOTAL_DESTRUCTIBLE_WALLS_DESTROYED, 'statsTotalDestructibleWallsDestroyed'],
// Item Stats
[StatsKey.TOTAL_FRUIT_ITEMS_PICKED_UP, 'statsTotalFruitItemsPickedUp'], [StatsKey.TOTAL_BRAIN_ITEMS_PICKED_UP, 'statsTotalBrainItemsPickedUp'], [StatsKey.TOTAL_BRAIN_ITEM_MAZE_SOLVES, 'statsTotalBrainItemMazeSolves'], [StatsKey.TOTAL_PORTAL_ITEMS_PICKED_UP, 'statsTotalBlackHoleItemsPickedUp'], [StatsKey.TOTAL_DEAD_END_ITEMS_PICKED_UP, 'statsTotalDeadEndItemsPickedUp'], [StatsKey.TOTAL_DEAD_ENDS_MARKED_BY_ITEM_PICK_UP, 'statsTotalDeadEndsMarkedByItemPickup'], [StatsKey.TOTAL_KEY_ITEMS_PICKED_UP, 'statsTotalKeyItemsPickedUp'],
// Power Up Stats
[StatsKey.TOTAL_TILE_MULTIPLIER_ITEMS_PICKED_UP, 'statsTileMultiplierItemsPickedUp'], [StatsKey.TOTAL_TILE_MULTIPLIER_ITEM_POINTS_EARNED, 'statsTileMultiplierItemPointsEarned'], [StatsKey.TOTAL_TILE_MULTIPLIER_ITEM_DURATION, 'statsTileMultiplierItemDuration'], [StatsKey.TOTAL_SPEED_UP_ITEMS_PICKED_UP, 'statsSpeedUpItemsPickedUp'], [StatsKey.TOTAL_SPEED_UP_ITEM_DURATION, 'statsSpeedUpItemDuration'],
// Average
[StatsKey.AVERAGE_POINTS_EARNED_PER_SECOND, 'averagePointsEarnedPerSecond']]);
var CURRENT_MAZE_STATS = exports.CURRENT_MAZE_STATS = new Set([StatsKey.CURRENT_MAZE_POINTS_EARNED, StatsKey.CURRENT_MAZE_TILES_REVISITED, StatsKey.CURRENT_MAZE_UNIQUE_TILES_VISITED]);
var STATS_TIME_PRETTY_PRINT_FORMAT = exports.STATS_TIME_PRETTY_PRINT_FORMAT = new Set([StatsKey.TOTAL_SPEED_UP_ITEM_DURATION, StatsKey.TOTAL_TILE_MULTIPLIER_ITEM_DURATION, StatsKey.TOTAL_TIME_PLAYED_IN_SECONDS, StatsKey.TOTAL_TIME_PLAYED_IN_CURRENT_BIOME_IN_SECONDS]);
var STATS_PERCENTAGE_PRINT_FORMAT = exports.STATS_PERCENTAGE_PRINT_FORMAT = new Set([StatsKey.TOTAL_PERCENT_MAZE_VISITED_AVERAGE]);

},{}],69:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PointsMultiplierPowerUp = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PowerUpConstants = require("../constants/PowerUpConstants");

var _UpgradeConstants = require("../constants/UpgradeConstants");

var _PowerUp2 = require("../models/PowerUp");

var _Stats = require("../models/Stats");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PointsMultiplierPowerUp = exports.PointsMultiplierPowerUp = function (_PowerUp) {
    _inherits(PointsMultiplierPowerUp, _PowerUp);

    function PointsMultiplierPowerUp(game) {
        _classCallCheck(this, PointsMultiplierPowerUp);

        return _possibleConstructorReturn(this, (PointsMultiplierPowerUp.__proto__ || Object.getPrototypeOf(PointsMultiplierPowerUp)).call(this, game, _PowerUpConstants.PowerUpKey.TILE_MULTIPLIER, _Stats.StatsKey.TOTAL_TILE_MULTIPLIER_ITEMS_PICKED_UP, _Stats.StatsKey.TOTAL_TILE_MULTIPLIER_ITEM_DURATION));
    }

    _createClass(PointsMultiplierPowerUp, [{
        key: "getActivateDuration",
        value: function getActivateDuration() {
            return this.game.upgrades.getUpgradeValue(_UpgradeConstants.UpgradeKey.TILE_MULTIPLIER_DURATION);
        }
    }, {
        key: "isAdditiveStackingEnabled",
        value: function isAdditiveStackingEnabled() {
            return this.game.upgrades.isUpgraded(_UpgradeConstants.UpgradeKey.TILE_MULTIPLIER_STACKING_UPGRADE);
        }
    }]);

    return PointsMultiplierPowerUp;
}(_PowerUp2.PowerUp);

},{"../constants/PowerUpConstants":10,"../constants/UpgradeConstants":13,"../models/PowerUp":66,"../models/Stats":68}],70:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SpeedUpPowerUp = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PowerUpConstants = require("../constants/PowerUpConstants");

var _UpgradeConstants = require("../constants/UpgradeConstants");

var _PowerUp2 = require("../models/PowerUp");

var _Stats = require("../models/Stats");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SpeedUpPowerUp = exports.SpeedUpPowerUp = function (_PowerUp) {
    _inherits(SpeedUpPowerUp, _PowerUp);

    function SpeedUpPowerUp(game) {
        _classCallCheck(this, SpeedUpPowerUp);

        return _possibleConstructorReturn(this, (SpeedUpPowerUp.__proto__ || Object.getPrototypeOf(SpeedUpPowerUp)).call(this, game, _PowerUpConstants.PowerUpKey.SPEED_UP, _Stats.StatsKey.TOTAL_SPEED_UP_ITEMS_PICKED_UP, _Stats.StatsKey.TOTAL_SPEED_UP_ITEM_DURATION));
    }

    _createClass(SpeedUpPowerUp, [{
        key: "getActivateDuration",
        value: function getActivateDuration() {
            return this.game.upgrades.getUpgradeValue(_UpgradeConstants.UpgradeKey.SPEED_UP_DURATION);
        }
    }, {
        key: "isAdditiveStackingEnabled",
        value: function isAdditiveStackingEnabled() {
            return this.game.upgrades.isUpgraded(_UpgradeConstants.UpgradeKey.SPEED_UP_STACKING_UPGRADE);
        }
    }]);

    return SpeedUpPowerUp;
}(_PowerUp2.PowerUp);

},{"../constants/PowerUpConstants":10,"../constants/UpgradeConstants":13,"../models/PowerUp":66,"../models/Stats":68}],71:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _devUtils = require('../dev/devUtils');

var _UserInterface = require('../managers/UserInterface');

var _ExperimentConstants = require('../constants/ExperimentConstants');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TOOLTIP_UI_ID_SUFFIX = "Tooltip";
var BUTTON_TEXT_UI_ID_SUFFIX = "Text";
var BUTTON_UI_ID_SUFFIX = "Button";
var NEW_TEXT_SUFFIX = "NewText";
var MIN_UPGRADE_LEVEL = 0;
var DISABLED_BUTTON_BACKGROUND_COLOR = "#AAAAAA";
var ENABLED_BUTTON_BACKGROUND_COLOR = "#181818";

var Upgrade = function () {
    function Upgrade(game, upgradeType, uiId) {
        var tooltipText = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
        var upgradeKey = arguments[4];
        var upgradeCount = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
        var isSinglePurchase = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;

        _classCallCheck(this, Upgrade);

        this.isSinglePurchase = false;
        this.arrowTextUnicode = "➔";
        this.game = game;
        this.upgradeType = upgradeType;
        this.upgradeKey = upgradeKey;
        this.uiId = uiId;
        this.tooltipText = tooltipText;
        this.upgradeLevel = upgradeCount;
        this.isSinglePurchase = isSinglePurchase;
        this.currentUiTextDeduper = null;
        if (!this.game.dev.isDisableUi()) {
            this.initUiButton();
            this.initClickEvent();
        }
    }

    _createClass(Upgrade, [{
        key: 'getUpgradeLevel',
        value: function getUpgradeLevel() {
            var useNextLevel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            return useNextLevel ? this.getNextUpgradeLevel() : this.upgradeLevel;
        }
    }, {
        key: 'getNextUpgradeLevel',
        value: function getNextUpgradeLevel() {
            var isSellingUpgrade = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            if (this.isMaxUpgradeLevel() && !isSellingUpgrade) {
                return this.upgradeLevel;
            }
            var nextLevel = this.upgradeLevel + (isSellingUpgrade ? -1 : 1);
            return Math.max(MIN_UPGRADE_LEVEL, nextLevel);
        }
    }, {
        key: 'buyUpgrade',
        value: function buyUpgrade() {
            if (!this.canAffordToBuyUpgrade()) {
                return false;
            }
            var cost = this.getCost();
            var isSellingUpgrade = this.game.experiment.isExperimentEnabled(_ExperimentConstants.ExperimentKey.SELL_MODE);
            this.upgradeLevel = this.getNextUpgradeLevel(isSellingUpgrade);
            if (!isSellingUpgrade) {
                this.game.points.spendPoints(cost);
            }
            this.updateUiProperties();
            this.updateUiDisabled();
            this.updateVisibility();
            return true;
        }
    }, {
        key: 'getUpgradeValue',
        value: function getUpgradeValue() {
            var useNextLevel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            console.error('Upgrade key ' + this.upgradeKey + ' does not have a value.');
            return 0;
        }
        // This does not check upgrade toggle state

    }, {
        key: 'getIsUpgraded',
        value: function getIsUpgraded() {
            return this.isUnlocked() && this.upgradeLevel >= 1;
        }
    }, {
        key: 'canAffordToBuyUpgrade',
        value: function canAffordToBuyUpgrade() {
            return this.game.experiment.isExperimentEnabled(_ExperimentConstants.ExperimentKey.FREE_MODE) || this.game.experiment.isExperimentEnabled(_ExperimentConstants.ExperimentKey.SELL_MODE) || Math.floor(this.getCost()) <= this.game.points.points;
        }
    }, {
        key: 'getTooltipText',
        value: function getTooltipText() {
            return this.tooltipText;
        }
    }, {
        key: 'setUiText',
        value: function setUiText(text) {
            // De-dupe UI text updates
            if (text === this.currentUiTextDeduper) return;
            this.currentUiTextDeduper = text;
            $('#' + this.getButtonTextUiId()).text(text);
        }
    }, {
        key: 'getButtonUiId',
        value: function getButtonUiId() {
            return '' + this.uiId + BUTTON_UI_ID_SUFFIX;
        }
    }, {
        key: 'getButtonTextUiId',
        value: function getButtonTextUiId() {
            return '' + this.uiId + BUTTON_TEXT_UI_ID_SUFFIX;
        }
    }, {
        key: 'getButtonTooltipUiId',
        value: function getButtonTooltipUiId() {
            return '' + this.uiId + TOOLTIP_UI_ID_SUFFIX;
        }
    }, {
        key: 'getNewTextUiId',
        value: function getNewTextUiId() {
            return '' + this.uiId + NEW_TEXT_SUFFIX;
        }
    }, {
        key: 'initUiButton',
        value: function initUiButton() {
            var _this = this;

            // Inject a button text + the span to be used as a tooltip
            // Wrapper div with: <new tag><button><button text><tooltip>
            var newText = '<p id=\'' + this.getNewTextUiId() + '\' class=\'upgradeNewText\'>New!</p>';
            var buttonTextHtml = '<div id=\'' + this.getButtonTextUiId() + '\' class=\'button_label\'></div>';
            var tooltipHtml = '<span id=\'' + this.getButtonTooltipUiId() + '\' class=\'tooltip biomeTooltip\'>' + this.getTooltipText() + '</span>';
            var button = '<button id=\'' + this.getButtonUiId() + '\'>' + buttonTextHtml + tooltipHtml + '</button>';
            $('#' + this.uiId).html('' + newText + button);
            $('#' + this.getButtonUiId()).hover(function () {
                // Start hover
                _this.updateToolTipText();
                _this.setVisibilityOfNewText(false);
                _UserInterface.UserInterface.setIdVisible(_this.getButtonTooltipUiId(), true);
            }, function () {
                // End-hover
                _UserInterface.UserInterface.setIdVisible(_this.getButtonTooltipUiId(), false);
            });
        }
    }, {
        key: 'updateToolTipText',
        value: function updateToolTipText() {
            $('#' + this.getButtonTooltipUiId()).html(this.getTooltipText());
        }
    }, {
        key: 'getStatArrowText',
        value: function getStatArrowText(currLevelVal, nextLevelVal) {
            var unit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

            return '(' + currLevelVal + ' ' + this.arrowTextUnicode + ' ' + nextLevelVal + unit + ')';
        }
    }, {
        key: 'setVisibilityOfNewText',
        value: function setVisibilityOfNewText(setVisible) {
            setVisible = setVisible && this.isUnlocked();
            $('#' + this.getNewTextUiId()).css("visibility", setVisible ? "visible" : "hidden");
        }
    }, {
        key: 'updateVisibility',
        value: function updateVisibility() {
            var hideFromMaxLevel = this.isMaxUpgradeLevel() && !this.game.upgrades.isShowPurchasedUpgradesEnabled();
            var setVisible = this.isUnlocked() && !hideFromMaxLevel || _devUtils.DEBUG_ALL_BUTTONS_VISIBLE;
            $('#' + this.uiId).css("display", setVisible ? "flex" : "none");
        }
    }, {
        key: 'updateUiDisabled',
        value: function updateUiDisabled() {
            // $(`#${this.getButtonUiId()}`).prop("disabled", this.isDisabled());
            if (this.isDisabled()) {
                $('#' + this.getButtonUiId()).addClass("buttonDisabled");
            } else {
                $('#' + this.getButtonUiId()).removeClass("buttonDisabled");
            }
            // ENABLED_BUTTON_BACKGROUND_COLOR
        }
    }, {
        key: 'initClickEvent',
        value: function initClickEvent() {
            var _this2 = this;

            $('#' + this.uiId + BUTTON_UI_ID_SUFFIX).unbind("click");
            $('#' + this.uiId + BUTTON_UI_ID_SUFFIX).click(function () {
                return _this2.buyUpgrade();
            });
        }
    }, {
        key: 'isDisabled',
        value: function isDisabled() {
            //TODO: refactor out isSinglePurchase
            return this.isMaxUpgradeLevel() || !this.canAffordToBuyUpgrade();
        }
    }, {
        key: 'updateUiProperties',
        value: function updateUiProperties() {
            throw 'updateUiProperties must be implemented.';
        }
    }, {
        key: 'getCost',
        value: function getCost() {
            throw 'getCost must be implemented.';
        }
    }, {
        key: 'isUnlocked',
        value: function isUnlocked() {
            return this.game.biomes.isUpgradeUnlocked(this.upgradeKey) && this.isAllPrerequisiteUpgradesComplete() || _devUtils.DEBUG_ALL_BUTTONS_VISIBLE || this.game.upgrades.isUnlockAllUpgradesEnabled() && this.isAllPrerequisiteUpgradesComplete();
        }
    }, {
        key: 'prettyPrint',
        value: function prettyPrint(val) {
            return _UserInterface.UserInterface.getPrettyPrintNumber(val);
        }
    }, {
        key: 'getPrettyPrintCost',
        value: function getPrettyPrintCost() {
            return this.prettyPrint(this.getCost());
        }
    }, {
        key: 'isMaxUpgradeLevel',
        value: function isMaxUpgradeLevel() {
            // Check for min or max level based on buy/sell mode
            if (this.game.experiment.isExperimentEnabled(_ExperimentConstants.ExperimentKey.SELL_MODE)) {
                return this.upgradeLevel === MIN_UPGRADE_LEVEL;
            }
            if (this.getMaxUpgradeLevel() != null) {
                return this.upgradeLevel >= this.getMaxUpgradeLevel();
            } else {
                return this.isSinglePurchase && this.upgradeLevel >= 1;
            }
        }
    }, {
        key: 'isAllPrerequisiteUpgradesComplete',
        value: function isAllPrerequisiteUpgradesComplete() {
            var _this3 = this;

            var prereqUpgradeKeys = this.getPreReqUpgradeKeys();
            return prereqUpgradeKeys.every(function (key) {
                return _this3.game.upgrades.isUpgraded(key, false);
            });
        }
    }, {
        key: 'getPreReqUpgradeKeys',
        value: function getPreReqUpgradeKeys() {
            return [];
        }
    }, {
        key: 'getMaxUpgradeLevel',
        value: function getMaxUpgradeLevel() {
            return null;
        }
    }]);

    return Upgrade;
}();

exports.default = Upgrade;

},{"../constants/ExperimentConstants":8,"../dev/devUtils":15,"../managers/UserInterface":46}],72:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AutoExitMazeUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyBotAutoExitMaze';
var TOOLTIP_TEXT = 'When a bot is within X non-walled tiles of the maze exit, it will automatically navigate to the exit.';

var AutoExitMazeUpgrade = exports.AutoExitMazeUpgrade = function (_Upgrade) {
    _inherits(AutoExitMazeUpgrade, _Upgrade);

    function AutoExitMazeUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, AutoExitMazeUpgrade);

        return _possibleConstructorReturn(this, (AutoExitMazeUpgrade.__proto__ || Object.getPrototypeOf(AutoExitMazeUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.BOT, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel));
    }

    _createClass(AutoExitMazeUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            this.setUiText("Auto Exit Maze Distance " + this.getStatArrowText(this.upgradeLevel, this.getNextUpgradeLevel(), " tiles") + ": " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.AUTO_EXIT_MAZE_UPGRADE_BASE_COST * Math.pow(_UpgradeConstants.AUTO_EXIT_MAZE_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
        }
    }]);

    return AutoExitMazeUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":13,"../../Upgrade":71}],73:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AvoidRevisitLastPositionUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyBotAvoidRevisitLastPosition';
var TOOLTIP_TEXT = 'Bots will avoid revisiting the position that they were just at.';

var AvoidRevisitLastPositionUpgrade = exports.AvoidRevisitLastPositionUpgrade = function (_Upgrade) {
    _inherits(AvoidRevisitLastPositionUpgrade, _Upgrade);

    function AvoidRevisitLastPositionUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, AvoidRevisitLastPositionUpgrade);

        return _possibleConstructorReturn(this, (AvoidRevisitLastPositionUpgrade.__proto__ || Object.getPrototypeOf(AvoidRevisitLastPositionUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.BOT, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel, true));
    }

    _createClass(AvoidRevisitLastPositionUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            this.setUiText("Basic Avoid Revisit: " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.AVOID_REVISIT_LAST_POSITION_UPGRADE_COST;
        }
    }]);

    return AvoidRevisitLastPositionUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":13,"../../Upgrade":71}],74:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BotAutoMoveUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyBotAutoMove';
var TOOLTIP_TEXT = 'Bot will automatically move on its own!';

var BotAutoMoveUpgrade = exports.BotAutoMoveUpgrade = function (_Upgrade) {
    _inherits(BotAutoMoveUpgrade, _Upgrade);

    function BotAutoMoveUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, BotAutoMoveUpgrade);

        return _possibleConstructorReturn(this, (BotAutoMoveUpgrade.__proto__ || Object.getPrototypeOf(BotAutoMoveUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.BOT, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel, true));
    }

    _createClass(BotAutoMoveUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            this.setUiText("Bot Auto Move: " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.BOT_AUTO_MOVE_UPGRADE_COST;
        }
    }]);

    return BotAutoMoveUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":13,"../../Upgrade":71}],75:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BotFrustrationUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyBotFrustrationUpgrade';
var TOOLTIP_TEXT = 'When none of the active bots find an unvisited tile after X tiles, they will move Y speed faster.';

var BotFrustrationUpgrade = exports.BotFrustrationUpgrade = function (_Upgrade) {
    _inherits(BotFrustrationUpgrade, _Upgrade);

    function BotFrustrationUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, BotFrustrationUpgrade);

        return _possibleConstructorReturn(this, (BotFrustrationUpgrade.__proto__ || Object.getPrototypeOf(BotFrustrationUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.BOT, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel));
    }

    _createClass(BotFrustrationUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            var currFrustration = this.getUpgradeLevel() === 0 ? "∞" : this.getUpgradeValue();
            var nextFrustration = this.getUpgradeValue(true);
            this.setUiText("Bot Frustration Distance " + this.getStatArrowText(currFrustration, nextFrustration, " tiles") + ": " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.BOT_FRUSTRATION_TILE_COUNT_UPGRADE_BASE_COST * Math.pow(_UpgradeConstants.BOT_FRUSTRATION_TILE_COUNT_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
        }
        // Get the total distance required for the bots to become frustrated

    }, {
        key: "getUpgradeValue",
        value: function getUpgradeValue() {
            var useNextLevel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            return _UpgradeConstants.BOT_FRUSTRATION_TILE_COUNT_UPGRADE_BASE_AMOUNT - _UpgradeConstants.BOT_FRUSTRATION_TILE_COUNT_UPGRADE_DECREASE_INCREMENT * (this.getUpgradeLevel(useNextLevel) - 1);
        }
    }, {
        key: "getMaxUpgradeLevel",
        value: function getMaxUpgradeLevel() {
            // If the tile distance goes down to 1
            return _UpgradeConstants.BOT_FRUSTRATION_TILE_COUNT_UPGRADE_BASE_AMOUNT / _UpgradeConstants.BOT_FRUSTRATION_TILE_COUNT_UPGRADE_DECREASE_INCREMENT;
        }
    }]);

    return BotFrustrationUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":13,"../../Upgrade":71}],76:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BotLuckyGuessUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

var _UserInterface = require("../../../managers/UserInterface");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyBotLuckyGuess';
var TOOLTIP_TEXT = "When bot is faced with a choice of direction, the bot will be lucky in guessing direction by an extra " + _UpgradeConstants.BOT_LUCKY_GUESS_UPGRADE_INCREASE_AMOUNT * 100 + "% (ie. 51%/49% of choosing correct direction at level 1).";

var BotLuckyGuessUpgrade = exports.BotLuckyGuessUpgrade = function (_Upgrade) {
    _inherits(BotLuckyGuessUpgrade, _Upgrade);

    function BotLuckyGuessUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, BotLuckyGuessUpgrade);

        return _possibleConstructorReturn(this, (BotLuckyGuessUpgrade.__proto__ || Object.getPrototypeOf(BotLuckyGuessUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.BOT, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel));
    }

    _createClass(BotLuckyGuessUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            var currPercent = _UserInterface.UserInterface.getPrettyPrintNumber(this.getUpgradeValue() * 100);
            var nextPercent = _UserInterface.UserInterface.getPrettyPrintNumber(this.getUpgradeValue(true) * 100);
            this.setUiText("Bot Lucky Guess " + this.getStatArrowText(currPercent, nextPercent, "%") + ": " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.BOT_LUCKY_GUESS_UPGRADE_BASE_COST * Math.pow(_UpgradeConstants.BOT_LUCKY_GUESS_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
        }
    }, {
        key: "getUpgradeValue",
        value: function getUpgradeValue() {
            var useNextLevel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            return this.getUpgradeLevel(useNextLevel) * _UpgradeConstants.BOT_LUCKY_GUESS_UPGRADE_INCREASE_AMOUNT;
        }
    }]);

    return BotLuckyGuessUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":13,"../../../managers/UserInterface":46,"../../Upgrade":71}],77:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BotMovementSpeedUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

var _UserInterface = require("../../../managers/UserInterface");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyBotMoveFaster';
var TOOLTIP_TEXT = 'Bots will move ever so slightly faster.';

var BotMovementSpeedUpgrade = exports.BotMovementSpeedUpgrade = function (_Upgrade) {
    _inherits(BotMovementSpeedUpgrade, _Upgrade);

    function BotMovementSpeedUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, BotMovementSpeedUpgrade);

        return _possibleConstructorReturn(this, (BotMovementSpeedUpgrade.__proto__ || Object.getPrototypeOf(BotMovementSpeedUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.BOT, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel));
    }

    _createClass(BotMovementSpeedUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            var currLevelInterval = _UserInterface.UserInterface.getPrettyPrintNumber(this.getUpgradeValue());
            var nextLevelInterval = _UserInterface.UserInterface.getPrettyPrintNumber(this.getUpgradeValue(true));
            this.setUiText("Bot Movement Speed " + this.getStatArrowText(currLevelInterval, nextLevelInterval, "ms") + ": " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.BOT_MOVEMENT_UPGRADE_BASE_COST * Math.pow(_UpgradeConstants.BOT_MOVEMENT_UPGRADE_BASE_COST_MUTLIPLIER, this.upgradeLevel);
        }
    }, {
        key: "getPreReqUpgradeKeys",
        value: function getPreReqUpgradeKeys() {
            return [_UpgradeConstants.UpgradeKey.AUTO_MOVE];
        }
    }, {
        key: "getUpgradeValue",
        value: function getUpgradeValue() {
            var useNextLevel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            return this.game.rngBot.getBotMoveInterval(useNextLevel, true);
        }
    }]);

    return BotMovementSpeedUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":13,"../../../managers/UserInterface":46,"../../Upgrade":71}],78:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BotRememberDeadEndTilesUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyBotRememberDeadEnds';
var TOOLTIP_TEXT = 'Bots will automatically mark deadends up to X tiles as another color and will not revisit them.';

var BotRememberDeadEndTilesUpgrade = exports.BotRememberDeadEndTilesUpgrade = function (_Upgrade) {
    _inherits(BotRememberDeadEndTilesUpgrade, _Upgrade);

    function BotRememberDeadEndTilesUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, BotRememberDeadEndTilesUpgrade);

        return _possibleConstructorReturn(this, (BotRememberDeadEndTilesUpgrade.__proto__ || Object.getPrototypeOf(BotRememberDeadEndTilesUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.BOT, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel));
    }

    _createClass(BotRememberDeadEndTilesUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            this.setUiText("Remember Dead Ends " + this.getStatArrowText(this.upgradeLevel, this.getNextUpgradeLevel(), " tiles") + ": " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.BOT_REMEMBER_DEADEND_TILES_UPGRADE_BASE_COST * Math.pow(_UpgradeConstants.BOT_REMEMBER_DEADEND_TILES_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
        }
    }, {
        key: "getUpgradeValue",
        value: function getUpgradeValue() {
            return this.getUpgradeLevel();
        }
    }]);

    return BotRememberDeadEndTilesUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":13,"../../Upgrade":71}],79:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BotRememberLastPathwayUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyBotRememberLastPathwayUpgrade';
var TOOLTIP_TEXT = 'When bot is at a decision point, he will remember what pathway was not visited last time and prioritize it next time at the decision point. Only one decision point can be remembered.' + 'This helps avoid getting stuck in back and forth deadend loops.';

var BotRememberLastPathwayUpgrade = exports.BotRememberLastPathwayUpgrade = function (_Upgrade) {
    _inherits(BotRememberLastPathwayUpgrade, _Upgrade);

    function BotRememberLastPathwayUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, BotRememberLastPathwayUpgrade);

        return _possibleConstructorReturn(this, (BotRememberLastPathwayUpgrade.__proto__ || Object.getPrototypeOf(BotRememberLastPathwayUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.BOT, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel, true));
    }

    _createClass(BotRememberLastPathwayUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            this.setUiText("Bot Remember Last Pathway: " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.BOT_REMEMBER_LAST_PATHWAY_UPGRADE_BASE_COST;
        }
    }, {
        key: "getPreReqUpgradeKeys",
        value: function getPreReqUpgradeKeys() {
            return [_UpgradeConstants.UpgradeKey.AVOID_REVISIT_LAST_POSITION];
        }
    }]);

    return BotRememberLastPathwayUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":13,"../../Upgrade":71}],80:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BotSmartMergeUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyBotSmartMergeUpgrade';
var TOOLTIP_TEXT = 'When a bot merge occurs, the resulting direction of the bot will be away from deadends.';

var BotSmartMergeUpgrade = exports.BotSmartMergeUpgrade = function (_Upgrade) {
    _inherits(BotSmartMergeUpgrade, _Upgrade);

    function BotSmartMergeUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, BotSmartMergeUpgrade);

        return _possibleConstructorReturn(this, (BotSmartMergeUpgrade.__proto__ || Object.getPrototypeOf(BotSmartMergeUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.BOT, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel, true));
    }

    _createClass(BotSmartMergeUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            this.setUiText("Bot Smart Merge: " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.BOT_SMART_MERGE_UPGRADE_COST;
        }
    }, {
        key: "getPreReqUpgradeKeys",
        value: function getPreReqUpgradeKeys() {
            return [_UpgradeConstants.UpgradeKey.BOT_SPLIT_BOT_AUTO_MERGE];
        }
    }]);

    return BotSmartMergeUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":13,"../../Upgrade":71}],81:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BotSplitAutoMergeUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

var _RNGBotManager = require("../../../managers/RNGBotManager");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buySplitBotAutoMerge';
var TOOLTIP_TEXT = "When bots step on the same tile, they will merge together and re-split at next unvisited tile split." + ("If bots have not found an unvisited tile within " + _RNGBotManager.BOT_MERGE_FRUSTRATION_TILE_DISTANCE + " tiles, they will forcefully split.");

var BotSplitAutoMergeUpgrade = exports.BotSplitAutoMergeUpgrade = function (_Upgrade) {
    _inherits(BotSplitAutoMergeUpgrade, _Upgrade);

    function BotSplitAutoMergeUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, BotSplitAutoMergeUpgrade);

        return _possibleConstructorReturn(this, (BotSplitAutoMergeUpgrade.__proto__ || Object.getPrototypeOf(BotSplitAutoMergeUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.BOT, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel, true));
    }

    _createClass(BotSplitAutoMergeUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            this.setUiText("Bot Split Auto Merge: " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.SPLIT_BOT_AUTO_MERGE_UPGRADE_COST;
        }
    }]);

    return BotSplitAutoMergeUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":13,"../../../managers/RNGBotManager":41,"../../Upgrade":71}],82:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BotSplitDirectionUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyBotSplitDirections';
var TOOLTIP_TEXT = 'Bots will split into two different bots when different pathways are available to it up to X total times.';

var BotSplitDirectionUpgrade = exports.BotSplitDirectionUpgrade = function (_Upgrade) {
    _inherits(BotSplitDirectionUpgrade, _Upgrade);

    function BotSplitDirectionUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, BotSplitDirectionUpgrade);

        return _possibleConstructorReturn(this, (BotSplitDirectionUpgrade.__proto__ || Object.getPrototypeOf(BotSplitDirectionUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.BOT, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel));
    }

    _createClass(BotSplitDirectionUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            this.setUiText("Bot Split Direction " + this.getStatArrowText(this.upgradeLevel, this.getNextUpgradeLevel(), " splits") + ": " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.SPLIT_DIRECTION_UPGRADE_BASE_COST * Math.pow(_UpgradeConstants.SPLIT_DIRECTION_UPGRADE_BASE_MULTIPLIER, this.upgradeLevel);
        }
    }]);

    return BotSplitDirectionUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":13,"../../Upgrade":71}],83:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DestructibleWallPhasingFrequencyUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

var _UserInterface = require("../../../managers/UserInterface");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyDestructibleWallPhasingFrequencyUpgrade';
var TOOLTIP_TEXT = 'Bots can move through destructible walls. This ability increases the frequency by which you gain wall phasing charges.';

var DestructibleWallPhasingFrequencyUpgrade = exports.DestructibleWallPhasingFrequencyUpgrade = function (_Upgrade) {
    _inherits(DestructibleWallPhasingFrequencyUpgrade, _Upgrade);

    function DestructibleWallPhasingFrequencyUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, DestructibleWallPhasingFrequencyUpgrade);

        return _possibleConstructorReturn(this, (DestructibleWallPhasingFrequencyUpgrade.__proto__ || Object.getPrototypeOf(DestructibleWallPhasingFrequencyUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.BOT, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel));
    }

    _createClass(DestructibleWallPhasingFrequencyUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            var currValue = _UserInterface.UserInterface.getPrettyPrintNumber(this.getUpgradeValue() / 1000);
            var nextValue = _UserInterface.UserInterface.getPrettyPrintNumber(this.getUpgradeValue(true) / 1000);
            var statArrowText = this.getStatArrowText(currValue, nextValue, "s");
            this.setUiText("Destructible Wall Phasing Frequency " + statArrowText + ": " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.DESTRUCTIBLE_WALL_PHASING_FREQUENCY_UPGRADE_BASE_COST * Math.pow(_UpgradeConstants.DESTRUCTIBLE_WALL_PHASING_FREQUENCY_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
        }
    }, {
        key: "getUpgradeValue",
        value: function getUpgradeValue() {
            var useNextLevel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var upgradeLevel = this.getUpgradeLevel(useNextLevel);
            return _UpgradeConstants.DESTRUCTIBLE_WALL_PHASING_FREQUENCY_BASE_RATE - _UpgradeConstants.DESTRUCTIBLE_WALL_PHASING_FREQUENCY_UPGRADE_DECREASE_AMOUNT * upgradeLevel;
        }
    }, {
        key: "getPreReqUpgradeKeys",
        value: function getPreReqUpgradeKeys() {
            return [_UpgradeConstants.UpgradeKey.DESTRUCTIBLE_WALL_PHASING_UPGRADE];
        }
    }, {
        key: "getMaxUpgradeLevel",
        value: function getMaxUpgradeLevel() {
            console.log(Math.floor(_UpgradeConstants.DESTRUCTIBLE_WALL_PHASING_FREQUENCY_BASE_RATE / _UpgradeConstants.DESTRUCTIBLE_WALL_PHASING_FREQUENCY_UPGRADE_DECREASE_AMOUNT) - 1);
            return Math.floor(_UpgradeConstants.DESTRUCTIBLE_WALL_PHASING_FREQUENCY_BASE_RATE / _UpgradeConstants.DESTRUCTIBLE_WALL_PHASING_FREQUENCY_UPGRADE_DECREASE_AMOUNT) - 1;
        }
    }]);

    return DestructibleWallPhasingFrequencyUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":13,"../../../managers/UserInterface":46,"../../Upgrade":71}],84:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DestructibleWallPhasingTotalUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyDestructibleWallPhasingTotalUpgrade';
var TOOLTIP_TEXT = 'Bots can move through destructible walls. This ability increases the max storage of wall phasing charges.';

var DestructibleWallPhasingTotalUpgrade = exports.DestructibleWallPhasingTotalUpgrade = function (_Upgrade) {
    _inherits(DestructibleWallPhasingTotalUpgrade, _Upgrade);

    function DestructibleWallPhasingTotalUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, DestructibleWallPhasingTotalUpgrade);

        return _possibleConstructorReturn(this, (DestructibleWallPhasingTotalUpgrade.__proto__ || Object.getPrototypeOf(DestructibleWallPhasingTotalUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.BOT, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel));
    }

    _createClass(DestructibleWallPhasingTotalUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            var statArrowText = this.getStatArrowText(this.getUpgradeValue(), this.getUpgradeValue(true));
            this.setUiText("Destructible Wall Phasing Storage " + statArrowText + ": " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.DESTRUCTIBLE_WALL_PHASING_TOTAL_UPGRADE_BASE_COST * Math.pow(_UpgradeConstants.DESTRUCTIBLE_WALL_PHASING_TOTAL_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
        }
    }, {
        key: "getUpgradeValue",
        value: function getUpgradeValue() {
            var useNextLevel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var upgradeLevel = this.getUpgradeLevel(useNextLevel);
            return _UpgradeConstants.DESTRUCTIBLE_WALL_PHASING_UPGRADE_BASE_STORAGE + _UpgradeConstants.DESTRUCTIBLE_WALL_PHASING_TOTAL_UPGRADE_INCREASE_AMOUNT * upgradeLevel;
        }
    }, {
        key: "getPreReqUpgradeKeys",
        value: function getPreReqUpgradeKeys() {
            return [_UpgradeConstants.UpgradeKey.DESTRUCTIBLE_WALL_PHASING_UPGRADE];
        }
    }]);

    return DestructibleWallPhasingTotalUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":13,"../../Upgrade":71}],85:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DestructibleWallPhasingUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

var _AccumulatorConstants = require("../../../constants/AccumulatorConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyDestructibleWallPhasingUpgrade';
var TOOLTIP_TEXT = 'Increase the frequency by which a bot can phase through destructible walls.';

var DestructibleWallPhasingUpgrade = exports.DestructibleWallPhasingUpgrade = function (_Upgrade) {
    _inherits(DestructibleWallPhasingUpgrade, _Upgrade);

    function DestructibleWallPhasingUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, DestructibleWallPhasingUpgrade);

        return _possibleConstructorReturn(this, (DestructibleWallPhasingUpgrade.__proto__ || Object.getPrototypeOf(DestructibleWallPhasingUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.BOT, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel, true));
    }

    _createClass(DestructibleWallPhasingUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            this.setUiText("Destructible Wall Phasing: " + this.getPrettyPrintCost() + " pts");
            this.game.accumulators.updateAccumulatorKey(_AccumulatorConstants.AccumulatorKey.DESCTRUCTIBLE_WALL_PHASING_KEY);
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.DESTRUCTIBLE_WALL_PHASING_UPGRADE_BASE_COST;
        }
    }, {
        key: "buyUpgrade",
        value: function buyUpgrade() {
            var didBuy = _get(DestructibleWallPhasingUpgrade.prototype.__proto__ || Object.getPrototypeOf(DestructibleWallPhasingUpgrade.prototype), "buyUpgrade", this).call(this);
            if (didBuy) {
                this.game.accumulators.updateUiForAllAccumulators();
            }
            return didBuy;
        }
    }]);

    return DestructibleWallPhasingUpgrade;
}(_Upgrade3.default);

},{"../../../constants/AccumulatorConstants":5,"../../../constants/UpgradeConstants":13,"../../Upgrade":71}],86:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PrioritizeUnvisitedUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyBotPrioritizeUnvisited';
var TOOLTIP_TEXT = 'Bots will always prioritize an unvisited tile before a previously visited one.';

var PrioritizeUnvisitedUpgrade = exports.PrioritizeUnvisitedUpgrade = function (_Upgrade) {
    _inherits(PrioritizeUnvisitedUpgrade, _Upgrade);

    function PrioritizeUnvisitedUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, PrioritizeUnvisitedUpgrade);

        return _possibleConstructorReturn(this, (PrioritizeUnvisitedUpgrade.__proto__ || Object.getPrototypeOf(PrioritizeUnvisitedUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.BOT, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel, true));
    }

    _createClass(PrioritizeUnvisitedUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            this.setUiText("Basic Prioritize Unvisited: " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.PRIORITIZE_UNVISITED_UPGRADE_COST;
        }
    }]);

    return PrioritizeUnvisitedUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":13,"../../Upgrade":71}],87:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BrainSpawnRateUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

var _BrainMazeItem = require("../../../items/definitions/BrainMazeItem");

var _UserInterface = require("../../../managers/UserInterface");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyBrainSpawnRateUpgrade';
var TOOLTIP_TEXT = 'Brains spawn more frequently. Brains auto-path your bots to the exit up to X distance.';

var BrainSpawnRateUpgrade = exports.BrainSpawnRateUpgrade = function (_Upgrade) {
    _inherits(BrainSpawnRateUpgrade, _Upgrade);

    function BrainSpawnRateUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, BrainSpawnRateUpgrade);

        return _possibleConstructorReturn(this, (BrainSpawnRateUpgrade.__proto__ || Object.getPrototypeOf(BrainSpawnRateUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.ITEM, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel));
    }

    _createClass(BrainSpawnRateUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            var currSpawnProbability = _UserInterface.UserInterface.getDecimalPrettyPrintNumber(_BrainMazeItem.BrainMazeItem.getItemSpawnProbability(this.game) * 100, 2);
            var nextSpawnProbability = _UserInterface.UserInterface.getDecimalPrettyPrintNumber(_BrainMazeItem.BrainMazeItem.getItemSpawnProbability(this.game, true) * 100, 2);
            this.setUiText("Brain Item Spawn Rate " + this.getStatArrowText(currSpawnProbability, nextSpawnProbability, "%") + ": " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.BRAIN_SPAWN_RATE_UPGRADE_BASE_COST * Math.pow(_UpgradeConstants.BRAIN_SPAWN_RATE_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
        }
    }]);

    return BrainSpawnRateUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":13,"../../../items/definitions/BrainMazeItem":19,"../../../managers/UserInterface":46,"../../Upgrade":71}],88:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BrainTileDistanceUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

var _BrainMazeItem = require("../../../items/definitions/BrainMazeItem");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyBrainTileDistanceUpgrade';
var TOOLTIP_TEXT = 'Bots with an active brain item will auto path X more tiles.';

var BrainTileDistanceUpgrade = exports.BrainTileDistanceUpgrade = function (_Upgrade) {
    _inherits(BrainTileDistanceUpgrade, _Upgrade);

    function BrainTileDistanceUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, BrainTileDistanceUpgrade);

        return _possibleConstructorReturn(this, (BrainTileDistanceUpgrade.__proto__ || Object.getPrototypeOf(BrainTileDistanceUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.ITEM, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel));
    }

    _createClass(BrainTileDistanceUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            var currTileDistance = _BrainMazeItem.BrainMazeItem.getBrainTileDistanceAmount(this.game);
            var nextTileDistance = _BrainMazeItem.BrainMazeItem.getBrainTileDistanceAmount(this.game, true);
            this.setUiText("Brain Tile Distance " + this.getStatArrowText(currTileDistance, nextTileDistance, " tiles") + ": " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.BRAIN_TILE_DISTANCE_UPGRADE_BASE_COST * Math.pow(_UpgradeConstants.BRAIN_TILE_DISTANCE_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
        }
    }]);

    return BrainTileDistanceUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":13,"../../../items/definitions/BrainMazeItem":19,"../../Upgrade":71}],89:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DeadEndItemSpawnRateUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

var _UserInterface = require("../../../managers/UserInterface");

var _DeadEndMazeItem = require("../../../items/definitions/DeadEndMazeItem");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyDeadEndItemSpawnRateUpgrade';
var TOOLTIP_TEXT = 'Dead end items spawn more frequently. This item marks all dead ends on the map up to your "Remember Dead Ends" upgrade level. Earn the visit points for all the newly marked dead ends!';

var DeadEndItemSpawnRateUpgrade = exports.DeadEndItemSpawnRateUpgrade = function (_Upgrade) {
    _inherits(DeadEndItemSpawnRateUpgrade, _Upgrade);

    function DeadEndItemSpawnRateUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, DeadEndItemSpawnRateUpgrade);

        return _possibleConstructorReturn(this, (DeadEndItemSpawnRateUpgrade.__proto__ || Object.getPrototypeOf(DeadEndItemSpawnRateUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.ITEM, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel));
    }

    _createClass(DeadEndItemSpawnRateUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            var currSpawnProbability = _UserInterface.UserInterface.getDecimalPrettyPrintNumber(_DeadEndMazeItem.DeadEndMazeItem.getItemSpawnProbability(this.game) * 100, 2);
            var nextSpawnProbability = _UserInterface.UserInterface.getDecimalPrettyPrintNumber(_DeadEndMazeItem.DeadEndMazeItem.getItemSpawnProbability(this.game, true) * 100, 2);
            this.setUiText("Dead End Marker Spawn Rate " + this.getStatArrowText(currSpawnProbability, nextSpawnProbability, "%") + ": " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.DEAD_END_ITEM_SPAWN_RATE_UPGRADE_BASE_COST * Math.pow(_UpgradeConstants.DEAD_END_ITEM_SPAWN_RATE_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
        }
    }]);

    return DeadEndItemSpawnRateUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":13,"../../../items/definitions/DeadEndMazeItem":20,"../../../managers/UserInterface":46,"../../Upgrade":71}],90:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FruitPickupPointsMultiplierUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

var _FruitMazeItem = require("../../../items/definitions/FruitMazeItem");

var _UserInterface = require("../../../managers/UserInterface");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyFruitPickupPointsUpgrade';
var TOOLTIP_TEXT = 'Fruits pickups are worth more points!';

var FruitPickupPointsMultiplierUpgrade = exports.FruitPickupPointsMultiplierUpgrade = function (_Upgrade) {
    _inherits(FruitPickupPointsMultiplierUpgrade, _Upgrade);

    function FruitPickupPointsMultiplierUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, FruitPickupPointsMultiplierUpgrade);

        return _possibleConstructorReturn(this, (FruitPickupPointsMultiplierUpgrade.__proto__ || Object.getPrototypeOf(FruitPickupPointsMultiplierUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.ITEM, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel));
    }

    _createClass(FruitPickupPointsMultiplierUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            var currPts = _UserInterface.UserInterface.getPrettyPrintNumber(_FruitMazeItem.FruitMazeItem.getFruitPickupPointsAmount(this.game));
            var nextPts = _UserInterface.UserInterface.getPrettyPrintNumber(_FruitMazeItem.FruitMazeItem.getFruitPickupPointsAmount(this.game, true));
            this.setUiText("Fruit Pickup Points " + this.getStatArrowText(currPts, nextPts, " pts") + ": " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.FRUIT_PICKUP_POINTS_UPGRADE_BASE_COST * Math.pow(_UpgradeConstants.FRUIT_PICKUP_POINTS_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
        }
    }]);

    return FruitPickupPointsMultiplierUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":13,"../../../items/definitions/FruitMazeItem":21,"../../../managers/UserInterface":46,"../../Upgrade":71}],91:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FruitSpawnRateUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

var _FruitMazeItem = require("../../../items/definitions/FruitMazeItem");

var _UserInterface = require("../../../managers/UserInterface");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyFruitSpawnRateUpgrade';
var TOOLTIP_TEXT = 'Fruits spawn more frequently.';

var FruitSpawnRateUpgrade = exports.FruitSpawnRateUpgrade = function (_Upgrade) {
    _inherits(FruitSpawnRateUpgrade, _Upgrade);

    function FruitSpawnRateUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, FruitSpawnRateUpgrade);

        return _possibleConstructorReturn(this, (FruitSpawnRateUpgrade.__proto__ || Object.getPrototypeOf(FruitSpawnRateUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.ITEM, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel));
    }

    _createClass(FruitSpawnRateUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            var currSpawnProbability = _UserInterface.UserInterface.getDecimalPrettyPrintNumber(_FruitMazeItem.FruitMazeItem.getItemSpawnProbability(this.game) * 100, 2);
            var nextSpawnProbability = _UserInterface.UserInterface.getDecimalPrettyPrintNumber(_FruitMazeItem.FruitMazeItem.getItemSpawnProbability(this.game, true) * 100, 2);
            this.setUiText("Fruit Spawn Rate " + this.getStatArrowText(currSpawnProbability, nextSpawnProbability, "%") + ": " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.FRUIT_SPAWN_UPGRADE_BASE_COST * Math.pow(_UpgradeConstants.FRUIT_SPAWN_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
        }
    }]);

    return FruitSpawnRateUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":13,"../../../items/definitions/FruitMazeItem":21,"../../../managers/UserInterface":46,"../../Upgrade":71}],92:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SpeedUpDurationUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

var _ItemConstants = require("../../../constants/ItemConstants");

var _UserInterface = require("../../../managers/UserInterface");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buySpeedUpDurationUpgrade';
var TOOLTIP_TEXT = 'The speed up item will stay active for a longer duration!  Even more points!';

var SpeedUpDurationUpgrade = exports.SpeedUpDurationUpgrade = function (_Upgrade) {
    _inherits(SpeedUpDurationUpgrade, _Upgrade);

    function SpeedUpDurationUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, SpeedUpDurationUpgrade);

        return _possibleConstructorReturn(this, (SpeedUpDurationUpgrade.__proto__ || Object.getPrototypeOf(SpeedUpDurationUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.ITEM, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel));
    }

    _createClass(SpeedUpDurationUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            var currLevelVal = _UserInterface.UserInterface.getPrettyPrintNumber(this.getUpgradeValue() / 1000);
            var nextLevelVal = _UserInterface.UserInterface.getPrettyPrintNumber(this.getUpgradeValue(true) / 1000);
            this.setUiText("Speed Up Activate Duration " + this.getStatArrowText(currLevelVal, nextLevelVal, "s") + ": " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.SPEED_UP_MAZE_ITEM_DURATION_UPGRADE_BASE_COST * Math.pow(_UpgradeConstants.SPEED_UP_MAZE_ITEM_DURATION_UPGRADE_BASE_COST_MULTIPLIER, this.getUpgradeLevel());
        }
    }, {
        key: "getUpgradeValue",
        value: function getUpgradeValue() {
            var useNextLevel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var upgradeLevel = this.getUpgradeLevel(useNextLevel);
            return _ItemConstants.SPEED_UP_MAZE_ITEM_BASE_DURATION + upgradeLevel * _ItemConstants.SPEED_UP_MAZE_ITEM_BASE_DURATION_INCREASE;
        }
    }]);

    return SpeedUpDurationUpgrade;
}(_Upgrade3.default);

},{"../../../constants/ItemConstants":9,"../../../constants/UpgradeConstants":13,"../../../managers/UserInterface":46,"../../Upgrade":71}],93:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SpeedUpMultiplierStrengthUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

var _ItemConstants = require("../../../constants/ItemConstants");

var _UserInterface = require("../../../managers/UserInterface");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buySpeedUpMultiplierStrengthUpgrade';
var TOOLTIP_TEXT = 'The speed up item is more powerful so bots move even faster!  More points!';

var SpeedUpMultiplierStrengthUpgrade = exports.SpeedUpMultiplierStrengthUpgrade = function (_Upgrade) {
    _inherits(SpeedUpMultiplierStrengthUpgrade, _Upgrade);

    function SpeedUpMultiplierStrengthUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, SpeedUpMultiplierStrengthUpgrade);

        return _possibleConstructorReturn(this, (SpeedUpMultiplierStrengthUpgrade.__proto__ || Object.getPrototypeOf(SpeedUpMultiplierStrengthUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.ITEM, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel));
    }

    _createClass(SpeedUpMultiplierStrengthUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            var currLevelVal = _UserInterface.UserInterface.getDecimalPrettyPrintNumber(this.getUpgradeValue(), 1);
            var nextLevelVal = _UserInterface.UserInterface.getDecimalPrettyPrintNumber(this.getUpgradeValue(true), 1);
            this.setUiText("Speed Up Multiplier Strength " + this.getStatArrowText(currLevelVal, nextLevelVal, "x") + ": " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.SPEED_UP_MULTIPLIER_STRENGTH_UPGRADE_BASE_COST * Math.pow(_UpgradeConstants.SPEED_UP_MULTIPLIER_STRENGTH_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
        }
    }, {
        key: "getUpgradeValue",
        value: function getUpgradeValue() {
            var useNextLevel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var upgradeLevel = this.getUpgradeLevel(useNextLevel);
            return _ItemConstants.SPEED_UP_MAZE_ITEM_BASE_STRENGTH + upgradeLevel * _ItemConstants.SPEED_UP_MAZE_ITEM_BASE_STRENGTH_INCREASE;
        }
    }]);

    return SpeedUpMultiplierStrengthUpgrade;
}(_Upgrade3.default);

},{"../../../constants/ItemConstants":9,"../../../constants/UpgradeConstants":13,"../../../managers/UserInterface":46,"../../Upgrade":71}],94:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SpeedUpSpawnRateUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

var _SpeedUpMazeItem = require("../../../items/definitions/SpeedUpMazeItem");

var _UserInterface = require("../../../managers/UserInterface");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buySpeedUpSpawnRateUpgrade';
var TOOLTIP_TEXT = 'The speed up item will spawn more frequently. Each tile has this % of spawning a speed up item.';

var SpeedUpSpawnRateUpgrade = exports.SpeedUpSpawnRateUpgrade = function (_Upgrade) {
    _inherits(SpeedUpSpawnRateUpgrade, _Upgrade);

    function SpeedUpSpawnRateUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, SpeedUpSpawnRateUpgrade);

        return _possibleConstructorReturn(this, (SpeedUpSpawnRateUpgrade.__proto__ || Object.getPrototypeOf(SpeedUpSpawnRateUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.ITEM, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel));
    }

    _createClass(SpeedUpSpawnRateUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            var currLevelVal = _UserInterface.UserInterface.getDecimalPrettyPrintNumber(this.getUpgradeValue() * 100, 2);
            var nextLevelVal = _UserInterface.UserInterface.getDecimalPrettyPrintNumber(this.getUpgradeValue(true) * 100, 2);
            this.setUiText("Speed Up Spawn Rate " + this.getStatArrowText(currLevelVal, nextLevelVal, "%") + ": " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.SPEED_UP_SPAWN_RATE_UPGRADE_BASE_COST * Math.pow(_UpgradeConstants.SPEED_UP_SPAWN_RATE_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
        }
    }, {
        key: "getUpgradeValue",
        value: function getUpgradeValue() {
            var useNextLevel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            return _SpeedUpMazeItem.SpeedUpMazeItem.getItemSpawnProbability(this.game, useNextLevel);
        }
    }]);

    return SpeedUpSpawnRateUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":13,"../../../items/definitions/SpeedUpMazeItem":24,"../../../managers/UserInterface":46,"../../Upgrade":71}],95:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SpeedUpStackingUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buySpeedUpStackingUpgrade';
var TOOLTIP_TEXT = 'Speed up items will additively stack durations beyond its base duration if the item is already active.';

var SpeedUpStackingUpgrade = exports.SpeedUpStackingUpgrade = function (_Upgrade) {
    _inherits(SpeedUpStackingUpgrade, _Upgrade);

    function SpeedUpStackingUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, SpeedUpStackingUpgrade);

        return _possibleConstructorReturn(this, (SpeedUpStackingUpgrade.__proto__ || Object.getPrototypeOf(SpeedUpStackingUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.ITEM, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel, true));
    }

    _createClass(SpeedUpStackingUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            this.setUiText("Speed Up Additive Stacking: " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.SPEED_UP_STACKING_UPGRADE_BASE_COST;
        }
    }]);

    return SpeedUpStackingUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":13,"../../Upgrade":71}],96:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TileMultiplierDurationUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

var _ItemConstants = require("../../../constants/ItemConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyTileMultiplierDurationUpgrade';
var TOOLTIP_TEXT = 'Tile multiplier item will increase in strength.';

var TileMultiplierDurationUpgrade = exports.TileMultiplierDurationUpgrade = function (_Upgrade) {
    _inherits(TileMultiplierDurationUpgrade, _Upgrade);

    function TileMultiplierDurationUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, TileMultiplierDurationUpgrade);

        return _possibleConstructorReturn(this, (TileMultiplierDurationUpgrade.__proto__ || Object.getPrototypeOf(TileMultiplierDurationUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.ITEM, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel));
    }

    _createClass(TileMultiplierDurationUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            var currLevelVal = this.getUpgradeValue() / 1000;
            var nextLevelVal = this.getUpgradeValue(true) / 1000;
            this.setUiText("Tile Multiplier Activate Duration " + this.getStatArrowText(currLevelVal, nextLevelVal, "s") + ": " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.TILE_MULTIPLIER_MAZE_ITEM_DURATION_BASE_COST * Math.pow(_UpgradeConstants.TILE_MULTIPLIER_MAZE_ITEM_DURATION_COST_MULTIPLIER, this.upgradeLevel);
        }
    }, {
        key: "getUpgradeValue",
        value: function getUpgradeValue() {
            var useNextLevel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var upgradeLevel = this.getUpgradeLevel(useNextLevel);
            return _ItemConstants.TILE_MULTIPLIER_MAZE_ITEM_BASE_DURATION + upgradeLevel * _ItemConstants.TILE_MULTIPLIER_MAZE_ITEM_BASE_DURATION_INCREASE;
        }
    }]);

    return TileMultiplierDurationUpgrade;
}(_Upgrade3.default);

},{"../../../constants/ItemConstants":9,"../../../constants/UpgradeConstants":13,"../../Upgrade":71}],97:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TileMultiplierSpawnRateUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

var _TileMultiplierMazeItem = require("../../../items/definitions/TileMultiplierMazeItem");

var _UserInterface = require("../../../managers/UserInterface");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyTileMultiplierSpawnRateUpgrade';
var TOOLTIP_TEXT = 'The tile multiplier item will have increased strength!';

var TileMultiplierSpawnRateUpgrade = exports.TileMultiplierSpawnRateUpgrade = function (_Upgrade) {
    _inherits(TileMultiplierSpawnRateUpgrade, _Upgrade);

    function TileMultiplierSpawnRateUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, TileMultiplierSpawnRateUpgrade);

        return _possibleConstructorReturn(this, (TileMultiplierSpawnRateUpgrade.__proto__ || Object.getPrototypeOf(TileMultiplierSpawnRateUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.ITEM, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel));
    }

    _createClass(TileMultiplierSpawnRateUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            var currLevelVal = _UserInterface.UserInterface.getDecimalPrettyPrintNumber(this.getUpgradeValue() * 100, 2);
            var nextLevelVal = _UserInterface.UserInterface.getDecimalPrettyPrintNumber(this.getUpgradeValue(true) * 100, 2);
            this.setUiText("Tile Multiplier Spawn Rate " + this.getStatArrowText(currLevelVal, nextLevelVal, "%") + ": " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.TILE_MULTIPLIER_MAZE_ITEM_SPAWN_RATE_BASE_COST * Math.pow(_UpgradeConstants.TILE_MULTIPLIER_MAZE_ITEM_SPAWN_RATE_COST_MULTIPLIER, this.upgradeLevel);
        }
    }, {
        key: "getUpgradeValue",
        value: function getUpgradeValue() {
            var useNextLevel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            return _TileMultiplierMazeItem.TileMultiplierMazeItem.getItemSpawnProbability(this.game, useNextLevel);
        }
    }]);

    return TileMultiplierSpawnRateUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":13,"../../../items/definitions/TileMultiplierMazeItem":25,"../../../managers/UserInterface":46,"../../Upgrade":71}],98:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TileMultiplierStackingUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyTileMultiplierStackingUpgrade';
var TOOLTIP_TEXT = 'Tile multiplier items will additively stack durations beyond its base duration if the item is already active.';

var TileMultiplierStackingUpgrade = exports.TileMultiplierStackingUpgrade = function (_Upgrade) {
    _inherits(TileMultiplierStackingUpgrade, _Upgrade);

    function TileMultiplierStackingUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, TileMultiplierStackingUpgrade);

        return _possibleConstructorReturn(this, (TileMultiplierStackingUpgrade.__proto__ || Object.getPrototypeOf(TileMultiplierStackingUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.ITEM, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel, true));
    }

    _createClass(TileMultiplierStackingUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            this.setUiText("Tile Multiplier Additive Stacking: " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.TILE_MULTIPLIER_STACKING_UPGRADE_BASE_COST;
        }
    }]);

    return TileMultiplierStackingUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":13,"../../Upgrade":71}],99:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TileMultiplierStrengthUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

var _ItemConstants = require("../../../constants/ItemConstants");

var _UserInterface = require("../../../managers/UserInterface");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyTileMultiplierStrengthUpgrade';
var TOOLTIP_TEXT = 'Tile multiplier item will have increased multiplier strength.';

var TileMultiplierStrengthUpgrade = exports.TileMultiplierStrengthUpgrade = function (_Upgrade) {
    _inherits(TileMultiplierStrengthUpgrade, _Upgrade);

    function TileMultiplierStrengthUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, TileMultiplierStrengthUpgrade);

        return _possibleConstructorReturn(this, (TileMultiplierStrengthUpgrade.__proto__ || Object.getPrototypeOf(TileMultiplierStrengthUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.ITEM, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel));
    }

    _createClass(TileMultiplierStrengthUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            var currLevelVal = _UserInterface.UserInterface.getDecimalPrettyPrintNumber(this.getUpgradeValue(), 1);
            var nextLevelVal = _UserInterface.UserInterface.getDecimalPrettyPrintNumber(this.getUpgradeValue(true), 1);
            this.setUiText("Tile Multiplier Strength " + this.getStatArrowText(currLevelVal, nextLevelVal, "x") + ": " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.TILE_MULTIPLIER_MAZE_ITEM_STRENGTH_BASE_COST * Math.pow(_UpgradeConstants.TILE_MULTIPLIER_MAZE_ITEM_STRENGTH_BASE_COST_MULTIPLIER, this.upgradeLevel);
        }
    }, {
        key: "getUpgradeValue",
        value: function getUpgradeValue() {
            var useNextLevel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var upgradeLevel = this.getUpgradeLevel(useNextLevel);
            return _ItemConstants.TILE_MULTIPLIER_MAZE_ITEM_BASE_STRENGTH + _ItemConstants.TILE_MULTIPLIER_MAZE_ITEM_BASE_STRENGTH_MULTIPLIER * upgradeLevel;
        }
    }]);

    return TileMultiplierStrengthUpgrade;
}(_Upgrade3.default);

},{"../../../constants/ItemConstants":9,"../../../constants/UpgradeConstants":13,"../../../managers/UserInterface":46,"../../Upgrade":71}],100:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BiomeUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

var _BiomeConstants = require("../../../constants/BiomeConstants");

var _Stats = require("../../../models/Stats");

var _analyticsUtils = require("../../../utils/analyticsUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyBiomeUpgrade';
var TOOLTIP_TEXT = 'This will bring you to a new biome with more difficult mazes, but with better items, upgrades, and increased point rewards!';

var BiomeUpgrade = exports.BiomeUpgrade = function (_Upgrade) {
    _inherits(BiomeUpgrade, _Upgrade);

    function BiomeUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, BiomeUpgrade);

        return _possibleConstructorReturn(this, (BiomeUpgrade.__proto__ || Object.getPrototypeOf(BiomeUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.OTHER, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel));
    }

    _createClass(BiomeUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            this.setUiText("Unlock New Biome " + this.getStatArrowText(this.upgradeLevel, this.getNextUpgradeLevel(), "") + ": " + this.getPrettyPrintCost() + " pts");
            this.updateToolTipText();
        }
    }, {
        key: "getCost",
        value: function getCost() {
            var nextBiomeKey = this.game.biomes.getCurrentBiomeKey();
            return (0, _BiomeConstants.getBiomeUpgradeCost)(nextBiomeKey);
        }
    }, {
        key: "getTooltipText",
        value: function getTooltipText() {
            return TOOLTIP_TEXT + "<br>" + (0, _BiomeConstants.getNextBiomeUnlockText)(this.game);
        }
    }, {
        key: "buyUpgrade",
        value: function buyUpgrade() {
            var currBiomeKey = this.game.biomes.getCurrentBiomeKey();
            var didBuy = _get(BiomeUpgrade.prototype.__proto__ || Object.getPrototypeOf(BiomeUpgrade.prototype), "buyUpgrade", this).call(this);
            if (didBuy) {
                (0, _analyticsUtils.emitBiomeCompletedEvent)(this.game, currBiomeKey);
                this.game.stats.clearStatValue(_Stats.StatsKey.TOTAL_TIME_PLAYED_IN_CURRENT_BIOME_IN_SECONDS);
                this.game.startGame();
            }
            return didBuy;
        }
    }]);

    return BiomeUpgrade;
}(_Upgrade3.default);

},{"../../../constants/BiomeConstants":6,"../../../constants/UpgradeConstants":13,"../../../models/Stats":68,"../../../utils/analyticsUtils":116,"../../Upgrade":71}],101:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ExperimentsPanelUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

var _UserInterface = require("../../../managers/UserInterface");

var _UiIdConstants = require("../../../constants/UiIdConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyExperimentsPanelUpgrade';
var TOOLTIP_TEXT = 'This will unlock the experiments panel that lets you experiment with various game and maze options.  Have fun!';

var ExperimentsPanelUpgrade = exports.ExperimentsPanelUpgrade = function (_Upgrade) {
    _inherits(ExperimentsPanelUpgrade, _Upgrade);

    function ExperimentsPanelUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, ExperimentsPanelUpgrade);

        return _possibleConstructorReturn(this, (ExperimentsPanelUpgrade.__proto__ || Object.getPrototypeOf(ExperimentsPanelUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.OTHER, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel, true));
    }

    _createClass(ExperimentsPanelUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            this.setUiText("Unlock Experiments Panel: " + this.getPrettyPrintCost() + " pts");
            _UserInterface.UserInterface.setIdVisible(_UiIdConstants.EXPERIMENT_ROOT_PANEL, this.getIsUpgraded() || this.game.dev.isDevMode());
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return 1;
        }
    }]);

    return ExperimentsPanelUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UiIdConstants":12,"../../../constants/UpgradeConstants":13,"../../../managers/UserInterface":46,"../../Upgrade":71}],102:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MazeCompletionBonusUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

var _UserInterface = require("../../../managers/UserInterface");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyMazeCompletionBonusUpgrade';
var TOOLTIP_TEXT = 'Each maze completion is worth more points! Larger mazes are worth more points based on your current biome level.';

var MazeCompletionBonusUpgrade = exports.MazeCompletionBonusUpgrade = function (_Upgrade) {
    _inherits(MazeCompletionBonusUpgrade, _Upgrade);

    function MazeCompletionBonusUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, MazeCompletionBonusUpgrade);

        return _possibleConstructorReturn(this, (MazeCompletionBonusUpgrade.__proto__ || Object.getPrototypeOf(MazeCompletionBonusUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.MAZE, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel));
    }

    _createClass(MazeCompletionBonusUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            var currLevelVal = _UserInterface.UserInterface.getPrettyPrintNumber(this.getUpgradeValue());
            var nextLevelVal = _UserInterface.UserInterface.getPrettyPrintNumber(this.getUpgradeValue(true));
            this.setUiText("Maze Completion Bonus " + this.getStatArrowText(currLevelVal, nextLevelVal, " pts") + ": " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.MAZE_COMPLETION_BONUS_UPGRADE_BASE_COST * Math.pow(_UpgradeConstants.MAZE_COMPLETION_BONUS_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
        }
    }, {
        key: "getUpgradeValue",
        value: function getUpgradeValue() {
            var useNextLevel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            if (this.game.maze.getGrid() == null) return 0;
            var reqKeyBonusMultiplier = this.game.mazeRequirements.hasMazeKeysFoundRequirement() ? this.game.mazeRequirements.getTotalKeysRequired() * _UpgradeConstants.MAZE_COMPLETION_BONUS_PER_KEY_MULTIPLIER : 1;
            var reqVisitBonusMultiplier = this.game.mazeRequirements.hasMazeKeysFoundRequirement() ? _UpgradeConstants.MAZE_COMPLETION_BONUS_REVISIT_MULTIPLIER : 1;
            var tileCount = this.game.maze.getGrid().getTileCount();
            var upgradeLevel = this.getUpgradeLevel(useNextLevel) + 1;
            return tileCount * Math.pow(_UpgradeConstants.MAZE_COMPLETION_BONUS_BASE_MULTIPLIER, upgradeLevel) * reqKeyBonusMultiplier * reqVisitBonusMultiplier;
        }
    }]);

    return MazeCompletionBonusUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":13,"../../../managers/UserInterface":46,"../../Upgrade":71}],103:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MazeEntranceSpawnChanceUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

var _UserInterface = require("../../../managers/UserInterface");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyMazeEntranceSpawnChanceUpgrade';
var TOOLTIP_TEXT = 'Increases the probability of there being another entrance to the maze.';
var MAX_UPGRADE_LEVEL = 20;

var MazeEntranceSpawnChanceUpgrade = exports.MazeEntranceSpawnChanceUpgrade = function (_Upgrade) {
    _inherits(MazeEntranceSpawnChanceUpgrade, _Upgrade);

    function MazeEntranceSpawnChanceUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, MazeEntranceSpawnChanceUpgrade);

        return _possibleConstructorReturn(this, (MazeEntranceSpawnChanceUpgrade.__proto__ || Object.getPrototypeOf(MazeEntranceSpawnChanceUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.MAZE, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel));
    }

    _createClass(MazeEntranceSpawnChanceUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            // Maze is assumed to be square when calculating dimensions.
            var currentPercentage = _UserInterface.UserInterface.getPrettyPrintNumber(this.getUpgradeValue() * 100);
            var nextPercentage = _UserInterface.UserInterface.getPrettyPrintNumber(this.getUpgradeValue(true) * 100);
            this.setUiText("Extra Maze Entrance " + this.getStatArrowText(currentPercentage, nextPercentage, " %") + ": " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.MAZE_ENTRANCE_SPAWN_CHANCE_UPGRADE_BASE_COST * Math.pow(_UpgradeConstants.MAZE_ENTRANCE_SPAWN_CHANCE_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
        }
    }, {
        key: "getUpgradeValue",
        value: function getUpgradeValue() {
            var useNextLevel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            // Max amount is 100%
            return _UpgradeConstants.MAZE_ENTRANCE_SPAWN_CHANCE_UPGRADE_INCREASE_PERCENT * this.getUpgradeLevel(useNextLevel);
        }
    }, {
        key: "getPreReqUpgradeKeys",
        value: function getPreReqUpgradeKeys() {
            return [_UpgradeConstants.UpgradeKey.BOT_SPLIT_DIRECTION];
        }
    }, {
        key: "getMaxUpgradeLevel",
        value: function getMaxUpgradeLevel() {
            return MAX_UPGRADE_LEVEL;
        }
    }]);

    return MazeEntranceSpawnChanceUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":13,"../../../managers/UserInterface":46,"../../Upgrade":71}],104:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PointsPerRevisitUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

var _UserInterface = require("../../../managers/UserInterface");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyPointsPerRevisit';
var TOOLTIP_TEXT = 'Get more points when you revisit a tile!';

var PointsPerRevisitUpgrade = exports.PointsPerRevisitUpgrade = function (_Upgrade) {
    _inherits(PointsPerRevisitUpgrade, _Upgrade);

    function PointsPerRevisitUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, PointsPerRevisitUpgrade);

        return _possibleConstructorReturn(this, (PointsPerRevisitUpgrade.__proto__ || Object.getPrototypeOf(PointsPerRevisitUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.MAZE, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel));
    }

    _createClass(PointsPerRevisitUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            var currVal = _UserInterface.UserInterface.getDecimalPrettyPrintNumber(this.getUpgradeValue() * 100, 1);
            var nextVal = _UserInterface.UserInterface.getDecimalPrettyPrintNumber(this.getUpgradeValue() * 100, 1);
            this.setUiText("Points Per Re-Visit " + this.getStatArrowText(this.upgradeLevel, this.getNextUpgradeLevel(), "%") + ": " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.POINTS_PER_REVISIT_UPGRADE_BASE_COST * Math.pow(_UpgradeConstants.POINTS_PER_REVISIT_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
        }
    }, {
        key: "getUpgradeValue",
        value: function getUpgradeValue() {
            var useNextLevel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var upgradeLevel = this.getUpgradeLevel(useNextLevel);
            return _UpgradeConstants.TILE_REVISIT_BASE_MULTIPLIER + upgradeLevel * _UpgradeConstants.TILE_REVISIT_BASE_MULTIPLIER_INCREASE_PERCENT;
        }
    }, {
        key: "getMaxUpgradeLevel",
        value: function getMaxUpgradeLevel() {
            return 20;
        }
    }]);

    return PointsPerRevisitUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":13,"../../../managers/UserInterface":46,"../../Upgrade":71}],105:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PointsPerVisitUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

var _UserInterface = require("../../../managers/UserInterface");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyPointsPerVisit';
var TOOLTIP_TEXT = 'Get more points per tile visit (only the first time)!';

var PointsPerVisitUpgrade = exports.PointsPerVisitUpgrade = function (_Upgrade) {
    _inherits(PointsPerVisitUpgrade, _Upgrade);

    function PointsPerVisitUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, PointsPerVisitUpgrade);

        var _this = _possibleConstructorReturn(this, (PointsPerVisitUpgrade.__proto__ || Object.getPrototypeOf(PointsPerVisitUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.MAZE, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel));

        _this.getPointsPerVisitBaseAmount = function (biomeKey) {
            return _UpgradeConstants.POINTS_PER_VISIT_BASE_AMOUNT + _UpgradeConstants.POINTS_PER_VISIT_BASE_INCREASE_PER_BIOME * biomeKey;
        };
        return _this;
    }

    _createClass(PointsPerVisitUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            var currPointsPerVisit = _UserInterface.UserInterface.getDecimalPrettyPrintNumber(this.game.points.getPointsPerVisit(), 2);
            var nextPointsPerVisit = _UserInterface.UserInterface.getDecimalPrettyPrintNumber(this.game.points.getPointsPerVisit(false, true), 2);
            this.setUiText("Points Per Visit " + this.getStatArrowText(currPointsPerVisit, nextPointsPerVisit, " pts") + ": " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.POINTS_PER_VISIT_UPGRADE_BASE_COST * Math.pow(_UpgradeConstants.POINTS_PER_VISIT_UPGRADE_BASE_COST_MULTIPLIER, this.upgradeLevel);
        }
    }, {
        key: "getUpgradeValue",
        value: function getUpgradeValue() {
            var useNextLevel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var basePointsAmount = this.getPointsPerVisitBaseAmount(this.game.biomes.getCurrentBiomeKey());
            var pointsPerTile = basePointsAmount * Math.pow(_UpgradeConstants.POINTS_PER_VISIT_BASE_AMOUNT_MULTIPLIER, this.getUpgradeLevel(useNextLevel));
            return pointsPerTile;
        }
    }]);

    return PointsPerVisitUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":13,"../../../managers/UserInterface":46,"../../Upgrade":71}],106:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TogglePanelUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyTogglePanelUpgrade';
var TOOLTIP_TEXT = 'Unlocks the Toggle Panel which allows you to enable/disable bot functionality.';

var TogglePanelUpgrade = exports.TogglePanelUpgrade = function (_Upgrade) {
    _inherits(TogglePanelUpgrade, _Upgrade);

    function TogglePanelUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, TogglePanelUpgrade);

        return _possibleConstructorReturn(this, (TogglePanelUpgrade.__proto__ || Object.getPrototypeOf(TogglePanelUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.BOT, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel, true));
    }

    _createClass(TogglePanelUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            this.setUiText("Unlock Toggle Panel: " + this.getPrettyPrintCost() + " pts");
            this.game.toggles.updateTogglePanelVisibility();
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.TOGGLE_PANEL_UPGRADE_BASE_COST;
        }
    }]);

    return TogglePanelUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":13,"../../Upgrade":71}],107:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ClickToMoveSpeedMultiplierUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

var _UserInterface = require("../../../managers/UserInterface");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyClickToMoveSpeedMultiplierUpgrade';
var TOOLTIP_TEXT = 'Click to move speed is your bot movement speed multiplied by this upgrade multiplier.';

var ClickToMoveSpeedMultiplierUpgrade = exports.ClickToMoveSpeedMultiplierUpgrade = function (_Upgrade) {
    _inherits(ClickToMoveSpeedMultiplierUpgrade, _Upgrade);

    function ClickToMoveSpeedMultiplierUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, ClickToMoveSpeedMultiplierUpgrade);

        return _possibleConstructorReturn(this, (ClickToMoveSpeedMultiplierUpgrade.__proto__ || Object.getPrototypeOf(ClickToMoveSpeedMultiplierUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.MOVEMENT, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel));
    }

    _createClass(ClickToMoveSpeedMultiplierUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            var currSpeed = _UserInterface.UserInterface.getPrettyPrintNumber(this.getUpgradeValue());
            var nextSpeed = _UserInterface.UserInterface.getPrettyPrintNumber(this.getUpgradeValue(true));
            this.setUiText("Click to Move Speed " + this.getStatArrowText(currSpeed, nextSpeed, "ms") + ": " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.CLICK_TO_MOVE_SPEED_MULTIPLIER_UPGRADE_BASE_COST + _UpgradeConstants.CLICK_TO_MOVE_SPEED_MULTIPLIER_UPGRADE_BASE_COST_INCREMENT * this.getUpgradeLevel();
        }
    }, {
        key: "getUpgradeValue",
        value: function getUpgradeValue() {
            var useNextLevel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var upgradeLevel = this.getUpgradeLevel(useNextLevel);
            var multiplier = _UpgradeConstants.CLICK_TO_MOVE_SPEED_MULTIPLIER_UPGRADE_BASE_AMOUNT + _UpgradeConstants.CLICK_TO_MOVE_SPEED_MULTIPLIER_UPGRADE_BASE_INCREMENT * upgradeLevel;
            var botMovementSpeed = this.game.rngBot.getBotMoveInterval(useNextLevel, true);
            if (multiplier === 0) return botMovementSpeed;
            return 1 / multiplier * botMovementSpeed;
        }
    }, {
        key: "getPreReqUpgradeKeys",
        value: function getPreReqUpgradeKeys() {
            return [_UpgradeConstants.UpgradeKey.CLICK_TO_MOVE_UPGRADE];
        }
    }, {
        key: "getMaxUpgradeLevel",
        value: function getMaxUpgradeLevel() {
            return 15;
        }
    }]);

    return ClickToMoveSpeedMultiplierUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":13,"../../../managers/UserInterface":46,"../../Upgrade":71}],108:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ClickToMoveTileDistanceUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MAX_UPGRADE_LEVEL = 10;
var BUTTON_UI_ID = 'buyClickToMoveTileDistanceUpgrade';
var TOOLTIP_TEXT = 'Click to move non-walled tile distance increases by X amount. <br><br>NOTE: Does not work with wall phasing (for now).';

var ClickToMoveTileDistanceUpgrade = exports.ClickToMoveTileDistanceUpgrade = function (_Upgrade) {
    _inherits(ClickToMoveTileDistanceUpgrade, _Upgrade);

    function ClickToMoveTileDistanceUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, ClickToMoveTileDistanceUpgrade);

        return _possibleConstructorReturn(this, (ClickToMoveTileDistanceUpgrade.__proto__ || Object.getPrototypeOf(ClickToMoveTileDistanceUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.MOVEMENT, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel));
    }

    _createClass(ClickToMoveTileDistanceUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            var currDistance = this.getUpgradeValue();
            var nextDistance = this.getUpgradeValue(true);
            this.setUiText("Click to Move Tile Distance " + this.getStatArrowText(currDistance, nextDistance, " tiles") + ": " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.CLICK_TO_MOVE_TILE_DISTANCE_UPGRADE_BASE_COST + _UpgradeConstants.CLICK_TO_MOVE_TILE_DISTANCE_UPGRADE_BASE_COST_INCREMENT * this.getUpgradeLevel();
        }
    }, {
        key: "getUpgradeValue",
        value: function getUpgradeValue() {
            var useNextLevel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var upgradeLevel = this.getUpgradeLevel(useNextLevel);
            return _UpgradeConstants.CLICK_TO_MOVE_TILE_DISTANCE_UPGRADE_BASE_TILE_DISTANCE + _UpgradeConstants.CLICK_TO_MOVE_TILE_DISTANCE_UPGRADE_BASE_TILE_DISTANCE_INCREMENT * upgradeLevel;
        }
    }, {
        key: "getPreReqUpgradeKeys",
        value: function getPreReqUpgradeKeys() {
            return [_UpgradeConstants.UpgradeKey.CLICK_TO_MOVE_UPGRADE];
        }
    }, {
        key: "getMaxUpgradeLevel",
        value: function getMaxUpgradeLevel() {
            return MAX_UPGRADE_LEVEL;
        }
    }]);

    return ClickToMoveTileDistanceUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":13,"../../Upgrade":71}],109:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ClickToMoveUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyClickToMoveUpgrade';
var TOOLTIP_TEXT = 'You can click on a maze tile and have your player automatically move up to X non-walled tiles (upgradeable). <br><br>NOTE: Does not work with wall phasing (for now).';

var ClickToMoveUpgrade = exports.ClickToMoveUpgrade = function (_Upgrade) {
    _inherits(ClickToMoveUpgrade, _Upgrade);

    function ClickToMoveUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, ClickToMoveUpgrade);

        return _possibleConstructorReturn(this, (ClickToMoveUpgrade.__proto__ || Object.getPrototypeOf(ClickToMoveUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.MOVEMENT, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel, true));
    }

    _createClass(ClickToMoveUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            this.setUiText("Player Click to Move: " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.CLICK_TO_MOVE_UPGRADE_BASE_COST;
        }
    }, {
        key: "getPreReqUpgradeKeys",
        value: function getPreReqUpgradeKeys() {
            return [_UpgradeConstants.UpgradeKey.PLAYER_MOVE_INDEPENDENTLY];
        }
    }]);

    return ClickToMoveUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":13,"../../Upgrade":71}],110:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PlayerMoveIndependentlyUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyPlayerMoveIndependently';
var TOOLTIP_TEXT = 'Players can have one bot moving at the same time as they manually move.';

var PlayerMoveIndependentlyUpgrade = exports.PlayerMoveIndependentlyUpgrade = function (_Upgrade) {
    _inherits(PlayerMoveIndependentlyUpgrade, _Upgrade);

    function PlayerMoveIndependentlyUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, PlayerMoveIndependentlyUpgrade);

        return _possibleConstructorReturn(this, (PlayerMoveIndependentlyUpgrade.__proto__ || Object.getPrototypeOf(PlayerMoveIndependentlyUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.MOVEMENT, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel, true));
    }

    _createClass(PlayerMoveIndependentlyUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            this.setUiText("Player Can Move Independently: " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.ALLOW_PLAYER_TO_MOVE_INDEPENDENTLY_UPGRADE_COST;
        }
    }]);

    return PlayerMoveIndependentlyUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":13,"../../Upgrade":71}],111:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PlayerWallPhasingFrequencyUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

var _UserInterface = require("../../../managers/UserInterface");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyPlayerWallPhasingFrequencyUpgrade';
var TOOLTIP_TEXT = 'Increase the frequency by which a player can wall phase.';

var PlayerWallPhasingFrequencyUpgrade = exports.PlayerWallPhasingFrequencyUpgrade = function (_Upgrade) {
    _inherits(PlayerWallPhasingFrequencyUpgrade, _Upgrade);

    function PlayerWallPhasingFrequencyUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, PlayerWallPhasingFrequencyUpgrade);

        return _possibleConstructorReturn(this, (PlayerWallPhasingFrequencyUpgrade.__proto__ || Object.getPrototypeOf(PlayerWallPhasingFrequencyUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.MOVEMENT, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel));
    }

    _createClass(PlayerWallPhasingFrequencyUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            var currFreq = _UserInterface.UserInterface.getPrettyPrintNumber(this.getUpgradeValue());
            var nextFreq = _UserInterface.UserInterface.getPrettyPrintNumber(this.getUpgradeValue(true));
            this.setUiText("Wall Phasing Frequency: " + this.getStatArrowText(currFreq, nextFreq, "ms") + " " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.PLAYER_WALL_PHASING_UPGRADE_FREQUENCY_BASE_COST * Math.pow(_UpgradeConstants.PLAYER_WALL_PHASING_UPGRADE_FREQUENCY_COST_MULTIPLIER, this.upgradeLevel);
        }
    }, {
        key: "getUpgradeValue",
        value: function getUpgradeValue() {
            var useNextLevel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var upgradeLevel = this.getUpgradeLevel(useNextLevel);
            return _UpgradeConstants.PLAYER_WALL_PHASING_UPGRADE_FREQUENCY_BASE_TIME_MS * Math.pow(_UpgradeConstants.PLAYER_WALL_PHASING_UPGRADE_FREQUENCY_BASE_TIME_MS_MULTIPLIER, upgradeLevel);
        }
    }, {
        key: "getPreReqUpgradeKeys",
        value: function getPreReqUpgradeKeys() {
            return [_UpgradeConstants.UpgradeKey.PLAYER_WALL_PHASING_UPGRADE];
        }
    }]);

    return PlayerWallPhasingFrequencyUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":13,"../../../managers/UserInterface":46,"../../Upgrade":71}],112:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PlayerWallPhasingTotalUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyPlayerWallPhasingTotal';
var TOOLTIP_TEXT = 'Player can move through walls with manual movement for X total tiles. This ability is accumulated into storage over time.';

var PlayerWallPhasingTotalUpgrade = exports.PlayerWallPhasingTotalUpgrade = function (_Upgrade) {
    _inherits(PlayerWallPhasingTotalUpgrade, _Upgrade);

    function PlayerWallPhasingTotalUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, PlayerWallPhasingTotalUpgrade);

        return _possibleConstructorReturn(this, (PlayerWallPhasingTotalUpgrade.__proto__ || Object.getPrototypeOf(PlayerWallPhasingTotalUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.MOVEMENT, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel));
    }

    _createClass(PlayerWallPhasingTotalUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            var statArrowText = this.getStatArrowText(this.getUpgradeValue(), this.getUpgradeValue(true));
            this.setUiText("Wall Phasing Total Storage " + statArrowText + ": " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.PLAYER_WALL_PHASING_UPGRADE_TOTAL_BASE_COST * Math.pow(_UpgradeConstants.PLAYER_WALL_PHASING_UPGRADE_TOTAL_COST_MULTPLIER, this.upgradeLevel);
        }
    }, {
        key: "getUpgradeValue",
        value: function getUpgradeValue() {
            var useNextLevel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var upgradeLevel = this.getUpgradeLevel(useNextLevel);
            return _UpgradeConstants.PLAYER_WALL_PHASING_UPGRADE_TOTAL_BASE_STORAGE + _UpgradeConstants.PLAYER_WALL_PHASING_UPGRADE_TOTAL_BASE_STORAGE_INCREMENT * upgradeLevel;
        }
    }, {
        key: "getPreReqUpgradeKeys",
        value: function getPreReqUpgradeKeys() {
            return [_UpgradeConstants.UpgradeKey.PLAYER_WALL_PHASING_UPGRADE];
        }
    }]);

    return PlayerWallPhasingTotalUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":13,"../../Upgrade":71}],113:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PlayerWallPhasingUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

var _AccumulatorConstants = require("../../../constants/AccumulatorConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyPlayerWallPhasingUpgrade';
var TOOLTIP_TEXT = 'Player can phase through walls with manual movement for X total tiles. This ability is accumulated over time.';

var PlayerWallPhasingUpgrade = exports.PlayerWallPhasingUpgrade = function (_Upgrade) {
    _inherits(PlayerWallPhasingUpgrade, _Upgrade);

    function PlayerWallPhasingUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, PlayerWallPhasingUpgrade);

        return _possibleConstructorReturn(this, (PlayerWallPhasingUpgrade.__proto__ || Object.getPrototypeOf(PlayerWallPhasingUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.MOVEMENT, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel, true));
    }

    _createClass(PlayerWallPhasingUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            this.setUiText("Player Wall Phasing: " + this.getPrettyPrintCost() + " pts");
            this.game.accumulators.updateAccumulatorKey(_AccumulatorConstants.AccumulatorKey.WALL_PHASING_KEY);
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.PLAYER_WALL_PHASING_UPGRADE_COST;
        }
    }, {
        key: "buyUpgrade",
        value: function buyUpgrade() {
            var didBuy = _get(PlayerWallPhasingUpgrade.prototype.__proto__ || Object.getPrototypeOf(PlayerWallPhasingUpgrade.prototype), "buyUpgrade", this).call(this);
            if (didBuy) {
                this.game.accumulators.updateUiForAllAccumulators();
            }
            return didBuy;
        }
    }]);

    return PlayerWallPhasingUpgrade;
}(_Upgrade3.default);

},{"../../../constants/AccumulatorConstants":5,"../../../constants/UpgradeConstants":13,"../../Upgrade":71}],114:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TeleportBotBackToPlayerUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyBotTeleportToPlayer';
var TOOLTIP_TEXT = "Players can teleport their bot back to the themselves by pressing 'q'.";

var TeleportBotBackToPlayerUpgrade = exports.TeleportBotBackToPlayerUpgrade = function (_Upgrade) {
    _inherits(TeleportBotBackToPlayerUpgrade, _Upgrade);

    function TeleportBotBackToPlayerUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, TeleportBotBackToPlayerUpgrade);

        return _possibleConstructorReturn(this, (TeleportBotBackToPlayerUpgrade.__proto__ || Object.getPrototypeOf(TeleportBotBackToPlayerUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.MOVEMENT, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel, true));
    }

    _createClass(TeleportBotBackToPlayerUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            this.setUiText("Teleport Bot Back to Player: " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.TELEPORT_BOT_BACK_TO_PLAYER_UPGRADE_COST;
        }
    }, {
        key: "getPreReqUpgradeKeys",
        value: function getPreReqUpgradeKeys() {
            return [_UpgradeConstants.UpgradeKey.PLAYER_MOVE_INDEPENDENTLY];
        }
    }]);

    return TeleportBotBackToPlayerUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":13,"../../Upgrade":71}],115:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TeleportPlayerBacktoBotUpgrade = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Upgrade2 = require("../../Upgrade");

var _Upgrade3 = _interopRequireDefault(_Upgrade2);

var _UpgradeConstants = require("../../../constants/UpgradeConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BUTTON_UI_ID = 'buyPlayerTeleportToBot';
var TOOLTIP_TEXT = "Players can teleport their themselves back to the bot by pressing 'e'.";

var TeleportPlayerBacktoBotUpgrade = exports.TeleportPlayerBacktoBotUpgrade = function (_Upgrade) {
    _inherits(TeleportPlayerBacktoBotUpgrade, _Upgrade);

    function TeleportPlayerBacktoBotUpgrade(game, upgradeKey) {
        var upgradeLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        _classCallCheck(this, TeleportPlayerBacktoBotUpgrade);

        return _possibleConstructorReturn(this, (TeleportPlayerBacktoBotUpgrade.__proto__ || Object.getPrototypeOf(TeleportPlayerBacktoBotUpgrade)).call(this, game, _UpgradeConstants.UpgradeType.MOVEMENT, BUTTON_UI_ID, TOOLTIP_TEXT, upgradeKey, upgradeLevel, true));
    }

    _createClass(TeleportPlayerBacktoBotUpgrade, [{
        key: "updateUiProperties",
        value: function updateUiProperties() {
            this.setUiText("Teleport Player Back to Bot: " + this.getPrettyPrintCost() + " pts");
        }
    }, {
        key: "getCost",
        value: function getCost() {
            return _UpgradeConstants.TELEPORT_PLAYER_BACK_TO_BOT_UPGRADE_COST;
        }
    }, {
        key: "getPreReqUpgradeKeys",
        value: function getPreReqUpgradeKeys() {
            return [_UpgradeConstants.UpgradeKey.PLAYER_MOVE_INDEPENDENTLY];
        }
    }]);

    return TeleportPlayerBacktoBotUpgrade;
}(_Upgrade3.default);

},{"../../../constants/UpgradeConstants":13,"../../Upgrade":71}],116:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.emitMazeCompletedEvent = exports.emitBiomeCompletedEvent = exports.AnalyticEventAction = exports.AnalyticEventCategory = undefined;

var _Stats = require("../models/Stats");

var AnalyticEventCategory = exports.AnalyticEventCategory = undefined;
(function (AnalyticEventCategory) {
    AnalyticEventCategory["BIOMES"] = "BIOMES";
})(AnalyticEventCategory || (exports.AnalyticEventCategory = AnalyticEventCategory = {}));
var AnalyticEventAction = exports.AnalyticEventAction = undefined;
(function (AnalyticEventAction) {
    AnalyticEventAction["BIOMES_COMPLETED"] = "BIOMES_COMPLETED";
    AnalyticEventAction["BIOMES_COMPLETED_DURATION"] = "BIOMES_COMPLETED_DURATION";
    AnalyticEventAction["MAZE_COMPLETED"] = "MAZE_COMPLETED";
})(AnalyticEventAction || (exports.AnalyticEventAction = AnalyticEventAction = {}));
// https://developers.google.com/analytics/devguides/collection/analyticsjs/events
// ga('send', 'event', [eventCategory], [eventAction], [eventLabel], [eventValue], [fieldsObject]);
var emitEvent = function emitEvent(eventCategory, eventAction) {
    var eventLabel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var eventValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    try {
        ga('send', {
            hitType: 'event',
            eventCategory: eventCategory,
            eventAction: eventAction,
            eventLabel: eventLabel,
            eventValue: eventValue
        });
    } catch (error) {
        console.debug("Google analytic failure: ", error);
    }
};
var emitBiomeCompletedEvent = exports.emitBiomeCompletedEvent = function emitBiomeCompletedEvent(game, biomeCompleted) {
    emitEvent(AnalyticEventCategory.BIOMES, AnalyticEventAction.BIOMES_COMPLETED, biomeCompleted.toString());
    emitBiomeCompletedDurationEvent(game, biomeCompleted);
};
var emitBiomeCompletedDurationEvent = function emitBiomeCompletedDurationEvent(game, biomeCompleted) {
    var durationInMins = parseInt((game.stats.getStat(_Stats.StatsKey.TOTAL_TIME_PLAYED_IN_CURRENT_BIOME_IN_SECONDS) / 60).toString());
    emitEvent(AnalyticEventCategory.BIOMES, AnalyticEventAction.BIOMES_COMPLETED_DURATION, biomeCompleted.toString(), durationInMins);
};
var emitMazeCompletedEvent = exports.emitMazeCompletedEvent = function emitMazeCompletedEvent(game) {
    var currBiomeKey = game.biomes.getCurrentBiomeKey();
    emitEvent(AnalyticEventCategory.BIOMES, AnalyticEventAction.MAZE_COMPLETED, currBiomeKey.toString());
};

},{"../models/Stats":68}],117:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.triggerPlayerClickToMoveHandler = undefined;

var _UpgradeConstants = require("../constants/UpgradeConstants");

var _MazeUtils = require("../managers/MazeUtils");

var triggerPlayerClickToMoveHandler = exports.triggerPlayerClickToMoveHandler = function triggerPlayerClickToMoveHandler(game, tileKey) {
    if (!game.upgrades.isUpgraded(_UpgradeConstants.UpgradeKey.CLICK_TO_MOVE_UPGRADE)) return;
    var clickTile = (0, _MazeUtils.getTileFromTileKey)(tileKey);
    if (!game.maze.getGrid().isValidTile(clickTile) && !game.maze.getGrid().isMazeExitTile(clickTile)) {
        return;
    }
    var manualPlayer = game.players.getManuallyControlledPlayer();
    if (!manualPlayer) {
        console.error("No manual player for click to move.");
        return;
    }
    if ((0, _MazeUtils.isTileEqual)(manualPlayer.currTile, clickTile)) {
        return;
    }
    var maxClickTileDistance = game.upgrades.getUpgradeValue(_UpgradeConstants.UpgradeKey.CLICK_TO_MOVE_TILE_DISTANCE_UPGRADE);
    var fullPath = [];
    // Run the algorithm with the original tile marked as visited
    // Start from the click point and navigate outward to see if you find the player.
    // TODO: consider adding other players as a start point. However, this requires "best path" instead of "any path".
    var isWithinMaxClickDistance = findTileVectorPathingDFSLoop(clickTile, manualPlayer.currTile, fullPath, new Set(), maxClickTileDistance, game);
    if (isWithinMaxClickDistance && fullPath.length > 0) {
        game.rngBot.enableClickToMoveInterval(fullPath);
    }
};
//TODO: take into account wall phasing based on current amount available.
// This algorithm will determine if there is a valid pathway from the start tile to the target tile.
// The currPath array will store an array of TileVectors in the order they must be processed.
// DFS outward from the currTile until we find targetTile or hit maxTileDistance.
// Return true if found and currPath will have the full list of paths.
var findTileVectorPathingDFSLoop = function findTileVectorPathingDFSLoop(currTile, targetTile, currPath, visitedTileKeys, maxTileDistance, game) {
    if (currPath.length > maxTileDistance) return false;
    if ((0, _MazeUtils.isTileEqual)(currTile, targetTile)) return true;
    // Sets the first tile as visited (no-op for looped calls)
    visitedTileKeys.add((0, _MazeUtils.generateTileKey)(currTile.x, currTile.y));
    // All valid directions we can move from the current tile
    var neighborTileVectors = game.maze.getValidDirectionsByTile(currTile);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = neighborTileVectors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var neighborTileVector = _step.value;

            var nextTile = (0, _MazeUtils.getNewTilePositionByVector)(currTile, neighborTileVector);
            var nextTileKey = (0, _MazeUtils.generateTileKey)(nextTile.x, nextTile.y);
            // Skip visited
            if (visitedTileKeys.has(nextTileKey)) continue;
            // Track this path (in reverse since we start on the target tile)
            visitedTileKeys.add(nextTileKey);
            currPath.unshift((0, _MazeUtils.getInverseTileVector)(neighborTileVector));
            // make call and check success
            if (findTileVectorPathingDFSLoop(nextTile, targetTile, currPath, visitedTileKeys, maxTileDistance, game)) {
                return true;
            }
            // Revert this step
            visitedTileKeys.delete(nextTileKey);
            currPath.shift();
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return false;
};

},{"../constants/UpgradeConstants":13,"../managers/MazeUtils":36}],118:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.markAllDeadEndTiles = undefined;

var _UpgradeConstants = require("../constants/UpgradeConstants");

var _MazeUtils = require("../managers/MazeUtils");

var _Stats = require("../models/Stats");

var markAllDeadEndTiles = exports.markAllDeadEndTiles = function markAllDeadEndTiles(game) {
    if (!game.upgrades.isUpgraded(_UpgradeConstants.UpgradeKey.BOT_REMEMBER_DEADEND_TILES, true)) return;
    // Find all dead ends based on tile path count.
    var deadEndTiles = game.maze.getGrid().getAllCells().filter(function (tile) {
        return tile.getPathCount() === 1;
    });
    var maxDeadEndLength = game.upgrades.getUpgradeLevel(_UpgradeConstants.UpgradeKey.BOT_REMEMBER_DEADEND_TILES);
    var newDeadEndTileCount = 0;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = deadEndTiles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var deadEndTile = _step.value;

            var deadEndLength = 1;
            var currCell = deadEndTile;
            if (currCell.hasMazeItem()) {
                continue;
            }
            while (deadEndLength <= maxDeadEndLength) {
                // Fetch the all the neighbors of the current cell (including dead ends).  Manually filter out internal exit as well.
                // NOTE: this will fetch a null entry because there is no cell in the grid at the exit to fetch, but we need to consider the exit as a non dead end.
                var currTileNeighbors = game.maze.getValidMoveNeighborCells(currCell, false, true, true);
                var nonDeadEndNeighbors = currTileNeighbors.filter(function (cell) {
                    if (!cell) return true;
                    return !cell.isMarkedAsDeadEnd();
                });
                if (nonDeadEndNeighbors.length !== 1) {
                    break;
                }
                // Calculate the dead end value to use based on surrounding tiles.
                // Neighbor value is +1 since it must extend by one for this tile.
                deadEndLength = currTileNeighbors.filter(function (cell) {
                    return !!cell && !(0, _MazeUtils.isTileEqual)(game.maze.getGrid().getInternalExitTile(true), cell.getTile());
                }).map(function (cell) {
                    return cell && cell.getDeadEndCellValue();
                }).reduce(function (max, currVal) {
                    return Math.max(max, currVal + 1 || 0);
                }, deadEndLength);
                // Mark the starting point as a dead end
                if (!currCell.isMarkedAsDeadEnd() && deadEndLength <= maxDeadEndLength && !(0, _MazeUtils.isTileEqual)(game.maze.getGrid().getInternalExitTile(true), currCell.getTile())) {
                    if (currCell.hasMazeItem()) {
                        break;
                    }
                    currCell.setDeadEndCellValue(deadEndLength++);
                    game.maze.getGrid().setVisited(currCell.getTile());
                    game.maze.setTileBackgroundColor(currCell);
                    newDeadEndTileCount++;
                }
                // Set the next iteration to be the "only neighor"
                currCell = nonDeadEndNeighbors[0];
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    game.stats.addStatsToKey(newDeadEndTileCount, _Stats.StatsKey.TOTAL_DEAD_ENDS_MARKED_BY_ITEM_PICK_UP);
    game.points.addVisitPoints(false, null, newDeadEndTileCount);
};

},{"../constants/UpgradeConstants":13,"../managers/MazeUtils":36,"../models/Stats":68}],119:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isPointLimitNextBiomeCost = exports.hasMazeLimit = exports.hasIterationLimit = exports.hasPointLimit = exports.updateSpeedRunDataOnMazeCompletion = exports.resetToBaseBiomeUpgrades = exports.enableSpeedRun = exports.setSpeedRunEnabled = exports.IS_SPEED_RUN_ENABLED = undefined;

var _UpgradeConstants = require("../constants/UpgradeConstants");

var _devUtils = require("../dev/devUtils");

var _Game = require("../managers/Game");

var _UserInterface = require("../managers/UserInterface");

var _Stats = require("../models/Stats");

var _upgradeUtils = require("./upgradeUtils");

var devSpeedRunData;
var IS_SPEED_RUN_ENABLED = exports.IS_SPEED_RUN_ENABLED = false;
var setSpeedRunEnabled = exports.setSpeedRunEnabled = function setSpeedRunEnabled() {
    var setEnabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    exports.IS_SPEED_RUN_ENABLED = IS_SPEED_RUN_ENABLED = setEnabled;
};
var enableSpeedRun = exports.enableSpeedRun = function enableSpeedRun(game) {
    if (!hasMazeLimit() && !hasPointLimit() || !hasIterationLimit() && !hasMazeLimit()) {
        console.error("Invalid speed run combination. No termination possible.");
        return;
    }
    if (hasMazeLimit() && hasPointLimit()) {
        console.error("Invalid speed run combination. Cannot have point and maze limit together.");
        return;
    }
    (0, _devUtils.clearDevResultTable)();
    devSpeedRunData = {
        completionBonus: 0,
        iterationCount: 0,
        fruitPoints: 0,
        mazeCount: 0,
        tileVisitPercent: 0,
        totalPoints: 0,
        totalTilesVisited: 0,
        totalTimeInMs: 0,
        visitPoints: 0
    };
    if (_UserInterface.UserInterface.isCheckBoxChecked(_devUtils.DEV_SHOW_SINGLE_MAZE_DATA_CHECKBOX_UI_ID)) {
        (0, _devUtils.setDevResultHeaderNames)(["#", "Points", "Visited", "Completion", "Fruits", "% Visit", "Time"]);
    }
    game.stats.initTripometerMazeStats();
    game.points.resetPoints();
    if (isPointLimitNextBiomeCost()) {
        resetToBaseBiomeUpgrades(game);
    }
    exports.IS_SPEED_RUN_ENABLED = IS_SPEED_RUN_ENABLED = true;
    game.startGame();
};
var resetToBaseBiomeUpgrades = exports.resetToBaseBiomeUpgrades = function resetToBaseBiomeUpgrades(game) {
    (0, _upgradeUtils.resetUpgradesToBiomeDefault)(game);
    game.upgrades.updateAllUpgradeUi();
};
var speedRunIterationReset = function speedRunIterationReset(devSpeedRunData, game) {
    // Handle maze limit case
    if (hasMazeLimit()) {
        _Game.globalGame.stats.initTripometerMazeStats();
        devSpeedRunData.iterationCount++;
        printAverages(devSpeedRunData, game);
        game.points.resetPoints();
    }
    // Handle points limit cases
    else if (hasPointLimit() && isPointsSpeedRunIterationComplete(devSpeedRunData, game)) {
            // Reset points for points speed run and increment iteration count
            _Game.globalGame.stats.initTripometerMazeStats();
            devSpeedRunData.iterationCount++;
            printAverages(devSpeedRunData, game);
            resetToBaseBiomeUpgrades(game);
            game.points.resetPoints();
        }
    // Terminate speed run if iteration count is complete
    if (shouldTerminateSpeedRun(devSpeedRunData, game)) {
        // For auto purchase, we want to reset state afterward
        if (game.dev.shouldSpeedRunAutoPurchase()) {
            resetToBaseBiomeUpgrades(game);
        }
        exports.IS_SPEED_RUN_ENABLED = IS_SPEED_RUN_ENABLED = false;
    }
    // Start a new game even if speed run complete
    game.startGame();
};
var shouldTerminateSpeedRun = function shouldTerminateSpeedRun(devSpeedRunData, game) {
    // Check iteration count
    var speedRunIterations = _UserInterface.UserInterface.getSelectorSelectedValue(_devUtils.DEV_NUM_SPEED_RUN_ITERATIONS_SELECTOR_UI_ID);
    if (hasIterationLimit() && devSpeedRunData.iterationCount >= parseInt(speedRunIterations)) {
        return true;
    }
    // Check maze completion limit
    var speedRunMazeCount = _UserInterface.UserInterface.getSelectorSelectedValue(_devUtils.DEV_SPEED_RUN_MAX_MAZE_COUNT_SELECTOR_UI_ID);
    if (hasMazeLimit() && devSpeedRunData.mazeCount >= parseInt(speedRunMazeCount)) {
        return true;
    }
    return false;
};
var isPointsSpeedRunIterationComplete = function isPointsSpeedRunIterationComplete(devSpeedRunData, game) {
    if (!hasPointLimit()) return false;
    var nextBiomeCost = game.upgrades.getUpgrade(_UpgradeConstants.UpgradeKey.BIOME).getCost();
    var maxPoints = _UserInterface.UserInterface.getSelectorSelectedValue(_devUtils.DEV_SPEED_RUN_POINTS_LIMIT_SELECTOR_UI_ID);
    // Next biome cost points check
    if (isPointLimitNextBiomeCost() && game.points.points > nextBiomeCost) {
        return true;
    }
    // Total points check
    else if (game.points.points >= parseInt(maxPoints)) {
            return true;
        }
    return false;
};
var updateSpeedRunDataOnMazeCompletion = exports.updateSpeedRunDataOnMazeCompletion = function updateSpeedRunDataOnMazeCompletion(game) {
    var totalRngBotSpeedRunTimeInMs = game.stats.getStat(_Stats.StatsKey.TOTAL_RNG_BOT_SPEED_RUN_TIME, true);
    var totalPoints = game.stats.getStat(_Stats.StatsKey.TOTAL_POINTS_EARNED, true);
    var completionPoints = game.stats.getStat(_Stats.StatsKey.TOTAL_POINTS_EARNED_FROM_MAZE_COMPLETIONS, true);
    var visitPoints = game.stats.getStat(_Stats.StatsKey.TOTAL_POINTS_EARNED_FROM_VISITED_TILES, true);
    var fruitPoints = game.stats.getStat(_Stats.StatsKey.TOTAL_POINTS_EARNED_FROM_FRUITS, true);
    var tileVisitPercent = game.stats.getStat(_Stats.StatsKey.TOTAL_PERCENT_MAZE_VISITED_AVERAGE, true);
    var totalTilesVisited = game.stats.getStat(_Stats.StatsKey.TOTAL_TILES_VISITED);
    devSpeedRunData.mazeCount += 1;
    if (_UserInterface.UserInterface.isCheckBoxChecked(_devUtils.DEV_SHOW_SINGLE_MAZE_DATA_CHECKBOX_UI_ID) && (hasMazeLimit() || hasPointLimit() && isPointsSpeedRunIterationComplete(devSpeedRunData, game))) {
        devSpeedRunData.completionBonus += completionPoints;
        devSpeedRunData.fruitPoints += fruitPoints;
        devSpeedRunData.tileVisitPercent += tileVisitPercent;
        devSpeedRunData.totalPoints += totalPoints;
        devSpeedRunData.totalTimeInMs += totalRngBotSpeedRunTimeInMs;
        devSpeedRunData.visitPoints += visitPoints;
        var html = "<tr>";
        html += "<td>" + (devSpeedRunData.iterationCount + 1) + ":</td>";
        html += "<td>" + _UserInterface.UserInterface.getPrettyPrintNumber(totalPoints) + "</td>";
        html += "<td>" + _UserInterface.UserInterface.getPrettyPrintNumber(visitPoints) + "</td>";
        html += "<td>" + _UserInterface.UserInterface.getPrettyPrintNumber(completionPoints) + "</td>";
        html += "<td>" + _UserInterface.UserInterface.getPrettyPrintNumber(fruitPoints) + "</td>";
        html += "<td>" + _UserInterface.UserInterface.getPrettyPrintNumber(tileVisitPercent * 100) + "%</td>";
        html += "<td>" + _UserInterface.UserInterface.getPrettyPrintTime(totalRngBotSpeedRunTimeInMs / 1000) + "</td>";
        html += "</tr>";
        $("#" + _devUtils.DEV_RESULT_TABLE_UI_ID).append(html);
    }
    speedRunIterationReset(devSpeedRunData, game);
};
var printAverages = function printAverages(devSpeedRunData, game) {
    var totalPoints = devSpeedRunData.totalPoints,
        visitPoints = devSpeedRunData.visitPoints,
        iterationCount = devSpeedRunData.iterationCount,
        completionBonus = devSpeedRunData.completionBonus,
        tileVisitPercent = devSpeedRunData.tileVisitPercent,
        totalTilesVisited = devSpeedRunData.totalTilesVisited,
        totalTimeInMs = devSpeedRunData.totalTimeInMs,
        mazeCount = devSpeedRunData.mazeCount;

    var totalSeconds = totalTimeInMs / 1000;
    $("#" + _devUtils.DEV_SPEED_RUN_AVG_RESULTS).empty();
    $("#" + _devUtils.DEV_SPEED_RUN_AVG_RESULTS).append("Time: " + _UserInterface.UserInterface.getPrettyPrintTime(totalSeconds) + " (Avg: " + _UserInterface.UserInterface.getPrettyPrintTime(totalSeconds / iterationCount) + ")<br>");
    $("#" + _devUtils.DEV_SPEED_RUN_AVG_RESULTS).append("Points: " + getSpeedRunOutputString(totalPoints, totalSeconds) + "<br>");
    $("#" + _devUtils.DEV_SPEED_RUN_AVG_RESULTS).append("Visit Points: " + getSpeedRunOutputString(visitPoints, totalSeconds) + "<br>");
    $("#" + _devUtils.DEV_SPEED_RUN_AVG_RESULTS).append("Completion Bonus: " + getSpeedRunOutputString(completionBonus, totalSeconds) + "<br>");
    $("#" + _devUtils.DEV_SPEED_RUN_AVG_RESULTS).append("Tile Visit Percent: " + (tileVisitPercent * 100 / iterationCount).toFixed(0) + "%  (" + (totalTilesVisited / mazeCount).toFixed(0) + ")<br>");
    $("#" + _devUtils.DEV_SPEED_RUN_AVG_RESULTS).append("Maze Count: " + _UserInterface.UserInterface.getPrettyPrintNumber(mazeCount) + " (Avg: " + _UserInterface.UserInterface.getPrettyPrintNumber(mazeCount / iterationCount) + ")<br>");
};
var hasPointLimit = exports.hasPointLimit = function hasPointLimit() {
    return _UserInterface.UserInterface.getSelectorSelectedValue(_devUtils.DEV_SPEED_RUN_POINTS_LIMIT_SELECTOR_UI_ID) !== _devUtils.DEV_SPEED_RUN_NO_LIMIT_STRING;
};
var hasIterationLimit = exports.hasIterationLimit = function hasIterationLimit() {
    return _UserInterface.UserInterface.getSelectorSelectedValue(_devUtils.DEV_NUM_SPEED_RUN_ITERATIONS_SELECTOR_UI_ID) !== _devUtils.DEV_SPEED_RUN_NO_LIMIT_STRING;
};
var hasMazeLimit = exports.hasMazeLimit = function hasMazeLimit() {
    return _UserInterface.UserInterface.getSelectorSelectedValue(_devUtils.DEV_SPEED_RUN_MAX_MAZE_COUNT_SELECTOR_UI_ID) !== _devUtils.DEV_SPEED_RUN_NO_LIMIT_STRING;
};
var isPointLimitNextBiomeCost = exports.isPointLimitNextBiomeCost = function isPointLimitNextBiomeCost() {
    return _UserInterface.UserInterface.getSelectorSelectedValue(_devUtils.DEV_SPEED_RUN_POINTS_LIMIT_SELECTOR_UI_ID) === _devUtils.DEV_SPEED_RUN_POINT_LIMIT_NEXT_BIOME_COST_STRING;
};
var getSpeedRunOutputString = function getSpeedRunOutputString(value, numSeconds) {
    var val = _UserInterface.UserInterface.getPrettyPrintNumber(value);
    return val + " " + getAverageString(value, numSeconds);
};
var getAverageString = function getAverageString(value, iterations) {
    return "(Avg: " + (value / iterations).toFixed(1) + " pts/s)";
};

},{"../constants/UpgradeConstants":13,"../dev/devUtils":15,"../managers/Game":32,"../managers/UserInterface":46,"../models/Stats":68,"./upgradeUtils":121}],120:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var handlePlayerMoveEvent = exports.handlePlayerMoveEvent = function handlePlayerMoveEvent(game, directionVector) {
    var currPlayerId = game.players.getPlayerOrDefaultBotId();
    game.rngBot.disableClickToMoveInterval();
    game.players.movePlayer(currPlayerId, directionVector, true);
};

},{}],121:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resetUpgradesToBiomeDefault = exports.autoPurchaseBiomeUpgrades = undefined;

var _BiomeConstants = require("../constants/BiomeConstants");

var _UpgradeConstants = require("../constants/UpgradeConstants");

var SPEED_RUN_AUTO_PURCHASE_BIOME_PERCENTAGE_COST = 0.25;
var SPEED_RUN_AUTO_PURCHASE_BIOME_PERCENTAGE_COST_SINGLE_PURCHASE = 1 / 3;
var SPEED_RUN_AUTO_PURCHASE_BIOME_PERCENTAGE_COST_HIGH_PRIORITY = 1 / 3;
var SPEED_RUN_AUTO_PURCHASE_HIGH_PRIORITY_UGPRADES = new Set([_UpgradeConstants.UpgradeKey.BOT_SPLIT_DIRECTION, _UpgradeConstants.UpgradeKey.BOT_REMEMBER_DEADEND_TILES]);
var autoPurchaseBiomeUpgrades = exports.autoPurchaseBiomeUpgrades = function autoPurchaseBiomeUpgrades(game) {
    var maxPrice = game.upgrades.getUpgrade(_UpgradeConstants.UpgradeKey.BIOME).getCost() * SPEED_RUN_AUTO_PURCHASE_BIOME_PERCENTAGE_COST;
    var highPriorityMaxPrice = game.upgrades.getUpgrade(_UpgradeConstants.UpgradeKey.BIOME).getCost() * SPEED_RUN_AUTO_PURCHASE_BIOME_PERCENTAGE_COST_HIGH_PRIORITY;
    var maxSinglePurchasePrice = game.upgrades.getUpgrade(_UpgradeConstants.UpgradeKey.BIOME).getCost() * SPEED_RUN_AUTO_PURCHASE_BIOME_PERCENTAGE_COST_SINGLE_PURCHASE;
    var singlePurchaseUpgradeList = [];
    var normalUpgradeList = [];
    for (var upgradeKey in _UpgradeConstants.UpgradeKey) {
        if (upgradeKey === _UpgradeConstants.UpgradeKey.BIOME) continue;
        var upgrade = game.upgrades.getUpgrade(upgradeKey);
        if (!upgrade.isUnlocked()) continue;
        if (upgrade.isSinglePurchase) {
            singlePurchaseUpgradeList.push(upgrade);
        } else {
            normalUpgradeList.push(upgrade);
        }
    }
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = singlePurchaseUpgradeList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _upgrade = _step.value;

            if (!_upgrade.isMaxUpgradeLevel() && _upgrade.isUnlocked() && _upgrade.canAffordToBuyUpgrade() && _upgrade.getCost() <= maxSinglePurchasePrice) {
                _upgrade.buyUpgrade();
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = normalUpgradeList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _upgrade2 = _step2.value;

            var isHighPriority = SPEED_RUN_AUTO_PURCHASE_HIGH_PRIORITY_UGPRADES.has(_upgrade2.upgradeKey);
            var priceCompare = isHighPriority ? highPriorityMaxPrice : maxPrice;
            if (!_upgrade2.isMaxUpgradeLevel() && _upgrade2.isUnlocked() && _upgrade2.canAffordToBuyUpgrade() && _upgrade2.getCost() <= priceCompare) {
                _upgrade2.buyUpgrade();
            }
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }
};
// Biome default is defined by the max upgrades purchaseable from last biome based on the % biome upgrade cost variable.
var resetUpgradesToBiomeDefault = exports.resetUpgradesToBiomeDefault = function resetUpgradesToBiomeDefault(game) {
    // Use the previous biome to determine what the upgrade tiers should be at.
    var previousBiomeCost = (0, _BiomeConstants.getBiomeUpgradeCost)(game.biomes.getPreviousBiomeKey());
    var maxPrice = previousBiomeCost * SPEED_RUN_AUTO_PURCHASE_BIOME_PERCENTAGE_COST;
    var maxSinglePurchasePrice = previousBiomeCost * SPEED_RUN_AUTO_PURCHASE_BIOME_PERCENTAGE_COST_SINGLE_PURCHASE;
    var upgradeKeyList = game.upgrades.getAllUnlockedUpgrades();
    for (var upgradeKey in _UpgradeConstants.UpgradeKey) {
        if (upgradeKey === _UpgradeConstants.UpgradeKey.BIOME) continue;
        var upgrade = game.upgrades.getUpgrade(upgradeKey);
        upgrade.upgradeLevel = 0;
        // Do not unlock anything from the current biome.
        if (game.biomes.isUpgradeUnlockedInCurrentBiome(upgradeKey)) {
            continue;
        }
        if (!upgrade.isUnlocked()) {
            continue;
        }
        if (upgrade.isSinglePurchase && upgrade.getCost() <= maxSinglePurchasePrice) {
            upgrade.upgradeLevel++;
        }
        // Purchase all the upgrades possible.
        while (!upgrade.isSinglePurchase && !upgrade.isMaxUpgradeLevel() && upgrade.getCost() <= maxPrice) {
            upgrade.upgradeLevel++;
        }
    }
};

},{"../constants/BiomeConstants":6,"../constants/UpgradeConstants":13}],122:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var VERSION_DELIMITER = ".";
var MAJOR_VERSION_INDEX = 0;
var MINOR_VERSION_INDEX = 1;
var PATCH_VERSION_INDEX = 2;
var isNewMinorVersion = exports.isNewMinorVersion = function isNewMinorVersion(oldVersion, newVersion) {
    if (!oldVersion) {
        return true;
    }
    var oldVersionData = oldVersion.split(VERSION_DELIMITER);
    var newVersionData = newVersion.split(VERSION_DELIMITER);
    return oldVersionData[MAJOR_VERSION_INDEX] !== newVersionData[MAJOR_VERSION_INDEX] || oldVersionData[MINOR_VERSION_INDEX] !== newVersionData[MINOR_VERSION_INDEX];
};

},{}]},{},[16]);
