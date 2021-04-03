

let generateToken = (user, secretSignature, tokenLife) => {
  return new Promise((resolve, reject) => {
    // Định nghĩa thông tin của user muốn lưu vào token
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      iss: 'minh',
      iat: Date.now(),
      // exp: Math.floor(Date.now() / 1000) + (60 * 60)  // 1hour
    }

    // Thực hiện encode
    jwt.sign(
      userData,
      secretSignature,
      {
        algorithm: 'HS256',
        expiresIn: tokenLife
      },
      (err, encoded) => {
        if(err) {
          return reject(err)
        }
        return encoded
      }
    )
  })

}

let verifyToken = (token, secretKey) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if(err) { return reject(err) }
      return resolve(decoded)
    })
  })
}


export {
  generateToken,
  verifyToken
}