const request = require("request");
const fetch = require("node-fetch");
const momentTz = require("moment-timezone");
import Model from "../models";
const { Customers, PaymentAccounts, Transactions, ForeignBanks } = Model;
const crypto = require("crypto");
import config from "../../config";
const FEE_VALUE = 5000;
const sha256 = require("sha256");
const NodeRSA = require("node-rsa");
const md5 = require("md5");
import { v4 as uuidv4 } from "uuid";
import { type } from "os";
const openpgp = require("openpgp");

const myPrivateKey = new NodeRSA(config.myPrivateKey);
const pgpPrivateKey = `-----BEGIN PGP PRIVATE KEY BLOCK-----
Version: Keybase OpenPGP v1.0.0
Comment: https://keybase.io/crypto

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
l+EtK+zqedJ4iuTolH1XLZCrJA==
=o8/v
-----END PGP PRIVATE KEY BLOCK-----`;

const pgpPublicKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: Keybase OpenPGP v1.0.0
Comment: https://keybase.io/crypto

xo0EXxyv0AEEAPUXPFl09V5SBHaT5x1yq2a6hZ/HC1BNnI1jo1nMTEOcN/7b7pz2
fH9FGL2Teg8WTimFn4kpKcS/FpZrY95wDK64p+8IyTCm0I2pZU56/B5XNsXXVUsd
9RErlLyu+/Dt62eHiUpRwR2zQjn62VsQVJXd/TNN9GlcjCUaBzxj3mErABEBAAHN
HEhITCBCYW5rIDxoaGxiYW5rQGdtYWlsLmNvbT7CrQQTAQoAFwUCXxyv0AIbLwML
CQcDFQoIAh4BAheAAAoJEESJcFGUfAoM9L0D/jAr1uH3biCqdDwzcLSgxMQEoyTC
8Bbgp2MD32928sWW1eX3IL7tVbLo5oH9WRub+CPCOpjXHMu5iMeqmVz5om0kEF2G
7+1Sg+amF/a+pdCb9hBGL/bvqQiiLGzjdJOuDiw+Cqt7887J6X87zfyOJ+TWRQqR
gRE1mfVp4a9rgVwozo0EXxyv0AEEAMmzM/nzYfB9M+IyRppmMac1ecOuZ1XFxU7A
cywITocFi+/5kCKMXzD5OdnOkFk6kDEHacioXMS/wIqAZoZYU6OBP+ngAzREEtDf
TNbTOWro2iLzYGVk92CJsF1xkedr7qY6THWEibUYOvW4nZvNV67GhBNHpKGt35kx
FdtKhiaHABEBAAHCwIMEGAEKAA8FAl8cr9AFCQ8JnAACGy4AqAkQRIlwUZR8Cgyd
IAQZAQoABgUCXxyv0AAKCRBVVH0rleQ2v012BAC4hLOUQr6RrKsBfn9TUwNIqL2B
uBSIVrwCFdo7sX1rI4blgM0ilpVt4GIU4ZqvpIYaBDp+tXdgbRHs0wEtvaRZNnF3
++kqJ5ye28TVQy8qAovHEFiv2VTfTFWn57hsNtQ7DGiFuCUPR2LgnYVN4mgNwLGz
5oonvHWgmxIVAR1JGfP8A/9MGZayrGSjesqyxK47b77MSp3pTDlRxETSokAWqcmG
sd2PMNxiLn+hIs8V3Xu5m1mgc0EK6QGImWrSPZNT14rB4UuZcPKjBAO+9LSZpbL+
JHrTpR0Px0cdqqSTOTJqrE5hfVEHLcrPAwExBfW4NoeVcPrshDbxveI0QCyQhc62
w86NBF8cr9ABBADbmOv/sIUY5Vk05CZ+g0cJL7XaCOjsHf26/w6l0f0WoNjuA8aD
u91S1YlIJN7sEo2FrfuHTy9cUKZUAVjHjvOSuU/d6MKK8swNWKGg5u+evfXBS7J5
ytF4RwiWZJ7zMJafuteqhYVRC4UwiYbt24Jh4TPcQrddPciG/I/BJQnV9wARAQAB
wsCDBBgBCgAPBQJfHK/QBQkPCZwAAhsuAKgJEESJcFGUfAoMnSAEGQEKAAYFAl8c
r9AACgkQQqWyhFc2rTJD2AQAsPUgp/nCF+tc8nbx+1rc2JkxH7P778CzgO1Kpk55
ZhQdGNXC2IkBvGdkPpvoebFIeO8nowdQP/bxvztOoW9rNmPUM72idYlPi9x5DShS
elWiqnxmGfwrxxy/Itmrg4ZF7A0YAJN7tHfzyC45N65mk9u75vILG5a4ynu9+oiX
o+JqugP/SCDFZ+lZnb8TojSr5641LcVF/kf7QZ8ui0QHM3B3oyEJ/qt7tr2V4ACT
SIBTOxMjTD3enrGRFbd5zefS4x/UbIaQe1DLAWxbR2/1Ezk7pmz1MUmJ8yz2zO6N
Ir0plfHmrZOmL53hU2vLLwT61JfhLSvs6nnSeIrk6JR9Vy2QqyQ=
=juyG
-----END PGP PUBLIC KEY BLOCK-----`;

const getAllPartner = async (req, res) => {
  const partner = await ForeignBanks.findAll({});
  return res.status(200).send({
    status: "Success.",
    payload: partner,
  });
};

const getPartnerInfo = async (req, res) => {
  const idFromParam = req.params;

  if (!idFromParam) {
    return res.status(404).send({
      message: "No id.",
    });
  }

  const stk = req.body.stk;

  if (stk === undefined || stk === "") {
    return res.status(400).send({
      message: "stk is required.",
    });
  }
  const partnerBank = await ForeignBanks.findAll({
    where: {
      id: idFromParam.id,
    },
  });

  if (partnerBank.length === 0) {
    return res.status(404).send({
      message: "Not found bank.",
    });
  } else {
    if (partnerBank[0].id === 2) {
      const x_timestamp = Date.now();
      const secret_key = partnerBank[0].localSecretKey;
      const body = {
        data: {
          usernameID: stk,
        },
      };
      const hash_signature = md5(x_timestamp + body + secret_key);
      const headers = {
        company_id: partnerBank[0].localCompanyID,
        timestamp: x_timestamp,
        "x-signature": hash_signature,
      };

      const options = {
        url: partnerBank[0].urlInfo,
        headers,
        method: "POST",
        body,
        json: true,
      };

      const callback = (err, response, body) => {
        if (err) throw err;
        res.json(body);
      };

      request(options, callback);
    }

    if (partnerBank[0].id === 3) {
      const secret_key = partnerBank[0].localSecretKey;
      const stk_thanh_toan = req.body.stk;
      const body = {
        stk_thanh_toan,
      };
      const x_timestamp = momentTz()
        .tz("Asia/Ho_Chi_Minh")
        .format("YYYY-MM-DD HH:mm:ss");
      const x_partner_code = partnerBank[0].localCompanyID;
      const str =
        JSON.stringify(body) + x_timestamp + secret_key + x_partner_code;
      const x_sign = sha256(str);
      const headers = {
        "Content-Type": "application/json",
        "x-partner-code": x_partner_code,
        "x-timestamp": x_timestamp,
        "x-sign": x_sign,
      };
      const url = partnerBank[0].urlInfo;
      const options = {
        url: url,
        headers,
        method: "POST",
        body,
        json: true,
      };
      const callback = (err, response, body) => {
        if (err) throw err;
        res.json(body);
      };

      request(options, callback);
    }
    if (partnerBank[0].id === 4) {
      const timeStamp = Date.now();
      const requestID = uuidv4();
      const partnerId = partnerBank[0].localCompanyID;
      const cardNumber = Number(req.body.stk);

      const hash = crypto
        .createHmac("sha256", config.pgpRequestSecretKey)
        .update(
          `cardNumber=${cardNumber}&partnerCode=${partnerId}&requestId=${requestID}&requestTime=${timeStamp}`
        )
        .digest("hex");
      const body = {
        cardNumber: cardNumber,
        partnerCode: partnerId,
        requestId: requestID,
        requestTime: timeStamp,
        hash: hash,
      };
      console.log(body);
      const headers = {
        "Content-Type": "application/json",
      };

      const options = {
        url: partnerBank[0].urlInfo,
        headers,
        method: "POST",
        body,
        json: true,
      };

      const callback = (err, response, body) => {
        if (err) throw err;
        res.json(body);
      };

      request(options, callback);
    }
  }
};

let transactionPartner = async (req, res) => {
  const idFromParam = req.params;

  if (!idFromParam) {
    return res.status(404).send({
      message: "No id.",
    });
  }
  const to_number = Number(req.body.to);

  const partnerBank = await ForeignBanks.findAll({
    where: {
      id: idFromParam.id,
    },
  });

  if (partnerBank.length === 0) {
    return res.status(404).send({
      message: "Not found bank.",
    });
  }

  const customer = await Customers.findAll({
    where: {
      email: req.jwtDecoded.data.email,
    },
    attributes: { exclude: ["password"] },
  });
  const sourceAccount = await PaymentAccounts.findAll({
    where: {
      customerId: customer[0].id,
    },
  });
  let newBalance = sourceAccount[0].balance;
  if (req.body.type === 1) {
    //Phí giao dịch do người gửi trả
    newBalance = newBalance - Number(req.body.amount) - FEE_VALUE;
  } else {
    newBalance = newBalance - Number(req.body.amount);
  }
  if (newBalance < 0) {
    res.status(400).send({
      message: "Not enough balance.",
    });
  }
  if (partnerBank[0].id === 2) {
    const x_timestamp = Date.now();
    const dataVerify = {
      ts: x_timestamp,
      source_username: sourceAccount[0].accountNumber,
      value: req.body.amount,
    };
    const signature = myPrivateKey.sign(dataVerify, "base64", "utf8");
    const body = {
      data: {
        des_username: req.body.to,
        value: req.body.amount,
        message: req.body.description,
        bank_company_id: partnerBank[0].localCompanyID,
        type: req.body.type,
        source_username: sourceAccount[0].accountNumber,
        source_name: customer[0].name,
        signature: signature,
      },
    };

    const secret_key = partnerBank[0].localSecretKey;
    const hash_signature = md5(x_timestamp + body + secret_key);
    const headers = {
      company_id: partnerBank[0].localCompanyID,
      timestamp: x_timestamp,
      "x-signature": hash_signature,
    };
    const options = {
      url: partnerBank[0].urlTransaction,
      headers,
      method: "POST",
      body,
      json: true,
    };

    const callback = (err, response, body) => {
      if (err) throw err;
      else {
        if (body.data.success === true) {
          let publicKey = new NodeRSA(partnerBank[0].foreignPublicKey);
          let verify = publicKey.verify(
            body.data,
            body.signature,
            "utf8",
            "base64"
          );
          if (verify === true) {
            PaymentAccounts.update(
              { balance: Number(newBalance) },
              {
                where: {
                  accountNumber: sourceAccount[0].accountNumber,
                },
              }
            );
            Transactions.create({
              accountNumber: sourceAccount[0].accountNumber,
              receiverNumber: req.body.to,
              amount: Number(req.body.amount),
              description: req.body.description,
              type: "LIEN NGAN HANG",
              bankId: partnerBank[0].id,
              sign: body.signature,
            });
            res.json(body);
          } else {
            // xac thuc that bai => response co the khong tin cay
            body.msg = "authentication rsaSign failed";
            res.json(body);
          }
        } else {
          res.json(body);
        }
      }
    };

    request(options, callback);
  }

  if (partnerBank[0].id === 3) {
    const body = {
      stk_nguoi_gui: sourceAccount[0].accountNumber,
      stk_thanh_toan: req.body.to,
      soTien: Number(req.body.amount),
      noi_dung: req.body.description,
      ten_nguoi_gui: customer[0].name,
    };
    const x_timestamp = momentTz()
      .tz("Asia/Ho_Chi_Minh")
      .format("YYYY-MM-DD HH:mm:ss");
    const x_partner_code = partnerBank[0].localCompanyID;
    const secret_key = partnerBank[0].localSecretKey;
    const str =
      JSON.stringify(body) + x_timestamp + secret_key + x_partner_code;
    const x_sign = sha256(str);
    let headers = {
      "Content-Type": "application/json",
      "x-partner-code": x_partner_code,
      "x-timestamp": x_timestamp,
      "x-sign": x_sign,
    };
    const timestamp = headers["x-timestamp"];
    let privateKey = new NodeRSA(config.myPrivateKey);
    let signRsa = privateKey.sign(timestamp, "base64", "utf8");

    headers["x-rsa-sign"] = signRsa;

    const url = partnerBank[0].urlTransaction;

    const options = {
      url: url,
      headers,
      method: "POST",
      body,
      json: true,
    };

    const callback = (err, response, body) => {
      if (err) throw err;
      if (body.status === 1) {
        const rsaSignRes = body.rsaSign;
        const ts = body.timeStamp;
        if (rsaSignRes === undefined || ts === undefined) return res.json(body);

        let publicKey = new NodeRSA(partnerBank[0].foreignPublicKey);
        let verify = publicKey.verify(ts, rsaSignRes, "utf8", "base64");
        if (verify === true) {
          // xac thuc thanh cong => chuyen tien thanh cong
          PaymentAccounts.update(
            { balance: Number(newBalance) },
            {
              where: {
                accountNumber: sourceAccount[0].accountNumber,
              },
            }
          );
          Transactions.create({
            accountNumber: sourceAccount[0].accountNumber,
            receiverNumber: req.body.to,
            amount: Number(req.body.amount),
            description: req.body.description,
            type: "LIEN NGAN HANG",
            bankId: partnerBank[0].id,
            sign: body.rsaSign,
          });
          res.json(body);
        } else {
          // xac thuc that bai => response co the khong tin cay
          body.msg = "authentication rsaSign failed";
          res.json(body);
        }
      } else {
        res.json(body);
      }
    };

    request(options, callback);
  }
  if (partnerBank[0].id === 4) {
    const timeStamp = Date.now();
    const requestID = uuidv4();
    const myBankCode = partnerBank[0].localCompanyID;
    const passphrase = `123456`;
    const fromNumber = Number(sourceAccount[0].accountNumber);
    const value = Number(req.body.amount);
    const typeFee = req.body.type;
    const cardName = customer[0].name;
    const hash_data = `bankCode=MY_BANK&cardName=${cardName}&from=${fromNumber}&isTransfer=true&merchantCode=${myBankCode}&requestId=${requestID}&requestTime=${timeStamp}&to=${to_number}&typeFee=${typeFee}&value=${value}`;
    const hash = crypto
      .createHmac("sha256", config.pgpRequestSecretKey)
      .update(hash_data)
      .digest("hex");
    const {
      keys: [privateKey],
    } = await openpgp.key.readArmored(pgpPrivateKey);
    await privateKey.decrypt(passphrase);
    const { signature: detachedSignature } = await openpgp.sign({
      message: openpgp.cleartext.fromText(hash_data), // CleartextMessage or Message object
      privateKeys: [privateKey], // for signing
      detached: true,
    });

    const body = {
      bankCode: "MY_BANK",
      description: req.body.description,
      from: fromNumber,
      isTransfer: true,
      partnerCode: myBankCode,
      requestId: requestID,
      requestTime: timeStamp,
      to: to_number,
      value: value,
      typeFee: typeFee,
      cardName: cardName,
      hash: hash,
      signature: detachedSignature,
    };
    console.log(body);

    const headers = {
      "Content-Type": "application/json",
    };

    const options = {
      url: partnerBank[0].urlTransaction,
      headers,
      method: "POST",
      body,
      json: true,
    };

    const callback = (err, response, body) => {
      if (err) throw err;
      res.json(body);
    };

    request(options, callback);
  }
};

module.exports = {
  getPartnerInfo: getPartnerInfo,
  transactionPartner: transactionPartner,
  getAllPartner: getAllPartner,
};
