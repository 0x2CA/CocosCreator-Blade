import Command from "../../Decorators/Command";
import GameModel from "../Models/GameModel";
import IView from "../../Interfaces/IView";
import View from "../../Decorators/View";
import Action from "../../Decorators/Action";

const { ccclass, property } = cc._decorator;

@ccclass
@View("GameView")
export default class GameView extends IView {


    @property(cc.Label)
    label: cc.Label = null

    gameModel: GameModel = null

    onRegister() {
        this.gameModel = app.model.getModel(GameModel);
        this.gameModel.on(["data1"], this.updateData, this)

        this.label.node.on(cc.Node.EventType.TOUCH_END, async () => {
            let result = await app.popup.popNode("TestPanel", { a: 1, b: 2 })
            console.log(result)
        })
    }

    onUnRegister() {
        this.gameModel.off(["data1"], this.updateData, this)
    }

    @Action(3)
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