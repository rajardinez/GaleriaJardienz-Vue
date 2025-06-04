<template>
  <nav class="navbar navbar-expand-lg navbar-custom">
    <div class="container">
      <!-- Logo o nombre del sitio -->
      <router-link to="/" class="navbar-brand">
        <span class="logo-text">Galería Jardinez</span>
        <span class="logo-subtext">Arte Contemporáneo</span>
      </router-link>

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
            <router-link to="/" class="nav-link" active-class="active">
              <i class="bi bi-house-door"></i> Inicio
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/galeria" class="nav-link" active-class="active">
              <i class="bi bi-images"></i> Galería
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/exposiciones" class="nav-link" active-class="active">
              <i class="bi bi-calendar-event"></i> Exposiciones
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/artistas" class="nav-link" active-class="active">
              <i class="bi bi-palette"></i> Artistas
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavbarComponent",
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const navbar = this.$el; // Usamos la referencia al elemento raíz del componente
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
    }
  }
};
</script>

<style scoped>
.navbar-custom {
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  padding: 0.8rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.navbar-custom.scrolled {
  background: rgba(0, 0, 0, 0.95);
  padding: 0.5rem 0;
}

.navbar-brand {
  display: flex;
  flex-direction: column;
  font-family: 'Playfair Display', serif;
  padding: 0.5rem 0;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: 1px;
}

.logo-subtext {
  font-size: 0.7rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 2px;
  text-transform: uppercase;
}

.nav-link {
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8) !important;
  margin: 0 0.5rem;
  padding: 0.8rem 1rem !important;
  border-radius: 4px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-link:hover, .nav-link:focus {
  color: #fff !important;
  background: rgba(255, 255, 255, 0.1);
}

.nav-link.active {
  color: #fff !important;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.15);
}

.navbar-toggler {
  border: none;
  padding: 0.5rem;
}

.navbar-toggler:focus {
  box-shadow: none;
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000px' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 0.8)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}


/* Responsive */
@media (max-width: 992px) {
  .navbar-collapse {
    background: rgba(0, 0, 0, 0.95);
    padding: 1rem;
    margin-top: 0.5rem;
    border-radius: 8px;
  }
  
  .nav-link {
    margin: 0.2rem 0;
    padding: 0.8rem !important;
  }
}

@media (max-width: 576px) {
  .logo-text {
    font-size: 1.3rem;
  }
  
  .logo-subtext {
    font-size: 0.6rem;
  }
}
</style>