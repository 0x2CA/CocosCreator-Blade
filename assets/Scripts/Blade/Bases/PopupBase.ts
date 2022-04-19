import Tween from "../Libs/Tween/Tween";
import ITicker from "../Interfaces/ITicker";
import PopupService from "../Services/PopupService";
import { Ease } from "../Libs/Tween/Ease";
import TickerService from "../Services/TickerService";
import PlatformService from "../Services/PlatformService";

const { ccclass, property } = cc._decorator;



/**
 * 弹窗接口类
 */
@ccclass
abstract class PopupBase extends cc.Component {

    @property({
        type: cc.Button,
        tooltip: "确认按钮",
    })
    buttonConfirm: cc.Button = null;

    @property({
        type: cc.Button,
        tooltip: "取消按钮",
    })
    buttonCancel: cc.Button = null;

    @property
    isShowBanner: boolean = true;

    onLoad() {
        if (this.buttonConfirm) {
            this.buttonConfirm.node.on(
                cc.Node.EventType.TOUCH_END,
                this.onConfirm,
                this
            );
        }

        if (this.buttonCancel) {
            this.buttonCancel.node.on(
                cc.Node.EventType.TOUCH_END,
                this.onCancel,
                this
            );
        }

        if (this.onRegister) {
            this.onRegister();
        }
    }

    onConfirm() {
        this.node.emit(PopupService.EventType.POPUP_CLICK, PopupBase.EventType.Confirm, this)
    }

    onCancel() {
        this.node.emit(PopupService.EventType.POPUP_CLICK, PopupBase.EventType.Cancel, this)
    }

    onDestroy() {
        if (this.onUnRegister) {
            this.onUnRegister();
        }
    }

    onEnable() {
        if (this.isShowBanner) {
            PlatformService.getInstance().getPlatform().activeBanner(true);
        }
    }

    private static closeCount: number = 0;

    onDisable() {
        if (this.isShowBanner) {
            PlatformService.getInstance().getPlatform().activeBanner(false);
        }

        PopupBase.closeCount++;
        if (PopupBase.closeCount >= 5) {
            PopupBase.closeCount = 0;
            blade.platform.getPlatform().showInterstitial();
        }
    }


    /**
    * 显示窗口动画
    */
    public appear(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.node.y = 150;
            Tween.get(this.node).to({ y: 0 }, 400, Ease.backOut).call(resolve);
        });
    }

    /**
     * 隐藏窗口动画
     */
    public disappear(): Promise<void> {
        return new Promise((resolve, reject) => {
            Tween.get(this.node)
                .to({ y: 250 }, 400, Ease.backIn)
                .call(() => {
                    resolve();
                })
        });
    }

    /**
    * 调用隐藏窗口之后操作
    * 子类可重载, 以决定是销毁还是隐藏
    */
    public onDisappear(): void {
        Tween.removeTweens(this.node)
        this.node.destroy();
    }

    /**
     * 模版参数, 传入打开参数
     * @param tpl
     */
    public applyTemplate?(tpl: any);

    /**
     * 发送用户点击结果, 发送后将关闭弹窗
     * @param result
     */
    protected submit(result: string) {
        this.node.emit(PopupService.EventType.POPUP_CLICK, result, this.node);
    }


    onTick(delta: number): void {
    }

    onFixedTick?(delta: number): void
    onLateTick?(): void


    /**
    * 注册
    */
    onRegister?(): void

    /**
     * 注销
     */
    onUnRegister?(): void
}


namespace PopupBase {
    export enum EventType {
        Confirm = "confirm",
        Cancel = "cancel"
    }
}



export default PopupBase;
