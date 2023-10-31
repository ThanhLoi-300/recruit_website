const Job = require("../models/JobModel");
const User = require("../models/UserModel");

const createJob = (job) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { title,
                logoLink,
                websiteLink,
                nameCompany,
                urgent,
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
            } = job
            const createJob = await Job.create({ 
                title,
                logoLink,
                websiteLink,
                nameCompany,
                address,
                area,
                urgent,
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
            });
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: createJob,
            });
        } catch (e) {
            reject(e);
        }
    });
};
const jobDetail = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const idDetail = await Job.findOne({
                _id: id
            })
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: idDetail,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const saveFollowList = (idJob, idUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: idUser
            })
            let followList = user.followList
            if(followList.includes(idJob)){
                followList = followList.filter(item => item !== idJob);
            }else{
                followList.push(idJob)
            }
            user = await User.findOneAndUpdate({ _id: idUser }, { followList: followList }, { new: true })
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: followList,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const loadFollowList = (idUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: idUser
            })
            let followList = user.followList
            const jobList = await Job.find({
                _id: { $in: followList } // $in operator tìm các giá trị trong một mảng
              });
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: jobList,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteFollowList = (idJob, idUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: idUser
            })
            let followList = user.followList
            if(followList.includes(idJob)){
                followList = followList.filter(item => item !== idJob);
            }
            user = await User.findOneAndUpdate({ _id: idUser }, { followList: followList }, { new: true })
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: user,
            });
        } catch (e) {
            reject(e);
        }
    });
};


module.exports = {
    createJob,
    jobDetail,
    saveFollowList,
    loadFollowList,
    deleteFollowList,
};

