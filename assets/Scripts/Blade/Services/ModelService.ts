import IService from "../../Blade/Interfaces/IService";
import IModel from "../../Blade/Interfaces/IModel";
import Service from "../../Blade/Decorators/Service";
import Singleton from "../../Blade/Decorators/Singleton";




/**
 * Model服务
 */
@Singleton
@Service("ModelService")
class ModelService implements IService {
    public alias: string;
    public static readonly instance: ModelService;

    // Model列表
    private list: { [name: string]: { model: any, event: cc.EventTarget } };

    public async initialize() {
        this.list = {}
    }
    public async lazyInitialize() {
    }


    /**
     *  监听数据变化
     * @param modelType 
     * @param watchField 
     * @param onFieldChangeFn 
     * @param target 
     */
    public on<T extends IModel>(modelType: (new () => T) | T, watchField: Array<keyof T>, onFieldChangeFn: ModelService.WatchCallback, target: any) {
        const model = typeof modelType === 'function' ? this.getModel(modelType) : modelType;

        if (model == null) {
            return;
        }

        for (const field of watchField) {
            if (typeof field === "string") {
                this.list[model.alias].event.on(field, onFieldChangeFn, target)
            }
        }

        // 发送一次通知
        for (const field of watchField) {
            if (typeof field === "string") {
                this.noticeModelFieldUpdate(modelType, field, model[field], model[field])
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
    public off<T extends IModel>(modelType: (new () => T) | T, watchField: Array<keyof T>, onFieldChangeFn: ModelService.WatchCallback, target: any) {
        const model = typeof modelType === 'function' ? this.getModel(modelType) : modelType;

        if (model == null) {
            return;
        }

        for (const field of watchField) {
            if (typeof field === "string") {
                this.list[model.alias].event.off(field, onFieldChangeFn, target)
            }
        }
    }


    /**
     * 变更通知
     * @param modelType 
     * @param field 
     * @param newVal 
     * @param oldVal 
     */
    private noticeModelFieldUpdate<T extends IModel>(modelType: (new () => T) | T, field: string, newVal: any, oldVal: any) {
        const model = typeof modelType === 'function' ? this.getModel(modelType) : modelType;

        if (model == null) {
            return;
        }

        this.list[model.alias].event.emit(field, model, field, newVal, oldVal);
    }


    /**
     * 获取Model
     * @param modelType 
     */
    public getModel<T extends IModel>(modelType: new () => T): T {
        for (const key in this.list) {
            if (this.list[key].model instanceof modelType) {
                return this.list[key].model;
            }
        }

        return this.createModel(modelType);
    }

    /**
     * 创建Model
     * @param modelType 
     */
    private createModel<T extends IModel>(modelType: new () => T): T {
        let model: T = new modelType();

        this.list[model.alias] = {
            event: new cc.EventTarget(),
            model
        }

        this.bindProxy(model);

        return model
    }


    /**
     * 设置代理
     * @param model 
     */
    private bindProxy<T extends IModel>(model: T) {
        const self = this;

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
                    self.noticeModelFieldUpdate(
                        model,
                        field,
                        value,
                        oldVal
                    );
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
        (model: IModel, field: string, newVal: any, oldVal?: any): void
    };
    export const INNER_DATA_FIELD = "_data_";
}

export default ModelService;
