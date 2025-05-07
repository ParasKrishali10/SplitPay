"use client"
import { useSession } from "next-auth/react"
import { Sidebar } from "../components/Sidebar"
import { Top } from "../components/Top"
import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
interface ExpenseProps{
    id:string,
    user:string,
    group:string,
    expense:string,
    message:string,
    balance:number,
    type: 'owe' | 'own';
}
interface RawData{
  _id:string,
  user:string,
  group:string,
  expense:string,
  message:string,
  balance:number,
  type: 'owe' | 'own'
}
interface EnrichExpenseProps extends ExpenseProps{
    expenseTitle:string,
    expenseDate:string
}
export default function SettleUp(){
     return (
            <Suspense fallback={<p>Loading...</p>}>
                <SettleUpContent />
            </Suspense>
        );
}
function SettleUpContent(){
  const session=useSession()
    const [paid,setPaid]=useState(false)
    const [paidMap,setPaidMap]=useState<Record<string,boolean>>({})
    const searchParams=useSearchParams()
    const email = searchParams?.get('email')
    const id=searchParams?.get('id')
    const [loading,setLoading]=useState(false)
    const [owe,setOwe]=useState<EnrichExpenseProps[]>([])
    const [own,setOwn]=useState<EnrichExpenseProps[]>([])
    useEffect(()=>{
        const fetchHistory=async()=>{
          if(!email || !id)
          {
            return;
          }
          try{
              setLoading(true)
              const  back=await fetch(`/api/ExpenseHistory?email=${session.data?.user?.email}&type=${"own"}&id=${id}`,{
                method:"GET"
            })
            const dataX:RawData[]=await back.json()
            const data1: ExpenseProps[] = dataX.map((d) => {
              return {
                id: d._id,
                user: d.user,
                group: d.group,
                expense: d.expense,
                message: d.message,
                balance: d.balance,
                type: d.type
              };
            });

            const enrichData:EnrichExpenseProps[]=await Promise.all(
                data1.map(async(record)=>{
                    const expenseRes=await fetch(`/api/add_group_expense?id=${record.expense}`)
                    const expenseData=await expenseRes.json()
                    return {
                        ...record
                        ,
                        expenseTitle:expenseData.title,
                        expenseDate:expenseData.date
                    }
                })
            )
            setOwn(enrichData)
            const paid=await fetch(`/api/ExpenseHistory?email=${session.data?.user?.email}&type=${"owe"}&id=${id}`,{
                method:"GET"
            })

            const datay:RawData[]=await paid.json()
            const data2:ExpenseProps[]=datay.map((d) => {
              return {
                id: d._id,
                user: d.user,
                group: d.group,
                expense: d.expense,
                message: d.message,
                balance: d.balance,
                type: d.type
              };
            });
            const populatingData:EnrichExpenseProps[]=await Promise.all(
                data2.map(async(record)=>{
                    const expenseRes=await fetch(`/api/add_group_expense?id=${record.expense}`)
                    const expenseData=await expenseRes.json()
                    return {
                        ...record
                        ,
                        expenseTitle:expenseData.title,
                        expenseDate:expenseData.date,

                    }
                })
            )
            setOwe(populatingData)
          }catch(error)
          {
            console.log(error)
            return;
          }
          finally{
            setLoading(false)
          }
        }
        fetchHistory()
    },[session])
    return(

    <div>
      {loading && (
        <div className="bg-black min-h-screen ">

            <div className="flex h-screen text-white justify-center items-center">
                <div>
                    <div className="flex">
                    <button type="button" className=" p-2 bg-indigo-500 flex rounded-md" disabled>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="mr-3 size-6 animate-spin">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
</svg>
                Processing
                    </button>
                    </div>

                </div>

            </div>
        </div>
        )}
        {!loading &&(

        <div className="bg-black min-h-screen ">
                    <div className="text-white">

                    <Top></Top>
                    </div>
                    <div className="flex">
  <div className="text-white">
    <Sidebar activePage="groups" />
  </div>

  <div className="mt-8 ml-10 flex-1 pr-10"> {/* Added flex-1 and padding */}
    <div className="text-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
      Money Matters
    </div>
    <div className="text-xl text-gray-400">
      Keep track of who owes what
    </div>
    <div className="text-gray-300 mt-10 text-2xl">
      Transaction History
    </div>
    <div className="p-6 mt-10 h-[510px] rounded-md overflow-y-auto bg-gray-800">
      {own.map((o)=>(

          <div key={o.id}>
                 <div className="text-white hover:outline outline-2 outline-blue-600 rounded-md mt-6 bg-gray-900 w-full p-4">
      <div className="flex justify-between">
        <div className="flex">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-10 text-green-500">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
        <div className="mt-1 text-lg ml-2">
            {o.message}
            <div className=" flex mt-2 text-base text-gray-400">
                <div>
                    {o.expenseTitle}
                </div>
                <div className=" ml-3">
                    {o.expenseDate}
                </div>
            </div>
        </div>
        </div>
        <div className="flex ">
            <div className=" text-2xl mt-3 mr-3">

        Rs {String(o.balance)}
            </div>
        <div className="mr-3 mt-3.5" >
            <button className="rounded-md bg-gray-800 p-1" onClick={()=>{
                setPaidMap((prev)=>({
                  ...prev,
                  [o.id]:!prev[o.id]
                }))
            }}>
                {paidMap[o.id]?"Paid":"Unpaid"}
            </button>
        </div>
        </div>
      </div>
    </div>
          </div>

      ))}
      {owe.map((o)=>(

          <div key={o.id}>
                 <div className="text-white hover:outline outline-2 outline-blue-600 rounded-md mt-6 bg-gray-900 w-full p-4">
      <div className="flex justify-between">
        <div className="flex">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-10 text-red-500">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
        <div className="mt-1 text-lg ml-2">
            {o.message}
            <div className=" flex mt-2 text-base text-gray-400">
                <div>
                    {o.expenseTitle}
                </div>
                <div className=" ml-3">
                    {o.expenseDate}
                </div>
            </div>
        </div>
        </div>
        <div className="flex ">
            <div className=" text-2xl mt-3 mr-3">

        Rs {String(o.balance)}
            </div>
        <div className="mr-3 mt-3.5" >
            <button className="rounded-md bg-gray-800 p-1" onClick={()=>{
                setPaid(!paid)
            }}>
                {paid===true?"Paid":"Unpaid"}
            </button>
        </div>
        </div>
      </div>
    </div>
          </div>

      ))}

    </div>
  </div>
</div>

                </div>
        )}
    </div>
    )
}