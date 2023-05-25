import IntDictionary from "./IntDictionary";
import TrieNode from "./TrieNode";
import TrieNode2Ex from "./TrieNode2Ex";

export default class BaseSearchEx {
    protected _dict: number[] = [];
    protected _first: number[] = [];
    protected _min: number[] = [];
    protected _max: number[] = [];

    protected _nextIndex: IntDictionary[] = [];
    protected _end: number[] = [];
    protected _resultIndex: number[] = [];
    protected _keywords: string[] = [];

    /**
     * 设置关键字
     * @param keywords
     */
    public setKeywords(keywords: string[]) {
        this._keywords = keywords;
        this.initTrie();
    }

    private initTrie() {
        let root = new TrieNode();
        let allNodeLayers: Map<number, TrieNode[]> = new Map<number, TrieNode[]>();
        for (let i = 0; i < this._keywords.length; i++) {
            let p = this._keywords[i];
            let nd = root;
            for (let j = 0; j < p.length; j++) {
                nd = nd.addChilden(p.charCodeAt(j));
                if (nd.layer == 0) {
                    nd.layer = j + 1;
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

        let allNode: TrieNode[] = new Array<TrieNode>(root);
        for (const trieNodes of allNodeLayers) {
            for (const nd of trieNodes[1]) {
                allNode.push(nd);
            }
        }
        allNodeLayers = null;


        for (let i = 1; i < allNode.length; i++) {
            let nd = allNode[i];
            nd.index = i;
            let r: TrieNode = nd.parent.failure;
            let c: number = nd.charCode;
            while (r != null && !r.childens.has(c)) {
                r = r.failure;
            }
            if (r == null)
                nd.failure = root;
            else {
                nd.failure = r.childens.get(c);
                for (const result of nd.failure.results) {
                    nd.addResult(result);
                }
            }
        }
        root.failure = root;

        let keywords: number[] = new Array<number>();
        for (let i = 1; i < allNode.length; i++) {
            keywords.push(allNode[i].charCode);
        }
        let length = this.createDict(keywords);
        keywords = null;


        let allNode2 = new Array<TrieNode2Ex>();
        for (let i = 0; i < allNode.length; i++) {
            let node = new TrieNode2Ex();
            node.index = i;
            allNode2.push(node);
        }
        for (let i = 0; i < allNode2.length; i++) {
            let oldNode = allNode[i];
            let newNode = allNode2[i];

            for (const item of oldNode.childens) {
                let charCode = this._dict[item[0]];
                let index = item[1].index;
                newNode.addChilden(charCode, allNode2[index]);
            }
            for (const item of oldNode.results) {
                newNode.addResult(item);
            }
            oldNode = oldNode.failure;
            while (oldNode != root) {
                for (const item of oldNode.childens) {
                    let charCode = this._dict[item[0]];
                    let index = item[1].index;
                    if (newNode.hasChilden(charCode) == false) {
                        newNode.addChilden(charCode, allNode2[index]);
                    }
                }
                for (const item of oldNode.results) {
                    newNode.addResult(item);
                }
                oldNode = oldNode.failure;
            }
        }
        allNode = null;
        root = null;

        let min = new Array<number>();
        let max = new Array<number>();
        let nextIndexs = new Array<Map<number, number>>();
        let end = new Array<number>();
        end.push(0);
        let resultIndex = new Array<number>();
        for (let i = 0; i < allNode2.length; i++) {
            let dict = new Map<number, number>();
            let node = allNode2[i];
            min.push(node.minCharCode);
            max.push(node.maxCharCode);

            if (i > 0) {
                for (const item of node.childens) {
                    dict.set(item[0], item[1].index);
                }
            }
            for (const item of node.results) {
                resultIndex.push(item);
            }
            end.push(resultIndex.length);
            nextIndexs.push(dict);
        }
        //'\uffff' -> 65535
        let first = new Array<number>(65535 + 1);
        for (const item of allNode2[0].childens) {
            first[item[0]] = item[1].index;
        }

        this._first = first;
        this._min = min;
        this._max = max;
        this._nextIndex = new Array<IntDictionary>(nextIndexs.length);
        for (let i = 0; i < nextIndexs.length; i++) {
            let dictionary: IntDictionary = new IntDictionary();
            dictionary.init2(nextIndexs[i]);
            //dictionary.SetDictionary(nextIndexs[i]);
            this._nextIndex[i] = dictionary;
        }
        this._end = end;
        this._resultIndex = resultIndex;

        allNode2 = null;
    }


    private createDict(keywords: number[]) {
        let dictionary: Map<number, number> = new Map<number, number>();
        for (const item of keywords) {
            if (dictionary.has(item)) {
                dictionary.set(item, dictionary.get(item) + 1);
            } else {
                dictionary.set(item, 1);
            }
        }
        let list = Array.from(dictionary.keys()).sort((a, b) => {
            return dictionary.get(b) - dictionary.get(a);
        });

        let list2 = new Array<number>();
        let sh = false;
        for (const item of list) {
            if (sh) {
                list2.push(item);
            } else {
                list2.unshift(item);
            }
            sh = !sh;
        }

        //'\uffff' -> 65535
        this._dict = new Array(65535 + 1);
        for (let i = 0; i < list2.length; i++) {
            this._dict[list2[i]] = i + 1;
        }
        return dictionary.size;
    }
}
