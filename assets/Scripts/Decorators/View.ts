import IView from "../Interfaces/IView"


/**
 * 视图装饰器
 * @param viewName 
 */
export default function View(viewName: string) {
    return function (target: typeof IView) {
        Reflect.defineProperty(target.prototype, "alias", {
            value: viewName
        })
    }
}