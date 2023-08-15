'use client'

import { ScrollText } from "lucide-react"
import { Icons } from "./Icons"
import { Button } from "./ui/Button"
import { useState } from "react"
import { signIn } from "next-auth/react"

const SignIn = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const loginWithGoogle = async () => {
        setIsLoading(true)

        try {
            await signIn('google')
        }
        catch(error) {
            console.log(error)
        }
        finally {
            setIsLoading(false)
        }
    }

    return(
        <div className="flex flex-col items-center gap-5">
            <ScrollText className="h-12 w-12 stroke-amber-500"/>
            <h2 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
                Sign in Notes app
            </h2>
            <p className="text-md font-medium text-zinc-500 dark:text-zinc-400">
                Join to save, organise and share your notes
            </p>
            <Button className="w-full max-w-[332px]" isLoading={isLoading} onClick={loginWithGoogle}>
                <Icons.google className="h-4 w-4 mr-1"/>
                Sign In
            </Button>
        </div>
    )
}

export default SignIn 