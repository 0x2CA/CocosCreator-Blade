"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var xlsx_1 = __importDefault(require("xlsx"));
var XLSXHelper = /** @class */ (function () {
    function XLSXHelper() {
    }
    XLSXHelper.getWorkBook = function (name) {
        var workbook = xlsx_1.default.readFile(name);
        return workbook;
    };
    XLSXHelper.getSheetNames = function (workbook) {
        return workbook.SheetNames;
    };
    XLSXHelper.getWorkSheet = function (workbook, name) {
        return workbook.Sheets[name];
    };
    XLSXHelper.sheet2Json = function (worksheet, opts) {
        return xlsx_1.default.utils.sheet_to_json(worksheet, opts);
    };
    return XLSXHelper;
}());
exports.default = XLSXHelper;
