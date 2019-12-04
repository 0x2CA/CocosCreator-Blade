"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var CommandHelper = /** @class */ (function () {
    function CommandHelper() {
    }
    CommandHelper.getCommander = function () {
        return new commander_1.default.Command();
    };
    CommandHelper.getArgv = function (command, name) {
        return command[name] ? command[name] : "";
    };
    return CommandHelper;
}());
exports.default = CommandHelper;
