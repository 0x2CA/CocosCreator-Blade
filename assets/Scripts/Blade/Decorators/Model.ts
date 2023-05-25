/*
 * @作者: 0x2CA
 * @创建时间: 2022-09-29
 * @最后编辑时间: 2023-03-20
 * @最后编辑者: 0x2CA
 * @描述: 模型装饰器
 */
export default function Model<T extends ModelBase>(modelName: string) {
    return function (target: { new(): T }) {
        Reflect.set(target, "_alias", modelName)
    }
}

import ModelBase from "../Bases/ModelBase";
