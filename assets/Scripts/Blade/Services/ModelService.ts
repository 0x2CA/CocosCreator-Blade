import ModelBase from "../Bases/ModelBase";
import SingletonBase from "../Bases/SingletonBase";


/**
 * Model服务
 */

class ModelService extends SingletonBase {

    // Model列表
    private modelInfos: Map<any, ModelService.ModelInfo> = new Map<any, ModelService.ModelInfo>();

    public onInitialize() {
        this.modelInfos.clear();
    }

    public onDispose() {
    }

    /**
     *  监听数据变化
     * @param modelType
     * @param watchField
     * @param onFieldChangeFn
     * @param target
     */
    public on<T extends ModelBase>(modelType: (new () => T), watchField: Array<keyof T>, onFieldChangeFn: ModelService.WatchCallback, target: any) {
        const info = this.modelInfos.get(modelType);

        if (info == null) {
            return;
        }

        for (const field of watchField) {
            if (typeof field === "string") {
                info.event.on(field, onFieldChangeFn, target)
            }
        }

        // 发送一次通知
        for (const field of watchField) {
            if (typeof field === "string") {
                info.event.emit(field, info.model, (info.model as any)[field], (info.model as any)[field])
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
    public off<T extends ModelBase>(modelType: (new () => T), watchField: Array<keyof T>, onFieldChangeFn: ModelService.WatchCallback, target: any) {
        const info = this.modelInfos.get(modelType);

        if (info == null) {
            return;
        }

        for (const field of watchField) {
            if (typeof field === "string") {
                info.event.off(field, onFieldChangeFn, target)
            }
        }
    }


    /**
     * 获取Model
     * @param modelType
     */
    public getModel<T extends ModelBase>(modelType: new () => T): T {
        let model = this.modelInfos.get(modelType)?.model as T;

        if (model == null) {
            model = this.createModel(modelType);
        }

        return model;
    }


    public getModelByAlias(alias) {
        let model = null;

        this.modelInfos.forEach((info) => {
            if (info.alias == alias) {
                model = info.model;
            }
        });

        return model;
    }

    /**
     * 创建Model
     * @param modelType
     */
    private createModel<T extends ModelBase>(modelType: new () => T): T {
        let model: T = new modelType();
        let event = new cc.EventTarget();

        this.modelInfos.set(modelType, {
            event: new cc.EventTarget(),
            alias: (model as any).alias,
            model
        });

        if ((model as any).alias == null || (model as any).alias == "") {
            console.warn("Model的名称是空的，请检查是否使用了Model装饰器");
        }

        this.bindProxy(model, event);

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

    export class ModelInfo {
        public model: ModelBase;
        public event: cc.EventTarget;
        public alias: string;
    }

    export const INNER_DATA_FIELD = "_data_";
}

export default ModelService;
