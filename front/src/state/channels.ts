import { selector, selectorFamily, useRecoilCallback } from "recoil";
import axios from "axios";
type ChannelType = {
  idName: string;
  participants: number;
  sockets: [];
};

export const channelByID = selectorFamily({
  key: "channelByID",
  get:
    (channelID) =>
    async ({ get }) => {
      const existingChannels = get(channels);
      const result = await axios.get<ChannelType>(
        `http://localhost:5000/rooms${channelID?.toString()}`
      );
      const { data } = result;
      const updatedChannels = existingChannels.data.filter((item) => {
        return item.idName === data.idName;
      });
      return { updatedChannels };
    },
});

export const channels = selector({
  key: "channels",
  get: async () => {
    const request = await axios.get<ChannelType[]>(
      "http://localhost:5000/rooms"
    );
    const { data } = request;
    return { data };
  },
});
