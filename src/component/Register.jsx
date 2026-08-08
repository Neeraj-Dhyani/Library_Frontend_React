import React, { useState } from 'react'
import library_store from '../store/store'
import { Eye, EyeOff } from 'lucide-react'
import { useNavigate } from 'react-router'
import toast, { Toaster } from 'react-hot-toast'



export default function Register() {
    const { register } = library_store()
    const [showpass, setShowpass] = useState(false)
    const [resdata, setResdata] = useState("")
    const navigate = useNavigate()
    let [form, setfrom] = useState({ fullname: "", email: "", password: "", phone: "", address: "" })

    function set_data(e) {
        // console.log(e)
        let name = e.target.name
        let value = e.target.value

        setfrom((prev) => ({
            ...prev,
            [name]: value
        }))
        // console.log(value)
    }

    function showpass_fun() {
        if (showpass) {
            setShowpass(false)
        } else {
            setShowpass(true)
        }
    }

    async function send_data(e) {
        const toastId = toast.loading('Registering...')
        e.preventDefault()
        try {
            const res = await register(form)
            // console.log(res)
            if (res.status == 200) {
                toast.success(res.data.message, {id:toastId})
            } else {
                toast.error(res.data.message, {id:toastId})
            }
        }
        catch (err){
            toast.error("Unsuccessfully Registed", {id:toasterId})
        }
    }


    // console.log(resdata)
    return (
        <>
            <div className="min-h-screen bg-[#FAF6EE] flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    <h1 className="font-serif text-2xl text-[#2C2420] text-center mb-6">Create your account</h1>

                    <form onSubmit={send_data} className="bg-white border border-[#C9A961]/30 rounded-xl shadow-sm p-6 sm:p-8 space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-[#2C2420] mb-1.5">Full Name</label>
                            <input
                                type="text"
                                name='fullname'
                                onChange={set_data}
                                className="w-full px-3 py-2.5 text-sm rounded-lg bg-[#FAF6EE] border border-[#C9A961]/40
                                       text-[#2C2420] focus:outline-none focus:ring-1 focus:ring-[#6B2737]/50 focus:border-[#6B2737]/50"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#2C2420] mb-1.5">Email</label>
                            <input
                                type="email"
                                name='email'
                                onChange={set_data}
                                className="w-full px-3 py-2.5 text-sm rounded-lg bg-[#FAF6EE] border border-[#C9A961]/40
                                       text-[#2C2420] focus:outline-none focus:ring-1 focus:ring-[#6B2737]/50 focus:border-[#6B2737]/50"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#2C2420] mb-1.5">Password</label>
                            <div className="relative">
                                <input
                                    type={showpass ? "text" : "password"}
                                    name='password'
                                    onChange={set_data}
                                    className="w-full px-3 py-2.5 pr-10 text-sm rounded-lg bg-[#FAF6EE] border border-[#C9A961]/40
                                           text-[#2C2420] focus:outline-none focus:ring-1 focus:ring-[#6B2737]/50 focus:border-[#6B2737]/50"
                                />
                                <button
                                    type='button'
                                    onClick={() => showpass_fun()}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9C8F7E] hover:text-[#6B2737]"
                                >
                                    {showpass ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#2C2420] mb-1.5">Phone</label>
                            <input
                                type="text"
                                name='phone'
                                onChange={set_data}
                                className="w-full px-3 py-2.5 text-sm rounded-lg bg-[#FAF6EE] border border-[#C9A961]/40
                                       text-[#2C2420] focus:outline-none focus:ring-1 focus:ring-[#6B2737]/50 focus:border-[#6B2737]/50"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#2C2420] mb-1.5">Address</label>
                            <input
                                type="text"
                                name='address'
                                onChange={set_data}
                                className="w-full px-3 py-2.5 text-sm rounded-lg bg-[#FAF6EE] border border-[#C9A961]/40
                                       text-[#2C2420] focus:outline-none focus:ring-1 focus:ring-[#6B2737]/50 focus:border-[#6B2737]/50"
                            />
                        </div>

                        <div>
                           
                        </div>
                        <button
                            type='submit'
                            className="w-full bg-[#6B2737] hover:bg-[#571F2C] text-white text-sm font-medium
                                   rounded-full py-2.5 transition-colors shadow-sm"
                        >
                            register
                        </button>
                    </form>
                    <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="text-sm text-slate-600 hover:text-slate-900 hover:underline transition"
                    >
                    If You Are Already Registered Click Here To Log In
                </button>
                </div>
            </div>
        </>

    )
}
