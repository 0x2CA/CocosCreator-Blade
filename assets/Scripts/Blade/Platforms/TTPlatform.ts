import PlatformBase from "../Bases/PlatformBase";

/**
 *  字节跳动
 */
export default class TTPlatform extends PlatformBase {

    // 启动参数
    private _launchOptions: tt.launchOption
        = null;

    // // 授权按钮
    // private authorizeButton = null;

    // 菜单分享
    private _shareMenuInfo: {
        templateId?: string,
        title?: string,
        imageUrl?: string,
        query: string,
        success: Function
    } = null;

    private _videoState: PlatformBase.AdState = PlatformBase.AdState.None;
    private _bannerState: PlatformBase.AdState = PlatformBase.AdState.None;
    private _interstitialState: PlatformBase.AdState = PlatformBase.AdState.None;

    /**
    * 激励视频实例
    */
    private _video: tt.RewardedVideoAd = null;

    private _banner: tt.BannerAd = null;

    private _interstitial: tt.InterstitialAd = null;

    private _bannerActive: boolean = false;

    private _configs: TTConfigBase = null;

    protected onInitialize() {
        this._configs = PlatformConfig[PlatformService.PlatformType.BYTEDANCE];

        // 获取尝试用户信息
        this.getUserInfoTry();

        tt.onShow((res) => {
            // 更新启动参数
            this.setLaunchOptions(res);
            // 显示事件
            this.emit(PlatformBase.EventType.OnShow, res)
        });

        // this.preloadBanner();
        // this.preloadInterstitial();
        // this.preloadRewardVideo();
    }

    public async login(isForce: boolean = true): Promise<void> {
    }

    private _isCheckUpdate: boolean = false;

    public checkForUpdate(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.checkUpdate(resolve)
        });
    }

    private checkUpdate(finishCallback: () => void) {
        this._isCheckUpdate = false;

        const updateManager = tt.getUpdateManager();

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
            tt.showModal({
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
            tt.showModal({
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
        return tt.getStorageSync(name) as string;
    }

    /**
     * 获取分享信息
     * @returns
     */
    public getShareInfo() {
    }

    public saveArchive(name: string, data: string) {
        tt.setStorageSync(name, data);
    }

    public getLaunchOptions() {
        if (!this._launchOptions) {
            this._launchOptions = tt.getLaunchOptionsSync();
        }
        return this._launchOptions;
    }

    /**
     * 更新启动参数
     * @param value
     */
    private setLaunchOptions(value: tt.launchOption) {
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
                tt.getSetting({
                    success: (res) => {
                        if (res.authSetting != null) {
                            if (res.authSetting["scope.userInfo"] == true) {
                                tt.getUserInfo({
                                    success: (res) => {
                                        if (res.rawData) {
                                            const info = JSON.parse(res.rawData);
                                            const sysInfo = tt.getSystemInfoSync();
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
                            }
                        }
                    },
                    fail: reject,
                })
            });
            return result;
        } catch (error) {
            console.log(error);
            return null
        }
    }

    private _encryptedData: string = null;
    private _iv: string = null;

    /**
    * 用户授权
    */
    public authorize(): Promise<void> {
        return new Promise((resolve, reject) => {
            const handleInfo = (res) => {
                if (res.rawData) {
                    const info = JSON.parse(res.rawData);
                    const sysInfo = tt.getSystemInfoSync();
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
                    this._encryptedData = res.encryptedData;
                    this._iv = res.iv;
                    resolve();
                } else {
                    reject();
                }
            };
            tt.getUserInfo({
                success: handleInfo,
                fail: (res: any) => {
                    tt.authorize({
                        scope: "scope.userInfo",
                        success() {
                            tt.getUserInfo({
                                success: handleInfo,
                                fail: (res: any) => {
                                    reject();
                                },
                            });
                        },
                        fail() {
                            reject();
                        }
                    });
                },
            });
        });
    }

    // public authorize(options?: {
    //     left: number;
    //     top: number;
    //     width: number;
    //     height: number;
    //     callback?: Function;
    //     caller?: any;
    // }): Promise<void> {
    //     return new Promise((resolve, reject) => {
    //         const handleInfo = (res) => {
    //             if (res.rawData) {
    //                 const info = JSON.parse(res.rawData);
    //                 const sysInfo = tt.getSystemInfoSync();
    //                 this.userInfo = {
    //                     avatar: info.avatarUrl || "",
    //                     nickname: info.nickName || "",
    //                     gender: info.gender || 0,
    //                     province: info.province,
    //                     city: info.city,
    //                     country: info.country,
    //                     platform: sysInfo.platform,
    //                     device: sysInfo.model,
    //                 };
    //                 if (options && options.callback) {
    //                     options.callback.call(options.caller);
    //                 }
    //                 resolve({
    //                     encryptedData: res.encryptedData,
    //                     iv: res.iv,
    //                 });
    //             } else {
    //                 reject();
    //             }
    //         };
    //         tt.getUserInfo({
    //             success: handleInfo,
    //             fail: (res: any) => {
    //                 // 获取配置
    //                 tt.getSetting({
    //                     success: (res) => {
    //                         tt.getSystemInfo({
    //                             success: (res) => {
    //                                 if (options) {
    //                                     options.height *= res.screenHeight;
    //                                     options.width *= res.screenWidth;
    //                                     options.left *= res.screenWidth;
    //                                     options.top *= res.screenHeight;
    //                                 } else {
    //                                     options = {
    //                                         left: 0,
    //                                         top: 0,
    //                                         width: res.screenWidth,
    //                                         height: res.screenHeight,
    //                                     };
    //                                 }
    //                                 const button = tt.createUserInfoButton({
    //                                     type: "text",
    //                                     text: "",
    //                                     style: {
    //                                         left: options.left,
    //                                         top: options.top,
    //                                         width: options.width,
    //                                         height: options.height,
    //                                         backgroundColor: "rgba(252,255,255,0)",
    //                                         // backgroundColor: "#ff0000",
    //                                         borderColor: "rgba(250,250,250,0)",
    //                                         borderWidth: 0,
    //                                         borderRadius: 0,
    //                                         textAlign: "center",
    //                                         fontSize: 30,
    //                                         lineHeight: 32,
    //                                     },
    //                                     withCredentials: false,
    //                                 });
    //                                 this.authorizeButton = button;
    //                                 button.onTap((res: any) => {
    //                                     if (res.rawData) {
    //                                         button.destroy();
    //                                         this.authorizeButton = null;
    //                                         if (options && options.callback) {
    //                                             options.callback.call(options.caller);
    //                                         }
    //                                     }
    //                                     handleInfo(res);
    //                                 });
    //                             },
    //                             fail: (res) => {
    //                                 reject();
    //                             },
    //                         });
    //                     },
    //                 });
    //             },
    //         });
    //     });
    // }

    // /**
    //  * 取消授权
    //  */
    // public unauthorize() {
    //     if (this.authorizeButton) {
    //         this.authorizeButton.destroy();
    //         this.authorizeButton = null;
    //     }
    // }

    /**
     * 打开客服（仅限抖音）
     * @returns
     */
    public openCustomerServiceConversation() {
        return new Promise<void>((resolve, reject) => {
            /**
               * 1 ：小 6 客服 2 :  抖音IM 客服（仅支持抖音）
               */
            tt.openCustomerServiceConversation({
                type: 1,
                success: (res) => {
                    resolve();
                },
                fail: (res) => {
                    let error = "未知错误";
                    if (res != null && res.errMsg != null) {
                        let message = res.errMsg.split("openCustomerServiceConversation:fail ")?.[1];
                        if (message != null) {
                            error = message;
                        }
                    }
                    reject(error);
                },
            });
        });
    }

    private contactButton: tt.ContactButton = null;

    /**
     * 显示客服按钮
     * left、top、width、height 为相对界面的比例，0~1
     * @param options
     * @returns
     */
    public createContactButton(options?: {
        left: number;
        top: number;
        width: number;
        height: number;
        callback?: Function;
        caller?: any;
        imagePath?: string;
    }) {
        if (this.contactButton) {
            this.contactButton.destroy();
            this.contactButton = null;
        }

        return new Promise((resolve, reject) => {
            tt.getSystemInfo({
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

                    const button = tt.createContactButton({
                        type: "image",
                        image: options.imagePath,
                        style: {
                            left: options.left,
                            top: options.top,
                            width: options.width,
                            height: options.height,
                            backgroundColor: "rgba(252,255,255,0)",
                            borderColor: "rgba(255,255,255,255)",
                            borderWidth: 0,
                            borderRadius: 0,
                            textAlign: "center",
                            fontSize: 30,
                            lineHeight: 32,
                        },
                    })
                    this.contactButton = button;
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
     * 隐藏客服按钮
     */
    public hideContactButton() {
        if (this.contactButton) {
            this.contactButton.hide();
        }
    }
    /**
       * 显示客服按钮
       */
    public showContactButton() {
        if (this.contactButton) {
            this.contactButton.show();
        }
    }
    /**
       * 销毁客服按钮
       */
    public destroyContactButton() {
        if (this.contactButton) {
            this.contactButton.destroy();
            this.contactButton = null;
        }
    }
    /**
    * 配置菜单分享内容
    */
    public async setShareMenuInfo(imageUrl: string, title: string, param: any, callback?: Function, caller?: any) {
        if (this._shareMenuInfo == null) {
            tt.showShareMenu({
                withShareTicket: true,
            });

            tt.onShareAppMessage(() => {
                return this._shareMenuInfo
            });
        }

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

    public async setShareMenuInfoByID(id: string, imageUrl: string, title: string, param: any, callback?: Function, caller?: any) {
        if (this._shareMenuInfo == null) {
            tt.showShareMenu({
                withShareTicket: true,
            });

            tt.onShareAppMessage(() => {
                return this._shareMenuInfo
            });
        }

        param.shareTime = blade.timer.getTime();
        let query = HttpHelper.formatParams(param);

        this._shareMenuInfo = {
            templateId: id,
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
        return StringHelper.compareVersion(tt.getSystemInfoSync().SDKVersion, "0.0.0") >= 0
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
            this._video = tt.createRewardedVideoAd({
                adUnitId: this._configs.videoId,
            });
            // 加载成功
            this._video.onLoad(() => {
                console.log("loaded")
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
        return StringHelper.compareVersion(tt.getSystemInfoSync().SDKVersion, "0.0.0") >= 0
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

        const sysInfo = tt.getSystemInfoSync();
        this._banner = tt.createBannerAd({
            adUnitId: this._configs.bannerId,
            style: {
                top: sysInfo.screenHeight,
                left: 0,
                height: 50,
                width: sysInfo.screenWidth,
            },
        });

        this._banner.onLoad(async () => {
            this._bannerState = PlatformBase.AdState.Loaded;
            if (this._bannerActive) {
                this.emit(PlatformBase.EventType.OpenBanner);
                this._banner.show();
            }
        });

        this._banner.onError((err) => {
            this._bannerState = PlatformBase.AdState.None;
        });

        this._banner.onResize((res) => {
            // 重设横幅位置
            this._banner.style.top =
                sysInfo.screenHeight - res.height;
            this._banner.style.left =
                (sysInfo.screenWidth - res.width) / 2;
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
            this.emit(PlatformBase.EventType.CloseBanner);
            this._banner.destroy();
            this._banner = null;
            this._bannerState = PlatformBase.AdState.None;
            this.preloadBanner();
            return true;
        }
    }

    public isSupportInterstitial() {
        return StringHelper.compareVersion(tt.getSystemInfoSync().SDKVersion, "1.12.0") >= 0
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
            this._interstitial = tt.createInterstitialAd({ adUnitId: this._configs.interstitialId });

            this._interstitial.onLoad(() => {
                this._interstitialState = PlatformBase.AdState.Loaded;
            });

            this._interstitial.onError(async (error) => {
                this._interstitialState = PlatformBase.AdState.None;
                console.log(error)
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
            return Promise.resolve(false);
        }

        try {
            await this._interstitial.show();
            this._interstitialState = PlatformBase.AdState.Opening;
            this.emit(PlatformBase.EventType.OpenInterstitial)
            return Promise.resolve(true);
        } catch (error) {
            console.log(error);
            return Promise.resolve(false);
        }
    }


    /**
     * 发送邀请
     */
    public async sendInvite(imageUrl: string, title: string, param: any): Promise<void> {
        param.shareTime = blade.timer.getTime();

        tt.shareAppMessage({
            title: title,
            imageUrl: imageUrl,
            query: HttpHelper.formatParams(param),
        });
        await PromiseHelper.wait(1)

        this.emit(PlatformBase.EventType.OpenShare, imageUrl, title, param);
    }

    public async sendInviteByID(id: string, imageUrl: string, title: string, param: any): Promise<void> {
        param.shareTime = blade.timer.getTime();

        tt.shareAppMessage({
            templateId: id,
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
            tt.vibrateShort({
                success: null,
                fail: null,
                complete: null,
            });
        } else {
            tt.vibrateLong({
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
            tt.navigateToMiniProgram({
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
            tt.setClipboardData({
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
import TTConfigBase from "../../Module/Defines/PlatformConfig/Bases/TTConfigBase";
import HttpHelper from "../Helpers/HttpHelper";
import PromiseHelper from "../Helpers/PromiseHelper";
import StringHelper from "../Helpers/StringHelper";
import PlatformService from "../Services/PlatformService";

