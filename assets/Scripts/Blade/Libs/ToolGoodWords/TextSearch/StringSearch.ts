import BaseSearch from "../internals/BaseSearch";
import TrieNode2 from "../internals/TrieNode2";

export default class StringSearch extends BaseSearch {
    /**
     * 在文本中查找第一个关键字
     * @param text
     * @returns
     */
    public findFirst(text: string) {
        let ptr: TrieNode2 = null;
        for (let i = 0; i < text.length; i++) {
            const t = text.charCodeAt(i);
            let tn: TrieNode2 = null;
            if (ptr == null) {
                tn = this._first[t];
            } else {
                tn = ptr.getChilden(t);
                if (tn == null) {
                    tn = this._first[t];
                }
            }
            if (tn != null) {
                if (tn.isEnd) {
                    return this._keywords[tn.results[0]];
                }
            }
            ptr = tn;
        }
        return null;
    }

    /**
     * 在文本中查找所有的关键字
     * @param text
     * @returns
     */
    public findAll(text: string) {
        let ptr: TrieNode2 = null;
        let list: Array<string> = new Array<string>();
        for (let i = 0; i < text.length; i++) {
            const t = text.charCodeAt(i);
            let tn: TrieNode2 = null;
            if (ptr == null) {
                tn = this._first[t];
            } else {
                tn = ptr.getChilden(t);
                if (tn == null) {
                    tn = this._first[t];
                }
            }
            if (tn != null) {
                if (tn.isEnd) {
                    for (const item of tn.results) {
                        list.push(this._keywords[item]);
                    }
                }
            }
            ptr = tn;
        }
        return list;
    }

    /**
     * 判断文本是否包含关键字
     * @param text
     * @returns
     */
    public containsAny(text: string) {
        let ptr: TrieNode2 = null;
        for (let i = 0; i < text.length; i++) {
            const t = text.charCodeAt(i);
            let tn: TrieNode2 = null;
            if (ptr == null) {
                tn = this._first[t];
            } else {
                tn = ptr.getChilden(t);
                if (tn == null) {
                    tn = this._first[t];
                }
            }
            if (tn != null) {
                if (tn.isEnd) {
                    return true;
                }
            }
            ptr = tn;
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
        let result = text.split('');

        let ptr: TrieNode2 = null;
        for (let i = 0; i < text.length; i++) {
            const t = text.charCodeAt(i);
            let tn: TrieNode2 = null;
            if (ptr == null) {
                tn = this._first[t];
            } else {
                tn = ptr.getChilden(t);
                if (tn == null) {
                    tn = this._first[t];
                }
            }
            if (tn != null) {
                if (tn.isEnd) {
                    let maxLength = this._keywords[tn.results[0]].length;
                    let start = i + 1 - maxLength;
                    for (let j = start; j <= i; j++) {
                        result[j] = replaceChar;
                    }
                }
            }
            ptr = tn;
        }
        return result.join('');
    }
}
