import PlatformBase from "../Bases/PlatformBase";
import PromiseHelper from "../Helpers/PromiseHelper";
import PlatformConfig from "../../Module/Defines/PlatformConfig";


/**
 * Facebook
 */
export default class FbPlatform extends PlatformBase {
    /**
    * 激励视频实例
    */
    private video: FBInstant.AdInstance = null;

    /**
     * 激励视频预加载状态
     */
    private videoState: PlatformBase.AdState = PlatformBase.AdState.None;

    /**
     * 插页实例
     */
    private interstitial: FBInstant.AdInstance = null;

    /**
    * 插页预加载状态
    */
    private interstitialState: PlatformBase.AdState = PlatformBase.AdState.None;

    public onInitialize() {
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
        return this.videoState == PlatformBase.AdState.Loaded;
    }

    /**
     * 预加载激励视频
     */
    public async preloadRewardVideo(): Promise<any> {
        // 已经加载
        if (this.videoState == PlatformBase.AdState.Loaded) {
            return;
        }

        // 正在加载, 等待加载结束
        if (this.videoState == PlatformBase.AdState.Loading) {
            return await PromiseHelper.waitUntil(() => this.videoState != PlatformBase.AdState.Loading);
        }

        this.videoState = PlatformBase.AdState.Loading;

        try {
            if (this.video == null) {
                // 初次创建会调load方法
                if (this.isSupportRewardVideo()) {
                    this.video = await FBInstant.getRewardedVideoAsync(PlatformConfig.fb.videoId);
                }
                else if (this.isSupportInterstitial()) {
                    this.video = await FBInstant.getInterstitialAdAsync(PlatformConfig.fb.interstitialId);
                }
                else {
                    throw new Error();
                }
            }
            await this.video.loadAsync();
            this.videoState = PlatformBase.AdState.Loaded;
        } catch (error) {
            cc.log(error);
            this.videoState = PlatformBase.AdState.None;
        }
    }

    /**
     * 播放激励视频
     */
    public async playRewardVideo(): Promise<boolean> {

        try {

            // 未广告实例或者未加载完成
            if (this.video == null || this.videoState == PlatformBase.AdState.None) {
                cc.log('未广告实例或者未加载完成');
                throw new Error();
            }

            // 等待加载完成
            let waitCount = 5; // 等待加载计时, 5秒内超时
            const now = Date.now();
            await PromiseHelper.waitUntil(() => {
                waitCount -= (Date.now() - now) / 1000;
                return waitCount <= 0 || this.videoState == PlatformBase.AdState.Loaded;
            });

            await this.video.showAsync();
            return true;
        } catch (error) {
            return false;
        } finally {
            this.videoState = PlatformBase.AdState.None;
            this.video = null;
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
        return this.interstitialState == PlatformBase.AdState.Loaded;
    }

    /**
     * 预加载插页广告
     */
    public async preloadInterstitial(): Promise<any> {
        if (!this.isSupportInterstitial()) {
            return;
        }

        // 已经加载
        if (this.interstitialState == PlatformBase.AdState.Loaded) {
            return;
        }

        // 正在加载, 等待加载结束
        if (this.interstitialState == PlatformBase.AdState.Loading) {
            return await PromiseHelper.waitUntil(() => this.interstitialState != PlatformBase.AdState.Loading);
        }

        this.interstitialState = PlatformBase.AdState.Loading;

        try {
            if (this.interstitial == null) {
                // 初次创建会调load方法
                this.interstitial = await FBInstant.getInterstitialAdAsync(PlatformConfig.fb.interstitialId);
            }
            await this.interstitial.loadAsync();
            this.interstitialState = PlatformBase.AdState.Loaded;
        } catch (error) {
            this.interstitialState = PlatformBase.AdState.None;
            cc.log(error);
        }
    }

    /**
     * 显示插页广告
     */
    public async showInterstitial(): Promise<any> {
        try {
            // 未广告实例或者未加载完成
            if (this.interstitial == null || this.interstitialState == PlatformBase.AdState.None) {
                cc.log('未广告实例或者未加载完成');
                throw new Error();
            }

            // 等待加载完成
            let waitCount = 5; // 等待加载计时, 5秒内超时
            const now = Date.now();
            await PromiseHelper.waitUntil(() => {
                waitCount -= (Date.now() - now) / 1000;
                return waitCount <= 0 || this.interstitialState == PlatformBase.AdState.Loaded;
            });

            await this.interstitial.showAsync();
            return true;
        } catch (error) {
            return false;
        } finally {
            this.interstitialState = PlatformBase.AdState.None;
            this.interstitial = null;
            this.preloadInterstitial();
        }
    }

    /**
    * 发送邀请
    */
    public async sendInvite(imageUrl: string, title: string = 'Do you want to play a game?', param: any): Promise<any> {
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
        let image = await PromiseHelper.loadRemote(url);
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        var img = image.getHtmlElementObj();
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL("image/png");
    }
}
