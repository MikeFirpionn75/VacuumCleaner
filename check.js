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
exports.checkTheInstructions = exports.checkThePositionOfTheVacuumCleaner = exports.checkTheSizeOfTheRoom = exports.checkIfGridIsEmpty = void 0;
var prompts = require('prompts');
var display_1 = require("./display");
var main_1 = require("./main");
function checkIfGridIsEmpty(widthHeight, grid) {
    var emptyOrNot = true;
    for (var i = 0; i < widthHeight[1]; i++) {
        if (grid[i].includes('-')) {
            emptyOrNot = false;
        }
    }
    return emptyOrNot;
}
exports.checkIfGridIsEmpty = checkIfGridIsEmpty;
function checkTheSizeOfTheRoom(condition, grid) {
    return __awaiter(this, void 0, void 0, function () {
        var width, height, sizeRoom, entiers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    width = -1;
                    height = -1;
                    _a.label = 1;
                case 1:
                    if (!!condition.valid) return [3 /*break*/, 3];
                    return [4 /*yield*/, prompts({
                            type: 'text',
                            name: 'value',
                            message: 'Please choose the size of the room to clean : example 10x10\n',
                        })];
                case 2:
                    sizeRoom = _a.sent();
                    entiers = sizeRoom.value.split('x');
                    if (!/^\d+$/.test(entiers[0]) || !/^\d+$/.test(entiers[1])) { // check the input if it not a number
                        console.log("Your input is not correct, look at the example");
                    }
                    else {
                        width = parseInt(entiers[0]);
                        height = parseInt(entiers[1]);
                        if (Number.isNaN(width) || Number.isNaN(height) || entiers.length > 2) {
                            console.log("Your input is not correct, look at the example");
                        }
                        else {
                            condition.valid = true;
                            console.log("The room is initialized to ".concat(width, " x ").concat(height));
                            (0, main_1.initGrid)(width, height);
                            (0, display_1.displayGrid)(grid);
                        }
                    }
                    return [3 /*break*/, 1];
                case 3:
                    condition.valid = false;
                    return [2 /*return*/, [width, height]];
            }
        });
    });
}
exports.checkTheSizeOfTheRoom = checkTheSizeOfTheRoom;
function checkThePositionOfTheVacuumCleaner(condition, widthHeight, vacuumPosition, grid) {
    return __awaiter(this, void 0, void 0, function () {
        var position1, position2, orientation, position, positionInit, arrayOfOrientation, isOrientationInclude;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    position1 = -1;
                    position2 = -1;
                    orientation = '';
                    _a.label = 1;
                case 1:
                    if (!!condition.valid) return [3 /*break*/, 3];
                    return [4 /*yield*/, prompts({
                            type: 'text',
                            name: 'value',
                            message: "Please choose the position and the orientation of the vacuum cleaner : example 0,1,N",
                        })];
                case 2:
                    position = _a.sent();
                    positionInit = position.value.split(',');
                    if (!/^\d+$/.test(positionInit[0]) || !/^\d+$/.test(positionInit[1])) {
                        console.log("Your input is not correct, look at the example");
                    }
                    else {
                        position1 = parseInt(positionInit[0]);
                        position2 = parseInt(positionInit[1]);
                        orientation = positionInit[2];
                        arrayOfOrientation = ['N', 'E', 'W', 'S'];
                        isOrientationInclude = arrayOfOrientation.includes(orientation);
                        if (Number.isNaN(position1) || Number.isNaN(position2) || isOrientationInclude == false || positionInit.length > 3) {
                            console.log('Your input is not correct, look at the example');
                        }
                        else if (position1 >= widthHeight[0] || position2 >= widthHeight[1]) {
                            console.log("The vacuum cleaner is out of the room, please put it inside");
                            console.log("x between 0 and ".concat(widthHeight[0] - 1, " and y between 0 and ").concat(widthHeight[1] - 1, " "));
                        }
                        else {
                            condition.valid = true;
                            (0, display_1.displayVacuumCleaner)(position1, position2, orientation, vacuumPosition, grid);
                        }
                    }
                    return [3 /*break*/, 1];
                case 3:
                    condition.valid = false;
                    return [2 /*return*/];
            }
        });
    });
}
exports.checkThePositionOfTheVacuumCleaner = checkThePositionOfTheVacuumCleaner;
function checkTheInstructions(condition) {
    return __awaiter(this, void 0, void 0, function () {
        var instruction, listOfInstructions, withoutDuplicates, letterA, letterD, letterG;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!condition.valid) return [3 /*break*/, 5];
                    return [4 /*yield*/, prompts({
                            type: 'text',
                            name: 'value',
                            message: "Control the vacuum cleaner: example DAGAADAA",
                        })];
                case 1:
                    instruction = _a.sent();
                    listOfInstructions = instruction.value.split('');
                    withoutDuplicates = listOfInstructions.filter(function (valeur, index, listOfInstructions) { return listOfInstructions.indexOf(valeur) === index; });
                    letterA = withoutDuplicates.indexOf('A');
                    if (letterA == 0 || letterA == 1 || letterA == 2) { // use a array withoutDupliate to know 
                        withoutDuplicates.splice(letterA, 1); // if the input contain only 'D','A','G'
                    }
                    letterD = withoutDuplicates.indexOf('D') // by remove the duplicates and then remove 'D','A','G'
                    ;
                    if (letterD == 0 || letterD == 1 || letterD == 2) { // if the array is empty, the array contained only 'D','A','G'
                        withoutDuplicates.splice(letterD, 1);
                    }
                    letterG = withoutDuplicates.indexOf('G');
                    if (letterG == 0 || letterG == 1 || letterG == 2) {
                        withoutDuplicates.splice(letterG, 1);
                    }
                    if (!(withoutDuplicates.length > 0)) return [3 /*break*/, 2];
                    console.log("\nPlease enter only the letters 'D', 'G' or 'A'\n");
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, main_1.vacuumCleanerControl.apply(void 0, listOfInstructions)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [3 /*break*/, 0];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.checkTheInstructions = checkTheInstructions;
