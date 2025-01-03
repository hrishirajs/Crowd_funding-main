const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

// -----ENV Setup----- //
require("dotenv").config();
const PORT = process.env.PORT||3000;
const routes = require("./routes");

// -----Middleware----- /

app.use(bodyParser.json());

app.use(cors((
  {
  origin: ["https://deploy-mern-1whq.vercel.app"],
  method: ["POST","GET"],
  credentials:true
  }
  ));
  

//-----Routes----- 
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
 });

app.use("/api/campaign", routes.campaign);
app.use("/api/user", routes.user);
app.use("/api/donate", routes.payment);
app.use("/api/donation", routes.donation);
app.use("/api/query", routes.query);

app.get("*", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});


app.listen(PORT, function () {
  console.log("Server running successfully");
});
