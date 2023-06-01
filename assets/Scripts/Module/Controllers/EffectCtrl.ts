import ControllerBase from "../../Blade/Bases/ControllerBase";
import Controller from "../../Blade/Decorators/Controller";
import NodeHelper from "../../Blade/Helpers/NodeHelper";
import ITicker from "../../Blade/Interfaces/ITicker";
import ObjectPool from "../../Blade/Libs/Pool/ObjectPool";
import AssetService from "../../Blade/Services/AssetService";

@Controller("EffectCtrl")
class EffectCtrl extends ControllerBase implements ITicker {

    protected _loadProxy: AssetService.AssetLoadProxy = new AssetService.AssetLoadProxy();

    protected _spinePools: ObjectPool<cc.Node> = null;
    protected _spritePools: ObjectPool<cc.Node> = null;

    /**
     * 获取容器
     * @returns
     */
    protected getContainer() {
        return NodeHelper.getEffectLayer();
    }

    public onInitialize() {

    }

    public onDispose() {

    }

    protected _effects: Set<EffectCtrl.EffectInfo> = new Set();

    public addSpineEffect(effectName: string, animationSkin: string, animationName: string, updateCallback?: (effect: cc.Node, spine: sp.Skeleton) => void, isloop: boolean = true, finishCallback?: Function) {
        let effectContainer = this.getContainer().getChildByName(effectName);

        if (effectContainer == null) {
            effectContainer = new cc.Node(effectName);
            effectContainer.parent = this.getContainer();
        }

        if (this._spinePools == null) {
            this._spinePools = new ObjectPool<cc.Node>(
                () => {
                    //创建
                    let node = new cc.Node("EffectSpine");
                    node.addComponent(sp.Skeleton);
                    return node;
                },
                (node) => {
                    //获取
                    node.parent = null;
                    node.active = true;
                },
                (node) => {
                    //释放
                    node.parent = null;
                    node.active = false;
                },
                (node) => {
                    //销毁
                    node.destroy();
                },
            );
        }

        let node = this._spinePools.get();

        node.parent = effectContainer;
        node.scale = 1;
        node.angle = 0;
        node.position = cc.Vec3.ZERO;
        node.active = true;

        let spine = node.getComponent(sp.Skeleton);

        spine.timeScale = 1;
        spine.skeletonData = null;

        let info = new EffectCtrl.EffectInfo();
        info.effectType = EffectCtrl.EffectType.Spine;
        info.effectName = effectName;
        info.node = node;
        info.render = spine;
        info.finishCallback = finishCallback;
        info.updateCallback = updateCallback;

        this._effects.add(info);

        if (updateCallback != null) {
            updateCallback(node, spine);
        }

        this._loadProxy.loadAsset(effectName, sp.SkeletonData, (err, res: sp.SkeletonData) => {
            if (err && (err as Error).message != "资源加载代理已经销毁") {
                console.error("特效加载资源", effectName, err);
                return;
            }
            if (this._effects.has(info)) {
                info.isLoaded = true;

                spine.setAnimationCacheMode(sp.Skeleton.AnimationCacheMode.PRIVATE_CACHE);
                spine.enableBatch = true;

                spine.skeletonData = res;

                if (animationSkin == null || animationSkin == "") {
                    animationSkin = "default";
                }

                if (animationName == null || animationName == "") {
                    animationName = "animation";
                }

                spine.setSkin(animationSkin);

                if (isloop == false) {
                    spine.setCompleteListener(() => {
                        this.removeEffect(info);
                        if (finishCallback != null) {
                            finishCallback();
                        }
                    });
                }

                spine.setAnimation(0, animationName, isloop);
            } else {
                this._loadProxy.unloadAsset(effectName);
            }
        });

        return info;
    }

    public addSpriteEffect(effectName: string, updateCallback?: (effect: cc.Node, sprite: cc.Sprite) => void, finishCallback?: Function) {
        let effectContainer = this.getContainer().getChildByName(effectName);

        if (effectContainer == null) {
            effectContainer = new cc.Node(effectName);
            effectContainer.parent = this.getContainer();
        }

        if (this._spritePools == null) {
            this._spritePools = new ObjectPool<cc.Node>(
                () => {
                    //创建
                    let node = new cc.Node("EffectSprite");
                    node.addComponent(cc.Sprite);
                    return node;
                },
                (node) => {
                    //获取
                    node.parent = null;
                    node.active = true;
                },
                (node) => {
                    //释放
                    node.parent = null;
                    node.active = false;
                },
                (node) => {
                    //销毁
                    node.destroy();
                },
            );
        }

        let node = this._spritePools.get();

        node.parent = effectContainer;
        node.scale = 1;
        node.angle = 0;
        node.position = cc.Vec3.ZERO;
        node.active = true;

        let sprite = node.getComponent(cc.Sprite);

        sprite.spriteFrame = null;

        let info = new EffectCtrl.EffectInfo();
        info.effectType = EffectCtrl.EffectType.Sprite;
        info.effectName = effectName;
        info.node = node;
        info.render = sprite;
        info.finishCallback = finishCallback;
        info.updateCallback = updateCallback;

        this._effects.add(info);

        if (updateCallback != null) {
            updateCallback(node, sprite);
        }

        this._loadProxy.loadAsset(effectName, cc.SpriteFrame, (err, res: cc.SpriteFrame) => {
            if (err && (err as Error).message != "资源加载代理已经销毁") {
                console.error("特效加载资源", effectName, err);
                return;
            }
            if (this._effects.has(info)) {
                info.isLoaded = true;

                sprite.spriteFrame = res;
            } else {
                this._loadProxy.unloadAsset(effectName);
            }
        });

        return info;
    }

    public removeEffect(effect: EffectCtrl.EffectInfo) {
        let isRmove = this._effects.delete(effect);
        if (isRmove) {
            if (effect.isLoaded == true) {
                this._loadProxy.unloadAsset(effect.effectName);
            }
            if (effect.effectType == EffectCtrl.EffectType.Spine) {
                let spine = effect.render as sp.Skeleton;
                spine.skeletonData = null;
                spine.setCompleteListener(null);
                this._spinePools.release(effect.node);
            } else {
                let sprite = effect.render as cc.Sprite;
                sprite.spriteFrame = null;
                this._spritePools.release(effect.node);
            }
        }
    }

    public clear() {
        this.clearAllEffect();
        if (this._spinePools != null) {
            this._spinePools.clear();
            this._spinePools = null;
        }
        if (this._spritePools != null) {
            this._spritePools.clear();
            this._spritePools = null;
        }
        NodeHelper.getEffectLayer().removeAllChildren();
    }

    public clearAllEffect() {
        let effects = Array.from(this._effects);
        for (let index = 0; index < effects.length; index++) {
            const effect = effects[index];
            this.removeEffect(effect);
        }
        this._effects.clear();
        this._loadProxy.dispose();
        this._loadProxy = new AssetService.AssetLoadProxy();
    }

    onTick(delta: number): void {
        // 更新特效追踪
        this._effects.forEach((effect, node, map) => {
            if (effect.updateCallback != null) {
                effect.updateCallback(effect.node, effect.render);
            }
        });
    }

    onFixedTick(delta: number): void {

    }

    onLateTick(): void {

    }

}

namespace EffectCtrl {
    export class EffectInfo {
        public effectType: EffectType = EffectType.Sprite;
        public effectName: string = "";
        public updateCallback: Function = null;
        public finishCallback: Function = null;
        public node: cc.Node = null;
        public render: cc.Component = null;
        public isLoaded: boolean = false;
    }

    export enum EffectType {
        Spine,
        Sprite
    }
}

export default EffectCtrl;

