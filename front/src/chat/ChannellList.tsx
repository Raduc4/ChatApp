import React, { useState } from "react";
import Channel from "./Channel";

import { ReactComponent as Img } from "./assets/plus.svg";

type ChannelType = {
  idName: string;
  participants: number;
  sockets: [];
};
type Props = {
  data: ChannelType[];
  onSelectChannel: (arg: string) => any;
};

const ChannellList = ({ data, onSelectChannel }: Props) => {
  return (
    <div>
      {data.map((channel: ChannelType, index: number) => (
        <Channel
          onClick={() => onSelectChannel(channel.idName)}
          idName={channel.idName}
          participants={channel.participants}
          key={channel.idName}
        />
      ))}
    </div>
  );
};

export default ChannellList;
