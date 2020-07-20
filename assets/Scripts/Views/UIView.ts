import GameModel from "../Models/GameModel";
import IView from "../Interfaces/IView";
import View from "../Decorators/View";
import CommandService from "../Services/CommandService";
import TestCommand from "../Commands/TestCommand";

const { ccclass, property } = cc._decorator;

@ccclass
@View("UIView")
export default class UIView extends IView {


    @property(cc.Label)
    label: cc.Label = null

    @property(cc.Button)
    button: cc.Button = null

    gameModel: GameModel = null

    onRegister() {
        this.gameModel = blade.model.getModel(GameModel);
        this.gameModel.on(["data1"], this.updateData, this)

        this.button.node.on(cc.Node.EventType.TOUCH_END, async () => {
            let result = await blade.popup.popNode("TestPanel", { a: 1, b: 2 })
            console.log(result)
            CommandService.instance.exec(new TestCommand(), 3, 2)
        })
    }

    onUnRegister() {
        this.gameModel.off(["data1"], this.updateData, this)
    }

    test(num: number) {
        console.log(`view func`)
        this.gameModel.data1 = num;
    }

    updateData(model, field, newval, olval) {
        console.log(`model watch data`)
        this.label.string = newval;
    }

    onTick(delta: number): void {
        // app.cmd.exec(1, delta)
    }


}