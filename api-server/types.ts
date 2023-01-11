export interface List {
  id: string;
  title: string;
  color: string;
}

export interface Item {
  id: string;
  title: string;
  dueAt: string;
  completedAt: string;
  listId: string;
  notes: string;
  weight: number;
}
