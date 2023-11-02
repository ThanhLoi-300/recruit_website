const mongoose = require('mongoose')
const applySchema = new mongoose.Schema(
    {
        fileCv: { type: String },
        applyDate: { type: Date},
        statusSeen: { type: Boolean, default: false },
        userId: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
         },
        jobId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Job',
        },
    },
    {
        timestamps: true
    }
);
const Apply = mongoose.model("Apply", applySchema);
module.exports = Apply;
// , default: mongoose.now()