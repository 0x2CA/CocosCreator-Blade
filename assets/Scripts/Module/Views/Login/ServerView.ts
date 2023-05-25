import ViewBase from "../../../Blade/Bases/ViewBase";
import ClickEvent from "../../../Blade/Decorators/ClickEvent";
import NoticeEvent from "../../../Blade/Decorators/NoticeEvent";
import View from "../../../Blade/Decorators/View";
import NodeHelper from "../../../Blade/Helpers/NodeHelper";
import ListView from "../../../Blade/Libs/ListView/ListView";
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
@View("ServerView")
export default class ServerView extends ViewBase {

    @property(cc.Node)
    @ClickEvent()
    private closeBtn: cc.Node = null;

    @property(ListView)
    private listView: ListView = null;

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
        let loginModel = blade.model.get(LoginModel);
        let serverList = loginModel.getServerList();

        let listViewData: LoginModel.ServersData[][] = [];

        for (let index = 0; index < serverList.length; index++) {
            const serverData = serverList[index];
            if (listViewData[listViewData.length - 1] == null || listViewData[listViewData.length - 1].length == 2) {
                listViewData.push([]);
            }
            listViewData[listViewData.length - 1].push(serverData);
        }

        this.listView.setData(listViewData);
    }

    @NoticeEvent(GameEvent.SelectServer)
    private onCloseBtn() {
        this.close();
    }



}