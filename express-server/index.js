import express from "express";
import path from "path";
import bodyParser from "body-parser";
import logger from "morgan";
import mongoose from "mongoose";
//with sourcemap support
import SourceMapSupport from "source-map-support";

//import routes
import todoRoutes from "./routes/route.todo";

//defining the app
const app = express();

//allow-cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With, Content-Type, Accept"
  );
  next();
});

//configure app
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//set the port
const port = process.env.PORT || 3050;

//connection to database
mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb://localhost/mern-todo-app",
  { useNewUrlParser: true }
);

//add Source Map Suppourt
SourceMapSupport.install();

app.use("/api", todoRoutes);

app.get("/", (req, res) => {
  return res.send('<h2 align="center">API Working :)</h2>');
});
//catch 404
app.use((req, res, next) => {
  res.status(404).send('<h2 align="center">Page Not Found!</h2>');
});

//start the server
app.listen(port, () => {
  console.log(`App server listing @ ${port}`);
});
