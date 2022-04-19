import ViewBase from "../../../Blade/Bases/ViewBase";
import View from "../../../Blade/Decorators/View";
import NodeHelper from "../../../Blade/Helpers/NodeHelper";


const { ccclass, property } = cc._decorator;

@ccclass
@View("MainView")
export default class MainView extends ViewBase {

    public onInitialize() {
        this.node.parent = NodeHelper.getMainLayer();
    }

    public onDispose() {
    }

}
