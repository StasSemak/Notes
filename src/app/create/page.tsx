import Editor from "@/components/Editor"

const Page = () => {
    return(
        <div>
            <h2 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                New note
            </h2>

            <Editor/>
        </div>
    )
}

export default Page