const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true
})

const db = mongoose.connection
db.on('error', () => {
  console.error('connection error')
});
db.once('open', () => {
  console.log('successed connection!!')
});

const ChatSchema = new mongoose.Schema({
  user: String,
  body: String,
  postedAt: String
}, {
  collection: 'chat' // 明示的に指定しないと複数形のコレクション名(chats)で探しに行ってしまう
})
const Chat = mongoose.model('chat', ChatSchema)

module.exports = {
  Chat
}