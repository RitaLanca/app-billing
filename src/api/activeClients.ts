import { ACTIVE_CLIENTS, ANNUAL_CLIENT_GROWTH, API_BASE } from "../constants/api-endpoints"
import { getMonthIdxFrom, getYearFrom } from "../helpers/dates";

export const getActiveClientsByMonth = async () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const resp = await fetch(`${API_BASE}/${ACTIVE_CLIENTS}`);
    if(!resp.ok) throw new Error('Error fetching active clients');
    
    const activeClients = await resp.json();
    return activeClients.filter(info => getMonthIdxFrom(info.date) === currentMonth && getYearFrom(info.date) === currentYear)[0].value;
}

export const getAnnualClientGrowth = async () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const resp = await fetch(`${API_BASE}/${ANNUAL_CLIENT_GROWTH}`);
    if(!resp.ok) throw new Error('Error fetching annual growth');

    const response = await resp.json();
    const currentYearInfo = response.filter(data => data.year === currentYear );
    return currentYearInfo[0].growth;
}