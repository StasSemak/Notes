import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { NoteValidator } from "@/lib/validators/note"
import { getServerSession } from "next-auth"
import { z } from "zod"
import { nanoid } from 'nanoid'

export async function POST (req:Request) {
    try {
        const body = await req.json()

        const { title, content } = NoteValidator.parse(body)

        const session = await getServerSession(authOptions)

        if(!session?.user) {
            return new Response('Unauthorized', { status: 401 })
        }

        const timestamp = Date.now();

        const note: Note = {
            id: nanoid(),
            createdAt: timestamp,
            title,
            content
        }

        db.zadd(`user:${session.user.id}:notes`, {
            score: timestamp,
            member: note
        })

        return new Response('OK')
    }
    catch (error) {
        if(error instanceof z.ZodError) {
            return new Response(error.message, { status: 400 })
        }

        return new Response("Can't create note at the time. Try again later", { status: 500 })
    }
}