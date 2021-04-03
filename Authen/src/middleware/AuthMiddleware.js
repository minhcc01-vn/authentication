require('dotenv').config()

import * as jwtHelper  from '../helpers/jwt.helper'

const debug = console.log.bind(console);
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "NodejsApiAuthentication"

let isAuth = async (req, res, next) => {
  // Lấy token từ client
  const tokenFromClient = req.body.token || req.query.token || req.headers['x-access-token']

  if(tokenFromClient) {
    try {
      // Giải mã code xem có hợp lệ hay không
      const decoded = await jwtHelper.verifyToken(tokenFromClient, accessTokenSecret)

      // token hợp lệ => lưu thông tin giải mã vào đối tượng req, dùng cho các xử lý phía sau
      req.jwtDecoded = decoded

      // Chuyển sang controller
      next()
    } catch (error) {
      // Nếu giải mã gặp lỗi: Không đúng, hết hạn...etc:
      // Lưu ý trong dự án thực tế hãy bỏ dòng debug bên dưới, mình để đây để debug lỗi cho các bạn xem thôi
      debug("Error while verify toke: ", error)
      return res.status(401).json({
        message: 'Anauthorized.'
      })
    }
  }else {
    return res.status(403).json({
      message: "No token provided"
    })
  }
}

export {
  isAuth,
}

