import IController from "../../Interfaces/IController";
import Controller from "../../Decorators/Controller";
import Command from "../../Decorators/Command";
import GameModel from "../Models/GameModel";
import ArchiveServerSDK from "../../Libs/ArchiveServerSDK/ArchiveServerSDK";

const { ccclass, property } = cc._decorator;

@ccclass
@Controller("GameController")
export default class GameController extends IController {

    async  onRegister() {
        // 登录服务器
        await ArchiveServerSDK.login("leek")
        // 同步存档
        await ArchiveServerSDK.sync()
        console.log(app.timer.getTime(), new Date().getTime())

        console.log(ArchiveServerSDK.get<Array<string>>("harvestCount"))

        app.audio.playBGM("bgm")
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