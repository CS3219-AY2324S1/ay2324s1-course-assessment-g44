const express = require("express");
const expressJSDocSwagger = require("express-jsdoc-swagger");
const cookieParser = require("cookie-parser");

const app = express();
const port = 6969;
const cors = require("cors");
const codeExecutorRouter = express.Router();

const codeExecution = require("./routes/codeExecution");

const options = {
  info: {
    version: "1.0.0",
    title: "PeerPrep Code Execution API",
    description:
      "The REST API endpoints for the PeerPrep Code Execution Service.",
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

app.use(express.json());

app.use("/api", codeExecutorRouter);

app.get("/api/testCode", (req, res) => {
  res.send("Test Code");
});

app.use(cookieParser());

app.use("/api/code", codeExecution);

app.listen(port, () => console.log(`Listening on port ${port}`));
