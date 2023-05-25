/*
 * @作者: 0x2CA
 * @创建时间: 2023-03-15
 * @最后编辑时间: 2023-03-24
 * @最后编辑者: 0x2CA
 * @描述:
 */
import SocketBase from "./SocketBase";

class SocketWeb extends SocketBase {
    //连接对象
    private _socket: WebSocket = null;

    private _event: cc.EventTarget = new cc.EventTarget();

    // 创建心跳回调
    private _createHeartBeateCallBack: Function = null;

    // 检查时间
    private readonly _checkTime: number = 10;
    // 超时时间
    private readonly _timeOut: number = 5;
    // 定时器
    private _timer: any = null;

    /**
     * 设置创建心跳回调
     * @param createHeartBeateCallBack
     */
    public setCreateHeartBeateCallBack(createHeartBeateCallBack: Function) {
        this._createHeartBeateCallBack = createHeartBeateCallBack;
    }

    public connect(url: string) {
        if (url != null) {
            if (this._status == SocketWeb.LinkStatus.SUCCEED) {
                if (this._url && url != this._url) {
                    this.disConnect();
                } else {
                    console.warn("Socket 已经处于连接状态");
                    return;
                }
            }

            if (this._status != SocketWeb.LinkStatus.EMPTY) {
                this.disConnect();
            }

            this._url = url;

            const extname = cc.path.extname('resources/cacert.pem');
            const changeExtname = cc.path.changeExtname('resources/cacert.pem'.substr(10));
            const bundle = cc.AssetManager.BuiltinBundleName.RESOURCES;
            const filePath = (cc.AssetManager.prototype as any)._transform({ path: changeExtname, bundle: bundle, __isNative__: true, ext: extname });

            if (CC_JSB) {
                this._socket = new (WebSocket as any)(this._url, [], filePath);
            } else {
                this._socket = new WebSocket(this._url);
            }

            this.addDefaultEvent();

            this._socket.binaryType = 'arraybuffer';

            this._status = SocketWeb.LinkStatus.OPEN;
        } else {
            console.warn("Socket 无连接地址");
        }
    }

    private addDefaultEvent() {
        if (this._socket != null) {

            this._socket.onopen = (event) => {
                console.log("Socket 连接成功!");
                this._status = SocketWeb.LinkStatus.SUCCEED;
                this.resetCheck();
                this._event.emit(SocketWeb.EventType.Open, event);
            }

            this._socket.onmessage = (event) => {
                let data = event.data;
                // 接收到消息重置心跳检查间隔(有消息说明连通没有必要再检查,一次一个检查周期)
                this.resetCheck();
                this._event.emit(SocketWeb.MessageEventType.ReceiveMessage, data);
            }

            this._socket.onerror = (event) => {
                console.log("Socket 错误!");
                this._status = SocketWeb.LinkStatus.FAILED;
                this._event.emit(SocketWeb.EventType.Error, event);
            };

            this._socket.onclose = (event) => {
                console.log("Socket 已断开!");
                this._status = SocketWeb.LinkStatus.EMPTY;
                this.resetCheck();
                this._event.emit(SocketWeb.EventType.Close, event);
            }

            this._event.on(SocketWeb.MessageEventType.DispatchMessage, this.onMessage, this);
        }
    }

    private removeDefaultEvent() {
        if (this._socket != null) {

            // this._socket.onopen = null;

            // this._socket.onmessage = null;

            // this._socket.onerror = null;

            // this._socket.onclose = null;

            this._event.off(SocketWeb.MessageEventType.DispatchMessage, this.onMessage, this);
        }
    }

    private resetCheck() {
        if (this._timer != null) {
            clearTimeout(this._timer);
            this._timer = null;
        }

        if (this._createHeartBeateCallBack != null) {
            if (this._status == SocketWeb.LinkStatus.SUCCEED) {
                this._timer = setTimeout(() => {
                    console.log("开始心跳检测!!");
                    this._timer = null;
                    // 发送心跳数据给服务器
                    let heartBeate = this._createHeartBeateCallBack();
                    if (heartBeate != null) {
                        // 设置超时答复
                        this._timer = setTimeout(() => {
                            this._timer = null;
                            // 超时答复
                            console.log("Socket 错误!");
                            this._status = SocketWeb.LinkStatus.FAILED;
                            this._event.emit(SocketWeb.EventType.Error, "心跳检测没有反应!!");
                        }, this._timeOut * 1000);
                        this.emit(heartBeate);
                    }
                }, this._checkTime * 1000);
            }
        }
    }

    private onMessage(eventName: string, data: any, ...args: Array<any>) {
        this._event.emit(eventName, data, ...args);
    }

    public disConnect() {
        if (this._socket) {
            this._url = null;
            try {
                this._socket.close();
            } catch (error) { }
            this.removeDefaultEvent();
            this._socket = null;
            this._status = SocketWeb.LinkStatus.EMPTY;
        } else {
            console.warn("Socket 已经断开连接");
        }
    }

    public emit(...args: any[]): void {
        if (args[0] == SocketWeb.MessageEventType.DispatchMessage) {
            args.shift();
            let eventName = args.shift();
            this._event.emit(eventName, ...args);
        } else if (this.isDefaultEventType(args[0])) {
            let eventName = args.shift();
            this._event.emit(eventName, ...args);
        } else {
            if (this._status == SocketWeb.LinkStatus.SUCCEED) {
                try {
                    // 发送给服务器
                    this._socket.send(args[0]);
                } catch (error) {
                    console.log("Socket 错误!");
                    this._status = SocketWeb.LinkStatus.FAILED;
                    this._event.emit(SocketWeb.EventType.Error, error);
                    throw error;
                }
            } else {
                console.warn("当前Socket没有链接!!");
            }
        }
    }

    public on(eventName: any, callback: Function, target?: any) {
        this._event.on(eventName, callback, target);
    }

    public off(eventName: any, callback?: Function, target?: any): void {
        this._event.off(eventName, callback, target);
    }

    public once(eventName: any, callback: Function, target?: any): void {
        this._event.once(eventName, callback as any, target);
    }
}

namespace SocketWeb {
    export enum MessageEventType {
        ReceiveMessage = "ReceiveMessage",
        DispatchMessage = "DispatchMessage"
    }
}

export default SocketWeb;