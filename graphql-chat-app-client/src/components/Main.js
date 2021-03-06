import React, { useState, useEffect, useRef } from 'react';
import Message from '../components/Message';
import { request } from 'graphql-request';
import { useQuery } from '@apollo/client'
import { gql } from '@apollo/client/core'
import { animateScroll as scroll } from 'react-scroll';
import './Main.css';

const GRAPHQL_HTTP_URL = process.env.REACT_APP_GRAPHQL_HTTP_URL

async function sendMessage(message) {
  const query = `
    mutation($user: String!, $body: String!) {
      post(user: $user, body: $body) {
        user
        body
        postedAt
      }
    }
  `
  const variables = {
    user: 'testuser',
    body: message
  }

  const { newMessage } = await request(GRAPHQL_HTTP_URL, query, variables)
  return newMessage
}


const Main = () => {
  const [ messages, setMessages ] = useState([]);
  const [ message, setMessage ] = useState('')
  const query = gql`
      query {
        allMessages {
         user
          body
          postedAt
        }
      }
  `
  const { loading, subscribeToMore, ...result } = useQuery(query)

  useEffect(() => {
    if (!loading) {
      setMessages(result.data.allMessages)
    }
  }, [ loading, result ])

  useEffect(() => {
    const query = gql`
    subscription {
      newMessage {
        user
        body
        postedAt
      }
    }
   `
    subscribeToMore({
      document: query,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) {
          return prev
        }
        const allMessages = prev.allMessages.slice()

        allMessages.push({
          user: subscriptionData.data.newMessage.user,
          body: subscriptionData.data.newMessage.body,
          postedAt: subscriptionData.data.newMessage.postedAt
        })
        setMessages(allMessages.slice())
        return {
          allMessages
        }
      }
    })

  }, [ subscribeToMore ])

  const mounted = useRef(false)
  const initialScroll = useRef(null)
  const [ isScrolled, setScrolled ] = useState(false)
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
    } else {
      if (!isScrolled) {
        initialScroll.current.scrollTop = initialScroll.current.scrollHeight
        setScrolled(true)
      } else {
        scroll.scrollToBottom({
          containerId: 'messageScroll'
        })
      }
    }

  }, [ messages, isScrolled ])

  return (
    <main className="main">
      <div className="messages" id="messageScroll" ref={initialScroll}>
        {
          messages.map((row, index) => <Message row={row} key={index} />)
        }
      </div>
      <div className="form">
        <textarea className="textarea" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
        <input
          className="send-button"
          type="button"
          value="send"
          onClick={() => {
            sendMessage(message)
            setMessage('')
          }} />
      </div>
    </main >
  );
};

export default Main;