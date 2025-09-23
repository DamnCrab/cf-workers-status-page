import { useEffect, useState } from 'react'

const moonIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="h-5 mx-auto"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </svg>
)

const sunIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="h-5 mx-auto"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
)

function setTheme(theme) {
  document.documentElement.classList.remove('dark', 'light')
  document.documentElement.classList.add(theme)
  localStorage.theme = theme
}

export default function ThemeSwitcher() {
  const [darkmode, setDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark'
    }
    return false
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTheme(darkmode ? 'dark' : 'light')
    }
  }, [darkmode])

  const changeTheme = () => {
    setDark(!darkmode)
  }

  const buttonColor = darkmode 
    ? 'bg-gray-700 focus:ring-gray-700' 
    : 'bg-gray-200 focus:ring-gray-200'

  return (
    <button
      className={`mr-4 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${buttonColor}`}
      onClick={changeTheme}
      aria-label="Toggle theme"
    >
      {darkmode ? sunIcon : moonIcon}
    </button>
  )
}