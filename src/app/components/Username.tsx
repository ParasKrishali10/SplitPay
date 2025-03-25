"use client"

import { useSession } from "next-auth/react"

export const Username=()=>{
    const session=useSession()
    return <div>
        <div className="md:text-4xl sm:text-3xl lg:text-5xl font-bold">
            Welcome Back , {session.data?.user?.name}
        </div>
    </div>
}