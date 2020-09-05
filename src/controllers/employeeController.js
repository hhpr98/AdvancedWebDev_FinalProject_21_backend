import Model from "../models";
import catchAsync from "../libs/catchAsync";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

const { Employees, PaymentAccounts, Transactions, Op } = Model;

//// NOTE : 2 admin mặc định, không thêm/sửa/xóa/đổi pass
// admin : admin@monca.me : abcxyz123@
// admin1 : admin1@monca.me : abcxyz123@
//// ==========================================================

export const getAllEmployees = catchAsync(async (req, res) => {
    const employees = await Employees.findAll({
        attributes: { exclude: ['password'] }
    }).filter(emp => emp.name.includes("admin") === false); // chỉ lấy employee, 2 tài khoản mặc định là admin và admin1
    return res.status(200).json({
        status: "success",
        data: employees
    });
});

// export const findOneEmployees = catchAsync(
//     async (req, res) => {
//         const _email = req.params.email;
//         const employees = await Employees.findAll({
//             where: {
//                 email: _email
//             },
//             attributes: { exclude: ['password'] }
//         });

//         if (employees.length === 0) {
//             return res.status(404).json({
//                 status: "not found"
//             });
//         }
//         else {
//             return res.status(200).json({
//                 status: "success",
//                 data: employees[0]
//             })
//         }
//     }
// );

export const createNewEmployees = catchAsync(

    async (req, res) => {
        const _name = req.body.name;
        // console.log("passHash = " + req.body.passwordHash);

        if (_name.includes("admin")) {
            return res.status(403).json({
                status: "fail",
                err: "admin key word was not permission",
            });
        }


        // check name
        if (_name === "") {
            return res.status(400).json({
                status: "fail",
                err: "name must be required."
            })
        }

        // check email
        const _email = req.body.email || "";
        if (_email === "") {
            return res.status(400).json({
                status: "fail",
                err: "email must be required",
            });
        }

        if (_email.includes("admin")) {
            return res.status(403).json({
                status: "fail",
                err: "admin key word was not permission",
            });
        }

        // check email unique
        const _mailArr = await Employees.findAll().filter(emp => emp.email === _email);
        if (_mailArr.length > 0) {
            return res.status(400).json({
                status: "fail",
                err: "email already exists."
            })
        }

        // check password
        const _password = req.body.password || "";
        if (_password === "") {
            return res.status(400).json({
                status: "fail",
                err: "password must be required",
            });
        }

        // check length password // front end làm rồi
        // if (_password.length < 6) {
        //     return res.status(400).json({
        //         status: "fail",
        //         err: "password must be at least 6 characters."
        //     });
        // }

        // hash pass
        const hash = bcrypt.hashSync(req.body.password, Number(process.env.SALT_ROUNDS) || 10);

        // create new employees
        const employees = await Employees.create(
            {
                id: uuid(),
                name: _name,
                email: _email,
                password: hash,
                ruleAccess: 1, // employee
            }
        );
        return res.status(200).json({
            status: "success",
            data: {
                id: employees.id,
                name: employees.name,
                email: employees.email,
                ruleAccess: employees.ruleAccess
            }
        });
    }
);

// Update tên thôi, mật khẩu thì có phần reset pass rồi
export const updateAnEmployees = catchAsync(

    async (req, res) => {

        // chỉ lấy email, về phần email có tồn tại hay không thì thằng front nó làm rồi (nó get email cần cập nhật)
        const _email = req.body.email || "";
        if (_email === "") {
            return res.status(400).json({
                status: "fail",
                err: "email must be required.",
            });
        }

        // check name
        const _name = req.body.name || "";
        if (_name.includes("admin")) {
            return res.status(403).json({
                status: "fail",
                err: "admin key word was not permission",
            });
        }

        // update employees
        const employees = await Employees.update(
            {
                name: _name
            }, {
            where: {
                email: _email,
            }
        }
        );

        if (Number(employees[0]) === 0) {
            return res.status(400).json({
                status: "fail",
                err: "update fail.",
            });
        }

        return res.status(200).json({
            status: "success",
            data: {
                name: _name,
                email: _email,
                ruleAccess: 1
            }
        });
    }
);

// Reset password
export const resetPasswordAnEmployees = catchAsync(

    async (req, res) => {

        // chỉ lấy email, về phần email có tồn tại hay không thì thằng front nó làm rồi (nó get email cần cập nhật)
        const _email = req.body.email || "";
        if (_email === "") {
            return res.status(400).json({
                status: "fail",
                err: "email must be required.",
            });
        }

        // check password: không check, để front end làm, tránh tải cho backend
        const _password = req.body.password || "";

        // hash pass
        const hash = bcrypt.hashSync(_password, Number(process.env.SALT_ROUNDS) || 10);

        // update employees
        const employees = await Employees.update(
            {
                password: hash
            }, {
            where: {
                email: _email,
            }
        }
        );

        if (Number(employees[0]) === 0) {
            return res.status(400).json({
                status: "fail",
                err: "update fail.",
            });
        }

        return res.status(200).json({
            status: "success",
            data: {
                email: _email,
                ruleAccess: 1
            }
        });
    }
);

// delete an employees
export const deleteAnEmployees = catchAsync(

    async (req, res) => {

        // chỉ lấy email, về phần email có tồn tại hay không thì thằng front nó làm rồi (nó get email cần cập nhật)
        const _email = req.body.email || "";
        if (_email === "") {
            return res.status(400).json({
                status: "fail",
                err: "email must be required."
            });
        }

        // find employees
        const employees = await Employees.findOne({
            where: {
                email: _email,
            }
        }); // chắc chắn tìm thấy, vì email này lấy từ front end
        // nhưng nhỡ bị gì thì sao => báo lỗi
        if (employees === null) {
            return res.status(400).json({
                status: "fail",
                err: "email is not found."
            });
        }

        await employees.destroy();

        return res.status(200).json({
            status: "success",
            data: {
                email: _email
            }
        });
    }
);

export const historyTransaction = catchAsync(
    async (req, res) => {

        const _accountnumber = req.body.accountnumber || "";
        if (_accountnumber === "") {
            return res.status(400).json({
                status: "fail",
                err: "account number must be required."
            });
        }

        const _payment = await PaymentAccounts.findOne({
            where: {
                accountNumber: _accountnumber
            }
        });

        if (_payment === null) {
            return res.status(400).json({
                status: "fail",
                err: "account number is not exists."
            });
        }

        // Giao dịch nhận tiền
        const _recTrans = await Transactions.findAll({
            where: {
                receiverNumber: _accountnumber
            },
            attributes: ["id", ["receiverNumber", "accountNumber"], ["accountNumber", "receiverFrom"], "amount", "description", "type", "createdAt"]
        }).filter(pay => pay.type !== 'THANH TOAN NHAC NO');

        // Giao dịch chuyển tiền
        const _payTrans = await Transactions.findAll({
            where: {
                accountNumber: _accountnumber
            },
            attributes: {
                exclude: ["bankId", "sign", "updatedAt"]
            }
        }).filter(pay => pay.type !== 'THANH TOAN NHAC NO');

        // giao dịch thanh toán nhắc nợ
        const _debtTrans = await Transactions.findAll({
            where: {
                accountNumber: _accountnumber
            },
            attributes: {
                exclude: ["bankId", "sign", "updatedAt"]
            }
        }).filter(pay => pay.type === 'THANH TOAN NHAC NO');

        // giao dịch được thanh toán nhắc nợ
        const _beDebtTrans = await Transactions.findAll({
            where: {
                receiverNumber: _accountnumber
            },
            attributes: ["id", ["receiverNumber", "accountNumber"], ["accountNumber", "receiverFrom"], "amount", "description", "type", "createdAt"]
        }).filter(pay => pay.type === 'THANH TOAN NHAC NO');

        return res.status(200).json({
            status: "success",
            data: {
                // nhận tiền từ người khác
                receiverTransaction: _recTrans,
                // chuyển tiền cho người khác
                paymentTransaction: _payTrans,
                // thanh toán nhắc nợ cho người khác
                debtReminderPaymentTransaction: _debtTrans,
                // được thanh toán nhắc nợ từ người khác
                beDebtReminderPaymentTransaction: _beDebtTrans
            }
        });

    }
);

export const getAllTransaction = catchAsync(
    async (req, res) => {
        const _trans = await Transactions.findAll({
            attributes: {
                exclude: ['id', 'bankId', 'sign']
            }
        });

        return res.status(200).json({
            status: "success",
            data: _trans
        });
    }
);

export const getForeignTransactionOne = catchAsync(
    async (req, res) => {
        // Time
        const _fromDate = req.body.from || "";
        if (_fromDate === "") {
            return res.status(400).json({
                status: "fail",
                err: "from date must be required."
            });
        }

        const _toDate = req.body.to || "";
        if (_toDate === "") {
            return res.status(400).json({
                status: "fail",
                err: "to date must be required."
            });
        }

        const _bankId = req.body.bankid || "";
        if (_bankId === "") {
            return res.status(400).json({
                status: "fail",
                err: "bank id must be required."
            });
        }

        const _trans = await Transactions.findAll({
            where: {
                bankId: _bankId,
                createdAt: {
                    [Op.between]: [_fromDate, _toDate]
                }
            },
            attributes: {
                exclude: ['bankId', 'sign']
            }
        });

        var _total = Number(0);
        _trans.forEach(tran => _total = _total + Number(tran.amount));

        return res.status(200).json({
            status: "success",
            data: {
                transactions: _trans,
                total: _total
            }
        });
    }
);

export const getForeignTransactionAll = catchAsync(
    async (req, res) => {
        // Time
        const _fromDate = req.body.from || "";
        if (_fromDate === "") {
            return res.status(400).json({
                status: "fail",
                err: "from date must be required."
            });
        }

        const _toDate = req.body.to || "";
        if (_toDate === "") {
            return res.status(400).json({
                status: "fail",
                err: "to date must be required."
            });
        }

        const _trans = await Transactions.findAll({
            where: {
                createdAt: {
                    [Op.between]: [_fromDate, _toDate]
                }
            },
            attributes: {
                exclude: ['bankId', 'sign']
            }
        }).filter(tran => tran.type === "LIEN NGAN HANG");

        var _total = Number(0);
        _trans.forEach(tran => _total = _total + Number(tran.amount));

        return res.status(200).json({
            status: "success",
            data: {
                transactions: _trans,
                total: _total
            }
        });
    }
);