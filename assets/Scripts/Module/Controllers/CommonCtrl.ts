
import ControllerBase from "../../Blade/Bases/ControllerBase";
import Controller from "../../Blade/Decorators/Controller";
import NoticeEvent from "../../Blade/Decorators/NoticeEvent";
import ViewService from "../../Blade/Services/ViewService";
import UIWaitView from "../Views/Commons/UIWaitView";

/*
 * @作者: 0x2CA
 * @创建时间: 2023-03-15
 * @最后编辑时间: 2023-05-05
 * @最后编辑者: 0x2CA
 * @描述:
 */
@Controller("CommonCtrl")
class CommonCtrl extends ControllerBase {

    protected onInitialize() {
    }

    protected onDispose() {
    }

    private _waitView: UIWaitView = null;

    public async openWaitView() {
        if (this._waitView == null) {
            this._waitView = await this.openView(ViewService.ViewType.Top, UIWaitView);
        }

        this.checkWaitView();

        return this._waitView;
    }

    private _waitLocks: Set<object> = new Set<object>;

    public showWait(lock: object) {
        if (lock != null) {
            this._waitLocks.add(lock);
        }

        this.checkWaitView();
    }

    public hideWait(lock: object) {
        if (lock != null) {
            this._waitLocks.delete(lock);
        }

        this.checkWaitView();
    }

    private _loadViewCount = 0;

    private checkWaitView() {
        if (this._waitView != null) {
            if (this._loadViewCount == 0 && this._waitLocks.size == 0) {
                // console.log("隐藏等待界面");
                this._waitView.hideView()
            } else {
                // console.log("显示等待界面");
                this._waitView.showView();
            }
        }
    }

    @NoticeEvent(ViewService.EventType.LoadViewBefore)
    private onLoadViewBefore() {
        this._loadViewCount++;
        this.checkWaitView();
    }

    @NoticeEvent(ViewService.EventType.LoadViewAfter)
    private onLoadViewAfter() {
        this._loadViewCount--;
        this.checkWaitView();
    }

}

namespace CommonCtrl {

}

export default CommonCtrl;