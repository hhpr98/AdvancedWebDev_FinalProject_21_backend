const NodeRSA = require("node-rsa");
import Model from "../models";
const { Customers, PaymentAccounts, Transactions, ForeignBanks } = Model;
import config from "../../config";

const FEE_VALUE = 5000;
let getInfo = async (req, res) => {
  try {
    const partnerCode = req.headers["x-partner-code"];

    let partnerBank = "";

    if (!partnerCode) {
      return res.status(403).send({
        message: "Partner code is required.",
      });
    } else {
      partnerBank = await ForeignBanks.findAll({
        where: {
          foreignCompanyID: partnerCode,
        },
      });
      if (partnerBank.length === 0) {
        return res.status(404).send({
          message: "Not found your bank.",
        });
      }
    }

    const myPrivateKey = new NodeRSA(config.myPrivateKey);

    const secretKey = partnerBank[0].foreignSecretKey;
    const clientTimeTemp = req.headers["x-timestamp"];
    const clientTime = new Date(clientTimeTemp);
    const encryptedData = req.headers["x-data-encrypted"];
    const data = JSON.stringify(req.body);
    const serverTimeTemp = Date.now();
    const serverTime = new Date(serverTimeTemp);
    var checkTimeStamp = true;
    const decryptedData = myPrivateKey.decrypt(encryptedData, "utf8");
    const checkData =
      data + secretKey + clientTimeTemp + partnerBank[0].foreignCompanyID;
    const paymentIDfromBody = req.body.stk;
    //Check partner codemySecretKey
    if (!paymentIDfromBody) {
      return res.status(404).send({
        message: "Payment ID is missing.",
      });
    }
    if (!encryptedData) {
      return res.status(404).send({
        message: "Encrypt data is missing to hash.",
      });
    }

    // //Check timestamp
    // if (clientTimeTemp) {
    //   // if (serverTime.getHours() - clientTime.getHours() === 1) {
    //   //   if (serverTime.getMinutes() < 5) {
    //   //     if (serverTime.getMinutes() + 60 - clientTime.getMinutes() > 5) {
    //   //       checkTimeStamp = false;
    //   //     }
    //   //   } else {
    //   //     checkTimeStamp = false;
    //   //   }
    //   // } else {
    //   //   if (
    //   //     clientTime.getFullYear() < serverTime.getFullYear() ||
    //   //     clientTime.getMonth() < serverTime.getMonth() ||
    //   //     clientTime.getDate() < serverTime.getDate() ||
    //   //     clientTime.getHours() < serverTime.getHours() ||
    //   //     clientTime.getMinutes() < serverTime.getMinutes() - 5
    //   //   ) {
    //   //     checkTimeStamp = false;
    //   //   }
    //   // }
    //   if((serverTimeTemp - clientTimeTemp) > 300000)
    //   {
    //     checkTimeStamp = false;
    //   }
    // } else {
    //   return res.status(403).send({
    //     message: "No timestamp.",
    //   });
    // }

    //check data in body
    if (decryptedData !== checkData) {
      return res.status(401).send({
        message: "Package is changed.",
      });
    }
    //check secretKey
    if (
      decryptedData
        .toString()
        .slice(data.length, data.length + secretKey.length) !== secretKey
    ) {
      return res.status(400).send({
        message: "Secret key is invalid.",
      });
    }

    if (checkTimeStamp === true) {
      const payment = await PaymentAccounts.findAll({
        where: {
          accountNumber: req.body.stk,
        },
      });
      if (payment.length === 0) {
        return res.status(404).send({
          message: "User is not found.",
        });
      } else {
        const customers = await Customers.findAll({
          where: {
            id: payment[0].customerId,
          },
          attributes: {
            exclude: ["password", "id", "createdAt", "updatedAt", "email"],
          },
        });
        return res.status(200).json({
          status: "Success",
          data: {
            name: customers[0].name,
          },
        });
      }
    } else {
      return res.status(401).send({
        message: "Package is experied.",
      });
    }
  } catch (error) {
    return res.status(401).send({
      message: `Error: ${error}`,
    });
  }
};

let transaction = async (req, res) => {
  try {
    const partnerCode = req.headers["x-partner-code"];

    let partnerBank = "";

    if (!partnerCode) {
      return res.status(403).send({
        message: "Partner code is required.",
      });
    } else {
      partnerBank = await ForeignBanks.findAll({
        where: {
          foreignCompanyID: partnerCode,
        },
      });
      if (partnerBank.length === 0) {
        return res.status(404).send({
          message: "Not found your bank.",
        });
      }
    }
    const partnerPublicKey = new NodeRSA(partnerBank[0].foreignPublicKey);
    const myPrivateKey = new NodeRSA(config.myPrivateKey);
    const secretKey = partnerBank[0].foreignSecretKey;
    const signNature = req.headers["x-rsa-sign"];
    const clientTimeTemp = req.headers["x-timestamp"];
    const clientTime = new Date(clientTimeTemp);
    const encryptedData = req.headers["x-data-encrypted"];
    const data = JSON.stringify(req.body);
    const serverTimeTemp = Date.now();
    const serverTime = new Date(serverTimeTemp);
    var checkTimeStamp = true;
    const decryptedData = myPrivateKey.decrypt(encryptedData, "utf8");
    const checkData =
      data + secretKey + clientTimeTemp + partnerBank[0].foreignCompanyID;
    const toID = req.body.to;
    const amoutBody = Number(req.body.amount);
    const type = req.body.type; //1 là ng nhận trả, 2 là ng gửi trả
    const fromID = req.body.from;
    const description = req.body.description;
    //Check body
    if (fromID === undefined || fromID === "") {
      return res.status(404).send({
        message: "Source number is missing.",
      });
    }
    if (description === undefined || description === "") {
      return res.status(404).send({
        message: "Description is required.",
      });
    }
    if (toID === undefined || toID === "") {
      return res.status(404).send({
        message: "Destination number is missing.",
      });
    }
    if (amoutBody === undefined) {
      return res.status(404).send({
        message: "Amount is missing.",
      });
    }
    if (amoutBody < 5000) {
      return res.status(404).send({
        message: "Amount is not smaller 5000.",
      });
    }
    // if(Number.isInteger(amoutBody) === false)
    // {
    //     return res.status(404).send({
    //         message: 'Amount must be a number.'
    //     })
    // }
    if (type === undefined) {
      return res.status(404).send({
        message: "Type fee is missing.",
      });
    }
    if (type !== 1 && type !== 2) {
      return res.status(404).send({
        message: "Type fee is invalid",
      });
    }

    //Check timestamp
    if (clientTimeTemp) {
      // if (serverTime.getHours() - clientTime.getHours() === 1) {
      //   if (serverTime.getMinutes() < 5) {
      //     if (serverTime.getMinutes() + 60 - clientTime.getMinutes() > 5) {
      //       checkTimeStamp = false;
      //     }
      //   } else {
      //     checkTimeStamp = false;
      //   }
      // } else {
      //   if (
      //     clientTime.getFullYear() < serverTime.getFullYear() ||
      //     clientTime.getMonth() < serverTime.getMonth() ||
      //     clientTime.getDate() < serverTime.getDate() ||
      //     clientTime.getHours() < serverTime.getHours() ||
      //     clientTime.getMinutes() < serverTime.getMinutes() - 5
      //   ) {
      //     checkTimeStamp = false;
      //   }
      // }
      if (serverTimeTemp - clientTimeTemp > 300000) {
        checkTimeStamp = false;
      }
    } else {
      return res.status(403).send({
        message: "No timestamp.",
      });
    }
    //check data in body
    if (decryptedData !== checkData) {
      return res.status(401).send({
        message: "Package is changed.",
      });
    }
    //check secretKey
    if (
      decryptedData
        .toString()
        .slice(data.length, data.length + secretKey.length) !== secretKey
    ) {
      return res.status(401).send({
        message: "SecretKey is invalid.",
      });
    }

    //check rsa
    if (signNature) {
      if (checkTimeStamp === true) {
        const verify = partnerPublicKey.verify(
          data,
          signNature,
          "utf8",
          "base64"
        );
        if (verify === true) {
          const payment = await PaymentAccounts.findAll({
            where: {
              accountNumber: req.body.to,
            },
          });
          if (payment.length === 0) {
            return res.status(404).send({
              message: "User is not found.",
            });
          } else {
            const cus = await Customers.findAll({
              where: {
                id: payment[0].customerId,
              },
            });
            let newBalance = payment[0].balance;
            if (req.body.type === 2) {
              //Phí giao dịch do người nhận trả
              newBalance = newBalance + amoutBody - FEE_VALUE;
            } else {
              newBalance = newBalance + amoutBody;
            }
            await PaymentAccounts.update(
              { balance: Number(newBalance) },
              {
                where: {
                  accountNumber: req.body.to,
                },
              }
            );

            const body = {
              message: "Success.",
              name: cus[0].name,
            };
            const serverTimeToSign = Date.now();
            const severSignature = myPrivateKey.sign(
              JSON.stringify(body + serverTimeToSign),
              "base64",
              "utf8"
            );

            await Transactions.create({
              accountNumber: fromID,
              receiverNumber: toID,
              amount: Number(amoutBody),
              description: description,
              type: "LIEN NGAN HANG",
              bankId: partnerBank[0].id,
              sign: severSignature,
            });
            return res.status(200).send({
              payload: body,
              signNature: severSignature,
              timeStamp: serverTimeToSign,
            });
          }
        } else {
          return res.status(403).send({
            message: "Invalid signature.",
          });
        }
      } else {
        return res.status(401).send({
          message: "Package is experied.",
        });
      }
    } else {
      return res.status(403).send({
        message: "No signature.",
      });
    }
  } catch (error) {
    return res.status(401).send({
      message: `Error: ${error}`,
    });
  }
};
module.exports = {
  getInfo: getInfo,
  transaction: transaction,
};
