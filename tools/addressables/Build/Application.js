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
            .option('-o, --output <string>', '文件保存目录')
            .parse(argv);
        var options = command.opts();
        if (!fs_1.default.statSync(options.input).isDirectory()) {
            console.error("输入路径不存在", options.input);
            return;
        }
        var data = {};
        Application.ForeachFile(options.input, function (filePath) {
            var extension = path_1.default.extname(filePath);
            if (extension == ".meta" || extension == "") {
                return;
            }
            var fileName = path_1.default.basename(filePath);
            if (fileName == "Addressables.json") {
                return;
            }
            filePath = filePath.split("resources/")[1].replace("\\", "/");
            if (data[fileName] != null) {
                console.warn("重复文件名", fileName);
            }
            data[fileName] = filePath.split(".")[0];
        });
        Application.CheckDir(path_1.default.dirname(options.output));
        fs_1.default.writeFileSync(options.output, JSON.stringify(data), { encoding: "utf8" });
        console.log("导出完成", options.output);
    };
    Application.ForeachFile = function (dirPath, callback) {
        var dirents = fs_1.default.readdirSync(dirPath, { withFileTypes: true });
        for (var direntsIndex = 0; direntsIndex < dirents.length; direntsIndex++) {
            var dirent = dirents[direntsIndex];
            if (dirent.isDirectory()) {
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
    Application.CheckDir = function (dirPath) {
        if (!fs_1.default.existsSync(dirPath) || !fs_1.default.statSync(dirPath).isDirectory()) {
            var parentDir = path_1.default.dirname(dirPath);
            Application.CheckDir(parentDir);
            fs_1.default.mkdirSync(dirPath);
        }
    };
    return Application;
}());
exports.default = Application;
Application.Main(process.argv);
