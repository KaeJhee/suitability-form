// Definitions shown in the info modal when a user taps the ⓘ icon on any bubble.
// Keyed by bubble id — covers asset classes, industries, and specific investments.
//
// Style guide for definitions:
//   - Neutral, factual tone (no buy/sell recommendations, no performance claims)
//   - One-line "what it is" + a short "why it fits this profile" note
//   - Compliance-safe: TSSB intake collects interest, does not solicit transactions
//
// Schema:
//   {
//     name: full legal/common name,
//     category: e.g. "Common Stock", "Spot ETF", "Pre-IPO Private Equity",
//     description: 1-3 sentence plain-English explanation,
//     note: optional contextual note (risk tier rationale, access path, etc.)
//   }

export const definitions = {
  // ============== ASSET CLASSES ==============
  stocks: {
    name: "Individual Stocks",
    category: "Equity",
    description:
      "Shares of ownership in publicly traded companies. Returns come from price appreciation and dividends.",
    note: "Concentrated single-name risk. Individual outcomes can vary widely from the broader market.",
  },
  crypto: {
    name: "Cryptocurrency",
    category: "Digital Asset",
    description:
      "Decentralized digital assets like Bitcoin and Ethereum. Held directly or via spot ETFs.",
    note: "High volatility asset class. Suitable only for portions of an aggressive portfolio.",
  },
  "private-equity": {
    name: "Private Equity",
    category: "Alternative Investment",
    description:
      "Ownership stakes in private (non-public) companies, often pre-IPO. Typically illiquid with longer hold periods.",
    note: "Access through Ghost Strategies private placements and SPV opportunities.",
  },
  options: {
    name: "Options",
    category: "Derivatives",
    description:
      "Contracts giving the right to buy or sell an underlying asset at a set price by a set date. Used for hedging, income, or speculation.",
    note: "Requires options-approved brokerage account. Can magnify both gains and losses.",
  },
  venture: {
    name: "Venture / Pre-IPO",
    category: "Alternative Investment",
    description:
      "Equity stakes in early-stage private companies. Highest potential return, highest risk of total loss.",
    note: "Typically requires accredited investor status. Long hold horizons (5-10+ years).",
  },
  "leveraged-etf": {
    name: "Leveraged ETFs",
    category: "Exchange-Traded Fund",
    description:
      "ETFs that use derivatives to deliver 2x or 3x the daily return of an underlying index. Reset daily.",
    note: "Designed for short-term trading. Volatility decay makes them poor long-term holdings.",
  },
  futures: {
    name: "Futures",
    category: "Derivatives",
    description:
      "Standardized contracts to buy or sell an asset at a future date for a preset price. Used for commodities, indexes, currencies, and rates.",
    note: "Highly leveraged. Requires futures-approved account and active risk management.",
  },
  alts: {
    name: "Alternative Assets",
    category: "Alternative Investment",
    description:
      "Non-traditional investments such as hedge funds, art, collectibles, infrastructure, or structured products.",
    note: "Often illiquid with high minimums and fees. Used for diversification.",
  },
  "blue-chip": {
    name: "Blue-Chip Stocks",
    category: "Common Stock",
    description:
      "Large, established companies with a long history of stable earnings, often paying dividends.",
    note: "Generally less volatile than the broader market. Examples: AAPL, MSFT, JPM.",
  },
  "index-funds": {
    name: "Index Funds",
    category: "Pooled Fund",
    description:
      "Mutual funds or ETFs designed to track a market index (e.g., S&P 500, total market). Low fees, broad diversification.",
    note: "Foundational holding for most long-term portfolios.",
  },
  "sector-etfs": {
    name: "Sector ETFs",
    category: "Exchange-Traded Fund",
    description:
      "ETFs that hold baskets of stocks within a single industry sector (technology, healthcare, energy, etc.).",
    note: "Used to overweight or underweight specific parts of the economy.",
  },
  blend: {
    name: "Stock/Bond Blend",
    category: "Pooled Fund",
    description:
      "Funds holding a fixed mix of stocks and bonds (e.g., 60/40, 70/30) for balanced exposure.",
    note: "Common building block for moderate-risk portfolios.",
  },
  reits: {
    name: "REITs",
    category: "Real Estate",
    description:
      "Real Estate Investment Trusts — companies that own and operate income-producing real estate. Required to distribute most income as dividends.",
    note: "Provides real estate exposure without direct property ownership.",
  },
  dividend: {
    name: "Dividend Stocks",
    category: "Common Stock",
    description:
      "Companies that regularly distribute a portion of earnings as cash payments to shareholders.",
    note: "Source of recurring income. Often less volatile than growth stocks.",
  },
  intl: {
    name: "International Funds",
    category: "Pooled Fund",
    description:
      "Funds holding stocks domiciled outside the United States (developed and emerging markets).",
    note: "Adds geographic diversification and currency exposure.",
  },
  "ig-bonds": {
    name: "Investment Grade Bonds",
    category: "Fixed Income",
    description:
      "Corporate or government debt rated BBB-/Baa3 or higher. Lower yields than high-yield (junk) bonds, but lower default risk.",
    note: "Anchor for income and capital preservation.",
  },
  treasuries: {
    name: "Treasuries",
    category: "Fixed Income",
    description:
      "Debt securities issued by the U.S. government. Considered the lowest-risk dollar-denominated investment.",
    note: "Backed by the full faith and credit of the U.S. Treasury.",
  },
  cds: {
    name: "CDs / Money Market",
    category: "Cash Equivalent",
    description:
      "Certificates of Deposit (bank-issued, fixed-term, FDIC-insured) and money market funds (short-term debt instruments).",
    note: "Capital preservation with modest yield. Highly liquid.",
  },
  tdf: {
    name: "Target Date Funds",
    category: "Pooled Fund",
    description:
      "Funds that automatically shift from stocks to bonds as a target retirement year approaches.",
    note: "Accessed via your 401(k) provider or through Charles Schwab for retail accounts outside employer-sponsored plans.",
  },
  muni: {
    name: "Municipal Bonds",
    category: "Fixed Income",
    description:
      "Debt issued by state and local governments. Interest is typically exempt from federal (and sometimes state) income tax.",
    note: "Tax efficiency makes them especially attractive in higher tax brackets.",
  },
  annuities: {
    name: "Annuities",
    category: "Insurance Product",
    description:
      "Insurance contracts that exchange a lump sum or premiums for guaranteed income (immediate or deferred).",
    note: "Used for retirement income certainty. Fees and surrender terms vary widely.",
  },

  // ============== INDUSTRIES ==============
  semis: {
    name: "Semiconductors",
    category: "Industry Sector",
    description:
      "Companies that design and manufacture chips powering computers, phones, AI, autos, and industrial equipment.",
    note: "Highly cyclical but central to long-term technology growth.",
  },
  software: {
    name: "Software / SaaS",
    category: "Industry Sector",
    description:
      "Companies selling software products and cloud-based services on subscription or licensing models.",
    note: "Recurring revenue and high gross margins make SaaS a core growth allocation.",
  },
  ai: {
    name: "Artificial Intelligence",
    category: "Industry Sector",
    description:
      "Companies developing AI models, infrastructure, and applications, plus the chip and cloud platforms enabling them.",
    note: "Spans semiconductors, hyperscale cloud, foundation model labs, and applied AI.",
  },
  "consumer-staples": {
    name: "Consumer Staples",
    category: "Industry Sector",
    description:
      "Companies producing essential everyday goods — food, beverages, household products, personal care.",
    note: "Defensive sector. Relatively stable demand through economic cycles.",
  },
  defense: {
    name: "Defense / Aerospace",
    category: "Industry Sector",
    description:
      "Companies producing military equipment, aircraft, space systems, and related technologies.",
    note: "Revenue tied to government budgets and geopolitical conditions.",
  },
  healthcare: {
    name: "Healthcare / Biotech",
    category: "Industry Sector",
    description:
      "Pharmaceutical and biotech companies, medical device makers, hospital operators, and health insurers.",
    note: "Mix of defensive (pharma, insurers) and high-growth (biotech) opportunities.",
  },
  "green-energy": {
    name: "Green Energy",
    category: "Industry Sector",
    description:
      "Companies in solar, wind, EVs, battery storage, hydrogen, and grid modernization.",
    note: "Sensitive to subsidy policy and interest rates.",
  },
  energy: {
    name: "Oil & Gas",
    category: "Industry Sector",
    description:
      "Integrated oil majors, exploration and production, refiners, and oilfield services companies.",
    note: "Cyclical and tied to commodity prices. Often pays substantial dividends.",
  },
  financials: {
    name: "Financials",
    category: "Industry Sector",
    description:
      "Banks, insurers, asset managers, exchanges, and payment processors.",
    note: "Performance tied to interest rates, credit cycles, and capital markets activity.",
  },
  "real-estate": {
    name: "Real Estate",
    category: "Industry Sector",
    description:
      "REITs and real estate operators across residential, commercial, industrial, and specialty property types.",
    note: "Income-focused with sensitivity to interest rates.",
  },
  industrials: {
    name: "Industrials",
    category: "Industry Sector",
    description:
      "Manufacturers, transportation companies, construction and engineering firms, and capital goods producers.",
    note: "Tied to GDP growth and capital investment cycles.",
  },
  "consumer-disc": {
    name: "Consumer Discretionary",
    category: "Industry Sector",
    description:
      "Companies selling non-essential goods and services — retail, restaurants, autos, travel, leisure.",
    note: "Cyclical. Strongest in expansions, weakest in recessions.",
  },

  // ============== ETFS / FUNDS ==============
  spy: {
    name: "SPDR S&P 500 ETF Trust",
    category: "Index ETF",
    description:
      "The original and most heavily traded S&P 500 ETF. Tracks the 500 largest U.S. public companies.",
    note: "Foundational holding for U.S. large-cap exposure. Issuer: State Street.",
  },
  voo: {
    name: "Vanguard S&P 500 ETF",
    category: "Index ETF",
    description:
      "Vanguard's S&P 500 ETF. Tracks the same index as SPY at a lower expense ratio (0.03%).",
    note: "Often preferred for long-term buy-and-hold portfolios due to lower fees.",
  },
  qqq: {
    name: "Invesco QQQ Trust",
    category: "Index ETF",
    description:
      "Tracks the Nasdaq-100 — the 100 largest non-financial companies on the Nasdaq, heavily weighted toward technology.",
    note: "Tech-tilted exposure. More volatile than SPY but historically higher growth.",
  },
  dia: {
    name: "SPDR Dow Jones Industrial Average ETF",
    category: "Index ETF",
    description:
      "Tracks the 30 large-cap U.S. companies in the Dow Jones Industrial Average. Price-weighted.",
    note: "Quality-tilted exposure to long-established U.S. blue chips.",
  },
  smh: {
    name: "VanEck Semiconductor ETF",
    category: "Sector ETF",
    description:
      "Holds the 25 largest U.S.-listed semiconductor companies, including NVDA, TSM, AVGO, and AMD.",
    note: "Concentrated bet on the chip industry. High exposure to the AI buildout.",
  },
  nlr: {
    name: "VanEck Uranium and Nuclear ETF",
    category: "Sector ETF",
    description:
      "Holds companies involved in uranium mining, nuclear power generation, and related infrastructure.",
    note: "Thematic allocation tied to nuclear energy and uranium supply.",
  },
  ibit: {
    name: "iShares Bitcoin Trust ETF",
    category: "Spot Bitcoin ETF",
    description:
      "Holds Bitcoin directly and trades like a stock. Provides exposure to Bitcoin without managing wallets or keys.",
    note: "Issued by BlackRock. Approved by the SEC in January 2024. Subject to Bitcoin's volatility.",
  },
  schd: {
    name: "Schwab U.S. Dividend Equity ETF",
    category: "Dividend ETF",
    description:
      "Holds 100 U.S. companies screened for dividend quality, financial strength, and consistent payouts.",
    note: "Used for income-oriented portfolios. Lower yield than high-yield bonds, but stock-like growth.",
  },
  vti: {
    name: "Vanguard Total Stock Market ETF",
    category: "Index ETF",
    description:
      "Tracks the total U.S. equity market — large-, mid-, and small-cap stocks across all sectors.",
    note: "Broader than SPY. Captures the full domestic equity opportunity set.",
  },
  vxus: {
    name: "Vanguard Total International Stock ETF",
    category: "Index ETF",
    description:
      "Holds non-U.S. stocks across developed and emerging markets. Pairs with VTI for global coverage.",
    note: "Adds geographic and currency diversification to a U.S.-heavy portfolio.",
  },
  vnq: {
    name: "Vanguard Real Estate ETF",
    category: "Sector ETF",
    description:
      "Holds U.S. REITs across residential, commercial, industrial, and specialty real estate.",
    note: "Liquid way to add real estate exposure without buying property directly.",
  },
  bnd: {
    name: "Vanguard Total Bond Market ETF",
    category: "Bond ETF",
    description:
      "Holds investment-grade U.S. bonds — Treasuries, corporates, and mortgage-backed securities.",
    note: "Core fixed-income holding for diversified portfolios.",
  },
  agg: {
    name: "iShares Core U.S. Aggregate Bond ETF",
    category: "Bond ETF",
    description:
      "Tracks the Bloomberg U.S. Aggregate Bond Index. Similar profile to BND.",
    note: "Alternative to BND. The two are largely interchangeable.",
  },
  tlt: {
    name: "iShares 20+ Year Treasury Bond ETF",
    category: "Bond ETF",
    description:
      "Holds long-dated U.S. Treasury bonds with 20+ years to maturity.",
    note: "High duration — very sensitive to interest rate changes. Used for rate hedging.",
  },
  vym: {
    name: "Vanguard High Dividend Yield ETF",
    category: "Dividend ETF",
    description:
      "Holds U.S. companies with above-average dividend yields.",
    note: "Income-tilted. Different methodology than SCHD; tends to be more diversified.",
  },
  mub: {
    name: "iShares National Muni Bond ETF",
    category: "Bond ETF",
    description:
      "Holds investment-grade U.S. municipal bonds. Interest is typically exempt from federal income tax.",
    note: "Tax-efficient income for high earners.",
  },
  msft: {
    name: "Microsoft Corp.",
    category: "Common Stock",
    description:
      "Software, cloud (Azure), AI infrastructure, productivity (Office 365), and gaming (Xbox).",
    note: "One of two companies with a $3T+ market cap. Major investor in OpenAI.",
  },
  aapl: {
    name: "Apple Inc.",
    category: "Common Stock",
    description:
      "iPhone, Mac, iPad, wearables, and a fast-growing services business (App Store, iCloud, Apple Music).",
    note: "World's most valuable consumer brand. Significant capital return program.",
  },
  brk: {
    name: "Berkshire Hathaway (Class B)",
    category: "Common Stock",
    description:
      "Warren Buffett's holding company. Owns insurance (GEICO), railroads (BNSF), energy, and large stock investments.",
    note: "Long-term compounder with no dividend. Class B shares are accessible to retail investors.",
  },

  // ============== INDIVIDUAL STOCKS ==============
  nvda: {
    name: "NVIDIA Corp.",
    category: "Common Stock",
    description:
      "The dominant designer of GPUs and AI accelerators powering most large-scale AI training and inference.",
    note: "Beneficiary of the AI capital expenditure cycle. Stock has been highly volatile.",
  },
  tsla: {
    name: "Tesla Inc.",
    category: "Common Stock",
    description:
      "Electric vehicle manufacturer with energy storage, solar, robotics, and autonomous driving software businesses.",
    note: "Wide range of analyst price targets. Story stock with significant key-person risk.",
  },
  amd: {
    name: "Advanced Micro Devices",
    category: "Common Stock",
    description:
      "Designs CPUs (Ryzen, EPYC) and GPUs that compete with Intel and NVIDIA across PCs, data centers, and AI.",
    note: "Number-two AI chip designer. Growth driven by data center share gains.",
  },
  intc: {
    name: "Intel Corp.",
    category: "Common Stock",
    description:
      "Designs and manufactures CPUs for PCs and servers. Building out a foundry business to compete with TSMC.",
    note: "Turnaround story. Capital-intensive transition with execution risk.",
  },
  googl: {
    name: "Alphabet Inc. (Class A)",
    category: "Common Stock",
    description:
      "Parent of Google (Search, YouTube, Android, Cloud, Gemini AI), plus other bets like Waymo.",
    note: "Search remains the cash engine. Cloud and AI are the growth narratives.",
  },
  amzn: {
    name: "Amazon.com Inc.",
    category: "Common Stock",
    description:
      "E-commerce, AWS cloud computing, advertising, Prime Video, and devices.",
    note: "AWS drives most operating profit. Retail margins improving with advertising growth.",
  },
  cost: {
    name: "Costco Wholesale Corp.",
    category: "Common Stock",
    description:
      "Membership-based warehouse retailer. Most profit comes from membership fees rather than product margins.",
    note: "Defensive grower with industry-leading customer loyalty.",
  },
  lly: {
    name: "Eli Lilly & Co.",
    category: "Common Stock",
    description:
      "Pharmaceutical company. Best known recently for Mounjaro and Zepbound (GLP-1 obesity and diabetes drugs).",
    note: "GLP-1 franchise has driven significant growth. Major pipeline beyond obesity.",
  },
  sbux: {
    name: "Starbucks Corp.",
    category: "Common Stock",
    description:
      "Global coffee retailer with company-operated and licensed stores, plus a packaged goods business.",
    note: "Recovery story dependent on China demand and U.S. same-store sales trends.",
  },
  shak: {
    name: "Shake Shack Inc.",
    category: "Common Stock",
    description:
      "Premium fast-casual burger chain expanding globally through company-operated and licensed locations.",
    note: "Smaller cap, higher growth than legacy QSR peers.",
  },

  // ============== PRIVATE / PRE-IPO ==============
  spacex: {
    name: "SpaceX",
    category: "Pre-IPO Private Equity",
    description:
      "Privately held space launch and satellite internet (Starlink) company founded by Elon Musk.",
    note: "Accessed through Ghost Strategies private placement opportunities. Subject to availability and accreditation.",
  },
  anthropic: {
    name: "Anthropic",
    category: "Pre-IPO Private Equity",
    description:
      "AI safety research company. Builder of the Claude family of large language models.",
    note: "Accessed through Ghost Strategies private placement opportunities. Subject to availability and accreditation.",
  },
  openai: {
    name: "OpenAI",
    category: "Pre-IPO Private Equity",
    description:
      "AI research company. Builder of ChatGPT and the GPT family of models. Microsoft is a major investor.",
    note: "Accessed through Ghost Strategies private placement opportunities. Subject to availability and accreditation.",
  },
  stripe: {
    name: "Stripe",
    category: "Pre-IPO Private Equity",
    description:
      "Privately held payments infrastructure company powering online checkout for millions of businesses worldwide.",
    note: "Accessed through Ghost Strategies private placement opportunities. Subject to availability and accreditation.",
  },
  databricks: {
    name: "Databricks",
    category: "Pre-IPO Private Equity",
    description:
      "Data and AI platform combining data warehousing and lakehouse architecture for enterprise analytics and ML.",
    note: "Accessed through Ghost Strategies private placement opportunities. Subject to availability and accreditation.",
  },
  ramp: {
    name: "Ramp",
    category: "Pre-IPO Private Equity",
    description:
      "Corporate card and finance automation platform focused on helping companies cut spending and close books faster.",
    note: "Accessed through Ghost Strategies private placement opportunities. Subject to availability and accreditation.",
  },
  anduril: {
    name: "Anduril Industries",
    category: "Pre-IPO Private Equity",
    description:
      "Defense technology company building autonomous systems, AI-powered surveillance, and counter-drone platforms.",
    note: "Accessed through Ghost Strategies private placement opportunities. Subject to availability and accreditation.",
  },
  cerebras: {
    name: "Cerebras Systems",
    category: "Pre-IPO Private Equity",
    description:
      "Maker of wafer-scale AI chips designed for ultra-fast training and inference of large language models.",
    note: "Accessed through Ghost Strategies private placement opportunities. Subject to availability and accreditation.",
  },
  palantir: {
    name: "Palantir Technologies",
    category: "Common Stock",
    description:
      "Data analytics and AI platform serving government (Gotham) and commercial (Foundry) customers.",
    note: "Heavy government revenue base. AIP product driving recent commercial growth.",
  },
  smci: {
    name: "Super Micro Computer",
    category: "Common Stock",
    description:
      "Builder of AI server systems and high-performance computing infrastructure.",
    note: "Direct beneficiary of AI infrastructure spend. High volatility.",
  },
  btc: {
    name: "Bitcoin",
    category: "Cryptocurrency",
    description:
      "The largest cryptocurrency by market cap. Fixed supply of 21 million coins, secured by proof-of-work mining.",
    note: "Held directly via crypto exchange or indirectly via spot ETFs (e.g., IBIT).",
  },
  eth: {
    name: "Ethereum",
    category: "Cryptocurrency",
    description:
      "Second-largest cryptocurrency. Programmable blockchain that powers smart contracts, DeFi, and NFTs.",
    note: "Held directly via crypto exchange or indirectly via spot ETFs.",
  },
};
