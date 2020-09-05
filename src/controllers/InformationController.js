import Model from "../models";
import catchAsync from "../libs/catchAsync";

const { PaymentAccounts, Customers } = Model;

export const getMyInforBaseOnJwt = catchAsync(
    async (req, res) => {
        const _userId = req.jwtDecoded.data.id;

        const retData = await Customers.findOne({
            where: {
                id: _userId,
            },
            attributes: {
                exclude: ['password', 'updatedAt']
            }
        });

        return res.status(200).json({
            status: "success",
            data: retData
        })
    }
)

export const getInforBaseOnPaymentAccount = catchAsync(
    async (req, res) => {

        const _accountnumber = req.body.accountnumber || "";
        if (_accountnumber === "") {
            return res.status(400).json({
                status: "fail",
                err: "accountnumber must be required."
            });
        }

        // Lấy id người dùng tài khoảng này
        const _pay = await PaymentAccounts.findOne({
            where: {
                accountNumber: _accountnumber
            }
        });

        if (_pay === null) {
            return res.status(400).json({
                status: "fail",
                err: "account number not found!"
            });
        }

        const _customerId = _pay.customerId;

        // Lấy thông tin người dùng
        const _cus = await Customers.findOne({
            where: {
                id: _customerId
            }
        });

        res.status(200).json({
            status: "success",
            data: {
                accountnumber: _accountnumber,
                name: _cus.name,
                id: _cus.id,
                email: _cus.email,
                phone: _cus.phonenumber,
                address: _cus.address
            }
        });

    }
);