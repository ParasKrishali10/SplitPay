"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
interface Member{
    user:string
}
interface Group{
    _id:string,
    name:string,
    desciption:string,
    admin:string,
    members:Member[],
    createdAt:Date,
    balance:number
}
interface GroupListItem{
    id:string,
    name:string,
    member:number,
    balance:number;
    createdAt:string,
}
export const Tabs=()=>{
const [groups,setGroups]=useState<GroupListItem[]>([])
const [noGroup,setNoGroup]=useState(true)
const [loading,setLoading]=useState(false)
const router=useRouter()
const session=useSession()
useEffect(()=>{
    const fetchGroup=async ()=>{
        try{
            setLoading(true)
            const response=await fetch(`/api/get_groups?email=${session.data?.user?.email}`,{
                method:"GET",
                headers:{
                    'Content-Type':'application/json'
                }
            })
            if(!response.ok)
            {
                throw new Error('Failed to fetch group data')

            }
            const data:Group[]=await response.json()
            const transformedGroups:GroupListItem[]=data.map(group=>({
                id:group._id,
                name:group.name,
                member:group.members.length,
                balance:group.balance,
                createdAt:new Date(group.createdAt).toLocaleDateString()
            }))
            if(transformedGroups.length>0)
            {
                setNoGroup(false)
            }
            setGroups(transformedGroups)
            }catch(error)
            {
                console.error("Error fetching messages",error)
            }
            finally{
                setLoading(false)
            }
    }
    fetchGroup()
},[session])
    return <div>
        <div className="text-white  w-full ">
                <div className="w-full ">

                <div className="mt-12 mr-16 ml-16  bg-gray-900 mt-10 ml-16 mr-16">
                    <div className="p-6 h-[510px] overflow-y-auto  ">
                        {loading &&(
                            <div className="flex flex-col items-center h-screen jusitfy-center ">
                                <div>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="mr-3 size-10 animate-spin ">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
</svg>
                                </div>
                            </div>
                        )}
                        {groups.map((group)=>(

                        <div key={group.id} className="w-full mt-4 rounded-md bg-gray-800 hover:outline outline-2 outline-blue-600 ">
                            <div className="p-6">
                                <div className="flex justify-between">

                                <div className="text-3xl font-bold text-cyan-500">{group.name}</div>
                                <div className="text-2xl text-green-500">Rs {group.balance}</div>
                                </div>
                                <div className="flex font-bold mt-2 text-slate-500">
                                    <div>
                                        {group.member} members
                                    </div>
                                    <div className="ml-4">
                                        Created At {group.createdAt}
                                    </div>
                                </div>
                                <div className="flex justify-between mt-12">
                                    <div className="flex">
                                        <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 mt-0.5">
  <path d="M7 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM14.5 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM1.615 16.428a1.224 1.224 0 0 1-.569-1.175 6.002 6.002 0 0 1 11.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 0 1 7 18a9.953 9.953 0 0 1-5.385-1.572ZM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 0 0-1.588-3.755 4.502 4.502 0 0 1 5.874 2.636.818.818 0 0 1-.36.98A7.465 7.465 0 0 1 14.5 16Z" />
</svg>

                                        </div>
                                        <div className="ml-3 mb-1 text-lg">

                                        {group.member} members
                                        </div>
                                    </div>
                                    <div className="flex bg-white w-36 text-cyan-500 rounded-md h-9 hover:bg-sky-500 hover:text-black">
                                        <button className=" font-semibold flex text-center ml-5 mt-1 " onClick={()=>{
                                            router.push(`/Group_Details?id=${group.id}`)
                                        }}>
                                            <div >
                                                View Details
                                            </div>
                                            <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 mt-0.5">
  <path fill-rule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
</svg>

                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))}
                        {noGroup &&!loading &&(
                            <div className="text-3xl  flex justify-center items-center">
                                No Group Found
                            </div>
                        )}

                    </div>
                </div>
                </div>

        </div>
    </div>
}