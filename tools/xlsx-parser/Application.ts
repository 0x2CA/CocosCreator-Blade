import CommandHelper from "./Helper/CommandHelper";
import fs from "fs";
import path from "path";
import XLSXHelper from "./Helper/XLSXHelper";

export default class Application {

    public static Main(argv: string[]) {
        let command = CommandHelper.getCommander()
        command.version('1.0.0')
            .option('-i, --input <string>', 'xlsx文件路径')
            .option('-o, --output <string>', '文件保存目录')
            .option('-n, --nconver', '导出的文件存在时，不强行覆盖')
            .option('-d, --definition <string>', '同时导出Typescript定义文件')
            .parse(argv);

        if (fs.statSync(CommandHelper.getArgv(command, "input")).isDirectory()) {
            Application.BuildFolder(CommandHelper.getArgv(command, "input"), CommandHelper.getArgv(command, "output") || __dirname, CommandHelper.getArgv(command, "nconver") !== true, CommandHelper.getArgv(command, "definition"));
        }
        else {
            Application.BuildFile(CommandHelper.getArgv(command, "input"), CommandHelper.getArgv(command, "output") || __dirname, CommandHelper.getArgv(command, "nconver") !== true, "", CommandHelper.getArgv(command, "definition"));
        }
    }

    /**
     * 文件夹
     * @param inputFolder 
     * @param outputFolder 
     * @param ignoreCover 
     * @param definition 
     */
    public static BuildFolder(inputFolder: string, outputFolder: string, ignoreCover: boolean, definition: string) {
        if (!fs.statSync(inputFolder).isDirectory()) {
            console.warn('未指定导出目录');
            return;
        }

        fs.readdirSync(inputFolder).forEach((file, index) => {
            if (file.startsWith('~')) {
                return;
            }
            Application.BuildFile(
                path.join(inputFolder, file),
                outputFolder,
                ignoreCover,
                path.basename(file, path.extname(file)),
                definition);
        });
    }

    /**
     * 文件
     * @param file 
     * @param folder 
     * @param ignoreCover 
     * @param outputFilePrefix 
     * @param definition 
     */
    public static BuildFile(file: string, folder: string, ignoreCover: boolean, outputFilePrefix: string, definition: string) {
        const workbook = XLSXHelper.getWorkBook(file);
        const sheetnames = XLSXHelper.getSheetNames(workbook);
        /**
        *  声明内容
        */
        let definitionContent = ""

        for (let index = 0; index < sheetnames.length; index++) {
            const name = sheetnames[index];
            // _和$字符开头的表，忽略导出
            if (name.startsWith('_') && name.startsWith('$')) {
                continue;
            }

            // 构建输出文件名称
            let outputName = outputFilePrefix != "" ? `${outputFilePrefix}_${name}` : `${name}`;
            const outputFileName = outputName + '.json';
            console.log(`正在导出${outputFileName}表...`);

            // 获取表内容
            const worksheet = XLSXHelper.getWorkSheet(workbook, name);

            const json = XLSXHelper.sheet2Json(worksheet, { header: 1, defval: false, raw: false }) as string[];

            // console.log(json)
            let col, row;
            let keys: string[];
            let types: string[] = [];
            let data: any[] = []
            let indexkey
            let indextype
            if (json[0][0] == "index") {
                // 有索引
                indexkey = json[1][0]
                col = 1;
                row = 2;
            } else {
                // 无索引
                col = 0;
                row = 2;
            }

            // 获取类型
            for (let c = col; c < json[0].length; c++) {
                let descArr = json[0][c].split('|');
                if (descArr.length >= 2) {
                    types.push(descArr[0]);
                    if (indexkey && json[1][c] == indexkey) {
                        indextype = descArr[0]
                    }
                }
                else {
                    // 无数据格式，默认为string
                    types.push('s');
                    if (indexkey && json[1][c] == indexkey) {
                        indextype = 's'
                    }
                }
            }

            keys = json[1].slice(col, json[1].length) as any;


            for (let r = row; r < json.length; r++) {
                let rowdata = []
                for (let c = col; c < json[r].length; c++) {
                    let item = Application.formatData(json[r][c], types[c - col])
                    rowdata.push(item)
                }
                data.push(rowdata)
            }

            const filedata = { index: indexkey, keys, data }

            const outputPath = path.join(folder, outputFileName);
            if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder);
            }
            else if (fs.statSync(folder).isFile()) {
                console.warn(`与导出目录同名的文件（${folder}）已经存在，忽略导出操作`);
                continue;
            }

            if (fs.existsSync(outputPath) && !ignoreCover) {
                console.warn(`同名文件（${outputPath}）已经存在，忽略导出操作`);
                continue;
            }

            fs.writeFileSync(outputPath, JSON.stringify(filedata));


            // 输出声明文件
            if (indexkey) {
                let definitionItem = ""
                for (let index = 0; index < keys.length; index++) {
                    const name = keys[index];
                    const type = types[index]
                    definitionItem += "\t\t\t" + Application.definitionFromFormat(name, type) + "\n";
                }
                definitionContent += `\tdeclare interface ${outputName} {\n\t\t[${Application.definitionFromFormat("key", indextype).slice(0, Application.definitionFromFormat("key", indextype).length - 1)}]:{\n${definitionItem}\t\t}\n\t}\n`;
            } else {
                let definitionItem = ""
                for (let index = 0; index < keys.length; index++) {
                    const name = keys[index];
                    const type = types[index]
                    definitionItem += "\t\t" + Application.definitionFromFormat(name, type) + "\n";
                }
                definitionContent += `\tdeclare interface ${outputName} {\n${definitionItem}\t}\n`;
            }

            // console.log(definitionContent)

        }

        // 导出声明文件
        if (definitionContent && definitionContent.length > 0) {
            definitionContent = `declare namespace Configs {\n${definitionContent}}`;
            const pathInfo = path.parse(definition);
            let outputPath, outputDir;
            if (pathInfo.name == "") {
                // 没有后缀，则为目录路径
                outputDir = definition;
                outputPath = path.join(definition, 'config.d.ts');
            }
            else {
                outputDir = pathInfo.dir;
                outputPath = definition;
            }

            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir);
            }

            if (fs.statSync(outputDir).isFile()) {
                console.warn(`与导出定义目录同名的文件（${outputPath}）已经存在，忽略导出操作`);
            }
            fs.writeFileSync(outputPath, definitionContent);
        }
    }

    /**
    * 根据格式类型格式化字符串
    * @param {*} data 
     * @param {*} format 
    */
    public static formatData(data: string = "", format: string = "") {
        let result = null;
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
                result = data != null ? `${data}` : '';
                result = result.trim();
                break;
            case '[i]': // 数组
            case '[f]':
            case '[s]':
            case '[b]':
                if (data != null && format != null) {
                    result = data.split(';');
                    const matchArray = format.match(/\[([^)]+)\]/);
                    if (matchArray) {
                        const type = matchArray[1]
                        for (let j = 0; j < result.length; ++j) {
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
    }

    /**
    * 根据格式生成ts变量声明
    * @param {*} variable 
    * @param {*} format 
    */
    public static definitionFromFormat(variable: string, format: string = "") {
        let definition = '';
        switch (format) {
            case 'i': // 整形
            case 'f': // 浮点型
                definition += `${variable}: number;`;
                break;
            case 'b': // 布尔值
                definition += `${variable}: boolean;`;
                break;
            case 'j': // json
                definition += `${variable}: any;`;
                break;
            case 's': // 字符串
            default:
                definition += `${variable}: string;`;
                break;
            case '[i]': // 数组
            case '[f]':
                definition += `${variable}: number[];`;
                break;
            case '[s]':
                definition += `${variable}: string[];`;
                break;
            case '[b]':
                definition += `${variable}: boolean[];`
                break;
        }

        return definition;
    }
}

Application.Main(process.argv);