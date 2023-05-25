/*
 * @作者: 0x2CA
 * @创建时间: 2023-03-15
 * @最后编辑时间: 2023-03-24
 * @最后编辑者: 0x2CA
 * @描述:
 */
import SocketBase from "./SocketBase";

class EventType {
    /**
     *当socket客户端连接到服务器后触发
     *
     * @static
     * @memberof EventType
     */
    static readonly CONNECT = "connect";
    /**
     *当socket客户端与服务器连接超时后触发
     *
     * @static
     * @memberof EventType
     */
    static readonly CONNECT_TIMEOUT = "connect_timeout";

    /**
     *当socket客户端连接服务器失败时触发
     *
     * @static
     * @memberof EventType
     */
    static readonly CONNECT_ERROR = "connect_error";

    /**
     *当socket客户端错误时触发
     *
     * @static
     * @memberof EventType
     */
    static readonly ERROR = "error";

    /**
     *当socket客户端尝试重新连接到服务器后触发
     *
     * @static
     * @memberof EventType
     */
    static readonly CONNECT_ATTEMPT = "connec_attempt";

    /**
     *当socket客户端重新连接到服务器后触发
     *
     * @static
     * @memberof EventType
     */
    static readonly RECONNECT = "reconnect";

    /**
     *当socket客户端重新连接到服务器中触发
     *
     * @static
     * @memberof EventType
     */
    static readonly RECONNECTING = "reconnecting";

    /**
     *当socket客户端重新连接服务器失败后触发
     *
     * @static
     * @memberof EventType
     */
    static readonly RECONNECT_ERROR = "reconnect_error";

    /**
     *当socket客户端重新连接服务器失败后触发
     *
     * @static
     * @memberof EventType
     */
    static readonly RECONNECT_FAILED = "reconnect_failed";

    /**
     *当socket客户端关闭与服务器的连接后触发
     *
     * @static
     * @memberof EventType
     */
    static readonly DISCONNECT = "disconnect";

    static readonly PING = "ping";

    static readonly PONG = "pong";
}

class SocketIO extends SocketBase {

    //连接对象
    private _socket: SocketIOClient.Socket = null;

    private _event: cc.EventTarget = new cc.EventTarget();

    public connect(url: string) {
        if (url != null) {
            if (this._status == SocketIO.LinkStatus.SUCCEED) {
                if (this._url && url != this._url) {
                    this.disConnect();
                } else {
                    console.warn("Socket 已经处于连接状态");
                    return;
                }
            }

            if (this._status != SocketIO.LinkStatus.EMPTY) {
                this.disConnect();
            }

            this._url = url;

            this._socket = io(url, {
                transports: ["websocket", "polling"],
            });

            this.addDefaultEvent();

            this.bindCallback(this._socket);

            this._status = SocketIO.LinkStatus.OPEN;

            this._socket.connect();
        } else {
            console.warn("Socket 无连接地址");
        }
    }

    public disConnect() {
        if (this._socket) {
            this._url = null;
            try {
                this._socket.close();
            } catch (error) { }
            this.removeDefaultEvent();
            this._socket = null;
            this._status = SocketIO.LinkStatus.EMPTY;
        } else {
            console.warn("Socket 已经断开连接");
        }
    }

    private addDefaultEvent() {
        if (this._socket != null) {
            this.on(EventType.CONNECT, this.onConnect, this);
            this.on(EventType.DISCONNECT, this.onDisConnect, this);
            this.on(EventType.ERROR, this.onError, this);
            this.on(EventType.CONNECT_ERROR, this.onError, this);
            this.on(EventType.RECONNECT_ERROR, this.onError, this);
            this.on(EventType.PING, this.onPing, this);
            this.on(EventType.PONG, this.onPong, this);
        }
    }

    private removeDefaultEvent() {
        if (this._socket != null) {
            this.off(EventType.CONNECT, this.onConnect, this);
            this.off(EventType.DISCONNECT, this.onDisConnect, this);
            this.off(EventType.ERROR, this.onError, this);
            this.off(EventType.CONNECT_ERROR, this.onError, this);
            this.off(EventType.RECONNECT_ERROR, this.onError, this);
            this.off(EventType.PING, this.onPing, this);
            this.off(EventType.PONG, this.onPong, this);
        }
    }

    private onConnect(...args: Array<any>) {
        console.log("Socket 连接成功!");
        this._status = SocketIO.LinkStatus.SUCCEED;
        this._event.emit(SocketIO.EventType.Open, ...args);
    }

    private onDisConnect(...args: Array<any>) {
        console.log("Socket 已断开!");
        this._status = SocketIO.LinkStatus.FAILED;
        this._event.emit(SocketIO.EventType.Close, ...args);
    }

    private onError(...args: Array<any>) {
        console.log("Socket 错误!");
        this._status = SocketIO.LinkStatus.FAILED;
        this._event.emit(SocketIO.EventType.Error, ...args);
    }

    private onPing(...args: Array<any>) {
        // this._event.emit(SocketIO.EventType.Ping, ...args);
    }

    private onPong(...args: Array<any>) {
        // this._event.emit(SocketIO.EventType.Pong, ...args);
    }

    private _bindSets: Set<any> = new Set<string>();

    private bindCallback(socket: SocketIOClient.Socket) {
        for (const eventName of this._bindSets) {
            this._socket.on(eventName, (...args) => {
                this._event.emit(eventName, ...args);
            });
        }
    }

    private addBindCallback(socket: SocketIOClient.Socket, eventName: any) {
        if (this._bindSets.has(eventName) == false) {
            this._socket.on(eventName, (...args) => {
                this._event.emit(eventName, ...args);
            });
        }
    }

    public on(eventName: any, callback: Function, target?: any) {
        this._event.on(eventName, callback, target);

        if (this._status == SocketIO.LinkStatus.SUCCEED) {
            this.addBindCallback(this._socket, eventName);
        } else {
            console.warn("当前Socket没有链接!!");
        }
    }

    public off(eventName: any, callback?: Function, target?: any): void {
        this._event.off(eventName, callback, target);
    }

    public once(eventName: any, callback: Function, target?: any): void {
        this._event.once(eventName, callback as any, target);

        if (this._status == SocketIO.LinkStatus.SUCCEED) {
            this.addBindCallback(this._socket, eventName);
        } else {
            console.warn("当前Socket没有链接!!");
        }
    }

    public emit(...args: Array<any>): void {
        let eventName = args.shift();

        if (this.isDefaultEventType(eventName)) {
            this._event.emit(eventName, ...args);
            return;
        }

        if (this._status == SocketIO.LinkStatus.SUCCEED) {
            try {
                this._socket.emit(eventName, ...args);
            } catch (error) {
                console.log("Socket 错误!");
                this._status = SocketIO.LinkStatus.FAILED;
                this._event.emit(SocketIO.EventType.Error, error);
                throw error;
            }
        } else {
            console.warn("当前Socket没有链接!!");
        }
    }
}

namespace SocketIO {

}

export default SocketIO;