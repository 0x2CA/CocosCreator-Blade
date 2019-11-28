import IService from "./IService";

export default abstract class IApplication {

    /**
     * 初始化服务
     */
    public initialize() {
        Object.getOwnPropertyNames(this).filter((name) => {
            return (this[name] as IService).initialize
        }).forEach((name) => {
            (this[name] as IService).initialize();
        })
    }


    /**
     * 延时初始化服务
     */
    public lazyInitialize() {
        Object.getOwnPropertyNames(this).filter((name) => {
            return (this[name] as IService).lazyInitialize
        }).forEach((name) => {
            (this[name] as IService).lazyInitialize();
        })
    }
}
