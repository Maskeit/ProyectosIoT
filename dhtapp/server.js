const express = require('express');
const app = express();
const port = 3000;

// Sirve archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Inicia el servidor en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});


//Access token: 0a37108d047767e2149dbb608b1095140301900e

//'api.particle.io/v1/devices/24002d001447313036303933/temp?access_token=0a37108d047767e2149dbb608b1095140301900e'