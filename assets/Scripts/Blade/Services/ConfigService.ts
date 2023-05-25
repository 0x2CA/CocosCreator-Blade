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

/**
 * 全局的配置服务
 *
 * @class ConfigService
 */
class ConfigService extends SingletonBase<ConfigService>{

    private _datas: object = {};

    protected onInitialize() {
    }

    protected onDispose() {
    }

    async register(
        name: string,
        data: object
    ) {
        if (this._datas[name] == null) {
            this._datas[name] = data;
        }
    }

    async unregister(name: string) {
        if (this._datas[name] != null) {
            this._datas[name] = null;
        }
    }

    async registerAllAsync(progress: (finish: number, total: number) => void = null) {
        await new Promise<void>((resolve, reject) => {

            if (GameConfig.isZipConfigs) {
                //加载Configs.bin
                cc.resources.load("Configs", cc.BufferAsset, (finish: number, total: number) => {
                    if (progress) {
                        progress(Math.floor(1 * finish / total), 4);
                    }
                }, async (err, asset: cc.BufferAsset) => {

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
                });

            } else {
                cc.resources.loadDir("Configs", (finish: number, total: number) => {
                    if (progress) {
                        progress(finish, total);
                    }
                }, (error, assets: cc.JsonAsset[]) => {
                    if (error) {
                        console.error("预加载配置资源失败", error);
                        reject(error);
                        return;
                    }

                    for (let index = 0; index < assets.length; index++) {
                        let asset = assets[index];
                        this.register(asset.name, asset.json);
                    }

                    resolve();
                });
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
