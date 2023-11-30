const express = require("express");
const router = express.Router();
const userController = require("../api/userApi.js");

router.post("/api/register", userController.registerUser);
router.get("/api/getUser", userController.getUsers);
router.post("/api/login", userController.loginUser);
router.delete("/api/deleteUsers", userController.deleteAllData);
router.put("/api/updateUser", userController.updateUser);

module.exports = router;
