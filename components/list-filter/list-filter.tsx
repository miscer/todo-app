import { ItemState } from "./item-state";
import { ItemSearch } from "@/components/list-filter/item-search";

export function ListFilter() {
  return (
    <div className="flex justify-between items-center">
      <ItemState />
      <ItemSearch />
    </div>
  );
}
