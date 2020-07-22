import IController from "../../Blade/Interfaces/IController";
import Controller from "../../Blade/Decorators/Controller";
import ArchiveServerSDK from "../../Blade/Libs/ArchiveServerSDK/ArchiveServerSDK";


const { ccclass, property } = cc._decorator;

@ccclass
@Controller("UIController")
export default class UIController extends IController {

    async  onRegister() {
        // 登录服务器
        await ArchiveServerSDK.login("leek")
        // 同步存档
        await ArchiveServerSDK.sync()
        console.log(blade.timer.getTime(), new Date().getTime())

        console.log(ArchiveServerSDK.get<Array<string>>("harvestCount"))

        blade.audio.playBGM("bgm")
        let list = blade.config.get<Configs.arrlist>("arrlist")
        console.log(list)
        let obj = blade.config.get<Configs.objList>("objList")
        console.log(obj)

        await ArchiveServerSDK.uploadUserInfo()
    }

    onUnRegister() {

    }

    onTick(delta: number): void {
        // console.log("逐帧运行!")
    }


    test(time: number) {
        console.log("controller func")
    }
}