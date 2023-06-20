import SingletonBase from "../Bases/SingletonBase";

class AssetService extends SingletonBase<AssetService> {
    private _assetInfos: Map<string, AssetService.AssetInfo> = new Map<string, AssetService.AssetInfo>();

    protected onInitialize() {
        this._assetInfos.clear();
    }

    protected onDispose() {

    }

    public getCount() {
        return this._assetInfos.size;
    }

    private _addressables: { [key: string]: string } = null;
    private _loadAddressablesCallbacks: Function[] = [];

    private loadAddressables(callback: (err: Error, addressables: { [key: string]: string }) => void) {
        if (this._addressables == null) {
            this._loadAddressablesCallbacks.push(callback);
            if (this._loadAddressablesCallbacks.length == 1) {
                // console.log("开始加载资源列表");
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

                    // console.log("加载资源列表成功", asset.json);

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

    public loadAsset<T extends cc.Asset>(assetName: string, type: new () => T, callback: (err: Error, asset: T) => void, progress: (finish: number, total: number) => void = null) {
        this.loadAddressables((err, addressables) => {
            if (err) {
                callback(err, null);
                return;
            }

            let address = addressables[assetName];

            if (address == null) {
                callback(new Error(`资源${assetName}不存在寻址表`), null);
                return;
            }

            let info = this._assetInfos.get(assetName);
            if (info == null) {
                info = new AssetService.AssetInfo();
                info.asset = null;
                info.address = address;
                info.count = 0;
                info.callbacks = [];
                info.progressCallbacks = [];
                this._assetInfos.set(assetName, info);
            }

            if (info.asset == null) {
                info.callbacks.push(callback);
                info.progressCallbacks.push(progress);
                if (info.callbacks.length == 1) {
                    // console.log("开始加载资源", assetName);
                    cc.resources.load(address, type as any, (finish: number, total: number) => {
                        for (let currentCallback of info.progressCallbacks) {
                            try {
                                if (currentCallback) {
                                    currentCallback(finish, total);
                                }
                            } catch (error) {
                                console.error(error);
                            }
                        }
                    }, (err, asset) => {
                        if (err) {
                            console.error("加载资源错误", assetName, err);

                            for (let currentCallback of info.callbacks) {
                                try {
                                    if (currentCallback) {
                                        currentCallback(err, null);
                                    }
                                } catch (error) {
                                    console.error(error);
                                }
                            }

                            info.callbacks = [];
                            info.progressCallbacks = [];

                            return;
                        }

                        // console.log("加载资源成功", assetName, asset);

                        info.asset = asset;

                        for (let _ of info.callbacks) {
                            info.count++;
                            info.asset.addRef();
                        }

                        for (let currentCallback of info.callbacks) {
                            try {
                                if (currentCallback) {
                                    currentCallback(err, asset);
                                }
                            } catch (error) {
                                console.error(error);
                            }
                        }

                        info.callbacks = [];
                        info.progressCallbacks = [];
                    });
                }
            } else {
                info.count++;
                info.asset.addRef();
                callback(null, info.asset as T);
            }
        });
    }

    public async loadAssetAsync<T extends cc.Asset>(assetName: string, type: new () => T, progress: (finish: number, total: number) => void = null) {
        return new Promise<T>((resolve, reject) => {
            this.loadAsset(assetName, type, (err, asset: T) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(asset);
            }, progress);
        });
    }

    public unloadAsset(assetName: string) {
        let info = this._assetInfos.get(assetName);
        if (info == null) {
            console.warn(`资源${assetName}已经卸载，无法卸载`);
            return;
        }

        if (info.asset == null) {
            console.warn(`资源${assetName}正在加载中，无法卸载`);
            return;
        }

        info.count--;
        info.asset.decRef();

        if (info.count == 0) {
            this._assetInfos.delete(assetName);
            cc.resources.release(info.address);
        }
    }

    /**
     * 加载一个资源
     * @param url
     */
    protected loadRes<T extends cc.Asset>(url: string, type: new () => T): Promise<T> {
        return new Promise((resolve, reject) => {
            cc.resources.load(url, type as any, (err: Error, res: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res as T);
                }
            });
        });
    }

    /**
     * 加载一组资源
     * @param url
     */
    protected loadResArray<T extends cc.Asset>(
        url: string[],
        type: new () => T
    ): Promise<T[]> {
        return new Promise((resolve, reject) => {
            cc.resources.load(url, type as any, (err: Error, res: any[]) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res as T[]);
                }
            });
        });
    }

    /**
    * 加载一个远程资源
    * @param url
    */
    public loadRemote<T>(url: string, opttion: {
        ext?: string
    } = {}): Promise<T> {
        return new Promise((resolve, reject) => {
            cc.assetManager.loadRemote(url, opttion,
                (err: Error, res: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                }
            );
        });
    }
}

namespace AssetService {
    export class AssetInfo {
        public asset: cc.Asset;
        public address: string;
        public count: number;
        public callbacks: Function[];
        public progressCallbacks: Function[];
    }

    /**
     * 资源加载代理
     */
    export class AssetLoadProxy {

        protected _assets: Map<string, number> = new Map<string, number>();

        private _isValid: boolean = true;

        public isValid(): boolean {
            return this._isValid;
        }

        /**
         * 销毁
         */
        public dispose() {
            this._isValid = false;
            this.unloadAssets();
        }

        /**
         * 加载资源
         * @param assetName
         * @param type
         * @param callback
         * @param progress
         * @returns
         */
        public loadAsset<T extends cc.Asset>(assetName: string, type: new () => T, callback: (err: any, res: T) => void, progress: (finish: number, total: number) => void = null) {
            if (this._isValid == false) {
                callback(new Error("资源加载代理已经销毁"), null);
                return;
            }

            blade.asset.loadAsset(assetName, type, (err, res) => {
                if (err) {
                    callback(err, null);
                    return;
                }

                if (this._isValid == false) {
                    blade.asset.unloadAsset(assetName);
                    callback(new Error("资源加载代理已经销毁"), null);
                    return;
                }

                if (this._assets.has(assetName)) {
                    this._assets.set(assetName, this._assets.get(assetName) + 1);
                } else {
                    this._assets.set(assetName, 1);
                }

                callback(null, res);

            }, progress);
        }

        /**
         * 加载资源
         * @param assetName
         * @param type
         * @param progress
         * @returns
         */
        public async loadAssetAsync<T extends cc.Asset>(assetName: string, type: new () => T, progress: (finish: number, total: number) => void = null) {
            return new Promise<T>((resolve, reject) => {
                this.loadAsset(assetName, type, (err, asset) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(asset);
                }, progress);
            });
        }

        /**
         * 卸载资源
         * @param assetName
         */
        public unloadAsset(assetName: string) {
            if (this._assets.has(assetName)) {
                let count = this._assets.get(assetName);
                if (count > 1) {
                    this._assets.set(assetName, count - 1);
                } else {
                    this._assets.delete(assetName);
                }
                blade.asset.unloadAsset(assetName);
            }
        }

        /**
         * 销毁加载资源
         */
        public unloadAssets() {
            this._assets.forEach((value, key) => {
                for (let index = 0; index < value; index++) {
                    blade.asset.unloadAsset(key);
                }
            });
            this._assets.clear();
        }
    }
}

export default AssetService;