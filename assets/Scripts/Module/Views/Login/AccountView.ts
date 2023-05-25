

import ViewBase from "../../../Blade/Bases/ViewBase";
import ClickEvent from "../../../Blade/Decorators/ClickEvent";
import View from "../../../Blade/Decorators/View";
import NodeHelper from "../../../Blade/Helpers/NodeHelper";
import GameEvent from "../../Defines/GameEvent";
import LoginModel from "../../Models/LoginModel";

const { ccclass, property } = cc._decorator;

/*
 * @作者: 0x2CA
 * @创建时间: 2023-03-15
 * @最后编辑时间: 2023-04-17
 * @最后编辑者: 0x2CA
 * @描述:
 */
@ccclass
@View("AccountView")
export default class AccountView extends ViewBase {

    @property(cc.EditBox)
    private accountInput: cc.EditBox = null;

    @property(cc.EditBox)
    private passwdInput: cc.EditBox = null;

    @property(cc.Node)
    @ClickEvent()
    private confirm: cc.Node = null;

    protected onInitialize() {
        this.node.parent = NodeHelper.getUILayer();

    }

    protected onDispose() {
    }

    protected onShow() {
    }

    protected onHide() {
    }

    protected onRefresh() {
        let archive = blade.platform.getArchive();
        let identityId = archive.get<string>(LoginModel.IDENTITYID);
        if (identityId != null && identityId != "") {
            this.accountInput.string = identityId;
        }
    }

    private onConfirm() {
        if (this.accountInput.string == "") {
            console.log("请输入账号!!");
            return;
        }

        console.log("确认账号", this.accountInput.string, this.passwdInput.string);

        let loginModel = blade.model.get(LoginModel);

        loginModel.setIdentityId(this.accountInput.string);

        blade.notice.emit(GameEvent.SDKLoginSuccess);

        this.close();
    }



}