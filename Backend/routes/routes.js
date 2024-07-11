const express = require("express");

const authFunction = require("../functions/authFunctions");

const router = express.Router();

router.get("/", async (req, res) => {
  res.send("Server is running");
});

router.post("/register", async (req, res) => {
  authFunction.userRegistration(req, res);
});

router.post("/login", async (req, res) => {
  authFunction.userLogin(req, res);
});

module.exports = router;
