<template>
  <div class="demo-container">
    <div class="demo-header">
      <h1>🎉 Demo de Toast Notifications</h1>
      <p>Haz clic en los botones para ver ejemplos de cada tipo de notificación</p>
    </div>

    <div class="demo-grid">
      <!-- Success -->
      <button 
        @click="notification.success('¡Operación completada exitosamente!')"
        class="demo-btn success"
      >
        <span class="demo-icon">✓</span>
        <span class="demo-text">Success</span>
        <span class="demo-subtitle">Verde</span>
      </button>

      <!-- Error -->
      <button 
        @click="notification.error('Ha ocurrido un error inesperado')"
        class="demo-btn error"
      >
        <span class="demo-icon">✗</span>
        <span class="demo-text">Error</span>
        <span class="demo-subtitle">Rojo</span>
      </button>

      <!-- Warning -->
      <button 
        @click="notification.warning('Por favor, revisa esta información')"
        class="demo-btn warning"
      >
        <span class="demo-icon">⚠</span>
        <span class="demo-text">Warning</span>
        <span class="demo-subtitle">Amarillo</span>
      </button>

      <!-- Info -->
      <button 
        @click="notification.info('Información importante para ti')"
        class="demo-btn info"
      >
        <span class="demo-icon">ℹ</span>
        <span class="demo-text">Info</span>
        <span class="demo-subtitle">Azul</span>
      </button>
    </div>

    <div class="demo-examples">
      <h2>📋 Casos de Uso Comunes</h2>
      
      <div class="examples-grid">
        <!-- Login -->
        <div class="example-card">
          <h3>🔐 Login</h3>
          <button 
            @click="demoLogin"
            class="example-btn"
          >
            Simular Login
          </button>
          <p>Muestra éxito/error al iniciar sesión</p>
        </div>

        <!-- Guardar -->
        <div class="example-card">
          <h3>💾 Guardar Datos</h3>
          <button 
            @click="demoSaveData"
            class="example-btn"
          >
            Simular Guardado
          </button>
          <p>Feedback de operación CRUD</p>
        </div>

        <!-- Validación -->
        <div class="example-card">
          <h3>✔️ Validación</h3>
          <button 
            @click="demoValidation"
            class="example-btn"
          >
            Simular Validación
          </button>
          <p>Advertencia sobre campos inválidos</p>
        </div>

        <!-- Duración Personalizada -->
        <div class="example-card">
          <h3>⏱️ Duración Personalizada</h3>
          <button 
            @click="() => notification.success('Desaparece en 1 segundo', 1000)"
            class="example-btn"
          >
            Corto (1s)
          </button>
          <button 
            @click="() => notification.info('Desaparece en 5 segundos', 5000)"
            class="example-btn"
          >
            Largo (5s)
          </button>
          <button 
            @click="() => notification.warning('Click para cerrar', 0)"
            class="example-btn"
          >
            Permanente
          </button>
        </div>

        <!-- Múltiples Toasts -->
        <div class="example-card">
          <h3>📚 Múltiples Toasts</h3>
          <button 
            @click="demoMultipleToasts"
            class="example-btn"
          >
            Mostrar 3 Toasts
          </button>
          <p>Se apilan verticalmente</p>
        </div>

        <!-- Error con Detalle -->
        <div class="example-card">
          <h3>🔧 Error Detallado</h3>
          <button 
            @click="() => notification.error('Email ya registrado en el sistema')"
            class="example-btn"
          >
            Error Específico
          </button>
          <p>Errores más informativos</p>
        </div>
      </div>
    </div>

    <div class="demo-info">
      <h2>📖 Documentación</h2>
      <p>
        Para más información, consulta:
      </p>
      <ul>
        <li><strong>TOAST_GUIA_RAPIDA.md</strong> - Inicio rápido (3 pasos)</li>
        <li><strong>TOAST_DOCUMENTATION.md</strong> - Documentación completa</li>
        <li><strong>TOAST_EJEMPLOS.js</strong> - 20+ ejemplos de código</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useNotification } from '../services/notification.service'

export default {
  name: 'ToastDemo',
  setup() {
    const notification = useNotification()

    const demoLogin = () => {
      const success = Math.random() > 0.3
      if (success) {
        notification.success('¡Sesión iniciada correctamente!')
      } else {
        notification.error('Usuario o contraseña incorrectos')
      }
    }

    const demoSaveData = () => {
      notification.info('Guardando datos...', 1000)
      setTimeout(() => {
        notification.success('Datos guardados correctamente')
      }, 1200)
    }

    const demoValidation = () => {
      const errors = [
        'El correo es obligatorio',
        'La contraseña debe tener 8 caracteres mínimo',
        'El nombre no puede estar vacío',
        'El teléfono no es válido'
      ]
      const randomError = errors[Math.floor(Math.random() * errors.length)]
      notification.warning(randomError)
    }

    const demoMultipleToasts = () => {
      notification.success('Primer toast')
      setTimeout(() => {
        notification.info('Segundo toast')
      }, 300)
      setTimeout(() => {
        notification.warning('Tercer toast')
      }, 600)
    }

    return {
      notification,
      demoLogin,
      demoSaveData,
      demoValidation,
      demoMultipleToasts
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.demo-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.demo-header {
  text-align: center;
  color: white;
  margin-bottom: 50px;
  animation: fadeIn 0.6s ease-out;
}

.demo-header h1 {
  font-size: 2.5em;
  margin-bottom: 10px;
  font-weight: 700;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.demo-header p {
  font-size: 1.1em;
  opacity: 0.9;
  font-weight: 300;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 60px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}

.demo-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 30px 20px;
  border: none;
  border-radius: 12px;
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  animation: slideUp 0.5s ease-out;
}

.demo-btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

.demo-btn:active {
  transform: translateY(-2px);
}

.demo-btn.success {
  background-color: #10b981;
}

.demo-btn.error {
  background-color: #ef4444;
}

.demo-btn.warning {
  background-color: #f59e0b;
}

.demo-btn.info {
  background-color: #3b82f6;
}

.demo-icon {
  font-size: 2.5em;
  font-weight: bold;
}

.demo-text {
  font-size: 1.3em;
}

.demo-subtitle {
  font-size: 0.85em;
  opacity: 0.8;
  font-weight: 400;
}

.demo-examples {
  max-width: 1200px;
  margin: 0 auto 60px;
}

.demo-examples h2 {
  color: white;
  font-size: 1.8em;
  margin-bottom: 30px;
  text-align: center;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
}

.example-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  animation: slideUp 0.6s ease-out both;
}

.example-card:nth-child(1) { animation-delay: 0.1s; }
.example-card:nth-child(2) { animation-delay: 0.2s; }
.example-card:nth-child(3) { animation-delay: 0.3s; }
.example-card:nth-child(4) { animation-delay: 0.4s; }
.example-card:nth-child(5) { animation-delay: 0.5s; }
.example-card:nth-child(6) { animation-delay: 0.6s; }

.example-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
}

.example-card h3 {
  color: #333;
  font-size: 1.3em;
  margin-bottom: 15px;
}

.example-card p {
  color: #666;
  font-size: 0.95em;
  margin-top: 10px;
  line-height: 1.5;
}

.example-btn {
  display: block;
  width: 100%;
  padding: 12px 20px;
  margin-bottom: 8px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.95em;
}

.example-btn:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.example-btn:active {
  transform: scale(0.98);
}

.demo-info {
  max-width: 1200px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
}

.demo-info h2 {
  color: #333;
  font-size: 1.5em;
  margin-bottom: 15px;
}

.demo-info p {
  color: #666;
  font-size: 1em;
  margin-bottom: 15px;
}

.demo-info ul {
  list-style: none;
  color: #555;
}

.demo-info li {
  padding: 8px 0;
  margin-left: 20px;
  position: relative;
}

.demo-info li:before {
  content: "→";
  position: absolute;
  left: -15px;
  color: #667eea;
  font-weight: bold;
}

.demo-info strong {
  color: #333;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .demo-header h1 {
    font-size: 1.8em;
  }

  .demo-header p {
    font-size: 0.95em;
  }

  .demo-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
  }

  .demo-btn {
    padding: 20px 15px;
  }

  .demo-icon {
    font-size: 2em;
  }

  .demo-text {
    font-size: 1em;
  }

  .examples-grid {
    grid-template-columns: 1fr;
  }

  .demo-info {
    padding: 20px;
  }
}
</style>
