import IView from "../../Blade/Interfaces/IView";
import ArchiveServerSDK from "../../Blade/Libs/ArchiveServerSDK/ArchiveServerSDK";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LoadingView extends IView {

    @property({
        type: cc.ProgressBar,
        tooltip: "加载进度",
    })
    progress: cc.ProgressBar = null;

    @property({
        type: cc.Label,
        tooltip: "加载状态标签",
    })
    labelStatus: cc.Label = null;


    async onRegister() {
        this.progress.progress = 0;
        // 检查更新
        this.labelStatus.string = blade.locale.value("CHECKINGUPDATE");
        await blade.platform.getPlatform().checkForUpdate();
        this.progress.progress = 0.3;

        // 登录服务器
        this.labelStatus.string = blade.locale.value("LOGINING");
        await ArchiveServerSDK.login("CukeMix")
        this.progress.progress = 0.5;

        if (CC_DEBUG) {
            this.parseUrl();
        }

        // 同步存档
        this.labelStatus.string = blade.locale.value("LOADINGARCHIVE");
        await ArchiveServerSDK.sync()
        this.progress.progress = 1;

        // 上传用户数据
        await ArchiveServerSDK.uploadUserInfo()

        await this.preloadScene("Main");

        blade.scene.runScene("Main");
    }


    preloadScene(name: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            cc.director.preloadScene(
                name,
                (completedCount: number, totalCount: number, item: any) => {
                    this.labelStatus.string = blade.locale.value(
                        "LOADINGSCENE",
                        completedCount,
                        totalCount
                    );
                    this.progress.progress = completedCount / totalCount;
                    if (completedCount == totalCount) {
                        resolve(true);
                    }
                },
                (error: Error) => {
                    if (!error) {
                        resolve(false);
                    }
                }
            );
        })

    }

    onTick(delta: number): void {
    }


    /**
 * 解析地址参数
 */
    private parseUrl() {
        cc.warn(`=========================
地址栏参数说明：
reset: 重置存档 (1:重置)
time: 时间倍数
=========================`);

        const urlParam = blade.platform.getPlatform().getLaunchOptions();

        // 地址栏附带启动参数检查
        // 存档重置
        if (urlParam["reset"] === "1") {
            ArchiveServerSDK.clear();
        }

        try {
            const timeScale = parseFloat(urlParam["time"]);
            blade.ticker.timeScale = timeScale;
        } catch (e) { }
    }
}