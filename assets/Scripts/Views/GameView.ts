import Command from "../Decorators/Command";
import GameModel from "../Models/GameModel";
import IView from "../Interfaces/IView";
import View from "../Decorators/View";
import Action from "../Decorators/Action";

const { ccclass, property } = cc._decorator;

@ccclass
@View("GameView")
export default class GameView extends IView {


    @property(cc.Label)
    label: cc.Label = null

    @property(cc.Button)
    button: cc.Button = null

    @property(cc.Camera)
    camera: cc.Camera

    @property(cc.Node)
    touch: cc.Node

    gameModel: GameModel = null

    onRegister() {
        this.gameModel = app.model.getModel(GameModel);
        this.gameModel.on(["data1"], this.updateData, this)

        this.button.node.on(cc.Node.EventType.TOUCH_END, async () => {
            let result = await app.popup.popNode("TestPanel", { a: 1, b: 2 })
            console.log(result)
        })

        this.touch.on(cc.Node.EventType.TOUCH_END, async (event: cc.Event.EventTouch) => {
            let ray = this.camera.getRay(event.getLocation())
            let results = (cc as any).geomUtils.intersect.raycast(cc.director.getScene(), ray);
            for (let i = 0; i < results.length; i++) {
                console.log(results[i].node.name)
            }
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