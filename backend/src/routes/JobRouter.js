const express = require("express");
const router = express.Router()
const jobController = require('../controllers/JobController');

router.post("/createJob", jobController.createJob)
router.get("/jobDetail/:id", jobController.jobDetail)
router.post("/saveFollowList/:idJob/:idUser", jobController.saveFollowList)
router.post("/loadFollowList/:idUser", jobController.LoadFollowList)
router.post("/deleteFollowList/:idJob/:idUser", jobController.deleteFollowList)
router.post("/updateJob/:idJob", jobController.updateJob)
router.post("/deleteJob/:idJob", jobController.deleteJob)
router.post("/searchJob", jobController.searchJob)
router.post("/searchJobByIdRecruiter",jobController. searchJobByIdRecruiter)
router.post("/getJobByUser/:jobId", jobController.getJobByUser)
router.get("/getJobRandom/", jobController.getJobRandom)
router.get("/changeStatusJob/:jobId", jobController.changeStatusJob)


module.exports = router