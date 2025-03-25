"use client"
import { useEffect, useState } from "react"

interface Props{
    group:string
}
interface GroupList{
    title:string,
    amount:number,
    holder:string,
    date:string
}
export const RecentExpense=({group}:Props)=>{
    const [expensesDetails,setExpenseDetails]=useState<GroupList[]>([])
    useEffect(()=>{
        const fetchExpense=async()=>{
            try{

                const response=await fetch(`/api/get_group_expense?id=${group}`,{
                    method:"GET"
                })
                const data=await response.json()
                setExpenseDetails(data)
            }catch(error)
            {
                console.error(`Req Failed ${error}`)
            }
            finally{

            }
        }
        fetchExpense()
    },[group])
    return <div>

        <div className="mt-12 flex justify-center">
             <div className="w-2/3 overflow-hidden bg-gray-900 ml-16 mr-16">
                 <div className="p-6">
                         <div className="text-3xl text-cyan-500 font-bold">
                             Recent  Expenses
                         </div>
                         {expensesDetails.length === 0 ? (
                <div className="mt-5 text-xl text-slate-400">
                  No expenses found for this group.
                </div>
              ) : (
                <>
                  <div className="mt-5 text-lg border-b pb-2 border-slate-600 text-slate-400 flex justify-between">
                    <div className="w-1/4">Description</div>
                    <div className="flex w-3/4 justify-between ">
                      <div className="w-1/4 text-center">Amount</div>
                      <div className="w-1/4 text-center">Paid By</div>
                      <div className="w-1/4 text-center">Date</div>
                    </div>
                  </div>
                  {expensesDetails.map((expense, index) => (
                    <div
                      key={index}
                      className="mt-5 text-lg border-b pb-2  border-slate-600 text-slate-400 flex justify-between"
                    >
                      <div className="w-1/4">{expense.title}</div>
                      <div className="flex w-3/4 justify-between ">
                        <div className="w-1/4 text-center">{expense.amount}</div>
                        <div className="w-1/4 text-center">{expense.holder}</div>
                        <div className="w-1/4 text-center">{expense.date}</div>
                      </div>
                    </div>
                  ))}
                </>
              )}

                 </div>
             </div>
     </div>

    </div>
}