import ITicker from "../../Blade/Interfaces/ITicker";
import SingletonBase from "../Bases/SingletonBase";

/**
 * 计时管理类
 */
class TickerService extends SingletonBase<TickerService> {

    private _event: cc.EventTarget = new cc.EventTarget();

    protected onInitialize() {
        if (cc.sys.platform !== cc.sys.EDITOR_PAGE) {
            const appNode = cc.find('Blade');

            if (appNode == null) {
                throw new Error("没有Blade节点")
            }

            if (appNode.getComponent(TickerService.TickerComponent) == null) {
                appNode.addComponent(TickerService.TickerComponent);
            }

            this._event.clear();
        }
    }

    protected onDispose() {
        this._event.clear();
    }

    private _timeScale: number = 1;
    private _pause: boolean = false;
    private _tickList: Set<ITicker> = new Set<ITicker>();

    public get timeScale() {
        return this._timeScale;
    }

    public set timeScale(scale: number) {
        this._timeScale = scale > 0 ? scale : 1;
        console.warn('设置时间缩放：' + this._timeScale);
    }

    public get pause() {
        return this._pause;
    }

    public set pause(p: boolean) {
        if (p != this._pause) {
            this._pause = p;
            // TODO: 暂停状态修改通知
        }
    }

    private tick(delta: number) {
        delta *= this._timeScale;
        if (!this._pause) {
            try {
                this._event.emit(TickerService.TickerType.Tick, delta);
            } catch (error) {
                console.error(error);
            }
        }
    }

    private fixedTick(delta: number) {
        let fixedDelta = delta * this._timeScale;
        if (!this._pause) {
            try {
                this._event.emit(TickerService.TickerType.FixedTick, fixedDelta)
            } catch (error) {
                console.error(error);
            }
        }
    }

    private lateTick() {
        if (!this._pause) {
            try {
                this._event.emit(TickerService.TickerType.LateTick)
            } catch (error) {
                console.error(error);
            }
        }
    }

    /**
     * 监听Tick
     * @param tick
     * @param target
     */
    public onTick(tick: (delta: number) => void, target: object = null) {
        this._event.on(TickerService.TickerType.Tick, tick, target);
    }

    /**
     * 取消监听Tick
     * @param tick
     * @param target
     */
    public offTick(tick: (delta: number) => void, target: object = null) {
        this._event.off(TickerService.TickerType.Tick, tick, target);
    }

    /**
     * 监听FixedTick
     * @param fixedTick
     * @param target
     */
    public onFixedTick(fixedTick: (delta: number) => void, target: object = null) {
        this._event.on(TickerService.TickerType.FixedTick, fixedTick, target);
    }

    /**
     * 取消监听FixedTick
     * @param fixedTick
     * @param target
     */
    public offFixedTick(fixedTick: (delta: number) => void, target: object = null) {
        this._event.off(TickerService.TickerType.FixedTick, fixedTick, target);
    }

    /**
     * 监听LateTick
     * @param lateTick
     * @param target
     */
    public onLateTick(lateTick: () => void, target: object = null) {
        this._event.on(TickerService.TickerType.LateTick, lateTick, target);
    }

    /**
     * 取消监听LateTick
     * @param lateTick
     * @param target
     */
    public offLateTick(lateTick: () => void, target: object = null) {
        this._event.off(TickerService.TickerType.LateTick, lateTick, target);
    }

    /**
     * 注册绑定计时器
     * @param ticker
     */
    public on(ticker: ITicker) {
        if (this._tickList.has(ticker) == false) {
            this._event.on(TickerService.TickerType.Tick, ticker.onTick, ticker);
            this._event.on(TickerService.TickerType.LateTick, ticker.onLateTick, ticker);
            this._event.on(TickerService.TickerType.FixedTick, ticker.onFixedTick, ticker);
            this._tickList.add(ticker);
        }
    }

    /**
     * 取消绑定计时器
     * @param ticker
     */
    public off(ticker: ITicker) {
        if (this._tickList.has(ticker)) {
            this._event.off(TickerService.TickerType.Tick, ticker.onTick, ticker);
            this._event.off(TickerService.TickerType.LateTick, ticker.onLateTick, ticker);
            this._event.off(TickerService.TickerType.FixedTick, ticker.onFixedTick, ticker);
            this._tickList.delete(ticker);
        }
    }
}

namespace TickerService {
    /**
     * 计时组件供外部全局节点附加
     */
    export class TickerComponent extends cc.Component {

        private _tickerService: TickerService = null;

        private _fixedTick: (delta: number) => void;
        private _tick: (delta: number) => void;
        private _lateTick: () => void;

        private _lastTime: number = null;

        private _frameRate = 30;
        private _fixedTime: number = Math.floor(1000 / this._frameRate);
        private _fixedTimeOffset: number = 1000 - (this._fixedTime * this._frameRate);
        private _fixedTimeCount: number = 0;
        private _fixedTimeTotal: number = 0;

        onLoad() {
            this._tickerService = TickerService.getInstance();
            this._fixedTick = Reflect.get(this._tickerService, "fixedTick");
            this._tick = Reflect.get(this._tickerService, "tick");
            this._lateTick = Reflect.get(this._tickerService, "lateTick");
        }

        update(delta: number) {

            let currrentTime = new Date().getTime();

            if (this._lastTime == currrentTime) {
                return;
            }

            if (this._lastTime == null) {
                this._lastTime = currrentTime;
            }

            let subTime = currrentTime - this._lastTime;

            if (subTime > 0 && subTime >= this._fixedTime) {
                this._lastTime = currrentTime;

                this._fixedTimeTotal += subTime;

                // 时间判断满足不满足下一个
                while (this._fixedTimeTotal >= ((this._fixedTimeCount + 1) * 1000 / this._frameRate)) {
                    this._fixedTimeCount += 1;
                    let fixedTime = this._fixedTime;
                    if (this._fixedTimeCount % this._frameRate == 0) {
                        fixedTime += this._fixedTimeOffset;
                    }
                    this._fixedTick.call(this._tickerService, fixedTime);
                }

                // 以秒为单位缩减次数和累计时间(防止浮点数误差)
                let seconds = Math.floor(this._fixedTimeCount / this._frameRate);
                this._fixedTimeCount -= seconds * this._frameRate;
                this._fixedTimeTotal -= 1000 * seconds;

                this._tick.call(this._tickerService, subTime);
            }
        }

        lateUpdate() {
            this._lateTick.call(this._tickerService);
        }
    }

    export enum TickerType {
        Tick = "Tick",
        FixedTick = "FixedTick",
        LateTick = "LateTick"
    }
}

export default TickerService