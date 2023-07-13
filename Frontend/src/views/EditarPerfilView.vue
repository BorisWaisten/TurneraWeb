<script>
import { useUserStore } from "../stores/user.js";

export default {
  data() {
    return {
      usuario: {},
      usuarioNuevo: {
        username: "",
        contrasenia: "",
      },
    };
  },
  async mounted() {
    this.getUser();
  },

  methods: {
    async getUser() {
      this.usuario = await useUserStore().getUser();
    },

    async borrarCuenta() {
      if (confirm("Esta seguro que desea borrar esta cuenta?")) {
        const res = await useUserStore().borrarCuenta();
        console.log(res);
        if (res) {
          this.$router.push("/");
        }
      }
    },

    async cambioDePerfil() {
      const userStore = useUserStore();
      const usuarioEditado = {
        username: "",
        contrasenia: "",
      };
      if (this.usuarioNuevo.username) {
        usuarioEditado.username = this.usuarioNuevo.username;
      } else {
        delete usuarioEditado.username;
      }
      if (this.usuarioNuevo.contrasenia) {
        usuarioEditado.contrasenia = this.usuarioNuevo.contrasenia;
      } else {
        delete usuarioEditado.contrasenia;
      }

      if (usuarioEditado == {}) {
        alert("Completa los campos por favor");
      } else {
        try {
          const response = await userStore.cambioDePerfil(usuarioEditado);
          this.usuario = response;
          this.$router.push("/");
        } catch (error) {
          console.log(error.response);
        }
      }
    },
  },
};
</script>

<template>
  <br />
  <h2>Edición de perfil</h2>
  <br />
  <form @submit.prevent="cambioDePerfil()">
    <div class="form-group">
      <label for="exampleInputEmail1">Username</label>
      <input
        type="text"
        v-model="this.usuarioNuevo.username"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
      />
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input
        type="password"
        v-model="this.usuarioNuevo.contrasenia"
        class="form-control"
        id="exampleInputPassword1"
      />
    </div>
    <button type="submit" class="btn btn-primary">Guardar</button>

    <button class="btn btn-danger" @click="borrarCuenta()">
      Eliminar Cuenta
    </button>
  </form>
</template>
