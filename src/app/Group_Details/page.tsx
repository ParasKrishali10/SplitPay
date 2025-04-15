"use client"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useEffect, useState } from "react";
import { RecentExpense } from "../components/RecentExpense";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Types } from "mongoose";
interface Admin{
    id:string,
    name:string,
    email:string,
    image:string
}
interface IMember {
    user: Types.ObjectId;
  }
export default function  Group_Details(){
    const router=useRouter()
    const searchParams=useSearchParams()
    const id = searchParams?.get('id')

    const session=useSession()
    const [admin,setAdmin]=useState<Admin>({
        id:'',
        name:'',
        email:'',
        image:''
    })
    const [memberDetails,setMembersDetails]=useState<Admin[]>([])
    const [name,setName]=useState("");
    const [description,setDescription]=useState("")
    const [balance,setBalance]=useState("")
    const [loading,setLoading]=useState(true)
    const [cardDisplay,setCardDisplay]=useState(false)
    const [expenseTitle,setExpenseTitle]=useState("")
    const [amount,setAmount]=useState(0)
    const [date,setDate]=useState("")
    const[groupParticipants,setGroupParticipants]=useState("")
    const [update,setUpdate]=useState(false)
    const [share,displayShare]=useState(false)
    const [profit,setProfit]=useState(0)
    const [loss,setLoss]=useState(0)
    const toggle=()=>{
        setCardDisplay(!cardDisplay)
    }
    // if(!id)
    //     {
    //         return <p>Loading....</p>
    //     }
    useEffect(()=>{
        const fetchGroup=async()=>{
            if(!id)
            {
                setLoading(true)
                return ;
            }
            try{
            setLoading(true)
                const response=await fetch(`/api/get_group_details?id=${id}`,{
                    method:"GET",
                    headers:{
                        'Content-type':'application/json'
                    }
                })
                if(!response.ok)
                {
                    throw new Error('Failed to fetch group details')
                }
                const data=await response.json()
                setName(data.name)
                setDescription(data.description)
                setBalance(data.balance)
                setGroupParticipants(data.members)
                const memberIds=data.members.map((member:IMember)=>member.user)
                const members=await Promise.all(
                    memberIds.map(async(userId:string)=>{

                        const userResponse=await fetch(`/api/get_user?id=${userId}`,{
                            method:"GET",
                            headers:{
                                'Content-type':'application/json'
                            }
                        })
                        if(!userResponse.ok)
                        {
                            throw new Error(`Failed to fetch user details for ID: ${userId}`)
                        }
                        return userResponse.json()
                    }
                ))
                setMembersDetails(members)
                const admin_id=data.admin;
                const userResponse=await fetch(`/api/get_user?id=${admin_id}`,{
                    method:"GET",
                    headers:{
                        'Content-type':'application/json'
                    }
                })
                const userShares=await fetch(`/api/change_balance`,{
                    method:"GET",
                    headers:{
                        "User-Details": admin_id,
                        "Group-Id": id
                    }
                })
                const r=await userShares.json()
                setProfit(r.profit)
                setLoss(r.loss)
                if(!userResponse.ok)
                    {
                        throw new Error(`Failed to fetch user details for ID: ${admin_id}`)
                    }
                    const admin_details=await userResponse.json()
                    setAdmin(admin_details)

                }catch(error)
            {
                console.error(error);
    toast.error("Failed to load group details");
            }finally{

                setLoading(false)
            }
        }
        fetchGroup()
    },[id])


    const send_notification=async(msg:string,t:string)=>{
        const notification={
            sender_email:session.data?.user?.email,
            participants:groupParticipants,
            message:msg,
            tag:t
        }
        const send_notification=await fetch("/api/send_notifications",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(notification)
        })
        if(!send_notification)
        {
            throw new Error(`Error in sending the notifications `)
        }
        console.log("Notification send successfully")

    }
    const change_balance=async(amount:number)=>{
        const payload={
            spliting_individual_email:session.data?.user?.email,
            participants:memberDetails,
            amount,
            id
        }
        try{
            const response=await fetch('/api/change_balance',{
                method:"PUT",
                headers:{
                        'Content-Type':'application/json'
                },
                body:JSON.stringify(payload)
            })
            if(!response.ok)
            {
                throw Error(`Req failed ${response.status}`)
            }
            console.log("Balance changed successfully")
        }catch(error)
        {
            console.error(`Error occur : ${error}` )
        }
    }
    const addExpense=async()=>{
        if(!expenseTitle.trim())
        {
            toast.warning("Please enter title of the expense")
            return
        }
        if(!amount)
        {
            toast.warning("Please enter amount of the expense")
            return
        }
        if(!date.trim())
        {
            toast.warning("Please enter date of the expense")
            return
        }
        const payload={
            holderemail:session.data?.user?.email,
            title:expenseTitle,
            amount,
            date,
            group:id
        }
        setUpdate(true)
        try{
            const response=await fetch("/api/add_group_expense",{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(payload)
            })
            if(!response.ok)
            {
                throw Error(`Req failed ${response.status}`)
            }
            console.log("New Expense Added")
            const add_balance=await fetch("/api/add_balance",{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({id,amount})
            })
            if(!add_balance)
            {
                throw Error("Req failed of adding balance")
            }
            console.log("Balance updated successfully");
            toast.success("Expense added successfully")
            const msg=`${session.data?.user?.name} added the expense in  ${name} group`
            const t="Group Expense"
            change_balance(amount)
            send_notification(msg,t)
            window.location.reload();
            setCardDisplay(false)
        }catch(error)
        {
            console.log(error)
            toast.error("Error in adding expense")

        }finally{
            setUpdate(false)
        }
    }
    const LeaveGroup=async()=>{
        const payload={
            group_id:id,
            user_email:session.data?.user?.email
        }
            try{
                setLoading(true)
                const response=await fetch("/api/delete_participants",{
                    method:"PUT",
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(payload)

                })
                if(!response.ok)
                {
                    throw new Error("Unable to delete participants")
                }
                console.log("Delete participant successfully")
                const msg=`${session.data?.user?.name} leave the  ${name} group`
                const t="Group Invitation"
                send_notification(msg,t)
                router.push('/All_Groups')
            }catch(error)
            {
                console.error(`Error occur : ${error}` )
                toast.error("Error in deleting participant")
            }finally{
                setLoading(false)

            }
    }
    return <div className="bg-black min-h-screen">
        <ToastContainer></ToastContainer>
        {loading && (
            <div className="flex h-screen text-white justify-center items-center">
                <div>
                    <div className="flex">
                    <button type="button" className=" p-2 bg-indigo-500 flex rounded-md" disabled>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="mr-3 size-6 animate-spin">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
</svg>
                Processing
                    </button>
                    </div>

                </div>

            </div>
        )}
       {!loading&& (
         <div className={`${cardDisplay===true?"opacity-25":"opacity-100"}`}>

         <div className="pt-8  flex text-cyan-500 ml-10 justify-between">
             <div className="flex mt-2 ml-16">

             <div className="">

             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="cursor-pointer w-6 text-cyan-500 mt-1" onClick={()=>{
                     router.push('/dashboard')
                 }}>
<path fill-rule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
</svg>
             </div>
             <div className=" ml-2 text-xl">
                 <Link href={'/dashboard'}>Back To Dashboard</Link>
             </div>
             </div>
             <div className="mr-16 text-xl">
                 <button className="flex text-red-500 p-2 rounded-xl outline outline-2 outline-red-400" onClick={LeaveGroup}>
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mt-1">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                 </svg>
                 <div className="ml-2">
                     Leave Group
                 </div>
                 </button>
             </div>
     </div>
     <div className="mt-12 flex justify-center">
             <div className="w-2/3 overflow-hidden bg-gray-900 ml-16 mr-16">
                 <div className="p-6">
                         <div className="text-3xl  text-cyan-500 font-bold">
                             {name}
                         </div>
                         <div className="text-slate-500 mt-2">
                       {description}
                         </div>
                         <div className="flex mt-6 text-white text-xl justify-between">
                             <div>
                                 Admin
                             </div>
                             <div>
                                 Total Expenses
                             </div>
                         </div>
                         <div className="flex mt-2 justify-between">
                             <div className="flex">
                                     <div className="rounded-full w-12 h-12 text-center text-xl bg-white text-black">
                                             <img src={admin?.image} alt=""  className="w-12 h-12"/>
                                     </div>
                                     <div className="ml-3 mt-3 text-xl text-slate-400">
                                             {admin.name}
                                     </div>
                                     <div className="relative group">
  <button type="button" className="text-white" onClick={()=>{
    displayShare(!share)
  }}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 mt-4 ml-2 hover:text-indigo-500">
      <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
    </svg>
  </button>


  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-10 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-md opacity-0 transition-opacity duration-300 group-hover:opacity-100">
    Share of {admin.name}
  </div>
</div>
                             </div>
                             <div className="text-cyan-400 font-semibold text-xl mr-8 rounded-xl bg-gray-800 w-auto p-1 text-center">
                                 <div className="mt-1">
                                 Rs {balance}
                                 </div>
                             </div>
                         </div>
                        {share&& (<div className="text-white text-lg bg-gray-800 w-36 mt-4 p-2 rounded-md">
                            <div className="text-green-600">
                                Profit : Rs {profit}
                            </div>
                            <div className="mt-2 text-red-600">
                                Loss : Rs {loss}
                            </div>
                         </div>)}
                         <div className="mt-4">
                             <div className="text-white text-xl">
                                 Members
                             </div>
                             <div className="mt-3 p-2  rounded-md flex text-2xl  overflow-y-auto text-black  w-full bg-gray-800">
                                 <div className="flex flex-wrap gap-6">
                                     {memberDetails.map(m=>
                                     {if (m.id !== admin.id) return null;
                                           return(
                                            <div key={m.id}  className=" flex flex-col items-center text-center">

                                            <div className="rounded-full bg-white w-12 h-12 flex items-center justify-center">
                                                <div className="mt-2">
                                                    <img src={m.image} alt="" className="w-12 h-12 object-cover rounded-md"/>
                                                </div>

                                            </div>
                                            <div className="text-lg   mt-1 text-white">
                                                {m.name}
                                            </div>
                                                </div>
                                       )
                                     }

                                         )}


                                 </div>
                             </div>
                             <div className="mt-6">
                                 <button className="rounded-md p-2 text-black w-full bg-cyan-500 " onClick={toggle}>Split new Expense</button>
                             </div>
                         </div>
                 </div>
             </div>
     </div>
     <RecentExpense group={id??"default"}></RecentExpense>
     </div>
       )}
       {cardDisplay &&(

       <div className="absolute inset-0   text-white flex justify-center items-center ">
        <div className="w-2/3 ml-16 mr-16 bg-gray-900">
            <div className="p-5">
                <div className="flex justify-between">
                <div className="text-2xl text-cyan-500">
                    Split New Expense
                </div>
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-7 text-red-500 cursor-pointer" onClick={toggle}>
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z" />
</svg>

                </div>
                </div>

                <div className="mt-1 text-slate-500">
                Enter the details of the expense you want to split with the group.
                </div>
                <div className="mt-3">
                    <div>
                        <label className="text-lg">Title</label>
                    </div>
                    <div className="mt-2">

                    <input type="text" placeholder="Eg:Hotel Booking" className="rounded-md p-2 w-full bg-gray-800" onChange={(e)=>{
                            setExpenseTitle(e.target.value)
                    }} />
                    </div>
                </div>
                <div className="mt-3">
                    <div>
                        <label className="text-lg">Amount</label>
                    </div>
                    <div className="mt-2">

                    <input type="number" placeholder=" Rs 1000" className="rounded-md p-2 w-full bg-gray-800" onChange={(e)=>{
                       setAmount(Number(e.target.value))
                    }}/>
                    </div>
                </div>
                <div className="mt-3">
                    <div>
                        <label className="text-lg">Date</label>

                    </div>
                    <div className="mt-2 ">

                    <input type="date"  className="rounded-md p-2 w-full bg-gray-800" onChange={(e)=>{
                        setDate(e.target.value)
                    }}/>
                    </div>
                </div>
                <div className="mt-7">
                     <button className="text-center bg-sky-500 w-full p-2 rounded-md" onClick={addExpense}>{update?'Updating...':'Add Expense'}</button>
                </div>

            </div>
        </div>
       </div>
       )}
    </div>
}