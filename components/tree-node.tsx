"use client";

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

  if (json === null) {
    return <p>Carregando...</p>;
  }

  return <TreeNode node={json} />;
};

export default TreeView;
