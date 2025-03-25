import React from "react"

interface CardProps{
  title:string,
  description:string
}
export const  Card:React.FC<CardProps>=({title,description})=>{
    return <div>
        <div className="py-3 flex justify-center items-center">
              <div className="text-white font-bold lg:text-xl md: text-2xl">
                  {title}
              </div>

            </div>
            <div className="">
              <div className="text-slate-500 py-4 font-sans lg : text-20px md: text-lg text-center">
              <div>
              {description}
              </div>
              </div>

            </div>
    </div>
}
