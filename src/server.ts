import express from "express";
require("express-async-errors");
import http from "http";
import session from "express-session";
import passport from "passport";
import logging from "./config/logging";
import config from "./config/config";
import "./config/passport";
import { errorHandler } from "./errors/errorHandler";
import routes from "./routes";
const app = express();
const PORT = 3000;

/** Server Handling */
const httpServer = http.createServer(app);

/** Log the request */
app.use((req, res, next) => {
  logging.info(
    `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
  );

  res.on("finish", () => {
    logging.info(
      `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
    );
  });

  next();
});

/** Parse the body of the request / Passport */
app.use(session(config.session));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false })); // Replaces Body Parser
app.use(express.json()); // Replaces Body Parser

/** Rules of our API */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.header("origin"));
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

// ROUTES
app.use("/api/auth/", routes.auth);
app.use("/api/elastic/", routes.elastic);
/** Health Check */
app.get("/api/healthcheck", (req, res, next) => {
  return res.status(200).json({ messgae: "Server is running!" });
});

app.use(routes.notFound);

/** Error handling */
app.use(errorHandler);
// app.use((req, res, next) => {
//   const error = new Error("Not found");

//   res.status(404).json({
//     message: error.message,
//   });
// });
httpServer.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
