const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer')
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { fullName, email, password, role, nameCompany, addressCompany,areaCompany } = newUser;
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

      const hash = bcrypt.hashSync(password, 10);
      let createUser = null

      if (role == "User") {
        createUser = await User.create({
          name: fullName,
          email,
          password: hash,
          role: role
        });
      } else {
        createUser = await User.create({
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

      if (createUser) {
        resolve({
          status: "OK",
          message: "Successfully created"
        });
      }
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
const sendMailEmployer = async (idUser, emailEmployer, info) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        _id: idUser
      })
      console.log("mail", user.email)
      const { topic, content } = info
      //  Create a transporter with your SMTP information
      let transporter = nodemailer.createTransport({
        service: 'email',
        auth: {
          user: user.email,
          pass: 'slwi czcw rqfp arfa'
        }
      });

      // Recipient information, subject and email content
      let mailOptions = {
        from: user.email,
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

module.exports = {
  createUser,
  loginUser,
  updateUser,
  getDetailUser,
  sendMailEmployer,
};

