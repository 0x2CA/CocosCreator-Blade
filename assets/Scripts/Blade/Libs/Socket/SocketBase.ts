/*
 * @作者: 0x2CA
 * @创建时间: 2023-03-15
 * @最后编辑时间: 2023-03-24
 * @最后编辑者: 0x2CA
 * @描述:
 */
abstract class SocketBase {

    //连接url
    protected _url: string = null;

    //连接状态
    protected _status: SocketBase.LinkStatus = SocketBase.LinkStatus.EMPTY;

    constructor(url?: string) {
        this._status = SocketBase.LinkStatus.EMPTY;

        if (url) {
            this.connect(url);
        }
    }

    public abstract connect(url: string);

    public abstract disConnect();

    /**
     * 获取连接状态
     *
     * @returns
     * @memberof SocketBase
     */
    public getStatus() {
        return this._status;
    }

    protected isDefaultEventType(eventName: any) {
        return SocketBase.EventType[eventName] != null;
    }

    public abstract emit(...args: Array<any>): void;

    public abstract on(eventName: any, callback: Function, target?: any);

    public abstract off(eventName: any, callback?: Function, target?: any): void;

    public abstract once(eventName: any, callback: Function, target?: any): void;

}

namespace SocketBase {
    export enum LinkStatus {
        FAILED,
        SUCCEED,
        OPEN,
        EMPTY,
    }

    export enum EventType {
        Open = "Open",
        // Ping = "Ping",
        // Pong = "Pong",
        Close = "Close",
        Error = "Error",
        SuccessCode = "SuccessCode",
        ErrorCode = "ErrorCode"
    }
}

export default SocketBase;