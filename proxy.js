var SocksClient = require('socks-client')

var options = {
    proxy: {
        ipaddress: "localhost",
        port: 1080,
        type: 5,
        command: "associate" // Since we are using associate, we must specify it here.
    },
    target: {
        // When using associate, either set the ip and port to 0.0.0.0:0 or the expected source of incoming udp packets.
        // Note: Some SOCKS servers MAY block associate requests with 0.0.0.0:0 endpoints.
        // Note: ipv4, ipv6, and hostnames are supported here.
        host: "62.210.222.197",
        port: 442
    }
};


SocksClient.createConnection(options, function(err, socket, info) {
    if (err)
        console.log(err);
    else {
        // Associate request has completed.
        // info object contains the remote ip and udp port to send UDP packets to.
        console.log(info);
        // { port: 42803, host: '202.101.228.108' }

        var udp = new dgram.Socket('udp4');

        // In this example we are going to send "Hello" to 1.2.3.4:2323 through the SOCKS proxy.

        var pack = SocksClient.createUDPFrame({ host: "1.2.3.4", port: 2323}, new Buffer("hello"));

        // Send Packet to Proxy UDP endpoint given in the info object.
        udp.send(pack, 0, pack.length, info.port, info.host);
    }
});
