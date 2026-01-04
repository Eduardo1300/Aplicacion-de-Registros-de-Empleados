const bcrypt = require('bcryptjs');

async function generatePasswords() {
  const adminHash = await bcrypt.hash('admin123', 10);
  const empleadoHash = await bcrypt.hash('empleado123', 10);
  
  console.log('Admin hash:', adminHash);
  console.log('Empleado hash:', empleadoHash);
  console.log('\nRun these SQL commands:');
  console.log(`UPDATE "usuarios" SET clave = '${adminHash}' WHERE "nombreUsuario" = 'admin';`);
  console.log(`UPDATE "usuarios" SET clave = '${empleadoHash}' WHERE "nombreUsuario" = 'empleado';`);
}

generatePasswords().catch(console.error);
