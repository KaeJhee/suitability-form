"use client";

import BubbleSelector from "../BubbleSelector";
import { assetClassesByRisk } from "@/lib/formData";

export default function Phase2AssetClasses({ formData, updateField, next, back }) {
  const options = assetClassesByRisk[formData.riskTolerance] || assetClassesByRisk.Moderate;

  const toggle = (id) => {
    const current = formData.assetClasses;
    const updated = current.includes(id)
      ? current.filter((x) => x !== id)
      : [...current, id];
    updateField("assetClasses", updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Choose Your Destiny</h2>
        <p className="text-sm text-gray-400 mt-1">
          Tap the asset classes you want exposure to. Pick as many as you like.
        </p>
        <p className="text-xs text-ghost-accent mt-2">
          Showing options for: <span className="font-semibold">{formData.riskTolerance}</span> profile
        </p>
      </div>

      <BubbleSelector
        options={options}
        selected={formData.assetClasses}
        onToggle={toggle}
        height={520}
      />

      <div className="flex justify-between pt-2">
        <button onClick={back} className="btn-secondary">
          Back
        </button>
        <button
          onClick={next}
          disabled={formData.assetClasses.length === 0}
          className="btn-primary"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
