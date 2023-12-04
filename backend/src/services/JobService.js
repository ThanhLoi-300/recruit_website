const { promises } = require("nodemailer/lib/xoauth2");
const Job = require("../models/JobModel");
const User = require("../models/UserModel");
const schedule = require('node-schedule');
const moment = require('moment');

const createJob = (job) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        title,
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
        userId,
      } = job;
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
        userId,
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
        _id: id,
      });
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
        _id: idUser,
      });

      let followList = user.followList;
      if (followList.includes(idJob)) {
        followList = followList.filter((item) => item !== idJob);
      } else {
        followList.push(idJob);
      }

      user = await User.findOneAndUpdate(
        { _id: idUser },
        { followList: followList },
        { new: true }
      );

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
        _id: idUser,
      });
      let followList = user.followList;
      const jobList = await Job.find({
        _id: { $in: followList }, // $in operator tìm các giá trị trong một mảng
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
        _id: idUser,
      });
      let followList = user.followList;
      if (followList.includes(idJob)) {
        followList = followList.filter((item) => item !== idJob);
      }
      user = await User.findOneAndUpdate(
        { _id: idUser },
        { followList: followList },
        { new: true }
      );
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
  console.log("Id update:"+idJob)
  console.log("Ob update:"+ updateJobs.title)
  return new Promise(async (resolve, reject) => {
    try {
      const {
        title,
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
      } = updateJobs;
      let jobs = await Job.findOne({
        _id: idJob,
      });
      jobs = await Job.findOneAndUpdate(
        { _id: idJob },
        {
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
          deadlineApplication: deadlineApplication,
        },
        { new: true }
      );
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: jobs,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteJob = (idJob) => {
  return new Promise(async (resolve, reject) => {
    try {
      const jobs = await Job.findOne({
        _id: idJob,
      });
      jobs = await Job.findOneAndDelete({ _id: idJob });
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: jobs,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const searchJob = (searchCondition) => {
  return new Promise(async (resolve, reject) => {
    try {
      let {
        page = 1,
        pageSize,
        keyword,
        area,
        urgent,
        salary,
        experience,
        career,
        searchByProfile,
        level,
      } = searchCondition;

      let jobs = await Job.find({ active: true });

      //Search theo profile
      if (searchByProfile == true) {
        jobs = jobs.filter(
          (job) =>
            job.careerType.includes(career) &&
            (job.area.includes(area) ||
              job.experienceYear == experience ||
              job.level.includes(level))
        );
      } else {
        if (keyword) {
          //Lowercase and nomalize for keyword
          const keywordLowerAndNormalize = keyword
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
          jobs = jobs.filter((job) => {
            const jobLowerAndNormalize = job.title
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "");
            const careerType = job.careerType.toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "");
            return jobLowerAndNormalize.includes(keywordLowerAndNormalize) || careerType.includes(keywordLowerAndNormalize);
          });
        }

        if (area) {
          jobs = jobs.filter(
            (job) => job.area.includes(area) || job.address.includes(area)
          );
        }

        if (urgent) {
          jobs = jobs.filter((job) => job.urgent == true);
        }

        if (experience) {
          jobs = jobs.filter((job) => job.experienceYear == experience);
        }

        if (career) {
          jobs = jobs.filter((job) => job.careerType.includes(career));
        }

        if (salary) {
            jobs = jobs.filter((job) => {
                const regex = /(\d+)\s*-\s*(\d+)\s*triệu/;
                const match = job.salary.match(regex);
                if (match) {
                    const minSalary = parseInt(match[1], 10);
                    const maxSalary = parseInt(match[2], 10);

                    const min = parseInt(salary.split(' - ')[0], 10);
                    const max = parseInt(salary.split(' - ')[1], 10);
                    return (
                        minSalary <= min && minSalary <= max && min <= maxSalary && maxSalary <= max
                    );
                }
            })
        }
      }

      const totalProducts = jobs.length;
      const totalPages = Math.ceil(totalProducts / pageSize);

      jobs = jobs.slice((page - 1) * pageSize, page * pageSize);

      resolve({
        status: "OK",
        message: "SUCCESS",
        jobs,
        totalPages,
        page,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const searchJobByIdRecruiter = async (searchCondition) => {
  try {
    let { page = 1, pageSize, idRecruit } = searchCondition;

    if (!idRecruit) {
      // Reject the promise if idRecruit is not provided
      return Promise.reject("User ID is required for the search.");
    }

    let jobs = await Job.find();

    // Filter jobs based on idRecruit
    jobs = jobs.filter((job) => job.userId == idRecruit["$oid"]);

    const totalProducts = jobs.length;
    const totalPages = Math.ceil(totalProducts / pageSize);
    jobs = jobs.slice((page - 1) * pageSize, page * pageSize);

    return {
      status: "OK",
      message: "SUCCESS",
      jobs,
      totalPages,
      page,
    };
  } catch (e) {
    return Promise.reject(e);
  }
};

const getJobByUser = async (jobId) => {
  try {
    const job = await Job.findById(jobId).populate("userId").exec();
    // job now contains information about the job and the associated user
    console.log(job);
    return {
      status: "OK",
      message: "SUCCESS",
      data: job,
    };
  } catch (err) {
    console.error(err);
    throw err; // rethrow the error to be caught by the calling function
  }
};

const getJobRandom = async () => {
  try {
    const job = await Job.aggregate([
      { $sample: { size: 1 } },
      {
        $lookup: {
          from: "users", // Replace with the actual name of the users collection
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
    ]).exec();

    return {
      status: "OK",
      message: "SUCCESS",
      data: job,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const changeStatusJob = async (jobId) => {
  try {
    const job = await Job.findOne({ _id: jobId })

    if (job.active == true) job.active = false
    else job.active = true

    await Job.updateOne({ _id: jobId }, { $set: { active: job.active } });

    return {
      status: "OK",
      message: "SUCCESS",
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = {
  createJob,
  jobDetail,
  saveFollowList,
  loadFollowList,
  deleteFollowList,
  updateJob,
  deleteJob,
  searchJob,
  searchJobByIdRecruiter,
  getJobByUser,
  getJobRandom,
  changeStatusJob,
};


//realTime
// const jobStatusUpdateJob = async () => {
//   try {
//     const currentDate = new Date().setHours(0, 0, 0, 0);

//     // Lấy danh sách công việc cần kiểm tra và cập nhật
//     const jobsToUpdate = await Job.find();

//     // Cập nhật trạng thái dựa trên ngày hiện tại
//     for (const job of jobsToUpdate) {
//       if (new Date(job.deadlineApplication).setHours(0, 0, 0, 0) < currentDate) {
//         job.active = false;
//       } 
//       await job.save();
//     }
//   } catch (error) {
//     console.error('Lỗi khi cập nhật trạng thái:', error);
//   }
// };
// const intervalId = setInterval(jobStatusUpdateJob, 1000)

