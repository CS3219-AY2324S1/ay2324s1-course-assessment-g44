const express = require("express");
const expressJSDocSwagger = require("express-jsdoc-swagger");
const userController = require("./controller/user-controller");

const app = express();
const port = 4200;
const cors = require("cors");
const pool = require("./db.js");

// const userRouter = require("./routes/routes");
const userRouter = express.Router();

const options = {
  info: {
    version: "1.0.0",
    title: "PeerPrep User Service API",
    description: "The REST API endpoints for the PeerPrep User Service."
  },
  baseDir: __dirname,
  // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
  filesPattern: "./**/*.js",
  // URL where SwaggerUI will be rendered
  swaggerUIPath: "/api-docs",
  // Expose OpenAPI UI
  exposeSwaggerUI: true,
  // Expose Open API JSON Docs documentation in `apiDocsPath` path.
  exposeApiDocs: true,
  // Set non-required fields as nullable by default
  notRequiredAsNullable: false,
};

expressJSDocSwagger(app)(options);

app.use(cors());

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
//   });

app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
  
    next();
  });

app.use(express.json());

app.use("/api", userRouter);

app.get("/api/hello", (req, res) => {
  res.send("Hello world");
});

app.post("/api/registerUser", userController.createUser);

app.listen(port, () => console.log(`Listening on port ${port}`));