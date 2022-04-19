import SingletonBase from "../Bases/SingletonBase";
import AssetService from "./AssetService";
import PlatformService from "./PlatformService";


/**
 * 全局的声音服务
 *
 * @class AudioService
 */
export default class AudioService extends SingletonBase {

    private static readonly BGM_VOL_KEY = 'bgm_volume';
    private static readonly SFX_VOL_KEY = 'sfx_volume';

    private audios = new Map<string, cc.AudioClip>();

    // 声音大小
    private bgmVolume: number = 1.0;
    private sfxVolume: number = 1.0;

    // 背景播放id
    private bgmAudioID: number = 0;

    public onInitialize() {
        this.initVolume();
    }

    public onDispose() {
    }

    /**
     * 初始化音量
     */
    public initVolume() {
        const bgmVol = PlatformService.getInstance().getPlatform().getArchive(AudioService.BGM_VOL_KEY);
        this.bgmVolume = parseFloat(bgmVol);
        if (isNaN(this.bgmVolume)) {
            this.bgmVolume = 1;
        }

        const sfxVol = PlatformService.getInstance().getPlatform().getArchive(AudioService.SFX_VOL_KEY);
        this.sfxVolume = parseFloat(sfxVol);
        if (isNaN(this.sfxVolume)) {
            this.sfxVolume = 1;
        }
    }

    public async register(
        name: string,
        audio?: cc.AudioClip
    ) {
        if (!this.audios.has(name)) {
            if (audio == null) {
                try {
                    audio = await AssetService.getInstance().loadAssetAsync(name, cc.AudioClip) as cc.AudioClip;

                    this.audios.set(name, audio);
                } catch (error) {
                    cc.error(`加载声音${name}失败`, error);
                }
            } else {
                this.audios.set(name, audio);
            }
        }
    }

    public async unregister(name: string) {
        if (this.audios.has(name)) {
            this.audios.delete(name);
        }
    }

    /**
     * 播放背景音乐
     * @param name
    */
    public playBGM(name: string) {
        //已经播放了背景音乐
        if (this.bgmAudioID >= 0) {
            cc.audioEngine.stop(this.bgmAudioID);
            this.bgmAudioID = -1;
        }

        if (this.audios.has(name)) {
            const audioId = cc.audioEngine.play(this.audios.get(name), true, this.bgmVolume);
            this.bgmAudioID = audioId;
            return audioId;
        } else {
            cc.warn(`播放的声音不存在!:${name}`)
        }
    }

    /**
    * 播放音效
    * @param name
    */
    public playSFX(name: string, loop = false) {
        if (this.sfxVolume > 0) {
            if (this.audios.has(name)) {
                const audioId = cc.audioEngine.play(this.audios.get(name), loop, this.sfxVolume);
                return audioId;
            } else {
                cc.error(`播放的声音不存在!:${name}`)
            }
        }
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
        return this.sfxVolume;
    }

    /**
     * 获取背景音乐音量
     */
    public getBGMVolume() {
        return this.bgmVolume;
    }


    /**
    * 设置音效音量
    * @param vol
    */
    public setSFXVolume(vol: number) {
        if (this.sfxVolume != vol) {
            PlatformService.getInstance().getPlatform().saveArchive(AudioService.SFX_VOL_KEY, vol.toString());
            this.sfxVolume = vol;
        }
    }

    /**
     * 设置背景音乐音量
     * @param vol
     * @param force
     */
    public setBGMVolume(vol: number) {
        if (this.bgmAudioID >= 0) {
            if (vol > 0) {
                cc.audioEngine.resume(this.bgmAudioID);
            }
            else {
                cc.audioEngine.pause(this.bgmAudioID);
            }
        }
        if (this.bgmVolume != vol) {
            PlatformService.getInstance().getPlatform().saveArchive(AudioService.BGM_VOL_KEY, vol.toString());
            this.bgmVolume = vol;
            cc.audioEngine.setVolume(this.bgmAudioID, vol);
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
            if (this.audios.has(name)) {
                cc.log(name + ":", this.audios.get(name));
            } else {
                cc.log(`没有${name}声音`);
            }
        } else {
            let info = "声音信息:\n"
            if (this.audios.size > 0) {
                this.audios.forEach(
                    (value: cc.AudioClip, key: string, map: Map<string, cc.AudioClip>) => {
                        info += "   " + key + "    ✔" + "\n";
                    }
                );
            } else {
                info += "   没有注册声音";
            }
            cc.log(info)
        }
    }
}

