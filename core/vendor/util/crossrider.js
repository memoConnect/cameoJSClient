var CrossriderAPI = {
    fireExtensionEvent: function (el, evt, data) {
        data = data ? CrossriderAPI.JSON.stringify(data) : '__crossrider_empty';

        el.setAttribute('crossrider_data_store_temp', data);

        if (window.attachEvent) {
            el.setAttribute('fake_' + evt, Math.random());
        }
        if (document.createEvent) {
            var event = document.createEvent('Events');

            event.initEvent('fake_' + evt, true, false);
            el.dispatchEvent(event);
        }
    },

    bindExtensionEvent: function (el, evt, callback) {
        function parseData(el) {
            var data;

            if (el.getAttribute('crossrider_data_store_temp') != '__crossrider_empty') {
                data = CrossriderAPI.JSON.parse(el.getAttribute('crossrider_data_store_temp'));

                return data;
            }
            else return null;
        }

        if (window.attachEvent) {
            el.attachEvent('onpropertychange', function () {
                if (event.propertyName == 'fake_' + evt) callback.call(el, event, parseData(el));
            });
        }
        else {
            el.addEventListener('fake_' + evt, function (e) {
                callback.call(el, e, parseData(el));
            }, false);
        }
    },

    isAppInstalled: function (appId, callback) {
        CrossriderAPI.isAppReady(appId, callback);
    },

    isAppReady: function (appId, callback) {
        CrossriderAPI.ready(function () {
            var time = new Date().getTime(),
                body = document.getElementsByTagName('body')[0],
                ready = false,
                checkEvent = function () {
                    if (ready) {
                        callback(true);
                    }
                    else if (new Date().getTime() - time <= 4000) {
                        CrossriderAPI.fireExtensionEvent(body, '__CR_REQUEST_READY');

                        setTimeout(checkEvent, 100);
                    }
                    else {
                        callback(false);
                    }
                };

            CrossriderAPI.bindExtensionEvent(body, '__CR_RESPONSE_READY', function (e, data) {
                if (appId == data.appId) {
                    ready = true;
                }
            });

            setTimeout(checkEvent, 100);
        });
    }
};

//emulate jQuery dom ready
CrossriderAPI.ready = function (callback) {
    CrossriderAPI.readyCallback = callback;

    if (CrossriderAPI.DOMLoaded) CrossriderAPI.readyCallback();
};

CrossriderAPI.fireReady = function () {
    if (CrossriderAPI.DOMLoaded) return;

    // Make sure body exists, at least, in case IE gets a little overzealous.
    if (!document.body) {
        return setTimeout(CrossriderAPI.fireReady, 1);
    }

    CrossriderAPI.DOMLoaded = true;
    if (CrossriderAPI.readyCallback) CrossriderAPI.readyCallback();
};

CrossriderAPI.initReady = function () {
    // Catch cases where $(document).ready() is called after the
    // browser event has already occurred.
    if (document.readyState === "complete") {
        // Handle it asynchronously to allow scripts the opportunity to delay ready
        return setTimeout(CrossriderAPI.fireReady, 1);
    }

    // Mozilla, Opera and webkit nightlies currently support this event
    if (document.addEventListener) {
        // Use the handy event callback
        document.addEventListener("DOMContentLoaded", CrossriderAPI.DOMContentLoaded, false);

        // A fallback to window.onload, that will always work
        window.addEventListener("load", CrossriderAPI.fireReady, false);

        // If IE event model is used
    } else if (document.attachEvent) {
        // ensure firing before onload,
        // maybe late but safe also for iframes
        document.attachEvent("onreadystatechange", CrossriderAPI.DOMContentLoaded);

        // A fallback to window.onload, that will always work
        window.attachEvent("onload", CrossriderAPI.fireReady);
    }
};

if (document.addEventListener) {
    CrossriderAPI.DOMContentLoaded = function () {
        document.removeEventListener("DOMContentLoaded", CrossriderAPI.DOMContentLoaded, false);
        CrossriderAPI.fireReady();
    };

} else if (document.attachEvent) {
    CrossriderAPI.DOMContentLoaded = function () {
        // Make sure body exists, at least, in case IE gets a little overzealous
        if (document.readyState === "complete") {
            document.detachEvent("onreadystatechange", CrossriderAPI.DOMContentLoaded);
            CrossriderAPI.fireReady();
        }
    };
}

CrossriderAPI.initReady();

/* CrossriderAPI.JSON - parse & stringify */
CrossriderAPI.JSON = {};
(function () {
    function k(a) {
        return 10 > a ? "0" + a : a
    }

    function o(a) {
        p.lastIndex = 0;
        return p.test(a) ? '"' + a.replace(p, function (a) {
            var c = r[a];
            return "string" === typeof c ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + a + '"'
    }

    function m(a, i) {
        var c, d, h, n, g = e, f, b = i[a];
        b && "object" === typeof b && "function" === typeof b.to_Crossrider_JSON && (b = b.to_Crossrider_JSON(a));
        "function" === typeof j && (b = j.call(i, a, b));
        switch (typeof b) {
            case "string":
                return o(b);
            case "number":
                return isFinite(b) ? "" + b : "null";
            case "boolean":
            case "null":
                return "" + b;
            case "object":
                if (!b)return "null";
                e += l;
                f = [];
                if ("[object Array]" === Object.prototype.toString.apply(b)) {
                    n = b.length;
                    for (c = 0; c < n; c += 1)f[c] = m(c, b) || "null";
                    h = 0 === f.length ? "[]" : e ? "[\n" + e + f.join(",\n" + e) + "\n" + g + "]" : "[" + f.join(",") + "]";
                    e = g;
                    return h
                }
                if (j && "object" === typeof j) {
                    n = j.length;
                    for (c = 0; c < n; c += 1)d = j[c], "string" === typeof d && (h = m(d, b)) && f.push(o(d) + (e ? ": " : ":") + h)
                } else for (d in b)Object.hasOwnProperty.call(b, d) && (h = m(d, b)) && f.push(o(d) + (e ? ": " : ":") + h);
                h = 0 === f.length ? "{}" : e ? "{\n" + e + f.join(",\n" + e) + "\n" + g + "}" : "{" + f.join(",") + "}";
                e = g;
                return h
        }
    }

    if ("function" !== typeof Date.prototype.to_Crossrider_JSON)Date.prototype.to_Crossrider_JSON = function () {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + k(this.getUTCMonth() + 1) + "-" + k(this.getUTCDate()) + "T" + k(this.getUTCHours()) + ":" + k(this.getUTCMinutes()) + ":" + k(this.getUTCSeconds()) + "Z" : null
    }, String.prototype.to_Crossrider_JSON = Number.prototype.to_Crossrider_JSON = Boolean.prototype.to_Crossrider_JSON = function () {
        return this.valueOf()
    };
    var q = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, p = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, e, l, r = {
        "\u0008": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\u000c": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    }, j;
    if ("function" !== typeof CrossriderAPI.JSON.stringify)CrossriderAPI.JSON.stringify = function (a, i, c) {
        var d;
        l = e = "";
        if ("number" === typeof c)for (d = 0; d < c; d += 1)l += " "; else"string" === typeof c && (l = c);
        if ((j = i) && "function" !== typeof i && ("object" !== typeof i || "number" !== typeof i.length))throw Error("Crossrider_JSON.stringify");
        return m("", {"": a})
    };
    if ("function" !== typeof CrossriderAPI.JSON.parse)CrossriderAPI.JSON.parse = function (a, e) {
        function c(a, d) {
            var g, f, b = a[d];
            if (b && "object" === typeof b)for (g in b)Object.hasOwnProperty.call(b, g) && (f = c(b, g), void 0 !== f ? b[g] = f : delete b[g]);
            return e.call(a, d, b)
        }

        var d, a = "" + a;
        q.lastIndex = 0;
        q.test(a) && (a = a.replace(q, function (a) {
            return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }));
        if (/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))return d = eval("(" + a + ")"), "function" === typeof e ? c({"": d}, "") : d;
        throw new SyntaxError("Crossrider_JSON.parse");
    }
})();