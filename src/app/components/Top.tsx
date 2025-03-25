"use client"

import { useRouter } from "next/navigation"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
export const Top=()=>{
    const { data: session } = useSession()
const [profile,setProfile]=useState("")
const router=useRouter()
useEffect(()=>{
    const cachedImage=localStorage.getItem("profile")
    if(cachedImage)
    {
        setProfile(cachedImage)
    }
    const fetchImage=async ()=>{
        try{
            const response=await fetch(`/api/get_user_image?email=${session?.user?.email}`,{
                method:"GET"
            })
            const data=await response.json();
            setProfile(data)
            localStorage.setItem("profile",data)
        }catch(error)
        {
            throw new Error(`Failed to fetch user details for ID: ${error}`)
        }
    }
    fetchImage()
},[session])
    return <div>
        <div className=" top-0 left-0 w-full bg-gray-800 flex p-3  justify-between">
                        <header className="text-4xl mt-2 font-bold">
                            SplitSmart
                        </header>
                        <div className="flex space-x-8 mr-6">
                            <div className="cursor-pointer" onClick={()=>{
                                    router.push('/Notifications')
                            }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-10 mt-3 mr-3">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
</svg>
                            </div>
                            <div className=" rounded-full w-18  bg-sky-600">
                            <img
                                src={profile}
                                alt="Profile picture"
                                width={64}
                                height={64}

                                />
                            </div>
                        </div>
                    </div>
    </div>
}