import IFrameWork from "./Interfaces/IFrameWork";
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


export default class Blade extends IFrameWork {

    /**
     * 模型
     *
     * @memberof Blade
     */
    public readonly model = ModelService.instance
    /**
     * 视图
     *
     * @memberof Blade
     */
    public readonly view = ViewService.instance
    /**
     * 控制器
     *
     * @memberof Blade
     */
    public readonly ctrl = ControllerService.instance
    /**
     * 通知
     *
     * @memberof Blade
     */
    public readonly notice = NotificationService.instance
    /**
     * 命令
     *
     * @memberof Blade
     */
    public readonly cmd = CommandService.instance


    /**
     *平台
     *
     * @memberof Blade
     */
    public readonly platform = PlatformService.instance

    /**
     * 动画
     *
     * @memberof Blade
     */
    public readonly tween = TweenService.instance

    /**
     * 多语言
     *
     * @memberof Blade
     */
    public readonly locale = LocalizedService.instance


    /**
    * 计时器服务
    *
    * @memberof Blade
    */
    public readonly ticker = TickerService.instance

    /**
    * 时间服务
    *
    * @memberof Blade
    */
    public readonly timer = TimerService.instance

    /**
    * 弹窗服务
    *
    * @memberof Blade
    */
    public readonly popup = PopupService.instance

    /**
    * 对象池服务
    *
    * @memberof Blade
    */
    public readonly pool = PoolService.instance

    /**
    * 声音服务
    *
    * @memberof Blade
    */
    public readonly audio = AudioService.instance

    /**
    * 配置服务
    *
    * @memberof Blade
    */
    public readonly config = ConfigService.instance

    /**
    * 场景服务
    *
    * @memberof Blade
    */
    public readonly scene = SceneService.instance

}

declare global {
    const blade: Blade;
}

if (typeof blade == typeof undefined) {

    const blade = new Blade();
    (window as any).blade = blade;

    if (cc.sys.platform !== cc.sys.EDITOR_PAGE) {
        // App初始化
        cc.game.once(cc.game.EVENT_ENGINE_INITED, () => blade.initialize());

        // 场景初次启动
        cc.director.on(cc.Director.EVENT_AFTER_SCENE_LAUNCH, (scene: cc.Scene) => {
            // 添加常驻节点
            let node = cc.find("Blade");
            if (node == null) {
                node = new cc.Node();
                node.name = "Blade";
                node.parent = scene;
                node.group = "ui"
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
            blade.lazyInitialize()
        });

    } else {
        blade.locale.initialize();
    }
}

