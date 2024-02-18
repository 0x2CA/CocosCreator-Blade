/**
 * 红点
 */
export default class Reddot {

    /**
     * 分割富符号
     */
    private _splitChar: string = "/";

    /**
     * 池子
     */
    private _pool: ReddotNode[] = null;

    /**
     * 根节点
     */
    private _root: ReddotNode = null;

    /**
     * 所有节点
     */
    private _allNodes: Map<string, ReddotNode> = null;

    /**
     * 脏节点
     */
    private _dirtyNodes: Set<ReddotNode> = null;

    /**
     * 临时脏节点
     */
    private _tempDirtyNodes: ReddotNode[] = null;

    /**
     * 切割符号
     */
    public get splitChar(): string {
        return this._splitChar;
    }

    /**
     * 根节点
     */
    public get root(): ReddotNode {
        return this._root;
    }

    public constructor(splitChar: string = "/") {
        this._splitChar = splitChar;
        this._root = this.createNode("Root");
    }

    /**
     * 获取节点
     * @param path 
     * @returns 
     */
    public getNode(path: string): ReddotNode {
        if (this._allNodes == null) {
            return null;
        }

        if (path == null || path == "") {
            throw new Error("红点获取节点错误,路径为空 " + path);
        }

        return this._allNodes.get(path);
    }

    /**
     * 添加节点
     * @param path 
     * @returns 
     */
    public addNode(path: string): ReddotNode {
        if (path == null || path == "") {
            throw new Error("红点获添加节点错误,路径为空 " + path);
        }

        if (this._allNodes == null) {
            this._allNodes = new Map<string, ReddotNode>();
        }

        let node = this._allNodes.get(path);

        if (node != null) {
            throw new Error("红点添加节点失败，不允许重复添加 " + path);
        }

        let names = path.split(this._splitChar);
        node = this._root;
        for (let index = 0; index < names.length; index++) {
            const name = names[index];
            node = node.getOrAddChild(name);
        }

        node.addEnd();

        this._allNodes.set(path, node);

        return node;
    }

    /**
     * 获取或者添加节点
     * @param path 
     * @returns 
     */
    public getOrAddNode(path: string): ReddotNode {
        if (path == null || path == "") {
            throw new Error("红点获取节点错误,路径为空 " + path);
        }

        let node = this.getNode(path);

        if (node == null) {
            node = this.addNode(path);
        }

        return node;
    }

    /**
     * 移除节点
     * @param path 
     * @returns 
     */
    public removeNode(path: string): boolean {
        if (path == null || path == "") {
            throw new Error("红点获取节点错误,路径为空 " + path);
        }

        if (this._allNodes == null) {
            return false;
        }

        let node = this._allNodes.get(path);

        if (node == null) {
            return false;
        }

        this._allNodes.delete(path);

        // 因为要移除，重置值为0
        node.value = 0;

        node.removeEnd();

        if (node.pass != 0) {
            return false;
        }

        let deleteTarget = node;

        while (
            deleteTarget.parent.pass == 0 &&
            deleteTarget.parent != this._root
        ) {
            deleteTarget = deleteTarget.parent;
        }

        deleteTarget.parent.removeChild(deleteTarget.name);

        return true;
    }

    /**
     *  移除所有节点
     */
    public removeAllNode(): void {
        this._root.removeAllChild();
        if (this._allNodes != null) {
            this._allNodes.clear();
        }
    }

    /**
     * 获取节点计数
     * @param path 
     * @returns 
     */
    public getNodeCount(path: string): number {
        let node = this.getOrAddNode(path);
        return node.count;
    }

    /**
     * 获取节点值
     * @param path 
     * @returns 
     */
    public getNodeValue(path: string): number {
        let node = this.getOrAddNode(path);
        return node.value;
    }

    /**
     * 设置节点值
     * @param path 
     * @param newValue 
     * @returns 
     */
    public setNodeValue(path: string, newValue: number): void {
        let node = this.getOrAddNode(path);
        node.value = newValue;
    }

    /**
     * 获取节点是否隐藏
     * @param path 
     * @returns 
     */
    public getNodeIsHide(path: string): boolean {
        let node = this.getOrAddNode(path);
        return node.isHide;
    }

    /**
     * 设置节点是否隐藏
     * @param path 
     * @param isHide 
     */
    public setNodeIsHide(path: string, isHide: boolean): void {
        let node = this.getOrAddNode(path);
        node.isHide = isHide;
    }

    /**
     * 监听变化
     * @param path 
     * @param callback 
     * @param target 
     */
    public on(path: string, callback: (newValue: number, newCount: number) => void, target: any = null) {
        let node = this.getOrAddNode(path);
        node.on(callback, target);
    }

    /**
     * 取消监听变化
     * @param path 
     * @param callback 
     * @param target 
     */
    public off(path: string, callback: (newValue: number, newCount: number) => void, target: any = null) {
        let node = this.getOrAddNode(path);
        node.off(callback, target);
    }

    /**
     * 取消监听变化通过目标
     * @param path 
     * @param target 
     */
    public targetOff(path: string, target: any) {
        let node = this.getOrAddNode(path);
        node.targetOff(target);
    }

    /**
     * 清除监听变化
     * @param path 
     */
    public clearOff(path: string) {
        let node = this.getOrAddNode(path);
        node.clearOff();
    }

    /**
     * 创建节点
     * @param name 
     * @param parent 
     */
    public createNode(name: string, parent: ReddotNode = null): ReddotNode {
        let node: ReddotNode = null;
        if (this._pool == null || this._pool.length == 0) {
            node = new ReddotNode();
        } else {
            node = this._pool.pop();
        }
        node.init(this, name, parent);
        return node;
    }

    /**
     * 释放节点
     * @param node 
     */
    public releaseNode(node: ReddotNode): void {
        if (this._pool == null) {
            this._pool = [];
        }
        if (node != null && node.isInit == true && node.reddot == this) {
            if (this._dirtyNodes != null) {
                this._dirtyNodes.delete(node);
            }
            node.dispose();
            this._pool.push(node);
        } else {
            throw new Error("红点节点回收错误,当前节点为空或者不是有效节点或者不属于当前红点 " + node?.fullPath);
        }
    }

    /**
     * 标记脏节点
     * @param node 
     */
    public markDirtyNode(node: ReddotNode): void {
        if (this._dirtyNodes == null) {
            this._dirtyNodes = new Set<ReddotNode>();
        }

        if (node != null && node.isInit == true && node.reddot == this) {
            this._dirtyNodes.add(node);
        }
    }

    /**
     * 驱动更新脏数据
     * @param delta 
     */
    public tick(delta: number): void {
        if (this._dirtyNodes == null || this._dirtyNodes.size == 0) {
            return;
        }

        if (this._tempDirtyNodes == null) {
            this._tempDirtyNodes = [];
        }

        this._dirtyNodes.forEach((node) => {
            if (node.isInit == true && node.reddot == this) {
                this._tempDirtyNodes.push(node);
            }
        });
        this._dirtyNodes.clear();

        for (let index = 0; index < this._tempDirtyNodes.length; index++) {
            const node = this._tempDirtyNodes[index];
            node.change();
        }

        this._tempDirtyNodes = [];
    }
}

import ReddotNode from "./ReddotNode";

