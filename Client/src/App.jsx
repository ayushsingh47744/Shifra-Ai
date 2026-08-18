// import React, { useEffect, useState } from 'react'
// import { Navigate, Route, Routes } from 'react-router-dom'
// import Home from './pages/Home'
// import Login from './pages/Login'
// import axios from 'axios'
// import ProtectedRoute from './Components/ProtectedRoute'
// import Navbar from './Components/Navbar'
// import Builder from './pages/Builder'
// import Billing from './pages/Billing'
// import History from './pages/History'
// import ConversationDetail from './pages/ConversationDetail'
// import { Toaster } from "react-hot-toast"
// import ThemeToggle from './Components/ThemeToggle'
// export const ServerUrl = "https://shifra-ai-wcib.onrender.com"
// export const CLIENT_URL = "https://shifra-ai-1-xral.onrender.com"

// function App() {
//   const [user, setUser] = useState(null)
//   const [loading, setLoading] = useState(true)


//   useEffect(() => {

//     const fetchMe = async () => {
//       try {
//         const res = await axios.get(ServerUrl + "/api/user/current-user", { withCredentials: true })
//         setUser(res.data)
//         setLoading(false)
//       } catch (error) {
//         console.log(error)
//         setLoading(false)
//       }
//     }
//     fetchMe()

//   }, [])


//   return (
//     <>

//     <Toaster position='top-right'/>
//     <ThemeToggle />
//       <Routes>

//         <Route path='/login' element={<Login setUser={setUser}/>} />

//         <Route path='/*' element={<ProtectedRoute user={user} loading={loading}>
//           <Navbar setUser={setUser} user={user}/>
//           <Routes>
//             <Route path='/' element={<Home user={user}/>} />
//             <Route path='/builder' element={<Builder user={user} setUser={setUser}/>}/>
//             <Route path='/billing' element={<Billing user={user} setUser={setUser}/>}/>
//             <Route path='/history' element={<History user={user}/>}/>
//             <Route path='/history/:id' element={<ConversationDetail user={user}/>}/>

//             <Route path='*' element={<Navigate to="/" replace/>}/>
//           </Routes>


//         </ProtectedRoute>} />

//       </Routes>

//     </>
//   )
// }

// export default App

import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import axios from 'axios'
import ProtectedRoute from './Components/ProtectedRoute'
import Navbar from './Components/Navbar'
import Builder from './pages/Builder'
import Billing from './pages/Billing'
import History from './pages/History'
import ConversationDetail from './pages/ConversationDetail'
import { Toaster } from "react-hot-toast"
import ThemeToggle from './Components/ThemeToggle'
export const ServerUrl = "https://shifra-ai-wcib.onrender.com"
export const CLIENT_URL = "https://shifra-ai-1-xral.onrender.com"

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await axios.get(ServerUrl + "/api/user/current-user", { withCredentials: true })
        setUser(res.data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }

    if (location.pathname !== "/login") {
      fetchMe()
    } else {
      setLoading(false)
    }
  }, [location.pathname])

  useEffect(() => {
    if (!user?._id) return

    const script = document.createElement("script")
    script.src = "https://shifra-ai-1-xral.onrender.com/assistant.js?v=" + Date.now()
    script.dataset.userId = user._id
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
      document.querySelectorAll(".shifra-popup, .shifra-btn").forEach(el => el.remove())
    }
  }, [user?._id])

  return (
    <>
      <Toaster position='top-right'/>
      <ThemeToggle />
      <Routes>
        <Route path='/login' element={<Login setUser={setUser}/>} />
        <Route path='/*' element={<ProtectedRoute user={user} loading={loading}>
          <Navbar setUser={setUser} user={user}/>
          <Routes>
            <Route path='/' element={<Home user={user}/>} />
            <Route path='/builder' element={<Builder user={user} setUser={setUser}/>}/>
            <Route path='/billing' element={<Billing user={user} setUser={setUser}/>}/>
            <Route path='/history' element={<History user={user}/>}/>
            <Route path='/history/:id' element={<ConversationDetail user={user}/>}/>
            <Route path='*' element={<Navigate to="/" replace/>}/>
          </Routes>
        </ProtectedRoute>} />
      </Routes>
    </>
  )
}

export default App
export default App
}

export default App
