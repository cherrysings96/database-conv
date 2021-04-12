const express = require("express");
const session = require("express-session");
const app = express();
const postgres = require("postgres");


// postgres.connect('postgres://localhost:27017/session',{
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
// })

app.use(
  session({
    secret: "cokkie collect server",
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/", (req, res) => {
  req.session.isAuth = true;
  console.log(req.session);
  console.log(req.session.id)

  res.send("Hello Session login");
});

app.listen(5000, () => {
  console.log("server is running at port http://localhost:5000");
});
