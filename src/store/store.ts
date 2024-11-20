import { create } from "zustand";
import { persist } from "zustand/middleware";

import { State } from "../types";

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      visibleCards: [],
      deletedCards: [],
      expandedCards: [],
      showDeletedCards: false,
      errorMessage: null,
      setVisibleCards: (cards) => set({ visibleCards: cards }),
      setDeletedCards: (cards) => set({ deletedCards: cards }),
      toggleShowDeletedCards: () =>
        set((state) => ({ showDeletedCards: !state.showDeletedCards })),
      handleDeleteCard: (id) => {
        const { visibleCards, deletedCards } = get();
        const deletedCard = visibleCards.find((item) => item.id === id);
        if (deletedCard && !deletedCards.some((card) => card.id === id)) {
          set({
            visibleCards: visibleCards.filter((item) => item.id !== id),
            deletedCards: [...deletedCards, deletedCard],
            errorMessage: null,
          });
        } else {
          set({
            errorMessage:
              "Ta karta jest już widoczna na liście 'Deleted Cards'!",
          });
        }
      },
      handleRevertCard: (id) => {
        const revertedCard = get().deletedCards.find((card) => card.id === id);
        if (revertedCard) {
          set((state) => ({
            deletedCards: state.deletedCards.filter((card) => card.id !== id),
            visibleCards: [
              ...state.visibleCards.filter((card) => card.id !== id),
              { ...revertedCard, isVisible: true },
            ],
          }));
        }
      },
      clearErrorMessage: () => set({ errorMessage: null }),
    }),
    {
      name: "cards-state",
      partialize: (state) => ({
        visibleCards: state.visibleCards,
        deletedCards: state.deletedCards,
        showDeletedCards: state.showDeletedCards,
        errorMessage: state.errorMessage,
      }),
    }
  )
);
