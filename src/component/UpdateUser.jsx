import { useState } from 'react'
import { useLocation } from 'react-router'
import library_store from '../store/store'

export default function UpdateUser() {
    const [form, setForm] = useState({})
    const location = useLocation()
    const {update_user} = library_store()
    const data = location.state
    // console.log(data)

    function set_data(e){
        const value = e.target.value
        const name = e.target.name
        setForm((prev)=>({
            ...prev,
            [name]:value
        }))
    }
    async function handel_submit(){
        try{
            const res = await update_user(form)
            console.log(res)
        }catch(err){
            console.log(err)
        }
    }
    return (
        <>
            {/* <div>
                <form>
                    <label>Full Name</label>
                    <input type="text" defaultValue={data.fullname} name='fullname'/>
                    <label>Email</label>
                    <input type='text' defaultValue={data.email} name='email'/>
                    <label>Address</label>
                    <input type="text" defaultValue={data.address} name='address'/>
                    <label>phone</label>
                    <input type="text" defaultValue={data.phone} name='phone'/>
                    <button>submit</button>
                </form>
            </div> */}
            <div className="min-h-screen flex items-center justify-center bg-[#FAF6EE] px-4 py-12">
                <div className="w-full max-w-md bg-white border border-[#C9A961]/40 rounded-2xl shadow-sm p-8">
                    <p className="text-[11px] uppercase tracking-wide text-[#9C8F7E] mb-1">
                        Library Account
                    </p>
                    <h1 className="font-serif text-2xl text-[#2C2420] mb-6">
                        Update Details
                    </h1>

                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[#4A3F35] mb-1">Full Name</label>
                            <input
                                type="text"
                                defaultValue={data.fullname}
                                name='fullname'
                                className="w-full px-3 py-2 text-sm rounded-lg bg-[#FAF6EE] border
                                           border-[#C9A961]/40 text-[#2C2420]
                                           focus:outline-none focus:ring-1 focus:ring-[#6B2737]/50
                                           focus:border-[#6B2737]/50"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#4A3F35] mb-1">Email</label>
                            <input
                                type='text'
                                defaultValue={data.email}
                                name='email'
                                className="w-full px-3 py-2 text-sm rounded-lg bg-[#FAF6EE] border
                                           border-[#C9A961]/40 text-[#2C2420]
                                           focus:outline-none focus:ring-1 focus:ring-[#6B2737]/50
                                           focus:border-[#6B2737]/50"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#4A3F35] mb-1">Address</label>
                            <input
                                type="text"
                                defaultValue={data.address}
                                name='address'
                                className="w-full px-3 py-2 text-sm rounded-lg bg-[#FAF6EE] border
                                           border-[#C9A961]/40 text-[#2C2420]
                                           focus:outline-none focus:ring-1 focus:ring-[#6B2737]/50
                                           focus:border-[#6B2737]/50"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#4A3F35] mb-1">Phone</label>
                            <input
                                type="text"
                                defaultValue={data.phone}
                                name='phone'
                                className="w-full px-3 py-2 text-sm rounded-lg bg-[#FAF6EE] border
                                           border-[#C9A961]/40 text-[#2C2420]
                                           focus:outline-none focus:ring-1 focus:ring-[#6B2737]/50
                                           focus:border-[#6B2737]/50"
                            />
                        </div>

                        <button
                            className="w-full mt-2 text-sm font-medium text-white bg-[#6B2737]
                                       hover:bg-[#571F2C] rounded-full px-4 py-2.5 transition-colors shadow-sm"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}
