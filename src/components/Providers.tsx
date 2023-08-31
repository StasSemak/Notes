"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "next-themes"

const queryClient = new QueryClient()

const Providers = ({children}:{children:React.ReactNode}) => {
    return (
        <ThemeProvider attribute="class" enableSystem>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </ThemeProvider>
    )
}

export default Providers