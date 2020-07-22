import LocalizedItem from "./LocalizedItem";
import LocalizedService from "../../Services/LocalizedService";
import TimerService from "../../Services/TimerService";

const { ccclass, property, executeInEditMode, menu, requireComponent, executionOrder } = cc._decorator;

/**
 * 多语言精灵表单项
 */
@ccclass('SpriteFrameSet')
export class SpriteFrameSet {
    @property({
        serializable: true
    })
    lang: string = '';

    @property({
        type: cc.SpriteFrame,
        serializable: true
    })
    spriteFrame: cc.SpriteFrame = null;
}

/**
 * 多语言精灵
 */
@ccclass
@executeInEditMode
@requireComponent(cc.Label)
@executionOrder(999)
@menu('Localized/LocalizedSprite')
export default class LocalizedSprite extends cc.Component implements LocalizedItem {
    @property({
        type: [SpriteFrameSet]
    })
    spriteFrameSet: SpriteFrameSet[] = [];

    private _sprite: cc.Sprite = null;

    get spriteFrame() {
        if (this._sprite == null) {
            this._sprite = this.getComponent(cc.Sprite);
        }
        return this._sprite ? this._sprite.spriteFrame : null;
    }

    set spriteFrame(frame: cc.SpriteFrame) {
        if (this._sprite == null) {
            this._sprite = this.getComponent(cc.Sprite);
        }

        if (this._sprite) {
            this._sprite.spriteFrame = frame;
        }
    }

    private defaultFrame: cc.SpriteFrame;

    private updateInterval: TimerService.Timer = null;


    onLoad() {
        this.defaultFrame = this.spriteFrame;
        blade.locale.on(LocalizedService.EventType.LanguageChange, this.updateLang, this);

        // 编辑器模式, 执行
        if (CC_EDITOR) {
            this.updateInterval = blade.timer.startTimer(blade.locale.EditorRefreshInterval, this.updateLang.bind(this));
        }
    }

    onDestroy() {
        blade.locale.off(LocalizedService.EventType.LanguageChange, this.updateLang, this);
        if (this.updateInterval) {
            blade.timer.stopTimer(this.updateInterval);
        }
    }

    updateLang() {
        this.spriteFrame = this.getSpriteFrameByLang(blade.locale.getLang());
    }

    private getSpriteFrameByLang(lang): cc.SpriteFrame {
        for (let i = 0; i < this.spriteFrameSet.length; ++i) {
            if (this.spriteFrameSet[i].lang === lang) {
                return this.spriteFrameSet[i].spriteFrame;
            }
        }

        return this.defaultFrame;
    }
}