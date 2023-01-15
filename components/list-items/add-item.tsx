import { useForm } from "react-hook-form";
import { useCreateListItem } from "@/hooks/api/items";
import { Input } from "@/components/forms";

interface Props {
  listId: string;
  weight: number;
}

interface FormValues {
  title: string;
}

export function AddItem(props: Props) {
  const { listId, weight } = props;
  const [create, { isLoading }] = useCreateListItem();
  const { register, reset, handleSubmit } = useForm<FormValues>();

  const onSubmit = handleSubmit((values) => {
    const { title } = values;

    const attributes = {
      title,
      weight,
      notes: "",
      dueAt: null,
      completedAt: null,
      listId,
    };

    create(attributes, { onSuccess: () => reset() });
  });

  return (
    <div className="py-2">
      <form onSubmit={onSubmit}>
        <Input
          type="text"
          placeholder="Add item..."
          className="w-3/4"
          disabled={isLoading}
          {...register("title", { required: true })}
        />
      </form>
    </div>
  );
}
