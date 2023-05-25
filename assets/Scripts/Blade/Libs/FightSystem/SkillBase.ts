/**
 * 技能基类
 */
export default abstract class SkillBase<
    C extends CharacterBase = any,
    SD extends SkillDealWithBase = any
>{

    /**
     * 技能id
     */
    protected _skillId: string = "";

    /**
     * 技能拥有者
     */
    protected _owner: C = null;

    public constructor(
        skillId: string,
        owner: C
    ) {
        this._skillId = skillId;
        this._owner = owner;
    }

    /**
     * 是否可以取消
     */
    public abstract canCancel(): boolean;

    /**
    * 获取拥有者
    * @returns
    */
    protected getOwner() {
        return this._owner;
    }

    /**
     * 获取技能id
     * @returns string
     */
    public getSkillId(): string {
        return this._skillId;
    }

    /**
     * 释放回调(处理cd、消耗等)
     * @param skillDealWithBase
     */
    public abstract onSkill(skillDealWithBase: SD): void;

    /**
     * 释放技能(处理条件判断，创建技能处理对象)
     */
    public abstract skill(): SD;

    /**
     * 技能刷新(刷新cd等)
     * @param delta
     */
    public abstract tick(delta: number);

}

import CharacterBase from "./Actor/CharacterBase";
import SkillDealWithBase from "./DealWith/SkillDealWithBase";

