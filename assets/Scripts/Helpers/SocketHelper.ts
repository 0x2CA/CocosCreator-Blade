import PromiseHelper from "./PromiseHelper";

/**
 * SocketIO助手
 *
 * @class SocketService
 */
class SocketHelper {
    private static readonly list: Map<string, SocketHelper.Socket> = new Map<string, SocketHelper.Socket>();

    /**
     * 创建一个Socket对象
     * @param name 
     * @param url 
     */
    public static createSocket(name: string, url?: string) {
        if (SocketHelper.list.has(name)) {
            throw new Error("已经存在对应的Socket")
        } else {
            const socket = new SocketHelper.Socket(url)
            SocketHelper.list.set(name, socket);
            return socket;
        }
    }

    /**
     * 获取指定socket对象
     * @param name 
     */
    public static getSocket(name: string) {
        if (SocketHelper.list.has(name)) {
            return SocketHelper.list.get(name);
        }
    }

    /**
     * 移除socket对象
     * @param name 
     */
    public static removeSocket(name: string) {
        if (SocketHelper.list.has(name)) {
            const socket = SocketHelper.list.get(name);
            SocketHelper.list.delete(name);
            if (socket.getStatus() == SocketHelper.LinkStatus.SUCCEED) {
                socket.disConnect();
            }
        }
    }

}

namespace SocketHelper {
    export class Socket {
        //连接对象
        private io: SocketIOClient.Socket = null;

        //连接url
        private url: string = null;

        //连接状态
        private status: SocketHelper.LinkStatus = SocketHelper.LinkStatus.EMPTY;

        constructor(url?: string) {
            if (url) {
                this.connect(url);
            }
        }

        /**
         * Socket连接
         * @param url
         */
        connect(url: string) {
            if (url != null) {
                if (this.url && url != this.url) {
                    console.warn("Socket 连接地址改变，请先执行disConnect");
                } else {
                    if (this.status == SocketHelper.LinkStatus.SUCCEED) {
                        console.warn("Socket 已经处于连接状态");
                    } else {
                        if (this.io == null) {
                            this.setStatus(SocketHelper.LinkStatus.EMPTY);
                            this.url = url;
                            this.io = io(url, {
                                transports: ["websocket", "polling"],
                            });
                            this.addDefaultEvent();
                            this.io.connect();
                        } else {
                            this.io.connect();
                        }
                    }
                }
            } else {
                console.warn("Socket 无连接地址");
            }
        }

        /**
         * 断开连接
         *
         * @memberof SocketService
         */
        disConnect() {
            if (this.io) {
                this.url = null;
                if (this.status == SocketHelper.LinkStatus.SUCCEED) {
                    this.io.disconnect();
                }
                this.removeDefaultEvent();
                this.io = null;
                this.setStatus(SocketHelper.LinkStatus.EMPTY);
            } else {
                console.warn("Socket 已经断开连接");
            }
        }

        /**
         * 获取连接状态
         *
         * @returns
         * @memberof SocketService
         */
        getStatus() {
            return this.status;
        }

        /**
         * 设置连接状态
         *
         * @returns
         * @memberof SocketService
         */
        private setStatus(status: SocketHelper.LinkStatus) {
            this.status = status;
        }

        private addDefaultEvent() {
            if (this.io != null) {
                this.on(SocketHelper.EventType.CONNECT, this.onConnect, this);
                this.on(SocketHelper.EventType.DISCONNECT, this.onDisConnect, this);
            }
        }
        private removeDefaultEvent() {
            if (this.io != null) {
                this.off(SocketHelper.EventType.CONNECT, this.onConnect, this);
                this.off(SocketHelper.EventType.DISCONNECT, this.onDisConnect, this);
            }
        }

        private onConnect() {
            console.log("Socket 连接成功!");
            this.setStatus(SocketHelper.LinkStatus.SUCCEED);
        }
        private onDisConnect() {
            console.log("Socket 已断开!");
            this.setStatus(SocketHelper.LinkStatus.FAILED);
        }

        on<T>(event: string, callback: (data: T) => void, caller?: any) {
            if (this.io) {
                this.io.on(event, callback.bind(caller));
            }
        }

        off<T>(event: string, callback: (data: T) => void, caller?: any) {
            if (this.io) {
                this.io.off(event, callback.bind(caller));
            }
        }

        once<T>(event: string, callback: (data: T) => void, caller?: any) {
            if (this.io) {
                this.io.once(event, callback.bind(caller));
            }
        }

        emit(event: string, ...args: Array<any>) {
            if (this.status == SocketHelper.LinkStatus.SUCCEED) {
                this.io.emit(event, args);
            }
        }

        /**
         * 同步的发送方法
         *
         * @template T
         * @param {string} event
         * @param {*} data
         * @returns {Promise<T>}
         * @memberof SocketService
         */
        async emitSync<T>(targetEvent: string, sourceEvent: string, data?: any): Promise<T> {
            this.off(sourceEvent, this.onEmitSync, sourceEvent);
            this.once(sourceEvent, this.onEmitSync, sourceEvent);
            Socket.syncResult.delete(sourceEvent);
            this.emit(targetEvent, data);

            await PromiseHelper.waitUntil(() => {
                return (
                    Socket.syncResult.has(sourceEvent) ||
                    this.status == SocketHelper.LinkStatus.FAILED
                );
            });
            if (this.status == SocketHelper.LinkStatus.SUCCEED) {
                return Socket.syncResult.get(sourceEvent);
            } else {
                throw new Error("连接断开");
            }
        }
        private static syncResult = new Map<string, any>();

        private onEmitSync(data: any) {
            if (typeof data == "string") {
                Socket.syncResult.set(this.toString(), JSON.parse(data));
            } else {
                Socket.syncResult.set(this.toString(), data);
            }
        }
    }

    export class EventType {
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

    export enum LinkStatus {
        FAILED,
        SUCCEED,
        EMPTY,
    }
}

export default SocketHelper;
