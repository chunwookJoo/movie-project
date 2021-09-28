const express = require("express");
const path = require("path");
const router = express.Router();

const user = require(path.resolve(__dirname, "api", "user"));

// /api
router.use("/user", user);

router.use((err, req, res, next) => {
  res.status(500).json({
    RESULT: 500,
    MESSAGE: "실패",
  });
  next(err);
});
module.exports = router;
