import IPlatform from "../Interfaces/IPlatform";
import HttpHelper from "../Helpers/HttpHelper";

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

}