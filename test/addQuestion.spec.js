var app = require("./../app.js").app;
var server = require("./../app.js").server;
var request = require("supertest");

var testHelpers = require("./helpers.js");

describe("Adding questions",function(){

	beforeEach(function(done){
		testHelpers.removeAllDocs(done);
	});

	afterEach(function(done){
		testHelpers.removeAllDocs(done);
	})

	var a_question_form = {
		questionTitle : "A question?",
		tagString : "tag1, tag2, tag3"
	};

	it("Has nice page to add questions",function(done){
		request(server)
		.get("/question")
		.expect(200)
		.expect("Content-Type",/html/)
		.end(done);
	});

	it("Stores correct formatted forms as new question", function(done){
		request(server)
		.post("/question")
		.send(a_question_form)
		.expect(302)
		.expect("location", /^\/question\/[0-9a-fA-F]{24}$/)
		.end(done);
	})
});