import ITicker from "./ITicker";
import Ticker from "../Decorators/Ticker";

export default abstract class IController extends cc.Component implements ITicker {

    public static readonly COMMAND_META: string = 'command';

    public readonly alias: string;


    onLoad() {
        // 注册控制器
        app.ctrl.register(this);
        // 注册命令
        app.cmd.register(this);
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

        // 注销控制器
        app.ctrl.unregister(this);
        // 注销命令
        app.cmd.unregister(this);
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
