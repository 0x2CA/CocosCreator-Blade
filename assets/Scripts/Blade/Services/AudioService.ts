import Singleton from "../../Blade/Decorators/Singleton";
import Service from "../../Blade/Decorators/Service";
import IService from "../../Blade/Interfaces/IService";

/**
 * 全局的声音服务
 *
 * @class AudioService
 */
@Singleton
@Service("AudioService")
export default class AudioService implements IService {
    public alias: string;

    public static readonly instance: AudioService

    private static readonly BGM_VOL_KEY = 'bgm_volume';
    private static readonly SFX_VOL_KEY = 'sfx_volume';

    private list = new Map<string, cc.AudioClip>();

    private readonly audioPath = "Audios"

    // 声音大小
    private bgmVolume: number = 1.0;
    private sfxVolume: number = 1.0;

    // 背景播放id
    private bgmAudioID: number = 0;

    public initialize(): void {
        this.loadFolder();
        this.initVolume();
    }

    public lazyInitialize(): void {
    }

    /**
     * 初始化音量
     */
    public initVolume() {
        const bgmVol = blade.platform.getPlatform().getArchive(AudioService.BGM_VOL_KEY);
        this.bgmVolume = parseFloat(bgmVol);
        if (isNaN(this.bgmVolume)) {
            this.bgmVolume = 1;
        }

        const sfxVol = blade.platform.getPlatform().getArchive(AudioService.SFX_VOL_KEY);
        this.sfxVolume = parseFloat(sfxVol);
        if (isNaN(this.sfxVolume)) {
            this.sfxVolume = 1;
        }
    }


    /**
    * 从目录加载声音
    */
    public loadFolder() {
        cc.resources.loadDir(this.audioPath, (err, resource) => {
            for (let index = 0; index < resource.length; index++) {
                const audio = (resource as cc.AudioClip[])[index];
                this.register(audio.name, audio);
            }

            this.info();
        });
    }

    async register(
        name: string,
        audio: cc.AudioClip
    ) {
        if (!this.list.has(name)) {
            this.list.set(name, audio);
        }
    }

    async unregister(name: string) {
        if (this.list.has(name)) {
            this.list.delete(name);
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
        }

        if (this.list.has(name)) {
            const audioId = cc.audioEngine.play(this.list.get(name), true, this.bgmVolume);
            this.bgmAudioID = audioId;
        } else {
            console.error(`播放的声音不存在!:${name}`)
        }
    }

    /**
    * 播放音效
    * @param name
    */
    public playSFX(name: string) {
        if (this.sfxVolume > 0 && this.list.has(name)) {
            const audioId = cc.audioEngine.play(this.list.get(name), false, this.sfxVolume);
        } else {
            console.error(`播放的声音不存在!:${name}`)
        }
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
            blade.platform.getPlatform().saveArchive(AudioService.SFX_VOL_KEY, vol.toString());
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
            blade.platform.getPlatform().saveArchive(AudioService.BGM_VOL_KEY, vol.toString());
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
            if (this.list.has(name)) {
                console.log(name + ":", this.list.get(name));
            } else {
                console.log(`没有${name}声音`);
            }
        } else {
            let info = "声音信息:\n"
            if (this.list.size > 0) {
                this.list.forEach(
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

