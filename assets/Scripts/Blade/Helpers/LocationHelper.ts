/**
 * 定位助手
 */
class LocationHelper {
    /**
     * 更新节点布局对齐(包括父节点)
     *
     * @private
     * @static
     * @param {cc.Node} content
     * @memberof ListView
     */
    public static updateParentWidget(content: cc.Node) {
        let tmp = content.getParent();
        let result: Array<cc.Widget> = [];
        while (tmp && !(tmp instanceof cc.Scene)) {
            let component = tmp.getComponent(cc.Widget);
            if (component) {
                result.push(component);
            }
            tmp = tmp.getParent();
        }
        while (result.length > 0) {
            let tmp = result.pop();
            if (tmp.isValid == true && tmp.enabled == true) {
                tmp.updateAlignment();
            }
        }
    }

    /**
     * 更新节点布局对齐(包括子节点)
     * @param node
     */
    public static updateChildrenWidget(node: cc.Node) {
        let weights = node.getComponentsInChildren(cc.Widget);
        for (let index = 0; index < weights.length; index++) {
            const weight = weights[index];
            if (weight.isValid == true && weight.enabled == true) {
                weight.updateAlignment();
            }
        }
    }

    /**
     * 获取定位
     * @param content
     * @returns
     */
    public static getLocation(content: cc.Node): LocationHelper.Location {
        let winSize = cc.view.getVisibleSize();
        let canvas = cc.find("Canvas");
        LocationHelper.updateParentWidget(content);
        let nodeWorld = content.convertToWorldSpaceAR(cc.Vec2.ZERO);
        let nodetoCanvas = canvas.convertToNodeSpaceAR(nodeWorld);

        let top = cc
            .v2(nodetoCanvas.x, nodetoCanvas.y + content.height / 2)
            .sub(cc.v2(nodetoCanvas.x, winSize.height / 2))
            .mag();

        let topRatio = top / winSize.height;

        let left = cc
            .v2(nodetoCanvas.x - content.width / 2, nodetoCanvas.y)
            .sub(cc.v2(-winSize.width / 2, nodetoCanvas.y))
            .mag();
        let leftRatio = left / winSize.width;

        let width = content.width;
        let widthRatio = width / winSize.width;

        let height = content.height;
        let heightRatio = height / winSize.height;

        return {
            top,
            left,
            width,
            height,

            topRatio,
            leftRatio,
            widthRatio,
            heightRatio
        }
    }
}


namespace LocationHelper {
    /**
     * 位置信息
     */
    export interface Location {
        top: number
        left: number
        width: number
        height: number

        topRatio: number
        leftRatio: number
        widthRatio: number
        heightRatio: number
    }
}


export default LocationHelper;