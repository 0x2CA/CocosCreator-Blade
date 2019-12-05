import IPlatform from "../Interfaces/IPlatform";

class WxPlatform extends IPlatform {

    // 启动参数
    private launchOptions: {
        /** 场景值*/
        scene: number;
        /** 启动参数*/
        query: Object;
        /** 启动来源 */
        referrerInfo?: {
            appId?: string;
            extraData?: object;
        };
        /** 当前小游戏是否被显示在聊天顶部*/
        isSticky: boolean;
        /** shareTicket*/
        shareTicket: string;
    } = null;

    // 授权按钮
    private authorizeButton = null;

    public initialize(): void {
        // 获取尝试用户信息
        this.getUserInfoTry()

        wx.onShow((res) => {
            // 更新启动参数
            this.setLaunchOptions(<any>res);
            // 显示事件
            this.emit("onShow", res)
        });
    }

    public lazyInitialize(): void {
    }


    public getArchive(file: string): string {
        return wx.getStorageSync(file) as string;
    }

    public saveArchive(file: string, data: string) {
        wx.setStorageSync(file, data);
    }


    public getLaunchOptions() {
        if (!this.launchOptions) {
            this.launchOptions = wx.getLaunchOptionsSync();
        }
        return this.launchOptions;
    }

    /**
     * 更新启动参数
     * @param value 
     */
    private setLaunchOptions(value: {
        /** 场景值*/
        scene: number;
        /** 启动参数*/
        query: Object;
        /** 启动来源 */
        referrerInfo?: {
            appId?: string;
            extraData?: object;
        };
        /** 当前小游戏是否被显示在聊天顶部*/
        isSticky: boolean;
        /** shareTicket*/
        shareTicket: string;
    }) {
        this.launchOptions = value;
    }

    /**
     * 尝试获取用户信息
     */
    private async getUserInfoTry() {
        if (this.userInfo) {
            return this.userInfo
        }
        try {
            let result = await new Promise((resolve, reject) => {
                wx.getUserInfo({
                    success: (res) => {
                        if (res.rawData) {
                            const info = JSON.parse(res.rawData);
                            const sysInfo = wx.getSystemInfoSync();
                            this.userInfo = {
                                avatar: info.avatarUrl || "",
                                nickname: info.nickName || "",
                                gender: info.gender || 0,
                                province: info.province,
                                city: info.city,
                                country: info.country,
                                platform: sysInfo.platform,
                                device: sysInfo.model,
                            };
                            resolve(this.userInfo);
                        } else {
                            reject(res);
                        }
                    },
                    fail: reject,
                });
            });
            return result;
        } catch (error) {
            console.error(error);
            return null
        }
    }

    /**
    * 用户授权
    * left、top、width、height 为相对界面的比例，0~1
    */
    public authorize(options?: {
        left: number;
        top: number;
        width: number;
        height: number;
        callback?: Function;
        caller?: any;
    }): Promise<any> {
        return new Promise((resolve, reject) => {
            const handleInfo = (res) => {
                if (res.rawData) {
                    const info = JSON.parse(res.rawData);
                    const sysInfo = wx.getSystemInfoSync();
                    this.userInfo = {
                        avatar: info.avatarUrl || "",
                        nickname: info.nickName || "",
                        gender: info.gender || 0,
                        province: info.province,
                        city: info.city,
                        country: info.country,
                        platform: sysInfo.platform,
                        device: sysInfo.model,
                    };
                    if (options && options.callback) {
                        options.callback.call(options.caller);
                    }
                    resolve({
                        encryptedData: res.encryptedData,
                        iv: res.iv,
                    });
                } else {
                    reject();
                }
            };
            wx.getUserInfo({
                success: handleInfo,
                fail: (res: any) => {
                    // 获取配置
                    wx.getSetting({
                        success: (res) => {
                            wx.getSystemInfo({
                                success: (res: SystemInfo) => {
                                    if (options) {
                                        options.height *= res.screenHeight;
                                        options.width *= res.screenWidth;
                                        options.left *= res.screenWidth;
                                        options.top *= res.screenHeight;
                                    } else {
                                        options = {
                                            left: 0,
                                            top: 0,
                                            width: res.screenWidth,
                                            height: res.screenHeight,
                                        };
                                    }
                                    const button = wx.createUserInfoButton({
                                        type: "text",
                                        text: "",
                                        style: {
                                            left: options.left,
                                            top: options.top,
                                            width: options.width,
                                            height: options.height,
                                            backgroundColor: "rgba(252,255,255,0)",
                                            borderColor: "rgba(250,250,250,0)",
                                            borderWidth: 0,
                                            borderRadius: 0,
                                            textAlign: "center",
                                            fontSize: 30,
                                            lineHeight: 32,
                                        },
                                        withCredentials: false,
                                    });
                                    this.authorizeButton = button;
                                    button.onTap((res: any) => {
                                        if (res.rawData) {
                                            button.destroy();
                                            this.authorizeButton = null;
                                            if (options && options.callback) {
                                                options.callback.call(options.caller);
                                            }
                                        }
                                        handleInfo(res);
                                    });
                                },
                                fail: (res) => {
                                    reject();
                                },
                            });
                        },
                    });
                },
            });
        });
    }

    /**
     * 取消授权
     */
    public unauthorize() {
        if (this.authorizeButton) {
            this.authorizeButton.destroy();
            this.authorizeButton = null;
        }
    }

}


namespace WxPlatform {
    export enum EventType {

    }
}

export default WxPlatform;