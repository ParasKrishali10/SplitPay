"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
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

const NotificationList=({notifications}:NotificationsListProps)=>{

    const router=useRouter()
    return (
        <div key={notifications.id} className="mt-12 flex justify-center" onClick={()=>{
            router.push('/All_Groups')
        }}>
                            <div className={` bg-gray-900 outline-2 outline-offset-2 w-5/6 p-5  border-2 border-blue-500 cursor-pointer text-white rounded-md`}>
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
const NotificationListT=({notifications}:NotificationsListProps)=>{

    const router=useRouter()
    return (
        <div key={notifications.id} className="mt-12 flex justify-center" onClick={()=>{
            router.push('/TH')
        }}>
                            <div className={` bg-gray-900 outline-2 outline-offset-2 w-5/6 p-5  border-2 border-blue-500 cursor-pointer text-white rounded-md`}>
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
    const all=true
    const [total,setTotal]=useState(0)
    const [loading,setLoading]=useState(false)
    const [transactionNotifiacation,setTransactionNotification]=useState<GroupNotifications[]>([])
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
                const TN=await fetch(`/api/transactNotify?email=${session.data.user.email}`,{
                    method:"GET"
                })
                const TH=await TN.json();
                const TH_With_Sender_Name=await Promise.all(
                    TH.map(async(n:GroupNotifications)=>{
                        const userResponse=await fetch(`/api/get_user?id=${n.sender}`,{
                            method:"GET"
                        })
                        const sederData=await userResponse.json()
                        return {...n,sender:sederData.name,id:n.id}
                    })
                )
                setTransactionNotification(TH_With_Sender_Name)
                setTotal(notificationsWithSenderName.length+TH_With_Sender_Name.length)
            }catch(error)
            {
                console.error("Error while fetching notifications",error)
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
               {all && transactionNotifiacation.map((n)=>(
                    <NotificationListT key={n.id} notifications={n} ></NotificationListT>

                ))}
                </div>

            </div>
        </div>
    </div>
}