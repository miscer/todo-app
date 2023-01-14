import { FormEvent, useCallback, useState } from "react";
import { useCreateListItem } from "@/hooks/api/items";

interface Props {
  listId: string;
  weight: number;
}

export function AddItem(props: Props) {
  const { listId, weight } = props;
  const [create, { isLoading }] = useCreateListItem(listId);
  const [title, setTitle] = useState("");

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      const attributes = {
        title,
        weight,
        notes: "",
        dueAt: null,
        completedAt: null,
        listId,
      };

      create(attributes, {
        onSuccess() {
          setTitle("");
        },
      });
    },
    [title, create, weight, listId]
  );

  return (
    <div className="py-2">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Quick add..."
          disabled={isLoading}
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
      </form>
    </div>
  );
}
