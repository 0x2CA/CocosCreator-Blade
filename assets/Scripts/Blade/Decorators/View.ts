/*
 * @作者: 0x2CA
 * @创建时间: 2023-02-09
 * @最后编辑时间: 2023-03-20
 * @最后编辑者: 0x2CA
 * @描述: 视图装饰器
 */
export default function View<T extends ViewBase>(viewName: string) {
    return function (target: { new(): T }) {
        Reflect.set(target.prototype, "_alias", viewName);
        Reflect.set(target, "_alias", viewName);
    }
}

import ViewBase from "../Bases/ViewBase";
