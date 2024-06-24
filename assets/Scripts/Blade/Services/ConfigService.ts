/*
 * @作者: 0x2CA
 * @创建时间: 2022-09-29
 * @最后编辑时间: 2023-03-17
 * @最后编辑者: 0x2CA
 * @描述: 配置服务
 */
import { EDataConfig } from "../../Module/Configs/IDataConfig";
import GameConfig from "../../Module/Defines/GameConfig";
import SingletonBase from "../Bases/SingletonBase";
import AssetService from "./AssetService";

/**
 * 全局的配置服务
 *
 * @class ConfigService
 */
class ConfigService extends SingletonBase<ConfigService>{

    private _datas: object = {};

    private _loadProxy: AssetService.AssetLoadProxy = new AssetService.AssetLoadProxy();

    private _addKey: PropertyDescriptor = {
        value: null,
        writable: false,
        configurable: false,
        enumerable: true,
    };

    private _hideIndex: PropertyDescriptor = {
        configurable: false,
        enumerable: false
    };

    private bindRemoveKey(keys: string[], items: object) {
        for (const refId in items) {
            if (Object.prototype.hasOwnProperty.call(items, refId)) {
                const item = items[refId];
                for (let keyIndex = 0; keyIndex < keys.length; keyIndex++) {
                    const key = keys[keyIndex];
                    if (keyIndex == 0) {
                        this._addKey.value = refId;
                        Object.defineProperty(item, key, this._addKey);
                    } else {
                        this._addKey.value = item[keyIndex - 1];
                        Object.defineProperty(item, key, this._addKey);
                        Object.defineProperty(item, keyIndex - 1, this._hideIndex);
                    }
                }
            }
        }
    }

    protected onInitialize() {
    }

    protected onDispose() {
    }

    async register(
        name: string,
        data: object
    ) {
        if (this._datas[name] == null) {
            if (data["keys"] != null && data["keys"] instanceof Array && data["values"] != null) {
                this.bindRemoveKey(data["keys"], data["values"]);
                this._datas[name] = data["values"];
            } else {
                this._datas[name] = data;
            }
        }
    }

    async unregister(name: string) {
        if (this._datas[name] != null) {
            this._datas[name] = null;
        }
    }

    async registerAllAsync(progress: (finish: number, total: number) => void = null) {
        await new Promise<void>(async (resolve, reject) => {

            if (GameConfig.isZipConfigs) {
                //加载Configs.bin
                this._loadProxy.loadAsset("Configs", cc.BufferAsset, async (err, asset: cc.BufferAsset) => {

                    //解析
                    let zip = await JSZip.loadAsync((asset as any)._buffer)

                    //获取配置
                    let files: JSZip.JSZipObject[] = [];
                    for (const key in zip.files) {
                        if (Object.prototype.hasOwnProperty.call(zip.files, key)) {
                            const file = zip.files[key];
                            if (key.endsWith(".json")) {
                                files.push(file);
                            }
                        }
                    }

                    let promises: Promise<void>[] = [];

                    let finish = 0;

                    for (let index = 0; index < files.length; index++) {
                        const file = files[index];

                        promises.push(file.async("text").then((data) => {
                            let name = file.name.replace(/^.*\/(.*)\.json$/g, "$1");
                            //string转成json格式
                            let json = JSON.parse(data);
                            // console.log(name, json);
                            blade.config.register(name, json);

                            finish += 1;

                            let total = Math.floor(files.length / 0.75);
                            if (progress) {
                                progress(Math.floor(total * 0.25) + finish, total);
                            }
                        }));

                    }

                    await Promise.all(promises);

                    resolve();
                }, (finish: number, total: number) => {
                    if (progress) {
                        progress(Math.floor(1 * finish / total), 4);
                    }
                });
            } else {

                try {
                    let assets = await this._loadProxy.loadDir<cc.JsonAsset>("Configs", (finish: number, total: number) => {
                        if (progress) {
                            progress(finish, total);
                        }
                    });

                    for (let index = 0; index < assets.length; index++) {
                        let asset = assets[index];
                        this.register(asset.name, asset.json);
                        // 释放
                        this._loadProxy.unloadDirAsset(asset);
                    }

                    resolve();
                } catch (error) {
                    reject(error)
                }
            }
        });
    }

    /**
     * 获取表格数据(全表)
     * @param name
     */
    public getRef<T extends object>(config: EDataConfig | string): { [key: string]: T } {
        // 转换表名
        let name = EDataConfig[config];
        if (name == null || typeof (name) == "number") {
            name = config
        }
        //获取表
        if (this._datas[name] != null) {
            return this._datas[name];
        } else {
            console.warn(`没有${name}配置文件,请提前注册`);
            return null;
        }
    }

    /**
     * 获取表格配置
     * @param config
     * @returns
     */
    public getRefConfig<T extends object>(config: EDataConfig | string): T {
        return (this.getRef<object>(config) as any) as T;
    }

    public getRefItem<T extends object>(config: EDataConfig | string, refId: string): T {
        let refs = this.getRef<T>(config);
        return refs[refId];
    }

    /**
     * 打印信息
     * @param name
     */
    info(name?: string) {
        if (name) {
            if (this._datas[name] != null) {
                console.log(name + ":", this._datas[name]);
            } else {
                console.log(`没有${name}配置文件`);
            }
        } else {
            let info = "配置信息:\n"

            const keys = Object.keys(this._datas);

            if (keys.length > 0) {
                keys.forEach(
                    (value: string, index: number, array: string[]) => {
                        info += "   " + value + "    ✔" + "\n";
                    }
                );
            } else {
                info += "   没有注册配置";
            }
            console.log(info)
        }
    }
}

namespace ConfigService {
}

export default ConfigService;
