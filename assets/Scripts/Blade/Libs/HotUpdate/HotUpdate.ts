
export default class HotUpdate {

    private _updating = false;

    private _assetsManager: jsb.AssetsManager = null!;
    private _localManifestUrl: string = "";
    private _storagePath: string = "";

    public constructor(localManifestUrl: string) {
        this._localManifestUrl = localManifestUrl;

        this.init();
    }

    private init() {
        if (!jsb) {
            throw new Error("热更新必须在原生环境下执行");
        }

        this._storagePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'remote-asset');

        console.log('本地存储热更新路径 ' + this._storagePath);

        this._assetsManager = new jsb.AssetsManager('', this._storagePath, this.versionCompareHandle.bind(this));

        this._assetsManager.setVerifyCallback(this.verifyHandle.bind(this));
    }

    public dispose() {
        this._assetsManager.setEventCallback(null);
        this._updating = false;
    }

    /**
     * 版本比较
     * @param versionA
     * @param versionB
     * @returns
     */
    private versionCompareHandle(versionA: string, versionB: string) {
        let vA = versionA.split('.');
        let vB = versionB.split('.');
        for (let i = 0; i < vA.length; ++i) {
            let a = parseInt(vA[i]);
            let b = parseInt(vB[i] || '0');
            if (a === b) {
                continue;
            }
            else {
                return a - b;
            }
        }
        if (vB.length > vA.length) {
            return -1;
        } else {
            return 0;
        }
    }

    /**
     * 验证
     * @param path
     * @param asset
     */
    private verifyHandle(path: string, asset: jsb.ManifestAsset) {
        let compressed = asset.compressed;
        let expectedMD5 = asset.md5;
        let relativePath = asset.path;
        let size = asset.size;
        if (compressed) {
            console.log("验证通过: " + relativePath);
            return true;
        } else {
            console.log("验证通过: " + relativePath + " (" + expectedMD5 + ")");
            return true;
        }
    }

    private _checkUpdateCallBack: (status: boolean, size?: number) => void = null;

    /**
     * 检查更新
     * @returns
     */
    public checkUpdate(): Promise<{ status: boolean, size?: number }> {
        if (this._updating) {
            console.log("正在更新中，请稍后。");
            return Promise.resolve({ status: false });
        }

        if (this._assetsManager.getState() === jsb.AssetsManager.State.UNINITED) {
            this._assetsManager.loadLocalManifest(this._localManifestUrl);
        }

        if (!this._assetsManager.getLocalManifest() || !this._assetsManager.getLocalManifest().isLoaded()) {
            console.log("加载本地清单文件失败，跳过热更新。");
            return Promise.resolve({ status: false });
        }

        this._assetsManager.setEventCallback(this.onCheck.bind(this));

        return new Promise((resolve, reject) => {
            this._checkUpdateCallBack = (status, size) => {
                resolve({
                    status,
                    size
                });
            };

            this._updating = true;

            this._assetsManager.checkUpdate();
        });
    }

    /**
     * 检查回调
     * @param event
     * @returns
     */
    private onCheck(event: jsb.EventAssetsManager) {
        console.log('Code: ' + event.getEventCode());
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                console.log("未找到本地清单文件，已跳过热更新。");
                this._checkUpdateCallBack(false);
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                console.log("清单文件下载失败，跳过热更新。");
                this._checkUpdateCallBack(false);
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                console.log("已经与最新的远程版本保持同步。");
                this._checkUpdateCallBack(false);
                break;
            case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                let totalSize = Math.ceil(this._assetsManager.getTotalBytes() / 1024);
                console.log("有新的更新，大小为：" + totalSize + "kb");
                this._checkUpdateCallBack(true, totalSize);
                break;
            default:
                return;
        }

        this._assetsManager.setEventCallback(null);
        this._updating = false;
        this._checkUpdateCallBack = null;
    }

    private _hotUpdateCallBack: (status: boolean, canRetry: boolean) => void = null;
    private _progressCallBack: (finishCount: number, totalCount: number, finishSize: number, totalSize: number) => void = null;

    /**
     * 热更新
     */
    public hotUpdate(progressCallBack: (finishCount: number, totalCount: number, finishSize: number, totalSize: number) => void) {
        if (this._assetsManager && !this._updating) {

            this._assetsManager.setEventCallback(this.onUpdate.bind(this));

            if (this._assetsManager.getState() === jsb.AssetsManager.State.UNINITED) {
                this._assetsManager.loadLocalManifest(this._localManifestUrl);
            }

            return new Promise<{
                status: boolean,
                canRetry: boolean,
            }>((resolve, reject) => {
                this._hotUpdateCallBack = (status, canRetry) => {
                    resolve({
                        status,
                        canRetry,
                    });
                };

                this._progressCallBack = progressCallBack;

                this._updating = true;

                this._assetsManager.update();
            });

        } else {
            return Promise.resolve({
                status: false,
                canRetry: false,
            });
        }
    }

    /**
     * 更新回调
     * @param event
     */
    private onUpdate(event: jsb.EventAssetsManager) {
        let needRestart = false;
        let failed = false;
        let canRetry = false;

        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                console.log("未找到本地清单文件，已跳过热更新。");

                failed = true;

                break;
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                let progress = event.getPercent();
                let fileProgress = event.getPercentByFile();

                let file = event.getDownloadedFiles() + ' / ' + event.getTotalFiles();
                let size = event.getDownloadedBytes() + ' / ' + event.getTotalBytes();

                console.log(file, size);

                this._progressCallBack(event.getDownloadedFiles(), event.getTotalFiles(), event.getDownloadedBytes(), event.getTotalBytes())

                let msg = event.getMessage();
                if (msg) {
                    console.log("更新消息: " + msg);
                }

                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                console.log("清单文件下载失败，跳过热更新。");

                failed = true;

                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                console.log("已经与最新的远程版本保持同步。");

                failed = true;

                break;
            case jsb.EventAssetsManager.UPDATE_FINISHED:
                console.log("更新完成。" + event.getMessage());

                needRestart = true;

                break;
            case jsb.EventAssetsManager.UPDATE_FAILED:
                console.log("更新失败，跳过热更新。" + event.getMessage());
                failed = true;
                canRetry = true;
                break;
            case jsb.EventAssetsManager.ERROR_UPDATING:
                console.log("更新失败，跳过热更新。" + event.getAssetId() + ", " + event.getMessage());
                failed = true;
                canRetry = true;
                break;
            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                console.log("解压失败，跳过热更新。" + event.getMessage());
                failed = true;
                canRetry = true;
                break;
            default:
                break;
        }

        if (failed) {
            this._assetsManager.setEventCallback(null);
            this._updating = false;
            this._progressCallBack = null;
            this._hotUpdateCallBack(false, canRetry);
        }

        if (needRestart) {
            this._assetsManager.setEventCallback(null);
            this._updating = false;

            let searchPaths = jsb.fileUtils.getSearchPaths();
            let newPaths = this._assetsManager.getLocalManifest().getSearchPaths();

            console.log(JSON.stringify(newPaths));
            Array.prototype.unshift.apply(searchPaths, newPaths);

            localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(searchPaths));
            jsb.fileUtils.setSearchPaths(searchPaths);

            this._progressCallBack = null;
            this._hotUpdateCallBack(true, canRetry);
        }
    }

}