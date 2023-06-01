
import ControllerBase from "../../Blade/Bases/ControllerBase";
import Controller from "../../Blade/Decorators/Controller";

/*
 * @作者: 0x2CA
 * @创建时间: 2023-03-15
 * @最后编辑时间: 2023-06-01
 * @最后编辑者: 0x2CA
 * @描述:
 */
@Controller("FindCtrl")
class FindCtrl extends ControllerBase {

    private mapping: Map<FindCtrl.FindType | string, cc.Node> = new Map<FindCtrl.FindType | string, cc.Node>();

    protected onInitialize() {
    }

    protected onDispose() {
    }

    public setNode(key: FindCtrl.FindType | string, node: cc.Node) {
        if (node != null && node.isValid == true) {
            this.mapping.set(key, node);
        }
    }

    public clearNode(key: FindCtrl.FindType | string) {
        this.mapping.delete(key);
    }

    public getNode(key: FindCtrl.FindType | string) {
        let node = this.mapping?.get(key);
        if (node != null && node.isValid == true) {
            return node;
        } else {
            this.mapping.delete(key);
        }
    }
}

namespace FindCtrl {
    export enum FindType {
    }
}

export default FindCtrl;