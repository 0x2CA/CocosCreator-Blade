import PlatformBase from "../Bases/PlatformBase";

/**
 * Facebook
 */
export default class FbPlatform extends PlatformBase {
    /**
    * 激励视频实例
    */
    private _video: FBInstant.AdInstance = null;

    /**
     * 激励视频预加载状态
     */
    private _videoState: PlatformBase.AdState = PlatformBase.AdState.None;

    /**
     * 插页实例
     */
    private _interstitial: FBInstant.AdInstance = null;

    /**
    * 插页预加载状态
    */
    private _interstitialState: PlatformBase.AdState = PlatformBase.AdState.None;

    private _configs: FbConfigBase = null;

    protected onInitialize() {
        this._configs = PlatformConfig[PlatformService.PlatformType.FACEBOOK];

        const player = FBInstant.player;
        this.userInfo = {
            avatar: player.getPhoto(),
            nickname: player.getName(),
            platform: FBInstant.getPlatform(),
        };
    }

    getLaunchOptions() {
        return FBInstant.getEntryPointData() || {};
    }

    public isSupportRewardVideo(): boolean {
        return FBInstant.getSupportedAPIs().indexOf('getRewardedVideoAsync') !== -1
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
        // 已经加载
        if (this._videoState == PlatformBase.AdState.Loaded) {
            return;
        }

        // 正在加载, 等待加载结束
        if (this._videoState == PlatformBase.AdState.Loading) {
            return await PromiseHelper.waitUntil(() => this._videoState != PlatformBase.AdState.Loading);
        }

        this._videoState = PlatformBase.AdState.Loading;

        try {
            if (this._video == null) {
                // 初次创建会调load方法
                if (this.isSupportRewardVideo()) {
                    this._video = await FBInstant.getRewardedVideoAsync(this._configs.videoId);
                }
                else if (this.isSupportInterstitial()) {
                    this._video = await FBInstant.getInterstitialAdAsync(this._configs.interstitialId);
                }
                else {
                    throw new Error();
                }
            }
            await this._video.loadAsync();
            this._videoState = PlatformBase.AdState.Loaded;
        } catch (error) {
            console.log(error);
            this._videoState = PlatformBase.AdState.None;
        }
    }

    /**
     * 播放激励视频
     */
    public async playRewardVideo(): Promise<boolean> {

        try {

            // 未广告实例或者未加载完成
            if (this._video == null || this._videoState == PlatformBase.AdState.None) {
                console.log('未广告实例或者未加载完成');
                throw new Error();
            }

            // 等待加载完成
            let waitCount = 5; // 等待加载计时, 5秒内超时
            const now = Date.now();
            await PromiseHelper.waitUntil(() => {
                waitCount -= (Date.now() - now) / 1000;
                return waitCount <= 0 || this._videoState == PlatformBase.AdState.Loaded;
            });

            await this._video.showAsync();
            return true;
        } catch (error) {
            return false;
        } finally {
            this._videoState = PlatformBase.AdState.None;
            this._video = null;
            this.preloadRewardVideo();
        }
    }

    /**
     * 是否支持插页
     */
    public isSupportInterstitial() {
        return FBInstant.getSupportedAPIs().indexOf('getInterstitialAdAsync') !== -1
    }

    /**
     * 判断插页是否已经加载完成
     */
    public isInterstitialLoaded(): boolean {
        return this._interstitialState == PlatformBase.AdState.Loaded;
    }

    /**
     * 预加载插页广告
     */
    public async preloadInterstitial(): Promise<void> {
        if (!this.isSupportInterstitial()) {
            return;
        }

        // 已经加载
        if (this._interstitialState == PlatformBase.AdState.Loaded) {
            return;
        }

        // 正在加载, 等待加载结束
        if (this._interstitialState == PlatformBase.AdState.Loading) {
            return await PromiseHelper.waitUntil(() => this._interstitialState != PlatformBase.AdState.Loading);
        }

        this._interstitialState = PlatformBase.AdState.Loading;

        try {
            if (this._interstitial == null) {
                // 初次创建会调load方法
                this._interstitial = await FBInstant.getInterstitialAdAsync(this._configs.interstitialId);
            }
            await this._interstitial.loadAsync();
            this._interstitialState = PlatformBase.AdState.Loaded;
        } catch (error) {
            this._interstitialState = PlatformBase.AdState.None;
            console.log(error);
        }
    }

    /**
     * 显示插页广告
     */
    public async showInterstitial(): Promise<boolean> {
        let status = false;

        try {
            // 未广告实例或者未加载完成
            if (this._interstitial == null || this._interstitialState == PlatformBase.AdState.None) {
                console.log('未广告实例或者未加载完成');
                throw new Error();
            }

            // 等待加载完成
            let waitCount = 5; // 等待加载计时, 5秒内超时
            const now = Date.now();
            await PromiseHelper.waitUntil(() => {
                waitCount -= (Date.now() - now) / 1000;
                return waitCount <= 0 || this._interstitialState == PlatformBase.AdState.Loaded;
            });

            await this._interstitial.showAsync();

            status = true;
        } finally {
            this._interstitialState = PlatformBase.AdState.None;
            this._interstitial = null;
            this.preloadInterstitial();
        }

        return Promise.resolve(status);
    }

    /**
    * 发送邀请
    */
    public async sendInvite(imageUrl: string, title: string = 'Do you want to play a game?', param: any): Promise<void> {
        await FBInstant.shareAsync({
            intent: 'INVITE',
            image: await this.getImageBase64(imageUrl),
            text: title,
            data: param
        });
    }

    /**
     * 图片转Base64
     * @param url
     */
    private async getImageBase64(url: string) {
        let image = await blade.asset.loadRemote<cc.Texture2D>(url);
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        let img = image.getHtmlElementObj();
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL("image/png");
    }
}

import PlatformConfig from "../../Module/Defines/PlatformConfig";
import FbConfigBase from "../../Module/Defines/PlatformConfig/Bases/FbConfigBase";
import PromiseHelper from "../Helpers/PromiseHelper";
import PlatformService from "../Services/PlatformService";

