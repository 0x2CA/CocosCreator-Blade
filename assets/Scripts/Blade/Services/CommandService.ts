import SingletonBase from "../Bases/SingletonBase";
import TimerService from "./TimerService";
import CommandBase from "../Bases/CommandBase";

export default class CommandService extends SingletonBase {
    public onInitialize() {

    }

    public onDispose() {

    }

    /**
     * 执行命令
     * @param cmd
     * @param args
     */
    public exec(cmd: typeof CommandBase, ...args: any[]) {
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
    public execNextFrame(cmd: typeof CommandBase, ...args: any[]) {
        TimerService.getInstance().runNextFrame(() => {
            (new (cmd as any)()).exec(...args);
        })
    }

    /**
     * 异步执行命令
     *
     * @param cmd
     * @param args
     */
    public execAsync(cmd: typeof CommandBase, ...args: any[]) {
        new Promise<void>((resolve, reject) => {
            (new (cmd as any)()).exec(...args);
            resolve();
        })
    }

}
