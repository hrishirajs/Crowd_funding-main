const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 30000, // 30 seconds timeout
  ssl: true,
  tlsAllowInvalidCertificates: false,
});




module.exports = {
  Campaign: require("./Campaign"),
  Donation: require("./Donation"),
  User: require("./User"),
  Token: require("./Token"),
  Query: require("./Query"),
};
