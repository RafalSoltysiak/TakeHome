import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ListItem } from "../types/ListItem";

// Typ stanu
type State = {
  visibleCards: ListItem[];
  deletedCards: ListItem[];
  showDeletedCards: boolean;
  errorMessage: string | null; // Dodajemy stan na komunikat o błędzie
  setVisibleCards: (cards: ListItem[]) => void;
  setDeletedCards: (cards: ListItem[]) => void;
  toggleShowDeletedCards: () => void;
  handleDeleteCard: (id: number) => void;
  handleRevertCard: (id: number) => void;
  clearErrorMessage: () => void; // Funkcja do czyszczenia komunikatu
};

// Tworzenie sklepu Zustand
export const useStore = create<State>()(
  persist(
    (set, get) => ({
      visibleCards: [],
      deletedCards: [],
      expandedCards: [],
      showDeletedCards: false,
      errorMessage: null, // Początkowo brak błędu
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
            errorMessage: null, // Resetujemy komunikat przy usuwaniu karty
          });
        } else {
          set({
            errorMessage:
              'Ta karta jest już widoczna na liście "Deleted Cards"!',
          });
        }
      },
      handleRevertCard: (id) => {
        const { visibleCards, deletedCards } = get();
        const revertedCard = deletedCards.find((card) => card.id === id);
        if (revertedCard) {
          // Sprawdzamy, czy karta nie jest już w visibleCards
          if (!visibleCards.some((card) => card.id === id)) {
            set({
              deletedCards: deletedCards.filter((card) => card.id !== id),
              visibleCards: [
                ...visibleCards,
                { ...revertedCard, isVisible: true },
              ],
              errorMessage: null, // Resetujemy komunikat przy przywracaniu karty
            });
          } else {
            // Jeśli karta już jest w visibleCards, ustawiamy komunikat
            set({
              errorMessage:
                'Ta karta jest już widoczna na liście "My Awesome List"!',
            });
          }
        }
      },
      clearErrorMessage: () => set({ errorMessage: null }), // Funkcja do czyszczenia komunikatu
    }),
    {
      name: "cards-state", // Klucz w localStorage
      partialize: (state) => ({
        visibleCards: state.visibleCards,
        deletedCards: state.deletedCards,
        showDeletedCards: state.showDeletedCards,
        errorMessage: state.errorMessage, // Zapisujemy komunikat o błędzie
      }), // Zapisz tylko wybrane pola
    }
  )
);
