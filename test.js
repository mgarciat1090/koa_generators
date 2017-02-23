var app = require("./app.js").app;
var users = require("./app.js").users;
var server = require("./app.js").server;
var request = require("supertest");
var co = require("co");
var users = require("./userRoutes.js").users;

describe("Simple User Http Crud API", function(){

	var a_user = { };

	var removeAll = function(done){
		co(function *(){
			yield users.remove({});

		})(done());
	};

	beforeEach(function(done){
		a_user = { name: "Marcus", age: 42, height: 1.96 };
		removeAll(done);

	});

	afterEach(function(done){
		removeAll(done);
	});



	it("Adds new users", function(done){
		
		request(server)
		.post("/user")
		.send(a_user)
		.expect("Location",/^\/user\/[0-9a-fA-F]{24}$/)
		.expect(201,done)
		
	});


	it("fails with validation error for users without name",function(done){
		delete a_user.name;
		request(server)
		.post("/user")
		.send(a_user)
		.expect("name required")
		.expect(400,done);
	});

	it("get existing user by id",function(done){
		co(function*(){
			//insert testuser in db
			var insertedUser = yield users.insert(a_user);

			//get url to user
			var url = "/user/" + insertedUser._id;

			request(server)
			.get(url)
			.set("Accept","application/json")
			.expect("Content-type",/json/)
			.expect(/Marcus/)
			.expect(/1.96/)
			.expect(200,done);
		})

		//get via api
	}) ;


	it("updates an existing user",function(done){
		co(function *(){
			var insertedUser = yield users.insert(a_user);
			var url = "/user/" + insertedUser._id;

			request(server)
			.put(url)
			.send({name : "Older Marcus", age : 43, height: 1.94 })
			.expect("Location",url)
			.expect(204,done);
		});
	});

	it("deletes an existing user",function(done){
		co(function*(){
			var insertedUser = yield users.insert(a_user);
			var url = "/user/" + insertedUser._id;

			request(server)
				.del(url)
				.expect(200,done);

		})
	})

})