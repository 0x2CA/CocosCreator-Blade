import ViewBase from "../Bases/ViewBase";
import View from "../Decorators/View";
import Tween from "../Libs/Tween/Tween";


const { ccclass, property } = cc._decorator;

@ccclass
@View("RedPoint")
export default class RedPoint extends ViewBase {
    private redPointNode: cc.Node = null;

    private redPointIcon: string = "shop_bg_num02.png";
    private startScale = 1;
    private startOffsetY = 0;

    private _isInit: boolean = false;

    protected onInitialize() {
        this._isInit = true;
    }

    protected onDispose() {
        if (this.redPointNode != null) {
            blade.tween.removeTweens(this.redPointNode);
        }
    }

    protected onShow() {
        if (this._isInit == true) {
            this.setState(this._state);
        }
    }

    protected onHide() {
    }

    protected onRefresh(data: any) {
    }

    //设置红点位置
    public setRedPointPosition(pos: cc.Vec2) {
        // this.redPointNode.setPosition(pos);
        this.redPointNode.x = pos.x;
        this.redPointNode.y = pos.y;
        this.startOffsetY = pos.y;
    }

    //设置红点icon
    public setRedPointIcon(icon: string = "") {
        if (icon && icon != "") {
            this.setSpriteFrame(this.redPointNode, icon);
        }
    }

    private _state: boolean = false;

    //设置红点状态
    public setRedPointState(state: boolean = false, offset: cc.Vec2 = new cc.Vec2(0, 0)) {
        if (cc.isValid(this, true)) {
            this._state = state;
            if (this.redPointNode == null) {
                this.redPointNode = new cc.Node("redPoint");
                this.node.addChild(this.redPointNode);
                let sp = this.redPointNode.getComponent(cc.Sprite);
                if (!sp) {
                    this.redPointNode.addComponent(cc.Sprite);
                }
            }
            if (this.redPointNode != null) {
                this.redPointNode.active = state;
                this.redPointNode.scale = 1 / this.node.scale;
                this.startScale = 1 / this.node.scale;
                let nodeSize = this.node.getContentSize();
                this.setRedPointPosition(new cc.Vec2(
                    nodeSize.width * (1 - this.node.anchorX) + offset.x,
                    nodeSize.height * (1 - this.node.anchorY) + offset.y
                ));
            }
            if (this._isInit == true) {
                this.setState(state);
            }
        }
    }

    private setState(state: boolean = false) {
        if (cc.isValid(this, true)) {
            if (this._isInit == true) {
                if (this.redPointNode != null) {
                    this.setRedPointIcon(this.redPointIcon);
                    if (state) {
                        this.showAnimation();
                    }
                    else {
                        blade.tween.removeTweens(this.redPointNode);
                    }
                }
            }
        }
    }

    private showAnimation() {
        if (cc.isValid(this, true)) {
            if (this._isInit == true) {
                if (this.redPointNode != null) {
                    blade.tween.removeTweens(this.redPointNode);
                    let tween = blade.tween.get(this.redPointNode)
                        .set({ scaleY: this.startScale, y: this.startOffsetY })
                        .to({ scaleY: this.startScale * 1.2, y: this.startOffsetY + 5 }, 600)
                        .to({ scaleY: this.startScale, y: this.startOffsetY }, 600, Tween.Easing.Back.Out);

                    tween.setLoop(true, true);

                    console.log(this.startOffsetY, tween, this.uuid)
                }
            }
        }
    }
}
