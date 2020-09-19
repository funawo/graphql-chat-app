module.exports = {
  Query: {
    allMessages: (paranet, args, { Chat }) => {
      return Chat.find();
    }
  },

  Mutation: {
    post: (parent, args, { Chat, pubsub }) => {
      const date = new Date();
      const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      console.log(args)
      const message = {
        ...args,
        postedAt: dateStr
      }

      new Chat(message).save((err) => {
        if (err) {
          throw new Error(err)
        }
      });

      pubsub.publish('newMessage', {
        newMessage: {
          ...message
        }
      })
      return {
        ...message
      }
    }
  },

  Subscription: {
    newMessage: {
      subscribe: (parant, args, { pubsub }) => {
        return pubsub.asyncIterator('newMessage');
      }
    }
  }
}

