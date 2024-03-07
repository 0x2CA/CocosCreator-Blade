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
                this._waitList.push(resolve);
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
            let resolve = this._waitList.shift();
            if (resolve != null) {
                // 允许下一个获取锁
                resolve();
                return;
            }
        }
    }
}