"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { initialFormState } from "@/lib/formData";
import PhasePills from "./PhasePills";
import Phase1BasicInfo from "./phases/Phase1BasicInfo";
import Phase2AssetClasses from "./phases/Phase2AssetClasses";
import Phase3Industries from "./phases/Phase3Industries";
import Phase4Investments from "./phases/Phase4Investments";
import Phase5LossAversion from "./phases/Phase5LossAversion";
import Phase6ProfitTaking from "./phases/Phase6ProfitTaking";
import Phase7Services from "./phases/Phase7Services";
import Phase8Congrats from "./phases/Phase8Congrats";

const TOTAL_PHASES = 8;

// Phase metadata for the pill navigation. Short labels by user preference.
const PHASES = [
  { key: "info", label: "Info" },
  { key: "assets", label: "Assets" },
  { key: "industries", label: "Industries" },
  { key: "holdings", label: "Holdings" },
  { key: "risk", label: "Risk" },
  { key: "profits", label: "Profits" },
  { key: "services", label: "Services" },
  { key: "done", label: "Done" },
];

export default function MultiStepForm() {
  const [phase, setPhase] = useState(1);
  // Highest phase number the user has reached. Pills are clickable up to this point.
  const [maxReached, setMaxReached] = useState(1);
  const [formData, setFormData] = useState(initialFormState);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const goTo = (n) => {
    const target = Math.max(1, Math.min(n, TOTAL_PHASES));
    setPhase(target);
    setMaxReached((prev) => Math.max(prev, target));
  };

  const next = () => goTo(phase + 1);
  const back = () => setPhase((p) => Math.max(p - 1, 1));

  // User clicked a pill. Only allow jumping to phases they've already reached.
  const jumpTo = (n) => {
    if (n <= maxReached && n !== phase) {
      setPhase(n);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.error || "Submission failed");
      }
      next();
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const renderPhase = () => {
    const sharedProps = { formData, updateField, next, back };
    switch (phase) {
      case 1:
        return <Phase1BasicInfo {...sharedProps} />;
      case 2:
        return <Phase2AssetClasses {...sharedProps} />;
      case 3:
        return <Phase3Industries {...sharedProps} />;
      case 4:
        return <Phase4Investments {...sharedProps} />;
      case 5:
        return <Phase5LossAversion {...sharedProps} />;
      case 6:
        return <Phase6ProfitTaking {...sharedProps} />;
      case 7:
        return (
          <Phase7Services
            {...sharedProps}
            onSubmit={handleSubmit}
            submitting={submitting}
            submitError={submitError}
          />
        );
      case 8:
        return <Phase8Congrats formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center px-4 py-8 md:py-12">
      <div className="w-full max-w-4xl">
        <header className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Ghost Strategies <span className="text-ghost-accent">|</span> Client Onboarding
          </h1>
          <p className="text-sm text-gray-400 mt-2">
            TSSB Suitability Intake (Phase {phase} of {TOTAL_PHASES})
          </p>
        </header>

        {phase < TOTAL_PHASES && (
          <PhasePills
            current={phase}
            phases={PHASES}
            maxReached={maxReached}
            onJump={jumpTo}
          />
        )}

        <div className="mt-8 bg-ghost-900 border border-ghost-700 rounded-2xl p-6 md:p-10 shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={phase}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              {renderPhase()}
            </motion.div>
          </AnimatePresence>
        </div>

        <footer className="mt-8 text-center text-xs text-gray-600">
          Information collected per Texas Administrative Code Title 7, Part 7.
          Ghost Strategies LLC. All responses are confidential.
        </footer>
      </div>
    </div>
  );
}
