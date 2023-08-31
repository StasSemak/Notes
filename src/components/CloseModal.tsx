'use client'

import { useRouter } from "next/navigation"
import { Button, buttonVariants } from "./ui/Button"
import { X } from "lucide-react"

const CloseModal = () => {
    const router = useRouter()
    
    return(
        <Button 
            className={buttonVariants({variant: 'ghost', size: 'sm'})}
            aria-label="close modal"
            onClick={() => router.back()}
        >
            <X className="w-4 h-4 stroke-zinc-900 dark:stroke-zinc-100"/>
        </Button>
    )
}

export default CloseModal