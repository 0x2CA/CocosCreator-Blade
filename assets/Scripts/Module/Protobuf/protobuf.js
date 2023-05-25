/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = protobuf; //require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.protobuf = (function() {

    /**
     * Namespace protobuf.
     * @exports protobuf
     * @namespace
     */
    var protobuf = {};

    protobuf.C2SServerTime = (function() {

        /**
         * Properties of a C2SServerTime.
         * @memberof protobuf
         * @interface IC2SServerTime
         */

        /**
         * Constructs a new C2SServerTime.
         * @memberof protobuf
         * @classdesc 请求服务器时间
         * @implements IC2SServerTime
         * @constructor
         * @param {protobuf.IC2SServerTime=} [properties] Properties to set
         */
        function C2SServerTime(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new C2SServerTime instance using the specified properties.
         * @function create
         * @memberof protobuf.C2SServerTime
         * @static
         * @param {protobuf.IC2SServerTime=} [properties] Properties to set
         * @returns {protobuf.C2SServerTime} C2SServerTime instance
         */
        C2SServerTime.create = function create(properties) {
            return new C2SServerTime(properties);
        };

        /**
         * Encodes the specified C2SServerTime message. Does not implicitly {@link protobuf.C2SServerTime.verify|verify} messages.
         * @function encode
         * @memberof protobuf.C2SServerTime
         * @static
         * @param {protobuf.IC2SServerTime} message C2SServerTime message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SServerTime.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified C2SServerTime message, length delimited. Does not implicitly {@link protobuf.C2SServerTime.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.C2SServerTime
         * @static
         * @param {protobuf.IC2SServerTime} message C2SServerTime message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SServerTime.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2SServerTime message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.C2SServerTime
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.C2SServerTime} C2SServerTime
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SServerTime.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.C2SServerTime();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2SServerTime message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.C2SServerTime
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.C2SServerTime} C2SServerTime
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SServerTime.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2SServerTime message.
         * @function verify
         * @memberof protobuf.C2SServerTime
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2SServerTime.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a C2SServerTime message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.C2SServerTime
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.C2SServerTime} C2SServerTime
         */
        C2SServerTime.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.C2SServerTime)
                return object;
            return new $root.protobuf.C2SServerTime();
        };

        /**
         * Creates a plain object from a C2SServerTime message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.C2SServerTime
         * @static
         * @param {protobuf.C2SServerTime} message C2SServerTime
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        C2SServerTime.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this C2SServerTime to JSON.
         * @function toJSON
         * @memberof protobuf.C2SServerTime
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        C2SServerTime.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return C2SServerTime;
    })();

    protobuf.S2CServerTime = (function() {

        /**
         * Properties of a S2CServerTime.
         * @memberof protobuf
         * @interface IS2CServerTime
         * @property {number|Long|null} [serverTime] 服务端器当前时间戳
         */

        /**
         * Constructs a new S2CServerTime.
         * @memberof protobuf
         * @classdesc Represents a S2CServerTime.
         * @implements IS2CServerTime
         * @constructor
         * @param {protobuf.IS2CServerTime=} [properties] Properties to set
         */
        function S2CServerTime(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * 服务端器当前时间戳
         * @member {number|Long} serverTime
         * @memberof protobuf.S2CServerTime
         * @instance
         */
        S2CServerTime.prototype.serverTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new S2CServerTime instance using the specified properties.
         * @function create
         * @memberof protobuf.S2CServerTime
         * @static
         * @param {protobuf.IS2CServerTime=} [properties] Properties to set
         * @returns {protobuf.S2CServerTime} S2CServerTime instance
         */
        S2CServerTime.create = function create(properties) {
            return new S2CServerTime(properties);
        };

        /**
         * Encodes the specified S2CServerTime message. Does not implicitly {@link protobuf.S2CServerTime.verify|verify} messages.
         * @function encode
         * @memberof protobuf.S2CServerTime
         * @static
         * @param {protobuf.IS2CServerTime} message S2CServerTime message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CServerTime.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.serverTime != null && Object.hasOwnProperty.call(message, "serverTime"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.serverTime);
            return writer;
        };

        /**
         * Encodes the specified S2CServerTime message, length delimited. Does not implicitly {@link protobuf.S2CServerTime.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.S2CServerTime
         * @static
         * @param {protobuf.IS2CServerTime} message S2CServerTime message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CServerTime.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a S2CServerTime message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.S2CServerTime
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.S2CServerTime} S2CServerTime
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CServerTime.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.S2CServerTime();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.serverTime = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a S2CServerTime message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.S2CServerTime
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.S2CServerTime} S2CServerTime
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CServerTime.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a S2CServerTime message.
         * @function verify
         * @memberof protobuf.S2CServerTime
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        S2CServerTime.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                if (!$util.isInteger(message.serverTime) && !(message.serverTime && $util.isInteger(message.serverTime.low) && $util.isInteger(message.serverTime.high)))
                    return "serverTime: integer|Long expected";
            return null;
        };

        /**
         * Creates a S2CServerTime message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.S2CServerTime
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.S2CServerTime} S2CServerTime
         */
        S2CServerTime.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.S2CServerTime)
                return object;
            var message = new $root.protobuf.S2CServerTime();
            if (object.serverTime != null)
                if ($util.Long)
                    (message.serverTime = $util.Long.fromValue(object.serverTime)).unsigned = false;
                else if (typeof object.serverTime === "string")
                    message.serverTime = parseInt(object.serverTime, 10);
                else if (typeof object.serverTime === "number")
                    message.serverTime = object.serverTime;
                else if (typeof object.serverTime === "object")
                    message.serverTime = new $util.LongBits(object.serverTime.low >>> 0, object.serverTime.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a S2CServerTime message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.S2CServerTime
         * @static
         * @param {protobuf.S2CServerTime} message S2CServerTime
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        S2CServerTime.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.serverTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.serverTime = options.longs === String ? "0" : 0;
            if (message.serverTime != null && message.hasOwnProperty("serverTime"))
                if (typeof message.serverTime === "number")
                    object.serverTime = options.longs === String ? String(message.serverTime) : message.serverTime;
                else
                    object.serverTime = options.longs === String ? $util.Long.prototype.toString.call(message.serverTime) : options.longs === Number ? new $util.LongBits(message.serverTime.low >>> 0, message.serverTime.high >>> 0).toNumber() : message.serverTime;
            return object;
        };

        /**
         * Converts this S2CServerTime to JSON.
         * @function toJSON
         * @memberof protobuf.S2CServerTime
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        S2CServerTime.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return S2CServerTime;
    })();

    protobuf.C2SHeartBeate = (function() {

        /**
         * Properties of a C2SHeartBeate.
         * @memberof protobuf
         * @interface IC2SHeartBeate
         */

        /**
         * Constructs a new C2SHeartBeate.
         * @memberof protobuf
         * @classdesc 心跳
         * @implements IC2SHeartBeate
         * @constructor
         * @param {protobuf.IC2SHeartBeate=} [properties] Properties to set
         */
        function C2SHeartBeate(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new C2SHeartBeate instance using the specified properties.
         * @function create
         * @memberof protobuf.C2SHeartBeate
         * @static
         * @param {protobuf.IC2SHeartBeate=} [properties] Properties to set
         * @returns {protobuf.C2SHeartBeate} C2SHeartBeate instance
         */
        C2SHeartBeate.create = function create(properties) {
            return new C2SHeartBeate(properties);
        };

        /**
         * Encodes the specified C2SHeartBeate message. Does not implicitly {@link protobuf.C2SHeartBeate.verify|verify} messages.
         * @function encode
         * @memberof protobuf.C2SHeartBeate
         * @static
         * @param {protobuf.IC2SHeartBeate} message C2SHeartBeate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SHeartBeate.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified C2SHeartBeate message, length delimited. Does not implicitly {@link protobuf.C2SHeartBeate.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.C2SHeartBeate
         * @static
         * @param {protobuf.IC2SHeartBeate} message C2SHeartBeate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SHeartBeate.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2SHeartBeate message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.C2SHeartBeate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.C2SHeartBeate} C2SHeartBeate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SHeartBeate.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.C2SHeartBeate();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2SHeartBeate message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.C2SHeartBeate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.C2SHeartBeate} C2SHeartBeate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SHeartBeate.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2SHeartBeate message.
         * @function verify
         * @memberof protobuf.C2SHeartBeate
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2SHeartBeate.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a C2SHeartBeate message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.C2SHeartBeate
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.C2SHeartBeate} C2SHeartBeate
         */
        C2SHeartBeate.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.C2SHeartBeate)
                return object;
            return new $root.protobuf.C2SHeartBeate();
        };

        /**
         * Creates a plain object from a C2SHeartBeate message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.C2SHeartBeate
         * @static
         * @param {protobuf.C2SHeartBeate} message C2SHeartBeate
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        C2SHeartBeate.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this C2SHeartBeate to JSON.
         * @function toJSON
         * @memberof protobuf.C2SHeartBeate
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        C2SHeartBeate.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return C2SHeartBeate;
    })();

    protobuf.S2CHeartBeate = (function() {

        /**
         * Properties of a S2CHeartBeate.
         * @memberof protobuf
         * @interface IS2CHeartBeate
         */

        /**
         * Constructs a new S2CHeartBeate.
         * @memberof protobuf
         * @classdesc Represents a S2CHeartBeate.
         * @implements IS2CHeartBeate
         * @constructor
         * @param {protobuf.IS2CHeartBeate=} [properties] Properties to set
         */
        function S2CHeartBeate(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new S2CHeartBeate instance using the specified properties.
         * @function create
         * @memberof protobuf.S2CHeartBeate
         * @static
         * @param {protobuf.IS2CHeartBeate=} [properties] Properties to set
         * @returns {protobuf.S2CHeartBeate} S2CHeartBeate instance
         */
        S2CHeartBeate.create = function create(properties) {
            return new S2CHeartBeate(properties);
        };

        /**
         * Encodes the specified S2CHeartBeate message. Does not implicitly {@link protobuf.S2CHeartBeate.verify|verify} messages.
         * @function encode
         * @memberof protobuf.S2CHeartBeate
         * @static
         * @param {protobuf.IS2CHeartBeate} message S2CHeartBeate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CHeartBeate.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified S2CHeartBeate message, length delimited. Does not implicitly {@link protobuf.S2CHeartBeate.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.S2CHeartBeate
         * @static
         * @param {protobuf.IS2CHeartBeate} message S2CHeartBeate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CHeartBeate.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a S2CHeartBeate message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.S2CHeartBeate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.S2CHeartBeate} S2CHeartBeate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CHeartBeate.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.S2CHeartBeate();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a S2CHeartBeate message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.S2CHeartBeate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.S2CHeartBeate} S2CHeartBeate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CHeartBeate.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a S2CHeartBeate message.
         * @function verify
         * @memberof protobuf.S2CHeartBeate
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        S2CHeartBeate.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a S2CHeartBeate message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.S2CHeartBeate
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.S2CHeartBeate} S2CHeartBeate
         */
        S2CHeartBeate.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.S2CHeartBeate)
                return object;
            return new $root.protobuf.S2CHeartBeate();
        };

        /**
         * Creates a plain object from a S2CHeartBeate message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.S2CHeartBeate
         * @static
         * @param {protobuf.S2CHeartBeate} message S2CHeartBeate
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        S2CHeartBeate.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this S2CHeartBeate to JSON.
         * @function toJSON
         * @memberof protobuf.S2CHeartBeate
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        S2CHeartBeate.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return S2CHeartBeate;
    })();

    protobuf.C2SAuth = (function() {

        /**
         * Properties of a C2SAuth.
         * @memberof protobuf
         * @interface IC2SAuth
         * @property {string|null} [identityId] C2SAuth identityId
         * @property {string|null} [identityName] C2SAuth identityName
         * @property {number|Long|null} [timeStamp] C2SAuth timeStamp
         * @property {string|null} [userId] 渠道用户ID
         * @property {number|null} [platformId] 平台ID
         * @property {number|null} [channelId] 渠道ID
         */

        /**
         * Constructs a new C2SAuth.
         * @memberof protobuf
         * @classdesc 玩家校验请求
         * @implements IC2SAuth
         * @constructor
         * @param {protobuf.IC2SAuth=} [properties] Properties to set
         */
        function C2SAuth(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * C2SAuth identityId.
         * @member {string} identityId
         * @memberof protobuf.C2SAuth
         * @instance
         */
        C2SAuth.prototype.identityId = "";

        /**
         * C2SAuth identityName.
         * @member {string} identityName
         * @memberof protobuf.C2SAuth
         * @instance
         */
        C2SAuth.prototype.identityName = "";

        /**
         * C2SAuth timeStamp.
         * @member {number|Long} timeStamp
         * @memberof protobuf.C2SAuth
         * @instance
         */
        C2SAuth.prototype.timeStamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * 渠道用户ID
         * @member {string} userId
         * @memberof protobuf.C2SAuth
         * @instance
         */
        C2SAuth.prototype.userId = "";

        /**
         * 平台ID
         * @member {number} platformId
         * @memberof protobuf.C2SAuth
         * @instance
         */
        C2SAuth.prototype.platformId = 0;

        /**
         * 渠道ID
         * @member {number} channelId
         * @memberof protobuf.C2SAuth
         * @instance
         */
        C2SAuth.prototype.channelId = 0;

        /**
         * Creates a new C2SAuth instance using the specified properties.
         * @function create
         * @memberof protobuf.C2SAuth
         * @static
         * @param {protobuf.IC2SAuth=} [properties] Properties to set
         * @returns {protobuf.C2SAuth} C2SAuth instance
         */
        C2SAuth.create = function create(properties) {
            return new C2SAuth(properties);
        };

        /**
         * Encodes the specified C2SAuth message. Does not implicitly {@link protobuf.C2SAuth.verify|verify} messages.
         * @function encode
         * @memberof protobuf.C2SAuth
         * @static
         * @param {protobuf.IC2SAuth} message C2SAuth message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SAuth.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.identityId != null && Object.hasOwnProperty.call(message, "identityId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.identityId);
            if (message.identityName != null && Object.hasOwnProperty.call(message, "identityName"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.identityName);
            if (message.timeStamp != null && Object.hasOwnProperty.call(message, "timeStamp"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.timeStamp);
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.userId);
            if (message.platformId != null && Object.hasOwnProperty.call(message, "platformId"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.platformId);
            if (message.channelId != null && Object.hasOwnProperty.call(message, "channelId"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.channelId);
            return writer;
        };

        /**
         * Encodes the specified C2SAuth message, length delimited. Does not implicitly {@link protobuf.C2SAuth.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.C2SAuth
         * @static
         * @param {protobuf.IC2SAuth} message C2SAuth message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SAuth.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2SAuth message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.C2SAuth
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.C2SAuth} C2SAuth
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SAuth.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.C2SAuth();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.identityId = reader.string();
                    break;
                case 2:
                    message.identityName = reader.string();
                    break;
                case 3:
                    message.timeStamp = reader.int64();
                    break;
                case 4:
                    message.userId = reader.string();
                    break;
                case 5:
                    message.platformId = reader.int32();
                    break;
                case 6:
                    message.channelId = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2SAuth message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.C2SAuth
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.C2SAuth} C2SAuth
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SAuth.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2SAuth message.
         * @function verify
         * @memberof protobuf.C2SAuth
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2SAuth.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.identityId != null && message.hasOwnProperty("identityId"))
                if (!$util.isString(message.identityId))
                    return "identityId: string expected";
            if (message.identityName != null && message.hasOwnProperty("identityName"))
                if (!$util.isString(message.identityName))
                    return "identityName: string expected";
            if (message.timeStamp != null && message.hasOwnProperty("timeStamp"))
                if (!$util.isInteger(message.timeStamp) && !(message.timeStamp && $util.isInteger(message.timeStamp.low) && $util.isInteger(message.timeStamp.high)))
                    return "timeStamp: integer|Long expected";
            if (message.userId != null && message.hasOwnProperty("userId"))
                if (!$util.isString(message.userId))
                    return "userId: string expected";
            if (message.platformId != null && message.hasOwnProperty("platformId"))
                if (!$util.isInteger(message.platformId))
                    return "platformId: integer expected";
            if (message.channelId != null && message.hasOwnProperty("channelId"))
                if (!$util.isInteger(message.channelId))
                    return "channelId: integer expected";
            return null;
        };

        /**
         * Creates a C2SAuth message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.C2SAuth
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.C2SAuth} C2SAuth
         */
        C2SAuth.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.C2SAuth)
                return object;
            var message = new $root.protobuf.C2SAuth();
            if (object.identityId != null)
                message.identityId = String(object.identityId);
            if (object.identityName != null)
                message.identityName = String(object.identityName);
            if (object.timeStamp != null)
                if ($util.Long)
                    (message.timeStamp = $util.Long.fromValue(object.timeStamp)).unsigned = false;
                else if (typeof object.timeStamp === "string")
                    message.timeStamp = parseInt(object.timeStamp, 10);
                else if (typeof object.timeStamp === "number")
                    message.timeStamp = object.timeStamp;
                else if (typeof object.timeStamp === "object")
                    message.timeStamp = new $util.LongBits(object.timeStamp.low >>> 0, object.timeStamp.high >>> 0).toNumber();
            if (object.userId != null)
                message.userId = String(object.userId);
            if (object.platformId != null)
                message.platformId = object.platformId | 0;
            if (object.channelId != null)
                message.channelId = object.channelId | 0;
            return message;
        };

        /**
         * Creates a plain object from a C2SAuth message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.C2SAuth
         * @static
         * @param {protobuf.C2SAuth} message C2SAuth
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        C2SAuth.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.identityId = "";
                object.identityName = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.timeStamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.timeStamp = options.longs === String ? "0" : 0;
                object.userId = "";
                object.platformId = 0;
                object.channelId = 0;
            }
            if (message.identityId != null && message.hasOwnProperty("identityId"))
                object.identityId = message.identityId;
            if (message.identityName != null && message.hasOwnProperty("identityName"))
                object.identityName = message.identityName;
            if (message.timeStamp != null && message.hasOwnProperty("timeStamp"))
                if (typeof message.timeStamp === "number")
                    object.timeStamp = options.longs === String ? String(message.timeStamp) : message.timeStamp;
                else
                    object.timeStamp = options.longs === String ? $util.Long.prototype.toString.call(message.timeStamp) : options.longs === Number ? new $util.LongBits(message.timeStamp.low >>> 0, message.timeStamp.high >>> 0).toNumber() : message.timeStamp;
            if (message.userId != null && message.hasOwnProperty("userId"))
                object.userId = message.userId;
            if (message.platformId != null && message.hasOwnProperty("platformId"))
                object.platformId = message.platformId;
            if (message.channelId != null && message.hasOwnProperty("channelId"))
                object.channelId = message.channelId;
            return object;
        };

        /**
         * Converts this C2SAuth to JSON.
         * @function toJSON
         * @memberof protobuf.C2SAuth
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        C2SAuth.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return C2SAuth;
    })();

    protobuf.S2CAuth = (function() {

        /**
         * Properties of a S2CAuth.
         * @memberof protobuf
         * @interface IS2CAuth
         * @property {number|null} [state] 验证结果标识: 0:表示.身份合法.验证成功 1:表示.非法请求.时戳过期 2:表示.非法请求.md5校验失败 3:表示.非法请求.参数错误
         */

        /**
         * Constructs a new S2CAuth.
         * @memberof protobuf
         * @classdesc Represents a S2CAuth.
         * @implements IS2CAuth
         * @constructor
         * @param {protobuf.IS2CAuth=} [properties] Properties to set
         */
        function S2CAuth(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * 验证结果标识: 0:表示.身份合法.验证成功 1:表示.非法请求.时戳过期 2:表示.非法请求.md5校验失败 3:表示.非法请求.参数错误
         * @member {number} state
         * @memberof protobuf.S2CAuth
         * @instance
         */
        S2CAuth.prototype.state = 0;

        /**
         * Creates a new S2CAuth instance using the specified properties.
         * @function create
         * @memberof protobuf.S2CAuth
         * @static
         * @param {protobuf.IS2CAuth=} [properties] Properties to set
         * @returns {protobuf.S2CAuth} S2CAuth instance
         */
        S2CAuth.create = function create(properties) {
            return new S2CAuth(properties);
        };

        /**
         * Encodes the specified S2CAuth message. Does not implicitly {@link protobuf.S2CAuth.verify|verify} messages.
         * @function encode
         * @memberof protobuf.S2CAuth
         * @static
         * @param {protobuf.IS2CAuth} message S2CAuth message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CAuth.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.state != null && Object.hasOwnProperty.call(message, "state"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.state);
            return writer;
        };

        /**
         * Encodes the specified S2CAuth message, length delimited. Does not implicitly {@link protobuf.S2CAuth.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.S2CAuth
         * @static
         * @param {protobuf.IS2CAuth} message S2CAuth message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CAuth.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a S2CAuth message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.S2CAuth
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.S2CAuth} S2CAuth
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CAuth.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.S2CAuth();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.state = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a S2CAuth message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.S2CAuth
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.S2CAuth} S2CAuth
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CAuth.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a S2CAuth message.
         * @function verify
         * @memberof protobuf.S2CAuth
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        S2CAuth.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.state != null && message.hasOwnProperty("state"))
                if (!$util.isInteger(message.state))
                    return "state: integer expected";
            return null;
        };

        /**
         * Creates a S2CAuth message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.S2CAuth
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.S2CAuth} S2CAuth
         */
        S2CAuth.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.S2CAuth)
                return object;
            var message = new $root.protobuf.S2CAuth();
            if (object.state != null)
                message.state = object.state | 0;
            return message;
        };

        /**
         * Creates a plain object from a S2CAuth message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.S2CAuth
         * @static
         * @param {protobuf.S2CAuth} message S2CAuth
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        S2CAuth.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.state = 0;
            if (message.state != null && message.hasOwnProperty("state"))
                object.state = message.state;
            return object;
        };

        /**
         * Converts this S2CAuth to JSON.
         * @function toJSON
         * @memberof protobuf.S2CAuth
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        S2CAuth.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return S2CAuth;
    })();

    protobuf.C2SDebug = (function() {

        /**
         * Properties of a C2SDebug.
         * @memberof protobuf
         * @interface IC2SDebug
         * @property {string|null} [commandStr] C2SDebug commandStr
         */

        /**
         * Constructs a new C2SDebug.
         * @memberof protobuf
         * @classdesc Represents a C2SDebug.
         * @implements IC2SDebug
         * @constructor
         * @param {protobuf.IC2SDebug=} [properties] Properties to set
         */
        function C2SDebug(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * C2SDebug commandStr.
         * @member {string} commandStr
         * @memberof protobuf.C2SDebug
         * @instance
         */
        C2SDebug.prototype.commandStr = "";

        /**
         * Creates a new C2SDebug instance using the specified properties.
         * @function create
         * @memberof protobuf.C2SDebug
         * @static
         * @param {protobuf.IC2SDebug=} [properties] Properties to set
         * @returns {protobuf.C2SDebug} C2SDebug instance
         */
        C2SDebug.create = function create(properties) {
            return new C2SDebug(properties);
        };

        /**
         * Encodes the specified C2SDebug message. Does not implicitly {@link protobuf.C2SDebug.verify|verify} messages.
         * @function encode
         * @memberof protobuf.C2SDebug
         * @static
         * @param {protobuf.IC2SDebug} message C2SDebug message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SDebug.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.commandStr != null && Object.hasOwnProperty.call(message, "commandStr"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.commandStr);
            return writer;
        };

        /**
         * Encodes the specified C2SDebug message, length delimited. Does not implicitly {@link protobuf.C2SDebug.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.C2SDebug
         * @static
         * @param {protobuf.IC2SDebug} message C2SDebug message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SDebug.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2SDebug message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.C2SDebug
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.C2SDebug} C2SDebug
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SDebug.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.C2SDebug();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.commandStr = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2SDebug message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.C2SDebug
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.C2SDebug} C2SDebug
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SDebug.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2SDebug message.
         * @function verify
         * @memberof protobuf.C2SDebug
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2SDebug.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.commandStr != null && message.hasOwnProperty("commandStr"))
                if (!$util.isString(message.commandStr))
                    return "commandStr: string expected";
            return null;
        };

        /**
         * Creates a C2SDebug message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.C2SDebug
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.C2SDebug} C2SDebug
         */
        C2SDebug.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.C2SDebug)
                return object;
            var message = new $root.protobuf.C2SDebug();
            if (object.commandStr != null)
                message.commandStr = String(object.commandStr);
            return message;
        };

        /**
         * Creates a plain object from a C2SDebug message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.C2SDebug
         * @static
         * @param {protobuf.C2SDebug} message C2SDebug
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        C2SDebug.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.commandStr = "";
            if (message.commandStr != null && message.hasOwnProperty("commandStr"))
                object.commandStr = message.commandStr;
            return object;
        };

        /**
         * Converts this C2SDebug to JSON.
         * @function toJSON
         * @memberof protobuf.C2SDebug
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        C2SDebug.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return C2SDebug;
    })();

    protobuf.S2CDebug = (function() {

        /**
         * Properties of a S2CDebug.
         * @memberof protobuf
         * @interface IS2CDebug
         * @property {string|null} [result] S2CDebug result
         */

        /**
         * Constructs a new S2CDebug.
         * @memberof protobuf
         * @classdesc Represents a S2CDebug.
         * @implements IS2CDebug
         * @constructor
         * @param {protobuf.IS2CDebug=} [properties] Properties to set
         */
        function S2CDebug(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * S2CDebug result.
         * @member {string} result
         * @memberof protobuf.S2CDebug
         * @instance
         */
        S2CDebug.prototype.result = "";

        /**
         * Creates a new S2CDebug instance using the specified properties.
         * @function create
         * @memberof protobuf.S2CDebug
         * @static
         * @param {protobuf.IS2CDebug=} [properties] Properties to set
         * @returns {protobuf.S2CDebug} S2CDebug instance
         */
        S2CDebug.create = function create(properties) {
            return new S2CDebug(properties);
        };

        /**
         * Encodes the specified S2CDebug message. Does not implicitly {@link protobuf.S2CDebug.verify|verify} messages.
         * @function encode
         * @memberof protobuf.S2CDebug
         * @static
         * @param {protobuf.IS2CDebug} message S2CDebug message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CDebug.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.result != null && Object.hasOwnProperty.call(message, "result"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.result);
            return writer;
        };

        /**
         * Encodes the specified S2CDebug message, length delimited. Does not implicitly {@link protobuf.S2CDebug.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.S2CDebug
         * @static
         * @param {protobuf.IS2CDebug} message S2CDebug message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CDebug.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a S2CDebug message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.S2CDebug
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.S2CDebug} S2CDebug
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CDebug.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.S2CDebug();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.result = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a S2CDebug message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.S2CDebug
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.S2CDebug} S2CDebug
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CDebug.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a S2CDebug message.
         * @function verify
         * @memberof protobuf.S2CDebug
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        S2CDebug.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.result != null && message.hasOwnProperty("result"))
                if (!$util.isString(message.result))
                    return "result: string expected";
            return null;
        };

        /**
         * Creates a S2CDebug message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.S2CDebug
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.S2CDebug} S2CDebug
         */
        S2CDebug.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.S2CDebug)
                return object;
            var message = new $root.protobuf.S2CDebug();
            if (object.result != null)
                message.result = String(object.result);
            return message;
        };

        /**
         * Creates a plain object from a S2CDebug message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.S2CDebug
         * @static
         * @param {protobuf.S2CDebug} message S2CDebug
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        S2CDebug.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.result = "";
            if (message.result != null && message.hasOwnProperty("result"))
                object.result = message.result;
            return object;
        };

        /**
         * Converts this S2CDebug to JSON.
         * @function toJSON
         * @memberof protobuf.S2CDebug
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        S2CDebug.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return S2CDebug;
    })();

    protobuf.C2SGiftCodeExchange = (function() {

        /**
         * Properties of a C2SGiftCodeExchange.
         * @memberof protobuf
         * @interface IC2SGiftCodeExchange
         * @property {string|null} [code] 礼包码
         */

        /**
         * Constructs a new C2SGiftCodeExchange.
         * @memberof protobuf
         * @classdesc 兑换码
         * @implements IC2SGiftCodeExchange
         * @constructor
         * @param {protobuf.IC2SGiftCodeExchange=} [properties] Properties to set
         */
        function C2SGiftCodeExchange(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * 礼包码
         * @member {string} code
         * @memberof protobuf.C2SGiftCodeExchange
         * @instance
         */
        C2SGiftCodeExchange.prototype.code = "";

        /**
         * Creates a new C2SGiftCodeExchange instance using the specified properties.
         * @function create
         * @memberof protobuf.C2SGiftCodeExchange
         * @static
         * @param {protobuf.IC2SGiftCodeExchange=} [properties] Properties to set
         * @returns {protobuf.C2SGiftCodeExchange} C2SGiftCodeExchange instance
         */
        C2SGiftCodeExchange.create = function create(properties) {
            return new C2SGiftCodeExchange(properties);
        };

        /**
         * Encodes the specified C2SGiftCodeExchange message. Does not implicitly {@link protobuf.C2SGiftCodeExchange.verify|verify} messages.
         * @function encode
         * @memberof protobuf.C2SGiftCodeExchange
         * @static
         * @param {protobuf.IC2SGiftCodeExchange} message C2SGiftCodeExchange message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SGiftCodeExchange.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.code);
            return writer;
        };

        /**
         * Encodes the specified C2SGiftCodeExchange message, length delimited. Does not implicitly {@link protobuf.C2SGiftCodeExchange.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.C2SGiftCodeExchange
         * @static
         * @param {protobuf.IC2SGiftCodeExchange} message C2SGiftCodeExchange message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SGiftCodeExchange.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2SGiftCodeExchange message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.C2SGiftCodeExchange
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.C2SGiftCodeExchange} C2SGiftCodeExchange
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SGiftCodeExchange.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.C2SGiftCodeExchange();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.code = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2SGiftCodeExchange message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.C2SGiftCodeExchange
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.C2SGiftCodeExchange} C2SGiftCodeExchange
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SGiftCodeExchange.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2SGiftCodeExchange message.
         * @function verify
         * @memberof protobuf.C2SGiftCodeExchange
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2SGiftCodeExchange.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isString(message.code))
                    return "code: string expected";
            return null;
        };

        /**
         * Creates a C2SGiftCodeExchange message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.C2SGiftCodeExchange
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.C2SGiftCodeExchange} C2SGiftCodeExchange
         */
        C2SGiftCodeExchange.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.C2SGiftCodeExchange)
                return object;
            var message = new $root.protobuf.C2SGiftCodeExchange();
            if (object.code != null)
                message.code = String(object.code);
            return message;
        };

        /**
         * Creates a plain object from a C2SGiftCodeExchange message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.C2SGiftCodeExchange
         * @static
         * @param {protobuf.C2SGiftCodeExchange} message C2SGiftCodeExchange
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        C2SGiftCodeExchange.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.code = "";
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            return object;
        };

        /**
         * Converts this C2SGiftCodeExchange to JSON.
         * @function toJSON
         * @memberof protobuf.C2SGiftCodeExchange
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        C2SGiftCodeExchange.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return C2SGiftCodeExchange;
    })();

    protobuf.S2CGiftCodeExchange = (function() {

        /**
         * Properties of a S2CGiftCodeExchange.
         * @memberof protobuf
         * @interface IS2CGiftCodeExchange
         * @property {number|null} [code] 成功码
         * @property {string|null} [reward] 奖励
         */

        /**
         * Constructs a new S2CGiftCodeExchange.
         * @memberof protobuf
         * @classdesc Represents a S2CGiftCodeExchange.
         * @implements IS2CGiftCodeExchange
         * @constructor
         * @param {protobuf.IS2CGiftCodeExchange=} [properties] Properties to set
         */
        function S2CGiftCodeExchange(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * 成功码
         * @member {number} code
         * @memberof protobuf.S2CGiftCodeExchange
         * @instance
         */
        S2CGiftCodeExchange.prototype.code = 0;

        /**
         * 奖励
         * @member {string} reward
         * @memberof protobuf.S2CGiftCodeExchange
         * @instance
         */
        S2CGiftCodeExchange.prototype.reward = "";

        /**
         * Creates a new S2CGiftCodeExchange instance using the specified properties.
         * @function create
         * @memberof protobuf.S2CGiftCodeExchange
         * @static
         * @param {protobuf.IS2CGiftCodeExchange=} [properties] Properties to set
         * @returns {protobuf.S2CGiftCodeExchange} S2CGiftCodeExchange instance
         */
        S2CGiftCodeExchange.create = function create(properties) {
            return new S2CGiftCodeExchange(properties);
        };

        /**
         * Encodes the specified S2CGiftCodeExchange message. Does not implicitly {@link protobuf.S2CGiftCodeExchange.verify|verify} messages.
         * @function encode
         * @memberof protobuf.S2CGiftCodeExchange
         * @static
         * @param {protobuf.IS2CGiftCodeExchange} message S2CGiftCodeExchange message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CGiftCodeExchange.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.code);
            if (message.reward != null && Object.hasOwnProperty.call(message, "reward"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.reward);
            return writer;
        };

        /**
         * Encodes the specified S2CGiftCodeExchange message, length delimited. Does not implicitly {@link protobuf.S2CGiftCodeExchange.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.S2CGiftCodeExchange
         * @static
         * @param {protobuf.IS2CGiftCodeExchange} message S2CGiftCodeExchange message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CGiftCodeExchange.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a S2CGiftCodeExchange message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.S2CGiftCodeExchange
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.S2CGiftCodeExchange} S2CGiftCodeExchange
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CGiftCodeExchange.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.S2CGiftCodeExchange();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.code = reader.int32();
                    break;
                case 2:
                    message.reward = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a S2CGiftCodeExchange message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.S2CGiftCodeExchange
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.S2CGiftCodeExchange} S2CGiftCodeExchange
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CGiftCodeExchange.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a S2CGiftCodeExchange message.
         * @function verify
         * @memberof protobuf.S2CGiftCodeExchange
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        S2CGiftCodeExchange.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.reward != null && message.hasOwnProperty("reward"))
                if (!$util.isString(message.reward))
                    return "reward: string expected";
            return null;
        };

        /**
         * Creates a S2CGiftCodeExchange message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.S2CGiftCodeExchange
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.S2CGiftCodeExchange} S2CGiftCodeExchange
         */
        S2CGiftCodeExchange.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.S2CGiftCodeExchange)
                return object;
            var message = new $root.protobuf.S2CGiftCodeExchange();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.reward != null)
                message.reward = String(object.reward);
            return message;
        };

        /**
         * Creates a plain object from a S2CGiftCodeExchange message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.S2CGiftCodeExchange
         * @static
         * @param {protobuf.S2CGiftCodeExchange} message S2CGiftCodeExchange
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        S2CGiftCodeExchange.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.code = 0;
                object.reward = "";
            }
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.reward != null && message.hasOwnProperty("reward"))
                object.reward = message.reward;
            return object;
        };

        /**
         * Converts this S2CGiftCodeExchange to JSON.
         * @function toJSON
         * @memberof protobuf.S2CGiftCodeExchange
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        S2CGiftCodeExchange.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return S2CGiftCodeExchange;
    })();

    protobuf.Item = (function() {

        /**
         * Properties of an Item.
         * @memberof protobuf
         * @interface IItem
         * @property {string|null} [refId] 道具refId
         * @property {number|null} [num] 道具数量
         */

        /**
         * Constructs a new Item.
         * @memberof protobuf
         * @classdesc 道具基本信息
         * @implements IItem
         * @constructor
         * @param {protobuf.IItem=} [properties] Properties to set
         */
        function Item(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * 道具refId
         * @member {string} refId
         * @memberof protobuf.Item
         * @instance
         */
        Item.prototype.refId = "";

        /**
         * 道具数量
         * @member {number} num
         * @memberof protobuf.Item
         * @instance
         */
        Item.prototype.num = 0;

        /**
         * Creates a new Item instance using the specified properties.
         * @function create
         * @memberof protobuf.Item
         * @static
         * @param {protobuf.IItem=} [properties] Properties to set
         * @returns {protobuf.Item} Item instance
         */
        Item.create = function create(properties) {
            return new Item(properties);
        };

        /**
         * Encodes the specified Item message. Does not implicitly {@link protobuf.Item.verify|verify} messages.
         * @function encode
         * @memberof protobuf.Item
         * @static
         * @param {protobuf.IItem} message Item message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Item.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.refId != null && Object.hasOwnProperty.call(message, "refId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.refId);
            if (message.num != null && Object.hasOwnProperty.call(message, "num"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.num);
            return writer;
        };

        /**
         * Encodes the specified Item message, length delimited. Does not implicitly {@link protobuf.Item.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.Item
         * @static
         * @param {protobuf.IItem} message Item message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Item.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Item message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.Item
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.Item} Item
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Item.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.Item();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.refId = reader.string();
                    break;
                case 2:
                    message.num = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Item message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.Item
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.Item} Item
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Item.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Item message.
         * @function verify
         * @memberof protobuf.Item
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Item.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.refId != null && message.hasOwnProperty("refId"))
                if (!$util.isString(message.refId))
                    return "refId: string expected";
            if (message.num != null && message.hasOwnProperty("num"))
                if (!$util.isInteger(message.num))
                    return "num: integer expected";
            return null;
        };

        /**
         * Creates an Item message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.Item
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.Item} Item
         */
        Item.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.Item)
                return object;
            var message = new $root.protobuf.Item();
            if (object.refId != null)
                message.refId = String(object.refId);
            if (object.num != null)
                message.num = object.num | 0;
            return message;
        };

        /**
         * Creates a plain object from an Item message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.Item
         * @static
         * @param {protobuf.Item} message Item
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Item.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.refId = "";
                object.num = 0;
            }
            if (message.refId != null && message.hasOwnProperty("refId"))
                object.refId = message.refId;
            if (message.num != null && message.hasOwnProperty("num"))
                object.num = message.num;
            return object;
        };

        /**
         * Converts this Item to JSON.
         * @function toJSON
         * @memberof protobuf.Item
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Item.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Item;
    })();

    protobuf.C2SItemBagSync = (function() {

        /**
         * Properties of a C2SItemBagSync.
         * @memberof protobuf
         * @interface IC2SItemBagSync
         */

        /**
         * Constructs a new C2SItemBagSync.
         * @memberof protobuf
         * @classdesc 请求背包数据
         * @implements IC2SItemBagSync
         * @constructor
         * @param {protobuf.IC2SItemBagSync=} [properties] Properties to set
         */
        function C2SItemBagSync(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new C2SItemBagSync instance using the specified properties.
         * @function create
         * @memberof protobuf.C2SItemBagSync
         * @static
         * @param {protobuf.IC2SItemBagSync=} [properties] Properties to set
         * @returns {protobuf.C2SItemBagSync} C2SItemBagSync instance
         */
        C2SItemBagSync.create = function create(properties) {
            return new C2SItemBagSync(properties);
        };

        /**
         * Encodes the specified C2SItemBagSync message. Does not implicitly {@link protobuf.C2SItemBagSync.verify|verify} messages.
         * @function encode
         * @memberof protobuf.C2SItemBagSync
         * @static
         * @param {protobuf.IC2SItemBagSync} message C2SItemBagSync message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SItemBagSync.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified C2SItemBagSync message, length delimited. Does not implicitly {@link protobuf.C2SItemBagSync.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.C2SItemBagSync
         * @static
         * @param {protobuf.IC2SItemBagSync} message C2SItemBagSync message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SItemBagSync.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2SItemBagSync message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.C2SItemBagSync
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.C2SItemBagSync} C2SItemBagSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SItemBagSync.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.C2SItemBagSync();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2SItemBagSync message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.C2SItemBagSync
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.C2SItemBagSync} C2SItemBagSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SItemBagSync.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2SItemBagSync message.
         * @function verify
         * @memberof protobuf.C2SItemBagSync
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2SItemBagSync.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a C2SItemBagSync message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.C2SItemBagSync
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.C2SItemBagSync} C2SItemBagSync
         */
        C2SItemBagSync.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.C2SItemBagSync)
                return object;
            return new $root.protobuf.C2SItemBagSync();
        };

        /**
         * Creates a plain object from a C2SItemBagSync message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.C2SItemBagSync
         * @static
         * @param {protobuf.C2SItemBagSync} message C2SItemBagSync
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        C2SItemBagSync.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this C2SItemBagSync to JSON.
         * @function toJSON
         * @memberof protobuf.C2SItemBagSync
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        C2SItemBagSync.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return C2SItemBagSync;
    })();

    protobuf.S2CItemBagSync = (function() {

        /**
         * Properties of a S2CItemBagSync.
         * @memberof protobuf
         * @interface IS2CItemBagSync
         * @property {number|null} [syncType] 同步类型 0-全部  1-增加 2-修改 3-删除
         * @property {Array.<protobuf.IItem>|null} [items] 玩家信息 *
         */

        /**
         * Constructs a new S2CItemBagSync.
         * @memberof protobuf
         * @classdesc 同步背包数据 *
         * @implements IS2CItemBagSync
         * @constructor
         * @param {protobuf.IS2CItemBagSync=} [properties] Properties to set
         */
        function S2CItemBagSync(properties) {
            this.items = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * 同步类型 0-全部  1-增加 2-修改 3-删除
         * @member {number} syncType
         * @memberof protobuf.S2CItemBagSync
         * @instance
         */
        S2CItemBagSync.prototype.syncType = 0;

        /**
         * 玩家信息 *
         * @member {Array.<protobuf.IItem>} items
         * @memberof protobuf.S2CItemBagSync
         * @instance
         */
        S2CItemBagSync.prototype.items = $util.emptyArray;

        /**
         * Creates a new S2CItemBagSync instance using the specified properties.
         * @function create
         * @memberof protobuf.S2CItemBagSync
         * @static
         * @param {protobuf.IS2CItemBagSync=} [properties] Properties to set
         * @returns {protobuf.S2CItemBagSync} S2CItemBagSync instance
         */
        S2CItemBagSync.create = function create(properties) {
            return new S2CItemBagSync(properties);
        };

        /**
         * Encodes the specified S2CItemBagSync message. Does not implicitly {@link protobuf.S2CItemBagSync.verify|verify} messages.
         * @function encode
         * @memberof protobuf.S2CItemBagSync
         * @static
         * @param {protobuf.IS2CItemBagSync} message S2CItemBagSync message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CItemBagSync.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.syncType != null && Object.hasOwnProperty.call(message, "syncType"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.syncType);
            if (message.items != null && message.items.length)
                for (var i = 0; i < message.items.length; ++i)
                    $root.protobuf.Item.encode(message.items[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified S2CItemBagSync message, length delimited. Does not implicitly {@link protobuf.S2CItemBagSync.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.S2CItemBagSync
         * @static
         * @param {protobuf.IS2CItemBagSync} message S2CItemBagSync message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CItemBagSync.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a S2CItemBagSync message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.S2CItemBagSync
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.S2CItemBagSync} S2CItemBagSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CItemBagSync.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.S2CItemBagSync();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.syncType = reader.int32();
                    break;
                case 2:
                    if (!(message.items && message.items.length))
                        message.items = [];
                    message.items.push($root.protobuf.Item.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a S2CItemBagSync message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.S2CItemBagSync
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.S2CItemBagSync} S2CItemBagSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CItemBagSync.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a S2CItemBagSync message.
         * @function verify
         * @memberof protobuf.S2CItemBagSync
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        S2CItemBagSync.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.syncType != null && message.hasOwnProperty("syncType"))
                if (!$util.isInteger(message.syncType))
                    return "syncType: integer expected";
            if (message.items != null && message.hasOwnProperty("items")) {
                if (!Array.isArray(message.items))
                    return "items: array expected";
                for (var i = 0; i < message.items.length; ++i) {
                    var error = $root.protobuf.Item.verify(message.items[i]);
                    if (error)
                        return "items." + error;
                }
            }
            return null;
        };

        /**
         * Creates a S2CItemBagSync message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.S2CItemBagSync
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.S2CItemBagSync} S2CItemBagSync
         */
        S2CItemBagSync.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.S2CItemBagSync)
                return object;
            var message = new $root.protobuf.S2CItemBagSync();
            if (object.syncType != null)
                message.syncType = object.syncType | 0;
            if (object.items) {
                if (!Array.isArray(object.items))
                    throw TypeError(".protobuf.S2CItemBagSync.items: array expected");
                message.items = [];
                for (var i = 0; i < object.items.length; ++i) {
                    if (typeof object.items[i] !== "object")
                        throw TypeError(".protobuf.S2CItemBagSync.items: object expected");
                    message.items[i] = $root.protobuf.Item.fromObject(object.items[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a S2CItemBagSync message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.S2CItemBagSync
         * @static
         * @param {protobuf.S2CItemBagSync} message S2CItemBagSync
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        S2CItemBagSync.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.items = [];
            if (options.defaults)
                object.syncType = 0;
            if (message.syncType != null && message.hasOwnProperty("syncType"))
                object.syncType = message.syncType;
            if (message.items && message.items.length) {
                object.items = [];
                for (var j = 0; j < message.items.length; ++j)
                    object.items[j] = $root.protobuf.Item.toObject(message.items[j], options);
            }
            return object;
        };

        /**
         * Converts this S2CItemBagSync to JSON.
         * @function toJSON
         * @memberof protobuf.S2CItemBagSync
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        S2CItemBagSync.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return S2CItemBagSync;
    })();

    protobuf.C2SGetPlayer = (function() {

        /**
         * Properties of a C2SGetPlayer.
         * @memberof protobuf
         * @interface IC2SGetPlayer
         */

        /**
         * Constructs a new C2SGetPlayer.
         * @memberof protobuf
         * @classdesc 获取玩家 *
         * @implements IC2SGetPlayer
         * @constructor
         * @param {protobuf.IC2SGetPlayer=} [properties] Properties to set
         */
        function C2SGetPlayer(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new C2SGetPlayer instance using the specified properties.
         * @function create
         * @memberof protobuf.C2SGetPlayer
         * @static
         * @param {protobuf.IC2SGetPlayer=} [properties] Properties to set
         * @returns {protobuf.C2SGetPlayer} C2SGetPlayer instance
         */
        C2SGetPlayer.create = function create(properties) {
            return new C2SGetPlayer(properties);
        };

        /**
         * Encodes the specified C2SGetPlayer message. Does not implicitly {@link protobuf.C2SGetPlayer.verify|verify} messages.
         * @function encode
         * @memberof protobuf.C2SGetPlayer
         * @static
         * @param {protobuf.IC2SGetPlayer} message C2SGetPlayer message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SGetPlayer.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified C2SGetPlayer message, length delimited. Does not implicitly {@link protobuf.C2SGetPlayer.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.C2SGetPlayer
         * @static
         * @param {protobuf.IC2SGetPlayer} message C2SGetPlayer message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SGetPlayer.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2SGetPlayer message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.C2SGetPlayer
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.C2SGetPlayer} C2SGetPlayer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SGetPlayer.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.C2SGetPlayer();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2SGetPlayer message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.C2SGetPlayer
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.C2SGetPlayer} C2SGetPlayer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SGetPlayer.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2SGetPlayer message.
         * @function verify
         * @memberof protobuf.C2SGetPlayer
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2SGetPlayer.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a C2SGetPlayer message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.C2SGetPlayer
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.C2SGetPlayer} C2SGetPlayer
         */
        C2SGetPlayer.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.C2SGetPlayer)
                return object;
            return new $root.protobuf.C2SGetPlayer();
        };

        /**
         * Creates a plain object from a C2SGetPlayer message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.C2SGetPlayer
         * @static
         * @param {protobuf.C2SGetPlayer} message C2SGetPlayer
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        C2SGetPlayer.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this C2SGetPlayer to JSON.
         * @function toJSON
         * @memberof protobuf.C2SGetPlayer
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        C2SGetPlayer.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return C2SGetPlayer;
    })();

    protobuf.S2CGetPlayer = (function() {

        /**
         * Properties of a S2CGetPlayer.
         * @memberof protobuf
         * @interface IS2CGetPlayer
         * @property {string|null} [pid] 玩家ID ,不存在为空串
         */

        /**
         * Constructs a new S2CGetPlayer.
         * @memberof protobuf
         * @classdesc Represents a S2CGetPlayer.
         * @implements IS2CGetPlayer
         * @constructor
         * @param {protobuf.IS2CGetPlayer=} [properties] Properties to set
         */
        function S2CGetPlayer(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * 玩家ID ,不存在为空串
         * @member {string} pid
         * @memberof protobuf.S2CGetPlayer
         * @instance
         */
        S2CGetPlayer.prototype.pid = "";

        /**
         * Creates a new S2CGetPlayer instance using the specified properties.
         * @function create
         * @memberof protobuf.S2CGetPlayer
         * @static
         * @param {protobuf.IS2CGetPlayer=} [properties] Properties to set
         * @returns {protobuf.S2CGetPlayer} S2CGetPlayer instance
         */
        S2CGetPlayer.create = function create(properties) {
            return new S2CGetPlayer(properties);
        };

        /**
         * Encodes the specified S2CGetPlayer message. Does not implicitly {@link protobuf.S2CGetPlayer.verify|verify} messages.
         * @function encode
         * @memberof protobuf.S2CGetPlayer
         * @static
         * @param {protobuf.IS2CGetPlayer} message S2CGetPlayer message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CGetPlayer.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.pid != null && Object.hasOwnProperty.call(message, "pid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.pid);
            return writer;
        };

        /**
         * Encodes the specified S2CGetPlayer message, length delimited. Does not implicitly {@link protobuf.S2CGetPlayer.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.S2CGetPlayer
         * @static
         * @param {protobuf.IS2CGetPlayer} message S2CGetPlayer message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CGetPlayer.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a S2CGetPlayer message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.S2CGetPlayer
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.S2CGetPlayer} S2CGetPlayer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CGetPlayer.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.S2CGetPlayer();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.pid = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a S2CGetPlayer message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.S2CGetPlayer
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.S2CGetPlayer} S2CGetPlayer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CGetPlayer.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a S2CGetPlayer message.
         * @function verify
         * @memberof protobuf.S2CGetPlayer
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        S2CGetPlayer.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.pid != null && message.hasOwnProperty("pid"))
                if (!$util.isString(message.pid))
                    return "pid: string expected";
            return null;
        };

        /**
         * Creates a S2CGetPlayer message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.S2CGetPlayer
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.S2CGetPlayer} S2CGetPlayer
         */
        S2CGetPlayer.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.S2CGetPlayer)
                return object;
            var message = new $root.protobuf.S2CGetPlayer();
            if (object.pid != null)
                message.pid = String(object.pid);
            return message;
        };

        /**
         * Creates a plain object from a S2CGetPlayer message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.S2CGetPlayer
         * @static
         * @param {protobuf.S2CGetPlayer} message S2CGetPlayer
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        S2CGetPlayer.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.pid = "";
            if (message.pid != null && message.hasOwnProperty("pid"))
                object.pid = message.pid;
            return object;
        };

        /**
         * Converts this S2CGetPlayer to JSON.
         * @function toJSON
         * @memberof protobuf.S2CGetPlayer
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        S2CGetPlayer.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return S2CGetPlayer;
    })();

    protobuf.C2SRandName = (function() {

        /**
         * Properties of a C2SRandName.
         * @memberof protobuf
         * @interface IC2SRandName
         * @property {number|null} [gender] 性别：0-男，1-女
         */

        /**
         * Constructs a new C2SRandName.
         * @memberof protobuf
         * @classdesc 请求随机名字 *
         * @implements IC2SRandName
         * @constructor
         * @param {protobuf.IC2SRandName=} [properties] Properties to set
         */
        function C2SRandName(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * 性别：0-男，1-女
         * @member {number} gender
         * @memberof protobuf.C2SRandName
         * @instance
         */
        C2SRandName.prototype.gender = 0;

        /**
         * Creates a new C2SRandName instance using the specified properties.
         * @function create
         * @memberof protobuf.C2SRandName
         * @static
         * @param {protobuf.IC2SRandName=} [properties] Properties to set
         * @returns {protobuf.C2SRandName} C2SRandName instance
         */
        C2SRandName.create = function create(properties) {
            return new C2SRandName(properties);
        };

        /**
         * Encodes the specified C2SRandName message. Does not implicitly {@link protobuf.C2SRandName.verify|verify} messages.
         * @function encode
         * @memberof protobuf.C2SRandName
         * @static
         * @param {protobuf.IC2SRandName} message C2SRandName message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SRandName.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gender != null && Object.hasOwnProperty.call(message, "gender"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.gender);
            return writer;
        };

        /**
         * Encodes the specified C2SRandName message, length delimited. Does not implicitly {@link protobuf.C2SRandName.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.C2SRandName
         * @static
         * @param {protobuf.IC2SRandName} message C2SRandName message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SRandName.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2SRandName message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.C2SRandName
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.C2SRandName} C2SRandName
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SRandName.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.C2SRandName();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.gender = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2SRandName message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.C2SRandName
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.C2SRandName} C2SRandName
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SRandName.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2SRandName message.
         * @function verify
         * @memberof protobuf.C2SRandName
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2SRandName.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gender != null && message.hasOwnProperty("gender"))
                if (!$util.isInteger(message.gender))
                    return "gender: integer expected";
            return null;
        };

        /**
         * Creates a C2SRandName message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.C2SRandName
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.C2SRandName} C2SRandName
         */
        C2SRandName.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.C2SRandName)
                return object;
            var message = new $root.protobuf.C2SRandName();
            if (object.gender != null)
                message.gender = object.gender | 0;
            return message;
        };

        /**
         * Creates a plain object from a C2SRandName message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.C2SRandName
         * @static
         * @param {protobuf.C2SRandName} message C2SRandName
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        C2SRandName.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.gender = 0;
            if (message.gender != null && message.hasOwnProperty("gender"))
                object.gender = message.gender;
            return object;
        };

        /**
         * Converts this C2SRandName to JSON.
         * @function toJSON
         * @memberof protobuf.C2SRandName
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        C2SRandName.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return C2SRandName;
    })();

    protobuf.S2CRandName = (function() {

        /**
         * Properties of a S2CRandName.
         * @memberof protobuf
         * @interface IS2CRandName
         * @property {string|null} [name] S2CRandName name
         */

        /**
         * Constructs a new S2CRandName.
         * @memberof protobuf
         * @classdesc Represents a S2CRandName.
         * @implements IS2CRandName
         * @constructor
         * @param {protobuf.IS2CRandName=} [properties] Properties to set
         */
        function S2CRandName(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * S2CRandName name.
         * @member {string} name
         * @memberof protobuf.S2CRandName
         * @instance
         */
        S2CRandName.prototype.name = "";

        /**
         * Creates a new S2CRandName instance using the specified properties.
         * @function create
         * @memberof protobuf.S2CRandName
         * @static
         * @param {protobuf.IS2CRandName=} [properties] Properties to set
         * @returns {protobuf.S2CRandName} S2CRandName instance
         */
        S2CRandName.create = function create(properties) {
            return new S2CRandName(properties);
        };

        /**
         * Encodes the specified S2CRandName message. Does not implicitly {@link protobuf.S2CRandName.verify|verify} messages.
         * @function encode
         * @memberof protobuf.S2CRandName
         * @static
         * @param {protobuf.IS2CRandName} message S2CRandName message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CRandName.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
            return writer;
        };

        /**
         * Encodes the specified S2CRandName message, length delimited. Does not implicitly {@link protobuf.S2CRandName.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.S2CRandName
         * @static
         * @param {protobuf.IS2CRandName} message S2CRandName message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CRandName.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a S2CRandName message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.S2CRandName
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.S2CRandName} S2CRandName
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CRandName.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.S2CRandName();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a S2CRandName message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.S2CRandName
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.S2CRandName} S2CRandName
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CRandName.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a S2CRandName message.
         * @function verify
         * @memberof protobuf.S2CRandName
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        S2CRandName.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            return null;
        };

        /**
         * Creates a S2CRandName message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.S2CRandName
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.S2CRandName} S2CRandName
         */
        S2CRandName.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.S2CRandName)
                return object;
            var message = new $root.protobuf.S2CRandName();
            if (object.name != null)
                message.name = String(object.name);
            return message;
        };

        /**
         * Creates a plain object from a S2CRandName message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.S2CRandName
         * @static
         * @param {protobuf.S2CRandName} message S2CRandName
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        S2CRandName.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.name = "";
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            return object;
        };

        /**
         * Converts this S2CRandName to JSON.
         * @function toJSON
         * @memberof protobuf.S2CRandName
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        S2CRandName.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return S2CRandName;
    })();

    protobuf.C2SCreatePlayer = (function() {

        /**
         * Properties of a C2SCreatePlayer.
         * @memberof protobuf
         * @interface IC2SCreatePlayer
         * @property {number|null} [serverId] 服务器ID
         * @property {number|null} [gender] 性别：0-男，1-女
         * @property {string|null} [name] 名字
         * @property {string|null} [roleBirth] 出身
         * @property {string|null} [invitedId] 邀请者ID(可为空)
         */

        /**
         * Constructs a new C2SCreatePlayer.
         * @memberof protobuf
         * @classdesc 创建角色 *
         * @implements IC2SCreatePlayer
         * @constructor
         * @param {protobuf.IC2SCreatePlayer=} [properties] Properties to set
         */
        function C2SCreatePlayer(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * 服务器ID
         * @member {number} serverId
         * @memberof protobuf.C2SCreatePlayer
         * @instance
         */
        C2SCreatePlayer.prototype.serverId = 0;

        /**
         * 性别：0-男，1-女
         * @member {number} gender
         * @memberof protobuf.C2SCreatePlayer
         * @instance
         */
        C2SCreatePlayer.prototype.gender = 0;

        /**
         * 名字
         * @member {string} name
         * @memberof protobuf.C2SCreatePlayer
         * @instance
         */
        C2SCreatePlayer.prototype.name = "";

        /**
         * 出身
         * @member {string} roleBirth
         * @memberof protobuf.C2SCreatePlayer
         * @instance
         */
        C2SCreatePlayer.prototype.roleBirth = "";

        /**
         * 邀请者ID(可为空)
         * @member {string} invitedId
         * @memberof protobuf.C2SCreatePlayer
         * @instance
         */
        C2SCreatePlayer.prototype.invitedId = "";

        /**
         * Creates a new C2SCreatePlayer instance using the specified properties.
         * @function create
         * @memberof protobuf.C2SCreatePlayer
         * @static
         * @param {protobuf.IC2SCreatePlayer=} [properties] Properties to set
         * @returns {protobuf.C2SCreatePlayer} C2SCreatePlayer instance
         */
        C2SCreatePlayer.create = function create(properties) {
            return new C2SCreatePlayer(properties);
        };

        /**
         * Encodes the specified C2SCreatePlayer message. Does not implicitly {@link protobuf.C2SCreatePlayer.verify|verify} messages.
         * @function encode
         * @memberof protobuf.C2SCreatePlayer
         * @static
         * @param {protobuf.IC2SCreatePlayer} message C2SCreatePlayer message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SCreatePlayer.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.serverId != null && Object.hasOwnProperty.call(message, "serverId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.serverId);
            if (message.gender != null && Object.hasOwnProperty.call(message, "gender"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.gender);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
            if (message.roleBirth != null && Object.hasOwnProperty.call(message, "roleBirth"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.roleBirth);
            if (message.invitedId != null && Object.hasOwnProperty.call(message, "invitedId"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.invitedId);
            return writer;
        };

        /**
         * Encodes the specified C2SCreatePlayer message, length delimited. Does not implicitly {@link protobuf.C2SCreatePlayer.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.C2SCreatePlayer
         * @static
         * @param {protobuf.IC2SCreatePlayer} message C2SCreatePlayer message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SCreatePlayer.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2SCreatePlayer message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.C2SCreatePlayer
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.C2SCreatePlayer} C2SCreatePlayer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SCreatePlayer.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.C2SCreatePlayer();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.serverId = reader.int32();
                    break;
                case 2:
                    message.gender = reader.int32();
                    break;
                case 3:
                    message.name = reader.string();
                    break;
                case 4:
                    message.roleBirth = reader.string();
                    break;
                case 5:
                    message.invitedId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2SCreatePlayer message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.C2SCreatePlayer
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.C2SCreatePlayer} C2SCreatePlayer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SCreatePlayer.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2SCreatePlayer message.
         * @function verify
         * @memberof protobuf.C2SCreatePlayer
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2SCreatePlayer.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.serverId != null && message.hasOwnProperty("serverId"))
                if (!$util.isInteger(message.serverId))
                    return "serverId: integer expected";
            if (message.gender != null && message.hasOwnProperty("gender"))
                if (!$util.isInteger(message.gender))
                    return "gender: integer expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.roleBirth != null && message.hasOwnProperty("roleBirth"))
                if (!$util.isString(message.roleBirth))
                    return "roleBirth: string expected";
            if (message.invitedId != null && message.hasOwnProperty("invitedId"))
                if (!$util.isString(message.invitedId))
                    return "invitedId: string expected";
            return null;
        };

        /**
         * Creates a C2SCreatePlayer message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.C2SCreatePlayer
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.C2SCreatePlayer} C2SCreatePlayer
         */
        C2SCreatePlayer.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.C2SCreatePlayer)
                return object;
            var message = new $root.protobuf.C2SCreatePlayer();
            if (object.serverId != null)
                message.serverId = object.serverId | 0;
            if (object.gender != null)
                message.gender = object.gender | 0;
            if (object.name != null)
                message.name = String(object.name);
            if (object.roleBirth != null)
                message.roleBirth = String(object.roleBirth);
            if (object.invitedId != null)
                message.invitedId = String(object.invitedId);
            return message;
        };

        /**
         * Creates a plain object from a C2SCreatePlayer message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.C2SCreatePlayer
         * @static
         * @param {protobuf.C2SCreatePlayer} message C2SCreatePlayer
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        C2SCreatePlayer.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.serverId = 0;
                object.gender = 0;
                object.name = "";
                object.roleBirth = "";
                object.invitedId = "";
            }
            if (message.serverId != null && message.hasOwnProperty("serverId"))
                object.serverId = message.serverId;
            if (message.gender != null && message.hasOwnProperty("gender"))
                object.gender = message.gender;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.roleBirth != null && message.hasOwnProperty("roleBirth"))
                object.roleBirth = message.roleBirth;
            if (message.invitedId != null && message.hasOwnProperty("invitedId"))
                object.invitedId = message.invitedId;
            return object;
        };

        /**
         * Converts this C2SCreatePlayer to JSON.
         * @function toJSON
         * @memberof protobuf.C2SCreatePlayer
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        C2SCreatePlayer.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return C2SCreatePlayer;
    })();

    protobuf.S2CCreatePlayer = (function() {

        /**
         * Properties of a S2CCreatePlayer.
         * @memberof protobuf
         * @interface IS2CCreatePlayer
         * @property {string|null} [playerId] 玩家ID
         */

        /**
         * Constructs a new S2CCreatePlayer.
         * @memberof protobuf
         * @classdesc Represents a S2CCreatePlayer.
         * @implements IS2CCreatePlayer
         * @constructor
         * @param {protobuf.IS2CCreatePlayer=} [properties] Properties to set
         */
        function S2CCreatePlayer(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * 玩家ID
         * @member {string} playerId
         * @memberof protobuf.S2CCreatePlayer
         * @instance
         */
        S2CCreatePlayer.prototype.playerId = "";

        /**
         * Creates a new S2CCreatePlayer instance using the specified properties.
         * @function create
         * @memberof protobuf.S2CCreatePlayer
         * @static
         * @param {protobuf.IS2CCreatePlayer=} [properties] Properties to set
         * @returns {protobuf.S2CCreatePlayer} S2CCreatePlayer instance
         */
        S2CCreatePlayer.create = function create(properties) {
            return new S2CCreatePlayer(properties);
        };

        /**
         * Encodes the specified S2CCreatePlayer message. Does not implicitly {@link protobuf.S2CCreatePlayer.verify|verify} messages.
         * @function encode
         * @memberof protobuf.S2CCreatePlayer
         * @static
         * @param {protobuf.IS2CCreatePlayer} message S2CCreatePlayer message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CCreatePlayer.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.playerId);
            return writer;
        };

        /**
         * Encodes the specified S2CCreatePlayer message, length delimited. Does not implicitly {@link protobuf.S2CCreatePlayer.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.S2CCreatePlayer
         * @static
         * @param {protobuf.IS2CCreatePlayer} message S2CCreatePlayer message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CCreatePlayer.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a S2CCreatePlayer message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.S2CCreatePlayer
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.S2CCreatePlayer} S2CCreatePlayer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CCreatePlayer.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.S2CCreatePlayer();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.playerId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a S2CCreatePlayer message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.S2CCreatePlayer
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.S2CCreatePlayer} S2CCreatePlayer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CCreatePlayer.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a S2CCreatePlayer message.
         * @function verify
         * @memberof protobuf.S2CCreatePlayer
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        S2CCreatePlayer.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                if (!$util.isString(message.playerId))
                    return "playerId: string expected";
            return null;
        };

        /**
         * Creates a S2CCreatePlayer message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.S2CCreatePlayer
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.S2CCreatePlayer} S2CCreatePlayer
         */
        S2CCreatePlayer.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.S2CCreatePlayer)
                return object;
            var message = new $root.protobuf.S2CCreatePlayer();
            if (object.playerId != null)
                message.playerId = String(object.playerId);
            return message;
        };

        /**
         * Creates a plain object from a S2CCreatePlayer message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.S2CCreatePlayer
         * @static
         * @param {protobuf.S2CCreatePlayer} message S2CCreatePlayer
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        S2CCreatePlayer.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.playerId = "";
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                object.playerId = message.playerId;
            return object;
        };

        /**
         * Converts this S2CCreatePlayer to JSON.
         * @function toJSON
         * @memberof protobuf.S2CCreatePlayer
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        S2CCreatePlayer.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return S2CCreatePlayer;
    })();

    protobuf.C2SLogin = (function() {

        /**
         * Properties of a C2SLogin.
         * @memberof protobuf
         * @interface IC2SLogin
         */

        /**
         * Constructs a new C2SLogin.
         * @memberof protobuf
         * @classdesc 登录 *
         * @implements IC2SLogin
         * @constructor
         * @param {protobuf.IC2SLogin=} [properties] Properties to set
         */
        function C2SLogin(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new C2SLogin instance using the specified properties.
         * @function create
         * @memberof protobuf.C2SLogin
         * @static
         * @param {protobuf.IC2SLogin=} [properties] Properties to set
         * @returns {protobuf.C2SLogin} C2SLogin instance
         */
        C2SLogin.create = function create(properties) {
            return new C2SLogin(properties);
        };

        /**
         * Encodes the specified C2SLogin message. Does not implicitly {@link protobuf.C2SLogin.verify|verify} messages.
         * @function encode
         * @memberof protobuf.C2SLogin
         * @static
         * @param {protobuf.IC2SLogin} message C2SLogin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SLogin.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified C2SLogin message, length delimited. Does not implicitly {@link protobuf.C2SLogin.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.C2SLogin
         * @static
         * @param {protobuf.IC2SLogin} message C2SLogin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SLogin.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2SLogin message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.C2SLogin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.C2SLogin} C2SLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SLogin.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.C2SLogin();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2SLogin message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.C2SLogin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.C2SLogin} C2SLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SLogin.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2SLogin message.
         * @function verify
         * @memberof protobuf.C2SLogin
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2SLogin.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a C2SLogin message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.C2SLogin
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.C2SLogin} C2SLogin
         */
        C2SLogin.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.C2SLogin)
                return object;
            return new $root.protobuf.C2SLogin();
        };

        /**
         * Creates a plain object from a C2SLogin message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.C2SLogin
         * @static
         * @param {protobuf.C2SLogin} message C2SLogin
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        C2SLogin.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this C2SLogin to JSON.
         * @function toJSON
         * @memberof protobuf.C2SLogin
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        C2SLogin.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return C2SLogin;
    })();

    protobuf.S2CLogin = (function() {

        /**
         * Properties of a S2CLogin.
         * @memberof protobuf
         * @interface IS2CLogin
         */

        /**
         * Constructs a new S2CLogin.
         * @memberof protobuf
         * @classdesc Represents a S2CLogin.
         * @implements IS2CLogin
         * @constructor
         * @param {protobuf.IS2CLogin=} [properties] Properties to set
         */
        function S2CLogin(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new S2CLogin instance using the specified properties.
         * @function create
         * @memberof protobuf.S2CLogin
         * @static
         * @param {protobuf.IS2CLogin=} [properties] Properties to set
         * @returns {protobuf.S2CLogin} S2CLogin instance
         */
        S2CLogin.create = function create(properties) {
            return new S2CLogin(properties);
        };

        /**
         * Encodes the specified S2CLogin message. Does not implicitly {@link protobuf.S2CLogin.verify|verify} messages.
         * @function encode
         * @memberof protobuf.S2CLogin
         * @static
         * @param {protobuf.IS2CLogin} message S2CLogin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CLogin.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified S2CLogin message, length delimited. Does not implicitly {@link protobuf.S2CLogin.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.S2CLogin
         * @static
         * @param {protobuf.IS2CLogin} message S2CLogin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CLogin.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a S2CLogin message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.S2CLogin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.S2CLogin} S2CLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CLogin.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.S2CLogin();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a S2CLogin message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.S2CLogin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.S2CLogin} S2CLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CLogin.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a S2CLogin message.
         * @function verify
         * @memberof protobuf.S2CLogin
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        S2CLogin.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a S2CLogin message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.S2CLogin
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.S2CLogin} S2CLogin
         */
        S2CLogin.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.S2CLogin)
                return object;
            return new $root.protobuf.S2CLogin();
        };

        /**
         * Creates a plain object from a S2CLogin message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.S2CLogin
         * @static
         * @param {protobuf.S2CLogin} message S2CLogin
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        S2CLogin.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this S2CLogin to JSON.
         * @function toJSON
         * @memberof protobuf.S2CLogin
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        S2CLogin.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return S2CLogin;
    })();

    protobuf.C2SLoginSuccess = (function() {

        /**
         * Properties of a C2SLoginSuccess.
         * @memberof protobuf
         * @interface IC2SLoginSuccess
         */

        /**
         * Constructs a new C2SLoginSuccess.
         * @memberof protobuf
         * @classdesc 登录成功 *
         * @implements IC2SLoginSuccess
         * @constructor
         * @param {protobuf.IC2SLoginSuccess=} [properties] Properties to set
         */
        function C2SLoginSuccess(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new C2SLoginSuccess instance using the specified properties.
         * @function create
         * @memberof protobuf.C2SLoginSuccess
         * @static
         * @param {protobuf.IC2SLoginSuccess=} [properties] Properties to set
         * @returns {protobuf.C2SLoginSuccess} C2SLoginSuccess instance
         */
        C2SLoginSuccess.create = function create(properties) {
            return new C2SLoginSuccess(properties);
        };

        /**
         * Encodes the specified C2SLoginSuccess message. Does not implicitly {@link protobuf.C2SLoginSuccess.verify|verify} messages.
         * @function encode
         * @memberof protobuf.C2SLoginSuccess
         * @static
         * @param {protobuf.IC2SLoginSuccess} message C2SLoginSuccess message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SLoginSuccess.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified C2SLoginSuccess message, length delimited. Does not implicitly {@link protobuf.C2SLoginSuccess.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.C2SLoginSuccess
         * @static
         * @param {protobuf.IC2SLoginSuccess} message C2SLoginSuccess message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SLoginSuccess.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2SLoginSuccess message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.C2SLoginSuccess
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.C2SLoginSuccess} C2SLoginSuccess
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SLoginSuccess.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.C2SLoginSuccess();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2SLoginSuccess message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.C2SLoginSuccess
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.C2SLoginSuccess} C2SLoginSuccess
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SLoginSuccess.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2SLoginSuccess message.
         * @function verify
         * @memberof protobuf.C2SLoginSuccess
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2SLoginSuccess.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a C2SLoginSuccess message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.C2SLoginSuccess
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.C2SLoginSuccess} C2SLoginSuccess
         */
        C2SLoginSuccess.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.C2SLoginSuccess)
                return object;
            return new $root.protobuf.C2SLoginSuccess();
        };

        /**
         * Creates a plain object from a C2SLoginSuccess message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.C2SLoginSuccess
         * @static
         * @param {protobuf.C2SLoginSuccess} message C2SLoginSuccess
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        C2SLoginSuccess.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this C2SLoginSuccess to JSON.
         * @function toJSON
         * @memberof protobuf.C2SLoginSuccess
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        C2SLoginSuccess.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return C2SLoginSuccess;
    })();

    protobuf.S2CLoginSuccess = (function() {

        /**
         * Properties of a S2CLoginSuccess.
         * @memberof protobuf
         * @interface IS2CLoginSuccess
         */

        /**
         * Constructs a new S2CLoginSuccess.
         * @memberof protobuf
         * @classdesc Represents a S2CLoginSuccess.
         * @implements IS2CLoginSuccess
         * @constructor
         * @param {protobuf.IS2CLoginSuccess=} [properties] Properties to set
         */
        function S2CLoginSuccess(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new S2CLoginSuccess instance using the specified properties.
         * @function create
         * @memberof protobuf.S2CLoginSuccess
         * @static
         * @param {protobuf.IS2CLoginSuccess=} [properties] Properties to set
         * @returns {protobuf.S2CLoginSuccess} S2CLoginSuccess instance
         */
        S2CLoginSuccess.create = function create(properties) {
            return new S2CLoginSuccess(properties);
        };

        /**
         * Encodes the specified S2CLoginSuccess message. Does not implicitly {@link protobuf.S2CLoginSuccess.verify|verify} messages.
         * @function encode
         * @memberof protobuf.S2CLoginSuccess
         * @static
         * @param {protobuf.IS2CLoginSuccess} message S2CLoginSuccess message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CLoginSuccess.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified S2CLoginSuccess message, length delimited. Does not implicitly {@link protobuf.S2CLoginSuccess.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.S2CLoginSuccess
         * @static
         * @param {protobuf.IS2CLoginSuccess} message S2CLoginSuccess message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CLoginSuccess.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a S2CLoginSuccess message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.S2CLoginSuccess
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.S2CLoginSuccess} S2CLoginSuccess
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CLoginSuccess.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.S2CLoginSuccess();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a S2CLoginSuccess message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.S2CLoginSuccess
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.S2CLoginSuccess} S2CLoginSuccess
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CLoginSuccess.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a S2CLoginSuccess message.
         * @function verify
         * @memberof protobuf.S2CLoginSuccess
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        S2CLoginSuccess.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a S2CLoginSuccess message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.S2CLoginSuccess
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.S2CLoginSuccess} S2CLoginSuccess
         */
        S2CLoginSuccess.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.S2CLoginSuccess)
                return object;
            return new $root.protobuf.S2CLoginSuccess();
        };

        /**
         * Creates a plain object from a S2CLoginSuccess message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.S2CLoginSuccess
         * @static
         * @param {protobuf.S2CLoginSuccess} message S2CLoginSuccess
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        S2CLoginSuccess.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this S2CLoginSuccess to JSON.
         * @function toJSON
         * @memberof protobuf.S2CLoginSuccess
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        S2CLoginSuccess.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return S2CLoginSuccess;
    })();

    protobuf.Mail = (function() {

        /**
         * Properties of a Mail.
         * @memberof protobuf
         * @interface IMail
         * @property {string|null} [id] 邮件流水ID
         * @property {string|null} [title] 邮件标题
         * @property {string|null} [content] 邮件内容
         * @property {string|null} [senderId] 发送者ID
         * @property {string|null} [recevierId] 接受者ID
         * @property {string|null} [sendTime] 发送时间戳
         * @property {number|null} [receiveStatus] 奖励领取状态(0-不可领取, 1-可领取，2-已领取)
         * @property {number|null} [read] 邮件ID(0-未读,1-已读)
         * @property {string|null} [attachment] 附件
         */

        /**
         * Constructs a new Mail.
         * @memberof protobuf
         * @classdesc 邮件信息
         * @implements IMail
         * @constructor
         * @param {protobuf.IMail=} [properties] Properties to set
         */
        function Mail(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * 邮件流水ID
         * @member {string} id
         * @memberof protobuf.Mail
         * @instance
         */
        Mail.prototype.id = "";

        /**
         * 邮件标题
         * @member {string} title
         * @memberof protobuf.Mail
         * @instance
         */
        Mail.prototype.title = "";

        /**
         * 邮件内容
         * @member {string} content
         * @memberof protobuf.Mail
         * @instance
         */
        Mail.prototype.content = "";

        /**
         * 发送者ID
         * @member {string} senderId
         * @memberof protobuf.Mail
         * @instance
         */
        Mail.prototype.senderId = "";

        /**
         * 接受者ID
         * @member {string} recevierId
         * @memberof protobuf.Mail
         * @instance
         */
        Mail.prototype.recevierId = "";

        /**
         * 发送时间戳
         * @member {string} sendTime
         * @memberof protobuf.Mail
         * @instance
         */
        Mail.prototype.sendTime = "";

        /**
         * 奖励领取状态(0-不可领取, 1-可领取，2-已领取)
         * @member {number} receiveStatus
         * @memberof protobuf.Mail
         * @instance
         */
        Mail.prototype.receiveStatus = 0;

        /**
         * 邮件ID(0-未读,1-已读)
         * @member {number} read
         * @memberof protobuf.Mail
         * @instance
         */
        Mail.prototype.read = 0;

        /**
         * 附件
         * @member {string} attachment
         * @memberof protobuf.Mail
         * @instance
         */
        Mail.prototype.attachment = "";

        /**
         * Creates a new Mail instance using the specified properties.
         * @function create
         * @memberof protobuf.Mail
         * @static
         * @param {protobuf.IMail=} [properties] Properties to set
         * @returns {protobuf.Mail} Mail instance
         */
        Mail.create = function create(properties) {
            return new Mail(properties);
        };

        /**
         * Encodes the specified Mail message. Does not implicitly {@link protobuf.Mail.verify|verify} messages.
         * @function encode
         * @memberof protobuf.Mail
         * @static
         * @param {protobuf.IMail} message Mail message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Mail.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.title != null && Object.hasOwnProperty.call(message, "title"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.title);
            if (message.content != null && Object.hasOwnProperty.call(message, "content"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.content);
            if (message.senderId != null && Object.hasOwnProperty.call(message, "senderId"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.senderId);
            if (message.recevierId != null && Object.hasOwnProperty.call(message, "recevierId"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.recevierId);
            if (message.sendTime != null && Object.hasOwnProperty.call(message, "sendTime"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.sendTime);
            if (message.receiveStatus != null && Object.hasOwnProperty.call(message, "receiveStatus"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.receiveStatus);
            if (message.read != null && Object.hasOwnProperty.call(message, "read"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.read);
            if (message.attachment != null && Object.hasOwnProperty.call(message, "attachment"))
                writer.uint32(/* id 9, wireType 2 =*/74).string(message.attachment);
            return writer;
        };

        /**
         * Encodes the specified Mail message, length delimited. Does not implicitly {@link protobuf.Mail.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.Mail
         * @static
         * @param {protobuf.IMail} message Mail message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Mail.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Mail message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.Mail
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.Mail} Mail
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Mail.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.Mail();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.title = reader.string();
                    break;
                case 3:
                    message.content = reader.string();
                    break;
                case 4:
                    message.senderId = reader.string();
                    break;
                case 5:
                    message.recevierId = reader.string();
                    break;
                case 6:
                    message.sendTime = reader.string();
                    break;
                case 7:
                    message.receiveStatus = reader.int32();
                    break;
                case 8:
                    message.read = reader.int32();
                    break;
                case 9:
                    message.attachment = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Mail message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.Mail
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.Mail} Mail
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Mail.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Mail message.
         * @function verify
         * @memberof protobuf.Mail
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Mail.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.title != null && message.hasOwnProperty("title"))
                if (!$util.isString(message.title))
                    return "title: string expected";
            if (message.content != null && message.hasOwnProperty("content"))
                if (!$util.isString(message.content))
                    return "content: string expected";
            if (message.senderId != null && message.hasOwnProperty("senderId"))
                if (!$util.isString(message.senderId))
                    return "senderId: string expected";
            if (message.recevierId != null && message.hasOwnProperty("recevierId"))
                if (!$util.isString(message.recevierId))
                    return "recevierId: string expected";
            if (message.sendTime != null && message.hasOwnProperty("sendTime"))
                if (!$util.isString(message.sendTime))
                    return "sendTime: string expected";
            if (message.receiveStatus != null && message.hasOwnProperty("receiveStatus"))
                if (!$util.isInteger(message.receiveStatus))
                    return "receiveStatus: integer expected";
            if (message.read != null && message.hasOwnProperty("read"))
                if (!$util.isInteger(message.read))
                    return "read: integer expected";
            if (message.attachment != null && message.hasOwnProperty("attachment"))
                if (!$util.isString(message.attachment))
                    return "attachment: string expected";
            return null;
        };

        /**
         * Creates a Mail message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.Mail
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.Mail} Mail
         */
        Mail.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.Mail)
                return object;
            var message = new $root.protobuf.Mail();
            if (object.id != null)
                message.id = String(object.id);
            if (object.title != null)
                message.title = String(object.title);
            if (object.content != null)
                message.content = String(object.content);
            if (object.senderId != null)
                message.senderId = String(object.senderId);
            if (object.recevierId != null)
                message.recevierId = String(object.recevierId);
            if (object.sendTime != null)
                message.sendTime = String(object.sendTime);
            if (object.receiveStatus != null)
                message.receiveStatus = object.receiveStatus | 0;
            if (object.read != null)
                message.read = object.read | 0;
            if (object.attachment != null)
                message.attachment = String(object.attachment);
            return message;
        };

        /**
         * Creates a plain object from a Mail message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.Mail
         * @static
         * @param {protobuf.Mail} message Mail
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Mail.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.id = "";
                object.title = "";
                object.content = "";
                object.senderId = "";
                object.recevierId = "";
                object.sendTime = "";
                object.receiveStatus = 0;
                object.read = 0;
                object.attachment = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.title != null && message.hasOwnProperty("title"))
                object.title = message.title;
            if (message.content != null && message.hasOwnProperty("content"))
                object.content = message.content;
            if (message.senderId != null && message.hasOwnProperty("senderId"))
                object.senderId = message.senderId;
            if (message.recevierId != null && message.hasOwnProperty("recevierId"))
                object.recevierId = message.recevierId;
            if (message.sendTime != null && message.hasOwnProperty("sendTime"))
                object.sendTime = message.sendTime;
            if (message.receiveStatus != null && message.hasOwnProperty("receiveStatus"))
                object.receiveStatus = message.receiveStatus;
            if (message.read != null && message.hasOwnProperty("read"))
                object.read = message.read;
            if (message.attachment != null && message.hasOwnProperty("attachment"))
                object.attachment = message.attachment;
            return object;
        };

        /**
         * Converts this Mail to JSON.
         * @function toJSON
         * @memberof protobuf.Mail
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Mail.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Mail;
    })();

    protobuf.C2SMailListSync = (function() {

        /**
         * Properties of a C2SMailListSync.
         * @memberof protobuf
         * @interface IC2SMailListSync
         */

        /**
         * Constructs a new C2SMailListSync.
         * @memberof protobuf
         * @classdesc 邮件列表
         * @implements IC2SMailListSync
         * @constructor
         * @param {protobuf.IC2SMailListSync=} [properties] Properties to set
         */
        function C2SMailListSync(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new C2SMailListSync instance using the specified properties.
         * @function create
         * @memberof protobuf.C2SMailListSync
         * @static
         * @param {protobuf.IC2SMailListSync=} [properties] Properties to set
         * @returns {protobuf.C2SMailListSync} C2SMailListSync instance
         */
        C2SMailListSync.create = function create(properties) {
            return new C2SMailListSync(properties);
        };

        /**
         * Encodes the specified C2SMailListSync message. Does not implicitly {@link protobuf.C2SMailListSync.verify|verify} messages.
         * @function encode
         * @memberof protobuf.C2SMailListSync
         * @static
         * @param {protobuf.IC2SMailListSync} message C2SMailListSync message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SMailListSync.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified C2SMailListSync message, length delimited. Does not implicitly {@link protobuf.C2SMailListSync.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.C2SMailListSync
         * @static
         * @param {protobuf.IC2SMailListSync} message C2SMailListSync message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SMailListSync.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2SMailListSync message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.C2SMailListSync
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.C2SMailListSync} C2SMailListSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SMailListSync.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.C2SMailListSync();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2SMailListSync message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.C2SMailListSync
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.C2SMailListSync} C2SMailListSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SMailListSync.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2SMailListSync message.
         * @function verify
         * @memberof protobuf.C2SMailListSync
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2SMailListSync.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a C2SMailListSync message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.C2SMailListSync
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.C2SMailListSync} C2SMailListSync
         */
        C2SMailListSync.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.C2SMailListSync)
                return object;
            return new $root.protobuf.C2SMailListSync();
        };

        /**
         * Creates a plain object from a C2SMailListSync message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.C2SMailListSync
         * @static
         * @param {protobuf.C2SMailListSync} message C2SMailListSync
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        C2SMailListSync.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this C2SMailListSync to JSON.
         * @function toJSON
         * @memberof protobuf.C2SMailListSync
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        C2SMailListSync.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return C2SMailListSync;
    })();

    protobuf.S2CMailListSync = (function() {

        /**
         * Properties of a S2CMailListSync.
         * @memberof protobuf
         * @interface IS2CMailListSync
         * @property {number|null} [syncType] 同步类型 0-全部  1-增加 2-修改 3-删除
         * @property {Array.<protobuf.IMail>|null} [mails] 邮件列表
         */

        /**
         * Constructs a new S2CMailListSync.
         * @memberof protobuf
         * @classdesc 邮件列表
         * @implements IS2CMailListSync
         * @constructor
         * @param {protobuf.IS2CMailListSync=} [properties] Properties to set
         */
        function S2CMailListSync(properties) {
            this.mails = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * 同步类型 0-全部  1-增加 2-修改 3-删除
         * @member {number} syncType
         * @memberof protobuf.S2CMailListSync
         * @instance
         */
        S2CMailListSync.prototype.syncType = 0;

        /**
         * 邮件列表
         * @member {Array.<protobuf.IMail>} mails
         * @memberof protobuf.S2CMailListSync
         * @instance
         */
        S2CMailListSync.prototype.mails = $util.emptyArray;

        /**
         * Creates a new S2CMailListSync instance using the specified properties.
         * @function create
         * @memberof protobuf.S2CMailListSync
         * @static
         * @param {protobuf.IS2CMailListSync=} [properties] Properties to set
         * @returns {protobuf.S2CMailListSync} S2CMailListSync instance
         */
        S2CMailListSync.create = function create(properties) {
            return new S2CMailListSync(properties);
        };

        /**
         * Encodes the specified S2CMailListSync message. Does not implicitly {@link protobuf.S2CMailListSync.verify|verify} messages.
         * @function encode
         * @memberof protobuf.S2CMailListSync
         * @static
         * @param {protobuf.IS2CMailListSync} message S2CMailListSync message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CMailListSync.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.syncType != null && Object.hasOwnProperty.call(message, "syncType"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.syncType);
            if (message.mails != null && message.mails.length)
                for (var i = 0; i < message.mails.length; ++i)
                    $root.protobuf.Mail.encode(message.mails[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified S2CMailListSync message, length delimited. Does not implicitly {@link protobuf.S2CMailListSync.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.S2CMailListSync
         * @static
         * @param {protobuf.IS2CMailListSync} message S2CMailListSync message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CMailListSync.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a S2CMailListSync message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.S2CMailListSync
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.S2CMailListSync} S2CMailListSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CMailListSync.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.S2CMailListSync();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.syncType = reader.int32();
                    break;
                case 2:
                    if (!(message.mails && message.mails.length))
                        message.mails = [];
                    message.mails.push($root.protobuf.Mail.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a S2CMailListSync message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.S2CMailListSync
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.S2CMailListSync} S2CMailListSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CMailListSync.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a S2CMailListSync message.
         * @function verify
         * @memberof protobuf.S2CMailListSync
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        S2CMailListSync.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.syncType != null && message.hasOwnProperty("syncType"))
                if (!$util.isInteger(message.syncType))
                    return "syncType: integer expected";
            if (message.mails != null && message.hasOwnProperty("mails")) {
                if (!Array.isArray(message.mails))
                    return "mails: array expected";
                for (var i = 0; i < message.mails.length; ++i) {
                    var error = $root.protobuf.Mail.verify(message.mails[i]);
                    if (error)
                        return "mails." + error;
                }
            }
            return null;
        };

        /**
         * Creates a S2CMailListSync message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.S2CMailListSync
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.S2CMailListSync} S2CMailListSync
         */
        S2CMailListSync.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.S2CMailListSync)
                return object;
            var message = new $root.protobuf.S2CMailListSync();
            if (object.syncType != null)
                message.syncType = object.syncType | 0;
            if (object.mails) {
                if (!Array.isArray(object.mails))
                    throw TypeError(".protobuf.S2CMailListSync.mails: array expected");
                message.mails = [];
                for (var i = 0; i < object.mails.length; ++i) {
                    if (typeof object.mails[i] !== "object")
                        throw TypeError(".protobuf.S2CMailListSync.mails: object expected");
                    message.mails[i] = $root.protobuf.Mail.fromObject(object.mails[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a S2CMailListSync message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.S2CMailListSync
         * @static
         * @param {protobuf.S2CMailListSync} message S2CMailListSync
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        S2CMailListSync.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.mails = [];
            if (options.defaults)
                object.syncType = 0;
            if (message.syncType != null && message.hasOwnProperty("syncType"))
                object.syncType = message.syncType;
            if (message.mails && message.mails.length) {
                object.mails = [];
                for (var j = 0; j < message.mails.length; ++j)
                    object.mails[j] = $root.protobuf.Mail.toObject(message.mails[j], options);
            }
            return object;
        };

        /**
         * Converts this S2CMailListSync to JSON.
         * @function toJSON
         * @memberof protobuf.S2CMailListSync
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        S2CMailListSync.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return S2CMailListSync;
    })();

    protobuf.C2SMailOp = (function() {

        /**
         * Properties of a C2SMailOp.
         * @memberof protobuf
         * @interface IC2SMailOp
         * @property {number|null} [op] 操作类型(1-一键阅读领取，2-删除已读邮件，3-单个领取，4-单个删除,5-单个已读)
         * @property {string|null} [id] 邮件ID(当op=3,4,5时,传邮件流水ID)
         */

        /**
         * Constructs a new C2SMailOp.
         * @memberof protobuf
         * @classdesc 邮件操作
         * @implements IC2SMailOp
         * @constructor
         * @param {protobuf.IC2SMailOp=} [properties] Properties to set
         */
        function C2SMailOp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * 操作类型(1-一键阅读领取，2-删除已读邮件，3-单个领取，4-单个删除,5-单个已读)
         * @member {number} op
         * @memberof protobuf.C2SMailOp
         * @instance
         */
        C2SMailOp.prototype.op = 0;

        /**
         * 邮件ID(当op=3,4,5时,传邮件流水ID)
         * @member {string} id
         * @memberof protobuf.C2SMailOp
         * @instance
         */
        C2SMailOp.prototype.id = "";

        /**
         * Creates a new C2SMailOp instance using the specified properties.
         * @function create
         * @memberof protobuf.C2SMailOp
         * @static
         * @param {protobuf.IC2SMailOp=} [properties] Properties to set
         * @returns {protobuf.C2SMailOp} C2SMailOp instance
         */
        C2SMailOp.create = function create(properties) {
            return new C2SMailOp(properties);
        };

        /**
         * Encodes the specified C2SMailOp message. Does not implicitly {@link protobuf.C2SMailOp.verify|verify} messages.
         * @function encode
         * @memberof protobuf.C2SMailOp
         * @static
         * @param {protobuf.IC2SMailOp} message C2SMailOp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SMailOp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.op != null && Object.hasOwnProperty.call(message, "op"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.op);
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.id);
            return writer;
        };

        /**
         * Encodes the specified C2SMailOp message, length delimited. Does not implicitly {@link protobuf.C2SMailOp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.C2SMailOp
         * @static
         * @param {protobuf.IC2SMailOp} message C2SMailOp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SMailOp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2SMailOp message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.C2SMailOp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.C2SMailOp} C2SMailOp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SMailOp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.C2SMailOp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.op = reader.int32();
                    break;
                case 2:
                    message.id = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2SMailOp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.C2SMailOp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.C2SMailOp} C2SMailOp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SMailOp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2SMailOp message.
         * @function verify
         * @memberof protobuf.C2SMailOp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2SMailOp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.op != null && message.hasOwnProperty("op"))
                if (!$util.isInteger(message.op))
                    return "op: integer expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            return null;
        };

        /**
         * Creates a C2SMailOp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.C2SMailOp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.C2SMailOp} C2SMailOp
         */
        C2SMailOp.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.C2SMailOp)
                return object;
            var message = new $root.protobuf.C2SMailOp();
            if (object.op != null)
                message.op = object.op | 0;
            if (object.id != null)
                message.id = String(object.id);
            return message;
        };

        /**
         * Creates a plain object from a C2SMailOp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.C2SMailOp
         * @static
         * @param {protobuf.C2SMailOp} message C2SMailOp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        C2SMailOp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.op = 0;
                object.id = "";
            }
            if (message.op != null && message.hasOwnProperty("op"))
                object.op = message.op;
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            return object;
        };

        /**
         * Converts this C2SMailOp to JSON.
         * @function toJSON
         * @memberof protobuf.C2SMailOp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        C2SMailOp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return C2SMailOp;
    })();

    protobuf.S2CMailOp = (function() {

        /**
         * Properties of a S2CMailOp.
         * @memberof protobuf
         * @interface IS2CMailOp
         * @property {string|null} [reward] 奖励
         */

        /**
         * Constructs a new S2CMailOp.
         * @memberof protobuf
         * @classdesc 邮件操作
         * @implements IS2CMailOp
         * @constructor
         * @param {protobuf.IS2CMailOp=} [properties] Properties to set
         */
        function S2CMailOp(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * 奖励
         * @member {string} reward
         * @memberof protobuf.S2CMailOp
         * @instance
         */
        S2CMailOp.prototype.reward = "";

        /**
         * Creates a new S2CMailOp instance using the specified properties.
         * @function create
         * @memberof protobuf.S2CMailOp
         * @static
         * @param {protobuf.IS2CMailOp=} [properties] Properties to set
         * @returns {protobuf.S2CMailOp} S2CMailOp instance
         */
        S2CMailOp.create = function create(properties) {
            return new S2CMailOp(properties);
        };

        /**
         * Encodes the specified S2CMailOp message. Does not implicitly {@link protobuf.S2CMailOp.verify|verify} messages.
         * @function encode
         * @memberof protobuf.S2CMailOp
         * @static
         * @param {protobuf.IS2CMailOp} message S2CMailOp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CMailOp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.reward != null && Object.hasOwnProperty.call(message, "reward"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.reward);
            return writer;
        };

        /**
         * Encodes the specified S2CMailOp message, length delimited. Does not implicitly {@link protobuf.S2CMailOp.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.S2CMailOp
         * @static
         * @param {protobuf.IS2CMailOp} message S2CMailOp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CMailOp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a S2CMailOp message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.S2CMailOp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.S2CMailOp} S2CMailOp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CMailOp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.S2CMailOp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.reward = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a S2CMailOp message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.S2CMailOp
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.S2CMailOp} S2CMailOp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CMailOp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a S2CMailOp message.
         * @function verify
         * @memberof protobuf.S2CMailOp
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        S2CMailOp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.reward != null && message.hasOwnProperty("reward"))
                if (!$util.isString(message.reward))
                    return "reward: string expected";
            return null;
        };

        /**
         * Creates a S2CMailOp message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.S2CMailOp
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.S2CMailOp} S2CMailOp
         */
        S2CMailOp.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.S2CMailOp)
                return object;
            var message = new $root.protobuf.S2CMailOp();
            if (object.reward != null)
                message.reward = String(object.reward);
            return message;
        };

        /**
         * Creates a plain object from a S2CMailOp message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.S2CMailOp
         * @static
         * @param {protobuf.S2CMailOp} message S2CMailOp
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        S2CMailOp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.reward = "";
            if (message.reward != null && message.hasOwnProperty("reward"))
                object.reward = message.reward;
            return object;
        };

        /**
         * Converts this S2CMailOp to JSON.
         * @function toJSON
         * @memberof protobuf.S2CMailOp
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        S2CMailOp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return S2CMailOp;
    })();

    protobuf.Mall = (function() {

        /**
         * Properties of a Mall.
         * @memberof protobuf
         * @interface IMall
         * @property {protobuf.IMallOne|null} [mallOne] 特惠活动信息
         * @property {protobuf.IMallTwo|null} [mallTwo] 超值月卡信息
         * @property {protobuf.IMallThree|null} [mallThree] 超值好礼信息
         * @property {protobuf.IMallFour|null} [mallFour] 精选好礼信息
         * @property {protobuf.IMallFive|null} [mallFive] 每日精选信息
         * @property {protobuf.IMallDiamondBuy|null} [mallDiamondBuy] 钻石购买信息
         */

        /**
         * Constructs a new Mall.
         * @memberof protobuf
         * @classdesc 商店全部信息
         * @implements IMall
         * @constructor
         * @param {protobuf.IMall=} [properties] Properties to set
         */
        function Mall(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * 特惠活动信息
         * @member {protobuf.IMallOne|null|undefined} mallOne
         * @memberof protobuf.Mall
         * @instance
         */
        Mall.prototype.mallOne = null;

        /**
         * 超值月卡信息
         * @member {protobuf.IMallTwo|null|undefined} mallTwo
         * @memberof protobuf.Mall
         * @instance
         */
        Mall.prototype.mallTwo = null;

        /**
         * 超值好礼信息
         * @member {protobuf.IMallThree|null|undefined} mallThree
         * @memberof protobuf.Mall
         * @instance
         */
        Mall.prototype.mallThree = null;

        /**
         * 精选好礼信息
         * @member {protobuf.IMallFour|null|undefined} mallFour
         * @memberof protobuf.Mall
         * @instance
         */
        Mall.prototype.mallFour = null;

        /**
         * 每日精选信息
         * @member {protobuf.IMallFive|null|undefined} mallFive
         * @memberof protobuf.Mall
         * @instance
         */
        Mall.prototype.mallFive = null;

        /**
         * 钻石购买信息
         * @member {protobuf.IMallDiamondBuy|null|undefined} mallDiamondBuy
         * @memberof protobuf.Mall
         * @instance
         */
        Mall.prototype.mallDiamondBuy = null;

        /**
         * Creates a new Mall instance using the specified properties.
         * @function create
         * @memberof protobuf.Mall
         * @static
         * @param {protobuf.IMall=} [properties] Properties to set
         * @returns {protobuf.Mall} Mall instance
         */
        Mall.create = function create(properties) {
            return new Mall(properties);
        };

        /**
         * Encodes the specified Mall message. Does not implicitly {@link protobuf.Mall.verify|verify} messages.
         * @function encode
         * @memberof protobuf.Mall
         * @static
         * @param {protobuf.IMall} message Mall message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Mall.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.mallOne != null && Object.hasOwnProperty.call(message, "mallOne"))
                $root.protobuf.MallOne.encode(message.mallOne, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.mallTwo != null && Object.hasOwnProperty.call(message, "mallTwo"))
                $root.protobuf.MallTwo.encode(message.mallTwo, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.mallThree != null && Object.hasOwnProperty.call(message, "mallThree"))
                $root.protobuf.MallThree.encode(message.mallThree, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.mallFour != null && Object.hasOwnProperty.call(message, "mallFour"))
                $root.protobuf.MallFour.encode(message.mallFour, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.mallFive != null && Object.hasOwnProperty.call(message, "mallFive"))
                $root.protobuf.MallFive.encode(message.mallFive, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.mallDiamondBuy != null && Object.hasOwnProperty.call(message, "mallDiamondBuy"))
                $root.protobuf.MallDiamondBuy.encode(message.mallDiamondBuy, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Mall message, length delimited. Does not implicitly {@link protobuf.Mall.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.Mall
         * @static
         * @param {protobuf.IMall} message Mall message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Mall.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Mall message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.Mall
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.Mall} Mall
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Mall.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.Mall();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.mallOne = $root.protobuf.MallOne.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.mallTwo = $root.protobuf.MallTwo.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.mallThree = $root.protobuf.MallThree.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.mallFour = $root.protobuf.MallFour.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.mallFive = $root.protobuf.MallFive.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.mallDiamondBuy = $root.protobuf.MallDiamondBuy.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Mall message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.Mall
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.Mall} Mall
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Mall.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Mall message.
         * @function verify
         * @memberof protobuf.Mall
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Mall.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.mallOne != null && message.hasOwnProperty("mallOne")) {
                var error = $root.protobuf.MallOne.verify(message.mallOne);
                if (error)
                    return "mallOne." + error;
            }
            if (message.mallTwo != null && message.hasOwnProperty("mallTwo")) {
                var error = $root.protobuf.MallTwo.verify(message.mallTwo);
                if (error)
                    return "mallTwo." + error;
            }
            if (message.mallThree != null && message.hasOwnProperty("mallThree")) {
                var error = $root.protobuf.MallThree.verify(message.mallThree);
                if (error)
                    return "mallThree." + error;
            }
            if (message.mallFour != null && message.hasOwnProperty("mallFour")) {
                var error = $root.protobuf.MallFour.verify(message.mallFour);
                if (error)
                    return "mallFour." + error;
            }
            if (message.mallFive != null && message.hasOwnProperty("mallFive")) {
                var error = $root.protobuf.MallFive.verify(message.mallFive);
                if (error)
                    return "mallFive." + error;
            }
            if (message.mallDiamondBuy != null && message.hasOwnProperty("mallDiamondBuy")) {
                var error = $root.protobuf.MallDiamondBuy.verify(message.mallDiamondBuy);
                if (error)
                    return "mallDiamondBuy." + error;
            }
            return null;
        };

        /**
         * Creates a Mall message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.Mall
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.Mall} Mall
         */
        Mall.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.Mall)
                return object;
            var message = new $root.protobuf.Mall();
            if (object.mallOne != null) {
                if (typeof object.mallOne !== "object")
                    throw TypeError(".protobuf.Mall.mallOne: object expected");
                message.mallOne = $root.protobuf.MallOne.fromObject(object.mallOne);
            }
            if (object.mallTwo != null) {
                if (typeof object.mallTwo !== "object")
                    throw TypeError(".protobuf.Mall.mallTwo: object expected");
                message.mallTwo = $root.protobuf.MallTwo.fromObject(object.mallTwo);
            }
            if (object.mallThree != null) {
                if (typeof object.mallThree !== "object")
                    throw TypeError(".protobuf.Mall.mallThree: object expected");
                message.mallThree = $root.protobuf.MallThree.fromObject(object.mallThree);
            }
            if (object.mallFour != null) {
                if (typeof object.mallFour !== "object")
                    throw TypeError(".protobuf.Mall.mallFour: object expected");
                message.mallFour = $root.protobuf.MallFour.fromObject(object.mallFour);
            }
            if (object.mallFive != null) {
                if (typeof object.mallFive !== "object")
                    throw TypeError(".protobuf.Mall.mallFive: object expected");
                message.mallFive = $root.protobuf.MallFive.fromObject(object.mallFive);
            }
            if (object.mallDiamondBuy != null) {
                if (typeof object.mallDiamondBuy !== "object")
                    throw TypeError(".protobuf.Mall.mallDiamondBuy: object expected");
                message.mallDiamondBuy = $root.protobuf.MallDiamondBuy.fromObject(object.mallDiamondBuy);
            }
            return message;
        };

        /**
         * Creates a plain object from a Mall message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.Mall
         * @static
         * @param {protobuf.Mall} message Mall
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Mall.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.mallOne = null;
                object.mallTwo = null;
                object.mallThree = null;
                object.mallFour = null;
                object.mallFive = null;
                object.mallDiamondBuy = null;
            }
            if (message.mallOne != null && message.hasOwnProperty("mallOne"))
                object.mallOne = $root.protobuf.MallOne.toObject(message.mallOne, options);
            if (message.mallTwo != null && message.hasOwnProperty("mallTwo"))
                object.mallTwo = $root.protobuf.MallTwo.toObject(message.mallTwo, options);
            if (message.mallThree != null && message.hasOwnProperty("mallThree"))
                object.mallThree = $root.protobuf.MallThree.toObject(message.mallThree, options);
            if (message.mallFour != null && message.hasOwnProperty("mallFour"))
                object.mallFour = $root.protobuf.MallFour.toObject(message.mallFour, options);
            if (message.mallFive != null && message.hasOwnProperty("mallFive"))
                object.mallFive = $root.protobuf.MallFive.toObject(message.mallFive, options);
            if (message.mallDiamondBuy != null && message.hasOwnProperty("mallDiamondBuy"))
                object.mallDiamondBuy = $root.protobuf.MallDiamondBuy.toObject(message.mallDiamondBuy, options);
            return object;
        };

        /**
         * Converts this Mall to JSON.
         * @function toJSON
         * @memberof protobuf.Mall
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Mall.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Mall;
    })();

    protobuf.MallOne = (function() {

        /**
         * Properties of a MallOne.
         * @memberof protobuf
         * @interface IMallOne
         * @property {string|null} [refId] 已购买的礼包refId
         */

        /**
         * Constructs a new MallOne.
         * @memberof protobuf
         * @classdesc 特惠活动信息
         * @implements IMallOne
         * @constructor
         * @param {protobuf.IMallOne=} [properties] Properties to set
         */
        function MallOne(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * 已购买的礼包refId
         * @member {string} refId
         * @memberof protobuf.MallOne
         * @instance
         */
        MallOne.prototype.refId = "";

        /**
         * Creates a new MallOne instance using the specified properties.
         * @function create
         * @memberof protobuf.MallOne
         * @static
         * @param {protobuf.IMallOne=} [properties] Properties to set
         * @returns {protobuf.MallOne} MallOne instance
         */
        MallOne.create = function create(properties) {
            return new MallOne(properties);
        };

        /**
         * Encodes the specified MallOne message. Does not implicitly {@link protobuf.MallOne.verify|verify} messages.
         * @function encode
         * @memberof protobuf.MallOne
         * @static
         * @param {protobuf.IMallOne} message MallOne message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MallOne.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.refId != null && Object.hasOwnProperty.call(message, "refId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.refId);
            return writer;
        };

        /**
         * Encodes the specified MallOne message, length delimited. Does not implicitly {@link protobuf.MallOne.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.MallOne
         * @static
         * @param {protobuf.IMallOne} message MallOne message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MallOne.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MallOne message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.MallOne
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.MallOne} MallOne
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MallOne.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.MallOne();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.refId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MallOne message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.MallOne
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.MallOne} MallOne
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MallOne.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MallOne message.
         * @function verify
         * @memberof protobuf.MallOne
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MallOne.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.refId != null && message.hasOwnProperty("refId"))
                if (!$util.isString(message.refId))
                    return "refId: string expected";
            return null;
        };

        /**
         * Creates a MallOne message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.MallOne
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.MallOne} MallOne
         */
        MallOne.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.MallOne)
                return object;
            var message = new $root.protobuf.MallOne();
            if (object.refId != null)
                message.refId = String(object.refId);
            return message;
        };

        /**
         * Creates a plain object from a MallOne message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.MallOne
         * @static
         * @param {protobuf.MallOne} message MallOne
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MallOne.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.refId = "";
            if (message.refId != null && message.hasOwnProperty("refId"))
                object.refId = message.refId;
            return object;
        };

        /**
         * Converts this MallOne to JSON.
         * @function toJSON
         * @memberof protobuf.MallOne
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MallOne.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return MallOne;
    })();

    protobuf.MallTwo = (function() {

        /**
         * Properties of a MallTwo.
         * @memberof protobuf
         * @interface IMallTwo
         * @property {string|null} [refId] 月卡refId
         * @property {number|null} [buyTime] 购买时间(单位：秒)
         * @property {boolean|null} [reward] 领取每日奖励
         */

        /**
         * Constructs a new MallTwo.
         * @memberof protobuf
         * @classdesc 超值月卡信息
         * @implements IMallTwo
         * @constructor
         * @param {protobuf.IMallTwo=} [properties] Properties to set
         */
        function MallTwo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * 月卡refId
         * @member {string} refId
         * @memberof protobuf.MallTwo
         * @instance
         */
        MallTwo.prototype.refId = "";

        /**
         * 购买时间(单位：秒)
         * @member {number} buyTime
         * @memberof protobuf.MallTwo
         * @instance
         */
        MallTwo.prototype.buyTime = 0;

        /**
         * 领取每日奖励
         * @member {boolean} reward
         * @memberof protobuf.MallTwo
         * @instance
         */
        MallTwo.prototype.reward = false;

        /**
         * Creates a new MallTwo instance using the specified properties.
         * @function create
         * @memberof protobuf.MallTwo
         * @static
         * @param {protobuf.IMallTwo=} [properties] Properties to set
         * @returns {protobuf.MallTwo} MallTwo instance
         */
        MallTwo.create = function create(properties) {
            return new MallTwo(properties);
        };

        /**
         * Encodes the specified MallTwo message. Does not implicitly {@link protobuf.MallTwo.verify|verify} messages.
         * @function encode
         * @memberof protobuf.MallTwo
         * @static
         * @param {protobuf.IMallTwo} message MallTwo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MallTwo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.refId != null && Object.hasOwnProperty.call(message, "refId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.refId);
            if (message.buyTime != null && Object.hasOwnProperty.call(message, "buyTime"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.buyTime);
            if (message.reward != null && Object.hasOwnProperty.call(message, "reward"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.reward);
            return writer;
        };

        /**
         * Encodes the specified MallTwo message, length delimited. Does not implicitly {@link protobuf.MallTwo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.MallTwo
         * @static
         * @param {protobuf.IMallTwo} message MallTwo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MallTwo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MallTwo message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.MallTwo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.MallTwo} MallTwo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MallTwo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.MallTwo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.refId = reader.string();
                    break;
                case 2:
                    message.buyTime = reader.int32();
                    break;
                case 3:
                    message.reward = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MallTwo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.MallTwo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.MallTwo} MallTwo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MallTwo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MallTwo message.
         * @function verify
         * @memberof protobuf.MallTwo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MallTwo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.refId != null && message.hasOwnProperty("refId"))
                if (!$util.isString(message.refId))
                    return "refId: string expected";
            if (message.buyTime != null && message.hasOwnProperty("buyTime"))
                if (!$util.isInteger(message.buyTime))
                    return "buyTime: integer expected";
            if (message.reward != null && message.hasOwnProperty("reward"))
                if (typeof message.reward !== "boolean")
                    return "reward: boolean expected";
            return null;
        };

        /**
         * Creates a MallTwo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.MallTwo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.MallTwo} MallTwo
         */
        MallTwo.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.MallTwo)
                return object;
            var message = new $root.protobuf.MallTwo();
            if (object.refId != null)
                message.refId = String(object.refId);
            if (object.buyTime != null)
                message.buyTime = object.buyTime | 0;
            if (object.reward != null)
                message.reward = Boolean(object.reward);
            return message;
        };

        /**
         * Creates a plain object from a MallTwo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.MallTwo
         * @static
         * @param {protobuf.MallTwo} message MallTwo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MallTwo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.refId = "";
                object.buyTime = 0;
                object.reward = false;
            }
            if (message.refId != null && message.hasOwnProperty("refId"))
                object.refId = message.refId;
            if (message.buyTime != null && message.hasOwnProperty("buyTime"))
                object.buyTime = message.buyTime;
            if (message.reward != null && message.hasOwnProperty("reward"))
                object.reward = message.reward;
            return object;
        };

        /**
         * Converts this MallTwo to JSON.
         * @function toJSON
         * @memberof protobuf.MallTwo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MallTwo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return MallTwo;
    })();

    protobuf.MallThree = (function() {

        /**
         * Properties of a MallThree.
         * @memberof protobuf
         * @interface IMallThree
         * @property {string|null} [refId] 礼包refId
         * @property {number|null} [buyNum] 已购买的次数
         */

        /**
         * Constructs a new MallThree.
         * @memberof protobuf
         * @classdesc 超值好礼信息
         * @implements IMallThree
         * @constructor
         * @param {protobuf.IMallThree=} [properties] Properties to set
         */
        function MallThree(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * 礼包refId
         * @member {string} refId
         * @memberof protobuf.MallThree
         * @instance
         */
        MallThree.prototype.refId = "";

        /**
         * 已购买的次数
         * @member {number} buyNum
         * @memberof protobuf.MallThree
         * @instance
         */
        MallThree.prototype.buyNum = 0;

        /**
         * Creates a new MallThree instance using the specified properties.
         * @function create
         * @memberof protobuf.MallThree
         * @static
         * @param {protobuf.IMallThree=} [properties] Properties to set
         * @returns {protobuf.MallThree} MallThree instance
         */
        MallThree.create = function create(properties) {
            return new MallThree(properties);
        };

        /**
         * Encodes the specified MallThree message. Does not implicitly {@link protobuf.MallThree.verify|verify} messages.
         * @function encode
         * @memberof protobuf.MallThree
         * @static
         * @param {protobuf.IMallThree} message MallThree message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MallThree.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.refId != null && Object.hasOwnProperty.call(message, "refId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.refId);
            if (message.buyNum != null && Object.hasOwnProperty.call(message, "buyNum"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.buyNum);
            return writer;
        };

        /**
         * Encodes the specified MallThree message, length delimited. Does not implicitly {@link protobuf.MallThree.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.MallThree
         * @static
         * @param {protobuf.IMallThree} message MallThree message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MallThree.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MallThree message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.MallThree
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.MallThree} MallThree
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MallThree.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.MallThree();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.refId = reader.string();
                    break;
                case 2:
                    message.buyNum = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MallThree message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.MallThree
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.MallThree} MallThree
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MallThree.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MallThree message.
         * @function verify
         * @memberof protobuf.MallThree
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MallThree.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.refId != null && message.hasOwnProperty("refId"))
                if (!$util.isString(message.refId))
                    return "refId: string expected";
            if (message.buyNum != null && message.hasOwnProperty("buyNum"))
                if (!$util.isInteger(message.buyNum))
                    return "buyNum: integer expected";
            return null;
        };

        /**
         * Creates a MallThree message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.MallThree
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.MallThree} MallThree
         */
        MallThree.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.MallThree)
                return object;
            var message = new $root.protobuf.MallThree();
            if (object.refId != null)
                message.refId = String(object.refId);
            if (object.buyNum != null)
                message.buyNum = object.buyNum | 0;
            return message;
        };

        /**
         * Creates a plain object from a MallThree message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.MallThree
         * @static
         * @param {protobuf.MallThree} message MallThree
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MallThree.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.refId = "";
                object.buyNum = 0;
            }
            if (message.refId != null && message.hasOwnProperty("refId"))
                object.refId = message.refId;
            if (message.buyNum != null && message.hasOwnProperty("buyNum"))
                object.buyNum = message.buyNum;
            return object;
        };

        /**
         * Converts this MallThree to JSON.
         * @function toJSON
         * @memberof protobuf.MallThree
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MallThree.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return MallThree;
    })();

    protobuf.MallFour = (function() {

        /**
         * Properties of a MallFour.
         * @memberof protobuf
         * @interface IMallFour
         * @property {Array.<protobuf.MallFour.IGiftBag>|null} [giftBag] 礼包信息
         * @property {number|null} [refreshNum] 每日手动刷新次数
         * @property {number|null} [refreshCDEndTime] 手动刷新CD结束时间(单位：秒)
         */

        /**
         * Constructs a new MallFour.
         * @memberof protobuf
         * @classdesc 精选好礼信息
         * @implements IMallFour
         * @constructor
         * @param {protobuf.IMallFour=} [properties] Properties to set
         */
        function MallFour(properties) {
            this.giftBag = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * 礼包信息
         * @member {Array.<protobuf.MallFour.IGiftBag>} giftBag
         * @memberof protobuf.MallFour
         * @instance
         */
        MallFour.prototype.giftBag = $util.emptyArray;

        /**
         * 每日手动刷新次数
         * @member {number} refreshNum
         * @memberof protobuf.MallFour
         * @instance
         */
        MallFour.prototype.refreshNum = 0;

        /**
         * 手动刷新CD结束时间(单位：秒)
         * @member {number} refreshCDEndTime
         * @memberof protobuf.MallFour
         * @instance
         */
        MallFour.prototype.refreshCDEndTime = 0;

        /**
         * Creates a new MallFour instance using the specified properties.
         * @function create
         * @memberof protobuf.MallFour
         * @static
         * @param {protobuf.IMallFour=} [properties] Properties to set
         * @returns {protobuf.MallFour} MallFour instance
         */
        MallFour.create = function create(properties) {
            return new MallFour(properties);
        };

        /**
         * Encodes the specified MallFour message. Does not implicitly {@link protobuf.MallFour.verify|verify} messages.
         * @function encode
         * @memberof protobuf.MallFour
         * @static
         * @param {protobuf.IMallFour} message MallFour message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MallFour.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.giftBag != null && message.giftBag.length)
                for (var i = 0; i < message.giftBag.length; ++i)
                    $root.protobuf.MallFour.GiftBag.encode(message.giftBag[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.refreshNum != null && Object.hasOwnProperty.call(message, "refreshNum"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.refreshNum);
            if (message.refreshCDEndTime != null && Object.hasOwnProperty.call(message, "refreshCDEndTime"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.refreshCDEndTime);
            return writer;
        };

        /**
         * Encodes the specified MallFour message, length delimited. Does not implicitly {@link protobuf.MallFour.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.MallFour
         * @static
         * @param {protobuf.IMallFour} message MallFour message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MallFour.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MallFour message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.MallFour
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.MallFour} MallFour
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MallFour.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.MallFour();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.giftBag && message.giftBag.length))
                        message.giftBag = [];
                    message.giftBag.push($root.protobuf.MallFour.GiftBag.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.refreshNum = reader.int32();
                    break;
                case 3:
                    message.refreshCDEndTime = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MallFour message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.MallFour
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.MallFour} MallFour
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MallFour.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MallFour message.
         * @function verify
         * @memberof protobuf.MallFour
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MallFour.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.giftBag != null && message.hasOwnProperty("giftBag")) {
                if (!Array.isArray(message.giftBag))
                    return "giftBag: array expected";
                for (var i = 0; i < message.giftBag.length; ++i) {
                    var error = $root.protobuf.MallFour.GiftBag.verify(message.giftBag[i]);
                    if (error)
                        return "giftBag." + error;
                }
            }
            if (message.refreshNum != null && message.hasOwnProperty("refreshNum"))
                if (!$util.isInteger(message.refreshNum))
                    return "refreshNum: integer expected";
            if (message.refreshCDEndTime != null && message.hasOwnProperty("refreshCDEndTime"))
                if (!$util.isInteger(message.refreshCDEndTime))
                    return "refreshCDEndTime: integer expected";
            return null;
        };

        /**
         * Creates a MallFour message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.MallFour
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.MallFour} MallFour
         */
        MallFour.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.MallFour)
                return object;
            var message = new $root.protobuf.MallFour();
            if (object.giftBag) {
                if (!Array.isArray(object.giftBag))
                    throw TypeError(".protobuf.MallFour.giftBag: array expected");
                message.giftBag = [];
                for (var i = 0; i < object.giftBag.length; ++i) {
                    if (typeof object.giftBag[i] !== "object")
                        throw TypeError(".protobuf.MallFour.giftBag: object expected");
                    message.giftBag[i] = $root.protobuf.MallFour.GiftBag.fromObject(object.giftBag[i]);
                }
            }
            if (object.refreshNum != null)
                message.refreshNum = object.refreshNum | 0;
            if (object.refreshCDEndTime != null)
                message.refreshCDEndTime = object.refreshCDEndTime | 0;
            return message;
        };

        /**
         * Creates a plain object from a MallFour message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.MallFour
         * @static
         * @param {protobuf.MallFour} message MallFour
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MallFour.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.giftBag = [];
            if (options.defaults) {
                object.refreshNum = 0;
                object.refreshCDEndTime = 0;
            }
            if (message.giftBag && message.giftBag.length) {
                object.giftBag = [];
                for (var j = 0; j < message.giftBag.length; ++j)
                    object.giftBag[j] = $root.protobuf.MallFour.GiftBag.toObject(message.giftBag[j], options);
            }
            if (message.refreshNum != null && message.hasOwnProperty("refreshNum"))
                object.refreshNum = message.refreshNum;
            if (message.refreshCDEndTime != null && message.hasOwnProperty("refreshCDEndTime"))
                object.refreshCDEndTime = message.refreshCDEndTime;
            return object;
        };

        /**
         * Converts this MallFour to JSON.
         * @function toJSON
         * @memberof protobuf.MallFour
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MallFour.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        MallFour.GiftBag = (function() {

            /**
             * Properties of a GiftBag.
             * @memberof protobuf.MallFour
             * @interface IGiftBag
             * @property {string|null} [refId] 礼包refId
             * @property {number|null} [buyNum] 每日购买次数
             */

            /**
             * Constructs a new GiftBag.
             * @memberof protobuf.MallFour
             * @classdesc Represents a GiftBag.
             * @implements IGiftBag
             * @constructor
             * @param {protobuf.MallFour.IGiftBag=} [properties] Properties to set
             */
            function GiftBag(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * 礼包refId
             * @member {string} refId
             * @memberof protobuf.MallFour.GiftBag
             * @instance
             */
            GiftBag.prototype.refId = "";

            /**
             * 每日购买次数
             * @member {number} buyNum
             * @memberof protobuf.MallFour.GiftBag
             * @instance
             */
            GiftBag.prototype.buyNum = 0;

            /**
             * Creates a new GiftBag instance using the specified properties.
             * @function create
             * @memberof protobuf.MallFour.GiftBag
             * @static
             * @param {protobuf.MallFour.IGiftBag=} [properties] Properties to set
             * @returns {protobuf.MallFour.GiftBag} GiftBag instance
             */
            GiftBag.create = function create(properties) {
                return new GiftBag(properties);
            };

            /**
             * Encodes the specified GiftBag message. Does not implicitly {@link protobuf.MallFour.GiftBag.verify|verify} messages.
             * @function encode
             * @memberof protobuf.MallFour.GiftBag
             * @static
             * @param {protobuf.MallFour.IGiftBag} message GiftBag message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GiftBag.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.refId != null && Object.hasOwnProperty.call(message, "refId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.refId);
                if (message.buyNum != null && Object.hasOwnProperty.call(message, "buyNum"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.buyNum);
                return writer;
            };

            /**
             * Encodes the specified GiftBag message, length delimited. Does not implicitly {@link protobuf.MallFour.GiftBag.verify|verify} messages.
             * @function encodeDelimited
             * @memberof protobuf.MallFour.GiftBag
             * @static
             * @param {protobuf.MallFour.IGiftBag} message GiftBag message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GiftBag.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GiftBag message from the specified reader or buffer.
             * @function decode
             * @memberof protobuf.MallFour.GiftBag
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {protobuf.MallFour.GiftBag} GiftBag
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GiftBag.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.MallFour.GiftBag();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.refId = reader.string();
                        break;
                    case 2:
                        message.buyNum = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a GiftBag message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof protobuf.MallFour.GiftBag
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {protobuf.MallFour.GiftBag} GiftBag
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GiftBag.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a GiftBag message.
             * @function verify
             * @memberof protobuf.MallFour.GiftBag
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GiftBag.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.refId != null && message.hasOwnProperty("refId"))
                    if (!$util.isString(message.refId))
                        return "refId: string expected";
                if (message.buyNum != null && message.hasOwnProperty("buyNum"))
                    if (!$util.isInteger(message.buyNum))
                        return "buyNum: integer expected";
                return null;
            };

            /**
             * Creates a GiftBag message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof protobuf.MallFour.GiftBag
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {protobuf.MallFour.GiftBag} GiftBag
             */
            GiftBag.fromObject = function fromObject(object) {
                if (object instanceof $root.protobuf.MallFour.GiftBag)
                    return object;
                var message = new $root.protobuf.MallFour.GiftBag();
                if (object.refId != null)
                    message.refId = String(object.refId);
                if (object.buyNum != null)
                    message.buyNum = object.buyNum | 0;
                return message;
            };

            /**
             * Creates a plain object from a GiftBag message. Also converts values to other types if specified.
             * @function toObject
             * @memberof protobuf.MallFour.GiftBag
             * @static
             * @param {protobuf.MallFour.GiftBag} message GiftBag
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GiftBag.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.refId = "";
                    object.buyNum = 0;
                }
                if (message.refId != null && message.hasOwnProperty("refId"))
                    object.refId = message.refId;
                if (message.buyNum != null && message.hasOwnProperty("buyNum"))
                    object.buyNum = message.buyNum;
                return object;
            };

            /**
             * Converts this GiftBag to JSON.
             * @function toJSON
             * @memberof protobuf.MallFour.GiftBag
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GiftBag.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GiftBag;
        })();

        return MallFour;
    })();

    protobuf.MallFive = (function() {

        /**
         * Properties of a MallFive.
         * @memberof protobuf
         * @interface IMallFive
         * @property {Array.<protobuf.MallFive.IGiftBag>|null} [giftBag] 礼包信息
         * @property {number|null} [refreshNum] 每日手动刷新次数
         * @property {number|null} [refreshCDEndTime] 手动刷新CD结束时间(单位：秒)
         */

        /**
         * Constructs a new MallFive.
         * @memberof protobuf
         * @classdesc 每日精选信息
         * @implements IMallFive
         * @constructor
         * @param {protobuf.IMallFive=} [properties] Properties to set
         */
        function MallFive(properties) {
            this.giftBag = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * 礼包信息
         * @member {Array.<protobuf.MallFive.IGiftBag>} giftBag
         * @memberof protobuf.MallFive
         * @instance
         */
        MallFive.prototype.giftBag = $util.emptyArray;

        /**
         * 每日手动刷新次数
         * @member {number} refreshNum
         * @memberof protobuf.MallFive
         * @instance
         */
        MallFive.prototype.refreshNum = 0;

        /**
         * 手动刷新CD结束时间(单位：秒)
         * @member {number} refreshCDEndTime
         * @memberof protobuf.MallFive
         * @instance
         */
        MallFive.prototype.refreshCDEndTime = 0;

        /**
         * Creates a new MallFive instance using the specified properties.
         * @function create
         * @memberof protobuf.MallFive
         * @static
         * @param {protobuf.IMallFive=} [properties] Properties to set
         * @returns {protobuf.MallFive} MallFive instance
         */
        MallFive.create = function create(properties) {
            return new MallFive(properties);
        };

        /**
         * Encodes the specified MallFive message. Does not implicitly {@link protobuf.MallFive.verify|verify} messages.
         * @function encode
         * @memberof protobuf.MallFive
         * @static
         * @param {protobuf.IMallFive} message MallFive message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MallFive.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.giftBag != null && message.giftBag.length)
                for (var i = 0; i < message.giftBag.length; ++i)
                    $root.protobuf.MallFive.GiftBag.encode(message.giftBag[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.refreshNum != null && Object.hasOwnProperty.call(message, "refreshNum"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.refreshNum);
            if (message.refreshCDEndTime != null && Object.hasOwnProperty.call(message, "refreshCDEndTime"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.refreshCDEndTime);
            return writer;
        };

        /**
         * Encodes the specified MallFive message, length delimited. Does not implicitly {@link protobuf.MallFive.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.MallFive
         * @static
         * @param {protobuf.IMallFive} message MallFive message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MallFive.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MallFive message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.MallFive
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.MallFive} MallFive
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MallFive.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.MallFive();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.giftBag && message.giftBag.length))
                        message.giftBag = [];
                    message.giftBag.push($root.protobuf.MallFive.GiftBag.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.refreshNum = reader.int32();
                    break;
                case 3:
                    message.refreshCDEndTime = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MallFive message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.MallFive
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.MallFive} MallFive
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MallFive.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MallFive message.
         * @function verify
         * @memberof protobuf.MallFive
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MallFive.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.giftBag != null && message.hasOwnProperty("giftBag")) {
                if (!Array.isArray(message.giftBag))
                    return "giftBag: array expected";
                for (var i = 0; i < message.giftBag.length; ++i) {
                    var error = $root.protobuf.MallFive.GiftBag.verify(message.giftBag[i]);
                    if (error)
                        return "giftBag." + error;
                }
            }
            if (message.refreshNum != null && message.hasOwnProperty("refreshNum"))
                if (!$util.isInteger(message.refreshNum))
                    return "refreshNum: integer expected";
            if (message.refreshCDEndTime != null && message.hasOwnProperty("refreshCDEndTime"))
                if (!$util.isInteger(message.refreshCDEndTime))
                    return "refreshCDEndTime: integer expected";
            return null;
        };

        /**
         * Creates a MallFive message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.MallFive
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.MallFive} MallFive
         */
        MallFive.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.MallFive)
                return object;
            var message = new $root.protobuf.MallFive();
            if (object.giftBag) {
                if (!Array.isArray(object.giftBag))
                    throw TypeError(".protobuf.MallFive.giftBag: array expected");
                message.giftBag = [];
                for (var i = 0; i < object.giftBag.length; ++i) {
                    if (typeof object.giftBag[i] !== "object")
                        throw TypeError(".protobuf.MallFive.giftBag: object expected");
                    message.giftBag[i] = $root.protobuf.MallFive.GiftBag.fromObject(object.giftBag[i]);
                }
            }
            if (object.refreshNum != null)
                message.refreshNum = object.refreshNum | 0;
            if (object.refreshCDEndTime != null)
                message.refreshCDEndTime = object.refreshCDEndTime | 0;
            return message;
        };

        /**
         * Creates a plain object from a MallFive message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.MallFive
         * @static
         * @param {protobuf.MallFive} message MallFive
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MallFive.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.giftBag = [];
            if (options.defaults) {
                object.refreshNum = 0;
                object.refreshCDEndTime = 0;
            }
            if (message.giftBag && message.giftBag.length) {
                object.giftBag = [];
                for (var j = 0; j < message.giftBag.length; ++j)
                    object.giftBag[j] = $root.protobuf.MallFive.GiftBag.toObject(message.giftBag[j], options);
            }
            if (message.refreshNum != null && message.hasOwnProperty("refreshNum"))
                object.refreshNum = message.refreshNum;
            if (message.refreshCDEndTime != null && message.hasOwnProperty("refreshCDEndTime"))
                object.refreshCDEndTime = message.refreshCDEndTime;
            return object;
        };

        /**
         * Converts this MallFive to JSON.
         * @function toJSON
         * @memberof protobuf.MallFive
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MallFive.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        MallFive.GiftBag = (function() {

            /**
             * Properties of a GiftBag.
             * @memberof protobuf.MallFive
             * @interface IGiftBag
             * @property {string|null} [refId] 礼包refId
             * @property {number|null} [buyNum] 每日购买次数
             */

            /**
             * Constructs a new GiftBag.
             * @memberof protobuf.MallFive
             * @classdesc Represents a GiftBag.
             * @implements IGiftBag
             * @constructor
             * @param {protobuf.MallFive.IGiftBag=} [properties] Properties to set
             */
            function GiftBag(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * 礼包refId
             * @member {string} refId
             * @memberof protobuf.MallFive.GiftBag
             * @instance
             */
            GiftBag.prototype.refId = "";

            /**
             * 每日购买次数
             * @member {number} buyNum
             * @memberof protobuf.MallFive.GiftBag
             * @instance
             */
            GiftBag.prototype.buyNum = 0;

            /**
             * Creates a new GiftBag instance using the specified properties.
             * @function create
             * @memberof protobuf.MallFive.GiftBag
             * @static
             * @param {protobuf.MallFive.IGiftBag=} [properties] Properties to set
             * @returns {protobuf.MallFive.GiftBag} GiftBag instance
             */
            GiftBag.create = function create(properties) {
                return new GiftBag(properties);
            };

            /**
             * Encodes the specified GiftBag message. Does not implicitly {@link protobuf.MallFive.GiftBag.verify|verify} messages.
             * @function encode
             * @memberof protobuf.MallFive.GiftBag
             * @static
             * @param {protobuf.MallFive.IGiftBag} message GiftBag message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GiftBag.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.refId != null && Object.hasOwnProperty.call(message, "refId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.refId);
                if (message.buyNum != null && Object.hasOwnProperty.call(message, "buyNum"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.buyNum);
                return writer;
            };

            /**
             * Encodes the specified GiftBag message, length delimited. Does not implicitly {@link protobuf.MallFive.GiftBag.verify|verify} messages.
             * @function encodeDelimited
             * @memberof protobuf.MallFive.GiftBag
             * @static
             * @param {protobuf.MallFive.IGiftBag} message GiftBag message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GiftBag.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GiftBag message from the specified reader or buffer.
             * @function decode
             * @memberof protobuf.MallFive.GiftBag
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {protobuf.MallFive.GiftBag} GiftBag
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GiftBag.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.MallFive.GiftBag();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.refId = reader.string();
                        break;
                    case 2:
                        message.buyNum = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a GiftBag message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof protobuf.MallFive.GiftBag
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {protobuf.MallFive.GiftBag} GiftBag
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GiftBag.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a GiftBag message.
             * @function verify
             * @memberof protobuf.MallFive.GiftBag
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GiftBag.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.refId != null && message.hasOwnProperty("refId"))
                    if (!$util.isString(message.refId))
                        return "refId: string expected";
                if (message.buyNum != null && message.hasOwnProperty("buyNum"))
                    if (!$util.isInteger(message.buyNum))
                        return "buyNum: integer expected";
                return null;
            };

            /**
             * Creates a GiftBag message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof protobuf.MallFive.GiftBag
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {protobuf.MallFive.GiftBag} GiftBag
             */
            GiftBag.fromObject = function fromObject(object) {
                if (object instanceof $root.protobuf.MallFive.GiftBag)
                    return object;
                var message = new $root.protobuf.MallFive.GiftBag();
                if (object.refId != null)
                    message.refId = String(object.refId);
                if (object.buyNum != null)
                    message.buyNum = object.buyNum | 0;
                return message;
            };

            /**
             * Creates a plain object from a GiftBag message. Also converts values to other types if specified.
             * @function toObject
             * @memberof protobuf.MallFive.GiftBag
             * @static
             * @param {protobuf.MallFive.GiftBag} message GiftBag
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GiftBag.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.refId = "";
                    object.buyNum = 0;
                }
                if (message.refId != null && message.hasOwnProperty("refId"))
                    object.refId = message.refId;
                if (message.buyNum != null && message.hasOwnProperty("buyNum"))
                    object.buyNum = message.buyNum;
                return object;
            };

            /**
             * Converts this GiftBag to JSON.
             * @function toJSON
             * @memberof protobuf.MallFive.GiftBag
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GiftBag.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GiftBag;
        })();

        return MallFive;
    })();

    protobuf.MallDiamondBuy = (function() {

        /**
         * Properties of a MallDiamondBuy.
         * @memberof protobuf
         * @interface IMallDiamondBuy
         * @property {Array.<protobuf.MallDiamondBuy.IDiamondBag>|null} [diamondBag] 礼包信息
         */

        /**
         * Constructs a new MallDiamondBuy.
         * @memberof protobuf
         * @classdesc 钻石购买信息
         * @implements IMallDiamondBuy
         * @constructor
         * @param {protobuf.IMallDiamondBuy=} [properties] Properties to set
         */
        function MallDiamondBuy(properties) {
            this.diamondBag = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * 礼包信息
         * @member {Array.<protobuf.MallDiamondBuy.IDiamondBag>} diamondBag
         * @memberof protobuf.MallDiamondBuy
         * @instance
         */
        MallDiamondBuy.prototype.diamondBag = $util.emptyArray;

        /**
         * Creates a new MallDiamondBuy instance using the specified properties.
         * @function create
         * @memberof protobuf.MallDiamondBuy
         * @static
         * @param {protobuf.IMallDiamondBuy=} [properties] Properties to set
         * @returns {protobuf.MallDiamondBuy} MallDiamondBuy instance
         */
        MallDiamondBuy.create = function create(properties) {
            return new MallDiamondBuy(properties);
        };

        /**
         * Encodes the specified MallDiamondBuy message. Does not implicitly {@link protobuf.MallDiamondBuy.verify|verify} messages.
         * @function encode
         * @memberof protobuf.MallDiamondBuy
         * @static
         * @param {protobuf.IMallDiamondBuy} message MallDiamondBuy message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MallDiamondBuy.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.diamondBag != null && message.diamondBag.length)
                for (var i = 0; i < message.diamondBag.length; ++i)
                    $root.protobuf.MallDiamondBuy.DiamondBag.encode(message.diamondBag[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified MallDiamondBuy message, length delimited. Does not implicitly {@link protobuf.MallDiamondBuy.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.MallDiamondBuy
         * @static
         * @param {protobuf.IMallDiamondBuy} message MallDiamondBuy message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MallDiamondBuy.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MallDiamondBuy message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.MallDiamondBuy
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.MallDiamondBuy} MallDiamondBuy
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MallDiamondBuy.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.MallDiamondBuy();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.diamondBag && message.diamondBag.length))
                        message.diamondBag = [];
                    message.diamondBag.push($root.protobuf.MallDiamondBuy.DiamondBag.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MallDiamondBuy message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.MallDiamondBuy
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.MallDiamondBuy} MallDiamondBuy
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MallDiamondBuy.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MallDiamondBuy message.
         * @function verify
         * @memberof protobuf.MallDiamondBuy
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MallDiamondBuy.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.diamondBag != null && message.hasOwnProperty("diamondBag")) {
                if (!Array.isArray(message.diamondBag))
                    return "diamondBag: array expected";
                for (var i = 0; i < message.diamondBag.length; ++i) {
                    var error = $root.protobuf.MallDiamondBuy.DiamondBag.verify(message.diamondBag[i]);
                    if (error)
                        return "diamondBag." + error;
                }
            }
            return null;
        };

        /**
         * Creates a MallDiamondBuy message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.MallDiamondBuy
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.MallDiamondBuy} MallDiamondBuy
         */
        MallDiamondBuy.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.MallDiamondBuy)
                return object;
            var message = new $root.protobuf.MallDiamondBuy();
            if (object.diamondBag) {
                if (!Array.isArray(object.diamondBag))
                    throw TypeError(".protobuf.MallDiamondBuy.diamondBag: array expected");
                message.diamondBag = [];
                for (var i = 0; i < object.diamondBag.length; ++i) {
                    if (typeof object.diamondBag[i] !== "object")
                        throw TypeError(".protobuf.MallDiamondBuy.diamondBag: object expected");
                    message.diamondBag[i] = $root.protobuf.MallDiamondBuy.DiamondBag.fromObject(object.diamondBag[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a MallDiamondBuy message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.MallDiamondBuy
         * @static
         * @param {protobuf.MallDiamondBuy} message MallDiamondBuy
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MallDiamondBuy.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.diamondBag = [];
            if (message.diamondBag && message.diamondBag.length) {
                object.diamondBag = [];
                for (var j = 0; j < message.diamondBag.length; ++j)
                    object.diamondBag[j] = $root.protobuf.MallDiamondBuy.DiamondBag.toObject(message.diamondBag[j], options);
            }
            return object;
        };

        /**
         * Converts this MallDiamondBuy to JSON.
         * @function toJSON
         * @memberof protobuf.MallDiamondBuy
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MallDiamondBuy.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        MallDiamondBuy.DiamondBag = (function() {

            /**
             * Properties of a DiamondBag.
             * @memberof protobuf.MallDiamondBuy
             * @interface IDiamondBag
             * @property {string|null} [refId] 礼包refId
             * @property {boolean|null} [firstBuy] 首次购买
             */

            /**
             * Constructs a new DiamondBag.
             * @memberof protobuf.MallDiamondBuy
             * @classdesc Represents a DiamondBag.
             * @implements IDiamondBag
             * @constructor
             * @param {protobuf.MallDiamondBuy.IDiamondBag=} [properties] Properties to set
             */
            function DiamondBag(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * 礼包refId
             * @member {string} refId
             * @memberof protobuf.MallDiamondBuy.DiamondBag
             * @instance
             */
            DiamondBag.prototype.refId = "";

            /**
             * 首次购买
             * @member {boolean} firstBuy
             * @memberof protobuf.MallDiamondBuy.DiamondBag
             * @instance
             */
            DiamondBag.prototype.firstBuy = false;

            /**
             * Creates a new DiamondBag instance using the specified properties.
             * @function create
             * @memberof protobuf.MallDiamondBuy.DiamondBag
             * @static
             * @param {protobuf.MallDiamondBuy.IDiamondBag=} [properties] Properties to set
             * @returns {protobuf.MallDiamondBuy.DiamondBag} DiamondBag instance
             */
            DiamondBag.create = function create(properties) {
                return new DiamondBag(properties);
            };

            /**
             * Encodes the specified DiamondBag message. Does not implicitly {@link protobuf.MallDiamondBuy.DiamondBag.verify|verify} messages.
             * @function encode
             * @memberof protobuf.MallDiamondBuy.DiamondBag
             * @static
             * @param {protobuf.MallDiamondBuy.IDiamondBag} message DiamondBag message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DiamondBag.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.refId != null && Object.hasOwnProperty.call(message, "refId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.refId);
                if (message.firstBuy != null && Object.hasOwnProperty.call(message, "firstBuy"))
                    writer.uint32(/* id 2, wireType 0 =*/16).bool(message.firstBuy);
                return writer;
            };

            /**
             * Encodes the specified DiamondBag message, length delimited. Does not implicitly {@link protobuf.MallDiamondBuy.DiamondBag.verify|verify} messages.
             * @function encodeDelimited
             * @memberof protobuf.MallDiamondBuy.DiamondBag
             * @static
             * @param {protobuf.MallDiamondBuy.IDiamondBag} message DiamondBag message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DiamondBag.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a DiamondBag message from the specified reader or buffer.
             * @function decode
             * @memberof protobuf.MallDiamondBuy.DiamondBag
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {protobuf.MallDiamondBuy.DiamondBag} DiamondBag
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DiamondBag.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.MallDiamondBuy.DiamondBag();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.refId = reader.string();
                        break;
                    case 2:
                        message.firstBuy = reader.bool();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a DiamondBag message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof protobuf.MallDiamondBuy.DiamondBag
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {protobuf.MallDiamondBuy.DiamondBag} DiamondBag
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DiamondBag.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a DiamondBag message.
             * @function verify
             * @memberof protobuf.MallDiamondBuy.DiamondBag
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DiamondBag.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.refId != null && message.hasOwnProperty("refId"))
                    if (!$util.isString(message.refId))
                        return "refId: string expected";
                if (message.firstBuy != null && message.hasOwnProperty("firstBuy"))
                    if (typeof message.firstBuy !== "boolean")
                        return "firstBuy: boolean expected";
                return null;
            };

            /**
             * Creates a DiamondBag message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof protobuf.MallDiamondBuy.DiamondBag
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {protobuf.MallDiamondBuy.DiamondBag} DiamondBag
             */
            DiamondBag.fromObject = function fromObject(object) {
                if (object instanceof $root.protobuf.MallDiamondBuy.DiamondBag)
                    return object;
                var message = new $root.protobuf.MallDiamondBuy.DiamondBag();
                if (object.refId != null)
                    message.refId = String(object.refId);
                if (object.firstBuy != null)
                    message.firstBuy = Boolean(object.firstBuy);
                return message;
            };

            /**
             * Creates a plain object from a DiamondBag message. Also converts values to other types if specified.
             * @function toObject
             * @memberof protobuf.MallDiamondBuy.DiamondBag
             * @static
             * @param {protobuf.MallDiamondBuy.DiamondBag} message DiamondBag
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DiamondBag.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.refId = "";
                    object.firstBuy = false;
                }
                if (message.refId != null && message.hasOwnProperty("refId"))
                    object.refId = message.refId;
                if (message.firstBuy != null && message.hasOwnProperty("firstBuy"))
                    object.firstBuy = message.firstBuy;
                return object;
            };

            /**
             * Converts this DiamondBag to JSON.
             * @function toJSON
             * @memberof protobuf.MallDiamondBuy.DiamondBag
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DiamondBag.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return DiamondBag;
        })();

        return MallDiamondBuy;
    })();

    protobuf.C2SMallInfo = (function() {

        /**
         * Properties of a C2SMallInfo.
         * @memberof protobuf
         * @interface IC2SMallInfo
         */

        /**
         * Constructs a new C2SMallInfo.
         * @memberof protobuf
         * @classdesc 请求商店全部信息
         * @implements IC2SMallInfo
         * @constructor
         * @param {protobuf.IC2SMallInfo=} [properties] Properties to set
         */
        function C2SMallInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new C2SMallInfo instance using the specified properties.
         * @function create
         * @memberof protobuf.C2SMallInfo
         * @static
         * @param {protobuf.IC2SMallInfo=} [properties] Properties to set
         * @returns {protobuf.C2SMallInfo} C2SMallInfo instance
         */
        C2SMallInfo.create = function create(properties) {
            return new C2SMallInfo(properties);
        };

        /**
         * Encodes the specified C2SMallInfo message. Does not implicitly {@link protobuf.C2SMallInfo.verify|verify} messages.
         * @function encode
         * @memberof protobuf.C2SMallInfo
         * @static
         * @param {protobuf.IC2SMallInfo} message C2SMallInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SMallInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified C2SMallInfo message, length delimited. Does not implicitly {@link protobuf.C2SMallInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.C2SMallInfo
         * @static
         * @param {protobuf.IC2SMallInfo} message C2SMallInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SMallInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2SMallInfo message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.C2SMallInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.C2SMallInfo} C2SMallInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SMallInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.C2SMallInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2SMallInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.C2SMallInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.C2SMallInfo} C2SMallInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SMallInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2SMallInfo message.
         * @function verify
         * @memberof protobuf.C2SMallInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2SMallInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a C2SMallInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.C2SMallInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.C2SMallInfo} C2SMallInfo
         */
        C2SMallInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.C2SMallInfo)
                return object;
            return new $root.protobuf.C2SMallInfo();
        };

        /**
         * Creates a plain object from a C2SMallInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.C2SMallInfo
         * @static
         * @param {protobuf.C2SMallInfo} message C2SMallInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        C2SMallInfo.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this C2SMallInfo to JSON.
         * @function toJSON
         * @memberof protobuf.C2SMallInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        C2SMallInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return C2SMallInfo;
    })();

    protobuf.S2CMallInfo = (function() {

        /**
         * Properties of a S2CMallInfo.
         * @memberof protobuf
         * @interface IS2CMallInfo
         * @property {protobuf.IMall|null} [mall] 商店全部信息
         */

        /**
         * Constructs a new S2CMallInfo.
         * @memberof protobuf
         * @classdesc 同步商店全部信息
         * @implements IS2CMallInfo
         * @constructor
         * @param {protobuf.IS2CMallInfo=} [properties] Properties to set
         */
        function S2CMallInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * 商店全部信息
         * @member {protobuf.IMall|null|undefined} mall
         * @memberof protobuf.S2CMallInfo
         * @instance
         */
        S2CMallInfo.prototype.mall = null;

        /**
         * Creates a new S2CMallInfo instance using the specified properties.
         * @function create
         * @memberof protobuf.S2CMallInfo
         * @static
         * @param {protobuf.IS2CMallInfo=} [properties] Properties to set
         * @returns {protobuf.S2CMallInfo} S2CMallInfo instance
         */
        S2CMallInfo.create = function create(properties) {
            return new S2CMallInfo(properties);
        };

        /**
         * Encodes the specified S2CMallInfo message. Does not implicitly {@link protobuf.S2CMallInfo.verify|verify} messages.
         * @function encode
         * @memberof protobuf.S2CMallInfo
         * @static
         * @param {protobuf.IS2CMallInfo} message S2CMallInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CMallInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.mall != null && Object.hasOwnProperty.call(message, "mall"))
                $root.protobuf.Mall.encode(message.mall, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified S2CMallInfo message, length delimited. Does not implicitly {@link protobuf.S2CMallInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.S2CMallInfo
         * @static
         * @param {protobuf.IS2CMallInfo} message S2CMallInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CMallInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a S2CMallInfo message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.S2CMallInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.S2CMallInfo} S2CMallInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CMallInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.S2CMallInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.mall = $root.protobuf.Mall.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a S2CMallInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.S2CMallInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.S2CMallInfo} S2CMallInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CMallInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a S2CMallInfo message.
         * @function verify
         * @memberof protobuf.S2CMallInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        S2CMallInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.mall != null && message.hasOwnProperty("mall")) {
                var error = $root.protobuf.Mall.verify(message.mall);
                if (error)
                    return "mall." + error;
            }
            return null;
        };

        /**
         * Creates a S2CMallInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.S2CMallInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.S2CMallInfo} S2CMallInfo
         */
        S2CMallInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.S2CMallInfo)
                return object;
            var message = new $root.protobuf.S2CMallInfo();
            if (object.mall != null) {
                if (typeof object.mall !== "object")
                    throw TypeError(".protobuf.S2CMallInfo.mall: object expected");
                message.mall = $root.protobuf.Mall.fromObject(object.mall);
            }
            return message;
        };

        /**
         * Creates a plain object from a S2CMallInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.S2CMallInfo
         * @static
         * @param {protobuf.S2CMallInfo} message S2CMallInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        S2CMallInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.mall = null;
            if (message.mall != null && message.hasOwnProperty("mall"))
                object.mall = $root.protobuf.Mall.toObject(message.mall, options);
            return object;
        };

        /**
         * Converts this S2CMallInfo to JSON.
         * @function toJSON
         * @memberof protobuf.S2CMallInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        S2CMallInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return S2CMallInfo;
    })();

    protobuf.C2SCardDayReward = (function() {

        /**
         * Properties of a C2SCardDayReward.
         * @memberof protobuf
         * @interface IC2SCardDayReward
         * @property {string|null} [refId] 月卡refId
         */

        /**
         * Constructs a new C2SCardDayReward.
         * @memberof protobuf
         * @classdesc 领取月卡每日奖励
         * @implements IC2SCardDayReward
         * @constructor
         * @param {protobuf.IC2SCardDayReward=} [properties] Properties to set
         */
        function C2SCardDayReward(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * 月卡refId
         * @member {string} refId
         * @memberof protobuf.C2SCardDayReward
         * @instance
         */
        C2SCardDayReward.prototype.refId = "";

        /**
         * Creates a new C2SCardDayReward instance using the specified properties.
         * @function create
         * @memberof protobuf.C2SCardDayReward
         * @static
         * @param {protobuf.IC2SCardDayReward=} [properties] Properties to set
         * @returns {protobuf.C2SCardDayReward} C2SCardDayReward instance
         */
        C2SCardDayReward.create = function create(properties) {
            return new C2SCardDayReward(properties);
        };

        /**
         * Encodes the specified C2SCardDayReward message. Does not implicitly {@link protobuf.C2SCardDayReward.verify|verify} messages.
         * @function encode
         * @memberof protobuf.C2SCardDayReward
         * @static
         * @param {protobuf.IC2SCardDayReward} message C2SCardDayReward message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SCardDayReward.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.refId != null && Object.hasOwnProperty.call(message, "refId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.refId);
            return writer;
        };

        /**
         * Encodes the specified C2SCardDayReward message, length delimited. Does not implicitly {@link protobuf.C2SCardDayReward.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.C2SCardDayReward
         * @static
         * @param {protobuf.IC2SCardDayReward} message C2SCardDayReward message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SCardDayReward.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2SCardDayReward message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.C2SCardDayReward
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.C2SCardDayReward} C2SCardDayReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SCardDayReward.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.C2SCardDayReward();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.refId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2SCardDayReward message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.C2SCardDayReward
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.C2SCardDayReward} C2SCardDayReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SCardDayReward.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2SCardDayReward message.
         * @function verify
         * @memberof protobuf.C2SCardDayReward
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2SCardDayReward.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.refId != null && message.hasOwnProperty("refId"))
                if (!$util.isString(message.refId))
                    return "refId: string expected";
            return null;
        };

        /**
         * Creates a C2SCardDayReward message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.C2SCardDayReward
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.C2SCardDayReward} C2SCardDayReward
         */
        C2SCardDayReward.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.C2SCardDayReward)
                return object;
            var message = new $root.protobuf.C2SCardDayReward();
            if (object.refId != null)
                message.refId = String(object.refId);
            return message;
        };

        /**
         * Creates a plain object from a C2SCardDayReward message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.C2SCardDayReward
         * @static
         * @param {protobuf.C2SCardDayReward} message C2SCardDayReward
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        C2SCardDayReward.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.refId = "";
            if (message.refId != null && message.hasOwnProperty("refId"))
                object.refId = message.refId;
            return object;
        };

        /**
         * Converts this C2SCardDayReward to JSON.
         * @function toJSON
         * @memberof protobuf.C2SCardDayReward
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        C2SCardDayReward.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return C2SCardDayReward;
    })();

    protobuf.S2CCardDayReward = (function() {

        /**
         * Properties of a S2CCardDayReward.
         * @memberof protobuf
         * @interface IS2CCardDayReward
         * @property {protobuf.IMallTwo|null} [mallTwo] 超值月卡信息
         */

        /**
         * Constructs a new S2CCardDayReward.
         * @memberof protobuf
         * @classdesc 同步月卡每日奖励
         * @implements IS2CCardDayReward
         * @constructor
         * @param {protobuf.IS2CCardDayReward=} [properties] Properties to set
         */
        function S2CCardDayReward(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * 超值月卡信息
         * @member {protobuf.IMallTwo|null|undefined} mallTwo
         * @memberof protobuf.S2CCardDayReward
         * @instance
         */
        S2CCardDayReward.prototype.mallTwo = null;

        /**
         * Creates a new S2CCardDayReward instance using the specified properties.
         * @function create
         * @memberof protobuf.S2CCardDayReward
         * @static
         * @param {protobuf.IS2CCardDayReward=} [properties] Properties to set
         * @returns {protobuf.S2CCardDayReward} S2CCardDayReward instance
         */
        S2CCardDayReward.create = function create(properties) {
            return new S2CCardDayReward(properties);
        };

        /**
         * Encodes the specified S2CCardDayReward message. Does not implicitly {@link protobuf.S2CCardDayReward.verify|verify} messages.
         * @function encode
         * @memberof protobuf.S2CCardDayReward
         * @static
         * @param {protobuf.IS2CCardDayReward} message S2CCardDayReward message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CCardDayReward.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.mallTwo != null && Object.hasOwnProperty.call(message, "mallTwo"))
                $root.protobuf.MallTwo.encode(message.mallTwo, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified S2CCardDayReward message, length delimited. Does not implicitly {@link protobuf.S2CCardDayReward.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.S2CCardDayReward
         * @static
         * @param {protobuf.IS2CCardDayReward} message S2CCardDayReward message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CCardDayReward.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a S2CCardDayReward message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.S2CCardDayReward
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.S2CCardDayReward} S2CCardDayReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CCardDayReward.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.S2CCardDayReward();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.mallTwo = $root.protobuf.MallTwo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a S2CCardDayReward message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.S2CCardDayReward
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.S2CCardDayReward} S2CCardDayReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CCardDayReward.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a S2CCardDayReward message.
         * @function verify
         * @memberof protobuf.S2CCardDayReward
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        S2CCardDayReward.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.mallTwo != null && message.hasOwnProperty("mallTwo")) {
                var error = $root.protobuf.MallTwo.verify(message.mallTwo);
                if (error)
                    return "mallTwo." + error;
            }
            return null;
        };

        /**
         * Creates a S2CCardDayReward message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.S2CCardDayReward
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.S2CCardDayReward} S2CCardDayReward
         */
        S2CCardDayReward.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.S2CCardDayReward)
                return object;
            var message = new $root.protobuf.S2CCardDayReward();
            if (object.mallTwo != null) {
                if (typeof object.mallTwo !== "object")
                    throw TypeError(".protobuf.S2CCardDayReward.mallTwo: object expected");
                message.mallTwo = $root.protobuf.MallTwo.fromObject(object.mallTwo);
            }
            return message;
        };

        /**
         * Creates a plain object from a S2CCardDayReward message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.S2CCardDayReward
         * @static
         * @param {protobuf.S2CCardDayReward} message S2CCardDayReward
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        S2CCardDayReward.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.mallTwo = null;
            if (message.mallTwo != null && message.hasOwnProperty("mallTwo"))
                object.mallTwo = $root.protobuf.MallTwo.toObject(message.mallTwo, options);
            return object;
        };

        /**
         * Converts this S2CCardDayReward to JSON.
         * @function toJSON
         * @memberof protobuf.S2CCardDayReward
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        S2CCardDayReward.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return S2CCardDayReward;
    })();

    protobuf.C2SMallFourRefresh = (function() {

        /**
         * Properties of a C2SMallFourRefresh.
         * @memberof protobuf
         * @interface IC2SMallFourRefresh
         */

        /**
         * Constructs a new C2SMallFourRefresh.
         * @memberof protobuf
         * @classdesc 刷新精选好礼
         * @implements IC2SMallFourRefresh
         * @constructor
         * @param {protobuf.IC2SMallFourRefresh=} [properties] Properties to set
         */
        function C2SMallFourRefresh(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new C2SMallFourRefresh instance using the specified properties.
         * @function create
         * @memberof protobuf.C2SMallFourRefresh
         * @static
         * @param {protobuf.IC2SMallFourRefresh=} [properties] Properties to set
         * @returns {protobuf.C2SMallFourRefresh} C2SMallFourRefresh instance
         */
        C2SMallFourRefresh.create = function create(properties) {
            return new C2SMallFourRefresh(properties);
        };

        /**
         * Encodes the specified C2SMallFourRefresh message. Does not implicitly {@link protobuf.C2SMallFourRefresh.verify|verify} messages.
         * @function encode
         * @memberof protobuf.C2SMallFourRefresh
         * @static
         * @param {protobuf.IC2SMallFourRefresh} message C2SMallFourRefresh message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SMallFourRefresh.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified C2SMallFourRefresh message, length delimited. Does not implicitly {@link protobuf.C2SMallFourRefresh.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.C2SMallFourRefresh
         * @static
         * @param {protobuf.IC2SMallFourRefresh} message C2SMallFourRefresh message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SMallFourRefresh.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2SMallFourRefresh message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.C2SMallFourRefresh
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.C2SMallFourRefresh} C2SMallFourRefresh
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SMallFourRefresh.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.C2SMallFourRefresh();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2SMallFourRefresh message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.C2SMallFourRefresh
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.C2SMallFourRefresh} C2SMallFourRefresh
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SMallFourRefresh.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2SMallFourRefresh message.
         * @function verify
         * @memberof protobuf.C2SMallFourRefresh
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2SMallFourRefresh.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a C2SMallFourRefresh message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.C2SMallFourRefresh
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.C2SMallFourRefresh} C2SMallFourRefresh
         */
        C2SMallFourRefresh.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.C2SMallFourRefresh)
                return object;
            return new $root.protobuf.C2SMallFourRefresh();
        };

        /**
         * Creates a plain object from a C2SMallFourRefresh message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.C2SMallFourRefresh
         * @static
         * @param {protobuf.C2SMallFourRefresh} message C2SMallFourRefresh
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        C2SMallFourRefresh.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this C2SMallFourRefresh to JSON.
         * @function toJSON
         * @memberof protobuf.C2SMallFourRefresh
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        C2SMallFourRefresh.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return C2SMallFourRefresh;
    })();

    protobuf.S2CMallFourRefresh = (function() {

        /**
         * Properties of a S2CMallFourRefresh.
         * @memberof protobuf
         * @interface IS2CMallFourRefresh
         * @property {protobuf.IMallFour|null} [mallFour] 商店全部信息
         */

        /**
         * Constructs a new S2CMallFourRefresh.
         * @memberof protobuf
         * @classdesc 刷新精选好礼
         * @implements IS2CMallFourRefresh
         * @constructor
         * @param {protobuf.IS2CMallFourRefresh=} [properties] Properties to set
         */
        function S2CMallFourRefresh(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * 商店全部信息
         * @member {protobuf.IMallFour|null|undefined} mallFour
         * @memberof protobuf.S2CMallFourRefresh
         * @instance
         */
        S2CMallFourRefresh.prototype.mallFour = null;

        /**
         * Creates a new S2CMallFourRefresh instance using the specified properties.
         * @function create
         * @memberof protobuf.S2CMallFourRefresh
         * @static
         * @param {protobuf.IS2CMallFourRefresh=} [properties] Properties to set
         * @returns {protobuf.S2CMallFourRefresh} S2CMallFourRefresh instance
         */
        S2CMallFourRefresh.create = function create(properties) {
            return new S2CMallFourRefresh(properties);
        };

        /**
         * Encodes the specified S2CMallFourRefresh message. Does not implicitly {@link protobuf.S2CMallFourRefresh.verify|verify} messages.
         * @function encode
         * @memberof protobuf.S2CMallFourRefresh
         * @static
         * @param {protobuf.IS2CMallFourRefresh} message S2CMallFourRefresh message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CMallFourRefresh.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.mallFour != null && Object.hasOwnProperty.call(message, "mallFour"))
                $root.protobuf.MallFour.encode(message.mallFour, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified S2CMallFourRefresh message, length delimited. Does not implicitly {@link protobuf.S2CMallFourRefresh.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.S2CMallFourRefresh
         * @static
         * @param {protobuf.IS2CMallFourRefresh} message S2CMallFourRefresh message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CMallFourRefresh.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a S2CMallFourRefresh message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.S2CMallFourRefresh
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.S2CMallFourRefresh} S2CMallFourRefresh
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CMallFourRefresh.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.S2CMallFourRefresh();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.mallFour = $root.protobuf.MallFour.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a S2CMallFourRefresh message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.S2CMallFourRefresh
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.S2CMallFourRefresh} S2CMallFourRefresh
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CMallFourRefresh.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a S2CMallFourRefresh message.
         * @function verify
         * @memberof protobuf.S2CMallFourRefresh
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        S2CMallFourRefresh.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.mallFour != null && message.hasOwnProperty("mallFour")) {
                var error = $root.protobuf.MallFour.verify(message.mallFour);
                if (error)
                    return "mallFour." + error;
            }
            return null;
        };

        /**
         * Creates a S2CMallFourRefresh message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.S2CMallFourRefresh
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.S2CMallFourRefresh} S2CMallFourRefresh
         */
        S2CMallFourRefresh.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.S2CMallFourRefresh)
                return object;
            var message = new $root.protobuf.S2CMallFourRefresh();
            if (object.mallFour != null) {
                if (typeof object.mallFour !== "object")
                    throw TypeError(".protobuf.S2CMallFourRefresh.mallFour: object expected");
                message.mallFour = $root.protobuf.MallFour.fromObject(object.mallFour);
            }
            return message;
        };

        /**
         * Creates a plain object from a S2CMallFourRefresh message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.S2CMallFourRefresh
         * @static
         * @param {protobuf.S2CMallFourRefresh} message S2CMallFourRefresh
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        S2CMallFourRefresh.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.mallFour = null;
            if (message.mallFour != null && message.hasOwnProperty("mallFour"))
                object.mallFour = $root.protobuf.MallFour.toObject(message.mallFour, options);
            return object;
        };

        /**
         * Converts this S2CMallFourRefresh to JSON.
         * @function toJSON
         * @memberof protobuf.S2CMallFourRefresh
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        S2CMallFourRefresh.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return S2CMallFourRefresh;
    })();

    protobuf.C2SMallFiveRefresh = (function() {

        /**
         * Properties of a C2SMallFiveRefresh.
         * @memberof protobuf
         * @interface IC2SMallFiveRefresh
         */

        /**
         * Constructs a new C2SMallFiveRefresh.
         * @memberof protobuf
         * @classdesc 刷新每日精选
         * @implements IC2SMallFiveRefresh
         * @constructor
         * @param {protobuf.IC2SMallFiveRefresh=} [properties] Properties to set
         */
        function C2SMallFiveRefresh(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new C2SMallFiveRefresh instance using the specified properties.
         * @function create
         * @memberof protobuf.C2SMallFiveRefresh
         * @static
         * @param {protobuf.IC2SMallFiveRefresh=} [properties] Properties to set
         * @returns {protobuf.C2SMallFiveRefresh} C2SMallFiveRefresh instance
         */
        C2SMallFiveRefresh.create = function create(properties) {
            return new C2SMallFiveRefresh(properties);
        };

        /**
         * Encodes the specified C2SMallFiveRefresh message. Does not implicitly {@link protobuf.C2SMallFiveRefresh.verify|verify} messages.
         * @function encode
         * @memberof protobuf.C2SMallFiveRefresh
         * @static
         * @param {protobuf.IC2SMallFiveRefresh} message C2SMallFiveRefresh message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SMallFiveRefresh.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified C2SMallFiveRefresh message, length delimited. Does not implicitly {@link protobuf.C2SMallFiveRefresh.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.C2SMallFiveRefresh
         * @static
         * @param {protobuf.IC2SMallFiveRefresh} message C2SMallFiveRefresh message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SMallFiveRefresh.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2SMallFiveRefresh message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.C2SMallFiveRefresh
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.C2SMallFiveRefresh} C2SMallFiveRefresh
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SMallFiveRefresh.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.C2SMallFiveRefresh();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2SMallFiveRefresh message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.C2SMallFiveRefresh
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.C2SMallFiveRefresh} C2SMallFiveRefresh
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SMallFiveRefresh.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2SMallFiveRefresh message.
         * @function verify
         * @memberof protobuf.C2SMallFiveRefresh
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2SMallFiveRefresh.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a C2SMallFiveRefresh message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.C2SMallFiveRefresh
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.C2SMallFiveRefresh} C2SMallFiveRefresh
         */
        C2SMallFiveRefresh.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.C2SMallFiveRefresh)
                return object;
            return new $root.protobuf.C2SMallFiveRefresh();
        };

        /**
         * Creates a plain object from a C2SMallFiveRefresh message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.C2SMallFiveRefresh
         * @static
         * @param {protobuf.C2SMallFiveRefresh} message C2SMallFiveRefresh
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        C2SMallFiveRefresh.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this C2SMallFiveRefresh to JSON.
         * @function toJSON
         * @memberof protobuf.C2SMallFiveRefresh
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        C2SMallFiveRefresh.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return C2SMallFiveRefresh;
    })();

    protobuf.S2CMallFiveRefresh = (function() {

        /**
         * Properties of a S2CMallFiveRefresh.
         * @memberof protobuf
         * @interface IS2CMallFiveRefresh
         * @property {protobuf.IMallFive|null} [mallFive] 商店全部信息
         */

        /**
         * Constructs a new S2CMallFiveRefresh.
         * @memberof protobuf
         * @classdesc 刷新每日精选
         * @implements IS2CMallFiveRefresh
         * @constructor
         * @param {protobuf.IS2CMallFiveRefresh=} [properties] Properties to set
         */
        function S2CMallFiveRefresh(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * 商店全部信息
         * @member {protobuf.IMallFive|null|undefined} mallFive
         * @memberof protobuf.S2CMallFiveRefresh
         * @instance
         */
        S2CMallFiveRefresh.prototype.mallFive = null;

        /**
         * Creates a new S2CMallFiveRefresh instance using the specified properties.
         * @function create
         * @memberof protobuf.S2CMallFiveRefresh
         * @static
         * @param {protobuf.IS2CMallFiveRefresh=} [properties] Properties to set
         * @returns {protobuf.S2CMallFiveRefresh} S2CMallFiveRefresh instance
         */
        S2CMallFiveRefresh.create = function create(properties) {
            return new S2CMallFiveRefresh(properties);
        };

        /**
         * Encodes the specified S2CMallFiveRefresh message. Does not implicitly {@link protobuf.S2CMallFiveRefresh.verify|verify} messages.
         * @function encode
         * @memberof protobuf.S2CMallFiveRefresh
         * @static
         * @param {protobuf.IS2CMallFiveRefresh} message S2CMallFiveRefresh message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CMallFiveRefresh.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.mallFive != null && Object.hasOwnProperty.call(message, "mallFive"))
                $root.protobuf.MallFive.encode(message.mallFive, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified S2CMallFiveRefresh message, length delimited. Does not implicitly {@link protobuf.S2CMallFiveRefresh.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.S2CMallFiveRefresh
         * @static
         * @param {protobuf.IS2CMallFiveRefresh} message S2CMallFiveRefresh message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CMallFiveRefresh.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a S2CMallFiveRefresh message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.S2CMallFiveRefresh
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.S2CMallFiveRefresh} S2CMallFiveRefresh
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CMallFiveRefresh.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.S2CMallFiveRefresh();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.mallFive = $root.protobuf.MallFive.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a S2CMallFiveRefresh message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.S2CMallFiveRefresh
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.S2CMallFiveRefresh} S2CMallFiveRefresh
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CMallFiveRefresh.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a S2CMallFiveRefresh message.
         * @function verify
         * @memberof protobuf.S2CMallFiveRefresh
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        S2CMallFiveRefresh.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.mallFive != null && message.hasOwnProperty("mallFive")) {
                var error = $root.protobuf.MallFive.verify(message.mallFive);
                if (error)
                    return "mallFive." + error;
            }
            return null;
        };

        /**
         * Creates a S2CMallFiveRefresh message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.S2CMallFiveRefresh
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.S2CMallFiveRefresh} S2CMallFiveRefresh
         */
        S2CMallFiveRefresh.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.S2CMallFiveRefresh)
                return object;
            var message = new $root.protobuf.S2CMallFiveRefresh();
            if (object.mallFive != null) {
                if (typeof object.mallFive !== "object")
                    throw TypeError(".protobuf.S2CMallFiveRefresh.mallFive: object expected");
                message.mallFive = $root.protobuf.MallFive.fromObject(object.mallFive);
            }
            return message;
        };

        /**
         * Creates a plain object from a S2CMallFiveRefresh message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.S2CMallFiveRefresh
         * @static
         * @param {protobuf.S2CMallFiveRefresh} message S2CMallFiveRefresh
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        S2CMallFiveRefresh.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.mallFive = null;
            if (message.mallFive != null && message.hasOwnProperty("mallFive"))
                object.mallFive = $root.protobuf.MallFive.toObject(message.mallFive, options);
            return object;
        };

        /**
         * Converts this S2CMallFiveRefresh to JSON.
         * @function toJSON
         * @memberof protobuf.S2CMallFiveRefresh
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        S2CMallFiveRefresh.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return S2CMallFiveRefresh;
    })();

    protobuf.C2SMallFiveBuy = (function() {

        /**
         * Properties of a C2SMallFiveBuy.
         * @memberof protobuf
         * @interface IC2SMallFiveBuy
         * @property {string|null} [refId] 礼包refId
         */

        /**
         * Constructs a new C2SMallFiveBuy.
         * @memberof protobuf
         * @classdesc 每日精选购买
         * @implements IC2SMallFiveBuy
         * @constructor
         * @param {protobuf.IC2SMallFiveBuy=} [properties] Properties to set
         */
        function C2SMallFiveBuy(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * 礼包refId
         * @member {string} refId
         * @memberof protobuf.C2SMallFiveBuy
         * @instance
         */
        C2SMallFiveBuy.prototype.refId = "";

        /**
         * Creates a new C2SMallFiveBuy instance using the specified properties.
         * @function create
         * @memberof protobuf.C2SMallFiveBuy
         * @static
         * @param {protobuf.IC2SMallFiveBuy=} [properties] Properties to set
         * @returns {protobuf.C2SMallFiveBuy} C2SMallFiveBuy instance
         */
        C2SMallFiveBuy.create = function create(properties) {
            return new C2SMallFiveBuy(properties);
        };

        /**
         * Encodes the specified C2SMallFiveBuy message. Does not implicitly {@link protobuf.C2SMallFiveBuy.verify|verify} messages.
         * @function encode
         * @memberof protobuf.C2SMallFiveBuy
         * @static
         * @param {protobuf.IC2SMallFiveBuy} message C2SMallFiveBuy message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SMallFiveBuy.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.refId != null && Object.hasOwnProperty.call(message, "refId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.refId);
            return writer;
        };

        /**
         * Encodes the specified C2SMallFiveBuy message, length delimited. Does not implicitly {@link protobuf.C2SMallFiveBuy.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.C2SMallFiveBuy
         * @static
         * @param {protobuf.IC2SMallFiveBuy} message C2SMallFiveBuy message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SMallFiveBuy.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2SMallFiveBuy message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.C2SMallFiveBuy
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.C2SMallFiveBuy} C2SMallFiveBuy
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SMallFiveBuy.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.C2SMallFiveBuy();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.refId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2SMallFiveBuy message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.C2SMallFiveBuy
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.C2SMallFiveBuy} C2SMallFiveBuy
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SMallFiveBuy.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2SMallFiveBuy message.
         * @function verify
         * @memberof protobuf.C2SMallFiveBuy
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2SMallFiveBuy.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.refId != null && message.hasOwnProperty("refId"))
                if (!$util.isString(message.refId))
                    return "refId: string expected";
            return null;
        };

        /**
         * Creates a C2SMallFiveBuy message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.C2SMallFiveBuy
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.C2SMallFiveBuy} C2SMallFiveBuy
         */
        C2SMallFiveBuy.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.C2SMallFiveBuy)
                return object;
            var message = new $root.protobuf.C2SMallFiveBuy();
            if (object.refId != null)
                message.refId = String(object.refId);
            return message;
        };

        /**
         * Creates a plain object from a C2SMallFiveBuy message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.C2SMallFiveBuy
         * @static
         * @param {protobuf.C2SMallFiveBuy} message C2SMallFiveBuy
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        C2SMallFiveBuy.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.refId = "";
            if (message.refId != null && message.hasOwnProperty("refId"))
                object.refId = message.refId;
            return object;
        };

        /**
         * Converts this C2SMallFiveBuy to JSON.
         * @function toJSON
         * @memberof protobuf.C2SMallFiveBuy
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        C2SMallFiveBuy.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return C2SMallFiveBuy;
    })();

    protobuf.S2CMallFiveBuy = (function() {

        /**
         * Properties of a S2CMallFiveBuy.
         * @memberof protobuf
         * @interface IS2CMallFiveBuy
         */

        /**
         * Constructs a new S2CMallFiveBuy.
         * @memberof protobuf
         * @classdesc 每日精选购买
         * @implements IS2CMallFiveBuy
         * @constructor
         * @param {protobuf.IS2CMallFiveBuy=} [properties] Properties to set
         */
        function S2CMallFiveBuy(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new S2CMallFiveBuy instance using the specified properties.
         * @function create
         * @memberof protobuf.S2CMallFiveBuy
         * @static
         * @param {protobuf.IS2CMallFiveBuy=} [properties] Properties to set
         * @returns {protobuf.S2CMallFiveBuy} S2CMallFiveBuy instance
         */
        S2CMallFiveBuy.create = function create(properties) {
            return new S2CMallFiveBuy(properties);
        };

        /**
         * Encodes the specified S2CMallFiveBuy message. Does not implicitly {@link protobuf.S2CMallFiveBuy.verify|verify} messages.
         * @function encode
         * @memberof protobuf.S2CMallFiveBuy
         * @static
         * @param {protobuf.IS2CMallFiveBuy} message S2CMallFiveBuy message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CMallFiveBuy.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified S2CMallFiveBuy message, length delimited. Does not implicitly {@link protobuf.S2CMallFiveBuy.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.S2CMallFiveBuy
         * @static
         * @param {protobuf.IS2CMallFiveBuy} message S2CMallFiveBuy message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CMallFiveBuy.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a S2CMallFiveBuy message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.S2CMallFiveBuy
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.S2CMallFiveBuy} S2CMallFiveBuy
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CMallFiveBuy.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.S2CMallFiveBuy();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a S2CMallFiveBuy message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.S2CMallFiveBuy
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.S2CMallFiveBuy} S2CMallFiveBuy
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CMallFiveBuy.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a S2CMallFiveBuy message.
         * @function verify
         * @memberof protobuf.S2CMallFiveBuy
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        S2CMallFiveBuy.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a S2CMallFiveBuy message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.S2CMallFiveBuy
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.S2CMallFiveBuy} S2CMallFiveBuy
         */
        S2CMallFiveBuy.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.S2CMallFiveBuy)
                return object;
            return new $root.protobuf.S2CMallFiveBuy();
        };

        /**
         * Creates a plain object from a S2CMallFiveBuy message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.S2CMallFiveBuy
         * @static
         * @param {protobuf.S2CMallFiveBuy} message S2CMallFiveBuy
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        S2CMallFiveBuy.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this S2CMallFiveBuy to JSON.
         * @function toJSON
         * @memberof protobuf.S2CMallFiveBuy
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        S2CMallFiveBuy.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return S2CMallFiveBuy;
    })();

    protobuf.C2SMallGoldBuy = (function() {

        /**
         * Properties of a C2SMallGoldBuy.
         * @memberof protobuf
         * @interface IC2SMallGoldBuy
         * @property {string|null} [refId] 礼包refId
         */

        /**
         * Constructs a new C2SMallGoldBuy.
         * @memberof protobuf
         * @classdesc 金币购买
         * @implements IC2SMallGoldBuy
         * @constructor
         * @param {protobuf.IC2SMallGoldBuy=} [properties] Properties to set
         */
        function C2SMallGoldBuy(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * 礼包refId
         * @member {string} refId
         * @memberof protobuf.C2SMallGoldBuy
         * @instance
         */
        C2SMallGoldBuy.prototype.refId = "";

        /**
         * Creates a new C2SMallGoldBuy instance using the specified properties.
         * @function create
         * @memberof protobuf.C2SMallGoldBuy
         * @static
         * @param {protobuf.IC2SMallGoldBuy=} [properties] Properties to set
         * @returns {protobuf.C2SMallGoldBuy} C2SMallGoldBuy instance
         */
        C2SMallGoldBuy.create = function create(properties) {
            return new C2SMallGoldBuy(properties);
        };

        /**
         * Encodes the specified C2SMallGoldBuy message. Does not implicitly {@link protobuf.C2SMallGoldBuy.verify|verify} messages.
         * @function encode
         * @memberof protobuf.C2SMallGoldBuy
         * @static
         * @param {protobuf.IC2SMallGoldBuy} message C2SMallGoldBuy message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SMallGoldBuy.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.refId != null && Object.hasOwnProperty.call(message, "refId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.refId);
            return writer;
        };

        /**
         * Encodes the specified C2SMallGoldBuy message, length delimited. Does not implicitly {@link protobuf.C2SMallGoldBuy.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.C2SMallGoldBuy
         * @static
         * @param {protobuf.IC2SMallGoldBuy} message C2SMallGoldBuy message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SMallGoldBuy.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2SMallGoldBuy message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.C2SMallGoldBuy
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.C2SMallGoldBuy} C2SMallGoldBuy
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SMallGoldBuy.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.C2SMallGoldBuy();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.refId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2SMallGoldBuy message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.C2SMallGoldBuy
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.C2SMallGoldBuy} C2SMallGoldBuy
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SMallGoldBuy.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2SMallGoldBuy message.
         * @function verify
         * @memberof protobuf.C2SMallGoldBuy
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2SMallGoldBuy.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.refId != null && message.hasOwnProperty("refId"))
                if (!$util.isString(message.refId))
                    return "refId: string expected";
            return null;
        };

        /**
         * Creates a C2SMallGoldBuy message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.C2SMallGoldBuy
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.C2SMallGoldBuy} C2SMallGoldBuy
         */
        C2SMallGoldBuy.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.C2SMallGoldBuy)
                return object;
            var message = new $root.protobuf.C2SMallGoldBuy();
            if (object.refId != null)
                message.refId = String(object.refId);
            return message;
        };

        /**
         * Creates a plain object from a C2SMallGoldBuy message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.C2SMallGoldBuy
         * @static
         * @param {protobuf.C2SMallGoldBuy} message C2SMallGoldBuy
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        C2SMallGoldBuy.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.refId = "";
            if (message.refId != null && message.hasOwnProperty("refId"))
                object.refId = message.refId;
            return object;
        };

        /**
         * Converts this C2SMallGoldBuy to JSON.
         * @function toJSON
         * @memberof protobuf.C2SMallGoldBuy
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        C2SMallGoldBuy.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return C2SMallGoldBuy;
    })();

    protobuf.S2CMallGoldBuy = (function() {

        /**
         * Properties of a S2CMallGoldBuy.
         * @memberof protobuf
         * @interface IS2CMallGoldBuy
         */

        /**
         * Constructs a new S2CMallGoldBuy.
         * @memberof protobuf
         * @classdesc 金币购买
         * @implements IS2CMallGoldBuy
         * @constructor
         * @param {protobuf.IS2CMallGoldBuy=} [properties] Properties to set
         */
        function S2CMallGoldBuy(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new S2CMallGoldBuy instance using the specified properties.
         * @function create
         * @memberof protobuf.S2CMallGoldBuy
         * @static
         * @param {protobuf.IS2CMallGoldBuy=} [properties] Properties to set
         * @returns {protobuf.S2CMallGoldBuy} S2CMallGoldBuy instance
         */
        S2CMallGoldBuy.create = function create(properties) {
            return new S2CMallGoldBuy(properties);
        };

        /**
         * Encodes the specified S2CMallGoldBuy message. Does not implicitly {@link protobuf.S2CMallGoldBuy.verify|verify} messages.
         * @function encode
         * @memberof protobuf.S2CMallGoldBuy
         * @static
         * @param {protobuf.IS2CMallGoldBuy} message S2CMallGoldBuy message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CMallGoldBuy.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified S2CMallGoldBuy message, length delimited. Does not implicitly {@link protobuf.S2CMallGoldBuy.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.S2CMallGoldBuy
         * @static
         * @param {protobuf.IS2CMallGoldBuy} message S2CMallGoldBuy message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CMallGoldBuy.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a S2CMallGoldBuy message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.S2CMallGoldBuy
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.S2CMallGoldBuy} S2CMallGoldBuy
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CMallGoldBuy.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.S2CMallGoldBuy();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a S2CMallGoldBuy message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.S2CMallGoldBuy
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.S2CMallGoldBuy} S2CMallGoldBuy
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CMallGoldBuy.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a S2CMallGoldBuy message.
         * @function verify
         * @memberof protobuf.S2CMallGoldBuy
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        S2CMallGoldBuy.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a S2CMallGoldBuy message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.S2CMallGoldBuy
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.S2CMallGoldBuy} S2CMallGoldBuy
         */
        S2CMallGoldBuy.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.S2CMallGoldBuy)
                return object;
            return new $root.protobuf.S2CMallGoldBuy();
        };

        /**
         * Creates a plain object from a S2CMallGoldBuy message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.S2CMallGoldBuy
         * @static
         * @param {protobuf.S2CMallGoldBuy} message S2CMallGoldBuy
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        S2CMallGoldBuy.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this S2CMallGoldBuy to JSON.
         * @function toJSON
         * @memberof protobuf.S2CMallGoldBuy
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        S2CMallGoldBuy.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return S2CMallGoldBuy;
    })();

    protobuf.S2CMallOne = (function() {

        /**
         * Properties of a S2CMallOne.
         * @memberof protobuf
         * @interface IS2CMallOne
         * @property {protobuf.IMallOne|null} [mallOne] 特惠活动信息
         */

        /**
         * Constructs a new S2CMallOne.
         * @memberof protobuf
         * @classdesc 同步特惠活动信息
         * @implements IS2CMallOne
         * @constructor
         * @param {protobuf.IS2CMallOne=} [properties] Properties to set
         */
        function S2CMallOne(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * 特惠活动信息
         * @member {protobuf.IMallOne|null|undefined} mallOne
         * @memberof protobuf.S2CMallOne
         * @instance
         */
        S2CMallOne.prototype.mallOne = null;

        /**
         * Creates a new S2CMallOne instance using the specified properties.
         * @function create
         * @memberof protobuf.S2CMallOne
         * @static
         * @param {protobuf.IS2CMallOne=} [properties] Properties to set
         * @returns {protobuf.S2CMallOne} S2CMallOne instance
         */
        S2CMallOne.create = function create(properties) {
            return new S2CMallOne(properties);
        };

        /**
         * Encodes the specified S2CMallOne message. Does not implicitly {@link protobuf.S2CMallOne.verify|verify} messages.
         * @function encode
         * @memberof protobuf.S2CMallOne
         * @static
         * @param {protobuf.IS2CMallOne} message S2CMallOne message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CMallOne.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.mallOne != null && Object.hasOwnProperty.call(message, "mallOne"))
                $root.protobuf.MallOne.encode(message.mallOne, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified S2CMallOne message, length delimited. Does not implicitly {@link protobuf.S2CMallOne.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.S2CMallOne
         * @static
         * @param {protobuf.IS2CMallOne} message S2CMallOne message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CMallOne.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a S2CMallOne message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.S2CMallOne
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.S2CMallOne} S2CMallOne
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CMallOne.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.S2CMallOne();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.mallOne = $root.protobuf.MallOne.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a S2CMallOne message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.S2CMallOne
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.S2CMallOne} S2CMallOne
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CMallOne.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a S2CMallOne message.
         * @function verify
         * @memberof protobuf.S2CMallOne
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        S2CMallOne.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.mallOne != null && message.hasOwnProperty("mallOne")) {
                var error = $root.protobuf.MallOne.verify(message.mallOne);
                if (error)
                    return "mallOne." + error;
            }
            return null;
        };

        /**
         * Creates a S2CMallOne message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.S2CMallOne
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.S2CMallOne} S2CMallOne
         */
        S2CMallOne.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.S2CMallOne)
                return object;
            var message = new $root.protobuf.S2CMallOne();
            if (object.mallOne != null) {
                if (typeof object.mallOne !== "object")
                    throw TypeError(".protobuf.S2CMallOne.mallOne: object expected");
                message.mallOne = $root.protobuf.MallOne.fromObject(object.mallOne);
            }
            return message;
        };

        /**
         * Creates a plain object from a S2CMallOne message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.S2CMallOne
         * @static
         * @param {protobuf.S2CMallOne} message S2CMallOne
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        S2CMallOne.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.mallOne = null;
            if (message.mallOne != null && message.hasOwnProperty("mallOne"))
                object.mallOne = $root.protobuf.MallOne.toObject(message.mallOne, options);
            return object;
        };

        /**
         * Converts this S2CMallOne to JSON.
         * @function toJSON
         * @memberof protobuf.S2CMallOne
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        S2CMallOne.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return S2CMallOne;
    })();

    protobuf.S2CMallThree = (function() {

        /**
         * Properties of a S2CMallThree.
         * @memberof protobuf
         * @interface IS2CMallThree
         * @property {protobuf.IMallThree|null} [mallThree] 超值好礼信息
         */

        /**
         * Constructs a new S2CMallThree.
         * @memberof protobuf
         * @classdesc 同步超值好礼信息
         * @implements IS2CMallThree
         * @constructor
         * @param {protobuf.IS2CMallThree=} [properties] Properties to set
         */
        function S2CMallThree(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * 超值好礼信息
         * @member {protobuf.IMallThree|null|undefined} mallThree
         * @memberof protobuf.S2CMallThree
         * @instance
         */
        S2CMallThree.prototype.mallThree = null;

        /**
         * Creates a new S2CMallThree instance using the specified properties.
         * @function create
         * @memberof protobuf.S2CMallThree
         * @static
         * @param {protobuf.IS2CMallThree=} [properties] Properties to set
         * @returns {protobuf.S2CMallThree} S2CMallThree instance
         */
        S2CMallThree.create = function create(properties) {
            return new S2CMallThree(properties);
        };

        /**
         * Encodes the specified S2CMallThree message. Does not implicitly {@link protobuf.S2CMallThree.verify|verify} messages.
         * @function encode
         * @memberof protobuf.S2CMallThree
         * @static
         * @param {protobuf.IS2CMallThree} message S2CMallThree message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CMallThree.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.mallThree != null && Object.hasOwnProperty.call(message, "mallThree"))
                $root.protobuf.MallThree.encode(message.mallThree, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified S2CMallThree message, length delimited. Does not implicitly {@link protobuf.S2CMallThree.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.S2CMallThree
         * @static
         * @param {protobuf.IS2CMallThree} message S2CMallThree message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CMallThree.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a S2CMallThree message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.S2CMallThree
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.S2CMallThree} S2CMallThree
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CMallThree.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.S2CMallThree();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.mallThree = $root.protobuf.MallThree.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a S2CMallThree message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.S2CMallThree
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.S2CMallThree} S2CMallThree
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CMallThree.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a S2CMallThree message.
         * @function verify
         * @memberof protobuf.S2CMallThree
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        S2CMallThree.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.mallThree != null && message.hasOwnProperty("mallThree")) {
                var error = $root.protobuf.MallThree.verify(message.mallThree);
                if (error)
                    return "mallThree." + error;
            }
            return null;
        };

        /**
         * Creates a S2CMallThree message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.S2CMallThree
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.S2CMallThree} S2CMallThree
         */
        S2CMallThree.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.S2CMallThree)
                return object;
            var message = new $root.protobuf.S2CMallThree();
            if (object.mallThree != null) {
                if (typeof object.mallThree !== "object")
                    throw TypeError(".protobuf.S2CMallThree.mallThree: object expected");
                message.mallThree = $root.protobuf.MallThree.fromObject(object.mallThree);
            }
            return message;
        };

        /**
         * Creates a plain object from a S2CMallThree message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.S2CMallThree
         * @static
         * @param {protobuf.S2CMallThree} message S2CMallThree
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        S2CMallThree.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.mallThree = null;
            if (message.mallThree != null && message.hasOwnProperty("mallThree"))
                object.mallThree = $root.protobuf.MallThree.toObject(message.mallThree, options);
            return object;
        };

        /**
         * Converts this S2CMallThree to JSON.
         * @function toJSON
         * @memberof protobuf.S2CMallThree
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        S2CMallThree.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return S2CMallThree;
    })();

    protobuf.S2CMallDiamondBuy = (function() {

        /**
         * Properties of a S2CMallDiamondBuy.
         * @memberof protobuf
         * @interface IS2CMallDiamondBuy
         * @property {protobuf.IMallDiamondBuy|null} [mallDiamondBuy] 钻石购买信息
         */

        /**
         * Constructs a new S2CMallDiamondBuy.
         * @memberof protobuf
         * @classdesc 同步钻石购买信息
         * @implements IS2CMallDiamondBuy
         * @constructor
         * @param {protobuf.IS2CMallDiamondBuy=} [properties] Properties to set
         */
        function S2CMallDiamondBuy(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * 钻石购买信息
         * @member {protobuf.IMallDiamondBuy|null|undefined} mallDiamondBuy
         * @memberof protobuf.S2CMallDiamondBuy
         * @instance
         */
        S2CMallDiamondBuy.prototype.mallDiamondBuy = null;

        /**
         * Creates a new S2CMallDiamondBuy instance using the specified properties.
         * @function create
         * @memberof protobuf.S2CMallDiamondBuy
         * @static
         * @param {protobuf.IS2CMallDiamondBuy=} [properties] Properties to set
         * @returns {protobuf.S2CMallDiamondBuy} S2CMallDiamondBuy instance
         */
        S2CMallDiamondBuy.create = function create(properties) {
            return new S2CMallDiamondBuy(properties);
        };

        /**
         * Encodes the specified S2CMallDiamondBuy message. Does not implicitly {@link protobuf.S2CMallDiamondBuy.verify|verify} messages.
         * @function encode
         * @memberof protobuf.S2CMallDiamondBuy
         * @static
         * @param {protobuf.IS2CMallDiamondBuy} message S2CMallDiamondBuy message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CMallDiamondBuy.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.mallDiamondBuy != null && Object.hasOwnProperty.call(message, "mallDiamondBuy"))
                $root.protobuf.MallDiamondBuy.encode(message.mallDiamondBuy, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified S2CMallDiamondBuy message, length delimited. Does not implicitly {@link protobuf.S2CMallDiamondBuy.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.S2CMallDiamondBuy
         * @static
         * @param {protobuf.IS2CMallDiamondBuy} message S2CMallDiamondBuy message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CMallDiamondBuy.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a S2CMallDiamondBuy message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.S2CMallDiamondBuy
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.S2CMallDiamondBuy} S2CMallDiamondBuy
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CMallDiamondBuy.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.S2CMallDiamondBuy();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.mallDiamondBuy = $root.protobuf.MallDiamondBuy.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a S2CMallDiamondBuy message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.S2CMallDiamondBuy
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.S2CMallDiamondBuy} S2CMallDiamondBuy
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CMallDiamondBuy.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a S2CMallDiamondBuy message.
         * @function verify
         * @memberof protobuf.S2CMallDiamondBuy
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        S2CMallDiamondBuy.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.mallDiamondBuy != null && message.hasOwnProperty("mallDiamondBuy")) {
                var error = $root.protobuf.MallDiamondBuy.verify(message.mallDiamondBuy);
                if (error)
                    return "mallDiamondBuy." + error;
            }
            return null;
        };

        /**
         * Creates a S2CMallDiamondBuy message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.S2CMallDiamondBuy
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.S2CMallDiamondBuy} S2CMallDiamondBuy
         */
        S2CMallDiamondBuy.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.S2CMallDiamondBuy)
                return object;
            var message = new $root.protobuf.S2CMallDiamondBuy();
            if (object.mallDiamondBuy != null) {
                if (typeof object.mallDiamondBuy !== "object")
                    throw TypeError(".protobuf.S2CMallDiamondBuy.mallDiamondBuy: object expected");
                message.mallDiamondBuy = $root.protobuf.MallDiamondBuy.fromObject(object.mallDiamondBuy);
            }
            return message;
        };

        /**
         * Creates a plain object from a S2CMallDiamondBuy message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.S2CMallDiamondBuy
         * @static
         * @param {protobuf.S2CMallDiamondBuy} message S2CMallDiamondBuy
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        S2CMallDiamondBuy.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.mallDiamondBuy = null;
            if (message.mallDiamondBuy != null && message.hasOwnProperty("mallDiamondBuy"))
                object.mallDiamondBuy = $root.protobuf.MallDiamondBuy.toObject(message.mallDiamondBuy, options);
            return object;
        };

        /**
         * Converts this S2CMallDiamondBuy to JSON.
         * @function toJSON
         * @memberof protobuf.S2CMallDiamondBuy
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        S2CMallDiamondBuy.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return S2CMallDiamondBuy;
    })();

    protobuf.S2CMallReward = (function() {

        /**
         * Properties of a S2CMallReward.
         * @memberof protobuf
         * @interface IS2CMallReward
         * @property {string|null} [mallReward] 获得的奖励信息
         */

        /**
         * Constructs a new S2CMallReward.
         * @memberof protobuf
         * @classdesc 同步获得的奖励
         * @implements IS2CMallReward
         * @constructor
         * @param {protobuf.IS2CMallReward=} [properties] Properties to set
         */
        function S2CMallReward(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * 获得的奖励信息
         * @member {string} mallReward
         * @memberof protobuf.S2CMallReward
         * @instance
         */
        S2CMallReward.prototype.mallReward = "";

        /**
         * Creates a new S2CMallReward instance using the specified properties.
         * @function create
         * @memberof protobuf.S2CMallReward
         * @static
         * @param {protobuf.IS2CMallReward=} [properties] Properties to set
         * @returns {protobuf.S2CMallReward} S2CMallReward instance
         */
        S2CMallReward.create = function create(properties) {
            return new S2CMallReward(properties);
        };

        /**
         * Encodes the specified S2CMallReward message. Does not implicitly {@link protobuf.S2CMallReward.verify|verify} messages.
         * @function encode
         * @memberof protobuf.S2CMallReward
         * @static
         * @param {protobuf.IS2CMallReward} message S2CMallReward message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CMallReward.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.mallReward != null && Object.hasOwnProperty.call(message, "mallReward"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.mallReward);
            return writer;
        };

        /**
         * Encodes the specified S2CMallReward message, length delimited. Does not implicitly {@link protobuf.S2CMallReward.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.S2CMallReward
         * @static
         * @param {protobuf.IS2CMallReward} message S2CMallReward message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CMallReward.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a S2CMallReward message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.S2CMallReward
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.S2CMallReward} S2CMallReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CMallReward.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.S2CMallReward();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.mallReward = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a S2CMallReward message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.S2CMallReward
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.S2CMallReward} S2CMallReward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CMallReward.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a S2CMallReward message.
         * @function verify
         * @memberof protobuf.S2CMallReward
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        S2CMallReward.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.mallReward != null && message.hasOwnProperty("mallReward"))
                if (!$util.isString(message.mallReward))
                    return "mallReward: string expected";
            return null;
        };

        /**
         * Creates a S2CMallReward message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.S2CMallReward
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.S2CMallReward} S2CMallReward
         */
        S2CMallReward.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.S2CMallReward)
                return object;
            var message = new $root.protobuf.S2CMallReward();
            if (object.mallReward != null)
                message.mallReward = String(object.mallReward);
            return message;
        };

        /**
         * Creates a plain object from a S2CMallReward message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.S2CMallReward
         * @static
         * @param {protobuf.S2CMallReward} message S2CMallReward
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        S2CMallReward.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.mallReward = "";
            if (message.mallReward != null && message.hasOwnProperty("mallReward"))
                object.mallReward = message.mallReward;
            return object;
        };

        /**
         * Converts this S2CMallReward to JSON.
         * @function toJSON
         * @memberof protobuf.S2CMallReward
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        S2CMallReward.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return S2CMallReward;
    })();

    /**
     * 消息号定义
     * @name protobuf.MessageIds
     * @enum {number}
     * @property {number} C2SServerTime=0 请求服务器时间
     * @property {number} S2CServerTime=1 S2CServerTime value
     * @property {number} C2SHeartBeate=3 心跳
     * @property {number} S2CHeartBeate=4 S2CHeartBeate value
     * @property {number} C2SAuth=101 认证
     * @property {number} S2CAuth=102 S2CAuth value
     * @property {number} C2SGetPlayer=201 获取玩家信息
     * @property {number} S2CGetPlayer=202 S2CGetPlayer value
     * @property {number} C2SRandName=203 随机玩家名字
     * @property {number} S2CRandName=204 S2CRandName value
     * @property {number} C2SCreatePlayer=205 创建角色
     * @property {number} S2CCreatePlayer=206 S2CCreatePlayer value
     * @property {number} C2SLogin=207 登录
     * @property {number} S2CLogin=208 S2CLogin value
     * @property {number} C2SLoginSuccess=209 登录成功(部分协议需要延迟同步)
     * @property {number} S2CLoginSuccess=210 S2CLoginSuccess value
     * @property {number} S2CPlayerBaseInfoSync=302 同步玩家基本信息
     * @property {number} S2CPlayerExtInfoSync=304 同步玩家扩展信息
     * @property {number} C2SPlayerRename=305 改名
     * @property {number} S2CPlayerRename=306 S2CPlayerRename value
     * @property {number} C2SPlayerModifyHead=307 更换头像/头像框
     * @property {number} S2CPlayerModifyHead=308 S2CPlayerModifyHead value
     * @property {number} C2SPlayerInfoUpdate=321 玩家信息更新
     * @property {number} S2CPlayerInfoUpdate=322 S2CPlayerInfoUpdate value
     * @property {number} C2SDebug=401 请求指令
     * @property {number} S2CDebug=402 S2CDebug value
     * @property {number} C2SItemBagSync=601 请求背包列表
     * @property {number} S2CItemBagSync=602 S2CItemBagSync value
     * @property {number} C2SMailListSync=1601 邮件列表
     * @property {number} S2CMailListSync=1602 S2CMailListSync value
     * @property {number} C2SMailOp=1603 邮件操作
     * @property {number} S2CMailOp=1604 S2CMailOp value
     * @property {number} C2SNoticeListSync=1701 公告列表
     * @property {number} S2CNoticeListSync=1702 S2CNoticeListSync value
     * @property {number} C2SGiftCodeExchange=2001 礼包码兑换
     * @property {number} S2CGiftCodeExchange=2002 S2CGiftCodeExchange value
     */
    protobuf.MessageIds = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "C2SServerTime"] = 0;
        values[valuesById[1] = "S2CServerTime"] = 1;
        values[valuesById[3] = "C2SHeartBeate"] = 3;
        values[valuesById[4] = "S2CHeartBeate"] = 4;
        values[valuesById[101] = "C2SAuth"] = 101;
        values[valuesById[102] = "S2CAuth"] = 102;
        values[valuesById[201] = "C2SGetPlayer"] = 201;
        values[valuesById[202] = "S2CGetPlayer"] = 202;
        values[valuesById[203] = "C2SRandName"] = 203;
        values[valuesById[204] = "S2CRandName"] = 204;
        values[valuesById[205] = "C2SCreatePlayer"] = 205;
        values[valuesById[206] = "S2CCreatePlayer"] = 206;
        values[valuesById[207] = "C2SLogin"] = 207;
        values[valuesById[208] = "S2CLogin"] = 208;
        values[valuesById[209] = "C2SLoginSuccess"] = 209;
        values[valuesById[210] = "S2CLoginSuccess"] = 210;
        values[valuesById[302] = "S2CPlayerBaseInfoSync"] = 302;
        values[valuesById[304] = "S2CPlayerExtInfoSync"] = 304;
        values[valuesById[305] = "C2SPlayerRename"] = 305;
        values[valuesById[306] = "S2CPlayerRename"] = 306;
        values[valuesById[307] = "C2SPlayerModifyHead"] = 307;
        values[valuesById[308] = "S2CPlayerModifyHead"] = 308;
        values[valuesById[321] = "C2SPlayerInfoUpdate"] = 321;
        values[valuesById[322] = "S2CPlayerInfoUpdate"] = 322;
        values[valuesById[401] = "C2SDebug"] = 401;
        values[valuesById[402] = "S2CDebug"] = 402;
        values[valuesById[601] = "C2SItemBagSync"] = 601;
        values[valuesById[602] = "S2CItemBagSync"] = 602;
        values[valuesById[1601] = "C2SMailListSync"] = 1601;
        values[valuesById[1602] = "S2CMailListSync"] = 1602;
        values[valuesById[1603] = "C2SMailOp"] = 1603;
        values[valuesById[1604] = "S2CMailOp"] = 1604;
        values[valuesById[1701] = "C2SNoticeListSync"] = 1701;
        values[valuesById[1702] = "S2CNoticeListSync"] = 1702;
        values[valuesById[2001] = "C2SGiftCodeExchange"] = 2001;
        values[valuesById[2002] = "S2CGiftCodeExchange"] = 2002;
        return values;
    })();

    protobuf.Notice = (function() {

        /**
         * Properties of a Notice.
         * @memberof protobuf
         * @interface INotice
         * @property {string|null} [id] 公告流水ID
         * @property {string|null} [title] 公告标题
         * @property {string|null} [url] 公告地址
         * @property {string|null} [sendTime] 发送时间戳
         */

        /**
         * Constructs a new Notice.
         * @memberof protobuf
         * @classdesc 公告信息
         * @implements INotice
         * @constructor
         * @param {protobuf.INotice=} [properties] Properties to set
         */
        function Notice(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * 公告流水ID
         * @member {string} id
         * @memberof protobuf.Notice
         * @instance
         */
        Notice.prototype.id = "";

        /**
         * 公告标题
         * @member {string} title
         * @memberof protobuf.Notice
         * @instance
         */
        Notice.prototype.title = "";

        /**
         * 公告地址
         * @member {string} url
         * @memberof protobuf.Notice
         * @instance
         */
        Notice.prototype.url = "";

        /**
         * 发送时间戳
         * @member {string} sendTime
         * @memberof protobuf.Notice
         * @instance
         */
        Notice.prototype.sendTime = "";

        /**
         * Creates a new Notice instance using the specified properties.
         * @function create
         * @memberof protobuf.Notice
         * @static
         * @param {protobuf.INotice=} [properties] Properties to set
         * @returns {protobuf.Notice} Notice instance
         */
        Notice.create = function create(properties) {
            return new Notice(properties);
        };

        /**
         * Encodes the specified Notice message. Does not implicitly {@link protobuf.Notice.verify|verify} messages.
         * @function encode
         * @memberof protobuf.Notice
         * @static
         * @param {protobuf.INotice} message Notice message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Notice.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.title != null && Object.hasOwnProperty.call(message, "title"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.title);
            if (message.url != null && Object.hasOwnProperty.call(message, "url"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.url);
            if (message.sendTime != null && Object.hasOwnProperty.call(message, "sendTime"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.sendTime);
            return writer;
        };

        /**
         * Encodes the specified Notice message, length delimited. Does not implicitly {@link protobuf.Notice.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.Notice
         * @static
         * @param {protobuf.INotice} message Notice message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Notice.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Notice message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.Notice
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.Notice} Notice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Notice.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.Notice();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.title = reader.string();
                    break;
                case 3:
                    message.url = reader.string();
                    break;
                case 4:
                    message.sendTime = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Notice message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.Notice
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.Notice} Notice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Notice.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Notice message.
         * @function verify
         * @memberof protobuf.Notice
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Notice.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.title != null && message.hasOwnProperty("title"))
                if (!$util.isString(message.title))
                    return "title: string expected";
            if (message.url != null && message.hasOwnProperty("url"))
                if (!$util.isString(message.url))
                    return "url: string expected";
            if (message.sendTime != null && message.hasOwnProperty("sendTime"))
                if (!$util.isString(message.sendTime))
                    return "sendTime: string expected";
            return null;
        };

        /**
         * Creates a Notice message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.Notice
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.Notice} Notice
         */
        Notice.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.Notice)
                return object;
            var message = new $root.protobuf.Notice();
            if (object.id != null)
                message.id = String(object.id);
            if (object.title != null)
                message.title = String(object.title);
            if (object.url != null)
                message.url = String(object.url);
            if (object.sendTime != null)
                message.sendTime = String(object.sendTime);
            return message;
        };

        /**
         * Creates a plain object from a Notice message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.Notice
         * @static
         * @param {protobuf.Notice} message Notice
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Notice.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.id = "";
                object.title = "";
                object.url = "";
                object.sendTime = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.title != null && message.hasOwnProperty("title"))
                object.title = message.title;
            if (message.url != null && message.hasOwnProperty("url"))
                object.url = message.url;
            if (message.sendTime != null && message.hasOwnProperty("sendTime"))
                object.sendTime = message.sendTime;
            return object;
        };

        /**
         * Converts this Notice to JSON.
         * @function toJSON
         * @memberof protobuf.Notice
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Notice.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Notice;
    })();

    protobuf.C2SNoticeListSync = (function() {

        /**
         * Properties of a C2SNoticeListSync.
         * @memberof protobuf
         * @interface IC2SNoticeListSync
         */

        /**
         * Constructs a new C2SNoticeListSync.
         * @memberof protobuf
         * @classdesc 公告列表
         * @implements IC2SNoticeListSync
         * @constructor
         * @param {protobuf.IC2SNoticeListSync=} [properties] Properties to set
         */
        function C2SNoticeListSync(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new C2SNoticeListSync instance using the specified properties.
         * @function create
         * @memberof protobuf.C2SNoticeListSync
         * @static
         * @param {protobuf.IC2SNoticeListSync=} [properties] Properties to set
         * @returns {protobuf.C2SNoticeListSync} C2SNoticeListSync instance
         */
        C2SNoticeListSync.create = function create(properties) {
            return new C2SNoticeListSync(properties);
        };

        /**
         * Encodes the specified C2SNoticeListSync message. Does not implicitly {@link protobuf.C2SNoticeListSync.verify|verify} messages.
         * @function encode
         * @memberof protobuf.C2SNoticeListSync
         * @static
         * @param {protobuf.IC2SNoticeListSync} message C2SNoticeListSync message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SNoticeListSync.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified C2SNoticeListSync message, length delimited. Does not implicitly {@link protobuf.C2SNoticeListSync.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.C2SNoticeListSync
         * @static
         * @param {protobuf.IC2SNoticeListSync} message C2SNoticeListSync message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SNoticeListSync.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2SNoticeListSync message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.C2SNoticeListSync
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.C2SNoticeListSync} C2SNoticeListSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SNoticeListSync.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.C2SNoticeListSync();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2SNoticeListSync message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.C2SNoticeListSync
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.C2SNoticeListSync} C2SNoticeListSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SNoticeListSync.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2SNoticeListSync message.
         * @function verify
         * @memberof protobuf.C2SNoticeListSync
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2SNoticeListSync.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a C2SNoticeListSync message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.C2SNoticeListSync
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.C2SNoticeListSync} C2SNoticeListSync
         */
        C2SNoticeListSync.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.C2SNoticeListSync)
                return object;
            return new $root.protobuf.C2SNoticeListSync();
        };

        /**
         * Creates a plain object from a C2SNoticeListSync message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.C2SNoticeListSync
         * @static
         * @param {protobuf.C2SNoticeListSync} message C2SNoticeListSync
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        C2SNoticeListSync.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this C2SNoticeListSync to JSON.
         * @function toJSON
         * @memberof protobuf.C2SNoticeListSync
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        C2SNoticeListSync.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return C2SNoticeListSync;
    })();

    protobuf.S2CNoticeListSync = (function() {

        /**
         * Properties of a S2CNoticeListSync.
         * @memberof protobuf
         * @interface IS2CNoticeListSync
         * @property {number|null} [syncType] 同步类型 0-全部  1-增加 2-修改 3-删除
         * @property {Array.<protobuf.INotice>|null} [notices] 公告列表
         */

        /**
         * Constructs a new S2CNoticeListSync.
         * @memberof protobuf
         * @classdesc 公告列表
         * @implements IS2CNoticeListSync
         * @constructor
         * @param {protobuf.IS2CNoticeListSync=} [properties] Properties to set
         */
        function S2CNoticeListSync(properties) {
            this.notices = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * 同步类型 0-全部  1-增加 2-修改 3-删除
         * @member {number} syncType
         * @memberof protobuf.S2CNoticeListSync
         * @instance
         */
        S2CNoticeListSync.prototype.syncType = 0;

        /**
         * 公告列表
         * @member {Array.<protobuf.INotice>} notices
         * @memberof protobuf.S2CNoticeListSync
         * @instance
         */
        S2CNoticeListSync.prototype.notices = $util.emptyArray;

        /**
         * Creates a new S2CNoticeListSync instance using the specified properties.
         * @function create
         * @memberof protobuf.S2CNoticeListSync
         * @static
         * @param {protobuf.IS2CNoticeListSync=} [properties] Properties to set
         * @returns {protobuf.S2CNoticeListSync} S2CNoticeListSync instance
         */
        S2CNoticeListSync.create = function create(properties) {
            return new S2CNoticeListSync(properties);
        };

        /**
         * Encodes the specified S2CNoticeListSync message. Does not implicitly {@link protobuf.S2CNoticeListSync.verify|verify} messages.
         * @function encode
         * @memberof protobuf.S2CNoticeListSync
         * @static
         * @param {protobuf.IS2CNoticeListSync} message S2CNoticeListSync message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CNoticeListSync.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.syncType != null && Object.hasOwnProperty.call(message, "syncType"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.syncType);
            if (message.notices != null && message.notices.length)
                for (var i = 0; i < message.notices.length; ++i)
                    $root.protobuf.Notice.encode(message.notices[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified S2CNoticeListSync message, length delimited. Does not implicitly {@link protobuf.S2CNoticeListSync.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.S2CNoticeListSync
         * @static
         * @param {protobuf.IS2CNoticeListSync} message S2CNoticeListSync message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CNoticeListSync.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a S2CNoticeListSync message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.S2CNoticeListSync
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.S2CNoticeListSync} S2CNoticeListSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CNoticeListSync.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.S2CNoticeListSync();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.syncType = reader.int32();
                    break;
                case 2:
                    if (!(message.notices && message.notices.length))
                        message.notices = [];
                    message.notices.push($root.protobuf.Notice.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a S2CNoticeListSync message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.S2CNoticeListSync
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.S2CNoticeListSync} S2CNoticeListSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CNoticeListSync.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a S2CNoticeListSync message.
         * @function verify
         * @memberof protobuf.S2CNoticeListSync
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        S2CNoticeListSync.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.syncType != null && message.hasOwnProperty("syncType"))
                if (!$util.isInteger(message.syncType))
                    return "syncType: integer expected";
            if (message.notices != null && message.hasOwnProperty("notices")) {
                if (!Array.isArray(message.notices))
                    return "notices: array expected";
                for (var i = 0; i < message.notices.length; ++i) {
                    var error = $root.protobuf.Notice.verify(message.notices[i]);
                    if (error)
                        return "notices." + error;
                }
            }
            return null;
        };

        /**
         * Creates a S2CNoticeListSync message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.S2CNoticeListSync
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.S2CNoticeListSync} S2CNoticeListSync
         */
        S2CNoticeListSync.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.S2CNoticeListSync)
                return object;
            var message = new $root.protobuf.S2CNoticeListSync();
            if (object.syncType != null)
                message.syncType = object.syncType | 0;
            if (object.notices) {
                if (!Array.isArray(object.notices))
                    throw TypeError(".protobuf.S2CNoticeListSync.notices: array expected");
                message.notices = [];
                for (var i = 0; i < object.notices.length; ++i) {
                    if (typeof object.notices[i] !== "object")
                        throw TypeError(".protobuf.S2CNoticeListSync.notices: object expected");
                    message.notices[i] = $root.protobuf.Notice.fromObject(object.notices[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a S2CNoticeListSync message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.S2CNoticeListSync
         * @static
         * @param {protobuf.S2CNoticeListSync} message S2CNoticeListSync
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        S2CNoticeListSync.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.notices = [];
            if (options.defaults)
                object.syncType = 0;
            if (message.syncType != null && message.hasOwnProperty("syncType"))
                object.syncType = message.syncType;
            if (message.notices && message.notices.length) {
                object.notices = [];
                for (var j = 0; j < message.notices.length; ++j)
                    object.notices[j] = $root.protobuf.Notice.toObject(message.notices[j], options);
            }
            return object;
        };

        /**
         * Converts this S2CNoticeListSync to JSON.
         * @function toJSON
         * @memberof protobuf.S2CNoticeListSync
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        S2CNoticeListSync.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return S2CNoticeListSync;
    })();

    protobuf.BaseInfo = (function() {

        /**
         * Properties of a BaseInfo.
         * @memberof protobuf
         * @interface IBaseInfo
         * @property {string|null} [playerId] 玩家id
         * @property {string|null} [identityId] 玩家账号
         * @property {string|null} [name] 玩家名
         * @property {number|null} [gender] 性别：1男，2女
         * @property {string|null} [headImageId] 头像
         * @property {string|null} [headImageRim] 头像框
         * @property {string|null} [roleBirth] 出身
         * @property {number|null} [diamond] 钻石
         * @property {number|null} [gold] 金币
         * @property {number|Long|null} [createTime] 创号时间戳
         * @property {string|null} [platFormHead] 平台头像
         */

        /**
         * Constructs a new BaseInfo.
         * @memberof protobuf
         * @classdesc 玩家Base信息(不经常变化的数据)
         * @implements IBaseInfo
         * @constructor
         * @param {protobuf.IBaseInfo=} [properties] Properties to set
         */
        function BaseInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * 玩家id
         * @member {string} playerId
         * @memberof protobuf.BaseInfo
         * @instance
         */
        BaseInfo.prototype.playerId = "";

        /**
         * 玩家账号
         * @member {string} identityId
         * @memberof protobuf.BaseInfo
         * @instance
         */
        BaseInfo.prototype.identityId = "";

        /**
         * 玩家名
         * @member {string} name
         * @memberof protobuf.BaseInfo
         * @instance
         */
        BaseInfo.prototype.name = "";

        /**
         * 性别：1男，2女
         * @member {number} gender
         * @memberof protobuf.BaseInfo
         * @instance
         */
        BaseInfo.prototype.gender = 0;

        /**
         * 头像
         * @member {string} headImageId
         * @memberof protobuf.BaseInfo
         * @instance
         */
        BaseInfo.prototype.headImageId = "";

        /**
         * 头像框
         * @member {string} headImageRim
         * @memberof protobuf.BaseInfo
         * @instance
         */
        BaseInfo.prototype.headImageRim = "";

        /**
         * 出身
         * @member {string} roleBirth
         * @memberof protobuf.BaseInfo
         * @instance
         */
        BaseInfo.prototype.roleBirth = "";

        /**
         * 钻石
         * @member {number} diamond
         * @memberof protobuf.BaseInfo
         * @instance
         */
        BaseInfo.prototype.diamond = 0;

        /**
         * 金币
         * @member {number} gold
         * @memberof protobuf.BaseInfo
         * @instance
         */
        BaseInfo.prototype.gold = 0;

        /**
         * 创号时间戳
         * @member {number|Long} createTime
         * @memberof protobuf.BaseInfo
         * @instance
         */
        BaseInfo.prototype.createTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * 平台头像
         * @member {string} platFormHead
         * @memberof protobuf.BaseInfo
         * @instance
         */
        BaseInfo.prototype.platFormHead = "";

        /**
         * Creates a new BaseInfo instance using the specified properties.
         * @function create
         * @memberof protobuf.BaseInfo
         * @static
         * @param {protobuf.IBaseInfo=} [properties] Properties to set
         * @returns {protobuf.BaseInfo} BaseInfo instance
         */
        BaseInfo.create = function create(properties) {
            return new BaseInfo(properties);
        };

        /**
         * Encodes the specified BaseInfo message. Does not implicitly {@link protobuf.BaseInfo.verify|verify} messages.
         * @function encode
         * @memberof protobuf.BaseInfo
         * @static
         * @param {protobuf.IBaseInfo} message BaseInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BaseInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.playerId);
            if (message.identityId != null && Object.hasOwnProperty.call(message, "identityId"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.identityId);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
            if (message.gender != null && Object.hasOwnProperty.call(message, "gender"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.gender);
            if (message.headImageId != null && Object.hasOwnProperty.call(message, "headImageId"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.headImageId);
            if (message.headImageRim != null && Object.hasOwnProperty.call(message, "headImageRim"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.headImageRim);
            if (message.roleBirth != null && Object.hasOwnProperty.call(message, "roleBirth"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.roleBirth);
            if (message.diamond != null && Object.hasOwnProperty.call(message, "diamond"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.diamond);
            if (message.gold != null && Object.hasOwnProperty.call(message, "gold"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.gold);
            if (message.createTime != null && Object.hasOwnProperty.call(message, "createTime"))
                writer.uint32(/* id 10, wireType 0 =*/80).int64(message.createTime);
            if (message.platFormHead != null && Object.hasOwnProperty.call(message, "platFormHead"))
                writer.uint32(/* id 11, wireType 2 =*/90).string(message.platFormHead);
            return writer;
        };

        /**
         * Encodes the specified BaseInfo message, length delimited. Does not implicitly {@link protobuf.BaseInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.BaseInfo
         * @static
         * @param {protobuf.IBaseInfo} message BaseInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BaseInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BaseInfo message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.BaseInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.BaseInfo} BaseInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BaseInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.BaseInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.playerId = reader.string();
                    break;
                case 2:
                    message.identityId = reader.string();
                    break;
                case 3:
                    message.name = reader.string();
                    break;
                case 4:
                    message.gender = reader.int32();
                    break;
                case 5:
                    message.headImageId = reader.string();
                    break;
                case 6:
                    message.headImageRim = reader.string();
                    break;
                case 7:
                    message.roleBirth = reader.string();
                    break;
                case 8:
                    message.diamond = reader.int32();
                    break;
                case 9:
                    message.gold = reader.int32();
                    break;
                case 10:
                    message.createTime = reader.int64();
                    break;
                case 11:
                    message.platFormHead = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BaseInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.BaseInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.BaseInfo} BaseInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BaseInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BaseInfo message.
         * @function verify
         * @memberof protobuf.BaseInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BaseInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                if (!$util.isString(message.playerId))
                    return "playerId: string expected";
            if (message.identityId != null && message.hasOwnProperty("identityId"))
                if (!$util.isString(message.identityId))
                    return "identityId: string expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.gender != null && message.hasOwnProperty("gender"))
                if (!$util.isInteger(message.gender))
                    return "gender: integer expected";
            if (message.headImageId != null && message.hasOwnProperty("headImageId"))
                if (!$util.isString(message.headImageId))
                    return "headImageId: string expected";
            if (message.headImageRim != null && message.hasOwnProperty("headImageRim"))
                if (!$util.isString(message.headImageRim))
                    return "headImageRim: string expected";
            if (message.roleBirth != null && message.hasOwnProperty("roleBirth"))
                if (!$util.isString(message.roleBirth))
                    return "roleBirth: string expected";
            if (message.diamond != null && message.hasOwnProperty("diamond"))
                if (!$util.isInteger(message.diamond))
                    return "diamond: integer expected";
            if (message.gold != null && message.hasOwnProperty("gold"))
                if (!$util.isInteger(message.gold))
                    return "gold: integer expected";
            if (message.createTime != null && message.hasOwnProperty("createTime"))
                if (!$util.isInteger(message.createTime) && !(message.createTime && $util.isInteger(message.createTime.low) && $util.isInteger(message.createTime.high)))
                    return "createTime: integer|Long expected";
            if (message.platFormHead != null && message.hasOwnProperty("platFormHead"))
                if (!$util.isString(message.platFormHead))
                    return "platFormHead: string expected";
            return null;
        };

        /**
         * Creates a BaseInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.BaseInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.BaseInfo} BaseInfo
         */
        BaseInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.BaseInfo)
                return object;
            var message = new $root.protobuf.BaseInfo();
            if (object.playerId != null)
                message.playerId = String(object.playerId);
            if (object.identityId != null)
                message.identityId = String(object.identityId);
            if (object.name != null)
                message.name = String(object.name);
            if (object.gender != null)
                message.gender = object.gender | 0;
            if (object.headImageId != null)
                message.headImageId = String(object.headImageId);
            if (object.headImageRim != null)
                message.headImageRim = String(object.headImageRim);
            if (object.roleBirth != null)
                message.roleBirth = String(object.roleBirth);
            if (object.diamond != null)
                message.diamond = object.diamond | 0;
            if (object.gold != null)
                message.gold = object.gold | 0;
            if (object.createTime != null)
                if ($util.Long)
                    (message.createTime = $util.Long.fromValue(object.createTime)).unsigned = false;
                else if (typeof object.createTime === "string")
                    message.createTime = parseInt(object.createTime, 10);
                else if (typeof object.createTime === "number")
                    message.createTime = object.createTime;
                else if (typeof object.createTime === "object")
                    message.createTime = new $util.LongBits(object.createTime.low >>> 0, object.createTime.high >>> 0).toNumber();
            if (object.platFormHead != null)
                message.platFormHead = String(object.platFormHead);
            return message;
        };

        /**
         * Creates a plain object from a BaseInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.BaseInfo
         * @static
         * @param {protobuf.BaseInfo} message BaseInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BaseInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.playerId = "";
                object.identityId = "";
                object.name = "";
                object.gender = 0;
                object.headImageId = "";
                object.headImageRim = "";
                object.roleBirth = "";
                object.diamond = 0;
                object.gold = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.createTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.createTime = options.longs === String ? "0" : 0;
                object.platFormHead = "";
            }
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                object.playerId = message.playerId;
            if (message.identityId != null && message.hasOwnProperty("identityId"))
                object.identityId = message.identityId;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.gender != null && message.hasOwnProperty("gender"))
                object.gender = message.gender;
            if (message.headImageId != null && message.hasOwnProperty("headImageId"))
                object.headImageId = message.headImageId;
            if (message.headImageRim != null && message.hasOwnProperty("headImageRim"))
                object.headImageRim = message.headImageRim;
            if (message.roleBirth != null && message.hasOwnProperty("roleBirth"))
                object.roleBirth = message.roleBirth;
            if (message.diamond != null && message.hasOwnProperty("diamond"))
                object.diamond = message.diamond;
            if (message.gold != null && message.hasOwnProperty("gold"))
                object.gold = message.gold;
            if (message.createTime != null && message.hasOwnProperty("createTime"))
                if (typeof message.createTime === "number")
                    object.createTime = options.longs === String ? String(message.createTime) : message.createTime;
                else
                    object.createTime = options.longs === String ? $util.Long.prototype.toString.call(message.createTime) : options.longs === Number ? new $util.LongBits(message.createTime.low >>> 0, message.createTime.high >>> 0).toNumber() : message.createTime;
            if (message.platFormHead != null && message.hasOwnProperty("platFormHead"))
                object.platFormHead = message.platFormHead;
            return object;
        };

        /**
         * Converts this BaseInfo to JSON.
         * @function toJSON
         * @memberof protobuf.BaseInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BaseInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BaseInfo;
    })();

    protobuf.ExtInfo = (function() {

        /**
         * Properties of an ExtInfo.
         * @memberof protobuf
         * @interface IExtInfo
         */

        /**
         * Constructs a new ExtInfo.
         * @memberof protobuf
         * @classdesc 玩家扩展信息(经常变化的数据)
         * @implements IExtInfo
         * @constructor
         * @param {protobuf.IExtInfo=} [properties] Properties to set
         */
        function ExtInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new ExtInfo instance using the specified properties.
         * @function create
         * @memberof protobuf.ExtInfo
         * @static
         * @param {protobuf.IExtInfo=} [properties] Properties to set
         * @returns {protobuf.ExtInfo} ExtInfo instance
         */
        ExtInfo.create = function create(properties) {
            return new ExtInfo(properties);
        };

        /**
         * Encodes the specified ExtInfo message. Does not implicitly {@link protobuf.ExtInfo.verify|verify} messages.
         * @function encode
         * @memberof protobuf.ExtInfo
         * @static
         * @param {protobuf.IExtInfo} message ExtInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ExtInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified ExtInfo message, length delimited. Does not implicitly {@link protobuf.ExtInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.ExtInfo
         * @static
         * @param {protobuf.IExtInfo} message ExtInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ExtInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ExtInfo message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.ExtInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.ExtInfo} ExtInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ExtInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.ExtInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ExtInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.ExtInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.ExtInfo} ExtInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ExtInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ExtInfo message.
         * @function verify
         * @memberof protobuf.ExtInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ExtInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates an ExtInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.ExtInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.ExtInfo} ExtInfo
         */
        ExtInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.ExtInfo)
                return object;
            return new $root.protobuf.ExtInfo();
        };

        /**
         * Creates a plain object from an ExtInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.ExtInfo
         * @static
         * @param {protobuf.ExtInfo} message ExtInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ExtInfo.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this ExtInfo to JSON.
         * @function toJSON
         * @memberof protobuf.ExtInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ExtInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ExtInfo;
    })();

    protobuf.S2CPlayerBaseInfoSync = (function() {

        /**
         * Properties of a S2CPlayerBaseInfoSync.
         * @memberof protobuf
         * @interface IS2CPlayerBaseInfoSync
         * @property {protobuf.IBaseInfo|null} [baseInfo] 玩家信息 *
         */

        /**
         * Constructs a new S2CPlayerBaseInfoSync.
         * @memberof protobuf
         * @classdesc 玩家信息同步到 (不经常变化的数据)*
         * @implements IS2CPlayerBaseInfoSync
         * @constructor
         * @param {protobuf.IS2CPlayerBaseInfoSync=} [properties] Properties to set
         */
        function S2CPlayerBaseInfoSync(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * 玩家信息 *
         * @member {protobuf.IBaseInfo|null|undefined} baseInfo
         * @memberof protobuf.S2CPlayerBaseInfoSync
         * @instance
         */
        S2CPlayerBaseInfoSync.prototype.baseInfo = null;

        /**
         * Creates a new S2CPlayerBaseInfoSync instance using the specified properties.
         * @function create
         * @memberof protobuf.S2CPlayerBaseInfoSync
         * @static
         * @param {protobuf.IS2CPlayerBaseInfoSync=} [properties] Properties to set
         * @returns {protobuf.S2CPlayerBaseInfoSync} S2CPlayerBaseInfoSync instance
         */
        S2CPlayerBaseInfoSync.create = function create(properties) {
            return new S2CPlayerBaseInfoSync(properties);
        };

        /**
         * Encodes the specified S2CPlayerBaseInfoSync message. Does not implicitly {@link protobuf.S2CPlayerBaseInfoSync.verify|verify} messages.
         * @function encode
         * @memberof protobuf.S2CPlayerBaseInfoSync
         * @static
         * @param {protobuf.IS2CPlayerBaseInfoSync} message S2CPlayerBaseInfoSync message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CPlayerBaseInfoSync.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.baseInfo != null && Object.hasOwnProperty.call(message, "baseInfo"))
                $root.protobuf.BaseInfo.encode(message.baseInfo, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified S2CPlayerBaseInfoSync message, length delimited. Does not implicitly {@link protobuf.S2CPlayerBaseInfoSync.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.S2CPlayerBaseInfoSync
         * @static
         * @param {protobuf.IS2CPlayerBaseInfoSync} message S2CPlayerBaseInfoSync message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CPlayerBaseInfoSync.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a S2CPlayerBaseInfoSync message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.S2CPlayerBaseInfoSync
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.S2CPlayerBaseInfoSync} S2CPlayerBaseInfoSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CPlayerBaseInfoSync.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.S2CPlayerBaseInfoSync();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.baseInfo = $root.protobuf.BaseInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a S2CPlayerBaseInfoSync message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.S2CPlayerBaseInfoSync
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.S2CPlayerBaseInfoSync} S2CPlayerBaseInfoSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CPlayerBaseInfoSync.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a S2CPlayerBaseInfoSync message.
         * @function verify
         * @memberof protobuf.S2CPlayerBaseInfoSync
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        S2CPlayerBaseInfoSync.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.baseInfo != null && message.hasOwnProperty("baseInfo")) {
                var error = $root.protobuf.BaseInfo.verify(message.baseInfo);
                if (error)
                    return "baseInfo." + error;
            }
            return null;
        };

        /**
         * Creates a S2CPlayerBaseInfoSync message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.S2CPlayerBaseInfoSync
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.S2CPlayerBaseInfoSync} S2CPlayerBaseInfoSync
         */
        S2CPlayerBaseInfoSync.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.S2CPlayerBaseInfoSync)
                return object;
            var message = new $root.protobuf.S2CPlayerBaseInfoSync();
            if (object.baseInfo != null) {
                if (typeof object.baseInfo !== "object")
                    throw TypeError(".protobuf.S2CPlayerBaseInfoSync.baseInfo: object expected");
                message.baseInfo = $root.protobuf.BaseInfo.fromObject(object.baseInfo);
            }
            return message;
        };

        /**
         * Creates a plain object from a S2CPlayerBaseInfoSync message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.S2CPlayerBaseInfoSync
         * @static
         * @param {protobuf.S2CPlayerBaseInfoSync} message S2CPlayerBaseInfoSync
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        S2CPlayerBaseInfoSync.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.baseInfo = null;
            if (message.baseInfo != null && message.hasOwnProperty("baseInfo"))
                object.baseInfo = $root.protobuf.BaseInfo.toObject(message.baseInfo, options);
            return object;
        };

        /**
         * Converts this S2CPlayerBaseInfoSync to JSON.
         * @function toJSON
         * @memberof protobuf.S2CPlayerBaseInfoSync
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        S2CPlayerBaseInfoSync.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return S2CPlayerBaseInfoSync;
    })();

    protobuf.S2CPlayerExtInfoSync = (function() {

        /**
         * Properties of a S2CPlayerExtInfoSync.
         * @memberof protobuf
         * @interface IS2CPlayerExtInfoSync
         * @property {protobuf.IExtInfo|null} [info] 扩展信息 *
         */

        /**
         * Constructs a new S2CPlayerExtInfoSync.
         * @memberof protobuf
         * @classdesc 玩家扩展信息同步(经常变化的数据)
         * @implements IS2CPlayerExtInfoSync
         * @constructor
         * @param {protobuf.IS2CPlayerExtInfoSync=} [properties] Properties to set
         */
        function S2CPlayerExtInfoSync(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * 扩展信息 *
         * @member {protobuf.IExtInfo|null|undefined} info
         * @memberof protobuf.S2CPlayerExtInfoSync
         * @instance
         */
        S2CPlayerExtInfoSync.prototype.info = null;

        /**
         * Creates a new S2CPlayerExtInfoSync instance using the specified properties.
         * @function create
         * @memberof protobuf.S2CPlayerExtInfoSync
         * @static
         * @param {protobuf.IS2CPlayerExtInfoSync=} [properties] Properties to set
         * @returns {protobuf.S2CPlayerExtInfoSync} S2CPlayerExtInfoSync instance
         */
        S2CPlayerExtInfoSync.create = function create(properties) {
            return new S2CPlayerExtInfoSync(properties);
        };

        /**
         * Encodes the specified S2CPlayerExtInfoSync message. Does not implicitly {@link protobuf.S2CPlayerExtInfoSync.verify|verify} messages.
         * @function encode
         * @memberof protobuf.S2CPlayerExtInfoSync
         * @static
         * @param {protobuf.IS2CPlayerExtInfoSync} message S2CPlayerExtInfoSync message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CPlayerExtInfoSync.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.info != null && Object.hasOwnProperty.call(message, "info"))
                $root.protobuf.ExtInfo.encode(message.info, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified S2CPlayerExtInfoSync message, length delimited. Does not implicitly {@link protobuf.S2CPlayerExtInfoSync.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.S2CPlayerExtInfoSync
         * @static
         * @param {protobuf.IS2CPlayerExtInfoSync} message S2CPlayerExtInfoSync message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CPlayerExtInfoSync.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a S2CPlayerExtInfoSync message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.S2CPlayerExtInfoSync
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.S2CPlayerExtInfoSync} S2CPlayerExtInfoSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CPlayerExtInfoSync.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.S2CPlayerExtInfoSync();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.info = $root.protobuf.ExtInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a S2CPlayerExtInfoSync message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.S2CPlayerExtInfoSync
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.S2CPlayerExtInfoSync} S2CPlayerExtInfoSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CPlayerExtInfoSync.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a S2CPlayerExtInfoSync message.
         * @function verify
         * @memberof protobuf.S2CPlayerExtInfoSync
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        S2CPlayerExtInfoSync.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.info != null && message.hasOwnProperty("info")) {
                var error = $root.protobuf.ExtInfo.verify(message.info);
                if (error)
                    return "info." + error;
            }
            return null;
        };

        /**
         * Creates a S2CPlayerExtInfoSync message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.S2CPlayerExtInfoSync
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.S2CPlayerExtInfoSync} S2CPlayerExtInfoSync
         */
        S2CPlayerExtInfoSync.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.S2CPlayerExtInfoSync)
                return object;
            var message = new $root.protobuf.S2CPlayerExtInfoSync();
            if (object.info != null) {
                if (typeof object.info !== "object")
                    throw TypeError(".protobuf.S2CPlayerExtInfoSync.info: object expected");
                message.info = $root.protobuf.ExtInfo.fromObject(object.info);
            }
            return message;
        };

        /**
         * Creates a plain object from a S2CPlayerExtInfoSync message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.S2CPlayerExtInfoSync
         * @static
         * @param {protobuf.S2CPlayerExtInfoSync} message S2CPlayerExtInfoSync
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        S2CPlayerExtInfoSync.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.info = null;
            if (message.info != null && message.hasOwnProperty("info"))
                object.info = $root.protobuf.ExtInfo.toObject(message.info, options);
            return object;
        };

        /**
         * Converts this S2CPlayerExtInfoSync to JSON.
         * @function toJSON
         * @memberof protobuf.S2CPlayerExtInfoSync
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        S2CPlayerExtInfoSync.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return S2CPlayerExtInfoSync;
    })();

    protobuf.C2SPlayerRename = (function() {

        /**
         * Properties of a C2SPlayerRename.
         * @memberof protobuf
         * @interface IC2SPlayerRename
         * @property {string|null} [newName] 新名字*
         */

        /**
         * Constructs a new C2SPlayerRename.
         * @memberof protobuf
         * @classdesc 改名
         * @implements IC2SPlayerRename
         * @constructor
         * @param {protobuf.IC2SPlayerRename=} [properties] Properties to set
         */
        function C2SPlayerRename(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * 新名字*
         * @member {string} newName
         * @memberof protobuf.C2SPlayerRename
         * @instance
         */
        C2SPlayerRename.prototype.newName = "";

        /**
         * Creates a new C2SPlayerRename instance using the specified properties.
         * @function create
         * @memberof protobuf.C2SPlayerRename
         * @static
         * @param {protobuf.IC2SPlayerRename=} [properties] Properties to set
         * @returns {protobuf.C2SPlayerRename} C2SPlayerRename instance
         */
        C2SPlayerRename.create = function create(properties) {
            return new C2SPlayerRename(properties);
        };

        /**
         * Encodes the specified C2SPlayerRename message. Does not implicitly {@link protobuf.C2SPlayerRename.verify|verify} messages.
         * @function encode
         * @memberof protobuf.C2SPlayerRename
         * @static
         * @param {protobuf.IC2SPlayerRename} message C2SPlayerRename message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SPlayerRename.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.newName != null && Object.hasOwnProperty.call(message, "newName"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.newName);
            return writer;
        };

        /**
         * Encodes the specified C2SPlayerRename message, length delimited. Does not implicitly {@link protobuf.C2SPlayerRename.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.C2SPlayerRename
         * @static
         * @param {protobuf.IC2SPlayerRename} message C2SPlayerRename message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SPlayerRename.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2SPlayerRename message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.C2SPlayerRename
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.C2SPlayerRename} C2SPlayerRename
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SPlayerRename.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.C2SPlayerRename();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.newName = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2SPlayerRename message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.C2SPlayerRename
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.C2SPlayerRename} C2SPlayerRename
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SPlayerRename.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2SPlayerRename message.
         * @function verify
         * @memberof protobuf.C2SPlayerRename
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2SPlayerRename.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.newName != null && message.hasOwnProperty("newName"))
                if (!$util.isString(message.newName))
                    return "newName: string expected";
            return null;
        };

        /**
         * Creates a C2SPlayerRename message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.C2SPlayerRename
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.C2SPlayerRename} C2SPlayerRename
         */
        C2SPlayerRename.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.C2SPlayerRename)
                return object;
            var message = new $root.protobuf.C2SPlayerRename();
            if (object.newName != null)
                message.newName = String(object.newName);
            return message;
        };

        /**
         * Creates a plain object from a C2SPlayerRename message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.C2SPlayerRename
         * @static
         * @param {protobuf.C2SPlayerRename} message C2SPlayerRename
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        C2SPlayerRename.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.newName = "";
            if (message.newName != null && message.hasOwnProperty("newName"))
                object.newName = message.newName;
            return object;
        };

        /**
         * Converts this C2SPlayerRename to JSON.
         * @function toJSON
         * @memberof protobuf.C2SPlayerRename
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        C2SPlayerRename.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return C2SPlayerRename;
    })();

    protobuf.S2CPlayerRename = (function() {

        /**
         * Properties of a S2CPlayerRename.
         * @memberof protobuf
         * @interface IS2CPlayerRename
         * @property {number|null} [renameTimes] 已改名次数
         */

        /**
         * Constructs a new S2CPlayerRename.
         * @memberof protobuf
         * @classdesc 改名
         * @implements IS2CPlayerRename
         * @constructor
         * @param {protobuf.IS2CPlayerRename=} [properties] Properties to set
         */
        function S2CPlayerRename(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * 已改名次数
         * @member {number} renameTimes
         * @memberof protobuf.S2CPlayerRename
         * @instance
         */
        S2CPlayerRename.prototype.renameTimes = 0;

        /**
         * Creates a new S2CPlayerRename instance using the specified properties.
         * @function create
         * @memberof protobuf.S2CPlayerRename
         * @static
         * @param {protobuf.IS2CPlayerRename=} [properties] Properties to set
         * @returns {protobuf.S2CPlayerRename} S2CPlayerRename instance
         */
        S2CPlayerRename.create = function create(properties) {
            return new S2CPlayerRename(properties);
        };

        /**
         * Encodes the specified S2CPlayerRename message. Does not implicitly {@link protobuf.S2CPlayerRename.verify|verify} messages.
         * @function encode
         * @memberof protobuf.S2CPlayerRename
         * @static
         * @param {protobuf.IS2CPlayerRename} message S2CPlayerRename message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CPlayerRename.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.renameTimes != null && Object.hasOwnProperty.call(message, "renameTimes"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.renameTimes);
            return writer;
        };

        /**
         * Encodes the specified S2CPlayerRename message, length delimited. Does not implicitly {@link protobuf.S2CPlayerRename.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.S2CPlayerRename
         * @static
         * @param {protobuf.IS2CPlayerRename} message S2CPlayerRename message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CPlayerRename.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a S2CPlayerRename message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.S2CPlayerRename
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.S2CPlayerRename} S2CPlayerRename
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CPlayerRename.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.S2CPlayerRename();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.renameTimes = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a S2CPlayerRename message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.S2CPlayerRename
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.S2CPlayerRename} S2CPlayerRename
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CPlayerRename.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a S2CPlayerRename message.
         * @function verify
         * @memberof protobuf.S2CPlayerRename
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        S2CPlayerRename.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.renameTimes != null && message.hasOwnProperty("renameTimes"))
                if (!$util.isInteger(message.renameTimes))
                    return "renameTimes: integer expected";
            return null;
        };

        /**
         * Creates a S2CPlayerRename message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.S2CPlayerRename
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.S2CPlayerRename} S2CPlayerRename
         */
        S2CPlayerRename.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.S2CPlayerRename)
                return object;
            var message = new $root.protobuf.S2CPlayerRename();
            if (object.renameTimes != null)
                message.renameTimes = object.renameTimes | 0;
            return message;
        };

        /**
         * Creates a plain object from a S2CPlayerRename message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.S2CPlayerRename
         * @static
         * @param {protobuf.S2CPlayerRename} message S2CPlayerRename
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        S2CPlayerRename.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.renameTimes = 0;
            if (message.renameTimes != null && message.hasOwnProperty("renameTimes"))
                object.renameTimes = message.renameTimes;
            return object;
        };

        /**
         * Converts this S2CPlayerRename to JSON.
         * @function toJSON
         * @memberof protobuf.S2CPlayerRename
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        S2CPlayerRename.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return S2CPlayerRename;
    })();

    protobuf.C2SPlayerModifyHead = (function() {

        /**
         * Properties of a C2SPlayerModifyHead.
         * @memberof protobuf
         * @interface IC2SPlayerModifyHead
         * @property {number|null} [op] 修改类型 (op=1 修改头像  |op=2修改头像框)
         * @property {string|null} [head] 头像/头像框
         */

        /**
         * Constructs a new C2SPlayerModifyHead.
         * @memberof protobuf
         * @classdesc 更换头像/头像框
         * @implements IC2SPlayerModifyHead
         * @constructor
         * @param {protobuf.IC2SPlayerModifyHead=} [properties] Properties to set
         */
        function C2SPlayerModifyHead(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * 修改类型 (op=1 修改头像  |op=2修改头像框)
         * @member {number} op
         * @memberof protobuf.C2SPlayerModifyHead
         * @instance
         */
        C2SPlayerModifyHead.prototype.op = 0;

        /**
         * 头像/头像框
         * @member {string} head
         * @memberof protobuf.C2SPlayerModifyHead
         * @instance
         */
        C2SPlayerModifyHead.prototype.head = "";

        /**
         * Creates a new C2SPlayerModifyHead instance using the specified properties.
         * @function create
         * @memberof protobuf.C2SPlayerModifyHead
         * @static
         * @param {protobuf.IC2SPlayerModifyHead=} [properties] Properties to set
         * @returns {protobuf.C2SPlayerModifyHead} C2SPlayerModifyHead instance
         */
        C2SPlayerModifyHead.create = function create(properties) {
            return new C2SPlayerModifyHead(properties);
        };

        /**
         * Encodes the specified C2SPlayerModifyHead message. Does not implicitly {@link protobuf.C2SPlayerModifyHead.verify|verify} messages.
         * @function encode
         * @memberof protobuf.C2SPlayerModifyHead
         * @static
         * @param {protobuf.IC2SPlayerModifyHead} message C2SPlayerModifyHead message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SPlayerModifyHead.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.op != null && Object.hasOwnProperty.call(message, "op"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.op);
            if (message.head != null && Object.hasOwnProperty.call(message, "head"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.head);
            return writer;
        };

        /**
         * Encodes the specified C2SPlayerModifyHead message, length delimited. Does not implicitly {@link protobuf.C2SPlayerModifyHead.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.C2SPlayerModifyHead
         * @static
         * @param {protobuf.IC2SPlayerModifyHead} message C2SPlayerModifyHead message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SPlayerModifyHead.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2SPlayerModifyHead message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.C2SPlayerModifyHead
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.C2SPlayerModifyHead} C2SPlayerModifyHead
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SPlayerModifyHead.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.C2SPlayerModifyHead();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.op = reader.int32();
                    break;
                case 2:
                    message.head = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2SPlayerModifyHead message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.C2SPlayerModifyHead
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.C2SPlayerModifyHead} C2SPlayerModifyHead
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SPlayerModifyHead.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2SPlayerModifyHead message.
         * @function verify
         * @memberof protobuf.C2SPlayerModifyHead
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2SPlayerModifyHead.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.op != null && message.hasOwnProperty("op"))
                if (!$util.isInteger(message.op))
                    return "op: integer expected";
            if (message.head != null && message.hasOwnProperty("head"))
                if (!$util.isString(message.head))
                    return "head: string expected";
            return null;
        };

        /**
         * Creates a C2SPlayerModifyHead message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.C2SPlayerModifyHead
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.C2SPlayerModifyHead} C2SPlayerModifyHead
         */
        C2SPlayerModifyHead.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.C2SPlayerModifyHead)
                return object;
            var message = new $root.protobuf.C2SPlayerModifyHead();
            if (object.op != null)
                message.op = object.op | 0;
            if (object.head != null)
                message.head = String(object.head);
            return message;
        };

        /**
         * Creates a plain object from a C2SPlayerModifyHead message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.C2SPlayerModifyHead
         * @static
         * @param {protobuf.C2SPlayerModifyHead} message C2SPlayerModifyHead
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        C2SPlayerModifyHead.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.op = 0;
                object.head = "";
            }
            if (message.op != null && message.hasOwnProperty("op"))
                object.op = message.op;
            if (message.head != null && message.hasOwnProperty("head"))
                object.head = message.head;
            return object;
        };

        /**
         * Converts this C2SPlayerModifyHead to JSON.
         * @function toJSON
         * @memberof protobuf.C2SPlayerModifyHead
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        C2SPlayerModifyHead.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return C2SPlayerModifyHead;
    })();

    protobuf.S2CPlayerModifyHead = (function() {

        /**
         * Properties of a S2CPlayerModifyHead.
         * @memberof protobuf
         * @interface IS2CPlayerModifyHead
         */

        /**
         * Constructs a new S2CPlayerModifyHead.
         * @memberof protobuf
         * @classdesc 更换头像/头像框
         * @implements IS2CPlayerModifyHead
         * @constructor
         * @param {protobuf.IS2CPlayerModifyHead=} [properties] Properties to set
         */
        function S2CPlayerModifyHead(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new S2CPlayerModifyHead instance using the specified properties.
         * @function create
         * @memberof protobuf.S2CPlayerModifyHead
         * @static
         * @param {protobuf.IS2CPlayerModifyHead=} [properties] Properties to set
         * @returns {protobuf.S2CPlayerModifyHead} S2CPlayerModifyHead instance
         */
        S2CPlayerModifyHead.create = function create(properties) {
            return new S2CPlayerModifyHead(properties);
        };

        /**
         * Encodes the specified S2CPlayerModifyHead message. Does not implicitly {@link protobuf.S2CPlayerModifyHead.verify|verify} messages.
         * @function encode
         * @memberof protobuf.S2CPlayerModifyHead
         * @static
         * @param {protobuf.IS2CPlayerModifyHead} message S2CPlayerModifyHead message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CPlayerModifyHead.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified S2CPlayerModifyHead message, length delimited. Does not implicitly {@link protobuf.S2CPlayerModifyHead.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.S2CPlayerModifyHead
         * @static
         * @param {protobuf.IS2CPlayerModifyHead} message S2CPlayerModifyHead message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CPlayerModifyHead.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a S2CPlayerModifyHead message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.S2CPlayerModifyHead
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.S2CPlayerModifyHead} S2CPlayerModifyHead
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CPlayerModifyHead.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.S2CPlayerModifyHead();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a S2CPlayerModifyHead message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.S2CPlayerModifyHead
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.S2CPlayerModifyHead} S2CPlayerModifyHead
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CPlayerModifyHead.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a S2CPlayerModifyHead message.
         * @function verify
         * @memberof protobuf.S2CPlayerModifyHead
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        S2CPlayerModifyHead.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a S2CPlayerModifyHead message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.S2CPlayerModifyHead
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.S2CPlayerModifyHead} S2CPlayerModifyHead
         */
        S2CPlayerModifyHead.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.S2CPlayerModifyHead)
                return object;
            return new $root.protobuf.S2CPlayerModifyHead();
        };

        /**
         * Creates a plain object from a S2CPlayerModifyHead message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.S2CPlayerModifyHead
         * @static
         * @param {protobuf.S2CPlayerModifyHead} message S2CPlayerModifyHead
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        S2CPlayerModifyHead.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this S2CPlayerModifyHead to JSON.
         * @function toJSON
         * @memberof protobuf.S2CPlayerModifyHead
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        S2CPlayerModifyHead.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return S2CPlayerModifyHead;
    })();

    protobuf.C2SPlayerInfoUpdate = (function() {

        /**
         * Properties of a C2SPlayerInfoUpdate.
         * @memberof protobuf
         * @interface IC2SPlayerInfoUpdate
         * @property {string|null} [platFormHead] 平台头像
         */

        /**
         * Constructs a new C2SPlayerInfoUpdate.
         * @memberof protobuf
         * @classdesc 玩家信息更新
         * @implements IC2SPlayerInfoUpdate
         * @constructor
         * @param {protobuf.IC2SPlayerInfoUpdate=} [properties] Properties to set
         */
        function C2SPlayerInfoUpdate(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * 平台头像
         * @member {string} platFormHead
         * @memberof protobuf.C2SPlayerInfoUpdate
         * @instance
         */
        C2SPlayerInfoUpdate.prototype.platFormHead = "";

        /**
         * Creates a new C2SPlayerInfoUpdate instance using the specified properties.
         * @function create
         * @memberof protobuf.C2SPlayerInfoUpdate
         * @static
         * @param {protobuf.IC2SPlayerInfoUpdate=} [properties] Properties to set
         * @returns {protobuf.C2SPlayerInfoUpdate} C2SPlayerInfoUpdate instance
         */
        C2SPlayerInfoUpdate.create = function create(properties) {
            return new C2SPlayerInfoUpdate(properties);
        };

        /**
         * Encodes the specified C2SPlayerInfoUpdate message. Does not implicitly {@link protobuf.C2SPlayerInfoUpdate.verify|verify} messages.
         * @function encode
         * @memberof protobuf.C2SPlayerInfoUpdate
         * @static
         * @param {protobuf.IC2SPlayerInfoUpdate} message C2SPlayerInfoUpdate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SPlayerInfoUpdate.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.platFormHead != null && Object.hasOwnProperty.call(message, "platFormHead"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.platFormHead);
            return writer;
        };

        /**
         * Encodes the specified C2SPlayerInfoUpdate message, length delimited. Does not implicitly {@link protobuf.C2SPlayerInfoUpdate.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.C2SPlayerInfoUpdate
         * @static
         * @param {protobuf.IC2SPlayerInfoUpdate} message C2SPlayerInfoUpdate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SPlayerInfoUpdate.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2SPlayerInfoUpdate message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.C2SPlayerInfoUpdate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.C2SPlayerInfoUpdate} C2SPlayerInfoUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SPlayerInfoUpdate.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.C2SPlayerInfoUpdate();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.platFormHead = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2SPlayerInfoUpdate message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.C2SPlayerInfoUpdate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.C2SPlayerInfoUpdate} C2SPlayerInfoUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SPlayerInfoUpdate.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2SPlayerInfoUpdate message.
         * @function verify
         * @memberof protobuf.C2SPlayerInfoUpdate
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2SPlayerInfoUpdate.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.platFormHead != null && message.hasOwnProperty("platFormHead"))
                if (!$util.isString(message.platFormHead))
                    return "platFormHead: string expected";
            return null;
        };

        /**
         * Creates a C2SPlayerInfoUpdate message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.C2SPlayerInfoUpdate
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.C2SPlayerInfoUpdate} C2SPlayerInfoUpdate
         */
        C2SPlayerInfoUpdate.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.C2SPlayerInfoUpdate)
                return object;
            var message = new $root.protobuf.C2SPlayerInfoUpdate();
            if (object.platFormHead != null)
                message.platFormHead = String(object.platFormHead);
            return message;
        };

        /**
         * Creates a plain object from a C2SPlayerInfoUpdate message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.C2SPlayerInfoUpdate
         * @static
         * @param {protobuf.C2SPlayerInfoUpdate} message C2SPlayerInfoUpdate
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        C2SPlayerInfoUpdate.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.platFormHead = "";
            if (message.platFormHead != null && message.hasOwnProperty("platFormHead"))
                object.platFormHead = message.platFormHead;
            return object;
        };

        /**
         * Converts this C2SPlayerInfoUpdate to JSON.
         * @function toJSON
         * @memberof protobuf.C2SPlayerInfoUpdate
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        C2SPlayerInfoUpdate.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return C2SPlayerInfoUpdate;
    })();

    protobuf.S2CPlayerInfoUpdate = (function() {

        /**
         * Properties of a S2CPlayerInfoUpdate.
         * @memberof protobuf
         * @interface IS2CPlayerInfoUpdate
         */

        /**
         * Constructs a new S2CPlayerInfoUpdate.
         * @memberof protobuf
         * @classdesc Represents a S2CPlayerInfoUpdate.
         * @implements IS2CPlayerInfoUpdate
         * @constructor
         * @param {protobuf.IS2CPlayerInfoUpdate=} [properties] Properties to set
         */
        function S2CPlayerInfoUpdate(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new S2CPlayerInfoUpdate instance using the specified properties.
         * @function create
         * @memberof protobuf.S2CPlayerInfoUpdate
         * @static
         * @param {protobuf.IS2CPlayerInfoUpdate=} [properties] Properties to set
         * @returns {protobuf.S2CPlayerInfoUpdate} S2CPlayerInfoUpdate instance
         */
        S2CPlayerInfoUpdate.create = function create(properties) {
            return new S2CPlayerInfoUpdate(properties);
        };

        /**
         * Encodes the specified S2CPlayerInfoUpdate message. Does not implicitly {@link protobuf.S2CPlayerInfoUpdate.verify|verify} messages.
         * @function encode
         * @memberof protobuf.S2CPlayerInfoUpdate
         * @static
         * @param {protobuf.IS2CPlayerInfoUpdate} message S2CPlayerInfoUpdate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CPlayerInfoUpdate.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified S2CPlayerInfoUpdate message, length delimited. Does not implicitly {@link protobuf.S2CPlayerInfoUpdate.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.S2CPlayerInfoUpdate
         * @static
         * @param {protobuf.IS2CPlayerInfoUpdate} message S2CPlayerInfoUpdate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CPlayerInfoUpdate.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a S2CPlayerInfoUpdate message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.S2CPlayerInfoUpdate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.S2CPlayerInfoUpdate} S2CPlayerInfoUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CPlayerInfoUpdate.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.S2CPlayerInfoUpdate();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a S2CPlayerInfoUpdate message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.S2CPlayerInfoUpdate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.S2CPlayerInfoUpdate} S2CPlayerInfoUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CPlayerInfoUpdate.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a S2CPlayerInfoUpdate message.
         * @function verify
         * @memberof protobuf.S2CPlayerInfoUpdate
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        S2CPlayerInfoUpdate.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a S2CPlayerInfoUpdate message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.S2CPlayerInfoUpdate
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.S2CPlayerInfoUpdate} S2CPlayerInfoUpdate
         */
        S2CPlayerInfoUpdate.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.S2CPlayerInfoUpdate)
                return object;
            return new $root.protobuf.S2CPlayerInfoUpdate();
        };

        /**
         * Creates a plain object from a S2CPlayerInfoUpdate message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.S2CPlayerInfoUpdate
         * @static
         * @param {protobuf.S2CPlayerInfoUpdate} message S2CPlayerInfoUpdate
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        S2CPlayerInfoUpdate.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this S2CPlayerInfoUpdate to JSON.
         * @function toJSON
         * @memberof protobuf.S2CPlayerInfoUpdate
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        S2CPlayerInfoUpdate.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return S2CPlayerInfoUpdate;
    })();

    protobuf.RewardStatus = (function() {

        /**
         * Properties of a RewardStatus.
         * @memberof protobuf
         * @interface IRewardStatus
         * @property {string|null} [refId] 奖励对应RefId
         * @property {number|null} [status] 领取状态(0-不可领取, 1-可领取，2-已领取)
         */

        /**
         * Constructs a new RewardStatus.
         * @memberof protobuf
         * @classdesc 奖励
         * @implements IRewardStatus
         * @constructor
         * @param {protobuf.IRewardStatus=} [properties] Properties to set
         */
        function RewardStatus(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * 奖励对应RefId
         * @member {string} refId
         * @memberof protobuf.RewardStatus
         * @instance
         */
        RewardStatus.prototype.refId = "";

        /**
         * 领取状态(0-不可领取, 1-可领取，2-已领取)
         * @member {number} status
         * @memberof protobuf.RewardStatus
         * @instance
         */
        RewardStatus.prototype.status = 0;

        /**
         * Creates a new RewardStatus instance using the specified properties.
         * @function create
         * @memberof protobuf.RewardStatus
         * @static
         * @param {protobuf.IRewardStatus=} [properties] Properties to set
         * @returns {protobuf.RewardStatus} RewardStatus instance
         */
        RewardStatus.create = function create(properties) {
            return new RewardStatus(properties);
        };

        /**
         * Encodes the specified RewardStatus message. Does not implicitly {@link protobuf.RewardStatus.verify|verify} messages.
         * @function encode
         * @memberof protobuf.RewardStatus
         * @static
         * @param {protobuf.IRewardStatus} message RewardStatus message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RewardStatus.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.refId != null && Object.hasOwnProperty.call(message, "refId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.refId);
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.status);
            return writer;
        };

        /**
         * Encodes the specified RewardStatus message, length delimited. Does not implicitly {@link protobuf.RewardStatus.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.RewardStatus
         * @static
         * @param {protobuf.IRewardStatus} message RewardStatus message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RewardStatus.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RewardStatus message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.RewardStatus
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.RewardStatus} RewardStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RewardStatus.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.RewardStatus();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.refId = reader.string();
                    break;
                case 2:
                    message.status = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RewardStatus message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.RewardStatus
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.RewardStatus} RewardStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RewardStatus.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RewardStatus message.
         * @function verify
         * @memberof protobuf.RewardStatus
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RewardStatus.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.refId != null && message.hasOwnProperty("refId"))
                if (!$util.isString(message.refId))
                    return "refId: string expected";
            if (message.status != null && message.hasOwnProperty("status"))
                if (!$util.isInteger(message.status))
                    return "status: integer expected";
            return null;
        };

        /**
         * Creates a RewardStatus message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.RewardStatus
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.RewardStatus} RewardStatus
         */
        RewardStatus.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.RewardStatus)
                return object;
            var message = new $root.protobuf.RewardStatus();
            if (object.refId != null)
                message.refId = String(object.refId);
            if (object.status != null)
                message.status = object.status | 0;
            return message;
        };

        /**
         * Creates a plain object from a RewardStatus message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.RewardStatus
         * @static
         * @param {protobuf.RewardStatus} message RewardStatus
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RewardStatus.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.refId = "";
                object.status = 0;
            }
            if (message.refId != null && message.hasOwnProperty("refId"))
                object.refId = message.refId;
            if (message.status != null && message.hasOwnProperty("status"))
                object.status = message.status;
            return object;
        };

        /**
         * Converts this RewardStatus to JSON.
         * @function toJSON
         * @memberof protobuf.RewardStatus
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RewardStatus.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RewardStatus;
    })();

    protobuf.C2SMessage = (function() {

        /**
         * Properties of a C2SMessage.
         * @memberof protobuf
         * @interface IC2SMessage
         * @property {number|null} [cmdId] 命令id
         * @property {number|null} [ind] 消息包索引
         * @property {string|null} [sign] 消息签名
         * @property {string|null} [lid] 玩家账号
         * @property {Uint8Array|null} [data] cmd数据
         */

        /**
         * Constructs a new C2SMessage.
         * @memberof protobuf
         * @classdesc Represents a C2SMessage.
         * @implements IC2SMessage
         * @constructor
         * @param {protobuf.IC2SMessage=} [properties] Properties to set
         */
        function C2SMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * 命令id
         * @member {number} cmdId
         * @memberof protobuf.C2SMessage
         * @instance
         */
        C2SMessage.prototype.cmdId = 0;

        /**
         * 消息包索引
         * @member {number} ind
         * @memberof protobuf.C2SMessage
         * @instance
         */
        C2SMessage.prototype.ind = 0;

        /**
         * 消息签名
         * @member {string} sign
         * @memberof protobuf.C2SMessage
         * @instance
         */
        C2SMessage.prototype.sign = "";

        /**
         * 玩家账号
         * @member {string} lid
         * @memberof protobuf.C2SMessage
         * @instance
         */
        C2SMessage.prototype.lid = "";

        /**
         * cmd数据
         * @member {Uint8Array} data
         * @memberof protobuf.C2SMessage
         * @instance
         */
        C2SMessage.prototype.data = $util.newBuffer([]);

        /**
         * Creates a new C2SMessage instance using the specified properties.
         * @function create
         * @memberof protobuf.C2SMessage
         * @static
         * @param {protobuf.IC2SMessage=} [properties] Properties to set
         * @returns {protobuf.C2SMessage} C2SMessage instance
         */
        C2SMessage.create = function create(properties) {
            return new C2SMessage(properties);
        };

        /**
         * Encodes the specified C2SMessage message. Does not implicitly {@link protobuf.C2SMessage.verify|verify} messages.
         * @function encode
         * @memberof protobuf.C2SMessage
         * @static
         * @param {protobuf.IC2SMessage} message C2SMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.cmdId != null && Object.hasOwnProperty.call(message, "cmdId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.cmdId);
            if (message.ind != null && Object.hasOwnProperty.call(message, "ind"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.ind);
            if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.sign);
            if (message.lid != null && Object.hasOwnProperty.call(message, "lid"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.lid);
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.data);
            return writer;
        };

        /**
         * Encodes the specified C2SMessage message, length delimited. Does not implicitly {@link protobuf.C2SMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.C2SMessage
         * @static
         * @param {protobuf.IC2SMessage} message C2SMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        C2SMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a C2SMessage message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.C2SMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.C2SMessage} C2SMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.C2SMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.cmdId = reader.int32();
                    break;
                case 2:
                    message.ind = reader.int32();
                    break;
                case 3:
                    message.sign = reader.string();
                    break;
                case 4:
                    message.lid = reader.string();
                    break;
                case 5:
                    message.data = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a C2SMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.C2SMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.C2SMessage} C2SMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        C2SMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a C2SMessage message.
         * @function verify
         * @memberof protobuf.C2SMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        C2SMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.cmdId != null && message.hasOwnProperty("cmdId"))
                if (!$util.isInteger(message.cmdId))
                    return "cmdId: integer expected";
            if (message.ind != null && message.hasOwnProperty("ind"))
                if (!$util.isInteger(message.ind))
                    return "ind: integer expected";
            if (message.sign != null && message.hasOwnProperty("sign"))
                if (!$util.isString(message.sign))
                    return "sign: string expected";
            if (message.lid != null && message.hasOwnProperty("lid"))
                if (!$util.isString(message.lid))
                    return "lid: string expected";
            if (message.data != null && message.hasOwnProperty("data"))
                if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                    return "data: buffer expected";
            return null;
        };

        /**
         * Creates a C2SMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.C2SMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.C2SMessage} C2SMessage
         */
        C2SMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.C2SMessage)
                return object;
            var message = new $root.protobuf.C2SMessage();
            if (object.cmdId != null)
                message.cmdId = object.cmdId | 0;
            if (object.ind != null)
                message.ind = object.ind | 0;
            if (object.sign != null)
                message.sign = String(object.sign);
            if (object.lid != null)
                message.lid = String(object.lid);
            if (object.data != null)
                if (typeof object.data === "string")
                    $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                else if (object.data.length)
                    message.data = object.data;
            return message;
        };

        /**
         * Creates a plain object from a C2SMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.C2SMessage
         * @static
         * @param {protobuf.C2SMessage} message C2SMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        C2SMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.cmdId = 0;
                object.ind = 0;
                object.sign = "";
                object.lid = "";
                if (options.bytes === String)
                    object.data = "";
                else {
                    object.data = [];
                    if (options.bytes !== Array)
                        object.data = $util.newBuffer(object.data);
                }
            }
            if (message.cmdId != null && message.hasOwnProperty("cmdId"))
                object.cmdId = message.cmdId;
            if (message.ind != null && message.hasOwnProperty("ind"))
                object.ind = message.ind;
            if (message.sign != null && message.hasOwnProperty("sign"))
                object.sign = message.sign;
            if (message.lid != null && message.hasOwnProperty("lid"))
                object.lid = message.lid;
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
            return object;
        };

        /**
         * Converts this C2SMessage to JSON.
         * @function toJSON
         * @memberof protobuf.C2SMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        C2SMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return C2SMessage;
    })();

    protobuf.S2CMessage = (function() {

        /**
         * Properties of a S2CMessage.
         * @memberof protobuf
         * @interface IS2CMessage
         * @property {number|null} [cmdId] cmdid
         * @property {number|null} [compress] 是否压缩(0-不压缩，1-压缩)
         * @property {Uint8Array|null} [data] cmd实际数据
         * @property {protobuf.IS2CPrompt|null} [error] 错误提示语
         * @property {protobuf.IS2CPrompt|null} [success] 成功提示语
         */

        /**
         * Constructs a new S2CMessage.
         * @memberof protobuf
         * @classdesc Represents a S2CMessage.
         * @implements IS2CMessage
         * @constructor
         * @param {protobuf.IS2CMessage=} [properties] Properties to set
         */
        function S2CMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * cmdid
         * @member {number} cmdId
         * @memberof protobuf.S2CMessage
         * @instance
         */
        S2CMessage.prototype.cmdId = 0;

        /**
         * 是否压缩(0-不压缩，1-压缩)
         * @member {number} compress
         * @memberof protobuf.S2CMessage
         * @instance
         */
        S2CMessage.prototype.compress = 0;

        /**
         * cmd实际数据
         * @member {Uint8Array} data
         * @memberof protobuf.S2CMessage
         * @instance
         */
        S2CMessage.prototype.data = $util.newBuffer([]);

        /**
         * 错误提示语
         * @member {protobuf.IS2CPrompt|null|undefined} error
         * @memberof protobuf.S2CMessage
         * @instance
         */
        S2CMessage.prototype.error = null;

        /**
         * 成功提示语
         * @member {protobuf.IS2CPrompt|null|undefined} success
         * @memberof protobuf.S2CMessage
         * @instance
         */
        S2CMessage.prototype.success = null;

        /**
         * Creates a new S2CMessage instance using the specified properties.
         * @function create
         * @memberof protobuf.S2CMessage
         * @static
         * @param {protobuf.IS2CMessage=} [properties] Properties to set
         * @returns {protobuf.S2CMessage} S2CMessage instance
         */
        S2CMessage.create = function create(properties) {
            return new S2CMessage(properties);
        };

        /**
         * Encodes the specified S2CMessage message. Does not implicitly {@link protobuf.S2CMessage.verify|verify} messages.
         * @function encode
         * @memberof protobuf.S2CMessage
         * @static
         * @param {protobuf.IS2CMessage} message S2CMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.cmdId != null && Object.hasOwnProperty.call(message, "cmdId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.cmdId);
            if (message.compress != null && Object.hasOwnProperty.call(message, "compress"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.compress);
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.data);
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                $root.protobuf.S2CPrompt.encode(message.error, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.success != null && Object.hasOwnProperty.call(message, "success"))
                $root.protobuf.S2CPrompt.encode(message.success, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified S2CMessage message, length delimited. Does not implicitly {@link protobuf.S2CMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.S2CMessage
         * @static
         * @param {protobuf.IS2CMessage} message S2CMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a S2CMessage message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.S2CMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.S2CMessage} S2CMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.S2CMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.cmdId = reader.int32();
                    break;
                case 2:
                    message.compress = reader.int32();
                    break;
                case 3:
                    message.data = reader.bytes();
                    break;
                case 4:
                    message.error = $root.protobuf.S2CPrompt.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.success = $root.protobuf.S2CPrompt.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a S2CMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.S2CMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.S2CMessage} S2CMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a S2CMessage message.
         * @function verify
         * @memberof protobuf.S2CMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        S2CMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.cmdId != null && message.hasOwnProperty("cmdId"))
                if (!$util.isInteger(message.cmdId))
                    return "cmdId: integer expected";
            if (message.compress != null && message.hasOwnProperty("compress"))
                if (!$util.isInteger(message.compress))
                    return "compress: integer expected";
            if (message.data != null && message.hasOwnProperty("data"))
                if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                    return "data: buffer expected";
            if (message.error != null && message.hasOwnProperty("error")) {
                var error = $root.protobuf.S2CPrompt.verify(message.error);
                if (error)
                    return "error." + error;
            }
            if (message.success != null && message.hasOwnProperty("success")) {
                var error = $root.protobuf.S2CPrompt.verify(message.success);
                if (error)
                    return "success." + error;
            }
            return null;
        };

        /**
         * Creates a S2CMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.S2CMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.S2CMessage} S2CMessage
         */
        S2CMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.S2CMessage)
                return object;
            var message = new $root.protobuf.S2CMessage();
            if (object.cmdId != null)
                message.cmdId = object.cmdId | 0;
            if (object.compress != null)
                message.compress = object.compress | 0;
            if (object.data != null)
                if (typeof object.data === "string")
                    $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                else if (object.data.length)
                    message.data = object.data;
            if (object.error != null) {
                if (typeof object.error !== "object")
                    throw TypeError(".protobuf.S2CMessage.error: object expected");
                message.error = $root.protobuf.S2CPrompt.fromObject(object.error);
            }
            if (object.success != null) {
                if (typeof object.success !== "object")
                    throw TypeError(".protobuf.S2CMessage.success: object expected");
                message.success = $root.protobuf.S2CPrompt.fromObject(object.success);
            }
            return message;
        };

        /**
         * Creates a plain object from a S2CMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.S2CMessage
         * @static
         * @param {protobuf.S2CMessage} message S2CMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        S2CMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.cmdId = 0;
                object.compress = 0;
                if (options.bytes === String)
                    object.data = "";
                else {
                    object.data = [];
                    if (options.bytes !== Array)
                        object.data = $util.newBuffer(object.data);
                }
                object.error = null;
                object.success = null;
            }
            if (message.cmdId != null && message.hasOwnProperty("cmdId"))
                object.cmdId = message.cmdId;
            if (message.compress != null && message.hasOwnProperty("compress"))
                object.compress = message.compress;
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
            if (message.error != null && message.hasOwnProperty("error"))
                object.error = $root.protobuf.S2CPrompt.toObject(message.error, options);
            if (message.success != null && message.hasOwnProperty("success"))
                object.success = $root.protobuf.S2CPrompt.toObject(message.success, options);
            return object;
        };

        /**
         * Converts this S2CMessage to JSON.
         * @function toJSON
         * @memberof protobuf.S2CMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        S2CMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return S2CMessage;
    })();

    protobuf.S2CPrompt = (function() {

        /**
         * Properties of a S2CPrompt.
         * @memberof protobuf
         * @interface IS2CPrompt
         * @property {number|null} [code] 飘字id *
         * @property {Array.<string>|null} [args] 填充参数 *
         */

        /**
         * Constructs a new S2CPrompt.
         * @memberof protobuf
         * @classdesc 提示语
         * @implements IS2CPrompt
         * @constructor
         * @param {protobuf.IS2CPrompt=} [properties] Properties to set
         */
        function S2CPrompt(properties) {
            this.args = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * 飘字id *
         * @member {number} code
         * @memberof protobuf.S2CPrompt
         * @instance
         */
        S2CPrompt.prototype.code = 0;

        /**
         * 填充参数 *
         * @member {Array.<string>} args
         * @memberof protobuf.S2CPrompt
         * @instance
         */
        S2CPrompt.prototype.args = $util.emptyArray;

        /**
         * Creates a new S2CPrompt instance using the specified properties.
         * @function create
         * @memberof protobuf.S2CPrompt
         * @static
         * @param {protobuf.IS2CPrompt=} [properties] Properties to set
         * @returns {protobuf.S2CPrompt} S2CPrompt instance
         */
        S2CPrompt.create = function create(properties) {
            return new S2CPrompt(properties);
        };

        /**
         * Encodes the specified S2CPrompt message. Does not implicitly {@link protobuf.S2CPrompt.verify|verify} messages.
         * @function encode
         * @memberof protobuf.S2CPrompt
         * @static
         * @param {protobuf.IS2CPrompt} message S2CPrompt message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CPrompt.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.code);
            if (message.args != null && message.args.length)
                for (var i = 0; i < message.args.length; ++i)
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.args[i]);
            return writer;
        };

        /**
         * Encodes the specified S2CPrompt message, length delimited. Does not implicitly {@link protobuf.S2CPrompt.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protobuf.S2CPrompt
         * @static
         * @param {protobuf.IS2CPrompt} message S2CPrompt message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        S2CPrompt.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a S2CPrompt message from the specified reader or buffer.
         * @function decode
         * @memberof protobuf.S2CPrompt
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protobuf.S2CPrompt} S2CPrompt
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CPrompt.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protobuf.S2CPrompt();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.code = reader.int32();
                    break;
                case 2:
                    if (!(message.args && message.args.length))
                        message.args = [];
                    message.args.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a S2CPrompt message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protobuf.S2CPrompt
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protobuf.S2CPrompt} S2CPrompt
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        S2CPrompt.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a S2CPrompt message.
         * @function verify
         * @memberof protobuf.S2CPrompt
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        S2CPrompt.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.args != null && message.hasOwnProperty("args")) {
                if (!Array.isArray(message.args))
                    return "args: array expected";
                for (var i = 0; i < message.args.length; ++i)
                    if (!$util.isString(message.args[i]))
                        return "args: string[] expected";
            }
            return null;
        };

        /**
         * Creates a S2CPrompt message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protobuf.S2CPrompt
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protobuf.S2CPrompt} S2CPrompt
         */
        S2CPrompt.fromObject = function fromObject(object) {
            if (object instanceof $root.protobuf.S2CPrompt)
                return object;
            var message = new $root.protobuf.S2CPrompt();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.args) {
                if (!Array.isArray(object.args))
                    throw TypeError(".protobuf.S2CPrompt.args: array expected");
                message.args = [];
                for (var i = 0; i < object.args.length; ++i)
                    message.args[i] = String(object.args[i]);
            }
            return message;
        };

        /**
         * Creates a plain object from a S2CPrompt message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protobuf.S2CPrompt
         * @static
         * @param {protobuf.S2CPrompt} message S2CPrompt
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        S2CPrompt.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.args = [];
            if (options.defaults)
                object.code = 0;
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.args && message.args.length) {
                object.args = [];
                for (var j = 0; j < message.args.length; ++j)
                    object.args[j] = message.args[j];
            }
            return object;
        };

        /**
         * Converts this S2CPrompt to JSON.
         * @function toJSON
         * @memberof protobuf.S2CPrompt
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        S2CPrompt.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return S2CPrompt;
    })();

    return protobuf;
})();

module.exports = $root;
