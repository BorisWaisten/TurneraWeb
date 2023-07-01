import ModelUsuario from "../repositorios/repositorio_usuario.js"
import { ObjectId } from 'mongodb';
import  ServicioCanchas  from "./canchas.js"
import usuarioValidacion from "../validaciones/usuarioValidacion.js";

class ServicioUsuario{

    constructor() {
        this.model = new ModelUsuario()
        this.servicioCanchas = new ServicioCanchas()
      }

      registro = async (usuario) => {
        try {
          const validarEmail = await this.model.buscarEmail(usuario.email)
          const validarUsername = await this.model.buscarUsername(usuario.username)
          if (validarEmail){
            throw new Error("El email " + usuario.email + " ya se encuentra registrado!")
          } 
          if (validarUsername) {
            throw new Error("El username " + usuario.username + " ya se encuentra registrado!")
          }
          const newUser = await this.model.registro(usuario)
          return newUser;
        } catch (error) {
          throw new Error(error);
        }
      };

      login = async (usuario) => {
        try {
          const usuarioLogin = await this.model.buscarEmail(usuario.email);
          if (!usuarioLogin) {
            throw new Error("El email " + usuario.email + " no se encuentra registrado!");
          }
          if (usuarioLogin.contrasenia !== usuario.contrasenia) {
            throw new Error("Contraseña incorrecta");
          }
          return usuarioLogin;
        } catch (error) {
          throw new Error(error);
        }
      };

      obtenerUsuario = async (id) => {
        try {
          const idUsuario = new ObjectId(id)
          const usuario = await this.model.obtenerUsuario(idUsuario);
          if (!usuario) {
            throw new Error("Usuario no encontrado")
          }
          return usuario;
        } catch (error) {
          throw new Error(error);
        }
      }

      editarUsuario = async (id, datos) => {
        try {
          const usuario = this.obtenerUsuario(id)
          const filter = {_id:new ObjectId(id)}
          const respuesta = await this.model.editarUsuario(usuario, datos, filter)
          console.log(respuesta);
          if(!respuesta){
            throw new Error("No se pudo editar el usuario")
          }
          return respuesta
        } catch (error) {
          throw new Error(error);
        }
      };

      eliminarCuenta = async (id) => {
        const filter = {_id:new ObjectId(id)}
        try {
          const usuarioEliminado = await this.model.eliminarCuenta(filter)
          if (!usuarioEliminado) {
            throw new Error("El id que esta pasando no corresponde a un usuario registrado")
        }
        console.log("La cuenta con el email " + usuarioEliminado.email +" ha sido borrada correctamente");
        return usuarioEliminado
        } catch (error) {
          throw new Error(error);
        }
      };

      getAll= async () => {
        try {
          const listaUsuarios = await this.model.getAll()
          return listaUsuarios
        } catch (error) {
          throw new Error(error);
        }
      }

      //Logica reservar
      reservar = async (id, reqReserva) => {
        try {
          await this.puedeReservar(id, reqReserva.dia)
          const usuarioActualizado = await this.model.guardarReserva(id,reqReserva)
          if(!usuarioActualizado){
            this.servicioCanchas.agregarDatos(reqReserva)
            throw new Error("No se pudo guardar la reserva")
          }
          return usuarioActualizado
        } catch (error) {
          throw new Error(error);
        }
      }

      puedeReservar = async (id, dia) => {
        try {
          const usuario = await this.obtenerUsuario(id)
          await usuarioValidacion.puedeReservar(usuario,dia);
        } catch (error) {
          throw new Error(error);
        }
      }
      
      //Logica Eliminar Reservas
      eliminarReserva = async (reqReserva ) => {
        const filter = new ObjectId(reqReserva.id)
        try {
          const tieneMulta = await usuarioValidacion.multar(reqReserva.dia,reqReserva.horario)
          if (tieneMulta) {
            await this.model.multar(filter);
          }
          const usuario = await this.model.eliminarReserva(filter,reqReserva)
          if(!usuario){
            throw new Error("Reserva no encontrada");
          }
          await this.servicioCanchas.agregarDatos(reqReserva)
          console.log(respuesta);
          return respuesta
        } catch (error) {
          throw new Error(error);
        }
      }    
}
export default ServicioUsuario
