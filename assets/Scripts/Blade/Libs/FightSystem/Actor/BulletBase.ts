import SkillBase from "../SkillBase";
import ActorBase from "./ActorBase";

/**
 * 子弹基类
 */
export default abstract class BulletBase<
    C extends CharacterBase = any,
    S extends SkillBase = any
> extends ActorBase {

    /**
     * BulletId
     */
    protected _bulletId: string = "";

    /**
     * 子弹拥有者(释放者)
     */
    protected _owner: C = null;

    /**
    * 技能
    */
    protected _skill: S = null;

    /**
     * 是否完成
     */
    private _isFinish: boolean = false;

    public constructor(
        id: string,
        bulletId: string,
        owner: C,
        skill: S
    ) {
        super(id);
        this._bulletId = bulletId;
        this._owner = owner;
        this._skill = skill;
    }

    /**
     * 是否完成
     * @returns
     */
    public isFinish(): boolean {
        return this._isFinish;
    }

    /**
     * 设置完成
     */
    protected finish() {
        this._isFinish = true;
    }

    /**
    * 获取拥有者
    * @returns
    */
    public getOwner(): C {
        return this._owner;
    }

    /**
     * 刷新子弹
     * @param delta
     */
    public tick(delta: number): void {
        if (this.isFinish() == true) {
            return;
        }
        this.onTick(delta);
    }

    /**
    * 刷新
    * @param delta
    */
    protected abstract onTick(delta: number);
}

import CharacterBase from "./CharacterBase";
