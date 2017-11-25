const mongoose = require('mongoose')

const User = new mongoose.Schema({
  email: { type: String, required: true, trim: true },
  password: { type: String, trim: true },
  name: { type: String, trim: true, required: true }
})

const UserModel = mongoose.model('User', User)

module.exports = UserModel
