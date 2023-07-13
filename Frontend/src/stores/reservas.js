import { defineStore } from "pinia";
import { userService } from "../services/userService";
import { reservasService } from "../services/reservaService";

export const useReservaStore = defineStore('reserva', {
  state: () => ({
    reservas: [],
  }),
  actions: {
    async setReservas() {
      this.reservas = [];
      try {
        const usuarios = await this.getUsers();
        for (const usuario of usuarios) {
          if (!usuario.email.includes('@admin')) {
            for (const r of usuario.reservas) {
              let reserva = {
                idUser: usuario._id,
                username: usuario.username,
                titulo: r.titulo,
                dia: r.dia,
                horario: r.horario
              };
              this.reservas.push(reserva);
            }
          }
        }
      } catch (error) {
        throw error;
      }
    },

    async getUsers() {
      try {
        const response = await userService.getAll();
        const usuarios = response.data
        return usuarios;
      } catch (error) {
        throw error;
      }
    },
    
    async eliminarReservaAdmin(reserva) {
      try {
        // Borrar del back
        console.log(reserva);
        const reservaBackend = {
          titulo:reserva.titulo,
          dia:reserva.dia,
          horario:reserva.horario
        }
        const response = await reservasService.eliminarReserva(reserva.idUser, reservaBackend);
        
        // Borrar del front
        if (response) {
          this.setReservas();
        }
      } catch (error) {
        throw error;
      }
    }
  },

  getters: {
    getReservas() {
      return this.reservas;
    }
  }
});
