/**
 * 计时器接口
 */
export default abstract class ITicker {
    /**
     * 帧步长更新
     * @param delta 
     */
    abstract onTick(delta: number): void;

    /**
     * 固定帧步长更新
     * @param delta 
     */
    onFixedTick?(delta: number): void;

    /**
     * 渲染后帧步长更新
     * @param delta 
     */
    onLateTick?(): void;
}