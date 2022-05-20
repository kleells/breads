const mongoose = require('mongoose')
const { Schema } = mongoose

const breadSchema = new Schema({
  name: { type: String, required: true },
  hasGluten: Boolean,
  image: { type: String, default: 'https://unsplash.com/photos/rsWZ-P9FbQ4' },
  baker: {
    type: String,
    enum: ['Rachel', 'Monica', 'Joey', 'Chandler', 'Ross', 'Pheobe']
  }
})

const bread = mongoose.model('Bread', breadSchema)

module.exports = bread;