import IService from "../../Blade/Interfaces/IService";
import Service from "../../Blade/Decorators/Service";
import Singleton from "../../Blade/Decorators/Singleton";
import IController from "../../Blade/Interfaces/IController";


@Singleton
@Service("ControllerService")
export default class ControllerService implements IService {
    public alias: string;
    public static readonly instance: ControllerService;


    private list: Map<string, IController>

    public async initialize(){
        this.list = new Map<string, IController>();
    }

    public async lazyInitialize() {
    }


    /**
    * 注册控制器
    */
    public register(controller: IController) {
        if (this.list.has(controller.alias)) {
            cc.error(`已经存在${controller.alias}控制器!`);
            this.unregister(this.list.get(controller.alias))
            this.register(controller);
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
    public orderControllerById(alias: string, funcName: string, ...args: any[]): any {
        const controller: IController = this.getController(alias);
        if (controller == null) {
            cc.error(`控制器（${alias}）不存在`);
            return;
        }

        return controller.order(funcName, ...args);
    }

}
