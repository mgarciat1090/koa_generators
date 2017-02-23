var koa = require("koa");
var app = koa();
var route = require("koa-route");
var serve = require("koa-static");

var userRoutes = require("./routes/userRoutes.js");
var homeRoutes = require("./routes/homeRoutes.js");
var questionRoutes = require("./routes/questionRoutes.js");
var voteRoutes = require("./routes/voteRoutes.js");

app.use(serve(__dirname + "/public"));

app.use(route.get('/',homeRoutes.showHome))

app.use(route.post("/user",userRoutes.saveUser));
app.use(route.get("/user/:id",userRoutes.getUser));
app.use(route.put("/user/:id",userRoutes.updateUser));
app.use(route.delete("/user/:id",userRoutes.deleteUser));

app.use(route.get("/question",questionRoutes.showNewQuestion));
app.use(route.post("/question",questionRoutes.addQuestion));
app.use(route.get("/question/:id",questionRoutes.showQuestion));
app.use(route.post("/question/:id",questionRoutes.updateQuestion));
console.log("The app is started");

app.use(route.get("/vote",voteRoutes.showAddVote));
app.use(route.post("/vote",voteRoutes.addVote));
app.use(route.get("/vote/:id/comment",voteRoutes.showAddComment));
app.use(route.post("/vote/:id/comment",voteRoutes.addComment));

var server = app.listen(3000);

module.exports.app = app;
module.exports.server = server;
