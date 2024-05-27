

const { ccclass, property, menu } = cc._decorator;

/*
 * @作者: 0x2CA
 * @创建时间: 2022-09-29
 * @最后编辑时间: 2023-05-26
 * @最后编辑者: 0x2CA
 * @描述: 可视检测 draw call优化组件
 */
@ccclass
@menu('性能相关/可视检测')
export default class VisibleDetection extends cc.Component {
    /**检测范围 */
    @property({
        displayName: "检测范围",
        type: cc.Node
    })
    private detectionRangeNode: cc.Node = null;

    /**容器 */
    @property({
        displayName: "容器",
        type: cc.Node
    })
    private containerNode: cc.Node = null;

    onLoad() {
        if (this.detectionRangeNode == null || this.containerNode == null) {
            return null;
        }

        this.offEvent();

        this.onEvent();

        this.updateOpacity();
    }

    protected update(dt: number): void {
        if (this._needUpdateCount > 0) {
            this.updateOpacity();
        }
    }

    public setContainer(container: cc.Node) {
        this.offEvent();
        this.containerNode = container;
        this.onEvent();
        this.updateOpacity();
    }

    public setDetectionRange(detectionRange: cc.Node) {
        this.offEvent();
        this.detectionRangeNode = detectionRange;
        this.onEvent();
        this.updateOpacity();
    }

    private onEvent() {
        // ------------------事件监听
        if (this.detectionRangeNode != null && this.detectionRangeNode.getComponent(cc.ScrollView) != null) {
            this.detectionRangeNode.on("scroll-began", this.needUpdate, this);
            this.detectionRangeNode.on("scrolling", this.needUpdate, this);
            this.detectionRangeNode.on("scroll-end", this.needUpdate, this);
            let scrollView = this.detectionRangeNode.getComponent(cc.ScrollView);
            // 备份
            (scrollView as any).__moveContent = (scrollView as any)._moveContent;
            (scrollView as any)._moveContent = (deltaMove, canStartBounceBack) => {
                (scrollView as any).__moveContent(deltaMove, canStartBounceBack);
                this.needUpdate();
            };
            // 备份
            (scrollView as any).__calculateBoundary = (scrollView as any)._calculateBoundary;
            (scrollView as any)._calculateBoundary = () => {
                (scrollView as any).__calculateBoundary();
                this.needUpdate();
            };
            if (scrollView.content != null) {
                scrollView.content.on(cc.Node.EventType.SIZE_CHANGED, this.needUpdate, this);
                scrollView.content.on(cc.Node.EventType.POSITION_CHANGED, this.needUpdate, this);
            }
        }

        if (this.containerNode != null) {
            this.containerNode.on(cc.Node.EventType.CHILD_ADDED, this.needUpdate, this);
            this.containerNode.on(cc.Node.EventType.CHILD_REMOVED, this.needUpdate, this);
            this.containerNode.on(cc.Node.EventType.CHILD_REORDER, this.needUpdate, this);
            this.containerNode.on(cc.Node.EventType.SIZE_CHANGED, this.needUpdate, this);
            this.containerNode.on(cc.Node.EventType.POSITION_CHANGED, this.needUpdate, this);
        }
    }

    private offEvent() {
        if (this.detectionRangeNode != null && this.detectionRangeNode.getComponent(cc.ScrollView) != null) {
            this.detectionRangeNode.off("scroll-began", this.needUpdate, this);
            this.detectionRangeNode.off("scrolling", this.needUpdate, this);
            this.detectionRangeNode.off("scroll-end", this.needUpdate, this);
            let scrollView = this.detectionRangeNode.getComponent(cc.ScrollView);
            if ((scrollView as any).__moveContent != null) {
                (scrollView as any)._moveContent = (scrollView as any).__moveContent;
                (scrollView as any).__moveContent = null;
            }
            if ((scrollView as any).__calculateBoundary != null) {
                (scrollView as any).__calculateBoundary = (scrollView as any).__calculateBoundary;
                (scrollView as any).__calculateBoundary = null;
            }
            if (scrollView.content != null) {
                scrollView.content.off(cc.Node.EventType.SIZE_CHANGED, this.needUpdate, this);
                scrollView.content.off(cc.Node.EventType.POSITION_CHANGED, this.needUpdate, this);
            }
        }

        if (this.containerNode != null) {
            this.containerNode.off(cc.Node.EventType.CHILD_ADDED, this.needUpdate, this);
            this.containerNode.off(cc.Node.EventType.CHILD_REMOVED, this.needUpdate, this);
            this.containerNode.off(cc.Node.EventType.CHILD_REORDER, this.needUpdate, this);
            this.containerNode.off(cc.Node.EventType.SIZE_CHANGED, this.needUpdate, this);
            this.containerNode.off(cc.Node.EventType.POSITION_CHANGED, this.needUpdate, this);
        }
    }

    /* ***************功能函数*************** */
    /**获取在世界坐标系下的节点包围盒(不包含自身激活的子节点范围) */
    private getBoundingBoxToWorld(node_o_: any): cc.Rect {
        let w_n: number = node_o_._contentSize.width;
        let h_n: number = node_o_._contentSize.height;
        let rect_o = cc.rect(
            -node_o_._anchorPoint.x * w_n,
            -node_o_._anchorPoint.y * h_n,
            w_n,
            h_n
        );
        node_o_._calculWorldMatrix();
        rect_o.transformMat4(rect_o, node_o_._worldMatrix);
        return rect_o;
    }

    /**检测包含 */
    private checkContain(rect1_o: cc.Rect, node_o_: cc.Node): boolean {
        let rect2_o = this.getBoundingBoxToWorld(node_o_);
        return rect1_o.intersects(rect2_o);
    }

    private _needUpdateCount: number = 0;

    private needUpdate() {
        this._needUpdateCount = 2;
    }

    /* ***************自定义事件*************** */
    public updateOpacity(): void {
        if (this._needUpdateCount > 0) {
            this._needUpdateCount -= 1;
        }

        if (this.detectionRangeNode == null || this.containerNode == null) {
            return null;
        }

        let rect1_o = this.getBoundingBoxToWorld(this.detectionRangeNode);
        // ------------------保险范围
        rect1_o.width += rect1_o.width * 0.5;
        rect1_o.height += rect1_o.height * 0.5;
        rect1_o.x -= rect1_o.width * 0.25;
        rect1_o.y -= rect1_o.height * 0.25;

        if (this.containerNode) {
            this.containerNode.children.forEach(v1_o => {
                v1_o.opacity = this.checkContain(rect1_o, v1_o) ? 255 : 0;
            });
        }
    }
}
