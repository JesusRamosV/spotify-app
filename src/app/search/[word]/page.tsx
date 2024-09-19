import { SearchList } from "@/components";

interface Props {
  params: {
    word: string;
  };
}
export default function SearchLists({ params }: Props) {
  return <main className="">{<SearchList wordSearch={params.word} />}</main>;
}
