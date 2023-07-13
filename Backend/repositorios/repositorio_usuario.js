import Usuario from '../clases/usuario.js';
import ConexionMongo from './conexionMongoDb.js';
import { DatabaseError } from '../errores.js';

class UsuarioRepositorio {
  constructor() {
    this.usuariosCollection = null;
    this.init();
  }

  async init() {
    try {
      const conexionMongo = ConexionMongo.instance; // Obtener la instancia existente
      if (conexionMongo) {
        // Verificar si ya existe una instancia de conexión
        this.usuariosCollection = conexionMongo.usuariosColeccion();
      } else {
        // Si no existe una instancia, crear una nueva
        const nuevaConexionMongo = new ConexionMongo();
        await nuevaConexionMongo.conectar();
        this.usuariosCollection = nuevaConexionMongo.usuariosColeccion();
      }
    } catch (error) {
      console.error(error);
    }
  }

    async registro(usuario) {
        try {
            const newUser = new Usuario(usuario.username, usuario.email, usuario.contrasenia);
            await this.usuariosCollection.insertOne(newUser);
            return newUser;
        } catch (error) {
            throw new DatabaseError("Error al registrar usuario: " + error);
        }
    }

    async buscarEmail(email){
        return await this.usuariosCollection.findOne({ email: email });
    }


    async buscarUsername(username){
      return await this.usuariosCollection.findOne({ username: username });
    }

    async editarUsuario(datos, filter) {
      try {

        const datosAEditar = { $set: { } };      
        if (datos.contrasenia !== undefined) {
          datosAEditar.$set.contrasenia = datos.contrasenia;
        }
        if (datos.username !== undefined) {
          datosAEditar.$set.username = datos.username;
        }
        if(datos.debe !== undefined){
          datosAEditar.$set.debe = parseFloat(datos.debe);
        }
        const usuarioEditado = await this.usuariosCollection.findOneAndUpdate(filter, datosAEditar, { returnDocument: "after" });
        return usuarioEditado.value;
      } catch (error) {
        throw new DatabaseError("Error al editar usuario: " + error);
      }
    }
    
    
    async eliminarCuenta(filter) {
        try {
            const usuarioEliminado = await this.usuariosCollection.findOneAndDelete(filter);
            return usuarioEliminado.value
        }catch (error) {
            throw new DatabaseError("Error al eliminar usuario: " + error);
        }
    };

    async getAll(){
        try {
          const result = await this.usuariosCollection.find().toArray();
          return result
        } catch (error) {
          throw new DatabaseError(error);
        }
      } 

      async obtenerUsuario(idUsuario) {
        try {
            const usuario = await this.usuariosCollection.findOne(idUsuario);
            return usuario
        } catch (error) {
          throw new DatabaseError("Error al obtener usuario: " + error);
        }
    };
      
    async guardarReserva(filter,newReserva) {
        try {
          const usuario = await this.usuariosCollection.findOneAndUpdate(
            filter,
            { $push: { reservas: newReserva } },
            { returnDocument: "after" }
          );
          return usuario.value;
        } catch (error) {
          throw new DatabaseError("Error al reservar: " + error);
        }
      }

      async eliminarReserva(filter, reservaAEliminar) {
        try {
          const usuario = await this.usuariosCollection.findOneAndUpdate(
            filter,
            { $pull: { reservas: reservaAEliminar } },
            { returnDocument: "after" }
          );
          return usuario.value;
        } catch (error) {
          throw new DatabaseError("Error al eliminar reserva: " + error);
        }
      }
      
      async multar(filter) {
        await this.usuariosCollection.findOneAndUpdate(
          filter,
          { $inc: { debe: 2000 } },
          { returnDocument: "after" }
        );
      }
      
}

export default UsuarioRepositorio;

