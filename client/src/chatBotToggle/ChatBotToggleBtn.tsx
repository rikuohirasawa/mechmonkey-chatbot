import * as React from "react"
import { Wrapper, ToggleBtn } from "./chatBotBtnStyles"
import { BsFillChatTextFill, BsChatFill } from 'react-icons/bs'

export const ChatBotToggleBtn: React.FC = () => {
    return (
        <Wrapper>
            <ToggleBtn><span className='pos-abs'>Chat</span><BsChatFill/></ToggleBtn>
        </Wrapper>
    )
}