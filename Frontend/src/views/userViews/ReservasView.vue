<script>
import { useCanchasStore } from "../../stores/canchas.js";
import { useUserStore } from "../../stores/user.js";
export default {
  data() {
    return {
      user: {
        username: "",
        email: "",
        contrasenia: "",
        reservas: [],
      },
      canchas: [],
    };
  },
  async mounted() {
    this.fetchCanchas();
    this.getUser();
  },
  methods: {
    async getUser() {
      this.user = await useUserStore().getUser();
    },

    fetchCanchas() {
      const canchasStore = useCanchasStore();
      canchasStore
        .fetchCanchas()
        .then(() => {
          this.canchas = canchasStore.canchas;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    getCanchaByTitulo(titulo) {
      return this.canchas.find((cancha) => cancha.titulo === titulo);
    },
    getCanchaImagen(titulo) {
      const cancha = this.getCanchaByTitulo(titulo);
      return cancha ? cancha.imagen : "";
    },
    getTipoCancha(titulo) {
      const cancha = this.getCanchaByTitulo(titulo);
      return cancha ? cancha.tipo : "";
    },
    async eliminarReserva(titulo, dia, horario) {
      //que se fije también por hora
      const reserva = {
        titulo: titulo,
        dia: dia,
        horario: horario,
      };
      let mensaje =
        this.getDiferenciaDias(dia) == 0
          ? "¿Estás seguro de que deseas eliminar esta reserva?\n\n Se le cobrará una multa de $2000 por cancelar la reserva con menos de un día de anticipación."
          : "¿Estás seguro de que deseas eliminar esta reserva?";
      if (confirm(mensaje)) {
        try {
          this.user = await useUserStore().eliminarReserva(reserva);
        } catch (error) {
          console.log(error);
        }
      }
    },

    puedeCancelar(dia) {
      // Verificar si el parámetro 'dia' está presente
      if (!dia) {
        return false;
      }

      const hoy = new Date();
      const diaSemanaHoy = hoy.getDay() + 1;
      const diaSemanaReserva = this.obtenerNumeroDia(dia);

      // Verificar si el día proporcionado es válido
      if (diaSemanaReserva === -1) {
        return false;
      }
      let diferenciaDias = this.getDiferenciaDias(dia);

      // Verificar si la diferencia está dentro de los próximos 7 días
      return diferenciaDias > 1 && diferenciaDias <= 7;
    },

    getDiferenciaDias(dia) {
      const hoy = new Date();
      const diaSemanaHoy = hoy.getDay() + 1;
      const diaSemanaReserva = this.obtenerNumeroDia(dia);
      // Verificar si el día proporcionado es válido
      if (diaSemanaReserva === -1) {
        return false;
      }
      let diferenciaDias = diaSemanaReserva - diaSemanaHoy;
      return diferenciaDias;
    },
    obtenerNumeroDia(dia) {
      const diasSemana = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miercoles",
        "Jueves",
        "Viernes",
        "Sábado",
      ];

      const indice = diasSemana.indexOf(dia);
      // Si se encuentra el día en el array, se devuelve el índice + 1
      // para que el Domingo sea 1 y el Sábado sea 7
      if (indice !== -1) {
        return indice + 1;
      } else {
        return -1; // Si el día no se encuentra, se devuelve -1
      }
    },
  },
};
</script>

<template>
  <div>
    <h1 class="titulo-seccion">Reservas realizadas</h1>
    <ul class="lista-reservas" v-if="user.reservas.length > 0">
      <li
        class="item-reserva"
        v-for="(reserva, index) in user.reservas"
        :key="reserva._id"
      >
        <div class="reserva">
          <div class="reserva-info">
            <p class="reserva-label">Reserva {{ index + 1 }}</p>
            <p class="reserva-dia">Día: {{ reserva.dia }}</p>
            <p class="reserva-horario">Horario: {{ reserva.horario }}</p>
          </div>
          <div class="cancha-info">
            <div class="cancha-image">
              <img
                :src="getCanchaImagen(reserva.titulo)"
                :alt="reserva.titulo"
              />
            </div>
            <div class="cancha-details">
              <p class="cancha-title">{{ reserva.titulo }}</p>
              <p class="cancha-type">
                Tipo: {{ getTipoCancha(reserva.titulo) }}
              </p>
            </div>
            <div class="eliminar-container">
              <button
                class="eliminar-btn"
                @click="
                  eliminarReserva(reserva.titulo, reserva.dia, reserva.horario)
                "
              >
                Eliminar reserva
              </button>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <p v-else class="sin-reservas">No hay reservas.</p>
  </div>
</template>

<style>
.lista-reservas {
  list-style-type: none;
  padding: 0;
}

.item-reserva {
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  overflow: hidden;
  transition: box-shadow 0.3s;
}

.item-reserva:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.titulo-seccion {
  margin: 30px 0;
  font-size: 24px;
  font-weight: bold;
  color: #333333;
  text-transform: uppercase;
}

.reserva {
  display: flex;
  align-items: center;
}

.reserva-info {
  flex: 1;
  padding: 20px;
}

.reserva-label {
  font-size: 16px;
  font-weight: bold;
  color: #555555;
  margin-bottom: 10px;
}

.reserva-dia,
.reserva-horario {
  margin-bottom: 5px;
}

.cancha-info {
  margin-left: auto;
  display: flex;
  align-items: center;
}

.cancha-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 20px;
}

.cancha-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cancha-details {
  flex: 1;
}

.cancha-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}

.cancha-type {
  font-size: 14px;
  color: #888888;
}

.eliminar-container {
  display: fixed;
  align-items: center;
  margin-left: auto;
  padding-right: 30px;
  margin-left: 50px;
}

.eliminar-btn {
  background-color: #f44336;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.eliminar-btn i {
  margin-right: 5px;
}
</style>
