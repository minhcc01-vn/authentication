import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      require: true,
      trim: true,
    },

    email: {
      type: String,
      require: true,
      trim: true,
      lowercase: true,
      unique: true
    },
    
    hash_password: {
      type: String
    },
  },
  {
    timestamps: true
  }
)

UserSchema.methods.comparePassword = (password) => {
  return bcrypt.compareSync(password, this.hash_password)
}

export default mongoose.model('User', UserSchema)
