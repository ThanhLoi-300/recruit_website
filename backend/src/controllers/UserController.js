const { JwtService } = require("../services/JwtService");
const UserService = require("../services/UserService");

const createUser = async (req, res) => {
  try {
    const response = await UserService.createUser(req.body);
    return res.status(200).json(response);
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
    const userId = req.body.id;
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
    const response = await UserService.updateUser(req.params.id, req.body);
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
      req.params.idJob,
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
    const { email, password, confirmPassword, role, nameCompany, addressCompany, areaCompany } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmai = reg.test(email);
    if (!isCheckEmai) {
      return res.status(200).json({
        status: "ERR",
        message: "Input must be email",
      });
    } else if (password != confirmPassword) {
      return res.status(200).json({
        status: "ERR",
        message: "The password is not equal confirmPassword",
      });
    } else if (role === "Recruiter") {
      if (!nameCompany || !addressCompany || areaCompany === "Chọn khu vực công ty") 
        return res.status(200).json({
          status: "ERR",
          message: "Input for company is required"
        })
    }

    const response = await UserService.sendOTP(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      message: e,
    });
  }
};

const updateCompany = async (req, res) => {
  try {
    const response = await UserService.updateCompany(req.params.idRecruiter, req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      message: e,
    });
  }
};

const notificationByEmail = async (req, res) => {
  try {
    const response = await UserService.notificationByEmail(req.body);
    return res.status(200).json(response);
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
  updateCompany,
  notificationByEmail
};
