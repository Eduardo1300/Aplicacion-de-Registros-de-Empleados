import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const LoginEmpleado = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ dni: '', clave: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('empleadoToken')
    if (token) navigate('/empleado/dashboard')
  }, [navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const api = (await import('../../services/api')).default
      const response = await api.loginEmpleado(formData)
      const { token, empleado } = response.data
      localStorage.setItem('empleadoToken', token)
      localStorage.setItem('empleado', JSON.stringify(empleado))
      navigate('/empleado/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Error en la autenticación')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 to-emerald-600 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-4xl text-white bg-gradient-green shadow-gradient-green">
            <i className="bi bi-person-badge"></i>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Acceso Empleado</h1>
          <p className="text-gray-500">Ingresa tus credenciales</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">DNI</label>
            <input type="text" value={formData.dni} onChange={(e) => setFormData({...formData, dni: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none bg-gray-50" placeholder="Ingrese su DNI" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Clave</label>
            <input type="password" value={formData.clave} onChange={(e) => setFormData({...formData, clave: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none bg-gray-50" placeholder="Ingrese su clave" required />
          </div>
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-xl">{error}</div>}
          <button type="submit" disabled={loading}
            className="w-full py-3 rounded-xl text-white font-semibold disabled:opacity-70 bg-gradient-green">
            {loading ? 'Verificando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/login" className="text-green-600 hover:underline text-sm">Acceso Administrador</Link>
        </div>
      </div>
    </div>
  )
}

export default LoginEmpleado

