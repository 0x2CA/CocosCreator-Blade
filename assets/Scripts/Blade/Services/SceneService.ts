/*
 * @作者: 0x2CA
 * @创建时间: 2022-10-27
 * @最后编辑时间: 2023-03-14
 * @最后编辑者: 0x2CA
 * @描述:
 */
import SingletonBase from "../Bases/SingletonBase";
import Stack from "../Libs/Structs/Stack";


class SceneService extends SingletonBase<SceneService> {

    // 场景记录栈堆
    private _stack: Stack<SceneService.SceneRecord> = new Stack<SceneService.SceneRecord>();

    protected onInitialize() {
        this._stack.clear();
        this._stack.push({ name: cc.director.getScene().name, params: blade.platform.get().getLaunchOptions() });
    }

    protected onDispose() {
    }

    /**
    * 进入场景
    * @param sceneName
    */
    public run(sceneName: string, params: {} = {}) {
        this._stack.push({ name: sceneName, params });

        cc.director.loadScene(sceneName);
    }

    /**
     * 预加载场景
     * @param name
     * @param progressFun
     */
    public preload(name: string, progressFun?: (completedCount: number, totalCount: number, item: any) => void): Promise<boolean> {
        return new Promise((resolve, reject) => {
            cc.director.preloadScene(
                name,
                (completedCount: number, totalCount: number, item: any) => {
                    if (progressFun) {
                        progressFun(completedCount, totalCount, item);
                    }
                },
                (error: Error) => {
                    if (!error) {
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                }
            );
        })
    }

    /**
    * 获取当前的场景参数, 场景初始化时可使用
    */
    public getParam(): any {
        if (this._stack.size() > 0) {
            const { params = {} } = this._stack.peek();
            return params;
        }
        else {
            return null;
        }
    }

    /**
    * 返回上一个场景
    */
    public back() {
        if (this._stack.size() >= 2) {
            this._stack.pop();
            let info = this._stack.peek();
            cc.director.loadScene(info.name);
        } else {
            console.error("该场景为第一个,无法返回上一个场景！")
        }
    }
}


namespace SceneService {
    /**
    * 场景记录结构
    */
    export interface SceneRecord {
        name: string,
        params?: {}
    }
}


export default SceneService;
