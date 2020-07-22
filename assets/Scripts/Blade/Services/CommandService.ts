import IService from "../../Blade/Interfaces/IService";
import Service from "../../Blade/Decorators/Service";
import Singleton from "../../Blade/Decorators/Singleton";
import ICommand from "../../Blade/Interfaces/ICommand";
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
    public exec(cmd: typeof ICommand, ...args: any[]) {
        (new (cmd as any)()).exec(...args);
    }

    /**
     * 下一帧执行命令
     *
     * @template T
     * @param {T} cmd
     * @param {...any[]} args
     * @memberof CommandService
     */
    public execNextFrame(cmd: typeof ICommand, ...args: any[]) {
        TimerService.instance.runNextFrame(() => {
            (new (cmd as any)()).exec(...args);
        })
    }

    /**
     * 异步执行命令
     * 
     * @param cmd 
     * @param args 
     */
    public execAsync(cmd: typeof ICommand, ...args: any[]) {
        new Promise((resolve, reject) => {
            (new (cmd as any)()).exec(...args);
            resolve();
        })
    }

}
