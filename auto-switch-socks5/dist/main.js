"use strict";
exports.__esModule = true;
var net = require("net");
var service_1 = require("./service");
var server = net.createServer();
var lastUpstream = "";
server.on("connection", function (conn) {
    var client = null;
    var upstream = null;
    var clientData1 = null;
    var clientData2 = null;
    conn.on("error", function (e) {
        service_1.log.error("Router error (" + upstream + "): " + e.message);
        // updateDomain(upstream!, 1)
    });
    conn.on("data", function (data) {
        if (upstream === null) {
            upstream = "";
            clientData1 = data;
            conn.write(Buffer.from([5, 0]));
        }
        else if (upstream.length === 0) {
            upstream = data.slice(5, -2).toString();
            clientData2 = data;
            var backend_1 = service_1.select(upstream);
            var contentLength_1 = 0;
            client = net.createConnection(backend_1, function () {
                if (upstream !== lastUpstream) {
                    service_1.log.debug("Select proxy " + backend_1.host + ":" + backend_1.port + " for " + upstream);
                }
                lastUpstream = upstream;
                setTimeout(function () {
                    if (contentLength_1 <= 64) {
                        service_1.log.warn("Content length (" + upstream + "): " + contentLength_1);
                        service_1.updateDomain(upstream, 1 - backend_1._id);
                    }
                }, 5000);
            });
            client.on("connect", function () {
                client === null || client === void 0 ? void 0 : client.write(clientData1);
            });
            client.on("data", function (data) {
                if (clientData2 === null) {
                    contentLength_1 += data.length;
                    conn.write(data);
                }
                else {
                    client === null || client === void 0 ? void 0 : client.write(clientData2);
                    clientData2 = null;
                }
            });
            client.on("error", function (e) {
                service_1.log.error("Backend error (" + upstream + "): " + e.message);
            });
        }
        else {
            client === null || client === void 0 ? void 0 : client.write(data);
        }
    });
});
server.listen(1090, function () { return service_1.log.info("Listening on 1090"); });
