import ITicker from "./ITicker";

export default abstract class IView extends cc.Component implements ITicker {
    public readonly alias: string;
    public static ACTION_META = "action"

    onLoad() {
        // 注册视图
        app.view.register(this);
        // 注册动作
        app.action.register(this);
        // 注册计时器
        app.ticker.register(this);

        if (this.onRegister) {
            this.onRegister();
        }
    }

    onDestroy() {
        if (this.onUnRegister) {
            this.onUnRegister();
        }

        // 注销视图
        app.view.unregister(this);
        // 注销动作
        app.action.unregister(this);
        // 注销计时器
        app.ticker.unregister(this);
    }

    /**
    * 供外部调用视图内的方法
    * @param funcName 
    * @param args 
    */
    public order(funcName: string, ...args: any[]): any {
        if (typeof this[funcName] === 'function') {
            return this[funcName].call(this, ...args);
        }
        else {
            console.error(`调用${this.alias}不存在的方法${funcName}`);
        }
    }

    abstract onTick(delta: number): void
    onFixedTick?(delta: number): void
    onLateTick?(): void

    /**
     * 注册
     */
    onRegister?(): void
    /**
     * 注销
     */
    onUnRegister?(): void

}
