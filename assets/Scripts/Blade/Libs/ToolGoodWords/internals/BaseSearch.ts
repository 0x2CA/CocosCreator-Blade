import TrieNode from "./TrieNode";
import TrieNode2 from "./TrieNode2";

export default class BaseSearch {
    //'\uffff' -> 65535
    protected _first: TrieNode2[] = new Array<TrieNode2>(65535 + 1);
    protected _keywords: string[] = [];

    /**
     * 设置关键字
     * @param keywords
     */
    public setKeywords(keywords: string[]) {
        this._keywords = keywords;
        this.initTrieTree();
    }

    /**
     * 构建树
     */
    protected initTrieTree() {
        let root = new TrieNode();
        let allNodeLayers: Map<Number, TrieNode[]> = new Map<Number, TrieNode[]>();
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
            const nd = allNode[i];
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

        let allNode2: TrieNode2[] = new Array<TrieNode2>();
        for (let i = 0; i < allNode.length; i++) {
            allNode2.push(new TrieNode2());
        }
        for (let i = 0; i < allNode2.length; i++) {
            let oldNode = allNode[i];
            let newNode = allNode2[i];
            for (const item of oldNode.childens) {
                let charCode = item[0];
                let index = item[1].index;
                newNode.addChilden(charCode, allNode2[index]);
            }
            for (const item of oldNode.results) {
                newNode.addResult(item);
            }
            oldNode = oldNode.failure;
            while (oldNode != root) {
                for (const item of oldNode.childens) {
                    let charCode = item[0];
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

        //'\uffff' -> 65535
        let first: TrieNode2[] = new Array<TrieNode2>(65535 + 1);
        for (const item of allNode2[0].childens) {
            first[item[0]] = item[1];
        }
        this._first = first;
    }

}