const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer')
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService");
const otpGenerator = require("otp-generator");

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
      const { name, phone } = updateUser;

      const user = await User.findOne({
        _id: idUser
      })
      user = await User.findOneAndUpdate({ _id: idUser }, { name: name, phone: phone }, { new: true })
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
const sendMailEmployer = async (emailEmployer, info) => {
  return new Promise(async (resolve, reject) => {
    try {
      
      const { topic, content } = info
      //  Create a transporter with your SMTP information
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user:  "quanmanh901@gmail.com",
          pass: 'slwi czcw rqfp arfa'
        }
      });

      // Recipient information, subject and email content
      let mailOptions = {
        from: "quanmanh901@gmail.com",
        to: emailEmployer,
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
          user: "quanmanh901@gmail.com",
          pass: 'slwi czcw rqfp arfa'
        },
      });

      const mailOptions = {
        from: "quanmanh901@gmail.com",
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

module.exports = {
  createUser,
  loginUser,
  updateUser,
  getDetailUser,
  sendMailEmployer,
  sendOTP,
};

