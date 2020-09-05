const jwt = require("jsonwebtoken");

const generateToken = (user, secretSignature, tokenLife) => {
    return new Promise((resolve, reject) => {
      // Định nghĩa thông tin cần lưu của user
      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
      }
      // Thực hiện ký và tạo token
      jwt.sign(
        {data: userData},
        secretSignature,
        {
          algorithm: "HS256",
          expiresIn: tokenLife,
        },
        (error, token) => {
          if (error) {
            return reject(error);
          }
          resolve(token);
      });
    });
  }

const verifyToken = (token, secretKey) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secretKey, (error, decoded) => {
        if (error) {
         return reject(error);
       }
       resolve(decoded);
     });
  });
}

  module.exports = {
    generateToken: generateToken,
    verifyToken: verifyToken,
  };