/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_BASE, COMPLIANCE_REQUIREMENTS } from "@/constants/api-endpoints";

export const getComplianceRequirements = async () => {
    const resp = await fetch(`${API_BASE}/${COMPLIANCE_REQUIREMENTS}?_sort=deadline&_order=DESC`);
    if(!resp.ok) throw new Error('Error fetching requirements');

    const response = await resp.json();
    return response;
}

export const createNewComplianceRequirement = async (body: any): Promise<void> => {
    const resp = await fetch(`${API_BASE}/${COMPLIANCE_REQUIREMENTS}`, {
        method: 'POST',
        body: JSON.stringify(body),
    });
    if(!resp.ok) throw new Error('Error creating requirement');
}

export const deleteComplianceRequirement = async (id: string): Promise<void> => {
    const resp = await fetch(`${API_BASE}/${COMPLIANCE_REQUIREMENTS}/${id}`, {
        method: 'DELETE',
    });
    if(!resp.ok) throw new Error('Error deleting requirement');
}

export const updateComplianceRequirement = async (id: string, body: any ): Promise<void> => {
    const resp = await fetch(`${API_BASE}/${COMPLIANCE_REQUIREMENTS}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(body),
    });
    if(!resp.ok) throw new Error('Error updating requirement');
}

