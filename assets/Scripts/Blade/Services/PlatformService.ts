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
