import React, { useState, useEffect } from "react";
import ChannellList from "./ChannellList";
import SendMessage from "./SendMessage";
import { io as socket } from "socket.io-client";
// import { channels } from "../state/channels";
import axios from "axios";
const SERVER: string = "127.0.0.1:5000";
const io = socket(SERVER);

type ChannelType = {
  idName: string;
  participants: number;
  sockets: [];
  // [key: string]: unknown;
  messages: string[];
};

const Chat = () => {
  const [rooms, setRooms] = useState<ChannelType[]>([]);
  const [channel, setChannel] = useState<ChannelType>();
  console.log("Firest", rooms);

  useEffect(() => {
    // this timeout is here because it will re run the function every 100
    // setInterval(() => {
    getRooms();
    // }, 100);
    configureSockets();
  }, []);
  const configureSockets = () => {
    io.on("connection", () => {
      console.log(`I'm connected with the back-end`);
      if (channel) {
        handleChannelSelect(channel.idName);
        console.log("Channel", channel);
      }
    });

    io.on("channel", (channel) => {
      let channels = rooms;
      channels.forEach((c) => {
        if (c.idName === channel.idName) {
          c.participants = channel.participants;
        }
      });
      setRooms(channels);
      console.log(channels);
    });

    io.on("message", (message) => {
      let channels = rooms;
      rooms.forEach((c) => {
        if (c.idName === message.channel_id) {
          if (!c.messages) {
            c.messages = [message];
          } else {
            c.messages.push(message);
          }
        }
        setRooms(channels);
      });
    });

    io.emit("sendMessage", "Mesajul tau");
  };

  const handleChannelSelect = (id: string) => {
    let channel = rooms.find((c: ChannelType) => c.idName === id);
    console.log(channel);

    setChannel(channel);
    io.emit("channelJoin", id, async (ack: unknown) => {
      console.log("Buna ziua");
    });
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
