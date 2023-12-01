let allNoticeEvents: Map<object, Map<any, Set<string>>> = new Map<object, Map<any, Set<string>>>();

/*
 * @作者: 0x2CA
 * @创建时间: 2022-10-27
 * @最后编辑时间: 2023-03-17
 * @最后编辑者: 0x2CA
 * @描述: 全局通知装饰器
 */
export default function NoticeEvent(event: GameEvent | string) {
    return function (target: ViewBase | ControllerBase, propertyKey: string, descriptor: PropertyDescriptor) {
        let noticeEvents = allNoticeEvents.get(target);
        if (noticeEvents == null) {
            noticeEvents = new Map<any, Set<string>>();
            allNoticeEvents.set(target, noticeEvents)

            // 需要移动父亲的数据到当前节点
            let parentTarget = Reflect.getPrototypeOf(target);
            if (parentTarget != null) {
                let parentNoticeEvents = allNoticeEvents.get(parentTarget);
                if (parentNoticeEvents != null) {
                    parentNoticeEvents.forEach((value, key, map) => {
                        let functionList = noticeEvents.get(key);
                        if (functionList == null) {
                            functionList = new Set<string>();
                            noticeEvents.set(key, functionList);
                        }
                        value.forEach((item) => {
                            functionList.add(item);
                        });
                    });
                }
            }
        }
        let functionList = noticeEvents.get(event);
        if (functionList == null) {
            functionList = new Set<string>();
            noticeEvents.set(event, functionList);
        }
        functionList.add(propertyKey);
    }
}

export function getNoticeEvents(obj: object, isClass: boolean = false): Map<any, Set<string>> {
    let target = isClass ? obj : Reflect.getPrototypeOf(obj);

    let noticeEvents = allNoticeEvents.get(target);
    if (noticeEvents != null) {
        return noticeEvents;
    }

    let parentTarget = Reflect.getPrototypeOf(target);

    if (parentTarget != null) {
        let noticeEvents = getNoticeEvents(parentTarget, true);
        if (noticeEvents != null) {
            allNoticeEvents.set(target, noticeEvents);
            return noticeEvents;
        }
    }

    return null;
}

import GameEvent from "../../Module/Defines/GameEvent";
import ControllerBase from "../Bases/ControllerBase";
import ViewBase from "../Bases/ViewBase";

