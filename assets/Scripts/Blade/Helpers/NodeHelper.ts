export default class NodeHelper {

    private static uiLayer: cc.Node = null;
    private static mainLayer: cc.Node = null;
    private static tipLayer: cc.Node = null;
    private static guideLayer: cc.Node = null;
    private static topLayer: cc.Node = null;


    public static getMainLayer() {
        if (this.mainLayer == null) {
            this.mainLayer = cc.find("Canvas/MainLayer");
        }
        return this.mainLayer;
    }

    public static getUILayer() {
        if (this.uiLayer == null) {
            this.uiLayer = cc.find("Canvas/UILayer");
        }
        return this.uiLayer;
    }

    public static getTipLayer() {
        if (this.tipLayer == null) {
            this.tipLayer = cc.find("Canvas/TipLayer");
        }
        return this.tipLayer;
    }

    public static getGuideLayer() {
        if (this.guideLayer == null) {
            this.guideLayer = cc.find("Canvas/GuideLayer");
        }
        return this.guideLayer;
    }

    public static getTopLayer() {
        if (this.topLayer == null) {
            this.topLayer = cc.find("Canvas/TopLayer");
        }
        return this.topLayer;
    }

    /**
     *
     *
     * 不变动位置情况更换父亲
     *
     * @static
     * @param {cc.Node} sub
     * @param {cc.Node} father
     * @memberof NodeHelper
     */
    public static changeParent(sub: cc.Node, father: cc.Node, zIndex?: number) {
        let location = father.convertToNodeSpaceAR(sub.convertToWorldSpaceAR(cc.Vec2.ZERO));
        sub.parent = null;
        father.addChild(sub, zIndex);
        sub.x = location.x;
        sub.y = location.y;
    }

    /**
     * 判断2个节点是否碰撞
     *
     * @static
     * @param {cc.Node} node1
     * @param {cc.Node} node2
     * @returns
     * @memberof NodeHelper
     */
    public static isCollide(node1: cc.Node, node2: cc.Node) {
        let node1Points = NodeHelper.getPoints(node1);
        let node2Points = NodeHelper.getPoints(node2);

        for (let index = 0; index < node1Points.length; index++) {
            const vec = node1Points[index];
            if (NodeHelper.isInNode(node2, vec)) {
                return true;
            }
        }

        for (let index = 0; index < node2Points.length; index++) {
            const vec = node2Points[index];
            if (NodeHelper.isInNode(node1, vec)) {
                return true;
            }
        }

        return false;
    }

    /**
     * 获取四个角位置（世界坐标）
     *
     * @static
     * @param {cc.Node} node
     * @returns
     * @memberof NodeHelper
     */
    public static getPoints(node: cc.Node) {
        let result = new Array<cc.Vec2>();
        result.push(node.convertToWorldSpaceAR(new cc.Vec2(node.width / 2, node.height / 2)));
        result.push(node.convertToWorldSpaceAR(new cc.Vec2(-node.width / 2, -node.height / 2)));
        result.push(node.convertToWorldSpaceAR(new cc.Vec2(+node.width / 2, -node.height / 2)));
        result.push(node.convertToWorldSpaceAR(new cc.Vec2(-node.width / 2, +node.height / 2)));
        return result;
    }

    /**
     * 判断一个点（世界坐标）是否在节点内
     *
     * @static
     * @param {cc.Node} node
     * @param {cc.Vec2} vec
     * @returns
     * @memberof NodeHelper
     */
    public static isInNode(node: cc.Node, vec: cc.Vec2) {
        let location = node.convertToNodeSpaceAR(vec);
        if (Math.abs(location.x) <= node.width / 2 && Math.abs(location.y) <= node.height / 2) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 节点置灰
     * @param node
     * @param gray
     * @param defaultMaterial
     */
    public static setGray(node: cc.Node, gray: boolean = true, defaultMaterial: cc.Material = cc.Material.createWithBuiltin("2d-sprite", 0)) {
        let gray_material = cc.Material.createWithBuiltin("2d-gray-sprite", 0);

        let sp = node.getComponent(cc.Sprite);
        if (sp) {
            if (gray) {
                sp.setMaterial(0, gray_material);
            } else {
                sp.setMaterial(0, defaultMaterial);
            }
        }

        const childrenSprite = node.getComponentsInChildren(cc.Sprite);
        for (const cs of childrenSprite) {
            if (cs.node != node) {
                this.setGray(cs.node, gray);
            }
        }

        const childrenOutline = node.getComponentsInChildren(cc.LabelOutline);
        for (const co of childrenOutline) {
            if (co.node != node) {
                // 灰色直接禁用描边
                co.enabled = !gray;
            }
        }
    }
}