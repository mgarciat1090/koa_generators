var render = require("../lib/render.js");
var db = require("./../lib/db.js");

module.exports.showHome = function *(){
	var questionLists;
	try{
		questionLists =  yield db.questions.find({});
	}catch(e){
		console.log(e);
		questionLists = {};
	}
	//var questionLists = { a : true};
	this.body = yield render("home",{ questions: questionLists});
}
