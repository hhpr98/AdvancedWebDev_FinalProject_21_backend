import catchAsync from "../libs/catchAsync";
import nodemailer from "nodemailer";
import Model from "../models";

const { OTPCustomers } = Model;

export const sendOTP = catchAsync(

    async (req, res) => {
        // create reusable transporter object using Sendgird Transport
        let transporter = nodemailer.createTransport({
            service: 'Sendgrid',
            auth: {
                user: process.env.SENDGRID_USERNAME || "nguyenhuuhoa98@yahoo.com",
                pass: process.env.SENDGRID_PASSWORD || "abcxyz123@"
            },
        });

        // send mail with defined transport object
        // Lưu ý config indentify sender (cấu hình người gửi) ở trang sendgrid

        // get email
        const _email = req.jwtDecoded.data.email;

        // random code
        const ran = Math.floor(Math.random() * 1000000);
        const _code = ran.toString().padStart(6, "0"); // đúng 6 chữ số , nếu k đủ thêm các số 0 vào đầu

        const _name = req.jwtDecoded.data.name;

        const _text = "Dear " + _name + "!\n\n"
            + "You must be entered an OTP to verify your action!<p>\n"
            + "Your code is: " + _code
            + "The OTP is expired in 5 minutes!";
        // console.log(_text);

        const _html = "<h2>Dear <b style = 'color:red;'>" + _name + "</b> !</h2>"
            + "<p>You must be entered your OTP to verify the transaction!<p>"
            + "<h4>Your code is: </h4>"
            + "<h3 style='color:white;background-color:black;width:200px;font-size:20px;'>" + _code + "</h3>"
            + "<p>The OTP is expired in <b style='font-size:17px;'>5</b> minutes!<p>";
        // console.log(_html);

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

        let info = await transporter.sendMail({
            from: process.env.SENDER || "nguyenhuuhoa1998@gmail.com", // sender address
            to: _email, // list of receivers
            subject: "Hello " + _name + " ✔ OTP verify", // Subject line
            text: _text, // plain text body
            html: _html, // html body
        });

        // console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        res.status(200).send('A verification email has been sent to ' + _email + '.');
    }
);

export const verifyOTP = catchAsync(
    async (req, res) => {
        const _otp = req.body.code || "";
        if (_otp === "") {
            return res.status(400).json({
                status: "fail",
                err: "an OTP code must be required."
            });
        }

        const _email = req.jwtDecoded.data.email;

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