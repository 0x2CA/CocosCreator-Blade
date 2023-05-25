import PlatformBase from "../Bases/PlatformBase";

/**
 * 安卓平台
 */
export default class AndroidPlatform extends PlatformBase {

    /**
     * 激励视频预加载状态
     */
    private _videoPreloadState: PlatformBase.AdState = PlatformBase.AdState.None;

    /**
     * 横幅预加载状态
     */
    private _bannerPreloadState: PlatformBase.AdState = PlatformBase.AdState.None;

    /**
     * 插页广告加载状态
     */
    private _interstitialPreloadState: PlatformBase.AdState = PlatformBase.AdState.None;

    private _configs: AndroidConfigBase = null;

    protected onInitialize() {
        this._configs = PlatformConfig[PlatformService.PlatformType.ANDROID];

        this.callNative('initialize',
            "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V",
            this._configs.appId,
            this._configs.bannerId,
            this._configs.interstitialId);
    }


    /**
     * 判断是否支持激励视频广告
     */
    public isSupportRewardVideo(): boolean {
        return true;
    }

    /**
     * 预加载激励视频
     */
    public preloadRewardVideo(): Promise<void> {
        if (this._videoPreloadState == PlatformBase.AdState.Loading) {
            return PromiseHelper.waitUntil(() => this._videoPreloadState != PlatformBase.AdState.Loading);
        } else if (this._videoPreloadState == PlatformBase.AdState.Loaded) {
            // 已经加载
            return Promise.resolve();
        }
        else if (this._videoPreloadState == PlatformBase.AdState.None) {
            // 启动预加载
            this.callNative('preloadVideo', "(Ljava/lang/String;)V", this._configs.videoId);
            this._videoPreloadState = PlatformBase.AdState.Loading;
        }
        return PromiseHelper.waitUntil(() => this._videoPreloadState != PlatformBase.AdState.Loading);
    }

    private videoCallback: (isok: boolean) => void = null;

    /**
     * 显示激励视频
     */
    public playRewardVideo(): Promise<boolean> {
        if (this._videoPreloadState == PlatformBase.AdState.Loaded) {
            this.callNative('showVideo', "()V");
            if (this.videoCallback != null) {
                this.videoCallback(false);
                this.videoCallback = null;
                return new Promise((resolve, reject) => {
                    this.videoCallback = (isok: boolean) => {
                        resolve(isok);
                    };
                })
            }
        }
        else {
            return Promise.resolve(false);
        }
    }

    /**
     * 判断视频是否已经加载
     */
    public isVideoLoaded(): boolean {
        return this._videoPreloadState == PlatformBase.AdState.Loaded
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
    public preloadBanner(): Promise<void> {
        if (this._bannerPreloadState == PlatformBase.AdState.Loading) {
            return PromiseHelper.waitUntil(() => this._bannerPreloadState != PlatformBase.AdState.Loading);
        } else if (this._bannerPreloadState == PlatformBase.AdState.Loaded) {
            // 已经加载
            return Promise.resolve();
        }
        else if (this._bannerPreloadState == PlatformBase.AdState.None) {
            // 启动预加载
            this.callNative('preloadBanner', "()V");
            this._bannerPreloadState = PlatformBase.AdState.Loading;
        }

        return PromiseHelper.waitUntil(() => this._bannerPreloadState != PlatformBase.AdState.Loading);
    }

    /**
     * 激活 显示/隐藏横幅广告
     * @param active
     */
    public activeBanner(active: boolean) {
        if (active) {
            this.callNative('showBanner', "()V");
        }
        else {
            this.callNative('hideBanner', "()V");
        }
    }

    /**
     * 判断是否支持插页广告
     */
    public isSupportInterstitial(): boolean {
        return true;
    }

    /**
     * 判插页频是否已经加载
     */
    public isInterstitialLoaded(): boolean {
        return this._interstitialPreloadState == PlatformBase.AdState.Loaded
    }

    /**
     * 预加载插页广告
     */
    public preloadInterstitial(): Promise<void> {
        if (this._interstitialPreloadState == PlatformBase.AdState.Loaded) {
            // 已经加载
            return Promise.resolve();
        }
        else if (this._interstitialPreloadState == PlatformBase.AdState.None) {
            // 未加载, 调用加载
            this.callNative('preloadInterstitial', "(Ljava/lang/String;)V", this._configs.interstitialId);
        }

        return PromiseHelper.waitUntil(() => this._interstitialPreloadState != PlatformBase.AdState.Loading);
    }

    /**
     * 显示插页广告
     */
    public showInterstitial() {
        this.callNative('showInterstitial', "()V");
        return Promise.resolve(true);
    }


    /**
     * 调用系统原生方法
     * @param method
     * @param methodSign
     * @param param
     */
    public callNative(method: string, methodSignature: string, ...args: string[]) {
        jsb.reflection.callStaticMethod('com/external/jsapi/Blade', method, methodSignature, ...args);
    }

    //=======================
    // Native回调
    //=======================

    /**
     * 视频加载完成回调
     * Native调用
     */
    private onRewardedVideoAdLoaded() {
        console.log('onRewardedVideoAdLoaded');
        this._videoPreloadState = PlatformBase.AdState.Loaded;
    }

    /**
     * 视频加载失败回调
     * Native调用
     * @param code
     */
    private onRewardedVideoAdFailedToLoad(code: number) {
        console.log('onRewardedVideoAdFailedToLoad:' + code);
        this._videoPreloadState = PlatformBase.AdState.None;
    }

    /**
     * 视频奖励达成回调
     * Native调用
     */
    private onRewardedVideoRewarded() {
        console.log('onRewardedVideoRewarded');
        if (this.videoCallback != null) {
            this.videoCallback(true);
            this.videoCallback = null;
        }
    }

    /**
     * 奖励视频开始打开
     * Native调用
     */
    private onRewardedVideoAdOpened() {
        this._videoPreloadState = PlatformBase.AdState.None;
    }

    /**
     * 奖励视频开始播放
     * Native调用
     */
    private onRewardedVideoStarted() {
    }

    /**
     * 视频奖励关闭
     * Native调用
     */
    private onRewardedVideoAdClosed() {
        // 继续加载新的视频
        this.preloadRewardVideo();
        if (this.videoCallback != null) {
            this.videoCallback(false);
            this.videoCallback = null;
        }
    }

    /**
     * 横幅广告加载完成回调
     * Native调用
     */
    private onBannerLoaded() {
        console.log('onBannerLoaded');
        this._bannerPreloadState = PlatformBase.AdState.Loaded;
    }

    /**
     * 横幅广告加载失败回调
     * Native调用
     */
    private onBannerFailedToLoad(code: number) {
        console.log('onBannerFailedToLoad:' + code);
        this._bannerPreloadState = PlatformBase.AdState.None;
    }

    /**
     * 横幅广告打开回调
     * Native调用
     */
    private onBannerOpened() {
        console.log('onBannerOpened');
    }

    /**
     * 插页广告加载完成回调
     * Native调用
     */
    private onInterstitialLoaded() {
        this._interstitialPreloadState = PlatformBase.AdState.Loaded;
    }

    /**
     * 插页广告加载失败回调
     * Native调用
     * @param code
     */
    private onInterstitialFailedToLoad(code: number) {
        console.log('onInterstitialFailedToLoad:' + code);
        this._interstitialPreloadState == PlatformBase.AdState.None;
        this.preloadInterstitial();
    }

    /**
     * 插页广告打开回调
     * Native调用
     */
    private onInterstitialOpened() {

    }

    /**
     * 插页广告关闭回调
     * Native调用
     */
    private onInterstitialClosed() {
        this._interstitialPreloadState = PlatformBase.AdState.None;
        this.preloadInterstitial();
    }

    public copyToClipBoard(string: string): Promise<void> {
        this.callNative("copyToClipBoard", "(Ljava/lang/String;)V", string);
        return Promise.resolve();
    }

}

import PlatformConfig from "../../Module/Defines/PlatformConfig";
import AndroidConfigBase from "../../Module/Defines/PlatformConfig/Bases/AndroidConfigBase";
import PromiseHelper from "../Helpers/PromiseHelper";
import PlatformService from "../Services/PlatformService";

