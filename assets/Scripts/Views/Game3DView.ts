import IView from "../Interfaces/IView";
import View from "../Decorators/View";


const { ccclass, property } = cc._decorator;

@ccclass
@View("Game3DView")
export default class Game3DView extends IView {
   


    onRegister() {
    }

    onTick(delta: number): void {

    }


}
