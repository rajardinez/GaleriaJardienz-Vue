<template>
  <div class="pagina-exposiciones">
    <!-- Hero Section -->
    <div class="hero-exposiciones">
      <div class="hero-content text-center text-white">
        <h1 class="display-4 fw-bold">Próximas Exposiciones</h1>
        <p class="lead">Descubre nuestras muestras artísticas</p>
      </div>
    </div>

    <!-- Galería de Exposiciones -->
    <div class="container py-5">
      <div class="row">
        <div 
          class="col-lg-4 col-md-6 mb-4" 
          v-for="(exposicion, index) in exposiciones" 
          :key="index"
        >
          <div class="card h-100 shadow-sm">
            <img 
              :src="exposicion.imagen" 
              class="card-img-top img-exposicion" 
              :alt="exposicion.titulo"
              @click="mostrarDetalle(exposicion)"
              style="cursor: pointer;"
            >
            <div class="card-body">
              <h5 class="card-title">{{ exposicion.titulo }}</h5>
              <p class="card-text text-muted">
                <i class="bi bi-calendar-event"></i> {{ exposicion.fecha }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Detalle -->
    <div class="modal fade" id="modalExposicion" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ exposicionSeleccionada.titulo }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6">
                <img 
                  :src="exposicionSeleccionada.imagen" 
                  class="img-fluid rounded"
                  :alt="exposicionSeleccionada.titulo"
                >
              </div>
              <div class="col-md-6">
                <p><strong><i class="bi bi-calendar-date"></i> Fecha:</strong> {{ exposicionSeleccionada.fecha }}</p>
                <p><strong><i class="bi bi-clock"></i> Horario:</strong> {{ exposicionSeleccionada.horario }}</p>
                <p><strong><i class="bi bi-geo-alt"></i> Lugar:</strong> {{ exposicionSeleccionada.lugar }}</p>
                <p><strong><i class="bi bi-person"></i> Artista:</strong> {{ exposicionSeleccionada.artista }}</p>
                <p><strong><i class="bi bi-info-circle"></i> Descripción:</strong></p>
                <p>{{ exposicionSeleccionada.descripcion }}</p>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-primary" @click="reservarAsistencia">
              <i class="bi bi-ticket-perforated"></i> Reservar Asistencia
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="redes-sociales mt-5 py-4 bg-light">
        <div class="container text-center">
            <h3 class="mb-4">Síguenos en redes</h3>
            <div class="d-flex justify-content-center gap-4">
            <a href="https://www.facebook.com/profile.php?id=100077362615775" target="_blank" class="red-social">
                <i class="bi bi-facebook"></i>
            </a>
            <a href="https://instagram.com/tupagina" target="_blank" class="red-social">
                <i class="bi bi-instagram"></i>
            </a>
            <a href="https://youtube.com/tupagina" target="_blank" class="red-social">
                <i class="bi bi-youtube"></i>
            </a>
            <a href="https://twitter.com/tupagina" target="_blank" class="red-social">
                <i class="bi bi-twitter-x"></i>
            </a>
            <a href="https://wa.me/numero" target="_blank" class="red-social">
                <i class="bi bi-whatsapp"></i>
            </a>
            </div>
        </div>
    </div>

  </div>
</template>

<script>
import { Modal } from 'bootstrap';

import expo1 from '@/assets/exposiciones/expo1.jpg';
import expo2 from '@/assets/exposiciones/expo2.png';
import expo3 from '@/assets/exposiciones/expo3.png';


export default {
  name: 'PaginaExposiciones',
  data() {
    return {
      exposicionSeleccionada: {
        titulo: '',
        imagen: '',
        fecha: '',
        horario: '',
        lugar: '',
        artista: '',
        descripcion: ''
      },
      exposiciones: [
        {
          titulo: "Flora Urbana",
          imagen: expo1,
          fecha: "15 Septiembre 2023",
          horario: "18:00 - 21:00",
          lugar: "Galería Principal",
          artista: "María Rodríguez",
          descripcion: "Exploración de la naturaleza en entornos urbanos a través de técnicas mixtas."
        },
        {
          titulo: "Abstracto Contemporáneo",
          imagen: expo2,
          fecha: "10 Octubre 2023",
          horario: "19:00 - 22:00",
          lugar: "Sala Moderna",
          artista: "Carlos Méndez",
          descripcion: "Colección de obras que desafían las formas tradicionales."
        },
        {
          titulo: "Retratos del Alma",
          imagen: expo3,
          fecha: "5 Noviembre 2023",
          horario: "17:00 - 20:00",
          lugar: "Galería Central",
          artista: "Laura Fernández",
          descripcion: "Serie de retratos que capturan la esencia humana."
        }
      ]
    }
  },
  methods: {
    mostrarDetalle(exposicion) {
      this.exposicionSeleccionada = { ...exposicion };
      const modal = new Modal(document.getElementById('modalExposicion'));
      modal.show();
    },
    //reservarAsistencia() {
      //alert(`Reserva confirmada para: ${this.exposicionSeleccionada.titulo}`);
      // Aquí podrías conectar con tu backend o servicio de reservas
    //}
  }
}
</script>

<style scoped>
.hero-exposiciones {
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
              url('../assets/exposiciones/hero-bg.jpg');
  background-size: cover;
  background-position: center;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
}

.img-exposicion {
  height: 250px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.card:hover .img-exposicion {
  transform: scale(1.03);
}

.modal-body img {
  max-height: 60vh;
  width: 100%;
  object-fit: contain;
}

/* Estilos para los íconos */
.bi {
  margin-right: 8px;
}

.redes-sociales {
  border-top: 1px solid #e9ecef;
}

.red-social {
  color: #495057;
  font-size: 2rem;
  transition: all 0.3s ease;
}

.red-social:hover {
  transform: translateY(-5px);
}

.bi-facebook:hover { color: #1877f2; }
.bi-instagram:hover { color: #e4405f; }
.bi-youtube:hover { color: #ff0000; }
.bi-twitter-x:hover { color: #000000; }
.bi-whatsapp:hover { color: #25d366; }

</style>