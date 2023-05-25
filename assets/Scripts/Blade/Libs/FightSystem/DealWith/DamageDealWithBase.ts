import DealWithBase from "./DealWithBase";

/**
 * 伤害处理基类
 */
abstract class DamageDealWithBase<
    C extends CharacterBase = any,
    BD extends BuffDealWithBase<C> = any
> extends DealWithBase {

    // 伤害类型标签(可以用于筛选)
    protected _tags: string[] = [];

    /**
     * 攻击角色(可能为空)
     */
    protected _attack: C = null;

    /**
     * 被攻击角色
     */
    protected _defense: C = null;

    /**
     * 伤害处理过程buff所有处理
     */
    protected _buffDealWiths: BD[] = [];

    /**
     * 是否杀死目标
     */
    protected _isKillDefense: boolean = false;

    public constructor(
        tags: string[],
        defense: C,
        attack?: C
    ) {
        super();
        this._tags = tags;
        this._defense = defense;
        this._attack = attack;
    }

    /**
    * 是否拥有某个标签
    * @param tag
    * @returns boolean
    */
    public hasTag(tag: string): boolean {
        return this._tags.indexOf(tag) != -1;
    }

    /**
     * 是否为治疗类型
     */
    public abstract isHeal(): boolean;

    /**
     * 计算最终伤害值、治疗值，在这里处理命中暴击等
     */
    public abstract calculateDamage();

    /**
     * 添加一个buff处理
     * @param buffDealWith
     */
    public addBuffDealWith(buffDealWith: BD) {
        this._buffDealWiths.push(buffDealWith);
    }

    public dealWith() {
        if (this.isFinish() == true) {
            console.warn("伤害处理已经处理过了");
            return;
        }

        if (this._defense == null || this._defense.isDead() == true) {
            // console.warn("伤害处理时被攻击角色不存在或者死亡");
            return;
        }

        // 先走攻击者攻击回调
        if (this._attack && this._attack.isDead() == false) {
            for (let buff of this._attack.getBuffs()) {
                if (buff.isValid() == true) {
                    buff.onBeforeAttack(this);
                }
            }
        }

        // 再走被攻击者的被攻击回调
        for (let buff of this._defense.getBuffs()) {
            if (buff.isValid() == true) {
                buff.onBeforeDefense(this);
            }
        }

        // 计算伤害
        this.calculateDamage();

        // 先走攻击者攻击回调
        if (this._attack && this._attack.isDead() == false) {
            for (let buff of this._attack.getBuffs()) {
                if (buff.isValid() == true) {
                    buff.onAttack(this);
                }
            }
        }

        // 再走被攻击者的被攻击回调
        for (let buff of this._defense.getBuffs()) {
            if (buff.isValid() == true) {
                buff.onDefense(this);
            }
        }

        // 被攻击者死亡查询
        if (this._defense.canKill(this)) {
            // 这个伤害可以杀死被攻击者

            // 走死亡前回调，给予机会处理,可以处理复活等
            for (let buff of this._defense.getBuffs()) {
                if (buff.isValid() == true) {
                    if (buff.onBeforeKill(this) == false) {
                        // 复活
                        break;
                    }
                }
            }

            // 再走被攻击者死亡查询
            if (this._defense.canKill(this)) {
                this._isKillDefense = true;

                // 攻击者击败对方
                if (this._attack && this._attack.isDead() == false) {
                    for (let buff of this._attack.getBuffs()) {
                        if (buff.isValid() == true) {
                            buff.onDefeat(this);
                        }
                    }
                }

                // 被攻击者死亡
                for (let buff of this._defense.getBuffs()) {
                    if (buff.isValid() == true) {
                        buff.onKill(this);
                    }
                }

                this._defense.onKill(this);
            }
        }

        // 触发伤害
        this.onDamage();

        // 处理所有buff处理
        for (let buffDealWith of this._buffDealWiths) {
            buffDealWith.dealWith();
        }
        this._buffDealWiths = [];

        this.finish();
    }

    /**
     * 当发生伤害（治疗），在这里修改血量和漂字，播放受击动画什么的
     */
    protected abstract onDamage();
}

namespace DamageDealWithBase {
}

export default DamageDealWithBase;

import CharacterBase from "../Actor/CharacterBase";
import BuffDealWithBase from "./BuffDealWithBase";

