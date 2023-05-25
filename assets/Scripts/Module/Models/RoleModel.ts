
import ModelBase from "../../Blade/Bases/ModelBase";
import Model from "../../Blade/Decorators/Model";
import SocketEvent from "../../Blade/Decorators/SocketEvent";
import GameEvent from "../Defines/GameEvent";
import { protobuf } from "../Protobuf/protobuf";

/*
 * @作者: 0x2CA
 * @创建时间: 2023-03-10
 * @最后编辑时间: 2023-04-07
 * @最后编辑者: 0x2CA
 * @描述:
 */
@Model("RoleModel")
class RoleModel extends ModelBase {
    private _serverId: number = -1;

    private _playerInfo: protobuf.IBaseInfo = null;
    private _extInfo: protobuf.IExtInfo = null;

    public getPlayerInfo() {
        return this._playerInfo;
    }

    public getExtInfo() {
        return this._extInfo;
    }

    public setServerId(serverId: number) {
        this._serverId = serverId;
    }

    public requestGetPlayer() {
        console.log("请求角色");
        let data = protobuf.C2SGetPlayer.create();
        blade.socket.emit(protobuf.MessageIds.C2SGetPlayer, data);
    }

    @SocketEvent(protobuf.MessageIds.S2CGetPlayer)
    private onGetPlayer(data: protobuf.S2CGetPlayer) {
        console.log("服务器角色", data.pid);
        if (data.pid == null || data.pid == "") {
            // 没有角色需要创建
            this.requestRandomName();
        } else {
            blade.notice.emit(GameEvent.GetPlayerSuccess)
        }
    }

    private requestRandomName() {
        console.log("请求角色随机名字");
        let data = protobuf.C2SRandName.create();
        blade.socket.emit(protobuf.MessageIds.C2SRandName, data);
    }

    @SocketEvent(protobuf.MessageIds.S2CRandName)
    private onRandomName(data: protobuf.S2CRandName) {
        let name = data.name || "";
        console.log("随机名称", name);
        this.requestCreatePlayer(name);
    }

    private requestCreatePlayer(name: string = "") {
        console.log("请求创建角色");
        let data = protobuf.C2SCreatePlayer.create();
        data.serverId = this._serverId;
        data.gender = 0;
        data.name = name;
        data.roleBirth = "";
        blade.socket.emit(protobuf.MessageIds.C2SCreatePlayer, data);
    }

    @SocketEvent(protobuf.MessageIds.S2CCreatePlayer)
    private onCreatePlayer(data: protobuf.S2CCreatePlayer) {
        console.log("服务器角色", data.playerId);
        if (data.playerId == null || data.playerId == "") {
            // 没有角色需要创建
            this.requestRandomName();
        } else {
            blade.notice.emit(GameEvent.GetPlayerSuccess)
        }
    }

    @SocketEvent(protobuf.MessageIds.S2CPlayerBaseInfoSync)
    private onPlayerBaseInfoSync(data: protobuf.S2CPlayerBaseInfoSync) {
        let baseInfo = data ? data.baseInfo : null;
        this._playerInfo = baseInfo
        blade.notice.emit(GameEvent.PlayerBaseInfoSync);
        console.log(this._playerInfo);
    }

    @SocketEvent(protobuf.MessageIds.S2CPlayerExtInfoSync)
    private onPlayerExtInfoSync(data: protobuf.S2CPlayerExtInfoSync) {
        let extInfo = data ? data.info : null;
        this._extInfo = extInfo;
        blade.notice.emit(GameEvent.PlayerExtInfoSync);
        console.log(this._extInfo);
    }

}

namespace RoleModel {

}

export default RoleModel;