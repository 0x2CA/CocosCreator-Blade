import ModelBase from "../Bases/ModelBase";
import SingletonBase from "../Bases/SingletonBase";

/**
 * Model服务
 */
class ModelService extends SingletonBase<ModelService> {

    // Model列表
    private _models: Map<string, ModelBase> = new Map<string, ModelBase>();

    protected onInitialize() {
        this._models.clear();
    }

    protected onDispose() {
    }

    private getAlias<T extends ModelBase>(modelType: new () => T): string {
        return Reflect.get(modelType, "_alias");
    }

    /**
     *  监听数据变化
     * @param modelType
     * @param watchField
     * @param onFieldChangeFn
     * @param target
     */
    public on<T extends ModelBase>(modelType: new () => T, watchField: Array<keyof T>, onFieldChangeFn: ModelService.WatchCallback, target: object = null) {
        let alias = this.getAlias(modelType);

        const model = this._models.get(alias);

        if (model == null) {
            return;
        }

        let event = Reflect.get(model, "_event") as cc.EventTarget;

        for (const field of watchField) {
            if (typeof field === "string") {
                event.on(field, onFieldChangeFn, target)
            }
        }

        // 发送一次通知
        for (const field of watchField) {
            if (typeof field === "string") {
                event.emit(field, model, Reflect.get(model, field), Reflect.get(model, field));
            }
        }
    }

    /**
     *  取消监听
     * @param modelType
     * @param watchField
     * @param onFieldChangeFn
     * @param target
     */
    public off<T extends ModelBase>(modelType: new () => T, watchField: Array<keyof T>, onFieldChangeFn: ModelService.WatchCallback, target: object = null) {
        let alias = this.getAlias(modelType);

        const model = this._models.get(alias);

        if (model == null) {
            return;
        }

        let event = Reflect.get(model, "_event") as cc.EventTarget;

        for (const field of watchField) {
            if (typeof field === "string") {
                event.off(field, onFieldChangeFn, target)
            }
        }
    }


    /**
     * 获取Model
     * @param modelType
     */
    public get<T extends ModelBase>(modelType: new () => T): T {
        let alias = this.getAlias(modelType);

        let model = this._models.get(alias) as T;

        if (model == null) {
            model = this.createModel(modelType);
        }

        return model;
    }

    public getByAlias(alias: string) {
        return this._models.get(alias);
    }

    /**
     * 创建Model
     * @param modelType
     */
    private createModel<T extends ModelBase>(modelType: new () => T): T {
        let alias = this.getAlias(modelType);

        if (alias == null || alias == "") {
            console.warn("Model的名称是空的，请检查是否使用了Model装饰器");
        }

        let model: T = new modelType();

        let event = new cc.EventTarget();

        Reflect.set(model, "_event", event);

        this._models.set(alias, model);

        this.bindProxy(model, event);

        let socketEvents = Reflect.get(model, "_socketEvents") as Map<number, Set<string>>;
        if (socketEvents) {
            socketEvents.forEach((functionList, messageId) => {
                functionList.forEach((functionName) => {
                    blade.socket.on(messageId, model[functionName], model);
                });
            });
        }

        return model
    }

    /**
     * 设置代理
     * @param model
     */
    private bindProxy<T extends ModelBase>(model: T, event: cc.EventTarget = null) {

        const fields = Object.getOwnPropertyNames(model).filter((field) => {
            return typeof model[field] !== "function";
        });

        let innerData = {};

        fields.forEach((field) => {
            innerData[field] = model[field];

            Object.defineProperty(model, field, {
                get: function () {
                    return model[ModelService.INNER_DATA_FIELD][field];
                },
                set: function (value) {
                    const oldVal = model[ModelService.INNER_DATA_FIELD][field];
                    model[ModelService.INNER_DATA_FIELD][field] = value;
                    // 通知更新
                    event.emit(field, model, field, value, oldVal);
                },
            });
        });

        // 保存原属性到INNER_DATA_FIELD中
        Object.defineProperty(model, ModelService.INNER_DATA_FIELD, {
            value: innerData,
            enumerable: false,
        });
    }

}

namespace ModelService {
    export interface WatchCallback {
        (model: ModelBase, field: string, newVal: any, oldVal?: any): void
    };

    export const INNER_DATA_FIELD = "_data_";
}

export default ModelService;
