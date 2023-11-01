const express = require("express");
const router = express.Router()
const userController = require('../controllers/UserController');
const { authMiddleware, authUserMiddleware } = require("../middleware/authMiddleware");

router.post("/sign-up", userController.createUser)
router.post("/sign-in", userController.loginUser)
router.post("/logout", userController.logoutUser)
router.post("/updateUser/:idUser", userController.updateUser)
router.get("/getDetailUser/:idUser",authUserMiddleware, userController.getDetailUser)

module.exports = router