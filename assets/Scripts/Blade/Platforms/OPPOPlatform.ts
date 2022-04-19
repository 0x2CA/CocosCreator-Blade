import PlatformConfig from "../../Module/Defines/PlatformConfig";
import PromiseHelper from "../Helpers/PromiseHelper";
import PlatformBase from "../Bases/PlatformBase";
import TickerService from "../Services/TickerService";
import AudioService from "../Services/AudioService";

export default class OPPOPlatform extends PlatformBase {
    private videoState: PlatformBase.AdState = PlatformBase.AdState.None;
    private bannerState: PlatformBase.AdState = PlatformBase.AdState.None;
    private nativeAdState: PlatformBase.AdState = PlatformBase.AdState.None;

    private video: qg.RewardedVideoAd = null;

    private banner: qg.BannerAd = null;

    private nativeAd: qg.NativeAd = null;

    private bannerActive: boolean = false;

    public bannerStyle: {
        height: number,
        width: number
    } = { height: 0, width: 0 };

    public onInitialize() {
        this.preloadBanner();
        this.preloadRewardVideo();
        this.preloadNativeAd();
    }

    /**
       * 判断是否支持视频
       */
    public isSupportRewardVideo(): boolean {
        return qg.getSystemInfoSync().platformVersionCode >= 1051
    }

    /**
     * 判断视频是否已经加载完成
     */
    public isVideoLoaded(): boolean {
        let result = this.videoState == PlatformBase.AdState.Loaded;
        if (result == false) {
            this.preloadRewardVideo();
        }
        return result;
    }

    /**
    * 预加载激励视频
    */
    public async preloadRewardVideo(): Promise<any> {
        if (!this.isSupportRewardVideo()) {
            return;
        }

        // 已经加载
        if (this.videoState == PlatformBase.AdState.Loaded) {
            return;
        }

        // 正在加载, 等待加载结束
        if (this.videoState == PlatformBase.AdState.Loading) {
            return await PromiseHelper.waitUntil(() => this.videoState != PlatformBase.AdState.Loading);
        }

        this.videoState = PlatformBase.AdState.Loading;

        if (this.video == null) {
            // 初次创建会调load方法
            this.video = qg.createRewardedVideoAd({
                adUnitId: PlatformConfig.qg.videoId,
            });
            // 加载成功
            this.video.onLoad(() => {
                console.log("loaded")
                this.videoState = PlatformBase.AdState.Loaded;
            });
            // 加载失败
            this.video.onError((err) => {
                console.error(err)
                this.videoState = PlatformBase.AdState.None;
            });
            this.video.onClose((res) => {
                let result = (res && res.isEnded) || res === undefined;
                TickerService.getInstance().pause = false;
                AudioService.getInstance().resumeAll();
                this.preloadRewardVideo();
                // 发送结果
                this.emit(PlatformBase.EventType.CloseVideo, result);
            })
        }

        this.video.load();

        // 正在加载, 等待加载结束
        return await PromiseHelper.waitUntil(() => this.videoState != PlatformBase.AdState.Loading);
    }

    /**
     * 播放激励视频
     */
    public async playRewardVideo(): Promise<boolean> {
        if (this.video != null && this.videoState == PlatformBase.AdState.Loaded) {
            this.videoState = PlatformBase.AdState.None;
            TickerService.getInstance().pause = true;
            AudioService.getInstance().pauseAll();

            let result: boolean = await new Promise(async (resolve, reject) => {
                const closeFunc = (result) => {
                    resolve(result);
                };
                this.once(PlatformBase.EventType.CloseVideo, closeFunc);
                try {
                    let result = await this.video.show()
                    console.log(result);
                    this.emit(PlatformBase.EventType.OpenVideo);
                } catch (error) {
                    console.log(error);
                    this.off(PlatformBase.EventType.CloseVideo, closeFunc);
                    resolve(false);
                }
            })
            TickerService.getInstance().pause = false;
            AudioService.getInstance().resumeAll();
            this.preloadRewardVideo();
            return result;
        } else {
            this.preloadRewardVideo();
            return false;
        }
    }


    /**
    * 判断是否支持横幅广告
    */
    public isSupportBanner(): boolean {
        return qg.getSystemInfoSync().platformVersionCode >= 1051
    }

    /**
   * 预加载横幅
   */
    public async preloadBanner(): Promise<any> {
        if (!this.isSupportBanner()) {
            return;
        }

        // 已经加载
        if (this.bannerState == PlatformBase.AdState.Loaded) {
            return;
        }

        // 正在加载, 等待加载结束
        if (this.bannerState == PlatformBase.AdState.Loading) {
            return await PromiseHelper.waitUntil(() => this.bannerState != PlatformBase.AdState.Loading);
        }

        if (this.banner) {
            this.banner.destroy();
            this.banner = null
        }

        console.log("banner", "开始加载");

        const sysInfo: qg.systemInfo = qg.getSystemInfoSync();
        this.banner = qg.createBannerAd({
            adUnitId: PlatformConfig.qg.bannerId,
            style: {
                top: sysInfo.screenHeight - 50,
                left: 0,
                height: 50,
                width: sysInfo.screenWidth,
            },
        });

        this.banner.onLoad(async () => {
            console.log("banner", "加载成功");
            this.bannerState = PlatformBase.AdState.Loaded;
            if (this.bannerActive) {
                this.emit(PlatformBase.EventType.OpenBanner);
                this.banner.show();
            }
        });

        this.banner.onError((err) => {
            console.error("banner", "加载失败", err);
            this.bannerState = PlatformBase.AdState.None;
        });

        this.banner.onResize((res) => {
            console.log(res);

            // 重设横幅位置
            this.bannerStyle.height = res.height;
            this.bannerStyle.width = res.width;

            this.banner.style.top =
                sysInfo.screenHeight - this.bannerStyle.height;
            this.banner.style.left =
                (sysInfo.screenWidth - this.bannerStyle.width) / 2;
        });

        this.bannerState = PlatformBase.AdState.Loading;
    }


    /**
    * 激活 显示/隐藏横幅广告
    * @param active
    */
    public activeBanner(active: boolean) {
        if (this.banner == null) {
            this.preloadBanner();
            return false;
        }

        if (active) {
            if (this.bannerState != PlatformBase.AdState.Loaded) {
                this.preloadBanner();
                return false;
            }

            this.emit(PlatformBase.EventType.OpenBanner);
            this.banner.show();
            this.bannerState = PlatformBase.AdState.Opening;
            return true;
        } else {
            // 直接销毁重新创建banner, 刷新广告
            if (this.bannerState != PlatformBase.AdState.Opening) {
                return false;
            }
            // this.emit(IPlatform.EventType.CloseBanner);
            // this.banner.destroy();
            // this.banner = null;
            // this.bannerState = IPlatform.AdState.None;
            // this.preloadBanner();

            // XXX: 不销毁
            this.banner.hide();
            this.bannerState = PlatformBase.AdState.Loaded;
            return true;
        }
    }



    public isSupportNativeAd(): boolean {
        return qg.getSystemInfoSync().platformVersionCode >= 1051
    }

    public async preloadNativeAd(): Promise<any> {
        if (!this.isSupportNativeAd()) {
            return;
        }

        // 已经加载
        if (this.nativeAdState == PlatformBase.AdState.Loaded) {
            return;
        }

        // 正在加载, 等待加载结束
        if (this.nativeAdState == PlatformBase.AdState.Loading) {
            return await PromiseHelper.waitUntil(() => this.nativeAdState != PlatformBase.AdState.Loading);
        }

        if (this.nativeAd) {
            this.nativeAd.destroy();
            this.nativeAd = null
        }


        console.log("nativeAd", "开始加载");


        this.nativeAd = qg.createNativeAd({
            adUnitId: PlatformConfig.qg.nativeId,
        });

        this.nativeAd.onLoad(async (res) => {
            console.log("nativeAd", "加载成功", res);
            this.nativeAdState = PlatformBase.AdState.Loaded;
        });

        this.nativeAd.onError((err) => {
            console.error("nativeAd", "加载失败", err);
            this.nativeAdState = PlatformBase.AdState.None;
        });

        this.nativeAdState = PlatformBase.AdState.Loading;
    }

}
