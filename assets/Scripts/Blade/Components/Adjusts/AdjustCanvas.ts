
const { ccclass, property, requireComponent } = cc._decorator;

export enum FitType {
    Height,
    Width
}

/*
 * @作者: 0x2CA
 * @创建时间: 2023-03-17
 * @最后编辑时间: 2023-04-18
 * @最后编辑者: 0x2CA
 * @描述: 适配画布
 */
@ccclass
@requireComponent(cc.Canvas)
class AdjustCanvas extends cc.Component {

    @property({
        type: cc.Enum(FitType)
    })
    private fitType: FitType = FitType.Width;

    private _designResolutionSize: cc.Size = null;

    private preWidth: number = 0;
    private preHeight: number = 0;

    protected onEnable() {
        cc.view.setResizeCallback(() => {
            this.adjust();
        });
        this.adjust();
    }

    private adjust() {
        if (this._designResolutionSize == null) {
            this._designResolutionSize = cc.view.getDesignResolutionSize();
        }

        let frameSize = cc.view.getFrameSize();
        let canvas = this.getComponent(cc.Canvas);

        canvas.fitHeight = false;
        canvas.fitWidth = false;

        let finalHeight = frameSize.height;
        let finalWidth = frameSize.width;

        console.log("Canvas适配 设计分辨率:", this._designResolutionSize.width, this._designResolutionSize.height);
        console.log("Canvas适配 屏幕分辨率:", frameSize.width, frameSize.height);


        let fitType = this.fitType;

        // 适配
        if (fitType == FitType.Width) {
            if (frameSize.width > frameSize.height) {
                console.log("Canvas适配 屏幕处于横屏状态");
                if (cc.sys.isBrowser && (this.preWidth != frameSize.height || this.preHeight != frameSize.width)) {
                    // 切换设备方向
                    this.preWidth = frameSize.height;
                    this.preHeight = frameSize.width;
                    cc.view.setFrameSize(frameSize.height, frameSize.width);
                    cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
                    this.node.emit('resize');
                    return;
                }
            }

            if (frameSize.height / frameSize.width < 1.5) {
                // 平板型
                console.log("Canvas适配 当前分辨率为平板型反转适配方式");
                fitType = FitType.Height;
            }
        } else {
            // 高度适配
            if (frameSize.height > frameSize.width) {
                console.log("Canvas适配 屏幕处于竖屏状态");
                if (cc.sys.isBrowser && (this.preWidth != frameSize.height || this.preHeight != frameSize.width)) {
                    // 切换设备方向
                    this.preWidth = frameSize.height;
                    this.preHeight = frameSize.width;
                    cc.view.setFrameSize(frameSize.height, frameSize.width);
                    cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
                    this.node.emit('resize');
                    return;
                }
            }

            if (frameSize.width / frameSize.height < 1.5) {
                // 平板型
                console.log("Canvas适配 当前分辨率为平板型反转适配方式");
                fitType = FitType.Width;
            }
        }

        // 适配
        if (fitType == FitType.Width) {
            // 宽度适配
            console.log("Canvas适配 适配类型:宽度适配");
            finalWidth = this._designResolutionSize.width;
            finalHeight = this._designResolutionSize.width * frameSize.height / frameSize.width;
        } else {
            // 高度适配
            console.log("Canvas适配 适配类型:高度适配");
            finalHeight = this._designResolutionSize.height;
            finalWidth = this._designResolutionSize.height * frameSize.width / frameSize.height;
        }

        console.log("Canvas适配 适配分辨率:", finalWidth, finalHeight);

        canvas.designResolution = cc.size(finalWidth, finalHeight);

        this.node.width = finalWidth;
        this.node.height = finalHeight;
        this.node.x = finalWidth / 2;
        this.node.y = finalHeight / 2;

        this.node.emit('resize');
    }
}

namespace AdjustCanvas {

}

export default AdjustCanvas;