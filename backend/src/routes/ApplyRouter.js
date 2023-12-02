const express = require("express");
const router = express.Router()
const applyController = require('../controllers/ApplyController');

router.post("/createApply", applyController.createApply)
router.get("/searchAppliesByJobId/:jobId", applyController.searchAppliesByJobId);
router.get("/getAppliesByUser/:userId", applyController.getAppliesByUser);

module.exports = router