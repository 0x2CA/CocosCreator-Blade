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


    public initialize(): void {
        //加载多语言配置
        this.loadFolder();

        this.setLang(LocalizedService.LangType.zh_CN);

    }

    public lazyInitialize(): void {

    }
    public static readonly instance: LocalizedService;


    // 编辑器刷新间隔, 秒
    public readonly EditorRefreshInterval: number = 2;

    // 所有语言包
    private readonly langs: { [lang: string]: { [id: string]: string } } = {};
    // 当前语言
    private curLang: LocalizedService.LangType = null;

    constructor() {
        super();
    }

    /**
     * 加载多国语言
     * @param lang 
     * @param data 
     */
    public load(lang: LocalizedService.LangType, data: { [key: string]: string }) {
        this.langs[lang] = data;
        if (lang == this.curLang) {
            this.emit('LanguageChange', lang);
        }
    }

    /**
     * 从目录加载多国语言json文件
     */
    public loadFolder() {
        cc.loader.loadResDir('Langs', (err, resource, urls) => {
            const jsonResList = resource as cc.JsonAsset[];
            for (const jsonRes of jsonResList) {
                this.load(jsonRes.name as any, jsonRes.json);
            }
        });
    }

    /**
     * 设置当前语言
     * @param lang 
     */
    public setLang(lang: LocalizedService.LangType) {
        if (lang != null && this.curLang != lang) {
            this.curLang = lang;
            this.emit('LanguageChange', lang);
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
}


namespace LocalizedService {
    export enum LangType {
        zh_CN,
        zh_TW,
        en_US
    }
}

export default LocalizedService;