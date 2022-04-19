import PlatformBase from "../Bases/PlatformBase";
import PlatformConfig from "../../Module/Defines/PlatformConfig";
import PromiseHelper from "../Helpers/PromiseHelper";



/**
 * Google Play平台
 */
export default class GPPlatform extends PlatformBase {

    /**
     * 激励视频预加载状态
     */
    private videoPreloadState: PlatformBase.AdState = PlatformBase.AdState.None;

    /**
     * 横幅预加载状态
     */
    private bannerPreloadState: PlatformBase.AdState = PlatformBase.AdState.None;

    /**
     * 插页广告加载状态
     */
    private interstitialPreloadState: PlatformBase.AdState = PlatformBase.AdState.None;


    public onInitialize() {
        if (CC_DEBUG) {
            this.callNative('initialize', "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V",
                "ca-app-pub-3940256099942544~1458002511",
                "ca-app-pub-3940256099942544/6300978111",
                "ca-app-pub-3940256099942544/1033173712");
        }
        else {
            this.callNative('initialize',
                "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V",
                PlatformConfig.as.appId,
                PlatformConfig.as.bannerId,
                PlatformConfig.as.interstitialId);
        }
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
    public preloadRewardVideo(): Promise<any> {
        if (this.videoPreloadState == PlatformBase.AdState.Loading) {
            return PromiseHelper.waitUntil(() => this.videoPreloadState != PlatformBase.AdState.Loading);
        } else if (this.videoPreloadState == PlatformBase.AdState.Loaded) {
            // 已经加载
            return Promise.resolve();
        }
        else if (this.videoPreloadState == PlatformBase.AdState.None) {
            // 启动预加载
            this.callNative('preloadVideo', "(Ljava/lang/String;)V", CC_DEBUG ? 'ca-app-pub-3940256099942544/5224354917' : PlatformConfig.as.adId);
            this.videoPreloadState = PlatformBase.AdState.Loading;
        }
        return PromiseHelper.waitUntil(() => this.videoPreloadState != PlatformBase.AdState.Loading);
    }

    private videoCallback: (isok: boolean) => void = null;

    /**
     * 显示激励视频
     */
    public playRewardVideo(): Promise<boolean> {
        if (this.videoPreloadState == PlatformBase.AdState.Loaded) {
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
        return this.videoPreloadState == PlatformBase.AdState.Loaded
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
    public preloadBanner(): Promise<any> {
        if (this.bannerPreloadState == PlatformBase.AdState.Loading) {
            return PromiseHelper.waitUntil(() => this.bannerPreloadState != PlatformBase.AdState.Loading);
        } else if (this.bannerPreloadState == PlatformBase.AdState.Loaded) {
            // 已经加载
            return Promise.resolve();
        }
        else if (this.bannerPreloadState == PlatformBase.AdState.None) {
            // 启动预加载
            this.callNative('preloadBanner', "()V");
            this.bannerPreloadState = PlatformBase.AdState.Loading;
        }

        return PromiseHelper.waitUntil(() => this.bannerPreloadState != PlatformBase.AdState.Loading);
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
        return this.interstitialPreloadState == PlatformBase.AdState.Loaded
    }

    /**
     * 预加载插页广告
     */
    public preloadInterstitial(): Promise<any> {
        if (this.interstitialPreloadState == PlatformBase.AdState.Loaded) {
            // 已经加载
            return Promise.resolve();
        }
        else if (this.interstitialPreloadState == PlatformBase.AdState.None) {
            // 未加载, 调用加载
            this.callNative('preloadInterstitial', "(Ljava/lang/String;)V", CC_DEBUG ? 'ca-app-pub-3940256099942544/4411468910' : PlatformConfig.as.interstitialId);
        }

        return PromiseHelper.waitUntil(() => this.interstitialPreloadState != PlatformBase.AdState.Loading);
    }

    /**
     * 显示插页广告
     */
    public showInterstitial() {
        this.callNative('showInterstitial', "()V");
    }


    /**
     * 调用系统原生方法
     * @param method
     * @param methodSign
     * @param param
     */
    private callNative(method: string, methodSignature: string, ...args: string[]) {
        jsb.reflection.callStaticMethod('com/external/jsapi/AdmobHelper', method, methodSignature, ...args);
    }


    //=======================
    // Native回调
    //=======================
    /**
     * 视频加载完成回调
     * Native调用
     */
    private onRewardedVideoAdLoaded() {
        cc.log('onRewardedVideoAdLoaded');
        this.videoPreloadState = PlatformBase.AdState.Loaded;
    }

    /**
     * 视频加载失败回调
     * Native调用
     * @param code
     */
    private onRewardedVideoAdFailedToLoad(code: number) {
        cc.log('onRewardedVideoAdFailedToLoad:' + code);
        this.videoPreloadState = PlatformBase.AdState.None;
    }

    /**
     * 视频奖励达成回调
     * Native调用
     */
    private onRewardedVideoRewarded() {
        cc.log('onRewardedVideoRewarded');
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
        this.videoPreloadState = PlatformBase.AdState.None;
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
        cc.log('onBannerLoaded');
        this.bannerPreloadState = PlatformBase.AdState.Loaded;
    }

    /**
     * 横幅广告加载失败回调
     * Native调用
     */
    private onBannerFailedToLoad(code: number) {
        cc.log('onBannerFailedToLoad:' + code);
        this.bannerPreloadState = PlatformBase.AdState.None;
    }

    /**
     * 横幅广告打开回调
     * Native调用
     */
    private onBannerOpened() {
        cc.log('onBannerOpened');
    }

    /**
     * 插页广告加载完成回调
     * Native调用
     */
    private onInterstitialLoaded() {
        this.interstitialPreloadState = PlatformBase.AdState.Loaded;
    }

    /**
     * 插页广告加载失败回调
     * Native调用
     * @param code
     */
    private onInterstitialFailedToLoad(code: number) {
        cc.log('onInterstitialFailedToLoad:' + code);
        this.interstitialPreloadState == PlatformBase.AdState.None;
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
        this.interstitialPreloadState = PlatformBase.AdState.None;
        this.preloadInterstitial();
    }

}
