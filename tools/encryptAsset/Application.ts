import Commander from 'commander';
import fs from "fs";
import path from "path";

export default class Application {

    public static Main(argv: string[]) {
        let command = new Commander.Command()
        command.version('1.0.0')
            .option('-i, --input <string>', '资源文件路径')
            .option('-k, --key <string>', '密码')
            .option('-s, --sign <string>', '标记')
            .parse(argv);

        let options = command.opts();

        if (!fs.statSync(options.input).isDirectory()) {
            console.error("输入路径不存在", options.input);
            return;
        }

        let extensions = [".png", ".jpg", ".json", ".jsc", ".atlas"];

        let excludeExtensions = new Set<string>();

        let encrySign = Buffer.from(options.sign || "This is a encry file!!", "ascii");

        console.log("标记头", encrySign.toString('hex'), encrySign.length);

        let encryKey = Buffer.from(options.key || "jbNFX&NWAe56Ftqms8H9D23@vFR#cU9K", "ascii");

        console.log("密码", encryKey.toString('hex'), encryKey.length);

        Application.ForeachFile(options.input, (filePath: string) => {
            let extension = path.extname(filePath);

            if (extensions.indexOf(extension) == -1) {
                excludeExtensions.add(extension);
                return;
            }

            let fileName = path.basename(filePath);

            // console.log("处理文件", filePath);

            fs.readFile(filePath, (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                }

                let isEncry = true;

                for (let index = 0; index < encrySign.length; index++) {
                    if (encrySign[index] != data[index]) {
                        isEncry = false;
                        break;
                    }
                }

                if (isEncry == true) {
                    console.log("已经加过密", fileName);
                    return;
                }

                let result = Buffer.alloc(encrySign.length + data.length);

                for (let index = 0; index < encrySign.length; index++) {
                    result[index] = encrySign[index];
                }

                for (let index = 0; index < data.length; index++) {
                    // 反向数据
                    // result[encrySign.length + index] = data[data.length - 1 - index];
                    result[encrySign.length + index] = data[index];
                    // 密码作异或
                    result[encrySign.length + index] = result[encrySign.length + index] ^ encryKey[index % encryKey.length];
                    // 倒叙密码作偏移
                    let offset = encryKey[encryKey.length - 1 - index % encryKey.length];
                    // 字节最大移动8
                    offset %= 8;
                    offset += 8;
                    offset %= 8;
                    result[encrySign.length + index] = ((result[encrySign.length + index] + (result[encrySign.length + index] << 8)) >> offset) % 256;
                    // 取反
                    result[encrySign.length + index] = ~result[encrySign.length + index];
                }

                fs.writeFile(filePath, result, () => {
                    console.log("加密文件", fileName);
                });

            });

        });

        console.log("排除文件后缀", JSON.stringify(Array.from(excludeExtensions)));
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
}

Application.Main(process.argv);
