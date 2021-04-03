require('dotenv').config()
import * as jwtHelper from '../../helpers/jwt.helper'
const debug = console.log.bind(console);

let token = {}

// Thời gian sống của token
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h"
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "Acess-token-secret-NodejsApiAuthentication"

// Thời gian sống của refreshToken
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "1h"
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "refresh-token-secret-NodejsApiAuthentication"

class AuthController {
  async login(req, res, next) {
    try {
      debug(`Đang giả lập hành động đăng nhập thành công với Email: ${req.body.email} và Password: ${req.body.pasword}`)

      debug(`Thực hiện fake thông tin user...`)
      const userFakeDate = {
        _id: '123-234-45-6-7',
        name: 'Cam Minh',
        email: req.body.email
      }

      debug(`Thực hiện tạo mã access Token, [thời gian sống 1 giờ.]`);
      const accessToken = await jwtHelper.generateToken(userFakeDate, accessToken, accessTokenLife)

      debug(`Thực hiện tạo mã Token, [thời gian sống 1 năm.]`);
      const refreshToken = await jwtHelper.generateToken(userFakeDate, refreshToken, refreshTokenLife)

      tokenList[refreshToken] = { accessToken, refreshToken }

      debug(`Gửi Token và Refresh Token về cho client...`);
      return res.status(200).json({ accessToken, refreshToken })
    } catch (error) {
      return res.status(500).json(error)
    }
  }


  async refreshToken (req, res) {
    // User gửi mã refresh token kèm theo trong body
    const refreshTokenFromClient = req.body.refreshToken;
    // debug("tokenList: ", tokenList);

    // Nếu như tồn tại refreshToken truyền lên và nó cũng nằm trong tokenList của chúng ta
    if (refreshTokenFromClient && (tokenList[refreshTokenFromClient])) {
      try {
        // Verify kiểm tra tính hợp lệ của cái refreshToken và lấy dữ liệu giải mã decoded 
        const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret);
        // Thông tin user lúc này các bạn có thể lấy thông qua biến decoded.data
        // có thể mở comment dòng debug bên dưới để xem là rõ nhé.
        // debug("decoded: ", decoded);
        const userFakeData = decoded.data;
        debug(`Thực hiện tạo mã Token trong bước gọi refresh Token, [thời gian sống vẫn là 1 giờ.]`);
        const accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife);
        // gửi token mới về cho người dùng
        return res.status(200).json({ accessToken });
      } catch (error) {
        // Lưu ý trong dự án thực tế hãy bỏ dòng debug bên dưới, mình để đây để debug lỗi cho các bạn xem thôi
        debug(error);
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

}


export default new AuthController()
























// require('dotenv').config()
// import Auth from '../models/AuthModel'
// import jwt from 'jsonwebtoken'

// const encodedToken = (id) => {
//   return jwt.sign({
//     iss: 'minh',
//     sub: id,
//     iat: new Date().getTime()
//   }, process.env.ACCESS_SECRET)
// }


// class AuthController {

//   async sign_up(req, res) {
//     try {
//       const { email, ...rest } = req.body
//       const auth = await Auth.findOne({ email: email })
//       if (auth) {
//         return res.json({ message: 'email is already exits!' })
//       }
//       const newAuth = new Auth(Object.assign({}, { email }, rest))
//       await newAuth.save()
//       newAuth.password = undefined
//       res.status(201).json({ newAuth })
//     } catch (error) {
//       console.log(`Error: ${error}`);
//     }
//   }

//   async sign_in(req, res) {
//     const { email, password } = req.body
//     const auth = await Auth.findOne({ email })
//     if (!auth || !auth.comparePassword(password)) {
//       return res.json({ success: `Authentication failed. Invalid user or password!` })
//     }
//     const token = encodedToken(auth._id)
//     res.set('Authentication', token)
//     res.json(
//       {
//         headers: req.headers,
//       })
//   }

//   secret(req, res) {
//     res.json({ payload: 'Min' })
//   }
// }

// export default new AuthController();

