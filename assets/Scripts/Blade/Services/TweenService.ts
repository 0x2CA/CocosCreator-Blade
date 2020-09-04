import IService from "../../Blade/Interfaces/IService";
import Service from "../../Blade/Decorators/Service";
import Singleton from "../../Blade/Decorators/Singleton";
import Tween from "../Libs/Tween/Tween";
import ITicker from "../../Blade/Interfaces/ITicker";

/**
 * 动画服务类
 */
@Singleton
@Service("TweenService")
export default class TweenService implements IService, ITicker {
    public alias: string;
    public static readonly instance: TweenService;


    public async initialize(){
        Tween.customTick = true;

        // 设置更新服务
        blade.ticker.register(this);
    }

    public async lazyInitialize() {

    }

    /**
     * 动画刷新
     */
    public onTick() {
        Tween.tick();
    }
}
