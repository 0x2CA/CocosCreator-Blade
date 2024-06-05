
const { ccclass, property } = cc._decorator;

@ccclass
export default class RichTextEvent extends cc.Component {
    public registerCallback(name: string, callback: (event: cc.Event.EventTouch, param: string) => void, target: object = null) {
        if (target == null) {
            this[name] = callback;
        } else {
            this[name] = callback.bind(target);
        }
    }
}
