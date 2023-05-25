import PlatformService from "../../Blade/Services/PlatformService";
import AndroidConfig from "./PlatformConfig/Configs/AndroidConfig";
import FbConfig from "./PlatformConfig/Configs/FbConfig";
import HuaWeiConfig from "./PlatformConfig/Configs/HuaWeiConfig";
import IOSConfig from "./PlatformConfig/Configs/IOSConfig";
import OppoConfig from "./PlatformConfig/Configs/OppoConfig";
import QQConfig from "./PlatformConfig/Configs/QQConfig";
import TTConfig from "./PlatformConfig/Configs/TTConfig";
import VivoConfig from "./PlatformConfig/Configs/VivoConfig";
import WxConfig from "./PlatformConfig/Configs/WxConfig";
import XiaoMiConfig from "./PlatformConfig/Configs/XiaoMiConfig";

/*
 * @作者: 0x2CA
 * @创建时间: 2023-02-09
 * @最后编辑时间: 2023-03-15
 * @最后编辑者: 0x2CA
 * @描述: 平台配置
 */
const PlatformConfig = {
    // 微信
    [PlatformService.PlatformType.WX]: new WxConfig.DefaultConfig(),
    //手Q
    [PlatformService.PlatformType.QQ]: new QQConfig.DefaultConfig(),
    // 字节
    [PlatformService.PlatformType.BYTEDANCE]: new TTConfig.DefaultConfig(),
    // oppo
    [PlatformService.PlatformType.OPPO]: new OppoConfig.DefaultConfig(),
    // vivo
    [PlatformService.PlatformType.VIVO]: new VivoConfig.DefaultConfig(),
    // huawei
    [PlatformService.PlatformType.HUAWEI]: new HuaWeiConfig.DefaultConfig(),
    // xiaomi
    [PlatformService.PlatformType.XIAOMI]: new XiaoMiConfig.DefaultConfig(),
    // Facebook
    [PlatformService.PlatformType.FACEBOOK]: new FbConfig.DefaultConfig(),
    // 安卓
    [PlatformService.PlatformType.ANDROID]: new AndroidConfig.DefaultConfig(),
    // 苹果
    [PlatformService.PlatformType.IOS]: new IOSConfig.DefaultConfig(),

    // 当前配置
    get(): PlatformConfigBase {
        return this[blade.platform.getType()];
    }
};

export default PlatformConfig;

import PlatformConfigBase from "./PlatformConfig/Bases/PlatformConfigBase";
