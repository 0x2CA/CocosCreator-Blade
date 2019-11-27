import IService from "../Interfaces/IService";
import Singleton from "../Decorators/Singleton";
import Service from "../Decorators/Service";
import IView from "../Interfaces/IView";


@Singleton
@Service("ViewService")
export default class ViewService implements IService {
    public alias: string;
    public static readonly instance: ViewService;


    private list: { [name: string]: IView }

    public initialize(): void {
        this.list = {};
    }
    public lazyInitialize(): void {
    }

    /**
    * 注册控制器
    */
    public register(view: IView) {
        if (Reflect.has(this.list, view.alias)) {
            throw new Error(`已经存在${view.alias}视图!`);
        } else {
            Reflect.defineProperty(this.list, view.alias, {
                value: view
            })
        }
    }

    /**
     * 注销控制器
     */
    public unregister(view: IView) {
        if (Reflect.has(this.list, view.alias)) {
            Reflect.deleteProperty(this.list, view.alias)
        }
    }


    /**
     * 获取指定视图
     * @param alias 
     */
    public getView(alias: string) {
        return this.list[alias] || null;
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
            throw new Error(`视图（${alias}）不存在`);
        }

        return view.order(funcName, ...args);
    }

}
