

import ViewBase from "../../../Blade/Bases/ViewBase";
import View from "../../../Blade/Decorators/View";
import LoginModel from "../../Models/LoginModel";
import ServerItemView from "./ServerItemView";

const { ccclass, property } = cc._decorator;

/*
 * @作者: 0x2CA
 * @创建时间: 2023-03-15
 * @最后编辑时间: 2023-04-17
 * @最后编辑者: 0x2CA
 * @描述:
 */
@ccclass
@View("ServerRowView")
export default class ServerRowView extends ViewBase<LoginModel.ServersData[]> {
    @property(ServerItemView)
    private server1: ServerItemView = null;

    @property(ServerItemView)
    private server2: ServerItemView = null;

    protected onInitialize() {
    }

    protected onDispose() {
    }

    protected onShow() {
    }

    protected onHide() {
    }

    protected onRefresh(data: LoginModel.ServersData[]) {
        this.server1.refresh(data[0]);
        this.server2.refresh(data[1]);
    }

}