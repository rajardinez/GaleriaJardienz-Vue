<template>
  <div class="pagina-inicio">
    <!-- Hero section con imagen de fondo -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="titulo">Galería Jardinez</h1>
        <p class="subtitulo">Cultura y Arte</p>
      </div>
    </div>

    <!-- Contenido principal con fondo blanco semitransparente  hola -->
    <div class="contenido-principal">
      <div class="container mt-5">
        <h2 class="text-center mb-4">Exposiciones Actuales</h2>

        <div v-if="loading" class="text-center my-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Cargando...</span>
          </div>
        </div>

        <div v-if="error" class="alert alert-warning">
          {{ error }}
        </div>
        
        <div class="row" v-if="!loading && !error">
          <!-- Tarjetas de noticias -->
          <div class="col-md-4 mb-4" v-for="(noticia, index) in noticias" :key="index">
            <div class="card h-100">
              <img 
                :src="noticia.imagen" 
                class="card-img-top" 
                :alt="noticia.titulo"
                style="height: 200px; object-fit: cover;"
              >
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">{{ noticia.titulo }}</h5>
                <p class="card-text">
                  {{ noticia.descripcionCorta }}
                  <span v-if="noticia.mostrarCompleto">{{ noticia.descripcionCompleta }}</span>
                </p>
                <button 
                  @click="toggleNoticia(index)"
                  class="btn btn-outline-primary mt-auto align-self-start"
                >
                  {{ noticia.mostrarCompleto ? 'Mostrar menos' : 'Leer más' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
          <!-- Sección de Eventos Próximos -->
        <div class="eventos-proximos mt-5">
            <h2 class="text-center mb-4">Próximos Eventos</h2>
            <div class="evento-container">
                <div class="evento-imagen">
                    <img :src="eventoPrincipal.imagen" alt="Evento principal" class="img-fluid">
                </div>
                <div class="evento-info">
                    <h3>{{ eventoPrincipal.titulo }}</h3>
                    <p class="fecha">{{ eventoPrincipal.fecha }}</p>
                    <p>{{ eventoPrincipal.descripcion }}</p>
                    <div class="eventos-lista">
                        <div v-for="(evento, index) in eventos" :key="'evento-'+index" class="evento-item">
                            <strong>{{ evento.fecha }}</strong>: {{ evento.titulo }}
                        </div>
                    </div>
                    <button class="btn btn-primary mt-3">Ver todos los eventos</button>
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
    export default{
        name: 'PaginaInicio',
        data(){
            return {
                noticias: [],
                loading: true,
                error: null,
                eventoPrincipal: {
                    titulo: "Noche de Galería Abierta",
                    fecha: "15 de Diciembre, 2023",
                    descripcion: "Únase a nosotros para una noche especial de arte, música y vino. Los artistas estarán presentes para discutir sus obras y habrá actuaciones en vivo.",
                    imagen: "/img/Evento.jpg"
                },
                eventos: [
                    {
                        fecha: "20 de Noviembre",
                        titulo: "Taller de Acuarela Botánica"
                    },
                    {
                        fecha: "5 de Diciembre",
                        titulo: "Charla con Artistas Locales"
                    },
                    {
                        fecha: "10 de Diciembre",
                        titulo: "Exposición de Esculturas en Madera"
                    },
                    {
                        fecha: "22 de Diciembre",
                        titulo: "Mercado Navideño de Arte"
                    }
                ]
            }
        },
        methods: {
            toggleNoticia(index) {
                this.noticias[index].mostrarCompleto = !this.noticias[index].mostrarCompleto;
            },
            async fetchExposiciones() {
              try {
                const response = await fetch(
                  'https://www.europeana.eu/api/v2/search.json?wskey=apidemo&query=art&profile=rich&rows=3'
                );
                const data = await response.json();
                
                this.noticias = data.items.map((item) => ({
                  titulo: item.title?.[0] || "Obra de arte europea",
                  descripcionCorta: (item.dcDescription?.[0]?.substring(0, 100) + '...') || 'Obra cultural europea destacada',
                  descripcionCompleta: item.dcDescription?.[0] || 'Descripción detallada no disponible',
                  imagen: item.edmPreview?.[0] || 'https://via.placeholder.com/600x400?text=Arte+Europea',
                  mostrarCompleto: false
                }));
              } catch (err) {
                console.error("Error al cargar exposiciones:", err);
                this.error = "No se pudieron cargar las exposiciones";
                // Datos de respaldo
                this.noticias = [
                  {
                    titulo: "Exposición de Arte Botánico",
                    descripcionCorta: "Nueva muestra que combina arte y ciencia vegetal...",
                    descripcionCompleta: "La exposición 'Flora Urbana' presenta 50 obras de artistas contemporáneos...",
                    imagen: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
                    mostrarCompleto: false
                  }
                ];
              } finally {
                this.loading = false;
              }
            }
        },
        mounted() {
          this.fetchExposiciones();
        }
    }
</script>

<style scoped>
/* Estilos para imagen de fondo FULL COVER */
.pagina-inicio {
  position: relative;
  min-height: 100vh;
}

.hero-section {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-image: url('/public/img/Pgina-inicio.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  z-index: 1;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.hero-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;
  padding: 0 20px;
}

.contenido-principal {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 15px 15px 0 0;
  margin-top: 0; 
  padding: 30px 0;
  position: relative;
  z-index: 2; 
  transform: translateY(-50px);
}

/* Mejoras de diseño */
.titulo {
  font-size: 4rem;
  font-weight: 700;
  color: white;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
}

.subtitulo {
  font-size: 2rem;
  color: white;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8);
}

.card {
  transition: all 0.3s ease;
  border: none;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

/* Responsive */
@media (max-width: 992px) {
  .titulo {
    font-size: 3rem;
  }
  .subtitulo {
    font-size: 1.5rem;
  }
}

@media (max-width: 768px) {
  .contenido-principal {
    margin-top: 60vh;
    padding: 20px 0;
  }
  
  .titulo {
    font-size: 2.5rem;
  }
  
  .subtitulo {
    font-size: 1.3rem;
  }
}
  .eventos-proximos {
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 30px;
  margin-top: 50px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.evento-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 30px;
}

.evento-imagen {
  flex: 1;
  min-width: 300px;
}

.evento-imagen img {
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: cover;
}

.evento-info {
  flex: 2;
}

.evento-info h3 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.fecha {
  color: #6c757d;
  font-weight: bold;
  margin-bottom: 15px;
}

.eventos-lista {
  margin-top: 20px;
  border-top: 1px solid #dee2e6;
  padding-top: 15px;
}

.evento-item {
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px dashed #dee2e6;
}

/* Responsive */
@media (max-width: 768px) {
  .evento-container {
    flex-direction: column;
  }
  
  .evento-imagen {
    width: 100%;
    min-width: auto;
  }
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