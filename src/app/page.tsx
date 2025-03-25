'use client'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image";
import Link from "next/link";
import { Card } from "./components/Card";
import { signIn } from "next-auth/react";
export default function Home() {
  return (
    <div className="bg-black min-h-screen ">
       <ToastContainer />
      <div >
        <div>
          <header className="flex p-8 justify-between ">
            <div className="text-white text-3xl font-bold" >
              SplitSmart
            </div>
            <div className="flex text-lg cursor-pointer  space-x-8 text-white">

              <div className="hover:text-indigo-400">
                Features
              </div>
              <div className="hover:text-indigo-400">
                How It Works
              </div>
              <div className="hover:text-indigo-400">
                SignUp
              </div>
            </div>
          </header>
        </div>
        <div className="px-4 py-20">
          <div className="flex justify-center  items-center ">
            <h1 className=" bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent font-bold text-5xl">
              Split Bills,Not Friendships
            </h1>
          </div>
          <div className="flex justify-center mx-auto py-3  items-center ">

          <p className=" text-2xl font-bold text-slate-400">
          Effortlessly split expenses, create groups, and manage transactions with SplitSmart. Your go-to app for hassle-free bill splitting.
          </p>
          </div>
          <div className="flex justify-center  items-center py-4">
            <button className="text-white  rounded-md bg-purple-500 w-48 py-3  hover:bg-purple-700">Get Started </button>
          </div>
        </div>
        <div>
          <div className="flex justify-center items-center">
              <div className="text-white font-bold text-4xl">
                  Key Features
              </div>
          </div>
          <div className=" py-16 px-3  text-white rounded-lg w-auto px-4 py-8 grid  lg:grid-cols-4 gap-4 md: grid-cols-1">
            <div className="bg-slate-900">
              <div className="mt-1 ml-2">

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-14 text-purple-500 ">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
</svg>
              </div>
            <Card title="Split Money" description="Easily split bills among friends or groups"></Card>
            </div>
            <div className="bg-slate-900">
              <div className="mt-1 ml-2">

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-14 text-purple-500">
  <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
</svg>
              </div>
            <Card title="Create Groups" description="Organize expenses by creating custom groups"></Card>
            </div>
            <div className="bg-slate-900">
              <div className="mt-1 ml-2">

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-14 text-purple-500">
  <path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
</svg>
              </div>
            <Card title="UPI Transfer" description="Quick and secure payments via UPI"></Card>
            </div>
            <div className="bg-slate-900">
              <div className="mt-1 ml-2">

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-14 text-purple-500">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
</svg>
              </div>

            <Card title="Track Transactions" description="Keep a clear record of all your transactions"></Card>
            </div>




          </div>
          <div className="">
            <div className="bg-slate-900  ">
              <div className="text-center text-white py-12 font-bold text-4xl">
                  How It Works
              </div>
              <div className="flex px-16 py-6">
                <div className="bg-purple-800 flex justify-center items-center text-xl font-bold  rounded-3xl  w-12 h-12">
                        1
                </div>
                <div className="text-white font-bold px-6 text-xl py-3">
                    Create or Join a Group
                </div>
              </div>
              <div className="flex px-16 py-6">
                <div className="bg-purple-800 flex justify-center items-center text-xl font-bold  rounded-3xl  w-12 h-12">
                        2
                </div>
                <div className="text-white font-bold px-6 text-xl py-3">
                    Add Expenses
                </div>
              </div>
              <div className="flex px-16 py-6">
                <div className="bg-purple-800 flex justify-center items-center text-xl font-bold  rounded-3xl  w-12 h-12">
                        3
                </div>
                <div className="text-white font-bold px-6 text-xl py-3">
                    Settle Up
                </div>
              </div>
              <div className="flex px-16 py-6">
                <div className="bg-purple-800 flex justify-center items-center text-xl font-bold  rounded-3xl  w-12 h-12">
                        4
                </div>
                <div className="text-white font-bold px-6 text-xl py-3">
                    Track And Analyze
                </div>
              </div>

            </div>
          </div>
          <div>
            <div className="py-16 flex justify-center items-center">
              <div className="text-white text-center bg-slate-900 py-8 w-96 rounded-md font-serif">
                 <div className="text-3xl ">
                 Get Started Today
                  </div>
                  <div className="py-2">
                  <div className="py-3 text-base">

                      <input type="text" placeholder="Full Name" className="bg-slate-800 w-80 p-1 rounded-md" />
                      </div>
                      <div className="py-3 text-base">

                      <input type="text" placeholder="Email Address" className="bg-slate-800 w-80 p-1 rounded-md" />
                      </div>
                      <div className="py-3 text-base">

                      <input type="text" placeholder="Password" className="bg-slate-800 w-80 p-1 rounded-md" />
                      </div>
                      <div className="py-4">
                        <button className="bg-purple-700 w-80 rounded-md p-2" onClick={()=> signIn() }>
                          Sign Up
                        </button>
                      </div>
                      <div className="">
                        <div>

                        Already have an account ? <Link href={"#"} className="underline">Log In</Link>
                        </div>



                      </div>
                  </div>

              </div>
            </div>
              <div className="py-12 bg-slate-900 ">
                <div className="">

                <div className="  text-slate-300 text-center text-white">
                  <div className="py-8  text-center">

   2025 SplitSmart.All rights reserevd
                  </div>
                  <div className="flex gap-4 pb-12 justify-center items-center text-center">
                    <div>
                      Privacy Policy
                    </div>
                    <div>
                      Terms Of Service
                    </div>
                    <div>
                      Contact Us
                    </div>
                  </div>
                </div>
                </div>
              </div>
          </div>

        </div>
      </div>
    </div>
  );
}
