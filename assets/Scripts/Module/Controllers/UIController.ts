import IController from "../../Blade/Interfaces/IController";
import Controller from "../../Blade/Decorators/Controller";


const { ccclass, property } = cc._decorator;

@ccclass
@Controller("UIController")
export default class UIController extends IController {

    async onRegister() {


        blade.audio.playBGM("bgm")
        let list = blade.config.get<Configs.arrlist>("arrlist")
        console.log(list)
        let obj = blade.config.get<Configs.objList>("objList")
        console.log(obj)

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
