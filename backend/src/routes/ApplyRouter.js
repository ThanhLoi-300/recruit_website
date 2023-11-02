const express = require("express");
const router = express.Router()
const applyController = require('../controllers/ApplyController');

router.post("/createApply", applyController.createApply)


module.exports = router