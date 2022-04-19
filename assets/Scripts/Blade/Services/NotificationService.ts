import SingletonBase from "../Bases/SingletonBase";

export default class NotificationService extends SingletonBase {

    private event: cc.EventTarget = new cc.EventTarget();

    public onInitialize() {
        this.event.clear();
    }

    public onDispose() {
    }

    public hasEventListener(type: string): boolean {
        return this.event.hasEventListener(type);
    }

    public emit(key: string, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any): void {
        this.event.emit(key, arg1, arg2, arg3, arg4, arg5);
    }
    public on<T extends Function>(type: string, callback: T, target?: any, useCapture?: boolean): T {
        return this.event.on(type, callback, target, useCapture);
    }

    public off(type: string, callback?: Function, target?: any): void {
        this.event.off(type, callback, target);
    }

    public targetOff(target: any): void {
        this.event.targetOff(target);
    }

    public once(type: string, callback: (arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any) => void, target?: any): void {
        this.on(type, callback, target, true);
    }

    public clear(): void {
        this.event.clear();
    }

}
