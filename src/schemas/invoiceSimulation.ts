import { z } from "zod";

export const productSchema = z.object({
    id: z.string().nonempty('Required field'),
    description: z.string(),
    quantity: z.number().gt(0),
    unitPrice: z.number().gt(0),
});

export const productRequestSchema = z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
});

export const invoiceSimulationFormSchema = z.object({  
    invoiceNumber: z.string().nonempty('Required field'),
    issueDate: z.string().nonempty('Required field'),
    clientName: z.string().nonempty('Required field'),
    clientePhoneNumber: z.string().optional(),
    clientNif: z.string().nonempty('Required field'),
    clientAddress: z.string().optional()    ,
    clientEmail: z.string().nonempty('Required field').email(),
    products: z.array(productSchema).nonempty('Select at least one product'),
    discount: z.string().optional(),
});

export const invoicePreviewSchema = invoiceSimulationFormSchema
    .merge(z.object({
        subtotal:z.number(),
        tax: z.number(),
        total: z.number(),
        totalDiscount: z.number(),
}));