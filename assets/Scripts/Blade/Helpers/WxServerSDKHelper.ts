import WxServerSDK from "../Libs/WxServerSDK/WxServerSDK";
import PlatformService from "../Services/PlatformService";
import QQPlatform from "../Platforms/QQPlatform";
import WxPlatform from "../Platforms/WxPlatform";
import IPlatform from "../Interfaces/IPlatform";
import TTPlatform from "../Platforms/TTPlatform";

export default class WxServerSDKHelper {

    static Init() {
        if (blade.platform.getType() == PlatformService.PlatformType.QQ) {
            let qqPlatform = blade.platform.getPlatform() as QQPlatform;
            qqPlatform.on(IPlatform.EventType.OpenShare, WxServerSDKHelper.OpenShare)
            qqPlatform.on(IPlatform.EventType.OnShow, WxServerSDKHelper.OnShow)
        } else if (blade.platform.getType() == PlatformService.PlatformType.WX) {
            let wxPlatform = blade.platform.getPlatform() as WxPlatform;
            wxPlatform.on(IPlatform.EventType.OpenShare, WxServerSDKHelper.OpenShare)
            wxPlatform.on(IPlatform.EventType.OnShow, WxServerSDKHelper.OnShow)
        }
    }

    private static OnShow(res) {
        const { query = {} } = res;
        for (const key in query) {
            query[key] = decodeURIComponent(query[key]);
        }

        if (query["shareOpenId"] && query["shareInfo"] && query["shareTime"]) {
            WxServerSDK.recordShareEntry(
                query["shareOpenId"],
                query["shareTime"],
                JSON.parse(query["shareInfo"])
            );
        }
    }

    private static OpenShare(imageUrl: string, title: string, param: any) {
        WxServerSDK.recordShare(
            WxServerSDK.RecordType.CLICK,
            param.shareTime,
            param.shareInfo
        );
    }

	/**
	 * 更新分享
	 *
	 * @returns
	 * @memberof WXPlatform
	 */
    public static async updateMenuShareInfo(key: string, shareData = {}) {
        let inviteInfo = await WxServerSDK.getShareInfo(key);
        if (inviteInfo) {
            shareData["shareInfo"] = JSON.stringify(inviteInfo);
            shareData["shareOpenId"] = WxServerSDK.getOpenId();

            if (blade.platform.getType() == PlatformService.PlatformType.QQ) {
                let qqPlatform = blade.platform.getPlatform() as QQPlatform;
                qqPlatform.setShareMenuInfo(inviteInfo.design_url, inviteInfo.title, shareData)
            } else if (blade.platform.getType() == PlatformService.PlatformType.WX) {
                let wxPlatform = blade.platform.getPlatform() as WxPlatform;
                wxPlatform.setShareMenuInfo(inviteInfo.design_url, inviteInfo.title, shareData)
            } else if (blade.platform.getType() == PlatformService.PlatformType.BYTEDANCE) {
                let ttPlatform = blade.platform.getPlatform() as TTPlatform;
                ttPlatform.setShareMenuInfoByID("541je52l53422qbib1", inviteInfo.design_url, inviteInfo.title, shareData)
            }
            await WxServerSDK.recordShare(
                WxServerSDK.RecordType.EXPOSUREPLACE,
                blade.timer.getTime(),
                inviteInfo
            );
        }
    }


    public static async sendInvite(key: string, param: any = {}) {
        let inviteInfo = await WxServerSDK.getShareInfo(key);
        if (inviteInfo) {
            await WxServerSDK.recordShare(
                WxServerSDK.RecordType.EXPOSUREPLACE,
                blade.timer.getTime(),
                inviteInfo
            );

            param.shareInfo = JSON.stringify(inviteInfo);
            param.shareOpenId = WxServerSDK.getOpenId();
            param.shareTime = blade.timer.getTime();

            WxServerSDK.recordShare(WxServerSDK.RecordType.CLICK, param.shareTime, param.shareInfo);

            if (blade.platform.getType() == PlatformService.PlatformType.QQ) {
                let qqPlatform = blade.platform.getPlatform() as QQPlatform;
                await qqPlatform.sendInvite(inviteInfo.design_url, inviteInfo.title, param)
            } else if (blade.platform.getType() == PlatformService.PlatformType.WX) {
                let wxPlatform = blade.platform.getPlatform() as WxPlatform;
                await wxPlatform.sendInvite(inviteInfo.design_url, inviteInfo.title, param)
            } else if (blade.platform.getType() == PlatformService.PlatformType.BYTEDANCE) {
                let ttPlatform = blade.platform.getPlatform() as TTPlatform;
                await ttPlatform.sendInviteByID("541je52l53422qbib1", inviteInfo.design_url, inviteInfo.title, param)
            }
            await WxServerSDK.recordShare(
                WxServerSDK.RecordType.EXPOSUREPLACE,
                blade.timer.getTime(),
                inviteInfo
            );
        }
    }

    private static async recordVideo(
        name: string,
        recordType: WxServerSDK.RECORD_VIDEO_TYPE,
        type?: WxServerSDK.VIDEO_TYPE,
        subtime?: number
    ) {
        if (cc.sys.WECHAT_GAME === cc.sys.platform) {
            let info = await WxServerSDK.getVideoInfo(name);
            if (info) {
                WxServerSDK.recordVideo(
                    recordType,
                    info,
                    type,
                    subtime
                );
            }
        }
    }

    static async showVideo(
        name: string
    ) {

        this.recordVideo(name, WxServerSDK.RECORD_VIDEO_TYPE.Click);

        let startTime = blade.timer.getTime();

        if (blade.platform.getPlatform().isVideoLoaded()) {
            try {
                let iscan = await blade.platform.getPlatform().playRewardVideo();
                if (iscan) {
                    this.recordVideo(name,
                        WxServerSDK.RECORD_VIDEO_TYPE.Watch,
                        WxServerSDK.VIDEO_TYPE.Succeed,
                        blade.timer.getTime() - startTime
                    );

                    return true
                } else {
                    this.recordVideo(name,
                        WxServerSDK.RECORD_VIDEO_TYPE.Watch,
                        WxServerSDK.VIDEO_TYPE.Cancel,
                        blade.timer.getTime() - startTime
                    );
                }
            } catch (error) {
                this.recordVideo(name,
                    WxServerSDK.RECORD_VIDEO_TYPE.Watch,
                    WxServerSDK.VIDEO_TYPE.Fail,
                    blade.timer.getTime() - startTime
                );
            }
        } else {
            this.recordVideo(name,
                WxServerSDK.RECORD_VIDEO_TYPE.Watch,
                WxServerSDK.VIDEO_TYPE.Fail,
                blade.timer.getTime() - startTime
            );
        }
        blade.platform.getPlatform().preloadRewardVideo();
    }

    static loadVideo(
        name: string
    ) {
        blade.platform.getPlatform().preloadRewardVideo();
        this.recordVideo(name, WxServerSDK.RECORD_VIDEO_TYPE.Exposure);
    }

}
