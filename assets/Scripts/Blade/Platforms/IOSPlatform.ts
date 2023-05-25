/*
 * @作者: 0x2CA
 * @创建时间: 2023-02-09
 * @最后编辑时间: 2023-04-25
 * @最后编辑者: 0x2CA
 * @描述:
 */
import PlatformBase from "../Bases/PlatformBase";

/**
 * IOS
 */
export default class IOSPlatform extends PlatformBase {

    private _configs: IOSConfigBase = null;

    protected onInitialize() {
        this._configs = PlatformConfig[PlatformService.PlatformType.IOS];
    }

    /**
     * 调用系统原生方法
     * @param method
     * @param args
     */
    public callNative(method: string, ...args: string[]) {
        (jsb.reflection.callStaticMethod as (className: string, methodName: string, ...parameters: any) => any)('Blade', method, ...args);
    }

    public copyToClipBoard(string: string): Promise<void> {
        this.callNative("copyToClipBoard:", string);
        return Promise.resolve();
    }
}

import PlatformConfig from "../../Module/Defines/PlatformConfig";
import IOSConfigBase from "../../Module/Defines/PlatformConfig/Bases/IOSConfigBase";
import PlatformService from "../Services/PlatformService";

