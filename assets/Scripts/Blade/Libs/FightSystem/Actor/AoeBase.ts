import ActorBase from "./ActorBase";

/**
 * Aoe基类
 */
export default abstract class AoeBase extends ActorBase {

    // AoeId
    protected _aoeId: string = "";

    public constructor(id: string, aoeId: string) {
        super(id);
        this._aoeId = aoeId;
    }

}