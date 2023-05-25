import PlatformBase from "../Bases/PlatformBase";

/**
 *  QQ
 */
export default class QQPlatform extends PlatformBase {

    // 启动参数
    private _launchOptions: qq.launchOption
        = null;

    // 授权按钮
    private _authorizeButton = null;

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
    private _blockState: PlatformBase.AdState = PlatformBase.AdState.None;

    /**
    * 激励视频实例
    */
    public _video: qq.RewardedVideoAd = null;

    public _banner: qq.BannerAd = null;

    private _bannerStyle: {
        height: number,
        width: number
    } = { height: 0, width: 0 };

    public _interstitial: qq.InterstitialAd = null;

    public _appBox: qq.AppBoxAd = null;

    public _block: qq.BlockAd = null;

    public _blockStyle: {
        height: number,
        width: number
    } = { height: 0, width: 0 };

    private _bannerActive: boolean = false;

    private _blockActive: boolean = false;

    private _configs: QQConfigBase = null;

    protected onInitialize() {
        this._configs = PlatformConfig[PlatformService.PlatformType.QQ];

        // 获取尝试用户信息
        this.getUserInfoTry()

        qq.onShow((res) => {
            // 更新启动参数
            this.setLaunchOptions(res);
            // 显示事件
            this.emit(PlatformBase.EventType.OnShow, res)
        });

        this.preloadBanner();
        this.preloadInterstitial();
        this.preloadRewardVideo();
        this.preloadAppBox();
        this.preloadBlockAd();
    }

    public getArchive(name: string): string {
        return qq.getStorageSync(name) as string;
    }

    public saveArchive(name: string, data: string) {
        qq.setStorageSync(name, data);
    }

    public getLaunchOptions() {
        if (!this._launchOptions) {
            this._launchOptions = qq.getLaunchOptionsSync();
        }
        return this._launchOptions;
    }

    /**
     * 更新启动参数
     * @param value
     */
    private setLaunchOptions(value: qq.launchOption) {
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
            console.log(error);
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
                    this._encryptedData = res.encryptedData;
                    this._iv = res.iv;
                    resolve();
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
                                    this._authorizeButton = button;
                                    button.onTap((res: any) => {
                                        if (res.rawData) {
                                            button.destroy();
                                            this._authorizeButton = null;
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
        if (this._authorizeButton) {
            this._authorizeButton.destroy();
            this._authorizeButton = null;
        }
    }


    /**
    * 配置菜单分享内容
    */
    public async setShareMenuInfo(imageUrl: string, title: string, param: any, callback?: Function, caller?: any) {
        if (this._shareMenuInfo == null) {
            qq.showShareMenu({
                withShareTicket: true,
            });

            qq.onShareAppMessage(() => {
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
            this._video = qq.createRewardedVideoAd({
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
        return StringHelper.compareVersion(qq.getSystemInfoSync().SDKVersion, "0.0.0") >= 0
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

        const sysInfo = qq.getSystemInfoSync();
        this._banner = qq.createBannerAd({
            adUnitId: this._configs.bannerId,
            style: {
                top: sysInfo.screenHeight,
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


    public isSupportBlockAd(): boolean {
        return StringHelper.compareVersion(qq.getSystemInfoSync().SDKVersion, "1.15.0") >= 0
    }

    public async preloadBlockAd(): Promise<void> {
        if (!this.isSupportBlockAd()) {
            return;
        }

        // 已经加载
        if (this._blockState == PlatformBase.AdState.Loaded) {
            return;
        }

        // 正在加载, 等待加载结束
        if (this._blockState == PlatformBase.AdState.Loading) {
            return await PromiseHelper.waitUntil(() => this._blockState != PlatformBase.AdState.Loading);
        }

        if (this._block) {
            this._block.destroy();
            this._block = null
        }

        console.log("block", "开始加载");

        const sysInfo = qq.getSystemInfoSync();
        this._block = qq.createBlockAd({
            adUnitId: this._configs.blockId,
            style: {
                top: sysInfo.screenHeight,
                left: 0
            },
            orientation: "landscape",
            size: 5
        });

        this._block.onLoad(async () => {
            console.log("block", "加载成功");
            this._blockState = PlatformBase.AdState.Loaded;
            if (this._blockActive) {
                this._block.show();
            }
        });

        this._block.onError((err) => {
            console.error("block", "错误", err);
            this._blockState = PlatformBase.AdState.None;
        });

        this._block.onResize((res) => {
            console.log(res);
            // 重设横幅位置
            this._blockStyle.height = res.height;
            this._blockStyle.width = res.width;

            this._block.style.top =
                sysInfo.screenHeight - this._blockStyle.height;
            this._block.style.left =
                (sysInfo.screenWidth - this._blockStyle.width) / 2;
        });


        this._blockState = PlatformBase.AdState.Loading;
    }

    public activeBlockAd(active: boolean) {
        if (this._block == null) {
            this.preloadBlockAd();
            return false;
        }

        if (active) {
            if (this._blockState != PlatformBase.AdState.Loaded) {
                this.preloadBlockAd();
                return false;
            }

            this._block.show();
            this._blockState = PlatformBase.AdState.Opening;
            return true;
        } else {
            // 直接销毁重新创建banner, 刷新广告
            if (this._blockState != PlatformBase.AdState.Opening) {
                return false;
            }
            this._block.destroy();
            this._block = null;
            this._blockState = PlatformBase.AdState.None;
            this.preloadBlockAd();
            return true;
        }
    }

    public isSupportInterstitial() {
        return StringHelper.compareVersion(qq.getSystemInfoSync().SDKVersion, "1.12.0") >= 0
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
            this._interstitial = qq.createInterstitialAd({ adUnitId: this._configs.interstitialId });

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


    async isSupportAppBox() {
        return StringHelper.compareVersion(qq.getSystemInfoSync().SDKVersion, "1.7.1") >= 0
    }

    public async preloadAppBox() {
        if (!this.isSupportAppBox()) {
            return;
        }

        if (this._appBox == null) {
            this._appBox = qq.createAppBox({ adUnitId: this._configs.appBoxId });
        }

        try {
            if (this._appBox != null) {
                await this._appBox.load();
            }
        } catch (error) {
            console.log(JSON.stringify(error));
        }
    }

    async showAppBox() {
        if (!this.isSupportAppBox()) {
            return;
        }

        try {
            if (this._appBox != null) {
                await this._appBox.show();
            }
        } catch (error) {
            console.log(error);
            this.preloadAppBox();
        }
    }


    /**
     * 发送邀请
     */
    public async sendInvite(imageUrl: string, title: string, param: any): Promise<void> {
        param.shareTime = blade.timer.getTime();

        qq.shareAppMessage({
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
                    console.log(`跳转 ${appid}`);
                    resolve(true);
                },
                fail: reject,
            });
        });
    }

}

import PlatformConfig from "../../Module/Defines/PlatformConfig";
import QQConfigBase from "../../Module/Defines/PlatformConfig/Bases/QQConfigBase";
import HttpHelper from "../Helpers/HttpHelper";
import PromiseHelper from "../Helpers/PromiseHelper";
import StringHelper from "../Helpers/StringHelper";
import PlatformService from "../Services/PlatformService";

