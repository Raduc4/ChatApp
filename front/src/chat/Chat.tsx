import React, { useState, useRef, useEffect } from "react";
import ChannellList from "./ChannellList";
import SendMessage from "./SendMessage";
import { io as socket } from "socket.io-client";
// import { channels } from "../state/channels";
import axios from "axios";
const SERVER: string = "127.0.0.1:5000";
const io = socket(SERVER);
type MessageType = { text: string; senderName: string; channel_id: string };

type ChannelType = {
  idName: string;
  participants: number;
  sockets: [];
  // [key: string]: unknown;
  messages: MessageType[];
};

const Chat = () => {
  const [rooms, setRooms] = useState<ChannelType[]>([]);
  const [channel, setChannel] = useState<ChannelType>();
  const ref = useRef<MessageType>();
  console.log("Firest", rooms);
  console.log("REEF", ref.current);

  useEffect(() => {
    getRooms();
    configureSockets();
  }, []);

  useEffect(() => {
    // const message = ref.current;

    const updatedChannels = rooms.map((c) => {
      if (c.idName !== ref.current?.channel_id) {
        return c;
      }

      return {
        ...c,
        messages: [...c.messages, ref.current],
      };
    });
    setRooms(updatedChannels);
  }, [ref]);
  const configureSockets = () => {
    io.on("connection", () => {
      console.log(`I'm connected with the back-end`);
      if (channel) {
        handleChannelSelect(channel.idName);
        console.log("Channel", channel);
      }
    });

    io.on("channel", (channel) => {
      getRooms();
    });

    io.on("message", (message) => {
      console.log("message from back", message);
      ref.current = message;
      console.log("Ref from back", ref.current?.channel_id);

      // channels.forEach((c) => {
      //   if (c.idName === message.channel_id) {
      //     if (!c.messages) {
      //       c.messages = [message];
      //     } else {
      //       c.messages.push(message);
      //     }
      //   }
      // });
    });
  };

  const handleChannelSelect = (id: string) => {
    let channel = rooms.find((c: ChannelType) => c.idName === id);
    console.log(channel);

    setChannel(channel);
    io.emit("channelJoin", id, async (ack: unknown) => {});
  };

  const handleSendMessage = (channel_id: any, text: string) => {
    io.emit("sendMessage", { channel_id, text, senderName: io.id });
  };

  const getRooms = async () => {
    const request = await axios.get("http://localhost:5000/rooms");
    const { data } = request;
    setRooms(data);
  };

  return (
    <>
      <ChannellList data={rooms} onSelectChannel={handleChannelSelect} />
      <SendMessage onSendMessage={handleSendMessage} channel={channel} />
    </>
  );
};

export default Chat;
