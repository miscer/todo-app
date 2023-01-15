import { useForm } from "react-hook-form";
import { Input } from "@/components/forms";
import { useCreateList } from "@/hooks/api/lists";
import { getRandomListColor } from "@/utils/color";

interface FormValues {
  title: string;
}

export function AddList() {
  const [create, { isLoading }] = useCreateList();
  const { register, reset, handleSubmit } = useForm<FormValues>();

  const onSubmit = handleSubmit((values) => {
    const { title } = values;
    const color = getRandomListColor();
    const attributes = { title, color };
    create(attributes, { onSuccess: () => reset() });
  });

  return (
    <form onSubmit={onSubmit}>
      <Input
        type="text"
        placeholder="Add list..."
        className="w-full"
        disabled={isLoading}
        {...register("title", { required: true })}
      />
    </form>
  );
}
