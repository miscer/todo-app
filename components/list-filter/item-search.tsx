import { Input } from "@/components/forms";
import debounce from "lodash/debounce";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";

export function ItemSearch() {
  const updateQuery = useUpdateQuery();

  return (
    <Input
      className="w-48"
      type="text"
      placeholder="Search..."
      onChange={(event) => {
        updateQuery(event.target.value);
      }}
    />
  );
}

function useUpdateQuery() {
  const router = useRouter();

  const updateQuery = useCallback(
    (search: string) => {
      const { search: _, ...rest } = router.query;

      router.replace({
        pathname: router.pathname,
        query: search ? { ...rest, search } : rest,
      });
    },
    [router]
  );

  return useMemo(() => debounce(updateQuery, 300), [updateQuery]);
}
