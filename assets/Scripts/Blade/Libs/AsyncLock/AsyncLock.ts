/**
 * 异步锁
 */
export default class AsyncLock {
    /**
     * 是否上锁
     */
    private _isLock: boolean = false;
    /**
     * 等待获取锁列表
     */
    private _waitList: Function[] = [];

    /**
     * 获取锁
     */
    public async lock() {
        if (this._isLock == true) {
            // 获取锁失败
            await new Promise<void>((resolve, reject) => {
                // 需要等待解锁
                this._waitList.push((isClear: boolean) => {
                    if (isClear == true) {
                        reject(new Error("强制清除锁"));
                    } else {
                        resolve();
                    }
                });
            });
        }
        // 获取锁成功
        this._isLock = true;
    }

    /**
     * 解锁
     */
    public unlock() {
        this._isLock = false;
        while (this._waitList.length > 0) {
            let wait = this._waitList.shift();
            if (wait != null) {
                // 允许下一个获取锁
                wait();
                return;
            }
        }
    }

    /**
     * 破锁
     */
    public break() {
        this._isLock = false;
        while (this._waitList.length > 0) {
            let wait = this._waitList.shift();
            if (wait != null) {
                wait(true);
            }
        }
    }
}
