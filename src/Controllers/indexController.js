import express from 'express'
import path from 'path' 

export const __dirname = path.resolve();

// Configura la carpeta de archivos estáticos
export const si = express.static(path.join(__dirname, 'public'))
export const inicio =  (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
}