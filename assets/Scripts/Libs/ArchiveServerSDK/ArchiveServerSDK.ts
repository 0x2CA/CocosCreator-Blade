import HttpHelper from "../../Helpers/HttpHelper";
import PlatformService from "../../Services/PlatformService";

/**
 * 数据服务器
 */
export default class ArchiveServerSDK {
    // 游戏名
    private static readonly GameName = "leekExternal"

    // 存档服务器URL
    private static readonly ArchiveDebugUrl = `https://192.168.0.113:81`
    private static readonly ArchiveUrl = "https://gamearchive.tongchuangyouxi.com"

    private static readonly AnonyAccount = true;
    // 匿名标识, 测试使用
    private static readonly AnonyAuthToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnYW1lIjoibGVlayIsIm9wZW5pZCI6ImFub255IiwidWlkIjoid2I6YW5vbnkiLCJjaGFubmVsIjoid2VjaGF0IiwiaWF0IjoxNTcyMzM4MzEwfQ.6StfHgwm65NYjm2lf3cuR5kb1iUGZVpBCaH68I8DrNc"
    private static readonly AnonyOpenid = "anony"


    // 用户当前登录标识, 每次进入游戏请求服务器获取, 后续每次请求都将带到头部
    private static authToken: string = null;
    // openid
    private static openid: string = null;


    /**
     * 调用远程Web接口
     * @param path
     * @param data
     * @param method
     * @param errTip 错误提示方式
     */
    private static remoteCall(
        path: string,
        data: any = {},
        method: HttpHelper.RequestMethod = "POST",
        errTip: "none" | "pop" | "toast" = "none"
    ): Promise<any> {
        let url;

        // 拼接地址
        if (CC_DEBUG) {
            url = `${ArchiveServerSDK.ArchiveDebugUrl}${path}`;
        } else {
            url = `${ArchiveServerSDK.ArchiveUrl}${path}`;
        }

        return new Promise((resolve, reject) => {
            HttpHelper.Request(url, {
                method,
                data: data || {},
                headers: {
                    Authorization: `Bearer ${this.authToken}`,
                },
                contentType: "JSON",
                dataType: "JSON",
            })
                .then((data) => {
                    if (data.code == 0) {
                        return resolve(data.data);
                    } else {
                        return reject(data.msg);
                    }
                })
                .catch((reason) => {
                    console.error(`request "${url}" error cause: ${reason ? reason : "no reason"}`);
                    reject(reason);
                });
        });
    }


    /**
    * 登陆操作
    */
    public static async login() {
        if (CC_DEBUG && ArchiveServerSDK.AnonyAccount) {
            cc.warn("调试模式: 正在匿名登陆");
            ArchiveServerSDK.authToken = ArchiveServerSDK.AnonyAuthToken;
            ArchiveServerSDK.openid = ArchiveServerSDK.AnonyOpenid;
        }
        try {
            let data;

            // 服务器登录
            switch (app.platform.getType()) {
                case PlatformService.PlatformType.WX:
                    data = await ArchiveServerSDK.wxLogin();
                    break;
                case PlatformService.PlatformType.FACEBOOK:
                    data = await ArchiveServerSDK.fbLogin();
                    break;
                case PlatformService.PlatformType.ANDROID:
                    data = await ArchiveServerSDK.gpLogin();
                    break;
                case PlatformService.PlatformType.IOS:
                    data = await ArchiveServerSDK.asLogin();
                    break;
                default:
                    data = await ArchiveServerSDK.webLogin();
                    break;
            }

            if (data && data.token && data.openid) {
                ArchiveServerSDK.authToken = data.token;
                ArchiveServerSDK.openid = data.openid;
            } else {
                throw new Error("返回信息错误" + data);
            }
        } catch (e) {
            cc.error(`登陆失败${e ? ":" + e.toString() : ""}`);
        }
    }

    /**
     * 微信登录
     */
    private static async wxLogin() {
        return new Promise((resolve, reject) => {
            wx.login({
                success: async (res) => {
                    try {
                        const data = await ArchiveServerSDK.remoteCall(
                            "/wxapi/login",
                            {
                                game: ArchiveServerSDK.GameName,
                                code: res.code,
                            },
                            "GET"
                        );
                        if (data && data.token) {
                            return resolve(data);
                        }

                        throw new Error();
                    } catch (e) {
                        return reject(e);
                    }
                },
                fail(err) {
                    return reject(err);
                },
            });
        });
    }

    /**
     * Facebook登录
     */
    private static async fbLogin() {
        const player = FBInstant.player;
        const result = await player.getSignedPlayerInfoAsync();
        const data = await ArchiveServerSDK.remoteCall('/fbapi/login', {
            game: ArchiveServerSDK.GameName,
            uid: FBInstant.player.getID(),
            signedRequest: result.getSignature(),
        }, 'GET');
        if (data && data.token) {
            return data;
        }
        else {
            throw new Error();
        }
    }


    /**
     * 网页登录
     */
    private static webLogin() {
        return Promise.resolve({
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnYW1lIjoiaGx6Z2MiLCJvcGVuaWQiOiJvZm93UTVhaUY2WmdoUmtoRFVNUXJUUHJNcWF3IiwidWlkIjoid3h8b2Zvd1E1YWlGNlpnaFJraERVTVFyVFByTXFhdyIsImNoYW5uZWwiOiJ3ZWNoYXQiLCJpYXQiOjE1NDc5NTQxNTd9.tbCMD5wzzkX8YLNTapvr9WQxbJejQhDhXeYgSLOgKzM',
            openid: 'ofowQ5aiF6ZghRkhDUMQrTPrMqaw'
        });
    }

    /**
     * 苹果登录
     */
    private static async asLogin() {
        const uid = cc.sys.localStorage.getItem("asuid");
        // 请求服务器, uid可为空
        const data = await ArchiveServerSDK.remoteCall(
            "/asapi/login",
            {
                game: ArchiveServerSDK.GameName,
                uid: uid,
            },
            "GET"
        );
        if (data && data.token && data.openid) {
            cc.sys.localStorage.setItem("asuid", data.openid);
            return data;
        } else {
            throw new Error();
        }
    }

    /**
     * 安卓登录
     */
    private static async gpLogin() {
        const uid = cc.sys.localStorage.getItem("asuid");
        // 请求服务器, uid可为空
        const data = await ArchiveServerSDK.remoteCall(
            "/gpapi/login",
            {
                game: ArchiveServerSDK.GameName,
                uid: uid,
            },
            "GET"
        );
        if (data && data.token && data.openid) {
            cc.sys.localStorage.setItem("asuid", data.openid);
            return data;
        } else {
            throw new Error();
        }
    }
}

if (CC_DEBUG && cc.sys.platform != cc.sys.WECHAT_GAME) {
    (async () => {
        try {
            await ArchiveServerSDK.login();
        } catch (error) {
            console.warn(error);
        }

    })();
}
