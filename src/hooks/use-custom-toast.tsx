import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle } from "lucide-react";
import toast from "react-hot-toast"

export interface ToastOptions {
    text: string;
    type: "success" | "error"
}

export const useCustomToast = () => {
    const customToast = ({text, type}: ToastOptions) => {
        toast.custom((t) => (
            <div
                style={{ animationFillMode: 'forwards' }} 
                className={cn("bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-md px-4 py-2 rounded-md inline-flex items-center",
                    t.visible ? 'animate-in slide-in-from-right-full' : 'animate-out slide-out-to-right-full fade-out-80'
                )}
            >
                {type === 'success' && <CheckCircle2 className="h-5 w-5 stroke-amber-500 mr-2"/>}
                {type === 'error' && <XCircle className="h-5 w-5 stroke-red-600 mr-2"/>}
                {text}
            </div>
        ))
    }

    return customToast
}