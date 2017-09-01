import mongoose from 'mongoose'

export default new mongoose.Schema({
  user: { type: Number, ref: 'User' },
  road_id: String,
  contents: String,
  walk_langth: Number,
  walk_time: Number,
  walk_count: Number,
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
