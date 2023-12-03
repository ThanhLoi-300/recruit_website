const Apply = require("../models/ApplyModel");
const User = require("../models/UserModel");
const Job = require("../models/JobModel");

const createApply = (apply) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { fileCv,
                applyDate,
                statusSeen,
                userId,
                jobId
            } = apply
            const createApply = await Apply.create({ 
                fileCv,
                applyDate,
                statusSeen,
                userId,
                jobId
            });
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: createApply,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const searchAppliesByJobId = async (jobId) => {
  try {

    if (!jobId) {
      // Reject the promise if jobId is not provided
      return Promise.reject("Job ID is required for the search.");
    }

      let applies = await Apply.find();
      applies = applies.filter((apply) => apply.jobId._id == jobId);

    return {
      status: "OK",
      message: "SUCCESS",
      applies,
    };
  } catch (e) {
    return Promise.reject(e);
  }
};


const getAppliesByUser = async (userId) => {
  try {
    const activeJobs = await Job.find({ active: true, userId });
    const jobIds = activeJobs.map((job) => job._id);

    const applies = await Apply.find({ jobId: { $in: jobIds } })
      .populate("jobId")
      .populate("userId");

    const mergedApplies = applies.map((apply) => ({
      ...apply.toObject(),
      job: apply.jobId,
      user: apply.userId,
    }));

    return {
      status: "OK",
      message: "SUCCESS",
      applies: mergedApplies,
    };
  } catch (error) {
    throw error;
  }
};



module.exports = {
  createApply,
  searchAppliesByJobId,
  getAppliesByUser,
};

