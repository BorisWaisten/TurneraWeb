import ServicioUsuario from "../servicio/usuarios.js"
import {InvalidCredentialsError} from "../errores.js"
import validaciones from '../validaciones/usuarioValidacion.js'
import ServicioCanchas from "../servicio/canchas.js"

class ControladorUsuario {

  constructor() {
    this.servicioUsuario = new ServicioUsuario()
    this.servicioCancha = new ServicioCanchas()
  }

  registro = async (req, res) => {
    const usuario = req.body
    try {
    validaciones.validarBodyRegistro(usuario)
    const newUser = await this.servicioUsuario.registro(usuario);
    res.status(200).json(newUser);
    }
    catch (error) {
      res.status(401).json(error.message);
    }
  };

  login = async (req, res) => {
    const usuario = req.body
    try {
      validaciones.validarBodyLogin(usuario);
      const usuarioRes = await this.servicioUsuario.login(usuario);
      res.status(200).json(usuarioRes);
    } catch (error) {
      res.status(401).json(error.message);
    }
  };

  editarUsuario = async (req, res) => {
    const {id} = req.params
    const datos = req.body
    try {
      validaciones.validarBodyEditar(datos);
      const respuesta = await this.servicioUsuario.editarUsuario(id, datos);
      res.status(200).json(respuesta);
    } catch (error) {
      res.status(401).json(error.message);
    }
  }

  eliminarCuenta = async (req, res) => {
    const {id} = req.params
    try {
      const usuarioEliminado = await this.servicioUsuario.eliminarCuenta(id);
      await this.servicioCancha.agregarArrayDatos(usuarioEliminado.reservas)
      res.status(200).json(usuarioEliminado);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }

  obtenerUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await this.servicioUsuario.obtenerUsuario(id);
        if (!usuario) {
          res.status(401).json({
            message: "Usuario no autenticado",
          });
        } else {
          res.status(200).json(usuario);
        }
    } catch (error) {
       if (error instanceof InvalidCredentialsError) {
            res.status(400).json(error.message);
        }
    }
  };
  
  getAll = async(req, res) => {
    try {
      const listaUsuarios = await this.servicioUsuario.getAll();
      res.status(200).json(listaUsuarios);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }

}
export default ControladorUsuario 