/**
 * 随机助手
 */
export default class RandomHelper {
    /**
    * 获取随机布尔值
    */
    public static getBoolean(): boolean {
        return Math.random() > 0.5;
    }

    /**
     * 获取唯一ID
     */
    public static getUUID() {
        var time = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (char) {
            var random = Math.floor((time + Math.random() * 16) % 16);
            return (char == 'x' ? random : (random & 0x3 | 0x8)).toString(16).toUpperCase();
        });
        return uuid;
    };

    /**
        * 获取范围内整型随机数
        * @param min 
        * @param max 
        */
    public static getInt(min: number, max?: number): number {
        if (max != null) {
            return Math.round(Math.random() * (max - min)) + min;
        }
        else {
            return Math.round(Math.random() * min);
        }
    }

    /**
    * 获取范围内随机数
    * @param min 
    * @param max 
    */
    public static getFloat(min: number, max?: number): number {
        if (max != null) {
            return Math.random() * (max - min) + min;
        }
        else {
            return Math.random() * min;
        }
    }

    /**
    * 从权重列表中获取随机权重
    * @param weights 
    */
    public static getWeightIndex(weights: number[]): number {
        const len = weights.length;
        if (len <= 0) {
            return -1;
        }

        let totalWeight = 0;
        for (let i = 0; i < len; ++i) {
            totalWeight += weights[i];
        }

        const currentWeight = RandomHelper.getFloat(0, totalWeight);
        for (let i = len - 1; i >= 0; --i) {
            totalWeight -= weights[i];
            if (totalWeight <= currentWeight) {
                return i;
            }
        }

        return 0;
    }
}
