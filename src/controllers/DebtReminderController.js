import Model from "../models";
import catchAsync from "../libs/catchAsync";

const { DebtReminders, PaymentAccounts } = Model;

export const createDebtReminders = catchAsync(
    async (req, res) => {

        // Người nhắc nợ
        const _customerId = req.jwtDecoded.data.id;

        const _payments = await PaymentAccounts.findOne({
            where: {
                customerId: _customerId
            }
        });
        const _accountnumber = _payments?.accountNumber;

        // debt account number
        const _debtaccount = req.body.debtaccount || "";
        if (_debtaccount === "") {
            return res.status(400).json({
                status: "fail",
                err: "debt account must be required."
            });
        }

        const _debtPayments = await PaymentAccounts.findOne({
            where: {
                accountNumber: _debtaccount
            }
        });

        if (_debtPayments === null) {
            return res.status(400).json({
                status: "fail",
                err: "debt account not found."
            });
        }

        // Kiểm tra người này đã bị nhắc nợ chưa :V bị rồi thì khỏi nhắc nữa
        const _checkIsUsedToBeDebt = await DebtReminders.findAll({
            where: {
                accountNumber: _accountnumber,
                debtReminderAccountNumber: _debtaccount,
                isDeleted: false,
            }
        });

        if (_checkIsUsedToBeDebt.length > 0) { // đã có người bị nhắc nợ rồi => không nhắc nữa, gửi notify là cùng
            return res.status(400).json({
                status: "fail",
                err: "you have reminder this person."
            });
        }


        // Số tiền nhắc nợ
        const _amount = req.body.amount || "";
        if (_amount === "") {
            return res.status(400).json({
                status: "fail",
                err: "amount reminder must be required."
            });
        }

        // Nội dung nhắc nợ
        const _description = req.body.description || "Hết tháng rồi, trả tiền cho tớ đi, please!";

        const _debtCreate = await DebtReminders.create({
            accountNumber: _accountnumber,
            debtReminderAccountNumber: _debtaccount,
            amount: Number(_amount),
            description: _description,
            status: "CHUA THANH TOAN",
            isDeleted: false
        });

        if (!_debtCreate) {
            return res.status(400).json({
                status: "fail",
                err: "an unknown error occurred when create debt reminder."
            });
        }

        return res.status(200).json({
            status: "success",
            data: _debtCreate
        });
    }
);

export const viewListDebtReminders = catchAsync(
    async (req, res) => {

        // Người nhắc nợ
        const _customerId = req.jwtDecoded.data.id;
        // console.log(_customerId);
        const _payments = await PaymentAccounts.findOne({
            where: {
                customerId: _customerId
            }
        });
        const _accountnumber = _payments?.accountNumber;

        // Danh sách nhắc nợ đã tạo
        const _listDebt = await DebtReminders.findAll({
            where: {
                accountNumber: _accountnumber
            },
        }).filter(item => item.isDeleted === false);

        // Danh sách bị nhắc nợ
        const _listDebtReminder = await DebtReminders.findAll({
            where: {
                debtReminderAccountNumber: _accountnumber
            },
            attributes: ['id', ['debtReminderAccountNumber', 'accountNumber'], ['accountNumber', 'debtReminderAccountNumber'], 'amount', 'description', 'status', 'isDeleted', 'createdAt', 'updatedAt']
        }).filter(item => item.isDeleted === false);

        // Trả về danh sách kết quả
        return res.status(200).json({
            status: "success",
            data: {
                listDebt: _listDebt,
                listDebtReminder: _listDebtReminder
            }
        });
    }
);

export const deleteDebtReminder = catchAsync(
    async (req, res) => {
        const _id = req.body.id || "";
        if (_id === "") {
            return res.status(400).json({
                status: "fail",
                err: "not found debt reminder."
            });
        }

        const _removeDebt = await DebtReminders.update({
            isDeleted: true
        }, {
            where: {
                id: _id
            }
        });
        // console.log(_removeDebt);

        if (_removeDebt[0] === 0) {
            return res.status(400).json({
                status: "fail",
                err: "remove debt reminder fail."
            });
        }

        return res.status(200).json({
            status: "success",
            data: {
                id: _id
            }
        });


    }
);