
import SingletonBase from "../Bases/SingletonBase";
import Tween from "../Libs/Tween/Tween";

export default class TweenService extends SingletonBase<TweenService> {

    protected onInitialize() {
        blade.ticker.onTick(this.onTick, this);
    }

    protected onDispose() {
        blade.ticker.offTick(this.onTick, this);
    }

    public get<T>(target: T) {
        return Tween.get(target);
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
