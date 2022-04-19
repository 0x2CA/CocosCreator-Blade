import SingletonBase from "../Bases/SingletonBase";
import ViewBase from "../Bases/ViewBase";
import AssetService from "./AssetService";

class ViewService extends SingletonBase {

    private views: Map<ViewService.ViewType, ViewBase[]> = new Map<ViewService.ViewType, ViewBase[]>();

    public onInitialize() {
        this.views.clear();
    }

    public onDispose() {
    }

    public async openView<T extends ViewBase>(type: ViewService.ViewType, viewType: new () => T, ...args: any[]): Promise<T> {
        let prefab = await AssetService.getInstance().loadAssetAsync((viewType.prototype as any).alias + ".prefab", cc.Prefab) as cc.Prefab;
        let node = cc.instantiate(prefab);
        let view = node.getComponent(viewType);

        if (view == null) {
            view = node.addComponent(viewType);
        }

        if (this.views.has(type)) {
            this.views.get(type).push(view);
        } else {
            this.views.set(type, [view]);
        }

        if (view.onInitialize) {
            view.onInitialize(...args);
        }

        return view;
    }

    public async closeViewByType(type: ViewService.ViewType) {
        if (this.views.has(type)) {
            let views = this.views.get(type);
            for (let i = 0; i < views.length; i++) {
                let view = views[i];
                (view as any).closeView();
            }
            this.views.delete(type);
        }
    }


    public closeView(view: ViewBase) {
        if ((view as any).parentView) {
            (view as any).parentView.closeSubView(view);
        } else {
            this.views.forEach((views, type) => {
                let index = views.indexOf(view);
                if (index >= 0) {
                    (views[index] as any).closeView();
                    views.splice(index, 1);
                }
            });
        }
    }

}

namespace ViewService {

    export enum ViewType {
        Main,
        Panel,
        Tips
    }
}

export default ViewService;