import IView from "../Interfaces/IView";


/**
 * 动作装饰器
 * @param commandName 
 */
export default function Action(commandName: string | number) {
    return function (target: IView, method: string, desc: PropertyDescriptor) {
        if (typeof target[method] === "function") {
            Reflect.defineMetadata(IView.ACTION_META, `${commandName}`, desc.value);
        }
    }
}