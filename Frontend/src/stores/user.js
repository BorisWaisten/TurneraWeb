import { defineStore } from "pinia";
import { userService } from "../services/userService.js";
import { reservasService } from "../services/reservaService.js";

export const useUserStore = defineStore("usuario", {
  state: () => {
    return {
      listaUsuarios: [],
      usuario: {
        _id: null,
        username: "",
      },
      error: "",
    };
  },

  actions: {
    async getAll() {
      try {
        const response = await userService.getAll();
        for (const u of response.data) {
          if (!u.email.includes("@admin")) {
            this.listaUsuarios.push(u);
          }
        }
        return this.listaUsuarios;
      } catch (error) {
        console.log(error);
      }
    },
    async login(credenciales) {
      try {
        const response = await userService.login(credenciales);
        this.usuario = response.data;
        return this.usuario;
      } catch (error) {
        alert("Email y/o contraseña es incorrecto!");
        throw error;
      }
    },

    async register(usuario) {
      try {
        const response = await userService.register(usuario);
        this.usuario = response.data;
        return this.usuario;
      } catch (error) {
        console.error("Error en el registro:", error);
        throw error;
      }
    },

    async getUser() {
      try {
        if (this.usuario._id == null) {
          response = await userService.getUser(this.usuario._id);
          this.usuario = response.data;
        }
        return this.usuario;
      } catch (error) {
        throw error;
      }
    },

    async reservar(reserva) {
      try {
        const response = await reservasService.reservar(
          this.usuario._id,
          reserva
        );
        this.usuario = response.data;
        return this.usuario;
      } catch (error) {
        throw error;
      }
    },

    async eliminarReserva(reserva) {
      try {
        const response = await reservasService.eliminarReserva(
          this.usuario._id,
          reserva
        );
        this.usuario = response.data; // Acceder al usuario actualizado
        return this.usuario;
      } catch (error) {
        throw error;
      }
    },

    actualizarUsuarios(usuario) {
      // Filtrar usuarios duplicados y mantener solo un usuario por ID
      const usuariosUnicos = {};
      if (this.listaUsuarios.length > 0) {
        for (const u of this.listaUsuarios) {
          if (!usuariosUnicos[u._id]) {
            usuariosUnicos[u._id] = u;
          }
        }
      } else {
        console.log("No hay usuarios");
      }

      // Reemplazar el usuario existente con el usuario actualizado
      usuariosUnicos[usuario._id] = usuario;

      // Actualizar la lista de usuarios con los usuarios únicos
      this.listaUsuarios = Object.values(usuariosUnicos);
    },

    async cambioDePerfil(usuarioAEditar) {
      try {
        const response = await userService.cambioDePerfil(
          this.usuario._id,
          usuarioAEditar
        );
        this.usuario = response.data;
        return this.usuario;
      } catch (error) {
        throw error;
      }
    },

    async borrarCuenta() {
      try {
        const res = await userService.borrarCuenta(this.usuario._id);
        this.logout();
        return res;
      } catch (error) {
        console.error("Error al eliminar la cuenta:", error);
      }
    },

    logout() {
      return (this.usuario = {
        _id: null,
        username: "",
        email: "",
        contrasenia: "",
        reservas: [],
      });
    },
  },
});
