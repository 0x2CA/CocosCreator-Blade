import Singleton from "../Decorators/Singleton";
import Service from "../Decorators/Service";
import IService from "../Interfaces/IService";
import Stack from "../Libs/Structs/Stack";


@Singleton
@Service("SceneService")
class SceneService implements IService {
    public alias: string;
    public static readonly instance: SceneService

    // 场景记录栈堆
    private stack: Stack<SceneService.SceneRecord> = new Stack<SceneService.SceneRecord>();

    public initialize(): void {
    }

    public lazyInitialize(): void {
        this.stack.push({ name: cc.director.getScene().name, params: app.platform.getPlatform().getLaunchOptions() });
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