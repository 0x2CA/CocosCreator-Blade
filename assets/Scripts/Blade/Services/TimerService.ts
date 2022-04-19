import ViewBase from "../Bases/ViewBase";
import ITicker from "../../Blade/Interfaces/ITicker";
import SingletonBase from "../Bases/SingletonBase";
import TickerService from "./TickerService";

/**
 * 时间服务
 */
class TimerService extends SingletonBase implements ITicker {

    // 自动同步时间间隔
    private static readonly SYNC_INTERVAL: number = 60000;
    // 时间最大可接受差值
    private static readonly MAX_TIME_DIFF: number = 60000;

    /**
     * 当前服务器的时间戳
     */
    private timeStamp: number = new Date().getTime();

    /**
     * 最后同步的时间
     */
    private lastSyncTime: number = new Date().getTime();

    /**
     * 是否正在同步时间
     */
    private syncing: boolean = false;

    private readonly timers: Set<TimerService.Timer> = new Set<TimerService.Timer>()

    public onInitialize() {

        TickerService.getInstance().on(this);

        this.timers.clear();

        // 定时更新时间
        this.startTimer(1, () => {
            if (this.timeStamp > 0) {
                this.timeStamp += 1000;
            }
            if (!this.syncing && this.timeStamp - this.lastSyncTime > TimerService.SYNC_INTERVAL) {
                this.syncTime();
            }
        })
    }

    public onDispose() {
        TickerService.getInstance().off(this);
    }

    /**
     * 网络同步时间
     */
    public syncTime(): Promise<void> {
        if (this.syncing) {
            cc.log("正在同步时间!");
            return Promise.resolve();
        }

        this.syncing = true;

        return new Promise((resolve, reject) => {
            // //TODO: 暂时使用本地时间
            this.lastSyncTime = new Date().getTime();
            this.timeStamp = new Date().getTime();
            this.syncing = false;
            cc.log("同步时间", this.timeStamp)
            resolve()
        })
    }


    /**
    * 获取当时网络时间(毫秒)
    */
    public getTime() {
        return Math.floor(this.timeStamp);
    }

    /**
     * 获取当时网络时间(秒)
     */
    public getSecond() {
        return Math.floor(this.timeStamp / 1000);
    }


    /**
     * 开始一个定时器
     * @param seconds
     * @param callback
     * @param thisArgs
     * @param args
     */
    public startTimer(seconds: number, callback: Function, thisArgs?: any, ...args: any[]): TimerService.Timer {
        let timer = {
            interval: seconds,
            timeRemain: seconds,
            times: -1,
            callback,
            thisArgs,
            args
        };

        this.timers.add(timer)
        return timer
    }

    /**
     * 停止一个定时器
     * @param timer
     */
    public stopTimer(timer: TimerService.Timer) {
        this.timers.delete(timer)
    }


    /**
     * 添加一个超时回调
     * @param timeout 超时时间, 单位：秒
     * @param callback 回调
     * @param target 回调上下文对象
     * @param args 回调附带参数
     */
    public startTimeout(timeout: number, callback: Function, target?: any, ...args: any[]): TimerService.Timer {
        let timer = {
            interval: timeout,
            timeRemain: timeout,
            times: 1,
            callback,
            thisArgs: target,
            args
        }

        this.timers.add(timer);

        return timer;
    }


    /**
     * 下一帧执行
     * @param func
     */
    public runNextFrame(func: Function, target?: any) {
        cc.director.once(cc.Director.EVENT_BEFORE_UPDATE, func as any, target);
    }


    onTick(delta: number): void {
        let deleteList = []
        this.timers.forEach((timer) => {
            //减时间
            timer.timeRemain -= delta;
            if (timer.timeRemain <= 0) {
                // 时间结束
                timer.callback.apply(timer.thisArgs, ...timer.args);

                if (timer.times > 0) {
                    --timer.times;
                }
                if (timer.times == 0) {
                    // 达到次数, 加入待删除队列
                    deleteList.push(timer);
                }
                else {
                    timer.timeRemain = timer.interval;
                }
            }
        })

        // 删除过期定时器
        deleteList.forEach(timer => {
            this.stopTimer(timer);
        });
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
        thisArgs?: any;
        /**
         * 参数
         */
        args: any[];
    }
}

export default TimerService;
