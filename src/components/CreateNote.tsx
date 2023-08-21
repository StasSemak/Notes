import Link from "next/link"
import { Input } from "./ui/Input"
import { ImageIcon, Link2 } from "lucide-react"

const CreateNote = () => {
    return(
        <div className="w-[480px] mx-auto">
            <div className="flex gap-5 items-center w-full">
                <Link href='/create' className="flex-grow">
                    <Input readOnly placeholder="New note..." className="border-2 border-zinc-600 dark:border-zinc-200"/>
                </Link>
                <Link href='/create'>
                    <ImageIcon className="text-zinc-600 dark:text-zinc-200"/>
                </Link>
                <Link href='/create'>
                    <Link2 className="text-zinc-600 dark:text-zinc-200"/>
                </Link>
            </div>
        </div>
    )
}

export default CreateNote