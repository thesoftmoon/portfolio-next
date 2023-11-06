export default function handler(req, res) {
    if (req.method === 'GET') {
      // Obtén los datos desde tu base de datos u otra fuente.
      // Devuelve los datos como una respuesta JSON.
      const datos = {
        titulo: 'Título de ejemplo',
        detalles: 'Detalles de ejemplo',
      };
      return res.status(200).json(datos);
    } else {
      return res.status(405).end(); // Método no permitido
    }
  }