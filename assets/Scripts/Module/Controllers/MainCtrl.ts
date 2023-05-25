/*
 * @作者: 0x2CA
 * @创建时间: 2023-02-09
 * @最后编辑时间: 2023-03-20
 * @最后编辑者: 0x2CA
 * @描述:
 */
import ControllerBase from "../../Blade/Bases/ControllerBase";
import Controller from "../../Blade/Decorators/Controller";
import ViewService from "../../Blade/Services/ViewService";
import MainView from "../Views/Main/MainView";

@Controller("MainCtrl")
class MainCtrl extends ControllerBase {
    protected onInitialize() {
    }

    protected onDispose() {
    }

    public openMainView() {
        console.log("打开主界面");
        this.openView(ViewService.ViewType.Main, MainView);
    }

    public closeMainView() {
        console.log("关闭主界面");
        this.closeViewByViewType(MainView);
    }
}

namespace MainCtrl {

}

export default MainCtrl;