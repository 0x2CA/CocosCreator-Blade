"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var Application = /** @class */ (function () {
    function Application() {
    }
    Application.Main = function (argv) {
        var command = new commander_1.default.Command();
        command.version('1.0.0')
            .option('-i, --input <string>', '资源文件路径')
            .option('-k, --key <string>', '密码')
            .option('-s, --sign <string>', '标记')
            .parse(argv);
        var options = command.opts();
        if (!fs_1.default.statSync(options.input).isDirectory()) {
            console.error("输入路径不存在", options.input);
            return;
        }
        var extensions = [".png", ".jpg", ".json", ".jsc", ".atlas"];
        var excludeExtensions = new Set();
        var encrySign = Buffer.from(options.sign || "This is a encry file!!", "ascii");
        console.log("标记头", encrySign.toString('hex'), encrySign.length);
        var encryKey = Buffer.from(options.key || "jbNFX&NWAe56Ftqms8H9D23@vFR#cU9K", "ascii");
        console.log("密码", encryKey.toString('hex'), encryKey.length);
        Application.ForeachFile(options.input, function (filePath) {
            var extension = path_1.default.extname(filePath);
            if (extensions.indexOf(extension) == -1) {
                excludeExtensions.add(extension);
                return;
            }
            var fileName = path_1.default.basename(filePath);
            // console.log("处理文件", filePath);
            fs_1.default.readFile(filePath, function (err, data) {
                if (err) {
                    console.error(err);
                    return;
                }
                var isEncry = true;
                for (var index = 0; index < encrySign.length; index++) {
                    if (encrySign[index] != data[index]) {
                        isEncry = false;
                        break;
                    }
                }
                if (isEncry == true) {
                    console.log("已经加过密", fileName);
                    return;
                }
                var result = Buffer.alloc(encrySign.length + data.length);
                for (var index = 0; index < encrySign.length; index++) {
                    result[index] = encrySign[index];
                }
                for (var index = 0; index < data.length; index++) {
                    // 反向数据
                    // result[encrySign.length + index] = data[data.length - 1 - index];
                    result[encrySign.length + index] = data[index];
                    // 密码作异或
                    result[encrySign.length + index] = result[encrySign.length + index] ^ encryKey[index % encryKey.length];
                    // 倒叙密码作偏移
                    var offset = encryKey[encryKey.length - 1 - index % encryKey.length];
                    // 字节最大移动8
                    offset %= 8;
                    offset += 8;
                    offset %= 8;
                    result[encrySign.length + index] = ((result[encrySign.length + index] + (result[encrySign.length + index] << 8)) >> offset) % 256;
                    // 取反
                    result[encrySign.length + index] = ~result[encrySign.length + index];
                }
                fs_1.default.writeFile(filePath, result, function () {
                    console.log("加密文件", fileName);
                });
            });
        });
        console.log("排除文件后缀", JSON.stringify(Array.from(excludeExtensions)));
    };
    Application.ForeachFile = function (dirPath, callback) {
        var dirents = fs_1.default.readdirSync(dirPath, { withFileTypes: true });
        for (var direntsIndex = 0; direntsIndex < dirents.length; direntsIndex++) {
            var dirent = dirents[direntsIndex];
            if (dirent.isDirectory()) {
                if (dirent.name == ".git" || dirent.name == ".svn") {
                    continue;
                }
                var direntPath = dirPath + "/" + dirent.name;
                Application.ForeachFile(direntPath, callback);
            }
            else {
                var filePath = dirPath + "/" + dirent.name;
                if (callback) {
                    callback(filePath);
                }
            }
        }
    };
    return Application;
}());
exports.default = Application;
Application.Main(process.argv);
