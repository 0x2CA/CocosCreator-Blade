import TrieNode from "./TrieNode";
import TrieNode3 from "./TrieNode3";

export default class BaseMatch {
    protected _first: TrieNode3[] = [];
    protected _keywordLength: number[] = [];
    protected _keywordIndex: number[] = [];
    protected _matchKeywords: string[] = [];

    protected buildFirstLayerTrieNode(keywords: string[]) {
        let root = new TrieNode();

        let allNodeLayers: Map<number, TrieNode[]> = new Map<number, TrieNode[]>();
        // 第一次关键字
        for (let i = 0; i < keywords.length; i++) {
            let p = keywords[i];
            let nd = root;
            let start = 0;
            while (p.charCodeAt(start) == 0) { // 0 为 通配符
                start++;
            }
            for (let j = start; j < p.length; j++) {
                nd = nd.addChilden(p.charCodeAt(j));
                if (nd.layer == 0) {
                    nd.layer = j + 1 - start;
                    let trieNodes: TrieNode[] = allNodeLayers.get(nd.layer);
                    if (trieNodes == null) {
                        trieNodes = new Array<TrieNode>();
                        allNodeLayers.set(nd.layer, trieNodes);
                    }
                    trieNodes.push(nd);
                }
            }
            nd.addResult(i);
        }

        // 第二次关键字 通配符
        for (let i = 0; i < keywords.length; i++) {
            let p = keywords[i];
            if (p.indexOf('\x00') == -1) {
                continue;
            }
            let start = 0;
            while (p.charCodeAt(start) == 0) { // 0 为 通配符
                start++;
            }
            let trieNodes: TrieNode[] = new Array<TrieNode>(root);

            for (let j = start; j < p.length; j++) {
                let newTrieNodes: TrieNode[] = new Array<TrieNode>();
                let c = p.charCodeAt(j);
                if (c == 0) {
                    for (const nd of trieNodes) {
                        newTrieNodes.push(...nd.childens.values());
                    }
                } else {
                    for (const nd of trieNodes) {
                        let nd2 = nd.addChilden(c);
                        if (nd2.layer == 0) {
                            nd2.layer = j + 1 - start;
                            let tnodes: TrieNode[] = allNodeLayers.get(nd2.layer);
                            if (tnodes == null) {
                                tnodes = new Array<TrieNode>();
                                allNodeLayers.set(nd.layer, tnodes);
                            }
                            tnodes.push(nd2);
                        }
                        newTrieNodes.push(nd2);
                    }
                }
                trieNodes = newTrieNodes;
            }
            for (const nd of trieNodes) {
                nd.addResult(i);
            }
        }

        // 添加到 allNode
        let allNode: TrieNode[] = new Array<TrieNode>(root);
        for (const trieNodes of allNodeLayers) {
            for (const nd of trieNodes[1]) {
                allNode.push(nd);
            }
        }
        allNodeLayers = null;

        // 第一次 Set Failure
        for (let i = 1; i < allNode.length; i++) {
            let nd = allNode[i];
            nd.index = i;
            let r: TrieNode = nd.parent.failure;
            let c = nd.charCode;
            while (r != null && !r.childens.has(c)) {
                r = r.failure;
            }
            if (r == null)
                nd.failure = root;
            else {
                nd.failure = r.childens.get(c);
                for (const result of nd.failure.results) {
                    nd.addChilden(result);
                }
            }
        }

        // 第二次 Set Failure
        for (let i = 1; i < allNode.length; i++) {
            let nd = allNode[i];
            if (nd.layer == 1) { continue; }
            if (nd.childens.has(0)) {
                nd.hasWildcard = true;
            }
            if (nd.failure.hasWildcard) {
                nd.hasWildcard = true;
            }
            if (nd.charCode == 0) {
                nd.isWildcard = true;
                continue;
            } else if (nd.parent.isWildcard) {
                nd.isWildcard = true;
                nd.wildcardLayer = nd.parent.wildcardLayer + 1;
                if (nd.failure != root) {
                    if (nd.failure.layer <= nd.wildcardLayer) {
                        nd.failure = root;
                    }
                }
                continue;
            }
        }
        root.failure = root;

        return allNode;
    }

    protected hasMatch(keyword: string) {
        for (let i = 0; i < keyword.length; i++) {
            let c = keyword.charCodeAt(i);
            let match = ".?\\[("
            for (let j = 0; j < match.length; j++) {
                if (c == match.charCodeAt(j)) {
                    return true;
                }
            }
        }
        return false;
    }

    private format(str: string, ...params: any[]) {
        let content = str;
        if (params && params.length > 0) {
            content = content.replace(/\{(\d+)\}/g, (match, number) => {
                return number in params ? params[number] : match;
            });
        }
        return content;
    }

    protected matchKeywordBuild(keyword: string) {
        let stringBuilder: string[] = new Array<string>();

        let parameterDict: Map<number, string[]> = new Map<number, string[]>();

        BaseMatch.separateParameters(keyword, stringBuilder, parameterDict);

        if (parameterDict.size == 0) {
            return new Array<string>(stringBuilder.join(''));
        }
        let parameters: string[] = new Array<string>();
        BaseMatch.keywordBuild(parameterDict, 0, parameterDict.size - 1, "", parameters);
        let keywordFmt = stringBuilder.join('');
        let list: Set<string> = new Set<string>();
        for (const item of parameters) {
            list.add(this.format(keywordFmt, ...item.split('\x01')));
        }
        return Array.from(list);
    }

    private static separateParameters(keyword: string, stringBuilder: string[], parameterDict: Map<number, string[]>) {
        let index = 0;
        let parameterIndex = 0;

        while (index < keyword.length) {
            let c = keyword.charAt(index);
            if (c == '.') {
                if (index + 1 < keyword.length && keyword.charAt(index + 1) == '?') {
                    parameterDict.set(parameterIndex, new Array<string>("", "\x00"));
                    stringBuilder.push("{" + parameterIndex + "}");
                    parameterIndex++;
                    index += 2;

                } else {
                    stringBuilder.push("\x00");
                    index++;
                }
            } else if (c == '\\') {
                if (index + 2 < keyword.length && keyword.charAt(index + 2) == '?') {
                    parameterDict.set(parameterIndex, new Array<string>("", keyword.charAt(index + 1)));
                    stringBuilder.push("{" + parameterIndex + "}");
                    parameterIndex++;
                    index += 3;
                } else if (index + 1 < keyword.length) {
                    stringBuilder.push(keyword.charAt(index + 1));
                    index += 2;
                } else {
                    throw new Error(`【${keyword}】出错了，最后一位为\\`);
                }
            } else if (c == '[') {
                index++;
                let ps = new Array<string>();
                while (index < keyword.length) {
                    c = keyword[index];
                    if (c == ']') {
                        break;
                    } else if (c == '\\') {
                        if (index + 1 < keyword.length) {
                            ps.push(keyword.charAt(index + 1));
                            index += 2;
                        }
                    } else {
                        ps.push(c);
                        index++;
                    }
                }
                if (c != ']') {
                    throw new Error(`【${keyword}】出错了，最后一位不为]`);
                }
                if (index + 1 < keyword.length && keyword.charAt(index + 1) == '?') {
                    ps.unshift("");
                    parameterDict.set(parameterIndex, ps);
                    stringBuilder.push("{" + parameterIndex + "}");
                    parameterIndex++;
                    index += 2;
                } else {
                    parameterDict.set(parameterIndex, ps);
                    stringBuilder.push("{" + parameterIndex + "}");
                    parameterIndex++;
                    index++;
                }
            } else if (c == '(') {
                index++;
                let ps = new Array<string>();
                let words = "";
                while (index < keyword.length) {
                    c = keyword.charAt(index);
                    if (c == ')') {
                        break;
                    } else if (c == '|') {
                        ps.push(words);
                        words = "";
                        index++;
                    } else if (c == '\\') {
                        if (index + 1 < keyword.length) {
                            words += keyword[index + 1];
                            index += 2;
                        }
                    } else {
                        words += c;
                        index++;
                    }
                }
                ps.push(words);
                if (c != ')') {
                    throw new Error(`【${keyword}】出错了，最后一位不为)`);
                }
                if (index + 1 < keyword.length && keyword.charAt(index + 1) == '?') {
                    ps.unshift("");
                    parameterDict.set(parameterIndex, ps);
                    stringBuilder.push("{" + parameterIndex + "}");
                    parameterIndex++;
                    index += 2;
                } else {
                    parameterDict.set(parameterIndex, ps);
                    stringBuilder.push("{" + parameterIndex + "}");
                    parameterIndex++;
                    index++;
                }
            } else {
                if (index + 1 < keyword.length && keyword.charAt(index + 1) == '?') {
                    parameterDict.set(parameterIndex, new Array<string>("", c));
                    stringBuilder.push("{" + parameterIndex + "}");
                    parameterIndex++;
                    index += 2;
                } else {
                    if (c == '{') {
                        stringBuilder.push("{{");
                    } else if (c == '}') {
                        stringBuilder.push("}}");
                    } else {
                        stringBuilder.push(c);
                    }
                    index++;
                }
            }
        }
    }

    private static keywordBuild(parameterDict: Map<number, string[]>, index: number, end: number, keyword: string, result: string[]) {
        const span: string = "\x01";
        let list = parameterDict.get(index);
        if (index == end) {
            for (const item of list) {
                result.push((keyword + span + item).substring(1));
            }
        } else {
            for (const item of list) {
                BaseMatch.keywordBuild(parameterDict, index + 1, end, keyword + span + item, result);
            }
        }
    }


    /// <summary>
    /// 设置关键字
    /// </summary>
    /// <param name="keywords">关键字列表</param>
    public setKeywords(keywords: string[]) {
        this._matchKeywords = keywords;
        let newKeyword = new Array<string>();
        let newKeywordLength = new Array<number>();
        let newKeywordIndex = new Array<number>();
        let index = 0;
        for (const keyword of keywords) {
            if (this.hasMatch(keyword) == false) {
                newKeyword.push(keyword);
                newKeywordLength.push(keyword.length);
                newKeywordIndex.push(index);
            } else {
                let list = this.matchKeywordBuild(keyword);
                for (const item of list) {
                    newKeyword.push(item);
                    newKeywordLength.push(item.length);
                    newKeywordIndex.push(index);
                }
            }
            index++;
        }
        this._keywordLength = newKeywordLength;
        this._keywordIndex = newKeywordIndex;

        this.setKeywords2(newKeyword);
    }

    protected setKeywords2(keywords: string[]) {
        let allNode = this.buildFirstLayerTrieNode(keywords);

        let root: TrieNode = allNode[0];

        let allNode2 = new Array<TrieNode3>();
        for (let i = 0; i < allNode.length; i++) {
            allNode2.push(new TrieNode3());
        }

        for (let i = 0; i < allNode2.length; i++) {
            let oldNode = allNode[i];
            let newNode = allNode2[i];

            for (const item of oldNode.childens) {
                let charCode = item[0];
                let index = item[1].index;
                if (charCode == 0) {
                    newNode.hasWildcard = true;
                    newNode.wildcardNode = allNode2[index];
                    continue;
                }
                newNode.addChilden(charCode, allNode2[index]);
            }
            for (const item of oldNode.results) {
                if (oldNode.isWildcard) {
                    if (keywords[item].length > oldNode.wildcardLayer) {
                        newNode.addResult(item);
                    }
                } else {
                    newNode.addResult(item);
                }
                //newNode.SetResults(item);
            }

            let failure = oldNode.failure;
            while (failure != root) {
                if (oldNode.isWildcard && failure.layer <= oldNode.wildcardLayer) {
                    break;
                }
                for (const item of failure.childens) {
                    let charCode = item[0];
                    let index = item[1].index;
                    if (charCode == 0) {
                        newNode.hasWildcard = true;
                        if (newNode.wildcardNode == null) {
                            newNode.wildcardNode = allNode2[index];
                        }
                        continue;
                    }
                    if (newNode.hasChilden(charCode) == false) {
                        newNode.addChilden(charCode, allNode2[index]);
                    }
                }
                for (const item of failure.results) {
                    if (oldNode.isWildcard) {
                        if (keywords[item].length > oldNode.wildcardLayer) {
                            newNode.addResult(item);
                        }
                    } else {
                        newNode.addResult(item);
                    }
                }
                failure = failure.failure;
            }
        }

        allNode = null;
        root = null;

        //let root2 = allNode2[0];

        //'\uffff' -> 65535
        let first: TrieNode3[] = new Array<TrieNode3>(65535 + 1);
        for (const item of allNode2[0].childens) {
            first[item[0]] = item[1];
        }
        this._first = first;
    }

}