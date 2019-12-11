import Singleton from "../Decorators/Singleton";
import Service from "../Decorators/Service";
import IService from "../Interfaces/IService";
import ITicker from "../Interfaces/ITicker";

/**
 * 计时管理类
 */
@Singleton
@Service("TickerService")
export default class TickerService implements IService {
    public alias: string;
    public static readonly instance: TickerService

    public initialize(): void {
    }

    public lazyInitialize(): void {
        const appNode = cc.find('Blade');
        if (appNode.getComponent(TickerComponent) == null) {
            appNode.addComponent(TickerComponent);
        }
    }


    private _timeScale: number = 1;
    private _pause: boolean = false;
    private tickList: Set<ITicker> = new Set<ITicker>();

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

    public setPause(pause: boolean) {
        this.pause = pause;
    }

    public tick(delta: number) {
        delta *= this._timeScale;
        this.tickList.forEach((item) => {
            if (!this._pause) {
                item.onTick(delta);
            }
        })
    }

    public fixedTick(delta: number) {
        let fixedDelta = 1 / cc.game.getFrameRate() * this._timeScale;
        this.tickList.forEach((item) => {
            if (item.onFixedTick) {
                if (!this._pause) {
                    item.onFixedTick(fixedDelta);
                }
            }
        })
    }

    public lateTick() {

        this.tickList.forEach((item) => {
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
    public register(ticker: ITicker) {
        if (this.tickList.has(ticker) == false) {
            this.tickList.add(ticker);
        }
    }

    /**
     * 取消绑定计时器
     * @param ticker 
     */
    public unregister(ticker: ITicker) {
        if (this.tickList.has(ticker)) {
            this.tickList.delete(ticker);
        }
    }
}

/**
 * 计时组件供外部全局节点附加
 */
class TickerComponent extends cc.Component {
    private tickerService: TickerService;

    onLoad() {
        this.tickerService = TickerService.instance;
    }

    update(dt: number) {
        this.tickerService.tick(dt);
        this.tickerService.fixedTick(dt);
    }

    lateUpdate() {
        this.tickerService.lateTick();
    }
}