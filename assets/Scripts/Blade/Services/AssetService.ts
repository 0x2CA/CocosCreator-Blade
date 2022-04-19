import SingletonBase from "../Bases/SingletonBase";

class AssetService extends SingletonBase {
    private assetInfos: Map<string, AssetService.AssetInfo> = new Map<string, AssetService.AssetInfo>();

    public onInitialize() {
        this.assetInfos.clear();
    }

    public onDispose() {

    }

    private _addressables: { [key: string]: string } = null;
    private _loadAddressablesCallbacks: Function[] = [];

    private loadAddressables(callback: (err: Error, addressables: { [key: string]: string }) => void) {
        if (this._addressables == null) {
            this._loadAddressablesCallbacks.push(callback);
            if (this._loadAddressablesCallbacks.length == 1) {
                console.log("开始加载资源列表");
                cc.resources.load("Addressables", cc.JsonAsset, (err, asset: cc.JsonAsset) => {
                    if (err) {
                        console.error("加载资源列表错误", err);

                        for (let currentCallback of this._loadAddressablesCallbacks) {
                            if (currentCallback) {
                                currentCallback(err, null);
                            }
                        }

                        this._loadAddressablesCallbacks = [];

                        return;
                    }

                    console.log("加载资源列表成功", asset.json);

                    this._addressables = asset.json;

                    for (let currentCallback of this._loadAddressablesCallbacks) {
                        if (currentCallback) {
                            currentCallback(err, this._addressables);
                        }
                    }

                    this._loadAddressablesCallbacks = [];
                });
            }
        } else {
            callback(null, this._addressables);
        }
    }

    public loadAsset(assetName: string, type: typeof cc.Asset, callback: (err: Error, asset: cc.Asset) => void, progress: (finish: number, total: number) => void = null) {
        this.loadAddressables((err, addressables) => {
            if (err) {
                callback(err, null);
                return;
            }

            let address = addressables[assetName];

            if (address == null) {
                callback(new Error(`资源${assetName}不存在`), null);
                return;
            }

            let info = this.assetInfos.get(assetName);
            if (info == null) {
                info = new AssetService.AssetInfo();
                info.asset = null;
                info.count = 0;
                info.callbacks = [];
                info.progressCallbacks = [];
                this.assetInfos.set(assetName, info);
            }

            if (info.asset == null) {
                info.callbacks.push(callback);
                info.progressCallbacks.push(progress);
                if (info.callbacks.length == 1) {
                    console.log("开始加载资源", assetName);
                    cc.resources.load(address, type, (finish: number, total: number) => {
                        for (let currentCallback of info.progressCallbacks) {
                            if (currentCallback) {
                                currentCallback(finish, total);
                            }
                        }
                    }, (err, asset) => {
                        if (err) {
                            console.error("加载资源错误", assetName, err);

                            for (let currentCallback of info.callbacks) {
                                if (currentCallback) {
                                    currentCallback(err, null);
                                }
                            }
                            info.callbacks = [];
                            info.progressCallbacks = [];
                            return;
                        }

                        console.log("加载资源成功", assetName, asset);

                        info.asset = asset;

                        for (let _ of info.callbacks) {
                            info.count++;
                            info.asset.addRef();
                        }

                        for (let currentCallback of info.callbacks) {
                            if (currentCallback) {
                                currentCallback(err, asset);
                            }
                        }

                        info.callbacks = [];
                        info.progressCallbacks = [];
                    });
                }
            } else {
                info.count++;
                info.asset.addRef();
                callback(null, info.asset);
            }
        });
    }

    public async loadAssetAsync(assetName: string, type: typeof cc.Asset, progress: (finish: number, total: number) => void = null) {
        return new Promise<cc.Asset>((resolve, reject) => {
            this.loadAsset(assetName, type, (err, asset) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(asset);
            }, progress);
        });
    }

    public unloadAsset(assetName: string) {
        let info = this.assetInfos.get(assetName);
        if (info == null) {
            return;
        }

        if (info.asset == null) {
            console.warn(`资源${assetName}正在加载中，无法卸载`);
            return;
        }

        info.count--;
        info.asset.decRef();

        if (info.count == 0) {
            this.assetInfos.delete(assetName);
        }
    }
}

namespace AssetService {
    export class AssetInfo {
        public asset: cc.Asset;
        public count: number;
        public callbacks: Function[];
        public progressCallbacks: Function[];
    }
}

export default AssetService;