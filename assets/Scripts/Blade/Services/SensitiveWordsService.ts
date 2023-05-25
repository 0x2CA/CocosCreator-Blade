/*
 * @作者: 0x2CA
 * @创建时间: 2023-02-09
 * @最后编辑时间: 2023-03-14
 * @最后编辑者: 0x2CA
 * @描述:
 */
import SingletonBase from "../Bases/SingletonBase";
import IllegalWordsSearch from "../Libs/ToolGoodWords/TextSearch/IllegalWordsSearch";

export default class SensitiveWordsService extends SingletonBase<SensitiveWordsService> {

    private _wordsSearch: IllegalWordsSearch = new IllegalWordsSearch();
    // private _wordsSearch: StringMatch = new StringMatch();
    // private _wordsSearch: StringSearch = new StringSearch();

    protected onInitialize() {
    }

    protected onDispose() {

    }

    public async initWordsAsync(progress: (finish: number, total: number) => void = null) {
        let count = 1;
        let asset: cc.JsonAsset = await blade.asset.loadAssetAsync("SensitiveWords.json", cc.JsonAsset, (finish, total) => {
            count = total + 1;
            if (progress != null) {
                progress(finish, total + 1);
            }
        });
        this._wordsSearch.setKeywords(asset.json);
        blade.asset.unloadAsset("SensitiveWords.json");
        progress(count, count);
    }

    public containsAny(text: string) {
        return this._wordsSearch.containsAny(text);
    }

    public findFirst(text: string) {
        return this._wordsSearch.findFirst(text);
    }

    public findAll(text: string) {
        return this._wordsSearch.findAll(text);
    }

    public replace(text: string, replaceChar: string = '*') {
        return this._wordsSearch.replace(text, replaceChar);
    }


}
