import React, {useState} from 'react'
import library_store from '../store/store'
import { Eye, EyeOff, ArrowBigLeft, Check} from 'lucide-react'
import { data } from 'react-router'
import { useNavigate} from 'react-router'
import toast, {Toaster} from 'react-hot-toast'

export default function Login() {
  const { login, res} = library_store()
  let  [form, setForm] = useState({email:"", password:""})
  const [showpass, setShowpass] = useState(false)
  const navigate = useNavigate()
  function data_set(e){
    const value = e.target.value
    const name = e.target.name
    setForm((prev)=>({
      ...prev,
      [name] : value
    }))
  }

  function showpass_fun(){
    if(showpass){
      setShowpass(false)    
    }
    else{
      setShowpass(true)
    }
  }
  async function login_handdler(){
    try{
      const res = await login(form)
      // console.log(res)
      if(res.status == 200){
      toast.success(res.data.message, 
        {duration:3000}
      )
      setTimeout(()=>navigate('/'), 1000)
        
      }else{
        toast.error(res.data.message)
      }
      
    }catch(err){
      console.log(err)
      toast.error('Login Unsuccessfully!')
    }
    
  }

  return (
    <>
    {/* <form onSubmit={(e)=>{e.preventDefault(); login_handdler();}}>
      <label>Email</label>
      <input type="text" name='email' onChange={data_set}/>
      <label >Passowrd</label>
      <input type={showpass?'text':'password'} name='password' onChange={data_set}/>
      <button type='button' onClick={showpass_fun}>{showpass?<Eye/>:<EyeOff/>}</button>

      <button type='submit'>Login</button>
    </form>
    <button onClick={()=>navigate('/forget_password')}>Forget Password</button>
    <button onClick={()=>navigate("/register")}>if you are not register click here </button>
    <button onClick={()=>navigate(-1)}> <ArrowBigLeft/> GO Back</button> */}

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-slate-800 text-center mb-1">Welcome Back</h1>
        <p className="text-sm text-slate-500 text-center mb-6">Login to your account</p>

        <form onSubmit={(e)=>{e.preventDefault(); login_handdler();}} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Email</label>
            <input
              type="text"
              name='email'
              onChange={data_set}
              className="border border-slate-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Passowrd</label>
            <div className="relative">
              <input
                type={showpass?'text':'password'}
                name='password'
                onChange={data_set}
                className="border border-slate-300 rounded-lg px-3 py-2 pr-10 w-full outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent transition"
              />
              <button
                type='button'
                onClick={showpass_fun}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800 transition"
              >
                {showpass?<Eye size={18}/>:<EyeOff size={18}/>}
              </button>
            </div>
          </div>
          <div>
            
          </div>
          <button
            type='submit'
            className="mt-2 bg-slate-800 hover:bg-slate-900 text-white font-medium py-2 rounded-lg transition"
          >
            Login
          </button>
        </form>

        <div className="flex flex-col items-center gap-2 mt-5">
          <button
            onClick={()=>navigate('/forget_password')}
            className="text-sm text-slate-600 hover:text-slate-900 hover:underline transition"
          >
            Forget Password
          </button>
          <button
            onClick={()=>navigate("/register")}
            className="text-sm text-slate-600 hover:text-slate-900 hover:underline transition"
          >
            if you are not register click here
          </button>
          <button
            onClick={()=>navigate(-1)}
            className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 mt-2 transition"
          >
            <ArrowBigLeft size={16}/> GO Back
          </button>
        </div>
      </div>
    </div>
  </>  
  )
}
