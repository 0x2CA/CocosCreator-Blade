import IService from "../Interfaces/IService";
import Service from "../Decorators/Service";
import Singleton from "../Decorators/Singleton";
import Tween from "../Libs/Tween/Tween";
import ITicker from "../Interfaces/ITicker";

/**
 * 动画服务类
 */
@Singleton
@Service("TweenService")
export default class TweenService implements IService, ITicker {
    public alias: string;
    public static readonly instance: TweenService;


    public initialize(): void {
        Tween.customTick = true;

        // 设置更新服务
        app.ticker.register(this);
    }

    public lazyInitialize(): void {

    }

    /**
     * 动画刷新
     */
    public onTick() {
        Tween.tick();
    }
}
