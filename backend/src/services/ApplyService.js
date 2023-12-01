const Apply = require("../models/ApplyModel");
const User = require("../models/UserModel");

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

const searchAppliesByJobId = async (searchCondition) => {
  try {
    let { page = 1, pageSize, jobId } = searchCondition;

    if (!jobId) {
      // Reject the promise if jobId is not provided
      return Promise.reject("Job ID is required for the search.");
    }

      let applies = await Apply.find();
       applies = applies.filter((apply) => apply.jobId == jobId["$oid"]);

    const totalApplies = applies.length;
    const totalPages = Math.ceil(totalApplies / pageSize);
    applies = applies.slice((page - 1) * pageSize, page * pageSize);

    return {
      status: "OK",
      message: "SUCCESS",
      applies,
      totalPages,
      page,
    };
  } catch (e) {
    return Promise.reject(e);
  }
};



module.exports = {
  createApply,
  searchAppliesByJobId,
};

