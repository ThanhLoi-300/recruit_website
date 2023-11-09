const { JwtService } = require("../services/JwtService");
const UserService = require("../services/UserService");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");

const generateOTP = () => {
  return otpGenerator.generate(6, {
    upperCase: false,
    specialChars: false,
    alphabets: false,
  });
};

let otpStorage = {};

const createUser = async (req, res) => {
  try {
    const { email, password, confirmPassword, otp } = req.body;
    // const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    // const isCheckEmai = reg.test(email);

    // if (!isCheckEmai) {
    //   return res.status(200).json({
    //     status: "ERR",
    //     message: "Input must be email",
    //   });
    // } else if (password != confirmPassword) {
    //   return res.status(200).json({
    //     status: "ERR",
    //     message: "The password is not equal confirmPassword",
    //   });
      // }
      // Kiểm tra xem OTP được nhập vào có đúng không
    if (otpStorage[email] && otpStorage[email] === otp) {
        // Xác nhận thành công, bạn có thể tạo tài khoản ở đây hoặc thực hiện các hành động khác
        const response = await UserService.createUser(req.body);
        return res.status(200).json(response);
    } else {
        res.status(401).send("Xác nhận thất bại. Mã OTP không hợp lệ.");
    }
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      message: e,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmai = reg.test(email);

    if (!email || !password) {
      return res.status(200).json({
        status: "ERR",
        message: "Input is required",
      });
    } else if (!isCheckEmai) {
      return res.status(200).json({
        status: "ERR",
        message: "Input must be email",
      });
    }

    const response = await UserService.loginUser(req.body);
    const { refresh_token, ...newResponse } = response;
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: false,
      samsite: "strict",
    });
    return res.status(200).json(newResponse);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getDetailUser = async (req, res) => {
  try {
    const userId = req.params.idUser;
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The userId is required",
      });
    }

    const response = await UserService.getDetailUser(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    req.clearCookie("refresh_token");
    return res.status(200).json({
      status: "OK",
      message: "Logout successfully",
    });
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(200).json({
        status: "ERR",
        message: "Input is required",
      });
    }
    const response = await UserService.updateUser(req.params.idUser, req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      message: e,
    });
  }
};

const sendMailEmployer = async (req, res) => {
  try {
    const { topic, content } = req.body;
    if (!topic || !content) {
      return res.status(200).json({
        status: "ERR",
        message: "Input is required",
      });
    }
    const response = await UserService.sendMailEmployer(
      req.params.emailEmployer,
      req.body
    );
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      message: e,
    });
  }
};

const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = generateOTP()
      
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user:  "quanmanh901@gmail.com",
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
            console.error(error);
            return res.status(500).send("Lỗi gửi email.");
        } else {
            // Lưu trữ OTP trong bộ nhớ tạm thời (có thể lưu vào cơ sở dữ liệu thay vì này)
            otpStorage[email] = otp;
            return res.status(200).send("Một mã OTP đã được gửi đến địa chỉ email của bạn.");
        }
    });
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  updateUser,
  getDetailUser,
  sendMailEmployer,
  sendOTP,
};
