
/**
 * 单例装饰器
 * @param target 
 */
export default function Singleton(target: Function) {

    const clazz: any = target;

    Reflect.defineProperty(target, "instance", {
        get: function () {
            if (clazz._instance == null) {
                clazz._instance = new clazz();
            }
            return clazz._instance;
        },
        set: function () {
            throw new Error(`不允许对单例赋值!`);
        }
    })
}

