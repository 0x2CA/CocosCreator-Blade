/*
 * @作者: 0x2CA
 * @创建时间: 2022-10-27
 * @最后编辑时间: 2023-03-17
 * @最后编辑者: 0x2CA
 * @描述: Socket通知装饰器
 */
export default function SocketEvent(messageId: protobuf.MessageIds) {
    return function (target: ModelBase, propertyKey: string, descriptor: PropertyDescriptor) {
        let socketEvents = Reflect.get(target, "_socketEvents") as Map<number, Set<string>>;
        if (socketEvents == null) {
            socketEvents = new Map<number, Set<string>>();
            Reflect.set(target, "_socketEvents", socketEvents);
        }

        if (socketEvents.has(messageId) == false) {
            socketEvents.set(messageId, new Set<string>());
        }
        socketEvents.get(messageId).add(propertyKey);
    }
}

import { protobuf } from "../../Module/Protobuf/protobuf";
import ModelBase from "../Bases/ModelBase";

