import ViewService from "./Services/ViewService";
import ControllerService from "./Services/ControllerService";
import NotificationService from "./Services/NotificationService";
import ModelService from "./Services/ModelService";
import CommandService from "./Services/CommandService";
import PlatformService from "./Services/PlatformService";
import TweenService from "./Services/TweenService";
import LocalizedService from "./Services/LocalizedService";
import TickerService from "./Services/TickerService";
import PopupService from "./Services/PopupService";
import PoolService from "./Services/PoolService";
import SceneService from "./Services/SceneService";
import TimerService from "./Services/TimerService";
import AudioService from "./Services/AudioService";
import ConfigService from "./Services/ConfigService";
import SingletonBase from "./Bases/SingletonBase";
import AssetService from "./Services/AssetService";
import LoadingController from "../Module/Controllers/LoadingController";


export default class Blade extends SingletonBase {

    public onInitialize() {

    }

    public onDispose() {

    }

    /**
     * 模型
     *
     * @memberof Blade
     */
    public get model() {
        return ModelService.getInstance();
    }

    /**
     * 视图
     *
     * @memberof Blade
     */
    public get view() {
        return ViewService.getInstance();
    }

    /**
     * 控制器
     *
     * @memberof Blade
     */
    public get ctrl() {
        return ControllerService.getInstance();
    }
    /**
     * 通知
     *
     * @memberof Blade
     */
    public get notice() {
        return NotificationService.getInstance();
    }
    /**
     * 命令
     *
     * @memberof Blade
     */
    public get cmd() {
        return CommandService.getInstance();
    }


    /**
     *平台
     *
     * @memberof Blade
     */
    public get platform() {
        return PlatformService.getInstance();
    }

    /**
     * 动画
     *
     * @memberof Blade
     */
    public get tween() {
        return TweenService.getInstance();
    }

    /**
     * 多语言
     *
     * @memberof Blade
     */
    public get locale() {
        return LocalizedService.getInstance();
    }


    /**
    * 计时器服务
    *
    * @memberof Blade
    */
    public get ticker() {
        return TickerService.getInstance();
    }

    /**
    * 时间服务
    *
    * @memberof Blade
    */
    public get timer() {
        return TimerService.getInstance();
    }

    /**
    * 弹窗服务
    *
    * @memberof Blade
    */
    public get popup() {
        return PopupService.getInstance();
    }

    /**
    * 对象池服务
    *
    * @memberof Blade
    */
    public get pool() {
        return PoolService.getInstance();
    }

    /**
    * 声音服务
    *
    * @memberof Blade
    */
    public get audio() {
        return AudioService.getInstance();
    }

    /**
    * 配置服务
    *
    * @memberof Blade
    */
    public get config() {
        return ConfigService.getInstance();
    }

    /**
    * 场景服务
    *
    * @memberof Blade
    */
    public get scene() {
        return SceneService.getInstance();
    }


    public get asset() {
        return AssetService.getInstance();
    }

}

declare global {
    const blade: Blade;
}

if (typeof blade == typeof undefined) {

    const blade = Blade.getInstance();
    (window as any).blade = blade;

    if (cc.sys.platform !== cc.sys.EDITOR_PAGE) {
        // App初始化
        cc.game.once(cc.game.EVENT_ENGINE_INITED, () => {

        });

        // 场景初次启动
        cc.director.on(cc.Director.EVENT_AFTER_SCENE_LAUNCH, (scene: cc.Scene) => {
            // 添加常驻节点
            let node = cc.find("Blade");
            if (node == null) {
                node = new cc.Node();
                node.name = "Blade";
                node.parent = scene;
            }

            // 更新常驻节点的位置和尺寸
            node.x = cc.winSize.width * 0.5;
            node.y = cc.winSize.height * 0.5;
            node.width = cc.winSize.width;
            node.height = cc.winSize.height;

            if (!cc.game.isPersistRootNode(node)) {
                cc.game.addPersistRootNode(node);
            }
        });

        // 延迟初始化
        cc.director.once(cc.Director.EVENT_AFTER_SCENE_LAUNCH, (scene: cc.Scene) => {
            ControllerService.getInstance().getController(LoadingController).openLoadingView();
        });

    } else {
        LocalizedService.getInstance();
    }
}

