
const fs = require('fs'),
    http = require('http')

const badrq = 'HTTP/1.1 400 Bad Request\r\n\r\n'

const pp = "./www"
const mimeType = {
    'js': 'text/javascript',
    'css': 'text/css',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'wav': 'audio/wav',
    'mp3': 'audio/mpeg',
    'svg': 'image/svg+xml',
    'pdf': 'application/pdf',
    'doc': 'application/msword',
    'eot': 'appliaction/vnd.ms-fontobject',
    'ttf': 'aplication/font-sfnt',
    'woff': 'aplication/font-sfnt',
    'woff2': 'aplication/font-sfnt',
    'json': 'application/json',
    'ico': 'image/x-icon',
    'pbf': 'application/x-protobuf'
};

var httpsServer = http.createServer(serverfsf);
httpsServer.listen(8090);


function serverfsf(req, res) {
    var p404 = fs.readFileSync(pp + "/404.html");
    var pmain = fs.readFileSync(pp + "/index.html");
    if (req.method == "GET" && typeof req.url != "undefined") {
        var pt = req.url.substring(1);
        var ind = pt.indexOf("/")
        if (ind != -1)
            pt = pt.substring(0, ind)
        if (pt == "" ||
            pt == "chat" ||
            pt == "map" ||
            pt == "profile" ||
            pt == "mall" ||
            pt == "store") {
            res.setHeader('Content-type', 'text/html');
            res.end(pmain);
        } else {
            pt = req.url;
            ind = req.url.indexOf("?")
            if (ind != -1)
                pt = pt.substring(0, ind)
            ind = mimeType[pt.substring(pt.lastIndexOf('.') + 1).toLowerCase()];
            if (typeof ind != "undefined" && fs.existsSync(pp + pt)) {
                fs.readFile(pp + pt, function (err, html) {
                    if (err) {
                        res.setHeader('Content-type', 'text/html');
                        res.statusCode = 404;
                        res.end(p404);
                        return;
                    }
                    res.setHeader('Content-type', ind);
                    res.end(html);
                });
            } else if (pt[1] == "t") {
                res.setHeader('Content-type', 'image/svg+xml');
                res.end(ppa);
            } else {
                res.setHeader('Content-type', 'text/html');
                res.statusCode = 404;
                res.end(p404);
            }
        }
    }
}

dvdvdv