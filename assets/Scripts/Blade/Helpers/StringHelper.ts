
/**
 * 字符串助手
 */
class StringHelper {

    /**
    * 判断是否以指定字符串开头
    * @param s
    * @param part
    */
    public static startsWith(s: string, part: string): boolean {
        return s.slice(0, part.length) == part;
    }

    /**
     * 判断是否以指定字符串结尾
     * @param s
     * @param part
     */
    public static endsWith(s: string, part: string): boolean {
        return s.slice(part.length) == part;
    }

    /**
     * 比较版本号
     * @param ver1
     * @param ver2
     */
    public static compareVersion(ver1: string, ver2: string) {
        const v1 = ver1.split('.');
        const v2 = ver2.split('.');

        const len = Math.min(v1.length, v2.length);
        for (let i = 0; i < len; ++i) {
            let num1 = parseInt(v1[i]) || 0;
            let num2 = parseInt(v2[i]) || 0;
            if (num1 > num2) {
                return 1;
            }
            else if (num1 < num2) {
                return -1;
            }
        }

        if (v1.length > v2.length) {
            return 1;
        }
        else if (v1.length < v2.length) {
            return -1;
        }

        return 0;
    }

    /**
     * 前缀补0
     * @param num
     * @param length
     * @returns
     */
    public static prefixZero(num: number, length: number): string {
        return (Array(length).join('0') + num).slice(-length);
    }

    /**
     * 格式化字符
     * @param str
     * @param params
     * @returns
     */
    public static format(str: string, ...params: any[]) {
        let content = str;
        if (params && params.length > 0) {
            content = content.replace(/\{(\d+)\}/g, (match, number) => {
                return number in params ? params[number] : match;
            });
        }
        return content;
    }

    /**
     * 格式化字符
     * @param str
     * @param obj
     * @returns
     */
    public static formatByObject(str: string, obj: Object) {
        let content = str;
        if (obj != null) {
            content = content.replace(/\{(\w+)\}/g, (match, key) => {
                return key in obj ? obj[key] : match;
            });
        }
        return content;
    }

    /**
     * 解析：item:item_1=1,item_2=1;tank:tank_10001=1;equip:equip_1=1
     * @param refStr
     * @returns
     */
    public static formatItemRefStr(refStr: string = "") {
        let refList: { title: string, key: string, value: number }[] = [];
        if (refStr == "") {
            return refList;
        }
        let types = refStr.split(";")
        for (let index = 0; index < types.length; index++) {
            const element = types[index];
            let typeAndContent = element.split(":");
            let title = typeAndContent[0];
            let contentStr = typeAndContent[1];

            if (title && contentStr) {
                let content = contentStr.split(",");
                for (let index = 0; index < content.length; index++) {
                    const sp = content[index];
                    let temp = sp.split("=");
                    refList.push({
                        title,
                        key: temp[0],
                        value: parseFloat(temp[1])
                    });
                }
            }
        }

        return refList;
    }

    /**
    * 解析：PrestigeExp=10,Exp=795;item_09104=6;tank_10201=2
    * @param refStr
    * @returns
    */
    public static formatItemRefStr2(refStr: string = "") {
        let refList: { key: string, value: number }[] = [];
        if (refStr == "") {
            return refList;
        }
        let types = refStr.split(";")
        for (let index = 0; index < types.length; index++) {
            const contentStr = types[index];
            if (contentStr && contentStr != "") {
                let content = contentStr.split(",");
                for (let index = 0; index < content.length; index++) {
                    const temp = content[index].split("=");
                    refList.push({ "key": temp[0], "value": parseFloat(temp[1]) });

                }
            }
        }
        return refList;
    }

    /**
    * 解析：2=item_99714=2;2=item_99715=2;2=item_99716=2;2=item_99717=2
    * @param refStr
    * @returns
    */
    public static formatItemRefStr3(refStr: string = "") {
        let refList: { type: string, key: string, value: number }[] = [];
        if (refStr == "") {
            return refList;
        }
        let types = refStr.split(";");
        for (let index = 0; index < types.length; index++) {
            const element = types[index];
            let content = element.split("=");
            refList.push({ "type": content[0], "key": content[1], "value": parseFloat(content[2]) });
        }
        return refList;
    }

    /**
     * 截取字符串一部分，剩余用“......”替换
     * @param txt 要处理的字符串
     * @param showCount 显示英文字个数，中文字为2的倍数,可为空
     * @param noEllipsis 是否不添加后面的“...”
     * @returns
     */
    public static getShortTxt(txt: string, showCount: number, noEllipsis: boolean = false) {
        if (txt == null) {
            return null;
        }
        let sStr = txt;
        let tCode: number[] = [];
        let tName: string[] = [];
        let nLenInByte = sStr.length;
        let nWidth = 0;
        if (showCount == null) {
            showCount = 12;
        }

        for (let i = 0; i < nLenInByte; i++) {
            let curByte = sStr.charCodeAt(i);
            let byteCount = 0;
            if (curByte > 0 && curByte < 127) {
                byteCount = 1;
            }
            else {
                byteCount = 2;
            }

            let char = sStr.substring(i, i + 1);

            if (byteCount == 1) {
                nWidth = nWidth + 1;
                tName.push(char);
                tCode.push(1);
            }
            else if (byteCount > 1) {
                nWidth = nWidth + 2;
                tName.push(char);
                tCode.push(2);
            }
        }
        if (showCount >= nWidth) {
            return txt;
        }
        if (nWidth > showCount) {
            let _sN = "";
            let _len = 0;
            for (let i = 0; i < tName.length; i++) {
                _sN = _sN + tName[i];
                _len = _len + tCode[i];
                if (_len >= showCount) {
                    break
                }
            }
            txt = noEllipsis ? _sN : _sN + "......";
        }
        return txt;
    }

    /**
     * 是否有表情
     * @param txt
     * @returns
     */
    public static hasEmoji(txt: string) {
        let regExp = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/
        return regExp.test(txt);
    }

    /**
     * 是否有无效字符(中文、字母、数字、特殊符号为有效字符)
     * @param txt
     * @returns
     */
    public static hasInvaildSymbol(txt: string) {
        let regExp = /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_]|[~!@#$%^&*()/\|,.<>?"'();:_+-=\[\]{}]|[\s])*$/
        return !(regExp.test(txt) && this.hasEmoji(txt) == false);
    }

    /**
     * 是否是有效ip地址
     * @param ip
     * @returns
     */
    public static isValidIP(ip: string) {
        let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
        return reg.test(ip);
    }

    // 复制到剪切板
    public static copyToClipBoard(str: string) {
        return blade.platform.get().copyToClipBoard(str);
    }

}


export default StringHelper;