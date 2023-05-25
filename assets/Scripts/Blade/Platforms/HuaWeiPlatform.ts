import PlatformBase from "../Bases/PlatformBase";

export default class HuaWeiPlatform extends PlatformBase {

    // 启动参数
    private _launchOptions: qg.launchOption = null;

    private _videoState: PlatformBase.AdState = PlatformBase.AdState.None;
    private _bannerState: PlatformBase.AdState = PlatformBase.AdState.None;
    private _nativeAdState: PlatformBase.AdState = PlatformBase.AdState.None;

    private _video: qg.RewardedVideoAd = null;

    private _banner: qg.BannerAd = null;

    private _nativeAd: qg.NativeAd = null;

    private _bannerActive: boolean = false;

    private _bannerStyle: {
        height: number,
        width: number
    } = { height: 0, width: 0 };

    private _configs: HuaWeiConfigBase = null;

    protected onInitialize() {
        this._configs = PlatformConfig[PlatformService.PlatformType.HUAWEI];

        qg.onError((res) => {
            let mgs = res.message.split("\n")
            for (let index = 0; index < mgs.length; index++) {
                const mg = mgs[index];
                console.error("错误", mg);
            }
        })

        // 获取尝试用户信息
        // this.getUserInfoTry()

        qg.onShow((res) => {
            // 更新启动参数
            this.setLaunchOptions(res);
            // 显示事件
            this.emit(PlatformBase.EventType.OnShow, res)
        })

        // this.preloadBanner();
        // this.preloadRewardVideo();
        // this.preloadNativeAd();
    }

    public getLaunchOptions() {
        if (!this._launchOptions) {
            this._launchOptions = qg.getLaunchOptionsSync();
        }
        return this._launchOptions;
    }

    /**
     * 更新启动参数
     * @param value
     */
    private setLaunchOptions(value: qg.launchOption) {
        this._launchOptions = value;
    }

    /**
    * 尝试获取用户信息
    */
    private async getUserInfoTry() {
        if (this.userInfo) {
            return this.userInfo
        }
        try {
            let result = await new Promise((resolve, reject) => {
                qg.getUserInfo({
                    success: (res) => {
                        if (res.userInfo) {
                            let info = res.userInfo;
                            const sysInfo = qg.getSystemInfoSync();
                            this.userInfo = {
                                avatar: info.avatarUrl || "",
                                nickname: info.nickName || "",
                                gender: info.gender || 0,
                                province: "",
                                city: "",
                                country: "",
                                platform: sysInfo.platformVersionName,
                                device: sysInfo.model,
                            };
                            resolve(this.userInfo);
                        } else {
                            reject(res)
                        }
                    },
                    fail: reject,
                });
            });
            return result;
        } catch (error) {
            // console.error(error);
            return null
        }
    }

    public setUserInfo(userName: string, avatar: string, gender: number) {
        let sysInfo = qg.getSystemInfoSync();
        this.userInfo = {
            nickname: userName,
            avatar: avatar,
            gender: gender,
            province: "",
            city: "",
            country: "",
            platform: sysInfo.platformVersionName,
            device: sysInfo.model
        }
    }

    /**
       * 判断是否支持视频
       */
    public isSupportRewardVideo(): boolean {
        return true;
    }

    /**
     * 判断视频是否已经加载完成
     */
    public isVideoLoaded(): boolean {
        let result = this._videoState == PlatformBase.AdState.Loaded;
        if (result == false) {
            this.preloadRewardVideo();
        }
        return result;
    }

    /**
    * 预加载激励视频
    */
    public async preloadRewardVideo(): Promise<void> {
        if (!this.isSupportRewardVideo()) {
            return;
        }

        // 已经加载
        if (this._videoState == PlatformBase.AdState.Loaded) {
            return;
        }

        // 正在加载, 等待加载结束
        if (this._videoState == PlatformBase.AdState.Loading) {
            return await PromiseHelper.waitUntil(() => this._videoState != PlatformBase.AdState.Loading);
        }

        this._videoState = PlatformBase.AdState.Loading;

        if (this._video == null) {
            // 初次创建会调load方法
            this._video = qg.createRewardedVideoAd({
                adUnitId: this._configs.videoId,
            });
            // 加载成功
            this._video.onLoad(() => {
                console.log("loaded")
                this._videoState = PlatformBase.AdState.Loaded;
            });
            // 加载失败
            this._video.onError((err) => {
                console.error(err)
                this._videoState = PlatformBase.AdState.None;
            });
            this._video.onClose((res) => {
                let result = (res && res.isEnded) || res === undefined;
                // blade.ticker.pause = false;
                blade.audio.resumeAll();
                this.preloadRewardVideo();
                // 发送结果
                this.emit(PlatformBase.EventType.CloseVideo, result);
            })
        }

        this._video.load();

        // 正在加载, 等待加载结束
        return await PromiseHelper.waitUntil(() => this._videoState != PlatformBase.AdState.Loading);
    }

    /**
     * 播放激励视频
     */
    public async playRewardVideo(): Promise<boolean> {
        if (this._video != null && this._videoState == PlatformBase.AdState.Loaded) {
            this._videoState = PlatformBase.AdState.None;
            // blade.ticker.pause = true;
            blade.audio.pauseAll();

            let result: boolean = await new Promise(async (resolve, reject) => {
                const closeFunc = (result) => {
                    resolve(result);
                };
                this.once(PlatformBase.EventType.CloseVideo, closeFunc);
                try {
                    let result = await this._video.show()
                    console.log(result);
                    this.emit(PlatformBase.EventType.OpenVideo);
                } catch (error) {
                    console.log(error);
                    this.off(PlatformBase.EventType.CloseVideo, closeFunc);
                    resolve(false);
                }
            })
            // blade.ticker.pause = false;
            blade.audio.resumeAll();
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
        return true;
    }

    /**
   * 预加载横幅
   */
    public async preloadBanner(): Promise<void> {
        if (!this.isSupportBanner()) {
            return;
        }

        // 已经加载
        if (this._bannerState == PlatformBase.AdState.Loaded) {
            return;
        }

        // 正在加载, 等待加载结束
        if (this._bannerState == PlatformBase.AdState.Loading) {
            return await PromiseHelper.waitUntil(() => this._bannerState != PlatformBase.AdState.Loading);
        }

        if (this._banner) {
            this._banner.destroy();
            this._banner = null
        }

        console.log("banner", "开始加载");

        const sysInfo = qg.getSystemInfoSync();
        this._banner = qg.createBannerAd({
            adUnitId: this._configs.bannerId,
            style: {
                top: sysInfo.screenHeight - 50,
                left: 0,
                height: 50,
                width: sysInfo.screenWidth,
            },
        });

        this._banner.onLoad(async () => {
            console.log("banner", "加载成功");
            this._bannerState = PlatformBase.AdState.Loaded;
            if (this._bannerActive) {
                this.emit(PlatformBase.EventType.OpenBanner);
                this._banner.show();
            }
        });

        this._banner.onError((err) => {
            console.error("banner", "加载失败", err);
            this._bannerState = PlatformBase.AdState.None;
        });

        this._banner.onResize((res) => {
            console.log(res);

            // 重设横幅位置
            this._bannerStyle.height = res.height;
            this._bannerStyle.width = res.width;

            this._banner.style.top =
                sysInfo.screenHeight - this._bannerStyle.height;
            this._banner.style.left =
                (sysInfo.screenWidth - this._bannerStyle.width) / 2;
        });

        this._bannerState = PlatformBase.AdState.Loading;
    }


    /**
    * 激活 显示/隐藏横幅广告
    * @param active
    */
    public activeBanner(active: boolean) {
        if (this._banner == null) {
            this.preloadBanner();
            return false;
        }

        if (active) {
            if (this._bannerState != PlatformBase.AdState.Loaded) {
                this.preloadBanner();
                return false;
            }

            this.emit(PlatformBase.EventType.OpenBanner);
            this._banner.show();
            this._bannerState = PlatformBase.AdState.Opening;
            return true;
        } else {
            // 直接销毁重新创建banner, 刷新广告
            if (this._bannerState != PlatformBase.AdState.Opening) {
                return false;
            }

            // XXX: 不销毁
            this._banner.hide();
            this._bannerState = PlatformBase.AdState.Loaded;
            return true;
        }
    }



    public isSupportNativeAd(): boolean {
        return true;
    }

    public async preloadNativeAd(): Promise<void> {
        if (!this.isSupportNativeAd()) {
            return;
        }

        // 已经加载
        if (this._nativeAdState == PlatformBase.AdState.Loaded) {
            return;
        }

        // 正在加载, 等待加载结束
        if (this._nativeAdState == PlatformBase.AdState.Loading) {
            return await PromiseHelper.waitUntil(() => this._nativeAdState != PlatformBase.AdState.Loading);
        }

        if (this._nativeAd) {
            this._nativeAd.destroy();
            this._nativeAd = null
        }


        console.log("nativeAd", "开始加载");


        this._nativeAd = qg.createNativeAd({
            adUnitId: this._configs.nativeId,
        });

        this._nativeAd.onLoad(async (res) => {
            console.log("nativeAd", "加载成功", res);
            this._nativeAdState = PlatformBase.AdState.Loaded;
        });

        this._nativeAd.onError((err) => {
            console.error("nativeAd", "加载失败", err);
            this._nativeAdState = PlatformBase.AdState.None;
        });

        this._nativeAdState = PlatformBase.AdState.Loading;
    }

}

import PlatformConfig from "../../Module/Defines/PlatformConfig";
import HuaWeiConfigBase from "../../Module/Defines/PlatformConfig/Bases/VivoConfigBase";
import PromiseHelper from "../Helpers/PromiseHelper";
import PlatformService from "../Services/PlatformService";

