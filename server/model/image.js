import mongoose from 'mongoose'

const Schema = mongoose.Schema

export default mongoose.model('Image', new Schema({
  feed: { type: Schema.Types.ObjectId, ref: 'Feed' },
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
}, { autoIndex: true }))
