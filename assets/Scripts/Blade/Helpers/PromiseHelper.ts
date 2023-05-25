import ITicker from "../Interfaces/ITicker";

/**
 *  异步助手
 */
export default class PromiseHelper {
    /**
    * 等待时间, 单位：秒
    * @param delay
    * @param comp 所属的组件, 如果不为空, 则组件销毁时该等待也会停止
    */
    public static wait<T extends cc.Component>(delay: number, comp?: T) {
        return new Promise((resolve, reject) => {
            if (comp) {
                comp.scheduleOnce(resolve, delay);
            } else {
                blade.timer.startTimeout(delay, resolve);
            }
        });
    }

    /**
     * Until条件达成才退出
     */
    public static waitUntil(untilFunc: (delta: number, ...args) => boolean, thisObj?: any, ...args: any[]): Promise<void> {
        if (untilFunc.call(thisObj, ...args)) {
            return Promise.resolve();
        }

        return new Promise((resolve, reject) => {
            let onTick: (delta: number) => void = null;
            onTick = (delta: number) => {
                try {
                    if (untilFunc.call(thisObj, delta, ...args)) {
                        blade.ticker.offTick(onTick);
                        resolve();
                    }
                } catch (e) {
                    blade.ticker.offTick(onTick);
                    reject(e);
                }
            }
            blade.ticker.onTick(onTick);
        });
    }

    /**
     * While条件不满足时退出
     */
    public static waitWhile(whileFunc: (delta: number, ...args) => boolean, thisObj?: any, ...args: any[]): Promise<void> {
        if (!whileFunc.call(thisObj, ...args)) {
            return Promise.resolve();
        }

        return new Promise((resolve, reject) => {
            let onTick: (delta: number) => void = null;
            onTick = (delta: number) => {
                try {
                    if (!whileFunc.call(thisObj, delta, ...args)) {
                        blade.ticker.offTick(onTick);
                        resolve();
                    }
                } catch (e) {
                    blade.ticker.offTick(onTick);
                    reject(e);
                }
            }
            blade.ticker.onTick(onTick);
        });
    }

    /**
     * 等待下一帧
     */
    public static nextFrame() {
        return new Promise((resolve, reject) => {
            cc.director.once(cc.Director.EVENT_BEFORE_UPDATE, resolve);
        });
    }
}
