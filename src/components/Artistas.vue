<template>
  <div class="pagina-artistas">
    <!-- Hero Section -->
    <div class="hero-artistas">
      <div class="hero-content text-center text-white">
        <h1 class="display-4 fw-bold">Nuestros Artistas</h1>
        <p class="lead">Conoce a los creadores detrás de las obras</p>
      </div>
    </div>

    <!-- Listado de Artistas -->
    <div class="container my-5">
      <div class="row">
        <div 
          class="col-lg-4 col-md-6 mb-4" 
          v-for="(artista, index) in artistas" 
          :key="index"
        >
          <div class="card h-100 shadow-sm artist-card" @click="mostrarArtista(artista)">
            <img 
              :src="artista.foto" 
              class="card-img-top img-artista" 
              :alt="artista.nombre"
            >
            <div class="card-body">
              <h5 class="card-title">{{ artista.nombre }}</h5>
              <p class="card-text text-muted">
                <i class="bi bi-palette"></i> {{ artista.especialidad }}
              </p>
              <div class="d-flex flex-wrap gap-1">
                <span 
                  v-for="tecnica in artista.tecnicas" 
                  :key="tecnica"
                  class="badge bg-secondary"
                >
                  {{ tecnica }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Detalle del Artista -->
    <div class="modal fade" id="modalArtista" tabindex="-1" aria-hidden="true" v-if="mounted">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ artistaSeleccionado.nombre }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-4">
                <img 
                  :src="artistaSeleccionado.foto" 
                  class="img-fluid rounded mb-3"
                  :alt="artistaSeleccionado.nombre"
                >
                <div class="mb-3">
                  <h6>Información de contacto</h6>
                  <p class="mb-1" v-if="artistaSeleccionado.email">
                    <i class="bi bi-envelope"></i> {{ artistaSeleccionado.email }}
                  </p>
                  <p class="mb-1" v-if="artistaSeleccionado.website">
                    <i class="bi bi-globe"></i> 
                    <a :href="artistaSeleccionado.website" target="_blank">{{ artistaSeleccionado.website }}</a>
                  </p>
                </div>
              </div>
              <div class="col-md-8">
                <h6>Biografía</h6>
                <p>{{ artistaSeleccionado.biografia }}</p>
                
                <h6 class="mt-4">Trayectoria</h6>
                <ul>
                  <li v-for="(item, idx) in artistaSeleccionado.trayectoria" :key="idx">{{ item }}</li>
                </ul>
                
                <h6 class="mt-4">Exposiciones</h6>
                <ul>
                  <li v-for="(item, idx) in artistaSeleccionado.exposiciones" :key="idx">{{ item }}</li>
                </ul>
              </div>
            </div>
            
            <div class="mt-4" v-if="obrasDelArtista.length > 0">
              <h6>Obras en nuestra galería</h6>
              <div class="row">
                <div 
                  class="col-6 col-md-3 mb-3" 
                  v-for="(obra, idx) in obrasDelArtista" 
                  :key="idx"
                >
                  <img 
                    :src="obra.imagen" 
                    class="img-thumbnail img-obra-modal"
                    :alt="obra.titulo"
                    @click="verObraEnGaleria(obra)"
                  >
                  <p class="small mt-1 mb-0">{{ obra.titulo }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';
import artista1 from '@/assets/artistas/artista1.jpg';
import artista2 from '@/assets/artistas/artista2.jpg';
import artista3 from '@/assets/artistas/artista3.jpg';
import heroBgArtistas from '@/assets/artistas/hero-bg.jpg';

// Importamos las mismas imágenes de cuadros que en Galeria.vue para mantener consistencia
import cuadro1 from '@/assets/galeria/cuadro1.jpg';
import cuadro2 from '@/assets/galeria/cuadro2.jpg';
import cuadro3 from '@/assets/galeria/cuadro3.jpg';
import cuadro5 from '@/assets/galeria/cuadro5.jpg';
import cuadro6 from '@/assets/galeria/cuadro6.jpg';

export default {
  name: 'PaginaArtistas',
  data() {
    return {
      mounted: false,
      artistaSeleccionado: {
        nombre: '',
        foto: '',
        especialidad: '',
        biografia: '',
        trayectoria: [],
        exposiciones: [],
        email: '',
        website: '',
        tecnicas: []
      },
      artistas: [
        {
          id: 1,
          nombre: "María González",
          foto: artista1,
          especialidad: "Paisajismo contemporáneo",
          biografia: "Artista visual especializada en la representación de paisajes urbanos y naturales con un enfoque contemporáneo. Su trabajo explora la relación entre el ser humano y su entorno.",
          trayectoria: [
            "Licenciada en Bellas Artes por la Universidad de Sevilla (2015)",
            "Taller de perfeccionamiento en Florencia (2017)",
            "Residencia artística en Berlín (2019)"
          ],
          exposiciones: [
            "Exposición individual 'Horizontes' - Galería Arte Moderno, Madrid (2020)",
            "Colectiva 'Nuevas Visiones' - Centro Cultural Barcelona (2021)",
            "Feria Internacional de Arte Contemporáneo (2022)"
          ],
          email: "maria.gonzalez@artista.com",
          website: "www.mariagonzalez.art",
          tecnicas: ["Óleo sobre lienzo", "Acuarela"]
        },
        {
          id: 2,
          nombre: "Carlos Méndez",
          foto: artista2,
          especialidad: "Retrato abstracto",
          biografia: "Pintor vanguardista cuyo trabajo se centra en la deconstrucción de la figura humana. Su estilo combina elementos del expresionismo abstracto con técnicas mixtas innovadoras.",
          trayectoria: [
            "Escuela de Artes Visuales de Nueva York (2014-2016)",
            "Premio Joven Talento en Arte Contemporáneo (2018)",
            "Profesor invitado en la Universidad de Arte de México (2020)"
          ],
          exposiciones: [
            "'Fragmentos Humanos' - Museo de Arte Moderno (2019)",
            "Bienal de Arte Joven (2020)",
            "Exposición itinerante 'Identidades Desdibujadas' (2021-2022)"
          ],
          email: "carlos.mendez@artista.com",
          website: "www.carlosmendez.art",
          tecnicas: ["Acrílico", "Técnicas mixtas"]
        },
        {
          id: 3,
          nombre: "Lucía Fernández",
          foto: artista3,
          especialidad: "Estudios botánicos",
          biografia: "Artista especializada en representaciones detalladas de flora autóctona. Su trabajo combina precisión científica con sensibilidad artística, destacando la belleza de las especies vegetales.",
          trayectoria: [
            "Diplomada en Ilustración Científica (2016)",
            "Taller de dibujo botánico en Kew Gardens, Londres (2018)",
            "Beca de investigación artística en flora mediterránea (2020)"
          ],
          exposiciones: [
            "'Flora Ibérica' - Real Jardín Botánico de Madrid (2019)",
            "Exposición 'Naturaleza en Detalle' - Museo de Ciencias Naturales (2021)",
            "Feria Internacional de Ilustración Científica (2022)"
          ],
          email: "lucia.fernandez@artista.com",
          tecnicas: ["Carbonsillo", "Grafito", "Acuarela científica"]
        }
      ],
      obras: [
        { id: 1, artistaId: 1, titulo: "Olas del Mar", imagen: cuadro1, tecnica: "Acuarela" },
        { id: 2, artistaId: 2, titulo: "Retrato Abstracto", imagen: cuadro2, tecnica: "Acrílico" },
        { id: 3, artistaId: 3, titulo: "Flora Silvestre", imagen: cuadro3, tecnica: "Carbonsillo" },
        { id: 4, artistaId: 1, titulo: "Atardecer en la Costa", imagen: cuadro5, tecnica: "Óleo sobre lienzo" },
        { id: 5, artistaId: 1, titulo: "Atardecer", imagen: cuadro6, tecnica: "Óleo sobre lienzo" }
      ],
      heroBgArtistas: heroBgArtistas
    }
  },
  mounted() {
    this.mounted = true;
  },
  computed: {
    obrasDelArtista() {
      if (!this.artistaSeleccionado.id) return [];
      return this.obras.filter(obra => obra.artistaId === this.artistaSeleccionado.id);
    }
  },
  methods: {
    mostrarArtista(artista) {
      this.artistaSeleccionado = { ...artista };
      const modalElement = document.getElementById('modalArtista');
      if (modalElement) {
        const modal = Modal.getOrCreateInstance(modalElement);
        modal.show();
      }
    },
    verObraEnGaleria(obra) {
      // Cierra el modal actual
      const modalArtista = Modal.getInstance(document.getElementById('modalArtista'));
      if (modalArtista) modalArtista.hide();
      
      // Navega a la galería y podría implementarse scroll o highlight a la obra
      this.$router.push('/galeria');
      
      console.log('Obra seleccionada:', obra.titulo);
      // Aquí podrías añadir lógica para resaltar la obra específica en la galería
      // Esto requeriría comunicación entre componentes o usar un store (Vuex/Pinia)
    }
  }
}
</script>

<style scoped>
.hero-artistas {
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
              url('../assets/artistas/hero-bg.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.hero-artistas::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%);
}

.hero-content {
  position: relative;
  z-index: 2;
  animation: fadeInUp 0.8s ease-out;
}

.hero-content h1 {
  font-size: 3.5rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  margin-bottom: 1rem;
}

.hero-content .lead {
  font-size: 1.5rem;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
  max-width: 800px;
  margin: 0 auto;
}

/* Tarjetas de artistas */
.artist-card {
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  border: none;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

.artist-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.7) 100%);
  z-index: 1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.artist-card:hover::before {
  opacity: 1;
}

.artist-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 15px 30px rgba(0,0,0,0.2);
}

.img-artista {
  height: 350px;
  object-fit: cover;
  transition: transform 0.5s ease;
  width: 100%;
}

.artist-card:hover .img-artista {
  transform: scale(1.1);
}

.card-body {
  position: relative;
  z-index: 2;
  background: white;
  transition: all 0.3s ease;
}

.artist-card:hover .card-body {
  background: #f8f9fa;
}

.card-title {
  font-weight: 600;
  color: #343a40;
  margin-bottom: 0.75rem;
  font-size: 1.4rem;
}

.card-text {
  font-size: 1rem;
  margin-bottom: 1rem;
}

.badge {
  font-weight: 500;
  padding: 0.5em 0.8em;
  margin-right: 0.5em;
  margin-bottom: 0.5em;
  border-radius: 20px;
  background-color: #6c757d;
  color: white;
  transition: all 0.2s ease;
}

.badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

/* Modal */
.modal-content {
  border-radius: 15px;
  overflow: hidden;
  border: none;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.modal-header {
  background-color: #343a40;
  color: white;
  border-bottom: none;
  padding: 1.5rem;
}

.modal-title {
  font-weight: 600;
}

.modal-body {
  padding: 2rem;
}

.img-fluid.rounded {
  border-radius: 10px !important;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease;
}

.img-fluid.rounded:hover {
  transform: scale(1.02);
}

.modal-body h6 {
  color: #495057;
  font-weight: 600;
  margin-bottom: 1rem;
  border-bottom: 2px solid #dee2e6;
  padding-bottom: 0.5rem;
}

.modal-body ul {
  padding-left: 1.5rem;
}

.modal-body ul li {
  margin-bottom: 0.5rem;
  color: #6c757d;
}

/* Obras en galería */
.img-obra-modal {
  transition: all 0.3s ease;
  border-radius: 8px;
  border: 1px solid #dee2e6;
}

.img-obra-modal:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  border-color: #adb5bd;
}

/* Animaciones */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .hero-artistas {
    height: 300px;
  }
  
  .hero-content h1 {
    font-size: 2.5rem;
  }
  
  .hero-content .lead {
    font-size: 1.2rem;
  }
  
  .img-artista {
    height: 250px;
  }
}

@media (max-width: 576px) {
  .hero-artistas {
    height: 250px;
  }
  
  .hero-content h1 {
    font-size: 2rem;
  }
  
  .hero-content .lead {
    font-size: 1rem;
  }
}
</style>