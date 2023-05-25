/*
 * @作者: 0x2CA
 * @创建时间: 2023-02-09
 * @最后编辑时间: 2023-03-16
 * @最后编辑者: 0x2CA
 * @描述:
 */
import PlatformBase from "../Bases/PlatformBase";

/**
 * 网页
 */
export default class WebPlatform extends PlatformBase {

    protected onInitialize() {
        this.userInfo = {
            avatar: '',
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
        return Promise.resolve(true);
    }

    public sendInvite(imageUrl: string, title: string, param: any): Promise<void> {
        console.log("分享模拟", imageUrl, title, param, window.location.origin + window.location.pathname + HttpHelper.formatParams(param, true));
        this.emit(PlatformBase.EventType.OpenShare)
        return Promise.resolve();
    }

    public async pay(refId: string): Promise<void> {
        console.log("充值模拟");
    }

    public copyToClipBoard(string: string): Promise<void> {
        var textArea: any = null;
        textArea = document.getElementById("clipBoard");
        if (textArea === null) {
            textArea = document.createElement("textarea");
            textArea.id = "clipBoard";
            textArea.textContent = string;
            document.body.appendChild(textArea);
        }
        textArea.select();
        try {
            const msg = document.execCommand('copy') ? 'successful' : 'unsuccessful';
            console.log("已经复制到剪贴板");
            document.body.removeChild(textArea);
            return Promise.resolve();
        } catch (err) {
            console.log("复制到剪贴板失败");
            Promise.reject(err);
        }
    }
}

import HttpHelper from "../Helpers/HttpHelper";
import PromiseHelper from "../Helpers/PromiseHelper";

