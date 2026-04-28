// Initial form state
export const initialFormState = {
  // Phase 1
  fullName: "",
  email: "",
  phone: "",
  age: "",
  annualIncome: "",
  netWorth: "",
  liquidNetWorth: "",
  investmentExperience: "",
  investmentObjective: "",
  riskTolerance: "",

  // Phase 2-7
  assetClasses: [],
  industries: [],
  specificInvestments: [],
  lossAversion: "",
  profitTaking: "",
  firmServices: [],
};

// Phase 2: Asset class bubbles by risk profile
export const assetClassesByRisk = {
  Aggressive: [
    { id: "stocks", label: "Individual Stocks", color: "#ef4444" },
    { id: "crypto", label: "Crypto", color: "#f59e0b" },
    { id: "private-equity", label: "Private Equity", color: "#8b5cf6" },
    { id: "options", label: "Options", color: "#ec4899" },
    { id: "venture", label: "Venture / Pre-IPO", color: "#06b6d4" },
    { id: "leveraged-etf", label: "Leveraged ETFs", color: "#f97316" },
    { id: "futures", label: "Futures", color: "#84cc16" },
    { id: "alts", label: "Alternative Assets", color: "#a855f7" },
  ],
  Moderate: [
    { id: "blue-chip", label: "Blue-Chip Stocks", color: "#3b82f6" },
    { id: "index-funds", label: "Index Funds", color: "#10b981" },
    { id: "sector-etfs", label: "Sector ETFs", color: "#6366f1" },
    { id: "blend", label: "Stock/Bond Blend", color: "#14b8a6" },
    { id: "reits", label: "REITs", color: "#f59e0b" },
    { id: "dividend", label: "Dividend Stocks", color: "#0ea5e9" },
    { id: "intl", label: "International Funds", color: "#8b5cf6" },
    { id: "ig-bonds", label: "Investment Grade Bonds", color: "#22c55e" },
  ],
  Conservative: [
    { id: "treasuries", label: "Treasuries", color: "#22c55e" },
    { id: "ig-bonds", label: "Investment Grade Bonds", color: "#10b981" },
    { id: "cds", label: "CDs / Money Market", color: "#06b6d4" },
    { id: "index-funds", label: "Broad Index Funds", color: "#3b82f6" },
    { id: "blue-chip", label: "Blue-Chip Dividend Stocks", color: "#6366f1" },
    { id: "tdf", label: "Target Date Funds", color: "#14b8a6" },
    { id: "muni", label: "Municipal Bonds", color: "#0ea5e9" },
    { id: "annuities", label: "Annuities", color: "#84cc16" },
  ],
};

// Phase 3: Industry options
export const industries = [
  { id: "semis", label: "Semiconductors", color: "#06b6d4" },
  { id: "software", label: "Software / SaaS", color: "#6366f1" },
  { id: "ai", label: "Artificial Intelligence", color: "#8b5cf6" },
  { id: "consumer-staples", label: "Consumer Staples", color: "#22c55e" },
  { id: "defense", label: "Defense / Aerospace", color: "#ef4444" },
  { id: "healthcare", label: "Healthcare / Biotech", color: "#ec4899" },
  { id: "green-energy", label: "Green Energy", color: "#10b981" },
  { id: "energy", label: "Oil & Gas", color: "#f97316" },
  { id: "financials", label: "Financials", color: "#3b82f6" },
  { id: "real-estate", label: "Real Estate", color: "#f59e0b" },
  { id: "industrials", label: "Industrials", color: "#a855f7" },
  { id: "consumer-disc", label: "Consumer Discretionary", color: "#0ea5e9" },
];

// Phase 4: Specific investments by risk
// Each risk tier has two groups: funds (ETFs/diversified) and stocks (individual names)
export const investmentsByRisk = {
  Aggressive: {
    funds: [
      { id: "smh", label: "SMH", color: "#06b6d4" },
      { id: "nlr", label: "NLR", color: "#84cc16" },
      { id: "ibit", label: "IBIT", color: "#f97316" },
      { id: "qqq", label: "QQQ", color: "#6366f1" },
      { id: "spy", label: "SPY", color: "#3b82f6" },
      { id: "dia", label: "DIA", color: "#0ea5e9" },
    ],
    stocks: [
      { id: "nvda", label: "NVDA", color: "#10b981" },
      { id: "tsla", label: "TSLA", color: "#ef4444" },
      { id: "amd", label: "AMD", color: "#dc2626" },
      { id: "googl", label: "GOOGL", color: "#3b82f6" },
      { id: "amzn", label: "AMZN", color: "#f59e0b" },
      { id: "lly", label: "LLY", color: "#ec4899" },
    ],
    private: [
      { id: "spacex", label: "SpaceX", color: "#8b5cf6" },
      { id: "anthropic", label: "Anthropic", color: "#a855f7" },
      { id: "openai", label: "OpenAI", color: "#7c3aed" },
      { id: "stripe", label: "Stripe", color: "#6366f1" },
      { id: "databricks", label: "Databricks", color: "#dc2626" },
      { id: "ramp", label: "Ramp", color: "#f59e0b" },
      { id: "anduril", label: "Anduril", color: "#ef4444" },
      { id: "cerebras", label: "Cerebras", color: "#ec4899" },
    ],
  },
  Moderate: {
    funds: [
      { id: "spy", label: "SPY", color: "#3b82f6" },
      { id: "voo", label: "VOO", color: "#6366f1" },
      { id: "qqq", label: "QQQ", color: "#8b5cf6" },
      { id: "dia", label: "DIA", color: "#0ea5e9" },
      { id: "smh", label: "SMH", color: "#06b6d4" },
      { id: "schd", label: "SCHD", color: "#10b981" },
    ],
    stocks: [
      { id: "nvda", label: "NVDA", color: "#10b981" },
      { id: "googl", label: "GOOGL", color: "#3b82f6" },
      { id: "amzn", label: "AMZN", color: "#f59e0b" },
      { id: "cost", label: "COST", color: "#ef4444" },
      { id: "lly", label: "LLY", color: "#ec4899" },
      { id: "sbux", label: "SBUX", color: "#22c55e" },
      { id: "intc", label: "INTC", color: "#0284c7" },
      { id: "shak", label: "SHAK", color: "#84cc16" },
    ],
  },
  Conservative: {
    funds: [
      { id: "spy", label: "SPY", color: "#3b82f6" },
      { id: "voo", label: "VOO", color: "#6366f1" },
      { id: "dia", label: "DIA", color: "#0ea5e9" },
      { id: "bnd", label: "BND", color: "#10b981" },
      { id: "agg", label: "AGG", color: "#22c55e" },
      { id: "tlt", label: "TLT (Treasuries)", color: "#06b6d4" },
      { id: "vym", label: "VYM (Dividend)", color: "#14b8a6" },
      { id: "tdf", label: "Target Date 2040", color: "#84cc16" },
    ],
    stocks: [
      { id: "cost", label: "COST", color: "#ef4444" },
      { id: "googl", label: "GOOGL", color: "#3b82f6" },
      { id: "lly", label: "LLY", color: "#ec4899" },
      { id: "sbux", label: "SBUX", color: "#22c55e" },
    ],
  },
};

// Helper: flatten funds + stocks + private for a given risk profile into one lookup array.
// Used by the email route for ID-to-label translation.
export function getAllInvestmentsForRisk(risk) {
  const tier = investmentsByRisk[risk] || investmentsByRisk.Moderate;
  return [...(tier.funds || []), ...(tier.stocks || []), ...(tier.private || [])];
}

// Phase 5
export const lossAversionOptions = [
  { id: "sell-10", label: "Sell if down 10%" },
  { id: "sell-20", label: "Sell if down 20%" },
  { id: "hold", label: "Hold through volatility" },
  { id: "buy-more", label: "Never sell, buy more on dips" },
];

// Phase 6
export const profitTakingOptions = [
  { id: "partial-25", label: "Take partial profits at +25%" },
  { id: "partial-50", label: "Take partial profits at +50%" },
  { id: "partial-100", label: "Take partial profits at +100%" },
  { id: "all-50", label: "Take ALL profits at +50%" },
  { id: "all-100", label: "Take ALL profits at +100%" },
  { id: "ride", label: "Let it ride indefinitely" },
];

// Phase 7
export const firmServiceOptions = [
  { id: "wealth-mgmt", label: "Wealth Management" },
  { id: "financial-planning", label: "Financial Planning" },
  { id: "tax-strategy", label: "Tax Strategy" },
  { id: "estate-planning", label: "Estate Planning" },
  { id: "retirement", label: "Retirement Planning" },
  { id: "business-advisory", label: "Business / LLC Advisory" },
];
