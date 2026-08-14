import React from 'react'
import { FiSun, FiMoon } from 'react-icons/fi'
import { useTheme } from '../context/ThemeContext'

function ThemeToggle() {
  const { darkMode, toggleDarkMode } = useTheme()

  return (
    <button
      onClick={toggleDarkMode}
      className='fixed top-5 right-5 z-[60] w-11 h-11 rounded-full bg-white dark:bg-gray-800 border border-orange-100 dark:border-gray-700 shadow-lg flex items-center justify-center hover:scale-105 transition-all cursor-pointer'
    >
      {darkMode ? (
        <FiSun size={18} className='text-yellow-400' />
      ) : (
        <FiMoon size={18} className='text-gray-600' />
      )}
    </button>
  )
}

export default ThemeToggle
