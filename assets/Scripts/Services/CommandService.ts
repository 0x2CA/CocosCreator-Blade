import IService from "../Interfaces/IService";
import Service from "../Decorators/Service";
import Singleton from "../Decorators/Singleton";
import IController from "../Interfaces/IController";
import ICommand from "../Interfaces/ICommand";
import TimerService from "./TimerService";

@Singleton
@Service("CommandService")
export default class CommandService implements IService {
    public alias: string;
    public static readonly instance: CommandService;


    public initialize(): void {
    }

    public lazyInitialize(): void {
    }




   /**
    * 执行命令
    * @param cmd 
    * @param args 
    */
    public exec<T extends ICommand>(cmd: T, ...args: any[]) {
        cmd.exec(args);
    }

    /**
     * 下一帧执行命令
     *
     * @template T
     * @param {T} cmd
     * @param {...any[]} args
     * @memberof CommandService
     */
    public execNextFrame<T extends ICommand>(cmd: T, ...args: any[]) {
        TimerService.instance.runNextFrame(() => {
            cmd.exec(args);
        })
    }

    /**
     * 异步执行命令
     * 
     * @param cmd 
     * @param args 
     */
    public execAsync<T extends ICommand>(cmd: T, ...args: any[]) {
        new Promise((resolve, reject) => {
            cmd.exec(args);
            resolve();
        })
    }

}
