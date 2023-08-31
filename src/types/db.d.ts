interface User {
    id: string
    name: string
    email: string
    image: string
}

interface Note {
    id: string
    title?: string
    content: string
    createdAt: number
}