const express = require("express");
const router = express.Router();
const { getUser, createUser, getUsers, updateUser, DeleteUser } = require('../Controller/user.controller');

const { login, logout } = require('../Middlewares/Auth')
router.route("/").get(getUsers).post(createUser);
router.route("/:id").get(getUser).put(updateUser).delete(DeleteUser);
router.route("/login").post(login);
router.route("/logout").post(logout);
module.exports = router;