

import ViewBase from "../../../Blade/Bases/ViewBase";
import View from "../../../Blade/Decorators/View";
import NodeHelper from "../../../Blade/Helpers/NodeHelper";

const { ccclass, property } = cc._decorator;

/*
 * @作者: 0x2CA
 * @创建时间: 2023-03-15
 * @最后编辑时间: 2023-05-16
 * @最后编辑者: 0x2CA
 * @描述:
 */
@ccclass
@View("UIWaitView")
export default class UIWaitView extends ViewBase {

    @property(cc.Node)
    private waitTips: cc.Node = null;

    protected onInitialize() {
        this.node.parent = NodeHelper.getTopLayer();

        this.waitTips.active = true;
        blade.tween.get(this.waitTips)
            .set({ angle: 0 })
            .to({ angle: -360 }, 1000)
            .setLoop(true);

    }

    protected onDispose() {
        blade.tween.removeTweens(this.waitTips);
    }

    protected onShow() {
    }

    protected onHide() {
    }

    protected onRefresh() {
    }

}