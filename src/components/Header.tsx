import { ScrollText } from "lucide-react"
import ThemeButton from "./ThemeButton"

const Header = () => {
    return(
        <header className="h-16 flex gap-2 px-12 justify-between items-center border-b border-zinc-300">
            <div className="flex gap-2">
                <ScrollText className="h-10 w-10 stroke-amber-500"/>
                <h1 className="text-4xl font-semibold text-zinc-900 dark:text-zinc-100 transition-colors">Notes</h1>
            </div>
            <div>
                <ThemeButton/>
            </div>
        </header>
    )
}

export default Header