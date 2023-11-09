const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
    {
        name: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String},
        phone: { type: Number },
        address: { type: String },
        avatar: { type: String },
        followList: { type: Array, default: [] },
        profile: {
            degree: { type: number },// cấp bậc nhân viên, quản lý.....
            experienceYear: { type: number },
            careerType: { type: String },//loại nghề IT, văn phòng
            areaAply: {type: String}, // khu vực muốn apply 
        },
        infoCompany: {
            websiteLink: { type: String, default:""},
            nameCompany: { type: String, default:"" },
            logoLink: { type: String, default:"" },
            addressCompany: { type: String, default: "" },
            areaCompany:{ type: String, default: "" }
        }
    },
    {
        timestamps: true
    }
);
const User = mongoose.model("User", userSchema);
module.exports = User;