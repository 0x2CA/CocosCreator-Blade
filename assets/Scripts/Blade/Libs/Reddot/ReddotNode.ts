/**
 * 红点节点
 */
class ReddotNode {

    /**
     *  是否初始化
     */
    private _isInit: boolean = false;

    /**
     * 事件
     */
    private _event: cc.EventTarget = null;

    /**
     * 红点
     */
    private _reddot: Reddot = null;

    /**
     * 完整路径
     */
    private _fullPath: string = null;

    /**
     * 名称
     */
    private _name: string = null;

    /**
     * 父亲
     */
    private _parent: ReddotNode = null;

    /**
     * 孩子们
     */
    private _children: Map<string, ReddotNode> = null;

    /**
     * 经过
     */
    private _pass: number = 0;

    /**
     * 结束
     */
    private _end: number = 0;

    /**
     * 值
     */
    private _value: number = 0;

    /**
     * 数量
     */
    private _count: number = 0;

    /**
     * 是否隐藏
     */
    private _isHide: boolean = false;

    /**
     *  是否初始化
     */
    public get isInit(): boolean {
        return this._isInit;
    }

    /**
     * 红点
     */
    public get reddot(): Reddot {
        return this._reddot;
    }

    /**
     * 名称
     */
    public get name(): string {
        return this._name;
    }

    /**
     * 完整路径
     */
    public get fullPath(): string {
        if (this._fullPath == null || this._fullPath == "") {
            if (this._parent == null || this._parent == this._reddot.root) {
                this._fullPath = this._name;
            } else {
                this._fullPath = this._parent.fullPath + this._reddot.splitChar + this._name;
            }
        }

        return this._fullPath;
    }

    /**
     * 父亲
     */
    public get parent(): ReddotNode {
        return this._parent;
    }

    /**
     * 经过
     */
    public get pass(): number {
        return this._pass;
    }

    /**
     * 结束
     */
    public get end(): number {
        return this._end;
    }

    /**
     * 值
     */
    public get value(): number {
        return this._value;
    }

    /**
     *  设置值
     */
    public set value(newValue: number) {
        if (this._isInit == false) {
            throw new Error("红点节点设置值失败,当前节点没有初始化");
        }

        if (this._value != newValue) {
            this._value = newValue;
            this.change();
        }
    }

    /**
     * 数量
     */
    public get count(): number {
        return this._count;
    }

    /**
     *  是否隐藏
     */
    public get isHide(): boolean {
        return this._isHide;
    }

    /**
     *  设置是否隐藏
     */
    public set isHide(status: boolean) {
        if (this._isInit == false) {
            throw new Error("红点节点设置隐藏失败,当前节点没有初始化");
        }

        if (this._isHide != status) {
            this._isHide = status;
            // 计数不为0，父亲需要更新
            if (this._count != 0) {
                this._reddot.markDirtyNode(this._parent);
            }
        }
    }

    /**
     * 初始化
     * @param reddot 
     * @param name 
     * @param parent 
     */
    public init(reddot: Reddot, name: string, parent: ReddotNode = null): void {
        if (this._isInit != false) {
            throw new Error("红点节点初始化失败,重复初始化 " + this.fullPath);
        }

        this._isInit = true;
        this._reddot = reddot;
        this._name = name;
        this._parent = parent;
    }

    /**
     * 销毁
     */
    public dispose(): void {
        if (this._isInit != true) {
            throw new Error("红点节点销毁失败,重复销毁");
        }

        this.clearOff();
        this.removeAllChild();
        this._reddot = null;
        this._fullPath = null;
        this._name = null;
        this._parent = null;
        this._pass = 0;
        this._end = 0;
        this._value = 0;
        this._count = 0;
        this._isInit = false;
    }

    /**
     * 获取孩子
     * @param name 
     * @returns 
     */
    public getChild(name: string): ReddotNode {
        if (this._isInit == false) {
            throw new Error("红点节点获取孩子失败,当前节点没有初始化");
        }

        if (this._children == null) {
            return null;
        }

        return this._children.get(name);
    }

    /**
     * 添加孩子
     * @param name 
     * @returns 
     */
    public addChild(name: string): ReddotNode {
        if (this._isInit == false) {
            throw new Error("红点节点添加孩子失败,当前节点没有初始化");
        }

        if (this._children == null) {
            this._children = new Map<string, ReddotNode>();
        }

        let child = this._children.get(name);

        if (child != null) {
            throw new Error("红点节点添加孩子失败，不允许重复添加 " + child.fullPath);
        }

        child = this._reddot.createNode(name, this);

        this._children.set(name, child);

        return child;
    }

    /**
     * 获取或者添加孩子
     * @param name 
     * @returns 
     */
    public getOrAddChild(name: string): ReddotNode {
        if (this._isInit == false) {
            throw new Error("红点节点添加或者创建孩子失败,当前节点没有初始化");
        }

        let child = this.getChild(name);

        if (child == null) {
            child = this.addChild(name);
        }

        return child;
    }

    /**
     * 移除孩子
     * @param name 
     * @returns 
     */
    public removeChild(name: string): boolean {
        if (this._isInit == false) {
            throw new Error("红点节点移除孩子失败,当前节点没有初始化");
        }

        if (this._children == null || this._children.size == 0) {
            return false;
        }

        let child = this.getChild(name);

        if (child == null) {
            return false;
        }

        this._children.delete(name);

        this._reddot.releaseNode(child);

        this.change();
    }

    /**
     * 移除所有孩子
     * @returns 
     */
    public removeAllChild(): void {
        if (this._isInit == false) {
            throw new Error("红点节点移除所有孩子失败,当前节点没有初始化");
        }

        if (this._children == null || this._children.size == 0) {
            return;
        }

        this._children.forEach((child) => {
            this._reddot.releaseNode(child);
        });
        this._children.clear();

        this.change();
    }

    /**
     * 添加结束标记
     */
    public addEnd() {
        if (this._isInit == false) {
            throw new Error("红点节点添加结束失败,当前节点没有初始化");
        }

        this._end++;

        let node: ReddotNode = this;

        do {
            node._pass++;
            node = node._parent;
        } while (node != null);
    }

    /**
     * 移除结束标记
     */
    public removeEnd() {
        if (this._isInit == false) {
            throw new Error("红点节点移除结束失败,当前节点没有初始化");
        }

        if (this._end <= 0) {
            throw new Error("红点节点移除结束失败,结束标记小于等于0 " + this._end);
        }

        this._end--;

        let node: ReddotNode = this;

        do {
            node._pass--;
            node = node._parent;
        } while (node != null);
    }

    /**
     * 改变
     */
    public change(): void {
        if (this._isInit == false) {
            throw new Error("红点节点改变失败,当前节点没有初始化");
        }

        let oldCount = this._count;
        this._count = this._value;

        if (this._children != null) {
            this._children.forEach((child) => {
                if (child.isHide == false) {
                    // 不隐藏才能统计
                    this._count += child.count;
                }
            });
        }

        if (oldCount != this.count) {
            if (this._event != null) {
                this._event.emit(ReddotNode.CHANGE_EVENT, this._value, this._count);
            }

            // 计数变动,父亲需要更新
            this._reddot.markDirtyNode(this._parent);
        }
    }

    /**
     * 转为字符串
     * @returns 
     */
    public toString(): string {
        return this.fullPath;
    }

    /**
     * 监听变化
     * @param callback 
     * @param target 
     */
    public on(callback: (newValue: number, newCount: number) => void, target: any = null) {
        if (this._event == null) {
            this._event = new cc.EventTarget();
        }

        this._event.on(ReddotNode.CHANGE_EVENT, callback, target);
    }

    /**
     * 取消监听变化
     * @param callback 
     * @param target 
     */
    public off(callback: (newValue: number, newCount: number) => void, target: any = null) {
        if (this._event != null) {
            this._event.off(ReddotNode.CHANGE_EVENT, callback, target);
        }
    }

    /**
     * 取消监听变化通过目标
     * @param target 
     */
    public targetOff(target: any) {
        if (this._event != null) {
            this._event.targetOff(target);
        }
    }

    /**
     * 清除监听变化
     */
    public clearOff() {
        if (this._event != null) {
            this._event.clear();
        }
    }
}

namespace ReddotNode {
    export let CHANGE_EVENT = "change";
}

export default ReddotNode;

import Reddot from "./Reddot";

