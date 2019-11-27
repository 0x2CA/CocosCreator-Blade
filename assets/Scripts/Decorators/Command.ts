import IController from "../Interfaces/IController";

/**
 * 命令装饰器
 * @param commandName 
 */
export default function Command(commandName: string | number) {
    return function (target: IController, method: string, desc: PropertyDescriptor) {
        if (typeof target[method] === "function") {
            Reflect.defineMetadata(IController.COMMAND_META, `${commandName}`, desc.value);
        }
    }
}