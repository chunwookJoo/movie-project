const express = require("express");
const path = require("path");
const controllerPath = path.resolve(__dirname, "..", "..", "controller");
const middlewarePath = path.resolve(__dirname, "..", "..", "middleware");

const userRegist = require(path.resolve(controllerPath, "user", "UserRegist"));
const userLogin = require(path.resolve(controllerPath, "user", "UserLogin"));
const userAuth = require(path.resolve(controllerPath, "user", "UserAuth"));
const userLogout = require(path.resolve(controllerPath, "user", "UserLogout"));

const { auth } = require(path.resolve(middlewarePath, "auth"));
const router = express.Router();

// /api/user
router.post("/register", userRegist);
router.post("/login", userLogin);
router.get("/logout", auth, userLogout);
router.get("/auth", auth, userAuth);

module.exports = router;
