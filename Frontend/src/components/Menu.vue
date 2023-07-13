<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <RouterLink class="navbar-brand" :to="getNavigationRoute()">
      <img src="../assets/IconoTT.jpg" class="logo" alt="Logo" />
      <span class="brand-text">TurneraTenis</span>
    </RouterLink>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item" v-if="mostrarPagar">
          <RouterLink class="nav-link" to="/payment">
            <button class="btn btn-outline-secondary">Pagar</button>
          </RouterLink>
        </li>
        <li class="nav-item" v-if="usuario.username !== ''">
          <RouterLink
            class="nav-link"
            to="/reservations"
            v-if="!usuario.email.includes('@admin')"
          >
            <button class="btn btn-info" @click="mostrarBotonPagar">
              Mis Reservas
            </button>
          </RouterLink>
        </li>
        <li v-if="usuario.username !== ''" class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            role="button"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            <h4 class="btn btn-username">{{ usuario.username }}</h4>
          </a>
          <div class="dropdown-menu dropdown-menu-right">
            <RouterLink to="/editProfile" class="dropdown-item">
              <button class="btn btn-info btn-block">Editar Perfil</button>
            </RouterLink>
            <div class="dropdown-divider"></div>
            <RouterLink to="/" class="dropdown-item">
              <button @click="logout" class="btn btn-outline-info btn-block">
                Cerrar Sesión
              </button>
            </RouterLink>
          </div>
        </li>
      </ul>
      <div
        class="d-flex align-items-center my-2 my-lg-0"
        v-if="usuario.username === ''"
      >
        <RouterLink to="/login">
          <button class="btn btn-warning mr-3">Iniciar Sesión</button>
        </RouterLink>
        <RouterLink to="/register">
          <button class="btn btn-warning">Registrarse</button>
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, computed, onMounted, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useUserStore } from "../stores/user.js";

export default {
  setup() {
    const store = useUserStore();
    const usuario = computed(() => store.usuario);
    const mostrarPagar = ref(false);
    const route = useRoute();

    const mostrarBotonPagar = () => {
      mostrarPagar.value = true;
    };

    const getNavigationRoute = () => {
      if (
        usuario.value &&
        usuario.value.email &&
        usuario.value.email.includes("@admin")
      ) {
        return "/admin";
      } else {
        return "/";
      }
    };

    const logout = () => {
      store.logout();
    };

    onMounted(() => {
      mostrarPagar.value =
        route.path === "/payment" || route.path === "/reservations";
    });

    watch(route, () => {
      mostrarPagar.value =
        route.path === "/payment" || route.path === "/reservations";
    });

    /*Por supuesto, puedo explicarte los cambios realizados y cómo funciona la lógica añadida.

    En primer lugar, se agregó el gancho `onMounted` para ejecutar código cuando el componente se monta por primera vez.
    Dentro de este gancho, se verifica si la ruta actual es "/payment" o "/reservations" utilizando `route.path`.
    Si es una de esas dos rutas, se establece la variable `mostrarPagar` en `true` para mostrar el botón "Pagar".

    Además, se agregó el gancho `watch` para detectar cualquier cambio en la ruta. Cada vez que la ruta cambia, 
    se ejecuta la función de devolución de llamada proporcionada. En este caso, se verifica si la nueva ruta es "/payment" o "/reservations" 
    y se actualiza la variable `mostrarPagar` en consecuencia.

    La variable `mostrarPagar` se utiliza en la plantilla para controlar la visibilidad del botón "Pagar". 
    Si su valor es `true`, el botón se muestra; de lo contrario, se oculta.

    En resumen, el código añadido utiliza los ganchos `onMounted` y `watch` para actualizar dinámicamente la variable `mostrarPagar`
    basándose en la ruta actual. Esto asegura que el botón "Pagar" se muestre solo cuando el usuario se encuentre 
    en las vistas "payment" o "reservations" y se oculte en cualquier otra vista.*/

    return {
      mostrarPagar,
      usuario,
      mostrarBotonPagar,
      getNavigationRoute,
      logout,
    };
  },
};
</script>

<style scoped>
.navbar {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  width: 50px;
  height: 50px;
}

.brand-text {
  font-size: 20px;
  margin-left: 10px;
}

.nav-link {
  color: #000;
}

.dropdown-toggle::after {
  display: none;
}

.dropdown-item {
  color: #000;
}

.dropdown-item:hover,
.dropdown-item:focus {
  background-color: #f0f0f0;
}

.btn-info {
  background-color: #2196f3;
  border-color: #2196f3;
}

.btn-outline-info {
  background-color: transparent;
  border-color: #2196f3;
  color: #2196f3;
}

.btn-outline-info:hover,
.btn-outline-info:focus {
  background-color: #2196f3;
  color: #fff;
}

.btn-warning {
  background-color: #ff9800;
  border-color: #ff9800;
}

.btn-warning:hover,
.btn-warning:focus {
  background-color: #fb8c00;
  border-color: #fb8c00;
}

.btn-username {
  background-color: #2196f3;
  color: #fff;
  width: 100px;
}

.btn-username:hover {
  background-color: #0727bb;
  color: #fff;
}
</style>
