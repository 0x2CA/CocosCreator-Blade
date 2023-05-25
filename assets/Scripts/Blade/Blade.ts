import SingletonBase from "./Bases/SingletonBase";
import AssetService from "./Services/AssetService";
import AudioService from "./Services/AudioService";
import CommandService from "./Services/CommandService";
import ConfigService from "./Services/ConfigService";
import ControllerService from "./Services/ControllerService";
import LocalizedService from "./Services/LocalizedService";
import ModelService from "./Services/ModelService";
import NotificationService from "./Services/NotificationService";
import PlatformService from "./Services/PlatformService";
import PoolService from "./Services/PoolService";
import SceneService from "./Services/SceneService";
import SensitiveWordsService from "./Services/SensitiveWordsService";
import SocketService from "./Services/SocketService";
import TickerService from "./Services/TickerService";
import TimerService from "./Services/TimerService";
import TweenService from "./Services/TweenService";
import ViewService from "./Services/ViewService";

export default class Blade extends SingletonBase<Blade> {

    protected onInitialize() {

    }

    protected onDispose(): void {

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

    /**
     * 资源服务
     */
    public get asset() {
        return AssetService.getInstance();
    }

    /**
     * 敏感字过滤服务
     */
    public get words() {
        return SensitiveWordsService.getInstance();
    }

    /**
     * 网络连接
     */
    public get socket() {
        return SocketService.getInstance();
    }

}
