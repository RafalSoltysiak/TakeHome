import { useStore } from "../store/store";
import { ToggleButton } from "./Buttons";
import { RevertIcon } from "./icons";

export default function DeletedCards() {
  const { deletedCards, showDeletedCards, toggleShowDeletedCards } = useStore();

  return (
    <div className="w-full max-w-xl flex flex-col">
      <div className="flex items-center justify-between m-2">
        <h1 className="mb-1 font-medium text-lg">
          Deleted Cards ({deletedCards.length})
        </h1>
        <ToggleButton
          onClick={() => {
            if (deletedCards.length > 0) {
              toggleShowDeletedCards();
            }
          }}
          disabled={deletedCards.length === 0}
          className="btn"
        >
          {showDeletedCards && deletedCards.length > 0 ? "Hide" : "Reveal"}
        </ToggleButton>
      </div>
      <div className="overflow-auto h-[600px] border">
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
                    className="text-blue-600 hover:text-blue-400"
                  >
                    <RevertIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
