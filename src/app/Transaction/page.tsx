"use client"
import { Tabs } from "../components/Tabs"
import { Top } from "../components/Top"
import { Sidebar } from "../components/Sidebar"
import { useState,useEffect } from "react"
import { useSession } from "next-auth/react"
import { set } from "mongoose"
export default function All_Groups(){
    const [image,setImage]=useState("")
    const [showVPA,setShowVPA]=useState(true)
    const [mobile,setMobile]=useState(false)
    const session=useSession()
    const [loading,setLoading]=useState(true)
    const [details,setDetails]=useState(false);
    useEffect(()=>{
        const fetchImage=async ()=>{
            try{
                const response=await fetch(`/api/get_user_image?email=${session.data?.user?.email}`,{
                    method:"GET"
                })
                const data=await response.json();
                setImage(data)
            }catch(error)
            {
                throw new Error(`Failed to fetch user details for ID: ${error}`)
            }
            finally{
                setLoading(false)
            }
        }
        fetchImage()
    },[session])
    return <div>
         <div className="bg-black min-h-screen ">
            <div className="text-white">

            <Top></Top>
            </div>
            <div className="flex">
            <div className="text-white">
                <Sidebar activePage="transactions"></Sidebar>
            </div>
            <div className="w-full">
    <div className="flex justify-center items-center text-white">
        <div className="mt-6 text-4xl font-bold ml-16 mt-2 text-purple-400">
            UPI TRANSFER
        </div>


    </div>

    <div className="flex justify-center">
    <div className="bg-gray-900 w-5/6   p-6 mt-8">
        <div className="text-white">
        <div className=" flex justify-between">
            <div>
                <div  className="text-2xl font-semibold text-purple-400">
                Send Money
                </div>
                <div className="text-lg  text-slate-500 " >
                Transfer money instantly via UPI
                </div>
            </div>
            <div className=" rounded-full w-18  bg-sky-600">
                            <img
                                src={image}
                                alt="Profile picture"
                                width={60}
                                height={60}

                                />
                            </div>
        </div>
            <div className="mt-6 flex w-full bg-gray-900 rounded-md cursor-pointer">
                <button className={`text-white text-center  rounded-md  p-3 w-2/3 ${showVPA===true?"bg-purple-500":""}`} onClick={()=>{
                    setShowVPA(!showVPA)
                    setMobile(!mobile)
                }}>
                    UPI ID
                </button>
                <div className={`text-white text-center  rounded-md p-3 w-2/3 ${mobile===true?"bg-purple-500":""}`}
                onClick={()=>{
                    setShowVPA(!showVPA)
                    setMobile(!mobile)
                }}>
                    Mobile Number
                </div>
            </div>
            {showVPA && (
                <div className="mt-4">
                    <div className="text-white ">
                        <label htmlFor="" className="font-semibold">UPI ID / VPA</label>
                        <div className="mt-2 relative  ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="absolute size-6 left-3 top-3 text-slate-600 ">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>

                        <input type="text" placeholder="John@phonepe" className="w-full rounded-md p-3 pl-11 bg-gray-900">
                        </input>
                        </div>
                    </div>
                    <div className="mt-3">
                    <div className="text-white ">
                        <label htmlFor="" className="font-semibold">Amount (₹)</label>
                        <div className="mt-2 relative  ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="absolute size-6 left-3 top-3 text-slate-600 ">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
</svg>


                        <input type="number" placeholder="0.00" className="w-full rounded-md p-3 pl-11 bg-gray-900" onKeyDown={(e)=>{
                            if(["e","E","+","-"].includes(e.key))
                            {
                                e.preventDefault()
                            }
                        }}>
                        </input>
                        </div>
                    </div>
                    </div>
                    <div className="mt-3">
                    <div className="text-white ">
                        <label htmlFor="" className="font-semibold">Note (optional)</label>
                        <div className="mt-2 ">
                        <input type="text" placeholder="What's this payment for?" className="w-full rounded-md p-3 pl-6 bg-gray-900" >
                        </input>
                        </div>
                    </div>
                    </div>
                        <div className="mt-6">
                            <button className="w-full bg-purple-500 p-2.5 rounded-md">
                                <div className="flex justify-center  ">
                                    <div className="rounded-full ">
                                        <img src="/phonepay.jpg" alt="Profile image" width={25} height={25} className="bg-purple-900"/>
                                    </div>
                                    <div className=" ml-2 ">
                                    Pay with PhonePe
                                    </div>
                                </div>

                                </button>
                        </div>
                </div>
            )}
            {mobile && (
                <div className="mt-8">
                    <div className="text-white flex justify-center ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-16">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
</svg>

                    </div>
                    <div className="flex justify-center mt-2.5">
                        <div className="text-slate-700 text-lg ">

                    Enter a mobile number to send money directly to their linked UPI account.
                        </div>
                    </div>
                    <div className="mt-6">

                    <button className="w-full bg-purple-700 p-2 rounded-md text-medium font-semibold ">
                                    Continue with Mobile Number
                                </button>
                    </div>
                </div>
            )}
        </div>
    </div>
    </div>
    <div className="mt-10 w-5/6 mx-auto">
        <div className="flex justify-between">
            <div className=" text-2xl flex font-semibold justify-between  text-purple-500">
                Transaction History
            </div>
            <div className="text-white  relative">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 absolute top-2.5 left-2">
  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>

                <input type="text" placeholder="Search Transactions" className="bg-gray-900 p-1.5 rounded-md pl-10 h-10" />
            </div>
        </div>
    <div className="mt-6">
        <div className="text-white p-4 bg-gray-900 rounded-md cursor-pointer" onClick={()=>{
            setDetails(!details)
        }}>
           <div className="flex justify-between">
                <div className="flex">
                        <div className=" rounded-full w-18 h-14  bg-sky-600">
                                        <img
                                            src={image}
                                            alt="Profile picture"
                                            width={60}
                                            height={60}

                                            />
                        </div>
                        <div className="ml-3 mt-1">
                            <div className="text-xl font-semibold">
                                Paras Krishali
                            </div>
                            <div className="text-base text-slate-500">
                                Paras@oksbi
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex" >
                            <div className="text-lg">
                                <div>
                                    ₹ 500.00
                                </div>
                                <div className="text-green-500 mt-1 flex rounded-md bg-gray-900 w-auto h-auto  text-center">
                                    <div className="ml-2 mt-0.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

                                    </div>
                                    <div className="ml-1 mr-2">
                                        Success
                                    </div>
                                </div>
                            </div>
                            {!details && (<div className="mt-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
</svg>

                            </div>)}
                            {details && (<div className="mt-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">

  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
</svg>


                            </div>)}
                        </div>

                    </div>
           </div>
           {details && (<div className="mt-8 w-full border-t-2 border-slate-700">

                <div className="mt-4">
                    <div className="flex justify-between">
                        <div>
                            <div className="text-lg text-gray-500">
                                Transaction ID
                            </div>
                            <div className="text-zinc-300 text-lg">
                            UPI987654321
                            </div>
                        </div>
                        <div className="text-lg text-gray-500 mr-2">
                            <div>
                                Date And Time
                            </div>
                            <div className="flex text-zinc-300 text-lg   ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 ">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
</svg>
                            <div className="ml-2">
                            Jun 20, 2023, 02:30 PM
                            </div>
                            </div>
                        </div>
                    </div>
                        <div className="flex justify-between mt-6">
                            <div className="text-lg">
                                <div className=" text-gray-500">
                                    Status
                                </div>
                                <div className="flex mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className=" mt-0.5 size-6 text-green-400">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

                                    <div className="ml-1">
                                        Success
                                    </div>
                                </div>
                            </div>
                            <div className="mr-32">
                                <div className="text-lg text-gray-500">
                                    Type
                                </div>
                                <div>
                                    Money Sent
                                </div>
                            </div>
                        </div>
                </div>
           </div>)}
        </div>
    </div>
    </div>
    <div>

    </div>
</div>


            </div>
        </div>
    </div>
}