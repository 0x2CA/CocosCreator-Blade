import ViewBase from "../../../Blade/Bases/ViewBase";
import ClickEvent from "../../../Blade/Decorators/ClickEvent";
import NoticeEvent from "../../../Blade/Decorators/NoticeEvent";
import View from "../../../Blade/Decorators/View";
import NodeHelper from "../../../Blade/Helpers/NodeHelper";
import StringHelper from "../../../Blade/Helpers/StringHelper";
import Tween from "../../../Blade/Libs/Tween/Tween";
import PlatformService from "../../../Blade/Services/PlatformService";
import LoginCtrl from "../../Controllers/LoginCtrl";
import SocketCtrl from "../../Controllers/SocketCtrl";
import GameConfig from "../../Defines/GameConfig";
import GameEvent from "../../Defines/GameEvent";
import LoginModel from "../../Models/LoginModel";

const { ccclass, property } = cc._decorator;

/*
 * @作者: 0x2CA
 * @创建时间: 2023-03-15
 * @最后编辑时间: 2023-03-20
 * @最后编辑者: 0x2CA
 * @描述:
 */
@ccclass
@View("LoginView")
export default class LoginView extends ViewBase {

    @property(cc.Sprite)
    private backGround: cc.Sprite = null;

    @property(cc.Node)
    private waitTips: cc.Node = null;

    @property(cc.Node)
    @ClickEvent()
    private startGame: cc.Node = null;

    @property(cc.Node)
    @ClickEvent()
    private server: cc.Node = null;

    @property(cc.Label)
    private serverName: cc.Label = null;

    @property(cc.Label)
    @ClickEvent()
    private version: cc.Label = null;

    protected onInitialize() {
        this.node.parent = NodeHelper.getMainLayer();

        this.waitTips.active = true;
        blade.tween.get(this.waitTips)
            .set({ angle: 0 })
            .to({ angle: -360 }, 1000)
            .setLoop(true);

        this.server.active = false;
        this.startGame.active = false;

        NodeHelper.fillSpriteByWinSize(this.backGround);

        this.version.string = GameConfig.version;
    }

    protected onDispose() {
        blade.tween.removeTweens(this.waitTips);
        blade.tween.removeTweens(this.version);
        blade.tween.removeTweens(this.version.node);
    }

    protected onShow() {
    }

    protected onHide() {
    }

    protected onRefresh() {
        this.initLogin();
    }

    private async initLogin() {
        let loginModel = blade.model.get(LoginModel);
        loginModel.resetAuth();

        let loginCtrl = blade.ctrl.get(LoginCtrl);

        await loginCtrl.initServerList();

        await loginCtrl.login();

        this.waitTips.active = false;
    }

    private initServerData(serverList: LoginModel.ServersData[]) {

        let loginModel = blade.model.get(LoginModel);

        let isNewUser = loginModel.isNewUser();

        if (GameConfig.isUseSDK && isNewUser) {
            let newServerData = loginModel.getNewestServerData();
            loginModel.selectServerData(newServerData.id);

            console.log("新用户直接选择最新服务器");

            let userId = loginModel.getUserId();
            if (userId != null && userId != "") {
                this.onStartGame();
            }
        } else {
            let archive = blade.platform.getArchive();

            let defaultServerId = archive.get(LoginModel.SERVERID) || serverList[0].id;

            for (let index = 0; index < serverList.length; index++) {
                const serverData = serverList[index];
                if (serverData.id == defaultServerId) {
                    loginModel.selectServerData(serverData.id);
                    return;
                }
            }

            loginModel.selectServerData(serverList[0].id);
        }
    }

    @NoticeEvent(GameEvent.SelectServer)
    private onSelectServer() {
        let loginModel = blade.model.get(LoginModel);

        let serverData = loginModel.getCurrentServerData();

        console.log("当前服务器", serverData);

        if (serverData != null) {
            this.serverName.string = serverData.name;
            this.server.active = true;
        } else {
            this.server.active = false;
        }
    }

    @NoticeEvent(GameEvent.SDKLoginSuccess)
    private onSDKLoginSuccess() {
        this.startGame.active = true;

        let loginModel = blade.model.get(LoginModel);

        let serverList = loginModel.getServerList();
        if (serverList == null || serverList.length == 0) {
            console.log("服务器列表为空!!");
            return;
        }

        this.initServerData(serverList);
    }

    private onStartGame() {
        let loginModel = blade.model.get(LoginModel);

        let serverList = loginModel.getServerList();
        if (serverList == null || serverList.length == 0) {
            console.log("服务器列表为空!!");
            loginModel.requestServerList();
            return;
        }

        if (GameConfig.isUseSDK == true && blade.platform.getType() != PlatformService.PlatformType.WEB) {
            let userId = loginModel.getUserId();
            if (userId == null || userId == "") {
                console.log("SDK 未登陆!!");
                return;
            }
        }

        let serverData = loginModel.getCurrentServerData();
        let secretState = loginModel.getSecretState();

        if (serverData.state == 2 && secretState == false) {
            console.log("当前服务器处于维护状态!!");
            return;
        }

        this.connectSocket();
    }

    private connectSocket() {
        let loginModel = blade.model.get(LoginModel);

        let ip = loginModel.getSocketIp();
        let port = loginModel.getSocketPort();

        if (ip == null || port == null) {
            console.log("ip或port空值!!", ip, port);
            return;
        }

        let url = "";

        if (ip.indexOf("/") >= 0) {
            url = "wss://" + ip + "/ws";
        } else {
            url = "wss://" + ip + ":" + port + "/ws";

            if (StringHelper.isValidIP(ip)) {
                url = "ws://" + ip + ":" + port + "/ws";
            }
        }

        blade.ctrl.get(SocketCtrl).connect(url);
    }

    private onServer() {
        blade.ctrl.get(LoginCtrl).openServerView();
    }

    private _touchVersionCount = 0;

    private onVersion() {
        blade.tween.removeTweens(this.version);
        blade.tween.get(this.version)
            .wait(600)
            .call(() => {
                this._touchVersionCount = 0;
            });
        this._touchVersionCount += 1;
        if (this._touchVersionCount >= 6) {
            this._touchVersionCount = 0;
            // 满足条件开启秘籍
            let loginModel = blade.model.get(LoginModel);
            loginModel.setSecreState(true);
            blade.tween.removeTweens(this.version.node);
            blade.tween.get(this.version.node)
                .set({
                    angle: 0
                })
                .to({
                    angle: -30
                }, 200, Tween.Easing.Sinusoidal.Out)
                .to({
                    angle: 30
                }, 200, Tween.Easing.Sinusoidal.Out)
                .to({
                    angle: 0
                }, 200, Tween.Easing.Sinusoidal.Out);
        }
    }

}