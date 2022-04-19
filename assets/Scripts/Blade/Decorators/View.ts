import ViewBase from "../Bases/ViewBase"


/**
 * 视图装饰器
 * @param viewName
 */
export default function View(viewName: string) {
    return function (target: typeof ViewBase) {
        Reflect.defineProperty(target.prototype, "alias", {
            value: viewName
        })
    }
}