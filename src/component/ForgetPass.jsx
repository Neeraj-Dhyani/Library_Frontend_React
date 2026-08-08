import React, { useEffect, useState } from 'react'
import library_store from '../store/store'
import { Eye, EyeClosed } from 'lucide-react'
import { redirect, useNavigate} from 'react-router'
import toast from 'react-hot-toast'

export default function ForgetPass() {
    const {forget_pass} = library_store()
    const navigate = useNavigate()
    const [form, setForm] = useState({
        otp:"",
        password:""
    })
    const [showpass, setShowpass] = useState(false)
    const email = localStorage.getItem("email")
   useEffect(()=>{
    console.log(email)
    if(!email){
        navigate("/sending_mail")
    }
   }, [navigate])

    function set_data(e){
        const value = e.target.value
        const name = e.target.name
        setForm((prev)=>({
        ...prev,
        [name] : value
        }))
    }

    async function submit_handler(e){
        const toastId = toast.loading("Loading...")
        e.preventDefault()
        try{
            const res = await forget_pass(form, email)
           
            if (res.status == 200) {
                toast.success(res.data.message, {id:toastId})
                localStorage.removeItem("email")
                navigate("/login")
            } else {
                toast.error(res.data.message, {id:toastId})
            }
                
            // console.log(res)
        }catch(err){
            toast.error(err.response.data.message, {id:toastId})
        }
    }

    function showpass_fun(){
        if(showpass){
            setShowpass(false)    
        }
        else{
            setShowpass(true)
        }
    }

  return (
    <>
        {/* <div>
            <p>Check Your Email We Sent You OTP Code</p>
            <form onSubmit={submit_handler}>
                <label>Code</label>
                <input type="text" name='otp'/>
                <label>New Password</label>
                <input type={showpass?'text':'password'} name='password' onChange={data_set}/>
                <button type='button' onClick={showpass_fun}>{showpass?<Eye/>:<EyeClosed/>}</button>
                <button type='submit'>sumbmit</button>
            </form>
        </div> */}
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700 px-4">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8">
                <h1 className="text-2xl font-bold text-slate-800 text-center mb-1">Forgot Password</h1>
                <p className="text-sm text-slate-500 text-center mb-6">Check Your Email We Sent You OTP Code</p>

                <form onSubmit={submit_handler} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-slate-700">Code</label>
                        <input
                            type="text"
                            name='otp'
                            className="border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent transition"
                            onClick={set_data}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-slate-700">New Password</label>
                        <div className="relative">
                            <input
                                type={showpass?'text':'password'}
                                name='password'
                                onChange={set_data}
                                className="border border-slate-300 rounded-lg px-3 py-2 pr-10 w-full outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent transition"
                            />
                            <button
                                type='button'
                                onClick={showpass_fun}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800 transition"
                            >
                                {showpass?<Eye size={18}/>:<EyeClosed size={18}/>}
                            </button>
                        </div>
                    </div>

                    <button
                        type='submit'
                        className="mt-2 bg-slate-800 hover:bg-slate-900 text-white font-medium py-2 rounded-lg transition"
                    >
                        sumbmit
                    </button>
                </form>
            </div>
        </div>
    </>
  )
}
