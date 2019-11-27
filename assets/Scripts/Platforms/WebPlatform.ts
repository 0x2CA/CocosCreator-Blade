import IPlatform from "../Interfaces/IPlatform";

export default class WebPlatform extends IPlatform {


    public login(): Promise<any> {
        this.userInfo = {
            avatar: 'https://img.readygo.yunyungquan.com/common/default_avatar.png',
            nickname: '测试用户',
            platform: 'WEB'
        };
        return Promise.resolve();
    }

    public logout(): Promise<any> {
        return Promise.resolve();
    }

    public initialize(): void {
        this.login();
    }

    public lazyInitialize(): void {
    }


}