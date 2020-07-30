import { BigSource } from "../Libs/Big/Big";

export default class BigHelper {
    private static Unit: string[] = [
        "",
        "k",
        "m",
        "b",
        "t",
        "ta",
        "tb",
        "tc",
        "td",
        "te",
        "tf",
        "tg",
        "th",
        "ti",
        "tj",
        "tk",
        "tl",
        "tm",
        "tn",
        "to",
        "tp",
        "tq",
        "tr",
        "ts",
        "tt",
        "tu",
        "tv",
        "tw",
        "tx",
        "ty",
        "tz",
    ];

	/**
     * 格式化数值
     * @param Number 
     */
    public static toFormat(bigSource: BigSource) {
        try {
            bigSource = new Big(bigSource);
            let str: Array<string> | string = bigSource
                .toFixed(2)
                .split(".")[0]
                .split("")
                .reverse()
                .join("")
                .replace(/(.{3})/g, "$1,")
                .split("")
                .reverse()
                .join("")
                .split(",");
            if (str[0] == "") {
                str.shift();
            }
            str = str.join(",");
            if (bigSource.toFixed(2).split(".")[1]) {
                str += "." + bigSource.toFixed(2).split(".")[1];
            }

            let array = str.split(".");
            let num = array[0].split(",");
            let count = num.length;
            if (count > 1) {
                str = num[0] + "." + num[1].substring(0, 2);
            }
            for (let index = str.length - 1; index >= 0; index--) {
                if (str[index] == ".") {
                    str = str.substring(0, index);
                    break;
                }
                if (str[index] == "0") {
                    str = str.substring(0, index);
                } else {
                    break;
                }
            }
            return str + BigHelper.Unit[count - 1];
        } catch (error) {
            console.log(error);
            return "0";
        }
    }


    /**
     * 缩小数值
     * @param Number 
     * @param level 
     */
    public static toSmall(bigSource: BigSource, level = 5) {
        try {
            bigSource = new Big(bigSource);
            let str: Array<string> | string = bigSource
                .toFixed(2)
                .split(".")[0]
                .split("")
                .reverse()
                .join("")
                .replace(/(.{3})/g, "$1,")
                .split("")
                .reverse()
                .join("")
                .split(",");
            if (str[0] == "") {
                str.shift();
            }
            str = str.join(",");
            if (bigSource.toFixed(2).split(".")[1]) {
                str += "." + bigSource.toFixed(2).split(".")[1];
            }

            let array = str.split(".");
            let num = array[0].split(",");
            let length: number = num.length;
            //头尾处理
            num[0] = (parseInt(num[0]) + 1000 + "").substr(1);
            num.push(array[1]);

            //单位预留64/level的位数
            let unitCount = Math.floor(length / level);
            let unitStr = (unitCount + Math.pow(10, (Math.floor(64 / level) + "").length) + "").substr(1);

            //留值处理
            let result = (parseInt(num.join("").substr(0, 3 * level - 1)) + Math.pow(10, 3 * level - 1) + "").substr(1);
            return parseInt(unitStr + result);
        } catch (error) {
            console.log(error);
            return 0;
        }
    }
}