import SingletonBase from "../Bases/SingletonBase";
import AssetService from "./AssetService";

/**
 * 全局的对象池服务
 *
 * @class PoolService
 */
class PoolService extends SingletonBase {

    private list = new Map<string, PoolService.Pool>();

    public onInitialize() {
    }

    public onDispose() {
    }

    async register(
        name: string,
        prefab: cc.Prefab,
        max: number,
        component?: { prototype: cc.Component }
    ) {
        if (!this.list.has(name)) {
            if (prefab == null) {
                try {
                    prefab = await AssetService.getInstance().loadAssetAsync(name + ".prefab", cc.Prefab) as cc.Prefab;

                    this.list.set(name, new PoolService.Pool(prefab, max, component));
                } catch (error) {
                    cc.error(`加载对象池对象${name}失败`, error);
                }
            } else {
                this.list.set(name, new PoolService.Pool(prefab, max, component));
            }
        }
    }

    async unregister(name: string) {
        if (this.list.has(name)) {
            this.list.get(name).clear();
            this.list.delete(name);
        }
    }

    /**
     * 回收指定对象
     * @param name
     * @param node
     */
    put(name: string, node: cc.Node) {
        if (this.list.has(name)) {
            this.list.get(name).put(node);
        } else {
            cc.error("没有注册预制体");
            node.destroy();
        }
    }

    /**
     * 获取指定对象
     * @param name
     */
    get(name: string) {
        if (this.list.has(name)) {
            return this.list.get(name).get();
        } else {
            cc.error("没有注册预制体");
        }
    }

    /**
    * 打印信息
    * @param name
    */
    info(name?: string) {
        if (name) {
            if (this.list.has(name)) {
                cc.log(name + ":", this.list.get(name));
            } else {
                cc.log(`没有注册${name}预制体`);
            }
        } else {
            let info = "对象池信息:\n"
            if (this.list.size > 0) {
                this.list.forEach(
                    (value: PoolService.Pool, key: string, map: Map<string, PoolService.Pool>) => {
                        info += "   " + key + "    ✔" + "\n";
                    }
                );
            } else {
                info += "   没有注册对象池对象";
            }
            cc.log(info)
        }
    }
}

namespace PoolService {

    /**
     * 对象池
     *
     * @export
     * @class Pool
     */
    export class Pool {
        private template: cc.Prefab = null;
        private list: cc.NodePool = null;
        private max: number = 0;
        constructor(
            template: cc.Prefab,
            max: number,
            component?: string | { prototype: cc.Component }
        ) {
            this.list = new cc.NodePool(component);
            this.template = template;
            this.max = max;
        }

        put(node: cc.Node) {
            if ((<any>node).prefab == this.template) {
                node.active = false;
                if (this.list.size() < this.max) {
                    this.list.put(node);
                } else {
                    node.destroy();
                }
            } else {
                console.warn("该节点不是该对象池的对象");
                node.destroy();
            }
        }

        get() {
            let node: cc.Node;
            if (this.list.size() > 0) {
                node = this.list.get();
            } else {
                node = cc.instantiate(this.template);
                (<any>node).prefab = this.template;
                // cc.warn("对象池预设不足");
            }
            node.active = true;
            return node;
        }

        clear() {
            this.list.clear();
        }

    }
}


export default PoolService;
