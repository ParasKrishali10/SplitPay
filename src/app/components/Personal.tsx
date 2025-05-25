"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
interface Expenses{
    _id:string,
    holder:string,
    title:string,
    amount:number,
    date:string,
    notes:string
}
interface WebExpenses{
    id:string,
    title:string,
    amount:number,
    date:string,
    notes:string
}
export const Personal=()=>{
      const [userExpense,setuserExpense]=useState<WebExpenses[]>([])
      const session=useSession()
      const router=useRouter()
      useEffect(()=>{
              const fetchExpense=async()=>{

                  try{
                      const response=await fetch(`/api/add_personal?email=${session.data?.user?.email}`,{
                          method:"GET"
                      })
                      const data:Expenses[]=await response.json();
                      const transformedExpense:WebExpenses[]=data.map(expense=>({
                          id:expense._id,
                          title:expense.title,
                          amount:expense.amount,
                          date:expense.date,
                          notes:expense.notes
                      }))

                      setuserExpense(transformedExpense)
                  }catch(e)
                  {
                      console.error("Error fetching expenses",e)
                  }

              }
              fetchExpense()
          },[session])
    return <div className="hidden lg:block">
    <div className="cursor-pointer rounded-md bg-gray-900 mt-10  ml-5 lg:w-60 xl:w-96 h-auto" onClick={()=>{
        router.push('/Personal_Expense')
    }}>
       <div className="p-5 h-80">
           <div className="text-3xl">
               Recent Activity
           </div>
           {userExpense.length===0 &&(
                        <div>
                            <div className="flex mt-6 justify-center  text-2xl">
                                No Expense Found
                            </div>
                        </div>
                    )}
           {userExpense.map((u)=>(
            <div key={u.id} className="mt-3 flex justify-between">
                <div className="text-xl text-slate-600">
                        {u.title}
                </div>
                <div className="text-lg text-slate-600">
                ₹ {u.amount}
                </div>
            </div>
           ))}
       </div>
   </div>
</div>
}