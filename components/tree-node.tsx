"use client";

import { Button } from "@nextui-org/button";
import { Spacer } from "@nextui-org/spacer";
import React, { useEffect, useState } from "react";

interface TreeNodeProps {
  node: any; // O nó a ser renderizado
  depth?: number; // Profundidade para indentação
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, depth = 0 }) => {
  const indent = `${depth * 4}rem`;

  // Verifica se o valor é um objeto vazio
  const isEmptyObject = (obj: any) => {
    return obj && Object.keys(obj).length === 0;
  };

  return (
    <ul className="list-none p-0" style={{ marginLeft: indent }}>
      {Object.entries(node).map(([key, value]) => (
        <li key={key} className="flex flex-col space-y-2">
          <strong>{key}</strong>
          {typeof value === "object" && !isEmptyObject(value) && (
            <TreeNode depth={depth + 1} node={value} />
          )}
        </li>
      ))}
    </ul>
  );
};

const TreeView: React.FC = () => {
  const [json, setJson] = useState<any>(null);

  useEffect(() => {
    // Recupera o JSON do localStorage quando o componente monta
    const storedJsonString = localStorage.getItem("json");

    if (storedJsonString) {
      setJson(JSON.parse(storedJsonString));
    }
  }, []);

  const downloadJson = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(json, null, 2));
    const downloadAnchorNode = document.createElement("a");

    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "data.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const removeJson = () => {
    localStorage.removeItem("json");
    setJson(null);
  };

  if (json === null) {
    return (
      <p>Nenhum JSON encontrado. Tente adicionar um JSON no botão acima.</p>
    );
  }

  return (
    <div>
      <TreeNode node={json} />
      <Spacer y={5} />
      <div className="flex flex-row space-x-2">
        <Button color="secondary" variant="ghost" onPress={downloadJson}>
          Baixar JSON
        </Button>
        <Button color="danger" variant="ghost" onPress={removeJson}>
          Apagar
        </Button>
      </div>
    </div>
  );
};

export default TreeView;
