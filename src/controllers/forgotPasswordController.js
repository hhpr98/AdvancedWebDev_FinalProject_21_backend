import Model from "../models";
import catchAsync from "../libs/catchAsync";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

const { Customers, OTPCustomers } = Model;

export const sendOTP = catchAsync(
    async (req, res) => {

        const _email = req.body.email;
        if (_email === "") {
            return res.status(400).json({
                status: "fail",
                err: "email must be required."
            });
        }

        // check email có tồn tại
        const _cus =   await Customers.findOne({
            where: {
                email: _email
            }
        });
        if (_cus === null) {
            return res.status(400).json({
                status: "fail",
                err: "email does not exists."
            });
        }

        // send OTP
        let transporter = nodemailer.createTransport({
            service: 'Sendgrid',
            auth: {
                user: process.env.SENDGRID_USERNAME || "nguyenhuuhoa98@yahoo.com",
                pass: process.env.SENDGRID_PASSWORD || "abcxyz123@"
            },
        });

        // random code
        const ran = Math.floor(Math.random() * 1000000);
        const _code = ran.toString().padStart(6, "0"); // đúng 6 chữ số , nếu k đủ thêm các số 0 vào đầu

        const _name = _cus?.name;

        const _text = "Dear " + _name + "!\n\n"
            + "You must be entered an OTP to verify your action!<p>\n"
            + "Your code is: " + _code
            + "The OTP is expired in 5 minutes!";

        const _html = "<h2>Dear <b style = 'color:red;'>" + _name + "</b> !</h2>"
            + "<p>You must be entered this OTP to verify your action!<p>"
            + "<h4>Your code is: </h4>"
            + "<h3 style='color:white;background-color:black;width:200px;font-size:20px;'>" + _code + "</h3>"
            + "<p>The OTP is expired in <b style='font-size:17px;'>5</b> minutes!<p>";

        const _update = await OTPCustomers.update({
            OTP: _code,
            timeSend: Date.now(),
        }, {
            where: {
                email: _email
            }
        });

        if (_update[0] === 0) {
            return res.status(400).json({
                status: "fail",
                err: "update otp for verify fail. please check database update."
            });
        }

        await transporter.sendMail({
            from: process.env.SENDER || "nguyenhuuhoa1998@gmail.com", // sender address
            to: _email, // list of receivers
            subject: "Hello " + _name + " ✔ OTP verify", // Subject line
            text: _text, // plain text body
            html: _html, // html body
        });

        res.status(200).json({
            status: "sucess",
            message: 'A verification email has been sent to ' + _email + '.'
        })

    }
);

export const verifyCode = catchAsync(
    async (req, res) => {
        const _otp = req.body.code || "";
        if (_otp === "") {
            return res.status(400).json({
                status: "fail",
                err: "an OTP code must be required."
            });
        }

        const _email = req.body.email;
        if (_email === "") {
            return res.status(400).json({
                status: "fail",
                err: "email must be required."
            });
        }

        // check email có tồn tại
        const _cus = await Customers.findOne({
            where: {
                email: _email
            }
        });
        if (_cus === null) {
            return res.status(400).json({
                status: "fail",
                err: "email does not exists."
            });
        }

        const _otpFind = await OTPCustomers.findOne({
            where: {
                email: _email
            }
        });

        const otpCode = _otpFind.OTP;
        const _timeStart = _otpFind.timeSend;

        if (_otp !== otpCode) {
            return res.status(400).json({
                status: "fail",
                err: "wrong OTP."
            });
        }

        const millis = Date.now() - _timeStart;
        const min = Math.floor(millis / 1000);
        if (min > 60 * 5) { // 5 minutes
            return res.status(400).json({
                status: "fail",
                err: "expired OTP code."
            });
        }

        return res.status(200).json({
            status: "success"
        });
    }
);

export const createNewPassword = catchAsync(
    async (req, res) => {

        const _email = req.body.email;
        if (_email === "") {
            return res.status(400).json({
                status: "fail",
                err: "email must be required."
            });
        }

        // check email có tồn tại
        const _cus = await Customers.findOne({
            where: {
                email: _email
            }
        });
        if (_cus === null) {
            return res.status(400).json({
                status: "fail",
                err: "email does not exists."
            });
        }

        const _newpassword = req.body.newpassword || "";
        if (_newpassword === "") {
            return res.status(400).json({
                status: "fail",
                err: "new password must be required."
            })
        }

        if (_newpassword.length < 6) {
            return res.status(400).json({
                status: "fail",
                err: "new password must be at least 6 characters."
            });
        }

        // hash new password
        const hash = bcrypt.hashSync(_newpassword, Number(process.env.SALT_ROUNDS) || 10);

        // update password
        const up = await Customers.update({
            password: hash
        }, {
            where: {
                email: _email
            },
            attributes: { exclude: ['password'] }
        });

        if (up[0] === 0) {
            return res.status(400).json({
                status: "fail",
                err: "update fail."
            });
        }

        return res.status(200).json({
            status: "success",
        });
    }
);