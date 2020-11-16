const jwtHelper = require("../helpers/jwt.helper");
const config = require("../../config")
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || config.accessTokenSecret;

const isAuth = async (req, res, next) => {
  const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"] || req.header('Authorization')?.replace('Bearer ', '');
  // console.log('a',tokenFromClient);
  if (tokenFromClient) {
    // Nếu tồn tại token
    try {
      // Thực hiện giải mã token xem có hợp lệ hay không?
      const decoded = await jwtHelper.verifyToken(tokenFromClient, accessTokenSecret);
      // Nếu token hợp lệ, lưu thông tin giải mã được vào đối tượng req, dùng cho các xử lý ở phía sau.
      req.jwtDecoded = decoded;
      // Cho phép req đi tiếp sang controller.
      next();
    } catch (error) {
      // Nếu giải mã gặp lỗi: Không đúng, hết hạn...
      return res.status(401).json({
        message: 'Unauthorized.',
      });
    }
  } else {
    // Không tìm thấy token trong request
    return res.status(403).send({
      message: 'No token provided.',
    });
  }
}
module.exports = {
  isAuth: isAuth,
};