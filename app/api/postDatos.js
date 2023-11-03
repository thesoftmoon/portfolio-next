import { db } from '.../firebase.js'; // Reemplaza con la ruta correcta a tu configuración de Firebase
import { collection, addDoc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { username, about } = req.body;

      const data = {
        username,
        about,
        // Otros campos que quieras guardar en Firestore
      };

      const docRef = await addDoc(collection(db, 'tuColeccion'), data); // Reemplaza 'tuColeccion' con el nombre de tu colección en Firestore

      res.status(201).json({ message: 'Datos guardados exitosamente', id: docRef.id });
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      res.status(500).json({ error: 'Error al guardar los datos' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
};
