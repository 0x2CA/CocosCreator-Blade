export default abstract class IService {
    /**
     * 服务名称
     *
     * @type {string}
     * @memberof IService
     */
    public readonly alias: string;

    public static readonly instance: IService


    /**
     * 初始化
     */
    public abstract initialize(): void;

    /**
     *  延迟初始化
     */
    public abstract lazyInitialize(): void;
}
