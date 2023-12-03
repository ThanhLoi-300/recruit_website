const express = require("express");
const router = express.Router()
const userController = require('../controllers/UserController');
const { authMiddleware, authUserMiddleware } = require("../middleware/authMiddleware");

router.post("/sign-up", userController.createUser)
router.post("/sign-in", userController.loginUser)
router.post("/logout", userController.logoutUser)
router.post("/updateUser/:id", userController.updateUser)
router.post("/getDetailUser",authUserMiddleware, userController.getDetailUser)
router.post("/sendMailEmployer/:idJob", userController.sendMailEmployer)
router.post("/updateCompany/:idRecruiter", userController.updateCompany)
router.post("/sendOTP", userController.sendOTP)
router.post("/notificationByEmail", userController.notificationByEmail)

module.exports = router;