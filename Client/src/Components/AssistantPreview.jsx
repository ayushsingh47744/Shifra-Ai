import React, { useState } from 'react'
import { CiMicrophoneOn } from "react-icons/ci";
const themes = {
  dark: {
    bg: "bg-[#050816]",

    overlay:
      "bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.18),transparent_45%)]",

    orb:
      "from-cyan-400 via-purple-500 to-pink-500",

    cardBorder:
      "border border-white/10",

    text:
      "text-white",

    sub:
      "text-white/65",

    listening:
      "text-emerald-400",

    wave:
      "bg-emerald-400",

    button:
      "from-purple-500 to-violet-400",

    micGlow:
      "shadow-[0_0_60px_rgba(168,85,247,0.45)]",
  },

  light: {
    bg:
      "bg-gradient-to-br from-white via-[#f8fafc] to-[#eef6ff]",

    overlay:
      "bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.14),transparent_45%)]",

    orb:
      "from-blue-300 via-cyan-300 to-pink-300",

    cardBorder:
      "border border-[#dbeafe]",

    text:
      "text-[#081028]",

    sub:
      "text-[#475569]",

    listening:
      "text-blue-500",

    wave:
      "bg-blue-500",

    button:
      "from-blue-400 to-cyan-400",

    micGlow:
      "shadow-[0_0_70px_rgba(59,130,246,0.35)]",
  },

  glass: {
    bg:
      "bg-black/20 backdrop-blur-[45px]",

    overlay:
      "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_45%)]",

    orb:
      "from-cyan-200 via-violet-300 to-fuchsia-300",

    cardBorder:
      "border border-white/10",

    text:
      "text-white",

    sub:
      "text-white/70",

    listening:
      "text-cyan-200",

    wave:
      "bg-cyan-200",

    button:
      "from-cyan-400 to-violet-500",

    micGlow:
      "shadow-[0_0_70px_rgba(34,211,238,0.35)]",
  },

  neon: {
    bg:
      "bg-[#03120d]",

    overlay:
      "bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.18),transparent_45%)]",

    orb:
      "from-emerald-300 via-green-400 to-cyan-400",

    cardBorder:
      "border border-emerald-400/20",

    text:
      "text-emerald-50",

    sub:
      "text-emerald-100/70",

    listening:
      "text-emerald-300",

    wave:
      "bg-emerald-300",

    button:
      "from-emerald-400 to-green-500",

    micGlow:
      "shadow-[0_0_70px_rgba(16,185,129,0.45)]",
  },
}

function AssistantPreview() {

    const [theme,setTheme]= useState("dark")
    const current = themes[theme]
  return (
    <div className='flex items-center justify-center px-3 sm:px-4 py-10 sm:py-14'>

        <div className={`relative w-[280px] h-[450px] sm:w-[330px] sm:h-[500px] md:w-[380px] md:h-[550px] rounded-[32px] sm:rounded-[42px] overflow-hidden transition-all duration-500 ${current.bg} ${current.cardBorder} shadow-[0_20px_80px_rgba(0,0,0,0.28)]`}>
            <div className={`absolute inset-0 ${current.overlay}`}/>

          <div className='absolute top-4 right-4 sm:top-5 sm:right-5 z-30 flex items-center gap-2'>

            <button onClick={()=>setTheme("dark")} className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#050816] border transition-all cursor-pointer ${
              theme === "dark"
                ? "border-purple-400 scale-110"
                : "border-white/20"
            }`}/>

            <button
            onClick={() => setTheme("light")}
            className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white border transition-all cursor-pointer ${
              theme === "light"
                ? "border-blue-400 scale-110"
                : "border-gray-300"
            }`}
          />

          <button
            onClick={() => setTheme("glass")}
            className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-white/80 to-white/20 border transition-all cursor-pointer ${
              theme === "glass"
                ? "border-white scale-110"
                : "border-white/20"
            }`}
          />

          <button
            onClick={() => setTheme("neon")}
            className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 border transition-all cursor-pointer ${
              theme === "neon"
                ? "border-emerald-300 scale-110"
                : "border-transparent"
            }`}
          />

          </div>

          <div className='relative z-20 flex flex-col items-center justify-between h-full px-5 py-6 sm:px-7 sm:py-8'>

           <div className='relative mt-1'>
            <div className={`absolute inset-0 scale-[2] rounded-full blur-[80px] bg-gradient-to-r ${current.orb} opacity-60`}/>

            <div className={`relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br ${current.orb} shadow-[0_0_120px_rgba(255,255,255,0.15)] animate-pulse before:absolute before:inset-0 before:rounded-full before:bg-white/20 before:blur-xl`}/>
           </div>


           <div className='text-center'>

            <h2 className={`text-[20px] sm:text-[26px] md:text-[32px] font-semibold ${current.text}`}>
              Hello! I'm Shifra AI
            </h2>

            <p className={`mt-4 text-[13px] sm:text-[15px] md:text-[16px] leading-6 sm:leading-7 max-w-[280px] mx-auto ${current.sub}`}>
                Your smart voice assistant.
              <br />
              Ask anything about your website.
            </p>


            <div className='mt-6 sm:mt-8'>
                <p className={`text-sm sm:text-base font-medium ${current.listening}`}>Listening...</p>

                <div className='flex items-end justify-center gap-1 sm:gap-1.5 mt-3 sm:mt-4'>
                    <span className={`w-1 h-3 rounded-full ${current.wave} animate-pulse`} />

                <span className={`w-1 h-6 rounded-full ${current.wave} animate-pulse`} />

                <span className={`w-1 h-2 rounded-full ${current.wave} animate-pulse`} />

                <span className={`w-1 h-7 rounded-full ${current.wave} animate-pulse`} />

                <span className={`w-1 h-4 rounded-full ${current.wave} animate-pulse`} />

                <span className={`w-1 h-2 rounded-full ${current.wave} animate-pulse`} />
                </div>

            </div>
           </div>


           <div className='relative mb-1'>
            <div className={`absolute inset-0 rounded-full blur-2xl opacity-60 ${current.wave}`}/>
            <button className={`relative w-12 h-12 sm:w-15 sm:h-15 md:w-18 md:h-18 rounded-full bg-gradient-to-br ${current.button} ${current.micGlow} flex items-center justify-center`}>
                <CiMicrophoneOn className="text-[#000000b9]" size={25}/>

            </button>
           </div>

           
          </div>
            
        </div>
      
    </div>
  )
}

export default AssistantPreview
