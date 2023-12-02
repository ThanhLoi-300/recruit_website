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

    let jobs = await Job.find({ active: true });
    // Filter jobs based on idRecruit
    jobs = jobs.filter((job) => job.userId.toString() == userId);

    let applies = await Apply.find();
    for (let i = 0; i < applies.length; i++) {
      for (let j = 0; j < jobs.length; j++) {
        if (applies[i].jobId.toString() == jobs[j]._id.toString()) {
          applies.filter((apply) => apply.jobId.toString() == jobs[j]._id.toString());
        }
      }
    }

    return {
      status: "OK",
      message: "SUCCESS",
      applies,
    };


  }
  catch (e) {
    return Promise.reject(e);
  }
};



module.exports = {
  createApply,
  searchAppliesByJobId,
  getAppliesByUser,
};

