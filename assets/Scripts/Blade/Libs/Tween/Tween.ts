/**
 * 动画缓动类
 */
export default class Tween extends cc.EventTarget {
	/**
	 * 不做特殊处理
	 * @constant {number} Tween.NONE
	 * @private
	 */
	private static NONE = 0;
	/**
	 * 循环
	 * @constant {number} Tween.LOOP
	 * @private
	 */
	private static LOOP = 1;
	/**
	 * 倒序
	 * @constant {number} Tween.REVERSE
	 * @private
	 */
	private static REVERSE = 2;

	/**
	 * @private
	 */
	private static _tweens: Tween[] = [];
	/**
	 * @private
	 */
	private static IGNORE = {};
	/**
	 * @private
	 */
	private static _plugins = {};
	/**
	 * @private
	 */
	private static _inited = false;
	/**
	 * @private
	 */
	private static _cumstomTick = false;
	/**
	 * @private
	 */
	private _target: any = null;
	/**
	 * @private
	 */
	private _useTicks: boolean = false;
	/**
	 * @private
	 */
	private manualTick: boolean = false;
	/**
	 * @private
	 */
	private ignoreGlobalPause: boolean = false;
	/**
	 * @private
	 */
	private loop: boolean = false;
	/**
	 * @private
	 */
	private pluginData = null;
	/**
	 * @private
	 */
	private _curQueueProps;
	/**
	 * @private
	 */
	private _initQueueProps;
	/**
	 * @private
	 */
	private _steps: any[] = null;
	/**
	 * @private
	 */
	private paused: boolean = false;
	/**
	 * @private
	 */
	private duration: number = 0;
	/**
	 * @private
	 */
	private _prevPos: number = -1;
	/**
	 * @private
	 */
	private position: number = null;
	/**
	 * @private
	 */
	private _prevPosition: number = 0;
	/**
	 * @private
	 */
	private _stepPosition: number = 0;
	/**
	 * @private
	 */
	private passive: boolean = false;
	/**
	 * @private
	 */
	private _timeScale: number = 1;

	/**
	 * 激活一个对象, 对其添加 Tween 动画
	 * @param target {any} 要激活 Tween 的对象
	 * @param props {any} 参数, 支持loop(循环播放) onChange(变化函数) onChangeObj(变化函数作用域)
	 * @param pluginData {any} 暂未实现
	 * @param override {boolean} 是否移除对象之前添加的tween, 默认值false
	 * 不建议使用, 可使用 Tween.removeTweens(target) 代替
	 */
	public static get(
		target: any,
		props?: { loop?: boolean; manualTick?: boolean; onChange?: Function; onChangeObj?: any },
		pluginData: any = null,
		override: boolean = false
	): Tween {
		if (override) {
			Tween.removeTweens(target);
		}
		return new Tween(target, props, pluginData);
	}

	/**
	 * 删除一个对象上的全部 Tween 动画
	 * @param target  需要移除 Tween 的对象
	 */
	public static removeTweens(target: any): void {
		if (!target.__tweenCount) {
			return;
		}
		let tweens: Tween[] = Tween._tweens;
		for (let i = tweens.length - 1; i >= 0; i--) {
			if (tweens[i]._target == target) {
				tweens[i].paused = true;
				tweens.splice(i, 1);
			}
		}
		target.__tweenCount = 0;
	}

	/**
	 * 暂停某个对象的所有 Tween
	 * @param target 要暂停 Tween 的对象
	 */
	public static pauseTweens(target: any): void {
		if (!target.__tweenCount) {
			return;
		}
		let tweens: Tween[] = Tween._tweens;
		for (let i = tweens.length - 1; i >= 0; i--) {
			if (tweens[i]._target == target) {
				tweens[i].paused = true;
			}
		}
	}

	/**
	 * 继续播放某个对象的所有缓动
	 * @param target 要继续播放 Tween 的对象
	 */
	public static resumeTweens(target: any): void {
		if (!target.__tweenCount) {
			return;
		}
		let tweens: Tween[] = Tween._tweens;
		for (let i = tweens.length - 1; i >= 0; i--) {
			if (tweens[i]._target == target) {
				tweens[i].paused = false;
			}
		}
	}

	/**
	 * 是否设为自定义更新, 初始化前设置
	 * 需要自己每帧调用tick方法
	 */
	public static set customTick(custom: boolean) {
		if (Tween._cumstomTick != custom) {
			Tween._cumstomTick = custom;
			if (custom == true && Tween._inited && Tween._intervalId > 0) {
				clearInterval(Tween._intervalId);
				Tween._intervalId = -1;
			}
		}
	}

	/**
	 * 帧更新调用
	 * @param delta
	 * @param paused
	 */
	public static tick(paused = false): boolean {
		const timeStamp = Date.now();
		if (Tween._lastTime <= 0) {
			Tween._lastTime = timeStamp;
			return;
		}

		const delta = timeStamp - Tween._lastTime;
		Tween._lastTime = timeStamp;

		let tweens: Tween[] = Tween._tweens.concat();
		for (let i = tweens.length - 1; i >= 0; i--) {
			let tween: Tween = tweens[i];
			if ((paused && !tween.ignoreGlobalPause) || tween.paused || tween.manualTick) {
				continue;
			}
			tween.tick(tween._useTicks ? 1 : delta);
		}

		return false;
	}

	private static _lastTime: number = 0;
	private static _intervalId: number = -1;
	/**
	 * @private
	 *
	 * @param tween
	 * @param value
	 */
	private static _register(tween: Tween, value: boolean): void {
		let target: any = tween._target;
		let tweens: Tween[] = Tween._tweens;
		if (value) {
			if (target) {
				target.__tweenCount = target.__tweenCount > 0 ? target.__tweenCount + 1 : 1;
			}
			tweens.push(tween);
			if (!Tween._inited) {
				Tween._lastTime = Date.now();
				if (!Tween._cumstomTick) {
					Tween._intervalId = setInterval(Tween.tick, 1000 / cc.game.getFrameRate());
				}
				Tween._inited = true;
			}
		} else {
			if (target) {
				target.__tweenCount--;
			}
			let i = tweens.length;
			while (i--) {
				if (tweens[i] == tween) {
					tweens.splice(i, 1);
					return;
				}
			}
		}
	}

	/**
	 * 删除所有 Tween
	 */
	public static removeAllTweens(): void {
		let tweens: Tween[] = Tween._tweens;
		for (let i = 0, l = tweens.length; i < l; i++) {
			let tween: Tween = tweens[i];
			tween.paused = true;
			tween._target.__tweenCount = 0;
		}
		tweens.length = 0;
	}

	/**
	 * 创建一个 Tween 对象
	 */
	constructor(
		target: any,
		props: {
			loop?: boolean;
			manualTick?: boolean;
			paused?: boolean;
			onChange?: Function;
			onChangeObj?: any;
		},
		pluginData: any = null
	) {
		super();
		this.initialize(target, props, pluginData);
	}

	/**
	 * @private
	 *
	 * @param target
	 * @param props
	 * @param pluginData
	 */
	private initialize(target: any, props: any, pluginData: any): void {
		this._target = target;
		if (props) {
			this._useTicks = props.useTicks;
			this.manualTick = props.manualTick === true;
			this.ignoreGlobalPause = props.ignoreGlobalPause;
			this.loop = props.loop === true;
			props.onChange && this.on("change", props.onChange, props.onChangeObj);
			if (props.override) {
				Tween.removeTweens(target);
			}
		}

		this.pluginData = pluginData || {};
		this._curQueueProps = {};
		this._initQueueProps = {};
		this._steps = [];
		if (props && props.paused) {
			this.paused = true;
		} else {
			Tween._register(this, true);
		}
		if (props && props.position != null) {
			this.setPosition(props.position, Tween.NONE);
		}
	}

	/**
	 * 重置时间
	 */
	public resetPosition() {
		this._prevPosition = 0;
		this._prevPos = -1;
	}

	/**
	 * @private
	 *
	 * @param value
	 * @param actionsMode
	 * @returns
	 */
	private setPosition(value: number, actionsMode: number = 1): boolean {
		if (value < 0) {
			value = 0;
		}

		//正常化位置
		let t: number = value;
		let end: boolean = false;
		if (t >= this.duration) {
			if (this.loop) {
				var newTime = t % this.duration;
				if (t > 0 && newTime === 0) {
					t = this.duration;
				} else {
					t = newTime;
				}
			} else {
				t = this.duration;
				end = true;
			}
		}
		if (t == this._prevPos) {
			return end;
		}

		if (end) {
			this.setPaused(true);
		}

		let prevPos = this._prevPos;
		this.position = this._prevPos = t;
		this._prevPosition = value;

		if (this._target) {
			if (this._steps.length > 0) {
				// 找到新的tween
				let l = this._steps.length;
				let stepIndex = -1;
				for (let i = 0; i < l; i++) {
					if (this._steps[i].type == "step") {
						stepIndex = i;
						if (this._steps[i].t <= t && this._steps[i].t + this._steps[i].d >= t) {
							break;
						}
					}
				}
				for (let i = 0; i < l; i++) {
					if (this._steps[i].type == "action") {
						//执行actions
						if (actionsMode != 0) {
							if (this._useTicks) {
								this._runAction(this._steps[i], t, t);
							} else if (actionsMode == 1 && t < prevPos) {
								if (prevPos != this.duration) {
									this._runAction(this._steps[i], prevPos, this.duration);
								}
								this._runAction(this._steps[i], 0, t, true);
							} else {
								this._runAction(this._steps[i], prevPos, t);
							}
						}
					} else if (this._steps[i].type == "step") {
						if (stepIndex == i) {
							let step = this._steps[stepIndex];
							this._updateTargetProps(
								step,
								Math.min((this._stepPosition = t - step.t) / step.d, 1)
							);
						}
					}
				}
			}
		}

		this.emit("change");
		return end;
	}

	/**
	 * @private
	 *
	 * @param startPos
	 * @param endPos
	 * @param includeStart
	 */
	private _runAction(
		action: any,
		startPos: number,
		endPos: number,
		includeStart: boolean = false
	) {
		let sPos: number = startPos;
		let ePos: number = endPos;
		if (startPos > endPos) {
			//把所有的倒置
			sPos = endPos;
			ePos = startPos;
		}
		let pos = action.t;
		if (pos == ePos || (pos > sPos && pos < ePos) || (includeStart && pos == startPos)) {
			action.f.apply(action.o, action.p);
		}
	}

	/**
	 * @private
	 *
	 * @param step
	 * @param ratio
	 */
	private _updateTargetProps(step: any, ratio: number) {
		let p0, p1, v, v0, v1, arr;
		if (!step && ratio == 1) {
			this.passive = false;
			p0 = p1 = this._curQueueProps;
		} else {
			this.passive = !!step.v;
			//不更新props.
			if (this.passive) {
				return;
			}
			//使用ease
			if (step.e) {
				ratio = step.e(ratio, 0, 1, 1);
			}
			p0 = step.p0;
			p1 = step.p1;
		}

		for (let n in this._initQueueProps) {
			if ((v0 = p0[n]) == null) {
				p0[n] = v0 = this._initQueueProps[n];
			}
			if ((v1 = p1[n]) == null) {
				p1[n] = v1 = v0;
			}
			if (v0 == v1 || ratio == 0 || ratio == 1 || typeof v0 != "number") {
				v = ratio == 1 ? v1 : v0;
			} else {
				v = v0 + (v1 - v0) * ratio;
			}

			let ignore = false;
			if ((arr = Tween._plugins[n])) {
				for (let i = 0, l = arr.length; i < l; i++) {
					let v2 = arr[i].tween(this, n, v, p0, p1, ratio, !!step && p0 == p1, !step);
					if (v2 == Tween.IGNORE) {
						ignore = true;
					} else {
						v = v2;
					}
				}
			}
			if (!ignore) {
				this._target[n] = v;
			}
		}
	}

	/**
	 * 设置是否暂停
	 * @param value {boolean} 是否暂停
	 * @returns Tween对象本身
	 */
	public setPaused(value: boolean): Tween {
		if (this.paused == value) {
			return this;
		}
		this.paused = value;
		if (!this.manualTick) {
			Tween._register(this, !value);
		}
		return this;
	}

	/**
	 * 重新播放
	 */
	public replay() {
		this.resetPosition();
		this.setPaused(false);
	}

	/**
	 * @private
	 *
	 * @param props
	 * @returns
	 */
	private _cloneProps(props: any): any {
		let o = {};
		for (let n in props) {
			o[n] = props[n];
		}
		return o;
	}

	/**
	 * @private
	 *
	 * @param o
	 * @returns
	 */
	private _addStep(o): Tween {
		if (o.d > 0) {
			o.type = "step";
			this._steps.push(o);
			o.t = this.duration;
			this.duration += o.d;
		}
		return this;
	}

	/**
	 * @private
	 *
	 * @param o
	 * @returns
	 */
	private _appendQueueProps(o): any {
		let arr, oldValue, i, l, injectProps;
		for (let n in o) {
			if (this._initQueueProps[n] === undefined) {
				oldValue = this._target[n];
				//设置plugins
				if ((arr = Tween._plugins[n])) {
					for (i = 0, l = arr.length; i < l; i++) {
						oldValue = arr[i].init(this, n, oldValue);
					}
				}
				this._initQueueProps[n] = this._curQueueProps[n] =
					oldValue === undefined ? null : oldValue;
			} else {
				oldValue = this._curQueueProps[n];
			}
		}

		for (let n in o) {
			oldValue = this._curQueueProps[n];
			if ((arr = Tween._plugins[n])) {
				injectProps = injectProps || {};
				for (i = 0, l = arr.length; i < l; i++) {
					if (arr[i].step) {
						arr[i].step(this, n, oldValue, o[n], injectProps);
					}
				}
			}
			this._curQueueProps[n] = o[n];
		}
		if (injectProps) {
			this._appendQueueProps(injectProps);
		}
		return this._curQueueProps;
	}

	/**
	 * @private
	 *
	 * @param o
	 * @returns
	 */
	private _addAction(o): Tween {
		o.t = this.duration;
		o.type = "action";
		this._steps.push(o);
		return this;
	}

	/**
	 * @private
	 *
	 * @param props
	 * @param o
	 */
	private _set(props: any, o): void {
		for (let n in props) {
			o[n] = props[n];
		}
	}

	/**
	 * 等待指定毫秒后执行下一个动画
	 * @param duration {number} 要等待的时间, 以毫秒为单位
	 * @param passive {boolean} 等待期间属性是否会更新
	 * @returns Tween对象本身
	 */
	public wait(duration: number, passive?: boolean): Tween {
		if (duration == null || duration <= 0) {
			return this;
		}
		let o = this._cloneProps(this._curQueueProps);
		return this._addStep({ d: duration, p0: o, p1: o, v: passive });
	}

	/**
	 * 将指定对象的属性修改为指定值
	 * @param props {Object} 对象的属性集合
	 * @param duration {number} 持续时间
	 * @param ease {Ease} 缓动算法
	 * @returns {Tween} Tween对象本身
	 */
	public to(props: any, duration?: number, ease: Function = undefined) {
		if (isNaN(duration) || duration < 0) {
			duration = 0;
		}
		this._addStep({
			d: duration || 0,
			p0: this._cloneProps(this._curQueueProps),
			e: ease,
			p1: this._cloneProps(this._appendQueueProps(props)),
		});
		//加入一步set, 防止游戏极其卡顿时候, to后面的call取到的属性值不对
		return this.set(props);
	}

	/**
	 * 执行回调函数
	 * @param callback {Function} 回调方法
	 * @param thisObj {any} 回调方法this作用域
	 * @param params {any[]} 回调方法参数
	 * @returns {Tween} Tween对象本身
	 * @example
	 * <pre>
	 *  Tween.get(display).call(function (a:number, b:string) {
	 *      console.log("a: " + a); //对应传入的第一个参数 233
	 *      console.log("b: " + b); //对应传入的第二个参数 “hello”
	 *  }, this, [233, "hello"]);
	 * </pre>
	 */
	public call(callback: Function, thisObj: any = undefined, params: any[] = undefined): Tween {
		return this._addAction({
			f: callback,
			p: params ? params : [],
			o: thisObj ? thisObj : this._target,
		});
	}

	/**
	 * 立即将指定对象的属性修改为指定值
	 * @param props {Object} 对象的属性集合
	 * @param target 要继续播放 Tween 的对象
	 * @returns {Tween} Tween对象本身
	 */
	public set(props: any, target = null): Tween {
		//更新当前数据, 保证缓动流畅性
		this._appendQueueProps(props);
		return this._addAction({
			f: this._set,
			o: this,
			p: [props, target ? target : this._target],
		});
	}

	/**
	 * 设置时间倍数
	 * @param scale
	 */
	public setTimeScale(scale: number): Tween {
		this._timeScale = scale;
		return this;
	}

	/**
	 * 获取当前时间倍数
	 */
	public timeScale() {
		return this._timeScale;
	}

	/**
	 * 执行
	 * @param tween {Tween} 需要操作的 Tween 对象, 默认this
	 * @returns {Tween} Tween对象本身
	 */
	public play(tween?: Tween): Tween {
		if (!tween) {
			tween = this;
		}
		return this.call(tween.setPaused, tween, [false]);
	}

	/**
	 * 暂停
	 * @param tween {Tween} 需要操作的 Tween 对象, 默认this
	 * @returns {Tween} Tween对象本身
	 */
	public pause(tween?: Tween): Tween {
		if (!tween) {
			tween = this;
		}
		return this.call(tween.setPaused, tween, [true]);
	}

	/**
	 * 帧更新
	 * @param delta {number}
	 * @private
	 */
	public tick(delta: number): void {
		if (this.paused || delta <= 0) {
			return;
		}
		this.setPosition(this._prevPosition + delta * this._timeScale);
	}
}
