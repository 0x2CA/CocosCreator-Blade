import SingletonBase from "../Bases/SingletonBase";

/**
 * 时间服务
 */
class TimerService extends SingletonBase<TimerService> {

    // 自动同步时间间隔
    private static readonly SYNC_INTERVAL: number = 60000;
    // 时间最大可接受差值
    private static readonly MAX_TIME_DIFF: number = 60000;

    /**
     * 当前服务器的时间戳
     */
    private _timeStamp: number = null;

    /**
     * 最后同步的时间
     */
    private _lastSyncTime: number = null;

    /**
     * 是否正在同步时间
     */
    private _isSync: boolean = false;

    private _syncCallback: (sync: (syncTime: number) => void) => void = null;

    private _syncCaller = null;

    private readonly _timers: Set<TimerService.Timer> = new Set<TimerService.Timer>()
    private readonly _adds: Set<TimerService.Timer> = new Set<TimerService.Timer>()
    private readonly _deletes: Set<TimerService.Timer> = new Set<TimerService.Timer>()

    protected onInitialize() {
        this._timers.clear();

        blade.ticker.onTick(this.onTick, this);
        blade.ticker.onLateTick(this.onLateTick, this);
    }

    protected onDispose() {
        blade.ticker.offTick(this.onTick, this);
        blade.ticker.offLateTick(this.onLateTick, this);
    }

    private updateTime(delta: number) {
        if (this._timeStamp == null) {
            this._timeStamp = this._lastSyncTime = new Date().getTime();
            this._isSync = false;
            return;
        }

        this._timeStamp += delta;

        if (!this._isSync && this._timeStamp - this._lastSyncTime > TimerService.SYNC_INTERVAL) {
            this.syncTime();
        }
    }

    /**
     * 设置同步回调
     * @param callback
     * @param caller
     */
    public setSyncCallback(callback: (sync: (syncTime: number) => void) => void, caller: object = null) {
        this._isSync = false;
        this._syncCallback = callback;
        this._syncCaller = caller;
    }

    /**
     * 网络同步时间
     */
    public syncTime() {
        if (this._isSync) {
            console.log("正在同步时间!");
        }

        this._isSync = true;

        if (this._syncCallback != null) {
            this._syncCallback.call(this._syncCaller, (syncTime) => {
                this._timeStamp = this._lastSyncTime = syncTime;
                this._isSync = false;
                console.log("同步时间", this._timeStamp)
            });
        } else {
            this._timeStamp = this._lastSyncTime = new Date().getTime();
            this._isSync = false;
            console.log("同步时间", this._timeStamp)
        }
    }

    /**
    * 获取当时网络时间(毫秒)
    */
    public getTime() {
        if (this._timeStamp == null) {
            this._timeStamp = this._lastSyncTime = new Date().getTime();
            this._isSync = false;
        }
        return Math.floor(this._timeStamp);
    }

    /**
     * 获取当时网络时间(秒)
     */
    public getSecond() {
        if (this._timeStamp == null) {
            this._timeStamp = this._lastSyncTime = new Date().getTime();
            this._isSync = false;
        }
        return Math.floor(this._timeStamp / 1000);
    }

    /**
     * 停止
     * @param timer
     */
    public stop(timer: TimerService.Timer) {
        this._adds.delete(timer);
        this._deletes.add(timer);
    }

    /**
     * 开始
     * @param seconds
     * @param times
     * @param callback
     * @param thisArgs
     * @param args
     * @returns
     */
    public start(seconds: number, times: number, callback: Function, thisArgs?: object, ...args: object[]) {
        let timer = {
            interval: Math.round(seconds * 1000),
            timeRemain: Math.round(seconds * 1000),
            times: Math.floor(times),
            callback,
            thisArgs,
            args
        };

        this._adds.add(timer);
        return timer;
    }

    /**
     * 开始一个定时器
     * @param timeout 超时时间, 单位：秒
     * @param callback 回调
     * @param target 回调上下文对象
     * @param args 回调附带参数
     */
    public startTimer(seconds: number, callback: Function, target?: object, ...args: object[]): TimerService.Timer {
        return this.start(seconds, -1, callback, target, ...args);
    }

    /**
     * 添加一个超时回调
     * @param timeout 超时时间, 单位：秒
     * @param callback 回调
     * @param target 回调上下文对象
     * @param args 回调附带参数
     */
    public startTimeout(timeout: number, callback: Function, target?: object, ...args: object[]): TimerService.Timer {
        return this.start(timeout, 1, callback, target, ...args);
    }

    /**
     * 下一帧执行
     * @param func
     */
    public runNextFrame(func: Function, target?: object) {
        return this.startTimeout(0, func, target);
    }

    private onTick(delta: number): void {
        this.updateTime(delta);

        this._timers.forEach((timer) => {
            //减时间
            timer.timeRemain -= delta;
            // 循环检查是否结束
            while (timer.timeRemain <= 0) {
                // 时间结束
                try {
                    timer.callback.apply(timer.thisArgs, ...timer.args);
                } catch (error) {
                    console.error(error);
                    this.stop(timer);
                    return;
                }

                if (timer.times > 0) {
                    --timer.times;
                }

                if (timer.times == 0) {
                    // 达到次数, 加入待删除队列
                    this.stop(timer);
                    return;
                }

                timer.timeRemain += timer.interval;
            }
        })
    }

    private onLateTick() {
        // 处理增加
        this._adds.forEach((timer) => {
            this._timers.add(timer);
        });
        this._adds.clear();
        // 处理删除
        this._deletes.forEach((timer) => {
            this._timers.delete(timer);
        });
        this._deletes.clear();
    }
}

namespace TimerService {
    export interface Timer {
        /**
         * 间隔
         */
        interval: number;
        /**
         * 剩余时间
         */
        timeRemain: number;
        /**
         * 重复次数
         */
        times: number;
        /**
         * 回调函数
         */
        callback: Function;
        /**
         * 回调者
         */
        thisArgs?: object;
        /**
         * 参数
         */
        args: object[];
    }
}

export default TimerService;
