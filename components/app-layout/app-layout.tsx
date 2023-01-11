import { ReactNode } from "react";
import { ListSelector } from "@/components/list-selector/list-selector";

interface Props {
  children?: ReactNode;
}

export function AppLayout(props: Props) {
  const { children } = props;

  return (
    <div className="flex justify-center min-h-screen p-12">
      <div className="w-full max-w-4xl">
        <h1 className="font-bold text-2xl mb-8">
          Tood<span className="text-purple-500">les</span>
        </h1>
        <div className="flex items-stretch">
          <div className="w-64">
            <ListSelector />
          </div>
          <div className="grow">{children}</div>
        </div>
      </div>
    </div>
  );
}
