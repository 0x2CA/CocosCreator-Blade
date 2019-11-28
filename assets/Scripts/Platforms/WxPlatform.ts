import IPlatform from "../Interfaces/IPlatform";

export default class WxPlatform extends IPlatform {


    public login(): Promise<any> {
       
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