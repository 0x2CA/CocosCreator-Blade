import IPopup from "../../../Interfaces/IPopup";


const { ccclass, property } = cc._decorator;

@ccclass
export default class TestPanel extends IPopup {

    applyTemplate(tpl) {
        console.log("打开参数", tpl)
    }

    async  onConfirm() {
        let result = await app.popup.popNode("TestPanel", { a: 1, b: 2 })
        console.log(result) 
    }

}