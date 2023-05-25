/*
 * @作者: 0x2CA
 * @创建时间: 2023-02-09
 * @最后编辑时间: 2023-03-20
 * @最后编辑者: 0x2CA
 * @描述:
 */
import ControllerBase from "../../Blade/Bases/ControllerBase";
import Controller from "../../Blade/Decorators/Controller";
import CommonCtrl from "./CommonCtrl";
import LoadingCtrl from "./LoadingCtrl";
import LoginCtrl from "./LoginCtrl";
import MainCtrl from "./MainCtrl";

@Controller("UICtrl")
class UICtrl extends ControllerBase {

    protected onInitialize() {
        this.parseUrl();
    }

    protected onDispose() {
    }

    private async runGame() {
        //  优先加载等待界面
        await blade.ctrl.get(CommonCtrl).openWaitView();
        await this.open(UICtrl.ViewStatus.Loading);
    }

    private _viewStatus: UICtrl.ViewStatus = UICtrl.ViewStatus.None;

    public async open(status: UICtrl.ViewStatus) {
        if (this._viewStatus != status) {
            switch (status) {
                case UICtrl.ViewStatus.Loading:
                    blade.ctrl.get(LoadingCtrl).openLoadingView();
                    break;
                case UICtrl.ViewStatus.Login:
                    blade.ctrl.get(LoginCtrl).openLoginView();
                    break;
                case UICtrl.ViewStatus.Main:
                    blade.ctrl.get(MainCtrl).openMainView();
                    break;
                default:
                    break;
            }

            this.close();

            this._viewStatus = status;
        }
    }

    private close() {
        switch (this._viewStatus) {
            case UICtrl.ViewStatus.Loading:
                blade.ctrl.get(LoadingCtrl).closeLoadingView();
                break;
            case UICtrl.ViewStatus.Login:
                blade.ctrl.get(LoginCtrl).closeLoginView();
                break;
            case UICtrl.ViewStatus.Main:
                blade.ctrl.get(MainCtrl).closeMainView();
                break;
            default:
                break;
        }

        this._viewStatus = UICtrl.ViewStatus.None;
    }

    /**
     * 解析地址参数
     */
    private parseUrl() {
        console.warn(`=========================
地址栏参数说明：
reset: 重置存档 (1:重置)
time: 时间倍数
=========================`);

        const urlParam = blade.platform.get().getLaunchOptions();

        console.log("启动参数", urlParam);

        // 地址栏附带启动参数检查
        // 存档重置
        if (urlParam["reset"] === "1") {
            blade.platform.getArchive().clear();
        }

        try {
            const timeScale = parseFloat(urlParam["time"]);
            blade.ticker.timeScale = timeScale;
        } catch (e) { }
    }

}

namespace UICtrl {
    export enum ViewStatus {
        None,
        Loading,
        Login,
        Main
    }
}

export default UICtrl;