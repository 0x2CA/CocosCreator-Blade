/*
 * @作者: 0x2CA
 * @创建时间: 2023-03-15
 * @最后编辑时间: 2023-06-20
 * @最后编辑者: 0x2CA
 * @描述:
 */
import Blade from "./Blade/Blade";
import GameCtrl from "./Module/Controllers/GameCtrl";

declare global {
    const blade: Blade;
}

if (typeof blade == typeof undefined) {

    const blade = Blade.getInstance();

    window["blade"] = blade;

    if (cc.sys.platform == cc.sys.EDITOR_PAGE || cc.sys.platform == cc.sys.EDITOR_CORE) {
        blade.locale.setLang(blade.locale.getLang());
    } else {
        // App初始化
        cc.game.once(cc.game.EVENT_ENGINE_INITED, () => {

        });

        console.log("App初始化")

        // 场景初次启动
        cc.director.on(cc.Director.EVENT_AFTER_SCENE_LAUNCH, (scene: cc.Scene) => {
            console.log("场景初次启动");
            // 添加常驻节点
            let node = cc.find("Blade");
            if (node == null) {
                node = new cc.Node();
                node.name = "Blade";
                node.parent = scene;
            }

            // 更新常驻节点的位置和尺寸
            node.x = cc.winSize.width * 0.5;
            node.y = cc.winSize.height * 0.5;
            node.width = cc.winSize.width;
            node.height = cc.winSize.height;

            if (!cc.game.isPersistRootNode(node)) {
                cc.game.addPersistRootNode(node);
            }
        });

        // 延迟初始化
        cc.director.once(cc.Director.EVENT_AFTER_SCENE_LAUNCH, (scene: cc.Scene) => {
            console.log("延迟初始化")
            let gameCtrl = blade.ctrl.get(GameCtrl)
            let runGame = Reflect.get(gameCtrl, "runGame");
            runGame.call(gameCtrl);
        });

        cc.game.on(cc.game.EVENT_HIDE, () => {
            console.log("游戏进入后台");
        });

        cc.game.on(cc.game.EVENT_SHOW, () => {
            console.log("重新返回游戏");
        });

        if (cc.director.getScene() != null) {
            // 添加常驻节点
            let node = cc.find("Blade");
            if (node == null) {
                node = new cc.Node();
                node.name = "Blade";
                node.parent = cc.director.getScene();
            }
            // 更新常驻节点的位置和尺寸
            node.x = cc.winSize.width * 0.5;
            node.y = cc.winSize.height * 0.5;
            node.width = cc.winSize.width;
            node.height = cc.winSize.height;

            if (!cc.game.isPersistRootNode(node)) {
                cc.game.addPersistRootNode(node);
            }

            let gameCtrl = blade.ctrl.get(GameCtrl)
            let runGame = Reflect.get(gameCtrl, "runGame");
            runGame.call(gameCtrl);
        }

        // 开启动态合图
        cc.macro.CLEANUP_IMAGE_CACHE = false;
        cc.dynamicAtlasManager.enabled = true;
        console.log("开启动态合图:", cc.macro.CLEANUP_IMAGE_CACHE, cc.dynamicAtlasManager.enabled)

        // 抗锯齿开启
        cc.view.enableAntiAlias(true);
        cc.macro.ENABLE_WEBGL_ANTIALIAS = true;
    }
}
