import ICommand from "../Interfaces/ICommand";
import ViewService from "../Services/ViewService";
import ControllerService from "../Services/ControllerService";

export default class TestCommand extends ICommand {
    public exec(...args: object[]) {
        ViewService.instance.orderViewById("UIView", "test", args[0]);
        ControllerService.instance.orderControllerById("UIController", "test", args[1]);
    }

    public undo() {
    }

}