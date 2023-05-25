import * as $protobuf from "protobufjs";
/** Namespace protobuf. */
export namespace protobuf {

    /** Properties of a C2SServerTime. */
    interface IC2SServerTime {
    }

    /** 请求服务器时间 */
    class C2SServerTime implements IC2SServerTime {

        /**
         * Constructs a new C2SServerTime.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IC2SServerTime);

        /**
         * Creates a new C2SServerTime instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2SServerTime instance
         */
        public static create(properties?: protobuf.IC2SServerTime): protobuf.C2SServerTime;

        /**
         * Encodes the specified C2SServerTime message. Does not implicitly {@link protobuf.C2SServerTime.verify|verify} messages.
         * @param message C2SServerTime message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IC2SServerTime, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified C2SServerTime message, length delimited. Does not implicitly {@link protobuf.C2SServerTime.verify|verify} messages.
         * @param message C2SServerTime message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IC2SServerTime, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2SServerTime message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2SServerTime
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.C2SServerTime;

        /**
         * Decodes a C2SServerTime message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2SServerTime
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.C2SServerTime;

        /**
         * Verifies a C2SServerTime message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2SServerTime message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2SServerTime
         */
        public static fromObject(object: { [k: string]: any }): protobuf.C2SServerTime;

        /**
         * Creates a plain object from a C2SServerTime message. Also converts values to other types if specified.
         * @param message C2SServerTime
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.C2SServerTime, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2SServerTime to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a S2CServerTime. */
    interface IS2CServerTime {

        /** 服务端器当前时间戳 */
        serverTime?: (number|Long|null);
    }

    /** Represents a S2CServerTime. */
    class S2CServerTime implements IS2CServerTime {

        /**
         * Constructs a new S2CServerTime.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IS2CServerTime);

        /** 服务端器当前时间戳 */
        public serverTime: (number|Long);

        /**
         * Creates a new S2CServerTime instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2CServerTime instance
         */
        public static create(properties?: protobuf.IS2CServerTime): protobuf.S2CServerTime;

        /**
         * Encodes the specified S2CServerTime message. Does not implicitly {@link protobuf.S2CServerTime.verify|verify} messages.
         * @param message S2CServerTime message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IS2CServerTime, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified S2CServerTime message, length delimited. Does not implicitly {@link protobuf.S2CServerTime.verify|verify} messages.
         * @param message S2CServerTime message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IS2CServerTime, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2CServerTime message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns S2CServerTime
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.S2CServerTime;

        /**
         * Decodes a S2CServerTime message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns S2CServerTime
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.S2CServerTime;

        /**
         * Verifies a S2CServerTime message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a S2CServerTime message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns S2CServerTime
         */
        public static fromObject(object: { [k: string]: any }): protobuf.S2CServerTime;

        /**
         * Creates a plain object from a S2CServerTime message. Also converts values to other types if specified.
         * @param message S2CServerTime
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.S2CServerTime, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this S2CServerTime to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2SHeartBeate. */
    interface IC2SHeartBeate {
    }

    /** 心跳 */
    class C2SHeartBeate implements IC2SHeartBeate {

        /**
         * Constructs a new C2SHeartBeate.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IC2SHeartBeate);

        /**
         * Creates a new C2SHeartBeate instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2SHeartBeate instance
         */
        public static create(properties?: protobuf.IC2SHeartBeate): protobuf.C2SHeartBeate;

        /**
         * Encodes the specified C2SHeartBeate message. Does not implicitly {@link protobuf.C2SHeartBeate.verify|verify} messages.
         * @param message C2SHeartBeate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IC2SHeartBeate, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified C2SHeartBeate message, length delimited. Does not implicitly {@link protobuf.C2SHeartBeate.verify|verify} messages.
         * @param message C2SHeartBeate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IC2SHeartBeate, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2SHeartBeate message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2SHeartBeate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.C2SHeartBeate;

        /**
         * Decodes a C2SHeartBeate message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2SHeartBeate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.C2SHeartBeate;

        /**
         * Verifies a C2SHeartBeate message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2SHeartBeate message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2SHeartBeate
         */
        public static fromObject(object: { [k: string]: any }): protobuf.C2SHeartBeate;

        /**
         * Creates a plain object from a C2SHeartBeate message. Also converts values to other types if specified.
         * @param message C2SHeartBeate
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.C2SHeartBeate, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2SHeartBeate to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a S2CHeartBeate. */
    interface IS2CHeartBeate {
    }

    /** Represents a S2CHeartBeate. */
    class S2CHeartBeate implements IS2CHeartBeate {

        /**
         * Constructs a new S2CHeartBeate.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IS2CHeartBeate);

        /**
         * Creates a new S2CHeartBeate instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2CHeartBeate instance
         */
        public static create(properties?: protobuf.IS2CHeartBeate): protobuf.S2CHeartBeate;

        /**
         * Encodes the specified S2CHeartBeate message. Does not implicitly {@link protobuf.S2CHeartBeate.verify|verify} messages.
         * @param message S2CHeartBeate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IS2CHeartBeate, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified S2CHeartBeate message, length delimited. Does not implicitly {@link protobuf.S2CHeartBeate.verify|verify} messages.
         * @param message S2CHeartBeate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IS2CHeartBeate, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2CHeartBeate message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns S2CHeartBeate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.S2CHeartBeate;

        /**
         * Decodes a S2CHeartBeate message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns S2CHeartBeate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.S2CHeartBeate;

        /**
         * Verifies a S2CHeartBeate message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a S2CHeartBeate message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns S2CHeartBeate
         */
        public static fromObject(object: { [k: string]: any }): protobuf.S2CHeartBeate;

        /**
         * Creates a plain object from a S2CHeartBeate message. Also converts values to other types if specified.
         * @param message S2CHeartBeate
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.S2CHeartBeate, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this S2CHeartBeate to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2SAuth. */
    interface IC2SAuth {

        /** C2SAuth identityId */
        identityId?: (string|null);

        /** C2SAuth identityName */
        identityName?: (string|null);

        /** C2SAuth timeStamp */
        timeStamp?: (number|Long|null);

        /** 渠道用户ID */
        userId?: (string|null);

        /** 平台ID */
        platformId?: (number|null);

        /** 渠道ID */
        channelId?: (number|null);
    }

    /** 玩家校验请求 */
    class C2SAuth implements IC2SAuth {

        /**
         * Constructs a new C2SAuth.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IC2SAuth);

        /** C2SAuth identityId. */
        public identityId: string;

        /** C2SAuth identityName. */
        public identityName: string;

        /** C2SAuth timeStamp. */
        public timeStamp: (number|Long);

        /** 渠道用户ID */
        public userId: string;

        /** 平台ID */
        public platformId: number;

        /** 渠道ID */
        public channelId: number;

        /**
         * Creates a new C2SAuth instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2SAuth instance
         */
        public static create(properties?: protobuf.IC2SAuth): protobuf.C2SAuth;

        /**
         * Encodes the specified C2SAuth message. Does not implicitly {@link protobuf.C2SAuth.verify|verify} messages.
         * @param message C2SAuth message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IC2SAuth, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified C2SAuth message, length delimited. Does not implicitly {@link protobuf.C2SAuth.verify|verify} messages.
         * @param message C2SAuth message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IC2SAuth, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2SAuth message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2SAuth
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.C2SAuth;

        /**
         * Decodes a C2SAuth message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2SAuth
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.C2SAuth;

        /**
         * Verifies a C2SAuth message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2SAuth message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2SAuth
         */
        public static fromObject(object: { [k: string]: any }): protobuf.C2SAuth;

        /**
         * Creates a plain object from a C2SAuth message. Also converts values to other types if specified.
         * @param message C2SAuth
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.C2SAuth, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2SAuth to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a S2CAuth. */
    interface IS2CAuth {

        /** 验证结果标识: 0:表示.身份合法.验证成功 1:表示.非法请求.时戳过期 2:表示.非法请求.md5校验失败 3:表示.非法请求.参数错误 */
        state?: (number|null);
    }

    /** Represents a S2CAuth. */
    class S2CAuth implements IS2CAuth {

        /**
         * Constructs a new S2CAuth.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IS2CAuth);

        /** 验证结果标识: 0:表示.身份合法.验证成功 1:表示.非法请求.时戳过期 2:表示.非法请求.md5校验失败 3:表示.非法请求.参数错误 */
        public state: number;

        /**
         * Creates a new S2CAuth instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2CAuth instance
         */
        public static create(properties?: protobuf.IS2CAuth): protobuf.S2CAuth;

        /**
         * Encodes the specified S2CAuth message. Does not implicitly {@link protobuf.S2CAuth.verify|verify} messages.
         * @param message S2CAuth message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IS2CAuth, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified S2CAuth message, length delimited. Does not implicitly {@link protobuf.S2CAuth.verify|verify} messages.
         * @param message S2CAuth message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IS2CAuth, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2CAuth message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns S2CAuth
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.S2CAuth;

        /**
         * Decodes a S2CAuth message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns S2CAuth
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.S2CAuth;

        /**
         * Verifies a S2CAuth message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a S2CAuth message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns S2CAuth
         */
        public static fromObject(object: { [k: string]: any }): protobuf.S2CAuth;

        /**
         * Creates a plain object from a S2CAuth message. Also converts values to other types if specified.
         * @param message S2CAuth
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.S2CAuth, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this S2CAuth to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2SDebug. */
    interface IC2SDebug {

        /** C2SDebug commandStr */
        commandStr?: (string|null);
    }

    /** Represents a C2SDebug. */
    class C2SDebug implements IC2SDebug {

        /**
         * Constructs a new C2SDebug.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IC2SDebug);

        /** C2SDebug commandStr. */
        public commandStr: string;

        /**
         * Creates a new C2SDebug instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2SDebug instance
         */
        public static create(properties?: protobuf.IC2SDebug): protobuf.C2SDebug;

        /**
         * Encodes the specified C2SDebug message. Does not implicitly {@link protobuf.C2SDebug.verify|verify} messages.
         * @param message C2SDebug message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IC2SDebug, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified C2SDebug message, length delimited. Does not implicitly {@link protobuf.C2SDebug.verify|verify} messages.
         * @param message C2SDebug message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IC2SDebug, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2SDebug message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2SDebug
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.C2SDebug;

        /**
         * Decodes a C2SDebug message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2SDebug
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.C2SDebug;

        /**
         * Verifies a C2SDebug message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2SDebug message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2SDebug
         */
        public static fromObject(object: { [k: string]: any }): protobuf.C2SDebug;

        /**
         * Creates a plain object from a C2SDebug message. Also converts values to other types if specified.
         * @param message C2SDebug
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.C2SDebug, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2SDebug to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a S2CDebug. */
    interface IS2CDebug {

        /** S2CDebug result */
        result?: (string|null);
    }

    /** Represents a S2CDebug. */
    class S2CDebug implements IS2CDebug {

        /**
         * Constructs a new S2CDebug.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IS2CDebug);

        /** S2CDebug result. */
        public result: string;

        /**
         * Creates a new S2CDebug instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2CDebug instance
         */
        public static create(properties?: protobuf.IS2CDebug): protobuf.S2CDebug;

        /**
         * Encodes the specified S2CDebug message. Does not implicitly {@link protobuf.S2CDebug.verify|verify} messages.
         * @param message S2CDebug message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IS2CDebug, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified S2CDebug message, length delimited. Does not implicitly {@link protobuf.S2CDebug.verify|verify} messages.
         * @param message S2CDebug message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IS2CDebug, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2CDebug message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns S2CDebug
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.S2CDebug;

        /**
         * Decodes a S2CDebug message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns S2CDebug
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.S2CDebug;

        /**
         * Verifies a S2CDebug message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a S2CDebug message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns S2CDebug
         */
        public static fromObject(object: { [k: string]: any }): protobuf.S2CDebug;

        /**
         * Creates a plain object from a S2CDebug message. Also converts values to other types if specified.
         * @param message S2CDebug
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.S2CDebug, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this S2CDebug to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2SGiftCodeExchange. */
    interface IC2SGiftCodeExchange {

        /** 礼包码 */
        code?: (string|null);
    }

    /** 兑换码 */
    class C2SGiftCodeExchange implements IC2SGiftCodeExchange {

        /**
         * Constructs a new C2SGiftCodeExchange.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IC2SGiftCodeExchange);

        /** 礼包码 */
        public code: string;

        /**
         * Creates a new C2SGiftCodeExchange instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2SGiftCodeExchange instance
         */
        public static create(properties?: protobuf.IC2SGiftCodeExchange): protobuf.C2SGiftCodeExchange;

        /**
         * Encodes the specified C2SGiftCodeExchange message. Does not implicitly {@link protobuf.C2SGiftCodeExchange.verify|verify} messages.
         * @param message C2SGiftCodeExchange message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IC2SGiftCodeExchange, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified C2SGiftCodeExchange message, length delimited. Does not implicitly {@link protobuf.C2SGiftCodeExchange.verify|verify} messages.
         * @param message C2SGiftCodeExchange message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IC2SGiftCodeExchange, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2SGiftCodeExchange message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2SGiftCodeExchange
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.C2SGiftCodeExchange;

        /**
         * Decodes a C2SGiftCodeExchange message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2SGiftCodeExchange
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.C2SGiftCodeExchange;

        /**
         * Verifies a C2SGiftCodeExchange message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2SGiftCodeExchange message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2SGiftCodeExchange
         */
        public static fromObject(object: { [k: string]: any }): protobuf.C2SGiftCodeExchange;

        /**
         * Creates a plain object from a C2SGiftCodeExchange message. Also converts values to other types if specified.
         * @param message C2SGiftCodeExchange
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.C2SGiftCodeExchange, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2SGiftCodeExchange to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a S2CGiftCodeExchange. */
    interface IS2CGiftCodeExchange {

        /** 成功码 */
        code?: (number|null);

        /** 奖励 */
        reward?: (string|null);
    }

    /** Represents a S2CGiftCodeExchange. */
    class S2CGiftCodeExchange implements IS2CGiftCodeExchange {

        /**
         * Constructs a new S2CGiftCodeExchange.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IS2CGiftCodeExchange);

        /** 成功码 */
        public code: number;

        /** 奖励 */
        public reward: string;

        /**
         * Creates a new S2CGiftCodeExchange instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2CGiftCodeExchange instance
         */
        public static create(properties?: protobuf.IS2CGiftCodeExchange): protobuf.S2CGiftCodeExchange;

        /**
         * Encodes the specified S2CGiftCodeExchange message. Does not implicitly {@link protobuf.S2CGiftCodeExchange.verify|verify} messages.
         * @param message S2CGiftCodeExchange message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IS2CGiftCodeExchange, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified S2CGiftCodeExchange message, length delimited. Does not implicitly {@link protobuf.S2CGiftCodeExchange.verify|verify} messages.
         * @param message S2CGiftCodeExchange message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IS2CGiftCodeExchange, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2CGiftCodeExchange message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns S2CGiftCodeExchange
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.S2CGiftCodeExchange;

        /**
         * Decodes a S2CGiftCodeExchange message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns S2CGiftCodeExchange
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.S2CGiftCodeExchange;

        /**
         * Verifies a S2CGiftCodeExchange message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a S2CGiftCodeExchange message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns S2CGiftCodeExchange
         */
        public static fromObject(object: { [k: string]: any }): protobuf.S2CGiftCodeExchange;

        /**
         * Creates a plain object from a S2CGiftCodeExchange message. Also converts values to other types if specified.
         * @param message S2CGiftCodeExchange
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.S2CGiftCodeExchange, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this S2CGiftCodeExchange to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an Item. */
    interface IItem {

        /** 道具refId */
        refId?: (string|null);

        /** 道具数量 */
        num?: (number|null);
    }

    /** 道具基本信息 */
    class Item implements IItem {

        /**
         * Constructs a new Item.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IItem);

        /** 道具refId */
        public refId: string;

        /** 道具数量 */
        public num: number;

        /**
         * Creates a new Item instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Item instance
         */
        public static create(properties?: protobuf.IItem): protobuf.Item;

        /**
         * Encodes the specified Item message. Does not implicitly {@link protobuf.Item.verify|verify} messages.
         * @param message Item message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Item message, length delimited. Does not implicitly {@link protobuf.Item.verify|verify} messages.
         * @param message Item message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Item message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Item
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.Item;

        /**
         * Decodes an Item message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Item
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.Item;

        /**
         * Verifies an Item message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Item message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Item
         */
        public static fromObject(object: { [k: string]: any }): protobuf.Item;

        /**
         * Creates a plain object from an Item message. Also converts values to other types if specified.
         * @param message Item
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.Item, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Item to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2SItemBagSync. */
    interface IC2SItemBagSync {
    }

    /** 请求背包数据 */
    class C2SItemBagSync implements IC2SItemBagSync {

        /**
         * Constructs a new C2SItemBagSync.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IC2SItemBagSync);

        /**
         * Creates a new C2SItemBagSync instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2SItemBagSync instance
         */
        public static create(properties?: protobuf.IC2SItemBagSync): protobuf.C2SItemBagSync;

        /**
         * Encodes the specified C2SItemBagSync message. Does not implicitly {@link protobuf.C2SItemBagSync.verify|verify} messages.
         * @param message C2SItemBagSync message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IC2SItemBagSync, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified C2SItemBagSync message, length delimited. Does not implicitly {@link protobuf.C2SItemBagSync.verify|verify} messages.
         * @param message C2SItemBagSync message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IC2SItemBagSync, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2SItemBagSync message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2SItemBagSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.C2SItemBagSync;

        /**
         * Decodes a C2SItemBagSync message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2SItemBagSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.C2SItemBagSync;

        /**
         * Verifies a C2SItemBagSync message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2SItemBagSync message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2SItemBagSync
         */
        public static fromObject(object: { [k: string]: any }): protobuf.C2SItemBagSync;

        /**
         * Creates a plain object from a C2SItemBagSync message. Also converts values to other types if specified.
         * @param message C2SItemBagSync
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.C2SItemBagSync, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2SItemBagSync to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a S2CItemBagSync. */
    interface IS2CItemBagSync {

        /** 同步类型 0-全部  1-增加 2-修改 3-删除 */
        syncType?: (number|null);

        /** 玩家信息 * */
        items?: (protobuf.IItem[]|null);
    }

    /** 同步背包数据 * */
    class S2CItemBagSync implements IS2CItemBagSync {

        /**
         * Constructs a new S2CItemBagSync.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IS2CItemBagSync);

        /** 同步类型 0-全部  1-增加 2-修改 3-删除 */
        public syncType: number;

        /** 玩家信息 * */
        public items: protobuf.IItem[];

        /**
         * Creates a new S2CItemBagSync instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2CItemBagSync instance
         */
        public static create(properties?: protobuf.IS2CItemBagSync): protobuf.S2CItemBagSync;

        /**
         * Encodes the specified S2CItemBagSync message. Does not implicitly {@link protobuf.S2CItemBagSync.verify|verify} messages.
         * @param message S2CItemBagSync message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IS2CItemBagSync, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified S2CItemBagSync message, length delimited. Does not implicitly {@link protobuf.S2CItemBagSync.verify|verify} messages.
         * @param message S2CItemBagSync message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IS2CItemBagSync, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2CItemBagSync message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns S2CItemBagSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.S2CItemBagSync;

        /**
         * Decodes a S2CItemBagSync message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns S2CItemBagSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.S2CItemBagSync;

        /**
         * Verifies a S2CItemBagSync message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a S2CItemBagSync message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns S2CItemBagSync
         */
        public static fromObject(object: { [k: string]: any }): protobuf.S2CItemBagSync;

        /**
         * Creates a plain object from a S2CItemBagSync message. Also converts values to other types if specified.
         * @param message S2CItemBagSync
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.S2CItemBagSync, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this S2CItemBagSync to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2SGetPlayer. */
    interface IC2SGetPlayer {
    }

    /** 获取玩家 * */
    class C2SGetPlayer implements IC2SGetPlayer {

        /**
         * Constructs a new C2SGetPlayer.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IC2SGetPlayer);

        /**
         * Creates a new C2SGetPlayer instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2SGetPlayer instance
         */
        public static create(properties?: protobuf.IC2SGetPlayer): protobuf.C2SGetPlayer;

        /**
         * Encodes the specified C2SGetPlayer message. Does not implicitly {@link protobuf.C2SGetPlayer.verify|verify} messages.
         * @param message C2SGetPlayer message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IC2SGetPlayer, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified C2SGetPlayer message, length delimited. Does not implicitly {@link protobuf.C2SGetPlayer.verify|verify} messages.
         * @param message C2SGetPlayer message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IC2SGetPlayer, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2SGetPlayer message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2SGetPlayer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.C2SGetPlayer;

        /**
         * Decodes a C2SGetPlayer message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2SGetPlayer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.C2SGetPlayer;

        /**
         * Verifies a C2SGetPlayer message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2SGetPlayer message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2SGetPlayer
         */
        public static fromObject(object: { [k: string]: any }): protobuf.C2SGetPlayer;

        /**
         * Creates a plain object from a C2SGetPlayer message. Also converts values to other types if specified.
         * @param message C2SGetPlayer
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.C2SGetPlayer, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2SGetPlayer to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a S2CGetPlayer. */
    interface IS2CGetPlayer {

        /** 玩家ID ,不存在为空串 */
        pid?: (string|null);
    }

    /** Represents a S2CGetPlayer. */
    class S2CGetPlayer implements IS2CGetPlayer {

        /**
         * Constructs a new S2CGetPlayer.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IS2CGetPlayer);

        /** 玩家ID ,不存在为空串 */
        public pid: string;

        /**
         * Creates a new S2CGetPlayer instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2CGetPlayer instance
         */
        public static create(properties?: protobuf.IS2CGetPlayer): protobuf.S2CGetPlayer;

        /**
         * Encodes the specified S2CGetPlayer message. Does not implicitly {@link protobuf.S2CGetPlayer.verify|verify} messages.
         * @param message S2CGetPlayer message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IS2CGetPlayer, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified S2CGetPlayer message, length delimited. Does not implicitly {@link protobuf.S2CGetPlayer.verify|verify} messages.
         * @param message S2CGetPlayer message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IS2CGetPlayer, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2CGetPlayer message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns S2CGetPlayer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.S2CGetPlayer;

        /**
         * Decodes a S2CGetPlayer message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns S2CGetPlayer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.S2CGetPlayer;

        /**
         * Verifies a S2CGetPlayer message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a S2CGetPlayer message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns S2CGetPlayer
         */
        public static fromObject(object: { [k: string]: any }): protobuf.S2CGetPlayer;

        /**
         * Creates a plain object from a S2CGetPlayer message. Also converts values to other types if specified.
         * @param message S2CGetPlayer
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.S2CGetPlayer, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this S2CGetPlayer to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2SRandName. */
    interface IC2SRandName {

        /** 性别：0-男，1-女 */
        gender?: (number|null);
    }

    /** 请求随机名字 * */
    class C2SRandName implements IC2SRandName {

        /**
         * Constructs a new C2SRandName.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IC2SRandName);

        /** 性别：0-男，1-女 */
        public gender: number;

        /**
         * Creates a new C2SRandName instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2SRandName instance
         */
        public static create(properties?: protobuf.IC2SRandName): protobuf.C2SRandName;

        /**
         * Encodes the specified C2SRandName message. Does not implicitly {@link protobuf.C2SRandName.verify|verify} messages.
         * @param message C2SRandName message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IC2SRandName, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified C2SRandName message, length delimited. Does not implicitly {@link protobuf.C2SRandName.verify|verify} messages.
         * @param message C2SRandName message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IC2SRandName, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2SRandName message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2SRandName
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.C2SRandName;

        /**
         * Decodes a C2SRandName message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2SRandName
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.C2SRandName;

        /**
         * Verifies a C2SRandName message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2SRandName message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2SRandName
         */
        public static fromObject(object: { [k: string]: any }): protobuf.C2SRandName;

        /**
         * Creates a plain object from a C2SRandName message. Also converts values to other types if specified.
         * @param message C2SRandName
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.C2SRandName, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2SRandName to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a S2CRandName. */
    interface IS2CRandName {

        /** S2CRandName name */
        name?: (string|null);
    }

    /** Represents a S2CRandName. */
    class S2CRandName implements IS2CRandName {

        /**
         * Constructs a new S2CRandName.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IS2CRandName);

        /** S2CRandName name. */
        public name: string;

        /**
         * Creates a new S2CRandName instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2CRandName instance
         */
        public static create(properties?: protobuf.IS2CRandName): protobuf.S2CRandName;

        /**
         * Encodes the specified S2CRandName message. Does not implicitly {@link protobuf.S2CRandName.verify|verify} messages.
         * @param message S2CRandName message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IS2CRandName, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified S2CRandName message, length delimited. Does not implicitly {@link protobuf.S2CRandName.verify|verify} messages.
         * @param message S2CRandName message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IS2CRandName, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2CRandName message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns S2CRandName
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.S2CRandName;

        /**
         * Decodes a S2CRandName message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns S2CRandName
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.S2CRandName;

        /**
         * Verifies a S2CRandName message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a S2CRandName message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns S2CRandName
         */
        public static fromObject(object: { [k: string]: any }): protobuf.S2CRandName;

        /**
         * Creates a plain object from a S2CRandName message. Also converts values to other types if specified.
         * @param message S2CRandName
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.S2CRandName, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this S2CRandName to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2SCreatePlayer. */
    interface IC2SCreatePlayer {

        /** 服务器ID */
        serverId?: (number|null);

        /** 性别：0-男，1-女 */
        gender?: (number|null);

        /** 名字 */
        name?: (string|null);

        /** 出身 */
        roleBirth?: (string|null);

        /** 邀请者ID(可为空) */
        invitedId?: (string|null);
    }

    /** 创建角色 * */
    class C2SCreatePlayer implements IC2SCreatePlayer {

        /**
         * Constructs a new C2SCreatePlayer.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IC2SCreatePlayer);

        /** 服务器ID */
        public serverId: number;

        /** 性别：0-男，1-女 */
        public gender: number;

        /** 名字 */
        public name: string;

        /** 出身 */
        public roleBirth: string;

        /** 邀请者ID(可为空) */
        public invitedId: string;

        /**
         * Creates a new C2SCreatePlayer instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2SCreatePlayer instance
         */
        public static create(properties?: protobuf.IC2SCreatePlayer): protobuf.C2SCreatePlayer;

        /**
         * Encodes the specified C2SCreatePlayer message. Does not implicitly {@link protobuf.C2SCreatePlayer.verify|verify} messages.
         * @param message C2SCreatePlayer message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IC2SCreatePlayer, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified C2SCreatePlayer message, length delimited. Does not implicitly {@link protobuf.C2SCreatePlayer.verify|verify} messages.
         * @param message C2SCreatePlayer message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IC2SCreatePlayer, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2SCreatePlayer message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2SCreatePlayer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.C2SCreatePlayer;

        /**
         * Decodes a C2SCreatePlayer message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2SCreatePlayer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.C2SCreatePlayer;

        /**
         * Verifies a C2SCreatePlayer message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2SCreatePlayer message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2SCreatePlayer
         */
        public static fromObject(object: { [k: string]: any }): protobuf.C2SCreatePlayer;

        /**
         * Creates a plain object from a C2SCreatePlayer message. Also converts values to other types if specified.
         * @param message C2SCreatePlayer
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.C2SCreatePlayer, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2SCreatePlayer to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a S2CCreatePlayer. */
    interface IS2CCreatePlayer {

        /** 玩家ID */
        playerId?: (string|null);
    }

    /** Represents a S2CCreatePlayer. */
    class S2CCreatePlayer implements IS2CCreatePlayer {

        /**
         * Constructs a new S2CCreatePlayer.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IS2CCreatePlayer);

        /** 玩家ID */
        public playerId: string;

        /**
         * Creates a new S2CCreatePlayer instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2CCreatePlayer instance
         */
        public static create(properties?: protobuf.IS2CCreatePlayer): protobuf.S2CCreatePlayer;

        /**
         * Encodes the specified S2CCreatePlayer message. Does not implicitly {@link protobuf.S2CCreatePlayer.verify|verify} messages.
         * @param message S2CCreatePlayer message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IS2CCreatePlayer, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified S2CCreatePlayer message, length delimited. Does not implicitly {@link protobuf.S2CCreatePlayer.verify|verify} messages.
         * @param message S2CCreatePlayer message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IS2CCreatePlayer, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2CCreatePlayer message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns S2CCreatePlayer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.S2CCreatePlayer;

        /**
         * Decodes a S2CCreatePlayer message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns S2CCreatePlayer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.S2CCreatePlayer;

        /**
         * Verifies a S2CCreatePlayer message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a S2CCreatePlayer message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns S2CCreatePlayer
         */
        public static fromObject(object: { [k: string]: any }): protobuf.S2CCreatePlayer;

        /**
         * Creates a plain object from a S2CCreatePlayer message. Also converts values to other types if specified.
         * @param message S2CCreatePlayer
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.S2CCreatePlayer, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this S2CCreatePlayer to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2SLogin. */
    interface IC2SLogin {
    }

    /** 登录 * */
    class C2SLogin implements IC2SLogin {

        /**
         * Constructs a new C2SLogin.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IC2SLogin);

        /**
         * Creates a new C2SLogin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2SLogin instance
         */
        public static create(properties?: protobuf.IC2SLogin): protobuf.C2SLogin;

        /**
         * Encodes the specified C2SLogin message. Does not implicitly {@link protobuf.C2SLogin.verify|verify} messages.
         * @param message C2SLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IC2SLogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified C2SLogin message, length delimited. Does not implicitly {@link protobuf.C2SLogin.verify|verify} messages.
         * @param message C2SLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IC2SLogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2SLogin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2SLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.C2SLogin;

        /**
         * Decodes a C2SLogin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2SLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.C2SLogin;

        /**
         * Verifies a C2SLogin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2SLogin message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2SLogin
         */
        public static fromObject(object: { [k: string]: any }): protobuf.C2SLogin;

        /**
         * Creates a plain object from a C2SLogin message. Also converts values to other types if specified.
         * @param message C2SLogin
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.C2SLogin, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2SLogin to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a S2CLogin. */
    interface IS2CLogin {
    }

    /** Represents a S2CLogin. */
    class S2CLogin implements IS2CLogin {

        /**
         * Constructs a new S2CLogin.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IS2CLogin);

        /**
         * Creates a new S2CLogin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2CLogin instance
         */
        public static create(properties?: protobuf.IS2CLogin): protobuf.S2CLogin;

        /**
         * Encodes the specified S2CLogin message. Does not implicitly {@link protobuf.S2CLogin.verify|verify} messages.
         * @param message S2CLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IS2CLogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified S2CLogin message, length delimited. Does not implicitly {@link protobuf.S2CLogin.verify|verify} messages.
         * @param message S2CLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IS2CLogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2CLogin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns S2CLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.S2CLogin;

        /**
         * Decodes a S2CLogin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns S2CLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.S2CLogin;

        /**
         * Verifies a S2CLogin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a S2CLogin message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns S2CLogin
         */
        public static fromObject(object: { [k: string]: any }): protobuf.S2CLogin;

        /**
         * Creates a plain object from a S2CLogin message. Also converts values to other types if specified.
         * @param message S2CLogin
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.S2CLogin, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this S2CLogin to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2SLoginSuccess. */
    interface IC2SLoginSuccess {
    }

    /** 登录成功 * */
    class C2SLoginSuccess implements IC2SLoginSuccess {

        /**
         * Constructs a new C2SLoginSuccess.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IC2SLoginSuccess);

        /**
         * Creates a new C2SLoginSuccess instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2SLoginSuccess instance
         */
        public static create(properties?: protobuf.IC2SLoginSuccess): protobuf.C2SLoginSuccess;

        /**
         * Encodes the specified C2SLoginSuccess message. Does not implicitly {@link protobuf.C2SLoginSuccess.verify|verify} messages.
         * @param message C2SLoginSuccess message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IC2SLoginSuccess, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified C2SLoginSuccess message, length delimited. Does not implicitly {@link protobuf.C2SLoginSuccess.verify|verify} messages.
         * @param message C2SLoginSuccess message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IC2SLoginSuccess, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2SLoginSuccess message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2SLoginSuccess
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.C2SLoginSuccess;

        /**
         * Decodes a C2SLoginSuccess message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2SLoginSuccess
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.C2SLoginSuccess;

        /**
         * Verifies a C2SLoginSuccess message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2SLoginSuccess message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2SLoginSuccess
         */
        public static fromObject(object: { [k: string]: any }): protobuf.C2SLoginSuccess;

        /**
         * Creates a plain object from a C2SLoginSuccess message. Also converts values to other types if specified.
         * @param message C2SLoginSuccess
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.C2SLoginSuccess, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2SLoginSuccess to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a S2CLoginSuccess. */
    interface IS2CLoginSuccess {
    }

    /** Represents a S2CLoginSuccess. */
    class S2CLoginSuccess implements IS2CLoginSuccess {

        /**
         * Constructs a new S2CLoginSuccess.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IS2CLoginSuccess);

        /**
         * Creates a new S2CLoginSuccess instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2CLoginSuccess instance
         */
        public static create(properties?: protobuf.IS2CLoginSuccess): protobuf.S2CLoginSuccess;

        /**
         * Encodes the specified S2CLoginSuccess message. Does not implicitly {@link protobuf.S2CLoginSuccess.verify|verify} messages.
         * @param message S2CLoginSuccess message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IS2CLoginSuccess, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified S2CLoginSuccess message, length delimited. Does not implicitly {@link protobuf.S2CLoginSuccess.verify|verify} messages.
         * @param message S2CLoginSuccess message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IS2CLoginSuccess, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2CLoginSuccess message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns S2CLoginSuccess
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.S2CLoginSuccess;

        /**
         * Decodes a S2CLoginSuccess message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns S2CLoginSuccess
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.S2CLoginSuccess;

        /**
         * Verifies a S2CLoginSuccess message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a S2CLoginSuccess message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns S2CLoginSuccess
         */
        public static fromObject(object: { [k: string]: any }): protobuf.S2CLoginSuccess;

        /**
         * Creates a plain object from a S2CLoginSuccess message. Also converts values to other types if specified.
         * @param message S2CLoginSuccess
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.S2CLoginSuccess, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this S2CLoginSuccess to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Mail. */
    interface IMail {

        /** 邮件流水ID */
        id?: (string|null);

        /** 邮件标题 */
        title?: (string|null);

        /** 邮件内容 */
        content?: (string|null);

        /** 发送者ID */
        senderId?: (string|null);

        /** 接受者ID */
        recevierId?: (string|null);

        /** 发送时间戳 */
        sendTime?: (string|null);

        /** 奖励领取状态(0-不可领取, 1-可领取，2-已领取) */
        receiveStatus?: (number|null);

        /** 邮件ID(0-未读,1-已读) */
        read?: (number|null);

        /** 附件 */
        attachment?: (string|null);
    }

    /** 邮件信息 */
    class Mail implements IMail {

        /**
         * Constructs a new Mail.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IMail);

        /** 邮件流水ID */
        public id: string;

        /** 邮件标题 */
        public title: string;

        /** 邮件内容 */
        public content: string;

        /** 发送者ID */
        public senderId: string;

        /** 接受者ID */
        public recevierId: string;

        /** 发送时间戳 */
        public sendTime: string;

        /** 奖励领取状态(0-不可领取, 1-可领取，2-已领取) */
        public receiveStatus: number;

        /** 邮件ID(0-未读,1-已读) */
        public read: number;

        /** 附件 */
        public attachment: string;

        /**
         * Creates a new Mail instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Mail instance
         */
        public static create(properties?: protobuf.IMail): protobuf.Mail;

        /**
         * Encodes the specified Mail message. Does not implicitly {@link protobuf.Mail.verify|verify} messages.
         * @param message Mail message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IMail, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Mail message, length delimited. Does not implicitly {@link protobuf.Mail.verify|verify} messages.
         * @param message Mail message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IMail, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Mail message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Mail
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.Mail;

        /**
         * Decodes a Mail message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Mail
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.Mail;

        /**
         * Verifies a Mail message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Mail message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Mail
         */
        public static fromObject(object: { [k: string]: any }): protobuf.Mail;

        /**
         * Creates a plain object from a Mail message. Also converts values to other types if specified.
         * @param message Mail
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.Mail, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Mail to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2SMailListSync. */
    interface IC2SMailListSync {
    }

    /** 邮件列表 */
    class C2SMailListSync implements IC2SMailListSync {

        /**
         * Constructs a new C2SMailListSync.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IC2SMailListSync);

        /**
         * Creates a new C2SMailListSync instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2SMailListSync instance
         */
        public static create(properties?: protobuf.IC2SMailListSync): protobuf.C2SMailListSync;

        /**
         * Encodes the specified C2SMailListSync message. Does not implicitly {@link protobuf.C2SMailListSync.verify|verify} messages.
         * @param message C2SMailListSync message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IC2SMailListSync, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified C2SMailListSync message, length delimited. Does not implicitly {@link protobuf.C2SMailListSync.verify|verify} messages.
         * @param message C2SMailListSync message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IC2SMailListSync, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2SMailListSync message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2SMailListSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.C2SMailListSync;

        /**
         * Decodes a C2SMailListSync message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2SMailListSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.C2SMailListSync;

        /**
         * Verifies a C2SMailListSync message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2SMailListSync message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2SMailListSync
         */
        public static fromObject(object: { [k: string]: any }): protobuf.C2SMailListSync;

        /**
         * Creates a plain object from a C2SMailListSync message. Also converts values to other types if specified.
         * @param message C2SMailListSync
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.C2SMailListSync, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2SMailListSync to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a S2CMailListSync. */
    interface IS2CMailListSync {

        /** 同步类型 0-全部  1-增加 2-修改 3-删除 */
        syncType?: (number|null);

        /** 邮件列表 */
        mails?: (protobuf.IMail[]|null);
    }

    /** 邮件列表 */
    class S2CMailListSync implements IS2CMailListSync {

        /**
         * Constructs a new S2CMailListSync.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IS2CMailListSync);

        /** 同步类型 0-全部  1-增加 2-修改 3-删除 */
        public syncType: number;

        /** 邮件列表 */
        public mails: protobuf.IMail[];

        /**
         * Creates a new S2CMailListSync instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2CMailListSync instance
         */
        public static create(properties?: protobuf.IS2CMailListSync): protobuf.S2CMailListSync;

        /**
         * Encodes the specified S2CMailListSync message. Does not implicitly {@link protobuf.S2CMailListSync.verify|verify} messages.
         * @param message S2CMailListSync message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IS2CMailListSync, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified S2CMailListSync message, length delimited. Does not implicitly {@link protobuf.S2CMailListSync.verify|verify} messages.
         * @param message S2CMailListSync message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IS2CMailListSync, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2CMailListSync message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns S2CMailListSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.S2CMailListSync;

        /**
         * Decodes a S2CMailListSync message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns S2CMailListSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.S2CMailListSync;

        /**
         * Verifies a S2CMailListSync message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a S2CMailListSync message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns S2CMailListSync
         */
        public static fromObject(object: { [k: string]: any }): protobuf.S2CMailListSync;

        /**
         * Creates a plain object from a S2CMailListSync message. Also converts values to other types if specified.
         * @param message S2CMailListSync
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.S2CMailListSync, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this S2CMailListSync to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2SMailOp. */
    interface IC2SMailOp {

        /** 操作类型(1-一键阅读领取，2-删除已读邮件，3-单个领取，4-单个删除,5-单个已读) */
        op?: (number|null);

        /** 邮件ID(当op=3,4,5时,传邮件流水ID) */
        id?: (string|null);
    }

    /** 邮件操作 */
    class C2SMailOp implements IC2SMailOp {

        /**
         * Constructs a new C2SMailOp.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IC2SMailOp);

        /** 操作类型(1-一键阅读领取，2-删除已读邮件，3-单个领取，4-单个删除,5-单个已读) */
        public op: number;

        /** 邮件ID(当op=3,4,5时,传邮件流水ID) */
        public id: string;

        /**
         * Creates a new C2SMailOp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2SMailOp instance
         */
        public static create(properties?: protobuf.IC2SMailOp): protobuf.C2SMailOp;

        /**
         * Encodes the specified C2SMailOp message. Does not implicitly {@link protobuf.C2SMailOp.verify|verify} messages.
         * @param message C2SMailOp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IC2SMailOp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified C2SMailOp message, length delimited. Does not implicitly {@link protobuf.C2SMailOp.verify|verify} messages.
         * @param message C2SMailOp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IC2SMailOp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2SMailOp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2SMailOp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.C2SMailOp;

        /**
         * Decodes a C2SMailOp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2SMailOp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.C2SMailOp;

        /**
         * Verifies a C2SMailOp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2SMailOp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2SMailOp
         */
        public static fromObject(object: { [k: string]: any }): protobuf.C2SMailOp;

        /**
         * Creates a plain object from a C2SMailOp message. Also converts values to other types if specified.
         * @param message C2SMailOp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.C2SMailOp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2SMailOp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a S2CMailOp. */
    interface IS2CMailOp {

        /** 奖励 */
        reward?: (string|null);
    }

    /** 邮件操作 */
    class S2CMailOp implements IS2CMailOp {

        /**
         * Constructs a new S2CMailOp.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IS2CMailOp);

        /** 奖励 */
        public reward: string;

        /**
         * Creates a new S2CMailOp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2CMailOp instance
         */
        public static create(properties?: protobuf.IS2CMailOp): protobuf.S2CMailOp;

        /**
         * Encodes the specified S2CMailOp message. Does not implicitly {@link protobuf.S2CMailOp.verify|verify} messages.
         * @param message S2CMailOp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IS2CMailOp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified S2CMailOp message, length delimited. Does not implicitly {@link protobuf.S2CMailOp.verify|verify} messages.
         * @param message S2CMailOp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IS2CMailOp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2CMailOp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns S2CMailOp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.S2CMailOp;

        /**
         * Decodes a S2CMailOp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns S2CMailOp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.S2CMailOp;

        /**
         * Verifies a S2CMailOp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a S2CMailOp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns S2CMailOp
         */
        public static fromObject(object: { [k: string]: any }): protobuf.S2CMailOp;

        /**
         * Creates a plain object from a S2CMailOp message. Also converts values to other types if specified.
         * @param message S2CMailOp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.S2CMailOp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this S2CMailOp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Mall. */
    interface IMall {

        /** 特惠活动信息 */
        mallOne?: (protobuf.IMallOne|null);

        /** 超值月卡信息 */
        mallTwo?: (protobuf.IMallTwo|null);

        /** 超值好礼信息 */
        mallThree?: (protobuf.IMallThree|null);

        /** 精选好礼信息 */
        mallFour?: (protobuf.IMallFour|null);

        /** 每日精选信息 */
        mallFive?: (protobuf.IMallFive|null);

        /** 钻石购买信息 */
        mallDiamondBuy?: (protobuf.IMallDiamondBuy|null);
    }

    /** 商店全部信息 */
    class Mall implements IMall {

        /**
         * Constructs a new Mall.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IMall);

        /** 特惠活动信息 */
        public mallOne?: (protobuf.IMallOne|null);

        /** 超值月卡信息 */
        public mallTwo?: (protobuf.IMallTwo|null);

        /** 超值好礼信息 */
        public mallThree?: (protobuf.IMallThree|null);

        /** 精选好礼信息 */
        public mallFour?: (protobuf.IMallFour|null);

        /** 每日精选信息 */
        public mallFive?: (protobuf.IMallFive|null);

        /** 钻石购买信息 */
        public mallDiamondBuy?: (protobuf.IMallDiamondBuy|null);

        /**
         * Creates a new Mall instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Mall instance
         */
        public static create(properties?: protobuf.IMall): protobuf.Mall;

        /**
         * Encodes the specified Mall message. Does not implicitly {@link protobuf.Mall.verify|verify} messages.
         * @param message Mall message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IMall, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Mall message, length delimited. Does not implicitly {@link protobuf.Mall.verify|verify} messages.
         * @param message Mall message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IMall, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Mall message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Mall
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.Mall;

        /**
         * Decodes a Mall message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Mall
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.Mall;

        /**
         * Verifies a Mall message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Mall message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Mall
         */
        public static fromObject(object: { [k: string]: any }): protobuf.Mall;

        /**
         * Creates a plain object from a Mall message. Also converts values to other types if specified.
         * @param message Mall
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.Mall, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Mall to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MallOne. */
    interface IMallOne {

        /** 已购买的礼包refId */
        refId?: (string|null);
    }

    /** 特惠活动信息 */
    class MallOne implements IMallOne {

        /**
         * Constructs a new MallOne.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IMallOne);

        /** 已购买的礼包refId */
        public refId: string;

        /**
         * Creates a new MallOne instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MallOne instance
         */
        public static create(properties?: protobuf.IMallOne): protobuf.MallOne;

        /**
         * Encodes the specified MallOne message. Does not implicitly {@link protobuf.MallOne.verify|verify} messages.
         * @param message MallOne message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IMallOne, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MallOne message, length delimited. Does not implicitly {@link protobuf.MallOne.verify|verify} messages.
         * @param message MallOne message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IMallOne, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MallOne message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MallOne
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.MallOne;

        /**
         * Decodes a MallOne message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MallOne
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.MallOne;

        /**
         * Verifies a MallOne message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MallOne message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MallOne
         */
        public static fromObject(object: { [k: string]: any }): protobuf.MallOne;

        /**
         * Creates a plain object from a MallOne message. Also converts values to other types if specified.
         * @param message MallOne
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.MallOne, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MallOne to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MallTwo. */
    interface IMallTwo {

        /** 月卡refId */
        refId?: (string|null);

        /** 购买时间(单位：秒) */
        buyTime?: (number|null);

        /** 领取每日奖励 */
        reward?: (boolean|null);
    }

    /** 超值月卡信息 */
    class MallTwo implements IMallTwo {

        /**
         * Constructs a new MallTwo.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IMallTwo);

        /** 月卡refId */
        public refId: string;

        /** 购买时间(单位：秒) */
        public buyTime: number;

        /** 领取每日奖励 */
        public reward: boolean;

        /**
         * Creates a new MallTwo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MallTwo instance
         */
        public static create(properties?: protobuf.IMallTwo): protobuf.MallTwo;

        /**
         * Encodes the specified MallTwo message. Does not implicitly {@link protobuf.MallTwo.verify|verify} messages.
         * @param message MallTwo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IMallTwo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MallTwo message, length delimited. Does not implicitly {@link protobuf.MallTwo.verify|verify} messages.
         * @param message MallTwo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IMallTwo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MallTwo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MallTwo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.MallTwo;

        /**
         * Decodes a MallTwo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MallTwo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.MallTwo;

        /**
         * Verifies a MallTwo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MallTwo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MallTwo
         */
        public static fromObject(object: { [k: string]: any }): protobuf.MallTwo;

        /**
         * Creates a plain object from a MallTwo message. Also converts values to other types if specified.
         * @param message MallTwo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.MallTwo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MallTwo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MallThree. */
    interface IMallThree {

        /** 礼包refId */
        refId?: (string|null);

        /** 已购买的次数 */
        buyNum?: (number|null);
    }

    /** 超值好礼信息 */
    class MallThree implements IMallThree {

        /**
         * Constructs a new MallThree.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IMallThree);

        /** 礼包refId */
        public refId: string;

        /** 已购买的次数 */
        public buyNum: number;

        /**
         * Creates a new MallThree instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MallThree instance
         */
        public static create(properties?: protobuf.IMallThree): protobuf.MallThree;

        /**
         * Encodes the specified MallThree message. Does not implicitly {@link protobuf.MallThree.verify|verify} messages.
         * @param message MallThree message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IMallThree, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MallThree message, length delimited. Does not implicitly {@link protobuf.MallThree.verify|verify} messages.
         * @param message MallThree message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IMallThree, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MallThree message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MallThree
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.MallThree;

        /**
         * Decodes a MallThree message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MallThree
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.MallThree;

        /**
         * Verifies a MallThree message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MallThree message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MallThree
         */
        public static fromObject(object: { [k: string]: any }): protobuf.MallThree;

        /**
         * Creates a plain object from a MallThree message. Also converts values to other types if specified.
         * @param message MallThree
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.MallThree, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MallThree to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MallFour. */
    interface IMallFour {

        /** 礼包信息 */
        giftBag?: (protobuf.MallFour.IGiftBag[]|null);

        /** 每日手动刷新次数 */
        refreshNum?: (number|null);

        /** 手动刷新CD结束时间(单位：秒) */
        refreshCDEndTime?: (number|null);
    }

    /** 精选好礼信息 */
    class MallFour implements IMallFour {

        /**
         * Constructs a new MallFour.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IMallFour);

        /** 礼包信息 */
        public giftBag: protobuf.MallFour.IGiftBag[];

        /** 每日手动刷新次数 */
        public refreshNum: number;

        /** 手动刷新CD结束时间(单位：秒) */
        public refreshCDEndTime: number;

        /**
         * Creates a new MallFour instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MallFour instance
         */
        public static create(properties?: protobuf.IMallFour): protobuf.MallFour;

        /**
         * Encodes the specified MallFour message. Does not implicitly {@link protobuf.MallFour.verify|verify} messages.
         * @param message MallFour message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IMallFour, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MallFour message, length delimited. Does not implicitly {@link protobuf.MallFour.verify|verify} messages.
         * @param message MallFour message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IMallFour, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MallFour message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MallFour
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.MallFour;

        /**
         * Decodes a MallFour message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MallFour
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.MallFour;

        /**
         * Verifies a MallFour message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MallFour message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MallFour
         */
        public static fromObject(object: { [k: string]: any }): protobuf.MallFour;

        /**
         * Creates a plain object from a MallFour message. Also converts values to other types if specified.
         * @param message MallFour
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.MallFour, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MallFour to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace MallFour {

        /** Properties of a GiftBag. */
        interface IGiftBag {

            /** 礼包refId */
            refId?: (string|null);

            /** 每日购买次数 */
            buyNum?: (number|null);
        }

        /** Represents a GiftBag. */
        class GiftBag implements IGiftBag {

            /**
             * Constructs a new GiftBag.
             * @param [properties] Properties to set
             */
            constructor(properties?: protobuf.MallFour.IGiftBag);

            /** 礼包refId */
            public refId: string;

            /** 每日购买次数 */
            public buyNum: number;

            /**
             * Creates a new GiftBag instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GiftBag instance
             */
            public static create(properties?: protobuf.MallFour.IGiftBag): protobuf.MallFour.GiftBag;

            /**
             * Encodes the specified GiftBag message. Does not implicitly {@link protobuf.MallFour.GiftBag.verify|verify} messages.
             * @param message GiftBag message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: protobuf.MallFour.IGiftBag, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GiftBag message, length delimited. Does not implicitly {@link protobuf.MallFour.GiftBag.verify|verify} messages.
             * @param message GiftBag message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: protobuf.MallFour.IGiftBag, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GiftBag message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GiftBag
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.MallFour.GiftBag;

            /**
             * Decodes a GiftBag message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GiftBag
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.MallFour.GiftBag;

            /**
             * Verifies a GiftBag message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GiftBag message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GiftBag
             */
            public static fromObject(object: { [k: string]: any }): protobuf.MallFour.GiftBag;

            /**
             * Creates a plain object from a GiftBag message. Also converts values to other types if specified.
             * @param message GiftBag
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: protobuf.MallFour.GiftBag, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GiftBag to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Properties of a MallFive. */
    interface IMallFive {

        /** 礼包信息 */
        giftBag?: (protobuf.MallFive.IGiftBag[]|null);

        /** 每日手动刷新次数 */
        refreshNum?: (number|null);

        /** 手动刷新CD结束时间(单位：秒) */
        refreshCDEndTime?: (number|null);
    }

    /** 每日精选信息 */
    class MallFive implements IMallFive {

        /**
         * Constructs a new MallFive.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IMallFive);

        /** 礼包信息 */
        public giftBag: protobuf.MallFive.IGiftBag[];

        /** 每日手动刷新次数 */
        public refreshNum: number;

        /** 手动刷新CD结束时间(单位：秒) */
        public refreshCDEndTime: number;

        /**
         * Creates a new MallFive instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MallFive instance
         */
        public static create(properties?: protobuf.IMallFive): protobuf.MallFive;

        /**
         * Encodes the specified MallFive message. Does not implicitly {@link protobuf.MallFive.verify|verify} messages.
         * @param message MallFive message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IMallFive, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MallFive message, length delimited. Does not implicitly {@link protobuf.MallFive.verify|verify} messages.
         * @param message MallFive message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IMallFive, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MallFive message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MallFive
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.MallFive;

        /**
         * Decodes a MallFive message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MallFive
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.MallFive;

        /**
         * Verifies a MallFive message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MallFive message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MallFive
         */
        public static fromObject(object: { [k: string]: any }): protobuf.MallFive;

        /**
         * Creates a plain object from a MallFive message. Also converts values to other types if specified.
         * @param message MallFive
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.MallFive, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MallFive to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace MallFive {

        /** Properties of a GiftBag. */
        interface IGiftBag {

            /** 礼包refId */
            refId?: (string|null);

            /** 每日购买次数 */
            buyNum?: (number|null);
        }

        /** Represents a GiftBag. */
        class GiftBag implements IGiftBag {

            /**
             * Constructs a new GiftBag.
             * @param [properties] Properties to set
             */
            constructor(properties?: protobuf.MallFive.IGiftBag);

            /** 礼包refId */
            public refId: string;

            /** 每日购买次数 */
            public buyNum: number;

            /**
             * Creates a new GiftBag instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GiftBag instance
             */
            public static create(properties?: protobuf.MallFive.IGiftBag): protobuf.MallFive.GiftBag;

            /**
             * Encodes the specified GiftBag message. Does not implicitly {@link protobuf.MallFive.GiftBag.verify|verify} messages.
             * @param message GiftBag message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: protobuf.MallFive.IGiftBag, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GiftBag message, length delimited. Does not implicitly {@link protobuf.MallFive.GiftBag.verify|verify} messages.
             * @param message GiftBag message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: protobuf.MallFive.IGiftBag, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GiftBag message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GiftBag
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.MallFive.GiftBag;

            /**
             * Decodes a GiftBag message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GiftBag
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.MallFive.GiftBag;

            /**
             * Verifies a GiftBag message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GiftBag message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GiftBag
             */
            public static fromObject(object: { [k: string]: any }): protobuf.MallFive.GiftBag;

            /**
             * Creates a plain object from a GiftBag message. Also converts values to other types if specified.
             * @param message GiftBag
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: protobuf.MallFive.GiftBag, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GiftBag to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Properties of a MallDiamondBuy. */
    interface IMallDiamondBuy {

        /** 礼包信息 */
        diamondBag?: (protobuf.MallDiamondBuy.IDiamondBag[]|null);
    }

    /** 钻石购买信息 */
    class MallDiamondBuy implements IMallDiamondBuy {

        /**
         * Constructs a new MallDiamondBuy.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IMallDiamondBuy);

        /** 礼包信息 */
        public diamondBag: protobuf.MallDiamondBuy.IDiamondBag[];

        /**
         * Creates a new MallDiamondBuy instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MallDiamondBuy instance
         */
        public static create(properties?: protobuf.IMallDiamondBuy): protobuf.MallDiamondBuy;

        /**
         * Encodes the specified MallDiamondBuy message. Does not implicitly {@link protobuf.MallDiamondBuy.verify|verify} messages.
         * @param message MallDiamondBuy message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IMallDiamondBuy, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MallDiamondBuy message, length delimited. Does not implicitly {@link protobuf.MallDiamondBuy.verify|verify} messages.
         * @param message MallDiamondBuy message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IMallDiamondBuy, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MallDiamondBuy message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MallDiamondBuy
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.MallDiamondBuy;

        /**
         * Decodes a MallDiamondBuy message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MallDiamondBuy
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.MallDiamondBuy;

        /**
         * Verifies a MallDiamondBuy message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MallDiamondBuy message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MallDiamondBuy
         */
        public static fromObject(object: { [k: string]: any }): protobuf.MallDiamondBuy;

        /**
         * Creates a plain object from a MallDiamondBuy message. Also converts values to other types if specified.
         * @param message MallDiamondBuy
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.MallDiamondBuy, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MallDiamondBuy to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace MallDiamondBuy {

        /** Properties of a DiamondBag. */
        interface IDiamondBag {

            /** 礼包refId */
            refId?: (string|null);

            /** 首次购买 */
            firstBuy?: (boolean|null);
        }

        /** Represents a DiamondBag. */
        class DiamondBag implements IDiamondBag {

            /**
             * Constructs a new DiamondBag.
             * @param [properties] Properties to set
             */
            constructor(properties?: protobuf.MallDiamondBuy.IDiamondBag);

            /** 礼包refId */
            public refId: string;

            /** 首次购买 */
            public firstBuy: boolean;

            /**
             * Creates a new DiamondBag instance using the specified properties.
             * @param [properties] Properties to set
             * @returns DiamondBag instance
             */
            public static create(properties?: protobuf.MallDiamondBuy.IDiamondBag): protobuf.MallDiamondBuy.DiamondBag;

            /**
             * Encodes the specified DiamondBag message. Does not implicitly {@link protobuf.MallDiamondBuy.DiamondBag.verify|verify} messages.
             * @param message DiamondBag message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: protobuf.MallDiamondBuy.IDiamondBag, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified DiamondBag message, length delimited. Does not implicitly {@link protobuf.MallDiamondBuy.DiamondBag.verify|verify} messages.
             * @param message DiamondBag message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: protobuf.MallDiamondBuy.IDiamondBag, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DiamondBag message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns DiamondBag
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.MallDiamondBuy.DiamondBag;

            /**
             * Decodes a DiamondBag message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns DiamondBag
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.MallDiamondBuy.DiamondBag;

            /**
             * Verifies a DiamondBag message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a DiamondBag message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns DiamondBag
             */
            public static fromObject(object: { [k: string]: any }): protobuf.MallDiamondBuy.DiamondBag;

            /**
             * Creates a plain object from a DiamondBag message. Also converts values to other types if specified.
             * @param message DiamondBag
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: protobuf.MallDiamondBuy.DiamondBag, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this DiamondBag to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Properties of a C2SMallInfo. */
    interface IC2SMallInfo {
    }

    /** 请求商店全部信息 */
    class C2SMallInfo implements IC2SMallInfo {

        /**
         * Constructs a new C2SMallInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IC2SMallInfo);

        /**
         * Creates a new C2SMallInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2SMallInfo instance
         */
        public static create(properties?: protobuf.IC2SMallInfo): protobuf.C2SMallInfo;

        /**
         * Encodes the specified C2SMallInfo message. Does not implicitly {@link protobuf.C2SMallInfo.verify|verify} messages.
         * @param message C2SMallInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IC2SMallInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified C2SMallInfo message, length delimited. Does not implicitly {@link protobuf.C2SMallInfo.verify|verify} messages.
         * @param message C2SMallInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IC2SMallInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2SMallInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2SMallInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.C2SMallInfo;

        /**
         * Decodes a C2SMallInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2SMallInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.C2SMallInfo;

        /**
         * Verifies a C2SMallInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2SMallInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2SMallInfo
         */
        public static fromObject(object: { [k: string]: any }): protobuf.C2SMallInfo;

        /**
         * Creates a plain object from a C2SMallInfo message. Also converts values to other types if specified.
         * @param message C2SMallInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.C2SMallInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2SMallInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a S2CMallInfo. */
    interface IS2CMallInfo {

        /** 商店全部信息 */
        mall?: (protobuf.IMall|null);
    }

    /** 同步商店全部信息 */
    class S2CMallInfo implements IS2CMallInfo {

        /**
         * Constructs a new S2CMallInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IS2CMallInfo);

        /** 商店全部信息 */
        public mall?: (protobuf.IMall|null);

        /**
         * Creates a new S2CMallInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2CMallInfo instance
         */
        public static create(properties?: protobuf.IS2CMallInfo): protobuf.S2CMallInfo;

        /**
         * Encodes the specified S2CMallInfo message. Does not implicitly {@link protobuf.S2CMallInfo.verify|verify} messages.
         * @param message S2CMallInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IS2CMallInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified S2CMallInfo message, length delimited. Does not implicitly {@link protobuf.S2CMallInfo.verify|verify} messages.
         * @param message S2CMallInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IS2CMallInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2CMallInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns S2CMallInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.S2CMallInfo;

        /**
         * Decodes a S2CMallInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns S2CMallInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.S2CMallInfo;

        /**
         * Verifies a S2CMallInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a S2CMallInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns S2CMallInfo
         */
        public static fromObject(object: { [k: string]: any }): protobuf.S2CMallInfo;

        /**
         * Creates a plain object from a S2CMallInfo message. Also converts values to other types if specified.
         * @param message S2CMallInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.S2CMallInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this S2CMallInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2SCardDayReward. */
    interface IC2SCardDayReward {

        /** 月卡refId */
        refId?: (string|null);
    }

    /** 领取月卡每日奖励 */
    class C2SCardDayReward implements IC2SCardDayReward {

        /**
         * Constructs a new C2SCardDayReward.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IC2SCardDayReward);

        /** 月卡refId */
        public refId: string;

        /**
         * Creates a new C2SCardDayReward instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2SCardDayReward instance
         */
        public static create(properties?: protobuf.IC2SCardDayReward): protobuf.C2SCardDayReward;

        /**
         * Encodes the specified C2SCardDayReward message. Does not implicitly {@link protobuf.C2SCardDayReward.verify|verify} messages.
         * @param message C2SCardDayReward message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IC2SCardDayReward, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified C2SCardDayReward message, length delimited. Does not implicitly {@link protobuf.C2SCardDayReward.verify|verify} messages.
         * @param message C2SCardDayReward message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IC2SCardDayReward, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2SCardDayReward message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2SCardDayReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.C2SCardDayReward;

        /**
         * Decodes a C2SCardDayReward message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2SCardDayReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.C2SCardDayReward;

        /**
         * Verifies a C2SCardDayReward message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2SCardDayReward message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2SCardDayReward
         */
        public static fromObject(object: { [k: string]: any }): protobuf.C2SCardDayReward;

        /**
         * Creates a plain object from a C2SCardDayReward message. Also converts values to other types if specified.
         * @param message C2SCardDayReward
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.C2SCardDayReward, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2SCardDayReward to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a S2CCardDayReward. */
    interface IS2CCardDayReward {

        /** 超值月卡信息 */
        mallTwo?: (protobuf.IMallTwo|null);
    }

    /** 同步月卡每日奖励 */
    class S2CCardDayReward implements IS2CCardDayReward {

        /**
         * Constructs a new S2CCardDayReward.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IS2CCardDayReward);

        /** 超值月卡信息 */
        public mallTwo?: (protobuf.IMallTwo|null);

        /**
         * Creates a new S2CCardDayReward instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2CCardDayReward instance
         */
        public static create(properties?: protobuf.IS2CCardDayReward): protobuf.S2CCardDayReward;

        /**
         * Encodes the specified S2CCardDayReward message. Does not implicitly {@link protobuf.S2CCardDayReward.verify|verify} messages.
         * @param message S2CCardDayReward message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IS2CCardDayReward, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified S2CCardDayReward message, length delimited. Does not implicitly {@link protobuf.S2CCardDayReward.verify|verify} messages.
         * @param message S2CCardDayReward message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IS2CCardDayReward, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2CCardDayReward message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns S2CCardDayReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.S2CCardDayReward;

        /**
         * Decodes a S2CCardDayReward message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns S2CCardDayReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.S2CCardDayReward;

        /**
         * Verifies a S2CCardDayReward message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a S2CCardDayReward message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns S2CCardDayReward
         */
        public static fromObject(object: { [k: string]: any }): protobuf.S2CCardDayReward;

        /**
         * Creates a plain object from a S2CCardDayReward message. Also converts values to other types if specified.
         * @param message S2CCardDayReward
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.S2CCardDayReward, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this S2CCardDayReward to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2SMallFourRefresh. */
    interface IC2SMallFourRefresh {
    }

    /** 刷新精选好礼 */
    class C2SMallFourRefresh implements IC2SMallFourRefresh {

        /**
         * Constructs a new C2SMallFourRefresh.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IC2SMallFourRefresh);

        /**
         * Creates a new C2SMallFourRefresh instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2SMallFourRefresh instance
         */
        public static create(properties?: protobuf.IC2SMallFourRefresh): protobuf.C2SMallFourRefresh;

        /**
         * Encodes the specified C2SMallFourRefresh message. Does not implicitly {@link protobuf.C2SMallFourRefresh.verify|verify} messages.
         * @param message C2SMallFourRefresh message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IC2SMallFourRefresh, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified C2SMallFourRefresh message, length delimited. Does not implicitly {@link protobuf.C2SMallFourRefresh.verify|verify} messages.
         * @param message C2SMallFourRefresh message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IC2SMallFourRefresh, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2SMallFourRefresh message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2SMallFourRefresh
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.C2SMallFourRefresh;

        /**
         * Decodes a C2SMallFourRefresh message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2SMallFourRefresh
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.C2SMallFourRefresh;

        /**
         * Verifies a C2SMallFourRefresh message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2SMallFourRefresh message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2SMallFourRefresh
         */
        public static fromObject(object: { [k: string]: any }): protobuf.C2SMallFourRefresh;

        /**
         * Creates a plain object from a C2SMallFourRefresh message. Also converts values to other types if specified.
         * @param message C2SMallFourRefresh
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.C2SMallFourRefresh, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2SMallFourRefresh to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a S2CMallFourRefresh. */
    interface IS2CMallFourRefresh {

        /** 商店全部信息 */
        mallFour?: (protobuf.IMallFour|null);
    }

    /** 刷新精选好礼 */
    class S2CMallFourRefresh implements IS2CMallFourRefresh {

        /**
         * Constructs a new S2CMallFourRefresh.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IS2CMallFourRefresh);

        /** 商店全部信息 */
        public mallFour?: (protobuf.IMallFour|null);

        /**
         * Creates a new S2CMallFourRefresh instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2CMallFourRefresh instance
         */
        public static create(properties?: protobuf.IS2CMallFourRefresh): protobuf.S2CMallFourRefresh;

        /**
         * Encodes the specified S2CMallFourRefresh message. Does not implicitly {@link protobuf.S2CMallFourRefresh.verify|verify} messages.
         * @param message S2CMallFourRefresh message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IS2CMallFourRefresh, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified S2CMallFourRefresh message, length delimited. Does not implicitly {@link protobuf.S2CMallFourRefresh.verify|verify} messages.
         * @param message S2CMallFourRefresh message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IS2CMallFourRefresh, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2CMallFourRefresh message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns S2CMallFourRefresh
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.S2CMallFourRefresh;

        /**
         * Decodes a S2CMallFourRefresh message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns S2CMallFourRefresh
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.S2CMallFourRefresh;

        /**
         * Verifies a S2CMallFourRefresh message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a S2CMallFourRefresh message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns S2CMallFourRefresh
         */
        public static fromObject(object: { [k: string]: any }): protobuf.S2CMallFourRefresh;

        /**
         * Creates a plain object from a S2CMallFourRefresh message. Also converts values to other types if specified.
         * @param message S2CMallFourRefresh
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.S2CMallFourRefresh, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this S2CMallFourRefresh to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2SMallFiveRefresh. */
    interface IC2SMallFiveRefresh {
    }

    /** 刷新每日精选 */
    class C2SMallFiveRefresh implements IC2SMallFiveRefresh {

        /**
         * Constructs a new C2SMallFiveRefresh.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IC2SMallFiveRefresh);

        /**
         * Creates a new C2SMallFiveRefresh instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2SMallFiveRefresh instance
         */
        public static create(properties?: protobuf.IC2SMallFiveRefresh): protobuf.C2SMallFiveRefresh;

        /**
         * Encodes the specified C2SMallFiveRefresh message. Does not implicitly {@link protobuf.C2SMallFiveRefresh.verify|verify} messages.
         * @param message C2SMallFiveRefresh message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IC2SMallFiveRefresh, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified C2SMallFiveRefresh message, length delimited. Does not implicitly {@link protobuf.C2SMallFiveRefresh.verify|verify} messages.
         * @param message C2SMallFiveRefresh message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IC2SMallFiveRefresh, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2SMallFiveRefresh message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2SMallFiveRefresh
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.C2SMallFiveRefresh;

        /**
         * Decodes a C2SMallFiveRefresh message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2SMallFiveRefresh
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.C2SMallFiveRefresh;

        /**
         * Verifies a C2SMallFiveRefresh message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2SMallFiveRefresh message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2SMallFiveRefresh
         */
        public static fromObject(object: { [k: string]: any }): protobuf.C2SMallFiveRefresh;

        /**
         * Creates a plain object from a C2SMallFiveRefresh message. Also converts values to other types if specified.
         * @param message C2SMallFiveRefresh
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.C2SMallFiveRefresh, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2SMallFiveRefresh to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a S2CMallFiveRefresh. */
    interface IS2CMallFiveRefresh {

        /** 商店全部信息 */
        mallFive?: (protobuf.IMallFive|null);
    }

    /** 刷新每日精选 */
    class S2CMallFiveRefresh implements IS2CMallFiveRefresh {

        /**
         * Constructs a new S2CMallFiveRefresh.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IS2CMallFiveRefresh);

        /** 商店全部信息 */
        public mallFive?: (protobuf.IMallFive|null);

        /**
         * Creates a new S2CMallFiveRefresh instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2CMallFiveRefresh instance
         */
        public static create(properties?: protobuf.IS2CMallFiveRefresh): protobuf.S2CMallFiveRefresh;

        /**
         * Encodes the specified S2CMallFiveRefresh message. Does not implicitly {@link protobuf.S2CMallFiveRefresh.verify|verify} messages.
         * @param message S2CMallFiveRefresh message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IS2CMallFiveRefresh, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified S2CMallFiveRefresh message, length delimited. Does not implicitly {@link protobuf.S2CMallFiveRefresh.verify|verify} messages.
         * @param message S2CMallFiveRefresh message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IS2CMallFiveRefresh, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2CMallFiveRefresh message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns S2CMallFiveRefresh
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.S2CMallFiveRefresh;

        /**
         * Decodes a S2CMallFiveRefresh message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns S2CMallFiveRefresh
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.S2CMallFiveRefresh;

        /**
         * Verifies a S2CMallFiveRefresh message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a S2CMallFiveRefresh message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns S2CMallFiveRefresh
         */
        public static fromObject(object: { [k: string]: any }): protobuf.S2CMallFiveRefresh;

        /**
         * Creates a plain object from a S2CMallFiveRefresh message. Also converts values to other types if specified.
         * @param message S2CMallFiveRefresh
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.S2CMallFiveRefresh, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this S2CMallFiveRefresh to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2SMallFiveBuy. */
    interface IC2SMallFiveBuy {

        /** 礼包refId */
        refId?: (string|null);
    }

    /** 每日精选购买 */
    class C2SMallFiveBuy implements IC2SMallFiveBuy {

        /**
         * Constructs a new C2SMallFiveBuy.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IC2SMallFiveBuy);

        /** 礼包refId */
        public refId: string;

        /**
         * Creates a new C2SMallFiveBuy instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2SMallFiveBuy instance
         */
        public static create(properties?: protobuf.IC2SMallFiveBuy): protobuf.C2SMallFiveBuy;

        /**
         * Encodes the specified C2SMallFiveBuy message. Does not implicitly {@link protobuf.C2SMallFiveBuy.verify|verify} messages.
         * @param message C2SMallFiveBuy message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IC2SMallFiveBuy, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified C2SMallFiveBuy message, length delimited. Does not implicitly {@link protobuf.C2SMallFiveBuy.verify|verify} messages.
         * @param message C2SMallFiveBuy message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IC2SMallFiveBuy, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2SMallFiveBuy message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2SMallFiveBuy
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.C2SMallFiveBuy;

        /**
         * Decodes a C2SMallFiveBuy message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2SMallFiveBuy
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.C2SMallFiveBuy;

        /**
         * Verifies a C2SMallFiveBuy message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2SMallFiveBuy message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2SMallFiveBuy
         */
        public static fromObject(object: { [k: string]: any }): protobuf.C2SMallFiveBuy;

        /**
         * Creates a plain object from a C2SMallFiveBuy message. Also converts values to other types if specified.
         * @param message C2SMallFiveBuy
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.C2SMallFiveBuy, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2SMallFiveBuy to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a S2CMallFiveBuy. */
    interface IS2CMallFiveBuy {
    }

    /** 每日精选购买 */
    class S2CMallFiveBuy implements IS2CMallFiveBuy {

        /**
         * Constructs a new S2CMallFiveBuy.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IS2CMallFiveBuy);

        /**
         * Creates a new S2CMallFiveBuy instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2CMallFiveBuy instance
         */
        public static create(properties?: protobuf.IS2CMallFiveBuy): protobuf.S2CMallFiveBuy;

        /**
         * Encodes the specified S2CMallFiveBuy message. Does not implicitly {@link protobuf.S2CMallFiveBuy.verify|verify} messages.
         * @param message S2CMallFiveBuy message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IS2CMallFiveBuy, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified S2CMallFiveBuy message, length delimited. Does not implicitly {@link protobuf.S2CMallFiveBuy.verify|verify} messages.
         * @param message S2CMallFiveBuy message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IS2CMallFiveBuy, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2CMallFiveBuy message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns S2CMallFiveBuy
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.S2CMallFiveBuy;

        /**
         * Decodes a S2CMallFiveBuy message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns S2CMallFiveBuy
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.S2CMallFiveBuy;

        /**
         * Verifies a S2CMallFiveBuy message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a S2CMallFiveBuy message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns S2CMallFiveBuy
         */
        public static fromObject(object: { [k: string]: any }): protobuf.S2CMallFiveBuy;

        /**
         * Creates a plain object from a S2CMallFiveBuy message. Also converts values to other types if specified.
         * @param message S2CMallFiveBuy
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.S2CMallFiveBuy, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this S2CMallFiveBuy to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2SMallGoldBuy. */
    interface IC2SMallGoldBuy {

        /** 礼包refId */
        refId?: (string|null);
    }

    /** 金币购买 */
    class C2SMallGoldBuy implements IC2SMallGoldBuy {

        /**
         * Constructs a new C2SMallGoldBuy.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IC2SMallGoldBuy);

        /** 礼包refId */
        public refId: string;

        /**
         * Creates a new C2SMallGoldBuy instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2SMallGoldBuy instance
         */
        public static create(properties?: protobuf.IC2SMallGoldBuy): protobuf.C2SMallGoldBuy;

        /**
         * Encodes the specified C2SMallGoldBuy message. Does not implicitly {@link protobuf.C2SMallGoldBuy.verify|verify} messages.
         * @param message C2SMallGoldBuy message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IC2SMallGoldBuy, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified C2SMallGoldBuy message, length delimited. Does not implicitly {@link protobuf.C2SMallGoldBuy.verify|verify} messages.
         * @param message C2SMallGoldBuy message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IC2SMallGoldBuy, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2SMallGoldBuy message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2SMallGoldBuy
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.C2SMallGoldBuy;

        /**
         * Decodes a C2SMallGoldBuy message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2SMallGoldBuy
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.C2SMallGoldBuy;

        /**
         * Verifies a C2SMallGoldBuy message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2SMallGoldBuy message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2SMallGoldBuy
         */
        public static fromObject(object: { [k: string]: any }): protobuf.C2SMallGoldBuy;

        /**
         * Creates a plain object from a C2SMallGoldBuy message. Also converts values to other types if specified.
         * @param message C2SMallGoldBuy
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.C2SMallGoldBuy, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2SMallGoldBuy to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a S2CMallGoldBuy. */
    interface IS2CMallGoldBuy {
    }

    /** 金币购买 */
    class S2CMallGoldBuy implements IS2CMallGoldBuy {

        /**
         * Constructs a new S2CMallGoldBuy.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IS2CMallGoldBuy);

        /**
         * Creates a new S2CMallGoldBuy instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2CMallGoldBuy instance
         */
        public static create(properties?: protobuf.IS2CMallGoldBuy): protobuf.S2CMallGoldBuy;

        /**
         * Encodes the specified S2CMallGoldBuy message. Does not implicitly {@link protobuf.S2CMallGoldBuy.verify|verify} messages.
         * @param message S2CMallGoldBuy message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IS2CMallGoldBuy, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified S2CMallGoldBuy message, length delimited. Does not implicitly {@link protobuf.S2CMallGoldBuy.verify|verify} messages.
         * @param message S2CMallGoldBuy message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IS2CMallGoldBuy, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2CMallGoldBuy message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns S2CMallGoldBuy
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.S2CMallGoldBuy;

        /**
         * Decodes a S2CMallGoldBuy message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns S2CMallGoldBuy
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.S2CMallGoldBuy;

        /**
         * Verifies a S2CMallGoldBuy message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a S2CMallGoldBuy message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns S2CMallGoldBuy
         */
        public static fromObject(object: { [k: string]: any }): protobuf.S2CMallGoldBuy;

        /**
         * Creates a plain object from a S2CMallGoldBuy message. Also converts values to other types if specified.
         * @param message S2CMallGoldBuy
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.S2CMallGoldBuy, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this S2CMallGoldBuy to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a S2CMallOne. */
    interface IS2CMallOne {

        /** 特惠活动信息 */
        mallOne?: (protobuf.IMallOne|null);
    }

    /** 同步特惠活动信息 */
    class S2CMallOne implements IS2CMallOne {

        /**
         * Constructs a new S2CMallOne.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IS2CMallOne);

        /** 特惠活动信息 */
        public mallOne?: (protobuf.IMallOne|null);

        /**
         * Creates a new S2CMallOne instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2CMallOne instance
         */
        public static create(properties?: protobuf.IS2CMallOne): protobuf.S2CMallOne;

        /**
         * Encodes the specified S2CMallOne message. Does not implicitly {@link protobuf.S2CMallOne.verify|verify} messages.
         * @param message S2CMallOne message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IS2CMallOne, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified S2CMallOne message, length delimited. Does not implicitly {@link protobuf.S2CMallOne.verify|verify} messages.
         * @param message S2CMallOne message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IS2CMallOne, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2CMallOne message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns S2CMallOne
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.S2CMallOne;

        /**
         * Decodes a S2CMallOne message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns S2CMallOne
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.S2CMallOne;

        /**
         * Verifies a S2CMallOne message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a S2CMallOne message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns S2CMallOne
         */
        public static fromObject(object: { [k: string]: any }): protobuf.S2CMallOne;

        /**
         * Creates a plain object from a S2CMallOne message. Also converts values to other types if specified.
         * @param message S2CMallOne
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.S2CMallOne, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this S2CMallOne to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a S2CMallThree. */
    interface IS2CMallThree {

        /** 超值好礼信息 */
        mallThree?: (protobuf.IMallThree|null);
    }

    /** 同步超值好礼信息 */
    class S2CMallThree implements IS2CMallThree {

        /**
         * Constructs a new S2CMallThree.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IS2CMallThree);

        /** 超值好礼信息 */
        public mallThree?: (protobuf.IMallThree|null);

        /**
         * Creates a new S2CMallThree instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2CMallThree instance
         */
        public static create(properties?: protobuf.IS2CMallThree): protobuf.S2CMallThree;

        /**
         * Encodes the specified S2CMallThree message. Does not implicitly {@link protobuf.S2CMallThree.verify|verify} messages.
         * @param message S2CMallThree message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IS2CMallThree, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified S2CMallThree message, length delimited. Does not implicitly {@link protobuf.S2CMallThree.verify|verify} messages.
         * @param message S2CMallThree message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IS2CMallThree, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2CMallThree message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns S2CMallThree
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.S2CMallThree;

        /**
         * Decodes a S2CMallThree message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns S2CMallThree
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.S2CMallThree;

        /**
         * Verifies a S2CMallThree message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a S2CMallThree message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns S2CMallThree
         */
        public static fromObject(object: { [k: string]: any }): protobuf.S2CMallThree;

        /**
         * Creates a plain object from a S2CMallThree message. Also converts values to other types if specified.
         * @param message S2CMallThree
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.S2CMallThree, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this S2CMallThree to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a S2CMallDiamondBuy. */
    interface IS2CMallDiamondBuy {

        /** 钻石购买信息 */
        mallDiamondBuy?: (protobuf.IMallDiamondBuy|null);
    }

    /** 同步钻石购买信息 */
    class S2CMallDiamondBuy implements IS2CMallDiamondBuy {

        /**
         * Constructs a new S2CMallDiamondBuy.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IS2CMallDiamondBuy);

        /** 钻石购买信息 */
        public mallDiamondBuy?: (protobuf.IMallDiamondBuy|null);

        /**
         * Creates a new S2CMallDiamondBuy instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2CMallDiamondBuy instance
         */
        public static create(properties?: protobuf.IS2CMallDiamondBuy): protobuf.S2CMallDiamondBuy;

        /**
         * Encodes the specified S2CMallDiamondBuy message. Does not implicitly {@link protobuf.S2CMallDiamondBuy.verify|verify} messages.
         * @param message S2CMallDiamondBuy message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IS2CMallDiamondBuy, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified S2CMallDiamondBuy message, length delimited. Does not implicitly {@link protobuf.S2CMallDiamondBuy.verify|verify} messages.
         * @param message S2CMallDiamondBuy message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IS2CMallDiamondBuy, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2CMallDiamondBuy message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns S2CMallDiamondBuy
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.S2CMallDiamondBuy;

        /**
         * Decodes a S2CMallDiamondBuy message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns S2CMallDiamondBuy
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.S2CMallDiamondBuy;

        /**
         * Verifies a S2CMallDiamondBuy message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a S2CMallDiamondBuy message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns S2CMallDiamondBuy
         */
        public static fromObject(object: { [k: string]: any }): protobuf.S2CMallDiamondBuy;

        /**
         * Creates a plain object from a S2CMallDiamondBuy message. Also converts values to other types if specified.
         * @param message S2CMallDiamondBuy
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.S2CMallDiamondBuy, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this S2CMallDiamondBuy to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a S2CMallReward. */
    interface IS2CMallReward {

        /** 获得的奖励信息 */
        mallReward?: (string|null);
    }

    /** 同步获得的奖励 */
    class S2CMallReward implements IS2CMallReward {

        /**
         * Constructs a new S2CMallReward.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IS2CMallReward);

        /** 获得的奖励信息 */
        public mallReward: string;

        /**
         * Creates a new S2CMallReward instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2CMallReward instance
         */
        public static create(properties?: protobuf.IS2CMallReward): protobuf.S2CMallReward;

        /**
         * Encodes the specified S2CMallReward message. Does not implicitly {@link protobuf.S2CMallReward.verify|verify} messages.
         * @param message S2CMallReward message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IS2CMallReward, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified S2CMallReward message, length delimited. Does not implicitly {@link protobuf.S2CMallReward.verify|verify} messages.
         * @param message S2CMallReward message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IS2CMallReward, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2CMallReward message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns S2CMallReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.S2CMallReward;

        /**
         * Decodes a S2CMallReward message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns S2CMallReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.S2CMallReward;

        /**
         * Verifies a S2CMallReward message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a S2CMallReward message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns S2CMallReward
         */
        public static fromObject(object: { [k: string]: any }): protobuf.S2CMallReward;

        /**
         * Creates a plain object from a S2CMallReward message. Also converts values to other types if specified.
         * @param message S2CMallReward
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.S2CMallReward, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this S2CMallReward to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** 消息号定义 */
    enum MessageIds {
        C2SServerTime = 0,
        S2CServerTime = 1,
        C2SHeartBeate = 3,
        S2CHeartBeate = 4,
        C2SAuth = 101,
        S2CAuth = 102,
        C2SGetPlayer = 201,
        S2CGetPlayer = 202,
        C2SRandName = 203,
        S2CRandName = 204,
        C2SCreatePlayer = 205,
        S2CCreatePlayer = 206,
        C2SLogin = 207,
        S2CLogin = 208,
        C2SLoginSuccess = 209,
        S2CLoginSuccess = 210,
        S2CPlayerBaseInfoSync = 302,
        S2CPlayerExtInfoSync = 304,
        C2SPlayerRename = 305,
        S2CPlayerRename = 306,
        C2SPlayerModifyHead = 307,
        S2CPlayerModifyHead = 308,
        C2SPlayerInfoUpdate = 321,
        S2CPlayerInfoUpdate = 322,
        C2SDebug = 401,
        S2CDebug = 402,
        C2SItemBagSync = 601,
        S2CItemBagSync = 602,
        C2SMailListSync = 1601,
        S2CMailListSync = 1602,
        C2SMailOp = 1603,
        S2CMailOp = 1604,
        C2SNoticeListSync = 1701,
        S2CNoticeListSync = 1702,
        C2SGiftCodeExchange = 2001,
        S2CGiftCodeExchange = 2002
    }

    /** Properties of a Notice. */
    interface INotice {

        /** 公告流水ID */
        id?: (string|null);

        /** 公告标题 */
        title?: (string|null);

        /** 公告地址 */
        url?: (string|null);

        /** 发送时间戳 */
        sendTime?: (string|null);
    }

    /** 公告信息 */
    class Notice implements INotice {

        /**
         * Constructs a new Notice.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.INotice);

        /** 公告流水ID */
        public id: string;

        /** 公告标题 */
        public title: string;

        /** 公告地址 */
        public url: string;

        /** 发送时间戳 */
        public sendTime: string;

        /**
         * Creates a new Notice instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Notice instance
         */
        public static create(properties?: protobuf.INotice): protobuf.Notice;

        /**
         * Encodes the specified Notice message. Does not implicitly {@link protobuf.Notice.verify|verify} messages.
         * @param message Notice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.INotice, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Notice message, length delimited. Does not implicitly {@link protobuf.Notice.verify|verify} messages.
         * @param message Notice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.INotice, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Notice message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Notice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.Notice;

        /**
         * Decodes a Notice message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Notice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.Notice;

        /**
         * Verifies a Notice message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Notice message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Notice
         */
        public static fromObject(object: { [k: string]: any }): protobuf.Notice;

        /**
         * Creates a plain object from a Notice message. Also converts values to other types if specified.
         * @param message Notice
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.Notice, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Notice to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2SNoticeListSync. */
    interface IC2SNoticeListSync {
    }

    /** 公告列表 */
    class C2SNoticeListSync implements IC2SNoticeListSync {

        /**
         * Constructs a new C2SNoticeListSync.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IC2SNoticeListSync);

        /**
         * Creates a new C2SNoticeListSync instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2SNoticeListSync instance
         */
        public static create(properties?: protobuf.IC2SNoticeListSync): protobuf.C2SNoticeListSync;

        /**
         * Encodes the specified C2SNoticeListSync message. Does not implicitly {@link protobuf.C2SNoticeListSync.verify|verify} messages.
         * @param message C2SNoticeListSync message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IC2SNoticeListSync, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified C2SNoticeListSync message, length delimited. Does not implicitly {@link protobuf.C2SNoticeListSync.verify|verify} messages.
         * @param message C2SNoticeListSync message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IC2SNoticeListSync, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2SNoticeListSync message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2SNoticeListSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.C2SNoticeListSync;

        /**
         * Decodes a C2SNoticeListSync message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2SNoticeListSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.C2SNoticeListSync;

        /**
         * Verifies a C2SNoticeListSync message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2SNoticeListSync message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2SNoticeListSync
         */
        public static fromObject(object: { [k: string]: any }): protobuf.C2SNoticeListSync;

        /**
         * Creates a plain object from a C2SNoticeListSync message. Also converts values to other types if specified.
         * @param message C2SNoticeListSync
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.C2SNoticeListSync, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2SNoticeListSync to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a S2CNoticeListSync. */
    interface IS2CNoticeListSync {

        /** 同步类型 0-全部  1-增加 2-修改 3-删除 */
        syncType?: (number|null);

        /** 公告列表 */
        notices?: (protobuf.INotice[]|null);
    }

    /** 公告列表 */
    class S2CNoticeListSync implements IS2CNoticeListSync {

        /**
         * Constructs a new S2CNoticeListSync.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IS2CNoticeListSync);

        /** 同步类型 0-全部  1-增加 2-修改 3-删除 */
        public syncType: number;

        /** 公告列表 */
        public notices: protobuf.INotice[];

        /**
         * Creates a new S2CNoticeListSync instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2CNoticeListSync instance
         */
        public static create(properties?: protobuf.IS2CNoticeListSync): protobuf.S2CNoticeListSync;

        /**
         * Encodes the specified S2CNoticeListSync message. Does not implicitly {@link protobuf.S2CNoticeListSync.verify|verify} messages.
         * @param message S2CNoticeListSync message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IS2CNoticeListSync, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified S2CNoticeListSync message, length delimited. Does not implicitly {@link protobuf.S2CNoticeListSync.verify|verify} messages.
         * @param message S2CNoticeListSync message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IS2CNoticeListSync, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2CNoticeListSync message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns S2CNoticeListSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.S2CNoticeListSync;

        /**
         * Decodes a S2CNoticeListSync message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns S2CNoticeListSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.S2CNoticeListSync;

        /**
         * Verifies a S2CNoticeListSync message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a S2CNoticeListSync message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns S2CNoticeListSync
         */
        public static fromObject(object: { [k: string]: any }): protobuf.S2CNoticeListSync;

        /**
         * Creates a plain object from a S2CNoticeListSync message. Also converts values to other types if specified.
         * @param message S2CNoticeListSync
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.S2CNoticeListSync, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this S2CNoticeListSync to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BaseInfo. */
    interface IBaseInfo {

        /** 玩家id */
        playerId?: (string|null);

        /** 玩家账号 */
        identityId?: (string|null);

        /** 玩家名 */
        name?: (string|null);

        /** 性别：1男，2女 */
        gender?: (number|null);

        /** 头像 */
        headImageId?: (string|null);

        /** 头像框 */
        headImageRim?: (string|null);

        /** 出身 */
        roleBirth?: (string|null);

        /** 钻石 */
        diamond?: (number|null);

        /** 金币 */
        gold?: (number|null);

        /** 创号时间戳 */
        createTime?: (number|Long|null);

        /** 平台头像 */
        platFormHead?: (string|null);
    }

    /** 玩家Base信息(不经常变化的数据) */
    class BaseInfo implements IBaseInfo {

        /**
         * Constructs a new BaseInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IBaseInfo);

        /** 玩家id */
        public playerId: string;

        /** 玩家账号 */
        public identityId: string;

        /** 玩家名 */
        public name: string;

        /** 性别：1男，2女 */
        public gender: number;

        /** 头像 */
        public headImageId: string;

        /** 头像框 */
        public headImageRim: string;

        /** 出身 */
        public roleBirth: string;

        /** 钻石 */
        public diamond: number;

        /** 金币 */
        public gold: number;

        /** 创号时间戳 */
        public createTime: (number|Long);

        /** 平台头像 */
        public platFormHead: string;

        /**
         * Creates a new BaseInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BaseInfo instance
         */
        public static create(properties?: protobuf.IBaseInfo): protobuf.BaseInfo;

        /**
         * Encodes the specified BaseInfo message. Does not implicitly {@link protobuf.BaseInfo.verify|verify} messages.
         * @param message BaseInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IBaseInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BaseInfo message, length delimited. Does not implicitly {@link protobuf.BaseInfo.verify|verify} messages.
         * @param message BaseInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IBaseInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BaseInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BaseInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.BaseInfo;

        /**
         * Decodes a BaseInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BaseInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.BaseInfo;

        /**
         * Verifies a BaseInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BaseInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BaseInfo
         */
        public static fromObject(object: { [k: string]: any }): protobuf.BaseInfo;

        /**
         * Creates a plain object from a BaseInfo message. Also converts values to other types if specified.
         * @param message BaseInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.BaseInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BaseInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ExtInfo. */
    interface IExtInfo {
    }

    /** 玩家扩展信息(经常变化的数据) */
    class ExtInfo implements IExtInfo {

        /**
         * Constructs a new ExtInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IExtInfo);

        /**
         * Creates a new ExtInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ExtInfo instance
         */
        public static create(properties?: protobuf.IExtInfo): protobuf.ExtInfo;

        /**
         * Encodes the specified ExtInfo message. Does not implicitly {@link protobuf.ExtInfo.verify|verify} messages.
         * @param message ExtInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IExtInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ExtInfo message, length delimited. Does not implicitly {@link protobuf.ExtInfo.verify|verify} messages.
         * @param message ExtInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IExtInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ExtInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ExtInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.ExtInfo;

        /**
         * Decodes an ExtInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ExtInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.ExtInfo;

        /**
         * Verifies an ExtInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ExtInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ExtInfo
         */
        public static fromObject(object: { [k: string]: any }): protobuf.ExtInfo;

        /**
         * Creates a plain object from an ExtInfo message. Also converts values to other types if specified.
         * @param message ExtInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.ExtInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ExtInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a S2CPlayerBaseInfoSync. */
    interface IS2CPlayerBaseInfoSync {

        /** 玩家信息 * */
        baseInfo?: (protobuf.IBaseInfo|null);
    }

    /** 玩家信息同步到 (不经常变化的数据)* */
    class S2CPlayerBaseInfoSync implements IS2CPlayerBaseInfoSync {

        /**
         * Constructs a new S2CPlayerBaseInfoSync.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IS2CPlayerBaseInfoSync);

        /** 玩家信息 * */
        public baseInfo?: (protobuf.IBaseInfo|null);

        /**
         * Creates a new S2CPlayerBaseInfoSync instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2CPlayerBaseInfoSync instance
         */
        public static create(properties?: protobuf.IS2CPlayerBaseInfoSync): protobuf.S2CPlayerBaseInfoSync;

        /**
         * Encodes the specified S2CPlayerBaseInfoSync message. Does not implicitly {@link protobuf.S2CPlayerBaseInfoSync.verify|verify} messages.
         * @param message S2CPlayerBaseInfoSync message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IS2CPlayerBaseInfoSync, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified S2CPlayerBaseInfoSync message, length delimited. Does not implicitly {@link protobuf.S2CPlayerBaseInfoSync.verify|verify} messages.
         * @param message S2CPlayerBaseInfoSync message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IS2CPlayerBaseInfoSync, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2CPlayerBaseInfoSync message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns S2CPlayerBaseInfoSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.S2CPlayerBaseInfoSync;

        /**
         * Decodes a S2CPlayerBaseInfoSync message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns S2CPlayerBaseInfoSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.S2CPlayerBaseInfoSync;

        /**
         * Verifies a S2CPlayerBaseInfoSync message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a S2CPlayerBaseInfoSync message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns S2CPlayerBaseInfoSync
         */
        public static fromObject(object: { [k: string]: any }): protobuf.S2CPlayerBaseInfoSync;

        /**
         * Creates a plain object from a S2CPlayerBaseInfoSync message. Also converts values to other types if specified.
         * @param message S2CPlayerBaseInfoSync
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.S2CPlayerBaseInfoSync, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this S2CPlayerBaseInfoSync to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a S2CPlayerExtInfoSync. */
    interface IS2CPlayerExtInfoSync {

        /** 扩展信息 * */
        info?: (protobuf.IExtInfo|null);
    }

    /** 玩家扩展信息同步(经常变化的数据) */
    class S2CPlayerExtInfoSync implements IS2CPlayerExtInfoSync {

        /**
         * Constructs a new S2CPlayerExtInfoSync.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IS2CPlayerExtInfoSync);

        /** 扩展信息 * */
        public info?: (protobuf.IExtInfo|null);

        /**
         * Creates a new S2CPlayerExtInfoSync instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2CPlayerExtInfoSync instance
         */
        public static create(properties?: protobuf.IS2CPlayerExtInfoSync): protobuf.S2CPlayerExtInfoSync;

        /**
         * Encodes the specified S2CPlayerExtInfoSync message. Does not implicitly {@link protobuf.S2CPlayerExtInfoSync.verify|verify} messages.
         * @param message S2CPlayerExtInfoSync message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IS2CPlayerExtInfoSync, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified S2CPlayerExtInfoSync message, length delimited. Does not implicitly {@link protobuf.S2CPlayerExtInfoSync.verify|verify} messages.
         * @param message S2CPlayerExtInfoSync message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IS2CPlayerExtInfoSync, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2CPlayerExtInfoSync message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns S2CPlayerExtInfoSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.S2CPlayerExtInfoSync;

        /**
         * Decodes a S2CPlayerExtInfoSync message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns S2CPlayerExtInfoSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.S2CPlayerExtInfoSync;

        /**
         * Verifies a S2CPlayerExtInfoSync message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a S2CPlayerExtInfoSync message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns S2CPlayerExtInfoSync
         */
        public static fromObject(object: { [k: string]: any }): protobuf.S2CPlayerExtInfoSync;

        /**
         * Creates a plain object from a S2CPlayerExtInfoSync message. Also converts values to other types if specified.
         * @param message S2CPlayerExtInfoSync
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.S2CPlayerExtInfoSync, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this S2CPlayerExtInfoSync to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2SPlayerRename. */
    interface IC2SPlayerRename {

        /** 新名字* */
        newName?: (string|null);
    }

    /** 改名 */
    class C2SPlayerRename implements IC2SPlayerRename {

        /**
         * Constructs a new C2SPlayerRename.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IC2SPlayerRename);

        /** 新名字* */
        public newName: string;

        /**
         * Creates a new C2SPlayerRename instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2SPlayerRename instance
         */
        public static create(properties?: protobuf.IC2SPlayerRename): protobuf.C2SPlayerRename;

        /**
         * Encodes the specified C2SPlayerRename message. Does not implicitly {@link protobuf.C2SPlayerRename.verify|verify} messages.
         * @param message C2SPlayerRename message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IC2SPlayerRename, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified C2SPlayerRename message, length delimited. Does not implicitly {@link protobuf.C2SPlayerRename.verify|verify} messages.
         * @param message C2SPlayerRename message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IC2SPlayerRename, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2SPlayerRename message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2SPlayerRename
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.C2SPlayerRename;

        /**
         * Decodes a C2SPlayerRename message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2SPlayerRename
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.C2SPlayerRename;

        /**
         * Verifies a C2SPlayerRename message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2SPlayerRename message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2SPlayerRename
         */
        public static fromObject(object: { [k: string]: any }): protobuf.C2SPlayerRename;

        /**
         * Creates a plain object from a C2SPlayerRename message. Also converts values to other types if specified.
         * @param message C2SPlayerRename
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.C2SPlayerRename, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2SPlayerRename to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a S2CPlayerRename. */
    interface IS2CPlayerRename {

        /** 已改名次数 */
        renameTimes?: (number|null);
    }

    /** 改名 */
    class S2CPlayerRename implements IS2CPlayerRename {

        /**
         * Constructs a new S2CPlayerRename.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IS2CPlayerRename);

        /** 已改名次数 */
        public renameTimes: number;

        /**
         * Creates a new S2CPlayerRename instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2CPlayerRename instance
         */
        public static create(properties?: protobuf.IS2CPlayerRename): protobuf.S2CPlayerRename;

        /**
         * Encodes the specified S2CPlayerRename message. Does not implicitly {@link protobuf.S2CPlayerRename.verify|verify} messages.
         * @param message S2CPlayerRename message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IS2CPlayerRename, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified S2CPlayerRename message, length delimited. Does not implicitly {@link protobuf.S2CPlayerRename.verify|verify} messages.
         * @param message S2CPlayerRename message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IS2CPlayerRename, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2CPlayerRename message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns S2CPlayerRename
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.S2CPlayerRename;

        /**
         * Decodes a S2CPlayerRename message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns S2CPlayerRename
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.S2CPlayerRename;

        /**
         * Verifies a S2CPlayerRename message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a S2CPlayerRename message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns S2CPlayerRename
         */
        public static fromObject(object: { [k: string]: any }): protobuf.S2CPlayerRename;

        /**
         * Creates a plain object from a S2CPlayerRename message. Also converts values to other types if specified.
         * @param message S2CPlayerRename
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.S2CPlayerRename, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this S2CPlayerRename to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2SPlayerModifyHead. */
    interface IC2SPlayerModifyHead {

        /** 修改类型 (op=1 修改头像  |op=2修改头像框) */
        op?: (number|null);

        /** 头像/头像框 */
        head?: (string|null);
    }

    /** 更换头像/头像框 */
    class C2SPlayerModifyHead implements IC2SPlayerModifyHead {

        /**
         * Constructs a new C2SPlayerModifyHead.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IC2SPlayerModifyHead);

        /** 修改类型 (op=1 修改头像  |op=2修改头像框) */
        public op: number;

        /** 头像/头像框 */
        public head: string;

        /**
         * Creates a new C2SPlayerModifyHead instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2SPlayerModifyHead instance
         */
        public static create(properties?: protobuf.IC2SPlayerModifyHead): protobuf.C2SPlayerModifyHead;

        /**
         * Encodes the specified C2SPlayerModifyHead message. Does not implicitly {@link protobuf.C2SPlayerModifyHead.verify|verify} messages.
         * @param message C2SPlayerModifyHead message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IC2SPlayerModifyHead, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified C2SPlayerModifyHead message, length delimited. Does not implicitly {@link protobuf.C2SPlayerModifyHead.verify|verify} messages.
         * @param message C2SPlayerModifyHead message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IC2SPlayerModifyHead, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2SPlayerModifyHead message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2SPlayerModifyHead
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.C2SPlayerModifyHead;

        /**
         * Decodes a C2SPlayerModifyHead message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2SPlayerModifyHead
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.C2SPlayerModifyHead;

        /**
         * Verifies a C2SPlayerModifyHead message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2SPlayerModifyHead message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2SPlayerModifyHead
         */
        public static fromObject(object: { [k: string]: any }): protobuf.C2SPlayerModifyHead;

        /**
         * Creates a plain object from a C2SPlayerModifyHead message. Also converts values to other types if specified.
         * @param message C2SPlayerModifyHead
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.C2SPlayerModifyHead, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2SPlayerModifyHead to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a S2CPlayerModifyHead. */
    interface IS2CPlayerModifyHead {
    }

    /** 更换头像/头像框 */
    class S2CPlayerModifyHead implements IS2CPlayerModifyHead {

        /**
         * Constructs a new S2CPlayerModifyHead.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IS2CPlayerModifyHead);

        /**
         * Creates a new S2CPlayerModifyHead instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2CPlayerModifyHead instance
         */
        public static create(properties?: protobuf.IS2CPlayerModifyHead): protobuf.S2CPlayerModifyHead;

        /**
         * Encodes the specified S2CPlayerModifyHead message. Does not implicitly {@link protobuf.S2CPlayerModifyHead.verify|verify} messages.
         * @param message S2CPlayerModifyHead message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IS2CPlayerModifyHead, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified S2CPlayerModifyHead message, length delimited. Does not implicitly {@link protobuf.S2CPlayerModifyHead.verify|verify} messages.
         * @param message S2CPlayerModifyHead message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IS2CPlayerModifyHead, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2CPlayerModifyHead message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns S2CPlayerModifyHead
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.S2CPlayerModifyHead;

        /**
         * Decodes a S2CPlayerModifyHead message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns S2CPlayerModifyHead
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.S2CPlayerModifyHead;

        /**
         * Verifies a S2CPlayerModifyHead message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a S2CPlayerModifyHead message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns S2CPlayerModifyHead
         */
        public static fromObject(object: { [k: string]: any }): protobuf.S2CPlayerModifyHead;

        /**
         * Creates a plain object from a S2CPlayerModifyHead message. Also converts values to other types if specified.
         * @param message S2CPlayerModifyHead
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.S2CPlayerModifyHead, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this S2CPlayerModifyHead to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2SPlayerInfoUpdate. */
    interface IC2SPlayerInfoUpdate {

        /** 平台头像 */
        platFormHead?: (string|null);
    }

    /** 玩家信息更新 */
    class C2SPlayerInfoUpdate implements IC2SPlayerInfoUpdate {

        /**
         * Constructs a new C2SPlayerInfoUpdate.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IC2SPlayerInfoUpdate);

        /** 平台头像 */
        public platFormHead: string;

        /**
         * Creates a new C2SPlayerInfoUpdate instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2SPlayerInfoUpdate instance
         */
        public static create(properties?: protobuf.IC2SPlayerInfoUpdate): protobuf.C2SPlayerInfoUpdate;

        /**
         * Encodes the specified C2SPlayerInfoUpdate message. Does not implicitly {@link protobuf.C2SPlayerInfoUpdate.verify|verify} messages.
         * @param message C2SPlayerInfoUpdate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IC2SPlayerInfoUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified C2SPlayerInfoUpdate message, length delimited. Does not implicitly {@link protobuf.C2SPlayerInfoUpdate.verify|verify} messages.
         * @param message C2SPlayerInfoUpdate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IC2SPlayerInfoUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2SPlayerInfoUpdate message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2SPlayerInfoUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.C2SPlayerInfoUpdate;

        /**
         * Decodes a C2SPlayerInfoUpdate message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2SPlayerInfoUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.C2SPlayerInfoUpdate;

        /**
         * Verifies a C2SPlayerInfoUpdate message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2SPlayerInfoUpdate message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2SPlayerInfoUpdate
         */
        public static fromObject(object: { [k: string]: any }): protobuf.C2SPlayerInfoUpdate;

        /**
         * Creates a plain object from a C2SPlayerInfoUpdate message. Also converts values to other types if specified.
         * @param message C2SPlayerInfoUpdate
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.C2SPlayerInfoUpdate, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2SPlayerInfoUpdate to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a S2CPlayerInfoUpdate. */
    interface IS2CPlayerInfoUpdate {
    }

    /** Represents a S2CPlayerInfoUpdate. */
    class S2CPlayerInfoUpdate implements IS2CPlayerInfoUpdate {

        /**
         * Constructs a new S2CPlayerInfoUpdate.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IS2CPlayerInfoUpdate);

        /**
         * Creates a new S2CPlayerInfoUpdate instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2CPlayerInfoUpdate instance
         */
        public static create(properties?: protobuf.IS2CPlayerInfoUpdate): protobuf.S2CPlayerInfoUpdate;

        /**
         * Encodes the specified S2CPlayerInfoUpdate message. Does not implicitly {@link protobuf.S2CPlayerInfoUpdate.verify|verify} messages.
         * @param message S2CPlayerInfoUpdate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IS2CPlayerInfoUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified S2CPlayerInfoUpdate message, length delimited. Does not implicitly {@link protobuf.S2CPlayerInfoUpdate.verify|verify} messages.
         * @param message S2CPlayerInfoUpdate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IS2CPlayerInfoUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2CPlayerInfoUpdate message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns S2CPlayerInfoUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.S2CPlayerInfoUpdate;

        /**
         * Decodes a S2CPlayerInfoUpdate message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns S2CPlayerInfoUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.S2CPlayerInfoUpdate;

        /**
         * Verifies a S2CPlayerInfoUpdate message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a S2CPlayerInfoUpdate message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns S2CPlayerInfoUpdate
         */
        public static fromObject(object: { [k: string]: any }): protobuf.S2CPlayerInfoUpdate;

        /**
         * Creates a plain object from a S2CPlayerInfoUpdate message. Also converts values to other types if specified.
         * @param message S2CPlayerInfoUpdate
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.S2CPlayerInfoUpdate, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this S2CPlayerInfoUpdate to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RewardStatus. */
    interface IRewardStatus {

        /** 奖励对应RefId */
        refId?: (string|null);

        /** 领取状态(0-不可领取, 1-可领取，2-已领取) */
        status?: (number|null);
    }

    /** 奖励 */
    class RewardStatus implements IRewardStatus {

        /**
         * Constructs a new RewardStatus.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IRewardStatus);

        /** 奖励对应RefId */
        public refId: string;

        /** 领取状态(0-不可领取, 1-可领取，2-已领取) */
        public status: number;

        /**
         * Creates a new RewardStatus instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RewardStatus instance
         */
        public static create(properties?: protobuf.IRewardStatus): protobuf.RewardStatus;

        /**
         * Encodes the specified RewardStatus message. Does not implicitly {@link protobuf.RewardStatus.verify|verify} messages.
         * @param message RewardStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IRewardStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RewardStatus message, length delimited. Does not implicitly {@link protobuf.RewardStatus.verify|verify} messages.
         * @param message RewardStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IRewardStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RewardStatus message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RewardStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.RewardStatus;

        /**
         * Decodes a RewardStatus message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RewardStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.RewardStatus;

        /**
         * Verifies a RewardStatus message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RewardStatus message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RewardStatus
         */
        public static fromObject(object: { [k: string]: any }): protobuf.RewardStatus;

        /**
         * Creates a plain object from a RewardStatus message. Also converts values to other types if specified.
         * @param message RewardStatus
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.RewardStatus, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RewardStatus to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a C2SMessage. */
    interface IC2SMessage {

        /** 命令id */
        cmdId?: (number|null);

        /** 消息包索引 */
        ind?: (number|null);

        /** 消息签名 */
        sign?: (string|null);

        /** 玩家账号 */
        lid?: (string|null);

        /** cmd数据 */
        data?: (Uint8Array|null);
    }

    /** Represents a C2SMessage. */
    class C2SMessage implements IC2SMessage {

        /**
         * Constructs a new C2SMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IC2SMessage);

        /** 命令id */
        public cmdId: number;

        /** 消息包索引 */
        public ind: number;

        /** 消息签名 */
        public sign: string;

        /** 玩家账号 */
        public lid: string;

        /** cmd数据 */
        public data: Uint8Array;

        /**
         * Creates a new C2SMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns C2SMessage instance
         */
        public static create(properties?: protobuf.IC2SMessage): protobuf.C2SMessage;

        /**
         * Encodes the specified C2SMessage message. Does not implicitly {@link protobuf.C2SMessage.verify|verify} messages.
         * @param message C2SMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IC2SMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified C2SMessage message, length delimited. Does not implicitly {@link protobuf.C2SMessage.verify|verify} messages.
         * @param message C2SMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IC2SMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a C2SMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns C2SMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.C2SMessage;

        /**
         * Decodes a C2SMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns C2SMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.C2SMessage;

        /**
         * Verifies a C2SMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a C2SMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns C2SMessage
         */
        public static fromObject(object: { [k: string]: any }): protobuf.C2SMessage;

        /**
         * Creates a plain object from a C2SMessage message. Also converts values to other types if specified.
         * @param message C2SMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.C2SMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this C2SMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a S2CMessage. */
    interface IS2CMessage {

        /** cmdid */
        cmdId?: (number|null);

        /** 是否压缩(0-不压缩，1-压缩) */
        compress?: (number|null);

        /** cmd实际数据 */
        data?: (Uint8Array|null);

        /** 错误提示语 */
        error?: (protobuf.IS2CPrompt|null);

        /** 成功提示语 */
        success?: (protobuf.IS2CPrompt|null);
    }

    /** Represents a S2CMessage. */
    class S2CMessage implements IS2CMessage {

        /**
         * Constructs a new S2CMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IS2CMessage);

        /** cmdid */
        public cmdId: number;

        /** 是否压缩(0-不压缩，1-压缩) */
        public compress: number;

        /** cmd实际数据 */
        public data: Uint8Array;

        /** 错误提示语 */
        public error?: (protobuf.IS2CPrompt|null);

        /** 成功提示语 */
        public success?: (protobuf.IS2CPrompt|null);

        /**
         * Creates a new S2CMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2CMessage instance
         */
        public static create(properties?: protobuf.IS2CMessage): protobuf.S2CMessage;

        /**
         * Encodes the specified S2CMessage message. Does not implicitly {@link protobuf.S2CMessage.verify|verify} messages.
         * @param message S2CMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IS2CMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified S2CMessage message, length delimited. Does not implicitly {@link protobuf.S2CMessage.verify|verify} messages.
         * @param message S2CMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IS2CMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2CMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns S2CMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.S2CMessage;

        /**
         * Decodes a S2CMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns S2CMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.S2CMessage;

        /**
         * Verifies a S2CMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a S2CMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns S2CMessage
         */
        public static fromObject(object: { [k: string]: any }): protobuf.S2CMessage;

        /**
         * Creates a plain object from a S2CMessage message. Also converts values to other types if specified.
         * @param message S2CMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.S2CMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this S2CMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a S2CPrompt. */
    interface IS2CPrompt {

        /** 飘字id * */
        code?: (number|null);

        /** 填充参数 * */
        args?: (string[]|null);
    }

    /** 提示语 */
    class S2CPrompt implements IS2CPrompt {

        /**
         * Constructs a new S2CPrompt.
         * @param [properties] Properties to set
         */
        constructor(properties?: protobuf.IS2CPrompt);

        /** 飘字id * */
        public code: number;

        /** 填充参数 * */
        public args: string[];

        /**
         * Creates a new S2CPrompt instance using the specified properties.
         * @param [properties] Properties to set
         * @returns S2CPrompt instance
         */
        public static create(properties?: protobuf.IS2CPrompt): protobuf.S2CPrompt;

        /**
         * Encodes the specified S2CPrompt message. Does not implicitly {@link protobuf.S2CPrompt.verify|verify} messages.
         * @param message S2CPrompt message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protobuf.IS2CPrompt, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified S2CPrompt message, length delimited. Does not implicitly {@link protobuf.S2CPrompt.verify|verify} messages.
         * @param message S2CPrompt message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protobuf.IS2CPrompt, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a S2CPrompt message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns S2CPrompt
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protobuf.S2CPrompt;

        /**
         * Decodes a S2CPrompt message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns S2CPrompt
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protobuf.S2CPrompt;

        /**
         * Verifies a S2CPrompt message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a S2CPrompt message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns S2CPrompt
         */
        public static fromObject(object: { [k: string]: any }): protobuf.S2CPrompt;

        /**
         * Creates a plain object from a S2CPrompt message. Also converts values to other types if specified.
         * @param message S2CPrompt
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protobuf.S2CPrompt, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this S2CPrompt to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
