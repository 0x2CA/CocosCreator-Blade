
import GameConfig from "../../Module/Defines/GameConfig";
import ControllerBase from "../Bases/ControllerBase";
import SingletonBase from "../Bases/SingletonBase";
import ViewBase from "../Bases/ViewBase";
import Tween from "../Libs/Tween/Tween";

export default class TweenService extends SingletonBase<TweenService> {

    protected onInitialize() {
        blade.ticker.onTick(this.onTick, this);
    }

    protected onDispose() {
        blade.ticker.offTick(this.onTick, this);
    }

    public get<T>(target: T, errorMessages: Object[] = null) {
        return Tween.get(target, errorMessages);
    }

    public getBySelf<T, B extends ViewBase | ControllerBase | cc.Node | cc.Component | string>(target: T, self: B) {
        let errorMessages: Object[] = null;
        if (GameConfig.isTest) {
            errorMessages = [];
            if (self instanceof ViewBase || self instanceof ControllerBase) {
                errorMessages.push(self.getAlias());
            } else if (self instanceof cc.Node || self instanceof cc.Component) {
                errorMessages.push(self.name);
            } else {
                errorMessages.push(self);
            }
            if (target instanceof cc.Node || target instanceof cc.Component) {
                if (target.name != null) {
                    errorMessages.push(target.name);
                }
            }
        }
        return Tween.get(target, errorMessages);
    }

    public removeTweens<T>(target: T): void {
        Tween.removeTweens(target);
    }

    public pauseTweens<T>(target: T): void {
        Tween.pauseTweens(target);
    }

    public resumeTweens<T>(target: T): void {
        Tween.resumeTweens(target);
    }

    public finishTweens<T>(target: T): void {
        Tween.finishTweens(target);
    }

    public getAllTweens() {
        return Tween.getAllTweens();
    }

    /**
     * 动画刷新
     */
    private onTick(delta: number) {
        Tween.tick(delta);
    }

}
