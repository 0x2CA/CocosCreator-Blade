import AssetService from "../Services/AssetService";
import PlatformService from "../Services/PlatformService";

export default class SpriteHelper {
    //设置远程资源
    public static async setRemoteSprite(target: cc.Component | cc.Node, iconPath: string = "") {
        return new Promise<void>(async (resolve, reject) => {
            let node: cc.Node = null;

            if (target == null || iconPath == "") {
                reject(`目标为空`);
                return;
            }

            if (target instanceof cc.Node) {
                node = target;
            } else {
                node = target.node;
            }
            let sprite = node.getComponent(cc.Sprite);
            if (sprite == null) {
                reject(`警告${node.name}没有对应图片组件无法设置图片${iconPath}`);
                return;
            }

            let asset: cc.Texture2D = null;

            if (blade.platform.getType() == PlatformService.PlatformType.WX) {
                asset = await blade.asset.loadRemote(iconPath, { ext: '.image' });
            } else if (blade.platform.getType() == PlatformService.PlatformType.BYTEDANCE) {
                asset = await blade.asset.loadRemote(iconPath, { ext: '.image' });
            } else {
                asset = await blade.asset.loadRemote(iconPath);
            }

            let sp = new cc.SpriteFrame(asset);
            sprite.spriteFrame = sp;
            resolve();
        });
    }

    //是否是远程资源
    public static isRemoteRes(resPath: string = "") {
        if (resPath == "") return;
        if (resPath.indexOf("https") == -1) {
            return false;
        }
        return true;
    }

    /**
     * 设置图片
     * @param loadProxy
     * @param target
     * @param spriteFrameName
     * @param callback
     * @returns
     */
    public static async setSpriteFrame(loadProxy: AssetService.AssetLoadProxy, target: cc.Component | cc.Node, spriteFrameName: string, callback: () => void = null) {
        return new Promise<void>((resolve, reject) => {

            let node: cc.Node = null;

            if (target == null) {
                reject(`目标为空`);
                return;
            }

            if (target instanceof cc.Node) {
                node = target;
            } else {
                node = target.node;
            }

            let sprite = node.getComponent(cc.Sprite);

            if (sprite == null) {
                // console.warn(`警告${node.name}没有对应图片组件无法设置图片${spriteFrameName}`);
                reject(`警告${node.name}没有对应图片组件无法设置图片${spriteFrameName}`);
                return;
            }

            let currentSpriteFrameName = Reflect.get(sprite, "_currentSpriteFrameName");
            let currentLoadProxy = Reflect.get(sprite, "_loadProxy") as AssetService.AssetLoadProxy;

            // 当前加载代理不同或者图片不同需要加载
            if (currentLoadProxy != loadProxy || currentSpriteFrameName != spriteFrameName) {

                sprite.spriteFrame = null;

                let loadedAsset = Reflect.get(sprite, "_loadedAsset");

                // 之前的资源加载了需要卸载
                if (currentSpriteFrameName != null && currentSpriteFrameName != "" && loadedAsset != null && currentLoadProxy != null && currentLoadProxy.isValid()) {
                    currentLoadProxy.unloadAsset(currentSpriteFrameName);
                }

                Reflect.set(sprite, "_currentSpriteFrameName", spriteFrameName);
                Reflect.set(sprite, "_loadedAsset", null);

                if (spriteFrameName != null && spriteFrameName != "" && loadProxy != null && loadProxy.isValid()) {
                    loadProxy.loadAsset(spriteFrameName, cc.SpriteFrame, (err, res) => {
                        if (err == null) {

                            currentSpriteFrameName = Reflect.get(sprite, "_currentSpriteFrameName");
                            loadedAsset = Reflect.get(sprite, "_loadedAsset");

                            if (currentSpriteFrameName == spriteFrameName && loadedAsset == null) {

                                sprite.spriteFrame = res;
                                Reflect.set(sprite, "_loadedAsset", res);
                                Reflect.set(sprite, "_loadProxy", loadProxy);

                                if (callback) {
                                    callback();
                                }

                            } else {
                                if (loadProxy.isValid()) {
                                    loadProxy.unloadAsset(spriteFrameName);
                                }
                            }

                            resolve();
                        } else if ((err as Error).message != "资源加载代理已经销毁") {
                            console.error(err);
                            reject(err);
                        }
                    });
                } else {
                    resolve();
                }
            } else {
                // 如果相同的结果尝试拿取旧的结果
                let loadedAsset = Reflect.get(sprite, "_loadedAsset");

                if (currentSpriteFrameName != null && currentSpriteFrameName != "" && loadedAsset != null) {
                    sprite.spriteFrame = loadedAsset;
                }

                resolve();
            }
        });
    }
}