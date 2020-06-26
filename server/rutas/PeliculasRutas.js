const express = require('express');
const PeliculaControl = require('../control/PeliculaControl');

const multipart = require('connect-multiparty');

const subirArchivo = multipart({uploadDir : './archivos/peliculas'});

var api = express.Router();

api.post('/nuevaPelicula',PeliculaControl.peliculaNueva);
api.put('/actualizarPelicula/:id', PeliculaControl.actualizarPelicula);
api.put('/archivoNuevo/:id',subirArchivo , PeliculaControl.subirArchivo);
api.get('/caratula/:imageFile', PeliculaControl.mostrarArchivo);
api.get('/pelicula/:archivos',PeliculaControl.buscarPelicula);

module.exports = api;