import SingletonBase from "../Bases/SingletonBase";

class PlatformService extends SingletonBase<PlatformService> {

    // 当前平台
    private _platform: PlatformBase;

    // 存档
    private _archive: PlatformService.Archive = null;

    protected onInitialize() {

        switch (this.getType()) {
            case PlatformService.PlatformType.WX:
                this._platform = new WxPlatform();
                break;
            case PlatformService.PlatformType.QQ:
                this._platform = new QQPlatform();
                break;
            case PlatformService.PlatformType.ANDROID:
                this._platform = new AndroidPlatform();
                break;
            case PlatformService.PlatformType.BYTEDANCE:
                this._platform = new TTPlatform();
                break;
            case PlatformService.PlatformType.OPPO:
                this._platform = new OppoPlatform();
                break;
            case PlatformService.PlatformType.VIVO:
                this._platform = new VivoPlatform();
                break;
            case PlatformService.PlatformType.XIAOMI:
                this._platform = new XiaoMiPlatform();
                break;
            case PlatformService.PlatformType.HUAWEI:
                this._platform = new HuaWeiPlatform();
                break;
            case PlatformService.PlatformType.IOS:
                this._platform = new IOSPlatform();
                break;
            default:
                this._platform = new WebPlatform();
                break;
        }

        let onInitialize = Reflect.get(this._platform, "onInitialize");
        onInitialize.call(this._platform);

        this._archive = new PlatformService.Archive(this._platform);
    }

    protected onDispose() {
    }

    /**
     * 获取平台类型
     *
     * @readonly
     * @type {PlatformService.PlatformType}
     * @memberof PlatformService
     */
    public getType(): PlatformService.PlatformType {
        if (cc.sys.platform === cc.sys.ANDROID) {
            // Android
            return PlatformService.PlatformType.ANDROID;
        } else if (cc.sys.platform === cc.sys.IPHONE || cc.sys.platform === cc.sys.IPAD) {
            // iOS
            return PlatformService.PlatformType.IOS
        } else if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            // 微信小游戏
            return PlatformService.PlatformType.WX
        } else if (cc.sys.platform === cc.sys.QQ_PLAY) {
            // 手Q
            return PlatformService.PlatformType.QQ
        } else if (cc.sys.platform === cc.sys.BYTEDANCE_GAME) {
            // 抖音
            return PlatformService.PlatformType.BYTEDANCE
        } else if (cc.sys.platform === cc.sys.BYTEDANCE_GAME) {
            return PlatformService.PlatformType.BYTEDANCE
        } else if (cc.sys.platform === cc.sys.OPPO_GAME) {
            // OPPO 小游戏
            return PlatformService.PlatformType.OPPO
        } else if (cc.sys.platform === cc.sys.VIVO_GAME) {
            // VIVO 小游戏
            return PlatformService.PlatformType.VIVO
        } else if (cc.sys.platform === cc.sys.HUAWEI_GAME) {
            // HUAWEI 小游戏
            return PlatformService.PlatformType.HUAWEI
        } else if (cc.sys.platform === cc.sys.XIAOMI_GAME) {
            // XIAOMI 小游戏
            return PlatformService.PlatformType.XIAOMI
        } else if (window["FBInstant"] != null) {
            // Facebook instant game
            return PlatformService.PlatformType.FACEBOOK
        } else {
            // web
            return PlatformService.PlatformType.WEB
        }
    }

    /**
     * 获取当前平台对象
     */
    get<T extends PlatformBase>(): T {
        return this._platform as T;
    }

    /**
     * 获取存档
     */
    getArchive(): PlatformService.Archive {
        return this._archive;
    }

}

namespace PlatformService {
    export enum PlatformType {
        WX,
        QQ,
        FACEBOOK,
        ANDROID,
        IOS,
        WEB,
        BYTEDANCE,
        OPPO,
        VIVO,
        HUAWEI,
        XIAOMI
    }

    /**
    * 内置事件
    */
    export type EventType = PlatformBase.EventType

    /**
     * 存档
     */
    export class Archive {

        private _platform: PlatformBase = null;

        // 数据
        private _data: { alterTime: number } | { [key: string]: object } = null;

        private _autoSaveSecond: number = 3;
        private _autoSyncSecond: number = 5;

        private _autoSaveTimer: TimerService.Timer = null;
        private _autoSyncSaveTimer: TimerService.Timer = null;

        constructor(platform: PlatformBase) {

            this._platform = platform;

            // 同步数据
            this._data = this.loadLocal()
            console.log("游戏数据：", this._data);

            // 定时保存
            if (this._autoSaveTimer) {
                blade.timer.stop(this._autoSaveTimer)
            }

            this._autoSaveTimer = blade.timer.startTimer(this._autoSaveSecond, () => {
                this.saveLocal(this._data);
            }, this);

            if (this._autoSyncSaveTimer) {
                blade.timer.stop(this._autoSyncSaveTimer)
            }

            this._autoSyncSaveTimer = blade.timer.startTimer(this._autoSyncSecond, () => {
                if (this.saveRemote != null) {
                    this.saveRemote(this._data);
                }
            }, this);
        }

        /**
        * 从本地读取存档
        */
        loadLocal() {
            try {
                const result = JSON.parse(this._platform.getArchive('Archive'));
                if (result != null) {
                    return result;
                } else {
                    return { alterTime: blade.timer.getTime() };
                }
            } catch (e) {
                return { alterTime: blade.timer.getTime() };
            }
        }

        /**
         * 保存数据到本地
         */
        async saveLocal(data: object) {
            // 通过调用平台本地存档接口进行保存
            try {
                this._data.alterTime = blade.timer.getTime();
                this._platform.saveArchive('Archive', JSON.stringify(data));
            } catch (error) {
            }
        }

        private localRemote: () => Promise<{ alterTime: number } | { [key: string]: object }> = null
        private saveRemote: (data: { alterTime: number } | { [key: string]: object }) => void = null;

        /**
       * 本地和网络存档进行同步
       */
        public async sync(localRemote: () => Promise<{ alterTime: number } | { [key: string]: object }>, saveRemote: (data: { alterTime: number } | { [key: string]: object }) => void) {
            this.localRemote = localRemote;
            this.saveRemote = saveRemote;

            const remoteData = await localRemote();
            const localData = this._data;
            //本地无存档
            if (localData == null) {
                console.log("本地无存档!")
                this._data = remoteData;
                return;
            }

            const localTime = localData.alterTime || 0;
            const remoteTime = remoteData && remoteData.alterTime || 0;
            if (localTime < remoteTime) {
                // 网络覆盖本地
                console.log("更新本地存档")
                this._data = remoteData;
                await this.saveLocal(this._data)
            }
            else {
                console.log("更新云存档")
                this._data.alterTime = blade.timer.getTime();
                // 本地覆盖网络
                saveRemote(this._data);
            }
        }

        /**
         * 获取指定键对应的值
         * 如果存档中找不到, 则返回默认值
         * @param key
         */
        public get<T>(key: string, defaultValue: T = null): T {
            if (this._data == null) {
                this._data = this.loadLocal();
            }
            return this._data[key] == null ? defaultValue : this._data[key];
        }

        /**
         * 修改存到指定键名的值
         * @param key
         * @param newValue
         */
        public set<T>(key: string, newValue: T) {
            if (this._data == null) {
                this._data = this.loadLocal();
            }
            const oldValue = this._data[key];
            if (oldValue && typeof oldValue != typeof newValue) {
                throw new Error('存档新值和旧值类型不一致, 忽略存入');
            }
            // 旧值和新值不是同一个
            if (oldValue !== newValue) {
                this._data[key] = newValue;
            }
        }


        public clear() {
            console.warn("存档已经重置");
            this._data = { alterTime: blade.timer.getTime() };
            this.saveLocal(this._data);
        }
    }

}

export default PlatformService;

import PlatformBase from "../Bases/PlatformBase";
import AndroidPlatform from "../Platforms/AndroidPlatform";
import HuaWeiPlatform from "../Platforms/HuaWeiPlatform";
import IOSPlatform from "../Platforms/IOSPlatform";
import OppoPlatform from "../Platforms/OppoPlatform";
import QQPlatform from "../Platforms/QQPlatform";
import TTPlatform from "../Platforms/TTPlatform";
import VivoPlatform from "../Platforms/VivoPlatform";
import WebPlatform from "../Platforms/WebPlatform";
import WxPlatform from "../Platforms/WxPlatform";
import XiaoMiPlatform from "../Platforms/XiaoMiPlatform";
import TimerService from "./TimerService";

