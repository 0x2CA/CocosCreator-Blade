import ActorBase from "./ActorBase";

/**
 * 角色基类
 */
export default abstract class CharacterBase<
    T = any,
    A extends AttributeBase<T> = any,
    S extends SkillBase = any,
    B extends BuffBase = any,
    SD extends SkillDealWithBase = any,
    DD extends DamageDealWithBase = any,
> extends ActorBase {

    /**
     * 是否死亡
     */
    protected _isDead: boolean = false;

    /**
     * 所有属性
     */
    protected _attribles: A = null;

    /**
     * 所有技能
     */
    protected _skills: S[] = [];

    /**
     * 所有buff
     */
    protected _buffs: B[] = [];

    /**
     * 进行的伤害流程
     */
    protected _skillDealWith: SD = null;

    public constructor(id: string) {
        super(id);
    }

    /**
     * 是否死亡
     * @returns
     */
    public isDead(): boolean {
        return this._isDead;
    }

    /**
     * 获取指定属性
     * @param id
     * @param defaultValue
     * @returns
     */
    public getAttrible(id: T, defaultValue: number = 0): number {
        let attrible = this._attribles.get(id, defaultValue);

        for (let buff of this._buffs) {
            attrible = buff.onAttrible(id, attrible);
        }

        return attrible;
    }

    /**
    * 设置指定属性
    * @param id
    * @param value
    * @returns
    */
    public setAttrible(id: T, value: number = 0) {
        this._attribles.set(id, value);
    }

    /**
     * 获取所有Buff
     * @returns
     */
    public getBuffs(): B[] {
        return this._buffs;
    }

    /**
    * 是否可以被杀死
    */
    public abstract canKill(damageDealWith: DD): boolean;

    /**
     * 角色死亡
     */
    public abstract onKill(damageDealWith: DD): void;

    /**
     * 角色是否可以释放技能(是否有技能正在处理，有技能处理判断是否可以取消)
     * @returns
     */
    public canSkill() {
        if (this._skillDealWith != null && this._skillDealWith.isFinish() == false && this._skillDealWith.getSkill().canCancel() == false) {
            return false;
        }

        return true;
    }

    /**
     * 角色取消正在释放技能（可能不成功）
     */
    public cancelSkill(isForce: boolean = false) {
        if (this._skillDealWith != null && this._skillDealWith.isFinish() == false && (this._skillDealWith.getSkill().canCancel() == true || isForce == true)) {
            this._skillDealWith.cancel();
            this._skillDealWith = null;
            return true;
        }
        return false;
    }

    /**
     * 角色释放技能
     * @param skillId
     * @returns
     */
    public skill(skill: S): SD {
        if (this.canSkill() == false) {
            console.warn("角色正在释放技能，且技能处理不可取消，不能释放新的技能");
            return null;
        }

        if (this._skillDealWith != null) {
            this._skillDealWith.cancel();
            this._skillDealWith = null;
        }

        let skillDealWithBase = skill.skill();

        if (skillDealWithBase == null) {
            return null;
        }

        for (let buff of this._buffs) {
            if (buff.isValid() == true) {

                // buff处理技能释放(允许buff拦截技能、修改技能)
                skillDealWithBase = buff.onBeforeSkill(skillDealWithBase);

                if (skillDealWithBase == null) {
                    return null;
                }
            }
        }

        this._skillDealWith = skillDealWithBase;

        // 释放技能成功
        skill.onSkill(this._skillDealWith);

        for (let buff of this._buffs) {
            if (buff.isValid() == true) {
                // 释放技能成功
                buff.onSkill(skillDealWithBase);
            }
        }

        return this._skillDealWith;
    }

    public getSkillDealWith() {
        return this._skillDealWith;
    }

    /**
     * 通过buffId获取buff
     * @param buffId
     * @returns
     */
    public getBuff<T extends B>(buffId: string): T {
        for (let buff of this._buffs) {
            if (buff.getBuffId() === buffId) {
                return buff as T;
            }
        }
        return null;
    }

    /**
    * 通过标签获取buff
    * @param buffId
    * @returns
    */
    public getBuffByTag<T extends B>(tag: string): T {
        for (let buff of this._buffs) {
            if (buff.hasTag(tag)) {
                return buff as T;
            }
        }
        return null;
    }

    /**
     * 添加buff到对象
     * @param buff
     * @returns
     */
    public addBuff(buff: B) {
        if (buff.isValid() == false) {
            console.warn("尝试添加一个已经失效的buff", buff.getBuffId());
            return false;
        }

        if (buff.getOwner() != this) {
            console.warn("尝试添加一个目标不是当前角色的buff", buff.getBuffId(), this._id);
            return false;
        }

        if (this.getBuff(buff.getBuffId()) != null) {
            console.warn("尝试添加一个重复的buff", buff.getBuffId());
            return false;
        }

        for (let index = 0; index < this._buffs.length; index++) {
            const currentBuff = this._buffs[index];
            if (buff.getPriority() > currentBuff.getPriority()) {
                // 当前权重更大,插入当前位置(权重排序,先后排序)
                this._buffs.splice(index, 0, buff);
                buff.onAdd();
                return true;
            }
        }

        this._buffs.push(buff);
        buff.onAdd();
        return true;
    }

    /**
     * 移除指定buff
     * @param buffId
     * @returns
     */
    public removeBuff(buffId: string) {
        for (let index = 0; index < this._buffs.length; index++) {
            const buff = this._buffs[index];
            if (buff.getBuffId() == buffId) {
                buff.onRemove();
                this._buffs.splice(index, 1);
                return true;
            }
        }

        return false;
    }

    /**
     * 获取指定技能
     * @param id
     * @returns
     */
    public getSkill<T extends S>(id: string): T {
        for (let skill of this._skills) {
            if (skill.getSkillId() == id) {
                return skill as T;
            }
        }
        return null;
    }

    /**
     * 获取所有技能
     * @returns
     */
    public getSkills<T extends S>(): T[] {
        return this._skills as T[];
    }

    /**
     * 更新Tick
     * @param delta number
     */
    public tick(delta: number): void {

        // 如果角色未死亡更新技能、buff
        if (this._isDead == false) {

            // 更新技能
            for (let skill of this._skills) {
                skill.tick(delta);
            }

            // 更新Buff
            for (let index = this._buffs.length - 1; index >= 0; index--) {
                let buff = this._buffs[index];
                buff.tick(delta);

                // 如果buff已经失效，则移除
                if (buff.isValid() == false) {
                    this.removeBuff(buff.getBuffId());
                }
            }

            // 更新技能处理
            if (this._skillDealWith != null && this._skillDealWith.isFinish() == false) {
                this._skillDealWith.dealWith(delta);
            } else {
                this._skillDealWith = null;
            }
        }

        this.onTick(delta);
    }

    /**
     * 刷新
     * @param delta
     */
    protected abstract onTick(delta: number);
}

import AttributeBase from "../AttributeBase";
import BuffBase from "../BuffBase";
import DamageDealWithBase from "../DealWith/DamageDealWithBase";
import SkillDealWithBase from "../DealWith/SkillDealWithBase";
import SkillBase from "../SkillBase";

