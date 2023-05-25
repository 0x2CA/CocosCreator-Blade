
export default class IllegalWordsSearchResult {

    public constructor(keyword: string, start: number, end: number, index: number, matchKeyword: string, type: number) {
        this.matchKeyword = matchKeyword;
        this.end = end;
        this.start = start;
        this.index = index;
        this.keyword = keyword;
        this.blacklistType = type;
    }

    /**
     * 开始位置
     */
    public start: number

    /**
     * 结束位置
     */
    public end: number

    /**
     * 原始文本
     */
    public keyword: string

    /**
     * 索引
     */
    public index: number

    /**
     * 关键字
     */
    public matchKeyword: string

    /**
     * 黑名单类型
     */
    public blacklistType: number

    public toString() {
        if (this.keyword != this.matchKeyword) {
            return this.start.toString() + "|" + this.keyword + "|" + this.matchKeyword;
        }
        return this.start.toString() + "|" + this.keyword;
    }
}