"use client"
import { Tabs } from "../components/Tabs"
import { Top } from "../components/Top"
import { Sidebar } from "../components/Sidebar"
import { useRouter } from "next/navigation"
export default function All_Groups(){
const router=useRouter()
    return <div>
         <div className="bg-black min-h-screen ">
            <div className="text-white">

            <Top></Top>
            </div>
            <div className="flex">
            <div className="text-white">
                <Sidebar activePage="groups"></Sidebar>
            </div>
            <div className="w-full">
    <div className="flex justify-between items-center text-white">
        <div className="mt-6 text-4xl font-bold ml-16 mt-2 text-cyan-600">
            Your Groups
        </div>

        <div className="mt-6 text-lg font-bold">
            <button className="bg-cyan-600 rounded-md p-2 mr-16" onClick={()=>{
                router.push('/New_Group')
            }}>
                + Create new Group
            </button>
        </div>
    </div>
    <div>
        <Tabs></Tabs>
    </div>
    <div>

    </div>
</div>


            </div>
        </div>
    </div>
}