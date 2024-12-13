const mongoose = require('mongoose');


// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/contactManagement', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const userSchema = mongoose.Schema({
  name : String,
  email : {
      type: String,
      unique: true,
      required: true
  },
  contact: {
       type : Number,
       required: true,
       unique: true
  }
})

module.exports = mongoose.model('User',userSchema);

 
