"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CommandHelper_1 = __importDefault(require("./Helper/CommandHelper"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var XLSXHelper_1 = __importDefault(require("./Helper/XLSXHelper"));
var Application = /** @class */ (function () {
    function Application() {
    }
    Application.Main = function (argv) {
        var command = CommandHelper_1.default.getCommander();
        command.version('1.0.0')
            .option('-i, --input <string>', 'xlsx文件路径')
            .option('-o, --output <string>', '文件保存目录')
            .option('-n, --nconver', '导出的文件存在时，不强行覆盖')
            .option('-d, --definition <string>', '同时导出Typescript定义文件')
            .parse(argv);
        if (fs_1.default.statSync(CommandHelper_1.default.getArgv(command, "input")).isDirectory()) {
            Application.BuildFolder(CommandHelper_1.default.getArgv(command, "input"), CommandHelper_1.default.getArgv(command, "output") || __dirname, CommandHelper_1.default.getArgv(command, "nconver") !== true, CommandHelper_1.default.getArgv(command, "definition"));
        }
        else {
            Application.BuildFile(CommandHelper_1.default.getArgv(command, "input"), CommandHelper_1.default.getArgv(command, "output") || __dirname, CommandHelper_1.default.getArgv(command, "nconver") !== true, "", CommandHelper_1.default.getArgv(command, "definition"));
        }
    };
    /**
     * 文件夹
     * @param inputFolder
     * @param outputFolder
     * @param ignoreCover
     * @param definition
     */
    Application.BuildFolder = function (inputFolder, outputFolder, ignoreCover, definition) {
        if (!fs_1.default.statSync(inputFolder).isDirectory()) {
            console.warn('未指定导出目录');
            return;
        }
        fs_1.default.readdirSync(inputFolder).forEach(function (file, index) {
            if (file.startsWith('~')) {
                return;
            }
            Application.BuildFile(path_1.default.join(inputFolder, file), outputFolder, ignoreCover, path_1.default.basename(file, path_1.default.extname(file)), definition);
        });
    };
    /**
     * 文件
     * @param file
     * @param folder
     * @param ignoreCover
     * @param outputFilePrefix
     * @param definition
     */
    Application.BuildFile = function (file, folder, ignoreCover, outputFilePrefix, definition) {
        var workbook = XLSXHelper_1.default.getWorkBook(file);
        var sheetnames = XLSXHelper_1.default.getSheetNames(workbook);
        /**
        *  声明内容
        */
        var definitionContent = "";
        for (var index = 0; index < sheetnames.length; index++) {
            var name = sheetnames[index];
            // _和$字符开头的表，忽略导出
            if (name.startsWith('_') && name.startsWith('$')) {
                continue;
            }
            // 构建输出文件名称
            var outputName = outputFilePrefix != "" ? outputFilePrefix + "_" + name : "" + name;
            var outputFileName = outputName + '.json';
            console.log("\u6B63\u5728\u5BFC\u51FA" + outputFileName + "\u8868...");
            // 获取表内容
            var worksheet = XLSXHelper_1.default.getWorkSheet(workbook, name);
            var json = XLSXHelper_1.default.sheet2Json(worksheet, { header: 1, defval: false, raw: false });
            // console.log(json)
            var col = void 0, row = void 0;
            var keys = void 0;
            var types = [];
            var data = [];
            var indexkey = void 0;
            var indextype = void 0;
            if (json[0][0] == "index") {
                // 有索引
                indexkey = json[1][0];
                col = 1;
                row = 2;
            }
            else {
                // 无索引
                col = 0;
                row = 2;
            }
            // 获取类型
            for (var c = col; c < json[0].length; c++) {
                var descArr = json[0][c].split('|');
                if (descArr.length >= 2) {
                    types.push(descArr[0]);
                    if (indexkey && json[1][c] == indexkey) {
                        indextype = descArr[0];
                    }
                }
                else {
                    // 无数据格式，默认为string
                    types.push('s');
                    if (indexkey && json[1][c] == indexkey) {
                        indextype = 's';
                    }
                }
            }
            keys = json[1].slice(col, json[1].length);
            for (var r = row; r < json.length; r++) {
                var rowdata = [];
                for (var c = col; c < json[r].length; c++) {
                    var item = Application.formatData(json[r][c], types[c - col]);
                    rowdata.push(item);
                }
                data.push(rowdata);
            }
            var filedata = { index: indexkey, keys: keys, data: data };
            var outputPath = path_1.default.join(folder, outputFileName);
            if (!fs_1.default.existsSync(folder)) {
                fs_1.default.mkdirSync(folder);
            }
            else if (fs_1.default.statSync(folder).isFile()) {
                console.warn("\u4E0E\u5BFC\u51FA\u76EE\u5F55\u540C\u540D\u7684\u6587\u4EF6\uFF08" + folder + "\uFF09\u5DF2\u7ECF\u5B58\u5728\uFF0C\u5FFD\u7565\u5BFC\u51FA\u64CD\u4F5C");
                continue;
            }
            if (fs_1.default.existsSync(outputPath) && !ignoreCover) {
                console.warn("\u540C\u540D\u6587\u4EF6\uFF08" + outputPath + "\uFF09\u5DF2\u7ECF\u5B58\u5728\uFF0C\u5FFD\u7565\u5BFC\u51FA\u64CD\u4F5C");
                continue;
            }
            fs_1.default.writeFileSync(outputPath, JSON.stringify(filedata));
            // 输出声明文件
            if (indexkey) {
                var definitionItem = "";
                for (var index_1 = 0; index_1 < keys.length; index_1++) {
                    var name_1 = keys[index_1];
                    var type = types[index_1];
                    definitionItem += "\t\t\t" + Application.definitionFromFormat(name_1, type) + "\n";
                }
                definitionContent += "\n\tdeclare interface " + outputName + " {\n\t\t[" + Application.definitionFromFormat("key", indextype).slice(0, Application.definitionFromFormat("key", indextype).length - 1) + "]:{\n" + definitionItem + "\t\t}\n\t}";
            }
            else {
                var definitionItem = "";
                for (var index_2 = 0; index_2 < keys.length; index_2++) {
                    var name_2 = keys[index_2];
                    var type = types[index_2];
                    definitionItem += "\t\t" + Application.definitionFromFormat(name_2, type) + "\n";
                }
                definitionContent += "\n\tdeclare interface " + outputName + " extends Array<{\n" + definitionItem + "\t}>{}";
            }
            // console.log(definitionContent)
        }
        // 导出声明文件
        if (definitionContent && definitionContent.length > 0) {
            definitionContent = "declare namespace Configs {" + definitionContent + "\n}";
            var pathInfo = path_1.default.parse(definition);
            var outputPath = void 0, outputDir = void 0;
            if (pathInfo.name == "") {
                // 没有后缀，则为目录路径
                outputDir = definition;
                outputPath = path_1.default.join(definition, 'config.d.ts');
            }
            else {
                outputDir = pathInfo.dir;
                outputPath = definition;
            }
            if (!fs_1.default.existsSync(outputDir)) {
                fs_1.default.mkdirSync(outputDir);
            }
            if (fs_1.default.statSync(outputDir).isFile()) {
                console.warn("\u4E0E\u5BFC\u51FA\u5B9A\u4E49\u76EE\u5F55\u540C\u540D\u7684\u6587\u4EF6\uFF08" + outputPath + "\uFF09\u5DF2\u7ECF\u5B58\u5728\uFF0C\u5FFD\u7565\u5BFC\u51FA\u64CD\u4F5C");
            }
            fs_1.default.writeFileSync(outputPath, definitionContent);
        }
    };
    /**
    * 根据格式类型格式化字符串
    * @param {*} data
     * @param {*} format
    */
    Application.formatData = function (data, format) {
        if (data === void 0) { data = ""; }
        if (format === void 0) { format = ""; }
        var result = null;
        switch (format) {
            case 'i': // 整形
                result = parseInt(data) || 0;
                break;
            case 'f': // 浮点型
                result = parseFloat(data) || 0;
                break;
            case 'b': // 布尔值
                result = data == 'true' || data != '0';
                break;
            case 'j': // json
                console.log('j');
                try {
                    result = JSON.parse(data);
                }
                catch (e) {
                    result = null;
                }
                break;
            case 's': // 字符串
                result = data != null ? "" + data : '';
                result = result.trim();
                break;
            case '[i]': // 数组
            case '[f]':
            case '[s]':
            case '[b]':
                if (data != null && format != null) {
                    result = data.split(';');
                    var matchArray = format.match(/\[([^)]+)\]/);
                    if (matchArray) {
                        var type = matchArray[1];
                        for (var j = 0; j < result.length; ++j) {
                            result[j] = Application.formatData(result[j], type);
                        }
                    }
                }
                else {
                    result = [];
                }
                break;
            default:
                break;
        }
        return result;
    };
    /**
    * 根据格式生成ts变量声明
    * @param {*} variable
    * @param {*} format
    */
    Application.definitionFromFormat = function (variable, format) {
        if (format === void 0) { format = ""; }
        var definition = '';
        switch (format) {
            case 'i': // 整形
            case 'f': // 浮点型
                definition += variable + ": number;";
                break;
            case 'b': // 布尔值
                definition += variable + ": boolean;";
                break;
            case 'j': // json
                definition += variable + ": any;";
                break;
            case 's': // 字符串
            default:
                definition += variable + ": string;";
                break;
            case '[i]': // 数组
            case '[f]':
                definition += variable + ": number[];";
                break;
            case '[s]':
                definition += variable + ": string[];";
                break;
            case '[b]':
                definition += variable + ": boolean[];";
                break;
        }
        return definition;
    };
    return Application;
}());
exports.default = Application;
Application.Main(process.argv);
