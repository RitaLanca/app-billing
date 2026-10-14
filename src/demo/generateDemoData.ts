// Generates the demo dataset relative to a given date, so the app always shows
// current-year data and every requirement status regardless of when it is opened.
// Self-contained on purpose: it is also imported by scripts/generate-db.ts (Node).

export interface DemoRequirement {
  id: string;
  name: string;
  category: string;
  done: boolean;
  deadline: string;
}

const SEASONALITY = [0, -1500, 1500, -2500, 2500, 0, 4000, 1500, 5000, 6000, 7000, 8500];

const pad = (n: number) => String(n).padStart(2, '0');

const toISODate = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

const firstOfMonth = (year: number, monthIdx: number) => `${year}-${pad(monthIdx + 1)}-01`;

const addDays = (date: Date, days: number) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);

const monthlyRevenueValue = (yearsAgo: number, monthIdx: number) => {
  const base = 26000 - yearsAgo * 2500;
  return Math.round((base + SEASONALITY[monthIdx]) / 100) * 100;
};

// [name, category, deadline offset in days from today, done]
const REQUIREMENTS: [string, string, number, boolean][] = [
  ['Quarterly VAT Filing', 'Tax Reports', -8, false],
  ['Monthly Withholding Tax', 'Tax Reports', 4, false],
  ['Corporate Tax Return Submission', 'Tax Reports', 45, false],
  ['Quarterly Tax Prepayment', 'Tax Reports', -30, true],
  ['Board Meeting Minutes Submission', 'Legal Reports', -2, false],
  ['Data Protection Compliance Audit', 'Legal Reports', 12, false],
  ['Annual Shareholder Meeting Documentation', 'Legal Reports', 70, false],
  ['Monthly Payroll Report', 'Legal Reports', -10, true],
  ['Monthly Closing Report', 'Financial Reports', 2, false],
  ['Quarterly Financial Statements', 'Financial Reports', 25, false],
  ['Cash Flow Forecast', 'Financial Reports', 6, true],
  ['Annual Budget Review', 'Financial Reports', 90, false],
  ['Cybersecurity Risk Assessment', 'Other Reports', -20, false],
  ['Environmental Compliance Certification', 'Other Reports', 8, false],
  ['Employee Health and Safety Training Records', 'Other Reports', 40, true],
  ['Annual Sustainability Report', 'Other Reports', 60, false],
];

export const generateRequirements = (today = new Date()): DemoRequirement[] =>
  REQUIREMENTS.map(([name, category, offset, done], idx) => ({
    id: String(idx + 1),
    name,
    category,
    done,
    deadline: toISODate(addDays(today, offset)),
  }));

export const generateDemoData = (today = new Date()) => {
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const annualRevenue = [4, 3, 2, 1, 0].map((yearsAgo) => {
    const year = currentYear - yearsAgo;
    const lastMonth = yearsAgo === 0 ? currentMonth : 11;
    const details = Array.from({ length: lastMonth + 1 }, (_, monthIdx) => ({
      date: firstOfMonth(year, monthIdx),
      value: monthlyRevenueValue(yearsAgo, monthIdx),
    }));
    return {
      id: `rev${year}`,
      year,
      total: details.reduce((sum, d) => sum + d.value, 0),
      details,
    };
  });

  const currentYearRevenue = annualRevenue[annualRevenue.length - 1];

  const monthlyRevenue = currentYearRevenue.details.map((d, idx) => ({
    id: `m${idx + 1}`,
    ...d,
  }));

  const annualInvoices = annualRevenue.slice(-3).map(({ year, total }) => ({
    id: `inv${year}`,
    year,
    totalInvoicesIssued: Math.round(total / 540),
    totalRevenue: total,
  }));

  // Active clients from January of last year up to the current month
  const monthlyActiveClients = Array.from({ length: 12 + currentMonth + 1 }, (_, idx) => {
    const year = currentYear - 1 + Math.floor(idx / 12);
    const monthIdx = idx % 12;
    return {
      id: `ac${year}${pad(monthIdx + 1)}`,
      date: firstOfMonth(year, monthIdx),
      value: 38 + idx * 2 + (monthIdx % 3 === 1 ? -1 : 0),
    };
  });

  const growth = (from: number, to: number) => Math.round(((to - from) / from) * 10000) / 100;
  const lastYearStart = monthlyActiveClients[0].value;
  const lastYearEnd = monthlyActiveClients[11].value;
  const current = monthlyActiveClients[monthlyActiveClients.length - 1].value;

  const annualClientGrowth = [
    { id: `growth${currentYear - 1}`, year: currentYear - 1, growth: growth(lastYearStart, lastYearEnd) },
    { id: `growth${currentYear}`, year: currentYear, growth: growth(lastYearEnd, current) },
  ];

  const products = [
    { id: '1', name: 'Product A', price: 1223 },
    { id: '2', name: 'Product B', price: 1500 },
    { id: '3', name: 'Product C', price: 2000 },
  ];

  return {
    annualRevenue,
    monthlyRevenue,
    annualInvoices,
    monthlyActiveClients,
    annualClientGrowth,
    complianceRequirements: generateRequirements(today),
    products,
  };
};

export type DemoData = ReturnType<typeof generateDemoData>;
