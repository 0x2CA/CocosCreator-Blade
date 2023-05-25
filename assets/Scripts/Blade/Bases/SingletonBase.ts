/*
 * @作者: 0x2CA
 * @创建时间: 2022-10-27
 * @最后编辑时间: 2023-03-15
 * @最后编辑者: 0x2CA
 * @描述: 单例父类
 */
export default abstract class SingletonBase<T extends SingletonBase<T>> {

    public static getInstance<T extends SingletonBase<T>>(this: new () => T): T {

        let instance = Reflect.get(this, "_instance") as T;
        if (instance == null) {
            instance = new this();
            Reflect.set(this, "_instance", instance);
            instance.onInitialize();
        }

        return instance;
    }

    /**
    * 初始化函数，供重载
    */
    protected abstract onInitialize();

    /**
    * 销毁函数，供重载
    */
    protected abstract onDispose();

}