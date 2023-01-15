import { useCallback } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Item } from "@/utils/types";
import { Button, Input, Label, TextArea } from "@/components/forms";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useDeleteListItem, useUpdateListItem } from "@/hooks/api/items";
import { formatDateForInput, parseDateFromInput } from "@/utils/forms";

interface Props {
  item: Item;
}

interface FormValues {
  done: boolean;
  title: string;
  notes: string;
  deadline: string;
}

export function ListItemForm(props: Props) {
  const { item } = props;
  const { onSubmit, register, errors } = useFormController(item);
  const { onDelete } = useDeleteController(item);
  const { onCancel } = useCancelController(item);

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-4 pb-4 w-full max-w-sm">
        <div className="flex flex-col gap-2">
          <div className="flex gap-3 items-center">
            <input type="checkbox" {...register("done")} />
            <Input
              type="text"
              className="flex-grow text-lg"
              {...register("title")}
            />
          </div>
          {errors.title ? (
            <div className="text-sm text-red-500">{errors.title.message}</div>
          ) : null}
        </div>

        <div className="flex flex-col items-start gap-2">
          <Label htmlFor="item-form-deadline">Deadline</Label>
          <Input
            type="datetime-local"
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

function useFormController(item: Item) {
  const router = useRouter();
  const [updateItem] = useUpdateListItem(item.id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: item.title,
      notes: item.notes,
      done: item.completedAt != null,
      deadline: item.dueAt ? formatDateForInput(new Date(item.dueAt)) : "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    const attributes = {
      title: data.title,
      notes: data.notes,
      completedAt: data.done ? new Date().toISOString() : null,
      dueAt: data.deadline
        ? parseDateFromInput(data.deadline).toISOString()
        : null,
    };

    updateItem(attributes, {
      onSuccess() {
        router.push(`/lists/${item.listId}`);
      },
    });
  });

  return { onSubmit, register, errors };
}

const formSchema = z.object({
  title: z.string().trim().min(1, { message: "Title is required" }),
  notes: z.string().trim(),
  done: z.boolean(),
  deadline: z.string(),
});

function useDeleteController(item: Item) {
  const router = useRouter();
  const [deleteItem] = useDeleteListItem(item.id);

  const onDelete = useCallback(() => {
    deleteItem(undefined, {
      onSuccess() {
        router.push(`/lists/${item.listId}`);
      },
    });
  }, [deleteItem, item.listId, router]);

  return { onDelete };
}

function useCancelController(item: Item) {
  const router = useRouter();

  const onCancel = useCallback(() => {
    router.push(`/lists/${item.listId}`);
  }, [item.listId, router]);

  return { onCancel };
}
