import PlatformBase from "../Bases/PlatformBase";

/**
 *  微信
 */
export default class WxPlatform extends PlatformBase {

    // 启动参数
    private _launchOptions: wx.launchOption = null;

    // 授权按钮
    private _authorizeButton = null;
    // 授权取消
    private _authorizeCancelCallBack: Function = null;

    // 菜单分享
    private _shareMenuInfo: {
        title: string,
        imageUrl: string,
        query: string,
        success: Function
    } = null;

    private _videoState: PlatformBase.AdState = PlatformBase.AdState.None;
    private _bannerState: PlatformBase.AdState = PlatformBase.AdState.None;
    private _interstitialState: PlatformBase.AdState = PlatformBase.AdState.None;
    private _gridAdState: PlatformBase.AdState = PlatformBase.AdState.None;

    /**
    * 激励视频实例
    */
    private _video: wx.RewardedVideoAd = null;

    private _banner: wx.BannerAd = null;

    private _interstitial: wx.InterstitialAd = null;

    private _gridAd: wx.GridAd = null;

    private _bannerActive: boolean = false;


    private _configs: WxConfigBase = null;

    protected onInitialize() {
        this._configs = PlatformConfig[PlatformService.PlatformType.WX];

        // 获取尝试用户信息
        this.getUserInfoTry()

        wx.onShow((res) => {
            // 更新启动参数
            this.setLaunchOptions(res);
            // 显示事件
            this.emit(PlatformBase.EventType.OnShow, res)
        });

        // this.preloadBanner();
        // this.preloadInterstitial();
        // this.preloadRewardVideo();
        // this.preloadGridAd();
    }

    public async login(isForce: boolean = false): Promise<void> {

    }

    public async pay(refId: string): Promise<void> {

    }

    private _isCheckUpdate: boolean = false;

    public checkForUpdate(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.checkUpdate(resolve)
        });
    }

    private checkUpdate(finishCallback: () => void) {
        this._isCheckUpdate = false;

        const updateManager = wx.getUpdateManager();

        updateManager.onCheckForUpdate((res) => {
            this._isCheckUpdate = true;

            // 请求完新版本信息的回调
            console.log("检查更新回调", res.hasUpdate);
            if (!res.hasUpdate) {
                //无更新
                finishCallback();
            }
        })

        updateManager.onUpdateReady(() => {
            wx.showModal({
                title: '更新提示',
                content: '新版本已经准备好，是否重启应用？',
                success: (res) => {
                    if (res.confirm) {
                        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                        updateManager.applyUpdate()
                    } else {
                        this.checkUpdate(finishCallback);
                    }
                }
            })
        })

        updateManager.onUpdateFailed(() => {
            // 新版本下载失败
            wx.showModal({
                title: '更新失败',
                content: '新版本下载失败，请重试!',
                success: (res) => {
                    // if (res.confirm) {
                    //     this.checkUpdate(finishCallback);
                    // }
                    this.checkUpdate(finishCallback);
                }
            })
        });

        if (this._isCheckUpdate == false) {
            blade.timer.startTimeout(1.5, () => {
                if (this._isCheckUpdate == false) {
                    //无更新
                    finishCallback();
                }
            }, this);
        }
    }

    public getArchive(name: string): string {
        return wx.getStorageSync(name) as string;
    }

    public saveArchive(name: string, data: string) {
        wx.setStorageSync(name, data);
    }

    public getLaunchOptions() {
        if (!this._launchOptions) {
            this._launchOptions = wx.getLaunchOptionsSync();
        }
        return this._launchOptions;
    }

    /**
     * 更新启动参数
     * @param value
     */
    private setLaunchOptions(value: wx.launchOption) {
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
            // console.error(error);
            return null
        }
    }

    private _encryptedData: string = null;
    private _iv: string = null;

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
    }): Promise<void> {
        if (this._authorizeButton) {
            this._authorizeButton.destroy();
            this._authorizeButton = null;
        }
        if (this._authorizeCancelCallBack) {
            this._authorizeCancelCallBack();
            this._authorizeCancelCallBack = null;
        }
        return new Promise((resolve, reject) => {
            this._authorizeCancelCallBack = reject;
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
                        options.callback.call(options.caller, this.userInfo);
                    }
                    this._encryptedData = res.encryptedData;
                    this._iv = res.iv;
                    resolve();
                }
            };
            wx.getUserInfo({
                success: handleInfo,
                fail: (res: any) => {
                    // // 获取配置
                    // wx.getSetting({
                    //     success: (res) => {
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
                            this._authorizeButton = button;
                            button.onTap((res: any) => {
                                if (res.rawData) {
                                    button.destroy();
                                    this._authorizeButton = null;
                                }
                                if (this._authorizeCancelCallBack) {
                                    this._authorizeCancelCallBack();
                                    this._authorizeCancelCallBack = null;
                                }
                                handleInfo(res);
                            });
                        },
                        fail: (res) => {
                            reject();
                        },
                    });
                    // },
                    // });
                },
            });
        });
    }

    /**
     * 取消授权
     */
    public unauthorize() {
        if (this._authorizeButton) {
            this._authorizeButton.destroy();
            this._authorizeButton = null;
        }
        if (this._authorizeCancelCallBack) {
            this._authorizeCancelCallBack();
            this._authorizeCancelCallBack = null;
        }
    }

    private gameClubButton: wx.GameClubButton = null;

    /**
     * 显示游戏圈
     * left、top、width、height 为相对界面的比例，0~1
     * @param options
     * @returns
     */
    public showGameClubButton(options?: {
        left: number;
        top: number;
        width: number;
        height: number;
        callback?: Function;
        caller?: any;
    }) {
        if (this.gameClubButton) {
            this.gameClubButton.destroy();
            this.gameClubButton = null;
        }

        return new Promise((resolve, reject) => {
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
                    const button = wx.createGameClubButton({
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
                        icon: "green"
                    })
                    this.gameClubButton = button;
                    button.onTap(() => {
                        if (options.callback) {
                            options.callback.call(options.caller);
                        }
                    });
                },
                fail: (res) => {
                    reject();
                },
            });
        });
    }

    /**
     * 隐藏游戏圈
     */
    public hideGameClubButton() {
        if (this.gameClubButton) {
            this.gameClubButton.destroy();
            this.gameClubButton = null;
        }
    }

    /**
    * 配置菜单分享内容
    */
    public async setShareMenuInfo(imageUrl: string, title: string, param: any, callback?: Function, caller?: any) {
        if (this._shareMenuInfo == null) {
            wx.showShareMenu({
                withShareTicket: true,
                menus: ['shareAppMessage', 'shareTimeline']
            });

            wx.onShareAppMessage(() => {
                return this._shareMenuInfo
            });

            wx.onShareTimeline(() => {
                return this._shareMenuInfo
            });
        }

        param = param || {}

        param.shareTime = blade.timer.getTime();

        let query = HttpHelper.formatParams(param);

        this._shareMenuInfo = {
            imageUrl, title, query, success: () => {
                this.emit(PlatformBase.EventType.OpenShare, imageUrl, title, param);
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
        return this._videoState == PlatformBase.AdState.Loaded;
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
            this._video = wx.createRewardedVideoAd({
                adUnitId: this._configs.videoId,
            });
            // 加载成功
            this._video.onLoad(() => {
                this._videoState = PlatformBase.AdState.Loaded;
            });
            // 加载失败
            this._video.onError((err) => {
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
        } else {
            this._video.load();
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
                    await this._video.show()
                    this.emit(PlatformBase.EventType.OpenVideo);
                } catch (error) {
                    // blade.ticker.pause = false;
                    blade.audio.resumeAll();
                    this.preloadRewardVideo();
                    this.off(PlatformBase.EventType.CloseVideo, closeFunc);
                    resolve(false);
                }
            })

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
        return StringHelper.compareVersion(wx.getSystemInfoSync().SDKVersion, "2.0.4") >= 0
    }

    /**
    * 预加载横幅
    */
    public async preloadBanner(): Promise<void> {
        if (!this.isSupportBanner()) {
            return;
        }

        // 已经加载
        if (this._bannerState == WxPlatform.AdState.Loaded) {
            return;
        }

        // 正在加载, 等待加载结束
        if (this._bannerState == WxPlatform.AdState.Loading) {
            return await PromiseHelper.waitUntil(() => this._bannerState != WxPlatform.AdState.Loading);
        }

        if (this._banner) {
            this._banner.destroy();
            this._banner = null
        }

        const sysInfo = wx.getSystemInfoSync();
        this._banner = wx.createBannerAd({
            adUnitId: this._configs.bannerId,
            style: {
                top: 0,
                left: 0,
                height: 50,
                width: 200,
            },
        });

        this._banner.onLoad(async () => {
            this._bannerState = WxPlatform.AdState.Loaded;
            if (this._bannerActive) {
                this.emit(PlatformBase.EventType.OpenBanner);
                this._banner.show();
            }
        });

        this._banner.onError((err) => {
            this._bannerState = WxPlatform.AdState.None;
        });

        this._banner.onResize((res) => {
            // 重设横幅位置
            this._banner.style.top =
                sysInfo.windowHeight - this._banner.style.realHeight;
            this._banner.style.left =
                (sysInfo.windowWidth - this._banner.style.realWidth) / 2;
        });

        this._bannerState = PlatformBase.AdState.Loading;
    }


    /**
    * 激活 显示/隐藏横幅广告
    * @param active
    */
    public activeBanner(active: boolean) {
        if (this._banner == null) {
            return false;
        }

        if (active) {
            if (this._bannerState != PlatformBase.AdState.Loaded) {
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
            this.emit(PlatformBase.EventType.CloseBanner);
            this._banner.destroy();
            this._banner = null;
            this._bannerState = PlatformBase.AdState.None;
            this.preloadBanner();
            return true;
        }
    }

    public isSupportInterstitial() {
        return StringHelper.compareVersion(wx.getSystemInfoSync().SDKVersion, "2.6.0") >= 0
    }

    public isInterstitialLoaded() {
        return this._interstitialState == PlatformBase.AdState.Loaded;
    }

    public async preloadInterstitial() {
        if (!this.isSupportInterstitial()) {
            return;
        }

        if (this._interstitialState == PlatformBase.AdState.Loaded) {
            return;
        }

        if (this._interstitialState == PlatformBase.AdState.Loading) {
            return await PromiseHelper.waitUntil(() => {
                return this._interstitialState != PlatformBase.AdState.Loading;
            });
        }

        this._interstitialState = PlatformBase.AdState.Loading;
        if (this._interstitial == null) {
            this._interstitial = wx.createInterstitialAd({ adUnitId: this._configs.interstitialId });

            this._interstitial.onLoad(() => {
                this._interstitialState = PlatformBase.AdState.Loaded;
            });

            this._interstitial.onError(async (error) => {
                this._interstitialState = PlatformBase.AdState.None;
            });

            this._interstitial.onClose(() => {
                this._interstitialState = PlatformBase.AdState.None;
                this.emit(PlatformBase.EventType.CloseInterstitial);
            });
        }
    }

    async showInterstitial() {
        if (!this.isSupportInterstitial()) {
            return Promise.resolve(false);
        }

        if (!this.isInterstitialLoaded()) {
            this.preloadInterstitial();
            return Promise.resolve(false);
        }

        try {
            await this._interstitial.show();
            this._interstitialState = PlatformBase.AdState.Opening;
            this.emit(PlatformBase.EventType.OpenInterstitial)
            return Promise.resolve(true);
        } catch (error) {
            console.error(error);
            return Promise.resolve(false);
        }
    }


    public isSupportGridAd() {
        return StringHelper.compareVersion(wx.getSystemInfoSync().SDKVersion, "2.9.2") >= 0
    }


    public isGridAdLoaded() {
        return this._gridAdState == PlatformBase.AdState.Loaded;
    }

    public async preloadGridAd() {
        if (!this.isSupportGridAd()) {
            return;
        }

        if (this._gridAdState == PlatformBase.AdState.Loaded) {
            return;
        }

        if (this._gridAdState == PlatformBase.AdState.Loading) {
            return await PromiseHelper.waitUntil(() => {
                return this._gridAdState != PlatformBase.AdState.Loading;
            });
        }

        const sysInfo = wx.getSystemInfoSync();
        this._gridAdState = PlatformBase.AdState.Loading;
        if (this._gridAd == null) {
            this._gridAd = wx.createGridAd({
                adUnitId: this._configs.gridId,
                adTheme: "white",
                gridCount: 8,
                style: {
                    height: sysInfo.screenWidth * 0.8,
                    width: sysInfo.screenWidth * 0.8,
                    left: sysInfo.screenWidth * 0.1,
                    top: (sysInfo.screenHeight - sysInfo.screenWidth * 0.8) / 2,
                }
            });

            this._gridAd.onLoad(() => {
                this._gridAdState = PlatformBase.AdState.Loaded;
            });

            this._gridAd.onError(async (error) => {
                this._gridAdState = PlatformBase.AdState.None;
            });

            this._gridAd.onResize((res) => {
                // 重设横幅位置
                this._gridAd.style.top =
                    (sysInfo.windowHeight - this._gridAd.style.realHeight) / 2;
                this._gridAd.style.left =
                    (sysInfo.windowWidth - this._gridAd.style.realWidth) / 2;
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
            this._gridAd.show();
            return true;
        } else {
            this._gridAd.hide();
            return true;
        }
    }


    /**
     * 发送邀请
     */
    public async sendInvite(imageUrl: string, title: string, param: any): Promise<void> {
        wx.shareAppMessage({
            title: title,
            imageUrl: imageUrl,
            query: HttpHelper.formatParams(param),
        });
        await PromiseHelper.wait(1)

        this.emit(PlatformBase.EventType.OpenShare, imageUrl, title, param);
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
                    console.log(`跳转 ${appid}`);
                    resolve(true);
                },
                fail: reject,
            });
        });
    }

    public copyToClipBoard(string: string): Promise<void> {
        return new Promise((resolve, reject) => {
            wx.setClipboardData({
                data: string, success: () => {
                    console.log("已经复制到剪贴板");
                    resolve();
                }, fail: (error) => {
                    console.log("复制到剪贴板失败");
                    reject(error);
                }
            });
        });
    }

}


import PlatformConfig from "../../Module/Defines/PlatformConfig";
import WxConfigBase from "../../Module/Defines/PlatformConfig/Bases/WxConfigBase";
import HttpHelper from "../Helpers/HttpHelper";
import PromiseHelper from "../Helpers/PromiseHelper";
import StringHelper from "../Helpers/StringHelper";
import PlatformService from "../Services/PlatformService";

