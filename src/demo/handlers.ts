import { http, HttpResponse } from 'msw';
import {
  ACTIVE_CLIENTS,
  ANNUAL_CLIENT_GROWTH,
  ANNUAL_INVOICES,
  ANNUAL_REVENUE,
  API_BASE,
  COMPLIANCE_REQUIREMENTS,
  MONTHLY_REVENUE,
  PRODUCTS,
} from '@/constants/api-endpoints';
import { DemoRequirement } from './generateDemoData';
import { demoData, requirementsStore } from './store';

const url = (endpoint: string) => `${API_BASE}/${endpoint}`;

// Mirrors json-server: `_sort=field` ascending, `_sort=-field` descending
const sortBy = <T extends object>(items: T[], sort: string | null) => {
  if (!sort) return items;
  const desc = sort.startsWith('-');
  const key = (desc ? sort.slice(1) : sort) as keyof T;
  return [...items].sort((a, b) => {
    if (a[key] === b[key]) return 0;
    const result = a[key] > b[key] ? 1 : -1;
    return desc ? -result : result;
  });
};

export const handlers = [
  http.get(url(ANNUAL_REVENUE), () => HttpResponse.json(demoData.annualRevenue)),
  http.get(url(MONTHLY_REVENUE), () => HttpResponse.json(demoData.monthlyRevenue)),
  http.get(url(ACTIVE_CLIENTS), () => HttpResponse.json(demoData.monthlyActiveClients)),
  http.get(url(ANNUAL_CLIENT_GROWTH), () => HttpResponse.json(demoData.annualClientGrowth)),
  http.get(url(PRODUCTS), () => HttpResponse.json(demoData.products)),

  http.get(url(ANNUAL_INVOICES), ({ request }) => {
    const year = new URL(request.url).searchParams.get('year');
    const results = year
      ? demoData.annualInvoices.filter((invoice) => String(invoice.year) === year)
      : demoData.annualInvoices;
    return HttpResponse.json(results);
  }),

  http.get(url(COMPLIANCE_REQUIREMENTS), ({ request }) => {
    const params = new URL(request.url).searchParams;
    const nameFilter = params.get('name')?.toLowerCase();

    const results = requirementsStore
      .getAll()
      .filter((r) => !nameFilter || r.name.toLowerCase().includes(nameFilter));

    return HttpResponse.json(sortBy(results, params.get('_sort')));
  }),

  http.post(url(COMPLIANCE_REQUIREMENTS), async ({ request }) => {
    const body = (await request.json()) as DemoRequirement;
    return HttpResponse.json(requirementsStore.create(body), { status: 201 });
  }),

  http.patch(`${url(COMPLIANCE_REQUIREMENTS)}/:id`, async ({ request, params }) => {
    const changes = (await request.json()) as Partial<DemoRequirement>;
    const updated = requirementsStore.update(String(params.id), changes);
    return updated ? HttpResponse.json(updated) : HttpResponse.json(null, { status: 404 });
  }),

  http.delete(`${url(COMPLIANCE_REQUIREMENTS)}/:id`, ({ params }) => {
    const removed = requirementsStore.remove(String(params.id));
    return removed ? HttpResponse.json(removed) : HttpResponse.json(null, { status: 404 });
  }),
];
