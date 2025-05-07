"use client"
import { useState } from "react"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface FileUploadProps{
    onUploadComplete?:(url:string)=>void
}
export default function FileUpload({onUploadComplete}:FileUploadProps){
    const [image,setImage]=useState('')
    const handleUpload=async (event:React.ChangeEvent<HTMLInputElement>)=>{
        const file=event.target.files?.[0]
        if(!file)
        {
            return
        }
         toast.info("Uploading your snap, please wait...", { autoClose: 8000 })
        const reader=new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend=async()=>{
            const base64=reader.result
            const res=await fetch('/api/upload',{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({file:base64})
            })
            if (res.status === 413) {
                toast.error("Snap Size Exceeds 1MB")
                return
            }
            const data=await res.json()
            setImage(data.url)

            if(onUploadComplete)
            {
                onUploadComplete(data.url)
            }


        }
    }
    return (
        <div>
             <ToastContainer></ToastContainer>
          <input type="file" onChange={handleUpload} />
          {image && <img src={image} alt="Uploaded" className="mt-4 w-64"></img>}
        </div>
    )
}