import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nombreUsuario: '',
    clave: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [loginType, setLoginType] = useState('admin')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (loginType === 'admin') {
        const response = await api.login(formData)
        const { token, nombreUsuario, rol } = response.data
        
        localStorage.setItem('token', token)
        localStorage.setItem('usuario', JSON.stringify({ nombreUsuario, rol }))
        
        navigate('/dashboard')
      } else {
        const response = await api.loginEmpleado({ dni: formData.nombreUsuario, password: formData.clave })
        const { token, empleado } = response.data
        
        localStorage.setItem('empleadoToken', token)
        localStorage.setItem('empleado', JSON.stringify(empleado))
        
        navigate('/empleado/dashboard')
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error en la autenticación'
      setError(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-600 p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative z-10">
        <div className="text-center mb-6">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-4xl text-white bg-gradient-purple shadow-gradient-purple">
            <i className="bi bi-person-badge"></i>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Sistema de Registro</h1>
          <p className="text-gray-500">Gestión Integral de Empleados</p>
        </div>

        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button type="button" onClick={() => { setLoginType('admin'); setError(''); }}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${loginType === 'admin' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
            <i className="bi bi-shield-lock mr-1"></i> Administrador
          </button>
          <button type="button" onClick={() => { setLoginType('empleado'); setError(''); }}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${loginType === 'empleado' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
            <i className="bi bi-person mr-1"></i> Empleado
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {loginType === 'admin' ? 'Usuario' : 'DNI'}
            </label>
            <div className="relative">
              <input 
                type="text"
                value={formData.nombreUsuario}
                onChange={(e) => setFormData({...formData, nombreUsuario: e.target.value})}
                className="w-full px-4 py-3 pl-10 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors bg-gray-50"
                placeholder={loginType === 'admin' ? "Ingrese su usuario" : "Ingrese su DNI"}
                required
              />
              <i className={`bi ${loginType === 'admin' ? 'bi-person' : 'bi-credit-card'} absolute left-3 top-1/2 -translate-y-1/2 text-gray-400`}></i>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Contraseña
            </label>
            <div className="relative">
              <input 
                type="password"
                value={formData.clave}
                onChange={(e) => setFormData({...formData, clave: e.target.value})}
                className="w-full px-4 py-3 pl-10 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors bg-gray-50"
                placeholder="Ingrese su contraseña"
                required
              />
              <i className="bi bi-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl flex items-center gap-2">
              <i className="bi bi-exclamation-circle-fill"></i>
              <span>{error}</span>
              <button type="button" onClick={() => setError('')} className="ml-auto bg-transparent border-none text-red-600 cursor-pointer">
                <i className="bi bi-x"></i>
              </button>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-semibold text-lg disabled:opacity-70 flex items-center justify-center gap-2 ${loginType === 'admin' ? 'bg-gradient-purple shadow-gradient-purple' : 'bg-gradient-green shadow-gradient-green'}`}
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <><i className="bi bi-arrow-right-circle-fill"></i> Iniciar Sesión</>
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-center text-xs text-gray-400 uppercase tracking-wider mb-3">Credenciales de Demostración</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-3 rounded-xl text-center border border-purple-100">
              <div className="text-purple-500 text-xl mb-1"><i className="bi bi-shield-lock"></i></div>
              <p className="text-xs font-bold text-gray-700 uppercase">Administrador</p>
              <div className="mt-1 text-xs">
                <span className="bg-white px-2 py-1 rounded text-purple-600 font-mono">admin</span>
                <span className="text-gray-400 mx-1">/</span>
                <span className="bg-white px-2 py-1 rounded text-purple-600 font-mono">admin123</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-3 rounded-xl text-center border border-green-100">
              <div className="text-green-500 text-xl mb-1"><i className="bi bi-person-check"></i></div>
              <p className="text-xs font-bold text-gray-700 uppercase">Empleado</p>
              <div className="mt-1 text-xs">
                <span className="bg-white px-2 py-1 rounded text-green-600 font-mono">12345678</span>
                <span className="text-gray-400 mx-1">/</span>
                <span className="bg-white px-2 py-1 rounded text-green-600 font-mono">123456</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm opacity-75">
        © 2026 Sistema de Registro de Empleados
      </div>
    </div>
  )
}

export default Login
