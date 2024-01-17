const User = require("../models/UserModel");
const Job = require("../models/JobModel");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer')
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService");
const otpGenerator = require("otp-generator");
const Apply = require("../models/ApplyModel");

const generateOTP = () => {
  return otpGenerator.generate(6, {
    upperCase: false,
    specialChars: false,
    alphabets: false,
  });
};

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { fullName, email, password, role, nameCompany, addressCompany, areaCompany } = newUser;

      const hash = bcrypt.hashSync(password, 10);

      if (role == "User") {
        await User.create({
          name: fullName,
          email,
          password: hash,
          role: role
        });
      } else {
        await User.create({
          name: fullName,
          email,
          password: hash,
          role: role,
          infoCompany: {
            nameCompany: nameCompany,
            addressCompany: addressCompany,
            areaCompany: areaCompany
          }
        });
      }

      resolve({
        status: "OK",
        message: "Successfully created"
      });
    } catch (e) {
      reject(e);
    }
  });
};

const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = userLogin;
    try {
      const checkUser = await User.findOne({
        email: email,
      });

      if (checkUser == null) {
        resolve({
          status: "ERR",
          message: "This email is not exist",
        });
      }

      const comparePassword = bcrypt.compareSync(password, checkUser.password);

      if (!comparePassword) {
        resolve({
          status: "ERR",
          message: "Password is incorrect",
        });
      }
      console.log(checkUser._id);
      const access_token = await genneralAccessToken({
        id: checkUser._id,
        role: checkUser.role,
      });

      const refresh_token = await genneralRefreshToken({
        id: checkUser.id,
        role: checkUser.role,
      });
      resolve({
        status: "OK",
        message: "Login is success",
        access_token,
        refresh_token,
        role: checkUser.role
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({ _id: id });

      if (checkUser == null) {
        resolve({
          status: "ERR",
          message: "This account is not exist",
        });
      }

      resolve({
        status: "OK",
        message: "SUCESS",
        data: checkUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateUser = (idUser, updateUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { name, phone, degree,
        experienceYear,
        careerType,
        areaAply,
      } = updateUser;

      let user = await User.findOne({
        _id: idUser
      })
      user = await User.findOneAndUpdate({ _id: idUser }, {
        name: name, phone: phone,
        'profile.degree': degree,
        'profile.experienceYear': experienceYear,
        'profile.careerType': careerType,
        'profile.areaAply': areaAply
      }, { new: true })
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

// send email
const sendMailEmployer = async (idJob, info) => {
  return new Promise(async (resolve, reject) => {
    try {

      const { topic, content } = info
      //  Create a transporter with your SMTP information
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: "asuoplinh@gmail.com",
          pass: 'janq ijyb nbjj lpcp'
        }
      });

      const idJobs = await Job.findOne({
        _id: idJob
      })

      const mail = await User.findOne({
        _id: idJobs.userId
      })

      // Recipient information, subject and email content
      let mailOptions = {
        from: "asuoplinh@gmail.com",
        to: mail.email,
        subject: topic,
        text: content
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.error('Err send email: ' + error.message);
        } else {
          console.log('Email send success: ' + info.response);
        }
      });
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: mailOptions,
      });
    } catch (e) {
      reject(e);
    }
  });
}

const sendOTP = async (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { email } = newUser;
    try {
      const checkUser = await User.findOne({
        email: email,
      });

      if (checkUser != null) {
        resolve({
          status: "ERR",
          message: "This email is already",
        });
      }

      const otp = generateOTP()

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "asuoplinh@gmail.com",
          pass: 'janq ijyb nbjj lpcp'
        },
      });

      const mailOptions = {
        from: "asuoplinh@gmail.com",
        to: email,
        subject: "OTP",
        text: `Mã OTP của bạn là: ${otp}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          resolve({
            status: "ERR",
            message: "Lỗi gửi email.",
          });
        } else {
          resolve({
            status: "OK",
            otp,
            message: "Một mã OTP đã được gửi đến địa chỉ email của bạn.",
          });
        }
      });
    } catch (e) {
      console.log(e);
      return res.status(404).json({
        message: e,
      });
    }
  }
  )
}

const updateCompany = (id, updateRecruiter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { nameCompany, websiteLink, addressCompany, areaCompany, careerType, scale, logoLink } = updateRecruiter;
      let user = await User.findOneAndUpdate({ _id: id }, {
        'infoCompany.nameCompany': nameCompany,
        'infoCompany.websiteLink': websiteLink,
        'infoCompany.addressCompany': addressCompany,
        'infoCompany.areaCompany': areaCompany,
        'infoCompany.scale': scale,
        'infoCompany.careerType': careerType,
        'infoCompany.logoLink': logoLink,
      }, { new: true })
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

const notificationByEmail = (request) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { action, idApply } = request
      
      const apply = await Apply.findOne({ _id: idApply })
      const user = await User.findOne({ _id: apply.userId })
      const job = await Job.findOne({ _id: apply.jobId })
      const recruiter = await User.findOne({ _id: job.userId })

      let text = ''
      if (action == true)
        text = "Đơn ứng tuyển cho Job: "+ job.title  +" từ công ty "+recruiter.infoCompany.nameCompany+" của bạn đã được chấp nhận.\nHãy liên hệ qua email: "+ recruiter.email+" để được phỏng vấn"
      else text = "Đơn ứng tuyển cho Job: "+ job.title  +" từ công ty "+recruiter.infoCompany.nameCompany+" của bạn không được chấp nhận"

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "asuoplinh@gmail.com",
          pass: 'janq ijyb nbjj lpcp'
        },
      });

      const mailOptions = {
        from: "asuoplinh@gmail.com",
        to: user.email,
        subject: "Thông báo từ nhà tuyển dụng",
        text: text,
      };

      await Apply.deleteOne({ _id: idApply });

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          resolve({
            status: "ERR",
            message: "Lỗi gửi email.",
          });
        } else {
          resolve({
            status: "OK",
            message: "Đã gửi thông báo đến ứng viên",
          });
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  getDetailUser,
  sendMailEmployer,
  sendOTP,
  updateCompany,
  notificationByEmail
};

