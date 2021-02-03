import HttpHelper from "../../Helpers/HttpHelper";

const { ccclass, property } = cc._decorator;

@ccclass
class WZSDK extends cc.Component {

    @property({
        tooltip: "是否开启调试"
    })
    private debug: boolean = false;
    /**
     * 和服务器的时间差
     */
    private timediff: number = 0;
    @property({
        tooltip: "应用ID"
    })
    private appKey: string = "";
    @property({
        tooltip: "应用密钥"
    })
    private appSecret: string = "";
    @property({
        tooltip: "应用版本"
    })
    private appVersion: string = "";

    /**
     *用户ID
     *
     * @type {string}
     * @memberof WZSDK
     */
    public UserId: string = null;

    /**
     *是否列入黑名单
     *
     * @type {boolean}
     * @memberof WZSDK
     */
    public inBlackList: boolean = false;

    /**
     *是否被封号(进行分数变更会报错)
     *
     * @type {boolean}
     * @memberof WZSDK
     */
    public isBlock: boolean = false;


    public isWhiteUser: boolean = false;

    /**
     *是否被警告（进行分数变更会报错）
     *
     * @type {boolean}
     * @memberof WZSDK
     */
    public isWarn: boolean = false;

    /**
     *是否已经受邀请
     *
     * @type {boolean}
     * @memberof WZSDK
     */
    public hasFilledInviteCode: boolean = false;

    /**
     *是否全局关闭
     *
     * @type {boolean}
     * @memberof WZSDK
     */
    public isCloseGlobalDraw: boolean = false;

    /**
     *是否自动登陆
     *
     * @private
     * @type {boolean}
     * @memberof WZSDK
     */
    @property({
        tooltip: "是否自动登陆"
    })
    private autoLogin: boolean = true;

    /**
     *是否登录
     *
     * @type {boolean}
     * @memberof WZSDK
     */
    public isLogin: boolean = false;

    // 接口请求地址
    private apiHost: string = "https://ossdk.tongchuangyouxi.com";

    protected static _instance: WZSDK = null;

    public static get Instance() {
        if (WZSDK._instance == null) {
            WZSDK._instance = cc.director.getScene().getComponentInChildren(WZSDK);
            console.log("搜索WZSDK")
            if (WZSDK._instance != null) {
                cc.game.addPersistRootNode(WZSDK._instance.node);
            }
        }

        if (WZSDK._instance == null) {
            console.log("创建WZSDK")
            let obj = new cc.Node("WZSDK");
            cc.game.addPersistRootNode(obj);

            WZSDK._instance = obj.addComponent(WZSDK);
        }

        return WZSDK._instance;
    }


    onLoad() {
        if (WZSDK._instance == null) {
            WZSDK._instance = this;
            console.log("初始WZSDK")
            if (WZSDK._instance != null) {
                cc.game.addPersistRootNode(WZSDK._instance.node);
            }
        }
    }


    async start() {

        if (this.autoLogin) {
            return await this.WaitForLogin();
        }

    }


    /**
     * 获取数据sha1加密后的字符串
     * @param data 
     */
    private GetSign(data: Map<string, object>): string {
        // 进行数据排序和序列化
        let sortedSign = new Map(Array.from(data).sort((a, b) => {
            return a[0].localeCompare(b[0])
        }).map((i) => { return [i[0], i[1]] }));
        let retStr = "";
        sortedSign.forEach((value, key) => {
            if (retStr != "") {
                retStr += "&"
            }
            retStr += `${key}=${encodeURIComponent(value as any)}`
        })
        if (this.debug) {
            console.log(`签名${retStr + data.get("timestamp") + this.appSecret}`);
        }
        // 进行sha1加密
        let sha1 = this.sha1(retStr + data.get("timestamp") + this.appSecret);
        return sha1;
    }

    encodeUTF8(s) {
        var i, r = [], c, x;
        for (i = 0; i < s.length; i++)
            if ((c = s.charCodeAt(i)) < 0x80) r.push(c);
            else if (c < 0x800) r.push(0xC0 + (c >> 6 & 0x1F), 0x80 + (c & 0x3F));
            else {
                if ((x = c ^ 0xD800) >> 10 == 0) //对四字节UTF-16转换为Unicode
                    c = (x << 10) + (s.charCodeAt(++i) ^ 0xDC00) + 0x10000,
                        r.push(0xF0 + (c >> 18 & 0x7), 0x80 + (c >> 12 & 0x3F));
                else r.push(0xE0 + (c >> 12 & 0xF));
                r.push(0x80 + (c >> 6 & 0x3F), 0x80 + (c & 0x3F));
            };
        return r;
    }

    sha1(content) {
        let data = new Uint8Array(this.encodeUTF8(content))
        let i, j, t;
        let l = ((data.length + 8) >>> 6 << 4) + 16, s: any = new Uint8Array(l << 2);
        s.set(new Uint8Array(data.buffer)), s = new Uint32Array(s.buffer);
        for (t = new DataView(s.buffer), i = 0; i < l; i++)s[i] = t.getUint32(i << 2);
        s[data.length >> 2] |= 0x80 << (24 - (data.length & 3) * 8);
        s[l - 1] = data.length << 3;
        let w = [], f = [
            function () { return m[1] & m[2] | ~m[1] & m[3]; },
            function () { return m[1] ^ m[2] ^ m[3]; },
            function () { return m[1] & m[2] | m[1] & m[3] | m[2] & m[3]; },
            function () { return m[1] ^ m[2] ^ m[3]; }
        ], rol = function (n, c) { return n << c | n >>> (32 - c); },
            k = [1518500249, 1859775393, -1894007588, -899497514],
            m = [1732584193, -271733879, null, null, -1009589776];
        m[2] = ~m[0], m[3] = ~m[1];
        for (i = 0; i < s.length; i += 16) {
            let o = m.slice(0);
            for (j = 0; j < 80; j++)
                w[j] = j < 16 ? s[i + j] : rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1),
                    t = rol(m[0], 5) + f[j / 20 | 0]() + m[4] + w[j] + k[j / 20 | 0] | 0,
                    m[1] = rol(m[1], 30), m.pop(), m.unshift(t);
            for (j = 0; j < 5; j++)m[j] = m[j] + o[j] | 0;
        };
        t = new DataView(new Uint32Array(m).buffer);
        for (let i = 0; i < 5; i++)m[i] = t.getUint32(i << 2);

        let hex = Array.prototype.map.call(new Uint8Array(new Uint32Array(m).buffer), function (e) {
            return (e < 16 ? "0" : "") + e.toString(16);
        }).join("");
        return hex;
    }



    /**
     * 构建请求参数
     * @param data 
     * @param json 
     */
    private BuildRequestData(data: Map<string, any>, json = true) {
        let sign: Map<string, any> = null;
        if (data != null) {
            sign = new Map(Array.from(data));
        } else {
            sign = new Map();
        }
        sign.set("timestamp", (this.GetTimestamp() + this.timediff).toString())
        sign.set("appKey", this.appKey);
        sign.set("version", this.appVersion);
        if (this.UserId != null) {
            sign.set("userId", this.UserId);
        }

        sign.set("sign", this.GetSign(sign));

        if (json) {
            let jsonStr: string = "";
            sign.forEach((value, key) => {
                if (jsonStr != "") {
                    jsonStr += ",";
                }

                if ("number" == typeof (value)) {
                    // 数字
                    jsonStr += `"${key}":${value}`
                } else {
                    jsonStr += `"${key}":"${value}"`
                }
            })
            return "{" + jsonStr + "}";
        } else {
            let queryStr: string = "";
            sign.forEach((value, key) => {
                if (queryStr != "") {
                    queryStr += "&";
                }

                queryStr += `${key}=${value}`
            })
            return queryStr;
        }
    }

    /**
     * 发送Get请求
     * @param path 
     * @param getParam 
     */
    private async requestGet<T>(path: string, getParam: string): Promise<WZSDK.ReqContainer<T>> {
        if (this.debug) {
            console.log(`Get请求接口:${path}, 参数:${getParam == null ? "" : getParam}`);
        }

        let ret = await HttpHelper.Request(`${this.apiHost}${path}?${getParam}`)
        if (this.debug) {
            console.log(`Get请求接口:${path}, 结果:${JSON.stringify(ret)}`);
        }
        return ret;
    }

    /**
     * 发送Post请求
     * @param path 
     * @param postParam 
     */
    private async requestPost<T>(path: string, postParam: string): Promise<WZSDK.ReqContainer<T>> {
        if (this.debug) {
            console.log(`Post请求接口:${path}, 参数:${postParam == null ? "" : postParam}`);
        }
        let ret = await HttpHelper.Request(`${this.apiHost}${path}`, {
            method: "POST",
            data: JSON.parse(postParam)
        })
        if (this.debug) {
            console.log(`Post请求接口:${path}, 结果:${JSON.stringify(ret)}`);
        }

        return ret;
    }

    /**
     * 获取时间戳
     */
    private GetTimestamp(): number {
        return Math.floor(new Date().getTime() / 1000);
    }


    /**
     * 初始化
     * @param appKey 
     * @param appSecret 
     * @param version 
     */
    public Init(appKey: string, appSecret: string, version: string = "", apiHost: string = "") {
        this.appKey = appKey;
        this.appSecret = appSecret;
        if (version != null && version != "") {
            this.appVersion = version;
        }
        if (apiHost != null && apiHost != "") {
            this.apiHost = apiHost;
        }
    }

    /**
     * 同步时间差
     */
    public async SyncTime() {
        let ret = await this.requestGet<WZSDK.ReqTime>("/api/extApi/time", this.BuildRequestData(null, false));
        if (ret != null && ret.code == WZSDK.ReqCode.Success) {
            let current = this.GetTimestamp();
            let srvTime = parseInt(ret.data.timestamp);
            // 保存时间差
            this.timediff = srvTime - current;
        }
    }

    /**
     * 玩家注册
     * @param uniqueId 
     */
    public async TryRegister(uniqueId: string = null) {
        let data: Map<string, any> = null;
        if (uniqueId != null) {
            data = new Map<string, any>([["uniqueId", uniqueId]])
        }
        // 判断是否有是新用户
        let userId: string = blade.platform.get<string>("dy_userid");
        if (userId == null || userId == "") {
            // 新用户, 先执行注册
            let ret = await this.requestPost<WZSDK.ReqRegister>("/api/extApi/sign/register", this.BuildRequestData(data));
            if (ret != null) {
                if (ret.code == WZSDK.ReqCode.Success) {
                    var uid = ret.data.userId;
                    if (uid != null && uid != "") {
                        blade.platform.set("dy_userid", uid);
                        this.UserId = uid;
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            }
        } else {
            this.UserId = userId;
            return true;
        }
    }

    /**
     * 玩家登陆
     * @param uniqueId 
     */
    public async Login(uniqueId: string = null) {
        let data: Map<string, any> = null;
        if (uniqueId != null) {
            data = new Map<string, any>([["uniqueId", uniqueId]])
        }
        let ret = await this.requestPost<WZSDK.ReqLogin>("/api/extApi/sign/user/login", this.BuildRequestData(data));
        if (ret != null) {
            if (ret.code == WZSDK.ReqCode.Success) {
                var uid = ret.data.userId;
                if (uid != null && uid != "") {
                    blade.platform.set("dy_userid", uid);
                    this.UserId = uid;
                }
                this.isLogin = true;
                this.inBlackList = ret.data.inBlackList;
                this.isWarn = ret.data.isWarn;
                this.isBlock = ret.data.isBlock;
                this.hasFilledInviteCode = ret.data.hasFilledInviteCode;
                this.isCloseGlobalDraw = ret.data.isCloseGlobalDraw;
                this.isWhiteUser = ret.data.isWhiteUser;
                // if (!string.IsNullOrEmpty(ret.data.forceVersion) && ret.data.forceVersion != Application.version) {
                //     Toast.Show("There is a new update now, please update!", Toast.LENGTH_LONG);
                //     Application.OpenURL(ret.data.updateUrl);
                //     Application.Quit();
                // }
            } else {
                return false;
            }

        }
    }

    /**
     * 等待登陆完成
     */
    public async WaitForLogin(uniqueId?: string) {
        this.UserId = null;
        await this.SyncTime();
        await this.TryRegister(uniqueId);
        await this.Login(uniqueId);
    }

    /**
     *同步存档数据
     *
     * @memberof WZSDK
     */
    public async SyncData(key: string, value: number, source: string) {
        let data: Map<string, any> = new Map<string, any>([
            ["dataKey", key],
            ["value", Math.abs(value)],
            ["source", source],
            ["type", value > 0 ? "increase" : "decrease"]
        ]);


        return await this.requestPost<WZSDK.ReqSync>("/api/extApi/sign/user/data/change", this.BuildRequestData(data));
    }

    /**
     * 查询存档数据
     */
    public async QueryData(key: string) {
        let data: Map<string, any> = new Map<string, any>([
            ["dataKey", key]
        ]);
        return await this.requestGet<WZSDK.ReqQuery>("/api/extApi/sign/user/data/query", this.BuildRequestData(data, false));
    }

    /**
     * 邀请用户
     * @param fromInviteCode 
     */
    public async Invite(fromInviteCode: string) {
        let data: Map<string, any> = new Map<string, any>([
            ["fromInviteCode", fromInviteCode]
        ]);
        return await this.requestPost<WZSDK.ReqInvite>("/api/extApi/h5/invite", this.BuildRequestData(data));
    }

    /**
     * 提现
     * @param productId 
     * @param countryId 
     * @param phone 
     * @param email 
     */
    public async Withdraw(productId: number, countryId: number, phone: string, email: string) {
        let data: Map<string, any> = new Map<string, any>([
            ["productId", productId],
            ["countryId", countryId],
            ["phone", phone],
            ["email", email],
        ]);

        return await this.requestPost<WZSDK.ReqWithdraw>("/api/extApi/h5/withdraw", this.BuildRequestData(data));
    }

    /**
     * 获取国家列表
     */
    public async GetCountries() {
        await this.requestGet<WZSDK.ReqCountries>("/api/extApi/h5/countries", this.BuildRequestData(null, false));
    }

    /**
     * 获取商品列表
     * @param dataKey 
     */
    public async GetProducts(dataKey: string) {
        let data: Map<string, any> = new Map<string, any>([
            ["dataKey", dataKey],
        ]);
        return await this.requestGet<WZSDK.ReqProducts>("/api/extApi/h5/products", this.BuildRequestData(data, false));
    }

    /**
     * 获取用户信息
     */
    public async GetUserInfo() {
        return await this.requestGet<WZSDK.ReqUserInfo>("/api/extApi/h5/userInfo", this.BuildRequestData(null, false));
    }

    /**
     * 请求广告配置
     */
    public async GetAds() {
        return await this.requestPost<WZSDK.ReqAds>("/api/extApi/new/switchAds", this.BuildRequestData(null));
    }

    private _PositionCache: Map<string, WZSDK.ReqContainer<WZSDK.ReqMutualPush>> = new Map<string, WZSDK.ReqContainer<WZSDK.ReqMutualPush>>();

    /**
     * 游戏互推(带缓存)
     * @param position 
     */
    public async GetMutualPush(position: string) {
        if (this._PositionCache.has(position)) {
            return this._PositionCache.get(position);
        }
        let data: Map<string, any> = new Map<string, any>([
            ["position", position],
        ]);

        let ret = await this.requestPost<WZSDK.ReqMutualPush>("/api/extApi/new/mutualPush", this.BuildRequestData(data));
        if (ret != null && ret.code == WZSDK.ReqCode.Success) {
            this._PositionCache.set(position, ret);
        }
        return ret;
    }

    /**
     * 统计互推广告
     * @param mp_id 
     * @param type 
     * @param num 
     */
    public async GetMutualPushCount(mp_id: number, type: string, num: number) {
        let data: Map<string, any> = new Map<string, any>([
            ["mp_id", mp_id],
            ["type", type],
            ["num", num],
        ]);
        return await this.requestPost<WZSDK.ReqMutualPushCount>("/api/extApi/new/mutualPushCount", this.BuildRequestData(data));
    }

    /**
     * 渠道来源统计
     * @param uniqueKey 
     */
    public async SetSourceChannel(uniqueKey: string) {
        let data: Map<string, any> = new Map<string, any>([
            ["uniqueKey", uniqueKey],
        ]);

        return await this.requestPost<WZSDK.ReqSourceChannel>("/api/extApi/new/sourceChannelsCount", this.BuildRequestData(data));
    }

    /**
     * QQ兑换
     * @param amount 
     * @param openid 
     */
    public async DrawCashQQ(amount: number, openid: string) {
        let data: Map<string, any> = new Map<string, any>([
            ["amount", amount],
            ["openid", openid],
        ]);

        return await this.requestPost<WZSDK.ReqDrawCashQQ>("/api/rank/draw_cash", this.BuildRequestData(data));
    }

    public async GetDrawQQInfo() {
        let data: Map<string, any> = new Map<string, any>([
        ]);

        return await this.requestPost<WZSDK.ReqDrawQQInfo>("/api/rank/get_draw_set", this.BuildRequestData(data));
    }

    public async GetData() {
        let data: Map<string, any> = new Map<string, any>([
            ["type", "get"],
            ["key", "Archive"]
        ]);

        let result = await this.requestPost<any>("/api/rank/keep_on_a_file", this.BuildRequestData(data));
        if (result.data == null) {
            result.data = encodeURIComponent(JSON.stringify({}));
        }
        result.data = JSON.parse(decodeURIComponent(result.data))
        return result;
    }

    public async SetData(saveData: any) {
        let data: Map<string, any> = new Map<string, any>([
            ["type", "set"],
            ["key", "Archive"],
            ["value", encodeURIComponent(JSON.stringify(saveData))]
        ]);

        return await this.requestPost<any>("/api/rank/keep_on_a_file", this.BuildRequestData(data));
    }

    public async RedeemStatus(isOpen: boolean) {
        let data: Map<string, any> = new Map<string, any>([
            ["type", isOpen ? 1 : 0],
        ]);

        return await this.requestPost<any>("/api/extApi/new/change_user_type", this.BuildRequestData(data));
    }
}

namespace WZSDK {


    export enum ReqCode {
        /*
        /*成功
        */
        Success = 0,

        /*
        /*参数错误
        */
        ParameterError = 10000,

        /*
        /*服务器错误
        */
        ServerError = 10001,

        /*
        /*未登录
        */
        NotLoggedIn = 10002,

        /*
        /*没有权限进行此操作
        */
        NoPermission = 10003,

        /*
        /*用户不存在
        */
        UserExist = 10004,

        /*
        /*sign错误
        */
        SignError = 10009,

        /*
        /*请求超时
        */
        RequestTimedOut = 10010,

        /*
        /*邀请码不存在
        */
        InvitationCodeExist = 10013,

        /*
        /*余额不足
        */
        InsufficientBalance = 10016,

        /*
        /*商品不存在 
        */
        ProductNotFound = 10015,

        /*
        /*邀请码无效
        */
        InvitationCodeValid = 10017,

        /*
        /*请求过快
        */
        RequestTooFast = 10018,

        /*
        /*请求数据量不能通过校验
        */
        DataVerificationFailedNotThrough = 10019,

        /*
        /*数据来源已经被使用
        */
        Received = 10020,
        /*
        /*没有配置该数据来源
        */
        DataVerificationFailedNotUse = 10021,

        /*
        /*已提交数据超过每日限额
        */
        ExceedsDailyLimit = 10022,

        /*
        /*账号被警告，8小时后解除
        */
        Warn = 10023,

        /*
        /*账号已经被封
        */
        BeenLocked = 10024,
    }

    /**
     * 请求数据结构容器
     */
    export class ReqContainer<T> {
        public code: ReqCode;
        public msg: string;
        public msgEn: string;
        public data: T;
    }

    /*
    /*请求服务器时间
    */
    export class ReqTime {
        public timestamp: string;
    }

    /**
     * 注册
     */

    export class ReqRegister {
        public userId: string;
    }

    /**
     * 登陆
     */

    export class ReqLogin {
        /*
        /*用户的userId, 假如返回跟客户端缓存的不一样，需要把缓存更新成此id值
        */
        public userId: string;

        /*
        /*是否列入黑名单（不展示兑换、商品界面）
        */
        public inBlackList: boolean;

        /*
        /*是否被封号(进行分数变更会报错)
        */
        public isBlock: boolean;

        public isWhiteUser: boolean;

        /*
        /*是否被警告（进行分数变更会报错）
        */
        public isWarn: boolean;

        /*
        /*是否已经受邀请
        */
        public hasFilledInviteCode: boolean;

        /*
        /*是否全局关闭
        */
        public isCloseGlobalDraw: boolean;

        /*
        /*强制更新版本
        */
        public forceVersion: string;

        /*
        /*强制更新链接
        */
        public updateUrl: string;
    }

    /**
     * 更新服务器数据
     */

    export class ReqSync { }

    /**
     * 查询服务器数据
     */

    export class ReqQuery {
        public value: number;
    }

    /**
     * 邀请用户
     */

    export class ReqInvite {

    }

    /**
     * 体现
     */
    export class ReqWithdraw {

    }

    /**
     * 商品
     */

    export class Product {
        public id: number;
        /*
        /*显示的价格
        */
        public name: number;
        /*
        /*类别
        */
        public appWithdrawChannelId: ProductType;
        public img: string;
        /*
        /*兑换需要货币数量
        */
        public cost: number;
        public appDataParamName: string;
        public appDataParamImg: string;
    }


    export enum ProductType {
        Paypal = 1,
        Amazon = 3
    }

    /**
     * 商品列表
     */
    export class ReqProducts {
        public list: Array<Product>;
        public total: number;
    }

    /**
     * 国家
     */

    export class Countrie {
        public id: number;
        public name: string;
        public abbr: string;
        public img: string;
        public weigh: number;
        public createdAt: string;
        public updatedAt: string;
    }

    /**
     * 国家列表
     */
    export class ReqCountries {
        public list: Array<Countrie>;
        public total: number;
    }

    /**
     * 用户信息
     */


    export class ReqUserInfo {
        public id: number;
        public appId: number;
        /*
        /*邀请码
        */
        public inviteCode: string;
        /*
        /*被邀请人
        */
        public fromInviteCode: string;
        public lastLoginAt: string;
        public createdAt: string;
        public updatedAt: string;
        public inviterFakeAmount: number;
        public invitedFakeAmount: number;
        public appName: string;
        /*
        /*邀请人数
        */
        public inviteAmount: number;
        /*
        /*邀请奖励
        */
        public inviteReward: number;
        public appDataParamId: number;
        public appDataParamImg: string;
        public appDataParamName: string;

        /*
        /*数据key
        */
        public dataKey: string;

        /*
        /*邀请地址
        */
        public inviteUrl: string;

        /*
        /*邀请获得金额
        */
        public inviteRewardAmount: number;
        /*
        /*接受邀请获得金额
        */
        public fillInviteRewardAmount: number;
    }


    export class ReqAds {
        public DefaultName: string;
        public AdsList: Array<AdsInfo>;

    }

    export class AdsIDs {
        public AppID: ID;
        public BannerID: ID;
        public RewardedVideoID: ID;
        public InterstitialID: ID;
        public NativeAdID: ID;
    }



    export class AdsInfo extends AdsIDs {
        public Name: string;
        public Type: string;
        public Weight: number;
        public MaxSuccessCount: number;
        public MaxFailCount: number;
    }


    export enum AdsType {
        GoogleAds,
        UnityAds,
        FacebookAds,
        MoPubAds,
        AdColonyAds,
        VungleAds
    }




    export class ID {
        public IOS: string;
        public Android: string;
    }

    /**
     * 游戏互推
     */

    export class ReqMutualPush {
        public list: Array<MutualPushPositionInfo>;
    }

    /**
     * 互推位置信息
     */
    export class MutualPushPositionInfo {
        /*
        /*广告位
        */
        public position: string;

        /*
        /*轮播规则，顺序（ordinal）或随机（ramdom）
        */
        public banner_rule: string;

        /*
        /*广告列表
        */
        public ads: Array<MutualPushAdsInfo>;
    }

    /**
     * 互推广告信息
     */

    export class MutualPushAdsInfo {
        /*
        /*互推ID
        */
        public id: number;

        /*
        /*广告短链接
        */
        public url: string;

        /*
        /*广告长链接
        */
        public long_url: string;

        /*
        /*素材
        */
        public icon: string;

        /*
        /*权重
        */
        public weigh: string;

        /*
        /*素材类型,image或video
        */
        public icon_type: string;
    }

    /// <summary>
    /// 互推广告记录
    /// </summary>

    export class ReqMutualPushCount { }

    /// <summary>
    /// 渠道来源统计
    /// </summary>

    export class ReqSourceChannel { }


    export class ReqDrawCashQQ {

    }

    export class ReqDrawQQInfo {
        public list: Array<DrawQQItem>;
    }

    export class DrawQQItem {
        public amount: string;
        public for_new: boolean;
        public can_draw: boolean
    }
}

export default WZSDK;
