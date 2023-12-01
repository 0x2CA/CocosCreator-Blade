const { ccclass, property } = cc._decorator;

type GenericOf<V> = V extends ViewBase<infer A> ? A : never;

/**
 * 页面信息
 */
class ViewInfo {

    public isOpen: boolean = false;

    public parentView: ViewBase = null;

    public subViews: ViewBase[] = [];

    public defaultViews: ViewBase[] = [];

    public status: ViewBase.Status = ViewBase.Status.Dispose;

    public loadProxy: AssetService.AssetLoadProxy = new AssetService.AssetLoadProxy();

    public args: object = null;
}

let GlobalViewInfo: Map<ViewBase, ViewInfo> = new Map<ViewBase, ViewInfo>();

@ccclass
abstract class ViewBase<A = any, P extends ViewBase = any> extends cc.Component {

    private _nodeEvents: Map<string, Map<string, Set<string>>>;

    /**
     * 获取别名
     * @returns
     */
    public getAlias(): string {
        return Reflect.get(this, "_alias") as string;
    }

    /**
     * 获取别名
     * @returns
     */
    public static getAlias() {
        return Reflect.get(this, "_alias") as string;
    }

    private getViewInfo(isForce: boolean = false): ViewInfo {
        if (isForce == true) {
            if (GlobalViewInfo.has(this) == false) {
                GlobalViewInfo.set(this, new ViewInfo());
            }
        }
        return GlobalViewInfo.get(this);
    }

    private clearViewInfo() {
        if (GlobalViewInfo.has(this)) {
            GlobalViewInfo.delete(this);
        }
    }

    public isInitialize() {
        return this.getViewInfo()?.status == ViewBase.Status.Initialize;
    }

    protected onLoad(): void {
        if (this.getViewInfo(true).isOpen == false) {
            this.initialize();
        }
    }

    protected onDestroy(): void {
        if (this.getViewInfo()?.isOpen == false) {
            this.dispose();
        }

        this.clearViewInfo();
    }

    protected onEnable(): void {
        if (this.getViewInfo()?.status == ViewBase.Status.Initialize) {
            if (this.onShow) {
                this.onShow();
            }
        }
    }

    protected onDisable(): void {
        if (this.getViewInfo()?.status == ViewBase.Status.Initialize) {
            if (this.onHide) {
                this.onHide();
            }
        }

        if (this.isValid && this.node.isValid && cc.isValid(this, true) && cc.isValid(this.node, true)) {
            return;
        }

        if (this.getViewInfo()?.isOpen == false) {
            this.dispose();
        }

        this.clearViewInfo();
    }

    protected update(dt: number): void {
        if (this.isValid && this.node.isValid && cc.isValid(this, true) && cc.isValid(this.node, true)) {
            return;
        }

        if (this.getViewInfo()?.isOpen == false) {
            this.dispose();
        }

        this.clearViewInfo();
    }

    protected lateUpdate(dt: number): void {
        if (this.isValid && this.node.isValid && cc.isValid(this, true) && cc.isValid(this.node, true)) {
            return;
        }

        if (this.getViewInfo()?.isOpen == false) {
            this.dispose();
        }

        this.clearViewInfo();
    }

    /**
     * 获取参数
     * @param index
     * @returns
     */
    public getArgs(): A {
        return this._data || this.getViewInfo()?.args as A;
    }

    /**
    * 获取父界面
    */
    public getParentView<V extends ViewBase = P>() {
        return this.getViewInfo()?.parentView as V;
    }

    /**
    * 初始化函数，供重载
    */
    protected abstract onInitialize();

    /**
    * 销毁函数，供重载
    */
    protected abstract onDispose();

    public isShow() {
        return this.node.active;
    }

    /**
     * 显示视图
     */
    public showView() {
        if (this.node.active == false) {
            this.node.active = true;
            if (this.getViewInfo()?.status == ViewBase.Status.Initialize) {
                if (this.onShow) {
                    this.onShow();
                }
            }
        }
    }

    /**
     * 隐藏视图
     */
    public hideView() {
        if (this.node.active == true) {
            this.node.active = false;
            if (this.getViewInfo()?.status == ViewBase.Status.Initialize) {
                if (this.onHide) {
                    this.onHide();
                }
            }
        }
    }

    /**
     * 显示
     */
    protected abstract onShow();

    /**
     * 隐藏
     */
    protected abstract onHide();

    /**
     * 防止因为没有非open界面没有初始化导致刷新失败
     */
    private _data: A = null;

    /**
     * 更新
     * @param data
     */
    public async refresh(data: A) {
        if (this.getViewInfo()?.status == ViewBase.Status.Initialize) {
            this._data = null;
            let viewInfo = this.getViewInfo();
            if (viewInfo != null) {
                viewInfo.args = data as object;
                if (this.onRefresh) {
                    await this.onRefresh(data);
                }
            }
        } else {
            this._data = data;
        }
    };

    /**
     * 刷新(可能在已经打开时候更新参数需要刷新界面)
     */
    protected abstract onRefresh(data: A);

    /**
     * 加载资源
     * @param assetName
     * @param type
     * @param callback
     */
    protected loadAsset<T extends cc.Asset>(assetName: string, type: new () => T, callback: (err: any, res: T) => void, progress: (finish: number, total: number) => void = null) {
        this.getViewInfo(true).loadProxy.loadAsset(assetName, type, callback, progress);
    }

    /**
     * 加载资源
     * @param assetName
     * @param type
     * @param progress
     * @returns
     */
    protected async loadAssetAsync<T extends cc.Asset>(assetName: string, type: new () => T, progress: (finish: number, total: number) => void = null) {
        return await this.getViewInfo(true).loadProxy.loadAssetAsync(assetName, type, progress);
    }

    /**
    * 设置图片
    * @param target
    * @param spriteFrameName
    */
    public async setSpriteFrame(target: cc.Component | cc.Node, spriteFrameName: string, callback: () => void = null) {
        return SpriteHelper.setSpriteFrame(this.getViewInfo(true).loadProxy, target, spriteFrameName, callback);
    }

    /**
     * 卸载资源
     * @param assetName
     */
    protected unloadAsset(assetName: string) {
        this.getViewInfo()?.loadProxy.unloadAsset(assetName);
    }

    /**
     * 获取多语言值
     * @param langID
     * @param params
     * @returns
     */
    protected async getLangValue(langID: string, ...params: any[]) {
        return blade.locale.value(langID, ...params);
    }

    /**
     * 是否是模版
     * @returns
     */
    public isTempView() {
        if (this.getAlias() == GameConfig.fullTempView?.getAlias() || this.getAlias() == GameConfig.smallTempView?.getAlias()) {
            return true;
        }
        return false;
    }

    /**
     * 是否是模版的子页
     * @returns
     */
    public isTempSubView() {
        let parentView = this.getParentView();
        if (parentView != null && (parentView.getAlias() == GameConfig.fullTempView?.getAlias() || parentView.getAlias() == GameConfig.smallTempView?.getAlias())) {
            return true;
        }
        return false;
    }

    /**
     * 关闭页面
     */
    public close() {
        if (this.getViewInfo()?.isOpen) {
            if (this.isTempSubView()) {
                // 关闭的是一个模版页面的子页面,需要从父亲关闭起
                this.getParentView().close();
            } else {
                let closeView = Reflect.get(blade.view, "closeView");
                closeView.call(blade.view, this);
            }
        } else {
            // throw new Error("并不是Open接口打开的界面，不用调用关闭,生命周期跟随组件");
            console.warn("并不是Open接口打开的界面，不用调用关闭,生命周期跟随组件");
        }
    }

    private closeView() {
        if (this.getViewInfo()?.status == ViewBase.Status.Initialize) {

            this.dispose();

            if (this.getViewInfo()?.isOpen == true) {
                this.node.destroy();

                let alias = this.getAlias();
                let unloadAsset = Reflect.get(blade.view, "unloadAsset");
                unloadAsset.call(blade.view, alias + ".prefab");
            }

            this.clearViewInfo();
        }
    }

    private dispose() {
        if (this.getViewInfo()?.status == ViewBase.Status.Initialize) {

            if ((this.node == null || this.node.active == true) && this.onHide) {
                this.onHide();
            }

            this.getViewInfo().status = ViewBase.Status.Dispose;

            this.closeAllSubView();

            this.closeAllDefaulView();

            this.offEvent();

            if (this.onDispose) {
                this.onDispose();
            }

            this.getViewInfo()?.loadProxy.dispose();
        }
    }

    private closeAllSubView() {
        for (let index = 0; index < this.getViewInfo()?.subViews.length; index++) {
            const view = this.getViewInfo()?.subViews[index];
            view.closeView();
        }
        this.getViewInfo().subViews = [];
    }

    private closeAllDefaulView() {
        for (let index = 0; index < this.getViewInfo()?.defaultViews.length; index++) {
            const defaultView = this.getViewInfo()?.defaultViews[index];
            defaultView.closeView();
        }
        this.getViewInfo().defaultViews = [];
    }

    protected getSubViews() {
        return this.getViewInfo()?.subViews;
    }

    private closeSubView(view: ViewBase) {
        let index = this.getViewInfo()?.subViews.indexOf(view)
        if (index >= 0) {
            this.getViewInfo()?.subViews.splice(index, 1);
            view.closeView();
        } else {
            console.error("不存在目标子页面", view);
        }
    }

    private onEvent() {
        let alias = this.getAlias();

        this.offEvent();

        let noticeEvents = getNoticeEvents(this)
        if (noticeEvents != null) {
            // 通知初始化
            noticeEvents.forEach((functionList, eventName) => {
                functionList.forEach((functionName) => {
                    if (this[functionName]) {
                        blade.notice.on(eventName, this[functionName], this);
                    } else {
                        console.error(`${alias}不存在的方法${functionName}`);
                    }
                });
            });
        }

        if (this._nodeEvents) {
            // 节点监听初始化
            this._nodeEvents.forEach((eventList, nodeName) => {
                let node: cc.Node = this[nodeName]?.node || this[nodeName];
                if (node?.on) {
                    eventList.forEach((functionList, eventName) => {
                        functionList.forEach((functionName) => {
                            if (this[functionName]) {
                                node.on(eventName, this[functionName], this);
                            } else {
                                console.error(`${alias}不存在的方法${functionName}`);
                            }
                        });
                    });
                } else {
                    console.error(`${alias}不存在的节点${nodeName}`);
                }
            });
        }

        if (this["onTick"] && this["onFixedTick"] && this["onLateTick"]) {
            // 有实现相应的接口
            blade.ticker.on(this as any);
        }
    }

    private offEvent() {

        let noticeEvents = getNoticeEvents(this)
        if (noticeEvents != null) {
            // 通知销毁
            blade.notice.targetOff(this);
        }

        if (this._nodeEvents != null) {
            // 节点监听销毁
            this._nodeEvents.forEach((eventList, nodeName) => {
                let node: cc.Node = this[nodeName]?.node || this[nodeName];
                if (node?.targetOff) {
                    node.targetOff(this);
                }
            });
        }

        if (this["onTick"] && this["onFixedTick"] && this["onLateTick"]) {
            // 有实现相应的接口
            blade.ticker.off(this as any);
        }
    }

    public async initialize() {
        if (this.getViewInfo(true).status == ViewBase.Status.Dispose) {

            this.getViewInfo().status = ViewBase.Status.Initialize;

            if (this.onInitialize) {
                await this.onInitialize();
            }

            this.onEvent();

            if (this.onRefresh) {
                if (this._data != null) {
                    this.getViewInfo().args = this._data as any;
                    this._data = null;
                }
                await this.onRefresh(this.getViewInfo().args as A);
            }

            if (this.node != null && this.node.active == true && this.onShow) {
                await this.onShow();
            }
        }
    }

    public async openSubView<V extends ViewBase>(viewType: new () => V, data: GenericOf<V> = null): Promise<V> {
        let view = await ViewBase.createView(viewType, this, data);

        if (this.getViewInfo() == null || this.getViewInfo().status == ViewBase.Status.Dispose) {
            view.closeView();
            console.warn("父界面已经销毁，不能打开子界面");
            return null;
        }

        this.getViewInfo().subViews.push(view);

        await view.initialize();

        return view as V;
    }

    public static async openView<V extends ViewBase>(viewType: new () => V, data: GenericOf<V> = null): Promise<V> {
        let view = await ViewBase.createView(viewType, null, data);

        await view.initialize();

        return view as V;
    }

    /**
     * 创建视图
     * @param viewType
     * @returns
     */
    public static async createView<V extends ViewBase>(viewType: new () => V, parentView: ViewBase = null, data: GenericOf<V>) {
        let alias = Reflect.get(viewType, "_alias") as string;
        let loadAssetAsync = Reflect.get(blade.view, "loadAssetAsync");
        let prefab = await loadAssetAsync.call(blade.view, alias + ".prefab", cc.Prefab) as cc.Prefab;

        let node = cc.instantiate(prefab);

        // await PromiseHelper.nextFrame();

        let view: ViewBase = node.getComponent(viewType);

        if (view == null) {
            view = node.addComponent(viewType);
        }

        view.getViewInfo(true).isOpen = true;
        view.getViewInfo(true).parentView = parentView;
        view.getViewInfo(true).args = data as object;

        let defaultViews = node.getComponentsInChildren(ViewBase);
        for (let index = defaultViews.length - 1; index >= 0; index--) {
            const defaultView = defaultViews[index];
            if (defaultView.getViewInfo()?.isOpen == true) {
                defaultViews.splice(index, 1);
            }
        }

        view.getViewInfo(true).defaultViews = defaultViews;

        return view;
    }

}

namespace ViewBase {
    export enum Status {
        Initialize,
        Dispose
    }
}

export default ViewBase;

import GameConfig from "../../Module/Defines/GameConfig";
import { getNoticeEvents } from "../Decorators/NoticeEvent";
import SpriteHelper from "../Helpers/SpriteHelper";
import AssetService from "../Services/AssetService";

