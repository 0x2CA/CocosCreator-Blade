import ControllerBase from "../Bases/ControllerBase";
import SingletonBase from "../Bases/SingletonBase";


class ControllerService extends SingletonBase {

    private controllerInfos: Map<any, ControllerService.ControllerInfo> = new Map<any, ControllerService.ControllerInfo>()

    public onInitialize() {
        this.controllerInfos.clear();
    }

    public onDispose() {
    }

    /**
     * 获取Controller
     * @param controllerType
     */
    public getController<T extends ControllerBase>(controllerType: new () => T): T {
        let controller = this.controllerInfos.get(controllerType)?.controller as T;

        if (controller == null) {
            controller = this.createController(controllerType);
        }

        return controller;
    }

    public getControllerByAlias(alias) {
        let controller = null;

        this.controllerInfos.forEach((info) => {
            if (info.alias == alias) {
                controller = info.controller;
            }
        });

        return controller;
    }

    /**
     * 创建Controller
     * @param controllerType
     */
    private createController<T extends ControllerBase>(controllerType: new () => T): T {
        let controller: T = new controllerType();

        this.controllerInfos.set(controllerType, {
            controller: controller,
            alias: (controller as any).alias,
        });

        if ((controller as any).alias == null || (controller as any).alias == "") {
            console.warn("Controller的名称是空的，请检查是否使用了Controller装饰器");
        }

        controller.onInitialize();

        return controller
    }

}

namespace ControllerService {

    export class ControllerInfo {
        public controller: ControllerBase;
        public alias: string;
    }

}

export default ControllerService;