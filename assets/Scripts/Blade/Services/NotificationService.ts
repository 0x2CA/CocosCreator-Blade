import IService from "../../Blade/Interfaces/IService";
import Singleton from "../../Blade/Decorators/Singleton";
import Service from "../../Blade/Decorators/Service";

@Singleton
@Service("NotificationService")
export default class NotificationService extends cc.EventTarget implements IService {
    public alias: string;
    public static readonly instance: NotificationService;


    public initialize(): void {
    }
    public lazyInitialize(): void {
    }

}
