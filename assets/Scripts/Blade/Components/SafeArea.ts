import LocationHelper from "../Helpers/LocationHelper";
import PlatformService from "../Services/PlatformService";

const { ccclass, property, menu } = cc._decorator;

// 安全范围

@ccclass
@menu('适配/安全区域')
export class SafeArea extends cc.Component {
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

        if (
            blade.platform.getType() == PlatformService.PlatformType.ANDROID ||
            blade.platform.getType() == PlatformService.PlatformType.IOS ||
            blade.platform.getType() == PlatformService.PlatformType.WX
        ) {
            let safeArea = cc.sys.getSafeAreaRect();
            console.log("SafeArea 安全区域", safeArea.x, safeArea.y, safeArea.width, safeArea.height);
            console.log("SafeArea 屏幕范围", winSize.width, winSize.height);
            widget.left = Math.max(safeArea.x, 0);
            widget.right = Math.max(winSize.width - safeArea.x - safeArea.width, 0);
            widget.bottom = Math.max(safeArea.y, 0);
            widget.top = Math.max(winSize.height - safeArea.y - safeArea.height, 0);
        } else if (blade.platform.getType() != PlatformService.PlatformType.WEB) {
            console.warn("SafeArea 没有实现相应的安全范围获取");
            widget.left = 0;
            widget.right = 0;
            widget.bottom = 0;
            widget.top = 0;
        }

        LocationHelper.updateChildrenWidget(this.node);
    }
}