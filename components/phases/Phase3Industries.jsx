"use client";

import BubbleSelector from "../BubbleSelector";
import { industries } from "@/lib/formData";

export default function Phase3Industries({ formData, updateField, next, back }) {
  const toggle = (id) => {
    const current = formData.industries;
    const updated = current.includes(id)
      ? current.filter((x) => x !== id)
      : [...current, id];
    updateField("industries", updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Industries of Interest</h2>
        <p className="text-sm text-gray-400 mt-1">
          Which sectors do you want concentrated exposure to?
        </p>
      </div>

      <BubbleSelector
        options={industries}
        selected={formData.industries}
        onToggle={toggle}
        height={520}
      />

      <div className="flex justify-between pt-2">
        <button onClick={back} className="btn-secondary">
          Back
        </button>
        <button
          onClick={next}
          disabled={formData.industries.length === 0}
          className="btn-primary"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
