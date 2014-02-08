/**
 * KUWINTools
 * Originally from Chrome Extension
 *
 * 
 */
"use strict";

var request = require("request");

var KUWINTools = {};
KUWINTools.utils = {};

KUWINTools.utils.xhr = function(type, url, data, cb){
	request({
		"url": url,
		"form": data,
		"method": type,
		"headers": {
			"User-Agent": ""
		}
	}, function (error, response, body) {
		if(!cb){
			return;
		}
		cb({
			"success": !error,
			"resp": body,
			"status": response ? response.statusCode : null
		});
	});
};
KUWINTools.utils.get = function(url, cb){
	return KUWINTools.utils.xhr("GET", url, null, cb);
};
KUWINTools.utils.post = function(url, postdata, cb){
	return KUWINTools.utils.xhr("POST", url, postdata, cb);
};

// Don't change these
KUWINTools.endpoint = "https://login!.ku.ac.th/mobile.php";
KUWINTools.zones = ["bkn", "kps", "src", "csc", "Guest"];

KUWINTools.utils.get_server = function(){
	// min = 1, max = 12
	return Math.floor(Math.random() * 12)+1;
};
KUWINTools.get_endpoint = function(){
	return KUWINTools.endpoint.replace("!", KUWINTools.utils.get_server());
};
KUWINTools.login = function(user, pass, zone, cb){
	if(typeof zone != "number"){
		zone = KUWINTools.zones.indexOf(zone);
		if(zone == -1){
			return cb({
				"success": false,
				"message": "Invalid zone. Valid zones are: "+KUWINTools.zones.join(", ")
			});
		}
	}
	KUWINTools.utils.post(KUWINTools.get_endpoint() + "?action=login", {
		"username": user,
		"password": pass,
		"v": 4,
		"trackme": "n",
		"zone": zone
	}, function(resp){
		if(!resp.success){
			return cb({
				"success": false,
				"message": "HTTP Error: "+resp.status+" "+resp.resp
			});
		}
		// parse it
		resp = resp.resp.split("\n");
		if(resp[0] !== "OK"){
			return cb({
				"success": false,
				"message": resp[0]
			});
		}
		var user = resp[3];
		var sessions = resp.slice(4);
		var outSessions = [];
		sessions.forEach(function(sess){
			var out = {};
			sess = sess.split("\t");
			if(sess.length != 3){
				return;
			}
			out.ip = sess[0];
			out.time = new Date(sess[1].replace("ICT", "+0700"));
			out.idle = sess[2];
			outSessions.push(out);
		});
		cb({
			"success": true,
			"user": user,
			"sessions": outSessions
		});
	});
};

if(module){
	module.exports = KUWINTools;
}