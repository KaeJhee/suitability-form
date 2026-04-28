"use client";

import { lossAversionOptions } from "@/lib/formData";

export default function Phase5LossAversion({ formData, updateField, next, back }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Loss Aversion</h2>
        <p className="text-sm text-gray-400 mt-1">
          How do you react to market drawdowns?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {lossAversionOptions.map((opt) => {
          const active = formData.lossAversion === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => updateField("lossAversion", opt.id)}
              className={`px-5 py-5 text-left rounded-lg border-2 font-semibold transition-all ${
                active
                  ? "bg-ghost-accent border-ghost-accent text-white"
                  : "bg-ghost-800 border-ghost-700 text-gray-300 hover:border-ghost-accent"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    active ? "border-white bg-white" : "border-gray-500"
                  }`}
                >
                  {active && <div className="w-2 h-2 rounded-full bg-ghost-accent" />}
                </div>
                {opt.label}
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex justify-between pt-4">
        <button onClick={back} className="btn-secondary">
          Back
        </button>
        <button onClick={next} disabled={!formData.lossAversion} className="btn-primary">
          Continue
        </button>
      </div>
    </div>
  );
}
