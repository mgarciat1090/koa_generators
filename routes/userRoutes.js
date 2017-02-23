var parse = require("co-body");

var monk = require("monk");
var wrap = require("co-monk");
var db = monk("localhost/dyn_koa");
var users = wrap(db.get("users"));

module.exports.saveUser = function *saveUser(){
	//parse the user from the sent request
	var userFromRequest = yield parse(this);

	if(!userFromRequest.name){
		this.throw(400,"name required");
	}

	try{
		var user = yield users.insert(userFromRequest);
	}
	catch(e){
		this.body = "An error occurred: " + e;
		this.status = 401;
		return;
	}
	//store it in db
	this.body = user;
	this.set("Location","/user/" + user._id);
	this.status = 201;
	//return status and resource;

};

module.exports.getUser = function *getUser(id){
	var user = yield users.findById(id);
	this.body = user;
	this.status = 200;
};


module.exports.updateUser = function *updateUser(id){
	var userFromRequest = yield parse(this);
	yield users.updateById(id,userFromRequest);
	this.set("Location","/user/" + id);
	this.status = 204;
}

module.exports.deleteUser = function *deleteUser(id){
	yield users.remove({ _id : id });
	console.log(id);
	this.status = 200;
}



module.exports.users = users;
