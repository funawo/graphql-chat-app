const express = require('express');
const { PubSub } = require('apollo-server');
const { ApolloServer } = require('apollo-server-express');

// apollo config
const { readFileSync } = require('fs');
const resolvers = require('./resolvers');
const { Chat } = require('./dao/db')

const { createServer } = require('http');
const { create } = require('domain');

async function init() {
  const pubsub = new PubSub();
  const typeDefs = readFileSync('./typeDefs.graphql', 'UTF-8');
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
      return {
        Chat,
        pubsub
      }
    },
    subscriptions: {
      onConnect: (connectionParam, webSocket, context) => {
        console.log('websocket connected')
      }
    }
  });

  const app = express();
  server.applyMiddleware({
    app,
    path: '/graphql'
  })

  const httpServer = createServer(app)
  server.installSubscriptionHandlers(httpServer)
  httpServer.listen({ port: 4000 }, () => {
    console.log(`server running at http://localhost:4000${server.graphqlPath}`)
  });
}

init()