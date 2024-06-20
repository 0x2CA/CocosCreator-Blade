"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var minigame_png = {
    "formats": [
        {
            "name": "astc_6x6",
            "quality": "medium"
        },
        {
            "name": "png",
            "quality": 80
        },
        // // etc1 separate A
        // {
        //     "name": "etc1",
        //     "quality": "slow"
        // },
        // // pvr separate A 
        // {
        //     "name": "pvrtc_4bits_rgb_a",
        //     "quality": "normal"
        // }
    ]
};
var minigame_jpg = {
    "formats": [
        {
            "name": "astc_6x6",
            "quality": "medium"
        },
        {
            "name": "jpg",
            "quality": 80
        },
        // // etc1
        // {
        //     "name": "etc1_rgb",
        //     "quality": "slow"
        // },
        // // pvr
        // {
        //     "name": "pvrtc_4bits_rgb",
        //     "quality": "normal"
        // }
    ]
};
var web_png = {
    "formats": [
        {
            "name": "webp",
            "quality": 80
        },
        {
            "name": "png",
            "quality": 80
        }
    ]
};
var web_jpg = {
    "formats": [
        {
            "name": "webp",
            "quality": 80
        },
        {
            "name": "jpg",
            "quality": 80
        }
    ]
};
var ios = {
    "formats": [
        {
            "name": "astc_6x6",
            "quality": "medium"
        }
    ]
};
var android = {
    "formats": [
        {
            "name": "astc_6x6",
            "quality": "medium"
        }
    ]
};
var Application = /** @class */ (function () {
    function Application() {
    }
    Application.Main = function (argv) {
        var command = new commander_1.default.Command();
        command.version('1.0.0')
            .option('-i, --input <string>', '资源文件路径')
            .parse(argv);
        var options = command.opts();
        if (!fs_1.default.statSync(options.input).isDirectory()) {
            console.error("输入路径不存在", options.input);
            return;
        }
        Application.ForeachFile(options.input, function (filePath) {
            var extension = path_1.default.extname(filePath);
            if (extension != ".meta") {
                return;
            }
            var fileName = path_1.default.basename(filePath);
            if (fileName.endsWith("pac.meta") || fileName.endsWith("png.meta")) {
                console.log("处理png文件", fileName);
                var json = fs_1.default.readFileSync(filePath, { encoding: "utf8" });
                var data = JSON.parse(json);
                data["platformSettings"] = {
                    "minigame": minigame_png,
                    "web": web_png,
                    "ios": ios,
                    "android": android
                };
                fs_1.default.writeFileSync(filePath, JSON.stringify(data), { encoding: "utf8" });
            }
            else if (fileName.endsWith("jpg.meta")) {
                console.log("处理jpg文件", fileName);
                var json = fs_1.default.readFileSync(filePath, { encoding: "utf8" });
                var data = JSON.parse(json);
                data["platformSettings"] = {
                    "minigame": minigame_jpg,
                    "web": web_jpg,
                    "ios": ios,
                    "android": android
                };
                fs_1.default.writeFileSync(filePath, JSON.stringify(data), { encoding: "utf8" });
            }
        });
        console.log("导出完成");
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
