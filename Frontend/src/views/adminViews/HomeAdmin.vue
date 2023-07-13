  <template>
  <div>
    <button style="margin-top: 20px;" class="btn btn-secondary" @click="canchaSeleccionada = null" v-if="canchaSeleccionada != null">Volver</button>
    <select style="margin-top: 20px;" class="btn btn-info" v-model="selectedTipo" v-if="canchaSeleccionada == null">
      <option value="" selected>Filtrar por tipo de Cancha</option>
      <option value="Cemento">Cemento</option>
      <option value="Cesped">Cesped</option>
      <option value="Ladrillo">Ladrillo</option>
    </select>
    <div class="row">
      <div class="col-sm-6" v-for="cancha in canchas" :key="cancha.titulo" v-show="!canchaSeleccionada || cancha === canchaSeleccionada">
        <br>
        <div class="card item-cancha" v-if="selectedTipo === '' || cancha.tipo === selectedTipo">
          <div class="card-lg border-primary" style="text-decoration: none; color: black;"></div>
          <img class="card-img-top w-100 w" style="width: 640px; height: 427px;" :src="cancha.imagen" @click="mostrarReservas(cancha)">
          <div class="card-body row">
            <h5 class="card-title col-sm-6">{{ cancha.titulo }}</h5>
            <h6 class="card-text row col-sm-6">
              <span><b>Tipo de Cancha: </b>{{ cancha.tipo }}</span>
            </h6>
          </div>
        </div>
      </div>

      <TablaReservas
        v-if="canchaSeleccionada"
        :canchaSeleccionada="canchaSeleccionada"
      />

    </div>
  </div>
</template>

<script>
import { useReservaStore } from "../../stores/reservas.js";
import { useCanchasStore } from "../../stores/canchas.js";
import TablaReservas from "../../components/TablaReservas.vue";

export default {
  data() {
    return {
      usuarios:[],
      selectedTipo: "",
      canchas: [],
      canchaSeleccionada: null,
      reservas: [],
    };
  },
  created() {
    this.selectedTipo = ""; // Reiniciar el valor seleccionado al crear el componente
    this.canchaSeleccionada = null;
  },
  mounted() {
    this.fetchCanchas();
    this.setReservas()
  },
  components: {
    TablaReservas,
  },
  methods: {
    async setReservas(){
      const reservaStore = useReservaStore();
      await reservaStore.setReservas(); 
    },
    fetchCanchas() {
      const canchasStore = useCanchasStore();
      canchasStore.fetchCanchas()
      .then(() => {
        this.canchas = canchasStore.canchas;
        this.canchas = this.ordenarCanchas(this.canchas);
      })
      .catch(error => {
        console.error(error);
      });
    },
    ordenarCanchas(canchas) {
    return canchas.sort((a, b) => a.titulo.localeCompare(b.titulo));
  },
    mostrarReservas(cancha){
      if(!this.canchaSeleccionada && this.canchaSeleccionada !== cancha ){
        this.canchaSeleccionada = cancha;
      }
    },
  },
};
</script>

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

.card-title {
  font-size: 24px;
  font-weight: bold;
}

.card-text {
  font-size: 16px;
}
</style>
