
export default abstract class ControllerBase {

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
            cc.error(`调用${(this as any).alias}不存在的方法${funcName}`);
        }
    }

    /**
     * 初始化函数，供重载
     */
    public abstract onInitialize();

    /**
    * 销毁函数，供重载
    */
    public abstract onDispose();

}
