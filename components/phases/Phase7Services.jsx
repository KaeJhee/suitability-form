"use client";

import { firmServiceOptions } from "@/lib/formData";

export default function Phase7Services({
  formData,
  updateField,
  back,
  onSubmit,
  submitting,
  submitError,
}) {
  const toggle = (id) => {
    const current = formData.firmServices;
    const updated = current.includes(id)
      ? current.filter((x) => x !== id)
      : [...current, id];
    updateField("firmServices", updated);
  };

  const canSubmit = formData.firmServices.length > 0 && !submitting;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Services You Need</h2>
        <p className="text-sm text-gray-400 mt-1">
          Select all services you want from Ghost Strategies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {firmServiceOptions.map((opt) => {
          const active = formData.firmServices.includes(opt.id);
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => toggle(opt.id)}
              className={`px-5 py-5 text-left rounded-lg border-2 font-semibold transition-all ${
                active
                  ? "bg-ghost-accent border-ghost-accent text-white"
                  : "bg-ghost-800 border-ghost-700 text-gray-300 hover:border-ghost-accent"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    active ? "border-white bg-white" : "border-gray-500"
                  }`}
                >
                  {active && (
                    <svg
                      className="w-3 h-3 text-ghost-accent"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                {opt.label}
              </div>
            </button>
          );
        })}
      </div>

      {submitError && (
        <div className="px-4 py-3 rounded-lg bg-red-950/50 border border-red-800 text-red-300 text-sm">
          {submitError}
        </div>
      )}

      <div className="flex justify-between pt-4">
        <button onClick={back} className="btn-secondary" disabled={submitting}>
          Back
        </button>
        <button onClick={onSubmit} disabled={!canSubmit} className="btn-primary">
          {submitting ? "Submitting..." : "Submit Application"}
        </button>
      </div>
    </div>
  );
}
