import SingletonBase from "../Bases/SingletonBase";
import StringHelper from "../Helpers/StringHelper";

/**
 * 多语言服务
 */
class LocalizedService extends SingletonBase<LocalizedService> {

    private static readonly CURRENT_LANG_KEY = 'curLang';

    // 编辑器刷新间隔, 秒
    public readonly EditorRefreshInterval: number = 2;

    // 所有语言包
    private readonly _langs: { [lang: string]: { [id: string]: string } } = {};
    // 当前语言
    private _curLang: LocalizedService.LangType = null;

    private readonly _langPath = 'Langs'

    private _event: cc.EventTarget = new cc.EventTarget();

    protected onInitialize() {
        this.initLang();
    }

    protected onDispose() {
    }

    /**
     * 初始化语言
     */
    public initLang() {
        let sysLang = cc.sys.language
        let lang: string;
        if (cc.sys.platform == cc.sys.EDITOR_PAGE || cc.sys.platform == cc.sys.EDITOR_CORE) {
            lang = LocalizedService.LangType.zh_CN
        } else {
            let archive = blade.platform.getArchive();
            lang = archive.get(LocalizedService.CURRENT_LANG_KEY, null);
        }
        if (lang == null || lang == "") {
            switch (sysLang) {
                case cc.sys.LANGUAGE_CHINESE:
                    if (cc.sys.languageCode == "zh-tw") {
                        lang = LocalizedService.LangType.zh_TW
                    } else {
                        lang = LocalizedService.LangType.zh_CN
                    }
                    break;
                default:
                    lang = LocalizedService.LangType.en_US
                    break;
            }
        }

        this.setLang(lang as LocalizedService.LangType);
    }

    /**
     * 加载多国语言
     * @param lang
     * @param data
     */
    public load(lang: LocalizedService.LangType, data: { [key: string]: string }) {
        this._langs[lang] = data;
        if (lang == this._curLang) {
            console.log("多语言加载成功:", lang);
            this.emit(LocalizedService.EventType.LanguageChange, lang);
        }
    }

    /**
     * 判断是否有对应的语言包
     * @param lang
     * @returns
     */
    public hasLangConfig(lang: LocalizedService.LangType): boolean {
        return this._langs[lang] != null;
    }

    /**
     * 加载多国语言json文件
     */
    public async loadLangConfig(lang: LocalizedService.LangType, progress: (finish: number, total: number) => void = null) {
        let fileName = lang + ".json";
        let asset = await blade.asset.loadAssetAsync(fileName, cc.JsonAsset, progress);
        this.load(lang, asset.json);
        blade.asset.unloadAsset(fileName);
    }

    /**
     * 设置当前语言
     * @param lang
     */
    public setLang(lang: LocalizedService.LangType) {
        if (lang != null && this._curLang != lang) {
            console.log("设置语言环境:", lang)
            this._curLang = lang;
            this.emit(LocalizedService.EventType.LanguageChange, lang);
            if (cc.sys.platform != cc.sys.EDITOR_PAGE) {
                let archive = blade.platform.getArchive();
                archive.set(LocalizedService.CURRENT_LANG_KEY, lang)
            }
        }
    }

    /**
     * 获取当前设置的语言
     */
    public getLang() {
        return this._curLang;
    }

    /**
     * 获取文本ID对应的值
     * @param langID
     * @param params
     */
    public value(langID: string, ...params: any[]) {
        const langData = this._langs[this._curLang];
        let content = langData ? (langData[langID] || langID) : langID;
        return StringHelper.format(content, ...params);
    }

    /**
    * 打印信息
    * @param name
    */
    info(name?: string) {
        if (name) {
            if (this._langs[name] != null) {
                console.log(name + ":", this._langs[name]);
            } else {
                console.log(`没有注册${name}语言`);
            }
        } else {
            let info = "多语言信息:\n"

            for (const key in this._langs) {
                if (this._langs.hasOwnProperty(key)) {
                    const lang = this._langs[key];
                    info += "   " + key + "    ✔" + "\n";
                }
            }
            if (info == "多语言信息:\n") {
                info += "   没有注册语言";
            }

            console.log(info)
        }
    }

    public hasEventListener(type: string): boolean {
        return this._event.hasEventListener(type);
    }

    public emit(key: string, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any): void {
        this._event.emit(key, arg1, arg2, arg3, arg4, arg5);
    }

    public on<T extends Function>(type: string, callback: T, target?: any, useCapture?: boolean): T {
        return this._event.on(type, callback, target, useCapture);
    }

    public off(type: string, callback?: Function, target?: any): void {
        this._event.off(type, callback, target);
    }

    public targetOff(target: any): void {
        this._event.targetOff(target);
    }

    public once(type: string, callback: (arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any) => void, target?: any): void {
        this.on(type, callback, target, true);
    }

    public clear(): void {
        this._event.clear();
    }
}


namespace LocalizedService {
    export enum EventType {
        LanguageChange = "LanguageChange"
    }

    export enum LangType {
        zh_CN = "zh_CN",
        zh_TW = "zh_TW",
        en_US = "en_US"
    }
}

export default LocalizedService;
