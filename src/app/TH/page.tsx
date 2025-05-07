"use client"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface UserProps {
    _id: string;
    name: string;
    email: string;
    password: string;
    mobile: number;
    image: string;
  }
interface TransactionProps{
    _id:string,
    sender:string,
    reciever:string,
    message:string,
    approved:boolean,
    ss:string,
    createdAt:Date,
    amount:number,
    recieverDetails:UserProps
}

export default function TH(){
    const [transaction,setTransaction]=useState<TransactionProps[]>([])
    const [recTransaction,setRecTransaction]=useState<TransactionProps[]>([])
    const [loading,setLoading]=useState(false)
    const session=useSession()
    useEffect(()=>{

            const fetchT=async()=>{
                try{
                    setLoading(true)
                    const details=await fetch(`/api/snap?email=${session.data?.user?.email}`,{
                        method:"GET"
                    })
                    const t=await details.json()
                    console.log(t)
                   const transactionsWithDetails=await Promise.all(
                    t.map(async(trans:TransactionProps)=>{
                        const res = await fetch(`/api/get_user?id=${trans.reciever}`, {
                            method: "GET",
                          });
                          const recieverData=await res.json()
                          return{
                            ...trans,
                            recieverDetails:recieverData
                          }
                    })
                   )
                   console.log('Transactions with receiver details:', transactionsWithDetails);
                    setTransaction(transactionsWithDetails)
                    const detailsUser=await fetch(`/api/approved?email=${session.data?.user?.email}`,{
                        method:"GET"
                    })
                    const p=await detailsUser.json()
                    console.log(p)
                   const transactionsWithDetailsOfRec=await Promise.all(
                    p.map(async(trans:TransactionProps)=>{
                        const res = await fetch(`/api/get_user?id=${trans.sender}`, {
                            method: "GET",
                          });
                          const recieverData=await res.json()
                          return{
                            ...trans,
                            recieverDetails:recieverData
                          }
                    })
                   )
                   console.log('Transactions with receiver details:', transactionsWithDetailsOfRec);
                    setRecTransaction(transactionsWithDetailsOfRec)
                }catch(error)
                {
                    console.log(error)
                    return
                }
                finally{
                    setLoading(false)
                }
            }
            fetchT()
    },[session])
    const send_notification=async(approval:boolean,receiver:string,group:string)=>{

        const payload={
            sender_email:session.data?.user?.email,
             participants:receiver,
            message:`${approval===true?`Your Payment has been approved by ${session.data?.user?.name} for group ${group} `:`Your Payment has not been approved by ${session.data?.user?.name} for group ${group} `}`,
            tag:"Group Transaction"
        }
            try{
                const response=await fetch("/api/transactNotify",{
                    method:"POST",
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(payload)
                })
                if(!response.ok)
                {
                    throw new Error(`Error in sending the notifications ${response.status}`)
                }

                console.log("Notification send successfully")
            }catch(error )
            {
                console.error('Error creating group:', error);
            }
    }
    const handleApproval=async(id:string,approval:boolean,reciever:string,group:string)=>{
        try{
            setLoading(true)
            const payload={
                id,
                approval
            }
            await fetch('/api/approved',{
                method:"PUT",
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify(payload)
            })
            send_notification(approval,reciever,group)
            toast.success("Payment Updation successfully")
            window.location.reload();
            return
        }catch(error)
        {
            console.log(error)
            toast.error("Payment Approval Failed")
            return
        }finally{
            setLoading(false)
        }
    }
    return <div >
        <ToastContainer></ToastContainer>
        <div className="bg-black min-h-screen ">
                <div className="text-white text-3xl text-center py-10">
                    Transaction History
                </div>
                {loading && (
                    <div className="flex items-center justify-center h-screen">

<button disabled type="button" className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
<svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
</svg>
Loading...
</button>
                    </div>
                )}
                {!loading &&  (<div className="mt-10 w-5/6 mx-auto">

        <div className="flex justify-between">



        </div>
    <div className="mt-6">
            {transaction.map((t)=>(

                <div key={t._id}>
                     <div>

<div >
    <div className="mt-1"  >
    <div className="text-white p-4 bg-gray-900 rounded-md cursor-pointer">

    <div  onClick={()=>{

}}>

    <div className="mt-2">

             <div className="flex justify-between">
    <div className="flex">
            <div className=" rounded-full w-18 h-14  bg-sky-600">
                            <img
                                src={t.recieverDetails.image}
                                alt="Profile picture"
                                width={60}
                                height={60}

                                />
            </div>
            <div className="ml-3 mt-3.5">
                <div className="text-xl font-semibold">
                {t.recieverDetails?.name || "Unknown Receiver"}

                </div>

            </div>
        </div>
        <div>
            <div className="flex" >
                <div className="text-lg">
                    <div>
                        Rs {Number(t.amount)}
                    </div>
                    <div className={` ${t.approved===true?"text-green-500":"text-red-500"}  mt-1 flex rounded-md bg-gray-900 w-auto h-auto  text-center`}>
                        <div className="ml-2 mt-0.5">
                            {t.approved && (

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
                            )}
                            {!t.approved && (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
                              </svg>

                            )}

                        </div>
                        <div className="ml-1 mr-2">
                             {t.approved===true?"Success":"Not Approved"}
                        </div>
                    </div>
                </div>
                <div className="mt-3">

                </div>
                 <div className="mt-3">



                </div>
            </div>

        </div>
</div>
<div className="mt-8 w-full border-t-2 border-slate-700">

<div className="mt-4">
<div className="flex justify-between">
<div>
<div className="mr-32">
    <div className="text-lg text-gray-500">
        Group Name
    </div>
    <div>
        {t.message}
    </div>
</div>
</div>
<div className="text-lg text-gray-500 mr-2">
<div className="text-center">
    Date And Time
</div>
<div className="flex text-zinc-300 text-lg   ">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 ">
<path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
</svg>
<div className="ml-2 ">
{new Date(t.createdAt).toLocaleString()}
</div>
</div>
</div>
</div>
<div className="flex justify-center mt-6">
<button
  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
  onClick={() => window.open(t.ss, '_blank')}
>
  View Screenshot
</button>
</div>
</div>
</div>
    </div>



</div>
    </div>
</div>
</div>


</div>
                </div>
            ))}
            {recTransaction.map((t)=>(

                <div key={t._id}>
                     <div>

<div >
    <div className="mt-1"  >
    <div className="text-white p-4 bg-gray-900 rounded-md cursor-pointer">

    <div  onClick={()=>{

}}>

    <div className="mt-2">

             <div className="flex justify-between">
    <div className="flex">
            <div className=" rounded-full w-18 h-14  bg-sky-600">
                            <img
                                src={t.recieverDetails.image}
                                alt="Profile picture"
                                width={60}
                                height={60}

                                />
            </div>
            <div className="ml-3 mt-3.5">
                <div className="text-xl font-semibold">
                {t.recieverDetails?.name || "Unknown Receiver"}

                </div>

            </div>
        </div>
        <div>
            <div  >
                <div className="text-xl mt-3">
                    <div>
                        Rs {Number(t.amount)}
                    </div>
                    {t.approved &&(
                        <div className=" flex text-green-500 mt-2">
                                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mt-1">
<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
                            <div className="ml-2">
                                Success
                            </div>
                        </div>

                    )}
                    {!t.approved &&(
                        <div className=" flex text-red-500 mt-2">
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mt-1">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
                              </svg>

                            <div className="ml-2">
                                Not Approved
                            </div>
                        </div>

                    )}


                </div>

            </div>

        </div>
</div>
<div className="mt-8 w-full border-t-2 border-slate-700">

<div className="mt-4">
<div className="flex justify-between">
<div>
<div className="mr-32">
    <div className="text-lg text-gray-500">
        Group Name
    </div>
    <div>
        {t.message}
    </div>
</div>
</div>
<div className="text-lg text-gray-500 mr-2">
<div className="text-center">
    Date And Time
</div>
<div className="flex text-zinc-300 text-lg   ">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 ">
<path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
</svg>
<div className="ml-2 ">
{new Date(t.createdAt).toLocaleString()}
</div>
</div>
</div>
</div>
<div className="flex justify-center mt-6">
<button
  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
  onClick={() => window.open(t.ss, '_blank')}
>
  View Screenshot
</button>
</div>
{t.approved===null && (<div className="flex justify-between" >
<div className="ml-2 mt-0.5 flex">
                            <button className="text-white bg-green-600 p-2 rounded-md" onClick={()=>{

                                handleApproval(t._id,true,t.sender,t.message)
                            }}>
                            Approve Payment
                            </button>

                        </div>
                        <div className="ml-1 mr-2">
                                <button className="text-white bg-red-600 p-2 rounded-md mt-0.5" onClick={()=>{

                                    handleApproval(t._id,false,t.sender,t.message)
                                }}>
                        Decline Payment
                                </button>
                        </div>
</div>)}
</div>
</div>
    </div>



</div>
    </div>
</div>
</div>


</div>
                </div>
            ))}
    </div>
    </div>)}
        </div>
    </div>
}