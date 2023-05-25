
/**
 * 命令
 */
export default abstract class CommandBase {
    protected abstract exec(...args: object[]);
    protected abstract undo();
}
