
import ControllerBase from "../../Blade/Bases/ControllerBase";
import Controller from "../../Blade/Decorators/Controller";
import LocalizedService from "../../Blade/Services/LocalizedService";
import PlatformService from "../../Blade/Services/PlatformService";
import GameConfig from "../Defines/GameConfig";
import UICtrl from "./UICtrl";

/*
 * @作者: 0x2CA
 * @创建时间: 2023-03-15
 * @最后编辑时间: 2023-06-20
 * @最后编辑者: 0x2CA
 * @描述:
 */
@Controller("GameCtrl")
class GameCtrl extends ControllerBase {

    protected onInitialize() {
        this.traceError();

        this.debugInfo();

        this.registerImgLoader();

        this.setFrame();

        blade.locale.setLang(LocalizedService.LangType.zh_CN);

        if (cc.sys.os == cc.sys.OS_IOS || cc.sys.os == cc.sys.OS_OSX) {
            cc.view.enableRetina(true);
        } else {
            cc.view.enableRetina(false);
        }

        console.log("视网膜优化:", cc.view.isRetinaEnabled())

        // cc.assetManager.downloader.maxConcurrency = 10;
        // console.log("资源加载并发数量:", cc.assetManager.downloader.maxConcurrency)

        //  屏蔽多点触摸事件
        // cc.macro.ENABLE_MULTI_TOUCH = false;

        // NodeHelper.redirectNodeEvent();
    }

    public onDispose() {
    }

    private runGame() {
        console.log("游戏开始");
        let uiCtrl = blade.ctrl.get(UICtrl)
        let runGame = Reflect.get(uiCtrl, "runGame");
        runGame.call(uiCtrl);
    }

    private traceError() {
        // if (cc.sys.isNative) {
        //     (window as any).__errorHandler = function (errorMessage, file, line, message, error) {
        //         console.log("全局错误", errorMessage, file, line, message, error);
        //     };
        // } else if (cc.sys.isBrowser) {
        //     window.onerror = function (errorMessage, file, line, message, error) {
        //         console.log("全局错误", errorMessage, file, line, message, error);
        //     }
        // }

        // window.addEventListener('unhandledrejection', function (event) {
        //     console.log("全局异步错误", event);
        // });
    }

    private setFrame() {
        // 锁定游戏帧数
        if (blade.platform.getType() == PlatformService.PlatformType.WX) {
            wx.setPreferredFramesPerSecond(GameConfig.frameRate);
        } else if (blade.platform.getType() == PlatformService.PlatformType.BYTEDANCE) {
            tt.setPreferredFramesPerSecond(GameConfig.frameRate);
        } else {
            cc.game.setFrameRate(GameConfig.frameRate);
        }
    }

    private registerWxImgLoader = () => {
        let downloadDomImage = (url, options, onComplete) => {
            const img = wx.createImage();

            let loadCallback = () => {
                img.onload = null;
                img.onerror = null;
                if (onComplete) {
                    onComplete(null, img);
                }
            }

            let errorCallback = () => {
                img.onload = null;
                img.onerror = null;
                if (onComplete) {
                    onComplete(new Error(url));
                }
            }

            img.onload = loadCallback;
            img.onerror = errorCallback;

            img.src = url;
            return img;
        }

        cc.assetManager.downloader.register(".image", (content, options, onComplete) => {
            onComplete(null, content);
        });

        cc.assetManager.parser.register(".image", downloadDomImage);

        let createTexture = (id, data, options, onComplete) => {
            let out = null,
                err = null;
            try {
                out = new cc.Texture2D();
                out._uuid = id;
                out._nativeUrl = id;
                out._nativeAsset = data;
            } catch (e) {
                err = e;
            }
            if (onComplete) {
                onComplete(err, out);
            }
        }

        (cc.assetManager as any).factory.register(".image", createTexture);
    }

    private registerTTImgLoader = () => {
        let downloadDomImage = (url, options, onComplete) => {
            const img = new Image();

            if (window.location.protocol !== 'file:') {
                img.crossOrigin = 'anonymous';
            }

            let loadCallback = () => {
                img.removeEventListener('load', loadCallback);
                img.removeEventListener('error', errorCallback);
                if (onComplete) {
                    onComplete(null, img);
                }
            }

            let errorCallback = () => {
                img.removeEventListener('load', loadCallback);
                img.removeEventListener('error', errorCallback);
                if (onComplete) {
                    onComplete(new Error(url));
                }
            }

            img.addEventListener('load', loadCallback);
            img.addEventListener('error', errorCallback);

            img.src = url;
            return img;
        }

        cc.assetManager.downloader.register(".image", (content, options, onComplete) => {
            onComplete(null, content);
        });

        cc.assetManager.parser.register(".image", downloadDomImage);

        let createTexture = (id, data, options, onComplete) => {
            let out = null,
                err = null;
            try {
                out = new cc.Texture2D();
                out._uuid = id;
                out._nativeUrl = id;
                out._nativeAsset = data;
            } catch (e) {
                err = e;
            }
            if (onComplete) {
                onComplete(err, out);
            }
        }

        (cc.assetManager as any).factory.register(".image", createTexture);
    }

    private registerImgLoader() {
        // 微信平台锁定游戏帧数
        if (blade.platform.getType() == PlatformService.PlatformType.WX) {
            this.registerWxImgLoader();
        } else if (blade.platform.getType() == PlatformService.PlatformType.BYTEDANCE) {
            this.registerTTImgLoader();
        }
    }

    private getTextureMemory() {
        let totalByte = 0
        let formats = cc.Texture2D.PixelFormat;
        cc.assetManager.assets.forEach((asset: cc.Asset, key: string) => {
            if (asset instanceof cc.Texture2D) {
                let tex: cc.Texture2D = asset;
                let pixelByte = 0
                switch (tex.getPixelFormat()) {
                    case formats.RGBA8888:
                        pixelByte = 4;
                        break;
                    case formats.RGB888:
                        pixelByte = 3;
                        break;
                    case formats.RGBA4444:
                    case formats.RGB565:
                        pixelByte = 2;
                        break;
                    case formats.RGB_ETC1:  //4*4像素压缩成8字节,压缩比是 64/8=8
                        pixelByte = 0.5;
                        break;
                    case formats.RGBA_ETC1: //ETC1+A, 压缩比是 64/16=4
                        pixelByte = 1;
                        break;
                    default:
                        // 有其他纹理格式的再补充吧。。。
                        console.warn("PixelFormat : " + tex.getPixelFormat());
                        break;
                }
                totalByte += tex.width * tex.height * pixelByte;
            }
        })
        return totalByte;
    }

    private getProfilerNode() {
        return cc.find("PROFILER-NODE");
    }

    private debugInfo() {
        // 绘制前更新debug信息
        cc.director.on(cc.Director.EVENT_BEFORE_DRAW, () => {
            if (!cc.debug.isDisplayStats()) {
                return;
            }

            let profilerNode = this.getProfilerNode();
            if (!profilerNode || !profilerNode.children) return;

            let left = profilerNode.getChildByName('LEFT-PANEL');
            let right = profilerNode.getChildByName('RIGHT-PANEL');

            let tm = this.getTextureMemory() / 1024.0 / 1024.0;
            let nodes = [left, right, left, right];
            // "Cache Count", cc.assetManager.assets.count,
            let values = ["Asset Count", blade.asset.getCount(), "Textures(MB)", tm.toFixed(2)];

            for (let i = 0; i < nodes.length; i++) {
                let node = nodes[i];
                if (!node) continue;

                let label = node.getComponent(cc.Label);
                if (!label) continue;

                {
                    let outline = label.getComponent(cc.LabelOutline);
                    if (!outline) outline = label.addComponent(cc.LabelOutline);

                    outline.color = cc.Color.BLACK;
                    outline.width = 2;
                }

                label.string = values[i] + '\n' + label.string;
                label.fontSize = 16;
                label.lineHeight = 20;
                label.node.color = cc.Color.GREEN;//cc.color().fromHEX('#00ff00');
            }
        }, this);

        if (GameConfig.isHideVConsole == true && window["vConsole"]) {
            window["vConsole"].destroy();
        }
    }
}

namespace GameCtrl {

}

export default GameCtrl;