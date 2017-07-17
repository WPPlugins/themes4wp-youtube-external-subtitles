var parser = function() {
    var r = {};
    r.fromSrt = function(r, e) {
        var n = e ? !0 : !1;
        r = r.replace(/\r/g, "");
        var i = /(\d+)\n(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})/g;
        r = r.split(i), r.shift();
        for (var a = [], d = 0; d < r.length; d += 4) a.push({
            id: r[d].trim(),
            startTime: n ? t(r[d + 1].trim()) : r[d + 1].trim(),
            endTime: n ? t(r[d + 2].trim()) : r[d + 2].trim(),
            text: r[d + 3].trim()
        });
        return a
    }, r.toSrt = function(r) {
        if (!r instanceof Array) return "";
        for (var t = "", n = 0; n < r.length; n++) {
            var i = r[n];
            isNaN(i.startTime) || isNaN(i.endTime) || (i.startTime = e(parseInt(i.startTime, 10)), i.endTime = e(parseInt(i.endTime, 10))), t += i.id + "\r\n", t += i.startTime + " --> " + i.endTime + "\r\n", t += i.text.replace("\n", "\r\n") + "\r\n\r\n"
        }
        return t
    };
    var t = function(r) {
            var t = /(\d+):(\d{2}):(\d{2}),(\d{3})/,
                e = t.exec(r);
            if (null === e) return 0;
            for (var n = 1; 5 > n; n++) e[n] = parseInt(e[n], 10), isNaN(e[n]) && (e[n] = 0);
            return 36e5 * e[1] + 6e4 * e[2] + 1e3 * e[3] + e[4]
        },
        e = function(r) {
            var t = [36e5, 6e4, 1e3],
                e = [];
            for (var n in t) {
                var i = (r / t[n] >> 0).toString();
                i.length < 2 && (i = "0" + i), r %= t[n], e.push(i)
            }
            var a = r.toString();
            if (a.length < 3)
                for (n = 0; n <= 3 - a.length; n++) a = "0" + a;
            return e.join(":") + "," + a
        };
    return r
}();
"object" == typeof exports && (module.exports = parser);