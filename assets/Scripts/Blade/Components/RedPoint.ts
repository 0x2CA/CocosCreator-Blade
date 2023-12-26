import ViewBase from "../Bases/ViewBase";
import View from "../Decorators/View";


const {ccclass, property} = cc._decorator;

@ccclass
@View("RedPoint")
export default class RedPoint extends ViewBase {
    private redPointNode: cc.Node = null;

    private redPointIcon: string = "shop_bg_num02.png";

    protected onInitialize() {
        
    }
    protected onDispose() {
        
    }
    protected onShow() {
        
    }
    protected onHide() {
        
    }
    protected onRefresh(data: any) {
        
    }

    //设置红点位置
    public setRedPointPosition(pos: cc.Vec2) {
        this.redPointNode.setPosition(pos);
    }

    //设置红点icon
    public setRedPointIcon(icon: string = "") {
        if (icon && icon != "") {
            this.setSpriteFrame(this.redPointNode, icon);
        }
    }

    //设置红点状态
    public setRedPointState(state: boolean = false, pos: cc.Vec2 = new cc.Vec2(0, 0)) {
        if (this.redPointNode == null) {
            this.redPointNode = new cc.Node("redPoint");
            this.node.addChild(this.redPointNode);
            let sp = this.redPointNode.getComponent(cc.Sprite);
            if (!sp) {
                this.redPointNode.addComponent(cc.Sprite);
            }
            let nodeSize = this.node.getContentSize();
            this.setRedPointPosition(new cc.Vec2(nodeSize.width * 0.5 + pos.x, nodeSize.height * 0.5 + pos.y))
        }
        if (this.redPointNode) {
            this.setRedPointIcon(this.redPointIcon);
            this.redPointNode.active = state;
            this.redPointNode.scale = 1 / this.node.scale;
        }
    }
}
