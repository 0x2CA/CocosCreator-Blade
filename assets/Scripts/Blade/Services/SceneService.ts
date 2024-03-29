import SingletonBase from "../Bases/SingletonBase";
import Stack from "../Libs/Structs/Stack";
import PlatformService from "./PlatformService";


class SceneService extends SingletonBase {

    // 场景记录栈堆
    private stack: Stack<SceneService.SceneRecord> = new Stack<SceneService.SceneRecord>();

    public onInitialize() {
        this.stack.clear();
        this.stack.push({ name: cc.director.getScene().name, params: PlatformService.getInstance().getPlatform().getLaunchOptions() });
    }

    public onDispose() {
    }

    /**
    * 进入场景
    * @param sceneName
    */
    public runScene(sceneName: string, params: {} = {}) {
        this.stack.push({ name: sceneName, params });

        cc.director.loadScene(sceneName);
    }

    /**
     * 预加载场景
     * @param name
     * @param progressFun
     */
    public preloadScene(name: string, progressFun?: (completedCount: number, totalCount: number, item: any) => void): Promise<boolean> {
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
    public getSceneParam(): any {
        if (this.stack.size() > 0) {
            const { params = {} } = this.stack.peek();
            return params;
        }
        else {
            return null;
        }
    }

    /**
    * 返回上一个场景
    */
    public backScene() {
        if (this.stack.size() >= 2) {
            this.stack.pop();
            let info = this.stack.peek();
            cc.director.loadScene(info.name);
        } else {
            cc.error("该场景为第一个,无法返回上一个场景！")
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
