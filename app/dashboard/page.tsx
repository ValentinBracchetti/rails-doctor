import { report } from "@/data/report";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { ScoreRing, DomainScoreBar } from "@/components/ui/ScoreRing";
import { DomainCard } from "@/components/dashboard/DomainCard";
import { DomainsRadar } from "@/components/dashboard/DomainsRadar";
import { FadeIn, StaggerContainer, staggerItem } from "@/components/ui/FadeIn";
import { AlertTriangle, ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";
import { ExportButton } from "@/components/dashboard/ExportButton";

const severityData = [
  { label: "Critiques", count: 10, color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
  { label: "Majeurs", count: 20, color: "#f97316", bg: "rgba(249,115,22,0.1)" },
  { label: "Mineurs", count: 14, color: "#eab308", bg: "rgba(234,179,8,0.1)" },
  { label: "Positifs", count: 4, color: "#22c55e", bg: "rgba(34,197,94,0.1)" },
];

export default function DashboardPage() {
  const { profile, globalScore, maxScore, executiveSummary, domains, actionPlan } = report;

  return (
    <div>
      <DashboardHeader
        title="Vue d'ensemble"
        subtitle={`pjr-rails · Audit du ${profile.date}`}
        badge="Rapport de diagnostic"
      />

      {/* Export button */}
      <div className="flex justify-end mb-6 -mt-2">
        <ExportButton />
      </div>

      {/* Top row - Score + radar */}
      <div className="grid lg:grid-cols-3 gap-5 mb-6">
        {/* Global score */}
        <FadeIn className="lg:col-span-1">
          <div className="glass rounded-2xl p-6 border border-white/7 h-full">
            <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-6">
              Score de santé global
            </p>
            <div className="flex flex-col items-center">
              <ScoreRing
                score={globalScore}
                maxScore={maxScore}
                size={160}
                strokeWidth={12}
              />
              <div className="mt-6 text-center">
                <p className="text-sm font-semibold text-red-400 mb-1">État critique</p>
                <p className="text-xs text-white/40 max-w-[180px] text-center leading-relaxed">
                  {executiveSummary.meaning.slice(0, 80)}…
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Radar chart */}
        <FadeIn delay={0.1} className="lg:col-span-2">
          <div className="glass rounded-2xl p-6 border border-white/7 h-full">
            <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-4">
              Scores par domaine
            </p>
            <DomainsRadar />
            <div className="mt-4 space-y-2">
              {domains.map((d, i) => (
                <DomainScoreBar
                  key={d.id}
                  score={d.score}
                  maxScore={d.maxScore}
                  label={d.name}
                  icon={d.icon}
                  delay={i}
                />
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Findings summary */}
      <FadeIn delay={0.15} className="mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {severityData.map((item) => (
            <div
              key={item.label}
              className="glass rounded-2xl p-5 border border-white/7 text-center"
              style={{ background: item.bg }}
            >
              <div
                className="text-3xl font-bold mb-1"
                style={{ color: item.color }}
              >
                {item.count}
              </div>
              <div className="text-xs text-white/50">{item.label}</div>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Domain cards */}
      <FadeIn delay={0.2} className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-medium text-white/40 uppercase tracking-wider">
            Domaines analysés
          </p>
        </div>
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {domains.map((domain, i) => (
            <DomainCard key={domain.id} domain={domain} delay={0.05 * i} />
          ))}
        </div>
      </FadeIn>

      {/* Top 5 risks */}
      <FadeIn delay={0.25} className="mb-6">
        <div className="glass rounded-2xl p-6 border border-white/7">
          <div className="flex items-center justify-between mb-5">
            <p className="text-xs font-medium text-white/40 uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-orange-400" />
              Les 5 risques principaux
            </p>
          </div>
          <div className="space-y-4">
            {executiveSummary.topRisks.map((risk, i) => (
              <div key={i} className="flex gap-4">
                <div
                  className="w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                  style={{
                    background: "rgba(239,68,68,0.1)",
                    color: "#ef4444",
                    border: "1px solid rgba(239,68,68,0.2)",
                  }}
                >
                  {i + 1}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white mb-1">{risk.title}</p>
                  <p className="text-xs text-white/45 leading-relaxed">{risk.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Budget summary */}
      <FadeIn delay={0.3}>
        <div className="glass rounded-2xl p-6 border border-white/7">
          <div className="flex items-center justify-between mb-5">
            <p className="text-xs font-medium text-white/40 uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5 text-violet-400" />
              Estimation budgétaire
            </p>
            <Link
              href="/dashboard/action-plan"
              className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-colors"
            >
              Voir le plan <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {actionPlan.lots.map((lot) => (
              <div
                key={lot.id}
                className="rounded-xl p-4 border"
                style={{
                  background: `${lot.color}08`,
                  borderColor: `${lot.color}20`,
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">{lot.emoji}</span>
                  <span className="text-sm font-semibold text-white">{lot.name}</span>
                </div>
                <div className="text-xs text-white/40 mb-2">{lot.days} jours</div>
                <div className="text-sm font-bold" style={{ color: lot.color }}>
                  {lot.budgetMin.toLocaleString("fr-FR")}€
                  <span className="text-white/30 font-normal"> — </span>
                  {lot.budgetMax.toLocaleString("fr-FR")}€
                </div>
              </div>
            ))}
          </div>
          <div
            className="mt-4 pt-4 border-t border-white/6 flex justify-between items-center"
          >
            <span className="text-sm text-white/50">Total indicatif</span>
            <span className="text-sm font-bold text-white">
              15 500€ <span className="text-white/30">—</span> 31 000€
              <span className="text-xs font-normal text-white/30 ml-2">/ 31 jours</span>
            </span>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
