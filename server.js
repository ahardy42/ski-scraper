// dependencies
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/apiRoutes");

// Sets an initial port. heroku uses the process.env.PORT option
const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/personal";


const app = express();

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// set up routes
app.use("/", routes);

// =============================================================================
// LISTENERS
// =============================================================================
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.listen(PORT, function () {
  console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
});