import autoIncrement from 'mongoose-auto-increment'
import mongoose from 'mongoose'

import userSchema from './models/user'
import feedSchema from './models/feed'
import imageSchema from './models/image'
import rewardSchema from './models/reward'

export default function database(db) {
  autoIncrement.initialize(db)

  userSchema.plugin(autoIncrement.plugin, { model: 'User', field: 'seq' })
  feedSchema.plugin(autoIncrement.plugin, { model: 'Feed', field: 'seq' })
  imageSchema.plugin(autoIncrement.plugin, { model: 'Image', field: 'seq' })
  rewardSchema.plugin(autoIncrement.plugin, { model: 'Reward', field: 'seq' })

  return {
    User: mongoose.model('User', userSchema),
    Feed: mongoose.model('Feed', userSchema),
    Image: mongoose.model('Image', userSchema),
    Reward: mongoose.model('Reward', userSchema)
  }
}
