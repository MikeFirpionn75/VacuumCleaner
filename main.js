"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vacuumCleanerControl = exports.initGrid = void 0;
var prompts = require('prompts');
var display_1 = require("./display");
var moveByOrientation_1 = require("./moveByOrientation");
var check_1 = require("./check");
var grid = [];
var widthHeight;
var condition = {
    valid: false,
    outOfTheRoom: false
};
var vacuumPosition = {
    vacuumPositionX: 0,
    vacuumPositionY: 0,
    vacuumOrientation: 'N'
};
function initGrid(x, y) {
    for (var i = 0; i < y; i++) { // a two-dimensional array
        var rowGrid = [];
        for (var j = 0; j < x; j++) {
            rowGrid.push('-');
        }
        grid.push(rowGrid);
    }
}
exports.initGrid = initGrid;
function vacuumCleanerControl() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return __awaiter(this, void 0, void 0, function () {
        var i, inputOk, cleanAgain;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    for (i = 0; i < args.length; i++) {
                        (0, moveByOrientation_1.changeOrientation)(vacuumPosition.vacuumOrientation, args[i], vacuumPosition);
                        (0, moveByOrientation_1.move)(vacuumPosition.vacuumOrientation, args[i], vacuumPosition, condition, widthHeight, grid);
                    }
                    if (!condition.outOfTheRoom) return [3 /*break*/, 1];
                    (0, display_1.displayVacuumCleaner)(vacuumPosition.vacuumPositionX, vacuumPosition.vacuumPositionY, vacuumPosition.vacuumOrientation, vacuumPosition, grid);
                    console.log("These instructions will take the vacuum cleaner out of the room, please change your instructions\n");
                    return [3 /*break*/, 5];
                case 1:
                    if (!!condition.outOfTheRoom) return [3 /*break*/, 5];
                    (0, display_1.displayGrid)(grid);
                    console.log("x = ".concat(vacuumPosition.vacuumPositionX, " y = ").concat(vacuumPosition.vacuumPositionY, " orientation = ").concat(vacuumPosition.vacuumOrientation, "\n"));
                    if (!(0, check_1.checkIfGridIsEmpty)(widthHeight, grid)) return [3 /*break*/, 2];
                    condition.valid = true;
                    console.log("The room is clean, bye \n");
                    return [3 /*break*/, 5];
                case 2:
                    inputOk = false;
                    _a.label = 3;
                case 3:
                    if (!!inputOk) return [3 /*break*/, 5];
                    return [4 /*yield*/, prompts({
                            type: 'text',
                            name: 'value',
                            message: "Do you want to keep cleaning ? Y or N\n",
                        })];
                case 4:
                    cleanAgain = _a.sent();
                    if (cleanAgain.value == 'Y' || cleanAgain.value == 'N' || cleanAgain.value == 'y' || cleanAgain.value == 'n') {
                        inputOk = true;
                        if (cleanAgain.value == 'Y' || cleanAgain.value == 'y') {
                            (0, display_1.displayGrid)(grid);
                        }
                        else if (cleanAgain.value == 'N' || cleanAgain.value == 'n') {
                            console.log("Bye, see you next time \n");
                            condition.valid = true;
                        }
                    }
                    return [3 /*break*/, 3];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.vacuumCleanerControl = vacuumCleanerControl;
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, check_1.checkTheSizeOfTheRoom)(condition, grid)];
            case 1:
                widthHeight = _a.sent();
                return [4 /*yield*/, (0, check_1.checkThePositionOfTheVacuumCleaner)(condition, widthHeight, vacuumPosition, grid)];
            case 2:
                _a.sent();
                (0, check_1.checkTheInstructions)(condition);
                return [2 /*return*/];
        }
    });
}); })();
