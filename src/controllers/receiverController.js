import Model from "../models";
import catchAsync from "../libs/catchAsync";
const fetch = require("node-fetch");

const { Receivers, PaymentAccounts, Customers, ForeignBanks } = Model;

export const getAllReceivers = catchAsync(async (req, res) => {
  const _userId = req.jwtDecoded.data.id;
  const _customers = await Receivers.findAll({
    where: {
      userId: _userId,
    },
    attributes: {
      exclude: ["id", "userId", "receiverId"],
    },
  });

  return res.status(200).json({
    status: "success",
    data: _customers,
  });
});

export const addReceiver = catchAsync(async (req, res) => {
  const _userId = req.jwtDecoded.data.id;
  var bankId = null;
  const tokenFromClient =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.header("Authorization")?.replace("Bearer ", "");

  const _accountNumber = req.body.accountnumber || "";
  if (_accountNumber === "") {
    return res.status(400).json({
      status: "fail",
      err: "account number must be required.",
    });
  }

  //Check existed
  const _numberInDB = await Receivers.findAll({
    where: {
        userId: _userId,
        accountNumber: _accountNumber,
      },
  })

  if(_numberInDB.length !== 0)
  {
    return res.status(400).json({
        status: "fail",
        err: "account number is existed.",
      });
  }

  const _accountInfo = await PaymentAccounts.findOne({
    where: {
      customerId: _userId
    }
  })

  if(_accountInfo.accountNumber === _accountNumber){
    return res.status(400).json({
      status: "fail",
      err: "Bạn không thể thêm chính mình",
    });
  }
  var _idRec = "";
  const _memorizeName = req.body.memoryname || "";
  var _nameFromBank = "";
  const _type = req.body.type || "NOI BO";
  
  if (_type === "NOI BO") {
    // Tìm receiver id
    const _payment = await PaymentAccounts.findOne({
      where: {
        accountNumber: _accountNumber,
      },
    });
    if (_payment === null) {
      return res.status(400).json({
        status: "fail",
        err: "account number does not exists.",
      });
    }

    const customer = await Customers.findOne({
      where: {
        id: _payment.customerId
      }
    })
    _nameFromBank = customer.name
    _idRec = _payment.customerId;
  }
  if (_type === "LIEN NGAN HANG") {
    await fetch("https://api.monca.me/v1/partner/info/2", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + tokenFromClient,
      },
      body: JSON.stringify({
        stk: _accountNumber,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        _nameFromBank = res.data.name;
        bankId = 2;
      })
      .catch((err) => console.log(err));

    if (_nameFromBank === "") {
      await fetch("https://api.monca.me/v1/partner/info/3", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + tokenFromClient,
        },
        body: JSON.stringify({
          stk: _accountNumber,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          _nameFromBank = res.ten;
          bankId = 3;
        })
        .catch((err) => console.log(err));
    }
  }

  //kiểm tra _memorizeName lần nữa
  if (_nameFromBank === "" || _nameFromBank === undefined) {
    return res.status(400).json({
      status: "fail",
      err: "account number does not exists.",
    });
  }

  let _nameToSave = "";
  if (_memorizeName === "" || _memorizeName === undefined) {
    _nameToSave = _nameFromBank;
  } else {
    _nameToSave = _memorizeName;
  }
  let _bank;
  let _bankName = null;
  if(bankId !== null){
    _bank = await ForeignBanks.findOne({
      where: {
        id: bankId
      }
    });

    _bankName = _bank.bankingName;
  }
  const _receiver = await Receivers.create({
    userId: _userId,
    receiverId: _idRec === "" ? null : _idRec,
    accountNumber: _accountNumber,
    memorizeName: _nameToSave,
    type: _type,
    bankId: bankId,
    bankName: _bankName
  });

  return res.status(200).json({
    status: "success",
    data: _receiver,
  });
});

export const editReceiver = catchAsync(async (req, res) => {
  const _userId = req.jwtDecoded.data.id;

  
  const tokenFromClient =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.header("Authorization")?.replace("Bearer ", "");

  const _accountNumber = req.body.accountnumber || "";
  if (_accountNumber === "") {
    return res.status(400).json({
      status: "fail",
      err: "account number must be required.",
    });
  }

  const _memorizeName = req.body.memoryname || "";
  var _nameFromBank = "";
  const _type = req.body.type || "NOI BO";

  if (_type === "NOI BO") {
    // Tìm receiver id
    const _payment = await PaymentAccounts.findOne({
      where: {
        accountNumber: _accountNumber,
      },
    });
    if (_payment === null) {
      return res.status(400).json({
        status: "fail",
        err: "account number does not exists.",
      });
    }

    const customer = await Customers.findOne({
      where: {
        id: _payment.customerId
      }
    })
    _nameFromBank = customer.name
  }
  if (_type === "LIEN NGAN HANG") {
    await fetch("https://api.monca.me/v1/partner/info/2", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + tokenFromClient,
      },
      body: JSON.stringify({
        stk: _accountNumber,
      }),
    })
      .then((response) => response.json())
      .then((res) => _nameFromBank = res.data.name)
      .catch((err) => console.log(err));

    if (_nameFromBank === "") {
      await fetch("https://api.monca.me/v1/partner/info/3", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + tokenFromClient,
        },
        body: JSON.stringify({
          stk: _accountNumber,
        }),
      })
        .then((response) => response.json())
        .then((res) => (_nameFromBank = res.ten))
        .catch((err) => console.log(err));
    }
  }

  //kiểm tra _memorizeName lần nữa
  if (_nameFromBank === "" || _nameFromBank === undefined) {
    return res.status(400).json({
      status: "fail",
      err: "account number does not exists.",
    });
  }

  let _nameToSave = "";
  if (_memorizeName === "" || _memorizeName === undefined) {
    _nameToSave = _nameFromBank;
  } else {
    _nameToSave = _memorizeName;
  }

  const up = await Receivers.update(
    {
      memorizeName: _nameToSave,
    },
    {
      where: {
        userId: _userId,
        accountNumber: _accountNumber,
      },
    }
  );

  if (Number(up) === 0) {
    return res.status(400).json({
      status: "fail",
      err: "update fail.",
    });
  }

  return res.status(200).json({
    status: "success",
    data: {
      accountNumber: _accountNumber,
      memorizeName: _nameToSave,
    },
  });
});

export const removeReceiver = catchAsync(async (req, res) => {
  const _userId = req.jwtDecoded.data.id;

  const _accountNumber = req.body.accountnumber || "";
  if (_accountNumber === "") {
    return res.status(400).json({
      status: "fail",
      err: "account number must be required.",
    });
  }

  const del = await Receivers.findOne({
    where: {
      userId: _userId,
      accountNumber: _accountNumber,
    },
  });

  // console.log(del);

  if (del === null) {
    return res.status(400).json({
      status: "fail",
      err: "could not find accountNumber.",
    });
  }

  await del.destroy();

  return res.status(200).json({
    status: "success",
  });
});
