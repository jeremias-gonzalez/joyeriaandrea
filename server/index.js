require('dotenv').config();
const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');
const app = express();

// Definir el puerto
const PORT = 3000;

// Configurar CORS para aceptar solicitudes desde el frontend especificado en el .env
const allowedOrigins = [process.env.FRONTEND_URL];
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET'], // Métodos permitidos
  credentials: true // Si necesitas enviar cookies u otras credenciales
}));

app.use(express.json());

// Servir la carpeta 'public' como archivos estáticos para que las imágenes sean accesibles
app.use('/images', express.static('public'));

// Autenticación con Google Sheets
const client = new google.auth.JWT(
  process.env.GOOGLE_CLIENT_EMAIL,
  null,
  process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  ['https://www.googleapis.com/auth/spreadsheets']
);

client.authorize((err) => {
  if (err) {
    console.error('Error connecting to Google Sheets:', err);
    return;
  }
  console.log('Connected to Google Sheets');
});

// Ruta para la raíz
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

// Endpoint de prueba
app.get('/api/test', (req, res) => {
  res.send("Servidor activo y funcionando en producción");
});

// Ruta para obtener datos de Google Sheets
app.get('/api/products', async (req, res) => {
  const gsapi = google.sheets({ version: 'v4', auth: client });
  const options = {
    spreadsheetId: '18-RX4TH_f62b-2FMoeurqkAcwoVWiaj6aedIasqU4Ng', // ID de Google Sheets
    range: 'Hoja 1!A2:G',
  };

  try {
    const data = await gsapi.spreadsheets.values.get(options);
    const rows = data.data.values;

    console.log('Data from Google Sheets:', rows); // Imprimir filas obtenidas

    if (!rows || rows.length === 0) {
      return res.status(404).send('No data found');
    }

    res.json(rows);
  } catch (err) {
    console.error('Error fetching data from Google Sheets:', err);
    res.status(500).json({
      message: 'Error fetching data from Google Sheets',
      error: err.message,
      stack: err.stack,
    });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
