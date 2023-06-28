import ServicioUsuario from "../servicio/usuarios.js"
import ServicioCanchas from "../servicio/canchas.js"
import reservasValidacion from "../validaciones/reserasValidacion.js";


class ControladorReserva {

  constructor() {
    this.servicioCancha = new ServicioCanchas()
    this.servicioUsuario = new ServicioUsuario()
  }

  reservarCancha = async (req, res) => {
    const {id} = req.params
    const {titulo,  dia, horario } = req.body
    const reqReserva={id,titulo,dia, horario}
    const reserva = { titulo, dia, horario };
    try {
      const validacion = reservasValidacion.validarReserva(reserva);
      if (!validacion.result) {
        throw validacion.error;
      }
      const tituloCancha = await this.servicioCancha.modificarCancha(titulo, dia, horario);
      if(!tituloCancha) {
        res.status(401).json({
          message: "Cancha no encontrada",
        });
      }
      const usuario = await this.servicioUsuario.reservar(reqReserva);
      if(usuario.value==null){
        this.servicioCancha.agregarDatos(reserva)
        res.status(404).json("El usuario es null")
      }
      res.status(200).json(usuario.value);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }

  editarReserva = async (req, res) => {
    const {id} = req.params
    const { titulo, dia, horario } = req.body
    try {
      const reserva = { titulo, dia, horario };
      const validacion = reservasValidacion.validarReserva(reserva);
      if (!validacion.result) {
        throw validacion.error;
      }
      const respuesta = await this.servicioUsuario.editarReserva(id,titulo, dia, horario);
      res.status(200).send(respuesta);
    } catch (error) {
      console.error(error.message);
      res.status(400).send(error.message);
    }
  }

  eliminarReserva = async (req, res) => {
    const {id} = req.params
    const { titulo, dia, horario } = req.body
    const reqReserva={id,titulo,dia, horario}
    try {
      const respuesta = await this.servicioUsuario.eliminarReserva(reqReserva )
      await this.servicioCancha.agregarDatos(reqReserva)
      res.status(200).send(respuesta);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }


}
export default ControladorReserva 