const Apply = require("../models/ApplyModel");
const User = require("../models/UserModel");

const createApply = (apply) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("nhi cute")
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

module.exports = {
    createApply,
};

