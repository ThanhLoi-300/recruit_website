const mongoose = require('mongoose')
const jobSchema = new mongoose.Schema(
    {
        title: {type: String},
        logoLink: { type: String },
        websiteLink: { type: String },
        nameCompany: { type: String },
        urgent: { type: Boolean, default: false },
        address: { type: String },
        area: { type: String },
        careerType: {type: String},//loại nghề IT, văn phòng
        vacancy: { type: String },//vị trí tuyển
        jobDescription: { type: String },
        level: { type: String },// cấp bậc nhân viên, quản lý.....
        typeJob: { type: String },//partTime, fullTime
        quantityRecruit: {type: Number},
        salary: { type: String},
        experienceYear: { type: String},
        deadlineApplication: { type: String},
        active:{type:Boolean, default: true},
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true
    }
);
const Job = mongoose.model("Job", jobSchema);
module.exports = Job;