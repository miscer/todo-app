import { Item } from "@/api-server/types";
import { Button, Input, Label, TextArea } from "@/components/forms";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useDeleteListItem, useUpdateListItem } from "@/hooks/api/items";

interface Props {
  item: Item;
}

interface FormData {
  done: boolean;
  title: string;
  notes: string;
  deadline: string;
}

export function ListItemForm(props: Props) {
  const { item } = props;
  const router = useRouter();
  const [update] = useUpdateListItem(item.listId, item.id);
  const [deleteItem] = useDeleteListItem(item.listId, item.id);
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      title: item.title,
      notes: item.notes,
      done: item.completedAt != null,
      deadline: item.dueAt ? new Date(item.dueAt).toLocaleString() : "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    await update({
      title: data.title,
      notes: data.notes,
      completedAt: data.done ? new Date().toISOString() : null,
      dueAt: data.deadline ? new Date(data.deadline).toISOString() : null,
    });

    router.push(`/lists/${item.listId}`);
  });

  const onDelete = () => {
    deleteItem().then(() => {
      router.push(`/lists/${item.listId}`);
    });
  };

  const onCancel = () => {
    router.push(`/lists/${item.listId}`);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-4 pb-4 w-full max-w-sm">
        <div className="flex gap-3 items-center">
          <input type="checkbox" {...register("done")} />
          <Input
            type="text"
            className="flex-grow text-lg"
            {...register("title")}
          />
        </div>

        <div className="flex flex-col items-start gap-2">
          <Label htmlFor="item-form-deadline">Deadline</Label>
          <Input
            type="text"
            id="item-form-deadline"
            {...register("deadline")}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="item-form-notes">Notes</Label>
          <TextArea
            id="item-form-notes"
            className="w-xl"
            rows={5}
            {...register("notes")}
          />
        </div>

        <div className="flex gap-2">
          <Button variant="primary" type="submit">
            Save
          </Button>
          <Button variant="secondary" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="danger" type="button" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </div>
    </form>
  );
}
