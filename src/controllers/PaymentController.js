import Model from "../models";
import catchAsync from "../libs/catchAsync";
import { genSaveAccountId } from "../services";

const { PaymentAccounts, SaveAccounts, Transactions, Customers, TransactionEmployees, DebtReminders } = Model;

// NOTE: 2 cái accounts payment và save giống nhau 99%

// Giao dịch chuyển tiền
export const payTransactionPaymentAccounts = catchAsync(
    async (req, res) => {

        // Người gửi
        const _customerId = req.jwtDecoded.data.id;
        const _payments = await PaymentAccounts.findOne({
            where: {
                customerId: _customerId
            }
        });
        const _sender = _payments?.accountNumber;

        // Người nhận
        const _receiver = String(req.body.receivernumber) || ""; // số tài khoản nhận
        if (_receiver === "") {
            return res.status(400).json({
                status: "fail",
                err: "receiver account number must be required."
            });
        }

        if (_sender === _receiver) {
            return res.status(400).json({
                status: "fail",
                err: "sender and receiver must be different."
            });
        }

        // Số tiền
        const _amount = req.body.amount || "";
        if (_amount === "") {
            return res.status(400).json({
                status: "fail",
                err: "amount must be required."
            });
        }

        // Nội dung
        const _description = req.body.description || "From " + _sender + " to " + _receiver + " amount " + _amount;

        // Kiểm tra số tiền còn lại có đủ chuyển
        if (Number(_payments?.balance) < Number(_amount)) {
            return res.status(400).json({
                status: "fail",
                err: "balance is not enoungh."
            });
        }

        // type
        const _type = req.body.type || "NOI BO";
        if (_type === "NOI BO" || _type === "THANH TOAN NHAC NO") {
            // get infor người nhận
            const _recAcc = await PaymentAccounts.findOne({
                where: {
                    accountNumber: _receiver
                }
            });

            if (_recAcc === null) {
                return res.status(400).json({
                    status: "fail",
                    err: "receiver " + _receiver + " not found."
                });
            }

            // Nếu là Thanh toán nhắc nợ thì kiểm tra vài thông tin trước đã
            if (_type === "THANH TOAN NHAC NO") {
                // kiểm tra xem đúng chủ nợ chưa
                const _checkIsRightDebtReminder = await DebtReminders.findAll({
                    where: {
                        accountNumber: _receiver, // người nhận = chủ nợ
                        debtReminderAccountNumber: _sender, // người bị nhắc nợ là chủ tài khoản
                        isDeleted: false, // chưa bị xóa nhắc nợ
                    }
                });

                if (_checkIsRightDebtReminder.length === 0) {
                    return res.status(400).json({
                        status: "fail",
                        err: "Người này không nhắc nợ bạn!"
                    })
                }

                // kiểm tra xem đúng số tiền không
                const _debtRecord = _checkIsRightDebtReminder[0];
                const _debAmount = _debtRecord.amount;

                if (Number(_amount) < Number(_debAmount)) {
                    return res.status(400).json({
                        status: "fail",
                        err: "Bạn phải chuyển tối thiểu " + _debAmount + " để trả nợ cho người này!"
                    });
                }

                // update status (sau khi xong transaction, xem ở dưới)
            }

            // trừ tiền người gửi
            const _newAmount = Number(_payments?.balance) - Number(_amount);
            const up = await PaymentAccounts.update({
                balance: _newAmount
            },
                {
                    where: {
                        accountNumber: _sender
                    }
                }
            );

            if (up[0] === 0) {
                return res.status(400).json({
                    status: "fail",
                    err: "update balance sender fail."
                });
            }

            // cộng tiền người nhận
            const _newAmountRec = Number(_recAcc?.balance) + Number(_amount);
            const upRec = await PaymentAccounts.update({
                balance: _newAmountRec
            },
                {
                    where: {
                        accountNumber: _receiver
                    }
                }
            );

            if (upRec[0] === 0) {
                return res.status(400).json({
                    status: "fail",
                    err: "update fail."
                });
            }


        } else if (_type === "LIEN NGAN HANG") {
            // Dành cho Ân Hòa
            // code riêng chỗ khác rồi

        } else {
            return res.status(400).json({
                status: "fail",
                err: "type must be in ['NOI BO','LIEN NGAN HANG','THANH TOAN NHAC NO']"
            });
        }

        // tạo ra transaction mới
        const _transaction = await Transactions.create({
            accountNumber: _sender,
            receiverNumber: _receiver,
            amount: _amount,
            description: _description,
            type: _type,
            bankId: req.body.bankid,
            sign: req.body.sign
        });

        // update trạng thái nếu là thanh toán nhắc nợ
        if (_type === "THANH TOAN NHAC NO") {
            const update = DebtReminders.update({
                status: "DA THANH TOAN"
            }, {
                where: {
                    accountNumber: _receiver, // người nhận = chủ nợ
                    debtReminderAccountNumber: _sender, // người bị nhắc nợ là chủ tài khoản
                    isDeleted: false, // chưa bị xóa nhắc nợ
                }
            });
        }

        return res.status(200).json({
            status: "success",
            data: {
                sender: _sender,
                receiver: _receiver,
                amount: _amount,
                type: _type,
                description: _description
            }
        });
    }
);

// Cái này là do employee mở
export const createNewSaveAccounts = catchAsync(
    async (req, res) => {

        const _accountnumber = genSaveAccountId();
        // console.log(_accountnumber);

        // find customer Id
        const _email = req.body.email || "";
        if (_email === "") {
            return res.status(400).json({
                status: "fail",
                err: "email must be required."
            });
        }

        const _cus = await Customers.findOne({
            where: {
                email: _email
            }
        });

        if (_cus === null) {
            return res.status(400).json({
                status: "fail",
                err: "email not found."
            });
        }

        const _customerId = _cus?.id;

        // check balance
        const _balance = req.body.balance || "";
        if (_balance === "") {
            return res.status(400).json({
                status: "fail",
                err: "balance must be required."
            });
        }

        if (Number(_balance) <= 0) {
            return res.status(400).json({
                status: "fail",
                err: "balance have more 0."
            });
        }

        const _exp = req.body.expired || "";
        if (_exp === "") {
            return res.status(400).json({
                status: "fail",
                err: "expired must be required."
            });
        }

        const _rate = req.body.rate || "";
        if (_rate === "") {
            return res.status(400).json({
                status: "fail",
                err: "rate must be required."
            });
        }

        const accounts = await SaveAccounts.create(
            {
                accountNumber: _accountnumber,
                customerId: _customerId,
                balance: _balance,
                expired: _exp,
                rate: _rate
            }
        );

        return res.status(200).json({
            status: "success",
            data: accounts
        });
    }
);

export const getAllAccounts = catchAsync(
    async (req, res) => {
        const _name = req.jwtDecoded.data.name;

        const _customerId = req.jwtDecoded.data.id;

        const _paymentAcc = await PaymentAccounts.findAll({
            where: {
                customerId: _customerId
            },
            attributes: {
                exclude: ['id', 'customerId', 'updatedAt']
            }
        });

        const _saveAcc = await SaveAccounts.findAll({
            where: {
                customerId: _customerId
            },
            attributes: {
                exclude: ['id', 'customerId', 'expired', 'rate', 'updatedAt']
            }
        });

        return res.status(200).json({
            status: "success",
            data: {
                name: _name,
                paymentaccount: _paymentAcc,
                saveaccount: _saveAcc
            }
        });
    }
);

export const addMoneyForCustomer = catchAsync(
    async (req, res) => {
        const _email = req.body.email || ""; // email này không thể lấy từ token, vì đây là employee nạp vào tài khoản của khách hàng
        var _accountnumber = req.body.accountnumber || "";
        var _oldbalance = 0;

        if (_accountnumber === "") {
            // không có cả email lẫn account number => fail
            if (_email === "") {
                return res.status(400).json({
                    status: "fail",
                    err: "need information: email or accountnumber of customer."
                });
            } else {
                // không có account number , có email => từ email suy ra account number
                // Tìm id từ email
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

                const _payment = await PaymentAccounts.findOne({
                    where: {
                        customerId: _cus.id
                    }
                });

                _accountnumber = _payment.accountNumber;
                _oldbalance = Number(_payment.balance);

            }
        } else {
            // ngược lại đã có account number thì kiểm tra thử nó có tồn tại không
            const _pay = await PaymentAccounts.findOne({
                where: {
                    accountNumber: _accountnumber
                }
            });

            if (_pay === null) {
                return res.status(400).json({
                    status: "fail",
                    err: "account number does not exists."
                });
            }

            _oldbalance = Number(_pay.balance);
        }

        const _amount = req.body.amount || "";
        if (_amount === "") {
            return res.status(400).json({
                status: "fail",
                err: "amount must be required."
            });
        }

        if (Number(_amount) < 0) {
            return res.status(400).json({
                status: "fail",
                err: "amount must be >= 0."
            });
        }

        // nếu đã ok hết rồi thì cập nhật lại số tiền
        const _newbalance = Number(_oldbalance) + Number(_amount);
        const _up = await PaymentAccounts.update({
            balance: _newbalance
        }, {
            where: {
                accountNumber: _accountnumber
            }
        });

        if (_up[0] === 0) {
            return res.status(400).json({
                status: "fail",
                err: "update fail."
            });
        }

        // Tạo transactions nạp tiền cho nhân viên
        await TransactionEmployees.create({
            employeeId: req.jwtDecoded.data.id || "",
            paymentTo: _accountnumber,
            amount: _amount,
            description: req.jwtDecoded.data.id + " nạp vào tài khoản " + _accountnumber + " số tiền " + _amount
        });

        return res.status(200).json({
            status: "success",
            data: {
                amount: _amount,
                balance: _newbalance
            }
        });

    }
);
