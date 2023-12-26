const mongoose = require("mongoose");
const app = require("./app");

const mongoURI =
  "mongodb+srv://giedrius:zA9wtjc6h4d1Lome@cluster0.ywfimym.mongodb.net/springProject?retryWrites=true&w=majority";

mongoose.connect(mongoURI).then(console.log("Connection to the database is established."));

const port = 3000;
app.listen(port, () => console.log(`The server is running on the port ${port}`));
