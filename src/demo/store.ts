import { DemoRequirement, generateDemoData, generateRequirements } from './generateDemoData';

const STORAGE_KEY = 'billing-demo:requirements';

interface StoredRequirements {
  generatedOn: string;
  requirements: DemoRequirement[];
}

const today = () => new Date().toDateString();

const readStorage = (): StoredRequirements | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredRequirements) : null;
  } catch {
    return null;
  }
};

const writeStorage = (requirements: DemoRequirement[]) => {
  try {
    const value: StoredRequirements = { generatedOn: today(), requirements };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // storage unavailable: changes live only in memory
  }
};

// Regenerate on a new day so deadlines keep showing every status
const loadRequirements = (): DemoRequirement[] => {
  const stored = readStorage();
  if (stored && stored.generatedOn === today()) return stored.requirements;

  const fresh = generateRequirements();
  writeStorage(fresh);
  return fresh;
};

export const demoData = generateDemoData();

let requirements = loadRequirements();

export const requirementsStore = {
  getAll: () => [...requirements],

  create: (requirement: DemoRequirement) => {
    requirements = [...requirements, requirement];
    writeStorage(requirements);
    return requirement;
  },

  update: (id: string, changes: Partial<DemoRequirement>) => {
    const existing = requirements.find((r) => r.id === id);
    if (!existing) return undefined;

    const updated = { ...existing, ...changes, id };
    requirements = requirements.map((r) => (r.id === id ? updated : r));
    writeStorage(requirements);
    return updated;
  },

  remove: (id: string) => {
    const existing = requirements.find((r) => r.id === id);
    requirements = requirements.filter((r) => r.id !== id);
    writeStorage(requirements);
    return existing;
  },
};
