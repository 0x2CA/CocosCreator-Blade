import LocationHelper from "../Helpers/LocationHelper";
import PlatformService from "../Services/PlatformService";

const { ccclass, property, menu } = cc._decorator;

// 安全范围

@ccclass
@menu('适配/安全区域')
export class SafeArea extends cc.Component {

    /**
     * 是否不包含菜单按钮
     */
    @property()
    private isExcludeMenuButton: boolean = true;

    onLoad(): void {
        let widget = this.getComponent(cc.Widget);
        if (widget == null) {
            widget = this.addComponent(cc.Widget);
        }

        widget.isAlignLeft = true;
        widget.isAlignRight = true;
        widget.isAlignTop = true;
        widget.isAlignTop = true;

        // let winSize = new cc.Size(750, 1625);
        // let safeArea = new cc.Rect(0, 0, 750, 1562.5);
        // console.log("SafeArea 安全区域", safeArea.x, safeArea.y, safeArea.width, safeArea.height);
        // console.log("SafeArea 屏幕范围", winSize.width, winSize.height);
        // widget.left = Math.max(safeArea.x, 0);
        // widget.right = Math.max(winSize.width - safeArea.x - safeArea.width, 0);
        // widget.bottom = Math.max(safeArea.y, 0);
        // widget.top = Math.max(winSize.height - safeArea.y - safeArea.height, 0);

        let winSize = cc.winSize;

        let safeArea = this.getSafeAreaRect();

        console.log("SafeArea 安全区域", safeArea.x, safeArea.y, safeArea.width, safeArea.height);
        console.log("SafeArea 屏幕范围", winSize.width, winSize.height);
        widget.left = Math.max(safeArea.x, 0);
        widget.right = Math.max(winSize.width - safeArea.x - safeArea.width, 0);
        widget.bottom = Math.max(safeArea.y, 0);
        widget.top = Math.max(winSize.height - safeArea.y - safeArea.height, 0);

        LocationHelper.updateChildrenWidget(this.node);
    }

    public getSafeAreaRect() {
        let winSize = cc.winSize;

        if (
            blade.platform.getType() == PlatformService.PlatformType.ANDROID ||
            blade.platform.getType() == PlatformService.PlatformType.IOS ||
            // blade.platform.getType() == PlatformService.PlatformType.WX ||
            blade.platform.getType() == PlatformService.PlatformType.VIVO ||
            blade.platform.getType() == PlatformService.PlatformType.OPPO ||
            blade.platform.getType() == PlatformService.PlatformType.HUAWEI ||
            blade.platform.getType() == PlatformService.PlatformType.XIAOMI
        ) {
            return cc.sys.getSafeAreaRect();
        }

        if (blade.platform.getType() == PlatformService.PlatformType.WX) {
            return this.getSafeAreaRectWX();
        }

        if (blade.platform.getType() != PlatformService.PlatformType.WEB) {
            console.warn("SafeArea 没有实现相应的安全范围获取");
        }

        return new cc.Rect(0, 0, winSize.width, winSize.height);
        // return new cc.Rect(0, 68, winSize.width, winSize.height - 68 - 68);
    }

    public getSafeAreaRectWX() {
        let winSize = cc.winSize;

        let sysInfo = wx.getSystemInfoSync();

        // 屏幕坐标系（物理分辨率），左上角为原点
        let safeArea = sysInfo.safeArea;

        if (safeArea == null) {
            // 有部份机型不存在安全区域，默认返回屏幕大小
            return new cc.Rect(0, 0, winSize.width, winSize.height);
        }

        // 物理分辨率和像素分辨率比
        let DPR = sysInfo.pixelRatio;

        // 窗口像素分辨率
        let windowWidth = sysInfo.windowWidth * DPR;
        let windowHeight = sysInfo.windowHeight * DPR;

        // 安全矩形距离边缘的像素
        let topEdge = safeArea.top * DPR;
        if (this.isExcludeMenuButton == true) {
            // 不包含
            let rect = wx.getMenuButtonBoundingClientRect();
            if (rect != null) {
                topEdge = (rect.top + rect.height) * DPR;
            }
        }
        let bottomEdge = windowHeight - safeArea.bottom * DPR;
        let leftEdge = safeArea.left * DPR;
        let rightEdge = windowWidth - safeArea.right * DPR;

        // 屏幕空间下的安全区域左下和右上
        let leftBottom = new cc.Vec2(leftEdge, bottomEdge);
        let rightTop = new cc.Vec2(windowWidth - rightEdge, windowHeight - topEdge);

        // 转换到视窗空间
        this.convertToUISpace(leftBottom);
        this.convertToUISpace(rightTop);

        const x = leftBottom.x;
        const y = leftBottom.y;
        const width = rightTop.x - leftBottom.x;
        const height = rightTop.y - leftBottom.y;

        // 返回安全矩形
        return new cc.Rect(x, y, width, height);
    }

    /**
     * 屏幕坐标转到UI空间
     * @param point 
     */
    public convertToUISpace(point: cc.Vec2): void {
        let view = cc.view;
        const viewport = view.getViewportRect();
        const scaleX = view.getScaleX();
        const scaleY = view.getScaleY();
        point.x = (point.x - viewport.x) / scaleX;
        point.y = (point.y - viewport.y) / scaleY;
    }
}