import { createContext, userContext, userState } from "react";
import { Navigate } from "react-router-dom";

const UserContext = createContext();

export function AuthProvider ({ children }) {
  const [user, setUser] = useState(null);
    const Navigate = useNavigate();

  const login = (userData) => {
    setUser(userData);
    Navigate("/");
  };}

  import { useState } from 'react'

export default function Login({ onSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const validarEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    // Validaciones básicas
    if (!email || !password) {
      setError('Todos los campos son obligatorios.')
      return
    }

    if (!validarEmail(email)) {
      setError('El correo no es válido.')
      return
    }

    setLoading(true)

    // Simula una llamada a API
    setTimeout(() => {
      setLoading(false)
      if (email === 'admin@demo.com' && password === '123456') {
        onSuccess?.({ email })
      } else {
        setError('Credenciales inválidas.')
      }
    }, 1000)
  }

  return (
    <div className="max-w-md w-full mx-auto p-8 mt-20 bg-white dark:bg-gray-900 shadow-lg rounded-xl animate-fade-in">
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
        Iniciar Sesión
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            aria-label="Correo"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-gray-800 dark:text-white"
            placeholder="admin@demo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            aria-label="Contraseña"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-gray-800 dark:text-white"
            placeholder="••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <p className="text-sm text-red-500 text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-300 disabled:opacity-50"
        >
          {loading ? 'Entrando...' : 'Iniciar sesión'}
        </button>
      </form>
    </div>
  )
}
