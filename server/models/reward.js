import mongoose from 'mongoose'

export default new mongoose.Schema({
  user: { type: Number, ref: 'User' },
  category: String,
  is_ok: Number,
  crt_dt: {
    type: Date,
    default: Date.now
  },
  udt_dt: {
    type: Date,
    default: Date.now
  }
})
