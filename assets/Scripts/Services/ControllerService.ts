import IService from "../Interfaces/IService";
import Service from "../Decorators/Service";
import Singleton from "../Decorators/Singleton";
import IController from "../Interfaces/IController";


@Singleton
@Service("ControllerService")
export default class ControllerService implements IService {
    public alias: string;
    public static readonly instance: ControllerService;


    private list: Map<string, IController>

    public initialize(): void {
        this.list = new Map<string, IController>();
    }

    public lazyInitialize(): void {
    }


    /**
    * 注册控制器
    */
    public register(controller: IController) {
        if (this.list.has(controller.alias)) {
            throw new Error(`已经存在${controller.alias}控制器!`);
        } else {
            this.list.set(controller.alias, controller)
        }
    }

    /**
     * 注销控制器
     */
    public unregister(controller: IController) {
        if (this.list.has(controller.alias)) {
            this.list.delete(controller.alias)
        }
    }

    /**
     * 获取指定控制器
     * @param alias 
     */
    public getController(alias: string): IController {
        if (this.list.has(alias)) {
            return this.list.get(alias)
        }
    }

    /**
    * 命令控制器调用指定方法
    */
    public orderViewById(alias: string, funcName: string, ...args: any[]): any {
        const controller: IController = this.getController(alias);
        if (controller == null) {
            throw new Error(`控制器（${alias}）不存在`);
        }

        return controller.order(funcName, ...args);
    }

}
