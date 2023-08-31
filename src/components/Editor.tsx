'use client'

import { NoteCreationRequest, NoteValidator } from "@/lib/validators/note";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod";
import { useCallback, useEffect, useRef, useState } from "react";
import EditorJS from '@editorjs/editorjs'
import { useRouter } from "next/navigation";
import { useMutation } from '@tanstack/react-query'
import axios from "axios"
import { useCustomToast } from "@/hooks/use-custom-toast";
import TextareaAutosize from 'react-textarea-autosize'

type FormData = z.infer<typeof NoteValidator>

const Editor = () => {
    const { register, handleSubmit, formState: {errors} } = useForm<FormData>({
        resolver: zodResolver(NoteValidator),
        defaultValues: {
            title: null,
            content: null
        }
    })

    const ref = useRef<EditorJS>()
    const _titleRef = useRef<HTMLTextAreaElement>(null)
    const router = useRouter()
    const [isMounted, setIsMounted] = useState<boolean>(false)
    const toast = useCustomToast()
    
    const { mutate: createNote } = useMutation({
        mutationFn: async({
            title, content
        }: NoteCreationRequest) => {
            const payload: NoteCreationRequest = {title, content}
            const { data } = await axios.post('/api/note/create', payload)
            return data
        },
        onError: () => {
            return toast({text: "Can't create note, try again!", type: 'error'})
        },
        onSuccess: () => {
            router.push("/")
            router.refresh()

            return toast({text: 'Note is added', type: 'success'})
        }
    })

    const initializeEditor = useCallback(async () => {
        const EditorJS = (await import('@editorjs/editorjs')).default
        const Header = (await import('@editorjs/header')).default
        const Embed = (await import('@editorjs/embed')).default
        const Table = (await import('@editorjs/table')).default
        const List = (await import('@editorjs/list')).default
        const Code = (await import('@editorjs/code')).default
        const LinkTool = (await import('@editorjs/link')).default
        const InlineCode = (await import('@editorjs/inline-code')).default

        if(!ref.current) {
            const editor = new EditorJS({
                holder: 'editor',
                onReady() {
                    ref.current = editor
                },
                placeholder: 'New note...',
                inlineToolbar: true,
                data: { blocks: [] },
                tools: {
                    header: Header,
                    linkTool: {
                        class: LinkTool,
                        config: {
                            endpoint: '/api/link'
                        }
                    },
                    list: List,
                    code: Code,
                    inlineCode: InlineCode,
                    table: Table,
                    embed: Embed,
                }
            })
        }
    }, [])

    useEffect(() => {
        if(Object.keys(errors).length) {
            for(const [key, value] of Object.entries(errors)) {
                toast({
                    text: (value as {message: string}).message,
                    type: "error"
                })
            }
        }
    }, [errors])

    useEffect(() => {
        if(typeof window !== 'undefined') {
            setIsMounted(true)
        }
    }, [])

    useEffect(() => {
        const init = async () => {
            await initializeEditor()

            setTimeout(() => {
                _titleRef?.current?.focus()
            }, 0)
        }

        if(isMounted) {
            init()

            return () => {
                ref.current?.destroy()
                ref.current = undefined
            }
        }
    }, [isMounted, initializeEditor])

    const onSubmit = async (data: FormData) => {
        const blocks = await ref.current?.save()

        const payload: NoteCreationRequest = {
            title: data.title,
            content: blocks,
        }

        createNote(payload)
    }

    if(!isMounted) return null;

    const { ref: titleRef, ...rest } = register('title');

    return(
        <div className="w-full p-4 bg-zinc-100 dark:bg-zinc-900 rounded-lg border-2 border-zinc-300">
            <form
                id='create-note-form'
                className="w-fit"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div>
                    <TextareaAutosize
                        ref={(e) => {
                            titleRef(e)
                            //@ts-ignore
                            _titleRef.current = e
                        }}
                        {...rest}
                        placeholder="Title"
                        className="w-full text-zinc-900 dark:text-zinc-100 resize-none appearance-none overflow-hidden bg-transparent text-3xl font-bold focus:outline-none"
                    />
                    <div id="editor" className="min-h-[300px]" />
                    <p className="text-sm text-zinc-500">
                        Press{' '}
                        <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
                            Tab
                        </kbd>
                        {' '}
                        to open command menu
                    </p>
                </div>
            </form>
            
        </div>
    )
}

export default Editor