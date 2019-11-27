import IService from "../Interfaces/IService";
import Singleton from "../Decorators/Singleton";
import Service from "../Decorators/Service";

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
