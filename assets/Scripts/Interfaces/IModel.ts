import ModelService from './../Services/ModelService';


export default abstract class IModel {
    public readonly alias: string;


    /**
     * 监听数据变化
     * @param watchField 
     * @param onFieldChangeFn 
     * @param target 
     */
    public on(watchField: Array<keyof this>, onFieldChangeFn: ModelService.WatchCallback, target: any) {
        blade.model.on(this, watchField, onFieldChangeFn, target)
    }


    /**
     * 取消监听
     * @param watchField 
     * @param onFieldChangeFn 
     * @param target 
     */
    public off(watchField: Array<keyof this>, onFieldChangeFn: ModelService.WatchCallback, target: any) {
        blade.model.off(this, watchField, onFieldChangeFn, target)
    }

}
