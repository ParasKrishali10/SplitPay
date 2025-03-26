"use client"
import { useRouter } from "next/navigation"
import { Sidebar } from "../components/Sidebar"
import { Top } from "../components/Top"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"
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
interface ExpenseListProps{
    expense:WebExpenses
}

const deleteExpense=async(id:string)=>{
    try{
        await fetch("/api/add_personal",{
            method:"PUT",
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({id})
        })
       toast.success("Delete Expense successfully")
       window.location.reload()
    }catch(error)
    {
        console.log("Error in deleting expense",error)
    }
}
const ExpenseList=({ expense }: ExpenseListProps)=>{
    const [showNote,setShowNote]=useState(false)

    return (
        <div>

            <div key={expense.id} className="bg-gray-800 p-8 rounded-md mt-3">
                    <div className="transition ease-in hover:translate-y-0.5 hover:scale-105  duration-300">

                    <div className="flex justify-between ">
                        <div>
                        <div className="text-xl font-semibold">
                                {expense.title}
                        </div>

                        <div>

                        </div>
                        </div>
                        <div className="text-2xl font-semibold text-green-500">
                                Rs {expense.amount}
                        </div>
                    </div>
                    <div className="flex justify-between mt-4">
                        <div>
                        <div className="text-lg font-semibold flex">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
</svg>
                            <div className="ml-2">
                            {expense.date}
                            </div>
                        </div>
                        <div>

                        </div>
                        </div>
                        <div className="text-lg">
                                <button onClick={()=>{
                                    setShowNote(!showNote)
                                }} className="text-purple-500 hover:text-purple-400 hover:bg-purple-900/20 rounded-md">{showNote?"Hide Note":"Show Note"}</button>
                        </div>
                    </div>
                    {showNote && (
                                <div className="bg-gray-700 mt-3 p-2 rounded-md  ">
                                    {expense.notes}
                                </div>
                    )}
                    <div className="flex justify-end mt-6">
                        <button onClick={()=>(deleteExpense(expense.id))} className="flex bg-red-600 p-2 rounded-md">
                            <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 mt-0.5">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>

                            </div>
                            <div className=" ml-1 mr-1 font-semibold">
                                Delete
                            </div>
                        </button>
                    </div>
                    </div>
                </div>
        </div>
    )
}
export default function Personal_Expense(){
   const router=useRouter()
   const session=useSession()
   const [loading,setLoading]=useState(false)
   const [expenses,setExpenses]=useState(true)
    const [userExpense,setuserExpense]=useState<WebExpenses[]>([])
    useEffect(()=>{
        const fetchExpense=async()=>{
            setLoading(true)
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
                if(transformedExpense.length>0)
                {
                    setExpenses(false);
                }
                setuserExpense(transformedExpense)
            }catch(e)
            {
                console.error("Error fetching expenses",e)
            }
            finally{
                setLoading(false)
            }
        }
        fetchExpense()
    },[session])
     return <div>
             <div className="bg-black min-h-screen ">
                <div className="text-white">

                <Top></Top>
                </div>
                <div className="flex">
                <div className="text-white">
                    <Sidebar activePage="personal"></Sidebar>
                </div>
                <div className="w-full">
                    <div className=" flex justify-center items-center mt-8 text-purple-400 text-3xl">
                        Personal Expense Tracker
                    </div>
        <div className="flex justify-between items-center text-white">
            <div className="mt-8 text-4xl font-bold ml-16 mt-2 text-cyan-600">
                Your Expenses
            </div>

            <div className="mt-8 text-lg font-bold">
                <button className="bg-cyan-600 rounded-md p-2 mr-16" onClick={()=>{
                    router.push('/Add_Expense')
                }}>
                    + Add New Expense
                </button>
            </div>
        </div>
        <div className="w-full">
            <div className="text-white ml-8 mr-8  p-4 bg-gray-900 mt-12 h-[510px] overflow-y-auto ">
            {loading &&(
                            <div className="flex flex-col items-center h-screen jusitfy-center ">
                                <div>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="mr-3 size-10 animate-spin ">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
</svg>
                                </div>
                            </div>
                        )}
                         {expenses &&!loading &&(
                            <div className="text-3xl  flex justify-center items-center">
                                No Expense Found
                            </div>
                        )}

                {userExpense.map((e)=>(
                    <ExpenseList key={e.id} expense={e}></ExpenseList>

                ))}
            </div>
        </div>
        <div>

        </div>
    </div>


                </div>
            </div>
        </div>
}