var Reflect;

(function(t) {
(function(e) {
var r = "object" == typeof global ? global : "object" == typeof self ? self : "object" == typeof this ? this : Function("return this;")(), n = i(t);
"undefined" == typeof r.Reflect ? r.Reflect = t : n = i(r.Reflect, n);
(function(t) {
var e = Object.prototype.hasOwnProperty, r = "function" == typeof Symbol, n = r && "undefined" != typeof Symbol.toPrimitive ? Symbol.toPrimitive : "@@toPrimitive", i = r && "undefined" != typeof Symbol.iterator ? Symbol.iterator : "@@iterator", o = "function" == typeof Object.create, u = {
__proto__: []
} instanceof Array, f = !o && !u, a = {
create: o ? function() {
return q(Object.create(null));
} : u ? function() {
return q({
__proto__: null
});
} : function() {
return q({});
},
has: f ? function(t, r) {
return e.call(t, r);
} : function(t, e) {
return e in t;
},
get: f ? function(t, r) {
return e.call(t, r) ? t[r] : void 0;
} : function(t, e) {
return t[e];
}
}, c = Object.getPrototypeOf(Function), s = "object" == typeof process && process.env && "true" === process.env.REFLECT_METADATA_USE_MAP_POLYFILL, h = s || "function" != typeof Map || "function" != typeof Map.prototype.entries ? function() {
var t = {}, e = [], r = function() {
function t(t, e, r) {
this._index = 0;
this._keys = t;
this._values = e;
this._selector = r;
}
t.prototype["@@iterator"] = function() {
return this;
};
t.prototype[i] = function() {
return this;
};
t.prototype.next = function() {
var t = this._index;
if (t >= 0 && t < this._keys.length) {
var r = this._selector(this._keys[t], this._values[t]);
if (t + 1 >= this._keys.length) {
this._index = -1;
this._keys = e;
this._values = e;
} else this._index++;
return {
value: r,
done: !1
};
}
return {
value: void 0,
done: !0
};
};
t.prototype.throw = function(t) {
if (this._index >= 0) {
this._index = -1;
this._keys = e;
this._values = e;
}
throw t;
};
t.prototype.return = function(t) {
if (this._index >= 0) {
this._index = -1;
this._keys = e;
this._values = e;
}
return {
value: t,
done: !0
};
};
return t;
}();
return function() {
function e() {
this._keys = [];
this._values = [];
this._cacheKey = t;
this._cacheIndex = -2;
}
Object.defineProperty(e.prototype, "size", {
get: function() {
return this._keys.length;
},
enumerable: !0,
configurable: !0
});
e.prototype.has = function(t) {
return this._find(t, !1) >= 0;
};
e.prototype.get = function(t) {
var e = this._find(t, !1);
return e >= 0 ? this._values[e] : void 0;
};
e.prototype.set = function(t, e) {
var r = this._find(t, !0);
this._values[r] = e;
return this;
};
e.prototype.delete = function(e) {
var r = this._find(e, !1);
if (r >= 0) {
for (var n = this._keys.length, i = r + 1; i < n; i++) {
this._keys[i - 1] = this._keys[i];
this._values[i - 1] = this._values[i];
}
this._keys.length--;
this._values.length--;
if (e === this._cacheKey) {
this._cacheKey = t;
this._cacheIndex = -2;
}
return !0;
}
return !1;
};
e.prototype.clear = function() {
this._keys.length = 0;
this._values.length = 0;
this._cacheKey = t;
this._cacheIndex = -2;
};
e.prototype.keys = function() {
return new r(this._keys, this._values, n);
};
e.prototype.values = function() {
return new r(this._keys, this._values, o);
};
e.prototype.entries = function() {
return new r(this._keys, this._values, u);
};
e.prototype["@@iterator"] = function() {
return this.entries();
};
e.prototype[i] = function() {
return this.entries();
};
e.prototype._find = function(t, e) {
this._cacheKey !== t && (this._cacheIndex = this._keys.indexOf(this._cacheKey = t));
if (this._cacheIndex < 0 && e) {
this._cacheIndex = this._keys.length;
this._keys.push(t);
this._values.push(void 0);
}
return this._cacheIndex;
};
return e;
}();
function n(t, e) {
return t;
}
function o(t, e) {
return e;
}
function u(t, e) {
return [ t, e ];
}
}() : Map, p = s || "function" != typeof Set || "function" != typeof Set.prototype.entries ? function() {
function t() {
this._map = new h();
}
Object.defineProperty(t.prototype, "size", {
get: function() {
return this._map.size;
},
enumerable: !0,
configurable: !0
});
t.prototype.has = function(t) {
return this._map.has(t);
};
t.prototype.add = function(t) {
return this._map.set(t, t), this;
};
t.prototype.delete = function(t) {
return this._map.delete(t);
};
t.prototype.clear = function() {
this._map.clear();
};
t.prototype.keys = function() {
return this._map.keys();
};
t.prototype.values = function() {
return this._map.values();
};
t.prototype.entries = function() {
return this._map.entries();
};
t.prototype["@@iterator"] = function() {
return this.keys();
};
t.prototype[i] = function() {
return this.keys();
};
return t;
}() : Set, y = new (s || "function" != typeof WeakMap ? function() {
var t = 16, r = a.create(), n = i();
return function() {
function t() {
this._key = i();
}
t.prototype.has = function(t) {
var e = o(t, !1);
return void 0 !== e && a.has(e, this._key);
};
t.prototype.get = function(t) {
var e = o(t, !1);
return void 0 !== e ? a.get(e, this._key) : void 0;
};
t.prototype.set = function(t, e) {
var r = o(t, !0);
r[this._key] = e;
return this;
};
t.prototype.delete = function(t) {
var e = o(t, !1);
return void 0 !== e && delete e[this._key];
};
t.prototype.clear = function() {
this._key = i();
};
return t;
}();
function i() {
var t;
do {
t = "@@WeakMap@@" + c();
} while (a.has(r, t));
r[t] = !0;
return t;
}
function o(t, r) {
if (!e.call(t, n)) {
if (!r) return;
Object.defineProperty(t, n, {
value: a.create()
});
}
return t[n];
}
function u(t, e) {
for (var r = 0; r < e; ++r) t[r] = 255 * Math.random() | 0;
return t;
}
function f(t) {
return "function" == typeof Uint8Array ? "undefined" != typeof crypto ? crypto.getRandomValues(new Uint8Array(t)) : "undefined" != typeof msCrypto ? msCrypto.getRandomValues(new Uint8Array(t)) : u(new Uint8Array(t), t) : u(new Array(t), t);
}
function c() {
var e = f(t);
e[6] = 79 & e[6] | 64;
e[8] = 191 & e[8] | 128;
for (var r = "", n = 0; n < t; ++n) {
var i = e[n];
4 !== n && 6 !== n && 8 !== n || (r += "-");
i < 16 && (r += "0");
r += i.toString(16).toLowerCase();
}
return r;
}
}() : WeakMap)();
t("decorate", function(t, e, r, n) {
if (O(r)) {
if (!K(t)) throw new TypeError();
if (!L(e)) throw new TypeError();
return l(t, e);
}
if (!K(t)) throw new TypeError();
if (!M(e)) throw new TypeError();
if (!M(n) && !O(n) && !j(n)) throw new TypeError();
j(n) && (n = void 0);
r = I(r);
return v(t, e, r, n);
});
t("metadata", function(t, e) {
return function(r, n) {
if (!M(r)) throw new TypeError();
if (!O(n) && !U(n)) throw new TypeError();
k(t, e, r, n);
};
});
t("defineMetadata", function(t, e, r, n) {
if (!M(r)) throw new TypeError();
O(n) || (n = I(n));
return k(t, e, r, n);
});
t("hasMetadata", function(t, e, r) {
if (!M(e)) throw new TypeError();
O(r) || (r = I(r));
return d(t, e, r);
});
t("hasOwnMetadata", function(t, e, r) {
if (!M(e)) throw new TypeError();
O(r) || (r = I(r));
return w(t, e, r);
});
t("getMetadata", function(t, e, r) {
if (!M(e)) throw new TypeError();
O(r) || (r = I(r));
return g(t, e, r);
});
t("getOwnMetadata", function(t, e, r) {
if (!M(e)) throw new TypeError();
O(r) || (r = I(r));
return b(t, e, r);
});
t("getMetadataKeys", function(t, e) {
if (!M(t)) throw new TypeError();
O(e) || (e = I(e));
return m(t, e);
});
t("getOwnMetadataKeys", function(t, e) {
if (!M(t)) throw new TypeError();
O(e) || (e = I(e));
return E(t, e);
});
t("deleteMetadata", function(t, e, r) {
if (!M(e)) throw new TypeError();
O(r) || (r = I(r));
var n = _(e, r, !1);
if (O(n)) return !1;
if (!n.delete(t)) return !1;
if (n.size > 0) return !0;
var i = y.get(e);
i.delete(r);
if (i.size > 0) return !0;
y.delete(e);
return !0;
});
function l(t, e) {
for (var r = t.length - 1; r >= 0; --r) {
var n = t[r], i = n(e);
if (!O(i) && !j(i)) {
if (!L(i)) throw new TypeError();
e = i;
}
}
return e;
}
function v(t, e, r, n) {
for (var i = t.length - 1; i >= 0; --i) {
var o = t[i], u = o(e, r, n);
if (!O(u) && !j(u)) {
if (!M(u)) throw new TypeError();
n = u;
}
}
return n;
}
function _(t, e, r) {
var n = y.get(t);
if (O(n)) {
if (!r) return;
n = new h();
y.set(t, n);
}
var i = n.get(e);
if (O(i)) {
if (!r) return;
i = new h();
n.set(e, i);
}
return i;
}
function d(t, e, r) {
var n = w(t, e, r);
if (n) return !0;
var i = Y(e);
return !j(i) && d(t, i, r);
}
function w(t, e, r) {
var n = _(e, r, !1);
return !O(n) && S(n.has(t));
}
function g(t, e, r) {
var n = w(t, e, r);
if (n) return b(t, e, r);
var i = Y(e);
return j(i) ? void 0 : g(t, i, r);
}
function b(t, e, r) {
var n = _(e, r, !1);
if (!O(n)) return n.get(t);
}
function k(t, e, r, n) {
var i = _(r, n, !0);
i.set(t, e);
}
function m(t, e) {
var r = E(t, e), n = Y(t);
if (null === n) return r;
var i = m(n, e);
if (i.length <= 0) return r;
if (r.length <= 0) return i;
for (var o = new p(), u = [], f = 0, a = r; f < a.length; f++) {
var c = a[f], s = o.has(c);
if (!s) {
o.add(c);
u.push(c);
}
}
for (var h = 0, y = i; h < y.length; h++) {
var c = y[h], s = o.has(c);
if (!s) {
o.add(c);
u.push(c);
}
}
return u;
}
function E(t, e) {
var r = [], n = _(t, e, !1);
if (O(n)) return r;
for (var i = n.keys(), o = F(i), u = 0; ;) {
var f = V(o);
if (!f) {
r.length = u;
return r;
}
var a = W(f);
try {
r[u] = a;
} catch (t) {
try {
D(o);
} finally {
throw t;
}
}
u++;
}
}
function T(t) {
if (null === t) return 1;
switch (typeof t) {
case "undefined":
return 0;

case "boolean":
return 2;

case "string":
return 3;

case "symbol":
return 4;

case "number":
return 5;

case "object":
return null === t ? 1 : 6;

default:
return 6;
}
}
function O(t) {
return void 0 === t;
}
function j(t) {
return null === t;
}
function x(t) {
return "symbol" == typeof t;
}
function M(t) {
return "object" == typeof t ? null !== t : "function" == typeof t;
}
function A(t, e) {
switch (T(t)) {
case 0:
case 1:
case 2:
case 3:
case 4:
case 5:
return t;
}
var r = 3 === e ? "string" : 5 === e ? "number" : "default", i = C(t, n);
if (void 0 !== i) {
var o = i.call(t, r);
if (M(o)) throw new TypeError();
return o;
}
return P(t, "default" === r ? "number" : r);
}
function P(t, e) {
if ("string" === e) {
var r = t.toString;
if (z(r)) {
var n = r.call(t);
if (!M(n)) return n;
}
var i = t.valueOf;
if (z(i)) {
var n = i.call(t);
if (!M(n)) return n;
}
} else {
var i = t.valueOf;
if (z(i)) {
var n = i.call(t);
if (!M(n)) return n;
}
var o = t.toString;
if (z(o)) {
var n = o.call(t);
if (!M(n)) return n;
}
}
throw new TypeError();
}
function S(t) {
return !!t;
}
function R(t) {
return "" + t;
}
function I(t) {
var e = A(t, 3);
return x(e) ? e : R(e);
}
function K(t) {
return Array.isArray ? Array.isArray(t) : t instanceof Object ? t instanceof Array : "[object Array]" === Object.prototype.toString.call(t);
}
function z(t) {
return "function" == typeof t;
}
function L(t) {
return "function" == typeof t;
}
function U(t) {
switch (T(t)) {
case 3:
case 4:
return !0;

default:
return !1;
}
}
function C(t, e) {
var r = t[e];
if (void 0 !== r && null !== r) {
if (!z(r)) throw new TypeError();
return r;
}
}
function F(t) {
var e = C(t, i);
if (!z(e)) throw new TypeError();
var r = e.call(t);
if (!M(r)) throw new TypeError();
return r;
}
function W(t) {
return t.value;
}
function V(t) {
var e = t.next();
return !e.done && e;
}
function D(t) {
var e = t.return;
e && e.call(t);
}
function Y(t) {
var e = Object.getPrototypeOf(t);
if ("function" != typeof t || t === c) return e;
if (e !== c) return e;
var r = t.prototype, n = r && Object.getPrototypeOf(r);
if (null == n || n === Object.prototype) return e;
var i = n.constructor;
return "function" != typeof i ? e : i === t ? e : i;
}
function q(t) {
t.__ = void 0;
delete t.__;
return t;
}
})(n);
function i(t, e) {
return function(r, n) {
"function" != typeof t[r] && Object.defineProperty(t, r, {
configurable: !0,
writable: !0,
value: n
});
e && e(r, n);
};
}
})();
})(Reflect || (Reflect = {}));