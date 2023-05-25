import BaseSearchEx from "../internals/BaseSearchEx";
import IllegalWordsSearchResult from "./Result/IllegalWordsSearchResult";

export default class IllegalWordsSearch extends BaseSearchEx {

    private _blacklist: number[] = new Array<number>(0);

    /**
     * 使用跳词过滤器，默认使用
     */
    public isSkipWordFilter: boolean = true; //使用跳词过滤器
    private _skipList: string = " \t\r\n~!@#$%^&*()_+-=【】、[]{}|;':\"，。、《》？αβγδεζηθικλμνξοπρστυφχψωΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ。，、；：？！…—·ˉ¨‘’“”々～‖∶＂＇｀｜〃〔〕〈〉《》「」『』．〖〗【】（）［］｛｝ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩⅪⅫ⒈⒉⒊⒋⒌⒍⒎⒏⒐⒑⒒⒓⒔⒕⒖⒗⒘⒙⒚⒛㈠㈡㈢㈣㈤㈥㈦㈧㈨㈩①②③④⑤⑥⑦⑧⑨⑩⑴⑵⑶⑷⑸⑹⑺⑻⑼⑽⑾⑿⒀⒁⒂⒃⒄⒅⒆⒇≈≡≠＝≤≥＜＞≮≯∷±＋－×÷／∫∮∝∞∧∨∑∏∪∩∈∵∴⊥∥∠⌒⊙≌∽√§№☆★○●◎◇◆□℃‰€■△▲※→←↑↓〓¤°＃＆＠＼︿＿￣―♂♀┌┍┎┐┑┒┓─┄┈├┝┞┟┠┡┢┣│┆┊┬┭┮┯┰┱┲┳┼┽┾┿╀╁╂╃└┕┖┗┘┙┚┛━┅┉┤┥┦┧┨┩┪┫┃┇┋┴┵┶┷┸┹┺┻╋╊╉╈╇╆╅╄";
    private _skipBitArray: boolean[] = [];

    /**
     * 过滤跳词
     */
    public skipWordFilterCallback: (c: string, text: string, index: number) => boolean = null;

    /**
     * 字符转化，可以设置繁简转化、忽略大小写，启用后UseIgnoreCase开启无效
     * 若想使用CharTranslateHandler，请先添加事件CharTranslateHandler, 再用SetKeywords设置关键字
     */
    public charTranslateCallback: (c: string, text: string, index: number) => string = null;

    /**
     * 自定义字符串匹配
     */
    public stringMatchCallback: (text: string, start: number, end: number, keyword: string, keywordIndex: number, matchKeyword: string, blacklistIndex: number) => boolean = null;

    /**
     * 使用重复词过滤，默认使用
     */
    public isDuplicateWordFilter: boolean = true;

    /**
     * 使用半角转化器，默认使用，如果不使用关闭，请先UseDBCcaseConverter设置为false,再用SetKeywords设置关键字
     */
    public isDBCcaseConverter: boolean = true;

    /**
     *  使用忽略大小写，默认使用，如果不使用关闭，请先UseIgnoreCase设置为false,再用SetKeywords设置关键字
     */
    public isIgnoreCase: boolean = true;

    public constructor() {
        super();
        //'\uffff' -> 65535
        this._skipBitArray = new Array<boolean>(65535 + 1);
        for (let i = 0; i < this._skipList.length; i++) {
            this._skipBitArray[this._skipList.charCodeAt(i)] = true;
        }
    }

    /**
     * 设置跳词
     * @param skipList
     */
    public setSkipWords(skipList: string) {
        //'\uffff' -> 65535
        this._skipBitArray = new Array<boolean>(65535 + 1);
        if (skipList != null) {
            for (let i = 0; i < this._skipList.length; i++) {
                this._skipBitArray[this._skipList.charCodeAt(i)] = true;
            }
        }
    }

    /**
     * 设置关键字
     * 如果想使用CharTranslateHandler，请先添加事件CharTranslateHandler, 再用SetKeywords设置关键字
     * 使用CharTranslateHandler后，UseIgnoreCase配置无效
     * 如果不使用忽略大小写，请先UseIgnoreCase设置为false,再用SetKeywords设置关键字
     * @param keywords
     */
    public setKeywords(keywords: string[]) {
        if (this.charTranslateCallback != null) {
            let keys: string[] = new Array<string>(keywords.length);
            let index = 0;
            for (const item of keywords) {
                let sb: string[] = new Array<string>();
                for (let i = 0; i < item.length; i++) {
                    sb.push(this.charTranslateCallback(item.charAt(i), item, i));
                }
                keys[index++] = sb.join('');
            }
            super.setKeywords(keys);
        } else if (this.isDBCcaseConverter || this.isIgnoreCase) {
            let keys: string[] = new Array<string>(keywords.length);
            let index = 0;
            for (const item of keywords) {
                let sb: string[] = new Array<string>();
                for (let i = 0; i < item.length; i++) {
                    sb.push(this.toSenseWord(item.charAt(i)));
                }
                keys[index++] = sb.join('');
            }
            super.setKeywords(keys);
        } else {
            super.setKeywords(keywords);
        }
    }

    /**
     * 在文本中查找所有的关键字
     * @param text
     * @returns
     */
    public findAll(text: string) {
        let result: IllegalWordsSearchResult[] = new Array<IllegalWordsSearchResult>();
        let p = 0;
        let pChar = 0;

        for (let i = 0; i < text.length; i++) {
            let t1 = text.charAt(i);
            if (this.isSkipWordFilter) {
                if (this.skipWordFilterCallback != null) {//跳词跳过
                    if (this.skipWordFilterCallback(t1, text, i)) {
                        continue;
                    }
                } else if (this._skipBitArray[text.charCodeAt(i)]) {
                    continue;
                }
            }

            if (this.charTranslateCallback != null) { // 字符串转换
                t1 = this.charTranslateCallback(t1, text, i);
            } else if (this.isDBCcaseConverter || this.isIgnoreCase) {
                t1 = this.toSenseWord(t1);
            }
            let t = this._dict[t1.charCodeAt(0)];
            if (t == null) {
                pChar = t1.charCodeAt(0);
                p = 0;
                continue;
            }
            let next;
            if (p == 0 || (next = this._nextIndex[p].getValue(t)) == null) {
                if (this.isDuplicateWordFilter && pChar == t1.charCodeAt(0)) {
                    next = p;
                } else {
                    next = this._first[t];
                    if (next == null) {
                        next = 0;
                    }
                }
            }

            if (next != 0) {
                if (this._end[next] < this._end[next + 1] && this.checkNextChar(text, t1, i)) {
                    for (let j = this._end[next]; j < this._end[next + 1]; j++) {
                        let index = this._resultIndex[j];
                        let r = this.getIllegalResult(text, i, index);
                        if (r != null) {
                            result.push(r);
                        }
                    }
                }
            }
            p = next;
            pChar = t1.charCodeAt(0);
        }
        return result;
    }

    /**
     * 在文本中查找第一个关键字
     * @param text
     * @returns
     */
    public findFirst(text: string) {
        let p = 0;
        let pChar = 0;

        for (let i = 0; i < text.length; i++) {
            let t1 = text.charAt(i);
            if (this.isSkipWordFilter) {
                if (this.skipWordFilterCallback != null) {//跳词跳过
                    if (this.skipWordFilterCallback(t1, text, i)) {
                        continue;
                    }
                } else if (this._skipBitArray[text.charCodeAt(i)]) {
                    continue;
                }
            }

            if (this.charTranslateCallback != null) { // 字符串转换
                t1 = this.charTranslateCallback(t1, text, i);
            } else if (this.isDBCcaseConverter || this.isIgnoreCase) {
                t1 = this.toSenseWord(t1);
            }
            let t = this._dict[t1.charCodeAt(0)];
            if (t == null) {
                pChar = t1.charCodeAt(0);
                p = 0;
                continue;
            }
            let next;
            if (p == 0 || (next = this._nextIndex[p].getValue(t)) == null) {
                if (this.isDuplicateWordFilter && pChar == t1.charCodeAt(0)) {
                    next = p;
                } else {
                    next = this._first[t];
                    if (next == null) {
                        next = 0;
                    }
                }
            }

            if (next != 0) {
                if (this._end[next] < this._end[next + 1] && this.checkNextChar(text, t1, i)) {
                    for (let j = this._end[next]; j < this._end[next + 1]; j++) {
                        let index = this._resultIndex[j];
                        let r = this.getIllegalResult(text, i, index);
                        if (r != null) {
                            return r;
                        }
                    }
                }
            }
            p = next;
            pChar = t1.charCodeAt(0);
        }
        return null;
    }

    /**
     * 判断文本是否包含关键字
     * @param text
     * @returns
     */
    public containsAny(text: string) {
        let p = 0;
        let pChar = 0;

        for (let i = 0; i < text.length; i++) {
            let t1 = text.charAt(i);
            if (this.isSkipWordFilter) {
                if (this.skipWordFilterCallback != null) {//跳词跳过
                    if (this.skipWordFilterCallback(t1, text, i)) {
                        continue;
                    }
                } else if (this._skipBitArray[text.charCodeAt(i)]) {
                    continue;
                }
            }

            if (this.charTranslateCallback != null) { // 字符串转换
                t1 = this.charTranslateCallback(t1, text, i);
            } else if (this.isDBCcaseConverter || this.isIgnoreCase) {
                t1 = this.toSenseWord(t1);
            }
            let t = this._dict[t1.charCodeAt(0)];
            if (t == null) {
                pChar = t1.charCodeAt(0);
                p = 0;
                continue;
            }
            let next;
            if (p == 0 || (next = this._nextIndex[p].getValue(t)) == null) {
                if (this.isDuplicateWordFilter && pChar == t1.charCodeAt(0)) {
                    next = p;
                } else {
                    next = this._first[t];
                    if (next == null) {
                        next = 0;
                    }
                }
            }

            if (next != 0) {
                if (this._end[next] < this._end[next + 1] && this.checkNextChar(text, t1, i)) {
                    for (let j = this._end[next]; j < this._end[next + 1]; j++) {
                        let index = this._resultIndex[j];
                        let r = this.getIllegalResult(text, i, index);
                        if (r != null) {
                            return true;
                        }
                    }
                }
            }
            p = next;
            pChar = t1.charCodeAt(0);
        }
        return false;
    }

    /**
     * 在文本中替换所有的关键字
     * @param text
     * @param replaceChar
     * @returns
     */
    public replace(text: string, replaceChar: string = '*') {
        let result: string[] = text.split('');

        let p: number = 0;
        let pChar: number = 0;

        for (let i = 0; i < text.length; i++) {
            let t1 = text.charAt(i);
            if (this.isSkipWordFilter) {
                if (this.skipWordFilterCallback != null) {//跳词跳过
                    if (this.skipWordFilterCallback(t1, text, i)) {
                        continue;
                    }
                } else if (this._skipBitArray[text.charCodeAt(i)]) {
                    continue;
                }
            }

            if (this.charTranslateCallback != null) { // 字符串转换
                t1 = this.charTranslateCallback(t1, text, i);
            } else if (this.isDBCcaseConverter || this.isIgnoreCase) {
                t1 = this.toSenseWord(t1);
            }
            let t = this._dict[t1.charCodeAt(0)];
            if (t == null) {
                pChar = t1.charCodeAt(0);
                p = 0;
                continue;
            }
            let next;
            if (p == 0 || (next = this._nextIndex[p].getValue(t)) == null) {
                if (this.isDuplicateWordFilter && pChar == t1.charCodeAt(0)) {
                    next = p;
                } else {
                    next = this._first[t];
                    if (next == null) {
                        next = 0;
                    }
                }
            }

            if (next != 0) {
                if (this._end[next] < this._end[next + 1] && this.checkNextChar(text, t1, i)) {
                    for (let j = this._end[next]; j < this._end[next + 1]; j++) {
                        let index = this._resultIndex[j];
                        let r = this.getIllegalResult(text, i, index);
                        if (r != null) {
                            for (let k = r.start; k <= r.end; k++) {
                                result[k] = replaceChar;
                            }
                            break;
                        }
                    }
                }
            }
            p = next;
            pChar = t1.charCodeAt(0);
        }
        return result.join('');
    }

    /**
     * 当前字符为不是英文数字，则通过，返回true
     * 审核下一个字符是否为英文数字，如果是,则返回 false
     * @param text
     * @param c
     * @param end
     * @returns
     */
    private checkNextChar(text: string, c: string, end: number) {
        if (this.isEnglishOrNumber(c) == false) {
            return true;
        }
        if (end + 1 < text.length) {
            let e1 = text[end + 1];
            if (this.isSkipWordFilter) {
                if (this.skipWordFilterCallback != null) {//跳词跳过
                    if (this.skipWordFilterCallback(e1, text, end + 1)) {
                        return true;
                    }
                } else if (this._skipBitArray[text.charCodeAt(end + 1)]) {
                    return true;
                }
            }
            if (this.charTranslateCallback != null) { // 字符串转换
                e1 = this.charTranslateCallback(e1, text, end + 1);
            } else if (this.isDBCcaseConverter || this.isIgnoreCase) {
                e1 = this.toSenseWord(e1);
            }
            if (this.isEnglishOrNumber(e1)) {
                return false;
            }
        }
        return true;
    }

    private getIllegalResult(text: string, end: number, index: number) {
        let key = this._keywords[index];

        let keyIndex = key.length - 1;
        let start = end;
        for (let i = end; i >= 0; i--) {
            let s2 = text.charAt(i);
            if (this.isSkipWordFilter) {
                if (this.skipWordFilterCallback != null) {
                    if (this.skipWordFilterCallback(s2, text, i)) {
                        continue;
                    }
                } else if (this._skipBitArray[text.charCodeAt(i)]) {
                    continue;
                }
            }

            if (this.charTranslateCallback != null) { // 字符串转换
                s2 = this.charTranslateCallback(s2, text, i);
            } else if (this.isDBCcaseConverter || this.isIgnoreCase) {
                s2 = this.toSenseWord(s2);
            }
            if (s2 == key[keyIndex]) {
                keyIndex--;
                if (keyIndex == -1) { start = i; break; }
            }
        }
        for (let i = start; i >= 0; i--) {
            let s2 = text.charAt(i);
            if (this.charTranslateCallback != null) { // 字符串转换
                s2 = this.charTranslateCallback(s2, text, i);
            } else if (this.isDBCcaseConverter || this.isIgnoreCase) {
                s2 = this.toSenseWord(s2);
            }
            if (s2 != key[0]) { break; }
            start = i;
        }
        return this.getIllegalResult2(text, key, start, end, index);
    }

    private getIllegalResult2(text: string, key: string, start: number, end: number, index: number) {
        if (start > 0) {
            let s1 = text.charAt(start);
            if (this.charTranslateCallback != null) { s1 = this.charTranslateCallback(s1, text, start); }
            if (this.isEnglishOrNumber(s1)) {
                let s2 = text.charAt(start - 1);
                if (this.charTranslateCallback != null) { // 字符串转换
                    s2 = this.charTranslateCallback(s2, text, start - 1);
                } else if (this.isDBCcaseConverter || this.isIgnoreCase) {
                    s2 = this.toSenseWord(s2);
                }
                if (this.isEnglishOrNumber(s2)) {
                    return null;
                }
            }
        }

        let keyword = text.substring(start, end - start + 1);
        let bl = this._blacklist.length > index ? this._blacklist[index] : 0;
        if (this.stringMatchCallback != null) {
            if (this.stringMatchCallback(text, start, end, keyword, index, key, this._blacklist[index])) {
                return new IllegalWordsSearchResult(keyword, start, end, index, key, bl);
            }
            return null;
        }
        return new IllegalWordsSearchResult(keyword, start, end, index, key, bl);
    }

    private isEnglishOrNumber(c: string) {
        let charCode = c.charCodeAt(0);
        if (charCode < 128) {
            if ((charCode >= '0'.charCodeAt(0) && charCode <= '9'.charCodeAt(0)) || (charCode >= 'a'.charCodeAt(0) && charCode <= 'z'.charCodeAt(0)) || (charCode >= 'A'.charCodeAt(0) && charCode <= 'Z'.charCodeAt(0))) {
                return true;
            }
        }
        return false;
    }

    private toSenseWord(c: string) {
        let charCodeA = 'A'.charCodeAt(0);
        let charCodeZ = 'Z'.charCodeAt(0);
        let charCode = c.charCodeAt(0);

        if (this.isIgnoreCase) {
            if (charCode >= charCodeA && charCode <= charCodeZ) return String.fromCharCode(charCode | 0x20);
        }
        if (this.isDBCcaseConverter) {
            if (charCode == 12288) return ' ';
            if (charCode >= 65280 && charCode < 65375) {
                let k = (charCode - 65248);
                if (this.isIgnoreCase) {
                    if (charCodeA <= k && k <= charCodeZ) {
                        k = k | 0x20;
                    }
                }
                return String.fromCharCode(k);
            }
        }

        return c;
    }

    /**
     * 设置黑名单
     * @param blacklist
     */
    public setBlacklist(blacklist: number[]) {
        if (this._keywords == null) {
            throw new Error("请先使用setKeywords方法设置关键字！");
        }
        if (blacklist.length != this._keywords.length) {
            throw new Error("请关键字与黑名单列表的长度要一样长！");
        }

        this._blacklist = blacklist;
    }
}