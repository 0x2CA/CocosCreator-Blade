import IService from "../Interfaces/IService";
import Service from "../Decorators/Service";
import Singleton from "../Decorators/Singleton";
import IController from "../Interfaces/IController";

@Singleton
@Service("CommandService")
export default class CommandService extends cc.EventTarget implements IService {
    public alias: string;
    public static readonly instance: CommandService;


    public initialize(): void {
    }

    public lazyInitialize(): void {
    }

    /**
     * 注册命令
     */
    public register(controller: IController) {
        const prototy = Object.getPrototypeOf(controller)
        Object.getOwnPropertyNames(prototy).filter((method: string) => {
            return typeof controller[method] === "function" && Reflect.hasMetadata(IController.COMMAND_META, controller[method])
        }).forEach((method: string) => {
            let cmd = Reflect.getMetadata(IController.COMMAND_META, controller[method]);
            this.on(cmd, controller[method], controller)
        })
    }

    /**
     * 注销注册命令
     */
    public unregister(controller: IController) {
        Object.getOwnPropertyNames(controller).filter((method: string) => {
            return typeof controller[method] === "function" && Reflect.hasMetadata(IController.COMMAND_META, controller[method])
        }).forEach((method: string) => {
            let cmd = Reflect.getMetadata(IController.COMMAND_META, controller[method]);
            this.off(cmd, controller[method], controller)
        })
    }

    /**
     * 执行命令
     * @param cmd 
     * @param args 
     */
    public exec(cmd: string | number, ...args) {
        this.emit(cmd.toString(), ...args)
    }


}
