"use client"
import { useSession } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
interface Notifications{
    _id:string,
    sender:string,
    reciever:string,
    message:string,
    seen:boolean,
    tag:string,
    createdAt:Date
}

interface GroupNotifications{
    id:string,
    sender:string,
    reciever:string,
    message:string,
    seen:boolean,
    createdAt:Date,
    tag:string
}

interface NotificationsListProps{
    notifications:GroupNotifications
}

const handleSeen=async(id:string, check: boolean)=>{
    try{
        const payload={
            id,
            check
        }
        const response=await fetch('/api/send_notifications',{
            method:"PUT",
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(payload)
        })
        console.log("Status changed")
    }catch(error)
    {
        console.log("Unexpected error occur",error)
    }
}
const NotificationList=({notifications}:NotificationsListProps)=>{
    const [read,setRead]=useState(false)
    return (
        <div key={notifications.id} className="mt-12 flex justify-center">
                            <div className={` bg-gray-900 ${notifications.seen===true || read===true?"border-green-600":"border-red-600"} w-5/6 p-5  border-2 border-blue-500 cursor-pointer text-white rounded-md`} onClick={()=>{
                                   setRead(prev => {
                                    const newRead = !prev;
                                    handleSeen(notifications.id, newRead);
                                    return newRead;
                                });
                            }}>
                                <div className="text-xl flex justify-between  ">
                                    <div>
                                New message from {notifications.sender}
                                    </div>
                                    <div className="text-slate-500">
                                    {new Date(notifications.createdAt).toISOString().split("T")[0]}
                                    </div>
                                </div>
                                <div className="mt-8 text-lg text-slate-500">
                                    {notifications.message}
                                </div>
                            </div>
                    </div>
    )
}
export default function Notification (){
    const session=useSession()
    const [notifications,setNotifications]=useState<GroupNotifications[]>([])
    const [read,setRead]=useState(false)
    const [unread,setUnread]=useState(false)
    const [all,setAll]=useState(true)
    const [isOpen,setIsOpen]=useState(false)
    const [total,setTotal]=useState(0)
    const [loading,setLoading]=useState(false)
    useEffect(()=>{
        const fetchNotifications=async()=>{
            try{
                setLoading(true)
                if (!session.data?.user?.email) return;
                const response=await fetch(`/api/send_notifications?email=${session.data?.user?.email}`,{
                    method:"GET"
                })
                const data:Notifications[]=await response.json()
                const setupData:GroupNotifications[]=data.map(d=>({
                        id:d._id,
                        sender:d.sender,
                        reciever:d.reciever,
                        message:d.message,
                        seen:d.seen,
                        createdAt:d.createdAt,
                        tag:d.tag

                }))
                const notificationsWithSenderName=await Promise.all(
                    setupData.map(async(n:GroupNotifications)=>{
                        const userResponse=await fetch(`/api/get_user?id=${n.sender}`,{
                            method:"GET"
                        })
                        const sederData=await userResponse.json()
                        return {...n,sender:sederData.name,id:n.id}
                    })
                )
                setNotifications(notificationsWithSenderName)
                setTotal(notificationsWithSenderName.length)
            }catch(error)
            {
                console.error("Error while fetching notifications")
            }
            finally{
                setLoading(false)
            }
        }
        fetchNotifications()
    },[session])
    return <div>
        <div className="bg-black min-h-screen">
            <div className="">
                <div className="flex justify-between p-8 text-white">
                    <div className=" text-3xl font-bold">
                        Notifications
                    </div>
                    <div className="flex mr-8 ">
                    <div className="mr-6 cursor-pointer text-lg bg-gray-900 p-1.5 rounded-md">
                        Total : {total}
                    </div>

                    </div>
                </div>
                <div className="mt-5  rounded-md flex justify-center">
                    <div>
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute text-white mt-3.5 ml-2 size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>
                    </div>
                    <input placeholder="Search Notifications" className="bg-gray-900 flex text-slate-600 p-2 pl-10 rounded-md w-5/6">

                    </input>
                    <div className="relative">
                        <button className="text-white rounded-md bg-gray-900 p-3 ml-5" onClick={()=>{
                            setIsOpen(!isOpen)
                        }}>
                            <div className="flex ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mt-0.5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
</svg>
                                <div className="text-lg ml-2">
                                    Filter
                                </div>
                                <div className="ml-1 mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
</svg>

                                </div>
                            </div>
                        </button>
                    <div >

                    {!isOpen && (
                        <div className="absolute right-0 mt-1 w-32 border bg-gray-800 text-center rounded-lg shadow-lg" >
                        <div className={`text-white border-b p-1 border-slate-600 cursor-pointer hover:text-black hover:bg-white `} onClick={()=>{
                            setAll(true)
                            setRead(false)
                            setUnread(false)
                        }}>
                                ALL
                        </div>
                        <div className="text-white border-b p-1 cursor-pointer  border-slate-600 hover:text-black hover:bg-white" onClick={()=>{
                            setAll(false)
                            setRead(true)
                            setUnread(false)
                        }}>
                                Read
                        </div>
                        <div className="text-white cursor-pointer hover:text-black hover:bg-white" onClick={()=>{
                            setAll(false)
                            setRead(false)
                            setUnread(true)
                        }}>
                                Unread
                        </div>
                        </div>
                    )}
                    </div>
                    </div>
                </div>
                {loading && (
            <div className="flex h-screen text-white justify-center items-center">
                <div>
                    <div className="flex">
                    <button type="button" className=" p-2 bg-indigo-500 flex rounded-md" disabled>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="mr-3 size-6 animate-spin">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
</svg>
                Fetching Your Notifications....
                    </button>
                    </div>

                </div>

            </div>
        )}
                <div className="h-[510px] mt-10 overflow-y-auto ">

               {all && notifications.map((n)=>(
                    <NotificationList key={n.id} notifications={n} ></NotificationList>

                ))}
                {read && notifications.filter((n)=>n.seen).map((n)=>(
                    <NotificationList key={n.id} notifications={n} ></NotificationList>

                ))}
                {unread && notifications.filter((n)=>!n.seen).map((n)=>(
                        <NotificationList key={n.id} notifications={n} ></NotificationList>

                ))}
                </div>

            </div>
        </div>
    </div>
}