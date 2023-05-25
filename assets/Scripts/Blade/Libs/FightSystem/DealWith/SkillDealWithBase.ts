import DealWithBase from "./DealWithBase";

/**
 * 技能处理基类
 */
export default abstract class SkillDealWithBase<
    C extends CharacterBase = any,
    S extends SkillBase = any,
    BD extends BuffDealWithBase<C> = any
> extends DealWithBase {

    /**
     * 释放的技能
     */
    protected _skill: S = null;

    /**
     * 拥有者
     */
    protected _owner: C = null;

    /**
    * 伤害处理过程buff所有处理
    */
    protected _buffDealWiths: BD[] = [];


    public constructor(skill: S, owner: C) {
        super();
        this._skill = skill;
        this._owner = owner;
    }

    /**
     * 获取技能
     * @returns
     */
    public getSkill(): S {
        return this._skill;
    }

    /**
     * 获取拥有者
     * @returns
     */
    public getOwner(): C {
        return this._owner;
    }

    /**
    * 添加一个buff处理
    * @param buffDealWith
    */
    public addBuffDealWith(buffDealWith: BD) {
        this._buffDealWiths.push(buffDealWith);
    }

    /**
     * 取消处理(技能被打断)
     */
    public abstract cancel();

    /**
     * 处理技能
     * @param delta
     * @returns
     */
    public dealWith(delta: number) {
        if (this.isFinish() == true) {
            console.warn("技能处理已经处理完成了");
            return;
        }

        this.onDealWith(delta);

        // 处理所有buff处理
        for (let buffDealWith of this._buffDealWiths) {
            buffDealWith.dealWith();
        }
        this._buffDealWiths = [];
    }

    /**
     * 处理技能
     * @param delta
     */
    protected abstract onDealWith(delta: number);

    /**
     * 判断时间是否在区间内 [minTime, maxTime)
     * @param minTime
     * @param maxTime
     * @param time
     * @returns
     */
    protected isInTime(minTime, maxTime, time) {
        if (minTime == null || maxTime == null) {
            return true;
        }

        if (minTime > maxTime) {
            return false;
        }

        if (time >= minTime && time < maxTime) {
            return true;
        }

        return false;
    }
}

import CharacterBase from "../Actor/CharacterBase";
import SkillBase from "../SkillBase";
import BuffDealWithBase from "./BuffDealWithBase";

