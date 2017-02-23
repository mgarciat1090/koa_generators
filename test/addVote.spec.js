var app = require("./../app.js").app;
var server = require("./../app.js").server;
var request = require("supertest");
var db = require("./../lib/db.js")

var testHelpers = require("./helpers.js");

var co = require("co");
var should = require("should");

describe("Add vote",function(){

	beforeEach(function(done){
		testHelpers.removeAllDocs(done);
	});

	afterEach(function(done){
		testHelpers.removeAllDocs(done);
	});


	var test_question = { title : "To be?", tags : [ "tag1", "tag2" ] };

	it("Has a page for voting from", function(done){
		co(function *(){
			var q = yield db.questions.insert(test_question);
			request(server)
			.get("/vote?questionId=" + q._id)
			.expect(200)
			.expect("Content-Type",/html/)
			.expect(function(res){
				res.text.should.containEql(q.title);
			})
			.end(done);
			
		});
	});

	it("returns error when no question can be found",function(done){
		request(server)
		.get("/vote?questionId=000000000000000000000000")
		.expect(302)
		.expect("location","/")
		.expect("ErrorMessage","No question found for id: 000000000000000000000000")
		.end(done);
	});

	it("Returns error when no questionId is passed to the page",function(done){
		request(server)
		.get("/vote")
		.expect(302)
		.expect("location","/")
		.expect("ErrorMessage","No questionId passed to page")
		.end(done);
	})




});