

import ViewBase from "../../../Blade/Bases/ViewBase";
import ClickEvent from "../../../Blade/Decorators/ClickEvent";
import View from "../../../Blade/Decorators/View";
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
@View("ServerItemView")
export default class ServerItemView extends ViewBase<LoginModel.ServersData> {

    @property(cc.Label)
    private serverName: cc.Label = null;

    @property(cc.Node)
    @ClickEvent()
    private serverBackGround: cc.Node = null;

    protected onInitialize() {
    }

    protected onDispose() {
    }

    protected onShow() {
    }

    protected onHide() {
    }

    protected onRefresh(data: LoginModel.ServersData) {
        if (data != null) {
            this.showView();
            this.serverName.string = data.name
        } else {
            this.hideView();
        }
    }

    protected onServerBackGround() {
        let loginModel = blade.model.get(LoginModel);

        let serversData = this.getArgs();

        if (serversData != null) {
            loginModel.selectServerData(serversData.id);
        }
    }

}