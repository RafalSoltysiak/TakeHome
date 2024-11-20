export const getExpandedCards = (): string[] =>
  JSON.parse(localStorage.getItem("expandedCards") || "[]");

export const setExpandedCards = (cards: string[]) => {
  localStorage.setItem("expandedCards", JSON.stringify(cards));
};
