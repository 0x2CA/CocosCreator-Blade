
import ControllerBase from "../../Blade/Bases/ControllerBase";
import Controller from "../../Blade/Decorators/Controller";
import NoticeEvent from "../../Blade/Decorators/NoticeEvent";
import PlatformService from "../../Blade/Services/PlatformService";
import ViewService from "../../Blade/Services/ViewService";
import GameConfig from "../Defines/GameConfig";
import GameEvent from "../Defines/GameEvent";
import LoginModel from "../Models/LoginModel";
import RoleModel from "../Models/RoleModel";
import AccountView from "../Views/Login/AccountView";
import LoginView from "../Views/Login/LoginView";
import ServerView from "../Views/Login/ServerView";
import UICtrl from "./UICtrl";

/*
 * @作者: 0x2CA
 * @创建时间: 2023-03-15
 * @最后编辑时间: 2023-03-20
 * @最后编辑者: 0x2CA
 * @描述:
 */
@Controller("LoginCtrl")
class LoginCtrl extends ControllerBase {

    protected onInitialize() {
    }

    protected onDispose() {
    }

    public openLoginView() {
        console.log("打开登录界面");
        this.openView(ViewService.ViewType.Main, LoginView);
    }

    public closeLoginView() {
        console.log("关闭登录界面");
        this.closeViewByViewType(LoginView);
    }

    public openAccountView() {
        console.log("打开账号界面");
        this.openView(ViewService.ViewType.Panel, AccountView);
    }

    public openServerView() {
        console.log("打开服务器界面");
        this.openView(ViewService.ViewType.Panel, ServerView);
    }

    // 初始化服务器列表
    public async initServerList() {
        try {
            await blade.model.get(LoginModel).requestServerList();
        } catch (error) {
            console.log("拉取服务器列表错误", error);
        }
    }

    public async login() {
        try {
            if (GameConfig.isUseSDK == true) {
                if (blade.platform.getType() == PlatformService.PlatformType.WEB) {
                    this.openAccountView();
                    return;
                }

                // 平台SDK相关登录
                await blade.platform.get().login(true);

                // 获取账号服务器列表
                await blade.model.get(LoginModel).requestAccountServerList();

                blade.notice.emit(GameEvent.SDKLoginSuccess);
            } else {
                this.openAccountView();
            }
        } catch (error) {
            console.log("登录错误", error);
        }
    }

    @NoticeEvent(GameEvent.AuthSuccess)
    private onAuthSuccess() {
        // 认证成功
        blade.model.get(RoleModel).requestGetPlayer();
    }

    @NoticeEvent(GameEvent.GetPlayerSuccess)
    private onGetPlayerSuccess() {
        // 获取玩家成功
        blade.model.get(LoginModel).requestLogin();
    }

    @NoticeEvent(GameEvent.LoginSuccess)
    private onLoginSuccess() {
        // 玩家登录成功
        blade.ctrl.get(UICtrl).open(UICtrl.ViewStatus.Main);
    }
}

namespace LoginCtrl {

}

export default LoginCtrl;