import IService from "./IService";

export default abstract class IFrameWork {

    public isInitialize: boolean = false;
    public initializeProgress: number = 0;

    public isLazyInitialize: boolean = false;
    public lazyInitializeProgress: number = 0;


    /**
     * 初始化服务
     */
    public async initialize() {
        if (this.isInitialize == false) {
            cc.log("初始化");
            let promises: Array<Promise<void>> = [];
            let total = 0;
            let success = 0;
            Object.getOwnPropertyNames(this).filter((name) => {
                return (this[name] as IService).initialize
            }).forEach((name) => {
                total++;
                promises.push((async () => {
                    await (this[name] as IService).initialize();
                    cc.log("初始化完成", name)
                    success++;
                    this.initializeProgress = success / total;
                })());
            })

            await Promise.all(promises);

            this.isInitialize = true;
        }
    }


    /**
     * 延时初始化服务
     */
    public async lazyInitialize() {
        if (this.isLazyInitialize == false) {

            cc.log("延迟初始化");
            let promises: Array<Promise<void>> = [];
            let total = 0;
            let success = 0;
            Object.getOwnPropertyNames(this).filter((name) => {
                return (this[name] as IService).lazyInitialize
            }).forEach((name) => {
                total++;
                promises.push((async () => {
                    await (this[name] as IService).lazyInitialize();
                    cc.log("延迟初始化完成", name)
                    success++;
                    this.initializeProgress = success / total;
                })());
            })

            await Promise.all(promises);

            this.isLazyInitialize = true;
        }
    }
} 
