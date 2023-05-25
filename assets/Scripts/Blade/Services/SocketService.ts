/*
 * @作者: 0x2CA
 * @创建时间: 2022-09-29
 * @最后编辑时间: 2023-05-11
 * @最后编辑者: 0x2CA
 * @描述:
 */
import GameConfig from "../../Module/Defines/GameConfig";
import { protobuf } from "../../Module/Protobuf/protobuf";
import SingletonBase from "../Bases/SingletonBase";
import SocketBase from "../Libs/Socket/SocketBase";
import SocketIO from "../Libs/Socket/SocketIO";
import SocketWeb from "../Libs/Socket/SocketWeb";

/**
 * Socket助手
 *
 * @class SocketService
 */
class SocketService extends SingletonBase<SocketService> {

    private readonly _sockets: Map<any, SocketBase> = new Map<any, SocketBase>();

    protected onInitialize() {
        let socket = this.get();
    }

    protected onDispose() {
    }

    /**
     * 创建一个Socket对象
     * @param key
     * @param url
     */
    private createSocket(key: any, type: SocketService.SocketType, url?: string) {
        if (this._sockets.has(key)) {
            throw new Error("已经存在对应的Socket")
        } else {
            let socket: SocketBase = null;
            switch (type) {
                case SocketService.SocketType.SokcetIO:
                    socket = new SocketIO(url);
                    break;
                case SocketService.SocketType.WebSocket:
                    socket = new SocketWeb(url);
                    (socket as SocketWeb).setCreateHeartBeateCallBack(() => {
                        let cmdId = protobuf.MessageIds.C2SHeartBeate;
                        let data = protobuf.C2SHeartBeate.create();
                        let message = this.createProtoBufMessage(cmdId, data);
                        if (message != null) {
                            return message.slice().buffer;
                        } else {
                            console.warn("创建心跳消息错误!!");
                            return;
                        }
                    });
                    socket.on(SocketWeb.MessageEventType.ReceiveMessage, (data: ArrayBuffer) => {
                        this.onProtoBufMessage(socket, data)
                    }, this);
                    break;
                default:
                    throw new Error("未知类型 Socket")
            }
            this._sockets.set(key, socket);
            return socket;
        }
    }

    /**
     * 接收
     * @param socket
     * @param data
     */
    private onProtoBufMessage(socket: SocketBase, data: ArrayBuffer) {

        let buffer = new Uint8Array(data);
        let message = protobuf.S2CMessage.decode(buffer);

        if (message.error != null) {
            socket.emit(SocketService.EventType.ErrorCode, message.error)
        }

        if (message.success != null) {
            socket.emit(SocketService.EventType.SuccessCode, message.success)
        }

        if (message.cmdId != null) {
            let messageData = null;
            if (message.data != null) {
                let dataBuffer = new Uint8Array(message.data);
                let messageName = protobuf.MessageIds[message.cmdId];
                try {
                    messageData = protobuf[messageName].decode(dataBuffer);
                } catch (error) {
                    console.warn("sokcet 协议解析错误", message.cmdId, messageName);
                }
            }
            if (GameConfig.isSocketMessageLog) {
                console.log("socket 接收", protobuf.MessageIds[message.cmdId], messageData);
            }
            if (messageData != null) {
                socket.emit(SocketWeb.MessageEventType.DispatchMessage, message.cmdId, messageData, message?.success?.code || 0, message?.error?.code || 0);
            }
        }
    }

    /**
     * 获取指定socket对象
     * @param key
     */
    public getSocket(key: string) {
        if (this._sockets.has(key)) {
            return this._sockets.get(key);
        }
    }

    /**
     * 移除socket对象
     * @param key
     */
    public removeSocket(key: string) {
        if (this._sockets.has(key)) {
            const socket = this._sockets.get(key);
            this._sockets.delete(key);
            if (socket.getStatus() == SocketBase.LinkStatus.SUCCEED) {
                socket.disConnect();
            }
        }
    }

    private createProtoBufMessage(cmdId: number, messageData: any) {
        let message = protobuf.C2SMessage.create();
        message.cmdId = cmdId || 0;
        message.ind = 0;
        message.sign = "";
        message.lid = "";

        let messageName = protobuf.MessageIds[cmdId];
        let data = protobuf[messageName].encode(messageData).finish();

        message.data = data;

        return protobuf.C2SMessage.encode(message).finish();
    }

    public get() {
        let socket = this.getSocket(GameConfig.defaultSocketName);

        if (socket == null) {
            socket = this.createSocket(GameConfig.defaultSocketName, SocketService.SocketType.WebSocket);
        }

        return socket;
    }

    public on(eventName: any, callback: Function, target?: any) {
        let socket = this.getSocket(GameConfig.defaultSocketName);
        if (socket != null) {
            socket.on(eventName, callback, target);
        } else {
            console.warn("socket 不存在!!");
        }
    }

    public off(eventName: any, callback?: Function, target?: any): void {
        let socket = this.getSocket(GameConfig.defaultSocketName);
        if (socket != null) {
            socket.off(eventName, callback, target);
        } else {
            console.warn("socket 不存在!!");
        }
    }

    public once(eventName: any, callback: Function, target?: any): void {
        let socket = this.getSocket(GameConfig.defaultSocketName);
        if (socket != null) {
            socket.once(eventName, callback, target);
        } else {
            console.warn("socket 不存在!!");
        }
    }

    public emit(...args: Array<any>): void {
        let socket = this.getSocket(GameConfig.defaultSocketName);
        if (socket != null) {
            if (socket instanceof SocketWeb) {
                let cmdId = args[0];
                let data = args[1];
                if (typeof cmdId == "number") {
                    let message = this.createProtoBufMessage(cmdId, data);
                    if (message != null) {
                        if (GameConfig.isSocketMessageLog) {
                            console.log("socket 发送", protobuf.MessageIds[cmdId], data);
                        }
                        socket.emit(message.slice().buffer);
                        return;
                    } else {
                        console.warn("创建消息错误!!");
                        return;
                    }
                }
            }
            socket.emit(...args);
        } else {
            console.warn("socket 不存在!!");
        }
    }

    public onByName(socketName: any, eventName: any, callback: Function, target?: any) {
        let socket = this.getSocket(socketName);
        if (socket != null) {
            socket.on(eventName, callback, target);
        } else {
            console.warn("socket 不存在!!");
        }
    }

    public offByName(socketName: any, eventName: any, callback?: Function, target?: any): void {
        let socket = this.getSocket(socketName);
        if (socket != null) {
            socket.off(eventName, callback, target);
        } else {
            console.warn("socket 不存在!!");
        }
    }

    public onceByName(socketName: any, eventName: any, callback: Function, target?: any): void {
        let socket = this.getSocket(socketName);
        if (socket != null) {
            socket.once(eventName, callback, target);
        } else {
            console.warn("socket 不存在!!");
        }
    }

    public emitByName(socketName: any, ...args: Array<any>): void {
        let socket = this.getSocket(socketName);
        if (socket != null) {
            if (socket instanceof SocketWeb) {
                let cmdId = args[0];
                let data = args[1];
                if (typeof cmdId == "number") {
                    let message = this.createProtoBufMessage(cmdId, data);
                    if (message != null) {
                        socket.emit(message.slice().buffer);
                        return;
                    } else {
                        console.warn("创建消息错误!!");
                        return;
                    }
                }
            }
            socket.emit(...args);
        } else {
            console.warn("socket 不存在!!");
        }
    }
}

namespace SocketService {

    export enum SocketType {
        SokcetIO,
        WebSocket
    }

    export const EventType = SocketBase.EventType;

    export const LinkStatus = SocketBase.LinkStatus;
}

export default SocketService;
