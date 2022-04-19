import ITicker from "../../Blade/Interfaces/ITicker";
import SingletonBase from "../Bases/SingletonBase";

/**
 * 计时管理类
 */
export default class TickerService extends SingletonBase {

    public onInitialize() {
        const appNode = cc.find('Blade');

        // if (appNode == null) {
        //     throw new Error("没有Blade节点")
        // }

        if (appNode.getComponent(TickerComponent) == null) {
            appNode.addComponent(TickerComponent);
        }
    }

    public onDispose() {

    }

    private _timeScale: number = 1;
    private _pause: boolean = false;
    private _tickList: Set<ITicker> = new Set<ITicker>();

    public get timeScale() {
        return this._timeScale;
    }

    public set timeScale(scale: number) {
        this._timeScale = scale > 0 ? scale : 1;
        cc.warn('设置时间缩放：' + this._timeScale);
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

    public tick(delta: number) {
        delta *= this._timeScale;
        this._tickList.forEach((item) => {
            if (item.onTick) {
                if (!this._pause) {
                    item.onTick(delta);
                }
            }
        })
    }

    public fixedTick(delta: number) {
        let fixedDelta = 1 / cc.game.getFrameRate() * this._timeScale;
        this._tickList.forEach((item) => {
            if (item.onFixedTick) {
                if (!this._pause) {
                    item.onFixedTick(fixedDelta);
                }
            }
        })
    }

    public lateTick() {

        this._tickList.forEach((item) => {
            if (item.onLateTick) {
                if (!this._pause) {
                    item.onLateTick();
                }
            }
        })

    }

    /**
     * 注册绑定计时器
     * @param ticker
     */
    public on(ticker: ITicker) {
        if (this._tickList.has(ticker) == false) {
            this._tickList.add(ticker);
        }
    }

    /**
     * 取消绑定计时器
     * @param ticker
     */
    public off(ticker: ITicker) {
        if (this._tickList.has(ticker)) {
            this._tickList.delete(ticker);
        }
    }
}

/**
 * 计时组件供外部全局节点附加
 */
class TickerComponent extends cc.Component {
    private tickerService: TickerService;

    private fixedFrame: number = 60;
    private fixedTime: number = 0;

    onLoad() {
        this.tickerService = TickerService.getInstance();
    }

    update(dt: number) {
        this.fixedTime += dt;

        while (this.fixedTime >= 1 / this.fixedFrame) {
            this.fixedTime -= 1 / this.fixedFrame;
            this.tickerService.fixedTick(1 / this.fixedFrame);
        }

        this.tickerService.tick(dt);
    }

    lateUpdate() {
        this.tickerService.lateTick();
    }
}
