/**
 * 缓动函数集合, 使用不同的缓动函数使得动画按照对应的方程进行
 */
export class Ease {
    constructor() {
    }

    /**
     * get
     */
    public static get(amount: number) {
        if (amount < -1) {
            amount = -1;
        }
        if (amount > 1) {
            amount = 1;
        }
        return function (t: number) {
            if (amount == 0) {
                return t;
            }
            if (amount < 0) {
                return t * (t * -amount + 1 + amount);
            }
            return t * ((2 - t) * amount + (1 - amount));
        }
    }

    /**
     * get pow in
     */
    public static getPowIn(pow: number) {
        return function (t: number) {
            return Math.pow(t, pow);
        }
    }

    /**
     * get pow out
     */
    public static getPowOut(pow: number) {
        return function (t: number) {
            return 1 - Math.pow(1 - t, pow);
        }
    }

    /**
     * get pow in out
     */
    public static getPowInOut(pow: number) {
        return function (t: number) {
            if ((t *= 2) < 1) return 0.5 * Math.pow(t, pow);
            return 1 - 0.5 * Math.abs(Math.pow(2 - t, pow));
        }
    }

    /**
     * quad in
     */
    public static quadIn = Ease.getPowIn(2);

    /**
     * quad out
     */
    public static quadOut = Ease.getPowOut(2);

    /**
     * quad in out
     */
    public static quadInOut = Ease.getPowInOut(2);

    /**
     * cubic in
     */
    public static cubicIn = Ease.getPowIn(3);

    /**
     * cubic out
     */
    public static cubicOut = Ease.getPowOut(3);

    /**
     * cubic in out
     */
    public static cubicInOut = Ease.getPowInOut(3);

    /**
     * quart in
     */
    public static quartIn = Ease.getPowIn(4);

    /**
     * quart out
     */
    public static quartOut = Ease.getPowOut(4);

    /**
     * quart in out
     */
    public static quartInOut = Ease.getPowInOut(4);

    /**
     * quint in
     */
    public static quintIn = Ease.getPowIn(5);

    /**
     * quint out
     */
    public static quintOut = Ease.getPowOut(5);

    /**
     * quint in out
     */
    public static quintInOut = Ease.getPowInOut(5);

    /**
     * sine in
     */
    public static sineIn(t: number) {
        return 1 - Math.cos(t * Math.PI / 2);
    }

    /**
     * sine out
     */
    public static sineOut(t: number) {
        return Math.sin(t * Math.PI / 2);
    }

    /**
     * sine in out
     */
    public static sineInOut(t: number) {
        return -0.5 * (Math.cos(Math.PI * t) - 1)
    }

    /**
     * get back in
     */
    public static getBackIn(amount: number) {
        return function (t: number) {
            return t * t * ((amount + 1) * t - amount);
        }
    }

    /**
     * back in
     */
    public static backIn = Ease.getBackIn(1.7);

    /**
     * get back out
     */
    public static getBackOut(amount: number) {
        return function (t) {
            return (--t * t * ((amount + 1) * t + amount) + 1);
        }
    }

    /**
     * back out
     */
    public static backOut = Ease.getBackOut(1.7);

    /**
     * get back in out
     */
    public static getBackInOut(amount: number) {
        amount *= 1.525;
        return function (t: number) {
            if ((t *= 2) < 1) return 0.5 * (t * t * ((amount + 1) * t - amount));
            return 0.5 * ((t -= 2) * t * ((amount + 1) * t + amount) + 2);
        }
    }

    /**
     * back in out
     */
    public static backInOut = Ease.getBackInOut(1.7);

    /**
     * circ in
     */
    public static circIn(t: number) {
        return -(Math.sqrt(1 - t * t) - 1);
    }

    /**
     * circ out
     */
    public static circOut(t: number) {
        return Math.sqrt(1 - (--t) * t);
    }

    /**
     * circ in out
     */
    public static circInOut(t: number) {
        if ((t *= 2) < 1) {
            return -0.5 * (Math.sqrt(1 - t * t) - 1);
        }
        return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
    }

    /**
     * bounce in
     */
    public static bounceIn(t: number) {
        return 1 - Ease.bounceOut(1 - t);
    }

    /**
     * bounce out
     */
    public static bounceOut(t: number) {
        if (t < 1 / 2.75) {
            return (7.5625 * t * t);
        } else if (t < 2 / 2.75) {
            return (7.5625 * (t -= 1.5 / 2.75) * t + 0.75);
        } else if (t < 2.5 / 2.75) {
            return (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375);
        } else {
            return (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375);
        }
    }

    /**
     * bounce in out
     */
    public static bounceInOut(t: number) {
        if (t < 0.5) return Ease.bounceIn(t * 2) * .5;
        return Ease.bounceOut(t * 2 - 1) * 0.5 + 0.5;
    }

    /**
     * get elastic in
     */
    public static getElasticIn(amplitude: number, period: number) {
        let pi2 = Math.PI * 2;
        return function (t: number) {
            if (t == 0 || t == 1) return t;
            let s = period / pi2 * Math.asin(1 / amplitude);
            return -(amplitude * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * pi2 / period));
        }
    }

    /**
     * elastic in
     */
    public static elasticIn = Ease.getElasticIn(1, 0.3);

    /**
     * get elastic out
     */
    public static getElasticOut(amplitude: number, period: number) {
        let pi2 = Math.PI * 2;
        return function (t: number) {
            if (t == 0 || t == 1) return t;
            let s = period / pi2 * Math.asin(1 / amplitude);
            return (amplitude * Math.pow(2, -10 * t) * Math.sin((t - s) * pi2 / period) + 1);
        }
    }

    /**
     * elastic out
     */
    public static elasticOut = Ease.getElasticOut(1, 0.3);

    /**
     * get elastic in out
     */
    public static getElasticInOut(amplitude: number, period: number) {
        let pi2 = Math.PI * 2;
        return function (t: number) {
            let s = period / pi2 * Math.asin(1 / amplitude);
            if ((t *= 2) < 1) return -0.5 * (amplitude * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * pi2 / period));
            return amplitude * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * pi2 / period) * 0.5 + 1;
        }
    }

    /**
     * elastic in out
     */
    public static elasticInOut = Ease.getElasticInOut(1, 0.3 * 1.5);
}