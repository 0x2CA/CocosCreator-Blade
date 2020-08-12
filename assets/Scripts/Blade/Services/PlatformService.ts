import IService from "../../Blade/Interfaces/IService";
import Service from "../../Blade/Decorators/Service";
import Singleton from "../../Blade/Decorators/Singleton";
import IPlatform from "../../Blade/Interfaces/IPlatform";
import WebPlatform from "../Platforms/WebPlatform";
import WxPlatform from "../Platforms/WxPlatform";
import QQPlatform from "../Platforms/QQPlatform";
import GPPlatform from "../Platforms/GPPlatform";

@Singleton
@Service("PlatformService")
class PlatformService implements IService {
    public alias: string;
    public static readonly instance: PlatformService;

    // 当前平台
    private platform: IPlatform;

    // 数据
    private data: any = null;

    public initialize(): void {
        switch (this.getType()) {
            case PlatformService.PlatformType.WX:
                this.platform = new WxPlatform();
                break;
            case PlatformService.PlatformType.QQ:
                this.platform = new QQPlatform();
                break;
            case PlatformService.PlatformType.ANDROID:
                this.platform = new GPPlatform();
                break;
            default:
                this.platform = new WebPlatform();
                break;
        }

        this.platform.initialize();
    }

    public lazyInitialize(): void {
        this.platform.lazyInitialize();
    }

    /**
     * 获取平台类型
     *
     * @readonly
     * @type {PlatformService.PlatformType}
     * @memberof PlatformService
     */
    public getType(): PlatformService.PlatformType {
        if (cc.sys.platform == cc.sys.ANDROID) {
            // Android
            return PlatformService.PlatformType.ANDROID;
        } else if (cc.sys.platform == cc.sys.IPHONE || cc.sys.platform == cc.sys.IPAD) {
            // iOS
            return PlatformService.PlatformType.IOS
        } else if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            if (window["qq"] != null) {
                // 手Q
                return PlatformService.PlatformType.QQ
            } else {
                // 微信小游戏
                return PlatformService.PlatformType.WX
            }
        } else if (window["FBInstant"] != null) {
            // Facebook instant game
            return PlatformService.PlatformType.FACEBOOK
        } else {
            // web
            return PlatformService.PlatformType.WEB
        }
    }


    /**
     * 获取当前平台对象
     */
    getPlatform(): IPlatform {
        return this.platform;
    }

    /**
    * 从本地读取存档
    */
    loadLocal() {
        try {
            const result = JSON.parse(blade.platform.getPlatform().getArchive('Archive'));
            return result;
        } catch (e) {
            return {};
        }
    }

    /**
     * 保存数据到本地
     */
    async saveLocal(data: any) {
        // 通过调用平台本地存档接口进行保存
        try {
            blade.platform.getPlatform().saveArchive('Archive', JSON.stringify(data));
        } catch (error) {
        }
    }


    /**
 * 获取指定键对应的值
 * 如果存档中找不到, 则返回默认值
 * @param key 
 */
    public get<T>(key: string): T {
        if (this.data == null) {
            this.data = this.loadLocal();
        }
        return this.data[key] == null ? null : this.data[key];
    }

    /**
     * 修改存到指定键名的值
     * @param key 
     * @param newValue 
     */
    public set(key: string, newValue: any) {
        if (this.data == null) {
            this.data = this.loadLocal();
        }
        const oldValue = this.data[key];
        if (oldValue && typeof oldValue != typeof newValue) {
            throw new Error('存档新值和旧值类型不一致, 忽略存入');
        }
        // 旧值和新值不是同一个
        if (oldValue !== newValue) {
            this.data[key] = newValue;
        }
        this.saveLocal(this.data);
    }


    public clear() {
        cc.warn("存档已经重置");
        this.data = {};
        this.saveLocal(this.data);
    }

}


namespace PlatformService {
    export enum PlatformType {
        WX,
        QQ,
        FACEBOOK,
        ANDROID,
        IOS,
        WEB
    }

    /**
    * 内置事件
    */
    export type EventType = IPlatform.EventType

}

export default PlatformService;
