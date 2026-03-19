import { getDomainById } from "@/data/report";
import { DomainDetailView } from "@/components/dashboard/DomainDetailView";
import { notFound } from "next/navigation";

export default function QualityPage() {
  const domain = getDomainById("quality");
  if (!domain) return notFound();
  return <DomainDetailView domain={domain} />;
}
