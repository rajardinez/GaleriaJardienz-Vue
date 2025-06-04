<template>
  <nav class="navbar-custom">
    <!-- Menú lateral permanente -->
    <div class="side-menu">
      <!-- Logo compacto que muestra nombre completo al expandir -->
      <router-link to="/" class="menu-logo">
        <span class="logo-compact">GJ</span>
        <span class="logo-full">Galería Jardinez</span>
      </router-link>
      
      <!-- Items del menú con iconos y texto -->
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active">
            <i class="bi bi-house-door"></i>
            <span class="nav-text">Inicio</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/galeria" class="nav-link" active-class="active">
            <i class="bi bi-images"></i>
            <span class="nav-text">Galería</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/exposiciones" class="nav-link" active-class="active">
            <i class="bi bi-calendar-event"></i>
            <span class="nav-text">Exposiciones</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/artistas" class="nav-link" active-class="active">
            <i class="bi bi-palette"></i>
            <span class="nav-text">Artistas</span>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavbarComponent"
};
</script>

<style scoped>
/* Estructura base del navbar lateral */
.navbar-custom {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 1030;
}

/* Menú lateral compacto */
.side-menu {
  width: 70px;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: width 0.3s ease;
  overflow: hidden;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
}

.side-menu:hover {
  width: 220px;
  align-items: flex-start;
  padding-left: 15px;
}

/* Logo compacto con efecto expandible */
.menu-logo {
  display: flex;
  align-items: center;
  gap: 15px;
  color: white;
  text-decoration: none;
  margin-bottom: 30px;
  padding: 8px;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.logo-compact {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  font-weight: bold;
  font-size: 1.2rem;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.logo-full {
  font-family: 'Playfair Display', serif;
  font-weight: 600;
  font-size: 1.1rem;
  opacity: 0;
  white-space: nowrap;
  transition: opacity 0.2s ease 0.1s;
}

.side-menu:hover .logo-full {
  opacity: 1;
}

.menu-logo:hover {
  background: rgba(255, 255, 255, 0.15);
}

.menu-logo:hover .logo-compact {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

/* Items del menú */
.navbar-nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding: 0 10px;
}

.nav-link {
  color: rgba(255, 255, 255, 0.7) !important;
  padding: 10px !important;
  display: flex;
  align-items: center;
  gap: 15px;
  border-radius: 5px;
  transition: all 0.3s ease;
  white-space: nowrap;
  width: 100%;
}

.nav-link:hover,
.nav-link.active {
  color: #fff !important;
  background: rgba(255, 255, 255, 0.15);
}

.nav-link i {
  font-size: 1.2rem;
  min-width: 24px;
  text-align: center;
}

.nav-text {
  opacity: 0;
  transition: opacity 0.2s ease 0.1s;
}

.side-menu:hover .nav-text {
  opacity: 1;
}

/* Efectos responsive */
@media (max-width: 768px) {
  .side-menu {
    width: 60px;
  }
  
  .side-menu:hover {
    width: 200px;
  }
  
  .logo-full {
    font-size: 1rem;
  }
  
  .nav-link {
    padding: 8px !important;
    gap: 12px;
  }
  
  .nav-link i {
    font-size: 1rem;
  }
}
</style>