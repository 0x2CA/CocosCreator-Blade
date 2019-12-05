import IApplication from "./Interfaces/IApplication";
import ViewService from "./Services/ViewService";
import ControllerService from "./Services/ControllerService";
import NotificationService from "./Services/NotificationService";
import ModelService from "./Services/ModelService";
import CommandService from "./Services/CommandService";
import PlatformService from "./Services/PlatformService";
import TweenService from "./Services/TweenService";
import LocalizedService from "./Services/LocalizedService";
import TickerService from "./Services/TickerService";
import ActionService from "./Services/ActionService";
import PopupService from "./Services/PopupService";
import PoolService from "./Services/PoolService";
import SceneService from "./Services/SceneService";
import TimerService from "./Services/TimerService";
import AudioService from "./Services/AudioService";
import ConfigService from "./Services/ConfigService";


export default class Application extends IApplication {

    /**
     * 模型
     *
     * @memberof Application
     */
    public readonly model = ModelService.instance
    /**
     * 视图
     *
     * @memberof Application
     */
    public readonly view = ViewService.instance
    /**
     * 控制器
     *
     * @memberof Application
     */
    public readonly ctrl = ControllerService.instance
    /**
     * 通知
     *
     * @memberof Application
     */
    public readonly notice = NotificationService.instance
    /**
     * 命令
     *
     * @memberof Application
     */
    public readonly cmd = CommandService.instance

    /**
    * 动作服务
    *
    * @memberof Application
    */
    public readonly action = ActionService.instance

    /**
     *平台
     *
     * @memberof Application
     */
    public readonly platform = PlatformService.instance

    /**
     * 动画
     *
     * @memberof Application
     */
    public readonly tween = TweenService.instance

    /**
     * 多语言
     *
     * @memberof Application
     */
    public readonly locale = LocalizedService.instance


    /**
    * 计时器服务
    *
    * @memberof Application
    */
    public readonly ticker = TickerService.instance

    /**
    * 时间服务
    *
    * @memberof Application
    */
    public readonly timer = TimerService.instance

    /**
    * 弹窗服务
    *
    * @memberof Application
    */
    public readonly popup = PopupService.instance

    /**
    * 对象池服务
    *
    * @memberof Application
    */
    public readonly pool = PoolService.instance

    /**
    * 声音服务
    *
    * @memberof Application
    */
    public readonly audio = AudioService.instance

    /**
    * 配置服务
    *
    * @memberof Application
    */
    public readonly config = ConfigService.instance

    /**
    * 场景服务
    *
    * @memberof Application
    */
    public readonly scene = SceneService.instance

}

declare global {
    const app: Application;
}

if (typeof app == typeof undefined) {

    const app = new Application();
    (window as any).app = app;

    if (cc.sys.platform !== cc.sys.EDITOR_PAGE) {
        // App初始化
        cc.game.once(cc.game.EVENT_ENGINE_INITED, () => app.initialize());

        // 场景初次启动
        cc.director.on(cc.Director.EVENT_AFTER_SCENE_LAUNCH, (scene: cc.Scene) => {
            // 添加常驻节点
            let node = cc.find("Application");
            if (node == null) {
                node = new cc.Node();
                node.name = "Application";
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
            app.lazyInitialize()
        });

    } else {
        app.locale.initialize();
    }
}

