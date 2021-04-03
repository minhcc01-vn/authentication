import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

const AuthModelSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      require: true,
      trim: true
    },
    email: {
      type: String,
      require: true,
      lowercase: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      require: true
    }
  },
  {
    timestamps: true,
  }
);


AuthModelSchema.pre('save', async function () {
  try {
    const salt = await bcrypt.genSalt(10)
    const hash_password = await bcrypt.hash(this.password, salt)
    this.password = hash_password 
  } catch (error) {
    return error
  }
})

AuthModelSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
} 

export default mongoose.model('AuthModel', AuthModelSchema);
