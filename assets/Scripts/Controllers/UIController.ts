import IController from "../Interfaces/IController";
import ArchiveServerSDK from "../Libs/ArchiveServerSDK/ArchiveServerSDK";
import Command from "../Decorators/Command";
import Controller from "../Decorators/Controller";


const { ccclass, property } = cc._decorator;

@ccclass
@Controller("UIController")
export default class UIController extends IController {

    async  onRegister() {
        // 登录服务器
        await ArchiveServerSDK.login("leek")
        // 同步存档
        await ArchiveServerSDK.sync()
        console.log(app.timer.getTime(), new Date().getTime())

        console.log(ArchiveServerSDK.get<Array<string>>("harvestCount"))

        app.audio.playBGM("bgm")
        let list = app.config.get<Configs.arrlist>("arrlist")
        console.log(list)
        let obj = app.config.get<Configs.objList>("objList")
        console.log(obj)

        await ArchiveServerSDK.uploadUserInfo()
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