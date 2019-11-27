import IModel from "../Interfaces/IModel";


/**
 * 模型装饰器
 * @param modelName 
 */
export default function Model(modelName: string) {
    return function (target: typeof IModel) {
        Reflect.defineProperty(target.prototype, "alias", {
            value: modelName
        })
    }
}