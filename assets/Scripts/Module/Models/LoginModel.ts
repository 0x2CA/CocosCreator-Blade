
import ModelBase from "../../Blade/Bases/ModelBase";
import Model from "../../Blade/Decorators/Model";
import SocketEvent from "../../Blade/Decorators/SocketEvent";
import HttpHelper from "../../Blade/Helpers/HttpHelper";
import GameConfig from "../Defines/GameConfig";
import GameEvent from "../Defines/GameEvent";
import { protobuf } from "../Protobuf/protobuf";

/*
 * @作者: 0x2CA
 * @创建时间: 2023-03-10
 * @最后编辑时间: 2023-03-20
 * @最后编辑者: 0x2CA
 * @描述:
 */
@Model("LoginModel")
class LoginModel extends ModelBase {

    // 服务器列表数据
    private _platformId: number = null;
    private _platformKey: string = null;
    private _authUrlBase: string = null;
    private _orderUrlBase: string = null;
    private _platformNotices: LoginModel.PlatformNotice[] = null;
    private _serverList: LoginModel.ServersData[] = null;
    //送审服务端版本
    private _specailVersion: string = null;
    //送审服务id
    private _specailId: number = null;

    // 当前服务器
    private _currentServerData: LoginModel.ServersData = null;

    //历史服务器列表
    private _historyList: Set<number> = null;

    //秘籍状态
    private _secretState: boolean = false;

    // 认证相关
    private _userId: string = null;
    private _channelId: number = null;
    private _identityId: string = null;

    // 服务器同步时间回调
    private _syncServerTimeCallback: Function = null;

    // 是否认证
    private _isAuth: boolean = false;

    // socket 连接相关信息
    private _socketIp: string = null;
    private _socketPort: number = null;

    public resetAuth() {
        this._isAuth = false;
    }

    public isHistory(serverId: number) {
        return this._historyList?.has(serverId);
    }

    public isNewUser() {
        if (this._historyList == null || this._historyList.size > 0) {
            return false;
        }

        return true;
    }

    public getServerList() {
        let list: LoginModel.ServersData[] = [];

        if (this._serverList != null) {
            for (let index = 0; index < this._serverList.length; index++) {
                const serverData = this._serverList[index];
                // 秘籍控制特定服务器显示隐藏
                if (serverData.state == 3 && this._secretState == false) {
                    continue;
                }
                list.push(serverData);
            }
        }

        return list;
    }

    public selectServerData(serverId: number) {
        for (let index = 0; index < this._serverList.length; index++) {
            const serverData = this._serverList[index];
            if (serverData.id == serverId) {
                this._currentServerData = serverData;
                this._socketIp = serverData.ip;
                this._socketPort = serverData.port;
                blade.notice.emit(GameEvent.SelectServer);
                return;
            }
        }
    }

    public getCurrentServerData() {
        return this._currentServerData;
    }

    public getNewestServerData() {
        let newServerData = this.getServerList();
        newServerData.sort((a, b) => {
            return b.openTime - a.openTime;
        });
        return newServerData[0]
    }

    public getSocketIp() {
        return this._socketIp;
    }

    public getSocketPort() {
        return this._socketPort;
    }

    public getIdentityId() {
        return this._identityId
    }

    public setIdentityId(identityId: string) {
        this._identityId = identityId;
    }

    public getAuthUrlBase() {
        return this._authUrlBase
    }

    public getOrderUrlBase() {
        return this._orderUrlBase
    }

    public getPlatformId() {
        return this._platformId
    }

    public getPlatformKey() {
        return this._platformKey
    }

    public getUserId() {
        return this._userId
    }

    public setUserId(id: string) {
        this._userId = id;
    }

    public getChannelId() {
        return this._channelId
    }

    public setChannelId(id: number) {
        this._channelId = id;
    }

    public getCurrentServerId() {
        return this._currentServerData?.id || 0;
    }

    //是否送审版本
    public isSpecailVersion() {
        return this._specailVersion == GameConfig.specialVersion;
    }

    public getSecretState() {
        return this._secretState;
    }

    public setSecreState(state: boolean) {
        this._secretState = state;
    }

    public getPlatformNotices() {
        return this._platformNotices;
    }

    public setSyncServerTimeCallback(callback: Function) {
        this._syncServerTimeCallback = callback;
    }

    public async requestServerList() {
        let data: LoginModel.ServerInfo = await HttpHelper.request(GameConfig.serverListUrl, {
            method: "GET",
            data: {
                t: blade.timer.getTime()
            }
        })

        this._platformId = data.platformId;
        this._platformKey = data.platformKey;
        this._authUrlBase = data.authUrl;
        this._orderUrlBase = data.createOrderUrl;
        this._platformNotices = data.platformNotices;
        this._specailVersion = data.auditVersion;
        this._specailId = parseInt(data.auditServerId);

        console.log("服务器列表", GameConfig.serverListUrl, data.serversList);

        let serverDatas: LoginModel.ServersData[] = [];

        //送审服
        let state = this._specailVersion == GameConfig.specialVersion

        console.log("送审服状态", state, data.auditVersion, data.auditServerId)

        for (let index = 0; index < data.serversList.length; index++) {
            let element = data.serversList[index];
            if (state) {
                if (this._specailId == element.id) {
                    serverDatas.push(element);
                    break;
                }
            } else {
                if (this._specailId != element.id) {
                    serverDatas.push(element);
                }
            }
        }

        this._serverList = serverDatas;
        this._serverList.sort((a, b) => {
            return b.orders - a.orders;
        });
    }

    public async requestAccountServerList() {

        if (this._userId == null || this._userId == "") {
            console.log("userId 为空无法获取账户服务器列表");
            return;
        }

        let url = `${this._authUrlBase}user/history_serverlist.do`;

        console.log("请求账户服务器列表", url, this._userId);

        let data: {
            code: number,
            servers: LoginModel.AccountServerData[]
        } = await HttpHelper.request(url, {
            method: "GET",
            data: {
                userId: this._userId
            }
        });

        this._historyList = new Set<number>();

        for (let index = 0; index < data.servers.length; index++) {
            this._historyList.add(data.servers[index].serverId);
        }

        console.log("账户服务器列表", data.servers);
    }

    // 登录流程
    public requestServerTime() {
        console.log("请求服务器时间");
        let data = protobuf.C2SServerTime.create();
        blade.socket.emit(protobuf.MessageIds.C2SServerTime, data);
    }

    @SocketEvent(protobuf.MessageIds.S2CServerTime)
    private onServerTime(data: protobuf.S2CServerTime) {
        console.log("服务器时间", data.serverTime);

        if (data.serverTime == null || data.serverTime <= 0) {
            // 返回时间错误!!
            return;
        }

        if (this._syncServerTimeCallback != null) {
            this._syncServerTimeCallback(data.serverTime);
        }

        // 同步时间时候发现没有认证发起认证
        if (this._isAuth == false) {
            this.requestAuth();
        }

    }

    private requestAuth() {
        console.log("服务器认证开始", this._identityId);
        let data = protobuf.C2SAuth.create();
        data.identityId = this._identityId;
        data.identityName = this._identityId;
        data.timeStamp = blade.timer.getTime();
        data.userId = this._userId || "";
        data.channelId = this._channelId || 0;
        data.platformId = this._platformId || 0;
        blade.socket.emit(protobuf.MessageIds.C2SAuth, data);
    }

    @SocketEvent(protobuf.MessageIds.S2CAuth)
    private onAuth(data: protobuf.S2CAuth) {
        console.log("玩家认证", data.state);
        if (data.state == 0) {
            // 认证通过
            this._isAuth = true;
            blade.notice.emit(GameEvent.AuthSuccess);
        }
    }

    public requestLogin() {
        console.log("角色登录开始");
        let data = protobuf.C2SLogin.create();
        blade.socket.emit(protobuf.MessageIds.C2SLogin, data);
    }

    @SocketEvent(protobuf.MessageIds.S2CLogin)
    private onLogin(data: protobuf.S2CLogin) {
        console.log("角色登录成功");
        let archive = blade.platform.getArchive();
        archive.set(LoginModel.IDENTITYID, this._identityId);
        archive.set(LoginModel.SERVERID, this._currentServerData?.id || 0);
        blade.notice.emit(GameEvent.LoginSuccess);
    }
}

namespace LoginModel {

    export const IDENTITYID = "identityId";
    export const SERVERID = "serverId";

    export interface ServersData {
        id: number;
        name: string;
        ip: string;
        port: number;
        http: string;
        httpReport: string;
        icon: string;
        openDesc: string;
        openTime: any;
        state: number;
        syncAuditData: string;
        setDefault: number;
        orders: number;
        enableSenCtrl: number;
        enableLog: number;
        enableStat: number;
        stateExpand: string;
        gsGroupId: number;
        gsGroupName: string;
        gsGroupDesc: number;
        clientVer: string;
        apkUpdateUrl: string;
        apkUpdateUrl2: string;
        iosUpdateUrl: string;
        iosUpdateUrl2: string;
        exclusive: string;
        resVer: string;
        enableInform: string;
        resUpdateUrl: string;
        resUpdateUrl2: string;
        mergeStat: number;
        mergeToSvr: number;
        gameNoticeUrl: string;
    }

    export interface LikeChannel {
        id: string;
        name: string;
        icon: string;
        type: string;
        sequence: number;
        limitLevel: number;
        items: string;
        intervalTime: number;
        isRoll: number;
        isAudio: number;
        channelNameColor: string;
        stickSequence: number;
        isStick: number;
        isDisturbed: number;
        shareLink: string;
        featureInformation: string;
        alias: string;
        isStatic: number;
    }

    export interface PlatformNotice {
        noticeUrl: string,
        name: string,
        beginTime: number,
        endTime: number,
        orderNum: number
    }

    export interface ServerInfo {
        platformNotices: PlatformNotice[];
        serverStateJsonUrl: string;
        groupId: number;
        platformNgc: any[];
        gameActivityHttpUrl: string;
        isOpenGM: number;
        authUrl: string;
        createOrderUrl: string;
        isRecharge: number;
        platformName: string;
        serversList: ServersData[];
        callBackUrl: string;
        chatGateServer: string;
        likeChannels: LikeChannel[];
        platformId: number;
        voicesUpload: string;
        voicesDownload: string;
        servicesUrl: string;
        parentId: number;
        realNameAttestation: any[];
        groupName: string;
        platformKey: string;
        thePhoneAttestation: any[];
        isShowVer: any[];
        isOpenAccount: number;
        platformNgcUrl: string;
        isOpenGift: number;
        parentUkey: string;
        maskWordList: string;
        auditServerId: string;
        auditVersion: string;
    }

    export interface AccountServerData {
        avatar: string;
        lv: number;
        playerName: string;
        serverId: number;
    }
}

export default LoginModel;