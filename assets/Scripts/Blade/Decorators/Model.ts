import ModelBase from "../Bases/ModelBase";


/**
 * 模型装饰器
 * @param modelName
 */
export default function Model(modelName: string) {
    return function (target: typeof ModelBase) {
        Reflect.defineProperty(target.prototype, "alias", {
            value: modelName
        })
    }
}