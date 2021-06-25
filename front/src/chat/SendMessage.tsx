import React, { useState, ReactNode } from "react";
import Message from "./Message";

type MessageType = { text: string; senderName: string; channel_id: string }[];

type ChannelType = {
  idName: string;
  participants: number;
  sockets: [];
  messages: MessageType;
};
type Props = {
  channel: ChannelType | undefined;
  onSendMessage: (channel_id: any, text: string) => void;
};

const SendMessage = ({ channel, onSendMessage }: Props) => {
  const [input, setInput] = useState("");
  console.log("messages", channel?.messages);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const send = () => {
    if (input !== "") {
      onSendMessage(channel?.idName, input);
    }
  };

  console.log(channel?.messages);

  let list: ReactNode = (
    <div className="no-content-message">There is no messages to show</div>
  );
  if (channel && channel.messages) {
    list = channel.messages.map((m) => (
      <Message text={m.text} senderName={m.senderName} />
    ));
  }

  return (
    <div>
      {list}
      <input
        type="text"
        placeholder="Send message"
        value={input}
        onChange={handleInput}
      />
      <button onClick={() => send()}>Send</button>
    </div>
  );
};

export default SendMessage;
