import Commander from 'commander';
import fs from "fs";
import path from "path";

const minigame_png = {
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

const minigame_jpg = {
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

const web_png = {
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
}

const web_jpg = {
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
}


const ios = {
    "formats": [
        {
            "name": "astc_6x6",
            "quality": "medium"
        }
    ]
}

const android = {
    "formats": [
        {
            "name": "astc_6x6",
            "quality": "medium"
        }
    ]
}

export default class Application {

    public static Main(argv: string[]) {
        let command = new Commander.Command()
        command.version('1.0.0')
            .option('-i, --input <string>', '资源文件路径')
            .parse(argv);

        let options = command.opts();

        if (!fs.statSync(options.input).isDirectory()) {
            console.error("输入路径不存在", options.input);
            return;
        }

        Application.ForeachFile(options.input, (filePath: string) => {
            let extension = path.extname(filePath);

            if (extension != ".meta") {
                return;
            }

            let fileName = path.basename(filePath);

            if (fileName.endsWith("pac.meta") || fileName.endsWith("png.meta")) {
                console.log("处理png文件", fileName);

                let json = fs.readFileSync(filePath, { encoding: "utf8" });

                let data = JSON.parse(json);

                data["platformSettings"] = {
                    "minigame": minigame_png,
                    "web": web_png,
                    "ios": ios,
                    "android": android
                }

                fs.writeFileSync(filePath, JSON.stringify(data), { encoding: "utf8" });
            } else if (fileName.endsWith("jpg.meta")) {
                console.log("处理jpg文件", fileName);

                let json = fs.readFileSync(filePath, { encoding: "utf8" });

                let data = JSON.parse(json);

                data["platformSettings"] = {
                    "minigame": minigame_jpg,
                    "web": web_jpg,
                    "ios": ios,
                    "android": android
                }

                fs.writeFileSync(filePath, JSON.stringify(data), { encoding: "utf8" });
            }
        });

        console.log("导出完成");
    }

    private static ForeachFile(dirPath: string, callback?: (filePath: string) => void) {
        let dirents = fs.readdirSync(dirPath, { withFileTypes: true });

        for (let direntsIndex = 0; direntsIndex < dirents.length; direntsIndex++) {
            const dirent = dirents[direntsIndex];
            if (dirent.isDirectory()) {
                if (dirent.name == ".git" || dirent.name == ".svn") {
                    continue;
                }
                let direntPath = dirPath + "/" + dirent.name;
                Application.ForeachFile(direntPath, callback);
            } else {
                let filePath = dirPath + "/" + dirent.name;
                if (callback) {
                    callback(filePath);
                }
            }
        }
    }

    private static CheckDir(dirPath: string) {
        if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
            let parentDir = path.dirname(dirPath);
            Application.CheckDir(parentDir);
            fs.mkdirSync(dirPath);
        }
    }
}

Application.Main(process.argv);
