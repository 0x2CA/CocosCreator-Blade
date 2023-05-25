import Commander from 'commander';
import fs from "fs";
import path from "path";

export default class Application {

    public static Main(argv: string[]) {
        let command = new Commander.Command()
        command.version('1.0.0')
            .option('-i, --input <string>', '资源文件路径')
            .option('-o, --output <string>', '文件保存目录')
            .parse(argv);

        let options = command.opts();

        if (!fs.statSync(options.input).isDirectory()) {
            console.error("输入路径不存在", options.input);
            return;
        }

        let data: { [key: string]: string } = {};

        Application.ForeachFile(options.input, (filePath: string) => {
            let extension = path.extname(filePath);

            if (extension == ".meta" || extension == ".pac" || extension == ".atlas" || extension == "") {
                return;
            }

            let fileName = path.basename(filePath);

            if (fileName == "Addressables.json") {
                return;
            }

            // console.log("处理文件", fileName);

            filePath = filePath.split("resources/")[1].replace("\\", "/");

            if (data[fileName] != null) {
                console.warn("重复文件名", fileName);
            }

            data[fileName] = filePath.split(".")[0];
        });

        Application.CheckDir(path.dirname(options.output));

        fs.writeFileSync(options.output, JSON.stringify(data), { encoding: "utf8" });

        console.log("导出完成", options.output);
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
