"use client"
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Add_Expense(){
    const session=useSession()
    const [title,setTitle]=useState("")
    const [amount,setAmount]=useState("")
    const [notes,setNotes]=useState("")
    const [date,setDate]=useState("")
    const router=useRouter()
    const AddExpense=async()=>{
        if(!title.trim())
        {
            toast.warning("Please provide a title.");
                    return;
        }
        if(!amount.trim())
        {
            toast.warning("Please provide a amount.");
                    return;
        }
        const payload={
            email:session.data?.user?.email,
            title,
            amount,
            notes,
            date,
        }
        const response=await fetch("/api/add_personal",{
            method:"POST",
            headers:{
                 'Content-Type':'application/json'
            },
            body:JSON.stringify(payload)

        })
        if(!response.ok)
            {
                throw new Error(`Error in creating personal expense ${response.status}`)
            }
                        toast.success("Expense added successfully")
    }
    return <div>
          <ToastContainer></ToastContainer>
        <div className="bg-black min-h-screen">
                <div>
                <div className="">
                    <div className="flex justify-center text-white pt-14  flex">
                        <div>

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="cursor-pointer w-6 text-cyan-500 mt-1" onClick={()=>{
                        router.push('/dashboard')
                    }}>
  <path fill-rule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
</svg>
                        </div>
                            <div className="ml-3">

                        <Link href={'/dashboard'} className="text-cyan-500 text-xl">Back To Dashboard</Link>
                            </div>
                    </div>
                </div>
                <div className="flex justify-center">
                        <div className="w-2/3 overflow-hidden mt-6 rounded-md  bg-gray-900 text-white">
                            <div className="p-5">
                                <div className="text-2xl text-violet-500">
                                    Add New Expense
                                </div>
                                <div className="mt-1 text-slate-500">
                                Fill in the details of your expense
                                </div>
                                <div className="mt-5">
                                    <div className="font-semibold">
                                        Title Of Expense
                                    </div>
                                    <input type="text" placeholder="eg. Groceries,Rent,Utilites" onChange={(e)=>{
                                        setTitle(e.target.value)
                                    }} className="w-full bg-gray-800 rounded-md p-2 mt-2"/>
                                </div>
                                <div className="mt-5">
                                    <div className="font-semibold">
                                        Amount
                                    </div>
                                    <input type="number" placeholder="Rs 1000" onChange={(e)=>{
                                        setAmount(e.target.value)
                                    }} className="w-full bg-gray-800 rounded-md p-2 mt-2"/>
                                </div>
                                <div className="mt-5">
                                    <div className="font-semibold">
                                        Date
                                    </div>
                                    <input type="date" placeholder="Rs 1000" onChange={(e)=>{
                                        setDate(e.target.value)
                                    }} className="w-full bg-gray-800 rounded-md p-2 mt-2"/>
                                </div>
                                <div className="mt-5">
                                    <div className="font-semibold">
                                        Additional Notes
                                    </div>
                                    <textarea name="" id="" rows={5} onChange={(e)=>{
                                        setNotes(e.target.value)
                                    }} className="mt-2 w-full bg-gray-800"></textarea>

                                </div>
                                <div className="mt-5">
                                    <button className="bg-violet-600 w-full p-2 rounded-md mb-2" onClick={AddExpense}>Add Expense</button>
                                </div>
                            </div>
                        </div>
                </div>
                </div>
        </div>
    </div>
}