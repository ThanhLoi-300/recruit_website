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
        careerType: {type: String},
        vacancy: { type: String },
        jobDescription: { type: String },
        level: { type: String },
        typeJob: { type: String },
        quantityRecruit: {type: Number},
        salary: { type: Number},
        experienceYear: { type: String},
        deadlineApplication: { type: Date},
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