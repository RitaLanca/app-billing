import { z } from "zod";

export const requirementsFormSchema = z.object({  
    id:z.string().optional(),
    name: z.string().min(1,'Required field'),
    category: z.string().nonempty('Required field'),
    deadline: z.string().nonempty('Required field'),
})