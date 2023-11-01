const { JwtService } = require("../services/JwtService")
const UserService = require("../services/UserService")

const createUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone, role, nameCompany, addressCompany } = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmai = reg.test(email)

        if (!email || !password || !confirmPassword || !name || !phone) {
            return res.status(200).json({
                status: "ERR",
                message: "Input is required"
            })
        } else if (!isCheckEmai) {
            return res.status(200).json({
                status: "ERR",
                message: "Input must be email"
            })
        } else if (password != confirmPassword) {
            return res.status(200).json({
                status: "ERR",
                message: "The password is not equal confirmPassword"
            })
        } else if (role == "Recruiter") {
            if (!nameCompany || !addressCompany) {
                return res.status(200).json({
                    status: "ERR",
                    message: "Input is required"
                })
            }
        }

        const response = await UserService.createUser(req.body)
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmai = reg.test(email)

        if (!email || !password) {
            return res.status(200).json({
                status: "ERR",
                message: "Input is required"
            })
        } else if (!isCheckEmai) {
            return res.status(200).json({
                status: "ERR",
                message: "Input must be email"
            })
        }

        const response = await UserService.loginUser(req.body)
        const { refresh_token, ...newResponse } = response
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: false,
            samsite: 'strict'
        })
        return res.status(200).json(newResponse)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const logoutUser = async (req, res) => {
    try {
        req.clearCookie('refresh_token')
        return res.status(200).json({
            status: "OK",
            message: 'Logout successfully'
        })
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            return res.status(200).json({
                status: "ERR",
                message: "Input is required"
            })
        }
        const response = await UserService.updateUser(req.params.idUser, req.body)
        return res.status(200).json(response)

    } catch (e) {
        console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}

const sendMailEmployer = async (req, res) => {
    try {
        const {topic, content} = req.body
        if(!topic || !content){
            return res.status(200).json({
                status: "ERR",
                message: "Input is required"
            })
        }
        const response = await UserService.sendMailEmployer(req.params.idUser, req.params.emailEmployer, req.body)
        return res.status(200).json(response)

    } catch (e) {
        console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createUser,
    loginUser,
    logoutUser,
    updateUser,
    sendMailEmployer,
}