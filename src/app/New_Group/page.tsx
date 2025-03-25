"use client"
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState,useEffect, use } from "react";
interface User{
    id:number,
    name:string,
    email:string
}
export  default function New_Group(){
    const session=useSession()
    const [users,setUsers]=useState<User[]>([])
    const [loading,setLoading]=useState(false)
    useEffect(()=>{
        const fetchUsers=async()=>{
            try{
               const response= await fetch("/api/get_users",{
                method:"GET",
                headers:{
                    'Content-Type':"application/json"
                }
               })
               if(response.ok)
               {
                const data=await response.json()
                setUsers(data)
               }
            }catch(error)
            {
                console.error("Error fetching messages",error)
            }
        }
        fetchUsers()
    },[])

    const [searchItem,setSearchItem]=useState("")
    const [participants,setParticipants]=useState<User[]>([])
    const [groupName,setGroupName]=useState("")
    const [description,setDescription]=useState("")
    const filteredUser=users.filter(user=>
    (
       ( user.name.toLowerCase().includes(searchItem.toLowerCase())||
        user.email.toLowerCase().includes(searchItem.toLowerCase())))
    )

const deleteParticipant=(p:User)=>{
   setParticipants(prevUsers=>prevUsers.filter(user=>user.email!==p.email))
}
const send_notification=async()=>{
    const payload={
        sender_email:session.data?.user?.email,
        participants,
        message:`You were added to new Group ${groupName} by  ${session.data?.user?.name}`,
        tag:"Group invitation"
    }
        try{
            const response=await fetch("/api/send_notifications",{
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
const createGroup = async () => {
    if (!groupName.trim()) {
        toast.warning("Please provide a group name.");
        return;
    }
    if (!description.trim()) {
        toast.warning("Please provide a description.");
        return;
    }
    if (participants.length === 0) {
        toast.warning("Please add at least one participant.");
        return;
    }
    setLoading(true)
    const payload={
        name:groupName,
        description,
        participants,
        email:session.data?.user?.email

    }
    try {
        const response = await fetch('/api/newGroup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log('New Group Created');
        send_notification()
        toast.success('Group created successfully')

    } catch (err) {
        console.error('Error creating group:', err);
    }finally
    {

        setLoading(false)
    }
};

    const router=useRouter()
        return <div>
            <ToastContainer></ToastContainer>
            <div className="bg-black min-h-screen">
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
                        <div className=" p-6">
                            <div className="text-sky-500 text-2xl font-semibold">
                                Create New Group
                            </div>
                            <div className="mt-1 text-slate-500">
                                Fill in the details to create your new group
                            </div>
                            <div className="mt-5">
                                <label className="text-sky-500 text-base">
                                    Group Name
                                </label>
                                <div className="mt-3 ">
                                    <input type="text" placeholder="Enter group name" className=" w-full bg-gray-800 rounded-md p-2" onChange={(e)=>
                                        setGroupName(e.target.value)
                                    }/>
                                </div>
                            </div>
                            <div className="mt-5">
                                <label className="text-sky-500 text-base">
                                    Description
                                </label>
                                <div className="mt-3 ">
                                    <textarea name="" id="description" rows={4} className="w-full rounded-md p-2 bg-gray-800" placeholder="Describe the purpose of your group" onChange={(e)=>{
                                        setDescription(e.target.value)
                                    }}></textarea>
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="text-sky-500 text-base">
                                   Add Paricipants
                                </label>
                                <div className="mt-3 ">
                                    <input type="text" placeholder="Search Users...." className=" w-full bg-gray-800 p-2 rounded-md" onChange={(e)=>{
                                        setSearchItem(e.target.value)
                                    }}/>
                                </div>
                            </div>
                            {searchItem&& (
                                <div className="mt-1">
                                <div className="w-full cursor-pointer overflow-y-auto h-48 p-2 bg-gray-800 rounded-md">
                                {filteredUser.map((user)=>(
                                    <div key={user.id} className="flex hover:bg-cyan-500  mt-3 p-1 rounded-md " onClick={(e)=>{
                                        const exist=participants.some(p=>p.email==user.email)
                                        if(!exist)
                                        {

                                            setParticipants([...participants,user])
                                        }
                                    }}>
                                    <div className="rounded-full w-7 h-7 text-center bg-black">
                                        {user.name[0]}
                                    </div>
                                <div className="ml-2">
                                    <div>
                                        {user.name}
                                    </div>
                                <div>
                                   {user.email}
                                </div>
                                </div>
                                </div>
                                ))}

                                </div>
                            </div>
                            )}
                            {participants.length>0 &&(
                                <div  className="mt-4">
                                    <div className="text-sky-500">
                                        Added Participants
                                    </div>
                                    {participants.length>0 && (
                                        <div className="flex flex-wrap">

                                            {participants.map((p)=>(
                                                <div key={p.id} className=" mt-3 ml-2">
                                                <div className=" flex bg-gray-800 p-2 w-auto rounded-md">
                                                    <div>
                                                    {p.name}
                                                    </div>
                                                    <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 ml-2 cursor-pointer" onClick={()=>{

                                                            deleteParticipant(p)
                                                    }}>
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>

                                                    </div>
                                                </div>
                                            </div>
                                            ))}
                                        </div>

                                    )}

                                </div>
                        )}
                            <div className="mt-10">
                               <button className="flex w-full bg-sky-500 p-2 rounded-md items-center justify-center text-lg" onClick={createGroup}>
                               {!loading&&(<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                </svg>)}
                                <div className="text-center ml-2">
                                   {loading? 'Updating.....':'Create Group'}
                                </div>

                               </button>
                            </div>

                        </div>
                </div>
                </div>
            </div>
        </div>
}