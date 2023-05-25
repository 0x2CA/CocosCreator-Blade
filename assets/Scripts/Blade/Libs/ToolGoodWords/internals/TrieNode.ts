export default class TrieNode {
    public index: number = 0;
    public layer: number = 0;
    public isEnd: boolean = false;
    public charCode: number = 0;
    public results: Array<number> = new Array<number>();
    public childens: Map<number, TrieNode> = new Map<number, TrieNode>();
    public failure: TrieNode = null;
    public parent: TrieNode = null;
    public isWildcard: boolean = false;
    public wildcardLayer: number = 0;
    public hasWildcard: boolean = false;

    public addChilden(charCode: number) {
        let node: TrieNode = this.childens.get(charCode);
        if (node != null) {
            return node;
        }
        node = new TrieNode();
        node.parent = this;
        node.charCode = charCode;
        this.childens.set(charCode, node);
        return node;
    }

    public addResult(index: number) {
        if (this.isEnd == false) {
            this.isEnd = true;
        }
        this.results.push(index);
    }

}
