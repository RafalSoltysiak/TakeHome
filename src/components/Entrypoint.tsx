import { useEffect } from "react";
import { useGetListData } from "../api/getListData";
import { Spinner } from "./Spinner";
import Cards from "./Cards";
import { useStore } from "../store/store"; // Importowanie sklepu Zustand
import Error from "./Error";

export const Entrypoint = () => {
  const listQuery = useGetListData();

  // Pobieranie stanu z Zustand
  const {
    visibleCards,
    deletedCards,
    showDeletedCards,
    setVisibleCards,
    toggleShowDeletedCards,
  } = useStore();

  useEffect(() => {
    if (listQuery.isLoading) return;

    // Ustaw visibleCards tylko, jeśli jest puste
    if (visibleCards.length === 0) {
      setVisibleCards(listQuery.data?.filter((item) => item.isVisible) ?? []);
    }
  }, [listQuery.data, listQuery.isLoading, setVisibleCards, visibleCards]);

  if (listQuery.isLoading) return <Spinner />;

  return (
    <div className="flex gap-x-16">
      <Error />
      {/* Widoczne karty */}
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-between mb-2">
          <h1 className="mb-1 font-medium text-lg">
            My Awesome List ({visibleCards.length})
          </h1>
          <button className="text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1">
            Refresh
          </button>
        </div>
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

      {/* Usunięte karty */}
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-between mb-2">
          <h1 className="mb-1 font-medium text-lg">
            Deleted Cards ({deletedCards.length})
          </h1>
          <button
            onClick={toggleShowDeletedCards}
            disabled={deletedCards.length === 0}
            className="text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1"
          >
            {showDeletedCards ? "Hide" : "Reveal"}
          </button>
        </div>
        {showDeletedCards && (
          <div className="flex flex-col gap-y-3">
            {deletedCards.map((card) => (
              <div
                key={card.id}
                className="border border-black px-2 py-1.5 bg-gray-100"
              >
                <div className="flex justify-between">
                  <h1 className="font-medium">{card.title}</h1>
                  <button
                    onClick={() =>
                      useStore.getState().handleRevertCard(card.id)
                    }
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Revert
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
