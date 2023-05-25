
import CommandBase from "../Bases/CommandBase";
import SingletonBase from "../Bases/SingletonBase";

/*
 * @作者: 0x2CA
 * @创建时间: 2023-02-09
 * @最后编辑时间: 2023-03-15
 * @最后编辑者: 0x2CA
 * @描述:
 */
export default class CommandService extends SingletonBase<CommandService> {

    protected onInitialize() {

    }

    protected onDispose() {

    }

    /**
     * 执行命令
     * @param cmdType
     * @param args
     */
    public exec<T extends CommandBase>(cmdType: new () => T, ...args: any[]) {
        let cmd = new cmdType();
        let exec: Function = Reflect.get(cmd, "exec");
        exec.call(cmd, ...args);
    }

    /**
     * 下一帧执行命令
     *
     * @template T
     * @param {T} cmdType
     * @param {...any[]} args
     * @memberof CommandService
     */
    public execNextFrame<T extends CommandBase>(cmdType: new () => T, ...args: any[]) {
        blade.timer.runNextFrame(() => {
            let cmd = new cmdType();
            let exec: Function = Reflect.get(cmd, "exec");
            exec.call(cmd, ...args);
        })
    }

    /**
     * 异步执行命令
     *
     * @param cmdType
     * @param args
     */
    public async execAsync<T extends CommandBase>(cmdType: new () => T, ...args: any[]) {
        let cmd = new cmdType();
        let exec: Function = Reflect.get(cmd, "exec");
        await exec.call(cmd, ...args);
    }

}
