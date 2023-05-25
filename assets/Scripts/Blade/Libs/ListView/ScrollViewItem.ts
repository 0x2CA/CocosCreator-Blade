import ViewBase from "../../Bases/ViewBase";

const {ccclass, property} = cc._decorator;
@ccclass
export default abstract class ScrollViewItem extends ViewBase
{
    // constructor()
    // {
    //     super();
    // }

    onInit(key:string)
    {
        // console.log("item初如化");
    }

    onUnInit(key:string)
    {
        // console.log("item析构");
    }

    onSetData(key:string, data:any, index:number, is_measure:boolean):[number, number]
    {
        // console.log("item设置数据");
        return [0, 0];
    }

    onSetSelect(key:string, is_select:boolean, index:number)
    {
        // console.log("item选中状态改变");
    }

    onRecycle(key:string, data:any, is_measure:boolean)
    {
        // console.log("item被回收");
    }

    onSelected(key:string, data:any, index:number)
    {
        // console.log("item被选中");
    }

    onTouchEnd(key:string, data:any, touchPos:cc.Vec2, index:number)
    {
        // console.log("item非滑动状态下被点击");
    }

    onBecameInvisible()
    {
        // console.log("item从父节点移除或不可见");
    }

    // get top()
    // {
    //     return this.node.y + (1 - this.node.anchorY) * this.node.height;
    // }

    // get bottom()
    // {
    //     return this.node.y - this.node.anchorY * this.node.height;
    // }

    // get left()
    // {
    //     return this.node.x - this.node.anchorX * this.node.width;
    // }

    // get right()
    // {
    //     return this.node.x + (1 - this.node.anchorX) * this.node.width;
    // }

    // set top(value:number)
    // {
    //     this.node.y = value - (1 - this.node.anchorY) * this.node.height;
    // }

    // set bottom(value:number)
    // {
    //     this.node.y = value + this.node.anchorY * this.node.height;
    // }

    // set left(value:number)
    // {
    //     this.node.x = value + this.node.anchorX * this.node.width;
    // }

    // set right(value:number)
    // {
    //     this.node.x = value - (1 - this.node.anchorX) * this.node.width;
    // }

    setLeftTop(left:number, top:number)
    {
        this.node.x = left + this.node.anchorX * this.node.width;
        this.node.y = top - (1 - this.node.anchorY) * this.node.height;
    }
}