import ControllerBase from "../Bases/ControllerBase";

/**
 * 控制器装饰器
 * @param controllerName
 */
export default function Controller(controllerName: string) {
    return function (target: typeof ControllerBase) {
        Reflect.defineProperty(target.prototype, "alias", {
            value: controllerName
        })
    }
}