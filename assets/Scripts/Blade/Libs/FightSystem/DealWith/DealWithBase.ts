/**
 * 处理基类
 */
export default abstract class DealWithBase {

    private _isFinish: boolean = false;

    /**
     * 是否完成
     * @returns
     */
    public isFinish(): boolean {
        return this._isFinish;
    }

    /**
     * 设置完成
     */
    protected finish() {
        this._isFinish = true;
    }
}