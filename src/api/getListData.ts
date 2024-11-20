import { useQuery } from "@tanstack/react-query";

import mockJson from "./mock.json";

import { ListItem } from "../types";

export const useGetListData = () => {
  const query = useQuery({
    queryKey: ["list"],
    queryFn: async () => {
      if (getRandom() > 85) {
        console.error("An unexpected error occurred!");
        throw new Error("👀");
      }

      const mockData = mockJson as Omit<ListItem, "isVisible">[];

      return shuffle(mockData).map((item) => {
        return { ...item, isVisible: getRandom() > 80 ? true : false };
      });
    },
  });
  return query;
};

const getRandom = () => Math.floor(Math.random() * 100);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const shuffle = <T extends any[]>(array: T): T => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};
