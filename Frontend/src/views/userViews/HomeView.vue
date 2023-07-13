<script>
import {useCanchasStore} from "../../stores/canchas.js"
import {useUserStore} from "../../stores/user.js"
import TablaTurnos from '../../components/TablaTurnos.vue'

export default {
  data() {
    return {
        selectedTipo:'',
        canchas: [],
        canchaSeleccionada:null,
        reservasDisponibles:[],
        usuario:{},
        fechaActual:new Date(),
    };
  },
  created() {
    this.selectedTipo = ''// Reiniciar el valor seleccionado al crear el componente
    this.canchaSeleccionada=null
  },
  async mounted(){ 
    this.fetchCanchas();
    this.getUser();
  },

  components: {
    TablaTurnos,
  },

  methods: {
    async getUser(){
      this.usuario = await useUserStore().getUser();
    },
    fetchCanchas() {
      const canchasStore = useCanchasStore();
      canchasStore.fetchCanchas()
        .then(() => {
          this.canchas = canchasStore.canchas;
          this.canchas = this.ordenar(this.canchas);
        })
        .catch(error => {
          console.error(error);
        });
    },
    ordenar(canchas){
      for (const cancha of canchas) {
        for (const dia in cancha.reservasDisponibles.dias) {
          const horariosDia = cancha.reservasDisponibles.dias[dia];
          horariosDia.sort();
        }
      }
      return canchas;
    },
    seleccionarCancha(cancha) {
      this.reservasDisponibles.splice(0)
      for (const dia in cancha.reservasDisponibles.dias ) {
        if(this.mismoDiaOPosterior(dia)){
          this.reservasDisponibles.push({ dia, horarios: cancha.reservasDisponibles.dias[dia] })
        }
      }
      this.canchaSeleccionada = cancha;
    },
    mismoDiaOPosterior(dia) {
      const diasSemana = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"];
      const indiceDia = diasSemana.indexOf(dia);
      const indiceDiaActual = this.fechaActual.getDay();
      if(indiceDia < indiceDiaActual){
        return false
      }else{
        return true
      }
    },
    async guardarDatos(titulo,dia,horario){
      const reserva={titulo,dia,horario}
      await this.getUser();
      try {
        if(this.usuario._id!==null){
          const response = await useUserStore().reservar(reserva);
          this.usuario = response
          this.$router.push('/reservations')
        }
      } catch (error) {
        alert(error.request.response)
      }
    },
  },
};
</script>

<template>
  <button style="margin-top: 20px;" class="btn btn-secondary" @click="canchaSeleccionada = null" v-if="canchaSeleccionada!=null">Volver</button>
    <select style="margin-top: 20px;" class="btn btn-info" v-model="selectedTipo" v-if="canchaSeleccionada==null">
      <option value='' selected>Filtrar por tipo de Cancha</option>
      <option value="Cemento">Cemento</option>
      <option value="Cesped">Cesped</option>
      <option value="Ladrillo">Ladrillo</option>
    </select>
      <div class="row">
        <div class="col-sm-6" v-for="cancha in canchas" :key="cancha.titulo" v-show="!canchaSeleccionada || cancha === canchaSeleccionada">
          <br>
          <div class="card item-cancha" v-if="selectedTipo === '' || cancha.tipo === selectedTipo">
            <div class="card-lg border-primary" style="text-decoration: none; color: black;" ></div>
              <img class="card-img-top w-100 w" style="width: 640px; height: 427px;" :src="cancha.imagen" @click="seleccionarCancha(cancha)">
              <div class="card-body row">
                <h5 class="card-title col-sm-6">{{ cancha.titulo }}</h5>
                <h6 class="card-text row col-sm-6">
                  <span><b>Tipo de Cancha: </b>{{ cancha.tipo }}</span>
                </h6>
                <h6 class="card-text row" v-if="!canchaSeleccionada"> </h6>
              </div>
          </div>
        </div>
        <div class="col-sm-6">
          <TablaTurnos
            v-show="canchaSeleccionada != null"
            :canchaSeleccionada="canchaSeleccionada"
            :reservasDisponibles="reservasDisponibles"
            @guardar-datos="guardarDatos"
          />
        </div>
      </div>
  </template>

  <style>
    .item-cancha {
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
    overflow: hidden;
    transition: box-shadow 0.3s;
  }

  .item-cancha:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  .card-title{
    font-size: 24px;
    font-weight: bold;
  }
  .card-text{
    font-size: 16px;
  }
  </style>