<template>
  <div v-if="canchaSeleccionada != null"  class="table-responsive">
  
    <table class="table">
      <thead>
        <tr>
          <th class="text-center">Turnos Disponibles</th>
        </tr>
      </thead>
      <tbody class="text-justify" v-for="dia in reservasDisponibles">
        <tr>
          <th>{{ dia.dia }}:</th>
          <td v-for="horario in dia.horarios" :key="horario">
            <button class="btn btn-primary" @click="guardarDatos(canchaSeleccionada.titulo, dia.dia, horario)">
              {{ horario }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  </template>
  
  <script>
import {useUserStore} from "../stores/user.js"



  export default {
    props: {
      canchaSeleccionada: {
        type: Object,
        default: null
      },
      reservasDisponibles: {
        type: Array,
        default: []
      }
    },
    methods: {
      guardarDatos(titulo, dia, horario) {
        this.$emit("guardar-datos", titulo, dia, horario );
      },

      async reservar(titulo, dia, horario) {
      const reserva = {
        titulo: titulo,
        dia: dia,
        horario: horario
      }

      try {
        const response = await useUserStore().reservar(reserva);
        // Hacer algo con la respuesta, si es necesario
        console.log("Reserva exitosa:", response);
        // Por ejemplo, redirigir a una página de reservas
        this.$router.push("/reservations");
      } catch (error) {
        // Manejar el error en caso de que ocurra
        console.error("Error al reservar:", error);
      }
    }
  }
}
  </script>
  
  <style>
  /* Estilos CSS si es necesario */
  </style>
  