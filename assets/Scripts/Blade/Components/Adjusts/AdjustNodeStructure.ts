const { ccclass, property, menu } = cc._decorator;


@ccclass("NodeGetter")
class NodeGetter {
    @property({
        displayName: "结点引用",
        type: cc.Node,
        visible: function () {
            if (this.isAllEmpty()) {
                return true;
            }
            return this.node != null;
        }
    })
    node: cc.Node = null;

    @property({
        displayName: "结点路径",
        visible: function () {
            if (this.isAllEmpty()) {
                return true;
            }
            return this.path != "";
        }
    })
    path = "";

    getTargetNode(relativeNode: cc.Node): cc.Node {
        if (this.node) {
            return this.node;
        }

        this.node = this.findTargetNode(this.path, relativeNode);

        if (!this.node) {
            cc.warn("no such path", this.path)
            return null;
        }

        return this.node;
    }

    private findTargetNode(targetNodePath: string, relativeNode: cc.Node): cc.Node {
        if (targetNodePath.substring(0, 6) == "Canvas") {
            return cc.find(targetNodePath);
        }
        else if (targetNodePath == "") {
            return relativeNode;
        } else if (targetNodePath.substring(0, 2) == "./") {
            return this.findTargetNode(targetNodePath.substring(2), relativeNode);
        }
        else if (targetNodePath.substring(0, 3) == "../") {
            return this.findTargetNode(targetNodePath.substring(3), relativeNode.parent);
        }
        else {
            return cc.find(targetNodePath, relativeNode);
        }
    }

    private isAllEmpty() {
        return !this.node && !this.path;
    }

}

@ccclass("NodeStructure")
class NodeStructure {
    @property(cc.Node)
    node: cc.Node = null;

    @property({ type: NodeGetter })
    layerNodeGetter: NodeGetter = new NodeGetter()

    relativePosition: cc.Vec3 = null;
}

@ccclass
@menu("性能相关/调整Node结构")
export default class AdjustNodeStructure extends cc.Component {
    @property
    private delay = 0;

    @property(cc.Node)
    private syncActiveNode: cc.Node = null;

    @property
    private isRemoveWhenDisable = false;

    @property({ type: NodeGetter })
    private scrollView: NodeGetter = new NodeGetter();

    @property({
        type: NodeStructure
    })
    private structures: NodeStructure[] = [];

    protected start() {
        if (this.delay <= 0) {
            this.adjust();
        }
        else {
            // 延迟调整
            this.scheduleOnce(this.adjust.bind(this), this.delay)
        }

        let scrollView = this.scrollView.getTargetNode(this.node);
        if (scrollView != null && scrollView.getComponent(cc.ScrollView) != null) {
            scrollView.on("scrolling", this.adjust, this);
        }
    }

    protected onEnable(): void {
        this.syncActive();
    }

    protected onDisable(): void {
        this.syncActive();

        if (this.isRemoveWhenDisable == true) {
            for (let structure of this.structures) {
                structure.node.parent = null;
                structure.node.destroy();
            }
        }
    }

    private adjust() {
        for (let structure of this.structures) {
            // 禁用布局组件(因为分层没有办法使用)
            let widget = structure.node.getComponent(cc.Widget);
            if (widget) {
                widget.enabled = false;
            }

            // 获取层节点
            let layerNode: cc.Node = structure.layerNodeGetter.getTargetNode(this.node)
            if (!layerNode) {
                continue;
            }

            if (structure.relativePosition == null) {
                structure.relativePosition = this.node.convertToNodeSpaceAR(structure.node.convertToWorldSpaceAR(cc.Vec3.ZERO));
            }

            let position = layerNode.convertToNodeSpaceAR(this.node.convertToWorldSpaceAR(structure.relativePosition));
            structure.node.parent = layerNode;
            structure.node.setPosition(position);
        }

        // 一开始强制激活
        this.syncActive(true)
    }


    private nodeActiveStatus = false;

    /**
     * 同步节点激活状态
     * @param isForce
     * @returns
     */
    private syncActive(isForce = false) {
        if (this.syncActiveNode == null) {
            return;
        }

        // 如果不是强制更新，只有再节点状态和上一个状态不相同才更新
        if (isForce == false && this.syncActiveNode.active == this.nodeActiveStatus) {
            return;
        }

        this.nodeActiveStatus = this.syncActiveNode.active;

        for (let structure of this.structures) {
            structure.node.active = this.syncActiveNode.active
        }

    }
}
