import IPopup from "../../../Interfaces/IPopup";


const { ccclass, property } = cc._decorator;

@ccclass
export default class TestPanel extends IPopup{

    apply(tpl){
        console.log("打开参数",tpl)
    }

}