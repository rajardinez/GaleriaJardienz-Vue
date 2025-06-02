<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
    <div class="container">
      <!-- Logo o nombre del sitio -->
      <router-link to="/" class="navbar-brand">Galería Jardinez</router-link>

      <!-- Botón para móviles -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Menú de navegación -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active">Inicio</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/galeria" class="nav-link" active-class="active">Galería</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/exposiciones" class="nav-link" active-class="active">Exposiciones</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/artistas" class="nav-link" active-class="active">Artistas</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavbarComponent",
};
</script>

<style scoped>
.navbar {
  padding: 1rem 0;
}
.nav-link {
  font-weight: 500;
}
.nav-link.active {
  color: #fff !important;
  font-weight: bold;
}

/* Para hacer el logo más pequeño en móviles */
@media (max-width: 768px) {
  .navbar-brand img {
    height: 30px !important;
  }
}
</style>