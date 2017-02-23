var app = require("../app.js").app;
var server = require("../app.js").server;
var request = require("supertest");

var questions = require("../lib/db.js").questions;
var co = require("co");
var should = require("should");

var testHelpers = require("./helpers.js");

describe("The homepage",function(){

	beforeEach(function(done){
		testHelpers.removeAllDocs(done);
	});

	afterEach(function(done){
		testHelpers.removeAllDocs(done);
	})

	it("Displays nicely without errors",function(done){
		request(server)
		.get('/')
		.expect(200)
		.expect('Content-Type',/html/)
		.end(done);
	});

	it("lists allthe questions in the database",function(done){
		co(function *(){
			yield questions.insert({ title: "Question Q1"});
			yield questions.insert({ title: "Question Q2 " });

			request(server)
			.get('/')
			.expect(200)
			.expect(function(res){
				res.text.should.containEql("Question Q1");
				res.text.should.containEql("Question Q2");
			})
			.end(done);
		})
	})

})