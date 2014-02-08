var os = require("os");
var kuwintools = require("./kuwintools");

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

Kuwind.prototype.login = function(opt, cb){
	kuwintools.login(opt.username, opt.password, opt.zone, function(data){
		cb(!data.success, data);
	});
};

module.exports = new Kuwind();