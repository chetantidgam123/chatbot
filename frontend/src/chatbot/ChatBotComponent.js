import React from 'react';
import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'
import config from './hooks/Config';
import MessageParser from './hooks/MessageParser';
import ActionProvider from './hooks/ActionProvider';
import { useNavigate } from 'react-router-dom';


const ChatBotComponent = () => {
  const navigate = useNavigate();
  return (
    <div className='d-flex justify-content-between'>
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
      <div>
      <button className='btn btn-primary' onClick={()=>{navigate('/template-list')}}>Template List</button>
      <button className='btn btn-primary mx-2' onClick={()=>{navigate('/keyword-list')}}>Key List</button>
      </div>
    </div>
  );
};
export default ChatBotComponent