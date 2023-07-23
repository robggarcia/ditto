const express = require("express");
const apiRouter = express.Router();

// GET /health
apiRouter.get("/health", (req, res) => {
  res.send({
    success: true,
    message: "The server is up and running. It is healthy.",
  });
});

// GET /*
apiRouter.get("*", (req, res) => {
  res.status(404);
  res.send({
    success: false,
    message: "page missing",
  });
});

// error handler MUST have all 4 parameters or it won't fire off
apiRouter.use((err, req, res, next) => {
  res.send({
    error: "Something went wrong",
    name: err.name,
    message: err.message,
  });
});

module.exports = apiRouter;
