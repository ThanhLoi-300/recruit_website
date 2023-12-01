const { JwtService } = require("../services/JwtService")
const applyService = require("../services/ApplyService")

const createApply = async (req, res) => {
    try {
        const { fileCv,
            userId,
            jobId
        } = req.body
        if (!fileCv || !userId || !jobId) {
            return res.status(200).json({
                status: "ERR",
                message: "Input is required"
            })
        }
        const response = await applyService.createApply(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createApply,
}