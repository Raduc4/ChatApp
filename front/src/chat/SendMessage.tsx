import React, { useState } from "react";
import Message from "./Message";

type ChannelType = {
  idName: string;
  participants: number;
  sockets: [];
  messages: string[];
};
type Props = {
  channel: ChannelType | undefined;
  onSendMessage: (channel_id: any, text: string) => void;
};

const SendMessage = ({ channel, onSendMessage }: Props) => {
  const [input, setInput] = useState("");
  console.log(input);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const sendMessage = () => {
    if (input !== "") {
      onSendMessage(channel?.idName, input);
    }
  };

  console.log(channel?.messages);
  // let list;
  // if (channel && channel.messages) {
  //   list = channel.messages.map((message) => (
  //     <Message senderName={message.senderName} text={message.text} />
  //   ));
  // }

  return (
    <div>
      <input
        type="text"
        placeholder="Send message"
        value={input}
        onChange={handleInput}
      />
      <button onClick={() => sendMessage()}>Send</button>
    </div>
  );
};

export default SendMessage;
