import { FormEvent, useCallback, useState } from "react";
import useSWRMutation from "swr/mutation";
import { createFetcher } from "../../api-client/fetchers";

interface Props {
  listId: string;
  weight: number;
}

export function AddItem(props: Props) {
  const { listId, weight } = props;
  const { trigger, isMutating } = useSWRMutation(
    `lists/${listId}/items`,
    createFetcher
  );
  const [title, setTitle] = useState("");

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      trigger({
        title,
        weight,
        notes: "",
        dueAt: null,
        completedAt: null,
      }).then(() => {
        setTitle("");
      });
    },
    [title, trigger, weight]
  );

  return (
    <div className="py-2">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Quick add..."
          disabled={isMutating}
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
      </form>
    </div>
  );
}
