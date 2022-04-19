
import ControllerBase from "../../Blade/Bases/ControllerBase";
import Controller from "../../Blade/Decorators/Controller";
import ViewService from "../../Blade/Services/ViewService";
import MainView from "../Views/Main/MainView";

@Controller("MainController")
export default class MainController extends ControllerBase {
    public onInitialize() {
    }

    public onDispose() {
    }

    public openMainView() {
        ViewService.getInstance().openView(ViewService.ViewType.Main, MainView);
    }

}
