

/*
 * @作者: 0x2CA
 * @创建时间: 2022-09-29
 * @最后编辑时间: 2023-03-17
 * @最后编辑者: 0x2CA
 * @描述: 点击通知装饰器
 */
export default function ClickEvent(callback?: string) {
    return function (target: ViewBase, propertyKey: string) {
        let nodeEvents = Reflect.get(target, "_nodeEvents") as Map<string, Map<string, Set<string>>>;
        if (nodeEvents == null) {
            nodeEvents = new Map<string, Map<string, Set<string>>>();
            Reflect.set(target, "_nodeEvents", nodeEvents);
        }

        if (nodeEvents.has(propertyKey) == false) {
            nodeEvents.set(propertyKey, new Map<string, Set<string>>());
        }

        let events = nodeEvents.get(propertyKey);

        if (events.has(cc.Node.EventType.TOUCH_END as string) == false) {
            events.set(cc.Node.EventType.TOUCH_END as string, new Set<string>());
        }

        if (callback == null || callback == "") {
            // 尝试添加默认回调
            callback = "on" + propertyKey.replace("_", "").replace(/^\S/, s => s.toUpperCase())
        }

        // 因为声音尝试重定向回调
        let oldCallback: Function = Reflect.get(target, callback);
        if (oldCallback != null) {
            let audioInfos = Reflect.get(target, "_audioInfos") as Map<string, {
                hasAudio: boolean,
                audio: string
            }>;

            if (audioInfos == null) {
                audioInfos = new Map<string, {
                    hasAudio: boolean,
                    audio: string
                }>();
                Reflect.set(target, "_audioInfos", audioInfos);
            }

            target[callback] = function (...args: any[]) {
                let info = audioInfos.get(propertyKey);
                oldCallback.call(this, ...args);
                if (info == null) {
                    // 为空默认播放
                    if (GameConfig.defaultButtonAudio != null && GameConfig.defaultButtonAudio != "") {
                        blade.audio.playSFX(GameConfig.defaultButtonAudio);
                    }
                } else if (info.hasAudio == true) {
                    if (info.audio != null && info.audio != "") {
                        blade.audio.playSFX(info.audio);
                    } else if (GameConfig.defaultButtonAudio != null && GameConfig.defaultButtonAudio != "") {
                        blade.audio.playSFX(GameConfig.defaultButtonAudio);
                    }
                }
            }
        }

        events.get(cc.Node.EventType.TOUCH_END as string).add(callback);
    }
}

import GameConfig from "../../Module/Defines/GameConfig";
import ViewBase from "../Bases/ViewBase";

