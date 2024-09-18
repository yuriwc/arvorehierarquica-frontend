"use client";

import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Spacer } from "@nextui-org/spacer";

import TreeForm from "@/components/tree-form";
import Breadcrumb from "@/components/breadcrumb";

interface Node {
  title: string;
  children: Node[];
}

export default function Home() {
  const [generatedJson, setGeneratedJson] = useState<object | null>(null);
  const [copySuccess, setCopySuccess] = useState("");

  const handleCopy = () => {
    const jsonText = JSON.stringify(generatedJson, null, 2);

    navigator.clipboard
      .writeText(jsonText)
      .then(() => setCopySuccess("Texto copiado!"))
      .catch(() => setCopySuccess("Falha ao copiar!"));
  };

  const handleDownload = () => {
    if (!generatedJson) return;

    const jsonString = JSON.stringify(generatedJson, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "generated_tree.json"; // Nome do arquivo baixado
    link.click();

    // Libera o objeto URL após o download
    URL.revokeObjectURL(url);
  };

  const handleTreeSubmit = (nodes: Node[]) => {
    const generateJson = (nodesArray: Node[]) => {
      const tree: { [key: string]: any } = {};

      nodesArray.forEach((node) => {
        // Se houver filhos, chamamos recursivamente, caso contrário, usamos um objeto vazio
        tree[node.title] =
          node.children.length > 0 ? generateJson(node.children) : {};
      });

      return tree;
    };

    const jsonTree = generateJson(nodes);

    saveJsonToLocalStorage(jsonTree);
    setGeneratedJson(jsonTree);
  };

  const saveJsonToLocalStorage = (jsonObject: Object) => {
    // Converte o JSON   para uma string e armazena no localStorage
    const jsonString = JSON.stringify(jsonObject);

    localStorage.setItem("json", jsonString);
  };

  return (
    <div className="p-4">
      <Breadcrumb />
      <Spacer y={4} />
      <h1 className="text-2xl font-bold mb-4">Criar Arvore e Gerar JSON</h1>

      <TreeForm onSubmit={handleTreeSubmit} />

      {generatedJson && (
        <div className="mt-6">
          <h2 className="text-xl font-bold">JSON Gerado:</h2>
          <pre className="bg-gray-200 dark:bg-gray-900 p-4 rounded">
            {JSON.stringify(generatedJson, null, 2)}
          </pre>
          <div className="flex space-x-4 mt-2">
            <Button onClick={handleCopy}>Copiar</Button>
            <Button onClick={handleDownload}>Baixar</Button>
          </div>
          {copySuccess && <p>{copySuccess}</p>}
        </div>
      )}
    </div>
  );
}
