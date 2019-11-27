import IController from "../../Interfaces/IController";
import Controller from "../../Decorators/Controller";
import Command from "../../Decorators/Command";
import GameModel from "../Models/GameModel";

const { ccclass, property } = cc._decorator;

@ccclass
@Controller("GameController")
export default class GameController extends IController {

    onRegister() {
    }

    onUnRegister() {

    }

    onTick(delta: number): void {
        // console.log("逐帧运行!")
    }


    @Command(1)
    test(time: number) {
        console.log("controller func")
        app.action.do(3, time)

    }
}