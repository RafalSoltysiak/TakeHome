import { useEffect, useState } from "react";
import { ListItem } from "../types/ListItem";
import { DeleteButton, ExpandButton } from "./Buttons";
import { ChevronDownIcon } from "./icons";

type CardProps = {
  id: ListItem["id"]; // ID karty
  title: ListItem["title"];
  description: ListItem["description"];
  onDelete: () => void;
};

export default function Cards({ id, title, description, onDelete }: CardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Przy wczytaniu komponentu sprawdzamy, czy karta jest rozwinięta w localStorage
  useEffect(() => {
    if (!id) return;

    // Pobieramy dane z localStorage
    const expandedCards = JSON.parse(
      localStorage.getItem("expandedCards") || "[]"
    );

    // Sprawdzamy, czy ID karty znajduje się w zapisanej liście rozwiniętych kart
    if (expandedCards.includes(id.toString())) {
      setIsExpanded(true);
    }
  }, [id]);

  // Obsługa kliknięcia w przycisk rozwinięcia
  const handleToggleExpand = () => {
    if (!id) return;

    setIsExpanded((prev) => {
      const updatedState = !prev;

      // Pobieramy obecny stan rozwiniętych kart z localStorage
      const expandedCards = JSON.parse(
        localStorage.getItem("expandedCards") || "[]"
      );

      if (updatedState) {
        // Dodajemy ID do localStorage, jeśli karta jest rozwinięta
        localStorage.setItem(
          "expandedCards",
          JSON.stringify([...expandedCards, id.toString()])
        );
      } else {
        // Usuwamy ID z localStorage, jeśli karta jest zwinięta
        localStorage.setItem(
          "expandedCards",
          JSON.stringify(
            expandedCards.filter((cardId: string) => cardId !== id.toString())
          )
        );
      }

      return updatedState;
    });
  };

  return (
    <div className="border border-black px-2 py-1.5">
      <div className="flex justify-between mb-0.5">
        <h1 className="font-medium">{title}</h1>
        <div className="flex">
          <div className={`flex item-details ${isExpanded ? "expanded" : ""}`}>
            <ExpandButton onClick={handleToggleExpand}>
              <span className="item-details-icon">
                <ChevronDownIcon />
              </span>
            </ExpandButton>
          </div>
          <DeleteButton onClick={onDelete} />
        </div>
      </div>
      <div
        className={`overflow-hidden transition-[max-height] duration-300 ease-in-out`}
        style={{ maxHeight: isExpanded ? "200px" : "0" }}
      >
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
}
