import Singleton from "../Decorators/Singleton";
import Service from "../Decorators/Service";
import IService from "../Interfaces/IService";

/**
 * 全局的对象池服务
 *
 * @class PoolService
 */
@Singleton
@Service("PoolService")
class PoolService implements IService {
    public alias: string;

    public static readonly instance: PoolService

    private static list = new Map<string, PoolService.Pool>();

    public initialize(): void {
    }

    public lazyInitialize(): void {
    }

    static async register(
        name: string,
        prefab: cc.Prefab,
        length: number,
        component?: { prototype: cc.Component }
    ) {
        if (!this.list.has(name)) {
            this.list.set(name, new PoolService.Pool(prefab, length, component));
        }
    }

    static async unregister(name: string) {
        if (this.list.has(name)) {
            this.list.get(name).clear();
            this.list.delete(name);
        }
    }

    static put(name: string, node: cc.Node) {
        if (this.list.has(name)) {
            this.list.get(name).put(node);
        } else {
            throw new Error("没有注册预制体");
        }
    }

    static get(name: string) {
        if (this.list.has(name)) {
            return this.list.get(name).get();
        } else {
            throw new Error("没有注册预制体");
        }
    }

    static info(name?: string) {
        if (name) {
            if (this.list.has(name)) {
                console.log(name + ":", this.list.get(name).progress());
            } else {
                throw new Error("没有注册预制体");
            }
        } else {
            this.list.forEach(
                (value: PoolService.Pool, key: string, map: Map<string, PoolService.Pool>) => {
                    console.log(key + ":", value.progress());
                }
            );
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
        private tail: number = 0;
        constructor(
            template: cc.Prefab,
            length: number,
            component?: string | { prototype: cc.Component }
        ) {
            this.list = new cc.NodePool(component);
            this.template = template;
            for (let index = 0; index < length; index++) {
                let node = cc.instantiate(this.template);
                (<any>node).prefab = template;
                node.active = false;
                this.list.put(node);
            }
            this.tail = length;
        }

        put(node: cc.Node) {
            if ((<any>node).prefab == this.template) {
                node.active = false;
                this.list.put(node);
            } else {
                throw new Error("该节点不是该对象池的对象");
            }
        }

        get() {
            let node: cc.Node;
            if (this.list.size() > 0) {
                node = this.list.get();
            } else {
                node = cc.instantiate(this.template);
                (<any>node).prefab = this.template;
                console.warn("对象池预设不足");
                this.tail += 1;
            }
            node.active = true;
            return node;
        }

        clear() {
            this.list.clear();
        }

        progress() {
            return `${this.list.size()}/${this.tail}`;
        }
    }
}


export default PoolService;