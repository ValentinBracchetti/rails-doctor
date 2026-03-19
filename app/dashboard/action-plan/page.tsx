import { report } from "@/data/report";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { FadeIn } from "@/components/ui/FadeIn";
import { SeverityBadge, EffortBadge } from "@/components/ui/Badge";
import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

export default function ActionPlanPage() {
  const { actionPlan, domains } = report;

  const domainIdByName = new Map<string, string>(
    domains.map((domain) => [domain.name, domain.id])
  );

  const benefitByFindingId = new Map<string, string>(
    domains.flatMap((domain) =>
      domain.findings.map((finding) => [finding.id, finding.benefit])
    )
  );

  return (
    <div>
      <DashboardHeader
        title="Plan d'action priorisé"
        subtitle="pjr-rails · 3 lots · 31 jours · 15 500€ – 31 000€"
        badge="Plan d'intervention"
      />

      {/* Timeline */}
      <FadeIn className="mb-8">
        <div className="glass rounded-2xl p-6 border border-white/7">
          <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-5">
            Séquencement recommandé
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {actionPlan.lots.map((lot, i) => (
              <div key={lot.id} className="flex items-center gap-3">
                <div
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border"
                  style={{
                    background: `${lot.color}12`,
                    borderColor: `${lot.color}30`,
                  }}
                >
                  <span className="text-sm">{lot.emoji}</span>
                  <div>
                    <div className="text-xs font-semibold text-white">{lot.name}</div>
                    <div className="text-xs text-white/40">
                      {i === 0 ? "Mois 1" : i === 1 ? "Mois 2–3" : "Mois 4+"}
                    </div>
                  </div>
                  <div className="text-xs font-bold" style={{ color: lot.color }}>
                    {lot.days}j
                  </div>
                </div>
                {i < actionPlan.lots.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-white/20 hidden sm:block" />
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-white/35 mt-4">{actionPlan.sequencing}</p>
        </div>
      </FadeIn>

      {/* Lots Kanban */}
      <div className="grid lg:grid-cols-3 gap-5 mb-8">
        {actionPlan.lots.map((lot, lotIdx) => (
          <FadeIn key={lot.id} delay={lotIdx * 0.1}>
            <div
              className="rounded-2xl overflow-hidden border h-full"
              style={{
                borderColor: `${lot.color}25`,
                background: `${lot.color}05`,
              }}
            >
              {/* Lot header */}
              <div
                className="px-5 py-4 border-b"
                style={{ borderColor: `${lot.color}20` }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{lot.emoji}</span>
                    <div>
                      <h3 className="text-sm font-bold text-white">
                        Lot {lotIdx + 1} — {lot.name}
                      </h3>
                      <p className="text-xs text-white/40 mt-0.5">{lot.description}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1.5 text-xs text-white/50">
                    <Clock className="w-3.5 h-3.5" />
                    {lot.days} jours
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold" style={{ color: lot.color }}>
                    {lot.budgetMin.toLocaleString("fr-FR")}€
                    <span className="text-white/30 font-normal">–</span>
                    {lot.budgetMax.toLocaleString("fr-FR")}€
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="p-3 space-y-2">
                {lot.items.map((item) => {
                  const domainId = domainIdByName.get(item.domain);
                  const itemDetailHref = domainId
                    ? `/dashboard/${domainId}#finding-${item.findingId}`
                    : "/dashboard";
                  const clientBenefit =
                    benefitByFindingId.get(item.findingId) ??
                    `Vous gagnez en ${item.impact.toLowerCase()} au quotidien.`;

                  return (
                    <div
                      key={item.findingId}
                      className="glass rounded-xl p-3 border border-white/6 hover:border-white/10 transition-all duration-200"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <span className="text-xs font-mono text-white/25 mr-1.5">
                            {item.findingId}
                          </span>
                          <span className="text-xs text-white/30">{item.domain}</span>
                        </div>
                        <SeverityBadge severity={item.severity} size="sm" />
                      </div>

                      <p className="text-xs font-semibold text-white mb-1.5">{item.title}</p>

                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <EffortBadge effort={item.effort} size="sm" />
                          <span className="text-xs text-white/30">{item.estimate}</span>
                        </div>
                        <Link
                          href={itemDetailHref}
                          title={`Voir les détails dans l'onglet ${item.domain}`}
                          aria-label={`Voir les détails de ${item.findingId} dans l'onglet ${item.domain}`}
                          className="inline-flex items-center gap-1 text-xs text-violet-300 hover:text-violet-200 transition-colors"
                        >
                          Voir les détails
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>

                      <p className="text-xs mt-2 leading-relaxed">
                        <span className="font-semibold text-emerald-300/90">
                          Bénéfice pour vous :
                        </span>{" "}
                        <span className="text-white/65">{clientBenefit}</span>
                      </p>

                      {item.deliverable && (
                        <p className="text-xs text-white/35 mt-1.5 italic">
                          Livrable : {item.deliverable}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Budget recap table */}
      <FadeIn delay={0.3}>
        <div className="glass rounded-2xl border border-white/7 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/7">
            <p className="text-xs font-medium text-white/40 uppercase tracking-wider">
              Récapitulatif budgétaire
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/6">
                  <th className="text-left text-xs font-medium text-white/40 px-6 py-3">Lot</th>
                  <th className="text-right text-xs font-medium text-white/40 px-6 py-3">Jours</th>
                  <th className="text-right text-xs font-medium text-white/40 px-6 py-3">Budget min.</th>
                  <th className="text-right text-xs font-medium text-white/40 px-6 py-3">Budget max.</th>
                </tr>
              </thead>
              <tbody>
                {actionPlan.budget.map((row, i) => (
                  <tr key={i} className="border-b border-white/4 hover:bg-white/2 transition-colors">
                    <td className="px-6 py-3.5 text-sm text-white/70">{row.lot}</td>
                    <td className="px-6 py-3.5 text-sm text-right text-white/50">{row.days} j</td>
                    <td className="px-6 py-3.5 text-sm text-right text-white/60">
                      {row.budgetMin.toLocaleString("fr-FR")} €
                    </td>
                    <td className="px-6 py-3.5 text-sm text-right font-semibold text-white">
                      {row.budgetMax.toLocaleString("fr-FR")} €
                    </td>
                  </tr>
                ))}
                {/* Total row */}
                <tr className="bg-white/3">
                  <td className="px-6 py-4 text-sm font-bold text-white">Total</td>
                  <td className="px-6 py-4 text-sm text-right font-bold text-white">31 j</td>
                  <td className="px-6 py-4 text-sm text-right font-bold text-violet-400">
                    15 500 €
                  </td>
                  <td className="px-6 py-4 text-sm text-right font-bold text-violet-400">
                    31 000 €
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 bg-white/2 border-t border-white/6">
            <p className="text-xs text-white/25">
              * Fourchette indicative basée sur un TJM de 500€ à 1 000€. Les estimations seront
              affinées lors du cadrage détaillé de chaque lot.
            </p>
          </div>
        </div>
      </FadeIn>

      {/* CTA */}
      <FadeIn delay={0.4} className="mt-8">
        <div
          className="rounded-2xl p-8 text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(37,99,235,0.1) 100%)",
            border: "1px solid rgba(124,58,237,0.25)",
          }}
        >
          <p className="text-lg font-bold text-white mb-2">
            Prêt à démarrer le Lot 1 ?
          </p>
          <p className="text-sm text-white/50 mb-6 max-w-sm mx-auto">
            Nous pouvons démarrer sous 2 semaines. Premier échange de 30 minutes offert.
          </p>
          <a
            href="mailto:contact@rails-doctor.io"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm transition-all duration-300 hover:scale-[1.03]"
            style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)" }}
          >
            Nous contacter
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </FadeIn>
    </div>
  );
}
