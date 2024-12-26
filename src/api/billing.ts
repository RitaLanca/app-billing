import {  ANNUAL_INVOICES, ANNUAL_REVENUE, API_BASE, MONTHLY_REVENUE } from "../constants/api-endpoints"

export const getAnnualInvoices = async () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const resp = await fetch(`${API_BASE}/${ANNUAL_INVOICES}?year=${currentYear}`);
    if(!resp.ok) throw new Error('Error fetching annual invoices');

    const response = await resp.json();
    return response[0];
}

export const getAnnualRevenue = async () => {
    const resp = await fetch(`${API_BASE}/${ANNUAL_REVENUE}`);
    if(!resp.ok) throw new Error('Error fetching annual revenue');

    const response = await resp.json();
    return response;
}

export const getMonthlyRevenue = async () => {
    const resp = await fetch(`${API_BASE}/${MONTHLY_REVENUE}`);
    if(!resp.ok) throw new Error('Error fetching monthly revenue');

    const response = await resp.json();
    return response;
}