

import BaseMatch from "../internals/BaseMatch";
import TrieNode3 from "../internals/TrieNode3";


/**
 * 文本搜索匹配, ,支持 部分 正则 如 . ? [ ] \ ( | ) ,不支持( )内再嵌套( )
 */
export default class StringMatch extends BaseMatch {

    /**
     * 在文本中查找第一个关键字
     * @param text
     * @returns
     */
    public findFirst(text: string) {
        let ptr: TrieNode3 = null;
        for (let i = 0; i < text.length; i++) {
            let t = text.charCodeAt(i);

            let tn: TrieNode3 = null;
            if (ptr == null) {
                tn = this._first[t];
            } else {
                tn = ptr.getChilden(t);
                if (tn == null) {
                    if (ptr.hasWildcard) {
                        let result = this.findFirst2(text, i + 1, ptr.wildcardNode);
                        if (result != null) {
                            return result;
                        }
                    }
                    tn = this._first[t];
                }
            }
            if (tn != null) {
                if (tn.isEnd) {
                    let length = this._keywordLength[tn.results[0]];
                    let s = i - length + 1;
                    if (s >= 0) {
                        return text.substring(s, length);
                    }
                }
            }
            ptr = tn;
        }
        return null;
    }

    private findFirst2(text: string, index: number, ptr: TrieNode3) {
        for (let i = index; i < text.length; i++) {
            let t = text.charCodeAt(i);
            let tn: TrieNode3 = ptr.getChilden(t);
            if (tn == null) {
                if (ptr.hasWildcard) {
                    let result = this.findFirst2(text, i + 1, ptr.wildcardNode);
                    if (result != null) {
                        return result;
                    }
                }
                return null;
            }
            if (tn.isEnd) {
                let length = this._keywordLength[tn.results[0]];
                let s = i - length + 1;
                if (s >= 0) {
                    return text.substring(s, length);
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
        let ptr: TrieNode3 = null;
        let result = new Array<string>();

        for (let i = 0; i < text.length; i++) {
            let t = text.charCodeAt(i);
            let tn: TrieNode3 = null;
            if (ptr == null) {
                tn = this._first[t];
            } else {
                tn = ptr.getChilden(t);
                if (tn == null) {
                    if (ptr.hasWildcard) {
                        this.findAll2(text, i + 1, ptr.wildcardNode, result);
                    }
                    tn = this._first[t];
                }
            }
            if (tn != null) {
                if (tn.isEnd) {
                    for (const item of tn.results) {
                        let length = this._keywordLength[item];
                        let s = i - length + 1;
                        if (s >= 0) {
                            let key = text.substring(s, length);
                            result.push(key);

                        }
                    }
                }
            }
            ptr = tn;
        }
        return result;
    }

    private findAll2(text: string, index: number, ptr: TrieNode3, result: Array<string>) {
        for (let i = index; i < text.length; i++) {
            let t = text.charCodeAt(i);
            let tn: TrieNode3 = ptr.getChilden(t);
            if (tn == null) {
                if (ptr.hasWildcard) {
                    this.findAll2(text, i + 1, ptr.wildcardNode, result);
                }
                return;
            }
            if (tn.isEnd) {
                for (const item of tn.results) {
                    let length = this._keywordLength[item];
                    let s = i - length + 1;
                    if (s >= 0) {
                        let key = text.substring(s, length);
                        result.push(key);
                    }
                }
            }
            ptr = tn;
        }
    }


    /**
     * 判断文本是否包含关键字
     * @param text
     * @returns
     */
    public containsAny(text: string) {
        let ptr: TrieNode3 = null;
        for (let i = 0; i < text.length; i++) {
            let t = text.charCodeAt(i);
            let tn: TrieNode3 = null;
            if (ptr == null) {
                tn = this._first[t];
            } else {
                tn = ptr.getChilden(t);
                if (tn == null) {
                    if (ptr.hasWildcard) {
                        let result = this.containsAny2(text, i + 1, ptr.wildcardNode);
                        if (result) {
                            return true;
                        }
                    }
                    tn = this._first[t];
                }
            }
            if (tn != null) {
                if (tn.isEnd) {
                    let length = this._keywordLength[tn.results[0]];
                    let s = i - length + 1;
                    if (s >= 0) {
                        return true;
                    }
                }
            }
            ptr = tn;
        }
        return false;
    }

    private containsAny2(text: string, index: number, ptr: TrieNode3) {
        for (let i = index; i < text.length; i++) {
            let t = text.charCodeAt(i);
            let tn: TrieNode3 = ptr.getChilden(t);
            if (tn == null) {
                if (ptr.hasWildcard) {
                    return this.containsAny2(text, i + 1, ptr.wildcardNode);
                }
                return false;
            }
            if (tn.isEnd) {
                let length = this._keywordLength[tn.results[0]];
                let s = i - length + 1;
                if (s >= 0) {
                    return true;
                }
            }
            ptr = tn;
        }
        return false;
    }

    /// <summary>
    /// 在文本中替换所有的关键字
    /// </summary>
    /// <param name="text">文本</param>
    /// <param name="replaceChar">替换符</param>
    /// <returns></returns>
    public replace(text: string, replaceChar: string = '*') {
        let result: string[] = text.split('');

        let ptr: TrieNode3 = null;
        for (let i = 0; i < text.length; i++) {
            let t = text.charCodeAt(i);
            let tn: TrieNode3 = null;
            if (ptr == null) {
                tn = this._first[t];
            } else {
                tn = ptr.getChilden(t)
                if (tn == null) {
                    if (ptr.hasWildcard) {
                        this.replace2(text, i + 1, ptr.wildcardNode, replaceChar, result);
                    }
                    tn = this._first[t];
                }
            }
            if (tn != null) {
                if (tn.isEnd) {
                    let maxLength = this._keywordLength[tn.results[0]];
                    let start = i + 1 - maxLength;
                    if (start >= 0) {
                        for (let j = start; j <= i; j++) {
                            result[j] = replaceChar;
                        }
                    }
                }
            }
            ptr = tn;
        }
        return result.join('');
    }

    private replace2(text: string, index: number, ptr: TrieNode3, replaceChar: string, result: string[]) {
        for (let i = index; i < text.length; i++) {
            let t = text.charCodeAt(i);
            let tn: TrieNode3 = ptr.getChilden(t);
            if (tn == null) {
                if (ptr.hasWildcard) {
                    this.replace2(text, i + 1, ptr.wildcardNode, replaceChar, result);
                }
                return;
            }
            if (tn.isEnd) {
                let maxLength = this._keywordLength[tn.results[0]];
                let start = i + 1 - maxLength;
                if (start >= 0) {
                    for (let j = start; j <= i; j++) {
                        result[j] = replaceChar;
                    }
                }
            }
            ptr = tn;
        }
    }
}
