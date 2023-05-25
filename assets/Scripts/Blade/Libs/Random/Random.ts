
export default class Random {
    /**
     * 创建一个随机数生成器
     */
    public constructor(seed?: number) {
        if (seed == null || typeof (seed) != "number") {
            this._seed = new Date().getTime();
        } else {
            this._seed = Math.abs(Math.floor(seed));
        }

        this._seed %= 233280;
    }

    /**
     * 设置用于随机数生成器的种子，如果不设置则实际是取当前时间毫秒数
     */
    private _seed: number = null;

    /**
     * 返回一个在min和max之间的随机浮点数
     */
    public next(min: number = 0, max: number = 1): number {
        if (this._seed == null) {
            this._seed = new Date().getTime();
        }

        // 计算随机种子
        this._seed = (this._seed * 9301 + 49297) % 233280;

        let random = this._seed / 233280.0;

        return min + random * (max - min);
    }

    /**
     * 获取当前种子
     * @returns
     */
    public getSeed(): number {
        return this._seed;
    }

    /**
     * 设置当前种子
     * @param seed
     */
    public setSeed(seed: number): void {
        if (seed != null && typeof (seed) == "number") {
            this._seed = Math.abs(Math.floor(seed));
            this._seed %= 233280;
        }
    }

}