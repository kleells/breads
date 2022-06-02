//import mongoose
const mongoose = require("mongoose");
//append schema to mongoose
const { Schema } = mongoose;
  
//build bread schema
const breadSchema = new Schema({
  //require field
  name: {type: String, required: true},
  hasGluten: Boolean,
  image: {type: String, default: 'http://placehold.it/500x500.png'},
  baker: {
    type: Schema.Types.ObjectID,
    ref: 'Baker',
  }
})

//helper methods
breadSchema.methods.getBakedBy = function(){
  return `${this.name} was baked with love by ${this.baker.name}, who has been with us since ${this.baker.startDate.getFullYear()}`
}
//create model to house schema and interact with mongoDB
const Bread = mongoose.model('Bread', breadSchema);

//export model not schema
module.exports = Bread;