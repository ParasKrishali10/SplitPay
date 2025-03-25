export const LinkCard=()=>{
    return <div>
        <div className="flex">
            <div className="flex rounded-md bg-purple-600 w-44 h-20 lg:w-52">
                <div className="text-2xl mt-6 ml-6">
                    +
                </div>
                <div className="text-center  mt-7 ml-3 cursor-pointer">
                    Split new Bills
                </div>
            </div>
            <div className="flex rounded-md bg-green-600 w-44 h-20 ml-4 lg:w-52">
                <div className="text-2xl mt-6 ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 mt-1.5">
  <path d="M7 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM14.5 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM1.615 16.428a1.224 1.224 0 0 1-.569-1.175 6.002 6.002 0 0 1 11.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 0 1 7 18a9.953 9.953 0 0 1-5.385-1.572ZM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 0 0-1.588-3.755 4.502 4.502 0 0 1 5.874 2.636.818.818 0 0 1-.36.98A7.465 7.465 0 0 1 14.5 16Z" />
</svg>

                </div>
                <div className="text-center  mt-7  ml-2 cursor-pointer">
                    Create new Group
                </div>
            </div>
            <div className="flex rounded-md bg-sky-600 w-44 h-20 ml-4 lg:w-52">
                <div className="text-2xl mt-6 ml-8">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 mt-1.5">
  <path fill-rule="evenodd" d="M13.2 2.24a.75.75 0 0 0 .04 1.06l2.1 1.95H6.75a.75.75 0 0 0 0 1.5h8.59l-2.1 1.95a.75.75 0 1 0 1.02 1.1l3.5-3.25a.75.75 0 0 0 0-1.1l-3.5-3.25a.75.75 0 0 0-1.06.04Zm-6.4 8a.75.75 0 0 0-1.06-.04l-3.5 3.25a.75.75 0 0 0 0 1.1l3.5 3.25a.75.75 0 1 0 1.02-1.1l-2.1-1.95h8.59a.75.75 0 0 0 0-1.5H4.66l2.1-1.95a.75.75 0 0 0 .04-1.06Z" clip-rule="evenodd" />
</svg>

                </div>
                <div className="text-center  mt-7 ml-2 cursor-pointer">
                    Settle Up
                </div>
            </div>
        </div>
    </div>
}