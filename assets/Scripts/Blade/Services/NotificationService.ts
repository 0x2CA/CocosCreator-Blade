
import SingletonBase from "../Bases/SingletonBase";

/*
 * @作者: 0x2CA
 * @创建时间: 2022-10-27
 * @最后编辑时间: 2023-03-14
 * @最后编辑者: 0x2CA
 * @描述:
 */
export default class NotificationService extends SingletonBase<NotificationService> {

    private _event: cc.EventTarget = new cc.EventTarget();

    protected onInitialize() {
        this._event.clear();
    }

    protected onDispose() {
    }

    public hasEventListener(type: string): boolean {
        return this._event.hasEventListener(type);
    }

    public emit(key: any, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any): void {
        this._event.emit(key, arg1, arg2, arg3, arg4, arg5);
    }

    public on<T extends Function>(type: any, callback: T, target?: any, useCapture?: boolean): T {
        return this._event.on(type, callback, target, useCapture);
    }

    public off(type: any, callback?: Function, target?: any): void {
        this._event.off(type, callback, target);
    }

    public targetOff(target: any): void {
        this._event.targetOff(target);
    }

    public once(type: any, callback: (arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any) => void, target?: any): void {
        this._event.once(type, callback, target);
    }

    public clear(): void {
        this._event.clear();
    }

}
