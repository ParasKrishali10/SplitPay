export const Recent=()=>{
    return <div>
        <div className="cursor-pointer rounded-md p-5 bg-gray-900">
            <div className="text-2xl font-bold">
            Recent Activity
            </div>
            <div className="flex mt-4 justify-between ">
                <div className="flex">

                <div className="rounded-full text-2xl text-center bg-blue-600 w-10 h-10">
                ÷
                </div>
                <div className="ml-3 mt-1 text-xl font-bold">
                        Dinner with friends
                </div>
                </div>
                <div className="text-xl text-blue-600">
                ₹ 900
                </div>
            </div>
            <div className="flex mt-6 justify-between ">
                <div className="flex">

                <div className="rounded-full text-2xl text-center bg-red-600 w-10 h-10">
                -
                </div>
                <div className="ml-3 mt-1 text-xl font-bold">
                        Groceries
                </div>
                </div>
                <div className="text-xl text-red-600">
                ₹ 300
                </div>
            </div>
            <div className="flex mt-6 justify-between ">
                <div className="flex">

                <div className="rounded-full text-2xl text-center bg-green-600 w-10 h-10">
                +
                </div>
                <div className="ml-3 mt-1 text-xl font-bold">
                       Movie night
                </div>
                </div>
                <div className="text-xl text-green-600">
                ₹ 600
                </div>
            </div>

            <div className="flex mt-6 justify-between ">
                <div className="flex">

                <div className="rounded-full text-2xl text-center bg-blue-900 w-10 h-10">
                ÷
                </div>
                <div className="ml-3 mt-1 text-xl font-bold">
                        Club
                </div>
                </div>
                <div className="text-xl text-sky-600">
                ₹ 2900
                </div>
            </div>
            {/* <div className="text-2xl font-bold">
            Recent Activity
            </div> */}
        </div>

    </div>
}