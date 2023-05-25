import ViewBase from "../../Bases/ViewBase";

const { ccclass, property, menu, disallowMultiple, requireComponent } = cc._decorator;


enum LayerSort {
    None,
    Positive,
    Negative,
}

/**
 * 通用 ListView 组件.
 * 能够显示垂直/横向ListView
 */
@ccclass
@menu("UI 组件/ListView")
@disallowMultiple
@requireComponent(cc.ScrollView)
class ListView extends cc.Component {

    @property(cc.Prefab)
    private itemTemplate: cc.Prefab = null;

    @property
    private spacing: number = 1;

    // 比可见元素多缓存3个, 缓存越多,快速滑动越流畅,但同时初始化越慢.
    @property
    private spawnCount: number = 2;

    //头尾空白
    @property
    private paddingHead: number = 0;

    @property
    private paddingEnd: number = 0;

    @property({
        type: cc.Enum(LayerSort)
    })
    private layerSort: LayerSort = LayerSort.None;

    private _scrollView: cc.ScrollView = null;

    private _content: cc.Node = null;

    private _datas: Array<any> = [];

    private readonly _useItems: cc.Node[] = [];

    private readonly _pools: cc.Node[] = [];

    // 记录当前填充在树上的索引. 用来快速查找哪些位置缺少item了.
    private readonly _filledIds: { [key: number]: number } = {};

    private _horizontal: boolean = false;

    // 初始时即计算item的高度.因为布局时要用到.
    private _itemHeight: number = 1;

    private _itemWidth: number = 1;

    private _itemsVisible: number = 1;

    private _lastStartIndex: number = -1;

    private _scrollTopNotifyed: boolean = false;
    private _scrollBottomNotifyed: boolean = false;

    private _pullDownCallback: () => void = null;
    private _pullUpCallback: () => void = null;

    public onLoad() {

        this.initSize();

        this.adjustEvent();

        if (this._content) {
            this.notifyUpdate();
        }

        blade.ticker.onTick(this.onTick, this);
    }

    protected onDestroy(): void {
        blade.ticker.offTick(this.onTick, this);
    }

    protected onDisable(): void {
        if (this.isValid && this.node.isValid && cc.isValid(this, true) && cc.isValid(this.node, true)) {
            return;
        }

        this.clear();
    }

    protected update(dt: number): void {
        if (this.isValid && this.node.isValid && cc.isValid(this, true) && cc.isValid(this.node, true)) {
            return;
        }

        this.clear();
    }

    protected lateUpdate(dt: number): void {
        if (this.isValid && cc.isValid(this, true) && cc.isValid(this.node, true)) {
            return;
        }

        this.clear();
    }

    private clear() {
        this.recycleAll();

        while (this._pools.length > 0) {
            let itemOne = this._pools.shift();
            itemOne.destroy();
        }
    }

    private initSize() {
        this._scrollView = this.node.getComponent(cc.ScrollView);
        if (this._scrollView) {
            this._content = this._scrollView.content;
            this._horizontal = this._scrollView.horizontal;
            if (this._horizontal) {
                this._scrollView.vertical = false;
                this._content.anchorX = 0;
                this._content.anchorY = 0.5;
                this._content.x =
                    0 - this._content.getParent().width * this._content.getParent().anchorX;
            } else {
                this._scrollView.vertical = true;
                this._content.anchorX = 0.5;
                this._content.anchorY = 1;
                this._content.y = this._content.getParent().height * this._content.getParent().anchorY;
            }
        } else {
            console.error("ListView need a scrollView for showing.");
        }

        if (this.itemTemplate == null) {
            return;
        }

        let itemOne = this._pools.shift()
        if (itemOne == null) {
            itemOne = cc.instantiate(this.itemTemplate);
            let view = itemOne.getComponent(ViewBase);
            if (view == null) {
                console.error("无法找到ViewBase来更新");
            } else {
                let onRefresh = Reflect.get(view, "onRefresh");
                (view as any).onRefresh = (data) => {
                    if (data != null) {
                        onRefresh.call(view, data);
                    }
                };
            }
            itemOne.parent = this._content;
            itemOne.x = 9999;
            itemOne.y = 9999;
        }
        this._pools.push(itemOne);
        this._itemHeight = itemOne.height || 10;
        this._itemWidth = itemOne.width || 10;
        this.updateAlignment(this._content);
        if (this._horizontal) {
            this._itemsVisible = Math.ceil(
                this._content.getParent().width / (this._itemWidth + this.spacing)
            );
        } else {
            this._itemsVisible = Math.ceil(
                this._content.getParent().height / (this._itemHeight + this.spacing)
            );
        }

        console.log("可见区域的item数量为:", this._itemsVisible);
    }

    /**
     * cc.Widget 更新
     * @param content
     */
    private updateAlignment(content: cc.Node) {
        let tmp = content.getParent();
        let result: Array<cc.Widget> = [];
        while (tmp && !(tmp instanceof cc.Scene)) {
            let component = tmp.getComponent(cc.Widget);
            if (component) {
                result.push(component);
            }
            tmp = tmp.getParent();
        }
        while (result.length > 0) {
            let tmp = result.pop();
            tmp.updateAlignment();
        }
    }

    public setData(data: Array<any>) {

        this._datas = data;

        if (this._datas == null) {
            console.warn("data 为空.");
            return;
        }

        if (this.itemTemplate == null) {
            console.error("Listview 未设置待显示的Item模板.");
            return;
        }

        console.log("数据", data);

        if (this._content) {
            this.notifyUpdate();
        }
    }

    public getPositionInView(item: cc.Node) {
        let worldPos = item.getParent().convertToWorldSpaceAR(item.position);
        let viewPos = this._scrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
    }

    public setPadingHead(paddingHead: number) {
        this.paddingHead = paddingHead;
    }

    public setPadingEnd(paddingEnd: number) {
        this.paddingEnd = paddingEnd;
    }

    // 数据变更了需要进行更新UI显示, 可只更新某一条.
    public notifyUpdate(updateIndex?: number[], toTop: boolean = true) {
        if (this._datas == null) {
            return;
        }

        if (this._content == null) {
            return;
        }

        if (updateIndex && updateIndex.length > 0) {
            updateIndex.forEach((i) => {
                if (this._filledIds.hasOwnProperty(i)) {
                    delete this._filledIds[i];
                }
            });
        } else {
            const keys = Object.keys(this._filledIds);
            keys.forEach((key) => {
                delete this._filledIds[key];
            });
        }
        this.recycleAll();
        if (this._horizontal) {
            this._content.width =
                this._datas.length * (this._itemWidth + this.spacing) - this.spacing + this.paddingHead + this.paddingEnd;
        } else {
            this._content.height =
                this._datas.length * (this._itemHeight + this.spacing) - this.spacing + this.paddingHead + this.paddingEnd; // get total content height
        }
        if (toTop) {
            this.scrollToTop(0);
        }
        this._lastStartIndex = -1;
        this.updateView(0);
    }

    public toIndex(index: number, align: number = 0.5, time: number = 0.3) {
        if (this._horizontal) {
            this._scrollView.scrollToOffset(cc.v2(this._itemWidth * align + index * (this._itemWidth + this.spacing) + this.paddingHead - this._content.getParent().width * align, 0), time);
        } else {
            this._scrollView.scrollToOffset(cc.v2(0, this._itemHeight * align + index * (this._itemHeight + this.spacing) + this.paddingHead - this._content.getParent().height * align), time);
        }
    }

    public toNext(align: number = 0.5, time: number = 0.3) {

        let index = this.getIndex(align);

        let nextIndex = index + 1;
        if (nextIndex >= this._datas.length) {
            nextIndex = this._datas.length - 1;
        }

        this.toIndex(nextIndex, align, time);
    }

    public toPre(align: number = 0.5, time: number = 0.3) {
        let index = this.getIndex(align);
        let preIndex = index - 1;
        if (preIndex < 0) {
            preIndex = 0;
        }
        this.toIndex(preIndex, align, time);
    }

    public scrollToTop(time: number = 1) {
        this._scrollView.scrollToTop(time);
    }

    public scrollToBottom(time: number = 1) {
        this._scrollView.scrollToBottom(time);
    }

    public scrollToLeft(time: number = 1) {
        this._scrollView.scrollToLeft(time);
    }

    public scrollToRight(time: number = 1) {
        this._scrollView.scrollToRight(time);
    }

    public setVertical(isVertical: boolean) {
        this._scrollView.vertical = isVertical;
    }

    // 下拉事件.
    public pullDown(callback: () => void, this$: any) {
        this._pullDownCallback = callback.bind(this$);
    }

    // 上拉事件.
    public pullUp(callback: () => void, this$: any) {
        this._pullUpCallback = callback.bind(this$);
    }

    public setItemTemplate(item: cc.Prefab) {
        if (this._content != null) {
            this.clear();
        }
        this.itemTemplate = item;
        this.initSize();
    }

    protected onTick(detale: number) {
        const startIndex = this.checkNeedUpdate();
        if (startIndex >= 0 && startIndex < this._datas.length) {
            if (startIndex < this._itemStartIndex + 1 || startIndex + this._itemsVisible > this._itemEndIndex - 1) {
                this.updateView(startIndex);
            }
        }
    }

    // 向某位置添加一个item.
    private _layoutVertical(child: cc.Node, posIndex: number) {
        child.parent = this._content;
        // 增加一个tag 属性用来存储child的位置索引.
        child["_tag"] = posIndex;
        this._filledIds[posIndex] = posIndex;
        child.setPosition(0, -child.height * (0.5 + posIndex) - this.spacing * posIndex - this.paddingHead);
    }

    // 向某位置添加一个item.
    private _layoutHorizontal(child: cc.Node, posIndex: number) {
        child.parent = this._content;
        // 增加一个tag 属性用来存储child的位置索引.
        child["_tag"] = posIndex;
        this._filledIds[posIndex] = posIndex;
        child.setPosition(child.width * (child.anchorX + posIndex) + this.spacing * posIndex + this.paddingHead, 0);
    }

    // 获取可回收item
    private getRecycleItems(beginIndex: number, endIndex: number): cc.Node[] {
        const children = this._useItems;
        const recycles = [];
        children.forEach((item) => {
            if (item["_tag"] < beginIndex || item["_tag"] > endIndex) {
                recycles.push(item);
                delete this._filledIds[item["_tag"]];
            }
        });
        return recycles;
    }

    private recycleAll() {
        while (this._useItems.length > 0) {
            const children = this._useItems.shift();
            children.x = 9999;
            children.y = 9999;
            this._pools.push(children);
        }
    }

    private _itemStartIndex: number = 0;
    private _itemEndIndex: number = 0;

    // 填充View.
    private updateView(startIndex) {
        // 比实际元素多3个.
        let itemEndIndex = startIndex + this._itemsVisible + (this.spawnCount || 2);
        let itemStartIndex = startIndex - (this.spawnCount || 2);

        const totalCount = this._datas.length;

        if (itemStartIndex >= totalCount) {
            return;
        }

        if (itemStartIndex < 0) {
            itemStartIndex = 0;
        }

        if (itemEndIndex > totalCount) {
            itemEndIndex = totalCount;
            if (itemStartIndex > 0 && !this._scrollBottomNotifyed) {
                this.notifyScrollToBottom();
                this._scrollBottomNotifyed = true;
            }
        } else {
            this._scrollBottomNotifyed = false;
        }

        this._itemStartIndex = itemStartIndex;
        this._itemEndIndex = itemEndIndex;

        // 回收需要回收的元素位置
        const recyles = this.getRecycleItems(itemStartIndex, itemEndIndex);
        recyles.forEach((item) => {
            this._useItems.splice(this._useItems.indexOf(item), 1);
            item.x = 9999;
            item.y = 9999;
            this._pools.push(item);
        });

        // 查找需要更新的元素位置.
        const updates = this.findUpdateIndex(itemStartIndex, itemEndIndex);

        // 更新相应位置.
        for (let index of updates) {
            let itemOne = this._pools.shift();
            let view: ViewBase = null;
            if (itemOne == null) {
                itemOne = cc.instantiate(this.itemTemplate);
                view = itemOne.getComponent(ViewBase);
                if (view == null) {
                    console.error("无法找到ViewBase来更新");
                    continue;
                }
                let onRefresh = Reflect.get(view, "onRefresh");
                (view as any).onRefresh = (data) => {
                    if (data != null) {
                        onRefresh.call(view, data);
                    }
                };
                itemOne.parent = this._content;
            }

            this._useItems.push(itemOne);

            let child = itemOne;

            view = itemOne.getComponent(ViewBase);
            if (view == null) {
                console.error("无法找到ViewBase来更新");
                continue;
            }

            view.refresh(this._datas[index]);

            this._horizontal
                ? this._layoutHorizontal(child, index)
                : this._layoutVertical(child, index);
        }

        if (updates.length > 0 && this.layerSort != LayerSort.None) {
            this._useItems.sort((a, b) => {
                if (this.layerSort == LayerSort.Positive) {
                    return a["_tag"] - b["_tag"];
                } else {
                    return b["_tag"] - a["_tag"];
                }
            });

            for (let index = 0; index < this._useItems.length; index++) {
                const item = this._useItems[index];
                item.setSiblingIndex(index);
            }
        }
    }

    /**
     * 获取当前索引
     * @returns
     */
    public getIndex(align: number = 0, isClamp: boolean = true) {

        if (this._datas == null) {
            return -1;
        }

        let scrollOffset = this._scrollView.getScrollOffset();
        let scroll = 0;
        let index = 0;

        if (this._horizontal) {
            scroll = -scrollOffset.x + this._content.getParent().width * align - this._itemWidth * align - this.paddingHead;
            index = scroll / (this._itemWidth + this.spacing)
        } else {
            scroll = scrollOffset.y + this._content.getParent().height * align - this._itemHeight * align - this.paddingHead;
            index = scroll / (this._itemHeight + this.spacing)
        }

        if (align == 0) {
            if (index % 1 >= 0.9999) {
                index = Math.ceil(index);
            } else {
                index = Math.floor(index);
            }
        } else if (align == 1) {
            if (index % 1 <= 0.0001) {
                index = Math.floor(index);
            } else {
                index = Math.ceil(index);
            }
        } else {
            index = Math.round(index);
        }

        if (isClamp) {
            if (index < 0) {
                index = 0;
            }

            if (index >= this._datas.length) {
                index = this._datas.length - 1;
            }
        }

        return index;
    }

    // 检测是否需要更新UI.
    private checkNeedUpdate(): number {
        if (this._datas == null) {
            return -1;
        }

        let itemStartIndex = this.getIndex(0, false);

        if (itemStartIndex < 0 && !this._scrollTopNotifyed) {
            this.notifyScrollToTop();
            this._scrollTopNotifyed = true;
            return 0;
        }

        // 防止重复触发topNotify.仅当首item不可见后才能再次触发
        if (itemStartIndex > 0) {
            this._scrollTopNotifyed = false;
        }

        if (this._lastStartIndex != itemStartIndex) {
            this._lastStartIndex = itemStartIndex;
            return itemStartIndex;
        }

        return -1;
    }

    // 查找需要补充的元素索引.
    private findUpdateIndex(itemStartIndex: number, itemEndIndex: number): number[] {
        const d = [];
        for (let i = itemStartIndex; i < itemEndIndex; i++) {
            if (this._filledIds.hasOwnProperty(i)) {
                continue;
            }
            d.push(i);
        }
        return d;
    }

    private notifyScrollToTop() {
        if (!this._datas || this._datas.length <= 0) {
            return;
        }
        if (this._pullDownCallback) {
            this._pullDownCallback();
        }
    }

    private notifyScrollToBottom() {
        if (!this._datas || this._datas.length <= 0) {
            return;
        }
        if (this._pullUpCallback) {
            this._pullUpCallback();
        }
    }

    private adjustEvent() {
        this._content.on(
            cc.Node.EventType.TOUCH_END,
            () => {
                this._scrollTopNotifyed = false;
                this._scrollBottomNotifyed = false;
            },
            this
        );
        this._content.on(
            cc.Node.EventType.TOUCH_CANCEL,
            () => {
                this._scrollTopNotifyed = false;
                this._scrollBottomNotifyed = false;
            },
            this
        );
    }
}

namespace ListView {
}

export default ListView;
