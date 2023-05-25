/**
 * Buff基类
 */
export default abstract class BuffBase<
    T = any,
    C extends CharacterBase = any,
    SD extends SkillDealWithBase = any,
    DD extends DamageDealWithBase = any,
    BD extends BuffDealWithBase = any
>{
    /**
    * BuffId
    */
    protected _buffId: string = "";

    /**
     * 标签（用于筛选）
     */
    protected _tags: string[] = [];

    /**
     * 权重（用于优先级处理,越大优先级别越高）
     */
    protected _priority: number = 0;

    /**
     * 参数
     */
    protected _params: any[] = [];

    /**
     * 层数(如果可以叠加的话)
     */
    protected _layer: number = 0;

    /**
     * 最大层数(-1无限制)
     */
    protected _maxLayer: number = -1;

    /**
     * 持续时间（毫秒），如果为-1者永久生效，时间为0移除
     */
    protected _duration: number = 0;

    /**
     * 过去时间
     */
    protected _elapsed: number = 0;

    /**
     * 触发间隔(毫秒)，如果为-1者永远不会触发tick,如果为0则会每帧触发tick
     */
    protected _tickTime: number = -1;

    /**
     * 触发次数
     */
    protected _tickCount: number = 0;

    /**
     * 拥有者
     */
    protected _owner: C;

    /**
     * 释放者(可能为空)
    */
    protected _caster: C;

    /**
     * 是否自动减层
     */
    protected _isAutoSubLayer: boolean = true;

    public constructor(
        buffId: string,
        layer: number,
        owner: C,
        caster?: C
    ) {
        this._buffId = buffId;
        this._layer = layer;
        this._owner = owner;
        this._caster = caster;
    }

    public getDuration() {
        if (this._duration == -1) {
            return this._duration;
        } else {
            let timeInc = 10000;

            let buffs = this._owner.getBuffs();
            for (let index = 0; index < buffs.length; index++) {
                const buff = buffs[index];
                timeInc = buff.onDurationInc(this, timeInc);
            }

            return this._duration * Math.max(0, timeInc / 10000);
        }
    }

    protected abstract onDurationInc(buff: BuffBase, durationInc: number): number;

    /**
     * BuffId
     * @returns
     */
    public getBuffId(): string {
        return this._buffId;
    }

    /**
     * 获取权重
     * @returns number
     */
    public getPriority(): number {
        return this._priority;
    }

    /**
     * 是否有效
     * @returns boolean
     */
    public isValid(): boolean {
        // 没有层数
        if (this._layer <= 0) {
            return false;
        }

        let duration = this.getDuration();

        if (this._isAutoSubLayer == true) {
            // 只有一层，但是时间已超过最大时间
            if (this._layer == 1) {
                if (duration > 0 && this._elapsed >= duration) {
                    return false;
                } else if (duration == 0 && this._elapsed > duration) {
                    return false;
                }
            }
        } else {
            // 时间已超过最大时间
            if (duration > 0 && this._elapsed >= duration) {
                return false;
            } else if (duration == 0 && this._elapsed > duration) {
                return false;
            }
        }

        return true;
    }

    /**
     * 获取拥有者
     * @returns
     */
    public getOwner() {
        return this._owner;
    }

    /**
     * 获取释放者
     * @returns
     */
    public getCaster() {
        return this._caster;
    }

    /**
     * 是否拥有某个标签
     * @param tag
     * @returns boolean
     */
    public hasTag(tag: string): boolean {
        return this._tags.indexOf(tag) != -1;
    }

    public getLayer(): number {
        return this._layer;
    }

    /**
     * 添加层
     * @param layer
     */
    public addLayer(layer: number): void {

        layer = Math.abs(Math.floor(layer));

        this.setLayer(this._layer + layer);
    }

    /**
     * 设定层数
     * @param layer
     */
    public setLayer(layer: number): void {
        layer = Math.abs(Math.floor(layer));

        this._layer = layer;

        if (layer > 0) {
            // 非多层时间累加类型buff，加层就重置
            if (this._isAutoSubLayer == false) {
                this._elapsed = 0;
                this._tickCount = 0;
            }
        }

        if (this._maxLayer != -1) {
            if (this._layer > this._maxLayer) {
                this._layer = this._maxLayer;
            }
        }
    }

    public getElapsed() {
        return this._elapsed;
    }

    public setElapsed(elapsed: number) {
        this._elapsed = elapsed;
    }

    public getTickCount() {
        return this._tickCount;
    }

    public setTickCount(tickCount: number) {
        this._tickCount = tickCount;
    }

    /**
     * 添加buff前(给予机会拦截或者修改,处理了需要返回false)
     * @param buffDealWith
     */
    public abstract onAddAsk(buffDealWith: BD): boolean;

    /**
     * buff被添加到角色
     */
    public abstract onAdd(): void;

    /**
     * buff被移除
     */
    public abstract onRemove(): void;

    /**
     * 属性回调(对属性的增益、减益在这里处理)
     * @param id
     * @param value
     */
    public abstract onAttrible(id: T, value: number): number

    /**
     * 拥有者攻击之前(如果有增益什么的可以处理，比如增加伤害)
     * @param damageDeal
     */
    public abstract onBeforeAttack(damageDealWith: DD): void;

    /**
     * 拥有者被攻击之前（如果有减益什么的可以处理，比如减少伤害）
     * @param damageDeal
     */
    public abstract onBeforeDefense(damageDealWith: DD): void;

    /**
    * 拥有者攻击
    * @param damageDeal
    */
    public abstract onAttack(damageDealWith: DD): void;

    /**
     * 拥有者被攻击（可以做反伤）
     * @param damageDeal
     */
    public abstract onDefense(damageDealWith: DD): void;

    /**
     * 拥有者角色被杀死前回调（给最后机会，如果有免死需要在这里实现,处理了需要返回false）
     * @param damageDealWith
     */
    public abstract onBeforeKill(damageDealWith: DD): boolean;

    /**
     * 拥有者角色击败对方回调
     * @param damageDealWith
     */
    public abstract onDefeat(damageDealWith: DD): void;

    /**
     * 拥有者被杀死
     * @param damageDealWith
     */
    public abstract onKill(damageDealWith: DD): void;

    /**
     * 拥有者释放技能之前(实现Buff对技能的修改)
     * @param skillDealWith
     */
    public abstract onBeforeSkill(skillDealWith: SD): SD;

    /**
     * 拥有者释放技能
     * @param skillDealWith
     */
    public abstract onSkill(skillDealWith: SD): void;

    /**
     * 定时回调
     */
    public abstract onTick(): void;

    /**
     * 刷新
     * @param delta
     * @returns
     */
    public tick(delta: number): void {

        if (this.isValid() == false) {
            return;
        }

        this._elapsed += delta;

        if (this._tickTime >= 0) {
            // 判断是否满足触发条件
            if (this._elapsed >= (this._tickCount + 1) * this._tickTime) {
                this._tickCount++;
                this.onTick();
            }
        }

        let duration = this.getDuration();

        if (this._isAutoSubLayer == true) {
            if (this._layer > 1 && duration >= 0 && this._elapsed >= duration) {
                // 多层，时间结束层数减一
                this._elapsed = 0;
                this._tickCount = 0;
                this._layer -= 1;
            }
        }
    }

}

import CharacterBase from "./Actor/CharacterBase";
import BuffDealWithBase from "./DealWith/BuffDealWithBase";
import DamageDealWithBase from "./DealWith/DamageDealWithBase";
import SkillDealWithBase from "./DealWith/SkillDealWithBase";

