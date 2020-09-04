import PopupService from "../Services/PopupService";
import Tween from "../Libs/Tween/Tween";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ModalLayer extends cc.Component {
    @property({
        type: cc.Node,
        tooltip: "等待指示图标",
    })
    spin: cc.Node = null;



    private spinTween: Tween;

    onLoad() {
        blade.popup.on(PopupService.EventType.PANEL_ENABLE, this.openPanel, this);
        blade.popup.on(PopupService.EventType.PANEL_DISABLE, this.closePanel, this);
    }

    onDestroy() {
        blade.popup.off(PopupService.EventType.PANEL_ENABLE, this.openPanel, this);
        blade.popup.off(PopupService.EventType.PANEL_DISABLE, this.closePanel, this);
    }

    start() { }

    openPanel() {
        this.spin.active = false;
    }

    closePanel() {
        this.spin.active = true;
    }

    onEnable() {
        if (this.spin) {
            this.spinTween = Tween.get(this.spin, { loop: true }).set({ angle: 0 }).to({ angle: -360 }, 1000)
        }
    }

    onDisable() {
        if (this.spin && this.spinTween) {
            Tween.removeTweens(this.spin);
            this.spinTween = null;
        }
    }
}
