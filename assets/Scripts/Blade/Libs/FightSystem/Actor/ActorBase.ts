
/**
 * 演员基类
 */
export default abstract class ActorBase {

    // 流水id
    protected _id: string = "";

    public constructor(id: string) {
        this._id = id;
    }

    /**
     * 获取流水id
     * @returns
     */
    public getId() {
        return this._id;
    }

    public abstract tick(delta: number): void;
}