"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var xlsx_1 = __importDefault(require("xlsx"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var Application = /** @class */ (function () {
    function Application() {
    }
    Application.Main = function (argv) {
        var command = new commander_1.default.Command();
        command.version('1.0.0')
            .option('-i, --input <string>', 'xlsx文件路径')
            .option('-o, --output <string>', '文件保存目录')
            .option('-n, --nconver', '导出的文件存在时，不强行覆盖')
            .option('-d, --definition <string>', '同时导出Typescript定义文件')
            .parse(argv);
        if (fs_1.default.statSync(command["input"]).isDirectory()) {
            Application.BuildFolder(command["input"], command["output"] || __dirname, command["nconver"] !== true, command["definition"]);
        }
        else {
            Application.BuildFile(command["input"], command["output"] || __dirname, command["nconver"] !== true, "", command["definition"]);
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
        var workbook = xlsx_1.default.readFile(file);
        var sheetnames = workbook.SheetNames;
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
            var worksheet = workbook.Sheets[name];
            var json = xlsx_1.default.utils.sheet_to_json(worksheet, { header: 1, defval: false, raw: false });
            // console.log(json)
            var col = void 0, row = void 0;
            var keys = [];
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
                if (json[0][c] != "" && json[0][c].indexOf('|') != -1) {
                    var descArr = json[0][c].split('|');
                    if (descArr.length == 2) {
                        types.push(descArr[0]);
                        if (indexkey && json[1][c] == indexkey) {
                            indextype = descArr[0];
                        }
                    }
                    else {
                        console.log("不符合声明类型格式", json[0][c]);
                    }
                    // else {
                    //     // 无数据格式，默认为string
                    //     types.push('s');
                    //     if (indexkey && json[1][c] == indexkey) {
                    //         indextype = 's'
                    //     }
                    // }
                }
                else {
                    console.log("中断继续扫描key", json[0][c]);
                    break;
                }
            }
            console.log.apply(console, ["类型列表"].concat(types));
            for (var c = col; c < col + types.length; c++) {
                if (json[1][c] != null && json[1][c] != "") {
                    keys.push(json[1][c]);
                }
            }
            console.log.apply(console, ["key列表"].concat(keys));
            for (var r = row; r < json.length; r++) {
                if (json[r][col] != null && json[r][col] != "") {
                    var rowdata = [];
                    for (var c = col; c < col + keys.length; c++) {
                        var item = Application.formatData(json[r][c], types[c - col]);
                        rowdata.push(item);
                    }
                    data.push(rowdata);
                }
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
                definitionContent += "\n\tdeclare interface " + outputName + " {\n\t\t[" + Application.definitionFromFormat(indexkey, indextype).slice(0, Application.definitionFromFormat(indexkey, indextype).length - 1) + "]:{\n" + definitionItem + "\t\t}\n\t}";
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
                result = data == "" || data == 'TRUE' || data == 'true' || data != '0';
                break;
            case 'j': // json
                try {
                    result = JSON.parse(data);
                }
                catch (e) {
                    result = null;
                }
                break;
            case 's': // 字符串
                result = data != null && data != "" ? "" + data : '';
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
