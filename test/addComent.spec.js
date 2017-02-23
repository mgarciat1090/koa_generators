var app = require("./../app.js").app;
var server = require("./../app.js").server;
var request = require("supertest");
var db = require("./../lib/db.js");

var testHelpers = require("./helpers.js");

var co = require("co");
var should = require("should");

describe("Add Comment",function(){
	var a_test_vote;
	beforeEach(function(done){
		a_test_vote = {
			tags: ['tag 1','tag 2','tag 3'],
			voteValue: 3,
			questionId : 0
		};
		done();
	});
	afterEach(function(done){
		testHelpers.removeAllDocs(done);
	});

	// it("Has a page for adding votes",function(done){
	// 	co(function *(){
	// 		var q = yield db.comments.insert(a_test_vote);
	// 		request(server)
	// 		.get("/vote/"+a_test_vote.questionId + "/comment/")
	// 		.expect(200)
	// 		.expect("Content-Type",/html/)
	// 		.end(done);
	// 	});
	// });

	it("Adds a comment to an existing vote",function(done){
		co(function *(){
			var vote = yield db.votes.insert(a_test_vote);
			request(server)
			.post('/vote/'+ vote._id + '/comment')
			.send({comment: 'a nice comment'})
			.expect(302)
			.expect('location','/vote?questionId='+ vote.questionId)
			.end(done);
		});
	});

});