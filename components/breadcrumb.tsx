import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";

export default function App() {
  return (
    <Breadcrumbs variant="solid">
      <BreadcrumbItem href="/">Inicio</BreadcrumbItem>
      <BreadcrumbItem href="/add">Adicionar</BreadcrumbItem>
    </Breadcrumbs>
  );
}
