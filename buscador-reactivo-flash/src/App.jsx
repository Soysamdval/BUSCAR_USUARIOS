import Card from './components/card'
import SearchInput from './components/searchinput'
import './App.css'
import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

export default function App() {
  const [usuarios, setUsuarios] = useState([])
  const [filtrados, setFiltrados] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const obtenerUsuarios = async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:3001/usuarios')
      setUsuarios(response.data)
      setFiltrados(response.data)
      setError(null)
    } catch (err) {
      setError('Error al cargar usuarios')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    obtenerUsuarios()
  }, [])

  const filtrarUsuarios = useCallback((query) => {
    const q = query.trim().toLowerCase()
    const resultados = usuarios.filter(usuario =>
      [usuario.nombre, usuario.apellidos, usuario.perfil, usuario.intereses, usuario.correo].some(campo =>
        String(campo).toLowerCase().includes(q)
      )
    )
    setFiltrados(resultados)
  }, [usuarios])

  return (
    <main className="p-6 max-w-7xl mx-auto min-h-screen flex flex-col">
      <h1 className="text-5xl font-extrabold mb-8 text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transxrent select-none">
        Buscador de Usuarios
      </h1>

      <div className="w-full max-w-lg mx-auto">
        <SearchInput onSearch={filtrarUsuarios} />
      </div>

      {loading ? (
        <div className="flex justify-center items-center flex-grow">
          <div className="w-14 h-14 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <p className="text-red-500 text-center mt-8 font-semibold">{error}</p>
      ) : filtrados.length === 0 ? (
        <p className="text-gray-500 text-center mt-8 italic">No se encontraron usuarios.</p>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10 px-2">
          {filtrados.map(usuario => (
            <Card key={usuario.id} usuario={usuario} />
          ))}
        </section>
      )}
    </main>
  )
}