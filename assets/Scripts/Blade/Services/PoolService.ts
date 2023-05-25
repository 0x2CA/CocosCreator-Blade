import SingletonBase from "../Bases/SingletonBase";
import ObjectPool from "../Libs/Pool/ObjectPool";

/**
 * 全局的对象池服务
 *
 * @class PoolService
 */
class PoolService extends SingletonBase<PoolService> {

    private _pools = new Map<string, ObjectPool<cc.Node>>();

    protected onInitialize() {
    }

    protected onDispose() {
    }

    async register(
        name: string,
        prefab: cc.Prefab,
        max: number = 10000
    ) {
        if (!this._pools.has(name)) {
            this._pools.set(name, new ObjectPool<cc.Node>(
                () => {
                    return cc.instantiate(prefab);
                },
                (node) => {
                    node.active = true
                },
                (node) => {
                    node.active = false
                    node.parent = null;
                },
                (node) => {
                    node.destroy()
                }, false, max));
        }
    }

    unregister(name: string) {
        if (this._pools.has(name)) {
            this._pools.get(name).clear();
            this._pools.delete(name);
        }
    }

    /**
     * 回收指定对象
     * @param name
     * @param node
     */
    release(name: string, node: cc.Node) {
        if (this._pools.has(name)) {
            this._pools.get(name).release(node);
        } else {
            console.error("没有注册预制体", name, node.name);
            node.destroy();
        }
    }

    /**
     * 获取指定对象
     * @param name
     */
    get(name: string) {
        if (this._pools.has(name)) {
            return this._pools.get(name).get();
        } else {
            console.error("没有注册预制体", name);
        }
    }

    /**
    * 打印信息
    * @param name
    */
    info(name?: string) {
        if (name) {
            if (this._pools.has(name)) {
                console.log(name + ":", this._pools.get(name));
            } else {
                console.log(`没有注册${name}预制体`);
            }
        } else {
            let info = "对象池信息:\n"
            if (this._pools.size > 0) {
                this._pools.forEach(
                    (value: ObjectPool<cc.Node>, key: string, map: Map<string, ObjectPool<cc.Node>>) => {
                        info += "   " + key + "    ✔" + "\n";
                    }
                );
            } else {
                info += "   没有注册对象池对象";
            }
            console.log(info)
        }
    }
}

namespace PoolService {
}


export default PoolService;
