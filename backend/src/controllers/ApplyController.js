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


const searchAppliesByJobId = async (req, res) => {
  try {
    const response = await applyService.searchAppliesByJobId(req.params.jobId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};


const getAppliesByUser = async (req, res) => {
  try {
    const response = await applyService.getAppliesByUser(req.params.userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};


module.exports = {
  createApply,
  searchAppliesByJobId,
  getAppliesByUser,
};