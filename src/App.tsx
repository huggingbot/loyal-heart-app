import { useEffect } from 'react'
import './App.css'
import { useNavigate } from '@tanstack/react-router'

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate({ to: '/register/munnie' })
  }, [navigate])

  return <></>
}

export default App
