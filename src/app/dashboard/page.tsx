import { useSession } from "next-auth/react"
import { Sidebar } from "../components/Sidebar"
import { Top } from "../components/Top"
import { Username } from "../components/Username"
import BalanceCard from "../components/BalanceCard"
import { LinkCard } from "../components/LinkCard"
import { Recent } from "../components/Recent"
import { Group } from "../components/Group"
import { Bills } from "../components/Bills"
import { Personal } from "../components/Personal"
export default function Dashboard(){

    return <div>
        <div className="bg-black min-h-screen">
            <div className="">
                <div className=" text-white">
                    <div>
                    <Top></Top>
                    <div className=" text-white flex  ">

                    <Sidebar  activePage="dashboard"></Sidebar>
                    <div className="md:p-8 lg:p-16 ml-6  overflow-x-hidden">
                       <div className="pt-6">
                            <Username></Username>
                       </div>
                       <div className="pt-6 w-full ">
                        <BalanceCard></BalanceCard>
                       </div>
                       <div className="mt-8 w-full">
                        <LinkCard></LinkCard>
                       </div>
                       <div className="mt-10 w-full">
                        <Recent></Recent>
                       </div>
                    </div>
                    <div>
                        <div>

                        <Group></Group>
                        </div>
                        <div>
                            <Bills></Bills>
                        </div>
                        <div>
                            <Personal></Personal>
                        </div>
                    </div>
                    </div>

                    </div>
                </div>

            </div>
        </div>
    </div>
}