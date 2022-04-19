import PopupBase from "../Bases/PopupBase";
import PriorityQueue from "../Libs/Structs/PriorityQueue";
import ITicker from "../../Blade/Interfaces/ITicker";
import Tween from "../Libs/Tween/Tween";
import PromiseHelper from "../Helpers/PromiseHelper";
import SingletonBase from "../Bases/SingletonBase";
import TickerService from "./TickerService";
import AssetService from "./AssetService";


/**
 * 弹窗服务类
 */
class PopupService extends SingletonBase implements ITicker {

    private static readonly ModalPrefabPath = "Prefabs/Commons/Modal";

    // 当前在显示的弹窗队列
    private readonly list: PriorityQueue<PopupBase> = new PriorityQueue<PopupBase>()
    // Modal组件
    private modal: cc.Node = null;
    private readonly prefabCache: Map<string, cc.Prefab> = new Map<string, cc.Prefab>()

    private event: cc.EventTarget = new cc.EventTarget();

    public async onInitialize() {
        this.list.clear();
        this.prefabCache.clear();

        try {
            let prefab = await AssetService.getInstance().loadAssetAsync("Modal.prefab", cc.Prefab) as cc.Prefab;
            // 添加模态层节点
            const appNode = cc.find("Blade");
            if (appNode == null) {
                throw new Error("没有Blade节点")
            }
            const modalNode: cc.Node = cc.instantiate(prefab);
            modalNode.parent = appNode;
            modalNode.active = false;
            modalNode.zIndex = -1;
            this.modal = modalNode;
        } catch (error) {
            cc.error(`不存在模态层预制件Modal.prefab`);
            this.createModal();
        }

        TickerService.getInstance().on(this);
    }

    public onDispose() {
    }

    /**
    * 打印信息
    * @param name
    */
    info(name?: string) {
        if (name) {
            if (this.prefabCache.has(name)) {
                cc.log(name + ":", this.prefabCache.get("name"));
            } else {
                cc.log(`没有注册${name}弹窗`);
            }
        } else {
            let info = "弹窗信息:\n"

            this.prefabCache.forEach((vaule, key) => {
                info += "   " + key + "    ✔" + "\n";
            })

            if (info == "弹窗信息:\n") {
                info += "   没有注册弹窗";
            }

            cc.log(info)
        }
    }

    /**
     * 创建一个模态层
     */
    createModal() {
        if (this.modal == null) {
            const appNode = cc.find("Blade");
            if (appNode == null) {
                throw new Error("没有Blade节点")
            }

            // 添加模态层节点
            const modalNode: cc.Node = new cc.Node("Modal");
            modalNode.addComponent(cc.BlockInputEvents)
            const modalWidget = modalNode.addComponent(cc.Widget)
            modalWidget.isAlignTop = true;
            modalWidget.isAlignBottom = true;
            modalWidget.isAlignLeft = true;
            modalWidget.isAlignRight = true;
            modalWidget.top = 0
            modalWidget.bottom = 0
            modalWidget.left = 0
            modalWidget.right = 0
            modalNode.parent = appNode;
            modalNode.active = false;
            modalNode.zIndex = -1;
            this.modal = modalNode;

            // const backgroundNode = new cc.Node("Background");
            // backgroundNode.color = cc.Color.BLACK;
            // backgroundNode.opacity = 150;
            // const backgroundSprite = backgroundNode.addComponent(cc.Sprite)
            // cc.assetManager.load("db://internal/image/default_sprite_splash.png", (err: Error, res: any) => {
            //     if (err) {
            //         cc.error(err);
            //         backgroundNode.active = false;
            //     } else {
            //         backgroundSprite.spriteFrame = new cc.SpriteFrame(res);
            //     }
            // })
            // const backgroundWidget = backgroundNode.addComponent(cc.Widget)
            // backgroundWidget.isAlignTop = true;
            // backgroundWidget.isAlignBottom = true;
            // backgroundWidget.isAlignLeft = true;
            // backgroundWidget.isAlignRight = true;
            // backgroundWidget.top = 0
            // backgroundWidget.bottom = 0
            // backgroundWidget.left = 0
            // backgroundWidget.right = 0
            // backgroundNode.parent = modalNode;
        }
    }

    /**
    * 添加一个需要弹的窗口到待弹队列中
    * @param info
    */
    private pop(info: PopupService.PopInfo): Promise<string> {

        //存在等待列表内
        if (info.name != null && info.name != "" && this.list.some((vaule) => {
            cc.log(vaule.name, info.name)
            return vaule.name == info.name
        })) {
            return Promise.reject("Panel已经在列表内");
        }

        return new Promise(async (resolve, reject) => {

            await PromiseHelper.waitUntil(() => this.modal)


            try {
                let panelNode: cc.Node;
                if (info.node instanceof cc.Prefab) {
                    // 预制体
                    panelNode = cc.instantiate(info.node);
                } else if (info.node instanceof cc.Node) {
                    // 节点
                    panelNode = info.node;
                } else if (typeof info.node == "string") {

                    let prefab: cc.Prefab = null;
                    let prefabName = info.node + ".prefab";
                    if (this.prefabCache.has(prefabName)) {
                        prefab = this.prefabCache.get(prefabName)
                    } else {
                        prefab = await AssetService.getInstance().loadAssetAsync(prefabName, cc.Prefab) as cc.Prefab;

                        this.prefabCache.set(prefabName, prefab);
                    }
                    panelNode = cc.instantiate(prefab);
                } else {
                    throw new Error(`${info.node}不是有效的弹窗!`);
                }

                if (panelNode == null) {
                    throw new Error("面板资源创建失败");
                }

                const panel: PopupBase = panelNode.getComponent(PopupBase);

                // 填充文字
                if (info.template != null) {
                    const viewsComponent = panelNode.getComponents(PopupBase);
                    if (viewsComponent && viewsComponent.length > 0) {
                        for (const v of viewsComponent) {
                            if (v.applyTemplate) {
                                v.applyTemplate(info.template);
                            }
                        }
                    }
                }

                // 点击回调
                panelNode.once(
                    PopupService.EventType.POPUP_CLICK,
                    async (eventType: string, panel: PopupBase | cc.Node) => {
                        this.emit(PopupService.EventType.POPUP_CLICK, eventType, panel);

                        if (panel instanceof cc.Node) {
                            panel = panel.getComponent(PopupBase);
                        }

                        await panel.disappear();
                        panel.onDisappear();
                        // 发送隐藏通知
                        this.emit(PopupService.EventType.PANEL_DISABLE);
                        // 移出队列
                        this.list.dequeue();
                        // 执行回调
                        if (info.callback) {
                            info.callback.call(info.callbackTarget, eventType);
                        }
                        resolve(eventType);
                    },
                    this
                );


                panelNode.active = false;
                panelNode.parent = this.modal;

                if (info.immediate && this.list.size() > 0) {
                    // 插队显示
                    await this.list.front().element.disappear()
                    this.list.front().element.node.active = false;
                    let priority = this.list.front().priority + 1
                    this.list.enqueue(panel, priority);
                } else {
                    this.list.enqueue(panel);
                }
            } catch (error) {
                resolve(error);
            }
        })
    }

    /**
     * 显示弹窗
     * 默认等待
     */
    public popNode(
        node: cc.Node | cc.Prefab | string,
        template: { [key: string]: any } = {},
        callback?: (type: string) => void,
        thisTarget?: any
    ) {
        return this.pop({
            template: template,
            node: node,
            callback: callback,
            callbackTarget: thisTarget,
            immediate: false,
        });
    }

    /**
     * 显示弹窗，强行插队
     * @param node
     * @param template
     * @param callback
     * @param thisTarget
     */
    public popNodeTop(
        node: cc.Node | cc.Prefab | string,
        template: { [key: string]: any } = {},
        callback?: (type: string) => void,
        thisTarget?: any
    ) {
        return this.pop({
            template: template,
            node: node,
            callback: callback,
            callbackTarget: thisTarget,
            immediate: true,
        });
    }

    /**
     * 是否显示弹窗
     */
    public isShow() {
        return this.list.size() > 0
    }

    /**
     * 显示模态层
     */
    private showModal() {
        if (this.modal == null || this.modal.active) {
            return;
        }

        this.modal.active = true;
        this.modal.opacity = 0;
        Tween.get(this.modal)
            .to({ opacity: 255 }, 100)
    }


    /**
     * 隐藏模态层
     */
    private hideModal(): Promise<any> {
        if (this.modal == null) {
            return Promise.reject();
        }

        this.modal.active = false;
        return Promise.resolve();
    }

    /**
    * 显示最前面的面板
    */
    private showPanel() {
        const panel = this.list.front().element;
        this.list.front().element.node.active = true;
        panel.appear().catch((err) => {
            // 弹出失败, 直接移除
            this.list.dequeue()
            cc.warn(err);
        });
        // 发送模态层弹出通知
        this.emit(PopupService.EventType.PANEL_ENABLE);
    }

    onTick(delta: number): void {
        // 弹窗队列为空
        if (this.list.size() <= 0) {
            if (this.modal && this.modal.active) {
                this.hideModal();
            }
            return;
        }

        // 最后一个弹窗已经在显示
        if (this.list.front().element.node.active) {
            return;
        }

        //队列有数据，且没有显示任何弹窗
        this.showModal();
        this.showPanel();
    }

    public hasEventListener(type: string): boolean {
        return this.event.hasEventListener(type);
    }

    public emit(key: string, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any): void {
        this.event.emit(key, arg1, arg2, arg3, arg4, arg5);
    }

    public on<T extends Function>(type: string, callback: T, target?: any, useCapture?: boolean): T {
        return this.event.on(type, callback, target, useCapture);
    }

    public off(type: string, callback?: Function, target?: any): void {
        this.event.off(type, callback, target);
    }

    public targetOff(target: any): void {
        this.event.targetOff(target);
    }

    public once(type: string, callback: (arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any) => void, target?: any): void {
        this.on(type, callback, target, true);
    }

}

namespace PopupService {
    //事件
    export enum EventType {
        POPUP_CLICK = "POPUP_CLICK",
        PANEL_DISABLE = "PANEL_DISABLE",
        PANEL_ENABLE = "PANEL_ENABLE"

    }

    export interface PopInfo {
        /**
         * 弹窗名字, 如果不为空, 则表示该弹窗为单例, 队列中不能同时出现两个同名的弹窗
         */
        name?: string;
        /**
         * 自定义模版使用的文本替换
         */
        template?: { [key: string]: any };
        /**
         * 按钮回调
         */
        callback?: (type: string) => void;
        /**
         * 按钮回调上下文
         */
        callbackTarget?: any;
        /**
         * 是否直接显示, 默认会在待弹队列中
         */
        immediate?: boolean;
        /**
         * 弹窗模版, 如果为空则使用默认
         * Prefab类型则动态实例化
         * Node类型则直接激活
         * string类型则动态加载后实例化
         * 模版内必须有PopPanel组件或者继承PopPanel的组件
         */
        node?: cc.Prefab | cc.Node | string;
    }
}

export default PopupService;
