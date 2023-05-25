
export default class TrieNode2Ex {
    public index: number = 0;
    public isEnd: boolean = false;
    public results: Array<number> = new Array<number>();
    public childens: Map<number, TrieNode2Ex> = new Map<number, TrieNode2Ex>();
    // uint.MaxValue -> 4294967295
    public minCharCode = 4294967295;
    // uint.MinValue -> 0
    public maxCharCode = 0;

    public addChilden(charCode: number, node: TrieNode2Ex) {
        if (this.minCharCode > charCode) { this.minCharCode = charCode; }
        if (this.maxCharCode < charCode) { this.maxCharCode = charCode; }
        this.childens.set(charCode, node);
    }

    public addResult(index: number) {
        if (this.isEnd == false) {
            this.isEnd = true;
        }
        if (this.results.indexOf(index) == -1) {
            this.results.push(index);
        }
    }

    public hasChilden(charCode: number) {
        return this.childens.has(charCode);
    }

    // public getChilden(charCode: number) {
    //     if (this.minCharCode <= charCode && this.maxCharCode >= charCode) {
    //         return this.childens.get(charCode);
    //     }
    //     return null;
    // }
}