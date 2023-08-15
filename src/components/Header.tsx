import { ScrollText } from "lucide-react"
import ThemeButton from "./ThemeButton"
import Link from "next/link"
import { buttonVariants } from "./ui/Button"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import UserMenu from "./UserMenu"

const Header = async () => {
    const session = await getServerSession(authOptions)

    return(
        <header className="h-16 flex gap-2 px-16 lg:px-32 xl:px-56 justify-between items-center border-b border-zinc-300">
            <Link href="/">
                <div className="flex gap-2">
                    <ScrollText className="h-10 w-10 stroke-amber-500"/>
                    <h1 className="text-4xl font-semibold text-zinc-900 dark:text-zinc-100 transition-colors">Notes</h1>
                </div>
            </Link>
            <div className="flex gap-3 items-center">
                <ThemeButton/>
                {session?.user ? 
                    <UserMenu user={session.user}/>
                    :
                    <nav>
                        <Link href="/sign-in" className={buttonVariants()}>Sign In</Link>
                    </nav>
                }   
            </div>
        </header>
    )
}

export default Header