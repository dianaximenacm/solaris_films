const express = require('express');
const UsuarioControl = require('../control/UsuarioControl');

const multipart = require('connect-multiparty');

const subirArchivo = multipart({uploadDir : './archivos/usuario'});

var api = express.Router();

api.post('/registro', UsuarioControl.NuevoUsuario);
api.post('/ingreso', UsuarioControl.Ingresar);
api.put('/actualizar/:id',UsuarioControl.ModificarDatos);



module.exports = api;