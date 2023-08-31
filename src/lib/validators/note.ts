import { z } from 'zod'

export const NoteValidator = z.object({
    title: z.string().optional(),
    content: z.any()
})

export type NoteCreationRequest = z.infer<typeof NoteValidator>