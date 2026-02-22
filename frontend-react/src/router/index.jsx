import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../views/Login'
import Dashboard from '../views/Dashboard'
import Empleados from '../views/Empleados'
import Asistencias from '../views/Asistencias'
import Licencias from '../views/Licencias'
import Graficos from '../views/Graficos'
import Auditoria from '../views/Auditoria'
import DashboardEmpleado from '../views/empleado/DashboardEmpleado'
import MarcarAsistencia from '../views/empleado/MarcarAsistencia'
import MisAsistencias from '../views/empleado/MisAsistencias'
import MisLicencias from '../views/empleado/MisLicencias'
import SolicitarLicencia from '../views/empleado/SolicitarLicencia'
import MiPerfil from '../views/empleado/MiPerfil'

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return children
}

const ProtectedRouteEmpleado = ({ children }) => {
  const token = localStorage.getItem('empleadoToken')
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return children
}

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/empleados" element={<ProtectedRoute><Empleados /></ProtectedRoute>} />
      <Route path="/asistencias" element={<ProtectedRoute><Asistencias /></ProtectedRoute>} />
      <Route path="/licencias" element={<ProtectedRoute><Licencias /></ProtectedRoute>} />
      <Route path="/graficos" element={<ProtectedRoute><Graficos /></ProtectedRoute>} />
      <Route path="/auditoria" element={<ProtectedRoute><Auditoria /></ProtectedRoute>} />
      
      <Route path="/empleado/dashboard" element={<ProtectedRouteEmpleado><DashboardEmpleado /></ProtectedRouteEmpleado>} />
      <Route path="/empleado/asistencia" element={<ProtectedRouteEmpleado><MarcarAsistencia /></ProtectedRouteEmpleado>} />
      <Route path="/empleado/mis-asistencias" element={<ProtectedRouteEmpleado><MisAsistencias /></ProtectedRouteEmpleado>} />
      <Route path="/empleado/licencias" element={<ProtectedRouteEmpleado><MisLicencias /></ProtectedRouteEmpleado>} />
      <Route path="/empleado/solicitar-licencia" element={<ProtectedRouteEmpleado><SolicitarLicencia /></ProtectedRouteEmpleado>} />
      <Route path="/empleado/perfil" element={<ProtectedRouteEmpleado><MiPerfil /></ProtectedRouteEmpleado>} />
      
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default Router
