import z from 'zod';
import { PRODUCTS, API_BASE } from "../constants/api-endpoints"
import { productRequestSchema } from '@/schemas/invoiceSimulation';

export const getProducts = async ():Promise<z.infer<typeof productRequestSchema>[]> => {
    const resp = await fetch(`${API_BASE}/${PRODUCTS}`);
    if(!resp.ok) throw new Error('Error fetching products');
    
    const response = await resp.json();
    const parsedResponse = z.array(productRequestSchema).safeParse(response);
    if (!parsedResponse.success) {
        throw new Error('Invalid product data format');
    }
    
    return parsedResponse.data;
}
