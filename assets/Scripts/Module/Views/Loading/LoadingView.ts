import ViewBase from "../../../Blade/Bases/ViewBase";
import View from "../../../Blade/Decorators/View";
import NodeHelper from "../../../Blade/Helpers/NodeHelper";
import LocalizedLabel from "../../../Blade/Libs/Localized/LocalizedLabel";
import ControllerService from "../../../Blade/Services/ControllerService";
import LocalizedService from "../../../Blade/Services/LocalizedService";
import PlatformService from "../../../Blade/Services/PlatformService";
import TickerService from "../../../Blade/Services/TickerService";
import TweenService from "../../../Blade/Services/TweenService";
import LoadingController from "../../Controllers/LoadingController";
import MainController from "../../Controllers/MainController";

const { ccclass, property } = cc._decorator;

@ccclass
@View("LoadingView")
export default class LoadingView extends ViewBase {

    @property({
        type: cc.Node,
        tooltip: "加载容器",
    })
    loadingTips: cc.Node = null;

    @property({
        type: cc.Node,
        tooltip: "加载容器",
    })
    loadingContainer: cc.Node = null;

    @property({
        type: LocalizedLabel,
        tooltip: "加载状态标签",
    })
    labelStatus: LocalizedLabel = null;

    @property({
        type: cc.ProgressBar,
        tooltip: "加载进度",
    })
    progress: cc.ProgressBar = null;

    public async onInitialize() {
        this.node.parent = NodeHelper.getMainLayer();

        this.loadingTips.active = true;
        this.loadingContainer.active = false;

        if (CC_DEBUG) {
            this.parseUrl();
        }

        TweenService.getInstance().get(this.loadingTips, { loop: true }).set({ angle: 0 }).to({ angle: -360 }, 1000);

        await LocalizedService.getInstance().loadLangConfig(LocalizedService.getInstance().getLang());

        this.loadingTips.active = false;
        this.loadingContainer.active = true;

        this.progress.progress = 0;
        // 检查更新
        this.labelStatus.langID = "CHECKINGUPDATE";
        await blade.platform.getPlatform().checkForUpdate();
        this.progress.progress = 0.3;

        // 预加载
        await ControllerService.getInstance().getController(LoadingController).preloadAsset((progress) => {
            this.labelStatus.langID = "LOADING"
            this.progress.progress = 0.3 + 0.7 * progress;
        });

        this.close();

        ControllerService.getInstance().getController(MainController).openMainView();
    }

    public onDispose() {
        TweenService.getInstance().removeTweens(this.loadingTips);
    }

    /**
 * 解析地址参数
 */
    private parseUrl() {
        cc.warn(`=========================
地址栏参数说明：
reset: 重置存档 (1:重置)
time: 时间倍数
=========================`);

        const urlParam = PlatformService.getInstance().getPlatform().getLaunchOptions();

        // 地址栏附带启动参数检查
        // 存档重置
        if (urlParam["reset"] === "1") {
            PlatformService.getInstance().clear();
        }

        try {
            const timeScale = parseFloat(urlParam["time"]);
            TickerService.getInstance().timeScale = timeScale;
        } catch (e) { }
    }
}
