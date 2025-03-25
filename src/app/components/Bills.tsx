export const Bills=()=>{
    return <div className="hidden lg:block">
         <div className="rounded-md cursor-pointer bg-gray-900 mt-10  ml-5 lg:w-60 xl:w-96  h-auto">
            <div className="p-7">
                <div className="text-3xl">
                    Upcoming Bills
                </div>
                <div className="flex justify-between mt-3">
                <div className="text-xl  ">
                    Rent

                </div>
                <div className=" text-lg">
                ₹100000
                </div>
                </div>
                <div className="flex  mt-1">
                <div className="text-lg text-slate-600">
                    Due: 7 feb
                </div>

                </div>
                <div className="flex justify-between mt-3">
                <div className="text-xl  ">
                    Electricity

                </div>
                <div className=" text-lg">
                ₹100000
                </div>
                </div>
                <div className="flex  mt-1">
                <div className="text-lg text-slate-600">
                    Due: 10 feb
                </div>

                </div>


            </div>
        </div>
    </div>
}