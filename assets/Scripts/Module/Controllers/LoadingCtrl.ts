
import ControllerBase from "../../Blade/Bases/ControllerBase";
import ModelBase from "../../Blade/Bases/ModelBase";
import Controller from "../../Blade/Decorators/Controller";
import ViewService from "../../Blade/Services/ViewService";
import GameConfig from "../Defines/GameConfig";
import LoadingView from "../Views/Loading/LoadingView";

/*
 * @作者: 0x2CA
 * @创建时间: 2023-03-15
 * @最后编辑时间: 2023-05-11
 * @最后编辑者: 0x2CA
 * @描述:
 */
@Controller("LoadingCtrl")
class LoadingCtrl extends ControllerBase {

    protected onInitialize() {
    }

    protected onDispose() {
    }

    public openLoadingView() {
        console.log("打开加载界面");
        this.openView(ViewService.ViewType.Main, LoadingView);
    }

    public closeLoadingView() {
        console.log("关闭加载界面");
        this.closeViewByViewType(LoadingView);
    }

    public async preload(callback: (progress: number) => void) {
        let startTime = new Date().getTime();

        console.log("预加载");

        await this.preloadLang((progress) => {

        });

        callback(0);

        let preload = new Map<(callback: (progress: number) => void) => Promise<void>, number>();
        preload.set(this.preloadAsset.bind(this), 1);
        preload.set(this.preloadAudioAsset.bind(this), 1);
        preload.set(this.preloadConfigAsset.bind(this), 1);
        preload.set(this.preloadModel.bind(this), 1);

        let finish = 0;
        let total = 0;

        let values = Array.from(preload.values());
        for (let index = 0; index < values.length; index++) {
            const value = values[index];
            total += value;
        }

        let keys = Array.from(preload.keys());
        for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            await key((progress) => {
                if (total != 0) {
                    callback((finish + preload.get(key) * progress) / total)
                }
            });
            finish += preload.get(key);
        }

        callback(1);

        console.log("预加载耗时", (new Date().getTime() - startTime) / 1000);
    }

    private async preloadLang(callback: (progress: number) => void) {
        let startTime = new Date().getTime();

        callback(0);

        console.log("预加载语言");

        await blade.locale.loadLangConfig(blade.locale.getLang());

        callback(1);

        console.log("预加载语言耗时", (new Date().getTime() - startTime) / 1000);
    }

    private async preloadModel(callback: (progress: number) => void) {
        let startTime = new Date().getTime();

        callback(0);

        console.log("预加载Model");

        if (GameConfig.preloadModels.length != 0) {
            for (let index = 0; index < GameConfig.preloadModels.length; index++) {
                const modelType = GameConfig.preloadModels[index];
                blade.model.get<ModelBase>(modelType);
                callback(index + 1 / GameConfig.preloadModels.length)
            }
        }

        callback(1);

        console.log("预加载Model耗时", (new Date().getTime() - startTime) / 1000);
    }

    private async preloadAsset(callback: (progress: number) => void) {
        let startTime = new Date().getTime();

        callback(0);

        console.log("预加载一般资源文件");

        // 预加载一般资源
        let addProgress = 1 / GameConfig.preloadAssets.length;

        for (let index = 0; index < GameConfig.preloadAssets.length; index++) {
            try {
                let type = null;

                if (GameConfig.preloadAssets[index].endsWith(".png") || GameConfig.preloadAssets[index].endsWith(".jpg")) {
                    type = cc.SpriteFrame;
                }

                let itemStartTime = new Date().getTime();

                await blade.asset.loadAssetAsync(GameConfig.preloadAssets[index], type, (finish, total) => {
                    callback(addProgress * index + (finish / total) * addProgress);
                });

                console.log(GameConfig.preloadAssets[index], "耗时", (new Date().getTime() - itemStartTime) / 1000);

            } catch (error) {
                console.error("预加载资源失败", error);
            }

        }

        callback(1);

        console.log("预加载一般资源文件耗时", (new Date().getTime() - startTime) / 1000);
    }

    private async preloadConfigAsset(callback: (progress: number) => void) {
        let startTime = new Date().getTime();

        callback(0);

        console.log("预加载配置文件");

        // 预加载配置资源
        await blade.config.registerAllAsync((finish, total) => {
            callback(finish / total);
        });

        blade.config.info();

        callback(1);

        console.log("预加载配置文件耗时", (new Date().getTime() - startTime) / 1000);
    }

    private async preloadAudioAsset(callback: (progress: number) => void) {
        let startTime = new Date().getTime();

        callback(0);

        console.log("预加载声音文件");

        // 预加载声音资源
        await blade.audio.registerDirectoryAsync("Audios/Commons", (finish, total) => {
            callback(finish / total);
        });

        blade.audio.info();

        callback(1);

        console.log("预加载声音文件耗时", (new Date().getTime() - startTime) / 1000);
    }

    private async initSensitiveWords(callback: (progress: number) => void) {
        let startTime = new Date().getTime();

        callback(0);

        console.log("加载初始化敏感字文件");

        await blade.words.initWordsAsync((finish, total) => {
            callback(finish / total);
        })

        callback(1);

        console.log("加载初始化敏感字文件耗时", (new Date().getTime() - startTime) / 1000);
    }
}

namespace LoadingCtrl {

}

export default LoadingCtrl;