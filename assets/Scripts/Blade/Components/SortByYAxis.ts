const { ccclass, property } = cc._decorator;

@ccclass
export default class SortByYAxis extends cc.Component {

    update(dt) {
        this.node.children.sort((a, b) => {
            return b.y - a.y;
        });
    }
}
