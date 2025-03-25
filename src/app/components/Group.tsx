export const Group=()=>{

    return <div className="hidden lg:block">
        <div className="cursor-pointer rounded-md bg-gray-900 mt-8 ml-5  lg:w-60 xl:w-96 h-auto">
            <div className="p-7">
                <div className="text-3xl">
                    Group Overview
                </div>
                <div className="flex justify-between mt-5">
                <div className="text-xl">
                    Roomates
                </div>
                <div className="text-lg  ">
                ₹3000
                </div>
                </div>
                <div className="flex justify-between mt-3">
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
                </div>
                <div className="flex justify-between  mt-3">
                <div className="text-xl">
                    Trip To Goa
                </div>
                <div className="  text-lg">
                ₹10000
                </div>
                </div>
                <div className="flex justify-between mt-3">
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
                </div>
            </div>
        </div>
    </div>
}