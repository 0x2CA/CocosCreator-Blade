/**
 * 全局动画列表
 */
const _tweens: Tween[] = [];

let _paused: boolean = false;

let _timeScale: number = 1;

let _delta: number = 0;

/**
 * 加入全局
 * @param tween
 */
function addGlobal(tween: Tween) {
    let target = tween.getTarget();
    if (target != null) {
        target["__tweenCount"] = target["__tweenCount"] > 0 ? target["__tweenCount"] + 1 : 1;
    }
    _tweens.push(tween);
}

/**
 * 移除全局
 * @param tween
 * @returns
 */
function removeGlobal(tween: Tween) {
    let target = tween.getTarget();
    let i = _tweens.length;
    while (i--) {
        if (_tweens[i] == tween) {
            if (target != null && target["__tweenCount"] > 0) {
                target["__tweenCount"]--;
            }
            _tweens.splice(i, 1);
            return;
        }
    }
}

class Step<T = any> {
    public type: Step.StepType = Step.StepType.Step;
    public time: number = 0;
    public duration: number = 0;
    public easing: Tween.IEasing = Tween.Easing.Linear.None;
    public interpolation: Tween.IInterpolation = Tween.Interpolation.Linear;
    public propsStart: { [key in keyof T]?: number } = {} as any;
    public propsEnd: { [key in keyof T]?: number | number[] } = {} as any;
}

class Action extends Step {
    public callback: Function = null;
    public thisObj: any = null;
    public params: any[] = [];
}

namespace Step {
    export enum StepType {
        Step,
        Action
    }
}

class Tween<T = any> {

    private _target: T = null;

    private _loop: boolean = false;

    private _duration: number = 0;

    private _paused: boolean = false;

    private _ignoreGlobalPause: boolean = false;

    private _timeScale: number = 1;

    private _prevPosition: number = 0;

    private _prevTime: number = 0;

    private _steps: Step<T>[] = [];

    private _propsInit: { [key in keyof T]?: number } = {} as any;

    private _props: { [key in keyof T]?: number } = {} as any;

    public constructor(target: T) {
        this._target = target;
        addGlobal(this);
    }

    public getTarget() {
        return this._target;
    }

    public getPaused(): boolean {
        return this._paused;
    }

    private setPaused(pause: boolean) {
        if (this._paused != pause) {
            this._paused = pause;
            if (pause == true) {
                removeGlobal(this);
            } else {
                addGlobal(this);
            }
        }
        return this;
    }

    public getIgnoreGlobalPause(): boolean {
        return this._ignoreGlobalPause;
    }

    public setIgnoreGlobalPause(ignoreGlobalPause: boolean) {
        this._ignoreGlobalPause = ignoreGlobalPause;
        return this;
    }

    public getTimeScale(): number {
        return this._timeScale;
    }

    public setTimeScale(timeScale: number) {
        this._timeScale = Math.max(timeScale, 0);
        return this;
    }

    /**
     * 附加属性
     * @param props
     * @returns
     */
    private appendProps(props: { [key in keyof T]?: number | number[] }) {
        let oldValue: number = null;

        let newProps: { [key in keyof T]?: number | number[] } = this.cloneProps(this._props);

        for (const key in props) {
            if (Object.prototype.hasOwnProperty.call(props, key)) {
                const value = props[key];

                if (this._propsInit[key] == null) {
                    //初始没有存在
                    if (typeof this._target[key] == "number") {
                        oldValue = this._target[key] as number;
                    }

                    if (oldValue != null) {
                        this._propsInit[key] = this._props[key] = oldValue;
                    }
                }

                oldValue = this._props[key];

                if (value instanceof Array) {
                    if (value.length > 0) {
                        this._props[key] = value[value.length - 1];
                        newProps[key] = [oldValue].concat(value);
                    }
                } else if (typeof value == "number") {
                    this._props[key] = value;
                    newProps[key] = value;
                }
            }
        }

        return newProps;
    }

    /**
     * 克隆属性
     * @param props
     * @returns
     */
    private cloneProps<K>(props: K) {
        let o: K = {} as any;
        for (let n in props) {
            o[n] = props[n];
        }
        return o;
    }

    /**
     * 添加步骤
     * @param step
     * @returns
     */
    private addStep(step: Step) {
        if (step.duration >= 0) {
            step.type = Step.StepType.Step;
            this._steps.push(step);
            step.time = this._duration;
            this._duration += step.duration;
        }
        return this;
    }

    /**
     * 添加动作
     * @param step
     * @returns
     */
    private addAction(step: Step): Tween {
        step.time = this._duration;
        step.type = Step.StepType.Action;
        this._steps.push(step);
        return this;
    }

    /**
     * 设置属性
     * @param props
     */
    private setProps(props: { [key in keyof T]?: number | number[] }) {
        for (const key in props) {
            if (Object.prototype.hasOwnProperty.call(props, key)) {
                const value = props[key];
                const oldValue = this._target[key];
                if (typeof oldValue == "number") {
                    if (value instanceof Array) {
                        if (value.length > 0) {
                            this._target[key] = value[value.length - 1] as any;
                        }
                    } else if (typeof value == "number") {
                        this._target[key] = value as any;
                    }
                }
            }
        }
    }

    /**
     * 立即将指定对象的属性修改为指定值
     * @param props
     * @returns
     */
    public set(props: { [key in keyof T]?: number }) {
        let newProps = this.appendProps(props);

        // 如果总延迟0说明是开始的Set
        if (this._duration == 0) {
            this.setProps(newProps);
        }

        let action = new Action();

        action.callback = (currentProps) => {
            this.setProps(currentProps);
        };
        action.params = [newProps];
        action.thisObj = this;

        return this.addAction(action);
    }

    /**
     * 等待指定毫秒后执行下一个动画
     * @param duration
     * @returns
     */
    public wait(duration: number): Tween {
        if (duration == null || duration <= 0) {
            return this;
        }

        let step = new Step<T>();

        step.duration = duration || 0;

        step.propsEnd = step.propsStart = this.cloneProps(this._props);

        return this.addStep(step);
    }

    /**
     * 将指定对象的属性修改为指定值
     * @param props
     * @param duration
     * @param easing
     * @param interpolation
     * @returns
     */
    public to(props: { [key in keyof T]?: number | number[] }, duration: number, easing: Tween.IEasing = Tween.Easing.Linear.None, interpolation: Tween.IInterpolation = Tween.Interpolation.Linear) {
        if (isNaN(duration) || duration < 0) {
            duration = 0;
        }

        let step = new Step<T>();

        step.duration = duration || 0;

        step.propsStart = this.cloneProps(this._props);
        step.propsEnd = this.appendProps(props);

        // 如果总延迟0而且时间0说明立刻的To
        if (this._duration == 0 && duration == 0) {
            this.setProps(step.propsEnd);
        }

        step.easing = easing;
        step.interpolation = interpolation;

        this.addStep(step);

        return this;
    }

    /**
     * 执行回调函数
     * @param callback
     * @param thisObj
     * @param params
     * @returns
     */
    public call(callback: Function, thisObj: any = null, params: any[] = null) {
        let action = new Action();

        action.callback = callback;
        action.params = params || [];
        action.thisObj = thisObj;

        return this.addAction(action);
    }

    /**
     * 播放
     */
    public play() {
        this.setPaused(false);
    }

    /**
     * 暂停
     */
    public pause() {
        this.setPaused(true);
    }

    /**
     * 重新播放
     */
    public replay() {
        this.resetPosition();
        this.setPaused(false);
    }

    /**
     * 直接完成
     * @returns
     */
    public finish() {
        if (this._paused == true) {
            return;
        }

        this.setPosition(this._duration);
    }

    /**
     * 设置循环
     * @param loop
     * @param sync
     */
    public setLoop(loop: boolean, sync: boolean = true) {
        this._loop = loop;
        if (this._loop == true && sync == true) {
            // 同步循环动画
            this.resetPosition();
            this.tick(_delta);
        }
    }

    /**
     * 执行回调函数
     * @param action
     * @param startPosition
     * @param endPosition
     * @param includeStart
     */
    private runAction(
        action: Action,
        startPosition: number,
        endPosition: number,
        includeStart: boolean = false
    ) {
        if (startPosition > endPosition) {
            //把所有的倒置
            let tmp = startPosition;
            startPosition = endPosition;
            endPosition = tmp;
        }
        let position = action.time;
        if (position == endPosition || (position > startPosition && position < endPosition) || (includeStart && position == startPosition)) {
            action.callback.apply(action.thisObj, action.params);
        }
    }

    /**
     * 更新属性
     * @param step
     * @param ratio
     * @returns
     */
    private updateTargetProps(step: Step, ratio: number) {
        if (step.propsStart == step.propsEnd) {
            // 相等的属性不需要更新
            return;
        }

        // 缓动
        if (step.easing != null) {
            ratio = step.easing(ratio);
        }

        let propsStart: number = null;
        let propsEnd: number | number[] = null;

        for (const key in this._propsInit) {
            if (Object.prototype.hasOwnProperty.call(this._propsInit, key)) {
                if ((propsStart = step.propsStart[key]) == null) {
                    step.propsStart[key] = propsStart = this._propsInit[key];
                }
                if ((propsEnd = step.propsEnd[key]) == null) {
                    step.propsEnd[key] = propsEnd = propsStart;
                }

                let prop: number = null;

                if (propsStart == propsEnd || ratio == 0 || ratio == 1) {
                    if (ratio == 0) {
                        prop = propsStart;
                    } else {
                        if (propsEnd instanceof Array) {
                            prop = propsEnd[propsEnd.length - 1];
                        } else {
                            prop = propsEnd;
                        }
                    }
                } else {
                    if (propsEnd instanceof Array) {
                        prop = step.interpolation(propsEnd, ratio);
                    } else {
                        prop = propsStart + (propsEnd - propsStart) * ratio;
                    }
                }

                if (prop != null) {
                    this._target[key] = prop as any;
                }
            }
        }
    }

    private resetPosition() {
        this._prevPosition = 0;
        this._prevTime = 0;
    }

    private setPosition(position: number, runAction: boolean = true): boolean {
        if (position < 0) {
            position = 0;
        }

        //正常化位置
        let time: number = position;
        let end: boolean = false;
        // 超过时间处理
        if (time >= this._duration) {
            if (this._loop) {
                let newTime = time % this._duration;
                if (time > 0 && newTime === 0) {
                    time = this._duration;
                } else {
                    time = newTime;
                }
            } else {
                time = this._duration;
                end = true;
            }
        }

        // 如果时间没有走动跳过
        if (time == this._prevTime) {
            return end;
        }

        // 检查是否结束
        if (end) {
            this.setPaused(true);
        }

        let prevTime = this._prevTime;
        this._prevTime = time;
        this._prevPosition = position;

        if (this._target != null) {
            if (this._steps.length > 0) {
                // 查找当前时间在那个Step内
                let stepLength = this._steps.length;
                let stepIndex = -1;
                for (let i = 0; i < stepLength; i++) {
                    if (this._steps[i].type == Step.StepType.Step) {
                        stepIndex = i;
                        if (this._steps[i].time <= time && this._steps[i].time + this._steps[i].duration >= time) {
                            break;
                        }
                    }
                }
                for (let i = 0; i < stepLength; i++) {
                    if (this._steps[i].type == Step.StepType.Action) {
                        let action = this._steps[i] as Action;
                        //执行actions
                        if (runAction == true) {
                            if (time < prevTime) {
                                // 循环中的动作
                                if (prevTime != this._duration) {
                                    this.runAction(action, prevTime, this._duration);
                                }
                                this.runAction(action, 0, time, true);
                            } else {
                                this.runAction(action, prevTime, time);
                            }
                        }
                    } else if (this._steps[i].type == Step.StepType.Step) {
                        if (stepIndex == i) {
                            let step = this._steps[stepIndex];
                            this.updateTargetProps(
                                step,
                                Math.min((time - step.time) / step.duration, 1)
                            );
                        }
                    }
                }
            }
        }

        return end;
    }

    /**
     * 帧更新
     * @param delta
     */
    public tick(delta: number): void {
        if (this._paused == true) {
            return;
        }

        if (this.setPosition(this._prevPosition + delta * this._timeScale)) {
            this.setPaused(true);
        }
    }
}

namespace Tween {

    /**
     * 对对象添加一个动画
     * @param target
     * @returns
     */
    export function get<T>(target: T) {
        return new Tween<T>(target);
    }

    export function getPaused(): boolean {
        return _paused;
    }

    export function setPaused(pause: boolean) {
        _paused = pause;
    }

    export function getTimeScale(): number {
        return this._timeScale;
    }

    export function setTimeScale(timeScale: number) {
        this._timeScale = Math.max(timeScale, 0);
    }

    /**
     * 获取所有动画
     * @returns
     */
    export function getAllTweens() {
        return _tweens;
    }

    /**
     * 移除所有动画
     */
    export function removeAllTweens(): void {
        for (let i = 0, l = _tweens.length; i < l; i++) {
            let tween: Tween = _tweens[i];
            tween["_paused"] = true;
            let target = tween.getTarget();
            if (target != null) {
                target["__tweenCount"] = 0;
            }
        }
        _tweens.length = 0;
    }

    /**
     * 移除对象上所有动画
     * @param target
     * @returns
     */
    export function removeTweens<T>(target: T): void {
        if (target["__tweenCount"] == null) {
            return;
        }
        for (let i = _tweens.length - 1; i >= 0; i--) {
            if (_tweens[i].getTarget() == target) {
                _tweens[i]["_paused"] = true;
                _tweens.splice(i, 1);
            }
        }
        target["__tweenCount"] = 0;
    }

    /**
     * 暂停对象上所有动画
     * @param target
     * @returns
     */
    export function pauseTweens<T>(target: T): void {
        if (target["__tweenCount"] == null) {
            return;
        }
        for (let i = _tweens.length - 1; i >= 0; i--) {
            if (_tweens[i].getTarget() == target) {
                _tweens[i]["_paused"] = true;
            }
        }
    }

    /**
     * 恢复对象上所有动画
     * @param target
     * @returns
     */
    export function resumeTweens<T>(target: T): void {
        if (target["__tweenCount"] == null) {
            return;
        }
        for (let i = _tweens.length - 1; i >= 0; i--) {
            if (_tweens[i].getTarget() == target) {
                _tweens[i]["_paused"] = false;
            }
        }
    }

    /**
     * 完成播放某个对象的所有缓动
     * @param target
     * @returns
     */
    export function finishTweens<T>(target: T): void {
        if (target["__tweenCount"] == null) {
            return;
        }
        for (let i = _tweens.length - 1; i >= 0; i--) {
            if (_tweens[i].getTarget() == target) {
                _tweens[i].finish();
            }
        }
    }

    /**
     *  帧更新
     * @param delta
     */
    export function tick(delta: number) {
        if (_tweens.length === 0) {
            return;
        }

        _delta += delta * _timeScale;

        for (let i = _tweens.length - 1; i >= 0; i--) {
            let tween: Tween = _tweens[i];
            // 暂停判断
            if ((_paused == true && tween.getIgnoreGlobalPause() == false) || tween.getPaused() == true) {
                continue;
            }
            try {
                tween.tick(delta * _timeScale);
            } catch (error) {
                console.warn("Tween动画错误", tween, error);
                removeGlobal(tween);
            }
        }
    }

    /**
     * 差值接口
     */
    export interface IInterpolation {
        (v: number[], k: number): number;
    }

    /**
     * 差值算法
     */
    export namespace Interpolation {

        /**
         * 线性
         * @param v
         * @param k
         * @returns
         */
        export const Linear: IInterpolation = function (v, k) {
            let m = v.length - 1, f = m * k, i = Math.floor(f), fn = Utils.Linear;

            if (k < 0) return fn(v[0], v[1], f);
            if (k > 1) return fn(v[m], v[m - 1], m - f);

            return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);
        }

        /**
         * 贝塞尔曲线
         * @param v
         * @param k
         * @returns
         */
        export const Bezier: IInterpolation = function (v, k) {
            let b = 0, n = v.length - 1, pw = Math.pow, bn = Utils.Bernstein, i;

            for (i = 0; i <= n; i++) {
                b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
            }

            return b;
        }

        /**
         * 条样曲线
         * @param v
         * @param k
         * @returns
         */
        export const CatmullRom: IInterpolation = function (v, k) {
            let m = v.length - 1, f = m * k, i = Math.floor(f), fn = Utils.CatmullRom;

            if (v[0] === v[m]) {
                if (k < 0) i = Math.floor(f = m * (1 + k));

                return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
            } else {
                if (k < 0) return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
                if (k > 1) return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);

                return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
            }
        }

        /**
         * 差值工具
         */
        namespace Utils {
            export function Linear(p0: number, p1: number, t: number) {
                return (p1 - p0) * t + p0;
            }

            export function Bernstein(n: number, i: number) {
                let fc = Utils.Factorial;
                return fc(n) / fc(i) / fc(n - i);
            }

            export let Factorial = (function () {
                let a = [1];

                return function (n: number) {
                    let s = 1, i;
                    if (a[n]) return a[n];
                    for (i = n; i > 1; i--) s *= i;
                    return a[n] = s;
                };

            })()

            export function CatmullRom(p0: number, p1: number, p2: number, p3: number, t: number) {
                let v0 = (p2 - p0) * 0.5, v1 = (p3 - p1) * 0.5, t2 = t * t, t3 = t * t2;
                return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (- 3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
            }
        }
    }

    /**
     *  缓动接口
     */
    export interface IEasing {
        (k: number): number;
    }

    /**
     * 缓动算法
     */
    export namespace Easing {

        export namespace Linear {
            export const None: IEasing = function (k) {
                return k;
            }
        }

        /**
         * 自定义缓动
         * https://cubic-bezier.com/
         */
        export const CubicBezier = function (p1x: number, p1y: number, p2x: number, p2y: number) {
            if (p1x < 0) {
                p1x = 0;
            }
            if (p1x > 1) {
                p1x = 1;
            }
            if (p2x < 0) {
                p2x = 0;
            }
            if (p2x > 1) {
                p2x = 1;
            }

            const cx = 3 * p1x;
            const bx = 3 * (p2x - p1x) - cx;
            const ax = 1 - cx - bx;
            const cy = 3 * p1y;
            const by = 3 * (p2y - p1y) - cy;
            const ay = 1 - cy - by;

            /**
             * @param t - progress [0-1]
             * @return - sampled X value
             */
            const sampleCurveX = function (t: number) {
                return ((ax * t + bx) * t + cx) * t;
            }

            /**
             * @param t - progress [0-1]
             * @return - sampled Y value
             */
            const sampleCurveY = function (t: number) {
                return ((ay * t + by) * t + cy) * t;
            }

            /**
              * @param t - progress [0-1]
              * @return - sampled curve derivative X value
              */
            const sampleCurveDerivativeX = function (t: number) {
                return (3 * ax * t + 2 * bx) * t + cx;
            }

            /**
             * @param x - progress [0-1]
             * @return - solved curve X value
             */
            const solveCurveX = function (x: number) {
                // Set Precision
                const epsilon = 1e-6;

                // Skip values out of range
                if (x <= 0) return 0;
                if (x >= 1) return 1;

                let t2 = x;
                let x2 = 0;
                let d2 = 0;

                // First try a few iterations of Newton's method
                // -- usually very fast.
                for (let i = 0; i < 8; i += 1) {
                    x2 = sampleCurveX(t2) - x;
                    if (Math.abs(x2) < epsilon) return t2;
                    d2 = sampleCurveDerivativeX(t2);
                    /* istanbul ignore next */
                    if (Math.abs(d2) < epsilon) break;
                    t2 -= x2 / d2;
                }

                // No solution found - use bi-section
                let t0 = 0;
                let t1 = 1;
                t2 = x;

                while (t0 < t1) {
                    x2 = sampleCurveX(t2);
                    if (Math.abs(x2 - x) < epsilon) return t2;
                    if (x > x2) t0 = t2;
                    else t1 = t2;

                    t2 = (t1 - t0) * 0.5 + t0;
                }

                // Give up
                /* istanbul ignore next */
                return t2;
            }

            const easing: IEasing = function (k) {
                return sampleCurveY(solveCurveX(k));
            }

            return easing;
        }

        export namespace Quadratic {
            export const In: IEasing = function (k) {
                return k * k;
            }
            export const Out: IEasing = function (k) {
                return k * (2 - k);
            }
            export const InOut: IEasing = function (k) {
                if ((k *= 2) < 1) return 0.5 * k * k;
                return -0.5 * (--k * (k - 2) - 1);
            }
        }

        export namespace Cubic {
            export const In: IEasing = function (k) {
                return k * k * k;
            }
            export const Out: IEasing = function (k) {
                return --k * k * k + 1;
            }
            export const InOut: IEasing = function (k) {
                if ((k *= 2) < 1) return 0.5 * k * k * k;
                return 0.5 * ((k -= 2) * k * k + 2);
            }
        }

        export namespace Quartic {
            export const In: IEasing = function (k) {
                return k * k * k * k;
            }
            export const Out: IEasing = function (k) {
                return 1 - (--k * k * k * k);
            }
            export const InOut: IEasing = function (k) {
                if ((k *= 2) < 1) return 0.5 * k * k * k * k;
                return -0.5 * ((k -= 2) * k * k * k - 2);
            }
        }

        export namespace Quintic {
            export const In: IEasing = function (k) {
                return k * k * k * k * k;
            }
            export const Out: IEasing = function (k) {
                return --k * k * k * k * k + 1;
            }
            export const InOut: IEasing = function (k) {
                if ((k *= 2) < 1) return 0.5 * k * k * k * k * k;
                return 0.5 * ((k -= 2) * k * k * k * k + 2);
            }
        }

        export namespace Sinusoidal {
            export const In: IEasing = function (k) {
                return 1 - Math.cos(k * Math.PI / 2);
            }
            export const Out: IEasing = function (k) {
                return Math.sin(k * Math.PI / 2);
            }
            export const InOut: IEasing = function (k) {
                return 0.5 * (1 - Math.cos(Math.PI * k));
            }
        }

        export namespace Exponential {
            export const In: IEasing = function (k) {
                return k === 0 ? 0 : Math.pow(1024, k - 1);
            }
            export const Out: IEasing = function (k) {
                return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
            }
            export const InOut: IEasing = function (k) {
                if (k === 0) return 0;
                if (k === 1) return 1;
                if ((k *= 2) < 1) return 0.5 * Math.pow(1024, k - 1);
                return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
            }
        }

        export namespace Circular {
            export const In: IEasing = function (k) {
                return 1 - Math.sqrt(1 - k * k);
            }
            export const Out: IEasing = function (k) {
                return Math.sqrt(1 - (--k * k));
            }
            export const InOut: IEasing = function (k) {
                if ((k *= 2) < 1) return -0.5 * (Math.sqrt(1 - k * k) - 1);
                return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
            }
        }

        export namespace Elastic {
            export const In: IEasing = function (k) {
                var s, a = 0.1, p = 0.4;
                if (k === 0) return 0;
                if (k === 1) return 1;
                if (!a || a < 1) {
                    a = 1;
                    s = p / 4;
                }
                else s = p * Math.asin(1 / a) / (2 * Math.PI);
                return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
            }
            export const Out: IEasing = function (k) {
                var s, a = 0.1, p = 0.4;
                if (k === 0) return 0;
                if (k === 1) return 1;
                if (!a || a < 1) {
                    a = 1;
                    s = p / 4;
                }
                else s = p * Math.asin(1 / a) / (2 * Math.PI);
                return (a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1);
            }
            export const InOut: IEasing = function (k) {
                var s, a = 0.1, p = 0.4;
                if (k === 0) return 0;
                if (k === 1) return 1;
                if (!a || a < 1) {
                    a = 1;
                    s = p / 4;
                }
                else s = p * Math.asin(1 / a) / (2 * Math.PI);
                if ((k *= 2) < 1) return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
                return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
            }
        }

        export namespace Back {
            export const In: IEasing = function (k) {
                var s = 1.70158;
                return k * k * ((s + 1) * k - s);
            }
            export const Out: IEasing = function (k) {
                var s = 1.70158;
                return --k * k * ((s + 1) * k + s) + 1;
            }
            export const InOut: IEasing = function (k) {
                var s = 1.70158 * 1.525;
                if ((k *= 2) < 1) return 0.5 * (k * k * ((s + 1) * k - s));
                return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
            }
        }

        export namespace Bounce {
            export const In: IEasing = function (k) {
                return 1 - Easing.Bounce.Out(1 - k);
            }
            export const Out: IEasing = function (k) {
                if (k < (1 / 2.75)) {
                    return 7.5625 * k * k;
                } else if (k < (2 / 2.75)) {
                    return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
                } else if (k < (2.5 / 2.75)) {
                    return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
                } else {
                    return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
                }
            }
            export const InOut: IEasing = function (k) {
                if (k < 0.5) return Easing.Bounce.In(k * 2) * 0.5;
                return Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;
            }
        }
    }
}

export default Tween;