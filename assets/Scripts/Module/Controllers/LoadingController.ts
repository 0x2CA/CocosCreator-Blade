
import ControllerBase from "../../Blade/Bases/ControllerBase";
import Controller from "../../Blade/Decorators/Controller";
import PromiseHelper from "../../Blade/Helpers/PromiseHelper";
import ViewService from "../../Blade/Services/ViewService";
import LoadingView from "../Views/Loading/LoadingView";

@Controller("LoadingController")
export default class LoadingController extends ControllerBase {

    public onInitialize() {
    }

    public onDispose() {
    }

    public openLoadingView() {
        ViewService.getInstance().openView(ViewService.ViewType.Main, LoadingView);
    }

    public async preloadAsset(callback: Function) {
        await PromiseHelper.wait(5);
    }

}
