

/*
 * @作者: 0x2CA
 * @创建时间: 2022-10-27
 * @最后编辑时间: 2023-03-20
 * @最后编辑者: 0x2CA
 * @描述: 控制器装饰器
 */
export default function Controller<T extends ControllerBase>(controllerName: string) {
    return function (target: { new(): T }) {
        Reflect.set(target, "_alias", controllerName)
    }
}

import ControllerBase from "../Bases/ControllerBase";
