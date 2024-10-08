import { SearchList } from "@/components";

interface Props {
  params: {
    word: string;
  };
}
export default function Page({ params }: Props) {
  return (
    <main className="flex-1 overflow-y-auto">
      {<SearchList wordSearch={params.word} />}
    </main>
  );
}
