import React, {useState} from 'react'
import library_store from '../store/store'
import { Library } from 'lucide-react'
import { useNavigate } from 'react-router'

export default function SendEmail() {
    const {send_mail} = library_store()
    const [email, setEmail] = useState("")
    const navigate = useNavigate()

    function set_data(e){
        let value = e.target.value
        setEmail(value)
    }
    async function email_sumbit(e){
        e.preventDefault()
        try{
            const res = await send_mail(email)
            if(res.status == 200){
                localStorage.setItem("email", email)
                navigate("/forget_pass")
            }else{
                console.log("Mail Dont Sent!")
            }
            // console.log(res)
        }catch(err){
            console.log(err)
        }
    }
  return (
    <>
        {/* <div>
            <form onSubmit={email_sumbit}>
                <label>email</label>
                <input type="text" name='email' onChange={set_data}/>
                <p>Enter only Registed Email</p>
                <button type='submit'>sumbmit</button>
            </form>
        </div> */}
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700 px-4">
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-slate-800 text-center mb-6">Verify Email</h1>

        <form onSubmit={email_sumbit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-700">Email</label>
                <input
                    type="text"
                    name='email'
                    onChange={set_data}
                    className="border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent transition"
                />
            </div>

            <p className="text-xs text-slate-500 text-center">Enter only Registed Email</p>

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
