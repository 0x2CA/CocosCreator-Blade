/*
 * @作者: 0x2CA
 * @创建时间: 2022-10-27
 * @最后编辑时间: 2023-03-17
 * @最后编辑者: 0x2CA
 * @描述: NodeEvent通知装饰器
 */

export default function NodeEvent(touchType: cc.Node.EventType | cc.Animation.EventType | cc.ScrollView.EventType, nodeName?: string) {
    return function (target: ViewBase, propertyKey: string, descriptor: PropertyDescriptor) {
        let nodeEvents = Reflect.get(target, "_nodeEvents") as Map<string, Map<string, Set<string>>>;
        if (nodeEvents == null) {
            nodeEvents = new Map<string, Map<string, Set<string>>>();
            Reflect.set(target, "_nodeEvents", nodeEvents);
        }

        if (nodeName == null || nodeName === "") {
            nodeName = propertyKey.replace(/^on/, "").replace(/^\S/, s => s.toLowerCase());
        }

        if (nodeEvents.has(nodeName) == false) {
            nodeEvents.set(nodeName, new Map<string, Set<string>>());
        }

        let events = nodeEvents.get(nodeName);

        if (events.has(touchType as string) == false) {
            events.set(touchType as string, new Set<string>());
        }

        events.get(touchType as string).add(propertyKey);
    }
}

import ViewBase from "../Bases/ViewBase";
