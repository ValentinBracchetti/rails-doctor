import { getDomainById } from "@/data/report";
import { DomainDetailView } from "@/components/dashboard/DomainDetailView";
import { notFound } from "next/navigation";

export default function PerformancePage() {
  const domain = getDomainById("performance");
  if (!domain) return notFound();
  return <DomainDetailView domain={domain} />;
}
