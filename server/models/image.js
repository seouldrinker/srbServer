import mongoose from 'mongoose'

export default new mongoose.Schema({
  feed: { type: Number, ref: 'Feed' },
  image_url: String,
  is_map: Number,
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
