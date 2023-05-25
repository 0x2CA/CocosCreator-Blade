
/*
 * @作者: 0x2CA
 * @创建时间: 2022-10-27
 * @最后编辑时间: 2023-03-17
 * @最后编辑者: 0x2CA
 * @描述: 全局通知装饰器
 */
export default function NoticeEvent(event: GameEvent | string) {
    return function (target: ViewBase | ControllerBase, propertyKey: string, descriptor: PropertyDescriptor) {
        let noticeEvents = Reflect.get(target, "_noticeEvents") as Map<any, Set<string>>;
        if (noticeEvents == null) {
            noticeEvents = new Map<any, Set<string>>();
            Reflect.set(target, "_noticeEvents", noticeEvents);
        }

        if (noticeEvents.has(event) == false) {
            noticeEvents.set(event, new Set<string>());
        }
        noticeEvents.get(event).add(propertyKey);
    }
}

import GameEvent from "../../Module/Defines/GameEvent";
import ControllerBase from "../Bases/ControllerBase";
import ViewBase from "../Bases/ViewBase";

