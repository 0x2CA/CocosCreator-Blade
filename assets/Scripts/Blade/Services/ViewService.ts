import GameConfig from "../../Module/Defines/GameConfig";
import SingletonBase from "../Bases/SingletonBase";
import ViewBase from "../Bases/ViewBase";
import PromiseHelper from "../Helpers/PromiseHelper";
import LRUCache from "../Libs/LRUCache/LRUCache";

type GenericOf<V> = V extends ViewBase<infer A> ? A : never;

class OnlyInfo {
    public viewType: ViewService.ViewType = ViewService.ViewType.Main;
    public view: ViewBase = null;
    public isTemp: boolean = false;
}

class ViewService extends SingletonBase<ViewService>{

    private _views: Map<ViewService.ViewType, ViewBase[]> = new Map<ViewService.ViewType, ViewBase[]>();

    /**
     * 唯一界面列表
     */
    private _onlyViews: Map<string, OnlyInfo> = new Map<string, OnlyInfo>();

    protected onInitialize() {
        this._views.clear();
        this._onlyViews.clear();
        this._cacheAssets.clear();
    }

    protected onDispose() {
    }

    public async openView<V extends ViewBase<A, any>, A>(type: ViewService.ViewType, viewType: new () => V, data: GenericOf<V> = null, isOnly: boolean = true): Promise<V> {
        let alias = Reflect.get(viewType, "_alias") as string;

        try {
            if (isOnly) {
                // 唯一性检查(阻止多个相同界面)
                if (this._onlyViews.has(alias)) {
                    // 在打开窗口中已经存在
                    console.warn(`唯一窗口${alias}已经打开了`);

                    await PromiseHelper.waitUntil(() => {
                        if (this._onlyViews.has(alias)) {
                            return this._onlyViews.get(alias).view != null;
                        } else {
                            throw new Error("唯一窗口在等待时候关闭！！");
                        }
                    });

                    let onlyInfo = this._onlyViews.get(alias);
                    if (onlyInfo != null && onlyInfo.view != null) {
                        // 更新页面
                        onlyInfo.view.refresh(data);
                        return onlyInfo.view as V;
                    }
                }
            }
        } catch (error) {
            console.warn("唯一窗口错误", error);
        }

        let onlyInfo = null;

        if (isOnly) {
            // 当前页面需要唯一
            onlyInfo = {
                view: null,
                viewType: type,
                isTemp: false
            };
            this._onlyViews.set(alias, onlyInfo);
        }

        // 界面打开之前
        blade.notice.emit(ViewService.EventType.LoadViewBefore);

        let view = await ViewBase.openView(viewType, data);

        // 界面打开之后
        blade.notice.emit(ViewService.EventType.LoadViewAfter);

        if (this._views.has(type)) {
            this._views.get(type).push(view);
        } else {
            this._views.set(type, [view]);
        }

        if (type == ViewService.ViewType.Main) {
            // 打开一个全屏界面
            this.checkOcclusion();
        }

        if (isOnly) {
            // 当前页面需要唯一
            if (view != null && view.isInitialize() == true) {
                onlyInfo.view = view;
            } else {
                let currentOnlyInfo = this._onlyViews.get(alias);
                if (currentOnlyInfo != null && currentOnlyInfo == onlyInfo) {
                    this._onlyViews.delete(alias);
                }
            }
        }

        return view as V;
    }

    public async openTempView<S extends ViewBase>(type: ViewService.ViewType, subViewType: new () => S, tempType: ViewService.TempType = ViewService.TempType.Full, data: GenericOf<S> = null, isOnly: boolean = true) {
        let alias = Reflect.get(subViewType, "_alias") as string;

        let tempViewType: { new(): ViewBase } = null;

        if (tempType == ViewService.TempType.Full || tempType == null) {
            tempViewType = GameConfig.fullTempView;
        } else {
            tempViewType = GameConfig.smallTempView;
        }

        if (tempType == null) {
            throw new Error("请配置模版页面!!!");
        }

        try {
            if (isOnly) {
                // 唯一性检查(阻止多个相同界面)
                if (this._onlyViews.has(alias)) {
                    // 在打开窗口中已经存在
                    console.warn(`唯一窗口${alias}已经打开了`);

                    await PromiseHelper.waitUntil(() => {
                        if (this._onlyViews.has(alias)) {
                            return this._onlyViews.get(alias).view != null;
                        } else {
                            throw new Error("唯一窗口在等待时候关闭！！");
                        }
                    });

                    let onlyInfo = this._onlyViews.get(alias);
                    if (onlyInfo != null && onlyInfo.view != null) {
                        // 更新页面
                        onlyInfo.view.refresh(data);
                        return onlyInfo.view as S;
                    }
                }
            }
        } catch (error) {
            console.warn("唯一窗口错误", error);
        }

        let onlyInfo = null;

        if (isOnly) {
            // 当前页面需要唯一
            onlyInfo = {
                view: null,
                viewType: type,
                isTemp: true
            };
            this._onlyViews.set(alias, onlyInfo);
        }

        // 界面打开之前
        blade.notice.emit(ViewService.EventType.LoadViewBefore);

        let tempView = await this.openView(type, tempViewType, null, false);

        if (tempView != null && tempView.isInitialize() == true) {
            tempView.hideView();
        }

        let subView = null;

        if (tempView != null && tempView.isInitialize() == true) {
            subView = await tempView.openSubView(subViewType, data);
        }

        if (isOnly) {
            if (subView != null && subView.isInitialize() == true) {
                onlyInfo.view = subView;
            } else {
                let currentOnlyInfo = this._onlyViews.get(alias);
                if (currentOnlyInfo != null && currentOnlyInfo == onlyInfo) {
                    this._onlyViews.delete(alias);
                }
            }
        }

        if (tempView != null && tempView.isInitialize() == true) {
            tempView.showView();
        }

        // 界面打开之后
        blade.notice.emit(ViewService.EventType.LoadViewAfter);

        if (GameConfig.isAutoFullCheckOcclusion) {
            if (tempView != null && tempView.isInitialize() == true) {
                if (tempType == ViewService.TempType.Full || tempType == null) {
                    // 打开一个全屏界面
                    this.checkOcclusion();
                }
            }
        }

        return subView;
    }

    /**
     * 遮蔽检查,从顶向下,遇到第一个可以遮蔽的为止,下方全部隐藏
     */
    public checkOcclusion() {
        let showView: ViewBase = null

        let types = [ViewService.ViewType.Top, ViewService.ViewType.Tips, ViewService.ViewType.Panel, ViewService.ViewType.Main];

        for (let index = 0; index < types.length; index++) {
            const type = types[index];
            let views = this._views.get(type);
            if (views != null) {
                for (let index = views.length - 1; index >= 0; index--) {
                    const view = views[index];
                    if (type == ViewService.ViewType.Main || (GameConfig.fullTempView != null && view instanceof GameConfig.fullTempView)) {
                        if (showView == null) {
                            showView = view;
                            view.node.opacity = 255;
                        } else {
                            view.node.opacity = 0;
                        }
                    } else {
                        if (showView == null) {
                            view.node.opacity = 255;
                        } else {
                            view.node.opacity = 0;
                        }
                    }
                }
            }
        }

    }

    public async closeViewByType(type: ViewService.ViewType) {
        if (this._views.has(type)) {
            let views = this._views.get(type);
            while (views.length > 0) {
                let view = views[views.length - 1];
                view.close();
            }
            this.checkOcclusion();
        }
    }

    /**
     * 处理关闭页面
     * @param view
     */
    private closeView(view: ViewBase) {

        blade.notice.emit(ViewService.EventType.CloseViewBefore, view);

        let isClose = false;

        if (view.getParentView() != null) {
            isClose = true;
            let parentView = view.getParentView();
            let closeSubView: Function = Reflect.get(parentView, "closeSubView");
            closeSubView.call(parentView, view);
        } else {
            this._views.forEach((views, type) => {
                let index = views.indexOf(view);
                if (index >= 0) {
                    isClose = true;

                    // 唯一性清理
                    if (view.isTempView()) {
                        let getSubViews = Reflect.get(view, "getSubViews");
                        let subViews = getSubViews.call(view);
                        for (let subViewIndex = 0; subViewIndex < subViews.length; subViewIndex++) {
                            const subView = subViews[subViewIndex];
                            let alias = subView.getAlias();
                            let onlyInfo = this._onlyViews.get(alias);
                            if (onlyInfo != null && onlyInfo.view == subView) {
                                this._onlyViews.delete(alias);
                            }
                        }
                    } else {
                        let alias = view.getAlias();
                        let onlyInfo = this._onlyViews.get(alias);
                        if (onlyInfo != null && onlyInfo.view == view) {
                            this._onlyViews.delete(alias);
                        }
                    }

                    let closeView: Function = Reflect.get(view, "closeView");
                    closeView.call(view);
                    views.splice(index, 1);
                    if (type == ViewService.ViewType.Main || (GameConfig.fullTempView != null && view instanceof GameConfig.fullTempView)) {
                        // 关闭一个全屏界面
                        this.checkOcclusion();
                    }
                }
            });
        }

        if (isClose == false) {
            // 一个很意外的关闭，没有父亲而且又不最顶部视图
            let closeView: Function = Reflect.get(view, "closeView");
            closeView.call(view);
        }

    }

    // 界面加载相关
    private _cacheAssets: Map<string, {
        asset: cc.Asset
        count: number
    }> = new Map<string, {
        asset: cc.Asset
        count: number
    }>();

    private _removeCache: LRUCache<string, cc.Asset> = new LRUCache<string, cc.Asset>(GameConfig.viewCacheCapacity);

    /**
     * 加载(带缓存)
     * @param assetName
     * @param type
     * @param progress
     * @returns
     */
    private async loadAssetAsync<T extends cc.Asset>(assetName: string, type: new () => T, progress: (finish: number, total: number) => void = null) {
        if (this._cacheAssets.has(assetName)) {
            let info = this._cacheAssets.get(assetName);
            info.count += 1;
            return info.asset;
        }

        let asset: T = null;

        if (this._removeCache.has(assetName)) {
            asset = this._removeCache.delete(assetName) as T;
        } else {
            asset = await blade.asset.loadAssetAsync<T>(assetName, type, progress)
        }

        if (this._cacheAssets.has(assetName)) {
            let info = this._cacheAssets.get(assetName);
            info.count += 1;
            return info.asset;
        } else {
            this._cacheAssets.set(assetName, {
                asset,
                count: 1
            });

            return asset;
        }
    }

    /**
     * 卸载(带缓存)
     * @param assetName
     */
    private unloadAsset(assetName: string) {
        if (this._cacheAssets.has(assetName)) {
            let info = this._cacheAssets.get(assetName);
            info.count -= 1;
            if (info.count <= 0) {
                this._cacheAssets.delete(assetName);
                let removeItem = this._removeCache.put(assetName, info.asset);
                if (removeItem != null) {
                    blade.asset.unloadAsset(removeItem.key);
                }
            }
        } else {
            console.error("尝试卸载不存在的视图资源!!");
        }
    }
}

namespace ViewService {

    /**
     * 界面类型
     */
    export enum ViewType {
        Map,
        Main,
        Panel,
        Tips,
        Guide,
        Top,
    }

    //模板类型
    export enum TempType {
        Full,
        Small
    }

    export enum EventType {
        CloseViewBefore = "CloseViewBefore",
        LoadViewBefore = "LoadViewBefore",
        LoadViewAfter = "LoadViewAfter"
    }
}

export default ViewService;