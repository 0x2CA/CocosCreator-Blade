import SocketHelper from "../../Helpers/SocketHelper";
import PromiseHelper from "../../Helpers/PromiseHelper";
import RandomHelper from "../../Helpers/RandomHelper";
import HttpHelper from "../../Helpers/HttpHelper";
import WxPlatform from "../../Platforms/WxPlatform";
import PlatformService from "../../Services/PlatformService";

/**
 * 微信管理服务器SDK（在线参数、推广广告、信息记录等后台功能）
 *
 * @export
 * @class WxServerSDK
 */
class WxServerSDK {
    private static socketUrl = "wss://xcx.tongchuanggame.com:2020";
    private static httpUrl = "https://xcx.tongchuanggame.com/";
    private static socketUrlDebug = "wss://xcx.test.tongchuanggame.com:2020";
    private static httpUrlDebug = "https://xcx.test.tongchuanggame.com/";
    private static version: string = null
    private static deBug = false;
    private static io: SocketHelper.Socket = null;
    private static appId: string = null;
    private static sysId: number = null;
    private static userId: number = null;
    private static openId: string = null;
    private static tmp = new Map();
    static isInit = false;

    static getSocketUrl() {
        // if (WxServerSDK.deBug || CC_DEBUG) {
        if (WxServerSDK.deBug) {
            return WxServerSDK.socketUrlDebug;
        } else {
            return WxServerSDK.socketUrl;
        }
    }

    static getHttpUrl() {
        // if (WxServerSDK.deBug || CC_DEBUG) {
        if (WxServerSDK.deBug) {
            return WxServerSDK.httpUrlDebug;
        } else {
            return WxServerSDK.httpUrl;
        }
    }

    private static async request<K>(url: string, data: any): Promise<K> {
        return await HttpHelper.Request(WxServerSDK.getHttpUrl() + url, {
            method: "POST",
            data,
            dataType: "JSON",
            contentType: "JSON",
        });
    }


    public static getOpenId() {
        return this.openId;
    }

    public static getUserId() {
        return this.userId;
    }

    public static getSysId() {
        return this.sysId;
    }

    static async init(appId: string, version: string, openId?: string) {
        if (WxServerSDK.isInit) {
            return;
        }
        WxServerSDK.tmp.clear();
        WxServerSDK.setAppId(appId);
        WxServerSDK.setVersion(version);
        await WxServerSDK.connectSocket(appId, openId);
        if (this.deBug) {
            if (blade.platform.getType() == PlatformService.PlatformType.WX) {
                wx.showModal({
                    title: "提示",
                    content: "当前为测试环境！！!",
                    success: async (res) => {
                        if (res.confirm) {
                        } else if (res.cancel) {
                        }
                    },
                });
            } else if (blade.platform.getType() == PlatformService.PlatformType.QQ) {
                qq.showModal({
                    title: "提示",
                    content: "当前为测试环境！！!",
                    success: async (res) => {
                        if (res.confirm) {
                        } else if (res.cancel) {
                        }
                    },
                });
            } else if (blade.platform.getType() == PlatformService.PlatformType.BYTEDANCE) {
                tt.showModal({
                    title: "提示",
                    content: "当前为测试环境！！!",
                    success: async (res) => {
                        if (res.confirm) {
                        } else if (res.cancel) {
                        }
                    },
                });
            }

        }
        return true;
    }

    private static async connectSocket(appId: string, openId?: string) {
        if (!WxServerSDK.io) {
            WxServerSDK.io = SocketHelper.createSocket("WxServerSDK");
        }

        await new Promise(async (resolve, reject) => {
            WxServerSDK.io.connect(WxServerSDK.getSocketUrl());

            WxServerSDK.io.on(SocketHelper.EventType.CONNECT, async () => {
                let result;
                try {
                    if (openId) {
                        result = await WxServerSDK.login(appId, openId);
                    } else {
                        result = await WxServerSDK.login(appId, WxServerSDK.openId);
                    }
                } catch (error) {
                    WxServerSDK.io.disConnect();
                    reject(error);
                }

                if (result.code == 0) {
                    WxServerSDK.isInit = true;
                    WxServerSDK.openId = result.data.open_id;
                    WxServerSDK.sysId = result.data.sys_app_id;
                    WxServerSDK.userId = result.data.user_id;
                }
                cc.log("Socket 登录", result);
            });
            WxServerSDK.io.on(SocketHelper.EventType.DISCONNECT, async () => {
                WxServerSDK.isInit = false;
            });

            await PromiseHelper.waitUntil(() => {
                return WxServerSDK.io.getStatus() != SocketHelper.LinkStatus.EMPTY;
            });
            if (WxServerSDK.io.getStatus() == SocketHelper.LinkStatus.SUCCEED) {
                await PromiseHelper.waitUntil(() => {
                    return WxServerSDK.isInit == true;
                });
                resolve();
            } else {
                reject();
            }
        });
    }

    private static setAppId(appId: string) {
        if (WxServerSDK.appId == null) {
            WxServerSDK.appId = appId;
        }
    }

    private static setVersion(version: string) {
        if (WxServerSDK.version == null) {
            WxServerSDK.version = version;
        }
    }



    /**
     * Socket登录
     *
     * @static
     * @param {string} appId
     * @returns
     * @memberof WxServerSDK
     */
    private static async login(appId: string, openId?: string) {
        if (WxServerSDK.io && WxServerSDK.io.getStatus() == SocketHelper.LinkStatus.SUCCEED) {
            let result: WxServerSDK.Login_RESULT_Info = await WxServerSDK.emitSync(
                WxServerSDK.EventType.LOGIN,
                await WxServerSDK.getLoginInfo(appId, openId)
            );
            return result;
        } else {
            cc.warn("请先初始化Socket");
        }
    }

    /**
     * 保存用户数据
     *
     * @static
     * @memberof WxServerSDK
     */
    static async saveUserInfo(info: WxServerSDK.USER_INFO) {
        if (!this.isInit) {
            cc.warn("请先初始化socket");
            await PromiseHelper.waitUntil(() => {
                return this.isInit;
            });
        }

        let data: WxServerSDK.USER_EMIT_INFO = {
            user_id: WxServerSDK.userId,
            authorize_type: 1,
            user_data: info
        }

        let result = await WxServerSDK.emitSync("saveUserInfo", data);
        return result;
    }

    /**
     * 记录广告位置情况
     *
     * @static
     * @memberof WxServerSDK
     */
    static async recordAdvert(
        type: WxServerSDK.RecordType,
        ...info: WxServerSDK.RECORD_ADVERT_INFO
    ) {
        if (!this.isInit) {
            cc.warn("请先初始化socket");
            await PromiseHelper.waitUntil(() => {
                return this.isInit;
            });
        }
        let data;
        let event;
        if (type == WxServerSDK.RecordType.EXPOSUREPLACE) {
            data = {
                user_id: WxServerSDK.userId,
                sys_app_id: WxServerSDK.sysId,
                advert_place_arr: Array.from(
                    new Set(
                        info.map((value) => {
                            return value.place_id;
                        })
                    )
                ),
            };
            event = "exposureAdvertPlace";
        } else if (type == WxServerSDK.RecordType.EXPOSURECONENT) {
            data = {
                user_id: WxServerSDK.userId,
                sys_app_id: WxServerSDK.sysId,
                advert_deploy_arr: info,
            };
            event = "exposureAdvertDeploy";
        } else if (type == WxServerSDK.RecordType.CLICK) {
            data = {
                user_id: WxServerSDK.userId,
                sys_app_id: WxServerSDK.sysId,
                place_id: info[0].place_id,
                deploy_id: info[0].deploy_id,
            };
            event = "clickAdvertDeploy";
        }
        let result = await WxServerSDK.emitSync<WxServerSDK.RESULT_INFO>(event, data);
        // cc.log(WxServerSDK.RecordType[type], data, result);
        return result;
    }

    /**
     * 记录分享文案情况
     * @param type
     * @param info
     */
    static async recordShare(
        type: WxServerSDK.RecordType,
        time: number,
        ...info: WxServerSDK.RECORD_SHARE_INFO
    ) {
        if (!this.isInit) {
            cc.warn("请先初始化socket");
            await PromiseHelper.waitUntil(() => {
                return this.isInit;
            });
        }

        let data;
        let event;
        if (type == WxServerSDK.RecordType.EXPOSUREPLACE) {
            data = {
                user_id: WxServerSDK.userId,
                sys_app_id: WxServerSDK.sysId,
                share_place_arr: info.map((value) => {
                    return value.place_id;
                }),
            };
            event = "exposureSharePlace";
        } else if (type == WxServerSDK.RecordType.EXPOSURECONENT) {
            data = {
                user_id: WxServerSDK.userId,
                sys_app_id: WxServerSDK.sysId,
                share_clerk_arr: info,
            };
            event = "exposureShareClerk";
        } else if (type == WxServerSDK.RecordType.CLICK) {
            data = {
                user_id: WxServerSDK.userId,
                sys_app_id: WxServerSDK.sysId,
                place_id: info[0].place_id,
                clerk_id: info[0].clerk_id,
                time,
            };
            //XXX: 更改接口
            event = "clickSharePlace";
        }
        let result = await WxServerSDK.emitSync<WxServerSDK.RESULT_INFO>(event, data);
        // cc.log(WxServerSDK.RecordType[type], data, result);
        return result;
    }

    /**
     * 分享進入記錄
     *
     * @static
     * @param {string} share_open_id
     * @param {number} time
     * @param {...WxServerSDK.RECORD_SHARE_INFO} info
     * @returns
     * @memberof WxServerSDK
     */
    static async recordShareEntry(
        share_open_id: string,
        time: number,
        ...info: WxServerSDK.RECORD_SHARE_INFO
    ) {
        if (!this.isInit) {
            cc.warn("请先初始化socket");
            await PromiseHelper.waitUntil(() => {
                return this.isInit;
            });
        }

        let data;
        let event;
        data = {
            share_open_id,
            sys_app_id: WxServerSDK.sysId,
            place_id: info[0].place_id,
            clerk_id: info[0].clerk_id,
            time,
        };
        event = "entryProgramByShareClerk";
        let result = await WxServerSDK.emitSync<WxServerSDK.RESULT_INFO>(event, data);
        return result;
    }

    /**
     * 记录看视频
     *
     * @static
     * @param {WxServerSDK.RECORD_VIDEO_TYPE} recordType
     * @param {WxServerSDK.VIDEO_INFO} info
     * @param {WxServerSDK.VIDEO_TYPE} [type]
     * @param {number} [time]
     * @returns
     * @memberof WxServerSDK
     */
    static async recordVideo(
        recordType: WxServerSDK.RECORD_VIDEO_TYPE,
        info: WxServerSDK.VIDEO_INFO,
        type?: WxServerSDK.VIDEO_TYPE,
        subtime?: number
    ) {
        if (!this.isInit) {
            cc.warn("请先初始化socket");
            await PromiseHelper.waitUntil(() => {
                return this.isInit;
            });
        }
        let data;
        let event;
        if (recordType == WxServerSDK.RECORD_VIDEO_TYPE.Exposure) {
            data = {
                user_id: WxServerSDK.userId,
                sys_app_id: WxServerSDK.sysId,
                video_id: info.id,
                place_key: info.place_key,
            };
            event = "exposureVideo";
        } else if (recordType == WxServerSDK.RECORD_VIDEO_TYPE.Watch) {
            data = {
                user_id: WxServerSDK.userId,
                sys_app_id: WxServerSDK.sysId,
                video_id: info.id,
                place_key: info.place_key,
                flag: type,
                time: subtime,
            };
            event = "watchVideo";
        } else if (recordType == WxServerSDK.RECORD_VIDEO_TYPE.Click) {
            data = {
                user_id: WxServerSDK.userId,
                sys_app_id: WxServerSDK.sysId,
                video_id: info.id,
                place_key: info.place_key,
            };
            event = "clickVideo";
        }
        let result = await WxServerSDK.emitSync<WxServerSDK.RESULT_INFO>(event, data);
        return result;
    }

    /**
     * 记录banner
     *
     * @static
     * @param {WxServerSDK.RECORD_BANNER_TYPE} recordType
     * @param {WxServerSDK.BANNER_INFO} info
     * @returns
     * @memberof WxServerSDK
     */
    static async recordBanner(
        recordType: WxServerSDK.RECORD_BANNER_TYPE,
        info: WxServerSDK.BANNER_INFO
    ) {
        if (!this.isInit) {
            cc.warn("请先初始化socket");
            await PromiseHelper.waitUntil(() => {
                return this.isInit;
            });
        }
        if (!info) {
            return;
        }
        let data;
        let event;
        if (recordType == WxServerSDK.RECORD_BANNER_TYPE.Exposure) {
            data = {
                user_id: WxServerSDK.userId,
                sys_app_id: WxServerSDK.sysId,
                banner_id: info.id,
                place_key: info.place_key,
            };
            event = "exposureBanner";
        }
        let result = await WxServerSDK.emitSync<WxServerSDK.RESULT_INFO>(event, data);
        return result;
    }

    static async recordInterstitial(
        recordType: WxServerSDK.RECORD_INTERSTITIAL_TYPE,
        info: WxServerSDK.INTERSTITIAL_INFO
    ) {
        if (!this.isInit) {
            cc.warn("请先初始化socket");
            await PromiseHelper.waitUntil(() => {
                return this.isInit;
            });
        }
        if (!info) {
            return;
        }
        let data;
        let event;
        if (recordType == WxServerSDK.RECORD_INTERSTITIAL_TYPE.Exposure) {
            data = {
                user_id: WxServerSDK.userId,
                sys_app_id: WxServerSDK.sysId,
                screen_id: info.id,
                place_key: info.place_key,
            };
            event = "exposureScreen";
        }
        let result = await WxServerSDK.emitSync<WxServerSDK.RESULT_INFO>(event, data);
        return result;
    }

    /**
     * 获取登录必要信息
     *
     * @private
     * @static
     * @param {string} appId
     * @returns
     * @memberof WxServerSDK
     */
    private static async getLoginInfo(appId: string, openId?: string) {
        let info: WxServerSDK.Login_QUERY_Info;

        if (blade.platform.getType() == PlatformService.PlatformType.QQ ||
            blade.platform.getType() == PlatformService.PlatformType.WX ||
            blade.platform.getType() == PlatformService.PlatformType.BYTEDANCE) {
            let systemInfo = wx.getSystemInfoSync();
            let openInfo = (<WxPlatform>blade.platform.getPlatform()).getLaunchOptions();
            let code = "";

            if (!openId) {
                openId = "";
                code = await WxServerSDK.getCode();
            }

            let brand = systemInfo.brand;
            let model = systemInfo.model;
            let version = systemInfo.version;
            let system = systemInfo.system;
            let platform = systemInfo.platform;

            let scene = openInfo.scene;
            let srcAppId = "";
            let channel = "";
            let share_open_id = "";
            let login_type;

            if (blade.platform.getType() == PlatformService.PlatformType.QQ) {
                login_type = WxServerSDK.LoginType.QQ;
            } else if (blade.platform.getType() == PlatformService.PlatformType.WX) {
                login_type = WxServerSDK.LoginType.WX;
            } else if (blade.platform.getType() == PlatformService.PlatformType.BYTEDANCE) {
                login_type = WxServerSDK.LoginType.BYTEDANCE;
            }

            if (openInfo.referrerInfo) {
                //来源（自带）
                if (openInfo.referrerInfo["appId"]) {
                    srcAppId = openInfo.referrerInfo["appId"];
                }
            }

            //渠道
            let params = blade.platform.getPlatform().getLaunchOptions();
            if (params["channel"]) {
                channel = params["channel"];
            }
            //分享者
            if (params["share_open_id"]) {
                share_open_id = params["share_open_id"];
            }

            let place_id: string | number = "";
            let clerk_id: string | number = "";
            let share_time: string | number = "";

            if (
                params["shareInfo"] &&
                params["shareTime"] &&
                WxServerSDK.userId != params["shareUserId"]
            ) {
                let info = JSON.parse(params["shareInfo"]);
                share_time = parseInt(params["shareTime"]);
                place_id = parseInt(info.place_id);
                clerk_id = parseInt(info.clerk_id);
            }

            info = {
                code,
                app_id: appId,
                open_id: openId,
                channel,
                srcAppId,
                brand,
                model,
                version,
                system,
                platform,
                scene,
                share_open_id,
                share_time,
                place_id,
                clerk_id,
                login_type,
            };
        } else {
            info = {
                code: "qaz123",
                app_id: appId,
                open_id: "",
                channel: "",
                srcAppId: "",
                brand: "devtools",
                model: "iPhone 5",
                version: "6.6.5",
                system: "IOS 10.0.1",
                platform: "devtools",
                scene: 1001,
                share_open_id: "",
                share_time: "",
                place_id: "",
                clerk_id: "",
                login_type: WxServerSDK.LoginType.WX,
            };
            cc.warn("请在微信或者QQ或者字节跳动环境下使用SDK");
        }
        return info;
    }

    /**
     * 获取登录令牌
     */
    private static getCode(): Promise<string> {
        return new Promise((resolve, reject) => {
            if (blade.platform.getType() == PlatformService.PlatformType.WX) {
                wx.login({
                    success: async (res) => {
                        return resolve(res.code);
                    },
                    fail(err) {
                        return reject(err);
                    },
                });
            } else if (blade.platform.getType() == PlatformService.PlatformType.QQ) {
                qq.login({
                    success: async (res) => {
                        return resolve(res.code);
                    },
                    fail(err) {
                        return reject(err);
                    },
                });
            } else if (blade.platform.getType() == PlatformService.PlatformType.BYTEDANCE) {
                tt.login({
                    success: async (res) => {
                        return resolve(res.code);
                    },
                    fail(err) {
                        return reject(err);
                    },
                });
            }

        });
    }

    /**
     * 获取游戏在线参数信息
     *
     * @static
     * @returns
     * @memberof WxServerSDK
     */
    private static async getParameterInfo() {
        if (!WxServerSDK.appId) {
            cc.warn("Http 请求未初始化");
            await PromiseHelper.waitUntil(() => {
                return WxServerSDK.appId;
            });
        }

        let result: WxServerSDK.PARAMETER_INFO;
        result = await WxServerSDK.request("wechat/getparameterinfo", {
            app_id: WxServerSDK.appId,
            version: WxServerSDK.version

        });

        return result;
    }

    /**
     * 获取指定名称参数配置
     *
     * @static
     * @param {string} key
     * @memberof WxServerSDK
     */
    static async getParameter(key: string) {
        let params = await WxServerSDK.getAllParameter();
        if (params && params[key]) {
            return params[key];
        }
    }

    /**
     * 获取所有参数
     *
     * @static
     * @returns
     * @memberof WxServerSDK
     */
    static async getAllParameter() {
        let Info = await WxServerSDK.getParameterInfo();
        if (Info && Info.code == 0) {
            return Info.data;
        }
    }

    /**
     * 获取广告配置信息
     *
     * @static
     * @returns
     * @memberof WxServerSDK
     */
    private static async getAdvertDeployInfo(): Promise<WxServerSDK.ADVERT_DEPLOY_INFO> {
        if (!WxServerSDK.appId) {
            cc.warn("Http 请求未初始化");
            await PromiseHelper.waitUntil(() => {
                return WxServerSDK.appId;
            });
        }

        if (WxServerSDK.tmp.has(WxServerSDK.getAdvertDeployInfo)) {
            return WxServerSDK.tmp.get(WxServerSDK.getAdvertDeployInfo);
        }
        let result: WxServerSDK.ADVERT_DEPLOY_INFO;
        result = await WxServerSDK.request("wechat/getadvertdeployinfo", {
            app_id: WxServerSDK.appId,
            version: WxServerSDK.version

        });

        if (result.code == 0 && result.data) {
            WxServerSDK.tmp.set(WxServerSDK.getAdvertDeployInfo, result);
        }
        return result;
    }

    /**
     *
     * 获取指定名称的广告配置
     * @static
     * @param {string} key
     * @returns {Promise<WxServerSDK.ADVERT_INFO>}
     * @memberof WxServerSDK
     */
    static async getAdvertInfo(key: string): Promise<WxServerSDK.ADVERT_INFO> {
        let list = await WxServerSDK.getAllAdvertInfo(key);
        if (list && list.length > 0) {
            if (list[0].strategy == WxServerSDK.ADVERT_STRATEGY.RANDOM) {
                return list[Math.floor(Math.random() * list.length)];
            } else if (list[0].strategy == WxServerSDK.ADVERT_STRATEGY.WEIGHT_RANDOM) {
                let weight = list.map((value) => {
                    return value.weight;
                });
                let index = RandomHelper.getWeightIndex(weight);
                return list[index];
            } else if (list[0].strategy == WxServerSDK.ADVERT_STRATEGY.SORT) {
                let sortList = list.sort((a, b) => {
                    return a.weight - b.weight;
                });

                let advert_sort_info: {
                    time: number;
                    index;
                } = JSON.parse(blade.platform.getPlatform().getArchive("advert_sort_" + key + "_info"));

                if (
                    advert_sort_info == null ||
                    blade.timer.getTime() >
                    moment(advert_sort_info.time)
                        .add(1, "days")
                        .unix()
                ) {
                    advert_sort_info = {
                        index: -1,
                        time: blade.timer.getTime(),
                    };
                }

                advert_sort_info.index++;
                advert_sort_info.index = advert_sort_info.index % sortList.length;

                blade.platform.getPlatform().saveArchive(
                    "advert_sort_" + key + "_info",
                    JSON.stringify(advert_sort_info)
                );
                return sortList[advert_sort_info.index];
            }
        }
    }

    /**
     *获取指定名称的全部广告配置
     *
     * @static
     * @param {string} key
     * @returns {Promise<Array<WxServerSDK.ADVERT_INFO>>}
     * @memberof WxServerSDK
     */
    static async getAllAdvertInfo(key: string): Promise<Array<WxServerSDK.ADVERT_INFO>> {
        let Info = await WxServerSDK.getAdvertDeployInfo();
        if (Info.code == 0 && Info.data[key]) {
            let list = Info.data[key];
            if (list && list.length > 0) {
                if (list[0].strategy == WxServerSDK.ADVERT_STRATEGY.RANDOM) {
                    return list.sort((a, b) => {
                        return Math.random() > 0.5 ? -1 : 1;
                    });
                } else if (
                    list[0].strategy == WxServerSDK.ADVERT_STRATEGY.WEIGHT_RANDOM ||
                    list[0].strategy == WxServerSDK.ADVERT_STRATEGY.SORT
                ) {
                    return list.sort((a, b) => {
                        return a.weight - b.weight;
                    });
                }
            } else {
                return list;
            }
        }
    }

    /**
     * 获取分享文案信息
     *
     * @static
     * @returns
     * @memberof WxServerSDK
     */
    private static async getShareClerkInfo(): Promise<WxServerSDK.SHARE_CLERK_INFO> {
        if (!WxServerSDK.appId) {
            cc.warn("Http 请求未初始化");
            await PromiseHelper.waitUntil(() => {
                return WxServerSDK.appId;
            });
        }
        if (WxServerSDK.tmp.has(WxServerSDK.getShareClerkInfo)) {
            return WxServerSDK.tmp.get(WxServerSDK.getShareClerkInfo);
        }
        let result: WxServerSDK.SHARE_CLERK_INFO;
        result = await WxServerSDK.request("wechat/getshareclerkinfo", {
            app_id: WxServerSDK.appId,
            version: WxServerSDK.version

        });

        if (result.code == 0 && result.data) {
            WxServerSDK.tmp.set(WxServerSDK.getShareClerkInfo, result);
        }
        return result;
    }

    /**
     * 获取指定名称的文案
     *
     * @static
     * @param {string} key
     * @returns {Promise<WxServerSDK.SHARE_INFO>}
     * @memberof WxServerSDK
     */
    static async getShareInfo(key: string): Promise<WxServerSDK.SHARE_INFO> {
        let list = await WxServerSDK.getAllShareInfo(key);
        if (list) {
            let weight = list.map((value) => {
                return value.weight;
            });
            let index = RandomHelper.getWeightIndex(weight);
            return list[index];
        }
    }

    /**
     * 获取指定名称的全部文案
     *
     * @static
     * @param {string} key
     * @returns {Promise<Array<WxServerSDK.SHARE_INFO>>}
     * @memberof WxServerSDK
     */
    static async getAllShareInfo(key: string): Promise<Array<WxServerSDK.SHARE_INFO>> {
        let Info = await WxServerSDK.getShareClerkInfo();
        if (Info.code == 0 && Info.data[key]) {
            let list = Info.data[key];
            return list;
        }
    }

    /**
     * 获取所有的视频配置消息
     *
     * @static
     * @returns {Promise<WxServerSDK.VIDEO_ON_INFO>}
     * @memberof WxServerSDK
     */
    static async getAllVideoInfo(): Promise<WxServerSDK.VIDEO_ON_INFO> {
        if (!WxServerSDK.appId) {
            cc.warn("Http 请求未初始化");
            await PromiseHelper.waitUntil(() => {
                return WxServerSDK.appId;
            });
        }
        if (WxServerSDK.tmp.has(WxServerSDK.getAllVideoInfo)) {
            return WxServerSDK.tmp.get(WxServerSDK.getAllVideoInfo);
        }
        let result: WxServerSDK.VIDEO_ON_INFO;
        result = await WxServerSDK.request("wechat/getvideoinfo", {
            app_id: WxServerSDK.appId,
            version: WxServerSDK.version

        });

        if (result.code == 0 && result.data) {
            WxServerSDK.tmp.set(WxServerSDK.getAllVideoInfo, result);
        }
        return result;
    }
    /**
     * 获取指定位置视频配置
     *
     * @static
     * @param {string} key
     * @returns
     * @memberof WxServerSDK
     */
    static async getVideoInfo(key: string) {
        let result = await WxServerSDK.getAllVideoInfo();
        if (result && result.code == 0 && result.data[key]) {
            return result.data[key];
        }
    }

    /**
     * 获取所有的banner配置消息
     *
     * @static
     * @returns {Promise<WxServerSDK.BANNER_ON_INFO>}
     * @memberof WxServerSDK
     */
    static async getAllBannerInfo(): Promise<WxServerSDK.BANNER_ON_INFO> {
        if (!WxServerSDK.appId) {
            cc.warn("Http 请求未初始化");
            await PromiseHelper.waitUntil(() => {
                return WxServerSDK.appId;
            });
        }
        if (WxServerSDK.tmp.has(WxServerSDK.getAllBannerInfo)) {
            return WxServerSDK.tmp.get(WxServerSDK.getAllBannerInfo);
        }
        let result: WxServerSDK.BANNER_ON_INFO;
        result = await WxServerSDK.request("wechat/getbannerinfo", {
            app_id: WxServerSDK.appId,
            version: WxServerSDK.version

        });

        if (result.code == 0 && result.data) {
            WxServerSDK.tmp.set(WxServerSDK.getAllBannerInfo, result);
        }
        return result;
    }

    /**
     * 获取指定banner配置
     *
     * @static
     * @param {string} key
     * @returns
     * @memberof WxServerSDK
     */
    static async getBannerInfo(key: string) {
        let result = await WxServerSDK.getAllBannerInfo();
        if (result && result.code == 0 && result.data[key]) {
            return result.data[key];
        }
    }

    /**
     * 获取所有的插屏配置消息
     *
     * @static
     * @returns {Promise<WxServerSDK.INTERSTITIAL_ON_INFO>}
     * @memberof WxServerSDK
     */
    static async getAllInterstitialInfo(): Promise<WxServerSDK.INTERSTITIAL_ON_INFO> {
        if (!WxServerSDK.appId) {
            cc.warn("Http 请求未初始化");
            await PromiseHelper.waitUntil(() => {
                return WxServerSDK.appId;
            });
        }
        if (WxServerSDK.tmp.has(WxServerSDK.getAllInterstitialInfo)) {
            return WxServerSDK.tmp.get(WxServerSDK.getAllInterstitialInfo);
        }
        let result: WxServerSDK.INTERSTITIAL_ON_INFO;
        result = await WxServerSDK.request("wechat/getscreeninfo", {
            app_id: WxServerSDK.appId,
            version: WxServerSDK.version
        });

        if (result.code == 0 && result.data) {
            WxServerSDK.tmp.set(WxServerSDK.getAllInterstitialInfo, result);
        }
        return result;
    }

    /**
     * 获取指定位置插屏配置
     *
     * @static
     * @param {string} key
     * @returns
     * @memberof WxServerSDK
     */
    static async getInterstitialInfo(key: string) {
        let result = await WxServerSDK.getAllInterstitialInfo();
        if (result && result.code == 0 && result.data[key]) {
            return result.data[key];
        }
    }


    static async getRank<T>(key: string, mix: number, max: number) {
        let result: WxServerSDK.RESULT_RANK_INFO<T> = await WxServerSDK.emitSync("getRankingList", {
            user_id: WxServerSDK.userId,
            sys_app_id: WxServerSDK.sysId,
            rank_key: key,
            num_start: mix,
            num_end: max,
        })
        return result;
    }

    static async setRank(key: string, score: number, extData: any) {
        let result = await WxServerSDK.emitSync("setRankingList", {
            user_id: WxServerSDK.userId,
            sys_app_id: WxServerSDK.sysId,
            rank_key: key,
            score: score,
            infos: extData
        })
        return result;
    }

    private static async emitSync<T>(targetEvent: string, data: any): Promise<T> {
        if (WxServerSDK.deBug || CC_DEBUG) {
            cc.warn(targetEvent, data);
        }
        try {
            return await WxServerSDK.io.emitSync<T>(targetEvent, targetEvent, data);
        } catch (error) {
            await PromiseHelper.wait(3);
            return await this.emitSync(targetEvent, data);
        }
    }
}

namespace WxServerSDK {
    export class EventType {
        static readonly LOGIN = "login";
    }

    export interface Login_QUERY_Info {
        /**
         * 登录令牌
         */
        readonly code: string;
        /**
         * 小程序app_id
         */
        readonly app_id: string;
        /**
         * 用户id
         *
         * @type {string}
         * @memberof Login_QUERY_Info
         */
        readonly open_id: string;
        /**
         * 渠道类型
         */
        readonly channel: string;
        /**
         * 从别的小程序跳入的app_id
         */
        readonly srcAppId: string;
        /**
         * 设备品牌
         */
        readonly brand: string;
        /**
         * 设备型号
         */
        readonly model: string;
        /**
         * 微信版本号
         */
        readonly version: string;
        /**
         * 操作系统及版本
         */
        readonly system: string;
        /**
         * 客户端平台
         */
        readonly platform: string;
        /**
         * 场景值
         */
        readonly scene: number;
        /*
         * 分享人的open_id
         */
        readonly share_open_id: string;

        /**
         * 分享時間
         */
        readonly share_time: number | string;
        /**
         * 分享位置id
         */
        readonly place_id: number | string;
        /**
         * 分享文案id
         */
        readonly clerk_id: number | string;
        /**
         * 登录类型
         *
         * @type {LoginType}
         * @memberof Login_QUERY_Info
         */
        login_type: LoginType;
    }

    export enum LoginType {
        WX = 1,
        QQ = 2,
        BYTEDANCE = 3
    }

    export interface Login_RESULT_Info {
        readonly code: number;
        readonly msg: string;
        readonly data: {
            /**
             * 用户在系统中的主键Id
             */
            readonly user_id: number;
            /**
             * 用户open_id
             */
            readonly open_id: string;

            /**
             * 系统APP id
             */
            readonly sys_app_id: number;
            /**
             * 标记是否为新用户
             */
            readonly flag: boolean;
        };
    }

    export interface PARAMETER_INFO {
        readonly code: number;
        readonly msg: string;
        readonly data: { [key: string]: WxServerSDK.PARAMETER };
    }

    export interface PARAMETER {
        /**
         * 参数的主键
         */
        readonly id: number;
        /**
         * 后台系统小游戏的id
         */
        readonly sys_app_id: number;
        /**
         * 参数名称
         */
        readonly name: string;
        /**
         * 参数key
         */
        readonly parameter_key: string;
        /**
         * 参数值-自定义的
         */
        readonly parameter_value: number;
        /**
         * 版本控制
         */
        readonly version_restriction: string;
    }

    export interface ADVERT_DEPLOY_INFO {
        readonly code: number;
        readonly msg: string;
        readonly data: {
            /**
             * 位置的键值
             */
            readonly [key: string]: Array<WxServerSDK.ADVERT_INFO>;
        };
    }

    export interface ADVERT_INFO {
        /**
         * 广告位置主键id
         */
        readonly place_id: number;
        /**
         * 广告配置主键id
         */
        readonly deploy_id: number;
        /**
         * 后台系统小游戏的id
         */
        readonly sys_app_id: number;
        /**
         * 广告的位置名称
         */
        readonly place_name: string;
        /**
         * 广告位置的键值
         */
        readonly place_key: string;
        /**
         * 广告的轮播方法 1-权重随机轮播 2-权重智能轮播 3-权重平均轮播
         */
        readonly strategy: WxServerSDK.ADVERT_STRATEGY;
        /**
         * 当前广告在该广告的权重
         */
        readonly weight: number;
        /**
         * 广告的名称
         */
        readonly name: string;
        /**
         * 广告的描述
         */
        readonly describe: string;
        /**
         * 广告icon地址
         */
        readonly icon_url: string;
        /**
         * 广告二维码地址
         */
        readonly code_url: string;
        /**
         * 广告appid
         */
        readonly app_id: string;
        /**
         * 广告的参数
         */
        readonly url_parameter: string;
    }

    export enum ADVERT_STRATEGY {
        /**
         * 权重随机轮播
         */
        WEIGHT_RANDOM = 1,
        /**
         * 权重智能轮播
         */
        SORT = 2,
        /**
         * 权重平均轮播
         */
        RANDOM = 3,
    }

    export interface SHARE_CLERK_INFO {
        readonly code: number;
        readonly msg: string;
        readonly data: {
            /**
             *  文案地址键名
             */
            readonly [key: string]: Array<WxServerSDK.SHARE_INFO>;
        };
    }

    export interface SHARE_INFO {
        /**
         * 文案地址的主键id
         */
        readonly place_id: number;
        /**
         * 文案的主键id
         */
        readonly clerk_id: number;
        /**
         * 后台系统小游戏的id
         */
        readonly sys_app_id: number;
        /**
         * 文案地址的名称
         */
        readonly place_name: string;
        /**
         * 文案地址的键名
         */
        readonly place_key: string;
        /**
         * 文案名称
         */
        readonly title: string;
        /**
         * 文案的图案URL
         */
        readonly design_url: string;
        /**
         * 文案的权重
         */
        readonly weight: number;
    }

    export interface USER_EMIT_INFO {
        /**
         * 当前登陆人的系统主键ID
         */
        user_id: number;
        /**
         * 授权类型 1-已授权 2-未授权 3-未知
         */
        authorize_type: number;
        /**
         * 用户数据
         */
        user_data: WxServerSDK.USER_INFO;
    }

    export interface USER_INFO {
        /**
         * 昵称
         */
        nickName: string;
        /**
         * 性别
         */
        gender: string;
        /**
         * 头像地址
         */
        avatarUrl: string;
        /**
         * 语言
         */
        language: string;
        /**
         * 国家
         */
        country: string;
        /**
         * 省份
         */
        province: string;
        /**
         * 城市
         */
        city: string;
    }

    export interface RESULT_INFO {
        /**
         * 标志 0-成功 1-参数缺少 2-参数错误
         */
        code: number;
        msg: string;
        data: Object;
    }

    export enum RecordType {
        /**
         * 曝光内容
         */
        EXPOSURECONENT,
        /**
         * 曝光位置
         */
        EXPOSUREPLACE,
        /**
         * 点击
         */
        CLICK,
    }

    export type RECORD_SHARE_INFO = Array<{
        /**
         * 分享位置ID
         */
        place_id: Number;
        /**
         * 分享文案ID
         */
        clerk_id: Number;
    }>;
    export type RECORD_ADVERT_INFO = Array<{
        /**
         *位置ID
         */
        place_id: Number;
        /**
         * 配置ID
         */
        deploy_id: Number;
    }>;

    export interface VIDEO_ON_INFO {
        readonly code: number;
        readonly msg: string;
        readonly data: {
            /**
             *  视频展示的位置键名
             */
            readonly [key: string]: WxServerSDK.VIDEO_INFO;
        };
    }

    export interface VIDEO_INFO {
        /**
         * 视频的主键id
         */
        id: number;
        /**
         * 后台系统小游戏的id
         */
        sys_app_id: number;
        /**
         * 视频名称
         */
        name: string;
        /**
         * 微信提供视频id
         */
        ad_unit_id: string;
        /**
         * 视频展示的位置键名
         */
        place_key: string;
    }

    export enum VIDEO_TYPE {
        Succeed = 1,
        Fail = 2,
        Cancel = 3,
    }

    export enum RECORD_VIDEO_TYPE {
        Exposure,
        Watch,
        Click,
    }

    export enum RECORD_BANNER_TYPE {
        Exposure,
    }

    export enum RECORD_INTERSTITIAL_TYPE {
        Exposure,
    }

    export interface BANNER_ON_INFO {
        readonly code: number;
        readonly msg: string;
        readonly data: {
            /**
             *  视频展示的位置键名
             */
            readonly [key: string]: WxServerSDK.BANNER_INFO;
        };
    }

    export interface BANNER_INFO {
        /**
         * banner的主键id
         */
        id: number;
        /**
         * 后台系统小游戏的id
         */
        sys_app_id: number;
        /**
         *  banner名称
         */
        name: string;
        /**
         * 微信提供banner的id
         */
        ad_unit_id: string;
        /**
         * banner展示的位置键名
         */
        place_key: string;
    }

    export interface INTERSTITIAL_ON_INFO {
        readonly code: number;
        readonly msg: string;
        readonly data: {
            /**
             *  插屏展示的位置键名
             */
            readonly [key: string]: WxServerSDK.INTERSTITIAL_INFO;
        };
    }

    export interface INTERSTITIAL_INFO {
        /**
         * 插屏的主键id
         */
        id: number;
        /**
         * 后台系统小游戏的id
         */
        sys_app_id: number;
        /**
         * 插屏名称
         */
        name: string;
        /**
         * 微信提供插屏的id
         */
        ad_unit_id: string;
        /**
         * 插屏展示的位置键名
         */
        place_key: string;
    }

    export interface RESULT_RANK_INFO<T> {
        readonly code: number;
        readonly msg: string;
        readonly data: {
            /**
             *  排行榜列表
             */
            readonly list: Array<WxServerSDK.RANK_INFO<T>>;

            /**
             * 我的位置
             */
            readonly me: WxServerSDK.RANK_INFO<T>;
        };
    }

    export interface RANK_INFO<T> {
        /**
         * 分数
         */
        score: number;

        /**
         * 排名
         */
        rank: number;
        /**
         * 扩展数据
         */
        info: T;
    }

}

export default WxServerSDK;

