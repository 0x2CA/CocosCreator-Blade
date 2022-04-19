import PlatformBase from "../Bases/PlatformBase";
import HttpHelper from "../Helpers/HttpHelper";
import PromiseHelper from "../Helpers/PromiseHelper";

/**
 * 网页
 */
export default class WebPlatform extends PlatformBase {

    public onInitialize() {
        this.userInfo = {
            avatar: 'https://img.readygo.yunyungquan.com/common/default_avatar.png',
            nickname: '测试用户',
            platform: 'WEB',
            gender: 1,
            device: "PC",
            country: "China",
            province: "GuangDong",
            city: "GuangZhou"
        };
    }

    public getLaunchOptions(): any {
        return HttpHelper.getQueryParams();
    }

    public isSupportRewardVideo() {
        return true;
    }

    public isVideoLoaded() {
        return true;
    }

    public preloadRewardVideo() {
        return Promise.resolve()
    }

    public async playRewardVideo() {
        this.emit(PlatformBase.EventType.OpenVideo)
        await PromiseHelper.wait(3)
        this.emit(PlatformBase.EventType.CloseVideo)
        return true;
    }

    public isSupportBanner() {
        return true;
    }

    public preloadBanner() {
        return Promise.resolve()
    }

    public activeBanner(active: boolean) {
        if (active) {
            this.emit(PlatformBase.EventType.OpenBanner)
        } else {
            this.emit(PlatformBase.EventType.CloseBanner)
        }
        return;
    }

    public isSupportInterstitial() {
        return true;
    }

    public isInterstitialLoaded() {
        return true;
    }

    public preloadInterstitial() {
        return Promise.resolve()
    }

    public showInterstitial() {
        this.emit(PlatformBase.EventType.OpenInterstitial)
        PromiseHelper.wait(3).then(() => {
            this.emit(PlatformBase.EventType.CloseInterstitial)
        })
        return;
    }

    public sendInvite(imageUrl: string, title: string, param: any): Promise<any> {
        this.emit(PlatformBase.EventType.OpenShare)
        return Promise.resolve();
    }
}
