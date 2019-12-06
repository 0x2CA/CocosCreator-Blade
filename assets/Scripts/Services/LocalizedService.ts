import IService from "../Interfaces/IService";
import Service from "../Decorators/Service";
import Singleton from "../Decorators/Singleton";

/**
 * 多语言服务
 */
@Singleton
@Service("LocalizedService")
class LocalizedService extends cc.EventTarget implements IService {
    public alias: string;

    public static readonly instance: LocalizedService;

    private static readonly CURRENT_LANG_KEY = 'curLang';

    // 编辑器刷新间隔, 秒
    public readonly EditorRefreshInterval: number = 2;

    // 所有语言包
    private readonly langs: { [lang: string]: { [id: string]: string } } = {};
    // 当前语言
    private curLang: LocalizedService.LangType = null;

    private readonly langPath = 'Langs'

    public initialize(): void {
        //加载多语言配置
        this.loadFolder();

        // 初始化语言
        this.initLang();

    }

    public lazyInitialize(): void {
    }

    /**
     * 初始化语言
     */
    public initLang() {
        let sysLang = cc.sys.language
        let lang: LocalizedService.LangType;
        if (cc.sys.platform == cc.sys.EDITOR_PAGE) {
            lang = LocalizedService.LangType.zh_CN
        } else {
            lang = app.platform.getPlatform().getArchive(LocalizedService.CURRENT_LANG_KEY) as LocalizedService.LangType;
        }
        if (lang == null) {
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

        this.setLang(lang);
    }


    /**
     * 加载多国语言
     * @param lang 
     * @param data 
     */
    public load(lang: LocalizedService.LangType, data: { [key: string]: string }) {
        this.langs[lang] = data;
        if (lang == this.curLang) {
            app.locale.emit(LocalizedService.EventType.LanguageChange, lang);
        }
    }

    /**
     * 从目录加载多国语言json文件
     */
    public loadFolder() {
        cc.loader.loadResDir(this.langPath, (err, resource, urls) => {
            const jsonResList = resource as cc.JsonAsset[];
            for (const jsonRes of jsonResList) {
                this.load(jsonRes.name as any, jsonRes.json);
            }

            this.info();
        });
    }

    /**
     * 设置当前语言
     * @param lang 
     */
    public setLang(lang: LocalizedService.LangType) {
        if (lang != null && this.curLang != lang) {
            this.curLang = lang;
            app.locale.emit(LocalizedService.EventType.LanguageChange, lang);
            console.log("设置语言环境:", lang)
            if (cc.sys.platform != cc.sys.EDITOR_PAGE) {
                app.platform.getPlatform().saveArchive(LocalizedService.CURRENT_LANG_KEY, lang)
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
                console.log(name + ":", this.langs[name]);
            } else {
                console.log(`没有注册${name}语言`);
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

            console.log(info)
        }
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