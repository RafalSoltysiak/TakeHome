import { useEffect, useState } from "react";

import {
  getExpandedCards,
  setExpandedCards,
} from "../utils/localeStorageUtils";
import { DeleteButton, ToggleButton } from "./Buttons";
import { CardProps } from "../types";
import { ChevronDownIcon } from "./icons";

export default function Cards({ id, title, description, onDelete }: CardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (id && getExpandedCards().includes(id.toString())) {
      setIsExpanded(true);
    }
  }, [id]);

  const handleToggleExpand = () => {
    if (!id) return;

    const cardId = id.toString();
    const expandedCards = getExpandedCards();

    if (isExpanded) {
      setExpandedCards(expandedCards.filter((cid) => cid !== cardId));
    } else {
      setExpandedCards([...expandedCards, cardId]);
    }

    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="border border-black px-2 py-1.5">
      <div className="flex justify-between mb-0.5">
        <h1 className="font-medium">{title}</h1>
        <div className="flex">
          <div className={`flex item-details ${isExpanded ? "expanded" : ""}`}>
            <ToggleButton
              onClick={handleToggleExpand}
              className="hover:text-gray-700 transition-colors flex items-center justify-center"
            >
              <span className="item-details-icon">
                <ChevronDownIcon />
              </span>
            </ToggleButton>
          </div>
          <DeleteButton onClick={onDelete} />
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? "max-h-[200px]" : "max-h-0"
        }`}
      >
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
}
