import { FormEventHandler, useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from '@tanstack/react-router'

function SignIn() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const { signIn, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: '/admin/munnie/user' })
    }
  }, [isAuthenticated, navigate])

  const handleSignIn: FormEventHandler = async (e) => {
    e.preventDefault()
    setError('')

    try {
      await signIn({ email: username, password })
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An error occurred')
      }
    }
  }

  return (
    <div className='max-w-md mx-auto mt-12 p-8 border border-gray-300 rounded-lg'>
      <h2 className='text-2xl font-bold mb-4 text-center'>Sign In</h2>
      <form onSubmit={handleSignIn} className='flex flex-col space-y-4'>
        <div className='flex flex-col'>
          <label htmlFor='username' className='mb-2 font-medium'>
            Email:
          </label>
          <input
            type='text'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='p-2 border border-gray-300 rounded'
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='password' className='mb-2 font-medium'>
            Password:
          </label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='p-2 border border-gray-300 rounded'
          />
        </div>
        {error && <p className='text-red-500'>{error}</p>}
        <button type='submit' className='p-2 bg-blue-500 text-white rounded hover:bg-blue-700'>
          Sign In
        </button>
      </form>
    </div>
  )
}

export default SignIn
