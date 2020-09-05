const jwtHelper = require("../helpers/jwt.helper");
const config = require("../../config");
import { hashSync, compare } from "bcrypt";
import Model from "../models";

const { Customers, Employees } = Model;

let tokenList = {};

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || config.accessTokenSecret;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || config.refreshTokenSecret;
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || config.accessTokenLife;
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || config.refreshTokenLife;


export const login = async (req, res) => {
  try {
    // tìm kiếm customer theo email 
    const customers = await Customers.findAll({
      where: {
        email: req.body.email
      }
    }); 
    if(customers.length > 0 && await compare(req.body.password, customers[0].password)){  
      const userData = {
        id: customers[0].id,
        name:  customers[0].name,
        email: customers[0].email,
      };
      const accessToken = await jwtHelper.generateToken(userData, accessTokenSecret, accessTokenLife);
      const refreshToken = await jwtHelper.generateToken(userData, refreshTokenSecret, refreshTokenLife);
      tokenList[refreshToken] = { accessToken, refreshToken };
      return res.status(200).json({ userData, accessToken, refreshToken ,type: "user"});
    }
    else {
      return res.status(400).json({ message: "email hoặc mật khẩu không đúng" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}

export const employeeLogin = async (req, res) => {
  try {
    // tìm kiếm customer theo email 
    const employee = await Employees.findAll({
      where: {
        email: req.body.email
      }
    }); 
    if(employee.length > 0 && await compare(req.body.password, employee[0].password)){  
      let typeEmployee = 'employee';
      const userData = {
        id: employee[0].id,
        name:  employee[0].name,
        email: employee[0].email,
      };
      if(employee[0].ruleAccess === 0){
        typeEmployee = 'admin'
      }
      const accessToken = await jwtHelper.generateToken(userData, accessTokenSecret, accessTokenLife);
      const refreshToken = await jwtHelper.generateToken(userData, refreshTokenSecret, refreshTokenLife);
      tokenList[refreshToken] = { accessToken, refreshToken };
      return res.status(200).json({ userData, accessToken, refreshToken, type: typeEmployee });
    }
    else {
      return res.status(400).json({ message: "email hoặc mật khẩu không đúng" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}

export const refreshToken = async (req, res) => {
  // User gửi mã refresh token kèm theo trong body
  const refreshTokenFromClient = req.body.refreshToken;
  // Nếu như tồn tại refreshToken truyền lên và nó cũng nằm trong tokenList của chúng ta
  if (refreshTokenFromClient && (tokenList[refreshTokenFromClient])) {
    try {
      // Verify kiểm tra tính hợp lệ của cái refreshToken và lấy dữ liệu giải mã decoded 
      const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret);
      // Thông tin user lúc này các bạn có thể lấy thông qua biến decoded.data
      const userData = decoded.data;

      const accessToken = await jwtHelper.generateToken(userData, accessTokenSecret, accessTokenLife);
      // gửi token mới về cho người dùng
      return res.status(200).json({ accessToken });
    } catch (error) {
      res.status(403).json({
        message: 'Invalid refresh token.',
      });
    }
  } else {
    // Không tìm thấy token trong request
    return res.status(403).send({
      message: 'No token provided.',
    });
  }
};
// module.exports = {
//   login: login,
//   refreshToken: refreshToken,
// }