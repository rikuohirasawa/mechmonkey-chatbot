import React from 'react';
import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';

interface MessageData {
  sentBy: string,
  content: string
}

export const App: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [chatData, setChatData] = useState<MessageData[]>([]);
  const chatRef = useRef<MessageData[]>([]);

  useEffect(()=>{
    fetch('http://localhost:8000/test')
    .then(res=>{
      console.log(res)
      res.json()})
    .then(data=>{
      console.log(data)
    })
  }, [])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userMessage: MessageData = {
      sentBy: 'user',
      content: input
    }
    // input !== '' && setChatData([...chatData, userMessage])

    // useRef used here, as react batches state updates in event handlers, thus if i were to add to setstate fxs
    // in one event handler, they would be batched together, meaning only the final one would be run.
    if (input !== '') {
      input !== '' && chatRef.current.push(userMessage);
      fetch('http://localhost:8000/user-msg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
      }, body: JSON.stringify(userMessage)
    }).then(res=>{
      console.log(res)
      return res.json()})
      .then(data=>{
        chatRef.current.push(data);
        setChatData(chatRef.current);
        setInput('');
        // setChatData([...chatData, data])
      }).catch(err=>window.alert(err))
    } else {
      window.alert('input something')
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    console.log(input);
  };

  return (
    <Wrapper>
    <h1>chatbot</h1>
    <form onSubmit={(e)=>onSubmit(e)} name='chat-bot'>
      <div id='msg-container'>
        {chatData.length > 0 && 
        chatData.map(e=>{
          return(
            <ChatBubble sentBy={e.sentBy}>{e.content}</ChatBubble>
          )
        })}
      </div>
      <div className='input-container'>
        <input type='text' name='message' onChange={(e)=>{onChange(e)}} value={input}/>
        <button type='submit'>Send</button>
      </div>
    </form>
    </Wrapper>
  )
}

export default App;

const Wrapper = styled.div`
width: 500px;
margin: 0 auto;

form {
  width: 100%;
}
#msg-container {
  height: 200px;
  border: 1px solid;
  border-bottom: none;
  border-radius: 8px;
  display: flex;
  padding: 16px 0;
  flex-direction: column;
  overflow-y: auto;
  width: 100%;
}

.input-container {
  display: flex;
  justify-content: flex-end;
}
  input {
    width: 100%;
    height: 20px;
  }

  button {
    padding: 4px 30px;
    font-family: inherit;
  }
`
interface ChatBubbleProps {
  sentBy: string
}
const ChatBubble = styled.div<ChatBubbleProps>`
  background-color: ${props=>props.sentBy === 'user' ? 'green' : 'orange'};
  color: #fff;
  align-self:${props=>props.sentBy === 'user' ? 'flex-end' : 'flex-start'};
  margin: ${props=>props.sentBy === 'user' ? '0 16px 0 0' : '0 0 0 16px'};
  padding: 8px;
  border-radius: 8px;
`

