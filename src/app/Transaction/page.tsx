"use client"
import { Top } from "../components/Top"
import { Sidebar } from "../components/Sidebar"
import { useState,useEffect } from "react"
import { useSession } from "next-auth/react"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FileUpload from "../components/FileUpload"
import { useRouter } from "next/navigation"

export default function All_Groups(){
    const [image,setImage]=useState("")
    const [vpa,setVPA]=useState("")
    const [payee,setPayee]=useState("")
    const [amount,setAmount]=useState(0)
    const session=useSession()
    const [showVPA,setShowVPA]=useState(true)
    const [SS,setSS]=useState(false)
    const [link,setLink]=useState(false)
    const [paymentLink,setPaymentLink]=useState("")
    const [hiddenLink,setHiddenLink]=useState(false)
    const [note,setNote]=useState("")
    const [email,setEmail]=useState("")
    const [snapPayee,setSnapPayee]=useState("")
    const [snap,setSnap]=useState("")
    const [snapAmount,setSnapAmount]=useState(0)
    const router=useRouter()
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
        }
        fetchImage()
    },[session])
    const handlePayment=async()=>{
        if(!vpa)
        {
            toast.error("Fill up the VPA")
            return;
        }
        if(!payee)
        {
            toast.error("Fill up the Payee Name")
            return
        }
        if(!amount)
        {
            toast.error("Fill up the amount")
            return
        }
        try{
            const pN=payee.replace(/\s+/g,"")
            const upiLink=`upi://pay?pa=${vpa}&pn=${pN}&am=${amount}&cu=INR`
            toast.success("Redirecting You For Payment.....",{
                autoClose:3000
            })
            setTimeout(() => {
                toast.warning("As you don't had GPay in your PC so we are providing you the link to deal with payment in your phone.....")
                window.location.href = upiLink;
                setLink(true)
              }, 3000);
        }
        catch(error)
        {
            toast.error("Check your credentials")
            console.error(error)
            return
        }

    }

    const handleLink=async()=>{
        const pN=payee.replace(/\s+/g,"")
        setPaymentLink(`upi://pay?pa=${vpa}&pn=${pN}&am=${amount}&cu=INR`)
        setHiddenLink(true)
    }
    const send_notification=async()=>{
        const rec=await fetch(`/api/get_user_email?email=${email}`,{
            method:"GET"
        })
        const data=await rec.json()
        const payload={

            sender_email:session.data?.user?.email,
             participants:data._id,
            message:`You had recieve a snap from ${session.data?.user?.name}`,
            tag:"Snap Notification"
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
    const sendSnap=async()=>{
        if(!email)
        {
            toast.error("Enter email of user")
            return;
        }
        if(!snapPayee)
        {
            toast.error("Enter name of user")
            return
        }
        if(!snapAmount)
            {
                toast.error("Enter the amount you are sending")
                return ;
            }
        if(!note)
        {
            toast.error("Mention up the group name")
            return ;
        }
        if(!snap)
        {
            toast.error("Upload Snap")
            return
        }

        try{
            const response=await fetch(`/api/get_user_email?email=${email}`,{
                method:"GET",
            })

            if(response.status===404)
            {
                toast.error("User not found")
                return;
            }
            if(response.status===500)
            {
                toast.error("Internal server Error")
                return;
            }
            const user=await response.json();
            const sender_email=session.data?.user?.email
            const response_sender=await fetch(`/api/get_user_email?email=${sender_email}`,{
                method:"GET",
            })

            if(response_sender.status===404)
            {
                toast.error("User not found")
                return;
            }
            if(response_sender.status===500)
            {
                toast.error("Internal server Error")
                return;
            }
            const sender_Details=await response_sender.json()
            const payload={
                message:note,
                sender:sender_Details._id,
                reciever:user._id,
                ss:snap,
                amount:snapAmount

            }
            const result=await fetch('/api/snap',{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(payload)
            })

            if(result.status===500)
            {
                toast.error("Error while sending the snap")
                return;
            }
            send_notification();
            toast.success("Successfully Sended Snap")
        }
        catch(error)
        {
            toast.error("Error while sending snap");
            console.log(error)
            return ;
        }
    }
    return <div>
        <ToastContainer></ToastContainer>
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
                    setSS(!SS)
                }}>
                    UPI ID
                </button>
                <div className={`text-white text-center  rounded-md p-3 w-2/3 ${SS===true?"bg-purple-500":""}`}
                onClick={()=>{
                    setShowVPA(!showVPA)
                    setSS(!SS)
                }}>
                   PaySnap
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

                        <input type="text" placeholder="John@oksbi" className="w-full rounded-md p-3 pl-11 bg-gray-900" onChange={(e)=>{
                            setVPA(e.target.value)
                        }}>
                        </input>
                        </div>
                    </div>
                    <div className="text-white mt-2">
                        <label htmlFor="" className="font-semibold">Payee Name</label>
                        <div className="mt-2 relative  ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="absolute size-6 left-3 top-3 text-slate-600 ">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>

                        <input type="text" placeholder="John Doe" className="w-full rounded-md p-3 pl-11 bg-gray-900" onChange={(e)=>{
                            setPayee(e.target.value)
                        }}>
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
                        }} onChange={(e)=>{
                            setAmount(Number(e.target.value))
                        }}>
                        </input>
                        </div>
                    </div>
                    </div>

                        <div className="mt-6">
                            <button className="w-full bg-purple-500 p-2.5 rounded-md" onClick={handlePayment}>
                                <div className="flex justify-center  ">

                                    <div className=" ml-2 ">
                                    Proceed With Payment
                                    </div>
                                </div>

                                </button>
                        </div>
                        {link && (
                            <div className="mt-6">
                            <button className="w-full bg-purple-500 p-2.5 rounded-md" onClick={handleLink}>
                                <div className="flex justify-center  ">

                                    <div className=" ml-2 ">
                                            Get Payment Link
                                    </div>
                                </div>

                                </button>
                        </div>
                        )}
                        <div>

                        {
                            hiddenLink && (
                                <div className="rounded-md flex flex-wrap mt-4 bg-gray-800 p-3 w-full ">
                                <div className="w-5/6 break-words">
                                  {paymentLink}
                                </div>
                              </div>

                            )
                        }
                        </div>
                </div>
                )}
                {SS &&(
                     <div className="mt-4">
                     <div className="text-white ">
                         <label htmlFor="" className="font-semibold">Email Of Reciever</label>
                         <div className="mt-2 relative  ">
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="absolute size-6 left-3 top-3 text-slate-600 ">
   <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
 </svg>

                         <input type="email" placeholder="John@gmail.com" className="w-full rounded-md p-3 pl-11 bg-gray-900" onChange={(e)=>{
                             setEmail(e.target.value)
                         }}>
                         </input>
                         </div>
                     </div>
                     <div className="text-white mt-2">
                         <label htmlFor="" className="font-semibold">Payee Name</label>
                         <div className="mt-2 relative  ">
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="absolute size-6 left-3 top-3 text-slate-600 ">
   <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
 </svg>

                         <input type="text" placeholder="John Doe" className="w-full rounded-md p-3 pl-11 bg-gray-900" onChange={(e)=>{
                             setSnapPayee(e.target.value)
                         }}>
                         </input>
                         </div>
                     </div>
                     <div className="text-white mt-2">
                         <label htmlFor="" className="font-semibold">Amount</label>
                         <div className="mt-2 relative  ">
                         {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="absolute size-6 left-3 top-3 text-slate-600 ">
   <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
 </svg> */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="absolute size-6 left-3 top-3 text-slate-600 ">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
</svg>


                         <input type="Number" placeholder="Rs 100" className="w-full rounded-md p-3 pl-11 bg-gray-900" onChange={(e)=>{
                             setSnapAmount(Number(e.target.value))
                         }}>
                         </input>
                         </div>
                     </div>
                     <div className="text-white mt-2">
                         <label htmlFor="" className="font-semibold">Notes (Mention Group Name)</label>
                         <div className="mt-2 relative  ">
                         {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="absolute size-6 left-3 top-3 text-slate-600 ">
   <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
 </svg> */}
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="absolute size-6 left-3 top-3 text-slate-600 ">
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>


                         <input type="text" placeholder="John Doe" className="w-full rounded-md p-3 pl-11 bg-gray-900" onChange={(e)=>{
                             setNote(e.target.value)
                         }}>
                         </input>
                         </div>
                     </div>
                     <div className="mt-3">
                     <div className="text-white ">
                         <label htmlFor="" className="font-semibold">Upload Snap</label>

                     </div>
                     <div className="mt-3" >
                     <FileUpload onUploadComplete={(url) => setSnap(url)} />                    </div>
                     </div>

                         <div className="mt-6">
                             <button className="w-full bg-purple-500 p-2.5 rounded-md" onClick={sendSnap}>
                                 <div className="flex justify-center  ">

                                     <div className=" ml-2 ">
                                     Send Snap
                                     </div>
                                 </div>

                                 </button>
                         </div>
                 </div>

                )}
        </div>
    </div>
    </div>
                <div className="text-white text-center p-5 mt-2 animate-bounce">
                    <button className="bg-cyan-800 rounded-md p-2 cursor-pointer" onClick={()=>{
                        router.push('/TH')
                    }}>
                    Click To Get Transaction Details
                    </button>
                </div>
    <div>

    </div>
</div>


            </div>
        </div>
    </div>
}