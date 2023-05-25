
import ControllerBase from "../Bases/ControllerBase";
import SingletonBase from "../Bases/SingletonBase";
import ViewService from "./ViewService";

/*
 * @作者: 0x2CA
 * @创建时间: 2022-09-29
 * @最后编辑时间: 2023-03-19
 * @最后编辑者: 0x2CA
 * @描述:
 */
class ControllerService extends SingletonBase<ControllerService> {

    private _controllers: Map<string, ControllerBase> = new Map<string, ControllerBase>()

    protected onInitialize() {
        this._controllers.clear();
    }

    protected onDispose() {
    }

    private getAlias<T extends ControllerBase>(controllerType: new () => T): string {
        return Reflect.get(controllerType, "_alias");
    }

    /**
     * 获取Controller
     * @param controllerType
     */
    public get<T extends ControllerBase>(controllerType: new () => T): T {
        let alias = this.getAlias(controllerType);

        let controller = this._controllers.get(alias) as T;

        if (controller == null) {
            controller = this.createController(controllerType);
        }

        return controller;
    }

    public getByAlias(alias) {
        return this._controllers.get(alias);
    }

    /**
     * 创建Controller
     * @param controllerType
     */
    private createController<T extends ControllerBase>(controllerType: new () => T): T {
        let alias = this.getAlias(controllerType);

        if (alias == null || alias == "") {
            console.warn("Controller的名称是空的，请检查是否使用了Controller装饰器");
        }

        let controller: T = new controllerType();

        this._controllers.set(alias, controller);

        // 界面关闭通知监听
        let onCloseViewBefore = Reflect.get(controller, "onCloseViewBefore");
        blade.notice.on(ViewService.EventType.CloseViewBefore, onCloseViewBefore, controller);

        let noticeEvents = Reflect.get(controller, "_noticeEvents") as Map<any, Set<string>>;

        if (noticeEvents) {
            noticeEvents.forEach((functionList, eventName) => {
                functionList.forEach((functionName) => {
                    blade.notice.on(eventName, controller[functionName], controller);
                });
            });
        }

        if (controller["onTick"] && controller["onFixedTick"] && controller["onLateTick"]) {
            // 有实现相应的接口
            blade.ticker.on(controller as any);
        }

        let onInitialize = Reflect.get(controller, "onInitialize");
        onInitialize.call(controller);

        return controller
    }

}

namespace ControllerService {

}

export default ControllerService;