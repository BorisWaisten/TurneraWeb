import ServicioUsuario from "../servicio/usuarios.js"
import ServicioCanchas from "../servicio/canchas.js"
import reservasValidacion from "../validaciones/reservasValidacion.js";
import { ValidateError, ServicioError} from "../errores.js";


class ControladorReserva {

  constructor() {
    this.servicioCanchas = new ServicioCanchas()
    this.servicioUsuario = new ServicioUsuario()
  }

  reservarCancha = async (req, res) => {
    const {id} = req.params
    const reqReserva = req.body
    try {
      //Regla de Negocio reserva
      reservasValidacion.validarReserva(reqReserva);
      await this.servicioCanchas.modificarCancha(reqReserva);
      const usuario = await this.servicioUsuario.reservar(id, reqReserva);
      res.status(200).json(usuario);
    } catch (error) {
        if (error instanceof ServicioError  || error instanceof ValidateError) {
          await this.servicioCanchas.agregarDatos(reqReserva)
          res.status(422).json(error.message);
        }
        else{
          res.status(400).json(error.message)
        }
      }
    }

  eliminarReserva = async (req, res) => {
    const {id} = req.params
    const reqReserva = req.body
    try {
      reservasValidacion.validarReserva(reqReserva);
      const usuario = await this.servicioUsuario.eliminarReserva(id, reqReserva)
      await this.servicioCanchas.agregarDatos(reqReserva)
      res.status(200).json(usuario);
    }catch (error) {
      res.status(400).json(error.message);
    }
  }
}
export default ControladorReserva 