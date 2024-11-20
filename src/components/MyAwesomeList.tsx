import { useEffect } from "react";

import Cards from "./Cards";
import { useStore } from "../store/store";
import { useGetListData } from "../api/getListData";

export default function MyAwesomeList() {
  const { data, refetch } = useGetListData();
  const { visibleCards, setVisibleCards } = useStore();

  useEffect(() => {
    if (!data) return;
    if (visibleCards.length === 0) {
      setVisibleCards(data?.filter((item) => item.isVisible) ?? []);
    }
  }, [data, setVisibleCards, visibleCards]);

  const handleRefresh = () => {
    refetch()
      .then(() => {
        if (data) {
          setVisibleCards(data.filter((item) => item.isVisible));
        }
      })
      .catch((error) => {
        console.error("Error refetching data:", error);
      });
  };

  return (
    <div className="w-full max-w-xl">
      <div className="flex items-center justify-between m-2">
        <h1 className="mb-1 font-medium text-lg">
          My Awesome List ({visibleCards.length})
        </h1>
        <button onClick={handleRefresh} className="btn">
          Refresh
        </button>
      </div>
      <div className="overflow-auto h-[600px] border">
        <div className="flex flex-col gap-y-3">
          {visibleCards.map((card) => (
            <Cards
              id={card.id}
              key={card.id}
              title={card.title}
              description={card.description}
              onDelete={() => useStore.getState().handleDeleteCard(card.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
