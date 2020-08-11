(function(e, t) {
e.moment = function() {
"use strict";
var e, t;
function n() {
return e.apply(null, arguments);
}
function i(e) {
return e instanceof Array || "[object Array]" === Object.prototype.toString.call(e);
}
function s(e) {
return null != e && "[object Object]" === Object.prototype.toString.call(e);
}
function r(e) {
if (Object.getOwnPropertyNames) return 0 === Object.getOwnPropertyNames(e).length;
var t;
for (t in e) if (e.hasOwnProperty(t)) return !1;
return !0;
}
function a(e) {
return void 0 === e;
}
function o(e) {
return "number" == typeof e || "[object Number]" === Object.prototype.toString.call(e);
}
function u(e) {
return e instanceof Date || "[object Date]" === Object.prototype.toString.call(e);
}
function l(e, t) {
var n, i = [];
for (n = 0; n < e.length; ++n) i.push(t(e[n], n));
return i;
}
function d(e, t) {
return Object.prototype.hasOwnProperty.call(e, t);
}
function h(e, t) {
for (var n in t) d(t, n) && (e[n] = t[n]);
d(t, "toString") && (e.toString = t.toString);
d(t, "valueOf") && (e.valueOf = t.valueOf);
return e;
}
function c(e, t, n, i) {
return Qt(e, t, n, i, !0).utc();
}
function f(e) {
null == e._pf && (e._pf = {
empty: !1,
unusedTokens: [],
unusedInput: [],
overflow: -2,
charsLeftOver: 0,
nullInput: !1,
invalidMonth: null,
invalidFormat: !1,
userInvalidated: !1,
iso: !1,
parsedDateParts: [],
meridiem: null,
rfc2822: !1,
weekdayMismatch: !1
});
return e._pf;
}
t = Array.prototype.some ? Array.prototype.some : function(e) {
for (var t = Object(this), n = t.length >>> 0, i = 0; i < n; i++) if (i in t && e.call(this, t[i], i, t)) return !0;
return !1;
};
function m(e) {
if (null == e._isValid) {
var n = f(e), i = t.call(n.parsedDateParts, function(e) {
return null != e;
}), s = !isNaN(e._d.getTime()) && n.overflow < 0 && !n.empty && !n.invalidMonth && !n.invalidWeekday && !n.weekdayMismatch && !n.nullInput && !n.invalidFormat && !n.userInvalidated && (!n.meridiem || n.meridiem && i);
e._strict && (s = s && 0 === n.charsLeftOver && 0 === n.unusedTokens.length && void 0 === n.bigHour);
if (null != Object.isFrozen && Object.isFrozen(e)) return s;
e._isValid = s;
}
return e._isValid;
}
function _(e) {
var t = c(NaN);
null != e ? h(f(t), e) : f(t).userInvalidated = !0;
return t;
}
var y = n.momentProperties = [];
function g(e, t) {
var n, i, s;
a(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject);
a(t._i) || (e._i = t._i);
a(t._f) || (e._f = t._f);
a(t._l) || (e._l = t._l);
a(t._strict) || (e._strict = t._strict);
a(t._tzm) || (e._tzm = t._tzm);
a(t._isUTC) || (e._isUTC = t._isUTC);
a(t._offset) || (e._offset = t._offset);
a(t._pf) || (e._pf = f(t));
a(t._locale) || (e._locale = t._locale);
if (y.length > 0) for (n = 0; n < y.length; n++) {
i = y[n];
a(s = t[i]) || (e[i] = s);
}
return e;
}
var p = !1;
function v(e) {
g(this, e);
this._d = new Date(null != e._d ? e._d.getTime() : NaN);
this.isValid() || (this._d = new Date(NaN));
if (!1 === p) {
p = !0;
n.updateOffset(this);
p = !1;
}
}
function w(e) {
return e instanceof v || null != e && null != e._isAMomentObject;
}
function M(e) {
return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
}
function S(e) {
var t = +e, n = 0;
0 !== t && isFinite(t) && (n = M(t));
return n;
}
function D(e, t, n) {
var i, s = Math.min(e.length, t.length), r = Math.abs(e.length - t.length), a = 0;
for (i = 0; i < s; i++) (n && e[i] !== t[i] || !n && S(e[i]) !== S(t[i])) && a++;
return a + r;
}
function k(e) {
!1 === n.suppressDeprecationWarnings && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + e);
}
function Y(e, t) {
var i = !0;
return h(function() {
null != n.deprecationHandler && n.deprecationHandler(null, e);
if (i) {
for (var s, r = [], a = 0; a < arguments.length; a++) {
s = "";
if ("object" == typeof arguments[a]) {
s += "\n[" + a + "] ";
for (var o in arguments[0]) s += o + ": " + arguments[0][o] + ", ";
s = s.slice(0, -2);
} else s = arguments[a];
r.push(s);
}
k(e + "\nArguments: " + Array.prototype.slice.call(r).join("") + "\n" + new Error().stack);
i = !1;
}
return t.apply(this, arguments);
}, t);
}
var O, T = {};
function x(e, t) {
null != n.deprecationHandler && n.deprecationHandler(e, t);
if (!T[e]) {
k(t);
T[e] = !0;
}
}
n.suppressDeprecationWarnings = !1;
n.deprecationHandler = null;
function b(e) {
return e instanceof Function || "[object Function]" === Object.prototype.toString.call(e);
}
function P(e, t) {
var n, i = h({}, e);
for (n in t) if (d(t, n)) if (s(e[n]) && s(t[n])) {
i[n] = {};
h(i[n], e[n]);
h(i[n], t[n]);
} else null != t[n] ? i[n] = t[n] : delete i[n];
for (n in e) d(e, n) && !d(t, n) && s(e[n]) && (i[n] = h({}, i[n]));
return i;
}
function W(e) {
null != e && this.set(e);
}
O = Object.keys ? Object.keys : function(e) {
var t, n = [];
for (t in e) d(e, t) && n.push(t);
return n;
};
var H = {};
function R(e, t) {
var n = e.toLowerCase();
H[n] = H[n + "s"] = H[t] = e;
}
function C(e) {
return "string" == typeof e ? H[e] || H[e.toLowerCase()] : void 0;
}
function F(e) {
var t, n, i = {};
for (n in e) d(e, n) && (t = C(n)) && (i[t] = e[n]);
return i;
}
var L = {};
function U(e, t) {
L[e] = t;
}
function N(e) {
var t = [];
for (var n in e) t.push({
unit: n,
priority: L[n]
});
t.sort(function(e, t) {
return e.priority - t.priority;
});
return t;
}
function G(e, t, n) {
var i = "" + Math.abs(e), s = t - i.length, r = e >= 0;
return (r ? n ? "+" : "" : "-") + Math.pow(10, Math.max(0, s)).toString().substr(1) + i;
}
var V = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, E = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, I = {}, A = {};
function j(e, t, n, i) {
var s = i;
"string" == typeof i && (s = function() {
return this[i]();
});
e && (A[e] = s);
t && (A[t[0]] = function() {
return G(s.apply(this, arguments), t[1], t[2]);
});
n && (A[n] = function() {
return this.localeData().ordinal(s.apply(this, arguments), e);
});
}
function Z(e) {
return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "");
}
function z(e) {
var t, n, i = e.match(V);
for (t = 0, n = i.length; t < n; t++) A[i[t]] ? i[t] = A[i[t]] : i[t] = Z(i[t]);
return function(t) {
var s, r = "";
for (s = 0; s < n; s++) r += b(i[s]) ? i[s].call(t, e) : i[s];
return r;
};
}
function $(e, t) {
if (!e.isValid()) return e.localeData().invalidDate();
t = q(t, e.localeData());
I[t] = I[t] || z(t);
return I[t](e);
}
function q(e, t) {
var n = 5;
function i(e) {
return t.longDateFormat(e) || e;
}
E.lastIndex = 0;
for (;n >= 0 && E.test(e); ) {
e = e.replace(E, i);
E.lastIndex = 0;
n -= 1;
}
return e;
}
var J = /\d/, B = /\d\d/, Q = /\d{3}/, X = /\d{4}/, K = /[+-]?\d{6}/, ee = /\d\d?/, te = /\d\d\d\d?/, ne = /\d\d\d\d\d\d?/, ie = /\d{1,3}/, se = /\d{1,4}/, re = /[+-]?\d{1,6}/, ae = /\d+/, oe = /[+-]?\d+/, ue = /Z|[+-]\d\d:?\d\d/gi, le = /Z|[+-]\d\d(?::?\d\d)?/gi, de = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, he = {};
function ce(e, t, n) {
he[e] = b(t) ? t : function(e, i) {
return e && n ? n : t;
};
}
function fe(e, t) {
return d(he, e) ? he[e](t._strict, t._locale) : new RegExp(me(e));
}
function me(e) {
return _e(e.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(e, t, n, i, s) {
return t || n || i || s;
}));
}
function _e(e) {
return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
var ye = {};
function ge(e, t) {
var n, i = t;
"string" == typeof e && (e = [ e ]);
o(t) && (i = function(e, n) {
n[t] = S(e);
});
for (n = 0; n < e.length; n++) ye[e[n]] = i;
}
function pe(e, t) {
ge(e, function(e, n, i, s) {
i._w = i._w || {};
t(e, i._w, i, s);
});
}
function ve(e, t, n) {
null != t && d(ye, e) && ye[e](t, n._a, n, e);
}
var we = 0, Me = 1, Se = 2, De = 3, ke = 4, Ye = 5, Oe = 6, Te = 7, xe = 8;
j("Y", 0, 0, function() {
var e = this.year();
return e <= 9999 ? "" + e : "+" + e;
});
j(0, [ "YY", 2 ], 0, function() {
return this.year() % 100;
});
j(0, [ "YYYY", 4 ], 0, "year");
j(0, [ "YYYYY", 5 ], 0, "year");
j(0, [ "YYYYYY", 6, !0 ], 0, "year");
R("year", "y");
U("year", 1);
ce("Y", oe);
ce("YY", ee, B);
ce("YYYY", se, X);
ce("YYYYY", re, K);
ce("YYYYYY", re, K);
ge([ "YYYYY", "YYYYYY" ], we);
ge("YYYY", function(e, t) {
t[we] = 2 === e.length ? n.parseTwoDigitYear(e) : S(e);
});
ge("YY", function(e, t) {
t[we] = n.parseTwoDigitYear(e);
});
ge("Y", function(e, t) {
t[we] = parseInt(e, 10);
});
function be(e) {
return Pe(e) ? 366 : 365;
}
function Pe(e) {
return e % 4 == 0 && e % 100 != 0 || e % 400 == 0;
}
n.parseTwoDigitYear = function(e) {
return S(e) + (S(e) > 68 ? 1900 : 2e3);
};
var We, He = Re("FullYear", !0);
function Re(e, t) {
return function(i) {
if (null != i) {
Fe(this, e, i);
n.updateOffset(this, t);
return this;
}
return Ce(this, e);
};
}
function Ce(e, t) {
return e.isValid() ? e._d["get" + (e._isUTC ? "UTC" : "") + t]() : NaN;
}
function Fe(e, t, n) {
e.isValid() && !isNaN(n) && ("FullYear" === t && Pe(e.year()) && 1 === e.month() && 29 === e.date() ? e._d["set" + (e._isUTC ? "UTC" : "") + t](n, e.month(), Ue(n, e.month())) : e._d["set" + (e._isUTC ? "UTC" : "") + t](n));
}
function Le(e, t) {
return (e % t + t) % t;
}
We = Array.prototype.indexOf ? Array.prototype.indexOf : function(e) {
var t;
for (t = 0; t < this.length; ++t) if (this[t] === e) return t;
return -1;
};
function Ue(e, t) {
if (isNaN(e) || isNaN(t)) return NaN;
var n = Le(t, 12);
e += (t - n) / 12;
return 1 === n ? Pe(e) ? 29 : 28 : 31 - n % 7 % 2;
}
j("M", [ "MM", 2 ], "Mo", function() {
return this.month() + 1;
});
j("MMM", 0, 0, function(e) {
return this.localeData().monthsShort(this, e);
});
j("MMMM", 0, 0, function(e) {
return this.localeData().months(this, e);
});
R("month", "M");
U("month", 8);
ce("M", ee);
ce("MM", ee, B);
ce("MMM", function(e, t) {
return t.monthsShortRegex(e);
});
ce("MMMM", function(e, t) {
return t.monthsRegex(e);
});
ge([ "M", "MM" ], function(e, t) {
t[Me] = S(e) - 1;
});
ge([ "MMM", "MMMM" ], function(e, t, n, i) {
var s = n._locale.monthsParse(e, i, n._strict);
null != s ? t[Me] = s : f(n).invalidMonth = e;
});
var Ne = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, Ge = "January_February_March_April_May_June_July_August_September_October_November_December".split("_");
var Ve = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_");
function Ee(e, t, n) {
var i, s, r, a = e.toLocaleLowerCase();
if (!this._monthsParse) {
this._monthsParse = [];
this._longMonthsParse = [];
this._shortMonthsParse = [];
for (i = 0; i < 12; ++i) {
r = c([ 2e3, i ]);
this._shortMonthsParse[i] = this.monthsShort(r, "").toLocaleLowerCase();
this._longMonthsParse[i] = this.months(r, "").toLocaleLowerCase();
}
}
return n ? "MMM" === t ? -1 !== (s = We.call(this._shortMonthsParse, a)) ? s : null : -1 !== (s = We.call(this._longMonthsParse, a)) ? s : null : "MMM" === t ? -1 !== (s = We.call(this._shortMonthsParse, a)) ? s : -1 !== (s = We.call(this._longMonthsParse, a)) ? s : null : -1 !== (s = We.call(this._longMonthsParse, a)) ? s : -1 !== (s = We.call(this._shortMonthsParse, a)) ? s : null;
}
function Ie(e, t) {
var n;
if (!e.isValid()) return e;
if ("string" == typeof t) if (/^\d+$/.test(t)) t = S(t); else if (!o(t = e.localeData().monthsParse(t))) return e;
n = Math.min(e.date(), Ue(e.year(), t));
e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, n);
return e;
}
function Ae(e) {
if (null != e) {
Ie(this, e);
n.updateOffset(this, !0);
return this;
}
return Ce(this, "Month");
}
var je = de;
var Ze = de;
function ze() {
function e(e, t) {
return t.length - e.length;
}
var t, n, i = [], s = [], r = [];
for (t = 0; t < 12; t++) {
n = c([ 2e3, t ]);
i.push(this.monthsShort(n, ""));
s.push(this.months(n, ""));
r.push(this.months(n, ""));
r.push(this.monthsShort(n, ""));
}
i.sort(e);
s.sort(e);
r.sort(e);
for (t = 0; t < 12; t++) {
i[t] = _e(i[t]);
s[t] = _e(s[t]);
}
for (t = 0; t < 24; t++) r[t] = _e(r[t]);
this._monthsRegex = new RegExp("^(" + r.join("|") + ")", "i");
this._monthsShortRegex = this._monthsRegex;
this._monthsStrictRegex = new RegExp("^(" + s.join("|") + ")", "i");
this._monthsShortStrictRegex = new RegExp("^(" + i.join("|") + ")", "i");
}
function $e(e, t, n, i, s, r, a) {
var o = new Date(e, t, n, i, s, r, a);
e < 100 && e >= 0 && isFinite(o.getFullYear()) && o.setFullYear(e);
return o;
}
function qe(e) {
var t = new Date(Date.UTC.apply(null, arguments));
e < 100 && e >= 0 && isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e);
return t;
}
function Je(e, t, n) {
var i = 7 + t - n, s = (7 + qe(e, 0, i).getUTCDay() - t) % 7;
return -s + i - 1;
}
function Be(e, t, n, i, s) {
var r, a, o = (7 + n - i) % 7, u = Je(e, i, s), l = 1 + 7 * (t - 1) + o + u;
if (l <= 0) a = be(r = e - 1) + l; else if (l > be(e)) {
r = e + 1;
a = l - be(e);
} else {
r = e;
a = l;
}
return {
year: r,
dayOfYear: a
};
}
function Qe(e, t, n) {
var i, s, r = Je(e.year(), t, n), a = Math.floor((e.dayOfYear() - r - 1) / 7) + 1;
if (a < 1) {
s = e.year() - 1;
i = a + Xe(s, t, n);
} else if (a > Xe(e.year(), t, n)) {
i = a - Xe(e.year(), t, n);
s = e.year() + 1;
} else {
s = e.year();
i = a;
}
return {
week: i,
year: s
};
}
function Xe(e, t, n) {
var i = Je(e, t, n), s = Je(e + 1, t, n);
return (be(e) - i + s) / 7;
}
j("w", [ "ww", 2 ], "wo", "week");
j("W", [ "WW", 2 ], "Wo", "isoWeek");
R("week", "w");
R("isoWeek", "W");
U("week", 5);
U("isoWeek", 5);
ce("w", ee);
ce("ww", ee, B);
ce("W", ee);
ce("WW", ee, B);
pe([ "w", "ww", "W", "WW" ], function(e, t, n, i) {
t[i.substr(0, 1)] = S(e);
});
j("d", 0, "do", "day");
j("dd", 0, 0, function(e) {
return this.localeData().weekdaysMin(this, e);
});
j("ddd", 0, 0, function(e) {
return this.localeData().weekdaysShort(this, e);
});
j("dddd", 0, 0, function(e) {
return this.localeData().weekdays(this, e);
});
j("e", 0, 0, "weekday");
j("E", 0, 0, "isoWeekday");
R("day", "d");
R("weekday", "e");
R("isoWeekday", "E");
U("day", 11);
U("weekday", 11);
U("isoWeekday", 11);
ce("d", ee);
ce("e", ee);
ce("E", ee);
ce("dd", function(e, t) {
return t.weekdaysMinRegex(e);
});
ce("ddd", function(e, t) {
return t.weekdaysShortRegex(e);
});
ce("dddd", function(e, t) {
return t.weekdaysRegex(e);
});
pe([ "dd", "ddd", "dddd" ], function(e, t, n, i) {
var s = n._locale.weekdaysParse(e, i, n._strict);
null != s ? t.d = s : f(n).invalidWeekday = e;
});
pe([ "d", "e", "E" ], function(e, t, n, i) {
t[i] = S(e);
});
function Ke(e, t) {
return "string" != typeof e ? e : isNaN(e) ? "number" == typeof (e = t.weekdaysParse(e)) ? e : null : parseInt(e, 10);
}
function et(e, t) {
return "string" == typeof e ? t.weekdaysParse(e) % 7 || 7 : isNaN(e) ? null : e;
}
var tt = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_");
var nt = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_");
var it = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");
function st(e, t, n) {
var i, s, r, a = e.toLocaleLowerCase();
if (!this._weekdaysParse) {
this._weekdaysParse = [];
this._shortWeekdaysParse = [];
this._minWeekdaysParse = [];
for (i = 0; i < 7; ++i) {
r = c([ 2e3, 1 ]).day(i);
this._minWeekdaysParse[i] = this.weekdaysMin(r, "").toLocaleLowerCase();
this._shortWeekdaysParse[i] = this.weekdaysShort(r, "").toLocaleLowerCase();
this._weekdaysParse[i] = this.weekdays(r, "").toLocaleLowerCase();
}
}
return n ? "dddd" === t ? -1 !== (s = We.call(this._weekdaysParse, a)) ? s : null : "ddd" === t ? -1 !== (s = We.call(this._shortWeekdaysParse, a)) ? s : null : -1 !== (s = We.call(this._minWeekdaysParse, a)) ? s : null : "dddd" === t ? -1 !== (s = We.call(this._weekdaysParse, a)) ? s : -1 !== (s = We.call(this._shortWeekdaysParse, a)) ? s : -1 !== (s = We.call(this._minWeekdaysParse, a)) ? s : null : "ddd" === t ? -1 !== (s = We.call(this._shortWeekdaysParse, a)) ? s : -1 !== (s = We.call(this._weekdaysParse, a)) ? s : -1 !== (s = We.call(this._minWeekdaysParse, a)) ? s : null : -1 !== (s = We.call(this._minWeekdaysParse, a)) ? s : -1 !== (s = We.call(this._weekdaysParse, a)) ? s : -1 !== (s = We.call(this._shortWeekdaysParse, a)) ? s : null;
}
var rt = de;
var at = de;
var ot = de;
function ut() {
function e(e, t) {
return t.length - e.length;
}
var t, n, i, s, r, a = [], o = [], u = [], l = [];
for (t = 0; t < 7; t++) {
n = c([ 2e3, 1 ]).day(t);
i = this.weekdaysMin(n, "");
s = this.weekdaysShort(n, "");
r = this.weekdays(n, "");
a.push(i);
o.push(s);
u.push(r);
l.push(i);
l.push(s);
l.push(r);
}
a.sort(e);
o.sort(e);
u.sort(e);
l.sort(e);
for (t = 0; t < 7; t++) {
o[t] = _e(o[t]);
u[t] = _e(u[t]);
l[t] = _e(l[t]);
}
this._weekdaysRegex = new RegExp("^(" + l.join("|") + ")", "i");
this._weekdaysShortRegex = this._weekdaysRegex;
this._weekdaysMinRegex = this._weekdaysRegex;
this._weekdaysStrictRegex = new RegExp("^(" + u.join("|") + ")", "i");
this._weekdaysShortStrictRegex = new RegExp("^(" + o.join("|") + ")", "i");
this._weekdaysMinStrictRegex = new RegExp("^(" + a.join("|") + ")", "i");
}
function lt() {
return this.hours() % 12 || 12;
}
j("H", [ "HH", 2 ], 0, "hour");
j("h", [ "hh", 2 ], 0, lt);
j("k", [ "kk", 2 ], 0, function() {
return this.hours() || 24;
});
j("hmm", 0, 0, function() {
return "" + lt.apply(this) + G(this.minutes(), 2);
});
j("hmmss", 0, 0, function() {
return "" + lt.apply(this) + G(this.minutes(), 2) + G(this.seconds(), 2);
});
j("Hmm", 0, 0, function() {
return "" + this.hours() + G(this.minutes(), 2);
});
j("Hmmss", 0, 0, function() {
return "" + this.hours() + G(this.minutes(), 2) + G(this.seconds(), 2);
});
function dt(e, t) {
j(e, 0, 0, function() {
return this.localeData().meridiem(this.hours(), this.minutes(), t);
});
}
dt("a", !0);
dt("A", !1);
R("hour", "h");
U("hour", 13);
function ht(e, t) {
return t._meridiemParse;
}
ce("a", ht);
ce("A", ht);
ce("H", ee);
ce("h", ee);
ce("k", ee);
ce("HH", ee, B);
ce("hh", ee, B);
ce("kk", ee, B);
ce("hmm", te);
ce("hmmss", ne);
ce("Hmm", te);
ce("Hmmss", ne);
ge([ "H", "HH" ], De);
ge([ "k", "kk" ], function(e, t, n) {
var i = S(e);
t[De] = 24 === i ? 0 : i;
});
ge([ "a", "A" ], function(e, t, n) {
n._isPm = n._locale.isPM(e);
n._meridiem = e;
});
ge([ "h", "hh" ], function(e, t, n) {
t[De] = S(e);
f(n).bigHour = !0;
});
ge("hmm", function(e, t, n) {
var i = e.length - 2;
t[De] = S(e.substr(0, i));
t[ke] = S(e.substr(i));
f(n).bigHour = !0;
});
ge("hmmss", function(e, t, n) {
var i = e.length - 4, s = e.length - 2;
t[De] = S(e.substr(0, i));
t[ke] = S(e.substr(i, 2));
t[Ye] = S(e.substr(s));
f(n).bigHour = !0;
});
ge("Hmm", function(e, t, n) {
var i = e.length - 2;
t[De] = S(e.substr(0, i));
t[ke] = S(e.substr(i));
});
ge("Hmmss", function(e, t, n) {
var i = e.length - 4, s = e.length - 2;
t[De] = S(e.substr(0, i));
t[ke] = S(e.substr(i, 2));
t[Ye] = S(e.substr(s));
});
var ct, ft = Re("Hours", !0), mt = {
calendar: {
sameDay: "[Today at] LT",
nextDay: "[Tomorrow at] LT",
nextWeek: "dddd [at] LT",
lastDay: "[Yesterday at] LT",
lastWeek: "[Last] dddd [at] LT",
sameElse: "L"
},
longDateFormat: {
LTS: "h:mm:ss A",
LT: "h:mm A",
L: "MM/DD/YYYY",
LL: "MMMM D, YYYY",
LLL: "MMMM D, YYYY h:mm A",
LLLL: "dddd, MMMM D, YYYY h:mm A"
},
invalidDate: "Invalid date",
ordinal: "%d",
dayOfMonthOrdinalParse: /\d{1,2}/,
relativeTime: {
future: "in %s",
past: "%s ago",
s: "a few seconds",
ss: "%d seconds",
m: "a minute",
mm: "%d minutes",
h: "an hour",
hh: "%d hours",
d: "a day",
dd: "%d days",
M: "a month",
MM: "%d months",
y: "a year",
yy: "%d years"
},
months: Ge,
monthsShort: Ve,
week: {
dow: 0,
doy: 6
},
weekdays: tt,
weekdaysMin: it,
weekdaysShort: nt,
meridiemParse: /[ap]\.?m?\.?/i
}, _t = {}, yt = {};
function gt(e) {
return e ? e.toLowerCase().replace("_", "-") : e;
}
function pt(e) {
for (var t, n, i, s, r = 0; r < e.length; ) {
s = gt(e[r]).split("-");
t = s.length;
n = (n = gt(e[r + 1])) ? n.split("-") : null;
for (;t > 0; ) {
if (i = vt(s.slice(0, t).join("-"))) return i;
if (n && n.length >= t && D(s, n, !0) >= t - 1) break;
t--;
}
r++;
}
return ct;
}
function vt(e) {
var t = null;
if (!_t[e] && "undefined" != typeof module && module && module.exports) try {
t = ct._abbr;
var n = require;
n("./locale/" + e);
wt(t);
} catch (e) {}
return _t[e];
}
function wt(e, t) {
var n;
e && ((n = a(t) ? St(e) : Mt(e, t)) ? ct = n : "undefined" != typeof console && console.warn && console.warn("Locale " + e + " not found. Did you forget to load it?"));
return ct._abbr;
}
function Mt(e, t) {
if (null !== t) {
var n, i = mt;
t.abbr = e;
if (null != _t[e]) {
x("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info.");
i = _t[e]._config;
} else if (null != t.parentLocale) if (null != _t[t.parentLocale]) i = _t[t.parentLocale]._config; else {
if (null == (n = vt(t.parentLocale))) {
yt[t.parentLocale] || (yt[t.parentLocale] = []);
yt[t.parentLocale].push({
name: e,
config: t
});
return null;
}
i = n._config;
}
_t[e] = new W(P(i, t));
yt[e] && yt[e].forEach(function(e) {
Mt(e.name, e.config);
});
wt(e);
return _t[e];
}
delete _t[e];
return null;
}
function St(e) {
var t;
e && e._locale && e._locale._abbr && (e = e._locale._abbr);
if (!e) return ct;
if (!i(e)) {
if (t = vt(e)) return t;
e = [ e ];
}
return pt(e);
}
function Dt(e) {
var t, n = e._a;
if (n && -2 === f(e).overflow) {
t = n[Me] < 0 || n[Me] > 11 ? Me : n[Se] < 1 || n[Se] > Ue(n[we], n[Me]) ? Se : n[De] < 0 || n[De] > 24 || 24 === n[De] && (0 !== n[ke] || 0 !== n[Ye] || 0 !== n[Oe]) ? De : n[ke] < 0 || n[ke] > 59 ? ke : n[Ye] < 0 || n[Ye] > 59 ? Ye : n[Oe] < 0 || n[Oe] > 999 ? Oe : -1;
f(e)._overflowDayOfYear && (t < we || t > Se) && (t = Se);
f(e)._overflowWeeks && -1 === t && (t = Te);
f(e)._overflowWeekday && -1 === t && (t = xe);
f(e).overflow = t;
}
return e;
}
function kt(e, t, n) {
return null != e ? e : null != t ? t : n;
}
function Yt(e) {
var t = new Date(n.now());
return e._useUTC ? [ t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate() ] : [ t.getFullYear(), t.getMonth(), t.getDate() ];
}
function Ot(e) {
var t, n, i, s, r, a = [];
if (!e._d) {
i = Yt(e);
e._w && null == e._a[Se] && null == e._a[Me] && Tt(e);
if (null != e._dayOfYear) {
r = kt(e._a[we], i[we]);
(e._dayOfYear > be(r) || 0 === e._dayOfYear) && (f(e)._overflowDayOfYear = !0);
n = qe(r, 0, e._dayOfYear);
e._a[Me] = n.getUTCMonth();
e._a[Se] = n.getUTCDate();
}
for (t = 0; t < 3 && null == e._a[t]; ++t) e._a[t] = a[t] = i[t];
for (;t < 7; t++) e._a[t] = a[t] = null == e._a[t] ? 2 === t ? 1 : 0 : e._a[t];
if (24 === e._a[De] && 0 === e._a[ke] && 0 === e._a[Ye] && 0 === e._a[Oe]) {
e._nextDay = !0;
e._a[De] = 0;
}
e._d = (e._useUTC ? qe : $e).apply(null, a);
s = e._useUTC ? e._d.getUTCDay() : e._d.getDay();
null != e._tzm && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm);
e._nextDay && (e._a[De] = 24);
e._w && "undefined" != typeof e._w.d && e._w.d !== s && (f(e).weekdayMismatch = !0);
}
}
function Tt(e) {
var t, n, i, s, r, a, o, u;
if (null != (t = e._w).GG || null != t.W || null != t.E) {
r = 1;
a = 4;
n = kt(t.GG, e._a[we], Qe(Xt(), 1, 4).year);
i = kt(t.W, 1);
((s = kt(t.E, 1)) < 1 || s > 7) && (u = !0);
} else {
r = e._locale._week.dow;
a = e._locale._week.doy;
var l = Qe(Xt(), r, a);
n = kt(t.gg, e._a[we], l.year);
i = kt(t.w, l.week);
if (null != t.d) ((s = t.d) < 0 || s > 6) && (u = !0); else if (null != t.e) {
s = t.e + r;
(t.e < 0 || t.e > 6) && (u = !0);
} else s = r;
}
if (i < 1 || i > Xe(n, r, a)) f(e)._overflowWeeks = !0; else if (null != u) f(e)._overflowWeekday = !0; else {
o = Be(n, i, s, r, a);
e._a[we] = o.year;
e._dayOfYear = o.dayOfYear;
}
}
var xt = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, bt = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, Pt = /Z|[+-]\d\d(?::?\d\d)?/, Wt = [ [ "YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/ ], [ "YYYY-MM-DD", /\d{4}-\d\d-\d\d/ ], [ "GGGG-[W]WW-E", /\d{4}-W\d\d-\d/ ], [ "GGGG-[W]WW", /\d{4}-W\d\d/, !1 ], [ "YYYY-DDD", /\d{4}-\d{3}/ ], [ "YYYY-MM", /\d{4}-\d\d/, !1 ], [ "YYYYYYMMDD", /[+-]\d{10}/ ], [ "YYYYMMDD", /\d{8}/ ], [ "GGGG[W]WWE", /\d{4}W\d{3}/ ], [ "GGGG[W]WW", /\d{4}W\d{2}/, !1 ], [ "YYYYDDD", /\d{7}/ ] ], Ht = [ [ "HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/ ], [ "HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/ ], [ "HH:mm:ss", /\d\d:\d\d:\d\d/ ], [ "HH:mm", /\d\d:\d\d/ ], [ "HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/ ], [ "HHmmss,SSSS", /\d\d\d\d\d\d,\d+/ ], [ "HHmmss", /\d\d\d\d\d\d/ ], [ "HHmm", /\d\d\d\d/ ], [ "HH", /\d\d/ ] ], Rt = /^\/?Date\((\-?\d+)/i;
function Ct(e) {
var t, n, i, s, r, a, o = e._i, u = xt.exec(o) || bt.exec(o);
if (u) {
f(e).iso = !0;
for (t = 0, n = Wt.length; t < n; t++) if (Wt[t][1].exec(u[1])) {
s = Wt[t][0];
i = !1 !== Wt[t][2];
break;
}
if (null == s) {
e._isValid = !1;
return;
}
if (u[3]) {
for (t = 0, n = Ht.length; t < n; t++) if (Ht[t][1].exec(u[3])) {
r = (u[2] || " ") + Ht[t][0];
break;
}
if (null == r) {
e._isValid = !1;
return;
}
}
if (!i && null != r) {
e._isValid = !1;
return;
}
if (u[4]) {
if (!Pt.exec(u[4])) {
e._isValid = !1;
return;
}
a = "Z";
}
e._f = s + (r || "") + (a || "");
jt(e);
} else e._isValid = !1;
}
var Ft = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;
function Lt(e, t, n, i, s, r) {
var a = [ Ut(e), Ve.indexOf(t), parseInt(n, 10), parseInt(i, 10), parseInt(s, 10) ];
r && a.push(parseInt(r, 10));
return a;
}
function Ut(e) {
var t = parseInt(e, 10);
return t <= 49 ? 2e3 + t : t <= 999 ? 1900 + t : t;
}
function Nt(e) {
return e.replace(/\([^)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
}
function Gt(e, t, n) {
if (e) {
var i = nt.indexOf(e), s = new Date(t[0], t[1], t[2]).getDay();
if (i !== s) {
f(n).weekdayMismatch = !0;
n._isValid = !1;
return !1;
}
}
return !0;
}
var Vt = {
UT: 0,
GMT: 0,
EDT: -240,
EST: -300,
CDT: -300,
CST: -360,
MDT: -360,
MST: -420,
PDT: -420,
PST: -480
};
function Et(e, t, n) {
if (e) return Vt[e];
if (t) return 0;
var i = parseInt(n, 10), s = i % 100, r = (i - s) / 100;
return 60 * r + s;
}
function It(e) {
var t = Ft.exec(Nt(e._i));
if (t) {
var n = Lt(t[4], t[3], t[2], t[5], t[6], t[7]);
if (!Gt(t[1], n, e)) return;
e._a = n;
e._tzm = Et(t[8], t[9], t[10]);
e._d = qe.apply(null, e._a);
e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm);
f(e).rfc2822 = !0;
} else e._isValid = !1;
}
function At(e) {
var t = Rt.exec(e._i);
if (null === t) {
Ct(e);
if (!1 === e._isValid) {
delete e._isValid;
It(e);
if (!1 === e._isValid) {
delete e._isValid;
n.createFromInputFallback(e);
}
}
} else e._d = new Date(+t[1]);
}
n.createFromInputFallback = Y("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function(e) {
e._d = new Date(e._i + (e._useUTC ? " UTC" : ""));
});
n.ISO_8601 = function() {};
n.RFC_2822 = function() {};
function jt(e) {
if (e._f !== n.ISO_8601) if (e._f !== n.RFC_2822) {
e._a = [];
f(e).empty = !0;
var t, i, s, r, a, o = "" + e._i, u = o.length, l = 0;
s = q(e._f, e._locale).match(V) || [];
for (t = 0; t < s.length; t++) {
r = s[t];
if (i = (o.match(fe(r, e)) || [])[0]) {
(a = o.substr(0, o.indexOf(i))).length > 0 && f(e).unusedInput.push(a);
o = o.slice(o.indexOf(i) + i.length);
l += i.length;
}
if (A[r]) {
i ? f(e).empty = !1 : f(e).unusedTokens.push(r);
ve(r, i, e);
} else e._strict && !i && f(e).unusedTokens.push(r);
}
f(e).charsLeftOver = u - l;
o.length > 0 && f(e).unusedInput.push(o);
e._a[De] <= 12 && !0 === f(e).bigHour && e._a[De] > 0 && (f(e).bigHour = void 0);
f(e).parsedDateParts = e._a.slice(0);
f(e).meridiem = e._meridiem;
e._a[De] = Zt(e._locale, e._a[De], e._meridiem);
Ot(e);
Dt(e);
} else It(e); else Ct(e);
}
function Zt(e, t, n) {
var i;
if (null == n) return t;
if (null != e.meridiemHour) return e.meridiemHour(t, n);
if (null != e.isPM) {
(i = e.isPM(n)) && t < 12 && (t += 12);
i || 12 !== t || (t = 0);
return t;
}
return t;
}
function zt(e) {
var t, n, i, s, r;
if (0 !== e._f.length) {
for (s = 0; s < e._f.length; s++) {
r = 0;
t = g({}, e);
null != e._useUTC && (t._useUTC = e._useUTC);
t._f = e._f[s];
jt(t);
if (m(t)) {
r += f(t).charsLeftOver;
r += 10 * f(t).unusedTokens.length;
f(t).score = r;
if (null == i || r < i) {
i = r;
n = t;
}
}
}
h(e, n || t);
} else {
f(e).invalidFormat = !0;
e._d = new Date(NaN);
}
}
function $t(e) {
if (!e._d) {
var t = F(e._i);
e._a = l([ t.year, t.month, t.day || t.date, t.hour, t.minute, t.second, t.millisecond ], function(e) {
return e && parseInt(e, 10);
});
Ot(e);
}
}
function qt(e) {
var t = new v(Dt(Jt(e)));
if (t._nextDay) {
t.add(1, "d");
t._nextDay = void 0;
}
return t;
}
function Jt(e) {
var t = e._i, n = e._f;
e._locale = e._locale || St(e._l);
if (null === t || void 0 === n && "" === t) return _({
nullInput: !0
});
"string" == typeof t && (e._i = t = e._locale.preparse(t));
if (w(t)) return new v(Dt(t));
u(t) ? e._d = t : i(n) ? zt(e) : n ? jt(e) : Bt(e);
m(e) || (e._d = null);
return e;
}
function Bt(e) {
var t = e._i;
if (a(t)) e._d = new Date(n.now()); else if (u(t)) e._d = new Date(t.valueOf()); else if ("string" == typeof t) At(e); else if (i(t)) {
e._a = l(t.slice(0), function(e) {
return parseInt(e, 10);
});
Ot(e);
} else s(t) ? $t(e) : o(t) ? e._d = new Date(t) : n.createFromInputFallback(e);
}
function Qt(e, t, n, a, o) {
var u = {};
if (!0 === n || !1 === n) {
a = n;
n = void 0;
}
(s(e) && r(e) || i(e) && 0 === e.length) && (e = void 0);
u._isAMomentObject = !0;
u._useUTC = u._isUTC = o;
u._l = n;
u._i = e;
u._f = t;
u._strict = a;
return qt(u);
}
function Xt(e, t, n, i) {
return Qt(e, t, n, i, !1);
}
var Kt = Y("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
var e = Xt.apply(null, arguments);
return this.isValid() && e.isValid() ? e < this ? this : e : _();
}), en = Y("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
var e = Xt.apply(null, arguments);
return this.isValid() && e.isValid() ? e > this ? this : e : _();
});
function tn(e, t) {
var n, s;
1 === t.length && i(t[0]) && (t = t[0]);
if (!t.length) return Xt();
n = t[0];
for (s = 1; s < t.length; ++s) t[s].isValid() && !t[s][e](n) || (n = t[s]);
return n;
}
var nn = [ "year", "quarter", "month", "week", "day", "hour", "minute", "second", "millisecond" ];
function sn(e) {
for (var t in e) if (-1 === We.call(nn, t) || null != e[t] && isNaN(e[t])) return !1;
for (var n = !1, i = 0; i < nn.length; ++i) if (e[nn[i]]) {
if (n) return !1;
parseFloat(e[nn[i]]) !== S(e[nn[i]]) && (n = !0);
}
return !0;
}
function rn(e) {
var t = F(e), n = t.year || 0, i = t.quarter || 0, s = t.month || 0, r = t.week || t.isoWeek || 0, a = t.day || 0, o = t.hour || 0, u = t.minute || 0, l = t.second || 0, d = t.millisecond || 0;
this._isValid = sn(t);
this._milliseconds = +d + 1e3 * l + 6e4 * u + 1e3 * o * 60 * 60;
this._days = +a + 7 * r;
this._months = +s + 3 * i + 12 * n;
this._data = {};
this._locale = St();
this._bubble();
}
function an(e) {
return e instanceof rn;
}
function on(e) {
return e < 0 ? -1 * Math.round(-1 * e) : Math.round(e);
}
function un(e, t) {
j(e, 0, 0, function() {
var e = this.utcOffset(), n = "+";
if (e < 0) {
e = -e;
n = "-";
}
return n + G(~~(e / 60), 2) + t + G(~~e % 60, 2);
});
}
un("Z", ":");
un("ZZ", "");
ce("Z", le);
ce("ZZ", le);
ge([ "Z", "ZZ" ], function(e, t, n) {
n._useUTC = !0;
n._tzm = dn(le, e);
});
var ln = /([\+\-]|\d\d)/gi;
function dn(e, t) {
var n = (t || "").match(e);
if (null === n) return null;
var i = n[n.length - 1] || [], s = (i + "").match(ln) || [ "-", 0, 0 ], r = 60 * s[1] + S(s[2]);
return 0 === r ? 0 : "+" === s[0] ? r : -r;
}
function hn(e, t) {
var i, s;
if (t._isUTC) {
i = t.clone();
s = (w(e) || u(e) ? e.valueOf() : Xt(e).valueOf()) - i.valueOf();
i._d.setTime(i._d.valueOf() + s);
n.updateOffset(i, !1);
return i;
}
return Xt(e).local();
}
function cn(e) {
return 15 * -Math.round(e._d.getTimezoneOffset() / 15);
}
n.updateOffset = function() {};
function fn() {
return !!this.isValid() && (this._isUTC && 0 === this._offset);
}
var mn = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/, _n = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
function yn(e, t) {
var n, i, s, r = e, a = null;
if (an(e)) r = {
ms: e._milliseconds,
d: e._days,
M: e._months
}; else if (o(e)) {
r = {};
t ? r[t] = e : r.milliseconds = e;
} else if (a = mn.exec(e)) {
n = "-" === a[1] ? -1 : 1;
r = {
y: 0,
d: S(a[Se]) * n,
h: S(a[De]) * n,
m: S(a[ke]) * n,
s: S(a[Ye]) * n,
ms: S(on(1e3 * a[Oe])) * n
};
} else if (a = _n.exec(e)) {
n = "-" === a[1] ? -1 : 1;
r = {
y: gn(a[2], n),
M: gn(a[3], n),
w: gn(a[4], n),
d: gn(a[5], n),
h: gn(a[6], n),
m: gn(a[7], n),
s: gn(a[8], n)
};
} else if (null == r) r = {}; else if ("object" == typeof r && ("from" in r || "to" in r)) {
s = vn(Xt(r.from), Xt(r.to));
(r = {}).ms = s.milliseconds;
r.M = s.months;
}
i = new rn(r);
an(e) && d(e, "_locale") && (i._locale = e._locale);
return i;
}
yn.fn = rn.prototype;
yn.invalid = function() {
return yn(NaN);
};
function gn(e, t) {
var n = e && parseFloat(e.replace(",", "."));
return (isNaN(n) ? 0 : n) * t;
}
function pn(e, t) {
var n = {
milliseconds: 0,
months: 0
};
n.months = t.month() - e.month() + 12 * (t.year() - e.year());
e.clone().add(n.months, "M").isAfter(t) && --n.months;
n.milliseconds = +t - +e.clone().add(n.months, "M");
return n;
}
function vn(e, t) {
var n;
if (!e.isValid() || !t.isValid()) return {
milliseconds: 0,
months: 0
};
t = hn(t, e);
if (e.isBefore(t)) n = pn(e, t); else {
(n = pn(t, e)).milliseconds = -n.milliseconds;
n.months = -n.months;
}
return n;
}
function wn(e, t) {
return function(n, i) {
var s;
if (null !== i && !isNaN(+i)) {
x(t, "moment()." + t + "(period, number) is deprecated. Please use moment()." + t + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.");
s = n;
n = i;
i = s;
}
Mn(this, yn(n = "string" == typeof n ? +n : n, i), e);
return this;
};
}
function Mn(e, t, i, s) {
var r = t._milliseconds, a = on(t._days), o = on(t._months);
if (e.isValid()) {
s = null == s || s;
o && Ie(e, Ce(e, "Month") + o * i);
a && Fe(e, "Date", Ce(e, "Date") + a * i);
r && e._d.setTime(e._d.valueOf() + r * i);
s && n.updateOffset(e, a || o);
}
}
var Sn = wn(1, "add"), Dn = wn(-1, "subtract");
function kn(e, t) {
var n, i, s = 12 * (t.year() - e.year()) + (t.month() - e.month()), r = e.clone().add(s, "months");
if (t - r < 0) {
n = e.clone().add(s - 1, "months");
i = (t - r) / (r - n);
} else {
n = e.clone().add(s + 1, "months");
i = (t - r) / (n - r);
}
return -(s + i) || 0;
}
n.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
n.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
function Yn(e) {
var t;
if (void 0 === e) return this._locale._abbr;
null != (t = St(e)) && (this._locale = t);
return this;
}
var On = Y("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(e) {
return void 0 === e ? this.localeData() : this.locale(e);
});
function Tn() {
return this._locale;
}
j(0, [ "gg", 2 ], 0, function() {
return this.weekYear() % 100;
});
j(0, [ "GG", 2 ], 0, function() {
return this.isoWeekYear() % 100;
});
function xn(e, t) {
j(0, [ e, e.length ], 0, t);
}
xn("gggg", "weekYear");
xn("ggggg", "weekYear");
xn("GGGG", "isoWeekYear");
xn("GGGGG", "isoWeekYear");
R("weekYear", "gg");
R("isoWeekYear", "GG");
U("weekYear", 1);
U("isoWeekYear", 1);
ce("G", oe);
ce("g", oe);
ce("GG", ee, B);
ce("gg", ee, B);
ce("GGGG", se, X);
ce("gggg", se, X);
ce("GGGGG", re, K);
ce("ggggg", re, K);
pe([ "gggg", "ggggg", "GGGG", "GGGGG" ], function(e, t, n, i) {
t[i.substr(0, 2)] = S(e);
});
pe([ "gg", "GG" ], function(e, t, i, s) {
t[s] = n.parseTwoDigitYear(e);
});
function bn(e, t, n, i, s) {
var r;
if (null == e) return Qe(this, i, s).year;
r = Xe(e, i, s);
t > r && (t = r);
return Pn.call(this, e, t, n, i, s);
}
function Pn(e, t, n, i, s) {
var r = Be(e, t, n, i, s), a = qe(r.year, 0, r.dayOfYear);
this.year(a.getUTCFullYear());
this.month(a.getUTCMonth());
this.date(a.getUTCDate());
return this;
}
j("Q", 0, "Qo", "quarter");
R("quarter", "Q");
U("quarter", 7);
ce("Q", J);
ge("Q", function(e, t) {
t[Me] = 3 * (S(e) - 1);
});
j("D", [ "DD", 2 ], "Do", "date");
R("date", "D");
U("date", 9);
ce("D", ee);
ce("DD", ee, B);
ce("Do", function(e, t) {
return e ? t._dayOfMonthOrdinalParse || t._ordinalParse : t._dayOfMonthOrdinalParseLenient;
});
ge([ "D", "DD" ], Se);
ge("Do", function(e, t) {
t[Se] = S(e.match(ee)[0]);
});
var Wn = Re("Date", !0);
j("DDD", [ "DDDD", 3 ], "DDDo", "dayOfYear");
R("dayOfYear", "DDD");
U("dayOfYear", 4);
ce("DDD", ie);
ce("DDDD", Q);
ge([ "DDD", "DDDD" ], function(e, t, n) {
n._dayOfYear = S(e);
});
j("m", [ "mm", 2 ], 0, "minute");
R("minute", "m");
U("minute", 14);
ce("m", ee);
ce("mm", ee, B);
ge([ "m", "mm" ], ke);
var Hn = Re("Minutes", !1);
j("s", [ "ss", 2 ], 0, "second");
R("second", "s");
U("second", 15);
ce("s", ee);
ce("ss", ee, B);
ge([ "s", "ss" ], Ye);
var Rn, Cn = Re("Seconds", !1);
j("S", 0, 0, function() {
return ~~(this.millisecond() / 100);
});
j(0, [ "SS", 2 ], 0, function() {
return ~~(this.millisecond() / 10);
});
j(0, [ "SSS", 3 ], 0, "millisecond");
j(0, [ "SSSS", 4 ], 0, function() {
return 10 * this.millisecond();
});
j(0, [ "SSSSS", 5 ], 0, function() {
return 100 * this.millisecond();
});
j(0, [ "SSSSSS", 6 ], 0, function() {
return 1e3 * this.millisecond();
});
j(0, [ "SSSSSSS", 7 ], 0, function() {
return 1e4 * this.millisecond();
});
j(0, [ "SSSSSSSS", 8 ], 0, function() {
return 1e5 * this.millisecond();
});
j(0, [ "SSSSSSSSS", 9 ], 0, function() {
return 1e6 * this.millisecond();
});
R("millisecond", "ms");
U("millisecond", 16);
ce("S", ie, J);
ce("SS", ie, B);
ce("SSS", ie, Q);
for (Rn = "SSSS"; Rn.length <= 9; Rn += "S") ce(Rn, ae);
function Fn(e, t) {
t[Oe] = S(1e3 * ("0." + e));
}
for (Rn = "S"; Rn.length <= 9; Rn += "S") ge(Rn, Fn);
var Ln = Re("Milliseconds", !1);
j("z", 0, 0, "zoneAbbr");
j("zz", 0, 0, "zoneName");
var Un = v.prototype;
Un.add = Sn;
Un.calendar = function(e, t) {
var i = e || Xt(), s = hn(i, this).startOf("day"), r = n.calendarFormat(this, s) || "sameElse", a = t && (b(t[r]) ? t[r].call(this, i) : t[r]);
return this.format(a || this.localeData().calendar(r, this, Xt(i)));
};
Un.clone = function() {
return new v(this);
};
Un.diff = function(e, t, n) {
var i, s, r;
if (!this.isValid()) return NaN;
if (!(i = hn(e, this)).isValid()) return NaN;
s = 6e4 * (i.utcOffset() - this.utcOffset());
switch (t = C(t)) {
case "year":
r = kn(this, i) / 12;
break;

case "month":
r = kn(this, i);
break;

case "quarter":
r = kn(this, i) / 3;
break;

case "second":
r = (this - i) / 1e3;
break;

case "minute":
r = (this - i) / 6e4;
break;

case "hour":
r = (this - i) / 36e5;
break;

case "day":
r = (this - i - s) / 864e5;
break;

case "week":
r = (this - i - s) / 6048e5;
break;

default:
r = this - i;
}
return n ? r : M(r);
};
Un.endOf = function(e) {
if (void 0 === (e = C(e)) || "millisecond" === e) return this;
"date" === e && (e = "day");
return this.startOf(e).add(1, "isoWeek" === e ? "week" : e).subtract(1, "ms");
};
Un.format = function(e) {
e || (e = this.isUtc() ? n.defaultFormatUtc : n.defaultFormat);
var t = $(this, e);
return this.localeData().postformat(t);
};
Un.from = function(e, t) {
return this.isValid() && (w(e) && e.isValid() || Xt(e).isValid()) ? yn({
to: this,
from: e
}).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
};
Un.fromNow = function(e) {
return this.from(Xt(), e);
};
Un.to = function(e, t) {
return this.isValid() && (w(e) && e.isValid() || Xt(e).isValid()) ? yn({
from: this,
to: e
}).locale(this.locale()).humanize(!t) : this.localeData().invalidDate();
};
Un.toNow = function(e) {
return this.to(Xt(), e);
};
Un.get = function(e) {
if (b(this[e = C(e)])) return this[e]();
return this;
};
Un.invalidAt = function() {
return f(this).overflow;
};
Un.isAfter = function(e, t) {
var n = w(e) ? e : Xt(e);
if (!this.isValid() || !n.isValid()) return !1;
return "millisecond" === (t = C(t) || "millisecond") ? this.valueOf() > n.valueOf() : n.valueOf() < this.clone().startOf(t).valueOf();
};
Un.isBefore = function(e, t) {
var n = w(e) ? e : Xt(e);
if (!this.isValid() || !n.isValid()) return !1;
return "millisecond" === (t = C(t) || "millisecond") ? this.valueOf() < n.valueOf() : this.clone().endOf(t).valueOf() < n.valueOf();
};
Un.isBetween = function(e, t, n, i) {
var s = w(e) ? e : Xt(e), r = w(t) ? t : Xt(t);
if (!(this.isValid() && s.isValid() && r.isValid())) return !1;
return ("(" === (i = i || "()")[0] ? this.isAfter(s, n) : !this.isBefore(s, n)) && (")" === i[1] ? this.isBefore(r, n) : !this.isAfter(r, n));
};
Un.isSame = function(e, t) {
var n, i = w(e) ? e : Xt(e);
if (!this.isValid() || !i.isValid()) return !1;
if ("millisecond" === (t = C(t) || "millisecond")) return this.valueOf() === i.valueOf();
n = i.valueOf();
return this.clone().startOf(t).valueOf() <= n && n <= this.clone().endOf(t).valueOf();
};
Un.isSameOrAfter = function(e, t) {
return this.isSame(e, t) || this.isAfter(e, t);
};
Un.isSameOrBefore = function(e, t) {
return this.isSame(e, t) || this.isBefore(e, t);
};
Un.isValid = function() {
return m(this);
};
Un.lang = On;
Un.locale = Yn;
Un.localeData = Tn;
Un.max = en;
Un.min = Kt;
Un.parsingFlags = function() {
return h({}, f(this));
};
Un.set = function(e, t) {
if ("object" == typeof e) for (var n = N(e = F(e)), i = 0; i < n.length; i++) this[n[i].unit](e[n[i].unit]); else if (b(this[e = C(e)])) return this[e](t);
return this;
};
Un.startOf = function(e) {
switch (e = C(e)) {
case "year":
this.month(0);

case "quarter":
case "month":
this.date(1);

case "week":
case "isoWeek":
case "day":
case "date":
this.hours(0);

case "hour":
this.minutes(0);

case "minute":
this.seconds(0);

case "second":
this.milliseconds(0);
}
"week" === e && this.weekday(0);
"isoWeek" === e && this.isoWeekday(1);
"quarter" === e && this.month(3 * Math.floor(this.month() / 3));
return this;
};
Un.subtract = Dn;
Un.toArray = function() {
var e = this;
return [ e.year(), e.month(), e.date(), e.hour(), e.minute(), e.second(), e.millisecond() ];
};
Un.toObject = function() {
var e = this;
return {
years: e.year(),
months: e.month(),
date: e.date(),
hours: e.hours(),
minutes: e.minutes(),
seconds: e.seconds(),
milliseconds: e.milliseconds()
};
};
Un.toDate = function() {
return new Date(this.valueOf());
};
Un.toISOString = function(e) {
if (!this.isValid()) return null;
var t = !0 !== e, n = t ? this.clone().utc() : this;
if (n.year() < 0 || n.year() > 9999) return $(n, t ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ");
if (b(Date.prototype.toISOString)) return t ? this.toDate().toISOString() : new Date(this.valueOf() + 60 * this.utcOffset() * 1e3).toISOString().replace("Z", $(n, "Z"));
return $(n, t ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ");
};
Un.inspect = function() {
if (!this.isValid()) return "moment.invalid(/* " + this._i + " */)";
var e = "moment", t = "";
if (!this.isLocal()) {
e = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone";
t = "Z";
}
var n = "[" + e + '("]', i = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY", s = t + '[")]';
return this.format(n + i + "-MM-DD[T]HH:mm:ss.SSS" + s);
};
Un.toJSON = function() {
return this.isValid() ? this.toISOString() : null;
};
Un.toString = function() {
return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
};
Un.unix = function() {
return Math.floor(this.valueOf() / 1e3);
};
Un.valueOf = function() {
return this._d.valueOf() - 6e4 * (this._offset || 0);
};
Un.creationData = function() {
return {
input: this._i,
format: this._f,
locale: this._locale,
isUTC: this._isUTC,
strict: this._strict
};
};
Un.year = He;
Un.isLeapYear = function() {
return Pe(this.year());
};
Un.weekYear = function(e) {
return bn.call(this, e, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy);
};
Un.isoWeekYear = function(e) {
return bn.call(this, e, this.isoWeek(), this.isoWeekday(), 1, 4);
};
Un.quarter = Un.quarters = function(e) {
return null == e ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (e - 1) + this.month() % 3);
};
Un.month = Ae;
Un.daysInMonth = function() {
return Ue(this.year(), this.month());
};
Un.week = Un.weeks = function(e) {
var t = this.localeData().week(this);
return null == e ? t : this.add(7 * (e - t), "d");
};
Un.isoWeek = Un.isoWeeks = function(e) {
var t = Qe(this, 1, 4).week;
return null == e ? t : this.add(7 * (e - t), "d");
};
Un.weeksInYear = function() {
var e = this.localeData()._week;
return Xe(this.year(), e.dow, e.doy);
};
Un.isoWeeksInYear = function() {
return Xe(this.year(), 1, 4);
};
Un.date = Wn;
Un.day = Un.days = function(e) {
if (!this.isValid()) return null != e ? this : NaN;
var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
if (null != e) {
e = Ke(e, this.localeData());
return this.add(e - t, "d");
}
return t;
};
Un.weekday = function(e) {
if (!this.isValid()) return null != e ? this : NaN;
var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
return null == e ? t : this.add(e - t, "d");
};
Un.isoWeekday = function(e) {
if (!this.isValid()) return null != e ? this : NaN;
if (null != e) {
var t = et(e, this.localeData());
return this.day(this.day() % 7 ? t : t - 7);
}
return this.day() || 7;
};
Un.dayOfYear = function(e) {
var t = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
return null == e ? t : this.add(e - t, "d");
};
Un.hour = Un.hours = ft;
Un.minute = Un.minutes = Hn;
Un.second = Un.seconds = Cn;
Un.millisecond = Un.milliseconds = Ln;
Un.utcOffset = function(e, t, i) {
var s, r = this._offset || 0;
if (!this.isValid()) return null != e ? this : NaN;
if (null != e) {
if ("string" == typeof e) {
if (null === (e = dn(le, e))) return this;
} else Math.abs(e) < 16 && !i && (e *= 60);
!this._isUTC && t && (s = cn(this));
this._offset = e;
this._isUTC = !0;
null != s && this.add(s, "m");
if (r !== e) if (!t || this._changeInProgress) Mn(this, yn(e - r, "m"), 1, !1); else if (!this._changeInProgress) {
this._changeInProgress = !0;
n.updateOffset(this, !0);
this._changeInProgress = null;
}
return this;
}
return this._isUTC ? r : cn(this);
};
Un.utc = function(e) {
return this.utcOffset(0, e);
};
Un.local = function(e) {
if (this._isUTC) {
this.utcOffset(0, e);
this._isUTC = !1;
e && this.subtract(cn(this), "m");
}
return this;
};
Un.parseZone = function() {
if (null != this._tzm) this.utcOffset(this._tzm, !1, !0); else if ("string" == typeof this._i) {
var e = dn(ue, this._i);
null != e ? this.utcOffset(e) : this.utcOffset(0, !0);
}
return this;
};
Un.hasAlignedHourOffset = function(e) {
if (!this.isValid()) return !1;
e = e ? Xt(e).utcOffset() : 0;
return (this.utcOffset() - e) % 60 == 0;
};
Un.isDST = function() {
return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
};
Un.isLocal = function() {
return !!this.isValid() && !this._isUTC;
};
Un.isUtcOffset = function() {
return !!this.isValid() && this._isUTC;
};
Un.isUtc = fn;
Un.isUTC = fn;
Un.zoneAbbr = function() {
return this._isUTC ? "UTC" : "";
};
Un.zoneName = function() {
return this._isUTC ? "Coordinated Universal Time" : "";
};
Un.dates = Y("dates accessor is deprecated. Use date instead.", Wn);
Un.months = Y("months accessor is deprecated. Use month instead", Ae);
Un.years = Y("years accessor is deprecated. Use year instead", He);
Un.zone = Y("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", function(e, t) {
if (null != e) {
"string" != typeof e && (e = -e);
this.utcOffset(e, t);
return this;
}
return -this.utcOffset();
});
Un.isDSTShifted = Y("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", function() {
if (!a(this._isDSTShifted)) return this._isDSTShifted;
var e = {};
g(e, this);
if ((e = Jt(e))._a) {
var t = e._isUTC ? c(e._a) : Xt(e._a);
this._isDSTShifted = this.isValid() && D(e._a, t.toArray()) > 0;
} else this._isDSTShifted = !1;
return this._isDSTShifted;
});
function Nn(e) {
return e;
}
var Gn = W.prototype;
Gn.calendar = function(e, t, n) {
var i = this._calendar[e] || this._calendar.sameElse;
return b(i) ? i.call(t, n) : i;
};
Gn.longDateFormat = function(e) {
var t = this._longDateFormat[e], n = this._longDateFormat[e.toUpperCase()];
if (t || !n) return t;
this._longDateFormat[e] = n.replace(/MMMM|MM|DD|dddd/g, function(e) {
return e.slice(1);
});
return this._longDateFormat[e];
};
Gn.invalidDate = function() {
return this._invalidDate;
};
Gn.ordinal = function(e) {
return this._ordinal.replace("%d", e);
};
Gn.preparse = Nn;
Gn.postformat = Nn;
Gn.relativeTime = function(e, t, n, i) {
var s = this._relativeTime[n];
return b(s) ? s(e, t, n, i) : s.replace(/%d/i, e);
};
Gn.pastFuture = function(e, t) {
var n = this._relativeTime[e > 0 ? "future" : "past"];
return b(n) ? n(t) : n.replace(/%s/i, t);
};
Gn.set = function(e) {
var t, n;
for (n in e) b(t = e[n]) ? this[n] = t : this["_" + n] = t;
this._config = e;
this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source);
};
Gn.months = function(e, t) {
if (!e) return i(this._months) ? this._months : this._months.standalone;
return i(this._months) ? this._months[e.month()] : this._months[(this._months.isFormat || Ne).test(t) ? "format" : "standalone"][e.month()];
};
Gn.monthsShort = function(e, t) {
if (!e) return i(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone;
return i(this._monthsShort) ? this._monthsShort[e.month()] : this._monthsShort[Ne.test(t) ? "format" : "standalone"][e.month()];
};
Gn.monthsParse = function(e, t, n) {
var i, s, r;
if (this._monthsParseExact) return Ee.call(this, e, t, n);
if (!this._monthsParse) {
this._monthsParse = [];
this._longMonthsParse = [];
this._shortMonthsParse = [];
}
for (i = 0; i < 12; i++) {
s = c([ 2e3, i ]);
if (n && !this._longMonthsParse[i]) {
this._longMonthsParse[i] = new RegExp("^" + this.months(s, "").replace(".", "") + "$", "i");
this._shortMonthsParse[i] = new RegExp("^" + this.monthsShort(s, "").replace(".", "") + "$", "i");
}
if (!n && !this._monthsParse[i]) {
r = "^" + this.months(s, "") + "|^" + this.monthsShort(s, "");
this._monthsParse[i] = new RegExp(r.replace(".", ""), "i");
}
if (n && "MMMM" === t && this._longMonthsParse[i].test(e)) return i;
if (n && "MMM" === t && this._shortMonthsParse[i].test(e)) return i;
if (!n && this._monthsParse[i].test(e)) return i;
}
};
Gn.monthsRegex = function(e) {
if (this._monthsParseExact) {
d(this, "_monthsRegex") || ze.call(this);
return e ? this._monthsStrictRegex : this._monthsRegex;
}
d(this, "_monthsRegex") || (this._monthsRegex = Ze);
return this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex;
};
Gn.monthsShortRegex = function(e) {
if (this._monthsParseExact) {
d(this, "_monthsRegex") || ze.call(this);
return e ? this._monthsShortStrictRegex : this._monthsShortRegex;
}
d(this, "_monthsShortRegex") || (this._monthsShortRegex = je);
return this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex;
};
Gn.week = function(e) {
return Qe(e, this._week.dow, this._week.doy).week;
};
Gn.firstDayOfYear = function() {
return this._week.doy;
};
Gn.firstDayOfWeek = function() {
return this._week.dow;
};
Gn.weekdays = function(e, t) {
if (!e) return i(this._weekdays) ? this._weekdays : this._weekdays.standalone;
return i(this._weekdays) ? this._weekdays[e.day()] : this._weekdays[this._weekdays.isFormat.test(t) ? "format" : "standalone"][e.day()];
};
Gn.weekdaysMin = function(e) {
return e ? this._weekdaysMin[e.day()] : this._weekdaysMin;
};
Gn.weekdaysShort = function(e) {
return e ? this._weekdaysShort[e.day()] : this._weekdaysShort;
};
Gn.weekdaysParse = function(e, t, n) {
var i, s, r;
if (this._weekdaysParseExact) return st.call(this, e, t, n);
if (!this._weekdaysParse) {
this._weekdaysParse = [];
this._minWeekdaysParse = [];
this._shortWeekdaysParse = [];
this._fullWeekdaysParse = [];
}
for (i = 0; i < 7; i++) {
s = c([ 2e3, 1 ]).day(i);
if (n && !this._fullWeekdaysParse[i]) {
this._fullWeekdaysParse[i] = new RegExp("^" + this.weekdays(s, "").replace(".", "\\.?") + "$", "i");
this._shortWeekdaysParse[i] = new RegExp("^" + this.weekdaysShort(s, "").replace(".", "\\.?") + "$", "i");
this._minWeekdaysParse[i] = new RegExp("^" + this.weekdaysMin(s, "").replace(".", "\\.?") + "$", "i");
}
if (!this._weekdaysParse[i]) {
r = "^" + this.weekdays(s, "") + "|^" + this.weekdaysShort(s, "") + "|^" + this.weekdaysMin(s, "");
this._weekdaysParse[i] = new RegExp(r.replace(".", ""), "i");
}
if (n && "dddd" === t && this._fullWeekdaysParse[i].test(e)) return i;
if (n && "ddd" === t && this._shortWeekdaysParse[i].test(e)) return i;
if (n && "dd" === t && this._minWeekdaysParse[i].test(e)) return i;
if (!n && this._weekdaysParse[i].test(e)) return i;
}
};
Gn.weekdaysRegex = function(e) {
if (this._weekdaysParseExact) {
d(this, "_weekdaysRegex") || ut.call(this);
return e ? this._weekdaysStrictRegex : this._weekdaysRegex;
}
d(this, "_weekdaysRegex") || (this._weekdaysRegex = rt);
return this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex;
};
Gn.weekdaysShortRegex = function(e) {
if (this._weekdaysParseExact) {
d(this, "_weekdaysRegex") || ut.call(this);
return e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
}
d(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = at);
return this._weekdaysShortStrictRegex && e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
};
Gn.weekdaysMinRegex = function(e) {
if (this._weekdaysParseExact) {
d(this, "_weekdaysRegex") || ut.call(this);
return e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
}
d(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = ot);
return this._weekdaysMinStrictRegex && e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
};
Gn.isPM = function(e) {
return "p" === (e + "").toLowerCase().charAt(0);
};
Gn.meridiem = function(e, t, n) {
return e > 11 ? n ? "pm" : "PM" : n ? "am" : "AM";
};
function Vn(e, t, n, i) {
var s = St(), r = c().set(i, t);
return s[n](r, e);
}
function En(e, t, n) {
if (o(e)) {
t = e;
e = void 0;
}
e = e || "";
if (null != t) return Vn(e, t, n, "month");
var i, s = [];
for (i = 0; i < 12; i++) s[i] = Vn(e, i, n, "month");
return s;
}
function In(e, t, n, i) {
if ("boolean" == typeof e) {
if (o(t)) {
n = t;
t = void 0;
}
t = t || "";
} else {
n = t = e;
e = !1;
if (o(t)) {
n = t;
t = void 0;
}
t = t || "";
}
var s, r = St(), a = e ? r._week.dow : 0;
if (null != n) return Vn(t, (n + a) % 7, i, "day");
var u = [];
for (s = 0; s < 7; s++) u[s] = Vn(t, (s + a) % 7, i, "day");
return u;
}
wt("en", {
dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
ordinal: function(e) {
var t = e % 10, n = 1 === S(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th";
return e + n;
}
});
n.lang = Y("moment.lang is deprecated. Use moment.locale instead.", wt);
n.langData = Y("moment.langData is deprecated. Use moment.localeData instead.", St);
var An = Math.abs;
function jn(e, t, n, i) {
var s = yn(t, n);
e._milliseconds += i * s._milliseconds;
e._days += i * s._days;
e._months += i * s._months;
return e._bubble();
}
function Zn(e) {
return e < 0 ? Math.floor(e) : Math.ceil(e);
}
function zn(e) {
return 4800 * e / 146097;
}
function $n(e) {
return 146097 * e / 4800;
}
function qn(e) {
return function() {
return this.as(e);
};
}
var Jn = qn("ms"), Bn = qn("s"), Qn = qn("m"), Xn = qn("h"), Kn = qn("d"), ei = qn("w"), ti = qn("M"), ni = qn("y");
function ii(e) {
return function() {
return this.isValid() ? this._data[e] : NaN;
};
}
var si = ii("milliseconds"), ri = ii("seconds"), ai = ii("minutes"), oi = ii("hours"), ui = ii("days"), li = ii("months"), di = ii("years");
var hi = Math.round, ci = {
ss: 44,
s: 45,
m: 45,
h: 22,
d: 26,
M: 11
};
function fi(e, t, n, i, s) {
return s.relativeTime(t || 1, !!n, e, i);
}
function mi(e, t, n) {
var i = yn(e).abs(), s = hi(i.as("s")), r = hi(i.as("m")), a = hi(i.as("h")), o = hi(i.as("d")), u = hi(i.as("M")), l = hi(i.as("y")), d = s <= ci.ss && [ "s", s ] || s < ci.s && [ "ss", s ] || r <= 1 && [ "m" ] || r < ci.m && [ "mm", r ] || a <= 1 && [ "h" ] || a < ci.h && [ "hh", a ] || o <= 1 && [ "d" ] || o < ci.d && [ "dd", o ] || u <= 1 && [ "M" ] || u < ci.M && [ "MM", u ] || l <= 1 && [ "y" ] || [ "yy", l ];
d[2] = t;
d[3] = +e > 0;
d[4] = n;
return fi.apply(null, d);
}
var _i = Math.abs;
function yi(e) {
return (e > 0) - (e < 0) || +e;
}
function gi() {
if (!this.isValid()) return this.localeData().invalidDate();
var e, t, n = _i(this._milliseconds) / 1e3, i = _i(this._days), s = _i(this._months);
e = M(n / 60);
t = M(e / 60);
n %= 60;
e %= 60;
var r = M(s / 12), a = s %= 12, o = i, u = t, l = e, d = n ? n.toFixed(3).replace(/\.?0+$/, "") : "", h = this.asSeconds();
if (!h) return "P0D";
var c = h < 0 ? "-" : "", f = yi(this._months) !== yi(h) ? "-" : "", m = yi(this._days) !== yi(h) ? "-" : "", _ = yi(this._milliseconds) !== yi(h) ? "-" : "";
return c + "P" + (r ? f + r + "Y" : "") + (a ? f + a + "M" : "") + (o ? m + o + "D" : "") + (u || l || d ? "T" : "") + (u ? _ + u + "H" : "") + (l ? _ + l + "M" : "") + (d ? _ + d + "S" : "");
}
var pi = rn.prototype;
pi.isValid = function() {
return this._isValid;
};
pi.abs = function() {
var e = this._data;
this._milliseconds = An(this._milliseconds);
this._days = An(this._days);
this._months = An(this._months);
e.milliseconds = An(e.milliseconds);
e.seconds = An(e.seconds);
e.minutes = An(e.minutes);
e.hours = An(e.hours);
e.months = An(e.months);
e.years = An(e.years);
return this;
};
pi.add = function(e, t) {
return jn(this, e, t, 1);
};
pi.subtract = function(e, t) {
return jn(this, e, t, -1);
};
pi.as = function(e) {
if (!this.isValid()) return NaN;
var t, n, i = this._milliseconds;
if ("month" === (e = C(e)) || "year" === e) {
t = this._days + i / 864e5;
n = this._months + zn(t);
return "month" === e ? n : n / 12;
}
t = this._days + Math.round($n(this._months));
switch (e) {
case "week":
return t / 7 + i / 6048e5;

case "day":
return t + i / 864e5;

case "hour":
return 24 * t + i / 36e5;

case "minute":
return 1440 * t + i / 6e4;

case "second":
return 86400 * t + i / 1e3;

case "millisecond":
return Math.floor(864e5 * t) + i;

default:
throw new Error("Unknown unit " + e);
}
};
pi.asMilliseconds = Jn;
pi.asSeconds = Bn;
pi.asMinutes = Qn;
pi.asHours = Xn;
pi.asDays = Kn;
pi.asWeeks = ei;
pi.asMonths = ti;
pi.asYears = ni;
pi.valueOf = function() {
if (!this.isValid()) return NaN;
return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * S(this._months / 12);
};
pi._bubble = function() {
var e, t, n, i, s, r = this._milliseconds, a = this._days, o = this._months, u = this._data;
if (!(r >= 0 && a >= 0 && o >= 0 || r <= 0 && a <= 0 && o <= 0)) {
r += 864e5 * Zn($n(o) + a);
a = 0;
o = 0;
}
u.milliseconds = r % 1e3;
e = M(r / 1e3);
u.seconds = e % 60;
t = M(e / 60);
u.minutes = t % 60;
n = M(t / 60);
u.hours = n % 24;
a += M(n / 24);
s = M(zn(a));
o += s;
a -= Zn($n(s));
i = M(o / 12);
o %= 12;
u.days = a;
u.months = o;
u.years = i;
return this;
};
pi.clone = function() {
return yn(this);
};
pi.get = function(e) {
e = C(e);
return this.isValid() ? this[e + "s"]() : NaN;
};
pi.milliseconds = si;
pi.seconds = ri;
pi.minutes = ai;
pi.hours = oi;
pi.days = ui;
pi.weeks = function() {
return M(this.days() / 7);
};
pi.months = li;
pi.years = di;
pi.humanize = function(e) {
if (!this.isValid()) return this.localeData().invalidDate();
var t = this.localeData(), n = mi(this, !e, t);
e && (n = t.pastFuture(+this, n));
return t.postformat(n);
};
pi.toISOString = gi;
pi.toString = gi;
pi.toJSON = gi;
pi.locale = Yn;
pi.localeData = Tn;
pi.toIsoString = Y("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", gi);
pi.lang = On;
j("X", 0, 0, "unix");
j("x", 0, 0, "valueOf");
ce("x", oe);
ce("X", /[+-]?\d+(\.\d{1,3})?/);
ge("X", function(e, t, n) {
n._d = new Date(1e3 * parseFloat(e, 10));
});
ge("x", function(e, t, n) {
n._d = new Date(S(e));
});
n.version = "2.23.0";
(function(t) {
e = t;
})(Xt);
n.fn = Un;
n.min = function() {
return tn("isBefore", [].slice.call(arguments, 0));
};
n.max = function() {
return tn("isAfter", [].slice.call(arguments, 0));
};
n.now = function() {
return Date.now ? Date.now() : +new Date();
};
n.utc = c;
n.unix = function(e) {
return Xt(1e3 * e);
};
n.months = function(e, t) {
return En(e, t, "months");
};
n.isDate = u;
n.locale = wt;
n.invalid = _;
n.duration = yn;
n.isMoment = w;
n.weekdays = function(e, t, n) {
return In(e, t, n, "weekdays");
};
n.parseZone = function() {
return Xt.apply(null, arguments).parseZone();
};
n.localeData = St;
n.isDuration = an;
n.monthsShort = function(e, t) {
return En(e, t, "monthsShort");
};
n.weekdaysMin = function(e, t, n) {
return In(e, t, n, "weekdaysMin");
};
n.defineLocale = Mt;
n.updateLocale = function(e, t) {
if (null != t) {
var n, i, s = mt;
null != (i = vt(e)) && (s = i._config);
t = P(s, t);
(n = new W(t)).parentLocale = _t[e];
_t[e] = n;
wt(e);
} else null != _t[e] && (null != _t[e].parentLocale ? _t[e] = _t[e].parentLocale : null != _t[e] && delete _t[e]);
return _t[e];
};
n.locales = function() {
return O(_t);
};
n.weekdaysShort = function(e, t, n) {
return In(e, t, n, "weekdaysShort");
};
n.normalizeUnits = C;
n.relativeTimeRounding = function(e) {
if (void 0 === e) return hi;
if ("function" == typeof e) {
hi = e;
return !0;
}
return !1;
};
n.relativeTimeThreshold = function(e, t) {
if (void 0 === ci[e]) return !1;
if (void 0 === t) return ci[e];
ci[e] = t;
"s" === e && (ci.ss = t - 1);
return !0;
};
n.calendarFormat = function(e, t) {
var n = e.diff(t, "days", !0);
return n < -6 ? "sameElse" : n < -1 ? "lastWeek" : n < 0 ? "lastDay" : n < 1 ? "sameDay" : n < 2 ? "nextDay" : n < 7 ? "nextWeek" : "sameElse";
};
n.prototype = Un;
n.HTML5_FMT = {
DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
DATE: "YYYY-MM-DD",
TIME: "HH:mm",
TIME_SECONDS: "HH:mm:ss",
TIME_MS: "HH:mm:ss.SSS",
WEEK: "GGGG-[W]WW",
MONTH: "YYYY-MM"
};
return n;
}();
})(this);