(function (t) {
  function e(e) {
    for (
      var n, o, i = e[0], l = e[1], c = e[2], f = 0, p = [];
      f < i.length;
      f++
    )
      (o = i[f]),
        Object.prototype.hasOwnProperty.call(r, o) && r[o] && p.push(r[o][0]),
        (r[o] = 0);
    for (n in l) Object.prototype.hasOwnProperty.call(l, n) && (t[n] = l[n]);
    u && u(e);
    while (p.length) p.shift()();
    return s.push.apply(s, c || []), a();
  }
  function a() {
    for (var t, e = 0; e < s.length; e++) {
      for (var a = s[e], n = !0, i = 1; i < a.length; i++) {
        var l = a[i];
        0 !== r[l] && (n = !1);
      }
      n && (s.splice(e--, 1), (t = o((o.s = a[0]))));
    }
    return t;
  }
  var n = {},
    r = { "new-app": 0 },
    s = [];
  function o(e) {
    if (n[e]) return n[e].exports;
    var a = (n[e] = { i: e, l: !1, exports: {} });
    return t[e].call(a.exports, a, a.exports, o), (a.l = !0), a.exports;
  }
  (o.m = t),
    (o.c = n),
    (o.d = function (t, e, a) {
      o.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: a });
    }),
    (o.r = function (t) {
      "undefined" !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (o.t = function (t, e) {
      if ((1 & e && (t = o(t)), 8 & e)) return t;
      if (4 & e && "object" === typeof t && t && t.__esModule) return t;
      var a = Object.create(null);
      if (
        (o.r(a),
        Object.defineProperty(a, "default", { enumerable: !0, value: t }),
        2 & e && "string" != typeof t)
      )
        for (var n in t)
          o.d(
            a,
            n,
            function (e) {
              return t[e];
            }.bind(null, n)
          );
      return a;
    }),
    (o.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t["default"];
            }
          : function () {
              return t;
            };
      return o.d(e, "a", e), e;
    }),
    (o.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (o.p = "");
  var i = (window["webpackJsonp"] = window["webpackJsonp"] || []),
    l = i.push.bind(i);
  (i.push = e), (i = i.slice());
  for (var c = 0; c < i.length; c++) e(i[c]);
  var u = l;
  s.push([0, "chunk-vendors"]), a();
})({
  0: function (t, e, a) {
    t.exports = a("56d7");
  },
  "56d7": function (t, e, a) {
    "use strict";
    a.r(e);
    a("e260"), a("e6cf"), a("cca6"), a("a79d");
    var n = a("2b0e"),
      r = function () {
        var t = this,
          e = t.$createElement,
          a = t._self._c || e;
        return a(
          "v-app",
          [
            a(
              "v-app-bar",
              { attrs: { app: "", color: "primary", dark: "" } },
              [
                a(
                  "div",
                  { staticClass: "d-flex align-center" },
                  [
                    a("v-img", {
                      staticClass: "shrink mr-2",
                      attrs: {
                        alt: "Vuetify Logo",
                        contain: "",
                        src: "https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png",
                        transition: "scale-transition",
                        width: "40"
                      }
                    }),
                    a("v-img", {
                      staticClass: "shrink mt-1 hidden-sm-and-down",
                      attrs: {
                        alt: "Vuetify Name",
                        contain: "",
                        "min-width": "100",
                        src: "https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png",
                        width: "100"
                      }
                    })
                  ],
                  1
                ),
                a("v-spacer"),
                a(
                  "v-btn",
                  {
                    attrs: {
                      href: "https://github.com/vuetifyjs/vuetify/releases/latest",
                      target: "_blank",
                      text: ""
                    }
                  },
                  [
                    a("span", { staticClass: "mr-2" }, [
                      t._v("Latest Release")
                    ]),
                    a("v-icon", [t._v("mdi-open-in-new")])
                  ],
                  1
                )
              ],
              1
            ),
            a("v-main", [a("HelloWorld")], 1)
          ],
          1
        );
      },
      s = [],
      o = function () {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n(
          "v-container",
          [
            n(
              "v-row",
              { staticClass: "text-center" },
              [
                n(
                  "v-col",
                  { attrs: { cols: "12" } },
                  [
                    n("v-img", {
                      staticClass: "my-3",
                      attrs: { src: a("9b19"), contain: "", height: "200" }
                    })
                  ],
                  1
                ),
                n("v-col", { staticClass: "mb-4" }, [
                  n("h1", { staticClass: "display-2 font-weight-bold mb-3" }, [
                    t._v(" Welcome to Vuetify ")
                  ]),
                  n("p", { staticClass: "subheading font-weight-regular" }, [
                    t._v(
                      " For help and collaboration with other Vuetify developers, "
                    ),
                    n("br"),
                    t._v("please join our online "),
                    n(
                      "a",
                      {
                        attrs: {
                          href: "https://community.vuetifyjs.com",
                          target: "_blank"
                        }
                      },
                      [t._v("Discord Community")]
                    )
                  ])
                ]),
                n(
                  "v-col",
                  { staticClass: "mb-5", attrs: { cols: "12" } },
                  [
                    n("h2", { staticClass: "headline font-weight-bold mb-3" }, [
                      t._v(" What's next? ")
                    ]),
                    n(
                      "v-row",
                      { attrs: { justify: "center" } },
                      t._l(t.whatsNext, function (e, a) {
                        return n(
                          "a",
                          {
                            key: a,
                            staticClass: "subheading mx-3",
                            attrs: { href: e.href, target: "_blank" }
                          },
                          [t._v(" " + t._s(e.text) + " ")]
                        );
                      }),
                      0
                    )
                  ],
                  1
                ),
                n(
                  "v-col",
                  { staticClass: "mb-5", attrs: { cols: "12" } },
                  [
                    n("h2", { staticClass: "headline font-weight-bold mb-3" }, [
                      t._v(" Important Links ")
                    ]),
                    n(
                      "v-row",
                      { attrs: { justify: "center" } },
                      t._l(t.importantLinks, function (e, a) {
                        return n(
                          "a",
                          {
                            key: a,
                            staticClass: "subheading mx-3",
                            attrs: { href: e.href, target: "_blank" }
                          },
                          [t._v(" " + t._s(e.text) + " ")]
                        );
                      }),
                      0
                    )
                  ],
                  1
                ),
                n(
                  "v-col",
                  { staticClass: "mb-5", attrs: { cols: "12" } },
                  [
                    n("h2", { staticClass: "headline font-weight-bold mb-3" }, [
                      t._v(" Ecosystem ")
                    ]),
                    n(
                      "v-row",
                      { attrs: { justify: "center" } },
                      t._l(t.ecosystem, function (e, a) {
                        return n(
                          "a",
                          {
                            key: a,
                            staticClass: "subheading mx-3",
                            attrs: { href: e.href, target: "_blank" }
                          },
                          [t._v(" " + t._s(e.text) + " ")]
                        );
                      }),
                      0
                    )
                  ],
                  1
                )
              ],
              1
            )
          ],
          1
        );
      },
      i = [],
      l = {
        name: "HelloWorld",
        data: function () {
          return {
            ecosystem: [
              {
                text: "vuetify-loader",
                href: "https://github.com/vuetifyjs/vuetify-loader"
              },
              { text: "github", href: "https://github.com/vuetifyjs/vuetify" },
              {
                text: "awesome-vuetify",
                href: "https://github.com/vuetifyjs/awesome-vuetify"
              }
            ],
            importantLinks: [
              { text: "Documentation", href: "https://vuetifyjs.com" },
              { text: "Chat", href: "https://community.vuetifyjs.com" },
              {
                text: "Made with Vuetify",
                href: "https://madewithvuejs.com/vuetify"
              },
              { text: "Twitter", href: "https://twitter.com/vuetifyjs" },
              { text: "Articles", href: "https://medium.com/vuetify" }
            ],
            whatsNext: [
              {
                text: "Explore components",
                href: "https://vuetifyjs.com/components/api-explorer"
              },
              {
                text: "Select a layout",
                href: "https://vuetifyjs.com/getting-started/pre-made-layouts"
              },
              {
                text: "Frequently Asked Questions",
                href: "https://vuetifyjs.com/getting-started/frequently-asked-questions"
              }
            ]
          };
        }
      },
      c = l,
      u = a("2877"),
      f = a("6544"),
      p = a.n(f),
      h = a("62ad"),
      d = a("a523"),
      m = a("adda"),
      v = a("0fd9"),
      y = Object(u["a"])(c, o, i, !1, null, null, null),
      g = y.exports;
    p()(y, { VCol: h["a"], VContainer: d["a"], VImg: m["a"], VRow: v["a"] });
    var b = {
        name: "App",
        components: { HelloWorld: g },
        data: function () {
          return {};
        }
      },
      w = b,
      x = a("7496"),
      _ = a("40dc"),
      j = a("8336"),
      C = a("132d"),
      k = a("f6c4"),
      V = a("2fa4"),
      O = Object(u["a"])(w, r, s, !1, null, null, null),
      S = O.exports;
    p()(O, {
      VApp: x["a"],
      VAppBar: _["a"],
      VBtn: j["a"],
      VIcon: C["a"],
      VImg: m["a"],
      VMain: k["a"],
      VSpacer: V["a"]
    });
    var A = function () {
        var t = this,
          e = t.$createElement,
          a = t._self._c || e;
        return a(
          "v-app",
          { staticClass: "ma-0 pa-0", attrs: { "hide-details": "" } },
          [
            a("p", [t._v("This is my Vue app!")]),
            a("v-sheet", {
              attrs: {
                color: t.color,
                elevation: "1",
                height: "100",
                width: "100"
              }
            })
          ],
          1
        );
      },
      E = [],
      P = {
        data: function () {
          return { color: "#123456" };
        },
        mounted: function () {
          this.$http.post("GIM/item-lookup/", { search: "papa" });
        }
      },
      L = P,
      M = a("8dd9"),
      N = Object(u["a"])(L, A, E, !1, null, null, null),
      T = N.exports;
    p()(N, { VApp: x["a"], VSheet: M["a"] });
    var $ = a("f309");
    n["a"].use($["a"]);
    var I = new $["a"]({}),
      W = a("bc3a"),
      H = a.n(W);
    function R(t, e) {
      document.getElementById(e) &&
        new n["a"]({
          vuetify: I,
          render: function (e) {
            return e(t);
          }
        }).$mount("#".concat(e));
    }
    (n["a"].config.productionTip = !1),
      (H.a.defaults.xsrfCookieName = "csrftoken"),
      (H.a.defaults.xsrfHeaderName = "X-CSRFTOKEN"),
      (n["a"].prototype.$http = H.a.create({
        baseURL: "http://localhost:8000/"
      })),
      R(S, "app"),
      R(T, "new-app");
  },
  "9b19": function (t, e, a) {
    t.exports = a.p + "img/logo.svg";
  }
});
