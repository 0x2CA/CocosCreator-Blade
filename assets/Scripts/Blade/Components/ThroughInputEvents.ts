const { ccclass, property } = cc._decorator;
//点击穿透
@ccclass
export class ThroughInputEvents extends cc.Component {

    onLoad(): void {
        this.node.on(cc.Node.EventType.TOUCH_START, () => {
            (this.node as any)._touchListener.setSwallowTouches(false);
        }, this);

    }
}

