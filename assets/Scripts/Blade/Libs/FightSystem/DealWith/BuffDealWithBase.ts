import DealWithBase from "./DealWithBase";

/**
 * Buff处理基类
 */
abstract class BuffDealWithBase<
    C extends CharacterBase = any
> extends DealWithBase {

    protected _owner: C = null;

    protected _caster: C = null;

    protected _type: BuffDealWithBase.DealWithType = BuffDealWithBase.DealWithType.Add;

    protected _buffId: string = "";

    protected _layer: number = 1;

    public constructor(
        owner: C,
        caster: C,
        type: BuffDealWithBase.DealWithType,
        buffId: string,
        layer: number
    ) {
        super();
        this._owner = owner;
        this._caster = caster;
        this._type = type;
        this._buffId = buffId;
        this._layer = layer;
    }

    public dealWith() {
        if (this.isFinish() == true) {
            // console.warn("Buff处理已经处理过了");
            return;
        }

        if (this._owner == null || this._owner.isDead() == true) {
            // console.warn("Buff处理时目标角色不存在或者死亡");
            return;
        }

        try {
            this.onDealWith();
        } catch (error) {
            console.error("Buff 处理错误:", error, this._buffId, this._caster.getId(), this._owner.getId(), this._layer);
        }
    }

    public getType() {
        return this._type;
    }

    /**
    * 处理Buff
    * @param delta
    */
    protected abstract onDealWith();
}

namespace BuffDealWithBase {
    export enum DealWithType {
        Add = "Add",
        Remove = "Remove",
        Change = "Change"
    }
}

export default BuffDealWithBase;

import CharacterBase from "../Actor/CharacterBase";
