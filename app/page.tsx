import { Button } from "@nextui-org/button";
import Link from "next/link";

import TreeNode from "@/components/tree-node";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <h1 className="text-4xl font-bold">
        Analisador de Hierarquia de Palavras
      </h1>
      <span>
        Monte a hierarquia de palavras que deseja analisar, faça o download do
        json e importe na CLI para obter os resultados.
      </span>
      <Link href="/add">
        <Button color="primary" variant="ghost">
          Criar novo
        </Button>
      </Link>
      <TreeNode />
    </section>
  );
}
