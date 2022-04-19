

export default abstract class SingletonBase {

    public static getInstance<T extends SingletonBase>(this: new () => T): T {
        if (!(<any>this).instance) {
            (<any>this).instance = new this();
            (<any>this).instance.onInitialize();
        }
        return (<any>this).instance;
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