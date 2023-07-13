<script>
import { useUserStore } from "../../stores/user.js";

export default {
    data() {
        return {
            usuario:{},
        }
        
    },
    async mounted() {
        this.usuario = await useUserStore().getUser();
    },

    methods:{
        async pagarReservas(){
            const usuario = {debe:0}
            const res = await useUserStore().cambioDePerfil(usuario);
            if (res) {
                this.$router.push("/")
            }else{
                alert("El Pago no se pudo realizar")
            }
        }
    }
}  
</script>

<template>
    <br>
    <h2>Pago de reservas</h2>
    <br>
    <h6>El monto total a pagar es de: ${{usuario.debe}}</h6>
    <br>
    <button type="submit" class="btn btn-primary" v-if="usuario.debe>0" @click="pagarReservas">Pagar</button>
</template>