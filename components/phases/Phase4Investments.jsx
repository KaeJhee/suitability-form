"use client";

import BubbleSelector from "../BubbleSelector";
import { investmentsByRisk } from "@/lib/formData";

export default function Phase4Investments({ formData, updateField, next, back }) {
  const tier = investmentsByRisk[formData.riskTolerance] || investmentsByRisk.Moderate;
  const funds = tier.funds || [];
  const stocks = tier.stocks || [];
  const privateNames = tier.private || [];

  const toggle = (id) => {
    const current = formData.specificInvestments;
    const updated = current.includes(id)
      ? current.filter((x) => x !== id)
      : [...current, id];
    updateField("specificInvestments", updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Specific Investments</h2>
        <p className="text-sm text-gray-400 mt-1">
          Select any specific positions you are interested in or already hold.
          Tap the <span className="font-semibold text-ghost-accent">i</span> icon
          on any bubble for details.
        </p>
        <p className="text-xs text-ghost-accent mt-2">
          Tailored to your <span className="font-semibold">{formData.riskTolerance}</span> profile
        </p>
      </div>

      {/* Funds & ETFs */}
      {funds.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
              Funds &amp; ETFs
            </h3>
            <span className="text-xs text-gray-500">Diversified exposure</span>
          </div>
          <BubbleSelector
            options={funds}
            selected={formData.specificInvestments}
            onToggle={toggle}
            height={360}
          />
        </div>
      )}

      {/* Individual Stocks */}
      {stocks.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
              Individual Stocks
            </h3>
            <span className="text-xs text-gray-500">Single-name positions</span>
          </div>
          <BubbleSelector
            options={stocks}
            selected={formData.specificInvestments}
            onToggle={toggle}
            height={360}
          />
        </div>
      )}

      {/* Private / Pre-IPO (Aggressive only) */}
      {privateNames.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">
              Private &amp; Pre-IPO
            </h3>
            <span className="text-xs text-gray-500">Subject to availability</span>
          </div>
          <BubbleSelector
            options={privateNames}
            selected={formData.specificInvestments}
            onToggle={toggle}
            height={400}
          />
        </div>
      )}

      <div className="flex justify-between pt-2">
        <button onClick={back} className="btn-secondary">
          Back
        </button>
        <button onClick={next} className="btn-primary">
          Continue
        </button>
      </div>
    </div>
  );
}
