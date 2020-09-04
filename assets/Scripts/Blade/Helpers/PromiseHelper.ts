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
    public static waitUntil(untilFunc: Function, thisObj?: any, ...args: any[]): Promise<any> {
        if (untilFunc.call(thisObj, ...args)) {
            return Promise.resolve();
        }

        return new Promise((resolve, reject) => {
            let ticker;
            ticker = {
                onTick: () => {
                    try {
                        if (untilFunc.call(thisObj, ...args)) {
                            blade.ticker.unregister(ticker);
                            resolve();
                        }
                    } catch (e) {
                        blade.ticker.unregister(ticker);
                        reject(e);
                    }
                },
            };
            blade.ticker.register(ticker);
        });
    }

	/**
	 * While提交达成前一直等待
	 */
    public static waitWhile(whileFunc: Function, thisObj?: any, ...args: any[]): Promise<any> {
        if (!whileFunc.call(thisObj, ...args)) {
            return Promise.resolve();
        }

        return new Promise((resolve, reject) => {
            let ticker;
            ticker = {
                onTick: () => {
                    try {
                        if (!whileFunc.call(thisObj, ...args)) {
                            blade.ticker.unregister(ticker);
                            resolve();
                        }
                    } catch (e) {
                        blade.ticker.unregister(ticker);
                        reject(e);
                    }
                },
            };
            blade.ticker.register(ticker);
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

    /**
	 * 加载一个资源
	 * @param url
	 */
    public static loadRes<T extends cc.Asset>(url: string, type: typeof cc.Asset): Promise<T> {
        return new Promise((resolve, reject) => {
            cc.resources.load(url, type, (err: Error, res: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res as T);
                }
            });
        });
    }

	/**
	 * 加载一组资源
	 * @param url
	 */
    public static loadResArray<T extends cc.Asset>(
        url: string[],
        type: typeof cc.Asset
    ): Promise<T[]> {
        return new Promise((resolve, reject) => {
            cc.resources.load(url, type, (err: Error, res: any[]) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res as T[]);
                }
            });
        });
    }

    /**
    * 加载一个远程资源
    * @param url
    */
    public static loadRemote(url: string, opttion = {}): Promise<any> {
        return new Promise((resolve, reject) => {
            cc.assetManager.loadRemote(url, opttion,
                (err: Error, res: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                }
            );
        });
    }

}
