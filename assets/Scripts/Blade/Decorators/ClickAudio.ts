/*
 * @作者: 0x2CA
 * @创建时间: 2022-10-27
 * @最后编辑时间: 2023-03-17
 * @最后编辑者: 0x2CA
 * @描述: 点击通知装饰器
 */
export default function ClickAudio(hasAudio: boolean = false, audio: string = "") {
    return function (target: ViewBase, propertyKey: string) {
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

        audioInfos.set(propertyKey, {
            hasAudio,
            audio
        });
    }
}

import ViewBase from "../Bases/ViewBase";
