#! /usr/bin/env node

const commander = require('commander');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

/**
 * 导出整个目录
 * @param {*} floder 
 * @param {*} outputFolder 
 * @param {*} ignoreCover 
 */
function exportFolder(floder, outputFolder, ignoreCover, exportDefinition) {
    if (!fs.statSync(floder).isDirectory()) {
        console.warn('未指定导出目录');
        return;
    }

    fs.readdirSync(floder).forEach((file, index) => {
        if (file.startsWith('~')) {
            return;
        }
        exportFile(
            path.join(floder, file),
            outputFolder,
            ignoreCover,
            path.basename(file, path.extname(file)),
            exportDefinition);
    });
}

/**
 * 导出单个文件
 * @param {*} filePath 
 * @param {*} outputFolder 
 * @param {*} ignoreCover 
 * @param {*} outputFilePrefix
 */
function exportFile(filePath, outputFolder, ignoreCover, outputFilePrefix, exportDefinition) {
    let definitionContent = '';
    let definitionItem = '';
    const workbook = xlsx.readFile(filePath);
    for (const sheet in workbook.Sheets) {
        // _和$字符开头的表，忽略导出
        if (sheet.startsWith('_') && sheet.startsWith('$')) {
            continue;
        }

        let outputName = outputFilePrefix ? `${outputFilePrefix}_${sheet}` : `${sheet}`;
        const outputFileName = outputName + '.json';
        console.log(`正在导出${outputFileName}表...`);

        const sheetData = workbook.Sheets[sheet];
        const sheetJson = xlsx.utils.sheet_to_json(sheetData, { header: 1, defval: null, raw: false });
        if (!Array.isArray(sheetJson) || !Array.isArray(sheetJson[0])) {
            continue;
        }

        let index;
        let indexPos = [];
        let keys;
        let values = [];
        let col, row;
        let rowFormat = [];
        if (sheetJson[0][0] == 'index') {
            // 有主键
            index = sheetJson[1][0];
            col = 1;
            row = 2;
            keys = sheetJson[1].slice(col, sheetJson[1].length);
            const keyDesc = sheetJson[0].slice(col, keys.length + col);

            // 剔除键数组尾部为空的列
            let nullLen = 0;
            for (let i = keys.length - 1; i >= 0; --i) {
                if (keys[i] == null || keyDesc[i] == null) {
                    ++nullLen;
                }
                else {
                    break;
                }
            }
            keys.splice(keys.length - nullLen, nullLen);

            // 保存主键数据位置
            const indexArray = index.split(',');
            let pos;
            for (let i = 0; i < indexArray.length; ++i) {
                pos = keys.indexOf(indexArray[i]);
                if (pos !== -1) {
                    indexPos.push(pos);
                }
            }

            // 主键数据格式
            let descArr = [];
            for (let i = 0; i < keyDesc.length - nullLen; ++i) {
                descArr = keyDesc[i].split('|');
                if (descArr.length >= 2) {
                    rowFormat.push(descArr[0]);
                }
                else {
                    // 无数据格式，默认为string
                    rowFormat.push('s');
                }
            }
        }
        else {
            // 无主键
            col = 0;
            row = 1;
        }

        // 插入一条值
        let valid = true;
        let rowJson;
        for (let r = row; r < sheetJson.length; ++r) {
            // 没有主键的列忽略导出
            rowJson = sheetJson[r].slice(col, Math.min(keys.length, sheetJson[r].length) + col);
            if (indexPos.length > 0) {
                for (let p of indexPos) {
                    // 主键对应的值为空，忽略导出
                    if (!rowJson[p]) {
                        valid = false;
                        break;
                    }
                }
            }

            if (valid) {
                for (let i = 0; i < rowJson.length; ++i) {
                    rowJson[i] = formatData(rowJson[i], rowFormat[i]);
                }
                values.push(rowJson);
            }
        }

        const exportData = {
            index,
            keys,
            values
        };

        const outputPath = path.join(outputFolder, outputFileName);
        if (!fs.existsSync(outputFolder)) {
            fs.mkdirSync(outputFolder);
        }
        else if (fs.statSync(outputFolder).isFile()) {
            console.warn(`与导出目录同名的文件（${outputFolder}）已经存在，忽略导出操作`);
            continue;
        }

        if (fs.existsSync(outputPath) && !ignoreCover) {
            console.warn(`同名文件（${outputPath}）已经存在，忽略导出操作`);
            continue;
        }

        fs.writeFileSync(outputPath, JSON.stringify(exportData));

        // 定义文件
        if (exportDefinition && rowFormat.length > 0) {
            definitionItem = '';
            if (definitionContent.length > 0) {
                definitionContent += '\n\n';
            }

            for (let i = 0; i < keys.length; ++i) {
                definitionItem += definitionFromFormat(keys[i], rowFormat[i]);
            }

            outputName = outputName.substring(0, 1).toUpperCase() + outputName.substring(1);
            definitionContent += `\tdeclare interface ${outputName} {\n${definitionItem}\t}`;
        }
    }

    // 导出声明文件
    if (definitionContent && definitionContent.length > 0) {
        definitionContent = `declare namespace expconf {\n${definitionContent}\n}`;
        const pathInfo = path.parse(exportDefinition);
        let outputPath, outputDir;
        if (pathInfo.path == exportDefinition) {
            // 没有后缀，则为目录路径
            outputDir = exportDefinition;
            outputPath = path.join(exportDefinition, 'config.d.ts');
        }
        else {
            outputDir = pathInfo.dir;
            outputPath = exportDefinition;
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
function formatData(data, format) {
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
        default:
            result = data != null ? `${data}` : '';
            result = result.trim();
            break;
        case '[i]': // 数组
        case '[f]':
        case '[s]':
        case '[b]':
            if (data != null) {
                result = data.split(';');
                const type = format.match(/\[([^)]+)\]/)[1];
                for (let j = 0; j < result.length; ++j) {
                    result[j] = formatData(result[j], type);
                }
            }
            else {
                result = [];
            }
            break;
    }
    return result;
}

/**
 * 根据格式生成ts变量声明
 * @param {*} variable 
 * @param {*} format 
 */
function definitionFromFormat(variable, format) {
    let definition = '\t\t';
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

    definition += '\n';
    return definition;
}

function main() {
    commander.version('1.0.0')
        .option('-i, --input <string>', 'xlsx文件路径')
        .option('-o, --output <string>', '文件保存目录')
        .option('-n, --nconver', '导出的文件存在时，不强行覆盖')
        .option('-d, --definition <string>', '同时导出Typescript定义文件')
        .parse(process.argv);
    if (fs.statSync(commander.input).isDirectory()) {
        exportFolder(commander.input, commander.output || __dirname, commander.nconver !== true, commander.definition);
    }
    else {
        exportFile(commander.input, commander.output || __dirname, commander.nconver !== true, null, commander.definition);
    }
}

main();