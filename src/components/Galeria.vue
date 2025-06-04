<template>
  <div class="pagina-galeria">
    <!-- Hero Section -->
    <div class="hero-galeria">
      <div class="hero-content text-center text-white">
        <h1 class="display-4 fw-bold">Galería de Arte</h1>
        <p class="lead">Explora nuestras obras exclusivas</p>
      </div>
    </div>

    <!-- Filtros -->
    <div class="container my-5">
      <div class="row justify-content-center mb-4">
        <div class="col-md-6">
          <input 
            type="text" 
            class="form-control" 
            placeholder="Buscar obras..." 
            v-model="busqueda"
          >
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-12 text-center">
          <button 
            v-for="tecnica in tecnicas" 
            :key="tecnica"
            @click="filtrarPorTecnica(tecnica)"
            class="btn btn-outline-dark mx-2 mb-2"
            :class="{ 'active': filtroTecnica === tecnica }"
          >
            {{ tecnica }}
          </button>
        </div>
      </div>
    </div>

    <!-- Galería de Cuadros -->
    <div class="container">
      <div class="row">
        <div 
          class="col-lg-4 col-md-6 mb-4" 
          v-for="(cuadro, index) in cuadrosFiltrados" 
          :key="index"
        >
          <div class="card h-100 shadow-sm">
            <img 
              :src="cuadro.imagen" 
              class="card-img-top img-gallery" 
              :alt="cuadro.titulo"
            >
            <div class="card-body">
              <h5 class="card-title">{{ cuadro.titulo }}</h5>
              <p class="card-text text-muted">
                <i class="bi bi-brush"></i> {{ cuadro.tecnica }}
              </p>
            </div>
            <div class="card-footer bg-white border-top-0">
              <div class="d-flex justify-content-between align-items-center">
                <span class="h5 mb-0">€{{ cuadro.precio.toLocaleString() }}</span>
                <button 
                  class="btn btn-primary"
                  @click="mostrarDetalle(cuadro)"
                >
                  <i class="bi bi-eye"></i> Detalles
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Detalle -->
    <div class="modal fade" id="modalDetalle" tabindex="-1" aria-hidden="true" v-if="mounted">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ cuadroSeleccionado.titulo }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6">
                <img 
                  :src="cuadroSeleccionado.imagen" 
                  class="img-fluid rounded"
                  :alt="cuadroSeleccionado.titulo"
                >
              </div>
              <div class="col-md-6">
                <p><strong>Técnica:</strong> {{ cuadroSeleccionado.tecnica }}</p>
                <p><strong>Dimensiones:</strong> {{ cuadroSeleccionado.dimensiones }}</p>
                <p><strong>Año:</strong> {{ cuadroSeleccionado.anio }}</p>
                <p><strong>Precio:</strong> €{{ cuadroSeleccionado.precio.toLocaleString() }}</p>
                <p class="mt-3">{{ cuadroSeleccionado.descripcion }}</p>

                 <!-- Formulario de compra (solo visible al hacer clic en comprar) -->
                  <div v-if="mostrarFormularioCompra" class="mt-4 p-3 bg-light rounded">
                     <h6 class="mb-3">Complete sus datos</h6>
                     <div class="mb-3">
                      <input type="text" class="form-control" placeholder="Nombre completo" v-model="datosCompra.nombre">
                    </div>
                    <div class="mb-3">
                      <input type="email" class="form-control" placeholder="Email" v-model="datosCompra.email">
                    </div>
                    <div class="mb-3">
                      <input type="tel" class="form-control" placeholder="Teléfono" v-model="datosCompra.telefono">
                    </div>
                    <button class="btn btn-success w-100" @click="confirmarCompra">
                      <i class="bi bi-check-circle"></i> Confirmar compra
                    </button>
                  </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            <button 
              type="button" 
              class="btn btn-success"
              @click="iniciarProcesoCompra"
              v-if="!mostrarFormularioCompra"
            >
              <i class="bi bi-cart"></i> Comprar Obra
            </button>
            <!-- Botón alternativo de WhatsApp -->
            <a 
              v-if="!mostrarFormularioCompra"
              :href="enlaceWhatsApp" 
              class="btn btn-success"
              target="_blank"
              @click="registrarInteresWhatsApp"
            >
              <i class="bi bi-whatsapp"></i> Consultar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>

      <!-- Modal de confirmación -->
    <div class="modal fade" id="modalConfirmacion" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-success text-white">
            <h5 class="modal-title">¡Compra realizada!</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Gracias por su compra, {{ datosCompra.nombre }}.</p>
            <p>Hemos enviado los detalles de su compra de "<strong>{{ cuadroSeleccionado.titulo }}</strong>" al email {{ datosCompra.email }}.</p>
            <p class="mb-0">Nos pondremos en contacto con usted para coordinar el envío.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-success" data-bs-dismiss="modal">Aceptar</button>
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
import cuadro1 from '@/assets/galeria/cuadro1.jpg';
import cuadro2 from '@/assets/galeria/cuadro2.jpg';
import cuadro3 from '@/assets/galeria/cuadro3.jpg';
import cuadro5 from '@/assets/galeria/cuadro5.jpg';
import cuadro6 from '@/assets/galeria/cuadro6.jpg';
import heroBg from '@/assets/galeria/hero-bg.jpg';

export default {
  name: 'PaginaGaleria',
  data() {
    return {
      mounted: false,
      busqueda: '',
      filtroTecnica: 'Todas',
      cuadroSeleccionado: {
        titulo: '',
        imagen: '',
        tecnica: '',
        dimensiones: '',
        anio: '',
        precio: 0,
        descripcion: ''
      },
      cuadros: [
        {
          titulo: "Olas del Mar",
          imagen: cuadro1,
          tecnica: "Acuarela",
          dimensiones: "80 x 60 cm",
          anio: "2022",
          precio: 1200,
          descripcion: "Obra que captura los vibrantes colores del atardecer mediterráneo."
        },
        {
          titulo: "Atardecer en la Costa",
          imagen: cuadro5,
          tecnica: "Óleo sobre lienzo",
          dimensiones: "80 x 70 cm",
          anio: "2022",
          precio: 1500,
          descripcion: "Obra que captura los vibrantes colores del atardecer mediterráneo."
        },
        {
          titulo: "Atardecer",
          imagen: cuadro6,
          tecnica: "Óleo sobre lienzo",
          dimensiones: "80 x 60 cm",
          anio: "2022",
          precio: 1300,
          descripcion: "Obra que captura los vibrantes colores del atardecer mediterráneo."
        },
        {
          titulo: "Retrato Abstracto",
          imagen: cuadro2,
          tecnica: "Acrílico",
          dimensiones: "100 x 70 cm",
          anio: "2023",
          precio: 950,
          descripcion: "Exploración contemporánea de la figura humana."
        },
        {
          titulo: "Flora Silvestre",
          imagen: cuadro3,
          tecnica: "Carbonsillo",
          dimensiones: "50 x 40 cm",
          anio: "2021",
          precio: 650,
          descripcion: "Detallado estudio botánico de especies autóctonas."
        }
      ],
      heroBg: heroBg,
      mostrarFormularioCompra: false,
      datosCompra: {
        nombre: '',
        email: '',
        telefono: ''
      },
      //whatsappNumber: '56767284', 
      //whatsappMessage: 'Hola, estoy interesado en la obra'
    }
  },
  mounted() {
    this.mounted = true;
  },
  computed: {
    tecnicas() {
      const todas = ['Todas'];
      const tecnicasUnicas = [...new Set(this.cuadros.map(c => c.tecnica))];
      return [...todas, ...tecnicasUnicas];
    },
    cuadrosFiltrados() {
      let filtrados = this.cuadros;
      
      if (this.busqueda) {
        const termino = this.busqueda.toLowerCase();
        filtrados = filtrados.filter(c => 
          c.titulo.toLowerCase().includes(termino) || 
          c.tecnica.toLowerCase().includes(termino)
        );
      }
      
      if (this.filtroTecnica !== 'Todas') {
        filtrados = filtrados.filter(c => c.tecnica === this.filtroTecnica);
      }
      
      return filtrados;
    },
    //enlaceWhatsApp() {
      //const mensaje = encodeURIComponent(`${this.whatsappMessage} "${this.cuadroSeleccionado.titulo}" (Ref: ${this.cuadroSeleccionado.id || this.cuadroSeleccionado.titulo.replace(/\s+/g, '-')})`);
      //return `https://https://web.whatsapp.com//${this.whatsappNumber}?text=${mensaje}`;
    //}
  },
  methods: {
    filtrarPorTecnica(tecnica) {
      this.filtroTecnica = tecnica;
    },
    mostrarDetalle(cuadro) {
      this.cuadroSeleccionado = { ...cuadro };
      const modalElement = document.getElementById('modalDetalle');
      if (modalElement) {
        const modal = Modal.getOrCreateInstance(modalElement);
        modal.show();
      }
    },
    iniciarProcesoCompra() {
      this.mostrarFormularioCompra = true;
    },
    confirmarCompra() {
      // Validación básica
      if (!this.datosCompra.nombre || !this.datosCompra.email || !this.datosCompra.telefono) {
        alert('Por favor complete todos los campos');
        return;
      }

      // Aquí iría la lógica para enviar los datos al backend
      console.log('Datos de compra:', {
        obra: this.cuadroSeleccionado,
        comprador: this.datosCompra
      });
      // Mostrar modal de confirmación
      const modalConfirmacion = new Modal(document.getElementById('modalConfirmacion'));
      modalConfirmacion.show();

      // Cerrar el modal de detalle
      const modalDetalle = Modal.getInstance(document.getElementById('modalDetalle'));
      if (modalDetalle) modalDetalle.hide();

      // Resetear el formulario
      this.mostrarFormularioCompra = false;
      this.datosCompra = { nombre: '', email: '', telefono: '' };
    },
    registrarInteresWhatsApp() {
      // Puedes registrar el interés en analytics o tu backend
      console.log('Interés registrado por WhatsApp:', this.cuadroSeleccionado.titulo);
    }
  }
}
</script>

<style scoped>
.hero-galeria {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
              url('../assets/galeria/hero-bg.jpg');
  background-size: cover;
  background-position: center;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.img-gallery {
  height: 250px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.card:hover .img-gallery {
  transform: scale(1.03);
}

.btn.active {
  background-color: #343a40;
  color: white;
}

.modal-body img {
  max-height: 70vh;
  width: 100%;
  object-fit: contain;
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

/* Estilos adicionales para el proceso de compra */
.btn-success {
  background-color: #28a745;
  border-color: #28a745;
  transition: all 0.3s ease;
}

.btn-success:hover {
  background-color: #218838;
  border-color: #1e7e34;
  transform: translateY(-2px);
}

.bg-light {
  background-color: #f8f9fa!important;
}

/* Estilos para el modal de confirmación */
.modal-header.bg-success {
  background-color: #28a745!important;
}

.btn-close-white {
  filter: invert(1);
}

</style>