import { getDomainById } from "@/data/report";
import { DomainDetailView } from "@/components/dashboard/DomainDetailView";
import { notFound } from "next/navigation";

export default function DependenciesPage() {
  const domain = getDomainById("dependencies");
  if (!domain) return notFound();
  return <DomainDetailView domain={domain} />;
}
