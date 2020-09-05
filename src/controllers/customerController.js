import Model from "../models";
import catchAsync from "../libs/catchAsync";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import { genPaymentAccountId } from "../services/index";

const { Customers, PaymentAccounts, Transactions, OTPCustomers } = Model;

export const getAllCustomers = catchAsync(
  async (req, res) => {
    const customers = await Customers.findAll({
      attributes: { exclude: ['password'] }
    });

    return res.status(200).json({
      status: "success",
      data: customers
    });
  });

// TẠO 1 Customer -> tạo kèm 1 payment -> quan hệ 1-1
export const createNewCustomers = catchAsync(
  async (req, res) => {

    // check name
    const _name = req.body.name || "";
    if (_name === "") {
      return res.status(400).json({
        status: "fail",
        err: "name must be required."
      });
    }

    // check email
    const _email = req.body.email || "";
    if (_email === "") {
      return res.status(400).json({
        status: "fail",
        err: "email must be required."
      });
    }

    // check email unique
    const _mailArr = await Customers.findAll().filter(cus => cus.email === _email);
    // console.log("List: ", _mailArr);  
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
        err: "password must be required."
      });
    }

    // check length password
    if (_password.length < 6) {
      return res.status(400).json({
        status: "fail",
        err: "password must be at least 6 characters."
      });
    }

    // hash password
    // console.log("SALT ROUNDS: " + process.env.SALT_ROUNDS);
    const hash = bcrypt.hashSync(req.body.password, Number(process.env.SALT_ROUNDS) || 10);

    // every is OK, create an customers
    const customers = await Customers.create(
      {
        id: uuid(),
        name: _name,
        email: _email,
        phonenumber: req.body.phonenumber || "",
        address: req.body.address || "",
        password: hash
      }
    );
    // console.log("Type of customers :" ,typeof customers);

    // Create a payment accounts : 1-1

    const payments = await PaymentAccounts.create({
      accountNumber: genPaymentAccountId(),
      customerId: customers.id,
      balance: Number(50000)
    });

    // create table otp (dùng để lưu mỗi otp)
    await OTPCustomers.create({
      email: customers.email
    });

    return res.status(200).json({
      status: "success",
      data: {
        id: customers.id,
        name: customers.name,
        email: customers.email,
        phonenumber: customers.phonenumber,
        address: customers.address,
        accountnumber: payments.accountNumber
      }
    });
  }
);

export const findOneCustomer = catchAsync(
  async (req, res) => {
    const _email = req.params.email;
    // console.log("FindOne email = " + _email);
    const customers = await Customers.findAll({
      where: {
        email: _email
      },
      attributes: { exclude: ['password'] }

    });
    // console.log(customers);
    if (customers.length === 0) {
      return res.status(404).json({
        status: "not found"
      });
    }
    else {
      return res.status(200).json({
        status: "success",
        data: customers[0]
      })
    }
  }
);

export const changePassword = catchAsync(
  async (req, res) => {
    // check password
    const _oldpassword = req.body.oldpassword || "";
    if (_oldpassword === "") {
      return res.status(400).json({
        status: "fail",
        err: "old password must be required."
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

    if (_oldpassword === _newpassword) {
      return res.status(400).json({
        status: "fail",
        err: "new password must be different with old password."
      });
    }


    // check email exists
    const customers = await Customers.findAll({
      where: {
        email: req.jwtDecoded.data.email
      },
      // attributes: {exclude: ['password']}
    });

    // check old password hash
    // console.log("hash old pass ", customers[0].password);
    const match = bcrypt.compareSync(_oldpassword, customers[0]?.password);

    if (match === false) {
      return res.status(400).json({
        status: "fail",
        err: "old password is incorect."
      })
    }

    // hash new password
    const hash = bcrypt.hashSync(_newpassword, Number(process.env.SALT_ROUNDS) || 10);

    // update password
    const up = await Customers.update({
      password: hash
    }, {
      where: {
        email: req.jwtDecoded.data.email
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

export const historyTransactionSelf = catchAsync(
  async (req, res) => {

    // Người tra cứu
    const _customerId = req.jwtDecoded.data.id;
    const _payment = await PaymentAccounts.findOne({
      where: {
        customerId: _customerId
      }
    });
    const _accountnumber = _payment?.accountNumber;

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

export const updateInfoCustomer = catchAsync(
  async (req, res) => {
    try {
      const _email = req.jwtDecoded.data.email;
      const _address = req.body.address || " ";
      const _phone = req.body.phonenumber || " ";
      const customers = await Customers.findAll({
        where: {
          email: _email
        }
      });
      if (customers.length > 0) {
        const up = await Customers.update({
          address: _address,
          phonenumber: _phone
        }, {
          where: {
            email: _email
          }
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
    } catch (err) {
      return res.status(400).json({
        status: "fail",
        err: "update fail." + err
      });
    }
  }
);