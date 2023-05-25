
import ViewBase from "../../../Blade/Bases/ViewBase";
import View from "../../../Blade/Decorators/View";
import NodeHelper from "../../../Blade/Helpers/NodeHelper";

const { ccclass, property } = cc._decorator;

/*
 * @作者: 0x2CA
 * @创建时间: 2023-03-15
 * @最后编辑时间: 2023-04-17
 * @最后编辑者: 0x2CA
 * @描述:
 */
@ccclass
@View("MainView")
export default class MainView extends ViewBase {

    protected onInitialize() {
        this.node.parent = NodeHelper.getMainLayer();
    }

    protected onDispose() {
    }

    protected onShow() {
    }

    protected onHide() {
    }

    protected onRefresh() {
    }

}