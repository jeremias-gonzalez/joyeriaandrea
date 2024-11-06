// Importar Express
const express = require('express');

// Crear una instancia de la aplicación
const app = express();

// Definir el puerto
const PORT = process.env.PORT || 3000;

// Crear una ruta de ejemplo
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
