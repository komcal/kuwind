#!/usr/bin/env node

var kuwind = require("./kuwind");
var kuwintools = require("./kuwintools");

if(process.argv.length == 5){
	kuwind.login({
		username: process.argv[2],
		password: process.argv[3],
		zone: process.argv[4]
	}, function(error, data){
		if(error){
			console.log("Cannot login: "+data.message);
			process.exit(1);
		}else{
			console.log("Logged in as "+data.user);
		}
	});
}else{
	console.log("Usage: "+process.argv[1]+" user pass zone");
	console.log("zone is one of "+kuwintools.zones.join(", "));
}