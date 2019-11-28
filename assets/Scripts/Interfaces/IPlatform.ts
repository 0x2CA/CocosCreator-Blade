import PlatformService from "../Services/PlatformService";

/**
 * 平台接口类
 */
abstract class IPlatform {
	/**
	 * 用户授权信息
	 */
    protected userInfo: IPlatform.UserInfo = null;

	/**
	 * 平台类型
	 */
    private type: PlatformService.PlatformType;

	/**
	 * 平台初始化操作
	 */
    public abstract initialize(): void;

    /**
     * 平台延迟初始化操作
     */
    public abstract lazyInitialize(): void;

	/**
	 * 调用类内方法, 适合调用平台不通用的方法
	 * @param funcName
	 * @param args
	 */
    public call(funcName: string, ...args: any[]) {
        if (typeof this[funcName] == "function") {
            return this[funcName].call(this, ...args);
        }
        return null;
    }

	/**
	 * 获取本地存档
	 * @param file
	 */
    public getArchive?(file: string): string {
        return cc.sys.localStorage.getItem(file);
    }

	/**
	 * 保存本地存档
	 * @param file
	 * @param data
	 */
    public saveArchive?(file: string, data: string) {
        cc.sys.localStorage.setItem(file, data);
    }

	/**
	 * 检查新版本
	 */
    public checkForUpdate(): Promise<any> {
        return Promise.resolve();
    }


	/**
	 * 判断是否支持激励视频广告
	 */
    public isSupportRewardVideo(): boolean {
        return false;
    }

	/**
	 * 预加载激励视频
	 */
    public preloadRewardVideo(): Promise<any> {
        return Promise.resolve();
    }

	/**
	 * 显示激励视频
	 */
    public playRewardVideo(): Promise<boolean> {
        return Promise.resolve(false);
    }

	/**
	 * 判断视频是否已经加载
	 */
    public isVideoLoaded(): boolean {
        return false;
    }

	/**
	 * 判断是否支持横幅广告
	 */
    public isSupportBanner(): boolean {
        return false;
    }

	/**
	 * 预加载横幅
	 */
    public preloadBanner(): Promise<any> {
        return Promise.resolve();
    }

	/**
	 * 激活 显示/隐藏横幅广告
	 * @param active
	 */
    public activeBanner(name: string, active: boolean) {
        return false;
    }

	/**
	 * 判断是否支持插页广告
	 */
    public isSupportInterstitial(): boolean {
        return false;
    }

	/**
	 * 预加载插页广告
	 */
    public preloadInterstitial(): Promise<any> {
        return Promise.resolve();
    }

	/**
	 * 显示插页广告
	 */
    public showInterstitial(): Promise<any> {
        return Promise.resolve();
    }

	/**
	 * 判插页频是否已经加载
	 */
    public isInterstitialLoaded(): boolean {
        return false;
    }


	/**
	 * 获取用户信息
	 */
    public getUserInfo() {
        return this.userInfo;
    }

	/**
	 * 获取平台
	 */
    public getType() {
        return this.type;
    }

	/**
	 * 获取启动参数
	 */
    public getLaunchOptions(): any {
        return {};
    }

	/**
	 * 发送邀请
	 */
    public sendInvite(param: {} = {}): Promise<any> {
        return Promise.resolve();
    }

	/**
	 * 设备震动
	 * @param short
	 */
    public vibrate(short: boolean = true) { }
}


namespace IPlatform {
    /**
   * 用户数据
   */
    export interface UserInfo {
        /**
         * 用户头像
         */
        avatar?: string;
        /**
         * 用户名称
         */
        nickname?: string;
        /**
         * 用户性别
         */
        gender?: number;
        /**
         * 省
         */
        province?: string;
        /**
         * 市
         */
        city?: string;
        /**
         * 国家
         */
        country?: string;
        /**
         * 平台
         */
        platform?: string;
        /**
         * 设备
         */
        device?: string;
    }
}

export default IPlatform;