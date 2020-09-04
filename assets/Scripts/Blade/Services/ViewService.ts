import IService from "../../Blade/Interfaces/IService";
import Singleton from "../../Blade/Decorators/Singleton";
import Service from "../../Blade/Decorators/Service";
import IView from "../../Blade/Interfaces/IView";


@Singleton
@Service("ViewService")
export default class ViewService implements IService {
    public alias: string;
    public static readonly instance: ViewService;


    private list: Map<string, IView>

    public async initialize() {
        this.list = new Map<string, IView>();
    }
    public async lazyInitialize() {
    }

    /**
    * 注册控制器
    */
    public register(view: IView) {
        if (this.list.has(view.alias)) {
            cc.error(`已经存在${view.alias}视图!`);
            this.unregister(this.list.get(view.alias))
            this.register(view);
        } else {
            this.list.set(view.alias, view)
        }
    }

    /**
     * 注销控制器
     */
    public unregister(view: IView) {
        if (this.list.has(view.alias)) {
            this.list.delete(view.alias)
        }
    }


    /**
     * 获取指定视图
     * @param alias 
     */
    public getView(alias: string) {
        return this.list.get(alias) || null;
    }


    /**
    * 命令视图调用指定方法
    * @param vid 视图名
    * @param funcName 视图方法
    * @param args 方法附带参数
    */
    public orderViewById(alias: string, funcName: string, ...args: any[]): any {
        const view: IView = this.getView(alias);
        if (view == null) {
            cc.error(`视图（${alias}）不存在`);
            return;
        }

        return view.order(funcName, ...args);
    }

}
