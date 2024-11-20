export interface ListItem {
  id: number;
  title: string;
  description: string;
  isVisible: boolean;
}

export type CardProps = Pick<ListItem, "id" | "title" | "description"> & {
  onDelete: () => void;
};

export type State = {
  visibleCards: ListItem[];
  deletedCards: ListItem[];
  showDeletedCards: boolean;
  errorMessage: string | null;
} & StateActions;

export type StateActions = {
  setVisibleCards: (cards: ListItem[]) => void;
  setDeletedCards: (cards: ListItem[]) => void;
  toggleShowDeletedCards: () => void;
  handleDeleteCard: (id: number) => void;
  handleRevertCard: (id: number) => void;
  clearErrorMessage: () => void;
};

export interface ButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}
