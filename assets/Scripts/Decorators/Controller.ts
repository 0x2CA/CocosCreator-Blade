import IController from "../Interfaces/IController";

/**
 * 控制器装饰器
 * @param controllerName 
 */
export default function Controller(controllerName: string) {
    return function (target: typeof IController) {
        Reflect.defineProperty(target.prototype, "alias", {
            value: controllerName
        })
    }
}