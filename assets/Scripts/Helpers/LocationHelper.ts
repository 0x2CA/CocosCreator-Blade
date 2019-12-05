/**
 * 定位助手
 */
class LocationHelper {
    /**
     * cc.Widget 更新
     *
     * @private
     * @static
     * @param {cc.Node} content
     * @memberof ListView
     */
    public static updateWidget(content: cc.Node) {
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
            tmp.updateAlignment();
        }
    }




    public static getLocation(content: cc.Node): LocationHelper.Location {
        let winSize = cc.view.getVisibleSize();
        let canvas = cc.find("Canvas");
        LocationHelper.updateWidget(content);
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