import React, { useEffect, useState } from 'react'
import { BookOpen, Search, Menu, X, LogOut } from 'lucide-react'
import library_store from '../store/store'
import { useNavigate } from 'react-router'
import toast, {Toaster} from 'react-hot-toast'


export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { get_user, user_data, logout_user, delete_user, res } = library_store()
  let [search, setSearch] = useState("")
  const navigate = useNavigate()
  useEffect(() => {
    get_user()
  }, [])
  console.log(user_data)

  function refresh() {
    logout_user()
    window.location.reload();
  }
  function window_refresh(){
    window.location.reload()
  }
  async function delete_handler() {
    const toastId = toast.loading('Deleting...')
    try {
      const res = await delete_user()
      if(res.status === 200){
        toast.success(res.data.message, {id:toastId})
        setTimeout(window_refresh(), 1000)
      }
      console.log(res)
    } catch (err) {
      toast.error("Unsuccessfully Delete!", {id:toasterId})
      // console.log(err)
    }
  }
  function navigate_page(page, data) {
    navigate(`/${page}`, data ? { state: data } : { state: {} })
  }
  return (
    <>
      <nav className="sticky top-0 z-50 bg-[#FAF6EE]/95 backdrop-blur border-b border-[#C9A961]/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
 
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 shrink-0">
            <BookOpen className="w-6 h-6 text-[#6B2737]" strokeWidth={1.75} />
            <span className="font-serif text-xl tracking-wide text-[#2C2420]">
              library.com
            </span>
          </a>
 
          {/* Search (desktop / tablet) */}
          <div className="hidden md:flex items-center relative flex-1 max-w-xs">
            <Search className="w-4 h-4 text-[#9C8F7E] absolute left-3 pointer-events-none" strokeWidth={2} />
            <input
              type="text"
              placeholder="Search the catalog..."
              className="w-full pl-9 pr-3 py-1.5 text-sm rounded-full bg-white border
                         border-[#C9A961]/40 text-[#2C2420] placeholder-[#9C8F7E]
                         focus:outline-none focus:ring-1 focus:ring-[#6B2737]/50
                         focus:border-[#6B2737]/50"
              onChange={(e)=>setSearch(e.target.value)}
              onKeyDown={(e)=>{
                if(e.key === "Enter"){
                  navigate("/search", {state:{"value":search}})
                }
              }}
              
            />
          </div>
 
          {/* Auth buttons (desktop / tablet) */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {user_data?.user ? (
              <>
                <div className="hidden lg:flex flex-col items-end leading-tight mr-1">
                  <span className="text-[11px] uppercase tracking-wide text-[#9C8F7E]">
                    Welcome back
                  </span>
                  <span className="font-serif text-sm text-[#2C2420]">
                    {user_data?.user?.fullname}
                  </span>
                </div>
 
                <button
                  onClick={() => navigate_page("/update", user_data?.user)}
                  className="text-sm font-medium text-[#4A3F35] hover:text-[#6B2737]
                             border border-[#C9A961]/40 rounded-full px-4 py-1.5
                             transition-colors whitespace-nowrap"
                >
                  Update
                </button>
 
                <button
                  onClick={refresh}
                  className="flex items-center gap-1.5 text-sm font-medium text-white
                             bg-[#6B2737] hover:bg-[#571F2C] rounded-full px-4 py-1.5
                             transition-colors shadow-sm whitespace-nowrap"
                >
                  <LogOut className="w-3.5 h-3.5" strokeWidth={2} />
                  Logout
                </button>
 
                <button
                  onClick={delete_handler}
                  className="text-sm font-medium text-[#9C4B4B] hover:text-white
                             hover:bg-[#9C4B4B] border border-[#9C4B4B]/50 rounded-full
                             px-3 py-1.5 transition-colors whitespace-nowrap"
                >
                  Delete Account
                </button>
              </>
            ) : (
              <>
                <a
                  href="/login"
                  className="text-sm font-medium text-[#4A3F35] hover:text-[#6B2737]
                             transition-colors px-3 py-1.5 whitespace-nowrap"
                >
                  Log in
                </a>
                <a
                  href="/register"
                  className="text-sm font-medium text-white bg-[#6B2737] hover:bg-[#571F2C]
                             rounded-full px-4 py-1.5 transition-colors shadow-sm whitespace-nowrap"
                >
                  Register
                </a>
              </>
            )}
          </div>
 
          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-[#2C2420] p-1.5 -mr-1.5 rounded-full hover:bg-[#C9A961]/15 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
 
      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out
                    ${mobileOpen ? 'max-h-[28rem]' : 'max-h-0'}`}
      >
        <div className="border-t border-[#C9A961]/40 bg-[#FAF6EE] px-4 pb-4 pt-3 space-y-3">
 
          {/* Search (mobile) */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#9C8F7E] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search the catalog..."
              className="w-full pl-9 pr-3 py-2 text-sm rounded-full bg-white border
                         border-[#C9A961]/40 text-[#2C2420] placeholder-[#9C8F7E]
                         focus:outline-none focus:ring-1 focus:ring-[#6B2737]/50"
            />
          </div>
 
          {user_data?.user ? (
            <div className="flex flex-col gap-2 pt-1">
              <div className="flex flex-col leading-tight pb-2 border-b border-[#C9A961]/30">
                <span className="text-[11px] uppercase tracking-wide text-[#9C8F7E]">
                  Welcome back
                </span>
                <span className="font-serif text-base text-[#2C2420]">
                  {user_data?.user?.fullname}
                </span>
              </div>
 
              <button
                onClick={() => navigate_page("/update", user_data?.user)}
                className="w-full text-sm font-medium text-[#4A3F35] hover:text-[#6B2737]
                           border border-[#C9A961]/40 rounded-full px-4 py-2
                           transition-colors"
              >
                Update
              </button>
 
              <button
                onClick={refresh}
                className="w-full flex items-center justify-center gap-1.5 text-sm font-medium text-white
                           bg-[#6B2737] hover:bg-[#571F2C] rounded-full px-4 py-2
                           transition-colors shadow-sm"
              >
                <LogOut className="w-3.5 h-3.5" strokeWidth={2} />
                Logout
              </button>
 
              <button
                onClick={delete_handler}
                className="w-full text-sm font-medium text-[#9C4B4B] hover:text-white
                           hover:bg-[#9C4B4B] border border-[#9C4B4B]/50 rounded-full
                           px-3 py-2 transition-colors"
              >
                Delete Account
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 pt-1">
              <a
                href="/login"
                className="flex-1 text-center text-sm font-medium text-[#4A3F35] border
                           border-[#C9A961]/40 rounded-full px-4 py-2"
              >
                Log in
              </a>
              <a
                href="/register"
                className="flex-1 text-center text-sm font-medium text-white bg-[#6B2737]
                           hover:bg-[#571F2C] rounded-full px-4 py-2 transition-colors"
              >
                Register
              </a>
            </div>
          )}
        </div>
      </div>
      <div>
      </div>
    </nav>
    </>
  )
}
