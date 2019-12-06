import HttpHelper from "../../Helpers/HttpHelper";
import PlatformService from "../../Services/PlatformService";
import TimerService from "../../Services/TimerService";

/**
 * 数据服务器
 */
class ArchiveServerSDK {
    // 游戏名
    private static GameName = ""

    // 存档服务器URL
    private static readonly ArchiveDebugUrl = `https://gamearchive.tongchuangyouxi.com`
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

    // 排行榜缓存
    private static rankList: ArchiveServerSDK.RankItem[] = [];
    private static selfRank: ArchiveServerSDK.RankItem = null;

    // 读取出来的存档内容
    private static data: any = null;
    // 本地存档自动保存时间, 单位：秒
    private static ArchiveAutoSaveSecond = 5

    private static autoSave: TimerService.Timer = null
    /**
     * 调用远程Web接口
     * @param path
     * @param data
     * @param method
     */
    private static remoteCall(
        path: string,
        data: any = {},
        method: HttpHelper.RequestMethod = "POST"
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
                    Authorization: `Bearer ${ArchiveServerSDK.authToken}`,
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
                    reject(reason);
                });
        });
    }


    /**
    * 登陆操作
    */
    public static async login(name: string) {
        // 已经登录
        if (ArchiveServerSDK.isLogin() == true) {
            return;
        }

        ArchiveServerSDK.GameName = name

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

            // 同步数据
            ArchiveServerSDK.data = ArchiveServerSDK.loadLocal()
            console.log("游戏数据：", ArchiveServerSDK.data);

            // 定时保存
            if (ArchiveServerSDK.autoSave) {
                app.timer.stopTimer(ArchiveServerSDK.autoSave)
            }
            ArchiveServerSDK.autoSave = app.timer.startTimer(ArchiveServerSDK.ArchiveAutoSaveSecond, () => {
                ArchiveServerSDK.save(true)
            }, this);
        } catch (e) {
            cc.error(`登陆失败${e ? ":" + e.toString() : ""}`);
        }
    }

    /**
     * 是否已经登录
     */
    public static isLogin() {
        if (ArchiveServerSDK.authToken != null && ArchiveServerSDK.openid != null) {
            return true;
        } else {
            return false;
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
        const uid = app.platform.getPlatform().getArchive("asuid");
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
            app.platform.getPlatform().saveArchive("asuid", data.openid);
            return data;
        } else {
            throw new Error();
        }
    }

    /**
     * 安卓登录
     */
    private static async gpLogin() {
        const uid = app.platform.getPlatform().getArchive("asuid");
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
            app.platform.getPlatform().saveArchive("asuid", data.openid);
            return data;
        } else {
            throw new Error();
        }
    }


    /**
     * 获取当前毫秒级时间
     */
    public static async getTime(): Promise<number> {
        let data = await ArchiveServerSDK.remoteCall("/comapi/time", {}, "GET")
        return data.time
    }


    /**
	 * 设置排名
	 * @param rankName
	 * @param score
	 */
    public static async setScore(rankName: string, score: number) {
        if (ArchiveServerSDK.isLogin() == false) {
            throw new Error("请先调用ArchiveServerSDK.login(),登录服务器!")
        }
        await ArchiveServerSDK
            .remoteCall(
                "/rank/set",
                {
                    rank: rankName,
                    score: score.toFixed(0),
                },
                "POST"
            )
    }

    /**
    * 获取排名
    * @param rankName
    */
    public async getRank(rankName: string): Promise<{ list: ArchiveServerSDK.RankItem[]; self: ArchiveServerSDK.RankItem }> {
        // 有缓存记录, 直接返回
        if (ArchiveServerSDK.rankList.length > 0) {
            return {
                list: ArchiveServerSDK.rankList,
                self: ArchiveServerSDK.selfRank,
            };
        }

        if (ArchiveServerSDK.isLogin() == false) {
            throw new Error("请先调用ArchiveServerSDK.login(),登录服务器!")
        }
        let data = await ArchiveServerSDK
            .remoteCall(
                "/rank/get",
                {
                    rank: rankName,
                    top: 50,
                },
                "GET"
            )

        // 保存记录
        ArchiveServerSDK.rankList = data.list || [];
        ArchiveServerSDK.selfRank = data.self;

        return data;
    }

    /**
    * 上传用户信息
    */
    public static async uploadUserInfo() {
        if (ArchiveServerSDK.isLogin() == false) {
            throw new Error("请先调用ArchiveServerSDK.login(),登录服务器!")
        }
        const userInfo = app.platform.getPlatform().getUserInfo();
        if (
            userInfo
        ) {
            try {
                await ArchiveServerSDK.remoteCall("/user/record", userInfo, "POST");
                console.log("上传用户成功！", userInfo);
            } catch (error) {
                console.error("无法上传用户数据！", error)

            }
        } else {
            console.error("暂无用户信息！无法上传用户数据！")
        }
    }


    /**
   * 从网络读取存档
   */
    private static async loadRemote() {
        if (ArchiveServerSDK.isLogin() == false) {
            throw new Error("请先调用ArchiveServerSDK.login(),登录服务器!")
        }

        try {
            const remoteData = await ArchiveServerSDK.remoteCall('/archive/get', {}, 'GET');
            if (remoteData) {
                return remoteData;
            }

            throw new Error();
        }
        catch (e) {
            return {};
        }
    }

    /**
    * 保存数据到网络
    */
    private static async saveRemote(data: any, overwrite = true, force = true) {
        if (ArchiveServerSDK.isLogin() == false) {
            throw new Error("请先调用ArchiveServerSDK.login(),登录服务器!")
        }

        await ArchiveServerSDK.remoteCall('/archive/save', {
            data: data,
            overwrite,
            force,
        });
    }

    /**
     * 从本地读取存档
     */
    private static loadLocal() {
        try {
            const result = JSON.parse(app.platform.getPlatform().getArchive('Archive'));
            return result;
        } catch (e) {
            return {};
        }
    }

    /**
     * 保存数据到本地
     */
    private static saveLocal(data: any) {
        // 通过调用平台本地存档接口进行保存
        app.platform.getPlatform().saveArchive('Archive', JSON.stringify(data));
    }

    /**
    * 本地和网络存档进行同步
    */
    public static async sync() {
        if (ArchiveServerSDK.isLogin() == false) {
            throw new Error("请先调用ArchiveServerSDK.login(),登录服务器!")
        }

        const remoteData: any = await ArchiveServerSDK.loadRemote();
        const localData = ArchiveServerSDK.data;
        //本地无存档
        if (localData == null) {
            console.log("本地无存档!")
            ArchiveServerSDK.data = remoteData;
            return;
        }

        const localTime = localData.alterTime || 0;
        const remoteTime = remoteData && remoteData.alterTime || 0;
        if (localTime < remoteTime) {
            // 网络覆盖本地
            console.log("更新本地存档")
            ArchiveServerSDK.data = remoteData;
            await ArchiveServerSDK.saveLocal(ArchiveServerSDK.data)
        }
        else {
            console.log("更新云存档")
            ArchiveServerSDK.data.alterTime = app.timer.getTime();
            // 本地覆盖网络
            await ArchiveServerSDK.saveRemote(ArchiveServerSDK.data);
        }
    }



    /**
     * 保存操作
     * @param force 强行保存, 不管是否被标记为修改
     */
    public static save(force: boolean = false) {
        if (force) {
            // console.log("强制保存!")
            ArchiveServerSDK.data.alterTime = app.timer.getTime();
            // 通过调用平台本地存档接口进行保存
            ArchiveServerSDK.saveLocal(ArchiveServerSDK.data)
            // 调用网络接口进行云保存
            ArchiveServerSDK.saveRemote(ArchiveServerSDK.data);
        }
    }

    /**
     * 获取指定键对应的值
     * 如果存档中找不到, 则返回默认值
     * @param key 
     */
    public static get<T>(key: string): T {
        if (ArchiveServerSDK.data == null) {
            throw new Error("请先同步数据！")
        }
        return ArchiveServerSDK.data[key] == null ? null : ArchiveServerSDK.data[key];
    }

    /**
     * 修改存到指定键名的值
     * @param key 
     * @param newValue 
     */
    public static set(key: string, newValue: any) {
        if (ArchiveServerSDK.data == null) {
            throw new Error("请先同步数据！")
        }
        const oldValue = ArchiveServerSDK.data[key];
        if (oldValue && typeof oldValue != typeof newValue) {
            throw new Error('存档新值和旧值类型不一致, 忽略存入');
        }
        // 旧值和新值不是同一个
        if (oldValue !== newValue) {
            this.data[key] = newValue;
        }
    }


}

namespace ArchiveServerSDK {
    /**
     * 排行榜单个数据项
     */
    export interface RankItem {
        uid: string;
        score: string;
        nick: string;
        avatar: string;
        rank?: number;
    }
}

// if (CC_DEBUG && cc.sys.platform != cc.sys.WECHAT_GAME) {
//     (async () => {
//         try {
//             await ArchiveServerSDK.login("leek");
//         } catch (error) {
//             console.warn(error);
//         }

//     })();
// }


export default ArchiveServerSDK;