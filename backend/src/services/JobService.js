const { promises } = require("nodemailer/lib/xoauth2");
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
            let user = await User.findOne({
                _id: idUser
            })

            let followList = user.followList
            if (followList.includes(idJob)) {
                followList = followList.filter(item => item !== idJob);
            } else {
                followList.push(idJob)
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
            if (followList.includes(idJob)) {
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

const updateJob = (idJob, updateJobs) => {
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
                //vacancy,
                jobDescription,
                level,
                typeJob,
                quantityRecruit,
                salary,
                experienceYear,
                deadlineApplication,
            } = updateJobs
            const jobs = await Job.findOne({
                _id: idJob
            })
            jobs = await Job.findOneAndUpdate({ _id: idJob}, {
                title: title,
                logoLink: logoLink,
                websiteLink: websiteLink,
                nameCompany: nameCompany,
                urgent: urgent,
                address: address,
                area: area,
                careerType: careerType,
                //vacancy: vacancy,
                jobDescription: jobDescription,
                level: level,
                typeJob: typeJob,
                quantityRecruit: quantityRecruit,
                salary: salary,
                experienceYear: experienceYear,
                deadlineApplication: deadlineApplication
            }, { new: true })
            resolve({
                status: "OK",
                message:"SUCCESS",
                data: jobs
            })
        } catch (e) {
            reject(e);
        }
    })
}

const deleteJob = (idJob) => {
    return new Promise(async (resolve, reject) => {
        try {
            const jobs = await Job.findOne({
                _id: idJob
            })
            jobs = await Job.findOneAndDelete({ _id: idJob })
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: jobs,
            });
        } catch (e) {
            reject(e);
        }
    });
}

const searchJob = (searchCondition) => {
    return new Promise(async (resolve, reject) => {
        try {
            let {page = 1, pageSize, keyword, area, urgent, salary, experience, career, searchByProfile, level } = searchCondition

            let jobs = await Job.find({ active: true })

            //Search theo profile
            if (searchByProfile == true) {
                jobs = jobs.filter(job => job.careerType.includes(career) && (job.area.includes(area)
                    || job.experienceYear == experience || job.level.includes(level)))
            } else {
                if (keyword) {
                    //Lowercase and nomalize for keyword
                    const keywordLowerAndNormalize = keyword.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                    jobs = jobs.filter(job => {
                        const jobLowerAndNormalize = job.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                        return jobLowerAndNormalize.includes(keywordLowerAndNormalize)
                    })
                } 

                if (area) {
                    jobs = jobs.filter(job => job.area.includes(area) || job.address.includes(area))
                }

                if (urgent) {
                    jobs = jobs.filter(job => job.urgent == true)
                }

                if (experience) {
                    jobs = jobs.filter(job => job.experienceYear == experience)
                }

                if (career) {
                    jobs = jobs.filter(job => job.careerType.includes(career))
                }

                if (salary) {
                    jobs = jobs.filter(job => job.salary >= salary - 5000000 && job.salary <= salary + 5000000)
                }
            }

            const totalProducts = jobs.length
            const totalPages = Math.ceil(totalProducts / pageSize);

            jobs = jobs.slice((page - 1) * pageSize, page * pageSize)
            
            resolve({
                status: "OK",
                message: "SUCCESS",
                jobs,
                totalPages,
                page
            });
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    createJob,
    jobDetail,
    saveFollowList,
    loadFollowList,
    deleteFollowList,
    updateJob,
    deleteJob,
    searchJob
};

