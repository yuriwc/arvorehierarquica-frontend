import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";

export default function App() {
  return (
    <Breadcrumbs>
      <BreadcrumbItem href="/">Inicio</BreadcrumbItem>
      <BreadcrumbItem href="/add">Adicionar</BreadcrumbItem>
    </Breadcrumbs>
  );
}
