export default class NodeHelper{
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
}