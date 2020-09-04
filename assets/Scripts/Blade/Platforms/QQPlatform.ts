import IPlatform from "../Interfaces/IPlatform";
import HttpHelper from "../Helpers/HttpHelper";
import StringHelper from "../Helpers/StringHelper";
import PromiseHelper from "../Helpers/PromiseHelper";
import PlatformConfig from "../../Module/Defines/PlatformConfig";

/**
 *  QQ
 */
export default class QQPlatform extends IPlatform {

    // 启动参数
    private launchOptions: qq.launchOption
        = null;

    // 授权按钮
    private authorizeButton = null;

    // 菜单分享
    private shareMenuInfo: {
        title: string,
        imageUrl: string,
        query: string,
        success: Function
    } = null;

    private videoState: IPlatform.AdState = IPlatform.AdState.None;
    private bannerState: IPlatform.AdState = IPlatform.AdState.None;
    private interstitialState: IPlatform.AdState = IPlatform.AdState.None;
    private blockState: IPlatform.AdState = IPlatform.AdState.None;

    /**
    * 激励视频实例
    */
    private video: qq.RewardedVideoAd = null;

    private banner: qq.BannerAd = null;

    private interstitial: qq.InterstitialAd = null;

    private appBox: qq.AppBoxAd = null;

    private block: qq.BlockAd = null;



    private bannerActive: boolean = false;

    private blockActive: boolean = false;




    public async initialize() {
        // 获取尝试用户信息
        this.getUserInfoTry()

        qq.onShow((res) => {
            // 更新启动参数
            this.setLaunchOptions(res);
            // 显示事件
            this.emit(IPlatform.EventType.OnShow, res)
        });

        this.preloadBanner();
        this.preloadInterstitial();
        this.preloadRewardVideo();
        this.preloadAppBox();
        this.preloadBlockAd();
    }

    public async lazyInitialize() {
    }


    public getArchive(name: string): string {
        return qq.getStorageSync(name) as string;
    }

    public saveArchive(name: string, data: string) {
        qq.setStorageSync(name, data);
    }

    public getLaunchOptions() {
        if (!this.launchOptions) {
            this.launchOptions = qq.getLaunchOptionsSync();
        }
        return this.launchOptions;
    }

    /**
     * 更新启动参数
     * @param value 
     */
    private setLaunchOptions(value: qq.launchOption) {
        this.launchOptions = value;
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
                qq.getUserInfo({
                    success: (res) => {
                        if (res.rawData) {
                            const info = JSON.parse(res.rawData);
                            const sysInfo = qq.getSystemInfoSync();
                            this.userInfo = {
                                avatar: info.avatarUrl || "",
                                nickname: info.nickName || "",
                                gender: info.gender || 0,
                                province: info.province,
                                city: info.city,
                                country: info.country,
                                platform: sysInfo.platform,
                                device: sysInfo.model,
                            };
                            resolve(this.userInfo);
                        } else {
                            reject(res);
                        }
                    },
                    fail: reject,
                });
            });
            return result;
        } catch (error) {
            cc.log(error);
            return null
        }
    }

    /**
    * 用户授权
    * left、top、width、height 为相对界面的比例，0~1
    */
    public authorize(options?: {
        left: number;
        top: number;
        width: number;
        height: number;
        callback?: Function;
        caller?: any;
    }): Promise<any> {
        return new Promise((resolve, reject) => {
            const handleInfo = (res) => {
                if (res.rawData) {
                    const info = JSON.parse(res.rawData);
                    const sysInfo = qq.getSystemInfoSync();
                    this.userInfo = {
                        avatar: info.avatarUrl || "",
                        nickname: info.nickName || "",
                        gender: info.gender || 0,
                        province: info.province,
                        city: info.city,
                        country: info.country,
                        platform: sysInfo.platform,
                        device: sysInfo.model,
                    };
                    if (options && options.callback) {
                        options.callback.call(options.caller);
                    }
                    resolve({
                        encryptedData: res.encryptedData,
                        iv: res.iv,
                    });
                } else {
                    reject();
                }
            };
            qq.getUserInfo({
                success: handleInfo,
                fail: (res: any) => {
                    // 获取配置
                    qq.getSetting({
                        success: (res) => {
                            qq.getSystemInfo({
                                success: (res) => {
                                    if (options) {
                                        options.height *= res.screenHeight;
                                        options.width *= res.screenWidth;
                                        options.left *= res.screenWidth;
                                        options.top *= res.screenHeight;
                                    } else {
                                        options = {
                                            left: 0,
                                            top: 0,
                                            width: res.screenWidth,
                                            height: res.screenHeight,
                                        };
                                    }
                                    const button = qq.createUserInfoButton({
                                        type: "text",
                                        text: "",
                                        style: {
                                            left: options.left,
                                            top: options.top,
                                            width: options.width,
                                            height: options.height,
                                            backgroundColor: "rgba(252,255,255,0)",
                                            // backgroundColor: "#ff0000",
                                            borderColor: "rgba(250,250,250,0)",
                                            borderWidth: 0,
                                            borderRadius: 0,
                                            textAlign: "center",
                                            fontSize: 30,
                                            lineHeight: 32,
                                        },
                                        withCredentials: false,
                                    });
                                    this.authorizeButton = button;
                                    button.onTap((res: any) => {
                                        if (res.rawData) {
                                            button.destroy();
                                            this.authorizeButton = null;
                                            if (options && options.callback) {
                                                options.callback.call(options.caller);
                                            }
                                        }
                                        handleInfo(res);
                                    });
                                },
                                fail: (res) => {
                                    reject();
                                },
                            });
                        },
                    });
                },
            });
        });
    }

    /**
     * 取消授权
     */
    public unauthorize() {
        if (this.authorizeButton) {
            this.authorizeButton.destroy();
            this.authorizeButton = null;
        }
    }


    /**
    * 配置菜单分享内容
    */
    public async setShareMenuInfo(imageUrl: string, title: string, param: any, callback?: Function, caller?: any) {
        if (this.shareMenuInfo == null) {
            qq.showShareMenu({
                withShareTicket: true,
            });

            qq.onShareAppMessage(() => {
                return this.shareMenuInfo
            });
        }

        param.shareTime = blade.timer.getTime();
        let query = HttpHelper.formatParams(param);

        this.shareMenuInfo = {
            imageUrl, title, query, success: () => {
                this.emit(IPlatform.EventType.OpenShare, imageUrl, title, param);
                if (callback) {
                    callback.call(caller, imageUrl, title, param);
                }
            }
        }
    }


    /**
	 * 判断是否支持视频
	 */
    public isSupportRewardVideo(): boolean {
        return StringHelper.compareVersion(qq.getSystemInfoSync().SDKVersion, "0.0.0") >= 0
    }

    /**
	 * 判断视频是否已经加载完成
	 */
    public isVideoLoaded(): boolean {
        let result = this.videoState == IPlatform.AdState.Loaded;
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
        if (this.videoState == IPlatform.AdState.Loaded) {
            return;
        }

        // 正在加载, 等待加载结束
        if (this.videoState == IPlatform.AdState.Loading) {
            return await PromiseHelper.waitUntil(() => this.videoState != IPlatform.AdState.Loading);
        }

        this.videoState = IPlatform.AdState.Loading;

        if (this.video == null) {
            // 初次创建会调load方法
            this.video = qq.createRewardedVideoAd({
                adUnitId: PlatformConfig.qq.videoId,
            });
            // 加载成功
            this.video.onLoad(() => {
                this.videoState = IPlatform.AdState.Loaded;
            });
            // 加载失败
            this.video.onError((err) => {
                this.videoState = IPlatform.AdState.None;
            });
            this.video.onClose((res) => {
                let result = (res && res.isEnded) || res === undefined;
                blade.ticker.setPause(false);
                blade.audio.resumeAll();
                this.preloadRewardVideo();
                // 发送结果
                this.emit(IPlatform.EventType.CloseVideo, result);
            })
        } else {
            this.video.load();
        }

        this.video.load();

        // 正在加载, 等待加载结束
        return await PromiseHelper.waitUntil(() => this.videoState != IPlatform.AdState.Loading);
    }

	/**
	 * 播放激励视频
	 */
    public async playRewardVideo(): Promise<boolean> {
        if (this.video != null && this.videoState == IPlatform.AdState.Loaded) {
            this.videoState = IPlatform.AdState.None;
            blade.ticker.setPause(true);
            blade.audio.pauseAll();

            let result: boolean = await new Promise(async (resolve, reject) => {
                const closeFunc = (result) => {
                    resolve(result);
                };
                this.once(IPlatform.EventType.CloseVideo, closeFunc);
                try {
                    await this.video.show()
                    this.emit(IPlatform.EventType.OpenVideo);
                } catch (error) {
                    this.off(IPlatform.EventType.CloseVideo, closeFunc);
                    resolve(false);
                }
            })
            blade.ticker.setPause(false);
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
        return StringHelper.compareVersion(qq.getSystemInfoSync().SDKVersion, "0.0.0") >= 0
    }


    /**
    * 预加载横幅
    */
    public async preloadBanner(): Promise<any> {
        if (!this.isSupportBanner()) {
            return;
        }

        // 已经加载
        if (this.bannerState == IPlatform.AdState.Loaded) {
            return;
        }

        // 正在加载, 等待加载结束
        if (this.bannerState == IPlatform.AdState.Loading) {
            return await PromiseHelper.waitUntil(() => this.bannerState != IPlatform.AdState.Loading);
        }

        if (this.banner) {
            this.banner.destroy();
            this.banner = null
        }

        console.log("banner", "开始加载");

        const sysInfo: qq.systemInfo = qq.getSystemInfoSync();
        this.banner = qq.createBannerAd({
            adUnitId: PlatformConfig.qq.bannerId,
            style: {
                top: sysInfo.screenHeight,
                left: 0,
                height: 50,
                width: sysInfo.screenWidth,
            },
        });

        this.banner.onLoad(async () => {
            console.log("banner", "加载成功");
            this.bannerState = IPlatform.AdState.Loaded;
            this.banner.style.top =
                sysInfo.screenHeight - this.banner.style.realHeight;
            this.banner.style.left =
                (sysInfo.screenWidth - this.banner.style.realWidth) / 2;
            if (this.bannerActive) {
                this.emit(IPlatform.EventType.OpenBanner);
                this.banner.show();
            }
        });

        this.banner.onError((err) => {
            console.error("banner", "加载失败", err);
            this.bannerState = IPlatform.AdState.None;
        });

        this.banner.onResize((res) => {
            // 重设横幅位置
        });

        this.bannerState = IPlatform.AdState.Loading;
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
            if (this.bannerState != IPlatform.AdState.Loaded) {
                this.preloadBanner();
                return false;
            }

            this.emit(IPlatform.EventType.OpenBanner);
            this.banner.show();
            this.bannerState = IPlatform.AdState.Opening;
            return true;
        } else {
            // 直接销毁重新创建banner, 刷新广告
            if (this.bannerState != IPlatform.AdState.Opening) {
                return false;
            }
            // this.emit(IPlatform.EventType.CloseBanner);
            // this.banner.destroy();
            // this.banner = null;
            // this.bannerState = IPlatform.AdState.None;
            // this.preloadBanner();

            // XXX: 不销毁
            this.banner.hide();
            this.bannerState = IPlatform.AdState.Loaded;
            return true;
        }
    }


    public isSupportBlockAd(): boolean {
        return StringHelper.compareVersion(qq.getSystemInfoSync().SDKVersion, "1.15.0") >= 0
    }

    public async preloadBlockAd(): Promise<any> {
        if (!this.isSupportBlockAd()) {
            return;
        }

        // 已经加载
        if (this.blockState == IPlatform.AdState.Loaded) {
            return;
        }

        // 正在加载, 等待加载结束
        if (this.blockState == IPlatform.AdState.Loading) {
            return await PromiseHelper.waitUntil(() => this.blockState != IPlatform.AdState.Loading);
        }

        if (this.block) {
            this.block.destroy();
            this.block = null
        }

        console.log("block", "开始加载");

        const sysInfo: qq.systemInfo = qq.getSystemInfoSync();
        this.block = qq.createBlockAd({
            adUnitId: PlatformConfig.qq.blockId,
            style: {
                top: sysInfo.screenHeight,
                left: 0
            },
            orientation: "landscape",
            size: 5
        });

        this.block.onLoad(async () => {
            console.log("block", "加载成功");
            this.blockState = IPlatform.AdState.Loaded;
            this.block.style.top =
                sysInfo.screenHeight - this.block.style.realHeight;
            this.block.style.left =
                (sysInfo.screenWidth - this.block.style.realWidth) / 2;
            if (this.blockActive) {
                this.block.show();
            }
        });

        this.block.onError((err) => {
            console.error("block", "加载失败", err);
            this.blockState = IPlatform.AdState.None;
        });

        this.block.onResize((res) => {
            // 重设横幅位置
        });

        this.blockState = IPlatform.AdState.Loading;
    }

    public activeBlockAd(active: boolean) {
        if (this.block == null) {
            this.preloadBlockAd();
            return false;
        }

        if (active) {
            if (this.blockState != IPlatform.AdState.Loaded) {
                this.preloadBlockAd();
                return false;
            }

            this.block.show();
            this.blockState = IPlatform.AdState.Opening;
            return true;
        } else {
            // 直接销毁重新创建banner, 刷新广告
            if (this.blockState != IPlatform.AdState.Opening) {
                return false;
            }
            this.block.destroy();
            this.block = null;
            this.blockState = IPlatform.AdState.None;
            this.preloadBlockAd();
            return true;
        }
    }

    public isSupportInterstitial() {
        return StringHelper.compareVersion(qq.getSystemInfoSync().SDKVersion, "1.12.0") >= 0
    }

    public isInterstitialLoaded() {
        return this.interstitialState == IPlatform.AdState.Loaded;
    }

    public async preloadInterstitial() {
        if (!this.isSupportInterstitial()) {
            return;
        }

        if (this.interstitialState == IPlatform.AdState.Loaded) {
            return;
        }

        if (this.interstitialState == IPlatform.AdState.Loading) {
            return await PromiseHelper.waitUntil(() => {
                return this.interstitialState != IPlatform.AdState.Loading;
            });
        }

        this.interstitialState = IPlatform.AdState.Loading;
        if (this.interstitial == null) {
            this.interstitial = qq.createInterstitialAd({ adUnitId: PlatformConfig.qq.interstitialId });

            this.interstitial.onLoad(() => {
                this.interstitialState = IPlatform.AdState.Loaded;
            });

            this.interstitial.onError(async (error) => {
                this.interstitialState = IPlatform.AdState.None;
                cc.log(error)
            });

            this.interstitial.onClose(() => {
                this.interstitialState = IPlatform.AdState.None;
                this.emit(IPlatform.EventType.CloseInterstitial);
            });
        }
    }

    async showInterstitial() {
        if (!this.isSupportInterstitial()) {
            return;
        }

        if (!this.isInterstitialLoaded()) {
            return;
        }

        try {
            await this.interstitial.show();
            this.interstitialState = IPlatform.AdState.Opening;
            this.emit(IPlatform.EventType.OpenInterstitial)
        } catch (error) {
            cc.log(error);
        }
    }


    async isSupportAppBox() {
        return StringHelper.compareVersion(qq.getSystemInfoSync().SDKVersion, "1.7.1") >= 0
    }

    public async preloadAppBox() {
        if (!this.isSupportAppBox()) {
            return;
        }

        if (this.appBox == null) {
            this.appBox = qq.createAppBox({ adUnitId: PlatformConfig.qq.appBoxId });
        }

        try {
            if (this.appBox != null) {
                await this.appBox.load();
            }
        } catch (error) {
            cc.log(JSON.stringify(error));
        }
    }

    async showAppBox() {
        if (!this.isSupportAppBox()) {
            return;
        }

        try {
            if (this.appBox != null) {
                await this.appBox.show();
            }
        } catch (error) {
            cc.log(error);
            this.preloadAppBox();
        }
    }


    /**
	 * 发送邀请
	 */
    public async sendInvite(imageUrl: string, title: string, param: any): Promise<any> {
        param.shareTime = blade.timer.getTime();

        qq.shareAppMessage({
            title: title,
            imageUrl: imageUrl,
            query: HttpHelper.formatParams(param),
        });
        await PromiseHelper.wait(1)

        this.emit(IPlatform.EventType.OpenShare, imageUrl, title, param);
    }


    /**
	 * 设备震动
	 * @param short
	 */
    public vibrate(short: boolean = true) {
        if (short) {
            qq.vibrateShort({
                success: null,
                fail: null,
                complete: null,
            });
        } else {
            qq.vibrateLong({
                success: null,
                fail: null,
                complete: null,
            });
        }
    }

    /**
	 * 跳转到其他小游戏
	 * @param appid
	 */
    public linkGame(appid: string, path: string, extraData: any) {
        return new Promise((resolve, reject) => {
            qq.navigateToMiniProgram({
                appId: appid,
                path: path,
                extraData: extraData,
                success: () => {
                    cc.log(`跳转 ${appid}`);
                    resolve(true);
                },
                fail: reject,
            });
        });
    }

}

