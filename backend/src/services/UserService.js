const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, phone, role, nameCompany, addressCompany } = newUser;
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
          name,
          email,
          password: hash,
          phone: phone,
          role: role
        });
      } else {
        createUser = await User.create({
          name,
          email,
          password: hash,
          phone: phone,
          role: role,
          infoCompany: {
            nameCompany: nameCompany,
            addressCompany: addressCompany,
          }
        });
      }

      if (createUser) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createUser,
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

module.exports = {
  createUser,
  loginUser,
};

