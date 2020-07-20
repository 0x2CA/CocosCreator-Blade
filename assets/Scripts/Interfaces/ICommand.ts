
/**
 * 命令
 */
export default abstract class ICommand {
    public abstract exec(...args: object[]);
    public abstract undo();
}
