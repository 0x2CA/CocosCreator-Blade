(function(e) {
"use strict";
var r, t = 20, n = 1, i = 1e6, s = -7, o = 21, f = "[big.js] ", c = f + "Invalid ", u = c + "decimal places", h = c + "rounding mode", l = {}, a = void 0, g = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
function p(e, r) {
var t, n, i;
if (0 === r && 1 / r < 0) r = "-0"; else if (!g.test(r += "")) throw Error(c + "number");
e.s = "-" == r.charAt(0) ? (r = r.slice(1), -1) : 1;
(t = r.indexOf(".")) > -1 && (r = r.replace(".", ""));
if ((n = r.search(/e/i)) > 0) {
t < 0 && (t = n);
t += +r.slice(n + 1);
r = r.substring(0, n);
} else t < 0 && (t = r.length);
i = r.length;
for (n = 0; n < i && "0" == r.charAt(n); ) ++n;
if (n == i) e.c = [ e.e = 0 ]; else {
for (;i > 0 && "0" == r.charAt(--i); ) ;
e.e = t - n - 1;
e.c = [];
for (t = 0; n <= i; ) e.c[t++] = +r.charAt(n++);
}
return e;
}
function w(e, r, t, n) {
var i = e.c, s = e.e + r + 1;
if (s < i.length) {
if (1 === t) n = i[s] >= 5; else if (2 === t) n = i[s] > 5 || 5 == i[s] && (n || s < 0 || i[s + 1] !== a || 1 & i[s - 1]); else if (3 === t) n = n || !!i[0]; else {
n = !1;
if (0 !== t) throw Error(h);
}
if (s < 1) {
i.length = 1;
if (n) {
e.e = -r;
i[0] = 1;
} else i[0] = e.e = 0;
} else {
i.length = s--;
if (n) for (;++i[s] > 9; ) {
i[s] = 0;
if (!s--) {
++e.e;
i.unshift(1);
}
}
for (s = i.length; !i[--s]; ) i.pop();
}
} else if (t < 0 || t > 3 || t !== ~~t) throw Error(h);
return e;
}
function d(e, r, t, n) {
var s, o, f = e.constructor, h = !e.c[0];
if (t !== a) {
if (t !== ~~t || t < (3 == r) || t > i) throw Error(3 == r ? c + "precision" : u);
t = n - (e = new f(e)).e;
e.c.length > ++n && w(e, t, f.RM);
2 == r && (n = e.e + t + 1);
for (;e.c.length < n; ) e.c.push(0);
}
s = e.e;
t = (o = e.c.join("")).length;
if (2 != r && (1 == r || 3 == r && n <= s || s <= f.NE || s >= f.PE)) o = o.charAt(0) + (t > 1 ? "." + o.slice(1) : "") + (s < 0 ? "e" : "e+") + s; else if (s < 0) {
for (;++s; ) o = "0" + o;
o = "0." + o;
} else if (s > 0) if (++s > t) for (s -= t; s--; ) o += "0"; else s < t && (o = o.slice(0, s) + "." + o.slice(s)); else t > 1 && (o = o.charAt(0) + "." + o.slice(1));
return e.s < 0 && (!h || 4 == r) ? "-" + o : o;
}
l.abs = function() {
var e = new this.constructor(this);
e.s = 1;
return e;
};
l.cmp = function(e) {
var r, t = this, n = t.c, i = (e = new t.constructor(e)).c, s = t.s, o = e.s, f = t.e, c = e.e;
if (!n[0] || !i[0]) return n[0] ? s : i[0] ? -o : 0;
if (s != o) return s;
r = s < 0;
if (f != c) return f > c ^ r ? 1 : -1;
o = (f = n.length) < (c = i.length) ? f : c;
for (s = -1; ++s < o; ) if (n[s] != i[s]) return n[s] > i[s] ^ r ? 1 : -1;
return f == c ? 0 : f > c ^ r ? 1 : -1;
};
l.div = function(e) {
var r = this, t = r.constructor, n = r.c, s = (e = new t(e)).c, o = r.s == e.s ? 1 : -1, f = t.DP;
if (f !== ~~f || f < 0 || f > i) throw Error(u);
if (!s[0]) throw Error("[big.js] Division by zero");
if (!n[0]) return new t(0 * o);
var c, h, l, g, p, d = s.slice(), v = c = s.length, m = n.length, E = n.slice(0, c), b = E.length, M = e, P = M.c = [], D = 0, x = f + (M.e = r.e - e.e) + 1;
M.s = o;
o = x < 0 ? 0 : x;
d.unshift(0);
for (;b++ < c; ) E.push(0);
do {
for (l = 0; l < 10; l++) {
if (c != (b = E.length)) g = c > b ? 1 : -1; else for (p = -1, g = 0; ++p < c; ) if (s[p] != E[p]) {
g = s[p] > E[p] ? 1 : -1;
break;
}
if (!(g < 0)) break;
for (h = b == c ? s : d; b; ) {
if (E[--b] < h[b]) {
p = b;
for (;p && !E[--p]; ) E[p] = 9;
--E[p];
E[b] += 10;
}
E[b] -= h[b];
}
for (;!E[0]; ) E.shift();
}
P[D++] = g ? l : ++l;
E[0] && g ? E[b] = n[v] || 0 : E = [ n[v] ];
} while ((v++ < m || E[0] !== a) && o--);
if (!P[0] && 1 != D) {
P.shift();
M.e--;
}
D > x && w(M, f, t.RM, E[0] !== a);
return M;
};
l.eq = function(e) {
return !this.cmp(e);
};
l.gt = function(e) {
return this.cmp(e) > 0;
};
l.gte = function(e) {
return this.cmp(e) > -1;
};
l.lt = function(e) {
return this.cmp(e) < 0;
};
l.lte = function(e) {
return this.cmp(e) < 1;
};
l.minus = l.sub = function(e) {
var r, t, n, i, s = this, o = s.constructor, f = s.s, c = (e = new o(e)).s;
if (f != c) {
e.s = -c;
return s.plus(e);
}
var u = s.c.slice(), h = s.e, l = e.c, a = e.e;
if (!u[0] || !l[0]) return l[0] ? (e.s = -c, e) : new o(u[0] ? s : 0);
if (f = h - a) {
if (i = f < 0) {
f = -f;
n = u;
} else {
a = h;
n = l;
}
n.reverse();
for (c = f; c--; ) n.push(0);
n.reverse();
} else {
t = ((i = u.length < l.length) ? u : l).length;
for (f = c = 0; c < t; c++) if (u[c] != l[c]) {
i = u[c] < l[c];
break;
}
}
if (i) {
n = u;
u = l;
l = n;
e.s = -e.s;
}
if ((c = (t = l.length) - (r = u.length)) > 0) for (;c--; ) u[r++] = 0;
for (c = r; t > f; ) {
if (u[--t] < l[t]) {
for (r = t; r && !u[--r]; ) u[r] = 9;
--u[r];
u[t] += 10;
}
u[t] -= l[t];
}
for (;0 === u[--c]; ) u.pop();
for (;0 === u[0]; ) {
u.shift();
--a;
}
if (!u[0]) {
e.s = 1;
u = [ a = 0 ];
}
e.c = u;
e.e = a;
return e;
};
l.mod = function(e) {
var r, t = this, n = t.constructor, i = t.s, s = (e = new n(e)).s;
if (!e.c[0]) throw Error("[big.js] Division by zero");
t.s = e.s = 1;
r = 1 == e.cmp(t);
t.s = i;
e.s = s;
if (r) return new n(t);
i = n.DP;
s = n.RM;
n.DP = n.RM = 0;
t = t.div(e);
n.DP = i;
n.RM = s;
return this.minus(t.times(e));
};
l.plus = l.add = function(e) {
var r, t = this, n = t.constructor, i = t.s, s = (e = new n(e)).s;
if (i != s) {
e.s = -s;
return t.minus(e);
}
var o = t.e, f = t.c, c = e.e, u = e.c;
if (!f[0] || !u[0]) return u[0] ? e : new n(f[0] ? t : 0 * i);
f = f.slice();
if (i = o - c) {
if (i > 0) {
c = o;
r = u;
} else {
i = -i;
r = f;
}
r.reverse();
for (;i--; ) r.push(0);
r.reverse();
}
if (f.length - u.length < 0) {
r = u;
u = f;
f = r;
}
i = u.length;
for (s = 0; i; f[i] %= 10) s = (f[--i] = f[i] + u[i] + s) / 10 | 0;
if (s) {
f.unshift(s);
++c;
}
for (i = f.length; 0 === f[--i]; ) f.pop();
e.c = f;
e.e = c;
return e;
};
l.pow = function(e) {
var r = this, t = new r.constructor(1), n = t, i = e < 0;
if (e !== ~~e || e < -1e6 || e > 1e6) throw Error(c + "exponent");
i && (e = -e);
for (;;) {
1 & e && (n = n.times(r));
if (!(e >>= 1)) break;
r = r.times(r);
}
return i ? t.div(n) : n;
};
l.round = function(e, r) {
var t = this.constructor;
if (e === a) e = 0; else if (e !== ~~e || e < -i || e > i) throw Error(u);
return w(new t(this), e, r === a ? t.RM : r);
};
l.sqrt = function() {
var e, r, t, n = this, i = n.constructor, s = n.s, o = n.e, c = new i(.5);
if (!n.c[0]) return new i(n);
if (s < 0) throw Error(f + "No square root");
if (0 === (s = Math.sqrt(n + "")) || s === 1 / 0) {
(r = n.c.join("")).length + o & 1 || (r += "0");
s = Math.sqrt(r);
o = ((o + 1) / 2 | 0) - (o < 0 || 1 & o);
e = new i((s == 1 / 0 ? "1e" : (s = s.toExponential()).slice(0, s.indexOf("e") + 1)) + o);
} else e = new i(s);
o = e.e + (i.DP += 4);
do {
t = e;
e = c.times(t.plus(n.div(t)));
} while (t.c.slice(0, o).join("") !== e.c.slice(0, o).join(""));
return w(e, i.DP -= 4, i.RM);
};
l.times = l.mul = function(e) {
var r, t = this, n = t.constructor, i = t.c, s = (e = new n(e)).c, o = i.length, f = s.length, c = t.e, u = e.e;
e.s = t.s == e.s ? 1 : -1;
if (!i[0] || !s[0]) return new n(0 * e.s);
e.e = c + u;
if (o < f) {
r = i;
i = s;
s = r;
u = o;
o = f;
f = u;
}
for (r = new Array(u = o + f); u--; ) r[u] = 0;
for (c = f; c--; ) {
f = 0;
for (u = o + c; u > c; ) {
f = r[u] + s[c] * i[u - c - 1] + f;
r[u--] = f % 10;
f = f / 10 | 0;
}
r[u] = (r[u] + f) % 10;
}
f ? ++e.e : r.shift();
for (c = r.length; !r[--c]; ) r.pop();
e.c = r;
return e;
};
l.toExponential = function(e) {
return d(this, 1, e, e);
};
l.toFixed = function(e) {
return d(this, 2, e, this.e + e);
};
l.toPrecision = function(e) {
return d(this, 3, e, e - 1);
};
l.toString = function() {
return d(this);
};
l.valueOf = l.toJSON = function() {
return d(this, 4);
};
(r = function e() {
function r(t) {
var n = this;
if (!(n instanceof r)) return t === a ? e() : new r(t);
if (t instanceof r) {
n.s = t.s;
n.e = t.e;
n.c = t.c.slice();
} else p(n, t);
n.constructor = r;
}
r.prototype = l;
r.DP = t;
r.RM = n;
r.NE = s;
r.PE = o;
r.version = "5.2.2";
return r;
}()).default = r.Big = r;
"function" == typeof define && define.amd ? define(function() {
return r;
}) : "undefined" != typeof module && module.exports ? module.exports = r : e.Big = r;
})(this);