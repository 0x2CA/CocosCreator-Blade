import SingletonBase from "../Bases/SingletonBase";

/**
 * 全局的声音服务
 *
 * @class AudioService
 */
export default class AudioService extends SingletonBase<AudioService> {

    private static readonly BGM_VOL_KEY = 'bgm_volume';
    private static readonly SFX_VOL_KEY = 'sfx_volume';

    private _audios = new Map<string, cc.AudioClip>();

    // 声音大小
    private _bgmVolume: number = 1.0;
    private _sfxVolume: number = 1.0;

    // 背景播放id
    private _bgmAudioID: number = 0;

    protected onInitialize() {
        this.initVolume();
    }

    protected onDispose() {
    }

    /**
     * 初始化音量
     */
    public initVolume() {
        let archive = blade.platform.getArchive();

        this._bgmVolume = archive.get(AudioService.BGM_VOL_KEY, this._bgmVolume);
        if (isNaN(this._bgmVolume)) {
            this._bgmVolume = 1;
        }

        this._sfxVolume = archive.get(AudioService.SFX_VOL_KEY, this._sfxVolume);
        if (isNaN(this._sfxVolume)) {
            this._sfxVolume = 1;
        }
    }

    public async register(
        name: string,
        audio: cc.AudioClip
    ) {
        if (!this._audios.has(name)) {
            this._audios.set(name, audio);
        }
    }

    public async registerAsync(
        name: string,
        progress: (finish: number, total: number) => void = null
    ) {
        if (!this._audios.has(name)) {
            try {
                let audio = await blade.asset.loadAssetAsync(name, cc.AudioClip, progress);
                this.register(name, audio);
            } catch (error) {
                console.error(`加载声音${name}失败`, error);
                throw error;
            }
        }
    }

    public async registerDirectoryAsync(
        path: string,
        progress: (finish: number, total: number) => void = null
    ) {
        await new Promise<void>((resolve, reject) => {
            cc.resources.loadDir(path, (finish: number, total: number) => {
                if (progress) {
                    progress(finish, total);
                }
            }, (error, assets: cc.AudioClip[]) => {
                if (error) {
                    console.error("预加载声音资源失败", error);
                    reject(error);
                    return;
                }

                for (let index = 0; index < assets.length; index++) {
                    let asset = assets[index];
                    this.register(asset.name, asset);
                }

                resolve();
            });
        });
    }

    public unregister(name: string) {
        if (this._audios.has(name)) {
            this._audios.delete(name);
        }
    }

    /**
     * 播放背景音乐
     * @param name
    */
    public playBGM(name: string) {
        //已经播放了背景音乐
        if (this._bgmAudioID >= 0) {
            cc.audioEngine.stop(this._bgmAudioID);
            this._bgmAudioID = -1;
        }

        if (this._audios.has(name)) {
            const audioId = cc.audioEngine.play(this._audios.get(name), true, this._bgmVolume);
            this._bgmAudioID = audioId;
            return audioId;
        } else {
            console.warn(`播放的声音不存在!:${name}`)
        }
    }

    /**
    * 播放音效
    * @param name
    */
    public playSFX(name: string, loop = false) {
        if (this._sfxVolume > 0) {
            if (this._audios.has(name)) {
                const audioId = cc.audioEngine.play(this._audios.get(name), loop, this._sfxVolume);
                return audioId;
            } else {
                console.error(`播放的声音不存在!:${name}`)
            }
        }
    }

    /**
     * 恢复播放指定声音
     * @param audioId
     */
    public resumeAudio(audioId: number) {
        cc.audioEngine.resume(audioId);
    }

    /**
     * 停止播放指定声音
     * @param audioId
     */
    public stopAudio(audioId: number) {
        cc.audioEngine.stop(audioId);
    }

    /**
    * 获取音效音量
    */
    public getSFXVolume() {
        return this._sfxVolume;
    }

    /**
     * 获取背景音乐音量
     */
    public getBGMVolume() {
        return this._bgmVolume;
    }


    /**
    * 设置音效音量
    * @param vol
    */
    public setSFXVolume(vol: number) {
        if (this._sfxVolume != vol) {
            blade.platform.get().saveArchive(AudioService.SFX_VOL_KEY, vol.toString());
            this._sfxVolume = vol;
        }
    }

    /**
     * 设置背景音乐音量
     * @param vol
     * @param force
     */
    public setBGMVolume(vol: number) {
        if (this._bgmAudioID >= 0) {
            if (vol > 0) {
                cc.audioEngine.resume(this._bgmAudioID);
            }
            else {
                cc.audioEngine.pause(this._bgmAudioID);
            }
        }
        if (this._bgmVolume != vol) {
            blade.platform.get().saveArchive(AudioService.BGM_VOL_KEY, vol.toString());
            this._bgmVolume = vol;
            cc.audioEngine.setVolume(this._bgmAudioID, vol);
        }
    }

    /**
     * 暂停所有播放
    */
    public pauseAll() {
        cc.audioEngine.pauseAll();
    }

    /**
     * 恢复所有播放
     */
    public resumeAll() {
        cc.audioEngine.resumeAll();
    }

    /**
     * 打印信息
     * @param name
     */
    info(name?: string) {
        if (name) {
            if (this._audios.has(name)) {
                console.log(name + ":", this._audios.get(name));
            } else {
                console.log(`没有${name}声音`);
            }
        } else {
            let info = "声音信息:\n"
            if (this._audios.size > 0) {
                this._audios.forEach(
                    (value: cc.AudioClip, key: string, map: Map<string, cc.AudioClip>) => {
                        info += "   " + key + "    ✔" + "\n";
                    }
                );
            } else {
                info += "   没有注册声音";
            }
            console.log(info)
        }
    }
}

