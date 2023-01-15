import { ItemStateLink } from "./item-state-link";

export function ItemState() {
  return (
    <div className="flex gap-3">
      <ItemStateLink state={null}>All</ItemStateLink>
      <ItemStateLink state="completed">Completed</ItemStateLink>
      <ItemStateLink state="pending">Pending</ItemStateLink>
    </div>
  );
}
