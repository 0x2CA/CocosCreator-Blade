
import ControllerBase from "../../Blade/Bases/ControllerBase";
import Controller from "../../Blade/Decorators/Controller";
import NoticeEvent from "../../Blade/Decorators/NoticeEvent";
import SocketService from "../../Blade/Services/SocketService";
import ViewService from "../../Blade/Services/ViewService";
import GameEvent from "../Defines/GameEvent";
import LoginModel from "../Models/LoginModel";
import { protobuf } from "../Protobuf/protobuf";
import CommonCtrl from "./CommonCtrl";
import UICtrl from "./UICtrl";

/*
 * @作者: 0x2CA
 * @创建时间: 2023-03-15
 * @最后编辑时间: 2023-05-11
 * @最后编辑者: 0x2CA
 * @描述:
 */
@Controller("SocketCtrl")
class SocketCtrl extends ControllerBase {

    protected onInitialize() {
        blade.socket.on(SocketService.EventType.Open, this.onOpen, this);
        blade.socket.on(SocketService.EventType.Close, this.onClose, this);
        blade.socket.on(SocketService.EventType.Error, this.onError, this);
        blade.socket.on(SocketService.EventType.ErrorCode, this.onErrorCode, this);
        blade.socket.on(SocketService.EventType.SuccessCode, this.onSuccessCode, this);
    }

    protected onDispose() {
        blade.socket.off(SocketService.EventType.Open, this.onOpen, this);
        blade.socket.off(SocketService.EventType.Close, this.onClose, this);
        blade.socket.off(SocketService.EventType.Error, this.onError, this);
        blade.socket.off(SocketService.EventType.ErrorCode, this.onErrorCode, this);
        blade.socket.off(SocketService.EventType.SuccessCode, this.onSuccessCode, this);
    }

    public async connect(url: string) {
        await blade.socket.get().connect(url);
    }

    private onOpen() {
        console.log("服务器连接成功!!");

        let commonCtrl = blade.ctrl.get(CommonCtrl);
        commonCtrl.showWait(this);

        let loginModel = blade.model.get(LoginModel);
        // 设置时间同步
        blade.timer.setSyncCallback((sync) => {
            loginModel.setSyncServerTimeCallback(sync);
            loginModel.requestServerTime();
        });
        blade.timer.syncTime();
    }

    private onClose() {
        console.log("服务器连接关闭!!");

        let commonCtrl = blade.ctrl.get(CommonCtrl);
        commonCtrl.hideWait(this);

        blade.timer.setSyncCallback(null);
        let loginModel = blade.model.get(LoginModel);
        loginModel.resetAuth();
        blade.view.closeViewByType(ViewService.ViewType.Panel);
        blade.ctrl.get(UICtrl).open(UICtrl.ViewStatus.Login);
    }

    @NoticeEvent(GameEvent.LoginSuccess)
    private onLoginSuccess() {
        let commonCtrl = blade.ctrl.get(CommonCtrl);
        commonCtrl.hideWait(this);
    }

    private onError(...args: any[]) {
        console.error("网络错误", ...args);
        blade.socket.get().disConnect();
    }

    private onErrorCode(prompt: protobuf.IS2CPrompt) {
        console.log("错误码", prompt);
        // blade.ctrl.get(CommonCtrl).openToastView({
        //     contentText: blade.locale.value("ERRORCODE_" + prompt.code, ...prompt.args)
        // });
    }

    private onSuccessCode(prompt: protobuf.IS2CPrompt) {
        console.log("成功码", prompt);
        // blade.ctrl.get(CommonCtrl).openToastView({
        //     contentText: blade.locale.value("SUCCESSCODE_" + prompt.code, ...prompt.args)
        // });
    }

}

namespace SocketCtrl {

}

export default SocketCtrl;