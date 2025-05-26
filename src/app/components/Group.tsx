"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"
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
export const Group=()=>{
const [groups,setGroups]=useState<GroupListItem[]>([])
const session=useSession()
const router=useRouter()

useEffect(()=>{
    const fetchGroup=async ()=>{
        try{
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

            setGroups(transformedGroups)
            }catch(error)
            {
                console.error("Error fetching messages",error)
            }
            finally{

            }
    }
    fetchGroup()
},[session])
    return <div className="hidden lg:block">
        <div className="cursor-pointer rounded-md bg-gray-900 mt-8 ml-5  lg:w-60 xl:w-96 h-auto" onClick={()=>{
            router.push('All_Groups')

        }}>
            <div className=" p-5 h-64">
                <div className="text-3xl">
                    Group Overview
                </div>
                <div className=" mt-4">
                    {groups.length===0 &&(
                        <div>
                            <div className="flex justify-center  text-2xl">
                                No Group Found
                            </div>
                        </div>
                    )}
                    {groups.slice(0, 4).map((g) => (
  <div key={g.id}>
    <div className="mt-2 ">
      <div className="mt-2 rounded-md text-xl text-slate-400">
        {g.name}
      </div>
    </div>
  </div>
))}

                    {/* <div>
                        {groups.map}
                    </div> */}
                {/* <div className="text-xl">
                    Roomates
                </div>
                <div className="text-lg  ">
                ₹3000
                </div> */}
                </div>
                {/* <div className="flex justify-between mt-3">
                <div className="text-lg text-slate-600">
                    Your Share
                </div>
                <div className=" text-lg flex">
                    <div className="text-green-600">
                    ₹500
                    </div>
                    <div>
                        /
                    </div>
                    <div className="text-red-600">
                    ₹100
                    </div>
                </div>
                </div> */}
                {/* <div className="flex justify-between  mt-3">
                <div className="text-xl">
                    Trip To Goa
                </div>
                <div className="  text-lg">
                ₹10000
                </div>
                </div> */}
                {/* <div className="flex justify-between mt-3">
                <div className="text-lg text-slate-600">
                    Your Share
                </div>
                <div className="text-lg  flex">
                    <div className="text-green-600">
                    ₹5000
                    </div>
                    <div>
                        /
                    </div>
                    <div className="text-red-600">
                    ₹3000
                    </div>
                </div>
                </div> */}
            </div>
        </div>
    </div>
}