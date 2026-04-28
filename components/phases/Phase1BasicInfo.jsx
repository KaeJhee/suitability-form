"use client";

import { useState } from "react";

// Practical email regex — not RFC-perfect, but catches the common typos
// (missing @, missing dot, trailing space) that real users actually make.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Phase1BasicInfo({ formData, updateField, next }) {
  const [touched, setTouched] = useState(false);
  // Track which fields the user has interacted with so we don't yell at them
  // about empty fields they haven't tried to fill in yet.
  const [touchedFields, setTouchedFields] = useState({});

  const required = [
    "fullName",
    "email",
    "age",
    "annualIncome",
    "netWorth",
    "liquidNetWorth",
    "investmentExperience",
    "investmentObjective",
    "riskTolerance",
  ];

  const isEmailValid = EMAIL_RE.test(formData.email || "");
  const allRequiredFilled = required.every(
    (f) => String(formData[f] || "").trim() !== ""
  );
  const isValid = allRequiredFilled && isEmailValid;

  const handleNext = () => {
    setTouched(true);
    if (isValid) next();
  };

  const markTouched = (field) =>
    setTouchedFields((prev) => ({ ...prev, [field]: true }));

  // Field-level error checks
  const showRequiredError = (field) => {
    const wasInteracted = touched || touchedFields[field];
    return wasInteracted && !String(formData[field] || "").trim();
  };

  const showEmailFormatError = () => {
    const wasInteracted = touched || touchedFields.email;
    return wasInteracted && formData.email.trim() !== "" && !isEmailValid;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Suitability Information</h2>
        <p className="text-sm text-gray-400 mt-1">
          Required for TSSB compliance. All fields are confidential.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="label-base">Full Legal Name *</label>
          <input
            className="input-base"
            value={formData.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            onBlur={() => markTouched("fullName")}
            placeholder="Jane A. Doe"
          />
          {showRequiredError("fullName") && (
            <p className="text-red-400 text-xs mt-1">Required</p>
          )}
        </div>

        <div>
          <label className="label-base">Email *</label>
          <input
            type="email"
            className={`input-base ${
              showEmailFormatError() ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
            }`}
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            onBlur={() => markTouched("email")}
            placeholder="jane@example.com"
            autoComplete="email"
          />
          {showRequiredError("email") && (
            <p className="text-red-400 text-xs mt-1">Required</p>
          )}
          {showEmailFormatError() && (
            <p className="text-red-400 text-xs mt-1">
              Please enter a valid email address (e.g., name@example.com)
            </p>
          )}
        </div>

        <div>
          <label className="label-base">Phone</label>
          <input
            className="input-base"
            value={formData.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            placeholder="(210) 555-1234"
            autoComplete="tel"
          />
        </div>

        <div>
          <label className="label-base">Age *</label>
          <input
            type="number"
            className="input-base"
            value={formData.age}
            onChange={(e) => updateField("age", e.target.value)}
            onBlur={() => markTouched("age")}
            placeholder="42"
          />
          {showRequiredError("age") && (
            <p className="text-red-400 text-xs mt-1">Required</p>
          )}
        </div>

        <div>
          <label className="label-base">Annual Income (USD) *</label>
          <select
            className="input-base"
            value={formData.annualIncome}
            onChange={(e) => updateField("annualIncome", e.target.value)}
            onBlur={() => markTouched("annualIncome")}
          >
            <option value="">Select range</option>
            <option>Under $50,000</option>
            <option>$50,000 - $100,000</option>
            <option>$100,000 - $250,000</option>
            <option>$250,000 - $500,000</option>
            <option>$500,000 - $1,000,000</option>
            <option>Over $1,000,000</option>
          </select>
          {showRequiredError("annualIncome") && (
            <p className="text-red-400 text-xs mt-1">Required</p>
          )}
        </div>

        <div>
          <label className="label-base">Estimated Net Worth (USD) *</label>
          <select
            className="input-base"
            value={formData.netWorth}
            onChange={(e) => updateField("netWorth", e.target.value)}
            onBlur={() => markTouched("netWorth")}
          >
            <option value="">Select range</option>
            <option>Under $100,000</option>
            <option>$100,000 - $500,000</option>
            <option>$500,000 - $1,000,000</option>
            <option>$1,000,000 - $5,000,000</option>
            <option>$5,000,000 - $25,000,000</option>
            <option>Over $25,000,000</option>
          </select>
          {showRequiredError("netWorth") && (
            <p className="text-red-400 text-xs mt-1">Required</p>
          )}
        </div>

        <div>
          <label className="label-base">Liquid Net Worth (USD) *</label>
          <select
            className="input-base"
            value={formData.liquidNetWorth}
            onChange={(e) => updateField("liquidNetWorth", e.target.value)}
            onBlur={() => markTouched("liquidNetWorth")}
          >
            <option value="">Select range</option>
            <option>Under $50,000</option>
            <option>$50,000 - $250,000</option>
            <option>$250,000 - $1,000,000</option>
            <option>$1,000,000 - $5,000,000</option>
            <option>Over $5,000,000</option>
          </select>
          {showRequiredError("liquidNetWorth") && (
            <p className="text-red-400 text-xs mt-1">Required</p>
          )}
        </div>

        <div>
          <label className="label-base">Investment Experience *</label>
          <select
            className="input-base"
            value={formData.investmentExperience}
            onChange={(e) => updateField("investmentExperience", e.target.value)}
            onBlur={() => markTouched("investmentExperience")}
          >
            <option value="">Select level</option>
            <option>None</option>
            <option>Limited</option>
            <option>Good</option>
            <option>Extensive</option>
          </select>
          {showRequiredError("investmentExperience") && (
            <p className="text-red-400 text-xs mt-1">Required</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="label-base">General Investment Objective *</label>
          <select
            className="input-base"
            value={formData.investmentObjective}
            onChange={(e) => updateField("investmentObjective", e.target.value)}
            onBlur={() => markTouched("investmentObjective")}
          >
            <option value="">Select objective</option>
            <option>Capital Preservation</option>
            <option>Income Generation</option>
            <option>Balanced Growth & Income</option>
            <option>Long-Term Growth</option>
            <option>Aggressive Growth / Speculation</option>
          </select>
          {showRequiredError("investmentObjective") && (
            <p className="text-red-400 text-xs mt-1">Required</p>
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-ghost-700">
        <label className="label-base text-base">Risk Tolerance *</label>
        <p className="text-xs text-gray-500 mb-3">
          This determines the investment options shown on the next screens.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {["Conservative", "Moderate", "Aggressive"].map((level) => {
            const active = formData.riskTolerance === level;
            return (
              <button
                key={level}
                type="button"
                onClick={() => updateField("riskTolerance", level)}
                className={`px-4 py-4 rounded-lg border-2 font-semibold transition-all ${
                  active
                    ? "bg-ghost-accent border-ghost-accent text-white"
                    : "bg-ghost-800 border-ghost-700 text-gray-300 hover:border-ghost-accent"
                }`}
              >
                {level}
              </button>
            );
          })}
        </div>
        {showRequiredError("riskTolerance") && (
          <p className="text-red-400 text-xs mt-2">Required</p>
        )}
      </div>

      <div className="flex justify-end pt-4">
        <button onClick={handleNext} className="btn-primary">
          Continue
        </button>
      </div>
    </div>
  );
}
