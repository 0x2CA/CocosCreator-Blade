import IPlatform from "../../Blade/Interfaces/IPlatform";
import HttpHelper from "../Helpers/HttpHelper";
import StringHelper from "../Helpers/StringHelper";
import PromiseHelper from "../Helpers/PromiseHelper";
import PlatformConfig from "../../Module/Defines/PlatformConfig";

/**
 *  微信
 */
export default class WxPlatform extends IPlatform {

    // 启动参数
    private launchOptions: wx.launchOption
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
    private gridAdState: IPlatform.AdState = IPlatform.AdState.None;

    /**
    * 激励视频实例
    */
    private video: wx.RewardedVideoAd = null;

    private banner: wx.BannerAd = null;

    private interstitial: wx.InterstitialAd = null;

    private gridAd: wx.GridAd = null;


    private bannerActive: boolean = false;



    public async initialize() {
        // 获取尝试用户信息
        this.getUserInfoTry()

        wx.onShow((res) => {
            // 更新启动参数
            this.setLaunchOptions(res);
            // 显示事件
            this.emit(IPlatform.EventType.OnShow, res)
        });

        this.preloadBanner();
        this.preloadInterstitial();
        this.preloadRewardVideo();
        this.preloadGridAd();
    }

    public async lazyInitialize() {
    }


    public getArchive(name: string): string {
        return wx.getStorageSync(name) as string;
    }

    public saveArchive(name: string, data: string) {
        wx.setStorageSync(name, data);
    }

    public getLaunchOptions() {
        if (!this.launchOptions) {
            this.launchOptions = wx.getLaunchOptionsSync();
        }
        return this.launchOptions;
    }

    /**
     * 更新启动参数
     * @param value 
     */
    private setLaunchOptions(value: wx.launchOption) {
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
                wx.getUserInfo({
                    success: (res) => {
                        if (res.rawData) {
                            const info = JSON.parse(res.rawData);
                            const sysInfo = wx.getSystemInfoSync();
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
            cc.error(error);
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
                    const sysInfo = wx.getSystemInfoSync();
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
            wx.getUserInfo({
                success: handleInfo,
                fail: (res: any) => {
                    // 获取配置
                    wx.getSetting({
                        success: (res) => {
                            wx.getSystemInfo({
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
                                    const button = wx.createUserInfoButton({
                                        type: "text",
                                        text: "",
                                        style: {
                                            left: options.left,
                                            top: options.top,
                                            width: options.width,
                                            height: options.height,
                                            backgroundColor: "rgba(252,255,255,0)",
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
            wx.showShareMenu({
                withShareTicket: true,
            });

            wx.onShareAppMessage(() => {
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
        return StringHelper.compareVersion(wx.getSystemInfoSync().SDKVersion, "2.0.4") >= 0
    }

    /**
     * 判断视频是否已经加载完成
     */
    public isVideoLoaded(): boolean {
        return this.videoState == IPlatform.AdState.Loaded;
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
            this.video = wx.createRewardedVideoAd({
                adUnitId: PlatformConfig.wx.videoId,
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
                    blade.ticker.setPause(false);
                    blade.audio.resumeAll();
                    this.preloadRewardVideo();
                    this.off(IPlatform.EventType.CloseVideo, closeFunc);
                    resolve(false);
                }
            })

            return result;
        } else {
            return false;
        }
    }


    /**
    * 判断是否支持横幅广告
    */
    public isSupportBanner(): boolean {
        return StringHelper.compareVersion(wx.getSystemInfoSync().SDKVersion, "2.0.4") >= 0
    }

    /**
    * 预加载横幅
    */
    public async preloadBanner(): Promise<any> {
        if (!this.isSupportBanner()) {
            return;
        }

        // 已经加载
        if (this.bannerState == WxPlatform.AdState.Loaded) {
            return;
        }

        // 正在加载, 等待加载结束
        if (this.bannerState == WxPlatform.AdState.Loading) {
            return await PromiseHelper.waitUntil(() => this.bannerState != WxPlatform.AdState.Loading);
        }

        if (this.banner) {
            this.banner.destroy();
            this.banner = null
        }

        const sysInfo: wx.systemInfo = wx.getSystemInfoSync();
        this.banner = wx.createBannerAd({
            adUnitId: PlatformConfig.wx.bannerId,
            style: {
                top: 0,
                left: 0,
                height: 50,
                width: 200,
            },
        });

        this.banner.onLoad(async () => {
            this.bannerState = WxPlatform.AdState.Loaded;
            if (this.bannerActive) {
                this.emit(IPlatform.EventType.OpenBanner);
                this.banner.show();
            }
        });

        this.banner.onError((err) => {
            this.bannerState = WxPlatform.AdState.None;
        });

        this.banner.onResize((res) => {
            // 重设横幅位置
            this.banner.style.top =
                sysInfo.windowHeight - this.banner.style.realHeight;
            this.banner.style.left =
                (sysInfo.windowWidth - this.banner.style.realWidth) / 2;
        });

        this.bannerState = IPlatform.AdState.Loading;
    }


    /**
    * 激活 显示/隐藏横幅广告
    * @param active
    */
    public activeBanner(active: boolean) {
        if (this.banner == null) {
            return false;
        }

        if (active) {
            if (this.bannerState != IPlatform.AdState.Loaded) {
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
            this.emit(IPlatform.EventType.CloseBanner);
            this.banner.destroy();
            this.banner = null;
            this.bannerState = IPlatform.AdState.None;
            this.preloadBanner();
            return true;
        }
    }

    public isSupportInterstitial() {
        return StringHelper.compareVersion(wx.getSystemInfoSync().SDKVersion, "2.6.0") >= 0
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
            this.interstitial = wx.createInterstitialAd({ adUnitId: PlatformConfig.wx.interstitialId });

            this.interstitial.onLoad(() => {
                this.interstitialState = IPlatform.AdState.Loaded;
            });

            this.interstitial.onError(async (error) => {
                this.interstitialState = IPlatform.AdState.None;
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
            this.preloadInterstitial();
            return;
        }

        try {
            await this.interstitial.show();
            this.interstitialState = IPlatform.AdState.Opening;
            this.emit(IPlatform.EventType.OpenInterstitial)
        } catch (error) {
            cc.error(error);
        }
    }


    public isSupportGridAd() {
        return StringHelper.compareVersion(wx.getSystemInfoSync().SDKVersion, "2.9.2") >= 0
    }


    public isGridAdLoaded() {
        return this.gridAdState == IPlatform.AdState.Loaded;
    }

    public async preloadGridAd() {
        if (!this.isSupportGridAd()) {
            return;
        }

        if (this.gridAdState == IPlatform.AdState.Loaded) {
            return;
        }

        if (this.gridAdState == IPlatform.AdState.Loading) {
            return await PromiseHelper.waitUntil(() => {
                return this.gridAdState != IPlatform.AdState.Loading;
            });
        }

        const sysInfo: wx.systemInfo = wx.getSystemInfoSync();
        this.gridAdState = IPlatform.AdState.Loading;
        if (this.gridAd == null) {
            this.gridAd = wx.createGridAd({
                adUnitId: PlatformConfig.wx.gridId,
                adTheme: "white",
                gridCount: 8,
                style: {
                    height: sysInfo.screenWidth * 0.8,
                    width: sysInfo.screenWidth * 0.8,
                    left: sysInfo.screenWidth * 0.1,
                    top: (sysInfo.screenHeight - sysInfo.screenWidth * 0.8) / 2,
                }
            });

            this.gridAd.onLoad(() => {
                this.gridAdState = IPlatform.AdState.Loaded;
            });

            this.gridAd.onError(async (error) => {
                this.gridAdState = IPlatform.AdState.None;
            });

            this.gridAd.onResize((res) => {
                // 重设横幅位置
                this.gridAd.style.top =
                    (sysInfo.windowHeight - this.gridAd.style.realHeight) / 2;
                this.gridAd.style.left =
                    (sysInfo.windowWidth - this.gridAd.style.realWidth) / 2;
            });

        }
    }

    public activeGridAd(active: boolean) {
        if (!this.isSupportGridAd()) {
            return;
        }

        if (!this.isGridAdLoaded()) {
            this.preloadGridAd();
            return;
        }

        if (active) {
            this.gridAd.show();
            return true;
        } else {
            this.gridAd.hide();
            return true;
        }
    }


    /**
     * 发送邀请
     */
    public async sendInvite(imageUrl: string, title: string, param: any): Promise<any> {
        wx.shareAppMessage({
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
            wx.vibrateShort({
                success: null,
                fail: null,
                complete: null,
            });
        } else {
            wx.vibrateLong({
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
            wx.navigateToMiniProgram({
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


