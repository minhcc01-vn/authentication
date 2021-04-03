import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const encodedToken = (userId) => {
  return jwt.sign({
    iss: 'minh',
    sub: userId,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() +3)
  }, process.env.ACCESS_TOKEN_SECRET)
}

const generateToken = (user, secretSignature, tokenLife) => {
  return new Promise((resolve, reject) => {

    // Định nghĩa những thông tin của user mà bạn muốn lưu vào token ở đây
    const userData = {
      _id: user._id,
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

export {
  encodedToken,
  verifyToken
} 