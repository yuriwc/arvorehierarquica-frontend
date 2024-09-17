import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

// Definição do tipo para os nós da árvore
interface Node {
  title: string;
  children: Node[];
}

interface TreeFormProps {
  onSubmit: (nodes: Node[]) => void;
}

const TreeForm: React.FC<TreeFormProps> = ({ onSubmit }) => {
  const [nodes, setNodes] = useState<Node[]>([{ title: "", children: [] }]);

  // Adiciona um novo irmão ao nível atual
  const handleAddSibling = (index: number, parentIndex: number[] | null) => {
    const newNodes = [...nodes];
    const newNode: Node = { title: "", children: [] };

    if (parentIndex === null) {
      newNodes.splice(index + 1, 0, newNode); // Adiciona o irmão ao mesmo nível da raiz
    } else {
      const parent = getNodeByPath(parentIndex, newNodes);

      parent.children.splice(index + 1, 0, newNode); // Adiciona o irmão ao nível dos filhos
    }

    setNodes(newNodes);
  };

  // Adiciona um novo filho
  const handleAddChild = (path: number[]) => {
    const newNodes = [...nodes];
    const parentNode = getNodeByPath(path, newNodes);

    parentNode.children.push({ title: "", children: [] });
    setNodes(newNodes);
  };

  // Altera o título de um nó
  const handleTitleChange = (
    path: number[],
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newNodes = [...nodes];
    const node = getNodeByPath(path, newNodes);

    node.title = event.target.value;
    setNodes(newNodes);
  };

  // Função de remoção de nó
  const handleRemoveNode = (path: number[]) => {
    const newNodes = [...nodes];

    if (path.length === 1) {
      // Se o nó for raiz
      newNodes.splice(path[0], 1);
    } else {
      // Se for um filho ou neto
      const parentPath = path.slice(0, -1); // Caminho até o pai do nó
      const parentNode = getNodeByPath(parentPath, newNodes);

      parentNode.children.splice(path[path.length - 1], 1); // Remove o filho
    }

    setNodes(newNodes);
  };

  // Função utilitária para encontrar um nó baseado no caminho (path)
  const getNodeByPath = (path: number[], currentNodes: Node[]): Node => {
    return path.reduce(
      (node, index) =>
        node.children ? node.children[index] : currentNodes[index],
      currentNodes as any,
    );
  };

  // Submete o formulário e envia a árvore de nós para o componente pai
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(nodes);
  };

  // Renderiza os nós e filhos recursivamente
  const renderNodes = (nodes: Node[], path: number[] = []) => {
    return nodes.map((node, index) => {
      const currentPath = [...path, index];

      return (
        <div key={index} className="mb-4 ml-6">
          <Input
            placeholder="Insira o nome"
            type="text"
            value={node.title}
            onChange={(e) => handleTitleChange(currentPath, e)}
          />
          <div className="flex space-x-2 mt-2">
            <Button
              color="secondary"
              type="button"
              variant="ghost"
              onClick={() => handleAddChild(currentPath)}
            >
              Criar Filho
            </Button>
            <Button
              color="warning"
              type="button"
              variant="ghost"
              onClick={() =>
                handleAddSibling(index, path.length > 0 ? path : null)
              }
            >
              Adicionar Irmão
            </Button>
            <Button
              color="danger"
              type="button"
              variant="ghost"
              onClick={() => handleRemoveNode(currentPath)}
            >
              Remover
            </Button>
          </div>
          {node.children.length > 0 && (
            <div className="mt-4 ml-4">
              {renderNodes(node.children, currentPath)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {renderNodes(nodes)}
      <Button color="primary" type="submit">
        Salvar Arvore
      </Button>
    </form>
  );
};

export default TreeForm;
