import React, { useState } from 'react';
import { post_data } from '../../services/ApiService';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleHello = async (keyword) => {
    getTemplateMsg(keyword);
  }
  const getTemplateMsg = async (keyword) => {
    await post_data('/getTemplateMsg', { keyword: keyword }, {}).then((res) => {
      if (res.data.status) {
        let msg = res.data.temp_message;
        const botMessage = createChatBotMessage(msg);
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, botMessage],
        }));
      } else {
        const botMessage = createChatBotMessage('sorry');
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, botMessage],
        }));
      }
    }).catch((_e) => {
      const botMessage = createChatBotMessage('sorry');
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    })
  }
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;