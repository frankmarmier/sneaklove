const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

mongoose.connection.on("connected", () => console.log("yay mongodb connected :)"));

mongoose.connection.on("error", (error) => console.log(error ,"nay db connexion error sorry :("));

