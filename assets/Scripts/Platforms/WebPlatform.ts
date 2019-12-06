import IPlatform from "../Interfaces/IPlatform";
import HttpHelper from "../Helpers/HttpHelper";
import PromiseHelper from "../Helpers/PromiseHelper";

/**
 * 网页
 */
export default class WebPlatform extends IPlatform {

    public initialize(): void {
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

    public lazyInitialize(): void {
    }

    public getLaunchOptions(): any {
        return HttpHelper.getQueryParams();
    }

    public isSupportRewardVideo() {
        return true;
    }

    public preloadRewardVideo() {
        return Promise.resolve()
    }

    public async playRewardVideo() {
        this.emit(IPlatform.EventType.OpenVideo)
        await PromiseHelper.wait(3)
        this.emit(IPlatform.EventType.CloseVideo)
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
            this.emit(IPlatform.EventType.OpenBanner)
        } else {
            this.emit(IPlatform.EventType.CloseBanner)
        }
        return;
    }

    public isSupportInterstitial() {
        return true;
    }

    public preloadInterstitial() {
        return Promise.resolve()
    }

    public showInterstitial() {
        this.emit(IPlatform.EventType.OpenInterstitial)
        PromiseHelper.wait(3).then(() => {
            this.emit(IPlatform.EventType.CloseInterstitial)
        })
        return;
    }

    public sendInvite(imageUrl: string, title: string, param: any): Promise<any> {
        this.emit(IPlatform.EventType.OpenShare)
        return Promise.resolve();
    }
}