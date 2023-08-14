'use client'

import { User } from "next-auth"
import UserAvatar from "./UserAvatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/DropdownMenu"
import { signOut } from "next-auth/react"

interface Props {
    user: User
}

const UserMenu = ({user}:Props) => {
    return(
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserAvatar user={user}/>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <div className="flex flex-col gap-2 leading-none p-2">
                    {user.name && <p>{user.name}</p>}
                    {user.email && <p className="text-sm">{user.email}</p>}
                </div>
                <DropdownMenuSeparator/>

                <DropdownMenuItem
                    className="cursor-pointer"
                    onSelect={(e) => {
                        e.preventDefault()
                        signOut({
                            callbackUrl: `${window.location.origin}/sign-in`
                        })
                    }}    
                >
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
} 

export default UserMenu