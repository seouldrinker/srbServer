import mongoose from 'mongoose'

const Schema = mongoose.Schema

export default mongoose.model('User', new Schema({
  id: String,
  platform: String,
  is_ok: Number,
  crt_dt: {
    type: Date,
    default: Date.now
  },
  udt_dt: {
    type: Date,
    default: Date.now
  }
}, { autoIndex: true }))
