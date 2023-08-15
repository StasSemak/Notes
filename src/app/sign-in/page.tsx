import SignIn from "@/components/SignIn"
import { buttonVariants } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

const SignInPage = () => {
    return(
        <div className="h-[80vh] flex flex-col items-center justify-center gap-20">
            <Link href="/" className={cn(
                buttonVariants({variant: 'ghost'}), 
                'text-lg self-start -mt-20'
            )}>
                <ChevronLeft className="h-5 w-5 mr-2"/>
                Home
            </Link>
            
            <SignIn/>
        </div>
    )
}

export default SignInPage