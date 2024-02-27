import React from 'react';
import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'
import config from './hooks/Config';
import MessageParser from './hooks/MessageParser';
import ActionProvider from './hooks/ActionProvider';


const ChatBotComponent = () => {
  return (
    <div>
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  );
};
export default ChatBotComponent