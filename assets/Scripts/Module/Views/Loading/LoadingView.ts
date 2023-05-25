
import ViewBase from "../../../Blade/Bases/ViewBase";
import View from "../../../Blade/Decorators/View";
import NodeHelper from "../../../Blade/Helpers/NodeHelper";
import LoadingCtrl from "../../Controllers/LoadingCtrl";
import UICtrl from "../../Controllers/UICtrl";
import GameConfig from "../../Defines/GameConfig";

const { ccclass, property } = cc._decorator;
/*
 * @作者: 0x2CA
 * @创建时间: 2023-02-09
 * @最后编辑时间: 2023-05-16
 * @最后编辑者: 0x2CA
 * @描述:
 */
@ccclass
@View("LoadingView")
export default class LoadingView extends ViewBase {

    @property(cc.Label)
    private version: cc.Label = null;

    @property(cc.Sprite)
    private backGround: cc.Sprite = null;

    @property(cc.Node)
    private waitTips: cc.Node = null;

    @property(cc.ProgressBar)
    private progressBar: cc.ProgressBar = null;

    protected onInitialize() {
        this.node.parent = NodeHelper.getMainLayer();

        this.waitTips.active = true;
        blade.tween.get(this.waitTips)
            .set({ angle: 0 })
            .to({ angle: -360 }, 1000)
            .setLoop(true);

        this.progressBar.totalLength = this.progressBar.barSprite.node.width;
        this.progressBar.progress = 0;
        this.progressBar.node.active = false;

        NodeHelper.fillSpriteByWinSize(this.backGround);

        this.version.string = GameConfig.version;
    }

    protected onDispose() {
        blade.tween.removeTweens(this.waitTips);
    }

    protected onShow() {
    }

    protected onHide() {
    }

    protected onRefresh() {
        this.load();
    }

    private async load() {
        // 检查更新
        await blade.platform.get().checkForUpdate();

        // 预加载
        await blade.ctrl.get(LoadingCtrl).preload((progress) => {
            this.onPreload(progress);
        });

        // 进入登录页面
        blade.ctrl.get(UICtrl).open(UICtrl.ViewStatus.Login);
    }

    private onPreload(progress: number) {
        this.waitTips.active = false;
        this.progressBar.node.active = true;
        this.progressBar.progress = progress;
    }

}
