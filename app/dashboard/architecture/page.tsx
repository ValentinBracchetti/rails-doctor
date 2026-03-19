import { getDomainById } from "@/data/report";
import { DomainDetailView } from "@/components/dashboard/DomainDetailView";
import { notFound } from "next/navigation";

export default function ArchitecturePage() {
  const domain = getDomainById("architecture");
  if (!domain) return notFound();
  return <DomainDetailView domain={domain} />;
}
