import mongoose, { Schema } from 'mongoose'

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    email: {
      type: String,
      unique: true,
      require: true,
      lowercase: true
    },
    password: {
      type: String,
      require: true
    },

    decks: [{
      type: Schema.Types.ObjectId ,
      ref: 'Deck'
    }]
  },
  {
    timestamps: true
  }
  )

export default mongoose.model('User', UserSchema)
