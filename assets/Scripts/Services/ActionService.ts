import IService from "../Interfaces/IService";
import Service from "../Decorators/Service";
import Singleton from "../Decorators/Singleton";
import IView from "../Interfaces/IView";

@Singleton
@Service("ActionService")
export default class ActionService extends cc.EventTarget implements IService {
    public alias: string;
    public static readonly instance: ActionService;


    public initialize(): void {
    }

    public lazyInitialize(): void {
    }

    /**
     * 注册命令
     */
    public register(view: IView) {
        const prototy = Object.getPrototypeOf(view)
        Object.getOwnPropertyNames(prototy).filter((method: string) => {
            return typeof view[method] === "function" && Reflect.hasMetadata(IView.ACTION_META, view[method])
        }).forEach((method: string) => {
            let cmd = Reflect.getMetadata(IView.ACTION_META, view[method]);
            this.on(cmd, view[method], view)
        })
    }

    /**
     * 注销注册命令
     */
    public unregister(view: IView) {
        Object.getOwnPropertyNames(view).filter((method: string) => {
            return typeof view[method] === "function" && Reflect.hasMetadata(IView.ACTION_META, view[method])
        }).forEach((method: string) => {
            let cmd = Reflect.getMetadata(IView.ACTION_META, view[method]);
            this.off(cmd, view[method], view)
        })
    }

    /**
     * 执行动作
     * @param cmd 
     * @param args 
     */
    public do(cmd: string | number, ...args) {
        this.emit(cmd.toString(), ...args)
    }
}
