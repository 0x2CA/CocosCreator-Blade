
type GenericOf<V> = V extends ViewBase<infer A> ? A : never;

import ViewService from "../Services/ViewService";
import ViewBase from "./ViewBase";

/*
 * @作者: 0x2CA
 * @创建时间: 2022-10-27
 * @最后编辑时间: 2023-03-29
 * @最后编辑者: 0x2CA
 * @描述:
 */
abstract class ControllerBase {

    /**
     * 初始化函数，供重载
     */
    protected abstract onInitialize();

    /**
    * 销毁函数，供重载
    */
    protected abstract onDispose();

    private onCloseViewBefore(view: ViewBase) {
        if (view.isTempView()) {
            // 模版页面
            let getSubViews = Reflect.get(view, "getSubViews");
            let subViews = getSubViews.call(view);
            for (let index = 0; index < subViews.length; index++) {
                const subView = subViews[index];
                let subViewIndex = this._views.indexOf(subView);
                if (subViewIndex >= 0) {
                    this._views.splice(subViewIndex, 1);
                }
            }
        } else {
            let viewIndex = this._views.indexOf(view);
            if (viewIndex >= 0) {
                this._views.splice(viewIndex, 1);
            }
        }
    }

    // 加载好的界面对象列表(包括view,subView但是没有模版页)
    private _views: ViewBase[] = [];

    // 加载标记
    private _loadSigns: Map<string, object[]> = new Map<string, object[]>();

    protected async openView<V extends ViewBase>(type: ViewService.ViewType, viewType: new () => V, data: GenericOf<V> = null, isOnly: boolean = true) {
        let alias = Reflect.get(viewType, "_alias") as string;
        let sign = {};

        if (this._loadSigns.has(alias) == false) {
            this._loadSigns.set(alias, []);
        }

        let signs = this._loadSigns.get(alias);
        signs.push(sign);

        let view = await blade.view.openView(type, viewType, data, isOnly);

        //关闭检查
        signs = this._loadSigns.get(alias);
        if (signs != null) {
            let signIndex = signs.indexOf(sign);
            // 还处于打开状态,允许加入列表
            if (signIndex >= 0) {
                if (view != null && view.isInitialize() == true) {
                    // 只有不存在列表才可以加入,因为有可能是唯一页面
                    let viewIndex = this._views.indexOf(view);
                    if (viewIndex == -1) {
                        this._views.push(view);
                    }
                }

                signs.splice(signIndex, 1);
                if (signs.length == 0) {
                    this._loadSigns.delete(alias);
                }

                return view;
            }
        }

        //标记已经移除,说明需要关闭
        view?.close();

        // throw new Error(alias + "界面在打开过程中已经关闭");
        console.warn(alias + "界面在打开过程中已经关闭");

        return view;
    }

    protected async openTempView<S extends ViewBase>(type: ViewService.ViewType, subViewType: new () => S, tempType: ViewService.TempType = ViewService.TempType.Full, data: GenericOf<S> = null, isOnly: boolean = true) {
        let alias = Reflect.get(subViewType, "_alias") as string;
        let sign = {};

        if (this._loadSigns.has(alias) == false) {
            this._loadSigns.set(alias, []);
        }

        let signs = this._loadSigns.get(alias);
        signs.push(sign);


        let subView = await blade.view.openTempView(type, subViewType, tempType, data, isOnly);

        //关闭检查
        signs = this._loadSigns.get(alias);
        if (signs != null) {
            let signIndex = signs.indexOf(sign);
            // 还处于打开状态,允许加入列表
            if (signIndex >= 0) {
                if (subView != null && subView.isInitialize() == true) {
                    // 只有不存在列表才可以加入,因为有可能是唯一页面
                    let viewIndex = this._views.indexOf(subView);
                    if (viewIndex == -1) {
                        this._views.push(subView);
                    }
                }

                signs.splice(signIndex, 1);
                signs.splice(signIndex, 1);
                if (signs.length == 0) {
                    this._loadSigns.delete(alias);
                }

                return subView;
            }
        }

        //标记已经移除,说明需要关闭
        subView?.close();

        // throw new Error(alias + "界面在打开过程中已经关闭");

        console.warn(alias + "界面在打开过程中已经关闭");

        return subView;
    }

    protected closeView<V extends ViewBase>(closeView: V) {
        for (let index = this._views.length - 1; index >= 0; index--) {
            const view = this._views[index];
            if (view == closeView) {
                view.close();
            }
        }
    }

    protected closeViewByViewType<V extends ViewBase>(viewType: new () => V) {
        let alias = Reflect.get(viewType, "_alias") as string;
        this._loadSigns.delete(alias);
        for (let index = this._views.length - 1; index >= 0; index--) {
            const view = this._views[index];
            if (view.getAlias() == alias) {
                view.close();
            }
        }
    }

    protected closeViewByAlias(alias: string) {
        this._loadSigns.delete(alias);
        for (let index = this._views.length - 1; index >= 0; index--) {
            const view = this._views[index];
            if (view.getAlias() == alias) {
                view.close();
            }
        }
    }

    protected closeAllView() {
        this._loadSigns.clear();
        for (let index = this._views.length - 1; index >= 0; index--) {
            const view = this._views[index];
            view.close();
        }
    }

    protected getViewByViewType<V extends ViewBase>(viewType: new () => V): V {
        let alias = Reflect.get(viewType, "_alias") as string;
        for (let index = this._views.length - 1; index >= 0; index--) {
            const view = this._views[index];
            if (view.getAlias() == alias) {
                return view as V;
            }
        }
    }

    protected getViewByAlias<V extends ViewBase>(alias: string): V {
        for (let index = this._views.length - 1; index >= 0; index--) {
            const view = this._views[index];
            if (view.getAlias() == alias) {
                return view as V;
            }
        }
    }

    protected getAllView() {
        return this._views;
    }
}

namespace ControllerBase {
}

export default ControllerBase;
