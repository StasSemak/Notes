import Editor from "@/components/Editor"

const Page = () => {
    return(
        <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
                New note
            </h2>

            <Editor/>
        </div>
    )
}

export default Page