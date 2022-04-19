import SingletonBase from "../Bases/SingletonBase";
import AssetService from "./AssetService";
import PlatformService from "./PlatformService";

/**
 * 多语言服务
 */
class LocalizedService extends SingletonBase {

    private static readonly CURRENT_LANG_KEY = 'curLang';

    // 编辑器刷新间隔, 秒
    public readonly EditorRefreshInterval: number = 2;

    // 所有语言包
    private readonly langs: { [lang: string]: { [id: string]: string } } = {};
    // 当前语言
    private curLang: LocalizedService.LangType = null;

    private readonly langPath = 'Langs'

    private event: cc.EventTarget = new cc.EventTarget();

    public onInitialize() {
        this.initLang();
    }

    public onDispose() {
    }

    /**
     * 初始化语言
     */
    public initLang() {
        let sysLang = cc.sys.language
        let lang: string;
        if (cc.sys.platform == cc.sys.EDITOR_PAGE) {
            lang = LocalizedService.LangType.zh_CN
        } else {
            lang = PlatformService.getInstance().getPlatform().getArchive(LocalizedService.CURRENT_LANG_KEY);
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
        this.langs[lang] = data;
        if (lang == this.curLang) {
            console.log("多语言加载成功:", lang, data);
            this.emit(LocalizedService.EventType.LanguageChange, lang);
        }
    }

    /**
     * 加载多国语言json文件
     */
    public async loadLangConfig(lang: LocalizedService.LangType) {
        let asset = await AssetService.getInstance().loadAssetAsync(lang + ".json", cc.JsonAsset) as cc.JsonAsset;
        this.load(lang, asset.json);
        AssetService.getInstance().unloadAsset(lang + ".json");
    }

    /**
     * 设置当前语言
     * @param lang
     */
    public setLang(lang: LocalizedService.LangType) {
        if (lang != null && this.curLang != lang) {
            cc.log("设置语言环境:", lang)
            this.curLang = lang;
            this.emit(LocalizedService.EventType.LanguageChange, lang);
            if (cc.sys.platform != cc.sys.EDITOR_PAGE) {
                PlatformService.getInstance().getPlatform().saveArchive(LocalizedService.CURRENT_LANG_KEY, lang)
            }
        }
    }

    /**
     * 获取当前设置的语言
     */
    public getLang() {
        return this.curLang;
    }

    /**
     * 获取文本ID对应的值
     * @param langID
     * @param params
     */
    public value(langID: string, ...params: any[]) {
        const langData = this.langs[this.curLang];
        let content = langData ? (langData[langID] || langID) : langID;
        if (params && params.length > 0) {
            content = content.replace(/\{(\d+)\}/g, (match, number) => {
                return number in params ? params[number] : match;
            });
        }
        return content;
    }

    /**
    * 打印信息
    * @param name
    */
    info(name?: string) {
        if (name) {
            if (this.langs[name] != null) {
                cc.log(name + ":", this.langs[name]);
            } else {
                cc.log(`没有注册${name}语言`);
            }
        } else {
            let info = "多语言信息:\n"

            for (const key in this.langs) {
                if (this.langs.hasOwnProperty(key)) {
                    const lang = this.langs[key];
                    info += "   " + key + "    ✔" + "\n";
                }
            }
            if (info == "多语言信息:\n") {
                info += "   没有注册语言";
            }

            cc.log(info)
        }
    }

    public hasEventListener(type: string): boolean {
        return this.event.hasEventListener(type);
    }

    public emit(key: string, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any): void {
        this.event.emit(key, arg1, arg2, arg3, arg4, arg5);
    }

    public on<T extends Function>(type: string, callback: T, target?: any, useCapture?: boolean): T {
        return this.event.on(type, callback, target, useCapture);
    }

    public off(type: string, callback?: Function, target?: any): void {
        this.event.off(type, callback, target);
    }

    public targetOff(target: any): void {
        this.event.targetOff(target);
    }

    public once(type: string, callback: (arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any) => void, target?: any): void {
        this.on(type, callback, target, true);
    }

    public clear(): void {
        this.event.clear();
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
