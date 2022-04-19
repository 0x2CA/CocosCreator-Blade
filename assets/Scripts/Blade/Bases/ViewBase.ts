import AssetService from "../Services/AssetService";
import ViewService from "../Services/ViewService";

const { ccclass, property } = cc._decorator;

@ccclass
export default abstract class ViewBase extends cc.Component {

    private subViews: ViewBase[] = [];

    private parentView: ViewBase = null;

    private isDispose: boolean = false;

    /**
    * 供外部调用视图内的方法
    * @param funcName
    * @param args
    */
    public order(funcName: string, ...args: any[]): any {
        if (typeof this[funcName] === 'function') {
            return this[funcName].call(this, ...args);
        }
        else {
            cc.error(`调用${(this as any).alias}不存在的方法${funcName}`);
        }
    }

    protected onLoad(): void {
        // if (this.onInitialize) {
        //     this.onInitialize();
        // }
    }

    protected onDestroy(): void {
        // if (this.onDisable) {
        //     this.onDisable();
        // }
    }

    /**
    * 初始化函数，供重载
    */
    public abstract onInitialize();

    /**
    * 销毁函数，供重载
    */
    public abstract onDispose();

    public close() {
        ViewService.getInstance().closeView(this);
    }

    private closeView() {
        if (this.isDispose == false) {

            this.closeAllSubView();

            if (this.onDispose) {
                this.onDispose();
            }

            this.isValid = true;

            this.node.destroy();

            AssetService.getInstance().unloadAsset((this as any).alias + ".prefab");
        }
    }

    private closeAllSubView() {
        for (let index = 0; index < this.subViews.length; index++) {
            const view = this.subViews[index];
            view.closeView();
        }
        this.subViews = [];
    }

    private closeSubView(view: ViewBase) {
        let index = this.subViews.indexOf(view)
        if (index >= 0) {
            view.closeView();
            this.subViews.splice(index, 1);
        }
    }

    public async openSubView<T extends ViewBase>(viewType: new () => T, ...args: any[]) {
        let prefab = await AssetService.getInstance().loadAssetAsync((viewType.prototype as any).alias + ".prefab", cc.Prefab) as cc.Prefab;
        if (this.isDispose == false) {
            AssetService.getInstance().unloadAsset((viewType.prototype as any).alias + ".prefab");
            throw new Error("父界面已经销毁");
            return;
        }

        let node = cc.instantiate(prefab);
        let view = node.getComponent(viewType);

        if (view == null) {
            view = node.addComponent(viewType);
        }

        view.parentView = this;

        this.subViews.push(view);

        if (view.onInitialize) {
            view.onInitialize(...args);
        }

        return view;
    }
}
