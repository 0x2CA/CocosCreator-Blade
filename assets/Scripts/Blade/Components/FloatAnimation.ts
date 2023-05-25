

const { ccclass, property, menu } = cc._decorator;

/*
 * @作者: 0x2CA
 * @创建时间: 2023-02-09
 * @最后编辑时间: 2023-05-16
 * @最后编辑者: 0x2CA
 * @描述:
 */
@ccclass
@menu('浮动控件')
export default class FloatAnimation extends cc.Component {

    @property
    private speed: number = 1;

    @property(cc.Vec2)
    private offset: cc.Vec2 = new cc.Vec2(0, 10);

    @property
    private isSync: boolean = false;

    private _startY: number = 0;
    private _startX: number = 0;

    protected onLoad(): void {
        this._startX = this.node.x;
        this._startY = this.node.y;
    }

    onDisable(): void {
        blade.tween.removeTweens(this.node);
    }

    onEnable(): void {
        let tweener = blade.tween.get(this.node)
            .set({ x: this._startX, y: this._startY })
            .to({ x: this._startX + this.offset.x, y: this._startY + this.offset.y }, this.speed * 1000)
            .to({ x: this._startX, y: this._startY }, this.speed * 1000)
            .setLoop(true, this.isSync);
    }
}