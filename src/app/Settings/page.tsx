"use client"
import { useEffect, useState } from "react"
import { Sidebar } from "../components/Sidebar"
import { Top } from "../components/Top"
import {  useSession } from "next-auth/react"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation"
export default function Settings(){
    const [image,setImage]=useState("")
    const session=useSession()
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [mobile,setMobile]=useState(9999999999)
    const [changePassword,setChangePassword]=useState(false)
    const [checkPassword,setCheckPassword]=useState("")
    const [currentPassword,setCurrentPassword]=useState("")
    const [newPassword,setNewPassword]=useState("")
    const [showPassword1,setShowPassword1]=useState(false)
    const [showPassword2,setShowPassword2]=useState(false)
    const [save,setSave]=useState(false)
    const [update,setUpdate]=useState(false)
    const [loading,setLoading]=useState(false)
    const [timer,setTimer]=useState(5)
    const router=useRouter()
    if(loading)
    {
        setTimeout(()=>{
            const l=timer-1;

            setTimer(l)
            if(l==0)
            {
                router.push('/')
            }
        },1000)
    }
    useEffect(()=>{
        if (session.data?.user) {


            setName(session.data.user.name || "");
            setEmail(session.data.user.email || "");

        }
        const cachedImage=localStorage.getItem("image")
        if(cachedImage)
        {
            setImage(cachedImage)
        }
        const fetchImage=async ()=>{
            try{

                const response=await fetch(`/api/get_user_image?email=${session.data?.user?.email}`,{
                    method:"GET"
                })
                const data=await response.json();
                setImage(data)
                localStorage.setItem("image",data)
                const m=await fetch(`/api/get_mobile?email=${session.data?.user?.email}`,{
                    method:"GET"
                })

                const res=await m.json();
                setMobile(res.mobile)
                setCheckPassword(res.password)
            }catch(error)
            {
                throw new Error(`Failed to fetch user details for ID: ${error}`)
            }
        }
        fetchImage()
    },[session])
    const handlePassword=async()=>{
        setChangePassword(!changePassword)
        try{

            const payload={
                email,
                newPassword,
                checkPassword,
                currentPassword
            }
            if(!email)
            {
                toast.warning('Please dont leave email field empty')
                return
            }
            if(!newPassword)
            {
                toast.warning('Please fill the new Password field')
                return
            }
            if(newPassword.length<8)
            {
                toast.warning("Your new password has less than of 8 character")
                return;
            }
            setUpdate(true)
            const response=await fetch('/api/update',{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })
            if(response.status==403)
            {
                toast.error("Your current password is not your existing password")
                return;
            }
            setLoading(true);

        }catch(error)
        {
            console.log("Error in updating detials",error)
            toast.warning("Error in updating details")
        }finally{
            setUpdate(false)
        }

    }
    const handleChanges=async()=>{

        const payload={
            name,
            email,
            mobile
        }
        try{
            if(!name)
            {
                toast.warning("Please dont leave name field empty")
                return ;
            }
            if(!email)
            {
                toast.warning("Please dont leave email field empty")
                return
            }
            if(!mobile)
            {
                toast.warning("Please dont leave mobile field empty")
                return
            }
            setSave(true)
            await fetch('/api/update',{
                method:"PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })
            setLoading(true)
        }catch(error)
        {
            console.log("Error in updating detials",error)
            toast.warning("Error in updating details")
        }
        finally{
            setSave(false)
        }
    }
    return  <div>
      <ToastContainer></ToastContainer>
             <div className="bg-black min-h-screen ">
                <div className={`${loading===true?"opacity-30":""}`}>
                    <div className="text-white">

                    <Top></Top>
                    </div>

                    <div className="flex">
                    <div className="text-white">
                        <Sidebar activePage="settings"></Sidebar>
                    </div>
                    <div className="w-full">
            <div className="flex justify-center items-center text-white">
                <div className="mt-6 text-4xl font-bold ml-16 mt-2 text-purple-400">
                    PERSONAL INFO
                </div>


            </div>

            <div className="flex justify-center">
            <div className="bg-gray-900 w-2/3   p-6 mt-8">
                    <div className="flex justify-center">
                        <div className="text-white" >
                            <div className=" rounded-full w-18  bg-sky-600 cursor-pointer" onClick={()=>{
                                router.push('/picture')
                            }}>
                                    <img
                                        src={image}
                                        alt="Profile picture"
                                        width={92}
                                        height={92}

                                        />
                            </div>
                        </div>
                    </div>
                            <div className="mt-2 text-xl text-slate-600   text-center">
                                {session.data?.user?.name}
                            </div>
                            <div className="mt-1 text-xl text-slate-400  text-center ">
                                {session.data?.user?.email}
                            </div>
                            <div className=" mt-6 flex t">
                                <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-7 text-slate-600">
    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>

                                </div>
                                <div className="ml-2 text-lg text-purple-600 font-semibold">
                                    Personal Information
                                </div>
                            </div>
                            <div className="text-slate-500 mt-1">
                            Update your personal details
                            </div>
                            <div className="mt-4">
                                <div>
                                    <label htmlFor="" className="text-slate-400">Full Name</label>
                                    <div className="mt-2 ">
                                    <input type="text" value={name} onChange={(e)=>{
                                        setName(e.target.value)
                                    }}  className="bg-gray-800 rounded-md p-2 w-full text-white"/>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <div>
                                    <label htmlFor="" className="text-slate-400">Email Address (Unchangeable)</label>
                                    <div className="mt-2 ">
                                    <input type="text" readOnly value={email} onChange={(e)=>{
                                        setEmail(e.target.value)
                                    }}  className="bg-gray-800 rounded-md p-2 w-full text-white"/>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <div>
                                    <label htmlFor="" className="text-slate-400">Mobile Number</label>
                                    <div className="mt-2 ">
                                    <input type="tel" value={mobile}  onChange={(e)=>{
                                        setMobile(Number(e.target.value))
                                    }}  className="bg-gray-800 rounded-md p-2 w-full text-white"/>
                                    </div>
                                </div>
                            </div>
                            {changePassword&&(
                                <div>

                                <div className="mt-4">
                                <div>
                                    <label htmlFor="" className="text-slate-400">Current Password</label>
                                    <div className="mt-2 relative w-full ">
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" onClick={()=>{
                                            setShowPassword1(!showPassword1)
                                        }}>
                                        {showPassword1===false ? "🙈" : "👁️"}
                                        </div>
                                    <input type={`${showPassword1?"text":"password"}`} value={currentPassword}  onChange={(e)=>{
                                        setCurrentPassword(e.target.value)
                                    }}  className="bg-gray-800 rounded-md p-2 w-full text-white"/>
                                    </div>
                                </div>
                            </div>
                                <div className="mt-4">
                                <div>
                                    <label htmlFor="" className="text-slate-400">New Password</label>
                                    <div className="mt-2 relative w-full ">
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" onClick={()=>{
                                            setShowPassword2(!showPassword2)
                                        }}>
                                        {showPassword2===false ? "🙈" : "👁️"}
                                        </div>
                                    <input type={`${showPassword2?"text":"password"}`} value={newPassword}  onChange={(e)=>{
                                        setNewPassword(e.target.value)
                                    }}  className="bg-gray-800 rounded-md p-2 w-full text-white"/>
                                    </div>
                                    <div className="text-slate-500 mt-1">
                                        Password should be of min 8 characters
                                    </div>
                                </div>
                            </div>
                                </div>
                            )}
                            <div className="mt-6 flex justify-between">
                                    <button disabled={update} className="text-white font-semibold rounded-md p-2 bg-purple-700" onClick={handleChanges}>
                                    { save===true?"Saving...":"Save Changes"}
                                    </button>
                                    <button disabled={save} className="text-white font-semibold rounded-md p-2 bg-purple-700" onClick={handlePassword}>
                                        {changePassword===false?"Change Password":"Update Password"}
                                    </button>
                            </div>

            </div>
            </div>

            <div>

            </div>
        </div>


                    </div>
                </div>
            </div>
            {loading &&(
                <div className=" flex items-center justify-center">
                        <div className="fixed inset-0 flex items-center justify-center  z-50">
                            <div className="bg-gray-900 w-3/4 md:1/4 text-white text-center ">
                                    <div  className="flex justify-center p-8">
                                        <div>
                                        <div className="flex justify-center">

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-20 text-green-600">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
</svg>
                                        </div>
                                        <div className="mt-2 text-2xl text-green-500">
                                        Changes Saved Successfully!
                                        </div>
                                        <div className="mt-2 text-semibold text-slate-400">
                                        Your changes have been saved. You will be redirected to the login page in {timer} seconds to re-login and view your updates.
                                        </div>
                                        <div>
                                            <button className="bg-purple-600 mt-6 w-full p-2 rounded-md" onClick={()=>{
                                                router.push('/')
                                            }}>
                                                Login Now
                                            </button>
                                        </div>
                                        </div>
                                     </div>
                            </div>
                        </div>
                </div>
            )}
        </div>
}