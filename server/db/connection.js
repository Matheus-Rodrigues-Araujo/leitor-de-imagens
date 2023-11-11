const mongoose = require('mongoose');

module.exports = async function connection(){
  try {
    await mongoose.connect(process.env.DB_URI)
    console.log('connected')
  } catch (error) {
    console.log(error)
  }
}

