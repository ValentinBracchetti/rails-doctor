"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, User, ArrowRight, Stethoscope } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Suspense } from "react";

function LoginForm() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/dashboard";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Erreur de connexion.");
      } else {
        router.push(from);
        router.refresh();
      }
    } catch {
      setError("Erreur réseau. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <Input
        label="Identifiant"
        type="text"
        placeholder="admin"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        icon={<User className="w-4 h-4" />}
        autoComplete="username"
        required
      />
      <Input
        label="Mot de passe"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        icon={<Lock className="w-4 h-4" />}
        autoComplete="current-password"
        required
      />
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3"
        >
          {error}
        </motion.div>
      )}
      <Button
        type="submit"
        loading={loading}
        size="lg"
        className="w-full mt-2"
        iconRight={<ArrowRight className="w-4 h-4" />}
      >
        Accéder au rapport
      </Button>
    </motion.form>
  );
}

function LoginFormFallback() {
  return (
    <form className="space-y-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-white/70">Identifiant</label>
        <input
          type="text"
          placeholder="admin"
          autoComplete="username"
          required
          className="w-full glass rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/30 border border-white/10 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all duration-200 bg-white/3"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-white/70">Mot de passe</label>
        <input
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          required
          className="w-full glass rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/30 border border-white/10 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all duration-200 bg-white/3"
        />
      </div>
      <button
        type="submit"
        className="w-full mt-2 inline-flex items-center justify-center font-medium transition-all duration-200 bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-lg shadow-violet-500/25 px-7 py-3.5 text-base rounded-xl gap-2.5 cursor-pointer"
      >
        Accéder au rapport
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="animate-mesh-1 absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
          }}
        />
        <div
          className="animate-mesh-2 absolute -bottom-40 -right-40 w-96 h-96 rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
          }}
        />
        <div
          className="animate-mesh-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #2563eb 0%, transparent 70%)",
          }}
        />
        <div className="absolute inset-0 dot-pattern opacity-30" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <Link
            href="/"
            className="text-sm text-white/40 hover:text-white/70 transition-colors"
          >
            &larr; Retour &agrave; l&apos;accueil
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="glass-strong rounded-3xl p-8 border border-white/10"
          style={{
            boxShadow: "0 0 80px rgba(124,58,237,0.15), 0 0 0 1px rgba(255,255,255,0.06)",
          }}
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #2563eb)",
                boxShadow: "0 0 30px rgba(124,58,237,0.4)",
              }}
            >
              <Stethoscope className="w-7 h-7 text-white" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold gradient-text mb-1"
            >
              Rails Doctor
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm text-white/40"
            >
              Acc&egrave;s s&eacute;curis&eacute; au rapport de diagnostic
            </motion.p>
          </div>

          <Suspense fallback={<LoginFormFallback />}>
            <LoginForm />
          </Suspense>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-xs text-white/20 mt-6"
        >
          Rapport confidentiel &mdash; acc&egrave;s r&eacute;serv&eacute;
        </motion.p>
      </div>
    </div>
  );
}
