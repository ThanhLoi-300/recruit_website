const { JwtService } = require("../services/JwtService")
const JobService = require("../services/JobService")

const createJob = async (req, res) => {
    try {
        const { title,
            logoLink,
            websiteLink,
            nameCompany,
            address,
            area,
            careerType,
            vacancy,
            jobDescription,
            level,
            typeJob,
            quantityRecruit,
            salary,
            experienceYear,
            deadlineApplication,
            userId
        } = req.body
        if (!title || !logoLink || !websiteLink || !nameCompany || !address || !area || !careerType || !vacancy || !jobDescription || !level ||
            !typeJob || !quantityRecruit || !salary || !experienceYear || !deadlineApplication || !userId) {
                return res.status(200).json({
                    status: "ERR",
                    message: "Input is required"
                })
        }

        const response = await JobService.createJob(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const jobDetail = async (req, res) => {
    try {
        console.log("req.params.id",req.params.id)
        const response = await JobService.jobDetail(req.params.id)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const saveFollowList = async (req, res) => {
    try {
        const response = await JobService.saveFollowList(req.params.idJob,req.params.idUser)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const LoadFollowList = async (req, res) => {
    try {
        const response = await JobService.loadFollowList(req.params.idUser)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteFollowList = async (req, res) => {
    try {
        const response = await JobService.deleteFollowList(req.params.idJob, req.params.idUser)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateJob = async (req, res) => {
    try {
        const response = await JobService.updateJob(req.params.idJob, req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteJob = async (req, res) => {
    try {
        const response = await JobService.deleteJob(req.params.idJob)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getJobByUser = async(req, res) => {
    try {
        console.log("hihi")
        const response = await JobService.getJobByUser(req.params.jobId)
        console.log("manh dtrzi")
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createJob,
    jobDetail,
    saveFollowList,
    LoadFollowList,
    deleteFollowList,
    updateJob,
    deleteJob,
    getJobByUser,
}