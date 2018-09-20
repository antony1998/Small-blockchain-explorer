import mongoose from 'mongoose'
import crypto from 'crypto'
const InternalTransSchema = new mongoose.Schema({
  address: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  ballance: {
    type: String,
    tring: true,
  },
  blockNumber:{
    type: String,
  },
  contractAddress:{
    type: String,
  },
  errCode:{
    type: String,
  },
  from:{
    type: String,
  },
  gas:{
    type: String,
  },
  gasUsed:{
    type: String,
  },
  hash:{
    type: String,
  },
  input:{
    type: String,
  },
  isError:{
    type: String,
  },
  timeStamp:{
    type: String,
  },
  to:{
    type: String,
  },
  traceId:{
    type: String,
  },
  type:{
    type: String,
  },
  value:{
    type: String,
  },
  salt: String,
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  },
  following: [{type: mongoose.Schema.ObjectId, ref: 'Task'}],
  followers: [{type: mongoose.Schema.ObjectId, ref: 'Task'}]
})

// TaskSchema
//   .virtual('password')
//   .set(function(password) {
//     this._password = password
//     this.salt = this.makeSalt()
//     this.hashed_password = this.encryptPassword(password)
//   })
//   .get(function() {
//     return this._password
//   })

// TaskSchema.path('hashed_password').validate(function(v) {
//   if (this._password && this._password.length < 6) {
//     this.invalidate('password', 'Password must be at least 6 characters.')
//   }
//   if (this.isNew && !this._password) {
//     this.invalidate('password', 'Password is required')
//   }
// }, null)

// TaskSchema.methods = {
//   authenticate: function(plainText) {
//     return this.encryptPassword(plainText) === this.hashed_password
//   },
//   encryptPassword: function(password) {
//     if (!password) return ''
//     try {
//       return crypto
//         .createHmac('sha1', this.salt)
//         .update(password)
//         .digest('hex')
//     } catch (err) {
//       return ''
//     }
//   },
//   makeSalt: function() {
//     return Math.round((new Date().valueOf() * Math.random())) + ''
//   }
// }

export default mongoose.model('internaltrans', InternalTransSchema)
