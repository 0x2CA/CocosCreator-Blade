window.__require = function t(e, n, r) {
function i(a, s) {
if (!n[a]) {
if (!e[a]) {
var c = a.split("/");
c = c[c.length - 1];
if (!e[c]) {
var u = "function" == typeof __require && __require;
if (!s && u) return u(c, !0);
if (o) return o(c, !0);
throw new Error("Cannot find module '" + a + "'");
}
a = c;
}
var l = n[a] = {
exports: {}
};
e[a][0].call(l.exports, function(t) {
return i(e[a][1][t] || t);
}, l, l.exports, t, e, n, r);
}
return n[a].exports;
}
for (var o = "function" == typeof __require && __require, a = 0; a < r.length; a++) i(r[a]);
return i;
}({
ArchiveServerSDK: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "94ab0Min2JCq6AnwETgPWxr", "ArchiveServerSDK");
var r = this && this.__awaiter || function(t, e, n, r) {
function i(t) {
return t instanceof n ? t : new n(function(e) {
e(t);
});
}
return new (n || (n = Promise))(function(n, o) {
function a(t) {
try {
c(r.next(t));
} catch (t) {
o(t);
}
}
function s(t) {
try {
c(r.throw(t));
} catch (t) {
o(t);
}
}
function c(t) {
t.done ? n(t.value) : i(t.value).then(a, s);
}
c((r = r.apply(t, e || [])).next());
});
}, i = this && this.__generator || function(t, e) {
var n, r, i, o, a = {
label: 0,
sent: function() {
if (1 & i[0]) throw i[1];
return i[1];
},
trys: [],
ops: []
};
return o = {
next: s(0),
throw: s(1),
return: s(2)
}, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
return this;
}), o;
function s(t) {
return function(e) {
return c([ t, e ]);
};
}
function c(o) {
if (n) throw new TypeError("Generator is already executing.");
for (;a; ) try {
if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 
0) : r.next) && !(i = i.call(r, o[1])).done) return i;
(r = 0, i) && (o = [ 2 & o[0], i.value ]);
switch (o[0]) {
case 0:
case 1:
i = o;
break;

case 4:
a.label++;
return {
value: o[1],
done: !1
};

case 5:
a.label++;
r = o[1];
o = [ 0 ];
continue;

case 7:
o = a.ops.pop();
a.trys.pop();
continue;

default:
if (!(i = a.trys, i = i.length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
a = 0;
continue;
}
if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
a.label = o[1];
break;
}
if (6 === o[0] && a.label < i[1]) {
a.label = i[1];
i = o;
break;
}
if (i && a.label < i[2]) {
a.label = i[2];
a.ops.push(o);
break;
}
i[2] && a.ops.pop();
a.trys.pop();
continue;
}
o = e.call(t, a);
} catch (t) {
o = [ 6, t ];
r = 0;
} finally {
n = i = 0;
}
if (5 & o[0]) throw o[1];
return {
value: o[0] ? o[1] : void 0,
done: !0
};
}
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = t("../../Helpers/HttpHelper"), a = t("../../../Blade/Services/PlatformService"), s = function() {
function t() {}
t.remoteCall = function(e, n, r) {
void 0 === n && (n = {});
void 0 === r && (r = "POST");
var i;
i = "" + t.ArchiveUrl + e;
return new Promise(function(e, a) {
o.default.Request(i, {
method: r,
data: n || {},
headers: {
Authorization: "Bearer " + t.authToken
},
contentType: "JSON",
dataType: "JSON"
}).then(function(t) {
return 0 == t.code ? e(t.data) : a(t.msg);
}).catch(function(t) {
a(t);
});
});
};
t.login = function(e) {
return r(this, void 0, void 0, function() {
var n, r;
return i(this, function(i) {
switch (i.label) {
case 0:
if (1 == t.isLogin()) return [ 2 ];
t.GameName = e;
0;
i.label = 1;

case 1:
i.trys.push([ 1, 13, , 14 ]);
n = void 0;
switch (blade.platform.getType()) {
case a.default.PlatformType.WX:
return [ 3, 2 ];

case a.default.PlatformType.FACEBOOK:
return [ 3, 4 ];

case a.default.PlatformType.ANDROID:
return [ 3, 6 ];

case a.default.PlatformType.IOS:
return [ 3, 8 ];
}
return [ 3, 10 ];

case 2:
return [ 4, t.wxLogin() ];

case 3:
n = i.sent();
return [ 3, 12 ];

case 4:
return [ 4, t.fbLogin() ];

case 5:
n = i.sent();
return [ 3, 12 ];

case 6:
return [ 4, t.gpLogin() ];

case 7:
n = i.sent();
return [ 3, 12 ];

case 8:
return [ 4, t.asLogin() ];

case 9:
n = i.sent();
return [ 3, 12 ];

case 10:
return [ 4, t.webLogin() ];

case 11:
n = i.sent();
return [ 3, 12 ];

case 12:
if (!(n && n.token && n.openid)) throw new Error("返回信息错误" + n);
t.authToken = n.token;
t.openid = n.openid;
t.data = t.loadLocal();
console.log("游戏数据：", t.data);
t.autoSave && blade.timer.stopTimer(t.autoSave);
t.autoSave = blade.timer.startTimer(t.ArchiveAutoSaveSecond, function() {
t.save(!0);
}, this);
return [ 3, 14 ];

case 13:
r = i.sent();
cc.error("登陆失败" + (r ? ":" + r.toString() : ""));
return [ 3, 14 ];

case 14:
return [ 2 ];
}
});
});
};
t.isLogin = function() {
return null != t.authToken && null != t.openid;
};
t.wxLogin = function() {
return r(this, void 0, void 0, function() {
var e = this;
return i(this, function(n) {
return [ 2, new Promise(function(n, o) {
wx.login({
success: function(a) {
return r(e, void 0, void 0, function() {
var e, r;
return i(this, function(i) {
switch (i.label) {
case 0:
i.trys.push([ 0, 2, , 3 ]);
return [ 4, t.remoteCall("/wxapi/login", {
game: t.GameName,
code: a.code
}, "GET") ];

case 1:
if ((e = i.sent()) && e.token) return [ 2, n(e) ];
throw new Error();

case 2:
r = i.sent();
return [ 2, o(r) ];

case 3:
return [ 2 ];
}
});
});
},
fail: function(t) {
return o(t);
}
});
}) ];
});
});
};
t.fbLogin = function() {
return r(this, void 0, void 0, function() {
var e, n;
return i(this, function(r) {
switch (r.label) {
case 0:
return [ 4, FBInstant.player.getSignedPlayerInfoAsync() ];

case 1:
e = r.sent();
return [ 4, t.remoteCall("/fbapi/login", {
game: t.GameName,
uid: FBInstant.player.getID(),
signedRequest: e.getSignature()
}, "GET") ];

case 2:
if ((n = r.sent()) && n.token) return [ 2, n ];
throw new Error();
}
});
});
};
t.webLogin = function() {
return Promise.resolve({
token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnYW1lIjoiaGx6Z2MiLCJvcGVuaWQiOiJvZm93UTVhaUY2WmdoUmtoRFVNUXJUUHJNcWF3IiwidWlkIjoid3h8b2Zvd1E1YWlGNlpnaFJraERVTVFyVFByTXFhdyIsImNoYW5uZWwiOiJ3ZWNoYXQiLCJpYXQiOjE1NDc5NTQxNTd9.tbCMD5wzzkX8YLNTapvr9WQxbJejQhDhXeYgSLOgKzM",
openid: "ofowQ5aiF6ZghRkhDUMQrTPrMqaw"
});
};
t.asLogin = function() {
return r(this, void 0, void 0, function() {
var e, n;
return i(this, function(r) {
switch (r.label) {
case 0:
e = blade.platform.getPlatform().getArchive("asuid");
return [ 4, t.remoteCall("/asapi/login", {
game: t.GameName,
uid: e
}, "GET") ];

case 1:
if ((n = r.sent()) && n.token && n.openid) {
blade.platform.getPlatform().saveArchive("asuid", n.openid);
return [ 2, n ];
}
throw new Error();
}
});
});
};
t.gpLogin = function() {
return r(this, void 0, void 0, function() {
var e, n;
return i(this, function(r) {
switch (r.label) {
case 0:
e = blade.platform.getPlatform().getArchive("asuid");
return [ 4, t.remoteCall("/gpapi/login", {
game: t.GameName,
uid: e
}, "GET") ];

case 1:
if ((n = r.sent()) && n.token && n.openid) {
blade.platform.getPlatform().saveArchive("asuid", n.openid);
return [ 2, n ];
}
throw new Error();
}
});
});
};
t.getTime = function() {
return r(this, void 0, Promise, function() {
return i(this, function(e) {
switch (e.label) {
case 0:
return [ 4, t.remoteCall("/comapi/time", {}, "GET") ];

case 1:
return [ 2, e.sent().time ];
}
});
});
};
t.setScore = function(e, n) {
return r(this, void 0, void 0, function() {
return i(this, function(r) {
switch (r.label) {
case 0:
if (0 == t.isLogin()) throw new Error("请先调用ArchiveServerSDK.login(),登录服务器!");
return [ 4, t.remoteCall("/rank/set", {
rank: e,
score: n.toFixed(0)
}, "POST") ];

case 1:
r.sent();
return [ 2 ];
}
});
});
};
t.prototype.getRank = function(e) {
return r(this, void 0, Promise, function() {
var n;
return i(this, function(r) {
switch (r.label) {
case 0:
if (t.rankList.length > 0) return [ 2, {
list: t.rankList,
self: t.selfRank
} ];
if (0 == t.isLogin()) throw new Error("请先调用ArchiveServerSDK.login(),登录服务器!");
return [ 4, t.remoteCall("/rank/get", {
rank: e,
top: 50
}, "GET") ];

case 1:
n = r.sent();
t.rankList = n.list || [];
t.selfRank = n.self;
return [ 2, n ];
}
});
});
};
t.uploadUserInfo = function() {
return r(this, void 0, void 0, function() {
var e, n;
return i(this, function(r) {
switch (r.label) {
case 0:
if (0 == t.isLogin()) throw new Error("请先调用ArchiveServerSDK.login(),登录服务器!");
if (!(e = blade.platform.getPlatform().getUserInfo())) return [ 3, 5 ];
r.label = 1;

case 1:
r.trys.push([ 1, 3, , 4 ]);
return [ 4, t.remoteCall("/user/record", e, "POST") ];

case 2:
r.sent();
console.log("上传用户成功！", e);
return [ 3, 4 ];

case 3:
n = r.sent();
console.error("无法上传用户数据！", n);
return [ 3, 4 ];

case 4:
return [ 3, 6 ];

case 5:
console.error("暂无用户信息！无法上传用户数据！");
r.label = 6;

case 6:
return [ 2 ];
}
});
});
};
t.loadRemote = function() {
return r(this, void 0, void 0, function() {
var e;
return i(this, function(n) {
switch (n.label) {
case 0:
if (0 == t.isLogin()) throw new Error("请先调用ArchiveServerSDK.login(),登录服务器!");
n.label = 1;

case 1:
n.trys.push([ 1, 3, , 4 ]);
return [ 4, t.remoteCall("/archive/get", {}, "GET") ];

case 2:
if (e = n.sent()) return [ 2, e ];
throw new Error();

case 3:
n.sent();
return [ 2, {} ];

case 4:
return [ 2 ];
}
});
});
};
t.saveRemote = function(e, n, o) {
void 0 === n && (n = !0);
void 0 === o && (o = !0);
return r(this, void 0, void 0, function() {
return i(this, function(r) {
switch (r.label) {
case 0:
if (0 == t.isLogin()) throw new Error("请先调用ArchiveServerSDK.login(),登录服务器!");
return [ 4, t.remoteCall("/archive/save", {
data: e,
overwrite: n,
force: o
}) ];

case 1:
r.sent();
return [ 2 ];
}
});
});
};
t.loadLocal = function() {
try {
return JSON.parse(blade.platform.getPlatform().getArchive("Archive"));
} catch (t) {
return {};
}
};
t.saveLocal = function(t) {
blade.platform.getPlatform().saveArchive("Archive", JSON.stringify(t));
};
t.sync = function() {
return r(this, void 0, void 0, function() {
var e, n, r, o;
return i(this, function(i) {
switch (i.label) {
case 0:
if (0 == t.isLogin()) throw new Error("请先调用ArchiveServerSDK.login(),登录服务器!");
return [ 4, t.loadRemote() ];

case 1:
e = i.sent();
if (null == (n = t.data)) {
console.log("本地无存档!");
t.data = e;
return [ 2 ];
}
r = n.alterTime || 0;
o = e && e.alterTime || 0;
if (!(r < o)) return [ 3, 3 ];
console.log("更新本地存档");
t.data = e;
return [ 4, t.saveLocal(t.data) ];

case 2:
i.sent();
return [ 3, 5 ];

case 3:
console.log("更新云存档");
t.data.alterTime = blade.timer.getTime();
return [ 4, t.saveRemote(t.data) ];

case 4:
i.sent();
i.label = 5;

case 5:
return [ 2 ];
}
});
});
};
t.save = function(e) {
void 0 === e && (e = !1);
if (e) {
t.data.alterTime = blade.timer.getTime();
t.saveLocal(t.data);
t.saveRemote(t.data);
}
};
t.get = function(e) {
if (null == t.data) throw new Error("请先同步数据！");
return null == t.data[e] ? null : t.data[e];
};
t.set = function(e, n) {
if (null == t.data) throw new Error("请先同步数据！");
var r = t.data[e];
if (r && typeof r != typeof n) throw new Error("存档新值和旧值类型不一致, 忽略存入");
r !== n && (this.data[e] = n);
};
t.clear = function() {
cc.warn("存档已经重置");
t.data = {
alterTime: Date.now()
};
this.save(!0);
};
t.GameName = "";
t.ArchiveDebugUrl = "https://gamearchive.tongchuangyouxi.com";
t.ArchiveUrl = "https://gamearchive.tongchuangyouxi.com";
t.AnonyAccount = !0;
t.AnonyAuthToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnYW1lIjoibGVlayIsIm9wZW5pZCI6ImFub255IiwidWlkIjoid2I6YW5vbnkiLCJjaGFubmVsIjoid2VjaGF0IiwiaWF0IjoxNTcyMzM4MzEwfQ.6StfHgwm65NYjm2lf3cuR5kb1iUGZVpBCaH68I8DrNc";
t.AnonyOpenid = "anony";
t.authToken = null;
t.openid = null;
t.rankList = [];
t.selfRank = null;
t.data = null;
t.ArchiveAutoSaveSecond = 5;
t.autoSave = null;
return t;
}();
n.default = s;
cc._RF.pop();
}, {
"../../../Blade/Services/PlatformService": "PlatformService",
"../../Helpers/HttpHelper": "HttpHelper"
} ],
AudioService: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "90da08FJzpEsJULNCWVPnRm", "AudioService");
var r = this && this.__decorate || function(t, e, n, r) {
var i, o = arguments.length, a = o < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, n, r); else for (var s = t.length - 1; s >= 0; s--) (i = t[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(e, n, a) : i(e, n)) || a);
return o > 3 && a && Object.defineProperty(e, n, a), a;
}, i = this && this.__awaiter || function(t, e, n, r) {
function i(t) {
return t instanceof n ? t : new n(function(e) {
e(t);
});
}
return new (n || (n = Promise))(function(n, o) {
function a(t) {
try {
c(r.next(t));
} catch (t) {
o(t);
}
}
function s(t) {
try {
c(r.throw(t));
} catch (t) {
o(t);
}
}
function c(t) {
t.done ? n(t.value) : i(t.value).then(a, s);
}
c((r = r.apply(t, e || [])).next());
});
}, o = this && this.__generator || function(t, e) {
var n, r, i, o, a = {
label: 0,
sent: function() {
if (1 & i[0]) throw i[1];
return i[1];
},
trys: [],
ops: []
};
return o = {
next: s(0),
throw: s(1),
return: s(2)
}, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
return this;
}), o;
function s(t) {
return function(e) {
return c([ t, e ]);
};
}
function c(o) {
if (n) throw new TypeError("Generator is already executing.");
for (;a; ) try {
if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 
0) : r.next) && !(i = i.call(r, o[1])).done) return i;
(r = 0, i) && (o = [ 2 & o[0], i.value ]);
switch (o[0]) {
case 0:
case 1:
i = o;
break;

case 4:
a.label++;
return {
value: o[1],
done: !1
};

case 5:
a.label++;
r = o[1];
o = [ 0 ];
continue;

case 7:
o = a.ops.pop();
a.trys.pop();
continue;

default:
if (!(i = a.trys, i = i.length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
a = 0;
continue;
}
if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
a.label = o[1];
break;
}
if (6 === o[0] && a.label < i[1]) {
a.label = i[1];
i = o;
break;
}
if (i && a.label < i[2]) {
a.label = i[2];
a.ops.push(o);
break;
}
i[2] && a.ops.pop();
a.trys.pop();
continue;
}
o = e.call(t, a);
} catch (t) {
o = [ 6, t ];
r = 0;
} finally {
n = i = 0;
}
if (5 & o[0]) throw o[1];
return {
value: o[0] ? o[1] : void 0,
done: !0
};
}
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var a = t("../../Blade/Decorators/Singleton"), s = t("../../Blade/Decorators/Service"), c = function() {
function t() {
this.list = new Map();
this.audioPath = "Audios";
this.bgmVolume = 1;
this.sfxVolume = 1;
this.bgmAudioID = 0;
}
e = t;
t.prototype.initialize = function() {
this.loadFolder();
this.initVolume();
};
t.prototype.lazyInitialize = function() {};
t.prototype.initVolume = function() {
var t = blade.platform.getPlatform().getArchive(e.BGM_VOL_KEY);
this.bgmVolume = parseFloat(t);
isNaN(this.bgmVolume) && (this.bgmVolume = 1);
var n = blade.platform.getPlatform().getArchive(e.SFX_VOL_KEY);
this.sfxVolume = parseFloat(n);
isNaN(this.sfxVolume) && (this.sfxVolume = 1);
};
t.prototype.loadFolder = function() {
var t = this;
cc.resources.loadDir(this.audioPath, function(e, n) {
for (var r = 0; r < n.length; r++) {
var i = n[r];
t.register(i.name, i);
}
t.info();
});
};
t.prototype.register = function(t, e) {
return i(this, void 0, void 0, function() {
return o(this, function(n) {
this.list.has(t) || this.list.set(t, e);
return [ 2 ];
});
});
};
t.prototype.unregister = function(t) {
return i(this, void 0, void 0, function() {
return o(this, function(e) {
this.list.has(t) && this.list.delete(t);
return [ 2 ];
});
});
};
t.prototype.playBGM = function(t) {
this.bgmAudioID >= 0 && cc.audioEngine.stop(this.bgmAudioID);
if (this.list.has(t)) {
var e = cc.audioEngine.play(this.list.get(t), !0, this.bgmVolume);
this.bgmAudioID = e;
} else console.error("播放的声音不存在!:" + t);
};
t.prototype.playSFX = function(t) {
if (this.sfxVolume > 0 && this.list.has(t)) cc.audioEngine.play(this.list.get(t), !1, this.sfxVolume); else console.error("播放的声音不存在!:" + t);
};
t.prototype.getSFXVolume = function() {
return this.sfxVolume;
};
t.prototype.getBGMVolume = function() {
return this.bgmVolume;
};
t.prototype.setSFXVolume = function(t) {
if (this.sfxVolume != t) {
blade.platform.getPlatform().saveArchive(e.SFX_VOL_KEY, t.toString());
this.sfxVolume = t;
}
};
t.prototype.setBGMVolume = function(t) {
this.bgmAudioID >= 0 && (t > 0 ? cc.audioEngine.resume(this.bgmAudioID) : cc.audioEngine.pause(this.bgmAudioID));
if (this.bgmVolume != t) {
blade.platform.getPlatform().saveArchive(e.BGM_VOL_KEY, t.toString());
this.bgmVolume = t;
cc.audioEngine.setVolume(this.bgmAudioID, t);
}
};
t.prototype.pauseAll = function() {
cc.audioEngine.pauseAll();
};
t.prototype.resumeAll = function() {
cc.audioEngine.resumeAll();
};
t.prototype.info = function(t) {
if (t) this.list.has(t) ? console.log(t + ":", this.list.get(t)) : console.log("没有" + t + "声音"); else {
var e = "声音信息:\n";
this.list.size > 0 ? this.list.forEach(function(t, n, r) {
e += "   " + n + "    ✔\n";
}) : e += "   没有注册声音";
console.log(e);
}
};
var e;
t.BGM_VOL_KEY = "bgm_volume";
t.SFX_VOL_KEY = "sfx_volume";
return t = e = r([ a.default, s.default("AudioService") ], t);
}();
n.default = c;
cc._RF.pop();
}, {
"../../Blade/Decorators/Service": "Service",
"../../Blade/Decorators/Singleton": "Singleton"
} ],
BigHelper: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "f9054xH6hxCDL3TnvOYEDCQ", "BigHelper");
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = function() {
function t() {}
t.toFormat = function(e) {
try {
var n = (e = new Big(e)).toFixed(2).split(".")[0].split("").reverse().join("").replace(/(.{3})/g, "$1,").split("").reverse().join("").split(",");
"" == n[0] && n.shift();
n = n.join(",");
e.toFixed(2).split(".")[1] && (n += "." + e.toFixed(2).split(".")[1]);
var r = n.split(".")[0].split(","), i = r.length;
i > 1 && (n = r[0] + "." + r[1].substring(0, 2));
for (var o = n.length - 1; o >= 0; o--) {
if ("." == n[o]) {
n = n.substring(0, o);
break;
}
if ("0" != n[o]) break;
n = n.substring(0, o);
}
return n + t.Unit[i - 1];
} catch (t) {
console.log(t);
return "0";
}
};
t.toSmall = function(t, e) {
void 0 === e && (e = 5);
try {
var n = (t = new Big(t)).toFixed(2).split(".")[0].split("").reverse().join("").replace(/(.{3})/g, "$1,").split("").reverse().join("").split(",");
"" == n[0] && n.shift();
n = n.join(",");
t.toFixed(2).split(".")[1] && (n += "." + t.toFixed(2).split(".")[1]);
var r = n.split("."), i = r[0].split(","), o = i.length;
i[0] = (parseInt(i[0]) + 1e3 + "").substr(1);
i.push(r[1]);
var a = (Math.floor(o / e) + Math.pow(10, (Math.floor(64 / e) + "").length) + "").substr(1), s = (parseInt(i.join("").substr(0, 3 * e - 1)) + Math.pow(10, 3 * e - 1) + "").substr(1);
return parseInt(a + s);
} catch (t) {
console.log(t);
return 0;
}
};
t.Unit = [ "", "k", "m", "b", "t", "ta", "tb", "tc", "td", "te", "tf", "tg", "th", "ti", "tj", "tk", "tl", "tm", "tn", "to", "tp", "tq", "tr", "ts", "tt", "tu", "tv", "tw", "tx", "ty", "tz" ];
return t;
}();
n.default = r;
cc._RF.pop();
}, {} ],
Blade: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "4f31feFAGVGB5vtjgHVXi7X", "Blade");
var r = this && this.__extends || function() {
var t = function(e, n) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
})(e, n);
};
return function(e, n) {
t(e, n);
function r() {
this.constructor = e;
}
e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r());
};
}();
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = t("./Interfaces/IFrameWork"), o = t("./Services/ViewService"), a = t("./Services/ControllerService"), s = t("./Services/NotificationService"), c = t("./Services/ModelService"), u = t("./Services/CommandService"), l = t("./Services/PlatformService"), f = t("./Services/TweenService"), p = t("./Services/LocalizedService"), d = t("./Services/TickerService"), h = t("./Services/PopupService"), v = t("./Services/PoolService"), y = t("./Services/SceneService"), g = t("./Services/TimerService"), m = t("./Services/AudioService"), _ = t("./Services/ConfigService"), S = function(t) {
r(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.model = c.default.instance;
e.view = o.default.instance;
e.ctrl = a.default.instance;
e.notice = s.default.instance;
e.cmd = u.default.instance;
e.platform = l.default.instance;
e.tween = f.default.instance;
e.locale = p.default.instance;
e.ticker = d.default.instance;
e.timer = g.default.instance;
e.popup = h.default.instance;
e.pool = v.default.instance;
e.audio = m.default.instance;
e.config = _.default.instance;
e.scene = y.default.instance;
return e;
}
return e;
}(i.default);
n.default = S;
if ("undefined" == typeof blade) {
var b = new S();
window.blade = b;
if (cc.sys.platform !== cc.sys.EDITOR_PAGE) {
cc.game.once(cc.game.EVENT_ENGINE_INITED, function() {
return b.initialize();
});
cc.director.on(cc.Director.EVENT_AFTER_SCENE_LAUNCH, function(t) {
var e = cc.find("Blade");
if (null == e) {
(e = new cc.Node()).name = "Blade";
e.parent = t;
e.group = "ui";
}
e.x = .5 * cc.winSize.width;
e.y = .5 * cc.winSize.height;
e.width = cc.winSize.width;
e.height = cc.winSize.height;
cc.game.isPersistRootNode(e) || cc.game.addPersistRootNode(e);
});
cc.director.once(cc.Director.EVENT_AFTER_SCENE_LAUNCH, function(t) {
b.lazyInitialize();
});
} else b.locale.initialize();
}
cc._RF.pop();
}, {
"./Interfaces/IFrameWork": "IFrameWork",
"./Services/AudioService": "AudioService",
"./Services/CommandService": "CommandService",
"./Services/ConfigService": "ConfigService",
"./Services/ControllerService": "ControllerService",
"./Services/LocalizedService": "LocalizedService",
"./Services/ModelService": "ModelService",
"./Services/NotificationService": "NotificationService",
"./Services/PlatformService": "PlatformService",
"./Services/PoolService": "PoolService",
"./Services/PopupService": "PopupService",
"./Services/SceneService": "SceneService",
"./Services/TickerService": "TickerService",
"./Services/TimerService": "TimerService",
"./Services/TweenService": "TweenService",
"./Services/ViewService": "ViewService"
} ],
CommandService: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "95596AzE9FEj4hNSM2jprMm", "CommandService");
var r = this && this.__decorate || function(t, e, n, r) {
var i, o = arguments.length, a = o < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, n, r); else for (var s = t.length - 1; s >= 0; s--) (i = t[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(e, n, a) : i(e, n)) || a);
return o > 3 && a && Object.defineProperty(e, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = t("../../Blade/Decorators/Service"), o = t("../../Blade/Decorators/Singleton"), a = t("./TimerService"), s = function() {
function t() {}
t.prototype.initialize = function() {};
t.prototype.lazyInitialize = function() {};
t.prototype.exec = function(t) {
for (var e, n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];
(e = new t()).exec.apply(e, n);
};
t.prototype.execNextFrame = function(t) {
for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
a.default.instance.runNextFrame(function() {
var n;
(n = new t()).exec.apply(n, e);
});
};
t.prototype.execAsync = function(t) {
for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
new Promise(function(n, r) {
var i;
(i = new t()).exec.apply(i, e);
n();
});
};
return t = r([ o.default, i.default("CommandService") ], t);
}();
n.default = s;
cc._RF.pop();
}, {
"../../Blade/Decorators/Service": "Service",
"../../Blade/Decorators/Singleton": "Singleton",
"./TimerService": "TimerService"
} ],
ConfigService: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "cc748+Gu4RFS7pa9pVkHmol", "ConfigService");
var r = this && this.__decorate || function(t, e, n, r) {
var i, o = arguments.length, a = o < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, n, r); else for (var s = t.length - 1; s >= 0; s--) (i = t[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(e, n, a) : i(e, n)) || a);
return o > 3 && a && Object.defineProperty(e, n, a), a;
}, i = this && this.__awaiter || function(t, e, n, r) {
function i(t) {
return t instanceof n ? t : new n(function(e) {
e(t);
});
}
return new (n || (n = Promise))(function(n, o) {
function a(t) {
try {
c(r.next(t));
} catch (t) {
o(t);
}
}
function s(t) {
try {
c(r.throw(t));
} catch (t) {
o(t);
}
}
function c(t) {
t.done ? n(t.value) : i(t.value).then(a, s);
}
c((r = r.apply(t, e || [])).next());
});
}, o = this && this.__generator || function(t, e) {
var n, r, i, o, a = {
label: 0,
sent: function() {
if (1 & i[0]) throw i[1];
return i[1];
},
trys: [],
ops: []
};
return o = {
next: s(0),
throw: s(1),
return: s(2)
}, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
return this;
}), o;
function s(t) {
return function(e) {
return c([ t, e ]);
};
}
function c(o) {
if (n) throw new TypeError("Generator is already executing.");
for (;a; ) try {
if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 
0) : r.next) && !(i = i.call(r, o[1])).done) return i;
(r = 0, i) && (o = [ 2 & o[0], i.value ]);
switch (o[0]) {
case 0:
case 1:
i = o;
break;

case 4:
a.label++;
return {
value: o[1],
done: !1
};

case 5:
a.label++;
r = o[1];
o = [ 0 ];
continue;

case 7:
o = a.ops.pop();
a.trys.pop();
continue;

default:
if (!(i = a.trys, i = i.length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
a = 0;
continue;
}
if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
a.label = o[1];
break;
}
if (6 === o[0] && a.label < i[1]) {
a.label = i[1];
i = o;
break;
}
if (i && a.label < i[2]) {
a.label = i[2];
a.ops.push(o);
break;
}
i[2] && a.ops.pop();
a.trys.pop();
continue;
}
o = e.call(t, a);
} catch (t) {
o = [ 6, t ];
r = 0;
} finally {
n = i = 0;
}
if (5 & o[0]) throw o[1];
return {
value: o[0] ? o[1] : void 0,
done: !0
};
}
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var a = t("../../Blade/Decorators/Singleton"), s = t("../../Blade/Decorators/Service"), c = function() {
function t() {
this.list = new Map();
this.configPath = "Configs";
}
t.prototype.initialize = function() {
this.loadFolder();
};
t.prototype.lazyInitialize = function() {};
t.prototype.loadFolder = function() {
var t = this;
cc.resources.loadDir(this.configPath, function(e, n) {
for (var r = 0; r < n.length; r++) {
var i = n[r];
t.register(i.name, i);
}
t.info();
});
};
t.prototype.register = function(t, e) {
return i(this, void 0, void 0, function() {
return o(this, function(n) {
this.list.has(t) || this.list.set(t, {
jsonAsset: e,
data: null
});
return [ 2 ];
});
});
};
t.prototype.unregister = function(t) {
return i(this, void 0, void 0, function() {
return o(this, function(e) {
this.list.has(t) && this.list.delete(t);
return [ 2 ];
});
});
};
t.prototype.get = function(t) {
if (this.list.has(t)) {
var e = this.list.get(t);
return e.data ? e.data : e.data = this.build(e.jsonAsset.json);
}
};
t.prototype.build = function(t) {
var e, n = t.keys, r = t.data, i = t.index;
if (null == i) {
e = [];
for (var o = 0; o < r.length; o++) {
for (var a = r[o], s = {}, c = 0; c < a.length; c++) s[n[c]] = a[c];
e.push(s);
}
} else {
e = {};
for (o = 0; o < r.length; o++) {
a = r[o];
var u = {};
for (c = 0; c < a.length; c++) n[c] != i ? u[n[c]] = a[c] : e[a[c]] = u;
}
}
return e;
};
t.prototype.info = function(t) {
if (t) this.list.has(t) ? console.log(t + ":", this.list.get(t).jsonAsset) : console.log("没有" + t + "配置文件"); else {
var e = "配置信息:\n";
this.list.size > 0 ? this.list.forEach(function(t, n, r) {
e += "   " + n + "    ✔\n";
}) : e += "   没有注册配置";
console.log(e);
}
};
return t = r([ a.default, s.default("ConfigService") ], t);
}();
n.default = c;
cc._RF.pop();
}, {
"../../Blade/Decorators/Service": "Service",
"../../Blade/Decorators/Singleton": "Singleton"
} ],
ControllerService: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "b8e2fknAlJD84x2Q0ESChAV", "ControllerService");
var r = this && this.__decorate || function(t, e, n, r) {
var i, o = arguments.length, a = o < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, n, r); else for (var s = t.length - 1; s >= 0; s--) (i = t[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(e, n, a) : i(e, n)) || a);
return o > 3 && a && Object.defineProperty(e, n, a), a;
}, i = this && this.__spreadArrays || function() {
for (var t = 0, e = 0, n = arguments.length; e < n; e++) t += arguments[e].length;
var r = Array(t), i = 0;
for (e = 0; e < n; e++) for (var o = arguments[e], a = 0, s = o.length; a < s; a++, 
i++) r[i] = o[a];
return r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = t("../../Blade/Decorators/Service"), a = t("../../Blade/Decorators/Singleton"), s = function() {
function t() {}
t.prototype.initialize = function() {
this.list = new Map();
};
t.prototype.lazyInitialize = function() {};
t.prototype.register = function(t) {
if (this.list.has(t.alias)) {
console.error("已经存在" + t.alias + "控制器!");
this.unregister(this.list.get(t.alias));
this.register(t);
} else this.list.set(t.alias, t);
};
t.prototype.unregister = function(t) {
this.list.has(t.alias) && this.list.delete(t.alias);
};
t.prototype.getController = function(t) {
if (this.list.has(t)) return this.list.get(t);
};
t.prototype.orderControllerById = function(t, e) {
for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
var o = this.getController(t);
if (null != o) return o.order.apply(o, i([ e ], n));
console.error("控制器（" + t + "）不存在");
};
return t = r([ a.default, o.default("ControllerService") ], t);
}();
n.default = s;
cc._RF.pop();
}, {
"../../Blade/Decorators/Service": "Service",
"../../Blade/Decorators/Singleton": "Singleton"
} ],
Controller: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "3d6e17a+zlFBYL8CmLWyjGX", "Controller");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.default = function(t) {
return function(e) {
Reflect.defineProperty(e.prototype, "alias", {
value: t
});
};
};
cc._RF.pop();
}, {} ],
Ease: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "7d32aO9+NJMTpOWn7VQOKZ6", "Ease");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.Ease = void 0;
var r = function() {
function t() {}
t.get = function(t) {
t < -1 && (t = -1);
t > 1 && (t = 1);
return function(e) {
return 0 == t ? e : t < 0 ? e * (e * -t + 1 + t) : e * ((2 - e) * t + (1 - t));
};
};
t.getPowIn = function(t) {
return function(e) {
return Math.pow(e, t);
};
};
t.getPowOut = function(t) {
return function(e) {
return 1 - Math.pow(1 - e, t);
};
};
t.getPowInOut = function(t) {
return function(e) {
return (e *= 2) < 1 ? .5 * Math.pow(e, t) : 1 - .5 * Math.abs(Math.pow(2 - e, t));
};
};
t.sineIn = function(t) {
return 1 - Math.cos(t * Math.PI / 2);
};
t.sineOut = function(t) {
return Math.sin(t * Math.PI / 2);
};
t.sineInOut = function(t) {
return -.5 * (Math.cos(Math.PI * t) - 1);
};
t.getBackIn = function(t) {
return function(e) {
return e * e * ((t + 1) * e - t);
};
};
t.getBackOut = function(t) {
return function(e) {
return --e * e * ((t + 1) * e + t) + 1;
};
};
t.getBackInOut = function(t) {
t *= 1.525;
return function(e) {
return (e *= 2) < 1 ? e * e * ((t + 1) * e - t) * .5 : .5 * ((e -= 2) * e * ((t + 1) * e + t) + 2);
};
};
t.circIn = function(t) {
return -(Math.sqrt(1 - t * t) - 1);
};
t.circOut = function(t) {
return Math.sqrt(1 - --t * t);
};
t.circInOut = function(t) {
return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
};
t.bounceIn = function(e) {
return 1 - t.bounceOut(1 - e);
};
t.bounceOut = function(t) {
return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
};
t.bounceInOut = function(e) {
return e < .5 ? .5 * t.bounceIn(2 * e) : .5 * t.bounceOut(2 * e - 1) + .5;
};
t.getElasticIn = function(t, e) {
var n = 2 * Math.PI;
return function(r) {
if (0 == r || 1 == r) return r;
var i = e / n * Math.asin(1 / t);
return -t * Math.pow(2, 10 * (r -= 1)) * Math.sin((r - i) * n / e);
};
};
t.getElasticOut = function(t, e) {
var n = 2 * Math.PI;
return function(r) {
if (0 == r || 1 == r) return r;
var i = e / n * Math.asin(1 / t);
return t * Math.pow(2, -10 * r) * Math.sin((r - i) * n / e) + 1;
};
};
t.getElasticInOut = function(t, e) {
var n = 2 * Math.PI;
return function(r) {
var i = e / n * Math.asin(1 / t);
return (r *= 2) < 1 ? t * Math.pow(2, 10 * (r -= 1)) * Math.sin((r - i) * n / e) * -.5 : t * Math.pow(2, -10 * (r -= 1)) * Math.sin((r - i) * n / e) * .5 + 1;
};
};
t.quadIn = t.getPowIn(2);
t.quadOut = t.getPowOut(2);
t.quadInOut = t.getPowInOut(2);
t.cubicIn = t.getPowIn(3);
t.cubicOut = t.getPowOut(3);
t.cubicInOut = t.getPowInOut(3);
t.quartIn = t.getPowIn(4);
t.quartOut = t.getPowOut(4);
t.quartInOut = t.getPowInOut(4);
t.quintIn = t.getPowIn(5);
t.quintOut = t.getPowOut(5);
t.quintInOut = t.getPowInOut(5);
t.backIn = t.getBackIn(1.7);
t.backOut = t.getBackOut(1.7);
t.backInOut = t.getBackInOut(1.7);
t.elasticIn = t.getElasticIn(1, .3);
t.elasticOut = t.getElasticOut(1, .3);
t.elasticInOut = t.getElasticInOut(1, .3 * 1.5);
return t;
}();
n.Ease = r;
cc._RF.pop();
}, {} ],
FbPlatform: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "0158aj4AXxJd4hOvl5AfgVg", "FbPlatform");
var r = this && this.__extends || function() {
var t = function(e, n) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
})(e, n);
};
return function(e, n) {
t(e, n);
function r() {
this.constructor = e;
}
e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r());
};
}(), i = this && this.__awaiter || function(t, e, n, r) {
function i(t) {
return t instanceof n ? t : new n(function(e) {
e(t);
});
}
return new (n || (n = Promise))(function(n, o) {
function a(t) {
try {
c(r.next(t));
} catch (t) {
o(t);
}
}
function s(t) {
try {
c(r.throw(t));
} catch (t) {
o(t);
}
}
function c(t) {
t.done ? n(t.value) : i(t.value).then(a, s);
}
c((r = r.apply(t, e || [])).next());
});
}, o = this && this.__generator || function(t, e) {
var n, r, i, o, a = {
label: 0,
sent: function() {
if (1 & i[0]) throw i[1];
return i[1];
},
trys: [],
ops: []
};
return o = {
next: s(0),
throw: s(1),
return: s(2)
}, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
return this;
}), o;
function s(t) {
return function(e) {
return c([ t, e ]);
};
}
function c(o) {
if (n) throw new TypeError("Generator is already executing.");
for (;a; ) try {
if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 
0) : r.next) && !(i = i.call(r, o[1])).done) return i;
(r = 0, i) && (o = [ 2 & o[0], i.value ]);
switch (o[0]) {
case 0:
case 1:
i = o;
break;

case 4:
a.label++;
return {
value: o[1],
done: !1
};

case 5:
a.label++;
r = o[1];
o = [ 0 ];
continue;

case 7:
o = a.ops.pop();
a.trys.pop();
continue;

default:
if (!(i = a.trys, i = i.length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
a = 0;
continue;
}
if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
a.label = o[1];
break;
}
if (6 === o[0] && a.label < i[1]) {
a.label = i[1];
i = o;
break;
}
if (i && a.label < i[2]) {
a.label = i[2];
a.ops.push(o);
break;
}
i[2] && a.ops.pop();
a.trys.pop();
continue;
}
o = e.call(t, a);
} catch (t) {
o = [ 6, t ];
r = 0;
} finally {
n = i = 0;
}
if (5 & o[0]) throw o[1];
return {
value: o[0] ? o[1] : void 0,
done: !0
};
}
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var a = t("../../Blade/Interfaces/IPlatform"), s = t("../../Module/Defines/PlatformConfig"), c = t("../Helpers/PromiseHelper"), u = function(t) {
r(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.video = null;
e.videoState = a.default.AdState.None;
e.interstitial = null;
e.interstitialState = a.default.AdState.None;
return e;
}
e.prototype.initialize = function() {
var t = FBInstant.player;
this.userInfo = {
avatar: t.getPhoto(),
nickname: t.getName(),
platform: FBInstant.getPlatform()
};
};
e.prototype.lazyInitialize = function() {};
e.prototype.getLaunchOptions = function() {
return FBInstant.getEntryPointData() || {};
};
e.prototype.isSupportRewardVideo = function() {
return -1 !== FBInstant.getSupportedAPIs().indexOf("getRewardedVideoAsync");
};
e.prototype.isVideoLoaded = function() {
return this.videoState == a.default.AdState.Loaded;
};
e.prototype.preloadRewardVideo = function() {
return i(this, void 0, Promise, function() {
var t, e, n, r = this;
return o(this, function(i) {
switch (i.label) {
case 0:
return this.videoState == a.default.AdState.Loaded ? [ 2 ] : this.videoState != a.default.AdState.Loading ? [ 3, 2 ] : [ 4, c.default.waitUntil(function() {
return r.videoState != a.default.AdState.Loading;
}) ];

case 1:
return [ 2, i.sent() ];

case 2:
this.videoState = a.default.AdState.Loading;
i.label = 3;

case 3:
i.trys.push([ 3, 10, , 11 ]);
if (null != this.video) return [ 3, 8 ];
if (!this.isSupportRewardVideo()) return [ 3, 5 ];
t = this;
return [ 4, FBInstant.getRewardedVideoAsync(s.default.fb.videoId) ];

case 4:
t.video = i.sent();
return [ 3, 8 ];

case 5:
if (!this.isSupportInterstitial()) return [ 3, 7 ];
e = this;
return [ 4, FBInstant.getInterstitialAdAsync(s.default.fb.interstitialId) ];

case 6:
e.video = i.sent();
return [ 3, 8 ];

case 7:
throw new Error();

case 8:
return [ 4, this.video.loadAsync() ];

case 9:
i.sent();
this.videoState = a.default.AdState.Loaded;
return [ 3, 11 ];

case 10:
n = i.sent();
console.log(n);
this.videoState = a.default.AdState.None;
return [ 3, 11 ];

case 11:
return [ 2 ];
}
});
});
};
e.prototype.playRewardVideo = function() {
return i(this, void 0, Promise, function() {
var t, e, n = this;
return o(this, function(r) {
switch (r.label) {
case 0:
r.trys.push([ 0, 3, 4, 5 ]);
if (null == this.video || this.videoState == a.default.AdState.None) {
console.log("未广告实例或者未加载完成");
throw new Error();
}
t = 5;
e = Date.now();
return [ 4, c.default.waitUntil(function() {
return (t -= (Date.now() - e) / 1e3) <= 0 || n.videoState == a.default.AdState.Loaded;
}) ];

case 1:
r.sent();
return [ 4, this.video.showAsync() ];

case 2:
r.sent();
return [ 2, !0 ];

case 3:
r.sent();
return [ 2, !1 ];

case 4:
this.videoState = a.default.AdState.None;
this.video = null;
this.preloadRewardVideo();
return [ 7 ];

case 5:
return [ 2 ];
}
});
});
};
e.prototype.isSupportInterstitial = function() {
return -1 !== FBInstant.getSupportedAPIs().indexOf("getInterstitialAdAsync");
};
e.prototype.isInterstitialLoaded = function() {
return this.interstitialState == a.default.AdState.Loaded;
};
e.prototype.preloadInterstitial = function() {
return i(this, void 0, Promise, function() {
var t, e, n = this;
return o(this, function(r) {
switch (r.label) {
case 0:
return this.isSupportInterstitial() ? this.interstitialState == a.default.AdState.Loaded ? [ 2 ] : this.interstitialState != a.default.AdState.Loading ? [ 3, 2 ] : [ 4, c.default.waitUntil(function() {
return n.interstitialState != a.default.AdState.Loading;
}) ] : [ 2 ];

case 1:
return [ 2, r.sent() ];

case 2:
this.interstitialState = a.default.AdState.Loading;
r.label = 3;

case 3:
r.trys.push([ 3, 7, , 8 ]);
if (null != this.interstitial) return [ 3, 5 ];
t = this;
return [ 4, FBInstant.getInterstitialAdAsync(s.default.fb.interstitialId) ];

case 4:
t.interstitial = r.sent();
r.label = 5;

case 5:
return [ 4, this.interstitial.loadAsync() ];

case 6:
r.sent();
this.interstitialState = a.default.AdState.Loaded;
return [ 3, 8 ];

case 7:
e = r.sent();
this.interstitialState = a.default.AdState.None;
console.log(e);
return [ 3, 8 ];

case 8:
return [ 2 ];
}
});
});
};
e.prototype.showInterstitial = function() {
return i(this, void 0, Promise, function() {
var t, e, n = this;
return o(this, function(r) {
switch (r.label) {
case 0:
r.trys.push([ 0, 3, 4, 5 ]);
if (null == this.interstitial || this.interstitialState == a.default.AdState.None) {
console.log("未广告实例或者未加载完成");
throw new Error();
}
t = 5;
e = Date.now();
return [ 4, c.default.waitUntil(function() {
return (t -= (Date.now() - e) / 1e3) <= 0 || n.interstitialState == a.default.AdState.Loaded;
}) ];

case 1:
r.sent();
return [ 4, this.interstitial.showAsync() ];

case 2:
r.sent();
return [ 2, !0 ];

case 3:
r.sent();
return [ 2, !1 ];

case 4:
this.interstitialState = a.default.AdState.None;
this.interstitial = null;
this.preloadInterstitial();
return [ 7 ];

case 5:
return [ 2 ];
}
});
});
};
e.prototype.sendInvite = function(t, e, n) {
void 0 === e && (e = "Do you want to play a game?");
return i(this, void 0, Promise, function() {
var r, i, a;
return o(this, function(o) {
switch (o.label) {
case 0:
i = (r = FBInstant).shareAsync;
a = {
intent: "INVITE"
};
return [ 4, this.getImageBase64(t) ];

case 1:
return [ 4, i.apply(r, [ (a.image = o.sent(), a.text = e, a.data = n, a) ]) ];

case 2:
o.sent();
return [ 2 ];
}
});
});
};
e.prototype.getImageBase64 = function(t) {
return i(this, void 0, void 0, function() {
var e, n, r, i;
return o(this, function(o) {
switch (o.label) {
case 0:
return [ 4, c.default.loadRemote(t) ];

case 1:
e = o.sent();
n = document.createElement("canvas");
r = n.getContext("2d");
i = e.getHtmlElementObj();
n.width = e.width;
n.height = e.height;
r.drawImage(i, 0, 0, n.width, n.height);
return [ 2, n.toDataURL("image/png") ];
}
});
});
};
return e;
}(a.default);
n.default = u;
cc._RF.pop();
}, {
"../../Blade/Interfaces/IPlatform": "IPlatform",
"../../Module/Defines/PlatformConfig": "PlatformConfig",
"../Helpers/PromiseHelper": "PromiseHelper"
} ],
GPPlatform: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "82d7d92VrBI97juHhq6UvDq", "GPPlatform");
var r = this && this.__extends || function() {
var t = function(e, n) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
})(e, n);
};
return function(e, n) {
t(e, n);
function r() {
this.constructor = e;
}
e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r());
};
}(), i = this && this.__spreadArrays || function() {
for (var t = 0, e = 0, n = arguments.length; e < n; e++) t += arguments[e].length;
var r = Array(t), i = 0;
for (e = 0; e < n; e++) for (var o = arguments[e], a = 0, s = o.length; a < s; a++, 
i++) r[i] = o[a];
return r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = t("../Interfaces/IPlatform"), a = t("../../Module/Defines/PlatformConfig"), s = t("../Helpers/PromiseHelper"), c = function(t) {
r(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.videoPreloadState = o.default.AdState.None;
e.bannerPreloadState = o.default.AdState.None;
e.interstitialPreloadState = o.default.AdState.None;
e.videoCallback = null;
return e;
}
e.prototype.initialize = function() {
this.callNative("initialize", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", a.default.as.appId, a.default.as.bannerId, a.default.as.interstitialId);
};
e.prototype.lazyInitialize = function() {};
e.prototype.isSupportRewardVideo = function() {
return !0;
};
e.prototype.preloadRewardVideo = function() {
var t = this;
if (this.videoPreloadState == o.default.AdState.Loading) return s.default.waitUntil(function() {
return t.videoPreloadState != o.default.AdState.Loading;
});
if (this.videoPreloadState == o.default.AdState.Loaded) return Promise.resolve();
if (this.videoPreloadState == o.default.AdState.None) {
this.callNative("preloadVideo", "(Ljava/lang/String;)V", a.default.as.adId);
this.videoPreloadState = o.default.AdState.Loading;
}
return s.default.waitUntil(function() {
return t.videoPreloadState != o.default.AdState.Loading;
});
};
e.prototype.playRewardVideo = function() {
var t = this;
if (this.videoPreloadState != o.default.AdState.Loaded) return Promise.resolve(!1);
this.callNative("showVideo", "()V");
if (null != this.videoCallback) {
this.videoCallback(!1);
this.videoCallback = null;
return new Promise(function(e, n) {
t.videoCallback = function(t) {
e(t);
};
});
}
};
e.prototype.isVideoLoaded = function() {
return this.videoPreloadState == o.default.AdState.Loaded;
};
e.prototype.isSupportBanner = function() {
return !0;
};
e.prototype.preloadBanner = function() {
var t = this;
if (this.bannerPreloadState == o.default.AdState.Loading) return s.default.waitUntil(function() {
return t.bannerPreloadState != o.default.AdState.Loading;
});
if (this.bannerPreloadState == o.default.AdState.Loaded) return Promise.resolve();
if (this.bannerPreloadState == o.default.AdState.None) {
this.callNative("preloadBanner", "()V");
this.bannerPreloadState = o.default.AdState.Loading;
}
return s.default.waitUntil(function() {
return t.bannerPreloadState != o.default.AdState.Loading;
});
};
e.prototype.activeBanner = function(t) {
t ? this.callNative("showBanner", "()V") : this.callNative("hideBanner", "()V");
};
e.prototype.isSupportInterstitial = function() {
return !0;
};
e.prototype.isInterstitialLoaded = function() {
return this.interstitialPreloadState == o.default.AdState.Loaded;
};
e.prototype.preloadInterstitial = function() {
var t = this;
if (this.interstitialPreloadState == o.default.AdState.Loaded) return Promise.resolve();
this.interstitialPreloadState == o.default.AdState.None && this.callNative("preloadInterstitial", "(Ljava/lang/String;)V", a.default.as.interstitialId);
return s.default.waitUntil(function() {
return t.interstitialPreloadState != o.default.AdState.Loading;
});
};
e.prototype.showInterstitial = function() {
this.callNative("showInterstitial", "()V");
};
e.prototype.callNative = function(t, e) {
for (var n, r = [], o = 2; o < arguments.length; o++) r[o - 2] = arguments[o];
(n = jsb.reflection).callStaticMethod.apply(n, i([ "com/external/jsapi/AdmobHelper", t, e ], r));
};
e.prototype.onRewardedVideoAdLoaded = function() {
cc.log("onRewardedVideoAdLoaded");
this.videoPreloadState = o.default.AdState.Loaded;
};
e.prototype.onRewardedVideoAdFailedToLoad = function(t) {
cc.log("onRewardedVideoAdFailedToLoad:" + t);
this.videoPreloadState = o.default.AdState.None;
};
e.prototype.onRewardedVideoRewarded = function() {
cc.log("onRewardedVideoRewarded");
if (null != this.videoCallback) {
this.videoCallback(!0);
this.videoCallback = null;
}
};
e.prototype.onRewardedVideoAdOpened = function() {
this.videoPreloadState = o.default.AdState.None;
};
e.prototype.onRewardedVideoStarted = function() {};
e.prototype.onRewardedVideoAdClosed = function() {
this.preloadRewardVideo();
if (null != this.videoCallback) {
this.videoCallback(!1);
this.videoCallback = null;
}
};
e.prototype.onBannerLoaded = function() {
cc.log("onBannerLoaded");
this.bannerPreloadState = o.default.AdState.Loaded;
};
e.prototype.onBannerFailedToLoad = function(t) {
cc.log("onBannerFailedToLoad:" + t);
this.bannerPreloadState = o.default.AdState.None;
};
e.prototype.onBannerOpened = function() {
cc.log("onBannerOpened");
};
e.prototype.onInterstitialLoaded = function() {
this.interstitialPreloadState = o.default.AdState.Loaded;
};
e.prototype.onInterstitialFailedToLoad = function(t) {
cc.log("onInterstitialFailedToLoad:" + t);
this.interstitialPreloadState, o.default.AdState.None;
this.preloadInterstitial();
};
e.prototype.onInterstitialOpened = function() {};
e.prototype.onInterstitialClosed = function() {
this.interstitialPreloadState = o.default.AdState.None;
this.preloadInterstitial();
};
return e;
}(o.default);
n.default = c;
cc._RF.pop();
}, {
"../../Module/Defines/PlatformConfig": "PlatformConfig",
"../Helpers/PromiseHelper": "PromiseHelper",
"../Interfaces/IPlatform": "IPlatform"
} ],
GameEvent: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "cac53bqselAMYtsC/no4Y++", "GameEvent");
Object.defineProperty(n, "__esModule", {
value: !0
});
var r;
r || (r = {});
n.default = r;
cc._RF.pop();
}, {} ],
GameModel: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "74511WnNPZKFrt4COci0vOw", "GameModel");
var r = this && this.__extends || function() {
var t = function(e, n) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
})(e, n);
};
return function(e, n) {
t(e, n);
function r() {
this.constructor = e;
}
e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r());
};
}(), i = this && this.__decorate || function(t, e, n, r) {
var i, o = arguments.length, a = o < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, n, r); else for (var s = t.length - 1; s >= 0; s--) (i = t[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(e, n, a) : i(e, n)) || a);
return o > 3 && a && Object.defineProperty(e, n, a), a;
}, o = this && this.__metadata || function(t, e) {
if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(t, e);
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var a = t("../../Blade/Interfaces/IModel"), s = t("../../Blade/Decorators/Model"), c = function(t) {
r(e, t);
function e(e) {
void 0 === e && (e = 0);
var n = t.call(this) || this;
n.data1 = e;
return n;
}
return e = i([ s.default("GameModel"), o("design:paramtypes", [ Object ]) ], e);
}(a.default);
n.default = c;
cc._RF.pop();
}, {
"../../Blade/Decorators/Model": "Model",
"../../Blade/Interfaces/IModel": "IModel"
} ],
HttpHelper: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "c18de+5kAFLtq0BU/jYo3z2", "HttpHelper");
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = t("../../Blade/Services/PlatformService"), i = function() {
function t() {}
t.Request = function(e, n) {
return new Promise(function(i, o) {
(n = n || {}).method = n.method || "GET";
n.contentType = n.contentType || "JSON";
n.dataType = n.dataType || "JSON";
"object" != typeof n.headers && (n.headers = null);
if (blade.platform.getType() == r.default.PlatformType.WX) {
if ("JSON" != n.contentType) {
n.headers = n.headers || {};
n.headers["Content-Type"] = "application/x-www-form-urlencoded; charset=utf-8";
}
wx.request({
url: e,
method: n.method,
data: n.data,
header: n.headers || {},
responseType: "text",
dataType: n.dataType.toLowerCase(),
success: function(t) {
return 200 == t.statusCode ? i(t.data) : o({
status: t.statusCode,
errMsg: t.errMsg
});
},
fail: function(t) {
return o(t);
}
});
} else {
var a = new XMLHttpRequest();
a.onreadystatechange = function() {
if (4 == a.readyState) {
if (a.status >= 200 && a.status < 400) {
var t, e = a.responseText;
if ("TEXT" == n.dataType) return i(e);
try {
t = JSON.parse(e);
} catch (t) {}
return i(t);
}
return o(a.status);
}
};
var s = null, c = n.headers || {};
if (n.data) if ("GET" === n.method) {
c["Content-Type"] = "application/x-www-form-urlencoded; charset=utf-8";
e += t.formatParams(n.data, !0);
} else if ("POST" === n.method) if ("JSON" === n.contentType) {
c["Content-Type"] = "application/json; charset=utf-8";
s = JSON.stringify(n.data);
} else {
c["Content-Type"] = "application/x-www-form-urlencoded; charset=utf-8";
s = t.formatParams2FromData(n.data);
}
a.open(n.method, e, !0);
for (var u in c) "string" == typeof c[u] && a.setRequestHeader(u, c[u]);
a.send(s);
}
});
};
t.formatParams = function(t, e) {
void 0 === e && (e = !1);
return Object.keys(t).length > 0 ? (e ? "?" : "") + Object.keys(t).map(function(e) {
return e + "=" + encodeURIComponent(t[e]);
}).join("&") : "";
};
t.formatParams2FromData = function(t) {
var e = new FormData();
for (var n in t) e.append(n, t[n]);
return e;
};
t.getUrlParam = function(t) {
if (void 0 != typeof window) {
var e = new RegExp("(^|&)" + t + "=([^&]*)(&|$)"), n = window.location.search.substr(1).match(e);
if (null != n) return unescape(n[2]);
}
return null;
};
t.getQueryParams = function() {
if (void 0 != typeof window) {
var t = window.location.search || "";
t = t.split("+").join(" ");
for (var e = {}, n = /[?&]?([^=]+)=([^&]*)/g, r = void 0; r = n.exec(t); ) e[decodeURIComponent(r[1])] = decodeURIComponent(r[2]);
return e;
}
return {};
};
return t;
}();
n.default = i;
cc._RF.pop();
}, {
"../../Blade/Services/PlatformService": "PlatformService"
} ],
ICommand: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "fb81dxqDnVHQILiDPvLKg4E", "ICommand");
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = function() {
return function() {};
}();
n.default = r;
cc._RF.pop();
}, {} ],
IController: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "3f539zsgv9GcInhZ2oAneoX", "IController");
var r = this && this.__extends || function() {
var t = function(e, n) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
})(e, n);
};
return function(e, n) {
t(e, n);
function r() {
this.constructor = e;
}
e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r());
};
}(), i = this && this.__spreadArrays || function() {
for (var t = 0, e = 0, n = arguments.length; e < n; e++) t += arguments[e].length;
var r = Array(t), i = 0;
for (e = 0; e < n; e++) for (var o = arguments[e], a = 0, s = o.length; a < s; a++, 
i++) r[i] = o[a];
return r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = function(t) {
r(e, t);
function e() {
return null !== t && t.apply(this, arguments) || this;
}
e.prototype.onLoad = function() {
blade.ctrl.register(this);
blade.ticker.register(this);
this.onRegister && this.onRegister();
};
e.prototype.onDestroy = function() {
this.onUnRegister && this.onUnRegister();
blade.ctrl.unregister(this);
blade.ticker.unregister(this);
};
e.prototype.order = function(t) {
for (var e, n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];
if ("function" == typeof this[t]) return (e = this[t]).call.apply(e, i([ this ], n));
console.error("调用" + this.alias + "不存在的方法" + t);
};
e.COMMAND_META = "command";
return e;
}(cc.Component);
n.default = o;
cc._RF.pop();
}, {} ],
IFrameWork: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "fa96a5eNdRNgr4VIMm/523C", "IFrameWork");
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = function() {
function t() {}
t.prototype.initialize = function() {
var t = this;
Object.getOwnPropertyNames(this).filter(function(e) {
return t[e].initialize;
}).forEach(function(e) {
t[e].initialize();
});
};
t.prototype.lazyInitialize = function() {
var t = this;
Object.getOwnPropertyNames(this).filter(function(e) {
return t[e].lazyInitialize;
}).forEach(function(e) {
t[e].lazyInitialize();
});
};
return t;
}();
n.default = r;
cc._RF.pop();
}, {} ],
IModel: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "160e0sShMtM5ZtTexQ7HMVH", "IModel");
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = function() {
function t() {}
t.prototype.on = function(t, e, n) {
blade.model.on(this, t, e, n);
};
t.prototype.off = function(t, e, n) {
blade.model.off(this, t, e, n);
};
return t;
}();
n.default = r;
cc._RF.pop();
}, {} ],
IPlatform: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "f3a7d7Zf/9IiooHRImowBrJ", "IPlatform");
var r = this && this.__extends || function() {
var t = function(e, n) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
})(e, n);
};
return function(e, n) {
t(e, n);
function r() {
this.constructor = e;
}
e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r());
};
}(), i = this && this.__spreadArrays || function() {
for (var t = 0, e = 0, n = arguments.length; e < n; e++) t += arguments[e].length;
var r = Array(t), i = 0;
for (e = 0; e < n; e++) for (var o = arguments[e], a = 0, s = o.length; a < s; a++, 
i++) r[i] = o[a];
return r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = function(t) {
r(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.userInfo = null;
return e;
}
e.prototype.call = function(t) {
for (var e, n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];
return "function" == typeof this[t] ? (e = this[t]).call.apply(e, i([ this ], n)) : null;
};
e.prototype.getArchive = function(t) {
return cc.sys.localStorage.getItem(t);
};
e.prototype.saveArchive = function(t, e) {
cc.sys.localStorage.setItem(t, e);
};
e.prototype.checkForUpdate = function() {
return Promise.resolve();
};
e.prototype.isSupportRewardVideo = function() {
return !1;
};
e.prototype.preloadRewardVideo = function() {
return Promise.resolve();
};
e.prototype.playRewardVideo = function() {
return Promise.resolve(!1);
};
e.prototype.isVideoLoaded = function() {
return !1;
};
e.prototype.isSupportBanner = function() {
return !1;
};
e.prototype.preloadBanner = function() {
return Promise.resolve();
};
e.prototype.activeBanner = function(t) {};
e.prototype.isSupportInterstitial = function() {
return !1;
};
e.prototype.isInterstitialLoaded = function() {
return !1;
};
e.prototype.preloadInterstitial = function() {
return Promise.resolve();
};
e.prototype.showInterstitial = function() {};
e.prototype.getUserInfo = function() {
return this.userInfo;
};
e.prototype.getLaunchOptions = function() {
return {};
};
e.prototype.sendInvite = function(t, e, n) {
return Promise.resolve();
};
e.prototype.vibrate = function(t) {
void 0 === t && (t = !0);
};
return e;
}(cc.EventTarget);
(function(t) {
(function(t) {
t[t.None = 0] = "None";
t[t.Loading = 1] = "Loading";
t[t.Loaded = 2] = "Loaded";
t[t.Opening = 3] = "Opening";
})(t.AdState || (t.AdState = {}));
(function(t) {
t.OnShow = "OnShow";
t.OpenVideo = "OpenVideo";
t.CloseVideo = "CloseVideo";
t.OpenBanner = "OpenBanner";
t.CloseBanner = "CloseBanner";
t.OpenInterstitial = "OpenInterstitial";
t.CloseInterstitial = "CloseInterstitial";
t.OpenShare = "OpenShare";
})(t.EventType || (t.EventType = {}));
})(o || (o = {}));
n.default = o;
cc._RF.pop();
}, {} ],
IPopup: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "11a26gZyFtBnJSURZ0X7aad", "IPopup");
var r = this && this.__extends || function() {
var t = function(e, n) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
})(e, n);
};
return function(e, n) {
t(e, n);
function r() {
this.constructor = e;
}
e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r());
};
}(), i = this && this.__decorate || function(t, e, n, r) {
var i, o = arguments.length, a = o < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, n, r); else for (var s = t.length - 1; s >= 0; s--) (i = t[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(e, n, a) : i(e, n)) || a);
return o > 3 && a && Object.defineProperty(e, n, a), a;
}, o = this && this.__metadata || function(t, e) {
if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(t, e);
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var a = t("../Libs/Tween/Tween"), s = t("../../Blade/Services/PopupService"), c = t("../Libs/Tween/Ease"), u = cc._decorator, l = u.ccclass, f = u.property, p = function(t) {
r(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.buttonConfirm = null;
e.buttonCancel = null;
return e;
}
n = e;
e.prototype.onLoad = function() {
blade.ticker.register(this);
this.buttonConfirm && this.buttonConfirm.node.on(cc.Node.EventType.TOUCH_END, this.onConfirm, this);
this.buttonCancel && this.buttonCancel.node.on(cc.Node.EventType.TOUCH_END, this.onCancel, this);
this.onRegister && this.onRegister();
};
e.prototype.onConfirm = function() {
this.node.emit(s.default.EventType.POPUP_CLICK, n.EventType.Confirm, this);
};
e.prototype.onCancel = function() {
this.node.emit(s.default.EventType.POPUP_CLICK, n.EventType.Cancel, this);
};
e.prototype.onDestroy = function() {
this.onUnRegister && this.onUnRegister();
blade.ticker.unregister(this);
};
e.prototype.appear = function() {
var t = this;
return new Promise(function(e, n) {
t.node.y = 150;
t.node.active = !0;
a.default.get(t.node).to({
y: 0
}, 400, c.Ease.backOut).call(e);
});
};
e.prototype.disappear = function() {
var t = this;
return new Promise(function(e, n) {
a.default.get(t.node).to({
y: 250
}, 400, c.Ease.backIn).call(function() {
t.node.active = !1;
e();
});
});
};
e.prototype.onDisappear = function() {
a.default.removeTweens(this.node);
this.node.destroy();
};
e.prototype.submit = function(t) {
this.node.emit(s.default.EventType.POPUP_CLICK, t, this.node);
};
e.prototype.onTick = function(t) {};
var n, u, p;
i([ f({
type: cc.Button,
tooltip: "确认按钮"
}), o("design:type", "function" == typeof (u = "undefined" != typeof cc && cc.Button) ? u : Object) ], e.prototype, "buttonConfirm", void 0);
i([ f({
type: cc.Button,
tooltip: "取消按钮"
}), o("design:type", "function" == typeof (p = "undefined" != typeof cc && cc.Button) ? p : Object) ], e.prototype, "buttonCancel", void 0);
return e = n = i([ l ], e);
}(cc.Component);
(function(t) {
(function(t) {
t.Confirm = "confirm";
t.Cancel = "cancel";
})(t.EventType || (t.EventType = {}));
})(p || (p = {}));
n.default = p;
cc._RF.pop();
}, {
"../../Blade/Services/PopupService": "PopupService",
"../Libs/Tween/Ease": "Ease",
"../Libs/Tween/Tween": "Tween"
} ],
IService: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "276701eUYFEU4fxecRWukp5", "IService");
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = function() {
return function() {};
}();
n.default = r;
cc._RF.pop();
}, {} ],
ITicker: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "5ad38JQTn1OYq5DHlK1roXq", "ITicker");
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = function() {
return function() {};
}();
n.default = r;
cc._RF.pop();
}, {} ],
IView: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "a52d6tSJdRGDIwf/788NE6l", "IView");
var r = this && this.__extends || function() {
var t = function(e, n) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
})(e, n);
};
return function(e, n) {
t(e, n);
function r() {
this.constructor = e;
}
e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r());
};
}(), i = this && this.__spreadArrays || function() {
for (var t = 0, e = 0, n = arguments.length; e < n; e++) t += arguments[e].length;
var r = Array(t), i = 0;
for (e = 0; e < n; e++) for (var o = arguments[e], a = 0, s = o.length; a < s; a++, 
i++) r[i] = o[a];
return r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = function(t) {
r(e, t);
function e() {
return null !== t && t.apply(this, arguments) || this;
}
e.prototype.onLoad = function() {
blade.view.register(this);
blade.ticker.register(this);
this.onRegister && this.onRegister();
};
e.prototype.onDestroy = function() {
this.onUnRegister && this.onUnRegister();
blade.view.unregister(this);
blade.ticker.unregister(this);
};
e.prototype.order = function(t) {
for (var e, n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];
if ("function" == typeof this[t]) return (e = this[t]).call.apply(e, i([ this ], n));
console.error("调用" + this.alias + "不存在的方法" + t);
};
e.ACTION_META = "action";
return e;
}(cc.Component);
n.default = o;
cc._RF.pop();
}, {} ],
ListView: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "214112pKE5MZrue95ar30sx", "ListView");
var r = this && this.__extends || function() {
var t = function(e, n) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
})(e, n);
};
return function(e, n) {
t(e, n);
function r() {
this.constructor = e;
}
e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r());
};
}(), i = this && this.__decorate || function(t, e, n, r) {
var i, o = arguments.length, a = o < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, n, r); else for (var s = t.length - 1; s >= 0; s--) (i = t[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(e, n, a) : i(e, n)) || a);
return o > 3 && a && Object.defineProperty(e, n, a), a;
}, o = this && this.__metadata || function(t, e) {
if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(t, e);
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var a = cc._decorator, s = a.ccclass, c = a.property, u = a.menu, l = a.disallowMultiple, f = a.requireComponent, p = function(t) {
r(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.itemTemplate = null;
e.spacing = 1;
e.spawnCount = 2;
e.scrollView = null;
e.content = null;
e.adapter = null;
e._items = new cc.NodePool();
e._filledIds = {};
e.horizontal = !1;
e._itemHeight = 1;
e._itemWidth = 1;
e._itemsVisible = 1;
e.lastStartIndex = -1;
e.scrollTopNotifyed = !1;
e.scrollBottomNotifyed = !1;
e.pullDownCallback = null;
e.pullUpCallback = null;
return e;
}
n = e;
e.prototype.onLoad = function() {
this.scrollView = this.node.getComponent(cc.ScrollView);
if (this.scrollView) {
this.content = this.scrollView.content;
this.horizontal = this.scrollView.horizontal;
if (this.horizontal) {
this.scrollView.vertical = !1;
this.content.anchorX = 0;
this.content.anchorY = .5;
this.content.x = 0 - this.content.getParent().width * this.content.getParent().anchorX;
} else {
this.scrollView.vertical = !0;
this.content.anchorX = .5;
this.content.anchorY = 1;
this.content.y = this.content.getParent().height * this.content.getParent().anchorY;
}
} else console.error("ListView need a scrollView for showing.");
var t = this._items.get() || cc.instantiate(this.itemTemplate);
this._items.put(t);
this._itemHeight = t.height || 10;
this._itemWidth = t.width || 10;
n.updateAlignment(this.content);
this.horizontal ? this._itemsVisible = Math.ceil(this.content.getParent().width / (this._itemWidth + this.spacing)) : this._itemsVisible = Math.ceil(this.content.getParent().height / (this._itemHeight + this.spacing));
console.log("可见区域的item数量为:", this._itemsVisible);
this.adjustEvent();
};
e.prototype.start = function() {
this.content && this.notifyUpdate();
};
e.updateAlignment = function(t) {
for (var e = t.getParent(), n = []; e && !(e instanceof cc.Scene); ) {
var r = e.getComponent(cc.Widget);
r && n.push(r);
e = e.getParent();
}
for (;n.length > 0; ) {
n.pop().updateAlignment();
}
};
e.prototype.setAdapter = function(t) {
this.adapter = t;
null != this.adapter ? null != this.itemTemplate ? this.content && this.notifyUpdate() : console.error("Listview 未设置待显示的Item模板.") : console.warn("adapter 为空.");
};
e.prototype.getItemIndex = function(t) {
return Math.floor(Math.abs(t / (this._itemHeight + this.spacing)));
};
e.prototype.getPositionInView = function(t) {
var e = t.getParent().convertToWorldSpaceAR(t.position);
return this.scrollView.node.convertToNodeSpaceAR(e);
};
e.prototype.notifyUpdate = function(t) {
var e = this;
if (null != this.adapter) {
t && t.length > 0 ? t.forEach(function(t) {
e._filledIds.hasOwnProperty(t) && delete e._filledIds[t];
}) : Object.keys(this._filledIds).forEach(function(t) {
delete e._filledIds[t];
});
this.recycleAll();
this.horizontal ? this.content.width = this.adapter.getCount() * (this._itemWidth + this.spacing) - this.spacing : this.content.height = this.adapter.getCount() * (this._itemHeight + this.spacing) - this.spacing;
this.scrollToTop();
this.lastStartIndex = -1;
this.updateView(0);
}
};
e.prototype.toIndex = function(t) {
this.horizontal ? this.scrollView.scrollToPercentHorizontal(1 - t / this.adapter.getCount()) : this.scrollView.scrollToPercentVertical(1 - t / this.adapter.getCount());
};
e.prototype.toNext = function() {
this.horizontal ? this.scrollView.scrollToPercentHorizontal(-this.scrollView.getScrollOffset().x / this.scrollView.getMaxScrollOffset().x + 1 / this.adapter.getCount(), .3) : this.scrollView.scrollToPercentVertical(-this.scrollView.getScrollOffset().y / this.scrollView.getMaxScrollOffset().y + 1 / this.adapter.getCount(), .3);
};
e.prototype.toPre = function() {
this.horizontal ? this.scrollView.scrollToPercentHorizontal(-this.scrollView.getScrollOffset().x / this.scrollView.getMaxScrollOffset().x - 1 / this.adapter.getCount(), .3) : this.scrollView.scrollToPercentVertical(-this.scrollView.getScrollOffset().y / this.scrollView.getMaxScrollOffset().y - 1 / this.adapter.getCount(), .3);
};
e.prototype.scrollToTop = function(t) {
void 0 === t && (t = !1);
this.scrollView.scrollToTop(t ? 1 : 0);
};
e.prototype.scrollToBottom = function(t) {
void 0 === t && (t = !1);
this.scrollView.scrollToBottom(t ? 1 : 0);
};
e.prototype.scrollToLeft = function(t) {
void 0 === t && (t = !1);
this.scrollView.scrollToLeft(t ? 1 : 0);
};
e.prototype.scrollToRight = function(t) {
void 0 === t && (t = !1);
this.scrollView.scrollToRight(t ? 1 : 0);
};
e.prototype.pullDown = function(t, e) {
this.pullDownCallback = t.bind(e);
};
e.prototype.pullUp = function(t, e) {
this.pullUpCallback = t.bind(e);
};
e.prototype.update = function(t) {
var e = this.checkNeedUpdate();
e >= 0 && this.updateView(e);
};
e.prototype._layoutVertical = function(t, e) {
this.content.addChild(t);
t._tag = e;
this._filledIds[e] = e;
t.setPosition(0, -t.height * (.5 + e) - this.spacing * e);
};
e.prototype._layoutHorizontal = function(t, e) {
this.content.addChild(t);
t._tag = e;
this._filledIds[e] = e;
t.setPosition(t.width * (t.anchorX + e) + this.spacing * e, 0);
};
e.prototype.getRecycleItems = function(t, e) {
var n = this, r = [];
this.content.children.forEach(function(i) {
if (i._tag < t || i._tag > e) {
r.push(i);
delete n._filledIds[i._tag];
}
});
return r;
};
e.prototype.recycleAll = function() {
var t = this, e = this.content.children;
this.content.removeAllChildren();
e.forEach(function(e) {
t._items.put(e);
});
};
e.prototype.updateView = function(t) {
var e = this, n = t, r = n + this._itemsVisible + (this.spawnCount || 2), i = this.adapter.getCount();
if (!(n >= i)) {
if (r > i) {
r = i;
if (n > 0 && !this.scrollBottomNotifyed) {
this.notifyScrollToBottom();
this.scrollBottomNotifyed = !0;
}
} else this.scrollBottomNotifyed = !1;
this.getRecycleItems(n - (this.spawnCount || 2), r).forEach(function(t) {
e._items.put(t);
});
for (var o = 0, a = this.findUpdateIndex(n, r); o < a.length; o++) {
var s = a[o], c = this.adapter._getView(this._items.get() || cc.instantiate(this.itemTemplate), s);
this.horizontal ? this._layoutHorizontal(c, s) : this._layoutVertical(c, s);
}
}
};
e.prototype.checkNeedUpdate = function() {
if (null == this.adapter) return -1;
var t = this.horizontal ? -this.content.x - this.content.getParent().width * this.content.getParent().anchorX : this.content.y - this.content.getParent().height * this.content.getParent().anchorY, e = Math.floor(t / ((this.horizontal ? this._itemWidth : this._itemHeight) + this.spacing));
if (e < 0 && !this.scrollTopNotifyed) {
this.notifyScrollToTop();
this.scrollTopNotifyed = !0;
return 0;
}
e > 0 && (this.scrollTopNotifyed = !1);
if (this.lastStartIndex != e) {
this.lastStartIndex = e;
return e;
}
return -1;
};
e.prototype.findUpdateIndex = function(t, e) {
for (var n = [], r = t; r < e; r++) this._filledIds.hasOwnProperty(r) || n.push(r);
return n;
};
e.prototype.notifyScrollToTop = function() {
!this.adapter || this.adapter.getCount() <= 0 || this.pullDownCallback && this.pullDownCallback();
};
e.prototype.notifyScrollToBottom = function() {
!this.adapter || this.adapter.getCount() <= 0 || this.pullUpCallback && this.pullUpCallback();
};
e.prototype.adjustEvent = function() {
var t = this;
this.content.on(cc.Node.EventType.TOUCH_END, function() {
t.scrollTopNotifyed = !1;
t.scrollBottomNotifyed = !1;
}, this);
this.content.on(cc.Node.EventType.TOUCH_CANCEL, function() {
t.scrollTopNotifyed = !1;
t.scrollBottomNotifyed = !1;
}, this);
};
var n, a;
i([ c(cc.Prefab), o("design:type", "function" == typeof (a = "undefined" != typeof cc && cc.Prefab) ? a : Object) ], e.prototype, "itemTemplate", void 0);
i([ c, o("design:type", Number) ], e.prototype, "spacing", void 0);
i([ c, o("design:type", Number) ], e.prototype, "spawnCount", void 0);
return e = n = i([ s, u("UI 组件/ListView"), l, f(cc.ScrollView) ], e);
}(cc.Component);
(function(t) {
var e = function() {
function t() {
this.dataSet = [];
}
t.prototype.setDataSet = function(t) {
this.dataSet = t;
};
t.prototype.getCount = function() {
return this.dataSet.length;
};
t.prototype.getItemData = function(t) {
return this.dataSet[t];
};
t.prototype._getView = function(t, e) {
this.updateView(t, e);
return t;
};
return t;
}();
t.AbstractAdapter = e;
})(p || (p = {}));
n.default = p;
cc._RF.pop();
}, {} ],
LoadingView: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "1f2densiZBAHJbxoG+yvhdN", "LoadingView");
var r = this && this.__extends || function() {
var t = function(e, n) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
})(e, n);
};
return function(e, n) {
t(e, n);
function r() {
this.constructor = e;
}
e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r());
};
}(), i = this && this.__decorate || function(t, e, n, r) {
var i, o = arguments.length, a = o < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, n, r); else for (var s = t.length - 1; s >= 0; s--) (i = t[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(e, n, a) : i(e, n)) || a);
return o > 3 && a && Object.defineProperty(e, n, a), a;
}, o = this && this.__metadata || function(t, e) {
if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(t, e);
}, a = this && this.__awaiter || function(t, e, n, r) {
function i(t) {
return t instanceof n ? t : new n(function(e) {
e(t);
});
}
return new (n || (n = Promise))(function(n, o) {
function a(t) {
try {
c(r.next(t));
} catch (t) {
o(t);
}
}
function s(t) {
try {
c(r.throw(t));
} catch (t) {
o(t);
}
}
function c(t) {
t.done ? n(t.value) : i(t.value).then(a, s);
}
c((r = r.apply(t, e || [])).next());
});
}, s = this && this.__generator || function(t, e) {
var n, r, i, o, a = {
label: 0,
sent: function() {
if (1 & i[0]) throw i[1];
return i[1];
},
trys: [],
ops: []
};
return o = {
next: s(0),
throw: s(1),
return: s(2)
}, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
return this;
}), o;
function s(t) {
return function(e) {
return c([ t, e ]);
};
}
function c(o) {
if (n) throw new TypeError("Generator is already executing.");
for (;a; ) try {
if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 
0) : r.next) && !(i = i.call(r, o[1])).done) return i;
(r = 0, i) && (o = [ 2 & o[0], i.value ]);
switch (o[0]) {
case 0:
case 1:
i = o;
break;

case 4:
a.label++;
return {
value: o[1],
done: !1
};

case 5:
a.label++;
r = o[1];
o = [ 0 ];
continue;

case 7:
o = a.ops.pop();
a.trys.pop();
continue;

default:
if (!(i = a.trys, i = i.length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
a = 0;
continue;
}
if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
a.label = o[1];
break;
}
if (6 === o[0] && a.label < i[1]) {
a.label = i[1];
i = o;
break;
}
if (i && a.label < i[2]) {
a.label = i[2];
a.ops.push(o);
break;
}
i[2] && a.ops.pop();
a.trys.pop();
continue;
}
o = e.call(t, a);
} catch (t) {
o = [ 6, t ];
r = 0;
} finally {
n = i = 0;
}
if (5 & o[0]) throw o[1];
return {
value: o[0] ? o[1] : void 0,
done: !0
};
}
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var c = t("../../Blade/Interfaces/IView"), u = t("../../Blade/Libs/ArchiveServerSDK/ArchiveServerSDK"), l = cc._decorator, f = l.ccclass, p = l.property, d = function(t) {
r(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.progress = null;
e.labelStatus = null;
return e;
}
e.prototype.onRegister = function() {
return a(this, void 0, void 0, function() {
return s(this, function(t) {
switch (t.label) {
case 0:
this.progress.progress = 0;
this.labelStatus.string = blade.locale.value("CHECKINGUPDATE");
return [ 4, blade.platform.getPlatform().checkForUpdate() ];

case 1:
t.sent();
this.progress.progress = .3;
this.labelStatus.string = blade.locale.value("LOGINING");
return [ 4, u.default.login("CukeMix") ];

case 2:
t.sent();
this.progress.progress = .5;
0;
this.labelStatus.string = blade.locale.value("LOADINGARCHIVE");
return [ 4, u.default.sync() ];

case 3:
t.sent();
this.progress.progress = 1;
return [ 4, u.default.uploadUserInfo() ];

case 4:
t.sent();
return [ 4, this.preloadScene("Main") ];

case 5:
t.sent();
blade.scene.runScene("Main");
return [ 2 ];
}
});
});
};
e.prototype.preloadScene = function(t) {
var e = this;
return new Promise(function(n, r) {
cc.director.preloadScene(t, function(t, r, i) {
e.labelStatus.string = blade.locale.value("LOADINGSCENE", t, r);
e.progress.progress = t / r;
t == r && n(!0);
}, function(t) {
t || n(!1);
});
});
};
e.prototype.onTick = function(t) {};
e.prototype.parseUrl = function() {
cc.warn("=========================\n地址栏参数说明：\nreset: 重置存档 (1:重置)\ntime: 时间倍数\n=========================");
var t = blade.platform.getPlatform().getLaunchOptions();
"1" === t.reset && u.default.clear();
try {
var e = parseFloat(t.time);
blade.ticker.timeScale = e;
} catch (t) {}
};
var n, c;
i([ p({
type: cc.ProgressBar,
tooltip: "加载进度"
}), o("design:type", "function" == typeof (n = "undefined" != typeof cc && cc.ProgressBar) ? n : Object) ], e.prototype, "progress", void 0);
i([ p({
type: cc.Label,
tooltip: "加载状态标签"
}), o("design:type", "function" == typeof (c = "undefined" != typeof cc && cc.Label) ? c : Object) ], e.prototype, "labelStatus", void 0);
return e = i([ f ], e);
}(c.default);
n.default = d;
cc._RF.pop();
}, {
"../../Blade/Interfaces/IView": "IView",
"../../Blade/Libs/ArchiveServerSDK/ArchiveServerSDK": "ArchiveServerSDK"
} ],
LocalizedItem: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "6041cRZClJB+7U3myhosSKg", "LocalizedItem");
Object.defineProperty(n, "__esModule", {
value: !0
});
cc._RF.pop();
}, {} ],
LocalizedLabel: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "6efc3hJwD5BrKAEGpGjvm/s", "LocalizedLabel");
var r = this && this.__extends || function() {
var t = function(e, n) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
})(e, n);
};
return function(e, n) {
t(e, n);
function r() {
this.constructor = e;
}
e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r());
};
}(), i = this && this.__decorate || function(t, e, n, r) {
var i, o = arguments.length, a = o < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, n, r); else for (var s = t.length - 1; s >= 0; s--) (i = t[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(e, n, a) : i(e, n)) || a);
return o > 3 && a && Object.defineProperty(e, n, a), a;
}, o = this && this.__metadata || function(t, e) {
if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(t, e);
}, a = this && this.__spreadArrays || function() {
for (var t = 0, e = 0, n = arguments.length; e < n; e++) t += arguments[e].length;
var r = Array(t), i = 0;
for (e = 0; e < n; e++) for (var o = arguments[e], a = 0, s = o.length; a < s; a++, 
i++) r[i] = o[a];
return r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var s = t("../../Services/LocalizedService"), c = cc._decorator, u = c.ccclass, l = c.property, f = c.executeInEditMode, p = c.menu, d = c.requireComponent, h = c.executionOrder, v = function(t) {
r(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e._langID = "";
e._label = null;
e.textType = 0;
e.langArgs = [];
e.updateInterval = null;
return e;
}
Object.defineProperty(e.prototype, "langID", {
get: function() {
return this._langID;
},
set: function(t) {
this._langID = t;
this.updateLang();
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "label", {
get: function() {
null == this._label && (this._label = this.getComponent(cc.Label));
null == this._label && cc.warn("不存在cc.Label节点", this.node.name);
return this._label;
},
enumerable: !1,
configurable: !0
});
e.prototype.onLoad = function() {
this.updateLang();
blade.locale.on(s.default.EventType.LanguageChange, this.updateLang, this);
0;
};
e.prototype.onDestroy = function() {
blade.locale.off(s.default.EventType.LanguageChange, this.updateLang, this);
this.updateInterval && blade.timer.stopTimer(this.updateInterval);
};
e.prototype.updateLang = function() {
var t;
if (null != this.langID && "" != this.langID) {
var e = this.langArgs && this.langArgs.length > 0 ? (t = blade.locale).value.apply(t, a([ this.langID ], this.langArgs)) : blade.locale.value(this.langID);
switch (this.textType) {
case 0:
default:
this.label.string = e;
break;

case 1:
this.label.string = e.toUpperCase();
break;

case 2:
this.label.string = e.toLowerCase();
}
}
};
e.prototype.setLangID = function(t) {
for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
this.langArgs = e;
this.langID = t;
};
e.prototype.setLangFormat = function() {
for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
this.langArgs = t;
this.updateLang();
};
i([ l, o("design:type", String) ], e.prototype, "_langID", void 0);
i([ l, o("design:type", String), o("design:paramtypes", [ String ]) ], e.prototype, "langID", null);
i([ l({
type: cc.Enum({
Normal: 0,
Upper: 1,
Lower: 2
}),
tooltip: "文本类型:\n1.正常\n2.全大写\n3.全小写"
}), o("design:type", Object) ], e.prototype, "textType", void 0);
i([ l({
type: [ cc.String ],
tooltip: "格式化参数填充内容"
}), o("design:type", Array) ], e.prototype, "langArgs", void 0);
return e = i([ u, f, d(cc.Label), h(999), p("Localized/LocalizedLabel") ], e);
}(cc.Component);
n.default = v;
cc._RF.pop();
}, {
"../../Services/LocalizedService": "LocalizedService"
} ],
LocalizedRichText: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "5baa1vNNFRBVYtR4SZchxGf", "LocalizedRichText");
var r = this && this.__extends || function() {
var t = function(e, n) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
})(e, n);
};
return function(e, n) {
t(e, n);
function r() {
this.constructor = e;
}
e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r());
};
}(), i = this && this.__decorate || function(t, e, n, r) {
var i, o = arguments.length, a = o < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, n, r); else for (var s = t.length - 1; s >= 0; s--) (i = t[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(e, n, a) : i(e, n)) || a);
return o > 3 && a && Object.defineProperty(e, n, a), a;
}, o = this && this.__metadata || function(t, e) {
if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(t, e);
}, a = this && this.__spreadArrays || function() {
for (var t = 0, e = 0, n = arguments.length; e < n; e++) t += arguments[e].length;
var r = Array(t), i = 0;
for (e = 0; e < n; e++) for (var o = arguments[e], a = 0, s = o.length; a < s; a++, 
i++) r[i] = o[a];
return r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var s = t("../../Services/LocalizedService"), c = cc._decorator, u = c.ccclass, l = c.property, f = c.executeInEditMode, p = c.menu, d = c.requireComponent, h = c.executionOrder, v = function(t) {
r(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e._langID = "";
e._label = null;
e.textType = 0;
e.langArgs = [];
e.updateInterval = null;
return e;
}
Object.defineProperty(e.prototype, "langID", {
get: function() {
return this._langID;
},
set: function(t) {
this._langID = t;
this.updateLang();
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(e.prototype, "label", {
get: function() {
null == this._label && (this._label = this.getComponent(cc.RichText));
null == this._label && cc.warn("不存在cc.Label节点", this.node.name);
return this._label;
},
enumerable: !1,
configurable: !0
});
e.prototype.onLoad = function() {
this.updateLang();
blade.locale.on(s.default.EventType.LanguageChange, this.updateLang, this);
0;
};
e.prototype.onDestroy = function() {
blade.locale.off(s.default.EventType.LanguageChange, this.updateLang, this);
this.updateInterval && blade.timer.stopTimer(this.updateInterval);
};
e.prototype.updateLang = function() {
var t;
if (null != this.langID && "" != this.langID) {
var e = this.langArgs && this.langArgs.length > 0 ? (t = blade.locale).value.apply(t, a([ this.langID ], this.langArgs)) : blade.locale.value(this.langID);
switch (this.textType) {
case 0:
default:
this.label.string = e;
break;

case 1:
this.label.string = e.toUpperCase();
break;

case 2:
this.label.string = e.toLowerCase();
}
}
};
e.prototype.setLangID = function(t) {
for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
this.langArgs = e;
this.langID = t;
};
e.prototype.setLangFormat = function() {
for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
this.langArgs = t;
this.updateLang();
};
i([ l, o("design:type", String) ], e.prototype, "_langID", void 0);
i([ l, o("design:type", String), o("design:paramtypes", [ String ]) ], e.prototype, "langID", null);
i([ l({
type: cc.Enum({
Normal: 0,
Upper: 1,
Lower: 2
}),
tooltip: "文本类型:\n1.正常\n2.全大写\n3.全小写"
}), o("design:type", Object) ], e.prototype, "textType", void 0);
i([ l({
type: [ cc.String ],
tooltip: "格式化参数填充内容"
}), o("design:type", Array) ], e.prototype, "langArgs", void 0);
return e = i([ u, f, d(cc.RichText), h(999), p("Localized/LocalizedRichText") ], e);
}(cc.Component);
n.default = v;
cc._RF.pop();
}, {
"../../Services/LocalizedService": "LocalizedService"
} ],
LocalizedService: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "22c82R3glJL8pHYVk6vHwLv", "LocalizedService");
var r = this && this.__extends || function() {
var t = function(e, n) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
})(e, n);
};
return function(e, n) {
t(e, n);
function r() {
this.constructor = e;
}
e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r());
};
}(), i = this && this.__decorate || function(t, e, n, r) {
var i, o = arguments.length, a = o < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, n, r); else for (var s = t.length - 1; s >= 0; s--) (i = t[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(e, n, a) : i(e, n)) || a);
return o > 3 && a && Object.defineProperty(e, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = t("../../Blade/Decorators/Service"), a = t("../../Blade/Decorators/Singleton"), s = function(t) {
r(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.EditorRefreshInterval = 2;
e.langs = {};
e.curLang = null;
e.langPath = "Langs";
return e;
}
n = e;
e.prototype.initialize = function() {
this.loadFolder();
this.initLang();
};
e.prototype.lazyInitialize = function() {};
e.prototype.initLang = function() {
var t, e = cc.sys.language;
if (null == (t = cc.sys.platform == cc.sys.EDITOR_PAGE ? n.LangType.zh_CN : blade.platform.getPlatform().getArchive(n.CURRENT_LANG_KEY))) switch (e) {
case cc.sys.LANGUAGE_CHINESE:
t = "zh-tw" == cc.sys.languageCode ? n.LangType.zh_TW : n.LangType.zh_CN;
break;

default:
t = n.LangType.en_US;
}
this.setLang(t);
};
e.prototype.load = function(t, e) {
this.langs[t] = e;
t == this.curLang && blade.locale.emit(n.EventType.LanguageChange, t);
};
e.prototype.loadFolder = function() {
var t = this;
cc.resources.loadDir(this.langPath, function(e, n) {
for (var r = 0, i = n; r < i.length; r++) {
var o = i[r];
t.load(o.name, o.json);
}
t.info();
});
};
e.prototype.setLang = function(t) {
if (null != t && this.curLang != t) {
this.curLang = t;
blade.locale.emit(n.EventType.LanguageChange, t);
console.log("设置语言环境:", t);
cc.sys.platform != cc.sys.EDITOR_PAGE && blade.platform.getPlatform().saveArchive(n.CURRENT_LANG_KEY, t);
}
};
e.prototype.getLang = function() {
return this.curLang;
};
e.prototype.value = function(t) {
for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
var r = this.langs[this.curLang], i = r && r[t] || t;
e && e.length > 0 && (i = i.replace(/\{(\d+)\}/g, function(t, n) {
return n in e ? e[n] : t;
}));
return i;
};
e.prototype.info = function(t) {
if (t) null != this.langs[t] ? console.log(t + ":", this.langs[t]) : console.log("没有注册" + t + "语言"); else {
var e = "多语言信息:\n";
for (var n in this.langs) if (this.langs.hasOwnProperty(n)) {
this.langs[n];
e += "   " + n + "    ✔\n";
}
"多语言信息:\n" == e && (e += "   没有注册语言");
console.log(e);
}
};
var n;
e.CURRENT_LANG_KEY = "curLang";
return e = n = i([ a.default, o.default("LocalizedService") ], e);
}(cc.EventTarget);
(function(t) {
(function(t) {
t.LanguageChange = "LanguageChange";
})(t.EventType || (t.EventType = {}));
(function(t) {
t.zh_CN = "zh_CN";
t.zh_TW = "zh_TW";
t.en_US = "en_US";
})(t.LangType || (t.LangType = {}));
})(s || (s = {}));
n.default = s;
cc._RF.pop();
}, {
"../../Blade/Decorators/Service": "Service",
"../../Blade/Decorators/Singleton": "Singleton"
} ],
LocalizedSprite: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "d4937AICMVGEaHiunfBt3WT", "LocalizedSprite");
var r = this && this.__extends || function() {
var t = function(e, n) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
})(e, n);
};
return function(e, n) {
t(e, n);
function r() {
this.constructor = e;
}
e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r());
};
}(), i = this && this.__decorate || function(t, e, n, r) {
var i, o = arguments.length, a = o < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, n, r); else for (var s = t.length - 1; s >= 0; s--) (i = t[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(e, n, a) : i(e, n)) || a);
return o > 3 && a && Object.defineProperty(e, n, a), a;
}, o = this && this.__metadata || function(t, e) {
if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(t, e);
};
Object.defineProperty(n, "__esModule", {
value: !0
});
n.SpriteFrameSet = void 0;
var a = t("../../Services/LocalizedService"), s = cc._decorator, c = s.ccclass, u = s.property, l = s.executeInEditMode, f = s.menu, p = s.requireComponent, d = s.executionOrder, h = function() {
function t() {
this.lang = "";
this.spriteFrame = null;
}
var e;
i([ u({
serializable: !0
}), o("design:type", String) ], t.prototype, "lang", void 0);
i([ u({
type: cc.SpriteFrame,
serializable: !0
}), o("design:type", "function" == typeof (e = "undefined" != typeof cc && cc.SpriteFrame) ? e : Object) ], t.prototype, "spriteFrame", void 0);
return t = i([ c("SpriteFrameSet") ], t);
}();
n.SpriteFrameSet = h;
var v = function(t) {
r(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.spriteFrameSet = [];
e._sprite = null;
e.updateInterval = null;
return e;
}
Object.defineProperty(e.prototype, "spriteFrame", {
get: function() {
null == this._sprite && (this._sprite = this.getComponent(cc.Sprite));
return this._sprite ? this._sprite.spriteFrame : null;
},
set: function(t) {
null == this._sprite && (this._sprite = this.getComponent(cc.Sprite));
this._sprite && (this._sprite.spriteFrame = t);
},
enumerable: !1,
configurable: !0
});
e.prototype.onLoad = function() {
this.defaultFrame = this.spriteFrame;
blade.locale.on(a.default.EventType.LanguageChange, this.updateLang, this);
0;
};
e.prototype.onDestroy = function() {
blade.locale.off(a.default.EventType.LanguageChange, this.updateLang, this);
this.updateInterval && blade.timer.stopTimer(this.updateInterval);
};
e.prototype.updateLang = function() {
this.spriteFrame = this.getSpriteFrameByLang(blade.locale.getLang());
};
e.prototype.getSpriteFrameByLang = function(t) {
for (var e = 0; e < this.spriteFrameSet.length; ++e) if (this.spriteFrameSet[e].lang === t) return this.spriteFrameSet[e].spriteFrame;
return this.defaultFrame;
};
i([ u({
type: [ h ]
}), o("design:type", Array) ], e.prototype, "spriteFrameSet", void 0);
return e = i([ c, l, p(cc.Label), d(999), f("Localized/LocalizedSprite") ], e);
}(cc.Component);
n.default = v;
cc._RF.pop();
}, {
"../../Services/LocalizedService": "LocalizedService"
} ],
LocationHelper: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "48337/N8flFP7J/sZZN5HgV", "LocationHelper");
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = function() {
function t() {}
t.updateWidget = function(t) {
for (var e = t.getParent(), n = []; e && !(e instanceof cc.Scene); ) {
var r = e.getComponent(cc.Widget);
r && n.push(r);
e = e.getParent();
}
for (;n.length > 0; ) {
n.pop().updateAlignment();
}
};
t.getLocation = function(e) {
var n = cc.view.getVisibleSize(), r = cc.find("Canvas");
t.updateWidget(e);
var i = e.convertToWorldSpaceAR(cc.Vec2.ZERO), o = r.convertToNodeSpaceAR(i), a = cc.v2(o.x, o.y + e.height / 2).sub(cc.v2(o.x, n.height / 2)).mag(), s = a / n.height, c = cc.v2(o.x - e.width / 2, o.y).sub(cc.v2(-n.width / 2, o.y)).mag(), u = c / n.width, l = e.width, f = l / n.width, p = e.height;
return {
top: a,
left: c,
width: l,
height: p,
topRatio: s,
leftRatio: u,
widthRatio: f,
heightRatio: p / n.height
};
};
return t;
}();
n.default = r;
cc._RF.pop();
}, {} ],
ModalLayer: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "5fa8f0LxFVN9rz4j4x0NuSV", "ModalLayer");
var r = this && this.__extends || function() {
var t = function(e, n) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
})(e, n);
};
return function(e, n) {
t(e, n);
function r() {
this.constructor = e;
}
e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r());
};
}(), i = this && this.__decorate || function(t, e, n, r) {
var i, o = arguments.length, a = o < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, n, r); else for (var s = t.length - 1; s >= 0; s--) (i = t[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(e, n, a) : i(e, n)) || a);
return o > 3 && a && Object.defineProperty(e, n, a), a;
}, o = this && this.__metadata || function(t, e) {
if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(t, e);
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var a = t("../../Blade/Services/PopupService"), s = t("../Libs/Tween/Tween"), c = cc._decorator, u = c.ccclass, l = c.property, f = function(t) {
r(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.spin = null;
return e;
}
e.prototype.onLoad = function() {
blade.popup.on(a.default.EventType.PANEL_ENABLE, this.openPanel, this);
blade.popup.on(a.default.EventType.PANEL_DISABLE, this.closePanel, this);
};
e.prototype.onDestroy = function() {
blade.popup.off(a.default.EventType.PANEL_ENABLE, this.openPanel, this);
blade.popup.off(a.default.EventType.PANEL_DISABLE, this.closePanel, this);
};
e.prototype.start = function() {};
e.prototype.openPanel = function() {
this.spin.active = !1;
};
e.prototype.closePanel = function() {
this.spin.active = !0;
};
e.prototype.onEnable = function() {
this.spin && (this.spinTween = s.default.get(this.spin, {
loop: !0
}).set({
angle: 0
}).to({
angle: -360
}, 1e3));
};
e.prototype.onDisable = function() {
if (this.spin && this.spinTween) {
s.default.removeTweens(this.spin);
this.spinTween = null;
}
};
var n;
i([ l({
type: cc.Node,
tooltip: "等待指示图标"
}), o("design:type", "function" == typeof (n = "undefined" != typeof cc && cc.Node) ? n : Object) ], e.prototype, "spin", void 0);
return e = i([ u ], e);
}(cc.Component);
n.default = f;
cc._RF.pop();
}, {
"../../Blade/Services/PopupService": "PopupService",
"../Libs/Tween/Tween": "Tween"
} ],
ModelService: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "3831eg+rYJCPoargNaYumTx", "ModelService");
var r = this && this.__decorate || function(t, e, n, r) {
var i, o = arguments.length, a = o < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, n, r); else for (var s = t.length - 1; s >= 0; s--) (i = t[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(e, n, a) : i(e, n)) || a);
return o > 3 && a && Object.defineProperty(e, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = t("../../Blade/Decorators/Service"), o = t("../../Blade/Decorators/Singleton"), a = function() {
function t() {}
e = t;
t.prototype.initialize = function() {
this.list = {};
};
t.prototype.lazyInitialize = function() {};
t.prototype.on = function(t, e, n, r) {
var i = "function" == typeof t ? this.getModel(t) : t;
if (null != i) {
for (var o = 0, a = e; o < a.length; o++) {
"string" == typeof (u = a[o]) && this.list[i.alias].event.on(u, n, r);
}
for (var s = 0, c = e; s < c.length; s++) {
var u;
"string" == typeof (u = c[s]) && this.noticeModelFieldUpdate(t, u, i[u], i[u]);
}
}
};
t.prototype.off = function(t, e, n, r) {
var i = "function" == typeof t ? this.getModel(t) : t;
if (null != i) for (var o = 0, a = e; o < a.length; o++) {
var s = a[o];
"string" == typeof s && this.list[i.alias].event.off(s, n, r);
}
};
t.prototype.noticeModelFieldUpdate = function(t, e, n, r) {
var i = "function" == typeof t ? this.getModel(t) : t;
null != i && this.list[i.alias].event.emit(e, i, e, n, r);
};
t.prototype.getModel = function(t) {
for (var e in this.list) if (this.list[e] instanceof t) return this.list[e].model;
return this.createModel(t);
};
t.prototype.createModel = function(t) {
var e = new t();
this.list[e.alias] = {
event: new cc.EventTarget(),
model: e
};
this.bindProxy(e);
return e;
};
t.prototype.bindProxy = function(t) {
var n = this, r = {};
Object.getOwnPropertyNames(t).filter(function(e) {
return "function" != typeof t[e];
}).forEach(function(i) {
r[i] = t[i];
Object.defineProperty(t, i, {
get: function() {
return t[e.INNER_DATA_FIELD][i];
},
set: function(r) {
var o = t[e.INNER_DATA_FIELD][i];
t[e.INNER_DATA_FIELD][i] = r;
n.noticeModelFieldUpdate(t, i, r, o);
}
});
});
Object.defineProperty(t, e.INNER_DATA_FIELD, {
value: r,
enumerable: !1
});
};
var e;
return t = e = r([ o.default, i.default("ModelService") ], t);
}();
(function(t) {
t.INNER_DATA_FIELD = "_data_";
})(a || (a = {}));
n.default = a;
cc._RF.pop();
}, {
"../../Blade/Decorators/Service": "Service",
"../../Blade/Decorators/Singleton": "Singleton"
} ],
Model: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "5252dci3s9FT7MzWsJWCfur", "Model");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.default = function(t) {
return function(e) {
Reflect.defineProperty(e.prototype, "alias", {
value: t
});
};
};
cc._RF.pop();
}, {} ],
NodeHelper: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "c1a52B+g4NP6Jf77E/A6g+O", "NodeHelper");
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = function() {
function t() {}
t.changeParent = function(t, e, n) {
var r = e.convertToNodeSpaceAR(t.convertToWorldSpaceAR(cc.Vec2.ZERO));
t.parent = null;
e.addChild(t, n);
t.x = r.x;
t.y = r.y;
};
t.isCollide = function(e, n) {
for (var r = t.getPoints(e), i = t.getPoints(n), o = 0; o < r.length; o++) {
var a = r[o];
if (t.isInNode(n, a)) return !0;
}
for (o = 0; o < i.length; o++) {
a = i[o];
if (t.isInNode(e, a)) return !0;
}
return !1;
};
t.getPoints = function(t) {
var e = new Array();
e.push(t.convertToWorldSpaceAR(new cc.Vec2(t.width / 2, t.height / 2)));
e.push(t.convertToWorldSpaceAR(new cc.Vec2(-t.width / 2, -t.height / 2)));
e.push(t.convertToWorldSpaceAR(new cc.Vec2(+t.width / 2, -t.height / 2)));
e.push(t.convertToWorldSpaceAR(new cc.Vec2(-t.width / 2, +t.height / 2)));
return e;
};
t.isInNode = function(t, e) {
var n = t.convertToNodeSpaceAR(e);
return Math.abs(n.x) <= t.width / 2 && Math.abs(n.y) <= t.height / 2;
};
t.setGray = function(t, e, n) {
void 0 === e && (e = !0);
void 0 === n && (n = cc.Material.createWithBuiltin("2d-sprite", 0));
var r = cc.Material.createWithBuiltin("2d-gray-sprite", 0), i = t.getComponent(cc.Sprite);
i && (e ? i.setMaterial(0, r) : i.setMaterial(0, n));
for (var o = 0, a = t.getComponentsInChildren(cc.Sprite); o < a.length; o++) {
var s = a[o];
s.node != t && this.setGray(s.node, e);
}
for (var c = 0, u = t.getComponentsInChildren(cc.LabelOutline); c < u.length; c++) {
var l = u[c];
l.node != t && (l.enabled = !e);
}
};
return t;
}();
n.default = r;
cc._RF.pop();
}, {} ],
NotificationService: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "5b7d1ssvBJFOIMspPm48VqX", "NotificationService");
var r = this && this.__extends || function() {
var t = function(e, n) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
})(e, n);
};
return function(e, n) {
t(e, n);
function r() {
this.constructor = e;
}
e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r());
};
}(), i = this && this.__decorate || function(t, e, n, r) {
var i, o = arguments.length, a = o < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, n, r); else for (var s = t.length - 1; s >= 0; s--) (i = t[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(e, n, a) : i(e, n)) || a);
return o > 3 && a && Object.defineProperty(e, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = t("../../Blade/Decorators/Singleton"), a = t("../../Blade/Decorators/Service"), s = function(t) {
r(e, t);
function e() {
return null !== t && t.apply(this, arguments) || this;
}
e.prototype.initialize = function() {};
e.prototype.lazyInitialize = function() {};
return e = i([ o.default, a.default("NotificationService") ], e);
}(cc.EventTarget);
n.default = s;
cc._RF.pop();
}, {
"../../Blade/Decorators/Service": "Service",
"../../Blade/Decorators/Singleton": "Singleton"
} ],
PlatformConfig: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "4914bUC+ExA0ZbW6kXnViWH", "PlatformConfig");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.default = {
wx: {
appId: "",
interstitialId: "",
videoId: "",
bannerId: ""
},
qq: {
appId: "",
interstitialId: "",
videoId: "",
bannerId: ""
},
fb: {
appId: "",
videoId: "",
interstitialId: ""
},
gp: {
appId: "",
adId: "",
bannerId: "",
interstitialId: ""
},
as: {
appId: "",
adId: "",
bannerId: "",
interstitialId: ""
}
};
cc._RF.pop();
}, {} ],
PlatformService: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "5f656c1OLVMP4JXL7nHTx//", "PlatformService");
var r = this && this.__decorate || function(t, e, n, r) {
var i, o = arguments.length, a = o < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, n, r); else for (var s = t.length - 1; s >= 0; s--) (i = t[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(e, n, a) : i(e, n)) || a);
return o > 3 && a && Object.defineProperty(e, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = t("../../Blade/Decorators/Service"), o = t("../../Blade/Decorators/Singleton"), a = t("../Platforms/WebPlatform"), s = t("../Platforms/WxPlatform"), c = t("../Platforms/QQPlatform"), u = t("../Platforms/GPPlatform"), l = function() {
function t() {}
e = t;
t.prototype.initialize = function() {
switch (this.getType()) {
case e.PlatformType.WX:
this.platform = new s.default();
break;

case e.PlatformType.QQ:
this.platform = new c.default();
break;

case e.PlatformType.ANDROID:
this.platform = new u.default();
break;

default:
this.platform = new a.default();
}
this.platform.initialize();
};
t.prototype.lazyInitialize = function() {
this.platform.lazyInitialize();
};
t.prototype.getType = function() {
return cc.sys.platform == cc.sys.ANDROID ? e.PlatformType.ANDROID : cc.sys.platform == cc.sys.IPHONE || cc.sys.platform == cc.sys.IPAD ? e.PlatformType.IOS : cc.sys.platform === cc.sys.WECHAT_GAME ? null != window.qq ? e.PlatformType.QQ : e.PlatformType.WX : null != window.FBInstant ? e.PlatformType.FACEBOOK : e.PlatformType.WEB;
};
t.prototype.getPlatform = function() {
return this.platform;
};
var e;
return t = e = r([ o.default, i.default("PlatformService") ], t);
}();
(function(t) {
(function(t) {
t[t.WX = 0] = "WX";
t[t.QQ = 1] = "QQ";
t[t.FACEBOOK = 2] = "FACEBOOK";
t[t.ANDROID = 3] = "ANDROID";
t[t.IOS = 4] = "IOS";
t[t.WEB = 5] = "WEB";
})(t.PlatformType || (t.PlatformType = {}));
})(l || (l = {}));
n.default = l;
cc._RF.pop();
}, {
"../../Blade/Decorators/Service": "Service",
"../../Blade/Decorators/Singleton": "Singleton",
"../Platforms/GPPlatform": "GPPlatform",
"../Platforms/QQPlatform": "QQPlatform",
"../Platforms/WebPlatform": "WebPlatform",
"../Platforms/WxPlatform": "WxPlatform"
} ],
PoolService: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "5f39b/u/1pN+K5vlfB16YZ6", "PoolService");
var r = this && this.__decorate || function(t, e, n, r) {
var i, o = arguments.length, a = o < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, n, r); else for (var s = t.length - 1; s >= 0; s--) (i = t[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(e, n, a) : i(e, n)) || a);
return o > 3 && a && Object.defineProperty(e, n, a), a;
}, i = this && this.__awaiter || function(t, e, n, r) {
function i(t) {
return t instanceof n ? t : new n(function(e) {
e(t);
});
}
return new (n || (n = Promise))(function(n, o) {
function a(t) {
try {
c(r.next(t));
} catch (t) {
o(t);
}
}
function s(t) {
try {
c(r.throw(t));
} catch (t) {
o(t);
}
}
function c(t) {
t.done ? n(t.value) : i(t.value).then(a, s);
}
c((r = r.apply(t, e || [])).next());
});
}, o = this && this.__generator || function(t, e) {
var n, r, i, o, a = {
label: 0,
sent: function() {
if (1 & i[0]) throw i[1];
return i[1];
},
trys: [],
ops: []
};
return o = {
next: s(0),
throw: s(1),
return: s(2)
}, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
return this;
}), o;
function s(t) {
return function(e) {
return c([ t, e ]);
};
}
function c(o) {
if (n) throw new TypeError("Generator is already executing.");
for (;a; ) try {
if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 
0) : r.next) && !(i = i.call(r, o[1])).done) return i;
(r = 0, i) && (o = [ 2 & o[0], i.value ]);
switch (o[0]) {
case 0:
case 1:
i = o;
break;

case 4:
a.label++;
return {
value: o[1],
done: !1
};

case 5:
a.label++;
r = o[1];
o = [ 0 ];
continue;

case 7:
o = a.ops.pop();
a.trys.pop();
continue;

default:
if (!(i = a.trys, i = i.length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
a = 0;
continue;
}
if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
a.label = o[1];
break;
}
if (6 === o[0] && a.label < i[1]) {
a.label = i[1];
i = o;
break;
}
if (i && a.label < i[2]) {
a.label = i[2];
a.ops.push(o);
break;
}
i[2] && a.ops.pop();
a.trys.pop();
continue;
}
o = e.call(t, a);
} catch (t) {
o = [ 6, t ];
r = 0;
} finally {
n = i = 0;
}
if (5 & o[0]) throw o[1];
return {
value: o[0] ? o[1] : void 0,
done: !0
};
}
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var a = t("../../Blade/Decorators/Singleton"), s = t("../../Blade/Decorators/Service"), c = function() {
function t() {
this.list = new Map();
this.perfabPath = "Prefabs/Pools";
}
e = t;
t.prototype.initialize = function() {
this.loadFolder();
};
t.prototype.lazyInitialize = function() {};
t.prototype.loadFolder = function() {
var t = this;
cc.resources.loadDir(this.perfabPath, function(e, n) {
for (var r = 0; r < n.length; r++) {
var i = n[r];
t.register(i.name, i, 10);
}
t.info();
});
};
t.prototype.register = function(t, n, r, a) {
return i(this, void 0, void 0, function() {
return o(this, function(i) {
this.list.has(t) || this.list.set(t, new e.Pool(n, r, a));
return [ 2 ];
});
});
};
t.prototype.unregister = function(t) {
return i(this, void 0, void 0, function() {
return o(this, function(e) {
if (this.list.has(t)) {
this.list.get(t).clear();
this.list.delete(t);
}
return [ 2 ];
});
});
};
t.prototype.put = function(t, e) {
if (this.list.has(t)) this.list.get(t).put(e); else {
console.error("没有注册预制体");
e.destroy();
}
};
t.prototype.get = function(t) {
if (this.list.has(t)) return this.list.get(t).get();
console.error("没有注册预制体");
};
t.prototype.info = function(t) {
if (t) this.list.has(t) ? console.log(t + ":", this.list.get(t).progress()) : console.log("没有注册" + t + "预制体"); else {
var e = "对象池信息:\n";
this.list.size > 0 ? this.list.forEach(function(t, n, r) {
e += "   " + n + "    " + t.progress() + "\n";
}) : e += "   没有注册对象池对象";
console.log(e);
}
};
var e;
return t = e = r([ a.default, s.default("PoolService") ], t);
}();
(function(t) {
var e = function() {
function t(t, e, n) {
this.template = null;
this.list = null;
this.tail = 0;
this.list = new cc.NodePool(n);
this.template = t;
for (var r = 0; r < e; r++) {
var i = cc.instantiate(this.template);
i.prefab = t;
i.active = !1;
this.list.put(i);
}
this.tail = e;
}
t.prototype.put = function(t) {
if (t.prefab != this.template) throw new Error("该节点不是该对象池的对象");
t.active = !1;
this.list.put(t);
};
t.prototype.get = function() {
var t;
if (this.list.size() > 0) t = this.list.get(); else {
(t = cc.instantiate(this.template)).prefab = this.template;
console.warn("对象池预设不足");
this.tail += 1;
}
t.active = !0;
return t;
};
t.prototype.clear = function() {
this.list.clear();
};
t.prototype.progress = function() {
return this.list.size() + "/" + this.tail;
};
return t;
}();
t.Pool = e;
})(c || (c = {}));
n.default = c;
cc._RF.pop();
}, {
"../../Blade/Decorators/Service": "Service",
"../../Blade/Decorators/Singleton": "Singleton"
} ],
PopupService: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "843a2fX2jpFIphNWWOu1PWb", "PopupService");
var r = this && this.__extends || function() {
var t = function(e, n) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
})(e, n);
};
return function(e, n) {
t(e, n);
function r() {
this.constructor = e;
}
e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r());
};
}(), i = this && this.__decorate || function(t, e, n, r) {
var i, o = arguments.length, a = o < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, n, r); else for (var s = t.length - 1; s >= 0; s--) (i = t[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(e, n, a) : i(e, n)) || a);
return o > 3 && a && Object.defineProperty(e, n, a), a;
}, o = this && this.__awaiter || function(t, e, n, r) {
function i(t) {
return t instanceof n ? t : new n(function(e) {
e(t);
});
}
return new (n || (n = Promise))(function(n, o) {
function a(t) {
try {
c(r.next(t));
} catch (t) {
o(t);
}
}
function s(t) {
try {
c(r.throw(t));
} catch (t) {
o(t);
}
}
function c(t) {
t.done ? n(t.value) : i(t.value).then(a, s);
}
c((r = r.apply(t, e || [])).next());
});
}, a = this && this.__generator || function(t, e) {
var n, r, i, o, a = {
label: 0,
sent: function() {
if (1 & i[0]) throw i[1];
return i[1];
},
trys: [],
ops: []
};
return o = {
next: s(0),
throw: s(1),
return: s(2)
}, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
return this;
}), o;
function s(t) {
return function(e) {
return c([ t, e ]);
};
}
function c(o) {
if (n) throw new TypeError("Generator is already executing.");
for (;a; ) try {
if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 
0) : r.next) && !(i = i.call(r, o[1])).done) return i;
(r = 0, i) && (o = [ 2 & o[0], i.value ]);
switch (o[0]) {
case 0:
case 1:
i = o;
break;

case 4:
a.label++;
return {
value: o[1],
done: !1
};

case 5:
a.label++;
r = o[1];
o = [ 0 ];
continue;

case 7:
o = a.ops.pop();
a.trys.pop();
continue;

default:
if (!(i = a.trys, i = i.length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
a = 0;
continue;
}
if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
a.label = o[1];
break;
}
if (6 === o[0] && a.label < i[1]) {
a.label = i[1];
i = o;
break;
}
if (i && a.label < i[2]) {
a.label = i[2];
a.ops.push(o);
break;
}
i[2] && a.ops.pop();
a.trys.pop();
continue;
}
o = e.call(t, a);
} catch (t) {
o = [ 6, t ];
r = 0;
} finally {
n = i = 0;
}
if (5 & o[0]) throw o[1];
return {
value: o[0] ? o[1] : void 0,
done: !0
};
}
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var s = t("../../Blade/Decorators/Singleton"), c = t("../../Blade/Decorators/Service"), u = t("../../Blade/Interfaces/IPopup"), l = t("../Libs/Structs/PriorityQueue"), f = t("../Libs/Tween/Tween"), p = t("../Helpers/PromiseHelper"), d = function(t) {
r(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.list = new l.default();
e.modal = null;
e.prefabCache = new Map();
return e;
}
n = e;
e.prototype.initialize = function() {
this.list.clear();
this.prefabCache.clear();
};
e.prototype.lazyInitialize = function() {
var t = this;
cc.resources.load(n.ModalPrefabPath, cc.Prefab, function(e, r) {
if (e) {
cc.error("路径('" + n.ModalPrefabPath + "')不存在模态层预制件");
t.createModal();
} else {
var i = cc.find("Blade");
if (null == i) throw new Error("没有Blade节点");
var o = cc.instantiate(r);
o.parent = i;
o.active = !1;
o.zIndex = -1;
t.modal = o;
}
});
blade.ticker.register(this);
};
e.prototype.createModal = function() {
if (null == this.modal) {
var t = cc.find("Blade");
if (null == t) throw new Error("没有Blade节点");
var e = new cc.Node("Modal");
e.addComponent(cc.BlockInputEvents);
var n = e.addComponent(cc.Widget);
n.isAlignTop = !0;
n.isAlignBottom = !0;
n.isAlignLeft = !0;
n.isAlignRight = !0;
n.top = 0;
n.bottom = 0;
n.left = 0;
n.right = 0;
e.parent = t;
e.active = !1;
e.zIndex = -1;
this.modal = e;
}
};
e.prototype.pop = function(t) {
var e = this;
return null != t.name && "" != t.name && this.list.some(function(e) {
console.log(e.name, t.name);
return e.name == t.name;
}) ? Promise.reject("Panel已经在列表内") : new Promise(function(r, i) {
return o(e, void 0, void 0, function() {
var e, i, s, c, l, f, d, h, v, y = this;
return a(this, function(g) {
switch (g.label) {
case 0:
return [ 4, p.default.waitUntil(function() {
return y.modal;
}) ];

case 1:
g.sent();
g.label = 2;

case 2:
g.trys.push([ 2, 13, , 14 ]);
e = void 0;
if (!(t.node instanceof cc.Prefab)) return [ 3, 3 ];
e = cc.instantiate(t.node);
return [ 3, 9 ];

case 3:
if (!(t.node instanceof cc.Node)) return [ 3, 4 ];
e = t.node;
return [ 3, 9 ];

case 4:
if ("string" != typeof t.node) return [ 3, 8 ];
null == cc.path.dirname(t.node) && (t.node = "Prefabs/Panels/" + t.node);
i = null;
if (!this.prefabCache.has(t.node)) return [ 3, 5 ];
i = this.prefabCache.get(t.node);
return [ 3, 7 ];

case 5:
return [ 4, new Promise(function(e, n) {
cc.resources.load(t.node, cc.Prefab, function(t, r) {
t ? n(t) : e(r);
});
}) ];

case 6:
i = g.sent();
this.prefabCache.set(t.node, i);
g.label = 7;

case 7:
e = cc.instantiate(i);
return [ 3, 9 ];

case 8:
throw new Error(t.node + "不是有效的弹窗!");

case 9:
if (null == e) throw new Error("面板资源创建失败");
s = e.getComponent(u.default);
if (t.template && (c = e.getComponents(u.default)) && c.length > 0) for (l = 0, 
f = c; l < f.length; l++) (d = f[l]).applyTemplate && d.applyTemplate(t.template);
e.once(n.EventType.POPUP_CLICK, function(e, i) {
return o(y, void 0, void 0, function() {
return a(this, function(o) {
switch (o.label) {
case 0:
blade.popup.emit(n.EventType.POPUP_CLICK, e, i);
i instanceof cc.Node && (i = i.getComponent(u.default));
return [ 4, i.disappear() ];

case 1:
o.sent();
i.onDisappear();
blade.popup.emit(n.EventType.PANEL_DISABLE);
this.list.dequeue();
t.callback && t.callback.call(t.callbackTarget, e);
r(e);
return [ 2 ];
}
});
});
}, this);
e.active = !1;
e.parent = this.modal;
return t.immediate && this.list.size() > 0 ? [ 4, this.list.front().element.disappear() ] : [ 3, 11 ];

case 10:
g.sent();
this.list.front().element.node.active = !1;
h = this.list.front().priority + 1;
this.list.enqueue(s, h);
return [ 3, 12 ];

case 11:
this.list.enqueue(s);
g.label = 12;

case 12:
return [ 3, 14 ];

case 13:
v = g.sent();
r(v);
return [ 3, 14 ];

case 14:
return [ 2 ];
}
});
});
});
};
e.prototype.popNode = function(t, e, n, r) {
void 0 === e && (e = {});
return this.pop({
template: e,
node: t,
callback: n,
callbackTarget: r,
immediate: !1
});
};
e.prototype.popNodeTop = function(t, e, n, r) {
void 0 === e && (e = {});
return this.pop({
template: e,
node: t,
callback: n,
callbackTarget: r,
immediate: !0
});
};
e.prototype.isShow = function() {
return this.list.size() > 0;
};
e.prototype.showModal = function() {
if (null != this.modal && !this.modal.active) {
this.modal.active = !0;
this.modal.opacity = 0;
f.default.get(this.modal).to({
opacity: 255
}, 100);
}
};
e.prototype.hideModal = function() {
if (null == this.modal) return Promise.reject();
this.modal.active = !1;
return Promise.resolve();
};
e.prototype.showPanel = function() {
var t = this;
this.list.front().element.appear().catch(function(e) {
t.list.dequeue();
console.warn(e);
});
blade.popup.emit(n.EventType.PANEL_ENABLE);
};
e.prototype.onTick = function(t) {
if (this.list.size() <= 0) this.modal && this.modal.active && this.hideModal(); else if (!this.list.front().element.node.active) {
this.showModal();
this.showPanel();
}
};
var n;
e.ModalPrefabPath = "Prefabs/Commons/Modal";
return e = n = i([ s.default, c.default("PopupService") ], e);
}(cc.EventTarget);
(function(t) {
(function(t) {
t.POPUP_CLICK = "POPUP_CLICK";
t.PANEL_DISABLE = "PANEL_DISABLE";
t.PANEL_ENABLE = "PANEL_ENABLE";
})(t.EventType || (t.EventType = {}));
})(d || (d = {}));
n.default = d;
cc._RF.pop();
}, {
"../../Blade/Decorators/Service": "Service",
"../../Blade/Decorators/Singleton": "Singleton",
"../../Blade/Interfaces/IPopup": "IPopup",
"../Helpers/PromiseHelper": "PromiseHelper",
"../Libs/Structs/PriorityQueue": "PriorityQueue",
"../Libs/Tween/Tween": "Tween"
} ],
PriorityQueue: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "03ba1ep+nhBzZjQQA5Pqnnk", "PriorityQueue");
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = function() {
return function(t, e) {
this.element = null;
this.priority = 0;
this.element = t;
this.priority = Math.floor(e);
};
}(), i = function() {
function t() {
this.items = [];
}
t.prototype.size = function() {
return this.items.length;
};
t.prototype.enqueue = function(t, e) {
void 0 === e && (e = 0);
var n = new r(t, e);
if (this.isEmpty()) this.items.push(n); else {
for (var i = !1, o = 0; o < this.items.length; o++) if (n.priority < this.items[o].priority) {
this.items.splice(o, 0, n);
i = !0;
break;
}
i || this.items.push(n);
}
};
t.prototype.dequeue = function() {
if (this.isEmpty()) throw new Error("This queue is empty");
return this.items.shift();
};
t.prototype.isEmpty = function() {
return 0 == this.items.length;
};
t.prototype.front = function() {
if (this.isEmpty()) throw new Error("This queue is empty");
return this.items[0];
};
t.prototype.back = function() {
if (this.isEmpty()) throw new Error("This queue is empty");
return this.items[this.items.length - 1];
};
t.prototype.display = function() {
for (var t = "", e = 0; e < this.items.length; e++) t += JSON.stringify(this.items[e].element) + "\n";
console.log(t);
};
t.prototype.clear = function() {
delete this.items;
this.items = [];
};
t.prototype.has = function(t) {
if (this.isEmpty) return !1;
for (var e = 0; e < this.items.length; e++) if (this.items[e].element == t) return !0;
return !1;
};
t.prototype.remove = function(t) {
for (var e = 0; e < this.items.length; e++) this.items[e].element == t && this.items.splice(e, 1);
};
t.prototype.forEach = function(t, e) {
this.items.forEach(function(n, r, i) {
t.call(e, n);
});
};
t.prototype.some = function(t, e) {
return this.items.some(function(n, r, i) {
return t.call(e, n);
});
};
return t;
}();
n.default = i;
cc._RF.pop();
}, {} ],
PromiseHelper: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "62902CGeyVPMpj/79hWnavH", "PromiseHelper");
var r = this && this.__spreadArrays || function() {
for (var t = 0, e = 0, n = arguments.length; e < n; e++) t += arguments[e].length;
var r = Array(t), i = 0;
for (e = 0; e < n; e++) for (var o = arguments[e], a = 0, s = o.length; a < s; a++, 
i++) r[i] = o[a];
return r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = function() {
function t() {}
t.wait = function(t, e) {
return new Promise(function(n, r) {
e ? e.scheduleOnce(n, t) : blade.timer.startTimeout(t, n);
});
};
t.waitUntil = function(t, e) {
for (var n = [], i = 2; i < arguments.length; i++) n[i - 2] = arguments[i];
return t.call.apply(t, r([ e ], n)) ? Promise.resolve() : new Promise(function(i, o) {
var a;
a = {
onTick: function() {
try {
if (t.call.apply(t, r([ e ], n))) {
blade.ticker.unregister(a);
i();
}
} catch (t) {
blade.ticker.unregister(a);
o(t);
}
}
};
blade.ticker.register(a);
});
};
t.waitWhile = function(t, e) {
for (var n = [], i = 2; i < arguments.length; i++) n[i - 2] = arguments[i];
return t.call.apply(t, r([ e ], n)) ? new Promise(function(i, o) {
var a;
a = {
onTick: function() {
try {
if (!t.call.apply(t, r([ e ], n))) {
blade.ticker.unregister(a);
i();
}
} catch (t) {
blade.ticker.unregister(a);
o(t);
}
}
};
blade.ticker.register(a);
}) : Promise.resolve();
};
t.nextFrame = function() {
return new Promise(function(t, e) {
cc.director.once(cc.Director.EVENT_BEFORE_UPDATE, t);
});
};
t.loadRes = function(t, e) {
return new Promise(function(n, r) {
cc.resources.load(t, e, function(t, e) {
t ? r(t) : n(e);
});
});
};
t.loadResArray = function(t, e) {
return new Promise(function(n, r) {
cc.resources.load(t, e, function(t, e) {
t ? r(t) : n(e);
});
});
};
t.loadRemote = function(t) {
return new Promise(function(e, n) {
cc.assetManager.loadRemote(t, function(t, r) {
t ? n(t) : e(r);
});
});
};
return t;
}();
n.default = i;
cc._RF.pop();
}, {} ],
QQPlatform: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "297e4cQHGJNKb8Fv1E0yEmw", "QQPlatform");
var r = this && this.__extends || function() {
var t = function(e, n) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
})(e, n);
};
return function(e, n) {
t(e, n);
function r() {
this.constructor = e;
}
e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r());
};
}(), i = this && this.__awaiter || function(t, e, n, r) {
function i(t) {
return t instanceof n ? t : new n(function(e) {
e(t);
});
}
return new (n || (n = Promise))(function(n, o) {
function a(t) {
try {
c(r.next(t));
} catch (t) {
o(t);
}
}
function s(t) {
try {
c(r.throw(t));
} catch (t) {
o(t);
}
}
function c(t) {
t.done ? n(t.value) : i(t.value).then(a, s);
}
c((r = r.apply(t, e || [])).next());
});
}, o = this && this.__generator || function(t, e) {
var n, r, i, o, a = {
label: 0,
sent: function() {
if (1 & i[0]) throw i[1];
return i[1];
},
trys: [],
ops: []
};
return o = {
next: s(0),
throw: s(1),
return: s(2)
}, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
return this;
}), o;
function s(t) {
return function(e) {
return c([ t, e ]);
};
}
function c(o) {
if (n) throw new TypeError("Generator is already executing.");
for (;a; ) try {
if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 
0) : r.next) && !(i = i.call(r, o[1])).done) return i;
(r = 0, i) && (o = [ 2 & o[0], i.value ]);
switch (o[0]) {
case 0:
case 1:
i = o;
break;

case 4:
a.label++;
return {
value: o[1],
done: !1
};

case 5:
a.label++;
r = o[1];
o = [ 0 ];
continue;

case 7:
o = a.ops.pop();
a.trys.pop();
continue;

default:
if (!(i = a.trys, i = i.length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
a = 0;
continue;
}
if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
a.label = o[1];
break;
}
if (6 === o[0] && a.label < i[1]) {
a.label = i[1];
i = o;
break;
}
if (i && a.label < i[2]) {
a.label = i[2];
a.ops.push(o);
break;
}
i[2] && a.ops.pop();
a.trys.pop();
continue;
}
o = e.call(t, a);
} catch (t) {
o = [ 6, t ];
r = 0;
} finally {
n = i = 0;
}
if (5 & o[0]) throw o[1];
return {
value: o[0] ? o[1] : void 0,
done: !0
};
}
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var a = t("../Interfaces/IPlatform"), s = t("../Helpers/HttpHelper"), c = t("../Helpers/StringHelper"), u = t("../Helpers/PromiseHelper"), l = t("../../Module/Defines/PlatformConfig"), f = function(t) {
r(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.launchOptions = null;
e.authorizeButton = null;
e.shareMenuInfo = null;
e.videoState = a.default.AdState.None;
e.bannerState = a.default.AdState.None;
e.interstitialState = a.default.AdState.None;
e.video = null;
e.banner = null;
e.interstitial = null;
e.bannerActive = !1;
return e;
}
e.prototype.initialize = function() {
var t = this;
this.getUserInfoTry();
qq.onShow(function(e) {
t.setLaunchOptions(e);
t.emit(a.default.EventType.OnShow, e);
});
};
e.prototype.lazyInitialize = function() {};
e.prototype.getArchive = function(t) {
return qq.getStorageSync(t);
};
e.prototype.saveArchive = function(t, e) {
qq.setStorageSync(t, e);
};
e.prototype.getLaunchOptions = function() {
this.launchOptions || (this.launchOptions = qq.getLaunchOptionsSync());
return this.launchOptions;
};
e.prototype.setLaunchOptions = function(t) {
this.launchOptions = t;
};
e.prototype.getUserInfoTry = function() {
return i(this, void 0, void 0, function() {
var t, e = this;
return o(this, function(n) {
switch (n.label) {
case 0:
if (this.userInfo) return [ 2, this.userInfo ];
n.label = 1;

case 1:
n.trys.push([ 1, 3, , 4 ]);
return [ 4, new Promise(function(t, n) {
qq.getUserInfo({
success: function(r) {
if (r.rawData) {
var i = JSON.parse(r.rawData), o = qq.getSystemInfoSync();
e.userInfo = {
avatar: i.avatarUrl || "",
nickname: i.nickName || "",
gender: i.gender || 0,
province: i.province,
city: i.city,
country: i.country,
platform: o.platform,
device: o.model
};
t(e.userInfo);
} else n(r);
},
fail: n
});
}) ];

case 2:
return [ 2, n.sent() ];

case 3:
t = n.sent();
console.error(t);
return [ 2, null ];

case 4:
return [ 2 ];
}
});
});
};
e.prototype.authorize = function(t) {
var e = this;
return new Promise(function(n, r) {
var i = function(i) {
if (i.rawData) {
var o = JSON.parse(i.rawData), a = qq.getSystemInfoSync();
e.userInfo = {
avatar: o.avatarUrl || "",
nickname: o.nickName || "",
gender: o.gender || 0,
province: o.province,
city: o.city,
country: o.country,
platform: a.platform,
device: a.model
};
t && t.callback && t.callback.call(t.caller);
n({
encryptedData: i.encryptedData,
iv: i.iv
});
} else r();
};
qq.getUserInfo({
success: i,
fail: function(n) {
qq.getSetting({
success: function(n) {
qq.getSystemInfo({
success: function(n) {
if (t) {
t.height *= n.screenHeight;
t.width *= n.screenWidth;
t.left *= n.screenWidth;
t.top *= n.screenHeight;
} else t = {
left: 0,
top: 0,
width: n.screenWidth,
height: n.screenHeight
};
var r = qq.createUserInfoButton({
type: "text",
text: "",
style: {
left: t.left,
top: t.top,
width: t.width,
height: t.height,
backgroundColor: "rgba(252,255,255,0)",
borderColor: "rgba(250,250,250,0)",
borderWidth: 0,
borderRadius: 0,
textAlign: "center",
fontSize: 30,
lineHeight: 32
},
withCredentials: !1
});
e.authorizeButton = r;
r.onTap(function(n) {
if (n.rawData) {
r.destroy();
e.authorizeButton = null;
t && t.callback && t.callback.call(t.caller);
}
i(n);
});
},
fail: function(t) {
r();
}
});
}
});
}
});
});
};
e.prototype.unauthorize = function() {
if (this.authorizeButton) {
this.authorizeButton.destroy();
this.authorizeButton = null;
}
};
e.prototype.setShareMenuInfo = function(t, e, n, r, c) {
return i(this, void 0, void 0, function() {
var i, u = this;
return o(this, function(o) {
if (null == this.shareMenuInfo) {
qq.showShareMenu({
withShareTicket: !0
});
qq.onShareAppMessage(function() {
return u.shareMenuInfo;
});
}
i = s.default.formatParams(n);
this.shareMenuInfo = {
imageUrl: t,
title: e,
query: i,
success: function() {
u.emit(a.default.EventType.OpenShare, t, e, n);
r && r.call(c, t, e, n);
}
};
return [ 2 ];
});
});
};
e.prototype.isSupportRewardVideo = function() {
return c.default.compareVersion(qq.getSystemInfoSync().SDKVersion, "2.0.4") >= 0;
};
e.prototype.isVideoLoaded = function() {
return this.videoState == a.default.AdState.Loaded;
};
e.prototype.preloadRewardVideo = function() {
return i(this, void 0, Promise, function() {
var t = this;
return o(this, function(e) {
switch (e.label) {
case 0:
return this.isSupportRewardVideo() ? this.videoState == a.default.AdState.Loaded ? [ 2 ] : this.videoState != a.default.AdState.Loading ? [ 3, 2 ] : [ 4, u.default.waitUntil(function() {
return t.videoState != a.default.AdState.Loading;
}) ] : [ 2 ];

case 1:
return [ 2, e.sent() ];

case 2:
this.videoState = a.default.AdState.Loading;
if (null == this.video) {
this.video = qq.createRewardedVideoAd({
adUnitId: l.default.qq.videoId
});
this.video.onLoad(function() {
t.videoState = a.default.AdState.Loaded;
});
this.video.onError(function(e) {
t.videoState = a.default.AdState.None;
});
this.video.onClose(function(e) {
var n = e && e.isEnded || void 0 === e;
blade.ticker.setPause(!1);
blade.audio.resumeAll();
t.preloadRewardVideo();
t.emit(a.default.EventType.CloseVideo, n);
});
} else this.video.load();
this.video.load();
return [ 4, u.default.waitUntil(function() {
return t.videoState != a.default.AdState.Loading;
}) ];

case 3:
return [ 2, e.sent() ];
}
});
});
};
e.prototype.playRewardVideo = function() {
return i(this, void 0, Promise, function() {
var t = this;
return o(this, function(e) {
switch (e.label) {
case 0:
if (null == this.video || this.videoState != a.default.AdState.Loaded) return [ 3, 2 ];
this.videoState = a.default.AdState.None;
blade.ticker.setPause(!0);
blade.audio.pauseAll();
return [ 4, new Promise(function(e, n) {
return i(t, void 0, void 0, function() {
var t;
return o(this, function(n) {
switch (n.label) {
case 0:
t = function(t) {
e(t);
};
this.once(a.default.EventType.CloseVideo, t);
n.label = 1;

case 1:
n.trys.push([ 1, 3, , 4 ]);
return [ 4, this.video.show() ];

case 2:
n.sent();
this.emit(a.default.EventType.OpenVideo);
return [ 3, 4 ];

case 3:
n.sent();
blade.ticker.setPause(!1);
blade.audio.resumeAll();
this.preloadRewardVideo();
this.off(a.default.EventType.CloseVideo, t);
e(!1);
return [ 3, 4 ];

case 4:
return [ 2 ];
}
});
});
}) ];

case 1:
return [ 2, e.sent() ];

case 2:
return [ 2, !1 ];
}
});
});
};
e.prototype.isSupportBanner = function() {
return c.default.compareVersion(qq.getSystemInfoSync().SDKVersion, "2.0.4") >= 0;
};
e.prototype.preloadBanner = function() {
return i(this, void 0, Promise, function() {
var t, e = this;
return o(this, function(n) {
switch (n.label) {
case 0:
return this.isSupportBanner() ? this.bannerState == a.default.AdState.Loaded ? [ 2 ] : this.bannerState != a.default.AdState.Loading ? [ 3, 2 ] : [ 4, u.default.waitUntil(function() {
return e.bannerState != a.default.AdState.Loading;
}) ] : [ 2 ];

case 1:
return [ 2, n.sent() ];

case 2:
if (this.banner) {
this.banner.destroy();
this.banner = null;
}
t = qq.getSystemInfoSync();
this.banner = qq.createBannerAd({
adUnitId: l.default.qq.bannerId,
style: {
top: 0,
left: 0,
height: 50,
width: 200
}
});
this.banner.onLoad(function() {
return i(e, void 0, void 0, function() {
return o(this, function(t) {
this.bannerState = a.default.AdState.Loaded;
if (this.bannerActive) {
this.emit(a.default.EventType.OpenBanner);
this.banner.show();
}
return [ 2 ];
});
});
});
this.banner.onError(function(t) {
e.bannerState = a.default.AdState.None;
});
this.banner.onResize(function(n) {
e.banner.style.top = t.windowHeight - e.banner.style.realHeight;
e.banner.style.left = (t.windowWidth - e.banner.style.realWidth) / 2;
});
return [ 2 ];
}
});
});
};
e.prototype.activeBanner = function(t) {
if (null == this.banner) return !1;
if (t) {
if (this.bannerState != a.default.AdState.Loaded) return !1;
this.emit(a.default.EventType.OpenBanner);
this.banner.show();
this.bannerState = a.default.AdState.Opening;
return !0;
}
if (this.bannerState != a.default.AdState.Opening) return !1;
this.emit(a.default.EventType.CloseBanner);
this.banner.destroy();
this.banner = null;
this.bannerState = a.default.AdState.None;
this.preloadBanner();
return !0;
};
e.prototype.isSupportInterstitial = function() {
return c.default.compareVersion(qq.getSystemInfoSync().SDKVersion, "2.6.0") >= 0;
};
e.prototype.isInterstitialLoaded = function() {
return this.interstitialState == a.default.AdState.Loaded;
};
e.prototype.preloadInterstitial = function() {
return i(this, void 0, void 0, function() {
var t = this;
return o(this, function(e) {
switch (e.label) {
case 0:
return this.isSupportInterstitial() ? this.interstitialState == a.default.AdState.Loaded ? [ 2 ] : this.interstitialState != a.default.AdState.Loading ? [ 3, 2 ] : [ 4, u.default.waitUntil(function() {
return t.interstitialState != a.default.AdState.Loading;
}) ] : [ 2 ];

case 1:
return [ 2, e.sent() ];

case 2:
this.interstitialState = a.default.AdState.Loading;
if (null == this.interstitial) {
this.interstitial = qq.createInterstitialAd({
adUnitId: l.default.qq.interstitialId
});
this.interstitial.onLoad(function() {
t.interstitialState = a.default.AdState.Loaded;
});
this.interstitial.onError(function(e) {
return i(t, void 0, void 0, function() {
return o(this, function(t) {
this.interstitialState = a.default.AdState.None;
return [ 2 ];
});
});
});
this.interstitial.onClose(function() {
t.interstitialState = a.default.AdState.None;
t.emit(a.default.EventType.CloseInterstitial);
});
}
return [ 2 ];
}
});
});
};
e.prototype.showInterstitial = function() {
return i(this, void 0, void 0, function() {
var t;
return o(this, function(e) {
switch (e.label) {
case 0:
if (!this.isSupportInterstitial()) return [ 2 ];
if (!this.isInterstitialLoaded()) return [ 2 ];
e.label = 1;

case 1:
e.trys.push([ 1, 3, , 4 ]);
return [ 4, this.interstitial.show() ];

case 2:
e.sent();
this.interstitialState = a.default.AdState.Opening;
this.emit(a.default.EventType.OpenInterstitial);
return [ 3, 4 ];

case 3:
t = e.sent();
console.error(t);
return [ 3, 4 ];

case 4:
return [ 2 ];
}
});
});
};
e.prototype.sendInvite = function(t, e, n) {
return i(this, void 0, Promise, function() {
return o(this, function(r) {
switch (r.label) {
case 0:
qq.shareAppMessage({
title: t,
imageUrl: t,
query: s.default.formatParams(n)
});
return [ 4, u.default.wait(1) ];

case 1:
r.sent();
this.emit(a.default.EventType.OpenShare, t, e, n);
return [ 2 ];
}
});
});
};
e.prototype.vibrate = function(t) {
void 0 === t && (t = !0);
t ? qq.vibrateShort({
success: null,
fail: null,
complete: null
}) : qq.vibrateLong({
success: null,
fail: null,
complete: null
});
};
e.prototype.linkGame = function(t, e, n) {
return new Promise(function(r, i) {
qq.navigateToMiniProgram({
appId: t,
path: e,
extraData: n,
success: function() {
console.log("跳转 " + t);
r(!0);
},
fail: i
});
});
};
return e;
}(a.default);
n.default = f;
cc._RF.pop();
}, {
"../../Module/Defines/PlatformConfig": "PlatformConfig",
"../Helpers/HttpHelper": "HttpHelper",
"../Helpers/PromiseHelper": "PromiseHelper",
"../Helpers/StringHelper": "StringHelper",
"../Interfaces/IPlatform": "IPlatform"
} ],
Queue: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "79c79qQ7m5IiYx3uJet3L1O", "Queue");
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = function() {
function t() {
this.items = new Array();
}
t.prototype.enqueue = function(t) {
this.items.push(t);
};
t.prototype.dequeue = function() {
if (this.isEmpty()) throw new Error("This queue is empty");
return this.items.shift();
};
t.prototype.size = function() {
return this.items.length;
};
t.prototype.has = function(t) {
if (this.isEmpty) return !1;
for (var e = 0; e < this.items.length; e++) if (this.items[e] == t) return !0;
return !1;
};
t.prototype.isEmpty = function() {
return 0 == this.items.length;
};
t.prototype.front = function() {
if (this.isEmpty()) throw new Error("This queue is empty");
return this.items[0];
};
t.prototype.back = function() {
if (this.isEmpty()) throw new Error("This queue is empty");
return this.items[this.items.length - 1];
};
t.prototype.display = function() {
for (var t = "", e = 0; e < this.items.length; e++) t += JSON.stringify(this.items[e]) + "\n";
console.log(t);
};
t.prototype.clear = function() {
delete this.items;
this.items = [];
};
return t;
}();
n.default = r;
cc._RF.pop();
}, {} ],
RandomHelper: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "45413LEsuVEmpCrnvtAb7xv", "RandomHelper");
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = function() {
function t() {}
t.getBoolean = function() {
return Math.random() > .5;
};
t.getUUID = function() {
var t = new Date().getTime();
return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
var n = Math.floor((t + 16 * Math.random()) % 16);
return ("x" == e ? n : 3 & n | 8).toString(16).toUpperCase();
});
};
t.getInt = function(t, e) {
return null != e ? Math.round(Math.random() * (e - t)) + t : Math.round(Math.random() * t);
};
t.getFloat = function(t, e) {
return null != e ? Math.random() * (e - t) + t : Math.random() * t;
};
t.getWeightIndex = function(e) {
var n = e.length;
if (n <= 0) return -1;
for (var r = 0, i = 0; i < n; ++i) r += e[i];
var o = t.getInt(0, r);
for (i = n - 1; i >= 0; --i) if ((r -= e[i]) <= o) return i;
return 0;
};
return t;
}();
n.default = r;
cc._RF.pop();
}, {} ],
SceneService: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "6019c2+EGVDYY0VTK2z5RZj", "SceneService");
var r = this && this.__decorate || function(t, e, n, r) {
var i, o = arguments.length, a = o < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, n, r); else for (var s = t.length - 1; s >= 0; s--) (i = t[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(e, n, a) : i(e, n)) || a);
return o > 3 && a && Object.defineProperty(e, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = t("../../Blade/Decorators/Singleton"), o = t("../../Blade/Decorators/Service"), a = t("../Libs/Structs/Stack"), s = function() {
function t() {
this.stack = new a.default();
}
t.prototype.initialize = function() {};
t.prototype.lazyInitialize = function() {
this.stack.push({
name: cc.director.getScene().name,
params: blade.platform.getPlatform().getLaunchOptions()
});
};
t.prototype.runScene = function(t, e) {
void 0 === e && (e = {});
this.stack.push({
name: t,
params: e
});
cc.director.loadScene(t);
};
t.prototype.preloadScene = function(t, e) {
return new Promise(function(n, r) {
cc.director.preloadScene(t, function(t, n, r) {
e && e(t, n, r);
}, function(t) {
n(!t);
});
});
};
t.prototype.getSceneParam = function() {
if (this.stack.size() > 0) {
var t = this.stack.peek().params;
return void 0 === t ? {} : t;
}
return null;
};
t.prototype.backScene = function() {
if (this.stack.size() >= 2) {
this.stack.pop();
var t = this.stack.peek();
cc.director.loadScene(t.name);
} else console.error("该场景为第一个,无法返回上一个场景！");
};
return t = r([ i.default, o.default("SceneService") ], t);
}();
n.default = s;
cc._RF.pop();
}, {
"../../Blade/Decorators/Service": "Service",
"../../Blade/Decorators/Singleton": "Singleton",
"../Libs/Structs/Stack": "Stack"
} ],
Service: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "74f5bu+uYJN+41OhnrnRwNE", "Service");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.default = function(t) {
return function(e) {
Reflect.defineProperty(e.prototype, "alias", {
value: t
});
};
};
cc._RF.pop();
}, {} ],
Singleton: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "76b88d9Z8dMRZe/yTbYjrdo", "Singleton");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.default = function(t) {
var e = t;
Reflect.defineProperty(t, "instance", {
get: function() {
null == e._instance && (e._instance = new e());
return e._instance;
},
set: function() {
throw new Error("不允许对单例赋值!");
}
});
};
cc._RF.pop();
}, {} ],
SinglyList: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "cdcafXjPuhI9KGRtcHCfa6X", "SinglyList");
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = function() {
function t(t) {
this.value = null;
this.next = null;
this.value = t;
}
t.prototype.toString = function() {
return JSON.stringify(this.value);
};
return t;
}(), i = function() {
function t() {
this.head = null;
this.length = 0;
}
t.prototype.addNodeOnBack = function(t) {
var e = new r(t), n = this.head;
if (!n) {
this.head = e;
this.length++;
return e;
}
for (;n.next; ) n = n.next;
n.next = e;
this.length++;
return e;
};
t.prototype.addNodeOnFront = function(t) {
var e = new r(t);
this.head || (this.head = e);
e.next = this.head;
this.head = e;
};
t.prototype.addNodeByIndex = function(t, e) {
if ((t = Math.floor(t)) < 0 || t >= this.length) return null;
var n = new r(e);
if (0 == t) {
n.next = this.head;
this.head = n;
return this.head;
}
var i = this.getNodeByIndex(t - 1);
if (i) {
n.next = i.next;
i.next = n;
return n;
}
};
t.prototype.removeNodeByIndex = function(t) {
if ((t = Math.floor(t)) < 0 || t >= this.length) return null;
var e = this.head;
if (0 == t) {
this.head = this.head.next;
return e;
}
for (var n = 0; n < t - 1; n++) e = e.next;
var r = e.next;
e.next = r.next;
r.next = null;
return r;
};
t.prototype.removeNodeByNode = function(t) {
return this.removeNodeByIndex(this.getIndexByNode(t));
};
t.prototype.removeNodeByValue = function(t) {
return this.removeNodeByIndex(this.getIndexByValue(t));
};
t.prototype.setValueByIndex = function(t, e) {
if (!((t = Math.floor(t)) < 0 || t >= this.length)) {
var n = this.getNodeByIndex(t);
n && (n.value = e);
}
};
t.prototype.getNodeByValue = function(t) {
for (var e = this.head; e && e.value != t; ) e = e.next;
return e;
};
t.prototype.getNodeByIndex = function(t) {
if ((t = Math.floor(t)) < 0 || t >= this.length) return null;
for (var e = this.head, n = 0; n < t; n++) e = e.next;
return e;
};
t.prototype.getIndexByNode = function(t) {
for (var e = 0, n = this.head; n && t != n; ) {
n = n.next;
e += 1;
}
return n ? e : -1;
};
t.prototype.getIndexByValue = function(t) {
return this.getIndexByNode(this.getNodeByValue(t));
};
t.prototype.ReverseIteratively = function() {
for (var t = this.head, e = this.head, n = null; null != e; ) {
var r = e.next;
null == r && (t = e);
e.next = n;
n = e;
e = r;
}
this.head = t;
return this.head;
};
t.prototype.searchMid = function() {
for (var t = this.head, e = this.head; null != t && null != t.next && null != t.next.next; ) {
t = t.next.next;
e = e.next;
}
return e;
};
t.prototype.display = function() {
for (var t = this.head, e = ""; t; ) {
e += JSON.stringify(t.value) + "\n";
t = t.next;
}
console.log(e);
};
t.prototype.isEmpty = function() {
return 0 === this.length;
};
t.prototype.size = function() {
return this.length;
};
return t;
}();
n.default = i;
cc._RF.pop();
}, {} ],
SocketHelper: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "85b3dy58NhHkapAUecTETAl", "SocketHelper");
var r = this && this.__awaiter || function(t, e, n, r) {
function i(t) {
return t instanceof n ? t : new n(function(e) {
e(t);
});
}
return new (n || (n = Promise))(function(n, o) {
function a(t) {
try {
c(r.next(t));
} catch (t) {
o(t);
}
}
function s(t) {
try {
c(r.throw(t));
} catch (t) {
o(t);
}
}
function c(t) {
t.done ? n(t.value) : i(t.value).then(a, s);
}
c((r = r.apply(t, e || [])).next());
});
}, i = this && this.__generator || function(t, e) {
var n, r, i, o, a = {
label: 0,
sent: function() {
if (1 & i[0]) throw i[1];
return i[1];
},
trys: [],
ops: []
};
return o = {
next: s(0),
throw: s(1),
return: s(2)
}, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
return this;
}), o;
function s(t) {
return function(e) {
return c([ t, e ]);
};
}
function c(o) {
if (n) throw new TypeError("Generator is already executing.");
for (;a; ) try {
if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 
0) : r.next) && !(i = i.call(r, o[1])).done) return i;
(r = 0, i) && (o = [ 2 & o[0], i.value ]);
switch (o[0]) {
case 0:
case 1:
i = o;
break;

case 4:
a.label++;
return {
value: o[1],
done: !1
};

case 5:
a.label++;
r = o[1];
o = [ 0 ];
continue;

case 7:
o = a.ops.pop();
a.trys.pop();
continue;

default:
if (!(i = a.trys, i = i.length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
a = 0;
continue;
}
if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
a.label = o[1];
break;
}
if (6 === o[0] && a.label < i[1]) {
a.label = i[1];
i = o;
break;
}
if (i && a.label < i[2]) {
a.label = i[2];
a.ops.push(o);
break;
}
i[2] && a.ops.pop();
a.trys.pop();
continue;
}
o = e.call(t, a);
} catch (t) {
o = [ 6, t ];
r = 0;
} finally {
n = i = 0;
}
if (5 & o[0]) throw o[1];
return {
value: o[0] ? o[1] : void 0,
done: !0
};
}
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = t("./PromiseHelper"), a = function() {
function t() {}
t.createSocket = function(e, n) {
if (t.list.has(e)) throw new Error("已经存在对应的Socket");
var r = new t.Socket(n);
t.list.set(e, r);
return r;
};
t.getSocket = function(e) {
if (t.list.has(e)) return t.list.get(e);
};
t.removeSocket = function(e) {
if (t.list.has(e)) {
var n = t.list.get(e);
t.list.delete(e);
n.getStatus() == t.LinkStatus.SUCCEED && n.disConnect();
}
};
t.list = new Map();
return t;
}();
(function(t) {
var e = function() {
function e(e) {
this.io = null;
this.url = null;
this.status = t.LinkStatus.EMPTY;
e && this.connect(e);
}
e.prototype.connect = function(e) {
if (null != e) if (this.url && e != this.url) console.warn("Socket 连接地址改变，请先执行disConnect"); else if (this.status == t.LinkStatus.SUCCEED) console.warn("Socket 已经处于连接状态"); else if (null == this.io) {
this.setStatus(t.LinkStatus.EMPTY);
this.url = e;
this.io = io(e, {
transports: [ "websocket", "polling" ]
});
this.addDefaultEvent();
this.io.connect();
} else this.io.connect(); else console.warn("Socket 无连接地址");
};
e.prototype.disConnect = function() {
if (this.io) {
this.url = null;
this.status == t.LinkStatus.SUCCEED && this.io.disconnect();
this.removeDefaultEvent();
this.io = null;
this.setStatus(t.LinkStatus.EMPTY);
} else console.warn("Socket 已经断开连接");
};
e.prototype.getStatus = function() {
return this.status;
};
e.prototype.setStatus = function(t) {
this.status = t;
};
e.prototype.addDefaultEvent = function() {
if (null != this.io) {
this.on(t.EventType.CONNECT, this.onConnect, this);
this.on(t.EventType.DISCONNECT, this.onDisConnect, this);
}
};
e.prototype.removeDefaultEvent = function() {
if (null != this.io) {
this.off(t.EventType.CONNECT, this.onConnect, this);
this.off(t.EventType.DISCONNECT, this.onDisConnect, this);
}
};
e.prototype.onConnect = function() {
console.log("Socket 连接成功!");
this.setStatus(t.LinkStatus.SUCCEED);
};
e.prototype.onDisConnect = function() {
console.log("Socket 已断开!");
this.setStatus(t.LinkStatus.FAILED);
};
e.prototype.on = function(t, e, n) {
this.io && this.io.on(t, e.bind(n));
};
e.prototype.off = function(t, e, n) {
this.io && this.io.off(t, e.bind(n));
};
e.prototype.once = function(t, e, n) {
this.io && this.io.once(t, e.bind(n));
};
e.prototype.emit = function(e) {
for (var n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];
this.status == t.LinkStatus.SUCCEED && this.io.emit(e, n);
};
e.prototype.emitSync = function(n, a, s) {
return r(this, void 0, Promise, function() {
var r = this;
return i(this, function(i) {
switch (i.label) {
case 0:
this.off(a, this.onEmitSync, a);
this.once(a, this.onEmitSync, a);
e.syncResult.delete(a);
this.emit(n, s);
return [ 4, o.default.waitUntil(function() {
return e.syncResult.has(a) || r.status == t.LinkStatus.FAILED;
}) ];

case 1:
i.sent();
if (this.status == t.LinkStatus.SUCCEED) return [ 2, e.syncResult.get(a) ];
throw new Error("连接断开");
}
});
});
};
e.prototype.onEmitSync = function(t) {
"string" == typeof t ? e.syncResult.set(this.toString(), JSON.parse(t)) : e.syncResult.set(this.toString(), t);
};
e.syncResult = new Map();
return e;
}();
t.Socket = e;
var n = function() {
function t() {}
t.CONNECT = "connect";
t.CONNECT_TIMEOUT = "connect_timeout";
t.CONNECT_ERROR = "connect_error";
t.ERROR = "error";
t.CONNECT_ATTEMPT = "connec_attempt";
t.RECONNECT = "reconnect";
t.RECONNECTING = "reconnecting";
t.RECONNECT_ERROR = "reconnect_error";
t.RECONNECT_FAILED = "reconnect_failed";
t.DISCONNECT = "disconnect";
t.PING = "ping";
t.PONG = "pong";
return t;
}();
t.EventType = n;
(function(t) {
t[t.FAILED = 0] = "FAILED";
t[t.SUCCEED = 1] = "SUCCEED";
t[t.EMPTY = 2] = "EMPTY";
})(t.LinkStatus || (t.LinkStatus = {}));
})(a || (a = {}));
n.default = a;
cc._RF.pop();
}, {
"./PromiseHelper": "PromiseHelper"
} ],
SportHelper: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "f1c3fIFi2RJZp29IiQrtapv", "SportHelper");
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = function() {
function t() {}
t.getSport = function(e, n, r, i) {
void 0 === n && (n = new cc.Vec3(0, -230, 0));
void 0 === r && (r = new cc.Vec3(0, 0, 0));
void 0 === i && (i = new cc.Vec3(0, 0, 0));
return new t.Sport(e, n, r, i);
};
return t;
}();
(function(t) {
var e = function() {
function e(e, n, r, i) {
void 0 === n && (n = new cc.Vec3(0, -230, 0));
void 0 === r && (r = new cc.Vec3(0, 0, 0));
void 0 === i && (i = new cc.Vec3(0, 0, 0));
var o = {
a: n.div(t.PTM_RATIO),
v: r.div(t.PTM_RATIO),
location: new cc.Vec3(e.x, e.y, e.z),
damping: i = new cc.Vec3(i.x, i.y, i.z)
};
this.node = e;
this.info = o;
}
e.prototype.updateX = function(e, n) {
e.location.x += this.s(e.v.x, e.a.x, n) * t.PTM_RATIO;
var r = -e.damping.x * e.v.x * n;
e.v.x = this.v(e.v.x, e.a.x, n) + r;
};
e.prototype.updateY = function(e, n) {
e.location.y += this.s(e.v.y, e.a.y, n) * t.PTM_RATIO;
var r = -e.damping.y * e.v.y * n;
e.v.y = this.v(e.v.y, e.a.y, n) + r;
};
e.prototype.updateZ = function(e, n) {
e.location.z += this.s(e.v.z, e.a.z, n) * t.PTM_RATIO;
var r = -e.damping.z * e.v.z * n;
e.v.z = this.v(e.v.z, e.a.z, n) + r;
};
e.prototype.updatePostion = function(t, e) {
this.updateX(t, e);
this.updateY(t, e);
this.updateZ(t, e);
};
e.prototype.getPredictLocation = function(t) {
var e = {
a: this.info.a.div(1),
v: this.info.v.div(1),
damping: this.info.damping.div(1),
location: this.info.location.div(1)
};
this.updatePostion(e, t);
return e.location;
};
e.prototype.updateNodeLocation = function(t) {
this.updatePostion(this.info, t);
this.node.x = this.info.location.x;
this.node.y = this.info.location.y;
this.node.z = this.info.location.z;
};
e.prototype.v = function(t, e, n) {
return t + e * n;
};
e.prototype.s = function(t, e, n) {
return t * n + e * n * n / 2;
};
return e;
}();
t.Sport = e;
t.PTM_RATIO = 32;
})(r || (r = {}));
n.default = r;
cc._RF.pop();
}, {} ],
Stack: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "63aa5OHPU5Nt7vNRYp++WVC", "Stack");
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = function() {
function t() {
this.items = new Array();
}
t.prototype.push = function(t) {
this.items.push(t);
};
t.prototype.pop = function() {
if (this.isEmpty()) throw new Error("空栈！");
return this.items.pop();
};
t.prototype.peek = function() {
if (this.isEmpty()) throw new Error("空栈！");
return this.items[this.items.length - 1];
};
t.prototype.isEmpty = function() {
return 0 === this.items.length;
};
t.prototype.clear = function() {
delete this.items;
this.items = [];
};
t.prototype.size = function() {
return this.items.length;
};
t.prototype.display = function() {
for (var t = "", e = this.items.length - 1; e >= 0; e--) t += JSON.stringify(this.items[e]) + "\n";
console.log(t);
};
t.prototype.has = function(t) {
if (this.isEmpty) return !1;
for (var e = 0; e < this.items.length; e++) if (this.items[e] == t) return !0;
return !1;
};
return t;
}();
n.default = r;
cc._RF.pop();
}, {} ],
StateMachine: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "d3e2du4RhBHQogH9QA8HsLV", "StateMachine");
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = function() {
function t(t) {
this.state = null;
this.setState(t);
blade.ticker.register(this);
}
t.prototype.setState = function(t) {
this.state && this.state.onExit();
this.state = t;
this.state.onEnter();
};
t.prototype.getStateName = function() {
return this.state.getName();
};
t.prototype.onTick = function(t) {
var e = this.state.transition();
e ? this.setState(e) : this.state.onUpdate(t);
};
return t;
}();
(function(t) {
var e = function() {
function t() {
this.transitions = new Map();
}
t.prototype.getName = function() {
this.name;
};
t.prototype.addTransition = function(t, e) {
this.transitions.set(t, e);
};
t.prototype.removeTransition = function(t) {
this.transitions.delete(t);
};
t.prototype.isMeet = function() {
var t = !1;
this.transitions.forEach(function(e) {
e.isMeet() && (t = !0);
});
return t;
};
t.prototype.transition = function() {
var t = null;
this.transitions.forEach(function(e, n) {
e.isMeet() && (t = n);
});
return t;
};
return t;
}();
t.IState = e;
var n = function() {
return function() {};
}();
t.ITransition = n;
})(r || (r = {}));
n.default = r;
cc._RF.pop();
}, {} ],
StringHelper: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "d9a1e+uTiVHO6gZH1jrNfWo", "StringHelper");
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = function() {
function t() {}
t.startsWith = function(t, e) {
return t.slice(0, e.length) == e;
};
t.endsWith = function(t, e) {
return t.slice(e.length) == e;
};
t.compareVersion = function(t, e) {
for (var n = t.split("."), r = e.split("."), i = Math.min(n.length, r.length), o = 0; o < i; ++o) {
var a = parseInt(n[o]) || 0, s = parseInt(r[o]) || 0;
if (a > s) return 1;
if (a < s) return -1;
}
return n.length > r.length ? 1 : n.length < r.length ? -1 : 0;
};
return t;
}();
n.default = r;
cc._RF.pop();
}, {} ],
TestCommand: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "8eb02Z3S6JODLuZZWNMXyUE", "TestCommand");
var r = this && this.__extends || function() {
var t = function(e, n) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
})(e, n);
};
return function(e, n) {
t(e, n);
function r() {
this.constructor = e;
}
e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r());
};
}();
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = t("../../Blade/Interfaces/ICommand"), o = t("../../Blade/Services/ViewService"), a = t("../../Blade/Services/ControllerService"), s = function(t) {
r(e, t);
function e() {
return null !== t && t.apply(this, arguments) || this;
}
e.prototype.exec = function() {
for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
o.default.instance.orderViewById("UIView", "test", t[0]);
a.default.instance.orderControllerById("UIController", "test", t[1]);
};
e.prototype.undo = function() {};
return e;
}(i.default);
n.default = s;
cc._RF.pop();
}, {
"../../Blade/Interfaces/ICommand": "ICommand",
"../../Blade/Services/ControllerService": "ControllerService",
"../../Blade/Services/ViewService": "ViewService"
} ],
TestPanel: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "362fdUbizVCxJWigqbDIzjM", "TestPanel");
var r = this && this.__extends || function() {
var t = function(e, n) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
})(e, n);
};
return function(e, n) {
t(e, n);
function r() {
this.constructor = e;
}
e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r());
};
}(), i = this && this.__decorate || function(t, e, n, r) {
var i, o = arguments.length, a = o < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, n, r); else for (var s = t.length - 1; s >= 0; s--) (i = t[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(e, n, a) : i(e, n)) || a);
return o > 3 && a && Object.defineProperty(e, n, a), a;
}, o = this && this.__awaiter || function(t, e, n, r) {
function i(t) {
return t instanceof n ? t : new n(function(e) {
e(t);
});
}
return new (n || (n = Promise))(function(n, o) {
function a(t) {
try {
c(r.next(t));
} catch (t) {
o(t);
}
}
function s(t) {
try {
c(r.throw(t));
} catch (t) {
o(t);
}
}
function c(t) {
t.done ? n(t.value) : i(t.value).then(a, s);
}
c((r = r.apply(t, e || [])).next());
});
}, a = this && this.__generator || function(t, e) {
var n, r, i, o, a = {
label: 0,
sent: function() {
if (1 & i[0]) throw i[1];
return i[1];
},
trys: [],
ops: []
};
return o = {
next: s(0),
throw: s(1),
return: s(2)
}, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
return this;
}), o;
function s(t) {
return function(e) {
return c([ t, e ]);
};
}
function c(o) {
if (n) throw new TypeError("Generator is already executing.");
for (;a; ) try {
if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 
0) : r.next) && !(i = i.call(r, o[1])).done) return i;
(r = 0, i) && (o = [ 2 & o[0], i.value ]);
switch (o[0]) {
case 0:
case 1:
i = o;
break;

case 4:
a.label++;
return {
value: o[1],
done: !1
};

case 5:
a.label++;
r = o[1];
o = [ 0 ];
continue;

case 7:
o = a.ops.pop();
a.trys.pop();
continue;

default:
if (!(i = a.trys, i = i.length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
a = 0;
continue;
}
if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
a.label = o[1];
break;
}
if (6 === o[0] && a.label < i[1]) {
a.label = i[1];
i = o;
break;
}
if (i && a.label < i[2]) {
a.label = i[2];
a.ops.push(o);
break;
}
i[2] && a.ops.pop();
a.trys.pop();
continue;
}
o = e.call(t, a);
} catch (t) {
o = [ 6, t ];
r = 0;
} finally {
n = i = 0;
}
if (5 & o[0]) throw o[1];
return {
value: o[0] ? o[1] : void 0,
done: !0
};
}
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var s = t("../../Blade/Interfaces/IPopup"), c = cc._decorator, u = c.ccclass, l = (c.property, 
function(t) {
r(e, t);
function e() {
return null !== t && t.apply(this, arguments) || this;
}
e.prototype.applyTemplate = function(t) {
console.log("打开参数", t);
};
e.prototype.onConfirm = function() {
return o(this, void 0, void 0, function() {
var t;
return a(this, function(e) {
switch (e.label) {
case 0:
return [ 4, blade.popup.popNode("TestPanel", {
a: 1,
b: 2
}) ];

case 1:
t = e.sent();
console.log(t);
return [ 2 ];
}
});
});
};
return e = i([ u ], e);
}(s.default));
n.default = l;
cc._RF.pop();
}, {
"../../Blade/Interfaces/IPopup": "IPopup"
} ],
TickerService: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "1d021chr7xDQ4p1RQHgPODe", "TickerService");
var r = this && this.__extends || function() {
var t = function(e, n) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
})(e, n);
};
return function(e, n) {
t(e, n);
function r() {
this.constructor = e;
}
e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r());
};
}(), i = this && this.__decorate || function(t, e, n, r) {
var i, o = arguments.length, a = o < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, n, r); else for (var s = t.length - 1; s >= 0; s--) (i = t[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(e, n, a) : i(e, n)) || a);
return o > 3 && a && Object.defineProperty(e, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = t("../../Blade/Decorators/Singleton"), a = t("../../Blade/Decorators/Service"), s = function() {
function t() {
this._timeScale = 1;
this._pause = !1;
this.tickList = new Set();
}
t.prototype.initialize = function() {};
t.prototype.lazyInitialize = function() {
var t = cc.find("Blade");
null == t.getComponent(c) && t.addComponent(c);
};
Object.defineProperty(t.prototype, "timeScale", {
get: function() {
return this._timeScale;
},
set: function(t) {
this._timeScale = t > 0 ? t : 1;
cc.warn("设置时间缩放：" + this._timeScale);
},
enumerable: !1,
configurable: !0
});
Object.defineProperty(t.prototype, "pause", {
get: function() {
return this._pause;
},
set: function(t) {
t != this._pause && (this._pause = t);
},
enumerable: !1,
configurable: !0
});
t.prototype.setPause = function(t) {
this.pause = t;
};
t.prototype.tick = function(t) {
var e = this;
t *= this._timeScale;
this.tickList.forEach(function(n) {
e._pause || n.onTick(t);
});
};
t.prototype.fixedTick = function(t) {
var e = this, n = 1 / cc.game.getFrameRate() * this._timeScale;
this.tickList.forEach(function(t) {
t.onFixedTick && (e._pause || t.onFixedTick(n));
});
};
t.prototype.lateTick = function() {
var t = this;
this.tickList.forEach(function(e) {
e.onLateTick && (t._pause || e.onLateTick());
});
};
t.prototype.register = function(t) {
0 == this.tickList.has(t) && this.tickList.add(t);
};
t.prototype.unregister = function(t) {
this.tickList.has(t) && this.tickList.delete(t);
};
return t = i([ o.default, a.default("TickerService") ], t);
}();
n.default = s;
var c = function(t) {
r(e, t);
function e() {
return null !== t && t.apply(this, arguments) || this;
}
e.prototype.onLoad = function() {
this.tickerService = s.instance;
};
e.prototype.update = function(t) {
this.tickerService.tick(t);
this.tickerService.fixedTick(t);
};
e.prototype.lateUpdate = function() {
this.tickerService.lateTick();
};
return e;
}(cc.Component);
cc._RF.pop();
}, {
"../../Blade/Decorators/Service": "Service",
"../../Blade/Decorators/Singleton": "Singleton"
} ],
Ticker: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "88c8eFDPHZIsbTfsC9Df5Eq", "Ticker");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.default = function(t) {
var e = t.prototype, n = Reflect.get(e, "onLoad"), r = Reflect.get(e, "onDestroy");
Reflect.set(e, "onLoad", function() {
blade.ticker.register(this);
n && n();
});
Reflect.set(e, "onDestroy", function() {
r && r();
blade.ticker.unregister(this);
});
};
cc._RF.pop();
}, {} ],
TimerService: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "91872+TPkJF/7NCK2DRmm3G", "TimerService");
var r = this && this.__decorate || function(t, e, n, r) {
var i, o = arguments.length, a = o < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, n, r); else for (var s = t.length - 1; s >= 0; s--) (i = t[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(e, n, a) : i(e, n)) || a);
return o > 3 && a && Object.defineProperty(e, n, a), a;
}, i = this && this.__spreadArrays || function() {
for (var t = 0, e = 0, n = arguments.length; e < n; e++) t += arguments[e].length;
var r = Array(t), i = 0;
for (e = 0; e < n; e++) for (var o = arguments[e], a = 0, s = o.length; a < s; a++, 
i++) r[i] = o[a];
return r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = t("../../Blade/Decorators/Service"), a = t("../../Blade/Decorators/Singleton"), s = t("../Libs/ArchiveServerSDK/ArchiveServerSDK"), c = function() {
function t() {
this.timeStamp = new Date().getTime();
this.lastSyncTime = new Date().getTime();
this.syncing = !1;
this.list = new Set();
}
e = t;
t.prototype.initialize = function() {
var t = this;
this.list.clear();
blade.ticker.register(this);
this.startTimer(1, function() {
t.timeStamp > 0 && (t.timeStamp += 1e3);
!t.syncing && t.timeStamp - t.lastSyncTime > e.SYNC_INTERVAL && t.syncTime();
});
};
t.prototype.lazyInitialize = function() {};
t.prototype.syncTime = function() {
var t = this;
if (this.syncing) return Promise.resolve("正在同步时间!");
this.syncing = !0;
return new Promise(function(n, r) {
s.default.getTime().then(function(i) {
console.log("同步时间:", t.timeStamp, "  :  ", i);
if (Math.abs(t.timeStamp - i) > e.MAX_TIME_DIFF) {
t.timeStamp = t.lastSyncTime = i;
t.syncing = !1;
r("超出出可接受的时间差!");
} else {
t.timeStamp = t.lastSyncTime = i;
t.syncing = !1;
n(i);
}
}).catch(function(e) {
t.syncing = !1;
r(e);
});
});
};
t.prototype.getTime = function() {
return Math.floor(this.timeStamp);
};
t.prototype.getSecond = function() {
return Math.floor(this.timeStamp / 1e3);
};
t.prototype.startTimer = function(t, e, n) {
for (var r = [], i = 3; i < arguments.length; i++) r[i - 3] = arguments[i];
var o = {
interval: t,
timeRemain: t,
times: -1,
callback: e,
thisArgs: n,
args: r
};
this.list.add(o);
return o;
};
t.prototype.stopTimer = function(t) {
this.list.delete(t);
};
t.prototype.startTimeout = function(t, e, n) {
for (var r = [], i = 3; i < arguments.length; i++) r[i - 3] = arguments[i];
var o = {
interval: t,
timeRemain: t,
times: 1,
callback: e,
thisArgs: n,
args: r
};
this.list.add(o);
return o;
};
t.prototype.runNextFrame = function(t, e) {
cc.director.once(cc.Director.EVENT_BEFORE_UPDATE, t, e);
};
t.prototype.onTick = function(t) {
var e = this, n = [];
this.list.forEach(function(e) {
var r;
e.timeRemain -= t;
if (e.timeRemain <= 0) {
(r = e.callback).apply.apply(r, i([ e.thisArgs ], e.args));
e.times > 0 && --e.times;
0 == e.times ? n.push(e) : e.timeRemain = e.interval;
}
});
n.forEach(function(t) {
e.stopTimer(t);
});
};
var e;
t.SYNC_INTERVAL = 6e4;
t.MAX_TIME_DIFF = 6e4;
return t = e = r([ a.default, o.default("TimerService") ], t);
}();
n.default = c;
cc._RF.pop();
}, {
"../../Blade/Decorators/Service": "Service",
"../../Blade/Decorators/Singleton": "Singleton",
"../Libs/ArchiveServerSDK/ArchiveServerSDK": "ArchiveServerSDK"
} ],
TweenService: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "2f409v4jI1H+q4wQYsC/cns", "TweenService");
var r = this && this.__decorate || function(t, e, n, r) {
var i, o = arguments.length, a = o < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, n, r); else for (var s = t.length - 1; s >= 0; s--) (i = t[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(e, n, a) : i(e, n)) || a);
return o > 3 && a && Object.defineProperty(e, n, a), a;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = t("../../Blade/Decorators/Service"), o = t("../../Blade/Decorators/Singleton"), a = t("../Libs/Tween/Tween"), s = function() {
function t() {}
t.prototype.initialize = function() {
a.default.customTick = !0;
blade.ticker.register(this);
};
t.prototype.lazyInitialize = function() {};
t.prototype.onTick = function() {
a.default.tick();
};
return t = r([ o.default, i.default("TweenService") ], t);
}();
n.default = s;
cc._RF.pop();
}, {
"../../Blade/Decorators/Service": "Service",
"../../Blade/Decorators/Singleton": "Singleton",
"../Libs/Tween/Tween": "Tween"
} ],
Tween: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "a5fb39AJk9IHKNRDA2g9TB4", "Tween");
var r = this && this.__extends || function() {
var t = function(e, n) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
})(e, n);
};
return function(e, n) {
t(e, n);
function r() {
this.constructor = e;
}
e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r());
};
}();
Object.defineProperty(n, "__esModule", {
value: !0
});
var i = function(t) {
r(e, t);
function e(e, n, r) {
void 0 === r && (r = null);
var i = t.call(this) || this;
i._target = null;
i._useTicks = !1;
i.manualTick = !1;
i.ignoreGlobalPause = !1;
i.loop = !1;
i.pluginData = null;
i._steps = null;
i.paused = !1;
i.duration = 0;
i._prevPos = -1;
i.position = null;
i._prevPosition = 0;
i._stepPosition = 0;
i.passive = !1;
i._timeScale = 1;
i.initialize(e, n, r);
return i;
}
e.get = function(t, n, r, i) {
void 0 === r && (r = null);
void 0 === i && (i = !1);
i && e.removeTweens(t);
return new e(t, n, r);
};
e.removeTweens = function(t) {
if (t.__tweenCount) {
for (var n = e._tweens, r = n.length - 1; r >= 0; r--) if (n[r]._target == t) {
n[r].paused = !0;
n.splice(r, 1);
}
t.__tweenCount = 0;
}
};
e.pauseTweens = function(t) {
if (t.__tweenCount) for (var n = e._tweens, r = n.length - 1; r >= 0; r--) n[r]._target == t && (n[r].paused = !0);
};
e.resumeTweens = function(t) {
if (t.__tweenCount) for (var n = e._tweens, r = n.length - 1; r >= 0; r--) n[r]._target == t && (n[r].paused = !1);
};
Object.defineProperty(e, "customTick", {
set: function(t) {
if (e._cumstomTick != t) {
e._cumstomTick = t;
if (1 == t && e._inited && e._intervalId > 0) {
clearInterval(e._intervalId);
e._intervalId = -1;
}
}
},
enumerable: !1,
configurable: !0
});
e.tick = function(t) {
void 0 === t && (t = !1);
var n = Date.now();
if (!(e._lastTime <= 0)) {
var r = n - e._lastTime;
e._lastTime = n;
for (var i = e._tweens.concat(), o = i.length - 1; o >= 0; o--) {
var a = i[o];
t && !a.ignoreGlobalPause || a.paused || a.manualTick || a.tick(a._useTicks ? 1 : r);
}
return !1;
}
e._lastTime = n;
};
e._register = function(t, n) {
var r = t._target, i = e._tweens;
if (n) {
r && (r.__tweenCount = r.__tweenCount > 0 ? r.__tweenCount + 1 : 1);
i.push(t);
if (!e._inited) {
e._lastTime = Date.now();
e._cumstomTick || (e._intervalId = setInterval(e.tick, 1e3 / cc.game.getFrameRate()));
e._inited = !0;
}
} else {
r && r.__tweenCount--;
for (var o = i.length; o--; ) if (i[o] == t) {
i.splice(o, 1);
return;
}
}
};
e.removeAllTweens = function() {
for (var t = e._tweens, n = 0, r = t.length; n < r; n++) {
var i = t[n];
i.paused = !0;
i._target.__tweenCount = 0;
}
t.length = 0;
};
e.prototype.initialize = function(t, n, r) {
this._target = t;
if (n) {
this._useTicks = n.useTicks;
this.manualTick = !0 === n.manualTick;
this.ignoreGlobalPause = n.ignoreGlobalPause;
this.loop = !0 === n.loop;
n.onChange && this.on("change", n.onChange, n.onChangeObj);
n.override && e.removeTweens(t);
}
this.pluginData = r || {};
this._curQueueProps = {};
this._initQueueProps = {};
this._steps = [];
n && n.paused ? this.paused = !0 : e._register(this, !0);
n && null != n.position && this.setPosition(n.position, e.NONE);
};
e.prototype.resetPosition = function() {
this._prevPosition = 0;
this._prevPos = -1;
};
e.prototype.setPosition = function(t, e) {
void 0 === e && (e = 1);
t < 0 && (t = 0);
var n = t, r = !1;
if (n >= this.duration) if (this.loop) {
var i = n % this.duration;
n = n > 0 && 0 === i ? this.duration : i;
} else {
n = this.duration;
r = !0;
}
if (n == this._prevPos) return r;
r && this.setPaused(!0);
var o = this._prevPos;
this.position = this._prevPos = n;
this._prevPosition = t;
if (this._target && this._steps.length > 0) {
for (var a = this._steps.length, s = -1, c = 0; c < a; c++) if ("step" == this._steps[c].type) {
s = c;
if (this._steps[c].t <= n && this._steps[c].t + this._steps[c].d >= n) break;
}
for (c = 0; c < a; c++) if ("action" == this._steps[c].type) {
if (0 != e) if (this._useTicks) this._runAction(this._steps[c], n, n); else if (1 == e && n < o) {
o != this.duration && this._runAction(this._steps[c], o, this.duration);
this._runAction(this._steps[c], 0, n, !0);
} else this._runAction(this._steps[c], o, n);
} else if ("step" == this._steps[c].type && s == c) {
var u = this._steps[s];
this._updateTargetProps(u, Math.min((this._stepPosition = n - u.t) / u.d, 1));
}
}
this.emit("change");
return r;
};
e.prototype._runAction = function(t, e, n, r) {
void 0 === r && (r = !1);
var i = e, o = n;
if (e > n) {
i = n;
o = e;
}
var a = t.t;
(a == o || a > i && a < o || r && a == e) && t.f.apply(t.o, t.p);
};
e.prototype._updateTargetProps = function(t, n) {
var r, i, o, a, s, c;
if (t || 1 != n) {
this.passive = !!t.v;
if (this.passive) return;
t.e && (n = t.e(n, 0, 1, 1));
r = t.p0;
i = t.p1;
} else {
this.passive = !1;
r = i = this._curQueueProps;
}
for (var u in this._initQueueProps) {
null == (a = r[u]) && (r[u] = a = this._initQueueProps[u]);
null == (s = i[u]) && (i[u] = s = a);
o = a == s || 0 == n || 1 == n || "number" != typeof a ? 1 == n ? s : a : a + (s - a) * n;
var l = !1;
if (c = e._plugins[u]) for (var f = 0, p = c.length; f < p; f++) {
var d = c[f].tween(this, u, o, r, i, n, !!t && r == i, !t);
d == e.IGNORE ? l = !0 : o = d;
}
l || (this._target[u] = o);
}
};
e.prototype.setPaused = function(t) {
if (this.paused == t) return this;
this.paused = t;
this.manualTick || e._register(this, !t);
return this;
};
e.prototype.replay = function() {
this.resetPosition();
this.setPaused(!1);
};
e.prototype._cloneProps = function(t) {
var e = {};
for (var n in t) e[n] = t[n];
return e;
};
e.prototype._addStep = function(t) {
if (t.d > 0) {
t.type = "step";
this._steps.push(t);
t.t = this.duration;
this.duration += t.d;
}
return this;
};
e.prototype._appendQueueProps = function(t) {
var n, r, i, o, a;
for (var s in t) if (void 0 === this._initQueueProps[s]) {
r = this._target[s];
if (n = e._plugins[s]) for (i = 0, o = n.length; i < o; i++) r = n[i].init(this, s, r);
this._initQueueProps[s] = this._curQueueProps[s] = void 0 === r ? null : r;
} else r = this._curQueueProps[s];
for (var s in t) {
r = this._curQueueProps[s];
if (n = e._plugins[s]) {
a = a || {};
for (i = 0, o = n.length; i < o; i++) n[i].step && n[i].step(this, s, r, t[s], a);
}
this._curQueueProps[s] = t[s];
}
a && this._appendQueueProps(a);
return this._curQueueProps;
};
e.prototype._addAction = function(t) {
t.t = this.duration;
t.type = "action";
this._steps.push(t);
return this;
};
e.prototype._set = function(t, e) {
for (var n in t) e[n] = t[n];
};
e.prototype.wait = function(t, e) {
if (null == t || t <= 0) return this;
var n = this._cloneProps(this._curQueueProps);
return this._addStep({
d: t,
p0: n,
p1: n,
v: e
});
};
e.prototype.to = function(t, e, n) {
void 0 === n && (n = void 0);
(isNaN(e) || e < 0) && (e = 0);
this._addStep({
d: e || 0,
p0: this._cloneProps(this._curQueueProps),
e: n,
p1: this._cloneProps(this._appendQueueProps(t))
});
return this.set(t);
};
e.prototype.call = function(t, e, n) {
void 0 === e && (e = void 0);
void 0 === n && (n = void 0);
return this._addAction({
f: t,
p: n || [],
o: e || this._target
});
};
e.prototype.set = function(t, e) {
void 0 === e && (e = null);
this._appendQueueProps(t);
return this._addAction({
f: this._set,
o: this,
p: [ t, e || this._target ]
});
};
e.prototype.setTimeScale = function(t) {
this._timeScale = t;
return this;
};
e.prototype.timeScale = function() {
return this._timeScale;
};
e.prototype.play = function(t) {
t || (t = this);
return this.call(t.setPaused, t, [ !1 ]);
};
e.prototype.pause = function(t) {
t || (t = this);
return this.call(t.setPaused, t, [ !0 ]);
};
e.prototype.tick = function(t) {
this.paused || t <= 0 || this.setPosition(this._prevPosition + t * this._timeScale);
};
e.NONE = 0;
e.LOOP = 1;
e.REVERSE = 2;
e._tweens = [];
e.IGNORE = {};
e._plugins = {};
e._inited = !1;
e._cumstomTick = !1;
e._lastTime = 0;
e._intervalId = -1;
return e;
}(cc.EventTarget);
n.default = i;
cc._RF.pop();
}, {} ],
UIController: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "2d461T6ONJLkrh8GDF06tat", "UIController");
var r = this && this.__extends || function() {
var t = function(e, n) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
})(e, n);
};
return function(e, n) {
t(e, n);
function r() {
this.constructor = e;
}
e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r());
};
}(), i = this && this.__decorate || function(t, e, n, r) {
var i, o = arguments.length, a = o < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, n, r); else for (var s = t.length - 1; s >= 0; s--) (i = t[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(e, n, a) : i(e, n)) || a);
return o > 3 && a && Object.defineProperty(e, n, a), a;
}, o = this && this.__awaiter || function(t, e, n, r) {
function i(t) {
return t instanceof n ? t : new n(function(e) {
e(t);
});
}
return new (n || (n = Promise))(function(n, o) {
function a(t) {
try {
c(r.next(t));
} catch (t) {
o(t);
}
}
function s(t) {
try {
c(r.throw(t));
} catch (t) {
o(t);
}
}
function c(t) {
t.done ? n(t.value) : i(t.value).then(a, s);
}
c((r = r.apply(t, e || [])).next());
});
}, a = this && this.__generator || function(t, e) {
var n, r, i, o, a = {
label: 0,
sent: function() {
if (1 & i[0]) throw i[1];
return i[1];
},
trys: [],
ops: []
};
return o = {
next: s(0),
throw: s(1),
return: s(2)
}, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
return this;
}), o;
function s(t) {
return function(e) {
return c([ t, e ]);
};
}
function c(o) {
if (n) throw new TypeError("Generator is already executing.");
for (;a; ) try {
if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 
0) : r.next) && !(i = i.call(r, o[1])).done) return i;
(r = 0, i) && (o = [ 2 & o[0], i.value ]);
switch (o[0]) {
case 0:
case 1:
i = o;
break;

case 4:
a.label++;
return {
value: o[1],
done: !1
};

case 5:
a.label++;
r = o[1];
o = [ 0 ];
continue;

case 7:
o = a.ops.pop();
a.trys.pop();
continue;

default:
if (!(i = a.trys, i = i.length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
a = 0;
continue;
}
if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
a.label = o[1];
break;
}
if (6 === o[0] && a.label < i[1]) {
a.label = i[1];
i = o;
break;
}
if (i && a.label < i[2]) {
a.label = i[2];
a.ops.push(o);
break;
}
i[2] && a.ops.pop();
a.trys.pop();
continue;
}
o = e.call(t, a);
} catch (t) {
o = [ 6, t ];
r = 0;
} finally {
n = i = 0;
}
if (5 & o[0]) throw o[1];
return {
value: o[0] ? o[1] : void 0,
done: !0
};
}
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var s = t("../../Blade/Interfaces/IController"), c = t("../../Blade/Decorators/Controller"), u = t("../../Blade/Libs/ArchiveServerSDK/ArchiveServerSDK"), l = cc._decorator, f = l.ccclass, p = (l.property, 
function(t) {
r(e, t);
function e() {
return null !== t && t.apply(this, arguments) || this;
}
e.prototype.onRegister = function() {
return o(this, void 0, void 0, function() {
var t, e;
return a(this, function(n) {
switch (n.label) {
case 0:
console.log(u.default.get("harvestCount"));
blade.audio.playBGM("bgm");
t = blade.config.get("arrlist");
console.log(t);
e = blade.config.get("objList");
console.log(e);
return [ 4, u.default.uploadUserInfo() ];

case 1:
n.sent();
return [ 2 ];
}
});
});
};
e.prototype.onUnRegister = function() {};
e.prototype.onTick = function(t) {};
e.prototype.test = function(t) {
console.log("controller func");
};
return e = i([ f, c.default("UIController") ], e);
}(s.default));
n.default = p;
cc._RF.pop();
}, {
"../../Blade/Decorators/Controller": "Controller",
"../../Blade/Interfaces/IController": "IController",
"../../Blade/Libs/ArchiveServerSDK/ArchiveServerSDK": "ArchiveServerSDK"
} ],
UIView: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "bca7c4rfMNGk4dejBFK7qH5", "UIView");
var r = this && this.__extends || function() {
var t = function(e, n) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
})(e, n);
};
return function(e, n) {
t(e, n);
function r() {
this.constructor = e;
}
e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r());
};
}(), i = this && this.__decorate || function(t, e, n, r) {
var i, o = arguments.length, a = o < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, n, r); else for (var s = t.length - 1; s >= 0; s--) (i = t[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(e, n, a) : i(e, n)) || a);
return o > 3 && a && Object.defineProperty(e, n, a), a;
}, o = this && this.__metadata || function(t, e) {
if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(t, e);
}, a = this && this.__awaiter || function(t, e, n, r) {
function i(t) {
return t instanceof n ? t : new n(function(e) {
e(t);
});
}
return new (n || (n = Promise))(function(n, o) {
function a(t) {
try {
c(r.next(t));
} catch (t) {
o(t);
}
}
function s(t) {
try {
c(r.throw(t));
} catch (t) {
o(t);
}
}
function c(t) {
t.done ? n(t.value) : i(t.value).then(a, s);
}
c((r = r.apply(t, e || [])).next());
});
}, s = this && this.__generator || function(t, e) {
var n, r, i, o, a = {
label: 0,
sent: function() {
if (1 & i[0]) throw i[1];
return i[1];
},
trys: [],
ops: []
};
return o = {
next: s(0),
throw: s(1),
return: s(2)
}, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
return this;
}), o;
function s(t) {
return function(e) {
return c([ t, e ]);
};
}
function c(o) {
if (n) throw new TypeError("Generator is already executing.");
for (;a; ) try {
if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 
0) : r.next) && !(i = i.call(r, o[1])).done) return i;
(r = 0, i) && (o = [ 2 & o[0], i.value ]);
switch (o[0]) {
case 0:
case 1:
i = o;
break;

case 4:
a.label++;
return {
value: o[1],
done: !1
};

case 5:
a.label++;
r = o[1];
o = [ 0 ];
continue;

case 7:
o = a.ops.pop();
a.trys.pop();
continue;

default:
if (!(i = a.trys, i = i.length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
a = 0;
continue;
}
if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
a.label = o[1];
break;
}
if (6 === o[0] && a.label < i[1]) {
a.label = i[1];
i = o;
break;
}
if (i && a.label < i[2]) {
a.label = i[2];
a.ops.push(o);
break;
}
i[2] && a.ops.pop();
a.trys.pop();
continue;
}
o = e.call(t, a);
} catch (t) {
o = [ 6, t ];
r = 0;
} finally {
n = i = 0;
}
if (5 & o[0]) throw o[1];
return {
value: o[0] ? o[1] : void 0,
done: !0
};
}
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var c = t("../Models/GameModel"), u = t("../../Blade/Interfaces/IView"), l = t("../../Blade/Decorators/View"), f = t("../../Blade/Services/CommandService"), p = t("../Commands/TestCommand"), d = t("../../Blade/Helpers/BigHelper"), h = cc._decorator, v = h.ccclass, y = h.property, g = function(t) {
r(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.label = null;
e.button = null;
e.gameModel = null;
return e;
}
e.prototype.onRegister = function() {
var t = this;
this.gameModel = blade.model.getModel(c.default);
this.gameModel.on([ "data1" ], this.updateData, this);
this.button.node.on(cc.Node.EventType.TOUCH_END, function() {
return a(t, void 0, void 0, function() {
var t;
return s(this, function(e) {
switch (e.label) {
case 0:
return [ 4, blade.popup.popNode("TestPanel", {
a: 1,
b: 2
}) ];

case 1:
t = e.sent();
console.log(t);
f.default.instance.exec(p.default, 3, 2);
return [ 2 ];
}
});
});
});
console.log(d.default.toFormat("123456789987654321.123456789"));
console.log(d.default.toSmall("123456789987654321.123456789"));
};
e.prototype.onUnRegister = function() {
this.gameModel.off([ "data1" ], this.updateData, this);
};
e.prototype.test = function(t) {
console.log("view func");
this.gameModel.data1 = t;
};
e.prototype.updateData = function(t, e, n, r) {
console.log("model watch data");
this.label.string = n;
};
e.prototype.onTick = function(t) {};
var n, u;
i([ y(cc.Label), o("design:type", "function" == typeof (n = "undefined" != typeof cc && cc.Label) ? n : Object) ], e.prototype, "label", void 0);
i([ y(cc.Button), o("design:type", "function" == typeof (u = "undefined" != typeof cc && cc.Button) ? u : Object) ], e.prototype, "button", void 0);
return e = i([ v, l.default("UIView") ], e);
}(u.default);
n.default = g;
cc._RF.pop();
}, {
"../../Blade/Decorators/View": "View",
"../../Blade/Helpers/BigHelper": "BigHelper",
"../../Blade/Interfaces/IView": "IView",
"../../Blade/Services/CommandService": "CommandService",
"../Commands/TestCommand": "TestCommand",
"../Models/GameModel": "GameModel"
} ],
ViewService: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "b6fb5eefE5Mr7G1r75QrwOF", "ViewService");
var r = this && this.__decorate || function(t, e, n, r) {
var i, o = arguments.length, a = o < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, n, r); else for (var s = t.length - 1; s >= 0; s--) (i = t[s]) && (a = (o < 3 ? i(a) : o > 3 ? i(e, n, a) : i(e, n)) || a);
return o > 3 && a && Object.defineProperty(e, n, a), a;
}, i = this && this.__spreadArrays || function() {
for (var t = 0, e = 0, n = arguments.length; e < n; e++) t += arguments[e].length;
var r = Array(t), i = 0;
for (e = 0; e < n; e++) for (var o = arguments[e], a = 0, s = o.length; a < s; a++, 
i++) r[i] = o[a];
return r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = t("../../Blade/Decorators/Singleton"), a = t("../../Blade/Decorators/Service"), s = function() {
function t() {}
t.prototype.initialize = function() {
this.list = new Map();
};
t.prototype.lazyInitialize = function() {};
t.prototype.register = function(t) {
if (this.list.has(t.alias)) {
console.error("已经存在" + t.alias + "视图!");
this.unregister(this.list.get(t.alias));
this.register(t);
} else this.list.set(t.alias, t);
};
t.prototype.unregister = function(t) {
this.list.has(t.alias) && this.list.delete(t.alias);
};
t.prototype.getView = function(t) {
return this.list.get(t) || null;
};
t.prototype.orderViewById = function(t, e) {
for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
var o = this.getView(t);
if (null != o) return o.order.apply(o, i([ e ], n));
console.error("视图（" + t + "）不存在");
};
return t = r([ o.default, a.default("ViewService") ], t);
}();
n.default = s;
cc._RF.pop();
}, {
"../../Blade/Decorators/Service": "Service",
"../../Blade/Decorators/Singleton": "Singleton"
} ],
View: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "c2f23sAVDZAF4y4X05xdbIZ", "View");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.default = function(t) {
return function(e) {
Reflect.defineProperty(e.prototype, "alias", {
value: t
});
};
};
cc._RF.pop();
}, {} ],
WebPlatform: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "ada861LS4pGVK6K+ZqLbebL", "WebPlatform");
var r = this && this.__extends || function() {
var t = function(e, n) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
})(e, n);
};
return function(e, n) {
t(e, n);
function r() {
this.constructor = e;
}
e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r());
};
}(), i = this && this.__awaiter || function(t, e, n, r) {
function i(t) {
return t instanceof n ? t : new n(function(e) {
e(t);
});
}
return new (n || (n = Promise))(function(n, o) {
function a(t) {
try {
c(r.next(t));
} catch (t) {
o(t);
}
}
function s(t) {
try {
c(r.throw(t));
} catch (t) {
o(t);
}
}
function c(t) {
t.done ? n(t.value) : i(t.value).then(a, s);
}
c((r = r.apply(t, e || [])).next());
});
}, o = this && this.__generator || function(t, e) {
var n, r, i, o, a = {
label: 0,
sent: function() {
if (1 & i[0]) throw i[1];
return i[1];
},
trys: [],
ops: []
};
return o = {
next: s(0),
throw: s(1),
return: s(2)
}, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
return this;
}), o;
function s(t) {
return function(e) {
return c([ t, e ]);
};
}
function c(o) {
if (n) throw new TypeError("Generator is already executing.");
for (;a; ) try {
if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 
0) : r.next) && !(i = i.call(r, o[1])).done) return i;
(r = 0, i) && (o = [ 2 & o[0], i.value ]);
switch (o[0]) {
case 0:
case 1:
i = o;
break;

case 4:
a.label++;
return {
value: o[1],
done: !1
};

case 5:
a.label++;
r = o[1];
o = [ 0 ];
continue;

case 7:
o = a.ops.pop();
a.trys.pop();
continue;

default:
if (!(i = a.trys, i = i.length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
a = 0;
continue;
}
if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
a.label = o[1];
break;
}
if (6 === o[0] && a.label < i[1]) {
a.label = i[1];
i = o;
break;
}
if (i && a.label < i[2]) {
a.label = i[2];
a.ops.push(o);
break;
}
i[2] && a.ops.pop();
a.trys.pop();
continue;
}
o = e.call(t, a);
} catch (t) {
o = [ 6, t ];
r = 0;
} finally {
n = i = 0;
}
if (5 & o[0]) throw o[1];
return {
value: o[0] ? o[1] : void 0,
done: !0
};
}
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var a = t("../../Blade/Interfaces/IPlatform"), s = t("../Helpers/HttpHelper"), c = t("../Helpers/PromiseHelper"), u = function(t) {
r(e, t);
function e() {
return null !== t && t.apply(this, arguments) || this;
}
e.prototype.initialize = function() {
this.userInfo = {
avatar: "https://img.readygo.yunyungquan.com/common/default_avatar.png",
nickname: "测试用户",
platform: "WEB",
gender: 1,
device: "PC",
country: "China",
province: "GuangDong",
city: "GuangZhou"
};
};
e.prototype.lazyInitialize = function() {};
e.prototype.getLaunchOptions = function() {
return s.default.getQueryParams();
};
e.prototype.isSupportRewardVideo = function() {
return !0;
};
e.prototype.preloadRewardVideo = function() {
return Promise.resolve();
};
e.prototype.playRewardVideo = function() {
return i(this, void 0, void 0, function() {
return o(this, function(t) {
switch (t.label) {
case 0:
this.emit(a.default.EventType.OpenVideo);
return [ 4, c.default.wait(3) ];

case 1:
t.sent();
this.emit(a.default.EventType.CloseVideo);
return [ 2, !0 ];
}
});
});
};
e.prototype.isSupportBanner = function() {
return !0;
};
e.prototype.preloadBanner = function() {
return Promise.resolve();
};
e.prototype.activeBanner = function(t) {
t ? this.emit(a.default.EventType.OpenBanner) : this.emit(a.default.EventType.CloseBanner);
};
e.prototype.isSupportInterstitial = function() {
return !0;
};
e.prototype.preloadInterstitial = function() {
return Promise.resolve();
};
e.prototype.showInterstitial = function() {
var t = this;
this.emit(a.default.EventType.OpenInterstitial);
c.default.wait(3).then(function() {
t.emit(a.default.EventType.CloseInterstitial);
});
};
e.prototype.sendInvite = function(t, e, n) {
this.emit(a.default.EventType.OpenShare);
return Promise.resolve();
};
return e;
}(a.default);
n.default = u;
cc._RF.pop();
}, {
"../../Blade/Interfaces/IPlatform": "IPlatform",
"../Helpers/HttpHelper": "HttpHelper",
"../Helpers/PromiseHelper": "PromiseHelper"
} ],
WxPlatform: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "45d59tGpB5Kuq0oBEzv07vs", "WxPlatform");
var r = this && this.__extends || function() {
var t = function(e, n) {
return (t = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
})(e, n);
};
return function(e, n) {
t(e, n);
function r() {
this.constructor = e;
}
e.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r());
};
}(), i = this && this.__awaiter || function(t, e, n, r) {
function i(t) {
return t instanceof n ? t : new n(function(e) {
e(t);
});
}
return new (n || (n = Promise))(function(n, o) {
function a(t) {
try {
c(r.next(t));
} catch (t) {
o(t);
}
}
function s(t) {
try {
c(r.throw(t));
} catch (t) {
o(t);
}
}
function c(t) {
t.done ? n(t.value) : i(t.value).then(a, s);
}
c((r = r.apply(t, e || [])).next());
});
}, o = this && this.__generator || function(t, e) {
var n, r, i, o, a = {
label: 0,
sent: function() {
if (1 & i[0]) throw i[1];
return i[1];
},
trys: [],
ops: []
};
return o = {
next: s(0),
throw: s(1),
return: s(2)
}, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
return this;
}), o;
function s(t) {
return function(e) {
return c([ t, e ]);
};
}
function c(o) {
if (n) throw new TypeError("Generator is already executing.");
for (;a; ) try {
if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 
0) : r.next) && !(i = i.call(r, o[1])).done) return i;
(r = 0, i) && (o = [ 2 & o[0], i.value ]);
switch (o[0]) {
case 0:
case 1:
i = o;
break;

case 4:
a.label++;
return {
value: o[1],
done: !1
};

case 5:
a.label++;
r = o[1];
o = [ 0 ];
continue;

case 7:
o = a.ops.pop();
a.trys.pop();
continue;

default:
if (!(i = a.trys, i = i.length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
a = 0;
continue;
}
if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
a.label = o[1];
break;
}
if (6 === o[0] && a.label < i[1]) {
a.label = i[1];
i = o;
break;
}
if (i && a.label < i[2]) {
a.label = i[2];
a.ops.push(o);
break;
}
i[2] && a.ops.pop();
a.trys.pop();
continue;
}
o = e.call(t, a);
} catch (t) {
o = [ 6, t ];
r = 0;
} finally {
n = i = 0;
}
if (5 & o[0]) throw o[1];
return {
value: o[0] ? o[1] : void 0,
done: !0
};
}
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var a = t("../../Blade/Interfaces/IPlatform"), s = t("../Helpers/HttpHelper"), c = t("../Helpers/StringHelper"), u = t("../Helpers/PromiseHelper"), l = t("../../Module/Defines/PlatformConfig"), f = function(t) {
r(e, t);
function e() {
var e = null !== t && t.apply(this, arguments) || this;
e.launchOptions = null;
e.authorizeButton = null;
e.shareMenuInfo = null;
e.videoState = a.default.AdState.None;
e.bannerState = a.default.AdState.None;
e.interstitialState = a.default.AdState.None;
e.video = null;
e.banner = null;
e.interstitial = null;
e.bannerActive = !1;
return e;
}
e.prototype.initialize = function() {
var t = this;
this.getUserInfoTry();
wx.onShow(function(e) {
t.setLaunchOptions(e);
t.emit(a.default.EventType.OnShow, e);
});
};
e.prototype.lazyInitialize = function() {};
e.prototype.getArchive = function(t) {
return wx.getStorageSync(t);
};
e.prototype.saveArchive = function(t, e) {
wx.setStorageSync(t, e);
};
e.prototype.getLaunchOptions = function() {
this.launchOptions || (this.launchOptions = wx.getLaunchOptionsSync());
return this.launchOptions;
};
e.prototype.setLaunchOptions = function(t) {
this.launchOptions = t;
};
e.prototype.getUserInfoTry = function() {
return i(this, void 0, void 0, function() {
var t, e = this;
return o(this, function(n) {
switch (n.label) {
case 0:
if (this.userInfo) return [ 2, this.userInfo ];
n.label = 1;

case 1:
n.trys.push([ 1, 3, , 4 ]);
return [ 4, new Promise(function(t, n) {
wx.getUserInfo({
success: function(r) {
if (r.rawData) {
var i = JSON.parse(r.rawData), o = wx.getSystemInfoSync();
e.userInfo = {
avatar: i.avatarUrl || "",
nickname: i.nickName || "",
gender: i.gender || 0,
province: i.province,
city: i.city,
country: i.country,
platform: o.platform,
device: o.model
};
t(e.userInfo);
} else n(r);
},
fail: n
});
}) ];

case 2:
return [ 2, n.sent() ];

case 3:
t = n.sent();
console.error(t);
return [ 2, null ];

case 4:
return [ 2 ];
}
});
});
};
e.prototype.authorize = function(t) {
var e = this;
return new Promise(function(n, r) {
var i = function(i) {
if (i.rawData) {
var o = JSON.parse(i.rawData), a = wx.getSystemInfoSync();
e.userInfo = {
avatar: o.avatarUrl || "",
nickname: o.nickName || "",
gender: o.gender || 0,
province: o.province,
city: o.city,
country: o.country,
platform: a.platform,
device: a.model
};
t && t.callback && t.callback.call(t.caller);
n({
encryptedData: i.encryptedData,
iv: i.iv
});
} else r();
};
wx.getUserInfo({
success: i,
fail: function(n) {
wx.getSetting({
success: function(n) {
wx.getSystemInfo({
success: function(n) {
if (t) {
t.height *= n.screenHeight;
t.width *= n.screenWidth;
t.left *= n.screenWidth;
t.top *= n.screenHeight;
} else t = {
left: 0,
top: 0,
width: n.screenWidth,
height: n.screenHeight
};
var r = wx.createUserInfoButton({
type: "text",
text: "",
style: {
left: t.left,
top: t.top,
width: t.width,
height: t.height,
backgroundColor: "rgba(252,255,255,0)",
borderColor: "rgba(250,250,250,0)",
borderWidth: 0,
borderRadius: 0,
textAlign: "center",
fontSize: 30,
lineHeight: 32
},
withCredentials: !1
});
e.authorizeButton = r;
r.onTap(function(n) {
if (n.rawData) {
r.destroy();
e.authorizeButton = null;
t && t.callback && t.callback.call(t.caller);
}
i(n);
});
},
fail: function(t) {
r();
}
});
}
});
}
});
});
};
e.prototype.unauthorize = function() {
if (this.authorizeButton) {
this.authorizeButton.destroy();
this.authorizeButton = null;
}
};
e.prototype.setShareMenuInfo = function(t, e, n, r, c) {
return i(this, void 0, void 0, function() {
var i, u = this;
return o(this, function(o) {
if (null == this.shareMenuInfo) {
wx.showShareMenu({
withShareTicket: !0
});
wx.onShareAppMessage(function() {
return u.shareMenuInfo;
});
}
i = s.default.formatParams(n);
this.shareMenuInfo = {
imageUrl: t,
title: e,
query: i,
success: function() {
u.emit(a.default.EventType.OpenShare, t, e, n);
r && r.call(c, t, e, n);
}
};
return [ 2 ];
});
});
};
e.prototype.isSupportRewardVideo = function() {
return c.default.compareVersion(wx.getSystemInfoSync().SDKVersion, "2.0.4") >= 0;
};
e.prototype.isVideoLoaded = function() {
return this.videoState == a.default.AdState.Loaded;
};
e.prototype.preloadRewardVideo = function() {
return i(this, void 0, Promise, function() {
var t = this;
return o(this, function(e) {
switch (e.label) {
case 0:
return this.isSupportRewardVideo() ? this.videoState == a.default.AdState.Loaded ? [ 2 ] : this.videoState != a.default.AdState.Loading ? [ 3, 2 ] : [ 4, u.default.waitUntil(function() {
return t.videoState != a.default.AdState.Loading;
}) ] : [ 2 ];

case 1:
return [ 2, e.sent() ];

case 2:
this.videoState = a.default.AdState.Loading;
if (null == this.video) {
this.video = wx.createRewardedVideoAd({
adUnitId: l.default.wx.videoId
});
this.video.onLoad(function() {
t.videoState = a.default.AdState.Loaded;
});
this.video.onError(function(e) {
t.videoState = a.default.AdState.None;
});
this.video.onClose(function(e) {
var n = e && e.isEnded || void 0 === e;
blade.ticker.setPause(!1);
blade.audio.resumeAll();
t.preloadRewardVideo();
t.emit(a.default.EventType.CloseVideo, n);
});
} else this.video.load();
this.video.load();
return [ 4, u.default.waitUntil(function() {
return t.videoState != a.default.AdState.Loading;
}) ];

case 3:
return [ 2, e.sent() ];
}
});
});
};
e.prototype.playRewardVideo = function() {
return i(this, void 0, Promise, function() {
var t = this;
return o(this, function(e) {
switch (e.label) {
case 0:
if (null == this.video || this.videoState != a.default.AdState.Loaded) return [ 3, 2 ];
this.videoState = a.default.AdState.None;
blade.ticker.setPause(!0);
blade.audio.pauseAll();
return [ 4, new Promise(function(e, n) {
return i(t, void 0, void 0, function() {
var t;
return o(this, function(n) {
switch (n.label) {
case 0:
t = function(t) {
e(t);
};
this.once(a.default.EventType.CloseVideo, t);
n.label = 1;

case 1:
n.trys.push([ 1, 3, , 4 ]);
return [ 4, this.video.show() ];

case 2:
n.sent();
this.emit(a.default.EventType.OpenVideo);
return [ 3, 4 ];

case 3:
n.sent();
blade.ticker.setPause(!1);
blade.audio.resumeAll();
this.preloadRewardVideo();
this.off(a.default.EventType.CloseVideo, t);
e(!1);
return [ 3, 4 ];

case 4:
return [ 2 ];
}
});
});
}) ];

case 1:
return [ 2, e.sent() ];

case 2:
return [ 2, !1 ];
}
});
});
};
e.prototype.isSupportBanner = function() {
return c.default.compareVersion(wx.getSystemInfoSync().SDKVersion, "2.0.4") >= 0;
};
e.prototype.preloadBanner = function() {
return i(this, void 0, Promise, function() {
var t, n = this;
return o(this, function(r) {
switch (r.label) {
case 0:
return this.isSupportBanner() ? this.bannerState == e.AdState.Loaded ? [ 2 ] : this.bannerState != e.AdState.Loading ? [ 3, 2 ] : [ 4, u.default.waitUntil(function() {
return n.bannerState != e.AdState.Loading;
}) ] : [ 2 ];

case 1:
return [ 2, r.sent() ];

case 2:
if (this.banner) {
this.banner.destroy();
this.banner = null;
}
t = wx.getSystemInfoSync();
this.banner = wx.createBannerAd({
adUnitId: l.default.wx.bannerId,
style: {
top: 0,
left: 0,
height: 50,
width: 200
}
});
this.banner.onLoad(function() {
return i(n, void 0, void 0, function() {
return o(this, function(t) {
this.bannerState = e.AdState.Loaded;
if (this.bannerActive) {
this.emit(a.default.EventType.OpenBanner);
this.banner.show();
}
return [ 2 ];
});
});
});
this.banner.onError(function(t) {
n.bannerState = e.AdState.None;
});
this.banner.onResize(function(e) {
n.banner.style.top = t.windowHeight - n.banner.style.realHeight;
n.banner.style.left = (t.windowWidth - n.banner.style.realWidth) / 2;
});
return [ 2 ];
}
});
});
};
e.prototype.activeBanner = function(t) {
if (null == this.banner) return !1;
if (t) {
if (this.bannerState != a.default.AdState.Loaded) return !1;
this.emit(a.default.EventType.OpenBanner);
this.banner.show();
this.bannerState = a.default.AdState.Opening;
return !0;
}
if (this.bannerState != a.default.AdState.Opening) return !1;
this.emit(a.default.EventType.CloseBanner);
this.banner.destroy();
this.banner = null;
this.bannerState = a.default.AdState.None;
this.preloadBanner();
return !0;
};
e.prototype.isSupportInterstitial = function() {
return c.default.compareVersion(wx.getSystemInfoSync().SDKVersion, "2.6.0") >= 0;
};
e.prototype.isInterstitialLoaded = function() {
return this.interstitialState == a.default.AdState.Loaded;
};
e.prototype.preloadInterstitial = function() {
return i(this, void 0, void 0, function() {
var t = this;
return o(this, function(e) {
switch (e.label) {
case 0:
return this.isSupportInterstitial() ? this.interstitialState == a.default.AdState.Loaded ? [ 2 ] : this.interstitialState != a.default.AdState.Loading ? [ 3, 2 ] : [ 4, u.default.waitUntil(function() {
return t.interstitialState != a.default.AdState.Loading;
}) ] : [ 2 ];

case 1:
return [ 2, e.sent() ];

case 2:
this.interstitialState = a.default.AdState.Loading;
if (null == this.interstitial) {
this.interstitial = wx.createInterstitialAd({
adUnitId: l.default.wx.interstitialId
});
this.interstitial.onLoad(function() {
t.interstitialState = a.default.AdState.Loaded;
});
this.interstitial.onError(function(e) {
return i(t, void 0, void 0, function() {
return o(this, function(t) {
this.interstitialState = a.default.AdState.None;
return [ 2 ];
});
});
});
this.interstitial.onClose(function() {
t.interstitialState = a.default.AdState.None;
t.emit(a.default.EventType.CloseInterstitial);
});
}
return [ 2 ];
}
});
});
};
e.prototype.showInterstitial = function() {
return i(this, void 0, void 0, function() {
var t;
return o(this, function(e) {
switch (e.label) {
case 0:
if (!this.isSupportInterstitial()) return [ 2 ];
if (!this.isInterstitialLoaded()) return [ 2 ];
e.label = 1;

case 1:
e.trys.push([ 1, 3, , 4 ]);
return [ 4, this.interstitial.show() ];

case 2:
e.sent();
this.interstitialState = a.default.AdState.Opening;
this.emit(a.default.EventType.OpenInterstitial);
return [ 3, 4 ];

case 3:
t = e.sent();
console.error(t);
return [ 3, 4 ];

case 4:
return [ 2 ];
}
});
});
};
e.prototype.sendInvite = function(t, e, n) {
return i(this, void 0, Promise, function() {
return o(this, function(r) {
switch (r.label) {
case 0:
wx.shareAppMessage({
title: t,
imageUrl: t,
query: s.default.formatParams(n)
});
return [ 4, u.default.wait(1) ];

case 1:
r.sent();
this.emit(a.default.EventType.OpenShare, t, e, n);
return [ 2 ];
}
});
});
};
e.prototype.vibrate = function(t) {
void 0 === t && (t = !0);
t ? wx.vibrateShort({
success: null,
fail: null,
complete: null
}) : wx.vibrateLong({
success: null,
fail: null,
complete: null
});
};
e.prototype.linkGame = function(t, e, n) {
return new Promise(function(r, i) {
wx.navigateToMiniProgram({
appId: t,
path: e,
extraData: n,
success: function() {
console.log("跳转 " + t);
r(!0);
},
fail: i
});
});
};
return e;
}(a.default);
n.default = f;
cc._RF.pop();
}, {
"../../Blade/Interfaces/IPlatform": "IPlatform",
"../../Module/Defines/PlatformConfig": "PlatformConfig",
"../Helpers/HttpHelper": "HttpHelper",
"../Helpers/PromiseHelper": "PromiseHelper",
"../Helpers/StringHelper": "StringHelper"
} ],
WxServerSDK: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "0f46cbpiQRKNaiMHeJQX6rR", "WxServerSDK");
var r = this && this.__awaiter || function(t, e, n, r) {
function i(t) {
return t instanceof n ? t : new n(function(e) {
e(t);
});
}
return new (n || (n = Promise))(function(n, o) {
function a(t) {
try {
c(r.next(t));
} catch (t) {
o(t);
}
}
function s(t) {
try {
c(r.throw(t));
} catch (t) {
o(t);
}
}
function c(t) {
t.done ? n(t.value) : i(t.value).then(a, s);
}
c((r = r.apply(t, e || [])).next());
});
}, i = this && this.__generator || function(t, e) {
var n, r, i, o, a = {
label: 0,
sent: function() {
if (1 & i[0]) throw i[1];
return i[1];
},
trys: [],
ops: []
};
return o = {
next: s(0),
throw: s(1),
return: s(2)
}, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
return this;
}), o;
function s(t) {
return function(e) {
return c([ t, e ]);
};
}
function c(o) {
if (n) throw new TypeError("Generator is already executing.");
for (;a; ) try {
if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 
0) : r.next) && !(i = i.call(r, o[1])).done) return i;
(r = 0, i) && (o = [ 2 & o[0], i.value ]);
switch (o[0]) {
case 0:
case 1:
i = o;
break;

case 4:
a.label++;
return {
value: o[1],
done: !1
};

case 5:
a.label++;
r = o[1];
o = [ 0 ];
continue;

case 7:
o = a.ops.pop();
a.trys.pop();
continue;

default:
if (!(i = a.trys, i = i.length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
a = 0;
continue;
}
if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
a.label = o[1];
break;
}
if (6 === o[0] && a.label < i[1]) {
a.label = i[1];
i = o;
break;
}
if (i && a.label < i[2]) {
a.label = i[2];
a.ops.push(o);
break;
}
i[2] && a.ops.pop();
a.trys.pop();
continue;
}
o = e.call(t, a);
} catch (t) {
o = [ 6, t ];
r = 0;
} finally {
n = i = 0;
}
if (5 & o[0]) throw o[1];
return {
value: o[0] ? o[1] : void 0,
done: !0
};
}
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var o = t("../../Helpers/SocketHelper"), a = t("../../Helpers/PromiseHelper"), s = t("../../Helpers/RandomHelper"), c = t("../../Helpers/HttpHelper"), u = function() {
function t() {}
t.getSocketUrl = function() {
return t.deBug ? t.socketUrlDebug : t.socketUrl;
};
t.getHttpUrl = function() {
return t.deBug ? t.httpUrlDebug : t.httpUrl;
};
t.request = function(e, n) {
return r(this, void 0, Promise, function() {
return i(this, function(r) {
switch (r.label) {
case 0:
return [ 4, c.default.Request(t.getHttpUrl() + e, {
method: "POST",
data: n,
dataType: "JSON",
contentType: "JSON"
}) ];

case 1:
return [ 2, r.sent() ];
}
});
});
};
t.init = function(e, n, o) {
return r(this, void 0, void 0, function() {
var a = this;
return i(this, function(s) {
switch (s.label) {
case 0:
t.tmp.clear();
t.setAppId(e);
t.setVersion(n);
return [ 4, t.connectSocket(e, o) ];

case 1:
s.sent();
this.deBug && cc.sys.WECHAT_GAME == cc.sys.platform && wx.showModal({
title: "提示",
content: "当前为测试环境！！!",
success: function(t) {
return r(a, void 0, void 0, function() {
return i(this, function(e) {
t.confirm || t.cancel;
return [ 2 ];
});
});
}
});
return [ 2, !0 ];
}
});
});
};
t.connectSocket = function(e, n) {
return r(this, void 0, void 0, function() {
var s = this;
return i(this, function(c) {
switch (c.label) {
case 0:
t.io || (t.io = o.default.createSocket("WxServerSDK"));
return [ 4, new Promise(function(c, u) {
return r(s, void 0, void 0, function() {
var s = this;
return i(this, function(l) {
switch (l.label) {
case 0:
t.io.connect(t.getSocketUrl());
t.io.on(o.default.EventType.CONNECT, function() {
return r(s, void 0, void 0, function() {
var r;
return i(this, function(i) {
switch (i.label) {
case 0:
return n ? [ 4, t.login(e, n) ] : [ 3, 2 ];

case 1:
r = i.sent();
return [ 3, 4 ];

case 2:
return [ 4, t.login(e, t.openId) ];

case 3:
r = i.sent();
i.label = 4;

case 4:
if (0 == r.code) {
t.isInit = !0;
t.openId = r.data.open_id;
t.sysId = r.data.sys_app_id;
t.userId = r.data.user_id;
}
console.log("Socket 登录", r);
return [ 2 ];
}
});
});
});
t.io.on(o.default.EventType.DISCONNECT, function() {
return r(s, void 0, void 0, function() {
return i(this, function(e) {
t.isInit = !1;
return [ 2 ];
});
});
});
return [ 4, a.default.waitUntil(function() {
return t.io.getStatus() != o.default.LinkStatus.EMPTY;
}) ];

case 1:
l.sent();
t.io.getStatus() == o.default.LinkStatus.SUCCEED ? c() : u();
return [ 2 ];
}
});
});
}) ];

case 1:
c.sent();
return [ 2 ];
}
});
});
};
t.setAppId = function(e) {
null == t.appId && (t.appId = e);
};
t.setVersion = function(e) {
null == t.version && (t.version = e);
};
t.login = function(e, n) {
return r(this, void 0, void 0, function() {
var r, a, s;
return i(this, function(i) {
switch (i.label) {
case 0:
if (!t.io || t.io.getStatus() != o.default.LinkStatus.SUCCEED) return [ 3, 3 ];
a = (r = t).emitSync;
s = [ t.EventType.LOGIN ];
return [ 4, t.getLoginInfo(e, n) ];

case 1:
return [ 4, a.apply(r, s.concat([ i.sent() ])) ];

case 2:
return [ 2, i.sent() ];

case 3:
console.warn("请先初始化Socket");
i.label = 4;

case 4:
return [ 2 ];
}
});
});
};
t.saveUserInfo = function(e) {
return r(this, void 0, void 0, function() {
var n = this;
return i(this, function(r) {
switch (r.label) {
case 0:
if (this.isInit) return [ 3, 2 ];
console.warn("请先初始化socket");
return [ 4, a.default.waitUntil(function() {
return n.isInit;
}) ];

case 1:
r.sent();
r.label = 2;

case 2:
return [ 4, t.emitSync("saveUserInfo", e) ];

case 3:
return [ 2, r.sent() ];
}
});
});
};
t.recordAdvert = function(e) {
for (var n = [], o = 1; o < arguments.length; o++) n[o - 1] = arguments[o];
return r(this, void 0, void 0, function() {
var r, o, s = this;
return i(this, function(i) {
switch (i.label) {
case 0:
if (this.isInit) return [ 3, 2 ];
console.warn("请先初始化socket");
return [ 4, a.default.waitUntil(function() {
return s.isInit;
}) ];

case 1:
i.sent();
i.label = 2;

case 2:
if (e == t.RecordType.EXPOSUREPLACE) {
r = {
user_id: t.userId,
sys_app_id: t.sysId,
advert_place_arr: Array.from(new Set(n.map(function(t) {
return t.place_id;
})))
};
o = "exposureAdvertPlace";
} else if (e == t.RecordType.EXPOSURECONENT) {
r = {
user_id: t.userId,
sys_app_id: t.sysId,
advert_deploy_arr: n
};
o = "exposureAdvertDeploy";
} else if (e == t.RecordType.CLICK) {
r = {
user_id: t.userId,
sys_app_id: t.sysId,
place_id: n[0].place_id,
deploy_id: n[0].deploy_id
};
o = "clickAdvertDeploy";
}
return [ 4, t.emitSync(o, r) ];

case 3:
return [ 2, i.sent() ];
}
});
});
};
t.recordShare = function(e, n) {
for (var o = [], s = 2; s < arguments.length; s++) o[s - 2] = arguments[s];
return r(this, void 0, void 0, function() {
var r, s, c = this;
return i(this, function(i) {
switch (i.label) {
case 0:
if (this.isInit) return [ 3, 2 ];
console.warn("请先初始化socket");
return [ 4, a.default.waitUntil(function() {
return c.isInit;
}) ];

case 1:
i.sent();
i.label = 2;

case 2:
if (e == t.RecordType.EXPOSUREPLACE) {
r = {
user_id: t.userId,
sys_app_id: t.sysId,
share_place_arr: o.map(function(t) {
return t.place_id;
})
};
s = "exposureSharePlace";
} else if (e == t.RecordType.EXPOSURECONENT) {
r = {
user_id: t.userId,
sys_app_id: t.sysId,
share_clerk_arr: o
};
s = "exposureShareClerk";
} else if (e == t.RecordType.CLICK) {
r = {
user_id: t.userId,
sys_app_id: t.sysId,
place_id: o[0].place_id,
clerk_id: o[0].clerk_id,
time: n
};
s = "clickSharePlace";
}
return [ 4, t.emitSync(s, r) ];

case 3:
return [ 2, i.sent() ];
}
});
});
};
t.recordShareEntry = function(e, n) {
for (var o = [], s = 2; s < arguments.length; s++) o[s - 2] = arguments[s];
return r(this, void 0, void 0, function() {
var r, s, c = this;
return i(this, function(i) {
switch (i.label) {
case 0:
if (this.isInit) return [ 3, 2 ];
console.warn("请先初始化socket");
return [ 4, a.default.waitUntil(function() {
return c.isInit;
}) ];

case 1:
i.sent();
i.label = 2;

case 2:
r = {
share_open_id: e,
sys_app_id: t.sysId,
place_id: o[0].place_id,
clerk_id: o[0].clerk_id,
time: n
};
s = "entryProgramByShareClerk";
return [ 4, t.emitSync(s, r) ];

case 3:
return [ 2, i.sent() ];
}
});
});
};
t.recordVideo = function(e, n, o, s) {
return r(this, void 0, void 0, function() {
var r, c, u = this;
return i(this, function(i) {
switch (i.label) {
case 0:
if (this.isInit) return [ 3, 2 ];
console.warn("请先初始化socket");
return [ 4, a.default.waitUntil(function() {
return u.isInit;
}) ];

case 1:
i.sent();
i.label = 2;

case 2:
if (e == t.RECORD_VIDEO_TYPE.Exposure) {
r = {
user_id: t.userId,
sys_app_id: t.sysId,
video_id: n.id,
place_key: n.place_key
};
c = "exposureVideo";
} else if (e == t.RECORD_VIDEO_TYPE.Watch) {
r = {
user_id: t.userId,
sys_app_id: t.sysId,
video_id: n.id,
place_key: n.place_key,
flag: o,
time: s
};
c = "watchVideo";
} else if (e == t.RECORD_VIDEO_TYPE.Click) {
r = {
user_id: t.userId,
sys_app_id: t.sysId,
video_id: n.id,
place_key: n.place_key
};
c = "clickVideo";
}
return [ 4, t.emitSync(c, r) ];

case 3:
return [ 2, i.sent() ];
}
});
});
};
t.recordBanner = function(e, n) {
return r(this, void 0, void 0, function() {
var r, o, s = this;
return i(this, function(i) {
switch (i.label) {
case 0:
if (this.isInit) return [ 3, 2 ];
console.warn("请先初始化socket");
return [ 4, a.default.waitUntil(function() {
return s.isInit;
}) ];

case 1:
i.sent();
i.label = 2;

case 2:
if (!n) return [ 2 ];
if (e == t.RECORD_BANNER_TYPE.Exposure) {
r = {
user_id: t.userId,
sys_app_id: t.sysId,
banner_id: n.id,
place_key: n.place_key
};
o = "exposureBanner";
}
return [ 4, t.emitSync(o, r) ];

case 3:
return [ 2, i.sent() ];
}
});
});
};
t.recordInterstitial = function(e, n) {
return r(this, void 0, void 0, function() {
var r, o, s = this;
return i(this, function(i) {
switch (i.label) {
case 0:
if (this.isInit) return [ 3, 2 ];
console.warn("请先初始化socket");
return [ 4, a.default.waitUntil(function() {
return s.isInit;
}) ];

case 1:
i.sent();
i.label = 2;

case 2:
if (!n) return [ 2 ];
if (e == t.RECORD_INTERSTITIAL_TYPE.Exposure) {
r = {
user_id: t.userId,
sys_app_id: t.sysId,
screen_id: n.id,
place_key: n.place_key
};
o = "exposureScreen";
}
return [ 4, t.emitSync(o, r) ];

case 3:
return [ 2, i.sent() ];
}
});
});
};
t.getLoginInfo = function(e, n) {
return r(this, void 0, void 0, function() {
var r, o, a, s, c, u, l, f, p, d, h, v, y, g, m, _, S, b, w;
return i(this, function(i) {
switch (i.label) {
case 0:
if (cc.sys.platform !== cc.sys.WECHAT_GAME) return [ 3, 3 ];
o = wx.getSystemInfoSync();
a = blade.platform.getPlatform().getLaunchOptions();
s = "";
if (n) return [ 3, 2 ];
n = "";
return [ 4, t.getCode() ];

case 1:
s = i.sent();
i.label = 2;

case 2:
c = o.brand;
u = o.model;
l = o.version;
f = o.system;
p = o.platform;
d = a.scene;
h = "";
v = "";
y = "";
g = void 0;
g = window.qq ? t.LoginType.QQ : t.LoginType.WX;
a.referrerInfo && a.referrerInfo.appId && (h = a.referrerInfo.appId);
(m = blade.platform.getPlatform().getLaunchOptions()).channel && (v = m.channel);
m.share_open_id && (y = m.share_open_id);
_ = "";
S = "";
b = "";
if (m.shareInfo && m.shareTime && t.userId != m.shareUserId) {
w = JSON.parse(m.shareInfo);
b = parseInt(m.shareTime);
_ = parseInt(w.place_id);
S = parseInt(w.clerk_id);
}
r = {
code: s,
app_id: e,
open_id: n,
channel: v,
srcAppId: h,
brand: c,
model: u,
version: l,
system: f,
platform: p,
scene: d,
share_open_id: y,
share_time: b,
place_id: _,
clerk_id: S,
login_type: g
};
return [ 3, 4 ];

case 3:
r = {
code: "qaz123",
app_id: e,
open_id: "",
channel: "",
srcAppId: "",
brand: "devtools",
model: "iPhone 5",
version: "6.6.5",
system: "IOS 10.0.1",
platform: "devtools",
scene: 1001,
share_open_id: "",
share_time: "",
place_id: "",
clerk_id: "",
login_type: t.LoginType.WX
};
console.warn("请在微信环境下使用SDK");
i.label = 4;

case 4:
return [ 2, r ];
}
});
});
};
t.getCode = function() {
var t = this;
return new Promise(function(e, n) {
wx.login({
success: function(n) {
return r(t, void 0, void 0, function() {
return i(this, function(t) {
return [ 2, e(n.code) ];
});
});
},
fail: function(t) {
return n(t);
}
});
});
};
t.getParameterInfo = function() {
return r(this, void 0, void 0, function() {
return i(this, function(e) {
switch (e.label) {
case 0:
if (t.appId) return [ 3, 2 ];
console.warn("Http 请求未初始化");
return [ 4, a.default.waitUntil(function() {
return t.appId;
}) ];

case 1:
e.sent();
e.label = 2;

case 2:
return [ 4, t.request("wechat/getparameterinfo", {
app_id: t.appId,
version: t.version
}) ];

case 3:
return [ 2, e.sent() ];
}
});
});
};
t.getParameter = function(e) {
return r(this, void 0, void 0, function() {
var n;
return i(this, function(r) {
switch (r.label) {
case 0:
return [ 4, t.getAllParameter() ];

case 1:
return (n = r.sent()) && n[e] ? [ 2, n[e] ] : [ 2 ];
}
});
});
};
t.getAllParameter = function() {
return r(this, void 0, void 0, function() {
var e;
return i(this, function(n) {
switch (n.label) {
case 0:
return [ 4, t.getParameterInfo() ];

case 1:
return (e = n.sent()) && 0 == e.code ? [ 2, e.data ] : [ 2 ];
}
});
});
};
t.getAdvertDeployInfo = function() {
return r(this, void 0, Promise, function() {
var e;
return i(this, function(n) {
switch (n.label) {
case 0:
if (t.appId) return [ 3, 2 ];
console.warn("Http 请求未初始化");
return [ 4, a.default.waitUntil(function() {
return t.appId;
}) ];

case 1:
n.sent();
n.label = 2;

case 2:
return t.tmp.has(t.getAdvertDeployInfo) ? [ 2, t.tmp.get(t.getAdvertDeployInfo) ] : [ 4, t.request("wechat/getadvertdeployinfo", {
app_id: t.appId,
version: t.version
}) ];

case 3:
0 == (e = n.sent()).code && e.data && t.tmp.set(t.getAdvertDeployInfo, e);
return [ 2, e ];
}
});
});
};
t.getAdvertInfo = function(e) {
return r(this, void 0, Promise, function() {
var n, r, o, a, c;
return i(this, function(i) {
switch (i.label) {
case 0:
return [ 4, t.getAllAdvertInfo(e) ];

case 1:
if ((n = i.sent()) && n.length > 0) {
if (n[0].strategy == t.ADVERT_STRATEGY.RANDOM) return [ 2, n[Math.floor(Math.random() * n.length)] ];
if (n[0].strategy == t.ADVERT_STRATEGY.WEIGHT_RANDOM) {
r = n.map(function(t) {
return t.weight;
});
o = s.default.getWeightIndex(r);
return [ 2, n[o] ];
}
if (n[0].strategy == t.ADVERT_STRATEGY.SORT) {
a = n.sort(function(t, e) {
return t.weight - e.weight;
});
(null == (c = JSON.parse(blade.platform.getPlatform().getArchive("advert_sort_" + e + "_info"))) || blade.timer.getTime() > moment(c.time).add(1, "days").unix()) && (c = {
index: -1,
time: blade.timer.getTime()
});
c.index++;
c.index = c.index % a.length;
blade.platform.getPlatform().saveArchive("advert_sort_" + e + "_info", JSON.stringify(c));
return [ 2, a[c.index] ];
}
}
return [ 2 ];
}
});
});
};
t.getAllAdvertInfo = function(e) {
return r(this, void 0, Promise, function() {
var n, r;
return i(this, function(i) {
switch (i.label) {
case 0:
return [ 4, t.getAdvertDeployInfo() ];

case 1:
if (0 == (n = i.sent()).code && n.data[e]) {
if (!((r = n.data[e]) && r.length > 0)) return [ 2, r ];
if (r[0].strategy == t.ADVERT_STRATEGY.RANDOM) return [ 2, r.sort(function(t, e) {
return Math.random() > .5 ? -1 : 1;
}) ];
if (r[0].strategy == t.ADVERT_STRATEGY.WEIGHT_RANDOM || r[0].strategy == t.ADVERT_STRATEGY.SORT) return [ 2, r.sort(function(t, e) {
return t.weight - e.weight;
}) ];
}
return [ 2 ];
}
});
});
};
t.getShareClerkInfo = function() {
return r(this, void 0, Promise, function() {
var e;
return i(this, function(n) {
switch (n.label) {
case 0:
if (t.appId) return [ 3, 2 ];
console.warn("Http 请求未初始化");
return [ 4, a.default.waitUntil(function() {
return t.appId;
}) ];

case 1:
n.sent();
n.label = 2;

case 2:
return t.tmp.has(t.getShareClerkInfo) ? [ 2, t.tmp.get(t.getShareClerkInfo) ] : [ 4, t.request("wechat/getshareclerkinfo", {
app_id: t.appId,
version: t.version
}) ];

case 3:
0 == (e = n.sent()).code && e.data && t.tmp.set(t.getShareClerkInfo, e);
return [ 2, e ];
}
});
});
};
t.getShareInfo = function(e) {
return r(this, void 0, Promise, function() {
var n, r, o;
return i(this, function(i) {
switch (i.label) {
case 0:
return [ 4, t.getAllShareInfo(e) ];

case 1:
if (n = i.sent()) {
r = n.map(function(t) {
return t.weight;
});
o = s.default.getWeightIndex(r);
return [ 2, n[o] ];
}
return [ 2 ];
}
});
});
};
t.getAllShareInfo = function(e) {
return r(this, void 0, Promise, function() {
var n;
return i(this, function(r) {
switch (r.label) {
case 0:
return [ 4, t.getShareClerkInfo() ];

case 1:
return 0 == (n = r.sent()).code && n.data[e] ? [ 2, n.data[e] ] : [ 2 ];
}
});
});
};
t.getAllVideoInfo = function() {
return r(this, void 0, Promise, function() {
var e;
return i(this, function(n) {
switch (n.label) {
case 0:
if (t.appId) return [ 3, 2 ];
console.warn("Http 请求未初始化");
return [ 4, a.default.waitUntil(function() {
return t.appId;
}) ];

case 1:
n.sent();
n.label = 2;

case 2:
return t.tmp.has(t.getAllVideoInfo) ? [ 2, t.tmp.get(t.getAllVideoInfo) ] : [ 4, t.request("wechat/getvideoinfo", {
app_id: t.appId,
version: t.version
}) ];

case 3:
0 == (e = n.sent()).code && e.data && t.tmp.set(t.getAllVideoInfo, e);
return [ 2, e ];
}
});
});
};
t.getVideoInfo = function(e) {
return r(this, void 0, void 0, function() {
var n;
return i(this, function(r) {
switch (r.label) {
case 0:
return [ 4, t.getAllVideoInfo() ];

case 1:
return (n = r.sent()) && 0 == n.code && n.data[e] ? [ 2, n.data[e] ] : [ 2 ];
}
});
});
};
t.getAllBannerInfo = function() {
return r(this, void 0, Promise, function() {
var e;
return i(this, function(n) {
switch (n.label) {
case 0:
if (t.appId) return [ 3, 2 ];
console.warn("Http 请求未初始化");
return [ 4, a.default.waitUntil(function() {
return t.appId;
}) ];

case 1:
n.sent();
n.label = 2;

case 2:
return t.tmp.has(t.getAllBannerInfo) ? [ 2, t.tmp.get(t.getAllBannerInfo) ] : [ 4, t.request("wechat/getbannerinfo", {
app_id: t.appId,
version: t.version
}) ];

case 3:
0 == (e = n.sent()).code && e.data && t.tmp.set(t.getAllBannerInfo, e);
return [ 2, e ];
}
});
});
};
t.getBannerInfo = function(e) {
return r(this, void 0, void 0, function() {
var n;
return i(this, function(r) {
switch (r.label) {
case 0:
return [ 4, t.getAllBannerInfo() ];

case 1:
return (n = r.sent()) && 0 == n.code && n.data[e] ? [ 2, n.data[e] ] : [ 2 ];
}
});
});
};
t.getAllInterstitialInfo = function() {
return r(this, void 0, Promise, function() {
var e;
return i(this, function(n) {
switch (n.label) {
case 0:
if (t.appId) return [ 3, 2 ];
console.warn("Http 请求未初始化");
return [ 4, a.default.waitUntil(function() {
return t.appId;
}) ];

case 1:
n.sent();
n.label = 2;

case 2:
return t.tmp.has(t.getAllInterstitialInfo) ? [ 2, t.tmp.get(t.getAllInterstitialInfo) ] : [ 4, t.request("wechat/getscreeninfo", {
app_id: t.appId,
version: t.version
}) ];

case 3:
0 == (e = n.sent()).code && e.data && t.tmp.set(t.getAllInterstitialInfo, e);
return [ 2, e ];
}
});
});
};
t.getInterstitialInfo = function(e) {
return r(this, void 0, void 0, function() {
var n;
return i(this, function(r) {
switch (r.label) {
case 0:
return [ 4, t.getAllInterstitialInfo() ];

case 1:
return (n = r.sent()) && 0 == n.code && n.data[e] ? [ 2, n.data[e] ] : [ 2 ];
}
});
});
};
t.emitSync = function(e, n) {
return r(this, void 0, Promise, function() {
return i(this, function(r) {
switch (r.label) {
case 0:
t.deBug && console.warn(e, n);
r.label = 1;

case 1:
r.trys.push([ 1, 3, , 4 ]);
return [ 4, t.io.emitSync(e, e, n) ];

case 2:
return [ 2, r.sent() ];

case 3:
r.sent();
return [ 3, 4 ];

case 4:
return [ 2 ];
}
});
});
};
t.socketUrl = "wss://xcx.tongchuanggame.com:2020";
t.httpUrl = "https://xcx.tongchuanggame.com/";
t.socketUrlDebug = "wss://xcx.test.tongchuanggame.com:2020";
t.httpUrlDebug = "https://xcx.test.tongchuanggame.com/";
t.version = null;
t.deBug = !1;
t.io = null;
t.appId = null;
t.sysId = null;
t.userId = null;
t.openId = null;
t.tmp = new Map();
t.isInit = !1;
return t;
}();
(function(t) {
var e = function() {
function t() {}
t.LOGIN = "login";
return t;
}();
t.EventType = e;
(function(t) {
t[t.WX = 1] = "WX";
t[t.QQ = 2] = "QQ";
})(t.LoginType || (t.LoginType = {}));
(function(t) {
t[t.WEIGHT_RANDOM = 1] = "WEIGHT_RANDOM";
t[t.SORT = 2] = "SORT";
t[t.RANDOM = 3] = "RANDOM";
})(t.ADVERT_STRATEGY || (t.ADVERT_STRATEGY = {}));
(function(t) {
t[t.EXPOSURECONENT = 0] = "EXPOSURECONENT";
t[t.EXPOSUREPLACE = 1] = "EXPOSUREPLACE";
t[t.CLICK = 2] = "CLICK";
})(t.RecordType || (t.RecordType = {}));
(function(t) {
t[t.Succeed = 1] = "Succeed";
t[t.Fail = 2] = "Fail";
t[t.Cancel = 3] = "Cancel";
})(t.VIDEO_TYPE || (t.VIDEO_TYPE = {}));
(function(t) {
t[t.Exposure = 0] = "Exposure";
t[t.Watch = 1] = "Watch";
t[t.Click = 2] = "Click";
})(t.RECORD_VIDEO_TYPE || (t.RECORD_VIDEO_TYPE = {}));
(function(t) {
t[t.Exposure = 0] = "Exposure";
})(t.RECORD_BANNER_TYPE || (t.RECORD_BANNER_TYPE = {}));
(function(t) {
t[t.Exposure = 0] = "Exposure";
})(t.RECORD_INTERSTITIAL_TYPE || (t.RECORD_INTERSTITIAL_TYPE = {}));
})(u || (u = {}));
n.default = u;
0;
cc._RF.pop();
}, {
"../../Helpers/HttpHelper": "HttpHelper",
"../../Helpers/PromiseHelper": "PromiseHelper",
"../../Helpers/RandomHelper": "RandomHelper",
"../../Helpers/SocketHelper": "SocketHelper"
} ]
}, {}, [ "Blade", "ModalLayer", "Controller", "Model", "Service", "Singleton", "Ticker", "View", "BigHelper", "HttpHelper", "LocationHelper", "NodeHelper", "PromiseHelper", "RandomHelper", "SocketHelper", "SportHelper", "StringHelper", "ICommand", "IController", "IFrameWork", "IModel", "IPlatform", "IPopup", "IService", "ITicker", "IView", "ArchiveServerSDK", "ListView", "LocalizedItem", "LocalizedLabel", "LocalizedRichText", "LocalizedSprite", "StateMachine", "PriorityQueue", "Queue", "SinglyList", "Stack", "Ease", "Tween", "WxServerSDK", "FbPlatform", "GPPlatform", "QQPlatform", "WebPlatform", "WxPlatform", "AudioService", "CommandService", "ConfigService", "ControllerService", "LocalizedService", "ModelService", "NotificationService", "PlatformService", "PoolService", "PopupService", "SceneService", "TickerService", "TimerService", "TweenService", "ViewService", "TestCommand", "UIController", "GameEvent", "PlatformConfig", "GameModel", "TestPanel", "LoadingView", "UIView" ]);