import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import logo from "../assets/logo.png"
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import axios from 'axios';
import { ServerUrl } from '../App';
import toast from 'react-hot-toast';

function Navbar({user , setUser}) {
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen,setMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await axios.get(ServerUrl + "/api/auth/logout" , {withCredentials:true})
      setUser(null)
      toast.success("Logout Successfully")
      navigate("/login")
    } catch (error) {
      toast.error("logout failed")
      console.log(error)
    }
  }

  const navBtnClass = (path) =>
    `px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
      location.pathname === path
        ? "bg-gradient-to-r from-purple-500 to-emerald-500 text-white shadow-md hover:scale-[1.02]"
        : "border border-orange-100 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:border-purple-300"
    }`

  const mobileNavBtnClass = (path) =>
    `w-full py-2.5 rounded-xl text-sm font-medium ${
      location.pathname === path
        ? "bg-gradient-to-r from-purple-500 to-emerald-500 text-white"
        : "border border-orange-100 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
    }`

  return (
    <div className='sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-[#0f1729]/95 border-b border-orange-100 dark:border-purple-500/10'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between'>

        <div onClick={()=>navigate("/")} className='flex items-center gap-2.5'>
          <img src={logo} alt="logo" className='h-9 w-auto object-contain' />

          <h1 className='font-bold text-xl text-gray-700 dark:text-gray-100 leading-none'>Shifra{" "}<span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-emerald-500'>AI</span></h1>

        </div>


        {user && (<div className='hidden md:flex items-center gap-3'>

          <button onClick={()=>navigate("/builder")} className={navBtnClass("/builder")}>Builder</button>

          <button onClick={()=>navigate("/billing")} className={navBtnClass("/billing")}>Billing</button>

          <button onClick={()=>navigate("/history")} className={navBtnClass("/history")}>History</button>

          <div className='flex items-center gap-3 px-4 py-2 rounded-2xl bg-white dark:bg-gray-800 border border-orange-100 dark:border-gray-700 shadow-sm'>

            <div className='w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-emerald-500 flex items-center justify-center flex-shrink-0'>
              <span className='text-white text-sm font-bold'>
                {user?.name.charAt(0).toUpperCase()}
              </span>
            </div>

            <div className='max-w-[140px]'>
              <p className='text-sm font-semibold text-gray-800 dark:text-gray-100 truncate'>{user.name}</p>

              <p className='text-xs text-gray-400 dark:text-gray-500 truncate'>{user.email}</p>

             
            </div>
             <button onClick={handleLogout} className='ml-1 text-gray-400 hover:text-red-500 transition-colors cursor-pointer'><FiLogOut size={18}/></button>


          </div>
          
          </div>)}


          {user && (
            <button onClick={()=>setMenuOpen(!menuOpen)} className='md:hidden text-gray-600 dark:text-gray-300 hover:text-purple-500 transition-colors'>

              {menuOpen ? <FiX size={22}/> : <FiMenu size={22}/>}


            </button>
          )}


      </div>


      {menuOpen && (
        <div className='md:hidden px-4 pb-4'>

          <div className='bg-white dark:bg-gray-800 rounded-2xl border border-orange-100 dark:border-gray-700 shadow-lg p-4'>
            <div className='flex items-center gap-3 pb-4 border-b border-orange-100 dark:border-gray-700'>
              <div className='w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-emerald-500 flex items-center justify-center flex-shrink-0'>
              <span className='text-white text-sm font-bold'>
                {user?.name.charAt(0).toUpperCase()}
              </span>
            </div>

            <div className='flex-1 overflow-hidden'>
              <p className='text-sm font-semibold text-gray-800 dark:text-gray-100 truncate'>{user.name}</p>

              <p className='text-xs text-gray-400 dark:text-gray-500 truncate'>{user.email}</p>  
            </div>
            </div>

            <div className='flex flex-col gap-3 mt-4'>
              <button className={mobileNavBtnClass("/builder")} onClick={()=>{navigate("/builder");setMenuOpen(false)}}>Builder</button>
              <button className={mobileNavBtnClass("/billing")} onClick={()=>{navigate("/billing");setMenuOpen(false)}}>Billing</button>
              <button className={mobileNavBtnClass("/history")} onClick={()=>{navigate("/history");setMenuOpen(false)}}>History</button>
            </div>

            <button onClick={()=>{setMenuOpen(false);handleLogout()}} className='mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-50 dark:bg-red-950 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 transition-colors text-sm font-medium'><FiLogOut size={16}/> LogOut</button>
          </div>
          </div>
      )}
      
    </div>
  )
}

export default Navbar
