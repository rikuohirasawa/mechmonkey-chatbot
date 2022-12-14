import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';

import { ChatBotToggleBtn } from './chatBotToggle/ChatBotToggleBtn'

import BotIcon from './imgs/chatbot-icon.svg'

interface MessageData {
  sentBy: string,
  content: string
}
interface DefaultMessage {
  greeting: string,
  options: string[]
}

const introMessage: DefaultMessage = {
  greeting: 'Hi there, thanks for visiting MechMonkey! Please select one of the options below, or chat with me if you have any questions.',
  options: ['Pricing', 'Launch date', 'Book a meeting', 'Talk to a live agent']
}


export const App: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [chatData, setChatData] = useState<MessageData[]>([]);
  const chatRef = useRef<MessageData[]>([]);

  // useEffect(()=>{
  //   fetch('http://localhost:8000/test')
  //   .then(res=>{
  //     console.log(res)
  //     res.json()})
  //   .then(data=>{
  //     console.log(data)
  //   })
  // }, [])

  const onClickOption = (e: React.MouseEvent<HTMLElement>, option: string) => {
    e.preventDefault();
    fetch(`http://localhost:8000/options?option=${option}`)
    .then(res=>{
      console.log(res)
      return res.json()
    }).then(data=>{
      setChatData([...chatData, data])
      console.log(data)
    })
    
  }

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
      }).catch(err=>{
        setInput('')
        window.alert(err)
      })
    } else {
      window.alert('input something')
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    console.log(input);
  };
  const onClickButton = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
  }

  return (
    <Wrapper>
      <div className='header-icon-container'>
        <h1>chatti</h1>
        <img src={BotIcon} style={{filter: 'invert(34%) sepia(51%) saturate(2877%) hue-rotate(355deg) brightness(103%) contrast(97%)', height: '40px'}}/>
      </div>
      <form onSubmit={(e)=>onSubmit(e)} name='chat-bot'>
        <div id='msg-container'>
          <ChatBubble sentBy='default'>{introMessage.greeting}</ChatBubble>
          <div className='options-grid'>
            {introMessage.options.map(el=>{
              return <OptionButton onClick={(e)=>onClickOption(e, el)}>{el}</OptionButton>
            })}
          </div>
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
      <ChatBotToggleBtn/>
    </Wrapper>
  )
}

export default App;

const Wrapper = styled.div`
  border-radius: 16px;
  width: 600px;
  margin: 0 auto;
  background-color: var(--mm-black);
  padding: 18px;
  
  .header-icon-container {
    display: flex;
    gap: 16px;
    padding: 8px;
  }

form {
  width: 100%;
}
#msg-container {
  height: 500px;
  border: 1px solid;
  border-bottom: none;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 16px 0;
  overflow-y: auto;
  width: 100%;
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  align-items: end;
  margin: 0 0 4px 16px;
  max-width: 80%;
  gap: 3px;
}

  .input-container {
    display: flex;
    height: 30px;
  }
  input {
    width: 100%;
    height: 100%;
  }
`
interface ChatBubbleProps {
  sentBy: string
}
const ChatBubble = styled.div<ChatBubbleProps>`
  background-color: ${props=>props.sentBy === 'user' ? 'var(--mm-light-blue)' : 'var(--mm-orange)'};
  color: ${props=>props.sentBy === 'user' ? 'var(--mm-black)' : 'var(--mm-white)'};
  align-self:${props=>props.sentBy === 'user' ? 'flex-end' : 'flex-start'};
  margin: ${props=>props.sentBy === 'user' ? '0 16px 0 0' : '0 0 4px 16px'};
  padding: 8px;
  border-radius: 8px;
  max-width: 80%;
`

const OptionButton = styled.button`
  background-color: var(--mm-orange);
  color: var(--mm-white);
  border: none;
  font-size: inherit;
  font-family: inherit;
  border-radius: 8px;
  height: 40px;
  cursor: pointer;
  transition: all 0.1s ease-in-out;

  &:hover {
    transform: scale(1.02);
    background-color: var(--mm-black);
    color: var(--mm-orange);
    border: 1px solid var(--mm-orange);
  }
`

