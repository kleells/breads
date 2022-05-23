const mongoose = require('mongoose')
const { Schema } = mongoose

// bread schema
const breadSchema = new Schema({
  name: { type: String, required: true },
  hasGluten: Boolean,
  image: { type: String, default: 'https://unsplash.com/photos/rsWZ-P9FbQ4' },
  baker: {
    type: Schema.Types.ObjectID,
    ref: 'Baker'
  }
});

// helper methods 
breadSchema.methods.getBakedBy = function(){
  return `${this.name} was baked with love by ${this.baker.name}, who has been with us since ${this.baker.startDate.getFullYear()}`
};

const Bread = mongoose.model('Bread', breadSchema)

module.exports = Bread;