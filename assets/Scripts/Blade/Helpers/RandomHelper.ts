import Random from "../Libs/Random/Random";
import GeometryHelper from "./GeometryHelper";

/**
 * 随机助手
 */
export default class RandomHelper {

    private static _random: Random = new Random();

    /**
    * 获取随机布尔值
    */
    public static getBoolean(random?: Random): boolean {
        if (random == null) {
            random = RandomHelper._random;
        }
        return random.next() >= 0.5;
    }

    /**
     * 获取唯一ID
     */
    public static getUUID() {
        let time = new Date().getTime();
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (char) {
            let random = Math.floor((time + Math.random() * 16) % 16);
            return (char == 'x' ? random : (random & 0x3 | 0x8)).toString(16).toUpperCase();
        });
        return uuid;
    };

    /**
     * 获取范围内整型随机数 [min, max)
     * @param min
     * @param max
     * @param random
     * @returns
     */
    public static getInt(min: number, max?: number, random?: Random): number {
        if (random == null) {
            random = RandomHelper._random;
        }
        if (max != null) {
            return Math.floor(Math.floor(random.next() * (max - min)) + min);
        }
        else {
            return Math.floor(random.next() * min);
        }
    }

    /**
     * 获取范围内随机数 [min, max)
     * @param min
     * @param max
     * @param random
     * @returns
     */
    public static getFloat(min: number, max?: number, random?: Random): number {
        if (random == null) {
            random = RandomHelper._random;
        }
        if (max != null) {
            return random.next() * (max - min) + min;
        }
        else {
            return random.next() * min;
        }
    }

    /**
     * 从权重列表中获取随机权重
     * @param weights
     * @param random
     * @returns
     */
    public static getWeightIndex(weights: number[], random?: Random): number {
        const len = weights.length;
        if (len <= 0) {
            return -1;
        }

        let totalWeight = 0;
        for (let i = 0; i < len; ++i) {
            totalWeight += weights[i];
        }

        const currentWeight = RandomHelper.getFloat(0, totalWeight, random);
        for (let i = len - 1; i >= 0; --i) {
            totalWeight -= weights[i];
            if (totalWeight <= currentWeight) {
                return i;
            }
        }

        return 0;
    }

    /**
     * 获取随机位置在圆内
     * @param center 中心点
     * @param radius 半径
     * @param random 随机对象
     */
    public static getPositionInCircle(center: cc.Vec2, radius: number, random?: Random) {
        let length = RandomHelper.getFloat(0, radius, random);
        let angle = RandomHelper.getFloat(-180, 180, random);
        return GeometryHelper.rotatePoint(center, angle, center.add(new cc.Vec2(0, length)));
    }

    /**
     * 获取随机位置在矩形内
     * @param a 矩形点A
     * @param b 矩形点B
     * @param c 矩形点C
     * @param d 矩形点D
     * @param random 随机对象
     * @returns
     */
    public static getPositionInRectangle(a: cc.Vec2, b: cc.Vec2, c: cc.Vec2, d: cc.Vec2, random?: Random) {
        let AB = b.sub(a);
        let AD = d.sub(a);
        return a.add(AB.normalize().mul(RandomHelper.getFloat(0, AB.mag(), random)))
            .add(AD.normalize().mul(RandomHelper.getFloat(0, AD.mag(), random)))
    }

    /**
     * 获取随机位置在扇形内
     * @param center 中心点
     * @param direction 朝向
     * @param theta 半角
     * @param length 长度
     * @param random 随机对象
     * @returns
     */
    public static getPositionInSector(center: cc.Vec2, direction: cc.Vec2, theta: number, length: number, random?: Random) {
        let radius = RandomHelper.getFloat(0, length, random);
        let angle = RandomHelper.getFloat(-theta, theta, random);
        return GeometryHelper.rotatePoint(center, angle, direction.normalize().mul(radius));
    }
}
