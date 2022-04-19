import Tween from "../Libs/Tween/Tween";
import ITicker from "../../Blade/Interfaces/ITicker";
import SingletonBase from "../Bases/SingletonBase";
import TickerService from "./TickerService";

/**
 * 动画服务类
 */
export default class TweenService extends SingletonBase implements ITicker {
    public onInitialize() {
        TickerService.getInstance().on(this);

        Tween.customTick = true;
    }

    public onDispose() {
        TickerService.getInstance().off(this);
    }

    public get(target: any,
        props?: { loop?: boolean; manualTick?: boolean; onChange?: Function; onChangeObj?: any },
        pluginData: any = null,
        override: boolean = false) {
        return Tween.get(target, props, pluginData, override);
    }

    public removeTweens(target: any): void {
        Tween.removeTweens(target);
    }

    /**
     * 动画刷新
     */
    public onTick() {
        Tween.tick();
    }
}
