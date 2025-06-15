import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import connection from './database.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const port = process.env.PORT || 10000;


app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MULTER SETUP
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });


// LOGIN

app.post('/login', (req, res) => {
  const { usuario, password } = req.body;

  const validUser = usuario === process.env.LOGIN_USER;
  const validPass = password === process.env.LOGIN_PASS;

  if (validUser && validPass) {
    res.json({ mensaje: "Acceso permitido", autorizado: true });
  } else {
    res.status(401).json({ mensaje: "Credenciales incorrectas" });
  }
});

//CONTACTO ---¡FUNCIONA!---EN EL ARCHIVO .ENV CAMBIAR EL MAIL Y LA CONTRASEÑA DE LA APLICACION POR LA DE SEGUNDO REY
app.post('/contacto', async (req, res) => {
  const { nombre, correo, telefono, mensaje } = req.body;

  if (!nombre || !correo || !mensaje) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  const transporter = nodemailer.createTransport({
    host: 'mail.segundorey.com',
    port: 465,
    secure: true,
    auth: {
      user: 'info@segundorey.com',
      pass: process.env.EMAIL_PASS

    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'info@segundorey.com',
    subject: `📩 Nuevo contacto desde web de ${nombre}`,
    text: `
📨 Nombre: ${nombre}
📧 Correo: ${correo}
📞 Teléfono: ${telefono || 'No indicado'}

📝 Mensaje:
${mensaje}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Mensaje enviado");
  } catch (error) {
    console.error("Error al enviar mensaje de contacto:", error);
    res.status(500).send("Error al enviar mensaje");
  }
});


// ENVÍO CV ---¡FUNCIONA!--- EN EL ARCHIVO .ENV CAMBIAR EL MAIL Y LA CONTRASEÑA DE LA APLICACION POR LA DE SEGUNDO REY
app.post('/trabajaConNosotros', upload.single('cv'), async (req, res) => {
  const { nombre, apellidos, email, telefono, posicion } = req.body;
  const cvFile = req.file;

  if (!cvFile) {
    return res.status(400).send('No se adjuntó ningún archivo.');
  }

  const transporter = nodemailer.createTransport({

    host: 'mail.segundorey.com',
    port: 465,
    secure: true,
    auth: {
      user: 'info@segundorey.com',
      pass: process.env.EMAIL_PASS

    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'info@segundorey.com',
    subject: `CV desde web: ${nombre} ${apellidos}`,
    text: `
    Curriculum recibido:

      Nombre: ${nombre}
      Apellidos: ${apellidos}
      Email: ${email}
      Teléfono: ${telefono}
      Posición: ${posicion}
    `,
    attachments: [
      {
        filename: cvFile.originalname,
        path: cvFile.path
      }
    ]
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send('CV enviado correctamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al enviar el CV');
  }
});


// OBTENER VENDEDORES -------- ¡FUNCIONA PERFECTAMENTE!
app.get('/vendedores', async (req, res) => {
  try {
    const [rows] = await connection.execute('SELECT * FROM vendedores');
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener vendedores:', err);
    res.status(500).json({ error: 'Error al obtener vendedores' });
  }
});

app.get('/vendedores/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await connection.execute('SELECT * FROM vendedores WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: "Vendedor no encontrado" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener vendedor" });
  }
});

// AGENDAR CITA --------- ¡FUNCIONA PERFECTAMENTE!
app.post('/agenda', async (req, res) => {
  const { fecha, vendedor_id, hora, observaciones, nombre = '', email = '', telefono = '' } = req.body;
  if (!observaciones?.trim()) return res.status(400).json({ error: "Nota inválida" });

  try {
    const [existing] = await connection.execute(
      'SELECT * FROM citas WHERE fecha = ? AND hora = ? AND vendedor_id = ?',
      [fecha, hora, vendedor_id]
    );

    if (existing.length > 0) return res.status(409).json({ error: "Ya existe una cita para ese horario y vendedor." });

    const [result] = await connection.execute(
      'INSERT INTO citas (vendedor_id, fecha, hora, observaciones, nombre, email, telefono) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [vendedor_id, fecha, hora, observaciones, nombre, email, telefono]
    );

    res.json({ id: result.insertId, vendedor_id, fecha, hora, observaciones, nombre, email, telefono });
  } catch (err) {
    console.error("Error al agendar cita:", err);
    res.status(500).json({ error: "Error al agendar cita" });
  }
});

//ENVIO DE MAIL DE CITAS NORMALES:---------¡FUNCIONA, NO TOCAR!
app.post('/enviar-confirmacion', async (req, res) => {
  const { nombre, email, fecha, hora, vendedor_id } = req.body;

  if (!email || !nombre || !fecha || !hora || !vendedor_id) {
    return res.status(400).json({ error: "Faltan campos necesarios para enviar el correo" });
  }

  try {
    const [vendedorRows] = await connection.execute(
      'SELECT email FROM vendedores WHERE id = ?',
      [vendedor_id]
    );

    const emailVendedor = vendedorRows[0]?.email;

    const transporter = nodemailer.createTransport({
      host: 'mail.segundorey.com',
      port: 465,
      secure: true,
      auth: {
        user: 'info@segundorey.com',
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const mensaje = `Hola ${nombre},

Gracias por reservar su cita.

🗓 Fecha: ${fecha}
⏰ Hora: ${hora}
📍 Dirección: Rúa das Hedras, 25. Parque Empresarial NovoMilladoiro. 15895 - Milladoiro

Si tiene preguntas, puede responder a este correo.

Un saludo,
Segundo Rey`;

    // Enviar al cliente
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Confirmación de Cita Segundo Rey",
      text: mensaje
    });

    // Enviar al vendedor (si tiene email)
    if (emailVendedor) {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: emailVendedor,
        subject: "📅 Nueva cita agendada",
        text: `Se ha agendado una nueva cita:

Cliente: ${nombre}
Email cliente: ${email}
Teléfono: ${req.body.telefono || "No indicado"}
🗓 Fecha: ${fecha}
⏰ Hora: ${hora}

Por favor, revisa tu agenda.
`
      });
    }

    res.status(200).json({ message: "Correo enviado" });
  } catch (err) {
    console.error("Error al enviar correo:", err);
    res.status(500).json({ error: "Error al enviar correo" });
  }
});



// OBTENER CITAS
app.get('/citas', async (req, res) => {
  const { vendedor_id, fecha, desde, hasta } = req.query;

  try {
    let query = 'SELECT * FROM citas WHERE 1=1';
    const params = [];

    if (vendedor_id) {
      query += ' AND vendedor_id = ?';
      params.push(vendedor_id);
    }

    if (fecha) {
      query += ' AND fecha = ?';
      params.push(fecha);
    }

    if (desde && hasta) {
      query += ' AND fecha BETWEEN ? AND ?';
      params.push(desde, hasta);
    }

    const [rows] = await connection.execute(query, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener citas" });
  }
});

// EDITAR CITA
app.put('/citas/:id', async (req, res) => {
  const { id } = req.params;
  const { observaciones } = req.body;

  try {
    const [result] = await connection.execute(
      'UPDATE citas SET observaciones = ? WHERE id = ?',
      [observaciones, id]
    );
    result.affectedRows
      ? res.json({ id, observaciones })
      : res.status(404).json({ error: "Cita no encontrada" });
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar cita" });
  }
});

// CANCELAR CITA
app.delete('/citas/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await connection.execute('DELETE FROM citas WHERE id = ?', [id]);
    result.affectedRows
      ? res.json({ success: true })
      : res.status(404).json({ error: "Cita no encontrada" });
  } catch (err) {
    res.status(500).json({ error: "Error al cancelar cita" });
  }
});

// VACACIONES
app.get('/vacaciones', async (_, res) => {
  try {
    const [rows] = await connection.execute('SELECT * FROM vacaciones');

    const normalizados = rows.map(v => ({
      ...v,

      fecha_inicio: v.fecha_inicio.toLocaleDateString('en-CA'),
      fecha_fin: v.fecha_fin.toLocaleDateString('en-CA'),

    }));
    res.json(normalizados);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener vacaciones" });
  }
});


app.post('/vacaciones', async (req, res) => {
  const { vendedor_id, fecha_inicio, fecha_fin } = req.body;

  if (!vendedor_id || !fecha_inicio || !fecha_fin) {
    return res.status(400).json({ error: "Datos inválidos" });
  }

  try {
    await connection.execute(
      `INSERT INTO vacaciones (vendedor_id, fecha_inicio, fecha_fin) VALUES (?, ?, ?)`,
      [vendedor_id, fecha_inicio, fecha_fin]
    );
    res.json({ mensaje: "Vacaciones guardadas correctamente" });
  } catch (err) {
    console.error("Error al guardar vacaciones:", err);
    res.status(500).json({ error: "Error al guardar vacaciones" });
  }
});


// NUEVA RUTA: elimina por ID
app.delete('/vacaciones/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Falta el ID" });
  }

  try {
    const [result] = await connection.execute(
      `DELETE FROM vacaciones WHERE id = ?`,
      [id]
    );
    res.json({ eliminado: result.affectedRows });
  } catch (err) {
    console.error("Error eliminando vacaciones:", err);
    res.status(500).json({ error: "Error eliminando vacaciones" });
  }
});




// CITAS SÁBADO
app.get('/citaPreviaSabado', async (req, res) => {
  const { fecha } = req.query;
  if (!fecha) return res.status(400).json({ error: "Falta la fecha" });

  try {
    const [rows] = await connection.execute(
      'SELECT hora FROM citas_sabado WHERE fecha = ?',
      [fecha]
    );

    // Transformar "10:00:00" → "10:00"
    const horas = rows.map(row => row.hora.slice(0, 5));

    res.json(horas); // ahora es ["10:00", "12:00"]
  } catch (err) {
    console.error("Error al obtener citas sábado:", err);
    res.status(500).json({ error: "Error al obtener citas" });
  }
});


// GUARDAR CITA SÁBADO + EMAIL ----------------- ¡FUNCIONA PERFECTAMENTE!
app.post('/datos-sabado', async (req, res) => {
  const { nombre, email, telefono, observaciones, fecha, hora, aceptaProteccionDatos } = req.body;

  // Validación básica
  if (!nombre || !email || !telefono || !fecha || !hora)
    return res.status(400).json({ error: "Faltan campos obligatorios" });

  // Validación explícita del consentimiento
  if (aceptaProteccionDatos !== true && aceptaProteccionDatos !== 'true')
    return res.status(400).json({ error: "No se aceptó la política de privacidad" });

  try {
    const [existing] = await connection.execute(
      'SELECT * FROM citas_sabado WHERE fecha = ? AND hora = ?',
      [fecha, hora]
    );

    if (existing.length > 0)
      return res.status(409).json({ error: "Hora ya ocupada" });

    await connection.execute(
      'INSERT INTO citas_sabado (nombre, email, telefono, observaciones, fecha, hora, acepta_privacidad) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nombre, email, telefono, observaciones, fecha, hora, true]
    );

    const transporter = nodemailer.createTransport({
      host: 'mail.segundorey.com',
      port: 465,
      secure: true,
      auth: {
        user: 'info@segundorey.com',
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Confirmación de Cita Segundo Rey",
      text: `Hola ${nombre},

Gracias por reservar su cita.

🗓 Fecha: ${fecha}
⏰ Hora: ${hora}
📍 Dirección: Rúa das Hedras, 25. Parque Empresarial NovoMilladoiro. 15895 - Milladoiro

Si tiene preguntas, puede responder a este correo.

Un saludo,
Segundo Rey`
    });

    res.status(200).json({ message: "Cita guardada y correo enviado" });
  } catch (err) {
    console.error("Error al enviar correo:", err);
    res.status(500).json({ error: "Error al guardar la cita o enviar correo" });
  }
});


// SERVIR FRONTEND SI DESEAS DESPLEGARLO EN EL MISMO SERVIDOR (opcional)
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('/*', (_, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});


// INICIAR SERVIDOR
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});



