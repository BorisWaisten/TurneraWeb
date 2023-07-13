<script>
import { useUserStore } from "../stores/user.js";


export default {
  data() {
    return {
      usuario:{
        email: '',
        contrasenia: '',
      }
    };
  },
  methods: {
    async login() {
      const userStore = useUserStore();
      const credentials = {
        email: this.usuario.email,
        contrasenia: this.usuario.contrasenia
      };

      await userStore.login(credentials);
      if (this.usuario.email.includes('@admin')) {
        this.$router.push('/admin');
      } else {
        this.$router.push('/');
      }
    },
  },
};
</script>

<template>
  <h1>Login</h1>
  <form @submit.prevent="login()">
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input
        v-model="usuario.email"
        type="email"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        required
      />
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input
        v-model="usuario.contrasenia"
        type="password"
        class="form-control"
        id="exampleInputPassword1"
        required
      />
    </div>
    <button type="submit" class="btn btn-primary">Login</button>
  </form>
</template>

<style></style>
