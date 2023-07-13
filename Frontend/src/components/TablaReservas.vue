<template>
  <div class="col-6">
    <h3>Reservas</h3>
    <table class="table">
      <thead>
        <tr>
          <th>Día</th>
          <th>Horario</th>
          <th>Usuario</th>
          <th>Eliminar Reserva</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="reserva in reservas" :key="reserva.id">
          <td>{{ reserva.dia }}</td>
          <td>{{ reserva.horario }}</td>
          <td>{{ reserva.username }}</td>
          <td class="d-flex justify-content-center align-items-center">
            <button class="btn-danger" @click="confirmEliminarReserva(reserva)">
              X
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { computed } from "vue";

import { useReservaStore } from "../stores/reservas.js";

export default {
  props: {
    canchaSeleccionada: {
      type: Object,
      required: true,
    },
  },

  methods: {
    confirmEliminarReserva(reserva) {
      if (confirm("¿Estás seguro de eliminar la reserva?")) {
        this.eliminarReservaAdmin(reserva);
      }
    },
  },

  setup(props) {
    const reservaStore = useReservaStore();
    const { eliminarReservaAdmin } = reservaStore;

    // Filtrar las reservas basadas en el título de la reserva y la cancha seleccionada
    const reservasFiltradas = computed(() => {
      const tituloCanchaSeleccionada = props.canchaSeleccionada.titulo;

      return reservaStore.reservas.filter(
        (reserva) => reserva.titulo === tituloCanchaSeleccionada
      );
    });

    const reservasOrdenadas = computed(() => {
      return reservasFiltradas.value.slice().sort((a, b) => {
        // Compara los días
        const compareDia = a.dia.localeCompare(b.dia);

        if (compareDia === 0) {
          // Si los días son iguales, compara los horarios
          return a.horario.localeCompare(b.horario);
        }

        return compareDia;
      });
    });

    return {
      reservas: reservasOrdenadas,
      eliminarReservaAdmin,
    };
  },
};
</script>

<style>
/* Estilos CSS si es necesario */
</style>
