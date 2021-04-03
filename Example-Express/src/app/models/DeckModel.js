import mongoose, { Schema } from 'mongoose'

const DeckSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true
    },
    description: {
      type: String,
      require: true
    },
    total: {
      type: Number,
      default: 0
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('Deck', DeckSchema)
