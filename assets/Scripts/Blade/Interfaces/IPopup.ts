import Tween from "../Libs/Tween/Tween";
import ITicker from "./ITicker";
import PopupService from "../Services/PopupService";
import { Ease } from "../Libs/Tween/Ease";

const { ccclass, property } = cc._decorator;



/**
 * 弹窗接口类
 */
@ccclass
abstract class IPopup extends cc.Component implements ITicker {

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
        // 注册计时器
        blade.ticker.register(this);

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
        this.node.emit(PopupService.EventType.POPUP_CLICK, IPopup.EventType.Confirm, this)
    }

    onCancel() {
        this.node.emit(PopupService.EventType.POPUP_CLICK, IPopup.EventType.Cancel, this)
    }

    onDestroy() {

        if (this.onUnRegister) {
            this.onUnRegister();
        }

        // 注销计时器
        blade.ticker.unregister(this);
    }

    onEnable() {
        if (this.isShowBanner) {
            blade.platform.getPlatform().activeBanner(true);
        }
    }

    private static closeCount: number = 0;

    onDisable() {
        if (this.isShowBanner) {
            blade.platform.getPlatform().activeBanner(false);
        }

        IPopup.closeCount++;
        if (IPopup.closeCount >= 5) {
            IPopup.closeCount = 0;
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


namespace IPopup {
    export enum EventType {
        Confirm = "confirm",
        Cancel = "cancel"
    }
}



export default IPopup;
