import { Item } from "@/api-server/types";
import { Button, Input, Label, TextArea } from "@/components/forms";

interface Props {
  item: Item;
}

export function ListItemForm(props: Props) {
  const { item } = props;
  const deadline = item.dueAt ? new Date(item.dueAt).toLocaleString() : "";

  return (
    <div className="flex flex-col gap-4 pb-4 w-full max-w-sm">
      <div className="flex gap-3 items-center">
        <input type="checkbox" checked={item.completedAt != null} />
        <Input type="text" className="flex-grow text-lg" value={item.title} />
      </div>

      <div className="flex flex-col items-start gap-2">
        <Label htmlFor="item-form-deadline">Deadline</Label>
        <Input type="text" id="item-form-deadline" value={deadline} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="item-form-notes">Notes</Label>
        <TextArea
          id="item-form-notes"
          className="w-xl"
          value={item.notes}
          rows={5}
        />
      </div>

      <div className="flex gap-2">
        <Button variant="primary">Save</Button>
        <Button variant="secondary">Cancel</Button>
        <Button variant="danger">Delete</Button>
      </div>
    </div>
  );
}
