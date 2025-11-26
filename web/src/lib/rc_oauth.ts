import * as z from 'zod';

export const RecurseResponse = z.object({
    id: z.number(),
    first_name: z.string(),
    last_name: z.string(),
    name: z.string(),
    name_hl: z.string(),
    email: z.string(),
    github: z.string(),
    employer_role: z.string(),
    // TODO
});

export type RecurseResponse = z.infer<typeof RecurseResponse>;