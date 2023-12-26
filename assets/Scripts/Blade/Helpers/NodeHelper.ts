import RedPoint from "../Components/RedPoint";
import TimerService from "../Services/TimerService";

export default class NodeHelper {

    private static _canvasLayer: cc.Node = null;
    private static _uiLayer: cc.Node = null;
    private static _mainLayer: cc.Node = null;
    private static _mapLayer: cc.Node = null;
    private static _tipLayer: cc.Node = null;
    private static _effectLayer: cc.Node = null;
    private static _guideLayer: cc.Node = null;
    private static _topLayer: cc.Node = null;

    /**
     * 获取画布层
     * @returns
     */
    public static getCanvas() {
        if (this._canvasLayer == null) {
            this._canvasLayer = cc.find("Canvas");
        }
        return this._canvasLayer;
    }

    /**
     * 获取地图层
     * @returns
     */
    public static getMapLayer() {
        if (this._mapLayer == null) {
            this._mapLayer = cc.find("Canvas/MapLayer");
        }
        return this._mapLayer;
    }

    /**
     * 获取主页层
     * @returns
     */
    public static getMainLayer() {
        if (this._mainLayer == null) {
            this._mainLayer = cc.find("Canvas/MainLayer");
        }
        return this._mainLayer;
    }

    /**
     * 获取UI层
     * @returns
     */
    public static getUILayer() {
        if (this._uiLayer == null) {
            this._uiLayer = cc.find("Canvas/UILayer");
        }
        return this._uiLayer;
    }

    /**
     * 获取提示层
     * @returns
     */
    public static getTipLayer() {
        if (this._tipLayer == null) {
            this._tipLayer = cc.find("Canvas/TipLayer");
        }
        return this._tipLayer;
    }

    /**
     * 获取特效层
     * @returns
     */
    public static getEffectLayer() {
        if (this._effectLayer == null) {
            this._effectLayer = cc.find("Canvas/EffectLayer");
        }
        return this._effectLayer;
    }

    /**
     * 获取教程层
     * @returns
     */
    public static getGuideLayer() {
        if (this._guideLayer == null) {
            this._guideLayer = cc.find("Canvas/GuideLayer");
        }
        return this._guideLayer;
    }

    /**
     * 获取最顶层
     * @returns
     */
    public static getTopLayer() {
        if (this._topLayer == null) {
            this._topLayer = cc.find("Canvas/TopLayer");
        }
        return this._topLayer;
    }

    /**
     *
     *
     * 不变动位置情况更换父亲
     *
     * @static
     * @param {cc.Node} sub
     * @param {cc.Node} father
     * @memberof NodeHelper
     */
    public static changeParent(sub: cc.Node, father: cc.Node, zIndex?: number) {
        let location = father.convertToNodeSpaceAR(sub.convertToWorldSpaceAR(cc.Vec2.ZERO));
        sub.parent = null;
        father.addChild(sub, zIndex);
        sub.x = location.x;
        sub.y = location.y;
    }

    /**
     * 判断2个节点是否碰撞
     *
     * @static
     * @param {cc.Node} node1
     * @param {cc.Node} node2
     * @returns
     * @memberof NodeHelper
     */
    public static isCollide(node1: cc.Node, node2: cc.Node) {
        let node1Points = NodeHelper.getPoints(node1);
        let node2Points = NodeHelper.getPoints(node2);

        for (let index = 0; index < node1Points.length; index++) {
            const vec = node1Points[index];
            if (NodeHelper.isInNode(node2, vec)) {
                return true;
            }
        }

        for (let index = 0; index < node2Points.length; index++) {
            const vec = node2Points[index];
            if (NodeHelper.isInNode(node1, vec)) {
                return true;
            }
        }

        return false;
    }

    /**
     * 获取四个角位置（世界坐标）
     *
     * @static
     * @param {cc.Node} node
     * @returns
     * @memberof NodeHelper
     */
    public static getPoints(node: cc.Node) {
        let result = new Array<cc.Vec2>();
        result.push(node.convertToWorldSpaceAR(new cc.Vec2(node.width / 2, node.height / 2)));
        result.push(node.convertToWorldSpaceAR(new cc.Vec2(-node.width / 2, -node.height / 2)));
        result.push(node.convertToWorldSpaceAR(new cc.Vec2(+node.width / 2, -node.height / 2)));
        result.push(node.convertToWorldSpaceAR(new cc.Vec2(-node.width / 2, +node.height / 2)));
        return result;
    }

    /**
     * 判断一个点（世界坐标）是否在节点内
     *
     * @static
     * @param {cc.Node} node
     * @param {cc.Vec2} vec
     * @returns
     * @memberof NodeHelper
     */
    public static isInNode(node: cc.Node, vec: cc.Vec2) {
        let location = node.convertToNodeSpaceAR(vec);
        if (Math.abs(location.x) <= node.width / 2 && Math.abs(location.y) <= node.height / 2) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 节点置灰
     * @param node
     * @param gray
     * @param defaultMaterial
     */
    public static setGray(node: cc.Node, gray: boolean = true, defaultMaterial: cc.Material = cc.Material.createWithBuiltin("2d-sprite", 0)) {
        let gray_material = cc.Material.createWithBuiltin("2d-gray-sprite", 0);

        let sp = node.getComponent(cc.Sprite);
        if (sp) {
            if (gray) {
                sp.setMaterial(0, gray_material);
            } else {
                sp.setMaterial(0, defaultMaterial);
            }
        }

        const childrenSprite = node.getComponentsInChildren(cc.Sprite);
        for (const cs of childrenSprite) {
            if (cs.node != node) {
                this.setGray(cs.node, gray);
            }
        }

        const childrenOutline = node.getComponentsInChildren(cc.LabelOutline);
        for (const co of childrenOutline) {
            if (co.node != node) {
                // 灰色直接禁用描边
                co.enabled = !gray;
            }
        }
    }

    //按钮置灰 nodeEvent 置灰屏蔽node事件
    public static setBtnGrayState(node: cc.Node, isGray: boolean = true, pauseNodeEvent: boolean = false) {
        if (node == null) {
            return;
        }
        let btn = node.getComponent(cc.Button);
        if (!btn) {
            return;
        }
        btn.interactable = !isGray;
        btn.enableAutoGrayEffect = isGray;
        if (pauseNodeEvent) {
            if (isGray) {
                node.pauseSystemEvents(true);
            } else {
                node.resumeSystemEvents(true);
            }
        }
    }

    public static isBtnGray(node: cc.Node) {
        let btn = node.getComponent(cc.Button);
        if (!btn) {
            return false;
        }
        return !btn.interactable;
    }

    /**
     * 多点击拦截
     */
    public static redirectNodeEvent() {
        let currentTarget: cc.Node = null;
        let touchId: number = null;
        let timer: TimerService.Timer = null;
        let timeout = .2;
        // 旧的广播
        let dispatchEvent = cc.Node.prototype.dispatchEvent;
        // 重载节点事件分发
        cc.Node.prototype.dispatchEvent = function (event: cc.Event.EventTouch) {

            if (event.type == cc.Node.EventType.TOUCH_START ||
                event.type == cc.Node.EventType.TOUCH_MOVE ||
                event.type == cc.Node.EventType.TOUCH_END ||
                event.type == cc.Node.EventType.TOUCH_CANCEL) {
                // console.log("点击", "信息", event.type, event.getID(), event.currentTarget, event.target);
                // console.log(touchId, currentTarget);

                if (event.target == null && event.currentTarget == null) {
                    // console.log("点击", "信息无来源", event.type, event);
                    if (event.type == cc.Node.EventType.TOUCH_END || event.type == cc.Node.EventType.TOUCH_CANCEL) {
                        if (timer != null) {
                            blade.timer.stop(timer);
                            timer = null;
                        }
                    }
                    dispatchEvent.call(this, event);
                    if (event.type == cc.Node.EventType.TOUCH_END || event.type == cc.Node.EventType.TOUCH_CANCEL) {
                        // 取消
                        timer = blade.timer.startTimeout(timeout, () => {
                            touchId = null;
                            currentTarget = null;
                            timer = null;
                        });
                    }
                    return;
                }

                if (currentTarget != null && event.target == currentTarget) {
                    dispatchEvent.call(this, event);
                    return;
                }

                if (event.type == cc.Node.EventType.TOUCH_START) {
                    if ((touchId == null && currentTarget == null) || (event.getID() == touchId && event.currentTarget == currentTarget)) {
                        // 清除
                        if (timer != null) {
                            blade.timer.stop(timer);
                            timer = null;
                        }
                        touchId = event.getID();
                        currentTarget = event.currentTarget;
                        dispatchEvent.call(this, event);
                        // if (event.isStopped() == true) {
                        //     // 停止下传
                        //     touchId = null;
                        //     currentTarget = null;
                        //     timer = null;
                        // }
                        return;
                    }
                } else if (event.type == cc.Node.EventType.TOUCH_MOVE) {
                    if ((touchId == null && currentTarget == null) || (event.getID() == touchId && event.currentTarget == currentTarget)) {
                        // 清除
                        if (timer != null) {
                            blade.timer.stop(timer);
                            timer = null;
                        }
                        touchId = event.getID();
                        currentTarget = event.target || event.currentTarget;
                        dispatchEvent.call(this, event);
                        // if (event.isStopped() == true) {
                        //     // 停止下传
                        //     touchId = null;
                        //     currentTarget = null;
                        //     timer = null;
                        // }
                        return;
                    }
                } else if (event.type == cc.Node.EventType.TOUCH_END) {
                    if ((touchId == null && currentTarget == null) || event.getID() == touchId) {
                        if (timer != null) {
                            blade.timer.stop(timer);
                            timer = null;
                        }
                        dispatchEvent.call(this, event);
                        touchId = null;
                        timer = blade.timer.startTimeout(timeout, () => {
                            currentTarget = null;
                            timer = null;
                        });
                    }
                    return;
                } else if (event.type == cc.Node.EventType.TOUCH_CANCEL) {
                    if ((touchId == null && currentTarget == null) || event.getID() == touchId) {
                        if (timer != null) {
                            blade.timer.stop(timer);
                            timer = null;
                        }
                        dispatchEvent.call(this, event);
                        touchId = null;
                        timer = blade.timer.startTimeout(timeout, () => {
                            currentTarget = null;
                            timer = null;
                        });
                    }
                    return;
                }

                // console.log("点击", "拦截", event.type, event.getID(), touchId, currentTarget, event.target, event.currentTarget);
            } else {
                dispatchEvent.call(this, event);
            }
        }
    }

    //填充背景图
    public static fillSpriteByWinSize(target: cc.Sprite | cc.Node) {
        let sprite: cc.Sprite = null;
        if (target instanceof cc.Sprite) {
            sprite = target;
        } else {
            sprite = target.getComponent(cc.Sprite);
        }

        if (sprite != null) {
            let rect = sprite.spriteFrame.getOriginalSize();
            let rWidth = rect.width;
            let rHeight = rect.height;
            NodeHelper.fillNodeByWinSize(sprite.node, rWidth, rHeight);
        }
    }

    public static fillNodeByWinSize(target: cc.Node, width: number, height: number) {
        if (target != null) {

            let scale = Math.max(
                cc.winSize.width / width,
                cc.winSize.height / height
            );

            if (
                cc.winSize.width > width * scale ||
                cc.winSize.height > height * scale
            ) {
                // 显示全部画面
                let scaleForShowAll = Math.min(
                    cc.winSize.width / width,
                    cc.winSize.height / height
                );

                let realWidth = width * scaleForShowAll;
                let realHeight = height * scaleForShowAll;

                // 把空位填满
                scale = Math.max(
                    cc.winSize.width / realWidth,
                    cc.winSize.height / realHeight
                );
            }

            target.scale = scale;
        }
    }

    //处理父节点名字相同bug，寻找子节点, 先cc.find 找不到getChildByName
    public static findNodeByName(path: string, referenceNode?: cc.Node) {
        if (path == null) {
            console.log("path is null");
            return;
        }
        let target: cc.Node = null;
        let findChild = (targetName: string, node?: cc.Node) => {
            if (node.children.length != 0) {
                for (var i = 0; i < node.children.length; i++) {
                    if (node.children[i].name === targetName) {
                        target = node.children[i];
                        break;
                    } else {
                        var childNode = node.children[i];
                        findChild(targetName, childNode);
                    }
                }
            }
        }

        target = cc.find(path, referenceNode);
        if (target == null) {
            let targetName = path.split("/").pop();
            let parentNode: cc.Node = referenceNode ? referenceNode : this.getCanvas();
            findChild(targetName, parentNode)
        }
        if (target == null) {
            console.log("target is null");
        }
        return target;
    }

    public static updateSizeByLabel(target: cc.Node | cc.Label) {
        let label: cc.Label = null;

        if (target == null) {
            return;
        }

        if (target instanceof cc.Node) {
            target.getComponent(cc.Label);
        } else {
            label = target;
        }

        if (label != null) {
            (label as any)._forceUpdateRenderData(true);
        }
    }

    public static updateSizeByRichText(target: cc.Node | cc.RichText) {
        let richText: cc.RichText = null;

        if (target == null) {
            return;
        }

        if (target instanceof cc.Node) {
            richText = target.getComponent(cc.RichText);
        } else {
            richText = target;
        }

        if (richText != null) {
            (richText as any)._updateRichText();
        }
    }

    //设置小红点
    public static setRedPointState(node: cc.Node, state: boolean = false, pos: cc.Vec2 = new cc.Vec2(0, 0)) {
        if (node == null) {
            return;
        }
        let reddot = node.getComponent(RedPoint);
        if (!reddot && !state) {
            return;
        }
        if (!reddot) {
            reddot = node.addComponent(RedPoint);
        }
        reddot.setRedPointState(state, pos);
        return reddot;
    }
}