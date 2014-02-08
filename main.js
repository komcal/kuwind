var os = require("os");

var Kuwind = function(){};

Kuwind.prototype.isInKu = function(){
	var self = this;

	var ifaces = os.networkInterfaces();
	return Object.keys().some(function(iface){
		return ifaces[iface].some(function(ip){
			return self.isKuIp(ip.address);
		});
	});
};

Kuwind.prototype.isKuIp = function(ip){
	return ip.indexOf("158.108.") === 0;
};

module.exports = new Kuwind();