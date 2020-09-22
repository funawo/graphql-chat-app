import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws'
import { SubscriptionClient } from 'subscriptions-transport-ws';

const GRAPHQL_HTTP_URL = process.env.REACT_APP_GRAPHQL_HTTP_URL
const GRAPHQL_WS_URL = process.env.REACT_APP_GRAPHQL_WS_URL

const subscriptionClient = new SubscriptionClient(GRAPHQL_WS_URL, {
  reconnect: true
})
const link = new WebSocketLink(subscriptionClient)
const client = new ApolloClient({
  uri: GRAPHQL_HTTP_URL,
  cache: new InMemoryCache(),
  link
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
