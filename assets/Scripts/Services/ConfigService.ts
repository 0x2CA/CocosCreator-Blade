import Singleton from "../Decorators/Singleton";
import Service from "../Decorators/Service";
import IService from "../Interfaces/IService";

/**
 * 全局的配置服务
 *
 * @class ConfigService
 */
@Singleton
@Service("ConfigService")
export default class ConfigService implements IService {
    public alias: string;

    public static readonly instance: ConfigService

    private list = new Map<string, { obj: any, json: cc.JsonAsset }>();

    private configPath = "Configs"

    public initialize(): void {
        this.loadFolder();
    }

    public lazyInitialize(): void {
    }



    /**
    * 从目录加载配置
    */
    public loadFolder() {
        cc.loader.loadResDir(this.configPath, (err, resource, urls) => {
            for (let index = 0; index < resource.length; index++) {
                const json = (resource as cc.JsonAsset[])[index];
                this.register(json.name, json);
            }

            this.info();
        });
    }

    async register(
        name: string,
        json: cc.JsonAsset
    ) {
        if (!this.list.has(name)) {
            this.list.set(name, { json, obj: null });
        }
    }

    async unregister(name: string) {
        if (this.list.has(name)) {
            this.list.delete(name);
        }
    }

    /**
     * 获取指定的配置
     * @param name 
     */
    public get<T>(name: string): T {
        if (this.list.has(name)) {
            let info = this.list.get(name);
            if (info.obj) {
                return info.obj
            } else {
                return info.obj = this.build(info.json.json)
            }
        }
    }

    private build<T>(obj: any): T {
        const key: string[] = obj["keys"]
        const data: any[] = obj["data"]
        const index = obj["index"]
        let result

        if (index == null) {
            // 数组
            result = []
            for (let i = 0; i < data.length; i++) {
                const item = data[i];
                let obj = {};
                for (let j = 0; j < item.length; j++) {
                    obj[key[j]] = item[j];
                }
                result.push(obj);
            }
        } else {
            result = {}
            for (let i = 0; i < data.length; i++) {
                const item = data[i];
                let obj = {};
                for (let j = 0; j < item.length; j++) {
                    if (key[j] != index) {
                        obj[key[j]] = item[j];
                    }else{
                        result[item[j]] = obj;
                    }
                }
            }
        }

        return result;
    }


    /**
     * 打印信息
     * @param name 
     */
    info(name?: string) {
        if (name) {
            if (this.list.has(name)) {
                console.log(name + ":", this.list.get(name).json);
            } else {
                throw new Error("没有配置文件");
            }
        } else {
            let info = "配置信息:\n"
            if (this.list.size > 0) {
                this.list.forEach(
                    (value: cc.JsonAsset, key: string, map: Map<string, cc.JsonAsset>) => {
                        info += "   " + key + "    ✔" + "\n";
                    }
                );
            } else {
                info += "   没有注册配置";
            }
            console.log(info)
        }
    }
}

