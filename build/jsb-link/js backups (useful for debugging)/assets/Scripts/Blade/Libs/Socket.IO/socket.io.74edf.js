(function(t, e) {
t.io = e();
})(this, function() {
return function(t) {
var e = {};
function r(n) {
if (e[n]) return e[n].exports;
var o = e[n] = {
exports: {},
id: n,
loaded: !1
};
t[n].call(o.exports, o, o.exports, r);
o.loaded = !0;
return o.exports;
}
r.m = t;
r.c = e;
r.p = "";
return r(0);
}([ function(t, e, r) {
"use strict";
var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
return typeof t;
} : function(t) {
return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, o = r(1), i = r(7), s = r(17), a = r(3)("socket.io-client");
t.exports = e = u;
var c = e.managers = {};
function u(t, e) {
if ("object" === ("undefined" == typeof t ? "undefined" : n(t))) {
e = t;
t = void 0;
}
e = e || {};
var r, i = o(t), u = i.source, p = i.id, f = i.path, l = c[p] && f in c[p].nsps;
if (e.forceNew || e["force new connection"] || !1 === e.multiplex || l) {
a("ignoring socket cache for %s", u);
r = s(u, e);
} else {
if (!c[p]) {
a("new io instance for %s", u);
c[p] = s(u, e);
}
r = c[p];
}
i.query && !e.query ? e.query = i.query : e && "object" === n(e.query) && (e.query = h(e.query));
return r.socket(i.path, e);
}
function h(t) {
var e = [];
for (var r in t) t.hasOwnProperty(r) && e.push(encodeURIComponent(r) + "=" + encodeURIComponent(t[r]));
return e.join("&");
}
e.protocol = i.protocol;
e.connect = u;
e.Manager = r(17);
e.Socket = r(44);
}, function(t, e, r) {
(function(e) {
"use strict";
var n = r(2), o = r(3)("socket.io-client:url");
t.exports = function(t, r) {
var i = t;
r = r || e.location;
null == t && (t = r.protocol + "//" + r.host);
if ("string" == typeof t) {
"/" === t.charAt(0) && (t = "/" === t.charAt(1) ? r.protocol + t : r.host + t);
if (!/^(https?|wss?):\/\//.test(t)) {
o("protocol-less url %s", t);
t = "undefined" != typeof r ? r.protocol + "//" + t : "https://" + t;
}
o("parse %s", t);
i = n(t);
}
i.port || (/^(http|ws)$/.test(i.protocol) ? i.port = "80" : /^(http|ws)s$/.test(i.protocol) && (i.port = "443"));
i.path = i.path || "/";
var s = -1 !== i.host.indexOf(":") ? "[" + i.host + "]" : i.host;
i.id = i.protocol + "://" + s + ":" + i.port;
i.href = i.protocol + "://" + s + (r && r.port === i.port ? "" : ":" + i.port);
return i;
};
}).call(e, function() {
return this;
}());
}, function(t, e) {
var r = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, n = [ "source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor" ];
t.exports = function(t) {
var e = t, o = t.indexOf("["), i = t.indexOf("]");
-1 != o && -1 != i && (t = t.substring(0, o) + t.substring(o, i).replace(/:/g, ";") + t.substring(i, t.length));
for (var s = r.exec(t || ""), a = {}, c = 14; c--; ) a[n[c]] = s[c] || "";
if (-1 != o && -1 != i) {
a.source = e;
a.host = a.host.substring(1, a.host.length - 1).replace(/;/g, ":");
a.authority = a.authority.replace("[", "").replace("]", "").replace(/;/g, ":");
a.ipv6uri = !0;
}
return a;
};
}, function(t, e, r) {
(function(n) {
(e = t.exports = r(5)).log = function() {
return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
};
e.formatArgs = function() {
var t = arguments, r = this.useColors;
t[0] = (r ? "%c" : "") + this.namespace + (r ? " %c" : " ") + t[0] + (r ? "%c " : " ") + "+" + e.humanize(this.diff);
if (!r) return t;
var n = "color: " + this.color, o = 0, i = 0;
(t = [ t[0], n, "color: inherit" ].concat(Array.prototype.slice.call(t, 1)))[0].replace(/%[a-z%]/g, function(t) {
"%%" !== t && "%c" === t && (i = ++o);
});
t.splice(i, 0, n);
return t;
};
e.save = function(t) {
try {
null == t ? e.storage.removeItem("debug") : e.storage.debug = t;
} catch (t) {}
};
e.load = o;
e.useColors = function() {
return "undefined" != typeof document && "WebkitAppearance" in document.documentElement.style || window.console && (console.firebug || console.exception && console.table) || navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31;
};
e.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : function() {
try {
return window.localStorage;
} catch (t) {}
}();
e.colors = [ "lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson" ];
e.formatters.j = function(t) {
try {
return JSON.stringify(t);
} catch (t) {
return "[UnexpectedJSONParseError]: " + t.message;
}
};
function o() {
try {
return e.storage.debug;
} catch (t) {}
if ("undefined" != typeof n && "env" in n) return n.env.DEBUG;
}
e.enable(o());
}).call(e, r(4));
}, function(t, e) {
var r, n, o = t.exports = {};
function i() {
throw new Error("setTimeout has not been defined");
}
function s() {
throw new Error("clearTimeout has not been defined");
}
(function() {
try {
r = "function" == typeof setTimeout ? setTimeout : i;
} catch (t) {
r = i;
}
try {
n = "function" == typeof clearTimeout ? clearTimeout : s;
} catch (t) {
n = s;
}
})();
function a(t) {
if (r === setTimeout) return setTimeout(t, 0);
if ((r === i || !r) && setTimeout) {
r = setTimeout;
return setTimeout(t, 0);
}
try {
return r(t, 0);
} catch (e) {
try {
return r.call(null, t, 0);
} catch (e) {
return r.call(this, t, 0);
}
}
}
function c(t) {
if (n === clearTimeout) return clearTimeout(t);
if ((n === s || !n) && clearTimeout) {
n = clearTimeout;
return clearTimeout(t);
}
try {
return n(t);
} catch (e) {
try {
return n.call(null, t);
} catch (e) {
return n.call(this, t);
}
}
}
var u, h = [], p = !1, f = -1;
function l() {
if (p && u) {
p = !1;
u.length ? h = u.concat(h) : f = -1;
h.length && d();
}
}
function d() {
if (!p) {
var t = a(l);
p = !0;
for (var e = h.length; e; ) {
u = h;
h = [];
for (;++f < e; ) u && u[f].run();
f = -1;
e = h.length;
}
u = null;
p = !1;
c(t);
}
}
o.nextTick = function(t) {
var e = new Array(arguments.length - 1);
if (arguments.length > 1) for (var r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
h.push(new y(t, e));
1 !== h.length || p || a(d);
};
function y(t, e) {
this.fun = t;
this.array = e;
}
y.prototype.run = function() {
this.fun.apply(null, this.array);
};
o.title = "browser";
o.browser = !0;
o.env = {};
o.argv = [];
o.version = "";
o.versions = {};
function g() {}
o.on = g;
o.addListener = g;
o.once = g;
o.off = g;
o.removeListener = g;
o.removeAllListeners = g;
o.emit = g;
o.binding = function(t) {
throw new Error("process.binding is not supported");
};
o.cwd = function() {
return "/";
};
o.chdir = function(t) {
throw new Error("process.chdir is not supported");
};
o.umask = function() {
return 0;
};
}, function(t, e, r) {
(e = t.exports = i.debug = i).coerce = function(t) {
return t instanceof Error ? t.stack || t.message : t;
};
e.disable = function() {
e.enable("");
};
e.enable = function(t) {
e.save(t);
for (var r = (t || "").split(/[\s,]+/), n = r.length, o = 0; o < n; o++) r[o] && ("-" === (t = r[o].replace(/[\\^$+?.()|[\]{}]/g, "\\$&").replace(/\*/g, ".*?"))[0] ? e.skips.push(new RegExp("^" + t.substr(1) + "$")) : e.names.push(new RegExp("^" + t + "$")));
};
e.enabled = function(t) {
var r, n;
for (r = 0, n = e.skips.length; r < n; r++) if (e.skips[r].test(t)) return !1;
for (r = 0, n = e.names.length; r < n; r++) if (e.names[r].test(t)) return !0;
return !1;
};
e.humanize = r(6);
e.names = [];
e.skips = [];
e.formatters = {};
var n, o = 0;
function i(t) {
function r() {}
r.enabled = !1;
function i() {
var t = i, r = +new Date(), s = r - (n || r);
t.diff = s;
t.prev = n;
t.curr = r;
n = r;
null == t.useColors && (t.useColors = e.useColors());
null == t.color && t.useColors && (t.color = e.colors[o++ % e.colors.length]);
for (var a = new Array(arguments.length), c = 0; c < a.length; c++) a[c] = arguments[c];
a[0] = e.coerce(a[0]);
"string" != typeof a[0] && (a = [ "%o" ].concat(a));
var u = 0;
a[0] = a[0].replace(/%([a-z%])/g, function(r, n) {
if ("%%" === r) return r;
u++;
var o = e.formatters[n];
if ("function" == typeof o) {
var i = a[u];
r = o.call(t, i);
a.splice(u, 1);
u--;
}
return r;
});
a = e.formatArgs.apply(t, a);
(i.log || e.log || console.log.bind(console)).apply(t, a);
}
i.enabled = !0;
var s = e.enabled(t) ? i : r;
s.namespace = t;
return s;
}
}, function(t, e) {
var r = 1e3, n = 60 * r, o = 60 * n, i = 24 * o, s = 365.25 * i;
t.exports = function(t, e) {
e = e || {};
var r = typeof t;
if ("string" === r && t.length > 0) return a(t);
if ("number" === r && !1 === isNaN(t)) return e.long ? u(t) : c(t);
throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(t));
};
function a(t) {
if (!((t = String(t)).length > 1e4)) {
var e = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(t);
if (e) {
var a = parseFloat(e[1]);
switch ((e[2] || "ms").toLowerCase()) {
case "years":
case "year":
case "yrs":
case "yr":
case "y":
return a * s;

case "days":
case "day":
case "d":
return a * i;

case "hours":
case "hour":
case "hrs":
case "hr":
case "h":
return a * o;

case "minutes":
case "minute":
case "mins":
case "min":
case "m":
return a * n;

case "seconds":
case "second":
case "secs":
case "sec":
case "s":
return a * r;

case "milliseconds":
case "millisecond":
case "msecs":
case "msec":
case "ms":
return a;

default:
return;
}
}
}
}
function c(t) {
return t >= i ? Math.round(t / i) + "d" : t >= o ? Math.round(t / o) + "h" : t >= n ? Math.round(t / n) + "m" : t >= r ? Math.round(t / r) + "s" : t + "ms";
}
function u(t) {
return h(t, i, "day") || h(t, o, "hour") || h(t, n, "minute") || h(t, r, "second") || t + " ms";
}
function h(t, e, r) {
if (!(t < e)) return t < 1.5 * e ? Math.floor(t / e) + " " + r : Math.ceil(t / e) + " " + r + "s";
}
}, function(t, e, r) {
var n = r(8)("socket.io-parser"), o = r(11), i = r(13), s = r(14), a = r(16);
e.protocol = 4;
e.types = [ "CONNECT", "DISCONNECT", "EVENT", "ACK", "ERROR", "BINARY_EVENT", "BINARY_ACK" ];
e.CONNECT = 0;
e.DISCONNECT = 1;
e.EVENT = 2;
e.ACK = 3;
e.ERROR = 4;
e.BINARY_EVENT = 5;
e.BINARY_ACK = 6;
e.Encoder = c;
e.Decoder = p;
function c() {}
c.prototype.encode = function(t, r) {
n("encoding packet %j", t);
if (e.BINARY_EVENT == t.type || e.BINARY_ACK == t.type) h(t, r); else {
r([ u(t) ]);
}
};
function u(t) {
var r = "", i = !1;
r += t.type;
if (e.BINARY_EVENT == t.type || e.BINARY_ACK == t.type) {
r += t.attachments;
r += "-";
}
if (t.nsp && "/" != t.nsp) {
i = !0;
r += t.nsp;
}
if (null != t.id) {
if (i) {
r += ",";
i = !1;
}
r += t.id;
}
if (null != t.data) {
i && (r += ",");
r += o.stringify(t.data);
}
n("encoded %j as %s", t, r);
return r;
}
function h(t, e) {
s.removeBlobs(t, function(t) {
var r = s.deconstructPacket(t), n = u(r.packet), o = r.buffers;
o.unshift(n);
e(o);
});
}
function p() {
this.reconstructor = null;
}
i(p.prototype);
p.prototype.add = function(t) {
var r;
if ("string" == typeof t) {
r = f(t);
if (e.BINARY_EVENT == r.type || e.BINARY_ACK == r.type) {
this.reconstructor = new d(r);
0 === this.reconstructor.reconPack.attachments && this.emit("decoded", r);
} else this.emit("decoded", r);
} else {
if (!a(t) && !t.base64) throw new Error("Unknown type: " + t);
if (!this.reconstructor) throw new Error("got binary data when not reconstructing a packet");
if (r = this.reconstructor.takeBinaryData(t)) {
this.reconstructor = null;
this.emit("decoded", r);
}
}
};
function f(t) {
var r = {}, o = 0;
r.type = Number(t.charAt(0));
if (null == e.types[r.type]) return y();
if (e.BINARY_EVENT == r.type || e.BINARY_ACK == r.type) {
for (var i = ""; "-" != t.charAt(++o); ) {
i += t.charAt(o);
if (o == t.length) break;
}
if (i != Number(i) || "-" != t.charAt(o)) throw new Error("Illegal attachments");
r.attachments = Number(i);
}
if ("/" == t.charAt(o + 1)) {
r.nsp = "";
for (;++o; ) {
if ("," == (a = t.charAt(o))) break;
r.nsp += a;
if (o == t.length) break;
}
} else r.nsp = "/";
var s = t.charAt(o + 1);
if ("" !== s && Number(s) == s) {
r.id = "";
for (;++o; ) {
var a;
if (null == (a = t.charAt(o)) || Number(a) != a) {
--o;
break;
}
r.id += t.charAt(o);
if (o == t.length) break;
}
r.id = Number(r.id);
}
t.charAt(++o) && (r = l(r, t.substr(o)));
n("decoded %s as %j", t, r);
return r;
}
function l(t, e) {
try {
t.data = o.parse(e);
} catch (t) {
return y();
}
return t;
}
p.prototype.destroy = function() {
this.reconstructor && this.reconstructor.finishedReconstruction();
};
function d(t) {
this.reconPack = t;
this.buffers = [];
}
d.prototype.takeBinaryData = function(t) {
this.buffers.push(t);
if (this.buffers.length == this.reconPack.attachments) {
var e = s.reconstructPacket(this.reconPack, this.buffers);
this.finishedReconstruction();
return e;
}
return null;
};
d.prototype.finishedReconstruction = function() {
this.reconPack = null;
this.buffers = [];
};
function y(t) {
return {
type: e.ERROR,
data: "parser error"
};
}
}, function(t, e, r) {
(e = t.exports = r(9)).log = function() {
return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
};
e.formatArgs = function() {
var t = arguments, r = this.useColors;
t[0] = (r ? "%c" : "") + this.namespace + (r ? " %c" : " ") + t[0] + (r ? "%c " : " ") + "+" + e.humanize(this.diff);
if (!r) return t;
var n = "color: " + this.color, o = 0, i = 0;
(t = [ t[0], n, "color: inherit" ].concat(Array.prototype.slice.call(t, 1)))[0].replace(/%[a-z%]/g, function(t) {
"%%" !== t && "%c" === t && (i = ++o);
});
t.splice(i, 0, n);
return t;
};
e.save = function(t) {
try {
null == t ? e.storage.removeItem("debug") : e.storage.debug = t;
} catch (t) {}
};
e.load = n;
e.useColors = function() {
return "WebkitAppearance" in document.documentElement.style || window.console && (console.firebug || console.exception && console.table) || navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31;
};
e.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : function() {
try {
return window.localStorage;
} catch (t) {}
}();
e.colors = [ "lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson" ];
e.formatters.j = function(t) {
return JSON.stringify(t);
};
function n() {
var t;
try {
t = e.storage.debug;
} catch (t) {}
return t;
}
e.enable(n());
}, function(t, e, r) {
(e = t.exports = function(t) {
function r() {}
r.enabled = !1;
function i() {
var t = i, r = +new Date(), s = r - (n || r);
t.diff = s;
t.prev = n;
t.curr = r;
n = r;
null == t.useColors && (t.useColors = e.useColors());
null == t.color && t.useColors && (t.color = e.colors[o++ % e.colors.length]);
var a = Array.prototype.slice.call(arguments);
a[0] = e.coerce(a[0]);
"string" != typeof a[0] && (a = [ "%o" ].concat(a));
var c = 0;
a[0] = a[0].replace(/%([a-z%])/g, function(r, n) {
if ("%%" === r) return r;
c++;
var o = e.formatters[n];
if ("function" == typeof o) {
var i = a[c];
r = o.call(t, i);
a.splice(c, 1);
c--;
}
return r;
});
"function" == typeof e.formatArgs && (a = e.formatArgs.apply(t, a));
var u = i.log || e.log || console.log.bind(console);
u.apply(t, a);
}
i.enabled = !0;
var s = e.enabled(t) ? i : r;
s.namespace = t;
return s;
}).coerce = function(t) {
return t instanceof Error ? t.stack || t.message : t;
};
e.disable = function() {
e.enable("");
};
e.enable = function(t) {
e.save(t);
for (var r = (t || "").split(/[\s,]+/), n = r.length, o = 0; o < n; o++) r[o] && ("-" === (t = r[o].replace(/\*/g, ".*?"))[0] ? e.skips.push(new RegExp("^" + t.substr(1) + "$")) : e.names.push(new RegExp("^" + t + "$")));
};
e.enabled = function(t) {
var r, n;
for (r = 0, n = e.skips.length; r < n; r++) if (e.skips[r].test(t)) return !1;
for (r = 0, n = e.names.length; r < n; r++) if (e.names[r].test(t)) return !0;
return !1;
};
e.humanize = r(10);
e.names = [];
e.skips = [];
e.formatters = {};
var n, o = 0;
}, function(t, e) {
var r = 1e3, n = 60 * r, o = 60 * n, i = 24 * o, s = 365.25 * i;
t.exports = function(t, e) {
e = e || {};
return "string" == typeof t ? a(t) : e.long ? u(t) : c(t);
};
function a(t) {
if (!((t = "" + t).length > 1e4)) {
var e = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(t);
if (e) {
var a = parseFloat(e[1]);
switch ((e[2] || "ms").toLowerCase()) {
case "years":
case "year":
case "yrs":
case "yr":
case "y":
return a * s;

case "days":
case "day":
case "d":
return a * i;

case "hours":
case "hour":
case "hrs":
case "hr":
case "h":
return a * o;

case "minutes":
case "minute":
case "mins":
case "min":
case "m":
return a * n;

case "seconds":
case "second":
case "secs":
case "sec":
case "s":
return a * r;

case "milliseconds":
case "millisecond":
case "msecs":
case "msec":
case "ms":
return a;
}
}
}
}
function c(t) {
return t >= i ? Math.round(t / i) + "d" : t >= o ? Math.round(t / o) + "h" : t >= n ? Math.round(t / n) + "m" : t >= r ? Math.round(t / r) + "s" : t + "ms";
}
function u(t) {
return h(t, i, "day") || h(t, o, "hour") || h(t, n, "minute") || h(t, r, "second") || t + " ms";
}
function h(t, e, r) {
if (!(t < e)) return t < 1.5 * e ? Math.floor(t / e) + " " + r : Math.ceil(t / e) + " " + r + "s";
}
}, function(t, e, r) {
(function(t, r) {
(function() {
var n = {
function: !0,
object: !0
}, o = n[typeof e] && e && !e.nodeType && e, i = n[typeof window] && window || this, s = o && n[typeof t] && t && !t.nodeType && "object" == typeof r && r;
!s || s.global !== s && s.window !== s && s.self !== s || (i = s);
function a(t, e) {
t || (t = i.Object());
e || (e = i.Object());
var r = t.Number || i.Number, o = t.String || i.String, s = t.Object || i.Object, c = t.Date || i.Date, u = t.SyntaxError || i.SyntaxError, h = t.TypeError || i.TypeError, p = t.Math || i.Math, f = t.JSON || i.JSON;
if ("object" == typeof f && f) {
e.stringify = f.stringify;
e.parse = f.parse;
}
var l, d, y, g = s.prototype, m = g.toString, v = new c(-0xc782b5b800cec);
try {
v = -109252 == v.getUTCFullYear() && 0 === v.getUTCMonth() && 1 === v.getUTCDate() && 10 == v.getUTCHours() && 37 == v.getUTCMinutes() && 6 == v.getUTCSeconds() && 708 == v.getUTCMilliseconds();
} catch (t) {}
function b(t) {
if (b[t] !== y) return b[t];
var n;
if ("bug-string-char-index" == t) n = "a" != "a"[0]; else if ("json" == t) n = b("json-stringify") && b("json-parse"); else {
var i, s = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
if ("json-stringify" == t) {
var a = e.stringify, u = "function" == typeof a && v;
if (u) {
(i = function() {
return 1;
}).toJSON = i;
try {
u = "0" === a(0) && "0" === a(new r()) && '""' == a(new o()) && a(m) === y && a(y) === y && a() === y && "1" === a(i) && "[1]" == a([ i ]) && "[null]" == a([ y ]) && "null" == a(null) && "[null,null,null]" == a([ y, m, null ]) && a({
a: [ i, !0, !1, null, "\0\b\n\f\r\t" ]
}) == s && "1" === a(null, i) && "[\n 1,\n 2\n]" == a([ 1, 2 ], null, 1) && '"-271821-04-20T00:00:00.000Z"' == a(new c(-864e13)) && '"+275760-09-13T00:00:00.000Z"' == a(new c(864e13)) && '"-000001-01-01T00:00:00.000Z"' == a(new c(-621987552e5)) && '"1969-12-31T23:59:59.999Z"' == a(new c(-1));
} catch (t) {
u = !1;
}
}
n = u;
}
if ("json-parse" == t) {
var h = e.parse;
if ("function" == typeof h) try {
if (0 === h("0") && !h(!1)) {
var p = 5 == (i = h(s)).a.length && 1 === i.a[0];
if (p) {
try {
p = !h('"\t"');
} catch (t) {}
if (p) try {
p = 1 !== h("01");
} catch (t) {}
if (p) try {
p = 1 !== h("1.");
} catch (t) {}
}
}
} catch (t) {
p = !1;
}
n = p;
}
}
return b[t] = !!n;
}
if (!b("json")) {
var w = b("bug-string-char-index");
if (!v) var k = p.floor, A = [ 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334 ], x = function(t, e) {
return A[e] + 365 * (t - 1970) + k((t - 1969 + (e = +(e > 1))) / 4) - k((t - 1901 + e) / 100) + k((t - 1601 + e) / 400);
};
(l = g.hasOwnProperty) || (l = function(t) {
var e, r = {};
if ((r.__proto__ = null, r.__proto__ = {
toString: 1
}, r).toString != m) l = function(t) {
var e = this.__proto__, r = t in (this.__proto__ = null, this);
this.__proto__ = e;
return r;
}; else {
e = r.constructor;
l = function(t) {
var r = (this.constructor || e).prototype;
return t in this && !(t in r && this[t] === r[t]);
};
}
r = null;
return l.call(this, t);
});
d = function(t, e) {
var r, o, i, s = 0;
(r = function() {
this.valueOf = 0;
}).prototype.valueOf = 0;
o = new r();
for (i in o) l.call(o, i) && s++;
r = o = null;
if (s) d = 2 == s ? function(t, e) {
var r, n = {}, o = "[object Function]" == m.call(t);
for (r in t) o && "prototype" == r || l.call(n, r) || !(n[r] = 1) || !l.call(t, r) || e(r);
} : function(t, e) {
var r, n, o = "[object Function]" == m.call(t);
for (r in t) o && "prototype" == r || !l.call(t, r) || (n = "constructor" === r) || e(r);
(n || l.call(t, r = "constructor")) && e(r);
}; else {
o = [ "valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor" ];
d = function(t, e) {
var r, i, s = "[object Function]" == m.call(t), a = !s && "function" != typeof t.constructor && n[typeof t.hasOwnProperty] && t.hasOwnProperty || l;
for (r in t) s && "prototype" == r || !a.call(t, r) || e(r);
for (i = o.length; r = o[--i]; a.call(t, r) && e(r)) ;
};
}
return d(t, e);
};
if (!b("json-stringify")) {
var C = {
92: "\\\\",
34: '\\"',
8: "\\b",
12: "\\f",
10: "\\n",
13: "\\r",
9: "\\t"
}, S = function(t, e) {
return ("000000" + (e || 0)).slice(-t);
}, B = function(t) {
for (var e = '"', r = 0, n = t.length, o = !w || n > 10, i = o && (w ? t.split("") : t); r < n; r++) {
var s = t.charCodeAt(r);
switch (s) {
case 8:
case 9:
case 10:
case 12:
case 13:
case 34:
case 92:
e += C[s];
break;

default:
if (s < 32) {
e += "\\u00" + S(2, s.toString(16));
break;
}
e += o ? i[r] : t.charAt(r);
}
}
return e + '"';
}, T = function(t, e, r, n, o, i, s) {
var a, c, u, p, f, g, v, b, w, A, C, E, j, N, _, O;
try {
a = e[t];
} catch (t) {}
if ("object" == typeof a && a) if ("[object Date]" != (c = m.call(a)) || l.call(a, "toJSON")) "function" == typeof a.toJSON && ("[object Number]" != c && "[object String]" != c && "[object Array]" != c || l.call(a, "toJSON")) && (a = a.toJSON(t)); else if (a > -1 / 0 && a < 1 / 0) {
if (x) {
f = k(a / 864e5);
for (u = k(f / 365.2425) + 1970 - 1; x(u + 1, 0) <= f; u++) ;
for (p = k((f - x(u, 0)) / 30.42); x(u, p + 1) <= f; p++) ;
f = 1 + f - x(u, p);
v = k((g = (a % 864e5 + 864e5) % 864e5) / 36e5) % 24;
b = k(g / 6e4) % 60;
w = k(g / 1e3) % 60;
A = g % 1e3;
} else {
u = a.getUTCFullYear();
p = a.getUTCMonth();
f = a.getUTCDate();
v = a.getUTCHours();
b = a.getUTCMinutes();
w = a.getUTCSeconds();
A = a.getUTCMilliseconds();
}
a = (u <= 0 || u >= 1e4 ? (u < 0 ? "-" : "+") + S(6, u < 0 ? -u : u) : S(4, u)) + "-" + S(2, p + 1) + "-" + S(2, f) + "T" + S(2, v) + ":" + S(2, b) + ":" + S(2, w) + "." + S(3, A) + "Z";
} else a = null;
r && (a = r.call(e, t, a));
if (null === a) return "null";
if ("[object Boolean]" == (c = m.call(a))) return "" + a;
if ("[object Number]" == c) return a > -1 / 0 && a < 1 / 0 ? "" + a : "null";
if ("[object String]" == c) return B("" + a);
if ("object" == typeof a) {
for (N = s.length; N--; ) if (s[N] === a) throw h();
s.push(a);
C = [];
_ = i;
i += o;
if ("[object Array]" == c) {
for (j = 0, N = a.length; j < N; j++) {
E = T(j, a, r, n, o, i, s);
C.push(E === y ? "null" : E);
}
O = C.length ? o ? "[\n" + i + C.join(",\n" + i) + "\n" + _ + "]" : "[" + C.join(",") + "]" : "[]";
} else {
d(n || a, function(t) {
var e = T(t, a, r, n, o, i, s);
e !== y && C.push(B(t) + ":" + (o ? " " : "") + e);
});
O = C.length ? o ? "{\n" + i + C.join(",\n" + i) + "\n" + _ + "}" : "{" + C.join(",") + "}" : "{}";
}
s.pop();
return O;
}
};
e.stringify = function(t, e, r) {
var o, i, s, a;
if (n[typeof e] && e) if ("[object Function]" == (a = m.call(e))) i = e; else if ("[object Array]" == a) {
s = {};
for (var c, u = 0, h = e.length; u < h; c = e[u++], ("[object String]" == (a = m.call(c)) || "[object Number]" == a) && (s[c] = 1)) ;
}
if (r) if ("[object Number]" == (a = m.call(r))) {
if ((r -= r % 1) > 0) for (o = "", r > 10 && (r = 10); o.length < r; o += " ") ;
} else "[object String]" == a && (o = r.length <= 10 ? r : r.slice(0, 10));
return T("", ((c = {})[""] = t, c), i, s, o, "", []);
};
}
if (!b("json-parse")) {
var E, j, N = o.fromCharCode, _ = {
92: "\\",
34: '"',
47: "/",
98: "\b",
116: "\t",
110: "\n",
102: "\f",
114: "\r"
}, O = function() {
E = j = null;
throw u();
}, P = function() {
for (var t, e, r, n, o, i = j, s = i.length; E < s; ) switch (o = i.charCodeAt(E)) {
case 9:
case 10:
case 13:
case 32:
E++;
break;

case 123:
case 125:
case 91:
case 93:
case 58:
case 44:
t = w ? i.charAt(E) : i[E];
E++;
return t;

case 34:
for (t = "@", E++; E < s; ) if ((o = i.charCodeAt(E)) < 32) O(); else if (92 == o) switch (o = i.charCodeAt(++E)) {
case 92:
case 34:
case 47:
case 98:
case 116:
case 110:
case 102:
case 114:
t += _[o];
E++;
break;

case 117:
e = ++E;
for (r = E + 4; E < r; E++) (o = i.charCodeAt(E)) >= 48 && o <= 57 || o >= 97 && o <= 102 || o >= 65 && o <= 70 || O();
t += N("0x" + i.slice(e, E));
break;

default:
O();
} else {
if (34 == o) break;
o = i.charCodeAt(E);
e = E;
for (;o >= 32 && 92 != o && 34 != o; ) o = i.charCodeAt(++E);
t += i.slice(e, E);
}
if (34 == i.charCodeAt(E)) {
E++;
return t;
}
O();

default:
e = E;
if (45 == o) {
n = !0;
o = i.charCodeAt(++E);
}
if (o >= 48 && o <= 57) {
48 == o && ((o = i.charCodeAt(E + 1)) >= 48 && o <= 57) && O();
n = !1;
for (;E < s && ((o = i.charCodeAt(E)) >= 48 && o <= 57); E++) ;
if (46 == i.charCodeAt(E)) {
r = ++E;
for (;r < s && ((o = i.charCodeAt(r)) >= 48 && o <= 57); r++) ;
r == E && O();
E = r;
}
if (101 == (o = i.charCodeAt(E)) || 69 == o) {
43 != (o = i.charCodeAt(++E)) && 45 != o || E++;
for (r = E; r < s && ((o = i.charCodeAt(r)) >= 48 && o <= 57); r++) ;
r == E && O();
E = r;
}
return +i.slice(e, E);
}
n && O();
if ("true" == i.slice(E, E + 4)) {
E += 4;
return !0;
}
if ("false" == i.slice(E, E + 5)) {
E += 5;
return !1;
}
if ("null" == i.slice(E, E + 4)) {
E += 4;
return null;
}
O();
}
return "$";
}, R = function(t) {
var e, r;
"$" == t && O();
if ("string" == typeof t) {
if ("@" == (w ? t.charAt(0) : t[0])) return t.slice(1);
if ("[" == t) {
e = [];
for (;"]" != (t = P()); r || (r = !0)) {
r && ("," == t ? "]" == (t = P()) && O() : O());
"," == t && O();
e.push(R(t));
}
return e;
}
if ("{" == t) {
e = {};
for (;"}" != (t = P()); r || (r = !0)) {
r && ("," == t ? "}" == (t = P()) && O() : O());
"," != t && "string" == typeof t && "@" == (w ? t.charAt(0) : t[0]) && ":" == P() || O();
e[t.slice(1)] = R(P());
}
return e;
}
O();
}
return t;
}, D = function(t, e, r) {
var n = q(t, e, r);
n === y ? delete t[e] : t[e] = n;
}, q = function(t, e, r) {
var n, o = t[e];
if ("object" == typeof o && o) if ("[object Array]" == m.call(o)) for (n = o.length; n--; ) D(o, n, r); else d(o, function(t) {
D(o, t, r);
});
return r.call(t, e, o);
};
e.parse = function(t, e) {
var r, n;
E = 0;
j = "" + t;
r = R(P());
"$" != P() && O();
E = j = null;
return e && "[object Function]" == m.call(e) ? q(((n = {})[""] = r, n), "", e) : r;
};
}
}
e.runInContext = a;
return e;
}
if (o) a(i, o); else {
var c = i.JSON, u = i.JSON3, h = !1, p = a(i, i.JSON3 = {
noConflict: function() {
if (!h) {
h = !0;
i.JSON = c;
i.JSON3 = u;
c = u = null;
}
return p;
}
});
i.JSON = {
parse: p.parse,
stringify: p.stringify
};
}
0;
}).call(this);
}).call(e, r(12)(t), function() {
return this;
}());
}, function(t, e) {
t.exports = function(t) {
if (!t.webpackPolyfill) {
t.deprecate = function() {};
t.paths = [];
t.children = [];
t.webpackPolyfill = 1;
}
return t;
};
}, function(t, e) {
t.exports = r;
function r(t) {
if (t) return n(t);
}
function n(t) {
for (var e in r.prototype) t[e] = r.prototype[e];
return t;
}
r.prototype.on = r.prototype.addEventListener = function(t, e) {
this._callbacks = this._callbacks || {};
(this._callbacks[t] = this._callbacks[t] || []).push(e);
return this;
};
r.prototype.once = function(t, e) {
var r = this;
this._callbacks = this._callbacks || {};
function n() {
r.off(t, n);
e.apply(this, arguments);
}
n.fn = e;
this.on(t, n);
return this;
};
r.prototype.off = r.prototype.removeListener = r.prototype.removeAllListeners = r.prototype.removeEventListener = function(t, e) {
this._callbacks = this._callbacks || {};
if (0 == arguments.length) {
this._callbacks = {};
return this;
}
var r, n = this._callbacks[t];
if (!n) return this;
if (1 == arguments.length) {
delete this._callbacks[t];
return this;
}
for (var o = 0; o < n.length; o++) if ((r = n[o]) === e || r.fn === e) {
n.splice(o, 1);
break;
}
return this;
};
r.prototype.emit = function(t) {
this._callbacks = this._callbacks || {};
var e = [].slice.call(arguments, 1), r = this._callbacks[t];
if (r) for (var n = 0, o = (r = r.slice(0)).length; n < o; ++n) r[n].apply(this, e);
return this;
};
r.prototype.listeners = function(t) {
this._callbacks = this._callbacks || {};
return this._callbacks[t] || [];
};
r.prototype.hasListeners = function(t) {
return !!this.listeners(t).length;
};
}, function(t, e, r) {
(function(t) {
var n = r(15), o = r(16);
e.deconstructPacket = function(t) {
var e = [], r = t.data;
var i = t;
i.data = function t(r) {
if (!r) return r;
if (o(r)) {
var i = {
_placeholder: !0,
num: e.length
};
e.push(r);
return i;
}
if (n(r)) {
for (var s = new Array(r.length), a = 0; a < r.length; a++) s[a] = t(r[a]);
return s;
}
if ("object" == typeof r && !(r instanceof Date)) {
s = {};
for (var c in r) s[c] = t(r[c]);
return s;
}
return r;
}(r);
i.attachments = e.length;
return {
packet: i,
buffers: e
};
};
e.reconstructPacket = function(t, e) {
t.data = function t(r) {
if (r && r._placeholder) return e[r.num];
if (n(r)) {
for (var o = 0; o < r.length; o++) r[o] = t(r[o]);
return r;
}
if (r && "object" == typeof r) {
for (var i in r) r[i] = t(r[i]);
return r;
}
return r;
}(t.data);
t.attachments = void 0;
return t;
};
e.removeBlobs = function(e, r) {
var i = 0, s = e;
(function e(a, c, u) {
if (!a) return a;
if (t.Blob && a instanceof Blob || t.File && a instanceof File) {
i++;
var h = new FileReader();
h.onload = function() {
u ? u[c] = this.result : s = this.result;
--i || r(s);
};
h.readAsArrayBuffer(a);
} else if (n(a)) for (var p = 0; p < a.length; p++) e(a[p], p, a); else if (a && "object" == typeof a && !o(a)) for (var f in a) e(a[f], f, a);
})(s);
i || r(s);
};
}).call(e, function() {
return this;
}());
}, function(t, e) {
t.exports = Array.isArray || function(t) {
return "[object Array]" == Object.prototype.toString.call(t);
};
}, function(t, e) {
(function(e) {
t.exports = function(t) {
return e.Buffer && e.Buffer.isBuffer(t) || e.ArrayBuffer && t instanceof ArrayBuffer;
};
}).call(e, function() {
return this;
}());
}, function(t, e, r) {
"use strict";
var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
return typeof t;
} : function(t) {
return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, o = r(18), i = r(44), s = r(35), a = r(7), c = r(46), u = r(47), h = r(3)("socket.io-client:manager"), p = r(42), f = r(48), l = Object.prototype.hasOwnProperty;
t.exports = d;
function d(t, e) {
if (!(this instanceof d)) return new d(t, e);
if (t && "object" === ("undefined" == typeof t ? "undefined" : n(t))) {
e = t;
t = void 0;
}
(e = e || {}).path = e.path || "/socket.io";
this.nsps = {};
this.subs = [];
this.opts = e;
this.reconnection(!1 !== e.reconnection);
this.reconnectionAttempts(e.reconnectionAttempts || Infinity);
this.reconnectionDelay(e.reconnectionDelay || 1e3);
this.reconnectionDelayMax(e.reconnectionDelayMax || 5e3);
this.randomizationFactor(e.randomizationFactor || .5);
this.backoff = new f({
min: this.reconnectionDelay(),
max: this.reconnectionDelayMax(),
jitter: this.randomizationFactor()
});
this.timeout(null == e.timeout ? 2e4 : e.timeout);
this.readyState = "closed";
this.uri = t;
this.connecting = [];
this.lastPing = null;
this.encoding = !1;
this.packetBuffer = [];
this.encoder = new a.Encoder();
this.decoder = new a.Decoder();
this.autoConnect = !1 !== e.autoConnect;
this.autoConnect && this.open();
}
d.prototype.emitAll = function() {
this.emit.apply(this, arguments);
for (var t in this.nsps) l.call(this.nsps, t) && this.nsps[t].emit.apply(this.nsps[t], arguments);
};
d.prototype.updateSocketIds = function() {
for (var t in this.nsps) l.call(this.nsps, t) && (this.nsps[t].id = this.engine.id);
};
s(d.prototype);
d.prototype.reconnection = function(t) {
if (!arguments.length) return this._reconnection;
this._reconnection = !!t;
return this;
};
d.prototype.reconnectionAttempts = function(t) {
if (!arguments.length) return this._reconnectionAttempts;
this._reconnectionAttempts = t;
return this;
};
d.prototype.reconnectionDelay = function(t) {
if (!arguments.length) return this._reconnectionDelay;
this._reconnectionDelay = t;
this.backoff && this.backoff.setMin(t);
return this;
};
d.prototype.randomizationFactor = function(t) {
if (!arguments.length) return this._randomizationFactor;
this._randomizationFactor = t;
this.backoff && this.backoff.setJitter(t);
return this;
};
d.prototype.reconnectionDelayMax = function(t) {
if (!arguments.length) return this._reconnectionDelayMax;
this._reconnectionDelayMax = t;
this.backoff && this.backoff.setMax(t);
return this;
};
d.prototype.timeout = function(t) {
if (!arguments.length) return this._timeout;
this._timeout = t;
return this;
};
d.prototype.maybeReconnectOnOpen = function() {
!this.reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect();
};
d.prototype.open = d.prototype.connect = function(t, e) {
h("readyState %s", this.readyState);
if (~this.readyState.indexOf("open")) return this;
h("opening %s", this.uri);
this.engine = o(this.uri, this.opts);
var r = this.engine, n = this;
this.readyState = "opening";
this.skipReconnect = !1;
var i = c(r, "open", function() {
n.onopen();
t && t();
}), s = c(r, "error", function(e) {
h("connect_error");
n.cleanup();
n.readyState = "closed";
n.emitAll("connect_error", e);
if (t) {
var r = new Error("Connection error");
r.data = e;
t(r);
} else n.maybeReconnectOnOpen();
});
if (!1 !== this._timeout) {
var a = this._timeout;
h("connect attempt will timeout after %d", a);
var u = setTimeout(function() {
h("connect attempt timed out after %d", a);
i.destroy();
r.close();
r.emit("error", "timeout");
n.emitAll("connect_timeout", a);
}, a);
this.subs.push({
destroy: function() {
clearTimeout(u);
}
});
}
this.subs.push(i);
this.subs.push(s);
return this;
};
d.prototype.onopen = function() {
h("open");
this.cleanup();
this.readyState = "open";
this.emit("open");
var t = this.engine;
this.subs.push(c(t, "data", u(this, "ondata")));
this.subs.push(c(t, "ping", u(this, "onping")));
this.subs.push(c(t, "pong", u(this, "onpong")));
this.subs.push(c(t, "error", u(this, "onerror")));
this.subs.push(c(t, "close", u(this, "onclose")));
this.subs.push(c(this.decoder, "decoded", u(this, "ondecoded")));
};
d.prototype.onping = function() {
this.lastPing = new Date();
this.emitAll("ping");
};
d.prototype.onpong = function() {
this.emitAll("pong", new Date() - this.lastPing);
};
d.prototype.ondata = function(t) {
this.decoder.add(t);
};
d.prototype.ondecoded = function(t) {
this.emit("packet", t);
};
d.prototype.onerror = function(t) {
h("error", t);
this.emitAll("error", t);
};
d.prototype.socket = function(t, e) {
var r = this.nsps[t];
if (!r) {
r = new i(this, t, e);
this.nsps[t] = r;
var n = this;
r.on("connecting", o);
r.on("connect", function() {
r.id = n.engine.id;
});
this.autoConnect && o();
}
function o() {
~p(n.connecting, r) || n.connecting.push(r);
}
return r;
};
d.prototype.destroy = function(t) {
var e = p(this.connecting, t);
~e && this.connecting.splice(e, 1);
this.connecting.length || this.close();
};
d.prototype.packet = function(t) {
h("writing packet %j", t);
var e = this;
t.query && 0 === t.type && (t.nsp += "?" + t.query);
if (e.encoding) e.packetBuffer.push(t); else {
e.encoding = !0;
this.encoder.encode(t, function(r) {
for (var n = 0; n < r.length; n++) e.engine.write(r[n], t.options);
e.encoding = !1;
e.processPacketQueue();
});
}
};
d.prototype.processPacketQueue = function() {
if (this.packetBuffer.length > 0 && !this.encoding) {
var t = this.packetBuffer.shift();
this.packet(t);
}
};
d.prototype.cleanup = function() {
h("cleanup");
for (var t = this.subs.length, e = 0; e < t; e++) {
this.subs.shift().destroy();
}
this.packetBuffer = [];
this.encoding = !1;
this.lastPing = null;
this.decoder.destroy();
};
d.prototype.close = d.prototype.disconnect = function() {
h("disconnect");
this.skipReconnect = !0;
this.reconnecting = !1;
"opening" === this.readyState && this.cleanup();
this.backoff.reset();
this.readyState = "closed";
this.engine && this.engine.close();
};
d.prototype.onclose = function(t) {
h("onclose");
this.cleanup();
this.backoff.reset();
this.readyState = "closed";
this.emit("close", t);
this._reconnection && !this.skipReconnect && this.reconnect();
};
d.prototype.reconnect = function() {
if (this.reconnecting || this.skipReconnect) return this;
var t = this;
if (this.backoff.attempts >= this._reconnectionAttempts) {
h("reconnect failed");
this.backoff.reset();
this.emitAll("reconnect_failed");
this.reconnecting = !1;
} else {
var e = this.backoff.duration();
h("will wait %dms before reconnect attempt", e);
this.reconnecting = !0;
var r = setTimeout(function() {
if (!t.skipReconnect) {
h("attempting reconnect");
t.emitAll("reconnect_attempt", t.backoff.attempts);
t.emitAll("reconnecting", t.backoff.attempts);
t.skipReconnect || t.open(function(e) {
if (e) {
h("reconnect attempt error");
t.reconnecting = !1;
t.reconnect();
t.emitAll("reconnect_error", e.data);
} else {
h("reconnect success");
t.onreconnect();
}
});
}
}, e);
this.subs.push({
destroy: function() {
clearTimeout(r);
}
});
}
};
d.prototype.onreconnect = function() {
var t = this.backoff.attempts;
this.reconnecting = !1;
this.backoff.reset();
this.updateSocketIds();
this.emitAll("reconnect", t);
};
}, function(t, e, r) {
t.exports = r(19);
}, function(t, e, r) {
t.exports = r(20);
t.exports.parser = r(27);
}, function(t, e, r) {
(function(e) {
var n = r(21), o = r(35), i = r(3)("engine.io-client:socket"), s = r(42), a = r(27), c = r(2), u = r(43), h = r(36);
t.exports = p;
function p(t, r) {
if (!(this instanceof p)) return new p(t, r);
r = r || {};
if (t && "object" == typeof t) {
r = t;
t = null;
}
if (t) {
t = c(t);
r.hostname = t.host;
r.secure = "https" === t.protocol || "wss" === t.protocol;
r.port = t.port;
t.query && (r.query = t.query);
} else r.host && (r.hostname = c(r.host).host);
this.secure = null != r.secure ? r.secure : e.location && "https:" === location.protocol;
r.hostname && !r.port && (r.port = this.secure ? "443" : "80");
this.agent = r.agent || !1;
this.hostname = r.hostname || (e.location ? location.hostname : "localhost");
this.port = r.port || (e.location && location.port ? location.port : this.secure ? 443 : 80);
this.query = r.query || {};
"string" == typeof this.query && (this.query = h.decode(this.query));
this.upgrade = !1 !== r.upgrade;
this.path = (r.path || "/engine.io").replace(/\/$/, "") + "/";
this.forceJSONP = !!r.forceJSONP;
this.jsonp = !1 !== r.jsonp;
this.forceBase64 = !!r.forceBase64;
this.enablesXDR = !!r.enablesXDR;
this.timestampParam = r.timestampParam || "t";
this.timestampRequests = r.timestampRequests;
this.transports = r.transports || [ "polling", "websocket" ];
this.readyState = "";
this.writeBuffer = [];
this.prevBufferLen = 0;
this.policyPort = r.policyPort || 843;
this.rememberUpgrade = r.rememberUpgrade || !1;
this.binaryType = null;
this.onlyBinaryUpgrades = r.onlyBinaryUpgrades;
this.perMessageDeflate = !1 !== r.perMessageDeflate && (r.perMessageDeflate || {});
!0 === this.perMessageDeflate && (this.perMessageDeflate = {});
this.perMessageDeflate && null == this.perMessageDeflate.threshold && (this.perMessageDeflate.threshold = 1024);
this.pfx = r.pfx || null;
this.key = r.key || null;
this.passphrase = r.passphrase || null;
this.cert = r.cert || null;
this.ca = r.ca || null;
this.ciphers = r.ciphers || null;
this.rejectUnauthorized = void 0 === r.rejectUnauthorized ? null : r.rejectUnauthorized;
this.forceNode = !!r.forceNode;
var n = "object" == typeof e && e;
if (n.global === n) {
r.extraHeaders && Object.keys(r.extraHeaders).length > 0 && (this.extraHeaders = r.extraHeaders);
r.localAddress && (this.localAddress = r.localAddress);
}
this.id = null;
this.upgrades = null;
this.pingInterval = null;
this.pingTimeout = null;
this.pingIntervalTimer = null;
this.pingTimeoutTimer = null;
this.open();
}
p.priorWebsocketSuccess = !1;
o(p.prototype);
p.protocol = a.protocol;
p.Socket = p;
p.Transport = r(26);
p.transports = r(21);
p.parser = r(27);
p.prototype.createTransport = function(t) {
i('creating transport "%s"', t);
var e = f(this.query);
e.EIO = a.protocol;
e.transport = t;
this.id && (e.sid = this.id);
return new n[t]({
agent: this.agent,
hostname: this.hostname,
port: this.port,
secure: this.secure,
path: this.path,
query: e,
forceJSONP: this.forceJSONP,
jsonp: this.jsonp,
forceBase64: this.forceBase64,
enablesXDR: this.enablesXDR,
timestampRequests: this.timestampRequests,
timestampParam: this.timestampParam,
policyPort: this.policyPort,
socket: this,
pfx: this.pfx,
key: this.key,
passphrase: this.passphrase,
cert: this.cert,
ca: this.ca,
ciphers: this.ciphers,
rejectUnauthorized: this.rejectUnauthorized,
perMessageDeflate: this.perMessageDeflate,
extraHeaders: this.extraHeaders,
forceNode: this.forceNode,
localAddress: this.localAddress
});
};
function f(t) {
var e = {};
for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
return e;
}
p.prototype.open = function() {
var t;
if (this.rememberUpgrade && p.priorWebsocketSuccess && -1 !== this.transports.indexOf("websocket")) t = "websocket"; else {
if (0 === this.transports.length) {
var e = this;
setTimeout(function() {
e.emit("error", "No transports available");
}, 0);
return;
}
t = this.transports[0];
}
this.readyState = "opening";
try {
t = this.createTransport(t);
} catch (t) {
this.transports.shift();
this.open();
return;
}
t.open();
this.setTransport(t);
};
p.prototype.setTransport = function(t) {
i("setting transport %s", t.name);
var e = this;
if (this.transport) {
i("clearing existing transport %s", this.transport.name);
this.transport.removeAllListeners();
}
this.transport = t;
t.on("drain", function() {
e.onDrain();
}).on("packet", function(t) {
e.onPacket(t);
}).on("error", function(t) {
e.onError(t);
}).on("close", function() {
e.onClose("transport close");
});
};
p.prototype.probe = function(t) {
i('probing transport "%s"', t);
var e = this.createTransport(t, {
probe: 1
}), r = !1, n = this;
p.priorWebsocketSuccess = !1;
function o() {
if (n.onlyBinaryUpgrades) {
var o = !this.supportsBinary && n.transport.supportsBinary;
r = r || o;
}
if (!r) {
i('probe transport "%s" opened', t);
e.send([ {
type: "ping",
data: "probe"
} ]);
e.once("packet", function(o) {
if (!r) if ("pong" === o.type && "probe" === o.data) {
i('probe transport "%s" pong', t);
n.upgrading = !0;
n.emit("upgrading", e);
if (!e) return;
p.priorWebsocketSuccess = "websocket" === e.name;
i('pausing current transport "%s"', n.transport.name);
n.transport.pause(function() {
if (!r && "closed" !== n.readyState) {
i("changing transport and sending upgrade packet");
f();
n.setTransport(e);
e.send([ {
type: "upgrade"
} ]);
n.emit("upgrade", e);
e = null;
n.upgrading = !1;
n.flush();
}
});
} else {
i('probe transport "%s" failed', t);
var s = new Error("probe error");
s.transport = e.name;
n.emit("upgradeError", s);
}
});
}
}
function s() {
if (!r) {
r = !0;
f();
e.close();
e = null;
}
}
function a(r) {
var o = new Error("probe error: " + r);
o.transport = e.name;
s();
i('probe transport "%s" failed because of error: %s', t, r);
n.emit("upgradeError", o);
}
function c() {
a("transport closed");
}
function u() {
a("socket closed");
}
function h(t) {
if (e && t.name !== e.name) {
i('"%s" works - aborting "%s"', t.name, e.name);
s();
}
}
function f() {
e.removeListener("open", o);
e.removeListener("error", a);
e.removeListener("close", c);
n.removeListener("close", u);
n.removeListener("upgrading", h);
}
e.once("open", o);
e.once("error", a);
e.once("close", c);
this.once("close", u);
this.once("upgrading", h);
e.open();
};
p.prototype.onOpen = function() {
i("socket open");
this.readyState = "open";
p.priorWebsocketSuccess = "websocket" === this.transport.name;
this.emit("open");
this.flush();
if ("open" === this.readyState && this.upgrade && this.transport.pause) {
i("starting upgrade probes");
for (var t = 0, e = this.upgrades.length; t < e; t++) this.probe(this.upgrades[t]);
}
};
p.prototype.onPacket = function(t) {
if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
i('socket receive: type "%s", data "%s"', t.type, t.data);
this.emit("packet", t);
this.emit("heartbeat");
switch (t.type) {
case "open":
this.onHandshake(u(t.data));
break;

case "pong":
this.setPing();
this.emit("pong");
break;

case "error":
var e = new Error("server error");
e.code = t.data;
this.onError(e);
break;

case "message":
this.emit("data", t.data);
this.emit("message", t.data);
}
} else i('packet received with socket readyState "%s"', this.readyState);
};
p.prototype.onHandshake = function(t) {
this.emit("handshake", t);
this.id = t.sid;
this.transport.query.sid = t.sid;
this.upgrades = this.filterUpgrades(t.upgrades);
this.pingInterval = t.pingInterval;
this.pingTimeout = t.pingTimeout;
this.onOpen();
if ("closed" !== this.readyState) {
this.setPing();
this.removeListener("heartbeat", this.onHeartbeat);
this.on("heartbeat", this.onHeartbeat);
}
};
p.prototype.onHeartbeat = function(t) {
clearTimeout(this.pingTimeoutTimer);
var e = this;
e.pingTimeoutTimer = setTimeout(function() {
"closed" !== e.readyState && e.onClose("ping timeout");
}, t || e.pingInterval + e.pingTimeout);
};
p.prototype.setPing = function() {
var t = this;
clearTimeout(t.pingIntervalTimer);
t.pingIntervalTimer = setTimeout(function() {
i("writing ping packet - expecting pong within %sms", t.pingTimeout);
t.ping();
t.onHeartbeat(t.pingTimeout);
}, t.pingInterval);
};
p.prototype.ping = function() {
var t = this;
this.sendPacket("ping", function() {
t.emit("ping");
});
};
p.prototype.onDrain = function() {
this.writeBuffer.splice(0, this.prevBufferLen);
this.prevBufferLen = 0;
0 === this.writeBuffer.length ? this.emit("drain") : this.flush();
};
p.prototype.flush = function() {
if ("closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
i("flushing %d packets in socket", this.writeBuffer.length);
this.transport.send(this.writeBuffer);
this.prevBufferLen = this.writeBuffer.length;
this.emit("flush");
}
};
p.prototype.write = p.prototype.send = function(t, e, r) {
this.sendPacket("message", t, e, r);
return this;
};
p.prototype.sendPacket = function(t, e, r, n) {
if ("function" == typeof e) {
n = e;
e = void 0;
}
if ("function" == typeof r) {
n = r;
r = null;
}
if ("closing" !== this.readyState && "closed" !== this.readyState) {
(r = r || {}).compress = !1 !== r.compress;
var o = {
type: t,
data: e,
options: r
};
this.emit("packetCreate", o);
this.writeBuffer.push(o);
n && this.once("flush", n);
this.flush();
}
};
p.prototype.close = function() {
if ("opening" === this.readyState || "open" === this.readyState) {
this.readyState = "closing";
var t = this;
this.writeBuffer.length ? this.once("drain", function() {
this.upgrading ? n() : e();
}) : this.upgrading ? n() : e();
}
function e() {
t.onClose("forced close");
i("socket closing - telling transport to close");
t.transport.close();
}
function r() {
t.removeListener("upgrade", r);
t.removeListener("upgradeError", r);
e();
}
function n() {
t.once("upgrade", r);
t.once("upgradeError", r);
}
return this;
};
p.prototype.onError = function(t) {
i("socket error %j", t);
p.priorWebsocketSuccess = !1;
this.emit("error", t);
this.onClose("transport error", t);
};
p.prototype.onClose = function(t, e) {
if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
i('socket close with reason: "%s"', t);
clearTimeout(this.pingIntervalTimer);
clearTimeout(this.pingTimeoutTimer);
this.transport.removeAllListeners("close");
this.transport.close();
this.transport.removeAllListeners();
this.readyState = "closed";
this.id = null;
this.emit("close", t, e);
this.writeBuffer = [];
this.prevBufferLen = 0;
}
};
p.prototype.filterUpgrades = function(t) {
for (var e = [], r = 0, n = t.length; r < n; r++) ~s(this.transports, t[r]) && e.push(t[r]);
return e;
};
}).call(e, function() {
return this;
}());
}, function(t, e, r) {
(function(t) {
var n = r(22), o = r(24), i = r(39), s = r(40);
e.polling = function(e) {
var r = !1, s = !1, a = !1 !== e.jsonp;
if (t.location) {
var c = "https:" === location.protocol, u = location.port;
u || (u = c ? 443 : 80);
r = e.hostname !== location.hostname || u !== e.port;
s = e.secure !== c;
}
e.xdomain = r;
e.xscheme = s;
if ("open" in new n(e) && !e.forceJSONP) return new o(e);
if (!a) throw new Error("JSONP disabled");
return new i(e);
};
e.websocket = s;
}).call(e, function() {
return this;
}());
}, function(t, e, r) {
(function(e) {
var n = r(23);
t.exports = function(t) {
var r = t.xdomain, o = t.xscheme, i = t.enablesXDR;
try {
if ("undefined" != typeof XMLHttpRequest && (!r || n)) return new XMLHttpRequest();
} catch (t) {}
try {
if ("undefined" != typeof XDomainRequest && !o && i) return new XDomainRequest();
} catch (t) {}
if (!r) try {
return new (e[[ "Active" ].concat("Object").join("X")])("Microsoft.XMLHTTP");
} catch (t) {}
};
}).call(e, function() {
return this;
}());
}, function(t, e) {
try {
t.exports = "undefined" != typeof XMLHttpRequest && "withCredentials" in new XMLHttpRequest();
} catch (e) {
t.exports = !1;
}
}, function(t, e, r) {
(function(e) {
var n = r(22), o = r(25), i = r(35), s = r(37), a = r(3)("engine.io-client:polling-xhr");
t.exports = u;
t.exports.Request = h;
function c() {}
function u(t) {
o.call(this, t);
this.requestTimeout = t.requestTimeout;
if (e.location) {
var r = "https:" === location.protocol, n = location.port;
n || (n = r ? 443 : 80);
this.xd = t.hostname !== e.location.hostname || n !== t.port;
this.xs = t.secure !== r;
} else this.extraHeaders = t.extraHeaders;
}
s(u, o);
u.prototype.supportsBinary = !0;
u.prototype.request = function(t) {
(t = t || {}).uri = this.uri();
t.xd = this.xd;
t.xs = this.xs;
t.agent = this.agent || !1;
t.supportsBinary = this.supportsBinary;
t.enablesXDR = this.enablesXDR;
t.pfx = this.pfx;
t.key = this.key;
t.passphrase = this.passphrase;
t.cert = this.cert;
t.ca = this.ca;
t.ciphers = this.ciphers;
t.rejectUnauthorized = this.rejectUnauthorized;
t.requestTimeout = this.requestTimeout;
t.extraHeaders = this.extraHeaders;
return new h(t);
};
u.prototype.doWrite = function(t, e) {
var r = "string" != typeof t && void 0 !== t, n = this.request({
method: "POST",
data: t,
isBinary: r
}), o = this;
n.on("success", e);
n.on("error", function(t) {
o.onError("xhr post error", t);
});
this.sendXhr = n;
};
u.prototype.doPoll = function() {
a("xhr poll");
var t = this.request(), e = this;
t.on("data", function(t) {
e.onData(t);
});
t.on("error", function(t) {
e.onError("xhr poll error", t);
});
this.pollXhr = t;
};
function h(t) {
this.method = t.method || "GET";
this.uri = t.uri;
this.xd = !!t.xd;
this.xs = !!t.xs;
this.async = !1 !== t.async;
this.data = void 0 !== t.data ? t.data : null;
this.agent = t.agent;
this.isBinary = t.isBinary;
this.supportsBinary = t.supportsBinary;
this.enablesXDR = t.enablesXDR;
this.requestTimeout = t.requestTimeout;
this.pfx = t.pfx;
this.key = t.key;
this.passphrase = t.passphrase;
this.cert = t.cert;
this.ca = t.ca;
this.ciphers = t.ciphers;
this.rejectUnauthorized = t.rejectUnauthorized;
this.extraHeaders = t.extraHeaders;
this.create();
}
i(h.prototype);
h.prototype.create = function() {
var t = {
agent: this.agent,
xdomain: this.xd,
xscheme: this.xs,
enablesXDR: this.enablesXDR
};
t.pfx = this.pfx;
t.key = this.key;
t.passphrase = this.passphrase;
t.cert = this.cert;
t.ca = this.ca;
t.ciphers = this.ciphers;
t.rejectUnauthorized = this.rejectUnauthorized;
var r = this.xhr = new n(t), o = this;
try {
a("xhr open %s: %s", this.method, this.uri);
r.open(this.method, this.uri, this.async);
try {
if (this.extraHeaders) {
r.setDisableHeaderCheck(!0);
for (var i in this.extraHeaders) this.extraHeaders.hasOwnProperty(i) && r.setRequestHeader(i, this.extraHeaders[i]);
}
} catch (t) {}
this.supportsBinary && (r.responseType = "arraybuffer");
if ("POST" === this.method) try {
this.isBinary ? r.setRequestHeader("Content-type", "application/octet-stream") : r.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
} catch (t) {}
try {
r.setRequestHeader("Accept", "*/*");
} catch (t) {}
"withCredentials" in r && (r.withCredentials = !0);
this.requestTimeout && (r.timeout = this.requestTimeout);
if (this.hasXDR()) {
r.onload = function() {
o.onLoad();
};
r.onerror = function() {
o.onError(r.responseText);
};
} else r.onreadystatechange = function() {
4 === r.readyState && (200 === r.status || 1223 === r.status ? o.onLoad() : setTimeout(function() {
o.onError(r.status);
}, 0));
};
a("xhr data %s", this.data);
r.send(this.data);
} catch (t) {
setTimeout(function() {
o.onError(t);
}, 0);
return;
}
if (e.document) {
this.index = h.requestsCount++;
h.requests[this.index] = this;
}
};
h.prototype.onSuccess = function() {
this.emit("success");
this.cleanup();
};
h.prototype.onData = function(t) {
this.emit("data", t);
this.onSuccess();
};
h.prototype.onError = function(t) {
this.emit("error", t);
this.cleanup(!0);
};
h.prototype.cleanup = function(t) {
if ("undefined" != typeof this.xhr && null !== this.xhr) {
this.hasXDR() ? this.xhr.onload = this.xhr.onerror = c : this.xhr.onreadystatechange = c;
if (t) try {
this.xhr.abort();
} catch (t) {}
e.document && delete h.requests[this.index];
this.xhr = null;
}
};
h.prototype.onLoad = function() {
var t;
try {
var e;
try {
e = this.xhr.getResponseHeader("Content-Type").split(";")[0];
} catch (t) {}
if ("application/octet-stream" === e) t = this.xhr.response || this.xhr.responseText; else if (this.supportsBinary) try {
t = String.fromCharCode.apply(null, new Uint8Array(this.xhr.response));
} catch (e) {
for (var r = new Uint8Array(this.xhr.response), n = [], o = 0, i = r.length; o < i; o++) n.push(r[o]);
t = String.fromCharCode.apply(null, n);
} else t = this.xhr.responseText;
} catch (t) {
this.onError(t);
}
null != t && this.onData(t);
};
h.prototype.hasXDR = function() {
return "undefined" != typeof e.XDomainRequest && !this.xs && this.enablesXDR;
};
h.prototype.abort = function() {
this.cleanup();
};
h.requestsCount = 0;
h.requests = {};
e.document && (e.attachEvent ? e.attachEvent("onunload", p) : e.addEventListener && e.addEventListener("beforeunload", p, !1));
function p() {
for (var t in h.requests) h.requests.hasOwnProperty(t) && h.requests[t].abort();
}
}).call(e, function() {
return this;
}());
}, function(t, e, r) {
var n = r(26), o = r(36), i = r(27), s = r(37), a = r(38), c = r(3)("engine.io-client:polling");
t.exports = h;
var u = null != new (r(22))({
xdomain: !1
}).responseType;
function h(t) {
var e = t && t.forceBase64;
u && !e || (this.supportsBinary = !1);
n.call(this, t);
}
s(h, n);
h.prototype.name = "polling";
h.prototype.doOpen = function() {
this.poll();
};
h.prototype.pause = function(t) {
var e = this;
this.readyState = "pausing";
function r() {
c("paused");
e.readyState = "paused";
t();
}
if (this.polling || !this.writable) {
var n = 0;
if (this.polling) {
c("we are currently polling - waiting to pause");
n++;
this.once("pollComplete", function() {
c("pre-pause polling complete");
--n || r();
});
}
if (!this.writable) {
c("we are currently writing - waiting to pause");
n++;
this.once("drain", function() {
c("pre-pause writing complete");
--n || r();
});
}
} else r();
};
h.prototype.poll = function() {
c("polling");
this.polling = !0;
this.doPoll();
this.emit("poll");
};
h.prototype.onData = function(t) {
var e = this;
c("polling got data %s", t);
i.decodePayload(t, this.socket.binaryType, function(t, r, n) {
"opening" === e.readyState && e.onOpen();
if ("close" === t.type) {
e.onClose();
return !1;
}
e.onPacket(t);
});
if ("closed" !== this.readyState) {
this.polling = !1;
this.emit("pollComplete");
"open" === this.readyState ? this.poll() : c('ignoring poll - transport state "%s"', this.readyState);
}
};
h.prototype.doClose = function() {
var t = this;
function e() {
c("writing close packet");
t.write([ {
type: "close"
} ]);
}
if ("open" === this.readyState) {
c("transport open - closing");
e();
} else {
c("transport not open - deferring close");
this.once("open", e);
}
};
h.prototype.write = function(t) {
var e = this;
this.writable = !1;
var r = function() {
e.writable = !0;
e.emit("drain");
};
i.encodePayload(t, this.supportsBinary, function(t) {
e.doWrite(t, r);
});
};
h.prototype.uri = function() {
var t = this.query || {}, e = this.secure ? "https" : "http", r = "";
!1 !== this.timestampRequests && (t[this.timestampParam] = a());
this.supportsBinary || t.sid || (t.b64 = 1);
t = o.encode(t);
this.port && ("https" === e && 443 !== Number(this.port) || "http" === e && 80 !== Number(this.port)) && (r = ":" + this.port);
t.length && (t = "?" + t);
return e + "://" + (-1 !== this.hostname.indexOf(":") ? "[" + this.hostname + "]" : this.hostname) + r + this.path + t;
};
}, function(t, e, r) {
var n = r(27), o = r(35);
t.exports = i;
function i(t) {
this.path = t.path;
this.hostname = t.hostname;
this.port = t.port;
this.secure = t.secure;
this.query = t.query;
this.timestampParam = t.timestampParam;
this.timestampRequests = t.timestampRequests;
this.readyState = "";
this.agent = t.agent || !1;
this.socket = t.socket;
this.enablesXDR = t.enablesXDR;
this.pfx = t.pfx;
this.key = t.key;
this.passphrase = t.passphrase;
this.cert = t.cert;
this.ca = t.ca;
this.ciphers = t.ciphers;
this.rejectUnauthorized = t.rejectUnauthorized;
this.forceNode = t.forceNode;
this.extraHeaders = t.extraHeaders;
this.localAddress = t.localAddress;
}
o(i.prototype);
i.prototype.onError = function(t, e) {
var r = new Error(t);
r.type = "TransportError";
r.description = e;
this.emit("error", r);
return this;
};
i.prototype.open = function() {
if ("closed" === this.readyState || "" === this.readyState) {
this.readyState = "opening";
this.doOpen();
}
return this;
};
i.prototype.close = function() {
if ("opening" === this.readyState || "open" === this.readyState) {
this.doClose();
this.onClose();
}
return this;
};
i.prototype.send = function(t) {
if ("open" !== this.readyState) throw new Error("Transport not open");
this.write(t);
};
i.prototype.onOpen = function() {
this.readyState = "open";
this.writable = !0;
this.emit("open");
};
i.prototype.onData = function(t) {
var e = n.decodePacket(t, this.socket.binaryType);
this.onPacket(e);
};
i.prototype.onPacket = function(t) {
this.emit("packet", t);
};
i.prototype.onClose = function() {
this.readyState = "closed";
this.emit("close");
};
}, function(t, e, r) {
(function(t) {
var n, o = r(28), i = r(29), s = r(30), a = r(31), c = r(32);
t && t.ArrayBuffer && (n = r(33));
var u = "undefined" != typeof navigator && /Android/i.test(navigator.userAgent), h = "undefined" != typeof navigator && /PhantomJS/i.test(navigator.userAgent), p = u || h;
e.protocol = 3;
var f = e.packets = {
open: 0,
close: 1,
ping: 2,
pong: 3,
message: 4,
upgrade: 5,
noop: 6
}, l = o(f), d = {
type: "error",
data: "parser error"
}, y = r(34);
e.encodePacket = function(e, r, n, o) {
if ("function" == typeof r) {
o = r;
r = !1;
}
if ("function" == typeof n) {
o = n;
n = null;
}
var i = void 0 === e.data ? void 0 : e.data.buffer || e.data;
if (t.ArrayBuffer && i instanceof ArrayBuffer) return m(e, r, o);
if (y && i instanceof t.Blob) return b(e, r, o);
if (i && i.base64) return g(e, o);
var s = f[e.type];
void 0 !== e.data && (s += n ? c.encode(String(e.data)) : String(e.data));
return o("" + s);
};
function g(t, r) {
return r("b" + e.packets[t.type] + t.data.data);
}
function m(t, r, n) {
if (!r) return e.encodeBase64Packet(t, n);
var o = t.data, i = new Uint8Array(o), s = new Uint8Array(1 + o.byteLength);
s[0] = f[t.type];
for (var a = 0; a < i.length; a++) s[a + 1] = i[a];
return n(s.buffer);
}
function v(t, r, n) {
if (!r) return e.encodeBase64Packet(t, n);
var o = new FileReader();
o.onload = function() {
t.data = o.result;
e.encodePacket(t, r, !0, n);
};
return o.readAsArrayBuffer(t.data);
}
function b(t, r, n) {
if (!r) return e.encodeBase64Packet(t, n);
if (p) return v(t, r, n);
var o = new Uint8Array(1);
o[0] = f[t.type];
return n(new y([ o.buffer, t.data ]));
}
e.encodeBase64Packet = function(r, n) {
var o, i = "b" + e.packets[r.type];
if (y && r.data instanceof t.Blob) {
var s = new FileReader();
s.onload = function() {
var t = s.result.split(",")[1];
n(i + t);
};
return s.readAsDataURL(r.data);
}
try {
o = String.fromCharCode.apply(null, new Uint8Array(r.data));
} catch (t) {
for (var a = new Uint8Array(r.data), c = new Array(a.length), u = 0; u < a.length; u++) c[u] = a[u];
o = String.fromCharCode.apply(null, c);
}
i += t.btoa(o);
return n(i);
};
e.decodePacket = function(t, r, n) {
if (void 0 === t) return d;
if ("string" == typeof t) {
if ("b" == t.charAt(0)) return e.decodeBase64Packet(t.substr(1), r);
if (n && !1 === (t = w(t))) return d;
var o = t.charAt(0);
return Number(o) == o && l[o] ? t.length > 1 ? {
type: l[o],
data: t.substring(1)
} : {
type: l[o]
} : d;
}
o = new Uint8Array(t)[0];
var i = s(t, 1);
y && "blob" === r && (i = new y([ i ]));
return {
type: l[o],
data: i
};
};
function w(t) {
try {
t = c.decode(t);
} catch (t) {
return !1;
}
return t;
}
e.decodeBase64Packet = function(t, e) {
var r = l[t.charAt(0)];
if (!n) return {
type: r,
data: {
base64: !0,
data: t.substr(1)
}
};
var o = n.decode(t.substr(1));
"blob" === e && y && (o = new y([ o ]));
return {
type: r,
data: o
};
};
e.encodePayload = function(t, r, n) {
if ("function" == typeof r) {
n = r;
r = null;
}
var o = i(t);
if (r && o) return y && !p ? e.encodePayloadAsBlob(t, n) : e.encodePayloadAsArrayBuffer(t, n);
if (!t.length) return n("0:");
function s(t) {
return t.length + ":" + t;
}
k(t, function(t, n) {
e.encodePacket(t, !!o && r, !0, function(t) {
n(null, s(t));
});
}, function(t, e) {
return n(e.join(""));
});
};
function k(t, e, r) {
for (var n = new Array(t.length), o = a(t.length, r), i = function(t, r, o) {
e(r, function(e, r) {
n[t] = r;
o(e, n);
});
}, s = 0; s < t.length; s++) i(s, t[s], o);
}
e.decodePayload = function(t, r, n) {
if ("string" != typeof t) return e.decodePayloadAsBinary(t, r, n);
if ("function" == typeof r) {
n = r;
r = null;
}
var o;
if ("" == t) return n(d, 0, 1);
for (var i, s, a = "", c = 0, u = t.length; c < u; c++) {
var h = t.charAt(c);
if (":" != h) a += h; else {
if ("" == a || a != (i = Number(a))) return n(d, 0, 1);
if (a != (s = t.substr(c + 1, i)).length) return n(d, 0, 1);
if (s.length) {
o = e.decodePacket(s, r, !0);
if (d.type == o.type && d.data == o.data) return n(d, 0, 1);
if (!1 === n(o, c + i, u)) return;
}
c += i;
a = "";
}
}
return "" != a ? n(d, 0, 1) : void 0;
};
e.encodePayloadAsArrayBuffer = function(t, r) {
if (!t.length) return r(new ArrayBuffer(0));
k(t, function(t, r) {
e.encodePacket(t, !0, !0, function(t) {
return r(null, t);
});
}, function(t, e) {
var n = e.reduce(function(t, e) {
var r;
return t + (r = "string" == typeof e ? e.length : e.byteLength).toString().length + r + 2;
}, 0), o = new Uint8Array(n), i = 0;
e.forEach(function(t) {
var e = "string" == typeof t, r = t;
if (e) {
for (var n = new Uint8Array(t.length), s = 0; s < t.length; s++) n[s] = t.charCodeAt(s);
r = n.buffer;
}
o[i++] = e ? 0 : 1;
var a = r.byteLength.toString();
for (s = 0; s < a.length; s++) o[i++] = parseInt(a[s]);
o[i++] = 255;
for (n = new Uint8Array(r), s = 0; s < n.length; s++) o[i++] = n[s];
});
return r(o.buffer);
});
};
e.encodePayloadAsBlob = function(t, r) {
k(t, function(t, r) {
e.encodePacket(t, !0, !0, function(t) {
var e = new Uint8Array(1);
e[0] = 1;
if ("string" == typeof t) {
for (var n = new Uint8Array(t.length), o = 0; o < t.length; o++) n[o] = t.charCodeAt(o);
t = n.buffer;
e[0] = 0;
}
var i = (t instanceof ArrayBuffer ? t.byteLength : t.size).toString(), s = new Uint8Array(i.length + 1);
for (o = 0; o < i.length; o++) s[o] = parseInt(i[o]);
s[i.length] = 255;
if (y) {
var a = new y([ e.buffer, s.buffer, t ]);
r(null, a);
}
});
}, function(t, e) {
return r(new y(e));
});
};
e.decodePayloadAsBinary = function(t, r, n) {
if ("function" == typeof r) {
n = r;
r = null;
}
for (var o = t, i = [], a = !1; o.byteLength > 0; ) {
for (var c = new Uint8Array(o), u = 0 === c[0], h = "", p = 1; 255 != c[p]; p++) {
if (h.length > 310) {
a = !0;
break;
}
h += c[p];
}
if (a) return n(d, 0, 1);
o = s(o, 2 + h.length);
h = parseInt(h);
var f = s(o, 0, h);
if (u) try {
f = String.fromCharCode.apply(null, new Uint8Array(f));
} catch (t) {
var l = new Uint8Array(f);
f = "";
for (p = 0; p < l.length; p++) f += String.fromCharCode(l[p]);
}
i.push(f);
o = s(o, h);
}
var y = i.length;
i.forEach(function(t, o) {
n(e.decodePacket(t, r, !0), o, y);
});
};
}).call(e, function() {
return this;
}());
}, function(t, e) {
t.exports = Object.keys || function(t) {
var e = [], r = Object.prototype.hasOwnProperty;
for (var n in t) r.call(t, n) && e.push(n);
return e;
};
}, function(t, e, r) {
(function(e) {
var n = r(15);
t.exports = function(t) {
return function t(r) {
if (!r) return !1;
if (e.Buffer && e.Buffer.isBuffer && e.Buffer.isBuffer(r) || e.ArrayBuffer && r instanceof ArrayBuffer || e.Blob && r instanceof Blob || e.File && r instanceof File) return !0;
if (n(r)) {
for (var o = 0; o < r.length; o++) if (t(r[o])) return !0;
} else if (r && "object" == typeof r) {
r.toJSON && "function" == typeof r.toJSON && (r = r.toJSON());
for (var i in r) if (Object.prototype.hasOwnProperty.call(r, i) && t(r[i])) return !0;
}
return !1;
}(t);
};
}).call(e, function() {
return this;
}());
}, function(t, e) {
t.exports = function(t, e, r) {
var n = t.byteLength;
e = e || 0;
r = r || n;
if (t.slice) return t.slice(e, r);
e < 0 && (e += n);
r < 0 && (r += n);
r > n && (r = n);
if (e >= n || e >= r || 0 === n) return new ArrayBuffer(0);
for (var o = new Uint8Array(t), i = new Uint8Array(r - e), s = e, a = 0; s < r; s++, 
a++) i[a] = o[s];
return i.buffer;
};
}, function(t, e) {
t.exports = function(t, e, n) {
var o = !1;
n = n || r;
i.count = t;
return 0 === t ? e() : i;
function i(t, r) {
if (i.count <= 0) throw new Error("after called too many times");
--i.count;
if (t) {
o = !0;
e(t);
e = n;
} else 0 !== i.count || o || e(null, r);
}
};
function r() {}
}, function(t, e, r) {
var n;
(function(t, o) {
(function(i) {
var s = "object" == typeof e && e, a = ("object" == typeof t && t && t.exports, 
"object" == typeof o && o);
a.global !== a && a.window !== a || a;
var c, u, h, p = String.fromCharCode;
function f(t) {
for (var e, r, n = [], o = 0, i = t.length; o < i; ) if ((e = t.charCodeAt(o++)) >= 55296 && e <= 56319 && o < i) if (56320 == (64512 & (r = t.charCodeAt(o++)))) n.push(((1023 & e) << 10) + (1023 & r) + 65536); else {
n.push(e);
o--;
} else n.push(e);
return n;
}
function l(t) {
for (var e, r = t.length, n = -1, o = ""; ++n < r; ) {
if ((e = t[n]) > 65535) {
o += p((e -= 65536) >>> 10 & 1023 | 55296);
e = 56320 | 1023 & e;
}
o += p(e);
}
return o;
}
function d(t, e) {
return p(t >> e & 63 | 128);
}
function y(t) {
if (0 == (4294967168 & t)) return p(t);
var e = "";
if (0 == (4294965248 & t)) e = p(t >> 6 & 31 | 192); else if (0 == (4294901760 & t)) {
e = p(t >> 12 & 15 | 224);
e += d(t, 6);
} else if (0 == (4292870144 & t)) {
e = p(t >> 18 & 7 | 240);
e += d(t, 12);
e += d(t, 6);
}
return e += p(63 & t | 128);
}
function g() {
if (h >= u) throw Error("Invalid byte index");
var t = 255 & c[h];
h++;
if (128 == (192 & t)) return 63 & t;
throw Error("Invalid continuation byte");
}
function m() {
var t, e;
if (h > u) throw Error("Invalid byte index");
if (h == u) return !1;
t = 255 & c[h];
h++;
if (0 == (128 & t)) return t;
if (192 == (224 & t)) {
if ((e = (31 & t) << 6 | g()) >= 128) return e;
throw Error("Invalid continuation byte");
}
if (224 == (240 & t)) {
if ((e = (15 & t) << 12 | g() << 6 | g()) >= 2048) return e;
throw Error("Invalid continuation byte");
}
if (240 == (248 & t) && (e = (15 & t) << 18 | g() << 12 | g() << 6 | g()) >= 65536 && e <= 1114111) return e;
throw Error("Invalid WTF-8 detected");
}
var v = {
version: "1.0.0",
encode: function(t) {
for (var e = f(t), r = e.length, n = -1, o = ""; ++n < r; ) o += y(e[n]);
return o;
},
decode: function(t) {
c = f(t);
u = c.length;
h = 0;
for (var e, r = []; !1 !== (e = m()); ) r.push(e);
return l(r);
}
};
void 0 !== (n = function() {
return v;
}.call(e, r, e, t)) && (t.exports = n);
})();
}).call(e, r(12)(t), function() {
return this;
}());
}, function(t, e) {
(function() {
"use strict";
for (var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", r = new Uint8Array(256), n = 0; n < t.length; n++) r[t.charCodeAt(n)] = n;
e.encode = function(e) {
var r, n = new Uint8Array(e), o = n.length, i = "";
for (r = 0; r < o; r += 3) {
i += t[n[r] >> 2];
i += t[(3 & n[r]) << 4 | n[r + 1] >> 4];
i += t[(15 & n[r + 1]) << 2 | n[r + 2] >> 6];
i += t[63 & n[r + 2]];
}
o % 3 == 2 ? i = i.substring(0, i.length - 1) + "=" : o % 3 == 1 && (i = i.substring(0, i.length - 2) + "==");
return i;
};
e.decode = function(t) {
var e, n, o, i, s, a = .75 * t.length, c = t.length, u = 0;
if ("=" === t[t.length - 1]) {
a--;
"=" === t[t.length - 2] && a--;
}
var h = new ArrayBuffer(a), p = new Uint8Array(h);
for (e = 0; e < c; e += 4) {
n = r[t.charCodeAt(e)];
o = r[t.charCodeAt(e + 1)];
i = r[t.charCodeAt(e + 2)];
s = r[t.charCodeAt(e + 3)];
p[u++] = n << 2 | o >> 4;
p[u++] = (15 & o) << 4 | i >> 2;
p[u++] = (3 & i) << 6 | 63 & s;
}
return h;
};
})();
}, function(t, e) {
(function(e) {
var r = e.BlobBuilder || e.WebKitBlobBuilder || e.MSBlobBuilder || e.MozBlobBuilder, n = function() {
try {
return 2 === new Blob([ "hi" ]).size;
} catch (t) {
return !1;
}
}(), o = n && function() {
try {
return 2 === new Blob([ new Uint8Array([ 1, 2 ]) ]).size;
} catch (t) {
return !1;
}
}(), i = r && r.prototype.append && r.prototype.getBlob;
function s(t) {
for (var e = 0; e < t.length; e++) {
var r = t[e];
if (r.buffer instanceof ArrayBuffer) {
var n = r.buffer;
if (r.byteLength !== n.byteLength) {
var o = new Uint8Array(r.byteLength);
o.set(new Uint8Array(n, r.byteOffset, r.byteLength));
n = o.buffer;
}
t[e] = n;
}
}
}
function a(t, e) {
e = e || {};
var n = new r();
s(t);
for (var o = 0; o < t.length; o++) n.append(t[o]);
return e.type ? n.getBlob(e.type) : n.getBlob();
}
function c(t, e) {
s(t);
return new Blob(t, e || {});
}
t.exports = n ? o ? e.Blob : c : i ? a : void 0;
}).call(e, function() {
return this;
}());
}, function(t, e, r) {
t.exports = n;
function n(t) {
if (t) return o(t);
}
function o(t) {
for (var e in n.prototype) t[e] = n.prototype[e];
return t;
}
n.prototype.on = n.prototype.addEventListener = function(t, e) {
this._callbacks = this._callbacks || {};
(this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e);
return this;
};
n.prototype.once = function(t, e) {
function r() {
this.off(t, r);
e.apply(this, arguments);
}
r.fn = e;
this.on(t, r);
return this;
};
n.prototype.off = n.prototype.removeListener = n.prototype.removeAllListeners = n.prototype.removeEventListener = function(t, e) {
this._callbacks = this._callbacks || {};
if (0 == arguments.length) {
this._callbacks = {};
return this;
}
var r, n = this._callbacks["$" + t];
if (!n) return this;
if (1 == arguments.length) {
delete this._callbacks["$" + t];
return this;
}
for (var o = 0; o < n.length; o++) if ((r = n[o]) === e || r.fn === e) {
n.splice(o, 1);
break;
}
return this;
};
n.prototype.emit = function(t) {
this._callbacks = this._callbacks || {};
var e = [].slice.call(arguments, 1), r = this._callbacks["$" + t];
if (r) for (var n = 0, o = (r = r.slice(0)).length; n < o; ++n) r[n].apply(this, e);
return this;
};
n.prototype.listeners = function(t) {
this._callbacks = this._callbacks || {};
return this._callbacks["$" + t] || [];
};
n.prototype.hasListeners = function(t) {
return !!this.listeners(t).length;
};
}, function(t, e) {
e.encode = function(t) {
var e = "";
for (var r in t) if (t.hasOwnProperty(r)) {
e.length && (e += "&");
e += encodeURIComponent(r) + "=" + encodeURIComponent(t[r]);
}
return e;
};
e.decode = function(t) {
for (var e = {}, r = t.split("&"), n = 0, o = r.length; n < o; n++) {
var i = r[n].split("=");
e[decodeURIComponent(i[0])] = decodeURIComponent(i[1]);
}
return e;
};
}, function(t, e) {
t.exports = function(t, e) {
var r = function() {};
r.prototype = e.prototype;
t.prototype = new r();
t.prototype.constructor = t;
};
}, function(t, e) {
"use strict";
var r, n = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), o = 64, i = {}, s = 0, a = 0;
function c(t) {
var e = "";
do {
e = n[t % o] + e;
t = Math.floor(t / o);
} while (t > 0);
return e;
}
function u() {
var t = c(+new Date());
return t !== r ? (s = 0, r = t) : t + "." + c(s++);
}
for (;a < o; a++) i[n[a]] = a;
u.encode = c;
u.decode = function(t) {
var e = 0;
for (a = 0; a < t.length; a++) e = e * o + i[t.charAt(a)];
return e;
};
t.exports = u;
}, function(t, e, r) {
(function(e) {
var n = r(25), o = r(37);
t.exports = u;
var i, s = /\n/g, a = /\\n/g;
function c() {}
function u(t) {
n.call(this, t);
this.query = this.query || {};
if (!i) {
e.___eio || (e.___eio = []);
i = e.___eio;
}
this.index = i.length;
var r = this;
i.push(function(t) {
r.onData(t);
});
this.query.j = this.index;
e.document && e.addEventListener && e.addEventListener("beforeunload", function() {
r.script && (r.script.onerror = c);
}, !1);
}
o(u, n);
u.prototype.supportsBinary = !1;
u.prototype.doClose = function() {
if (this.script) {
this.script.parentNode.removeChild(this.script);
this.script = null;
}
if (this.form) {
this.form.parentNode.removeChild(this.form);
this.form = null;
this.iframe = null;
}
n.prototype.doClose.call(this);
};
u.prototype.doPoll = function() {
var t = this, e = document.createElement("script");
if (this.script) {
this.script.parentNode.removeChild(this.script);
this.script = null;
}
e.async = !0;
e.src = this.uri();
e.onerror = function(e) {
t.onError("jsonp poll error", e);
};
var r = document.getElementsByTagName("script")[0];
r ? r.parentNode.insertBefore(e, r) : (document.head || document.body).appendChild(e);
this.script = e;
"undefined" != typeof navigator && /gecko/i.test(navigator.userAgent) && setTimeout(function() {
var t = document.createElement("iframe");
document.body.appendChild(t);
document.body.removeChild(t);
}, 100);
};
u.prototype.doWrite = function(t, e) {
var r = this;
if (!this.form) {
var n, o = document.createElement("form"), i = document.createElement("textarea"), c = this.iframeId = "eio_iframe_" + this.index;
o.className = "socketio";
o.style.position = "absolute";
o.style.top = "-1000px";
o.style.left = "-1000px";
o.target = c;
o.method = "POST";
o.setAttribute("accept-charset", "utf-8");
i.name = "d";
o.appendChild(i);
document.body.appendChild(o);
this.form = o;
this.area = i;
}
this.form.action = this.uri();
function u() {
h();
e();
}
function h() {
if (r.iframe) try {
r.form.removeChild(r.iframe);
} catch (t) {
r.onError("jsonp polling iframe removal error", t);
}
try {
var t = '<iframe src="javascript:0" name="' + r.iframeId + '">';
n = document.createElement(t);
} catch (t) {
(n = document.createElement("iframe")).name = r.iframeId;
n.src = "javascript:0";
}
n.id = r.iframeId;
r.form.appendChild(n);
r.iframe = n;
}
h();
t = t.replace(a, "\\\n");
this.area.value = t.replace(s, "\\n");
try {
this.form.submit();
} catch (t) {}
this.iframe.attachEvent ? this.iframe.onreadystatechange = function() {
"complete" === r.iframe.readyState && u();
} : this.iframe.onload = u;
};
}).call(e, function() {
return this;
}());
}, function(t, e, r) {
(function(e) {
var n, o = r(26), i = r(27), s = r(36), a = r(37), c = r(38), u = r(3)("engine.io-client:websocket"), h = e.WebSocket || e.MozWebSocket;
if ("undefined" == typeof window) try {
n = r(41);
} catch (t) {}
var p = h;
p || "undefined" != typeof window || (p = n);
t.exports = f;
function f(t) {
t && t.forceBase64 && (this.supportsBinary = !1);
this.perMessageDeflate = t.perMessageDeflate;
this.usingBrowserWebSocket = h && !t.forceNode;
this.usingBrowserWebSocket || (p = n);
o.call(this, t);
}
a(f, o);
f.prototype.name = "websocket";
f.prototype.supportsBinary = !0;
f.prototype.doOpen = function() {
if (this.check()) {
var t = this.uri(), e = {
agent: this.agent,
perMessageDeflate: this.perMessageDeflate
};
e.pfx = this.pfx;
e.key = this.key;
e.passphrase = this.passphrase;
e.cert = this.cert;
e.ca = this.ca;
e.ciphers = this.ciphers;
e.rejectUnauthorized = this.rejectUnauthorized;
this.extraHeaders && (e.headers = this.extraHeaders);
this.localAddress && (e.localAddress = this.localAddress);
try {
this.ws = this.usingBrowserWebSocket ? new p(t) : new p(t, void 0, e);
} catch (t) {
return this.emit("error", t);
}
void 0 === this.ws.binaryType && (this.supportsBinary = !1);
if (this.ws.supports && this.ws.supports.binary) {
this.supportsBinary = !0;
this.ws.binaryType = "nodebuffer";
} else this.ws.binaryType = "arraybuffer";
this.addEventListeners();
}
};
f.prototype.addEventListeners = function() {
var t = this;
this.ws.onopen = function() {
t.onOpen();
};
this.ws.onclose = function() {
t.onClose();
};
this.ws.onmessage = function(e) {
t.onData(e.data);
};
this.ws.onerror = function(e) {
t.onError("websocket error", e);
};
};
f.prototype.write = function(t) {
var r = this;
this.writable = !1;
for (var n = t.length, o = 0, s = n; o < s; o++) (function(t) {
i.encodePacket(t, r.supportsBinary, function(o) {
if (!r.usingBrowserWebSocket) {
var i = {};
t.options && (i.compress = t.options.compress);
if (r.perMessageDeflate) {
("string" == typeof o ? e.Buffer.byteLength(o) : o.length) < r.perMessageDeflate.threshold && (i.compress = !1);
}
}
try {
r.usingBrowserWebSocket ? r.ws.send(o) : r.ws.send(o, i);
} catch (t) {
u("websocket closed before onclose event");
}
--n || a();
});
})(t[o]);
function a() {
r.emit("flush");
setTimeout(function() {
r.writable = !0;
r.emit("drain");
}, 0);
}
};
f.prototype.onClose = function() {
o.prototype.onClose.call(this);
};
f.prototype.doClose = function() {
"undefined" != typeof this.ws && this.ws.close();
};
f.prototype.uri = function() {
var t = this.query || {}, e = this.secure ? "wss" : "ws", r = "";
this.port && ("wss" === e && 443 !== Number(this.port) || "ws" === e && 80 !== Number(this.port)) && (r = ":" + this.port);
this.timestampRequests && (t[this.timestampParam] = c());
this.supportsBinary || (t.b64 = 1);
(t = s.encode(t)).length && (t = "?" + t);
return e + "://" + (-1 !== this.hostname.indexOf(":") ? "[" + this.hostname + "]" : this.hostname) + r + this.path + t;
};
f.prototype.check = function() {
return !(!p || "__initialize" in p && this.name === f.prototype.name);
};
}).call(e, function() {
return this;
}());
}, function(t, e) {}, function(t, e) {
var r = [].indexOf;
t.exports = function(t, e) {
if (r) return t.indexOf(e);
for (var n = 0; n < t.length; ++n) if (t[n] === e) return n;
return -1;
};
}, function(t, e) {
(function(e) {
var r = /^[\],:{}\s]*$/, n = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, o = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, i = /(?:^|:|,)(?:\s*\[)+/g, s = /^\s+/, a = /\s+$/;
t.exports = function(t) {
if ("string" != typeof t || !t) return null;
t = t.replace(s, "").replace(a, "");
return e.JSON && JSON.parse ? JSON.parse(t) : r.test(t.replace(n, "@").replace(o, "]").replace(i, "")) ? new Function("return " + t)() : void 0;
};
}).call(e, function() {
return this;
}());
}, function(t, e, r) {
"use strict";
var n = r(7), o = r(35), i = r(45), s = r(46), a = r(47), c = r(3)("socket.io-client:socket"), u = r(29);
t.exports = f;
var h = {
connect: 1,
connect_error: 1,
connect_timeout: 1,
connecting: 1,
disconnect: 1,
error: 1,
reconnect: 1,
reconnect_attempt: 1,
reconnect_failed: 1,
reconnect_error: 1,
reconnecting: 1,
ping: 1,
pong: 1
}, p = o.prototype.emit;
function f(t, e, r) {
this.io = t;
this.nsp = e;
this.json = this;
this.ids = 0;
this.acks = {};
this.receiveBuffer = [];
this.sendBuffer = [];
this.connected = !1;
this.disconnected = !0;
r && r.query && (this.query = r.query);
this.io.autoConnect && this.open();
}
o(f.prototype);
f.prototype.subEvents = function() {
if (!this.subs) {
var t = this.io;
this.subs = [ s(t, "open", a(this, "onopen")), s(t, "packet", a(this, "onpacket")), s(t, "close", a(this, "onclose")) ];
}
};
f.prototype.open = f.prototype.connect = function() {
if (this.connected) return this;
this.subEvents();
this.io.open();
"open" === this.io.readyState && this.onopen();
this.emit("connecting");
return this;
};
f.prototype.send = function() {
var t = i(arguments);
t.unshift("message");
this.emit.apply(this, t);
return this;
};
f.prototype.emit = function(t) {
if (h.hasOwnProperty(t)) {
p.apply(this, arguments);
return this;
}
var e = i(arguments), r = n.EVENT;
u(e) && (r = n.BINARY_EVENT);
var o = {
type: r,
data: e,
options: {}
};
o.options.compress = !this.flags || !1 !== this.flags.compress;
if ("function" == typeof e[e.length - 1]) {
c("emitting packet with ack id %d", this.ids);
this.acks[this.ids] = e.pop();
o.id = this.ids++;
}
this.connected ? this.packet(o) : this.sendBuffer.push(o);
delete this.flags;
return this;
};
f.prototype.packet = function(t) {
t.nsp = this.nsp;
this.io.packet(t);
};
f.prototype.onopen = function() {
c("transport is open - connecting");
"/" !== this.nsp && (this.query ? this.packet({
type: n.CONNECT,
query: this.query
}) : this.packet({
type: n.CONNECT
}));
};
f.prototype.onclose = function(t) {
c("close (%s)", t);
this.connected = !1;
this.disconnected = !0;
delete this.id;
this.emit("disconnect", t);
};
f.prototype.onpacket = function(t) {
if (t.nsp === this.nsp) switch (t.type) {
case n.CONNECT:
this.onconnect();
break;

case n.EVENT:
case n.BINARY_EVENT:
this.onevent(t);
break;

case n.ACK:
case n.BINARY_ACK:
this.onack(t);
break;

case n.DISCONNECT:
this.ondisconnect();
break;

case n.ERROR:
this.emit("error", t.data);
}
};
f.prototype.onevent = function(t) {
var e = t.data || [];
c("emitting event %j", e);
if (null != t.id) {
c("attaching ack callback to event");
e.push(this.ack(t.id));
}
this.connected ? p.apply(this, e) : this.receiveBuffer.push(e);
};
f.prototype.ack = function(t) {
var e = this, r = !1;
return function() {
if (!r) {
r = !0;
var o = i(arguments);
c("sending ack %j", o);
var s = u(o) ? n.BINARY_ACK : n.ACK;
e.packet({
type: s,
id: t,
data: o
});
}
};
};
f.prototype.onack = function(t) {
var e = this.acks[t.id];
if ("function" == typeof e) {
c("calling ack %s with %j", t.id, t.data);
e.apply(this, t.data);
delete this.acks[t.id];
} else c("bad ack %s", t.id);
};
f.prototype.onconnect = function() {
this.connected = !0;
this.disconnected = !1;
this.emit("connect");
this.emitBuffered();
};
f.prototype.emitBuffered = function() {
var t;
for (t = 0; t < this.receiveBuffer.length; t++) p.apply(this, this.receiveBuffer[t]);
this.receiveBuffer = [];
for (t = 0; t < this.sendBuffer.length; t++) this.packet(this.sendBuffer[t]);
this.sendBuffer = [];
};
f.prototype.ondisconnect = function() {
c("server disconnect (%s)", this.nsp);
this.destroy();
this.onclose("io server disconnect");
};
f.prototype.destroy = function() {
if (this.subs) {
for (var t = 0; t < this.subs.length; t++) this.subs[t].destroy();
this.subs = null;
}
this.io.destroy(this);
};
f.prototype.close = f.prototype.disconnect = function() {
if (this.connected) {
c("performing disconnect (%s)", this.nsp);
this.packet({
type: n.DISCONNECT
});
}
this.destroy();
this.connected && this.onclose("io client disconnect");
return this;
};
f.prototype.compress = function(t) {
this.flags = this.flags || {};
this.flags.compress = t;
return this;
};
}, function(t, e) {
t.exports = function(t, e) {
for (var r = [], n = (e = e || 0) || 0; n < t.length; n++) r[n - e] = t[n];
return r;
};
}, function(t, e) {
"use strict";
t.exports = function(t, e, r) {
t.on(e, r);
return {
destroy: function() {
t.removeListener(e, r);
}
};
};
}, function(t, e) {
var r = [].slice;
t.exports = function(t, e) {
"string" == typeof e && (e = t[e]);
if ("function" != typeof e) throw new Error("bind() requires a function");
var n = r.call(arguments, 2);
return function() {
return e.apply(t, n.concat(r.call(arguments)));
};
};
}, function(t, e) {
t.exports = r;
function r(t) {
t = t || {};
this.ms = t.min || 100;
this.max = t.max || 1e4;
this.factor = t.factor || 2;
this.jitter = t.jitter > 0 && t.jitter <= 1 ? t.jitter : 0;
this.attempts = 0;
}
r.prototype.duration = function() {
var t = this.ms * Math.pow(this.factor, this.attempts++);
if (this.jitter) {
var e = Math.random(), r = Math.floor(e * this.jitter * t);
t = 0 == (1 & Math.floor(10 * e)) ? t - r : t + r;
}
return 0 | Math.min(t, this.max);
};
r.prototype.reset = function() {
this.attempts = 0;
};
r.prototype.setMin = function(t) {
this.ms = t;
};
r.prototype.setMax = function(t) {
this.max = t;
};
r.prototype.setJitter = function(t) {
this.jitter = t;
};
} ]);
});