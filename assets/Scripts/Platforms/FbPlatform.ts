import IPlatform from "../Interfaces/IPlatform";

export default class FbPlatform extends IPlatform {



    public initialize(): void {
        const player = FBInstant.player;
        this.userInfo = {
            avatar: player.getPhoto(),
            nickname: player.getName(),
            platform: FBInstant.getPlatform(),
        };
    }

    public lazyInitialize(): void {
    }



}